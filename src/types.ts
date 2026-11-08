export type BusinessType = 
  | 'online_store'
  | 'fashion_retail'
  | 'food_grocery'
  | 'services_freelance'
  | 'beauty_wellness'
  | 'general_trade';

export type TeamSize = 'solo' | 'small' | 'medium'; // solo = 1-2, small = 3-10, medium = 11-25

export type SalesChannel = 'whatsapp' | 'instagram' | 'tiktok' | 'facebook' | 'walkin' | 'website';

export type PaymentMethod = 'transfer_screenshot' | 'payment_link' | 'pos_terminal' | 'cash';

export type MonthlyBudget = 'free_only' | 'under_10k' | '10k_30k' | '30k_100k';

export type DataConstraint = 'costly_data' | 'good_wifi' | 'unstable_network';

export type DailyTimeSink = 
  | 'customer_inquiries'
  | 'content_creation'
  | 'chasing_transfers'
  | 'packing_logistics'
  | 'inventory_pricing';

export type FocusArea = 'customer_service' | 'sales' | 'content' | 'operations' | 'finance';

export type AiExperience = 'never' | 'tried_chatgpt' | 'regular_user';

export type PrimaryDevice = 'android' | 'iphone' | 'laptop';

export interface AssessmentAnswers {
  businessName?: string;
  businessType: BusinessType;
  teamSize: TeamSize;
  salesChannels: SalesChannel[];
  paymentMethods: PaymentMethod[];
  monthlyBudget: MonthlyBudget;
  dataConstraint: DataConstraint;
  dailyTimeSink: DailyTimeSink;
  focusArea: FocusArea;
  aiExperience: AiExperience;
  primaryDevice: PrimaryDevice;
}

export type GapCategoryKey = 'sales' | 'customer_service' | 'content' | 'operations' | 'finance';

export interface GapMetric {
  category: string;
  key: GapCategoryKey;
  score: number;
  status: 'Gap' | 'Big gap' | 'Moderate' | 'Strong';
  isFocus: boolean;
}

export interface RecommendedTool {
  id: string;
  rank: number;
  name: string;
  stageTag: 'ATTRACT' | 'SERVE' | 'GET PAID' | 'MANAGE' | 'OPERATE';
  category: string;
  description: string;
  whyFitsEnglish: string;
  whyFitsPidgin: string;
  pricingTag: string;
  isMadeInNigeria?: boolean;
  websiteUrl: string;
  dataUsageTag: 'Very Light' | 'Light' | 'Moderate';
}

export interface StackFunnelStep {
  stage: 'CUSTOMERS' | 'ATTRACT' | 'SERVE' | 'GET PAID' | 'MONEY IN';
  title: string;
  subtitle: string;
  subCategory?: string;
  isCurrentStatus?: boolean;
  toolUrl?: string;
}

export interface ActionPlanDay {
  dayRange: string;
  taskTitle: string;
  instruction: string;
  actionItemKey: string;
  defaultChecked?: boolean;
}

export interface ScorecardResult {
  answers: AssessmentAnswers;
  isSamplePreset: boolean;
  businessKicker: string;
  headline: string;
  subheadline: string;
  overallScore: number;
  tierLabel: string;
  businessSizeLabel: string;
  benchmarkScore: number;
  benchmarkEstimateText: string;
  gaps: GapMetric[];
  explanation: {
    english: string[];
    pidgin: string[];
  };
  topTools: RecommendedTool[];
  starterStack: StackFunnelStep[];
  actionPlan: ActionPlanDay[];
  footerNote: string;
}
