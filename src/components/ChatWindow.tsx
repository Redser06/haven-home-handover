import { useState } from 'react';

interface Message {
  id: string;
  sender: string;
  senderName: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    url: string;
  };
}

interface ChatWindowProps {
  address: string;
  token: string;
  messages: Message[];
  setMessages: (fn: (prev: Message[]) => Message[]) => void;
  setIsChatOpen: (val: boolean) => void;
}

export function ChatWindow({ address, token, messages, setMessages, setIsChatOpen }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'buyer',
      senderName: 'Mike L. (Buyer)',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev: Message[]) => [...prev, newMsg]);
    if (!textToSend) setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white w-full max-w-5xl h-[88vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        <div className="bg-[#1E293B] text-white px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-500/30">
              🔒 Contact Details Protected
            </span>
            <h2 className="font-bold text-base sm:text-lg">{address} — Private Handover Chat</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg font-mono border border-slate-700">
              Passcode: {token}
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
          {messages.map((msg: Message) => (
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
  );
}
