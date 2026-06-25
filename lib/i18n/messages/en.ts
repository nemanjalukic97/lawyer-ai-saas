import type { Messages } from '@/lib/i18n/types'

export const enMessages: Messages = {
    pagination: {
      previous: "Previous",
      next: "Next",
      pageOf: "Page {page} of {total}",
    },
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
      returnToHomepage: "Return to Homepage",
      loginTitle: "Sign in to Legantis",
      loginDescription:
        "Enter your email and password to access your dashboard.",
      signupTitle: "Create your Legantis account",
      signupDescription:
        "Sign up to start using Legantis for your legal team.",
      emailLabel: "Email",
      passwordLabel: "Password",
      loginButton: "Log in",
      signupButton: "Sign up",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
      fullNameLabel: "Full name",
      lawFirmLabel: "Lawyer office name",
      jurisdictionLabel: "Country / Jurisdiction",
      jurisdictionPlaceholder: "Select country / jurisdiction",
      emailInvalidTitle:
        "Please enter a valid email address (e.g. name@example.com).",
      userNotFound: "No account found with this email.",
      signupSuccessTitle: "You're almost ready to use Legantis",
      signupSuccessBody1:
        "Your Legantis account has been created successfully. Please check your inbox and confirm your email address to activate your account.",
      signupSuccessBody2:
        "Once confirmed, you can log in and start using Legantis.",
      signupSuccessSpam:
        "If you don't see the email in your inbox, please check your Junk or Spam folder.",
      emailConfirmedTitle: "Your account is confirmed!",
      emailConfirmedBody:
        "You can now log in and start using Legantis.",
      goToDashboard: "Go to Dashboard",
      emailConfirmError:
        "This link has expired or is invalid. Please try again.",
      planSelected:
        "You selected the {plan} plan. You can change this later from your dashboard.",
      emailTakenBeforeLink: "Account with that email is already registered. Try",
      emailTakenLink: "logging in",
      emailTakenAfterLink: "instead.",
      invalidEmailError: "Please enter a valid email address.",
      weakPasswordError:
        "Password must be at least 6 characters and include one uppercase letter, one number, and one special character (such as ., $ or #).",
      duplicateEmailSuggestion:
        "Account with that email is already registered. Try logging in instead.",
    },
    redline: {
      header: {
        title: "Document Redlining",
        subtitle:
          "Upload a contract, review Legantis-suggested changes, and export an updated DOCX.",
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
        failedToDeleteContract: "Failed to delete contract. Please try again.",
        deleteConfirm: "Delete this contract?",
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
      caseLaw: {
        title: "Case law",
        caseSingular: "decision",
        casePlural: "decisions",
        caseNumberLabel: "Case no.",
        decisionDateLabel: "Decision date:",
        lowConfidence:
          "Low confidence: the retrieved court decisions had weak relevance to this query.",
        reasoningLabel: "Reasoning:",
        relatedArticlesLabel: "Relevant provisions:",
        showMore: "Show more",
        showLess: "Show less",
        expandCourtPosition: "Show full decision text",
        collapseCourtPosition: "Show shorter excerpt",
        outdatedWarning:
          "{outdated} of {total} displayed cases are older than 15 years. We recommend checking for more recent case law.",
        outdatedWarningLink: "Search for more recent case law →",
        outcomes: {
          plaintiff_won: "Plaintiff won",
          defendant_won: "Defendant won",
          partially: "Partial",
          procedural: "Procedural",
          remanded: "Remanded",
        },
      },
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
      loadMore: "Load more",
      showingCount: "Showing {shown} results",
      results: {
        title: "Results",
        hint: "Run a search to see the most relevant law articles.",
        empty:
          "No relevant articles found. Try different keywords or broader category.",
        countSuffix: "results",
        confidenceLabel: "Confidence",
        articleLabel: "Article",
        lawsTab: "Laws",
        caseLawTab: "Case Law",
      },
      caseLaw: {
        title: "Case law",
        empty:
          "No relevant court decisions found. Try different keywords or a broader category.",
        countSuffix: "decisions",
      },
      sessions: {
        title: "Recent searches",
        refresh: "Refresh",
        refreshing: "Refreshing…",
        loading: "Loading…",
        empty: "No saved research sessions yet.",
        deleteAria: "Delete search",
        deleteConfirm: "Delete this saved search?",
        upgradeHint:
          "Saved research sessions are available on Professional and Firm plans.",
      },
      upgradePrompt: "Upgrade to save research sessions.",
      errors: {
        queryRequired: "Please enter a search query.",
        searchFailed: "Search failed. Please try again.",
        historyFailed: "Could not load recent searches.",
        saveFailed: "Could not save research session.",
        deleteFailed: "Could not delete research session.",
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
      fields: {
        employeeName: "Employee Name",
        employerName: "Employer Name",
        position: "Position",
        startDate: "Start Date",
        salary: "Salary",
        sellerName: "Seller Name",
        buyerName: "Buyer Name",
        itemDescription: "Item Description",
        price: "Price",
        propertyAddress: "Property Address",
        monthlyRent: "Monthly Rent",
        duration: "Duration",
        landlordName: "Landlord Name",
        tenantName: "Tenant Name",
        principalName: "Principal Name",
        agentName: "Agent Name",
        scopeOfAuthority: "Scope of Authority",
        serviceProvider: "Service Provider",
        clientName: "Client Name",
        serviceDescription: "Service Description",
        paymentTerms: "Payment Terms",
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
            "Fields can be left blank if not applicable. Legantis will fill in standard clauses for the selected jurisdiction and document type, but you must always review the output before use.",
        },
        fields: {
          party1: "Party 1 Name",
          party2: "Party 2 Name",
          party1FullName: "Party 1 Full name",
          party1Address: "Party 1 Address",
          party2FullName: "Party 2 Full name",
          party2Address: "Party 2 Address",
          date: "Date",
          confidentialDescription: "Confidential Information Description",
          ndaDuration: "Duration",
        },
        actions: {
          generating: "Generating document...",
          generate: "Generate document",
          note: "Uses your Legantis quota. Results are drafts only and do not constitute legal advice.",
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
        caseLawSection: {
          title: "Relevant Case Law",
          basedOn: "Based on {count} decisions from the case law database.",
        },
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
          hint: "Legantis will tailor clauses to this contract type.",
        },
        step2: {
          title: "Jurisdiction",
          lead: "Step {current} of {total}. Select the jurisdiction that will govern this contract.",
        },
        step3: {
          title: "Details",
          lead:
            "Step {current} of {total}. Fill in the key parties and commercial terms. Legantis will handle the boilerplate and jurisdiction-specific clauses.",
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
        employerAddress: "Employer Address",
        employeeName: "Employee Name",
        employeeAddress: "Employee Address",
        jobTitle: "Job Title",
        startDate: "Start Date",
        salary: "Salary",
        workLocation: "Work Location",
        contractDuration: "Contract Duration",
        clientName: "Client Name",
        clientAddress: "Client Address",
        serviceProviderName: "Service Provider Name",
        serviceProviderAddress: "Service Provider Address",
        serviceDescription: "Service Description",
        paymentAmount: "Payment Amount",
        paymentSchedule: "Payment Schedule",
        endDate: "End Date",
        sellerName: "Seller Name",
        sellerAddress: "Seller Address",
        buyerName: "Buyer Name",
        buyerAddress: "Buyer Address",
        itemDescription: "Item Description",
        purchasePrice: "Purchase Price",
        paymentTerms: "Payment Terms",
        deliveryDate: "Delivery Date",
        landlordName: "Landlord Name",
        landlordAddress: "Landlord Address",
        tenantName: "Tenant Name",
        tenantAddress: "Tenant Address",
        propertyAddress: "Property Address",
        monthlyRent: "Monthly Rent",
        depositAmount: "Deposit Amount",
        leaseStartDate: "Lease Start Date",
        leaseDuration: "Lease Duration",
        disclosingParty: "Disclosing Party",
        disclosingPartyAddress: "Disclosing Party Address",
        receivingParty: "Receiving Party",
        receivingPartyAddress: "Receiving Party Address",
        purpose: "Purpose",
        confidentialInfoDescription: "Confidential Info Description",
        duration: "Duration",
        partner1Name: "Partner 1 Name",
        partner1Address: "Partner 1 Address",
        partner2Name: "Partner 2 Name",
        partner2Address: "Partner 2 Address",
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
          "Uses your Legantis quota. Output is a draft only and does not constitute legal advice.",
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
          "Analyze case facts, evidence strength, and dispute size to get a Legantis-generated prediction and strategic recommendations for your matters across the Balkans.",
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
            "Uses your Legantis quota. This is Legantis analysis only and does not replace independent legal judgment.",
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
      similarCases: {
        sectionTitle: "Similar Case Outcome Analysis",
        cardTitle: "Similar Case Statistics",
        plaintiffWinRate: "{pct}% of cases favored the plaintiff",
        plaintiffWon: "Plaintiff won",
        defendantWon: "Defendant won",
        partially: "Partial",
        basedOn: "Based on {count} similar rulings from the database",
        signalGood: "Plaintiff has a strong chance",
        signalUncertain: "Uncertain",
        signalRisky: "Risky for the plaintiff",
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
          "Upload contracts or legal documents for automated review. Legantis highlights risky clauses, missing provisions, compliance issues, and provides a clear risk score with actionable recommendations.",
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
            "Uses your Legantis quota. This is Legantis analysis only and does not replace independent legal judgment.",
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
      report: {
        sections: {
          riskyClauses: "RISKY CLAUSES",
          missingProvisions: "MISSING PROVISIONS",
          complianceIssues: "COMPLIANCE ISSUES",
          ambiguousLanguage: "AMBIGUOUS LANGUAGE",
          executiveSummary: "EXECUTIVE SUMMARY",
          riskScore: "RISK SCORE",
          recommendations: "RECOMMENDATIONS",
        },
        riskScoreNotDetected: "Risk score not detected",
        riskScoreBadge: "Risk score: {score}/10",
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
      deleteConfirm: {
        title: "Delete time entry?",
        body: "Are you sure you want to delete this time entry? This action cannot be undone.",
        cancel: "Cancel",
        confirm: "Delete",
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
        title: "Log new time entry",
        client: {
          label: "Client",
          placeholder: "Start typing to search…",
        },
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
        loadFailed: "Failed to load time entries. Please try again.",
        deleteFailed: "Failed to delete time entry. Please try again.",
      },
      common: {
        emptyValue: "—",
        totalInline: "Total:",
        matterFallback: "Matter",
      },
      pagination: {
        previous: "Previous",
        next: "Next",
        pageOf: "Page {page} of {total}",
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
        delete: "Delete",
        deleteConfirm: "Remove this conflict check from your history?",
        deleteFailed: "Failed to delete conflict check.",
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
          "Browse curated, jurisdiction-specific templates and jump straight into Legantis-assisted drafting.",
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
        deleteFailed: "Could not delete this intake form.",
      },
      list: {
        submissions: "Submissions: {n}",
        active: "Active",
        copyLink: "Copy link",
        copied: "Copied",
        viewSubmissions: "Submissions",
        edit: "Edit form",
        deleteAria: "Delete intake form",
      },
      actions: {
        create: "Create new intake form",
        deleteConfirm: "Delete this intake form? All submissions will also be deleted.",
      },
      common: {
        formFallback: "Intake form",
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
}
