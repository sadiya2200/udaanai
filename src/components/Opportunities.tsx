import { useState, useMemo } from 'react';
import { Search, Bookmark, BookmarkCheck, ExternalLink, Sparkles, GraduationCap, BookOpen, Briefcase, Zap, Trophy, Lightbulb, Filter, X, AlertCircle, Check } from 'lucide-react';
import type { Page } from './Navbar';
import { opportunities, opportunityTypes } from '@/data/opportunities';
import { useApp } from '@/context/AppContext';
import type { Opportunity } from '@/types';

interface OpportunitiesProps {
  onNavigate: (page: Page) => void;
}

const typeIcons: Record<string, typeof Sparkles> = {
  Sparkles, GraduationCap, BookOpen, Briefcase, Zap, Trophy, Lightbulb,
};

const typeColors: Record<string, string> = {
  scholarship: 'from-amber-400 to-amber-500',
  course: 'from-teal-400 to-teal-500',
  internship: 'from-cyan-400 to-teal-400',
  hackathon: 'from-orange-400 to-orange-500',
  competition: 'from-rose-400 to-rose-500',
  project: 'from-emerald-400 to-emerald-500',
};

export function Opportunities({ onNavigate }: OpportunitiesProps) {
  const { state, toggleBookmark, isBookmarked } = useApp();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState<Opportunity['type'] | 'all'>('all');
  const [costFilter, setCostFilter] = useState<'all' | 'Free' | 'Paid' | 'Freemium'>('all');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return opportunities.filter(opp => {
      if (activeType !== 'all' && opp.type !== activeType) return false;
      if (costFilter !== 'all' && opp.cost !== costFilter) return false;
      if (showBookmarkedOnly && !isBookmarked(opp.id)) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          opp.title.toLowerCase().includes(q) ||
          opp.description.toLowerCase().includes(q) ||
          opp.provider.toLowerCase().includes(q) ||
          opp.tags.some(t => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, activeType, costFilter, showBookmarkedOnly, isBookmarked]);

  const bookmarkCount = state.bookmarks.length;

  const clearFilters = () => {
    setSearch('');
    setActiveType('all');
    setCostFilter('all');
    setShowBookmarkedOnly(false);
  };

  const hasActiveFilters = search || activeType !== 'all' || costFilter !== 'all' || showBookmarkedOnly;

  return (
    <div className="min-h-screen bg-navy-950 text-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-teal-400" />
            <span className="text-sm text-teal-300 font-medium">Opportunity Discovery</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">Find Your Next Opportunity</h1>
          <p className="text-gray-400 max-w-2xl">
            Search and filter scholarships, courses, internships, hackathons, competitions, and project ideas matched to your career path.
          </p>
        </div>

        {/* Demo data notice */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-6">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-sm text-amber-200">
            All opportunities below are labeled as <strong>demo data</strong>. Always verify details, deadlines, and eligibility at the source link before applying.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, provider, or keyword..."
            className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-navy-800/50 border border-navy-700/50 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
        </div>

        {/* Type filters */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {opportunityTypes.map(type => {
            const Icon = typeIcons[type.icon] ?? Sparkles;
            return (
              <button
                key={type.value}
                onClick={() => setActiveType(type.value)}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeType === type.value
                    ? 'bg-teal-500/15 border border-teal-500/40 text-teal-300'
                    : 'bg-navy-800/50 border border-navy-700/50 text-gray-400 hover:border-navy-600/50 hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {type.label}
              </button>
            );
          })}
        </div>

        {/* Additional filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <select
              value={costFilter}
              onChange={e => setCostFilter(e.target.value as typeof costFilter)}
              className="px-3 py-2 rounded-lg bg-navy-800/50 border border-navy-700/50 text-sm text-gray-300 focus:outline-none focus:border-teal-500/50 cursor-pointer"
            >
              <option value="all">All Costs</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
            </select>
          </div>

          <button
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
              showBookmarkedOnly
                ? 'bg-teal-500/15 border border-teal-500/40 text-teal-300'
                : 'bg-navy-800/50 border border-navy-700/50 text-gray-400 hover:border-navy-600/50'
            }`}
          >
            {showBookmarkedOnly ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            Bookmarked ({bookmarkCount})
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-300 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}

          <div className="ml-auto text-sm text-gray-500">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(opp => {
              const Icon = typeIcons[opportunityTypes.find(t => t.value === opp.type)?.icon ?? 'Sparkles'] ?? Sparkles;
              const bookmarked = isBookmarked(opp.id);
              return (
                <div
                  key={opp.id}
                  className="group relative flex flex-col rounded-2xl bg-navy-800/50 border border-navy-700/50 hover:border-teal-500/30 transition-all overflow-hidden animate-fadeInUp"
                >
                  {/* Top accent line */}
                  <div className={`h-1 bg-gradient-to-r ${typeColors[opp.type] ?? 'from-teal-400 to-teal-500'}`} />

                  <div className="p-5 flex-1 flex flex-col">
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${typeColors[opp.type] ?? 'from-teal-400 to-teal-500'} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-navy-950" />
                        </div>
                        <div>
                          <span className="text-xs text-gray-500 uppercase tracking-wider">{opp.type}</span>
                          <div className="text-xs text-gray-400">{opp.provider}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleBookmark(opp.id)}
                        className={`p-2 rounded-lg transition-all ${
                          bookmarked
                            ? 'text-teal-400 bg-teal-500/10'
                            : 'text-gray-500 hover:text-teal-400 hover:bg-white/5'
                        }`}
                        aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark opportunity'}
                      >
                        {bookmarked ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
                      </button>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-base font-semibold mb-2 leading-snug">{opp.title}</h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">{opp.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {opp.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 rounded-md bg-navy-700/50 text-xs text-gray-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-3 border-t border-navy-700/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`px-2 py-0.5 rounded font-medium ${
                          opp.cost === 'Free' ? 'bg-teal-500/10 text-teal-400' :
                          opp.cost === 'Freemium' ? 'bg-amber-500/10 text-amber-400' :
                          'bg-orange-500/10 text-orange-400'
                        }`}>
                          {opp.cost}
                        </span>
                        {opp.costDetail && (
                          <span className="text-gray-500">{opp.costDetail}</span>
                        )}
                      </div>

                      {/* Skills match */}
                      {opp.skillsMatch.length > 0 && (
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <Check className="w-3 h-3 text-teal-400 flex-shrink-0" />
                          {opp.skillsMatch.slice(0, 2).map(skill => (
                            <span key={skill} className="text-xs text-gray-500">{skill}</span>
                          ))}
                          {opp.skillsMatch.length > 2 && (
                            <span className="text-xs text-gray-600">+{opp.skillsMatch.length - 2} more</span>
                          )}
                        </div>
                      )}

                      <a
                        href={opp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-gray-300 hover:bg-teal-500/10 hover:text-teal-300 hover:border-teal-500/30 transition-all"
                      >
                        View Source
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {opp.isDemo && (
                      <div className="mt-2 text-center text-xs text-gray-600 italic">Demo data — verify at source</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-navy-800/50 border border-navy-700/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="font-display text-lg font-semibold text-gray-300 mb-2">No opportunities found</h3>
            <p className="text-sm text-gray-500 mb-4">
              {showBookmarkedOnly
                ? 'You haven\'t bookmarked any opportunities yet.'
                : 'Try adjusting your search or filters.'}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-sm text-teal-300 hover:bg-teal-500/20 transition-all"
              >
                <Filter className="w-4 h-4" />
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
