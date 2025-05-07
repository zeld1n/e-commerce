"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/adminPanel/ui/select"

const orders = [
  {
    id: "ORD-7352",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: "2023-05-15",
    total: 129.99,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-7353",
    customer: "Alice Smith",
    email: "alice.smith@example.com",
    date: "2023-05-16",
    total: 79.95,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-7354",
    customer: "Robert Johnson",
    email: "robert.j@example.com",
    date: "2023-05-16",
    total: 249.5,
    status: "Shipped",
    items: 4,
  },
  {
    id: "ORD-7355",
    customer: "Emily Brown",
    email: "emily.brown@example.com",
    date: "2023-05-17",
    total: 34.99,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-7356",
    customer: "Michael Wilson",
    email: "m.wilson@example.com",
    date: "2023-05-17",
    total: 189.95,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-7357",
    customer: "Sarah Davis",
    email: "sarah.davis@example.com",
    date: "2023-05-18",
    total: 59.99,
    status: "Cancelled",
    items: 1,
  },
  {
    id: "ORD-7358",
    customer: "David Miller",
    email: "david.m@example.com",
    date: "2023-05-18",
    total: 149.99,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-7359",
    customer: "Jennifer Taylor",
    email: "j.taylor@example.com",
    date: "2023-05-19",
    total: 99.95,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-7360",
    customer: "James Anderson",
    email: "james.a@example.com",
    date: "2023-05-19",
    total: 299.99,
    status: "Delivered",
    items: 5,
  },
  {
    id: "ORD-7361",
    customer: "Lisa Thomas",
    email: "lisa.t@example.com",
    date: "2023-05-20",
    total: 74.5,
    status: "Shipped",
    items: 2,
  },
]

export function OrderList() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  const toggleOrder = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const toggleAll = () => {
    setSelectedOrders((prev) => (prev.length === orders.length ? [] : orders.map((order) => order.id)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <p className="text-muted-foreground">Manage and process customer orders</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search orders..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Customer</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox checked={selectedOrders.includes(order.id)} onCheckedChange={() => toggleOrder(order.id)} />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{order.customer}</div>
                    <div className="text-sm text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="text-right">{order.items}</TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-800"
                          : order.status === "Processing"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
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
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Cancel order</DropdownMenuItem>
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
