import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    icon: 'cloud-upload-alt',
    cat: 'Data Engineering',
    title: 'Cloud Data Pipeline',
    desc: 'End-to-end pipeline with Bronze, Silver, Gold layers on BigQuery &amp; Dataform.',
    tags: ['GCP', 'Docker', 'PySpark', 'BigQuery'],
    link: 'https://github.com/unmasked2105/BQ_data_extraction_guide',
  },
  {
    icon: 'plug',
    cat: 'Data Engineering',
    title: 'REST API Data Extractor',
    desc: 'Configurable extraction framework with Cloud Run Jobs &amp; Cloud Workflow.',
    tags: ['Docker', 'Cloud Run', 'BigQuery', 'GCP'],
    link: 'https://github.com/unmasked2105/DE_CRM_WEBSITE_INVENTORY_TO_BQ',
  },
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
