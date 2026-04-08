import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MapPin, DollarSign, Clock, Users, ArrowLeft, Send, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { jobs, addBid } = useData();
  const { currentUser } = useAuth();
  
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const job = jobs.find(j => j.id === parseInt(id));

  useEffect(() => {
    // Skeleton loading effect
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4 opacity-20" />
        <h2 className="text-2xl font-bold mb-2">Job not found</h2>
        <button onClick={() => navigate('/jobs')} className="text-primary font-bold">Back to listings</button>
      </div>
    );
  }

  const handleBidSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    addBid({
      jobId: job.id,
      freelancerId: currentUser.id,
      amount: bidAmount,
      coverLetter
    });
    
    setShowBidModal(false);
    alert('Bid submitted successfully! You can track it in your dashboard.');
  };

  const handleSmartSuggestion = () => {
    // AI logic: Suggest 10% below max budget to be competitive
    const budgetMatch = job.budget.match(/\$(\d+[\d,]*)/);
    if (budgetMatch) {
      const budgetVal = parseInt(budgetMatch[1].replace(/,/g, ''));
      const suggested = Math.floor(budgetVal * 0.9);
      setBidAmount(`$${suggested.toLocaleString()}`);
    } else if (job.budget.includes('/ hr')) {
      const hourlyMatch = job.budget.match(/\$(\d+)/);
      if (hourlyMatch) {
        setBidAmount(`$${hourlyMatch[1]} / hr`);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="skeleton h-8 w-32 mb-8"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-8 h-96 skeleton"></div>
          </div>
          <div className="space-y-6">
            <div className="glass-card p-6 h-64 skeleton"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative"
    >
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-primary mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to jobs
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Job Details */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="glass-card p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-4xl font-black mb-3">{job.title}</h1>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {job.category}
                  </span>
                  <span className="text-slate-400 text-sm font-medium">Remote Job</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-slate-500 dark:text-slate-400 py-6 border-y border-slate-200 dark:border-slate-800/50 mb-8">
              <div className="flex items-center gap-2"><Clock className="w-5 h-5 opacity-70"/> <span className="font-medium">Posted {job.postedAt}</span></div>
              <div className="flex items-center gap-2"><MapPin className="w-5 h-5 opacity-70"/> <span className="font-medium">Worldwide</span></div>
              <div className="flex items-center gap-2"><Users className="w-5 h-5 opacity-70"/> <span className="font-medium">{job.applicants} Applicants</span></div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">About the job</h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {job.description}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Desired Skills</h3>
              <div className="flex flex-wrap gap-3">
                {job.skills.map(skill => (
                  <span key={skill} className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-700 transition-colors hover:border-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            
            <h3 className="font-bold text-xl mb-6 items-center flex gap-2">
              <DollarSign className="w-5 h-5 text-green-500" /> Compensation
            </h3>
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 mb-8 border border-slate-200 dark:border-slate-700">
              <p className="text-3xl font-black text-slate-900 dark:text-white mb-2">{job.budget}</p>
              <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">{job.type}</p>
            </div>

            {!showBidModal ? (
              <button 
                onClick={() => currentUser?.role === 'Client' ? alert('Clients cannot bid on jobs.') : setShowBidModal(true)} 
                className="w-full btn-primary py-4 text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-transform flex justify-center items-center gap-2"
                disabled={currentUser?.role === 'Client'}
              >
                Apply Now <Send className="w-5 h-5" />
              </button>
            ) : (
              <motion.form 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                onSubmit={handleBidSubmit} 
                className="space-y-5"
              >
                <div className="flex justify-between items-center bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl mb-2">
                   <div className="flex items-center gap-2 text-xs font-bold text-yellow-600 dark:text-yellow-500">
                     <Sparkles className="w-4 h-4" /> AI Suggestion Available
                   </div>
                   <button 
                    type="button"
                    onClick={handleSmartSuggestion}
                    className="text-[10px] bg-yellow-500 text-white px-2 py-1 rounded-md font-black uppercase hover:bg-yellow-600 transition-colors"
                   >
                     Apply
                   </button>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Your Proposal Amount</label>
                  <input 
                    type="text" 
                    required 
                    value={bidAmount} 
                    onChange={e => setBidAmount(e.target.value)} 
                    placeholder="e.g. $4,000" 
                    className="input-field py-3" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Cover Letter</label>
                  <textarea 
                    required 
                    value={coverLetter} 
                    onChange={e => setCoverLetter(e.target.value)} 
                    rows="6" 
                    className="input-field resize-none py-3" 
                    placeholder="Briefly explain why you're a good fit..."
                  ></textarea>
                </div>
                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 btn-primary py-3 font-bold">Submit Application</button>
                  <button type="button" onClick={() => setShowBidModal(false)} className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-bold text-sm transition-colors">Cancel</button>
                </div>
              </motion.form>
            )}
          </div>

          <div className="glass-card p-8">
            <h3 className="font-bold text-xl mb-6">Client Info</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
                {job.company.charAt(0)}
              </div>
              <div>
                <p className="font-black text-lg">{job.company}</p>
                <div className="flex items-center gap-1 text-sm text-yellow-500 font-bold">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-slate-300">★</span> (4.8)
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm font-medium text-slate-500">
              <p>Member since <span className="text-slate-900 dark:text-slate-200">Late 2023</span></p>
              <p><span className="text-slate-900 dark:text-slate-200">15</span> Jobs Published</p>
              <p><span className="text-slate-900 dark:text-slate-200">$45K+</span> Total Payments</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default JobDetails;

