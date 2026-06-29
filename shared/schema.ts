import { relations } from "drizzle-orm";
import { boolean, integer, jsonb, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: varchar("role", { length: 40 }).notNull().default("admin"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  category: varchar("category", { length: 120 }).notNull(),
  shortDescription: text("short_description").notNull(),
  fullDescription: text("full_description").notNull(),
  challenge: text("challenge").notNull(),
  solution: text("solution").notNull(),
  results: text("results").notNull(),
  architecture: text("architecture").notNull(),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  published: boolean("published").notNull().default(true),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  readTime: varchar("read_time", { length: 40 }).notNull(),
  coverImageUrl: text("cover_image_url"),
  published: boolean("published").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 120 }).notNull(),
  name: varchar("name", { length: 120 }).notNull(),
  level: integer("level").notNull().default(70),
  highlighted: boolean("highlighted").notNull().default(false)
});

export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  company: varchar("company", { length: 180 }).notNull(),
  role: varchar("role", { length: 180 }).notNull(),
  location: varchar("location", { length: 180 }),
  startDate: varchar("start_date", { length: 40 }).notNull(),
  endDate: varchar("end_date", { length: 40 }),
  description: text("description").notNull(),
  technologies: jsonb("technologies").$type<string[]>().notNull().default([]),
  displayOrder: integer("display_order").notNull().default(0)
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 160 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  company: varchar("company", { length: 180 }),
  subject: varchar("subject", { length: 220 }).notNull(),
  message: text("message").notNull(),
  status: varchar("status", { length: 40 }).notNull().default("new"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const siteSettings = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 120 }).notNull().unique(),
  value: jsonb("value").$type<Record<string, unknown>>().notNull().default({}),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const analyticsEvents = pgTable("analytics_events", {
  id: serial("id").primaryKey(),
  eventName: varchar("event_name", { length: 120 }).notNull(),
  route: varchar("route", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const userRelations = relations(users, () => ({}));

export const contactSchema = z.object({
  name: z.string().min(2).max(160),
  email: z.string().email().max(255),
  company: z.string().max(180).optional().or(z.literal("")),
  subject: z.string().min(3).max(220),
  message: z.string().min(20).max(4000),
  website: z.string().max(0).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export const projectInputSchema = createInsertSchema(projects).omit({ id: true, createdAt: true, updatedAt: true });
export const articleInputSchema = createInsertSchema(articles).omit({ id: true, createdAt: true, updatedAt: true });
export const skillInputSchema = createInsertSchema(skills).omit({ id: true });
export const experienceInputSchema = createInsertSchema(experiences).omit({ id: true });

export type Project = typeof projects.$inferSelect;
export type Article = typeof articles.$inferSelect;
export type Skill = typeof skills.$inferSelect;
export type Experience = typeof experiences.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
