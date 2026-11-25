import SocietyDetail from "../../../../views/SocietyDetail";
import { departmentsInfo, societies } from "../../../../data/societiesData";

export function generateStaticParams() {
  return societies.map((s) => ({
    dept: s.department.toLowerCase(),
    society: s.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const code = (resolvedParams?.dept || "").toUpperCase();
  const slug = resolvedParams?.society || "";
  const info = departmentsInfo[code];
  const society = societies.find(
    (s) => s.department === code && s.slug === slug
  );

  if (!info || !society) {
    return {
      title: "Society | IEEE SB RNSIT",
      description: "Explore IEEE society chapters at RNSIT.",
    };
  }

  return {
    title: `${society.name} | IEEE SB RNSIT`,
    description: society.about
      ? society.about.slice(0, 160)
      : `Learn about ${society.name} at the ${info.name}, RNSIT.`,
  };
}

export default async function SocietyPage({ params }) {
  const resolvedParams = await params;
  return (
    <SocietyDetail
      deptCode={resolvedParams?.dept}
      societySlug={resolvedParams?.society}
    />
  );
}
