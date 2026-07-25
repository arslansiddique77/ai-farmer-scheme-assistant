import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton, created lazily on first property access.
 *
 * Lazy instantiation prevents exhausting DB connections during dev hot-reload
 * and lets modules that merely import `prisma` load even before a live query
 * engine is available (e.g. in unit tests that never touch the database).
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createClient(): PrismaClient {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client =
      globalForPrisma.prisma ?? (globalForPrisma.prisma = createClient());
    const value = (client as Record<string | symbol, unknown>)[prop];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(client)
      : value;
  },
});

export * from "@prisma/client";
