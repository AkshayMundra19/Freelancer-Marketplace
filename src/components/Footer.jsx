import React from 'react';
import { Briefcase, Twitter, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">WorkNet</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
              Connect with top freelancers and clients around the world. Build your dream team or find your next big project.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">For Clients</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">How to hire</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Talent Marketplace</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Payment Options</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-slate-800 dark:text-slate-200">For Freelancers</h4>
            <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
              <li><a href="#" className="hover:text-primary transition-colors">How to find work</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Create a Profile</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} WorkNet. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
