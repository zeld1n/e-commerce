"use client"

import { useState } from "react"
import { BarChart3, Box, LayoutDashboard, Menu, Package, Settings, ShoppingCart, Users } from "lucide-react"

import { Button } from "@/components/adminPanel/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/adminPanel/ui/sheet"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-semibold">
            <Package className="h-5 w-5" />
            E-Commerce Admin
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-2 py-6">
          <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
            <Box className="mr-2 h-4 w-4" />
            Products
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Orders
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
            <Users className="mr-2 h-4 w-4" />
            Customers
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button variant="ghost" className="justify-start" onClick={() => setOpen(false)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
