"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  // Debug language changes
  useEffect(() => {
    console.log("Current language:", language)
    // Set the lang attribute on the html element
    document.documentElement.lang = language

    // Add a class to the body for styling purposes
    if (language === "my") {
      document.body.classList.add("myanmar-lang")
    } else {
      document.body.classList.remove("myanmar-lang")
    }
  }, [language])

  return (
    <div className="flex items-center">
      <div className="flex rounded-md overflow-hidden border">
        <Button
          variant={language === "en" ? "default" : "outline"}
          size="sm"
          className="rounded-none px-3 py-1 h-8 text-xs"
          onClick={() => setLanguage("en")}
        >
          EN
        </Button>
        <Button
          variant={language === "my" ? "default" : "outline"}
          size="sm"
          className="rounded-none px-3 py-1 h-8 text-xs"
          onClick={() => setLanguage("my")}
        >
          MY
        </Button>
      </div>
    </div>
  )
}

