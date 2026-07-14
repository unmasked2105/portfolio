import type { Experience } from '../types';

export const EXPERIENCE: Experience[] = [
  {
    role: 'AI Intern (Data Engineering)',
    company: 'Krish TechnoLabs',
    location: 'Ahmedabad',
    date: 'Jan 2026 – Present',
    current: true,
    desc: [
      'Designed scalable ETL pipelines using Medallion Architecture (Bronze, Silver, Gold).',
      'Built ETL/ELT workflows on GCP with Docker containerization.',
      'Orchestrated Databricks pipelines for automated data processing.',
    ],
    tech: ['GCP', 'PySpark', 'Databricks', 'BigQuery'],
  },
  {
    role: 'Full-Stack Developer Intern',
    company: 'Zidio Development',
    date: 'May 2025 – July 2025',
    current: false,
    desc: [
      'Developed MERN-based web applications with secure REST APIs.',
      'Implemented authentication, testing, and deployment workflows.',
    ],
    tech: ['MERN', 'REST APIs', 'Auth', 'Deployment'],
  },
  {
    role: 'Flask Web Developer Intern',
    company: 'MiG Arch',
    location: 'Vadodara',
    date: 'May 2024 – June 2024',
    current: false,
    desc: [
      'Developed Flask-based web apps using HTML, CSS, and Python.',
      'Assisted with deployment and debugging.',
    ],
    tech: ['Flask', 'Python', 'HTML/CSS'],
  },
  {
    role: 'Web Development Intern',
    company: 'Dolphin Web Solution',
    location: 'Ahmedabad',
    date: 'May 2023 – June 2023',
    current: false,
    desc: [
      'Contributed to front-end and back-end web development under the guidance of Mr. Vaibhav Salot.',
      'Resolved technical issues and implemented features for client projects.',
    ],
    tech: ['HTML/CSS', 'JavaScript', 'Web Dev'],
  },
];

export const SKILL_CATEGORIES = [
  { icon: 'database', title: 'Data Engineering', tags: ['ETL / ELT', 'Data Warehousing', 'Data Modeling', 'Medallion Arch', 'PySpark', 'Dataform'] },
  { icon: 'cloud', title: 'Cloud & Big Data', tags: ['GCP', 'BigQuery', 'Databricks', 'Hadoop', 'Docker', 'IAM'] },
  { icon: 'code', title: 'Programming', tags: ['Python', 'SQL', 'Java', 'PHP', 'C++', 'C'] },
  { icon: 'globe', title: 'Web Development', tags: ['MERN Stack', 'Flask', 'HTML/CSS', 'REST APIs', 'Vue.js', 'Node.js'] },
  { icon: 'brain', title: 'AI / ML', tags: ['RAG', 'NLP', 'Vector Embeddings', 'PyTorch'] },
  { icon: 'tools', title: 'Tools & Core', tags: ['Docker', 'Git/GitHub', 'DSA', 'OOP', 'DBMS', 'REST APIs'] },
];

export const SKILL_BARS = [
  { label: 'Python / SQL', pct: 90 },
  { label: 'GCP & Cloud', pct: 85 },
  { label: 'Data Engineering', pct: 85 },
  { label: 'Web Development', pct: 80 },
  { label: 'PySpark / Big Data', pct: 75 },
  { label: 'AI / ML', pct: 70 },
];

export const TAGS = [
  { name: 'ETL', color: '#6366f1', tx: '0px', ty: '-60px' },
  { name: 'GCP', color: '#06b6d4', tx: '80px', ty: '-30px' },
  { name: 'PySpark', color: '#a855f7', tx: '-70px', ty: '-10px' },
  { name: 'BigQuery', color: '#f59e0b', tx: '60px', ty: '20px' },
  { name: 'Docker', color: '#22c55e', tx: '-50px', ty: '40px' },
  { name: 'MERN', color: '#ec4899', tx: '0px', ty: '60px' },
];
