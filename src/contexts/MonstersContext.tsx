"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

export type Monster = {
  id: string;
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  imageUrl: string;
};

export type MonstersState = {
  monsters: Monster[];
  selected: string[];
};

const initialState: MonstersState = {
  monsters: [],
  selected: [],
};

type Action =
  | { type: "ADD_MONSTER"; payload: Monster }
  | { type: "SELECT_MONSTER"; payload: string }
  | { type: "UNSELECT_MONSTER"; payload: string }
  | { type: "RESET_SELECTION" }
  | { type: "RESET_ALL" };

function monstersReducer(state: MonstersState, action: Action): MonstersState {
  switch (action.type) {
    case "ADD_MONSTER":
      return { ...state, monsters: [...state.monsters, action.payload] };
    
    case "SELECT_MONSTER":
      if (state.selected.length >= 2 || state.selected.includes(action.payload)) {
        return state;
      }
      return { ...state, selected: [...state.selected, action.payload] };
    
    case "UNSELECT_MONSTER":
      return { ...state, selected: state.selected.filter(id => id !== action.payload) };
    
    case "RESET_SELECTION":
      return { ...state, selected: [] };
    
    case "RESET_ALL":
      return initialState;
    
    default:
      return state;
  }
}

const MonstersContext = createContext<{
  state: MonstersState;
  addMonster: (monster: Monster) => void;
  selectMonster: (id: string) => void;
  unselectMonster: (id: string) => void;
  resetSelection: () => void;
  resetAll: () => void;
} | undefined>(undefined);

export function MonstersProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(monstersReducer, initialState);

  const addMonster = (monster: Monster) => dispatch({ type: "ADD_MONSTER", payload: monster });
  const selectMonster = (id: string) => dispatch({ type: "SELECT_MONSTER", payload: id });
  const unselectMonster = (id: string) => dispatch({ type: "UNSELECT_MONSTER", payload: id });
  const resetSelection = () => dispatch({ type: "RESET_SELECTION" });
  const resetAll = () => dispatch({ type: "RESET_ALL" });

  return (
    <MonstersContext.Provider value={{ 
      state, 
      addMonster, 
      selectMonster, 
      unselectMonster, 
      resetSelection, 
      resetAll 
    }}>
      {children}
    </MonstersContext.Provider>
  );
}

export function useMonsters() {
  const context = useContext(MonstersContext);
  if (!context) {
    throw new Error("useMonsters deve ser usado dentro de MonstersProvider");
  }
  return context;
} 