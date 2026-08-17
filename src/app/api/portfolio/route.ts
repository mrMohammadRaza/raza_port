import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db';

export async function GET() {
  const db = getDatabase();

  // Filter only published items for public view
  const publicData = {
    profile: db.profile,
    skills: (db.skills || []).filter(s => s.published).sort((a, b) => a.order - b.order),
    projects: (db.projects || []).filter(p => p.published).sort((a, b) => a.order - b.order),
    education: (db.education || []).filter(e => e.published).sort((a, b) => a.order - b.order),
    experience: (db.experience || []).filter(e => e.published).sort((a, b) => a.order - b.order),
    certifications: (db.certifications || []).filter(c => c.published).sort((a, b) => a.order - b.order),
    hackathons: (db.hackathons || []).filter(h => h.published).sort((a, b) => a.order - b.order),
    achievements: (db.achievements || []).filter(a => a.published).sort((a, b) => a.order - b.order),
    softSkills: db.softSkills || [],
    languages: db.languages || [],
    interests: db.interests || [],
    settings: {
      siteTitle: db.settings.siteTitle,
      metaDescription: db.settings.metaDescription,
      tagline: db.settings.tagline,
      allowContactForm: db.settings.allowContactForm
    }
  };

  return NextResponse.json(publicData);
}
