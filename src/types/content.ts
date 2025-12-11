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
  user_id: string | null;
  title: string;
  description: string | null;
  content: string | null;
  published_date: string | null;
  tags: string[];
  reading_time: number;
  journal_style: string | null;
  cover_style: string | null;
  mood: string | null;
  created_at: string;
  updated_at: string;
}

export interface IdeaDump {
  id: string;
  user_id: string | null;
  title: string;
  description: string | null;
  content: string | null;
  published_date: string | null;
  tags: string[];
  reading_time: number;
  importance: number | null;
  size_variant: string | null;
  created_at: string;
  updated_at: string;
  // Joined profile data
  owner_display_name?: string | null;
  owner_avatar_url?: string | null;
}