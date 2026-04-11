import React from 'react';
import { User, Camera, Mail, Phone, MapPin, Loader2 } from 'lucide-react';
import { type CandidateUser } from '@/shared/types';

interface ProfileHeaderProps {
  profile?: CandidateUser;
  isUploadingAvatar: boolean;
  onAvatarUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  profile, 
  isUploadingAvatar, 
  onAvatarUpload 
}) => {
  return (
    <header className="flex flex-col md:flex-row items-center gap-8 bg-[#0d2e36] p-8 rounded-3xl border border-teal-900/50 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
      
      <div className="relative group">
        <div className="w-32 h-32 rounded-full border-4 border-teal-500/20 overflow-hidden bg-teal-900/30 flex items-center justify-center">
          {profile?.avatar_url ? (
            <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User size={64} className="text-teal-800" />
          )}
          {isUploadingAvatar && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="animate-spin text-teal-400" />
            </div>
          )}
        </div>
        <label className="absolute bottom-0 right-0 p-2 bg-teal-500 hover:bg-teal-400 text-slate-900 rounded-full cursor-pointer transition-all shadow-lg">
          <Camera size={18} />
          <input type="file" onChange={onAvatarUpload} className="hidden" accept="image/*" />
        </label>
      </div>

      <div className="text-center md:text-left space-y-2 relative z-10">
        <h1 className="text-3xl font-bold uppercase tracking-tight">{profile?.full_name}</h1>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400">
          <span className="flex items-center gap-1.5"><Mail size={14} className="text-teal-500" /> {profile?.email}</span>
          {profile?.phone && <span className="flex items-center gap-1.5"><Phone size={14} className="text-teal-500" /> {profile.phone}</span>}
          {profile?.location && <span className="flex items-center gap-1.5"><MapPin size={14} className="text-teal-500" /> {profile.location}</span>}
        </div>
      </div>
    </header>
  );
};
