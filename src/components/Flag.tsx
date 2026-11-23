import { AE, AT, AU, AZ, BE, BH, BR, CA, CN, ES, GB, HU, IT, JP, MC, MX, NL, QA, SA, SG, US } from "country-flag-icons/react/3x2";

const FLAGS = { AE, AT, AU, AZ, BE, BH, BR, CA, CN, ES, GB, HU, IT, JP, MC, MX, NL, QA, SA, SG, US } as const;

export function Flag({ code, className = "flag" }: { code: string; className?: string }) {
  const Cmp = FLAGS[code as keyof typeof FLAGS];
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden="true" />;
}
