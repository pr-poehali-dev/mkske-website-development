import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const IMG_WELD = 'https://cdn.poehali.dev/projects/178f5995-21aa-45a7-bbea-539cff846d0a/files/fa11bc73-ee62-44b1-a9bb-51d583ffaaa9.jpg';
const IMG_TOWER = 'https://cdn.poehali.dev/projects/178f5995-21aa-45a7-bbea-539cff846d0a/files/2bafc211-3039-45bf-9bbb-f6869299fbfd.jpg';
const IMG_PLASMA = 'https://cdn.poehali.dev/projects/178f5995-21aa-45a7-bbea-539cff846d0a/files/468575fb-5f9f-4cf9-ad83-567a2ec35f83.jpg';

const nav = [
  { label: 'О нас', id: 'about' },
  { label: 'Продукция', id: 'products' },
  { label: 'Оборудование', id: 'equipment' },
  { label: 'Цикл', id: 'cycle' },
  { label: 'Фундаменты', id: 'foundations' },
  { label: 'Галерея', id: 'gallery' },
  { label: 'Контакты', id: 'contacts' },
];

const stats = [
  { value: '220+', label: 'тонн / мес' },
  { value: '2600', label: 'м² цеха' },
  { value: '60+', label: 'единиц техники' },
  { value: '2000+', label: 'изделий / год' },
];

const products = [
  { title: 'Опоры', icon: 'RadioTower', desc: 'Опоры связи любой высоты и конфигурации' },
  { title: 'Башни', icon: 'Building2', desc: 'Антенно-мачтовые сооружения' },
  { title: 'Надстройки на СК-26', icon: 'Layers', desc: 'Модернизация существующих объектов' },
  { title: 'БВЗ и модули', icon: 'Box', desc: 'Блочно-возводимые здания и модули' },
  { title: 'ЗДФ, АК', icon: 'Anchor', desc: 'Закладные детали и арматурные каркасы' },
  { title: 'Эстакады', icon: 'GitCommitHorizontal', desc: 'Технологические эстакады и переходы' },
];

const cycle = [
  { n: '01', title: 'Консультация', icon: 'MessageSquare' },
  { n: '02', title: 'Коммерческое предложение', icon: 'FileText' },
  { n: '03', title: 'Проектирование', icon: 'PenTool' },
  { n: '04', title: 'Раскрой и плазменная резка', icon: 'Scissors' },
  { n: '05', title: 'Лазерная очистка', icon: 'Sparkles' },
  { n: '06', title: 'Сварка и мехобработка', icon: 'Flame' },
  { n: '07', title: 'Контроль и сборка', icon: 'CheckCircle2' },
  { n: '08', title: 'Отгрузка и логистика', icon: 'Truck' },
];

const equipment = [
  {
    title: 'Плазменная резка металла',
    desc: 'Термический раскрой струёй плазмы с температурой до 30 000°C. Идеальная точность реза.',
    img: IMG_PLASMA,
    tag: '30 000°C',
  },
  {
    title: 'Лазерная очистка металла',
    desc: 'Бесконтактное удаление загрязнений лазерным излучением. Экологично и без абразива.',
    img: IMG_WELD,
    tag: 'Лазер',
  },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const { ref, visible } = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
    >
      {children}
    </section>
  );
}

const TYPE_TEXT = 'МК СКЭ';

export default function Index() {
  const [scrolled, setScrolled] = useState(false);
  const [typed, setTyped] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let i = 0;
    const t = setInterval(() => {
      setTyped(TYPE_TEXT.slice(0, i + 1));
      i++;
      if (i >= TYPE_TEXT.length) clearInterval(t);
    }, 180);
    return () => clearInterval(t);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Заявка отправлена',
      description: 'Наш инженер свяжется с вами в ближайшее время для расчёта стоимости.',
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HEADER */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="font-display text-2xl font-bold tracking-widest text-gradient-copper glow-text">
            МК&nbsp;СКЭ
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {nav.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className="text-sm font-medium text-muted-foreground hover:text-copper-light transition-colors relative group"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-copper group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Button
              onClick={() => scrollTo('contacts')}
              className="hidden sm:flex bg-gradient-to-r from-copper to-copper-light text-white font-semibold animate-pulse-glow border-0 hover:opacity-90"
            >
              Связаться
            </Button>
            <button className="lg:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
              <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden glass mt-3 mx-4 rounded-xl p-4 flex flex-col gap-3">
            {nav.map((n) => (
              <button key={n.id} onClick={() => scrollTo(n.id)} className="text-left py-2 text-muted-foreground hover:text-copper-light">
                {n.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMG_WELD} alt="Сварка металлоконструкций" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-xs font-medium text-teal tracking-wide">ЗАВОД ПОЛНОГО ЦИКЛА · ОРЕНБУРГ</span>
          </div>
          <h1 className="font-display font-bold text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6">
            <span className="text-gradient-copper glow-text">{typed}</span>
            <span className="animate-blink border-r-4 border-copper ml-2" />
          </h1>
          <p className="text-lg md:text-2xl text-foreground/90 font-light max-w-2xl mx-auto mb-10 font-display tracking-wide">
            Мы делаем опоры.<br className="md:hidden" /> Мы производим металлоконструкции.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => scrollTo('contacts')}
              size="lg"
              className="bg-gradient-to-r from-copper to-gold text-white font-semibold text-base px-8 py-6 glow-copper border-0 hover:scale-105 transition-transform"
            >
              <Icon name="Calculator" size={20} className="mr-2" />
              Запросить расчёт
            </Button>
            <Button
              onClick={() => scrollTo('about')}
              size="lg"
              variant="outline"
              className="glass border-teal/40 text-foreground font-medium text-base px-8 py-6 hover:border-teal hover:text-teal transition-colors"
            >
              О компании
            </Button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted-foreground tracking-widest">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-copper to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <Section className="py-16 border-y border-border/40">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="glass rounded-2xl p-8 text-center card-hover shine">
              <div className="font-display font-bold text-4xl md:text-5xl text-gradient-copper mb-2">{s.value}</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* ABOUT */}
      <Section id="about" className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden card-hover glow-copper group">
            <img src={IMG_TOWER} alt="Цех МК СКЭ" className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-6 left-6 glass rounded-xl px-4 py-3">
              <div className="text-teal font-display font-semibold text-lg">2600 м²</div>
              <div className="text-xs text-muted-foreground">производственная площадь</div>
            </div>
          </div>
          <div>
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">О компании</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl mb-6 leading-tight">
              Завод металлоконструкций <span className="text-gradient-copper">полного цикла</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ООО «МК СКЭ» проектирует, изготавливает и монтирует металлоконструкции для связи по всей России. <span className="text-copper-light font-medium">Без посредников.</span> Мы делаем опоры — надёжные, современные, проверенные временем.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Наша команда — инженеры, сварщики, проектировщики и технологи с многолетним опытом. Мы контролируем каждый этап: от чертежа до отгрузки. Работаем с крупнейшими операторами связи и промышленными предприятиями.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Проектирование', 'Изготовление', 'Монтаж', 'Контроль качества'].map((t) => (
                <span key={t} className="glass rounded-full px-4 py-2 text-sm text-foreground/80 border border-teal/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* PRODUCTS */}
      <Section id="products" className="py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">Продукция</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl">Что мы <span className="text-gradient-copper">производим</span></h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div key={i} className="glass rounded-2xl p-8 card-hover shine group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-copper/20 to-teal/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon name={p.icon} size={28} className="text-copper-light" />
                </div>
                <h3 className="font-display font-semibold text-2xl mb-2">{p.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* EQUIPMENT */}
      <Section id="equipment" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">Оборудование</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl">Собственное <span className="text-gradient-copper">производство</span></h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {equipment.map((e, i) => (
              <div key={i} className="relative rounded-3xl overflow-hidden card-hover group h-[380px]">
                <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                <div className="absolute top-6 right-6 glass rounded-full px-4 py-1.5 text-teal text-sm font-semibold border border-teal/30">
                  {e.tag}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="font-display font-semibold text-2xl md:text-3xl mb-2">{e.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-md">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CYCLE */}
      <Section id="cycle" className="py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">От идеи до объекта</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl">Полный <span className="text-gradient-copper">цикл</span> работ</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cycle.map((c, i) => (
              <div key={i} className="glass rounded-2xl p-6 card-hover shine group">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-display font-bold text-3xl text-copper/40 group-hover:text-copper transition-colors">{c.n}</span>
                  <Icon name={c.icon} size={24} className="text-teal group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="font-display font-medium text-lg leading-snug">{c.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FOUNDATIONS */}
      <Section id="foundations" className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">Фундаменты</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl mb-6 leading-tight">
              Надёжное <span className="text-gradient-copper">основание</span> для любого объекта
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Надёжное и долговечное решение для строительства фундаментов. Высокое качество материалов и исполнения на каждом этапе.
            </p>
            <div className="space-y-4">
              {['Закладные детали фундамента', 'Арматурные каркасы', 'Контроль качества материалов'].map((t) => (
                <div key={t} className="flex items-center gap-3 glass rounded-xl px-5 py-4 card-hover">
                  <div className="w-10 h-10 rounded-lg bg-copper/20 flex items-center justify-center shrink-0">
                    <Icon name="CheckCircle2" size={20} className="text-copper-light" />
                  </div>
                  <span className="text-foreground/90 font-medium">{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden card-hover group">
            <img src={IMG_TOWER} alt="Фундаменты" className="w-full h-[440px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </div>
      </Section>

      {/* GALLERY */}
      <Section id="gallery" className="py-24 bg-gradient-to-b from-transparent via-secondary/20 to-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">Галерея</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl">Наши <span className="text-gradient-copper">объекты</span></h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[IMG_TOWER, IMG_WELD, IMG_PLASMA, IMG_WELD, IMG_PLASMA, IMG_TOWER, IMG_WELD, IMG_TOWER].map((img, i) => (
              <div key={i} className={`rounded-2xl overflow-hidden card-hover group ${i % 3 === 0 ? 'row-span-2' : ''}`}>
                <img
                  src={img}
                  alt={`Объект ${i + 1}`}
                  className={`w-full object-cover group-hover:scale-110 transition-transform duration-700 ${i % 3 === 0 ? 'h-full min-h-[300px]' : 'h-40'} ${i % 2 === 0 ? '' : 'grayscale group-hover:grayscale-0'}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-8">
            <span className="text-muted-foreground text-sm">Нам доверяют:</span>
            {['Антарес', 'ПБК', 'МИГ', 'КВАНТ-ТЕЛЕКОМ', 'Медиа-Ас', 'СТАЛЬТЕХ', 'Связьразвитие'].map((c) => (
              <span key={c} className="font-display font-medium text-foreground/50 hover:text-teal transition-colors tracking-wide">{c}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS + CALC FORM */}
      <Section id="contacts" className="py-24">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
          <div>
            <div className="text-teal font-medium text-sm tracking-widest mb-3 uppercase">Контакты</div>
            <h2 className="font-display font-semibold text-4xl md:text-5xl mb-8 leading-tight">
              Запросить <span className="text-gradient-copper">расчёт стоимости</span>
            </h2>
            <div className="space-y-5">
              {[
                { icon: 'Phone', label: 'Телефон', value: '8 (800) 101-56-00', href: 'tel:88001015600' },
                { icon: 'Mail', label: 'Email', value: 'mkske@mkske.ru', href: 'mailto:mkske@mkske.ru' },
                { icon: 'MapPin', label: 'Адрес', value: 'Оренбург, ул. Донгузская, 68', href: '' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4 glass rounded-2xl p-5 card-hover">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-copper/20 to-teal/10 flex items-center justify-center shrink-0">
                    <Icon name={c.icon} size={22} className="text-copper-light" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} className="font-display font-medium text-lg hover:text-teal transition-colors">{c.value}</a>
                    ) : (
                      <div className="font-display font-medium text-lg">{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-6">
              <Button variant="outline" className="glass border-teal/30 hover:border-teal flex-1">
                <Icon name="MessageCircle" size={18} className="mr-2 text-teal" /> WhatsApp
              </Button>
              <Button variant="outline" className="glass border-teal/30 hover:border-teal flex-1">
                <Icon name="Send" size={18} className="mr-2 text-teal" /> Telegram
              </Button>
            </div>
          </div>

          <form onSubmit={submitForm} className="glass rounded-3xl p-8 glow-copper">
            <h3 className="font-display font-semibold text-2xl mb-6">Расчёт металлоконструкций</h3>
            <div className="space-y-4">
              <Input required placeholder="Ваше имя" className="bg-secondary/50 border-border h-12" />
              <Input required type="tel" placeholder="Телефон" className="bg-secondary/50 border-border h-12" />
              <Input type="email" placeholder="Email" className="bg-secondary/50 border-border h-12" />
              <Textarea placeholder="Опишите задачу: тип конструкции, объём, сроки..." className="bg-secondary/50 border-border min-h-28" />
              <label className="flex items-center gap-3 glass rounded-xl px-4 py-3 cursor-pointer border border-dashed border-border hover:border-teal/50 transition-colors">
                <Icon name="Paperclip" size={18} className="text-teal" />
                <span className="text-sm text-muted-foreground">Прикрепить чертёж или ТЗ</span>
                <input type="file" className="hidden" />
              </label>
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-copper to-gold text-white font-semibold text-base py-6 glow-copper border-0 hover:scale-[1.02] transition-transform"
              >
                <Icon name="Calculator" size={20} className="mr-2" />
                Получить расчёт
              </Button>
            </div>
          </form>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-border/40 py-12 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-display font-bold text-2xl tracking-widest text-gradient-copper mb-2">МК СКЭ</div>
              <p className="text-sm text-muted-foreground max-w-xs">Завод металлоконструкций полного цикла. Без посредников. Только качество.</p>
            </div>
            <nav className="flex flex-wrap gap-4 justify-center">
              {nav.map((n) => (
                <button key={n.id} onClick={() => scrollTo(n.id)} className="text-sm text-muted-foreground hover:text-copper-light transition-colors">
                  {n.label}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
            <span>© 2026 ООО «МК СКЭ». Все права защищены.</span>
            <span className="flex items-center gap-2">Сделано в России <span className="text-copper">🇷🇺</span></span>
          </div>
        </div>
      </footer>
    </div>
  );
}
