'use client';

import { ProfileData } from '@/lib/types';
import { User, Target, Lightbulb, Compass, Award, CheckCircle2 } from 'lucide-react';

interface AboutProps {
  profile: ProfileData;
  softSkills?: string[];
  languages?: { language: string; proficiency: string }[];
  interests?: string[];
}

export default function AboutSection({ profile, softSkills = [], languages = [], interests = [] }: AboutProps) {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Driven by curiosity, powered by software & IoT
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-sky-400 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main About Summary Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <span>Professional Overview</span>
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                {profile.about || 'Passionate and motivated Computer Science Engineering student with strong skills in full stack web development, IoT, AI tools, data analytics, and problem solving.'}
              </p>
              <p className="text-slate-400 leading-relaxed text-sm sm:text-base mt-4">
                Currently pursuing a Bachelor of Technology (B.Tech) in Software Engineering at Suryodaya College of Engineering & Technology. I actively build full-stack web applications, IoT home automation systems, and participate in hackathons (like NIT Nagpur Hackathon with team AuraTechRebels).
              </p>
            </div>

            {/* Core Values & Soft Skills */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
                <span>Soft Skills & Professional Qualities</span>
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {(softSkills.length > 0 ? softSkills : [
                  'Problem Solving', 'Time Management', 'Teamwork & Collaboration',
                  'Communication', 'Adaptability', 'Punctuality & Discipline', 'Hardworking & Honest'
                ]).map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 text-xs font-medium flex items-center gap-1.5 shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Languages & Interests */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Spoken Languages */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <span>Languages</span>
              </h3>
              <div className="space-y-3">
                {(languages.length > 0 ? languages : [
                  { language: 'English', proficiency: 'Fluent' },
                  { language: 'Hindi', proficiency: 'Fluent' },
                  { language: 'Urdu', proficiency: 'Conversational' }
                ]).map((lang) => (
                  <div key={lang.language} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                    <span className="text-sm font-semibold text-white">{lang.language}</span>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300 font-mono">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Interest */}
            <div className="glass-card rounded-2xl p-6 border border-slate-800">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-400" />
                <span>Technical Interests</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {(interests.length > 0 ? interests : [
                  'Coding', 'IoT', 'AI Tools', 'Cybersecurity', 'Reading Tech Blogs', 'Exploring New Tech', 'Hackathons', 'Data Analytics'
                ]).map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1.5 rounded-lg bg-indigo-950/50 border border-indigo-800/40 text-indigo-300 text-xs font-medium"
                  >
                    #{interest}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
