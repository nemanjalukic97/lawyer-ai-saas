// App-level UI/config types (Supabase schema types stay in database.types.ts)

export const FEATURES = [
  { id: "contracts", title: "AI Contract Drafting", description: "Draft and customize contracts with jurisdiction-specific clauses." },
  { id: "prediction", title: "Case Prediction", description: "Estimate case outcomes using precedent and local law." },
  { id: "analysis", title: "Document Analysis", description: "Upload documents for risk and compliance review." },
  { id: "time", title: "Time Tracking", description: "Track billable time and generate invoices." },
  { id: "portal", title: "Client Portal", description: "Secure file sharing and messaging with clients." },
] as const;

export const PRICING_TIERS = [
  {
    id: "solo",
    name: "Solo",
    price: 29,
    features: [
      "Document generation",
      "Contract drafting",
      "Template library",
      "20 AI calls/day",
    ],
    recommended: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: 59,
    features: [
      "Everything in Solo",
      "Case outcome predictions",
      "Document analysis",
      "Time tracking & billing",
      "Client portal",
      "100 AI calls/day",
    ],
    recommended: true,
  },
  {
    id: "firm",
    name: "Firm",
    price: 79,
    features: [
      "Everything in Professional",
      "Priority support",
      "300 AI calls/day",
      "Multiple team members",
    ],
    recommended: false,
  },
] as const;
