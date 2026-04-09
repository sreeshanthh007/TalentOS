export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = 'candidate' | 'employer' | 'admin';
export type VerificationStatus = 'pending' | 'submitted' | 'approved' | 'rejected';
export type PlanType = 'free' | 'premium' | 'enterprise';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';
export type JobType = 'full_time' | 'part_time' | 'contract' | 'internship' | 'remote' | 'hybrid';
export type JobStatus = 'draft' | 'active' | 'closed' | 'expired';
export type ApplicationStatus = 'applied' | 'shortlisted' | 'interviewing' | 'offered' | 'hired' | 'rejected';
export type InquiryStatus = 'open' | 'in_progress' | 'resolved';
export type MessageSenderRole = 'admin' | 'employer';
export type DocumentType = 'pan' | 'incorporation_certificate' | 'other';

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          role: UserRole
          is_blocked: boolean
          is_email_verified: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          role: UserRole
          is_blocked?: boolean
          is_email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          role?: UserRole
          is_blocked?: boolean
          is_email_verified?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      candidate_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          skills: string[]
          resume_url: string | null
          resume_generated: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          skills?: string[]
          resume_url?: string | null
          resume_generated?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          skills?: string[]
          resume_url?: string | null
          resume_generated?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      job_categories: {
        Row: {
          id: string
          name: string
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      employer_profiles: {
        Row: {
          id: string
          user_id: string
          company_name: string
          company_domain: string
          company_logo_url: string | null
          company_description: string | null
          industry: string | null
          website: string | null
          phone: string | null
          address: string | null
          verification_status: VerificationStatus
          is_profile_complete: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_name: string
          company_domain: string
          company_logo_url?: string | null
          company_description?: string | null
          industry?: string | null
          website?: string | null
          phone?: string | null
          address?: string | null
          verification_status?: VerificationStatus
          is_profile_complete?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_name?: string
          company_domain?: string
          company_logo_url?: string | null
          company_description?: string | null
          industry?: string | null
          website?: string | null
          phone?: string | null
          address?: string | null
          verification_status?: VerificationStatus
          is_profile_complete?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      employer_documents: {
        Row: {
          id: string
          employer_id: string
          document_type: DocumentType
          file_url: string
          file_name: string | null
          uploaded_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          document_type: DocumentType
          file_url: string
          file_name?: string | null
          uploaded_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          document_type?: DocumentType
          file_url?: string
          file_name?: string | null
          uploaded_at?: string
        }
      }
      subscription_plans: {
        Row: {
          id: string
          name: PlanType
          display_name: string
          price_monthly: number
          job_listing_limit: number
          features: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: PlanType
          display_name: string
          price_monthly: number
          job_listing_limit: number
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: PlanType
          display_name?: string
          price_monthly?: number
          job_listing_limit?: number
          features?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      employer_subscriptions: {
        Row: {
          id: string
          employer_id: string
          plan_id: string
          status: SubscriptionStatus
          started_at: string
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          plan_id: string
          status?: SubscriptionStatus
          started_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          plan_id?: string
          status?: SubscriptionStatus
          started_at?: string
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          employer_id: string
          category_id: string | null
          title: string
          description: string | null
          requirements: string | null
          location: string | null
          job_type: JobType
          salary_min: number | null
          salary_max: number | null
          experience_years: number | null
          status: JobStatus
          source: string
          views_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          category_id?: string | null
          title: string
          description?: string | null
          requirements?: string | null
          location?: string | null
          job_type?: JobType
          salary_min?: number | null
          salary_max?: number | null
          experience_years?: number | null
          status?: JobStatus
          source?: string
          views_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          category_id?: string | null
          title?: string
          description?: string | null
          requirements?: string | null
          location?: string | null
          job_type?: JobType
          salary_min?: number | null
          salary_max?: number | null
          experience_years?: number | null
          status?: JobStatus
          source?: string
          views_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          candidate_id: string
          status: ApplicationStatus
          star_rating: number | null
          employer_notes: string | null
          applied_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          candidate_id: string
          status?: ApplicationStatus
          star_rating?: number | null
          employer_notes?: string | null
          applied_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          candidate_id?: string
          status?: ApplicationStatus
          star_rating?: number | null
          employer_notes?: string | null
          applied_at?: string
          updated_at?: string
        }
      }
      shortlists: {
        Row: {
          id: string
          job_id: string
          candidate_id: string
          employer_id: string
          shortlisted_at: string
        }
        Insert: {
          id?: string
          job_id: string
          candidate_id: string
          employer_id: string
          shortlisted_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          candidate_id?: string
          employer_id?: string
          shortlisted_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          employer_id: string
          plan_id: string | null
          subject: string
          initial_message: string
          status: InquiryStatus
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          employer_id: string
          plan_id?: string | null
          subject: string
          initial_message: string
          status?: InquiryStatus
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          employer_id?: string
          plan_id?: string | null
          subject?: string
          initial_message?: string
          status?: InquiryStatus
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          inquiry_id: string
          sender_role: MessageSenderRole
          sender_id: string
          content: string
          is_read: boolean
          sent_at: string
        }
        Insert: {
          id?: string
          inquiry_id: string
          sender_role: MessageSenderRole
          sender_id: string
          content: string
          is_read?: boolean
          sent_at?: string
        }
        Update: {
          id?: string
          inquiry_id?: string
          sender_role?: MessageSenderRole
          sender_id?: string
          content?: string
          is_read?: boolean
          sent_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          author_name: string
          author_role: string | null
          avatar_url: string | null
          content: string
          rating: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_name: string
          author_role?: string | null
          avatar_url?: string | null
          content: string
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_name?: string
          author_role?: string | null
          avatar_url?: string | null
          content?: string
          rating?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
    Enums: {
      user_role: UserRole
      verification_status: VerificationStatus
      plan_type: PlanType
      subscription_status: SubscriptionStatus
      job_type: JobType
      job_status: JobStatus
      application_status: ApplicationStatus
      inquiry_status: InquiryStatus
      message_sender_role: MessageSenderRole
      document_type: DocumentType
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];
