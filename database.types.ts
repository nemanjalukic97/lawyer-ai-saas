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
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          entity_id: string | null
          entity_type: string
          id: string
          ip_address: unknown
          law_firm_id: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          ip_address?: unknown
          law_firm_id?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          ip_address?: unknown
          law_firm_id?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      case_predictions: {
        Row: {
          amount_in_dispute: number | null
          case_facts: string
          case_name: string | null
          case_type: Database["public"]["Enums"]["case_type"]
          confidence_level: Database["public"]["Enums"]["confidence_level"]
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          evidence_quality:
            | Database["public"]["Enums"]["evidence_quality"]
            | null
          full_analysis: string | null
          id: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          key_factors: Json | null
          law_firm_id: string | null
          outcome_probability: number | null
          precedent_cases: Json | null
          risks: Json | null
          strategic_recommendations: Json | null
          timeline: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_in_dispute?: number | null
          case_facts: string
          case_name?: string | null
          case_type: Database["public"]["Enums"]["case_type"]
          confidence_level: Database["public"]["Enums"]["confidence_level"]
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          evidence_quality?:
            | Database["public"]["Enums"]["evidence_quality"]
            | null
          full_analysis?: string | null
          id?: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          key_factors?: Json | null
          law_firm_id?: string | null
          outcome_probability?: number | null
          precedent_cases?: Json | null
          risks?: Json | null
          strategic_recommendations?: Json | null
          timeline?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_in_dispute?: number | null
          case_facts?: string
          case_name?: string | null
          case_type?: Database["public"]["Enums"]["case_type"]
          confidence_level?: Database["public"]["Enums"]["confidence_level"]
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          evidence_quality?:
            | Database["public"]["Enums"]["evidence_quality"]
            | null
          full_analysis?: string | null
          id?: string
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"]
          key_factors?: Json | null
          law_firm_id?: string | null
          outcome_probability?: number | null
          precedent_cases?: Json | null
          risks?: Json | null
          strategic_recommendations?: Json | null
          timeline?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "case_predictions_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      client_documents: {
        Row: {
          client_id: string
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          document_id: string | null
          file_format: string | null
          file_url: string | null
          id: string
          law_firm_id: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          document_id?: string | null
          file_format?: string | null
          file_url?: string | null
          id?: string
          law_firm_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          document_id?: string | null
          file_format?: string | null
          file_url?: string | null
          id?: string
          law_firm_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "client_documents_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "client_documents_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          company_name: string | null
          created_at: string | null
          currency: string | null
          default_hourly_rate: number | null
          deleted_at: string | null
          deleted_by: string | null
          email: string | null
          id: string
          invited_at: string | null
          last_login_at: string | null
          law_firm_id: string | null
          name: string
          notes: string | null
          phone: string | null
          portal_enabled: boolean | null
          portal_user_id: string | null
          status: Database["public"]["Enums"]["client_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          company_name?: string | null
          created_at?: string | null
          currency?: string | null
          default_hourly_rate?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          invited_at?: string | null
          last_login_at?: string | null
          law_firm_id?: string | null
          name: string
          notes?: string | null
          phone?: string | null
          portal_enabled?: boolean | null
          portal_user_id?: string | null
          status?: Database["public"]["Enums"]["client_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          company_name?: string | null
          created_at?: string | null
          currency?: string | null
          default_hourly_rate?: number | null
          deleted_at?: string | null
          deleted_by?: string | null
          email?: string | null
          id?: string
          invited_at?: string | null
          last_login_at?: string | null
          law_firm_id?: string | null
          name?: string
          notes?: string | null
          phone?: string | null
          portal_enabled?: boolean | null
          portal_user_id?: string | null
          status?: Database["public"]["Enums"]["client_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "clients_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          ai_generated: boolean | null
          ai_prompt_used: string | null
          content: string | null
          content_html: string | null
          contract_type: Database["public"]["Enums"]["contract_type"]
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          id: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          law_firm_id: string | null
          party_names: Json | null
          signed_at: string | null
          status: Database["public"]["Enums"]["contract_status"] | null
          title: string
          updated_at: string | null
          user_id: string
          version: number | null
        }
        Insert: {
          ai_generated?: boolean | null
          ai_prompt_used?: string | null
          content?: string | null
          content_html?: string | null
          contract_type: Database["public"]["Enums"]["contract_type"]
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          law_firm_id?: string | null
          party_names?: Json | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
          version?: number | null
        }
        Update: {
          ai_generated?: boolean | null
          ai_prompt_used?: string | null
          content?: string | null
          content_html?: string | null
          contract_type?: Database["public"]["Enums"]["contract_type"]
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          id?: string
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"]
          law_firm_id?: string | null
          party_names?: Json | null
          signed_at?: string | null
          status?: Database["public"]["Enums"]["contract_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "contracts_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      document_analyses: {
        Row: {
          analyzed_at: string | null
          compliance_issues: Json | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          document_text: string | null
          executive_summary: string | null
          full_report: string | null
          id: string
          law_firm_id: string | null
          missing_provisions: Json | null
          original_file_url: string
          original_filename: string
          recommendations: Json | null
          risk_score: number | null
          risky_clauses: Json | null
          status: Database["public"]["Enums"]["analysis_status"] | null
          user_id: string
        }
        Insert: {
          analyzed_at?: string | null
          compliance_issues?: Json | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          document_text?: string | null
          executive_summary?: string | null
          full_report?: string | null
          id?: string
          law_firm_id?: string | null
          missing_provisions?: Json | null
          original_file_url: string
          original_filename: string
          recommendations?: Json | null
          risk_score?: number | null
          risky_clauses?: Json | null
          status?: Database["public"]["Enums"]["analysis_status"] | null
          user_id: string
        }
        Update: {
          analyzed_at?: string | null
          compliance_issues?: Json | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          document_text?: string | null
          executive_summary?: string | null
          full_report?: string | null
          id?: string
          law_firm_id?: string | null
          missing_provisions?: Json | null
          original_file_url?: string
          original_filename?: string
          recommendations?: Json | null
          risk_score?: number | null
          risky_clauses?: Json | null
          status?: Database["public"]["Enums"]["analysis_status"] | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_analyses_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          ai_generated: boolean | null
          content: string
          content_html: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_format: string | null
          file_url: string | null
          generation_params: Json | null
          id: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          law_firm_id: string | null
          status: Database["public"]["Enums"]["document_status"] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          content: string
          content_html?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          document_type: Database["public"]["Enums"]["document_type"]
          file_format?: string | null
          file_url?: string | null
          generation_params?: Json | null
          id?: string
          jurisdiction: Database["public"]["Enums"]["jurisdiction"]
          law_firm_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          content?: string
          content_html?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          document_type?: Database["public"]["Enums"]["document_type"]
          file_format?: string | null
          file_url?: string | null
          generation_params?: Json | null
          id?: string
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"]
          law_firm_id?: string | null
          status?: Database["public"]["Enums"]["document_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_items: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string
          id: string
          invoice_id: string
          quantity: number | null
          unit_price: number | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description: string
          id?: string
          invoice_id: string
          quantity?: number | null
          unit_price?: number | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string
          quantity?: number | null
          unit_price?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string
          created_at: string | null
          currency: string | null
          deleted_at: string | null
          deleted_by: string | null
          due_date: string | null
          id: string
          invoice_number: string
          issue_date: string | null
          law_firm_id: string | null
          notes: string | null
          status: Database["public"]["Enums"]["invoice_status"] | null
          subtotal: number | null
          tax_amount: number | null
          total_amount: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          client_id: string
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          invoice_number: string
          issue_date?: string | null
          law_firm_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          client_id?: string
          created_at?: string | null
          currency?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          due_date?: string | null
          id?: string
          invoice_number?: string
          issue_date?: string | null
          law_firm_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["invoice_status"] | null
          subtotal?: number | null
          tax_amount?: number | null
          total_amount?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      law_firms: {
        Row: {
          active: boolean | null
          billing_email: string | null
          created_at: string | null
          default_jurisdiction:
            | Database["public"]["Enums"]["jurisdiction"]
            | null
          deleted_at: string | null
          id: string
          logo_url: string | null
          name: string
          owner_id: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          trial_ends_at: string | null
          updated_at: string | null
          vat_number: string | null
          website: string | null
        }
        Insert: {
          active?: boolean | null
          billing_email?: string | null
          created_at?: string | null
          default_jurisdiction?:
            | Database["public"]["Enums"]["jurisdiction"]
            | null
          deleted_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          owner_id: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          trial_ends_at?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Update: {
          active?: boolean | null
          billing_email?: string | null
          created_at?: string | null
          default_jurisdiction?:
            | Database["public"]["Enums"]["jurisdiction"]
            | null
          deleted_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          owner_id?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          trial_ends_at?: string | null
          updated_at?: string | null
          vat_number?: string | null
          website?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          body: string
          client_id: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          direction: string | null
          id: string
          law_firm_id: string | null
          portal_user_id: string | null
          read_at: string | null
          subject: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          body: string
          client_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          direction?: string | null
          id?: string
          law_firm_id?: string | null
          portal_user_id?: string | null
          read_at?: string | null
          subject?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          body?: string
          client_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          direction?: string | null
          id?: string
          law_firm_id?: string | null
          portal_user_id?: string | null
          read_at?: string | null
          subject?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      rag_query_logs: {
        Row: {
          id: string
          created_at: string | null
          user_id: string | null
          jurisdiction: string | null
          feature_type: string | null
          query_preview: string | null
          top_similarity: number | null
          confidence: string | null
          answer_mode: string | null
          chunks_retrieved: number | null
          valid_citations: boolean | null
          invalid_citations: string[] | null
          response_time_ms: number | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          jurisdiction?: string | null
          feature_type?: string | null
          query_preview?: string | null
          top_similarity?: number | null
          confidence?: string | null
          answer_mode?: string | null
          chunks_retrieved?: number | null
          valid_citations?: boolean | null
          invalid_citations?: string[] | null
          response_time_ms?: number | null
        }
        Update: {
          id?: string
          created_at?: string | null
          user_id?: string | null
          jurisdiction?: string | null
          feature_type?: string | null
          query_preview?: string | null
          top_similarity?: number | null
          confidence?: string | null
          answer_mode?: string | null
          chunks_retrieved?: number | null
          valid_citations?: boolean | null
          invalid_citations?: string[] | null
          response_time_ms?: number | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          ai_generated: boolean | null
          content: string
          content_html: string | null
          contract_type: Database["public"]["Enums"]["contract_type"] | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          description: string | null
          document_type: Database["public"]["Enums"]["document_type"] | null
          generation_params: Json | null
          id: string
          is_shared_with_firm: boolean | null
          jurisdiction: Database["public"]["Enums"]["jurisdiction"] | null
          law_firm_id: string | null
          template_category: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          ai_generated?: boolean | null
          content: string
          content_html?: string | null
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          generation_params?: Json | null
          id?: string
          is_shared_with_firm?: boolean | null
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"] | null
          law_firm_id?: string | null
          template_category?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          ai_generated?: boolean | null
          content?: string
          content_html?: string | null
          contract_type?: Database["public"]["Enums"]["contract_type"] | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          description?: string | null
          document_type?: Database["public"]["Enums"]["document_type"] | null
          generation_params?: Json | null
          id?: string
          is_shared_with_firm?: boolean | null
          jurisdiction?: Database["public"]["Enums"]["jurisdiction"] | null
          law_firm_id?: string | null
          template_category?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "templates_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries: {
        Row: {
          activity_type: Database["public"]["Enums"]["activity_type"]
          amount: number | null
          client_id: string | null
          created_at: string | null
          deleted_at: string | null
          deleted_by: string | null
          duration_minutes: number
          hourly_rate: number | null
          id: string
          invoice_id: string | null
          law_firm_id: string | null
          notes: string | null
          status: Database["public"]["Enums"]["time_entry_status"] | null
          updated_at: string | null
          user_id: string
          work_date: string | null
        }
        Insert: {
          activity_type: Database["public"]["Enums"]["activity_type"]
          amount?: number | null
          client_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          duration_minutes: number
          hourly_rate?: number | null
          id?: string
          invoice_id?: string | null
          law_firm_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["time_entry_status"] | null
          updated_at?: string | null
          user_id: string
          work_date?: string | null
        }
        Update: {
          activity_type?: Database["public"]["Enums"]["activity_type"]
          amount?: number | null
          client_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          deleted_by?: string | null
          duration_minutes?: number
          hourly_rate?: number | null
          id?: string
          invoice_id?: string | null
          law_firm_id?: string | null
          notes?: string | null
          status?: Database["public"]["Enums"]["time_entry_status"] | null
          updated_at?: string | null
          user_id?: string
          work_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      usage_stats: {
        Row: {
          cost_usd: number | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          feature_type: Database["public"]["Enums"]["ai_feature_type"]
          id: string
          law_firm_id: string | null
          metadata: Json | null
          model_used: string | null
          tokens_used: number | null
          usage_date: string | null
          user_id: string
        }
        Insert: {
          cost_usd?: number | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          feature_type: Database["public"]["Enums"]["ai_feature_type"]
          id?: string
          law_firm_id?: string | null
          metadata?: Json | null
          model_used?: string | null
          tokens_used?: number | null
          usage_date?: string | null
          user_id: string
        }
        Update: {
          cost_usd?: number | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          feature_type?: Database["public"]["Enums"]["ai_feature_type"]
          id?: string
          law_firm_id?: string | null
          metadata?: Json | null
          model_used?: string | null
          tokens_used?: number | null
          usage_date?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usage_stats_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          active: boolean | null
          avatar_url: string | null
          created_at: string | null
          deleted_at: string | null
          full_name: string
          id: string
          law_firm_id: string | null
          preferred_jurisdiction:
            | Database["public"]["Enums"]["jurisdiction"]
            | null
          preferred_language: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          theme_preference: string
          trial_ends_at: string | null
          updated_at: string | null
        }
        Insert: {
          active?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          full_name: string
          id: string
          law_firm_id?: string | null
          preferred_jurisdiction?:
            | Database["public"]["Enums"]["jurisdiction"]
            | null
          preferred_language?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          theme_preference?: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Update: {
          active?: boolean | null
          avatar_url?: string | null
          created_at?: string | null
          deleted_at?: string | null
          full_name?: string
          id?: string
          law_firm_id?: string | null
          preferred_jurisdiction?:
            | Database["public"]["Enums"]["jurisdiction"]
            | null
          preferred_language?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?:
            | Database["public"]["Enums"]["subscription_status"]
            | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          theme_preference?: string
          trial_ends_at?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_law_firm_id_fkey"
            columns: ["law_firm_id"]
            isOneToOne: false
            referencedRelation: "law_firms"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      match_legal_articles: {
        Args: {
          query_embedding: number[]
          filter_jurisdiction: string
          filter_category: string | null
          match_count: number
          similarity_threshold: number
        }
        Returns: Json
      }
      user_has_firm: { Args: never; Returns: boolean }
      user_law_firm_id: { Args: never; Returns: string }
    }
    Enums: {
      activity_type:
        | "drafting"
        | "reviewing"
        | "research"
        | "meeting"
        | "court"
        | "admin"
        | "other"
      ai_feature_type:
        | "contract_generation"
        | "document_generation"
        | "case_prediction"
        | "document_analysis"
        | "template_generation"
      analysis_status: "processing" | "completed" | "failed"
      case_type:
        | "civil"
        | "commercial"
        | "labor"
        | "family"
        | "criminal"
        | "administrative"
      client_status: "active" | "inactive" | "archived"
      confidence_level: "high" | "medium" | "low"
      contract_status: "draft" | "final" | "signed" | "archived"
      contract_type:
        | "employment"
        | "nda"
        | "sales"
        | "lease"
        | "service"
        | "partnership"
        | "other"
      document_status: "draft" | "final" | "sent" | "archived"
      document_type:
        | "power_of_attorney"
        | "demand_letter"
        | "legal_opinion"
        | "memo"
        | "court_filing"
        | "notice"
        | "resolution"
        | "other"
      evidence_quality: "strong" | "medium" | "weak"
      invoice_status: "draft" | "sent" | "paid" | "overdue" | "cancelled"
      jurisdiction:
        | "bih_fbih"
        | "bih_rs"
        | "bih_brcko"
        | "serbia"
        | "croatia"
        | "montenegro"
        | "slovenia"
      subscription_status:
        | "trial"
        | "active"
        | "cancelled"
        | "expired"
        | "past_due"
      subscription_tier: "solo" | "professional" | "firm"
      time_entry_status: "pending" | "approved" | "billed"
      user_role: "owner" | "lawyer" | "admin" | "assistant"
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
      activity_type: [
        "drafting",
        "reviewing",
        "research",
        "meeting",
        "court",
        "admin",
        "other",
      ],
      ai_feature_type: [
        "contract_generation",
        "document_generation",
        "case_prediction",
        "document_analysis",
        "template_generation",
      ],
      analysis_status: ["processing", "completed", "failed"],
      case_type: [
        "civil",
        "commercial",
        "labor",
        "family",
        "criminal",
        "administrative",
      ],
      client_status: ["active", "inactive", "archived"],
      confidence_level: ["high", "medium", "low"],
      contract_status: ["draft", "final", "signed", "archived"],
      contract_type: [
        "employment",
        "nda",
        "sales",
        "lease",
        "service",
        "partnership",
        "other",
      ],
      document_status: ["draft", "final", "sent", "archived"],
      document_type: [
        "power_of_attorney",
        "demand_letter",
        "legal_opinion",
        "memo",
        "court_filing",
        "notice",
        "resolution",
        "other",
      ],
      evidence_quality: ["strong", "medium", "weak"],
      invoice_status: ["draft", "sent", "paid", "overdue", "cancelled"],
      jurisdiction: [
        "bih_fbih",
        "bih_rs",
        "bih_brcko",
        "serbia",
        "croatia",
        "montenegro",
        "slovenia",
      ],
      subscription_status: [
        "trial",
        "active",
        "cancelled",
        "expired",
        "past_due",
      ],
      subscription_tier: ["solo", "professional", "firm"],
      time_entry_status: ["pending", "approved", "billed"],
      user_role: ["owner", "lawyer", "admin", "assistant"],
    },
  },
} as const

