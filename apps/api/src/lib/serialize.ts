// Serializers convert DB rows into the JSON shape the frontend expects.
// The row interfaces are declared locally so the code type-checks even before
// `prisma generate` has produced the full model types (they are structurally
// compatible with the generated Prisma models).

interface SchemeRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  level: "CENTRAL" | "STATE";
  state: string | null;
  description: string;
  eligibility: string;
  benefits: string;
  applicationProcess: string;
  requiredDocuments: string;
  officialLink: string;
  status: "ACTIVE" | "CLOSING_SOON" | "CLOSED" | "UPCOMING";
  deadline: Date | null;
  isNew: boolean;
  source: string;
  lastUpdated: Date;
  tags: string | null;
}

interface UpdateRow {
  id: string;
  title: string;
  summary: string;
  source: string;
  officialLink: string;
  publishedAt: Date;
  badge: string;
}

const parse = (s: string | null): string[] => {
  if (!s) return [];
  try {
    return JSON.parse(s) as string[];
  } catch {
    return [];
  }
};

const levelMap: Record<SchemeRow["level"], string> = {
  CENTRAL: "Central",
  STATE: "State",
};
const statusMap: Record<SchemeRow["status"], string> = {
  ACTIVE: "Active",
  CLOSING_SOON: "Closing Soon",
  CLOSED: "Closed",
  UPCOMING: "Upcoming",
};

/** Convert a DB Scheme into the JSON shape the frontend expects. */
export function serializeScheme(s: SchemeRow) {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    category: s.category,
    level: levelMap[s.level],
    state: s.state ?? undefined,
    description: s.description,
    eligibility: parse(s.eligibility),
    benefits: parse(s.benefits),
    applicationProcess: parse(s.applicationProcess),
    requiredDocuments: parse(s.requiredDocuments),
    officialLink: s.officialLink,
    status: statusMap[s.status],
    deadline: s.deadline?.toISOString(),
    isNew: s.isNew,
    source: s.source,
    lastUpdated: s.lastUpdated.toISOString(),
    tags: parse(s.tags),
  };
}

export function serializeUpdate(u: UpdateRow) {
  return {
    id: u.id,
    title: u.title,
    summary: u.summary,
    source: u.source,
    officialLink: u.officialLink,
    publishedAt: u.publishedAt.toISOString(),
    badge: u.badge,
  };
}
