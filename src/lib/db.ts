import fs from 'fs';
import path from 'path';
import { PortfolioDatabase } from './types';

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'db.json');

// Memory cache for super fast reads
let memoryCache: PortfolioDatabase | null = null;

export function getDatabase(): PortfolioDatabase {
  if (memoryCache) {
    return memoryCache;
  }
  try {
    if (fs.existsSync(DB_FILE_PATH)) {
      const content = fs.readFileSync(DB_FILE_PATH, 'utf-8');
      memoryCache = JSON.parse(content);
      return memoryCache!;
    }
  } catch (error) {
    console.error('Error reading DB file:', error);
  }

  // Fallback initial data structure if file doesn't exist
  const defaultDb: PortfolioDatabase = {
    profile: {
      fullName: 'MOHAMMAD RAZA SALIM SHEIKH',
      title: 'Computer Science Engineering Student',
      headline: 'Passionate Computer Science Engineering student specializing in full stack web development and IoT.',
      about: 'Computer Science Engineering student at Suryodaya College of Engineering & Technology.',
      email: 'razasheikh092007@gmail.com',
      location: 'Nagpur / Gondia, India',
      linkedin: 'https://linkedin.com/in/mohammad-raza-sheikh-6a187a3a4',
      github: 'https://github.com/WorkWithMohammad',
      resumeUrl: '/uploads/Mohammad_Raza_Resume.pdf',
      avatarUrl: '/uploads/profile.jpg'
    },
    skills: [],
    projects: [],
    education: [],
    experience: [],
    certifications: [],
    hackathons: [],
    achievements: [],
    softSkills: [],
    languages: [],
    interests: [],
    messages: [],
    settings: {
      siteTitle: 'Mohammad Raza | Software Engineer',
      metaDescription: 'Personal portfolio of Mohammad Raza Salim Sheikh',
      tagline: 'Building real world software and IoT solutions',
      allowContactForm: true,
      adminEmail: 'razasheikh092007@gmail.com'
    },
    activityLogs: []
  };

  memoryCache = defaultDb;
  return defaultDb;
}

export function saveDatabase(data: PortfolioDatabase): void {
  try {
    memoryCache = data;
    const dirPath = path.dirname(DB_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving DB file:', error);
  }
}

export function addActivityLog(action: string): void {
  const db = getDatabase();
  if (!db.activityLogs) {
    db.activityLogs = [];
  }
  db.activityLogs.unshift({
    id: `log-${Date.now()}`,
    action,
    timestamp: new Date().toISOString()
  });
  // Keep max 50 log items
  if (db.activityLogs.length > 50) {
    db.activityLogs = db.activityLogs.slice(0, 50);
  }
  saveDatabase(db);
}
