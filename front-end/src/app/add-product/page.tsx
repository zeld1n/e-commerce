'use client'
import React, { useState } from "react";
import { useEffect } from "react"
export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    description: "",
    category: "",
    status: "ACTIVE",
    discountPercentage: "",
  });

  interface Category {
  id: number
  name: string
}

  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch("https://demo-deploy-gs0s.onrender.com/api/categories/AllInfoCat")
          const data = await res.json()
          setCategories(data)
        } catch (err) {
          console.error("Failed to load categories:", err)
        }
      }

      fetchCategories()
    }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
};


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const now = new Date().toISOString();

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      discountPercentage: parseFloat(formData.discountPercentage),
      category: { id: Number(formData.category) },
      createdAt: now,
      updatedAt: now,
    };

    try {
      const response = await fetch("https://demo-deploy-gs0s.onrender.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Errore durante l'invio del prodotto");
      }

      setFormData({
        name: "",
        price: "",
        quantity: "",
        image: "",
        description: "",
        category: "",
        status: "ACTIVE",
        discountPercentage: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (€)</label>
            <input
              type="number"
              name="price"
              step="0.01"
              required
              value={formData.price}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              value={formData.quantity}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
             <select
                    name="category"
                    value={formData.category} // qui formData.category dovrebbe essere l'id della categoria
                    onChange={handleChange}
                    className="mt-1 w-full rounded-xl border px-4 py-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>


          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 w-full rounded-xl border px-4 py-2"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            name="discountPercentage"
            step="0.01"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="mt-1 w-full rounded-xl border px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-xl transition duration-200"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
