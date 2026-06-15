'use client';

interface StatsCardsProps {
  totalApps: number;
  approvedLicenses: number;
  pendingDocs: number;
  rejectedDocs: number;
  t: any;
}

export default function StatsCards({ totalApps, approvedLicenses, pendingDocs, rejectedDocs, t }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      <div className="bg-white border border-brand-navy-dark/[0.06] rounded-2xl p-4 shadow-2xs text-start">
        <span className="text-brand-navy-dark/40 text-[11px] font-bold block mb-1">{t.stats.totalApps}</span>
        <span className="text-2xl font-black text-brand-navy-dark font-mono">{totalApps}</span>
      </div>
      <div className="bg-emerald-50/40 border border-emerald-500/10 rounded-2xl p-4 text-start">
        <span className="text-emerald-700/60 text-[11px] font-bold block mb-1">{t.stats.approved}</span>
        <span className="text-2xl font-black text-emerald-700 font-mono">{approvedLicenses}</span>
      </div>
      <div className="bg-amber-50/50 border border-amber-500/10 rounded-2xl p-4 text-start">
        <span className="text-amber-700/60 text-[11px] font-bold block mb-1">{t.stats.pendingDocs}</span>
        <span className="text-2xl font-black text-amber-600 font-mono">{pendingDocs}</span>
      </div>
      <div className="bg-rose-50/40 border border-rose-500/10 rounded-2xl p-4 text-start">
        <span className="text-rose-700/60 text-[11px] font-bold block mb-1">{t.stats.rejectedDocs}</span>
        <span className="text-2xl font-black text-rose-600 font-mono">{rejectedDocs}</span>
      </div>
    </div>
  );
}