/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AssessmentAnswers, ScorecardResult, StackFunnelStep } from './types';
import { SAMPLE_PROTOTYPE_ANSWERS, PRESET_OPTIONS } from './data/sampleData';
import { calculateScorecard } from './engine/scorecardEngine';
import { ScorecardView } from './components/ScorecardView';
import { AssessmentModal } from './components/AssessmentModal';
import { StackBuilderModal } from './components/StackBuilderModal';
import { ToolsCatalogModal } from './components/ToolsCatalogModal';
import { AiCoachModal } from './components/AiCoachModal';
import { 
  Sparkles, 
  RotateCcw, 
  Layers, 
  BookOpen, 
  Bot, 
  ClipboardCheck,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [answers, setAnswers] = useState<AssessmentAnswers>(SAMPLE_PROTOTYPE_ANSWERS);
  const [customStack, setCustomStack] = useState<StackFunnelStep[] | null>(null);

  // Modals state
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isStackBuilderOpen, setIsStackBuilderOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [isAiCoachOpen, setIsAiCoachOpen] = useState(false);

  // Preset selector
  const [selectedPresetId, setSelectedPresetId] = useState<string>('prototype_sample');

  // Compute scorecard
  const baseScorecard = calculateScorecard(answers);
  const scorecard: ScorecardResult = {
    ...baseScorecard,
    starterStack: customStack || baseScorecard.starterStack,
  };

  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const found = PRESET_OPTIONS.find(p => p.id === presetId);
    if (found) {
      setAnswers(found.answers);
      setCustomStack(null);
    }
  };

  const handleAssessmentComplete = (newAnswers: AssessmentAnswers) => {
    setAnswers(newAnswers);
    setCustomStack(null);
    setSelectedPresetId('custom');
  };

  const handleUpdateStack = (newStack: StackFunnelStep[]) => {
    setCustomStack(newStack);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Bar Contract (§2 Frontend Design Constitution) */}
      <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark in display face */}
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              handleSelectPreset('prototype_sample');
            }}
            className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="text-emerald-800 text-2xl leading-none font-black">=</span>
            <span>MyStack Naija</span>
          </a>

          {/* Zone 2: 4-5 concise single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-600">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-slate-900 font-semibold hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
            >
              Scorecard
            </button>
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
            >
              10-Question Test
            </button>
            <button
              onClick={() => setIsStackBuilderOpen(true)}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
            >
              Starter Stack Funnel
            </button>
            <button
              onClick={() => setIsCatalogOpen(true)}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
            >
              Tools Directory
            </button>
            <button
              onClick={() => setIsAiCoachOpen(true)}
              className="hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-emerald-800 font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Coach</span>
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsAssessmentOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              Take 10-Q Test
            </button>
          </div>
        </div>
      </header>

      {/* Preset Switcher Banner (Hidden in print) */}
      <div className="no-print bg-slate-100/80 border-b border-slate-200 py-2.5 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span className="font-bold text-slate-800 font-mono uppercase tracking-wider">
              Profile:
            </span>
            <span className="truncate max-w-xs sm:max-w-md">
              {scorecard.isSamplePreset 
                ? 'Builders Arena Prototype Sample (Sample Online Store, WhatsApp/IG, ₦10k budget)' 
                : `${scorecard.answers.businessName || 'Custom Business'} (${scorecard.answers.teamSize} team, ${scorecard.answers.focusArea} focus)`}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-slate-400">Presets:</span>
            <select
              value={selectedPresetId}
              onChange={e => handleSelectPreset(e.target.value)}
              className="text-xs bg-white border border-slate-300 rounded-md px-2.5 py-1 text-slate-800 font-medium focus:ring-1 focus:ring-emerald-700 focus:outline-hidden"
            >
              <option value="prototype_sample">Sample Prototype (from PDF)</option>
              <option value="solo_fashion">Lagos Fashion Vendor (Solo)</option>
              <option value="food_kitchen">Abuja Food Delivery & Kitchen</option>
              <option value="consulting_freelance">Solo Digital Freelancer</option>
              {selectedPresetId === 'custom' && (
                <option value="custom">Custom Questionnaire Answers</option>
              )}
            </select>

            <button
              onClick={() => handleSelectPreset('prototype_sample')}
              title="Reset to PDF Prototype"
              className="p-1 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Scorecard View */}
      <main className="flex-1">
        <ScorecardView
          scorecard={scorecard}
          onOpenAssessment={() => setIsAssessmentOpen(true)}
          onOpenStackBuilder={() => setIsStackBuilderOpen(true)}
          onOpenAiCoach={() => setIsAiCoachOpen(true)}
          onOpenCatalog={() => setIsCatalogOpen(true)}
        />
      </main>

      {/* Footer */}
      <footer className="no-print bg-white border-t border-slate-200 py-8 px-4 sm:px-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900">= MyStack Naija</span>
            <span>·</span>
            <span>Builders Arena 2026</span>
            <span>·</span>
            <span className="text-emerald-800 font-medium">Build for Nigeria</span>
          </div>
          <div className="text-slate-400 text-[11px]">
            Tool tags are hand-set drafts; comparisons are estimates. Dual-language English & Nigerian Pidgin.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AssessmentModal
        isOpen={isAssessmentOpen}
        onClose={() => setIsAssessmentOpen(false)}
        currentAnswers={answers}
        onComplete={handleAssessmentComplete}
      />

      <StackBuilderModal
        isOpen={isStackBuilderOpen}
        onClose={() => setIsStackBuilderOpen(false)}
        currentStack={scorecard.starterStack}
        onUpdateStack={handleUpdateStack}
      />

      <ToolsCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
      />

      <AiCoachModal
        isOpen={isAiCoachOpen}
        onClose={() => setIsAiCoachOpen(false)}
        scorecard={scorecard}
      />
    </div>
  );
}
