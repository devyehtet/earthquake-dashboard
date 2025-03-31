// External Data Service
// This service connects to government and NGO data feeds

// Types for external data sources
export interface ExternalDataSource {
  id: string
  name: string
  organization: string
  dataType: "buildings" | "roads" | "people" | "resources" | "other"
  lastUpdated: string
  status: "active" | "inactive"
  endpoint: string
  apiKey?: string
}

export interface ExternalDataResponse<T> {
  data: T
  source: string
  timestamp: string
  status: "success" | "partial" | "error"
  message?: string
}

// Population data from government sources
export interface PopulationData {
  region: string
  totalPopulation: number
  affectedPopulation: number
  displacedPopulation: number
  inShelters: number
  lastUpdated: string
}

// Infrastructure data from government/NGO sources
export interface InfrastructureData {
  region: string
  buildingsDamaged: {
    residential: number
    commercial: number
    government: number
    schools: number
    hospitals: number
    other: number
  }
  roadsDamaged: {
    highways: number
    mainRoads: number
    localRoads: number
    bridges: number
  }
  utilitiesAffected: {
    powerOutages: number
    waterDisruptions: number
    communicationsDown: number
  }
  lastUpdated: string
}

// Relief resources data
export interface ReliefResourcesData {
  region: string
  shelters: {
    count: number
    capacity: number
    currentOccupancy: number
  }
  supplies: {
    food: {
      mealsAvailable: number
      waterLiters: number
    }
    medical: {
      firstAidKits: number
      medicineUnits: number
      medicalStaff: number
    }
    other: {
      blankets: number
      tents: number
      hygienePacks: number
    }
  }
  lastUpdated: string
}

// Available external data sources
const DATA_SOURCES: ExternalDataSource[] = [
  {
    id: "gov-population",
    name: "Myanmar Population Data",
    organization: "Myanmar Department of Population",
    dataType: "people",
    lastUpdated: new Date().toISOString(),
    status: "active",
    endpoint: "https://api.myanmar-data.gov.mm/population",
  },
  {
    id: "gov-infrastructure",
    name: "Infrastructure Assessment",
    organization: "Myanmar Department of Infrastructure",
    dataType: "buildings",
    lastUpdated: new Date().toISOString(),
    status: "active",
    endpoint: "https://api.myanmar-data.gov.mm/infrastructure",
  },
  {
    id: "redcross-resources",
    name: "Relief Resources",
    organization: "Myanmar Red Cross",
    dataType: "resources",
    lastUpdated: new Date().toISOString(),
    status: "active",
    endpoint: "https://api.myanmarredcross.org/resources",
  },
  {
    id: "un-assessment",
    name: "UN Damage Assessment",
    organization: "United Nations OCHA",
    dataType: "buildings",
    lastUpdated: new Date().toISOString(),
    status: "active",
    endpoint: "https://api.unocha.org/myanmar/assessment",
  },
]

// Get available data sources
export function getDataSources(): ExternalDataSource[] {
  return DATA_SOURCES
}

// Generic function to fetch data from external sources
async function fetchExternalData<T>(sourceId: string): Promise<ExternalDataResponse<T>> {
  try {
    const source = DATA_SOURCES.find((s) => s.id === sourceId)

    if (!source) {
      throw new Error(`Data source ${sourceId} not found`)
    }

    if (source.status === "inactive") {
      throw new Error(`Data source ${sourceId} is currently inactive`)
    }

    // In a real implementation, this would make an actual API call
    // For now, we'll simulate the response

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For demonstration, return mock data based on the source type
    let mockData: any

    switch (source.dataType) {
      case "people":
        mockData = getMockPopulationData()
        break
      case "buildings":
      case "roads":
        mockData = getMockInfrastructureData()
        break
      case "resources":
        mockData = getMockReliefResourcesData()
        break
      default:
        mockData = { message: "No data available" }
    }

    return {
      data: mockData as T,
      source: source.name,
      timestamp: new Date().toISOString(),
      status: "success",
    }
  } catch (error) {
    console.error(`Error fetching data from external source:`, error)
    return {
      data: {} as T,
      source: sourceId,
      timestamp: new Date().toISOString(),
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

// Get population data from government sources
export async function getPopulationData(): Promise<ExternalDataResponse<PopulationData[]>> {
  return fetchExternalData<PopulationData[]>("gov-population")
}

// Get infrastructure data from government/NGO sources
export async function getInfrastructureData(): Promise<ExternalDataResponse<InfrastructureData[]>> {
  return fetchExternalData<InfrastructureData[]>("gov-infrastructure")
}

// Get relief resources data
export async function getReliefResourcesData(): Promise<ExternalDataResponse<ReliefResourcesData[]>> {
  return fetchExternalData<ReliefResourcesData[]>("redcross-resources")
}

// Get UN damage assessment data
export async function getUNDamageAssessment(): Promise<ExternalDataResponse<InfrastructureData[]>> {
  return fetchExternalData<InfrastructureData[]>("un-assessment")
}

// Combine data from multiple sources
export async function getCombinedImpactData(): Promise<{
  population: PopulationData[]
  infrastructure: InfrastructureData[]
  resources: ReliefResourcesData[]
  lastUpdated: string
  sources: string[]
}> {
  try {
    // Fetch data from all sources in parallel
    const [populationResponse, infrastructureResponse, resourcesResponse] = await Promise.all([
      getPopulationData(),
      getInfrastructureData(),
      getReliefResourcesData(),
    ])

    // Combine the data
    return {
      population: populationResponse.data,
      infrastructure: infrastructureResponse.data,
      resources: resourcesResponse.data,
      lastUpdated: new Date().toISOString(),
      sources: [populationResponse.source, infrastructureResponse.source, resourcesResponse.source],
    }
  } catch (error) {
    console.error("Error fetching combined impact data:", error)
    throw error
  }
}

// Mock data generators
function getMockPopulationData(): PopulationData[] {
  return [
    {
      region: "Mandalay",
      totalPopulation: 1726000,
      affectedPopulation: 42500,
      displacedPopulation: 8700,
      inShelters: 3200,
      lastUpdated: new Date().toISOString(),
    },
    {
      region: "Sagaing",
      totalPopulation: 5325000,
      affectedPopulation: 28900,
      displacedPopulation: 5600,
      inShelters: 2100,
      lastUpdated: new Date().toISOString(),
    },
    {
      region: "Magway",
      totalPopulation: 3917000,
      affectedPopulation: 12300,
      displacedPopulation: 2800,
      inShelters: 1200,
      lastUpdated: new Date().toISOString(),
    },
  ]
}

function getMockInfrastructureData(): InfrastructureData[] {
  return [
    {
      region: "Mandalay",
      buildingsDamaged: {
        residential: 320,
        commercial: 45,
        government: 12,
        schools: 8,
        hospitals: 2,
        other: 28,
      },
      roadsDamaged: {
        highways: 3,
        mainRoads: 12,
        localRoads: 28,
        bridges: 5,
      },
      utilitiesAffected: {
        powerOutages: 42,
        waterDisruptions: 28,
        communicationsDown: 15,
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      region: "Sagaing",
      buildingsDamaged: {
        residential: 180,
        commercial: 22,
        government: 8,
        schools: 5,
        hospitals: 1,
        other: 15,
      },
      roadsDamaged: {
        highways: 1,
        mainRoads: 8,
        localRoads: 19,
        bridges: 3,
      },
      utilitiesAffected: {
        powerOutages: 28,
        waterDisruptions: 18,
        communicationsDown: 10,
      },
      lastUpdated: new Date().toISOString(),
    },
  ]
}

function getMockReliefResourcesData(): ReliefResourcesData[] {
  return [
    {
      region: "Mandalay",
      shelters: {
        count: 12,
        capacity: 4800,
        currentOccupancy: 3200,
      },
      supplies: {
        food: {
          mealsAvailable: 9600,
          waterLiters: 24000,
        },
        medical: {
          firstAidKits: 450,
          medicineUnits: 1200,
          medicalStaff: 45,
        },
        other: {
          blankets: 4200,
          tents: 850,
          hygienePacks: 3800,
        },
      },
      lastUpdated: new Date().toISOString(),
    },
    {
      region: "Sagaing",
      shelters: {
        count: 8,
        capacity: 3200,
        currentOccupancy: 2100,
      },
      supplies: {
        food: {
          mealsAvailable: 6300,
          waterLiters: 16000,
        },
        medical: {
          firstAidKits: 280,
          medicineUnits: 850,
          medicalStaff: 28,
        },
        other: {
          blankets: 2800,
          tents: 520,
          hygienePacks: 2400,
        },
      },
      lastUpdated: new Date().toISOString(),
    },
  ]
}

