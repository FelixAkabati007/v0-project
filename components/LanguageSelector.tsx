"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"

const languages = [
  { code: "en", name: "English" },
  { code: "tw", name: "Twi" },
]

export default function LanguageSelector() {
  const [currentLang, setCurrentLang] = useState("en")

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    // Here you would typically update your i18n configuration
    console.log(`Language changed to ${langCode}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// This component is no longer needed, but we'll keep it in the codebase for now
// in case we need to reintroduce language selection in the future.
// We could delete it, but since it's not being imported anywhere after our changes,
// it won't affect the application.

