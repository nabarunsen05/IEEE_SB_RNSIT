import DomainDetail from "../../../views/DomainDetail";

export const metadata = {
  title: "Domain Details | IEEE Student Branch RNSIT",
  description: "Explore curriculum, focus areas, tech stacks, and workshops for this technical domain at IEEE SB RNSIT.",
};

export default async function DomainDetailPage({ params }) {
  const resolvedParams = await params;
  return <DomainDetail slug={resolvedParams.slug} />;
}
