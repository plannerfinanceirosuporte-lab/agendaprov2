import { create } from 'zustand';
import { supabase, isSupabaseConfigured } from './supabase';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'professional' | 'client';
  salon?: {
    id: string;
    name: string;
    slug: string;
  };
}

interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  professional_id: string;
  professional_name: string;
  category?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  loyalty_points: number;
  total_visits: number;
  last_visit?: Date;
}

interface Appointment {
  id: string;
  client_id: string;
  client_name: string;
  service_id: string;
  service_name: string;
  professional_id: string;
  professional_name: string;
  date: Date;
  time: string;
  duration: number;
  price: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'no-show' | 'completed';
  payment_status: 'pending' | 'paid' | 'refunded';
  payment_method?: 'card' | 'pix' | 'cash';
  notes?: string;
}

// Store interfaces
interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface AppointmentStore {
  appointments: Appointment[];
  isLoading: boolean;
  fetchAppointments: (salonId: string, date?: string) => Promise<void>;
  addAppointment: (appointment: Omit<Appointment, 'id'>) => Promise<void>;
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  getAppointmentsByDate: (date: Date) => Appointment[];
  getAppointmentsByStatus: (status: Appointment['status']) => Appointment[];
}

interface ServiceStore {
  services: Service[];
  isLoading: boolean;
  fetchServices: (salonId: string) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, updates: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
}

interface ClientStore {
  clients: Client[];
  isLoading: boolean;
  fetchClients: () => Promise<void>;
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  updateClient: (id: string, updates: Partial<Client>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  getClientById: (id: string) => Client | undefined;
}

// Auth Store
export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
  updateUser: (updates) => set((state) => ({
    user: state.user ? { ...state.user, ...updates } : null
  })),
}));

// Appointment Store
export const useAppointmentStore = create<AppointmentStore>((set, get) => ({
  appointments: [],
  isLoading: false,
  
  fetchAppointments: async (salonId: string, date?: string) => {
    set({ isLoading: true });
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase not configured, using mock data');
        set({ appointments: [], isLoading: false });
        return;
      }

      let query = supabase
        .from('appointments')
        .select(`
          *,
          clients!appointments_client_id_fkey(name, phone),
          services!appointments_service_id_fkey(name, duration),
          professionals!appointments_professional_id_fkey(name)
        `)
        .eq('salon_id', salonId);

      if (date) {
        query = query.eq('date', date);
      }

      const { data, error } = await query.order('time');
      
      if (error) throw error;

      const appointments = data?.map(apt => ({
        id: apt.id,
        client_id: apt.client_id,
        client_name: apt.clients?.name || 'Cliente',
        service_id: apt.service_id,
        service_name: apt.services?.name || 'Serviço',
        professional_id: apt.professional_id,
        professional_name: apt.professionals?.name || 'Profissional',
        date: new Date(apt.date),
        time: apt.time,
        duration: apt.duration,
        price: apt.price,
        status: apt.status,
        payment_status: apt.payment_status,
        payment_method: apt.payment_method,
        notes: apt.notes,
      })) || [];

      set({ appointments, isLoading: false });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      set({ isLoading: false });
    }
  },

  addAppointment: async (appointment) => {
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase
        .from('appointments')
        .insert([{
          salon_id: '550e8400-e29b-41d4-a716-446655440000', // Default salon ID
          client_id: appointment.client_id,
          service_id: appointment.service_id,
          professional_id: appointment.professional_id,
          date: appointment.date.toISOString().split('T')[0],
          time: appointment.time,
          duration: appointment.duration,
          price: appointment.price,
          status: appointment.status,
          payment_status: appointment.payment_status,
          payment_method: appointment.payment_method,
          notes: appointment.notes,
        }])
        .select()
        .single();

      if (error) throw error;

      const newAppointment = {
        ...appointment,
        id: data.id,
      };

      set((state) => ({
        appointments: [...state.appointments, newAppointment]
      }));
    } catch (error) {
      console.error('Error adding appointment:', error);
    }
  },

  updateAppointment: async (id, updates) => {
    try {
      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        appointments: state.appointments.map(apt => 
          apt.id === id ? { ...apt, ...updates } : apt
        )
      }));
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  },

  deleteAppointment: async (id) => {
    try {

      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        appointments: state.appointments.filter(apt => apt.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  },

  getAppointmentsByDate: (date) => {
    const appointments = get().appointments;
    return appointments.filter(apt => 
      apt.date.toDateString() === date.toDateString()
    );
  },

  getAppointmentsByStatus: (status) => {
    const appointments = get().appointments;
    return appointments.filter(apt => apt.status === status);
  },
}));

// Service Store
export const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  isLoading: false,

  fetchServices: async (salonId: string) => {
    set({ isLoading: true });
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase not configured, using mock data');
        set({ services: [], isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from('services')
        .select(`
          *,
          professionals!services_professional_id_fkey(name)
        `)
        .eq('salon_id', salonId);

      if (error) throw error;

      const services = data?.map(service => ({
        id: service.id,
        name: service.name,
        duration: service.duration,
        price: service.price,
        professional_id: service.professional_id,
        professional_name: service.professionals?.name || 'Profissional',
        category: service.category,
      })) || [];

      set({ services, isLoading: false });
    } catch (error) {
      console.error('Error fetching services:', error);
      set({ isLoading: false });
    }
  },

  addService: async (service) => {
    try {
      // Validate required fields
      if (!service.name || !service.name.trim()) {
        throw new Error('Nome do serviço é obrigatório');
      }
      
      if (!service.duration || service.duration <= 0) {
        throw new Error('Duração deve ser maior que zero');
      }
      
      if (!service.price || service.price <= 0) {
        throw new Error('Preço deve ser maior que zero');
      }
      
      if (!service.professional_id) {
        throw new Error('Profissional é obrigatório');
      }

      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase
        .from('services')
        .insert([{
          salon_id: '550e8400-e29b-41d4-a716-446655440000', // Default salon ID
          name: service.name.trim(),
          duration: service.duration,
          price: service.price,
          professional_id: service.professional_id,
          category: service.category || null,
        }])
        .select()
        .single();

      if (error) throw error;

      const newService = {
        ...service,
        id: data.id,
      };

      set((state) => ({
        services: [...state.services, newService]
      }));
    } catch (error) {
      console.error('Error adding service:', error);
    }
  },

  updateService: async (id, updates) => {
    try {
      // Validate required fields if they are being updated
      if (updates.name !== undefined && (!updates.name || !updates.name.trim())) {
        throw new Error('Nome do serviço é obrigatório');
      }
      
      if (updates.duration !== undefined && (!updates.duration || updates.duration <= 0)) {
        throw new Error('Duração deve ser maior que zero');
      }
      
      if (updates.price !== undefined && (!updates.price || updates.price <= 0)) {
        throw new Error('Preço deve ser maior que zero');
      }
      
      // Clean up the updates object
      const cleanUpdates = { ...updates };
      if (cleanUpdates.name) {
        cleanUpdates.name = cleanUpdates.name.trim();
      }
      if (cleanUpdates.category === '') {
        (cleanUpdates as any).category = null;
      }

      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase
        .from('services')
        .update(cleanUpdates)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        services: state.services.map(service => 
          service.id === id ? { ...service, ...cleanUpdates } : service
        )
      }));
    } catch (error) {
      console.error('Error updating service:', error);
    }
  },

  deleteService: async (id) => {
    try {

      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        services: state.services.filter(service => service.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  },
}));

// Client Store
export const useClientStore = create<ClientStore>((set, get) => ({
  clients: [],
  isLoading: false,

  fetchClients: async () => {
    set({ isLoading: true });
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured() || !supabase) {
        console.warn('Supabase not configured, using mock data');
        set({ clients: [], isLoading: false });
        return;
      }

      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');

      if (error) throw error;

      const clients = data?.map(client => ({
        id: client.id,
        name: client.name,
        email: client.email,
        phone: client.phone,
        whatsapp: client.whatsapp,
        loyalty_points: client.loyalty_points,
        total_visits: client.total_visits,
        last_visit: client.last_visit ? new Date(client.last_visit) : undefined,
      })) || [];

      set({ clients, isLoading: false });
    } catch (error) {
      console.error('Error fetching clients:', error);
      set({ isLoading: false });
    }
  },

  addClient: async (client) => {
    try {

      if (!supabase) throw new Error('Supabase not configured');
      const { data, error } = await supabase
        .from('clients')
        .insert([client])
        .select()
        .single();

      if (error) throw error;

      const newClient = {
        ...client,
        id: data.id,
      };

      set((state) => ({
        clients: [...state.clients, newClient]
      }));
    } catch (error) {
      console.error('Error adding client:', error);
    }
  },

  updateClient: async (id, updates) => {
    try {

      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        clients: state.clients.map(client => 
          client.id === id ? { ...client, ...updates } : client
        )
      }));
    } catch (error) {
      console.error('Error updating client:', error);
    }
  },

  deleteClient: async (id) => {
    try {

      if (!supabase) throw new Error('Supabase not configured');
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        clients: state.clients.filter(client => client.id !== id)
      }));
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  },

  getClientById: (id) => {
    const clients = get().clients;
    return clients.find(client => client.id === id);
  },
}));

// Dashboard stats hook
export const useDashboardStats = () => {
  const appointments = useAppointmentStore((state) => state.appointments);
  
  const today = new Date();
  const todayAppointments = appointments.filter(apt => 
    apt.date.toDateString() === today.toDateString()
  );
  
  return {
    totalAppointments: todayAppointments.length,
    confirmed: todayAppointments.filter(apt => apt.status === 'confirmed').length,
    pending: todayAppointments.filter(apt => apt.status === 'pending').length,
    noShow: todayAppointments.filter(apt => apt.status === 'no-show').length,
    revenue: todayAppointments
      .filter(apt => apt.payment_status === 'paid')
      .reduce((sum, apt) => sum + apt.price, 0),
  };
};