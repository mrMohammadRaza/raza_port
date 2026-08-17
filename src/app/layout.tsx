import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohammad Raza | Computer Science Engineer & Developer Portfolio',
  description: 'Official portfolio of Mohammad Raza Salim Sheikh - Computer Science Engineering Student specializing in Full-Stack Web Development, Embedded IoT Systems, AI Tools, and Data Analytics.',
  keywords: ['Mohammad Raza', 'Mohammad Raza Salim Sheikh', 'Software Engineer', 'Computer Science Student', 'Full Stack Developer', 'MERN Stack', 'IoT Developer', 'Nagpur', 'Gondia'],
  authors: [{ name: 'Mohammad Raza Salim Sheikh' }],
  openGraph: {
    title: 'Mohammad Raza | Software Engineer Portfolio',
    description: 'Explore projects, technical skills, certifications, and achievements of Mohammad Raza Salim Sheikh.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#0b0f17] text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
