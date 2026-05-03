import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function main() {
  console.log("Signing up admin user...")
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@hvitamindrip.ng',
    password: 'hvitamin2026',
  })

  if (error) {
    console.error("Error signing up:", error.message)
  } else {
    console.log("Successfully signed up admin user!")
  }
}

main()
