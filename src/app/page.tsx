'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import HeroSection from '@/components/public/HeroSection';
import AboutSection from '@/components/public/AboutSection';
import SkillsSection from '@/components/public/SkillsSection';
import ProjectsSection from '@/components/public/ProjectsSection';
import TimelineSection from '@/components/public/TimelineSection';
import CertificationsSection from '@/components/public/CertificationsSection';
import AchievementsSection from '@/components/public/AchievementsSection';
import ContactSection from '@/components/public/ContactSection';
import Footer from '@/components/public/Footer';
import ResumeModal from '@/components/public/ResumeModal';
import { PortfolioDatabase } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export default function PublicPortfolioPage() {
  const [data, setData] = useState<Partial<PortfolioDatabase> | null>(null);
  const [loading, setLoading] = useState(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load portfolio data:', err);
        setLoading(false);
      });
  }, []);

  if (loading || !data || !data.profile) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
        <p className="text-sm font-mono text-slate-400">Loading Mohammad Raza&apos;s Portfolio...</p>
      </div>
    );
  }

  const {
    profile,
    skills = [],
    projects = [],
    education = [],
    experience = [],
    certifications = [],
    hackathons = [],
    achievements = [],
    softSkills = [],
    languages = [],
    interests = [],
    settings
  } = data;

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Navigation */}
      <Navbar
        fullName={profile.fullName}
        resumeUrl={profile.resumeUrl}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Main Public Sections */}
      <main>
        <HeroSection
          profile={profile as any}
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
        />
        
        <AboutSection
          profile={profile as any}
          softSkills={softSkills}
          languages={languages}
          interests={interests}
        />

        <SkillsSection skills={skills} />

        <ProjectsSection projects={projects} />

        <TimelineSection education={education} experience={experience} />

        <CertificationsSection certifications={certifications} />

        <AchievementsSection hackathons={hackathons} achievements={achievements} />

        <ContactSection
          email={profile.email}
          phone={profile.phone}
          location={profile.location}
          linkedin={profile.linkedin}
          github={profile.github}
        />
      </main>

      {/* Footer */}
      <Footer fullName={profile.fullName} tagline={settings?.tagline} />

      {/* PDF Resume Viewer Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        resumeUrl={profile.resumeUrl}
        fullName={profile.fullName}
      />
    </div>
  );
}
