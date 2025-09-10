/*
  # Sample Data for AgendaPro

  1. Sample Data
    - Insert sample salon
    - Insert sample professionals
    - Insert sample services
    - Insert sample clients
    - Insert sample appointments

  This migration creates sample data for development and testing purposes.
*/

-- Insert sample salon
INSERT INTO salons (id, name, slug, address, phone, whatsapp, business_type) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Studio Bella Vita', 'studio-bella-vita', 'Rua das Flores, 123 - Jardim Paulista, São Paulo - SP', '(11) 3000-0000', '(11) 99999-9999', 'salon');

-- Insert sample professionals
INSERT INTO professionals (id, salon_id, name, specialties, working_hours) VALUES
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440000', 'Ana Costa', ARRAY['Corte', 'Coloração', 'Escova'], '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}}'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440000', 'Carlos Lima', ARRAY['Corte Masculino', 'Barba'], '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}}'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440000', 'Fernanda Reis', ARRAY['Manicure', 'Pedicure', 'Nail Art'], '{"monday": {"open": "09:00", "close": "18:00"}, "tuesday": {"open": "09:00", "close": "18:00"}}');

-- Insert sample services
INSERT INTO services (id, salon_id, professional_id, name, duration, price, category) VALUES
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Corte Feminino + Escova', 90, 80.00, 'Cabelo'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002', 'Corte Masculino', 45, 35.00, 'Cabelo'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440001', 'Coloração + Corte', 180, 150.00, 'Cabelo'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440003', 'Manicure + Pedicure', 60, 50.00, 'Unhas'),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440002', 'Barba + Bigode', 30, 25.00, 'Barba');

-- Insert sample clients
INSERT INTO clients (id, name, email, phone, whatsapp, loyalty_points, total_visits, last_visit) VALUES
('550e8400-e29b-41d4-a716-446655440020', 'Maria Silva', 'maria@email.com', '(11) 99999-1111', '(11) 99999-1111', 150, 8, '2024-01-10'),
('550e8400-e29b-41d4-a716-446655440021', 'João Santos', 'joao@email.com', '(11) 99999-2222', '(11) 99999-2222', 75, 4, '2024-01-05'),
('550e8400-e29b-41d4-a716-446655440022', 'Lucia Oliveira', 'lucia@email.com', '(11) 99999-3333', '(11) 99999-3333', 200, 12, '2024-01-08'),
('550e8400-e29b-41d4-a716-446655440023', 'Pedro Costa', 'pedro@email.com', '(11) 99999-4444', '(11) 99999-4444', 50, 3, '2024-01-03');

-- Insert sample appointments for today
INSERT INTO appointments (id, salon_id, client_id, service_id, professional_id, date, time, duration, price, status, payment_status, payment_method) VALUES
('550e8400-e29b-41d4-a716-446655440030', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440020', '550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', CURRENT_DATE, '09:00', 90, 80.00, 'confirmed', 'paid', 'card'),
('550e8400-e29b-41d4-a716-446655440031', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440021', '550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE, '10:30', 30, 25.00, 'pending', 'pending', 'cash'),
('550e8400-e29b-41d4-a716-446655440032', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440022', '550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440003', CURRENT_DATE, '14:00', 60, 50.00, 'confirmed', 'paid', 'pix'),
('550e8400-e29b-41d4-a716-446655440033', '550e8400-e29b-41d4-a716-446655440000', '550e8400-e29b-41d4-a716-446655440023', '550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440002', CURRENT_DATE, '15:30', 45, 35.00, 'no-show', 'pending', 'cash');