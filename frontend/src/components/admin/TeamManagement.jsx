"use client";

import { useEffect, useRef, useState } from "react";
import {
  Plus, Pencil, Trash2, Save, X, Camera, UserRound, Users,
  UserCheck, RefreshCw, CheckCircle2, AlertCircle,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const inputClass = "w-full rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 outline-none transition focus:border-[#29A9E0] focus:ring-1 focus:ring-[#29A9E0]";
const primaryButton = "inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00629B] to-[#0077B8] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50";
const secondaryButton = "inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";
const emptyMember = { name: "", role: "Student Chair", email: "", linkedin: "", image: "" };

function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith("image/")) return reject(new Error("Please select a valid image."));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not process the selected image."));
      image.onload = () => {
        const max = 400;
        const ratio = Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function PhotoPicker({ value, onChange, inputRef, label = "Profile picture" }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-600">{label} (optional)</label>
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="hidden" onChange={async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try { onChange(await compressImage(file)); }
        catch (error) { window.alert(error.message); }
        event.target.value = "";
      }} />
      {value ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#DCE6EF] bg-slate-50 p-3">
          <img src={value} alt="Selected profile" className="h-14 w-14 rounded-full border border-[#DCE6EF] object-cover" />
          <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-[#10243A]">Photo selected</p><button type="button" onClick={() => inputRef.current?.click()} className="mt-1 text-xs font-medium text-[#00629B]">Change photo</button></div>
          <button type="button" onClick={() => onChange("")} className="rounded-lg p-2 text-rose-600 hover:bg-rose-50" aria-label="Remove photo"><X size={16}/></button>
        </div>
      ) : (
        <button type="button" onClick={() => inputRef.current?.click()} className="flex w-full items-center gap-3 rounded-xl border border-dashed border-[#C9D9E7] bg-slate-50 p-3 text-left transition hover:border-[#29A9E0] hover:bg-[#F4FAFD]">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#DCE6EF] bg-white text-slate-500"><Camera size={19}/></span>
          <span><span className="block text-xs font-semibold text-[#10243A]">Click to upload profile photo</span><span className="mt-1 block text-[10px] text-slate-500">JPG, PNG or WEBP · auto-compressed</span></span>
        </button>
      )}
    </div>
  );
}

function SectionCard({ title, subtitle, icon: Icon, children }) {
  return <section className="min-w-0 rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-[0_8px_24px_rgba(16,36,58,0.045)] sm:p-5">
    <div className="mb-4 flex items-start gap-2"><span className="rounded-lg bg-[#EAF6FC] p-2 text-[#00629B]"><Icon size={17}/></span><div><h3 className="text-sm font-bold text-[#10243A]">{title}</h3>{subtitle && <p className="mt-0.5 text-[11px] leading-4 text-slate-500">{subtitle}</p>}</div></div>
    {children}
  </section>;
}

export default function TeamManagement() {
  const {
    adminProfile, executiveCommittee, addExecomMember, updateExecomMember, removeExecomMember,
    branchCounsellor, updateBranchCounsellor, studentCommittees, addStudentCommittee,
    updateStudentCommittee, removeStudentCommittee, addStudentCommitteeMember,
    updateStudentCommitteeMember, removeStudentCommitteeMember,
  } = useAdmin();
  const allowed = adminProfile?.role === "super_admin" && adminProfile?.is_active === true;
  const officePhotoRef = useRef(null);
  const counsellorPhotoRef = useRef(null);
  const sacPhotoRef = useRef(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [officeForm, setOfficeForm] = useState(emptyMember);
  const [editingOfficeId, setEditingOfficeId] = useState(null);
  const [counsellorForm, setCounsellorForm] = useState({ name: "", image: "", email: "", linkedin: "" });
  const [committeeName, setCommitteeName] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const [sacMember, setSacMember] = useState({ name: "", image: "" });
  const [editingSacMember, setEditingSacMember] = useState(null);
  const [committeeEdits, setCommitteeEdits] = useState({});

  useEffect(() => {
    setCounsellorForm({ name: branchCounsellor?.name || "", image: branchCounsellor?.image || "", email: branchCounsellor?.email || "", linkedin: branchCounsellor?.linkedin || "" });
  }, [branchCounsellor]);
  useEffect(() => {
    if (!selectedCommittee && studentCommittees.length) setSelectedCommittee(String(studentCommittees[0].id));
    if (selectedCommittee && !studentCommittees.some((item) => String(item.id) === String(selectedCommittee))) setSelectedCommittee(studentCommittees[0] ? String(studentCommittees[0].id) : "");
  }, [studentCommittees, selectedCommittee]);

  if (!allowed) return <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">Only an active Super Admin can access Team Management.</div>;

  const notify = (result, successText) => setNotice({ type: result?.success ? "success" : "error", text: result?.success ? successText : (result?.message || "Something went wrong. Please try again.") });
  const run = async (callback, successText) => {
    setBusy(true);
    try { const result = await callback(); notify(result, successText); return result; }
    catch (error) { notify({ success: false, message: error.message }, successText); return { success: false }; }
    finally { setBusy(false); }
  };

  const submitOfficeBearer = async (event) => {
    event.preventDefault();
    const result = await run(() => editingOfficeId ? updateExecomMember(editingOfficeId, officeForm) : addExecomMember(officeForm), editingOfficeId ? "Office Bearer updated." : "Office Bearer added.");
    if (result.success) { setOfficeForm(emptyMember); setEditingOfficeId(null); }
  };
  const editOfficeBearer = (member) => { setOfficeForm({ name: member.name || "", role: member.role || "Student Chair", email: member.email || "", linkedin: member.linkedin || "", image: member.image || "" }); setEditingOfficeId(member.id); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const submitCounsellor = async (event) => { event.preventDefault(); await run(() => updateBranchCounsellor(counsellorForm), "Branch Counsellor details updated."); };
  const submitCommittee = async (event) => { event.preventDefault(); const result = await run(() => addStudentCommittee({ name: committeeName }), "SAC committee created."); if (result.success) setCommitteeName(""); };
  const submitSacMember = async (event) => {
    event.preventDefault();
    if (!selectedCommittee) { setNotice({ type: "error", text: "Create a committee before adding members." }); return; }
    const result = await run(() => editingSacMember ? updateStudentCommitteeMember(selectedCommittee, editingSacMember, sacMember) : addStudentCommitteeMember(selectedCommittee, sacMember), editingSacMember ? "SAC member updated." : "SAC member added.");
    if (result.success) { setSacMember({ name: "", image: "" }); setEditingSacMember(null); }
  };
  const startEditSacMember = (committee, member) => { setSelectedCommittee(String(committee.id)); setSacMember({ name: member.name || "", image: member.image || "" }); setEditingSacMember(member.id); window.scrollTo({ top: 0, behavior: "smooth" }); };

  return <section className="mt-7 space-y-6">
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div><h2 className="text-2xl font-bold text-[#10243A]">Manage Team</h2><p className="mt-1 text-sm text-slate-500">Manage Office Bearers, the Branch Counsellor and SAC committees in one place.</p></div>
      <span className="rounded-full border border-[#CDE7F4] bg-[#F1FAFE] px-3 py-1 text-[11px] font-semibold text-[#00629B]">Super Admin only</span>
    </header>

    {notice && <div role="status" className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm ${notice.type === "success" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-rose-200 bg-rose-50 text-rose-700"}`}>{notice.type === "success" ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}<span>{notice.text}</span><button type="button" className="ml-auto" onClick={() => setNotice(null)} aria-label="Dismiss"><X size={15}/></button></div>}

    {/* All three management forms sit side by side on wide screens. */}
    <div className="grid items-start gap-4 xl:grid-cols-3">
      <SectionCard title={editingOfficeId ? "Edit Office Bearer" : "Add Office Bearer"} subtitle="Add student leaders with their photo, name and position." icon={UserCheck}>
        <form onSubmit={submitOfficeBearer} className="space-y-3.5">
          <PhotoPicker value={officeForm.image} onChange={(image) => setOfficeForm((p) => ({ ...p, image }))} inputRef={officePhotoRef}/>
          <div><label className="mb-1 block text-[11px] font-semibold uppercase text-slate-600">Full name *</label><input className={inputClass} placeholder="e.g. Suhan Ganesh" value={officeForm.name} onChange={(e) => setOfficeForm((p) => ({ ...p, name: e.target.value }))} required/></div>
          <div><label className="mb-1 block text-[11px] font-semibold uppercase text-slate-600">Role / Position *</label><input className={inputClass} placeholder="Student Chair" value={officeForm.role} onChange={(e) => setOfficeForm((p) => ({ ...p, role: e.target.value }))} required/></div>
           <div className="grid gap-3 sm:grid-cols-2"><input type="email" className={inputClass} placeholder="Email (optional)" value={officeForm.email} onChange={(e) => setOfficeForm((p) => ({ ...p, email: e.target.value }))}/><input type="url" className={inputClass} placeholder="LinkedIn URL (optional)" value={officeForm.linkedin} onChange={(e) => setOfficeForm((p) => ({ ...p, linkedin: e.target.value }))}/></div>
          <div className="flex gap-2"><button className={`${primaryButton} flex-1`} disabled={busy}>{editingOfficeId ? <Save size={16}/> : <Plus size={16}/>} {editingOfficeId ? "Save Changes" : "Add Office Bearer"}</button>{editingOfficeId && <button type="button" className={secondaryButton} onClick={() => { setEditingOfficeId(null); setOfficeForm(emptyMember); }}><X size={15}/> Cancel</button>}</div>
        </form>
      </SectionCard>

      <SectionCard title="Branch Counsellor" subtitle="Update the counsellor details shown on the public Team page." icon={UserRound}>
        <form onSubmit={submitCounsellor} className="space-y-3.5">
          <PhotoPicker value={counsellorForm.image} onChange={(image) => setCounsellorForm((p) => ({ ...p, image }))} inputRef={counsellorPhotoRef}/>
          <div><label className="mb-1 block text-[11px] font-semibold uppercase text-slate-600">Full name *</label><input className={inputClass} placeholder="Branch Counsellor name" value={counsellorForm.name} onChange={(e) => setCounsellorForm((p) => ({ ...p, name: e.target.value }))} required/></div>
          <input type="email" className={inputClass} placeholder="Email (optional)" value={counsellorForm.email} onChange={(e) => setCounsellorForm((p) => ({ ...p, email: e.target.value }))}/>
          <input type="url" className={inputClass} placeholder="LinkedIn URL (optional)" value={counsellorForm.linkedin} onChange={(e) => setCounsellorForm((p) => ({ ...p, linkedin: e.target.value }))}/>
          <button className={`${primaryButton} w-full`} disabled={busy}><Save size={16}/> Save Branch Counsellor</button>
        </form>
      </SectionCard>

      <SectionCard title="Add SAC Member" subtitle="Choose the committee from the dropdown, then add the member." icon={Users}>
        <form onSubmit={submitSacMember} className="space-y-3.5">
          <div><label className="mb-1 block text-[11px] font-semibold uppercase text-slate-600">Select committee *</label><select className={inputClass} value={selectedCommittee} onChange={(e) => { setSelectedCommittee(e.target.value); setEditingSacMember(null); setSacMember({ name: "", image: "" }); }} required><option value="">Select a committee</option>{studentCommittees.map((committee) => <option key={committee.id} value={committee.id}>{committee.name}</option>)}</select></div>
          <PhotoPicker value={sacMember.image} onChange={(image) => setSacMember((p) => ({ ...p, image }))} inputRef={sacPhotoRef}/>
          <div><label className="mb-1 block text-[11px] font-semibold uppercase text-slate-600">Member name *</label><input className={inputClass} placeholder="Full name" value={sacMember.name} onChange={(e) => setSacMember((p) => ({ ...p, name: e.target.value }))} required/></div>
          <div className="flex gap-2"><button className={`${primaryButton} flex-1`} disabled={busy || !studentCommittees.length}>{editingSacMember ? <Save size={16}/> : <Plus size={16}/>} {editingSacMember ? "Save Member" : "Add SAC Member"}</button>{editingSacMember && <button type="button" className={secondaryButton} onClick={() => { setEditingSacMember(null); setSacMember({ name: "", image: "" }); }}><X size={15}/> Cancel</button>}</div>
          {!studentCommittees.length && <p className="text-xs text-amber-700">Create a committee below before adding members.</p>}
        </form>
      </SectionCard>
    </div>

    {/* Current records and editing actions are displayed below the three forms. */}
    <section className="rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2"><div><h3 className="text-base font-bold text-[#10243A]">Current Office Bearers ({executiveCommittee.length})</h3><p className="text-xs text-slate-500">These details are visible on the public Team page.</p></div></div>
      {executiveCommittee.length ? <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">{executiveCommittee.map((member) => <article key={member.id} className="flex min-w-0 items-start gap-3 rounded-xl border border-[#E3ECF3] p-3"><div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#DCE6EF] bg-slate-50">{member.image ? <img src={member.image} alt={member.name} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-slate-400"><UserRound size={20}/></div>}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-[#10243A]">{member.name}</p><p className="text-[10px] font-bold uppercase tracking-wide text-[#00629B]">{member.role}</p> </div><div className="flex shrink-0 gap-1"><button type="button" onClick={() => editOfficeBearer(member)} className="rounded-lg border border-[#DCE6EF] p-2 text-[#00629B] hover:bg-[#F1FAFE]" title="Edit Office Bearer"><Pencil size={14}/></button><button type="button" onClick={async () => { if (window.confirm(`Delete ${member.name}?`)) await run(() => removeExecomMember(member.id), "Office Bearer removed."); }} className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50" title="Delete Office Bearer"><Trash2 size={14}/></button></div></article>)}</div> : <p className="rounded-xl border border-dashed border-[#DCE6EF] p-6 text-center text-sm text-slate-500">No Office Bearers have been added yet.</p>}
    </section>

    <section className="rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 text-base font-bold text-[#10243A]">Current Branch Counsellor</h3>
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#DCE6EF] bg-slate-50">{counsellorForm.image ? <img src={counsellorForm.image} alt={counsellorForm.name || "Branch Counsellor"} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-slate-400"><UserRound size={20}/></div>}</div>
        <div className="min-w-0"><p className="text-sm font-bold text-[#10243A]">{counsellorForm.name || "Not configured"}</p><p className="text-xs text-slate-500">Branch Counsellor</p>{counsellorForm.email && <p className="text-xs text-slate-500">{counsellorForm.email}</p>}</div>
      </div>
    </section>

    <section className="rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-base font-bold text-[#10243A]">SAC Committees and Members</h3><p className="text-xs text-slate-500">Create committees, rename them and manage their members.</p></div><form onSubmit={submitCommittee} className="flex w-full gap-2 sm:w-auto"><input className={`${inputClass} min-w-0 sm:w-64`} placeholder="New committee name" value={committeeName} onChange={(e) => setCommitteeName(e.target.value)} required/><button className={primaryButton} disabled={busy}><Plus size={15}/> Add Committee</button></form></div>
      {studentCommittees.length ? <div className="grid gap-4 xl:grid-cols-2">{studentCommittees.map((committee) => <article key={committee.id} className="rounded-xl border border-[#E3ECF3] p-4"><div className="flex flex-wrap items-center gap-2"><Users size={17} className="text-[#00629B]"/><input aria-label="Committee name" className={`${inputClass} min-w-0 flex-1 font-semibold`} value={committeeEdits[committee.id] ?? committee.name} onChange={(e) => setCommitteeEdits((p) => ({ ...p, [committee.id]: e.target.value }))}/><button type="button" className="rounded-lg border border-[#DCE6EF] p-2 text-[#00629B] hover:bg-[#F1FAFE]" title="Save committee name" onClick={async () => { const result = await run(() => updateStudentCommittee(committee.id, { name: committeeEdits[committee.id] ?? committee.name }), "Committee name updated."); if (result.success) setCommitteeEdits((p) => { const next = { ...p }; delete next[committee.id]; return next; }); }}><Save size={14}/></button><button type="button" className="rounded-lg border border-rose-200 p-2 text-rose-600 hover:bg-rose-50" title="Delete committee" onClick={async () => { if (window.confirm(`Delete ${committee.name} and all its members?`)) await run(() => removeStudentCommittee(committee.id), "Committee deleted."); }}><Trash2 size={14}/></button></div>
        <div className="mt-3 space-y-2">{(committee.members || []).length ? committee.members.map((member) => <div key={member.id} className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-2"><div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-white">{member.image ? <img src={member.image} alt={member.name} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-slate-400"><UserRound size={16}/></div>}</div><span className="min-w-0 flex-1 truncate text-sm text-[#10243A]">{member.name}</span><button type="button" onClick={() => startEditSacMember(committee, member)} className="rounded-md p-1.5 text-[#00629B] hover:bg-[#E6F4FB]" title="Edit member"><Pencil size={13}/></button><button type="button" onClick={async () => { if (window.confirm(`Remove ${member.name}?`)) await run(() => removeStudentCommitteeMember(committee.id, member.id), "SAC member removed."); }} className="rounded-md p-1.5 text-rose-600 hover:bg-rose-50" title="Remove member"><Trash2 size={13}/></button></div>) : <p className="rounded-lg border border-dashed border-[#DCE6EF] p-3 text-center text-xs text-slate-400">No members added to this committee yet.</p>}</div>
      </article>)}</div> : <p className="rounded-xl border border-dashed border-[#DCE6EF] p-6 text-center text-sm text-slate-500">No SAC committees yet. Create the first committee above.</p>}
    </section>
  </section>;
}
