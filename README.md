# AgendaPro - SaaS para Salões de Beleza

Sistema completo de agendamento para salões de beleza, barbearias e clínicas estéticas.

## 🚀 Funcionalidades

- **Landing Page Moderna**: Design responsivo com animações suaves
- **Sistema de Onboarding**: 5 etapas para configuração completa
- **Dashboard Administrativo**: Gestão completa de agendamentos e clientes
- **Agendamento Online**: Interface limpa para clientes agendarem serviços
- **Integração Supabase**: Banco de dados PostgreSQL escalável
- **Preparado para Stripe**: Sistema de pagamentos integrado
- **WhatsApp API**: Mensagens automáticas (configuração necessária)

## 🎨 Design

- **Paleta de Cores**: #222 (escuro), #7C3AED (roxo forte), #10B981 (verde)
- **Tipografia**: Inter para máxima legibilidade
- **Animações**: Transições suaves e micro-interações
- **Responsivo**: Otimizado para desktop e mobile

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Supabase
- **Database**: PostgreSQL (Supabase)
- **Estado**: Zustand
- **Formulários**: React Hook Form + Zod
- **Gráficos**: Recharts

## 📦 Instalação

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Configure as variáveis de ambiente no `.env.local`
4. Execute as migrações do Supabase
5. Inicie o servidor: `npm run dev`

## 🔧 Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Execute as migrações em `supabase/migrations/`
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 🌐 Estrutura de Domínios

- `agendapro.com.br` - Landing Page
- `app.agendapro.com.br` - Dashboard Admin
- `book.agendapro.com.br` - Agendamento Clientes
- `api.agendapro.com.br` - API Pública

## 📱 Integrações Futuras

- **Stripe**: Pagamentos online
- **WhatsApp Business API**: Mensagens automáticas
- **Resend**: E-mails transacionais
- **Twilio**: SMS backup
- **Posthog**: Analytics
- **Sentry**: Monitoramento de erros

## 🚀 Deploy

O projeto está configurado para deploy na Vercel com otimizações automáticas.

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.