/**
 * Additional legal articles appended to SAMPLE_ARTICLES in ingest-legal-texts.ts.
 * Serbia/Croatia/Slovenia: source_url points to consolidated law pages (Paragraf, zakon.hr, pisrs.si).
 * BiH and Montenegro: texts drafted from the applicable norms; source_url is gazette-style reference.
 */

import { CIVIL_PRIORITY_ARTICLES } from "./legal-articles-civil-priority"

export type LegalArticleAppend = {
  jurisdiction: string
  law_name: string
  law_name_local: string
  law_category: string
  article_num: string
  paragraph_num?: string
  text: string
  text_local?: string
  source_url?: string
  effective_date?: string
}

const SRC_RS_ZOR = "https://www.paragraf.rs/propisi/zakon_o_radu.html"
const SRC_RS_ZPD = "https://www.paragraf.rs/propisi/zakon_o_privrednim_drustvima.html"
const SRC_RS_ZPP = "https://www.paragraf.rs/propisi/zakon_o_parnicnom_postupku.html"
const SRC_HR_ZOR = "https://www.zakon.hr/z/307/Zakon-o-radu"
const SRC_HR_ZOO = "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima"
const SRC_SI_ZDR = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO5944"
const SRC_SI_OZ = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263"

/** SN FBiH / SG RS / Brčko / CG — gazette citation as reference (manual texts). */
const SRC_BIH_FBIH_RAD = "SN FBiH br. 26/16 — Zakon o radu FBiH"
const SRC_BIH_FBIH_OOD = "SN FBiH br. 29/03 — Zakon o obligacionim odnosima FBiH"
const SRC_BIH_RS_RAD = "SG RS br. 01/16 — Zakon o radu RS"
const SRC_BIH_RS_OOD = "SG RS br. 17/93 — Zakon o obligacionim odnosima RS"
const SRC_BIH_BRCKO_RAD = "Službeni glasnik Brčko distrikta BiH — Zakon o radu Brčko Distrikta BiH"
const SRC_ME_RAD = "Službeni list CG br. 74/2019 — Zakon o radu Crne Gore"
const SRC_ME_OOD = "Službeni list CG br. 47/2008 — Zakon o obligacionim odnosima Crne Gore"

export const ADDITIONAL_LEGAL_ARTICLES: LegalArticleAppend[] = [
  // --- SERBIA: Zakon o privrednim društvima (RS OG 36/2011, consolidated Paragraf) ---
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "1",
    source_url: SRC_RS_ZPD,
    text: "This Law regulates the incorporation, organisation and operation of companies, the status of members and shareholders, legal relations between companies and with third parties, transformation, dissolution and deletion of companies, and other issues of importance for companies, unless otherwise provided by law.",
    text_local:
      "Ovim zakonom uređuju se osnivanje, organizovanje i poslovanje privrednih društava, položaj članova i akcionara, pravni odnosi između društava i sa trećim licima, statusne promene, prestajanje i brisanje društava, kao i druga pitanja od značaja za privredna društva, ako zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "2",
    source_url: SRC_RS_ZPD,
    text: "For the purposes of this Law: 1) a company is a legal person established for the performance of economic activity; 2) a general partnership (o.d.) is a company in which two or more members are jointly and severally liable for the company's obligations with their entire assets; 3) a limited partnership (k.d.) is a company with at least one general partner with unlimited liability and at least one limited partner liable up to a contribution; 4) a limited liability company (d.o.o.) is a company whose members are liable for the company's obligations only up to their contributions; 5) a joint stock company (a.d.) is a company whose share capital is divided into shares.",
    text_local:
      "U smislu ovog zakona: 1) privredno društvo jeste pravno lice osnovano za obavljanje privredne delatnosti; 2) ortačko društvo jeste društvo u kome dva ili više članova solidarno odgovaraju za obaveze društva celokupnom svojinom; 3) komanditno društvo jeste društvo koje ima najmanje jednog komplementara sa neograničenom odgovornošću i najmanje jednog komanditista sa odgovornošću do visine uloženog kapitala; 4) društvo sa ograničenom odgovornošću jeste društvo čiji članovi odgovaraju za obaveze društva samo do visine svojih uloga; 5) akcionarsko društvo jeste društvo čiji je osnovni kapital podeljen na akcije.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "10",
    source_url: SRC_RS_ZPD,
    text: "A company acquires legal personality on the day of its registration in the business entities register in accordance with the registration act.",
    text_local:
      "Privredno društvo stiče pravnu ličnost danom upisa u registar privrednih subjekata, u skladu sa zakonom koji uređuje registraciju.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "139",
    source_url: SRC_RS_ZPD,
    text: "A limited liability company (d.o.o.) is a company in which one or more legal or natural persons (members) participate with contributions making up the share capital, and members are not liable for the company's obligations except as provided by this Law.",
    text_local:
      "Društvo sa ograničenom odgovornošću jeste društvo u kome jedno ili više pravnih ili fizičkih lica (članova) učestvuje ulogom koji čine osnovni kapital, pri čemu članovi ne odgovaraju za obaveze društva, osim u slučajevima predviđenim ovim zakonom.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "145",
    source_url: SRC_RS_ZPD,
    text: "A limited liability company is founded by a founding act concluded by all founders. The founding act determines the company name, seat, business activity, amount of share capital, members' contributions and management structure, unless this Law provides otherwise.",
    text_local:
      "Društvo sa ograničenom odgovornošću osniva se osnivačkim aktom koji zaključe svi osnivači. Osnivačkim aktom se određuju naziv društva, sedište, predmet poslovanja, visina osnovnog kapitala, ulozi članova i način upravljanja, osim ako ovim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "169",
    source_url: SRC_RS_ZPD,
    text: "Members exercise their rights at the general meeting in accordance with this Law and the company's articles of association. Each member has voting rights in proportion to their share in the share capital, unless the articles provide otherwise.",
    text_local:
      "Članovi ostvaruju svoja prava na skupštini društva, u skladu sa ovim zakonom i ugovorom o društvenom učešću. Svaki član ima pravo glasa u razmeri svog učešća u osnovnom kapitalu, osim ako ugovorom nije drukčije određeno.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "334",
    source_url: SRC_RS_ZPD,
    text: "A joint stock company (a.d.) is a company whose share capital is divided into shares. Shareholders are not liable for the company's obligations beyond the amount paid or payable for subscribed shares, except in cases provided by this Law.",
    text_local:
      "Akcionarsko društvo jeste društvo čiji je osnovni kapital podeljen na akcije. Akcionari ne odgovaraju za obaveze društva preko iznosa uplaćenog ili dospelog na pretplaćene akcije, osim u slučajevima predviđenim ovim zakonom.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Companies Act",
    law_name_local: "Zakon o privrednim društvima",
    law_category: "commercial",
    article_num: "368",
    source_url: SRC_RS_ZPD,
    text: "The board of directors manages the joint stock company within the limits of the law and the company's articles of association, unless the law provides that certain powers belong to the general meeting or the supervisory board.",
    text_local:
      "Upravni odbor upravlja akcionarskim društvom u granicama zakona i statuta društva, osim ako zakonom nije određeno da određena ovlašćenja pripadaju skupštini ili nadzornom odboru.",
  },

  // --- SERBIA: Zakon o parničnom postupku (RS OG 72/2011, consolidated Paragraf) ---
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "1",
    source_url: SRC_RS_ZPP,
    text:
      "This Law regulates the rules of procedure for the provision of judicial legal protection under which proceedings are conducted and decisions are rendered in civil actions for the resolution of disputes arising from violation of personality rights and disputes from family, labour, commercial, property and other civil-law relations, except for disputes for which a special law prescribes another type of procedure.",
    text_local:
      "Ovim zakonom uređuju se pravila postupka za pružanje sudske pravne zaštite po kojima se postupa i odlučuje u parnicama za rešavanje sporova nastalih povodom povrede prava ličnosti i sporova iz porodičnih, radnih, privrednih, imovinskopravnih i drugih građanskopravnih odnosa, osim sporova za koje je posebnim zakonom propisana druga vrsta postupka.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "3",
    source_url: SRC_RS_ZPP,
    text:
      "In civil proceedings, the court decides within the limits of the claims set in the proceedings.\n\nThe parties may freely dispose of the claims they have raised during the proceedings. The parties may waive their claim, admit the opposing party's claim, and conclude a settlement.\n\nThe court shall not allow dispositions of the parties that are contrary to mandatory provisions, public policy, rules of morality and good customs.",
    text_local:
      "U parničnom postupku sud odlučuje u granicama zahteva koji su postavljeni u postupku.\n\nStranke mogu slobodno da raspolažu zahtevima koje su postavile u toku postupka. Stranke mogu da se odreknu svog zahteva, priznaju zahtev protivne stranke i da se poravnaju.\n\nSud neće da dozvoli raspolaganja stranaka koja su u suprotnosti sa prinudnim propisima, javnim poretkom, pravilima morala i dobrim običajima.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "7",
    source_url: SRC_RS_ZPP,
    text:
      "The parties must state all facts on which they base their claims and propose evidence by which those facts are established.\n\nThe court shall consider and establish only facts alleged by the parties and shall take only evidence proposed by the parties, unless otherwise provided by law.\n\nThe court is authorised to establish facts that the parties have not alleged and to take evidence that the parties have not proposed, if it follows from the outcome of the hearing and taking of evidence that the parties dispose of claims which they may not dispose of (Article 3(3)).",
    text_local:
      "Stranke su dužne da iznesu sve činjenice na kojima zasnivaju svoje zahteve i da predlože dokaze kojima se utvrđuju te činjenice.\n\nSud će da razmotri i utvrdi samo činjenice koje su stranke iznele i da izvede samo dokaze koje su stranke predložile, ako zakonom nije drugačije propisano.\n\nSud je ovlašćen da utvrdi i činjenice koje stranke nisu iznele i izvede dokaze koje stranke nisu predložile, ako iz rezultata raspravljanja i dokazivanja proizlazi da stranke raspolažu zahtevima kojima ne mogu da raspolažu (član 3. stav 3).",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "10",
    source_url: SRC_RS_ZPP,
    text:
      "A party has the right to have the court decide on its claims and proposals within a reasonable time.\n\nThe court must conduct the proceedings without delay, in accordance with a previously set time frame for taking civil procedural actions (hereinafter: time frame) and with as little expense as possible.",
    text_local:
      "Stranka ima pravo da sud odluči o njenim zahtevima i predlozima u razumnom roku.\n\nSud je dužan da postupak sprovede bez odugovlačenja, u skladu sa prethodno određenim vremenskim okvirom za preduzimanje parničnih radnji (u daljem tekstu: vremenski okvir) i sa što manje troškova.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "72",
    source_url: SRC_RS_ZPP,
    text:
      "When a request for his or her exclusion or recusal is filed at a hearing, the judge shall complete the hearing that has begun. Until a decision on the request for exclusion or recusal is rendered, the judge shall take only those actions for which there is a risk of delay.\n\nIf the request for exclusion is granted, the court shall set aside all actions taken by the excluded judge.\n\nIf the request for recusal is granted, the court shall set aside actions taken after the request was filed, unless the parties agree that the actions taken are not to be set aside.\n\nWhere a request for exclusion or recusal is filed during deliberation before the second-instance court, the provisions of paragraphs 1 to 3 of this Article shall apply.",
    text_local:
      "Kad je podnet zahtev za njegovo isključenje ili izuzeće na ročištu, sudija će da dovrši započeto ročište. Do donošenja rešenja o zahtevu za isključenje ili izuzeće sudija će da preduzima samo one radnje za koje postoji opasnost od odlaganja.\n\nAko zahtev za isključenje bude usvojen, sud će da ukine sve radnje koje je preduzeo isključeni sudija.\n\nAko zahtev za izuzeće bude usvojen, sud će da ukine radnje koje su bile preduzete posle podnošenja zahteva, osim ako se stranke ne saglase da se preduzete radnje ne ukidaju.\n\nU slučaju podnošenja zahteva za isključenje ili izuzeće u toku rasprave pred drugostepenim sudom, primenjuju se odredbe st. 1. do 3. ovog člana.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "195",
    source_url: SRC_RS_ZPP,
    text:
      "If the decision in the dispute depends on whether a certain legal relationship that has become disputed in the course of the action exists or does not exist, the plaintiff may, in addition to the existing claim, assert a claim that the court establish that such a relationship exists or does not exist, if the court before which the action is pending has jurisdiction over such a claim.\n\nAsserting a claim within the meaning of paragraph 1 of this Article shall not be deemed an amendment of the complaint.",
    text_local:
      "Ako odluka o sporu zavisi od toga da li postoji ili ne postoji neki pravni odnos koji je u toku parnice postao sporan, tužilac može, pored postojećeg zahteva, da istakne zahtev da sud utvrdi da takav odnos postoji, odnosno da ne postoji, ako je sud pred kojim parnica teče nadležan za takav zahtev.\n\nIsticanje zahteva u smislu stava 1. ovog člana ne smatra se preinačenjem tužbe.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "298",
    source_url: SRC_RS_ZPP,
    text:
      "The defendant is obliged to state in the answer to the complaint procedural objections and to state whether he or she admits or disputes the claim asserted in the complaint. The answer to the complaint must also contain other particulars that every pleading must contain (Article 98).\n\nIf the defendant disputes the claim, the answer to the complaint must also contain the facts on which the defendant bases his or her allegations and the evidence by which those facts are established.\n\nA defendant who has domicile or residence, or seat, abroad is obliged to designate in the answer to the complaint an attorney for service of documents.\n\nIf a defendant who has domicile or residence, or seat, abroad fails to submit to the court, together with the answer to the complaint, the notification referred to in paragraph 3 of this Article, the court shall appoint an attorney for service of documents for him or her and inform him or her thereof.",
    text_local:
      "Tuženi je dužan da u odgovoru na tužbu istakne procesne prigovore i da se izjasni da li priznaje ili osporava istaknuti tužbeni zahtev. Odgovor na tužbu mora da sadrži i druge podatke koje mora sadržati svaki podnesak (član 98).\n\nAko tuženi osporava tužbeni zahtev, odgovor na tužbu mora da sadrži i činjenice na kojima tuženi zasniva svoje navode i dokaze kojima se utvrđuju te činjenice.\n\nTuženi koji ima prebivalište ili boravište, odnosno sedište u inostranstvu, dužan je da u odgovoru na tužbu odredi punomoćnika za primanje pismena.\n\nAko tuženi koji ima prebivalište ili boravište, odnosno sedište u inostranstvu, ne dostavi sudu obaveštenje iz stava 3. ovog člana zajedno sa odgovorom na tužbu, sud će da mu postavi punomoćnika za primanje pismena i da ga o tome obavesti.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "373",
    source_url: SRC_RS_ZPP,
    text:
      "A judgment may be challenged on grounds of:\n\n1) a material breach of provisions of civil procedure;\n\n2) incorrectly or incompletely established facts;\n\n3) incorrect application of substantive law.\n\nA judgment by default and a judgment in absentia may not be challenged on grounds of incorrectly or incompletely established facts.\n\nA judgment on the basis of admission and a judgment on the basis of waiver may be challenged on grounds of a material breach of provisions of civil procedure or because the statement of admission or waiver was given in error or under duress or fraud.",
    text_local:
      "Presuda može da se pobija zbog:\n\n1) bitne povrede odredaba parničnog postupka;\n\n2) pogrešno ili nepotpuno utvrđenog činjeničnog stanja;\n\n3) pogrešne primene materijalnog prava.\n\nPresuda zbog propuštanja i presuda zbog izostanka ne može da se pobija zbog pogrešno ili nepotpuno utvrđenog činjeničnog stanja.\n\nPresuda na osnovu priznanja i presuda na osnovu odricanja mogu da se pobijaju zbog bitne povrede odredaba parničnog postupka ili zbog toga što je izjava o priznanju, odnosno o odricanju data u zabludi ili pod uticajem prinude ili prevare.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Civil Procedure Code",
    law_name_local: "Zakon o parničnom postupku",
    law_category: "procedural",
    article_num: "401",
    source_url: SRC_RS_ZPP,
    text:
      "When deciding on an appeal, the second-instance court may:\n\n1) dismiss the appeal as untimely, incomplete, or inadmissible (Article 378 and Article 399(1));\n\n2) reject the appeal as unfounded and uphold the decision of the first-instance court;\n\n3) amend the decision or set it aside and, if necessary, return the case for a new hearing.",
    text_local:
      "Rešavajući o žalbi, drugostepeni sud može da:\n\n1) odbaci žalbu kao neblagovremenu, nepotpunu ili nedozvoljenu (član 378. i član 399. stav 1);\n\n2) odbije žalbu kao neosnovanu i potvrdi rešenje prvostepenog suda;\n\n3) preinači rešenje ili ga ukine i po potrebi predmet vrati na ponovni postupak.",
  },

  // --- SERBIA: Zakon o radu (additional articles) ---
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "33",
    source_url: SRC_RS_ZOR,
    text: "The parties may agree on a probationary period at the conclusion of the employment contract. The probationary period may not exceed six months unless otherwise provided by this Law for certain categories of employment.",
    text_local:
      "Stranke mogu da se sporazumeju o probnom radu pri zaključenju ugovora o radu. Probni rad ne može trajati duže od šest meseci, osim ako ovim zakonom nije drukčije određeno za određene vrste radnog odnosa.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "60",
    source_url: SRC_RS_ZOR,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed. Part-time work is work shorter than full-time in proportion to working hours.",
    text_local:
      "Puno radno vreme ne može biti duže od 40 časova nedeljno, osim ako je propisano kraće radno vreme. Nepuno radno vreme jeste rad kraći od punog radnog vremena u razmeri sa trajanjem radnog vremena.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "68",
    source_url: SRC_RS_ZOR,
    text: "Overtime work is work exceeding full-time working hours. Overtime may be ordered only when necessary to complete unplanned work and within limits and under conditions prescribed by this Law and collective agreement.",
    text_local:
      "Prekovremeni rad jeste rad duži od punog radnog vremena. Prekovremeni rad može da se naredi samo kada je to neophodno radi obavljanja neplaniranih poslova i u granicama i pod uslovima propisanim ovim zakonom i kolektivnim ugovorom.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "78",
    source_url: SRC_RS_ZOR,
    text: "The employee is entitled to paid annual leave in the duration prescribed by this Law and collective agreement, and may not waive that right.",
    text_local:
      "Zaposleni ima pravo na plaćeni godišnji odmor u trajanju propisanom ovim zakonom i kolektivnim ugovorom i ne može se odreći tog prava.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "119",
    source_url: SRC_RS_ZOR,
    text: "An employer may terminate an employment contract only if there is a lawful reason prescribed by this Law and the prescribed procedure is observed.",
    text_local:
      "Poslodavac može da raskine ugovor o radu samo ako postoji zakonit razlog propisan ovim zakonom i ako je poštovan propisani postupak.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "129",
    source_url: SRC_RS_ZOR,
    text: "Upon termination of employment in cases prescribed by this Law, the employee is entitled to severance pay under the conditions and in the amount determined by law, collective agreement and employment contract.",
    text_local:
      "Po prestanku radnog odnosa u slučajevima predviđenim ovim zakonom, zaposleni ima pravo na otpremninu pod uslovima i u visini određenoj zakonom, kolektivnim ugovorom i ugovorom o radu.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "195",
    source_url: SRC_RS_ZOR,
    text: "Labor disputes become time-barred in accordance with the statute of limitations rules prescribed by this Law for individual claims arising from employment.",
    text_local:
      "Radni sporovi zastaravaju u skladu sa pravilima o zastarelosti propisanim ovim zakonom za pojedinačna potraživanja koja proizilaze iz radnog odnosa.",
  },

  // --- CROATIA: Zakon o radu (NN 93/14) ---
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "1",
    source_url: SRC_HR_ZOR,
    text: "This Law regulates employment rights and obligations arising from employment relationships, the establishment and termination of employment, working time, rest, wages, safety at work and other issues relating to employment, unless otherwise provided by a special law.",
    text_local:
      "Ovaj Zakon uređuje prava i obveze proizlazeće iz radnih odnosa, uspostavljanje i prestanak rada, radno vrijeme, odmor, plaću, sigurnost na radu i druga pitanja koja se odnose na rad, ako posebnim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "4",
    source_url: SRC_HR_ZOR,
    text: "A worker, within the meaning of this Law, is a natural person who is employed by an employer and performs work for a salary under an employment contract.",
    text_local:
      "Radnik, u smislu ovoga Zakona, jest fizička osoba koja je u radnom odnosu kod poslodavca i obavlja rad za plaću na temelju ugovora o radu.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "7",
    source_url: SRC_HR_ZOR,
    text: "Direct and indirect discrimination against workers and persons seeking employment is prohibited on grounds prescribed by this Law.",
    text_local:
      "Zabranjena je neposredna i posredna diskriminacija radnika i osoba koje traže zaposlenje, a koja se temelji na osnovama propisanim ovim Zakonom.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "14",
    source_url: SRC_HR_ZOR,
    text: "An employment contract shall be concluded in writing before the worker commences work, unless otherwise provided by this Law.",
    text_local:
      "Ugovor o radu zaključuje se u pisanom obliku prije početka rada radnika, ako ovim Zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "19",
    source_url: SRC_HR_ZOR,
    text: "The employment contract must contain mandatory elements prescribed by this Law, including the parties, the type of work, place of work, duration of employment, working hours and remuneration.",
    text_local:
      "Ugovor o radu mora sadržavati obavezne elemente propisane ovim Zakonom, uključujući ugovorne strane, vrstu rada, mjesto rada, trajanje radnog odnosa, radno vrijeme i naknadu za rad.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "24",
    source_url: SRC_HR_ZOR,
    text: "The parties may agree on a probationary period at the conclusion of the employment contract within the limits prescribed by this Law.",
    text_local:
      "Stranke mogu ugovoriti probni rad pri zaključenju ugovora o radu u granicama propisanim ovim Zakonom.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "60",
    source_url: SRC_HR_ZOR,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed by law or collective agreement.",
    text_local:
      "Puno radno vrijeme ne može biti duže od 40 sati tjedno, osim ako zakonom ili kolektivnim ugovorom nije određeno kraće radno vrijeme.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "77",
    source_url: SRC_HR_ZOR,
    text: "The worker is entitled to annual leave in the duration prescribed by this Law and may not waive that right.",
    text_local:
      "Radnik ima pravo na godišnji odmor u trajanju propisanom ovim Zakonom i ne može se odreći tog prava.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "115",
    source_url: SRC_HR_ZOR,
    text: "Termination of employment by notice is governed by the prescribed reasons, notice periods and procedure, unless otherwise provided by this Law.",
    text_local:
      "Prestanak radnog odnosa otkazom uređuje se propisanim razlozima, otkaznim rokovima i postupkom, ako ovim Zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "125",
    source_url: SRC_HR_ZOR,
    text: "In cases prescribed by this Law, the worker is entitled to severance pay under the conditions and in the amount determined by law, collective agreement and employment contract.",
    text_local:
      "U slučajevima predviđenim ovim Zakonom radnik ima pravo na otpremninu pod uvjetima i u visini određenoj zakonom, kolektivnim ugovorom i ugovorom o radu.",
  },

  // --- CROATIA: Zakon o obveznim odnosima (NN 35/05) ---
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "1",
    source_url: SRC_HR_ZOO,
    text: "This Law regulates the general part of obligations law, contracts, torts, unjust enrichment, management of another's affairs without mandate and other sources of obligations, unless otherwise provided.",
    text_local:
      "Ovim Zakonom uređuje se opći dio obveznog prava, ugovori, delikti, ostvarivanje bez osnova, poslovođenje bez naloga i drugi izvori obveza, ako posebnim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "14",
    source_url: SRC_HR_ZOO,
    text: "Parties may freely regulate their obligations within the limits of mandatory provisions, public policy and good morals.",
    text_local:
      "Stranke mogu slobodno uređivati svoje obveze u granicama prisilnih propisa, javnog poretka i moralnih načela.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "247",
    source_url: SRC_HR_ZOO,
    text: "A contract is concluded when the offeror receives acceptance of the offer. Acceptance must correspond to the offer.",
    text_local:
      "Ugovor je zaključen kad ponuditelj primi prihvaćanje ponude. Prihvaćanje mora odgovarati ponudi.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "252",
    source_url: SRC_HR_ZOO,
    text: "Where a special form is prescribed for the conclusion of a contract, the contract is concluded when that form is satisfied.",
    text_local:
      "Kad je za zaključenje ugovora propisana posebna forma, ugovor je zaključen kad je ta forma ispunjena.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "1045",
    source_url: SRC_HR_ZOO,
    text: "Whoever causes damage to another must compensate it unless the damage occurred without fault on their part, as prescribed by this Law.",
    text_local:
      "Tko drugome prouzroči štetu dužan je je naknaditi, ako šteta nije nastala bez njegove krivnje, na način propisan ovim Zakonom.",
  },

  // --- SLOVENIA: ZDR-1 (Ur. l. RS 21/13) ---
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "1",
    source_url: SRC_SI_ZDR,
    text: "This Act regulates employment relationships, the rights and obligations of workers and employers, and other matters relating to employment, unless otherwise provided by law.",
    text_local:
      "Ta zakon ureja delovna razmerja, pravice in obveznosti delavcev in delodajalcev ter druga vprašanja v zvezi z zaposlovanjem, če zakon ne določi drugače.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "4",
    source_url: SRC_SI_ZDR,
    text: "A worker, within the meaning of this Act, is a natural person who performs dependent work for an employer under an employment contract.",
    text_local:
      "Delavec v smislu tega zakona je fizična oseba, ki za delodajalca opravlja podrejeno delo na podlagi pogodbe o zaposlitvi.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "9",
    source_url: SRC_SI_ZDR,
    text: "Direct and indirect discrimination against workers and jobseekers is prohibited on grounds prescribed by this Act.",
    text_local:
      "Neposredna in posredna diskriminacija delavcev in iskalcev zaposlitve je prepovedana na podlagah, ki jih določa ta zakon.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "17",
    source_url: SRC_SI_ZDR,
    text: "An employment contract must be concluded in writing before the worker commences work, unless this Act provides otherwise.",
    text_local:
      "Pogodba o zaposlitvi se sklene v pisni obliki pred začetkom dela delavca, če ta zakon ne določa drugače.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "31",
    source_url: SRC_SI_ZDR,
    text: "The parties may agree on a probationary period at the conclusion of the employment contract within the limits prescribed by this Act.",
    text_local:
      "Pogodbeni stranki lahko ob sklenitvi pogodbe o zaposlitvi dogovorita poskusno obdobje v mejah, ki jih določa ta zakon.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "142",
    source_url: SRC_SI_ZDR,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed by law or collective agreement.",
    text_local:
      "Polni delovni čas ne sme presegati 40 ur na teden, razen če zakon ali kolektivna pogodba določa krajši delovni čas.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "159",
    source_url: SRC_SI_ZDR,
    text: "The worker is entitled to annual leave under the conditions and for the duration prescribed by this Act.",
    text_local:
      "Delavec ima pravico do letnega dopusta pod pogoji in v trajanju, ki ju določa ta zakon.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "83",
    source_url: SRC_SI_ZDR,
    text: "Termination of employment by notice is subject to the prescribed reasons, notice periods and procedure, unless otherwise provided by this Act.",
    text_local:
      "Prenehanje pogodbe o zaposlitvi z odpovedjo je podloženo predpisanim razlogom, odpovednim rokom in postopku, če ta zakon ne določa drugače.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Employment Relationships Act (ZDR-1)",
    law_name_local: "Zakon o delovnih razmerjih (ZDR-1)",
    law_category: "labor",
    article_num: "108",
    source_url: SRC_SI_ZDR,
    text: "In cases prescribed by this Act, the worker is entitled to severance pay under the conditions and in the amount determined by law, collective agreement and employment contract.",
    text_local:
      "V primerih, ki jih določa ta zakon, ima delavec pravico do odpravnine pod pogoji in v višini, ki jih določajo zakon, kolektivna pogodba in pogodba o zaposlitvi.",
  },

  // --- SLOVENIA: Obligacijski zakonik (OZ) (Ur. l. RS 83/01) ---
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "1",
    source_url: SRC_SI_OZ,
    text: "This Code regulates obligations arising from contracts, torts, unjust enrichment, management of another's affairs without mandate and other sources of obligations, unless otherwise provided.",
    text_local:
      "Ta zakonik ureja obveznosti iz pogodb, iz krivdnih deliktov, iz stvarjenja brez pravne podlage, iz poslovodenja brez naloga in druge vire obveznosti, če ni z zakonom določeno drugače.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "3",
    source_url: SRC_SI_OZ,
    text: "Parties may freely regulate their contractual relations within the limits of mandatory provisions, public policy and good morals.",
    text_local:
      "Pogodbeni stranki lahko prosto urejata svoje pogodbene odnose v mejah prisilnih določb, javnega reda in moralnih načel.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "51",
    source_url: SRC_SI_OZ,
    text: "Where a special form is prescribed for the conclusion of a contract, the contract is concluded when that form is satisfied.",
    text_local:
      "Kadar je za sklenitev pogodbe predpisana posebna oblika, je pogodba sklenjena, ko je ta oblika izpolnjena.",
  },

  // --- BiH FEDERATION: Zakon o radu FBiH (SN 26/16) — manual texts ---
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "1",
    source_url: SRC_BIH_FBIH_RAD,
    text: "This Law regulates employment relationships, rights and obligations arising from employment, and other issues relating to employment in the Federation of Bosnia and Herzegovina, unless otherwise provided by law.",
    text_local:
      "Ovim zakonom uređuju se radni odnosi, prava i obaveze iz radnog odnosa i druga pitanja u vezi sa radom na području Federacije Bosne i Hercegovine, ako zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "5",
    source_url: SRC_BIH_FBIH_RAD,
    text: "A worker, within the meaning of this Law, is a natural person who performs dependent work for an employer under an employment contract.",
    text_local:
      "Radnik, u smislu ovog zakona, jeste fizičko lice koje kod poslodavca obavlja rad na osnovu ugovora o radu.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "19",
    source_url: SRC_BIH_FBIH_RAD,
    text: "An employment contract shall be concluded in writing before the worker commences work, unless this Law provides otherwise.",
    text_local:
      "Ugovor o radu zaključuje se u pisanom obliku prije početka rada radnika, osim ako ovim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "21",
    source_url: SRC_BIH_FBIH_RAD,
    text: "The employment contract must contain the mandatory elements prescribed by this Law, including the parties, type of work, place of work, duration of employment, working hours and remuneration.",
    text_local:
      "Ugovor o radu mora sadržavati obavezne elemente propisane ovim zakonom, uključujući ugovorne strane, vrstu rada, mjesto rada, trajanje radnog odnosa, radno vrijeme i naknadu za rad.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "26",
    source_url: SRC_BIH_FBIH_RAD,
    text: "The parties may agree on a probationary period at the conclusion of the employment contract within the limits prescribed by this Law.",
    text_local:
      "Stranke mogu ugovoriti probni rad pri zaključenju ugovora o radu u granicama propisanim ovim zakonom.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "57",
    source_url: SRC_BIH_FBIH_RAD,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed by law or collective agreement.",
    text_local:
      "Puno radno vrijeme ne može biti duže od 40 sati sedmično, osim ako je zakonom ili kolektivnim ugovorom propisano kraće radno vrijeme.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "66",
    source_url: SRC_BIH_FBIH_RAD,
    text: "The worker is entitled to annual leave in the duration prescribed by this Law and may not waive that right.",
    text_local:
      "Radnik ima pravo na godišnji odmor u trajanju propisanom ovim zakonom i ne može se odreći tog prava.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "96",
    source_url: SRC_BIH_FBIH_RAD,
    text: "The employer may terminate employment only for lawful reasons and in accordance with the procedure prescribed by this Law.",
    text_local:
      "Poslodavac može raskinuti radni odnos samo iz razloga propisanih zakonom i u skladu sa postupkom predviđenim ovim zakonom.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Labor Law (FBiH)",
    law_name_local: "Zakon o radu Federacije Bosne i Hercegovine",
    law_category: "labor",
    article_num: "107",
    source_url: SRC_BIH_FBIH_RAD,
    text: "In cases prescribed by this Law, the worker is entitled to severance pay under the conditions and in the amount determined by law, collective agreement and employment contract.",
    text_local:
      "U slučajevima predviđenim ovim zakonom radnik ima pravo na otpremninu pod uslovima i u visini određenoj zakonom, kolektivnim ugovorom i ugovorom o radu.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "1",
    source_url: SRC_BIH_FBIH_OOD,
    text: "This Law regulates obligations arising from contracts, torts, unjust enrichment, management of another's affairs without mandate and other sources of obligations, unless otherwise provided.",
    text_local:
      "Ovim zakonom uređuju se obligacioni odnosi koji nastaju iz ugovora, prouzrokovanja štete, sticanja bez osnova, poslovodstva bez naloga i drugi izvori obveza, ako posebnim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "10",
    source_url: SRC_BIH_FBIH_OOD,
    text: "Parties may freely regulate their obligations within the limits of mandatory provisions, public policy and good morals.",
    text_local:
      "Stranke mogu slobodno uređivati svoje obveze u granicama prisilnih propisa, javnog poretka i moralnih načela.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "17",
    source_url: SRC_BIH_FBIH_OOD,
    text: "Where a special form is prescribed for the conclusion of a contract, the contract is concluded when that form is satisfied.",
    text_local:
      "Kad je za zaključenje ugovora propisana posebna forma, ugovor je zaključen kad je ta forma ispunjena.",
  },

  // --- Republika Srpska: Zakon o radu RS (SG 01/16) — manual texts ---
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "1",
    source_url: SRC_BIH_RS_RAD,
    text: "This Law regulates employment relationships, rights and obligations arising from employment, and other issues relating to employment in Republika Srpska, unless otherwise provided by law.",
    text_local:
      "Ovim zakonom uređuju se radni odnosi, prava i obaveze iz radnog odnosa i druga pitanja u vezi sa radom na području Republike Srpske, ako zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "5",
    source_url: SRC_BIH_RS_RAD,
    text: "A worker, within the meaning of this Law, is a natural person who performs dependent work for an employer under an employment contract.",
    text_local:
      "Radnik, u smislu ovog zakona, jeste fizičko lice koje kod poslodavca obavlja rad na osnovu ugovora o radu.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "24",
    source_url: SRC_BIH_RS_RAD,
    text: "An employment contract shall be concluded in writing before the worker commences work, unless this Law provides otherwise.",
    text_local:
      "Ugovor o radu zaključuje se u pisanom obliku pre početka rada radnika, osim ako ovim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "26",
    source_url: SRC_BIH_RS_RAD,
    text: "The employment contract must contain the mandatory elements prescribed by this Law.",
    text_local:
      "Ugovor o radu mora sadržati obavezne elemente propisane ovim zakonom.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "29",
    source_url: SRC_BIH_RS_RAD,
    text: "The parties may agree on a probationary period at the conclusion of the employment contract within the limits prescribed by this Law.",
    text_local:
      "Stranke mogu da se sporazumeju o probnom radu pri zaključenju ugovora o radu u granicama propisanim ovim zakonom.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "56",
    source_url: SRC_BIH_RS_RAD,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed.",
    text_local:
      "Puno radno vrijeme ne može biti duže od 40 časova nedeljno, osim ako je propisano kraće radno vrijeme.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "69",
    source_url: SRC_BIH_RS_RAD,
    text: "The worker is entitled to annual leave in the duration prescribed by this Law.",
    text_local:
      "Radnik ima pravo na godišnji odmor u trajanju propisanom ovim zakonom.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "175",
    source_url: SRC_BIH_RS_RAD,
    text: "Employment terminates in cases and in accordance with the procedure prescribed by this Law.",
    text_local:
      "Radni odnos prestaje u slučajevima i po postupku propisanom ovim zakonom.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Labor Law (Republika Srpska)",
    law_name_local: "Zakon o radu Republike Srpske",
    law_category: "labor",
    article_num: "185",
    source_url: SRC_BIH_RS_RAD,
    text: "In cases prescribed by this Law, the worker is entitled to severance pay under the conditions and in the amount determined by law, collective agreement and employment contract.",
    text_local:
      "U slučajevima predviđenim ovim zakonom radnik ima pravo na otpremninu pod uslovima i u visini određenoj zakonom, kolektivnim ugovorom i ugovorom o radu.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "1",
    source_url: SRC_BIH_RS_OOD,
    text: "This Law regulates obligations arising from contracts, torts, unjust enrichment, management of another's affairs without mandate and other sources of obligations, unless otherwise provided.",
    text_local:
      "Ovim zakonom uređuju se obligacioni odnosi koji nastaju iz ugovora, prouzrokovanja štete, sticanja bez osnova, poslovodstva bez naloga i drugi izvori obveza, ako posebnim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "10",
    source_url: SRC_BIH_RS_OOD,
    text: "Parties may freely regulate their obligations within the limits of mandatory provisions, public policy and good morals.",
    text_local:
      "Stranke mogu slobodno uređivati svoje obveze u granicama prisilnih propisa, javnog poretka i moralnih načela.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "17",
    source_url: SRC_BIH_RS_OOD,
    text: "Where a special form is prescribed for the conclusion of a contract, the contract is concluded when that form is satisfied.",
    text_local:
      "Kad je za zaključenje ugovora propisana posebna forma, ugovor je zaključen kad je ta forma ispunjena.",
  },

  // --- Brčko District: Zakon o radu — manual texts ---
  {
    jurisdiction: "bih_brcko",
    law_name: "Labor Law (Brčko District)",
    law_name_local: "Zakon o radu Brčko distrikta BiH",
    law_category: "labor",
    article_num: "1",
    source_url: SRC_BIH_BRCKO_RAD,
    text: "This Law regulates employment relationships, rights and obligations arising from employment, and other issues relating to employment in the Brčko District of Bosnia and Herzegovina, unless otherwise provided by law.",
    text_local:
      "Ovim zakonom uređuju se radni odnosi, prava i obaveze iz radnog odnosa i druga pitanja u vezi sa radom na području Brčko distrikta Bosne i Hercegovine, ako zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Labor Law (Brčko District)",
    law_name_local: "Zakon o radu Brčko distrikta BiH",
    law_category: "labor",
    article_num: "4",
    source_url: SRC_BIH_BRCKO_RAD,
    text: "A worker, within the meaning of this Law, is a natural person who performs dependent work for an employer under an employment contract.",
    text_local:
      "Radnik, u smislu ovog zakona, jeste fizičko lice koje kod poslodavca obavlja rad na osnovu ugovora o radu.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Labor Law (Brčko District)",
    law_name_local: "Zakon o radu Brčko distrikta BiH",
    law_category: "labor",
    article_num: "16",
    source_url: SRC_BIH_BRCKO_RAD,
    text: "An employment contract shall be concluded in writing before the worker commences work, unless this Law provides otherwise.",
    text_local:
      "Ugovor o radu zaključuje se u pisanom obliku prije početka rada radnika, osim ako ovim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Labor Law (Brčko District)",
    law_name_local: "Zakon o radu Brčko distrikta BiH",
    law_category: "labor",
    article_num: "54",
    source_url: SRC_BIH_BRCKO_RAD,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed by law or collective agreement.",
    text_local:
      "Puno radno vrijeme ne može biti duže od 40 sati sedmično, osim ako je zakonom ili kolektivnim ugovorom propisano kraće radno vrijeme.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Labor Law (Brčko District)",
    law_name_local: "Zakon o radu Brčko distrikta BiH",
    law_category: "labor",
    article_num: "62",
    source_url: SRC_BIH_BRCKO_RAD,
    text: "The worker is entitled to annual leave in the duration prescribed by this Law.",
    text_local:
      "Radnik ima pravo na godišnji odmor u trajanju propisanom ovim zakonom.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Labor Law (Brčko District)",
    law_name_local: "Zakon o radu Brčko distrikta BiH",
    law_category: "labor",
    article_num: "99",
    source_url: SRC_BIH_BRCKO_RAD,
    text: "Employment terminates in cases and in accordance with the procedure prescribed by this Law.",
    text_local:
      "Radni odnos prestaje u slučajevima i po postupku propisanom ovim zakonom.",
  },

  // --- MONTENEGRO: Zakon o radu / Zakon o obligacionim odnosima — manual texts ---
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "1",
    source_url: SRC_ME_RAD,
    text: "This Law regulates employment relationships, rights and obligations arising from employment, and other issues relating to employment in Montenegro, unless otherwise provided by law.",
    text_local:
      "Ovim zakonom uređuju se radni odnosi, prava i obaveze iz radnog odnosa i druga pitanja u vezi sa radom u Crnoj Gori, ako zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "5",
    source_url: SRC_ME_RAD,
    text: "A worker, within the meaning of this Law, is a natural person who performs dependent work for an employer under an employment contract.",
    text_local:
      "Radnik, u smislu ovog zakona, jeste fizičko lice koje kod poslodavca obavlja rad na osnovu ugovora o radu.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "18",
    source_url: SRC_ME_RAD,
    text: "An employment contract shall be concluded in writing before the worker commences work, unless this Law provides otherwise.",
    text_local:
      "Ugovor o radu zaključuje se u pisanom obliku pre početka rada radnika, osim ako ovim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "20",
    source_url: SRC_ME_RAD,
    text: "The employment contract must contain the mandatory elements prescribed by this Law.",
    text_local:
      "Ugovor o radu mora sadržati obavezne elemente propisane ovim zakonom.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "23",
    source_url: SRC_ME_RAD,
    text: "The parties may agree on a probationary period at the conclusion of the employment contract within the limits prescribed by this Law.",
    text_local:
      "Stranke mogu ugovoriti probni rad pri zaključenju ugovora o radu u granicama propisanim ovim zakonom.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "54",
    source_url: SRC_ME_RAD,
    text: "Full-time work may not exceed 40 hours per week unless a shorter working time is prescribed.",
    text_local:
      "Puno radno vrijeme ne može biti duže od 40 sati sedmično, osim ako je propisano kraće radno vrijeme.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "65",
    source_url: SRC_ME_RAD,
    text: "The worker is entitled to annual leave in the duration prescribed by this Law.",
    text_local:
      "Radnik ima pravo na godišnji odmor u trajanju propisanom ovim zakonom.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "143",
    source_url: SRC_ME_RAD,
    text: "Employment terminates in cases and in accordance with the procedure prescribed by this Law.",
    text_local:
      "Radni odnos prestaje u slučajevima i po postupku propisanom ovim zakonom.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Labor Law",
    law_name_local: "Zakon o radu",
    law_category: "labor",
    article_num: "155",
    source_url: SRC_ME_RAD,
    text: "In cases prescribed by this Law, the worker is entitled to severance pay under the conditions and in the amount determined by law, collective agreement and employment contract.",
    text_local:
      "U slučajevima predviđenim ovim zakonom radnik ima pravo na otpremninu pod uslovima i u visini određenoj zakonom, kolektivnim ugovorom i ugovorom o radu.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "1",
    source_url: SRC_ME_OOD,
    text: "This Law regulates obligations arising from contracts, torts, unjust enrichment, management of another's affairs without mandate and other sources of obligations, unless otherwise provided.",
    text_local:
      "Ovim zakonom uređuju se obligacioni odnosi koji nastaju iz ugovora, prouzrokovanja štete, sticanja bez osnova, poslovodstva bez naloga i drugi izvori obveza, ako posebnim zakonom nije drukčije određeno.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "12",
    source_url: SRC_ME_OOD,
    text: "Parties may freely regulate their obligations within the limits of mandatory provisions, public policy and good morals.",
    text_local:
      "Stranke mogu slobodno uređivati svoje obveze u granicama prisilnih propisa, javnog poretka i moralnih načela.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "19",
    source_url: SRC_ME_OOD,
    text: "Where a special form is prescribed for the conclusion of a contract, the contract is concluded when that form is satisfied.",
    text_local:
      "Kad je za zaključenje ugovora propisana posebna forma, ugovor je zaključen kad je ta forma ispunjena.",
  },
  ...CIVIL_PRIORITY_ARTICLES,
]
