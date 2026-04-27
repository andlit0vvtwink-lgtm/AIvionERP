export interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'archived' | 'on-hold';
  deadline: string;
  summary: string;
  members: string[];
  taskCount: number;
  clientId?: string;
  color?: string;
}

export interface SubProject {
  id: string;
  projectId: string;
  name: string;
  status: 'active' | 'completed' | 'archived' | 'on-hold';
  summary: string;
  members: string[];
  taskCount: number;
  deadline: string;
}

export interface Task {
  id: string;
  title: string;
  type: 'task' | 'bug' | 'feature' | 'improvement';
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  deadline: string;
  assignee: string;
  projectId: string;
  subProjectId?: string;
  description?: string;
  tags: string[];
  subtasks?: { id: string; title: string; done: boolean }[];
  comments?: { id: string; author: string; text: string; date: string }[];
  attachments?: { id: string; name: string; type: string }[];
  startDate?: string;
  author?: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  businessType: string;
  status: 'ghosted' | 'conversating' | 'complete' | 'yet-to-start' | 'contacted';
  details: string;
  projects: string[];
  notes?: string;
  materials?: string[];
}

export interface Material {
  id: string;
  name: string;
  type: 'file' | 'link' | 'note';
  url?: string;
  projectId?: string;
  subProjectId?: string;
  taskId?: string;
  author: string;
  date: string;
  size?: string;
  extension?: string;
  previewUrl?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  projectId?: string;
  taskId?: string;
  type: 'task' | 'event';
  status?: string;
}

export interface Site {
  id: string;
  name: string;
  url: string;
  usersDaily: number;
  avgTime: string;
  clicks: number;
  bounceRate: number;
  conversions: number;
  topPages: { page: string; views: number }[];
  trafficSources: { source: string; percent: number }[];
}

export interface Notification {
  id: string;
  type: 'task' | 'mention' | 'deadline';
  message: string;
  date: string;
  read: boolean;
}
