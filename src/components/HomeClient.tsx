"use client";
import React from "react";
import { Toaster } from "react-hot-toast";
import { MonstersProvider } from "@/contexts/MonstersContext";
import MonsterForm from "@/components/MonsterForm";
import MonsterList from "@/components/MonsterList";
import BattleArena from "@/components/BattleArena";

export default function HomeClient() {
  return (
    <MonstersProvider>
      <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100">
        <Toaster 
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1f2937',
              color: '#f3f4f6',
              border: '2px solid #6366f1',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 'bold',
            },
            success: {
              style: {
                background: '#059669',
                border: '2px solid #10b981',
              },
            },
            error: {
              style: {
                background: '#dc2626',
                border: '2px solid #ef4444',
              },
            },
          }}
        />
        {/* Header temático */}
        <header className="py-6 flex justify-center items-center border-b border-indigo-800 bg-gradient-to-r from-indigo-900 via-gray-900 to-green-900">
          <div className="flex items-center gap-4">
            <span className="text-4xl">👾</span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest text-indigo-300 uppercase">
              Batalha de Monstros
            </h1>
          </div>
        </header>
        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8 w-full max-w-4xl mx-auto">
          <div className="w-full flex flex-col md:flex-row gap-8">
            <section className="flex-1">
              <MonsterForm />
            </section>
            <section className="flex-1">
              <MonsterList />
            </section>
          </div>
          <section className="w-full mt-8">
            <BattleArena />
          </section>
        </main>
        {/* Footer */}
        <footer className="py-4 text-center text-xs text-indigo-300 border-t border-indigo-800 bg-gradient-to-r from-indigo-900 via-gray-900 to-green-900">
          Feito com ♥ por Caique — Desafio Técnico Revi 2024
        </footer>
      </div>
    </MonstersProvider>
  );
} 