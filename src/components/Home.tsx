import { ArrowRight, Compass, Map, LayoutDashboard, Code2, PenTool, BarChart3, ShieldCheck, Layers, Sparkles, Target, TrendingUp, CheckCircle2, Landmark, Stethoscope, GraduationCap, Briefcase, Palette, Search } from 'lucide-react';
import type { Page } from './Navbar';
import { careers, careerCategories } from '@/data/careers';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const categoryIcons: Record<string, typeof Code2> = {
  Code2, PenTool, BarChart3, ShieldCheck, Layers, Landmark, Stethoscope,
  GraduationCap, Briefcase, Palette, Compass,
};

export function Home({ onNavigate }: HomeProps) {
  const featuredCareers = careers.slice(0, 9);
  const careerCount = careers.length;
  const categoryCount = careerCategories.length;

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-teal-400/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-navy-600/20 blur-3xl" />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 mb-8 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-teal-300 font-medium">Your Dream Has a Roadmap</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fadeInUp">
              Your Dream Has a
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-300 mt-2">
                Roadmap.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              Find the skills you're missing, get a personalized learning plan, and discover scholarships, courses, and internships — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => onNavigate('gap-finder')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all"
              >
                Build My Roadmap
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => onNavigate('opportunities')}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 hover:border-white/20 transition-all"
              >
                Explore Opportunities
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 max-w-3xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Target, value: `${careerCount}+`, label: 'Career Paths & Exams' },
              { icon: TrendingUp, value: '15+', label: 'Opportunities' },
              { icon: CheckCircle2, value: `${categoryCount}`, label: 'Categories' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-3 px-5 py-4 rounded-xl bg-navy-800/50 border border-navy-700/50 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              How UDAAN AI Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Three powerful tools to bridge the gap between where you are and where you want to be.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Compass,
                title: 'Opportunity Gap Finder',
                description: 'Tell us your dream career and current skills. We identify exactly what you\'re missing and what to learn next.',
                page: 'gap-finder' as Page,
                color: 'from-teal-500 to-teal-600',
              },
              {
                icon: Map,
                title: 'Dream-to-Plan Simulator',
                description: 'Get a visual roadmap with milestones, estimated effort, recommended resources, and progress tracking.',
                page: 'roadmap' as Page,
                color: 'from-teal-400 to-teal-500',
              },
              {
                icon: LayoutDashboard,
                title: 'Opportunity Discovery',
                description: 'Search and filter scholarships, courses, internships, and hackathons matched to your career path.',
                page: 'opportunities' as Page,
                color: 'from-teal-300 to-teal-400',
              },
            ].map(feature => (
              <button
                key={feature.title}
                onClick={() => onNavigate(feature.page)}
                className="group text-left p-6 rounded-2xl bg-navy-800/50 border border-navy-700/50 hover:border-teal-500/30 hover:bg-navy-800/80 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-navy-950" />
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{feature.description}</p>
                <span className="inline-flex items-center gap-1 text-sm text-teal-400 font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-navy-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Explore by Category
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse {careerCount}+ career paths and exam preparation tracks across {categoryCount} categories — or enter your own custom goal.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {careerCategories.map(cat => {
              const Icon = categoryIcons[cat.icon] ?? Compass;
              const count = careers.filter(c => c.category === cat.name).length;
              return (
                <button
                  key={cat.name}
                  onClick={() => onNavigate('gap-finder')}
                  className="group text-left p-5 rounded-2xl bg-navy-800/60 border border-navy-700/50 hover:border-teal-500/40 transition-all hover:scale-[1.02]"
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5 text-navy-950" />
                  </div>
                  <h3 className="font-display text-sm font-semibold text-white mb-1">{cat.name}</h3>
                  <p className="text-xs text-gray-400">{count} paths</p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Careers Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              Popular Career Paths
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection from our catalog. Use the Gap Finder to search all {careerCount}+ options or enter your own.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredCareers.map(career => {
              const Icon = categoryIcons[career.icon] ?? Code2;
              return (
                <button
                  key={career.id}
                  onClick={() => onNavigate('gap-finder')}
                  className="group text-left p-6 rounded-2xl bg-navy-800/60 border border-navy-700/50 hover:border-teal-500/40 transition-all hover:scale-[1.02]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-navy-700/50 border border-navy-600/50 flex items-center justify-center flex-shrink-0 group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-all">
                      <Icon className="w-6 h-6 text-teal-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-lg font-semibold text-white mb-1">{career.title}</h3>
                      <p className="text-sm text-gray-400 mb-3">{career.tagline}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-navy-700/50 text-xs text-gray-300">{career.category}</span>
                        <span className="px-2.5 py-1 rounded-md bg-navy-700/50 text-xs text-gray-300">{career.difficulty}</span>
                        {career.isExam && (
                          <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-xs text-blue-300">Exam</span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('gap-finder')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300 font-medium hover:bg-teal-500/20 transition-all"
            >
              <Search className="w-4 h-4" />
              Browse All {careerCount}+ Careers
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-navy-800/60 to-navy-900/60 border border-navy-700/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-teal-500/5 blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to find your path?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Take the first step. Answer a few questions and get your personalized roadmap in minutes.
              </p>
              <button
                onClick={() => onNavigate('gap-finder')}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all"
              >
                Start Now — It's Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
