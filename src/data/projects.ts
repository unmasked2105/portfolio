import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    icon: 'parking',
    cat: 'Full-Stack',
    title: 'Advanced Parking System',
    desc: 'Real-time parking management with Vue.js, Flask, Redis, and Celery.',
    tags: ['Vue.js', 'Flask', 'Redis', 'Celery'],
    link: 'https://github.com/unmasked2105/AdvParkingSystem',
  },
  {
    icon: 'chart-bar',
    cat: 'AI / Full-Stack',
    title: 'Excel Analytics Platform',
    desc: 'Dashboards with RAG chatbot for natural language querying via vector embeddings.',
    tags: ['MERN', 'RAG', 'NLP', 'Vector Embeddings'],
    link: 'https://github.com/unmasked2105/Excel-Analytics-Platform',
  },
];
