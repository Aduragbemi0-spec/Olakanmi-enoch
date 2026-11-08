import React, { useState } from 'react';
import { TOOLS_CATALOG, CatalogToolDetail } from '../data/toolsCatalog';
import { X, Search, ExternalLink, Check, Smartphone, Zap, ShieldCheck } from 'lucide-react';

interface ToolsCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ToolsCatalogModal: React.FC<ToolsCatalogModalProps> = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'made_in_ng' | 'whatsapp' | 'free' | 'data_light'>('all');

  if (!isOpen) return null;

  const filteredTools = TOOLS_CATALOG.filter(tool => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.tagline.toLowerCase().includes(search.toLowerCase()) ||
      tool.category.toLowerCase().includes(search.toLowerCase()) ||
      tool.bestFor.toLowerCase().includes(search.toLowerCase());

    if (!matchesSearch) return false;

    if (filter === 'made_in_ng') return tool.isMadeInNigeria;
    if (filter === 'whatsapp') return tool.whatsappIntegrated;
    if (filter === 'free') return tool.pricingTag.toLowerCase().includes('free');
    if (filter === 'data_light') return tool.dataUsageTag === 'Very Light' || tool.dataUsageTag === 'Light';

    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
              Ecosystem Index
            </div>
            <h2 className="text-xl font-bold mt-0.5">
              Nigerian MSME Tech & AI Tool Directory
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Curated tools tested for Nigerian business realities: low data consumption, Naira payments, and WhatsApp compatibility.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search tools (e.g. ManyChat, Paystack, WhatsApp, receipts)..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto p-1 bg-slate-200/60 rounded-lg">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Tools ({TOOLS_CATALOG.length})
            </button>
            <button
              onClick={() => setFilter('made_in_ng')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'made_in_ng' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Made in Nigeria
            </button>
            <button
              onClick={() => setFilter('whatsapp')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'whatsapp' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              WhatsApp Ready
            </button>
            <button
              onClick={() => setFilter('free')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'free' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Free Plans
            </button>
            <button
              onClick={() => setFilter('data_light')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                filter === 'data_light' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Light on Data
            </button>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTools.map(tool => (
            <div
              key={tool.id}
              className="p-5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      {tool.name}
                    </h3>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {tool.tagline}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {tool.stageTag}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  {tool.shortDescription}
                </p>

                <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700">
                  <span className="font-semibold text-slate-900">Best for: </span>
                  <span>{tool.bestFor}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <span className="font-medium text-slate-700">{tool.pricingTag}</span>
                  <span>·</span>
                  <span>{tool.dataUsageTag} data</span>
                </div>

                <a
                  href={tool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-slate-900 text-white font-semibold rounded-md hover:bg-slate-800 transition-colors flex items-center gap-1"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
