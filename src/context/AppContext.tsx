import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AppState, UserProfile, ExamDetails, CustomGoal, Milestone } from '@/types';
import { generateRoadmap, getCareer } from '@/data/careers';

const STORAGE_KEY = 'udaan-ai-state';

const defaultProfile: UserProfile = {
  careerId: null,
  currentSkills: [],
  budget: 0,
  weeklyHours: 10,
  educationLevel: '',
  examDetails: null,
  customGoal: null,
};

const defaultState: AppState = {
  profile: defaultProfile,
  milestones: [],
  bookmarks: [],
};

interface AppContextValue {
  state: AppState;
  setProfile: (profile: Partial<UserProfile>) => void;
  setExamDetails: (details: Partial<ExamDetails>) => void;
  setCustomGoal: (goal: Partial<CustomGoal>) => void;
  generatePlan: () => void;
  toggleMilestone: (milestoneId: string) => void;
  toggleBookmark: (opportunityId: string) => void;
  isBookmarked: (opportunityId: string) => boolean;
  resetAll: () => void;
  progress: number;
  nextAction: string;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          profile: { ...defaultProfile, ...parsed.profile },
          milestones: parsed.milestones ?? [],
          bookmarks: parsed.bookmarks ?? [],
        };
      }
    } catch {
      // ignore
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const setProfile = useCallback((profile: Partial<UserProfile>) => {
    setState(prev => ({
      ...prev,
      profile: { ...prev.profile, ...profile },
    }));
  }, []);

  const setExamDetails = useCallback((details: Partial<ExamDetails>) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        examDetails: { ...(prev.profile.examDetails ?? defaultExamDetails), ...details },
      },
    }));
  }, []);

  const setCustomGoal = useCallback((goal: Partial<CustomGoal>) => {
    setState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        customGoal: { ...(prev.profile.customGoal ?? defaultCustomGoal), ...goal },
      },
    }));
  }, []);

  const generatePlan = useCallback(() => {
    setState(prev => {
      if (!prev.profile.careerId) return prev;
      const milestones = generateRoadmap(
        prev.profile.careerId,
        prev.profile.currentSkills,
        prev.profile.examDetails,
        prev.profile.customGoal
      );
      return { ...prev, milestones };
    });
  }, []);

  const toggleMilestone = useCallback((milestoneId: string) => {
    setState(prev => ({
      ...prev,
      milestones: prev.milestones.map(m =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      ),
    }));
  }, []);

  const toggleBookmark = useCallback((opportunityId: string) => {
    setState(prev => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(opportunityId)
        ? prev.bookmarks.filter(id => id !== opportunityId)
        : [...prev.bookmarks, opportunityId],
    }));
  }, []);

  const isBookmarked = useCallback(
    (opportunityId: string) => state.bookmarks.includes(opportunityId),
    [state.bookmarks]
  );

  const resetAll = useCallback(() => {
    setState(defaultState);
  }, []);

  const progress = state.milestones.length > 0
    ? Math.round((state.milestones.filter(m => m.completed).length / state.milestones.length) * 100)
    : 0;

  const careerTitle = (() => {
    if (state.profile.careerId === 'custom' && state.profile.customGoal) {
      return state.profile.customGoal.title;
    }
    const c = state.profile.careerId ? getCareer(state.profile.careerId) : null;
    return c?.title ?? '';
  })();

  const nextAction = (() => {
    if (!state.profile.careerId) return 'Select a dream career to get started';
    const nextMilestone = state.milestones.find(m => !m.completed);
    if (nextMilestone) return `Complete: ${nextMilestone.title}`;
    if (state.milestones.length === 0) return 'Generate your personalized roadmap';
    if (progress === 100) return 'Congratulations! Explore opportunities to apply your skills';
    return 'Continue working on your roadmap';
  })();

  return (
    <AppContext.Provider value={{
      state, setProfile, setExamDetails, setCustomGoal, generatePlan, toggleMilestone,
      toggleBookmark, isBookmarked, resetAll, progress, nextAction,
    }}>
      {children}
    </AppContext.Provider>
  );
}

const defaultExamDetails: ExamDetails = {
  examName: '',
  targetPost: '',
  preparationLevel: 'Beginner',
  examStage: 'Not started',
  studyHours: 10,
  targetDate: '',
};

const defaultCustomGoal: CustomGoal = {
  title: '',
  description: '',
  skills: [],
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
