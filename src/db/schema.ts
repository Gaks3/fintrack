import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema } from 'drizzle-zod'

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
})

export const insertAccountSchema = createInsertSchema(accounts, {
  name: (schema) => schema.trim().min(1, { message: 'Name is required' }),
})

export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  plaidId: text('plaid_id'),
  name: text('name').notNull(),
  userId: text('user_id').notNull(),
})

export const insertCategorySchema = createInsertSchema(accounts, {
  name: (schema) => schema.trim().min(1, { message: 'Name is required' }),
})
