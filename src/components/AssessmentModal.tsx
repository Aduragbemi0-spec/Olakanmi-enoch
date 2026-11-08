import React, { useState } from 'react';
import { 
  AssessmentAnswers, 
  BusinessType, 
  TeamSize, 
  SalesChannel, 
  PaymentMethod, 
  MonthlyBudget, 
  DataConstraint, 
  DailyTimeSink, 
  FocusArea, 
  AiExperience, 
  PrimaryDevice 
} from '../types';
import { SAMPLE_PROTOTYPE_ANSWERS, PRESET_OPTIONS } from '../data/sampleData';
import { 
  X, 
  Sparkles, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw,
  Store,
  Users,
  MessageCircle,
  CreditCard,
  Wallet,
  Wifi,
  Clock,
  Target,
  Bot,
  Smartphone
} from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAnswers: AssessmentAnswers;
  onComplete: (answers: AssessmentAnswers) => void;
}

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  isOpen,
  onClose,
  currentAnswers,
  onComplete,
}) => {
  const [answers, setAnswers] = useState<AssessmentAnswers>(currentAnswers);
  const [step, setStep] = useState<number>(1);

  if (!isOpen) return null;

  const handleChannelToggle = (ch: SalesChannel) => {
    setAnswers(prev => {
      const exists = prev.salesChannels.includes(ch);
      const next = exists 
        ? prev.salesChannels.filter(c => c !== ch)
        : [...prev.salesChannels, ch];
      return { ...prev, salesChannels: next.length > 0 ? next : [ch] };
    });
  };

  const handlePaymentToggle = (pm: PaymentMethod) => {
    setAnswers(prev => {
      const exists = prev.paymentMethods.includes(pm);
      const next = exists 
        ? prev.paymentMethods.filter(p => p !== pm)
        : [...prev.paymentMethods, pm];
      return { ...prev, paymentMethods: next.length > 0 ? next : [pm] };
    });
  };

  const handleLoadPreset = (presetAnswers: AssessmentAnswers) => {
    setAnswers(presetAnswers);
    onComplete(presetAnswers);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(answers);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">
              MyStack Naija Diagnostic
            </div>
            <h2 className="text-xl font-bold mt-0.5">
              10-Question AI & Tech Readiness Check
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets Bar */}
        <div className="bg-emerald-900/10 border-b border-emerald-800/10 p-3 px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-slate-600 font-medium">
            Want to see the sample prototype result?
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLoadPreset(SAMPLE_PROTOTYPE_ANSWERS)}
              className="px-2.5 py-1 bg-emerald-800 text-white font-medium rounded-md hover:bg-emerald-900 transition-colors"
            >
              Load PDF Prototype Sample
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5">
          <div 
            className="bg-emerald-700 h-full transition-all duration-300"
            style={{ width: `${(step / 10) * 100}%` }}
          />
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          {/* Business Name */}
          <div className="mb-6 pb-6 border-b border-slate-100">
            <label className="block text-xs font-mono font-bold tracking-wider text-slate-500 uppercase mb-2">
              Business Name (Optional)
            </label>
            <input
              type="text"
              value={answers.businessName || ''}
              onChange={e => setAnswers({ ...answers, businessName: e.target.value })}
              placeholder="e.g. Ade & Sons Stores, Lagos Luxe Thrift"
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Question 1: Business Type */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Store className="w-4 h-4" />
                <span>Question 1 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                What type of business are you running in Nigeria?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { value: 'online_store', label: 'Online Store / Social Commerce', desc: 'Selling on Instagram, WhatsApp, TikTok' },
                  { value: 'fashion_retail', label: 'Fashion, Thrift & Cloth Retail', desc: 'Apparel, shoes, jewelry, fabrics' },
                  { value: 'food_grocery', label: 'Food, Kitchen & Groceries', desc: 'Meals, provisions, drinks delivery' },
                  { value: 'services_freelance', label: 'Services & Freelance Agency', desc: 'Design, consulting, repairs, photography' },
                  { value: 'beauty_wellness', label: 'Beauty, Skincare & Wellness', desc: 'Hair, cosmetics, perfumes, spa' },
                  { value: 'general_trade', label: 'General Wholesale & Retail Merchant', desc: 'Electronics, home goods, hardware' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, businessType: item.value as BusinessType })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.businessType === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Team Size */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Question 2 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                How many people are on your team?
              </h3>
              <div className="grid grid-cols-1 gap-3 pt-2">
                {[
                  { value: 'solo', label: 'Solo or 1–2 people', desc: 'Just you, or you and one assistant/partner.' },
                  { value: 'small', label: '3 to 10 people (Sample Prototype Match)', desc: 'Small active team managing sales, dispatch, and customer chats.' },
                  { value: 'medium', label: '11 to 25 people', desc: 'Growing operation with multiple departments or branches.' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, teamSize: item.value as TeamSize })}
                    className={`p-4 text-left rounded-xl border transition-all ${
                      answers.teamSize === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3: Sales Channels */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                <span>Question 3 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Where do customers reach and buy from you today?
              </h3>
              <p className="text-xs text-slate-500">Select all that apply.</p>
              <div className="grid grid-cols-2 gap-2.5 pt-2">
                {[
                  { value: 'whatsapp', label: 'WhatsApp', desc: 'Chats & status' },
                  { value: 'instagram', label: 'Instagram', desc: 'DMs & posts' },
                  { value: 'tiktok', label: 'TikTok', desc: 'Videos & lives' },
                  { value: 'facebook', label: 'Facebook', desc: 'Marketplace & groups' },
                  { value: 'walkin', label: 'Walk-in Shop', desc: 'Physical counter' },
                  { value: 'website', label: 'Own Website', desc: 'E-commerce cart' },
                ].map(item => {
                  const isSelected = answers.salesChannels.includes(item.value as SalesChannel);
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handleChannelToggle(item.value as SalesChannel)}
                      className={`p-3.5 text-left rounded-xl border flex items-start justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question 4: Payment Methods */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <CreditCard className="w-4 h-4" />
                <span>Question 4 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                How do you collect money from customers?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { value: 'transfer_screenshot', label: 'Bank Transfer (Screenshot)', desc: 'Customer sends screenshot to DM, you confirm alert.' },
                  { value: 'payment_link', label: 'Payment Link (Paystack / Flutterwave)', desc: 'Customer clicks link to pay by card, transfer or USSD.' },
                  { value: 'pos_terminal', label: 'POS Terminal (Moniepoint / OPay)', desc: 'Card swipe / transfer on terminal in store.' },
                  { value: 'cash', label: 'Cash on Delivery / Walk-in', desc: 'Physical cash payment.' },
                ].map(item => {
                  const isSelected = answers.paymentMethods.includes(item.value as PaymentMethod);
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => handlePaymentToggle(item.value as PaymentMethod)}
                      className={`p-3.5 text-left rounded-xl border flex items-start justify-between transition-all ${
                        isSelected
                          ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-bold text-slate-900">{item.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Question 5: Monthly Budget */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Wallet className="w-4 h-4" />
                <span>Question 5 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                What is your monthly budget for software & AI tools?
              </h3>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  { value: 'under_10k', label: 'Under ₦10,000 / month (Sample Match)', desc: 'Prefer generous free tiers, pay very little or small Naira plans.' },
                  { value: 'free_only', label: '₦0 Only (Free Forever)', desc: 'Cannot afford any recurring tool subscriptions right now.' },
                  { value: '10k_30k', label: '₦10,000 to ₦30,000 / month', desc: 'Ready to pay for 1 or 2 high-impact software tools in Naira.' },
                  { value: '30k_100k', label: '₦30,000+ / month', desc: 'Budget for professional CRM, automated bots, and paid AI.' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, monthlyBudget: item.value as MonthlyBudget })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.monthlyBudget === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 6: Data Constraint */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Wifi className="w-4 h-4" />
                <span>Question 6 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                How is your internet & mobile data situation?
              </h3>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  { value: 'costly_data', label: 'Works with costly data (Sample Match)', desc: 'Mobile data is expensive; every gigabyte must count. Need data-light tools.' },
                  { value: 'unstable_network', label: 'Frequent network downtime & power cuts', desc: 'Network is erratic, need offline-friendly and mobile-first tools.' },
                  { value: 'good_wifi', label: 'Good Wi-Fi / broadband connection', desc: 'Fast fibre/5G or Starlink, data usage is not a major restriction.' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, dataConstraint: item.value as DataConstraint })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.dataConstraint === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 7: Daily Time Sink */}
          {step === 7 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Clock className="w-4 h-4" />
                <span>Question 7 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                What eats up most of your daily working hours?
              </h3>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  { value: 'customer_inquiries', label: 'Answering repetitive questions & "how much?" in DMs', desc: 'Replying to prices, sizes, availability repeatedly.' },
                  { value: 'content_creation', label: 'Creating flyers, videos, captions, and posts', desc: 'Struggling to figure out what to post and writing captions.' },
                  { value: 'chasing_transfers', label: 'Waiting for bank alerts & checking fake screenshots', desc: 'Reconciling transfers and following up unconfirmed payments.' },
                  { value: 'packing_logistics', label: 'Packing items & arguing with dispatch riders', desc: 'Waybill coordination, rider delays, manual tracking.' },
                  { value: 'inventory_pricing', label: 'Re-counting stock and updating price sheets', desc: 'Manual registers, losing count of items in stock.' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, dailyTimeSink: item.value as DailyTimeSink })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.dailyTimeSink === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 8: Focus Area */}
          {step === 8 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Question 8 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                What area do you want fixed first? (Your Focus)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  { value: 'customer_service', label: 'Customer Service (Sample Focus)', desc: 'Auto-reply to chats, fast pricing delivery' },
                  { value: 'sales', label: 'Sales & Inbound Leads', desc: 'Convert more viewers into paying buyers' },
                  { value: 'content', label: 'Content & Social Media', desc: 'AI captions, flyers, scheduled posts' },
                  { value: 'operations', label: 'Operations & Stock', desc: 'Order tracking, digital receipts, inventory' },
                  { value: 'finance', label: 'Finance & Payments', desc: 'Payment links, automated invoices, instant alerts' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, focusArea: item.value as FocusArea })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.focusArea === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 9: AI Experience */}
          {step === 9 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Bot className="w-4 h-4" />
                <span>Question 9 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                What is your experience using AI tools today?
              </h3>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  { value: 'tried_chatgpt', label: 'Tried ChatGPT / AI before (Sample Match)', desc: 'Have opened ChatGPT or Gemini a few times to test or write small things.' },
                  { value: 'never', label: 'Never used AI before', desc: 'Total beginner, need simple tools with zero technical jargons.' },
                  { value: 'regular_user', label: 'Regular AI user', desc: 'Already use AI daily for prompts, images, or customer responses.' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, aiExperience: item.value as AiExperience })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.aiExperience === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 10: Primary Device */}
          {step === 10 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs font-mono uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Question 10 of 10</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                What device do you mainly use to run your business?
              </h3>
              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {[
                  { value: 'android', label: 'Android Smartphone (Samsung, Tecno, Infinix, etc.)', desc: 'Sample Match. Tools must have great Android mobile apps and low RAM usage.' },
                  { value: 'iphone', label: 'Apple iPhone (iOS)', desc: 'Primary work happens on iOS apps.' },
                  { value: 'laptop', label: 'Laptop / Desktop Computer (Windows or Mac)', desc: 'Comfortable with web dashboards, browser tabs, and desktop keyboards.' },
                ].map(item => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setAnswers({ ...answers, primaryDevice: item.value as PrimaryDevice })}
                    className={`p-3.5 text-left rounded-xl border transition-all ${
                      answers.primaryDevice === item.value
                        ? 'border-emerald-700 bg-emerald-50/70 ring-1 ring-emerald-700'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{item.label}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400">Step 1 of 10</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {step < 10 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg flex items-center gap-1.5 transition-colors shadow-md"
              >
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Generate Scorecard Now</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
