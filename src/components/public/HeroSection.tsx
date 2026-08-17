'use client';

import { ProfileData } from '@/lib/types';
import { Github, Linkedin, Mail, Download, ArrowRight, MapPin, Sparkles, Code, Cpu, Database, Award } from 'lucide-react';

interface HeroProps {
  profile: ProfileData;
  onOpenResumeModal: () => void;
}

export default function HeroSection({ profile, onOpenResumeModal }: HeroProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[250px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-indigo-500/30 text-indigo-300 text-xs font-semibold tracking-wide">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Available for Internships & Projects</span>
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Hi, I&apos;m{' '}
                <span className="gradient-text">{profile.fullName || 'Mohammad Raza'}</span>
              </h1>
              <h2 className="mt-3 text-xl sm:text-2xl font-semibold text-slate-300 flex items-center gap-2">
                <span className="text-sky-400">{profile.title || 'Computer Science Engineering Student'}</span>
              </h2>
            </div>

            {/* Headline / Summary */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
              {profile.headline || 'Passionate CSE student skilled in Full-Stack Web Development, Embedded IoT Systems, AI Tools, and Data Analytics.'}
            </p>

            {/* Location & Quick Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-4 h-4 text-indigo-400" />
                <span>{profile.location || 'Maharashtra, India'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-1.5 rounded-lg border border-slate-800">
                <Mail className="w-4 h-4 text-sky-400" />
                <span>{profile.email || 'razasheikh092007@gmail.com'}</span>
              </div>
            </div>

            {/* Call to Actions (CTAs) */}
            <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
              <a
                href="#projects"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-sky-500 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/40 hover:scale-[1.02] transition-all"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-slate-700 text-slate-200 font-semibold text-sm hover:border-indigo-500 hover:text-white transition-all hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 text-indigo-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-medium text-sm hover:text-white hover:border-slate-700 transition-all"
              >
                Let&apos;s Connect
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Profiles:</span>
              <a
                href={profile.github || 'https://github.com/WorkWithMohammad'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-card border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500 hover:bg-slate-800/80 transition-all"
                title="GitHub Profile"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.linkedin || 'https://linkedin.com/in/mohammad-raza-sheikh-6a187a3a4'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl glass-card border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500 hover:bg-slate-800/80 transition-all"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${profile.email || 'razasheikh092007@gmail.com'}`}
                className="p-2.5 rounded-xl glass-card border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500 hover:bg-slate-800/80 transition-all"
                title="Send Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer decorative ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 opacity-30 blur-lg animate-pulse" />
              
              <div className="relative glass-card rounded-3xl p-6 border border-slate-800/80 shadow-2xl flex flex-col items-center text-center">
                
                {/* Profile Photo Container */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-1 bg-gradient-to-tr from-indigo-600 via-sky-500 to-indigo-400 shadow-xl mb-5">
                  <div className="w-full h-full rounded-[14px] overflow-hidden bg-slate-900 flex items-center justify-center">
                    {profile.avatarUrl ? (
                      <img
                        src={profile.avatarUrl}
                        alt={profile.fullName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to avatar vector placeholder
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="flex flex-col items-center justify-center p-4 text-slate-400">
                      <Code className="w-12 h-12 text-indigo-400 mb-1" />
                      <span className="text-xs font-mono text-slate-400">MRSS</span>
                    </div>
                  </div>
                </div>

                {/* Name & College Badge */}
                <h3 className="text-xl font-bold text-white tracking-tight">{profile.fullName}</h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">B.Tech Software Engineering Student</p>
                <span className="mt-2 px-3 py-1 rounded-md bg-indigo-950/80 border border-indigo-800/60 text-indigo-300 text-xs font-mono">
                  Suryodaya College of Engg. & Tech.
                </span>

                {/* Tech Highlights Grid */}
                <div className="grid grid-cols-2 gap-3 w-full mt-6 text-left">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400">
                      <Code className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400">Full Stack</span>
                      <span className="text-xs font-semibold text-white">MERN Stack</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-sky-600/20 text-sky-400">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400">Hardware & IoT</span>
                      <span className="text-xs font-semibold text-white">ESP32 / Blynk</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-600/20 text-emerald-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400">Databases</span>
                      <span className="text-xs font-semibold text-white">MongoDB & MySQL</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/20 text-purple-400">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-xs text-slate-400">Certifications</span>
                      <span className="text-xs font-semibold text-white">8+ Completed</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
