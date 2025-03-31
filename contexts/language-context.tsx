"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "my"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    "app.title": "MEDC",
    language: "Language",
    "language.en": "English",
    "language.my": "မြန်မာ",
    "impact.title": "Impact Data",
    "impact.description": "View and analyze the impact of earthquakes on infrastructure and population",
    "tab.buildings": "Buildings",
    "tab.roads": "Roads",
    "tab.affected": "Affected",
    "tab.lost": "Lost",
    "tab.infrastructure": "Infrastructure",
    "tab.economic": "Economic",
    "tab.relief": "Relief",
    "tab.medical": "Medical",
    "tab.response": "Response",
    "label.buildings": "Buildings Damaged",
    "label.roads": "Roads Damaged",
    "label.affected": "People Affected",
    "label.lost": "People Lost/Missing",
    "label.infrastructure": "Infrastructure Damage",
    "label.economic": "Economic Loss (USD)",
    "label.relief": "Relief Centers",
    "label.medical": "Medical Facilities",
    "label.response": "Response Teams",
    "label.total": "Total",
    "label.detailed": "Detailed Breakdown",
    "label.date": "Date",
    "label.location": "Location",
    "data.source": "Data source",
    "data.sample": "Sample Data",
    "data.database": "Supabase Database",
    "data.sample.alert.title": "Using Sample Data",
    "data.sample.alert.description":
      'The database table "impact_data" doesn\'t exist yet. Using sample data for demonstration.',
    "error.title": "Error",
    "error.nodata.title": "No Data Available",
    "error.nodata.description": "There is currently no impact data available. Please check back later.",
    loading: "Loading impact data...",
    "form.title": "Submit Impact Data",
    "form.description": "Add new earthquake impact data to the database",
    "form.tab.basic": "Basic Info",
    "form.tab.damage": "Damage",
    "form.tab.response": "Response",
    "form.submit": "Submit Data",
    "form.submitting": "Submitting...",
    "form.success": "Success",
    "form.error": "Error",
    "form.success.message": "Data submitted successfully!",
    "form.error.message": "Failed to submit data. The database table may not exist yet.",
  },
  my: {
    "app.title": "MEDC",
    language: "ဘာသာစကား",
    "language.en": "အင်္ဂလိပ်",
    "language.my": "မြန်မာ",
    "impact.title": "သက်ရောက်မှုဒေတာ",
    "impact.description": "ငလျင်များ၏ အခြေခံအဆောက်အအုံနှင့် လူဦးရေအပေါ် သက်ရောက်မှုကို ကြည့်ရှုလေ့လာပါ",
    "tab.buildings": "အဆောက်အဦးများ",
    "tab.roads": "လမ်းများ",
    "tab.affected": "ထိခိုက်ခံရသူများ",
    "tab.lost": "ပျောက်ဆုံးသူများ",
    "tab.infrastructure": "အခြေခံအဆောက်အဦးများ",
    "tab.economic": "စီးပွားရေး",
    "tab.relief": "ကယ်ဆယ်ရေးစခန်းများ",
    "tab.medical": "ဆေးဘက်ဆိုင်ရာ",
    "tab.response": "တုံ့ပြန်မှု",
    "label.buildings": "ပျက်စီးသွားသော အဆောက်အဦးများ",
    "label.roads": "ပျက်စီးသွားသော လမ်းများ",
    "label.affected": "ထိခိုက်ခံရသူများ",
    "label.lost": "ပျောက်ဆုံးသူများ",
    "label.infrastructure": "အခြေခံအဆောက်အဦး ပျက်စီးမှု",
    "label.economic": "စီးပွားရေးဆုံးရှုံးမှု (USD)",
    "label.relief": "ကယ်ဆယ်ရေးစခန်းများ",
    "label.medical": "ဆေးဘက်ဆိုင်ရာ အဆောက်အဦးများ",
    "label.response": "တုံ့ပြန်ရေးအဖွဲ့များ",
    "label.total": "စုစုပေါင်း",
    "label.detailed": "အသေးစိတ် ဖော်ပြချက်",
    "label.date": "ရက်စွဲ",
    "label.location": "တည်နေရာ",
    "data.source": "ဒေတာရင်းမြစ်",
    "data.sample": "နမူနာဒေတာ",
    "data.database": "Supabase ဒေတာဘေ့စ်",
    "data.sample.alert.title": "နမူနာဒေတာကို အသုံးပြုနေသည်",
    "data.sample.alert.description": '"impact_data" ဒေတာဘေ့စ်ဇယား မရှိသေးပါ။ သရုပ်ပြရန် နမူနာဒေတာကို အသုံးပြုနေသည်။',
    "error.title": "အမှား",
    "error.nodata.title": "ဒေတာမရှိပါ",
    "error.nodata.description": "လက်ရှိတွင် သက်ရောက်မှုဒေတာ မရှိသေးပါ။ နောက်မှ ပြန်လည်စစ်ဆေးပါ။",
    loading: "သက်ရောက်မှုဒေတာကို ဖွင့်နေသည်...",
    "form.title": "သက်ရောက်မှုဒေတာ တင်သွင်းရန်",
    "form.description": "ငလျင်သက်ရောက်မှုဒေတာအသစ်ကို ဒေတာဘေ့စ်သို့ ထည့်သွင်းပါ",
    "form.tab.basic": "အခြေခံအချက်အလက်",
    "form.tab.damage": "ပျက်စီးမှု",
    "form.tab.response": "တုံ့ပြန်မှု",
    "form.submit": "ဒေတာတင်သွင်းရန်",
    "form.submitting": "တင်သွင်းနေသည်...",
    "form.success": "အောင်မြင်ပါသည်",
    "form.error": "အမှား",
    "form.success.message": "ဒေတာကို အောင်မြင်စွာ တင်သွင်းပြီးပါပြီ!",
    "form.error.message": "ဒေတာတင်သွင်းမှု မအောင်မြင်ပါ။ ဒေတာဘေ့စ်ဇယား မရှိသေးပါ။",
  },
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  // Initialize language from localStorage when component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "my")) {
      setLanguageState(savedLanguage)
    }

    // Set the lang attribute on the html element
    document.documentElement.lang = language

    // Add a class to the body for styling purposes
    if (language === "my") {
      document.body.classList.add("myanmar-lang")
    } else {
      document.body.classList.remove("myanmar-lang")
    }
  }, [language])

  // Update localStorage when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage)
    localStorage.setItem("language", newLanguage)

    // Set the lang attribute on the html element
    document.documentElement.lang = newLanguage

    // Add a class to the body for styling purposes
    if (newLanguage === "my") {
      document.body.classList.add("myanmar-lang")
    } else {
      document.body.classList.remove("myanmar-lang")
    }
  }

  // Translation function
  const t = (key: string): string => {
    if (!translations[language] || !translations[language][key]) {
      console.warn(`Translation missing for key: ${key} in language: ${language}`)
      return key
    }
    return translations[language][key]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

