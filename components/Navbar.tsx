"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Menu,
  Sun,
  Moon,
  ChevronDown,
  UserCircle,
  CheckCircle2,
  ExternalLink,
  Newspaper,
  Calendar,
  BookOpen,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { AcademicProgramsMenu } from "./AcademicProgramsMenu"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SearchBar } from "./SearchBar"
import { useDebouncedCallback } from "@/hooks/use-debounce"

// Main navigation items excluding News and Events
const mainNavItems = [
  { name: "Home", path: "/" },
  {
    name: "About",
    path: "/about",
    submenu: [
      { name: "History", path: "/about/history" },
      { name: "Mission & Vision", path: "/about/mission-vision" },
      { name: "Leadership", path: "/about/leadership" },
      { name: "Staff Directory", path: "/about/staff" },
      { name: "Alumni", path: "/about/alumni" },
      { name: "Partners", path: "/about/partners" },
    ],
  },
  {
    name: "Student Life",
    path: "/student-life",
    submenu: [
      { name: "Clubs", path: "/student-life/clubs" },
      { name: "Sports", path: "/student-life/sports" },
      { name: "Events", path: "/student-life/events" },
      { name: "Counseling", path: "/student-life/counseling" },
      { name: "Health Services", path: "/student-life/health-services" },
      { name: "Housing", path: "/student-life/housing" },
    ],
  },
  {
    name: "Admissions",
    path: "/admissions",
    submenu: [
      { name: "Requirements", path: "/admissions#requirements" },
      { name: "Application Process", path: "/admissions#application-process" },
      { name: "Financial Aid", path: "/admissions#financial-aid" },
      { name: "Check CSSPS", path: "#", isSpecial: true },
    ],
  },
  { name: "Contact", path: "/contact" },
]

// News and Events as separate items
const newsEventsItems = [
  { name: "News", path: "/news", icon: <Newspaper className="h-4 w-4 mr-1" /> },
  { name: "Events", path: "/events", icon: <Calendar className="h-4 w-4 mr-1" /> },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false)
  const [isCSSPSOpen, setIsCSSPSOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [clickedItems, setClickedItems] = useState<Set<string>>(new Set())

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, [])

  const debouncedHandleScroll = useDebouncedCallback(() => {
    setIsScrolled(window.scrollY > 10)
  }, 10)

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll)
    return () => window.removeEventListener("scroll", debouncedHandleScroll)
  }, [debouncedHandleScroll])

  const handleItemClick = useCallback((itemName: string) => {
    setClickedItems((prev) => {
      const newSet = new Set(prev)
      newSet.add(itemName)
      return newSet
    })
  }, [])

  const CSSPSDialog = () => (
    <Dialog open={isCSSPSOpen} onOpenChange={setIsCSSPSOpen}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <CheckCircle2 className="mr-2 h-6 w-6 text-green-500" />
            Check Your CSSPS Placement
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto pr-2 flex-grow">
          <div className="space-y-6 py-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">What is CSSPS?</h3>
              <p className="text-blue-700 text-sm">
                The Computerized School Selection and Placement System (CSSPS) is an automated merit-based system that
                places qualified BECE graduates into Senior High Schools and Technical Institutes across Ghana.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/276325051_2101406356702181_5387610399561603644_n.jpg-L2ZUJFc4rdz5rRdl5745Gbub2TlKth.jpeg"
                  alt="CSSPS Instructions"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-md"
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Check via USSD</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      Dial <span className="font-mono bg-gray-200 px-2 py-1 rounded">*920*44#</span>
                    </li>
                    <li>Select option (2)</li>
                    <li>Enter your index number</li>
                    <li>Confirm your details</li>
                  </ol>
                </div>

                <h3 className="font-semibold text-lg pt-2">Check Online</h3>
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      Visit the{" "}
                      <a
                        href="https://cssps.gov.gh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        CSSPS Portal
                      </a>
                    </li>
                    <li>Click on "Check Placement"</li>
                    <li>Enter your index number and other required details</li>
                    <li>Click "Submit" to view your placement</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Placement FAQs</h3>

              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium">What if I wasn't placed in my preferred school?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    You can apply for a placement review through the CSSPS portal or visit your regional education
                    office.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium">When does school registration begin?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Registration typically begins within 2 weeks after placement results are released. Check the
                    specific dates announced by the Ministry of Education.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium">What documents do I need for registration?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    You'll need your placement form, BECE certificate, birth certificate, and passport-sized
                    photographs. Additional requirements may vary by school.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h4 className="font-medium">How do I know if I qualify for free SHS?</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    All students placed through the CSSPS qualify for the Free SHS program. Specific benefits and
                    requirements will be provided during registration.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t mt-4">
          <Button variant="outline" onClick={() => setIsCSSPSOpen(false)}>
            Close
          </Button>
          <Button onClick={() => window.open("https://cssps.gov.gh", "_blank")} className="flex items-center">
            Visit CSSPS Portal
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm">
        <span className="font-medium">2025 Admissions Now Open!</span>{" "}
        <Button
          variant="link"
          className="text-yellow-300 font-bold underline hover:text-yellow-200 transition-colors duration-300"
          asChild
        >
          <a href="https://cssps.gov.gh" target="_blank" rel="noopener noreferrer">
            Apply Now
          </a>
        </Button>
      </div>

      <nav
        className={cn(
          "fixed w-full z-[100] transition-all duration-300",
          isScrolled ? "bg-[#011424]/95 backdrop-blur-md shadow-md" : "bg-[#011424]",
          "text-white",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-end h-16">
            {/* Logo - Now part of the right-aligned elements */}
            <div className="flex-shrink-0 mr-4">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ejisuman%20logo-fotor-bg-remover-2024111252452-PdjjFdQdmWdtGULMkf70SUH6pdiATB.png"
                  alt="Ejisuman SHS Logo"
                  width={40}
                  height={40}
                  className="w-12 h-12"
                  priority
                />
                <div className="hidden md:block">
                  <h1 className="text-lg font-bold">Ejisuman SHS</h1>
                  <p className="text-xs text-gray-300">Knowledge and Valour</p>
                </div>
              </Link>
            </div>

            {/* Main Navigation - Right aligned */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1">
                {mainNavItems.map(
                  (item) =>
                    !clickedItems.has(item.name) && (
                      <div key={item.name} className="relative group">
                        {item.submenu ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-black/20 transition-colors duration-300"
                              onClick={() => handleItemClick(item.name)}
                            >
                              {item.name}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {item.submenu.map((subItem) => (
                                <DropdownMenuItem key={subItem.name}>
                                  {subItem.isSpecial ? (
                                    <button
                                      className="w-full text-left flex items-center"
                                      onClick={() => setIsCSSPSOpen(true)}
                                    >
                                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                      {subItem.name}
                                    </button>
                                  ) : (
                                    <Link href={subItem.path} className="w-full">
                                      {subItem.name}
                                    </Link>
                                  )}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Link
                            href={item.path}
                            className={cn(
                              "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                              pathname === item.path ? "bg-black text-white" : "text-white hover:bg-black/20",
                            )}
                            onClick={() => handleItemClick(item.name)}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ),
                )}
                <AcademicProgramsMenu className="relative" />
              </div>
            </div>

            {/* News and Events Section */}
            <div className="hidden lg:flex items-center ml-4 mr-4">
              <div className="flex items-center space-x-3">
                {newsEventsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                      pathname === item.path ? "bg-black text-white" : "text-white hover:bg-black/20",
                    )}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {/* Account Link */}
              <Link
                href="/account"
                className={cn(
                  "hidden lg:flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300",
                  pathname === "/account" ? "bg-black text-white" : "text-white hover:bg-black/20",
                )}
              >
                <UserCircle className="mr-2 h-5 w-5" />
                Account
              </Link>

              {/* Search Bar */}
              <div className="bg-black rounded-md overflow-hidden">
                <SearchBar />
              </div>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:bg-black/20 transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>

              {/* Mobile Menu Button */}
              <Sheet open={isOffcanvasOpen} onOpenChange={setIsOffcanvasOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden text-white hover:bg-black/20 transition-colors duration-300"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <nav className="mt-6 h-[calc(100vh-5rem)] overflow-y-auto">
                    <Link
                      href="/account"
                      className={cn(
                        "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300",
                        pathname === "/account" ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50",
                      )}
                    >
                      <UserCircle className="mr-2 h-5 w-5" />
                      Account
                    </Link>

                    {/* News and Events in mobile menu - with visual separation */}
                    <div className="my-4 border-t border-b border-gray-200 py-2">
                      <p className="px-4 text-xs uppercase text-gray-500 font-semibold mb-2">News & Media</p>
                      {newsEventsItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={cn(
                            "flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300",
                            pathname === item.path ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50",
                          )}
                        >
                          {item.icon}
                          {item.name}
                        </Link>
                      ))}
                    </div>

                    {mainNavItems.map((item) => (
                      <div key={item.name} className="mb-4">
                        {item.submenu ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-black transition-colors duration-300">
                              {item.name}
                              <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {item.submenu.map((subItem) => (
                                <DropdownMenuItem key={subItem.name}>
                                  {subItem.isSpecial ? (
                                    <button
                                      className="w-full text-left flex items-center"
                                      onClick={() => {
                                        setIsCSSPSOpen(true)
                                        setIsOffcanvasOpen(false)
                                      }}
                                    >
                                      <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                      {subItem.name}
                                    </button>
                                  ) : (
                                    <Link href={subItem.path} className="w-full">
                                      {subItem.name}
                                    </Link>
                                  )}
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Link
                            href={item.path}
                            className={cn(
                              "block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300",
                              pathname === item.path ? "bg-black text-white" : "text-gray-700 hover:bg-gray-50",
                            )}
                          >
                            {item.name}
                          </Link>
                        )}
                      </div>
                    ))}
                    <div className="mb-4">
                      <Link
                        href="/academics"
                        className="block px-4 py-2 text-sm font-medium rounded-md transition-colors duration-300 text-gray-700 hover:bg-gray-50"
                      >
                        <BookOpen className="inline-block mr-2 h-4 w-4" />
                        Academic Programs
                      </Link>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* CSSPS Dialog */}
      <CSSPSDialog />
    </>
  )
}

