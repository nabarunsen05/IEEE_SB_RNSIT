
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function csvEscape(value) {
  const text = value == null ? "" : String(value);

  // Prevent spreadsheet formula injection.
  const safeText = /^[\s]*[=+\-@]/.test(text)
    ? `'${text}`
    : text;

  return `"${safeText.replace(/"/g, '""')}"`;
}

function createCsv(rows) {
  return [
    rows[0].map(csvEscape).join(","),
    ...rows.slice(1).map((row) =>
      row.map(csvEscape).join(",")
    ),
  ].join("\r\n");
}

function safeFilename(value) {
  return (
    String(value || "event")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "event"
  );
}

export async function GET(request, { params }) {
  try {
    const { eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Authenticate user.
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Please sign in as an administrator." },
        { status: 401 }
      );
    }

    // Verify active administrator status.
    const { data: admin, error: adminError } = await supabase
      .rpc("get_current_admin_profile")
      .maybeSingle();

    if (adminError) {
      console.error("Admin verification error:", adminError);

      return NextResponse.json(
        { error: "Unable to verify administrator access." },
        { status: 500 }
      );
    }

    if (
      !admin ||
      admin.user_id !== user.id ||
      admin.is_active !== true
    ) {
      return NextResponse.json(
        { error: "Active administrator access required." },
        { status: 403 }
      );
    }

    // Retrieve event details.
    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("id, title, status")
      .eq("id", String(eventId))
      .maybeSingle();

    if (eventError) {
      console.error("Event lookup error:", eventError);

      return NextResponse.json(
        { error: "Unable to retrieve event details." },
        { status: 500 }
      );
    }

    if (!event) {
      return NextResponse.json(
        { error: "Event not found." },
        { status: 404 }
      );
    }

    // Do not allow exports for completed events.
    if (event.status === "completed") {
      return NextResponse.json(
        {
          error:
            "Participant exports are unavailable for completed events.",
        },
        { status: 403 }
      );
    }

    // Fetch registrations.
    const { data: registrations, error: registrationsError } =
      await supabase
        .from("event_registrations")
        .select(`
          id,
          registration_number,
          registration_code,
          event_id,
          leader_name,
          leader_usn,
          leader_college,
          leader_department,
          leader_year,
          leader_phone,
          leader_email,
          is_ieee_member,
          ieee_membership_number,
          registration_mode,
          registration_type,
          team_size,
          created_at
        `)
        .eq("event_id", String(eventId))
        .order("created_at", { ascending: true });

    if (registrationsError) {
      console.error(
        "Registration export query error:",
        registrationsError
      );

      return NextResponse.json(
        {
          error:
            "Unable to retrieve registrations. Check the registration table RLS policies.",
        },
        { status: 500 }
      );
    }

    // Fetch additional team members.
    const registrationIds = (registrations || []).map(
      (item) => item.id
    );

    let members = [];

    if (registrationIds.length > 0) {
      const { data: memberData, error: membersError } =
        await supabase
          .from("event_registration_members")
          .select(`
            registration_id,
            full_name,
            usn,
            college,
            department,
            academic_year
          `)
          .in("registration_id", registrationIds);

      if (membersError) {
        console.error(
          "Team member export query error:",
          membersError
        );

        return NextResponse.json(
          {
            error:
              "Unable to retrieve team members. Check the registration member table RLS policies.",
          },
          { status: 500 }
        );
      }

      members = memberData || [];
    }

    // Group members by registration ID.
    const membersByRegistration = new Map();

    for (const member of members) {
      const list =
        membersByRegistration.get(member.registration_id) || [];

      list.push(member);

      membersByRegistration.set(
        member.registration_id,
        list
      );
    }

    // CSV headers.
    const rows = [[
      "Event",
      "Registration Code",
      "Participant Type",
      "Full Name",
      "USN",
      "College",
      "Department",
      "Academic Year",
      "Phone",
      "Email",
      "IEEE Member",
      "IEEE Membership Number",
      "Registration Mode",
      "Registration Type",
      "Team Size",
      "Registered At",
    ]];

    // Generate one row per participant.
    for (const registration of registrations || []) {
      const registrationCode =
        registration.registration_code ||
        registration.registration_number ||
        "";

      // Team leader row.
      rows.push([
        event.title,
        registrationCode,
        "Team Leader",
        registration.leader_name,
        registration.leader_usn,
        registration.leader_college,
        registration.leader_department,
        registration.leader_year,
        registration.leader_phone,
        registration.leader_email,
        registration.is_ieee_member ? "Yes" : "No",
        registration.ieee_membership_number || "",
        registration.registration_mode,
        registration.registration_type,
        registration.team_size,
        registration.created_at,
      ]);

      // Separate row for each additional team member.
      const teamMembers =
        membersByRegistration.get(registration.id) || [];

      for (const member of teamMembers) {
        rows.push([
          event.title,
          registrationCode,
          "Team Member",
          member.full_name,
          member.usn,
          member.college,
          member.department,
          member.academic_year,
          "",
          "",
          "",
          "",
          registration.registration_mode,
          registration.registration_type,
          registration.team_size,
          registration.created_at,
        ]);
      }
    }

    // Generate CSV with UTF-8 BOM for Excel compatibility.
    const csv = "\uFEFF" + createCsv(rows);

    const filename = `${safeFilename(event.title)}-participants.csv`;

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Participant CSV export error:", error);

    return NextResponse.json(
      { error: "Unable to export participant details." },
      { status: 500 }
    );
  }
}
