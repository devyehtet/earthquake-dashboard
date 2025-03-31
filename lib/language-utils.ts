// Helper functions for language switching

export function applyLanguageStyles(language: string) {
  if (language === "my") {
    document.documentElement.lang = "my"
    document.body.classList.add("myanmar-lang")
  } else {
    document.documentElement.lang = "en"
    document.body.classList.remove("myanmar-lang")
  }
}

export function getDirection(language: string): "ltr" | "rtl" {
  // Myanmar is left-to-right, just like English
  return "ltr"
}

