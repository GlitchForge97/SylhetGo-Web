import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "bn" | "ar";

const t = {
  en: {
    explore: "Explore",
    transport: "Transport Hub",
    stay: "Stay & Dine",
    guides: "Guides & Spots",
    planner: "Trip Planner",
    community: "Community & Emergency",
    search: "Search destinations, guides, or experiences...",
    allTypes: "All Types",
    getStarted: "Get Started",
    viewDetails: "View Details",
    bookNow: "Book Now",
    bookGuide: "Book a Guide",
    postUpdate: "Post Update",
    submitReport: "Submit Report",
    clearFilters: "Clear Filters",
    offlineReady: "Offline Mode Ready",
    sylhetGo: "SylhetGo",
    tagline: "One Platform. All of Sylhet.",
    loading: "Loading...",
    noResults: "No results found",
    budget: "Budget",
    moderate: "Moderate",
    premium: "Premium",
    verified: "Verified",
    rating: "Rating",
    all: "All",
    hotel: "Hotel",
    resort: "Resort",
    homestay: "Homestay",
    restaurant: "Restaurant",
    cng: "CNG Fares",
    bus: "Bus Routes",
    train: "Train",
    hiddenGem: "Hidden Gem",
    emergency: "Emergency",
    phrases: "Sylheti Phrases",
    tripDates: "Travel Dates",
    tripBudget: "Budget (৳)",
    destination: "Destination",
    groupSize: "Group Size",
    generatePlan: "Generate Itinerary",
    shareUpdate: "Share a Travel Update",
  },
  bn: {
    explore: "অন্বেষণ",
    transport: "পরিবহন হাব",
    stay: "থাকা ও খাওয়া",
    guides: "গাইড ও স্থান",
    planner: "ট্রিপ পরিকল্পনাকারী",
    community: "কমিউনিটি ও জরুরি",
    search: "গন্তব্য, গাইড বা অভিজ্ঞতা খুঁজুন...",
    allTypes: "সব ধরন",
    getStarted: "শুরু করুন",
    viewDetails: "বিস্তারিত দেখুন",
    bookNow: "এখনই বুক করুন",
    bookGuide: "গাইড বুক করুন",
    postUpdate: "আপডেট পোস্ট করুন",
    submitReport: "রিপোর্ট জমা দিন",
    clearFilters: "ফিল্টার মুছুন",
    offlineReady: "অফলাইন মোড প্রস্তুত",
    sylhetGo: "সিলেটগো",
    tagline: "এক প্ল্যাটফর্ম। সমগ্র সিলেট।",
    loading: "লোড হচ্ছে...",
    noResults: "কোনো ফলাফল পাওয়া যায়নি",
    budget: "বাজেট",
    moderate: "মাঝারি",
    premium: "প্রিমিয়াম",
    verified: "যাচাইকৃত",
    rating: "রেটিং",
    all: "সব",
    hotel: "হোটেল",
    resort: "রিসোর্ট",
    homestay: "হোমস্টে",
    restaurant: "রেস্তোরাঁ",
    cng: "সিএনজি ভাড়া",
    bus: "বাস রুট",
    train: "ট্রেন",
    hiddenGem: "লুকানো রত্ন",
    emergency: "জরুরি",
    phrases: "সিলেটি বাক্য",
    tripDates: "ভ্রমণের তারিখ",
    tripBudget: "বাজেট (৳)",
    destination: "গন্তব্য",
    groupSize: "দলের আকার",
    generatePlan: "পরিকল্পনা তৈরি করুন",
    shareUpdate: "ভ্রমণ আপডেট শেয়ার করুন",
  },
  ar: {
    explore: "استكشاف",
    transport: "مركز النقل",
    stay: "الإقامة والطعام",
    guides: "المرشدون والأماكن",
    planner: "مخطط الرحلة",
    community: "المجتمع والطوارئ",
    search: "ابحث عن الوجهات أو المرشدين...",
    allTypes: "جميع الأنواع",
    getStarted: "ابدأ الآن",
    viewDetails: "عرض التفاصيل",
    bookNow: "احجز الآن",
    bookGuide: "احجز مرشداً",
    postUpdate: "نشر تحديث",
    submitReport: "تقديم تقرير",
    clearFilters: "مسح الفلاتر",
    offlineReady: "وضع عدم الاتصال جاهز",
    sylhetGo: "سيلهيت غو",
    tagline: "منصة واحدة. كل سيلهيت.",
    loading: "جارٍ التحميل...",
    noResults: "لا توجد نتائج",
    budget: "اقتصادي",
    moderate: "متوسط",
    premium: "فاخر",
    verified: "موثق",
    rating: "التقييم",
    all: "الكل",
    hotel: "فندق",
    resort: "منتجع",
    homestay: "إقامة منزلية",
    restaurant: "مطعم",
    cng: "أجرة CNG",
    bus: "خطوط الحافلات",
    train: "القطار",
    hiddenGem: "جوهرة مخفية",
    emergency: "طوارئ",
    phrases: "عبارات سيلهيتية",
    tripDates: "تواريخ السفر",
    tripBudget: "الميزانية (৳)",
    destination: "الوجهة",
    groupSize: "حجم المجموعة",
    generatePlan: "إنشاء الجدول",
    shareUpdate: "شارك تحديثاً للسفر",
  },
};

type Translations = typeof t.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  tx: Translations;
  dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  tx: t.en,
  dir: "ltr",
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LanguageContext.Provider value={{ lang, setLang, tx: t[lang], dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
