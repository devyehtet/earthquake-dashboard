"use client"

import type React from "react"

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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

interface ResolveReportModalProps {
  report: any
  isOpen: boolean
  onClose: () => void
  onResolve: (resolutionNote: string) => void
}

export function ResolveReportModal({ report, isOpen, onClose, onResolve }: ResolveReportModalProps) {
  const [resolutionNote, setResolutionNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onResolve(resolutionNote)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-gray-950 border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Mark Report as Resolved</DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a resolution note to explain how this issue was addressed.
          </DialogDescription>
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
            <div>
              <div className="mb-4">
                <h3 className="font-medium text-white">Report: {report.title}</h3>
                <p className="text-sm text-gray-400 mt-1">ID: {report.id}</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="resolutionNote" className="text-white">
                Resolution Note
              </Label>
              <Textarea
                id="resolutionNote"
                value={resolutionNote}
                onChange={(e) => setResolutionNote(e.target.value)}
                placeholder="Describe how this issue was resolved..."
                className="min-h-[120px] bg-gray-900 border-gray-700 text-white"
              />
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
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!resolutionNote.trim()}
            >
              Confirm Resolution
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

