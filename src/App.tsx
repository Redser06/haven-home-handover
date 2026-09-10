import { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TechGuide } from './components/TechGuide';
import { Manuals } from './components/Manuals';
import { ChatWindow } from './components/ChatWindow';

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

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
      <Header messagesLength={messages.length} setIsChatOpen={setIsChatOpen} />

      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} setIsChatOpen={setIsChatOpen} />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'dashboard' && (
            <Dashboard 
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
        <ChatWindow messages={messages} setMessages={setMessages} setIsChatOpen={setIsChatOpen} />
      )}
    </div>
  );
}
