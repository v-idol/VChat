import { Viewer } from '@/features/vrmViewer/viewer';
import { create } from 'zustand';

interface AgentStore {
  currentAgent: any;
  viewer: any;
  agentList: any[];
  setCurrentAgent: (role: string) => void;
  setAgentList: (agentList: any[]) => void;
}

export const useAgentStore = create<AgentStore>()((set) => ({
  currentAgent: null,
  agentList: [],
  viewer: new Viewer(),
  setCurrentAgent: (agent) => {
    set({ currentAgent: agent });
  },
  setAgentList: (agentList) => {
    set({ agentList: agentList });
  },
}));
