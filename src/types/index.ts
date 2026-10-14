export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  skills: string[];
  estimatedWeeks: number;
  resources: { name: string; url: string; type: 'free' | 'paid' | 'freemium' }[];
  completed: boolean;
  phase: number;
}

export type CareerCategory =
  | 'Government Jobs'
  | 'Technology'
  | 'Healthcare'
  | 'Education'
  | 'Business & Finance'
  | 'Creative Careers'
  | 'Other Careers';

export interface Career {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  description: string;
  requiredSkills: Skill[];
  avgSalaryRange: string;
  difficulty: 'Beginner-friendly' | 'Intermediate' | 'Advanced';
  totalWeeks: number;
  category: CareerCategory;
  isExam?: boolean;
}

export interface ExamDetails {
  examName: string;
  targetPost: string;
  preparationLevel: 'Beginner' | 'Intermediate' | 'Advanced';
  examStage: 'Not started' | 'Preliminary' | 'Mains' | 'Interview' | 'Repeat attempt';
  studyHours: number;
  targetDate: string;
}

export interface CustomGoal {
  title: string;
  description: string;
  skills: string[];
}

export interface UserProfile {
  careerId: string | null;
  currentSkills: string[];
  budget: number;
  weeklyHours: number;
  educationLevel: string;
  examDetails: ExamDetails | null;
  customGoal: CustomGoal | null;
}

export interface Opportunity {
  id: string;
  title: string;
  type: 'scholarship' | 'course' | 'internship' | 'hackathon' | 'competition' | 'project';
  provider: string;
  description: string;
  cost: 'Free' | 'Paid' | 'Freemium';
  costDetail?: string;
  eligibility: string;
  tags: string[];
  url: string;
  skillsMatch: string[];
  isDemo: boolean;
}

export interface AppState {
  profile: UserProfile;
  milestones: Milestone[];
  bookmarks: string[];
}
