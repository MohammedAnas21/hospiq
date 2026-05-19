import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// ── Types ──────────────────────────────────────────────────────────────────

export type Lead = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  business_name: string;
  business_type: string;
  message: string;
  status?: "new" | "contacted" | "closed" | "converted";
  notes?: string;
};

export type Client = {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  business_name: string;
  business_type: string;
  country?: string;
  lead_id?: string;
  status?: "active" | "inactive" | "churned";
  notes?: string;
  total_billed?: number;
};

export type Project = {
  id?: string;
  created_at?: string;
  client_id: string;
  title: string;
  description?: string;
  status?: "proposal" | "in_progress" | "review" | "completed" | "on_hold";
  start_date?: string;
  due_date?: string;
  budget?: number;
  paid?: number;
  milestones?: Milestone[];
};

export type Milestone = {
  id: string;
  title: string;
  done: boolean;
};

export type Invoice = {
  id?: string;
  created_at?: string;
  invoice_number?: string;
  client_id: string;
  project_id?: string;
  currency?: "USD" | "INR";
  items: InvoiceItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  status?: "draft" | "sent" | "paid" | "overdue";
  due_date?: string;
  paid_date?: string;
  notes?: string;
};

export type InvoiceItem = {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

export type Activity = {
  id?: string;
  created_at?: string;
  type: "lead" | "client" | "invoice" | "project" | "note";
  title: string;
  description?: string;
  ref_id?: string;
};
