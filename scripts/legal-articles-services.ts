/**
 * Service-type contracts (work, construction, transport, custody, insurance, loan/credit, commission).
 *
 * Article numbers follow the consolidated texts used in Paragraf/Zakon.hr/PISRS snapshots (not every
 * number in the original user table matched those texts). Duplicates against other ingest sources were
 * checked on (jurisdiction | law_name_local | article_num); none of the rows below collide.
 */

const RS_ZOO_TEXT: Record<string, { local: string; en: string }> = {
  "600": {
    local:
      "Ugovorom o delu poslenik (preduzimač, izvođač radova) obavezuje se da obavi određeni posao, kao što je izrada ili opravka neke stvari ili izvršenje nekog fizičkog ili intelektualnog rada i sl, a naručilac se obavezuje da mu za to plati naknadu.",
    en: "By a work contract the worker (contractor) undertakes to perform a defined task, such as making or repairing a thing or carrying out physical or intellectual work, and the client undertakes to pay remuneration.",
  },
  "607": {
    local:
      "(1) Poslenik je dužan izvršiti delo kako je ugovoreno i po pravilima posla.\n\n(2) On je dužan izvršiti ga za određeno vreme, a ako ono nije određeno, onda za vreme koje je razumno potrebno za takve poslove.\n\n(3) On ne odgovara za zadocnjenje nastalo zbog toga što mu naručilac nije predao materijal na vreme, ili zbog toga što je tražio izmene, ili što mu nije isplatio dužan predujam i uopšte za zadocnjenje nastalo ponašanjem naručioca.",
    en: "(1) The worker must perform the work as agreed and according to the rules of the trade.\n\n(2) He must complete it within the agreed time, or if none is fixed, within a reasonable time for such work.\n\n(3) He is not liable for delay because the client failed to deliver materials on time, requested changes, failed to pay an agreed advance, or generally for delay caused by the client's conduct.",
  },
  "630": {
    local:
      "(1) Ugovor o građenju je ugovor o delu kojim se izvođač obavezuje da prema određenom projektu sagradi u ugovorenom roku određenu građevinu na određenom zemljištu, ili da na takvom zemljištu, odnosno na već postojećem objektu izvrši kakve druge građevinske radove, a naručilac se obavezuje da mu za to isplati određenu cenu.\n\n(2) Ugovor o građenju mora biti zaključen u pismenoj formi.",
    en: "(1) A construction contract is a work contract by which the contractor undertakes, according to a design, to build a structure within an agreed period on specified land or on an existing facility to perform other building works, and the client undertakes to pay an agreed price.\n\n(2) A construction contract must be concluded in writing.",
  },
  "712": {
    local:
      "(1) Ugovorom o ostavi obavezuje se ostavoprimac da primi stvar od ostavodavca, da je čuva i da je vrati kad je ovaj bude zatražio.\n\n(2) Predmet ostave mogu biti samo pokretne stvari.",
    en: "(1) By a custody contract the bailee undertakes to receive a movable from the bailor, keep it and return it when requested.\n\n(2) Only movables may be the subject of custody.",
  },
  "648": {
    local:
      "(1) Ugovorom o prevozu obavezuje se prevozilac da preveze na određeno mesto neko lice ili neku stvar, a putnik, odnosno pošiljalac se obavezuje da mu za to isplati određenu naknadu.\n\n(2) Kao prevozilac, u smislu ovog zakona, smatra se kako lice koje se bavi prevozom kao svojim redovnim poslovanjem, tako i svako drugo lice koje se ugovorom obaveže da izvrši prevoz uz naknadu.",
    en: "(1) By a transport contract the carrier undertakes to convey a person or thing to a specified place, and the passenger or sender undertakes to pay agreed remuneration.\n\n(2) A carrier includes both persons who carry on transport as their regular business and any other person who undertakes by contract to perform transport for remuneration.",
  },
  "649": {
    local:
      "(1) Prevozilac koji obavlja prevoz na određenoj liniji (linijski prevoz) dužan je da redovno i uredno održava objavljenu liniju.\n\n(2) On je dužan da primi na prevoz svako lice i svaku stvar koji ispunjavaju uslove određene u objavljenim opštim uslovima.\n\n(3) Ako redovna prevozna sredstva prevozioca nisu dovoljna za izvršenje svih zahtevanih prevoza, prvenstvo imaju lica ili stvari za koje je to posebnim propisima predviđeno, a dalje prvenstvo se određuje prema redu zahteva, s tim da se između istovremenih zahteva prvenstvo određuje prema većoj dužini prevoza.",
    en: "(1) A carrier operating on a specified line (line transport) must maintain the published line regularly and properly.\n\n(2) He must accept for carriage every person and every thing meeting the conditions in the published general conditions.\n\n(3) If regular means are insufficient for all requested carriage, priority is as special laws provide; further priority follows the order of requests, and among simultaneous requests by the longer carriage distance.",
  },
  "897": {
    local:
      "Ugovorom o osiguranju obavezuje se ugovarač osiguranja da plati određeni iznos organizaciji za osiguranje (osiguravač), a organizacija se obavezuje da, ako se desi događaj koji predstavlja osigurani slučaj, isplati osiguraniku ili nekom trećem licu naknadu, odnosno ugovorenu svotu ili učini nešto drugo.",
    en: "By an insurance contract the policyholder undertakes to pay a sum to the insurer, and the insurer undertakes that, if an insured event occurs, it will pay the insured or a third party compensation or the agreed sum or perform something else.",
  },
  "557": {
    local:
      "Ugovorom o zajmu obavezuje se zajmodavac da preda u svojinu zajmoprimcu određenu količinu novca ili kojih drugih zamenljivih stvari, a zajmoprimac se obavezuje da mu vrati posle izvesnog vremena istu količinu novca, odnosno istu količinu stvari iste vrste i istog kvaliteta.",
    en: "By a loan contract the lender undertakes to transfer ownership of a quantity of money or other fungible things to the borrower, and the borrower undertakes to return after a period the same quantity of money or things of the same kind and quality.",
  },
  "1065": {
    local:
      "Ugovorom o kreditu banka se obavezuje da korisniku kredita stavi na raspolaganje određeni iznos novčanih sredstava, na određeno ili neodređeno vreme, za neku namenu ili bez utvrđene namene, a korisnik se obavezuje da banci plaća ugovorenu kamatu i dobijeni iznos novca vrati u vreme i na način kako je utvrđeno ugovorom.",
    en: "By a credit contract the bank undertakes to make available to the credit user a sum of money for a definite or indefinite period, for a purpose or without a fixed purpose, and the user undertakes to pay agreed interest and repay the money in the manner and at the time set by the contract.",
  },
  "771": {
    local:
      "(1) Ugovorom o komisionu obavezuje se komisionar da za naknadu (proviziju) obavi u svoje ime i za račun komitenta jedan ili više poslova koje mu poverava komitent.\n\n(2) Komisionar ima pravo na naknadu i kad ova nije ugovorena.",
    en: "(1) By a commission contract the commission agent undertakes for remuneration (commission) to perform in his own name and for the principal's account one or more tasks entrusted by the principal.\n\n(2) The agent is entitled to remuneration even if not agreed.",
  },
}

function rsFamilyArticles(
  jurisdiction: string,
  lawName: string,
  lawNameLocal: string,
  sourceUrl: string,
  nums: string[],
) {
  return nums.map((article_num) => {
    const t = RS_ZOO_TEXT[article_num]
    return {
      jurisdiction,
      law_name: lawName,
      law_name_local: lawNameLocal,
      law_category: "civil",
      article_num,
      source_url: sourceUrl,
      text_local: t.local,
      text: t.en,
    }
  })
}

export const SERVICES_ARTICLES = [
  ...rsFamilyArticles(
    "serbia",
    "Law on Obligations",
    "Zakon o obligacionim odnosima",
    "https://www.paragraf.rs/propisi/zakon_o_obligacionim_odnosima.html",
    ["600", "607", "630", "712", "648", "649", "897", "557", "1065", "771"],
  ),
  ...rsFamilyArticles(
    "bih_fbih",
    "Law on Obligations FBiH",
    "Zakon o obligacionim odnosima FBiH",
    "https://www.paragraf.ba/propisi/fbih/zakon_o_obligacionim_odnosima_fbih.html",
    ["600", "607", "630", "712", "648", "649", "897", "557", "771"],
  ),
  ...rsFamilyArticles(
    "bih_rs",
    "Law on Obligations RS Entity",
    "Zakon o obligacionim odnosima RS",
    "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-obligacionim-odnosima.html",
    ["600", "607", "630", "712", "648", "649", "897", "557", "771"],
  ),
  ...rsFamilyArticles(
    "bih_brcko",
    "Law on Obligations Brčko District",
    "Zakon o obligacionim odnosima Brčko Distrikta BiH",
    "https://skupstinabd.ba/3-zakoni/ba/Distrikt/b-Obligaciono%20pravo/zakoni.html",
    ["600", "607", "630", "648", "649", "557", "771"],
  ),
  ...rsFamilyArticles(
    "montenegro",
    "Law on Obligations Montenegro",
    "Zakon o obligacionim odnosima CG",
    "https://www.paragraf.me/propisi-crnegore/zakon-o-obligacionim-odnosima.html",
    ["600", "607", "630", "712", "648", "649", "897", "557", "771"],
  ),
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "590",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "Ugovorom o djelu izvođač se obvezuje obaviti određeni posao, kao što je izrada ili popravak neke stvari, izvršenje kakva fizičkog ili umnog rada i sl., a naručitelj se obvezuje platiti mu za to naknadu.",
    text: "By a work contract the contractor undertakes to perform a defined task, such as making or repairing a thing or carrying out physical or intellectual work, and the client undertakes to pay remuneration.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "597",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Izvođač je dužan izvršiti djelo kako je ugovoreno i po pravilima struke.\n\n(2) On je dužan izvršiti ga za određeno vrijeme, a ako ono nije određeno, onda za vrijeme koje je razumno potrebno za takve poslove.\n\n(3) On ne odgovara za zakašnjenje nastalo zbog toga što mu naručitelj nije predao materijal na vrijeme, ili zbog toga što je tražio izmjene, ili što mu nije isplatio dužni predujam i uopće za zakašnjenje nastalo ponašanjem naručitelja.",
    text: "(1) The contractor must perform the work as agreed and according to professional rules.\n\n(2) He must complete it within the agreed time, or if none is fixed, within a reasonable time for such work.\n\n(3) He is not liable for delay because the client failed to deliver materials on time, requested changes, failed to pay an agreed advance, or generally for delay caused by the client's conduct.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "620",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ugovorom o građenju izvođač se obvezuje prema određenom projektu izgraditi u ugovorenom roku određenu građevinu na određenom zemljištu, ili na takvom zemljištu, odnosno na postojećoj građevini izvesti kakve druge građevinske radove, a naručitelj se obvezuje isplatiti mu za to određenu cijenu.\n\n(2) Ugovor o građenju mora biti sklopljen u pisanom obliku.",
    text: "(1) By a construction contract the contractor undertakes, according to a design, to build a structure within an agreed period on specified land or on an existing facility to perform other building works, and the client undertakes to pay an agreed price.\n\n(2) A construction contract must be concluded in writing.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "725",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ugovorom o ostavi obvezuje se ostavoprimac da primi stvar od ostavodavca, da je čuva i da je vrati kad je ovaj bude zatražio.\n\n(2) Objekt ostave mogu biti samo pokretne stvari.",
    text: "(1) By a custody contract the bailee undertakes to receive a thing from the bailor, keep it and return it when requested.\n\n(2) Only movables may be the subject of custody.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "661",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ugovorom o prijevozu obvezuje se prijevoznik prevesti na određeno mjesto neku osobu ili stvar, a putnik, odnosno pošiljatelj se obvezuje da mu za to plati određenu naknadu.\n\n(2) Prijevoznikom, prema ovom Zakonu, smatra se kako osoba koja se bavi prijevozom kao svojim redovitim poslovanjem, tako i svaka druga osoba koja se ugovorom obveže izvršiti prijevoz uz naknadu.",
    text: "(1) By a transport contract the carrier undertakes to convey a person or thing to a specified place, and the passenger or sender undertakes to pay agreed remuneration.\n\n(2) A carrier includes both persons who carry on transport as their regular business and any other person who undertakes by contract to perform transport for remuneration.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "662",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Prijevoznik koji obavlja prijevoz na određenoj liniji (linijski prijevoz) dužan je redovito i uredno održavati objavljenu liniju.\n\n(2) On je dužan primiti na prijevoz svaku osobu i svaku stvar koji udovoljavaju uvjetima određenim u objavljenim općim uvjetima.\n\n(3) Ako redovita prijevozna sredstva prijevoznika nisu dovoljna za izvršenje svih zahtijevanih prijevoza, prvenstvo imaju osobe ili stvari za koje je to posebnim propisima predviđeno, a daljnje se prvenstvo određuje prema redu zahtjeva, s tim da se između istodobnih zahtjeva prvenstvo određuje prema većoj duljini prijevoza.",
    text: "(1) A carrier operating on a specified line must maintain the published line regularly and properly.\n\n(2) He must accept for carriage every person and every thing meeting the conditions in the published general conditions.\n\n(3) If regular means are insufficient for all requested carriage, priority is as special laws provide; further priority follows the order of requests, and among simultaneous requests by the longer carriage distance.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "921",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "Ugovorom o osiguranju osiguratelj se obvezuje ugovaratelju osiguranja isplatiti osiguraniku ili korisniku osiguranja osigurninu ako nastane osigurani slučaj, a ugovaratelj se osiguranja obvezuje osiguratelju platiti premiju osiguranja!",
    text: "By an insurance contract the insurer undertakes towards the policyholder to pay the insured or beneficiary insurance indemnity if an insured event occurs, and the policyholder undertakes to pay the insurer the insurance premium.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "922",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Osigurani slučaj je događaj prouzročen osiguranim rizikom.\n\n(2) Rizik koji je obuhvaćen osiguranjem (osigurani rizik) mora biti budući, neizvjestan i nezavisan od isključive volje ugovaratelja osiguranja ili osiguranika.\n\n(3) Ugovor o osiguranju je ništetan ako je u trenutku njegova sklapanja već nastao osigurani slučaj, ili je taj bio u nastupanju, ili je bilo izvjesno da će nastupiti, ili je već tada bila prestala mogućnost da on nastane.\n\n(4) Ali ako je ugovoreno da će osiguranjem biti obuhvaćeno određeno razdoblje koje prethodi sklapanju ugovora, ugovor će biti ništetan samo ako je u trenutku njegova sklapanja zainteresiranoj strani bilo poznato da se osigurani slučaj već dogodio, odnosno da je već tada bila otpala mogućnost da se on dogodi.",
    text: "(1) An insured event is an event caused by the insured risk.\n\n(2) The risk covered (insured risk) must be future, uncertain and independent of the exclusive will of the policyholder or insured.\n\n(3) The insurance contract is void if at the time of conclusion the insured event had already occurred, was imminent, was certain to occur, or could no longer occur.\n\n(4) If cover extends to a period before conclusion, the contract is void only if at conclusion the interested party knew the event had already occurred or could no longer occur.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "499",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ugovorom o zajmu obvezuje se zajmodavac predati zajmoprimcu određeni iznos novca ili određenu količinu drugih zamjenljivih stvari, a zajmoprimac se obvezuje vratiti mu poslije stanovitog vremena isti iznos novca, odnosno istu količinu stvari iste vrste i kakvoće.\n\n(2) Na primljenim stvarima zajmoprimac stječe pravo vlasništva.",
    text: "(1) By a loan contract the lender undertakes to deliver a sum of money or a quantity of other fungible things to the borrower, and the borrower undertakes to return after a certain time the same sum or the same quantity of things of the same kind and quality.\n\n(2) The borrower acquires ownership of the things received.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "1021",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "Ugovorom o kreditu banka se obvezuje korisniku kredita staviti na raspolaganje određeni iznos novčanih sredstava, na određeno ili neodređeno vrijeme, za neku namjenu ili bez utvrđene na mjene, a korisnik se obvezuje banci plaćati ugovorene kamate i iskorišteni iznos novca vratiti u vrijeme i na način kako je ugovoreno.",
    text: "By a credit contract the bank undertakes to make available to the credit user a sum of money for a definite or indefinite period, for a purpose or without a fixed purpose, and the user undertakes to pay agreed interest and repay the amount used in the time and manner agreed.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "785",
    source_url: "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima",
    text_local:
      "(1) Ugovorom o komisiji obvezuje se komisionar obaviti uz proviziju jedan ili više poslova u svoje ime i za račun komitenta.\n\n(2) Komisionar ima pravo na proviziju i kad nije ugovorena.",
    text: "(1) By a commission contract the commission agent undertakes to perform for commission one or more transactions in his own name and for the principal's account.\n\n(2) The agent is entitled to commission even if not agreed.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "619",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "S podjemno pogodbo se podjemnik zavezuje opraviti določen posel, kot je izdelava ali popravilo kakšne stvari, kakšno telesno ali umsko delo ipd., naročnik pa zavezuje, da mu bo za to plačal.",
    text: "By a work contract the contractor undertakes to perform a defined task, such as making or repairing a thing, physical or intellectual work, etc., and the client undertakes to pay for it.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "626",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Podjemnik je dolžan izvršiti delo po dogovoru in po pravilih posla.\n\n(2) Izvršiti ga mora v določenem času, če čas ni določen, pa v času, ki je razumno potreben za take posle.\n\n(3) Ne odgovarja za zamudo, nastalo zato, ker mu naročnik ni pravočasno izročil materiala, ali zato, ker je zahteval spremembe, ali zato, ker mu ni izplačal dolžnega predujma, in sploh za zamudo, nastalo zaradi naročnikovega ravnanja.",
    text: "(1) The contractor must perform the work as agreed and according to the rules of the trade.\n\n(2) He must complete it within the agreed time, or if none is fixed, within a reasonable time for such work.\n\n(3) He is not liable for delay because the client failed to deliver materials on time, requested changes, failed to pay an agreed advance, or generally for delay caused by the client's conduct.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "649",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Gradbena pogodba je podjemna pogodba, s katero se izvajalec zavezuje, da bo po določenem načrtu v dogovorjenem roku zgradil določeno gradbo na določenem zemljišču ali da bo na takem zemljišču oziroma na že obstoječem objektu izvedel kakšna druga gradbena dela, naročnik pa se zavezuje, da mu bo za to plačal določeno ceno.\n\n(2) Gradbena pogodba mora biti sklenjena v pisni obliki.",
    text: "(1) A construction contract is a work contract by which the contractor undertakes, according to a design, within an agreed period to build a structure on specified land or on an existing object to perform other building works, and the client undertakes to pay an agreed price.\n\n(2) A construction contract must be concluded in writing.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "729",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) S shranjevalno pogodbo se shranjevalec zavezuje, da sprejme stvar od položnika, da jo hrani in mu jo vrne, ko jo bo ta zahteval.\n\n(2) Predmet shranjevalne pogodbe so lahko samo premične stvari.",
    text: "(1) By a custody contract the custodian undertakes to receive a thing from the depositor, keep it and return it when the depositor requests it.\n\n(2) Only movables may be the subject of a custody contract.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "666",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) S prevozno pogodbo se prevoznik zavezuje, da bo prepeljal na določen kraj kakšno osebo ali kakšno stvar, potnik oziroma pošiljatelj pa, da mu bo za to dal določeno plačilo.\n\n(2) Za prevoznika se šteje po tem zakoniku tako tisti, ki se ukvarja s prevozom kot s svojo redno dejavnostjo, kot tudi vsak drug, ki se s pogodbo zaveže, da bo za plačilo opravil prevoz.",
    text: "(1) By a transport contract the carrier undertakes to convey a person or thing to a specified place, and the passenger or sender undertakes to pay agreed remuneration.\n\n(2) A carrier includes anyone who carries on transport as a regular activity and anyone else who undertakes by contract to perform transport for payment.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "667",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Prevoznik, ki opravlja prevoz na določeni liniji (linijski prevoz), je dolžan redno in pravilno vzdrževati objavljeno linijo.\n\n(2) Za prevoz je dolžan sprejeti vsako osebo in vsako stvar, ki izpolnjujeta pogoje, določene v objavljenih splošnih pogojih.\n\n(3) Če prevoznikova redna prevozna sredstva ne zadostujejo za vse zahtevane prevoze, imajo prednost osebe ali stvari, za katere je to določeno v posebnih predpisih, nadaljnja prednost pa se določa po vrstnem redu zahtev; pri tem je med sočasnimi zahtevami za prednost odločilna večja dolžina prevoza.",
    text: "(1) A carrier operating on a specified line (line transport) must maintain the published line regularly and properly.\n\n(2) He must accept for carriage every person and every thing meeting the conditions in the published general conditions.\n\n(3) If regular transport capacity is insufficient for all requests, priority is as special regulations provide; further priority follows the order of requests, and among simultaneous requests the longer carriage distance prevails.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "921",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "Z zavarovalno pogodbo se zavarovalec zavezuje, da bo zavarovalnici plačal zavarovalno premijo ali prispevek, zavarovalnica pa se zavezuje, da bo, če se zgodi dogodek, ki pomeni zavarovalni primer, izplačala zavarovancu ali nekomu tretjemu zavarovalnino ali odškodnino ali storila kaj drugega.",
    text: "By an insurance contract the policyholder undertakes to pay the insurer a premium or contribution, and the insurer undertakes that, if an event constituting an insured case occurs, it will pay the insured or a third party insurance indemnity or damages or do something else.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "922",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) Dogodek, glede na katerega se sklene zavarovanje (zavarovalni primer), mora biti bodoč, negotov in neodvisen od izključne volje pogodbenikov.\n\n(2) Zavarovalna pogodba je nična, če je tedaj, ko je bila sklenjena, zavarovalni primer že nastal, če je bil že v nastajanju ali je bilo gotovo, da bo nastal, ali če je tedaj že prenehala možnost, da bi nastal.\n\n(3) Če pa je bilo dogovorjeno, da bo z zavarovanjem zajet določen čas pred sklenitvijo pogodbe, je pogodba nična le, če je bilo tedaj, ko je bila sklenjena, zainteresirani stranki znano, da je zavarovalni primer že nastal oziroma da je že prenehala možnost, da bi nastal.",
    text: "(1) The event insured against (insured case) must be future, uncertain and independent of the parties' exclusive will.\n\n(2) The insurance contract is void if when concluded the insured case had already occurred, was imminent, was certain to occur, or could no longer occur.\n\n(3) If cover extends to a period before conclusion, the contract is void only if at conclusion the interested party knew the case had already occurred or could no longer occur.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "569",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) S posojilno pogodbo se posojilodajalec zavezuje, da bo posojilojemalcu izročil določen znesek denarja ali določeno količino drugih nadomestnih stvari, posojilojemalec pa se zavezuje, da mu bo po določenem času vrnil enak znesek denarja oziroma enako količino stvari iste vrste in kakovosti.\n\n(2) Na prejetih stvareh pridobi posojilojemalec lastninsko pravico.",
    text: "(1) By a loan contract the lender undertakes to deliver a sum of money or a quantity of other fungible things to the borrower, and the borrower undertakes to return after a certain time the same sum or the same quantity of things of the same kind and quality.\n\n(2) The borrower acquires ownership of the things received.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations Slovenia",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "788",
    source_url: "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263",
    text_local:
      "(1) S komisijsko pogodbo se komisionar zavezuje, da bo za plačilo (provizijo) v svojem imenu na račun komitenta opravil enega ali več poslov, ki mu jih je zaupal komitent.\n\n(2) Komisionar ima pravico do plačila, tudi če ni bilo dogovorjeno.",
    text: "(1) By a commission contract the commission agent undertakes for payment (commission) to perform in his own name for the principal's account one or more transactions entrusted by the principal.\n\n(2) The agent is entitled to payment even if not agreed.",
  },
]
