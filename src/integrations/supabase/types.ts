export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          name?: string
        }
        Relationships: []
      }
      content_projects: {
        Row: {
          content: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          published_date: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      idea_dumps: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          id: string
          published_date: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string | null
          created_at: string
          description: string | null
          id: string
          published_date: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          metadata: Json | null
          thread_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          metadata?: Json | null
          thread_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          email: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      project_comments: {
        Row: {
          content: string
          created_at: string
          id: string
          parent_id: string | null
          project_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          parent_id?: string | null
          project_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          project_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_comments_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "project_comments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_comments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_members: {
        Row: {
          id: string
          joined_at: string
          project_id: string
          role: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          project_id: string
          role?: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          project_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_votes: {
        Row: {
          created_at: string
          id: string
          project_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          project_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          project_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_votes_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "user_projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          members: number
          "project type": string | null
        }
        Insert: {
          members?: number
          "project type"?: string | null
        }
        Update: {
          members?: number
          "project type"?: string | null
        }
        Relationships: []
      }
      "public.users": {
        Row: {
          created_at: string
          id: number
        }
        Insert: {
          created_at?: string
          id?: number
        }
        Update: {
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      thread_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string | null
          thread_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string | null
          thread_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string | null
          thread_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_members_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thread_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      threads: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          last_message_at: string | null
          title: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_message_at?: string | null
          title?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_message_at?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          created_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_projects: {
        Row: {
          content: string | null
          cover_image_url: string | null
          created_at: string
          description: string | null
          id: string
          is_featured: boolean | null
          looking_for_collaborators: boolean | null
          project_type: string
          tags: string[] | null
          title: string
          updated_at: string
          upvote_count: number | null
          user_id: string
        }
        Insert: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          looking_for_collaborators?: boolean | null
          project_type?: string
          tags?: string[] | null
          title: string
          updated_at?: string
          upvote_count?: number | null
          user_id: string
        }
        Update: {
          content?: string | null
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_featured?: boolean | null
          looking_for_collaborators?: boolean | null
          project_type?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
          upvote_count?: number | null
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      Users: {
        Row: {
          auth_id: string | null
          created_at: string
          email: string | null
          id: number
          tenant_id: string
        }
        Insert: {
          auth_id?: string | null
          created_at?: string
          email?: string | null
          id?: number
          tenant_id: string
        }
        Update: {
          auth_id?: string | null
          created_at?: string
          email?: string | null
          id?: number
          tenant_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user:
        | { Args: { arg1: string; arg2: string }; Returns: undefined }
        | { Args: { p_user_id: string }; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_thread_member:
        | { Args: { p_thread_id: string; p_user_id: string }; Returns: boolean }
        | { Args: { thread_id_input: number }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
