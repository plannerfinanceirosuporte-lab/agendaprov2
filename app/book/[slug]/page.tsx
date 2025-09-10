'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { 
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Phone,
  Star,
  CheckCircle,
  CreditCard,
  Smartphone,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useServiceStore } from '@/lib/store';

export default function BookingPage({ params }: { params: { slug: string } }) {
  const { services, fetchServices, isLoading } = useServiceStore();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedProfessional, setSelectedProfessional] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);
  const [salonData, setSalonData] = useState<any>(null);
  
  const [clientData, setClientData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('');

  // Available times - in a real app, this would be dynamic based on professional availability
  const availableTimes = ['09:00', '09:30', '10:00', '11:00', '14:00', '14:30', '15:00', '16:00', '16:30'];

  useEffect(() => {
    // Fetch salon data and services
    const fetchSalonData = async () => {
      try {
        const response = await fetch(`/api/salons/${params.slug}`);
        if (response.ok) {
          const data = await response.json();
          setSalonData(data.salon);
          // Services will be fetched via the store
          fetchServices(data.salon.id);
        }
      } catch (error) {
        console.error('Error fetching salon data:', error);
        // Fallback to sample data
        setSalonData({
          name: 'Studio Bella Vita',
          address: 'Rua das Flores, 123 - Jardim Paulista, São Paulo - SP',
          phone: '(11) 3000-0000',
          whatsapp: '(11) 99999-9999',
        });
        fetchServices('550e8400-e29b-41d4-a716-446655440000');
      }
    };

    fetchSalonData();
  }, [params.slug, fetchServices]);

  const selectedServiceData = selectedService 
    ? services.find(s => s.id === selectedService.toString()) 
    : null;

  const handleServiceSelect = (serviceId: number) => {
    setSelectedService(serviceId);
    setStep(2);
  };

  const handleDateTimeSelect = () => {
    if (selectedDate && selectedTime) {
      setStep(3);
    }
  };

  const handleClientData = () => {
    if (clientData.name && clientData.email && clientData.phone) {
      setStep(4);
    }
  };

  const handleBookingConfirm = () => {
    // Aqui seria feita a integração com a API
    setStep(5);
  };

  if (!salonData) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Header */}
      <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-agendapro-primary to-agendapro-secondary rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">AgendaPro</span>
            </div>
            
            <div className="w-20" /> {/* Spacer */}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Salon Info */}
        <Card className="modern-card p-6 mb-8 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{salonData.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium">4.9</span>
                  <span className="ml-1">(127 avaliações)</span>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{salonData.address}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                {salonData.phone}
              </Button>
              <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200">
                <Smartphone className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </Card>

        {/* Booking Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="modern-card p-6 animate-fade-in">
                <h2 className="text-xl font-semibold mb-6">Escolha seu serviço</h2>
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-agendapro-primary mx-auto"></div>
                    <p className="text-agendapro-gray-500 mt-2">Carregando serviços...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {services.map((service) => (
                    <div
                      key={service.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-agendapro-primary hover:shadow-md transition-all duration-300 cursor-pointer"
                      onClick={() => handleServiceSelect(parseInt(service.id))}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {service.duration} min • {service.professional_name}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-agendapro-primary">
                            R$ {service.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                )}
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="modern-card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Escolha data e horário</h2>
                  <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                    Alterar Serviço
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="mb-3 block">Selecione a data</Label>
                    <Calendar
                      mode="single"
                      selected={selectedDate || undefined}
                      onSelect={(date) => setSelectedDate(date || null)}
                      locale={ptBR}
                      disabled={(date) => date < new Date()}
                      className="rounded-md border"
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-3 block">Horários disponíveis</Label>
                    {selectedDate ? (
                      <div className="grid grid-cols-3 gap-3">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className={selectedTime === time ? "bg-agendapro-primary" : ""}
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">Selecione uma data primeiro</p>
                    )}
                  </div>
                </div>

                {selectedDate && selectedTime && (
                  <div className="mt-6">
                    <Button onClick={handleDateTimeSelect} className="btn-primary w-full">
                      Continuar
                    </Button>
                  </div>
                )}
              </Card>
            )}

            {step === 3 && (
              <Card className="modern-card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Seus dados</h2>
                  <Button variant="outline" size="sm" onClick={() => setStep(2)}>
                    Alterar Data/Hora
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome completo *</Label>
                    <Input
                      id="name"
                      placeholder="Digite seu nome"
                      value={clientData.name}
                      onChange={(e) => setClientData(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={clientData.email}
                      onChange={(e) => setClientData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">WhatsApp *</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={clientData.phone}
                      onChange={(e) => setClientData(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <Button 
                    onClick={handleClientData} 
                    className="btn-primary w-full"
                    disabled={!clientData.name || !clientData.email || !clientData.phone}
                  >
                    Continuar
                  </Button>
                </div>
              </Card>
            )}

            {step === 4 && (
              <Card className="modern-card p-6 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Pagamento</h2>
                  <Button variant="outline" size="sm" onClick={() => setStep(3)}>
                    Alterar Dados
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        paymentMethod === 'pix' 
                          ? 'border-agendapro-primary bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('pix')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            PIX
                          </div>
                        </div>
                        <div>
                          <div className="font-semibold">PIX</div>
                          <div className="text-sm text-gray-600">Pagamento instantâneo</div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        paymentMethod === 'card' 
                          ? 'border-agendapro-primary bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <div className="font-semibold">Cartão</div>
                          <div className="text-sm text-gray-600">Débito ou Crédito</div>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
                        paymentMethod === 'local' 
                          ? 'border-agendapro-primary bg-purple-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setPaymentMethod('local')}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-semibold">No Local</div>
                          <div className="text-sm text-gray-600">Pagar no salão</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleBookingConfirm} 
                    className="btn-primary w-full mt-6"
                    disabled={!paymentMethod}
                  >
                    {paymentMethod === 'local' ? 'Confirmar Agendamento' : 'Pagar e Confirmar'}
                  </Button>
                </div>
              </Card>
            )}

            {step === 5 && (
              <Card className="modern-card p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Agendamento Confirmado!
                </h2>
                
                <p className="text-gray-600 mb-8">
                  Seu agendamento foi confirmado com sucesso. Você receberá uma mensagem no WhatsApp 
                  com todos os detalhes e lembretes antes do horário.
                </p>

                <div className="space-y-3 mb-8">
                  <Link href="/client/area">
                    <Button className="btn-primary w-full">
                      Acessar Área do Cliente
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full">
                    Fazer Outro Agendamento
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Resumo */}
          <div className="lg:col-span-1">
            <Card className="modern-card p-6 sticky top-6">
              <h3 className="text-lg font-semibold mb-4">Resumo do Agendamento</h3>
              
              <div className="space-y-4">
                {selectedServiceData && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="font-medium text-gray-900 mb-1">
                      {selectedServiceData.name}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {selectedServiceData.duration} min • {selectedServiceData.professional}
                    </div>
                    <div className="text-lg font-bold text-agendapro-primary">
                      R$ {selectedServiceData.price.toFixed(2)}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="flex items-center text-gray-600 mb-2">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      <span>{format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{selectedTime}</span>
                    </div>
                  </div>
                )}

                {clientData.name && (
                  <div className="pb-4 border-b border-gray-200">
                    <div className="text-gray-600 mb-1">Cliente:</div>
                    <div className="font-medium">{clientData.name}</div>
                    <div className="text-sm text-gray-600">{clientData.phone}</div>
                  </div>
                )}

                {paymentMethod && (
                  <div>
                    <div className="text-gray-600 mb-1">Pagamento:</div>
                    <div className="font-medium">
                      {paymentMethod === 'pix' && 'PIX'}
                      {paymentMethod === 'card' && 'Cartão'}
                      {paymentMethod === 'local' && 'No Local'}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}