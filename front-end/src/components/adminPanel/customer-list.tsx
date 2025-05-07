"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Plus, Search } from "lucide-react"

import { Button } from "@/components/adminPanel/ui/button"
import { Card } from "@/components/adminPanel/ui/card"
import { Checkbox } from "@/components/adminPanel/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/adminPanel/ui/dropdown-menu"
import { Input } from "@/components/adminPanel/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/adminPanel/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/adminPanel/ui/avatar"

const customers = [
  {
    id: "CUST-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    orders: 5,
    spent: 349.95,
    lastOrder: "2023-05-15",
    status: "Active",
  },
  {
    id: "CUST-1002",
    name: "Alice Smith",
    email: "alice.smith@example.com",
    orders: 3,
    spent: 129.85,
    lastOrder: "2023-05-10",
    status: "Active",
  },
  {
    id: "CUST-1003",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    orders: 8,
    spent: 599.92,
    lastOrder: "2023-05-18",
    status: "Active",
  },
  {
    id: "CUST-1004",
    name: "Emily Brown",
    email: "emily.brown@example.com",
    orders: 2,
    spent: 79.98,
    lastOrder: "2023-04-25",
    status: "Inactive",
  },
  {
    id: "CUST-1005",
    name: "Michael Wilson",
    email: "m.wilson@example.com",
    orders: 6,
    spent: 429.94,
    lastOrder: "2023-05-12",
    status: "Active",
  },
  {
    id: "CUST-1006",
    name: "Sarah Davis",
    email: "sarah.davis@example.com",
    orders: 1,
    spent: 59.99,
    lastOrder: "2023-03-20",
    status: "Inactive",
  },
  {
    id: "CUST-1007",
    name: "David Miller",
    email: "david.m@example.com",
    orders: 4,
    spent: 249.96,
    lastOrder: "2023-05-05",
    status: "Active",
  },
  {
    id: "CUST-1008",
    name: "Jennifer Taylor",
    email: "j.taylor@example.com",
    orders: 3,
    spent: 189.97,
    lastOrder: "2023-04-30",
    status: "Active",
  },
  {
    id: "CUST-1009",
    name: "James Anderson",
    email: "james.a@example.com",
    orders: 7,
    spent: 519.93,
    lastOrder: "2023-05-17",
    status: "Active",
  },
  {
    id: "CUST-1010",
    name: "Lisa Thomas",
    email: "lisa.t@example.com",
    orders: 2,
    spent: 99.98,
    lastOrder: "2023-04-10",
    status: "Inactive",
  },
]

export function CustomerList() {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  const toggleCustomer = (customerId: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId],
    )
  }

  const toggleAll = () => {
    setSelectedCustomers((prev) => (prev.length === customers.length ? [] : customers.map((customer) => customer.id)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Customer
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search customers..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
        </div>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedCustomers.length === customers.length && customers.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-right">Orders</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={() => toggleCustomer(customer.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{customer.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt={customer.name} />
                      <AvatarFallback>
                        {customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{customer.orders}</TableCell>
                <TableCell className="text-right">${customer.spent.toFixed(2)}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      customer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {customer.status}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>View orders</DropdownMenuItem>
                      <DropdownMenuItem>Edit details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete customer</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}
