/**
 * Partnership / ortaštvo / ortakluk coverage (general & limited partnerships + civil-law partnership).
 *
 * Duplicates OMITTED (same jurisdiction + law_name_local + article_num already in ingest via legal-articles-commercial.ts):
 * - serbia | Zakon o privrednim društvima | 93 (definition of general partnership)
 * - montenegro | Zakon o privrednim društvima Crne Gore | 93 (limited partnership formation)
 * - slovenia | Zakon o gospodarskih družbah | 76 (definition of general partnership)
 * - slovenia | Zakon o gospodarskih družbah | 139 (limited partners / non-compete; commercial block)
 * - croatia | Zakon o trgovačkim društvima | 68 (JTD definition; commercial block)
 * - croatia | Zakon o trgovačkim društvima | 108 (exclusion of member; commercial block)
 *
 * Numbering notes (official texts differ from some outline lists):
 * - Serbia: Companies Act uses čl. 94+ for ortačko društvo; čl. 93 is omitted as duplicate. RS ZOO čl. 736–746 are not the civil ortakluk chapter in the current consolidated text — Montenegro ZOO čl. 716+ / Croatia ZOO čl. 637+ are used instead.
 * - Croatia ZTD: komanditno društvo is čl. 131+ (not 110–116). Slovenia ZGD-1: zakonodaja.com body text under čl. 111 URL is inconsistent; čl. 107(3)–(4) and čl. 112 are used for exclusion / settlement.
 */

type P = {
  jurisdiction: string
  law_name: string
  law_name_local: string
  law_category: "commercial"
  article_num: string
  text_local: string
  text: string
  source_url: string
  effective_date?: string
}

const ZPD_RS_EFFECTIVE = "2011-05-21"

/** Serbian (RS) ZPD — Paragraf.rs consolidated; same substantive text reused for harmonized entity laws in BiH/ME where applicable. */
const ZPD_SERBIA: Omit<P, "jurisdiction" | "law_name_local" | "source_url">[] = [
  {
    law_name: "Companies Act",
    article_num: "94",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Ugovor o osnivanju ortačkog društva sadrži naročito:\n\n1) podatke o ortacima iz člana 9a, kao i podatak o prebivalištu ortaka;\n\n2) poslovno ime i sedište društva;\n\n3) pretežnu delatnost društva;\n\n4) označenje vrste i vrednosti uloga, kao i podatke o udelu svakog ortaka.\n\nUgovor o osnivanju može da sadrži i druge elemente od značaja za društvo i ortake.\n\nIzmene i dopune ugovora o osnivanju društva vrše se jednoglasnom odlukom svih ortaka društva, ako ugovorom o osnivanju nije drugačije određeno.",
    text: "The incorporation agreement of a general partnership must contain in particular:\n\n1) data on the partners under Article 9a, as well as the partner’s place of residence;\n\n2) the business name and registered office of the company;\n\n3) the company’s predominant activity;\n\n4) designation of the type and value of contributions, and data on each partner’s share.\n\nThe incorporation agreement may also contain other elements material to the company and the partners.\n\nAmendments to the incorporation agreement are adopted by unanimous decision of all partners, unless the incorporation agreement provides otherwise.",
  },
  {
    law_name: "Companies Act",
    article_num: "101",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Svaki ortak ima ovlašćenje za obavljanje radnji u redovnom poslovanju društva (poslovođenje).\n\nRadnje koje ne spadaju u redovno poslovanje društva nisu obuhvaćene ovlašćenjem iz stava 1. ovog člana i mogu se obavljati samo uz saglasnost svih ortaka, ako ugovorom o osnivanju nije drugačije određeno.\n\nIzuzetno od stava 1. ovog člana, ako je ugovorom o osnivanju ili ugovorom ortaka određeno da su jedan ili više ortaka ovlašćeni za poslovođenje, ostali ortaci nemaju ovlašćenje za poslovođenje.",
    text: "Each partner is authorised to perform acts in the ordinary course of the company’s business (management of affairs).\n\nActs that do not fall within the ordinary course of the company’s business are not covered by the authorisation under paragraph 1 of this Article and may be performed only with the consent of all partners, unless the incorporation agreement provides otherwise.\n\nNotwithstanding paragraph 1 of this Article, if the incorporation agreement or a partnership agreement provides that one or more partners are authorised to manage affairs, the other partners are not authorised to manage affairs.",
  },
  {
    law_name: "Companies Act",
    article_num: "107",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Dobit društva se raspodeljuje između ortaka na jednake delove, ako ugovorom o osnivanju nije drugačije određeno.",
    text: "The company’s profit is distributed among the partners in equal shares, unless the incorporation agreement provides otherwise.",
  },
  {
    law_name: "Companies Act",
    article_num: "116",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Lice koje posle osnivanja društva stekne svojstvo ortaka odgovara za obaveze društva kao i postojeći ortaci, uključujući i obaveze nastale pre njegovog pristupanja društvu.\n\nOdredbe ugovora o osnivanju koje su u suprotnosti sa stavom 1. ovog člana nemaju pravno dejstvo prema trećim licima.",
    text: "A person who, after incorporation, acquires the status of partner is liable for the company’s obligations in the same way as existing partners, including obligations that arose before joining the company.\n\nProvisions of the incorporation agreement that are contrary to paragraph 1 of this Article have no legal effect towards third parties.",
  },
  {
    law_name: "Companies Act",
    article_num: "117",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Ortačko društvo prestaje brisanjem iz registra privrednih subjekata u slučaju:\n\n1) okončanja likvidacije društva;\n\n2) zaključenja stečaja društva;\n\n3) statusne promene.\n\nSvojstvo ortaka u ortačkom društvu prestaje u slučaju:\n\n1) smrti ortaka;\n\n2) brisanja ortaka koji je pravno lice iz nadležnog registra;\n\n3) istupanja ortaka;\n\n4) isključenja ortaka;\n\n5) u drugim slučajevima određenim ugovorom o osnivanju.",
    text: "A general partnership ceases by deletion from the register of business entities in the case of:\n\n1) completion of the company’s liquidation;\n\n2) conclusion of bankruptcy over the company;\n\n3) a transformation.\n\nA partner’s status in a general partnership ceases in the case of:\n\n1) death of the partner;\n\n2) deletion of a partner that is a legal entity from the competent register;\n\n3) withdrawal of the partner;\n\n4) exclusion of the partner;\n\n5) in other cases determined by the incorporation agreement.",
  },
  {
    law_name: "Companies Act",
    article_num: "118",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Po tužbi nekog od ortaka nadležni sud donosi presudu kojom određuje prestanak društva kada za to postoji opravdan razlog.\n\nOpravdan razlog u smislu stava 1. ovog člana postoji ako ortaci ne mogu da vode poslove društva zbog međusobnog neslaganja ili ako iz drugih razloga nije moguće da društvo nastavi poslovanje u skladu sa ovim zakonom, odnosno ugovorom o osnivanju.\n\nNištav je sporazum kojim se isključuje ili ograničava pravo ortaka na podnošenje tužbe iz stava 1. ovog člana.\n\nTužba iz stava 1. ovog člana podnosi se protiv društva.",
    text: "On a claim by any partner, the competent court issues a judgment ordering winding-up of the company when there is justified cause.\n\nJustified cause within the meaning of paragraph 1 of this Article exists if the partners cannot run the company’s affairs because of mutual disagreement or if, for other reasons, the company cannot continue to operate in accordance with this Law or the incorporation agreement.\n\nAn agreement excluding or limiting a partner’s right to bring an action under paragraph 1 of this Article is void.\n\nThe action under paragraph 1 of this Article is brought against the company.",
  },
  {
    law_name: "Companies Act",
    article_num: "120",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Na isključenje ortaka shodno se primenjuju odredbe ovog zakona o isključenju člana društva s ograničenom odgovornošću.",
    text: "Exclusion of a partner applies mutatis mutandis to the provisions of this Law on exclusion of a member of a limited liability company.",
  },
  {
    law_name: "Companies Act",
    article_num: "121",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Ortak može da istupi iz društva podnošenjem pisanog obaveštenja o istupanju ostalim ortacima.\n\nPisano obaveštenje iz stava 1. ovog člana podnosi se najmanje šest meseci pre isteka poslovne godine, ako ugovorom o osnivanju nije drugačije određeno.\n\nOrtak koji podnese pisano obaveštenje o istupanju u skladu sa stavom 2. ovog člana istupa iz društva istekom poslovne godine u kojoj je obaveštenje dato (dan istupanja).\n\nPravo ortaka na istupanje ne može se ograničiti niti isključiti.",
    text: "A partner may withdraw from the company by submitting written notice of withdrawal to the other partners.\n\nWritten notice under paragraph 1 of this Article must be given at least six months before the end of the business year, unless the incorporation agreement provides otherwise.\n\nA partner who gives written notice of withdrawal in accordance with paragraph 2 of this Article withdraws at the end of the business year in which notice was given (withdrawal date).\n\nA partner’s right to withdraw may not be limited or excluded.",
  },
  {
    law_name: "Companies Act",
    article_num: "131",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Komlementari vode poslove društva i zastupaju ga.\n\nKomanditori ne mogu voditi poslove društva niti ga zastupati.\n\nIzuzetno od st. 1. i 2. ovog člana, komanditor se može usprotiviti samo preduzimanju radnji ili zaključenju poslova od strane komplementara koji su van redovnog poslovanja društva, u kom slučaju komplementar ne može preduzeti tu radnju odnosno zaključiti taj posao.\n\nKomanditoru se može dati prokura odlukom svih komplementara.",
    text: "General partners manage the company’s affairs and represent it.\n\nLimited partners may not manage the company’s affairs or represent it.\n\nNotwithstanding paragraphs 1 and 2 of this Article, a limited partner may object only to acts or transactions by general partners that are outside the ordinary course of the company’s business, in which case the general partner may not take that act or conclude that transaction.\n\nA procuration may be granted to a limited partner by decision of all general partners.",
  },
  {
    law_name: "Companies Act",
    article_num: "133",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Udeo u dobiti isplaćuje se komanditoru srazmerno visini njegovog uloga, osim ako je ugovorom o osnivanju drugačije određeno, a u roku koji je određen ugovorom o osnivanju, odnosno odlukom komplementara ako taj rok nije određen ugovorom o osnivanju.\n\nAko u skladu sa stavom 1. ovog člana o roku za isplatu dobiti odlučuju komplementari, taj rok ne može biti duži od 90 dana računajući od dana usvajanja godišnjih finansijskih izveštaja društva.",
    text: "The profit share is paid to the limited partner in proportion to the amount of their contribution, unless the incorporation agreement provides otherwise, within the period determined by the incorporation agreement or, if that period is not set in the incorporation agreement, by decision of the general partners.\n\nIf, under paragraph 1 of this Article, the general partners decide on the period for profit distribution, that period may not exceed 90 days from adoption of the company’s annual financial statements.",
  },
  {
    law_name: "Companies Act",
    article_num: "134",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Komanditor ne odgovara za obaveze društva ako je u celini uplatio ulog koji je preuzeo ugovorom o osnivanju.\n\nAko komanditor ne uplati u celini ulog na koji se obavezao ugovorom o osnivanju, on odgovara solidarno sa komplementarima poveriocima društva do visine neuplaćenog odnosno neunetog uloga u društvo.\n\nU pogledu visine uplaćenog odnosno unetog uloga u društvo u smislu stava 1. ovog člana merodavna je vrednost tog uloga koja je registrovana u skladu sa zakonom o registraciji.\n\nOdredba ugovora između komplementara, odnosno komplementara i komanditora, kojom se komanditor oslobađa u celosti ili delimično obaveze uplate svoga uloga ili mu se ta obaveza odlaže, bez dejstva je prema poveriocima društva.",
    text: "A limited partner is not liable for the company’s obligations if they have paid in full the contribution undertaken in the incorporation agreement.\n\nIf a limited partner has not paid in full the contribution undertaken in the incorporation agreement, they are jointly and severally liable with the general partners to the company’s creditors up to the amount of the unpaid or unpaid-in contribution.\n\nFor the amount of the contribution paid or made into the company within the meaning of paragraph 1 of this Article, the relevant value is that registered in accordance with the registration law.\n\nA contract between general partners, or between general partners and a limited partner, releasing the limited partner wholly or partly from the obligation to pay their contribution or deferring that obligation has no effect towards the company’s creditors.",
  },
  {
    law_name: "Companies Act",
    article_num: "137",
    effective_date: ZPD_RS_EFFECTIVE,
    source_url: "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html",
    text_local:
      "Komanditno društvo ne prestaje u slučaju smrti komanditora, odnosno prestanka komanditora koji je pravno lice.\n\nU slučaju iz stava 1. ovog člana, naslednici komanditora, odnosno pravni sledbenici ako je u pitanju pravno lice, stupaju na njegovo mesto.\n\nAko iz komanditnog društva istupe svi komplementari, a najmanje jedan novi komplementar nije primljen u roku od tri meseca od dana istupanja poslednjeg komplementara, komanditori mogu u tom roku doneti jednoglasno odluku o promeni pravne forme, u skladu sa ovim zakonom.\n\nAko iz komanditnog društva istupe svi komanditori, a najmanje jedan novi komanditor nije primljen u roku od tri meseca od dana istupanja poslednjeg komanditora, komplementari mogu u tom roku doneti jednoglasno odluku o promeni pravne forme, u skladu sa ovim zakonom.\n\nIzvršene promene iz st. 3, 4. i 6. ovog člana registruju se u skladu sa zakonom o registraciji.",
    text: "A limited partnership does not cease upon the death of a limited partner or upon cessation of a limited partner that is a legal entity.\n\nIn the case referred to in paragraph 1 of this Article, the limited partner’s successors, or legal successors if a legal entity is concerned, step into their place.\n\nIf all general partners withdraw and at least one new general partner is not admitted within three months of the last general partner’s withdrawal, the limited partners may within that period adopt a unanimous decision to change legal form in accordance with this Law.\n\nIf all limited partners withdraw and at least one new limited partner is not admitted within three months of the last limited partner’s withdrawal, the general partners may within that period adopt a unanimous decision to change legal form in accordance with this Law.\n\nChanges made under paragraphs 3, 4 and 6 of this Article are registered in accordance with the registration law.",
  },
]

function zpdBlock(
  jurisdiction: string,
  law_name_local: string,
  source_url: string,
  law_name: string,
  subset?: string[],
): P[] {
  const pick = subset
    ? ZPD_SERBIA.filter((a) => subset.includes(a.article_num))
    : ZPD_SERBIA
  return pick.map((a) => ({
    jurisdiction,
    law_name,
    law_name_local,
    law_category: "commercial",
    article_num: a.article_num,
    text_local: a.text_local,
    text: a.text,
    source_url,
    effective_date: a.effective_date,
  }))
}

const HR_ZTD: P[] = [
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "70",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Prijava za upis u sudski registar mora sadržavati tvrtku, sjedište i poslovnu adresu, ime i prezime, osobni identifikacijski broj i prebivalište, odnosno tvrtku i sjedište svakoga člana društva, imena i prezimena osoba ovlaštenih da zastupaju društvo i njihove ovlasti te djelatnosti iz članka 34. stavka 3. ovoga Zakona.\n\n(2) Prijavi iz stavka 1. ovoga članka prilaže se ugovor o osnivanju društva (društveni ugovor) i odluka o utvrđivanju predmeta poslovanja.\n\n(3) U sudski registar upisuju se pored podataka iz stavka 1. ovoga članka i promjene društvenog ugovora, tvrtke i sjedišta, djelatnosti iz članka 34. stavka 3. ovoga Zakona, stupanje novoga člana u društvo, prestanak članstva u društvu te promjene ovlasti za zastupanje društva.",
    text: "(1) The application for registration in the court register must contain the business name, registered office and business address, name and surname, personal identification number and residence, or name and registered office of each member, names of persons authorised to represent the company and their powers, and activities under Article 34(3) of this Act.\n\n(2) The application under paragraph 1 must be accompanied by the incorporation agreement (partnership agreement) and a decision determining the object of business.\n\n(3) Changes to the partnership agreement, name and seat, activities under Article 34(3), admission of a new member, cessation of membership and changes in representation powers are also registered.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "78",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Svaki član društva ima pravo i obvezu da vodi poslove društva.\n\n(2) Ako je društvenim ugovorom vođenje poslova prenijeto na jednoga ili na više određenih članova društva, ostali članovi društva su od toga isključeni.",
    text: "(1) Each member has the right and duty to manage the company’s affairs.\n\n(2) If management is transferred by partnership agreement to one or more designated members, the other members are excluded from management.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "87",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Jedna trećina dobiti tekuće godine dijeli se na članove društva tako da svakome od njih pripadne dio koji odgovara njegovome udjelu u kapitalu društva.\n\n(2) Pri izračunavanju udjela u dobiti koji članu pripada po odredbi iz stavka 1. ovoga članka, ulozi koje je član tijekom poslovne godine unio u društvo računaju se u srazmjeru s vremenom koje je proteklo od uplate.\n\n(3) Dio dobiti tekuće godine koji prelazi udjele u dobiti izračunate po odredbama stavka 1. i 2. ovoga članka, kao i gubitak u toku poslovne godine, dijele se na članove društva na jednake dijelove.",
    text: "(1) One third of the current year’s profit is distributed among members so that each receives a share corresponding to their share in the company’s capital.\n\n(2) When calculating the profit share under paragraph 1, contributions made during the business year are taken into account in proportion to the time elapsed since payment.\n\n(3) The portion of profit exceeding the shares calculated under paragraphs 1 and 2, and the loss during the business year, are divided equally among members unless the partnership agreement provides otherwise.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "94",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Za obveze društva svaki član odgovara vjerovnicima cijelom svojom imovinom i solidarno s ostalim članovima društva.\n\n(2) Sporazum članova društva glede njihove odgovornosti za obveze društva koji je suprotan odredbi iz stavka 1. ovoga članka nema učinka prema trećima.",
    text: "(1) For the company’s obligations each member is liable to creditors with their entire property, jointly and severally with the other members.\n\n(2) An agreement between members on their liability for the company’s obligations that is contrary to paragraph 1 has no effect towards third parties.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "96",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Tko pristupi već postojećem društvu odgovara kao i ostali članovi prema odredbama članka 94. i 95. ovoga Zakona za obveze društva nastale prije njegovoga pristupanja društvu.\n\n(2) Drugačiji sporazum članova društva glede njihove odgovornosti nema učinka prema trećima.",
    text: "(1) A person who joins an existing company is liable like other members under Articles 94 and 95 of this Act for obligations that arose before joining.\n\n(2) A different agreement between members on liability has no effect towards third parties.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "97",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "Razlozi za prestanak društva jesu:\n\n1. istek vremena za koje je osnovano,\n\n2. odluka članova društva,\n\n3. pravomoćna odluka suda kojom se utvrđuje da je upis društva u sudski registar bio nezakonit,\n\n4. otvaranje stečajnog postupka,\n\n5. smrt, odnosno prestanak nekoga od članova društva, ako što drugo ne proizlazi iz društvenog ugovora,\n\n6. otvaranje stečaja nad nekim od članova društva,\n\n7. otkaz nekoga od članova društva ili njegovoga vjerovnika,\n\n8. pravomoćna odluka suda.",
    text: "Grounds for winding-up of the company are:\n\n1. expiry of the period for which it was established;\n\n2. decision of the members;\n\n3. final court decision establishing that registration was unlawful;\n\n4. opening of bankruptcy;\n\n5. death or cessation of a member, unless otherwise follows from the partnership agreement;\n\n6. bankruptcy of a member;\n\n7. termination notice by a member or their creditor;\n\n8. final court decision.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "98",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Ako je društvo osnovano na neodređeno vrijeme, svaki član društva može otkazati društveni ugovor samo s posljednjim danom poslovne godine uz otkazni rok od najmanje šest mjeseci koji mora isteći do toga dana.\n\n(2) Ništetan je svaki sporazum kojim se isključuje pravo člana društva da otkaže ugovor ili kojime mu se otežava to pravo.",
    text: "(1) If the company is established for an indefinite period, each member may terminate the partnership agreement only on the last day of the business year with at least six months’ notice ending on that day.\n\n(2) Any agreement excluding or hindering a member’s right to terminate is void.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "131",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "Komanditno društvo je trgovačko društvo u koje se udružuju dvije ili više osoba radi trajnog obavljanja djelatnosti pod zajedničkom tvrtkom od kojih najmanje jedna odgovara za obveze društva solidarno i neograničeno cijelom svojom imovinom (komplementar), a najmanje jedna odgovara za obveze društva samo do iznosa određenog imovinskog uloga u društvo (komanditor).",
    text: "A limited partnership is a trading company in which two or more persons associate permanently under a common business name, where at least one is liable for the company’s obligations jointly and severally without limitation with all their property (general partner), and at least one is liable only up to the amount of a determined capital contribution (limited partner).",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "136",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Društvom upravljaju komplementari. Komanditori nisu ovlašteni upravljati poslovima društva.\n\n(2) Komanditor se ne može usprotiviti odlukama ni postupcima komplementara, osim odlukama i postupcima koji se odnose ili se poduzimaju izvan granica redovnog poslovanja društva.",
    text: "(1) The company is managed by general partners. Limited partners are not authorised to manage the company’s affairs.\n\n(2) A limited partner may not oppose decisions or acts of general partners except decisions and acts that relate to or are undertaken outside the ordinary course of the company’s business.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "139",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Odredbe članka 87. ovoga Zakona primjenjuju se i na komanditore.\n\n(2) Dobit tekuće godine pripisuje se komanditorovom ulogu u kapital društva sve dok on ne dosegne iznos koji se društvenim ugovorom obvezao uplatiti kao svoj ulog.\n\n(3) U snošenju gubitka nastalog poslovanjem društva komanditor sudjeluje samo do visine svoga udjela u kapitalu društva, a i s neuplaćenim dijelom iznosa koji se društvenim ugovorom obvezao uplatiti kao svoj ulog.",
    text: "(1) Article 87 of this Act applies to limited partners as well.\n\n(2) The current year’s profit is credited to the limited partner’s capital contribution until it reaches the amount they undertook to pay in.\n\n(3) In bearing loss from operations, the limited partner participates only up to their share in capital, including the unpaid portion of the agreed contribution.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Companies Act",
    law_name_local: "Zakon o trgovačkim društvima",
    law_category: "commercial",
    article_num: "143",
    source_url: "https://www.zakon.hr/z/546/Zakon-o-trgova%C4%8Dkim-dru%C5%A1tvima",
    text_local:
      "(1) Komanditor ne odgovara za obveze društva ako je u cjelini uplatio ulog na koji se obvezao društvenim ugovorom.\n\n(2) Ako komanditor ne uplati u cjelini ulog na koji se obvezao društvenim ugovorom, odgovara vjerovnicima društva neposredno i solidarno s ostalim članovima društva do visine ugovorenoga uloga umanjenoga za uplaćeni dio.",
    text: "(1) A limited partner is not liable for the company’s obligations if they have paid in full the contribution undertaken in the partnership agreement.\n\n(2) If they have not paid in full, they are directly and jointly liable with other members to creditors up to the agreed contribution reduced by the amount paid in.",
  },
]

const HR_ZOO: P[] = [
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "commercial",
    article_num: "637",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ugovorom o ortaštvu uzajamno se obvezuju dvije ili više osoba uložiti svoj rad i/ili imovinu radi postizanja zajedničkog cilja.\n\n(2) Ortaštvo je zajednica osoba i dobara bez pravne osobnosti.",
    text: "(1) By a partnership agreement, two or more persons mutually undertake to contribute their work and/or property to achieve a common goal.\n\n(2) A partnership is a community of persons and property without legal personality.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "commercial",
    article_num: "639",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ulog se može sastojati u stvarima, pravima, novcu, radu i drugim dobrima.\n\n(2) Ako se ulaže cijela imovina, pod njom se razumijeva samo sadašnja imovina, ali ako ugovor obuhvaća i buduću imovinu, pod njom se razumijeva samo stečena, a ne i naslijeđena imovina, osim ako su obje izrijekom ugovorene.\n\n(3) Ugovor koji se odnosi na ulaganje samo sadašnje ili samo buduće imovine nije valjan bez popisa i opisa dijelova koji u nju ulaze.\n\n(4) Ortak koji se obvezao uložiti samo svoj rad ima pravo na udio u dobiti, ali ne i na udio u glavnici ortaštva, osim ako je vrijednost njegova rada, procijenjena u novcu, uključena u glavnicu.",
    text: "(1) A contribution may consist of things, rights, money, work and other assets.\n\n(2) If the entire property is contributed, only present property is meant; if the agreement also covers future property, only acquired, not inherited property is meant, unless both are expressly agreed.\n\n(3) An agreement relating only to present or only to future property is invalid without an inventory and description of the parts included.\n\n(4) A partner who undertakes to contribute only labour is entitled to a share of profit but not to a share of partnership capital unless the value of their work, assessed in money, is included in capital.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "commercial",
    article_num: "642",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Pravo na vođenje poslova ortaštva pripada zajednički svim ortacima.\n\n(2) Odluke u vođenju poslova ortaštva donose se primjenom propisa o upravljanju stvarju u suvlasništvu.\n\n(3) Ortak koji ulaže samo svoj rad, a koji nije uključen u glavnicu, sudjeluje kod donošenja odluka, ali bez prava glasa.",
    text: "(1) The right to manage the partnership’s affairs belongs jointly to all partners.\n\n(2) Decisions in managing affairs are adopted applying rules on management of co-owned property.\n\n(3) A partner who contributes only labour and is not included in capital participates in decision-making but without a vote.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "commercial",
    article_num: "648",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(4) Ako s vjerovnikom nije drukčije ugovoreno, za obveze ortaštva solidarno odgovaraju svi ortaci.",
    text: "(4) Unless otherwise agreed with the creditor, all partners are jointly and severally liable for the partnership’s obligations.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "commercial",
    article_num: "651",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ako udjeli ortaka u dobiti i gubitku nisu utvrđeni ugovorom o ortaštvu, svaki ortak ima, neovisno o vrsti i veličini uloga, jednak udio u dobiti i gubitku.\n\n(2) Ako je određen samo udio u dobiti, ili samo u gubitku, u dvojbi to utanačenje vrijedi za dobit i za gubitak.",
    text: "(1) If profit and loss shares are not fixed in the partnership agreement, each partner has an equal share of profit and loss regardless of the type and size of contributions.\n\n(2) If only the profit share or only the loss share is determined, in case of doubt that determination applies to both profit and loss.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "commercial",
    article_num: "655",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "Ortaštvo prestaje:\n\n1. ostvarenjem cilja ortaštva ili ako njegovo ostvarenje postane nemogućim,\n\n2. protekom vremena na koje je sklopljen ugovor o ortaštvu,\n\n3. propašću zajedničke imovine,\n\n4. sporazumom ortaka,\n\n5. smrću, odnosno prestankom postojanja te istupom i isključenjem ortaka, ako ortaštvo čine dva ortaka,\n\n6. odlukom suda u slučaju prestanka ortaštva iz važnog razloga.",
    text: "The partnership ceases:\n\n1. when its purpose is achieved or achievement becomes impossible;\n\n2. on expiry of the agreed period;\n\n3. by loss of the joint property;\n\n4. by agreement of the partners;\n\n5. by death or cessation of existence and by withdrawal or exclusion of partners, if there are two partners;\n\n6. by court decision for important cause.",
  },
]

const ME_ZOO: P[] = [
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "716",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "(1) Ugovorom o ortakluku uzajamno se obavezuju dva ili više lica da ulože svoj rad odnosno imovinu radi postizanja zajedničkog cilja.\n\n(2) Ortakluk je zajednica lica i dobara bez svojstva pravnog lica.",
    text: "(1) By a partnership agreement, two or more persons mutually undertake to contribute their work or property to achieve a common goal.\n\n(2) A partnership is a community of persons and property without legal personality.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "718",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "(1) Ulog se može sastojati u stvarima, pravima, novcu, radu i drugim dobrima.\n\n(4) Ortak koji se obavezao da uloži samo svoj rad ima pravo na udio u dobiti, ali ne i na udio u glavnici ortakluka, osim ako je vrijednost njegovog rada, procijenjena u novcu, uključena u glavnicu.",
    text: "(1) A contribution may consist of things, rights, money, work and other assets.\n\n(4) A partner who undertakes to contribute only labour is entitled to a profit share but not to a share of partnership capital unless the value of their work, assessed in money, is included in capital.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "721",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "(1) Pravo na vođenje poslova ortakluka pripada zajednički svim ortacima.\n\n(2) Odluke u vođenju poslova ortakluka donose se primjenom propisa o upravljanju stvarju u susvojini.\n\n(3) Ortak koji ulaže samo svoj rad, a koji nije uključen u glavnicu, učestvuje kod donošenja odluka, ali bez prava glasa.",
    text: "(1) The right to manage the partnership’s affairs belongs jointly to all partners.\n\n(2) Decisions are adopted applying rules on management of co-owned property.\n\n(3) A labour-only partner not included in capital participates in decisions but without a vote.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "722",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "(4) Nijedan ortak nema pravo povjeriti vođenje poslova ortakluka trećem licu, niti koga primiti u ortakluk, a ni preduzeti posao kojim bi se, radi svoje posebne koristi, ugrozilo postizanje zajedničkog cilja ili nanijela šteta ortakluku.",
    text: "(4) No partner may entrust management to a third party, admit anyone into the partnership, or undertake a transaction that, for private gain, jeopardises the common goal or harms the partnership.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "727",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "(4) Ako s povjeriocem nije drukčije ugovoreno, za obaveze ortakluka solidarno odgovaraju svi ortaci.",
    text: "(4) Unless otherwise agreed with the creditor, all partners are jointly and severally liable for the partnership’s obligations.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "730",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "(1) Ako udjeli ortaka u dobiti i gubitku nijesu utvrđeni ugovorom o ortakluku, svaki ortak ima, nezavisno od vrste i veličine uloga, jednak udio u dobiti i gubitku.\n\n(2) Ako je određen samo udio u dobiti, ili samo u gubitku, u sumnji ta ugovorna odredba važi za dobit i za gubitak.",
    text: "(1) If profit and loss shares are not fixed in the agreement, each partner has an equal share regardless of contributions.\n\n(2) If only profit or only loss share is set, in case of doubt it applies to both.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "commercial",
    article_num: "734",
    source_url: "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    text_local:
      "Ortakluk prestaje:\n\n1) ostvarenjem cilja ortakluka ili ako njegovo ostvarenje postane nemoguće;\n\n2) protekom vremena na koje je zaključen ugovor o ortakluku;\n\n3) propašću zajedničke imovine;\n\n4) sporazumom ortaka;\n\n5) smrću, odnosno prestankom postojanja i istupanjem i isključenjem ortaka, ako ortakluk čine dva ortaka;\n\n6) odlukom suda u slučaju prestanka ortakluka iz opravdanog razloga.",
    text: "The partnership ceases:\n\n1) when its purpose is achieved or becomes impossible;\n\n2) on expiry of the agreed period;\n\n3) by loss of joint property;\n\n4) by agreement;\n\n5) by death or cessation and withdrawal/exclusion if there are two partners;\n\n6) by court decision for justified cause.",
  },
]

const SI_ZGD: P[] = [
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "78",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Prijava za vpis v register mora vsebovati tudi ime, priimek in prebivališče ali firmo in sedež vsakega družbenika.\n\n(2) Prijavo morajo vložiti vsi družbeniki.",
    text: "(1) The application for registration must also contain the name, surname and residence or the name and seat of each member.\n\n(2) The application must be filed by all members.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "80",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Če ni drugače dogovorjeno, morajo družbeniki vplačati enake vložke.\n\n(2) Družbenik lahko v družbo vloži denar, stvari, pravice ali storitve. Vrednost nedenarnega vložka morajo družbeniki sporazumno oceniti v denarju.\n\n(3) Družbenik ni dolžan zvišati dogovorjenega ali dopolniti z izgubo zmanjšanega vložka.",
    text: "(1) Unless otherwise agreed, members must make equal contributions.\n\n(2) A member may contribute cash, things, rights or services. The value of a non-cash contribution must be assessed in money by agreement.\n\n(3) A member is not obliged to increase the agreed contribution or replenish a contribution reduced by loss.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "85",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Posle družbe so upravičeni in dolžni voditi vsi družbeniki.\n\n(2) Če je z družbeno pogodbo vodenje poslov preneseno na enega ali več družbenikov, drugi družbeniki ne smejo voditi poslov.",
    text: "(1) All members are entitled and obliged to manage the company’s affairs.\n\n(2) If management is transferred by memorandum to one or more members, the other members may not manage affairs.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "95",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Od dobička pripada vsakemu družbeniku najprej delež v višini 5% njegovega kapitalskega deleža. Če dobiček tega ne omogoča, se deleži ustrezno znižajo.\n\n(2) Pri izračunu deleža dobička, ki družbeniku pripada v skladu s prejšnjim odstavkom, se plačila, ki jih je družbenik vplačal med poslovnim letom kot vložke, upoštevajo v sorazmerju s časom, ki je potekel od vplačil.\n\n(3) Delež dobička, ki presega v skladu s prvim in drugim odstavkom izračunane deleže dobička, in izguba v poslovnem letu se razdelita med družbenike po enakih delih.\n\n(4) Družbeniki lahko, če družbena pogodba to omogoča, s sklepom vseh družbenikov odločijo, da se dobiček deli drugače, kot je določeno v tem členu.",
    text: "(1) Each member is first entitled to a share of profit equal to 5% of their capital share; if profit does not allow, shares are reduced accordingly.\n\n(2) Payments made as contributions during the year are taken into account in proportion to time.\n\n(3) Profit exceeding the calculated shares under (1)–(2) and the year’s loss are divided equally among members.\n\n(4) Members may unanimously decide a different profit split if the memorandum allows.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "100",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Za obveznosti družbe so upnikom subsidiarno odgovorni vsi družbeniki z vsem svojim premoženjem. Če družba upniku na njegovo pisno zahtevo ne izpolni obveznosti, so odgovorni vsi družbeniki solidarno.\n\n(2) Drugačen dogovor družbenikov o njihovi odgovornosti proti tretjim osebam je brez pravnega učinka.\n\n(3) Če članstvo družbenika preneha, je ta družbenik odgovoren za obveznosti družbe, nastale do objave vpisa prenehanja članstva.",
    text: "(1) Members are subsidiarily liable to creditors with all their assets; if the company does not perform on written demand, all members are jointly liable.\n\n(2) A different agreement on liability towards third parties is void.\n\n(3) When membership ceases, the member remains liable for obligations arising until publication of cessation of membership.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "105",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Družba z neomejeno odgovornostjo preneha:\n\n- s potekom časa, za katerega je bila ustanovljena;\n\n- s sklepom družbenikov;\n\n- s stečajem;\n\n- s smrtjo ali prenehanjem družbenika, če družbena pogodba ne določa drugače;\n\n- z odpovedjo;\n\n- na podlagi sodne odločbe;\n\n- če se število družbenikov zmanjša pod dva, razen v primeru iz 115. člena tega zakona;\n\n- v drugih primerih v skladu z zakonom.",
    text: "(1) A general partnership ceases: on expiry of its term; by resolution of members; by bankruptcy; on death or cessation of a member unless the memorandum provides otherwise; by notice; by court decision; if membership falls below two except under Article 115; and in other cases provided by law.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "106",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Če je družba ustanovljena za nedoločen čas, lahko družbenik odpove družbeno pogodbo na koncu poslovnega leta, če odpoved pisno sporoči drugim družbenikom vsaj šest mesecev pred tem dnem.\n\n(2) Vsak dogovor, ki bi izključil pravico družbenika do odpovedi ali jo drugače otežil, razen s podaljšanjem odpovednega roka, je ničen.",
    text: "(1) If established for an indefinite period, a member may terminate the memorandum at the end of the business year by giving at least six months’ written notice.\n\n(2) Any agreement excluding or hindering termination except by extending notice is void.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "107",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Če obstaja utemeljen razlog, lahko družbenik s tožbo zahteva, da družba preneha pred potekom časa ali brez odpovednega roka, če je bila ustanovljena za nedoločen čas.\n\n(2) Šteje se, da obstaja utemeljen razlog, zlasti če drugi družbenik namerno ali iz hude malomarnosti prekrši bistveno obveznost ali če postane izpolnitev nemogoča.\n\n(3) Namesto prenehanja družbe lahko en ali več družbenikov s tožbo zahteva izključitev družbenika, pri katerem obstaja utemeljen razlog.\n\n(4) Dogovor, s katerim se izključi ali omeji pravica zahtevati prenehanje družbe ali izključitev družbenika, je ničen.",
    text: "(1) For justified cause a member may sue for winding-up before term ends or without notice if indefinite.\n\n(2) Justified cause exists in particular if another member wilfully or grossly negligently breaches an essential obligation or performance becomes impossible.\n\n(3) Instead of winding-up, one or more members may sue to exclude a member where justified cause exists.\n\n(4) Agreements excluding or limiting those rights are void.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "112",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Delež izločenega družbenika priraste k premoženju družbe preostalih družbenikov.\n\n(2) Izločenemu družbeniku se morajo vrniti predmeti, ki jih je prepustil družbi v uporabo.\n\n(3) Izločenemu družbeniku je treba izplačati v denarju to, kar bi prejel pri obračunu, če bi družba prenehala med njegovo izločitvijo.\n\n(4) Izločeni družbenik je oproščen plačila dolgov družbe, če dolg še ni zapadel, mu lahko družba namesto oprostitve ponudi zavarovanje.\n\n(5) Če vrednost premoženja družbe ne zadošča za pokritje dolgov in kapitalskih deležev, mora izločeni družbenik plačati sorazmerni del manjkajočega zneska.",
    text: "(1) The excluded member’s share accrues to the remaining members.\n\n(2) Items lent for use must be returned.\n\n(3) Cash payment due as if the company wound up at exclusion.\n\n(4) Discharge from debts or security instead for unmatured debts.\n\n(5) If assets are insufficient, the excluded member pays a proportional shortfall.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "138",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Komanditist ni upravičen voditi poslov družbe.\n\n(2) Komanditist ne sme nasprotovati poslovanju komplementarjev, če to ne presega običajnega obsega dejavnosti družbe.\n\n(3) Komanditist je odgovoren kot komplementar, če ravna v nasprotju z določbo prvega odstavka.",
    text: "(1) A limited partner may not manage the company.\n\n(2) They may not oppose general partners’ conduct if within ordinary business scope.\n\n(3) Acting contrary to paragraph (1), they are liable as a general partner.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "142",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Če dobiček ne presega 5% kapitalskih deležev, se deleži družbenikov v dobičku določajo po določbah prvega in drugega odstavka 95. člena tega zakona.\n\n(2) Če ni drugače dogovorjeno, se glede dobička, ki presega odstotek iz prejšnjega odstavka, ali glede izgube domneva, da je določeno tako razmerje delitve, ki ustreza razmerju med deleži.",
    text: "(1) If profit does not exceed 5% of capital shares, profit shares follow Article 95(1)–(2).\n\n(2) Unless otherwise agreed, profit above that percentage or loss is presumed split in proportion to shares.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Companies Act Slovenia",
    law_name_local: "Zakon o gospodarskih družbah",
    law_category: "commercial",
    article_num: "145",
    effective_date: "2009-08-14",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO4291",
    text_local:
      "(1) Komanditist je odgovoren upnikom za obveznosti družbe do višine neplačanega zneska, ki bi ga moral vplačati po pogodbi.",
    text: "(1) A limited partner is liable to creditors up to the unpaid amount they were to contribute under the agreement.",
  },
]

const SI_OZ: P[] = [
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "commercial",
    article_num: "990",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "Z družbeno pogodbo se dve ali več oseb zaveže, da si bodo s svojimi prispevki prizadevale doseči z zakonom dopustni skupni namen, tako kot je določeno s pogodbo.",
    text: "By a partnership agreement, two or more persons undertake to strive by their contributions to achieve a joint purpose permitted by law, as determined in the agreement.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "commercial",
    article_num: "991",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Vsak družbenik je dolžan v družbo prispevati to, kar je določeno s pogodbo (prispevek).\n\n(2) Prispevek je lahko denar, stvar, pravica, terjatev, lahko pa tudi storitev, dopustitev ali opustitev, ki ima premoženjsko vrednost.\n\n(3) Če s pogodbo ni drugače določeno, so prispevki družbenikov enaki.",
    text: "(1) Each member must contribute what the agreement provides (contribution).\n\n(2) Contributions may be cash, a thing, a right, a claim, or a service, permission or omission of patrimonial value.\n\n(3) Unless otherwise agreed, contributions are equal.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "commercial",
    article_num: "992",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(2) Družbeniki odločajo o zadevah družbe soglasno; tako odločajo družbeniki zlasti o uporabi dobička in drugih koristi, o načinu, kako se pokrije izguba, vstopu novega družbenika in o izključitvi dosedanjega, o zahtevkih zoper kakšnega družbenika za poravnavo škode družbi, o preklicu poslovodstva, o prenehanju pogodbe in o drugih vprašanjih, ki presegajo poslovodstvo.\n\n(4) Družbeniki opravljajo poslovodstvo skupno in enakopravno.",
    text: "(2) Members decide partnership matters unanimously, in particular use of profit and benefits, covering loss, admission and exclusion of members, claims against members for company damage, recall of management, termination, and other matters beyond day-to-day management.\n\n(4) Members carry out management jointly and equally.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "commercial",
    article_num: "994",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Vsak družbenik je upravičen do dela koristi, ki se doseže v družbi, razen če pogodba določa drugače.\n\n(2) Vsak družbenik je dolžan nositi del izgube, ki nastane z delovanjem družbe.\n\n(3) Če s pogodbo ni določeno drugače, so družbeniki pri koristih in izgubi udeleženi v enakih delih kot s prispevki.",
    text: "(1) Each member is entitled to a share of benefits obtained in the partnership unless the agreement provides otherwise.\n\n(2) Each member must bear a share of loss arising from the partnership’s activity.\n\n(3) Unless otherwise agreed, members participate in benefits and losses in the same proportions as their contributions.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "commercial",
    article_num: "997",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Če se stroški in obveznosti nasproti tretjim osebam ne poravnajo iz premoženja družbe, so dolžni to storiti družbeniki po enakih delih; pogodba lahko določi tudi drugačne dele.\n\n(2) Družbenik, ki je za izvrševanje pogodbe poravnal kak strošek ali kakšno obveznost družbe ali drugih družbenikov nasproti tretjim osebam več kot je dolžan s pogodbo, ima pravico zahtevati povračilo sorazmernega dela od drugih družbenikov.",
    text: "(1) If costs and liabilities to third parties are not met from partnership assets, members must bear them in equal shares; the agreement may provide different proportions.\n\n(2) A member who pays more than their share may claim reimbursement of the proportionate part from others.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "commercial",
    article_num: "1000",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Družba preneha:\n\n1. ko poteče čas, za katerega je ustanovljena;\n\n2. ko je dosežen namen, zaradi katerega je ustanovljena ali ko postane dosega tega namena nemogoča;\n\n3. če tako sklenejo družbeniki;\n\n4. če je družbenik umrl ali izgubil poslovno sposobnost ali se je proti njemu kot samostojnemu podjetniku posamezniku začel postopek stečaja ali prisilne poravnave;\n\n5. če je družbenik kot pravna oseba prenehal obstajati zaradi statusnih sprememb ali se je začel zoper njega postopek stečaja, likvidacije ali prisilne poravnave;\n\n6. če je družbenikov delež po izvršbi pridobila kakšna tretja oseba;\n\n7. če je družbeniku z aktom državnega organa prepovedano opravljanje dejavnosti, ki je nujna za doseganje namena družbene pogodbe;\n\n8. če je družbenik odpovedal pogodbo.",
    text: "(1) The partnership ends when: its term expires; its purpose is achieved or becomes impossible; members so agree; a member dies or loses capacity or bankruptcy/composition begins; a legal person member ceases or insolvency proceedings begin; a third party acquires a member’s share by enforcement; activity essential to the purpose is prohibited; or a member terminates the agreement.",
  },
]

export const PARTNERSHIP_ARTICLES: P[] = [
  ...zpdBlock("serbia", "Zakon o privrednim društvima", "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html", "Companies Act"),
  ...zpdBlock(
    "bih_fbih",
    "Zakon o privrednim društvima FBiH",
    "https://www.paragraf.ba/propisi/fbih/zakon-o-privrednim-drustvima-fbih.html",
    "Companies Act FBiH",
  ),
  ...zpdBlock(
    "bih_rs",
    "Zakon o privrednim društvima Republike Srpske",
    "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-privrednim-drustvima.html",
    "Companies Act RS Entity",
  ),
  ...zpdBlock(
    "montenegro",
    "Zakon o privrednim društvima Crne Gore",
    "https://www.paragraf.me/propisi-crnegore/zakon-o-privrednim-drustvima.html",
    "Companies Act Montenegro",
  ),
  ...zpdBlock(
    "bih_brcko",
    "Zakon o privrednim društvima Brčko Distrikta BiH",
    "https://skupstinabd.ba/3-zakoni/ba/Distrikt/b-Privredno%20pravo/zakoni.html",
    "Companies Act Brčko District",
    ["94", "107", "116", "121", "117"],
  ),
  ...HR_ZTD,
  ...HR_ZOO,
  ...ME_ZOO,
  ...SI_ZGD,
  ...SI_OZ,
]
