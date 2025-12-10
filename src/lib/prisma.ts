import { PrismaClient } from "@prisma/client";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

// В dev режиме переиспользуем инстанс, чтобы избежать переподключений при HMR.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const dbPath = path.resolve(process.cwd(), "prisma", "dev.db");
  const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
