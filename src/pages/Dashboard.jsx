import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { Briefcase, CreditCard, Clock, Star, Activity, PieChart, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { jobs, bids } = useData();

  const isClient = currentUser?.role === 'Client';

  const stats = isClient 
    ? [
        { label: 'Active Jobs', value: jobs.filter(j => j.status === 'open' && j.company === currentUser.company).length, icon: <Briefcase /> },
        { label: 'Total Spent', value: `$${currentUser.totalSpent || 0}`, icon: <CreditCard /> },
        { label: 'Avg Rating', value: currentUser.rating || 0, icon: <Star /> },
      ]
    : [
        { label: 'Active Bids', value: bids.filter(b => b.freelancerId === currentUser.id).length, icon: <Activity /> },
        { label: 'Earnings', value: `$${currentUser.earnings || 0}`, icon: <PieChart /> },
        { label: 'Completed', value: currentUser.completedJobs || 0, icon: <Clock /> },
      ];

  const recentActivity = isClient 
    ? jobs.filter(j => j.company === currentUser.company)
    : bids.filter(b => b.freelancerId === currentUser.id).map(b => ({ ...b, job: jobs.find(j => j.id === b.jobId) }));

  // AI Recommendation Logic (Innovative Feature)
  const recommendedJobs = !isClient ? jobs.filter(job => 
    job.skills.some(skill => currentUser.skills?.includes(skill))
  ).slice(0, 2) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold mb-2">Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">{currentUser.name}!</span></h1>
          <p className="text-slate-500 font-medium">Here's a quick overview of your latest activity and recommendations.</p>
        </div>
        {isClient && (
          <button className="btn-primary shadow-lg shadow-blue-500/20" onClick={() => alert('Post job modal would open here in full version')}>
            Post a New Job
          </button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-6 flex items-center gap-4 hover:border-primary/50 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-semibold mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* AI Recommendations */}
          {!isClient && recommendedJobs.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <h2 className="text-xl font-bold italic">AI Recommendations for you</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedJobs.map((job) => (
                  <motion.div 
                    key={job.id} 
                    whileHover={{ scale: 1.02 }}
                    className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20"
                  >
                    <h3 className="font-bold mb-2 line-clamp-1">{job.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-4">
                      <span>{job.budget}</span> • <span>{job.type}</span>
                    </div>
                    <Link to={`/jobs/${job.id}`} className="text-xs font-bold text-primary flex items-center gap-1">
                      View Recommendation <ArrowRight className="w-3 h-3" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">{isClient ? 'Your Posted Jobs' : 'Your Recent Bids'}</h2>
              <Link to="/jobs" className="text-sm font-bold text-primary hover:underline">Explore More</Link>
            </div>

            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <div className="glass-card p-10 text-center text-slate-500 border-dashed border-2">
                  <Activity className="w-10 h-10 mx-auto mb-3 opacity-20" />
                  No recent activity to show.
                </div>
              ) : (
                recentActivity.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card p-6 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div>
                      <Link to={`/jobs/${isClient ? item.id : item.jobId}`}>
                        <h3 className="font-bold text-lg hover:text-primary transition-colors">
                          {isClient ? item.title : item.job?.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-slate-500 mt-1">
                        {isClient ? `${item.applicants} Applicants • Posted ${item.postedAt}` : `Bid Amount: ${item.amount} • Status: ${item.status}`}
                      </p>
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      item.status === 'open' || item.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500' : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    }`}>
                      {item.status}
                    </span>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" /> Reputation
            </h2>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Profile Completion</span>
              <span className="text-sm font-bold text-green-500">85%</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700/50 rounded-full h-3 mb-8 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-full"
              ></motion.div>
            </div>
            <ul className="space-y-4 text-sm font-medium">
              <li className="flex items-center gap-3 text-green-500"><CheckIcon /> Add Avatar</li>
              <li className="flex items-center gap-3 text-green-500"><CheckIcon /> Verify Email</li>
              <li className="flex items-center gap-3 text-slate-400"><CircleIcon /> Add Portfolio Items</li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 text-white shadow-2xl overflow-hidden relative group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-500 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Freelancers with a complete bio are 3x more likely to be hired by top companies. Update yours today!
            </p>
            <Link to="/profile" className="mt-4 text-blue-400 text-xs font-bold uppercase tracking-widest hover:text-blue-300 flex items-center gap-2">
              Go to Profile <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
  </div>
);

const CircleIcon = () => (
  <div className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700"></div>
);

export default Dashboard;

