import { useMemo } from 'react';
import { Map, CheckCircle2, Circle, ExternalLink, BookOpen, Lock, Sparkles, ArrowRight, Clock, RefreshCw, TrendingUp, Calendar, FileText } from 'lucide-react';
import type { Page } from './Navbar';
import { getCareer } from '@/data/careers';
import { useApp } from '@/context/AppContext';

interface RoadmapProps {
  onNavigate: (page: Page) => void;
}

const phaseColors = [
  'from-teal-500 to-teal-600',
  'from-teal-400 to-teal-500',
  'from-cyan-400 to-teal-400',
  'from-teal-300 to-teal-400',
  'from-teal-400 to-cyan-400',
];

export function Roadmap({ onNavigate }: RoadmapProps) {
  const { state, generatePlan, toggleMilestone, progress } = useApp();

  const career = useMemo(
    () => state.profile.careerId && state.profile.careerId !== 'custom'
      ? getCareer(state.profile.careerId)
      : null,
    [state.profile.careerId]
  );

  const isCustom = state.profile.careerId === 'custom';
  const careerTitle = isCustom
    ? state.profile.customGoal?.title ?? 'Custom Goal'
    : career?.title ?? '';
  const careerTagline = isCustom
    ? state.profile.customGoal?.description ?? 'Your personalized learning journey'
    : career?.tagline ?? '';

  if (!career && !isCustom || state.milestones.length === 0) {
    return (
      <div className="min-h-screen bg-navy-950 text-white pt-20 pb-12 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mx-auto mb-6">
            <Map className="w-10 h-10 text-teal-400" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-3">No Roadmap Yet</h1>
          <p className="text-gray-400 mb-6">
            {state.profile.careerId
              ? 'You\'ve selected a career but haven\'t generated your roadmap yet. Click below to build your personalized plan.'
              : 'Start by selecting a dream career and entering your skills in the Opportunity Gap Finder.'}
          </p>
          <button
            onClick={() => {
              if (state.profile.careerId) {
                generatePlan();
              } else {
                onNavigate('gap-finder');
              }
            }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all"
          >
            <Sparkles className="w-5 h-5" />
            {state.profile.careerId ? 'Generate Roadmap' : 'Start Gap Finder'}
          </button>
        </div>
      </div>
    );
  }

  const completedCount = state.milestones.filter(m => m.completed).length;
  const totalWeeks = state.milestones.reduce((sum, m) => sum + m.estimatedWeeks, 0);
  const adjustedWeeks = state.profile.weeklyHours > 0
    ? Math.ceil(totalWeeks * (10 / state.profile.weeklyHours))
    : totalWeeks;

  const totalSkills = isCustom
    ? (state.profile.customGoal?.skills.length ?? 0)
    : (career?.requiredSkills.length ?? 0);

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-20 pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Map className="w-5 h-5 text-teal-400" />
            <span className="text-sm text-teal-300 font-medium">Dream-to-Plan Simulator</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Your Roadmap to {careerTitle}
          </h1>
          <p className="text-gray-400">{careerTagline}</p>

          {/* Exam badge */}
          {career?.isExam && state.profile.examDetails && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300">
                Exam: {state.profile.examDetails.examName || career.title}
                {state.profile.examDetails.targetPost && ` · ${state.profile.examDetails.targetPost}`}
              </span>
              {state.profile.examDetails.targetDate && (
                <span className="text-xs text-blue-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {state.profile.examDetails.targetDate}
                </span>
              )}
            </div>
          )}

          {/* Custom goal badge */}
          {isCustom && (
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Custom Goal</span>
            </div>
          )}
        </div>

        {/* Progress overview */}
        <div className="bg-gradient-to-br from-navy-800/80 to-navy-900/80 border border-navy-700/50 rounded-2xl p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 className="font-display text-lg font-semibold mb-1">Overall Progress</h2>
              <p className="text-sm text-gray-400">
                {completedCount} of {state.milestones.length} phases complete
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-display font-bold text-teal-400">{progress}%</div>
              <div className="text-xs text-gray-400">complete</div>
            </div>
          </div>

          <div className="relative h-4 rounded-full bg-navy-900 overflow-hidden mb-4">
            <div
              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            >
              {progress > 0 && progress < 100 && (
                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/30 blur-sm animate-pulse" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-700/50 flex items-center justify-center">
                <Clock className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">{adjustedWeeks} weeks</div>
                <div className="text-xs text-gray-500">est. at {state.profile.weeklyHours}h/wk</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-700/50 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">{totalSkills || '—'} skills</div>
                <div className="text-xs text-gray-500">to master</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-700/50 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">{state.milestones.reduce((s, m) => s + m.resources.length, 0)} resources</div>
                <div className="text-xs text-gray-500">curated</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-navy-700/50 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
              </div>
              <div>
                <div className="text-sm font-semibold">{state.milestones.filter(m => m.completed).length}/{state.milestones.length}</div>
                <div className="text-xs text-gray-500">phases done</div>
              </div>
            </div>
          </div>
        </div>

        {/* Regenerate button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={generatePlan}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Regenerate Plan
          </button>
          <button
            onClick={() => onNavigate('gap-finder')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all"
          >
            Update Skills
          </button>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-navy-700/50" />

          <div className="space-y-6">
            {state.milestones.map((milestone, idx) => {
              const isCompleted = milestone.completed;
              const isLocked = idx > 0 && !state.milestones[idx - 1].completed && !isCompleted;
              const canToggle = !isLocked;

              return (
                <div key={milestone.id} className="relative pl-16 animate-fadeInUp" style={{ animationDelay: `${idx * 0.1}s` }}>
                  {/* Node */}
                  <div
                    className={`absolute left-0 top-2 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-teal-500 border-teal-400 shadow-lg shadow-teal-500/30'
                        : isLocked
                        ? 'bg-navy-800 border-navy-600'
                        : 'bg-navy-800 border-navy-600 hover:border-teal-500/50'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-navy-950" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 text-gray-600" />
                    ) : (
                      <span className="text-sm font-display font-bold text-teal-400">{milestone.phase}</span>
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`rounded-2xl border p-6 transition-all ${
                      isCompleted
                        ? 'bg-teal-500/5 border-teal-500/30'
                        : isLocked
                        ? 'bg-navy-800/30 border-navy-700/30 opacity-60'
                        : 'bg-navy-800/50 border-navy-700/50 hover:border-teal-500/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${phaseColors[idx % phaseColors.length]}`} />
                          <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                            Phase {milestone.phase} · {milestone.estimatedWeeks} weeks
                          </span>
                        </div>
                        <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
                      </div>
                      {canToggle && (
                        <button
                          onClick={() => toggleMilestone(milestone.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isCompleted
                              ? 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30'
                              : 'bg-white/5 text-gray-300 hover:bg-teal-500/10 hover:text-teal-300 border border-white/10'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isCompleted ? 'Completed' : 'Mark Done'}
                        </button>
                      )}
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed mb-4">{milestone.description}</p>

                    {/* Skills in this phase */}
                    {milestone.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {milestone.skills.map(skill => {
                          const has = state.profile.currentSkills.includes(skill);
                          return (
                            <span
                              key={skill}
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${
                                has
                                  ? 'bg-teal-500/10 border border-teal-500/20 text-teal-300'
                                  : 'bg-navy-900/50 border border-navy-700/30 text-gray-400'
                              }`}
                            >
                              {has && <CheckCircle2 className="w-3 h-3" />}
                              {skill}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Resources */}
                    <div className="border-t border-navy-700/30 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">Recommended Resources</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {milestone.resources.map(resource => {
                          const isFree = resource.type === 'free' || resource.type === 'freemium';
                          const isWithinBudget = state.profile.budget > 0 || isFree;
                          if (!isWithinBudget) return null;
                          return (
                            <a
                              key={resource.name}
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-navy-900/50 border border-navy-700/30 hover:border-teal-500/30 transition-all"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span className={`text-xs px-1.5 py-0.5 rounded ${
                                  isFree ? 'bg-teal-500/10 text-teal-400' : 'bg-orange-500/10 text-orange-400'
                                }`}>
                                  {isFree ? (resource.type === 'freemium' ? 'Freemium' : 'Free') : 'Paid'}
                                </span>
                                <span className="text-sm text-gray-300 truncate group-hover:text-teal-300 transition-colors">
                                  {resource.name}
                                </span>
                              </div>
                              <ExternalLink className="w-3.5 h-3.5 text-gray-600 group-hover:text-teal-400 flex-shrink-0 transition-colors" />
                            </a>
                          );
                        })}
                      </div>
                      {state.profile.budget === 0 && milestone.resources.some(r => r.type !== 'free') && (
                        <p className="text-xs text-gray-500 mt-2 italic">
                          Some paid resources hidden (budget: $0). Increase budget in Gap Finder to see them.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion CTA */}
        {progress === 100 && (
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-teal-500/10 to-teal-600/5 border border-teal-500/30 text-center animate-fadeInUp">
            <Sparkles className="w-10 h-10 text-teal-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">Roadmap Complete!</h2>
            <p className="text-gray-400 mb-6">You've completed all phases. Now put your skills to work — explore opportunities to apply what you've learned.</p>
            <button
              onClick={() => onNavigate('opportunities')}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:scale-[1.02] transition-all"
            >
              Explore Opportunities
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
