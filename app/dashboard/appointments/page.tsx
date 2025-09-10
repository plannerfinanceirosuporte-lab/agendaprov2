'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calendar,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  ArrowLeft,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import { useAppointmentStore, useServiceStore, useClientStore } from '@/lib/store';

export default function AppointmentsPage() {
  const { appointments, fetchAppointments, updateAppointment, deleteAppointment, isLoading } = useAppointmentStore();
  const { fetchServices } = useServiceStore();
  const { fetchClients } = useClientStore();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Default salon ID
  const salonId = '550e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    fetchAppointments(salonId, selectedDate);
    fetchServices(salonId);
    fetchClients();
  }, [fetchAppointments, fetchServices, fetchClients, salonId, selectedDate]);

  const filteredAppointments = appointments.filter(apt => {
  const matchesSearch = apt.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
             apt.service_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'no-show': return 'text-red-600 bg-red-50 border-red-200';
      case 'completed': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'cancelled': return 'text-gray-600 bg-gray-50 border-gray-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'pending': return 'Pendente';
      case 'no-show': return 'Faltou';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      default: return 'Desconhecido';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'no-show': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    await updateAppointment(appointmentId, { status: newStatus as any });
  };

  const handleDeleteAppointment = async (appointmentId: string) => {
    if (confirm('Tem certeza que deseja excluir este agendamento?')) {
      await deleteAppointment(appointmentId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-agendapro-dark">Agendamentos</h1>
                <p className="text-sm text-gray-500">Gerencie todos os agendamentos</p>
              </div>
            </div>

            <Link href="/dashboard">
              <Button className="bg-agendapro-primary hover:bg-agendapro-primary/90 text-white px-6 py-3 rounded-xl font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                Novo Agendamento
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Filters */}
        <Card className="bg-white border-0 rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por cliente ou serviço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-agendapro-primary focus:border-transparent w-full sm:w-64"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-agendapro-primary focus:border-transparent"
              >
                <option value="all">Todos os status</option>
                <option value="pending">Pendente</option>
                <option value="confirmed">Confirmado</option>
                <option value="completed">Concluído</option>
                <option value="cancelled">Cancelado</option>
                <option value="no-show">Faltou</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-agendapro-primary focus:border-transparent"
              />
            </div>
          </div>
        </Card>

        {/* Appointments List */}
        <Card className="bg-white border-0 rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-agendapro-dark">
                  Agendamentos - {new Date(selectedDate).toLocaleDateString('pt-BR')}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {filteredAppointments.length} agendamento(s) encontrado(s)
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agendapro-primary mx-auto"></div>
                <p className="text-gray-500 mt-4">Carregando agendamentos...</p>
              </div>
            ) : filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchTerm || statusFilter !== 'all' 
                    ? 'Nenhum agendamento encontrado' 
                    : 'Nenhum agendamento para esta data'
                  }
                </h4>
                <p className="text-gray-500 mb-6">
                  {searchTerm || statusFilter !== 'all'
                    ? 'Tente ajustar os filtros de busca'
                    : 'Que tal criar o primeiro agendamento?'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:shadow-md hover:border-agendapro-primary/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-center min-w-[60px]">
                        <div className="text-lg font-bold text-agendapro-dark">{appointment.time}</div>
                        <div className="text-xs text-gray-500 font-medium">
                          {appointment.duration}min
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="font-semibold text-agendapro-dark text-lg mb-1">
                          {appointment.client_name}
                        </div>
                        <div className="text-sm text-gray-600 mb-1">
                          {appointment.service_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          com {appointment.professional_name || appointment.professional_id}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="font-bold text-agendapro-dark text-lg mb-1">
                          R$ {appointment.price.toFixed(2)}
                        </div>
                        <div className={`text-xs px-3 py-1 rounded-full font-medium border flex items-center space-x-1 ${getStatusColor(appointment.status)}`}>
                          {getStatusIcon(appointment.status)}
                          <span>{getStatusText(appointment.status)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {appointment.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleStatusChange(appointment.id, 'confirmed')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Confirmar
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleStatusChange(appointment.id, 'cancelled')}
                              className="border-red-200 text-red-600 hover:bg-red-50"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Cancelar
                            </Button>
                          </>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <Button
                            size="sm"
                            onClick={() => handleStatusChange(appointment.id, 'completed')}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Concluir
                          </Button>
                        )}

                        <div className="relative group">
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                          
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            <div className="py-1">
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                <Eye className="w-4 h-4 mr-2" />
                                Ver Detalhes
                              </button>
                              <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </button>
                              <button 
                                onClick={() => handleDeleteAppointment(appointment.id)}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}