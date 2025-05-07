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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/adminPanel/ui/select"

const products = [
  {
    id: "PROD-1234",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 89.99,
    stock: 45,
    status: "In Stock",
  },
  {
    id: "PROD-2345",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    stock: 120,
    status: "In Stock",
  },
  {
    id: "PROD-3456",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    price: 19.95,
    stock: 78,
    status: "In Stock",
  },
  {
    id: "PROD-4567",
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 29.99,
    stock: 32,
    status: "In Stock",
  },
  {
    id: "PROD-5678",
    name: "Leather Wallet",
    category: "Accessories",
    price: 49.99,
    stock: 15,
    status: "Low Stock",
  },
  {
    id: "PROD-6789",
    name: "Smart Fitness Tracker",
    category: "Electronics",
    price: 79.99,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: "PROD-7890",
    name: "Ceramic Coffee Mug",
    category: "Home & Kitchen",
    price: 12.99,
    stock: 94,
    status: "In Stock",
  },
  {
    id: "PROD-8901",
    name: "Bluetooth Portable Speaker",
    category: "Electronics",
    price: 59.99,
    stock: 28,
    status: "In Stock",
  },
  {
    id: "PROD-9012",
    name: "Yoga Mat",
    category: "Sports & Outdoors",
    price: 34.95,
    stock: 42,
    status: "In Stock",
  },
  {
    id: "PROD-0123",
    name: "Scented Candle Set",
    category: "Home & Kitchen",
    price: 22.99,
    stock: 5,
    status: "Low Stock",
  },
]

export function ProductList() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleAll = () => {
    setSelectedProducts((prev) => (prev.length === products.length ? [] : products.map((product) => product.id)))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory and details</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search products..." className="pl-8 w-full md:w-[300px] lg:w-[400px]" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="home">Home & Kitchen</SelectItem>
            <SelectItem value="accessories">Accessories</SelectItem>
            <SelectItem value="sports">Sports & Outdoors</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-stock">In Stock</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selectedProducts.length === products.length && products.length > 0}
                  onCheckedChange={toggleAll}
                />
              </TableHead>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1">
                  <span>Product</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedProducts.includes(product.id)}
                    onCheckedChange={() => toggleProduct(product.id)}
                  />
                </TableCell>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      product.status === "In Stock"
                        ? "bg-green-100 text-green-800"
                        : product.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.status}
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
                      <DropdownMenuItem>Edit product</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete product</DropdownMenuItem>
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
