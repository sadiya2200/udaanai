import { Rocket, Github, Heart } from 'lucide-react';
import type { Page } from './Navbar';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-navy-950 border-t border-navy-700/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-navy-950" />
              </div>
              <span className="font-display text-lg font-bold text-white">
                UDAAN<span className="text-teal-400"> AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Your Dream Has a Roadmap. Bridging the gap between ambition and opportunity for students everywhere.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Navigate</h4>
            <div className="space-y-2">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'Opportunity Gap Finder', page: 'gap-finder' as Page },
                { label: 'Roadmap Simulator', page: 'roadmap' as Page },
                { label: 'Opportunities', page: 'opportunities' as Page },
                { label: 'Dashboard', page: 'dashboard' as Page },
              ].map(link => (
                <button
                  key={link.label}
                  onClick={() => onNavigate(link.page)}
                  className="block text-sm text-gray-400 hover:text-teal-400 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">About</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              UDAAN AI uses rule-based matching to help students discover career paths, identify skill gaps, and find real opportunities.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
              <span>Built with</span>
              <Heart className="w-3 h-3 text-teal-400" />
              <span>for hackathon education</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-navy-700/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © 2026 UDAAN AI. All opportunity data is labeled as demo and should be verified at source.
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <span className="text-xs">Rule-based matching — no AI service required</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
