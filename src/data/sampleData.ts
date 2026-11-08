import { AssessmentAnswers } from '../types';

export const SAMPLE_PROTOTYPE_ANSWERS: AssessmentAnswers = {
  businessName: 'Sample Online Store',
  businessType: 'online_store',
  teamSize: 'small', // 3 to 10 people
  salesChannels: ['whatsapp', 'instagram'],
  paymentMethods: ['transfer_screenshot'],
  monthlyBudget: 'under_10k', // under ₦10,000 a month
  dataConstraint: 'costly_data', // works with costly data
  dailyTimeSink: 'customer_inquiries', // answering repetitive customer questions and writing posts
  focusArea: 'customer_service',
  aiExperience: 'tried_chatgpt', // has tried AI before
  primaryDevice: 'android',
};

export const PRESET_OPTIONS: { id: string; label: string; description: string; answers: AssessmentAnswers }[] = [
  {
    id: 'prototype_sample',
    label: 'Sample Online Store (Builders Arena Prototype)',
    description: '3–10 people, sells on WhatsApp & IG, bank transfers, under ₦10k budget, costly data.',
    answers: SAMPLE_PROTOTYPE_ANSWERS,
  },
  {
    id: 'solo_fashion',
    label: 'Solo Fashion Vendor (Yaba / Lagos)',
    description: '1–2 person thrift/fashion seller on Instagram & TikTok, struggling with caption writing & payment proof.',
    answers: {
      businessName: 'Luxe Thrift Naija',
      businessType: 'fashion_retail',
      teamSize: 'solo',
      salesChannels: ['instagram', 'tiktok', 'whatsapp'],
      paymentMethods: ['transfer_screenshot'],
      monthlyBudget: 'free_only',
      dataConstraint: 'costly_data',
      dailyTimeSink: 'content_creation',
      focusArea: 'content',
      aiExperience: 'never',
      primaryDevice: 'iphone',
    },
  },
  {
    id: 'food_kitchen',
    label: 'Abuja Food Delivery & Small Kitchen',
    description: '3–10 staff, taking lunch orders on WhatsApp, manual bank reconciliation delays, needs fast payment & orders.',
    answers: {
      businessName: 'Chop Life Kitchen Abuja',
      businessType: 'food_grocery',
      teamSize: 'small',
      salesChannels: ['whatsapp', 'facebook'],
      paymentMethods: ['transfer_screenshot', 'pos_terminal'],
      monthlyBudget: '10k_30k',
      dataConstraint: 'unstable_network',
      dailyTimeSink: 'chasing_transfers',
      focusArea: 'finance',
      aiExperience: 'tried_chatgpt',
      primaryDevice: 'android',
    },
  },
  {
    id: 'consulting_freelance',
    label: 'Solo Digital Agency / Freelancer',
    description: 'Solo consultant, looking to automate proposals, invoices, and lead qualification.',
    answers: {
      businessName: 'Apex Digital Creative',
      businessType: 'services_freelance',
      teamSize: 'solo',
      salesChannels: ['whatsapp', 'website', 'instagram'],
      paymentMethods: ['payment_link'],
      monthlyBudget: '30k_100k',
      dataConstraint: 'good_wifi',
      dailyTimeSink: 'customer_inquiries',
      focusArea: 'sales',
      aiExperience: 'regular_user',
      primaryDevice: 'laptop',
    },
  },
];
