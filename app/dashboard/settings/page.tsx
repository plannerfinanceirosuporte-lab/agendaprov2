'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  ArrowLeft,
  Building2,
  Clock,
  MessageSquare,
  CreditCard,
  Users,
  Bell,
  Shield,
  Palette,
  Save,
  CheckCircle,
  Settings as SettingsIcon
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('salon');
  const [isSaving, setIsSaving] = useState(false);
  
  const [salonData, setSalonData] = useState({
    name: 'Studio Bella Vita',
    address: 'Rua das Flores, 123 - Jardim Paulista, São Paulo - SP',
    phone: '(11) 3000-0000',
    whatsapp: '(11) 99999-9999',
    email: 'contato@studiobella.com.br',
    website: 'www.studiobella.com.br'
  });

  const [workingHours, setWorkingHours] = useState({
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '09:00', close: '16:00', closed: false },
    sunday: { open: '09:00', close: '16:00', closed: true },
  });

  const [notifications, setNotifications] = useState({
    whatsapp_reminders: true,
    email_confirmations: true,
    sms_backup: false,
    push_notifications: true
  });

  const tabs = [
    { id: 'salon', label: 'Dados do Salão', icon: Building2 },
    { id: 'hours', label: 'Horários', icon: Clock },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
    { id: 'payments', label: 'Pagamentos', icon: CreditCard },
    { id: 'team', label: 'Equipe', icon: Users },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
  ];

  const dayNames: { [key: string]: string } = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo',
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'salon':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-agendapro-dark mb-4">Informações Básicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Nome do Salão</Label>
                  <Input
                    id="name"
                    value={salonData.name}
                    onChange={(e) => setSalonData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={salonData.email}
                    onChange={(e) => setSalonData(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input
                    id="address"
                    value={salonData.address}
                    onChange={(e) => setSalonData(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={salonData.phone}
                    onChange={(e) => setSalonData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={salonData.whatsapp}
                    onChange={(e) => setSalonData(prev => ({ ...prev, whatsapp: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'hours':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-agendapro-dark mb-4">Horários de Funcionamento</h3>
              <div className="space-y-4">
                {Object.entries(workingHours).map(([day, hours]) => (
                  <Card key={day} className="p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium w-32">{dayNames[day]}</span>
                        
                        {!hours.closed ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={hours.open}
                              onChange={(e) => {
                                const newHours = { ...workingHours };
                                // @ts-ignore
                                newHours[day].open = e.target.value;
                                setWorkingHours(newHours);
                              }}
                              className="w-24"
                            />
                            <span className="text-gray-500">às</span>
                            <Input
                              type="time"
                              value={hours.close}
                              onChange={(e) => {
                                const newHours = { ...workingHours };
                                // @ts-ignore
                                newHours[day].close = e.target.value;
                                setWorkingHours(newHours);
                              }}
                              className="w-24"
                            />
                          </div>
                        ) : (
                          <span className="text-gray-500 italic">Fechado</span>
                        )}
                      </div>
                      
                      <Button
                        type="button"
                        variant={hours.closed ? "outline" : "secondary"}
                        size="sm"
                        onClick={() => {
                          const newHours = { ...workingHours };
                          // @ts-ignore
                          newHours[day].closed = !hours.closed;
                          setWorkingHours(newHours);
                        }}
                      >
                        {hours.closed ? 'Abrir' : 'Fechar'}
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 'whatsapp':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-agendapro-dark mb-4">Configurações do WhatsApp</h3>
              <Card className="p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">WhatsApp Business</h4>
                      <p className="text-sm text-gray-600">Status: Conectado</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Lembretes automáticos</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Confirmações de agendamento</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mensagens de pós-atendimento</span>
                    <input type="checkbox" defaultChecked className="rounded" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'payments':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-agendapro-dark mb-4">Métodos de Pagamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Stripe</h4>
                        <p className="text-sm text-gray-600">Cartões de crédito/débito</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Configurar
                  </Button>
                </Card>

                <Card className="p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                          PIX
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">PIX</h4>
                        <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                      </div>
                    </div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Configurar
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-agendapro-dark mb-4">Preferências de Notificação</h3>
              <Card className="p-6 border border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Lembretes por WhatsApp</span>
                      <p className="text-sm text-gray-600">Enviar lembretes automáticos aos clientes</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.whatsapp_reminders}
                      onChange={(e) => setNotifications(prev => ({ ...prev, whatsapp_reminders: e.target.checked }))}
                      className="rounded" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Confirmações por E-mail</span>
                      <p className="text-sm text-gray-600">Enviar confirmações de agendamento por e-mail</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.email_confirmations}
                      onChange={(e) => setNotifications(prev => ({ ...prev, email_confirmations: e.target.checked }))}
                      className="rounded" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">SMS de Backup</span>
                      <p className="text-sm text-gray-600">Usar SMS quando WhatsApp não estiver disponível</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.sms_backup}
                      onChange={(e) => setNotifications(prev => ({ ...prev, sms_backup: e.target.checked }))}
                      className="rounded" 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Notificações Push</span>
                      <p className="text-sm text-gray-600">Receber notificações no navegador</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={notifications.push_notifications}
                      onChange={(e) => setNotifications(prev => ({ ...prev, push_notifications: e.target.checked }))}
                      className="rounded" 
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <SettingsIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Em Desenvolvimento</h4>
            <p className="text-gray-500">Esta seção estará disponível em breve.</p>
          </div>
        );
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
                <h1 className="text-2xl font-bold text-agendapro-dark">Configurações</h1>
                <p className="text-sm text-gray-500">Gerencie as configurações do seu salão</p>
              </div>
            </div>

            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-agendapro-primary hover:bg-agendapro-primary/90 text-white px-6 py-3 rounded-xl font-semibold"
            >
              {isSaving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white border-0 rounded-2xl shadow-sm p-2">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-agendapro-primary text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <Card className="bg-white border-0 rounded-2xl shadow-sm p-8">
              {renderTabContent()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}