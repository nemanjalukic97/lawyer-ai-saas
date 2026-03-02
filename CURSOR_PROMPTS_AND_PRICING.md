# AI LEGAL ASSISTANT - CURSOR PROMPTS & PRICING GUIDE
**Version 3.0 Final | February 2026**

---

## 🎯 QUICK START: What You Need to Know

### Corrected Pricing Strategy (€30-80)

Your **€30-80 pricing is PERFECT** for the Balkan market. Here's why:

**Regional Market Reality:**
- Bosnia & Herzegovina: Avg lawyer salary €15,000-25,000/year
- Serbia: €18,000-30,000/year  
- Croatia: €25,000-40,000/year
- Montenegro: €12,000-22,000/year
- Slovenia: €30,000-50,000/year

**Your Pricing Tiers:**

| Tier | Price/Month | Features | Target |
|------|-------------|----------|--------|
| **Solo** | €29 | Features 1, 3, 4, 9 | Solo practitioners |
| **Professional** ⭐ | **€59** | **ALL 10 features** | **Small firms 2-10 (YOUR MAIN TARGET)** |
| **Firm** | €79 | All + Priority Support | Larger firms 10-50 |

**Why €59 Works:**
- Annual cost: €708
- Lawyer loses €2,000-5,000/year in unbilled time
- Your product captures 15-20% = €300-1,000 recovered
- Time saved on drafting = €500-750/month value
- **TOTAL ROI: 850-1,200% return on investment** 🚀

**Revenue Projections at €59/month:**
- Month 3: 50 users = €2,950/month
- Month 6: 150 users = €8,850/month  
- Year 1: 300 users = €17,700/month
- Year 2: 600 users = €35,400/month

---

## 📋 Complete Feature List (10 Features)

Your original model had 3 features. You need 10 to compete:

### ✅ CRITICAL (Phase 1 - MVP):
1. **Contract Drafting & Legal Research** - Automate contract creation
2. **Case Outcome Prediction** - Predict case results based on precedents
3. **AI Document Generation** - Generate legal documents

### 🟡 HIGH PRIORITY (Phase 2):
4. **Document Analysis & Review** - Upload contract → AI highlights risks
5. **Automated Time Tracking & Billing** - Captures lost billable time (JUSTIFIES PRICE!)
6. **Secure Client Portal** - GDPR-compliant client file sharing

### 🟢 MEDIUM PRIORITY (Phase 3):
7. **Microsoft Word Integration** - Word add-in for AI in lawyer's workflow
8. **Contract Analytics & Insights** - Dashboard of all contracts, deadlines
9. **Template Library** - 50+ jurisdiction-specific templates

### ⚪ LOW PRIORITY (Future):
10. **Email & Calendar Integration** - Auto-file communications

---

## 🚀 STEP-BY-STEP CURSOR PROMPTS

**Copy these prompts exactly as written into Cursor, in order.**

---

### PHASE 1: PROJECT SETUP (2-3 hours)

#### PROMPT 1.1: Initialize Next.js Project

```
I'm building an AI Legal Assistant SaaS for lawyers in Bosnia & Herzegovina, Serbia, Croatia, Montenegro, and Slovenia.

Create a new Next.js 14+ project with TypeScript, using:
- App Router (not Pages Router)
- Tailwind CSS for styling
- shadcn/ui component library

Set up the basic folder structure:
- /app (for routes)
- /components (for reusable UI components)
- /lib (for utilities and API calls)
- /types (for TypeScript types)

Create a clean, professional landing page with:
- Hero section explaining what the product does
- Feature highlights section (placeholder for 10 features)
- Pricing tiers (€29, €59, €79 per month)
- Simple navigation bar with logo
- Footer with links

Use a professional color scheme (blues/grays) suitable for legal tech.
```

---

#### PROMPT 1.2: Set Up Supabase Authentication

```
Integrate Supabase for authentication and database.

Set up:
1. Supabase client configuration
2. Login page (/login) with email/password
3. Signup page (/signup) with email/password
4. Password reset functionality
5. Protected routes (redirect to /login if not authenticated)
6. User session management
7. Logout functionality

Create a protected dashboard at /dashboard that only authenticated users can access.

Add authentication UI using shadcn/ui components for forms and buttons.
```

---

#### PROMPT 1.3: Configure OpenAI API Integration

```
Set up OpenAI API integration for our AI features.

Create:
1. API route at /api/ai that handles OpenAI requests
2. Environment variable setup for OPENAI_API_KEY
3. Helper function in /lib/openai.ts for making API calls
4. Error handling for API failures
5. Rate limiting (basic implementation)

Use GPT-4 Turbo as the model.

Configure these parameters:
- model: "gpt-4-turbo-preview"
- temperature: 0.3
- max_tokens: 4000
```

---

### PHASE 2: CORE FEATURES (8-12 hours)

#### PROMPT 2.1: Feature 3 - Document Generation (START HERE - EASIEST)

```
Build the AI Document Generation feature. This will be our first working feature.

Create a page at /dashboard/generate with:
1. Dropdown to select document type:
   - Employment Contract
   - NDA (Non-Disclosure Agreement)
   - Power of Attorney
   - Sales Contract
   - Lease Agreement

2. Dropdown to select jurisdiction:
   - Bosnia & Herzegovina (with sub-options: Federation BiH, Republika Srpska, Brčko District)
   - Serbia
   - Croatia
   - Montenegro
   - Slovenia

3. Form fields for document details:
   - Party names
   - Dates
   - Monetary amounts
   - Specific terms
   (Fields should change based on document type selected)

4. "Generate Document" button that:
   - Sends data to /api/generate
   - Calls OpenAI API with proper system prompt
   - Returns formatted document
   - Shows loading state

5. Preview area showing generated document
6. Download button (PDF and DOCX formats)

Use the OpenAI integration from PROMPT 1.3.

For the system prompt, use this template:
"You are a legal AI assistant specialized in {jurisdiction}. Generate a professional {document_type} in {language} following {jurisdiction} legal requirements. Include all mandatory sections and use proper legal language."
```

---

#### PROMPT 2.2: Feature 1 - Contract Drafting

```
Build the Contract Drafting feature at /dashboard/contracts.

Similar to document generation but more comprehensive:

1. Multi-step wizard interface:
   - Step 1: Select contract type
   - Step 2: Choose jurisdiction (BiH/Serbia/Croatia/Montenegro/Slovenia)
   - Step 3: Fill in contract details
   - Step 4: Review and customize
   - Step 5: Generate final contract

2. Support these contract types:
   - Employment Contract
   - Service Agreement
   - Sales Contract
   - Lease/Rental Agreement
   - NDA
   - Partnership Agreement

3. Include AI-powered features:
   - Suggest missing clauses based on contract type
   - Auto-fill standard terms for jurisdiction
   - Warning if terms conflict with local law

4. Legal research sidebar:
   - Shows relevant laws and articles for selected jurisdiction
   - Cites specific legal sources

5. Export options:
   - PDF with letterhead option
   - DOCX for further editing
   - Save draft functionality (store in Supabase)

Create Supabase table "contracts" with:
- id, user_id, contract_type, jurisdiction, content, status, created_at, updated_at
```

---

#### PROMPT 2.3: Feature 2 - Case Outcome Prediction

```
Build the Case Outcome Prediction feature at /dashboard/predictions.

Create an interface where lawyers can:

1. Input case details:
   - Case type (civil, commercial, labor, family, criminal, administrative)
   - Jurisdiction (BiH/Serbia/Croatia/Montenegro/Slovenia)
   - Key facts (text area)
   - Timeline/procedural history
   - Amounts in dispute
   - Evidence quality (dropdown: Strong/Medium/Weak)

2. AI Analysis that returns:
   - Outcome probability (% chance of success)
   - Confidence level (High/Medium/Low)
   - Key factors influencing prediction
   - Similar precedent cases (with citations)
   - Alternative scenarios
   - Strategic recommendations
   - Risks and uncertainties

3. Display results in clean, professional format with:
   - Visual probability chart
   - List of key factors
   - Precedent case cards
   - Disclaimer: "This is a prediction based on historical data. Consult attorney for final advice."

4. Save predictions functionality
   - Store in Supabase table "predictions"

Use a detailed system prompt that includes:
- Jurisdiction-specific legal framework knowledge
- Instructions to analyze based on case law
- Format for returning structured prediction data
```

---

### PHASE 3: HIGH-PRIORITY FEATURES (10-15 hours)

#### PROMPT 3.1: Feature 4 - Document Analysis & Review

```
Build Document Analysis feature at /dashboard/analyze.

Allow lawyers to:

1. Upload contract (PDF or DOCX)
   - Drag and drop interface
   - File size limit: 10MB
   - Support .pdf, .docx files

2. AI automatically analyzes and identifies:
   - Risky clauses (highlighted in red)
   - Missing provisions (listed)
   - Compliance issues
   - Ambiguous language
   - Unfavorable terms
   - Jurisdiction-specific problems

3. Generate analysis report with:
   - Executive summary
   - Risk score (1-10)
   - Detailed findings by section
   - Recommended changes with explanations
   - Red-line suggestions

4. Side-by-side view:
   - Original document on left
   - AI annotations on right

5. Export analysis as PDF report

Use PDF parsing library (pdf-parse) and docx parser.
Store analyses in Supabase table "document_analyses".
```

---

#### PROMPT 3.2: Feature 5 - Automated Time Tracking

```
Build Time Tracking feature that runs automatically.

THIS IS CRITICAL - IT JUSTIFIES YOUR PRICING!

Implement:

1. Background timer that tracks:
   - Time spent on each document/task
   - Activity type (drafting, reviewing, research)
   - Client/matter association
   - Automatic categorization

2. Dashboard at /dashboard/time showing:
   - Today's billable time
   - Week summary
   - Month summary
   - By client breakdown
   - By activity type chart

3. Time entry editing:
   - AI-suggested descriptions based on activity
   - Approve/edit entries
   - Manual time entry option
   - Bill rate settings

4. Billing integration:
   - Generate invoices from time entries
   - Export to accounting software (CSV)
   - Client-facing invoice preview

5. Analytics:
   - Utilization rate tracking
   - Lost time recovery metrics
   - ROI calculator showing value gained

Create Supabase tables:
- "time_entries" (id, user_id, client_id, activity_type, duration, description, billable, rate, date)
- "clients" (id, user_id, name, default_rate, contact_info)

Use local storage or browser activity detection to track time automatically.
```

---

#### PROMPT 3.3: Feature 6 - Secure Client Portal

```
Build Client Portal for secure lawyer-client communication.

Create two interfaces:

1. Lawyer view at /dashboard/clients:
   - List all clients
   - Add new client
   - Invite client to portal (sends email)
   - Upload documents for client
   - Message client
   - View client activity

2. Client view at /client-portal:
   - Separate login (different route)
   - View documents lawyer shared
   - Download documents securely
   - Upload documents to lawyer
   - Message lawyer
   - View invoice status
   - Make payments (Stripe integration - optional for MVP)

3. Security features:
   - End-to-end encryption for files
   - Document access logs
   - Password-protected document links
   - GDPR-compliant data handling
   - Auto-delete documents after X days (optional)

4. Notifications:
   - Email notifications for new documents
   - In-app notifications
   - Read receipts

Create Supabase tables:
- "clients" (if not exists)
- "client_documents" (id, lawyer_id, client_id, filename, file_url, shared_date, accessed_date)
- "messages" (id, sender_id, recipient_id, message, read, created_at)

Use Supabase Storage for secure file storage.
```

---

### PHASE 4: POLISH & ADDITIONAL FEATURES (8-12 hours)

#### PROMPT 4.1: Dashboard & Analytics

```
Create comprehensive dashboard at /dashboard with:

1. Overview metrics:
   - Documents generated this week/month
   - Time tracked this week/month
   - Billable amount recovered
   - Active clients count

2. Quick actions:
   - Generate new document (quick links)
   - Start time timer
   - Upload document for review
   - View recent contracts

3. Recent activity feed:
   - Last 10 actions taken
   - Timestamp for each

4. Usage statistics:
   - Feature usage breakdown (chart)
   - Most common document types
   - Average time saved per document

5. ROI calculator widget:
   - Shows money saved vs subscription cost
   - "You've saved X hours worth €Y this month"

Use charts library (recharts) for data visualization.
```

---

#### PROMPT 4.2: Template Library (Feature 9)

```
Build Template Library at /dashboard/templates.

Provide:

1. Pre-built templates for each jurisdiction:
   - 10+ templates per country (50+ total)
   - Employment contracts
   - NDAs
   - Service agreements
   - Powers of attorney
   - Etc.

2. Custom template creation:
   - Lawyers can save their own templates
   - Variable placeholders {{party_name}}, {{date}}, etc.
   - Template sharing (optional)

3. Template management:
   - Edit existing templates
   - Duplicate templates
   - Delete templates
   - Categorize by type and jurisdiction

4. Quick generate from template:
   - Select template
   - Fill in variables
   - Generate in seconds

Create Supabase table "templates":
- id, user_id, name, content, variables, jurisdiction, category, is_public, created_at

Seed database with 50+ professional templates.
```

---

#### PROMPT 4.3: Billing & Subscription

```
Integrate Stripe for subscription management.

Implement:

1. Pricing page at /pricing showing:
   - Solo: €29/month
   - Professional: €59/month (highlighted)
   - Firm: €79/month

2. Checkout flow:
   - User selects plan
   - Stripe checkout session
   - Success/cancel redirects

3. User account page at /dashboard/account:
   - Current plan display
   - Upgrade/downgrade buttons
   - Billing history
   - Download invoices
   - Cancel subscription option

4. Feature gating:
   - Check user's subscription tier
   - Restrict features based on plan
   - "Upgrade to access" messages for locked features

5. Stripe webhook handling:
   - Update user subscription status in Supabase
   - Handle payment failures
   - Send confirmation emails

Create Supabase table "subscriptions":
- user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_end

Use Stripe test mode for development.
```

---

#### PROMPT 4.4: Settings & Profile

```
Create user settings page at /dashboard/settings with:

1. Profile section:
   - Name, email
   - Profile photo upload
   - Law firm name
   - Location/jurisdiction preference
   - Preferred language

2. Preferences:
   - Default jurisdiction for documents
   - Default currency (€, BAM, RSD, HRK)
   - Email notifications (toggle on/off)
   - Theme (light/dark)

3. Billing section:
   - Current plan
   - Payment method
   - Billing history
   - Upgrade/downgrade

4. Security:
   - Change password
   - Two-factor authentication (optional)
   - Active sessions
   - API keys (for future integrations)

5. Danger zone:
   - Export data (GDPR compliance)
   - Delete account

Store preferences in Supabase "user_profiles" table.
```

---

## 🎨 SYSTEM PROMPTS FOR OPENAI API

Use these exact system prompts when calling OpenAI API for each feature:

### For Document Generation:
```
You are a specialized legal AI assistant for {jurisdiction} ({country_full_name}).

Your task is to generate a professional {document_type} in {language} that complies with {jurisdiction} law.

CRITICAL INSTRUCTIONS:
1. Use formal legal language appropriate for {jurisdiction}
2. Include all mandatory sections for this document type
3. Cite specific laws when relevant (e.g., "Article X of the Law on Obligations")
4. For Bosnia & Herzegovina: Distinguish between Federation BiH and Republika Srpska laws
5. For Croatia and Slovenia: Include EU law compliance where applicable
6. Format as a proper legal document with:
   - Title
   - Preamble with date and parties
   - Numbered articles
   - Signature blocks
7. Insert placeholders like [PARTY NAME] for user-provided information
8. Include appropriate disclaimers

Generate the complete document now based on these details: {user_input}
```

### For Contract Drafting:
```
You are a legal AI specialized in contract law for Bosnia & Herzegovina, Serbia, Croatia, Montenegro, and Slovenia.

Generate a {contract_type} for {jurisdiction} with these requirements:

STRUCTURE:
- Title in CAPITAL LETTERS
- Preamble with parties, date, location
- Article 1: Subject Matter
- Article 2-3: Obligations of each party
- Article 4: Payment terms
- Article 5: Duration
- Article 6: Termination
- Article 7: Dispute resolution (specify jurisdiction, applicable law)
- Article 8: Force majeure
- Article 9: Amendments
- Article 10: Final provisions
- Signature blocks

LEGAL REQUIREMENTS:
{jurisdiction_specific_requirements}

Details provided by user:
{contract_details}

Generate complete, professional contract now.
```

### For Case Prediction:
```
You are a legal analytics AI for {jurisdiction}.

Analyze this case and predict the outcome based on:
- Historical precedents in {jurisdiction}
- Applicable laws
- Key facts provided
- Current judicial trends

CASE DETAILS:
{case_input}

Provide analysis in this JSON format:
{
  "outcome_probability": "60-70% chance of plaintiff success",
  "confidence_level": "High|Medium|Low",
  "key_factors": ["factor 1", "factor 2", ...],
  "precedents": [
    {"case_name": "X v Y", "year": 2023, "outcome": "...", "relevance": "..."}
  ],
  "strategic_recommendations": ["recommendation 1", ...],
  "risks": ["risk 1", ...]
}

DISCLAIMER: Include that this is a prediction and attorney consultation is required.
```

### For Document Analysis:
```
You are a contract review AI for {jurisdiction}.

Analyze this document and identify:
1. RISKY CLAUSES: Terms unfavorable to client or legally problematic
2. MISSING PROVISIONS: Standard clauses that should be included
3. COMPLIANCE ISSUES: Violations of {jurisdiction} law
4. AMBIGUOUS LANGUAGE: Unclear terms that could cause disputes

Document text:
{document_text}

Return analysis in JSON format:
{
  "risk_score": 1-10,
  "executive_summary": "...",
  "risky_clauses": [{"clause": "...", "risk": "...", "suggestion": "..."}],
  "missing_provisions": ["..."],
  "compliance_issues": ["..."],
  "recommendations": ["..."]
}
```

---

## 🗺️ IMPLEMENTATION ROADMAP

### Week 1-2: Foundation
- ✅ Next.js project setup
- ✅ Supabase auth
- ✅ OpenAI integration
- ✅ Landing page
- ✅ Dashboard shell

### Week 3-4: Core Features (MVP)
- ✅ Feature 3: Document Generation
- ✅ Feature 1: Contract Drafting
- ✅ Basic UI/UX polish

**🎯 GOAL: Launch MVP with 2-3 features to get first users**

### Week 5-6: High-Priority Features
- ✅ Feature 2: Case Prediction
- ✅ Feature 4: Document Analysis
- ✅ Feature 5: Time Tracking

### Week 7-8: Polish & Launch Prep
- ✅ Feature 6: Client Portal
- ✅ Stripe billing
- ✅ Template library
- ✅ Testing & bug fixes

**🎯 GOAL: Launch v1.0 with 6+ features**

### Week 9-12: Growth Features
- ✅ Feature 7: Word integration
- ✅ Feature 8: Analytics
- ✅ Marketing site
- ✅ Customer support setup

---

## ✅ SUCCESS METRICS

Track these to measure success:

**Week 4 (MVP):**
- [ ] 2 features working
- [ ] 5-10 beta testers

**Month 3:**
- [ ] 50 paying users
- [ ] €2,950/month revenue
- [ ] 4.5+ star average rating

**Month 6:**
- [ ] 150 paying users
- [ ] €8,850/month revenue
- [ ] 80%+ retention rate

**Year 1:**
- [ ] 300 paying users
- [ ] €17,700/month revenue
- [ ] Break-even on costs

---

## 💡 TIPS FOR SUCCESS

1. **Start Small**: Build Feature 3 (Document Generation) first. It's easiest to demo and get users.

2. **Test Often**: After each prompt, test the feature thoroughly before moving to the next.

3. **Get Feedback Early**: Launch MVP with 2-3 features. Don't wait for perfection.

4. **Focus on €59 Tier**: This is your sweet spot. Design features around this user.

5. **Localize**: Make sure AI outputs are in correct language (Serbian, Croatian, Slovenian, etc.)

6. **Iterate**: User feedback is gold. Listen and adjust.

7. **Jurisdiction-Specific**: Always ask users which country's law applies. BiH users must specify entity (Federation or RS).

---

## 📚 NEXT STEPS

1. **NOW**: Open Cursor and start with PROMPT 1.1
2. **Set up accounts**:
   - Supabase (database): supabase.com
   - OpenAI API: platform.openai.com
   - Stripe (billing): stripe.com
3. **Follow prompts in order** - don't skip ahead
4. **Test each feature** before moving to next
5. **Get 5-10 beta users** after MVP (Weeks 3-4)
6. **Launch publicly** after Week 8

---

## 🎯 YOUR MAIN GOALS

1. ✅ Build MVP (Features 1, 3) in 3-4 weeks
2. ✅ Get 50 users by Month 3
3. ✅ Reach €2,950/month revenue
4. ✅ Achieve 4.5+ star rating
5. ✅ Expand to all 10 features by Month 6

**You have everything you need. Now start building! 🚀**

---

*For full legal framework details, AI system architecture, and additional technical specifications, refer to the main Strategic Guide document.*
