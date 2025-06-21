'use client'

import { useEffect, useState } from "react"
import { ArrowUpDown, MoreHorizontal,  Search } from "lucide-react"

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

type Customer = {
  id: number
  firstName: string
  lastName: string
  email: string
  imageUrl: string
  spent: number
  numOrders: number
  lastSeen: string
  role: string
}




export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])



  const [searchTerm, setSearchTerm] = useState("")

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const paginatedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )


  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch('http://localhost:8080/users/all')
        const data = await res.json()
        setCustomers(data)
      } catch (err) {
        console.error('Failed to load customers:', err)
      }
    }

    fetchCustomers()
  }, [])


  const deleteCustomer = async (customerId: number) => {
  try {
    const res = await fetch(`http://localhost:8080/users/delete/${customerId}`, {
      method: 'DELETE',
    })

    if (!res.ok) {
      throw new Error('Failed to delete customer')
    }

    setCustomers((prev) => prev.filter((customer) => customer.id !== customerId))
  } catch (err) {
    console.error('Error deleting customer:', err)
  }
}


  const toggleCustomer = (customerId: number) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId) ? prev.filter((id) => id !== customerId) : [...prev, customerId]
    )
  }


  const toggleAll = () => {
    setSelectedCustomers((prev) =>
      prev.length === customers.length ? [] : customers.map((customer) => customer.id)
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
          type="search"
          placeholder="Search customers..."
          className="pl-8 w-full md:w-[300px] lg:w-[400px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
              <TableHead>Last Seen</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCustomers.map((customer) => (
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
            <AvatarImage src={customer.imageUrl || "/placeholder.svg?height=32&width=32"} alt={`${customer.firstName} ${customer.lastName}`} />
            <AvatarFallback>
              {[customer.firstName, customer.lastName].filter(Boolean).map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{customer.firstName} {customer.lastName}</div>
            <div className="text-sm text-muted-foreground">{customer.email}</div>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-right">{customer.numOrders}</TableCell>
      <TableCell className="text-right">${customer.spent.toFixed(2)}</TableCell>
      <TableCell>{new Date(customer.lastSeen).toLocaleString()}</TableCell>

      <TableCell>
        <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          customer.role === "admin"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800"
        }`}>
          {customer.role}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger >
          <DropdownMenuContent className="bg-white" align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>View profile</DropdownMenuItem>
            <DropdownMenuItem>View orders</DropdownMenuItem>
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 cursor-pointer"
              onClick={() => deleteCustomer(customer.id)}
            >
              Delete customer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
        </Table>
        <div className="flex justify-center mt-4 gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              Prev
            </Button>

            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Button>
              )
            })}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Next
            </Button>
          </div>

      </Card>
    </div>
  )
}
