"use client";
import React from "react";
import { useMonsters } from "@/contexts/MonstersContext";

const statIcons = {
  attack: "⚔️",
  defense: "🛡️",
  speed: "💨",
  hp: "❤️",
};

export default function MonsterList() {
  const { state, selectMonster, unselectMonster } = useMonsters();
  const { monsters, selected } = state;

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      unselectMonster(id);
    } else if (selected.length < 2) {
      selectMonster(id);
    }
  };

  if (monsters.length === 0) {
    return (
      <div className="text-gray-400 text-center mt-8">
        Nenhum monstro cadastrado ainda.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-extrabold mb-2 text-indigo-400 drop-shadow-lg tracking-wide text-center uppercase">
        Seus Monstros
      </h2>
      
      <ul className="flex flex-col gap-5">
        {monsters.map((monster) => (
          <li
            key={monster.id}
            className={`relative flex items-center gap-6 p-4 rounded-2xl border-2 transition-all cursor-pointer select-none shadow-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden group
              ${selected.includes(monster.id)
                ? "border-indigo-400 ring-2 ring-indigo-300/60 scale-105 shadow-indigo-400/30"
                : "border-gray-800 hover:border-indigo-400/60 hover:scale-105"}
            `}
            onClick={() => toggleSelect(monster.id)}
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-400/20 via-transparent to-green-400/20 blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-500 pointer-events-none z-0" />
            
            <img 
              src={monster.imageUrl} 
              alt={monster.name} 
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-700 z-10 shadow-lg" 
            />
            
            <div className="flex-1 z-10">
              <div className="font-extrabold text-xl text-indigo-300 drop-shadow-md mb-1 uppercase tracking-wide flex items-center gap-2">
                {monster.name}
                {selected.includes(monster.id) && (
                  <span className="ml-2 text-indigo-400 animate-pulse">★</span>
                )}
              </div>
              
              <div className="text-sm text-gray-300 flex gap-4 mt-1">
                <span className="flex items-center gap-1">
                  <span>{statIcons.attack}</span> <b>{monster.attack}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span>{statIcons.defense}</span> <b>{monster.defense}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span>{statIcons.speed}</span> <b>{monster.speed}</b>
                </span>
                <span className="flex items-center gap-1">
                  <span>{statIcons.hp}</span> <b>{monster.hp}</b>
                </span>
              </div>
            </div>
            
            {selected.includes(monster.id) && (
              <span className="absolute top-2 right-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20 border-2 border-white/20 animate-bounce">
                Selecionado
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
} 