"use client"

import { useState, useEffect } from "react"
import { checkSupabaseConnection } from "@/lib/supabase-client"
import { setupSupabase, insertSampleData } from "@/lib/setup-supabase"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<{
    connected: boolean
    tableExists: boolean
    error?: string
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [setupStatus, setSetupStatus] = useState<{
    inProgress: boolean
    success?: boolean
    message?: string
  }>({ inProgress: false })

  const testConnection = async () => {
    try {
      setIsLoading(true)
      const status = await checkSupabaseConnection()
      setConnectionStatus(status)
    } catch (err) {
      setConnectionStatus({
        connected: false,
        tableExists: false,
        error: "Failed to check connection",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetupDatabase = async () => {
    try {
      setSetupStatus({ inProgress: true })
      const result = await setupSupabase()
      setSetupStatus({
        inProgress: false,
        success: result.success,
        message: result.message,
      })

      // Refresh connection status after setup
      await testConnection()
    } catch (error: any) {
      setSetupStatus({
        inProgress: false,
        success: false,
        message: error?.message || "Unknown error during setup",
      })
    }
  }

  const handleInsertSampleData = async () => {
    try {
      setSetupStatus({ inProgress: true, message: "Inserting sample data..." })
      const result = await insertSampleData()
      setSetupStatus({
        inProgress: false,
        success: result.success,
        message: result.message,
      })

      // Refresh connection status after inserting data
      await testConnection()
    } catch (error: any) {
      setSetupStatus({
        inProgress: false,
        success: false,
        message: error?.message || "Unknown error inserting sample data",
      })
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Database Connection
        </CardTitle>
        <CardDescription>Check and manage your Supabase database connection</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="status">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="status">Connection Status</TabsTrigger>
            <TabsTrigger value="setup">Database Setup</TabsTrigger>
          </TabsList>

          <TabsContent value="status" className="space-y-4 pt-4">
            {connectionStatus === null && !isLoading ? (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Connection Status Unknown</AlertTitle>
                <AlertDescription>Click "Test Connection" to check your Supabase connection.</AlertDescription>
              </Alert>
            ) : null}

            {isLoading ? (
              <div className="flex items-center justify-center p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-muted-foreground">Testing connection...</p>
                </div>
              </div>
            ) : null}

            {connectionStatus && !isLoading ? (
              <div className="space-y-4">
                {connectionStatus.connected ? (
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>Connected to Supabase</AlertTitle>
                    <AlertDescription>
                      Your application is successfully connected to the Supabase backend.
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Connection Failed</AlertTitle>
                    <AlertDescription>
                      {connectionStatus.error || "Couldn't connect to Supabase. Please check your credentials."}
                    </AlertDescription>
                  </Alert>
                )}

                {connectionStatus.connected && !connectionStatus.tableExists ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Table Not Found</AlertTitle>
                    <AlertDescription>
                      The "impact_data" table does not exist in your Supabase database. Go to the "Database Setup" tab
                      to create it.
                    </AlertDescription>
                  </Alert>
                ) : null}

                {connectionStatus.connected && connectionStatus.tableExists ? (
                  <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <AlertTitle>Table Found</AlertTitle>
                    <AlertDescription>The "impact_data" table exists and is ready to use.</AlertDescription>
                  </Alert>
                ) : null}
              </div>
            ) : null}
          </TabsContent>

          <TabsContent value="setup" className="space-y-4 pt-4">
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Option 1: Automatic Setup</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Let the application try to set up the database automatically.
                </p>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={handleSetupDatabase}
                    disabled={setupStatus.inProgress || (connectionStatus?.tableExists ?? false)}
                  >
                    {setupStatus.inProgress ? "Setting up..." : "Create Table"}
                  </Button>

                  <Button
                    onClick={handleInsertSampleData}
                    disabled={setupStatus.inProgress || !(connectionStatus?.tableExists ?? false)}
                    variant="outline"
                  >
                    Insert Sample Data
                  </Button>
                </div>
              </div>

              <div className="rounded-md border p-4">
                <h3 className="font-medium mb-2">Option 2: Manual Setup</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Follow these steps to manually set up your database:
                </p>
                <ol className="list-decimal list-inside text-sm space-y-2">
                  <li>
                    Go to your{" "}
                    <a
                      href="https://app.supabase.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Supabase dashboard
                    </a>
                  </li>
                  <li>Select your project</li>
                  <li>Go to "Table Editor" in the left sidebar</li>
                  <li>Click "New Table"</li>
                  <li>Set the name to "impact_data"</li>
                  <li>
                    Add the following columns:
                    <ul className="list-disc list-inside ml-4 mt-1">
                      <li>id (type: uuid, Default Value: uuid_generate_v4(), Primary Key: checked)</li>
                      <li>date (type: date)</li>
                      <li>location (type: text)</li>
                      <li>buildings (type: int8)</li>
                      <li>roads (type: int8)</li>
                      <li>affected (type: int8)</li>
                      <li>lost (type: int8)</li>
                      <li>created_at (type: timestamptz, Default Value: now())</li>
                    </ul>
                  </li>
                  <li>Click "Save" to create the table</li>
                </ol>
              </div>
            </div>

            {setupStatus.message && (
              <Alert variant={setupStatus.success ? "default" : "destructive"}>
                {setupStatus.success ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{setupStatus.success ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{setupStatus.message}</AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={testConnection} disabled={isLoading} variant="outline" size="sm">
          {isLoading ? "Testing..." : "Test Connection"}
        </Button>

        <p className="text-xs text-muted-foreground">Using sample data when database is unavailable</p>
      </CardFooter>
    </Card>
  )
}

