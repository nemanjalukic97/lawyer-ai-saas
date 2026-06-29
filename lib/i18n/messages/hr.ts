import type { Messages } from '@/lib/i18n/types'

export const hrMessages: Messages = {
    pagination: {
      previous: "Prethodna",
      next: "Sljedeća",
      pageOf: "Stranica {page} od {total}",
    },
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
      returnToHomepage: "Povratak na početnu",
      loginTitle: "Prijavite se na Legantis",
      loginDescription:
        "Unesite e-poštu i lozinku za pristup nadzornoj ploči.",
      signupTitle: "Stvorite Legantis račun",
      signupDescription:
        "Registrirajte se kako biste počeli koristiti Legantis za svoj pravni tim.",
      emailLabel: "E-pošta",
      passwordLabel: "Lozinka",
      loginButton: "Prijava",
      signupButton: "Registracija",
      dontHaveAccount: "Nemate račun?",
      alreadyHaveAccount: "Već imate račun?",
      fullNameLabel: "Puno ime",
      lawFirmLabel: "Naziv odvjetničkog ureda",
      jurisdictionLabel: "Država / Jurisdikcija",
      jurisdictionPlaceholder: "Odaberite državu / jurisdikciju",
      emailInvalidTitle:
        "Unesite važeću adresu e-pošte (npr. ime@primjer.com).",
      userNotFound: "Nije pronađen račun s ovom adresom e-pošte.",
      signupSuccessTitle: "Skoro ste spremni za Legantis",
      signupSuccessBody1:
        "Vaš Legantis račun je uspješno stvoren. Provjerite pristiglu e-poštu i potvrdite adresu e-pošte kako biste aktivirali račun.",
      signupSuccessBody2:
        "Nakon potvrde možete se prijaviti i početi koristiti Legantis.",
      signupSuccessSpam:
        "Ako ne vidite e-mail u pristigloj pošti, provjerite mapu Junk ili Spam.",
      emailConfirmedTitle: "Vaš račun je potvrđen!",
      emailConfirmedBody:
        "Sada se možete prijaviti i početi koristiti Legantis.",
      goToDashboard: "Idi na Kontrolnu ploču",
      emailConfirmError:
        "Veza je istekla ili je nevažeća. Pokušajte ponovo.",
      planSelected:
        "Odabrali ste {plan} plan. Kasnije ga možete promijeniti s nadzorne ploče.",
      emailTakenBeforeLink: "Račun s tom adresom e-pošte već postoji. Pokušajte",
      emailTakenLink: "prijavu",
      emailTakenAfterLink: "umjesto toga.",
      invalidEmailError: "Unesite važeću adresu e-pošte.",
      weakPasswordError:
        "Lozinka mora imati najmanje 6 znakova, jedno veliko slovo, jedan broj i jedan posebni znak (npr. ., $ ili #).",
      duplicateEmailSuggestion:
        "Račun s tom adresom e-pošte već postoji. Pokušajte prijavu umjesto toga.",
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
        failedToDeleteContract: "Nije moguće izbrisati ugovor. Pokušajte ponovo.",
        deleteConfirm: "Izbrisati ovaj ugovor?",
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
      caseLaw: {
        title: "Sudska praksa",
        caseSingular: "presuda",
        casePlural: "presuda",
        caseNumberLabel: "Broj predmeta",
        decisionDateLabel: "Datum odluke:",
        lowConfidence:
          "Nisko povjerenje: preuzete sudske odluke slabo odgovaraju ovom upitu.",
        reasoningLabel: "Obrazloženje:",
        relatedArticlesLabel: "Relevantni propisi:",
        showMore: "Prikaži više",
        showLess: "Prikaži manje",
        expandCourtPosition: "Prikaži pun tekst presude",
        collapseCourtPosition: "Prikaži kraći izvadak",
        outdatedWarning:
          "{outdated} od {total} prikazanih presuda starije je od 15 godina. Preporučujemo provjeru novije sudske prakse.",
        outdatedWarningLink: "Pretražite noviju sudsku praksu →",
        outcomes: {
          plaintiff_won: "Tužitelj uspio",
          defendant_won: "Tuženik uspio",
          partially: "Djelomično",
          procedural: "Procesno",
          remanded: "Ukinuto i vraćeno",
        },
      },
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
      loadMore: "Prikaži više",
      showingCount: "Prikazano {shown} rezultata",
      results: {
        title: "Rezultati",
        hint: "Pokrenite pretragu da biste vidjeli najrelevantnije članke zakona.",
        empty:
          "Nema relevantnih članaka. Pokušajte druge ključne riječi ili širu kategoriju.",
        countSuffix: "rezultata",
        confidenceLabel: "Pouzdanost",
        articleLabel: "Članak",
        lawsTab: "Zakoni",
        caseLawTab: "Sudska praksa",
      },
      caseLaw: {
        title: "Sudska praksa",
        empty:
          "Nema relevantnih sudskih odluka. Pokušajte druge ključne riječi ili širu kategoriju.",
        countSuffix: "odluka",
      },
      sessions: {
        title: "Nedavne pretrage",
        refresh: "Osvježi",
        refreshing: "Osvježavanje…",
        loading: "Učitavanje…",
        empty: "Još nema spremljenih istraživanja.",
        deleteAria: "Obriši pretragu",
        deleteConfirm: "Obrisati ovu spremljenu pretragu?",
        upgradeHint:
          "Spremanje istraživanja dostupno je na Professional i Firm planovima.",
      },
      upgradePrompt: "Nadogradite plan da biste spremili istraživanja.",
      errors: {
        queryRequired: "Unesite upit za pretragu.",
        searchFailed: "Pretraga nije uspjela. Pokušajte ponovo.",
        historyFailed: "Nije moguće učitati nedavne pretrage.",
        saveFailed: "Nije moguće spremiti istraživanje.",
        deleteFailed: "Nije moguće obrisati istraživanje.",
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
          "Jedna platforma za AI pisanje, istraživanje, analizu, upravljanje predmetima, evidenciju vremena i suradnju s klijentima.",
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
          generate: {
            title: "AI generiranje dokumenata",
            description:
              "Generirajte NDA, ugovore o radu, najmove i druge pravne dokumente s klauzulama prilagođenim jurisdikciji. Pripremite prve nacrte u minutama i doradite ih uz ugrađenu AI pomoć.",
          },
          redline: {
            title: "Izmjena ugovora",
            description:
              "Učitajte ugovore i pregledajte AI prijedloge izmjena klauzulu po klauzulu. Prihvatite ili odbijte promjene i preuzmite ažurirani DOCX spreman za konačni pregled.",
          },
          research: {
            title: "Pravno istraživanje",
            description:
              "Pretražite propise i pravnu bazu kroz balkanske jurisdikcije uz ocjene relevantnosti. Spremite istraživanja i gradite argumente s citiranim lokalnim izvorima.",
          },
          matters: {
            title: "Upravljanje predmetima",
            description:
              "Organizirajte rad po predmetima i držite ugovore, rokove, vrijeme i naplatu na jednom mjestu. Pratite status od prijema do zatvaranja bez mijenjanja alata.",
          },
          templates: {
            title: "Biblioteka predložaka",
            description:
              "Pregledajte odabrane predloške prilagođene jurisdikciji za uobičajene pravne dokumente. Krenite od jake osnove i brže prilagodite klauzule svakom klijentu.",
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
      ctaTitle: "Profesionalna AI razina za vaš odvjetnički ured",
      privacy: "Privatnost",
      terms: "Uvjeti korištenja",
      contact: "Kontakt",
      product: "Proizvod",
      legal: "Pravno",
      rights: "Sva prava pridržana",
      faqLink: "Često postavljena pitanja",
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
        delete: "Obriši",
        deleteConfirm: "Ukloniti ovu provjeru sukoba iz povijesti?",
        deleteFailed: "Neuspješno brisanje provjere sukoba.",
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
            "Kreirajte NDA i druge ugovore uz pomoć Legantisa.",
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
            "Legantis analiza vjerojatnosti uspjeha na temelju prakse i prava.",
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
          title: "Naplata",
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
        deleteFailed: "Nije moguće izbrisati ovaj obrazac.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktivan",
        copyLink: "Kopiraj poveznicu",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi obrazac",
        deleteAria: "Izbriši obrazac",
      },
      actions: {
        create: "Novi obrazac za prijem",
        deleteConfirm: "Izbrisati ovaj obrazac? Sve prijave će također biti izbrisane.",
      },
      common: {
        formFallback: "Obrazac za prijem",
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
      fields: {
        employeeName: "Ime zaposlenika",
        employerName: "Poslodavac",
        position: "Radno mjesto",
        startDate: "Datum početka",
        salary: "Plaća",
        sellerName: "Prodavatelj",
        buyerName: "Kupac",
        itemDescription: "Opis predmeta",
        price: "Cijena",
        propertyAddress: "Adresa nekretnine",
        monthlyRent: "Mjesečna najamnina",
        duration: "Trajanje",
        landlordName: "Najmodavac",
        tenantName: "Najmoprimac",
        principalName: "Ime davaoca punomoći (mandant)",
        agentName: "Ime ovlaštenika (punomoćnik)",
        scopeOfAuthority: "Opseg ovlasti",
        serviceProvider: "Pružatelj usluga",
        clientName: "Ime klijenta",
        serviceDescription: "Opis usluge",
        paymentTerms: "Uvjeti plaćanja",
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
            "Polja mogu ostati prazna ako nisu primjenjiva. Legantis popunjava standardne klauzule za odabranu jurisdikciju i vrstu dokumenta, ali uvijek morate pregledati rezultat prije upotrebe.",
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
          generating: "Generiram dokument...",
          generate: "Generiraj dokument",
          note: "Koristi Legantis kvotu vašeg plana. Rezultati su samo nacrti i ne predstavljaju pravni savjet.",
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
        caseLawSection: {
          title: "Relevantna sudska praksa",
          basedOn: "Na temelju {count} presuda iz baze sudske prakse.",
        },
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
          hint: "Legantis prilagođava klauzule odabranoj vrsti ugovora.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Odaberite jurisdikciju koja će uređivati ovaj ugovor.",
        },
        step3: {
          title: "Detalji",
          lead:
            "Korak {current} od {total}. Unesite ključne strane i komercijalne uvjete. Legantis dodaje standardne i jurisdikcijske klauzule.",
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
          "Koristi Legantis kvotu vašeg plana. Rezultat je nacrt i ne predstavlja pravni savjet.",
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
            "Koristi Legantis kvotu vašeg plana. Ovo je Legantis analiza i ne zamjenjuje neovisnu pravnu procjenu.",
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
      similarCases: {
        sectionTitle: "Analiza ishoda sličnih predmeta",
        cardTitle: "Statistika sličnih predmeta",
        plaintiffWinRate: "{pct}% slučajeva u korist tužitelja",
        plaintiffWon: "Tužitelj pobijedio",
        defendantWon: "Tuženi pobijedio",
        partially: "Djelomično",
        basedOn: "Na temelju {count} sličnih presuda iz baze",
        signalGood: "Tužitelj ima dobru šansu",
        signalUncertain: "Neizvjesno",
        signalRisky: "Rizično za tužitelja",
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
            "Koristi Legantis kvotu vašeg plana. Ovo je Legantis analiza i ne zamjenjuje neovisnu pravnu procjenu.",
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
      report: {
        sections: {
          riskyClauses: "RIZIČNE KLAUZULE",
          missingProvisions: "NEDOSTAJUĆE ODREDBE",
          complianceIssues: "PROBLEMI USKLAĐENOSTI",
          ambiguousLanguage: "DVOSMISLEN JEZIK",
          executiveSummary: "SAŽETAK",
          riskScore: "OCJENA RIZIKA",
          recommendations: "PREPORUKE",
        },
        riskScoreNotDetected: "Ocjena rizika nije detektirana",
        riskScoreBadge: "Ocjena rizika: {score}/10",
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
      deleteConfirm: {
        title: "Obrisati unos vremena?",
        body: "Jeste li sigurni da želite obrisati ovaj unos vremena? Ovu radnju nije moguće poništiti.",
        cancel: "Odustani",
        confirm: "Obriši",
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
        title: "Evidentiraj novi unos vremena",
        client: {
          label: "Klijent",
          placeholder: "Počnite tipkati za pretraživanje…",
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
        loadFailed: "Neuspjelo učitavanje unosa vremena. Pokušajte ponovno.",
        deleteFailed: "Neuspjelo brisanje unosa vremena. Pokušajte ponovno.",
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
}
