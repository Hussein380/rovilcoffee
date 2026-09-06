import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { initialProductsCatalog } from '@/data/productsCatalog';
import { companyInfo } from '@/data/companyInfo';
import { coffeeGrades } from '@/data/coffeeGrades';
import { teaVarieties } from '@/data/teaVarieties';
import { farmStages } from '@/data/farmStages';
import { exportMarkets } from '@/data/exportMarkets';

// List of Gemini models to try in sequential fallback order
const GEMINI_MODELS = [
  'gemini-3.5-flash',
  'gemini-2.5-flash',
  'gemini-flash-lite-latest',
  'gemini-3.5-flash-lite',
  'gemini-3-flash-preview',
  'gemini-2.5-flash-lite',
  'gemini-1.5-flash',
  'gemini-flash-latest',
];

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Helper to extract live products from MongoDB or fallback catalog
async function getLiveProducts() {
  try {
    await dbConnect();
    const dbProducts = await Product.find({}).sort({ createdAt: -1 }).lean();
    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        id: (p._id as { toString(): string }).toString(),
        name: p.name,
        category: p.category,
        categoryLabel: p.categoryLabel,
        tagline: p.tagline,
        description: p.description,
        image: p.image,
        priceRetailUSD: p.priceRetailUSD,
        priceRetailKES: p.priceRetailKES,
        unitWeight: p.unitWeight,
        wholesalePriceUSD: p.wholesalePriceUSD,
        wholesaleMOQ: p.wholesaleMOQ,
        origin: p.origin,
        flavorNotes: p.flavorNotes || [],
        specs: p.specs || [],
      }));
    }
  } catch (err) {
    console.warn('Could not query MongoDB for products in chat, using catalog fallback:', err);
  }
  return initialProductsCatalog;
}

// Build a rich system prompt with full business context
function buildSystemPrompt(products: any[]) {
  const productsSummary = products
    .map(
      (p, i) =>
        `${i + 1}. **${p.name}** (${p.categoryLabel || p.category})\n` +
        `   - Tagline: ${p.tagline}\n` +
        `   - Description: ${p.description}\n` +
        `   - Retail Price: $${p.priceRetailUSD} USD (~KES ${p.priceRetailKES?.toLocaleString() || 'N/A'})\n` +
        `   - Unit Weight / Packaging: ${p.unitWeight}\n` +
        (p.wholesalePriceUSD ? `   - Wholesale Price: $${p.wholesalePriceUSD} USD (MOQ: ${p.wholesaleMOQ || '1 Carton'})\n` : '') +
        `   - Origin: ${p.origin}\n` +
        `   - Flavor Notes: ${(p.flavorNotes || []).join(', ')}\n` +
        (p.specs && p.specs.length ? `   - Specs: ${p.specs.map((s: any) => `${s.label}: ${s.value}`).join('; ')}\n` : '')
    )
    .join('\n');

  const coffeeGradesSummary = coffeeGrades
    .map(
      (g) =>
        `* **Grade ${g.code}** (${g.name}) - Screen ${g.screenSize} (${g.screenMm}): ${g.beanDescription}. Cup: ${g.cupProfile.notes.join(', ')}. Packaging: ${g.packaging}. MOQ: ${g.minimumOrder}.`
    )
    .join('\n');

  const teaVarietiesSummary = teaVarieties
    .map(
      (t) =>
        `* **${t.name}** (${t.subtitle}): ${t.description}. Tasting notes: ${t.tasteNotes.join(', ')}. Packaging: ${t.packaging}. MOQ: ${t.minimumOrder}.`
    )
    .join('\n');

  const farmSummary = farmStages
    .map((s) => `Step ${s.step}: ${s.title} (${s.location}, ${s.durationOrSeason}) - ${s.summary}`)
    .join('\n');

  const marketsSummary = exportMarkets
    .map((m) => `Region: ${m.region} - Hubs: ${m.majorHubs.join(', ')} - Lead Time: ${m.leadTimeDays}`)
    .join('\n');

  return `You are a professional, knowledgeable human representative and export specialist at Rovil Coffee & Tea (Rovil Enterprises Limited), based in Nairobi, Kenya.

### COMPANY & EXPORT PROFILE
- Company Name: ${companyInfo.name} (${companyInfo.legalEntity})
- Tagline: ${companyInfo.tagline}
- Mission: ${companyInfo.subheading}
- Licensing: Officially Licensed Coffee & Tea Exporter by the Government of Kenya | Coffee Directorate (Agriculture and Food Authority - AFA).
- Origin: Republic of Kenya (Central Kenya Highlands, Mt. Kenya & Aberdares volcanic soils at 1,800m - 2,200m ASL).
- Export Seaport: Port of Mombasa (Kilindini Harbour) for global ocean container shipments (FCL 20ft/40ft & LCL pallets).
- Inland Container Hub: ICD Nairobi for rail container dispatch via SGR.
- Air Cargo: Jomo Kenyatta International Airport (NBO) for express samples.
- Shipping Terms: FOB Mombasa, CIF destination ports worldwide, CFR.

### DIRECT CONTACTS & DESK
- WhatsApp: ${companyInfo.contacts.whatsapp} (Direct link: wa.me/254721487948)
- Primary Phone: ${companyInfo.contacts.phonePrimary}
- Secondary Phone: ${companyInfo.contacts.phoneSecondary}
- Email: ${companyInfo.contacts.email}
- Head Office Address: ${companyInfo.address.street}, ${companyInfo.address.poBox}, ${companyInfo.address.city}, ${companyInfo.address.country}
- Business Hours: ${companyInfo.hours}

### LIVE PRODUCTS CURRENTLY IN CATALOG / INVENTORY
${productsSummary}

### COFFEE EXPORT GRADES (BULK & SPECIALTY)
${coffeeGradesSummary}

### TEA VARIETIES (SPECIALTY & COMMERCIAL)
${teaVarietiesSummary}

### FARM & PRODUCTION PROCESS (DIRECT TRACEABILITY)
${farmSummary}

### GLOBAL EXPORT MARKETS & REACH
${marketsSummary}

### STRICT CONVERSATIONAL GUIDELINES
1. Voice and Tone: Speak naturally, warmly, and professionally like a real human export advisor and coffee specialist. 
2. NO EMOJIS: Do not use emojis in your responses. Keep the text clean, articulate, and executive.
3. General & Normal Questions: Answer general greetings, questions about coffee brewing, tea preparation, Kenya, or general conversation thoughtfully and helpfully, bridging back to Rovil's offerings when appropriate.
4. Product Details: When asked about purchasing, gifts, retail, or wholesale stock, provide clear pricing in USD and KES, unit sizes, flavor notes, and MOQ.
5. Export Guidance: Clearly explain FCL/LCL shipping, GrainPro packaging in 60kg sisal bags, phytosanitary clearance, and how buyers can request an official proforma invoice or commercial quote.
6. Clean Formatting: Use concise paragraphs and bullet points for readability. Avoid walls of text.`;
}

// Fallback intelligent response generator if Gemini API key is not configured or all models fail
function generateLocalFallbackResponse(userPrompt: string, products: any[]): string {
  const query = userPrompt.toLowerCase().trim();

  // 1. General Greetings & Chit-chat
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query.includes('how are you') ||
    query.includes('good morning') ||
    query.includes('good afternoon') ||
    query.includes('good evening')
  ) {
    return `Hello. I am doing well, thank you. I am here to assist you with any questions regarding Rovil Coffee and Tea, our single-origin coffees, specialty teas, current pricing, or export shipping from Kenya. How can I help you today?`;
  }

  // 2. Who are you / Identity
  if (query.includes('who are you') || query.includes('what are you') || query.includes('your name')) {
    return `I am the customer and export assistant for Rovil Coffee and Tea, an officially licensed Kenyan exporter based in Nairobi. I assist buyers, roasters, and customers with product specifications, wholesale inquiries, cupping notes, and logistics.`;
  }

  // 3. Brewing / Preparation Tips
  if (query.includes('brew') || query.includes('make') || query.includes('prepare') || query.includes('grind') || query.includes('roast') || query.includes('recipe')) {
    return `For our Kenyan Single Origin Grade AA coffee, we recommend a medium-coarse grind with a pour-over (V60 or Chemex) or French Press at a water temperature of 92°C to 94°C (198°F to 201°F). A 1:16 coffee-to-water ratio highlights the vibrant citrus brightness and blackcurrant notes.

For our Royal Purple Tea, steep in fresh water at 85°C to 90°C for 3 to 4 minutes to extract the delicate floral sweetness and preserve antioxidant polyphenols. Adding a drop of lemon juice will naturally turn the purple tea infusion into a vibrant pink hue.`;
  }

  // 4. Contact & Location
  if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('address') || query.includes('location') || query.includes('where') || query.includes('whatsapp') || query.includes('office') || query.includes('reach')) {
    return `### Contact Information
* WhatsApp Export Desk: +254 721 487 948
* Telephone: +254 721 487 948 / +254 722 661 065
* Email: info@rovil.co.ke
* Office Location: Moi Avenue, P.O. Box 21237-00100, Nairobi, Kenya
* Export Shipping Hubs: Port of Mombasa (Kilindini Harbour) and ICD Nairobi
* Working Hours: Monday to Friday, 08:00 to 17:00 EAT (UTC+3)`;
  }

  // 5. Shipping & Export procedure
  if (query.includes('ship') || query.includes('export') || query.includes('port') || query.includes('mombasa') || query.includes('container') || query.includes('fob') || query.includes('cif') || query.includes('moq') || query.includes('logistics') || query.includes('lead time')) {
    return `### Export Logistics and Shipping
Rovil Coffee and Tea handles complete export logistics from Kenya to international destinations:

* Seaport of Origin: Port of Mombasa (Kilindini Harbour), Kenya.
* Inland Depot: ICD Nairobi via Standard Gauge Railway (SGR).
* Container Capacity: 20ft FCL holds 320 bags (19.2 Metric Tonnes); 40ft FCL available for bulk allocations.
* Shipping Terms: FOB Mombasa, CFR, or CIF destination ports worldwide.
* Export Documentation: Full Phytosanitary certificate, Certificate of Origin (ICO/AFA), Bill of Lading, and SCA cupping quality sheets.`;
  }

  // 6. Products / price inquiry
  if (query.includes('product') || query.includes('price') || query.includes('catalog') || query.includes('buy') || query.includes('cost') || query.includes('sell') || query.includes('item') || query.includes('stock') || query.includes('have') || query.includes('pack')) {
    let response = `We have the following packaged single-origin coffees and specialty teas in our active catalog:\n\n`;
    products.forEach((p) => {
      response += `* **${p.name}** (${p.categoryLabel || p.category})\n`;
      response += `  - Price: $${p.priceRetailUSD} USD (approx. KES ${p.priceRetailKES?.toLocaleString() || 'N/A'})\n`;
      response += `  - Packaging: ${p.unitWeight}\n`;
      if (p.wholesalePriceUSD) response += `  - Wholesale: $${p.wholesalePriceUSD} USD per unit (MOQ: ${p.wholesaleMOQ || '1 Case'})\n`;
      response += `  - Flavor Profile: ${(p.flavorNotes || []).join(', ')}\n\n`;
    });
    response += `To place an order or request wholesale volume allocations, you can connect directly with our sales team via WhatsApp at +254 721 487 948 or submit a commercial quote request.`;
    return response;
  }

  // 7. Tea inquiry
  if (query.includes('tea') || query.includes('purple') || query.includes('ctc') || query.includes('black tea') || query.includes('orthodox')) {
    return `### Kenyan Specialty and Commercial Teas
We source and export premium teas grown in high-elevation volcanic soil above 2,000 meters:

* **Royal Purple Tea (TRFK 306)**: An exclusive high-altitude cultivar rich in anthocyanin antioxidants, yielding a distinct violet-amber liquor with sweet plum and floral notes.
* **Kenyan Orthodox Whole-Leaf**: Hand-plucked tender shoots processed with gentle withering and rolling to preserve whole leaves and golden tips.
* **Kenyan Black CTC Tea (BP1, PF1, PD)**: The global standard for briskness, rich copper liquor, and full-bodied malty depth.

Available in both commercial multi-wall export sacks (20kg to 50kg) and 100g luxury retail canisters.`;
  }

  // 8. Coffee grades inquiry
  if (query.includes('grade') || query.includes('coffee') || query.includes('arabica') || query.includes('aa') || query.includes('ab') || query.includes('peaberry') || query.includes('pb')) {
    return `### Kenyan Arabica Coffee Export Grades
Rovil Coffee and Tea exports commercial and specialty lots licensed by the Kenya Coffee Directorate (AFA):

* **Grade AA (Screen 17/18)**: The largest bean screen with high density, offering bright phosphoric citrus acidity and complex blackcurrant notes.
* **Grade AB (Screen 15/16)**: The core commercial export standard with consistent density, stone fruit sweetness, and balanced acidity.
* **Grade PB (Peaberry)**: Rare single-bean cherry mutation (roughly 5% of crop), providing concentrated sweetness and thermodynamic roasting consistency.
* **Grade C and MH**: Smaller screen selections and machine-hulled lots suited for commercial blending and espresso foundations.

Packaging: 60kg export sisal bags with hermetic GrainPro protective liners.
Shipment: Shipped via full container load (19.2 MT per 20ft FCL) or palletized LCL from the Port of Mombasa.`;
  }

  // Generic fallback
  return `Thank you for your message. I am here to help you with information regarding Rovil Coffee and Tea.

You can ask me about our coffee export grades (AA, AB, PB), specialty teas (Royal Purple, Orthodox, CTC), product pricing in USD/KES, minimum order quantities, or export procedures from the Port of Mombasa.

If you would like to discuss a custom shipment directly with our export team, please feel free to reach out via WhatsApp at +254 721 487 948.`;
}

// Call Google Gemini API with fallback cascade
async function callGeminiWithCascade(apiKey: string, systemPrompt: string, messages: ChatMessage[]): Promise<string | null> {
  const contents = [
    {
      role: 'user',
      parts: [{ text: `SYSTEM INSTRUCTIONS:\n${systemPrompt}\n\nStrictly follow these instructions and answer the user accurately.` }],
    },
    {
      role: 'model',
      parts: [{ text: 'Understood. I am the Rovil Coffee & Tea AI Assistant, ready to assist buyers and visitors with accurate information about our coffees, teas, prices, origin, and export logistics.' }],
    },
  ];

  for (const m of messages) {
    contents.push({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    });
  }

  for (const modelName of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text && text.trim().length > 0) {
          return text.trim();
        }
      } else {
        const errBody = await res.text();
        console.warn(`Gemini model ${modelName} returned status ${res.status}:`, errBody);
      }
    } catch (modelErr) {
      console.warn(`Gemini model ${modelName} fetch error:`, modelErr);
    }
  }

  return null;
}

// Check which products are relevant to attach as product cards
function findMatchingProducts(userQuery: string, assistantReply: string, products: any[]) {
  const combined = (userQuery + ' ' + assistantReply).toLowerCase();
  const matched = products.filter((p) => {
    const nameLower = p.name.toLowerCase();
    const catLower = (p.category || '').toLowerCase();
    if (combined.includes('coffee') && catLower.includes('coffee')) return true;
    if (combined.includes('tea') && catLower.includes('tea')) return true;
    if (combined.includes('purple') && nameLower.includes('purple')) return true;
    if (combined.includes('aa') && nameLower.includes('aa')) return true;
    if (combined.includes(nameLower)) return true;
    return false;
  });

  return matched.slice(0, 3);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const messages: ChatMessage[] = body.messages || [];

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    const userPrompt = lastMessage.content || '';

    // 1. Fetch live products from DB
    const liveProducts = await getLiveProducts();

    // 2. Build system prompt
    const systemPrompt = buildSystemPrompt(liveProducts);

    // 3. Try Gemini API cascade
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || '';
    let responseText: string | null = null;

    if (apiKey) {
      responseText = await callGeminiWithCascade(apiKey, systemPrompt, messages);
    }

    // 4. Fallback if no API key or all Gemini attempts fail
    if (!responseText) {
      responseText = generateLocalFallbackResponse(userPrompt, liveProducts);
    }

    // 5. Detect product suggestions
    const suggestedProducts = findMatchingProducts(userPrompt, responseText, liveProducts);

    return NextResponse.json({
      content: responseText,
      suggestedProducts,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process chat' }, { status: 500 });
  }
}
