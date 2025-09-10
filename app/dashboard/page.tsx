'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Users,
  DollarSign,
  Clock,
  Plus,
  TrendingUp,
  UserX,
  CheckCircle,
  Bell,
  Settings,
  BarChart3,
  MessageSquare,
  CreditCard,
  Scissors,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useAppointmentStore, useServiceStore, useClientStore, useDashboardStats } from '@/lib/store';

export default function DashboardPage() {
  const { appointments, fetchAppointments, addAppointment, updateAppointment, isLoading } = useAppointmentStore();
  const { services, fetchServices } = useServiceStore();
  const { clients, fetchClients } = useClientStore();
  const todayStats = useDashboardStats();
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Default salon ID - in a real app, this would come from user context
  const salonId = '550e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    // Initialize data asynchronously without blocking render
    const initializeData = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch data in parallel for better performance
        await Promise.all([
          fetchAppointments(salonId, today),
          fetchServices(salonId),
          fetchClients()
        ]);
      } catch (error) {
        console.error('Error initializing dashboard data:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  // Get today's appointments
  const today = new Date();
  const todayAppointments = appointments.filter(apt => 
    apt.date.toDateString() === today.toDateString()
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
      case 'pending': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
      case 'no-show': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'completed': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'no-show': return 'Faltou';
      case 'completed': return 'Concluído';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="min-h-screen bg-[#222]">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#2A2A2A] shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Studio Bella Vita</h1>
                  <p className="text-sm text-gray-400">Dashboard Administrativo</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar agendamentos..."
                  className="pl-10 pr-4 py-2 bg-[#333] border border-gray-600 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                />
              </div>
              
              <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700 bg-transparent">
                <Bell className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Notificações</span>
              </Button>
              
              <Link href="/dashboard/settings">
                <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 hover:bg-gray-700 bg-transparent">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Configurações</span>
                </Button>
              </Link>
              
              <div className="w-10 h-10 bg-gradient-to-br from-[#7C3AED] to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-semibold">MS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Boa tarde, Maria! 👋
              </h2>
              <p className="text-gray-400">
                Você tem {todayStats.pending} agendamentos pendentes de confirmação hoje.
              </p>
            </div>
            
            <Button 
              onClick={() => setShowNewAppointment(true)}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Agendamentos Hoje
                </p>
                <p className="text-3xl font-bold text-white">
                  {todayStats.totalAppointments}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  +12% vs ontem
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Confirmados
                </p>
                <p className="text-3xl font-bold text-emerald-400">
                  {todayStats.confirmed}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {Math.round((todayStats.confirmed / todayStats.totalAppointments) * 100) || 0}% do total
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Receita Hoje
                </p>
                <p className="text-3xl font-bold text-[#7C3AED]">
                  R$ {todayStats.revenue.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  +8% vs ontem
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#7C3AED]" />
              </div>
            </div>
          </Card>

          <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400 mb-1">
                  Taxa de Presença
                </p>
                <p className="text-3xl font-bold text-white">
                  {Math.round(((todayStats.totalAppointments - todayStats.noShow) / todayStats.totalAppointments) * 100) || 0}%
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {todayStats.noShow} faltas hoje
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-400" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agenda do Dia */}
          <div className="lg:col-span-2">
            <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl shadow-sm">
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">Agenda de Hoje</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date().toLocaleDateString('pt-BR', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="text-gray-300 border-gray-600 bg-transparent hover:bg-gray-700">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrar
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C3AED] mx-auto"></div>
                    <p className="text-gray-400 mt-4">Carregando agendamentos...</p>
                  </div>
                ) : todayAppointments.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Nenhum agendamento hoje</h4>
                    <p className="text-gray-400 mb-6">Que tal criar o primeiro agendamento do dia?</p>
                    <Button 
                      onClick={() => setShowNewAppointment(true)}
                      className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Criar Agendamento
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div 
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border border-gray-700 rounded-xl hover:shadow-md hover:border-[#7C3AED]/50 transition-all duration-300 group bg-[#333]/50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="text-center min-w-[60px]">
                            <div className="text-lg font-bold text-white">{appointment.time}</div>
                            <div className="text-xs text-gray-400 font-medium">
                              {appointment.duration}min
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="font-semibold text-white text-lg mb-1">
                              {appointment.client_name}
                            </div>
                            <div className="text-sm text-gray-300 mb-1">
                              {appointment.service_name}
                            </div>
                            <div className="text-xs text-gray-400">
                              com {appointment.professional_name}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="font-bold text-white text-lg mb-1">
                              R$ {appointment.price.toFixed(2)}
                            </div>
                            <div className={`text-xs px-3 py-1 rounded-full font-medium border ${getStatusColor(appointment.status)}`}>
                              {getStatusText(appointment.status)}
                            </div>
                          </div>
                          
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-300 hover:bg-gray-700">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-gray-700">
                  <Link href="/dashboard/appointments">
                    <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 py-3 rounded-xl font-medium bg-transparent">
                      Ver Todos os Agendamentos
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Button 
                  onClick={() => setShowNewAppointment(true)}
                  variant="outline" 
                  className="w-full justify-start border-gray-600 hover:bg-gray-700 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors bg-transparent text-gray-300"
                >
                  <Plus className="w-4 h-4 mr-3" />
                  Novo Agendamento
                </Button>
                <Link href="/dashboard/clients">
                  <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700 bg-transparent text-gray-300">
                    <Users className="w-4 h-4 mr-3" />
                    Gerenciar Clientes
                  </Button>
                </Link>
                <Link href="/dashboard/services">
                  <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700 bg-transparent text-gray-300">
                    <Scissors className="w-4 h-4 mr-3" />
                    Serviços
                  </Button>
                </Link>
                <Link href="/dashboard/reports">
                  <Button variant="outline" className="w-full justify-start border-gray-600 hover:bg-gray-700 bg-transparent text-gray-300">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Relatórios
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Week Overview */}
            <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-4">Resumo da Semana</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Total de Agendamentos</span>
                  <span className="font-semibold text-white">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Taxa de Comparecimento</span>
                  <span className="font-semibold text-emerald-400">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Receita Total</span>
                  <span className="font-semibold text-[#7C3AED]">R$ 3.280,00</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">Novos Clientes</span>
                  <span className="font-semibold text-blue-400">8</span>
                </div>
              </div>
            </Card>

            {/* Recent Messages */}
            <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-white mb-4">WhatsApp Recente</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Lembrete enviado</div>
                    <div className="text-xs text-gray-400">para Maria Silva • 2min atrás</div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">Confirmação recebida</div>
                    <div className="text-xs text-gray-400">de João Santos • 15min atrás</div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4 border-gray-600 hover:bg-gray-700 bg-transparent text-gray-300" size="sm">
                Ver Todas as Mensagens
              </Button>
            </Card>
          </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showNewAppointment && (
        <NewAppointmentModal 
          isOpen={showNewAppointment}
          onClose={() => setShowNewAppointment(false)}
          services={services}
          clients={clients}
          onCreateAppointment={addAppointment}
        />
      )}
    </div>
  );
}

// New Appointment Modal Component
function NewAppointmentModal({ 
  isOpen, 
  onClose, 
  services, 
  clients, 
  onCreateAppointment 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  services: any[];
  clients: any[];
  onCreateAppointment: (appointment: any) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    client_id: '',
    service_id: '',
    date: '',
    time: '',
    notes: ''
  });

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedService = services.find(s => s.id === formData.service_id);
    const selectedClient = clients.find(c => c.id === formData.client_id);
    
    if (!selectedService || !selectedClient) return;

    setIsSubmitting(true);

    try {
      await onCreateAppointment({
        client_id: formData.client_id,
        client_name: selectedClient.name,
        service_id: formData.service_id,
        service_name: selectedService.name,
        professional_id: selectedService.professional_id,
        professional_name: selectedService.professional_name,
        date: new Date(formData.date),
        time: formData.time,
        duration: selectedService.duration,
        price: selectedService.price,
        status: 'pending',
        payment_status: 'pending',
        notes: formData.notes
      });

      onClose();
      setFormData({ client_id: '', service_id: '', date: '', time: '', notes: '' });
      setStep(1);
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2A2A2A] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Novo Agendamento</h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-gray-300 hover:bg-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Cliente *
                </Label>
                <Select value={formData.client_id} onValueChange={(value) => setFormData(prev => ({ ...prev, client_id: value }))}>
                  <SelectTrigger className="w-full bg-[#333] border-gray-600 text-white">
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333] border-gray-600">
                    {clients.map(client => (
                      <SelectItem key={client.id} value={client.id} className="text-white hover:bg-gray-700">
                        {client.name} - {client.phone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Serviço *
                </Label>
                <Select value={formData.service_id} onValueChange={(value) => setFormData(prev => ({ ...prev, service_id: value }))}>
                  <SelectTrigger className="w-full bg-[#333] border-gray-600 text-white">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333] border-gray-600">
                    {services.map(service => (
                      <SelectItem key={service.id} value={service.id} className="text-white hover:bg-gray-700">
                        {service.name} - R$ {service.price.toFixed(2)} ({service.duration}min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="button"
                onClick={() => setStep(2)}
                disabled={!formData.client_id || !formData.service_id}
                className="w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-lg font-medium"
              >
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Data *
                  </Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-[#333] border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">
                    Horário *
                  </Label>
                  <Input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full bg-[#333] border-gray-600 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Observações
                </Label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full p-3 bg-[#333] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
                  placeholder="Observações adicionais..."
                />
              </div>

              <div className="flex space-x-3">
                <Button 
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 py-3 border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
                >
                  Voltar
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-3 rounded-lg font-medium"
                >
                  {isSubmitting ? 'Criando...' : 'Criar Agendamento'}
                </Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}