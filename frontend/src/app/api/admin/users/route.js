
import { NextResponse } from "next/server";
import { createClient } from "../../../../lib/supabase/server";

const VALID_ROLES = ["super_admin", "admin", "editor"];
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Helper to authenticate caller and verify active administrator status.
 */
async function getAuthenticatedAdmin(supabase) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      errorResponse: NextResponse.json(
        {
          error: "Unauthorized: Active session required",
          message: "Unauthorized",
        },
        { status: 401 }
      ),
    };
  }

  const { data: profile, error: profileError } = await supabase
    .rpc("get_current_admin_profile")
    .maybeSingle();

  // A database/RPC failure is not the same as an unauthorized user.
  if (profileError) {
    console.error("get_current_admin_profile RPC error:", profileError);

    return {
      errorResponse: NextResponse.json(
        {
          error: "Failed to verify administrator permissions",
          message: "Unable to verify administrator permissions",
        },
        { status: 500 }
      ),
    };
  }

  // The query succeeded, but the user is not an active administrator.
  if (
    !profile ||
    profile.user_id !== user.id ||
    profile.is_active !== true
  ) {
    return {
      errorResponse: NextResponse.json(
        {
          error: "Forbidden: Active administrator access required",
          message: "Forbidden",
        },
        { status: 403 }
      ),
    };
  }

  return { user, profile };
}

/**
 * GET /api/admin/users
 * Returns the administrator allowlist for active administrators.
 */
export async function GET() {
  try {
    const supabase = await createClient();

    const { errorResponse } = await getAuthenticatedAdmin(supabase);

    if (errorResponse) {
      return errorResponse;
    }

    const { data: adminUsers, error: queryError } = await supabase
      .from("admin_users")
      .select("user_id, email, role, is_active, created_at, created_by")
      .order("created_at", { ascending: true });

    if (queryError) {
      console.error("Database error fetching admin_users:", queryError);

      return NextResponse.json(
        {
          error: "Failed to fetch administrator allowlist",
          message: queryError.message || "Database query failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { data: adminUsers || [] },
      { status: 200 }
    );
  } catch (err) {
    console.error("GET /api/admin/users exception:", err);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/users
 * Provisions a new administrator. Restricted to active Super Admins.
 */
export async function POST(request) {
  try {
    const supabase = await createClient();

    const { profile, errorResponse } = await getAuthenticatedAdmin(supabase);

    if (errorResponse) {
      return errorResponse;
    }

    // Only active Super Admins can provision administrators.
    if (profile.role !== "super_admin") {
      return NextResponse.json(
        {
          error: "Super Admin permissions required",
          message: "Forbidden: Super Admin permissions required",
        },
        { status: 403 }
      );
    }

    // Parse request JSON.
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON in request body",
          message: "Invalid JSON in request body",
        },
        { status: 400 }
      );
    }

    // Reject null, arrays, and non-object request bodies.
    if (
      body === null ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          error: "Request body must be a JSON object",
          message: "Invalid request body",
        },
        { status: 400 }
      );
    }

    const rawEmail = body.email;
    const rawRole = body.role;

    // Validate email.
    if (typeof rawEmail !== "string" || !rawEmail.trim()) {
      return NextResponse.json(
        {
          error: "Email address is required",
          message: "Email address is required",
        },
        { status: 400 }
      );
    }

    const email = rawEmail.trim().toLowerCase();

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          error: "Invalid email address format",
          message: "Invalid email address format",
        },
        { status: 400 }
      );
    }

    // Validate role.
    if (
      typeof rawRole !== "string" ||
      !VALID_ROLES.includes(rawRole)
    ) {
      return NextResponse.json(
        {
          error: "Invalid role. Role must be super_admin, admin, or editor",
          message: "Invalid role. Role must be super_admin, admin, or editor",
        },
        { status: 400 }
      );
    }

    const role = rawRole;

    // Use the authenticated session client.
    // Never use a service-role client or direct INSERT.
    const { data: rpcResult, error: rpcError } = await supabase.rpc(
      "admin_provision_user",
      {
        p_email: email,
        p_role: role,
      }
    );

    if (rpcError) {
      console.error("admin_provision_user RPC error:", rpcError);

      const message = rpcError.message || "";
      const code = rpcError.code || "";

      // Function does not exist.
      if (
        code === "42883" ||
        code === "PGRST202" ||
        /function .*admin_provision_user.* does not exist/i.test(message) ||
        /could not find the function.*admin_provision_user/i.test(message)
      ) {
        return NextResponse.json(
          {
            error: "Database function admin_provision_user is not installed",
            message: "Please apply the approved database migration",
            code: "FUNCTION_NOT_FOUND",
          },
          { status: 503 }
        );
      }

      // Permission failures.
      if (
        /PERMISSION DENIED|UNAUTHENTICATED/i.test(message) ||
        code === "42501"
      ) {
        return NextResponse.json(
          {
            error: "Permission denied",
            message: "The database rejected this provisioning request",
            code: "PERMISSION_DENIED",
          },
          { status: 403 }
        );
      }

      // Duplicate administrator records.
      if (/DUPLICATE RECORD/i.test(message)) {
        return NextResponse.json(
          {
            error: "Administrator already exists",
            message: "This email is already registered as an administrator",
            code: "DUPLICATE_RECORD",
          },
          { status: 409 }
        );
      }

      // Account or UUID conflicts.
      if (/CONFLICT/i.test(message) || code === "23505") {
        return NextResponse.json(
          {
            error: "Account conflict",
            message: "The account conflicts with an existing administrator record",
            code: "ACCOUNT_CONFLICT",
          },
          { status: 409 }
        );
      }

      // SQL validation failures.
      if (/VALIDATION ERROR/i.test(message) || code === "22023") {
        return NextResponse.json(
          {
            error: "Provisioning validation failed",
            message: "The database rejected the supplied email or role",
            code: "VALIDATION_ERROR",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: "Database error provisioning administrator",
          message: message || "Unexpected database error",
          code: code || "DATABASE_ERROR",
        },
        { status: 500 }
      );
    }

    // Handle structured JSONB responses.
    if (
      !rpcResult ||
      typeof rpcResult !== "object" ||
      Array.isArray(rpcResult)
    ) {
      return NextResponse.json(
        {
          error: "Unexpected response from database provisioning function",
          message: "The database returned an invalid provisioning response",
          code: "INVALID_RPC_RESPONSE",
        },
        { status: 500 }
      );
    }

    // Never treat an unsuccessful RPC result as success.
    if (rpcResult.success === false) {
      if (
          rpcResult.code === "USER_NOT_IN_AUTH" ||
          rpcResult.code === "GOOGLE_SIGN_IN_REQUIRED"
        ) {
          return NextResponse.json(
            {
              error: rpcResult.message || "Google sign-in is required",
              message: rpcResult.message || "Sign in using the matching Google account first",
              code: rpcResult.code,
            },
            { status: 422 }
          );
        }

      if (
        rpcResult.code === "DUPLICATE_RECORD" ||
        rpcResult.code === "ALREADY_EXISTS" ||
        rpcResult.code === "ACCOUNT_CONFLICT"
      ) {
        return NextResponse.json(
          {
            error: rpcResult.message || "Administrator already exists or account conflict",
            message: rpcResult.message || "Administrator already exists or account conflict",
            code: rpcResult.code,
          },
          { status: 409 }
        );
      }

      if (
        rpcResult.code === "PERMISSION_DENIED" ||
        rpcResult.code === "UNAUTHENTICATED"
      ) {
        return NextResponse.json(
          {
            error: rpcResult.message || "Permission denied",
            message: rpcResult.message || "Permission denied",
            code: rpcResult.code,
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          error: rpcResult.message || "Failed to provision administrator",
          message: rpcResult.message || "Failed to provision administrator",
          code: rpcResult.code || "PROVISION_FAILED",
        },
        { status: 400 }
      );
    }

    // Success must be explicitly confirmed by the RPC.
    if (rpcResult.success === true) {
      return NextResponse.json(
        {
          success: true,
          data: rpcResult,
          message: `Administrator ${email} successfully provisioned as ${role}.`,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        error: "Unexpected response from database provisioning function",
        message: "The database did not explicitly confirm provisioning success",
        code: "INVALID_RPC_RESPONSE",
      },
      { status: 500 }
    );
  } catch (err) {
    console.error("POST /api/admin/users exception:", err);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: err instanceof Error ? err.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
