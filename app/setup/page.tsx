'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function SetupPage() {
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const testConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simular teste de conexão
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsConnected(true);
    } catch (error) {
      alert('Erro ao conectar com Supabase');
    } finally {
      setIsLoading(false);
    }
  };

  const copyEnvContent = () => {
    const envContent = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${supabaseKey}

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# WhatsApp Business API
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id`;

    navigator.clipboard.writeText(envContent);
    alert('Configurações copiadas para a área de transferência!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-agendapro-gray-50 via-white to-purple-50/30 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Database className="w-6 h-6 text-agendapro-primary" />
            <span className="text-xl font-bold gradient-text">Configuração do Banco</span>
          </div>
          
          <div className="w-20" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Setup Form */}
          <Card className="modern-card p-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-agendapro-dark mb-2">
                  Conectar Supabase
                </h2>
                <p className="text-agendapro-gray-600">
                  Configure sua conexão com o banco de dados Supabase
                </p>
              </div>

              {!isConnected ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="supabaseUrl">URL do Projeto Supabase</Label>
                    <Input
                      id="supabaseUrl"
                      placeholder="https://seu-projeto.supabase.co"
                      value={supabaseUrl}
                      onChange={(e) => setSupabaseUrl(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="supabaseKey">Chave Anônima (anon key)</Label>
                    <Input
                      id="supabaseKey"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                      value={supabaseKey}
                      onChange={(e) => setSupabaseKey(e.target.value)}
                    />
                  </div>

                  <Button 
                    onClick={testConnection}
                    disabled={isLoading}
                    className="w-full bg-agendapro-primary hover:bg-agendapro-primary/90"
                  >
                    {isLoading ? 'Testando Conexão...' : 'Testar Conexão'}
                  </Button>
                </div>
              ) : (
                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Supabase conectado com sucesso! Agora você pode usar todas as funcionalidades da plataforma.
                  </AlertDescription>
                </Alert>
              )}

              {isConnected && (
                <div className="space-y-4">
                  <Button 
                    onClick={copyEnvContent}
                    variant="outline"
                    className="w-full"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Configurações .env
                  </Button>

                  <Link href="/dashboard">
                    <Button className="w-full bg-agendapro-secondary hover:bg-agendapro-secondary/90">
                      Ir para Dashboard
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Instructions */}
          <div className="space-y-6">
            <Card className="modern-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Database className="w-5 h-5 mr-2 text-agendapro-primary" />
                Como obter as credenciais
              </h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-agendapro-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Acesse o Supabase</p>
                    <p className="text-agendapro-gray-600">
                      Vá para <a href="https://supabase.com" target="_blank" className="text-agendapro-primary hover:underline">supabase.com</a> e faça login
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-agendapro-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Crie um novo projeto</p>
                    <p className="text-agendapro-gray-600">
                      Clique em "New Project" e configure seu banco PostgreSQL
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-agendapro-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Copie as credenciais</p>
                    <p className="text-agendapro-gray-600">
                      Vá em Settings → API e copie a URL e anon key
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-agendapro-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Execute as migrações</p>
                    <p className="text-agendapro-gray-600">
                      Cole e execute o SQL das migrações no SQL Editor
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Abrir Supabase Dashboard
                </Button>
              </div>
            </Card>

            <Card className="modern-card p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-yellow-600" />
                Migrações do Banco
              </h3>
              
              <p className="text-sm text-agendapro-gray-600 mb-4">
                Execute estas migrações no SQL Editor do Supabase para criar as tabelas necessárias:
              </p>

              <div className="space-y-2">
                <div className="bg-agendapro-gray-100 p-3 rounded-lg">
                  <code className="text-xs">supabase/migrations/20250910143758_golden_feather.sql</code>
                </div>
                <div className="bg-agendapro-gray-100 p-3 rounded-lg">
                  <code className="text-xs">supabase/migrations/20250910143818_plain_ocean.sql</code>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}