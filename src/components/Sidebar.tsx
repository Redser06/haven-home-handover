export function Sidebar({ activeTab, setActiveTab, setIsChatOpen }: { activeTab: string, setActiveTab: (v: string) => void, setIsChatOpen: (v: boolean) => void }) {
  return (
    <aside className="w-64 bg-[#1E293B] text-slate-300 flex flex-col p-4 space-y-2 border-r border-slate-800 hidden md:flex">
      <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
        Property Modules
      </div>

      <button
        onClick={() => setActiveTab('dashboard')}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
          activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
        }`}
      >
        📊 Home Overview
      </button>

      <button
        onClick={() => setActiveTab('tech')}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
          activeTab === 'tech' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
        }`}
      >
        ⚡ Smart Tech Telemetry
      </button>

      <button
        onClick={() => setActiveTab('manuals')}
        className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
          activeTab === 'manuals' ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
        }`}
      >
        📖 Manuals & Warranties
      </button>

      <button
        onClick={() => setIsChatOpen(true)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
      >
        <span>🔒 Secure Buyer Chat</span>
        <span className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5 rounded-full font-bold">Popout</span>
      </button>

      <div className="mt-auto pt-4 border-t border-slate-800">
        <div className="bg-slate-800/60 rounded-xl p-3 text-xs space-y-1">
          <span className="text-slate-400 block">Handover Token:</span>
          <span className="font-mono text-emerald-400 font-semibold block select-all">HANDOVER-9823-OAK</span>
          <span className="text-[10px] text-slate-500 block pt-1">Active until Nov 30, 2026</span>
        </div>
      </div>
    </aside>
  );
}
