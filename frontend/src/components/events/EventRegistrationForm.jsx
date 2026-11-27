
"use client";

import { useState } from "react";

const emptyGroup = { department: "", college: "", year: "" };

const emptyLeader = {
  full_name: "",
  usn: "",
  phone: "",
  email: "",
  is_ieee_member: false,
  ieee_membership_number: "",
};

const emptyMember = () => ({ full_name: "", usn: "" });

function Field({ label, value, onChange, type = "text", ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-[#33485E]">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-[#10243A] outline-none transition focus:border-[#00629B] focus:ring-2 focus:ring-[#00629B]/10"
        {...props}
      />
    </label>
  );
}

export default function EventRegistrationForm({ event, onClose }) {
  const isTeam = event.registration_type === "team";
  const min = isTeam ? Number(event.min_team_size || 2) : 1;
  const max = isTeam ? Number(event.max_team_size || 2) : 1;

  const [group, setGroup] = useState(emptyGroup);
  const [leader, setLeader] = useState(emptyLeader);
  const [members, setMembers] = useState(() =>
    Array.from({ length: Math.max(0, min - 1) }, emptyMember)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const teamSize = 1 + members.length;

  const updateGroup = (key, value) =>
    setGroup((old) => ({ ...old, [key]: value }));

  const updateLeader = (key, value) =>
    setLeader((old) => ({ ...old, [key]: value }));

  const updateMember = (index, key, value) =>
    setMembers((old) =>
      old.map((member, i) =>
        i === index ? { ...member, [key]: value } : member
      )
    );

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/events/${encodeURIComponent(event.id)}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            group,
            leader: {
              ...leader,
              ieee_membership_number: leader.is_ieee_member
                ? leader.ieee_membership_number.trim()
                : null,
            },
            members,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed.");
      }

      setSuccess(result.data);
    } catch (err) {
      setError(err.message || "Unable to submit registration.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="space-y-4">
        <div className="rounded-2xl bg-emerald-50 p-5 text-emerald-900">
          <p className="text-lg font-bold">
            Registration details submitted
          </p>

          <p className="mt-1 text-sm">
            Keep this registration ID for your reference.
          </p>

          <p className="mt-3 break-all rounded-lg bg-white px-3 py-2 font-mono text-sm">
            {success.registration_code}
          </p>

          {success.payment_required ? (
            <p className="mt-3 text-sm">
              Your registration details have been saved. Continue to the
              college payment portal to complete payment.
            </p>
          ) : (
            <p className="mt-3 text-sm">
              No payment is required. Your registration is recorded.
            </p>
          )}

          {success.payment_instructions && (
            <p className="mt-2 whitespace-pre-line text-sm">
              {success.payment_instructions}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          {success.payment_required && success.payment_portal_url && (
            <button
              type="button"
              onClick={() =>
                window.location.assign(success.payment_portal_url)
              }
              className="rounded-xl bg-[#00629B] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#004F7D]"
            >
              Finish Payment
            </button>
          )}

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#33485E]"
            >
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <p className="text-sm text-slate-500">
        {isTeam
          ? `Team size: ${min}–${max}, including the team leader.`
          : "Individual registration."}
      </p>

      {/* Team / participant information */}
      <section className="space-y-3">
        <h3 className="font-bold text-[#10243A]">
          Team / participant information
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Department"
            value={group.department}
            onChange={(v) => updateGroup("department", v)}
          />

          <Field
            label="College"
            value={group.college}
            onChange={(v) => updateGroup("college", v)}
          />

          <Field
            label="Year"
            value={group.year}
            onChange={(v) => updateGroup("year", v)}
            placeholder="e.g. 2nd Year"
          />
        </div>
      </section>

      {/* Team leader details */}
      <section className="space-y-3">
        <h3 className="font-bold text-[#10243A]">
          Team leader details
        </h3>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field
            label="Full name"
            value={leader.full_name}
            onChange={(v) => updateLeader("full_name", v)}
          />

          <Field
            label="USN"
            value={leader.usn}
            onChange={(v) => updateLeader("usn", v.toUpperCase())}
          />

          <Field
            label="Phone"
            type="tel"
            value={leader.phone}
            onChange={(v) => updateLeader("phone", v)}
          />

          <Field
            label="Email"
            type="email"
            value={leader.email}
            onChange={(v) => updateLeader("email", v)}
          />
        </div>

        {/* IEEE membership */}
        <div className="rounded-xl border border-slate-200 p-4 space-y-3">
          <h4 className="text-sm font-semibold text-[#10243A]">
            IEEE Membership
          </h4>

          <div>
            <span className="mb-2 block text-xs font-semibold text-[#33485E]">
              Are you an IEEE member?
            </span>

            <div className="flex gap-5">
              <label className="flex items-center gap-2 text-sm text-[#33485E]">
                <input
                  type="radio"
                  name="ieeeMembership"
                  checked={leader.is_ieee_member === true}
                  onChange={() => {
                    updateLeader("is_ieee_member", true);
                  }}
                  className="accent-[#00629B]"
                />
                Yes
              </label>

              <label className="flex items-center gap-2 text-sm text-[#33485E]">
                <input
                  type="radio"
                  name="ieeeMembership"
                  checked={leader.is_ieee_member === false}
                  onChange={() => {
                    updateLeader("is_ieee_member", false);
                    updateLeader("ieee_membership_number", "");
                  }}
                  className="accent-[#00629B]"
                />
                No
              </label>
            </div>
          </div>

          {leader.is_ieee_member && (
            <Field
              label="IEEE Membership Number"
              value={leader.ieee_membership_number}
              onChange={(v) =>
                updateLeader("ieee_membership_number", v.trimStart())
              }
              placeholder="Enter your IEEE membership number"
              required
            />
          )}
        </div>
      </section>

      {/* Other team members */}
      {isTeam && (
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-[#10243A]">
                Other team members
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {teamSize} of {max} members added, including the leader.
              </p>
            </div>

            <button
              type="button"
              disabled={teamSize >= max}
              onClick={() =>
                setMembers((old) => [...old, emptyMember()])
              }
              className="rounded-lg border border-[#00629B] px-3 py-2 text-sm font-semibold text-[#00629B] disabled:opacity-40"
            >
              Add member
            </button>
          </div>

          {members.map((member, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[#10243A]">
                  Member {index + 2}
                </p>

                {teamSize > min && (
                  <button
                    type="button"
                    onClick={() =>
                      setMembers((old) =>
                        old.filter((_, i) => i !== index)
                      )
                    }
                    className="text-xs font-semibold text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Field
                  label="Full name"
                  value={member.full_name}
                  onChange={(v) =>
                    updateMember(index, "full_name", v)
                  }
                />

                <Field
                  label="USN"
                  value={member.usn}
                  onChange={(v) =>
                    updateMember(index, "usn", v.toUpperCase())
                  }
                />
              </div>
            </div>
          ))}
        </section>
      )}

      {event.payment_required && (
        <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
          After submitting your details, select{" "}
          <strong>Finish Payment</strong> to continue to the college
          payment portal.
        </div>
      )}

      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-4">
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-[#33485E]"
          >
            Cancel
          </button>
        )}

        <button
          disabled={
            submitting ||
            teamSize < min ||
            teamSize > max
          }
          className="rounded-xl bg-[#00629B] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {submitting
            ? "Submitting..."
            : "Submit registration details"}
        </button>
      </div>
    </form>
  );
}
