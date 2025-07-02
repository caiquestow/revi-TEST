"use client";

import React, { useState } from "react";
import { useMonsters } from "@/contexts/MonstersContext";

const initialForm = {
  name: "",
  attack: 5,
  defense: 2,
  speed: 4,
  hp: 20,
  imageUrl: "",
};

// Gera avatar único baseado no nome usando Dicebear API
const generateMonsterImage = (name: string) => {
  if (!name.trim()) return "";
  
  const seed = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const themes = ['adventurer', 'avataaars', 'big-ears', 'bottts', 'croodles', 'fun-emoji'];
  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
  
  return `https://api.dicebear.com/7.x/${randomTheme}/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
};

export default function MonsterForm() {
  const { addMonster } = useMonsters();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ 
      ...prev, 
      [name]: name === "name" || name === "imageUrl" ? value : Number(value),
      // Gera nova imagem quando o nome muda
      ...(name === "name" && value.trim() ? { imageUrl: generateMonsterImage(value) } : {})
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Nome é obrigatório.");
      return;
    }
    
    const finalImageUrl = form.imageUrl.trim() || generateMonsterImage(form.name);
    
    addMonster({ 
      ...form, 
      imageUrl: finalImageUrl,
      id: crypto.randomUUID() 
    });
    setForm(initialForm);
    setError("");
  };

  const generateNewImage = () => {
    setForm(prev => ({ ...prev, imageUrl: generateMonsterImage(form.name) }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 shadow-2xl border-2 border-green-500/30 hover:border-green-400/80 transition-all duration-300 flex flex-col gap-4 overflow-hidden group"
    >
      <div className="absolute -inset-1 bg-gradient-to-tr from-green-400/20 via-transparent to-indigo-500/20 blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-500 pointer-events-none z-0" />
      
      <h2 className="text-2xl font-extrabold mb-2 text-green-400 drop-shadow-lg tracking-wide z-10 text-center uppercase">
        Novo Monstro
      </h2>
      
      <input
        className="bg-gray-800 rounded px-3 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 z-10"
        name="name"
        placeholder="Nome do monstro"
        value={form.name}
        onChange={handleChange}
        maxLength={20}
        required
      />
      
      {form.imageUrl && (
        <div className="z-10 flex items-center gap-2 p-2 bg-gray-800/50 rounded">
          <img 
            src={form.imageUrl} 
            alt="Prévia" 
            className="w-10 h-10 rounded-full border border-gray-600"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-sm text-gray-300">Imagem do monstro</span>
          <button
            type="button"
            onClick={generateNewImage}
            className="ml-auto text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition-colors"
          >
            🔄 Nova Imagem
          </button>
        </div>
      )}
      
      <div className="flex gap-2 z-10">
        <div className="flex-1">
          <label className="block text-xs mb-1 text-gray-400">Ataque</label>
          <input 
            type="number" 
            name="attack" 
            min={1} 
            max={99} 
            value={form.attack} 
            onChange={handleChange} 
            className="w-full bg-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400" 
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs mb-1 text-gray-400">Defesa</label>
          <input 
            type="number" 
            name="defense" 
            min={1} 
            max={99} 
            value={form.defense} 
            onChange={handleChange} 
            className="w-full bg-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400" 
          />
        </div>
      </div>
      
      <div className="flex gap-2 z-10">
        <div className="flex-1">
          <label className="block text-xs mb-1 text-gray-400">Velocidade</label>
          <input 
            type="number" 
            name="speed" 
            min={1} 
            max={99} 
            value={form.speed} 
            onChange={handleChange} 
            className="w-full bg-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400" 
          />
        </div>
        <div className="flex-1">
          <label className="block text-xs mb-1 text-gray-400">HP</label>
          <input 
            type="number" 
            name="hp" 
            min={1} 
            max={999} 
            value={form.hp} 
            onChange={handleChange} 
            className="w-full bg-gray-800 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400" 
          />
        </div>
      </div>
      
      {error && <div className="text-red-400 text-xs z-10">{error}</div>}
      
      <button
        type="submit"
        className="mt-2 relative bg-gradient-to-r from-green-400 via-lime-400 to-emerald-500 hover:from-emerald-400 hover:to-green-500 text-gray-900 font-extrabold py-3 rounded-xl shadow-2xl transition-all duration-200 z-10 tracking-wider text-lg border-4 border-green-300/80 hover:border-white/80 focus:outline-none focus:ring-4 focus:ring-green-400 drop-shadow-[0_0_12px_rgba(34,197,94,0.7)] before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 before:bg-white/30 hover:before:opacity-20 overflow-hidden"
      >
        <span className="relative z-10">Cadastrar</span>
      </button>
    </form>
  );
} 