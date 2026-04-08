import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Briefcase, ChevronRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Freelancer'
  });
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      if (login(formData.email)) {
        navigate(location.state?.from || '/dashboard');
      } else {
        setError('Invalid email address (hint: use akshay@example.com)');
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError('All fields are required');
        return;
      }
      register(formData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px] pointer-events-none"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card p-8 relative overflow-hidden"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p className="text-slate-500 dark:text-slate-400">
            {isLogin ? 'Sign in to access your dashboard' : 'Join WorkNet and find your next opportunity'}
          </p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-3 mb-6 bg-red-100/50 dark:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 rounded-lg text-sm text-center"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field pl-10" 
                    placeholder="Akshay Mundra"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">I want to join as a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'Freelancer'})}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${formData.role === 'Freelancer' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'}`}
                  >
                    <Briefcase className="w-6 h-6" />
                    <span className="font-medium text-sm text-slate-800 dark:text-slate-200">Freelancer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({...formData, role: 'Client'})}
                    className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${formData.role === 'Client' ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'}`}
                  >
                    <User className="w-6 h-6" />
                    <span className="font-medium text-sm text-slate-800 dark:text-slate-200">Client</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field pl-10" 
                placeholder="akshay@example.com"
                required
              />
            </div>
            {isLogin && <p className="text-xs text-slate-500 mt-2">Demo: akshay@example.com or client@techflow.com</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field pl-10" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-3 flex justify-center items-center gap-2 group">
            {isLogin ? 'Sign In' : 'Create Account'}
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={handleToggle} className="text-primary font-medium hover:underline">
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
