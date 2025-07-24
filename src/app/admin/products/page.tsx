"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Package, TrendingUp, AlertTriangle, Edit2, Trash2, BarChart3 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  image: string;
  sku: string;
  supplier: string;
  lastUpdated: string;
};

const CATEGORY_OPTIONS = [
  "Hair Care",
  "Skin Care",
  "Nails",
  "Tools",
  "Makeup",
  "Others",
];

const SUPPLIERS = [
  "Beauty Supply Co.",
  "Professional Care Ltd.",
  "Salon Essentials",
  "Premium Beauty",
  "Local Distributor"
];

export default function ModernInventory() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Argan Oil Shampoo",
      category: "Hair Care",
      quantity: 45,
      price: 120,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
      sku: "HC001",
      supplier: "Beauty Supply Co.",
      lastUpdated: "2025-01-15"
    },
    {
      id: 2,
      name: "Hydrating Facial Moisturizer",
      category: "Skin Care",
      quantity: 15,
      price: 180,
      image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop",
      sku: "SC002",
      supplier: "Professional Care Ltd.",
      lastUpdated: "2025-01-10"
    },
    {
      id: 3,
      name: "Professional Nail Polish Set",
      category: "Nails",
      quantity: 5,
      price: 90,
      image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=300&h=300&fit=crop",
      sku: "NL003",
      supplier: "Salon Essentials",
      lastUpdated: "2025-01-08"
    },
    {
      id: 4,
      name: "Professional Hair Dryer",
      category: "Tools",
      quantity: 0,
      price: 800,
      image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=300&h=300&fit=crop",
      sku: "TL004",
      supplier: "Premium Beauty",
      lastUpdated: "2025-01-05"
    },
    {
      id: 5,
      name: "Matte Lipstick Collection",
      category: "Makeup",
      quantity: 28,
      price: 65,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&h=300&fit=crop",
      sku: "MU005",
      supplier: "Beauty Supply Co.",
      lastUpdated: "2025-01-12"
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: CATEGORY_OPTIONS[0],
    quantity: "",
    price: "",
    image: "",
    sku: "",
    supplier: SUPPLIERS[0]
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Calculate inventory stats
  const inventoryStats = useMemo(() => {
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
    const lowStockItems = products.filter(p => p.quantity <= 10 && p.quantity > 0).length;
    const outOfStockItems = products.filter(p => p.quantity === 0).length;
    
    return { totalProducts, totalValue, lowStockItems, outOfStockItems };
  }, [products]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  function getStockStatus(quantity: number) {
    if (quantity === 0) return { text: "Out of Stock", color: "bg-red-500", textColor: "text-red-700", bgLight: "bg-red-50" };
    if (quantity <= 10) return { text: "Low Stock", color: "bg-amber-500", textColor: "text-amber-700", bgLight: "bg-amber-50" };
    return { text: "In Stock", color: "bg-emerald-500", textColor: "text-emerald-700", bgLight: "bg-emerald-50" };
  }

  function handleAddProduct() {
    if (!newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.sku) {
      alert("Please fill all required fields.");
      return;
    }
    
    const product: Product = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      name: newProduct.name,
      category: newProduct.category,
      quantity: Number(newProduct.quantity),
      price: Number(newProduct.price),
      image: newProduct.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop",
      sku: newProduct.sku,
      supplier: newProduct.supplier,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setProducts(prev => [...prev, product]);
    resetForm();
  }

  function handleEditProduct() {
    if (!editingProduct || !newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.sku) {
      alert("Please fill all required fields.");
      return;
    }
    
    setProducts(prev => prev.map(p => 
      p.id === editingProduct.id 
        ? {
            ...p,
            name: newProduct.name,
            category: newProduct.category,
            quantity: Number(newProduct.quantity),
            price: Number(newProduct.price),
            image: newProduct.image || p.image,
            sku: newProduct.sku,
            supplier: newProduct.supplier,
            lastUpdated: new Date().toISOString().split('T')[0]
          }
        : p
    ));
    resetForm();
  }

  function startEdit(product: Product) {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      category: product.category,
      quantity: product.quantity.toString(),
      price: product.price.toString(),
      image: product.image,
      sku: product.sku,
      supplier: product.supplier
    });
    setShowAddModal(true);
  }

  function resetForm() {
    setNewProduct({
      name: "",
      category: CATEGORY_OPTIONS[0],
      quantity: "",
      price: "",
      image: "",
      sku: "",
      supplier: SUPPLIERS[0]
    });
    setEditingProduct(null);
    setShowAddModal(false);
  }

  function deleteProduct(id: number) {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  }

  function updateQuantity(id: number, newQty: number) {
    if (newQty < 0) return;
    setProducts(prev =>
      prev.map(p => p.id === id ? { 
        ...p, 
        quantity: newQty,
        lastUpdated: new Date().toISOString().split('T')[0]
      } : p)
    );
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
                onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalProducts}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{inventoryStats.totalValue.toLocaleString()} MAD</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">{inventoryStats.lowStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-amber-500" />
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{inventoryStats.outOfStockItems}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
              {CATEGORY_OPTIONS.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}

            {filteredProducts.map((product) => {
              const stockStatus = getStockStatus(product.quantity);
              return (
                <div key={product.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-sm font-medium ${stockStatus.color}`}>
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
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 text-lg">{product.name}</h3>
                      <span className="text-sm text-gray-500 font-mono">{product.sku}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-1">{product.category}</p>
                    <p className="text-gray-500 text-xs mb-4">{product.supplier}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Qty:</label>
                        <input
                          type="number"
                          min={0}
                          value={product.quantity}
                          onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                          className="w-16 p-1 text-center border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                        />
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">{product.price} MAD</p>
                        <p className="text-xs text-gray-500">Updated: {product.lastUpdated}</p>
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
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">SKU</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Supplier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Quantity</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product.quantity);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-xs text-gray-500">Updated: {product.lastUpdated}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-sm">{product.sku}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.supplier}</td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            min={0}
                            value={product.quantity}
                            onChange={(e) => updateQuantity(product.id, Number(e.target.value))}
                            className="w-20 p-1 text-center border border-gray-200 rounded text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-blue-600">{product.price} MAD</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${stockStatus.textColor} ${stockStatus.bgLight}`}>
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
                              onClick={() => deleteProduct(product.id)}
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
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  required
                />

                <input
                  type="text"
                  placeholder="SKU *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all font-mono"
                  value={newProduct.sku}
                  onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
                  required
                />

                <select
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                >
                  {CATEGORY_OPTIONS.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                <select
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.supplier}
                  onChange={(e) => setNewProduct({ ...newProduct, supplier: e.target.value })}
                >
                  {SUPPLIERS.map(supplier => (
                    <option key={supplier} value={supplier}>{supplier}</option>
                  ))}
                </select>

                <input
                  type="number"
                  min={0}
                  placeholder="Quantity *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.quantity}
                  onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
                  required
                />

                <input
                  type="number"
                  min={0}
                  step="0.01"
                  placeholder="Price (MAD) *"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  required
                />

                <input
                  type="url"
                  placeholder="Image URL"
                  className="w-full p-3 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
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
      </div>
    </div>
  );
}