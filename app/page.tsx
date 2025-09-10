'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Calendar, 
  Users, 
  CreditCard, 
  MessageSquare, 
  BarChart3,
  Smartphone,
  Clock,
  Star,
  ArrowRight,
  CheckCircle,
  PlayCircle,
  Zap,
  Shield,
  Target,
  Database
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: Calendar,
      title: 'Agendamento Inteligente',
      description: 'Sistema de agendamento online 24/7 com confirmação automática via WhatsApp',
    },
    {
      icon: Users,
      title: 'Gestão de Clientes',
      description: 'Base completa de clientes com histórico, preferências e cartão fidelidade digital',
    },
    {
      icon: CreditCard,
      title: 'Pagamentos Integrados',
      description: 'Receba por cartão, PIX e dinheiro. Integração completa com Stripe',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Automático',
      description: 'Confirmações, lembretes e pós-atendimento automatizados via WhatsApp',
    },
    {
      icon: BarChart3,
      title: 'Relatórios Avançados',
      description: 'Analytics completos sobre faturamento, clientes e performance dos profissionais',
    },
    {
      icon: Smartphone,
      title: '100% Mobile',
      description: 'Acesse de qualquer lugar, gerencie seu salão pelo celular com facilidade total',
    },
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      business: 'Studio Bella Vita',
      content: 'Aumentei 40% no faturamento em 2 meses. Os clientes adoram agendar pelo WhatsApp!',
      rating: 5,
    },
    {
      name: 'João Santos',
      business: 'Barbearia Moderna',
      content: 'Nunca mais tive problema com faltas. O sistema lembra automaticamente os clientes.',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      business: 'Clínica Estética Renovar',
      content: 'Interface super fácil de usar. Minha equipe aprendeu em minutos!',
      rating: 5,
    },
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 'R$ 49',
      period: '/mês',
      description: 'Perfeito para começar',
      features: [
        'Até 100 agendamentos/mês',
        'WhatsApp automático',
        'Gestão básica de clientes',
        'Suporte por email',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: 'R$ 89',
      period: '/mês',
      description: 'Para salões em crescimento',
      features: [
        'Agendamentos ilimitados',
        'Múltiplos profissionais',
        'Relatórios avançados',
        'Integração com pagamentos',
        'Suporte prioritário',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'R$ 149',
      period: '/mês',
      description: 'Para grandes operações',
      features: [
        'Múltiplas unidades',
        'API personalizada',
        'Treinamento dedicado',
        'Suporte 24/7',
        'Customizações',
      ],
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-agendapro-primary rounded-xl flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-agendapro-dark">AgendaPro</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-agendapro-gray-600 hover:text-agendapro-primary transition-colors font-medium">Recursos</a>
              <a href="#pricing" className="text-agendapro-gray-600 hover:text-agendapro-primary transition-colors font-medium">Preços</a>
              <a href="#testimonials" className="text-agendapro-gray-600 hover:text-agendapro-primary transition-colors font-medium">Depoimentos</a>
              <Link href="/dashboard">
                <Button variant="outline" className="border-agendapro-primary text-agendapro-primary hover:bg-agendapro-primary hover:text-white font-medium">
                  Entrar
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-agendapro-gray-50 to-white">
        <div className="container mx-auto text-center max-w-6xl">
          <div className="animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 bg-agendapro-primary/10 rounded-full mb-8 border border-agendapro-primary/20">
              <Zap className="w-4 h-4 text-agendapro-primary mr-2" />
              <span className="text-sm font-semibold text-agendapro-primary">
                Teste grátis por 30 dias - Sem cartão de crédito
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight text-agendapro-dark">
              Revolucione seu <br />
              <span className="text-agendapro-primary">Salão de Beleza</span>
            </h1>
            
            <p className="text-xl text-agendapro-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Sistema completo de agendamento com WhatsApp automático, pagamentos integrados 
              e gestão profissional. Aumente seu faturamento em até <strong className="text-agendapro-primary">40%</strong>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/onboarding">
                <Button className="bg-agendapro-primary hover:bg-agendapro-primary/90 text-white text-lg px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Começar Teste Gratuito
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/setup" prefetch={false}>
                <Button variant="outline" className="text-lg px-10 py-4 border-2 border-agendapro-primary text-agendapro-primary hover:bg-agendapro-primary hover:text-white rounded-xl font-semibold">
                  <Database className="w-5 h-5 mr-2" />
                  Configurar Banco
                </Button>
              </Link>
              <Button variant="outline" className="text-lg px-10 py-4 border-2 border-agendapro-gray-300 text-agendapro-gray-700 hover:bg-agendapro-gray-50 rounded-xl font-semibold">
                <PlayCircle className="w-5 h-5 mr-2" />
                Ver Demonstração
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-agendapro-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-agendapro-secondary mr-2" />
                Setup em 5 minutos
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-agendapro-secondary mr-2" />
                Suporte em português
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-agendapro-secondary mr-2" />
                Dados seguros no Brasil
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-agendapro-dark">
              Tudo que seu <span className="text-agendapro-primary">salão precisa</span>
            </h2>
            <p className="text-xl text-agendapro-gray-600 max-w-2xl mx-auto leading-relaxed">
              Recursos pensados especificamente para salões de beleza, barbearias e clínicas estéticas
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-white border border-agendapro-gray-200 rounded-2xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-agendapro-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-agendapro-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-agendapro-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-agendapro-dark">{feature.title}</h3>
                <p className="text-agendapro-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-agendapro-dark">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-5xl font-bold mb-3 text-agendapro-primary">5k+</div>
              <div className="text-agendapro-gray-300 font-medium">Salões Ativos</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold mb-3 text-agendapro-primary">50k+</div>
              <div className="text-agendapro-gray-300 font-medium">Agendamentos/mês</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold mb-3 text-agendapro-primary">98%</div>
              <div className="text-agendapro-gray-300 font-medium">Satisfação</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-5xl font-bold mb-3 text-agendapro-primary">40%</div>
              <div className="text-agendapro-gray-300 font-medium">Aumento Médio</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              O que nossos <span className="gradient-text">clientes dizem</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index} 
                className="modern-card p-8 animate-fade-in hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.business}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Preços <span className="gradient-text">transparentes</span>
            </h2>
            <p className="text-xl text-gray-600">
              Escolha o plano ideal para o seu negócio
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`modern-card p-8 text-center relative animate-fade-in hover:scale-105 transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-agendapro-primary shadow-glow' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-agendapro-primary to-agendapro-secondary text-white px-6 py-1 rounded-full text-sm font-medium">
                    Mais Popular
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link href="/onboarding">
                  <Button 
                    className={`w-full py-3 ${
                      plan.popular 
                        ? 'btn-primary' 
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Começar Agora
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-agendapro-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
              Pronto para revolucionar seu salão?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Junte-se a mais de 5.000 salões que já aumentaram seu faturamento com o AgendaPro
            </p>
            <Link href="/onboarding">
              <Button className="bg-white text-agendapro-primary hover:bg-agendapro-gray-50 text-lg px-12 py-4 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300">
                Teste 30 Dias Grátis
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-white/60 text-sm mt-6 font-medium">
              Sem cartão de crédito • Cancelamento a qualquer momento
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 bg-agendapro-dark text-agendapro-gray-300">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-agendapro-primary rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AgendaPro</span>
              </div>
              <p className="text-agendapro-gray-400 leading-relaxed">
                Revolucionando a gestão de salões de beleza no Brasil com tecnologia de ponta.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Produto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Recursos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Preços</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrações</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Suporte</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 AgendaPro. Todos os direitos reservados. Feito com ❤️ no Brasil.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}