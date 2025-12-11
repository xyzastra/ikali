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
      admin_audit_log: {
        Row: {
          action: string
          admin_user_id: string
          created_at: string | null
          id: string
          ip_address: string | null
          record_count: number | null
          table_name: string
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_user_id: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          record_count?: number | null
          table_name: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_user_id?: string
          created_at?: string | null
          id?: string
          ip_address?: string | null
          record_count?: number | null
          table_name?: string
          user_agent?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          ip_address: string | null
          message: string
          name: string
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          ip_address?: string | null
          message: string
          name: string
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          message?: string
          name?: string
          tenant_id?: string | null
          user_id?: string | null
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
          importance: number | null
          published_date: string | null
          reading_time: number | null
          size_variant: string | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          importance?: number | null
          published_date?: string | null
          reading_time?: number | null
          size_variant?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string
          description?: string | null
          id?: string
          importance?: number | null
          published_date?: string | null
          reading_time?: number | null
          size_variant?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          content: string | null
          cover_style: string | null
          created_at: string
          description: string | null
          id: string
          journal_style: string | null
          mood: string | null
          published_date: string | null
          reading_time: number | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          content?: string | null
          cover_style?: string | null
          created_at?: string
          description?: string | null
          id?: string
          journal_style?: string | null
          mood?: string | null
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          content?: string | null
          cover_style?: string | null
          created_at?: string
          description?: string | null
          id?: string
          journal_style?: string | null
          mood?: string | null
          published_date?: string | null
          reading_time?: number | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string | null
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
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      nods_page: {
        Row: {
          checksum: string | null
          id: number
          meta: Json | null
          parent_page_id: number | null
          path: string
          source: string | null
          type: string | null
        }
        Insert: {
          checksum?: string | null
          id?: number
          meta?: Json | null
          parent_page_id?: number | null
          path: string
          source?: string | null
          type?: string | null
        }
        Update: {
          checksum?: string | null
          id?: number
          meta?: Json | null
          parent_page_id?: number | null
          path?: string
          source?: string | null
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nods_page_parent_page_id_fkey"
            columns: ["parent_page_id"]
            isOneToOne: false
            referencedRelation: "nods_page"
            referencedColumns: ["id"]
          },
        ]
      }
      nods_page_section: {
        Row: {
          content: string | null
          embedding: string | null
          heading: string | null
          id: number
          page_id: number
          slug: string | null
          token_count: number | null
        }
        Insert: {
          content?: string | null
          embedding?: string | null
          heading?: string | null
          id?: number
          page_id: number
          slug?: string | null
          token_count?: number | null
        }
        Update: {
          content?: string | null
          embedding?: string | null
          heading?: string | null
          id?: number
          page_id?: number
          slug?: string | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "nods_page_section_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "nods_page"
            referencedColumns: ["id"]
          },
        ]
      }
      password_failed_verification_attempts: {
        Row: {
          last_failed_at: string
          user_id: string
        }
        Insert: {
          last_failed_at?: string
          user_id: string
        }
        Update: {
          last_failed_at?: string
          user_id?: string
        }
        Relationships: []
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
          {
            foreignKeyName: "project_members_user_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
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
          description: string | null
          members: number
          owner_id: string | null
          "project type": string | null
          style: Json | null
          thumbnail_url: string | null
          title: string | null
        }
        Insert: {
          description?: string | null
          members?: number
          owner_id?: string | null
          "project type"?: string | null
          style?: Json | null
          thumbnail_url?: string | null
          title?: string | null
        }
        Update: {
          description?: string | null
          members?: number
          owner_id?: string | null
          "project type"?: string | null
          style?: Json | null
          thumbnail_url?: string | null
          title?: string | null
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
          {
            foreignKeyName: "thread_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "public_profiles"
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
          {
            foreignKeyName: "threads_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "public_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_id: {
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
      user_profiles: {
        Row: {
          accent_color: string | null
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          font_pref: string | null
          idea_layout_style: string | null
          journal_style: string | null
          primary_color: string | null
          user_id: string
        }
        Insert: {
          accent_color?: string | null
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          font_pref?: string | null
          idea_layout_style?: string | null
          journal_style?: string | null
          primary_color?: string | null
          user_id: string
        }
        Update: {
          accent_color?: string | null
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          font_pref?: string | null
          idea_layout_style?: string | null
          journal_style?: string | null
          primary_color?: string | null
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
      public_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      get_page_parents: {
        Args: { page_id: number }
        Returns: {
          id: number
          meta: Json
          parent_page_id: number
          path: string
        }[]
      }
      get_public_profile: {
        Args: { profile_id: string }
        Returns: {
          avatar_url: string
          created_at: string
          display_name: string
          id: string
        }[]
      }
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
      hook_password_verification_attempt: {
        Args: { event: Json }
        Returns: Json
      }
      is_collaborator: { Args: never; Returns: boolean }
      is_thread_member:
        | { Args: { p_thread_id: string; p_user_id: string }; Returns: boolean }
        | { Args: { thread_id_input: number }; Returns: boolean }
      match_page_sections: {
        Args: {
          embedding: string
          match_count: number
          match_threshold: number
          min_content_length: number
        }
        Returns: {
          content: string
          heading: string
          id: number
          page_id: number
          similarity: number
          slug: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "collaborator"
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
      app_role: ["admin", "moderator", "user", "collaborator"],
    },
  },
} as const
