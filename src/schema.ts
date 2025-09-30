import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  mime: text('mime').notNull(),
  data: text('data').notNull(),
  expires_at: timestamp('expires_at'),
});
