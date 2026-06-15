'use client';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedClient: string;
  setSelectedClient: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  sortBy: string;
  setSortBy: (val: any) => void;
  uniqueClients: string[];
  t: any;
}

export default function FilterBar({
  searchQuery, setSearchQuery,
  selectedClient, setSelectedClient,
  statusFilter, setStatusFilter,
  sortBy, setSortBy,
  uniqueClients, t
}: FilterBarProps) {
  return (
    <div className="bg-white border border-brand-navy-dark/[0.08] rounded-2xl p-5 shadow-3xs space-y-4 text-start w-full">
      <span className="text-xs font-bold text-brand-gold tracking-wider uppercase block">{t.filterTitle}</span>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-bold">
        <input
          type="text"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none focus:border-brand-gold/50 font-semibold"
        />

        <select
          value={selectedClient}
          onChange={(e) => setSelectedClient(e.target.value)}
          className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none cursor-pointer"
        >
          <option value="all">👥 {t.allClients}</option>
          {uniqueClients.map(clientName => (
            <option key={clientName} value={clientName}>{clientName}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none cursor-pointer"
        >
          <option value="all">⚡ {t.allStatuses}</option>
          {Object.entries(t.statuses).map(([key, label]) => (
            <option key={key} value={key}>{label as string}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full bg-brand-light-bg/60 border border-brand-navy-dark/10 rounded-xl px-4 py-2.5 text-brand-navy-dark focus:outline-none cursor-pointer"
        >
          <option value="latest">⏳ {t.sortOptions.latest}</option>
          <option value="progress-asc">📈 {t.sortOptions.progressAsc}</option>
          <option value="progress-desc">📉 {t.sortOptions.progressDesc}</option>
          <option value="sla-risk">⚠️ {t.sortOptions.slaRisk}</option>
        </select>
      </div>
    </div>
  );
}