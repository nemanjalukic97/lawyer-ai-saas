import type { Messages } from '@/lib/i18n/types'

export const slMessages: Messages = {
    pagination: {
      previous: "Prejšnja",
      next: "Naslednja",
      pageOf: "Stran {page} od {total}",
    },
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
      returnToHomepage: "Nazaj na začetno stran",
      loginTitle: "Prijava v Legantis",
      loginDescription:
        "Vnesite e-poštni naslov in geslo za dostop do nadzorne plošče.",
      signupTitle: "Ustvarite Legantis račun",
      signupDescription:
        "Registrirajte se in začnite uporabljati Legantis za svojo pravno ekipo.",
      emailLabel: "E-pošta",
      passwordLabel: "Geslo",
      loginButton: "Prijava",
      signupButton: "Registracija",
      dontHaveAccount: "Nimate še računa?",
      alreadyHaveAccount: "Že imate račun?",
      fullNameLabel: "Polno ime",
      lawFirmLabel: "Ime odvetniške pisarne",
      jurisdictionLabel: "Država / Jurisdikcija",
      jurisdictionPlaceholder: "Izberite državo / jurisdikcijo",
      emailInvalidTitle:
        "Vnesite veljaven e-poštni naslov (npr. ime@primer.si).",
      userNotFound: "Za ta e-poštni naslov ni računa.",
      signupSuccessTitle: "Skoraj ste pripravljeni na Legantis",
      signupSuccessBody1:
        "Vaš Legantis račun je bil uspešno ustvarjen. Preverite nabiralnik in potrdite e-poštni naslov za aktivacijo računa.",
      signupSuccessBody2:
        "Po potrditvi se lahko prijavite in začnete uporabljati Legantis.",
      signupSuccessSpam:
        "Če e-pošte ne vidite v mapi Prejeto, preverite mapo Neželena pošta (Junk/Spam).",
      emailConfirmedTitle: "Vaš račun je potrjen!",
      emailConfirmedBody:
        "Zdaj se lahko prijavite in začnete uporabljati Legantis.",
      goToDashboard: "Pojdi na Nadzorno ploščo",
      emailConfirmError:
        "Povezava je potekla ali je neveljavna. Poskusite znova.",
      planSelected:
        "Izbrali ste paket {plan}. Kasneje ga lahko spremenite na nadzorni plošči.",
      emailTakenBeforeLink: "Račun s tem e-poštnim naslovom že obstaja. Poskusite",
      emailTakenLink: "prijavo",
      emailTakenAfterLink: "namesto tega.",
      invalidEmailError: "Vnesite veljaven e-poštni naslov.",
      weakPasswordError:
        "Geslo mora imeti vsaj 6 znakov, eno veliko črko, eno število in en poseben znak (npr. ., $ ali #).",
      duplicateEmailSuggestion:
        "Račun s tem e-poštnim naslovom že obstaja. Poskusite prijavo namesto tega.",
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
      caseLaw: {
        title: "Sodna praksa",
        caseSingular: "sodba",
        casePlural: "sodb",
        caseNumberLabel: "Št. zadeve",
        decisionDateLabel: "Datum odločbe:",
        lowConfidence:
          "Nizka zaupanja vrednost: pridobljene sodne odločbe so slabo relevantne za to poizvedbo.",
        reasoningLabel: "Obrazložitev:",
        relatedArticlesLabel: "Ustrezni predpisi:",
        showMore: "Prikaži več",
        showLess: "Prikaži manj",
        expandCourtPosition: "Prikaži celoten besedilo sodbe",
        collapseCourtPosition: "Prikaži krajši odlomek",
        outdatedWarning:
          "{outdated} od {total} prikazanih odločb je starejših od 15 let. Priporočamo preveritev novejše sodne prakse.",
        outdatedWarningLink: "Poiščite novejšo sodno prakso →",
        outcomes: {
          plaintiff_won: "Tožnik uspel",
          defendant_won: "Toženec uspel",
          partially: "Delno",
          procedural: "Procesno",
          remanded: "Vrnjeno v ponovno sojenje",
        },
      },
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
      loadMore: "Prikaži več",
      showingCount: "Prikazano {shown} rezultatov",
      results: {
        title: "Rezultati",
        hint: "Zaženite iskanje za najbolj relevantne člene zakona.",
        empty:
          "Ni najdenih relevantnih členov. Poskusite druge ključne besede ali širšo kategorijo.",
        countSuffix: "rezultatov",
        confidenceLabel: "Zanesljivost",
        articleLabel: "Člen",
        lawsTab: "Zakoni",
        caseLawTab: "Sodna praksa",
      },
      caseLaw: {
        title: "Sodna praksa",
        empty:
          "Ni najdenih relevantnih sodnih odločb. Poskusite druge ključne besede ali širšo kategorijo.",
        countSuffix: "odločb",
      },
      sessions: {
        title: "Nedavna iskanja",
        refresh: "Osveži",
        refreshing: "Osveževanje…",
        loading: "Nalaganje…",
        empty: "Ni še shranjenih raziskav.",
        deleteAria: "Izbriši iskanje",
        deleteConfirm: "Izbrisati to shranjeno iskanje?",
        upgradeHint:
          "Shranjevanje raziskav je na voljo v paketih Professional in Firm.",
      },
      upgradePrompt: "Nadgradite paket za shranjevanje raziskav.",
      errors: {
        queryRequired: "Vnesite iskalni niz.",
        searchFailed: "Iskanje ni uspelo. Poskusite znova.",
        historyFailed: "Ni mogoče naložiti nedavnih iskanj.",
        saveFailed: "Ni mogoče shraniti raziskave.",
        deleteFailed: "Ni mogoče izbrisati raziskave.",
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
      positioning: {
        badge: "Več kot AI asistent",
        titleLine1: "Večina pravnih AI orodij se ustavi pri eni nalogi.",
        titleLine2: "Legantis vodi celoten urad.",
        description:
          "Večina pravnih AI orodij se konča z enim osnutkom ali iskanjem. Legantis povezuje AI pripravo in raziskovanje z vodenjem zadev, roki, evidencem časa in delom s strankami — na eni platformi, zgrajeni za balkansko prakso.",
        pillarsAria: "Ključne funkcije urada",
        pillars: {
          matters: "Zadeve",
          time: "Čas",
          billing: "Obračunavanje",
          schedule: "Urnik",
          mobile: "Mobilno",
        },
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
          "Ena platforma za AI pisanje, raziskovanje, analizo, upravljanje zadevami, beleženje časa in sodelovanje s strankami.",
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
          generate: {
            title: "AI generiranje dokumentov",
            description:
              "Ustvarite NDA, pogodbe o zaposlitvi, najemne pogodbe in druge pravne dokumente s klavzulami, prilagojenimi jurisdikciji. Pripravite prve osnutke v minutah in jih dodelajte z vgrajeno AI pomočjo.",
          },
          redline: {
            title: "Urejanje pogodb",
            description:
              "Naložite pogodbe in preglejte AI predlagane spremembe klavzulo za klavzulo. Sprejmite ali zavrnite spremembe in prenesite posodobljen DOCX, pripravljen za končni pregled.",
          },
          research: {
            title: "Pravno raziskovanje",
            description:
              "Iščite predpise in pravno znanje po balkanskih jurisdikcijah z ocenami relevantnosti. Shranite raziskave in gradite argumente s citiranimi lokalnimi viri.",
          },
          matters: {
            title: "Upravljanje zadev",
            description:
              "Organizirajte delo po zadevah in imejte pogodbe, roke, čas in obračun na enem mestu. Spremljajte status od sprejema do zaključka brez menjave orodij.",
          },
          templates: {
            title: "Knjižnica predlog",
            description:
              "Brskajte po izbranih predlogah, prilagojenih jurisdikciji, za pogoste pravne dokumente. Začnite od trdne osnove in hitreje prilagodite klavzule vsaki stranki.",
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
      ctaTitle: "Profesionalna raven AI za vašo odvetniško pisarno",
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
            "Pripravite NDA in druge pogodbe s pomočjo Legantisa.",
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
            "Legantis analiza verjetnosti uspeha na podlagi prakse in prava.",
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
        deleteFailed: "Tega obrazca ni mogoče izbrisati.",
      },
      list: {
        submissions: "Prijave: {n}",
        active: "Aktiven",
        copyLink: "Kopiraj povezavo",
        copied: "Kopirano",
        viewSubmissions: "Prijave",
        edit: "Uredi obrazec",
        deleteAria: "Izbriši obrazec",
      },
      actions: {
        create: "Nov obrazec za sprejem",
        deleteConfirm: "Izbrisati ta obrazec? Vse prijave bodo prav tako izbrisane.",
      },
      common: {
        formFallback: "Obrazec za sprejem",
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
        emptyHint: "Dodajte rok, da boste spremljali pomembne datume.",
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
      testReminder: {
        send: "Pošlji testno opozorilo",
        sending: "Pošiljam…",
        summary: "Poslano: {sent}",
        summaryWithErrors: "Poslano: {sent}, Napake: {count}",
        failed: "Zagon testnih opozoril ni uspel",
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
      fields: {
        employeeName: "Ime zaposlenega",
        employerName: "Delodajalec",
        position: "Delovno mesto",
        startDate: "Datum začetka",
        salary: "Plača",
        sellerName: "Prodajalec",
        buyerName: "Kupec",
        itemDescription: "Opis predmeta",
        price: "Cena",
        propertyAddress: "Naslov nepremičnine",
        monthlyRent: "Mesečna najemnina",
        duration: "Trajanje",
        landlordName: "Najemodajalec",
        tenantName: "Najemnik",
        principalName: "Ime pooblaščevalca",
        agentName: "Ime pooblaščenca",
        scopeOfAuthority: "Obseg pooblastila",
        serviceProvider: "Izvajalec storitev",
        clientName: "Ime naročnika",
        serviceDescription: "Opis storitev",
        paymentTerms: "Plačilni pogoji",
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
            "Polja so lahko prazna, če niso pomembna. Legantis bo izpolnil standardne klavzule za izbrano jurisdikcijo in vrsto dokumenta, vendar morate rezultat vedno pregledati pred uporabo.",
        },
        fields: {
          party1: "Ime stranke 1",
          party2: "Ime stranke 2",
          party1FullName: "Polno ime stranke 1",
          party1Address: "Naslov stranke 1",
          party2FullName: "Polno ime stranke 2",
          party2Address: "Naslov stranke 2",
          date: "Datum",
          confidentialDescription: "Opis zaupnih informacij",
          ndaDuration: "Trajanje",
        },
        actions: {
          generating: "Ustvarjam dokument...",
          generate: "Ustvari dokument",
          note: "Uporablja kvoto Legantisa vašega paketa. Rezultati so le osnutki in ne predstavljajo pravnega nasveta.",
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
        emptyShort: "Ustvarjeni dokument se bo prikazal tukaj",
        caseLawSection: {
          title: "Relevantna sodna praksa",
          basedOn: "Na podlagi {count} sodnih odločb iz baze sodne prakse.",
        },
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
          hint: "Legantis bo klavzule prilagodil izbrani vrsti pogodbe.",
        },
        step2: {
          title: "Jurisdikcija",
          lead: "Korak {current} od {total}. Izberite jurisdikcijo, ki ureja to pogodbo.",
        },
        step3: {
          title: "Podrobnosti",
          lead:
            "Korak {current} od {total}. Vnesite ključne stranke in poslovne pogoje. Legantis bo dodal standardne in jurisdikcijske klavzule.",
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
        employerAddress: "Naslov delodajalca",
        employeeName: "Ime zaposlenega",
        employeeAddress: "Naslov zaposlenega",
        jobTitle: "Delovno mesto",
        startDate: "Datum začetka",
        salary: "Plača",
        workLocation: "Kraj dela",
        contractDuration: "Trajanje pogodbe",
        clientName: "Ime naročnika",
        clientAddress: "Naslov naročnika",
        serviceProviderName: "Izvajalec storitev",
        serviceProviderAddress: "Naslov izvajalca storitev",
        serviceDescription: "Opis storitev",
        paymentAmount: "Znesek plačila",
        paymentSchedule: "Način plačila",
        endDate: "Datum zaključka",
        sellerName: "Prodajalec",
        sellerAddress: "Naslov prodajalca",
        buyerName: "Kupec",
        buyerAddress: "Naslov kupca",
        itemDescription: "Opis predmeta",
        purchasePrice: "Cena",
        paymentTerms: "Plačilni pogoji",
        deliveryDate: "Datum dobave",
        landlordName: "Najemodajalec",
        landlordAddress: "Naslov najemodajalca",
        tenantName: "Najemnik",
        tenantAddress: "Naslov najemnika",
        propertyAddress: "Naslov nepremičnine",
        monthlyRent: "Mesečna najemnina",
        depositAmount: "Varščina",
        leaseStartDate: "Začetek najema",
        leaseDuration: "Trajanje najema",
        disclosingParty: "Razkrivajoča stranka",
        disclosingPartyAddress: "Naslov razkrivajoče stranke",
        receivingParty: "Prejemna stranka",
        receivingPartyAddress: "Naslov prejemne stranke",
        purpose: "Namen",
        confidentialInfoDescription: "Opis zaupnih informacij",
        duration: "Trajanje",
        partner1Name: "Partner 1",
        partner1Address: "Naslov partnerja 1",
        partner2Name: "Partner 2",
        partner2Address: "Naslov partnerja 2",
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
          "Uporablja kvoto Legantisa vašega paketa. Rezultat je osnutek in ne predstavlja pravnega nasveta.",
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
            "Uporablja kvoto Legantisa vašega paketa. To je analiza Legantisa in ne nadomešča neodvisne pravne presoje.",
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
        emptyShort: "Zaženite napoved, da si ogledate analizo",
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
      similarCases: {
        sectionTitle: "Analiza izidov podobnih zadev",
        cardTitle: "Statistika podobnih zadev",
        plaintiffWinRate: "{pct}% primerov v korist tožnika",
        plaintiffWon: "Tožnik uspel",
        defendantWon: "Toženec uspel",
        partially: "Delno",
        basedOn: "Na podlagi {count} podobnih sodnih odločb iz baze",
        signalGood: "Tožnik ima dobre možnosti",
        signalUncertain: "Nejasno",
        signalRisky: "Tvegano za tožnika",
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
            "Uporablja kvoto Legantisa vašega paketa. To je analiza Legantisa in ne nadomešča neodvisne pravne presoje.",
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
        emptyShort: "Naložite dokument in zaženite analizo za rezultate",
      },
      report: {
        sections: {
          riskyClauses: "TVEGANE KLOZULE",
          missingProvisions: "MANJKAJOČE DOLOČBE",
          complianceIssues: "VPRAŠANJA SKLADNOSTI",
          ambiguousLanguage: "DVOPISMIEN JEZIK",
          executiveSummary: "POVZETEK",
          riskScore: "OCENA TVEGANJA",
          recommendations: "PRIPOROČILA",
        },
        riskScoreNotDetected: "Ocena tveganja ni zaznana",
        riskScoreBadge: "Ocena tveganja: {score}/10",
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
      deleteConfirm: {
        title: "Izbrišem časovni vnos?",
        body: "Ali ste prepričani, da želite izbrisati ta časovni vnos? Tega dejanja ni mogoče razveljaviti.",
        cancel: "Prekliči",
        confirm: "Izbriši",
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
        title: "Zabeleži nov vnos časa",
        client: {
          label: "Stranka",
          placeholder: "Začni tipkati za iskanje…",
        },
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
          "Preglejte zabeležen čas, spremljajte neobračunane ure in se pripravite na zaračunavanje.",
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
        loadFailed: "Nalaganje časovnih vnosov ni uspelo. Poskusite znova.",
        deleteFailed: "Brisanje časovnega vnosa ni uspelo. Poskusite znova.",
      },
      common: {
        emptyValue: "—",
        totalInline: "Skupaj:",
        matterFallback: "Zadeva",
      },
      pagination: {
        previous: "Prejšnja",
        next: "Naslednja",
        pageOf: "Stran {page} od {total}",
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
        summary: {
          clear: "Konfliktov ni bilo.",
          hasMatches: "Najdeni so potencialni konflikti.",
        },
        upgradeHint:
          "Zgodovina preverjanj konfliktov je na voljo v paketih Professional in Firm.",
        badges: {
          clear: "Čisto",
          conflict: "Konflikt",
        },
        overrideLine: "Nadaljevanje kljub možnemu konfliktu (override).",
        delete: "Izbriši",
        deleteConfirm: "Odstraniti to preverjanje konflikta iz zgodovine?",
        deleteFailed: "Brisanje preverjanja konflikta ni uspelo.",
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
}
