import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required')
}

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './src/database/drizzle/**/*.ts',
  out: './drizzle',
  dbCredentials: {
    url: databaseUrl,
  }
})