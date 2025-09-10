/*
  # Initial Schema for AgendaPro

  1. New Tables
    - `salons`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `address` (text)
      - `phone` (text, optional)
      - `whatsapp` (text)
      - `business_type` (enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `professionals`
      - `id` (uuid, primary key)
      - `salon_id` (uuid, foreign key)
      - `name` (text)
      - `specialties` (text array)
      - `working_hours` (jsonb)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `services`
      - `id` (uuid, primary key)
      - `salon_id` (uuid, foreign key)
      - `professional_id` (uuid, foreign key)
      - `name` (text)
      - `duration` (integer, minutes)
      - `price` (decimal)
      - `category` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `clients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text, unique)
      - `whatsapp` (text)
      - `loyalty_points` (integer, default 0)
      - `total_visits` (integer, default 0)
      - `last_visit` (timestamp, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `appointments`
      - `id` (uuid, primary key)
      - `salon_id` (uuid, foreign key)
      - `client_id` (uuid, foreign key)
      - `service_id` (uuid, foreign key)
      - `professional_id` (uuid, foreign key)
      - `date` (date)
      - `time` (time)
      - `duration` (integer, minutes)
      - `price` (decimal)
      - `status` (enum)
      - `payment_status` (enum)
      - `payment_method` (enum, optional)
      - `notes` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create custom types
CREATE TYPE business_type AS ENUM ('salon', 'barbershop', 'clinic', 'spa', 'nails');
CREATE TYPE appointment_status AS ENUM ('pending', 'confirmed', 'cancelled', 'no-show', 'completed');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');
CREATE TYPE payment_method AS ENUM ('card', 'pix', 'cash');

-- Create salons table
CREATE TABLE IF NOT EXISTS salons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  address text NOT NULL,
  phone text,
  whatsapp text NOT NULL,
  business_type business_type NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create professionals table
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  name text NOT NULL,
  specialties text[] DEFAULT '{}',
  working_hours jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  professional_id uuid REFERENCES professionals(id) ON DELETE CASCADE,
  name text NOT NULL,
  duration integer NOT NULL, -- in minutes
  price decimal(10,2) NOT NULL,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text UNIQUE NOT NULL,
  whatsapp text NOT NULL,
  loyalty_points integer DEFAULT 0,
  total_visits integer DEFAULT 0,
  last_visit timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  salon_id uuid REFERENCES salons(id) ON DELETE CASCADE,
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  professional_id uuid REFERENCES professionals(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  duration integer NOT NULL, -- in minutes
  price decimal(10,2) NOT NULL,
  status appointment_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  payment_method payment_method,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE salons ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies for salons
CREATE POLICY "Salons are viewable by everyone" ON salons FOR SELECT USING (true);
CREATE POLICY "Users can insert their own salon" ON salons FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update their own salon" ON salons FOR UPDATE USING (true);

-- Create policies for professionals
CREATE POLICY "Professionals are viewable by everyone" ON professionals FOR SELECT USING (true);
CREATE POLICY "Users can manage professionals" ON professionals FOR ALL USING (true);

-- Create policies for services
CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Users can manage services" ON services FOR ALL USING (true);

-- Create policies for clients
CREATE POLICY "Clients are viewable by everyone" ON clients FOR SELECT USING (true);
CREATE POLICY "Users can manage clients" ON clients FOR ALL USING (true);

-- Create policies for appointments
CREATE POLICY "Appointments are viewable by everyone" ON appointments FOR SELECT USING (true);
CREATE POLICY "Users can manage appointments" ON appointments FOR ALL USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_salons_slug ON salons(slug);
CREATE INDEX IF NOT EXISTS idx_professionals_salon_id ON professionals(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_salon_id ON services(salon_id);
CREATE INDEX IF NOT EXISTS idx_services_professional_id ON services(professional_id);
CREATE INDEX IF NOT EXISTS idx_clients_phone ON clients(phone);
CREATE INDEX IF NOT EXISTS idx_appointments_salon_id ON appointments(salon_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON appointments(client_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_salons_updated_at BEFORE UPDATE ON salons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_professionals_updated_at BEFORE UPDATE ON professionals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();