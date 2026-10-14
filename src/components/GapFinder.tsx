import { useState, useMemo } from 'react';
import {
  Compass, Search, ArrowRight, Check, X, AlertCircle, Sparkles, Clock,
  DollarSign, GraduationCap, Target, TrendingUp, PenLine, ArrowLeft,
  Calendar, Award, FileText, Lightbulb, Info,
} from 'lucide-react';
import type { Page } from './Navbar';
import {
  careers, careerCategories, allSkillPool, searchCareers, getCareer,
} from '@/data/careers';
import { useApp } from '@/context/AppContext';
import type { Career, CareerCategory } from '@/types';

interface GapFinderProps {
  onNavigate: (page: Page) => void;
}

const educationLevels = [
  'High School Student',
  'College Student (Year 1-2)',
  'College Student (Year 3-4)',
  'Recent Graduate',
  'Career Switcher / Self-Taught',
];

export function GapFinder({ onNavigate }: GapFinderProps) {
  const { state, setProfile, setExamDetails, setCustomGoal, generatePlan } = useApp();
  const [step, setStep] = useState(1);
  const [skillInput, setSkillInput] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Career selector state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<CareerCategory | 'all'>('all');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customSkills, setCustomSkills] = useState('');

  const selectedCareer = useMemo(
    () => state.profile.careerId && state.profile.careerId !== 'custom'
      ? getCareer(state.profile.careerId)
      : null,
    [state.profile.careerId]
  );

  const isCustomCareer = state.profile.careerId === 'custom';
  const isExamCareer = selectedCareer?.isExam ?? false;

  const filteredCareers = useMemo(() => {
    let result = searchQuery ? searchCareers(searchQuery) : careers;
    if (activeCategory !== 'all') {
      result = result.filter(c => c.category === activeCategory);
    }
    return result;
  }, [searchQuery, activeCategory]);

  const gapAnalysis = useMemo(() => {
    if (isCustomCareer && state.profile.customGoal) {
      const goal = state.profile.customGoal;
      const skills = goal.skills;
      const have = skills.filter(s => state.profile.currentSkills.includes(s));
      const missing = skills.filter(s => !state.profile.currentSkills.includes(s));
      return { have: have.map(s => ({ id: s, name: s, category: 'Custom' })), missing: missing.map(s => ({ id: s, name: s, category: 'Custom' })), total: skills.length };
    }
    if (!selectedCareer) return null;
    const have = selectedCareer.requiredSkills.filter(s =>
      state.profile.currentSkills.includes(s.name)
    );
    const missing = selectedCareer.requiredSkills.filter(s =>
      !state.profile.currentSkills.includes(s.name)
    );
    return { have, missing, total: selectedCareer.requiredSkills.length };
  }, [selectedCareer, isCustomCareer, state.profile.currentSkills, state.profile.customGoal]);

  const filteredSkills = useMemo(() => {
    if (!skillInput) return [];
    return allSkillPool.filter(s =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !state.profile.currentSkills.includes(s)
    ).slice(0, 8);
  }, [skillInput, state.profile.currentSkills]);

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !state.profile.currentSkills.includes(trimmed)) {
      setProfile({ currentSkills: [...state.profile.currentSkills, trimmed] });
    }
    setSkillInput('');
  };

  const removeSkill = (skill: string) => {
    setProfile({ currentSkills: state.profile.currentSkills.filter(s => s !== skill) });
  };

  const selectCareer = (career: Career) => {
    setProfile({ careerId: career.id, customGoal: null });
    if (career.isExam && !state.profile.examDetails) {
      setExamDetails({ examName: career.title });
    }
    setStep(2);
  };

  const handleCustomSubmit = () => {
    if (!customTitle.trim()) return;
    const skills = customSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    setCustomGoal({
      title: customTitle.trim(),
      description: customDesc.trim(),
      skills,
    });
    setProfile({ careerId: 'custom' });
    setShowCustomForm(false);
    setStep(2);
  };

  const handleAnalyze = () => {
    setShowResults(true);
    generatePlan();
  };

  const handleViewRoadmap = () => {
    generatePlan();
    onNavigate('roadmap');
  };

  const totalSteps = isExamCareer ? 5 : 4;

  const selectedTitle = isCustomCareer
    ? state.profile.customGoal?.title ?? 'Custom Goal'
    : selectedCareer?.title ?? '';

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-4">
            <Compass className="w-4 h-4 text-teal-400" />
            <span className="text-sm text-teal-300 font-medium">Signature Feature</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3">Opportunity Gap Finder</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Tell us about yourself and your dream career. We'll identify exactly what skills you're missing and what steps to take next.
          </p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8 max-w-2xl mx-auto">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                i + 1 <= step ? 'bg-teal-500' : 'bg-navy-700'
              }`}
            />
          ))}
        </div>

        {/* ─── Step 1: Career Selection ─────────────────────────────────────── */}
        {step === 1 && (
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-navy-950 font-bold text-sm flex items-center justify-center">1</div>
              <h2 className="font-display text-xl font-semibold">Select Your Dream Career</h2>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search careers, exams, goals..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-navy-800/50 border border-navy-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-teal-500/15 border border-teal-500/40 text-teal-300'
                    : 'bg-navy-800/50 border border-navy-700/50 text-gray-400 hover:text-gray-300'
                }`}
              >
                All Categories
              </button>
              {careerCategories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name as CareerCategory)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'bg-teal-500/15 border border-teal-500/40 text-teal-300'
                      : 'bg-navy-800/50 border border-navy-700/50 text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Selected career display */}
            {(selectedCareer || isCustomCareer) && (
              <div className="mb-4 p-4 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-teal-400" />
                  <div>
                    <div className="text-sm text-teal-300">Currently selected:</div>
                    <div className="font-display font-semibold text-white">{selectedTitle}</div>
                  </div>
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500 text-navy-950 text-sm font-semibold hover:bg-teal-400 transition-all"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Career grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {filteredCareers.map(career => {
                const isSelected = state.profile.careerId === career.id;
                return (
                  <button
                    key={career.id}
                    onClick={() => selectCareer(career)}
                    className={`group text-left p-5 rounded-2xl border transition-all ${
                      isSelected
                        ? 'bg-teal-500/10 border-teal-500/50 ring-1 ring-teal-500/30'
                        : 'bg-navy-800/50 border-navy-700/50 hover:border-teal-500/30'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-base font-semibold">{career.title}</h3>
                          {isSelected && <Check className="w-4 h-4 text-teal-400" />}
                        </div>
                        <p className="text-sm text-gray-400">{career.tagline}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="px-2 py-0.5 rounded-md bg-navy-700/50 text-xs text-gray-300">{career.category}</span>
                          <span className="px-2 py-0.5 rounded-md bg-navy-700/50 text-xs text-gray-300">{career.difficulty}</span>
                          {career.isExam && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-500/10 text-xs text-blue-300">Exam Prep</span>
                          )}
                          <span className="px-2 py-0.5 rounded-md bg-navy-700/50 text-xs text-gray-300">{career.requiredSkills.length} skills</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {filteredCareers.length === 0 && (
              <div className="text-center py-8 mb-6">
                <p className="text-gray-400 mb-2">No careers found matching your search.</p>
                <p className="text-sm text-gray-500">Try a different keyword or enter your own goal below.</p>
              </div>
            )}

            {/* Custom career entry */}
            <div className="border-t border-navy-700/50 pt-6">
              {!showCustomForm ? (
                <button
                  onClick={() => setShowCustomForm(true)}
                  className="w-full p-5 rounded-2xl border-2 border-dashed border-navy-600/50 hover:border-teal-500/40 hover:bg-teal-500/5 transition-all group"
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-700/50 group-hover:bg-teal-500/10 flex items-center justify-center transition-all">
                      <PenLine className="w-5 h-5 text-teal-400" />
                    </div>
                    <div className="text-left">
                      <div className="font-display text-base font-semibold text-white">Other / Enter Your Own Dream</div>
                      <div className="text-sm text-gray-400">Type any career, exam, or personal ambition not listed above</div>
                    </div>
                  </div>
                </button>
              ) : (
                <div className="p-6 rounded-2xl bg-navy-800/50 border border-navy-700/50 animate-scaleIn">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="w-5 h-5 text-teal-400" />
                    <h3 className="font-display text-lg font-semibold">Enter Your Custom Goal</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Your dream, goal, or exam *</label>
                      <input
                        type="text"
                        value={customTitle}
                        onChange={e => setCustomTitle(e.target.value)}
                        placeholder="e.g., Guitarist, Marathon Runner, GATE Exam, Start a bakery..."
                        className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Tell us more about it (optional)</label>
                      <textarea
                        value={customDesc}
                        onChange={e => setCustomDesc(e.target.value)}
                        placeholder="What does success look like for you? Any specific requirements?"
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-1.5">Skills you think you'll need (comma-separated, optional)</label>
                      <input
                        type="text"
                        value={customSkills}
                        onChange={e => setCustomSkills(e.target.value)}
                        placeholder="e.g., Music Theory, Practice, Performance..."
                        className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                      />
                      <p className="text-xs text-gray-500 mt-1.5">
                        If you're unsure, leave blank — we'll suggest a general learning framework.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-5">
                    <button
                      onClick={() => setShowCustomForm(false)}
                      className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCustomSubmit}
                      disabled={!customTitle.trim()}
                      className="px-5 py-2.5 rounded-xl bg-teal-500 text-navy-950 text-sm font-semibold hover:bg-teal-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Set My Goal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ─── Step 2: Exam Details (only for exam careers) ─────────────────── */}
        {step === 2 && isExamCareer && (
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-navy-950 font-bold text-sm flex items-center justify-center">2</div>
              <h2 className="font-display text-xl font-semibold">Exam Preparation Details</h2>
            </div>

            <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-4 h-4 text-teal-400" />
                <p className="text-sm text-gray-400">
                  Help us tailor your preparation plan for <span className="text-teal-300">{selectedCareer?.title}</span>.
                </p>
              </div>

              {/* Exam name (auto-filled, editable) */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Exact Exam Name</label>
                <input
                  type="text"
                  value={state.profile.examDetails?.examName ?? ''}
                  onChange={e => setExamDetails({ examName: e.target.value })}
                  placeholder="e.g., UPSC CSE 2026, SSC CGL Tier 1, IBPS PO..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>

              {/* Target post */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Target Post / Role</label>
                <input
                  type="text"
                  value={state.profile.examDetails?.targetPost ?? ''}
                  onChange={e => setExamDetails({ targetPost: e.target.value })}
                  placeholder="e.g., IAS, IPS, Probationary Officer, Sub-Inspector..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
              </div>

              {/* Preparation level */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Current Preparation Level</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Beginner', 'Intermediate', 'Advanced'] as const).map(level => (
                    <button
                      key={level}
                      onClick={() => setExamDetails({ preparationLevel: level })}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        state.profile.examDetails?.preparationLevel === level
                          ? 'bg-teal-500/10 border border-teal-500/40 text-teal-300'
                          : 'bg-navy-900/50 border border-navy-600/30 text-gray-400 hover:border-navy-500/50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exam stage */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Current Exam Stage</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {(['Not started', 'Preliminary', 'Mains', 'Interview', 'Repeat attempt'] as const).map(stage => (
                    <button
                      key={stage}
                      onClick={() => setExamDetails({ examStage: stage })}
                      className={`px-4 py-2.5 rounded-xl text-sm transition-all ${
                        state.profile.examDetails?.examStage === stage
                          ? 'bg-teal-500/10 border border-teal-500/40 text-teal-300'
                          : 'bg-navy-900/50 border border-navy-600/30 text-gray-400 hover:border-navy-500/50'
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              {/* Target date */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Target Exam Date (if known)</label>
                <input
                  type="date"
                  value={state.profile.examDetails?.targetDate ?? ''}
                  onChange={e => setExamDetails({ targetDate: e.target.value })}
                  className="w-full sm:w-auto px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white focus:outline-none focus:border-teal-500/50 transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-navy-950 text-sm font-semibold hover:bg-teal-400 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 2 (non-exam) / Step 3 (exam): Skills ─────────────────────── */}
        {((step === 2 && !isExamCareer) || (step === 3 && isExamCareer)) && (
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-navy-950 font-bold text-sm flex items-center justify-center">
                {isExamCareer ? 3 : 2}
              </div>
              <h2 className="font-display text-xl font-semibold">What Skills Do You Already Have?</h2>
            </div>

            <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
              <label className="block text-sm text-gray-400 mb-2">Add your current skills (type and select from suggestions)</label>
              <div className="relative">
                <input
                  type="text"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill(skillInput);
                    }
                  }}
                  placeholder="e.g., Python, Quantitative Aptitude, Polity..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-900/50 border border-navy-600/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
                />
                {filteredSkills.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-10 rounded-xl bg-navy-800 border border-navy-600/50 shadow-xl overflow-hidden animate-scaleIn">
                    {filteredSkills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => addSkill(skill)}
                        className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-teal-500/10 hover:text-teal-300 transition-colors"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {state.profile.currentSkills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {state.profile.currentSkills.map(skill => (
                    <div
                      key={skill}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-sm text-teal-300"
                    >
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-white transition-colors">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {state.profile.currentSkills.length === 0 && (
                <p className="text-sm text-gray-500 mt-4 italic">
                  No skills added yet. Add at least one to get an accurate gap analysis.
                </p>
              )}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(isExamCareer ? 2 : 1)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => setStep(isExamCareer ? 4 : 3)}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-navy-950 text-sm font-semibold hover:bg-teal-400 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 3 (non-exam) / Step 4 (exam): Budget & Time ──────────────── */}
        {((step === 3 && !isExamCareer) || (step === 4 && isExamCareer)) && (
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-navy-950 font-bold text-sm flex items-center justify-center">
                {isExamCareer ? 4 : 3}
              </div>
              <h2 className="font-display text-xl font-semibold">Budget & Study Time</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="w-5 h-5 text-teal-400" />
                  <label className="text-sm font-medium text-gray-300">Monthly Learning Budget</label>
                </div>
                <div className="text-3xl font-display font-bold text-white mb-3">
                  ${state.profile.budget}
                </div>
                <input
                  type="range"
                  min="0"
                  max="500"
                  step="10"
                  value={state.profile.budget}
                  onChange={e => setProfile({ budget: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>$0</span>
                  <span>$500+</span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {state.profile.budget === 0
                    ? 'We\'ll prioritize free resources only'
                    : 'We\'ll include both free and paid resources in your plan'}
                </p>
              </div>

              <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-teal-400" />
                  <label className="text-sm font-medium text-gray-300">Weekly Study Hours</label>
                </div>
                <div className="text-3xl font-display font-bold text-white mb-3">
                  {state.profile.weeklyHours} hrs
                </div>
                <input
                  type="range"
                  min="2"
                  max="40"
                  step="1"
                  value={state.profile.weeklyHours}
                  onChange={e => setProfile({ weeklyHours: Number(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>2 hrs</span>
                  <span>40 hrs</span>
                </div>
                <p className="text-xs text-gray-400 mt-3">
                  {state.profile.weeklyHours < 10
                    ? 'Part-time pace — your plan will be adjusted accordingly'
                    : state.profile.weeklyHours < 20
                    ? 'Dedicated pace — good for steady progress'
                    : 'Intensive pace — you can complete this faster'}
                </p>
              </div>

              <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6 sm:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  <label className="text-sm font-medium text-gray-300">Education Level</label>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {educationLevels.map(level => (
                    <button
                      key={level}
                      onClick={() => setProfile({ educationLevel: level })}
                      className={`px-4 py-2.5 rounded-xl text-sm text-left transition-all ${
                        state.profile.educationLevel === level
                          ? 'bg-teal-500/10 border border-teal-500/40 text-teal-300'
                          : 'bg-navy-900/50 border border-navy-600/30 text-gray-400 hover:border-navy-500/50'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(isExamCareer ? 3 : 2)}
                className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => {
                  setStep(isExamCareer ? 5 : 4);
                }}
                className="px-5 py-2.5 rounded-xl bg-teal-500 text-navy-950 text-sm font-semibold hover:bg-teal-400 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* ─── Step 4 (non-exam) / Step 5 (exam): Analysis ───────────────────── */}
        {((step === 4 && !isExamCareer) || (step === 5 && isExamCareer)) && (
          <div className="animate-fadeInUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-navy-950 font-bold text-sm flex items-center justify-center">
                {isExamCareer ? 5 : 4}
              </div>
              <h2 className="font-display text-xl font-semibold">Your Gap Analysis</h2>
            </div>

            {!showResults ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
                  <Target className="w-10 h-10 text-teal-400" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">Ready to analyze your profile?</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  We'll compare your current skills with the requirements for <span className="text-teal-400">{selectedTitle}</span> and show you exactly what's missing.
                </p>
                <button
                  onClick={handleAnalyze}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all"
                >
                  <Sparkles className="w-5 h-5" />
                  Analyze My Gap
                </button>
              </div>
            ) : gapAnalysis ? (
              <div className="space-y-6">
                {/* Summary card */}
                <div className="bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-navy-700/50 rounded-2xl p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 rounded-xl bg-navy-900/50">
                      <div className="text-3xl font-display font-bold text-teal-400">{gapAnalysis.have.length}</div>
                      <div className="text-xs text-gray-400 mt-1">Skills You Have</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-navy-900/50">
                      <div className="text-3xl font-display font-bold text-orange-400">{gapAnalysis.missing.length}</div>
                      <div className="text-xs text-gray-400 mt-1">Skills Missing</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-navy-900/50">
                      <div className="text-3xl font-display font-bold text-white">
                        {gapAnalysis.total > 0 ? Math.round((gapAnalysis.have.length / gapAnalysis.total) * 100) : 0}%
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Career Readiness</div>
                    </div>
                  </div>

                  {gapAnalysis.total > 0 && (
                    <div className="relative h-3 rounded-full bg-navy-900 overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-700"
                        style={{ width: `${(gapAnalysis.have.length / gapAnalysis.total) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Custom goal info notice */}
                {isCustomCareer && state.profile.customGoal && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-200">
                      This is a custom goal. We've created a general learning framework based on your input. As you progress, refine your skills list for a more accurate analysis.
                    </p>
                  </div>
                )}

                {/* Exam-specific info */}
                {isExamCareer && state.profile.examDetails && (
                  <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="w-5 h-5 text-teal-400" />
                      <h3 className="font-display text-lg font-semibold">Your Exam Profile</h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Exam</div>
                        <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.examName || selectedCareer?.title}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Target Post</div>
                        <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.targetPost || 'Not specified'}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Level</div>
                        <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.preparationLevel}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">Stage</div>
                        <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.examStage}</div>
                      </div>
                    </div>
                    {state.profile.examDetails.targetDate && (
                      <div className="mt-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-teal-400" />
                        <span className="text-sm text-gray-300">Target date: <span className="text-white font-medium">{state.profile.examDetails.targetDate}</span></span>
                      </div>
                    )}
                  </div>
                )}

                {/* Skills you have */}
                {gapAnalysis.have.length > 0 && (
                  <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Check className="w-5 h-5 text-teal-400" />
                      <h3 className="font-display text-lg font-semibold">Skills You Already Have</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gapAnalysis.have.map(skill => (
                        <div key={skill.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-sm text-teal-300">
                          <Check className="w-3.5 h-3.5" />
                          {skill.name}
                          <span className="text-xs text-teal-500/60">· {skill.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing skills */}
                {gapAnalysis.missing.length > 0 && (
                  <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-orange-400" />
                      <h3 className="font-display text-lg font-semibold">Skills You Need to Learn</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {gapAnalysis.missing.map(skill => (
                        <div key={skill.id} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-sm text-orange-300">
                          <X className="w-3.5 h-3.5" />
                          {skill.name}
                          <span className="text-xs text-orange-500/60">· {skill.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom goal with no skills specified */}
                {isCustomCareer && gapAnalysis.total === 0 && (
                  <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-display text-lg font-semibold mb-2">Help us build your plan</h3>
                        <p className="text-sm text-gray-400 mb-3">
                          You haven't listed specific skills for your goal "{state.profile.customGoal?.title}". We've created a general 4-phase learning framework, but for a more accurate plan, consider adding skills you think you'll need.
                        </p>
                        <button
                          onClick={() => setStep(2)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-sm text-teal-300 hover:bg-teal-500/20 transition-all"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          Add Skills
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Time & budget estimate */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 text-teal-400" />
                      <h3 className="font-display text-sm font-semibold text-gray-300">Estimated Time</h3>
                    </div>
                    {gapAnalysis.total > 0 ? (
                      <>
                        <p className="text-2xl font-display font-bold text-white">
                          ~{Math.ceil((gapAnalysis.missing.length / gapAnalysis.total) * (selectedCareer?.totalWeeks ?? 16))} weeks
                        </p>
                        <p className="text-xs text-gray-400 mt-1">at {state.profile.weeklyHours} hrs/week</p>
                      </>
                    ) : (
                      <>
                        <p className="text-2xl font-display font-bold text-white">~16 weeks</p>
                        <p className="text-xs text-gray-400 mt-1">general estimate for custom goals</p>
                      </>
                    )}
                  </div>
                  <div className="bg-navy-800/50 border border-navy-700/50 rounded-2xl p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-teal-400" />
                      <h3 className="font-display text-sm font-semibold text-gray-300">Budget Match</h3>
                    </div>
                    <p className="text-2xl font-display font-bold text-white">
                      {state.profile.budget === 0 ? 'Free resources' : `$${state.profile.budget}/mo`}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {state.profile.budget === 0
                        ? 'Your plan includes only free learning resources'
                        : 'Your plan includes free + premium resources'}
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <button
                    onClick={handleViewRoadmap}
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all"
                  >
                    View My Roadmap
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => onNavigate('opportunities')}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all"
                  >
                    Explore Opportunities
                  </button>
                </div>

                <p className="text-center text-xs text-gray-500 pt-2">
                  Analysis uses rule-based skill matching. No external AI service is connected.
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
