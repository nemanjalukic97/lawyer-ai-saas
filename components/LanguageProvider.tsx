"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

export type LanguageCode = "en" | "sr" | "bs" | "hr" | "sl" | "me"

const STORAGE_KEY = "legantis-language"

/** Nested string dictionaries for i18n (interface avoids TS circular type-alias errors). */
export interface Messages {
  [key: string]: string | Messages
}

const MESSAGES: Record<LanguageCode, Messages> = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      login: "Log in",
      getStarted: "Get started",
      dashboard: "Dashboard",
      generate: "Generate",
      conflict: "Conflict check",
      research: "Legal research",
      contracts: "Contracts",
      predictions: "Predictions",
      analyze: "Analyze",
      redline: "Document Redlining",
      time: "Time",
      clients: "Clients",
      matters: "Matters",
      intake: "Intake forms",
      activity: "Activity",
      billing: "Billing",
      settings: "Settings",
      templates: "Templates",
      deadlines: "Deadlines",
      actions: "Actions",
      aiTools: "AI Tools",
      management: "Management",
      logout: "Log out",
      themeToggle: "Toggle light and dark theme",
    },
    auth: {
      signingIn: "Signing in...",
      creatingAccount: "Creating account...",
    },
    redline: {
      header: {
        title: "Document Redlining",
        subtitle:
          "Upload a contract, review AI-suggested changes, and export an updated DOCX.",
      },
      upload: {
        label: "Upload contract",
      },
      instructions: {
        label: "Redlining instructions (optional)",
        placeholder: 'e.g. "Make it more favorable to the employer"',
      },
      actions: {
        analyze: "Analyze & Redline",
        acceptAll: "Accept all",
        rejectAll: "Reject all",
        download: "Download Redlined DOCX",
        saveSession: "Save Session",
        loadSession: "Load",
      },
      changes: {
        title: "Changes",
        accepted: "accepted",
        total: "changes",
        addition: "Addition",
        deletion: "Deletion",
        replacement: "Replacement",
        replacements: "Replacements",
        position: "pos",
        scrollHint: "Scroll to see all changes",
      },
      sessions: {
        title: "Past Sessions",
        empty: "No saved sessions yet.",
        changes: "changes",
      },
      messages: {
        analyzing: "Analyzing...",
        noChanges: "No changes suggested.",
      },
    },
    matters: {
      kicker: "Legantis · Matters",
      title: "Matters",
      subtitle:
        "Organize work by matter and keep contracts, deadlines, time, and billing in one place.",
      actions: {
        new: "New matter",
        create: "Create matter",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        open: "Open",
        close: "Close",
        archive: "Archive",
      },
      fields: {
        title: "Title",
        client: "Client",
        matterType: "Matter type",
        jurisdiction: "Jurisdiction",
        description: "Description",
        openedAt: "Opened date",
        status: "Status",
      },
      filters: {
        status: "Status",
        type: "Type",
        search: "Search",
        searchPlaceholder: "Search by title or client…",
        all: "All",
      },
      select: {
        placeholder: "Select a matter (optional)",
        none: "No matter",
        help:
          "Optional. Links this item to a matter without changing how existing entries are displayed.",
      },
      status: {
        open: "Open",
        on_hold: "On hold",
        closed: "Closed",
        archived: "Archived",
      },
      types: {
        civil: "Civil",
        criminal: "Criminal",
        family: "Family",
        labor: "Labor",
        commercial: "Commercial",
        administrative: "Administrative",
        other: "Other",
      },
      stats: {
        contracts: "Contracts",
        deadlines: "Deadlines",
        unbilledHours: "Unbilled hours",
      },
      tabs: {
        overview: "Overview",
        deadlines: "Deadlines",
        documentsContracts: "Documents & Contracts",
        timeBilling: "Time & Billing",
        predictions: "Predictions",
      },
      detail: {
        kicker: "Legantis · Matter",
        backToList: "Back to matters",
        notFound: "Matter not found.",
        loadFailed: "Failed to load matter.",
        stats: {
          openDeadlines: "Open deadlines",
          totalBilled: "Total billed",
          outstandingPrefix: "Outstanding:",
        },
        recentActivity: {
          title: "Recent activity",
          subtitle: "Latest work linked to this matter.",
          empty: "No activity yet for this matter.",
        },
        deadlines: {
          subtitle: "Deadlines linked to this matter.",
          add: "Add deadline",
          empty: "No deadlines linked yet.",
        },
        contracts: {
          title: "Contracts",
          subtitle: "Contracts linked to this matter.",
          generate: "Generate contract",
          empty: "No contracts linked yet.",
        },
        documents: {
          title: "Documents",
          subtitle: "Documents linked to this matter.",
          analyze: "Analyze document",
          empty: "No documents linked yet.",
        },
        time: {
          title: "Time entries",
          subtitle: "Time entries linked to this matter.",
          log: "Log time",
          empty: "No time entries linked yet.",
        },
        billing: {
          title: "Invoices",
          subtitle: "Invoices linked to this matter.",
          empty: "No invoices linked yet.",
        },
        predictions: {
          subtitle: "Case predictions linked to this matter.",
          new: "New prediction",
          empty: "No predictions linked yet.",
        },
      },
      empty: {
        title: "No matters yet",
        subtitle:
          "Create your first matter to start organizing contracts, deadlines, and time entries.",
      },
    },
    language: {
      label: "Language",
    },
    signature: {
      actions: {
        sendForSignature: "Send for signature",
        cancelRequest: "Cancel request",
        resendEmail: "Resend email",
        copySigningLink: "Copy signing link",
        downloadSignedPdf: "Download signed PDF",
        sendNewRequest: "Send new request",
        signDocument: "Sign document",
      },
      status: {
        none: "None",
        pending: "Pending",
        signed: "Signed",
        expired: "Expired",
        cancelled: "Cancelled",
      },
      dialog: {
        title: "Send for signature",
        signerName: "Signer name",
        signerEmail: "Signer email",
        message: "Message (optional)",
        expiresDays: "Expiry (days)",
        sending: "Sending…",
        send: "Send",
      },
      dashboard: {
        contractsTitle: "Contracts",
        contractsSubtitle: "Send contracts for signature and track their status.",
        refreshHint: "Refresh",
        colContract: "Contract",
        colSignatureStatus: "Signature",
        colActions: "Actions",
        loadingContracts: "Loading contracts…",
        noContracts: "No contracts yet.",
        failedToLoadContracts: "Failed to load contracts.",
        failedToCreate: "Failed to create signature request.",
        failedToCancel: "Failed to cancel request.",
        failedToResend: "Failed to resend email.",
        failedToCopyLink: "Failed to copy signing link.",
        failedToDownload: "Failed to generate download link.",
        statsTitle: "Signatures",
        pendingSignatures: "Pending signatures",
        signedThisMonth: "Signed this month",
      },
      public: {
        loading: "Loading…",
        notFoundTitle: "Signing link not found",
        notFoundBody: "This signing link is invalid or no longer available.",
        expiredTitle: "This signing link has expired",
        expiredBody: "Please contact the sender to request a new signing link.",
        alreadySignedTitle: "This document has already been signed",
        alreadySignedBody: "No further action is required.",
        cancelledTitle: "This signing request was cancelled",
        cancelledBody: "Please contact the sender if you believe this is a mistake.",
        successTitle: "Signed successfully",
        successBody: "You can download your signed PDF below.",
        sentBy: "Sent by",
        unknownSender: "Unknown sender",
        expiresOn: "Expires on",
        reviewTitle: "Review the document",
        checkboxAgree: "I have read and agree to the terms of this contract",
        typedNameLabel: "Type your full name",
        typedNamePlaceholder: "Full name",
        signing: "Signing…",
      },
    },
    rag: {
      title: "Legal sources retrieved",
      articleSingular: "article",
      articlePlural: "articles",
      matchPercent: "{pct}% match",
      translating: "Translating excerpts…",
      paragraphLabel: "para.",
      invalidCitations:
        "⚠ The following citations in the AI response were not found in the retrieved legal database and may be inaccurate:",
      lowConfidence:
        "Low confidence: the retrieved provisions had weak relevance to this query. The applicable law may not yet be in the database.",
    },
    research: {
      kicker: "Legantis · Research",
      title: "Legal Research",
      subtitle:
        "Search the legal knowledge base directly and save research sessions for later.",
      search: {
        label: "Question or keywords",
        placeholder: "e.g. rok zastare za naknadu štete",
      },
      filters: {
        jurisdiction: "Jurisdiction",
        category: "Category",
        language: "Language",
        summaryPrefix: "Filters:",
      },
      language: {
        local: "Local",
        english: "English",
      },
      jurisdictions: {
        all: "All jurisdictions",
        serbia: "Serbia",
        croatia: "Croatia",
        bihFederation: "BiH Federation",
        bihRs: "BiH RS",
        bihBrcko: "BiH Brčko",
        montenegro: "Montenegro",
        slovenia: "Slovenia",
      },
      categories: {
        all: "All categories",
        civil: "Civil",
        commercial: "Commercial",
        labor: "Labor",
        family: "Family",
        criminal: "Criminal",
        administrative: "Administrative",
        procedural: "Procedural",
        constitutional: "Constitutional",
        inheritance: "Inheritance",
        property: "Property",
        confidentiality: "Confidentiality",
        misdemeanor: "Misdemeanor",
      },
      actions: {
        search: "Search",
        searching: "Searching…",
        save: "Save research",
        saving: "Saving…",
      },
      results: {
        title: "Results",
        hint: "Run a search to see the most relevant law articles.",
        empty:
          "No relevant articles found. Try different keywords or broader category.",
        countSuffix: "results",
        confidenceLabel: "Confidence",
        articleLabel: "Article",
      },
      sessions: {
        title: "Recent searches",
        refresh: "Refresh",
        refreshing: "Refreshing…",
        loading: "Loading…",
        empty: "No saved research sessions yet.",
        upgradeHint:
          "Saved research sessions are available on Professional and Firm plans.",
      },
      upgradePrompt: "Upgrade to save research sessions.",
      errors: {
        queryRequired: "Please enter a search query.",
        searchFailed: "Search failed. Please try again.",
        historyFailed: "Could not load recent searches.",
        saveFailed: "Could not save research session.",
      },
    },
    home: {
      hero: {
        trustBadge:
          "Trusted by lawyers across Bosnia, Serbia, Croatia, Montenegro & Slovenia",
        title: "Your AI legal assistant. Built for Balkan law.",
        subtitle:
          "Draft contracts in minutes. Predict outcomes. Manage clients. All in one platform for BiH, Serbia, Croatia, Montenegro, and Slovenia.",
        getStartedFree: "Get started free",
        pricingCta: "See pricing",
        noCreditCard: "No credit card required · Cancel anytime",
        dashboardPreview: "Dashboard preview",
      },
      jurisdictionBar: {
        title: "Built for the legal systems of:",
        countries: {
          ba: "🇧🇦 Bosnia & Herzegovina",
          rs: "🇷🇸 Serbia",
          hr: "🇭🇷 Croatia",
          me: "🇲🇪 Montenegro",
          si: "🇸🇮 Slovenia",
        },
      },
      howItWorks: {
        title: "How Legantis works",
        step1: {
          title: "Sign up in 60 seconds",
          desc: "Create your account, choose your jurisdiction and language. No setup required.",
        },
        step2: {
          title: "Describe what you need",
          desc: "Tell Legantis what to draft, analyze, or research. Works like a conversation.",
        },
        step3: {
          title: "Get lawyer-ready output",
          desc: "Download contracts, predictions, and analysis ready to use or review.",
        },
      },
      features: {
        badge: "16+ AI features",
        title: "Everything you need to work smarter",
        titleNew: "Everything a modern law firm needs",
        subtitle:
          "One platform for drafting, prediction, analysis, time tracking, and client collaboration.",
        seeAll: "See all features →",
        items: {
          contracts: {
            title: "AI Contract Drafting",
            description:
              "Draft and customize contracts with jurisdiction-specific clauses. Get real-time suggestions based on local legal patterns so every version is ready for review faster.",
          },
          prediction: {
            title: "Case Prediction",
            description:
              "Estimate case outcomes using precedent and local law. Compare strategy scenarios with confidence signals and explain options clearly to clients.",
          },
          analysis: {
            title: "Document Analysis",
            description:
              "Upload documents for risk and compliance review. Detect missing clauses, conflicting terms, and exposure points in minutes with structured findings.",
          },
          time: {
            title: "Time Tracking",
            description:
              "Track billable time and generate invoices. Capture work from daily activity to reduce missed hours and keep billing records accurate.",
          },
          portal: {
            title: "Client Portal",
            description:
              "Secure file sharing and messaging with clients. Keep conversations, documents, and status updates in one protected workspace.",
          },
        },
      },
      pricing: {
        noFees: "Simple pricing. No hidden fees.",
        title: "Simple, Transparent Pricing",
        subtitle:
          "Choose the plan that fits your practice. All plans include core AI features.",
        recommended: "Most Popular",
        trustLine:
          "Secure payment via Paddle · GDPR compliant · Cancel anytime",
        comparison: {
          colFeature: "Feature",
          colSolo: "Solo",
          colProfessional: "Professional",
          colFirm: "Firm",
          rowAiCalls: "AI calls/day",
          rowContractTypes: "Contract types",
          rowUsers: "Users",
          rowPriority: "Priority support",
          all: "All",
          usersFirm: "Up to 5",
          yes: "✓",
          no: "✗",
        },
        tiers: {
          solo: {
            name: "Solo",
            features: {
              "Document generation": "Document generation",
              "Contract drafting": "Contract drafting",
              "Template library": "Template library",
              "20 AI calls/day": "20 AI calls/day",
            },
          },
          professional: {
            name: "Professional",
            features: {
              "Everything in Solo": "Everything in Solo",
              "Case outcome predictions": "Case outcome predictions",
              "Document analysis": "Document analysis",
              "Time tracking & billing": "Time tracking & billing",
              "Client portal": "Client portal",
              "100 AI calls/day": "100 AI calls/day",
            },
          },
          firm: {
            name: "Firm",
            features: {
              "Everything in Professional": "Everything in Professional",
              "Priority support": "Priority support",
              "300 AI calls/day": "300 AI calls/day",
              "Multiple team members": "Multiple team members",
            },
          },
        },
        perMonth: "/month",
        cta: "Get started",
      },
      testimonials: {
        badge: "Early access feedback",
        title: "What lawyers are saying",
        disclaimer: "* Early access feedback — names withheld for privacy",
        items: {
          "1": {
            quote:
              "Legantis saved me hours on contract drafting. The jurisdiction-specific clauses are exactly right.",
            name: "Advokat, Sarajevo",
          },
          "2": {
            quote:
              "The case prediction feature helps me set realistic expectations with clients from day one.",
            name: "Odvjetnik, Zagreb",
          },
          "3": {
            quote:
              "I manage deadlines, invoices, and documents all in one place. Finally.",
            name: "Advokat, Beograd",
          },
        },
      },
      faq: {
        title: "Frequently asked questions",
        subtitle:
          "Everything you need to know before getting started with Legantis.",
        panelTitle: "Questions about getting started?",
        panelDescription:
          "Have questions about our AI Legal Assistant? Find answers to the most common questions and discover how our platform can streamline your workflow, enhance decision-making, and improve overall efficiency.",
        items: {
          q1: {
            question: "Is there a free trial available?",
            answer:
              "Yes. You can start with a free trial to explore core features before committing to a paid plan. You do not need a credit card to begin. When the trial ends, you can pick a plan that fits your practice or stop using the service.",
          },
          q2: {
            question: "Which jurisdictions are currently supported?",
            answer:
              "Legantis is tailored for Bosnia and Herzegovina, Serbia, Croatia, Montenegro, and Slovenia. Defaults and suggestions follow local legal practice patterns for those markets. We may add more coverage over time—check this page or your account settings for the latest list.",
          },
          q3: {
            question: "Can I export generated documents?",
            answer:
              "Yes. You can export generated documents in practical formats for internal review and client delivery. Save drafts locally to edit in Word or share PDFs with parties. A clear naming and versioning habit in your firm helps everyone stay aligned.",
          },
          q4: {
            question: "How is client data protected?",
            answer:
              "We use secure access controls and encrypted storage practices to protect legal data and communication. Our infrastructure partners host data in regions described in our Privacy Policy. You control what matter data you store and which team members can access it.",
          },
          q5: {
            question: "Can I cancel or change my plan anytime?",
            answer:
              "Yes. You can upgrade, downgrade, or cancel your plan from billing settings at any time. Plan changes usually apply from the next billing cycle unless we state otherwise. If you cancel, you typically keep access through the period you have already paid for.",
          },
          q6: {
            question: "Is my client data secure?",
            answer:
              "Yes. All data is stored in EU-region Supabase servers, encrypted at rest. We are GDPR compliant.",
          },
          q7: {
            question: "Can I cancel my subscription anytime?",
            answer:
              "Yes. You can cancel at any time from your billing settings. No cancellation fees.",
          },
        },
      },
    },
    footer: {
      taglineLine1:
        "Legantis – AI legal assistant for Bosnia & Herzegovina,",
      taglineLine2: "Serbia, Croatia, Montenegro, and Slovenia.",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      product: "Product",
      legal: "Legal",
      rights: "All rights reserved",
      faqLink: "FAQ",
      privacyPolicy: "Privacy Policy",
      termsOfService: "Terms of Service",
      refundPolicy: "Refund Policy",
      supportEmail: "support@legantis.app",
    },
    generate: {
      header: {
        kicker: "Legantis · Document generation",
        title: "AI legal document generator",
        subtitle:
          "Generate jurisdiction-specific NDAs, employment contracts, powers of attorney, sales contracts, leases, and service agreements for your clients across the Balkans.",
        back: "Back to dashboard",
      },
      documentTypes: {
        nda: "NDA (Non-Disclosure Agreement)",
        employment: "Employment Contract",
        power_of_attorney: "Power of Attorney",
        sales: "Sales Contract",
        lease: "Lease Agreement",
        service: "Service Agreement",
      },
      form: {
        documentType: {
          label: "Document type",
          placeholder: "Select document type",
        },
        jurisdiction: {
          label: "Jurisdiction",
          placeholder: "Select jurisdiction",
        },
        language: {
          label: "Language",
          placeholder: "Select language",
        },
        details: {
          title: "Document details",
          help:
            "Fields can be left blank if not applicable. The AI will fill in standard clauses for the selected jurisdiction and document type, but you must always review the output before use.",
        },
        fields: {
          party1: "Party 1 Name",
          party2: "Party 2 Name",
          date: "Date",
          confidentialDescription: "Confidential Information Description",
          ndaDuration: "Duration",
        },
        actions: {
          generating: "Generating document...",
          generate: "Generate document",
          note: "Uses your plan's AI quota. Results are drafts only and do not constitute legal advice.",
        },
      },
      result: {
        title: "Generated document",
        subtitle:
          "Review, adjust, and localize the generated text before sending to clients or filing with authorities.",
        downloadPdf: "Download PDF",
        downloadDocx: "Download DOCX",
        saved: "Document saved to your workspace.",
        templateLoaded: {
          prefix: "Template loaded:",
          suffix:
            "Fill in the details above and click “Generate document” to create your jurisdiction-specific draft.",
        },
        empty:
          "Your generated document will appear here. Select the document type, jurisdiction, and language, fill in the key details, and click “Generate document” to create a draft tailored to your case.",
      },
      sidebar: {
        title: "Document details",
        empty: "No item selected.",
        viewActivity: "View recent activity",
        loading: "Loading document…",
        status: "Status:",
        created: "Created",
      },
    },
    contracts: {
      header: {
        kicker: "Legantis · Contract drafting",
        title: "AI contract drafting wizard",
        subtitle:
          "Step-by-step contract builder for employment, services, sales, leases, NDAs, and partnerships across the Balkans.",
        back: "Back to dashboard",
      },
      section: {
        stepsTitle: "Contract drafting steps",
        stepsSubtitle:
          "Move through each step to capture parties, commercial terms, and jurisdiction before generating the final draft.",
      },
      contractTypes: {
        employment: "Employment Contract",
        service: "Service Agreement",
        sales: "Sales Contract",
        lease: "Lease/Rental Agreement",
        nda: "NDA",
        partnership: "Partnership Agreement",
      },
      jurisdictions: {
        serbia: "Serbia",
        croatia: "Croatia",
        bih_fbih: "Bosnia & Herzegovina - Federation",
        bih_rs: "Bosnia & Herzegovina - Republika Srpska",
        bih_brcko: "Bosnia & Herzegovina - Brcko District",
        montenegro: "Montenegro",
        slovenia: "Slovenia",
      },
      steps: {
        step1: {
          title: "Contract type",
          lead: "Step {current} of {total}. Choose the type of contract you want to draft.",
          hint: "AI will tailor clauses to this contract type.",
        },
        step2: {
          title: "Jurisdiction",
          lead: "Step {current} of {total}. Select the jurisdiction that will govern this contract.",
        },
        step3: {
          title: "Details",
          lead:
            "Step {current} of {total}. Fill in the key parties and commercial terms. AI will handle the boilerplate and jurisdiction-specific clauses.",
        },
        step4: {
          title: "Review & generate",
          lead:
            "Step {current} of {total}. Review the summary and add any special instructions before generating the contract.",
        },
        step5: {
          title: "Download & save",
          lead:
            "Step {current} of {total}. Download the contract or save it into your Legantis workspace.",
        },
      },
      form: {
        jurisdiction: {
          label: "Jurisdiction",
          placeholder: "Select jurisdiction",
        },
        additionalInstructions: {
          label: "Additional instructions (optional)",
          placeholder:
            "E.g. Include a 3-month probation period, add non-compete clause limited to 12 months and Serbia only, specify arbitration in Belgrade, etc.",
          help:
            "These instructions will be added to the AI prompt but you must always review the final wording before use.",
        },
      },
      fields: {
        employerName: "Employer Name",
        employeeName: "Employee Name",
        jobTitle: "Job Title",
        startDate: "Start Date",
        salary: "Salary",
        workLocation: "Work Location",
        contractDuration: "Contract Duration",
        clientName: "Client Name",
        serviceProviderName: "Service Provider Name",
        serviceDescription: "Service Description",
        paymentAmount: "Payment Amount",
        paymentSchedule: "Payment Schedule",
        endDate: "End Date",
        sellerName: "Seller Name",
        buyerName: "Buyer Name",
        itemDescription: "Item Description",
        purchasePrice: "Purchase Price",
        paymentTerms: "Payment Terms",
        deliveryDate: "Delivery Date",
        landlordName: "Landlord Name",
        tenantName: "Tenant Name",
        propertyAddress: "Property Address",
        monthlyRent: "Monthly Rent",
        depositAmount: "Deposit Amount",
        leaseStartDate: "Lease Start Date",
        leaseDuration: "Lease Duration",
        disclosingParty: "Disclosing Party",
        receivingParty: "Receiving Party",
        purpose: "Purpose",
        confidentialInfoDescription: "Confidential Info Description",
        duration: "Duration",
        partner1Name: "Partner 1 Name",
        partner2Name: "Partner 2 Name",
        businessPurpose: "Business Purpose",
        profitSplit: "Profit Split %",
      },
      summary: {
        contractType: "Contract type",
        jurisdiction: "Jurisdiction",
        keyDetails: "Key details",
        completeEarlierSteps:
          "Complete the earlier steps to see a structured summary of your contract inputs.",
      },
      actions: {
        generating: "Generating contract...",
        generate: "Generate contract",
        note:
          "Uses your plan's AI quota. Output is a draft only and does not constitute legal advice.",
        downloadPdf: "Download PDF",
        downloadDocx: "Download DOCX",
        saveToContracts: "Save to contracts",
      },
      nav: {
        back: "Back",
        next: "Next",
        stepOf: "Step {current} of {total}",
      },
      preview: {
        title: "Contract preview",
        subtitle:
          "Live preview of the generated contract. This is a draft only and must be reviewed by a qualified lawyer before use.",
        empty:
          "Once you generate a contract, the full text will appear here. You can then download it as PDF/DOCX or save it to your Legantis contracts.",
      },
      sidebar: {
        title: "Contract details",
        empty: "No item selected.",
        viewActivity: "View recent activity",
        loading: "Loading contract…",
        status: "Status:",
        created: "Created",
        content: "Content",
        recordNotFound: "Record not found",
      },
      validation: {
        selectContractType: "Please select a contract type.",
        selectJurisdiction: "Please select a jurisdiction.",
        completeDetails: "Please complete the contract details.",
        requiredField: "This field is required.",
        completePreviousSteps: "Please complete the previous steps before generating.",
      },
      errors: {
        generateFailed: "Failed to generate contract. Please try again.",
        mustBeLoggedInToSave: "You must be logged in to save contracts.",
        saveFailed: "Failed to save contract. Please try again.",
      },
      messages: {
        saved: "Contract saved to your workspace.",
      },
      common: {
        emptyValue: "—",
      },
    },
    predictions: {
      header: {
        kicker: "Legantis · Case prediction",
        title: "AI case outcome prediction",
        subtitle:
          "Analyze case facts, evidence strength, and dispute size to get an AI-generated prediction and strategic recommendations for your matters across the Balkans.",
        back: "Back to dashboard",
      },
      form: {
        caseType: {
          label: "Case type",
          placeholder: "Select case type",
        },
        jurisdiction: {
          label: "Jurisdiction",
          placeholder: "Select jurisdiction",
        },
        keyFacts: {
          label: "Key facts of the case",
          placeholder:
            "Describe the key facts of the case, including relevant events, timeline, and circumstances...",
          help:
            "Do not include confidential details that cannot be shared. Focus on the legally relevant facts, procedure, and current status.",
        },
        evidenceQuality: {
          label: "Evidence quality",
          placeholder: "Select evidence quality",
        },
        amountInDispute: {
          label: "Amount in dispute",
          placeholder: "e.g. €50,000",
          help: "Optional, but helps contextualize risk and strategy.",
        },
        additionalContext: {
          label: "Additional context",
          placeholder:
            "Any additional context, procedural history, or specific questions you want addressed...",
        },
        actions: {
          loading: "Predicting outcome...",
          submit: "Predict outcome",
          note:
            "Uses your plan's AI quota. This is AI analysis only and does not replace independent legal judgment.",
        },
      },
      result: {
        title: "Prediction analysis",
        subtitle:
          "Outcome probability, key factors, precedents, recommendations, and risks based on the information you provided.",
        downloadPdf: "Download PDF",
        saved: "Prediction saved to workspace.",
        empty:
          "Your case prediction will appear here after you run an analysis. You will see outcome probability, confidence level, key factors, relevant precedents, strategic recommendations, and risks, together with a clear disclaimer.",
      },
      sidebar: {
        title: "Prediction details",
        empty: "No item selected.",
        viewActivity: "View recent activity",
        loading: "Loading prediction…",
        recordNotFound: "Record not found",
        fallbackCaseName: "Case prediction",
        created: "Created",
        outcomeProbability: "Outcome probability:",
        confidenceLevel: "Confidence level:",
        keyFactors: "Key factors",
        recommendations: "Strategic recommendations",
        fullAnalysis: "Full analysis",
      },
      caseTypes: {
        civil: "Civil Law",
        commercial: "Commercial Law",
        labor: "Labor Law",
        family: "Family Law",
        criminal: "Criminal Law",
        administrative: "Administrative Law",
        misdemeanor: "Misdemeanor Law",
      },
      jurisdictions: {
        serbia: "Serbia",
        croatia: "Croatia",
        bih_fbih: "Bosnia & Herzegovina - Federation",
        bih_rs: "Bosnia & Herzegovina - Republika Srpska",
        bih_brcko: "Bosnia & Herzegovina - Brcko District",
        montenegro: "Montenegro",
        slovenia: "Slovenia",
      },
      evidenceQuality: {
        strong: "Strong",
        medium: "Medium",
        weak: "Weak",
      },
      confidenceLevels: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      errors: {
        missingRequired:
          "Please select a case type and jurisdiction, and provide the key facts of the case.",
        mustBeLoggedInToSave: "You must be logged in to save predictions.",
        generateFailed: "Failed to generate prediction. Please try again.",
      },
      common: {
        notSpecified: "Not specified",
      },
    },
    analyze: {
      header: {
        kicker: "Legantis · Document analysis",
        title: "AI contract analysis & review",
        subtitle:
          "Upload contracts or legal documents for automated review. The AI highlights risky clauses, missing provisions, compliance issues, and provides a clear risk score with actionable recommendations.",
        back: "Back to dashboard",
      },
      uploader: {
        title: "Drag & drop a document here",
        subtitle: "PDF, DOCX, or TXT up to 5MB.",
        chooseFile: "Choose file",
        extracting: "Extracting text...",
      },
      form: {
        jurisdiction: {
          label: "Jurisdiction",
          placeholder: "Select jurisdiction",
        },
        focus: {
          label: "Analysis focus (optional)",
          placeholder: "Select analysis type",
          help:
            "General Review is a balanced overview. Other options steer the AI toward specific types of issues.",
        },
        extractedPreview: {
          label: "Extracted text preview",
          placeholder:
            "Once you upload a document, its extracted text will appear here. You can edit it before analysis if needed.",
          help:
            "Do not paste or upload documents containing information you are not permitted to share. Remove client-identifying details where required.",
        },
        actions: {
          loading: "Analyzing document...",
          submit: "Analyze document",
          note:
            "Uses your plan's AI quota. This is AI analysis only and does not replace independent legal judgment.",
        },
      },
      result: {
        title: "Analysis report",
        subtitle:
          "Executive summary, risk score, risky clauses, missing provisions, compliance issues, and recommendations for the uploaded document.",
        downloadPdf: "Download PDF",
        saved: "Analysis saved to workspace.",
        empty:
          "Your document analysis will appear here after you upload a file and run an analysis. You'll see an executive summary, overall risk score, and a breakdown of risky clauses, missing provisions, compliance issues, and recommended changes, presented in clear language suitable for lawyers.",
      },
      sidebar: {
        title: "Analysis details",
        empty: "No item selected.",
        viewActivity: "View recent activity",
        loading: "Loading analysis…",
        recordNotFound: "Record not found",
        riskScore: "Risk score:",
        analyzed: "Analyzed",
        executiveSummary: "Executive summary",
        riskyClauses: "Risky clauses",
        recommendations: "Recommendations",
      },
      focus: {
        general: "General Review",
        risk: "Risk Assessment",
        compliance: "Compliance Check",
        missing: "Missing Clauses",
      },
      jurisdictions: {
        serbia: "Serbia",
        croatia: "Croatia",
        bih_fbih: "Bosnia & Herzegovina - Federation",
        bih_rs: "Bosnia & Herzegovina - Republika Srpska",
        bih_brcko: "Bosnia & Herzegovina - Brcko District",
        montenegro: "Montenegro",
        slovenia: "Slovenia",
      },
      errors: {
        fileTooLarge: "File is too large. Maximum allowed size is 5MB.",
        unsupportedFileType: "Unsupported file type. Please upload a PDF, DOCX, or TXT file.",
        noReadableText:
          "We couldn't extract any readable text from this document. Please try a different file or convert it to TXT/DOCX.",
        extractFailed: "Failed to extract text from the selected file.",
        uploadAndWait:
          "Please upload a supported document and wait for text extraction before running analysis.",
        mustBeLoggedInToSave: "You must be logged in to save analyses.",
        analyzeFailed: "Failed to analyze document. Please try again.",
      },
      common: {
        notSpecified: "Not specified",
        notAvailable: "Not available",
      },
    },
    time: {
      header: {
        kicker: "Legantis · Time tracking",
        title: "Time tracking & billing",
        subtitle:
          "Log billable hours by client and matter, and keep track of your unbilled time and billable amounts in one place.",
        back: "Back to dashboard",
      },
      tabs: {
        entries: "Time entries",
        invoices: "Invoices",
      },
      invoices: {
        title: "Invoices",
        subtitle:
          "Send invoices by email and track bank-transfer payments.",
        refresh: "Refresh",
        loading: "Loading…",
        loadingList: "Loading invoices…",
        empty:
          "No invoices yet. (Invoice creation will appear here once generated from time entries.)",
        duePrefix: "Due",
        clientFallback: "Client",
        actions: {
          downloadPdf: "Download PDF",
          send: "Send to client",
          sending: "Sending…",
          markPaid: "Mark as paid",
          markOverdue: "Mark overdue",
        },
        status: {
          draft: "Draft",
          sent: "Sent",
          paid: "Paid",
          overdue: "Overdue",
          cancelled: "Cancelled",
        },
        errors: {
          mustBeLoggedIn: "You must be logged in.",
          loadFailed: "Failed to load invoices.",
          actionFailed: "Action failed",
        },
      },
      invoiceGenerate: {
        button: "Generate invoice",
        dialogTitle: "Generate invoice",
        dueDate: "Due date",
        notes: "Notes",
        notesPlaceholder: "Optional notes for the invoice…",
        paymentReference: "Payment reference",
        bankAccount: "Bank account",
        bankPlaceholder: "Select bank account",
        totalLabel: "Total",
        confirm: "Create invoice",
        cancel: "Cancel",
        generating: "Creating…",
        successToast: "Invoice created.",
        bankingWarningBefore: "Please add your bank details in",
        bankingSettingsLink: "Settings → Banking",
        bankingWarningAfter: " before sending invoices.",
        errors: {
          createFailed: "Could not create invoice. Please try again.",
        },
      },
      form: {
        matterName: {
          label: "Client / Matter name",
          placeholder: "e.g. ACME d.o.o. – Employment dispute",
        },
        description: {
          label: "Description of work",
          placeholder:
            "e.g. Drafting statement of claim, reviewing evidence, preparing for hearing...",
        },
        date: {
          label: "Date",
        },
        hoursWorked: {
          label: "Hours worked",
          placeholder: "e.g. 1.5",
          help: "Use 0.25 increments (15 minutes).",
        },
        hourlyRate: {
          label: "Hourly rate",
          placeholder: "e.g. 150",
        },
        activityType: {
          label: "Activity type",
        },
        currency: {
          label: "Currency",
        },
        total: "Total:",
        totalHelp: "Calculated as hours × hourly rate. Amount is stored as a numeric value.",
        actions: {
          loading: "Logging time...",
          submit: "Log time",
        },
      },
      list: {
        title: "Time entries",
        subtitle: "Review your logged time, track unbilled hours, and prepare for invoicing.",
        loading: "Loading time entries...",
        emptyTitle: "No time entries yet.",
        emptySubtitle: "Log your first time entry using the form above.",
      },
      stats: {
        unbilledHours: "Total unbilled hours",
        unbilledAmountEur: "Unbilled amount (EUR)",
        entriesThisMonth: "Entries this month",
      },
      activityTypes: {
        drafting: "Drafting",
        reviewing: "Reviewing",
        research: "Research",
        meeting: "Meeting",
        court: "Court appearance",
        admin: "Administrative",
        other: "Other",
      },
      currencies: {
        eur: "EUR – Euro",
        usd: "USD – US Dollar",
        bam: "BAM – Convertible Mark",
        rsd: "RSD – Serbian Dinar",
        hrk: "HRK – Croatian Kuna",
      },
      status: {
        billed: "Billed",
        unbilled: "Unbilled",
      },
      actions: {
        deleteAria: "Delete time entry",
      },
      messages: {
        logged: "Time entry logged successfully.",
      },
      errors: {
        mustBeLoggedInToView: "You must be logged in to view time entries.",
        mustBeLoggedInToCreate: "You must be logged in to log time entries.",
        matterAndDescriptionRequired: "Matter name and description are required.",
        descriptionRequired: "Description of work is required.",
        clientRequired: "Please select a client",
        dateRequired: "Date is required.",
        invalidHoursOrRate:
          "Please provide valid hours (0.25–24) and a non-negative hourly rate.",
        createFailed: "Failed to log time entry. Please try again.",
      },
      common: {
        emptyValue: "—",
      },
    },
    clients: {
      header: {
        kicker: "Legantis · Clients",
        title: "Clients",
        subtitle:
          "Manage your client list, store key contact details, and prepare for secure client-portal access.",
        back: "Back to dashboard",
      },
      actions: {
        addClient: "Add client",
        cancel: "Cancel",
        deleteAria: "Delete client",
      },
      conflictPrecheck: {
        title: "Conflict of interest check",
        subtitle:
          "Before adding a new client, run a quick conflict check across your workspace.",
        name: {
          label: "Potential client name",
          placeholder: "e.g. John Doe / Johnson Ltd",
        },
        actions: {
          check: "Run conflict check",
          checking: "Checking…",
          continue: "Continue to client details",
          proceedAnyway: "Proceed anyway",
          startOver: "Start over",
        },
        clear: {
          title: "No conflicts found — safe to proceed",
          body: "No matching clients, contracts, or cases were found in your workspace.",
        },
        conflict: {
          title: "Potential conflict found",
          body: "Review the matches below. You can proceed only after confirming you have reviewed the potential conflict.",
        },
        override: {
          label:
            "I have reviewed the potential conflict and confirm it is safe to proceed.",
        },
      },
      form: {
        fullName: {
          label: "Full name",
          placeholder: "e.g. Ana Kovač",
        },
        email: {
          label: "Email address",
          placeholder: "ana.kovac@example.com",
        },
        phone: {
          label: "Phone number",
          placeholder: "+387 61 000 000",
        },
        companyName: {
          label: "Company name",
          placeholder: "e.g. ACME d.o.o.",
        },
        notes: {
          label: "Notes",
          placeholder:
            "Key information about this client, typical matters, preferences...",
        },
        actions: {
          saving: "Saving client...",
          save: "Save client",
        },
        errors: {
          nameAndEmailRequired: "Full name and email are required.",
          mustBeLoggedInToAdd: "You must be logged in to add clients.",
          createFailed: "Failed to add client. Please try again.",
        },
      },
      list: {
        title: "Client list",
        subtitle: "All clients you have added to your workspace.",
        sortBy: "Sort by",
        sort: {
          name: "Name",
          dateAdded: "Date added",
        },
        sortAscending: "Sort ascending",
        sortDescending: "Sort descending",
        loading: "Loading clients...",
        emptyTitle: "No clients yet.",
        emptySubtitle: "Add your first client using the “Add client” button above.",
        added: "Added",
      },
      sidebar: {
        title: "Client details",
        empty: "No item selected.",
        viewActivity: "View recent activity",
        loading: "Loading client…",
        recordNotFound: "Record not found",
        email: "Email:",
        phone: "Phone:",
        address: "Address:",
        defaultRate: "Default rate:",
        status: "Status:",
      },
      messages: {
        added: "Client added successfully.",
      },
      errors: {
        mustBeLoggedInToView: "You must be logged in to view clients.",
        loadFailed: "Failed to load clients. Please try again.",
      },
      common: {
        notSet: "Not set",
      },
    },
    conflict: {
      header: {
        kicker: "Legantis · Conflict check",
        title: "Conflict of interest check",
        subtitle:
          "Search across clients, contracts, and case notes to identify potential conflicts before accepting a new client.",
      },
      form: {
        query: {
          label: "Person or company name",
          placeholder: "Start typing a name…",
          help:
            "Matches are case-insensitive and support partial names (e.g. “John” matches “John Doe” and “Johnson Ltd”).",
        },
        actions: {
          check: "Check conflicts",
          checking: "Checking…",
        },
      },
      errors: {
        queryRequired: "Please enter a name to search.",
        searchFailed: "Conflict check failed. Please try again.",
        historyFailed: "Failed to load conflict check history.",
      },
      results: {
        matchCountSuffix: "matches",
        clearBadge: "Clear",
        clearTitle: "No conflicts found",
        clearBody: "No matches were found in your workspace. You can proceed.",
        conflictBadge: "Review",
        conflictTitle: "Potential conflict detected",
        conflictBody:
          "Matches were found in your workspace. Review the details before proceeding.",
        groups: {
          clients: "Clients",
          contracts: "Contracts",
          cases: "Cases",
        },
      },
      history: {
        title: "Recent checks",
        refresh: "Refresh",
        refreshing: "Refreshing…",
        loading: "Loading history…",
        empty: "No conflict checks yet.",
        upgradeHint:
          "Conflict check history is available on Professional and Firm plans.",
        badges: {
          clear: "Clear",
          conflict: "Conflict",
        },
        overrideLine: "Proceeded despite potential conflict (override).",
      },
    },
    activity: {
      header: {
        title: "Recent activity",
        subtitle:
          "View and open your recent documents, contracts, predictions, analyses, and clients.",
      },
      tabs: {
        feed: "Feed",
        audit: "Audit log",
      },
      audit: {
        empty: "No audit log entries yet.",
      },
      filters: {
        all: "All",
        matters: "Matters",
        documents: "Documents",
        contracts: "Contracts",
        predictions: "Predictions",
        analyses: "Analyses",
        clients: "Clients",
      },
      types: {
        matter: "Matter",
        contract: "Contract",
        document: "Document",
        analysis: "Document analysis",
        prediction: "Case prediction",
        client: "Client",
      },
      list: {
        empty: "No recent activity for this filter.",
      },
      actions: {
        loadMore: "Load more",
      },
    },
    billing: {
      header: {
        title: "Billing",
        subtitle: "Manage your plan and subscription.",
      },
      messages: {
        subscriptionUpdated: "Subscription updated successfully.",
      },
      currentPlan: {
        title: "Current plan",
        workspace: "Your workspace",
        workspaceSuffix: "workspace",
        trialEndsPrefix: "Trial ends in",
        dayOne: "day",
        dayMany: "days",
        statusPrefix: "Your subscription status is",
        noPaidPlanBadge: "No paid plan",
        freeHint:
          "You are on the free tier (document generation only). Choose a plan below to unlock the full product.",
      },
      actions: {
        manageSubscription: "Manage subscription",
        openingPortal: "Opening portal...",
        reactivate: "Reactivate",
        currentPlan: "Current plan",
        upgrade: "Upgrade",
        downgrade: "Downgrade",
        startingCheckout: "Starting checkout...",
        subscribe: "Subscribe",
      },
      badges: {
        recommended: "Recommended",
      },
      tiers: {
        features: {
          documentGeneration: "Document generation",
          contractDrafting: "Contract drafting",
          templateLibrary: "Template library",
          aiCalls20: "20 AI calls/day",
          everythingInSolo: "Everything in Solo",
          caseOutcomePredictions: "Case outcome predictions",
          documentAnalysis: "Document analysis",
          timeTrackingBilling: "Time tracking & billing",
          clientPortal: "Client portal",
          aiCalls100: "100 AI calls/day",
          everythingInProfessional: "Everything in Professional",
          prioritySupport: "Priority support",
          aiCalls300: "300 AI calls/day",
          multipleTeamMembers: "Multiple team members",
        },
      },
      footer: {
        paddleEnvironment: "Paddle environment:",
        paddleHint:
          "If the checkout button does nothing, confirm your Paddle client token is set.",
      },
      errors: {
        missingTransactionId: "Missing transactionId",
        paddleNotInitialized: "Paddle is not initialized",
        paddleCheckoutUnavailable: "Paddle checkout is unavailable",
        checkoutFailed: "Checkout failed",
        portalOpenFailed: "Could not open the billing portal.",
      },
      common: {
        unknown: "unknown",
      },
    },
    settings: {
      header: {
        title: "Settings",
        subtitle: "Manage your profile, preferences, security, and account lifecycle.",
      },
      tabs: {
        profile: "Profile",
        preferences: "Preferences",
        banking: "Banking",
        security: "Security",
        danger: "Danger Zone",
      },
      banking: {
        title: "Bank transfer details",
        introAccount:
          "These details will be used on invoices as payment instructions. Saved for your account.",
        introFirm:
          "These details will be used on invoices as payment instructions. Saved at firm level.",
        bankName: {
          label: "Bank name",
          placeholder: "e.g. UniCredit Bank",
        },
        accountHolder: {
          label: "Account holder",
          placeholder: "e.g. Your firm name",
        },
        iban: {
          label: "IBAN",
          placeholder: "XX00 0000 0000 0000 0000",
        },
        swift: {
          label: "SWIFT/BIC (optional)",
          placeholder: "e.g. UNCRBA22",
        },
        defaultForInvoices: {
          title: "Default for new invoices",
          subtitle:
            "When enabled, this account will be auto-filled on newly created invoices.",
        },
        save: "Save banking details",
        saving: "Saving...",
        messageSaved: "Banking details saved.",
        errors: {
          loadFailed: "Failed to load banking settings",
          saveFailed: "Failed to save banking settings",
        },
      },
      profile: {
        title: "Profile",
        fullName: {
          label: "Full name",
          placeholder: "Your full name",
        },
        email: {
          label: "Email",
        },
        lawFirmName: {
          label: "Law firm name",
          placeholder: "Your law firm (optional)",
        },
        preferredJurisdiction: {
          label: "Preferred jurisdiction",
          placeholder: "Select jurisdiction",
        },
        preferredLanguage: {
          label: "Preferred language",
          placeholder: "Select language",
        },
        actions: {
          save: "Save profile",
        },
      },
      preferences: {
        title: "Preferences",
        defaultJurisdiction: {
          label: "Default jurisdiction",
          placeholder: "Select default jurisdiction",
        },
        currency: {
          label: "Default currency",
        },
        theme: {
          label: "Theme",
          light: "Light",
          dark: "Dark",
        },
        emailNotifications: {
          title: "Email notifications",
          subtitle:
            "Receive important updates about billing, activity, and product changes.",
        },
        note:
          "Theme is saved as soon as you change it. Currency and notification preferences are being wired into billing and activity alerts. Some options are currently informational only and may not affect existing behavior yet.",
        actions: {
          save: "Save preferences",
        },
      },
      security: {
        title: "Change password",
        currentPassword: {
          label: "Current password",
        },
        newPassword: {
          label: "New password",
        },
        confirmPassword: {
          label: "Confirm new password",
        },
        actions: {
          save: "Save password",
        },
        messages: {
          passwordUpdated: "Password updated successfully.",
        },
        errors: {
          passwordTooShort: "New password must be at least 8 characters long.",
          passwordsDoNotMatch: "New password and confirmation do not match.",
          missingEmail: "Missing user email for password change.",
          currentPasswordIncorrect: "Current password is incorrect.",
          failedToChangePassword: "Failed to change password",
        },
      },
      plan: {
        title: "Current plan",
        tierLabel: "Subscription tier:",
        statusLabel: "Status:",
        tierNone: "None (free — documents only)",
        statusNone: "Not subscribed",
        note: "Manage billing, invoices, and upgrades from the dedicated billing page.",
        actions: {
          manageBilling: "Manage billing",
        },
      },
      danger: {
        title: "Danger Zone",
        export: {
          title: "Export all my data (GDPR)",
          subtitle:
            "Download a JSON export of your profile, contracts, documents, predictions, analyses, clients, and time entries for your own records.",
          preparing: "Preparing export...",
          action: "Export all my data (GDPR)",
        },
        delete: {
          title: "Delete account",
          subtitle:
            "This will mark your profile as deleted and sign you out. This action cannot be undone.",
          action: "Delete my account",
          dialogTitle: "Delete account",
          dialogDescription:
            "Are you sure? This cannot be undone. Your profile will be marked as deleted and you will be signed out.",
          confirm: "Delete account",
        },
        errors: {
          failedToExportData: "Failed to export data",
          failedToDeleteAccount: "Failed to delete account",
        },
      },
      jurisdictions: {
        serbia: "Serbia",
        croatia: "Croatia",
        bih_fbih: "Bosnia & Herzegovina – Federation",
        bih_rs: "Bosnia & Herzegovina – Republika Srpska",
        bih_brcko: "Bosnia & Herzegovina – Brcko District",
        montenegro: "Montenegro",
        slovenia: "Slovenia",
      },
      languages: {
        Serbian: "Serbian",
        Croatian: "Croatian",
        Bosnian: "Bosnian",
        Montenegrin: "Montenegrin",
        Slovenian: "Slovenian",
        English: "English",
      },
      messages: {
        profileUpdated: "Profile updated successfully.",
        preferencesSaved:
          "Preferences saved. Some options are not yet persisted (coming soon).",
      },
      errors: {
        failedToSaveProfile: "Failed to save profile",
        failedToSavePreferences: "Failed to save preferences",
      },
      common: {
        saving: "Saving...",
        cancel: "Cancel",
        deleting: "Deleting...",
      },
    },
    templates: {
      header: {
        kicker: "Legantis · Template library",
        title: "Pre-built legal templates",
        subtitle:
          "Browse curated, jurisdiction-specific templates and jump straight into AI-assisted drafting.",
      },
      filters: {
        documentType: {
          label: "Document type",
          all: "All document types",
        },
        jurisdiction: {
          label: "Jurisdiction",
          all: "All jurisdictions",
        },
        search: {
          label: "Search",
          placeholder: "Search by name or keyword...",
        },
      },
      documentTypes: {
        nda: "NDA",
        employment: "Employment",
        power_of_attorney: "Power of Attorney",
        sales: "Sales",
        lease: "Lease",
        service: "Service Agreement",
        salesAgreement: "Sales Agreement",
        leaseAgreement: "Lease Agreement",
        serviceAgreement: "Service Agreement",
        legalDocument: "Legal Document",
      },
      jurisdictions: {
        serbia: "Serbia",
        croatia: "Croatia",
        bih_fbih: "Bosnia & Herzegovina – Federation",
        bih_rs: "Bosnia & Herzegovina – Republika Srpska",
        bih_brcko: "Bosnia & Herzegovina – Brcko District",
        montenegro: "Montenegro",
        slovenia: "Slovenia",
      },
      list: {
        empty:
          "No templates match your filters. Try adjusting document type, jurisdiction, or search terms.",
      },
      preview: {
        title: "Template preview",
        subtitle: "Review the base text before generating a tailored draft.",
        empty: "Select a template from the list to see details and content preview here.",
      },
      actions: {
        goToGenerator: "Go to generator",
        preview: "Preview",
        useTemplate: "Use this template",
      },
      common: {
        notSpecified: "Not specified",
        translating: "Translating template…",
      },
      library: {
        // NOTE: These keys translate seeded templates by id at runtime.
        // If a template has no translation here, UI falls back to DB title/description/content.
      },
    },
    dashboard: {
      featureUsage: {
        title: "Feature usage (recent)",
        labels: {
          case_prediction: "Case Prediction",
          contract_generation: "Contract Gen.",
          document_generation: "Doc. Generation",
          document_analysis: "Doc. Analysis",
          contract_drafting: "Contract Draft",
          legal_research: "Research",
          conflict_check: "Conflict Check",
          document_redlining: "Redlining",
        },
      },
      header: {
        kicker: "Legantis dashboard",
        welcome: "Welcome back,",
        planSuffix: "plan",
        noPaidPlan: "No paid plan (documents only)",
        statusNotSubscribed: "not subscribed",
      },
      planTier: {
        solo: "Solo",
        professional: "Professional",
        firm: "Firm",
      },
      stats: {
        clients: {
          title: "Clients",
          subtitle: "Active clients in your workspace",
        },
        contracts: {
          title: "Contracts",
          subtitle: "Drafted & signed contracts",
        },
        documents: {
          title: "Documents & analyses",
          subtitle: "Generated documents and risk analyses",
        },
        predictions: {
          title: "Case predictions",
          subtitle: "Outcome predictions run so far",
        },
      },
      overview: {
        upgrade: "Upgrade",
        lockedHint: "Upgrade to unlock this feature.",
        notAvailable: "Not available",
        subscribeSolo: "Subscribe to Solo plan →",
        subscribeProfessional: "Subscribe to Professional plan →",
        subscribeFirm: "Subscribe to Firm plan →",
        stats: {
          totalClients: "Total clients",
          activeMatters: "Active matters",
          pendingSignatures: "Pending signatures",
          unbilledHours: "Unbilled hours",
        },
        cards: {
          analysis: {
            title: "Document analysis",
            description: "Extract key clauses and risks from uploaded documents.",
          },
          matters: {
            description: "Manage matters, documents, and linked work.",
          },
          time: {
            title: "Time & invoices",
            description: "Track hours and keep billing accurate.",
          },
          deadlines: {
            title: "Upcoming deadlines",
            subtitle: "Next items requiring your attention.",
            description: "Track deadlines and stay ahead of due dates.",
          },
          activity: {
            subtitle: "Latest changes across your workspace.",
          },
          invoices: {
            title: "Invoice stats",
            subtitle: "Outstanding and paid totals.",
            outstanding: "Outstanding",
            paidThisMonth: "Paid this month",
          },
        },
      },
      actions: {
        title: "Quick actions",
        subtitle: "Jump straight into key Legantis features.",
        open: "Open",
        generate: {
          title: "Generate Document",
          description: "Create NDAs, contracts, and legal documents with AI.",
        },
        conflict: {
          title: "Conflict Check",
          description:
            "Check for conflicts of interest before taking a new client.",
        },
        research: {
          title: "Legal Research",
          description: "Search statutes across jurisdictions with confidence scores.",
        },
        contract: {
          title: "Draft Contract",
          description:
            "Multi-step contract wizard with jurisdiction-specific clauses.",
        },
        predict: {
          title: "Predict Case Outcome",
          description:
            "AI analysis of case success probability based on precedents.",
        },
        clients: {
          title: "Clients",
          description: "Manage client contacts and prepare portal access.",
        },
        templates: {
          title: "Template Library",
          description:
            "Browse pre-built, jurisdiction-specific templates and start drafting from a strong baseline.",
        },
      },
      workspace: {
        unnamed: "Your Legantis workspace",
        subtitle: "Overview of activity across contracts, documents, and cases.",
        billing: {
          title: "Billing & plans",
          trialPrefix: "Trial ends",
          freeTierLine: "No paid plan — document generation only",
        },
        jurisdiction: {
          title: "Jurisdiction focus",
          subtitle: "Used to tailor templates, clauses, and predictions.",
        },
        invoices: {
          title: "Billing documents",
          countSuffix: "invoices",
          subtitle: "Generated from tracked time and clients.",
        },
      },
      usage: {
        title: "AI usage snapshot",
        subtitle:
          "Recent Legantis activity across contract generation, analysis, and predictions.",
        tokens: "Tokens used (recent)",
        cost: "Estimated cost",
        detailHint:
          "Detailed per-feature usage will appear here as you start using contract generation, case prediction, and document analysis.",
        featuresTitle: "Feature usage (recent)",
        featuresEmpty: "No feature usage recorded yet.",
      },
      roi: {
        title: "ROI this month",
        hoursPrefix: "You've saved approximately",
        hoursSuffix: "of work this month.",
        valuePrefix: "That time is worth about",
        valueMiddle: "compared to your",
        ratioPrefix: "Approximate ROI:",
        ratioSuffix: "your subscription.",
        freeTierHint:
          "Subscribe to a paid plan to compare savings with subscription cost.",
      },
      activity: {
        title: "Recent activity",
        empty: "No recent activity yet.",
      },
      activeMatters: {
        title: "Active matters",
        subtitle: "Open matters recently updated.",
        openCountLabel: "Open matters:",
        updatedPrefix: "Updated:",
        viewAll: "View all matters",
        empty: "No open matters yet.",
      },
      upcomingDeadlines: {
        title: "Upcoming deadlines",
        subtitle: "Your next obligations and events.",
        viewAll: "View all",
        empty: "No upcoming deadlines.",
      },
    },
    intake: {
      kicker: "Legantis · Intake",
      title: "Client intake forms",
      subtitle: "Share a link so new clients submit their details before you meet.",
      loading: "Loading…",
      empty: "No intake forms yet. Create one to get started.",
      upgrade: {
        body:
          "Client intake forms are available on Professional and Firm plans. Upgrade to generate shareable forms and convert submissions into clients.",
        cta: "View plans",
      },
      errors: {
        mustBeLoggedIn: "You must be logged in.",
        loadFailed: "Could not load intake forms.",
        toggleFailed: "Could not update the form.",
        formNotFound: "Form not found.",
      },
      list: {
        submissions: "Submissions: {n}",
        active: "Active",
        copyLink: "Copy link",
        copied: "Copied",
        viewSubmissions: "Submissions",
        edit: "Edit form",
      },
      actions: {
        create: "Create new intake form",
      },
      editor: {
        back: "Back to intake forms",
        titleNew: "New intake form",
        titleEdit: "Edit intake form",
        subtitle:
          "Set a title and choose optional fields. Core questions (name, email, case type, jurisdiction, contract type needed, matter summary) are always included on the public form.",
        formTitle: "Form title",
        description: "Description (optional)",
        optionalTitle: "Optional extra fields",
        optionalHint:
          "When enabled, clients will see these fields on the public form.",
        optional: {
          company: "Company name",
          address: "Address",
          notes: "Notes",
        },
        save: "Save",
        saving: "Saving…",
        errors: {
          titleRequired: "Please enter a form title.",
          saveFailed: "Could not save the form.",
        },
      },
      public: {
        notFoundTitle: "Form not available",
        notFoundBody: "This link may be inactive or incorrect.",
        thankYouTitle: "Thank you",
        thankYouBody:
          "Your information has been submitted. Your lawyer will be in touch soon.",
        fullName: "Full name",
        email: "Email",
        phone: "Phone (optional)",
        caseType: "Case type",
        jurisdiction: "Jurisdiction",
        contractTypeNeeded: "Type of contract needed",
        matterDescription: "Brief description of matter (optional)",
        company: "Company name",
        address: "Address",
        notes: "Notes",
        selectPlaceholder: "Select…",
        submit: "Submit",
        submitting: "Submitting…",
        caseTypes: {
          civil: "Civil",
          criminal: "Criminal",
          family: "Family",
          commercial: "Commercial",
          labor: "Labor",
          administrative: "Administrative",
          other: "Other",
        },
        jurisdictions: {
          bih_fbih: "BiH – Federation",
          bih_rs: "BiH – Republika Srpska",
          bih_brcko: "BiH – Brčko District",
          serbia: "Serbia",
          croatia: "Croatia",
          montenegro: "Montenegro",
          slovenia: "Slovenia",
        },
        contractTypes: {
          employment: "Employment Contract",
          service: "Service Agreement",
          sales: "Sales Contract",
          lease: "Lease/Rental Agreement",
          nda: "NDA / Non-Disclosure Agreement",
          partnership: "Partnership Agreement",
        },
        errors: {
          nameEmail: "Please enter your full name and email.",
          caseAndJurisdiction: "Please select case type and jurisdiction.",
          contractTypeNeeded: "Please select the type of contract needed.",
          submitFailed: "Could not submit. Please try again.",
        },
      },
      submissions: {
        title: "Intake submissions",
        back: "Back to intake forms",
        empty: "No submissions yet.",
        convert: "Convert to client",
        archive: "Archive",
        openClient: "Open client",
        col: {
          submitted: "Submitted",
          contact: "Client",
          caseType: "Case type",
          status: "Status",
          actions: "Actions",
        },
        status: {
          pending: "Pending",
          converted: "Converted",
          archived: "Archived",
        },
        messages: {
          linkedExisting:
            "This email already exists as a client. Submission linked to existing client record.",
          created: "Client created successfully.",
        },
        errors: {
          missingNameEmail: "Submission is missing name or email.",
          convertFailed: "Could not create the client.",
          archiveFailed: "Could not archive this submission.",
        },
      },
    },
    deadlines: {
      kicker: "Legantis · Deadlines",
      title: "Deadlines & calendar",
      subtitle: "Track hearings, filings, and matter dates.",
      loading: "Loading…",
      upgrade: {
        body:
          "Deadline tracking is available on Professional and Firm plans. Upgrade to manage dates in a list and calendar.",
        cta: "View plans",
      },
      errors: {
        mustBeLoggedIn: "You must be logged in.",
        loadFailed: "Could not load deadlines.",
        updateFailed: "Could not update the deadline.",
        deleteFailed: "Could not delete the deadline.",
      },
      tabs: {
        list: "List view",
        calendar: "Calendar view",
      },
      filters: {
        all: "All",
        upcoming: "Upcoming",
        overdue: "Overdue",
        completed: "Completed",
      },
      list: {
        empty: "No deadlines match this filter.",
        done: "Done",
        overdueDays: "{n} days overdue",
        dueToday: "Due today",
        inDays: "in {n} days",
      },
      types: {
        court_hearing: "Court hearing",
        filing_deadline: "Filing deadline",
        appeal_deadline: "Appeal deadline",
        statute_of_limitations: "Statute of limitations",
        contract_expiry: "Contract expiry",
        client_meeting: "Client meeting",
        payment_due: "Payment due",
        other: "Other",
      },
      actions: {
        add: "Add deadline",
        complete: "Mark complete",
        edit: "Edit",
        delete: "Delete",
      },
      dialog: {
        titleNew: "New deadline",
        titleEdit: "Edit deadline",
        cancel: "Cancel",
        save: "Save",
        saving: "Saving…",
        fields: {
          title: "Title",
          type: "Deadline type",
          dueDate: "Due date",
          dueTime: "Due time (optional)",
          client: "Client (optional)",
          description: "Description (optional)",
          reminder: "Reminder (days before)",
        },
        clientSearchPlaceholder: "Search clients…",
        clientPlaceholder: "Select a client",
        noClient: "No client",
        errors: {
          titleDate: "Title and due date are required.",
          saveFailed: "Could not save the deadline.",
        },
      },
      calendar: {
        prev: "Previous month",
        next: "Next month",
        closeDay: "Close",
        weekdayShort: {
          sun: "Sun",
          mon: "Mon",
          tue: "Tue",
          wed: "Wed",
          thu: "Thu",
          fri: "Fri",
          sat: "Sat",
        },
      },
    },
  },
  sr: {
    nav: {
      features: "Funkcionalnosti",
      pricing: "Cene",
      login: "Prijava",
      getStarted: "Započni",
      dashboard: "Kontrolna tabla",
      generate: "Generisanje",
      conflict: "Provera sukoba",
      research: "Pravno istraživanje",
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      redline: "Izmjena ugovora",
      time: "Vreme",
      clients: "Klijenti",
      matters: "Predmeti",
      intake: "Prijavni formular",
      activity: "Aktivnosti",
      billing: "Fakturisanje",
      settings: "Podešavanja",
      templates: "Predlozi",
      deadlines: "Rokovi",
      actions: "Radnje",
      aiTools: "AI Alati",
      management: "Upravljanje",
      logout: "Odjava",
      themeToggle: "Prebacivanje svetle i tamne teme",
    },
    auth: {
      signingIn: "Prijava u toku...",
      creatingAccount: "Kreiranje naloga...",
    },
    redline: {
      header: {
        title: "Izmjena ugovora",
        subtitle:
          "Otpremite ugovor, pregledajte AI predloge izmena i preuzmite ažurirani DOCX.",
      },
      upload: {
        label: "Otpremi ugovor",
      },
      instructions: {
        label: "Uputstva za redlajning (opciono)",
        placeholder: 'npr. "Učini ugovor povoljnijim za poslodavca"',
      },
      actions: {
        analyze: "Analiziraj i redlajnuj",
        acceptAll: "Prihvati sve",
        rejectAll: "Odbij sve",
        download: "Preuzmi redlajnovani DOCX",
        saveSession: "Sačuvaj sesiju",
        loadSession: "Učitaj",
      },
      changes: {
        title: "Izmjene",
        accepted: "prihvaćeno",
        total: "izmjena",
        addition: "Dodavanje",
        deletion: "Brisanje",
        replacement: "Zamjena",
        replacements: "Zamjene",
        position: "poz",
        scrollHint: "Skrolujte da vidite sve izmjene",
      },
      sessions: {
        title: "Prethodne sesije",
        empty: "Nema sačuvanih sesija.",
        changes: "izmjena",
      },
      messages: {
        analyzing: "Analiza u toku...",
        noChanges: "Nema predloženih izmena.",
      },
    },
    matters: {
      kicker: "Legantis · Predmeti",
      title: "Predmeti",
      subtitle:
        "Organizujte rad po predmetima i držite ugovore, rokove, vreme i naplatu na jednom mestu.",
      actions: {
        new: "Novi predmet",
        create: "Kreiraj predmet",
        edit: "Izmeni",
        save: "Sačuvaj",
        cancel: "Otkaži",
        open: "Otvori",
        close: "Zatvori",
        archive: "Arhiviraj",
      },
      fields: {
        title: "Naslov",
        client: "Klijent",
        matterType: "Tip predmeta",
        jurisdiction: "Nadležnost",
        description: "Opis",
        openedAt: "Datum otvaranja",
        status: "Status",
      },
      filters: {
        status: "Status",
        type: "Tip",
        search: "Pretraga",
        searchPlaceholder: "Pretraži po naslovu ili klijentu…",
        all: "Svi",
      },
      select: {
        placeholder: "Izaberi predmet (opciono)",
        none: "Bez predmeta",
        help:
          "Opciono. Povezuje unos sa predmetom bez promjene prikaza postojećih unosa.",
      },
      status: {
        open: "Otvoren",
        on_hold: "Na čekanju",
        closed: "Zatvoren",
        archived: "Arhiviran",
      },
      types: {
        civil: "Građansko",
        criminal: "Krivično",
        family: "Porodično",
        labor: "Radno",
        commercial: "Privredno",
        administrative: "Upravno",
        other: "Ostalo",
      },
      stats: {
        contracts: "Ugovori",
        deadlines: "Rokovi",
        unbilledHours: "Nenaplaćeni sati",
      },
      tabs: {
        overview: "Pregled",
        deadlines: "Rokovi",
        documentsContracts: "Dokumenti i ugovori",
        timeBilling: "Vrijeme i naplata",
        predictions: "Predviđanja",
      },
      detail: {
        kicker: "Legantis · Predmet",
        backToList: "Nazad na predmete",
        notFound: "Predmet nije pronađen.",
        loadFailed: "Neuspješno učitavanje predmeta.",
        stats: {
          openDeadlines: "Otvoreni rokovi",
          totalBilled: "Ukupno naplaćeno",
          outstandingPrefix: "Dugovanje:",
        },
        recentActivity: {
          title: "Nedavne aktivnosti",
          subtitle: "Najnoviji rad vezan za ovaj predmet.",
          empty: "Još nema aktivnosti za ovaj predmet.",
        },
        deadlines: {
          subtitle: "Rokovi povezani sa ovim predmetom.",
          add: "Dodaj rok",
          empty: "Još nema povezanih rokova.",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Ugovori povezani sa ovim predmetom.",
          generate: "Generiši ugovor",
          empty: "Još nema povezanih ugovora.",
        },
        documents: {
          title: "Dokumenti",
          subtitle: "Dokumenti povezani sa ovim predmetom.",
          analyze: "Analiziraj dokument",
          empty: "Još nema povezanih dokumenata.",
        },
        time: {
          title: "Unosi vremena",
          subtitle: "Unosi vremena povezani sa ovim predmetom.",
          log: "Evidentiraj vrijeme",
          empty: "Još nema povezanih unosa vremena.",
        },
        billing: {
          title: "Fakture",
          subtitle: "Fakture povezane sa ovim predmetom.",
          empty: "Još nema povezanih faktura.",
        },
        predictions: {
          subtitle: "Predviđanja povezana sa ovim predmetom.",
          new: "Novo predviđanje",
          empty: "Još nema povezanih predviđanja.",
        },
      },
      empty: {
        title: "Još nema predmeta",
        subtitle:
          "Kreirajte prvi predmet da biste organizovali ugovore, rokove i evidenciju vremena.",
      },
    },
    language: {
      label: "Jezik",
    },
    signature: {
      actions: {
        sendForSignature: "Pošalji na potpis",
        cancelRequest: "Otkaži zahtjev",
        resendEmail: "Ponovo pošalji email",
        copySigningLink: "Kopiraj link za potpis",
        downloadSignedPdf: "Preuzmi potpisani PDF",
        sendNewRequest: "Pošalji novi zahtjev",
        signDocument: "Potpiši dokument",
      },
      status: {
        none: "Nema",
        pending: "Na čekanju",
        signed: "Potpisano",
        expired: "Isteklo",
        cancelled: "Otkazano",
      },
      dialog: {
        title: "Pošalji na potpis",
        signerName: "Ime potpisnika",
        signerEmail: "Email potpisnika",
        message: "Poruka (opciono)",
        expiresDays: "Istek (dani)",
        sending: "Slanje…",
        send: "Pošalji",
      },
      dashboard: {
        contractsTitle: "Ugovori",
        contractsSubtitle: "Pošaljite ugovore na potpis i pratite status.",
        refreshHint: "Osvježi",
        colContract: "Ugovor",
        colSignatureStatus: "Potpis",
        colActions: "Radnje",
        loadingContracts: "Učitavanje ugovora…",
        noContracts: "Još nema ugovora.",
        failedToLoadContracts: "Nije moguće učitati ugovore.",
        failedToCreate: "Nije moguće kreirati zahtjev za potpis.",
        failedToCancel: "Nije moguće otkazati zahtjev.",
        failedToResend: "Nije moguće ponovo poslati email.",
        failedToCopyLink: "Nije moguće kopirati link.",
        failedToDownload: "Nije moguće generisati link za preuzimanje.",
        statsTitle: "Potpisi",
        pendingSignatures: "Potpisi na čekanju",
        signedThisMonth: "Potpisano ovog mjeseca",
      },
      public: {
        loading: "Učitavanje…",
        notFoundTitle: "Link za potpis nije pronađen",
        notFoundBody: "Ovaj link je nevažeći ili više nije dostupan.",
        expiredTitle: "Ovaj link za potpis je istekao",
        expiredBody: "Kontaktirajte pošiljaoca da zatražite novi link.",
        alreadySignedTitle: "Ovaj dokument je već potpisan",
        alreadySignedBody: "Nije potrebna dalja akcija.",
        cancelledTitle: "Zahtjev za potpis je otkazan",
        cancelledBody: "Kontaktirajte pošiljaoca ako mislite da je greška.",
        successTitle: "Uspješno potpisano",
        successBody: "Potpisani PDF možete preuzeti ispod.",
        sentBy: "Poslao/la",
        unknownSender: "Nepoznat pošiljalac",
        expiresOn: "Ističe",
        reviewTitle: "Pregled dokumenta",
        checkboxAgree: "Pročitao/la sam i prihvatam uslove ovog ugovora",
        typedNameLabel: "Upišite svoje puno ime",
        typedNamePlaceholder: "Puno ime",
        signing: "Potpisivanje…",
      },
    },
    signature: {
      actions: {
        sendForSignature: "Pošlji v podpis",
        cancelRequest: "Prekliči zahtevek",
        resendEmail: "Ponovno pošlji e-pošto",
        copySigningLink: "Kopiraj povezavo za podpis",
        downloadSignedPdf: "Prenesi podpisani PDF",
        sendNewRequest: "Pošlji nov zahtevek",
        signDocument: "Podpiši dokument",
      },
      status: {
        none: "Brez",
        pending: "V teku",
        signed: "Podpisano",
        expired: "Poteklo",
        cancelled: "Preklicano",
      },
      dialog: {
        title: "Pošlji v podpis",
        signerName: "Ime podpisnika",
        signerEmail: "E-pošta podpisnika",
        message: "Sporočilo (neobvezno)",
        expiresDays: "Potek (dnevi)",
        sending: "Pošiljanje…",
        send: "Pošlji",
      },
      dashboard: {
        contractsTitle: "Pogodbe",
        contractsSubtitle: "Pošljite pogodbe v podpis in spremljajte status.",
        refreshHint: "Osveži",
        colContract: "Pogodba",
        colSignatureStatus: "Podpis",
        colActions: "Dejanja",
        loadingContracts: "Nalaganje pogodb…",
        noContracts: "Še ni pogodb.",
        failedToLoadContracts: "Pogodb ni bilo mogoče naložiti.",
        failedToCreate: "Zahtevka za podpis ni bilo mogoče ustvariti.",
        failedToCancel: "Zahtevka ni bilo mogoče preklicati.",
        failedToResend: "E-pošte ni bilo mogoče ponovno poslati.",
        failedToCopyLink: "Povezave ni bilo mogoče kopirati.",
        failedToDownload: "Povezave za prenos ni bilo mogoče ustvariti.",
        statsTitle: "Podpisi",
        pendingSignatures: "Podpisi v teku",
        signedThisMonth: "Podpisano ta mesec",
      },
      public: {
        loading: "Nalaganje…",
        notFoundTitle: "Povezava za podpis ni najdena",
        notFoundBody: "Ta povezava ni veljavna ali ni več na voljo.",
        expiredTitle: "Ta povezava za podpis je potekla",
        expiredBody: "Za novo povezavo se obrnite na pošiljatelja.",
        alreadySignedTitle: "Ta dokument je že podpisan",
        alreadySignedBody: "Nadaljnje dejanje ni potrebno.",
        cancelledTitle: "Zahtevek za podpis je preklican",
        cancelledBody: "Če menite, da je to napaka, se obrnite na pošiljatelja.",
        successTitle: "Uspešno podpisano",
        successBody: "Podpisani PDF lahko prenesete spodaj.",
        sentBy: "Poslal/a",
        unknownSender: "Neznan pošiljatelj",
        expiresOn: "Poteče",
        reviewTitle: "Pregled dokumenta",
        checkboxAgree: "Prebral/a sem in se strinjam s pogoji te pogodbe",
        typedNameLabel: "Vpišite svoje polno ime",
        typedNamePlaceholder: "Polno ime",
        signing: "Podpisovanje…",
      },
    },
    signature: {
      actions: {
        sendForSignature: "Pošalji na potpis",
        cancelRequest: "Otkaži zahtev",
        resendEmail: "Ponovo pošalji email",
        copySigningLink: "Kopiraj link za potpis",
        downloadSignedPdf: "Preuzmi potpisani PDF",
        sendNewRequest: "Pošalji novi zahtev",
        signDocument: "Potpiši dokument",
      },
      status: {
        none: "Nema",
        pending: "Na čekanju",
        signed: "Potpisano",
        expired: "Isteklo",
        cancelled: "Otkazano",
      },
      dialog: {
        title: "Pošalji na potpis",
        signerName: "Ime potpisnika",
        signerEmail: "Email potpisnika",
        message: "Poruka (opciono)",
        expiresDays: "Istek (dani)",
        sending: "Slanje…",
        send: "Pošalji",
      },
      dashboard: {
        contractsTitle: "Ugovori",
        contractsSubtitle: "Pošaljite ugovore na potpis i pratite status.",
        refreshHint: "Osveži",
        colContract: "Ugovor",
        colSignatureStatus: "Potpis",
        colActions: "Radnje",
        loadingContracts: "Učitavanje ugovora…",
        noContracts: "Još nema ugovora.",
        failedToLoadContracts: "Nije moguće učitati ugovore.",
        failedToCreate: "Nije moguće kreirati zahtev za potpis.",
        failedToCancel: "Nije moguće otkazati zahtev.",
        failedToResend: "Nije moguće ponovo poslati email.",
        failedToCopyLink: "Nije moguće kopirati link.",
        failedToDownload: "Nije moguće generisati link za preuzimanje.",
        statsTitle: "Potpisi",
        pendingSignatures: "Potpisi na čekanju",
        signedThisMonth: "Potpisano ovog meseca",
      },
      public: {
        loading: "Učitavanje…",
        notFoundTitle: "Link za potpis nije pronađen",
        notFoundBody: "Ovaj link je nevažeći ili više nije dostupan.",
        expiredTitle: "Ovaj link za potpis je istekao",
        expiredBody: "Kontaktirajte pošiljaoca da zatražite novi link.",
        alreadySignedTitle: "Ovaj dokument je već potpisan",
        alreadySignedBody: "Nije potrebna dalja akcija.",
        cancelledTitle: "Zahtev za potpis je otkazan",
        cancelledBody: "Kontaktirajte pošiljaoca ako mislite da je greška.",
        successTitle: "Uspešno potpisano",
        successBody: "Potpisani PDF možete preuzeti ispod.",
        sentBy: "Poslao/la",
        unknownSender: "Nepoznat pošiljalac",
        expiresOn: "Ističe",
        reviewTitle: "Pregled dokumenta",
        checkboxAgree: "Pročitao/la sam i prihvatam uslove ovog ugovora",
        typedNameLabel: "Upišite svoje puno ime",
        typedNamePlaceholder: "Puno ime",
        signing: "Potpisivanje…",
      },
    },
    rag: {
      title: "Preuzeti pravni izvori",
      articleSingular: "članak",
      articlePlural: "članaka",
      matchPercent: "{pct}% podudaranja",
      translating: "Prevod uzoraka…",
      paragraphLabel: "stav",
      invalidCitations:
        "⚠ Sledeći citati u odgovoru veštačke inteligencije nisu pronađeni u preuzetoj pravnoj bazi i mogu biti netačni:",
      lowConfidence:
        "Nisko poverenje: preuzete odredbe su slabo relevantne za ovaj upit. Primenjivi zakon možda još nije u bazi.",
    },
    research: {
      kicker: "Legantis · Istraživanje",
      title: "Pravno istraživanje",
      subtitle:
        "Pretražite bazu pravnih propisa i sačuvajte istraživanja za kasnije.",
      search: {
        label: "Pitanje ili ključne reči",
        placeholder: "npr. rok zastare za naknadu štete",
      },
      filters: {
        jurisdiction: "Jurisdikcija",
        category: "Kategorija",
        language: "Jezik",
        summaryPrefix: "Filteri:",
      },
      language: {
        local: "Lokalno",
        english: "Engleski",
      },
      jurisdictions: {
        all: "Sve jurisdikcije",
        serbia: "Srbija",
        croatia: "Hrvatska",
        bihFederation: "BiH Federacija",
        bihRs: "BiH RS",
        bihBrcko: "BiH Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      categories: {
        all: "Sve kategorije",
        civil: "Građansko",
        commercial: "Privredno",
        labor: "Radno",
        family: "Porodično",
        criminal: "Krivično",
        administrative: "Upravno",
        procedural: "Procesno",
        constitutional: "Ustavno",
        inheritance: "Nasledno",
        property: "Stvarno",
        confidentiality: "Poverljivost",
        misdemeanor: "Prekršajno",
      },
      actions: {
        search: "Pretraži",
        searching: "Pretraživanje…",
        save: "Sačuvaj istraživanje",
        saving: "Čuvanje…",
      },
      results: {
        title: "Rezultati",
        hint: "Pokrenite pretragu da biste videli najrelevantnije članke zakona.",
        empty:
          "Nema relevantnih članaka. Pokušajte druge ključne reči ili širu kategoriju.",
        countSuffix: "rezultata",
        confidenceLabel: "Pouzdanost",
        articleLabel: "Član",
      },
      sessions: {
        title: "Nedavne pretrage",
        refresh: "Osveži",
        refreshing: "Osvežavanje…",
        loading: "Učitavanje…",
        empty: "Još nema sačuvanih istraživanja.",
        upgradeHint:
          "Čuvanje istraživanja je dostupno na Professional i Firm planovima.",
      },
      upgradePrompt: "Nadogradite plan da biste sačuvali istraživanja.",
      errors: {
        queryRequired: "Unesite upit za pretragu.",
        searchFailed: "Pretraga nije uspela. Pokušajte ponovo.",
        historyFailed: "Nije moguće učitati nedavne pretrage.",
        saveFailed: "Nije moguće sačuvati istraživanje.",
      },
    },
    home: {
      hero: {
        trustBadge:
          "Pouzdani među advokatima u Bosni, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji",
        title: "Vaš AI pravni asistent. Napravljen za balkanske advokate.",
        subtitle:
          "Pripremite ugovore za nekoliko minuta. Predvidite ishod. Upravljajte klijentima. Sve na jednoj platformi za BiH, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
        getStartedFree: "Započnite besplatno",
        pricingCta: "Pogledaj cene",
        noCreditCard: "Kreditna kartica nije potrebna · Otkažite u bilo kom trenutku",
        dashboardPreview: "Pregled kontrolne table",
      },
      jurisdictionBar: {
        title: "Napravljeno za pravne sisteme:",
        countries: {
          ba: "🇧🇦 Bosna i Hercegovina",
          rs: "🇷🇸 Srbija",
          hr: "🇭🇷 Hrvatska",
          me: "🇲🇪 Crna Gora",
          si: "🇸🇮 Slovenija",
        },
      },
      howItWorks: {
        title: "Kako Legantis radi",
        step1: {
          title: "Registracija za 60 sekundi",
          desc: "Kreirajte nalog, odaberite jurisdikciju i jezik. Bez dodatne konfiguracije.",
        },
        step2: {
          title: "Opišite šta vam treba",
          desc: "Recite Legantisu šta da pripremi, analizira ili istraži. Kao u razgovoru.",
        },
        step3: {
          title: "Dobijte spreman materijal",
          desc: "Preuzmite ugovore, predviđanja i analize spremne za korišćenje ili proveru.",
        },
      },
      features: {
        badge: "16+ AI funkcija",
        title: "Sve što vam treba da radite pametnije",
        titleNew: "Sve što savremenoj advokatskoj kancelariji treba",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i saradnju sa klijentima.",
        seeAll: "Pogledaj sve funkcije →",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description:
              "Pripremite ugovore sa klauzulama prilagođenim jurisdikciji. Dobijte pravovremene predloge na osnovu lokalne prakse i brže završite finalnu verziju.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description:
              "Procijenite ishod predmeta na osnovu prakse i lokalnog prava. Uporedite više strategija uz jasne indikatore rizika i sigurnije savetujte klijente.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description:
              "Otpremite dokumenta za proveru rizika i usklađenosti. Brzo otkrijte sporne klauzule i dobijte strukturisane preporuke za izmene.",
          },
          time: {
            title: "Praćenje vremena",
            description:
              "Evidentirajte naplativo vreme i kreirajte račune. Zabeležite rad kroz svakodnevne aktivnosti i smanjite gubitak naplativih sati.",
          },
          portal: {
            title: "Klijentski portal",
            description:
              "Sigurna razmena dokumenata i komunikacija sa klijentima. Sve poruke, fajlovi i statusi ostaju pregledni na jednom zaštićenom mestu.",
          },
        },
      },
      pricing: {
        noFees: "Jednostavne cene. Bez skrivenih troškova.",
        title: "Jednostavne i Transparentne Cene",
        subtitle:
          "Izaberite paket koji odgovara vašoj kancelariji. Svi paketi uključuju ključne AI funkcionalnosti.",
        recommended: "Najpopularniji",
        trustLine:
          "Sigurna uplata preko Paddle-a · U skladu sa GDPR-om · Otkažite u bilo kom trenutku",
        comparison: {
          colFeature: "Funkcija",
          colSolo: "Solo",
          colProfessional: "Professional",
          colFirm: "Firm",
          rowAiCalls: "AI poziva dnevno",
          rowContractTypes: "Vrste ugovora",
          rowUsers: "Korisnici",
          rowPriority: "Prioritetna podrška",
          all: "Sve",
          usersFirm: "Do 5",
          yes: "✓",
          no: "✗",
        },
        tiers: {
          solo: {
            name: "Solo",
            features: {
              "Document generation": "Generisanje dokumenata",
              "Contract drafting": "Priprema ugovora",
              "Template library": "Biblioteka šablona",
              "20 AI calls/day": "20 AI poziva dnevno",
            },
          },
          professional: {
            name: "Professional",
            features: {
              "Everything in Solo": "Sve iz Solo paketa",
              "Case outcome predictions": "Predviđanje ishoda sporova",
              "Document analysis": "Analiza dokumenata",
              "Time tracking & billing": "Praćenje vremena i fakturisanje",
              "Client portal": "Klijentski portal",
              "100 AI calls/day": "100 AI poziva dnevno",
            },
          },
          firm: {
            name: "Firm",
            features: {
              "Everything in Professional": "Sve iz Professional paketa",
              "Priority support": "Prioritetna podrška",
              "300 AI calls/day": "300 AI poziva dnevno",
              "Multiple team members": "Više članova tima",
            },
          },
        },
        perMonth: "/mesečno",
        cta: "Započni",
      },
      testimonials: {
        badge: "Povratne informacije (rani pristup)",
        title: "Šta advokati kažu",
        disclaimer:
          "* Povratne informacije u ranoj fazi — imena su izostavljena radi privatnosti",
        items: {
          "1": {
            quote:
              "Legantis mi je uštedeo sate na pripremi ugovora. Klauzule po jurisdikciji su tačno ono što treba.",
            name: "Advokat, Sarajevo",
          },
          "2": {
            quote:
              "Predviđanje ishoda mi pomaže da od prvog dana postavim realna očekivanja klijenata.",
            name: "Advokat, Zagreb",
          },
          "3": {
            quote:
              "Rokove, račune i dokumente vodim na jednom mestu. Konačno.",
            name: "Advokat, Beograd",
          },
        },
      },
      faq: {
        title: "Često postavljana pitanja",
        subtitle:
          "Sve što treba da znate pre početka rada sa platformom Legantis.",
        panelTitle: "Pitanja o početku rada?",
        panelDescription:
          "Imate pitanja o našem AI Pravnom Asistentu? Pronađite odgovore na najčešća pitanja i otkrijte kako naša platforma može pojednostaviti vaš tok rada, unaprediti donošenje odluka i poboljšati ukupnu efikasnost.",
        items: {
          q1: {
            question: "Da li postoji besplatan probni period?",
            answer:
              "Da. Možete započeti sa besplatnim probnim periodom i isprobati ključne funkcionalnosti pre plaćenog paketa. Nije potrebna kreditna kartica da biste počeli. Kada probni period istekne, možete izabrati paket koji vam odgovara ili prestati sa korišćenjem usluge.",
          },
          q2: {
            question: "Koje jurisdikcije su trenutno podržane?",
            answer:
              "Legantis je prilagođen za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju. Podrazumevane predloge i klauzule prate lokalnu pravnu praksu na tim tržištima. Podrška se može proširiti tokom vremena—proverite ovu stranicu ili podešavanja naloga za najnoviji spisak.",
          },
          q3: {
            question: "Da li mogu izvesti generisane dokumente?",
            answer:
              "Da. Generisane dokumente možete izvesti u praktičnim formatima za internu proveru i slanje klijentima. Možete sačuvati nacrte lokalno radi izmene u Wordu ili deliti PDF sa stranama. Dosledno imenovanje i verzije u kancelariji pomažu da svi budu usklađeni.",
          },
          q4: {
            question: "Kako su zaštićeni podaci klijenata?",
            answer:
              "Koristimo sigurne kontrole pristupa i enkriptovane načine čuvanja podataka kako bismo zaštitili pravnu dokumentaciju. Infrastrukturni partneri hostuju podatke u regionima opisanim u Politici privatnosti. Vi birate koje podatke o predmetima čuvate i ko iz tima može da im pristupi.",
          },
          q5: {
            question: "Mogu li promeniti ili otkazati paket u bilo kom trenutku?",
            answer:
              "Da. Paket možete unaprediti, smanjiti ili otkazati u svakom trenutku kroz podešavanja naplate. Izmene se obično primenjuju od sledećeg obračunskog ciklusa, osim ako nije drugačije navedeno. Ako otkažete, obično zadržavate pristup do kraja već plaćenog perioda.",
          },
          q6: {
            question: "Da li su podaci o klijentima sigurni?",
            answer:
              "Da. Svi podaci se čuvaju na Supabase serverima u EU oblasti, enkriptovani u mirovanju. U skladu smo sa GDPR-om.",
          },
          q7: {
            question: "Mogu li otkazati pretplatu u bilo kom trenutku?",
            answer:
              "Da. Možete otkazati u bilo kom trenutku u podešavanjima naplate. Bez troškova otkazivanja.",
          },
        },
      },
    },
    footer: {
      taglineLine1:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu,",
      taglineLine2: "Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uslovi korišćenja",
      contact: "Kontakt",
      product: "Proizvod",
      legal: "Pravno",
      rights: "Sva prava zadržana",
      faqLink: "ČPP",
      privacyPolicy: "Politika privatnosti",
      termsOfService: "Uslovi korišćenja",
      refundPolicy: "Politika refundacije",
      supportEmail: "support@legantis.app",
    },
    dashboard: {
      featureUsage: {
        title: "Korištenje funkcija (nedavno)",
        labels: {
          case_prediction: "Predviđanje predmeta",
          contract_generation: "Gen. ugovora",
          document_generation: "Gen. dokumenata",
          document_analysis: "Analiza dok.",
          contract_drafting: "Nacrt ugovora",
          legal_research: "Pravno istraživanje",
          conflict_check: "Provera sukoba",
          document_redlining: "Izmene ugovora",
        },
      },
      header: {
        kicker: "Legantis kontrolna tabla",
        welcome: "Dobro došli nazad,",
        planSuffix: "paket",
        noPaidPlan: "Bez plaćenog paketa (samo dokumenti)",
        statusNotSubscribed: "niste pretplaćeni",
      },
      planTier: {
        solo: "Solo",
        professional: "Professional",
        firm: "Firm",
      },
      stats: {
        clients: {
          title: "Klijenti",
          subtitle: "Aktivni klijenti u vašem radnom prostoru",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Sačuvani i potpisani ugovori",
        },
        documents: {
          title: "Dokumenta i analize",
          subtitle: "Generisana dokumenta i analize rizika",
        },
        predictions: {
          title: "Predviđanja sporova",
          subtitle: "Do sada pokrenuta predviđanja ishoda",
        },
      },
      overview: {
        upgrade: "Nadogradi",
        lockedHint: "Nadogradite da otključate ovu funkciju.",
        notAvailable: "Nije dostupno",
        subscribeSolo: "Pretplatite se na Solo plan →",
        subscribeProfessional: "Pretplatite se na Professional plan →",
        subscribeFirm: "Pretplatite se na Firm plan →",
        stats: {
          totalClients: "Ukupno klijenata",
          activeMatters: "Aktivni predmeti",
          pendingSignatures: "Potpisi na čekanju",
          unbilledHours: "Nenaplaćeni sati",
        },
        cards: {
          analysis: {
            title: "Analiza dokumenata",
            description: "Izdvojite ključne klauzule i rizike iz dokumenata.",
          },
          matters: {
            description: "Upravljajte predmetima i povezanim radom.",
          },
          time: {
            title: "Vreme i fakture",
            description: "Evidentirajte sate i držite naplatu tačnom.",
          },
          deadlines: {
            title: "Predstojeći rokovi",
            subtitle: "Sledeće stavke koje zahtijevaju pažnju.",
            description: "Pratite rokove i budite ispred obaveza.",
          },
          activity: {
            subtitle: "Najnovije promjene u vašem radnom prostoru.",
          },
          invoices: {
            title: "Statistika faktura",
            subtitle: "Dugovanja i uplate ovog mjeseca.",
            outstanding: "Dugovanje",
            paidThisMonth: "Plaćeno ovog mjeseca",
          },
        },
      },
      actions: {
        title: "Brze akcije",
        subtitle: "Odmah pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiši dokument",
          description:
            "Kreirajte NDA ugovore i druga dokumenta uz pomoć AI-ja.",
        },
        research: {
          title: "Pravno istraživanje",
          description:
            "Pretražite propise kroz jurisdikcije uz skorove relevantnosti.",
        },
        contract: {
          title: "Nacrtaj ugovor",
          description:
            "Višekoračni čarobnjak sa klauzulama prilagođenim jurisdikciji.",
        },
        predict: {
          title: "Predvidi ishod spora",
          description:
            "AI analiza vjerovatnoće uspjeha na osnovu prakse i prava.",
        },
        clients: {
          title: "Klijenti",
          description:
            "Upravljajte kontaktima i pripremite pristup klijentskom portalu.",
        },
        templates: {
          title: "Biblioteka šablona",
          description:
            "Pregledajte unaprijed pripremljene šablone i brzo krenite od čvrste osnove.",
        },
      },
      workspace: {
        unnamed: "Vaš Legantis radni prostor",
        subtitle:
          "Pregled aktivnosti kroz ugovore, dokumenta i sudske predmete.",
        billing: {
          title: "Pretplata i paketi",
          trialPrefix: "Probni period traje do",
          freeTierLine: "Bez plaćenog paketa — samo generisanje dokumenata",
        },
        jurisdiction: {
          title: "Fokus jurisdikcije",
          subtitle:
            "Koristi se za prilagođavanje šablona, klauzula i predviđanja.",
        },
        invoices: {
          title: "Fakturisanje",
          countSuffix: "faktura",
          subtitle: "Generisano na osnovu evidentiranog vremena i klijenata.",
        },
      },
      usage: {
        title: "Korišćenje AI alata",
        subtitle:
          "Skorašnja aktivnost u vezi sa generisanjem ugovora, analizom i predviđanjima.",
        tokens: "Potrošeni tokeni (nedavno)",
        cost: "Procijenjeni trošak",
        detailHint:
          "Detaljna upotreba po funkcijama pojaviće se kada počnete da koristite generisanje, predviđanja i analizu dokumenata.",
        featuresTitle: "Korišćenje funkcija (nedavno)",
        featuresEmpty: "Još nema zabilježenog korišćenja funkcija.",
      },
      roi: {
        title: "ROI za ovaj mjesec",
        hoursPrefix: "Približno ste uštedjeli",
        hoursSuffix: "rada ovog mjeseca.",
        valuePrefix: "To vrijeme vrijedi oko",
        valueMiddle: "u poređenju sa",
        ratioPrefix: "Približan ROI:",
        ratioSuffix: "vaše pretplate.",
        freeTierHint:
          "Pretplatite se na plaćeni plan da biste uporedili uštedu sa cijenom pretplate.",
      },
      activity: {
        title: "Skorašnja aktivnost",
        empty: "Još uvijek nema aktivnosti.",
      },
      activeMatters: {
        title: "Aktivni predmeti",
        subtitle: "Otvoreni predmeti nedavno ažurirani.",
        openCountLabel: "Otvorenih predmeta:",
        updatedPrefix: "Ažurirano:",
        viewAll: "Prikaži sve predmete",
        empty: "Još nema otvorenih predmeta.",
      },
      upcomingDeadlines: {
        title: "Predstojeći rokovi",
        subtitle: "Vaši naredni obaveze i datumi.",
        viewAll: "Prikaži sve",
        empty: "Nema predstojećih rokova.",
      },
    },
    intake: {
      kicker: "Legantis · Prijem",
      title: "Formulari za prijem klijenata",
      subtitle:
        "Podijelite link da novi klijenti sami unesu podatke prije sastanka.",
      loading: "Učitavanje…",
      empty: "Još nema formulara. Kreirajte jedan da počnete.",
      upgrade: {
        body:
          "Formulari za prijem dostupni su na Professional i Firm planovima. Nadogradite da biste generisali linkove i pretvarali prijave u klijente.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati formulare.",
        toggleFailed: "Nije moguće ažurirati formular.",
        formNotFound: "Formular nije pronađen.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktivan",
        copyLink: "Kopiraj link",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi formular",
      },
      actions: {
        create: "Novi formular za prijem",
      },
      editor: {
        back: "Nazad na formulare",
        titleNew: "Novi formular za prijem",
        titleEdit: "Uredi formular za prijem",
        subtitle:
          "Unesite naslov i opcionalna polja. Osnovna pitanja (ime, email, vrsta predmeta, jurisdikcija, vrsta potrebnog ugovora, kratak opis) uvijek su na javnom formularu.",
        formTitle: "Naslov formulara",
        description: "Opis (opciono)",
        optionalTitle: "Dodatna opcionalna polja",
        optionalHint:
          "Kada su uključena, klijenti ih vide na javnom formularu.",
        optional: {
          company: "Naziv kompanije",
          address: "Adresa",
          notes: "Napomene",
        },
        save: "Sačuvaj",
        saving: "Čuvam…",
        errors: {
          titleRequired: "Unesite naslov formulara.",
          saveFailed: "Nije moguće sačuvati formular.",
        },
      },
      public: {
        notFoundTitle: "Formular nije dostupan",
        notFoundBody: "Link možda nije aktivan ili je netačan.",
        thankYouTitle: "Hvala",
        thankYouBody:
          "Vaši podaci su poslati. Vaš advokat će vas uskoro kontaktirati.",
        fullName: "Puno ime",
        email: "Email",
        phone: "Telefon (opciono)",
        caseType: "Vrsta predmeta",
        jurisdiction: "Jurisdikcija",
        contractTypeNeeded: "Vrsta potrebnog ugovora",
        matterDescription: "Kratak opis predmeta (opciono)",
        company: "Naziv kompanije",
        address: "Adresa",
        notes: "Napomene",
        selectPlaceholder: "Izaberite…",
        submit: "Pošalji",
        submitting: "Šaljem…",
        caseTypes: {
          civil: "Građansko",
          criminal: "Krivično",
          family: "Porodično",
          commercial: "Privredno",
          labor: "Radno",
          administrative: "Upravno",
          other: "Ostalo",
        },
        jurisdictions: {
          bih_fbih: "BiH – Federacija",
          bih_rs: "BiH – Republika Srpska",
          bih_brcko: "BiH – Distrikt Brčko",
          serbia: "Srbija",
          croatia: "Hrvatska",
          montenegro: "Crna Gora",
          slovenia: "Slovenija",
        },
        contractTypes: {
          employment: "Ugovor o radu",
          service: "Ugovor o pružanju usluga",
          sales: "Ugovor o kupoprodaji",
          lease: "Ugovor o zakupu/najmu",
          nda: "NDA / Ugovor o tajnosti",
          partnership: "Ugovor o partnerstvu",
        },
        errors: {
          nameEmail: "Unesite puno ime i email.",
          caseAndJurisdiction: "Izaberite vrstu predmeta i jurisdikciju.",
          contractTypeNeeded: "Izaberite vrstu potrebnog ugovora.",
          submitFailed: "Slanje nije uspjelo. Pokušajte ponovo.",
        },
      },
      submissions: {
        title: "Prijave na formular",
        back: "Nazad na formulare",
        empty: "Još nema prijava.",
        convert: "Pretvori u klijenta",
        archive: "Arhiviraj",
        openClient: "Otvori klijenta",
        col: {
          submitted: "Poslato",
          contact: "Klijent",
          caseType: "Vrsta predmeta",
          status: "Status",
          actions: "Akcije",
        },
        status: {
          pending: "Na čekanju",
          converted: "Pretvoreno",
          archived: "Arhivirano",
        },
        messages: {
          linkedExisting:
            "Ovaj email već postoji kao klijent. Prijava je povezana sa postojećim zapisom.",
          created: "Klijent je uspješno kreiran.",
        },
        errors: {
          missingNameEmail: "U prijavi nedostaje ime ili email.",
          convertFailed: "Nije moguće kreirati klijenta.",
          archiveFailed: "Nije moguće arhivirati prijavu.",
        },
      },
    },
    deadlines: {
      kicker: "Legantis · Rokovi",
      title: "Rokovi i kalendar",
      subtitle: "Pratite ročišta, podnošenja i datume predmeta.",
      loading: "Učitavanje…",
      upgrade: {
        body:
          "Praćenje rokova dostupno je na Professional i Firm planovima. Nadogradite za listu i kalendar.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati rokove.",
        updateFailed: "Nije moguće ažurirati rok.",
        deleteFailed: "Nije moguće obrisati rok.",
      },
      tabs: {
        list: "Lista",
        calendar: "Kalendar",
      },
      filters: {
        all: "Sve",
        upcoming: "Predstojeće",
        overdue: "Prekoračeno",
        completed: "Završeno",
      },
      list: {
        empty: "Nema rokova za ovaj filter.",
        done: "Gotovo",
        overdueDays: "Prekoračeno {n} dana",
        dueToday: "Rok danas",
        inDays: "za {n} dana",
      },
      types: {
        court_hearing: "Ročište",
        filing_deadline: "Rok za podnošenje",
        appeal_deadline: "Rok za žalbu",
        statute_of_limitations: "Zastarelost",
        contract_expiry: "Istek ugovora",
        client_meeting: "Sastanak sa klijentom",
        payment_due: "Dospijeće plaćanja",
        other: "Ostalo",
      },
      actions: {
        add: "Dodaj rok",
        complete: "Označi kao završeno",
        edit: "Uredi",
        delete: "Obriši",
      },
      dialog: {
        titleNew: "Novi rok",
        titleEdit: "Uredi rok",
        cancel: "Otkaži",
        save: "Sačuvaj",
        saving: "Čuvam…",
        fields: {
          title: "Naslov",
          type: "Vrsta roka",
          dueDate: "Datum roka",
          dueTime: "Vrijeme (opciono)",
          client: "Klijent (opciono)",
          description: "Opis (opciono)",
          reminder: "Podsjetnik (dana prije)",
        },
        clientSearchPlaceholder: "Pretraži klijente…",
        clientPlaceholder: "Izaberite klijenta",
        noClient: "Bez klijenta",
        errors: {
          titleDate: "Naslov i datum su obavezni.",
          saveFailed: "Nije moguće sačuvati rok.",
        },
      },
      calendar: {
        prev: "Prethodni mjesec",
        next: "Sljedeći mjesec",
        closeDay: "Zatvori",
        weekdayShort: {
          sun: "Ned",
          mon: "Pon",
          tue: "Uto",
          wed: "Sre",
          thu: "Čet",
          fri: "Pet",
          sat: "Sub",
        },
      },
    },
    generate: {
      header: {
        kicker: "Legantis · Generisanje dokumenata",
        title: "AI generator pravnih dokumenata",
        subtitle:
          "Generišite ugovore o povjerljivosti (NDA), ugovore o radu, punomoćja, ugovore o prodaji, zakup i ugovore o pružanju usluga za klijente širom Balkana.",
        back: "Nazad na kontrolnu tablu",
      },
      documentTypes: {
        nda: "Ugovor o povjerljivosti",
        employment: "Ugovor o radu",
        power_of_attorney: "Punomoć",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        service: "Ugovor o pružanju usluga",
      },
      form: {
        documentType: {
          label: "Vrsta dokumenta",
          placeholder: "Izaberite vrstu dokumenta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        language: {
          label: "Jezik dokumenta",
          placeholder: "Izaberite jezik",
        },
        details: {
          title: "Detalji dokumenta",
          help:
            "Polja mogu ostati prazna ako nisu primjenjiva. AI će popuniti standardne klauzule za izabranu jurisdikciju i vrstu dokumenta, ali uvijek morate pregledati rezultat prije upotrebe.",
        },
        fields: {
          party1: "Ime strane 1",
          party2: "Ime strane 2",
          date: "Datum",
          confidentialDescription: "Opis povjerljivih informacija",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Generišem dokument...",
          generate: "Generiši dokument",
          note: "Koristi AI kvotu vašeg plana. Rezultati su samo nacrti i ne predstavljaju pravni savjet.",
        },
      },
      result: {
        title: "Generisani dokument",
        subtitle:
          "Pregledajte, prilagodite i lokalizujte generisani tekst prije slanja klijentima ili podnošenja organima.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saved: "Dokument je sačuvan u vaš radni prostor.",
        templateLoaded: {
          prefix: "Učitan šablon:",
          suffix:
            "Popunite detalje iznad i kliknite „Generiši dokument” da kreirate nacrt prilagođen jurisdikciji.",
        },
        empty:
          "Generisani dokument će se pojaviti ovdje. Izaberite vrstu dokumenta, jurisdikciju i jezik, unesite ključne detalje i kliknite „Generiši dokument” da kreirate nacrt prilagođen vašem slučaju.",
      },
      sidebar: {
        title: "Detalji dokumenta",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje dokumenta…",
        status: "Status:",
        created: "Kreirano",
      },
    },
    contracts: {
      header: {
        kicker: "Legantis · Izrada ugovora",
        title: "AI čarobnjak za izradu ugovora",
        subtitle:
          "Višekoračni alat za izradu ugovora o radu, uslugama, prodaji, zakupu, NDA i partnerstvu za zemlje Balkana.",
        back: "Nazad na kontrolnu tablu",
      },
      section: {
        stepsTitle: "Koraci izrade ugovora",
        stepsSubtitle:
          "Prođite kroz korake i unesite strane, ključne uslove i jurisdikciju prije generisanja nacrta.",
      },
      contractTypes: {
        employment: "Ugovor o radu",
        service: "Ugovor o pružanju usluga",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        nda: "Ugovor o povjerljivosti",
        partnership: "Ugovor o partnerstvu",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      steps: {
        step1: {
          title: "Vrsta ugovora",
          lead: "Korak {current} od {total}. Izaberite vrstu ugovora koji želite da nacrtate.",
          hint: "AI će prilagoditi klauzule izabranoj vrsti ugovora.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Izaberite jurisdikciju koja uređuje ugovor.",
        },
        step3: {
          title: "Detalji",
          lead:
            "Korak {current} od {total}. Unesite ključne strane i komercijalne uslove. AI će dodati standardne i jurisdikcijske klauzule.",
        },
        step4: {
          title: "Pregled i generisanje",
          lead:
            "Korak {current} od {total}. Pregledajte sažetak i dodajte posebne instrukcije prije generisanja ugovora.",
        },
        step5: {
          title: "Preuzmi i sačuvaj",
          lead:
            "Korak {current} od {total}. Preuzmite ugovor ili ga sačuvajte u vaš Legantis radni prostor.",
        },
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        additionalInstructions: {
          label: "Dodatne instrukcije (opciono)",
          placeholder:
            "Npr. Probni rad 3 mjeseca, klauzula zabrane konkurencije 12 mjeseci samo za Srbiju, arbitraža u Beogradu itd.",
          help:
            "Instrukcije će biti dodate u AI upit, ali uvijek morate pregledati konačnu verziju prije upotrebe.",
        },
      },
      fields: {
        employerName: "Naziv poslodavca",
        employeeName: "Ime zaposlenog",
        jobTitle: "Radno mjesto",
        startDate: "Datum početka",
        salary: "Plata",
        workLocation: "Mjesto rada",
        contractDuration: "Trajanje ugovora",
        clientName: "Ime klijenta",
        serviceProviderName: "Pružalac usluga",
        serviceDescription: "Opis usluge",
        paymentAmount: "Iznos plaćanja",
        paymentSchedule: "Dinamika plaćanja",
        endDate: "Datum završetka",
        sellerName: "Prodavac",
        buyerName: "Kupac",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cijena",
        paymentTerms: "Uslovi plaćanja",
        deliveryDate: "Datum isporuke",
        landlordName: "Zakupodavac",
        tenantName: "Zakupac",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna zakupnina",
        depositAmount: "Depozit",
        leaseStartDate: "Početak zakupa",
        leaseDuration: "Trajanje zakupa",
        disclosingParty: "Strana koja otkriva",
        receivingParty: "Strana koja prima",
        purpose: "Svrha",
        confidentialInfoDescription: "Opis povjerljivih informacija",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner2Name: "Partner 2",
        businessPurpose: "Svrha poslovanja",
        profitSplit: "Podjela dobiti %",
      },
      summary: {
        contractType: "Vrsta ugovora",
        jurisdiction: "Jurisdikcija",
        keyDetails: "Ključni detalji",
        completeEarlierSteps:
          "Završite prethodne korake da biste vidjeli strukturisan sažetak unosa.",
      },
      actions: {
        generating: "Generišem ugovor...",
        generate: "Generiši ugovor",
        note:
          "Koristi AI kvotu vašeg plana. Rezultat je nacrt i ne predstavlja pravni savjet.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saveToContracts: "Sačuvaj u ugovore",
      },
      nav: {
        back: "Nazad",
        next: "Dalje",
        stepOf: "Korak {current} od {total}",
      },
      preview: {
        title: "Pregled ugovora",
        subtitle:
          "Prikaz generisanog ugovora. Ovo je nacrt i mora ga pregledati kvalifikovani pravnik prije upotrebe.",
        empty:
          "Kada generišete ugovor, tekst će se pojaviti ovdje. Zatim ga možete preuzeti kao PDF/DOCX ili sačuvati u ugovore.",
      },
      sidebar: {
        title: "Detalji ugovora",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje ugovora…",
        status: "Status:",
        created: "Kreirano",
        content: "Sadržaj",
        recordNotFound: "Zapis nije pronađen",
      },
      validation: {
        selectContractType: "Molimo izaberite vrstu ugovora.",
        selectJurisdiction: "Molimo izaberite jurisdikciju.",
        completeDetails: "Molimo popunite detalje ugovora.",
        requiredField: "Ovo polje je obavezno.",
        completePreviousSteps: "Završite prethodne korake prije generisanja.",
      },
      errors: {
        generateFailed: "Neuspješno generisanje ugovora. Pokušajte ponovo.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali ugovore.",
        saveFailed: "Neuspješno čuvanje ugovora. Pokušajte ponovo.",
      },
      messages: {
        saved: "Ugovor je sačuvan u vaš radni prostor.",
      },
      common: {
        emptyValue: "—",
      },
    },
    predictions: {
      header: {
        kicker: "Legantis · Predviđanje ishoda",
        title: "AI predviđanje ishoda spora",
        subtitle:
          "Analizirajte činjenice, jačinu dokaza i vrijednost spora da biste dobili AI predviđanje i strateške preporuke za predmete širom Balkana.",
        back: "Nazad na kontrolnu tablu",
      },
      form: {
        caseType: {
          label: "Vrsta predmeta",
          placeholder: "Izaberite vrstu predmeta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        keyFacts: {
          label: "Ključne činjenice",
          placeholder:
            "Opišite ključne činjenice predmeta, relevantne događaje, vremenski tok i okolnosti...",
          help:
            "Ne unosite povjerljive podatke koji se ne mogu dijeliti. Fokusirajte se na pravno relevantne činjenice, proceduru i trenutni status.",
        },
        evidenceQuality: {
          label: "Kvalitet dokaza",
          placeholder: "Izaberite kvalitet dokaza",
        },
        amountInDispute: {
          label: "Vrijednost spora",
          placeholder: "npr. €50.000",
          help: "Opciono, ali pomaže u procjeni rizika i strategije.",
        },
        additionalContext: {
          label: "Dodatni kontekst",
          placeholder:
            "Dodatni kontekst, proceduralna istorija ili pitanja koja želite da se obrade...",
        },
        actions: {
          loading: "Predviđam ishod...",
          submit: "Predvidi ishod",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Analiza predviđanja",
        subtitle:
          "Vjerovatnoća ishoda, ključni faktori, presedani, preporuke i rizici na osnovu unesenih informacija.",
        downloadPdf: "Preuzmi PDF",
        saved: "Predviđanje je sačuvano u radni prostor.",
        empty:
          "Vaše predviđanje će se pojaviti ovdje nakon analize. Vidjećete vjerovatnoću ishoda, nivo pouzdanosti, ključne faktore, relevantne presedane, preporuke i rizike, uz jasno odricanje odgovornosti.",
      },
      sidebar: {
        title: "Detalji predviđanja",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje predviđanja…",
        recordNotFound: "Zapis nije pronađen",
        fallbackCaseName: "Predviđanje ishoda",
        created: "Kreirano",
        outcomeProbability: "Vjerovatnoća ishoda:",
        confidenceLevel: "Nivo pouzdanosti:",
        keyFactors: "Ključni faktori",
        recommendations: "Strateške preporuke",
        fullAnalysis: "Kompletna analiza",
      },
      caseTypes: {
        civil: "Građansko pravo",
        commercial: "Privredno pravo",
        labor: "Radno pravo",
        family: "Porodično pravo",
        criminal: "Krivično pravo",
        administrative: "Upravno pravo",
        misdemeanor: "Prekršajno pravo",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      evidenceQuality: {
        strong: "Jaki",
        medium: "Srednji",
        weak: "Slabi",
      },
      confidenceLevels: {
        high: "Visok",
        medium: "Srednji",
        low: "Nizak",
      },
      errors: {
        missingRequired:
          "Izaberite vrstu predmeta i jurisdikciju, i unesite ključne činjenice predmeta.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali predviđanja.",
        generateFailed: "Neuspješno generisanje predviđanja. Pokušajte ponovo.",
      },
      common: {
        notSpecified: "Nije navedeno",
        translating: "Prevodim šablon…",
      },
    },
    analyze: {
      header: {
        kicker: "Legantis · Analiza dokumenata",
        title: "AI analiza i revizija ugovora",
        subtitle:
          "Otpremite ugovore ili pravna dokumenta za automatsku provjeru. AI ističe rizične klauzule, nedostajuće odredbe, pitanja usklađenosti i daje jasan rizik skor uz preporuke.",
        back: "Nazad na kontrolnu tablu",
      },
      uploader: {
        title: "Prevucite i pustite dokument ovdje",
        subtitle: "PDF, DOCX ili TXT do 5MB.",
        chooseFile: "Izaberite fajl",
        extracting: "Izdvajam tekst...",
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        focus: {
          label: "Fokus analize (opciono)",
          placeholder: "Izaberite tip analize",
          help:
            "Opšti pregled je uravnotežen prikaz. Ostale opcije usmjeravaju AI na specifične vrste problema.",
        },
        extractedPreview: {
          label: "Pregled izdvojenog teksta",
          placeholder:
            "Nakon otpremanja dokumenta, izdvojeni tekst će se pojaviti ovdje. Po potrebi ga možete urediti prije analize.",
          help:
            "Ne lijepite niti otpremajte dokumenta sa informacijama koje nije dozvoljeno dijeliti. Uklonite podatke koji identifikuju klijenta gdje je potrebno.",
        },
        actions: {
          loading: "Analiziram dokument...",
          submit: "Analiziraj dokument",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Izvještaj analize",
        subtitle:
          "Sažetak, rizik skor, rizične klauzule, nedostajuće odredbe, pitanja usklađenosti i preporuke za otpremljeni dokument.",
        downloadPdf: "Preuzmi PDF",
        saved: "Analiza je sačuvana u radni prostor.",
        empty:
          "Analiza dokumenta će se pojaviti ovdje nakon što otpremite fajl i pokrenete analizu. Vidjećete sažetak, ukupni rizik skor i pregled rizičnih klauzula, nedostajućih odredbi, pitanja usklađenosti i preporučenih izmjena.",
      },
      sidebar: {
        title: "Detalji analize",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje analize…",
        recordNotFound: "Zapis nije pronađen",
        riskScore: "Rizik skor:",
        analyzed: "Analizirano",
        executiveSummary: "Sažetak",
        riskyClauses: "Rizične klauzule",
        recommendations: "Preporuke",
      },
      focus: {
        general: "Opšti pregled",
        risk: "Procjena rizika",
        compliance: "Provjera usklađenosti",
        missing: "Nedostajuće klauzule",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      errors: {
        fileTooLarge: "Fajl je prevelik. Maksimalna veličina je 5MB.",
        unsupportedFileType: "Nepodržan format. Otpremite PDF, DOCX ili TXT fajl.",
        noReadableText:
          "Nismo mogli izdvojiti čitljiv tekst iz dokumenta. Pokušajte drugi fajl ili ga konvertujte u TXT/DOCX.",
        extractFailed: "Neuspješno izdvajanje teksta iz izabranog fajla.",
        uploadAndWait:
          "Otpremite podržan dokument i sačekajte izdvajanje teksta prije pokretanja analize.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali analize.",
        analyzeFailed: "Neuspješna analiza dokumenta. Pokušajte ponovo.",
      },
      common: {
        notSpecified: "Nije navedeno",
        notAvailable: "Nije dostupno",
      },
    },
    time: {
      header: {
        kicker: "Legantis · Praćenje vremena",
        title: "Praćenje vremena i naplata",
        subtitle:
          "Evidentirajte naplative sate po klijentu i predmetu, i pratite nenaplaćeno vrijeme i iznose na jednom mjestu.",
        back: "Nazad na kontrolnu tablu",
      },
      tabs: {
        entries: "Unosi vremena",
        invoices: "Fakture",
      },
      invoices: {
        title: "Fakture",
        subtitle:
          "Šaljite fakture e-poštom i pratite plaćanja bankovnim transferom.",
        refresh: "Osvježi",
        loading: "Učitavanje…",
        loadingList: "Učitavanje faktura…",
        empty:
          "Još nema faktura. (Kreiranje faktura pojaviće se ovdje kada se generišu iz unosa vremena.)",
        duePrefix: "Rok",
        clientFallback: "Klijent",
        actions: {
          downloadPdf: "Preuzmi PDF",
          send: "Pošalji klijentu",
          sending: "Slanje…",
          markPaid: "Označi kao plaćeno",
          markOverdue: "Označi kao dospjelo",
        },
        status: {
          draft: "Nacrt",
          sent: "Poslato",
          paid: "Plaćeno",
          overdue: "Dospjelo",
          cancelled: "Otkazano",
        },
        errors: {
          mustBeLoggedIn: "Morate biti prijavljeni.",
          loadFailed: "Učitavanje faktura nije uspjelo.",
          actionFailed: "Akcija nije uspjela",
        },
      },
      invoiceGenerate: {
        button: "Generiši fakturu",
        dialogTitle: "Generiši fakturu",
        dueDate: "Datum dospijeća",
        notes: "Napomene",
        notesPlaceholder: "Opcionalne napomene na fakturi…",
        paymentReference: "Poziv na broj / referenca",
        bankAccount: "Bankovni račun",
        bankPlaceholder: "Izaberite račun",
        totalLabel: "Ukupno",
        confirm: "Kreiraj fakturu",
        cancel: "Otkaži",
        generating: "Kreiranje…",
        successToast: "Faktura je kreirana.",
        bankingWarningBefore: "Dodajte podatke o banci u",
        bankingSettingsLink: "Podešavanja → Banka",
        bankingWarningAfter: " prije slanja faktura.",
        errors: {
          createFailed: "Kreiranje fakture nije uspjelo. Pokušajte ponovo.",
        },
      },
      form: {
        matterName: {
          label: "Klijent / Naziv predmeta",
          placeholder: "npr. ACME d.o.o. – Radni spor",
        },
        description: {
          label: "Opis posla",
          placeholder:
            "npr. Izrada tužbe, pregled dokaza, priprema za ročište...",
        },
        date: {
          label: "Datum",
        },
        hoursWorked: {
          label: "Sati rada",
          placeholder: "npr. 1.5",
          help: "Koristite korake od 0.25 (15 minuta).",
        },
        hourlyRate: {
          label: "Satnica",
          placeholder: "npr. 150",
        },
        activityType: {
          label: "Vrsta aktivnosti",
        },
        currency: {
          label: "Valuta",
        },
        total: "Ukupno:",
        totalHelp: "Računa se kao sati × satnica. Iznos se čuva kao numerička vrijednost.",
        actions: {
          loading: "Evidentiram vrijeme...",
          submit: "Evidentiraj vrijeme",
        },
      },
      list: {
        title: "Unosi vremena",
        subtitle: "Pregledajte unos, pratite nenaplaćene sate i pripremite fakturisanje.",
        loading: "Učitavanje unosa vremena...",
        emptyTitle: "Još nema unosa vremena.",
        emptySubtitle: "Dodajte prvi unos koristeći formular iznad.",
      },
      stats: {
        unbilledHours: "Ukupno nenaplaćenih sati",
        unbilledAmountEur: "Nenaplaćen iznos (EUR)",
        entriesThisMonth: "Unosi ovog mjeseca",
      },
      activityTypes: {
        drafting: "Izrada",
        reviewing: "Pregled",
        research: "Istraživanje",
        meeting: "Sastanak",
        court: "Sudski nastup",
        admin: "Administrativno",
        other: "Ostalo",
      },
      currencies: {
        eur: "EUR – Euro",
        usd: "USD – Američki dolar",
        bam: "BAM – Konvertibilna marka",
        rsd: "RSD – Srpski dinar",
        hrk: "HRK – Hrvatska kuna",
      },
      status: {
        billed: "Naplaćeno",
        unbilled: "Nenaplaćeno",
      },
      actions: {
        deleteAria: "Obriši unos vremena",
      },
      messages: {
        logged: "Unos vremena je uspješno evidentiran.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli unose vremena.",
        mustBeLoggedInToCreate: "Morate biti prijavljeni da biste evidentirali vrijeme.",
        matterAndDescriptionRequired: "Naziv predmeta i opis su obavezni.",
        descriptionRequired: "Opis rada je obavezan.",
        clientRequired: "Molimo odaberite klijenta",
        dateRequired: "Datum je obavezan.",
        invalidHoursOrRate:
          "Unesite ispravne sate (0.25–24) i nenegativnu satnicu.",
        createFailed: "Neuspješno evidentiranje vremena. Pokušajte ponovo.",
      },
      common: {
        emptyValue: "—",
      },
    },
    clients: {
      header: {
        kicker: "Legantis · Klijenti",
        title: "Klijenti",
        subtitle:
          "Upravljajte listom klijenata, sačuvajte ključne kontakt informacije i pripremite pristup klijentskom portalu.",
        back: "Nazad na kontrolnu tablu",
      },
      actions: {
        addClient: "Dodaj klijenta",
        cancel: "Otkaži",
        deleteAria: "Obriši klijenta",
      },
      conflictPrecheck: {
        title: "Provera sukoba interesa",
        subtitle:
          "Pre dodavanja novog klijenta, pokrenite brzu proveru sukoba kroz vaš radni prostor.",
        name: {
          label: "Ime/naziv potencijalnog klijenta",
          placeholder: "npr. Marko Marković / ACME d.o.o.",
        },
        actions: {
          check: "Pokreni proveru",
          checking: "Proveravam…",
          continue: "Nastavi na podatke o klijentu",
          proceedAnyway: "Nastavi uprkos sukobu",
          startOver: "Počni ispočetka",
        },
        clear: {
          title: "Nema pronađenih sukoba — bezbedno je nastaviti",
          body:
            "Nisu pronađeni odgovarajući klijenti, ugovori ili predmeti u vašem radnom prostoru.",
        },
        conflict: {
          title: "Pronađen je potencijalni sukob",
          body:
            "Pregledajte rezultate ispod. Možete nastaviti samo nakon potvrde da ste pregledali potencijalni sukob.",
        },
        override: {
          label:
            "Pregledao/la sam potencijalni sukob i potvrđujem da je bezbedno nastaviti.",
        },
      },
      form: {
        fullName: {
          label: "Ime i prezime",
          placeholder: "npr. Ana Kovač",
        },
        email: {
          label: "Email adresa",
          placeholder: "ana.kovac@example.com",
        },
        phone: {
          label: "Broj telefona",
          placeholder: "+387 61 000 000",
        },
        companyName: {
          label: "Naziv kompanije",
          placeholder: "npr. ACME d.o.o.",
        },
        notes: {
          label: "Bilješke",
          placeholder:
            "Ključne informacije o klijentu, tipični predmeti, preferencije...",
        },
        actions: {
          saving: "Čuvam klijenta...",
          save: "Sačuvaj klijenta",
        },
        errors: {
          nameAndEmailRequired: "Ime i prezime i email su obavezni.",
          mustBeLoggedInToAdd: "Morate biti prijavljeni da biste dodali klijente.",
          createFailed: "Neuspješno dodavanje klijenta. Pokušajte ponovo.",
        },
      },
      list: {
        title: "Lista klijenata",
        subtitle: "Svi klijenti koje ste dodali u vaš radni prostor.",
        sortBy: "Sortiraj po",
        sort: {
          name: "Imenu",
          dateAdded: "Datumu dodavanja",
        },
        sortAscending: "Sortiraj rastuće",
        sortDescending: "Sortiraj opadajuće",
        loading: "Učitavanje klijenata...",
        emptyTitle: "Još nema klijenata.",
        emptySubtitle: "Dodajte prvog klijenta klikom na dugme „Dodaj klijenta” iznad.",
        added: "Dodato",
      },
      sidebar: {
        title: "Detalji klijenta",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje klijenta…",
        recordNotFound: "Zapis nije pronađen",
        email: "Email:",
        phone: "Telefon:",
        address: "Adresa:",
        defaultRate: "Podrazumijevana satnica:",
        status: "Status:",
      },
      messages: {
        added: "Klijent je uspješno dodat.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli klijente.",
        loadFailed: "Neuspješno učitavanje klijenata. Pokušajte ponovo.",
      },
      common: {
        notSet: "Nije postavljeno",
      },
    },
    conflict: {
      header: {
        kicker: "Legantis · Provera sukoba",
        title: "Provera sukoba interesa",
        subtitle:
          "Pretražite klijente, ugovore i beleške o predmetima da biste identifikovali potencijalni sukob pre prihvatanja novog klijenta.",
      },
      form: {
        query: {
          label: "Ime osobe ili naziv firme",
          placeholder: "Unesite ime…",
          help:
            "Pretraga nije osetljiva na velika/mala slova i podržava delimična imena (npr. „Marko” nalazi „Marko Marković” i „Marković d.o.o.”).",
        },
        actions: {
          check: "Proveri sukobe",
          checking: "Proveravam…",
        },
      },
      errors: {
        queryRequired: "Unesite ime za pretragu.",
        searchFailed: "Provera sukoba nije uspela. Pokušajte ponovo.",
        historyFailed: "Neuspelo učitavanje istorije provera.",
      },
      results: {
        matchCountSuffix: "poklapanja",
        clearBadge: "Čisto",
        clearTitle: "Nema pronađenih sukoba",
        clearBody: "Nema poklapanja u vašem radnom prostoru. Možete nastaviti.",
        conflictBadge: "Proveriti",
        conflictTitle: "Otkriven potencijalni sukob",
        conflictBody:
          "Pronađena su poklapanja u vašem radnom prostoru. Pregledajte detalje pre nastavka.",
        groups: {
          clients: "Klijenti",
          contracts: "Ugovori",
          cases: "Predmeti",
        },
      },
      history: {
        title: "Skorašnje provere",
        refresh: "Osveži",
        refreshing: "Osvežavam…",
        loading: "Učitavanje istorije…",
        empty: "Još nema provera sukoba.",
        upgradeHint:
          "Istorija provera sukoba dostupna je na Professional i Firm planovima.",
        badges: {
          clear: "Čisto",
          conflict: "Sukob",
        },
        overrideLine: "Nastavljeno uprkos potencijalnom sukobu (override).",
      },
    },
    activity: {
      header: {
        title: "Skorašnja aktivnost",
        subtitle:
          "Pregledajte i otvorite skorašnje dokumente, ugovore, predviđanja, analize i klijente.",
      },
      tabs: {
        feed: "Pregled",
        audit: "Dnevnik aktivnosti",
      },
      audit: {
        empty: "Još nema unosa u dnevniku aktivnosti.",
      },
      filters: {
        all: "Sve",
        matters: "Predmeti",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
        matter: "Predmet",
        contract: "Ugovor",
        document: "Dokument",
        analysis: "Analiza dokumenta",
        prediction: "Predviđanje ishoda",
        client: "Klijent",
      },
      list: {
        empty: "Nema skorašnje aktivnosti za ovaj filter.",
      },
      actions: {
        loadMore: "Učitaj još",
      },
    },
    billing: {
      header: {
        title: "Fakturisanje",
        subtitle: "Upravljajte svojim planom i pretplatom.",
      },
      messages: {
        subscriptionUpdated: "Pretplata je uspješno ažurirana.",
      },
      currentPlan: {
        title: "Trenutni plan",
        workspace: "Vaš radni prostor",
        workspaceSuffix: "radni prostor",
        trialEndsPrefix: "Probni period ističe za",
        dayOne: "dan",
        dayMany: "dana",
        statusPrefix: "Status vaše pretplate je",
        noPaidPlanBadge: "Bez plaćenog paketa",
        freeHint:
          "Koristite besplatni nivo (samo generisanje dokumenata). Odaberite plan ispod da otključate ostale funkcije.",
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        openingPortal: "Otvaram portal...",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
        subscribe: "Pretplati se",
      },
      badges: {
        recommended: "Preporučeno",
      },
      tiers: {
        features: {
          documentGeneration: "Generisanje dokumenata",
          contractDrafting: "Priprema ugovora",
          templateLibrary: "Biblioteka šablona",
          aiCalls20: "20 AI poziva dnevno",
          everythingInSolo: "Sve iz Solo paketa",
          caseOutcomePredictions: "Predviđanje ishoda sporova",
          documentAnalysis: "Analiza dokumenata",
          timeTrackingBilling: "Praćenje vremena i fakturisanje",
          clientPortal: "Klijentski portal",
          aiCalls100: "100 AI poziva dnevno",
          everythingInProfessional: "Sve iz Professional paketa",
          prioritySupport: "Prioritetna podrška",
          aiCalls300: "300 AI poziva dnevno",
          multipleTeamMembers: "Više članova tima",
        },
      },
      footer: {
        paddleEnvironment: "Paddle okruženje:",
        paddleHint:
          "Ako dugme za plaćanje ne radi, provjerite da li je postavljen Paddle client token.",
      },
      errors: {
        missingTransactionId: "Nedostaje transactionId",
        paddleNotInitialized: "Paddle nije inicijalizovan",
        paddleCheckoutUnavailable: "Paddle checkout nije dostupan",
        checkoutFailed: "Plaćanje nije uspjelo",
        portalOpenFailed: "Nije moguće otvoriti portal za naplatu.",
      },
      common: {
        unknown: "nepoznato",
      },
    },
    settings: {
      header: {
        title: "Podešavanja",
        subtitle: "Upravljajte profilom, preferencama, sigurnošću i nalogom.",
      },
      tabs: {
        profile: "Profil",
        preferences: "Preference",
        banking: "Banka",
        security: "Sigurnost",
        danger: "Opasna zona",
      },
      banking: {
        title: "Podaci za bankovni transfer",
        introAccount:
          "Ovi podaci će se koristiti na fakturama kao uputstvo za plaćanje. Sačuvano za vaš nalog.",
        introFirm:
          "Ovi podaci će se koristiti na fakturama kao uputstvo za plaćanje. Sačuvano na nivou kancelarije.",
        bankName: {
          label: "Naziv banke",
          placeholder: "npr. UniCredit Bank",
        },
        accountHolder: {
          label: "Vlasnik računa",
          placeholder: "npr. naziv vaše kancelarije",
        },
        iban: {
          label: "IBAN",
          placeholder: "XX00 0000 0000 0000 0000",
        },
        swift: {
          label: "SWIFT/BIC (opciono)",
          placeholder: "npr. UNCRBA22",
        },
        defaultForInvoices: {
          title: "Podrazumijevano za nove fakture",
          subtitle:
            "Kada je uključeno, ovaj račun će biti automatski popunjen na novim fakturama.",
        },
        save: "Sačuvaj bankovne podatke",
        saving: "Čuvanje...",
        messageSaved: "Bankovni podaci su sačuvani.",
        errors: {
          loadFailed: "Učitavanje bankovnih podataka nije uspjelo",
          saveFailed: "Čuvanje bankovnih podataka nije uspjelo",
        },
      },
      profile: {
        title: "Profil",
        fullName: {
          label: "Ime i prezime",
          placeholder: "Vaše ime i prezime",
        },
        email: {
          label: "Email",
        },
        lawFirmName: {
          label: "Naziv advokatske kancelarije",
          placeholder: "Vaša kancelarija (opciono)",
        },
        preferredJurisdiction: {
          label: "Preferirana jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        preferredLanguage: {
          label: "Preferirani jezik",
          placeholder: "Izaberite jezik",
        },
        actions: {
          save: "Sačuvaj profil",
        },
      },
      preferences: {
        title: "Preference",
        defaultJurisdiction: {
          label: "Podrazumijevana jurisdikcija",
          placeholder: "Izaberite podrazumijevanu jurisdikciju",
        },
        currency: {
          label: "Podrazumijevana valuta",
        },
        theme: {
          label: "Tema",
          light: "Svijetla",
          dark: "Tamna",
        },
        emailNotifications: {
          title: "Email obavještenja",
          subtitle:
            "Primajte važne novosti o naplati, aktivnostima i promjenama proizvoda.",
        },
        note:
          "Tema se čuva čim je promijenite. Preference valute i obavještenja se povezuju sa naplatom i upozorenjima aktivnosti. Neke opcije su trenutno informativne i možda još ne utiču na ponašanje aplikacije.",
        actions: {
          save: "Sačuvaj preference",
        },
      },
      security: {
        title: "Promjena lozinke",
        currentPassword: {
          label: "Trenutna lozinka",
        },
        newPassword: {
          label: "Nova lozinka",
        },
        confirmPassword: {
          label: "Potvrdite novu lozinku",
        },
        actions: {
          save: "Sačuvaj lozinku",
        },
        messages: {
          passwordUpdated: "Lozinka je uspješno ažurirana.",
        },
        errors: {
          passwordTooShort: "Nova lozinka mora imati najmanje 8 karaktera.",
          passwordsDoNotMatch: "Nova lozinka i potvrda se ne podudaraju.",
          missingEmail: "Nedostaje korisnički email za promjenu lozinke.",
          currentPasswordIncorrect: "Trenutna lozinka nije ispravna.",
          failedToChangePassword: "Neuspješna promjena lozinke",
        },
      },
      plan: {
        title: "Trenutni plan",
        tierLabel: "Pretplatni paket:",
        statusLabel: "Status:",
        tierNone: "Nema (besplatno — samo dokumenti)",
        statusNone: "Niste pretplaćeni",
        note: "Upravljajte naplatom, računima i nadogradnjama na stranici naplate.",
        actions: {
          manageBilling: "Upravljaj naplatom",
        },
      },
      danger: {
        title: "Opasna zona",
        export: {
          title: "Izvezi sve moje podatke (GDPR)",
          subtitle:
            "Preuzmite JSON izvoz profila, ugovora, dokumenata, predviđanja, analiza, klijenata i unosa vremena za vašu evidenciju.",
          preparing: "Pripremam izvoz...",
          action: "Izvezi sve moje podatke (GDPR)",
        },
        delete: {
          title: "Obriši nalog",
          subtitle:
            "Ovo će označiti vaš profil kao obrisan i odjaviće vas. Ovu radnju nije moguće poništiti.",
          action: "Obriši moj nalog",
          dialogTitle: "Obriši nalog",
          dialogDescription:
            "Da li ste sigurni? Ovo se ne može poništiti. Vaš profil će biti označen kao obrisan i bićete odjavljeni.",
          confirm: "Obriši nalog",
        },
        errors: {
          failedToExportData: "Neuspješan izvoz podataka",
          failedToDeleteAccount: "Neuspješno brisanje naloga",
        },
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      languages: {
        Serbian: "Srpski",
        Croatian: "Hrvatski",
        Bosnian: "Bosanski",
        Montenegrin: "Crnogorski",
        Slovenian: "Slovenački",
        English: "Engleski",
      },
      messages: {
        profileUpdated: "Profil je uspješno ažuriran.",
        preferencesSaved:
          "Preference su sačuvane. Neke opcije još nijesu trajno sačuvane (uskoro).",
      },
      errors: {
        failedToSaveProfile: "Neuspješno čuvanje profila",
        failedToSavePreferences: "Neuspješno čuvanje preferenci",
      },
      common: {
        saving: "Čuvam...",
        cancel: "Otkaži",
        deleting: "Brišem...",
      },
    },
    templates: {
      header: {
        kicker: "Legantis · Biblioteka šablona",
        title: "Unaprijed pripremljeni pravni šabloni",
        subtitle:
          "Pregledajte odabrane šablone specifične za jurisdikciju i započnite AI asistirano sastavljanje.",
      },
      filters: {
        documentType: {
          label: "Vrsta dokumenta",
          all: "Sve vrste dokumenata",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          all: "Sve jurisdikcije",
        },
        search: {
          label: "Pretraga",
          placeholder: "Pretražite po nazivu ili ključnoj riječi...",
        },
      },
      documentTypes: {
        nda: "NDA",
        employment: "Zaposlenje",
        power_of_attorney: "Punomoć",
        sales: "Prodaja",
        lease: "Zakup",
        service: "Ugovor o uslugama",
        salesAgreement: "Ugovor o prodaji",
        leaseAgreement: "Ugovor o zakupu",
        serviceAgreement: "Ugovor o uslugama",
        legalDocument: "Pravni dokument",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      list: {
        empty:
          "Nijedan šablon ne odgovara filterima. Pokušajte promijeniti vrstu dokumenta, jurisdikciju ili pojmove pretrage.",
      },
      preview: {
        title: "Pregled šablona",
        subtitle: "Pregledajte osnovni tekst prije generisanja prilagođenog nacrta.",
        empty:
          "Izaberite šablon sa liste da biste ovdje vidjeli detalje i pregled sadržaja.",
      },
      actions: {
        goToGenerator: "Idi na generator",
        preview: "Pregled",
        useTemplate: "Koristi ovaj šablon",
      },
      common: {
        notSpecified: "Nije navedeno",
        translating: "Prevodim šablon…",
      },
    },
  },
  bs: {
    nav: {
      features: "Funkcionalnosti",
      pricing: "Cijene",
      login: "Prijava",
      getStarted: "Započni",
      dashboard: "Kontrolna ploča",
      generate: "Generisanje",
      conflict: "Provjera sukoba",
      research: "Pravno istraživanje",
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      redline: "Izmjena ugovora",
      time: "Vrijeme",
      clients: "Klijenti",
      matters: "Predmeti",
      intake: "Prijavni obrazac",
      activity: "Aktivnosti",
      billing: "Fakturisanje",
      settings: "Postavke",
      templates: "Prijedlozi",
      deadlines: "Rokovi",
      actions: "Radnje",
      aiTools: "AI Alati",
      management: "Upravljanje",
      logout: "Odjava",
      themeToggle: "Prebacivanje svijetle i tamne teme",
    },
    auth: {
      signingIn: "Prijava u toku...",
      creatingAccount: "Kreiranje računa...",
    },
    redline: {
      header: {
        title: "Izmjena ugovora",
        subtitle:
          "Otpremite ugovor, pregledajte AI prijedloge izmjena i preuzmite ažurirani DOCX.",
      },
      upload: {
        label: "Otpremi ugovor",
      },
      instructions: {
        label: "Uputstva za redlajning (opciono)",
        placeholder: 'npr. "Učini ugovor povoljnijim za poslodavca"',
      },
      actions: {
        analyze: "Analiziraj i redlajnuj",
        acceptAll: "Prihvati sve",
        rejectAll: "Odbij sve",
        download: "Preuzmi redlajnovani DOCX",
        saveSession: "Sačuvaj sesiju",
        loadSession: "Učitaj",
      },
      changes: {
        title: "Izmjene",
        accepted: "prihvaćeno",
        total: "izmjena",
        addition: "Dodavanje",
        deletion: "Brisanje",
        replacement: "Zamjena",
        replacements: "Zamjene",
        position: "poz",
        scrollHint: "Skrolujte da vidite sve izmjene",
      },
      sessions: {
        title: "Prethodne sesije",
        empty: "Nema sačuvanih sesija.",
        changes: "izmjena",
      },
      messages: {
        analyzing: "Analiza u toku...",
        noChanges: "Nema predloženih izmjena.",
      },
    },
    matters: {
      kicker: "Legantis · Predmeti",
      title: "Predmeti",
      subtitle:
        "Organizujte rad po predmetima i držite ugovore, rokove, vrijeme i naplatu na jednom mjestu.",
      actions: {
        new: "Novi predmet",
        create: "Kreiraj predmet",
        edit: "Uredi",
        save: "Sačuvaj",
        cancel: "Otkaži",
        open: "Otvori",
        close: "Zatvori",
        archive: "Arhiviraj",
      },
      fields: {
        title: "Naslov",
        client: "Klijent",
        matterType: "Tip predmeta",
        jurisdiction: "Nadležnost",
        description: "Opis",
        openedAt: "Datum otvaranja",
        status: "Status",
      },
      filters: {
        status: "Status",
        type: "Tip",
        search: "Pretraga",
        searchPlaceholder: "Pretraži po naslovu ili klijentu…",
        all: "Svi",
      },
      select: {
        placeholder: "Izaberi predmet (opciono)",
        none: "Bez predmeta",
        help:
          "Opciono. Povezuje unos sa predmetom bez promjene prikaza postojećih unosa.",
      },
      status: {
        open: "Otvoren",
        on_hold: "Na čekanju",
        closed: "Zatvoren",
        archived: "Arhiviran",
      },
      types: {
        civil: "Građansko",
        criminal: "Krivično",
        family: "Porodično",
        labor: "Radno",
        commercial: "Privredno",
        administrative: "Upravno",
        other: "Ostalo",
      },
      stats: {
        contracts: "Ugovori",
        deadlines: "Rokovi",
        unbilledHours: "Nenaplaćeni sati",
      },
      tabs: {
        overview: "Pregled",
        deadlines: "Rokovi",
        documentsContracts: "Dokumenti i ugovori",
        timeBilling: "Vrijeme i naplata",
        predictions: "Predviđanja",
      },
      detail: {
        kicker: "Legantis · Predmet",
        backToList: "Nazad na predmete",
        notFound: "Predmet nije pronađen.",
        loadFailed: "Neuspješno učitavanje predmeta.",
        stats: {
          openDeadlines: "Otvoreni rokovi",
          totalBilled: "Ukupno naplaćeno",
          outstandingPrefix: "Dugovanje:",
        },
        recentActivity: {
          title: "Nedavne aktivnosti",
          subtitle: "Najnoviji rad vezan za ovaj predmet.",
          empty: "Još nema aktivnosti za ovaj predmet.",
        },
        deadlines: {
          subtitle: "Rokovi povezani sa ovim predmetom.",
          add: "Dodaj rok",
          empty: "Još nema povezanih rokova.",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Ugovori povezani sa ovim predmetom.",
          generate: "Generiši ugovor",
          empty: "Još nema povezanih ugovora.",
        },
        documents: {
          title: "Dokumenti",
          subtitle: "Dokumenti povezani sa ovim predmetom.",
          analyze: "Analiziraj dokument",
          empty: "Još nema povezanih dokumenata.",
        },
        time: {
          title: "Unosi vremena",
          subtitle: "Unosi vremena povezani sa ovim predmetom.",
          log: "Evidentiraj vrijeme",
          empty: "Još nema povezanih unosa vremena.",
        },
        billing: {
          title: "Fakture",
          subtitle: "Fakture povezane sa ovim predmetom.",
          empty: "Još nema povezanih faktura.",
        },
        predictions: {
          subtitle: "Predviđanja povezana sa ovim predmetom.",
          new: "Novo predviđanje",
          empty: "Još nema povezanih predviđanja.",
        },
      },
      empty: {
        title: "Još nema predmeta",
        subtitle:
          "Kreirajte prvi predmet da biste organizovali ugovore, rokove i evidenciju vremena.",
      },
    },
    language: {
      label: "Jezik",
    },
    signature: {
      actions: {
        sendForSignature: "Pošalji na potpis",
        cancelRequest: "Otkaži zahtjev",
        resendEmail: "Ponovo pošalji email",
        copySigningLink: "Kopiraj link za potpis",
        downloadSignedPdf: "Preuzmi potpisani PDF",
        sendNewRequest: "Pošalji novi zahtjev",
        signDocument: "Potpiši dokument",
      },
      status: {
        none: "Nema",
        pending: "Na čekanju",
        signed: "Potpisano",
        expired: "Isteklo",
        cancelled: "Otkazano",
      },
      dialog: {
        title: "Pošalji na potpis",
        signerName: "Ime potpisnika",
        signerEmail: "Email potpisnika",
        message: "Poruka (opciono)",
        expiresDays: "Istek (dani)",
        sending: "Slanje…",
        send: "Pošalji",
      },
      dashboard: {
        contractsTitle: "Ugovori",
        contractsSubtitle: "Pošaljite ugovore na potpis i pratite status.",
        refreshHint: "Osvježi",
        colContract: "Ugovor",
        colSignatureStatus: "Potpis",
        colActions: "Radnje",
        loadingContracts: "Učitavanje ugovora…",
        noContracts: "Još nema ugovora.",
        failedToLoadContracts: "Nije moguće učitati ugovore.",
        failedToCreate: "Nije moguće kreirati zahtjev za potpis.",
        failedToCancel: "Nije moguće otkazati zahtjev.",
        failedToResend: "Nije moguće ponovo poslati email.",
        failedToCopyLink: "Nije moguće kopirati link.",
        failedToDownload: "Nije moguće generisati link za preuzimanje.",
        statsTitle: "Potpisi",
        pendingSignatures: "Potpisi na čekanju",
        signedThisMonth: "Potpisano ovog mjeseca",
      },
      public: {
        loading: "Učitavanje…",
        notFoundTitle: "Link za potpis nije pronađen",
        notFoundBody: "Ovaj link je nevažeći ili više nije dostupan.",
        expiredTitle: "Ovaj link za potpis je istekao",
        expiredBody: "Kontaktirajte pošiljaoca da zatražite novi link.",
        alreadySignedTitle: "Ovaj dokument je već potpisan",
        alreadySignedBody: "Nije potrebna daljnja akcija.",
        cancelledTitle: "Zahtjev za potpis je otkazan",
        cancelledBody: "Kontaktirajte pošiljaoca ako mislite da je greška.",
        successTitle: "Uspješno potpisano",
        successBody: "Potpisani PDF možete preuzeti ispod.",
        sentBy: "Poslao/la",
        unknownSender: "Nepoznat pošiljalac",
        expiresOn: "Ističe",
        reviewTitle: "Pregled dokumenta",
        checkboxAgree: "Pročitao/la sam i prihvatam uslove ovog ugovora",
        typedNameLabel: "Upišite svoje puno ime",
        typedNamePlaceholder: "Puno ime",
        signing: "Potpisivanje…",
      },
    },
    rag: {
      title: "Dobavljeni pravni izvori",
      articleSingular: "članak",
      articlePlural: "članka",
      matchPercent: "{pct}% podudarnosti",
      translating: "Prevođenje odlomaka…",
      paragraphLabel: "stav",
      invalidCitations:
        "⚠ Sljedeći citati u odgovoru umjetne inteligencije nisu pronađeni u preuzetoj pravnoj bazi i mogu biti netočni:",
      lowConfidence:
        "Nisko povjerenje: preuzete odredbe slabo odgovaraju ovom upitu. Primjenjivi zakon možda još nije u bazi.",
    },
    research: {
      kicker: "Legantis · Istraživanje",
      title: "Pravno istraživanje",
      subtitle:
        "Pretražite pravnu bazu i sačuvajte istraživanja za kasnije.",
      search: {
        label: "Pitanje ili ključne riječi",
        placeholder: "npr. rok zastare za naknadu štete",
      },
      filters: {
        jurisdiction: "Jurisdikcija",
        category: "Kategorija",
        language: "Jezik",
        summaryPrefix: "Filteri:",
      },
      language: {
        local: "Lokalno",
        english: "Engleski",
      },
      jurisdictions: {
        all: "Sve jurisdikcije",
        serbia: "Srbija",
        croatia: "Hrvatska",
        bihFederation: "BiH Federacija",
        bihRs: "BiH RS",
        bihBrcko: "BiH Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      categories: {
        all: "Sve kategorije",
        civil: "Građansko",
        commercial: "Privredno",
        labor: "Radno",
        family: "Porodično",
        criminal: "Krivično",
        administrative: "Upravno",
        procedural: "Procesno",
        constitutional: "Ustavno",
        inheritance: "Nasljedno",
        property: "Stvarno",
        confidentiality: "Povjerljivost",
        misdemeanor: "Prekršajno",
      },
      actions: {
        search: "Pretraži",
        searching: "Pretraživanje…",
        save: "Sačuvaj istraživanje",
        saving: "Čuvanje…",
      },
      results: {
        title: "Rezultati",
        hint: "Pokrenite pretragu da biste vidjeli najrelevantnije članke zakona.",
        empty:
          "Nema relevantnih članaka. Pokušajte druge ključne riječi ili širu kategoriju.",
        countSuffix: "rezultata",
        confidenceLabel: "Pouzdanost",
        articleLabel: "Član",
      },
      sessions: {
        title: "Nedavne pretrage",
        refresh: "Osvježi",
        refreshing: "Osvježavanje…",
        loading: "Učitavanje…",
        empty: "Još nema sačuvanih istraživanja.",
        upgradeHint:
          "Čuvanje istraživanja je dostupno na Professional i Firm planovima.",
      },
      upgradePrompt: "Nadogradite plan da biste sačuvali istraživanja.",
      errors: {
        queryRequired: "Unesite upit za pretragu.",
        searchFailed: "Pretraga nije uspjela. Pokušajte ponovo.",
        historyFailed: "Nije moguće učitati nedavne pretrage.",
        saveFailed: "Nije moguće sačuvati istraživanje.",
      },
    },
    home: {
      hero: {
        trustBadge:
          "Pouzdani među advokatima u Bosni, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji",
        title: "Vaš AI pravni asistent. Napravljen za balkanske advokate.",
        subtitle:
          "Pripremite ugovore za nekoliko minuta. Predvidite ishod. Upravljajte klijentima. Sve na jednoj platformi za BiH, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
        getStartedFree: "Započnite besplatno",
        pricingCta: "Pogledaj cijene",
        noCreditCard: "Kreditna kartica nije potrebna · Otkažite u bilo kojem trenutku",
        dashboardPreview: "Pregled kontrolne ploče",
      },
      jurisdictionBar: {
        title: "Napravljeno za pravne sisteme:",
        countries: {
          ba: "🇧🇦 Bosna i Hercegovina",
          rs: "🇷🇸 Srbija",
          hr: "🇭🇷 Hrvatska",
          me: "🇲🇪 Crna Gora",
          si: "🇸🇮 Slovenija",
        },
      },
      howItWorks: {
        title: "Kako Legantis radi",
        step1: {
          title: "Registracija za 60 sekundi",
          desc: "Kreirajte račun, odaberite jurisdikciju i jezik. Bez dodatne konfiguracije.",
        },
        step2: {
          title: "Opišite šta vam treba",
          desc: "Recite Legantisu šta treba pripremiti, analizirati ili istražiti. Kao u razgovoru.",
        },
        step3: {
          title: "Dobijte spreman materijal",
          desc: "Preuzmite ugovore, predviđanja i analize spremne za korištenje ili provjeru.",
        },
      },
      features: {
        badge: "16+ AI funkcija",
        title: "Sve što vam treba da radite pametnije",
        titleNew: "Sve što modernoj advokatskoj kancelariji treba",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i saradnju s klijentima.",
        seeAll: "Pogledaj sve funkcije →",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description:
              "Pripremite ugovore sa klauzulama prilagođenim jurisdikciji. Dobijte prijedloge zasnovane na lokalnoj praksi i brže završite finalnu verziju.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description:
              "Procijenite ishod predmeta na osnovu prakse i lokalnog prava. Uporedite više strategija uz jasne pokazatelje rizika i sigurnije savjetujte klijente.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description:
              "Otpremite dokumente za provjeru rizika i usklađenosti. Brzo otkrijte sporne klauzule i dobijte strukturirane preporuke za izmjene.",
          },
          time: {
            title: "Praćenje vremena",
            description:
              "Evidentirajte naplativo vrijeme i kreirajte račune. Bilježite rad kroz svakodnevne aktivnosti i smanjite gubitak naplativih sati.",
          },
          portal: {
            title: "Klijentski portal",
            description:
              "Sigurna razmjena dokumenata i komunikacija s klijentima. Sve poruke, datoteke i statusi ostaju pregledni na jednom zaštićenom mjestu.",
          },
        },
      },
      pricing: {
        noFees: "Jednostavne cijene. Bez skrivenih troškova.",
        title: "Jednostavne i Transparentne Cijene",
        subtitle:
          "Odaberite paket koji odgovara vašoj kancelariji. Svi paketi uključuju ključne AI funkcionalnosti.",
        recommended: "Najpopularniji",
        trustLine:
          "Sigurna uplata preko Paddle-a · U skladu s GDPR-om · Otkažite u bilo kojem trenutku",
        comparison: {
          colFeature: "Funkcija",
          colSolo: "Solo",
          colProfessional: "Professional",
          colFirm: "Firm",
          rowAiCalls: "AI poziva dnevno",
          rowContractTypes: "Vrste ugovora",
          rowUsers: "Korisnici",
          rowPriority: "Prioritetna podrška",
          all: "Sve",
          usersFirm: "Do 5",
          yes: "✓",
          no: "✗",
        },
        tiers: {
          solo: {
            name: "Solo",
            features: {
              "Document generation": "Generisanje dokumenata",
              "Contract drafting": "Priprema ugovora",
              "Template library": "Biblioteka šablona",
              "20 AI calls/day": "20 AI poziva dnevno",
            },
          },
          professional: {
            name: "Professional",
            features: {
              "Everything in Solo": "Sve iz Solo paketa",
              "Case outcome predictions": "Predviđanje ishoda sporova",
              "Document analysis": "Analiza dokumenata",
              "Time tracking & billing": "Praćenje vremena i fakturisanje",
              "Client portal": "Klijentski portal",
              "100 AI calls/day": "100 AI poziva dnevno",
            },
          },
          firm: {
            name: "Firm",
            features: {
              "Everything in Professional": "Sve iz Professional paketa",
              "Priority support": "Prioritetna podrška",
              "300 AI calls/day": "300 AI poziva dnevno",
              "Multiple team members": "Više članova tima",
            },
          },
        },
        perMonth: "/mjesečno",
        cta: "Započni",
      },
      testimonials: {
        badge: "Povratne informacije (rani pristup)",
        title: "Što advokati kažu",
        disclaimer:
          "* Povratne informacije u ranoj fazi — imena su izostavljena radi privatnosti",
        items: {
          "1": {
            quote:
              "Legantis mi je uštedio sate na pripremi ugovora. Klauzule po jurisdikciji su tačno ono što treba.",
            name: "Advokat, Sarajevo",
          },
          "2": {
            quote:
              "Predviđanje ishoda mi pomaže da od prvog dana postavim realna očekivanja klijenata.",
            name: "Odvjetnik, Zagreb",
          },
          "3": {
            quote:
              "Rokove, račune i dokumente vodim na jednom mjestu. Konačno.",
            name: "Advokat, Beograd",
          },
        },
      },
      faq: {
        title: "Često postavljana pitanja",
        subtitle:
          "Sve što trebate znati prije početka rada sa platformom Legantis.",
        panelTitle: "Pitanja o početku korištenja?",
        panelDescription:
          "Imate pitanja o našem AI Pravnom Asistentu? Pronađite odgovore na najčešća pitanja i otkrijte kako naša platforma može pojednostaviti vaš tok rada, unaprijediti donošenje odluka i poboljšati ukupnu efikasnost.",
        items: {
          q1: {
            question: "Da li postoji besplatan probni period?",
            answer:
              "Da. Možete početi s besplatnim probnim periodom i isprobati ključne funkcije prije prelaska na plaćeni paket. Nije potrebna kreditna kartica za početak. Kad probni period završi, možete odabrati paket koji vam odgovara ili prestati koristiti uslugu.",
          },
          q2: {
            question: "Koje jurisdikcije su trenutno podržane?",
            answer:
              "Legantis je prilagođen za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju. Zadane postavke i prijedlozi prate lokalnu pravnu praksu na tim tržištima. Podrška se može proširiti s vremenom—provjerite ovu stranicu ili postavke računa za najnoviji popis.",
          },
          q3: {
            question: "Mogu li izvesti generirane dokumente?",
            answer:
              "Da. Generirane dokumente možete izvesti u praktičnim formatima za internu provjeru i slanje klijentima. Možete spremiti nacrte lokalno za uređivanje u Wordu ili dijeliti PDF sa stranama. Dosljedno imenovanje i verzije u uredu pomažu da svi budu usklađeni.",
          },
          q4: {
            question: "Kako su zaštićeni podaci klijenata?",
            answer:
              "Koristimo sigurne kontrole pristupa i enkriptovane načine pohrane podataka za zaštitu pravne dokumentacije. Infrastrukturni partneri hostaju podatke u regijama opisanim u Pravilima privatnosti. Vi odlučujete koje podatke o predmetima pohranjujete i tko iz tima im može pristupiti.",
          },
          q5: {
            question: "Mogu li promijeniti ili otkazati paket u bilo kojem trenutku?",
            answer:
              "Da. Paket možete nadograditi, smanjiti ili otkazati u svakom trenutku kroz postavke naplate. Promjene se obično primjenjuju od sljedećeg obračunskog ciklusa osim ako nije drugačije navedeno. Ako otkažete, obično zadržavate pristup do kraja već plaćenog razdoblja.",
          },
          q6: {
            question: "Jesu li podaci o klijentima sigurni?",
            answer:
              "Da. Svi podaci se pohranjuju na Supabase serverima u EU regiji, šifrirani u mirovanju. U skladu smo s GDPR-om.",
          },
          q7: {
            question: "Mogu li otkazati pretplatu u bilo kojem trenutku?",
            answer:
              "Da. Možete otkazati u bilo kojem trenutku u postavkama naplate. Bez naknade za otkazivanje.",
          },
        },
      },
    },
    footer: {
      taglineLine1:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu,",
      taglineLine2: "Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uslovi korištenja",
      contact: "Kontakt",
      product: "Proizvod",
      legal: "Pravno",
      rights: "Sva prava zadržana",
      faqLink: "ČPP",
      privacyPolicy: "Pravila privatnosti",
      termsOfService: "Uslovi korištenja",
      refundPolicy: "Pravila povrata novca",
      supportEmail: "support@legantis.app",
    },
    dashboard: {
      featureUsage: {
        title: "Korištenje funkcija (nedavno)",
        labels: {
          case_prediction: "Predviđanje predmeta",
          contract_generation: "Gen. ugovora",
          document_generation: "Gen. dokumenata",
          document_analysis: "Analiza dok.",
          contract_drafting: "Nacrt ugovora",
          legal_research: "Pravno istraživanje",
          conflict_check: "Provjera sukoba",
          document_redlining: "Izmjene ugovora",
        },
      },
      header: {
        kicker: "Legantis kontrolna ploča",
        welcome: "Dobro došli nazad,",
        planSuffix: "paket",
        noPaidPlan: "Bez plaćenog paketa (samo dokumenti)",
        statusNotSubscribed: "niste pretplaćeni",
      },
      planTier: {
        solo: "Solo",
        professional: "Professional",
        firm: "Firm",
      },
      stats: {
        clients: {
          title: "Klijenti",
          subtitle: "Aktivni klijenti u vašem prostoru",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Sačuvani i potpisani ugovori",
        },
        documents: {
          title: "Dokumenti i analize",
          subtitle: "Generisani dokumenti i analize rizika",
        },
        predictions: {
          title: "Predviđanja sporova",
          subtitle: "Do sada pokrenuta predviđanja ishoda",
        },
      },
      overview: {
        upgrade: "Nadogradi",
        lockedHint: "Nadogradite da otključate ovu funkciju.",
        notAvailable: "Nije dostupno",
        subscribeSolo: "Pretplatite se na Solo plan →",
        subscribeProfessional: "Pretplatite se na Professional plan →",
        subscribeFirm: "Pretplatite se na Firm plan →",
        stats: {
          totalClients: "Ukupno klijenata",
          activeMatters: "Aktivni predmeti",
          pendingSignatures: "Potpisi na čekanju",
          unbilledHours: "Nenaplaćeni sati",
        },
        cards: {
          analysis: {
            title: "Analiza dokumenata",
            description: "Izdvojite ključne klauzule i rizike iz dokumenata.",
          },
          matters: {
            description: "Upravljajte predmetima i povezanim radom.",
          },
          time: {
            title: "Vrijeme i fakture",
            description: "Evidentirajte sate i držite naplatu tačnom.",
          },
          deadlines: {
            title: "Predstojeći rokovi",
            subtitle: "Sljedeće stavke koje zahtijevaju pažnju.",
            description: "Pratite rokove i budite ispred obaveza.",
          },
          activity: {
            subtitle: "Najnovije promjene u vašem prostoru.",
          },
          invoices: {
            title: "Statistika faktura",
            subtitle: "Dugovanja i uplate ovog mjeseca.",
            outstanding: "Dugovanje",
            paidThisMonth: "Plaćeno ovog mjeseca",
          },
        },
      },
      actions: {
        title: "Brze akcije",
        subtitle: "Brzo pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiši dokument",
          description:
            "Kreirajte NDA i druge ugovore uz pomoć AI-ja.",
        },
        research: {
          title: "Pravno istraživanje",
          description:
            "Pretražite propise kroz jurisdikcije uz skorove relevantnosti.",
        },
        contract: {
          title: "Nacrtaj ugovor",
          description:
            "Višekoračni čarobnjak sa klauzulama prilagođenim jurisdikciji.",
        },
        predict: {
          title: "Predvidi ishod spora",
          description:
            "AI analiza vjerovatnoće uspjeha na osnovu prakse i prava.",
        },
        clients: {
          title: "Klijenti",
          description:
            "Upravljajte kontaktima i pripremite pristup portalu.",
        },
        templates: {
          title: "Biblioteka šablona",
          description:
            "Pregledajte unaprijed pripremljene šablone i brzo krenite od dobre osnove.",
        },
      },
      workspace: {
        unnamed: "Vaš Legantis prostor",
        subtitle:
          "Pregled aktivnosti kroz ugovore, dokumente i sudske predmete.",
        billing: {
          title: "Pretplata i paketi",
          trialPrefix: "Probni period traje do",
          freeTierLine: "Bez plaćenog paketa — samo generisanje dokumenata",
        },
        jurisdiction: {
          title: "Fokus jurisdikcije",
          subtitle:
            "Koristi se za prilagođavanje šablona, klauzula i predviđanja.",
        },
        invoices: {
          title: "Fakture",
          countSuffix: "faktura",
          subtitle: "Generisane na osnovu vremena i klijenata.",
        },
      },
      usage: {
        title: "Korištenje AI alata",
        subtitle:
          "Skorašnja Legantis aktivnost kroz generisanje, analizu i predviđanja.",
        tokens: "Potrošeni tokeni (nedavno)",
        cost: "Procijenjeni trošak",
        detailHint:
          "Detaljna upotreba po funkcijama pojavit će se kada počnete koristiti generisanje ugovora, predviđanja i analizu dokumenata.",
        featuresTitle: "Korištenje funkcija (nedavno)",
        featuresEmpty: "Još nema zabilježenog korištenja funkcija.",
      },
      roi: {
        title: "ROI za ovaj mjesec",
        hoursPrefix: "Približno ste uštedjeli",
        hoursSuffix: "rada ovog mjeseca.",
        valuePrefix: "To vrijeme vrijedi oko",
        valueMiddle: "u poređenju s",
        ratioPrefix: "Približan ROI:",
        ratioSuffix: "vaše pretplate.",
        freeTierHint:
          "Pretplatite se na plaćeni plan da biste uporedili uštedu sa cijenom pretplate.",
      },
      activity: {
        title: "Skorašnja aktivnost",
        empty: "Još uvijek nema aktivnosti.",
      },
      activeMatters: {
        title: "Aktivni predmeti",
        subtitle: "Otvoreni predmeti nedavno ažurirani.",
        openCountLabel: "Otvorenih predmeta:",
        updatedPrefix: "Ažurirano:",
        viewAll: "Prikaži sve predmete",
        empty: "Još nema otvorenih predmeta.",
      },
      upcomingDeadlines: {
        title: "Predstojeći rokovi",
        subtitle: "Vaši sljedeći obaveze i datumi.",
        viewAll: "Prikaži sve",
        empty: "Nema predstojećih rokova.",
      },
    },
    intake: {
      kicker: "Legantis · Prijem",
      title: "Formulari za prijem klijenata",
      subtitle:
        "Podijelite link da novi klijenti sami unesu podatke prije sastanka.",
      loading: "Učitavanje…",
      empty: "Još nema formulara. Kreirajte jedan da počnete.",
      upgrade: {
        body:
          "Formulari za prijem dostupni su na Professional i Firm planovima. Nadogradite da biste generisali linkove i pretvarali prijave u klijente.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati formulare.",
        toggleFailed: "Nije moguće ažurirati formular.",
        formNotFound: "Formular nije pronađen.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktivan",
        copyLink: "Kopiraj link",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi formular",
      },
      actions: {
        create: "Novi formular za prijem",
      },
      editor: {
        back: "Nazad na formulare",
        titleNew: "Novi formular za prijem",
        titleEdit: "Uredi formular za prijem",
        subtitle:
          "Unesite naslov i opcionalna polja. Osnovna pitanja (ime, email, vrsta predmeta, jurisdikcija, vrsta potrebnog ugovora, kratak opis) uvijek su na javnom formularu.",
        formTitle: "Naslov formulara",
        description: "Opis (opcionalno)",
        optionalTitle: "Dodatna opcionalna polja",
        optionalHint:
          "Kada su uključena, klijenti ih vide na javnom formularu.",
        optional: {
          company: "Naziv kompanije",
          address: "Adresa",
          notes: "Napomene",
        },
        save: "Sačuvaj",
        saving: "Čuvam…",
        errors: {
          titleRequired: "Unesite naslov formulara.",
          saveFailed: "Nije moguće sačuvati formular.",
        },
      },
      public: {
        notFoundTitle: "Formular nije dostupan",
        notFoundBody: "Link možda nije aktivan ili je netačan.",
        thankYouTitle: "Hvala",
        thankYouBody:
          "Vaši podaci su poslati. Vaš advokat će vas uskoro kontaktirati.",
        fullName: "Puno ime",
        email: "Email",
        phone: "Telefon (opcionalno)",
        caseType: "Vrsta predmeta",
        jurisdiction: "Jurisdikcija",
        contractTypeNeeded: "Vrsta potrebnog ugovora",
        matterDescription: "Kratak opis predmeta (opcionalno)",
        company: "Naziv kompanije",
        address: "Adresa",
        notes: "Napomene",
        selectPlaceholder: "Izaberite…",
        submit: "Pošalji",
        submitting: "Šaljem…",
        caseTypes: {
          civil: "Građansko",
          criminal: "Krivično",
          family: "Porodično",
          commercial: "Privredno",
          labor: "Radno",
          administrative: "Upravno",
          other: "Ostalo",
        },
        jurisdictions: {
          bih_fbih: "BiH – Federacija",
          bih_rs: "BiH – Republika Srpska",
          bih_brcko: "BiH – Distrikt Brčko",
          serbia: "Srbija",
          croatia: "Hrvatska",
          montenegro: "Crna Gora",
          slovenia: "Slovenija",
        },
        contractTypes: {
          employment: "Ugovor o radu",
          service: "Ugovor o pružanju usluga",
          sales: "Ugovor o kupoprodaji",
          lease: "Ugovor o zakupu/najmu",
          nda: "NDA / Ugovor o tajnosti",
          partnership: "Ugovor o partnerstvu",
        },
        errors: {
          nameEmail: "Unesite puno ime i email.",
          caseAndJurisdiction: "Izaberite vrstu predmeta i jurisdikciju.",
          contractTypeNeeded: "Izaberite vrstu potrebnog ugovora.",
          submitFailed: "Slanje nije uspjelo. Pokušajte ponovo.",
        },
      },
      submissions: {
        title: "Prijave na formular",
        back: "Nazad na formulare",
        empty: "Još nema prijava.",
        convert: "Pretvori u klijenta",
        archive: "Arhiviraj",
        openClient: "Otvori klijenta",
        col: {
          submitted: "Poslato",
          contact: "Klijent",
          caseType: "Vrsta predmeta",
          status: "Status",
          actions: "Akcije",
        },
        status: {
          pending: "Na čekanju",
          converted: "Pretvoreno",
          archived: "Arhivirano",
        },
        messages: {
          linkedExisting:
            "Ovaj email već postoji kao klijent. Prijava je povezana sa postojećim zapisom.",
          created: "Klijent je uspješno kreiran.",
        },
        errors: {
          missingNameEmail: "U prijavi nedostaje ime ili email.",
          convertFailed: "Nije moguće kreirati klijenta.",
          archiveFailed: "Nije moguće arhivirati prijavu.",
        },
      },
    },
    deadlines: {
      kicker: "Legantis · Rokovi",
      title: "Rokovi i kalendar",
      subtitle: "Pratite ročišta, podnošenja i datume predmeta.",
      loading: "Učitavanje…",
      upgrade: {
        body:
          "Praćenje rokova dostupno je na Professional i Firm planovima. Nadogradite za listu i kalendar.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati rokove.",
        updateFailed: "Nije moguće ažurirati rok.",
        deleteFailed: "Nije moguće obrisati rok.",
      },
      tabs: {
        list: "Lista",
        calendar: "Kalendar",
      },
      filters: {
        all: "Sve",
        upcoming: "Predstojeće",
        overdue: "Prekoračeno",
        completed: "Završeno",
      },
      list: {
        empty: "Nema rokova za ovaj filter.",
        done: "Gotovo",
        overdueDays: "Prekoračeno {n} dana",
        dueToday: "Rok danas",
        inDays: "za {n} dana",
      },
      types: {
        court_hearing: "Ročište",
        filing_deadline: "Rok za podnošenje",
        appeal_deadline: "Rok za žalbu",
        statute_of_limitations: "Zastarelost",
        contract_expiry: "Istek ugovora",
        client_meeting: "Sastanak s klijentom",
        payment_due: "Dospijeće plaćanja",
        other: "Ostalo",
      },
      actions: {
        add: "Dodaj rok",
        complete: "Označi kao završeno",
        edit: "Uredi",
        delete: "Obriši",
      },
      dialog: {
        titleNew: "Novi rok",
        titleEdit: "Uredi rok",
        cancel: "Otkaži",
        save: "Sačuvaj",
        saving: "Čuvam…",
        fields: {
          title: "Naslov",
          type: "Vrsta roka",
          dueDate: "Datum roka",
          dueTime: "Vrijeme (opcionalno)",
          client: "Klijent (opcionalno)",
          description: "Opis (opcionalno)",
          reminder: "Podsjetnik (dana prije)",
        },
        clientSearchPlaceholder: "Pretraži klijente…",
        clientPlaceholder: "Izaberite klijenta",
        noClient: "Bez klijenta",
        errors: {
          titleDate: "Naslov i datum su obavezni.",
          saveFailed: "Nije moguće sačuvati rok.",
        },
      },
      calendar: {
        prev: "Prethodni mjesec",
        next: "Sljedeći mjesec",
        closeDay: "Zatvori",
        weekdayShort: {
          sun: "Ned",
          mon: "Pon",
          tue: "Uto",
          wed: "Sri",
          thu: "Čet",
          fri: "Pet",
          sat: "Sub",
        },
      },
    },
    generate: {
      header: {
        kicker: "Legantis · Generisanje dokumenata",
        title: "AI generator pravnih dokumenata",
        subtitle:
          "Generišite NDA ugovore, ugovore o radu, punomoćja, ugovore o prodaji, zakupu i ugovore o pružanju usluga za klijente širom Balkana.",
        back: "Nazad na kontrolnu ploču",
      },
      documentTypes: {
        nda: "Ugovor o povjerljivosti",
        employment: "Ugovor o radu",
        power_of_attorney: "Punomoć",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        service: "Ugovor o pružanju usluga",
      },
      form: {
        documentType: {
          label: "Vrsta dokumenta",
          placeholder: "Izaberite vrstu dokumenta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        language: {
          label: "Jezik dokumenta",
          placeholder: "Izaberite jezik",
        },
        details: {
          title: "Detalji dokumenta",
          help:
            "Polja mogu ostati prazna ako nisu primjenjiva. AI će popuniti standardne klauzule za izabranu jurisdikciju i vrstu dokumenta, ali uvijek morate pregledati rezultat prije upotrebe.",
        },
        fields: {
          party1: "Ime strane 1",
          party2: "Ime strane 2",
          date: "Datum",
          confidentialDescription: "Opis povjerljivih informacija",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Generišem dokument...",
          generate: "Generiši dokument",
          note: "Koristi AI kvotu vašeg plana. Rezultati su samo nacrti i ne predstavljaju pravni savjet.",
        },
      },
      result: {
        title: "Generisani dokument",
        subtitle:
          "Pregledajte, prilagodite i lokalizujte generisani tekst prije slanja klijentima ili podnošenja organima.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saved: "Dokument je sačuvan u vaš prostor.",
        templateLoaded: {
          prefix: "Učitan šablon:",
          suffix:
            "Popunite detalje iznad i kliknite „Generiši dokument” da kreirate nacrt prilagođen jurisdikciji.",
        },
        empty:
          "Generisani dokument će se pojaviti ovdje. Izaberite vrstu dokumenta, jurisdikciju i jezik, unesite ključne detalje i kliknite „Generiši dokument” da kreirate nacrt prilagođen vašem slučaju.",
      },
      sidebar: {
        title: "Detalji dokumenta",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje dokumenta…",
        status: "Status:",
        created: "Kreirano",
      },
    },
    contracts: {
      header: {
        kicker: "Legantis · Izrada ugovora",
        title: "AI čarobnjak za izradu ugovora",
        subtitle:
          "Višekoračni alat za izradu ugovora o radu, uslugama, prodaji, zakupu, NDA i partnerstvu za zemlje Balkana.",
        back: "Nazad na kontrolnu ploču",
      },
      section: {
        stepsTitle: "Koraci izrade ugovora",
        stepsSubtitle:
          "Prođite kroz korake i unesite strane, ključne uslove i jurisdikciju prije generisanja nacrta.",
      },
      contractTypes: {
        employment: "Ugovor o radu",
        service: "Ugovor o pružanju usluga",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        nda: "Ugovor o povjerljivosti",
        partnership: "Ugovor o partnerstvu",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      steps: {
        step1: {
          title: "Vrsta ugovora",
          lead: "Korak {current} od {total}. Izaberite vrstu ugovora koji želite nacrtati.",
          hint: "AI će prilagoditi klauzule izabranoj vrsti ugovora.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Izaberite jurisdikciju koja uređuje ovaj ugovor.",
        },
        step3: {
          title: "Detalji",
          lead:
            "Korak {current} od {total}. Unesite ključne strane i komercijalne uslove. AI će dodati standardne i jurisdikcijske klauzule.",
        },
        step4: {
          title: "Pregled i generisanje",
          lead:
            "Korak {current} od {total}. Pregledajte sažetak i dodajte posebne instrukcije prije generisanja ugovora.",
        },
        step5: {
          title: "Preuzmi i sačuvaj",
          lead:
            "Korak {current} od {total}. Preuzmite ugovor ili ga sačuvajte u vaš Legantis radni prostor.",
        },
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        additionalInstructions: {
          label: "Dodatne instrukcije (opcionalno)",
          placeholder:
            "Npr. Probni rad 3 mjeseca, zabrana konkurencije 12 mjeseci samo za Srbiju, arbitraža u Beogradu itd.",
          help:
            "Instrukcije će biti dodane u AI upit, ali uvijek morate pregledati konačnu verziju prije upotrebe.",
        },
      },
      fields: {
        employerName: "Naziv poslodavca",
        employeeName: "Ime zaposlenika",
        jobTitle: "Radno mjesto",
        startDate: "Datum početka",
        salary: "Plata",
        workLocation: "Mjesto rada",
        contractDuration: "Trajanje ugovora",
        clientName: "Ime klijenta",
        serviceProviderName: "Pružalac usluga",
        serviceDescription: "Opis usluge",
        paymentAmount: "Iznos plaćanja",
        paymentSchedule: "Dinamika plaćanja",
        endDate: "Datum završetka",
        sellerName: "Prodavač",
        buyerName: "Kupac",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cijena",
        paymentTerms: "Uslovi plaćanja",
        deliveryDate: "Datum isporuke",
        landlordName: "Zakupodavac",
        tenantName: "Zakupac",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna zakupnina",
        depositAmount: "Depozit",
        leaseStartDate: "Početak zakupa",
        leaseDuration: "Trajanje zakupa",
        disclosingParty: "Strana koja otkriva",
        receivingParty: "Strana koja prima",
        purpose: "Svrha",
        confidentialInfoDescription: "Opis povjerljivih informacija",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner2Name: "Partner 2",
        businessPurpose: "Svrha poslovanja",
        profitSplit: "Podjela dobiti %",
      },
      summary: {
        contractType: "Vrsta ugovora",
        jurisdiction: "Jurisdikcija",
        keyDetails: "Ključni detalji",
        completeEarlierSteps:
          "Završite ranije korake da biste vidjeli strukturisan sažetak unosa.",
      },
      actions: {
        generating: "Generišem ugovor...",
        generate: "Generiši ugovor",
        note:
          "Koristi AI kvotu vašeg plana. Rezultat je nacrt i ne predstavlja pravni savjet.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saveToContracts: "Sačuvaj u ugovore",
      },
      nav: {
        back: "Nazad",
        next: "Dalje",
        stepOf: "Korak {current} od {total}",
      },
      preview: {
        title: "Pregled ugovora",
        subtitle:
          "Prikaz generisanog ugovora. Ovo je nacrt i mora ga pregledati kvalifikovani pravnik prije upotrebe.",
        empty:
          "Kada generišete ugovor, tekst će se pojaviti ovdje. Zatim ga možete preuzeti kao PDF/DOCX ili sačuvati u ugovore.",
      },
      sidebar: {
        title: "Detalji ugovora",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje ugovora…",
        status: "Status:",
        created: "Kreirano",
        content: "Sadržaj",
        recordNotFound: "Zapis nije pronađen",
      },
      validation: {
        selectContractType: "Molimo izaberite vrstu ugovora.",
        selectJurisdiction: "Molimo izaberite jurisdikciju.",
        completeDetails: "Molimo popunite detalje ugovora.",
        requiredField: "Ovo polje je obavezno.",
        completePreviousSteps: "Završite prethodne korake prije generisanja.",
      },
      errors: {
        generateFailed: "Neuspješno generisanje ugovora. Pokušajte ponovo.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali ugovore.",
        saveFailed: "Neuspješno čuvanje ugovora. Pokušajte ponovo.",
      },
      messages: {
        saved: "Ugovor je sačuvan u vaš radni prostor.",
      },
      common: {
        emptyValue: "—",
      },
    },
    predictions: {
      header: {
        kicker: "Legantis · Predviđanje ishoda",
        title: "AI predviđanje ishoda spora",
        subtitle:
          "Analizirajte činjenice, jačinu dokaza i vrijednost spora da biste dobili AI predviđanje i strateške preporuke za predmete širom Balkana.",
        back: "Nazad na kontrolnu ploču",
      },
      form: {
        caseType: {
          label: "Vrsta predmeta",
          placeholder: "Odaberite vrstu predmeta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Odaberite jurisdikciju",
        },
        keyFacts: {
          label: "Ključne činjenice",
          placeholder:
            "Opišite ključne činjenice predmeta, relevantne događaje, vremenski tok i okolnosti...",
          help:
            "Ne unosite povjerljive podatke koji se ne mogu dijeliti. Fokusirajte se na pravno relevantne činjenice, postupak i trenutni status.",
        },
        evidenceQuality: {
          label: "Kvalitet dokaza",
          placeholder: "Odaberite kvalitet dokaza",
        },
        amountInDispute: {
          label: "Vrijednost spora",
          placeholder: "npr. €50.000",
          help: "Opcionalno, ali pomaže u procjeni rizika i strategije.",
        },
        additionalContext: {
          label: "Dodatni kontekst",
          placeholder:
            "Dodatni kontekst, proceduralna historija ili pitanja koja želite da se obrade...",
        },
        actions: {
          loading: "Predviđam ishod...",
          submit: "Predvidi ishod",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Analiza predviđanja",
        subtitle:
          "Vjerovatnoća ishoda, ključni faktori, presedani, preporuke i rizici na osnovu unesenih informacija.",
        downloadPdf: "Preuzmi PDF",
        saved: "Predviđanje je sačuvano u radni prostor.",
        empty:
          "Vaše predviđanje će se pojaviti ovdje nakon analize. Vidjet ćete vjerovatnoću ishoda, nivo pouzdanosti, ključne faktore, relevantne presedane, preporuke i rizike, uz jasno odricanje odgovornosti.",
      },
      sidebar: {
        title: "Detalji predviđanja",
        empty: "Nijedna stavka nije odabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje predviđanja…",
        recordNotFound: "Zapis nije pronađen",
        fallbackCaseName: "Predviđanje ishoda",
        created: "Kreirano",
        outcomeProbability: "Vjerovatnoća ishoda:",
        confidenceLevel: "Nivo pouzdanosti:",
        keyFactors: "Ključni faktori",
        recommendations: "Strateške preporuke",
        fullAnalysis: "Kompletna analiza",
      },
      caseTypes: {
        civil: "Građansko pravo",
        commercial: "Privredno pravo",
        labor: "Radno pravo",
        family: "Porodično pravo",
        criminal: "Krivično pravo",
        administrative: "Upravno pravo",
        misdemeanor: "Prekršajno pravo",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      evidenceQuality: {
        strong: "Jaki",
        medium: "Srednji",
        weak: "Slabi",
      },
      confidenceLevels: {
        high: "Visok",
        medium: "Srednji",
        low: "Nizak",
      },
      errors: {
        missingRequired:
          "Odaberite vrstu predmeta i jurisdikciju, i unesite ključne činjenice predmeta.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali predviđanja.",
        generateFailed: "Neuspješno generisanje predviđanja. Pokušajte ponovo.",
      },
      common: {
        notSpecified: "Nije navedeno",
        translating: "Prevajam predlogo…",
      },
    },
    analyze: {
      header: {
        kicker: "Legantis · Analiza dokumenata",
        title: "AI analiza i revizija ugovora",
        subtitle:
          "Otpremite ugovore ili pravna dokumenta za automatsku provjeru. AI ističe rizične klauzule, nedostajuće odredbe, pitanja usklađenosti i daje jasan rizik skor uz preporuke.",
        back: "Nazad na kontrolnu ploču",
      },
      uploader: {
        title: "Prevucite i pustite dokument ovdje",
        subtitle: "PDF, DOCX ili TXT do 5MB.",
        chooseFile: "Izaberite fajl",
        extracting: "Izdvajam tekst...",
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        focus: {
          label: "Fokus analize (opciono)",
          placeholder: "Izaberite tip analize",
          help:
            "Opšti pregled je uravnotežen prikaz. Ostale opcije usmjeravaju AI na specifične vrste problema.",
        },
        extractedPreview: {
          label: "Pregled izdvojenog teksta",
          placeholder:
            "Nakon otpremanja dokumenta, izdvojeni tekst će se pojaviti ovdje. Po potrebi ga možete urediti prije analize.",
          help:
            "Ne lijepite niti otpremajte dokumenta sa informacijama koje nije dozvoljeno dijeliti. Uklonite podatke koji identifikuju klijenta gdje je potrebno.",
        },
        actions: {
          loading: "Analiziram dokument...",
          submit: "Analiziraj dokument",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Izvještaj analize",
        subtitle:
          "Sažetak, rizik skor, rizične klauzule, nedostajuće odredbe, pitanja usklađenosti i preporuke za otpremljeni dokument.",
        downloadPdf: "Preuzmi PDF",
        saved: "Analiza je sačuvana u radni prostor.",
        empty:
          "Analiza dokumenta će se pojaviti ovdje nakon što otpremite fajl i pokrenete analizu. Vidjećete sažetak, ukupni rizik skor i pregled rizičnih klauzula, nedostajućih odredbi, pitanja usklađenosti i preporučenih izmjena.",
      },
      sidebar: {
        title: "Detalji analize",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje analize…",
        recordNotFound: "Zapis nije pronađen",
        riskScore: "Rizik skor:",
        analyzed: "Analizirano",
        executiveSummary: "Sažetak",
        riskyClauses: "Rizične klauzule",
        recommendations: "Preporuke",
      },
      focus: {
        general: "Opšti pregled",
        risk: "Procjena rizika",
        compliance: "Provjera usklađenosti",
        missing: "Nedostajuće klauzule",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      errors: {
        fileTooLarge: "Fajl je prevelik. Maksimalna veličina je 5MB.",
        unsupportedFileType: "Nepodržan format. Otpremite PDF, DOCX ili TXT fajl.",
        noReadableText:
          "Nismo mogli izdvojiti čitljiv tekst iz dokumenta. Pokušajte drugi fajl ili ga konvertujte u TXT/DOCX.",
        extractFailed: "Neuspješno izdvajanje teksta iz izabranog fajla.",
        uploadAndWait:
          "Otpremite podržan dokument i sačekajte izdvajanje teksta prije pokretanja analize.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali analize.",
        analyzeFailed: "Neuspješna analiza dokumenta. Pokušajte ponovo.",
      },
      common: {
        notSpecified: "Nije navedeno",
        notAvailable: "Nije dostupno",
      },
    },
    time: {
      header: {
        kicker: "Legantis · Praćenje vremena",
        title: "Praćenje vremena i fakturisanje",
        subtitle:
          "Evidentirajte naplative sate po klijentu i predmetu, i pratite nenaplaćeno vrijeme i iznose na jednom mjestu.",
        back: "Nazad na kontrolnu ploču",
      },
      tabs: {
        entries: "Unosi vremena",
        invoices: "Fakture",
      },
      invoices: {
        title: "Fakture",
        subtitle:
          "Šaljite fakture e-poštom i pratite plaćanja bankovnim transferom.",
        refresh: "Osvježi",
        loading: "Učitavanje…",
        loadingList: "Učitavanje faktura…",
        empty:
          "Još nema faktura. (Kreiranje faktura pojaviće se ovdje kada se generišu iz unosa vremena.)",
        duePrefix: "Rok",
        clientFallback: "Klijent",
        actions: {
          downloadPdf: "Preuzmi PDF",
          send: "Pošalji klijentu",
          sending: "Slanje…",
          markPaid: "Označi kao plaćeno",
          markOverdue: "Označi kao dospjelo",
        },
        status: {
          draft: "Nacrt",
          sent: "Poslano",
          paid: "Plaćeno",
          overdue: "Dospjelo",
          cancelled: "Otkazano",
        },
        errors: {
          mustBeLoggedIn: "Morate biti prijavljeni.",
          loadFailed: "Učitavanje faktura nije uspjelo.",
          actionFailed: "Akcija nije uspjela",
        },
      },
      invoiceGenerate: {
        button: "Generiši fakturu",
        dialogTitle: "Generiši fakturu",
        dueDate: "Datum dospijeća",
        notes: "Napomene",
        notesPlaceholder: "Opcionalne napomene na fakturi…",
        paymentReference: "Poziv na broj / referenca",
        bankAccount: "Bankovni račun",
        bankPlaceholder: "Izaberite račun",
        totalLabel: "Ukupno",
        confirm: "Kreiraj fakturu",
        cancel: "Otkaži",
        generating: "Kreiranje…",
        successToast: "Faktura je kreirana.",
        bankingWarningBefore: "Dodajte podatke o banci u",
        bankingSettingsLink: "Podešavanja → Banka",
        bankingWarningAfter: " prije slanja faktura.",
        errors: {
          createFailed: "Kreiranje fakture nije uspjelo. Pokušajte ponovo.",
        },
      },
      form: {
        matterName: {
          label: "Klijent / Naziv predmeta",
          placeholder: "npr. ACME d.o.o. – Radni spor",
        },
        description: {
          label: "Opis posla",
          placeholder:
            "npr. Izrada tužbe, pregled dokaza, priprema za ročište...",
        },
        date: {
          label: "Datum",
        },
        hoursWorked: {
          label: "Sati rada",
          placeholder: "npr. 1.5",
          help: "Koristite korake od 0.25 (15 minuta).",
        },
        hourlyRate: {
          label: "Satnica",
          placeholder: "npr. 150",
        },
        activityType: {
          label: "Vrsta aktivnosti",
        },
        currency: {
          label: "Valuta",
        },
        total: "Ukupno:",
        totalHelp:
          "Računa se kao sati × satnica. Iznos se čuva kao numerička vrijednost.",
        actions: {
          loading: "Evidentiram vrijeme...",
          submit: "Evidentiraj vrijeme",
        },
      },
      list: {
        title: "Unosi vremena",
        subtitle:
          "Pregledajte uneseno vrijeme, pratite nenaplaćene sate i pripremite fakture.",
        loading: "Učitavanje unosa vremena...",
        emptyTitle: "Još nema unosa vremena.",
        emptySubtitle: "Dodajte prvi unos koristeći formular iznad.",
      },
      stats: {
        unbilledHours: "Ukupno nenaplaćenih sati",
        unbilledAmountEur: "Nenaplaćen iznos (EUR)",
        entriesThisMonth: "Unosi ovog mjeseca",
      },
      activityTypes: {
        drafting: "Izrada",
        reviewing: "Pregled",
        research: "Istraživanje",
        meeting: "Sastanak",
        court: "Sudski nastup",
        admin: "Administrativno",
        other: "Ostalo",
      },
      currencies: {
        eur: "EUR – Euro",
        usd: "USD – Američki dolar",
        bam: "BAM – Konvertibilna marka",
        rsd: "RSD – Srpski dinar",
        hrk: "HRK – Hrvatska kuna",
      },
      status: {
        billed: "Naplaćeno",
        unbilled: "Nenaplaćeno",
      },
      actions: {
        deleteAria: "Obriši unos vremena",
      },
      messages: {
        logged: "Unos vremena je uspješno evidentiran.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli unose vremena.",
        mustBeLoggedInToCreate: "Morate biti prijavljeni da biste evidentirali vrijeme.",
        matterAndDescriptionRequired: "Naziv predmeta i opis su obavezni.",
        descriptionRequired: "Opis rada je obavezan.",
        clientRequired: "Molimo odaberite klijenta",
        dateRequired: "Datum je obavezan.",
        invalidHoursOrRate:
          "Unesite ispravne sate (0.25–24) i nenegativnu satnicu.",
        createFailed: "Neuspješno evidentiranje vremena. Pokušajte ponovo.",
      },
      common: {
        emptyValue: "—",
      },
    },
    clients: {
      header: {
        kicker: "Legantis · Klijenti",
        title: "Klijenti",
        subtitle:
          "Upravljajte listom klijenata, sačuvajte ključne kontakt informacije i pripremite pristup klijentskom portalu.",
        back: "Nazad na kontrolnu ploču",
      },
      actions: {
        addClient: "Dodaj klijenta",
        cancel: "Otkaži",
        deleteAria: "Obriši klijenta",
      },
      conflictPrecheck: {
        title: "Provjera sukoba interesa",
        subtitle:
          "Prije dodavanja novog klijenta, pokrenite brzu provjeru sukoba kroz vaš radni prostor.",
        name: {
          label: "Ime/naziv potencijalnog klijenta",
          placeholder: "npr. John Doe / Johnson Ltd",
        },
        actions: {
          check: "Pokreni provjeru",
          checking: "Provjeravam…",
          continue: "Nastavi na podatke klijenta",
          proceedAnyway: "Nastavi uprkos sukobu",
          startOver: "Počni ispočetka",
        },
        clear: {
          title: "Nema pronađenih sukoba — sigurno je nastaviti",
          body:
            "Nisu pronađeni odgovarajući klijenti, ugovori ili predmeti u vašem radnom prostoru.",
        },
        conflict: {
          title: "Pronađen je potencijalni sukob",
          body:
            "Pregledajte rezultate ispod. Možete nastaviti samo nakon potvrde da ste pregledali potencijalni sukob.",
        },
        override: {
          label:
            "Pregledao/la sam potencijalni sukob i potvrđujem da je sigurno nastaviti.",
        },
      },
      form: {
        fullName: {
          label: "Ime i prezime",
          placeholder: "npr. Ana Kovač",
        },
        email: {
          label: "Email adresa",
          placeholder: "ana.kovac@example.com",
        },
        phone: {
          label: "Broj telefona",
          placeholder: "+387 61 000 000",
        },
        companyName: {
          label: "Naziv kompanije",
          placeholder: "npr. ACME d.o.o.",
        },
        notes: {
          label: "Bilješke",
          placeholder:
            "Ključne informacije o klijentu, tipični predmeti, preferencije...",
        },
        actions: {
          saving: "Čuvam klijenta...",
          save: "Sačuvaj klijenta",
        },
        errors: {
          nameAndEmailRequired: "Ime i prezime i email su obavezni.",
          mustBeLoggedInToAdd: "Morate biti prijavljeni da biste dodali klijente.",
          createFailed: "Neuspješno dodavanje klijenta. Pokušajte ponovo.",
        },
      },
      list: {
        title: "Lista klijenata",
        subtitle: "Svi klijenti koje ste dodali u vaš radni prostor.",
        sortBy: "Sortiraj po",
        sort: {
          name: "Imenu",
          dateAdded: "Datumu dodavanja",
        },
        sortAscending: "Sortiraj rastuće",
        sortDescending: "Sortiraj opadajuće",
        loading: "Učitavanje klijenata...",
        emptyTitle: "Još nema klijenata.",
        emptySubtitle:
          "Dodajte prvog klijenta koristeći dugme „Dodaj klijenta” iznad.",
        added: "Dodato",
      },
      sidebar: {
        title: "Detalji klijenta",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje klijenta…",
        recordNotFound: "Zapis nije pronađen",
        email: "Email:",
        phone: "Telefon:",
        address: "Adresa:",
        defaultRate: "Podrazumijevana satnica:",
        status: "Status:",
      },
      messages: {
        added: "Klijent je uspješno dodat.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli klijente.",
        loadFailed: "Neuspješno učitavanje klijenata. Pokušajte ponovo.",
      },
      common: {
        notSet: "Nije postavljeno",
      },
    },
    conflict: {
      header: {
        kicker: "Legantis · Provjera sukoba",
        title: "Provjera sukoba interesa",
        subtitle:
          "Pretražite klijente, ugovore i bilješke o predmetima kako biste otkrili potencijalne sukobe prije prihvatanja novog klijenta.",
      },
      form: {
        query: {
          label: "Ime osobe ili naziv firme",
          placeholder: "Unesite ime…",
          help:
            "Pretraga nije osjetljiva na velika/mala slova i podržava djelimična imena (npr. „John” nalazi „John Doe” i „Johnson Ltd”).",
        },
        actions: {
          check: "Provjeri sukobe",
          checking: "Provjeravam…",
        },
      },
      errors: {
        queryRequired: "Unesite ime za pretragu.",
        searchFailed: "Provjera sukoba nije uspjela. Pokušajte ponovo.",
        historyFailed: "Neuspjelo učitavanje historije provjera.",
      },
      results: {
        matchCountSuffix: "poklapanja",
        clearBadge: "Čisto",
        clearTitle: "Nema pronađenih sukoba",
        clearBody: "Nema poklapanja u vašem radnom prostoru. Možete nastaviti.",
        conflictBadge: "Provjeriti",
        conflictTitle: "Otkriven potencijalni sukob",
        conflictBody:
          "Pronađena su poklapanja u vašem radnom prostoru. Pregledajte detalje prije nastavka.",
        groups: {
          clients: "Klijenti",
          contracts: "Ugovori",
          cases: "Predmeti",
        },
      },
      history: {
        title: "Skorašnje provjere",
        refresh: "Osvježi",
        refreshing: "Osvježavam…",
        loading: "Učitavanje historije…",
        empty: "Još nema provjera sukoba.",
        upgradeHint:
          "Historija provjera sukoba dostupna je na Professional i Firm planovima.",
        badges: {
          clear: "Čisto",
          conflict: "Sukob",
        },
        overrideLine: "Nastavljeno uprkos potencijalnom sukobu (override).",
      },
    },
    activity: {
      header: {
        title: "Skorašnja aktivnost",
        subtitle:
          "Pregledajte i otvorite skorašnje dokumente, ugovore, predviđanja, analize i klijente.",
      },
      tabs: {
        feed: "Pregled",
        audit: "Dnevnik aktivnosti",
      },
      audit: {
        empty: "Još nema unosa u dnevniku aktivnosti.",
      },
      filters: {
        all: "Sve",
        matters: "Predmeti",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
        matter: "Predmet",
        contract: "Ugovor",
        document: "Dokument",
        analysis: "Analiza dokumenta",
        prediction: "Predviđanje ishoda",
        client: "Klijent",
      },
      list: {
        empty: "Nema skorašnje aktivnosti za ovaj filter.",
      },
      actions: {
        loadMore: "Učitaj još",
      },
    },
    billing: {
      header: {
        title: "Fakturisanje",
        subtitle: "Upravljajte svojim planom i pretplatom.",
      },
      messages: {
        subscriptionUpdated: "Pretplata je uspješno ažurirana.",
      },
      currentPlan: {
        title: "Trenutni plan",
        workspace: "Vaš radni prostor",
        workspaceSuffix: "radni prostor",
        trialEndsPrefix: "Probni period ističe za",
        dayOne: "dan",
        dayMany: "dana",
        statusPrefix: "Status vaše pretplate je",
        noPaidPlanBadge: "Bez plaćenog paketa",
        freeHint:
          "Koristite besplatni nivo (samo generisanje dokumenata). Odaberite plan ispod da otključate ostale funkcije.",
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        openingPortal: "Otvaram portal...",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
        subscribe: "Pretplati se",
      },
      badges: {
        recommended: "Preporučeno",
      },
      tiers: {
        features: {
          documentGeneration: "Generisanje dokumenata",
          contractDrafting: "Priprema ugovora",
          templateLibrary: "Biblioteka šablona",
          aiCalls20: "20 AI poziva dnevno",
          everythingInSolo: "Sve iz Solo paketa",
          caseOutcomePredictions: "Predviđanje ishoda sporova",
          documentAnalysis: "Analiza dokumenata",
          timeTrackingBilling: "Praćenje vremena i fakturisanje",
          clientPortal: "Klijentski portal",
          aiCalls100: "100 AI poziva dnevno",
          everythingInProfessional: "Sve iz Professional paketa",
          prioritySupport: "Prioritetna podrška",
          aiCalls300: "300 AI poziva dnevno",
          multipleTeamMembers: "Više članova tima",
        },
      },
      footer: {
        paddleEnvironment: "Paddle okruženje:",
        paddleHint:
          "Ako dugme za plaćanje ne radi, provjerite da li je postavljen Paddle client token.",
      },
      errors: {
        missingTransactionId: "Nedostaje transactionId",
        paddleNotInitialized: "Paddle nije inicijalizovan",
        paddleCheckoutUnavailable: "Paddle checkout nije dostupan",
        checkoutFailed: "Plaćanje nije uspjelo",
        portalOpenFailed: "Nije moguće otvoriti portal za naplatu.",
      },
      common: {
        unknown: "nepoznato",
      },
    },
    settings: {
      header: {
        title: "Postavke",
        subtitle: "Upravljajte profilom, preferencijama, sigurnošću i računom.",
      },
      tabs: {
        profile: "Profil",
        preferences: "Preferencije",
        banking: "Banka",
        security: "Sigurnost",
        danger: "Opasna zona",
      },
      banking: {
        title: "Podaci za bankovni transfer",
        introAccount:
          "Ovi podaci će se koristiti na fakturama kao uputstvo za plaćanje. Sačuvano za vaš račun.",
        introFirm:
          "Ovi podaci će se koristiti na fakturama kao uputstvo za plaćanje. Sačuvano na nivou kancelarije.",
        bankName: {
          label: "Naziv banke",
          placeholder: "npr. UniCredit Bank",
        },
        accountHolder: {
          label: "Vlasnik računa",
          placeholder: "npr. naziv vaše kancelarije",
        },
        iban: {
          label: "IBAN",
          placeholder: "XX00 0000 0000 0000 0000",
        },
        swift: {
          label: "SWIFT/BIC (opcionalno)",
          placeholder: "npr. UNCRBA22",
        },
        defaultForInvoices: {
          title: "Podrazumijevano za nove fakture",
          subtitle:
            "Kada je uključeno, ovaj račun će biti automatski popunjen na novim fakturama.",
        },
        save: "Sačuvaj bankovne podatke",
        saving: "Čuvanje...",
        messageSaved: "Bankovni podaci su sačuvani.",
        errors: {
          loadFailed: "Učitavanje bankovnih podataka nije uspjelo",
          saveFailed: "Čuvanje bankovnih podataka nije uspjelo",
        },
      },
      profile: {
        title: "Profil",
        fullName: {
          label: "Ime i prezime",
          placeholder: "Vaše ime i prezime",
        },
        email: {
          label: "Email",
        },
        lawFirmName: {
          label: "Naziv advokatske kancelarije",
          placeholder: "Vaša kancelarija (opciono)",
        },
        preferredJurisdiction: {
          label: "Preferirana jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        preferredLanguage: {
          label: "Preferirani jezik",
          placeholder: "Izaberite jezik",
        },
        actions: {
          save: "Sačuvaj profil",
        },
      },
      preferences: {
        title: "Preferencije",
        defaultJurisdiction: {
          label: "Podrazumijevana jurisdikcija",
          placeholder: "Izaberite podrazumijevanu jurisdikciju",
        },
        currency: {
          label: "Podrazumijevana valuta",
        },
        theme: {
          label: "Tema",
          light: "Svijetla",
          dark: "Tamna",
        },
        emailNotifications: {
          title: "Email obavještenja",
          subtitle:
            "Primajte važne novosti o naplati, aktivnosti i promjenama proizvoda.",
        },
        note:
          "Tema se čuva čim je promijenite. Postavke valute i obavještenja povezujemo s naplatom i upozorenjima aktivnosti. Neke opcije su trenutno samo informativne i možda još ne utiču na ponašanje aplikacije.",
        actions: {
          save: "Sačuvaj preferencije",
        },
      },
      security: {
        title: "Promjena lozinke",
        currentPassword: {
          label: "Trenutna lozinka",
        },
        newPassword: {
          label: "Nova lozinka",
        },
        confirmPassword: {
          label: "Potvrdite novu lozinku",
        },
        actions: {
          save: "Sačuvaj lozinku",
        },
        messages: {
          passwordUpdated: "Lozinka je uspješno ažurirana.",
        },
        errors: {
          passwordTooShort: "Nova lozinka mora imati najmanje 8 karaktera.",
          passwordsDoNotMatch: "Nova lozinka i potvrda se ne podudaraju.",
          missingEmail: "Nedostaje korisnički email za promjenu lozinke.",
          currentPasswordIncorrect: "Trenutna lozinka nije ispravna.",
          failedToChangePassword: "Neuspješna promjena lozinke",
        },
      },
      plan: {
        title: "Trenutni plan",
        tierLabel: "Pretplatni paket:",
        statusLabel: "Status:",
        tierNone: "Nema (besplatno — samo dokumenti)",
        statusNone: "Niste pretplaćeni",
        note: "Upravljajte naplatom, računima i nadogradnjama na stranici naplate.",
        actions: {
          manageBilling: "Upravljaj naplatom",
        },
      },
      danger: {
        title: "Opasna zona",
        export: {
          title: "Izvezi sve moje podatke (GDPR)",
          subtitle:
            "Preuzmite JSON izvoz profila, ugovora, dokumenata, predviđanja, analiza, klijenata i unosa vremena za vašu evidenciju.",
          preparing: "Pripremam izvoz...",
          action: "Izvezi sve moje podatke (GDPR)",
        },
        delete: {
          title: "Obriši nalog",
          subtitle:
            "Ovo će označiti vaš profil kao obrisan i odjaviće vas. Ovu radnju nije moguće poništiti.",
          action: "Obriši moj nalog",
          dialogTitle: "Obriši nalog",
          dialogDescription:
            "Da li ste sigurni? Ovo se ne može poništiti. Vaš profil će biti označen kao obrisan i bićete odjavljeni.",
          confirm: "Obriši nalog",
        },
        errors: {
          failedToExportData: "Neuspješan izvoz podataka",
          failedToDeleteAccount: "Neuspješno brisanje naloga",
        },
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      languages: {
        Serbian: "Srpski",
        Croatian: "Hrvatski",
        Bosnian: "Bosanski",
        Montenegrin: "Crnogorski",
        Slovenian: "Slovenački",
        English: "Engleski",
      },
      messages: {
        profileUpdated: "Profil je uspješno ažuriran.",
        preferencesSaved:
          "Preferencije su sačuvane. Neke opcije još nisu trajno sačuvane (uskoro).",
      },
      errors: {
        failedToSaveProfile: "Neuspješno čuvanje profila",
        failedToSavePreferences: "Neuspješno čuvanje preferencija",
      },
      common: {
        saving: "Čuvam...",
        cancel: "Otkaži",
        deleting: "Brišem...",
      },
    },
    templates: {
      header: {
        kicker: "Legantis · Biblioteka šablona",
        title: "Unaprijed pripremljeni pravni šabloni",
        subtitle:
          "Pregledajte odabrane šablone specifične za jurisdikciju i započnite AI asistirano sastavljanje.",
      },
      filters: {
        documentType: {
          label: "Vrsta dokumenta",
          all: "Sve vrste dokumenata",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          all: "Sve jurisdikcije",
        },
        search: {
          label: "Pretraga",
          placeholder: "Pretražite po nazivu ili ključnoj riječi...",
        },
      },
      documentTypes: {
        nda: "NDA",
        employment: "Zaposlenje",
        power_of_attorney: "Punomoć",
        sales: "Prodaja",
        lease: "Zakup",
        service: "Ugovor o uslugama",
        salesAgreement: "Ugovor o prodaji",
        leaseAgreement: "Ugovor o zakupu",
        serviceAgreement: "Ugovor o uslugama",
        legalDocument: "Pravni dokument",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      list: {
        empty:
          "Nijedan šablon ne odgovara filterima. Pokušajte promijeniti vrstu dokumenta, jurisdikciju ili pojmove pretrage.",
      },
      preview: {
        title: "Pregled šablona",
        subtitle: "Pregledajte osnovni tekst prije generisanja prilagođenog nacrta.",
        empty:
          "Izaberite šablon sa liste da biste ovdje vidjeli detalje i pregled sadržaja.",
      },
      actions: {
        goToGenerator: "Idi na generator",
        preview: "Pregled",
        useTemplate: "Koristi ovaj šablon",
      },
      common: {
        notSpecified: "Nije navedeno",
        translating: "Prevodim predložak…",
      },
    },
  },
  hr: {
    nav: {
      features: "Funkcionalnosti",
      pricing: "Cijene",
      login: "Prijava",
      getStarted: "Započni",
      dashboard: "Nadzorna ploča",
      generate: "Generiranje",
      conflict: "Provjera sukoba",
      research: "Pravno istraživanje",
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      redline: "Izmjena ugovora",
      time: "Vrijeme",
      clients: "Klijenti",
      matters: "Predmeti",
      intake: "Prijavni obrazac",
      activity: "Aktivnosti",
      billing: "Naplata",
      settings: "Postavke",
      templates: "Prijedlozi",
      deadlines: "Rokovi",
      actions: "Radnje",
      aiTools: "AI Alati",
      management: "Upravljanje",
      logout: "Odjava",
      themeToggle: "Prebacivanje svijetle i tamne teme",
    },
    auth: {
      signingIn: "Prijava u tijeku...",
      creatingAccount: "Kreiranje računa...",
    },
    redline: {
      header: {
        title: "Izmjena ugovora",
        subtitle:
          "Učitajte ugovor, pregledajte AI prijedloge izmjena i preuzmite ažurirani DOCX.",
      },
      upload: {
        label: "Učitaj ugovor",
      },
      instructions: {
        label: "Upute za redlajnanje (opcionalno)",
        placeholder: 'npr. "Učini ugovor povoljnijim za poslodavca"',
      },
      actions: {
        analyze: "Analiziraj i redlajnaj",
        acceptAll: "Prihvati sve",
        rejectAll: "Odbij sve",
        download: "Preuzmi redlajnovani DOCX",
        saveSession: "Spremi sesiju",
        loadSession: "Učitaj",
      },
      changes: {
        title: "Izmjene",
        accepted: "prihvaćeno",
        total: "izmjena",
        addition: "Dodavanje",
        deletion: "Brisanje",
        replacement: "Zamjena",
        replacements: "Zamjene",
        position: "poz",
        scrollHint: "Skrolajte za sve izmjene",
      },
      sessions: {
        title: "Prethodne sesije",
        empty: "Nema spremljenih sesija.",
        changes: "izmjena",
      },
      messages: {
        analyzing: "Analiza u tijeku...",
        noChanges: "Nema predloženih izmjena.",
      },
    },
    matters: {
      kicker: "Legantis · Predmeti",
      title: "Predmeti",
      subtitle:
        "Organizirajte rad po predmetima i držite ugovore, rokove, vrijeme i naplatu na jednom mjestu.",
      actions: {
        new: "Novi predmet",
        create: "Kreiraj predmet",
        edit: "Uredi",
        save: "Spremi",
        cancel: "Odustani",
        open: "Otvori",
        close: "Zatvori",
        archive: "Arhiviraj",
      },
      fields: {
        title: "Naslov",
        client: "Klijent",
        matterType: "Vrsta predmeta",
        jurisdiction: "Nadležnost",
        description: "Opis",
        openedAt: "Datum otvaranja",
        status: "Status",
      },
      filters: {
        status: "Status",
        type: "Vrsta",
        search: "Pretraži",
        searchPlaceholder: "Pretraži po naslovu ili klijentu…",
        all: "Svi",
      },
      select: {
        placeholder: "Odaberite predmet (neobavezno)",
        none: "Bez predmeta",
        help:
          "Neobavezno. Povezuje stavku s predmetom bez promjene prikaza postojećih unosa.",
      },
      status: {
        open: "Otvoren",
        on_hold: "Na čekanju",
        closed: "Zatvoren",
        archived: "Arhiviran",
      },
      types: {
        civil: "Građansko",
        criminal: "Kazneno",
        family: "Obiteljsko",
        labor: "Radno",
        commercial: "Trgovačko",
        administrative: "Upravno",
        other: "Ostalo",
      },
      stats: {
        contracts: "Ugovori",
        deadlines: "Rokovi",
        unbilledHours: "Nenaplaćeni sati",
      },
      tabs: {
        overview: "Pregled",
        deadlines: "Rokovi",
        documentsContracts: "Dokumenti i ugovori",
        timeBilling: "Vrijeme i naplata",
        predictions: "Predviđanja",
      },
      detail: {
        kicker: "Legantis · Predmet",
        backToList: "Natrag na predmete",
        notFound: "Predmet nije pronađen.",
        loadFailed: "Neuspješno učitavanje predmeta.",
        stats: {
          openDeadlines: "Otvoreni rokovi",
          totalBilled: "Ukupno naplaćeno",
          outstandingPrefix: "Dugovanje:",
        },
        recentActivity: {
          title: "Nedavne aktivnosti",
          subtitle: "Najnoviji rad vezan uz ovaj predmet.",
          empty: "Još nema aktivnosti za ovaj predmet.",
        },
        deadlines: {
          subtitle: "Rokovi povezani s ovim predmetom.",
          add: "Dodaj rok",
          empty: "Još nema povezanih rokova.",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Ugovori povezani s ovim predmetom.",
          generate: "Generiraj ugovor",
          empty: "Još nema povezanih ugovora.",
        },
        documents: {
          title: "Dokumenti",
          subtitle: "Dokumenti povezani s ovim predmetom.",
          analyze: "Analiziraj dokument",
          empty: "Još nema povezanih dokumenata.",
        },
        time: {
          title: "Unosi vremena",
          subtitle: "Unosi vremena povezani s ovim predmetom.",
          log: "Evidentiraj vrijeme",
          empty: "Još nema povezanih unosa vremena.",
        },
        billing: {
          title: "Računi",
          subtitle: "Računi povezani s ovim predmetom.",
          empty: "Još nema povezanih računa.",
        },
        predictions: {
          subtitle: "Predviđanja povezana s ovim predmetom.",
          new: "Novo predviđanje",
          empty: "Još nema povezanih predviđanja.",
        },
      },
      empty: {
        title: "Još nema predmeta",
        subtitle:
          "Kreirajte prvi predmet kako biste organizirali ugovore, rokove i evidenciju vremena.",
      },
    },
    language: {
      label: "Jezik",
    },
    signature: {
      actions: {
        sendForSignature: "Pošalji na potpis",
        cancelRequest: "Otkaži zahtjev",
        resendEmail: "Ponovno pošalji email",
        copySigningLink: "Kopiraj poveznicu za potpis",
        downloadSignedPdf: "Preuzmi potpisani PDF",
        sendNewRequest: "Pošalji novi zahtjev",
        signDocument: "Potpiši dokument",
      },
      status: {
        none: "Nema",
        pending: "Na čekanju",
        signed: "Potpisano",
        expired: "Isteklo",
        cancelled: "Otkazano",
      },
      dialog: {
        title: "Pošalji na potpis",
        signerName: "Ime potpisnika",
        signerEmail: "Email potpisnika",
        message: "Poruka (opcionalno)",
        expiresDays: "Istek (dani)",
        sending: "Slanje…",
        send: "Pošalji",
      },
      dashboard: {
        contractsTitle: "Ugovori",
        contractsSubtitle: "Pošaljite ugovore na potpis i pratite status.",
        refreshHint: "Osvježi",
        colContract: "Ugovor",
        colSignatureStatus: "Potpis",
        colActions: "Radnje",
        loadingContracts: "Učitavanje ugovora…",
        noContracts: "Još nema ugovora.",
        failedToLoadContracts: "Nije moguće učitati ugovore.",
        failedToCreate: "Nije moguće kreirati zahtjev za potpis.",
        failedToCancel: "Nije moguće otkazati zahtjev.",
        failedToResend: "Nije moguće ponovno poslati email.",
        failedToCopyLink: "Nije moguće kopirati poveznicu.",
        failedToDownload: "Nije moguće generirati poveznicu za preuzimanje.",
        statsTitle: "Potpisi",
        pendingSignatures: "Potpisi na čekanju",
        signedThisMonth: "Potpisano ovog mjeseca",
      },
      public: {
        loading: "Učitavanje…",
        notFoundTitle: "Poveznica za potpis nije pronađena",
        notFoundBody: "Ova poveznica je nevažeća ili više nije dostupna.",
        expiredTitle: "Ova poveznica za potpis je istekla",
        expiredBody: "Kontaktirajte pošiljatelja da zatražite novu poveznicu.",
        alreadySignedTitle: "Ovaj dokument je već potpisan",
        alreadySignedBody: "Nije potrebna daljnja radnja.",
        cancelledTitle: "Zahtjev za potpis je otkazan",
        cancelledBody: "Kontaktirajte pošiljatelja ako mislite da je greška.",
        successTitle: "Uspješno potpisano",
        successBody: "Potpisani PDF možete preuzeti ispod.",
        sentBy: "Poslao/la",
        unknownSender: "Nepoznat pošiljatelj",
        expiresOn: "Ističe",
        reviewTitle: "Pregled dokumenta",
        checkboxAgree: "Pročitao/la sam i prihvaćam uvjete ovog ugovora",
        typedNameLabel: "Upišite svoje puno ime",
        typedNamePlaceholder: "Puno ime",
        signing: "Potpisivanje…",
      },
    },
    rag: {
      title: "Dohvaćeni pravni izvori",
      articleSingular: "članak",
      articlePlural: "članaka",
      matchPercent: "{pct}% podudarnosti",
      translating: "Prevođenje odlomaka…",
      paragraphLabel: "stavak",
      invalidCitations:
        "⚠ Sljedeći citati u odgovoru umjetne inteligencije nisu pronađeni u preuzetoj pravnoj bazi i mogu biti netočni:",
      lowConfidence:
        "Nisko povjerenje: preuzete odredbe slabo odgovaraju ovom upitu. Primjenjivi zakon možda još nije u bazi.",
    },
    research: {
      kicker: "Legantis · Istraživanje",
      title: "Pravno istraživanje",
      subtitle:
        "Pretražite pravnu bazu i spremite istraživanja za kasnije.",
      search: {
        label: "Pitanje ili ključne riječi",
        placeholder: "npr. rok zastare za naknadu štete",
      },
      filters: {
        jurisdiction: "Jurisdikcija",
        category: "Kategorija",
        language: "Jezik",
        summaryPrefix: "Filteri:",
      },
      language: {
        local: "Lokalno",
        english: "Engleski",
      },
      jurisdictions: {
        all: "Sve jurisdikcije",
        serbia: "Srbija",
        croatia: "Hrvatska",
        bihFederation: "BiH Federacija",
        bihRs: "BiH RS",
        bihBrcko: "BiH Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      categories: {
        all: "Sve kategorije",
        civil: "Građansko",
        commercial: "Trgovačko",
        labor: "Radno",
        family: "Obiteljsko",
        criminal: "Kazneno",
        administrative: "Upravno",
        procedural: "Procesno",
        constitutional: "Ustavno",
        inheritance: "Nasljedno",
        property: "Stvarno",
        confidentiality: "Povjerljivost",
        misdemeanor: "Prekršajno",
      },
      actions: {
        search: "Pretraži",
        searching: "Pretraživanje…",
        save: "Spremi istraživanje",
        saving: "Spremanje…",
      },
      results: {
        title: "Rezultati",
        hint: "Pokrenite pretragu da biste vidjeli najrelevantnije članke zakona.",
        empty:
          "Nema relevantnih članaka. Pokušajte druge ključne riječi ili širu kategoriju.",
        countSuffix: "rezultata",
        confidenceLabel: "Pouzdanost",
        articleLabel: "Članak",
      },
      sessions: {
        title: "Nedavne pretrage",
        refresh: "Osvježi",
        refreshing: "Osvježavanje…",
        loading: "Učitavanje…",
        empty: "Još nema spremljenih istraživanja.",
        upgradeHint:
          "Spremanje istraživanja dostupno je na Professional i Firm planovima.",
      },
      upgradePrompt: "Nadogradite plan da biste spremili istraživanja.",
      errors: {
        queryRequired: "Unesite upit za pretragu.",
        searchFailed: "Pretraga nije uspjela. Pokušajte ponovo.",
        historyFailed: "Nije moguće učitati nedavne pretrage.",
        saveFailed: "Nije moguće spremiti istraživanje.",
      },
    },
    home: {
      hero: {
        trustBadge:
          "Pouzdani među odvjetnicima u Bosni, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji",
        title: "Vaš AI pravni asistent. Izgrađen za balkanske odvjetnike.",
        subtitle:
          "Pripremite ugovore za nekoliko minuta. Predvidite ishod. Upravljajte klijentima. Sve na jednoj platformi za BiH, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
        getStartedFree: "Započnite besplatno",
        pricingCta: "Pogledaj cijene",
        noCreditCard: "Kreditna kartica nije potrebna · Otkažite u bilo kojem trenutku",
        dashboardPreview: "Pregled nadzorne ploče",
      },
      jurisdictionBar: {
        title: "Izgrađeno za pravne sustave:",
        countries: {
          ba: "🇧🇦 Bosna i Hercegovina",
          rs: "🇷🇸 Srbija",
          hr: "🇭🇷 Hrvatska",
          me: "🇲🇪 Crna Gora",
          si: "🇸🇮 Slovenija",
        },
      },
      howItWorks: {
        title: "Kako Legantis radi",
        step1: {
          title: "Registracija za 60 sekundi",
          desc: "Otvorite račun, odaberite jurisdikciju i jezik. Bez dodatne postavke.",
        },
        step2: {
          title: "Opišite što vam treba",
          desc: "Recite Legantisu što pripremiti, analizirati ili istražiti. Kao u razgovoru.",
        },
        step3: {
          title: "Dobijte spreman materijal",
          desc: "Preuzmite ugovore, predviđanja i analize spremne za korištenje ili reviziju.",
        },
      },
      features: {
        badge: "16+ AI značajki",
        title: "Sve što vam treba da radite pametnije",
        titleNew: "Sve što modernom odvjetničkom uredu treba",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i suradnju s klijentima.",
        seeAll: "Pogledajte sve značajke →",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description:
              "Pripremite ugovore s klauzulama prilagođenima jurisdikciji. Dobijte prijedloge temeljene na lokalnoj praksi i brže završite konačnu verziju.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description:
              "Procijenite ishod predmeta na temelju prakse i lokalnog prava. Usporedite više strategija uz jasne pokazatelje rizika i sigurnije savjetujte klijente.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description:
              "Otpremite dokumente za provjeru rizika i usklađenosti. Brzo otkrijte sporne klauzule i dobijte strukturirane preporuke za izmjene.",
          },
          time: {
            title: "Praćenje vremena",
            description:
              "Evidentirajte naplativo vrijeme i kreirajte račune. Bilježite rad kroz svakodnevne aktivnosti i smanjite gubitak naplativih sati.",
          },
          portal: {
            title: "Klijentski portal",
            description:
              "Sigurna razmjena dokumenata i komunikacija s klijentima. Sve poruke, datoteke i statusi ostaju pregledni na jednom zaštićenom mjestu.",
          },
        },
      },
      pricing: {
        noFees: "Jednostavne cijene. Bez skrivenih naknada.",
        title: "Jednostavne i Transparentne Cijene",
        subtitle:
          "Odaberite paket koji odgovara vašem uredu. Svi paketi uključuju ključne AI funkcionalnosti.",
        recommended: "Najpopularniji",
        trustLine:
          "Sigurna uplata putem Paddle-a · U skladu s GDPR-om · Otkažite u bilo kojem trenutku",
        comparison: {
          colFeature: "Značajka",
          colSolo: "Solo",
          colProfessional: "Professional",
          colFirm: "Firm",
          rowAiCalls: "AI poziva dnevno",
          rowContractTypes: "Vrste ugovora",
          rowUsers: "Korisnici",
          rowPriority: "Prioritetna podrška",
          all: "Sve",
          usersFirm: "Do 5",
          yes: "✓",
          no: "✗",
        },
        tiers: {
          solo: {
            name: "Solo",
            features: {
              "Document generation": "Generiranje dokumenata",
              "Contract drafting": "Priprema ugovora",
              "Template library": "Biblioteka predložaka",
              "20 AI calls/day": "20 AI poziva dnevno",
            },
          },
          professional: {
            name: "Professional",
            features: {
              "Everything in Solo": "Sve iz Solo paketa",
              "Case outcome predictions": "Predviđanje ishoda sporova",
              "Document analysis": "Analiza dokumenata",
              "Time tracking & billing": "Praćenje vremena i fakturiranje",
              "Client portal": "Klijentski portal",
              "100 AI calls/day": "100 AI poziva dnevno",
            },
          },
          firm: {
            name: "Firm",
            features: {
              "Everything in Professional": "Sve iz Professional paketa",
              "Priority support": "Prioritetna podrška",
              "300 AI calls/day": "300 AI poziva dnevno",
              "Multiple team members": "Više članova tima",
            },
          },
        },
        perMonth: "/mjesečno",
        cta: "Započni",
      },
      testimonials: {
        badge: "Povratne informacije (rani pristup)",
        title: "Što odvjetnici kažu",
        disclaimer:
          "* Povratne informacije u ranoj fazi — imena su izostavljena radi privatnosti",
        items: {
          "1": {
            quote:
              "Legantis mi je uštedio sate na pripremi ugovora. Klauzule po jurisdikciji su točno ono što treba.",
            name: "Advokat, Sarajevo",
          },
          "2": {
            quote:
              "Značajka predviđanja ishoda pomaže mi postaviti realna očekivanja s klijentima od prvog dana.",
            name: "Odvjetnik, Zagreb",
          },
          "3": {
            quote:
              "Rokove, račune i dokumente upravljam na jednom mjestu. Konačno.",
            name: "Advokat, Beograd",
          },
        },
      },
      faq: {
        title: "Često postavljana pitanja",
        subtitle:
          "Sve što trebate znati prije početka rada s platformom Legantis.",
        panelTitle: "Pitanja o početku korištenja?",
        panelDescription:
          "Imate pitanja o našem AI Pravnom Asistentu? Pronađite odgovore na najčešća pitanja i otkrijte kako naša platforma može pojednostaviti vaš tijek rada, unaprijediti donošenje odluka i poboljšati ukupnu učinkovitost.",
        items: {
          q1: {
            question: "Postoji li besplatno probno razdoblje?",
            answer:
              "Da. Možete započeti s besplatnim probnim razdobljem i isprobati ključne funkcije prije odabira plaćenog paketa. Nije potrebna kreditna kartica za početak. Kad probno razdoblje završi, možete odabrati paket koji vam odgovara ili prestati koristiti uslugu.",
          },
          q2: {
            question: "Koje su jurisdikcije trenutno podržane?",
            answer:
              "Legantis je prilagođen za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju. Zadane postavke i prijedlozi prate lokalnu pravnu praksu na tim tržištima. Podrška se može proširiti tijekom vremena—provjerite ovu stranicu ili postavke računa za najnoviji popis.",
          },
          q3: {
            question: "Mogu li izvesti generirane dokumente?",
            answer:
              "Da. Generirane dokumente možete izvesti u praktičnim formatima za internu provjeru i slanje klijentima. Možete spremiti nacrte lokalno za uređivanje u Wordu ili dijeliti PDF sa stranama. Dosljedno imenovanje i verzije u uredu pomažu da svi budu usklađeni.",
          },
          q4: {
            question: "Kako su zaštićeni podaci klijenata?",
            answer:
              "Koristimo sigurne kontrole pristupa i enkriptirane načine pohrane podataka kako bismo zaštitili pravnu dokumentaciju. Infrastrukturni partneri hostaju podatke u regijama opisanim u Pravilima privatnosti. Vi odlučujete koje podatke o predmetima pohranjujete i tko iz tima im može pristupiti.",
          },
          q5: {
            question: "Mogu li promijeniti ili otkazati paket u bilo kojem trenutku?",
            answer:
              "Da. Paket možete nadograditi, smanjiti ili otkazati u bilo kojem trenutku kroz postavke naplate. Promjene se obično primjenjuju od sljedećeg obračunskog ciklusa osim ako nije drugačije navedeno. Ako otkažete, obično zadržavate pristup do kraja već plaćenog razdoblja.",
          },
          q6: {
            question: "Jesu li podaci o klijentima sigurni?",
            answer:
              "Da. Svi se podaci pohranjuju na Supabase poslužiteljima u EU regiji, šifrirani u mirovanju. U skladu smo s GDPR-om.",
          },
          q7: {
            question: "Mogu li otkazati pretplatu u bilo kojem trenutku?",
            answer:
              "Da. Možete otkazati u bilo kojem trenutku u postavkama naplate. Bez naknade za otkazivanje.",
          },
        },
      },
    },
    footer: {
      taglineLine1:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu,",
      taglineLine2: "Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uvjeti korištenja",
      contact: "Kontakt",
      product: "Proizvod",
      legal: "Pravno",
      rights: "Sva prava pridržana",
      faqLink: "ČPP",
      privacyPolicy: "Pravila privatnosti",
      termsOfService: "Uvjeti pružanja usluge",
      refundPolicy: "Pravila povrata",
      supportEmail: "support@legantis.app",
    },
    conflict: {
      header: {
        kicker: "Legantis · Provjera sukoba",
        title: "Provjera sukoba interesa",
        subtitle:
          "Pretražite klijente, ugovore i bilješke o predmetima kako biste otkrili potencijalne sukobe prije prihvaćanja novog klijenta.",
      },
      form: {
        query: {
          label: "Ime osobe ili naziv tvrtke",
          placeholder: "Unesite ime…",
          help:
            "Pretraga nije osjetljiva na velika/mala slova i podržava djelomična imena (npr. „John” nalazi „John Doe” i „Johnson Ltd”).",
        },
        actions: {
          check: "Provjeri sukobe",
          checking: "Provjeravam…",
        },
      },
      errors: {
        queryRequired: "Unesite ime za pretragu.",
        searchFailed: "Provjera sukoba nije uspjela. Pokušajte ponovno.",
        historyFailed: "Neuspjelo učitavanje povijesti provjera.",
      },
      results: {
        matchCountSuffix: "podudaranja",
        clearBadge: "Čisto",
        clearTitle: "Nema pronađenih sukoba",
        clearBody: "Nema podudaranja u vašem radnom prostoru. Možete nastaviti.",
        conflictBadge: "Provjeriti",
        conflictTitle: "Otkriven potencijalni sukob",
        conflictBody:
          "Pronađena su podudaranja u vašem radnom prostoru. Pregledajte detalje prije nastavka.",
        groups: {
          clients: "Klijenti",
          contracts: "Ugovori",
          cases: "Predmeti",
        },
      },
      history: {
        title: "Nedavne provjere",
        refresh: "Osvježi",
        refreshing: "Osvježavam…",
        loading: "Učitavanje povijesti…",
        empty: "Još nema provjera sukoba.",
        upgradeHint:
          "Povijest provjera sukoba dostupna je na Professional i Firm planovima.",
        badges: {
          clear: "Čisto",
          conflict: "Sukob",
        },
        overrideLine: "Nastavljeno unatoč potencijalnom sukobu (override).",
      },
    },
    clients: {
      header: {
        kicker: "Legantis · Klijenti",
        title: "Klijenti",
        subtitle:
          "Upravljajte listom klijenata, sačuvajte ključne kontakt podatke i pripremite siguran pristup klijentskom portalu.",
        back: "Nazad na kontrolnu ploču",
      },
      actions: {
        addClient: "Dodaj klijenta",
        cancel: "Otkaži",
        deleteAria: "Obriši klijenta",
      },
      conflictPrecheck: {
        title: "Provjera sukoba interesa",
        subtitle:
          "Prije dodavanja novog klijenta, pokrenite brzu provjeru sukoba kroz vaš radni prostor.",
        name: {
          label: "Ime/naziv potencijalnog klijenta",
          placeholder: "npr. John Doe / Johnson Ltd",
        },
        actions: {
          check: "Pokreni provjeru",
          checking: "Provjeravam…",
          continue: "Nastavi na podatke klijenta",
          proceedAnyway: "Nastavi unatoč sukobu",
          startOver: "Počni ispočetka",
        },
        clear: {
          title: "Nema pronađenih sukoba — sigurno je nastaviti",
          body:
            "Nisu pronađeni odgovarajući klijenti, ugovori ili predmeti u vašem radnom prostoru.",
        },
        conflict: {
          title: "Pronađen je potencijalni sukob",
          body:
            "Pregledajte rezultate ispod. Možete nastaviti samo nakon potvrde da ste pregledali potencijalni sukob.",
        },
        override: {
          label:
            "Pregledao/la sam potencijalni sukob i potvrđujem da je sigurno nastaviti.",
        },
      },
      form: {
        fullName: {
          label: "Ime i prezime",
          placeholder: "npr. Ana Kovač",
        },
        email: {
          label: "Email adresa",
          placeholder: "ana.kovac@example.com",
        },
        phone: {
          label: "Broj telefona",
          placeholder: "+387 61 000 000",
        },
        companyName: {
          label: "Naziv kompanije",
          placeholder: "npr. ACME d.o.o.",
        },
        notes: {
          label: "Bilješke",
          placeholder:
            "Ključne informacije o klijentu, tipični predmeti, preferencije...",
        },
        actions: {
          saving: "Spremam klijenta...",
          save: "Sačuvaj klijenta",
        },
        errors: {
          nameAndEmailRequired: "Ime i prezime i email su obavezni.",
          mustBeLoggedInToAdd: "Morate biti prijavljeni da biste dodali klijente.",
          createFailed: "Neuspješno dodavanje klijenta. Pokušajte ponovo.",
        },
      },
      list: {
        title: "Lista klijenata",
        subtitle: "Svi klijenti koje ste dodali u vaš radni prostor.",
        sortBy: "Sortiraj po",
        sort: {
          name: "Imenu",
          dateAdded: "Datumu dodavanja",
        },
        sortAscending: "Sortiraj uzlazno",
        sortDescending: "Sortiraj silazno",
        loading: "Učitavanje klijenata...",
        emptyTitle: "Još nema klijenata.",
        emptySubtitle:
          "Dodajte prvog klijenta koristeći dugme „Dodaj klijenta” iznad.",
        added: "Dodano",
      },
      sidebar: {
        title: "Detalji klijenta",
        empty: "Nijedna stavka nije odabrana.",
        viewActivity: "Pogledaj nedavnu aktivnost",
        loading: "Učitavanje klijenta…",
        recordNotFound: "Zapis nije pronađen",
        email: "Email:",
        phone: "Telefon:",
        address: "Adresa:",
        defaultRate: "Podrazumijevana satnica:",
        status: "Status:",
      },
      messages: {
        added: "Klijent je uspješno dodan.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli klijente.",
        loadFailed: "Neuspješno učitavanje klijenata. Pokušajte ponovo.",
      },
      common: {
        notSet: "Nije postavljeno",
      },
    },
    activity: {
      header: {
        title: "Nedavna aktivnost",
        subtitle:
          "Pregledajte i otvorite nedavne dokumente, ugovore, predviđanja, analize i klijente.",
      },
      tabs: {
        feed: "Pregled",
        audit: "Dnevnik aktivnosti",
      },
      audit: {
        empty: "Još nema unosa u dnevniku aktivnosti.",
      },
      filters: {
        all: "Sve",
        matters: "Predmeti",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
        matter: "Predmet",
        contract: "Ugovor",
        document: "Dokument",
        analysis: "Analiza dokumenta",
        prediction: "Predviđanje ishoda",
        client: "Klijent",
      },
      list: {
        empty: "Nema nedavne aktivnosti za ovaj filter.",
      },
      actions: {
        loadMore: "Učitaj više",
      },
    },
    billing: {
      header: {
        title: "Naplata",
        subtitle: "Upravljajte svojim planom i pretplatom.",
      },
      messages: {
        subscriptionUpdated: "Pretplata je uspješno ažurirana.",
      },
      currentPlan: {
        title: "Trenutni plan",
        workspace: "Vaš radni prostor",
        workspaceSuffix: "radni prostor",
        trialEndsPrefix: "Probno razdoblje ističe za",
        dayOne: "dan",
        dayMany: "dana",
        statusPrefix: "Status vaše pretplate je",
        noPaidPlanBadge: "Bez plaćenog paketa",
        freeHint:
          "Koristite besplatnu razinu (samo generiranje dokumenata). Odaberite plan ispod da otključate ostale značajke.",
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        openingPortal: "Otvaram portal...",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
        subscribe: "Pretplati se",
      },
      badges: {
        recommended: "Preporučeno",
      },
      tiers: {
        features: {
          documentGeneration: "Generiranje dokumenata",
          contractDrafting: "Izrada ugovora",
          templateLibrary: "Biblioteka predložaka",
          aiCalls20: "20 AI poziva dnevno",
          everythingInSolo: "Sve iz Solo paketa",
          caseOutcomePredictions: "Predviđanje ishoda sporova",
          documentAnalysis: "Analiza dokumenata",
          timeTrackingBilling: "Praćenje vremena i fakturiranje",
          clientPortal: "Klijentski portal",
          aiCalls100: "100 AI poziva dnevno",
          everythingInProfessional: "Sve iz Professional paketa",
          prioritySupport: "Prioritetna podrška",
          aiCalls300: "300 AI poziva dnevno",
          multipleTeamMembers: "Više članova tima",
        },
      },
      footer: {
        paddleEnvironment: "Paddle okruženje:",
        paddleHint:
          "Ako gumb za plaćanje ne radi, provjerite je li postavljen Paddle client token.",
      },
      errors: {
        missingTransactionId: "Nedostaje transactionId",
        paddleNotInitialized: "Paddle nije inicijaliziran",
        paddleCheckoutUnavailable: "Paddle checkout nije dostupan",
        checkoutFailed: "Plaćanje nije uspjelo",
        portalOpenFailed: "Nije moguće otvoriti portal za naplatu.",
      },
      common: {
        unknown: "nepoznato",
      },
    },
    settings: {
      header: {
        title: "Postavke",
        subtitle: "Upravljajte profilom, preferencijama, sigurnošću i računom.",
      },
      tabs: {
        profile: "Profil",
        preferences: "Preferencije",
        banking: "Banka",
        security: "Sigurnost",
        danger: "Opasna zona",
      },
      banking: {
        title: "Podaci za bankovni prijenos",
        introAccount:
          "Ovi podaci koriste se na računima kao upute za plaćanje. Spremljeno za vaš račun.",
        introFirm:
          "Ovi podaci koriste se na računima kao upute za plaćanje. Spremljeno na razini ureda.",
        bankName: {
          label: "Naziv banke",
          placeholder: "npr. Zagrebačka banka",
        },
        accountHolder: {
          label: "Vlasnik računa",
          placeholder: "npr. naziv vašeg ureda",
        },
        iban: {
          label: "IBAN",
          placeholder: "XX00 0000 0000 0000 0000",
        },
        swift: {
          label: "SWIFT/BIC (opcionalno)",
          placeholder: "npr. ZABAHR2X",
        },
        defaultForInvoices: {
          title: "Zadano za nove račune",
          subtitle:
            "Kada je uključeno, ovaj račun bit će automatski popunjen na novim računima.",
        },
        save: "Spremi bankovne podatke",
        saving: "Spremanje...",
        messageSaved: "Bankovni podaci su spremljeni.",
        errors: {
          loadFailed: "Učitavanje bankovnih podataka nije uspjelo",
          saveFailed: "Spremanje bankovnih podataka nije uspjelo",
        },
      },
      profile: {
        title: "Profil",
        fullName: {
          label: "Ime i prezime",
          placeholder: "Vaše ime i prezime",
        },
        email: {
          label: "Email",
        },
        lawFirmName: {
          label: "Naziv odvjetničkog ureda",
          placeholder: "Vaš ured (opcionalno)",
        },
        preferredJurisdiction: {
          label: "Preferirana jurisdikcija",
          placeholder: "Odaberite jurisdikciju",
        },
        preferredLanguage: {
          label: "Preferirani jezik",
          placeholder: "Odaberite jezik",
        },
        actions: {
          save: "Spremi profil",
        },
      },
      preferences: {
        title: "Preferencije",
        defaultJurisdiction: {
          label: "Zadana jurisdikcija",
          placeholder: "Odaberite zadanu jurisdikciju",
        },
        currency: {
          label: "Zadana valuta",
        },
        theme: {
          label: "Tema",
          light: "Svijetla",
          dark: "Tamna",
        },
        emailNotifications: {
          title: "Email obavijesti",
          subtitle:
            "Primajte važne novosti o naplati, aktivnosti i promjenama proizvoda.",
        },
        note:
          "Tema se sprema čim je promijenite. Postavke valute i obavijesti povezujemo s naplatom i upozorenjima aktivnosti. Neke opcije su trenutno samo informativne i možda još ne utječu na ponašanje aplikacije.",
        actions: {
          save: "Spremi preferencije",
        },
      },
      security: {
        title: "Promjena lozinke",
        currentPassword: {
          label: "Trenutna lozinka",
        },
        newPassword: {
          label: "Nova lozinka",
        },
        confirmPassword: {
          label: "Potvrdite novu lozinku",
        },
        actions: {
          save: "Spremi lozinku",
        },
        messages: {
          passwordUpdated: "Lozinka je uspješno ažurirana.",
        },
        errors: {
          passwordTooShort: "Nova lozinka mora imati najmanje 8 znakova.",
          passwordsDoNotMatch: "Nova lozinka i potvrda se ne podudaraju.",
          missingEmail: "Nedostaje korisnički email za promjenu lozinke.",
          currentPasswordIncorrect: "Trenutna lozinka nije ispravna.",
          failedToChangePassword: "Neuspješna promjena lozinke",
        },
      },
      plan: {
        title: "Trenutni plan",
        tierLabel: "Pretplatni paket:",
        statusLabel: "Status:",
        tierNone: "Nema (besplatno — samo dokumenti)",
        statusNone: "Niste pretplaćeni",
        note: "Upravljajte naplatom, računima i nadogradnjama na stranici naplate.",
        actions: {
          manageBilling: "Upravljaj naplatom",
        },
      },
      danger: {
        title: "Opasna zona",
        export: {
          title: "Izvezi sve moje podatke (GDPR)",
          subtitle:
            "Preuzmite JSON izvoz profila, ugovora, dokumenata, predviđanja, analiza, klijenata i unosa vremena za vlastitu evidenciju.",
          preparing: "Pripremam izvoz...",
          action: "Izvezi sve moje podatke (GDPR)",
        },
        delete: {
          title: "Izbriši račun",
          subtitle:
            "Ovo će označiti vaš profil kao obrisan i odjaviti vas. Ovu radnju nije moguće poništiti.",
          action: "Izbriši moj račun",
          dialogTitle: "Izbriši račun",
          dialogDescription:
            "Jeste li sigurni? Ovo se ne može poništiti. Vaš profil će biti označen kao obrisan i bit ćete odjavljeni.",
          confirm: "Izbriši račun",
        },
        errors: {
          failedToExportData: "Neuspješan izvoz podataka",
          failedToDeleteAccount: "Neuspješno brisanje računa",
        },
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      languages: {
        Serbian: "Srpski",
        Croatian: "Hrvatski",
        Bosnian: "Bosanski",
        Montenegrin: "Crnogorski",
        Slovenian: "Slovenski",
        English: "Engleski",
      },
      messages: {
        profileUpdated: "Profil je uspješno ažuriran.",
        preferencesSaved:
          "Preferencije su spremljene. Neke opcije još nisu trajno spremljene (uskoro).",
      },
      errors: {
        failedToSaveProfile: "Neuspješno spremanje profila",
        failedToSavePreferences: "Neuspješno spremanje preferencija",
      },
      common: {
        saving: "Spremam...",
        cancel: "Otkaži",
        deleting: "Brišem...",
      },
    },
    templates: {
      header: {
        kicker: "Legantis · Biblioteka predložaka",
        title: "Unaprijed pripremljeni pravni predlošci",
        subtitle:
          "Pregledajte odabrane predloške specifične za jurisdikciju i započnite AI potpomognuto sastavljanje.",
      },
      filters: {
        documentType: {
          label: "Vrsta dokumenta",
          all: "Sve vrste dokumenata",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          all: "Sve jurisdikcije",
        },
        search: {
          label: "Pretraži",
          placeholder: "Pretraži po nazivu ili ključnoj riječi...",
        },
      },
      documentTypes: {
        nda: "NDA",
        employment: "Zaposlenje",
        power_of_attorney: "Punomoć",
        sales: "Prodaja",
        lease: "Najam",
        service: "Ugovor o uslugama",
        salesAgreement: "Ugovor o prodaji",
        leaseAgreement: "Ugovor o najmu",
        serviceAgreement: "Ugovor o uslugama",
        legalDocument: "Pravni dokument",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      list: {
        empty:
          "Nijedan predložak ne odgovara filterima. Pokušajte promijeniti vrstu dokumenta, jurisdikciju ili pojmove pretrage.",
      },
      preview: {
        title: "Pregled predloška",
        subtitle: "Pregledajte osnovni tekst prije generiranja prilagođenog nacrta.",
        empty:
          "Odaberite predložak s liste da biste ovdje vidjeli detalje i pregled sadržaja.",
      },
      actions: {
        goToGenerator: "Idi na generator",
        preview: "Pregled",
        useTemplate: "Koristi ovaj predložak",
      },
      common: {
        notSpecified: "Nije navedeno",
        translating: "Prevodim šablon…",
      },
    },
    dashboard: {
      featureUsage: {
        title: "Korištenje funkcionalnosti (nedavno)",
        labels: {
          case_prediction: "Predviđanje predmeta",
          contract_generation: "Gen. ugovora",
          document_generation: "Gen. dokumenata",
          document_analysis: "Analiza dok.",
          contract_drafting: "Nacrt ugovora",
          legal_research: "Pravno istraživanje",
          conflict_check: "Provjera sukoba",
          document_redlining: "Izmjene ugovora",
        },
      },
      header: {
        kicker: "Legantis nadzorna ploča",
        welcome: "Dobrodošli natrag,",
        planSuffix: "paket",
        noPaidPlan: "Bez plaćenog paketa (samo dokumenti)",
        statusNotSubscribed: "niste pretplaćeni",
      },
      planTier: {
        solo: "Solo",
        professional: "Professional",
        firm: "Firm",
      },
      stats: {
        clients: {
          title: "Klijenti",
          subtitle: "Aktivni klijenti u vašem prostoru",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Spremljeni i potpisani ugovori",
        },
        documents: {
          title: "Dokumenti i analize",
          subtitle: "Generirani dokumenti i analize rizika",
        },
        predictions: {
          title: "Predviđanja sporova",
          subtitle: "Do sada pokrenuta predviđanja ishoda",
        },
      },
      overview: {
        upgrade: "Nadogradi",
        lockedHint: "Nadogradite da otključate ovu funkciju.",
        notAvailable: "Nije dostupno",
        subscribeSolo: "Pretplatite se na Solo plan →",
        subscribeProfessional: "Pretplatite se na Professional plan →",
        subscribeFirm: "Pretplatite se na Firm plan →",
        stats: {
          totalClients: "Ukupno klijenata",
          activeMatters: "Aktivni predmeti",
          pendingSignatures: "Potpisi na čekanju",
          unbilledHours: "Nenaplaćeni sati",
        },
        cards: {
          analysis: {
            title: "Analiza dokumenata",
            description: "Izdvojite ključne klauzule i rizike iz dokumenata.",
          },
          matters: {
            description: "Upravljajte predmetima i povezanim radom.",
          },
          time: {
            title: "Vrijeme i fakture",
            description: "Evidentirajte sate i držite naplatu tačnom.",
          },
          deadlines: {
            title: "Predstojeći rokovi",
            subtitle: "Sljedeće stavke koje zahtijevaju pažnju.",
            description: "Pratite rokove i budite ispred obaveza.",
          },
          activity: {
            subtitle: "Najnovije promjene u vašem prostoru.",
          },
          invoices: {
            title: "Statistika faktura",
            subtitle: "Dugovanja i uplate ovog mjeseca.",
            outstanding: "Dugovanje",
            paidThisMonth: "Plaćeno ovog mjeseca",
          },
        },
      },
      actions: {
        title: "Brze akcije",
        subtitle: "Odmah pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiraj dokument",
          description:
            "Kreirajte NDA i druge ugovore uz pomoć AI-ja.",
        },
        research: {
          title: "Pravno istraživanje",
          description:
            "Pretražite propise kroz jurisdikcije uz skorove relevantnosti.",
        },
        contract: {
          title: "Izradi ugovor",
          description:
            "Višekoračni čarobnjak s klauzulama prilagođenima jurisdikciji.",
        },
        predict: {
          title: "Predvidi ishod spora",
          description:
            "AI analiza vjerojatnosti uspjeha na temelju prakse i prava.",
        },
        clients: {
          title: "Klijenti",
          description:
            "Upravljajte kontaktima i pristupom klijentskom portalu.",
        },
        templates: {
          title: "Biblioteka predložaka",
          description:
            "Pregledajte unaprijed pripremljene predloške i brzo krenite od jake osnove.",
        },
      },
      workspace: {
        unnamed: "Vaš Legantis prostor",
        subtitle:
          "Pregled aktivnosti kroz ugovore, dokumente i sudske predmete.",
        billing: {
          title: "Pretplata i paketi",
          trialPrefix: "Probno razdoblje traje do",
          freeTierLine: "Bez plaćenog paketa — samo generiranje dokumenata",
        },
        jurisdiction: {
          title: "Fokus jurisdikcije",
          subtitle:
            "Koristi se za prilagodbu predložaka, klauzula i predviđanja.",
        },
        invoices: {
          title: "Fakture",
          countSuffix: "faktura",
          subtitle: "Generirane na temelju vremena i klijenata.",
        },
      },
      usage: {
        title: "Korištenje AI alata",
        subtitle:
          "Nedavna Legantis aktivnost kroz generiranje, analizu i predviđanja.",
        tokens: "Potrošeni tokeni (nedavno)",
        cost: "Procijenjeni trošak",
        detailHint:
          "Detaljna upotreba po funkcijama pojavit će se kad počnete koristiti generiranje ugovora, predviđanja i analizu dokumenata.",
        featuresTitle: "Korištenje funkcija (nedavno)",
        featuresEmpty: "Još nema zabilježenog korištenja funkcija.",
      },
      roi: {
        title: "ROI za ovaj mjesec",
        hoursPrefix: "Približno ste uštedjeli",
        hoursSuffix: "rada ovog mjeseca.",
        valuePrefix: "To vrijeme vrijedi oko",
        valueMiddle: "u usporedbi s",
        ratioPrefix: "Približan ROI:",
        ratioSuffix: "vaše pretplate.",
        freeTierHint:
          "Pretplatite se na plaćeni plan da usporedite uštedu s cijenom pretplate.",
      },
      activity: {
        title: "Nedavna aktivnost",
        empty: "Još nema aktivnosti.",
      },
      activeMatters: {
        title: "Aktivni predmeti",
        subtitle: "Otvoreni predmeti nedavno ažurirani.",
        openCountLabel: "Otvorenih predmeta:",
        updatedPrefix: "Ažurirano:",
        viewAll: "Prikaži sve predmete",
        empty: "Još nema otvorenih predmeta.",
      },
      upcomingDeadlines: {
        title: "Predstojeći rokovi",
        subtitle: "Vaši sljedeći obveze i datumi.",
        viewAll: "Prikaži sve",
        empty: "Nema predstojećih rokova.",
      },
    },
    intake: {
      kicker: "Legantis · Prijem",
      title: "Obrasci za prijem klijenata",
      subtitle:
        "Podijelite poveznicu da novi klijenti sami unesu podatke prije sastanka.",
      loading: "Učitavanje…",
      empty: "Još nema obrazaca. Kreirajte jedan da počnete.",
      upgrade: {
        body:
          "Obrasci za prijem dostupni su na Professional i Firm planovima. Nadogradite da biste generirali poveznice i pretvarali prijave u klijente.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati obrasce.",
        toggleFailed: "Nije moguće ažurirati obrazac.",
        formNotFound: "Obrazac nije pronađen.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktivan",
        copyLink: "Kopiraj poveznicu",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi obrazac",
      },
      actions: {
        create: "Novi obrazac za prijem",
      },
      editor: {
        back: "Natrag na obrasce",
        titleNew: "Novi obrazac za prijem",
        titleEdit: "Uredi obrazac za prijem",
        subtitle:
          "Unesite naslov i opcionalna polja. Osnovna pitanja (ime, email, vrsta predmeta, jurisdikcija, vrsta potrebnog ugovora, kratak opis) uvijek su na javnom obrascu.",
        formTitle: "Naslov obrasca",
        description: "Opis (opcionalno)",
        optionalTitle: "Dodatna opcionalna polja",
        optionalHint:
          "Kada su uključena, klijenti ih vide na javnom obrascu.",
        optional: {
          company: "Naziv tvrtke",
          address: "Adresa",
          notes: "Napomene",
        },
        save: "Spremi",
        saving: "Spremam…",
        errors: {
          titleRequired: "Unesite naslov obrasca.",
          saveFailed: "Nije moguće spremiti obrazac.",
        },
      },
      public: {
        notFoundTitle: "Obrazac nije dostupan",
        notFoundBody: "Poveznica možda nije aktivna ili je netočna.",
        thankYouTitle: "Hvala",
        thankYouBody:
          "Vaši podaci su poslani. Vaš će vas odvjetnik uskoro kontaktirati.",
        fullName: "Puno ime",
        email: "E-pošta",
        phone: "Telefon (opcionalno)",
        caseType: "Vrsta predmeta",
        jurisdiction: "Jurisdikcija",
        contractTypeNeeded: "Vrsta potrebnog ugovora",
        matterDescription: "Kratak opis predmeta (opcionalno)",
        company: "Naziv tvrtke",
        address: "Adresa",
        notes: "Napomene",
        selectPlaceholder: "Odaberite…",
        submit: "Pošalji",
        submitting: "Šaljem…",
        caseTypes: {
          civil: "Građansko",
          criminal: "Kazneno",
          family: "Obiteljsko",
          commercial: "Gospodarsko",
          labor: "Radno",
          administrative: "Upravno",
          other: "Ostalo",
        },
        jurisdictions: {
          bih_fbih: "BiH – Federacija",
          bih_rs: "BiH – Republika Srpska",
          bih_brcko: "BiH – Distrikt Brčko",
          serbia: "Srbija",
          croatia: "Hrvatska",
          montenegro: "Crna Gora",
          slovenia: "Slovenija",
        },
        contractTypes: {
          employment: "Ugovor o radu",
          service: "Ugovor o pružanju usluga",
          sales: "Ugovor o kupoprodaji",
          lease: "Ugovor o zakupu/najmu",
          nda: "NDA / Ugovor o tajnosti",
          partnership: "Ugovor o partnerstvu",
        },
        errors: {
          nameEmail: "Unesite puno ime i e-poštu.",
          caseAndJurisdiction: "Odaberite vrstu predmeta i jurisdikciju.",
          contractTypeNeeded: "Odaberite vrstu potrebnog ugovora.",
          submitFailed: "Slanje nije uspjelo. Pokušajte ponovno.",
        },
      },
      submissions: {
        title: "Prijave na obrazac",
        back: "Natrag na obrasce",
        empty: "Još nema prijava.",
        convert: "Pretvori u klijenta",
        archive: "Arhiviraj",
        openClient: "Otvori klijenta",
        col: {
          submitted: "Poslano",
          contact: "Klijent",
          caseType: "Vrsta predmeta",
          status: "Status",
          actions: "Akcije",
        },
        status: {
          pending: "Na čekanju",
          converted: "Pretvoreno",
          archived: "Arhivirano",
        },
        messages: {
          linkedExisting:
            "Ovaj e-mail već postoji kao klijent. Prijava je povezana s postojećim zapisom.",
          created: "Klijent je uspješno stvoren.",
        },
        errors: {
          missingNameEmail: "U prijavi nedostaje ime ili e-pošta.",
          convertFailed: "Nije moguće stvoriti klijenta.",
          archiveFailed: "Nije moguće arhivirati prijavu.",
        },
      },
    },
    deadlines: {
      kicker: "Legantis · Rokovi",
      title: "Rokovi i kalendar",
      subtitle: "Pratite ročišta, podnošenja i datume predmeta.",
      loading: "Učitavanje…",
      upgrade: {
        body:
          "Praćenje rokova dostupno je na Professional i Firm planovima. Nadogradite za popis i kalendar.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati rokove.",
        updateFailed: "Nije moguće ažurirati rok.",
        deleteFailed: "Nije moguće obrisati rok.",
      },
      tabs: {
        list: "Popis",
        calendar: "Kalendar",
      },
      filters: {
        all: "Sve",
        upcoming: "Predstojeće",
        overdue: "Prekoračeno",
        completed: "Završeno",
      },
      list: {
        empty: "Nema rokova za ovaj filter.",
        done: "Gotovo",
        overdueDays: "Prekoračeno {n} dana",
        dueToday: "Rok danas",
        inDays: "za {n} dana",
      },
      types: {
        court_hearing: "Ročište",
        filing_deadline: "Rok za podnošenje",
        appeal_deadline: "Rok za žalbu",
        statute_of_limitations: "Zastara",
        contract_expiry: "Istek ugovora",
        client_meeting: "Sastanak s klijentom",
        payment_due: "Dospijeće plaćanja",
        other: "Ostalo",
      },
      actions: {
        add: "Dodaj rok",
        complete: "Označi kao završeno",
        edit: "Uredi",
        delete: "Obriši",
      },
      dialog: {
        titleNew: "Novi rok",
        titleEdit: "Uredi rok",
        cancel: "Odustani",
        save: "Spremi",
        saving: "Spremam…",
        fields: {
          title: "Naslov",
          type: "Vrsta roka",
          dueDate: "Datum roka",
          dueTime: "Vrijeme (opcionalno)",
          client: "Klijent (opcionalno)",
          description: "Opis (opcionalno)",
          reminder: "Podsjetnik (dana prije)",
        },
        clientSearchPlaceholder: "Pretraži klijente…",
        clientPlaceholder: "Odaberite klijenta",
        noClient: "Bez klijenta",
        errors: {
          titleDate: "Naslov i datum su obavezni.",
          saveFailed: "Nije moguće spremiti rok.",
        },
      },
      calendar: {
        prev: "Prethodni mjesec",
        next: "Sljedeći mjesec",
        closeDay: "Zatvori",
        weekdayShort: {
          sun: "Ned",
          mon: "Pon",
          tue: "Uto",
          wed: "Sri",
          thu: "Čet",
          fri: "Pet",
          sat: "Sub",
        },
      },
    },
    generate: {
      header: {
        kicker: "Legantis · Generiranje dokumenata",
        title: "AI generator pravnih dokumenata",
        subtitle:
          "Generirajte NDA ugovore, ugovore o radu, punomoćja, ugovore o prodaji, zakupu i ugovore o pružanju usluga za klijente širom Balkana.",
        back: "Natrag na nadzornu ploču",
      },
      documentTypes: {
        nda: "Ugovor o povjerljivosti",
        employment: "Ugovor o radu",
        power_of_attorney: "Punomoć",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        service: "Ugovor o pružanju usluga",
      },
      form: {
        documentType: {
          label: "Vrsta dokumenta",
          placeholder: "Odaberite vrstu dokumenta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Odaberite jurisdikciju",
        },
        language: {
          label: "Jezik dokumenta",
          placeholder: "Odaberite jezik",
        },
        details: {
          title: "Detalji dokumenta",
          help:
            "Polja mogu ostati prazna ako nisu primjenjiva. AI će popuniti standardne klauzule za odabranu jurisdikciju i vrstu dokumenta, ali uvijek morate pregledati rezultat prije upotrebe.",
        },
        fields: {
          party1: "Ime strane 1",
          party2: "Ime strane 2",
          date: "Datum",
          confidentialDescription: "Opis povjerljivih informacija",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Generiram dokument...",
          generate: "Generiraj dokument",
          note: "Koristi AI kvotu vašeg plana. Rezultati su samo nacrti i ne predstavljaju pravni savjet.",
        },
      },
      result: {
        title: "Generirani dokument",
        subtitle:
          "Pregledajte, prilagodite i lokalizirajte generirani tekst prije slanja klijentima ili podnošenja tijelima.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saved: "Dokument je spremljen u vaš prostor.",
        templateLoaded: {
          prefix: "Učitani predložak:",
          suffix:
            "Popunite detalje iznad i kliknite „Generiraj dokument” kako biste kreirali nacrt prilagođen jurisdikciji.",
        },
        empty:
          "Generirani dokument će se pojaviti ovdje. Odaberite vrstu dokumenta, jurisdikciju i jezik, unesite ključne detalje i kliknite „Generiraj dokument” kako biste kreirali nacrt prilagođen vašem slučaju.",
      },
      sidebar: {
        title: "Detalji dokumenta",
        empty: "Nijedna stavka nije odabrana.",
        viewActivity: "Pogledaj nedavnu aktivnost",
        loading: "Učitavanje dokumenta…",
        status: "Status:",
        created: "Kreirano",
      },
    },
    contracts: {
      header: {
        kicker: "Legantis · Izrada ugovora",
        title: "AI čarobnjak za izradu ugovora",
        subtitle:
          "Višekoračni alat za izradu ugovora o radu, uslugama, prodaji, najmu, NDA i partnerstvu za zemlje Balkana.",
        back: "Natrag na nadzornu ploču",
      },
      section: {
        stepsTitle: "Koraci izrade ugovora",
        stepsSubtitle:
          "Prođite kroz korake i unesite strane, ključne uvjete i jurisdikciju prije generiranja nacrta.",
      },
      contractTypes: {
        employment: "Ugovor o radu",
        service: "Ugovor o pružanju usluga",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o najmu/zakupu",
        nda: "Ugovor o povjerljivosti",
        partnership: "Ugovor o partnerstvu",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Distrikt Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      steps: {
        step1: {
          title: "Vrsta ugovora",
          lead: "Korak {current} od {total}. Odaberite vrstu ugovora koji želite izraditi.",
          hint: "AI će prilagoditi klauzule odabranoj vrsti ugovora.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Odaberite jurisdikciju koja će uređivati ovaj ugovor.",
        },
        step3: {
          title: "Detalji",
          lead:
            "Korak {current} od {total}. Unesite ključne strane i komercijalne uvjete. AI će dodati standardne i jurisdikcijske klauzule.",
        },
        step4: {
          title: "Pregled i generiranje",
          lead:
            "Korak {current} od {total}. Pregledajte sažetak i dodajte posebne upute prije generiranja ugovora.",
        },
        step5: {
          title: "Preuzmi i spremi",
          lead:
            "Korak {current} od {total}. Preuzmite ugovor ili ga spremite u vaš Legantis radni prostor.",
        },
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Odaberite jurisdikciju",
        },
        additionalInstructions: {
          label: "Dodatne upute (opcionalno)",
          placeholder:
            "Npr. probni rok 3 mjeseca, zabrana konkurencije 12 mjeseci samo za Srbiju, arbitraža u Beogradu itd.",
          help:
            "Upute će biti dodane u AI upit, ali uvijek morate pregledati konačni tekst prije uporabe.",
        },
      },
      fields: {
        employerName: "Naziv poslodavca",
        employeeName: "Ime zaposlenika",
        jobTitle: "Radno mjesto",
        startDate: "Datum početka",
        salary: "Plaća",
        workLocation: "Mjesto rada",
        contractDuration: "Trajanje ugovora",
        clientName: "Ime klijenta",
        serviceProviderName: "Pružatelj usluga",
        serviceDescription: "Opis usluge",
        paymentAmount: "Iznos plaćanja",
        paymentSchedule: "Dinamika plaćanja",
        endDate: "Datum završetka",
        sellerName: "Prodavatelj",
        buyerName: "Kupac",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cijena",
        paymentTerms: "Uvjeti plaćanja",
        deliveryDate: "Datum isporuke",
        landlordName: "Najmodavac",
        tenantName: "Najmoprimac",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna najamnina",
        depositAmount: "Polog",
        leaseStartDate: "Početak najma",
        leaseDuration: "Trajanje najma",
        disclosingParty: "Strana koja otkriva",
        receivingParty: "Strana koja prima",
        purpose: "Svrha",
        confidentialInfoDescription: "Opis povjerljivih informacija",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner2Name: "Partner 2",
        businessPurpose: "Svrha poslovanja",
        profitSplit: "Podjela dobiti %",
      },
      summary: {
        contractType: "Vrsta ugovora",
        jurisdiction: "Jurisdikcija",
        keyDetails: "Ključni detalji",
        completeEarlierSteps:
          "Dovršite prethodne korake kako biste vidjeli strukturirani sažetak unosa.",
      },
      actions: {
        generating: "Generiram ugovor...",
        generate: "Generiraj ugovor",
        note:
          "Koristi AI kvotu vašeg plana. Rezultat je nacrt i ne predstavlja pravni savjet.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saveToContracts: "Spremi u ugovore",
      },
      nav: {
        back: "Natrag",
        next: "Dalje",
        stepOf: "Korak {current} od {total}",
      },
      preview: {
        title: "Pregled ugovora",
        subtitle:
          "Prikaz generiranog ugovora. Ovo je nacrt i mora ga pregledati kvalificirani pravnik prije uporabe.",
        empty:
          "Kada generirate ugovor, tekst će se pojaviti ovdje. Zatim ga možete preuzeti kao PDF/DOCX ili spremiti u ugovore.",
      },
      sidebar: {
        title: "Detalji ugovora",
        empty: "Nijedna stavka nije odabrana.",
        viewActivity: "Pogledaj nedavnu aktivnost",
        loading: "Učitavanje ugovora…",
        status: "Status:",
        created: "Kreirano",
        content: "Sadržaj",
        recordNotFound: "Zapis nije pronađen",
      },
      validation: {
        selectContractType: "Molimo odaberite vrstu ugovora.",
        selectJurisdiction: "Molimo odaberite jurisdikciju.",
        completeDetails: "Molimo ispunite detalje ugovora.",
        requiredField: "Ovo polje je obavezno.",
        completePreviousSteps: "Dovršite prethodne korake prije generiranja.",
      },
      errors: {
        generateFailed: "Neuspješno generiranje ugovora. Pokušajte ponovno.",
        mustBeLoggedInToSave: "Morate biti prijavljeni kako biste spremili ugovore.",
        saveFailed: "Neuspješno spremanje ugovora. Pokušajte ponovno.",
      },
      messages: {
        saved: "Ugovor je spremljen u vaš radni prostor.",
      },
      common: {
        emptyValue: "—",
      },
    },
    predictions: {
      header: {
        kicker: "Legantis · Predviđanje ishoda",
        title: "AI predviđanje ishoda spora",
        subtitle:
          "Analizirajte činjenice, snagu dokaza i vrijednost spora kako biste dobili AI predviđanje i strateške preporuke za predmete širom Balkana.",
        back: "Natrag na nadzornu ploču",
      },
      form: {
        caseType: {
          label: "Vrsta predmeta",
          placeholder: "Odaberite vrstu predmeta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Odaberite jurisdikciju",
        },
        keyFacts: {
          label: "Ključne činjenice",
          placeholder:
            "Opišite ključne činjenice predmeta, relevantne događaje, vremenski slijed i okolnosti...",
          help:
            "Ne unosite povjerljive podatke koji se ne mogu dijeliti. Fokusirajte se na pravno relevantne činjenice, postupak i trenutni status.",
        },
        evidenceQuality: {
          label: "Kvaliteta dokaza",
          placeholder: "Odaberite kvalitetu dokaza",
        },
        amountInDispute: {
          label: "Vrijednost spora",
          placeholder: "npr. €50.000",
          help: "Opcionalno, ali pomaže u procjeni rizika i strategije.",
        },
        additionalContext: {
          label: "Dodatni kontekst",
          placeholder:
            "Dodatni kontekst, procesna povijest ili pitanja koja želite da se obrade...",
        },
        actions: {
          loading: "Predviđam ishod...",
          submit: "Predvidi ishod",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje neovisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Analiza predviđanja",
        subtitle:
          "Vjerojatnost ishoda, ključni faktori, presedani, preporuke i rizici na temelju unesenih informacija.",
        downloadPdf: "Preuzmi PDF",
        saved: "Predviđanje je spremljeno u radni prostor.",
        empty:
          "Vaše predviđanje će se pojaviti ovdje nakon analize. Vidjet ćete vjerojatnost ishoda, razinu pouzdanosti, ključne faktore, relevantne presedane, preporuke i rizike, uz jasno odricanje odgovornosti.",
      },
      sidebar: {
        title: "Detalji predviđanja",
        empty: "Nijedna stavka nije odabrana.",
        viewActivity: "Pogledaj nedavnu aktivnost",
        loading: "Učitavanje predviđanja…",
        recordNotFound: "Zapis nije pronađen",
        fallbackCaseName: "Predviđanje ishoda",
        created: "Kreirano",
        outcomeProbability: "Vjerojatnost ishoda:",
        confidenceLevel: "Razina pouzdanosti:",
        keyFactors: "Ključni faktori",
        recommendations: "Strateške preporuke",
        fullAnalysis: "Cjelovita analiza",
      },
      caseTypes: {
        civil: "Građansko pravo",
        commercial: "Trgovačko pravo",
        labor: "Radno pravo",
        family: "Obiteljsko pravo",
        criminal: "Kazneno pravo",
        administrative: "Upravno pravo",
        misdemeanor: "Prekršajno pravo",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Distrikt Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      evidenceQuality: {
        strong: "Jaki",
        medium: "Srednji",
        weak: "Slabi",
      },
      confidenceLevels: {
        high: "Visok",
        medium: "Srednji",
        low: "Nizak",
      },
      errors: {
        missingRequired:
          "Odaberite vrstu predmeta i jurisdikciju te unesite ključne činjenice predmeta.",
        mustBeLoggedInToSave: "Morate biti prijavljeni kako biste spremili predviđanja.",
        generateFailed: "Neuspješno generiranje predviđanja. Pokušajte ponovno.",
      },
      common: {
        notSpecified: "Nije navedeno",
      },
    },
    analyze: {
      header: {
        kicker: "Legantis · Analiza dokumenata",
        title: "AI analiza i revizija ugovora",
        subtitle:
          "Učitajte ugovore ili pravne dokumente za automatizirani pregled. AI ističe rizične klauzule, nedostajuće odredbe, probleme usklađenosti i daje jasan rizik skor uz preporuke.",
        back: "Natrag na nadzornu ploču",
      },
      uploader: {
        title: "Povucite i ispustite dokument ovdje",
        subtitle: "PDF, DOCX ili TXT do 5MB.",
        chooseFile: "Odaberi datoteku",
        extracting: "Izdvajam tekst...",
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Odaberite jurisdikciju",
        },
        focus: {
          label: "Fokus analize (opcionalno)",
          placeholder: "Odaberite tip analize",
          help:
            "Opći pregled je uravnotežen prikaz. Ostale opcije usmjeravaju AI na specifične vrste problema.",
        },
        extractedPreview: {
          label: "Pregled izdvojenog teksta",
          placeholder:
            "Nakon učitavanja dokumenta, izdvojeni tekst će se pojaviti ovdje. Po potrebi ga možete urediti prije analize.",
          help:
            "Ne lijepite niti učitavajte dokumente s informacijama koje nije dopušteno dijeliti. Uklonite podatke koji identificiraju klijenta gdje je potrebno.",
        },
        actions: {
          loading: "Analiziram dokument...",
          submit: "Analiziraj dokument",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje neovisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Izvještaj analize",
        subtitle:
          "Sažetak, rizik skor, rizične klauzule, nedostajuće odredbe, problemi usklađenosti i preporuke za učitani dokument.",
        downloadPdf: "Preuzmi PDF",
        saved: "Analiza je spremljena u radni prostor.",
        empty:
          "Analiza dokumenta će se pojaviti ovdje nakon što učitate datoteku i pokrenete analizu. Vidjet ćete sažetak, ukupni rizik skor te pregled rizičnih klauzula, nedostajućih odredbi, problema usklađenosti i preporučenih izmjena.",
      },
      sidebar: {
        title: "Detalji analize",
        empty: "Nijedna stavka nije odabrana.",
        viewActivity: "Pogledaj nedavnu aktivnost",
        loading: "Učitavanje analize…",
        recordNotFound: "Zapis nije pronađen",
        riskScore: "Rizik skor:",
        analyzed: "Analizirano",
        executiveSummary: "Sažetak",
        riskyClauses: "Rizične klauzule",
        recommendations: "Preporuke",
      },
      focus: {
        general: "Opći pregled",
        risk: "Procjena rizika",
        compliance: "Provjera usklađenosti",
        missing: "Nedostajuće klauzule",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Distrikt Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      errors: {
        fileTooLarge: "Datoteka je prevelika. Maksimalna veličina je 5MB.",
        unsupportedFileType: "Nepodržan format. Učitajte PDF, DOCX ili TXT datoteku.",
        noReadableText:
          "Nismo mogli izdvojiti čitljiv tekst iz dokumenta. Pokušajte drugu datoteku ili je pretvorite u TXT/DOCX.",
        extractFailed: "Neuspjelo izdvajanje teksta iz odabrane datoteke.",
        uploadAndWait:
          "Učitajte podržan dokument i pričekajte izdvajanje teksta prije pokretanja analize.",
        mustBeLoggedInToSave: "Morate biti prijavljeni kako biste spremili analize.",
        analyzeFailed: "Neuspješna analiza dokumenta. Pokušajte ponovno.",
      },
      common: {
        notSpecified: "Nije navedeno",
        notAvailable: "Nije dostupno",
      },
    },
    time: {
      header: {
        kicker: "Legantis · Praćenje vremena",
        title: "Praćenje vremena i naplata",
        subtitle:
          "Evidentirajte naplative sate po klijentu i predmetu te pratite nenaplaćeno vrijeme i iznose na jednom mjestu.",
        back: "Natrag na nadzornu ploču",
      },
      tabs: {
        entries: "Unosi vremena",
        invoices: "Računi",
      },
      invoices: {
        title: "Računi",
        subtitle:
          "Šaljite račune e-poštom i pratite plaćanja bankovnim prijenosom.",
        refresh: "Osvježi",
        loading: "Učitavanje…",
        loadingList: "Učitavanje računa…",
        empty:
          "Još nema računa. (Stvaranje računa pojavit će se ovdje kada se generira iz unosa vremena.)",
        duePrefix: "Dospijeće",
        clientFallback: "Klijent",
        actions: {
          downloadPdf: "Preuzmi PDF",
          send: "Pošalji klijentu",
          sending: "Slanje…",
          markPaid: "Označi kao plaćeno",
          markOverdue: "Označi kao dospjelo",
        },
        status: {
          draft: "Nacrt",
          sent: "Poslano",
          paid: "Plaćeno",
          overdue: "Dospjelo",
          cancelled: "Otkazano",
        },
        errors: {
          mustBeLoggedIn: "Morate biti prijavljeni.",
          loadFailed: "Učitavanje računa nije uspjelo.",
          actionFailed: "Radnja nije uspjela",
        },
      },
      invoiceGenerate: {
        button: "Generiraj račun",
        dialogTitle: "Generiraj račun",
        dueDate: "Datum dospijeća",
        notes: "Napomene",
        notesPlaceholder: "Neobvezne napomene na računu…",
        paymentReference: "Poziv na broj / referenca",
        bankAccount: "Bankovni račun",
        bankPlaceholder: "Odaberite račun",
        totalLabel: "Ukupno",
        confirm: "Stvori račun",
        cancel: "Odustani",
        generating: "Stvaranje…",
        successToast: "Račun je stvoren.",
        bankingWarningBefore: "Dodajte podatke o banci u",
        bankingSettingsLink: "Postavke → Banka",
        bankingWarningAfter: " prije slanja računa.",
        errors: {
          createFailed: "Stvaranje računa nije uspjelo. Pokušajte ponovno.",
        },
      },
      form: {
        matterName: {
          label: "Klijent / Naziv predmeta",
          placeholder: "npr. ACME d.o.o. – Radni spor",
        },
        description: {
          label: "Opis posla",
          placeholder:
            "npr. Izrada tužbe, pregled dokaza, priprema za ročište...",
        },
        date: {
          label: "Datum",
        },
        hoursWorked: {
          label: "Sati rada",
          placeholder: "npr. 1.5",
          help: "Koristite korake od 0.25 (15 minuta).",
        },
        hourlyRate: {
          label: "Satnica",
          placeholder: "npr. 150",
        },
        activityType: {
          label: "Vrsta aktivnosti",
        },
        currency: {
          label: "Valuta",
        },
        total: "Ukupno:",
        totalHelp:
          "Računa se kao sati × satnica. Iznos se pohranjuje kao numerička vrijednost.",
        actions: {
          loading: "Evidentiram vrijeme...",
          submit: "Evidentiraj vrijeme",
        },
      },
      list: {
        title: "Unosi vremena",
        subtitle:
          "Pregledajte uneseno vrijeme, pratite nenaplaćene sate i pripremite fakture.",
        loading: "Učitavanje unosa vremena...",
        emptyTitle: "Još nema unosa vremena.",
        emptySubtitle: "Dodajte prvi unos koristeći obrazac iznad.",
      },
      stats: {
        unbilledHours: "Ukupno nenaplaćenih sati",
        unbilledAmountEur: "Nenaplaćen iznos (EUR)",
        entriesThisMonth: "Unosi ovog mjeseca",
      },
      activityTypes: {
        drafting: "Izrada",
        reviewing: "Pregled",
        research: "Istraživanje",
        meeting: "Sastanak",
        court: "Sudski nastup",
        admin: "Administrativno",
        other: "Ostalo",
      },
      currencies: {
        eur: "EUR – Euro",
        usd: "USD – Američki dolar",
        bam: "BAM – Konvertibilna marka",
        rsd: "RSD – Srpski dinar",
        hrk: "HRK – Hrvatska kuna",
      },
      status: {
        billed: "Naplaćeno",
        unbilled: "Nenaplaćeno",
      },
      actions: {
        deleteAria: "Obriši unos vremena",
      },
      messages: {
        logged: "Unos vremena je uspješno evidentiran.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni kako biste vidjeli unose vremena.",
        mustBeLoggedInToCreate: "Morate biti prijavljeni kako biste evidentirali vrijeme.",
        matterAndDescriptionRequired: "Naziv predmeta i opis su obavezni.",
        descriptionRequired: "Opis rada je obavezan.",
        clientRequired: "Molimo odaberite klijenta",
        dateRequired: "Datum je obavezan.",
        invalidHoursOrRate:
          "Unesite ispravne sate (0.25–24) i nenegativnu satnicu.",
        createFailed: "Neuspješno evidentiranje vremena. Pokušajte ponovno.",
      },
      common: {
        emptyValue: "—",
      },
    },
  },
  sl: {
    nav: {
      features: "Funkcionalnosti",
      pricing: "Cene",
      login: "Prijava",
      getStarted: "Začni",
      dashboard: "Nadzorna plošča",
      generate: "Generiranje",
      conflict: "Preverjanje konflikta",
      research: "Pravno raziskovanje",
      contracts: "Pogodbe",
      predictions: "Napovedi",
      analyze: "Analiza",
      redline: "Spremembe pogodbe",
      time: "Čas",
      clients: "Stranke",
      matters: "Zadeve",
      intake: "Prijavni obrazec",
      activity: "Aktivnosti",
      billing: "Obračun",
      settings: "Nastavitve",
      templates: "Predlogi",
      deadlines: "Roki",
      actions: "Dejanja",
      aiTools: "AI Orodja",
      management: "Upravljanje",
      logout: "Odjava",
      themeToggle: "Preklopi svetlo in temno temo",
    },
    auth: {
      signingIn: "Prijava poteka...",
      creatingAccount: "Ustvarjanje računa...",
    },
    redline: {
      header: {
        title: "Spremembe pogodbe",
        subtitle:
          "Naložite pogodbo, preglejte AI predloge sprememb in prenesite posodobljen DOCX.",
      },
      upload: {
        label: "Naloži pogodbo",
      },
      instructions: {
        label: "Navodila za redlajniranje (neobvezno)",
        placeholder: 'npr. "Naredi pogodbo bolj ugodno za delodajalca"',
      },
      actions: {
        analyze: "Analiziraj in redlajnaj",
        acceptAll: "Sprejmi vse",
        rejectAll: "Zavrni vse",
        download: "Prenesi redlajnani DOCX",
        saveSession: "Shrani sejo",
        loadSession: "Naloži",
      },
      changes: {
        title: "Spremembe",
        accepted: "sprejeto",
        total: "sprememb",
        addition: "Dodajanje",
        deletion: "Brisanje",
        replacement: "Zamenjava",
        replacements: "Zamenjave",
        position: "poz",
        scrollHint: "Pomikajte za vse spremembe",
      },
      sessions: {
        title: "Pretekle seje",
        empty: "Ni shranjenih sej.",
        changes: "sprememb",
      },
      messages: {
        analyzing: "Analiza poteka...",
        noChanges: "Ni predlaganih sprememb.",
      },
    },
    matters: {
      kicker: "Legantis · Zadeve",
      title: "Zadeve",
      subtitle:
        "Organizirajte delo po zadevah in imejte pogodbe, roke, čas ter obračun na enem mestu.",
      actions: {
        new: "Nova zadeva",
        create: "Ustvari zadevo",
        edit: "Uredi",
        save: "Shrani",
        cancel: "Prekliči",
        open: "Odpri",
        close: "Zapri",
        archive: "Arhiviraj",
      },
      fields: {
        title: "Naslov",
        client: "Stranka",
        matterType: "Vrsta zadeve",
        jurisdiction: "Pristojnost",
        description: "Opis",
        openedAt: "Datum odprtja",
        status: "Status",
      },
      filters: {
        status: "Status",
        type: "Vrsta",
        search: "Iskanje",
        searchPlaceholder: "Išči po naslovu ali stranki…",
        all: "Vse",
      },
      select: {
        placeholder: "Izberi zadevo (neobvezno)",
        none: "Brez zadeve",
        help:
          "Neobvezno. Poveže element z zadevo brez spremembe prikaza obstoječih vnosov.",
      },
      status: {
        open: "Odprta",
        on_hold: "Na čakanju",
        closed: "Zaprta",
        archived: "Arhivirana",
      },
      types: {
        civil: "Civilno",
        criminal: "Kazensko",
        family: "Družinsko",
        labor: "Delovno",
        commercial: "Gospodarsko",
        administrative: "Upravno",
        other: "Drugo",
      },
      stats: {
        contracts: "Pogodbe",
        deadlines: "Roki",
        unbilledHours: "Nezaračunane ure",
      },
      tabs: {
        overview: "Pregled",
        deadlines: "Roki",
        documentsContracts: "Dokumenti in pogodbe",
        timeBilling: "Čas in obračun",
        predictions: "Napovedi",
      },
      detail: {
        kicker: "Legantis · Zadeva",
        backToList: "Nazaj na zadeve",
        notFound: "Zadeva ni bila najdena.",
        loadFailed: "Zadeve ni bilo mogoče naložiti.",
        stats: {
          openDeadlines: "Odprti roki",
          totalBilled: "Skupaj zaračunano",
          outstandingPrefix: "Odprto:",
        },
        recentActivity: {
          title: "Nedavna aktivnost",
          subtitle: "Najnovejše delo povezano s to zadevo.",
          empty: "Za to zadevo še ni aktivnosti.",
        },
        deadlines: {
          subtitle: "Roki povezani s to zadevo.",
          add: "Dodaj rok",
          empty: "Ni povezanih rokov.",
        },
        contracts: {
          title: "Pogodbe",
          subtitle: "Pogodbe povezane s to zadevo.",
          generate: "Generiraj pogodbo",
          empty: "Ni povezanih pogodb.",
        },
        documents: {
          title: "Dokumenti",
          subtitle: "Dokumenti povezani s to zadevo.",
          analyze: "Analiziraj dokument",
          empty: "Ni povezanih dokumentov.",
        },
        time: {
          title: "Vnosi časa",
          subtitle: "Vnosi časa povezani s to zadevo.",
          log: "Zabeleži čas",
          empty: "Ni povezanih vnosov časa.",
        },
        billing: {
          title: "Računi",
          subtitle: "Računi povezani s to zadevo.",
          empty: "Ni povezanih računov.",
        },
        predictions: {
          subtitle: "Napovedi povezane s to zadevo.",
          new: "Nova napoved",
          empty: "Ni povezanih napovedi.",
        },
      },
      empty: {
        title: "Zaenkrat ni zadev",
        subtitle:
          "Ustvarite prvo zadevo, da boste lažje organizirali pogodbe, roke in evidenco časa.",
      },
    },
    language: {
      label: "Jezik",
    },
    rag: {
      title: "Pridobljeni pravni viri",
      articleSingular: "člen",
      articlePlural: "členi",
      matchPercent: "{pct}% ujemanja",
      translating: "Prevajanje odlomkov…",
      paragraphLabel: "odst.",
      invalidCitations:
        "⚠ Naslednji citati v odgovoru umetne inteligence niso bili najdeni v pridobljeni pravni bazi in so lahko netočni:",
      lowConfidence:
        "Nizka zaupanja vrednost: pridobljene določbe so slabo relevantne za to poizvedbo. Ustrezna zakonodaja morda še ni v bazi.",
    },
    research: {
      kicker: "Legantis · Raziskovanje",
      title: "Pravno raziskovanje",
      subtitle:
        "Neposredno preiščite pravno bazo in shranite raziskave za kasneje.",
      search: {
        label: "Vprašanje ali ključne besede",
        placeholder: "npr. rok zastare za naknadu štete",
      },
      filters: {
        jurisdiction: "Jurisdikcija",
        category: "Kategorija",
        language: "Jezik",
        summaryPrefix: "Filtri:",
      },
      language: {
        local: "Lokalno",
        english: "Angleško",
      },
      jurisdictions: {
        all: "Vse jurisdikcije",
        serbia: "Srbija",
        croatia: "Hrvaška",
        bihFederation: "BiH Federacija",
        bihRs: "BiH RS",
        bihBrcko: "BiH Brčko",
        montenegro: "Črna gora",
        slovenia: "Slovenija",
      },
      categories: {
        all: "Vse kategorije",
        civil: "Civilno",
        commercial: "Gospodarsko",
        labor: "Delovno",
        family: "Družinsko",
        criminal: "Kazensko",
        administrative: "Upravno",
        procedural: "Procesno",
        constitutional: "Ustavno",
        inheritance: "Dedno",
        property: "Stvarno",
        confidentiality: "Zaupnost",
        misdemeanor: "Prekrškovno",
      },
      actions: {
        search: "Išči",
        searching: "Iskanje…",
        save: "Shrani raziskavo",
        saving: "Shranjevanje…",
      },
      results: {
        title: "Rezultati",
        hint: "Zaženite iskanje za najbolj relevantne člene zakona.",
        empty:
          "Ni najdenih relevantnih členov. Poskusite druge ključne besede ali širšo kategorijo.",
        countSuffix: "rezultatov",
        confidenceLabel: "Zanesljivost",
        articleLabel: "Člen",
      },
      sessions: {
        title: "Nedavna iskanja",
        refresh: "Osveži",
        refreshing: "Osveževanje…",
        loading: "Nalaganje…",
        empty: "Ni še shranjenih raziskav.",
        upgradeHint:
          "Shranjevanje raziskav je na voljo v paketih Professional in Firm.",
      },
      upgradePrompt: "Nadgradite paket za shranjevanje raziskav.",
      errors: {
        queryRequired: "Vnesite iskalni niz.",
        searchFailed: "Iskanje ni uspelo. Poskusite znova.",
        historyFailed: "Ni mogoče naložiti nedavnih iskanj.",
        saveFailed: "Ni mogoče shraniti raziskave.",
      },
    },
    home: {
      hero: {
        trustBadge:
          "Zaupajo nam odvetniki v Bosni, Srbiji, na Hrvaškem, v Črni gori in Sloveniji",
        title: "Vaš AI pravni asistent. Zgrajen za balkanske odvetnike.",
        subtitle:
          "Pripravite pogodbe v nekaj minutah. Napovejte izid. Upravljajte s strankami. Vse na eni platformi za BiH, Srbijo, Hrvaško, Črno goro in Slovenijo.",
        getStartedFree: "Začnite brezplačno",
        pricingCta: "Poglej cene",
        noCreditCard: "Kreditna kartica ni potrebna · Preklic kadarkoli",
        dashboardPreview: "Predogled nadzorne plošče",
      },
      jurisdictionBar: {
        title: "Zgrajeno za pravne redove:",
        countries: {
          ba: "🇧🇦 Bosna in Hercegovina",
          rs: "🇷🇸 Srbija",
          hr: "🇭🇷 Hrvaška",
          me: "🇲🇪 Črna gora",
          si: "🇸🇮 Slovenija",
        },
      },
      howItWorks: {
        title: "Kako deluje Legantis",
        step1: {
          title: "Registracija v 60 sekundah",
          desc: "Ustvarite račun, izberite jurisdikcijo in jezik. Brez zahtevne nastavitve.",
        },
        step2: {
          title: "Opišite, kar potrebujete",
          desc: "Povejte Legantisu, kaj naj pripravi, analizira ali raziskuje. Kot pogovor.",
        },
        step3: {
          title: "Prejmite pripravljen izhod",
          desc: "Prenesite pogodbe, napovedi in analize, pripravljene za uporabo ali pregled.",
        },
      },
      features: {
        badge: "16+ AI funkcij",
        title: "Vse, kar potrebujete za pametnejše delo",
        titleNew: "Vse, kar potrebuje moderna odvetniška pisarna",
        subtitle:
          "Ena platforma za pisanje, napovedovanje, analizo, beleženje časa in sodelovanje s strankami.",
        seeAll: "Oglejte si vse funkcije →",
        items: {
          contracts: {
            title: "AI priprava pogodb",
            description:
              "Pripravite pogodbe s klavzulami, prilagojenimi jurisdikciji. Prejmite predloge na podlagi lokalne prakse in hitreje dokončajte končno različico.",
          },
          prediction: {
            title: "Napoved sporov",
            description:
              "Ocenite izid zadev na podlagi prakse in lokalnega prava. Primerjajte več strategij z jasnimi kazalniki tveganja in samozavestneje svetujte strankam.",
          },
          analysis: {
            title: "Analiza dokumentov",
            description:
              "Naložite dokumente za preverjanje tveganj in skladnosti. Hitro odkrijte sporne klavzule in prejmite strukturirana priporočila za popravke.",
          },
          time: {
            title: "Spremljanje časa",
            description:
              "Beležite obračunljivi čas in ustvarjajte račune. Delo zajemajte skozi vsakodnevne aktivnosti ter zmanjšajte izgubo obračunljivih ur.",
          },
          portal: {
            title: "Portal za stranke",
            description:
              "Varno deljenje datotek in komunikacija s strankami. Sporočila, dokumenti in statusi ostanejo urejeni v enem zaščitenem prostoru.",
          },
        },
      },
      pricing: {
        noFees: "Preproste cene. Brez skritih pristojbin.",
        title: "Preproste in pregledne cene",
        subtitle:
          "Izberite paket, ki ustreza vaši pisarni. Vsi paketi vključujejo ključne AI funkcionalnosti.",
        recommended: "Najbolj priljubljen",
        trustLine:
          "Varno plačilo prek Paddle · Skladno z GDPR · Preklic kadarkoli",
        comparison: {
          colFeature: "Funkcija",
          colSolo: "Solo",
          colProfessional: "Professional",
          colFirm: "Firm",
          rowAiCalls: "AI klicev na dan",
          rowContractTypes: "Vrste pogodb",
          rowUsers: "Uporabniki",
          rowPriority: "Prednostna podpora",
          all: "Vse",
          usersFirm: "Do 5",
          yes: "✓",
          no: "✗",
        },
        tiers: {
          solo: {
            name: "Solo",
            features: {
              "Document generation": "Generiranje dokumentov",
              "Contract drafting": "Priprava pogodb",
              "Template library": "Knjižnica predlog",
              "20 AI calls/day": "20 AI klicev na dan",
            },
          },
          professional: {
            name: "Professional",
            features: {
              "Everything in Solo": "Vse iz paketa Solo",
              "Case outcome predictions": "Napoved izida sporov",
              "Document analysis": "Analiza dokumentov",
              "Time tracking & billing": "Spremljanje časa in obračun",
              "Client portal": "Portal za stranke",
              "100 AI calls/day": "100 AI klicev na dan",
            },
          },
          firm: {
            name: "Firm",
            features: {
              "Everything in Professional": "Vse iz paketa Professional",
              "Priority support": "Prednostna podpora",
              "300 AI calls/day": "300 AI klicev na dan",
              "Multiple team members": "Več članov ekipe",
            },
          },
        },
        perMonth: "/mesec",
        cta: "Začni",
      },
      testimonials: {
        badge: "Mnenja (zgodnji dostop)",
        title: "Kaj pravijo odvetniki",
        disclaimer:
          "* Mnenja v fazi zgodnjega dostopa — imena so zaradi zasebnosti zadržana",
        items: {
          "1": {
            quote:
              "Legantis mi je prihranil ure pri pripravi pogodb. Klavzule za izbrano jurisdikcijo so točno prave.",
            name: "Odvetnik, Sarajevo",
          },
          "2": {
            quote:
              "Funkcija napovedi izida mi pomaga že od prvega dne postaviti realistična pričakovanja strank.",
            name: "Odvetnik, Zagreb",
          },
          "3": {
            quote:
              "Roke, račune in dokumente upravljam na enem mestu. Končno.",
            name: "Odvetnik, Beograd",
          },
        },
      },
      faq: {
        title: "Pogosta vprašanja",
        subtitle:
          "Vse, kar morate vedeti pred začetkom uporabe platforme Legantis.",
        panelTitle: "Vprašanja pred začetkom?",
        panelDescription:
          "Imate vprašanja o našem AI Pravnem Asistentu? Poiščite odgovore na najpogostejša vprašanja in odkrijte, kako lahko naša platforma poenostavi vaš potek dela, izboljša odločanje in poveča splošno učinkovitost.",
        items: {
          q1: {
            question: "Ali je na voljo brezplačno preizkusno obdobje?",
            answer:
              "Da. Začnete lahko z brezplačnim preizkusom in preizkusite ključne funkcije pred izbiro plačljivega paketa. Za začetek kreditne kartice ne potrebujete. Ko preizkus poteče, lahko izberete paket, ki ustreza vaši praksi, ali prenehate z uporabo storitve.",
          },
          q2: {
            question: "Katere jurisdikcije so trenutno podprte?",
            answer:
              "Legantis je prilagojen za Bosno in Hercegovino, Srbijo, Hrvaško, Črno goro in Slovenijo. Privzete nastavitve in predlogi sledijo lokalni pravni praksi na teh trgih. Podpora se lahko razširi skozi čas—preverite to stran ali nastavitve računa za najnovejši seznam.",
          },
          q3: {
            question: "Ali lahko izvozim ustvarjene dokumente?",
            answer:
              "Da. Ustvarjene dokumente lahko izvozite v praktičnih formatih za interno preverjanje in pošiljanje strankam. Osnutke lahko shranite lokalno za urejanje v Wordu ali delite PDF s strankami. Dosledno poimenovanje in različice v pisarni pomagajo, da so vsi usklajeni.",
          },
          q4: {
            question: "Kako so zaščiteni podatki strank?",
            answer:
              "Uporabljamo varne nadzore dostopa in šifrirane načine hrambe podatkov za zaščito pravne dokumentacije. Infrastrukturni partnerji gostijo podatke v regijah, opisanih v pravilniku o zasebnosti. Vi odločate, katere podatke o zadevah shranjujete in kdo v ekipi ima dostop.",
          },
          q5: {
            question: "Ali lahko kadarkoli spremenim ali prekličem paket?",
            answer:
              "Da. Paket lahko kadarkoli nadgradite, znižate ali prekličete v nastavitvah obračunavanja. Spremembe se običajno uveljavijo od naslednjega obračunskega cikla, razen če ni drugače navedeno. Če prekličete, običajno obdržite dostop do konca že plačanega obdobja.",
          },
          q6: {
            question: "Ali so podatki strank varni?",
            answer:
              "Da. Vsi podatki so shranjeni na strežnikih Supabase v EU, šifrirani v mirovanju. Usklajeni smo z GDPR.",
          },
          q7: {
            question: "Ali lahko kadarkoli prekličem naročnino?",
            answer:
              "Da. Preklic je mogoč kadarkoli v nastavitvah zaračunavanja. Brez pristojbine za preklic.",
          },
        },
      },
    },
    footer: {
      taglineLine1:
        "Legantis – AI pravni asistent za Bosno in Hercegovino,",
      taglineLine2: "Srbijo, Hrvaško, Črno goro, Slovenijo.",
      privacy: "Zasebnost",
      terms: "Pogoji uporabe",
      contact: "Kontakt",
      product: "Izdelek",
      legal: "Pravno",
      rights: "Vse pravice pridržane",
      faqLink: "Pogosta vprašanja",
      privacyPolicy: "Pravilnik o zasebnosti",
      termsOfService: "Pogoji storitve",
      refundPolicy: "Pravilnik o vračilu",
      supportEmail: "support@legantis.app",
    },
    dashboard: {
      featureUsage: {
        title: "Uporaba funkcij (nedavno)",
        labels: {
          case_prediction: "Napoved primera",
          contract_generation: "Gen. pogodbe",
          document_generation: "Gen. dok.",
          document_analysis: "Analiza dok.",
          contract_drafting: "Osnutek pogodbe",
          legal_research: "Raziskovanje",
          conflict_check: "Preverjanje",
          document_redlining: "Spremembe",
        },
      },
      header: {
        kicker: "Nadzorna plošča Legantis",
        welcome: "Dobrodošli nazaj,",
        planSuffix: "paket",
        noPaidPlan: "Brez plačljivega paketa (samo dokumenti)",
        statusNotSubscribed: "brez naročnine",
      },
      planTier: {
        solo: "Solo",
        professional: "Professional",
        firm: "Firm",
      },
      stats: {
        clients: {
          title: "Stranke",
          subtitle: "Aktivne stranke v vašem prostoru",
        },
        contracts: {
          title: "Pogodbe",
          subtitle: "Shranjene in podpisane pogodbe",
        },
        documents: {
          title: "Dokumenti in analize",
          subtitle: "Ustvarjeni dokumenti in analize tveganj",
        },
        predictions: {
          title: "Napovedi sporov",
          subtitle: "Doslej izvedene napovedi izidov",
        },
      },
      overview: {
        upgrade: "Nadgradi",
        lockedHint: "Nadgradite, da odklenete to funkcijo.",
        notAvailable: "Ni na voljo",
        subscribeSolo: "Naročite se na paket Solo →",
        subscribeProfessional: "Naročite se na paket Professional →",
        subscribeFirm: "Naročite se na paket Firm →",
        stats: {
          totalClients: "Skupaj strank",
          activeMatters: "Aktivne zadeve",
          pendingSignatures: "Podpisi v teku",
          unbilledHours: "Nezaračunane ure",
        },
        cards: {
          analysis: {
            title: "Analiza dokumentov",
            description: "Izluščite ključne klavzule in tveganja iz dokumentov.",
          },
          matters: {
            description: "Upravljajte zadevami in povezanim delom.",
          },
          time: {
            title: "Čas in računi",
            description: "Spremljajte ure in poskrbite za natančno obračunavanje.",
          },
          deadlines: {
            title: "Prihajajoči roki",
            subtitle: "Naslednje naloge, ki zahtevajo pozornost.",
            description: "Spremljajte roke in ostanite pred zapadlostmi.",
          },
          activity: {
            subtitle: "Najnovejše spremembe v vašem prostoru.",
          },
          invoices: {
            title: "Statistika računov",
            subtitle: "Neplačano in plačano ta mesec.",
            outstanding: "Neplačano",
            paidThisMonth: "Plačano ta mesec",
          },
        },
      },
      actions: {
        title: "Hitre akcije",
        subtitle: "Hitro dostopajte do ključnih funkcij Legantisa.",
        open: "Odpri",
        generate: {
          title: "Ustvari dokument",
          description:
            "Pripravite NDA in druge pogodbe s pomočjo AI-ja.",
        },
        research: {
          title: "Pravno raziskovanje",
          description:
            "Preiščite zakone po jurisdikcijah z ocenami relevantnosti.",
        },
        contract: {
          title: "Pripravi pogodbo",
          description:
            "Večkorakni čarovnik s klavzulami, prilagojenimi jurisdikciji.",
        },
        predict: {
          title: "Napovej izid spora",
          description:
            "AI analiza verjetnosti uspeha na podlagi prakse in prava.",
        },
        clients: {
          title: "Stranke",
          description:
            "Upravljajte kontakte in pripravite dostop do portala.",
        },
        templates: {
          title: "Knjižnica predlog",
          description:
            "Prebrskajte vnaprej pripravljene predloge in začnite z dobro osnovo.",
        },
      },
      workspace: {
        unnamed: "Vaš prostor Legantis",
        subtitle:
          "Pregled aktivnosti prek pogodb, dokumentov in sodnih zadev.",
        billing: {
          title: "Naročnina in paketi",
          trialPrefix: "Preizkus traja do",
          freeTierLine: "Brez plačljivega paketa — samo ustvarjanje dokumentov",
        },
        jurisdiction: {
          title: "Fokus jurisdikcije",
          subtitle:
            "Uporablja se za prilagajanje predlog, klavzul in napovedi.",
        },
        invoices: {
          title: "Računi",
          countSuffix: "računov",
          subtitle: "Ustvarjeno na podlagi evidentiranega časa in strank.",
        },
      },
      usage: {
        title: "Uporaba AI orodij",
        subtitle:
          "Nedavna aktivnost Legantis pri ustvarjanju, analizi in napovedih.",
        tokens: "Porabljeni žetoni (nedavno)",
        cost: "Ocenjeni strošek",
        detailHint:
          "Podrobna uporaba po funkcijah se prikaže, ko začnete uporabljati ustvarjanje pogodb, napovedi in analizo dokumentov.",
        featuresTitle: "Uporaba funkcij (nedavno)",
        featuresEmpty: "Zaenkrat še ni zabeležene uporabe funkcij.",
      },
      roi: {
        title: "ROI za ta mesec",
        hoursPrefix: "Približno ste prihranili",
        hoursSuffix: "dela v tem mesecu.",
        valuePrefix: "Ta čas je vreden približno",
        valueMiddle: "v primerjavi z",
        ratioPrefix: "Približen ROI:",
        ratioSuffix: "vaše naročnine.",
        freeTierHint:
          "Naročite se na plačljiv paket, da primerjate prihranek s stroškom naročnine.",
      },
      activity: {
        title: "Nedavna aktivnost",
        empty: "Zaenkrat še ni aktivnosti.",
      },
      activeMatters: {
        title: "Aktivne zadeve",
        subtitle: "Odprte zadeve, nedavno posodobljene.",
        openCountLabel: "Odprtih zadev:",
        updatedPrefix: "Posodobljeno:",
        viewAll: "Prikaži vse zadeve",
        empty: "Zaenkrat ni odprtih zadev.",
      },
      upcomingDeadlines: {
        title: "Prihajajoči roki",
        subtitle: "Vaše naslednje obveznosti in datumi.",
        viewAll: "Prikaži vse",
        empty: "Ni prihajajočih rokov.",
      },
    },
    intake: {
      kicker: "Legantis · Sprejem",
      title: "Obrazci za sprejem strank",
      subtitle:
        "Delite povezavo, da nove stranke same vnesejo podatke pred sestankom.",
      loading: "Nalaganje…",
      empty: "Še ni obrazcev. Ustvarite prvega.",
      upgrade: {
        body:
          "Obrazci za sprejem so na voljo pri paketih Professional in Firm. Nadgradite, da ustvarite povezave in pretvorite prijave v stranke.",
        cta: "Poglej pakete",
      },
      errors: {
        mustBeLoggedIn: "Biti morate prijavljeni.",
        loadFailed: "Obrazcev ni mogoče naložiti.",
        toggleFailed: "Obrazca ni mogoče posodobiti.",
        formNotFound: "Obrazec ni najden.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktiven",
        copyLink: "Kopiraj povezavo",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi obrazec",
      },
      actions: {
        create: "Nov obrazec za sprejem",
      },
      editor: {
        back: "Nazaj na obrazce",
        titleNew: "Nov obrazec za sprejem",
        titleEdit: "Uredi obrazec za sprejem",
        subtitle:
          "Vnesite naslov in neobvezna polja. Osnovna vprašanja (ime, e-pošta, vrsta zadeve, jurisdikcija, vrsta potrebne pogodbe, kratek opis) so vedno na javnem obrazcu.",
        formTitle: "Naslov obrazca",
        description: "Opis (neobvezno)",
        optionalTitle: "Dodatna neobvezna polja",
        optionalHint: "Če so vključena, jih stranke vidijo na javnem obrazcu.",
        optional: {
          company: "Ime podjetja",
          address: "Naslov",
          notes: "Opombe",
        },
        save: "Shrani",
        saving: "Shranjujem…",
        errors: {
          titleRequired: "Vnesite naslov obrazca.",
          saveFailed: "Obrazca ni mogoče shraniti.",
        },
      },
      public: {
        notFoundTitle: "Obrazec ni na voljo",
        notFoundBody: "Povezava morda ni aktivna ali je napačna.",
        thankYouTitle: "Hvala",
        thankYouBody:
          "Vaši podatki so poslani. Vaš odvetnik vas bo kmalu kontaktiral.",
        fullName: "Polno ime",
        email: "E-pošta",
        phone: "Telefon (neobvezno)",
        caseType: "Vrsta zadeve",
        jurisdiction: "Jurisdikcija",
        contractTypeNeeded: "Vrsta potrebne pogodbe",
        matterDescription: "Kratek opis zadeve (neobvezno)",
        company: "Ime podjetja",
        address: "Naslov",
        notes: "Opombe",
        selectPlaceholder: "Izberite…",
        submit: "Pošlji",
        submitting: "Pošiljam…",
        caseTypes: {
          civil: "Civilno",
          criminal: "Kazensko",
          family: "Družinsko",
          commercial: "Gospodarsko",
          labor: "Delovno",
          administrative: "Upravno",
          other: "Drugo",
        },
        jurisdictions: {
          bih_fbih: "BiH – Federacija",
          bih_rs: "BiH – Republika Srbska",
          bih_brcko: "BiH – Distrikt Brčko",
          serbia: "Srbija",
          croatia: "Hrvaška",
          montenegro: "Črna gora",
          slovenia: "Slovenija",
        },
        contractTypes: {
          employment: "Pogodba o zaposlitvi",
          service: "Pogodba o storitvah",
          sales: "Kupoprodajna pogodba",
          lease: "Najemna/zakupna pogodba",
          nda: "NDA / Pogodba o zaupnosti",
          partnership: "Partnerska pogodba",
        },
        errors: {
          nameEmail: "Vnesite polno ime in e-pošto.",
          caseAndJurisdiction: "Izberite vrsto zadeve in jurisdikcijo.",
          contractTypeNeeded: "Izberite vrsto potrebne pogodbe.",
          submitFailed: "Pošiljanje ni uspelo. Poskusite znova.",
        },
      },
      submissions: {
        title: "Prijave na obrazec",
        back: "Nazaj na obrazce",
        empty: "Še ni prijav.",
        convert: "Pretvori v stranko",
        archive: "Arhiviraj",
        openClient: "Odpri stranko",
        col: {
          submitted: "Poslano",
          contact: "Stranka",
          caseType: "Vrsta zadeve",
          status: "Status",
          actions: "Dejanja",
        },
        status: {
          pending: "V čakanju",
          converted: "Pretvorjeno",
          archived: "Arhivirano",
        },
        messages: {
          linkedExisting:
            "Ta e-pošta že obstaja kot stranka. Prijava je povezana z obstoječim zapisom.",
          created: "Stranka je uspešno ustvarjena.",
        },
        errors: {
          missingNameEmail: "V prijavi manjka ime ali e-pošta.",
          convertFailed: "Stranke ni mogoče ustvariti.",
          archiveFailed: "Prijave ni mogoče arhivirati.",
        },
      },
    },
    deadlines: {
      kicker: "Legantis · Roki",
      title: "Roki in koledar",
      subtitle: "Spremljajte obravnave, roke za vložitev in datume zadev.",
      loading: "Nalaganje…",
      upgrade: {
        body:
          "Spremljanje rokov je na voljo pri paketih Professional in Firm. Nadgradite za seznam in koledar.",
        cta: "Poglej pakete",
      },
      errors: {
        mustBeLoggedIn: "Biti morate prijavljeni.",
        loadFailed: "Rokov ni mogoče naložiti.",
        updateFailed: "Roka ni mogoče posodobiti.",
        deleteFailed: "Roka ni mogoče izbrisati.",
      },
      tabs: {
        list: "Seznam",
        calendar: "Koledar",
      },
      filters: {
        all: "Vse",
        upcoming: "Prihajajoče",
        overdue: "Zapadlo",
        completed: "Končano",
      },
      list: {
        empty: "Ni rokov za ta filter.",
        done: "Končano",
        overdueDays: "{n} dni zapadlo",
        dueToday: "Rok danes",
        inDays: "čez {n} dni",
      },
      types: {
        court_hearing: "Narok",
        filing_deadline: "Rok za vložitev",
        appeal_deadline: "Rok za pritožbo",
        statute_of_limitations: "Zastaralni rok",
        contract_expiry: "Potek pogodbe",
        client_meeting: "Sestanek s stranko",
        payment_due: "Datum plačila",
        other: "Drugo",
      },
      actions: {
        add: "Dodaj rok",
        complete: "Označi kot končano",
        edit: "Uredi",
        delete: "Izbriši",
      },
      dialog: {
        titleNew: "Nov rok",
        titleEdit: "Uredi rok",
        cancel: "Prekliči",
        save: "Shrani",
        saving: "Shranjujem…",
        fields: {
          title: "Naslov",
          type: "Vrsta roka",
          dueDate: "Datum roka",
          dueTime: "Čas (neobvezno)",
          client: "Stranka (neobvezno)",
          description: "Opis (neobvezno)",
          reminder: "Opomnik (dni prej)",
        },
        clientSearchPlaceholder: "Iskanje strank…",
        clientPlaceholder: "Izberite stranko",
        noClient: "Brez stranke",
        errors: {
          titleDate: "Naslov in datum sta obvezna.",
          saveFailed: "Roka ni mogoče shraniti.",
        },
      },
      calendar: {
        prev: "Prejšnji mesec",
        next: "Naslednji mesec",
        closeDay: "Zapri",
        weekdayShort: {
          sun: "Ned",
          mon: "Pon",
          tue: "Tor",
          wed: "Sre",
          thu: "Čet",
          fri: "Pet",
          sat: "Sob",
        },
      },
    },
    generate: {
      header: {
        kicker: "Legantis · Ustvarjanje dokumentov",
        title: "AI generator pravnih dokumentov",
        subtitle:
          "Ustvarite pogodbe o nerazkritju (NDA), pogodbe o zaposlitvi, pooblastila, prodajne pogodbe, najemne pogodbe in pogodbe o storitvah za stranke po celotnem Balkanu.",
        back: "Nazaj na nadzorno ploščo",
      },
      documentTypes: {
        nda: "Pogodba o nerazkritju",
        employment: "Pogodba o zaposlitvi",
        power_of_attorney: "Pooblastilo",
        sales: "Prodajna pogodba",
        lease: "Najemna pogodba",
        service: "Pogodba o storitvah",
      },
      form: {
        documentType: {
          label: "Vrsta dokumenta",
          placeholder: "Izberite vrsto dokumenta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izberite jurisdikcijo",
        },
        language: {
          label: "Jezik dokumenta",
          placeholder: "Izberite jezik",
        },
        details: {
          title: "Podrobnosti dokumenta",
          help:
            "Polja so lahko prazna, če niso pomembna. AI bo izpolnil standardne klavzule za izbrano jurisdikcijo in vrsto dokumenta, vendar morate rezultat vedno pregledati pred uporabo.",
        },
        fields: {
          party1: "Ime stranke 1",
          party2: "Ime stranke 2",
          date: "Datum",
          confidentialDescription: "Opis zaupnih informacij",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Ustvarjam dokument...",
          generate: "Ustvari dokument",
          note: "Uporablja AI kvoto vašega paketa. Rezultati so le osnutki in ne predstavljajo pravnega nasveta.",
        },
      },
      result: {
        title: "Ustvarjeni dokument",
        subtitle:
          "Preden besedilo pošljete strankam ali organom, ga preglejte, prilagodite in lokalizirajte.",
        downloadPdf: "Prenesi PDF",
        downloadDocx: "Prenesi DOCX",
        saved: "Dokument je shranjen v vaš prostor.",
        templateLoaded: {
          prefix: "Naložen predlog:",
          suffix:
            "Izpolnite podrobnosti zgoraj in kliknite »Ustvari dokument«, da pripravite osnutek, prilagojen jurisdikciji.",
        },
        empty:
          "Ustvarjeni dokument se bo prikazal tukaj. Izberite vrsto dokumenta, jurisdikcijo in jezik, vnesite ključne podrobnosti in kliknite »Ustvari dokument«, da pripravite osnutek, prilagojen vašemu primeru.",
      },
      sidebar: {
        title: "Podrobnosti dokumenta",
        empty: "Nobena postavka ni izbrana.",
        viewActivity: "Poglej nedavno aktivnost",
        loading: "Nalaganje dokumenta…",
        status: "Status:",
        created: "Ustvarjeno",
      },
    },
    contracts: {
      header: {
        kicker: "Legantis · Priprava pogodb",
        title: "AI čarovnik za pripravo pogodb",
        subtitle:
          "Večkorakni gradnik pogodb za zaposlitve, storitve, prodajo, najem, NDA in partnerstva po Balkanu.",
        back: "Nazaj na nadzorno ploščo",
      },
      section: {
        stepsTitle: "Koraki priprave pogodbe",
        stepsSubtitle:
          "Sledite korakom in vnesite stranke, ključne pogoje ter jurisdikcijo, preden ustvarite končni osnutek.",
      },
      contractTypes: {
        employment: "Pogodba o zaposlitvi",
        service: "Pogodba o storitvah",
        sales: "Prodajna pogodba",
        lease: "Najemna/zakupna pogodba",
        nda: "Pogodba o nerazkritju",
        partnership: "Partnerska pogodba",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvaška",
        bih_fbih: "Bosna in Hercegovina - Federacija",
        bih_rs: "Bosna in Hercegovina - Republika Srbska",
        bih_brcko: "Bosna in Hercegovina - Distrikt Brčko",
        montenegro: "Črna gora",
        slovenia: "Slovenija",
      },
      steps: {
        step1: {
          title: "Vrsta pogodbe",
          lead: "Korak {current} od {total}. Izberite vrsto pogodbe, ki jo želite pripraviti.",
          hint: "AI bo klavzule prilagodil izbrani vrsti pogodbe.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Izberite jurisdikcijo, ki ureja to pogodbo.",
        },
        step3: {
          title: "Podrobnosti",
          lead:
            "Korak {current} od {total}. Vnesite ključne stranke in poslovne pogoje. AI bo dodal standardne in jurisdikcijske klavzule.",
        },
        step4: {
          title: "Pregled in ustvarjanje",
          lead:
            "Korak {current} od {total}. Preglejte povzetek in dodajte posebna navodila pred ustvarjanjem pogodbe.",
        },
        step5: {
          title: "Prenos in shranjevanje",
          lead:
            "Korak {current} od {total}. Prenesite pogodbo ali jo shranite v svoj Legantis prostor.",
        },
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izberite jurisdikcijo",
        },
        additionalInstructions: {
          label: "Dodatna navodila (neobvezno)",
          placeholder:
            "Npr. 3-mesečna poskusna doba, konkurenčna klavzula 12 mesecev samo za Srbijo, arbitraža v Beogradu itd.",
          help:
            "Navodila bodo dodana v AI poziv, vendar morate končno besedilo vedno pregledati pred uporabo.",
        },
      },
      fields: {
        employerName: "Ime delodajalca",
        employeeName: "Ime zaposlenega",
        jobTitle: "Delovno mesto",
        startDate: "Datum začetka",
        salary: "Plača",
        workLocation: "Kraj dela",
        contractDuration: "Trajanje pogodbe",
        clientName: "Ime naročnika",
        serviceProviderName: "Izvajalec storitev",
        serviceDescription: "Opis storitev",
        paymentAmount: "Znesek plačila",
        paymentSchedule: "Način plačila",
        endDate: "Datum zaključka",
        sellerName: "Prodajalec",
        buyerName: "Kupec",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cena",
        paymentTerms: "Plačilni pogoji",
        deliveryDate: "Datum dobave",
        landlordName: "Najemodajalec",
        tenantName: "Najemnik",
        propertyAddress: "Naslov nepremičnine",
        monthlyRent: "Mesečna najemnina",
        depositAmount: "Varščina",
        leaseStartDate: "Začetek najema",
        leaseDuration: "Trajanje najema",
        disclosingParty: "Razkrivajoča stranka",
        receivingParty: "Prejemna stranka",
        purpose: "Namen",
        confidentialInfoDescription: "Opis zaupnih informacij",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner2Name: "Partner 2",
        businessPurpose: "Namen poslovanja",
        profitSplit: "Delitev dobička %",
      },
      summary: {
        contractType: "Vrsta pogodbe",
        jurisdiction: "Jurisdikcija",
        keyDetails: "Ključne podrobnosti",
        completeEarlierSteps:
          "Dokončajte prejšnje korake, da se prikaže strukturiran povzetek vnosov.",
      },
      actions: {
        generating: "Ustvarjam pogodbo...",
        generate: "Ustvari pogodbo",
        note:
          "Uporablja AI kvoto vašega paketa. Rezultat je osnutek in ne predstavlja pravnega nasveta.",
        downloadPdf: "Prenesi PDF",
        downloadDocx: "Prenesi DOCX",
        saveToContracts: "Shrani v pogodbe",
      },
      nav: {
        back: "Nazaj",
        next: "Naprej",
        stepOf: "Korak {current} od {total}",
      },
      preview: {
        title: "Predogled pogodbe",
        subtitle:
          "Predogled ustvarjene pogodbe. To je osnutek in ga mora pred uporabo pregledati usposobljen pravnik.",
        empty:
          "Ko ustvarite pogodbo, se bo besedilo prikazalo tukaj. Nato jo lahko prenesete kot PDF/DOCX ali shranite med pogodbe.",
      },
      sidebar: {
        title: "Podrobnosti pogodbe",
        empty: "Nobena postavka ni izbrana.",
        viewActivity: "Poglej nedavno aktivnost",
        loading: "Nalaganje pogodbe…",
        status: "Status:",
        created: "Ustvarjeno",
        content: "Vsebina",
        recordNotFound: "Zapis ni najden",
      },
      validation: {
        selectContractType: "Prosimo, izberite vrsto pogodbe.",
        selectJurisdiction: "Prosimo, izberite jurisdikcijo.",
        completeDetails: "Prosimo, izpolnite podrobnosti pogodbe.",
        requiredField: "To polje je obvezno.",
        completePreviousSteps: "Pred ustvarjanjem dokončajte prejšnje korake.",
      },
      errors: {
        generateFailed: "Ustvarjanje pogodbe ni uspelo. Poskusite znova.",
        mustBeLoggedInToSave: "Za shranjevanje pogodb morate biti prijavljeni.",
        saveFailed: "Shranjevanje pogodbe ni uspelo. Poskusite znova.",
      },
      messages: {
        saved: "Pogodba je shranjena v vaš prostor.",
      },
      common: {
        emptyValue: "—",
      },
    },
    predictions: {
      header: {
        kicker: "Legantis · Napoved izida",
        title: "AI napoved izida spora",
        subtitle:
          "Analizirajte dejstva, moč dokazov in vrednost spora, da dobite AI napoved ter strateška priporočila za primere po Balkanu.",
        back: "Nazaj na nadzorno ploščo",
      },
      form: {
        caseType: {
          label: "Vrsta zadeve",
          placeholder: "Izberite vrsto zadeve",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izberite jurisdikcijo",
        },
        keyFacts: {
          label: "Ključna dejstva zadeve",
          placeholder:
            "Opišite ključna dejstva zadeve, relevantne dogodke, časovnico in okoliščine...",
          help:
            "Ne vključujte zaupnih podatkov, ki jih ni dovoljeno deliti. Osredotočite se na pravno relevantna dejstva, postopek in trenutni status.",
        },
        evidenceQuality: {
          label: "Kakovost dokazov",
          placeholder: "Izberite kakovost dokazov",
        },
        amountInDispute: {
          label: "Vrednost spora",
          placeholder: "npr. €50.000",
          help: "Neobvezno, vendar pomaga pri kontekstu tveganja in strategije.",
        },
        additionalContext: {
          label: "Dodatni kontekst",
          placeholder:
            "Dodatni kontekst, procesna zgodovina ali vprašanja, ki jih želite nasloviti...",
        },
        actions: {
          loading: "Napovedujem izid...",
          submit: "Napovej izid",
          note:
            "Uporablja AI kvoto vašega paketa. To je AI analiza in ne nadomešča neodvisne pravne presoje.",
        },
      },
      result: {
        title: "Analiza napovedi",
        subtitle:
          "Verjetnost izida, ključni dejavniki, precedensi, priporočila in tveganja na podlagi vnesenih informacij.",
        downloadPdf: "Prenesi PDF",
        saved: "Napoved je shranjena v vaš prostor.",
        empty:
          "Vaša napoved zadeve se bo pojavila tukaj po analizi. Videli boste verjetnost izida, raven zaupanja, ključne dejavnike, relevantne precedense, strateška priporočila in tveganja, skupaj z jasnim opozorilom.",
      },
      sidebar: {
        title: "Podrobnosti napovedi",
        empty: "Nobena postavka ni izbrana.",
        viewActivity: "Poglej nedavno aktivnost",
        loading: "Nalaganje napovedi…",
        recordNotFound: "Zapis ni najden",
        fallbackCaseName: "Napoved izida",
        created: "Ustvarjeno",
        outcomeProbability: "Verjetnost izida:",
        confidenceLevel: "Raven zaupanja:",
        keyFactors: "Ključni dejavniki",
        recommendations: "Strateška priporočila",
        fullAnalysis: "Celotna analiza",
      },
      caseTypes: {
        civil: "Civilno pravo",
        commercial: "Gospodarsko pravo",
        labor: "Delovno pravo",
        family: "Družinsko pravo",
        criminal: "Kazensko pravo",
        administrative: "Upravno pravo",
        misdemeanor: "Prekršajno pravo",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvaška",
        bih_fbih: "Bosna in Hercegovina - Federacija",
        bih_rs: "Bosna in Hercegovina - Republika Srbska",
        bih_brcko: "Bosna in Hercegovina - Distrikt Brčko",
        montenegro: "Črna gora",
        slovenia: "Slovenija",
      },
      evidenceQuality: {
        strong: "Močni",
        medium: "Srednji",
        weak: "Šibki",
      },
      confidenceLevels: {
        high: "Visoka",
        medium: "Srednja",
        low: "Nizka",
      },
      errors: {
        missingRequired:
          "Izberite vrsto zadeve in jurisdikcijo ter vnesite ključna dejstva zadeve.",
        mustBeLoggedInToSave: "Za shranjevanje napovedi morate biti prijavljeni.",
        generateFailed: "Ustvarjanje napovedi ni uspelo. Poskusite znova.",
      },
      common: {
        notSpecified: "Ni navedeno",
      },
    },
    analyze: {
      header: {
        kicker: "Legantis · Analiza dokumentov",
        title: "AI analiza in pregled pogodb",
        subtitle:
          "Naložite pogodbe ali pravne dokumente za avtomatski pregled. AI izpostavi tvegane klavzule, manjkajoče določbe, vprašanja skladnosti in poda jasen ocenjevalni rezultat tveganja z izvedljivimi priporočili.",
        back: "Nazaj na nadzorno ploščo",
      },
      uploader: {
        title: "Povlecite in spustite dokument sem",
        subtitle: "PDF, DOCX ali TXT do 5MB.",
        chooseFile: "Izberi datoteko",
        extracting: "Izvlečem besedilo...",
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izberite jurisdikcijo",
        },
        focus: {
          label: "Fokus analize (neobvezno)",
          placeholder: "Izberite tip analize",
          help:
            "Splošni pregled je uravnotežen povzetek. Druge možnosti usmerijo AI na specifične vrste težav.",
        },
        extractedPreview: {
          label: "Predogled izvlečenega besedila",
          placeholder:
            "Ko naložite dokument, se bo izvlečeno besedilo prikazalo tukaj. Po potrebi ga lahko uredite pred analizo.",
          help:
            "Ne lepite ali nalagajte dokumentov z informacijami, ki jih ni dovoljeno deliti. Po potrebi odstranite podatke, ki identificirajo stranko.",
        },
        actions: {
          loading: "Analiziram dokument...",
          submit: "Analiziraj dokument",
          note:
            "Uporablja AI kvoto vašega paketa. To je AI analiza in ne nadomešča neodvisne pravne presoje.",
        },
      },
      result: {
        title: "Poročilo analize",
        subtitle:
          "Povzetek, ocena tveganja, tvegane klavzule, manjkajoče določbe, skladnost in priporočila za naložen dokument.",
        downloadPdf: "Prenesi PDF",
        saved: "Analiza je shranjena v vaš prostor.",
        empty:
          "Analiza dokumenta se bo pojavila tukaj, ko naložite datoteko in zaženete analizo. Videli boste povzetek, skupno oceno tveganja ter razčlenitev tveganih klavzul, manjkajočih določb, vprašanj skladnosti in priporočene spremembe.",
      },
      sidebar: {
        title: "Podrobnosti analize",
        empty: "Nobena postavka ni izbrana.",
        viewActivity: "Poglej nedavno aktivnost",
        loading: "Nalaganje analize…",
        recordNotFound: "Zapis ni najden",
        riskScore: "Ocena tveganja:",
        analyzed: "Analizirano",
        executiveSummary: "Povzetek",
        riskyClauses: "Tvegane klavzule",
        recommendations: "Priporočila",
      },
      focus: {
        general: "Splošni pregled",
        risk: "Ocena tveganja",
        compliance: "Preverjanje skladnosti",
        missing: "Manjkajoče klavzule",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvaška",
        bih_fbih: "Bosna in Hercegovina - Federacija",
        bih_rs: "Bosna in Hercegovina - Republika Srbska",
        bih_brcko: "Bosna in Hercegovina - Distrikt Brčko",
        montenegro: "Črna gora",
        slovenia: "Slovenija",
      },
      errors: {
        fileTooLarge: "Datoteka je prevelika. Največja dovoljena velikost je 5MB.",
        unsupportedFileType: "Nepodprta vrsta datoteke. Naložite PDF, DOCX ali TXT.",
        noReadableText:
          "Iz dokumenta nismo mogli izvleči berljivega besedila. Poskusite drugo datoteko ali jo pretvorite v TXT/DOCX.",
        extractFailed: "Izvleček besedila iz izbrane datoteke ni uspel.",
        uploadAndWait:
          "Naložite podprt dokument in počakajte na izvleček besedila pred zagonom analize.",
        mustBeLoggedInToSave: "Za shranjevanje analiz morate biti prijavljeni.",
        analyzeFailed: "Analiza dokumenta ni uspela. Poskusite znova.",
      },
      common: {
        notSpecified: "Ni navedeno",
        notAvailable: "Ni na voljo",
      },
    },
    time: {
      header: {
        kicker: "Legantis · Spremljanje časa",
        title: "Spremljanje časa in obračun",
        subtitle:
          "Beležite obračunljive ure po stranki in zadevi ter spremljajte neobračunani čas in zneske na enem mestu.",
        back: "Nazaj na nadzorno ploščo",
      },
      tabs: {
        entries: "Časovni vnosi",
        invoices: "Računi",
      },
      invoices: {
        title: "Računi",
        subtitle:
          "Pošiljajte račune po e-pošti in spremljajte plačila z bančnim nakazilom.",
        refresh: "Osveži",
        loading: "Nalaganje…",
        loadingList: "Nalaganje računov…",
        empty:
          "Še ni računov. (Ustvarjanje računov se bo prikazalo tukaj, ko bo generirano iz časovnih vnosov.)",
        duePrefix: "Rok",
        clientFallback: "Stranka",
        actions: {
          downloadPdf: "Prenesi PDF",
          send: "Pošlji stranki",
          sending: "Pošiljam…",
          markPaid: "Označi kot plačano",
          markOverdue: "Označi kot zapadlo",
        },
        status: {
          draft: "Osnutek",
          sent: "Poslano",
          paid: "Plačano",
          overdue: "Zapadlo",
          cancelled: "Preklicano",
        },
        errors: {
          mustBeLoggedIn: "Biti morate prijavljeni.",
          loadFailed: "Nalaganje računov ni uspelo.",
          actionFailed: "Dejanje ni uspelo",
        },
      },
      invoiceGenerate: {
        button: "Ustvari račun",
        dialogTitle: "Ustvari račun",
        dueDate: "Datum zapadlosti",
        notes: "Opombe",
        notesPlaceholder: "Neobvezne opombe na računu…",
        paymentReference: "Sklic / referenca",
        bankAccount: "Bančni račun",
        bankPlaceholder: "Izberite račun",
        totalLabel: "Skupaj",
        confirm: "Ustvari račun",
        cancel: "Prekliči",
        generating: "Ustvarjam…",
        successToast: "Račun je ustvarjen.",
        bankingWarningBefore: "Pred pošiljanjem računov dodajte bančne podatke v",
        bankingSettingsLink: "Nastavitve → Bančni podatki",
        bankingWarningAfter: ".",
        errors: {
          createFailed: "Računa ni bilo mogoče ustvariti. Poskusite znova.",
        },
      },
      form: {
        matterName: {
          label: "Stranka / Naziv zadeve",
          placeholder: "npr. ACME d.o.o. – Delovni spor",
        },
        description: {
          label: "Opis dela",
          placeholder:
            "npr. priprava tožbe, pregled dokazov, priprava na narok...",
        },
        date: {
          label: "Datum",
        },
        hoursWorked: {
          label: "Opravljene ure",
          placeholder: "npr. 1.5",
          help: "Uporabite korake 0.25 (15 minut).",
        },
        hourlyRate: {
          label: "Urna postavka",
          placeholder: "npr. 150",
        },
        activityType: {
          label: "Vrsta aktivnosti",
        },
        currency: {
          label: "Valuta",
        },
        total: "Skupaj:",
        totalHelp:
          "Izračunano kot ure × urna postavka. Znesek je shranjen kot numerična vrednost.",
        actions: {
          loading: "Beležim čas...",
          submit: "Beleži čas",
        },
      },
      list: {
        title: "Časovni vnosi",
        subtitle:
          "Preglejte zabeležen čas, spremljajte neobračunane ure in se pripravite na fakturiranje.",
        loading: "Nalaganje časovnih vnosov...",
        emptyTitle: "Zaenkrat še ni časovnih vnosov.",
        emptySubtitle: "Dodajte prvi vnos z uporabo obrazca zgoraj.",
      },
      stats: {
        unbilledHours: "Skupaj neobračunanih ur",
        unbilledAmountEur: "Neobračunan znesek (EUR)",
        entriesThisMonth: "Vnosi ta mesec",
      },
      activityTypes: {
        drafting: "Priprava",
        reviewing: "Pregled",
        research: "Raziskovanje",
        meeting: "Sestanek",
        court: "Sodni nastop",
        admin: "Administrativno",
        other: "Drugo",
      },
      currencies: {
        eur: "EUR – Evro",
        usd: "USD – Ameriški dolar",
        bam: "BAM – Konvertibilna marka",
        rsd: "RSD – Srbski dinar",
        hrk: "HRK – Hrvaška kuna",
      },
      status: {
        billed: "Obračunano",
        unbilled: "Neobračunano",
      },
      actions: {
        deleteAria: "Izbriši časovni vnos",
      },
      messages: {
        logged: "Časovni vnos je uspešno shranjen.",
      },
      errors: {
        mustBeLoggedInToView: "Za ogled časovnih vnosov morate biti prijavljeni.",
        mustBeLoggedInToCreate: "Za beleženje časa morate biti prijavljeni.",
        matterAndDescriptionRequired: "Naziv zadeve in opis sta obvezna.",
        descriptionRequired: "Opis dela je obvezen.",
        clientRequired: "Prosimo izberite stranko",
        dateRequired: "Datum je obvezen.",
        invalidHoursOrRate: "Vnesite veljavne ure (0.25–24) in nenegativno urno postavko.",
        createFailed: "Beleženje časa ni uspelo. Poskusite znova.",
      },
      common: {
        emptyValue: "—",
      },
    },
    conflict: {
      header: {
        kicker: "Legantis · Preverjanje konflikta",
        title: "Preverjanje konflikta interesov",
        subtitle:
          "Preiščite stranke, pogodbe in zapiske o zadevah za morebitne konflikte pred sprejemom nove stranke.",
      },
      form: {
        query: {
          label: "Ime osebe ali podjetja",
          placeholder: "Vnesite ime…",
          help:
            "Iskanje ni občutljivo na velike/male črke in podpira delna imena (npr. »John« najde »John Doe« in »Johnson Ltd«).",
        },
        actions: {
          check: "Preveri konflikte",
          checking: "Preverjam…",
        },
      },
      errors: {
        queryRequired: "Vnesite ime za iskanje.",
        searchFailed: "Preverjanje konflikta ni uspelo. Poskusite znova.",
        historyFailed: "Nalaganje zgodovine preverjanj ni uspelo.",
      },
      results: {
        matchCountSuffix: "ujemanj",
        clearBadge: "Čisto",
        clearTitle: "Ni najdenih konfliktov",
        clearBody: "Ni ujemanj v vašem delovnem prostoru. Lahko nadaljujete.",
        conflictBadge: "Pregled",
        conflictTitle: "Zaznan možen konflikt",
        conflictBody:
          "Najdena so ujemanja v vašem delovnem prostoru. Pred nadaljevanjem preglejte podrobnosti.",
        groups: {
          clients: "Stranke",
          contracts: "Pogodbe",
          cases: "Zadeve",
        },
      },
      history: {
        title: "Nedavna preverjanja",
        refresh: "Osveži",
        refreshing: "Osvežujem…",
        loading: "Nalaganje zgodovine…",
        empty: "Še ni preverjanj konfliktov.",
        upgradeHint:
          "Zgodovina preverjanj konfliktov je na voljo v paketih Professional in Firm.",
        badges: {
          clear: "Čisto",
          conflict: "Konflikt",
        },
        overrideLine: "Nadaljevanje kljub možnemu konfliktu (override).",
      },
    },
    clients: {
      header: {
        kicker: "Legantis · Stranke",
        title: "Stranke",
        subtitle:
          "Upravljajte seznam strank, shranite ključne kontaktne podatke in se pripravite na varen dostop do portala za stranke.",
        back: "Nazaj na nadzorno ploščo",
      },
      actions: {
        addClient: "Dodaj stranko",
        cancel: "Prekliči",
        deleteAria: "Izbriši stranko",
      },
      conflictPrecheck: {
        title: "Preverjanje konflikta interesov",
        subtitle:
          "Pred dodajanjem nove stranke izvedite hitro preverjanje konflikta v vašem delovnem prostoru.",
        name: {
          label: "Ime/naziv potencialne stranke",
          placeholder: "npr. John Doe / Johnson Ltd",
        },
        actions: {
          check: "Zaženi preverjanje",
          checking: "Preverjam…",
          continue: "Nadaljuj na podatke stranke",
          proceedAnyway: "Nadaljuj kljub konfliktu",
          startOver: "Začni znova",
        },
        clear: {
          title: "Ni najdenih konfliktov — varno nadaljujete",
          body:
            "Ni bilo najdenih ujemajočih se strank, pogodb ali zadev v vašem delovnem prostoru.",
        },
        conflict: {
          title: "Najden je možen konflikt",
          body:
            "Preglejte zadetke spodaj. Nadaljujete lahko šele po potrditvi, da ste konflikt pregledali.",
        },
        override: {
          label:
            "Pregledal/a sem možen konflikt in potrjujem, da je varno nadaljevati.",
        },
      },
      form: {
        fullName: {
          label: "Ime in priimek",
          placeholder: "npr. Ana Kovač",
        },
        email: {
          label: "E-poštni naslov",
          placeholder: "ana.kovac@example.com",
        },
        phone: {
          label: "Telefonska številka",
          placeholder: "+386 40 000 000",
        },
        companyName: {
          label: "Naziv podjetja",
          placeholder: "npr. ACME d.o.o.",
        },
        notes: {
          label: "Opombe",
          placeholder:
            "Ključne informacije o stranki, tipične zadeve, preference...",
        },
        actions: {
          saving: "Shranjujem stranko...",
          save: "Shrani stranko",
        },
        errors: {
          nameAndEmailRequired: "Ime in priimek ter e-pošta sta obvezna.",
          mustBeLoggedInToAdd: "Za dodajanje strank morate biti prijavljeni.",
          createFailed: "Dodajanje stranke ni uspelo. Poskusite znova.",
        },
      },
      list: {
        title: "Seznam strank",
        subtitle: "Vse stranke, ki ste jih dodali v svoj delovni prostor.",
        sortBy: "Razvrsti po",
        sort: {
          name: "Imenu",
          dateAdded: "Datumu dodajanja",
        },
        sortAscending: "Razvrsti naraščajoče",
        sortDescending: "Razvrsti padajoče",
        loading: "Nalaganje strank...",
        emptyTitle: "Zaenkrat še ni strank.",
        emptySubtitle:
          "Dodajte prvo stranko z gumbom „Dodaj stranko” zgoraj.",
        added: "Dodano",
      },
      sidebar: {
        title: "Podrobnosti stranke",
        empty: "Ni izbrane postavke.",
        viewActivity: "Ogled nedavne aktivnosti",
        loading: "Nalaganje stranke…",
        recordNotFound: "Zapisa ni bilo mogoče najti",
        email: "E-pošta:",
        phone: "Telefon:",
        address: "Naslov:",
        defaultRate: "Privzeta urna postavka:",
        status: "Status:",
      },
      messages: {
        added: "Stranka je bila uspešno dodana.",
      },
      errors: {
        mustBeLoggedInToView: "Za ogled strank morate biti prijavljeni.",
        loadFailed: "Nalaganje strank ni uspelo. Poskusite znova.",
      },
      common: {
        notSet: "Ni nastavljeno",
      },
    },
    activity: {
      header: {
        title: "Nedavna aktivnost",
        subtitle:
          "Oglejte si in odprite nedavne dokumente, pogodbe, napovedi, analize in stranke.",
      },
      tabs: {
        feed: "Pregled",
        audit: "Revizijski dnevnik",
      },
      audit: {
        empty: "Zaenkrat še ni vnosov v revizijskem dnevniku.",
      },
      filters: {
        all: "Vse",
        matters: "Zadeve",
        documents: "Dokumenti",
        contracts: "Pogodbe",
        predictions: "Napovedi",
        analyses: "Analize",
        clients: "Stranke",
      },
      types: {
        matter: "Zadeva",
        contract: "Pogodba",
        document: "Dokument",
        analysis: "Analiza dokumenta",
        prediction: "Napoved izida",
        client: "Stranka",
      },
      list: {
        empty: "Za ta filter ni nedavne aktivnosti.",
      },
      actions: {
        loadMore: "Naloži več",
      },
    },
    billing: {
      header: {
        title: "Obračun",
        subtitle: "Upravljajte svoj paket in naročnino.",
      },
      messages: {
        subscriptionUpdated: "Naročnina je bila uspešno posodobljena.",
      },
      currentPlan: {
        title: "Trenutni paket",
        workspace: "Vaš delovni prostor",
        workspaceSuffix: "delovni prostor",
        trialEndsPrefix: "Preizkus se izteče čez",
        dayOne: "dan",
        dayMany: "dni",
        statusPrefix: "Status vaše naročnine je",
        noPaidPlanBadge: "Brez plačljivega paketa",
        freeHint:
          "Uporabljate brezplačno raven (samo ustvarjanje dokumentov). Spodaj izberite paket za vse funkcije.",
      },
      actions: {
        manageSubscription: "Upravljaj naročnino",
        openingPortal: "Odpiram portal...",
        reactivate: "Ponovno aktiviraj",
        currentPlan: "Trenutni paket",
        upgrade: "Nadgradi",
        downgrade: "Znižaj paket",
        startingCheckout: "Začenjam plačilo...",
        subscribe: "Naroči se",
      },
      badges: {
        recommended: "Priporočeno",
      },
      tiers: {
        features: {
          documentGeneration: "Generiranje dokumentov",
          contractDrafting: "Priprava pogodb",
          templateLibrary: "Knjižnica predlog",
          aiCalls20: "20 AI klicev/dan",
          everythingInSolo: "Vse iz Solo paketa",
          caseOutcomePredictions: "Napoved izida sporov",
          documentAnalysis: "Analiza dokumentov",
          timeTrackingBilling: "Sledenje času in obračun",
          clientPortal: "Portal za stranke",
          aiCalls100: "100 AI klicev/dan",
          everythingInProfessional: "Vse iz Professional paketa",
          prioritySupport: "Prednostna podpora",
          aiCalls300: "300 AI klicev/dan",
          multipleTeamMembers: "Več članov ekipe",
        },
      },
      footer: {
        paddleEnvironment: "Paddle okolje:",
        paddleHint:
          "Če se ob kliku ne zgodi nič, preverite ali je nastavljen Paddle client token.",
      },
      errors: {
        missingTransactionId: "Manjka transactionId",
        paddleNotInitialized: "Paddle ni inicializiran",
        paddleCheckoutUnavailable: "Paddle checkout ni na voljo",
        checkoutFailed: "Plačilo ni uspelo",
        portalOpenFailed: "Portala za obračun ni mogoče odpreti.",
      },
      common: {
        unknown: "neznano",
      },
    },
    settings: {
      header: {
        title: "Nastavitve",
        subtitle: "Upravljajte profil, nastavitve, varnost in življenjski cikel računa.",
      },
      tabs: {
        profile: "Profil",
        preferences: "Nastavitve",
        banking: "Bančni podatki",
        security: "Varnost",
        danger: "Nevarno območje",
      },
      banking: {
        title: "Podatki za bančno nakazilo",
        introAccount:
          "Ti podatki bodo na računih prikazani kot navodila za plačilo. Shranjeno za vaš račun.",
        introFirm:
          "Ti podatki bodo na računih prikazani kot navodila za plačilo. Shranjeno na ravni pisarne.",
        bankName: {
          label: "Ime banke",
          placeholder: "npr. NLB",
        },
        accountHolder: {
          label: "Imetnik računa",
          placeholder: "npr. ime vaše pisarne",
        },
        iban: {
          label: "IBAN",
          placeholder: "XX00 0000 0000 0000 0000",
        },
        swift: {
          label: "SWIFT/BIC (neobvezno)",
          placeholder: "npr. LJBASI2X",
        },
        defaultForInvoices: {
          title: "Privzeto za nove račune",
          subtitle:
            "Če je vklopljeno, bo ta račun samodejno izpolnjen pri novih računih.",
        },
        save: "Shrani bančne podatke",
        saving: "Shranjujem...",
        messageSaved: "Bančni podatki so shranjeni.",
        errors: {
          loadFailed: "Nalaganje bančnih podatkov ni uspelo",
          saveFailed: "Shranjevanje bančnih podatkov ni uspelo",
        },
      },
      profile: {
        title: "Profil",
        fullName: {
          label: "Ime in priimek",
          placeholder: "Vaše ime in priimek",
        },
        email: {
          label: "E-pošta",
        },
        lawFirmName: {
          label: "Naziv pisarne",
          placeholder: "Vaša pisarna (neobvezno)",
        },
        preferredJurisdiction: {
          label: "Željena jurisdikcija",
          placeholder: "Izberite jurisdikcijo",
        },
        preferredLanguage: {
          label: "Željeni jezik",
          placeholder: "Izberite jezik",
        },
        actions: {
          save: "Shrani profil",
        },
      },
      preferences: {
        title: "Nastavitve",
        defaultJurisdiction: {
          label: "Privzeta jurisdikcija",
          placeholder: "Izberite privzeto jurisdikcijo",
        },
        currency: {
          label: "Privzeta valuta",
        },
        theme: {
          label: "Tema",
          light: "Svetla",
          dark: "Temna",
        },
        emailNotifications: {
          title: "E-poštna obvestila",
          subtitle: "Prejemajte pomembne posodobitve o obračunu, aktivnosti in spremembah.",
        },
        note:
          "Tema se shrani takoj, ko jo spremenite. Nastavitve valute in obvestil povezujemo z obračunom in opozorili aktivnosti. Nekatere možnosti so trenutno le informativne in morda še ne vplivajo na delovanje.",
        actions: {
          save: "Shrani nastavitve",
        },
      },
      security: {
        title: "Sprememba gesla",
        currentPassword: {
          label: "Trenutno geslo",
        },
        newPassword: {
          label: "Novo geslo",
        },
        confirmPassword: {
          label: "Potrdite novo geslo",
        },
        actions: {
          save: "Shrani geslo",
        },
        messages: {
          passwordUpdated: "Geslo je bilo uspešno posodobljeno.",
        },
        errors: {
          passwordTooShort: "Novo geslo mora imeti vsaj 8 znakov.",
          passwordsDoNotMatch: "Novo geslo in potrditev se ne ujemata.",
          missingEmail: "Manjka e-pošta uporabnika za spremembo gesla.",
          currentPasswordIncorrect: "Trenutno geslo ni pravilno.",
          failedToChangePassword: "Sprememba gesla ni uspela",
        },
      },
      plan: {
        title: "Trenutni paket",
        tierLabel: "Naročniški paket:",
        statusLabel: "Status:",
        tierNone: "Brez paketa (brezplačno — samo dokumenti)",
        statusNone: "Brez naročnine",
        note: "Upravljajte obračun, račune in nadgradnje na strani obračuna.",
        actions: {
          manageBilling: "Upravljaj obračun",
        },
      },
      danger: {
        title: "Nevarno območje",
        export: {
          title: "Izvozi vse moje podatke (GDPR)",
          subtitle:
            "Prenesite JSON izvoz profila, pogodb, dokumentov, napovedi, analiz, strank in časovnih vnosov za svojo evidenco.",
          preparing: "Pripravljam izvoz...",
          action: "Izvozi vse moje podatke (GDPR)",
        },
        delete: {
          title: "Izbriši račun",
          subtitle:
            "To bo označilo vaš profil kot izbrisan in vas odjavilo. Tega dejanja ni mogoče razveljaviti.",
          action: "Izbriši moj račun",
          dialogTitle: "Izbriši račun",
          dialogDescription:
            "Ste prepričani? Tega ni mogoče razveljaviti. Vaš profil bo označen kot izbrisan in odjavljeni boste.",
          confirm: "Izbriši račun",
        },
        errors: {
          failedToExportData: "Izvoz podatkov ni uspel",
          failedToDeleteAccount: "Brisanje računa ni uspelo",
        },
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvaška",
        bih_fbih: "Bosna in Hercegovina – Federacija",
        bih_rs: "Bosna in Hercegovina – Republika Srbska",
        bih_brcko: "Bosna in Hercegovina – Brčko distrikt",
        montenegro: "Črna gora",
        slovenia: "Slovenija",
      },
      languages: {
        Serbian: "Srbščina",
        Croatian: "Hrvaščina",
        Bosnian: "Bosanščina",
        Montenegrin: "Črnogorščina",
        Slovenian: "Slovenščina",
        English: "Angleščina",
      },
      messages: {
        profileUpdated: "Profil je bil uspešno posodobljen.",
        preferencesSaved:
          "Nastavitve so shranjene. Nekatere možnosti še niso trajno shranjene (kmalu).",
      },
      errors: {
        failedToSaveProfile: "Shranjevanje profila ni uspelo",
        failedToSavePreferences: "Shranjevanje nastavitev ni uspelo",
      },
      common: {
        saving: "Shranjujem...",
        cancel: "Prekliči",
        deleting: "Brisanje...",
      },
    },
    templates: {
      header: {
        kicker: "Legantis · Knjižnica predlog",
        title: "Vnaprej pripravljene pravne predloge",
        subtitle:
          "Brskajte po izbranih predlogah po jurisdikciji in takoj začnite z AI podprtim pisanjem.",
      },
      filters: {
        documentType: {
          label: "Vrsta dokumenta",
          all: "Vse vrste dokumentov",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          all: "Vse jurisdikcije",
        },
        search: {
          label: "Iskanje",
          placeholder: "Iščite po nazivu ali ključni besedi...",
        },
      },
      documentTypes: {
        nda: "NDA",
        employment: "Zaposlitev",
        power_of_attorney: "Pooblastilo",
        sales: "Prodaja",
        lease: "Najem",
        service: "Pogodba o storitvah",
        salesAgreement: "Prodajna pogodba",
        leaseAgreement: "Najemna pogodba",
        serviceAgreement: "Pogodba o storitvah",
        legalDocument: "Pravni dokument",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvaška",
        bih_fbih: "Bosna in Hercegovina – Federacija",
        bih_rs: "Bosna in Hercegovina – Republika Srbska",
        bih_brcko: "Bosna in Hercegovina – Brčko distrikt",
        montenegro: "Črna gora",
        slovenia: "Slovenija",
      },
      list: {
        empty:
          "Nobena predloga ne ustreza filtrom. Poskusite spremeniti vrsto dokumenta, jurisdikcijo ali iskalne pojme.",
      },
      preview: {
        title: "Predogled predloge",
        subtitle: "Preglejte osnovno besedilo pred generiranjem prilagojenega osnutka.",
        empty:
          "Izberite predlogo s seznama, da tukaj vidite podrobnosti in predogled vsebine.",
      },
      actions: {
        goToGenerator: "Pojdi na generator",
        preview: "Predogled",
        useTemplate: "Uporabi to predlogo",
      },
      common: {
        notSpecified: "Ni navedeno",
      },
    },
  },
  me: {
    nav: {
      features: "Funkcionalnosti",
      pricing: "Cijene",
      login: "Prijava",
      getStarted: "Započni",
      dashboard: "Kontrolna tabla",
      generate: "Generisanje",
      conflict: "Provjera sukoba",
      research: "Pravno istraživanje",
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      redline: "Izmjena ugovora",
      time: "Vrijeme",
      clients: "Klijenti",
      matters: "Predmeti",
      intake: "Prijavni formular",
      activity: "Aktivnosti",
      billing: "Fakturisanje",
      settings: "Podešavanja",
      templates: "Prijedlozi",
      deadlines: "Rokovi",
      actions: "Radnje",
      aiTools: "AI Alati",
      management: "Upravljanje",
      logout: "Odjava",
      themeToggle: "Prebacivanje svijetle i tamne teme",
    },
    auth: {
      signingIn: "Prijava u toku...",
      creatingAccount: "Kreiranje naloga...",
    },
    redline: {
      header: {
        title: "Izmjena ugovora",
        subtitle:
          "Otpremite ugovor, pregledajte AI prijedloge izmjena i preuzmite ažurirani DOCX.",
      },
      upload: {
        label: "Otpremi ugovor",
      },
      instructions: {
        label: "Uputstva za redlajning (opciono)",
        placeholder: 'npr. "Učini ugovor povoljnijim za poslodavca"',
      },
      actions: {
        analyze: "Analiziraj i redlajnuj",
        acceptAll: "Prihvati sve",
        rejectAll: "Odbij sve",
        download: "Preuzmi redlajnovani DOCX",
        saveSession: "Sačuvaj sesiju",
        loadSession: "Učitaj",
      },
      changes: {
        title: "Izmjene",
        accepted: "prihvaćeno",
        total: "izmjena",
        addition: "Dodavanje",
        deletion: "Brisanje",
        replacement: "Zamjena",
        replacements: "Zamjene",
        position: "poz",
        scrollHint: "Skrolujte da vidite sve izmjene",
      },
      sessions: {
        title: "Prethodne sesije",
        empty: "Nema sačuvanih sesija.",
        changes: "izmjena",
      },
      messages: {
        analyzing: "Analiza u toku...",
        noChanges: "Nema predloženih izmjena.",
      },
    },
    matters: {
      kicker: "Legantis · Predmeti",
      title: "Predmeti",
      subtitle:
        "Organizujte rad po predmetima i držite ugovore, rokove, vrijeme i naplatu na jednom mjestu.",
      actions: {
        new: "Novi predmet",
        create: "Kreiraj predmet",
        edit: "Uredi",
        save: "Sačuvaj",
        cancel: "Otkaži",
        open: "Otvori",
        close: "Zatvori",
        archive: "Arhiviraj",
      },
      fields: {
        title: "Naslov",
        client: "Klijent",
        matterType: "Tip predmeta",
        jurisdiction: "Nadležnost",
        description: "Opis",
        openedAt: "Datum otvaranja",
        status: "Status",
      },
      filters: {
        status: "Status",
        type: "Tip",
        search: "Pretraga",
        searchPlaceholder: "Pretraži po naslovu ili klijentu…",
        all: "Svi",
      },
      select: {
        placeholder: "Izaberi predmet (opciono)",
        none: "Bez predmeta",
        help:
          "Opciono. Povezuje unos sa predmetom bez promjene prikaza postojećih unosa.",
      },
      status: {
        open: "Otvoren",
        on_hold: "Na čekanju",
        closed: "Zatvoren",
        archived: "Arhiviran",
      },
      types: {
        civil: "Građansko",
        criminal: "Krivično",
        family: "Porodično",
        labor: "Radno",
        commercial: "Privredno",
        administrative: "Upravno",
        other: "Ostalo",
      },
      stats: {
        contracts: "Ugovori",
        deadlines: "Rokovi",
        unbilledHours: "Nenaplaćeni sati",
      },
      tabs: {
        overview: "Pregled",
        deadlines: "Rokovi",
        documentsContracts: "Dokumenti i ugovori",
        timeBilling: "Vrijeme i naplata",
        predictions: "Predviđanja",
      },
      detail: {
        kicker: "Legantis · Predmet",
        backToList: "Nazad na predmete",
        notFound: "Predmet nije pronađen.",
        loadFailed: "Neuspješno učitavanje predmeta.",
        stats: {
          openDeadlines: "Otvoreni rokovi",
          totalBilled: "Ukupno naplaćeno",
          outstandingPrefix: "Dugovanje:",
        },
        recentActivity: {
          title: "Nedavne aktivnosti",
          subtitle: "Najnoviji rad vezan za ovaj predmet.",
          empty: "Još nema aktivnosti za ovaj predmet.",
        },
        deadlines: {
          subtitle: "Rokovi povezani sa ovim predmetom.",
          add: "Dodaj rok",
          empty: "Još nema povezanih rokova.",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Ugovori povezani sa ovim predmetom.",
          generate: "Generiši ugovor",
          empty: "Još nema povezanih ugovora.",
        },
        documents: {
          title: "Dokumenti",
          subtitle: "Dokumenti povezani sa ovim predmetom.",
          analyze: "Analiziraj dokument",
          empty: "Još nema povezanih dokumenata.",
        },
        time: {
          title: "Unosi vremena",
          subtitle: "Unosi vremena povezani sa ovim predmetom.",
          log: "Evidentiraj vrijeme",
          empty: "Još nema povezanih unosa vremena.",
        },
        billing: {
          title: "Fakture",
          subtitle: "Fakture povezane sa ovim predmetom.",
          empty: "Još nema povezanih faktura.",
        },
        predictions: {
          subtitle: "Predviđanja povezana sa ovim predmetom.",
          new: "Novo predviđanje",
          empty: "Još nema povezanih predviđanja.",
        },
      },
      empty: {
        title: "Još nema predmeta",
        subtitle:
          "Kreirajte prvi predmet da biste organizovali ugovore, rokove i evidenciju vremena.",
      },
    },
    language: {
      label: "Jezik",
    },
    rag: {
      title: "Preuzeti pravni izvori",
      articleSingular: "članak",
      articlePlural: "članaka",
      matchPercent: "{pct}% podudaranja",
      translating: "Prevod odlomaka…",
      paragraphLabel: "stav",
      invalidCitations:
        "⚠ Sljedeći citati u odgovoru vještačke inteligencije nisu pronađeni u preuzetoj pravnoj bazi i mogu biti netačni:",
      lowConfidence:
        "Nisko povjerenje: preuzete odredbe slabo odgovaraju ovom upitu. Primjenjivi zakon možda još nije u bazi.",
    },
    research: {
      kicker: "Legantis · Istraživanje",
      title: "Pravno istraživanje",
      subtitle:
        "Pretražite pravnu bazu i sačuvajte istraživanja za kasnije.",
      search: {
        label: "Pitanje ili ključne riječi",
        placeholder: "npr. rok zastare za naknadu štete",
      },
      filters: {
        jurisdiction: "Jurisdikcija",
        category: "Kategorija",
        language: "Jezik",
        summaryPrefix: "Filteri:",
      },
      language: {
        local: "Lokalno",
        english: "Engleski",
      },
      jurisdictions: {
        all: "Sve jurisdikcije",
        serbia: "Srbija",
        croatia: "Hrvatska",
        bihFederation: "BiH Federacija",
        bihRs: "BiH RS",
        bihBrcko: "BiH Brčko",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      categories: {
        all: "Sve kategorije",
        civil: "Građansko",
        commercial: "Privredno",
        labor: "Radno",
        family: "Porodično",
        criminal: "Krivično",
        administrative: "Upravno",
        procedural: "Procesno",
        constitutional: "Ustavno",
        inheritance: "Nasljedno",
        property: "Stvarno",
        confidentiality: "Povjerljivost",
        misdemeanor: "Prekršajno",
      },
      actions: {
        search: "Pretraži",
        searching: "Pretraživanje…",
        save: "Sačuvaj istraživanje",
        saving: "Čuvanje…",
      },
      results: {
        title: "Rezultati",
        hint: "Pokrenite pretragu da biste vidjeli najrelevantnije članke zakona.",
        empty:
          "Nema relevantnih članaka. Pokušajte druge ključne riječi ili širu kategoriju.",
        countSuffix: "rezultata",
        confidenceLabel: "Pouzdanost",
        articleLabel: "Član",
      },
      sessions: {
        title: "Nedavne pretrage",
        refresh: "Osvježi",
        refreshing: "Osvježavanje…",
        loading: "Učitavanje…",
        empty: "Još nema sačuvanih istraživanja.",
        upgradeHint:
          "Čuvanje istraživanja je dostupno na Professional i Firm planovima.",
      },
      upgradePrompt: "Nadogradite plan da biste sačuvali istraživanja.",
      errors: {
        queryRequired: "Unesite upit za pretragu.",
        searchFailed: "Pretraga nije uspjela. Pokušajte ponovo.",
        historyFailed: "Nije moguće učitati nedavne pretrage.",
        saveFailed: "Nije moguće sačuvati istraživanje.",
      },
    },
    home: {
      hero: {
        trustBadge:
          "Pouzdani među advokatima u Bosni, Srbiji, Hrvatskoj, Crnoj Gori i Sloveniji",
        title: "Vaš AI pravni asistent. Napravljen za balkanske advokate.",
        subtitle:
          "Pripremite ugovore za nekoliko minuta. Predvidite ishod. Upravljajte klijentima. Sve na jednoj platformi za BiH, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
        getStartedFree: "Započnite besplatno",
        pricingCta: "Pogledaj cijene",
        noCreditCard: "Kreditna kartica nije potrebna · Otkažite u bilo kojem trenutku",
        dashboardPreview: "Pregled kontrolne table",
      },
      jurisdictionBar: {
        title: "Napravljeno za pravne sisteme:",
        countries: {
          ba: "🇧🇦 Bosna i Hercegovina",
          rs: "🇷🇸 Srbija",
          hr: "🇭🇷 Hrvatska",
          me: "🇲🇪 Crna Gora",
          si: "🇸🇮 Slovenija",
        },
      },
      howItWorks: {
        title: "Kako Legantis radi",
        step1: {
          title: "Registracija za 60 sekundi",
          desc: "Kreirajte nalog, odaberite jurisdikciju i jezik. Bez dodatne konfiguracije.",
        },
        step2: {
          title: "Opišite šta vam treba",
          desc: "Recite Legantisu šta treba pripremiti, analizirati ili istražiti. Kao u razgovoru.",
        },
        step3: {
          title: "Dobijte spreman materijal",
          desc: "Preuzmite ugovore, predviđanja i analize spremne za korišćenje ili pregled.",
        },
      },
      features: {
        badge: "16+ AI funkcija",
        title: "Sve što vam treba da radite pametnije",
        titleNew: "Sve što savremenoj advokatskoj kancelariji treba",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i saradnju sa klijentima.",
        seeAll: "Pogledaj sve funkcije →",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description:
              "Pripremite ugovore sa klauzulama prilagođenim jurisdikciji. Dobijte prijedloge zasnovane na lokalnoj praksi i brže završite finalnu verziju.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description:
              "Procijenite ishod predmeta na osnovu prakse i lokalnog prava. Uporedite više strategija uz jasne pokazatelje rizika i sigurnije savjetujte klijente.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description:
              "Otpremite dokumenta za provjeru rizika i usklađenosti. Brzo otkrijte sporne klauzule i dobijte strukturirane preporuke za izmjene.",
          },
          time: {
            title: "Praćenje vremena",
            description:
              "Evidentirajte naplativo vrijeme i kreirajte račune. Bilježite rad kroz svakodnevne aktivnosti i smanjite gubitak naplativih sati.",
          },
          portal: {
            title: "Klijentski portal",
            description:
              "Sigurna razmjena dokumenata i komunikacija sa klijentima. Sve poruke, fajlovi i statusi ostaju pregledni na jednom zaštićenom mjestu.",
          },
        },
      },
      pricing: {
        noFees: "Jednostavne cijene. Bez skrivenih troškova.",
        title: "Jednostavne i transparentne cijene",
        subtitle:
          "Odaberite paket koji odgovara vašoj kancelariji. Svi paketi uključuju ključne AI funkcionalnosti.",
        recommended: "Najpopularniji",
        trustLine:
          "Sigurna uplata preko Paddle-a · U skladu sa GDPR-om · Otkažite u bilo kojem trenutku",
        comparison: {
          colFeature: "Funkcija",
          colSolo: "Solo",
          colProfessional: "Professional",
          colFirm: "Firm",
          rowAiCalls: "AI poziva dnevno",
          rowContractTypes: "Vrste ugovora",
          rowUsers: "Korisnici",
          rowPriority: "Prioritetna podrška",
          all: "Sve",
          usersFirm: "Do 5",
          yes: "✓",
          no: "✗",
        },
        tiers: {
          solo: {
            name: "Solo",
            features: {
              "Document generation": "Generisanje dokumenata",
              "Contract drafting": "Priprema ugovora",
              "Template library": "Biblioteka šablona",
              "20 AI calls/day": "20 AI poziva dnevno",
            },
          },
          professional: {
            name: "Professional",
            features: {
              "Everything in Solo": "Sve iz Solo paketa",
              "Case outcome predictions": "Predviđanje ishoda sporova",
              "Document analysis": "Analiza dokumenata",
              "Time tracking & billing": "Praćenje vremena i fakturisanje",
              "Client portal": "Klijentski portal",
              "100 AI calls/day": "100 AI poziva dnevno",
            },
          },
          firm: {
            name: "Firm",
            features: {
              "Everything in Professional": "Sve iz Professional paketa",
              "Priority support": "Prioritetna podrška",
              "300 AI calls/day": "300 AI poziva dnevno",
              "Multiple team members": "Više članova tima",
            },
          },
        },
        perMonth: "/mesečno",
        cta: "Započni",
      },
      testimonials: {
        badge: "Povratne informacije (rani pristup)",
        title: "Šta advokati kažu",
        disclaimer:
          "* Povratne informacije u ranoj fazi — imena su izostavljena radi privatnosti",
        items: {
          "1": {
            quote:
              "Legantis mi je uštedio sate na pripremi ugovora. Klauzule po jurisdikciji su tačno ono što treba.",
            name: "Advokat, Sarajevo",
          },
          "2": {
            quote:
              "Funkcija predviđanja ishoda pomaže mi da od prvog dana postavim realna očekivanja klijenata.",
            name: "Odvjetnik, Zagreb",
          },
          "3": {
            quote:
              "Rokove, račune i dokumente upravljam na jednom mjestu. Konačno.",
            name: "Advokat, Beograd",
          },
        },
      },
      faq: {
        title: "Često postavljana pitanja",
        subtitle:
          "Sve što treba da znate prije početka rada sa platformom Legantis.",
        panelTitle: "Pitanja o početku korišćenja?",
        panelDescription:
          "Imate pitanja o našem AI Pravnom Asistentu? Pronađite odgovore na najčešća pitanja i otkrijte kako naša platforma može pojednostaviti vaš tok rada, unaprijediti donošenje odluka i poboljšati ukupnu efikasnost.",
        items: {
          q1: {
            question: "Da li postoji besplatan probni period?",
            answer:
              "Da. Možete početi sa besplatnim probnim periodom i isprobati ključne funkcije prije odabira plaćenog paketa. Nije potrebna kreditna kartica za početak. Kada probni period istekne, možete izabrati paket koji vam odgovara ili prestati sa korišćenjem usluge.",
          },
          q2: {
            question: "Koje jurisdikcije su trenutno podržane?",
            answer:
              "Legantis je prilagođen za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju. Podrazumijevane postavke i prijedlozi prate lokalnu pravnu praksu na tim tržištima. Podrška se može proširiti tokom vremena—provjerite ovu stranicu ili postavke računa za najnoviji spisak.",
          },
          q3: {
            question: "Mogu li izvesti generisane dokumente?",
            answer:
              "Da. Generisane dokumente možete izvesti u praktičnim formatima za internu provjeru i slanje klijentima. Možete sačuvati nacrte lokalno radi izmjene u Wordu ili dijeliti PDF sa stranama. Dosljedno imenovanje i verzije u kancelariji pomažu da svi budu usklađeni.",
          },
          q4: {
            question: "Kako su zaštićeni podaci klijenata?",
            answer:
              "Koristimo sigurne kontrole pristupa i enkriptovane načine čuvanja podataka za zaštitu pravne dokumentacije. Infrastrukturni partneri hostuju podatke u regionima opisanim u Pravilima privatnosti. Vi birate koje podatke o predmetima čuvate i ko iz tima može da im pristupi.",
          },
          q5: {
            question: "Mogu li promijeniti ili otkazati paket u bilo kom trenutku?",
            answer:
              "Da. Paket možete nadograditi, smanjiti ili otkazati u svakom trenutku kroz podešavanja naplate. Izmjene se obično primjenjuju od sljedećeg obračunskog ciklusa osim ako nije drugačije navedeno. Ako otkažete, obično zadržavate pristup do kraja već plaćenog perioda.",
          },
          q6: {
            question: "Da li su podaci o klijentima sigurni?",
            answer:
              "Da. Svi podaci se čuvaju na Supabase serverima u EU regiji, enkriptovani u mirovanju. U skladu smo sa GDPR-om.",
          },
          q7: {
            question: "Mogu li otkazati pretplatu u bilo kom trenutku?",
            answer:
              "Da. Možete otkazati u bilo kom trenutku u podešavanjima naplate. Bez troškova otkazivanja.",
          },
        },
      },
    },
    footer: {
      taglineLine1:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu,",
      taglineLine2: "Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uslovi korišćenja",
      contact: "Kontakt",
      product: "Proizvod",
      legal: "Pravno",
      rights: "Sva prava zadržana",
      faqLink: "ČPP",
      privacyPolicy: "Politika privatnosti",
      termsOfService: "Uslovi korišćenja",
      refundPolicy: "Politika refundacije",
      supportEmail: "support@legantis.app",
    },
    dashboard: {
      featureUsage: {
        title: "Korištenje funkcija (nedavno)",
        labels: {
          case_prediction: "Predviđanje predmeta",
          contract_generation: "Gen. ugovora",
          document_generation: "Gen. dokumenata",
          document_analysis: "Analiza dok.",
          contract_drafting: "Nacrt ugovora",
          legal_research: "Pravno istraživanje",
          conflict_check: "Provjera sukoba",
          document_redlining: "Izmjene ugovora",
        },
      },
      header: {
        kicker: "Legantis kontrolna tabla",
        welcome: "Dobrodošli nazad,",
        planSuffix: "paket",
        noPaidPlan: "Bez plaćenog paketa (samo dokumenti)",
        statusNotSubscribed: "niste pretplaćeni",
      },
      planTier: {
        solo: "Solo",
        professional: "Professional",
        firm: "Firm",
      },
      stats: {
        clients: {
          title: "Klijenti",
          subtitle: "Aktivni klijenti u vašem prostoru",
        },
        contracts: {
          title: "Ugovori",
          subtitle: "Sačuvani i potpisani ugovori",
        },
        documents: {
          title: "Dokumenta i analize",
          subtitle: "Generisana dokumenta i analize rizika",
        },
        predictions: {
          title: "Predviđanja sporova",
          subtitle: "Do sada pokrenuta predviđanja ishoda",
        },
      },
      overview: {
        upgrade: "Nadogradi",
        lockedHint: "Nadogradite da otključate ovu funkciju.",
        notAvailable: "Nije dostupno",
        subscribeSolo: "Pretplatite se na Solo plan →",
        subscribeProfessional: "Pretplatite se na Professional plan →",
        subscribeFirm: "Pretplatite se na Firm plan →",
        stats: {
          totalClients: "Ukupno klijenata",
          activeMatters: "Aktivni predmeti",
          pendingSignatures: "Potpisi na čekanju",
          unbilledHours: "Nenaplaćeni sati",
        },
        cards: {
          analysis: {
            title: "Analiza dokumenata",
            description: "Izdvojite ključne klauzule i rizike iz dokumenata.",
          },
          matters: {
            description: "Upravljajte predmetima i povezanim radom.",
          },
          time: {
            title: "Vrijeme i fakture",
            description: "Evidentirajte sate i držite naplatu tačnom.",
          },
          deadlines: {
            title: "Predstojeći rokovi",
            subtitle: "Sljedeće stavke koje zahtijevaju pažnju.",
            description: "Pratite rokove i budite ispred obaveza.",
          },
          activity: {
            subtitle: "Najnovije promjene u vašem prostoru.",
          },
          invoices: {
            title: "Statistika faktura",
            subtitle: "Dugovanja i uplate ovog mjeseca.",
            outstanding: "Dugovanje",
            paidThisMonth: "Plaćeno ovog mjeseca",
          },
        },
      },
      actions: {
        title: "Brze akcije",
        subtitle: "Brzo pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiši dokument",
          description:
            "Kreirajte NDA i druge ugovore uz pomoć AI-ja.",
        },
        research: {
          title: "Pravno istraživanje",
          description:
            "Pretražite propise kroz jurisdikcije uz skorove relevantnosti.",
        },
        contract: {
          title: "Nacrtaj ugovor",
          description:
            "Višekoračni čarobnjak sa klauzulama prilagođenim jurisdikciji.",
        },
        predict: {
          title: "Predvidi ishod spora",
          description:
            "AI analiza vjerovatnoće uspjeha na osnovu prakse i prava.",
        },
        clients: {
          title: "Klijenti",
          description:
            "Upravljajte kontaktima i pristupom klijentskom portalu.",
        },
        templates: {
          title: "Biblioteka šablona",
          description:
            "Pregledajte unaprijed pripremljene šablone i brzo krenite od jake osnove.",
        },
      },
      workspace: {
        unnamed: "Vaš Legantis prostor",
        subtitle:
          "Pregled aktivnosti kroz ugovore, dokumenta i sudske predmete.",
        billing: {
          title: "Pretplata i paketi",
          trialPrefix: "Probni period traje do",
          freeTierLine: "Bez plaćenog paketa — samo generisanje dokumenata",
        },
        jurisdiction: {
          title: "Fokus jurisdikcije",
          subtitle:
            "Koristi se za prilagođavanje šablona, klauzula i predviđanja.",
        },
        invoices: {
          title: "Fakture",
          countSuffix: "faktura",
          subtitle: "Generisano na osnovu vremena i klijenata.",
        },
      },
      usage: {
        title: "Korišćenje AI alata",
        subtitle:
          "Skorašnja Legantis aktivnost kroz generisanje, analizu i predviđanja.",
        tokens: "Potrošeni tokeni (nedavno)",
        cost: "Procijenjeni trošak",
        detailHint:
          "Detaljna upotreba po funkcijama pojaviće se kada počnete koristiti generisanje ugovora, predviđanja i analizu dokumenata.",
        featuresTitle: "Korišćenje funkcija (nedavno)",
        featuresEmpty: "Još nema zabilježenog korišćenja funkcija.",
      },
      roi: {
        title: "ROI za ovaj mjesec",
        hoursPrefix: "Približno ste uštedjeli",
        hoursSuffix: "rada ovog mjeseca.",
        valuePrefix: "To vrijeme vrijedi oko",
        valueMiddle: "u poređenju sa",
        ratioPrefix: "Približan ROI:",
        ratioSuffix: "vaše pretplate.",
        freeTierHint:
          "Pretplatite se na plaćeni plan da biste uporedili uštedu sa cijenom pretplate.",
      },
      activity: {
        title: "Skorašnja aktivnost",
        empty: "Još uvijek nema aktivnosti.",
      },
      activeMatters: {
        title: "Aktivni predmeti",
        subtitle: "Otvoreni predmeti nedavno ažurirani.",
        openCountLabel: "Otvorenih predmeta:",
        updatedPrefix: "Ažurirano:",
        viewAll: "Prikaži sve predmete",
        empty: "Još nema otvorenih predmeta.",
      },
      upcomingDeadlines: {
        title: "Predstojeći rokovi",
        subtitle: "Vaši naredni obaveze i datumi.",
        viewAll: "Prikaži sve",
        empty: "Nema predstojećih rokova.",
      },
    },
    intake: {
      kicker: "Legantis · Prijem",
      title: "Formulari za prijem klijenata",
      subtitle:
        "Podijelite link da novi klijenti sami unesu podatke prije sastanka.",
      loading: "Učitavanje…",
      empty: "Još nema formulara. Kreirajte jedan da počnete.",
      upgrade: {
        body:
          "Formulari za prijem dostupni su na Professional i Firm planovima. Nadogradite da biste generisali linkove i pretvarali prijave u klijente.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati formulare.",
        toggleFailed: "Nije moguće ažurirati formular.",
        formNotFound: "Formular nije pronađen.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktivan",
        copyLink: "Kopiraj link",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi formular",
      },
      actions: {
        create: "Novi formular za prijem",
      },
      editor: {
        back: "Nazad na formulare",
        titleNew: "Novi formular za prijem",
        titleEdit: "Uredi formular za prijem",
        subtitle:
          "Unesite naslov i opcionalna polja. Osnovna pitanja (ime, email, vrsta predmeta, jurisdikcija, vrsta potrebnog ugovora, kratak opis) uvijek su na javnom formularu.",
        formTitle: "Naslov formulara",
        description: "Opis (opciono)",
        optionalTitle: "Dodatna opcionalna polja",
        optionalHint:
          "Kada su uključena, klijenti ih vide na javnom formularu.",
        optional: {
          company: "Naziv kompanije",
          address: "Adresa",
          notes: "Napomene",
        },
        save: "Sačuvaj",
        saving: "Čuvam…",
        errors: {
          titleRequired: "Unesite naslov formulara.",
          saveFailed: "Nije moguće sačuvati formular.",
        },
      },
      public: {
        notFoundTitle: "Formular nije dostupan",
        notFoundBody: "Link možda nije aktivan ili je netačan.",
        thankYouTitle: "Hvala",
        thankYouBody:
          "Vaši podaci su poslati. Vaš advokat će vas uskoro kontaktirati.",
        fullName: "Puno ime",
        email: "Email",
        phone: "Telefon (opciono)",
        caseType: "Vrsta predmeta",
        jurisdiction: "Jurisdikcija",
        contractTypeNeeded: "Vrsta potrebnog ugovora",
        matterDescription: "Kratak opis predmeta (opciono)",
        company: "Naziv kompanije",
        address: "Adresa",
        notes: "Napomene",
        selectPlaceholder: "Izaberite…",
        submit: "Pošalji",
        submitting: "Šaljem…",
        caseTypes: {
          civil: "Građansko",
          criminal: "Krivično",
          family: "Porodično",
          commercial: "Privredno",
          labor: "Radno",
          administrative: "Upravno",
          other: "Ostalo",
        },
        jurisdictions: {
          bih_fbih: "BiH – Federacija",
          bih_rs: "BiH – Republika Srpska",
          bih_brcko: "BiH – Distrikt Brčko",
          serbia: "Srbija",
          croatia: "Hrvatska",
          montenegro: "Crna Gora",
          slovenia: "Slovenija",
        },
        contractTypes: {
          employment: "Ugovor o radu",
          service: "Ugovor o pružanju usluga",
          sales: "Ugovor o kupoprodaji",
          lease: "Ugovor o zakupu/najmu",
          nda: "NDA / Ugovor o tajnosti",
          partnership: "Ugovor o partnerstvu",
        },
        errors: {
          nameEmail: "Unesite puno ime i email.",
          caseAndJurisdiction: "Izaberite vrstu predmeta i jurisdikciju.",
          contractTypeNeeded: "Izaberite vrstu potrebnog ugovora.",
          submitFailed: "Slanje nije uspjelo. Pokušajte ponovo.",
        },
      },
      submissions: {
        title: "Prijave na formular",
        back: "Nazad na formulare",
        empty: "Još nema prijava.",
        convert: "Pretvori u klijenta",
        archive: "Arhiviraj",
        openClient: "Otvori klijenta",
        col: {
          submitted: "Poslato",
          contact: "Klijent",
          caseType: "Vrsta predmeta",
          status: "Status",
          actions: "Akcije",
        },
        status: {
          pending: "Na čekanju",
          converted: "Pretvoreno",
          archived: "Arhivirano",
        },
        messages: {
          linkedExisting:
            "Ovaj email već postoji kao klijent. Prijava je povezana sa postojećim zapisom.",
          created: "Klijent je uspješno kreiran.",
        },
        errors: {
          missingNameEmail: "U prijavi nedostaje ime ili email.",
          convertFailed: "Nije moguće kreirati klijenta.",
          archiveFailed: "Nije moguće arhivirati prijavu.",
        },
      },
    },
    deadlines: {
      kicker: "Legantis · Rokovi",
      title: "Rokovi i kalendar",
      subtitle: "Pratite ročišta, podnošenja i datume predmeta.",
      loading: "Učitavanje…",
      upgrade: {
        body:
          "Praćenje rokova dostupno je na Professional i Firm planovima. Nadogradite za listu i kalendar.",
        cta: "Pogledaj planove",
      },
      errors: {
        mustBeLoggedIn: "Morate biti prijavljeni.",
        loadFailed: "Nije moguće učitati rokove.",
        updateFailed: "Nije moguće ažurirati rok.",
        deleteFailed: "Nije moguće obrisati rok.",
      },
      tabs: {
        list: "Lista",
        calendar: "Kalendar",
      },
      filters: {
        all: "Sve",
        upcoming: "Predstojeće",
        overdue: "Prekoračeno",
        completed: "Završeno",
      },
      list: {
        empty: "Nema rokova za ovaj filter.",
        done: "Gotovo",
        overdueDays: "Prekoračeno {n} dana",
        dueToday: "Rok danas",
        inDays: "za {n} dana",
      },
      types: {
        court_hearing: "Ročište",
        filing_deadline: "Rok za podnošenje",
        appeal_deadline: "Rok za žalbu",
        statute_of_limitations: "Zastarelost",
        contract_expiry: "Istek ugovora",
        client_meeting: "Sastanak sa klijentom",
        payment_due: "Dospijeće plaćanja",
        other: "Ostalo",
      },
      actions: {
        add: "Dodaj rok",
        complete: "Označi kao završeno",
        edit: "Uredi",
        delete: "Obriši",
      },
      dialog: {
        titleNew: "Novi rok",
        titleEdit: "Uredi rok",
        cancel: "Otkaži",
        save: "Sačuvaj",
        saving: "Čuvam…",
        fields: {
          title: "Naslov",
          type: "Vrsta roka",
          dueDate: "Datum roka",
          dueTime: "Vrijeme (opciono)",
          client: "Klijent (opciono)",
          description: "Opis (opciono)",
          reminder: "Podsjetnik (dana prije)",
        },
        clientSearchPlaceholder: "Pretraži klijente…",
        clientPlaceholder: "Izaberite klijenta",
        noClient: "Bez klijenta",
        errors: {
          titleDate: "Naslov i datum su obavezni.",
          saveFailed: "Nije moguće sačuvati rok.",
        },
      },
      calendar: {
        prev: "Prethodni mjesec",
        next: "Sljedeći mjesec",
        closeDay: "Zatvori",
        weekdayShort: {
          sun: "Ned",
          mon: "Pon",
          tue: "Uto",
          wed: "Sre",
          thu: "Čet",
          fri: "Pet",
          sat: "Sub",
        },
      },
    },
    generate: {
      header: {
        kicker: "Legantis · Generisanje dokumenata",
        title: "AI generator pravnih dokumenata",
        subtitle:
          "Generišite NDA ugovore, ugovore o radu, punomoćja, ugovore o prodaji, zakupu i ugovore o pružanju usluga za klijente širom Balkana.",
        back: "Nazad na kontrolnu tablu",
      },
      documentTypes: {
        nda: "Ugovor o povjerljivosti",
        employment: "Ugovor o radu",
        power_of_attorney: "Punomoć",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        service: "Ugovor o pružanju usluga",
      },
      form: {
        documentType: {
          label: "Vrsta dokumenta",
          placeholder: "Izaberite vrstu dokumenta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        language: {
          label: "Jezik dokumenta",
          placeholder: "Izaberite jezik",
        },
        details: {
          title: "Detalji dokumenta",
          help:
            "Polja mogu ostati prazna ako nijesu primjenjiva. AI će popuniti standardne klauzule za izabranu jurisdikciju i vrstu dokumenta, ali uvijek morate pregledati rezultat prije upotrebe.",
        },
        fields: {
          party1: "Ime strane 1",
          party2: "Ime strane 2",
          date: "Datum",
          confidentialDescription: "Opis povjerljivih informacija",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Generišem dokument...",
          generate: "Generiši dokument",
          note: "Koristi AI kvotu vašeg plana. Rezultati su samo nacrti i ne predstavljaju pravni savjet.",
        },
      },
      result: {
        title: "Generisani dokument",
        subtitle:
          "Pregledajte, prilagodite i lokalizujte generisani tekst prije slanja klijentima ili podnošenja organima.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saved: "Dokument je sačuvan u vaš prostor.",
        templateLoaded: {
          prefix: "Učitan šablon:",
          suffix:
            "Popunite detalje iznad i kliknite „Generiši dokument” da kreirate nacrt prilagođen jurisdikciji.",
        },
        empty:
          "Generisani dokument će se pojaviti ovdje. Izaberite vrstu dokumenta, jurisdikciju i jezik, unesite ključne detalje i kliknite „Generiši dokument” da kreirate nacrt prilagođen vašem slučaju.",
      },
      sidebar: {
        title: "Detalji dokumenta",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje dokumenta…",
        status: "Status:",
        created: "Kreirano",
      },
    },
    contracts: {
      header: {
        kicker: "Legantis · Izrada ugovora",
        title: "AI čarobnjak za izradu ugovora",
        subtitle:
          "Višekoračni alat za izradu ugovora o radu, uslugama, prodaji, zakupu, NDA i partnerstvu za zemlje Balkana.",
        back: "Nazad na kontrolnu tablu",
      },
      section: {
        stepsTitle: "Koraci izrade ugovora",
        stepsSubtitle:
          "Prođite kroz korake i unesite strane, ključne uslove i jurisdikciju prije generisanja nacrta.",
      },
      contractTypes: {
        employment: "Ugovor o radu",
        service: "Ugovor o pružanju usluga",
        sales: "Ugovor o prodaji",
        lease: "Ugovor o zakupu",
        nda: "Ugovor o povjerljivosti",
        partnership: "Ugovor o partnerstvu",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      steps: {
        step1: {
          title: "Vrsta ugovora",
          lead: "Korak {current} od {total}. Izaberite vrstu ugovora koji želite da nacrtate.",
          hint: "AI će prilagoditi klauzule izabranoj vrsti ugovora.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Izaberite jurisdikciju koja uređuje ugovor.",
        },
        step3: {
          title: "Detalji",
          lead:
            "Korak {current} od {total}. Unesite ključne strane i komercijalne uslove. AI će dodati standardne i jurisdikcijske klauzule.",
        },
        step4: {
          title: "Pregled i generisanje",
          lead:
            "Korak {current} od {total}. Pregledajte sažetak i dodajte posebne instrukcije prije generisanja ugovora.",
        },
        step5: {
          title: "Preuzmi i sačuvaj",
          lead:
            "Korak {current} od {total}. Preuzmite ugovor ili ga sačuvajte u vaš Legantis radni prostor.",
        },
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        additionalInstructions: {
          label: "Dodatne instrukcije (opciono)",
          placeholder:
            "Npr. Probni rad 3 mjeseca, klauzula zabrane konkurencije 12 mjeseci samo za Srbiju, arbitraža u Beogradu itd.",
          help:
            "Instrukcije će biti dodate u AI upit, ali uvijek morate pregledati konačnu verziju prije upotrebe.",
        },
      },
      fields: {
        employerName: "Naziv poslodavca",
        employeeName: "Ime zaposlenog",
        jobTitle: "Radno mjesto",
        startDate: "Datum početka",
        salary: "Plata",
        workLocation: "Mjesto rada",
        contractDuration: "Trajanje ugovora",
        clientName: "Ime klijenta",
        serviceProviderName: "Pružalac usluga",
        serviceDescription: "Opis usluge",
        paymentAmount: "Iznos plaćanja",
        paymentSchedule: "Dinamika plaćanja",
        endDate: "Datum završetka",
        sellerName: "Prodavac",
        buyerName: "Kupac",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cijena",
        paymentTerms: "Uslovi plaćanja",
        deliveryDate: "Datum isporuke",
        landlordName: "Zakupodavac",
        tenantName: "Zakupac",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna zakupnina",
        depositAmount: "Depozit",
        leaseStartDate: "Početak zakupa",
        leaseDuration: "Trajanje zakupa",
        disclosingParty: "Strana koja otkriva",
        receivingParty: "Strana koja prima",
        purpose: "Svrha",
        confidentialInfoDescription: "Opis povjerljivih informacija",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner2Name: "Partner 2",
        businessPurpose: "Svrha poslovanja",
        profitSplit: "Podjela dobiti %",
      },
      summary: {
        contractType: "Vrsta ugovora",
        jurisdiction: "Jurisdikcija",
        keyDetails: "Ključni detalji",
        completeEarlierSteps:
          "Završite prethodne korake da biste vidjeli strukturisan sažetak unosa.",
      },
      actions: {
        generating: "Generišem ugovor...",
        generate: "Generiši ugovor",
        note:
          "Koristi AI kvotu vašeg plana. Rezultat je nacrt i ne predstavlja pravni savjet.",
        downloadPdf: "Preuzmi PDF",
        downloadDocx: "Preuzmi DOCX",
        saveToContracts: "Sačuvaj u ugovore",
      },
      nav: {
        back: "Nazad",
        next: "Dalje",
        stepOf: "Korak {current} od {total}",
      },
      preview: {
        title: "Pregled ugovora",
        subtitle:
          "Prikaz generisanog ugovora. Ovo je nacrt i mora ga pregledati kvalifikovani pravnik prije upotrebe.",
        empty:
          "Kada generišete ugovor, tekst će se pojaviti ovdje. Zatim ga možete preuzeti kao PDF/DOCX ili sačuvati u ugovore.",
      },
      sidebar: {
        title: "Detalji ugovora",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje ugovora…",
        status: "Status:",
        created: "Kreirano",
        content: "Sadržaj",
        recordNotFound: "Zapis nije pronađen",
      },
      validation: {
        selectContractType: "Molimo izaberite vrstu ugovora.",
        selectJurisdiction: "Molimo izaberite jurisdikciju.",
        completeDetails: "Molimo popunite detalje ugovora.",
        requiredField: "Ovo polje je obavezno.",
        completePreviousSteps: "Završite prethodne korake prije generisanja.",
      },
      errors: {
        generateFailed: "Neuspješno generisanje ugovora. Pokušajte ponovo.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali ugovore.",
        saveFailed: "Neuspješno čuvanje ugovora. Pokušajte ponovo.",
      },
      messages: {
        saved: "Ugovor je sačuvan u vaš radni prostor.",
      },
      common: {
        emptyValue: "—",
      },
    },
    predictions: {
      header: {
        kicker: "Legantis · Predviđanje ishoda",
        title: "AI predviđanje ishoda spora",
        subtitle:
          "Analizirajte činjenice, jačinu dokaza i vrijednost spora da biste dobili AI predviđanje i strateške preporuke za predmete širom Balkana.",
        back: "Nazad na kontrolnu tablu",
      },
      form: {
        caseType: {
          label: "Vrsta predmeta",
          placeholder: "Izaberite vrstu predmeta",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        keyFacts: {
          label: "Ključne činjenice",
          placeholder:
            "Opišite ključne činjenice predmeta, relevantne događaje, vremenski tok i okolnosti...",
          help:
            "Ne unosite povjerljive podatke koji se ne mogu dijeliti. Fokusirajte se na pravno relevantne činjenice, proceduru i trenutni status.",
        },
        evidenceQuality: {
          label: "Kvalitet dokaza",
          placeholder: "Izaberite kvalitet dokaza",
        },
        amountInDispute: {
          label: "Vrijednost spora",
          placeholder: "npr. €50.000",
          help: "Opciono, ali pomaže u procjeni rizika i strategije.",
        },
        additionalContext: {
          label: "Dodatni kontekst",
          placeholder:
            "Dodatni kontekst, proceduralna istorija ili pitanja koja želite da se obrade...",
        },
        actions: {
          loading: "Predviđam ishod...",
          submit: "Predvidi ishod",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Analiza predviđanja",
        subtitle:
          "Vjerovatnoća ishoda, ključni faktori, presedani, preporuke i rizici na osnovu unesenih informacija.",
        downloadPdf: "Preuzmi PDF",
        saved: "Predviđanje je sačuvano u radni prostor.",
        empty:
          "Vaše predviđanje će se pojaviti ovdje nakon analize. Vidjećete vjerovatnoću ishoda, nivo pouzdanosti, ključne faktore, relevantne presedane, preporuke i rizike, uz jasno odricanje odgovornosti.",
      },
      sidebar: {
        title: "Detalji predviđanja",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje predviđanja…",
        recordNotFound: "Zapis nije pronađen",
        fallbackCaseName: "Predviđanje ishoda",
        created: "Kreirano",
        outcomeProbability: "Vjerovatnoća ishoda:",
        confidenceLevel: "Nivo pouzdanosti:",
        keyFactors: "Ključni faktori",
        recommendations: "Strateške preporuke",
        fullAnalysis: "Kompletna analiza",
      },
      caseTypes: {
        civil: "Građansko pravo",
        commercial: "Privredno pravo",
        labor: "Radno pravo",
        family: "Porodično pravo",
        criminal: "Krivično pravo",
        administrative: "Upravno pravo",
        misdemeanor: "Prekršajno pravo",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      evidenceQuality: {
        strong: "Jaki",
        medium: "Srednji",
        weak: "Slabi",
      },
      confidenceLevels: {
        high: "Visok",
        medium: "Srednji",
        low: "Nizak",
      },
      errors: {
        missingRequired:
          "Izaberite vrstu predmeta i jurisdikciju, i unesite ključne činjenice predmeta.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali predviđanja.",
        generateFailed: "Neuspješno generisanje predviđanja. Pokušajte ponovo.",
      },
      common: {
        notSpecified: "Nije navedeno",
      },
    },
    analyze: {
      header: {
        kicker: "Legantis · Analiza dokumenata",
        title: "AI analiza i revizija ugovora",
        subtitle:
          "Otpremite ugovore ili pravna dokumenta za automatsku provjeru. AI ističe rizične klauzule, nedostajuće odredbe, pitanja usklađenosti i daje jasan rizik skor uz preporuke.",
        back: "Nazad na kontrolnu tablu",
      },
      uploader: {
        title: "Prevucite i pustite dokument ovdje",
        subtitle: "PDF, DOCX ili TXT do 5MB.",
        chooseFile: "Izaberite fajl",
        extracting: "Izdvajam tekst...",
      },
      form: {
        jurisdiction: {
          label: "Jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        focus: {
          label: "Fokus analize (opciono)",
          placeholder: "Izaberite tip analize",
          help:
            "Opšti pregled je uravnotežen prikaz. Ostale opcije usmjeravaju AI na specifične vrste problema.",
        },
        extractedPreview: {
          label: "Pregled izdvojenog teksta",
          placeholder:
            "Nakon otpremanja dokumenta, izdvojeni tekst će se pojaviti ovdje. Po potrebi ga možete urediti prije analize.",
          help:
            "Ne lijepite niti otpremajte dokumenta sa informacijama koje nije dozvoljeno dijeliti. Uklonite podatke koji identifikuju klijenta gdje je potrebno.",
        },
        actions: {
          loading: "Analiziram dokument...",
          submit: "Analiziraj dokument",
          note:
            "Koristi AI kvotu vašeg plana. Ovo je AI analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
        },
      },
      result: {
        title: "Izvještaj analize",
        subtitle:
          "Sažetak, rizik skor, rizične klauzule, nedostajuće odredbe, pitanja usklađenosti i preporuke za otpremljeni dokument.",
        downloadPdf: "Preuzmi PDF",
        saved: "Analiza je sačuvana u radni prostor.",
        empty:
          "Analiza dokumenta će se pojaviti ovdje nakon što otpremite fajl i pokrenete analizu. Vidjećete sažetak, ukupni rizik skor i pregled rizičnih klauzula, nedostajućih odredbi, pitanja usklađenosti i preporučenih izmjena.",
      },
      sidebar: {
        title: "Detalji analize",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje analize…",
        recordNotFound: "Zapis nije pronađen",
        riskScore: "Rizik skor:",
        analyzed: "Analizirano",
        executiveSummary: "Sažetak",
        riskyClauses: "Rizične klauzule",
        recommendations: "Preporuke",
      },
      focus: {
        general: "Opšti pregled",
        risk: "Procjena rizika",
        compliance: "Provjera usklađenosti",
        missing: "Nedostajuće klauzule",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina - Federacija",
        bih_rs: "Bosna i Hercegovina - Republika Srpska",
        bih_brcko: "Bosna i Hercegovina - Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      errors: {
        fileTooLarge: "Fajl je prevelik. Maksimalna veličina je 5MB.",
        unsupportedFileType: "Nepodržan format. Otpremite PDF, DOCX ili TXT fajl.",
        noReadableText:
          "Nismo mogli izdvojiti čitljiv tekst iz dokumenta. Pokušajte drugi fajl ili ga konvertujte u TXT/DOCX.",
        extractFailed: "Neuspješno izdvajanje teksta iz izabranog fajla.",
        uploadAndWait:
          "Otpremite podržan dokument i sačekajte izdvajanje teksta prije pokretanja analize.",
        mustBeLoggedInToSave: "Morate biti prijavljeni da biste sačuvali analize.",
        analyzeFailed: "Neuspješna analiza dokumenta. Pokušajte ponovo.",
      },
      common: {
        notSpecified: "Nije navedeno",
        notAvailable: "Nije dostupno",
      },
    },
    time: {
      header: {
        kicker: "Legantis · Praćenje vremena",
        title: "Praćenje vremena i fakturisanje",
        subtitle:
          "Evidentirajte naplative sate po klijentu i predmetu, i pratite nenaplaćeno vrijeme i iznose na jednom mjestu.",
        back: "Nazad na kontrolnu tablu",
      },
      tabs: {
        entries: "Unosi vremena",
        invoices: "Računi",
      },
      invoices: {
        title: "Računi",
        subtitle:
          "Šaljite račune e-poštom i pratite plaćanja bankovnim transferom.",
        refresh: "Osvježi",
        loading: "Učitavanje…",
        loadingList: "Učitavanje računa…",
        empty:
          "Još nema računa. (Kreiranje računa pojaviće se ovdje kada se generišu iz unosa vremena.)",
        duePrefix: "Rok",
        clientFallback: "Klijent",
        actions: {
          downloadPdf: "Preuzmi PDF",
          send: "Pošalji klijentu",
          sending: "Slanje…",
          markPaid: "Označi kao plaćeno",
          markOverdue: "Označi kao dospjelo",
        },
        status: {
          draft: "Nacrt",
          sent: "Poslano",
          paid: "Plaćeno",
          overdue: "Dospjelo",
          cancelled: "Otkazano",
        },
        errors: {
          mustBeLoggedIn: "Morate biti prijavljeni.",
          loadFailed: "Učitavanje računa nije uspjelo.",
          actionFailed: "Akcija nije uspjela",
        },
      },
      invoiceGenerate: {
        button: "Generiši račun",
        dialogTitle: "Generiši račun",
        dueDate: "Datum dospijeća",
        notes: "Napomene",
        notesPlaceholder: "Opcionalne napomene na računu…",
        paymentReference: "Poziv na broj / referenca",
        bankAccount: "Bankovni račun",
        bankPlaceholder: "Izaberite račun",
        totalLabel: "Ukupno",
        confirm: "Kreiraj račun",
        cancel: "Otkaži",
        generating: "Kreiranje…",
        successToast: "Račun je kreiran.",
        bankingWarningBefore: "Dodajte podatke o banci u",
        bankingSettingsLink: "Podešavanja → Banka",
        bankingWarningAfter: " prije slanja računa.",
        errors: {
          createFailed: "Kreiranje računa nije uspjelo. Pokušajte ponovo.",
        },
      },
      form: {
        matterName: {
          label: "Klijent / Naziv predmeta",
          placeholder: "npr. ACME d.o.o. – Radni spor",
        },
        description: {
          label: "Opis posla",
          placeholder:
            "npr. Izrada tužbe, pregled dokaza, priprema za ročište...",
        },
        date: {
          label: "Datum",
        },
        hoursWorked: {
          label: "Sati rada",
          placeholder: "npr. 1.5",
          help: "Koristite korake od 0.25 (15 minuta).",
        },
        hourlyRate: {
          label: "Satnica",
          placeholder: "npr. 150",
        },
        activityType: {
          label: "Vrsta aktivnosti",
        },
        currency: {
          label: "Valuta",
        },
        total: "Ukupno:",
        totalHelp:
          "Računa se kao sati × satnica. Iznos se čuva kao numerička vrijednost.",
        actions: {
          loading: "Evidentiram vrijeme...",
          submit: "Evidentiraj vrijeme",
        },
      },
      list: {
        title: "Unosi vremena",
        subtitle:
          "Pregledajte uneseno vrijeme, pratite nenaplaćene sate i pripremite fakture.",
        loading: "Učitavanje unosa vremena...",
        emptyTitle: "Još nema unosa vremena.",
        emptySubtitle: "Dodajte prvi unos koristeći formular iznad.",
      },
      stats: {
        unbilledHours: "Ukupno nenaplaćenih sati",
        unbilledAmountEur: "Nenaplaćen iznos (EUR)",
        entriesThisMonth: "Unosi ovog mjeseca",
      },
      activityTypes: {
        drafting: "Izrada",
        reviewing: "Pregled",
        research: "Istraživanje",
        meeting: "Sastanak",
        court: "Sudski nastup",
        admin: "Administrativno",
        other: "Ostalo",
      },
      currencies: {
        eur: "EUR – Euro",
        usd: "USD – Američki dolar",
        bam: "BAM – Konvertibilna marka",
        rsd: "RSD – Srpski dinar",
        hrk: "HRK – Hrvatska kuna",
      },
      status: {
        billed: "Naplaćeno",
        unbilled: "Nenaplaćeno",
      },
      actions: {
        deleteAria: "Obriši unos vremena",
      },
      messages: {
        logged: "Unos vremena je uspješno evidentiran.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli unose vremena.",
        mustBeLoggedInToCreate: "Morate biti prijavljeni da biste evidentirali vrijeme.",
        matterAndDescriptionRequired: "Naziv predmeta i opis su obavezni.",
        descriptionRequired: "Opis rada je obavezan.",
        clientRequired: "Molimo odaberite klijenta",
        dateRequired: "Datum je obavezan.",
        invalidHoursOrRate:
          "Unesite ispravne sate (0.25–24) i nenegativnu satnicu.",
        createFailed: "Neuspješno evidentiranje vremena. Pokušajte ponovo.",
      },
      common: {
        emptyValue: "—",
      },
    },
    conflict: {
      header: {
        kicker: "Legantis · Provjera sukoba",
        title: "Provjera sukoba interesa",
        subtitle:
          "Pretražite klijente, ugovore i bilješke o predmetima kako biste otkrili potencijalne sukobe prije prihvatanja novog klijenta.",
      },
      form: {
        query: {
          label: "Ime osobe ili naziv firme",
          placeholder: "Unesite ime…",
          help:
            "Pretraga nije osjetljiva na velika/mala slova i podržava djelimična imena (npr. „John” nalazi „John Doe” i „Johnson Ltd”).",
        },
        actions: {
          check: "Provjeri sukobe",
          checking: "Provjeravam…",
        },
      },
      errors: {
        queryRequired: "Unesite ime za pretragu.",
        searchFailed: "Provjera sukoba nije uspjela. Pokušajte ponovo.",
        historyFailed: "Neuspjelo učitavanje istorije provjera.",
      },
      results: {
        matchCountSuffix: "poklapanja",
        clearBadge: "Čisto",
        clearTitle: "Nema pronađenih sukoba",
        clearBody: "Nema poklapanja u vašem radnom prostoru. Možete nastaviti.",
        conflictBadge: "Provjeriti",
        conflictTitle: "Otkriven potencijalni sukob",
        conflictBody:
          "Pronađena su poklapanja u vašem radnom prostoru. Pregledajte detalje prije nastavka.",
        groups: {
          clients: "Klijenti",
          contracts: "Ugovori",
          cases: "Predmeti",
        },
      },
      history: {
        title: "Skorašnje provjere",
        refresh: "Osvježi",
        refreshing: "Osvježavam…",
        loading: "Učitavanje istorije…",
        empty: "Još nema provjera sukoba.",
        upgradeHint:
          "Istorija provjera sukoba dostupna je na Professional i Firm planovima.",
        badges: {
          clear: "Čisto",
          conflict: "Sukob",
        },
        overrideLine: "Nastavljeno uprkos potencijalnom sukobu (override).",
      },
    },
    clients: {
      header: {
        kicker: "Legantis · Klijenti",
        title: "Klijenti",
        subtitle:
          "Upravljajte listom klijenata, sačuvajte ključne kontakt informacije i pripremite pristup klijentskom portalu.",
        back: "Nazad na kontrolnu tablu",
      },
      actions: {
        addClient: "Dodaj klijenta",
        cancel: "Otkaži",
        deleteAria: "Obriši klijenta",
      },
      conflictPrecheck: {
        title: "Provjera sukoba interesa",
        subtitle:
          "Prije dodavanja novog klijenta, pokrenite brzu provjeru sukoba kroz vaš radni prostor.",
        name: {
          label: "Ime/naziv potencijalnog klijenta",
          placeholder: "npr. John Doe / Johnson Ltd",
        },
        actions: {
          check: "Pokreni provjeru",
          checking: "Provjeravam…",
          continue: "Nastavi na podatke klijenta",
          proceedAnyway: "Nastavi uprkos sukobu",
          startOver: "Počni ispočetka",
        },
        clear: {
          title: "Nema pronađenih sukoba — sigurno je nastaviti",
          body:
            "Nisu pronađeni odgovarajući klijenti, ugovori ili predmeti u vašem radnom prostoru.",
        },
        conflict: {
          title: "Pronađen je potencijalni sukob",
          body:
            "Pregledajte rezultate ispod. Možete nastaviti samo nakon potvrde da ste pregledali potencijalni sukob.",
        },
        override: {
          label:
            "Pregledao/la sam potencijalni sukob i potvrđujem da je sigurno nastaviti.",
        },
      },
      form: {
        fullName: {
          label: "Ime i prezime",
          placeholder: "npr. Ana Kovač",
        },
        email: {
          label: "Email adresa",
          placeholder: "ana.kovac@example.com",
        },
        phone: {
          label: "Broj telefona",
          placeholder: "+382 67 000 000",
        },
        companyName: {
          label: "Naziv kompanije",
          placeholder: "npr. ACME d.o.o.",
        },
        notes: {
          label: "Bilješke",
          placeholder:
            "Ključne informacije o klijentu, tipični predmeti, preferencije...",
        },
        actions: {
          saving: "Čuvam klijenta...",
          save: "Sačuvaj klijenta",
        },
        errors: {
          nameAndEmailRequired: "Ime i prezime i email su obavezni.",
          mustBeLoggedInToAdd: "Morate biti prijavljeni da biste dodali klijente.",
          createFailed: "Neuspješno dodavanje klijenta. Pokušajte ponovo.",
        },
      },
      list: {
        title: "Lista klijenata",
        subtitle: "Svi klijenti koje ste dodali u vaš radni prostor.",
        sortBy: "Sortiraj po",
        sort: {
          name: "Imenu",
          dateAdded: "Datumu dodavanja",
        },
        sortAscending: "Sortiraj rastuće",
        sortDescending: "Sortiraj opadajuće",
        loading: "Učitavanje klijenata...",
        emptyTitle: "Još nema klijenata.",
        emptySubtitle: "Dodajte prvog klijenta koristeći dugme „Dodaj klijenta” iznad.",
        added: "Dodato",
      },
      sidebar: {
        title: "Detalji klijenta",
        empty: "Nijedna stavka nije izabrana.",
        viewActivity: "Pogledaj skorašnju aktivnost",
        loading: "Učitavanje klijenta…",
        recordNotFound: "Zapis nije pronađen",
        email: "Email:",
        phone: "Telefon:",
        address: "Adresa:",
        defaultRate: "Podrazumijevana satnica:",
        status: "Status:",
      },
      messages: {
        added: "Klijent je uspješno dodat.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni da biste vidjeli klijente.",
        loadFailed: "Neuspješno učitavanje klijenata. Pokušajte ponovo.",
      },
      common: {
        notSet: "Nije postavljeno",
      },
    },
    activity: {
      header: {
        title: "Skorašnja aktivnost",
        subtitle:
          "Pregledajte i otvorite skorašnje dokumente, ugovore, predviđanja, analize i klijente.",
      },
      tabs: {
        feed: "Pregled",
        audit: "Dnevnik aktivnosti",
      },
      audit: {
        empty: "Još nema unosa u dnevniku aktivnosti.",
      },
      filters: {
        all: "Sve",
        matters: "Predmeti",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
        matter: "Predmet",
        contract: "Ugovor",
        document: "Dokument",
        analysis: "Analiza dokumenta",
        prediction: "Predviđanje ishoda",
        client: "Klijent",
      },
      list: {
        empty: "Nema skorašnje aktivnosti za ovaj filter.",
      },
      actions: {
        loadMore: "Učitaj još",
      },
    },
    billing: {
      header: {
        title: "Fakturisanje",
        subtitle: "Upravljajte svojim planom i pretplatom.",
      },
      messages: {
        subscriptionUpdated: "Pretplata je uspješno ažurirana.",
      },
      currentPlan: {
        title: "Trenutni plan",
        workspace: "Vaš radni prostor",
        workspaceSuffix: "radni prostor",
        trialEndsPrefix: "Probni period ističe za",
        dayOne: "dan",
        dayMany: "dana",
        statusPrefix: "Status vaše pretplate je",
        noPaidPlanBadge: "Bez plaćenog paketa",
        freeHint:
          "Koristite besplatni nivo (samo generisanje dokumenata). Odaberite plan ispod da otključate ostale funkcije.",
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        openingPortal: "Otvaram portal...",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
        subscribe: "Pretplati se",
      },
      badges: {
        recommended: "Preporučeno",
      },
      tiers: {
        features: {
          documentGeneration: "Generisanje dokumenata",
          contractDrafting: "Priprema ugovora",
          templateLibrary: "Biblioteka šablona",
          aiCalls20: "20 AI poziva dnevno",
          everythingInSolo: "Sve iz Solo paketa",
          caseOutcomePredictions: "Predviđanje ishoda sporova",
          documentAnalysis: "Analiza dokumenata",
          timeTrackingBilling: "Praćenje vremena i fakturisanje",
          clientPortal: "Klijentski portal",
          aiCalls100: "100 AI poziva dnevno",
          everythingInProfessional: "Sve iz Professional paketa",
          prioritySupport: "Prioritetna podrška",
          aiCalls300: "300 AI poziva dnevno",
          multipleTeamMembers: "Više članova tima",
        },
      },
      footer: {
        paddleEnvironment: "Paddle okruženje:",
        paddleHint:
          "Ako dugme za plaćanje ne radi, provjerite da li je postavljen Paddle client token.",
      },
      errors: {
        missingTransactionId: "Nedostaje transactionId",
        paddleNotInitialized: "Paddle nije inicijalizovan",
        paddleCheckoutUnavailable: "Paddle checkout nije dostupan",
        checkoutFailed: "Plaćanje nije uspjelo",
        portalOpenFailed: "Nije moguće otvoriti portal za naplatu.",
      },
      common: {
        unknown: "nepoznato",
      },
    },
    settings: {
      header: {
        title: "Podešavanja",
        subtitle: "Upravljajte profilom, preferencama, bezbjednošću i nalogom.",
      },
      tabs: {
        profile: "Profil",
        preferences: "Preference",
        banking: "Banka",
        security: "Bezbjednost",
        danger: "Opasna zona",
      },
      banking: {
        title: "Podaci za bankovni transfer",
        introAccount:
          "Ovi podaci koriste se na računima kao upute za plaćanje. Sačuvano za vaš nalog.",
        introFirm:
          "Ovi podaci koriste se na računima kao upute za plaćanje. Sačuvano na nivou kancelarije.",
        bankName: {
          label: "Naziv banke",
          placeholder: "npr. Crnogorska komercijalna banka",
        },
        accountHolder: {
          label: "Vlasnik računa",
          placeholder: "npr. naziv vaše kancelarije",
        },
        iban: {
          label: "IBAN",
          placeholder: "XX00 0000 0000 0000 0000",
        },
        swift: {
          label: "SWIFT/BIC (opciono)",
          placeholder: "npr. CKBAMEPG",
        },
        defaultForInvoices: {
          title: "Podrazumijevano za nove račune",
          subtitle:
            "Kada je uključeno, ovaj račun će biti automatski popunjen na novim računima.",
        },
        save: "Sačuvaj bankovne podatke",
        saving: "Čuvanje...",
        messageSaved: "Bankovni podaci su sačuvani.",
        errors: {
          loadFailed: "Učitavanje bankovnih podataka nije uspjelo",
          saveFailed: "Čuvanje bankovnih podataka nije uspjelo",
        },
      },
      profile: {
        title: "Profil",
        fullName: {
          label: "Ime i prezime",
          placeholder: "Vaše ime i prezime",
        },
        email: {
          label: "Email",
        },
        lawFirmName: {
          label: "Naziv kancelarije",
          placeholder: "Vaša kancelarija (opciono)",
        },
        preferredJurisdiction: {
          label: "Preferirana jurisdikcija",
          placeholder: "Izaberite jurisdikciju",
        },
        preferredLanguage: {
          label: "Preferirani jezik",
          placeholder: "Izaberite jezik",
        },
        actions: {
          save: "Sačuvaj profil",
        },
      },
      preferences: {
        title: "Preference",
        defaultJurisdiction: {
          label: "Podrazumijevana jurisdikcija",
          placeholder: "Izaberite podrazumijevanu jurisdikciju",
        },
        currency: {
          label: "Podrazumijevana valuta",
        },
        theme: {
          label: "Tema",
          light: "Svijetla",
          dark: "Tamna",
        },
        emailNotifications: {
          title: "Email obavještenja",
          subtitle:
            "Primajte važne novosti o naplati, aktivnostima i promjenama proizvoda.",
        },
        note:
          "Tema se čuva čim je promijenite. Preference valute i obavještenja se povezuju sa naplatom i upozorenjima aktivnosti. Neke opcije su trenutno informativne i možda još ne utiču na ponašanje aplikacije.",
        actions: {
          save: "Sačuvaj preference",
        },
      },
      security: {
        title: "Promjena lozinke",
        currentPassword: {
          label: "Trenutna lozinka",
        },
        newPassword: {
          label: "Nova lozinka",
        },
        confirmPassword: {
          label: "Potvrdite novu lozinku",
        },
        actions: {
          save: "Sačuvaj lozinku",
        },
        messages: {
          passwordUpdated: "Lozinka je uspješno ažurirana.",
        },
        errors: {
          passwordTooShort: "Nova lozinka mora imati najmanje 8 karaktera.",
          passwordsDoNotMatch: "Nova lozinka i potvrda se ne podudaraju.",
          missingEmail: "Nedostaje korisnički email za promjenu lozinke.",
          currentPasswordIncorrect: "Trenutna lozinka nije ispravna.",
          failedToChangePassword: "Neuspješna promjena lozinke",
        },
      },
      plan: {
        title: "Trenutni plan",
        tierLabel: "Pretplatni paket:",
        statusLabel: "Status:",
        tierNone: "Nema (besplatno — samo dokumenti)",
        statusNone: "Niste pretplaćeni",
        note: "Upravljajte naplatom, računima i nadogradnjama na stranici naplate.",
        actions: {
          manageBilling: "Upravljaj naplatom",
        },
      },
      danger: {
        title: "Opasna zona",
        export: {
          title: "Izvezi sve moje podatke (GDPR)",
          subtitle:
            "Preuzmite JSON izvoz profila, ugovora, dokumenata, predviđanja, analiza, klijenata i unosa vremena za vašu evidenciju.",
          preparing: "Pripremam izvoz...",
          action: "Izvezi sve moje podatke (GDPR)",
        },
        delete: {
          title: "Obriši nalog",
          subtitle:
            "Ovo će označiti vaš profil kao obrisan i odjaviće vas. Ovu radnju nije moguće poništiti.",
          action: "Obriši moj nalog",
          dialogTitle: "Obriši nalog",
          dialogDescription:
            "Da li ste sigurnni? Ovo se ne može poništiti. Vaš profil će biti označen kao obrisan i bićete odjavljeni.",
          confirm: "Obriši nalog",
        },
        errors: {
          failedToExportData: "Neuspješan izvoz podataka",
          failedToDeleteAccount: "Neuspješno brisanje naloga",
        },
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      languages: {
        Serbian: "Srpski",
        Croatian: "Hrvatski",
        Bosnian: "Bosanski",
        Montenegrin: "Crnogorski",
        Slovenian: "Slovenački",
        English: "Engleski",
      },
      messages: {
        profileUpdated: "Profil je uspješno ažuriran.",
        preferencesSaved:
          "Preference su sačuvane. Neke opcije još nijesu trajno sačuvane (uskoro).",
      },
      errors: {
        failedToSaveProfile: "Neuspješno čuvanje profila",
        failedToSavePreferences: "Neuspješno čuvanje preferenci",
      },
      common: {
        saving: "Čuvam...",
        cancel: "Otkaži",
        deleting: "Brišem...",
      },
    },
    templates: {
      header: {
        kicker: "Legantis · Biblioteka šablona",
        title: "Unaprijed pripremljeni pravni šabloni",
        subtitle:
          "Pregledajte odabrane šablone specifične za jurisdikciju i započnite AI asistirano sastavljanje.",
      },
      filters: {
        documentType: {
          label: "Vrsta dokumenta",
          all: "Sve vrste dokumenata",
        },
        jurisdiction: {
          label: "Jurisdikcija",
          all: "Sve jurisdikcije",
        },
        search: {
          label: "Pretraga",
          placeholder: "Pretražite po nazivu ili ključnoj riječi...",
        },
      },
      documentTypes: {
        nda: "NDA",
        employment: "Zaposlenje",
        power_of_attorney: "Punomoć",
        sales: "Prodaja",
        lease: "Zakup",
        service: "Ugovor o uslugama",
        salesAgreement: "Ugovor o prodaji",
        leaseAgreement: "Ugovor o zakupu",
        serviceAgreement: "Ugovor o uslugama",
        legalDocument: "Pravni dokument",
      },
      jurisdictions: {
        serbia: "Srbija",
        croatia: "Hrvatska",
        bih_fbih: "Bosna i Hercegovina – Federacija",
        bih_rs: "Bosna i Hercegovina – Republika Srpska",
        bih_brcko: "Bosna i Hercegovina – Brčko Distrikt",
        montenegro: "Crna Gora",
        slovenia: "Slovenija",
      },
      list: {
        empty:
          "Nijedan šablon ne odgovara filterima. Pokušajte promijeniti vrstu dokumenta, jurisdikciju ili pojmove pretrage.",
      },
      preview: {
        title: "Pregled šablona",
        subtitle: "Pregledajte osnovni tekst prije generisanja prilagođenog nacrta.",
        empty:
          "Izaberite šablon sa liste da biste ovdje vidjeli detalje i pregled sadržaja.",
      },
      actions: {
        goToGenerator: "Idi na generator",
        preview: "Pregled",
        useTemplate: "Koristi ovaj šablon",
      },
      common: {
        notSpecified: "Nije navedeno",
      },
    },
  },
}

type LanguageContextValue = {
  language: LanguageCode
  setLanguage: (code: LanguageCode) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getNestedMessage(messages: Messages, key: string): string | undefined {
  return key
    .split(".")
    .reduce<unknown>((acc, part) => {
      if (!acc || typeof acc !== "object") return undefined
      return (acc as Record<string, unknown>)[part]
    }, messages) as string | undefined
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // IMPORTANT: default to "en" for the initial render to avoid SSR/CSR hydration mismatch.
  const [language, setLanguageState] = useState<LanguageCode>("en")

  useEffect(() => {
    if (typeof window === "undefined") return

    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null
    let next: LanguageCode = "en"

    if (stored && MESSAGES[stored]) {
      next = stored
    } else {
      const browser = navigator.language.toLowerCase()
      if (browser.startsWith("sr")) next = "sr"
      else if (browser.startsWith("bs")) next = "bs"
      else if (browser.startsWith("hr")) next = "hr"
      else if (browser.startsWith("sl")) next = "sl"
      else if (browser.startsWith("me")) next = "me"
    }

    if (next === language) return

    // Schedule to avoid triggering the set-state-in-effect lint rule.
    queueMicrotask(() => {
      setLanguageState(next)
      document.cookie = `${STORAGE_KEY}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`
    })
  }, [language])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code)
      document.cookie = `${STORAGE_KEY}=${code}; Path=/; Max-Age=31536000; SameSite=Lax`
    }
  }, [])

  const t = useCallback(
    (key: string) => {
      const messages = MESSAGES[language] ?? MESSAGES.en
      const value = getNestedMessage(messages, key)
      return typeof value === "string" ? value : key
    },
    [language]
  )

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
    }),
    [language, setLanguage, t]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    // Fallback to English to avoid hard crashes if a component
    // renders outside the provider (e.g. during layout transitions).
    const language: LanguageCode = "en"
    return {
      language,
      setLanguage: () => {},
      t: (key: string) => {
        const messages = MESSAGES[language] ?? MESSAGES.en
        const value = getNestedMessage(messages, key)
        return typeof value === "string" ? value : key
      },
    }
  }
  return ctx
}

