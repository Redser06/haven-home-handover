

interface DashboardProps {
  temp: number;
  setTemp: (fn: (t: number) => number) => void;
  heatingMode: string;
  setHeatingMode: (mode: string) => void;
  evMode: string;
  setEvMode: (mode: string) => void;
  showKeySafe: boolean;
  setShowKeySafe: (val: boolean) => void;
  setIsChatOpen: (val: boolean) => void;
}

export function Dashboard({ temp, setTemp, heatingMode, setHeatingMode, evMode, setEvMode, showKeySafe, setShowKeySafe, setIsChatOpen }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome to 12 Oak Drive</h1>
          <p className="text-sm text-slate-500">Smart home handover instructions & telemetry status.</p>
        </div>
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-xl shadow-sm transition"
        >
          Open Full Chat Window 💬
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span>🔥 Smart Heating</span>
            </h3>
            <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-medium">
              Active: {heatingMode}
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Set Temp</span>
              <div className="text-3xl font-extrabold text-slate-900">{temp}°C</div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setTemp((t: number) => Math.max(15, t - 1))}
                className="w-10 h-10 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100 text-lg transition"
              >
                -
              </button>
              <button 
                onClick={() => setTemp((t: number) => Math.min(28, t + 1))}
                className="w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 text-lg transition"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-1.5 pt-1">
            {['Scheduled', 'Home', 'Away', 'Boost'].map(mode => (
              <button
                key={mode}
                onClick={() => setHeatingMode(mode)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                  heatingMode === mode ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span>☀️ Solar Generation</span>
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">
              Exporting to Grid
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 uppercase font-semibold">Live Solar Power</span>
              <div className="text-3xl font-extrabold text-emerald-600">3.8 kW</div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 uppercase font-semibold">Battery Storage</span>
              <div className="text-xl font-bold text-slate-800">85% 🔋</div>
            </div>
          </div>

          <button
            onClick={() => setIsChatOpen(true)}
            className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50 rounded-xl border border-slate-200 transition"
          >
            Ask Seller About Solar Inverter 💬
          </button>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <span>⚡ EV Smart Charger</span>
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">
              Charging Active
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500 font-medium">Myenergi Zappi</span>
              <span className="font-bold text-slate-900">68% (310 km)</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[68%]" />
            </div>
          </div>

          <div className="flex gap-1.5">
            {['Eco+', 'Eco', 'Fast'].map(m => (
              <button
                key={m}
                onClick={() => setEvMode(m)}
                className={`flex-1 py-1.5 rounded-lg text-xs font-medium transition ${
                  evMode === m ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m} Mode
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <span>🔑 Key Safe & Alarm Master PIN</span>
          </h3>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Backyard Key Safe Code</span>
              <span className="text-lg font-mono font-bold text-slate-800">
                {showKeySafe ? '4921' : '••••'}
              </span>
            </div>
            <button 
              onClick={() => setShowKeySafe(!showKeySafe)}
              className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold px-3 py-1.5 bg-white border border-slate-200 rounded-lg shadow-2xs"
            >
              {showKeySafe ? 'Hide Code' : 'Reveal PIN'}
            </button>
          </div>
          <p className="text-xs text-slate-500">
            To update alarm master PIN: Enter existing PIN on keypad, press * then 4, enter new 4-digit code.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <span>🚰 Main Water Stopcock Location</span>
          </h3>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=200&q=80" 
              alt="Stopcock" 
              className="w-16 h-16 rounded-lg object-cover border border-slate-200"
            />
            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-800 block">Under Kitchen Sink (Left Side)</span>
              <span className="text-slate-500 block">Turn clockwise 90° to shut off main supply.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
