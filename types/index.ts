// App-level UI/config types (Supabase schema types stay in database.types.ts)

export const FEATURES = [
  { id: "contracts", title: "AI Contract Drafting", description: "Draft and customize contracts with jurisdiction-specific clauses." },
  { id: "prediction", title: "Case Prediction", description: "Estimate case outcomes using precedent and local law." },
  { id: "analysis", title: "Document Analysis", description: "Upload documents for risk and compliance review." },
  { id: "time", title: "Time Tracking", description: "Track billable time and generate invoices." },
  { id: "portal", title: "Client Portal", description: "Secure file sharing and messaging with clients." },
] as const;

export const PRICING_TIERS = [
  { id: "solo", name: "Solo", price: 29, features: ["Features 1, 3, 4, 9"], recommended: false },
  { id: "professional", name: "Professional", price: 59, features: ["All 10 features"], recommended: true },
  { id: "firm", name: "Firm", price: 79, features: ["All features", "Priority support"], recommended: false },
] as const;
