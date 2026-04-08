import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { Search, Filter, Briefcase, MapPin, DollarSign, Clock, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Jobs = () => {
  const { jobs } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isListening, setIsListening] = useState(false);

  const categories = ['All', 'Web Development', 'Design', 'Backend', 'Marketing'];

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
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Find Work</h1>
        <p className="text-slate-500 text-lg">Discover and apply for remote freelance jobs curated for you.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" /> Search
            </h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Keywords or skills" 
                className="input-field pr-10"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button 
                onClick={handleVoiceSearch}
                className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${isListening ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary'}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" /> Categories
            </h3>
            <div className="space-y-3">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category"
                    checked={categoryFilter === cat}
                    onChange={() => setCategoryFilter(cat)}
                    className="w-4 h-4 border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm transition-colors ${categoryFilter === cat ? 'text-blue-600 font-semibold' : 'text-slate-600 dark:text-slate-400 group-hover:text-blue-500'}`}>{cat}</span>
                </label>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{filteredJobs.length} Jobs Found</h2>
            <select className="input-field max-w-[200px] py-1 text-sm">
              <option>Newest First</option>
              <option>Budget: High to Low</option>
              <option>Budget: Low to High</option>
            </select>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredJobs.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass-card p-12 text-center"
              >
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                <p className="text-slate-500">Try adjusting your filters or search terms.</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job, index) => (
                  <motion.div 
                    layout
                    key={job.id} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="glass-card p-6 group hover:translate-y-[-4px] transition-all duration-300 border-l-4 border-l-transparent hover:border-l-primary"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <Link to={`/jobs/${job.id}`}>
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                        </Link>
                        <p className="text-primary font-medium text-sm mt-1">{job.company}</p>
                      </div>
                      <button className="text-slate-400 hover:text-red-500 pt-1 transition-colors">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-slate-400"/> {job.postedAt}</div>
                      <div className="flex items-center gap-1"><DollarSign className="w-4 h-4 text-green-500"/> {job.budget}</div>
                      <div className="flex items-center gap-1"><MapPin className="w-4 h-4 text-slate-400"/> Remote</div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-2">
                      {job.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded-full text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {skill}
                        </span>
                      ))}
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

