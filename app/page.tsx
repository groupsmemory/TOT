import React from 'react';
import Head from 'next/head';
import { ShieldCheck, Leaf, Flame, ArrowRight, Shield, Activity, Droplets, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans selection:bg-[#E85D04] selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full flex items-center justify-between px-6 py-6 md:px-12 z-50 bg-[#FDFCF8]/90 backdrop-blur-md border-b border-black/5">
        <div className="text-2xl font-black tracking-tighter">T.O.T</div>
        <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
          <a href="#cerita" className="hover:text-[#E85D04] transition-colors">Kisah Kami</a>
          <a href="#kualitas" className="hover:text-[#E85D04] transition-colors">Standar Keamanan</a>
          <a href="#produk" className="hover:text-[#E85D04] transition-colors">Koleksi</a>
        </div>
        <button className="bg-[#1A1A1A] text-[#FDFCF8] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#E85D04] transition-colors">
          Pesan Sekarang
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 px-6 md:px-12 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#E85D04]/5 blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-amber-500/5 blur-[100px]"></div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#1A1A1A]/10 bg-white shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#E85D04] animate-pulse"></span>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#1A1A1A]/70">Rasa Asli Madura</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] max-w-5xl mb-6">
          Resep Asli Madura, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E85D04] to-[#DC2F02]">Disterilisasi Sempurna.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-[#1A1A1A]/70 max-w-2xl mb-12 font-medium leading-relaxed">
          Bawa resep keluarga asli ke meja TRETAN. Gak asal-asalan dibikinnya, pakghun pakai standar aman yang ketat buat keluarga.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a href="/checkout" className="flex items-center justify-center gap-2 bg-[#E85D04] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#DC2F02] hover:scale-105 transition-all w-full sm:w-auto shadow-xl shadow-[#E85D04]/20">
            Pesan Sekarang <ArrowRight className="w-5 h-5" />
          </a>
          <a href="#kualitas" className="flex items-center justify-center gap-2 bg-white text-[#1A1A1A] border-2 border-black/5 px-8 py-4 rounded-full font-bold text-lg hover:border-black/10 transition-all w-full sm:w-auto">
            Kenapa T.O.T Aman?
          </a>
        </div>
      </section>

      {/* Engineering Trust Section */}
      <section id="kualitas" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold tracking-widest uppercase text-[#E85D04] mb-4">Gak Sekedar Bikin Sambal</h2>
              <h3 className="text-4xl md:text-5xl font-black leading-tight">Rasa Madhureh Asli, <br />Tapi Aman.</h3>
            </div>
            <p className="max-w-md text-[#1A1A1A]/70 font-medium">
              Aku ini cuma ibu rumah tangga, tapi bikin sambal gak mau ngasal lho. Pakghun pakai standar ketat biar TRETAN aman makannya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-3xl bg-[#FDFCF8] border border-black/5 flex flex-col items-start group hover:border-[#E85D04]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#E85D04]/10 flex items-center justify-center text-[#E85D04] mb-6 group-hover:scale-110 transition-transform">
                <Activity className="w-7 h-7" />
              </div>
              <div className="text-3xl font-black mb-2 text-[#1A1A1A]">pH &lt; 4.6</div>
              <h4 className="text-lg font-bold mb-3">Asam yang Pas</h4>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                Aku atur pH-nya ketat di bawah 4.6. Biar apa? Biar bakteri bahaya gak bisa idup, tapi rasa asli tetep enak banget dapetnya. Aman pol.
              </p>
            </div>
            
            <div className="p-8 rounded-3xl bg-[#FDFCF8] border border-black/5 flex flex-col items-start group hover:border-[#E85D04]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#E85D04]/10 flex items-center justify-center text-[#E85D04] mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <div className="text-3xl font-black mb-2 text-[#1A1A1A]">85°C</div>
              <h4 className="text-lg font-bold mb-3">Hot Filling 85°C</h4>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                Sambal dimasukin ke botol pas suhu 85°C. Panas banget emang, tapi ini loh yang bikin steril. Relate kan repotnya sterilin botol susu anak?
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FDFCF8] border border-black/5 flex flex-col items-start group hover:border-[#E85D04]/30 transition-colors">
              <div className="w-14 h-14 rounded-2xl bg-[#E85D04]/10 flex items-center justify-center text-[#E85D04] mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-7 h-7" />
              </div>
              <div className="text-3xl font-black mb-2 text-[#1A1A1A]">Anti Bocor</div>
              <h4 className="text-lg font-bold mb-3">Double Protection</h4>
              <p className="text-[#1A1A1A]/70 leading-relaxed">
                Pakai Segel Aluminium Induction Sealer. Komitmenku nih, biar sambal sampai ke tangan TRETAN pakghun aman, gak bocor atau bleber sedikit pun di jalan.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-black text-white flex flex-col items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-3xl font-black mb-2">0</div>
              <h4 className="text-lg font-bold mb-3">Bahan Pengawet</h4>
              <p className="text-white/70 leading-relaxed">
                Gak pakai pengawet sama sekali. Serius, TRETAN. Kombinasi panas dan asam aja udah cukup bikin awet. Gak perlu bahan kimia aneh-aneh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story / Artisan Section */}
      <section id="cerita" className="py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 relative">
            <div className="aspect-[4/5] bg-neutral-200 rounded-[2rem] overflow-hidden relative">
              <img src="https://picsum.photos/800/1000?food" alt="Artisan Madura" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-sm font-bold tracking-widest uppercase mb-2">Tretan O Tiga</p>
                <p className="text-2xl font-serif">Persaudaraan. Dedikasi. Rasa.</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl md:text-5xl font-black leading-tight">
              Bukan Pabrik. <br/>
              Ini Dapur Keluarga, TRETAN.
            </h2>
            <div className="w-12 h-1 bg-[#E85D04]"></div>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              Lahir dari kata 'TRETAN' yang artinya saudara. Aku ini cuma ibu 3 anak bocah, bareng 3 saudaraku yang gak rela resep asli warisan mbe-buyut kita hilang kalah sama lincahnya pabrik gede.
            </p>
            <p className="text-lg text-[#1A1A1A]/80 leading-relaxed">
              Capek emang milih cabai satu-satu sambil ngurusin anak, nyangrai rempah pelan-pelan. Tapi aslinya emang harus gini. Bangga ih bisa wujudin tradisi dicampur standar gizi yang bener.
            </p>
            <blockquote className="border-l-4 border-[#E85D04] pl-6 italic font-medium text-xl text-[#1A1A1A]">
              "Tiap botol ini janjiku buat TRETAN. Resep asli Madura yang 100% aman buat dimakan keluarga."
            </blockquote>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section id="produk" className="py-24 px-6 md:px-12 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Dibikin Terbatas. Nyaman Di Meja.</h2>
          <p className="text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto">
            Aku cuma produksi dikit-dikit tiap harinya. Biar rasanya pakghun terjaga kualitasnya buat TRETAN.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="flex flex-col md:flex-row bg-white rounded-3xl p-8 border border-black/5 hover:shadow-2xl hover:shadow-[#E85D04]/10 transition-all group items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/2 aspect-square bg-neutral-100 rounded-2xl overflow-hidden relative">
               <img src="https://picsum.photos/400/400?spice" alt="Sambal Terasi Tretan" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-4 right-4 bg-black text-white text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider">
                 Produk Unggulan
               </div>
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
              <h3 className="text-3xl md:text-4xl font-black mb-4">Sambal Terasi Tretan</h3>
              <p className="text-[#1A1A1A]/70 mb-8 text-lg leading-relaxed">Pedasnya dapet banget, terasinya aseli Madura. Dibikin jujur pakai bahan se-berse mungkin tanpa ngurangin lidah lokal sedikitpun.</p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <span className="text-3xl font-black text-[#E85D04]">Rp 45.000</span>
                <a href="/checkout" className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-[#E85D04] transition-colors w-full sm:w-auto shadow-lg">
                  Beli Sekarang <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 px-6 md:px-12 bg-[#1A1A1A] text-white text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E85D04]/20 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">Dhente' gelluh, stoknya dikit.</h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Bikin pakai teknik Hot Filling 85°C itu butuh waktu, TRETAN. Makanya stok sering abis. Mending pesen sekarang aja sebelum kehabisan.
          </p>
          <a href="/checkout" className="inline-block bg-white text-[#1A1A1A] px-10 py-5 rounded-full font-black text-xl hover:bg-[#E85D04] hover:text-white transition-colors shadow-2xl hover:shadow-[#E85D04]/50 hover:scale-105 duration-300 mb-16">
            Pastiin Stok Buat TRETAN
          </a>
          
          <div className="text-2xl md:text-3xl font-black text-[#E85D04] italic">
            Nyaman Ongghu, TRETAN 🔥
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white/50 py-12 px-6 md:px-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between relative">
        <div className="mb-8 md:mb-0">
          <span className="text-2xl font-black text-white tracking-tighter mr-4">T.O.T</span>
          <span className="text-sm block md:inline mt-2 md:mt-0">Tretan O Tiga. Artisan Madura.</span>
        </div>
        
        {/* WhatsApp Magic Button */}
        <a 
          href="https://wa.me/6287873550273?text=Halo%20TRETAN%2C%20saya%20mau%20pesan%20Sambal%20Terasi%20Tretan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:shadow-[#25D366]/40 transition-all hover:scale-105 mb-8 md:mb-0 group cursor-pointer"
        >
          <svg className="w-6 h-6 fill-current animate-pulse group-hover:animate-none" viewBox="0 0 24 24">
            <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.12.548 4.185 1.59 5.99L.43 24l6.115-1.605A12.012 12.012 0 0012.031 24c6.646 0 12.031-5.385 12.031-12.031C24.062 5.385 18.677 0 12.031 0zm3.627 17.26c-.344.97-1.956 1.86-2.81 1.94-.805.082-1.895.345-6.075-1.29-5.01-1.96-8.25-7.14-8.5-7.47-.24-.34-2.02-2.7-2.02-5.15s1.28-3.66 1.74-4.14c.46-.48 1.05-.59 1.4-.59.34 0 .69.01 1.02.03.35.01.81-.13 1.27.97.48 1.15 1.56 3.82 1.7 4.15.14.33.24.72.03 1.2-.21.49-.32.78-.63 1.16-.33.37-.68.81-.97 1.05-.31.25-.63.53-.29 1.11.35.59 1.55 2.55 3.32 4.13 2.29 2.05 4.3 2.7 4.88 2.95.59.26 1.14.21 1.56-.25.43-.45 1.81-2.11 2.3-2.84.48-.73.96-.61 1.49-.41.54.2 3.42 1.61 4 1.9.59.29.98.44 1.12.68.14.25.14 1.43-.2 2.4z"/>
          </svg>
          Chat WhatsApp
        </a>

        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
          <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
        </div>
      </footer>
    </div>
  );
}
