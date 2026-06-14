'use client';

interface TimelineProps {
  status: 'pending' | 'in_progress' | 'review' | 'approved' | 'rejected';
  progress: number;
  lang: 'ar' | 'en';
}

export default function TransactionTimeline({ status, progress, lang }: TimelineProps) {
  const isRtl = lang === 'ar';

  const steps = [
    { id: 'pending', ar: 'استلام الطلب', en: 'Order Received' },
    { id: 'in_progress', ar: 'المعالجة الإدارية', en: 'Administrative Processing' },
    { id: 'review', ar: 'التدقيق والراجعة', en: 'Review & Audit' },
    { id: 'approved', ar: 'اعتماد الرخص', en: 'License Approved' },
  ];

  // تحديد ترتيب الخطوة الحالية
  const statusOrder = ['pending', 'in_progress', 'review', 'approved', 'rejected'];
  const currentIndex = status === 'rejected' ? 2 : statusOrder.indexOf(status);

  return (
    <div className="w-full py-6">
      {/* الخط الزمني الهيكلي */}
      <div className="relative flex justify-between items-center w-full">
        {/* خلفية الخط الثابت */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-brand-navy-dark/[0.06] rounded-full z-0" />
        
        {/* شريط التقدم الفعلي الممتد سينمائياً */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 h-[3px] bg-gradient-to-r from-brand-gold to-brand-gold-hover rounded-full z-0 transition-all duration-1000 ease-out"
          style={{ 
            width: `${progress}%`,
            right: isRtl ? 0 : 'auto',
            left: isRtl ? 'auto' : 0 
          }}
        />

        {/* الدوائر التفاعلية للنقاط */}
        {steps.map((step, idx) => {
          const isCompleted = currentIndex > idx || status === 'approved';
          const isCurrent = currentIndex === idx && status !== 'approved';
          const isStepRejected = status === 'rejected' && idx === 2;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10 flex-1">
              <div 
                className={`w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-500 text-[10px] font-bold shadow-3xs
                  ${isCompleted ? 'bg-brand-navy-dark border-brand-navy-dark text-white' : ''}
                  ${isCurrent ? 'bg-white border-brand-gold text-brand-gold scale-110 animate-pulse ring-4 ring-brand-gold/10' : ''}
                  ${isStepRejected ? 'bg-rose-50 border-rose-500 text-rose-600 ring-4 ring-rose-500/10' : ''}
                  ${!isCompleted && !isCurrent && !isStepRejected ? 'bg-white border-brand-navy-dark/15 text-brand-navy-dark/30' : ''}
                `}
              >
                {isStepRejected ? '✕' : isCompleted ? '✓' : idx + 1}
              </div>
              
              <span 
                className={`text-[11px] md:text-xs font-bold mt-2.5 text-center px-1 truncate max-w-[100px] md:max-w-none transition-colors duration-300
                  ${isCurrent ? 'text-brand-gold font-bold' : ''}
                  ${isStepRejected ? 'text-rose-600 font-bold' : ''}
                  ${isCompleted ? 'text-brand-navy-dark' : 'text-brand-navy-dark/40'}
                `}
              >
                {isRtl ? step.ar : step.en}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}