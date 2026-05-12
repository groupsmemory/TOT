'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    cityId: '', 
  });
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedShipping, setSelectedShipping] = useState<number>(0);
  const [loadingShipping, setLoadingShipping] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [error, setError] = useState('');

  const productPrice = 45000;

  // RajaOngkir Starter requires city IDs. 
  // For a real prod, you need an endpoint to fetch and select cities.
  // Here we'll hardcode one city ID for Jakarta Selatan (153) to test.
  // The user should ideally select this from a dropdown.
  
  const handleCalculateShipping = async () => {
    // Basic validation
    if (!formData.cityId) {
      setError('Masukkan ID Kota (Contoh Jakarta Selatan: 153). Untuk data kota lengkap, butuh fetching ke endpoint RajaOngkir.');
      return;
    }

    setLoadingShipping(true);
    setError('');
    
    try {
      const res = await fetch('/api/shipping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: formData.cityId,
          weight: 500, // 500 grams for 1 jar
        }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch shipping');
      
      setShippingOptions(data.costs);
      if (data.costs && data.costs.length > 0) {
        setSelectedShipping(data.costs[0].cost[0].value);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingShipping(false);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedShipping === 0) {
      setError('Tolong hitung dan pilih ongkir dulu ya TRETAN.');
      return;
    }

    setLoadingCheckout(true);
    setError('');

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          shippingCost: selectedShipping,
          destination: formData.cityId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Checkout gagal');

      // Redirect to Xendit Invoice
      if (data.invoiceUrl) {
        window.location.href = data.invoiceUrl;
      }
    } catch (err: any) {
      setError(err.message);
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans selection:bg-[#E85D04] selection:text-white py-12 px-6">
      <Head>
        <title>Checkout | T.O.T Sambal Terasi</title>
      </Head>
      
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Detail Form */}
        <div className="flex-1">
          <a href="/" className="inline-block text-sm font-bold text-[#E85D04] uppercase tracking-wider mb-8 hover:underline">
            ← Balik ke Home
          </a>
          
          <h1 className="text-4xl font-black mb-2">Pastiin Nyaman, TRETAN.</h1>
          <p className="text-[#1A1A1A]/70 mb-8 max-w-sm">Isi data lengkap ya biar sambal kesayangan paket liburan ke rumahmu pakghun aman.</p>
          
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Nama Lengkap</label>
              <input 
                type="text" 
                required
                className="w-full border-2 border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] transition-colors"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Misal: Yuli Astutik"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Nomor WhatsApp</label>
              <input 
                type="tel" 
                required
                className="w-full border-2 border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] transition-colors"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="Misal: 08123456789 (Disambung ke resi!)"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold mb-2">Alamat Lengkap</label>
              <textarea 
                required
                rows={3}
                className="w-full border-2 border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] transition-colors resize-none"
                value={formData.address}
                onChange={e => setFormData({...formData, address: e.target.value})}
                placeholder="Tulis alamat rumah detail, patokan warung boleh"
              />
            </div>

            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-bold mb-2">ID Kota (RajaOngkir)</label>
                <input 
                  type="text" 
                  required
                  className="w-full border-2 border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#E85D04] transition-colors"
                  value={formData.cityId}
                  onChange={e => setFormData({...formData, cityId: e.target.value})}
                  placeholder="Contoh: 153 (Jkt Sel)"
                />
              </div>
              <button 
                type="button" 
                onClick={handleCalculateShipping}
                className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-[#E85D04] transition-colors h-[52px]"
                disabled={loadingShipping}
              >
                {loadingShipping ? <Loader2 className="animate-spin w-5 h-5 mx-auto" /> : 'Cek Ongkir'}
              </button>
            </div>

            {shippingOptions.length > 0 && (
              <div className="bg-white p-6 rounded-2xl border border-black/5 mt-4 space-y-4">
                <h3 className="font-bold text-sm tracking-widest text-[#E85D04] uppercase">Pilih Layanan Pengiriman (JNE)</h3>
                <div className="space-y-3">
                  {shippingOptions.map((opt: any) => (
                    <label key={opt.service} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${selectedShipping === opt.cost[0].value ? 'border-[#E85D04] bg-[#E85D04]/5' : 'border-black/5 hover:border-black/20'}`}>
                      <div className="flex items-center gap-3">
                        <input 
                          type="radio" 
                          name="shipping" 
                          value={opt.cost[0].value}
                          checked={selectedShipping === opt.cost[0].value}
                          onChange={() => setSelectedShipping(opt.cost[0].value)}
                          className="w-5 h-5 accent-[#E85D04]"
                        />
                        <div>
                          <p className="font-bold">{opt.service}</p>
                          <p className="text-sm text-[#1A1A1A]/60">Estimasi: {opt.cost[0].etd} Hari</p>
                        </div>
                      </div>
                      <p className="font-black text-lg">Rp {opt.cost[0].value.toLocaleString('id-ID')}</p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {error && <p className="text-red-500 font-bold bg-red-50 p-4 rounded-xl border border-red-100">{error}</p>}

          </form>
        </div>
        
        {/* Order Summary */}
        <div className="w-full md:w-96">
          <div className="bg-white border text-black/5 p-8 rounded-3xl sticky top-8 shadow-2xl shadow-[#E85D04]/5 text-[#1A1A1A]">
            <h2 className="text-xl font-black mb-6 border-b border-black/10 pb-4">Pesanan TRETAN</h2>
            
            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-neutral-100 rounded-xl overflow-hidden shrink-0">
                <img src="https://picsum.photos/400/400?spice" alt="Sambal" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold leading-tight">Sambal Terasi Tretan</h3>
                <p className="text-sm text-[#1A1A1A]/60 mt-1">1x Botol | Hot Filling 85°C</p>
                <p className="font-black mt-2">Rp {productPrice.toLocaleString('id-ID')}</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm border-b border-black/10 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]/70">Subtotal</span>
                <span className="font-bold">Rp {productPrice.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]/70">Ongkos Kirim</span>
                <span className="font-bold">{selectedShipping > 0 ? `Rp ${selectedShipping.toLocaleString('id-ID')}` : '-'}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-black">Total</span>
              <span className="text-2xl font-black text-[#E85D04]">
                Rp {(productPrice + selectedShipping).toLocaleString('id-ID')}
              </span>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              disabled={loadingCheckout || selectedShipping === 0}
              className={`w-full py-4 rounded-full font-black text-lg flex items-center justify-center transition-all ${loadingCheckout || selectedShipping === 0 ? 'bg-black/10 text-black/40 cursor-not-allowed' : 'bg-[#1A1A1A] text-white hover:bg-[#E85D04] hover:shadow-xl hover:shadow-[#E85D04]/30 hover:scale-[1.02]'}`}
            >
              {loadingCheckout ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  Muter Dulu...
                </>
              ) : (
                'Bayar Sekarang'
              )}
            </button>
            <p className="text-center text-xs text-[#1A1A1A]/50 mt-4 font-medium flex items-center justify-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Pembayaran Aman via QRIS/Transfer Bank
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
