'use client';

import { useState } from 'react';
import { SkillItem } from '@/lib/types';
import { Cpu, Code, Database, Wrench, ShieldAlert, Layers } from 'lucide-react';

interface SkillsProps {
  skills: SkillItem[];
}

export default function SkillsSection({ skills }: SkillsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Coding Languages',
    'Web Development',
    'Database',
    'Tools & Technologies',
    'IoT',
    'Other Areas'
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Coding Languages': return <Code className="w-4 h-4 text-indigo-400" />;
      case 'Web Development': return <Layers className="w-4 h-4 text-sky-400" />;
      case 'Database': return <Database className="w-4 h-4 text-emerald-400" />;
      case 'Tools & Technologies': return <Wrench className="w-4 h-4 text-purple-400" />;
      case 'IoT': return <Cpu className="w-4 h-4 text-amber-400" />;
      case 'Other Areas': return <ShieldAlert className="w-4 h-4 text-rose-400" />;
      default: return <Code className="w-4 h-4 text-indigo-400" />;
    }
  };

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-950/80 border border-sky-800/60 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Technical Toolkit
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2">
            Categorized skills extracted directly from resume and technical projects.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-sky-400 to-indigo-500 rounded-full mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-indigo-600 to-sky-500 text-white shadow-md shadow-indigo-600/25 scale-105'
                  : 'glass-card text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card glass-card-hover rounded-xl p-4 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                      {getCategoryIcon(skill.category)}
                    </div>
                    <span className="font-semibold text-white text-sm">{skill.name}</span>
                  </div>
                  <span className="text-xs font-mono text-indigo-300 font-semibold">{skill.level}%</span>
                </div>
                <span className="text-[11px] text-slate-400 font-mono block mb-3">{skill.category}</span>
              </div>

              {/* Skill Progress Bar */}
              <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-sky-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
