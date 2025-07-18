'use client'

import { useState, useMemo, useEffect } from "react"
import { MoreHorizontal, Search } from "lucide-react"
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

interface Order {
  id: number
  createdAt: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  totalAmount: number
  user: {
    id: number
    email: string
    name: string
    surname: string
  }
  items: {
    id: number
    quantity: number
    price: number
    product: {
      id: number
      name: string
      imageUrl: string
    }
  }[]
}

export function OrderList() {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders, setOrders] = useState<Order[]>([])
  const [totalOrders, setTotalOrders] = useState(0)
  const pageSize = 10
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`https://demo-deploy-gs0s.onrender.com/orders/all?page=${currentPage - 1}&size=${pageSize}`)
        const data = await response.json()
        setOrders(data.content)
        setTotalOrders(data.totalElements)
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    fetchOrders()
  }, [currentPage])

  // Фильтрация по поиску и статусу внутри текущей страницы
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {

      const search = searchTerm.toLowerCase()

      const matchesSearch =
        (order.user?.name?.toLowerCase().includes(search)) ||
        (order.user?.surname?.toLowerCase().includes(search)) ||
        (order.user?.email?.toLowerCase().includes(search)) ||
        order.id.toString().includes(search)

      const matchesStatus =
        statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [orders, searchTerm, statusFilter])

  const totalPages = Math.ceil(totalOrders/ pageSize)


  // Чекбоксы выбора заказов на странице
  const toggleOrder = (orderId: string) => {
    setSelectedOrders(prev =>
      prev.includes(orderId) ? prev.filter(id => id !== orderId) : [...prev, orderId]
    )
  }


  console.log("filteredOrders.length:", filteredOrders.length, "totalPages:", totalPages);

  const toggleAll = () => {
    const idsOnPage = filteredOrders.map(order => order.id.toString())
    const allSelected = idsOnPage.every(id => selectedOrders.includes(id))
    setSelectedOrders(prev =>
      allSelected ? prev.filter(id => !idsOnPage.includes(id)) : [...prev, ...idsOnPage.filter(id => !prev.includes(id))]
    )
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
          <Input
            type="search"
            placeholder="Search orders..."
            className="pl-8 w-full md:w-[300px] lg:w-[400px]"
            value={searchTerm}
            onChange={e => {
              setCurrentPage(1)
              setSearchTerm(e.target.value)
            }}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={value => {
            setCurrentPage(1)
            setStatusFilter(value)
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
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
                  checked={filteredOrders.length > 0 && filteredOrders.every(order => selectedOrders.includes(order.id.toString()))}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map(order => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id.toString())}
                    onCheckedChange={() => toggleOrder(order.id.toString())}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.user.name} {order.user.surname}</TableCell>
                <TableCell>{order.user.email}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">{order.items.length}</TableCell>
                <TableCell className="text-right">${order.totalAmount.toFixed(2)}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      order.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : order.status === "PENDING"
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
                    <DropdownMenuContent className="bg-white" align="end">
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
    </div>
  )
}
