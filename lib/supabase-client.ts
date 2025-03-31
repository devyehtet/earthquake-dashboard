import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client with your credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ubyluqywzwkecmngvsrx.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVieWx1cXl3endrZWNtbmd2c3J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MDg1NTMsImV4cCI6MjA1ODk4NDU1M30.dl7D003ElqMyX6d3CIf6h2Xbtwp2hMCB-Zmj2lVBFBg"

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

// Check if the impact_data table exists
export async function checkTableExists(): Promise<boolean> {
  try {
    const { data, error } = await supabaseClient.from("impact_data").select("id").limit(1)

    // If there's an error about the table not existing, return false
    if (error && error.message && error.message.includes("does not exist")) {
      console.log("Table impact_data does not exist")
      return false
    }

    // If there's some other error, log it but still return false
    if (error) {
      console.error("Error checking if table exists:", error)
      return false
    }

    // If we got here with no error, the table exists
    return true
  } catch (error) {
    console.error("Error checking if table exists:", error)
    return false
  }
}

// Helper function to check connection
export async function checkSupabaseConnection(): Promise<{
  connected: boolean
  tableExists: boolean
  error?: string
}> {
  try {
    // First check if we can connect to Supabase at all
    // We'll try to query a non-existent table to see if we get a "table doesn't exist" error
    // which would indicate the connection is working but the table is missing
    try {
      const { error } = await supabaseClient.from("_dummy_query").select("*").limit(1)

      // If we get here with no error, something unusual happened
      if (!error) {
        console.log("Unexpected success querying non-existent table")
      }

      // If the error message indicates the table doesn't exist, that's actually good
      // It means we're connected to Supabase
      if (error && error.message && error.message.includes("does not exist")) {
        // Now check if our actual table exists
        const tableExists = await checkTableExists()

        return {
          connected: true,
          tableExists,
          error: tableExists ? undefined : 'Table "impact_data" does not exist',
        }
      } else if (error) {
        // Some other error occurred
        return {
          connected: false,
          tableExists: false,
          error: `Connection error: ${error.message}`,
        }
      }
    } catch (connectionError: any) {
      // Failed to connect to Supabase
      return {
        connected: false,
        tableExists: false,
        error: `Connection error: ${connectionError.message}`,
      }
    }

    // Fallback return if we somehow get here
    return {
      connected: false,
      tableExists: false,
      error: "Unknown connection error",
    }
  } catch (error: any) {
    console.error("Supabase connection error:", error)
    return {
      connected: false,
      tableExists: false,
      error: error?.message || "Unknown connection error",
    }
  }
}

// Function to create the impact_data table
export async function createImpactDataTable(): Promise<boolean> {
  try {
    // SQL to create the table
    const { error } = await supabaseClient.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS public.impact_data (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          date DATE NOT NULL,
          location TEXT NOT NULL,
          buildings INTEGER NOT NULL DEFAULT 0,
          roads INTEGER NOT NULL DEFAULT 0,
          affected INTEGER NOT NULL DEFAULT 0,
          lost INTEGER NOT NULL DEFAULT 0,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
      `,
    })

    if (error) {
      console.error("Error creating table:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error creating impact_data table:", error)
    return false
  }
}

