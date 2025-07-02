"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import { useMonsters } from "@/contexts/MonstersContext";
import { useAudio } from "@/hooks/useAudio";
import { useTimeouts } from "@/hooks/useTimeouts";
import { calculateBattle, type BattleResult } from "@/utils/battleLogic";

export default function BattleArena() {
  const { state, resetSelection } = useMonsters();
  const { monsters, selected } = state;
  const { playSound } = useAudio();
  const { clearAllTimeouts, addTimeout, setConfettiTimeout } = useTimeouts();
  
  const [result, setResult] = useState<BattleResult | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  if (selected.length < 2) {
    return (
      <div className="text-center p-8">
        <div className="text-6xl mb-4">⚔️</div>
        <div className="text-gray-400 text-xl font-bold">
          Selecione dois monstros para batalhar
        </div>
      </div>
    );
  }

  const monsterA = monsters.find((m) => m.id === selected[0]);
  const monsterB = monsters.find((m) => m.id === selected[1]);
  
  if (!monsterA || !monsterB) {
    return (
      <div className="text-center p-8">
        <div className="text-6xl mb-4">⚔️</div>
        <div className="text-gray-400 text-xl font-bold">
          Selecione dois monstros para batalhar
        </div>
      </div>
    );
  }

  const handleBattle = () => {
    clearAllTimeouts();
    
    const battleResult = calculateBattle(monsterA, monsterB);
    toast.dismiss();
    
    const initialTimeout = setTimeout(() => {
      setResult(battleResult);
      setCurrentRound(0);
      setIsAnimating(true);
      setShowResult(false);
      setShowConfetti(false);
      
      toast.success(`⚔️ Batalha iniciada: ${monsterA.name} vs ${monsterB.name}!`, {
        id: 'battle-start',
        duration: 3000,
      });
      
      battleResult.rounds.forEach((round, index) => {
        const roundTimeout = setTimeout(() => {
          setCurrentRound(index + 1);
          playSound('attack');
          
          if (index === battleResult.rounds.length - 1) {
            const finalTimeout = setTimeout(() => {
              setIsAnimating(false);
              setShowResult(true);
              setShowConfetti(true);
              playSound('victory');
              
              toast.success(`🏆 ${battleResult.winner.name} venceu a batalha!`, {
                icon: '🏆',
                duration: 4000,
                id: 'victory-toast-normal',
              });
              
              const confettiTimeout = setTimeout(() => setShowConfetti(false), 5000);
              setConfettiTimeout(confettiTimeout);
            }, 1000);
            addTimeout(finalTimeout);
          }
        }, (index + 1) * 1500);
        addTimeout(roundTimeout);
      });
    }, 100);
    addTimeout(initialTimeout);
  };

  const handleSkipBattle = () => {
    if (!result) return;
    
    clearAllTimeouts();
    setIsAnimating(false);
    setShowResult(true);
    setCurrentRound(result.rounds.length);
    toast.dismiss();
    
    const skipTimeout = setTimeout(() => {
      playSound('victory');
      setShowConfetti(true);
      
      const confettiTimeout = setTimeout(() => setShowConfetti(false), 5000);
      setConfettiTimeout(confettiTimeout);
      
      toast.success(`🏆 ${result.winner.name} venceu a batalha!`, {
        icon: '🏆',
        duration: 4000,
        id: 'victory-toast',
      });
    }, 500);
    addTimeout(skipTimeout);
  };

  const handleReset = () => {
    clearAllTimeouts();
    toast.dismiss();
    setResult(null);
    setCurrentRound(0);
    setIsAnimating(false);
    setShowResult(false);
    setShowConfetti(false);
    resetSelection();
  };

  const currentRoundData = result?.rounds[currentRound - 1];
  
  // Calcula HP atual baseado no round atual ou estado final
  const getMonsterAHp = () => {
    if (!result) return monsterA.hp;
    
    if (showResult) {
      const lastRound = result.rounds[result.rounds.length - 1];
      return lastRound.attacker.id === monsterA.id 
        ? lastRound.attackerHp 
        : lastRound.defender.id === monsterA.id 
        ? lastRound.defenderHp 
        : monsterA.hp;
    }
    
    if (currentRoundData) {
      return currentRoundData.attacker.id === monsterA.id 
        ? currentRoundData.attackerHp 
        : currentRoundData.defender.id === monsterA.id 
        ? currentRoundData.defenderHp 
        : monsterA.hp;
    }
    
    return monsterA.hp;
  };
  
  const getMonsterBHp = () => {
    if (!result) return monsterB.hp;
    
    if (showResult) {
      const lastRound = result.rounds[result.rounds.length - 1];
      return lastRound.attacker.id === monsterB.id 
        ? lastRound.attackerHp 
        : lastRound.defender.id === monsterB.id 
        ? lastRound.defenderHp 
        : monsterB.hp;
    }
    
    if (currentRoundData) {
      return currentRoundData.attacker.id === monsterB.id 
        ? currentRoundData.attackerHp 
        : currentRoundData.defender.id === monsterB.id 
        ? currentRoundData.defenderHp 
        : monsterB.hp;
    }
    
    return monsterB.hp;
  };
  
  const monsterAHp = getMonsterAHp();
  const monsterBHp = getMonsterBHp();

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border-4 border-indigo-400/40 hover:border-indigo-300/80 transition-all duration-300 overflow-hidden group">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          colors={['#fbbf24', '#ef4444', '#10b981', '#6366f1', '#ec4899']}
        />
      )}
      
      <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-400/20 via-transparent to-green-400/20 blur-2xl opacity-60 group-hover:opacity-90 transition-all duration-500 pointer-events-none z-0" />
      
      <h2 className="text-3xl font-extrabold mb-6 text-indigo-400 drop-shadow-lg tracking-wide text-center uppercase z-10">
        ⚔️ Arena de Batalha ⚔️
      </h2>
      
      {/* Monstros e HP */}
      <div className="flex gap-8 items-center justify-center mb-8 z-10">
        {/* Monster A */}
        <motion.div 
          className="flex flex-col items-center"
          animate={!showResult && currentRoundData?.attacker.id === monsterA.id ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="relative"
            animate={!showResult && currentRoundData?.attacker.id === monsterA.id ? { 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={monsterA.imageUrl} 
              alt={monsterA.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
            />
            <AnimatePresence>
              {!showResult && currentRoundData?.attacker.id === monsterA.id && (
                <motion.div 
                  className="absolute -top-2 -right-2 text-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  ⚡
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.span 
            className="mt-3 font-extrabold text-xl text-indigo-200 uppercase tracking-wide drop-shadow"
            animate={!showResult && currentRoundData?.attacker.id === monsterA.id ? { color: "#fbbf24" } : { color: "#c7d2fe" }}
            transition={{ duration: 0.3 }}
          >
            {monsterA.name}
          </motion.span>
          
          {/* Barra de HP */}
          <div className="w-48 bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
              initial={{ width: "100%" }}
              animate={{ width: `${(monsterAHp / monsterA.hp) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <motion.span 
            className="text-sm text-gray-300 mt-1"
            key={monsterAHp}
            initial={{ scale: 1.2, color: "#ef4444" }}
            animate={{ scale: 1, color: "#d1d5db" }}
            transition={{ duration: 0.5 }}
          >
            HP: {monsterAHp}/{monsterA.hp}
          </motion.span>
        </motion.div>

        {/* VS */}
        <div className="flex flex-col items-center">
          <div className="text-6xl font-extrabold text-indigo-400 drop-shadow animate-pulse">
            VS
          </div>
          {isAnimating && !showResult && currentRound > 0 && (
            <div className="text-2xl font-bold text-red-400 animate-bounce mt-2">
              Round {currentRound}
            </div>
          )}
        </div>

        {/* Monster B */}
        <motion.div 
          className="flex flex-col items-center"
          animate={!showResult && currentRoundData?.attacker.id === monsterB.id ? { scale: 1.1 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <motion.div 
            className="relative"
            animate={!showResult && currentRoundData?.attacker.id === monsterB.id ? { 
              rotate: [0, -5, 5, 0],
              scale: [1, 1.1, 1]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={monsterB.imageUrl} 
              alt={monsterB.name} 
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-400 shadow-lg"
            />
            <AnimatePresence>
              {!showResult && currentRoundData?.attacker.id === monsterB.id && (
                <motion.div 
                  className="absolute -top-2 -right-2 text-2xl"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  ⚡
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          <motion.span 
            className="mt-3 font-extrabold text-xl text-indigo-200 uppercase tracking-wide drop-shadow"
            animate={!showResult && currentRoundData?.attacker.id === monsterB.id ? { color: "#fbbf24" } : { color: "#c7d2fe" }}
            transition={{ duration: 0.3 }}
          >
            {monsterB.name}
          </motion.span>
          
          {/* Barra de HP */}
          <div className="w-48 bg-gray-700 rounded-full h-4 mt-2 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-green-500 to-green-400"
              initial={{ width: "100%" }}
              animate={{ width: `${(monsterBHp / monsterB.hp) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          
          <motion.span 
            className="text-sm text-gray-300 mt-1"
            key={monsterBHp}
            initial={{ scale: 1.2, color: "#ef4444" }}
            animate={{ scale: 1, color: "#d1d5db" }}
            transition={{ duration: 0.5 }}
          >
            HP: {monsterBHp}/{monsterB.hp}
          </motion.span>
        </motion.div>
      </div>

      {/* Botão de batalha ou resultado */}
      {!result ? (
        <button 
          onClick={handleBattle} 
          disabled={!monsterA || !monsterB} 
          className="w-full mt-4 relative bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:to-red-500 text-white font-extrabold py-4 rounded-xl shadow-2xl transition-all duration-200 tracking-wider text-xl border-4 border-red-300/80 hover:border-white/80 focus:outline-none focus:ring-4 focus:ring-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] disabled:opacity-50 disabled:cursor-not-allowed before:absolute before:inset-0 before:rounded-xl before:opacity-0 before:transition-opacity before:duration-300 before:bg-white/30 hover:before:opacity-20 overflow-hidden"
        >
          <span className="relative z-10">🔥 INICIAR BATALHA 🔥</span>
        </button>
      ) : (
        <div className="mt-6 z-10">
          {/* Animações durante a batalha */}
          {isAnimating && currentRoundData && (
            <div className="text-center mb-6 p-4 bg-gray-800/50 rounded-lg border-2 border-indigo-400/50">
              <div className="text-2xl font-bold text-indigo-300 mb-2">
                Round {currentRound}
              </div>
              <div className="text-red-400 text-xl">
                ⚔️ {currentRoundData.attacker.name} atacou {currentRoundData.defender.name}
                <motion.div 
                  className="text-3xl font-bold mt-2"
                  key={currentRoundData.damage}
                  initial={{ scale: 0, y: -20, opacity: 0 }}
                  animate={{ scale: 1.2, y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  -{currentRoundData.damage} HP
                </motion.div>
              </div>
              
              <button 
                onClick={handleSkipBattle}
                className="mt-4 relative bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 hover:from-orange-500 hover:to-yellow-500 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-all duration-200 tracking-wider text-sm border-2 border-yellow-300/80 hover:border-white/80 focus:outline-none focus:ring-2 focus:ring-yellow-400 before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:transition-opacity before:duration-300 before:bg-white/20 hover:before:opacity-10 overflow-hidden"
              >
                <span className="relative z-10">⏩ Acelerar Tempo</span>
              </button>
            </div>
          )}

          {/* Resultado final */}
          {showResult && (
            <div className="text-center">
              <div className="text-4xl font-extrabold mb-4 text-center">
                🏆 <span className="text-yellow-400 animate-pulse">VENCEDOR: {result.winner.name}</span> 🏆
              </div>
              <div className="text-xl text-gray-300 mb-6">
                💀 {result.loser.name} foi derrotado!
              </div>
              
              {/* Resumo dos rounds */}
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6 max-h-64 overflow-y-auto">
                <h4 className="font-bold text-indigo-400 mb-3 text-lg">📜 Resumo da Batalha</h4>
                <div className="space-y-2 text-sm">
                  {result.rounds.map((round, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-200 p-2 bg-gray-700/50 rounded">
                      <span className="font-bold text-indigo-300 min-w-[3rem]">{i + 1}º</span>
                      <span>
                        {round.attacker.name} → {round.defender.name}: 
                        <span className="font-bold ml-1 text-red-400">
                          -{round.damage} HP
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={handleReset} 
                className="w-full mt-4 relative bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 hover:from-gray-800 hover:to-gray-700 text-white font-extrabold py-3 rounded-lg shadow-lg transition-all duration-200 tracking-wider text-lg border-2 border-indigo-300/60 hover:border-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400 before:absolute before:inset-0 before:rounded-lg before:opacity-0 before:transition-opacity before:duration-300 before:bg-white/20 hover:before:opacity-10 overflow-hidden"
              >
                <span className="relative z-10">🔄 Nova Batalha</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 