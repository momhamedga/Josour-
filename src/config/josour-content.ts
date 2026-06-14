export type Language = "ar" | "en";

export const siteContent = {
  ar: {
    dir: "rtl",
    nav: {
      about: "من نحن",
      services: "خدماتنا",
      track: "تتبع المعاملات",
      iso: "شهادات ISO",
      contact: "اتصل بنا",
      cta: "بوابة العملاء",
    },
    hero: {
      badge: "مستشارك الإداري المعتمد في دولة الإمارات",
      title: "جسور الرائدة للاستشارات الإدارية وتأسيس الشركات",
      subtitle:
        "نمهد لك الطريق لتأسيس أعمالك وإصدار رخصتك التجارية في دبي وأبوظبي بكفاءة وسرعة مطلقة.",
      buttons: {
        request: "ابدأ تأسيس شركتك الآن",
        consult: "طلب استشارة مجانية",
      },
    },
    servicesSection: {
      title: "خدماتنا الاستشارية المتكاملة",
      subtitle:
        "منظومة حلول احترافية مصممة خصيصاً لدعم وتطوير الأعمال والاستثمارات في دولة الإمارات",
      items: [
        {
          id: "gov",
          title: "الخدمات الحكومية",
          desc: "تأسيس الشركات، إصدار وتجديد الرخص التجارية، تعديل الأنشطة، وتصفية الشركات بكفاءة مطلقة.",
          features: [
            "تأسيس الشركات",
            "الرخص التجارية",
            "حجز الأسماء",
            "فتح الفروع",
          ],
          href: "#contact",
        },
        {
          id: "visa",
          title: "الإقامة والتأشيرات",
          desc: "منظومة متكاملة لإصدار وتجديد الإقامات، تأشيرات المستثمرين، تصاريح العمل، والهوية الإماراتية.",
          features: [
            "إقامة مستثمر",
            "تأشيرات العمل",
            "الهوية الإماراتية",
            "تجديد الإقامات",
          ],
          href: "/portal",
        },
        {
          id: "vip",
          title: "خدمات رجال الأعمال والمستثمرين",
          desc: "خدمات كبار العملاء VIP، تأسيس شركات المناطق الحرة والأجنبية، وإعداد خطط ودراسات الجدوى.",
          features: [
            "تأسيس مناطق حرة",
            "حسابات بنكية",
            "دراسات جدوى",
            "مدير علاقات",
          ],
          href: "/services/vip",
        },
        {
          id: "realestate",
          title: "الخدمات العقارية وإدارة الأملاك",
          desc: "حلول عقارية احترافية تشمل تأجير الشقق والفلل والمكاتب، تحصيل الإيجارات، والصيانة والمتابعة.",
          features: [
            "إدارة الأملاك",
            "تأجير تجاري وسكني",
            "تسويق عقاري",
            "تحصيل الإيجارات",
          ],
          href: "/services/realestate", // 🚀 تم التوجيه للمسار الجديد المستقل
        },
        {
          id: "track",
          title: "متابعة المعاملات الإلكترونية",
          desc: "قسم ذكي متكامل لرفع الملفات، متابعة حالة المعاملات لحظياً، واستلام الإشعارات والتقارير.",
          features: [
            "رفع الملفات",
            "تتبع لحظي",
            "إشعارات ذكية",
            "تحميل الشهادات",
          ],
          href: "/portal",
        },
        {
          id: "iso",
          title: "شهادات ISO العالمية",
          desc: "تأهل وإصدار جميع شهادات الأيزو (ISO 9001, 14001, 45001, 27001) لرفع جودة الأداء المؤسسي.",
          features: [
            "ISO 9001 الجودة",
            "ISO 27001 الأمن",
            "التدقيق والتحليل",
            "التأهيل للاعتماد",
          ],
          href: "/services/vipiso", // 🚀 تم التوجيه للمسار الفعلي الجديد
        },
        {
          id: "icv",
          title: "شهادات القيمة الوطنية المضافة ICV",
          desc: "إصدار وتجديد شهادة ICV ومراجعة البيانات المالية لتحسين نسب التقييم في المناقصات الحكومية.",
          features: [
            "إصدار شهادة ICV",
            "استشارات مالية",
            "تحسين التقييم",
            "مراجعة الميزانيات",
          ],
          href: "/services/icv", // 🚀 تم التوجيه للمسار الفعلي الجديد المستقل
        },
        {
          id: "vip_web",
          title: "تصميم وتطوير المواقع الإلكترونية (VIP)",
          desc: "حلول رقمية استثنائية تعكس فخامة وهيبة علامتكم التجارية، مع واجهات تفاعلية مخصصة وأداء تقني فائق.",
          features: [
            "تصميم واجهات UI/UX فاخرة",
            "تطوير برمجي آمن وعالي الأداء",
            "تكامل مع بوابات الدفع والخدمات",
            "تحسين محركات البحث (SEO) للنطاق المحلي",
          ],
          href: "/services/vip-web", // 🚀 تم التوجيه للمسار الفعلي الجديد
        },
      ],
    },
    consultationModal: {
  title: "طلب استشارة مجانية",
  subtitle: "خطوات بسيطة تفصلك عن التحدث مع مستشارينا الإداريين",
  steps: ["نوع الخدمة", "تفاصيل الاتصال", "تأكيد الطلب"],
  next: "التالي",
  prev: "السابق",
  submit: "إرسال الطلب",
  successTitle: "تم استلام طلبك بنجاح!",
  successDesc: "سيتواصل معك أحد مستشارينا الإداريين خلال أقل من 15 دقيقة.",
  close: "إغلاق",
  fields: {
    serviceType: "ما هو نوع الخدمة المطلوبة؟",
    corporate: "تأسيس شركات ورخص تجارية",
    visas: "إقامات وتأشيرات المستثمرين",
    iso: "شهادات ISO والقيمة المضافة",
    web: "تطوير المواقع والحلول الرقمية",
    name: "الاسم الكامل",
    namePlaceholder: "أدخل اسمك الكريم",
    phone: "رقم الهاتف (واتساب)",
    phonePlaceholder: "مثال: 501234567",
    email: "البريد الإلكتروني",
    emailPlaceholder: "name@company.com"
  }
},
    footer: {
      desc: "جسر الاستدامة والتميز لأعمالك في دولة الإمارات العربية المتحدة.",
      rights: "© 2026 جسور الدولية للاستشارات الإدارية. جميع الحقوق محفوظة.",
    },
  },
  en: {
    dir: "ltr",
    nav: {
      about: "About Us",
      services: "Services",
      track: "Track Applications",
      iso: "ISO Certificates",
      contact: "Contact Us",
      cta: "Client Portal",
    },
    hero: {
      badge: "Your Certified Management Consultant in the UAE",
      title: "Josour International Corporate Setup & Consultancy",
      subtitle:
        "Paving the way to establish your business and issue your trade license in Dubai & Abu Dhabi with absolute efficiency.",
      buttons: {
        request: "Start Your Business Now",
        consult: "Request Free Consultation",
      },
    },
    servicesSection: {
      title: "Our Integrated Advisory Services",
      subtitle:
        "A professional ecosystem of solutions tailor-made to support business and investment growth in the UAE.",
      items: [
        {
          id: "gov",
          title: "Government Services",
          desc: "Corporate setup, trade license issuance & renewal, commercial updates, and efficient company liquidation.",
          features: [
            "Business Setup",
            "Trade Licenses",
            "Trade Name",
            "Branch Opening",
          ],
          href: "#contact",
        },
        {
          id: "visa",
          title: "Residency & Visas",
          desc: "Comprehensive system for issuing and renewing corporate residencies, investor visas, work permits, and Emirates ID.",
          features: [
            "Investor Visas",
            "Work Permits",
            "Emirates ID",
            "Residency Renewals",
          ],
          href: "/portal",
        },
        {
          id: "vip",
          title: "Investor & VIP Services",
          desc: "Elite VIP client services, Freezone & foreign company establishment, and preparation of business plans.",
          features: [
            "Freezone Setup",
            "Bank Accounts",
            "Feasibility Studies",
            "Dedicated Manager",
          ],
          href: "/services/vip",
        },
        {
          id: "realestate",
          title: "Real Estate & Property Management",
          desc: "Professional real estate solutions covering leasing, rent collection, facility maintenance, and marketing.",
          features: [
            "Property Management",
            "Commercial Leasing",
            "Real Estate Marketing",
            "Rent Collection",
          ],
          href: "/services/realestate", // 🚀 Updated to the new standalone path
        },
        {
          id: "track",
          title: "Application Tracking Portal",
          desc: "Integrated smart portal for uploading documents, live status tracking, and downloading reports.",
          features: [
            "Document Upload",
            "Live Status Tracking",
            "Smart Notifications",
            "Download Docs",
          ],
          href: "/portal",
        },
        {
          id: "iso",
          title: "International ISO Certifications",
          desc: "Qualification and issuance of all ISO standards (ISO 9001, 14001, 45001, 27001) to elevate institutional performance.",
          features: [
            "ISO 9001 Quality",
            "ISO 27001 Security",
            "Auditing & Analysis",
            "Accreditation Setup",
          ],
          href: "/services/vipiso", // 🚀 تم التوجيه للمسار الفعلي الجديد
        },
        {
          id: "icv",
          title: "In-Country Value (ICV)",
          desc: "Issuance and renewal of ICV certification and financial data review to maximize tender evaluation scores.",
          features: [
            "ICV Issuance",
            "Financial Advisory",
            "Score Optimization",
            "Financial Review",
          ],
          href: "/services/icv", // 🚀 Updated to the new standalone path
        },
        {
          id: "vip_web",
          title: "VIP Web Design & Development",
          desc: "Exceptional digital solutions designed to reflect the prestige and authority of your brand, featuring custom interactive interfaces and superior technical performance.",
          features: [
            "Luxury UI/UX Interface Design",
            "Secure & High-Performance Development",
            "Integration with Payments & APIs",
            "Advanced Local SEO Optimization",
          ],
          href: "/services/vip-web", // 🚀 تم التوجيه للمسار الفعلي الجديد
        },
      ],
    },consultationModal: {
  title: "Request Free Consultation",
  subtitle: "A few simple steps separate you from speaking with our consultants",
  steps: ["Service Type", "Contact Info", "Confirmation"],
  next: "Next",
  prev: "Previous",
  submit: "Submit Request",
  successTitle: "Request Received Successfully!",
  successDesc: "One of our management consultants will contact you within 15 minutes.",
  close: "Close",
  fields: {
    serviceType: "What type of service do you require?",
    corporate: "Company Setup & Trade Licenses",
    visas: "Investor Visas & Residencies",
    iso: "ISO Certificates & ICV",
    web: "VIP Web Design & Digital Solutions",
    name: "Full Name",
    namePlaceholder: "Enter your full name",
    phone: "Phone Number (WhatsApp)",
    phonePlaceholder: "e.g., 501234567",
    email: "Email Address",
    emailPlaceholder: "name@company.com"
  }
},
    footer: {
      desc: "Your bridge to sustainability and corporate excellence in the United Arab Emirates.",
      rights:
        "© 2026 Josour International Management Consultancy. All rights reserved.",
    },
  },
};
