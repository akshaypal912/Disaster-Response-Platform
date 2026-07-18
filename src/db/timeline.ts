import { db } from './index.ts';
import { timelineEvents, users } from './schema.ts';
import { eq, and, desc } from 'drizzle-orm';

export async function createTimelineEvent(
  uid: string,
  disasterId: string,
  title: string,
  description: string,
  status: string
) {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    if (!user[0]) {
      throw new Error(`User with uid ${uid} not found`);
    }
    const result = await db.insert(timelineEvents)
      .values({
        userId: user[0].id,
        disasterId,
        title,
        description,
        status,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (createTimelineEvent) failed:", error);
    throw new Error("Failed to store timeline event.", { cause: error });
  }
}

export async function getTimelineEventsByDisaster(uid: string, disasterId: string) {
  try {
    const result = await db.select({
      id: timelineEvents.id,
      disasterId: timelineEvents.disasterId,
      title: timelineEvents.title,
      description: timelineEvents.description,
      status: timelineEvents.status,
      createdAt: timelineEvents.createdAt,
    })
    .from(timelineEvents)
    .innerJoin(users, eq(timelineEvents.userId, users.id))
    .where(and(eq(users.uid, uid), eq(timelineEvents.disasterId, disasterId)))
    .orderBy(desc(timelineEvents.createdAt));
    return result;
  } catch (error) {
    console.error("Database query (getTimelineEventsByDisaster) failed:", error);
    throw new Error("Failed to retrieve timeline events.", { cause: error });
  }
}
