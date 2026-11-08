import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;

if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Nigerian AI Business Coach Endpoint
app.post('/api/coach', async (req, res) => {
  try {
    const { message, context, language = 'both' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!aiClient) {
      // High-quality local simulated response for Nigerian business context when key is not configured
      const reply = getLocalCoachFallback(message, context, language);
      res.json({
        reply,
        source: 'local_engine',
        status: 'ok',
      });
      return;
    }

    const systemPrompt = `You are "Coach Femi", the expert tech and AI advisor for Nigerian small business owners, online vendors, and MSMEs (MyStack Naija).
You understand Nigerian business realities deeply:
- Cost of mobile data (MTN/Airtel/Glo/Starlink)
- Erratic power and generator fuel costs
- Bank network downtime and pending transfer alerts
- WhatsApp & Instagram DMs being the primary sales engine
- Reluctance to pay monthly USD subscriptions ($20/mo is heavy for a small vendor)
- The power of Paystack payment links, Moniepoint POS, Bumpa stores, ManyChat DM bots, and Meta Business Suite

Business Context:
${JSON.stringify(context || {}, null, 2)}

Instructions:
1. Answer the user's question directly, practically, and empathetically.
2. If asked in Pidgin or if requested dual-language, provide the advice clearly with both English and warm, authentic Nigerian Pidgin.
3. Recommend free or low-cost tools and realistic 10-minute action steps.
4. Keep the tone encouraging, respectful, and sharp. No buzzwords.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    res.json({
      reply: response.text || 'No response generated.',
      source: 'gemini',
      status: 'ok',
    });
  } catch (error: any) {
    console.error('Gemini coach API error:', error);
    // Provide a graceful fallback instead of failing
    const fallbackReply = getLocalCoachFallback(req.body.message || '', req.body.context, req.body.language);
    res.json({
      reply: fallbackReply,
      source: 'local_engine_fallback',
      status: 'ok',
    });
  }
});

function getLocalCoachFallback(userMsg: string, context: any, language: string): string {
  const q = userMsg.toLowerCase();
  
  if (q.includes('manychat') || q.includes('whatsapp') || q.includes('instagram')) {
    return `### ManyChat Quick Guide (English & Pidgin)

**English:**
To connect ManyChat to your Instagram or WhatsApp without coding:
1. Sign up for free on manychat.com using your Facebook / Meta business login.
2. Go to **Automations** > **New Flow**.
3. Choose trigger: *"User comments on a post or reel"*.
4. Set keyword: Set words like "PRICE", "HOW MUCH", "SIZE", "SEND".
5. Set action: Send automated DM with your photo catalogue link or Paystack payment page.
This saves you 3 hours every single day!

**Nigerian Pidgin:**
Make you hear the simple way to set am up:
1. Open manychat.com, sign up free with your Instagram or Facebook business page.
2. Go to **Automations**, pick *"When person drop comment for my post"*.
3. Type keywords like "PRICE" or "HOW MUCH".
4. Set wetin ManyChat go send: Make e send your price list or payment link straight to their DM.
You no need know any code at all, and your hand go free from typing the same price 50 times a day!`;
  }

  if (q.includes('paystack') || q.includes('money') || q.includes('payment') || q.includes('transfer')) {
    return `### Paystack Payment Links Advice

**English:**
Stop waiting for bank transfer alert screenshots:
1. Open your free Paystack dashboard (free to register in Nigeria).
2. Go to **Payment Pages** > **New Page**.
3. Set fixed amount or let customer enter quantity.
4. Copy the link and put it in your Instagram bio or ManyChat automated DM.
Customers can pay using Bank Transfer, USSD, or Card. Paystack confirms the transfer in 3 seconds and issues a receipt automatically.

**Nigerian Pidgin:**
Make you forget that stress of *"Aunty, abeg wait make my bank alert drop"*:
1. Log in to Paystack, click **Payment Pages**, create one link for your hot-selling product.
2. Copy the link paste for customer for WhatsApp.
3. Once dem click, dem fit pay with transfer or card, and Paystack go send you and customer instant notification.
No more story of fake alert or bank network hanging your money!`;
  }

  return `### MyStack Naija Advice

**English:**
Focus on fixing your biggest bottleneck first. If you spend all day answering *"How much?"* in the DMs, start with ManyChat keyword automation. If you lose sales because customers hesitate to send manual bank transfers, create Paystack payment links. Always choose tools with generous free tiers that don't consume heavy mobile data.

**Nigerian Pidgin:**
Pick one single tool first make you master am. If na customer DMs dey choke your neck, set up ManyChat make e dey send price automatic. If na bank alert wahala dey waste your time, create Paystack payment link. Start small, save your data, and watch your business move fast fast!`;
}

// Development with Vite vs Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
