import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Bell, Check, Briefcase, MessageSquare } from 'lucide-react';

const Notifications = () => {
  const { currentUser } = useAuth();
  const { notifications, markNotificationRead } = useData();

  const myNotifications = notifications
    .filter(n => n.userId === currentUser.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-slate-500">Stay updated on your relevant activities.</p>
        </div>
        <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <Bell className="w-6 h-6" />
        </div>
      </div>

      <div className="space-y-4">
        {myNotifications.length === 0 ? (
          <div className="glass-card p-12 text-center text-slate-500">
            No notifications right now.
          </div>
        ) : (
          myNotifications.map((note) => (
            <div 
              key={note.id} 
              className={`glass-card p-4 sm:p-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center cursor-pointer transition-colors ${
                !note.read ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-primary' : 'hover:border-slate-300 dark:hover:border-slate-600'
              }`}
              onClick={() => !note.read && markNotificationRead(note.id)}
            >
              <div className="flex gap-4 items-start">
                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  note.text.includes('message') ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                  : note.text.includes('bid') ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
                  : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {note.text.includes('message') ? <MessageSquare className="w-5 h-5" /> : <Briefcase className="w-5 h-5" />}
                </div>
                <div>
                  <p className={`text-sm md:text-base ${!note.read ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                    {note.text}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(note.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              {!note.read && (
                <button 
                  onClick={(e) => { e.stopPropagation(); markNotificationRead(note.id); }}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-full shrink-0"
                  title="Mark as read"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
