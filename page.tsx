import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Shield, MapPin, QrCode, BarChart3, CheckCircle, Clock } from 'lucide-react'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is logged in, redirect to their dashboard
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role) {
      redirect(`/${profile.role}`)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">SideGuard</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Masuk</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/daftar">Daftar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Sistem Presensi Multi-Faktor
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-balance">
              Validasi Kehadiran yang{' '}
              <span className="text-primary">Aman & Akurat</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              SideGuard menggunakan kombinasi geolokasi GPS, kode QR dinamis, dan penilaian risiko 
              real-time untuk memastikan kehadiran yang valid dan mencegah kecurangan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/daftar">Mulai Sekarang</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sudah Punya Akun</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-card/50">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-center mb-12">
              Fitur Validasi Multi-Faktor
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Validasi Geolokasi</h3>
                <p className="text-sm text-muted-foreground">
                  GPS presisi tinggi dengan geofence yang dapat dikonfigurasi untuk memastikan 
                  kehadiran fisik di lokasi.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <QrCode className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">QR Code Dinamis</h3>
                <p className="text-sm text-muted-foreground">
                  Kode QR yang berubah setiap 30 detik dan hanya bisa digunakan sekali 
                  untuk mencegah pembagian.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Penilaian Risiko</h3>
                <p className="text-sm text-muted-foreground">
                  Algoritma scoring real-time yang menganalisis berbagai faktor untuk 
                  mendeteksi aktivitas mencurigakan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-border">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-center mb-12">
              Cara Kerja
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Buka Lokasi GPS', desc: 'Aktifkan GPS dan buka aplikasi di lokasi sekolah' },
                { step: '2', title: 'Pindai QR Code', desc: 'Scan kode QR yang ditampilkan guru' },
                { step: '3', title: 'Validasi Otomatis', desc: 'Sistem memvalidasi lokasi dan kode' },
                { step: '4', title: 'Presensi Tercatat', desc: 'Kehadiran tercatat dengan skor risiko' },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="border-t border-border bg-card/50">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h2 className="text-2xl font-bold text-center mb-12">
              Keunggulan SideGuard
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: <CheckCircle className="h-5 w-5" />, text: 'Mencegah titip absen' },
                { icon: <CheckCircle className="h-5 w-5" />, text: 'Deteksi GPS palsu' },
                { icon: <CheckCircle className="h-5 w-5" />, text: 'Audit trail lengkap' },
                { icon: <CheckCircle className="h-5 w-5" />, text: 'Dashboard real-time' },
                { icon: <CheckCircle className="h-5 w-5" />, text: 'Laporan otomatis' },
                { icon: <Clock className="h-5 w-5" />, text: 'Validasi dalam detik' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border">
                  <div className="text-primary">{item.icon}</div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold">SideGuard</span>
            </div>
            <p className="text-sm text-muted-foreground">
              SMK Negeri 1 Cimahi - Sistem Presensi Multi-Faktor
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
