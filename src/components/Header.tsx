export function Header({ address, messagesLength, setIsChatOpen }: { address: string, messagesLength: number, setIsChatOpen: (v: boolean) => void }) {
  return (
    <header className="bg-[#1E293B] text-white px-6 py-3.5 flex items-center justify-between shadow-md border-b border-slate-700">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-900 text-lg">
            H
          </div>
          <span className="font-bold text-lg tracking-tight">HAVEN</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
          <span>📍 {address}</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-medium">Handover Active</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Contact Protected</span>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-2"
        >
          💬 Messages ({messagesLength})
        </button>
      </div>
    </header>
  );
}
