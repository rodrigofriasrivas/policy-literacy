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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      bigrams: {
        Row: {
          bigram: string
          frequency_sum: number | null
          id: number
          normalized_frequency: number | null
          topic_id: number
        }
        Insert: {
          bigram: string
          frequency_sum?: number | null
          id?: number
          normalized_frequency?: number | null
          topic_id: number
        }
        Update: {
          bigram?: string
          frequency_sum?: number | null
          id?: number
          normalized_frequency?: number | null
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_chart4_topic_trends"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_papers_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_top_bigrams_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_papers_by_year"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_10yr_v2"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_share_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "bigrams_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topics_ranked"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      coverage_summary: {
        Row: {
          avg_papers_per_bigram: number | null
          avg_topics_per_paper: number | null
          bigrams_total: number | null
          bigrams_unique: number | null
          created_at: string | null
          id: number
          papers_total: number | null
          topic_paper_links_count: number | null
          topics_count: number | null
          unique_papers_connected: number | null
        }
        Insert: {
          avg_papers_per_bigram?: number | null
          avg_topics_per_paper?: number | null
          bigrams_total?: number | null
          bigrams_unique?: number | null
          created_at?: string | null
          id?: number
          papers_total?: number | null
          topic_paper_links_count?: number | null
          topics_count?: number | null
          unique_papers_connected?: number | null
        }
        Update: {
          avg_papers_per_bigram?: number | null
          avg_topics_per_paper?: number | null
          bigrams_total?: number | null
          bigrams_unique?: number | null
          created_at?: string | null
          id?: number
          papers_total?: number | null
          topic_paper_links_count?: number | null
          topics_count?: number | null
          unique_papers_connected?: number | null
        }
        Relationships: []
      }
      papers: {
        Row: {
          abstract: string | null
          authors: string | null
          journal: string | null
          paper_id: number
          title: string
          year: number | null
        }
        Insert: {
          abstract?: string | null
          authors?: string | null
          journal?: string | null
          paper_id: number
          title: string
          year?: number | null
        }
        Update: {
          abstract?: string | null
          authors?: string | null
          journal?: string | null
          paper_id?: number
          title?: string
          year?: number | null
        }
        Relationships: []
      }
      topic_paper_links: {
        Row: {
          bigram: string | null
          frequency: number | null
          id: number
          paper_id: number
          pmi: number | null
          topic_id: number
        }
        Insert: {
          bigram?: string | null
          frequency?: number | null
          id?: number
          paper_id: number
          pmi?: number | null
          topic_id: number
        }
        Update: {
          bigram?: string | null
          frequency?: number | null
          id?: number
          paper_id?: number
          pmi?: number | null
          topic_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "topic_paper_links_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "papers"
            referencedColumns: ["paper_id"]
          },
          {
            foreignKeyName: "topic_paper_links_paper_id_fkey"
            columns: ["paper_id"]
            isOneToOne: false
            referencedRelation: "v_papers_unique"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_chart4_topic_trends"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_papers_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_top_bigrams_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_papers_by_year"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_10yr_v2"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_share_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topics_ranked"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      topic_weights: {
        Row: {
          id: number
          label: string | null
          topic_id: number
          topic_label: string | null
          topic_weight: number | null
        }
        Insert: {
          id?: number
          label?: string | null
          topic_id: number
          topic_label?: string | null
          topic_weight?: number | null
        }
        Update: {
          id?: number
          label?: string | null
          topic_id?: number
          topic_label?: string | null
          topic_weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_chart4_topic_trends"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_papers_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_top_bigrams_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_papers_by_year"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_10yr_v2"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_share_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_weights_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topics_ranked"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      topics: {
        Row: {
          definition: string | null
          topic_id: number
          topic_name: string
        }
        Insert: {
          definition?: string | null
          topic_id: number
          topic_name: string
        }
        Update: {
          definition?: string | null
          topic_id?: number
          topic_name?: string
        }
        Relationships: []
      }
      ui_topic_colors: {
        Row: {
          color_family: string | null
          color_hex: string | null
          notes: string | null
          topic_id: number
          updated_at: string
        }
        Insert: {
          color_family?: string | null
          color_hex?: string | null
          notes?: string | null
          topic_id: number
          updated_at?: string
        }
        Update: {
          color_family?: string | null
          color_hex?: string | null
          notes?: string | null
          topic_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_chart4_topic_trends"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_papers_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_top_bigrams_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_papers_by_year"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_10yr_v2"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_share_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topics_ranked"
            referencedColumns: ["topic_id"]
          },
        ]
      }
    }
    Views: {
      v_chart1_corpus_growth: {
        Row: {
          papers_count: number | null
          year: number | null
        }
        Relationships: []
      }
      v_chart4_topic_trends: {
        Row: {
          papers_count: number | null
          series_color: string | null
          topic_id: number | null
          topic_label: string | null
          year: number | null
        }
        Relationships: []
      }
      v_chart5_bigram_trends: {
        Row: {
          bigram: string | null
          bigram_rank: number | null
          papers_count: number | null
          topic_id: number | null
          topic_label: string | null
          year: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_chart4_topic_trends"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_papers_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_top_bigrams_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_papers_by_year"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_10yr_v2"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topic_trends_share_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "ui_topic_colors_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: true
            referencedRelation: "v_topics_ranked"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      v_papers_by_topic: {
        Row: {
          paper_count: number | null
          topic_id: number | null
          topic_name: string | null
        }
        Relationships: []
      }
      v_papers_cumulative: {
        Row: {
          papers_count: number | null
          papers_cumulative: number | null
          year: number | null
        }
        Relationships: []
      }
      v_papers_per_year: {
        Row: {
          papers_count: number | null
          year: number | null
        }
        Relationships: []
      }
      v_papers_per_year_v2: {
        Row: {
          papers_count: number | null
          year: number | null
        }
        Relationships: []
      }
      v_papers_unique: {
        Row: {
          abstract: string | null
          authors: string | null
          id: number | null
          journal: string | null
          title: string | null
          year: number | null
        }
        Insert: {
          abstract?: string | null
          authors?: string | null
          id?: number | null
          journal?: string | null
          title?: string | null
          year?: number | null
        }
        Update: {
          abstract?: string | null
          authors?: string | null
          id?: number | null
          journal?: string | null
          title?: string | null
          year?: number | null
        }
        Relationships: []
      }
      v_top_bigrams_by_topic: {
        Row: {
          bigram: string | null
          frequency_sum: number | null
          normalized_frequency: number | null
          rank: number | null
          topic_id: number | null
          topic_name: string | null
        }
        Relationships: []
      }
      v_topic_papers_by_year: {
        Row: {
          papers_count: number | null
          topic_id: number | null
          topic_name: string | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_prevalence_top8_other_by_year: {
        Row: {
          papers_count: number | null
          series_key: string | null
          series_name: string | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_prevalence_top8_other_by_year_v2: {
        Row: {
          papers_count: number | null
          series_key: string | null
          series_name: string | null
          series_rank: number | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_prevalence_top8_other_by_year_v3: {
        Row: {
          papers_count: number | null
          series_color: string | null
          series_key: string | null
          series_name: string | null
          series_rank: number | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_prevalence_top8_other_by_year_v4: {
        Row: {
          papers_count: number | null
          series_color: string | null
          series_key: string | null
          series_name: string | null
          series_rank: number | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_prevalence_top8_other_by_year_v5: {
        Row: {
          papers_count: number | null
          series_color: string | null
          series_key: string | null
          series_name: string | null
          series_rank: number | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_prevalence_top8_other_by_year_v6: {
        Row: {
          papers_count: number | null
          series_color: string | null
          series_key: string | null
          series_name: string | null
          series_rank: number | null
          year: number | null
        }
        Relationships: []
      }
      v_topic_totals: {
        Row: {
          papers_total: number | null
          topic_id: number | null
        }
        Relationships: [
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_chart4_topic_trends"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_papers_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_top_bigrams_by_topic"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_papers_by_year"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_10yr_v2"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topic_trends_share_last10_vs_prev10"
            referencedColumns: ["topic_id"]
          },
          {
            foreignKeyName: "topic_paper_links_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "v_topics_ranked"
            referencedColumns: ["topic_id"]
          },
        ]
      }
      v_topic_trends_10yr_v2: {
        Row: {
          direction: string | null
          end_year: number | null
          first_decade_share: number | null
          last_decade_share: number | null
          share_change_pp: number | null
          start_year: number | null
          topic_id: number | null
          topic_name: string | null
        }
        Relationships: []
      }
      v_topic_trends_last10_vs_prev10: {
        Row: {
          delta_count: number | null
          last_10y_count: number | null
          pct_change: number | null
          prev_10y_count: number | null
          topic_id: number | null
          topic_name: string | null
          trend_direction: string | null
        }
        Relationships: []
      }
      v_topic_trends_share_last10_vs_prev10: {
        Row: {
          last_10y_count: number | null
          last_10y_share_pct: number | null
          prev_10y_count: number | null
          prev_10y_share_pct: number | null
          share_delta_pp: number | null
          topic_id: number | null
          topic_name: string | null
          trend_direction: string | null
        }
        Relationships: []
      }
      v_topics_ranked: {
        Row: {
          definition: string | null
          topic_id: number | null
          topic_label: string | null
          topic_name: string | null
          topic_weight: number | null
        }
        Relationships: []
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
