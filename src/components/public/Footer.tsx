'use client';

import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, Code2 } from 'lucide-react';

interface FooterProps {
  fullName?: string;
  tagline?: string;
}

export default function Footer({ fullName = 'Mohammad Raza Salim Sheikh', tagline }: FooterProps) {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/80 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-white text-base">{fullName}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-sm text-center md:text-left">
              {tagline || 'Computer Science Engineering Student | Full Stack & IoT Developer'}
            </p>
          </div>

          <div className="flex items-center gap-6 text-xs text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/WorkWithMohammad"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com/in/mohammad-raza-sheikh-6a187a3a4"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-slate-700 transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="mailto:razasheikh092007@gmail.com"
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-slate-700 transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with precision & passion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
