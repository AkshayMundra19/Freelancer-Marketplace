import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, Mic, MicOff, Star, GraduationCap, Briefcase as BriefcaseIcon, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Jobs = () => {
  const { jobs } = useData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState(searchParams.get('type') || 'All');
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const type = searchParams.get('type');
    if (type) setTypeFilter(type);
  }, [searchParams]);

  const categories = ['All', 'Web Development', 'Design', 'Backend', 'Marketing', 'Security', 'Data Science', 'Content Creation', 'Web3', 'Management'];
  const types = ['All', 'Full-time', 'Contract', 'Project', 'Internship'];

  const handleVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.start();
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'All' || job.category === categoryFilter;
    const matchesType = typeFilter === 'All' || job.type === typeFilter;
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BriefcaseIcon className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white">Explore Roles</h1>
            <p className="text-slate-500 font-medium">Find your next big opportunity or career-defining internship.</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-8"
          >
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Search className="w-4 h-4" /> Quick Search
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Keywords or skills" 
                className="input-field pr-10 !bg-slate-50 dark:!bg-slate-900/50"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button 
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary'}`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Opportunity Type
            </h3>
            <div className="flex flex-wrap gap-2">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${typeFilter === type ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-8"
          >
            <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Star className="w-4 h-4" /> Industry
            </h3>
            <div className="space-y-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${categoryFilter === cat ? 'bg-slate-100 dark:bg-slate-800 text-primary' : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900/40 hover:text-slate-700 dark:hover:text-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300">
              Showing <span className="text-primary">{filteredJobs.length}</span> outcomes
            </div>
            <select className="bg-transparent border-none font-bold text-sm text-slate-500 focus:ring-0 cursor-pointer">
              <option>Relevance</option>
              <option>Budget: High to Low</option>
              <option>Date Posted</option>
            </select>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredJobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-20 text-center border-dashed border-2"
              >
                <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <Briefcase className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black mb-2 italic">Nothing matches...</h3>
                <p className="text-slate-500 font-medium">Try broadening your search or switching filters.</p>
                <button 
                   onClick={() => {setSearchTerm(''); setTypeFilter('All'); setCategoryFilter('All');}}
                   className="mt-8 px-6 py-2 bg-primary text-white font-bold rounded-xl shadow-lg"
                >
                  Reset All Filters
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job, index) => (
                  <motion.div 
                    layout
                    key={job.id} 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-8 group hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                  >
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                       {job.type === 'Internship' ? <GraduationCap className="w-32 h-32" /> : <Briefcase className="w-32 h-32" />}
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8 justify-between relative z-10">
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-xl shadow-inner ${job.type === 'Internship' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30' : 'bg-primary/10 text-primary'}`}>
                            {job.company?.[0]}
                          </div>
                          <div>
                            <Link to={`/jobs/${job.id}`}>
                              <h3 className="text-2xl font-black italic tracking-tight group-hover:text-primary transition-colors">{job.title}</h3>
                            </Link>
                            <p className="text-slate-500 font-bold uppercase tracking-tight text-xs">{job.company}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 text-xs font-black text-slate-400 mb-6 uppercase tracking-widest">
                          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.postedAt}</span>
                          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> Remote</span>
                          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-primary">{job.type}</span>
                        </div>

                        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2 max-w-2xl">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map(skill => (
                            <span key={skill} className="px-4 py-1.5 bg-slate-50 dark:bg-slate-900/50 text-[11px] font-black italic tracking-tight rounded-lg text-slate-500 border border-slate-200 dark:border-slate-800">
                              #{skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col justify-between items-end min-w-[120px]">
                        <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{job.type === 'Internship' ? 'Stipend' : 'Estimated Budget'}</p>
                          <p className="text-2xl font-black text-slate-900 dark:text-white">
                            {job.type === 'Internship' ? job.stipend : job.budget}
                          </p>
                        </div>
                        <Link to={`/jobs/${job.id}`} className="w-14 h-14 rounded-[1.5rem] bg-slate-900 dark:bg-white dark:text-slate-900 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xl">
                          <ArrowRight className="w-6 h-6" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Jobs;


