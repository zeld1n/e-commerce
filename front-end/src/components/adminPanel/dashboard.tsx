"use client"
import Link from 'next/link';

import { useState,useEffect } from "react"
import { BarChart3, Box, LayoutDashboard, Package, Settings, ShoppingCart, Users } from "lucide-react"
import { Button } from "@/components/adminPanel/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/adminPanel/ui/card"
import { Overview } from "@/components/adminPanel/overview"
import { RecentSales } from "@/components/adminPanel/recent-sales"
import { ProductList } from "@/components/adminPanel/product-list"
import { OrderList } from "@/components/adminPanel/order-list"
import { CustomerList } from "@/components/adminPanel/customer-list"
import { MobileNav } from "@/components/adminPanel/mobile-nav"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch("http://localhost:8080/orders/total_amount");
        if (!response.ok) {
          throw new Error("Failed to fetch total amount");
        }
        const data = await response.json();
        setTotalAmount(data); 
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchTotalAmount();
  }, []);





  




  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="hidden md:inline-block">E-Commerce Admin</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <MobileNav />
            <Button variant="outline" size="sm" className="ml-auto hidden md:flex">
            <Link href="/homepage">
              View Store
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid flex-1 md:grid-cols-[220px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-2 text-sm font-medium">
                <Button
                  variant={activeTab === "overview" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("overview")}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button
                  variant={activeTab === "products" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("products")}
                >
                  <Box className="mr-2 h-4 w-4" />
                  Products
                </Button>
                <Button
                  variant={activeTab === "orders" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("orders")}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Orders
                </Button>
                <Button
                  variant={activeTab === "customers" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("customers")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Customers
                </Button>
                <Button
                  variant={activeTab === "analytics" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
                <Button
                  variant={activeTab === "settings" ? "secondary" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
            {activeTab === "overview" && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${totalAmount}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Customers</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+2,350</div>
                      <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Sales</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">+12,234</div>
                      <p className="text-xs text-muted-foreground">+19% from last month</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Products</CardTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">573</div>
                      <p className="text-xs text-muted-foreground">+201 since last week</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                  <Card className="col-span-4">
                    <CardHeader>
                      <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <Overview />
                    </CardContent>
                  </Card>
                  <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>You made 265 sales this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales />
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
            {activeTab === "products" && <ProductList />}
            {activeTab === "orders" && <OrderList />}
            {activeTab === "customers" && <CustomerList />}
            {activeTab === "analytics" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Analytics</CardTitle>
                    <CardDescription>View your sales performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Settings</CardTitle>
                    <CardDescription>Manage your store settings and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Settings panel is under development.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )

}

