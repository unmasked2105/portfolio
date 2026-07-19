export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  emoji: string;
}

export interface CartItem extends Product {
  qty: number;
}

export interface PipelineEvent {
  type: string;
  timestamp: string;
  product_id?: number;
  product_name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  session?: string;
  [key: string]: unknown;
}

export interface PipelineState {
  raw: { label: string; data: string }[];
  clean: { label: string; data: string }[];
  etl: { label: string; data: string }[];
  analytics: { label: string; data: string }[];
}

export interface Project {
  icon: string;
  cat: string;
  title: string;
  desc: string;
  tags: string[];
  link?: string;
}

export interface SkillCategory {
  icon: string;
  title: string;
  tags: string[];
}

export interface Experience {
  role: string;
  company: string;
  location?: string;
  date: string;
  current?: boolean;
  desc: string[];
  tech: string[];
}
