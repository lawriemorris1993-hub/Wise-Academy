import React, { useState, useEffect } from "react";
import StIgnatius from '/assets/.aistudio/St-Ignatius-College.webp';
import { motion, AnimatePresence } from "motion/react";
import { 
  GraduationCap, 
  MapPin, 
  Phone, 
  Menu, 
  X, F
  Check, 
  Sparkles,
  ArrowUpRight
} from "lucide-react";

// List of exact ZIMSEC subjects requested
const SUBJECTS = [
  "Mathematics", "English Language", "English Literature", "History", "Geography", 
  "Combined Science", "Physics", "Chemistry", "Biology", "Agriculture", 
  "Accounts", "Economics", "Business Studies", "Commerce", "Computer Science", 
  "Sociology", "Fashion and Fabrics", "Food and Nutrition", "Art", "Music", 
  "Physical Education", "Statistics", "Further Mathematics", "Advanced Level Mathematics", 
  "Advanced Level Economics", "Advanced Level Accounting", "Advanced Level Business Studies", 
  "Advanced Level History", "Advanced Level Geography", "Advanced Level Biology", 
  "Advanced Level Chemistry", "Advanced Level Physics"
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Track scroll position to update active navbar item
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "programs", "subjects", "wisa", "pricing", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Custom WhatsApp link generator for standard use
  const whatsappUrl = "https://wa.me/263775939333";

  return (
    <div className="text-slate-800 font-sans selection:bg-[#FACC15] selection:text-[#166534] min-h-screen flex flex-col
      style={{
       backgroundImage:`url(${StIgnatius})`'
       backgroundsize: "cover",
       backgroundPosition: "center",
       backgroundRepeat: "no-repeat"
      }}
    >
      
      {/* SECTION 1 — NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#166534]/80 border-b border-green-800 shadow-md backdrop-blur-md transition-all duration-300">
        <div id="nav-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div 
              onClick={() => handleNavClick("home")} 
              className="flex items-center space-x-2.5 cursor-pointer group"
              id="navbar-logo"
            >
              <div className="bg-[#FACC15] p-2 rounded-xl text-[#166534] group-hover:rotate-6 transition-transform duration-300 shadow-md flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
              <span className="font-display font-extrabold text-lg sm:text-xl text-white tracking-tight uppercase">
                Wise Academy
              </span>
            </div>

            {/* Desktop Navigation Link Tabs */}
            <div id="desktop-nav-links" className="hidden md:flex items-center space-x-1">
              {[
                { name: "Home", id: "home" },
                { name: "Programs", id: "programs" },
                { name: "Subjects", id: "subjects" },
                { name: "WISA Project", id: "wisa" },
                { name: "Pricing", id: "pricing" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs lg:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    activeSection === item.id
                      ? "bg-white/10 text-[#FACC15]"
                      : "text-green-50 hover:text-[#FACC15] hover:bg-white/5"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* WhatsApp Button (Top Right) */}
            <div className="hidden sm:block">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                id="btn-navbar-whatsapp"
                className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-green-500 text-white font-bold px-4 py-1.5 rounded-full text-xs transition-all duration-300 hover:shadow-md"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                id="btn-mobile-menu"
                className="text-green-100 hover:text-white p-2 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden bg-[#14532d] border-t border-green-800"
              id="mobile-nav-panel"
            >
              <div className="px-4 py-3 space-y-1.5">
                {[
                  { name: "Home", id: "home" },
                  { name: "Programs", id: "programs" },
                  { name: "Subjects", id: "subjects" },
                  { name: "WISA Project", id: "wisa" },
                  { name: "Pricing", id: "pricing" },
                  { name: "Contact", id: "contact" }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`block w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeSection === item.id
                        ? "bg-[#166534] text-[#FACC15]"
                        : "text-green-100 hover:bg-[#166534]/50"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="pt-2.5 mt-2.5 border-t border-green-800">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="w-full inline-flex items-center justify-center space-x-2 bg-[#FACC15] text-[#166534] font-bold px-4 py-3 rounded-xl text-xs hover:bg-yellow-400 font-display"
                  >
                    <span>Talk with Mr Moyo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* DETAILED SPLIT BENTO GRID LAYOUT */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================== LEFT COLUMN (Hero, Subjects, WISA Project) ================== */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* SECTION 2 — HERO & SECTION 3 — ABOUT */}
            <div 
              id="home" 
              className="bg-gradient-to-br from-[#166534] to-[#14532d] rounded-2xl text-white p-6 sm:p-8 relative overflow-hidden shadow-lg border-b-4 border-[#FACC15]"
            >
              <div className="absolute -right-4 -bottom-4 opacity-5 pointer-events-none select-none">
                <span className="text-9xl">🎓</span>
              </div>
              
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-1 bg-[#FACC15]/20 border border-[#FACC15]/30 px-3 py-1 rounded-full text-[10px] font-bold text-[#FACC15] tracking-wider uppercase font-display">
                  <Sparkles className="w-3 h-3 text-[#FACC15]" />
                  <span>Bulawayo Central</span>
                </div>

                <h1 className="font-display font-black text-2xl sm:text-3.5xl lg:text-4xl leading-tight tracking-tight">
                  Night School and Extra Lessons <br className="hidden sm:inline" />
                  <span className="text-[#FACC15]">Form 1 - 6 students</span>
                </h1>
                
                <p className="text-sm text-green-50/90 font-light leading-relaxed max-w-xl">
                  Face-to-face tuition for Form 1 - 6 — O-Level and A-Level — right in the heart of Bulawayo. Wise Academy is a dedicated face-to-face learning institution committed to academic excellence for every student regardless of background.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => handleNavClick("programs")}
                    className="bg-[#FACC15] hover:bg-yellow-400 text-[#166534] font-extrabold px-5 py-2.5 rounded-lg shadow-md hover:shadow-yellow-400/10 hover:-translate-y-0.5 active:translate-y-0 text-xs sm:text-sm transition-all font-display cursor-pointer"
                  >
                    Explore Programs
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                    className="bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-white font-semibold px-5 py-2.5 rounded-lg text-xs sm:text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all font-display text-center"
                  >
                    WhatsApp Mr Moyo
                  </a>
                </div>

                <div className="flex items-center space-x-2 text-green-100 font-medium pt-4 mt-2 border-t border-green-800/40 text-xs sm:text-sm">
                  <span>📍</span>
                  <span>Corner 5th Avenue & Jason Moyo Street, Bulawayo</span>
                </div>
              </div>
            </div>

            {/* SECTION 5 — SUBJECTS OFFERED */}
            <div 
              id="subjects" 
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
            >
              <h3 className="font-display font-black text-[#166534] text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-4 bg-[#FACC15] rounded-full"></span>
                Subjects We Offer
              </h3>
              <p className="text-xs text-slate-500 mb-4 font-light">All ZIMSEC O-Level and A-Level subjects including:</p>

              {/* Flowing wrap layout of pills in alternating colors */}
              <div className="flex flex-wrap gap-2">
                {SUBJECTS.map((subject, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <span
                      key={subject}
                      className={`px-3 py-1.5 rounded-full font-medium text-[11px] sm:text-xs tracking-wide transition-all duration-150 ${
                        isEven
                          ? "bg-[#166534] text-white border border-green-800"
                          : "bg-[#FACC15] text-[#166534] border border-yellow-400 font-semibold"
                      }`}
                    >
                      {subject}
                    </span>
                  );
                })}
              </div>

              <p className="mt-4 text-[11px] italic text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center">
                Don't see your subject? Contact us — we cover the full ZIMSEC syllabus.
              </p>
            </div>

            {/* SECTION 6 — WISA PROJECT */}
            <div 
              id="wisa" 
              className="bg-[#166534] p-6 rounded-2xl text-white border-l-8 border-[#FACC15] shadow-md relative"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-lg font-black text-[#FACC15] tracking-tight">WISA Project</h2>
                  <p className="text-[10px] uppercase font-bold tracking-wider text-green-100">School of Art</p>
                </div>
                <span className="text-xs bg-white/10 px-2.5 py-1 rounded-full text-green-100">Arts Initiative</span>
              </div>
              
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-light mb-4">
                The WISA Project — Wise Academy School of Art — is our creative arts initiative dedicated to nurturing artistic talent among Zimbabwean youth. Students explore visual arts, performance, and creative expression alongside academic studies.
              </p>

              {/* Three bento microcards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="bg-[#FACC15] text-[#166534] p-3 rounded-xl border border-yellow-400 text-center flex flex-col justify-center">
                  <p className="text-xs font-bold leading-tight">🎨 Visual Arts</p>
                  <p className="text-[9px] opacity-80 mt-1 font-light">Painting, traditional drawing</p>
                </div>
                <div className="bg-[#FACC15] text-[#166534] p-3 rounded-xl border border-yellow-400 text-center flex flex-col justify-center">
                  <p className="text-xs font-bold leading-tight">🎭 Performance</p>
                  <p className="text-[9px] opacity-80 mt-1 font-light">Drama, music, spoken word</p>
                </div>
                <div className="bg-[#FACC15] text-[#166534] p-3 rounded-xl border border-yellow-400 text-center flex flex-col justify-center">
                  <p className="text-xs font-bold leading-tight">✏️ Expression</p>
                  <p className="text-[9px] opacity-80 mt-1 font-light">Design, storytelling</p>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  id="btn-wisa-enquire"
                  className="inline-flex items-center space-x-1.5 bg-[#FACC15] hover:bg-yellow-400 text-[#166534] text-xs font-black px-4 py-2 rounded-lg shadow-sm transition-all duration-300"
                >
                  <span>Enquire About WISA</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          {/* ================== RIGHT COLUMN (Programs, Pricing, Gallery, Contact) ================== */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* SECTION 4 & 7 — PROGRAMS, PRICING & SPECIAL OFFER */}
            <div id="programs" className="flex flex-col gap-3">
              <div id="pricing" className="border-b border-slate-200/50 pb-1 mb-1">
                <h3 className="font-display font-black text-[#166534] text-sm uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-4 bg-[#FACC15] rounded-full"></span>
                  Tuition Programs & Fees
                </h3>
              </div>

              {/* Full Time Card */}
              <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm flex items-center justify-between group hover:translate-x-1 transition-transform duration-200 select-none">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🏫</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-800">Full Time Schooling</h4>
                    <p className="text-[10px] text-slate-500 font-light">Complete ZIMSEC O & A Level timetable</p>
                  </div>
                </div>
                <div className="bg-[#166534] text-white font-display font-extrabold text-xs py-1.5 px-3 rounded-lg shadow-inner">
                  $75/Term
                </div>
              </div>

              {/* Night School Card */}
              <div className="bg-[#FACC15] p-4 rounded-xl border border-yellow-500 shadow-sm flex items-center justify-between group hover:translate-x-1 transition-transform duration-200 select-none">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">🌙</span>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#166534]">Night School</h4>
                    <p className="text-[10px] text-[#166534]/70 font-medium">Evening lessons after standard hours</p>
                  </div>
                </div>
                <div className="bg-[#166534] text-white font-display font-extrabold text-xs py-1.5 px-3 rounded-lg shadow-sm">
                  $75/Term
                </div>
              </div>

              {/* Highlight Block: Extra Lessons */}
              <div className="bg-white p-5 rounded-xl border-2 border-[#166534] flex flex-col gap-2.5 relative shadow-md">
                <span className="absolute -top-2.5 -right-2 bg-rose-600 text-white text-[9px] font-black tracking-wider px-2.5 py-0.5 rounded-full uppercase shadow-sm rotate-2">
                  GREAT VALUE
                </span>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">📚</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-[#166534]">Extra Lessons</h4>
                      <p className="text-[10px] text-slate-500">Targeted subject performance boost</p>
                    </div>
                  </div>
                  <div className="bg-[#166534] text-white font-display font-extrabold text-xs py-1 px-2.5 rounded-md">
                    $10/Subject
                  </div>
                </div>

                <p className="text-[11px] sm:text-xs text-slate-600 font-light leading-relaxed">
                  Boost O-Level & A-Level exam preparation with individual support, past paper review workshops, and personal mentorship.
                </p>

                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  referrerPolicy="no-referrer"
                  id="btn-book-lesson"
                  className="w-full text-center bg-[#166534] hover:bg-green-800 text-white text-xs font-bold py-2 rounded-lg shadow-sm transition-all"
                >
                  Book a Lesson
                </a>
              </div>

              {/* SPECIAL OFFER DASHED ACCENT */}
              <div className="bg-[#FACC15] p-3 rounded-xl border-dashed border-2 border-[#166534] text-[#166534]">
                <p className="text-[11px] font-extrabold text-center uppercase tracking-tight leading-tight">
                  🎓 SPECIAL OFFER: Night School + 2 Extra Lessons = 1 Extra FREE!
                </p>
              </div>
            </div>

            {/* SECTION 8 — GALLERY */}
            <div id="gallery" className="space-y-3">
              <h3 className="font-display font-black text-[#166534] text-sm uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-4 bg-[#FACC15] rounded-full"></span>
                Wise Academy Gallery
              </h3>
              
              <div className="grid grid-cols-3 gap-2" id="gallery-container">
                {[
                  {
                    title: "Classroom",
                    src: "https://placehold.co/400x300/166534/ffffff?text=Our+Classroom"
                  },
                  {
                    title: "Materials",
                    src: "https://placehold.co/400x300/166534/ffffff?text=Study+Materials"
                  },
                  {
                    title: "Mathematics",
                    src: "https://placehold.co/400x300/166534/ffffff?text=Projects"
                  }
                ].map((img, i) => (
                  <div 
                    key={i}
                    className="relative group rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-[4/3]"
                  >
                    <img 
                      src={img.src} 
                      alt={img.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform duration-300 group-hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 9 — CONTACT */}
            <div 
              id="contact" 
              className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200"
            >
              <h3 className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Contact details & map</h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <span className="text-base">📍</span>
                  <p className="text-xs text-slate-700 leading-tight">
                    Corner 5th Avenue & Jason Moyo Street, Bulawayo, Zimbabwe
                  </p>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <span className="text-base">📞</span>
                  <p className="text-xs font-bold text-slate-800">
                    Mr Moyo: +263 775 939 333
                  </p>
                </div>

                {/* Google Maps Iframe */}
                <div className="relative w-full h-24 rounded-xl overflow-hidden border border-slate-100 bg-green-50 mb-3">
                  <iframe
                    title="Wise Academy Location Map"
                    src="https://maps.google.com/maps?q=Corner%205th%20Avenue%20and%20Jason%20Moyo%2520Street%2C%2520Bulawayo%2C%2520Zimbabwe&t=&z=16&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full min-h-[96px] absolute inset-0 z-10 border-0"
                    allowFullScreen={true}
                    loading="lazy"
                  />
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  id="btn-chat-moyou"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-green-600 text-white py-2.5 rounded-xl text-xs font-bold shadow-sm hover:shadow transition-all"
                >
                  {/* WhatsApp Native Layout */}
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3.15 5.361.151 5.539 0 10.048-4.488 10.051-10.01 0-2.675-1.041-5.19-2.932-7.082C17.233 4.318 14.732 3.27 12.01 3.27c-5.541 0-10.051 4.49-10.054 10.011a9.86 9.86 0 001.481 5.172l-.971 3.555 3.65-.953l-.069-.034zM16.14 13.911c-.303-.153-1.796-.884-2.074-.984-.279-.101-.483-.153-.686.152-.204.304-.789.985-.968 1.187-.18.203-.359.228-.662.076a9.356 9.356 0 01-2.457-1.512a10.316 10.316 0 01-1.703-2.115c-.18-.304-.019-.468.132-.619.136-.135.303-.354.455-.532.151-.177.202-.303.303-.506.101-.202.051-.38-.025-.531-.076-.152-.686-1.644-.94-2.253-.247-.59-.5-.51-.686-.52l-.583-.012c-.203 0-.532.076-.81.38-.279.303-1.066 1.037-1.066 2.53 0 1.493 1.092 2.934 1.244 3.137.152.202 2.148 3.264 5.202 4.581.727.313 1.293.5 1.734.64.73.232 1.393.199 1.919.121.586-.087 1.796-.733 2.049-1.442.253-.708.253-1.315.178-1.441-.076-.126-.279-.203-.583-.355z" />
                  </svg>
                  <span>Chat with Mr Moyo</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* FLOATING WHATSAPP BUTTON (Fixed to bottom-right corner at all times) */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          referrerPolicy="no-referrer"
          id="btn-floating-whatsapp"
          aria-label="Direct message Mr Moyo"
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl border-4 border-white cursor-pointer transition-all hover:scale-110 hover:-translate-y-1 active:scale-95 pulse-button"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.34 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.438 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
          </svg>
        </a>
      </div>

      {/* FOOTER */}
      <footer id="footer" className="relative bg-[#166534] h-20 shrink-0 overflow-hidden flex items-center justify-center px-6">
        {/* Placeholder background image precisely specified with dark green overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 pointer-events-none opacity-10" 
          style={{ 
            backgroundImage: "url('https://placehold.co/1400x400/166534/ffffff')",
          }}
        />
        {/* Dark green overlay opacity 0.85 */}
        <div className="absolute inset-0 bg-emerald-950/20 z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-20 text-center text-white/90">
          <p className="text-[10px] leading-tight font-black text-white">
            © 2025 Wise Academy Bulawayo • WISA Project — School of Art
          </p>
          <p className="text-[9px] opacity-60 leading-normal mt-0.5">
            Building academic excellence for every Zimbabwean student. • Corner 5th Ave & Jason Moyo St
          </p>
        </div>
      </footer>

    </div>
  );
}
