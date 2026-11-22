import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Login | IEEE SB RNSIT",
  description: "Executive administrator login portal.",
};

export default async function LoginPage({ searchParams }) {
  const params = await searchParams;
  const query = params && Object.keys(params).length > 0
    ? `?${new URLSearchParams(params).toString()}`
    : "";
  redirect(`/admin${query}`);
}
