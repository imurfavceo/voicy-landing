export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: {
          id: string
          email: string
          phone: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          phone: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type WaitlistEntry = Database['public']['Tables']['waitlist']['Row']
export type NewWaitlistEntry = Database['public']['Tables']['waitlist']['Insert'] 