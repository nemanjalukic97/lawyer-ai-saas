"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

type LanguageCode = "en" | "sr" | "bs" | "hr" | "sl" | "me"

const STORAGE_KEY = "legantis-language"

type Messages = Record<string, string | Messages>

const MESSAGES: Record<LanguageCode, Messages> = {
  en: {
    nav: {
      features: "Features",
      pricing: "Pricing",
      login: "Log in",
      getStarted: "Get started",
      dashboard: "Dashboard",
      generate: "Generate",
      contracts: "Contracts",
      predictions: "Predictions",
      analyze: "Analyze",
      time: "Time",
      clients: "Clients",
      activity: "Activity",
      billing: "Billing",
      settings: "Settings",
      templates: "Templates",
      actions: "Actions",
      logout: "Log out",
    },
    language: {
      label: "Language",
    },
    home: {
      hero: {
        title: "Legantis – AI legal assistant for Balkan lawyers",
        subtitle:
          "Draft contracts, predict case outcomes, analyze documents, and manage clients—built for Bosnia & Herzegovina, Serbia, Croatia, Montenegro, and Slovenia.",
        pricingCta: "See pricing",
      },
      features: {
        title: "Everything you need to work smarter",
        subtitle:
          "One platform for drafting, prediction, analysis, time tracking, and client collaboration.",
        items: {
          contracts: {
            title: "AI Contract Drafting",
            description: "Draft and customize contracts with jurisdiction-specific clauses.",
          },
          prediction: {
            title: "Case Prediction",
            description: "Estimate case outcomes using precedent and local law.",
          },
          analysis: {
            title: "Document Analysis",
            description: "Upload documents for risk and compliance review.",
          },
          time: {
            title: "Time Tracking",
            description: "Track billable time and generate invoices.",
          },
          portal: {
            title: "Client Portal",
            description: "Secure file sharing and messaging with clients.",
          },
        },
      },
      pricing: {
        title: "Simple, transparent pricing",
        subtitle:
          "Choose the plan that fits your practice. All plans include core AI features.",
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
        cta: "Get started",
      },
    },
    footer: {
      tagline:
        "Legantis – AI legal assistant for Bosnia & Herzegovina, Serbia, Croatia, Montenegro, and Slovenia.",
      privacy: "Privacy",
      terms: "Terms",
      contact: "Contact",
      rights: "All rights reserved",
    },
    generate: {
      header: {
        kicker: "Legantis · Document generation",
        title: "AI legal document generator",
        subtitle:
          "Generate jurisdiction-specific NDAs, employment contracts, powers of attorney, sales contracts, leases, and service agreements for your clients across the Balkans.",
        back: "Back to dashboard",
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
    activity: {
      header: {
        title: "Recent activity",
        subtitle:
          "View and open your recent documents, contracts, predictions, analyses, and clients.",
      },
      filters: {
        all: "All",
        documents: "Documents",
        contracts: "Contracts",
        predictions: "Predictions",
        analyses: "Analyses",
        clients: "Clients",
      },
      types: {
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
      },
      actions: {
        manageSubscription: "Manage subscription",
        reactivate: "Reactivate",
        currentPlan: "Current plan",
        upgrade: "Upgrade",
        downgrade: "Downgrade",
        startingCheckout: "Starting checkout...",
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
        security: "Security",
        danger: "Danger Zone",
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
        emailNotifications: {
          title: "Email notifications",
          subtitle:
            "Receive important updates about billing, activity, and product changes.",
        },
        note:
          "Currency and notification preferences are being wired into billing and activity alerts. Some options are currently informational only and may not affect existing behavior yet.",
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
      header: {
        kicker: "Legantis dashboard",
        welcome: "Welcome back,",
        planSuffix: "plan",
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
      actions: {
        title: "Quick actions",
        subtitle: "Jump straight into key Legantis features.",
        open: "Open",
        generate: {
          title: "Generate Document",
          description: "Create NDAs, contracts, and legal documents with AI.",
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
      },
      activity: {
        title: "Recent activity",
        empty: "No recent activity yet.",
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
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      time: "Vreme",
      clients: "Klijenti",
      activity: "Aktivnosti",
      billing: "Fakturisanje",
      settings: "Podešavanja",
      templates: "Predlozi",
      actions: "Radnje",
      logout: "Odjava",
    },
    language: {
      label: "Jezik",
    },
    home: {
      hero: {
        title: "Legantis – AI pravni asistent za balkanske advokate",
        subtitle:
          "Pripremite ugovore, predvidite ishod sporova, analizirajte dokumenta i vodite klijente – posebno prilagođeno za zemlje Balkana.",
        pricingCta: "Pogledaj cene",
      },
      features: {
        title: "Sve što vam treba da radite pametnije",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i saradnju sa klijentima.",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description: "Pripremite ugovore sa klauzulama prilagođenim jurisdikciji.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description: "Procijenite ishod predmeta na osnovu prakse i lokalnog prava.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description: "Otpremite dokumenta za provjeru rizika i usklađenosti.",
          },
          time: {
            title: "Praćenje vremena",
            description: "Evidentirajte naplativo vreme i kreirajte račune.",
          },
          portal: {
            title: "Klijentski portal",
            description: "Sigurna razmena dokumenata i komunikacija sa klijentima.",
          },
        },
      },
      pricing: {
        title: "Jednostavne i transparentne cene",
        subtitle:
          "Izaberite paket koji odgovara vašoj kancelariji. Svi paketi uključuju ključne AI funkcionalnosti.",
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
        cta: "Započni",
      },
    },
    footer: {
      tagline:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uslovi korišćenja",
      contact: "Kontakt",
      rights: "Sva prava zadržana",
    },
    dashboard: {
      header: {
        kicker: "Legantis kontrolna tabla",
        welcome: "Dobro došli nazad,",
        planSuffix: "paket",
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
      actions: {
        title: "Brze akcije",
        subtitle: "Odmah pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiši dokument",
          description:
            "Kreirajte NDA ugovore i druga dokumenta uz pomoć AI-ja.",
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
      },
      activity: {
        title: "Skorašnja aktivnost",
        empty: "Još uvijek nema aktivnosti.",
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
        nda: "NDA",
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
    activity: {
      header: {
        title: "Skorašnja aktivnost",
        subtitle:
          "Pregledajte i otvorite skorašnje dokumente, ugovore, predviđanja, analize i klijente.",
      },
      filters: {
        all: "Sve",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
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
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
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
        security: "Sigurnost",
        danger: "Opasna zona",
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
        emailNotifications: {
          title: "Email obavještenja",
          subtitle:
            "Primajte važne novosti o naplati, aktivnosti i promjenama proizvoda.",
        },
        note:
          "Preference valute i obavještenja se povezuju sa naplatom i upozorenjima aktivnosti. Neke opcije su trenutno informativne i možda još ne utiču na ponašanje aplikacije.",
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
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      time: "Vrijeme",
      clients: "Klijenti",
      activity: "Aktivnosti",
      billing: "Fakturisanje",
      settings: "Postavke",
      templates: "Prijedlozi",
      actions: "Radnje",
      logout: "Odjava",
    },
    language: {
      label: "Jezik",
    },
    home: {
      hero: {
        title: "Legantis – AI pravni asistent za odvjetnike na Balkanu",
        subtitle:
          "Pripremite ugovore, predvidite ishod sporova, analizirajte dokumente i vodite klijente – prilagođeno za zemlje Balkana.",
        pricingCta: "Pogledaj cijene",
      },
      features: {
        title: "Sve što vam treba da radite pametnije",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i saradnju s klijentima.",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description: "Pripremite ugovore sa klauzulama prilagođenim jurisdikciji.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description: "Procijenite ishod predmeta na osnovu prakse i lokalnog prava.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description: "Otpremite dokumente za provjeru rizika i usklađenosti.",
          },
          time: {
            title: "Praćenje vremena",
            description: "Evidentirajte naplativo vrijeme i kreirajte račune.",
          },
          portal: {
            title: "Klijentski portal",
            description: "Sigurna razmjena dokumenata i komunikacija s klijentima.",
          },
        },
      },
      pricing: {
        title: "Jednostavne i transparentne cijene",
        subtitle:
          "Odaberite paket koji odgovara vašoj kancelariji. Svi paketi uključuju ključne AI funkcionalnosti.",
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
        cta: "Započni",
      },
    },
    footer: {
      tagline:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uslovi korištenja",
      contact: "Kontakt",
      rights: "Sva prava zadržana",
    },
    dashboard: {
      header: {
        kicker: "Legantis kontrolna ploča",
        welcome: "Dobro došli nazad,",
        planSuffix: "paket",
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
      actions: {
        title: "Brze akcije",
        subtitle: "Brzo pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiši dokument",
          description:
            "Kreirajte NDA i druge ugovore uz pomoć AI-ja.",
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
      },
      activity: {
        title: "Skorašnja aktivnost",
        empty: "Još uvijek nema aktivnosti.",
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
        nda: "NDA",
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
    activity: {
      header: {
        title: "Skorašnja aktivnost",
        subtitle:
          "Pregledajte i otvorite skorašnje dokumente, ugovore, predviđanja, analize i klijente.",
      },
      filters: {
        all: "Sve",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
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
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
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
        security: "Sigurnost",
        danger: "Opasna zona",
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
        emailNotifications: {
          title: "Email obavještenja",
          subtitle:
            "Primajte važne novosti o naplati, aktivnosti i promjenama proizvoda.",
        },
        note:
          "Postavke valute i obavještenja povezujemo s naplatom i upozorenjima aktivnosti. Neke opcije su trenutno samo informativne i možda još ne utiču na ponašanje aplikacije.",
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
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      time: "Vrijeme",
      clients: "Klijenti",
      activity: "Aktivnosti",
      billing: "Naplata",
      settings: "Postavke",
      templates: "Prijedlozi",
      actions: "Radnje",
      logout: "Odjava",
    },
    language: {
      label: "Jezik",
    },
    home: {
      hero: {
        title: "Legantis – AI pravni asistent za odvjetnike na Balkanu",
        subtitle:
          "Pripremite ugovore, predvidite ishod sporova, analizirajte dokumente i vodite klijente – prilagođeno za zemlje Balkana.",
        pricingCta: "Pogledaj cijene",
      },
      features: {
        title: "Sve što vam treba da radite pametnije",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i suradnju s klijentima.",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description: "Pripremite ugovore s klauzulama prilagođenima jurisdikciji.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description: "Procijenite ishod predmeta na temelju prakse i lokalnog prava.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description: "Otpremite dokumente za provjeru rizika i usklađenosti.",
          },
          time: {
            title: "Praćenje vremena",
            description: "Evidentirajte naplativo vrijeme i kreirajte račune.",
          },
          portal: {
            title: "Klijentski portal",
            description: "Sigurna razmjena dokumenata i komunikacija s klijentima.",
          },
        },
      },
      pricing: {
        title: "Jednostavne i transparentne cijene",
        subtitle:
          "Odaberite paket koji odgovara vašem uredu. Svi paketi uključuju ključne AI funkcionalnosti.",
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
        cta: "Započni",
      },
    },
    footer: {
      tagline:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uvjeti korištenja",
      contact: "Kontakt",
      rights: "Sva prava pridržana",
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
      filters: {
        all: "Sve",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
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
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
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
        security: "Sigurnost",
        danger: "Opasna zona",
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
        emailNotifications: {
          title: "Email obavijesti",
          subtitle:
            "Primajte važne novosti o naplati, aktivnosti i promjenama proizvoda.",
        },
        note:
          "Postavke valute i obavijesti povezujemo s naplatom i upozorenjima aktivnosti. Neke opcije su trenutno samo informativne i možda još ne utječu na ponašanje aplikacije.",
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
      header: {
        kicker: "Legantis nadzorna ploča",
        welcome: "Dobrodošli natrag,",
        planSuffix: "paket",
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
      actions: {
        title: "Brze akcije",
        subtitle: "Odmah pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiraj dokument",
          description:
            "Kreirajte NDA i druge ugovore uz pomoć AI-ja.",
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
      },
      activity: {
        title: "Nedavna aktivnost",
        empty: "Još nema aktivnosti.",
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
        nda: "NDA",
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
        dateRequired: "Datum je obavezan.",
        invalidHoursOrRate:
          "Unesite ispravne sate (0.25–24) i nenegativnu satnicu.",
        createFailed: "Neuspješno evidentiranje vremena. Pokušajte ponovno.",
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
          "Upravljajte popisom klijenata, spremite ključne kontakt podatke i pripremite siguran pristup klijentskom portalu.",
        back: "Natrag na nadzornu ploču",
      },
      actions: {
        addClient: "Dodaj klijenta",
        cancel: "Odustani",
        deleteAria: "Izbriši klijenta",
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
          placeholder: "+385 91 000 0000",
        },
        companyName: {
          label: "Naziv tvrtke",
          placeholder: "npr. ACME d.o.o.",
        },
        notes: {
          label: "Bilješke",
          placeholder:
            "Ključne informacije o klijentu, tipični predmeti, preferencije...",
        },
        actions: {
          saving: "Spremam klijenta...",
          save: "Spremi klijenta",
        },
        errors: {
          nameAndEmailRequired: "Ime i prezime i email su obavezni.",
          mustBeLoggedInToAdd: "Morate biti prijavljeni kako biste dodali klijente.",
          createFailed: "Neuspješno dodavanje klijenta. Pokušajte ponovno.",
        },
      },
      list: {
        title: "Popis klijenata",
        subtitle: "Svi klijenti koje ste dodali u svoj radni prostor.",
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
          "Dodajte prvog klijenta pomoću gumba „Dodaj klijenta” iznad.",
        added: "Dodano",
      },
      sidebar: {
        title: "Detalji klijenta",
        empty: "Nije odabrana nijedna stavka.",
        viewActivity: "Pogledaj nedavnu aktivnost",
        loading: "Učitavanje klijenta…",
        recordNotFound: "Zapis nije pronađen",
        email: "Email:",
        phone: "Telefon:",
        address: "Adresa:",
        defaultRate: "Zadana satnica:",
        status: "Status:",
      },
      messages: {
        added: "Klijent je uspješno dodan.",
      },
      errors: {
        mustBeLoggedInToView: "Morate biti prijavljeni kako biste vidjeli klijente.",
        loadFailed: "Neuspješno učitavanje klijenata. Pokušajte ponovno.",
      },
      common: {
        notSet: "Nije postavljeno",
      },
    },
    activity: {
      header: {
        title: "Nedavna aktivnost",
        subtitle:
          "Pregledajte i otvorite svoje nedavne dokumente, ugovore, predviđanja, analize i klijente.",
      },
      filters: {
        all: "Sve",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
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
        loadMore: "Učitaj još",
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
      contracts: "Pogodbe",
      predictions: "Napovedi",
      analyze: "Analiza",
      time: "Čas",
      clients: "Stranke",
      activity: "Aktivnosti",
      billing: "Obračun",
      settings: "Nastavitve",
      templates: "Predlogi",
      actions: "Dejanja",
      logout: "Odjava",
    },
    language: {
      label: "Jezik",
    },
    home: {
      hero: {
        title: "Legantis – AI pravni asistent za odvetnike na Balkanu",
        subtitle:
          "Pripravite pogodbe, napoveste izid sporov, analizirajte dokumente in upravljajte stranke – prilagojeno za države Balkana.",
        pricingCta: "Poglej cene",
      },
      features: {
        title: "Vse, kar potrebujete za pametnejše delo",
        subtitle:
          "Ena platforma za pisanje, napovedovanje, analizo, beleženje časa in sodelovanje s strankami.",
        items: {
          contracts: {
            title: "AI priprava pogodb",
            description: "Pripravite pogodbe s klavzulami, prilagojenimi jurisdikciji.",
          },
          prediction: {
            title: "Napoved sporov",
            description: "Ocenite izid zadev na podlagi prakse in lokalnega prava.",
          },
          analysis: {
            title: "Analiza dokumentov",
            description: "Naložite dokumente za preverjanje tveganj in skladnosti.",
          },
          time: {
            title: "Spremljanje časa",
            description: "Beležite obračunljivi čas in ustvarjajte račune.",
          },
          portal: {
            title: "Portal za stranke",
            description: "Varno deljenje datotek in komunikacija s strankami.",
          },
        },
      },
      pricing: {
        title: "Preproste in pregledne cene",
        subtitle:
          "Izberite paket, ki ustreza vaši pisarni. Vsi paketi vključujejo ključne AI funkcionalnosti.",
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
        cta: "Začni",
      },
    },
    footer: {
      tagline:
        "Legantis – AI pravni asistent za Bosno in Hercegovino, Srbijo, Hrvaško, Črno goro in Slovenijo.",
      privacy: "Zasebnost",
      terms: "Pogoji uporabe",
      contact: "Kontakt",
      rights: "Vse pravice pridržane",
    },
    dashboard: {
      header: {
        kicker: "Nadzorna plošča Legantis",
        welcome: "Dobrodošli nazaj,",
        planSuffix: "paket",
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
      actions: {
        title: "Hitre akcije",
        subtitle: "Hitro dostopajte do ključnih funkcij Legantisa.",
        open: "Odpri",
        generate: {
          title: "Ustvari dokument",
          description:
            "Pripravite NDA in druge pogodbe s pomočjo AI-ja.",
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
      },
      activity: {
        title: "Nedavna aktivnost",
        empty: "Zaenkrat še ni aktivnosti.",
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
        nda: "NDA",
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
        dateRequired: "Datum je obvezen.",
        invalidHoursOrRate: "Vnesite veljavne ure (0.25–24) in nenegativno urno postavko.",
        createFailed: "Beleženje časa ni uspelo. Poskusite znova.",
      },
      common: {
        emptyValue: "—",
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
      filters: {
        all: "Vse",
        documents: "Dokumenti",
        contracts: "Pogodbe",
        predictions: "Napovedi",
        analyses: "Analize",
        clients: "Stranke",
      },
      types: {
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
      },
      actions: {
        manageSubscription: "Upravljaj naročnino",
        reactivate: "Ponovno aktiviraj",
        currentPlan: "Trenutni paket",
        upgrade: "Nadgradi",
        downgrade: "Znižaj paket",
        startingCheckout: "Začenjam plačilo...",
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
        security: "Varnost",
        danger: "Nevarno območje",
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
        emailNotifications: {
          title: "E-poštna obvestila",
          subtitle: "Prejemajte pomembne posodobitve o obračunu, aktivnosti in spremembah.",
        },
        note:
          "Nastavitve valute in obvestil povezujemo z obračunom in opozorili aktivnosti. Nekatere možnosti so trenutno le informativne in morda še ne vplivajo na delovanje.",
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
      contracts: "Ugovori",
      predictions: "Predviđanja",
      analyze: "Analiza",
      time: "Vrijeme",
      clients: "Klijenti",
      activity: "Aktivnosti",
      billing: "Fakturisanje",
      settings: "Podešavanja",
      templates: "Prijedlozi",
      actions: "Radnje",
      logout: "Odjava",
    },
    language: {
      label: "Jezik",
    },
    home: {
      hero: {
        title: "Legantis – AI pravni asistent za advokate na Balkanu",
        subtitle:
          "Pripremite ugovore, predvidite ishod sporova, analizirajte dokumenta i vodite klijente – prilagođeno za zemlje Balkana.",
        pricingCta: "Pogledaj cijene",
      },
      features: {
        title: "Sve što vam treba da radite pametnije",
        subtitle:
          "Jedna platforma za pisanje, predviđanje, analizu, evidenciju vremena i saradnju sa klijentima.",
        items: {
          contracts: {
            title: "AI izrada ugovora",
            description: "Pripremite ugovore sa klauzulama prilagođenim jurisdikciji.",
          },
          prediction: {
            title: "Predviđanje sporova",
            description: "Procijenite ishod predmeta na osnovu prakse i lokalnog prava.",
          },
          analysis: {
            title: "Analiza dokumenata",
            description: "Otpremite dokumenta za provjeru rizika i usklađenosti.",
          },
          time: {
            title: "Praćenje vremena",
            description: "Evidentirajte naplativo vrijeme i kreirajte račune.",
          },
          portal: {
            title: "Klijentski portal",
            description: "Sigurna razmjena dokumenata i komunikacija sa klijentima.",
          },
        },
      },
      pricing: {
        title: "Jednostavne i transparentne cijene",
        subtitle:
          "Odaberite paket koji odgovara vašoj kancelariji. Svi paketi uključuju ključne AI funkcionalnosti.",
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
        cta: "Započni",
      },
    },
    footer: {
      tagline:
        "Legantis – AI pravni asistent za Bosnu i Hercegovinu, Srbiju, Hrvatsku, Crnu Goru i Sloveniju.",
      privacy: "Privatnost",
      terms: "Uslovi korišćenja",
      contact: "Kontakt",
      rights: "Sva prava zadržana",
    },
    dashboard: {
      header: {
        kicker: "Legantis kontrolna tabla",
        welcome: "Dobrodošli nazad,",
        planSuffix: "paket",
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
      actions: {
        title: "Brze akcije",
        subtitle: "Brzo pristupite ključnim funkcijama Legantisa.",
        open: "Otvori",
        generate: {
          title: "Generiši dokument",
          description:
            "Kreirajte NDA i druge ugovore uz pomoć AI-ja.",
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
      },
      activity: {
        title: "Skorašnja aktivnost",
        empty: "Još uvijek nema aktivnosti.",
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
        nda: "NDA",
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
      filters: {
        all: "Sve",
        documents: "Dokumenti",
        contracts: "Ugovori",
        predictions: "Predviđanja",
        analyses: "Analize",
        clients: "Klijenti",
      },
      types: {
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
      },
      actions: {
        manageSubscription: "Upravljaj pretplatom",
        reactivate: "Reaktiviraj",
        currentPlan: "Trenutni plan",
        upgrade: "Nadogradi",
        downgrade: "Smanji paket",
        startingCheckout: "Pokrećem plaćanje...",
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
        security: "Bezbjednost",
        danger: "Opasna zona",
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
        emailNotifications: {
          title: "Email obavještenja",
          subtitle:
            "Primajte važne novosti o naplati, aktivnostima i promjenama proizvoda.",
        },
        note:
          "Preference valute i obavještenja se povezuju sa naplatom i upozorenjima aktivnosti. Neke opcije su trenutno informativne i možda još ne utiču na ponašanje aplikacije.",
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
    queueMicrotask(() => setLanguageState(next))
  }, [language])

  const setLanguage = useCallback((code: LanguageCode) => {
    setLanguageState(code)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, code)
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
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return ctx
}

