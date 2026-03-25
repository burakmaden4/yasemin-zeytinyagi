import { useEffect, useState, useRef } from 'react'
import { ArrowRight, Award, Check, ChevronLeft, ChevronRight, Clock3, Droplets, FileText, FlaskConical, MapPinned, Menu, PlayCircle, Search, ShieldCheck, ShoppingBag, Truck, User, X } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const palette = {
  bg: '#f5f1e8',
  surface: '#fbf8f2',
  primary: '#3c5a00',
  primaryDark: '#333e02',
  accent: '#839100',
  accentSoft: '#ccf708',
  ink: '#16190f',
  muted: '#44542a',
  line: 'rgba(51, 62, 2, 0.18)',
}

const navLinks = [
  { label: 'Anasayfa', href: '#hero' },
  { label: 'Ürünler', href: '#seckiler' },
  { label: 'Kullanım', href: '#felsefe' },
  { label: 'Analiz Raporu', href: '#protokol' },
  { label: 'Rehber', href: '#satin-al' },
  { label: 'İletişim', href: '#footer' },
]

const commerceHighlights = [
  { icon: ShieldCheck, title: '%100 Doğal' },
  { icon: FlaskConical, title: '0,1-0,3 Asit' },
  { icon: Truck, title: 'Ücretsiz Kargo' },
  { icon: Award, title: 'Ödüllü Memecik' },
  { icon: Droplets, title: 'Erken Hasat' },
  { icon: Clock3, title: 'Hızlı Teslimat' },
]

const promoItems = [
  'Avrupa Birliği tescilli Memecik zeytinyağı',
  'Havale ve EFT ile ek indirim',
  'Ücretsiz kargo avantajı',
  'Erken hasat ve soğuk sıkım seçkiler',
]

const productRail = [
  {
    name: 'Memecik Erken Hasat Soğuk Sıkım 5LT',
    price: '₺3.377,00',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-memecik-erken-hasat-sogu-be7-45.jpg',
    href: 'https://yaseminhanim.com/yasemin-hanim-2025-2026-yeni-hasat-memecik-erken-hasat-soguk-sikim-naturel-sizma-zeytinyagi-5lt',
    badge: 'Çok satan',
  },
  {
    name: "2'li Avantaj Paketi Memecik Erken Hasat 5LT",
    price: '₺5.977,00',
    oldPrice: '₺6.754,00',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-2li-avantaj-paketi-memec--dfbe-.jpg',
    href: 'https://yaseminhanim.com/yasemin-hanim-2025-2026-yeni-hasat-2li-avantaj-paketi-memecik-erken-hasat-soguk-sikim-naturel-sizma-zeytinyagi-5lt',
    badge: 'Avantaj paketi',
  },
  {
    name: 'Naturel Sızma Zeytinyağı 5LT',
    price: '₺2.377,00',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-naturel-sizma-zeytinyagi-c9c-fe.jpg',
    href: 'https://yaseminhanim.com/olgun-hasat-naturel-sizma-zeytinyagi-5lt',
    badge: 'Klasik seri',
  },
  {
    name: '5LT x2 Süper Avantaj Paketi',
    price: '₺3.500,00',
    oldPrice: '₺4.477,00',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-naturel-sizma-zeytinyagi-dc2350.jpg',
    href: 'https://yaseminhanim.com/yasemin-hanim-naturel-sizma-zeytinyagi-5lt.x2-li-super-avantaj',
    badge: 'Süper avantaj',
  },
  {
    name: "Erken Hasat 5L x 4'lü Fırsat Paketi",
    price: '₺8.500,00',
    oldPrice: '₺9.977,00',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-erken-hasat-soguk-sikim--e54e39.jpg',
    href: 'https://yaseminhanim.com/yasemin-hanim-erken-hasat-soguk-sikim-naturel-sizma-zeytinyagi-4lu-firsat-paketi',
    badge: 'Aile paketi',
  },
  {
    name: 'Üçlü Ekonomik Paket',
    price: '₺2.500,00',
    oldPrice: '₺3.977,00',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/uclu-ekonomik-paket-yasemin-hanim-erke-dfa817.png',
    href: 'https://yaseminhanim.com/uclu-ekonomik-paket-yasemin-hanim-erken-hasat-soguk-sikim-naturel-sizma-zeytinyagi-450gr-aydin-kuru-incir-iki-adet-zeytinyagi-sabunu',
    badge: 'Ekonomik paket',
  },
]

const bundleOffer = {
  title: 'Aile Boyu Avantaj Paketi',
  subtitle: '5LT teneke + 750ML cam şişe + özel üretim 250ML',
  oldPrice: '₺4.320',
  price: '₺3.690',
  discount: '%15',
  perks: ['Ücretsiz kargo', 'Aynı gün hazırlık', 'Fırsat fiyatı'],
  href: 'https://yaseminhanim.com/urunler',
  image: 'https://static.ticimax.cloud/57442//uploads/images/anasayfa/yasemin_hanim_siseler_tenekeli-_1_.jpg',
}

const trustFeatures = [
  { title: '%100 Memecik', text: 'Coğrafi karakteri güçlü, rafine aroma yapısı.' },
  { title: 'Erken Hasat', text: 'Toplandığı gün işlenen canlı ve taze profil.' },
  { title: 'Soğuk Sıkım', text: 'Düşük sıcaklıkta sıkım ile aroma korunur.' },
  { title: 'Lab Analizi', text: 'Her seride kalite ve şeffaflık sinyali.' },
  { title: 'Aynı Gün Kargo', text: 'Siparişten sonra hızlı hazırlık akışı.' },
  { title: 'Katkısız İçerik', text: 'Sade ürün dili, temiz üretim yaklaşımı.' },
]

const labMetrics = [
  { value: '0.2', label: 'Asit' },
  { value: '560', label: 'Polifenol' },
  { value: '5', label: 'Peroksit' },
]

const testimonials = [
  {
    name: 'Ayşe V.',
    quote: 'Gerçek zeytinyağı tadını ilk defa bu kadar net aldım. Paketleme de çok özenliydi.',
  },
  {
    name: 'Mehmet K.',
    quote: 'Çocuklar için güvenle kullanıyorum. Kokusu ve içimi gerçekten çok temiz.',
  },
  {
    name: 'Selin B.',
    quote: 'Kargo hızlı, ürün dili açık ve kalite hissi çok yüksek. Tekrar sipariş verdim.',
  },
  {
    name: 'Elif T.',
    quote: 'Kahvaltıda kullandığımda farkı hemen anladım. Aroması temiz, içimi yumuşak.',
  },
  {
    name: 'Burak A.',
    quote: 'Avantaj paketini aldım, hem fiyat hem kalite açısından çok memnun kaldım.',
  },
  {
    name: 'Derya M.',
    quote: 'Salatalarda çok canlı duruyor. Şişe ve paketleme kalitesi de güven veriyor.',
  },
]

const serviceLinks = [
  'Sıkça sorulan sorular',
  'Kargo ve teslimat',
  'İade ve değişim',
  'Güvenli ödeme',
]

const productionSteps = [
  {
    step: '1',
    title: 'Bahçe bakımı ve hazırlık',
    text: 'Zeytin ağaçları yıl boyunca iklim ve toprak koşullarına göre takip edilir, hasat en doğru zamanda planlanır.',
  },
  {
    step: '2',
    title: 'Hasat süreci',
    text: 'Memecik zeytinleri mevsimin en doğru döneminde toplanır; tazelik ve aroma korunur.',
  },
  {
    step: '3',
    title: 'Soğuk sıkım',
    text: 'Toplanan zeytinler bekletilmeden düşük sıcaklıkta sıkılır; canlı tat profili korunur.',
  },
  {
    step: '4',
    title: 'Analiz ve dinlendirme',
    text: 'Üretim sonrası değerler kontrol edilir, ardından yağ uygun koşullarda dinlendirilir.',
  },
  {
    step: '5',
    title: 'Şişeleme ve tenekeleme',
    text: 'Kullanım ihtiyacına göre cam şişe ve teneke ambalaj seçenekleriyle paketleme yapılır.',
  },
  {
    step: '6',
    title: 'Sofraya ulaşma',
    text: 'Hazırlanan siparişler özenle paketlenir ve tazeliğini koruyacak şekilde yola çıkar.',
  },
]

const usageAreas = [
  {
    title: 'Kahvaltıda',
    description: 'Sıcak ekmek, peynir tabağı ve domates eşliğinde meyvemsiliği en net hissettiren kullanım.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Salatalarda',
    description: 'Yeşillik, nar ekşisi ve narenciye ile birlikte daha parlak ve canlı bir tat verir.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Sıcak yemeklerde',
    description: 'Sebze yemekleri, zeytinyağlılar ve hafif soslarda dengeli bir gövde oluşturur.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=1200&q=80',
  },
]

const nationalReachStats = [
  { value: '81 ile', label: 'Türkiye geneline özenli gönderim' },
  { value: 'Her gün', label: 'Siparişe giren yeni sofralar' },
  { value: 'Tekrar', label: 'Memnuniyetle geri dönen müşteriler' },
]

const nationalReachSignals = [
  'Türkiye geneline gönderim',
  'Kapıya kadar güvenli teslimat',
  'Mutfaklarda tekrar tercih ediliyor',
  'Siparişten sonra özenli hazırlık',
]

const guideCards = [
  {
    title: 'Zeytinyağı nasıl seçilir?',
    description: 'Erken hasat, soğuk sıkım, asit oranı ve kullanım ihtiyacına göre seçim yapın.',
    href: 'https://yaseminhanim.com/blog',
  },
  {
    title: 'Erken hasat ne demek?',
    description: 'Daha canlı aroma, daha belirgin karakter ve daha taze bir profil sunar.',
    href: 'https://yaseminhanim.com/blog',
  },
  {
    title: 'Polifenol neden önemli?',
    description: 'Kalite hissini, yoğunluğu ve ürünün karakterini etkileyen temel göstergelerden biridir.',
    href: 'https://yaseminhanim.com/blog',
  },
]

const compareOptions = [
  {
    label: 'Günlük kullanım',
    title: 'Naturel Sızma 5LT',
    description: 'Evde günlük kullanım için dengeli, güvenli ve fiyat performans odaklı seçim.',
    price: '₺2.377',
    oldPrice: '₺2.690',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-naturel-sizma-zeytinyagi-c9c-fe.jpg',
    href: 'https://yaseminhanim.com/olgun-hasat-naturel-sizma-zeytinyagi-5lt',
    audience: 'Her gün kullananlar için',
    bullets: ['5 litre teneke', 'Günlük mutfak kullanımı', 'Dengeli içim'],
  },
  {
    label: 'En çok tercih edilen',
    title: 'Memecik Erken Hasat 5LT',
    description: 'Aroma, yoğunluk ve premium tat profili arayanlar için en güçlü ana seçim.',
    price: '₺3.377',
    oldPrice: '₺3.790',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-memecik-erken-hasat-sogu-be7-45.jpg',
    href: 'https://yaseminhanim.com/yasemin-hanim-2025-2026-yeni-hasat-memecik-erken-hasat-soguk-sikim-naturel-sizma-zeytinyagi-5lt',
    audience: 'Lezzet ve kalite arayanlar için',
    bullets: ['Erken hasat', 'Soğuk sıkım', 'Memecik karakteri'],
    featured: true,
  },
  {
    label: 'Avantajlı paket',
    title: "2'li Avantaj Paketi 5LT",
    description: 'Daha fazla stok yapmak ve birim maliyeti düşürmek isteyenler için avantajlı paket.',
    price: '₺5.977',
    oldPrice: '₺6.754',
    image: 'https://static.ticimax.cloud/57442/Uploads/UrunResimleri/buyuk/yasemin-hanim-2li-avantaj-paketi-memec--dfbe-.jpg',
    href: 'https://yaseminhanim.com/yasemin-hanim-2025-2026-yeni-hasat-2li-avantaj-paketi-memecik-erken-hasat-soguk-sikim-naturel-sizma-zeytinyagi-5lt',
    audience: 'Stoklu alışveriş yapanlar için',
    bullets: ['2 adet 5LT', 'Avantajlı fiyat', 'Aile kullanımı'],
  },
]

const purchaseTrustBadges = [
  'Ücretsiz kargo',
  'Güvenli ödeme',
  'Erken hasat',
  'Düşük asit',
  'Lab analizi',
  'Katkısız içerik',
]

const manifestoSmall = 'Yasemin Hanım ürünleri yalnızca satın alınan değil, sofrada tekrar tekrar kullanılan ürünlerdir.'
const manifestoLarge = 'Aynı zeytinyağı, kahvaltıda başka; salatada başka; sıcak yemekte bambaşka bir karakter gösterir.'

function MagneticButton({ href, label, inverse = false, className = '' }) {
  return (
    <a
      href={href}
      className={`group interactive-lift relative inline-flex items-center justify-center overflow-hidden rounded-full border px-6 py-3.5 text-sm font-semibold tracking-[0.14em] transition-transform duration-300 hover:scale-[1.03] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${inverse ? 'border-white/15 text-white' : 'border-[var(--line)] text-[var(--ink)]'} ${className}`}
    >
      <span className={`absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 ${inverse ? 'bg-[var(--accentSoft)]/20' : 'bg-[var(--primary)]'}`} />
      <span className={`relative z-10 flex items-center gap-2 transition-colors duration-500 ${inverse ? 'group-hover:text-white' : 'group-hover:text-white'}`}>
        {label}
        <ArrowRight size={16} strokeWidth={2} />
      </span>
    </a>
  )
}

function App() {
  const [navScrolled, setNavScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const appRef = useRef(null)
  const heroRef = useRef(null)
  const manifestoRef = useRef(null)
  const manifestoTextureRef = useRef(null)
  const railRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setNavScrolled(!entry.isIntersecting),
      { threshold: 0.22 },
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-fade', {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: 'power3.out',
      })

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
          },
        })
      })

      if (manifestoTextureRef.current) {
        gsap.to(manifestoTextureRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

    }, appRef)

    return () => ctx.revert()
  }, [])

  const scrollRail = (direction) => {
    if (!railRef.current) return
    const amount = railRef.current.clientWidth * 0.82
    railRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    })
  }

  return (
    <div
      ref={appRef}
      style={{
        '--bg': palette.bg,
        '--surface': palette.surface,
        '--primary': palette.primary,
        '--primaryDark': palette.primaryDark,
        '--accent': palette.accent,
        '--accentSoft': palette.accentSoft,
        '--ink': palette.ink,
        '--muted': palette.muted,
        '--line': palette.line,
      }}
      className="bg-[var(--bg)] text-[var(--ink)]"
    >
      <div className="border-b border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--primaryDark)] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 md:gap-x-6">
          {promoItems.map((item, index) => (
            <div key={item} className="flex items-center gap-4">
              {index > 0 && <span className="hidden text-[var(--muted)] md:block">•</span>}
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-2 py-2 transition-all duration-500 ${navScrolled ? 'rounded-full border border-white/10 bg-[color:rgba(245,241,232,0.78)] text-[var(--primaryDark)] shadow-[0_20px_80px_rgba(22,25,15,0.14)] backdrop-blur-xl md:px-5' : 'rounded-full border border-white/15 bg-[color:rgba(10,12,8,0.42)] text-white shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl md:px-5'}`}
        >
          <a href="#hero" className="interactive-lift text-lg font-medium tracking-[-0.03em] md:text-xl">
            Yasemin<span className={`${navScrolled ? 'text-[var(--accent)]' : 'text-[var(--accentSoft)]'}`}>Hanım</span>
          </a>

          <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.14em] md:flex lg:gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="interactive-lift transition-opacity hover:opacity-75">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a href="#arama" className="interactive-lift opacity-85 hover:opacity-100">
              <Search size={16} />
            </a>
            <a href="#hesap" className="interactive-lift opacity-85 hover:opacity-100">
              <User size={16} />
            </a>
            <a href="#satin-al" className="interactive-lift relative opacity-85 hover:opacity-100">
              <ShoppingBag size={16} />
              <span className={`absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-bold ${navScrolled ? 'bg-[var(--accent)] text-white' : 'bg-[var(--accentSoft)] text-[var(--primaryDark)]'}`}>
                0
              </span>
            </a>
          </div>

          <button
            type="button"
            aria-label="Menüyü aç"
            onClick={() => setMobileOpen((value) => !value)}
            className="interactive-lift inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/15 md:hidden"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mx-auto mt-3 max-w-6xl rounded-[2rem] border border-[var(--line)] bg-[color:rgba(251,248,242,0.95)] p-4 shadow-[0_24px_90px_rgba(22,25,15,0.12)] backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="interactive-lift rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-medium"
                >
                  {link.label}
                </a>
              ))}
              <MagneticButton href="#satin-al" label="Hemen Satın Al" className="w-full" />
            </div>
          </div>
        )}
      </header>

      <main>
        <section
          id="hero"
          ref={heroRef}
          className="relative flex min-h-[100dvh] overflow-hidden px-0 pt-28 md:pt-32"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(14,18,10,0.48) 0%, rgba(22,30,14,0.58) 26%, rgba(19,22,14,0.72) 58%, rgba(12,14,10,0.86) 100%), url(https://images.unsplash.com/photo-1766928538460-582b563fd89e?auto=format&fit=crop&w=1800&q=80)',
              backgroundPosition: 'center 36%',
              backgroundSize: 'cover',
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(255,255,255,0.12),transparent_26%),radial-gradient(circle_at_center,rgba(0,0,0,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_45%,rgba(0,0,0,0.24)_100%)]" />

          <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col justify-between">
            <div className="flex flex-1 items-center justify-center px-4 md:px-8">
              <div className="flex w-full max-w-5xl flex-col items-center text-center">
                <span className="hero-fade inline-flex rounded-full border border-white/25 bg-white/10 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--accentSoft)] backdrop-blur-sm">
                  Yeni hasat dönemi başladı
                </span>

                <div className="mt-10 max-w-4xl">
                  <h1 className="hero-fade font-dramatic text-[18vw] font-medium leading-[0.92] tracking-[-0.05em] text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.12)] md:text-[6.8rem]">
                    Lezzetin Kökleri
                  </h1>
                  <div className="hero-fade mt-1 font-dramatic text-[16vw] italic leading-[0.9] tracking-[-0.05em] text-white/88 drop-shadow-[0_6px_18px_rgba(0,0,0,0.12)] md:text-[5.8rem]">
                    Toprakta.
                  </div>
                </div>

                <p className="hero-fade mt-10 max-w-3xl text-xl leading-9 text-white/92 md:text-[2rem] md:leading-[1.45]">
                  Yasemin Hanım'dan sofranıza uzanan lezzet yolculuğu.
                  <br className="hidden md:block" />
                  Erken hasat, soğuk sıkım ve yüksek polifenol değerleriyle.
                </p>

                <div className="hero-fade mt-8 flex flex-wrap items-center justify-center gap-3 text-sm font-medium text-[#ef7d55] md:text-base">
                  <span>Erken Hasat</span>
                  <span className="text-[#ef7d55]/70">•</span>
                  <span>Soğuk Sıkım</span>
                  <span className="text-[#ef7d55]/70">•</span>
                  <span>Memecik Zeytini</span>
                </div>
                <div className="hero-fade mt-2 text-sm font-medium text-[#ef7d55] md:text-base">
                  0.1 - 0.3 Asit | Yüksek Polifenol
                </div>

                <div className="hero-fade mt-8 flex flex-col items-center gap-4 sm:flex-row">
                  <a
                    href="#satin-al"
                    className="interactive-lift inline-flex min-w-[240px] items-center justify-center gap-2 rounded-full bg-[#ef6a32] px-8 py-4 text-base font-semibold text-white shadow-[0_18px_40px_rgba(239,106,50,0.28)]"
                  >
                    Zeytinyağlarını Keşfet
                    <ArrowRight size={18} />
                  </a>
                  <div className="rounded-full border border-white/12 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex -space-x-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/25 bg-[#7d5c4d] text-[10px] font-bold text-white">A</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/25 bg-[#556b52] text-[10px] font-bold text-white">M</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/25 bg-[#8a7b68] text-[10px] font-bold text-white">S</span>
                      </div>
                      <div className="text-left">
                        <div className="text-[12px] leading-none text-[#ffd34d]">★★★★★</div>
                        <div className="mt-1 text-[11px] font-medium text-white/85">1500+ Mutlu Müşteri</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hero-fade mt-10 flex flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/78">
                  <span>KAYDIR</span>
                  <span className="h-7 w-px bg-white/35" />
                </div>
              </div>
            </div>

            <div className="hero-fade rounded-t-[2.8rem] border-t border-white/10 bg-[color:rgba(247,242,233,0.98)] px-4 py-6 shadow-[0_-20px_60px_rgba(22,25,15,0.06)] md:px-8">
              <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3 xl:grid-cols-6">
                {commerceHighlights.map((item) => {
                  const Icon = item.icon
                  return (
                    <article
                      key={item.title}
                      className="flex items-center gap-4 rounded-[1.6rem] border border-[var(--line)] bg-white px-4 py-4 shadow-[0_10px_30px_rgba(22,25,15,0.05)]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                        <Icon size={18} />
                      </div>
                      <h3 className="text-sm font-semibold leading-5 text-[var(--primaryDark)] md:text-[15px]">{item.title}</h3>
                    </article>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <section id="seckiler" className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <span className="section-label">Ürün seçkisi</span>
                <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-[var(--primaryDark)] md:text-6xl">
                  Sepete en çok gidenler.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)] md:text-lg">
                  Erken hasat serilerden avantaj paketlerine kadar, en çok tercih edilen ürünleri kaydırarak inceleyin.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollRail('left')}
                  className="interactive-lift inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--primaryDark)] shadow-[0_10px_30px_rgba(22,25,15,0.06)]"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollRail('right')}
                  className="interactive-lift inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--primaryDark)] text-white shadow-[0_10px_30px_rgba(22,25,15,0.1)]"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div
              ref={railRef}
              data-reveal
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {productRail.map((product) => (
                <article
                  key={product.name}
                  className="min-w-[82vw] snap-start rounded-[2.2rem] border border-[var(--line)] bg-white p-4 shadow-[0_24px_80px_rgba(22,25,15,0.08)] sm:min-w-[360px] md:min-w-[380px]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--primaryDark)]">
                      {product.badge}
                    </span>
                    <a
                      href={product.href}
                      className="interactive-lift inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-[var(--primaryDark)]"
                    >
                      <ArrowRight size={16} />
                    </a>
                  </div>

                  <div className="mt-4 rounded-[1.8rem] bg-[var(--surface)] p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-64 w-full rounded-[1.5rem] object-contain"
                    />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-2xl font-semibold leading-tight tracking-[-0.04em] text-[var(--primaryDark)]">
                      {product.name}
                    </h3>
                    <div className="mt-4 flex items-end gap-3">
                      <div className="font-mono text-3xl text-[var(--primaryDark)]">{product.price}</div>
                      {product.oldPrice && (
                        <div className="font-mono text-sm text-[var(--muted)] line-through">{product.oldPrice}</div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={product.href}
                      className="interactive-lift inline-flex flex-1 items-center justify-center rounded-full bg-[var(--primaryDark)] px-5 py-3 text-sm font-semibold text-white"
                    >
                      Ürünü incele
                    </a>
                    <a
                      href={product.href}
                      className="interactive-lift inline-flex items-center justify-center rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--primaryDark)]"
                    >
                      Detay
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-24">
          <div
            data-reveal
            className="mx-auto grid max-w-6xl overflow-hidden rounded-[3rem] border border-[var(--line)] bg-[linear-gradient(135deg,#32452f_0%,#425641_55%,#544937_100%)] text-white md:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="relative p-6 md:p-10">
              <div className="absolute right-6 top-6 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--accent)] text-center text-sm font-semibold uppercase tracking-[0.08em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.2)]">
                {bundleOffer.discount}
                <br />
                avantaj
              </div>
              <div className="max-w-xl">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/78">
                  Haftanın avantajı
                </span>
                <h2 className="mt-6 font-dramatic text-5xl italic leading-[0.95] tracking-[-0.04em] md:text-6xl">
                  {bundleOffer.title}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-7 text-white/80 md:text-lg">
                  Düzenli kullanan, bir kez alıp uzun süre rahat etmek isteyenler için en güçlü fiyat avantajı.
                </p>
                <div className="mt-6 flex items-end gap-3">
                  <div className="font-mono text-lg text-white/48 line-through">{bundleOffer.oldPrice}</div>
                  <div className="font-mono text-4xl text-[var(--accentSoft)]">{bundleOffer.price}</div>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {bundleOffer.perks.map((perk) => (
                    <span key={perk} className="rounded-full border border-white/12 bg-white/8 px-3 py-1 text-xs font-medium text-white">
                      {perk}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <MagneticButton href={bundleOffer.href} label="Paketi incele" inverse />
                  <a
                    href="#protokol"
                    className="interactive-lift inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white/88"
                  >
                    Hangi paket bana uygun?
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>

            <div className="relative min-h-[320px] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_58%)] p-6 md:p-10">
              <div className="h-full rounded-[2.4rem] border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
                <img
                  src={bundleOffer.image}
                  alt={bundleOffer.title}
                  className="h-full w-full rounded-[2rem] object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[linear-gradient(180deg,#263008_0%,#1d2405_100%)] text-white shadow-[0_28px_120px_rgba(22,25,15,0.14)]">
            <div className="border-b border-white/8 px-6 py-14 md:px-10">
              <div data-reveal className="mb-10 max-w-3xl rounded-[2.2rem] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-sm md:p-8">
                <span className="section-label border-white/20 bg-white/12 text-white">Neden Yasemin Hanım?</span>
                <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-white drop-shadow-[0_10px_28px_rgba(0,0,0,0.24)] md:text-6xl">
                  İlk siparişi verdiren şey meraksa, ikinci siparişi verdiren şey kalitedir.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/84 md:text-lg">
                  Ürün karakteri, şeffaf üretim dili ve tekrar sipariş verdiren kalite hissi aynı yerde buluşur.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {trustFeatures.map((item) => (
                  <article
                    key={item.title}
                    data-reveal
                    className="rounded-[1.8rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accentSoft)]/16 text-[var(--accentSoft)]">
                      <Check size={16} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/84">{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-10 bg-[var(--surface)] px-6 py-14 text-[var(--ink)] md:grid-cols-[0.9fr_1.1fr] md:px-10">
              <div data-reveal>
                <span className="section-label">Analiz ve güven</span>
                <h3 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.04em] text-[var(--primaryDark)]">
                  Kâğıt üstündeki veriler de, şişedeki kaliteyi desteklesin.
                </h3>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {labMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-[1.5rem] border border-[var(--line)] bg-white px-4 py-5 text-center shadow-[0_10px_30px_rgba(22,25,15,0.05)]">
                      <div className="font-mono text-3xl text-[var(--primaryDark)]">{metric.value}</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{metric.label}</div>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 grid gap-3 text-sm leading-6 text-[var(--muted)]">
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--primary)]">
                      <Check size={14} />
                    </span>
                    Laboratuvar verileri ürün kalitesini destekler.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--primary)]">
                      <Check size={14} />
                    </span>
                    Düşük asit ve polifenol bilgisi seçim yapmayı kolaylaştırır.
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)]/15 text-[var(--primary)]">
                      <Check size={14} />
                    </span>
                    Teknik detay, ürünün gerçekten ne sunduğunu açıkça gösterir.
                  </li>
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://yaseminhanim.com/analiz-raporu"
                    className="interactive-lift inline-flex items-center justify-center gap-2 rounded-full bg-[var(--primaryDark)] px-5 py-3 text-sm font-semibold text-white"
                  >
                    <FileText size={16} />
                    Analiz detayını gör
                  </a>
                  <a
                    href="#protokol"
                    className="interactive-lift inline-flex items-center justify-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--primaryDark)]"
                  >
                    <PlayCircle size={16} />
                    Üretimi incele
                  </a>
                </div>
              </div>

              <div data-reveal className="flex items-center justify-center">
                <div className="relative w-full max-w-xl rounded-[2.5rem] border border-[var(--line)] bg-[var(--bg)] p-5 shadow-[0_24px_80px_rgba(22,25,15,0.08)]">
                  <div className="absolute -left-2 top-10 hidden h-20 w-20 rounded-full bg-[var(--accentSoft)]/30 blur-3xl md:block" />
                  <div className="absolute -right-2 bottom-10 hidden h-20 w-20 rounded-full bg-[var(--accent)]/20 blur-3xl md:block" />
                  <div className="rotate-[-3deg] rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_18px_50px_rgba(22,25,15,0.08)]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">Onaylı laboratuvar</div>
                        <div className="mt-2 text-2xl font-semibold text-[var(--primaryDark)]">Uluslararası akreditasyon</div>
                      </div>
                      <ShieldCheck className="text-[var(--primary)]" size={24} />
                    </div>
                    <div className="mt-8 grid gap-4 text-sm text-[var(--muted)]">
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                        <span>Numune</span>
                        <span className="font-mono text-[var(--primaryDark)]">Memecik / 2025</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                        <span>Lot No</span>
                        <span className="font-mono text-[var(--primaryDark)]">YH-2025-01</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
                        <span>Durum</span>
                        <span className="rounded-full bg-[#72c02c]/15 px-3 py-1 font-mono text-xs uppercase tracking-[0.16em] text-[#4d8d15]">Geçerli</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Yorum</span>
                        <span className="font-mono text-[var(--primaryDark)]">Kusursuz</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-24">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-[linear-gradient(135deg,#2f4a12_0%,#436417_45%,#5a7f1f_100%)] text-white shadow-[0_28px_120px_rgba(22,25,15,0.14)]">
            <div className="px-6 py-14 md:px-10">
              <div data-reveal className="mb-10 text-center">
                <span className="section-label border-white/18 bg-white/12 text-white">Nasıl üretiyoruz?</span>
                <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.16)] md:text-6xl">
                  Bahçeden sofraya uzanan üretim akışı.
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-white/86 md:text-lg">
                  Hasat zamanından sıkıma, analizden paketlemeye kadar her adım kontrollü ve temiz ilerler.
                </p>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr_1fr]">
                <div className="grid gap-4">
                  {productionSteps.slice(0, 3).map((item) => (
                    <article
                      key={item.step}
                      data-reveal
                      className="flex items-stretch overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/14 backdrop-blur-sm"
                    >
                      <div className="flex-1 p-5">
                        <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/88">{item.text}</p>
                      </div>
                      <div className="flex w-24 items-center justify-center bg-black/18 text-5xl font-bold text-white">
                        {item.step}
                      </div>
                    </article>
                  ))}
                </div>

                <div data-reveal className="flex items-center justify-center">
                  <div className="relative flex h-full min-h-[420px] w-full items-center justify-center rounded-[2.4rem] border border-white/14 bg-[radial-gradient(circle_at_center,rgba(239,247,182,0.16),transparent_34%),rgba(255,255,255,0.08)] p-6 backdrop-blur-sm">
                    <div className="absolute inset-8 rounded-full border border-white/18" />
                    <div className="absolute inset-[22%] rounded-full border border-white/12" />
                    <img
                      src="https://images.unsplash.com/photo-1684331733995-b0c69118251a?auto=format&fit=crop&w=1200&q=80"
                      alt="Zeytin dalı ve meyveler"
                      className="relative z-10 h-[300px] w-[300px] rounded-full object-cover shadow-[0_24px_70px_rgba(0,0,0,0.24)]"
                    />
                  </div>
                </div>

                <div className="grid gap-4">
                  {productionSteps.slice(3).map((item) => (
                    <article
                      key={item.step}
                      data-reveal
                      className="flex items-stretch overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/14 backdrop-blur-sm"
                    >
                      <div className="flex-1 p-5">
                        <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-white/88">{item.text}</p>
                      </div>
                      <div className="flex w-24 items-center justify-center bg-black/18 text-5xl font-bold text-white">
                        {item.step}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 md:px-8 md:pb-24">
          <div className="mx-auto grid max-w-6xl gap-8 overflow-hidden rounded-[3rem] border border-[var(--line)] bg-[linear-gradient(135deg,#fbf8f2_0%,#f1ecdf_100%)] p-6 shadow-[0_28px_120px_rgba(22,25,15,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div data-reveal className="flex flex-col justify-center">
              <span className="section-label">Türkiye geneline ulaşıyoruz</span>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-[var(--primaryDark)] md:text-6xl">
                Sadece bir bölgeye değil, Türkiye'nin dört bir yanındaki sofralara gidiyoruz.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] md:text-lg">
                Şehir adı ezberletmeden, ülke genelinde tercih edilen ve güvenle sipariş verilen bir marka algısını öne çıkarıyoruz.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {nationalReachStats.map((item) => (
                  <article
                    key={item.value}
                    className="rounded-[1.8rem] border border-[var(--line)] bg-white px-4 py-5 shadow-[0_10px_30px_rgba(22,25,15,0.05)]"
                  >
                    <div className="font-mono text-2xl text-[var(--primaryDark)]">{item.value}</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.label}</p>
                  </article>
                ))}
              </div>

              <a
                href="https://yaseminhanim.com/urunler"
                className="interactive-lift mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[var(--primaryDark)] px-6 py-3 text-sm font-semibold text-white"
              >
                Tüm ürünleri incele
                <ArrowRight size={16} />
              </a>
            </div>

            <div data-reveal className="relative min-h-[360px] rounded-[2.5rem] bg-[linear-gradient(180deg,#334614_0%,#232f0d_100%)] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(204,247,8,0.18),transparent_26%),radial-gradient(circle_at_70%_72%,rgba(255,255,255,0.08),transparent_24%)]" />
              <div className="relative flex h-full items-center justify-center">
                <img
                  src="https://raw.githubusercontent.com/ali-han/Turkey-SVG-Map/main/src/turkey.svg"
                  alt="Türkiye geneline dağıtım ağı"
                  className="w-full max-w-[680px] opacity-90 [filter:brightness(0)_saturate(100%)_invert(86%)_sepia(22%)_saturate(748%)_hue-rotate(33deg)_brightness(92%)_contrast(90%)]"
                />

                <div className="absolute left-3 top-4 rounded-full border border-white/12 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/92 backdrop-blur-sm md:left-6 md:top-6">
                  <MapPinned size={14} className="mr-2 inline-flex" />
                  Türkiye geneli teslimat
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center gap-2 md:bottom-6 md:left-6 md:right-6">
                  {nationalReachSignals.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 bg-white/10 px-3 py-2 text-xs font-medium text-white/90 backdrop-blur-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="yorumlar" className="px-4 pb-20 md:px-8 md:pb-24">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-10 text-center">
              <span className="section-label">Müşteri yorumları</span>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-[var(--primaryDark)] md:text-6xl">
                Sofraya girdikten sonra ne hissettirdiğini kullanıcı söyler.
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {testimonials.map((item) => (
                <article
                  key={item.name}
                  data-reveal
                  className="rounded-[2rem] border border-[var(--line)] bg-white p-6 shadow-[0_18px_60px_rgba(22,25,15,0.06)]"
                >
                  <div className="mb-4 flex gap-1 text-[#e0a800]">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>★</span>
                    ))}
                  </div>
                  <p className="text-base leading-7 text-[var(--muted)]">"{item.quote}"</p>
                  <div className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primaryDark)]">
                    {item.name}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="felsefe" ref={manifestoRef} className="relative overflow-hidden bg-[var(--primaryDark)] px-4 py-24 text-white md:px-8 md:py-32">
          <div
            ref={manifestoTextureRef}
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(8,10,6,0.5), rgba(8,10,6,0.9)), url(https://images.unsplash.com/photo-1765351521283-653f5097c383?auto=format&fit=crop&w=1800&q=80)',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl">
            <div data-reveal className="max-w-4xl rounded-[2.4rem] border border-white/10 bg-black/18 p-6 backdrop-blur-sm md:p-8">
              <span className="section-label border-white/20 bg-white/12 text-white">Mutfakta kullanım</span>
              <p className="mt-6 text-lg leading-8 text-white/92 md:text-2xl">
                {manifestoSmall}
              </p>
              <h2 className="mt-8 font-dramatic text-5xl italic leading-[0.98] tracking-[-0.04em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.2)] md:text-[5.5rem]">
                {manifestoLarge}
              </h2>
            </div>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {usageAreas.map((item) => (
                <article
                  key={item.title}
                  data-reveal
                  className="overflow-hidden rounded-[2.2rem] border border-white/14 bg-black/16 backdrop-blur-sm"
                >
                  <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                  <div className="p-6">
                    <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/90">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="protokol" className="px-4 py-20 md:px-8 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-12 max-w-4xl">
                <span className="section-label">Paket karşılaştırma</span>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-[var(--primaryDark)] md:text-6xl">
                  Ev için mi, stok için mi, en iyi seçim burada.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg">
                  Tekli kullanım, güçlü aroma arayanlar ve toplu alışveriş yapanlar için doğru seçeneği yan yana görün.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {compareOptions.map((option) => (
                <article
                  key={option.title}
                  data-reveal
                  className={`rounded-[2.6rem] border p-6 shadow-[0_24px_80px_rgba(22,25,15,0.08)] ${option.featured ? 'border-[var(--primary)] bg-[var(--primaryDark)] text-white ring-1 ring-[var(--accent)]/35' : 'border-[var(--line)] bg-white text-[var(--ink)]'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${option.featured ? 'bg-white/10 text-white/88' : 'bg-[var(--bg)] text-[var(--primaryDark)]'}`}>
                      {option.label}
                    </span>
                    <span className={`text-xs font-medium ${option.featured ? 'text-[var(--accentSoft)]' : 'text-[var(--accent)]'}`}>
                      {option.audience}
                    </span>
                  </div>

                  <div className={`mt-6 rounded-[2rem] p-4 ${option.featured ? 'bg-white/6' : 'bg-[var(--surface)]'}`}>
                    <img
                      src={option.image}
                      alt={option.title}
                      className="h-56 w-full rounded-[1.6rem] object-contain"
                    />
                  </div>

                  <div className="mt-6">
                    <h3 className="text-3xl font-semibold tracking-[-0.04em]">{option.title}</h3>
                    <p className={`mt-3 text-sm leading-6 ${option.featured ? 'text-white/82' : 'text-[var(--muted)]'}`}>
                      {option.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-end gap-3">
                    <div className="font-mono text-3xl">{option.price}</div>
                    <div className={`font-mono text-sm line-through ${option.featured ? 'text-white/55' : 'text-[var(--muted)]'}`}>{option.oldPrice}</div>
                  </div>

                  <div className="mt-5 grid gap-2">
                    {option.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className={`flex items-center gap-3 rounded-full px-3 py-2 text-sm ${option.featured ? 'bg-white/8 text-white' : 'bg-[var(--bg)] text-[var(--primaryDark)]'}`}
                      >
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full ${option.featured ? 'bg-white/10 text-[var(--accentSoft)]' : 'bg-[var(--accent)]/15 text-[var(--primary)]'}`}>
                          <Check size={14} />
                        </span>
                        {bullet}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <MagneticButton
                      href={option.href}
                      label={option.featured ? 'Bu ürünü seç' : 'Ürünü incele'}
                      inverse={option.featured}
                      className="w-full"
                    />
                  </div>
                </article>
              ))}
            </div>

            <div
              data-reveal
              className="mt-8 flex flex-wrap items-center gap-3 rounded-[2rem] border border-[var(--line)] bg-[var(--surface)] p-5"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--primaryDark)]">
                Alışveriş güvencesi
              </span>
              {purchaseTrustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-medium text-[var(--primaryDark)]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="satin-al" className="px-4 pb-20 md:px-8 md:pb-28">
          <div className="mx-auto max-w-6xl">
            <div data-reveal className="mb-12 max-w-4xl">
              <span className="section-label">Zeytinyağı rehberi</span>
              <h2 className="mt-5 font-heading text-4xl font-semibold tracking-[-0.05em] text-[var(--primaryDark)] md:text-6xl">
                Almadan önce bilinmesi iyi olur.
              </h2>
              <p className="mt-5 max-w-3xl text-base leading-7 text-[var(--muted)] md:text-lg">
                Erken hasat, polifenol ve kullanım farklarını bilmek, doğru ürünü daha hızlı seçtirir.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {guideCards.map((item) => (
                <article
                  key={item.title}
                  data-reveal
                  className="rounded-[2.2rem] border border-[var(--line)] bg-white p-6 shadow-[0_18px_60px_rgba(22,25,15,0.06)]"
                >
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Rehber</div>
                  <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--primaryDark)]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{item.description}</p>
                  <a
                    href={item.href}
                    className="interactive-lift mt-8 inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--primaryDark)]"
                  >
                    Devamını oku
                    <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>

            <div
              data-reveal
              className="mt-10 flex flex-col items-start justify-between gap-5 rounded-[2.5rem] border border-[var(--primary)] bg-[var(--primaryDark)] p-6 text-white md:flex-row md:items-center md:p-8"
            >
              <div>
                <div className="font-mono text-xs uppercase tracking-[0.3em] text-[var(--accentSoft)]">Mağazaya geç</div>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  Tüm ürünleri açın, size uygun olanı şimdi seçin.
                </h3>
              </div>
              <MagneticButton href="https://yaseminhanim.com/urunler" label="Tüm ürünleri gör" inverse />
            </div>
          </div>
        </section>
      </main>

      <footer id="footer" className="rounded-t-[4rem] bg-[var(--primaryDark)] px-4 py-14 text-white md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <div className="text-sm uppercase tracking-[0.28em] text-white/68">Yasemin Hanım</div>
            <h3 className="mt-4 font-heading text-3xl font-semibold tracking-[-0.04em]">
              Memecik zeytininden sofraya uzanan sade, güvenilir ve tekrar sipariş verdiren bir lezzet deneyimi.
            </h3>
            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/8 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-white/86">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#72c02c] opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#72c02c]" />
              </span>
              Siparişe Hazır
            </div>
          </div>

          <div className="grid gap-3 text-sm text-white/86">
            <div className="font-semibold uppercase tracking-[0.18em] text-white">Navigasyon</div>
            <a href="#hero" className="interactive-lift">Açılış</a>
            <a href="#seckiler" className="interactive-lift">Ürünler</a>
            <a href="#felsefe" className="interactive-lift">Kullanım</a>
            <a href="#protokol" className="interactive-lift">Karşılaştırma</a>
          </div>

          <div className="grid gap-3 text-sm text-white/86">
            <div className="font-semibold uppercase tracking-[0.18em] text-white">Bağlantılar</div>
            <a href="https://yaseminhanim.com/urunler" className="interactive-lift">Ürünler</a>
            <a href="https://yaseminhanim.com/iletisim" className="interactive-lift">İletişim</a>
            <a href="https://yaseminhanim.com/uye-ol" className="interactive-lift">Üyelik</a>
            <a href="https://yaseminhanim.com/" className="interactive-lift">Resmi mağaza</a>
          </div>

          <div className="grid gap-3 text-sm text-white/86">
            <div className="font-semibold uppercase tracking-[0.18em] text-white">Müşteri Hizmetleri</div>
            {serviceLinks.map((item) => (
              <span key={item} className="interactive-lift">{item}</span>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a
          href="https://yaseminhanim.com/urunler"
          className="interactive-lift flex items-center justify-between rounded-full bg-[var(--primaryDark)] px-5 py-4 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(22,25,15,0.25)]"
        >
          <span>Tüm ürünleri aç</span>
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
            <ArrowRight size={16} />
          </span>
        </a>
      </div>
    </div>
  )
}

export default App
