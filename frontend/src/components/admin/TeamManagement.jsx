"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Plus, Pencil, Trash2, Save, X, Camera, UserRound, Users,
  UserCheck, CheckCircle2, AlertCircle, ShieldCheck, Layers3,
  Image as ImageIcon, MoreHorizontal,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const inputClass =
  "w-full min-w-0 rounded-xl border border-[#DCE6EF] bg-white px-3.5 py-2.5 text-sm text-[#10243A] placeholder-slate-400 outline-none transition focus:border-[#29A9E0] focus:ring-2 focus:ring-[#29A9E0]/15";

const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-[#00629B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004F7D] disabled:cursor-not-allowed disabled:opacity-50";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-[#DCE6EF] bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50";

const iconButton =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#DCE6EF] bg-white text-[#00629B] transition hover:border-[#A8D8EF] hover:bg-[#F1FAFE]";

const dangerIconButton =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-600 transition hover:bg-rose-50";

const emptyMember = {
  name: "",
  role: "Student Chair",
  email: "",
  linkedin: "",
  image: "",
};

function compressImage(file) {
  return new Promise((resolve, reject) => {
    if (!file?.type?.startsWith("image/")) {
      reject(new Error("Please select a valid image."));
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the selected image."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Could not process the selected image."));
      image.onload = () => {
        const max = 500;
        const ratio = Math.min(1, max / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * ratio));
        canvas.height = Math.max(1, Math.round(image.height * ratio));
        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Image processing is not supported in this browser."));
          return;
        }

        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.84));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function PhotoPicker({ value, onChange, inputRef }) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-semibold uppercase tracking-wider text-slate-600">
        Profile picture <span className="font-normal normal-case text-slate-400">(optional)</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          try {
            onChange(await compressImage(file));
          } catch (error) {
            window.alert(error.message);
          }
          event.target.value = "";
        }}
      />

      {value ? (
        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#DCE6EF] bg-[#F8FAFC] p-3">
          <img
            src={value}
            alt="Selected profile"
            className="h-12 w-12 shrink-0 rounded-full border border-[#DCE6EF] object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-[#10243A]">Photo selected</p>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="mt-1 text-xs font-medium text-[#00629B] hover:underline"
            >
              Change photo
            </button>
          </div>
          <button
            type="button"
            onClick={() => onChange("")}
            className="rounded-lg p-2 text-rose-600 hover:bg-rose-50"
            aria-label="Remove photo"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex min-h-[68px] w-full items-center gap-3 rounded-xl border border-dashed border-[#C9D9E7] bg-[#F8FAFC] p-3 text-left transition hover:border-[#29A9E0] hover:bg-[#F1FAFE]"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#DCE6EF] bg-white text-[#00629B]">
            <Camera size={18} />
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-semibold text-[#10243A]">Upload profile photo</span>
            <span className="mt-1 block text-[10px] text-slate-500">JPG, PNG or WEBP · auto-compressed</span>
          </span>
        </button>
      )}
    </div>
  );
}

function FormCard({ title, description, icon: Icon, accent = "blue", children }) {
  const accentClass =
    accent === "cyan"
      ? "bg-cyan-50 text-cyan-700"
      : accent === "orange"
        ? "bg-orange-50 text-orange-700"
        : "bg-[#EAF6FC] text-[#00629B]";

  return (
    <section className="flex min-w-0 flex-col rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-[0_8px_24px_rgba(16,36,58,0.045)] sm:p-5">
      <div className="mb-4 flex items-start gap-3">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${accentClass}`}>
          <Icon size={17} />
        </span>
        <div className="min-w-0">
          <h3 className="text-sm font-bold text-[#10243A]">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">{description}</p>
        </div>
      </div>
      <div className="flex-1">{children}</div>
    </section>
  );
}

function ProfileAvatar({ image, name, size = "md" }) {
  const dimensions = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-12 w-12";

  return (
    <div className={`${dimensions} shrink-0 overflow-hidden rounded-full border border-[#DCE6EF] bg-[#F1F6FA]`}>
      {image ? (
        <img src={image} alt={name || "Profile"} className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-[#7A91A5]">
          <UserRound size={size === "lg" ? 26 : 19} />
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tone = "blue" }) {
  const toneClass =
    tone === "cyan"
      ? "bg-cyan-50 text-cyan-700"
      : tone === "orange"
        ? "bg-orange-50 text-orange-700"
        : "bg-[#EAF6FC] text-[#00629B]";

  return (
    <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E3ECF3] bg-[#F8FAFC] p-3 sm:p-4">
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={19} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-0.5 text-xl font-bold leading-none text-[#10243A]">{value}</p>
      </div>
    </div>
  );
}

export default function TeamManagement() {
  const {
    adminProfile,
    executiveCommittee = [],
    addExecomMember,
    updateExecomMember,
    removeExecomMember,
    branchCounsellor,
    updateBranchCounsellor,
    studentCommittees = [],
    addStudentCommittee,
    updateStudentCommittee,
    removeStudentCommittee,
    addStudentCommitteeMember,
    updateStudentCommitteeMember,
    removeStudentCommitteeMember,
  } = useAdmin();

  const allowed =
    adminProfile?.role === "super_admin" && adminProfile?.is_active === true;

  const officePhotoRef = useRef(null);
  const counsellorPhotoRef = useRef(null);
  const sacPhotoRef = useRef(null);

  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);
  const [officeForm, setOfficeForm] = useState(emptyMember);
  const [editingOfficeId, setEditingOfficeId] = useState(null);
  const [counsellorForm, setCounsellorForm] = useState({
    name: "",
    image: "",
    email: "",
    linkedin: "",
  });
  const [committeeName, setCommitteeName] = useState("");
  const [selectedCommittee, setSelectedCommittee] = useState("");
  const [sacMember, setSacMember] = useState({ name: "", image: "" });
  const [editingSacMember, setEditingSacMember] = useState(null);
  const [committeeEdits, setCommitteeEdits] = useState({});

  useEffect(() => {
    setCounsellorForm({
      name: branchCounsellor?.name || "",
      image: branchCounsellor?.image || "",
      email: branchCounsellor?.email || "",
      linkedin: branchCounsellor?.linkedin || "",
    });
  }, [branchCounsellor]);

  useEffect(() => {
    if (!selectedCommittee && studentCommittees.length) {
      setSelectedCommittee(String(studentCommittees[0].id));
    }
    if (
      selectedCommittee &&
      !studentCommittees.some((item) => String(item.id) === String(selectedCommittee))
    ) {
      setSelectedCommittee(studentCommittees[0] ? String(studentCommittees[0].id) : "");
    }
  }, [studentCommittees, selectedCommittee]);

  const totalMembers = useMemo(
    () => studentCommittees.reduce((total, committee) => total + (committee.members || []).length, 0),
    [studentCommittees]
  );

  if (!allowed) {
    return (
      <div className="mt-8 rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        Only an active Super Admin can access Team Management.
      </div>
    );
  }

  const notify = (result, successText) => {
    setNotice({
      type: result?.success ? "success" : "error",
      text: result?.success
        ? successText
        : result?.message || "Something went wrong. Please try again.",
    });
  };

  const run = async (callback, successText) => {
    setBusy(true);
    try {
      const result = await callback();
      notify(result, successText);
      return result;
    } catch (error) {
      notify({ success: false, message: error.message }, successText);
      return { success: false };
    } finally {
      setBusy(false);
    }
  };

  const submitOfficeBearer = async (event) => {
    event.preventDefault();
    const result = await run(
      () =>
        editingOfficeId
          ? updateExecomMember(editingOfficeId, officeForm)
          : addExecomMember(officeForm),
      editingOfficeId ? "Office Bearer updated." : "Office Bearer added."
    );

    if (result.success) {
      setOfficeForm(emptyMember);
      setEditingOfficeId(null);
      if (officePhotoRef.current) officePhotoRef.current.value = "";
    }
  };

  const editOfficeBearer = (member) => {
    setOfficeForm({
      name: member.name || "",
      role: member.role || "Student Chair",
      email: member.email || "",
      linkedin: member.linkedin || "",
      image: member.image || "",
    });
    setEditingOfficeId(member.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitCounsellor = async (event) => {
    event.preventDefault();
    await run(() => updateBranchCounsellor(counsellorForm), "Branch Counsellor details updated.");
  };

  const submitCommittee = async (event) => {
    event.preventDefault();
    const result = await run(
      () => addStudentCommittee({ name: committeeName }),
      "SAC committee created."
    );
    if (result.success) setCommitteeName("");
  };

  const submitSacMember = async (event) => {
    event.preventDefault();
    if (!selectedCommittee) {
      setNotice({ type: "error", text: "Create a committee before adding members." });
      return;
    }

    const result = await run(
      () =>
        editingSacMember
          ? updateStudentCommitteeMember(selectedCommittee, editingSacMember, sacMember)
          : addStudentCommitteeMember(selectedCommittee, sacMember),
      editingSacMember ? "SAC member updated." : "SAC member added."
    );

    if (result.success) {
      setSacMember({ name: "", image: "" });
      setEditingSacMember(null);
      if (sacPhotoRef.current) sacPhotoRef.current.value = "";
    }
  };

  const startEditSacMember = (committee, member) => {
    setSelectedCommittee(String(committee.id));
    setSacMember({ name: member.name || "", image: member.image || "" });
    setEditingSacMember(member.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const removeOfficeBearer = async (member) => {
    if (!window.confirm(`Remove ${member.name} from Office Bearers?`)) return;
    await run(() => removeExecomMember(member.id), "Office Bearer removed.");
  };

  const removeCommittee = async (committee) => {
    if (!window.confirm(`Delete ${committee.name} and all its members?`)) return;
    await run(() => removeStudentCommittee(committee.id), "Committee deleted.");
  };

  const removeSacMember = async (committee, member) => {
    if (!window.confirm(`Remove ${member.name} from ${committee.name}?`)) return;
    await run(
      () => removeStudentCommitteeMember(committee.id, member.id),
      "SAC member removed."
    );
  };

  return (
    <section className="mt-7 space-y-6">
      <header className="flex flex-col gap-3 rounded-2xl border border-[#DCE6EF] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[#10243A] sm:text-2xl">
              Manage Team
            </h2>
            <span className="hidden rounded-full bg-[#EAF6FC] px-2.5 py-1 text-[10px] font-semibold text-[#00629B] sm:inline-flex">
              Team workspace
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-500">
            Manage Office Bearers, the Branch Counsellor and SAC committees.
          </p>
        </div>
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#CDE7F4] bg-[#F1FAFE] px-3 py-1.5 text-[11px] font-semibold text-[#00629B]">
          <ShieldCheck size={13} /> Super Admin access
        </span>
      </header>

      {notice && (
        <div
          role="status"
          className={`flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm ${
            notice.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700"
          }`}
        >
          {notice.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{notice.text}</span>
          <button
            type="button"
            className="ml-auto"
            onClick={() => setNotice(null)}
            aria-label="Dismiss notification"
          >
            <X size={15} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        <StatCard icon={UserCheck} label="Office Bearers" value={executiveCommittee.length} />
        <StatCard icon={Layers3} label="SAC Committees" value={studentCommittees.length} tone="orange" />
        <StatCard icon={Users} label="SAC Members" value={totalMembers} />
      </div>

      <div className="grid items-stretch gap-4 xl:grid-cols-3">
        <FormCard
          title={editingOfficeId ? "Edit Office Bearer" : "Add Office Bearer"}
          description="Add a student leader with their photo, name and position."
          icon={UserCheck}
        >
          <form onSubmit={submitOfficeBearer} className="space-y-3.5">
            <PhotoPicker
              value={officeForm.image}
              onChange={(image) => setOfficeForm((prev) => ({ ...prev, image }))}
              inputRef={officePhotoRef}
            />
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Full name *
              </label>
              <input
                className={inputClass}
                placeholder="e.g. Suhan Ganesh"
                value={officeForm.name}
                onChange={(event) => setOfficeForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Role / Position *
              </label>
              <input
                className={inputClass}
                placeholder="Student Chair"
                value={officeForm.role}
                onChange={(event) => setOfficeForm((prev) => ({ ...prev, role: event.target.value }))}
                required
              />
            </div>
            <div className="grid min-w-0 gap-2 sm:grid-cols-2">
              <input
                type="email"
                className={inputClass}
                placeholder="Email (optional)"
                value={officeForm.email}
                onChange={(event) => setOfficeForm((prev) => ({ ...prev, email: event.target.value }))}
              />
              <input
                type="url"
                className={inputClass}
                placeholder="LinkedIn URL (optional)"
                value={officeForm.linkedin}
                onChange={(event) => setOfficeForm((prev) => ({ ...prev, linkedin: event.target.value }))}
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button className={`${primaryButton} flex-1`} disabled={busy}>
                {editingOfficeId ? <Save size={16} /> : <Plus size={16} />}
                {editingOfficeId ? "Save Changes" : "Add Office Bearer"}
              </button>
              {editingOfficeId && (
                <button
                  type="button"
                  className={secondaryButton}
                  onClick={() => {
                    setEditingOfficeId(null);
                    setOfficeForm(emptyMember);
                  }}
                >
                  <X size={15} /> Cancel
                </button>
              )}
            </div>
          </form>
        </FormCard>

        <FormCard
          title="Branch Counsellor"
          description="Update the counsellor details displayed on the public Team page."
          icon={UserRound}
          accent="cyan"
        >
          <form onSubmit={submitCounsellor} className="space-y-3.5">
            <PhotoPicker
              value={counsellorForm.image}
              onChange={(image) => setCounsellorForm((prev) => ({ ...prev, image }))}
              inputRef={counsellorPhotoRef}
            />
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Full name *
              </label>
              <input
                className={inputClass}
                placeholder="Branch Counsellor name"
                value={counsellorForm.name}
                onChange={(event) => setCounsellorForm((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>
            <input
              type="email"
              className={inputClass}
              placeholder="Email (optional)"
              value={counsellorForm.email}
              onChange={(event) => setCounsellorForm((prev) => ({ ...prev, email: event.target.value }))}
            />
            <input
              type="url"
              className={inputClass}
              placeholder="LinkedIn URL (optional)"
              value={counsellorForm.linkedin}
              onChange={(event) => setCounsellorForm((prev) => ({ ...prev, linkedin: event.target.value }))}
            />
            <button className={`${primaryButton} w-full`} disabled={busy}>
              <Save size={16} /> Save Branch Counsellor
            </button>
          </form>
        </FormCard>

        <FormCard
          title={editingSacMember ? "Edit SAC Member" : "Add SAC Member"}
          description="Choose a committee, then add or update its member."
          icon={Users}
          accent="orange"
        >
          <form onSubmit={submitSacMember} className="space-y-3.5">
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Select committee *
              </label>
              <select
                className={inputClass}
                value={selectedCommittee}
                onChange={(event) => {
                  setSelectedCommittee(event.target.value);
                  setEditingSacMember(null);
                  setSacMember({ name: "", image: "" });
                }}
                required
              >
                <option value="">Select a committee</option>
                {studentCommittees.map((committee) => (
                  <option key={committee.id} value={committee.id}>{committee.name}</option>
                ))}
              </select>
            </div>
            <PhotoPicker
              value={sacMember.image}
              onChange={(image) => setSacMember((prev) => ({ ...prev, image }))}
              inputRef={sacPhotoRef}
            />
            <div>
              <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Member name *
              </label>
              <input
                className={inputClass}
                placeholder="Full name"
                value={sacMember.name}
                onChange={(event) => setSacMember((prev) => ({ ...prev, name: event.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2 pt-1">
              <button className={`${primaryButton} flex-1`} disabled={busy || !studentCommittees.length}>
                {editingSacMember ? <Save size={16} /> : <Plus size={16} />}
                {editingSacMember ? "Save Member" : "Add SAC Member"}
              </button>
              {editingSacMember && (
                <button
                  type="button"
                  className={secondaryButton}
                  onClick={() => {
                    setEditingSacMember(null);
                    setSacMember({ name: "", image: "" });
                  }}
                >
                  <X size={15} /> Cancel
                </button>
              )}
            </div>
            {!studentCommittees.length && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-700">
                Create a committee below before adding members.
              </p>
            )}
          </form>
        </FormCard>
      </div>

      <section className="rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-[#10243A]">
              Current Office Bearers <span className="text-[#00629B]">({executiveCommittee.length})</span>
            </h3>
            <p className="mt-1 text-xs text-slate-500">These profiles are visible on the public Team page.</p>
          </div>
        </div>

        {executiveCommittee.length ? (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {executiveCommittee.map((member) => (
              <article
                key={member.id}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E3ECF3] bg-white p-3 transition hover:border-[#B8DCEC] hover:shadow-sm"
              >
                <ProfileAvatar image={member.image} name={member.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#10243A]">{member.name}</p>
                  <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-wide text-[#00629B]">
                    {member.role}
                  </p>
                </div>
                <div className="flex shrink-0 gap-1.5">
                  <button type="button" onClick={() => editOfficeBearer(member)} className={iconButton} title="Edit Office Bearer" aria-label={`Edit ${member.name}`}>
                    <Pencil size={14} />
                  </button>
                  <button type="button" onClick={() => removeOfficeBearer(member)} className={dangerIconButton} title="Delete Office Bearer" aria-label={`Delete ${member.name}`}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-[#DCE6EF] p-6 text-center text-sm text-slate-500">
            No Office Bearers have been added yet.
          </p>
        )}
      </section>

      <section className="max-w-2xl rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-[#10243A]">Current Branch Counsellor</h3>
            <p className="mt-1 text-xs text-slate-500">Current public-facing counsellor profile.</p>
          </div>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-[10px] font-semibold text-cyan-700">Branch Counsellor</span>
        </div>
        {counsellorForm.name ? (
          <div className="flex items-center gap-3 rounded-xl border border-[#E3ECF3] bg-[#F8FAFC] p-3">
            <ProfileAvatar image={counsellorForm.image} name={counsellorForm.name} size="lg" />
            <div className="min-w-0">
              <p className="text-sm font-bold text-[#10243A]">{counsellorForm.name}</p>
              <p className="mt-0.5 text-xs text-slate-500">Branch Counsellor</p>
              {counsellorForm.email && <p className="mt-1 truncate text-xs text-slate-500">{counsellorForm.email}</p>}
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-dashed border-[#DCE6EF] p-6 text-center text-sm text-slate-500">
            Branch Counsellor details have not been configured yet.
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-[#DCE6EF] bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-base font-bold text-[#10243A]">SAC Committees and Members</h3>
            <p className="mt-1 text-xs text-slate-500">Create committees, rename them and manage their members.</p>
          </div>
          <form onSubmit={submitCommittee} className="flex w-full gap-2 sm:w-auto">
            <input
              className={`${inputClass} sm:w-64`}
              placeholder="New committee name"
              value={committeeName}
              onChange={(event) => setCommitteeName(event.target.value)}
              required
            />
            <button className={`${primaryButton} shrink-0`} disabled={busy}>
              <Plus size={15} /> Add Committee
            </button>
          </form>
        </div>

        {studentCommittees.length ? (
          <div className="grid gap-4 xl:grid-cols-2">
            {studentCommittees.map((committee) => (
              <article
                key={committee.id}
                className="min-w-0 overflow-hidden rounded-xl border border-[#E3ECF3] bg-white"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-2 border-b border-[#EDF2F6] bg-[#F8FAFC] p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF6FC] text-[#00629B]">
                    <Users size={17} />
                  </span>
                  <input
                    aria-label={`Committee name for ${committee.name}`}
                    className={`${inputClass} min-w-[120px] flex-1 bg-white font-semibold`}
                    value={committeeEdits[committee.id] ?? committee.name}
                    onChange={(event) =>
                      setCommitteeEdits((prev) => ({ ...prev, [committee.id]: event.target.value }))
                    }
                  />
                  <span className="hidden rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500 sm:inline-flex">
                    {(committee.members || []).length} members
                  </span>
                  <button
                    type="button"
                    className={iconButton}
                    title="Save committee name"
                    aria-label={`Save ${committee.name}`}
                    onClick={async () => {
                      const result = await run(
                        () =>
                          updateStudentCommittee(committee.id, {
                            name: committeeEdits[committee.id] ?? committee.name,
                          }),
                        "Committee name updated."
                      );
                      if (result.success) {
                        setCommitteeEdits((prev) => {
                          const next = { ...prev };
                          delete next[committee.id];
                          return next;
                        });
                      }
                    }}
                  >
                    <Save size={14} />
                  </button>
                  <button
                    type="button"
                    className={dangerIconButton}
                    title="Delete committee"
                    aria-label={`Delete ${committee.name}`}
                    onClick={() => removeCommittee(committee)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <div className="p-3">
                  {(committee.members || []).length ? (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {committee.members.map((member) => (
                        <div
                          key={member.id}
                          className="flex min-w-0 items-center gap-2.5 rounded-xl border border-[#EDF2F6] bg-white p-2.5 transition hover:border-[#CDE7F4]"
                        >
                          <ProfileAvatar image={member.image} name={member.name} size="sm" />
                          <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#10243A]">
                            {member.name}
                          </span>
                          <button
                            type="button"
                            onClick={() => startEditSacMember(committee, member)}
                            className="rounded-lg p-2 text-[#00629B] transition hover:bg-[#EAF6FC]"
                            title="Edit member"
                            aria-label={`Edit ${member.name}`}
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSacMember(committee, member)}
                            className="rounded-lg p-2 text-rose-600 transition hover:bg-rose-50"
                            title="Remove member"
                            aria-label={`Remove ${member.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-[#DCE6EF] bg-[#FBFCFD] px-4 py-5 text-center">
                      <Users size={19} className="mx-auto text-slate-300" />
                      <p className="mt-2 text-xs text-slate-400">No members added to this committee yet.</p>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#DCE6EF] p-8 text-center">
            <ImageIcon size={24} className="mx-auto text-slate-300" />
            <p className="mt-2 text-sm font-medium text-[#10243A]">No SAC committees yet</p>
            <p className="mt-1 text-xs text-slate-500">Create your first committee using the field above.</p>
          </div>
        )}
      </section>
    </section>
  );
}
