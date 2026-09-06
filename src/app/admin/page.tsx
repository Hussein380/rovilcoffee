'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Coffee, Plus, Pencil, Trash2, LogOut, X, Upload,
  Eye, Check, AlertCircle, Loader2,
  Package, Star, Sparkles, Leaf
} from 'lucide-react';
import ProductCard3D from '@/components/products/ProductCard3D';
import { ProductItem } from '@/types/product';
import { initialProductsCatalog } from '@/data/productsCatalog';

// Category options
const CATEGORY_OPTIONS = [
  { id: 'coffee', label: 'Kenyan Arabica Coffee' },
  { id: 'tea',    label: 'Kenyan Specialty Tea' },
  { id: 'other',  label: 'Other / Custom Product' },
];

const emptyForm = {
  name: '',
  category: 'coffee',
  categoryLabel: 'Kenyan Arabica Coffee',
  tagline: '',
  description: '',
  image: '',
  priceRetailUSD: '',
  priceRetailKES: '',
  unitWeight: '',
  wholesalePriceUSD: '',
  wholesaleMOQ: '',
  isPopular: false,
  isNew: false,
  origin: '',
  flavorNotes: [] as string[],
  specs: [{ label: '', value: '' }] as { label: string; value: string }[],
};

type FormState = typeof emptyForm;

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('rovil_admin_token') : null;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

export default function AdminPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize with initialProductsCatalog for instant zero-wait rendering
  const [products, setProducts] = useState<(ProductItem & { _mongoId?: string })[]>(
    initialProductsCatalog.map((p) => ({ ...p, _mongoId: p.id }))
  );
  const [activeTab, setActiveTab] = useState<'all' | 'coffee' | 'tea'>('all');
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [newFlavorNote, setNewFlavorNote] = useState('');

  const showToast = (type: 'success' | 'error', msg: string) => setToast({ type, msg });

  // Silent live sync with API
  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(
            data.map((p: any) => ({
              ...p,
              id: p.id || p._id || '',
              _mongoId: p._id || p.id || '',
            }))
          );
        }
      }
    } catch {
      // keep existing products quietly
    }
  }, []);

  // Verify authentication on mount
  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          headers: getAuthHeaders(),
        });
        if (!res.ok) {
          router.push('/admin/login');
          return;
        }
      } catch {
        // network issue, proceed
      }
      fetchProducts();
    }
    checkAuth();
  }, [fetchProducts, router]);

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(t);
    }
  }, [toast]);

  // Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rovil_admin_token');
    }
    window.location.href = '/admin/login';
  };

  // Open form for new Coffee
  const openNewCoffeeForm = () => {
    setForm({
      ...emptyForm,
      category: 'coffee',
      categoryLabel: 'Kenyan Arabica Coffee',
      unitWeight: '250g Valve Pouch',
      origin: 'Mount Kenya Highlands',
    });
    setImagePreview('');
    setEditingId(null);
    setFormOpen(true);
  };

  // Open form for new Tea
  const openNewTeaForm = () => {
    setForm({
      ...emptyForm,
      category: 'tea',
      categoryLabel: 'Kenyan Specialty Tea',
      unitWeight: '100g Luxury Canister',
      origin: 'Highland Tea Plantations (>2,000m ASL)',
    });
    setImagePreview('');
    setEditingId(null);
    setFormOpen(true);
  };

  // Generic open form
  const openNewForm = () => {
    setForm(emptyForm);
    setImagePreview('');
    setEditingId(null);
    setFormOpen(true);
  };

  // Open form to edit existing product
  const openEditForm = (p: ProductItem & { _mongoId?: string }) => {
    setForm({
      name:             p.name,
      category:         p.category,
      categoryLabel:    p.categoryLabel,
      tagline:          p.tagline,
      description:      p.description,
      image:            p.image,
      priceRetailUSD:   String(p.priceRetailUSD),
      priceRetailKES:   String(p.priceRetailKES),
      unitWeight:       p.unitWeight,
      wholesalePriceUSD: String(p.wholesalePriceUSD || ''),
      wholesaleMOQ:     p.wholesaleMOQ || '',
      isPopular:        !!p.isPopular,
      isNew:            !!p.isNew,
      origin:           p.origin,
      flavorNotes:      [...p.flavorNotes],
      specs:            p.specs.length > 0 ? [...p.specs] : [{ label: '', value: '' }],
    });
    setImagePreview(p.image);
    setEditingId(p._mongoId || p.id);
    setFormOpen(true);
  };

  // Handle image file selection
  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview
    const reader = new FileReader();
    reader.onload = (ev) => setImagePreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to Cloudinary via API
    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const token = typeof window !== 'undefined' ? localStorage.getItem('rovil_admin_token') : null;
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/upload', {
        method: 'POST',
        headers,
        body: fd,
      });

      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      setForm((prev) => ({ ...prev, image: url }));
      setImagePreview(url);
    } catch {
      showToast('error', 'Image upload failed. Try again.');
    } finally {
      setUploadingImage(false);
    }
  };

  // Build a preview ProductItem from current form state
  const previewProduct: ProductItem = {
    id: 'preview',
    name:           form.name || 'Product Name',
    category:       form.category || 'coffee',
    categoryLabel:  form.categoryLabel || 'Kenyan Product',
    tagline:        form.tagline || 'Tagline goes here',
    description:    form.description || 'Product description will appear here.',
    image:          imagePreview || (form.category === 'tea' ? '/images/branded/rovil-tea-canister.jpg' : '/images/branded/rovil-coffee-pouch.jpg'),
    priceRetailUSD: Number(form.priceRetailUSD) || 0,
    priceRetailKES: Number(form.priceRetailKES) || 0,
    unitWeight:     form.unitWeight || 'Unit',
    wholesalePriceUSD: form.wholesalePriceUSD ? Number(form.wholesalePriceUSD) : undefined,
    wholesaleMOQ:   form.wholesaleMOQ || undefined,
    isPopular:      form.isPopular,
    isNew:          form.isNew,
    origin:         form.origin || 'Kenya Highlands',
    flavorNotes:    form.flavorNotes.length > 0 ? form.flavorNotes : ['Note 1', 'Note 2'],
    specs:          form.specs.filter((s) => s.label && s.value),
  };

  // Save product (create or update)
  const handleSave = async () => {
    if (!form.name || !form.image || !form.priceRetailUSD || !form.priceRetailKES) {
      showToast('error', 'Please fill in product name, image, and retail prices.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...form,
        priceRetailUSD:   Number(form.priceRetailUSD),
        priceRetailKES:   Number(form.priceRetailKES),
        wholesalePriceUSD: form.wholesalePriceUSD ? Number(form.wholesalePriceUSD) : undefined,
        specs:            form.specs.filter((s) => s.label && s.value),
      };

      const url = editingId ? `/api/products/${encodeURIComponent(editingId)}` : '/api/products';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        showToast('error', 'Session expired. Please log in.');
        setTimeout(() => { window.location.href = '/admin/login'; }, 1200);
        return;
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Save failed');
      }

      const saved = await res.json();
      showToast('success', editingId ? 'Product updated successfully!' : 'Product added to catalog!');
      setFormOpen(false);

      // Optimistic state update
      setProducts((prev) => {
        const targetId = editingId;
        if (targetId) {
          return prev.map((item) => ((item._mongoId || item.id) === targetId ? { ...item, ...saved } : item));
        } else {
          return [saved, ...prev];
        }
      });

      fetchProducts();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to save product. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const handleDelete = async (targetId: string) => {
    setDeletingId(targetId);
    try {
      const res = await fetch(`/api/products/${encodeURIComponent(targetId)}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (res.status === 401) {
        showToast('error', 'Session expired. Please log in.');
        setTimeout(() => { window.location.href = '/admin/login'; }, 1200);
        return;
      }

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Delete failed');
      }

      // Optimistic removal for instant UI response
      setProducts((prev) => prev.filter((p) => (p._mongoId || p.id) !== targetId && p.id !== targetId));
      setDeleteConfirm(null);
      showToast('success', 'Product deleted from catalog.');
      fetchProducts();
    } catch (err: any) {
      showToast('error', err.message || 'Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  // Flavor notes helpers
  const addFlavorNote = () => {
    const note = newFlavorNote.trim();
    if (note && !form.flavorNotes.includes(note)) {
      setForm((prev) => ({ ...prev, flavorNotes: [...prev.flavorNotes, note] }));
    }
    setNewFlavorNote('');
  };

  const removeFlavorNote = (idx: number) => {
    setForm((prev) => ({ ...prev, flavorNotes: prev.flavorNotes.filter((_, i) => i !== idx) }));
  };

  // Spec helpers
  const updateSpec = (idx: number, field: 'label' | 'value', val: string) => {
    setForm((prev) => {
      const specs = [...prev.specs];
      specs[idx] = { ...specs[idx], [field]: val };
      return { ...prev, specs };
    });
  };

  const addSpec = () => setForm((prev) => ({ ...prev, specs: [...prev.specs, { label: '', value: '' }] }));
  const removeSpec = (idx: number) => setForm((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== idx) }));

  // Separate coffee and tea lists for organized management
  const coffeeProducts = useMemo(() => products.filter((p) => p.category === 'coffee' || p.category.includes('coffee')), [products]);
  const teaProducts = useMemo(() => products.filter((p) => p.category === 'tea' || p.category.includes('tea')), [products]);
  const otherProducts = useMemo(
    () => products.filter((p) => p.category !== 'coffee' && !p.category.includes('coffee') && p.category !== 'tea' && !p.category.includes('tea')),
    [products]
  );

  const productBeingDeleted = useMemo(
    () => products.find((p) => (p._mongoId || p.id) === deleteConfirm),
    [products, deleteConfirm]
  );

  const renderProductCard = (p: ProductItem & { _mongoId?: string }) => {
    const pId = p._mongoId || p.id;
    return (
      <div key={pId} className="bg-white rounded-2xl border border-stone-200 shadow-xs overflow-hidden group hover:border-[#b57a44]/40 transition-all">
        {/* Thumbnail */}
        <div className="relative h-44 bg-stone-100">
          <Image
            src={p.image}
            alt={p.name}
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute top-2 left-2 flex gap-1">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md text-white ${
              p.category === 'coffee' ? 'bg-[#3e2211]' : 'bg-[#2a4d38]'
            }`}>
              {p.category === 'coffee' ? '☕ Coffee' : '🍃 Tea'}
            </span>
          </div>
          <div className="absolute bottom-2 left-2 flex gap-1">
            {p.isPopular && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#23150c] text-white flex items-center gap-0.5">
                <Star className="w-2.5 h-2.5 text-[#d89f68]" /> Best
              </span>
            )}
            {p.isNew && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#b57a44] text-white flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> New
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-bold text-sm text-[#23150c] line-clamp-1 leading-snug mb-1">{p.name}</p>
          <p className="text-xs text-stone-500 line-clamp-1 mb-2">{p.tagline}</p>
          <div className="flex items-center justify-between text-xs font-semibold text-[#23150c] mb-3 pb-3 border-b border-stone-100">
            <span>${p.priceRetailUSD.toFixed(2)} USD</span>
            <span className="text-stone-400 font-normal">|</span>
            <span>KES {p.priceRetailKES.toLocaleString()}</span>
            <span className="text-stone-400 font-normal text-[11px]">({p.unitWeight})</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => openEditForm(p)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-stone-100 hover:bg-[#3e2211] hover:text-white text-stone-700 text-xs font-semibold transition-all"
            >
              <Pencil className="w-3.5 h-3.5" /> Edit
            </button>
            <button
              onClick={() => setDeleteConfirm(pId)}
              className="flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-600 hover:text-white text-red-600 text-xs font-semibold transition-all"
              title="Delete product"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f6f3] font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-[#23150c] border-b border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#b57a44]/20 border border-[#b57a44]/30 flex items-center justify-center">
              <Coffee className="w-5 h-5 text-[#d89f68]" />
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block leading-none">ROVIL Admin</span>
              <span className="text-white/40 text-[11px]">Product Catalog Management</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/products"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-white/70 hover:text-white transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
            >
              <Eye className="w-3.5 h-3.5 text-[#d89f68]" />
              <span>Live Store</span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-300 text-xs font-medium transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Toast notifications */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-xl text-sm font-medium transition-all ${
            toast.type === 'success' ? 'bg-[#23150c] text-white border border-[#b57a44]/40' : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? <Check className="w-4 h-4 text-[#d89f68]" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.msg}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header & Quick Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#23150c] tracking-tight">Catalog Management</h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
              Maintain separate coffee and tea inventories with instant live preview.
            </p>
          </div>

          {/* Quick Add Buttons for Coffee and Tea */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={openNewCoffeeForm}
              className="inline-flex items-center gap-2 bg-[#3e2211] hover:bg-[#23150c] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Coffee className="w-4 h-4 text-[#d89f68]" />
              <span>+ Add Coffee</span>
            </button>

            <button
              onClick={openNewTeaForm}
              className="inline-flex items-center gap-2 bg-[#2a4d38] hover:bg-[#1b3525] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Leaf className="w-4 h-4 text-[#8ec8a5]" />
              <span>+ Add Tea</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation Filter */}
        <div className="flex items-center gap-2 mb-8 border-b border-stone-200 pb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-[#23150c] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <span>All Catalog</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
              activeTab === 'all' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}>
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('coffee')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'coffee'
                ? 'bg-[#3e2211] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5 text-[#d89f68]" />
            <span>Coffee Roster</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
              activeTab === 'coffee' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}>
              {coffeeProducts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('tea')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'tea'
                ? 'bg-[#2a4d38] text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-[#8ec8a5]" />
            <span>Tea Roster</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[11px] ${
              activeTab === 'tea' ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-700'
            }`}>
              {teaProducts.length}
            </span>
          </button>
        </div>

        {/* SECTION: COFFEE PRODUCTS */}
        {(activeTab === 'all' || activeTab === 'coffee') && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#3e2211]/10 flex items-center justify-center">
                  <Coffee className="w-4 h-4 text-[#3e2211]" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#23150c]">Kenyan Highland Coffee Products</h2>
                  <span className="text-xs text-stone-500">{coffeeProducts.length} product(s) in roster</span>
                </div>
              </div>

              <button
                onClick={openNewCoffeeForm}
                className="text-xs font-bold text-[#3e2211] hover:underline flex items-center gap-1"
              >
                + Add Coffee Item
              </button>
            </div>

            {coffeeProducts.length === 0 ? (
              <div className="py-12 text-center rounded-2xl bg-white border border-dashed border-stone-300">
                <Coffee className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500">No coffee products yet.</p>
                <button
                  onClick={openNewCoffeeForm}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-[#3e2211] text-white text-xs font-semibold"
                >
                  Add First Coffee
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {coffeeProducts.map(renderProductCard)}
              </div>
            )}
          </section>
        )}

        {/* SECTION: TEA PRODUCTS */}
        {(activeTab === 'all' || activeTab === 'tea') && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[#2a4d38]/10 flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-[#2a4d38]" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold text-[#23150c]">Kenyan Specialty &amp; Orthodox Tea Products</h2>
                  <span className="text-xs text-stone-500">{teaProducts.length} product(s) in roster</span>
                </div>
              </div>

              <button
                onClick={openNewTeaForm}
                className="text-xs font-bold text-[#2a4d38] hover:underline flex items-center gap-1"
              >
                + Add Tea Item
              </button>
            </div>

            {teaProducts.length === 0 ? (
              <div className="py-12 text-center rounded-2xl bg-white border border-dashed border-stone-300">
                <Leaf className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                <p className="text-xs text-stone-500">No tea products yet.</p>
                <button
                  onClick={openNewTeaForm}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-[#2a4d38] text-white text-xs font-semibold"
                >
                  Add First Tea
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {teaProducts.map(renderProductCard)}
              </div>
            )}
          </section>
        )}

        {/* SECTION: OTHER PRODUCTS (if any) */}
        {otherProducts.length > 0 && activeTab === 'all' && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-stone-600" />
                <div>
                  <h2 className="text-base font-extrabold text-[#23150c]">Other Catalog Products</h2>
                  <span className="text-xs text-stone-500">{otherProducts.length} product(s)</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {otherProducts.map(renderProductCard)}
            </div>
          </section>
        )}
      </div>

      {/* Delete confirm modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-stone-200">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
              <Trash2 className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-[#23150c] text-base mb-1">Delete Product?</h3>
            <p className="text-xs text-stone-600 mb-2">
              Are you sure you want to permanently delete{' '}
              <strong className="text-[#23150c]">
                {productBeingDeleted?.name || 'this product'}
              </strong>
              ?
            </p>
            <p className="text-[11px] text-stone-400 mb-5">
              This will remove it from both the admin dashboard and the live website catalog.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={!!deletingId}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={!!deletingId}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                {deletingId ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Yes, Delete</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Product Panel with Split Screen Live Preview */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex overflow-hidden">
          <div className="w-full flex flex-col lg:flex-row max-h-screen overflow-y-auto lg:overflow-hidden">
            {/* FORM (left side) */}
            <div className="w-full lg:w-1/2 bg-white flex flex-col max-h-screen">
              {/* Form header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 shrink-0 bg-stone-50">
                <div>
                  <h2 className="font-extrabold text-[#23150c] text-base">
                    {editingId ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <p className="text-xs text-stone-500">
                    Live changes preview in real time on the card to the right.
                  </p>
                </div>
                <button
                  onClick={() => setFormOpen(false)}
                  className="p-2 rounded-xl hover:bg-stone-200 transition-colors"
                >
                  <X className="w-5 h-5 text-stone-500" />
                </button>
              </div>

              {/* Form body (scrollable) */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {/* Category Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#23150c] mb-2 uppercase tracking-wider">
                    Product Category <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORY_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setForm((prev) => ({
                            ...prev,
                            category: opt.id,
                            categoryLabel: opt.label,
                          }));
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                          form.category === opt.id
                            ? 'bg-[#23150c] text-white border-[#23150c] shadow-xs'
                            : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                        }`}
                      >
                        {opt.id === 'coffee' ? '☕ ' : opt.id === 'tea' ? '🍃 ' : '📦 '}
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-[#23150c] mb-2 uppercase tracking-wider">
                    Product Image <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative h-48 rounded-2xl border-2 border-dashed cursor-pointer transition-all overflow-hidden ${
                      imagePreview ? 'border-[#b57a44]/50' : 'border-stone-300 hover:border-[#b57a44]/50 bg-stone-50'
                    }`}
                  >
                    {imagePreview ? (
                      <>
                        <Image src={imagePreview} alt="Preview" fill unoptimized className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl text-xs font-bold text-[#23150c] shadow-md">
                            <Upload className="w-4 h-4" />
                            <span>Change Image</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-stone-400">
                        {uploadingImage ? (
                          <Loader2 className="w-6 h-6 animate-spin text-[#b57a44]" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-stone-400" />
                            <span className="text-xs font-semibold text-stone-700">Click to upload photo</span>
                            <span className="text-[11px] text-stone-400">JPG, PNG, WebP — Cloudinary automatic sync</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>

                {/* Product Name & Tagline */}
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                      Product Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. ROVIL Single Origin Arabica Grade AA"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                      Tagline
                    </label>
                    <input
                      type="text"
                      value={form.tagline}
                      onChange={(e) => setForm((p) => ({ ...p, tagline: e.target.value }))}
                      placeholder="e.g. Flagship Mount Kenya Medium Roast"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                    placeholder="Describe flavor characteristics, harvest method, elevation..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                  />
                </div>

                {/* Pricing & Unit Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                      Retail USD ($) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={form.priceRetailUSD}
                      onChange={(e) => setForm((p) => ({ ...p, priceRetailUSD: e.target.value }))}
                      placeholder="14.50"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                      Retail KES <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      value={form.priceRetailKES}
                      onChange={(e) => setForm((p) => ({ ...p, priceRetailKES: e.target.value }))}
                      placeholder="1950"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                      Unit Weight
                    </label>
                    <input
                      type="text"
                      value={form.unitWeight}
                      onChange={(e) => setForm((p) => ({ ...p, unitWeight: e.target.value }))}
                      placeholder="250g Valve Pouch"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                    />
                  </div>
                </div>

                {/* Origin */}
                <div>
                  <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                    Origin / Growing Region
                  </label>
                  <input
                    type="text"
                    value={form.origin}
                    onChange={(e) => setForm((p) => ({ ...p, origin: e.target.value }))}
                    placeholder="e.g. Nyeri & Kiambu Highlands (1,950m ASL)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-white"
                  />
                </div>

                {/* Badges Toggle */}
                <div className="flex items-center gap-6 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isPopular}
                      onChange={(e) => setForm((p) => ({ ...p, isPopular: e.target.checked }))}
                      className="w-4 h-4 rounded accent-[#23150c]"
                    />
                    <span className="text-xs font-bold text-[#23150c]">⭐ Bestseller Badge</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isNew}
                      onChange={(e) => setForm((p) => ({ ...p, isNew: e.target.checked }))}
                      className="w-4 h-4 rounded accent-[#23150c]"
                    />
                    <span className="text-xs font-bold text-[#23150c]">✨ New Season Badge</span>
                  </label>
                </div>

                {/* Flavor Notes */}
                <div>
                  <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                    Flavor Notes &amp; Tasting Profile
                  </label>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {form.flavorNotes.map((n, i) => (
                      <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f4ece4] text-[#23150c] text-xs font-medium">
                        {n}
                        <button type="button" onClick={() => removeFlavorNote(i)} className="text-stone-400 hover:text-red-500 ml-0.5">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFlavorNote}
                      onChange={(e) => setNewFlavorNote(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFlavorNote())}
                      placeholder="Type note and hit Enter"
                      className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-stone-50"
                    />
                    <button
                      type="button"
                      onClick={addFlavorNote}
                      className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-xs font-bold text-[#23150c]"
                    >
                      + Add Note
                    </button>
                  </div>
                </div>

                {/* Specifications */}
                <div>
                  <label className="block text-xs font-bold text-[#23150c] mb-1.5 uppercase tracking-wider">
                    Technical Specifications
                  </label>
                  <div className="space-y-2">
                    {form.specs.map((spec, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={spec.label}
                          onChange={(e) => updateSpec(i, 'label', e.target.value)}
                          placeholder="Label (e.g. Roast Level)"
                          className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-stone-50"
                        />
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => updateSpec(i, 'value', e.target.value)}
                          placeholder="Value (e.g. Medium City Roast)"
                          className="flex-1 px-3 py-2 rounded-xl border border-stone-200 text-xs text-[#23150c] focus:outline-none focus:border-[#b57a44] bg-stone-50"
                        />
                        <button
                          type="button"
                          onClick={() => removeSpec(i)}
                          className="p-2 text-stone-400 hover:text-red-500"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addSpec}
                      className="text-xs text-[#b57a44] hover:text-[#23150c] font-bold"
                    >
                      + Add Spec Line
                    </button>
                  </div>
                </div>
              </div>

              {/* Form footer */}
              <div className="px-6 py-4 border-t border-stone-200 bg-white shrink-0 flex gap-3">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-bold hover:bg-stone-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || uploadingImage}
                  className="flex-1 py-2.5 rounded-xl bg-[#23150c] hover:bg-[#3e2211] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{editingId ? 'Updating...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <span>{editingId ? 'Update Product' : 'Add to Catalog'}</span>
                  )}
                </button>
              </div>
            </div>

            {/* PREVIEW (right side) */}
            <div className="hidden lg:flex lg:w-1/2 bg-[#f8f6f3] border-l border-stone-200 flex-col items-center justify-center p-8 gap-4">
              <div className="text-center mb-1">
                <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Live Card Preview</span>
                <p className="text-[11px] text-stone-400 mt-0.5">This is exactly how it appears on the live store</p>
              </div>
              <div className="w-full max-w-xs" style={{ perspective: 1200 }}>
                <ProductCard3D
                  product={previewProduct}
                  currency="USD"
                  isOwnerMode={false}
                  onQuickView={() => {}}
                  onEdit={() => {}}
                  previewMode
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
