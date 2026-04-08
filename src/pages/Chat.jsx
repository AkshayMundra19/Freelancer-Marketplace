import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Send, User as UserIcon } from 'lucide-react';

const Chat = () => {
  const { currentUser } = useAuth();
  const { messages, addMessage } = useData();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // For simulation, we assume chat with the "other" mocked user.
  // If currentUser is ID 1, chat with ID 2. Else chat with ID 1.
  const contactId = currentUser.id === 1 ? 2 : 1;
  const contactName = currentUser.id === 1 ? 'TechFlow Solutions' : 'Akshay Mundra';

  const chatMessages = messages.filter(m => 
    (m.senderId === currentUser.id && m.receiverId === contactId) ||
    (m.senderId === contactId && m.receiverId === currentUser.id)
  ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    addMessage({
      senderId: currentUser.id,
      receiverId: contactId,
      text: newMessage
    });
    setNewMessage('');

    // Simulate auto-reply after 2 seconds
    setTimeout(() => {
      addMessage({
        senderId: contactId,
        receiverId: currentUser.id,
        text: "Thanks for your message. This is an auto-reply simulation by the frontend.",
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="glass-card flex flex-col h-[600px] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <UserIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold">{contactName}</h3>
            <p className="text-xs text-green-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
            </p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex justify-center items-center h-full text-slate-500">
              Start the conversation
            </div>
          ) : (
            chatMessages.map((msg, idx) => {
              const isMine = msg.senderId === currentUser.id;
              return (
                <div key={idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl p-3 ${
                    isMine 
                      ? 'bg-primary text-white rounded-tr-none' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${isMine ? 'text-blue-100' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input-field rounded-full"
            />
            <button type="submit" disabled={!newMessage.trim()} className="p-3 bg-primary text-white rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
