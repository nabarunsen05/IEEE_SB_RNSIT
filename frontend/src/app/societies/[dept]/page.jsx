import DepartmentSocieties from "../../../views/DepartmentSocieties";
import { departmentsInfo } from "../../../data/societiesData";

export function generateStaticParams() {
  return Object.keys(departmentsInfo).map((code) => ({
    dept: code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const code = (resolvedParams?.dept || "").toUpperCase();
  const info = departmentsInfo[code];

  if (!info) {
    return {
      title: "Department Societies | IEEE SB RNSIT",
      description: "Explore IEEE society chapters at RNSIT.",
    };
  }

  return {
    title: `${info.code} Societies | IEEE SB RNSIT`,
    description: `Explore IEEE society chapters, domains, and faculty advisors in the ${info.name} at RNSIT.`,
  };
}

export default async function DepartmentPage({ params }) {
  const resolvedParams = await params;
  return <DepartmentSocieties deptCode={resolvedParams?.dept} />;
}
