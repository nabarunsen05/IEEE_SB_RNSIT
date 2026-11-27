import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request, { params }) {
  try {
    const { eventId } = await params;

    if (!eventId) {
      return NextResponse.json(
        { error: "Event ID is required." },
        { status: 400 }
      );
    }

    let payload;

    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    if (
      !payload ||
      typeof payload !== "object" ||
      !payload.leader ||
      typeof payload.leader !== "object" ||
      !Array.isArray(payload.members)
    ) {
      return NextResponse.json(
        { error: "Invalid registration details." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.rpc(
      "submit_event_registration",
      {
        p_event_id: String(eventId),
        p_payload: payload,
      }
    );

    if (error) {
      console.error("Submit event registration RPC error:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      return NextResponse.json(
        { error: error.message || "Registration failed." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Event registration API error:", error);

    return NextResponse.json(
      { error: "Unable to process registration." },
      { status: 500 }
    );
  }
}