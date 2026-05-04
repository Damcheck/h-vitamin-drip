import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function run() {
  console.log('🔒 Applying Audit Fixes Schema & RLS policies via Supabase REST API...\n')

  const sqlContent = fs.readFileSync(path.join(process.cwd(), 'audit-fixes.sql'), 'utf-8')
  const statements = sqlContent.split(';').map(s => s.trim()).filter(s => s.length > 0)

  let successCount = 0
  let failCount = 0

  for (const sql of statements) {
    // Skip empty comments and simple formatting
    if (sql.startsWith('-- ──') || sql.startsWith('-- Initialize')) continue

    const label = sql.split('\n')[0].substring(0, 80) + (sql.length > 80 ? '...' : '')
    
    // Use raw query endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ query: sql })
    })

    if (!res.ok) {
      console.log(`  ⚠️  Failed: ${label}`)
      failCount++
    } else {
      console.log(`  ✅ Success: ${label}`)
      successCount++
    }
  }

  console.log(`\n✅ Finished running ${successCount} statements successfully.`)
  if (failCount > 0) {
    console.log(`⚠️  ${failCount} statements failed. Please run audit-fixes.sql in the Supabase SQL Editor.`)
  }
}

run()
