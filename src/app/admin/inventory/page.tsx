"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from '@/store';
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  Product,
} from "@/store/admin/productSlice";

import {
  Search,
  Plus,
  Package,
  TrendingUp,
  AlertTriangle,
  Edit2,
  Trash2,
  BarChart3,
} from "lucide-react";

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_URL || "";



export default function ModernInventory() {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const products = useSelector((state: RootState) => state.products.list);
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);


const [productToDelete, setProductToDelete] = useState<number | null>(null);
const [deleteError, setDeleteError] = useState<string | null>(null);

  // Inside your component, after you get products from Redux:
const categories = useMemo(() => {
  const cats = products.map(p => p.category);
  return Array.from(new Set(cats)); // unique categories
}, [products]);

const suppliers = useMemo(() => {
  const sups = products.map(p => p.supplier);
  return Array.from(new Set(sups)); // unique suppliers
}, [products]);

  // Local UI states
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: categories[0],
    quantity: "",
    price: "",
    image: "",
    sku: "",
    supplier: suppliers[0],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


const [selectedImage, setSelectedImage] = useState<File | null>(null);

function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size > 2 * 1024 * 1024) { // 2MB limit
    alert("File size must be 2MB or less");
    e.target.value = ''; // reset input
    return;
  }

  setSelectedImage(file);
}

  // Inventory stats
  const inventoryStats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce(
      (sum, p) => sum + p.quantity * p.price,
      0
    );
    const lowStockItems = products.filter(
      (p) => p.quantity <= 10 && p.quantity > 0
    ).length;
    const outOfStockItems = products.filter((p) => p.quantity === 0).length;

    return { totalProducts, totalValue, lowStockItems, outOfStockItems };
  }, [products]);

  // Filter products for search and category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  // Stock status helper
  function getStockStatus(quantity: number) {
    if (quantity === 0)
      return {
        text: "Out of Stock",
        color: "bg-red-500",
        textColor: "text-red-700",
        bgLight: "bg-red-50",
      };
    if (quantity <= 10)
      return {
        text: "Low Stock",
        color: "bg-amber-500",
        textColor: "text-amber-700",
        bgLight: "bg-amber-50",
      };
    return {
      text: "In Stock",
      color: "bg-emerald-500",
      textColor: "text-emerald-700",
      bgLight: "bg-emerald-50",
    };
  }

  // Reset form
  function resetForm() {
    setNewProduct({
      name: "",
      category: "",
      quantity: "",
      price: "",
      image: "",
      sku: "",
      supplier: "",
    });
    setEditingProduct(null);
    setShowAddModal(false);
  }

  // Add new product
async function handleAddProduct() {
  if (!newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.sku || !newProduct.category || !newProduct.supplier) {
    alert("Please fill all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append('name', newProduct.name);
  formData.append('sku', newProduct.sku);
  formData.append('category', newProduct.category);
  formData.append('supplier', newProduct.supplier);
  formData.append('quantity', newProduct.quantity.toString());
  formData.append('price', newProduct.price.toString());
  if (selectedImage) formData.append('image', selectedImage);

  try {
    await dispatch(addProduct(formData)).unwrap();
    resetForm();
    dispatch(fetchProducts());  // <== Fetch updated product list here
  } catch (error) {
    alert("Failed to add product");
  }
}


async function handleEditProduct() {
  if (!editingProduct || !newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.sku || !newProduct.category || !newProduct.supplier) {
    alert("Please fill all required fields.");
    return;
  }

  const formData = new FormData();
  formData.append('name', newProduct.name);
  formData.append('sku', newProduct.sku);
  formData.append('category', newProduct.category);
  formData.append('supplier', newProduct.supplier);
  formData.append('quantity', newProduct.quantity.toString());
  formData.append('price', newProduct.price.toString());
  if (selectedImage) formData.append('image', selectedImage);

  try {
    await dispatch(updateProduct({ id: editingProduct.id, data: formData })).unwrap();
    resetForm();
  } catch (error) {
    alert("Failed to update product");
  }
}

  // Start editing product
  function startEdit(product: Product) {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      image: product.image || "",
      sku: product.sku,
      supplier: product.supplier,
    });
    setShowAddModal(true);
  }

  // Delete product
function handleDeleteProduct(id: number) {
  setProductToDelete(id); // Triggers modal
}



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Inventory Management
              </h1>
              <p className="text-gray-600 mt-1">Manage your products efficiently</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "table" : "grid")
                }
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2"
              >
                <BarChart3 size={18} />
                {viewMode === "grid" ? "Table View" : "Grid View"}
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Show loading or error */}
        {loading && (
          <p className="text-center text-gray-600 mt-6">Loading products...</p>
        )}
        {error && (
          <p className="text-center text-red-600 mt-6">Error: {error}</p>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inventoryStats.totalProducts}
                </p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">
                  {inventoryStats.totalValue.toLocaleString()} MAD
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">
                  {inventoryStats.lowStockItems}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {inventoryStats.outOfStockItems}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products, SKU, or category..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all min-w-[150px]"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 && !loading && (
              <div className="col-span-full text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}

            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.quantity);
              return (
                <div
                  key={product.id}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={`${IMAGE_BASE_URL}/${product.image}`}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div
                      className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-medium ${stockStatus.color}`}
                    >
                      {stockStatus.text}
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Edit2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">
                        {product.name}
                      </h3>
                      <span className="text-sm text-gray-500 font-mono">
                        {product.sku}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-1">
                      {product.category}
                    </p>
                    <p className="text-gray-500 text-xs mb-4">{product.supplier}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">
                          Qty:
                        </label>
                        <input
                          type="text"
                           defaultValue={product.quantity}
                             readOnly
                    
                          className="w-16 p-1 text-center border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">
                          {product.price} MAD
                        </p>
                        <p className="text-xs text-gray-500">
                          Updated: {product.last_updated ?? "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      SKU
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Supplier
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.quantity);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                      src={`${IMAGE_BASE_URL}/${product.image}`}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500">
                                Updated: {product.last_updated ?? "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm">{product.sku}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.supplier}</td>
                        <td className="px-6 py-4">
                       <input
                          type="text"
                           defaultValue={product.quantity}
                             readOnly
                    
                          className="w-16 p-1 text-center border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-600">
                          {product.price} MAD
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.textColor} ${stockStatus.bgLight}`}
                          >
                            {stockStatus.text}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => startEdit(product)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <Edit2 size={16} className="text-gray-600" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} className="text-red-500" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-auto">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  required
                />

                <input
                  type="text"
                  placeholder="SKU *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono"
                  value={newProduct.sku}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, sku: e.target.value })
                  }
                  required
                />
{/* Category input */}
<input
  type="text"
  placeholder="Category *"
  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
  value={newProduct.category}
  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
/>

{/* Supplier input */}
<input
  type="text"
  placeholder="Supplier *"
  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
  value={newProduct.supplier}
  onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
/>


                <input
                  type="number"
                  min={0}
                  placeholder="Quantity *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.quantity}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, quantity: e.target.value })
                  }
                  required
                />

                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Price (MAD) *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  required
                />

         <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>


                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors font-medium"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all font-medium shadow-lg"
                    onClick={editingProduct ? handleEditProduct : handleAddProduct}
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {productToDelete !== null && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-md w-80">
      <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
      <p className="mb-4">Are you sure you want to delete this product?</p>

      {deleteError && <p className="text-red-600 text-sm mb-3">{deleteError}</p>}

      <div className="flex justify-end gap-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
          onClick={() => {
            setProductToDelete(null);
            setDeleteError(null);
          }}
        >
          Cancel
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          onClick={async () => {
            try {
              await dispatch(deleteProduct(productToDelete!)).unwrap();
              setProductToDelete(null);
              setDeleteError(null);
            } catch {
              setDeleteError("Failed to delete product. Please try again.");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
}
