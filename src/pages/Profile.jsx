import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Camera, Edit3, MapPin, Globe, CheckCircle } from 'lucide-react';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio || '',
    skills: currentUser.skills?.join(', ') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean)
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="relative mb-20">
        <div className="h-48 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 object-cover"></div>
        <div className="absolute -bottom-12 left-10 flex items-end gap-6">
          <div className="relative group">
            <img src={currentUser.avatar} alt="Avatar" className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800 object-cover" />
            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="pb-2">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              {currentUser.name} <CheckCircle className="w-5 h-5 text-blue-500" />
            </h1>
            <p className="text-slate-500 font-medium">{currentUser.role}</p>
          </div>
        </div>
        {!isEditing && (
          <button onClick={() => setIsEditing(true)} className="absolute -bottom-6 right-6 btn-primary flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Edit Profile
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea rows="4" value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="input-field resize-none"></textarea>
              </div>
              {currentUser.role === 'Freelancer' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Skills (comma separated)</label>
                  <input type="text" value={formData.skills} onChange={e => setFormData({...formData, skills: e.target.value})} className="input-field" placeholder="React, Node.js, Design" />
                </div>
              )}
              <div className="flex gap-2">
                <button type="submit" className="btn-primary">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">Cancel</button>
              </div>
            </form>
          ) : (
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {currentUser.bio || 'No bio provided yet.'}
              </p>
            </div>
          )}

          {currentUser.role === 'Freelancer' && !isEditing && (
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills?.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800/50">
                    {skill}
                  </span>
                )) || <p className="text-slate-500 text-sm">No skills listed.</p>}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="font-semibold mb-4">Details</h3>
            <ul className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-3"><MapPin className="w-5 h-5 text-slate-400" /> New York, USA</li>
              <li className="flex items-center gap-3"><Globe className="w-5 h-5 text-slate-400" /> English, Spanish</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5 text-slate-400" /> Member since 2023</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
