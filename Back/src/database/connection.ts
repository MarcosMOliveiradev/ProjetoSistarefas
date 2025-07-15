import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { env } from '../lib/env'
import * as schema from './drizzle'

const conection = postgres(env.DATABASE_URL)

export const db = drizzle(conection, { 
    schema,
    casing: 'snake_case',
})