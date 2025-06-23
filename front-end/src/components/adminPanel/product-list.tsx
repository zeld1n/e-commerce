"use client"

import { useEffect, useState } from "react"
import { ArrowUpDown, MoreHorizontal, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react"
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/adminPanel/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/adminPanel/ui/select"

import { useRouter } from "next/navigation";




interface Product {
  id: string
  name: string
  category: Category
  price: number
  quantity: number
  status: string
}

interface Category {
  id: string
  name: string
  description: string
}

interface ApiResponse {
  products: Product[]
  totalPages: number
}

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [productsPerPage] = useState(10)
  const [sortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `https://demo-deploy-gs0s.onrender.com/products/all?page=${currentPage}&size=${productsPerPage}` +
            `&search=${encodeURIComponent(searchInput)}` +
            `&sortBy=${sortBy}&sortDir=${sortDirection}` +
            `&category=${selectedCategory === "all" ? "" : encodeURIComponent(selectedCategory)}`
        )
        const data: ApiResponse = await res.json()
        setProducts(data.products)
        setTotalPages(data.totalPages)
      } catch (err) {
        console.error("Failed to load products:", err)
      } finally {
      }
    }

    fetchProducts()
  }, [currentPage, productsPerPage, searchInput, sortBy, sortDirection, selectedCategory])




  const handleInactiveProduct = async (id: string) => {
  try {
    const response = await fetch(`https://demo-deploy-gs0s.onrender.com/products/updateInactive/${id}`, {
      method: "PUT",
    })

    if (!response.ok) {
      throw new Error("Failed innactive product")
    }

    setProducts((prev) => prev.filter((product) => product.id !== id))
  } catch (error) {
    console.error("Error innactive product:", error)
    alert("Failed to innactive product.")
  }
}


const handleActiveProduct = async (id: string) => {
  try {
    const response = await fetch(`https://demo-deploy-gs0s.onrender.com/products/updateActive/${id}`, {
      method: "PUT",
    })

    if (!response.ok) {
      throw new Error("Failed Active product")
    }

    setProducts((prev) => prev.filter((product) => product.id !== id))
  } catch (error) {
    console.error("Error Active product:", error)
    alert("Failed to Active product.")
  }
}



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://demo-deploy-gs0s.onrender.com/api/categories")
        const data = await res.json()
        setCategories(data)
      } catch (err) {
        console.error("Failed to load categories:", err)
      }
    }

    fetchCategories()
  }, [])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const toggleAll = () => {
    setSelectedProducts((prev) =>
      prev.length === products.length ? [] : products.map((product) => product.id)
    )
  }
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product inventory and details</p>
        </div>
         <Button onClick={() => router.push("add-product")}>
      <Plus className="mr-2 h-4 w-4" /> Add Product
    </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 w-full md:w-[300px] lg:w-[400px]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all" >All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
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
                <div
                  className="flex items-center space-x-1 cursor-pointer"
                  onClick={() =>
                    setSortDirection(sortDirection === "asc" ? "desc" : "asc")
                  }
                >
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
                <TableCell>{product.category.name}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      product.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : product.status === "INACTIVE"
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
                    <DropdownMenuContent className="bg-white" align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>Edit product</DropdownMenuItem>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem className="text-green-600"
                          onClick={() => handleActiveProduct(product.id)}
                        >
                          Active product</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleInactiveProduct(product.id)}
                        >
                          Inactive product
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <div className="flex justify-between items-center px-4 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage >= totalPages - 1}
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
