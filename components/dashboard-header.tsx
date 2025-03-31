"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, Bell, Search, AlertTriangle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import { Input } from "@/components/ui/input"
import { UserProfile } from "@/components/user-profile"
import { useAuth, UserRole } from "@/contexts/auth-context"
import { LanguageSwitcher } from "./language-switcher"
import { useLanguage } from "@/contexts/language-context"

export function DashboardHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()
  const { t } = useLanguage()

  // Track scroll position to add background blur when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Define navigation items with proper routes
  const navItems = [
    { label: "Dashboard", href: "/", active: pathname === "/" },
    { label: "Reports", href: "/reports", active: pathname === "/reports" || pathname.startsWith("/reports/") },
    { label: "Teams", href: "/teams", active: pathname === "/teams" || pathname.startsWith("/teams/") },
    {
      label: "Impact Data",
      href: "/impact-data",
      active: pathname === "/impact-data" || pathname.startsWith("/impact-data/"),
    },
    {
      label: "Data Collection",
      href: "/data-collection",
      active: pathname === "/data-collection" || pathname.startsWith("/data-collection/"),
    },
    { label: "Resources", href: "/resources", active: pathname === "/resources" },
    { label: "Analytics", href: "/analytics", active: pathname === "/analytics" },
  ]

  // Admin-only nav items
  const adminNavItems = [
    {
      label: "Team Management",
      href: "/team-management",
      active: pathname === "/team-management",
      roles: [UserRole.TEAM_ADMIN, UserRole.SUPER_ADMIN],
    },
    {
      label: "User Management",
      href: "/user-management",
      active: pathname === "/user-management",
      roles: [UserRole.SUPER_ADMIN],
    },
  ]

  // Filter nav items based on user role
  const filteredAdminNavItems = adminNavItems.filter((item) => user && item.roles.includes(user.role))

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-white border-b"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2 rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] border-r border-primary/10">
              <div className="flex items-center gap-2 mb-8 mt-4">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-blue-600" />
                </div>
                <h2 className="text-xl font-bold">MEDC</h2>
              </div>
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={item.active ? "default" : "ghost"}
                      className={`w-full justify-start rounded-lg ${item.active ? "" : "hover:bg-primary/10 hover:text-primary"}`}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}

                {filteredAdminNavItems.length > 0 && (
                  <>
                    <div className="my-2 px-2 text-xs font-semibold text-muted-foreground">ADMIN</div>
                    {filteredAdminNavItems.map((item) => (
                      <Link key={item.label} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant={item.active ? "default" : "ghost"}
                          className={`w-full justify-start rounded-lg ${item.active ? "" : "hover:bg-primary/10 hover:text-primary"}`}
                        >
                          {item.label}
                        </Button>
                      </Link>
                    ))}
                  </>
                )}

                {user && user.role !== UserRole.GUEST && (
                  <Link href="/data-collection/new" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full mt-4 rounded-lg">Submit New Report</Button>
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold hidden xs:inline-block sm:inline-block">MEDC</h1>
          </Link>
        </div>

        <div className="hidden sm:flex items-center relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports, locations..."
            className="pl-9 pr-4 rounded-full border-primary/10 bg-primary/5 focus:bg-background"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={`rounded-lg ${item.active ? "bg-blue-600 hover:bg-blue-700" : "hover:bg-primary/10 hover:text-primary"}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}

          {filteredAdminNavItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant={item.active ? "default" : "ghost"}
                className={`rounded-lg ${item.active ? "" : "hover:bg-primary/10 hover:text-primary"}`}
              >
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="relative rounded-full border-primary/10 bg-primary/5">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[350px] border-primary/10">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-auto">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer focus:bg-primary/5">
                  <div className="font-medium">New Critical Report</div>
                  <div className="text-sm text-muted-foreground">Building collapse reported in Sagaing region</div>
                  <div className="text-xs text-muted-foreground mt-1">10 minutes ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer focus:bg-primary/5">
                  <div className="font-medium">Aid Distribution Update</div>
                  <div className="text-sm text-muted-foreground">5 new aid centers established in affected areas</div>
                  <div className="text-xs text-muted-foreground mt-1">1 hour ago</div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer focus:bg-primary/5">
                  <div className="font-medium">System Alert</div>
                  <div className="text-sm text-muted-foreground">Daily report summary is now available</div>
                  <div className="text-xs text-muted-foreground mt-1">3 hours ago</div>
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center font-medium focus:bg-primary/5">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <ModeToggle />

          {user && user.role !== UserRole.GUEST ? (
            <UserProfile />
          ) : (
            <Link href="/login">
              <Button className="rounded-full">Login</Button>
            </Link>
          )}

          {user && user.role !== UserRole.GUEST && (
            <Link href="/data-collection/new" className="hidden md:block">
              <Button className="rounded-full">Submit New Report</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

