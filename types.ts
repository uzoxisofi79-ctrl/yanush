
export enum MessageRole {
  USER = 'user',
  MODEL = 'model',
  SYSTEM = 'system'
}

export type UserRole = 'GUEST' | 'USER' | 'PREMIUM' | 'ADMIN';

export interface UserAccount {
  id: string;
  email: string;
  role: UserRole;
  password?: string; // Только для локальной БД
  subscriptionActiveUntil?: number;
}

export interface SimulationState {
  trust: number;
  stress: number;
  thought: string;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string; 
  state?: SimulationState; 
  timestamp: number;
}

export interface TeacherProfile {
  name: string;
  gender: 'male' | 'female';
}

export interface StudentProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  avatarUrl?: string;
}

export interface Accentuation {
  id: string;
  name: string;
  description_template: string; 
  intensity_levels: number;
  isPremium?: boolean;
}

export interface ContextModule {
  id: string;
  category: 'incident' | 'background';
  name: string;
  prompt_text: string;
  teacher_briefing: string;
  hidden_agenda: string; 
  initial_trust: number; 
  initial_stress: number; 
  conflicts: string[]; 
  incompatible_accentuations?: string[]; 
  weight: number; 
  isPremium?: boolean;
}

export interface GlobalSettings {
  chat_temperature: number;
  analysis_temperature: number;
}

export interface CommissionFeedback {
  role: string;
  name: string;
  verdict: string;
  score: number;
}

export interface AnalysisResult {
  overall_score: number;
  summary: string;
  commission: CommissionFeedback[];
  timestamp: number;
}

export interface TerminationThresholds {
  runaway_stress: number;
  runaway_trust: number;
  shutdown_stress: number;
  shutdown_trust: number;
}

export interface ActiveSession {
  teacher: TeacherProfile;
  student: StudentProfile;
  constructedPrompt: string;
  chaosDetails: {
    accentuation: string;
    intensity: number;
    modules: string[];
    starting_trust: number;
    starting_stress: number;
    thresholds: TerminationThresholds;
    contextSummary: string;
  };
}

export interface SessionLog {
  id: string;
  timestamp: number;
  duration_seconds: number;
  teacher: TeacherProfile;
  student_name: string;
  scenario_description: string; 
  status: string;
  messages: Message[];
  result?: AnalysisResult; 
  sessionSnapshot?: ActiveSession; 
}

export interface Scenario {
  id: string;
  base_system_prompt: string;
}

export type SessionStatus = 'active' | 'completed' | 'manual' | 'interrupted';
