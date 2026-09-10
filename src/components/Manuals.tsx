export function Manuals() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Appliance Manuals & PDF Downloads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Bosch Series 6 Dishwasher', size: '2.4 MB' },
          { title: 'Neff Slide & Hide Oven', size: '4.1 MB' },
          { title: 'Daikin Altherma Heat Pump', size: '8.7 MB' },
          { title: 'Myenergi Zappi v2 EV Charger', size: '1.9 MB' }
        ].map(doc => (
          <div key={doc.title} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-2xs">
            <div>
              <h4 className="font-semibold text-sm text-slate-800">{doc.title}</h4>
              <span className="text-xs text-slate-400">PDF • {doc.size}</span>
            </div>
            <button 
              onClick={() => alert(`Downloading ${doc.title}`)}
              className="text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition"
            >
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
