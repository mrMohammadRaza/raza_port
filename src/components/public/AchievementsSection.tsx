'use client';

import { HackathonItem, AchievementItem } from '@/lib/types';
import { Trophy, Users, Flame, CheckCircle, Sparkles } from 'lucide-react';

interface AchievementsProps {
  hackathons: HackathonItem[];
  achievements: AchievementItem[];
}

export default function AchievementsSection({ hackathons, achievements }: AchievementsProps) {
  return (
    <section className="py-20 relative bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-800/60 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Competitive & Practical Honors</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Hackathons & Achievements
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mt-2">
            Team achievements, competitive hackathons, and virtual job simulation milestones.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-indigo-500 rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Hackathons Section */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-400" />
              <span>Hackathons</span>
            </h3>

            {hackathons.map((hack) => (
              <div key={hack.id} className="glass-card glass-card-hover rounded-2xl p-6 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold font-mono">
                    {hack.result}
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-indigo-400" />
                    Team: {hack.teamName}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white">{hack.title}</h4>
                <p className="text-xs font-semibold text-sky-400">{hack.organizer}</p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {hack.description}
                </p>

                {hack.project && (
                  <div className="pt-2">
                    <span className="text-xs text-slate-400 font-mono">Project Built: </span>
                    <span className="text-xs font-semibold text-indigo-300">{hack.project}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Achievements */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <span>Milestones & Recognitions</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {achievements.map((ach) => (
                <div key={ach.id} className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-800 flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shrink-0">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{ach.title}</h4>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
