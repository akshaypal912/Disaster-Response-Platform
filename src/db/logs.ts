import { db } from './index.ts';
import { logs, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function createLog(uid: string, disasterId: string, severity: string, lat: string, lng: string, message: string) {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    if (!user[0]) {
      throw new Error(`User with uid ${uid} not found`);
    }
    const result = await db.insert(logs)
      .values({
        userId: user[0].id,
        disasterId,
        severity,
        lat,
        lng,
        message,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (createLog) failed:", error);
    throw new Error("Failed to store SOS event log.", { cause: error });
  }
}

export async function getLogsByUid(uid: string) {
  try {
    const result = await db.select({
      id: logs.id,
      disasterId: logs.disasterId,
      severity: logs.severity,
      lat: logs.lat,
      lng: logs.lng,
      message: logs.message,
      createdAt: logs.createdAt,
    })
    .from(logs)
    .innerJoin(users, eq(logs.userId, users.id))
    .where(eq(users.uid, uid))
    .orderBy(desc(logs.createdAt));
    return result;
  } catch (error) {
    console.error("Database query (getLogsByUid) failed:", error);
    throw new Error("Failed to retrieve SOS event logs.", { cause: error });
  }
}
export async function getAllLogs() {
  try {
    const result = await db.select({
      id: logs.id,
      disasterId: logs.disasterId,
      severity: logs.severity,
      lat: logs.lat,
      lng: logs.lng,
      message: logs.message,
      createdAt: logs.createdAt,
      email: users.email,
    })
    .from(logs)
    .innerJoin(users, eq(logs.userId, users.id))
    .orderBy(desc(logs.createdAt));
    return result;
  } catch (error) {
    console.error("Database query (getAllLogs) failed:", error);
    throw new Error("Failed to retrieve all logs.", { cause: error });
  }
}
