export interface Project {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  published_date: string | null;
  tags: string[];
  cover_image_url: string | null;
  reading_time: number;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  published_date: string | null;
  tags: string[];
  reading_time: number;
  created_at: string;
  updated_at: string;
}

export interface IdeaDump {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  published_date: string | null;
  tags: string[];
  reading_time: number;
  created_at: string;
  updated_at: string;
}