import { db } from './index.ts';
import { feedback, users } from './schema.ts';
import { eq, desc } from 'drizzle-orm';

export async function createFeedback(uid: string, rating: number, comments: string) {
  try {
    const user = await db.select().from(users).where(eq(users.uid, uid));
    if (!user[0]) {
      throw new Error(`User with uid ${uid} not found`);
    }
    const result = await db.insert(feedback)
      .values({
        userId: user[0].id,
        rating,
        comments,
      })
      .returning();
    return result[0];
  } catch (error) {
    console.error("Database query (createFeedback) failed:", error);
    throw new Error("Failed to store user feedback.", { cause: error });
  }
}

export async function getFeedbackByUid(uid: string) {
  try {
    const result = await db.select({
      id: feedback.id,
      rating: feedback.rating,
      comments: feedback.comments,
      createdAt: feedback.createdAt,
    })
    .from(feedback)
    .innerJoin(users, eq(feedback.userId, users.id))
    .where(eq(users.uid, uid))
    .orderBy(desc(feedback.createdAt));
    return result;
  } catch (error) {
    console.error("Database query (getFeedbackByUid) failed:", error);
    throw new Error("Failed to retrieve user feedback.", { cause: error });
  }
}
