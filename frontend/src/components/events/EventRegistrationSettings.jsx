"use client";

export default function EventRegistrationSettings({ value, onChange }) {
  const update = (key, next) => onChange({ [key]: next });
  return (
    <section className="rounded-2xl border border-[#B8DCEC] bg-[#F4FAFD] p-4 sm:p-5">
      <div className="mb-4">
        <h4 className="text-sm font-bold text-[#10243A]">Event registration settings</h4>
        <p className="mt-1 text-xs leading-5 text-slate-600">Configure public registration and the college payment redirect. Students do not need an account.</p>
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold text-[#10243A]">
        <input type="checkbox" checked={!!value.registration_enabled} onChange={(e) => update("registration_enabled", e.target.checked)} className="h-4 w-4 accent-[#00629B]" />
        Enable registration for this event
      </label>
      {value.registration_enabled && (
        <div className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Registration type</span><select value={value.registration_type || "individual"} onChange={(e) => onChange({ registration_type: e.target.value, min_team_size: e.target.value === "individual" ? 1 : Math.max(2, Number(value.min_team_size || 2)), max_team_size: e.target.value === "individual" ? 1 : Math.max(2, Number(value.max_team_size || 2)) })} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm"><option value="individual">Individual</option><option value="team">Team</option></select></label>
            {value.registration_type === "team" && <><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Minimum team size (including leader)</span><input type="number" min="2" max="20" value={value.min_team_size || 2} onChange={(e) => update("min_team_size", Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Maximum team size (including leader)</span><input type="number" min={value.min_team_size || 2} max="20" value={value.max_team_size || 2} onChange={(e) => update("max_team_size", Number(e.target.value))} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label></>}
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Registration deadline</span><input type="datetime-local" value={value.registration_deadline || ""} onChange={(e) => update("registration_deadline", e.target.value)} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label>
            <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Registration capacity (optional)</span><input type="number" min="1" value={value.registration_capacity ?? ""} onChange={(e) => update("registration_capacity", e.target.value)} placeholder="No limit" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label>
          </div>
          <div className="border-t border-[#D5E8F2] pt-4">
            <label className="flex items-center gap-3 text-sm font-semibold text-[#10243A]"><input type="checkbox" checked={!!value.payment_required} onChange={(e) => update("payment_required", e.target.checked)} className="h-4 w-4 accent-[#00629B]" />Payment is required</label>
            {value.payment_required && <div className="mt-3 space-y-3"><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">College payment portal URL *</span><input type="url" required value={value.payment_portal_url || ""} onChange={(e) => update("payment_portal_url", e.target.value)} placeholder="https://college-payment-portal..." className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label><label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Payment instructions (optional)</span><textarea rows={2} value={value.payment_instructions || ""} onChange={(e) => update("payment_instructions", e.target.value)} placeholder="Instructions shown before continuing to payment" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label></div>}
          </div>
        </div>
      )}
    </section>
  );
}
