export type Language = "ar" | "en";

export const siteContent = {
  ar: {
    dir: "rtl",
    nav: {
      about: "من نحن",
      services: "خدماتنا الاستشارية",
      track: "تتبع المعاملات",
      iso: "شهادات ISO",
      contact: "اتصل بنا",
      cta: "بوابة العملاء",
    },
    hero: {
      badge: "مستشارك الإداري المعتمد في دولة الإمارات",
      title: "جسور انترناشيونال للأستشارات الإدارية",
      subtitle:
        "نمهد لك الطريق لتأسيس أعمالك وإصدار رخصتك التجارية في دبي وأبوظبي بكفاءة وسرعة مطلقة.",
      buttons: {
        request: "ابدأ تأسيس شركتك الآن",
        consult: "طلب استشارة مجانية",
      },
    },
    aboutSection: {
      badge: "من نحن",
      title: "جسور انترناشيونال للأستشارات الإدارية",
      desc1: "نحن في جسور انترناشيونال شريكك الاستراتيجي الموثوق لتأسيس الشركات وتقديم الحلول الاستشارية والإدارية المتكاملة في دولة الإمارات العربية المتحدة. نمتلك شبكة علاقات وخبرة عميقة تمكننا من إنهاء الإجراءات الحكومية المعقدة بأعلى كفاءة وسرعة.",
      desc2: "نهدف إلى تمكين المستثمرين ورجال الأعمال من إطلاق مشاريعهم بثقة، وتوفير الدعم الإداري والقانوني والفني ابتداءً من الفكرة وحتى إصدار الرخص ومتابعة التشغيل عبر بواباتنا الذكية.",
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
          href: "/services/realestate",
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
          href: "/services/vipiso",
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
          href: "/services/icv",
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
          href: "/services/vip-web",
        },
      ],
    },
    consultationModal: {
      title: "صمم مسارك الاستشاري في الإمارات",
      subtitle: "خطوات بسيطة تفصلك عن التحدث مع مستشارينا الإداريين",
      steps: ["نوع الخدمة", "تفاصيل الاتصال", "تأكيد الطلب"],
      next: "التالي",
      prev: "السابق",
      submit: "إرسال الطلب البدء",
      successTitle: "تم استلام طلبك بنجاح!",
      successDesc: "سيتواصل معك أحد مستشارينا الإداريين عبر الواتساب أو الهاتف خلال أقل من 15 دقيقة.",
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
        phonePlaceholder: "مثال: 557983500",
        email: "البريد الإلكتروني",
        emailPlaceholder: "name@company.com"
      }
    },
    footer: {
      desc: "جسر الاستدامة والتميز لأعمالكم في دولة الإمارات العربية المتحدة.",
      rights: "© 2026 جسور انترناشيونال للأستشارات الإدارية. جميع الحقوق محفوظة.",
    },
  },
  en: {
    dir: "ltr",
    nav: {
      about: "About Us",
      services: "Advisory Services",
      track: "Track Applications",
      iso: "ISO Certificates",
      contact: "Contact Us",
      cta: "Client Portal",
    },
    hero: {
      badge: "Your Certified Management Consultant in the UAE",
      title: "jusoor international management consulting",
      subtitle:
        "Paving the way to establish your business and issue your trade license in Dubai & Abu Dhabi with absolute efficiency.",
      buttons: {
        request: "Start Your Business Now",
        consult: "Request Free Consultation",
      },
    },
    aboutSection: {
      badge: "About Us",
      title: "jusoor international management consulting",
      desc1: "At Jusoor International, we are your trusted strategic partner for corporate setup and integrated management and administrative consulting solutions in the UAE. We possess a deep network of relationships and expertise that enables us to complete complex government procedures with ultimate efficiency and speed.",
      desc2: "We aim to empower investors and entrepreneurs to launch their projects with high confidence, providing comprehensive administrative, legal, and technical support from initial concept to license issuance and operational tracking through our smart portals.",
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
          href: "/services/realestate",
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
          href: "/services/vipiso",
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
          href: "/services/icv",
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
          href: "/services/vip-web",
        },
      ],
    },
    consultationModal: {
      title: "Design Your Advisory Path in the UAE",
      subtitle: "A few simple steps separate you from speaking with our consultants",
      steps: ["Service Type", "Contact Info", "Confirmation"],
      next: "Next",
      prev: "Previous",
      submit: "Submit and Initiate",
      successTitle: "Request Received Successfully!",
      successDesc: "One of our management consultants will contact you via WhatsApp or phone call within 15 minutes.",
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
        phonePlaceholder: "e.g., 557983500",
        email: "Email Address",
        emailPlaceholder: "name@company.com"
      }
    },
    footer: {
      desc: "Your bridge to sustainability and corporate excellence in the United Arab Emirates.",
      rights: "© 2026 jusoor international management consulting. All rights reserved.",
    },
  },
};