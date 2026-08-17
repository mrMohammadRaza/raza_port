export interface ProfileData {
  fullName: string;
  title: string;
  headline: string;
  about: string;
  email: string;
  phone?: string;
  location: string;
  linkedin: string;
  github: string;
  resumeUrl: string;
  avatarUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Coding Languages' | 'Web Development' | 'Database' | 'Tools & Technologies' | 'IoT' | 'Other Areas';
  level: number; // 0 to 100
  published: boolean;
  order: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string; // e.g. Team Project (Hackathon) or Personal Project
  description: string;
  detailedDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  badge: string;
  published: boolean;
  featured: boolean;
  order: number;
  image: string;
  createdAt?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  cgpa?: string;
  published: boolean;
  order: number;
}

export interface ExperienceItem {
  id: string;
  organization: string;
  position: string;
  period: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  certificateUrl?: string;
  published: boolean;
  order: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
  imageUrl?: string;
  published: boolean;
  order: number;
}

export interface HackathonItem {
  id: string;
  title: string;
  organizer: string;
  teamName: string;
  project: string;
  result: string;
  description: string;
  published: boolean;
  order: number;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  published: boolean;
  order: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface WebsiteSettings {
  siteTitle: string;
  metaDescription: string;
  tagline: string;
  allowContactForm: boolean;
  adminEmail: string;
  adminPasswordHash?: string;
}

export interface PortfolioDatabase {
  profile: ProfileData;
  skills: SkillItem[];
  projects: ProjectItem[];
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  hackathons: HackathonItem[];
  achievements: AchievementItem[];
  softSkills: string[];
  languages: { language: string; proficiency: string }[];
  interests: string[];
  messages: ContactMessage[];
  settings: WebsiteSettings;
  activityLogs: { id: string; action: string; timestamp: string }[];
}
