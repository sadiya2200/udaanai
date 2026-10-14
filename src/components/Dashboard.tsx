import { useMemo } from 'react';
import { LayoutDashboard, Target, TrendingUp, Bookmark, CheckCircle2, Circle, ArrowRight, Sparkles, Compass, Map, ExternalLink, Award, AlertCircle, RotateCcw, FileText, Calendar } from 'lucide-react';
import type { Page } from './Navbar';
import { getCareer } from '@/data/careers';
import { opportunities } from '@/data/opportunities';
import { useApp } from '@/context/AppContext';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const { state, progress, nextAction, toggleBookmark, isBookmarked, resetAll } = useApp();

  const career = useMemo(
    () => state.profile.careerId && state.profile.careerId !== 'custom'
      ? getCareer(state.profile.careerId)
      : null,
    [state.profile.careerId]
  );

  const isCustom = state.profile.careerId === 'custom';

  const careerTitle = isCustom
    ? state.profile.customGoal?.title ?? 'Custom Goal'
    : career?.title ?? 'Not set';
  const careerDifficulty = career?.difficulty ?? (isCustom ? 'Custom' : '');

  const savedOpportunities = useMemo(
    () => opportunities.filter(opp => isBookmarked(opp.id)),
    [state.bookmarks, isBookmarked]
  );

  const gapAnalysis = useMemo(() => {
    if (isCustom && state.profile.customGoal) {
      const skills = state.profile.customGoal.skills;
      const have = skills.filter(s => state.profile.currentSkills.includes(s));
      const missing = skills.filter(s => !state.profile.currentSkills.includes(s));
      return {
        have: have.map(s => ({ id: s, name: s, category: 'Custom' })),
        missing: missing.map(s => ({ id: s, name: s, category: 'Custom' })),
      };
    }
    if (!career) return null;
    const have = career.requiredSkills.filter(s => state.profile.currentSkills.includes(s.name));
    const missing = career.requiredSkills.filter(s => !state.profile.currentSkills.includes(s.name));
    return { have, missing };
  }, [career, isCustom, state.profile.currentSkills, state.profile.customGoal]);

  const completedMilestones = state.milestones.filter(m => m.completed);
  const totalSkills = gapAnalysis ? gapAnalysis.have.length + gapAnalysis.missing.length : 0;

  const hasData = state.profile.careerId && state.milestones.length > 0;

  if (!hasData) {
    return (
      <div className="min-h-screen bg-navy-950 text-white pt-20 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
            <LayoutDashboard className="w-10 h-10 text-teal-400" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-3">Your Dashboard Awaits</h1>
          <p className="text-gray-400 mb-6">
            {state.profile.careerId
              ? 'Generate your roadmap to start tracking progress.'
              : 'Start by selecting a dream career and building your roadmap. Your dashboard will show your progress, saved opportunities, and skill gaps.'}
          </p>
          <button
            onClick={() => onNavigate('gap-finder')}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-5 h-5" />
            Get Started
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <LayoutDashboard className="w-5 h-5 text-teal-400" />
            <span className="text-sm text-teal-300 font-medium">Student Dashboard</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Your Progress at a Glance</h1>
          <p className="text-gray-400">Track your goal, roadmap progress, skill gaps, and saved opportunities.</p>
        </div>

        {/* Next action banner */}
        <div className="flex items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 to-teal-600/5 border border-teal-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/15 flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <div className="text-xs text-teal-300 uppercase tracking-wider font-medium">Recommended Next Action</div>
              <div className="text-sm font-medium text-white mt-0.5">{nextAction}</div>
            </div>
          </div>
          <button
            onClick={() => onNavigate('roadmap')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-500/15 border border-teal-500/30 text-sm text-teal-300 hover:bg-teal-500/25 transition-all flex-shrink-0"
          >
            Go <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Target, label: 'Dream Career', value: careerTitle, sub: careerDifficulty },
            { icon: TrendingUp, label: 'Roadmap Progress', value: `${progress}%`, sub: `${completedMilestones.length}/${state.milestones.length} phases` },
            { icon: Bookmark, label: 'Saved Opportunities', value: `${savedOpportunities.length}`, sub: 'bookmarked' },
            { icon: CheckCircle2, label: 'Skills Mastered', value: `${gapAnalysis?.have.length ?? 0}`, sub: `of ${totalSkills}` },
          ].map(stat => (
            <div key={stat.label} className="p-5 rounded-2xl bg-navy-800/50 border border-navy-700/50">
              <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3">
                <stat.icon className="w-5 h-5 text-teal-400" />
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</div>
              <div className="text-lg font-display font-bold text-white truncate">{stat.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* Exam details card (if applicable) */}
        {career?.isExam && state.profile.examDetails && (
          <div className="mb-6 p-5 rounded-2xl bg-blue-500/5 border border-blue-500/20">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <h2 className="font-display text-sm font-semibold text-blue-300 uppercase tracking-wider">Exam Details</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Exam</div>
                <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.examName || career.title}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Target Post</div>
                <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.targetPost || '—'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Level / Stage</div>
                <div className="text-sm font-medium text-white mt-1">{state.profile.examDetails.preparationLevel} / {state.profile.examDetails.examStage}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Target Date</div>
                <div className="text-sm font-medium text-white mt-1 flex items-center gap-1">
                  {state.profile.examDetails.targetDate ? (
                    <><Calendar className="w-3 h-3 text-blue-400" />{state.profile.examDetails.targetDate}</>
                  ) : 'Not set'}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Roadmap progress */}
          <div className="rounded-2xl bg-navy-800/50 border border-navy-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Map className="w-5 h-5 text-teal-400" />
                <h2 className="font-display text-lg font-semibold">Roadmap Progress</h2>
              </div>
              <button
                onClick={() => onNavigate('roadmap')}
                className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                View all <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 rounded-full bg-navy-900 overflow-hidden mb-4">
              <div
                className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Milestones list */}
            <div className="space-y-2">
              {state.milestones.map(milestone => (
                <div
                  key={milestone.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-navy-900/30"
                >
                  {milestone.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm truncate ${milestone.completed ? 'text-teal-300' : 'text-gray-400'}`}>
                      {milestone.title}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{milestone.estimatedWeeks}w</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill gaps */}
          <div className="rounded-2xl bg-navy-800/50 border border-navy-700/50 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-400" />
                <h2 className="font-display text-lg font-semibold">Skill Gaps</h2>
              </div>
              <button
                onClick={() => onNavigate('gap-finder')}
                className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                Update <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {gapAnalysis && gapAnalysis.missing.length > 0 ? (
              <div className="space-y-2">
                {gapAnalysis.missing.map(skill => (
                  <div key={skill.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-orange-500/5 border border-orange-500/10">
                    <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <span className="text-sm text-gray-300 flex-1">{skill.name}</span>
                    <span className="text-xs text-gray-500">{skill.category}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Award className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  {totalSkills === 0 ? 'Add skills to see your gaps.' : 'All required skills covered!'}
                </p>
              </div>
            )}

            {gapAnalysis && gapAnalysis.have.length > 0 && (
              <div className="mt-4 pt-4 border-t border-navy-700/30">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Skills You Have</div>
                <div className="flex flex-wrap gap-1.5">
                  {gapAnalysis.have.map(skill => (
                    <span key={skill.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-500/10 text-xs text-teal-300">
                      <CheckCircle2 className="w-3 h-3" />
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Saved opportunities */}
          <div className="rounded-2xl bg-navy-800/50 border border-navy-700/50 p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-teal-400" />
                <h2 className="font-display text-lg font-semibold">Saved Opportunities</h2>
              </div>
              <button
                onClick={() => onNavigate('opportunities')}
                className="text-sm text-teal-400 hover:text-teal-300 flex items-center gap-1"
              >
                Explore more <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {savedOpportunities.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {savedOpportunities.map(opp => (
                  <div
                    key={opp.id}
                    className="group p-4 rounded-xl bg-navy-900/40 border border-navy-700/30 hover:border-teal-500/20 transition-all"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="text-xs text-gray-500 uppercase tracking-wider">{opp.type}</div>
                        <h3 className="font-medium text-sm text-white mt-0.5">{opp.title}</h3>
                      </div>
                      <button
                        onClick={() => toggleBookmark(opp.id)}
                        className="text-teal-400 hover:text-teal-300 flex-shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">{opp.description}</p>
                    <div className="flex items-center gap-2">
                      <a
                        href={opp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-teal-400 hover:text-teal-300"
                      >
                        View <ExternalLink className="w-3 h-3" />
                      </a>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        opp.cost === 'Free' ? 'bg-teal-500/10 text-teal-400' : 'bg-orange-500/10 text-orange-400'
                      }`}>
                        {opp.cost}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Bookmark className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-400 mb-3">No saved opportunities yet.</p>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-sm text-teal-300 hover:bg-teal-500/20 transition-all"
                >
                  Browse Opportunities
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Profile summary & reset */}
        <div className="mt-8 p-5 rounded-2xl bg-navy-800/30 border border-navy-700/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Budget</div>
                <div className="text-sm font-medium text-white mt-0.5">${state.profile.budget}/mo</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Study Time</div>
                <div className="text-sm font-medium text-white mt-0.5">{state.profile.weeklyHours} hrs/wk</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Education</div>
                <div className="text-sm font-medium text-white mt-0.5">{state.profile.educationLevel || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Skills Listed</div>
                <div className="text-sm font-medium text-white mt-0.5">{state.profile.currentSkills.length}</div>
              </div>
            </div>
            <button
              onClick={() => {
                if (confirm('Reset all your data? This will clear your profile, roadmap, and bookmarks.')) {
                  resetAll();
                  onNavigate('home');
                }
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-red-400 hover:border-red-500/20 transition-all flex-shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              Reset Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
