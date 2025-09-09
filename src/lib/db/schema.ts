import { pgTable, text, timestamp, uuid, jsonb, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Forms table - using Clerk user IDs (strings)
export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk user ID is a string
  name: text("name").notNull(),
  description: text("description"),
  schema: jsonb("schema").notNull(), // Form field definitions
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Form responses table
export const formResponses = pgTable("form_responses", {
  id: uuid("id").defaultRandom().primaryKey(),
  formId: uuid("form_id").notNull().references(() => forms.id, { onDelete: "cascade" }),
  data: jsonb("data").notNull(), // Response data
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
  ipAddress: text("ip_address"),
});

// Chat sessions for form building (optional - for persistence)
export const chatSessions = pgTable("chat_sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(), // Clerk user ID
  formId: uuid("form_id").references(() => forms.id, { onDelete: "cascade" }),
  messages: jsonb("messages").notNull().default('[]'), // Chat history
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const formsRelations = relations(forms, ({ many }) => ({
  responses: many(formResponses),
  chatSessions: many(chatSessions),
}));

export const formResponsesRelations = relations(formResponses, ({ one }) => ({
  form: one(forms, {
    fields: [formResponses.formId],
    references: [forms.id],
  }),
}));

export const chatSessionsRelations = relations(chatSessions, ({ one }) => ({
  form: one(forms, {
    fields: [chatSessions.formId],
    references: [forms.id],
  }),
}));

// Types
export type Form = typeof forms.$inferSelect;
export type NewForm = typeof forms.$inferInsert;
export type FormResponse = typeof formResponses.$inferSelect;
export type NewFormResponse = typeof formResponses.$inferInsert;
export type ChatSession = typeof chatSessions.$inferSelect;
export type NewChatSession = typeof chatSessions.$inferInsert;
