export function TechGuide() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Smart Home Systems Detailed Guide</h1>
      <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
        <h3 className="font-bold text-lg text-slate-800">1. Solar Panel & Inverter Maintenance</h3>
        <p className="text-sm text-slate-600">The 5.2 kW Solis inverter is installed in the main garage on the north wall. Standard operating status is indicated by a steady green LED.</p>
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl text-xs text-emerald-900 space-y-2">
          <span className="font-bold block">Inverter Reboot Procedure:</span>
          <ol className="list-decimal list-inside space-y-1">
            <li>Locate the red AC Isolator switch next to the electric meter.</li>
            <li>Switch AC Isolator to OFF. Wait 30 seconds.</li>
            <li>Turn DC Isolator switch under inverter to OFF. Wait 10 seconds.</li>
            <li>Turn DC Isolator back ON, then AC Isolator back ON.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
