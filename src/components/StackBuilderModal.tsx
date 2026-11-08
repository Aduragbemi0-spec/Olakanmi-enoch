import React, { useState } from 'react';
import { StackFunnelStep } from '../types';
import { TOOLS_CATALOG, CatalogToolDetail } from '../data/toolsCatalog';
import { X, ArrowRight, Check, Sparkles, RefreshCw } from 'lucide-react';

interface StackBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStack: StackFunnelStep[];
  onUpdateStack: (newStack: StackFunnelStep[]) => void;
}

export const StackBuilderModal: React.FC<StackBuilderModalProps> = ({
  isOpen,
  onClose,
  currentStack,
  onUpdateStack,
}) => {
  const [stack, setStack] = useState<StackFunnelStep[]>(currentStack);
  const [selectedStageIndex, setSelectedStageIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const stageOptions: Record<string, CatalogToolDetail[]> = {
    ATTRACT: TOOLS_CATALOG.filter(t => t.stageTag === 'ATTRACT'),
    SERVE: TOOLS_CATALOG.filter(t => t.stageTag === 'SERVE' || t.category === 'Customer service'),
    'GET PAID': TOOLS_CATALOG.filter(t => t.stageTag === 'GET PAID' || t.category === 'Finance'),
  };

  const handleSwapTool = (tool: CatalogToolDetail) => {
    if (selectedStageIndex === null) return;

    setStack(prev => {
      const copy = [...prev];
      copy[selectedStageIndex] = {
        ...copy[selectedStageIndex],
        title: tool.name,
        subtitle: tool.category,
        subCategory: tool.category,
        toolUrl: tool.websiteUrl,
      };
      return copy;
    });

    setSelectedStageIndex(null);
  };

  const handleSave = () => {
    onUpdateStack(stack);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
              Pipeline Architect
            </div>
            <h2 className="text-xl font-bold mt-0.5">
              Customize Your Starter Stack
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Click any stage in the customer-to-cash funnel to swap tools from the Nigerian MSME catalog.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Funnel Pipeline Visualizer */}
        <div className="p-6 sm:p-8 bg-slate-50 border-b border-slate-200">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
            Current 5-Stage Customer Journey:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {stack.map((step, idx) => {
              const isEditable = step.stage === 'ATTRACT' || step.stage === 'SERVE' || step.stage === 'GET PAID';
              const isSelected = selectedStageIndex === idx;

              return (
                <div
                  key={idx}
                  onClick={() => isEditable && setSelectedStageIndex(isSelected ? null : idx)}
                  className={`flex flex-col border rounded-xl overflow-hidden transition-all text-center relative ${
                    isEditable ? 'cursor-pointer hover:shadow-md' : 'opacity-85'
                  } ${
                    isSelected 
                      ? 'border-emerald-600 ring-2 ring-emerald-600 bg-white' 
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className={`py-1.5 px-2 text-[10px] font-mono font-bold tracking-wider uppercase border-b ${
                    isSelected ? 'bg-emerald-800 text-white border-emerald-900' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {step.stage}
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-center">
                    <div className="text-sm font-bold text-slate-900 leading-tight">
                      {step.title}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      {step.subtitle}
                    </div>
                    {isEditable && (
                      <div className="mt-2 text-[10px] font-semibold text-emerald-700 flex items-center justify-center gap-1">
                        <RefreshCw className="w-2.5 h-2.5" />
                        <span>Swap</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Swap Drawer */}
        <div className="p-6 sm:p-8">
          {selectedStageIndex !== null && (
            <div className="mb-6 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-bold text-emerald-900 uppercase font-mono">
                  Select replacement tool for stage: {stack[selectedStageIndex].stage}
                </div>
                <button
                  onClick={() => setSelectedStageIndex(null)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(stageOptions[stack[selectedStageIndex].stage] || []).map(tool => (
                  <div
                    key={tool.id}
                    onClick={() => handleSwapTool(tool)}
                    className="p-3 bg-white rounded-lg border border-slate-200 hover:border-emerald-500 cursor-pointer transition-all hover:shadow-xs flex items-start justify-between"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-900">{tool.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{tool.tagline}</div>
                      <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
                        <span>{tool.pricingTag}</span>
                        {tool.isMadeInNigeria && (
                          <span className="text-emerald-700 font-semibold">· Made in Nigeria</span>
                        )}
                      </div>
                    </div>
                    <div className="p-1 rounded bg-slate-50 text-emerald-700">
                      <Check className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Value Summary */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold font-mono uppercase text-slate-700">
                Estimated Monthly Stack Cost:
              </div>
              <div className="text-xl font-extrabold text-slate-900 mt-0.5">
                ₦0 / month (Free Plans)
              </div>
              <p className="text-xs text-slate-500">
                All chosen tools include generous free plans without monthly USD billing.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
              >
                Apply to My Scorecard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
