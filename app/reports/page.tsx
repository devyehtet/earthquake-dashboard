import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ReportsList } from "@/components/reports-list"

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Incident Reports</h1>
      </div>
      <ReportsList />
    </div>
  )
}

