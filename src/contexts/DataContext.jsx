import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialJobs, initialBids, initialMessages, initialNotifications } from '../data/mockData';
import { useAuth } from './AuthContext';

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  
  const [jobs, setJobs] = useState([]);
  const [bids, setBids] = useState([]);
  const [messages, setMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize data from local storage or mock data
    const loadData = (key, initialData) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }
      localStorage.setItem(key, JSON.stringify(initialData));
      return initialData;
    };

    setJobs(loadData('jobs', initialJobs));
    setBids(loadData('bids', initialBids));
    setMessages(loadData('messages', initialMessages));
    setNotifications(loadData('notifications', initialNotifications));
  }, []);

  // Sync to local storage when state changes
  useEffect(() => { if (jobs.length) localStorage.setItem('jobs', JSON.stringify(jobs)); }, [jobs]);
  useEffect(() => { if (bids.length) localStorage.setItem('bids', JSON.stringify(bids)); }, [bids]);
  useEffect(() => { if (messages.length) localStorage.setItem('messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { if (notifications.length) localStorage.setItem('notifications', JSON.stringify(notifications)); }, [notifications]);

  // Actions
  const addJob = (job) => {
    const newJob = { ...job, id: Date.now(), postedAt: 'Just now', status: 'open', applicants: 0 };
    setJobs([newJob, ...jobs]);
  };

  const addBid = (bid) => {
    const newBid = { ...bid, id: Date.now(), status: 'pending' };
    setBids([newBid, ...bids]);
    // update job applicants count
    setJobs(jobs.map(j => j.id === bid.jobId ? { ...j, applicants: j.applicants + 1 } : j));
  };

  const addMessage = (message) => {
    const newMsg = { ...message, id: Date.now(), timestamp: new Date().toISOString() };
    setMessages([...messages, newMsg]);
  };

  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <DataContext.Provider value={{
      jobs, addJob,
      bids, addBid,
      messages, addMessage,
      notifications, markNotificationRead
    }}>
      {children}
    </DataContext.Provider>
  );
};
