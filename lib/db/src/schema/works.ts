import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const worksTable = pgTable("works", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  details: text("details").notNull(),
  link: text("link"),
  summary: text("summary"),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertWorkSchema = createInsertSchema(worksTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertWork = z.infer<typeof insertWorkSchema>;
export type Work = typeof worksTable.$inferSelect;
