import type { Monster } from "@/contexts/MonstersContext";

export type BattleRound = {
  attacker: Monster;
  defender: Monster;
  damage: number;
  defenderHp: number;
  attackerHp: number;
  isCritical?: boolean;
  isDodge?: boolean;
};

export type BattleResult = {
  rounds: BattleRound[];
  winner: Monster;
  loser: Monster;
};

// Calcula o resultado completo da batalha seguindo as regras especificadas
export function calculateBattle(monsterA: Monster, monsterB: Monster): BattleResult {
  let first = monsterA;
  let second = monsterB;
  
  // Determina quem ataca primeiro: maior velocidade, ou maior ataque em caso de empate
  if (monsterB.speed > monsterA.speed || (monsterB.speed === monsterA.speed && monsterB.attack > monsterA.attack)) {
    first = monsterB;
    second = monsterA;
  }
  
  let hpA = monsterA.hp;
  let hpB = monsterB.hp;
  const rounds: BattleRound[] = [];
  let attacker = first;
  let defender = second;
  
  // Simula rounds até que um monstro seja derrotado
  while (hpA > 0 && hpB > 0) {
    const damage = Math.max(attacker.attack - defender.defense, 1);
    
    // Aplica o dano ao defensor
    if (defender.id === monsterA.id) {
      hpA -= damage;
    } else {
      hpB -= damage;
    }
    
    const finalHpA = Math.max(hpA, 0);
    const finalHpB = Math.max(hpB, 0);
    
    rounds.push({ 
      attacker, 
      defender, 
      damage, 
      defenderHp: defender.id === monsterA.id ? finalHpA : finalHpB,
      attackerHp: attacker.id === monsterA.id ? finalHpA : finalHpB,
      isCritical: false,
      isDodge: false
    });
    
    // Troca atacante/defensor para o próximo round
    [attacker, defender] = [defender, attacker];
  }
  
  const winner = hpA <= 0 ? monsterB : monsterA;
  const loser = hpA <= 0 ? monsterA : monsterB;
  
  return { rounds, winner, loser };
} 