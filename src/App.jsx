import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [temp, setTemp] = useState(21);
  const [heatingMode, setHeatingMode] = useState('Scheduled');
  const [evMode, setEvMode] = useState('Eco+');
  const [showKeySafe, setShowKeySafe] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'buyer',
      senderName: 'Mike L. (Buyer)',
      text: 'Hi Sarah! Where is the main water shutoff stopcock located?',
      timestamp: '09:18 AM'
    },
    {
      id: '2',
      sender: 'seller',
      senderName: 'Sarah J. (Seller)',
      text: 'Morning Mike! It is under the kitchen sink on the left wall behind the shelf unit.',
      timestamp: '09:22 AM',
      attachment: {
        name: 'Stopcock_Location.jpg',
        url: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80'
      }
    },
    {
      id: '3',
      sender: 'buyer',
      senderName: 'Mike L. (Buyer)',
      text: 'Found it, thanks! Also how do I reset the solar inverter if output drops?',
      timestamp: '09:25 AM'
    },
    {
      id: '4',
      sender: 'seller',
      senderName: 'Sarah J. (Seller)',
      text: 'Press the red toggle switch at the base of the inverter unit in the garage for 10 seconds, then release.',
      timestamp: '09:28 AM',
      attachment: {
        name: 'Solar_Inverter_Panel.jpg',
        url: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=400&q=80'
      }
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      sender: 'buyer',
      senderName: 'Mike L. (Buyer)',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMsg]);
    if (!textToSend) setInputText('');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <header className="bg-[#1E293B] text-white px-6 py-3.5 flex items-center justify-between shadow-md border-b border-slate-700">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-slate-900 text-lg">
              H
            </div>
            <span className="font-bold text-lg tracking-tight">HAVEN</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
            <span>📍 12 Oak Drive</span>
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
            💬 Messages ({messages.length})
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
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

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
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
                        onClick={() => setTemp(t => Math.max(15, t - 1))}
                        className="w-10 h-10 rounded-lg bg-white border border-slate-200 font-bold hover:bg-slate-100 text-lg transition"
                      >
                        -
                      </button>
                      <button 
                        onClick={() => setTemp(t => Math.min(28, t + 1))}
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
          )}

          {activeTab === 'tech' && (
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
          )}

          {activeTab === 'manuals' && (
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
          )}
        </main>
      </div>

      {isChatOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
          <div className="bg-white w-full max-w-5xl h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            <div className="bg-[#1E293B] text-white px-6 py-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
                  🔒 Contact Details Protected
                </span>
                <h2 className="font-bold text-base sm:text-lg">12 Oak Drive — Private Handover Chat</h2>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-mono border border-slate-700">
                  Passcode: HANDOVER-9823-OAK
                </span>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-slate-400 hover:text-white text-xl font-bold px-2 py-1 rounded-lg hover:bg-slate-800 transition"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'buyer' ? 'items-end' : 'items-start'}`}>
                  <span className="text-xs text-slate-500 mb-1">{msg.senderName} • {msg.timestamp}</span>
                  <div className={`max-w-md p-4 rounded-2xl ${
                    msg.sender === 'buyer' 
                      ? 'bg-emerald-600 text-white rounded-br-none shadow-sm' 
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    {msg.attachment && (
                      <div className="mt-3 rounded-lg overflow-hidden border border-slate-200/40">
                        <img src={msg.attachment.url} alt={msg.attachment.name} className="w-full h-36 object-cover" />
                        <span className="block text-xs p-1.5 bg-slate-900/80 text-slate-200">{msg.attachment.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-white border-t border-slate-200 space-y-3">
              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {[
                  "Where is the water shutoff valve?", 
                  "How do I reboot the solar inverter?", 
                  "What day is bin collection?"
                ].map(chip => (
                  <button 
                    key={chip}
                    onClick={() => handleSendMessage(chip)}
                    className="bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 px-3.5 py-1.5 rounded-full transition whitespace-nowrap font-medium"
                  >
                    + {chip}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a secure message to the seller..."
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-6 py-3 rounded-xl text-sm shadow-sm transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
