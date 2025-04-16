import { DashboardMain } from "@/components/dashboard/DashboardMain";

export default function OrganisationPage({
  organisationId,
}: {
  organisationId: string;
}) {
  return (
    <>
      <h1>{organisationId}</h1>
      {/* <DashboardMain /> */}
    </>
  );
}
