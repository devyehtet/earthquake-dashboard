"use client"

import type React from "react"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditReportModalProps {
  report: any
  isOpen: boolean
  onClose: () => void
  onSave: (updatedReport: any) => void
}

export function EditReportModal({ report, isOpen, onClose, onSave }: EditReportModalProps) {
  const [formData, setFormData] = useState({
    title: report.title,
    description: report.description,
    severity: report.severity,
    assignedTeam: report.assignedTeam,
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...report,
      ...formData,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-gray-950 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Report</DialogTitle>
          <DialogDescription className="text-gray-400">Make changes to the report details below.</DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-white">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-white">
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="min-h-[120px] bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="severity" className="text-white">
                  Severity
                </Label>
                <Select value={formData.severity} onValueChange={(value) => handleChange("severity", value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignedTeam" className="text-white">
                  Assigned Team
                </Label>
                <Select value={formData.assignedTeam} onValueChange={(value) => handleChange("assignedTeam", value)}>
                  <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700 text-white">
                    <SelectItem value="Team 1">Team 1</SelectItem>
                    <SelectItem value="Team 2">Team 2</SelectItem>
                    <SelectItem value="Team 3">Team 3</SelectItem>
                    <SelectItem value="Team 4">Team 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-700 text-white hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

