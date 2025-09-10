'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { 
  Home,
  ArrowLeft,
  Search,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-agendapro-gray-50 via-white to-purple-50/30 flex items-center justify-center px-4">
      <Card className="modern-card p-12 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-agendapro-dark mb-4">404</h1>
        
        <h2 className="text-2xl font-bold text-agendapro-dark mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-agendapro-gray-600 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida para outro local.
        </p>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="w-full bg-agendapro-primary hover:bg-agendapro-primary/90 text-white py-3 rounded-xl font-semibold">
              <Home className="w-5 h-5 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button variant="outline" className="w-full py-3 rounded-xl font-semibold">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Ir para Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-agendapro-gray-500">
            Se você acredita que isso é um erro, entre em contato conosco.
          </p>
        </div>
      </Card>
    </div>
  );
}