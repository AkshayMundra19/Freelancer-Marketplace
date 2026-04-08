import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Code, PenTool, Layout, Database, Terminal } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const categories = [
  { name: 'Web Dev', icon: <Code className="w-6 h-6" />, count: '2.4k' },
  { name: 'Design', icon: <PenTool className="w-6 h-6" />, count: '1.2k' },
  { name: 'UI/UX', icon: <Layout className="w-6 h-6" />, count: '850' },
  { name: 'Backend', icon: <Database className="w-6 h-6" />, count: '1.8k' },
  { name: 'DevOps', icon: <Terminal className="w-6 h-6" />, count: '420' },
];

const Home = () => {
  const { jobs } = useData();
  const recentJobs = jobs.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
          >
            Find the perfect <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">freelance</span> services for your business
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10"
          >
            Connect with a global network of top-tier talent. Manage projects confidently with secure simulated payments and reviews.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="max-w-2xl mx-auto glass-card p-2 flex flex-col md:flex-row gap-2"
          >
            <div className="relative flex-grow flex items-center">
              <Search className="absolute left-4 text-slate-400 w-5 h-5" />
              <input 
                type="text" 
                placeholder="Try 'React Developer' or 'UI Designer'..." 
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-transparent border-none focus:ring-0 text-slate-800 dark:text-white placeholder-slate-400"
              />
            </div>
            <button className="btn-primary py-4 px-8 rounded-xl shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 justify-center">
              Search <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse by category</h2>
              <p className="text-slate-500 dark:text-slate-400">Discover top talent across various fields</p>
            </div>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {categories.map((cat, idx) => (
              <motion.div key={idx} variants={itemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h3 className="font-semibold">{cat.name}</h3>
                <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">{cat.count} skills</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Opportunities</h2>
              <p className="text-slate-500 dark:text-slate-400">Latest jobs posted by top clients</p>
            </div>
            <Link to="/jobs" className="text-blue-500 font-medium hover:text-blue-600 flex items-center gap-1 group">
              View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <motion.div 
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full">
                      {job.category}
                    </span>
                    <span className="text-sm text-slate-500">• {job.postedAt}</span>
                  </div>
                  <Link to={`/jobs/${job.id}`}>
                    <h3 className="text-xl font-bold hover:text-blue-500 transition-colors">{job.title}</h3>
                  </Link>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm max-w-3xl line-clamp-2">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-slate-100 dark:bg-slate-800 rounded-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 shrink-0 boundary min-w-[200px]">
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{job.budget}</p>
                    <p className="text-sm text-slate-500">{job.type}</p>
                  </div>
                  <Link to={`/jobs/${job.id}`} className="btn-primary py-2 px-6">
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
