import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey && supabase);
};

// Types for our database
export interface Salon {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone?: string;
  whatsapp: string;
  business_type: 'salon' | 'barbershop' | 'clinic' | 'spa' | 'nails';
  created_at: string;
  updated_at: string;
}

export interface Professional {
  id: string;
  salon_id: string;
  name: string;
  specialties: string[];
  working_hours: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  salon_id: string;
  professional_id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  loyalty_points: number;
  total_visits: number;
  last_visit?: string;
  created_at: string;
  updated_at: string;
}

export interface Appointment {
  id: string;
  salon_id: string;
  client_id: string;
  service_id: string;
  professional_id: string;
  date: string;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'no-show' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: 'card' | 'pix' | 'cash';
  notes?: string;
  created_at: string;
  updated_at: string;
}

// Database functions
export const salonService = {
  async create(salon: Omit<Salon, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('salons')
      .insert([salon])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getBySlug(slug: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('salons')
      .select('*')
      .eq('slug', slug)
      .single();
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<Salon>) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('salons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

export const serviceService = {
  async getBySalon(salonId: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        professional:professionals(name)
      `)
      .eq('salon_id', salonId);
    if (error) throw error;
    return data;
  },

  async create(service: Omit<Service, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('services')
      .insert([service])
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

export const appointmentService = {
  async create(appointment: Omit<Appointment, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointment])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getBySalon(salonId: string, date?: string) {
    if (!supabase) throw new Error('Supabase not configured');
    let query = supabase
      .from('appointments')
      .select(`
        *,
        client:clients(name, phone),
        service:services(name, duration),
        professional:professionals(name)
      `)
      .eq('salon_id', salonId);

    if (date) {
      query = query.eq('date', date);
    }

    const { data, error } = await query.order('time');
    if (error) throw error;
    return data;
  },

  async updateStatus(id: string, status: Appointment['status']) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};

export const clientService = {
  async create(client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('clients')
      .insert([client])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getByPhone(phone: string) {
    if (!supabase) throw new Error('Supabase not configured');
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('phone', phone)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }
};