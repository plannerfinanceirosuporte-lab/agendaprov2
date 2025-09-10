'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  ArrowRight, 
  Building2, 
  Clock, 
  MessageSquare,
  CreditCard,
  CheckCircle,
  MapPin,
  Phone,
  Scissors,
  User
} from 'lucide-react';
import Link from 'next/link';

const STEPS = [
  { id: 1, title: 'Dados Básicos', icon: Building2 },
  { id: 2, title: 'Serviços', icon: Scissors },
  { id: 3, title: 'Horários', icon: Clock },
  { id: 4, title: 'WhatsApp', icon: MessageSquare },
  { id: 5, title: 'Pagamentos', icon: CreditCard },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados básicos
    salonName: '',
    businessType: '',
    address: '',
    phone: '',
    whatsapp: '',
    
    // Serviços
    services: [
      { name: '', duration: '', price: '', professional: '' }
    ],
    
    // Horários
    workingHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '16:00', closed: false },
      sunday: { open: '09:00', close: '16:00', closed: true },
    },
    
    // WhatsApp
    whatsappConnected: false,
    
    // Pagamentos
    stripeConnected: false,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { name: '', duration: '', price: '', professional: '' }]
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.map((service, i) => 
        i === index ? { ...service, [field]: value } : service
      )
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Dados do seu negócio</h2>
              <p className="text-gray-600">Vamos começar com as informações básicas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="salonName">Nome do Salão/Clínica *</Label>
                <Input
                  id="salonName"
                  placeholder="Ex: Studio Bella Vita"
                  value={formData.salonName}
                  onChange={(e) => updateFormData('salonName', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessType">Tipo de Negócio *</Label>
                <Select onValueChange={(value) => updateFormData('businessType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salon">Salão de Beleza</SelectItem>
                    <SelectItem value="barbershop">Barbearia</SelectItem>
                    <SelectItem value="clinic">Clínica Estética</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                    <SelectItem value="nails">Studio de Unhas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Endereço Completo *</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, bairro, cidade - UF"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone Fixo</Label>
                <Input
                  id="phone"
                  placeholder="(11) 3000-0000"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp *</Label>
                <Input
                  id="whatsapp"
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={(e) => updateFormData('whatsapp', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Seus Serviços</h2>
              <p className="text-gray-600">Configure os serviços que você oferece</p>
            </div>

            {formData.services.map((service, index) => (
              <Card key={index} className="p-6 border-2 border-dashed border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Nome do Serviço</Label>
                    <Input
                      placeholder="Ex: Corte + Escova"
                      value={service.name}
                      onChange={(e) => updateService(index, 'name', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Duração (min)</Label>
                    <Select onValueChange={(value) => updateService(index, 'duration', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Tempo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 min</SelectItem>
                        <SelectItem value="45">45 min</SelectItem>
                        <SelectItem value="60">1h</SelectItem>
                        <SelectItem value="90">1h 30min</SelectItem>
                        <SelectItem value="120">2h</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Preço (R$)</Label>
                    <Input
                      placeholder="0,00"
                      type="number"
                      value={service.price}
                      onChange={(e) => updateService(index, 'price', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Profissional</Label>
                    <Input
                      placeholder="Nome do profissional"
                      value={service.professional}
                      onChange={(e) => updateService(index, 'professional', e.target.value)}
                    />
                  </div>
                </div>
                
                {formData.services.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeService(index)}
                    className="mt-4"
                  >
                    Remover Serviço
                  </Button>
                )}
              </Card>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addService}
              className="w-full border-2 border-dashed border-agendapro-primary text-agendapro-primary hover:bg-agendapro-primary hover:text-white"
            >
              + Adicionar Outro Serviço
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Horários de Funcionamento</h2>
              <p className="text-gray-600">Defina quando seu salão funciona</p>
            </div>

            <div className="space-y-4">
              {Object.entries(formData.workingHours).map(([day, hours]) => {
                const dayNames: { [key: string]: string } = {
                  monday: 'Segunda-feira',
                  tuesday: 'Terça-feira',
                  wednesday: 'Quarta-feira',
                  thursday: 'Quinta-feira',
                  friday: 'Sexta-feira',
                  saturday: 'Sábado',
                  sunday: 'Domingo',
                };

                return (
                  <Card key={day} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="font-medium w-32">{dayNames[day]}</span>
                        
                        {!hours.closed ? (
                          <div className="flex items-center space-x-2">
                            <Input
                              type="time"
                              value={hours.open}
                              onChange={(e) => {
                                const newHours = { ...formData.workingHours };
                                // @ts-ignore
                                newHours[day].open = e.target.value;
                                updateFormData('workingHours', newHours);
                              }}
                              className="w-24"
                            />
                            <span className="text-gray-500">às</span>
                            <Input
                              type="time"
                              value={hours.close}
                              onChange={(e) => {
                                const newHours = { ...formData.workingHours };
                                // @ts-ignore
                                newHours[day].close = e.target.value;
                                updateFormData('workingHours', newHours);
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
                          const newHours = { ...formData.workingHours };
                          // @ts-ignore
                          newHours[day].closed = !hours.closed;
                          updateFormData('workingHours', newHours);
                        }}
                      >
                        {hours.closed ? 'Abrir' : 'Fechar'}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in text-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">Conectar WhatsApp</h2>
              <p className="text-gray-600">Configure mensagens automáticas para seus clientes</p>
            </div>

            <Card className="p-8 max-w-md mx-auto">
              <div className="space-y-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="w-12 h-12 text-green-600" />
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Escaneie o QR Code</h3>
                  <p className="text-sm text-gray-600">
                    Use o WhatsApp do seu celular para escanear o código
                  </p>
                </div>

                <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mx-auto">
                  <div className="text-center text-gray-500">
                    <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <MessageSquare className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-sm">QR Code aparecerá aqui</p>
                  </div>
                </div>

                <Button 
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={() => updateFormData('whatsappConnected', true)}
                >
                  {formData.whatsappConnected ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      WhatsApp Conectado
                    </>
                  ) : (
                    'Testar Conexão'
                  )}
                </Button>
              </div>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-bold mb-2">Configurar Pagamentos</h2>
              <p className="text-gray-600">Receba pagamentos online de forma segura</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Stripe</h3>
                      <p className="text-sm text-gray-600">Cartão de crédito e débito</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Taxa por transação:</span>
                      <span className="font-medium">4,99% + R$ 0,39</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Tempo de repasse:</span>
                      <span className="font-medium">D+2</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    variant="outline"
                    onClick={() => updateFormData('stripeConnected', true)}
                  >
                    {formData.stripeConnected ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                        Stripe Conectado
                      </>
                    ) : (
                      'Conectar Stripe'
                    )}
                  </Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                        PIX
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">PIX</h3>
                      <p className="text-sm text-gray-600">Pagamento instantâneo</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Taxa por transação:</span>
                      <span className="font-medium">R$ 0,99</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Tempo de repasse:</span>
                      <span className="font-medium">Instantâneo</span>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    PIX Incluído
                    <CheckCircle className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-green-900 mb-1">Configuração Completa!</h4>
                  <p className="text-green-700 text-sm">
                    Seu sistema está pronto! Agora você pode receber agendamentos e pagamentos online.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Building2 className="w-6 h-6 text-agendapro-primary" />
            <span className="text-xl font-bold gradient-text">AgendaPro</span>
          </div>
          
          <div className="text-sm text-gray-500">
            Passo {currentStep} de {STEPS.length}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-12">
          <Progress value={(currentStep / STEPS.length) * 100} className="mb-6 h-2" />
          
          <div className="flex justify-between">
            {STEPS.map((step) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className={`flex flex-col items-center ${isActive ? 'text-agendapro-primary' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-2 ${
                    isActive 
                      ? 'bg-agendapro-primary border-agendapro-primary text-white' 
                      : isCompleted 
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-300 bg-white'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-center hidden sm:block">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="modern-card p-8 mb-8">
          {renderStep()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          {currentStep === STEPS.length ? (
            <Link href="/dashboard">
              <Button className="btn-primary px-8">
                Finalizar Configuração
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button onClick={nextStep} className="btn-primary px-6">
              Próximo
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}