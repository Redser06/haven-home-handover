import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TechGuide } from './components/TechGuide';
import { Manuals } from './components/Manuals';
import { ChatWindow } from './components/ChatWindow';

export interface Message {
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

export interface AppProps {
  address?: string;
  token?: string;
  messages?: Message[];
}

export default function App({ address = '', token = '', messages: initialMessages = [] }: AppProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [temp, setTemp] = useState(21);
  const [heatingMode, setHeatingMode] = useState('Scheduled');
  const [evMode, setEvMode] = useState('Eco+');
  const [showKeySafe, setShowKeySafe] = useState(false);

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <Header address={address} messagesLength={messages.length} setIsChatOpen={setIsChatOpen} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar token={token} activeTab={activeTab} setActiveTab={setActiveTab} setIsChatOpen={setIsChatOpen} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <Dashboard 
              address={address}
              temp={temp} setTemp={setTemp}
              heatingMode={heatingMode} setHeatingMode={setHeatingMode}
              evMode={evMode} setEvMode={setEvMode}
              showKeySafe={showKeySafe} setShowKeySafe={setShowKeySafe}
              setIsChatOpen={setIsChatOpen}
            />
          )}

          {activeTab === 'tech' && <TechGuide />}

          {activeTab === 'manuals' && <Manuals />}
        </main>
      </div>

      {isChatOpen && (
        <ChatWindow address={address} token={token} messages={messages} setMessages={setMessages} setIsChatOpen={setIsChatOpen} />
      )}
    </div>
  );
}
