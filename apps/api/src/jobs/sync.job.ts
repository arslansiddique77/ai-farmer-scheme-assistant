import { prisma } from "@kisaniyat/database";
import { logger } from "../lib/logger.js";

/**
 * Government-data sync job.
 *
 * IMPORTANT (ethical data policy):
 *  - Prefer official APIs where available.
 *  - Use scheduled fetching only where permitted by robots.txt & site terms.
 *  - Store the source URL and last-updated time for every imported record.
 *  - Insert ONLY new records (de-duplicated via a stable externalId).
 *  - Mark newly inserted updates so the UI can show a NEW badge.
 *
 * The fetch is stubbed here (returns candidate records). In production this
 * would call PM-KISAN / PIB / MyGov / e-NAM official APIs or parse permitted
 * RSS feeds.
 */
async function fetchCandidateUpdates() {
  // Placeholder for real API / RSS fetch. Returns a deterministic sample so the
  // de-duplication logic (insert-only-new) is demonstrable and testable.
  return [
    {
      externalId: "sync-pmkisan-latest",
      title: "PM-KISAN e-KYC deadline reminder",
      summary:
        "Farmers must complete e-KYC to receive the next PM-KISAN instalment on time.",
      source: "PM-KISAN Portal",
      officialLink: "https://pmkisan.gov.in",
      badge: "NEW UPDATE",
      publishedAt: new Date(),
    },
  ];
}

export interface SyncResult {
  source: string;
  found: number;
  inserted: number;
  status: "success" | "error";
}

export async function runSchemeSync(): Promise<SyncResult> {
  const source = "Official Government Portals";
  try {
    const candidates = await fetchCandidateUpdates();
    let inserted = 0;

    for (const c of candidates) {
      const exists = await prisma.govUpdate.findUnique({
        where: { externalId: c.externalId },
      });
      if (!exists) {
        await prisma.govUpdate.create({ data: c });
        // Broadcast a notification for the new item
        await prisma.notification.create({
          data: {
            type: "update",
            title: "Government Update",
            message: c.title,
          },
        });
        inserted++;
      }
    }

    await prisma.automationLog.create({
      data: { source, recordsFound: candidates.length, status: "success", message: `${inserted} inserted` },
    });
    logger.info(`Sync complete — found ${candidates.length}, inserted ${inserted}`);
    return { source, found: candidates.length, inserted, status: "success" };
  } catch (err) {
    await prisma.automationLog.create({
      data: { source, status: "error", message: String(err) },
    });
    logger.error("Sync failed", err);
    return { source, found: 0, inserted: 0, status: "error" };
  }
}
