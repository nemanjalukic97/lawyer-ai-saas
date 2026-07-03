import type { Messages } from '@/lib/i18n/types'

export const srMessages: Messages = {
    pagination: {
      previous: "Prethodna",
      next: "Sljedeća",
      pageOf: "Stranica {page} od {total}",
    },
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
      billing: "Naplata",
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
      returnToHomepage: "Nazad na početnu",
      loginTitle: "Prijavite se na Legantis",
      loginDescription:
        "Unesite email i lozinku za pristup kontrolnoj tabli.",
      signupTitle: "Napravite Legantis nalog",
      signupDescription:
        "Registrujte se da počnete koristiti Legantis za vaš pravni tim.",
      emailLabel: "Email",
      passwordLabel: "Lozinka",
      loginButton: "Prijava",
      signupButton: "Registracija",
      dontHaveAccount: "Nemate nalog?",
      alreadyHaveAccount: "Već imate nalog?",
      fullNameLabel: "Ime i prezime",
      lawFirmLabel: "Naziv advokatske kancelarije",
      jurisdictionLabel: "Država / Jurisdikcija",
      jurisdictionPlaceholder: "Izaberite državu / jurisdikciju",
      emailInvalidTitle:
        "Unesite važeću email adresu (npr. ime@primer.com).",
      userNotFound: "Ne postoji nalog sa ovom email adresom.",
      signupSuccessTitle: "Skoro možete da koristite Legantis",
      signupSuccessBody1:
        "Vaš Legantis nalog je uspešno napravljen. Proverite inbox i potvrdite email adresu da aktivirate nalog.",
      signupSuccessBody2:
        "Kada potvrdite, možete se prijaviti i početi koristiti Legantis.",
      signupSuccessSpam:
        "Ako ne vidite email u Inboxu, provjerite Junk ili Spam folder.",
      emailConfirmedTitle: "Vaš nalog je potvrđen!",
      emailConfirmedBody:
        "Sada se možete prijaviti i početi koristiti Legantis.",
      goToDashboard: "Idi na Kontrolnu tablu",
      emailConfirmError:
        "Link je istekao ili je nevažeći. Pokušajte ponovo.",
      planSelected:
        "Izabrali ste {plan} paket. Možete ga promeniti kasnije sa kontrolne table.",
      emailTakenBeforeLink: "Nalog sa tom email adresom već postoji. Probajte",
      emailTakenLink: "prijavu",
      emailTakenAfterLink: "umesto toga.",
      invalidEmailError: "Unesite važeću email adresu.",
      weakPasswordError:
        "Lozinka mora imati najmanje 6 karaktera, jedno veliko slovo, jedan broj i jedan poseban znak (npr. ., $ ili #).",
      duplicateEmailSuggestion:
        "Nalog sa tom email adresom već postoji. Probajte prijavu umesto toga.",
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
          title: "Naplata",
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
        failedToDeleteContract: "Nije moguće obrisati ugovor. Pokušajte ponovo.",
        deleteConfirm: "Obrisati ovaj ugovor?",
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
      caseLaw: {
        title: "Sudska praksa",
        caseSingular: "presuda",
        casePlural: "presuda",
        caseNumberLabel: "Broj predmeta",
        decisionDateLabel: "Datum odluke:",
        lowConfidence:
          "Nisko poverenje: preuzete sudske odluke su slabo relevantne za ovaj upit.",
        reasoningLabel: "Obrazloženje:",
        relatedArticlesLabel: "Relevantni propisi:",
        showMore: "Prikaži više",
        showLess: "Prikaži manje",
        expandCourtPosition: "Prikaži pun tekst odluke",
        collapseCourtPosition: "Prikaži kraći odlomak",
        outdatedWarning:
          "{outdated} od {total} prikazanih presuda starije od 15 godina. Preporučujemo provjeru novije sudske prakse.",
        outdatedWarningLink: "Pretražite noviju praksu →",
        outcomes: {
          plaintiff_won: "Tužilac uspeo",
          defendant_won: "Tuženi uspeo",
          partially: "Delimično",
          procedural: "Procesno",
          remanded: "Vraćeno na ponovni postupak",
        },
      },
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
      loadMore: "Prikaži više",
      showingCount: "Prikazano {shown} rezultata",
      results: {
        title: "Rezultati",
        hint: "Pokrenite pretragu da biste videli najrelevantnije članke zakona.",
        empty:
          "Nema relevantnih članaka. Pokušajte druge ključne reči ili širu kategoriju.",
        noHighlyRelevant:
          "Nema visoko relevantnih rezultata — pokušajte drugačiju formulaciju ili proverite naziv zakona.",
        lowConfidenceDivider: "Rezultati niske pouzdanosti",
        excerptLabel: "Odlomak",
        countSuffix: "rezultata",
        confidenceLabel: "Pouzdanost",
        articleLabel: "Član",
        lawsTab: "Zakoni",
        caseLawTab: "Sudska praksa",
      },
      caseLaw: {
        title: "Sudska praksa",
        empty:
          "Nema relevantnih sudskih odluka. Pokušajte druge ključne reči ili širu kategoriju.",
        countSuffix: "odluka",
      },
      sessions: {
        title: "Nedavne pretrage",
        refresh: "Osveži",
        refreshing: "Osvežavanje…",
        loading: "Učitavanje…",
        empty: "Još nema sačuvanih istraživanja.",
        deleteAria: "Obriši pretragu",
        deleteConfirm: "Obrisati ovu sačuvanu pretragu?",
        upgradeHint:
          "Čuvanje istraživanja je dostupno na Professional i Firm planovima.",
      },
      upgradePrompt: "Nadogradite plan da biste sačuvali istraživanja.",
      errors: {
        queryRequired: "Unesite upit za pretragu.",
        searchFailed: "Pretraga nije uspela. Pokušajte ponovo.",
        historyFailed: "Nije moguće učitati nedavne pretrage.",
        saveFailed: "Nije moguće sačuvati istraživanje.",
        deleteFailed: "Nije moguće obrisati istraživanje.",
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
      positioning: {
        badge: "Više od AI asistenta",
        titleLine1: "Većina pravnih AI alata završava na jednom zadatku.",
        titleLine2: "Legantis vodi celu kancelariju.",
        description:
          "Većina pravnih AI alata završava se na jednoj izradi ili pretrazi. Legantis spaja AI izradu i istraživanje sa vođenjem predmeta, rokovima, evidentiranjem vremena i radom sa klijentima — na jednoj platformi prilagođenoj balkanskoj praksi.",
        pillarsAria: "Ključne funkcije kancelarije",
        pillars: {
          matters: "Predmeti",
          time: "Vreme",
          billing: "Naplata",
          schedule: "Raspored",
          mobile: "Mobilni",
        },
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
          "Jedna platforma za AI pisanje, istraživanje, analizu, upravljanje predmetima, evidenciju vremena i saradnju sa klijentima.",
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
          generate: {
            title: "AI generisanje dokumenata",
            description:
              "Generišite NDA, ugovore o radu, najmove i druge pravne dokumente sa klauzulama prilagođenim jurisdikciji. Pripremite prve nacrte u minutama i doradite ih uz ugrađenu AI pomoć.",
          },
          redline: {
            title: "Izmjena ugovora",
            description:
              "Učitajte ugovore i pregledajte AI predloge izmena klauzulu po klauzulu. Prihvatite ili odbijte promene i preuzmite ažurirani DOCX spreman za konačni pregled.",
          },
          research: {
            title: "Pravno istraživanje",
            description:
              "Pretražite propise i pravnu bazu kroz balkanske jurisdikcije uz ocene relevantnosti. Sačuvajte istraživanja i gradite argumente sa citiranim lokalnim izvorima.",
          },
          matters: {
            title: "Upravljanje predmetima",
            description:
              "Organizujte rad po predmetima i držite ugovore, rokove, vreme i naplatu na jednom mestu. Pratite status od prijema do zatvaranja bez menjanja alata.",
          },
          templates: {
            title: "Biblioteka šablona",
            description:
              "Pregledajte odabrane šablone prilagođene jurisdikciji za uobičajene pravne dokumente. Krenite od jake osnove i brže prilagodite klauzule svakom klijentu.",
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
              "Time tracking & billing": "Praćenje vremena i naplata",
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
      ctaTitle: "Profesionalni AI nivo za vašu advokatsku kancelariju",
      privacy: "Privatnost",
      terms: "Uslovi korišćenja",
      contact: "Kontakt",
      product: "Proizvod",
      legal: "Pravno",
      rights: "Sva prava zadržana",
      faqLink: "Često postavljena pitanja",
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
            "Kreirajte NDA ugovore i druga dokumenta uz pomoć Legantisa.",
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
            "Legantis analiza vjerovatnoće uspjeha na osnovu prakse i prava.",
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
          title: "Naplata",
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
        deleteFailed: "Nije moguće obrisati ovaj formular.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktivan",
        copyLink: "Kopiraj link",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi formular",
        deleteAria: "Obriši formular",
      },
      actions: {
        create: "Novi formular za prijem",
        deleteConfirm: "Obrisati ovaj formular? Sve prijave će takođe biti obrisane.",
      },
      common: {
        formFallback: "Formular za prijem",
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
        emptyHint: "Dodajte rok da biste pratili važne datume.",
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
      testReminder: {
        send: "Pošalji probni podsetnik",
        sending: "Šaljem…",
        summary: "Poslato: {sent}",
        summaryWithErrors: "Poslato: {sent}, Greške: {count}",
        failed: "Pokretanje probnih podsetnika nije uspelo",
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
      fields: {
        employeeName: "Ime zaposlenog",
        employerName: "Poslodavac",
        position: "Radna pozicija",
        startDate: "Datum početka",
        salary: "Plata",
        sellerName: "Prodavac",
        buyerName: "Kupac",
        itemDescription: "Opis predmeta",
        price: "Cijena",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna najamnina",
        duration: "Trajanje",
        landlordName: "Ime zakupodavca",
        tenantName: "Ime zakupca",
        principalName: "Ime lica koje daje punomoć (mandant)",
        agentName: "Ime punomoćnika (zastupnik)",
        scopeOfAuthority: "Opseg ovlaštenja",
        serviceProvider: "Pružalac usluga",
        clientName: "Ime klijenta",
        serviceDescription: "Opis usluge",
        paymentTerms: "Uslovi plaćanja",
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
            "Polja mogu ostati prazna ako nisu primjenjiva. Legantis popunjava standardne klauzule za izabranu jurisdikciju i vrstu dokumenta, ali uvijek morate pregledati rezultat prije upotrebe.",
        },
        fields: {
          party1: "Ime strane 1",
          party2: "Ime strane 2",
          party1FullName: "Puno ime strane 1",
          party1Address: "Adresa strane 1",
          party2FullName: "Puno ime strane 2",
          party2Address: "Adresa strane 2",
          date: "Datum",
          confidentialDescription: "Opis povjerljivih informacija",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Generišem dokument...",
          generate: "Generiši dokument",
          note: "Koristi Legantis kvotu vašeg plana. Rezultati su samo nacrti i ne predstavljaju pravni savjet.",
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
        emptyShort: "Generisani dokument će se pojaviti ovdje",
        caseLawSection: {
          title: "Relevantna sudska praksa",
          basedOn: "Na osnovu {count} presuda iz baze sudske prakse.",
        },
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
          hint: "Legantis prilagođava klauzule izabranoj vrsti ugovora.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Izaberite jurisdikciju koja uređuje ugovor.",
        },
        step3: {
          title: "Detalji",
          lead:
            "Korak {current} od {total}. Unesite ključne strane i komercijalne uslove. Legantis dodaje standardne i jurisdikcijske klauzule.",
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
        employerAddress: "Adresa poslodavca",
        employeeName: "Ime zaposlenog",
        employeeAddress: "Adresa zaposlenog",
        jobTitle: "Radno mjesto",
        startDate: "Datum početka",
        salary: "Plata",
        workLocation: "Mjesto rada",
        contractDuration: "Trajanje ugovora",
        clientName: "Ime klijenta",
        clientAddress: "Adresa klijenta",
        serviceProviderName: "Pružalac usluga",
        serviceProviderAddress: "Adresa pružaoca usluga",
        serviceDescription: "Opis usluge",
        paymentAmount: "Iznos plaćanja",
        paymentSchedule: "Dinamika plaćanja",
        endDate: "Datum završetka",
        sellerName: "Prodavac",
        sellerAddress: "Adresa prodavca",
        buyerName: "Kupac",
        buyerAddress: "Adresa kupca",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cijena",
        paymentTerms: "Uslovi plaćanja",
        deliveryDate: "Datum isporuke",
        landlordName: "Zakupodavac",
        landlordAddress: "Adresa zakupodavca",
        tenantName: "Zakupac",
        tenantAddress: "Adresa zakupca",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna zakupnina",
        depositAmount: "Depozit",
        leaseStartDate: "Početak zakupa",
        leaseDuration: "Trajanje zakupa",
        disclosingParty: "Strana koja otkriva",
        disclosingPartyAddress: "Adresa strane koja otkriva",
        receivingParty: "Strana koja prima",
        receivingPartyAddress: "Adresa strane koja prima",
        purpose: "Svrha",
        confidentialInfoDescription: "Opis povjerljivih informacija",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner1Address: "Adresa partnera 1",
        partner2Name: "Partner 2",
        partner2Address: "Adresa partnera 2",
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
          "Koristi Legantis kvotu vašeg plana. Rezultat je nacrt i ne predstavlja pravni savjet.",
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
            "Koristi Legantis kvotu vašeg plana. Ovo je Legantis analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
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
        emptyShort: "Pokrenite predviđanje da vidite analizu",
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
      similarCases: {
        sectionTitle: "Analiza Ishoda Sličnih Predmeta",
        cardTitle: "Statistika Sličnih Predmeta",
        plaintiffWinRate: "{pct}% slučajeva u korist tužioca",
        plaintiffWon: "Tužilac pobijedio",
        defendantWon: "Tuženi pobijedio",
        partially: "Djelimično",
        basedOn: "Na osnovu {count} sličnih presuda iz baze",
        signalGood: "Tužilac ima dobru šansu",
        signalUncertain: "Neizvjesno",
        signalRisky: "Rizično za tužioca",
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
            "Koristi Legantis kvotu vašeg plana. Ovo je Legantis analiza i ne zamjenjuje nezavisnu pravnu procjenu.",
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
        emptyShort: "Otpremite dokument i pokrenite analizu da vidite rezultate",
      },
      report: {
        sections: {
          riskyClauses: "RIZIČNE KLAUZULE",
          missingProvisions: "NEDOSTAJUĆE ODREDBE",
          complianceIssues: "PITANJA USKLAĐENOSTI",
          ambiguousLanguage: "NEJASAN JEZIK",
          executiveSummary: "SAŽETAK",
          riskScore: "RIZIK SKOR",
          recommendations: "PREPORUKE",
        },
        riskScoreNotDetected: "Rizik skor nije detektovan",
        riskScoreBadge: "Rizik skor: {score}/10",
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
        invoices: "Naplata",
      },
      deleteConfirm: {
        title: "Obrisati unos vremena?",
        body: "Da li ste sigurni da želite obrisati ovaj unos vremena? Ova radnja se ne može poništiti.",
        cancel: "Otkaži",
        confirm: "Obriši",
      },
      invoices: {
        title: "Naplata",
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
        title: "Evidentiraj novi unos vremena",
        client: {
          label: "Klijent",
          placeholder: "Počnite kucati za pretragu…",
        },
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
        subtitle: "Pregledajte unos, pratite nenaplaćene sate i pripremite naplatu.",
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
        loadFailed: "Neuspješno učitavanje unosa vremena. Pokušajte ponovo.",
        deleteFailed: "Neuspješno brisanje unosa vremena. Pokušajte ponovo.",
      },
      common: {
        emptyValue: "—",
        totalInline: "Ukupno:",
        matterFallback: "Predmet",
      },
      pagination: {
        previous: "Prethodna",
        next: "Sljedeća",
        pageOf: "Stranica {page} od {total}",
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
        summary: {
          clear: "Nisu pronađeni konflikti.",
          hasMatches: "Pronađeni su potencijalni konflikti.",
        },
        upgradeHint:
          "Istorija provera sukoba dostupna je na Professional i Firm planovima.",
        badges: {
          clear: "Čisto",
          conflict: "Sukob",
        },
        overrideLine: "Nastavljeno uprkos potencijalnom sukobu (override).",
        delete: "Obriši",
        deleteConfirm: "Ukloniti ovu provjeru sukoba iz historije?",
        deleteFailed: "Neuspješno brisanje provjere sukoba.",
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
          timeTrackingBilling: "Praćenje vremena i naplata",
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
}
