import { supabaseClient, checkTableExists, createImpactDataTable } from "./supabase-client"

// Sample data for the impact_data table
const sampleData = [
  {
    date: "2025-03-25",
    location: "Yangon",
    buildings: 12,
    roads: 5,
    affected: 230,
    lost: 3,
  },
  {
    date: "2025-03-26",
    location: "Mandalay",
    buildings: 18,
    roads: 7,
    affected: 345,
    lost: 5,
  },
  {
    date: "2025-03-27",
    location: "Sagaing",
    buildings: 24,
    roads: 9,
    affected: 412,
    lost: 7,
  },
  {
    date: "2025-03-28",
    location: "Bago",
    buildings: 15,
    roads: 6,
    affected: 287,
    lost: 4,
  },
  {
    date: "2025-03-29",
    location: "Ayeyarwady",
    buildings: 9,
    roads: 4,
    affected: 198,
    lost: 2,
  },
]

// Set up the Supabase database
export async function setupSupabase(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if the table already exists
    const tableExists = await checkTableExists()

    if (tableExists) {
      return {
        success: true,
        message: 'Table "impact_data" already exists.',
      }
    }

    // Create the table
    const created = await createImpactDataTable()

    if (!created) {
      return {
        success: false,
        message: 'Failed to create the "impact_data" table. You may need to create it manually.',
      }
    }

    return {
      success: true,
      message: 'Successfully created the "impact_data" table.',
    }
  } catch (error: any) {
    console.error("Error setting up Supabase:", error)
    return {
      success: false,
      message: `Error setting up Supabase: ${error.message}`,
    }
  }
}

// Insert sample data into the impact_data table
export async function insertSampleData(): Promise<{ success: boolean; message: string }> {
  try {
    // Check if the table exists
    const tableExists = await checkTableExists()

    if (!tableExists) {
      return {
        success: false,
        message: 'Table "impact_data" does not exist. Please create it first.',
      }
    }

    // Insert the sample data
    const { error } = await supabaseClient.from("impact_data").insert(sampleData)

    if (error) {
      return {
        success: false,
        message: `Failed to insert sample data: ${error.message}`,
      }
    }

    return {
      success: true,
      message: 'Successfully inserted sample data into the "impact_data" table.',
    }
  } catch (error: any) {
    console.error("Error inserting sample data:", error)
    return {
      success: false,
      message: `Error inserting sample data: ${error.message}`,
    }
  }
}

