import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Star, Code, PenTool, Layout, Database, Terminal, Sparkles, GraduationCap, Briefcase as BriefcaseIcon, Shield, Clock } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import FloatingGeometric from '../components/FloatingGeometric';

const categories = [
  { name: 'Web Dev', icon: <Code className="w-6 h-6" />, count: '2.4k' },
  { name: 'Design', icon: <PenTool className="w-6 h-6" />, count: '1.2k' },
  { name: 'UI/UX', icon: <Layout className="w-6 h-6" />, count: '850' },
  { name: 'Backend', icon: <Database className="w-6 h-6" />, count: '1.8k' },
  { name: 'DevOps', icon: <Terminal className="w-6 h-6" />, count: '420' },
];

const Home = () => {
  const { jobs } = useData();
  const featuredJobs = jobs.filter(j => j.type !== 'Internship').slice(0, 3);
  const featuredInternships = jobs.filter(j => j.type === 'Internship').slice(0, 3);

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
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold mb-6 border border-primary/20">
                <Sparkles className="w-4 h-4" /> Next-Gen Career Discovery
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                Build your <br/>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                  Future
                </span> 
                <br/>
                today.
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-lg mb-10 leading-relaxed font-medium">
                The world's first AI-driven marketplace for both Freelancers and Interns. Connect, collaborate, and grow with WorkNet.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/jobs" className="btn-primary px-10 py-4 text-lg font-bold shadow-2xl shadow-primary/30 active:scale-95 transition-all">
                  Get Started
                </Link>
                <button className="px-8 py-4 rounded-xl border-2 border-slate-200 dark:border-slate-800 font-bold hover:bg-slate-100 dark:hover:bg-slate-900 transition-all active:scale-95">
                  How it Works
                </button>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-950 object-cover" alt="User" />
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold">Join 50K+ talent</p>
                  <p className="text-slate-500">Waitlist almost full!</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative hidden lg:block"
            >
              <FloatingGeometric />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-400 font-bold uppercase tracking-widest text-sm">
          <span>Trusted by innovators at:</span>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <span className="text-2xl">Google</span>
            <span className="text-2xl">Meta</span>
            <span className="text-2xl">SpaceX</span>
            <span className="text-2xl">Netflix</span>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Freelancing Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="relative p-12 rounded-[2rem] bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden shadow-2xl group"
            >
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
              <BriefcaseIcon className="w-16 h-16 mb-8 text-blue-200" />
              <h2 className="text-4xl font-black mb-4 tracking-tighter">Freelance <br/>Opportunity</h2>
              <p className="text-blue-100 text-lg mb-8 max-w-md">
                Find high-paying projects, build your portfolio, and work with clients worldwide on your own terms.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 font-semibold"><Shield className="w-5 h-5" /> Secured Payments</div>
                <div className="flex items-center gap-3 font-semibold"><Star className="w-5 h-5" /> Verified Clients</div>
              </div>
              <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-xl font-black hover:bg-blue-50 transition-all">
                Find Freelance Work <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            {/* Internship Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="relative p-12 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 text-white overflow-hidden shadow-2xl group"
            >
              <div className="absolute -right-16 -top-16 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
              <GraduationCap className="w-16 h-16 mb-8 text-emerald-200" />
              <h2 className="text-4xl font-black mb-4 tracking-tighter">Paid <br/>Internships</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-md">
                Kickstart your career with internships from top companies. Gain real-world experience and get paid.
              </p>
              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 font-semibold"><Star className="w-5 h-5" /> Mentorship Included</div>
                <div className="flex items-center gap-3 font-semibold"><Sparkles className="w-5 h-5" /> PPO Opportunities</div>
              </div>
              <Link to="/jobs?type=Internship" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-600 rounded-xl font-black hover:bg-emerald-50 transition-all">
                Browse Internships <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-black mb-3 italic">Hiring Now</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Featured Freelance Gigs</p>
            </div>
            <Link to="/jobs" className="text-primary font-black flex items-center gap-2 group">
              VIEW ALL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Internships Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16 text-right">
            <Link to="/jobs?type=Internship" className="text-emerald-500 font-black flex items-center gap-2 group">
              VIEW ALL <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <div>
              <h2 className="text-4xl font-black mb-3 italic">Fresh Talent</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Internship Opportunities</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredInternships.map((job) => (
              <JobCard key={job.id} job={job} color="emerald" />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-slate-900 text-white p-12 md:p-24 relative overflow-hidden text-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
           <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600 rounded-full blur-[100px] opacity-40"></div>
           <div className="absolute -right-20 -top-20 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-40"></div>
           <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 relative z-10">Ready to level up?</h2>
           <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto relative z-10">
             Join the ecosystem that prioritizes talent over everything else. 
             Sign up in seconds and start your journey.
           </p>
           <div className="flex flex-wrap justify-center gap-6 relative z-10">
             <Link to="/register" className="btn-primary px-12 py-5 text-xl font-bold shadow-2xl">Sign Up as Freelancer</Link>
             <Link to="/register?role=Client" className="px-12 py-5 text-xl font-bold rounded-2xl bg-white text-slate-900 hover:bg-slate-100 transition-all active:scale-95">Post a Job / Internship</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

const JobCard = ({ job, color = "blue" }) => {
  const accentClass = color === "emerald" ? "text-emerald-500 bg-emerald-100 dark:bg-emerald-900/30" : "text-blue-600 bg-blue-100 dark:bg-blue-900/40";
  const borderHover = color === "emerald" ? "hover:border-emerald-500/50" : "hover:border-primary/50";

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={`glass-card p-8 flex flex-col h-full border-2 border-transparent transition-all ${borderHover}`}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`w-14 h-14 rounded-2xl ${accentClass} flex items-center justify-center font-black text-2xl`}>
          {job.company?.[0]}
        </div>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${accentClass}`}>
          {job.type}
        </span>
      </div>
      <Link to={`/jobs/${job.id}`}>
        <h3 className="text-xl font-black mb-2 hover:text-primary transition-colors line-clamp-1">{job.title}</h3>
      </Link>
      <p className="text-slate-500 font-bold text-sm mb-6">{job.company}</p>
      <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.postedAt}</span>
        <span className="flex items-center gap-1.5"><UsersIcon className="w-3.5 h-3.5" /> {job.applicants}</span>
      </div>
      <div className="mt-auto flex justify-between items-center">
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-0.5">{job.type === 'Internship' ? 'Stipend' : 'Budget'}</p>
          <p className="text-lg font-black text-slate-900 dark:text-white">{job.type === 'Internship' ? job.stipend : job.budget}</p>
        </div>
        <Link to={`/jobs/${job.id}`} className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
};

const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
);

export default Home;

