import React, { useState } from 'react';
import { ScorecardResult } from '../types';
import { X, Send, Bot, Sparkles, Loader2, ArrowRight } from 'lucide-react';

interface AiCoachModalProps {
  isOpen: boolean;
  onClose: () => void;
  scorecard: ScorecardResult;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AiCoachModal: React.FC<AiCoachModalProps> = ({
  isOpen,
  onClose,
  scorecard,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I am Coach Femi, your MyStack Naija tech advisor.
I have reviewed your scorecard for **${scorecard.answers.businessName || 'your business'}** (Score: **${scorecard.overallScore}/100**, biggest gap: **${scorecard.gaps.find(g => g.isFocus)?.category || 'Customer service'}**).

You fit ask me anything in English or authentic Nigerian Pidgin:
- How to set up ManyChat without knowing code
- How to stop fake bank alert scams using Paystack
- How to work smoothly when NEPA take light or network dey misbehave!

Wetin you want make we talk about?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user', content: query }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: {
            businessName: scorecard.answers.businessName,
            businessType: scorecard.answers.businessType,
            teamSize: scorecard.answers.teamSize,
            overallScore: scorecard.overallScore,
            focusArea: scorecard.answers.focusArea,
            topTools: scorecard.topTools.map(t => t.name),
            monthlyBudget: scorecard.answers.monthlyBudget,
            dataConstraint: scorecard.answers.dataConstraint,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply || 'No response.' }]);
    } catch (err) {
      console.error('Coach error:', err);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: `No wahala! Here is quick advice for your store:
1. **To set up ManyChat**: Open manychat.com on your phone or laptop. Link your Instagram business page, go to Automations, and set a trigger for comments like "PRICE".
2. **For Payments**: Log into paystack.com, create a Payment Page for your best-selling product, and paste that link whenever someone asks to pay.
3. Both tools have free plans and will save you hours without eating your data!`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    'How do I set up ManyChat to auto-send prices on Instagram?',
    'Explain Paystack payment links in Nigerian Pidgin',
    'How can I schedule posts so I do not waste mobile data daily?',
    'What should I do on Day 1 of my 7-day action plan?',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-emerald-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Coach Femi</h2>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  Stack Naija AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Specialized in Nigerian MSMEs, WhatsApp commerce & low-data tech
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-slate-50">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                <span>Coach Femi is thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-6 py-2.5 bg-white border-t border-slate-100 overflow-x-auto flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-bold text-slate-400 shrink-0 uppercase tracking-wider">
            Quick Ask:
          </span>
          {samplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask anything in English or Pidgin (e.g. How do I start ManyChat?)..."
              className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-emerald-800 text-white rounded-xl hover:bg-emerald-900 disabled:opacity-50 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
