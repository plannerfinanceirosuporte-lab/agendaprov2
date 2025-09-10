'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Scissors,
  Clock,
  DollarSign,
  User,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useServiceStore } from '@/lib/store';

export default function ServicesPage() {
  const { services, fetchServices, addService, updateService, deleteService, isLoading } = useServiceStore();
  const [showNewService, setShowNewService] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  const salonId = '550e8400-e29b-41d4-a716-446655440000';

  useEffect(() => {
    // Initialize data asynchronously
    const initializeData = async () => {
      try {
        await fetchServices(salonId);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.professional_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteService = async (serviceId: string) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      await deleteService(serviceId);
    }
  };

  return (
    <div className="min-h-screen bg-[#222]">
      {/* Header */}
      <header className="border-b border-gray-700 bg-[#2A2A2A] shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-400 hover:text-gray-300 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Serviços</h1>
                <p className="text-sm text-gray-400">Gerencie os serviços do seu salão</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowNewService(true)}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Serviço
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        {/* Search */}
        <Card className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm mb-8">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-[#333] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
            />
          </div>
        </Card>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C3AED] mx-auto"></div>
              <p className="text-gray-400 mt-4">Carregando serviços...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {searchTerm ? 'Nenhum serviço encontrado' : 'Nenhum serviço cadastrado'}
              </h4>
              <p className="text-gray-400 mb-6">
                {searchTerm ? 'Tente ajustar o termo de busca' : 'Comece criando seu primeiro serviço'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowNewService(true)}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar Primeiro Serviço
                </Button>
              )}
            </div>
          ) : (
            filteredServices.map((service) => (
              <Card key={service.id} className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#7C3AED]/20 rounded-xl flex items-center justify-center">
                    <Scissors className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingService(service)}
                      className="text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{service.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Clock className="w-4 h-4 mr-2" />
                    {service.duration} minutos
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <DollarSign className="w-4 h-4 mr-2" />
                    R$ {service.price.toFixed(2)}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <User className="w-4 h-4 mr-2" />
                    {service.professional_name}
                  </div>
                </div>

                {service.category && (
                  <div className="inline-block px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">
                    {service.category}
                  </div>
                )}
              </Card>
            ))
          )}
        </div>
      </div>

      {/* New/Edit Service Modal */}
      {(showNewService || editingService) && (
        <ServiceModal
          isOpen={showNewService || !!editingService}
          onClose={() => {
            setShowNewService(false);
            setEditingService(null);
          }}
          service={editingService}
          onAddService={addService}
          onUpdateService={updateService}
        />
      )}
    </div>
  );
}

function ServiceModal({ 
  isOpen, 
  onClose, 
  service, 
  onAddService,
  onUpdateService
}: { 
  isOpen: boolean; 
  onClose: () => void;
  service?: any;
  onAddService: (data: any) => Promise<void>;
  onUpdateService: (id: string, data: any) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    duration: service?.duration || '',
    price: service?.price || '',
    category: service?.category || '',
    professional_id: service?.professional_id || '550e8400-e29b-41d4-a716-446655440001',
    professional_name: service?.professional_name || 'Ana Costa'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.name.trim()) {
      alert('Nome do serviço é obrigatório');
      return;
    }
    
    if (!formData.duration || parseInt(formData.duration) <= 0) {
      alert('Duração deve ser maior que zero');
      return;
    }
    
    if (!formData.price || parseFloat(formData.price) <= 0) {
      alert('Preço deve ser maior que zero');
      return;
    }
    
    setIsSubmitting(true);

    try {
      const serviceData = {
        name: formData.name.trim(),
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        category: formData.category || null,
        professional_id: formData.professional_id,
        professional_name: formData.professional_name
      };

      if (service) {
        await onUpdateService(service.id, serviceData);
      } else {
        await onAddService(serviceData);
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#2A2A2A] rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">
              {service ? 'Editar Serviço' : 'Novo Serviço'}
            </h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-gray-300 hover:bg-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              Nome do Serviço *
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Corte + Escova"
              className="bg-[#333] border-gray-600 text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-300 mb-2">
                Duração (min) *
              </Label>
              <Input
                type="number"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="60"
                className="bg-[#333] border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <Label className="block text-sm font-medium text-gray-300 mb-2">
                Preço (R$) *
              </Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="80.00"
                className="bg-[#333] border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              Categoria
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-[#333] border-gray-600 text-white">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent className="bg-[#333] border-gray-600">
                <SelectItem value="Cabelo" className="text-white hover:bg-gray-700">Cabelo</SelectItem>
                <SelectItem value="Unhas" className="text-white hover:bg-gray-700">Unhas</SelectItem>
                <SelectItem value="Barba" className="text-white hover:bg-gray-700">Barba</SelectItem>
                <SelectItem value="Estética" className="text-white hover:bg-gray-700">Estética</SelectItem>
                <SelectItem value="Massagem" className="text-white hover:bg-gray-700">Massagem</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              Profissional *
            </Label>
            <Select value={formData.professional_id} onValueChange={(value) => {
              const professionalNames: { [key: string]: string } = {
                '550e8400-e29b-41d4-a716-446655440001': 'Ana Costa',
                '550e8400-e29b-41d4-a716-446655440002': 'Carlos Lima',
                '550e8400-e29b-41d4-a716-446655440003': 'Fernanda Reis'
              };
              setFormData(prev => ({ 
                ...prev, 
                professional_id: value,
                professional_name: professionalNames[value] || ''
              }));
            }}>
              <SelectTrigger className="bg-[#333] border-gray-600 text-white">
                <SelectValue placeholder="Selecione um profissional" />
              </SelectTrigger>
              <SelectContent className="bg-[#333] border-gray-600">
                <SelectItem value="550e8400-e29b-41d4-a716-446655440001" className="text-white hover:bg-gray-700">Ana Costa</SelectItem>
                <SelectItem value="550e8400-e29b-41d4-a716-446655440002" className="text-white hover:bg-gray-700">Carlos Lima</SelectItem>
                <SelectItem value="550e8400-e29b-41d4-a716-446655440003" className="text-white hover:bg-gray-700">Fernanda Reis</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button 
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300 bg-transparent hover:bg-gray-700"
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
            >
              {isSubmitting ? 'Salvando...' : (service ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}