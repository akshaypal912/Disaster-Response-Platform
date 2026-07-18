import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const logs = pgTable('logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  disasterId: text('disaster_id').notNull(),
  severity: text('severity').notNull(),
  lat: text('lat').notNull(),
  lng: text('lng').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const feedback = pgTable('feedback', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  rating: integer('rating').notNull(),
  comments: text('comments').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const timelineEvents = pgTable('timeline_events', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  disasterId: text('disaster_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  logs: many(logs),
  feedback: many(feedback),
  timelineEvents: many(timelineEvents),
}));

export const logsRelations = relations(logs, ({ one }) => ({
  author: one(users, {
    fields: [logs.userId],
    references: [users.id],
  }),
}));

export const feedbackRelations = relations(feedback, ({ one }) => ({
  author: one(users, {
    fields: [feedback.userId],
    references: [users.id],
  }),
}));

export const timelineEventsRelations = relations(timelineEvents, ({ one }) => ({
  author: one(users, {
    fields: [timelineEvents.userId],
    references: [users.id],
  }),
}));
