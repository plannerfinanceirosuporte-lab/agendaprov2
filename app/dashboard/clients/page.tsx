'use client';

import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Users,
  Phone,
  Mail,
  Star,
  Calendar,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useClientStore } from '@/lib/store';

export default function ClientsPage() {
  const { clients, fetchClients, addClient, updateClient, deleteClient, isLoading } = useClientStore();
  const [showNewClient, setShowNewClient] = useState(false);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize data asynchronously
    const initializeData = async () => {
      try {
        await fetchClients();
      } catch (error) {
        console.error('Error loading clients:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    initializeData();
  }, []);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const handleDeleteClient = async (clientId: string) => {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      await deleteClient(clientId);
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
                <h1 className="text-2xl font-bold text-white">Clientes</h1>
                <p className="text-sm text-gray-400">Gerencie sua base de clientes</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowNewClient(true)}
              className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-3 rounded-xl font-semibold"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Cliente
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
              placeholder="Buscar clientes por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-[#333] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED] focus:border-transparent"
            />
          </div>
        </Card>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7C3AED] mx-auto"></div>
              <p className="text-gray-400 mt-4">Carregando clientes...</p>
            </div>
          ) : filteredClients.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">
                {searchTerm ? 'Nenhum cliente encontrado' : 'Nenhum cliente cadastrado'}
              </h4>
              <p className="text-gray-400 mb-6">
                {searchTerm ? 'Tente ajustar o termo de busca' : 'Comece adicionando seu primeiro cliente'}
              </p>
              {!searchTerm && (
                <Button 
                  onClick={() => setShowNewClient(true)}
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Primeiro Cliente
                </Button>
              )}
            </div>
          ) : (
            filteredClients.map((client) => (
              <Card key={client.id} className="bg-[#2A2A2A] border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#7C3AED]/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setEditingClient(client)}
                      className="text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteClient(client.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-white mb-2">{client.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    {client.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    {client.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {client.total_visits} visitas
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-400">{client.loyalty_points} pontos</span>
                  </div>
                  {client.last_visit && (
                    <span className="text-xs text-gray-500">
                      Última visita: {new Date(client.last_visit).toLocaleDateString('pt-BR')}
                    </span>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* New/Edit Client Modal */}
      {(showNewClient || editingClient) && (
        <ClientModal
          isOpen={showNewClient || !!editingClient}
          onClose={() => {
            setShowNewClient(false);
            setEditingClient(null);
          }}
          client={editingClient}
          onSave={editingClient ? updateClient : addClient}
        />
      )}
    </div>
  );
}

function ClientModal({ 
  isOpen, 
  onClose, 
  client, 
  onSave 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  client?: any;
  onSave: (id: string, data: any) => Promise<void>;
}) {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    whatsapp: client?.whatsapp || '',
    loyalty_points: client?.loyalty_points || 0,
    total_visits: client?.total_visits || 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const clientData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp || formData.phone,
        loyalty_points: parseInt(formData.loyalty_points.toString()),
        total_visits: parseInt(formData.total_visits.toString())
      };

      if (client) {
        await onSave(client.id, clientData);
      } else {
        await onSave('', clientData);
      }

      onClose();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
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
              {client ? 'Editar Cliente' : 'Novo Cliente'}
            </h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-gray-300 hover:bg-gray-700">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              Nome Completo *
            </Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Maria Silva"
              className="bg-[#333] border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              E-mail *
            </Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="maria@email.com"
              className="bg-[#333] border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              Telefone *
            </Label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="(11) 99999-9999"
              className="bg-[#333] border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label className="block text-sm font-medium text-gray-300 mb-2">
              WhatsApp
            </Label>
            <Input
              value={formData.whatsapp}
              onChange={(e) => setFormData(prev => ({ ...prev, whatsapp: e.target.value }))}
              placeholder="(11) 99999-9999"
              className="bg-[#333] border-gray-600 text-white"
            />
          </div>

          {client && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Pontos de Fidelidade
                </Label>
                <Input
                  type="number"
                  value={formData.loyalty_points}
                  onChange={(e) => setFormData(prev => ({ ...prev, loyalty_points: parseInt(e.target.value) || 0 }))}
                  className="bg-[#333] border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-300 mb-2">
                  Total de Visitas
                </Label>
                <Input
                  type="number"
                  value={formData.total_visits}
                  onChange={(e) => setFormData(prev => ({ ...prev, total_visits: parseInt(e.target.value) || 0 }))}
                  className="bg-[#333] border-gray-600 text-white"
                />
              </div>
            </div>
          )}

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
              {isSubmitting ? 'Salvando...' : (client ? 'Atualizar' : 'Criar')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}