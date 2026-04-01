import type { LegalArticleAppend } from "./legal-articles-append"

const SRC_RS_ZOO = "https://www.paragraf.rs/propisi/zakon_o_obligacionim_odnosima.html"
const SRC_HR_ZOO = "https://www.zakon.hr/z/75/Zakon-o-obveznim-odnosima"
const SRC_SI_OZ = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO1263"
const SRC_GOOGLE_FBIH_OOD =
  "https://www.google.com/search?q=Zakon+o+obligacionim+odnosima+FBiH+SN+29/03"
const SRC_GOOGLE_RS_OOD =
  "https://www.google.com/search?q=Zakon+o+obligacionim+odnosima+RS+SG+17/93"
const SRC_GOOGLE_ME_OOD =
  "https://www.google.com/search?q=Zakon+o+obligacionim+odnosima+CG+SL+47/08"
const SRC_BIH_BRCKO_OOD =
  "Službeni glasnik Brčko distrikta BiH — Zakon o obligacionim odnosima Brčko distrikta BiH"
const SRC_SN_FBIH_29_03 = "SN FBiH 29/03"
const SRC_SG_RS_17_93 = "SG RS 17/93"
const SRC_OG_BRCKO_DISTRICT = "Official Gazette Brčko District"
const SRC_SL_CG_47_08 = "SL CG 47/08"
/** High-priority civil (contracts, sale, default, damages) — appended after base ADDITIONAL_LEGAL_ARTICLES. */
export const CIVIL_PRIORITY_ARTICLES: LegalArticleAppend[] = [
  // --- SERBIA: Zakon o obligacionim odnosima (Paragraf) ---
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "41",
    source_url: SRC_RS_ZOO,
    text: "If the offeree states that it accepts the offer and at the same time proposes that it be amended or supplemented, it is deemed to have rejected the offer and to have made a new offer to the original offeror.",
    text_local:
      "Ako ponuđeni izjavi da prihvata ponudu i istovremeno predloži da se ona u nečemu izmeni ili dopuni, smatra se da je ponudu odbio i da je sa svoje strane učinio drugu ponudu svome ranijem ponudiocu.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "46",
    source_url: SRC_RS_ZOO,
    text: "(1) A contractual obligation may consist in giving, doing, refraining from doing, or allowing something.\n\n(2) It must be possible, permissible, and definite or capable of being made definite.",
    text_local:
      "(1) Ugovorna obaveza može se sastojati u davanju, činjenju, nečinjenju ili trpljenju.\n\n(2) Ona mora biti moguća, dopuštena i određena, odnosno odrediva.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "105",
    source_url: SRC_RS_ZOO,
    text: "(1) Nullity of a provision of a contract does not entail nullity of the contract itself if the contract can subsist without the null provision and that provision was neither a condition of the contract nor the decisive motive for which the contract was concluded.\n\n(2) The contract shall nevertheless remain in force even if the null provision was a condition or decisive motive of the contract where nullity is established precisely so that the contract is freed from that provision and remains valid without it.",
    text_local:
      "(1) Ništavost neke odredbe ugovora ne povlači ništavost i samog ugovora, ako on može opstati bez ništave odredbe, i ako ona nije bila ni uslov ugovora ni odlučujuća pobuda zbog koje je ugovor zaključen.\n\n(2) Ali će ugovor ostati na snazi čak i ako je ništava odredba bila uslov ili odlučujuća pobuda ugovora u slučaju kad je ništavost ustanovljena upravo da bi ugovor bio oslobođen te odredbe i važio bez nje.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "210",
    source_url: SRC_RS_ZOO,
    text: "(1) Where part of one person's assets has passed in any way to another person's assets and that transfer has no basis in a legal transaction or in law, the acquirer must return it, and where that is impossible, compensate the value of the benefit obtained.\n\n(2) The duty to return or compensate value also arises where something is received on a basis that fails to materialise or later falls away.",
    text_local:
      "(1) Kad je neki deo imovine jednog lica prešao na bilo koji način u imovinu nekog drugog lica, a taj prelaz nema svoj osnov u nekom pravnom poslu ili u zakonu, sticalac je dužan da ga vrati, a kad to nije moguće - da naknadi vrednost postignutih koristi.\n\n(2) Obaveza vraćanja, odnosno naknade vrednosti nastaje i kad se nešto primi s obzirom na osnov koji se nije ostvario ili koji je kasnije otpao.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "277",
    source_url: SRC_RS_ZOO,
    text: "(1) A debtor who is late in performing a monetary obligation owes, in addition to the principal, default interest at the rate determined by federal law.\n\n(2) If the agreed interest rate is higher than the default interest rate, it continues to run after the debtor's default as well.",
    text_local:
      "(1) Dužnik koji zadocni sa ispunjenjem novčane obaveze duguje, pored glavnice, i zateznu kamatu po stopi utvrđenoj saveznim zakonom.\n\n(2) Ako je stopa ugovorene kamate viša od stope zatezne kamate, ona teče i posle dužnikove docnje.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_RS_ZOO,
    text: "If a monetary obligation is expressed in foreign currency or gold, performance may be demanded in domestic currency at the exchange rate applicable at the time of performance.",
    text_local:
      "Ako novčana obaveza glasi na plaćanje u nekoj stranoj valuti ili zlatu, njeno ispunjenje se može zahtevati u domaćem novcu prema kursu koji važi u trenutku ispunjenja obaveze.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "458",
    source_url: SRC_RS_ZOO,
    text: "(1) The subject matter of a contract must be in commerce; a contract for the sale of a thing outside commerce is void.\n\n(2) Special regulations apply to the sale of things whose circulation is restricted.\n\n(3) A sale may also relate to a future thing.",
    text_local:
      "(1) Stvar o kojoj je ugovor mora biti u prometu, te je ništav ugovor o prodaji stvari koja je van prometa.\n\n(2) Za prodaju stvari čiji je promet ograničen važe posebni propisi.\n\n(3) Prodaja se može odnositi i na buduću stvar.",
  },
  {
    jurisdiction: "serbia",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "488",
    source_url: SRC_RS_ZOO,
    text: "(1) A buyer who has duly and in good time notified the seller of a defect may: 1) require the seller to remove the defect or deliver another thing without defect (performance of the contract); 2) require a price reduction; 3) declare that it terminates the contract.\n\n(2) In each of these cases the buyer is also entitled to damages.\n\n(3) In addition, and independently thereof, the seller is liable to the buyer for damage suffered by the buyer to its other property because of the defect, under the general rules on liability for damage.",
    text_local:
      "(1) Kupac koji je blagovremeno i uredno obavestio prodavca o nedostatku može: 1) zahtevati od prodavca da nedostatak ukloni ili da mu preda drugu stvar bez nedostatka (ispunjenje ugovora); 2) zahtevati sniženje cene; 3) izjaviti da raskida ugovor.\n\n(2) U svakom od ovih slučajeva kupac ima pravo i na naknadu štete.\n\n(3) Pored toga, i nezavisno od toga, prodavac odgovara kupcu i za štetu koju je ovaj zbog nedostatka stvari pretrpeo na drugim svojim dobrima, i to prema opštim pravilima o odgovornosti za štetu.",
  },

  // --- CROATIA: Zakon o obveznim odnosima (zakon.hr) ---
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "322",
    source_url: SRC_HR_ZOO,
    text: "(1) A contract contrary to the Constitution of the Republic of Croatia, mandatory regulations or the morals of society is void, unless the purpose of the infringed rule points to another legal consequence or the law provides otherwise in a particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains valid unless the law provides otherwise for that case, and the party that breached the statutory prohibition bears the appropriate consequences.",
    text_local:
      "(1) Ugovor koji je protivan Ustavu Republike Hrvatske, prisilnim propisima ili moralu društva ništetan je, osim ako cilj povrijeđenog pravila ne upućuje na neku drugu pravnu posljedicu ili ako zakon u određenom slučaju ne propisuje što drugo.\n\n(2) Ako je sklapanje određenog ugovora zabranjeno samo jednoj strani, ugovor je valjan ako u zakonu nije što drugo predviđeno za određeni slučaj, a strana koja je povrijedila zakonsku zabranu snosit će odgovarajuće posljedice.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "327",
    source_url: SRC_HR_ZOO,
    text: "(1) The court examines nullity on its own motion and any interested person may invoke it.\n\n(2) The State Attorney General also has the right to seek a finding of nullity.",
    text_local:
      "(1) Na ništetnost sud pazi po službenoj dužnosti i na nju se može pozivati svaka zainteresirana osoba.\n\n(2) Pravo zahtijevati utvrđenje ništetnosti ima i državni odvjetnik.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "362",
    source_url: SRC_HR_ZOO,
    text: "(1) Where performance within a fixed time is not an essential element of the contract, the debtor retains the right to perform after expiry of the time and the creditor may demand performance.\n\n(2) If the creditor wishes to terminate the contract, it must grant the debtor an adequate additional period for performance.\n\n(3) If the debtor does not perform within the additional period, the same consequences apply as when time is an essential element of the contract.",
    text_local:
      "(1) Kad ispunjenje obveze u određenom roku nije bitan sastojak ugovora, dužnik zadržava pravo da i nakon isteka roka ispuni svoju obvezu, a vjerovnik da zahtijeva njezino ispunjenje.\n\n(2) Ali ako vjerovnik želi raskinuti ugovor, mora ostaviti dužniku primjeren naknadni rok za ispunjenje.\n\n(3) Ako dužnik ne ispuni obvezu u naknadnom roku, nastupaju iste posljedice kao i u slučaju kad je rok bitan sastojak ugovora.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "183",
    source_url: SRC_HR_ZOO,
    text: "(1) A debtor is in default when it fails to perform within the time fixed for performance.\n\n(2) If no time for performance is fixed, the debtor is in default when the creditor calls on it to perform, orally or in writing, by extrajudicial warning or by commencing proceedings aimed at obtaining performance.",
    text_local:
      "(1) Dužnik dolazi u zakašnjenje kad ne ispuni obvezu u roku određenom za ispunjenje.\n\n(2) Ako rok za ispunjenje nije određen, dužnik dolazi u zakašnjenje kad ga vjerovnik pozove da ispuni obvezu, usmeno ili pisano, izvansudskom opomenom ili započinjanjem nekog postupka čiji je cilj da se postigne ispunjenje obveze.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "320",
    source_url: SRC_HR_ZOO,
    text: "(1) Where a contract is concluded on the basis of a pre-printed form, or where one party has otherwise prepared and proposed the contract, unclear provisions shall be interpreted in favour of the other party.\n\n(2) Unclear provisions in a gratuitous contract shall be interpreted in the sense less onerous for the debtor, and in an onerous contract in the sense that achieves a fair balance of mutual performances.",
    text_local:
      "(1) U slučaju kad je ugovor sklopljen prema unaprijed otisnutom sadržaju, ili kad je ugovor na drugi način pripremila i predložila jedna ugovorna strana, nejasne odredbe tumačit će se u korist druge strane.\n\n(2) Nejasne odredbe u besplatnom ugovoru treba tumačiti u smislu koji je manje tegotan za dužnika, a u naplatnom u smislu kojim se ostvaruje pravičan odnos uzajamnih činidaba.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "454",
    source_url: SRC_HR_ZOO,
    text: "(1) If the buyer has sold the thing and transferred ownership to a third person without notifying the seller, and the third person knew or could not have remained unaware that the seller had a right of first refusal, the seller may, within six months from the day it learned of the transfer, demand annulment of the transfer and that the thing be sold to it on the same terms.\n\n(2) If the buyer incorrectly informed the seller of the terms of sale to the third person, and the third person knew or could not have remained unaware of this, the six-month period runs from the day the seller learned the true terms.\n\n(3) The right of first refusal ceases in any event after five years from transfer of ownership to the third person.",
    text_local:
      "(1) Ako je kupac prodao stvar i prenio vlasništvo na trećega ne obavijestivši prodavatelja, i ako je trećemu bilo poznato ili mu nije moglo ostati nepoznato da prodavatelj ima pravo prvokupa, prodavatelj može u roku od šest mjeseci računajući od dana kad je saznao za taj prijenos zahtijevati da se prijenos poništi i da se stvar njemu proda pod istim uvjetima.\n\n(2) Ako je kupac netočno obavijestio prodavatelja o uvjetima prodaje trećemu, i ako je trećemu to bilo poznato ili mu nije moglo ostati nepoznato, ovaj rok od šest mjeseci počinje teći od dana kad je prodavatelj saznao za točne uvjete ugovora.\n\n(3) Pravo prvokupa prestaje u svakom slučaju nakon proteka pet godina od prijenosa vlasništva stvari na trećega.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "468",
    source_url: SRC_HR_ZOO,
    text: "(1) The seller may terminate the contract if the buyer is late with the initial instalment.\n\n(2) After payment of the initial instalment the seller may terminate the contract if the buyer is late with at least two consecutive instalments that together amount to at least one eighth of the price.\n\n(3) Exceptionally, the seller may terminate the contract when the buyer is late with payment of only one instalment if payment of the entire remainder was scheduled in no more than four instalments.\n\n(4) In the cases referred to in paragraphs (2) and (3), the seller may, instead of terminating the contract, demand payment of the entire remainder from the buyer, but before that demand must grant the buyer an additional period of fifteen days.",
    text_local:
      "(1) Prodavatelj može raskinuti ugovor ako kupac dođe u zakašnjenje s početnom otplatom.\n\n(2) Nakon isplate početne otplate prodavatelj može raskinuti ugovor ako kupac dođe u zakašnjenje s najmanje dvije uzastopne otplate, koje čine najmanje osminu cijene.\n\n(3) Iznimno, prodavatelj može raskinuti ugovor kad kupac dođe u zakašnjenje s isplatom samo jedne otplate, ako za isplatu cijelog ostatka cijene nije predviđeno više od četiri otplate.\n\n(4) U slučajevima predviđenim u stavku 2. i 3. ovoga članka, prodavatelj može, umjesto da raskine ugovor, zahtijevati od kupca isplatu cijelog ostatka cijene, ali je prije toga zahtjeva dužan ostaviti kupcu naknadni rok od petnaest dana.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "479",
    source_url: SRC_HR_ZOO,
    text: "(1) A contract of gift arises when the donor undertakes to transfer a thing or property right to the donee without counter-performance and the donee accepts.\n\n(2) Forgiveness of debt and payment of debt with the debtor's consent are also deemed gifts.\n\n(3) Renunciation of inheritance, renunciation of a right before it is acquired or while it is disputed, performance of a moral duty, and transfer to another of a thing or right with intent to bind the other to counter-performance are not deemed gifts.",
    text_local:
      "(1) Ugovor o darovanju nastaje kad se darovatelj obveže prepustiti obdareniku bez protučinidbe stvar ili imovinsko pravo, a obdarenik to prihvati.\n\n(2) Darovanjem se smatraju također oprost i isplata duga uz dužnikovu suglasnost.\n\n(3) Ne smatraju se darovanjem odricanje od nasljedstva, odricanje od prava prije nego je stečeno ili prava koje je sporno, ispunjenje neke moralne obveze i prenošenje na drugoga stvari ili prava s namjerom da ga se obveže na protučinidbu.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "270",
    source_url: SRC_HR_ZOO,
    text: "(1) Where the performance is impossible, impermissible, undetermined or indeterminable, the contract is void.\n\n(2) However, a contract concluded under a suspensive condition or time limit remains valid if, before fulfilment of the condition or expiry of the time limit, the performance has become possible, permissible, determined or determinable.",
    text_local:
      "(1) Kad je činidba nemoguća, nedopuštena, neodređena ili neodrediva, ugovor je ništetan.\n\n(2) Ali ugovor sklopljen pod odgodnim uvjetom ili rokom valjan je ako je prije ispunjenja uvjeta, odnosno isteka roka činidba postala moguća, dopuštena, određena ili odrediva.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "275",
    source_url: SRC_HR_ZOO,
    text: "(1) Where the articles of association, social contract or rules of a legal person provide and register that its representative may conclude a certain contract only with the consent of one of its bodies, consent may be given beforehand, simultaneously or subsequently, unless something else is registered.\n\n(2) The other party may call on the legal person to have its competent body state within a reasonable time whether it gives consent; if it fails to do so, consent is deemed not to have been given.\n\n(3) Subsequent consent has retroactive effect unless otherwise agreed.\n\n(4) If consent is not given, the contract is deemed not to have been concluded.",
    text_local:
      "(1) Kad je statutom, društvenim ugovorom ili pravilima pravne osobe određeno i u registru u kojemu se pravna osoba vodi upisano da njezin zastupnik može sklopiti određeni ugovor samo uz suglasnost nekog njezina tijela, suglasnost se može dati prethodno, istodobno ili naknadno, ako što drugo nije upisano u registar.\n\n(2) Druga strana ima pravo pozvati pravnu osobu da se njezino ovlašteno tijelo u primjerenom roku očituje daje li suglasnost, pa ako to ono ne učini, smatrat će se da suglasnost nije dana.\n\n(3) Naknadna suglasnost ima povratni učinak ako drukčije nije ugovoreno.\n\n(4) Ako suglasnost nije dana, smatrat će se da ugovor nije sklopljen.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "358",
    source_url: SRC_HR_ZOO,
    text: "(1) In synallagmatic contracts neither party is obliged to perform its obligation if the other party does not perform or is not ready to perform its obligation simultaneously, unless otherwise agreed or provided by law, or unless something else follows from the nature of the transaction.\n\n(2) However, if in court proceedings one party pleads that it is not obliged to perform its obligation until the other party performs its obligation, the court shall order it to perform its obligation when the other party performs its obligation.",
    text_local:
      "(1) U dvostranoobveznim ugovorima nijedna strana nije dužna ispuniti svoju obvezu ako druga strana ne ispuni ili nije spremna istodobno ispuniti svoju obvezu, osim ako je što drugo ugovoreno ili zakonom određeno, ili ako što drugo proistječe iz naravi posla.\n\n(2) Ali ako u sudskom postupku jedna strana istakne da nije dužna ispuniti svoju obvezu dok i druga strana ne ispuni svoju, sud će joj narediti da ispuni svoju obvezu kad i druga strana ispuni svoju.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "176",
    source_url: SRC_HR_ZOO,
    text: "Where fixing the time of performance is left to the creditor or the debtor, the other party may, if the entitled party fails to fix a time even after a reminder, request the court to set a reasonable time for performance.",
    text_local:
      "Kad je određivanje vremena ispunjenja ostavljeno na volju vjerovnika ili dužnika, druga strana može, ako ovlaštenik ne odredi rok ni poslije opomene, zahtijevati od suda da odredi primjeren rok za ispunjenje.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "453",
    source_url: SRC_HR_ZOO,
    text: "(1) The right of first refusal ceases after five years from conclusion of the contract, unless it is agreed that it will cease earlier.\n\n(2) A longer agreed period is reduced to a period of five years.\n\n(3) The limitation in paragraphs (1) and (2) of this Article does not apply to the right of first refusal under commercial contracts and to the right of first refusal to shares, business stakes and interests in a company.\n\n(4) If the contract referred to in paragraph (3) of this Article does not provide for the duration of the right of first refusal, it ceases upon expiry of five years from conclusion of the contract.",
    text_local:
      "(1) Pravo prvokupa prestaje poslije pet godina od sklapanja ugovora, ako nije ugovoreno da će prestati prije.\n\n(2) Ugovoren dulji rok svodi se na rok od pet godina.\n\n(3) Ograničenje iz stavka 1. i 2. ovoga članka ne primjenjuje se na pravo prvokupa iz trgovačkih ugovora i na pravo prvokupa dionica, poslovnih udjela i udjela u društvu.\n\n(4) Ako ugovorom iz stavka 3. ovoga članka nije ugovoreno vrijeme trajanja prava prvokupa, ono prestaje protekom pet godina od sklapanja ugovora.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "359",
    source_url: SRC_HR_ZOO,
    text: "(1) If it is agreed that one party shall perform its obligation first but, after conclusion of the contract, the other party's financial circumstances worsen to the extent that it is uncertain whether it will be able to perform its obligation, or if such uncertainty arises from other serious reasons, the party that undertook to perform first may defer performance until the other party performs its obligation or provides adequate security that it will do so.\n\n(2) The same applies where the other party's financial circumstances were equally difficult even before conclusion of the contract, if its counterparty did not know nor ought to have known.\n\n(3) In those cases the party that undertook to perform first may demand that security be given within a reasonable time and, after that period passes without result, may terminate the contract.",
    text_local:
      "(1) Ako je ugovoreno da prvo jedna strana ispuni svoju obvezu, pa se nakon sklapanja ugovora materijalne prilike druge strane pogoršaju u toj mjeri da je neizvjesno hoće li ona moći ispuniti svoju obvezu, ili ako ta neizvjesnost proizlazi iz drugih ozbiljnih razloga, strana koja se obvezala da prva ispuni svoju obvezu može odgoditi njezino ispunjenje dok druga strana ne ispuni svoju obvezu ili dok ne dade dovoljno osiguranje da će je ispuniti.\n\n(2) To vrijedi i kad su materijalne prilike druge strane bile u istoj mjeri teške još prije sklapanja ugovora, ako njezin suugovaratelj to nije znao niti je morao znati.\n\n(3) U tim slučajevima strana koja se obvezala prva ispuniti svoju obvezu može zahtijevati da joj se osiguranje dade u primjerenom roku, a poslije proteka toga roka bez rezultata, može raskinuti ugovor.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "369",
    source_url: SRC_HR_ZOO,
    text: "(1) If, because of extraordinary circumstances arising after conclusion of the contract that could not have been foreseen at that time, performance of the obligation would become excessively burdensome for one contracting party or would cause it excessively large loss, it may request that the contract be modified or even terminated.\n\n(2) A party relying on changed circumstances may not request modification or termination if, at the time of conclusion, it was obliged to take those circumstances into account or could have avoided or overcome them.\n\n(3) A party requesting modification or termination may not rely on circumstances that arose after expiry of the time fixed for performance of its obligation.\n\n(4) Where one party requests termination, the contract shall not be terminated if the other party offers or agrees that the relevant provisions of the contract be modified fairly.\n\n(5) If it orders termination, the court shall, at the other party's request, oblige the party that requested termination to compensate it a fair share of the loss it suffers as a result.",
    text_local:
      "(1) Ako bi zbog izvanrednih okolnosti nastalih nakon sklapanja ugovora, a koje se nisu mogle predvidjeti u vrijeme sklapanja ugovora, ispunjenje obveze za jednu ugovornu stranu postalo pretjerano otežano ili bi joj nanijelo pretjerano veliki gubitak, ona može zahtijevati da se ugovor izmijeni ili čak i raskine.\n\n(2) Izmjenu ili raskid ugovora ne može zahtijevati strana koja se poziva na promijenjene okolnosti ako je bila dužna u vrijeme sklapanja ugovora uzeti u obzir te okolnosti ili ih je mogla izbjeći ili savladati.\n\n(3) Strana koja zahtijeva izmjenu ili raskid ugovora ne može se pozivati na promijenjene okolnosti koje su nastupile nakon isteka roka određenog za ispunjenje njezine obveze.\n\n(4) Kad jedna strana zahtijeva raskid ugovora, ugovor se neće raskinuti ako druga strana ponudi ili pristane da se odgovarajuće odredbe ugovora pravično izmijene.\n\n(5) Ako izrekne raskid ugovora, sud će na zahtjev druge strane obvezati stranu koja ga je zahtijevala da ovoj naknadi pravičan dio štete koju trpi zbog toga.",
  },
  {
    jurisdiction: "croatia",
    law_name: "Law of Obligations",
    law_name_local: "Zakon o obveznim odnosima",
    law_category: "civil",
    article_num: "295",
    source_url: SRC_HR_ZOO,
    text: "(1) General contract terms are contractual provisions drafted for a larger number of contracts which one contracting party (the drafter) proposes to the other contracting party before or at the moment of conclusion of the contract, whether they are contained in a form (standard) contract or the contract refers to them.\n\n(2) General contract terms supplement special agreements made between the contracting parties in the same contract and, as a rule, bind in the same way as those agreements.\n\n(3) In case of conflict between general terms and special agreements, the latter prevail.\n\n(4) General contract terms must be published in the usual manner.\n\n(5) General terms bind a contracting party if they were known or ought to have been known to it at the time of conclusion of the contract.",
    text_local:
      "(1) Opći uvjeti ugovora su ugovorne odredbe sastavljene za veći broj ugovora koje jedna ugovorna strana (sastavljač) prije ili u trenutku sklapanja ugovora predlaže drugoj ugovornoj strani, bilo da su sadržani u formularnom (tipskom) ugovoru, bilo da se na njih ugovor poziva.\n\n(2) Opći uvjeti ugovora dopunjuju posebne pogodbe utvrđene među ugovarateljima u istom ugovoru, i u pravilu obvezuju kao i ove.\n\n(3) U slučaju neslaganja općih uvjeta i posebnih pogodbi, vrijede ove posljednje.\n\n(4) Opći uvjeti ugovora moraju se objaviti na uobičajeni način.\n\n(5) Opći uvjeti obvezuju ugovornu stranu ako su joj bili poznati ili morali biti poznati u vrijeme sklapanja ugovora.",
  },

  // --- BIH FEDERATION (FBiH) — Zakon o obligacionim odnosima ---
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "103",
    source_url: SRC_GOOGLE_FBIH_OOD,
    text: "(1) A contract contrary to mandatory rules, public policy or good morals is void if the purpose of the infringed rule does not point to another sanction or if the law does not provide otherwise in the particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains in force unless the law provides otherwise for that case, and the party that breached the prohibition bears the appropriate consequences.",
    text_local:
      "(1) Ugovor koji je protivan prisilnim propisima, javnom poretku ili moralnim načelima je ništav ako cilj povrijeđenog pravila ne upućuje na neku drugu sankciju ili ako zakon u određenom slučaju ne propisuje što drugo.\n\n(2) Ako je sklapanje određenog ugovora zabranjeno samo jednoj strani, ugovor ostaje na snazi ako u zakonu nije što drugo predviđeno za određeni slučaj, a strana koja je povrijedila zakonsku zabranu snosiće odgovarajuće posljedice.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "111",
    source_url: SRC_GOOGLE_FBIH_OOD,
    text: "A contract is voidable when concluded by a party of limited capacity, when there was a defect of will in its conclusion, or when so provided by this Law or a special regulation.",
    text_local:
      "Ugovor je poništiv kad ga je sklopila strana ograničene poslovne sposobnosti, kad je pri njegovom sklapanju bila mana volje, kao i kad je to ovim zakonom ili posebnim propisom određeno.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "262",
    source_url: SRC_GOOGLE_FBIH_OOD,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of a right other than ownership undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodajnoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cijenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahtijeva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_GOOGLE_FBIH_OOD,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mjesto predaje nije određeno ugovorom, predaja stvari vrši se u mjestu u kojem je prodavac u času sklapanja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac sklopio ugovor u vršenju svoje redovne privredne djelatnosti, onda u mjestu njegovog sjedišta.\n\n(2) Ali, ako je u času sklapanja ugovora ugovaračima bilo poznato gdje se stvar nalazi, odnosno gdje treba da bude izrađena, predaja se vrši u tom mjestu.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "418",
    source_url: SRC_GOOGLE_FBIH_OOD,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cijenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cijenu prije nego što je imao mogućnost da pregleda stvar.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations (FBiH)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "124",
    source_url: SRC_GOOGLE_FBIH_OOD,
    text: "Whoever causes damage to another must compensate it unless it is proved that the damage occurred without fault on their part.",
    text_local:
      "Ko drugome prouzrokuje štetu, dužan je naknaditi je ako ne dokaže da je šteta nastala bez njegove krivice.",
  },

  // --- BIH REPUBLIKA SRPSKA ---
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "103",
    source_url: SRC_GOOGLE_RS_OOD,
    text: "(1) A contract contrary to mandatory rules, public policy or good morals is void if the purpose of the infringed rule does not point to another sanction or if the law does not provide otherwise in the particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains in force unless the law provides otherwise for that case, and the party that breached the prohibition bears the appropriate consequences.",
    text_local:
      "(1) Ugovor koji je protivan prinudnim propisima, javnom poretku ili moralnim načelima je ništav ako cilj povređenog pravila ne upućuje na neku drugu sankciju ili ako zakon u određenom slučaju ne propisuje što drugo.\n\n(2) Ako je zaključenje određenog ugovora zabranjeno samo jednoj strani, ugovor ostaje na snazi ako u zakonu nije što drugo predviđeno za određeni slučaj, a strana koja je povredila zakonsku zabranu snosiće odgovarajuće posledice.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "111",
    source_url: SRC_GOOGLE_RS_OOD,
    text: "A contract is voidable when concluded by a party of limited capacity, when there was a defect of will in its conclusion, or when so provided by this Law or a special regulation.",
    text_local:
      "Ugovor je rušljiv kad ga je zaključila strana ograničeno poslovno sposobna, kad je pri njegovom zaključenju bilo mana u pogledu volje strana, kao i kad je to ovim zakonom ili posebnim propisom određeno.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "262",
    source_url: SRC_GOOGLE_RS_OOD,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of another right undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodatoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahteva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_GOOGLE_RS_OOD,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mesto predaje nije određeno ugovorom, predaja stvari vrši se u mestu u kojem je prodavac u času zaključenja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac zaključio ugovor u vršenju svoje redovne privredne delatnosti, onda u mestu njegovog sedišta.\n\n(2) Ali, ako je u času zaključenja ugovora ugovaračima bilo poznato gde se stvar nalazi, odnosno gde treba da bude izrađena, predaja se vrši u tom mestu.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "418",
    source_url: SRC_GOOGLE_RS_OOD,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cenu pre nego što je imao mogućnost da pregleda stvar.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations (Republika Srpska)",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "124",
    source_url: SRC_GOOGLE_RS_OOD,
    text: "Whoever causes damage to another must compensate it unless it is proved that the damage occurred without fault on their part.",
    text_local:
      "Ko drugome prouzrokuje štetu, dužan je naknaditi je ako ne dokaže da je šteta nastala bez njegove krivice.",
  },

  // --- BIH BRČKO DISTRICT ---
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations (Brčko District)",
    law_name_local: "Zakon o obligacionim odnosima Brčko distrikta BiH",
    law_category: "civil",
    article_num: "103",
    source_url: SRC_BIH_BRCKO_OOD,
    text: "(1) A contract contrary to mandatory rules, public policy or good morals is void if the purpose of the infringed rule does not point to another sanction or if the law does not provide otherwise in the particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains in force unless the law provides otherwise for that case, and the party that breached the prohibition bears the appropriate consequences.",
    text_local:
      "(1) Ugovor koji je protivan prisilnim propisima, javnom poretku ili moralnim načelima je ništav ako cilj povrijeđenog pravila ne upućuje na neku drugu sankciju ili ako zakon u određenom slučaju ne propisuje što drugo.\n\n(2) Ako je sklapanje određenog ugovora zabranjeno samo jednoj strani, ugovor ostaje na snazi ako u zakonu nije što drugo predviđeno za određeni slučaj, a strana koja je povrijedila zakonsku zabranu snosiće odgovarajuće posljedice.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations (Brčko District)",
    law_name_local: "Zakon o obligacionim odnosima Brčko distrikta BiH",
    law_category: "civil",
    article_num: "262",
    source_url: SRC_BIH_BRCKO_OOD,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of another right undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodajnoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cijenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahtijeva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations (Brčko District)",
    law_name_local: "Zakon o obligacionim odnosima Brčko distrikta BiH",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_BIH_BRCKO_OOD,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mjesto predaje nije određeno ugovorom, predaja stvari vrši se u mjestu u kojem je prodavac u času sklapanja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac sklopio ugovor u vršenju svoje redovne privredne djelatnosti, onda u mjestu njegovog sjedišta.\n\n(2) Ali, ako je u času sklapanja ugovora ugovaračima bilo poznato gdje se stvar nalazi, odnosno gdje treba da bude izrađena, predaja se vrši u tom mjestu.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations (Brčko District)",
    law_name_local: "Zakon o obligacionim odnosima Brčko distrikta BiH",
    law_category: "civil",
    article_num: "418",
    source_url: SRC_BIH_BRCKO_OOD,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cijenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cijenu prije nego što je imao mogućnost da pregleda stvar.",
  },

  // --- MONTENEGRO ---
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "103",
    source_url: SRC_GOOGLE_ME_OOD,
    text: "(1) A contract contrary to mandatory rules, public policy or good morals is void if the purpose of the infringed rule does not point to another sanction or if the law does not provide otherwise in the particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains in force unless the law provides otherwise for that case, and the party that breached the prohibition bears the appropriate consequences.",
    text_local:
      "(1) Ugovor koji je protivan prinudnim propisima, javnom poretku ili moralnim načelima je ništav ako cilj povređenog pravila ne upućuje na neku drugu sankciju ili ako zakon u određenom slučaju ne propisuje što drugo.\n\n(2) Ako je zaključenje određenog ugovora zabranjeno samo jednoj strani, ugovor ostaje na snazi ako u zakonu nije što drugo predviđeno za određeni slučaj, a strana koja je povredila zakonsku zabranu snosiće odgovarajuće posledice.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "111",
    source_url: SRC_GOOGLE_ME_OOD,
    text: "A contract is voidable when concluded by a party of limited capacity, when there was a defect of will in its conclusion, or when so provided by this Law or a special regulation.",
    text_local:
      "Ugovor je rušljiv kad ga je zaključila strana ograničeno poslovno sposobna, kad je pri njegovom zaključenju bilo mana u pogledu volje strana, kao i kad je to ovim zakonom ili posebnim propisom određeno.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "458",
    source_url: SRC_GOOGLE_ME_OOD,
    text: "(1) The subject matter of a contract must be in commerce; a contract for the sale of a thing outside commerce is void.\n\n(2) Special regulations apply to the sale of things whose circulation is restricted.\n\n(3) A sale may also relate to a future thing.",
    text_local:
      "(1) Stvar o kojoj je ugovor mora biti u prometu, te je ništav ugovor o prodaji stvari koja je van prometa.\n\n(2) Za prodaju stvari čiji je promet ograničen važe posebni propisi.\n\n(3) Prodaja se može odnositi i na buduću stvar.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "471",
    source_url: SRC_GOOGLE_ME_OOD,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mesto predaje nije određeno ugovorom, predaja stvari vrši se u mestu u kojem je prodavac u času zaključenja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac zaključio ugovor u vršenju svoje redovne privredne delatnosti, onda u mestu njegovog sedišta.\n\n(2) Ali, ako je u času zaključenja ugovora ugovaračima bilo poznato gde se stvar nalazi, odnosno gde treba da bude izrađena, predaja se vrši u tom mestu.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "492",
    source_url: SRC_GOOGLE_ME_OOD,
    text: "(1) Where only part of the delivered thing has defects or only part of the thing or a smaller quantity than agreed was delivered, the buyer may terminate the contract under the preceding articles only in respect of the defective part or the missing part or quantity.\n\n(2) The buyer may terminate the entire contract only if the agreed quantity or delivered thing forms a whole, or if the buyer otherwise has a justified interest in receiving the agreed thing or quantity in full.",
    text_local:
      "(1) Kad samo deo predate stvari ima nedostatke ili je predat samo deo stvari, odnosno manja količina od ugovorene, kupac može raskinuti ugovor u smislu prethodnih članova samo u pogledu dela koji ima nedostatke, ili samo u pogledu dela ili količine koji nedostaju.\n\n(2) Kupac može raskinuti ceo ugovor samo ako ugovorena količina ili predata stvar čini celinu, ili ako kupac inače ima opravdan interes da primi ugovorenu stvar ili količinu u celini.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations",
    law_name_local: "Zakon o obligacionim odnosima",
    law_category: "civil",
    article_num: "262",
    source_url: SRC_GOOGLE_ME_OOD,
    text: "(1) The creditor in an obligatory relationship is entitled to demand performance from the debtor, and the debtor must perform conscientiously in accordance with the obligation.\n\n(2) If the debtor fails to perform or is late in performing, the creditor may also claim damages suffered as a result.\n\n(3) The debtor is also liable for damage due to delay in performance if the creditor has granted an adequate additional period for performance.\n\n(4) The debtor is liable for partial or complete impossibility of performance even without fault if impossibility arose after the debtor fell into default for which it is responsible.\n\n(5) The debtor is relieved of liability for damage if it proves that the subject matter would have perished by chance even had performance been made on time.",
    text_local:
      "(1) Poverilac u obaveznom odnosu je ovlašćen da od dužnika zahteva ispunjenje obaveze, a dužnik je dužan ispuniti je savesno u svemu kako ona glasi.\n\n(2) Kad dužnik ne ispuni obavezu ili zadocni sa njenim ispunjenjem, poverilac ima pravo zahtevati i naknadu štete koju je usled toga pretrpeo.\n\n(3) Za štetu zbog zadocnjenja sa ispunjenjem odgovara i dužnik kome je poverilac dao primeren naknadni rok za ispunjenje.\n\n(4) Dužnik odgovara i za delimičnu ili potpunu nemogućnost ispunjenja i ako tu nemogućnost nije skrivio ako je nastupila posle njegovog dolaska u docnju, za koju odgovara.\n\n(5) Ali se dužnik oslobađa odgovornosti za štetu ako dokaže da bi stvar koja je predmet obaveze slučajno propala i da je on svoju obavezu na vreme ispunio.",
  },

  // --- SLOVENIA: Obligacijski zakonik (OZ) ---
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "86",
    source_url: SRC_SI_OZ,
    text: "(1) A contract contrary to the Constitution, mandatory regulations or moral principles is void, unless the purpose of the infringed rule points to another sanction or the law provides otherwise in the particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains valid unless the law provides otherwise for that case, and the party that breached the prohibition bears the appropriate consequences.",
    text_local:
      "(1) Pogodba, ki nasprotuje ustavi, prisilnim predpisom ali moralnim načelom, je nična, če namen kršenega pravila ne odkazuje na kakšno drugo sankcijo ali če zakon v posameznem primeru ne predpisuje kaj drugega.\n\n(2) Če je sklenitev določene pogodbe prepovedana samo eni stranki, ostane pogodba v veljavi, razen če ni v zakonu za posamezen primer določeno kaj drugega, stranko, ki je prekršila zakonsko prepoved, pa zadenejo ustrezne posledice.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "94",
    source_url: SRC_SI_OZ,
    text: "(1) A party may avoid a contract concluded as a result of mistake, fraud, duress or gross unfairness under the conditions provided by this Code.\n\n(2) Avoidance is effected by a statement to the other party.",
    text_local:
      "(1) Stranka lahko izpodbije pogodbo, sklenjeno zaradi zmote, prevare, grožnje ali hude nepravičnosti, pod pogoji, ki jih določa ta zakonik.\n\n(2) Izpodbojnost uveljavlja z izjavo drugi stranki.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "435",
    source_url: SRC_SI_OZ,
    text: "By a contract of sale the seller undertakes to transfer ownership of the thing to the buyer and the buyer undertakes to pay the purchase price.",
    text_local:
      "S prodajno pogodbo se prodajalec zaveže, da kupcu prenese lastnino stvari, kupec pa se zaveže, da plača kupnino.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "455",
    source_url: SRC_SI_OZ,
    text: "Unless otherwise agreed, the seller performs delivery by handing over the thing to the buyer or to a person authorised by the buyer to receive it.",
    text_local:
      "Če ni drugače dogovorjeno, prodajalec izročitev stvari opravi tako, da stvar izroči kupcu ali osebi, ki jo je kupec pooblastil za prevzem.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "468",
    source_url: SRC_SI_OZ,
    text: "(1) The buyer must pay the purchase price as agreed.\n\n(2) If the time of payment is not agreed, the buyer must pay when the thing is handed over or when the buyer could have taken possession of it.",
    text_local:
      "(1) Kupec mora plačati kupnino, kot je dogovorjeno.\n\n(2) Če čas plačila ni dogovorjen, mora kupec plačati ob izročitvi stvari ali ko je lahko stvar prevzel.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "239",
    source_url: SRC_SI_OZ,
    text: "(1) A debtor is in default when it fails to perform on time.\n\n(2) If no time is fixed, the debtor is in default when the creditor demands performance and the debtor does not perform within a reasonable time.",
    text_local:
      "(1) Dolžnik je v zamudi, če svoje obveznosti ne izpolni pravočasno.\n\n(2) Če rok ni določen, je dolžnik v zamudi, ko upnik zahteva izpolnitev in dolžnik v razumnem roku ne izpolni.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Obligations Code (OZ)",
    law_name_local: "Obligacijski zakonik (OZ)",
    law_category: "civil",
    article_num: "243",
    source_url: SRC_SI_OZ,
    text: "(1) Contractual provisions apply as worded.\n\n(2) In interpreting disputed provisions, the common intention of the parties must be sought and the provision understood accordingly in light of the principles of obligations law.",
    text_local:
      "(1) Pogodbene določbe veljajo tako, kot so zapisane.\n\n(2) Pri razlagi spornih določb je treba ugotoviti skupno voljo strank in določbo razumeti skladno z načeli obligacijskega prava.",
  },

  // --- SLOVENIA (Obligacijski zakonik — UL RS 83/2001; PISRS id=ZAKO1263) — distinct law_name_local vs (OZ) rows above ---
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "87",
    source_url: SRC_SI_OZ,
    text: "(1) If a contract is void, each contracting party must return to the other everything it received under that contract; if that is impossible or the nature of what was performed precludes return, adequate monetary compensation must be paid at prices at the time the court decision is issued, unless the law provides otherwise.\n\n(2) However, if the contract is void because its content or purpose contravenes fundamental moral principles, the court may wholly or partly dismiss a dishonest party's claim for return of what it gave the other party; in deciding, the court shall consider the fairness of one or both parties and the significance of the interests at stake.",
    text_local:
      "(1) Če je pogodba nična, mora vsaka pogodbena stranka vrniti drugi vse, kar je prejela na podlagi take pogodbe; če to ni mogoče ali če narava tistega, kar je bilo izpolnjeno, nasprotuje vrnitvi, pa mora dati ustrezno denarno nadomestilo po cenah v času, ko je izdana sodna odločba, razen če zakon ne določa kaj drugega.\n\n(2) Če pa je pogodba nična zato, ker po svoji vsebini ali namenu nasprotuje temeljnim moralnim načelom, lahko sodišče v celoti ali deloma zavrne zahtevek nepoštene stranke za vrnitev tistega, kar je dala drugi stranki; pri odločanju upošteva sodišče poštenost ene oziroma obeh strank, ter pomen ogroženih interesov.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "96",
    source_url: SRC_SI_OZ,
    text: "(1) If anything was performed under a voidable contract that was avoided, it must be returned; if that is impossible or the nature of what was performed precludes return, adequate monetary compensation must be paid.\n\n(2) Monetary compensation is given at prices at the time of return or at the time the court decision is issued.",
    text_local:
      "(1) Če je bilo na podlagi izpodbojne pogodbe, ki je bila razveljavljena, kaj izpolnjeno, je treba to vrniti; če to ni mogoče ali če narava tistega, kar je bilo izpolnjeno, nasprotuje vrnitvi, pa je treba dati ustrezno denarno nadomestilo.\n\n(2) Denarno nadomestilo se daje po cenah ob vrnitvi oziroma ob izdaji sodne odločbe.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "103",
    source_url: SRC_SI_OZ,
    text: "If in synallagmatic contracts one party fails to perform its obligation and nothing else is stipulated, the other party may demand performance or, under the conditions in the following articles, withdraw from the contract by a simple statement if the contract is not already terminated by law, and in any case is entitled to damages.",
    text_local:
      "Če pri dvostranskih pogodbah ena stranka ne izpolni svoje obveznosti in ni določeno kaj drugega, lahko druga stranka zahteva izpolnitev obveznosti ali pa pod pogoji iz naslednjih členov odstopi od pogodbe z navadno izjavo, če pogodba ni razvezana že po samem zakonu, v vsakem primeru pa ima pravico do odškodnine.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "240",
    source_url: SRC_SI_OZ,
    text: "The debtor is relieved of liability for damage if it proves that it could not perform its obligation or that it was late in performing the obligation due to circumstances arising after conclusion of the contract which it could not prevent, remove or avoid.",
    text_local:
      "Dolžnik je prost odgovornosti za škodo, če dokaže, da ni mogel izpolniti svoje obveznosti oziroma da je zamudil z izpolnitvijo obveznosti zaradi okoliščin, nastalih po sklenitvi pogodbe, ki jih ni mogel preprečiti, ne odpraviti in se jim tudi ne izogniti.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "436",
    source_url: SRC_SI_OZ,
    text: "(1) Until the thing is handed over to the buyer, the seller bears the risk of accidental destruction or damage to the thing; upon handover of the thing the risk passes to the buyer.\n\n(2) The risk does not pass to the buyer if, because of a defect in the thing handed over, the buyer has withdrawn from the contract or demanded replacement of the thing.",
    text_local:
      "(1) Do izročitve stvari kupcu trpi nevarnost naključnega uničenja ali poškodovanja stvari prodajalec, z izročitvijo stvari pa preide nevarnost na kupca.\n\n(2) Nevarnost ne preide na kupca, če je ta zaradi kakšne napake, ki jo ima izročena stvar, odstopil od pogodbe ali zahteval zamenjavo stvari.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "460",
    source_url: SRC_SI_OZ,
    text: "(1) The seller is not liable for defects within points 1 and 3 of the preceding Article if they were known to the buyer at conclusion of the contract or could not have remained unknown.\n\n(2) Defects that a careful person with average knowledge and experience of a person of the same profession and field as the buyer could have noticed on ordinary examination of the thing are deemed not to have remained unknown to the buyer.\n\n(3) However, the seller is also liable for defects that the buyer could easily have noticed if it stated that the thing had no defects or that it had certain properties or features.",
    text_local:
      "(1) Prodajalec ne odgovarja za napake iz 1. in 3. točke prejšnjega člena, če so bile ob sklenitvi pogodbe kupcu znane ali mu niso mogle ostati neznane.\n\n(2) Šteje se, da kupcu niso mogle ostati neznane tiste napake, ki bi jih skrben človek s poprečnim znanjem in izkušenostjo človeka enakega poklica in stroke kot kupec lahko opazil pri običajnem pregledu stvari.\n\n(3) Vendar odgovarja prodajalec tudi za napake, ki bi jih bil kupec z lahkoto opazil, če je izjavil, da stvar nima nobenih napak ali da ima določene lastnosti ali odlike.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "478",
    source_url: SRC_SI_OZ,
    text: "The purchase price is reduced in proportion between the value of the thing without defect and the value of the thing with defect at the time of conclusion of the contract.",
    text_local:
      "Kupnina se zniža v razmerju med vrednostjo stvari brez napake in vrednostjo stvari z napako ob sklenitvi pogodbe.",
  },
  {
    jurisdiction: "slovenia",
    law_name: "Law of Obligations",
    law_name_local: "Obligacijski zakonik",
    law_category: "civil",
    article_num: "244",
    source_url: SRC_SI_OZ,
    text: "If the creditor or a person for whom the creditor is responsible is also liable for the damage that occurred, its extent, or for aggravating the debtor's position, damages shall be reduced proportionally.",
    text_local:
      "Če za nastalo škodo ali njeno velikost ali za otežitev dolžnikovega položaja odgovarja tudi upnik ali kdo, za katerega je on odgovoren, se odškodnina sorazmerno zmanjša.",
  },

  // --- BIH FBiH (distinct law_name / law_name_local / source per user) ---
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "105",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) Nullity of a provision of a contract does not entail nullity of the contract itself if the contract can subsist without the null provision and that provision was neither a condition of the contract nor the decisive motive for which the contract was concluded.\n\n(2) The contract shall nevertheless remain in force even if the null provision was a condition or decisive motive of the contract where nullity is established precisely so that the contract is freed from that provision and remains valid without it.",
    text_local:
      "(1) Ništavost neke odredbe ugovora ne povlači ništavost i samog ugovora, ako on može opstati bez ništave odredbe, i ako ona nije bila ni uslov ugovora ni odlučujuća pobuda zbog koje je ugovor zaključen.\n\n(2) Ali će ugovor ostati na snazi čak i ako je ništava odredba bila uslov ili odlučujuća pobuda ugovora u slučaju kad je ništavost ustanovljena upravo da bi ugovor bio oslobođen te odredbe i važio bez nje.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "113",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) If a voidable contract is avoided, the parties must return to each other everything received under the contract; if return is impossible or precluded by the nature of the performance, adequate monetary compensation must be paid at prices at the time of return or at the time the court decision is issued.\n\n(2) The party at whose instance the ground for voidability existed is liable to the other party for damage arising from avoidance if that party did not know nor ought to have known of that ground.",
    text_local:
      "(1) Ako je poništen pobojni ugovor, strane su dužne jedna drugoj vratiti sve što su primile na osnovu tog ugovora; ako to nije moguće ili priroda ispunjenja tome protivriječi, mora se dati primjerena novčana naknada po cijenama u vrijeme vraćanja odnosno u vrijeme donošenja sudske odluke.\n\n(2) Strana kod koje je postojao razlog pobojnosti odgovara drugoj strani za štetu nastalu poništajem ako ova nije znala niti je morala znati za taj razlog.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "210",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) A debtor is in default when it fails to perform within the time fixed for performance.\n\n(2) If no time for performance is fixed, the debtor is in default when the creditor calls on it to perform, orally or in writing, by extrajudicial warning or by commencing proceedings aimed at obtaining performance.",
    text_local:
      "(1) Dužnik dolazi u zakašnjenje kad ne ispuni obvezu u roku određenom za ispunjenje.\n\n(2) Ako rok za ispunjenje nije određen, dužnik dolazi u zakašnjenje kad ga vjerovnik pozove da ispuni obvezu, usmeno ili pisano, izvansudskom opomenom ili započinjanjem nekog postupka čiji je cilj da se postigne ispunjenje obveze.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "277",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) Where a contract is concluded on the basis of a pre-printed form, or where one party has otherwise prepared and proposed the contract, unclear provisions shall be interpreted in favour of the other party.\n\n(2) Unclear provisions in a gratuitous contract shall be interpreted in the sense less onerous for the debtor, and in an onerous contract in the sense that achieves a fair balance of mutual performances.",
    text_local:
      "(1) U slučaju kad je ugovor sklopljen prema unaprijed otisnutom sadržaju, ili kad je ugovor na drugi način pripremila i predložila jedna ugovorna strana, nejasne odredbe tumačit će se u korist druge strane.\n\n(2) Nejasne odredbe u besplatnom ugovoru treba tumačiti u smislu koji je manje tegotan za dužnika, a u naplatnom u smislu kojim se ostvaruje pravičan odnos uzajamnih činidaba.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of a right other than ownership undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodajnoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cijenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahtijeva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "458",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mjesto predaje nije određeno ugovorom, predaja stvari vrši se u mjestu u kojem je prodavac u času sklapanja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac sklopio ugovor u vršenju svoje redovne privredne djelatnosti, onda u mjestu njegovog sjedišta.\n\n(2) Ali, ako je u času sklapanja ugovora ugovaračima bilo poznato gdje se stvar nalazi, odnosno gdje treba da bude izrađena, predaja se vrši u tom mjestu.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "488",
    source_url: SRC_SN_FBIH_29_03,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cijenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cijenu prije nego što je imao mogućnost da pregleda stvar.",
  },
  {
    jurisdiction: "bih_fbih",
    law_name: "Law on Obligations FBiH",
    law_name_local: "Zakon o obligacionim odnosima FBiH",
    law_category: "civil",
    article_num: "215",
    source_url: SRC_SN_FBIH_29_03,
    text: "(1) A debtor who is late in performing a monetary obligation owes, in addition to the principal, default interest at the rate laid down by law.\n\n(2) If the agreed interest rate is higher than the statutory default interest rate, contractual interest continues to accrue after the debtor's default as well.",
    text_local:
      "(1) Dužnik koji zakašnjuje s ispunjenjem novčane obaveze duguje, pored glavnice, i zateznu kamatu po stopi utvrđenoj zakonom.\n\n(2) Ako je ugovorena kamatna stopa viša od stope zatezne kamate, ona teče i poslije dužnikovog zakašnjenja.",
  },

  // --- BIH RS (distinct law_name / law_name_local / source per user) ---
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "105",
    source_url: SRC_SG_RS_17_93,
    text: "(1) Nullity of a provision of a contract does not entail nullity of the contract itself if the contract can subsist without the null provision and that provision was neither a condition of the contract nor the decisive motive for which the contract was concluded.\n\n(2) The contract shall nevertheless remain in force even if the null provision was a condition or decisive motive of the contract where nullity is established precisely so that the contract is freed from that provision and remains valid without it.",
    text_local:
      "(1) Ništavost neke odredbe ugovora ne povlači ništavost i samog ugovora, ako on može opstati bez ništave odredbe, i ako ona nije bila ni uslov ugovora ni odlučujući motiv zbog kog je ugovor zaključen.\n\n(2) Ali će ugovor ostati na snazi čak i ako je ništava odredba bila uslov ili odlučujući motiv ugovora u slučaju kad je ništavost utvrđena upravo da bi ugovor bio oslobođen te odredbe i važio bez nje.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "113",
    source_url: SRC_SG_RS_17_93,
    text: "(1) If a voidable contract is avoided, the parties must return to each other everything received under the contract; if return is impossible or precluded by the nature of the performance, adequate monetary compensation must be paid at prices at the time of return or at the time the court decision is issued.\n\n(2) The party at whose instance the ground for voidability existed is liable to the other party for damage arising from avoidance if that party did not know nor ought to have known of that ground.",
    text_local:
      "(1) Ako je poništen rušljivi ugovor, strane su dužne jedna drugoj vratiti sve što su primile na osnovu tog ugovora; ako to nije moguće ili priroda ispunjenja tome protivreči, mora se dati primerna novčana naknada po cenama u vreme vraćanja odnosno u vreme donošenja sudske odluke.\n\n(2) Strana kod koje je postojao razlog rušljivosti odgovara drugoj strani za štetu nastalu poništajem ako ova nije znala niti je morala znati za taj razlog.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "210",
    source_url: SRC_SG_RS_17_93,
    text: "(1) A debtor is in default when it fails to perform within the time fixed for performance.\n\n(2) If no time for performance is fixed, the debtor is in default when the creditor calls on it to perform, orally or in writing, by extrajudicial warning or by commencing proceedings aimed at obtaining performance.",
    text_local:
      "(1) Dužnik dolazi u zakašnjenje kad ne ispuni obavezu u roku određenom za ispunjenje.\n\n(2) Ako rok za ispunjenje nije određen, dužnik dolazi u zakašnjenje kad ga poverilac pozove da ispuni obavezu, usmeno ili pismeno, vansudskom opomenom ili započinjanjem nekog postupka čiji je cilj da se postigne ispunjenje obaveze.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "277",
    source_url: SRC_SG_RS_17_93,
    text: "(1) Where a contract is concluded on the basis of a pre-printed form, or where one party has otherwise prepared and proposed the contract, unclear provisions shall be interpreted in favour of the other party.\n\n(2) Unclear provisions in a gratuitous contract shall be interpreted in the sense less onerous for the debtor, and in an onerous contract in the sense that achieves a fair balance of mutual performances.",
    text_local:
      "(1) U slučaju kad je ugovor zaključen prema unapred odštampanom sadržaju, ili kad je ugovor na drugi način pripremila i predložila jedna ugovorna strana, nejasne odredbe tumačiće se u korist druge strane.\n\n(2) Nejasne odredbe u besplatnom ugovoru treba tumačiti u smislu koji je manje težak za dužnika, a u naknadnom u smislu kojim se ostvaruje pravičan odnos uzajamnih činidbi.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_SG_RS_17_93,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of a right other than ownership undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodatoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahteva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "458",
    source_url: SRC_SG_RS_17_93,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mesto predaje nije određeno ugovorom, predaja stvari vrši se u mestu u kojem je prodavac u času zaključenja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac zaključio ugovor u vršenju svoje redovne privredne delatnosti, onda u mestu njegovog sedišta.\n\n(2) Ali, ako je u času zaključenja ugovora ugovaračima bilo poznato gde se stvar nalazi, odnosno gde treba da bude izrađena, predaja se vrši u tom mestu.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "488",
    source_url: SRC_SG_RS_17_93,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cenu pre nego što je imao mogućnost da pregleda stvar.",
  },
  {
    jurisdiction: "bih_rs",
    law_name: "Law on Obligations RS",
    law_name_local: "Zakon o obligacionim odnosima RS",
    law_category: "civil",
    article_num: "215",
    source_url: SRC_SG_RS_17_93,
    text: "(1) A debtor who is late in performing a monetary obligation owes, in addition to the principal, default interest at the rate laid down by law.\n\n(2) If the agreed interest rate is higher than the statutory default interest rate, contractual interest continues to accrue after the debtor's default as well.",
    text_local:
      "(1) Dužnik koji zakasni sa ispunjenjem novčane obaveze duguje, pored glavnice, i zateznu kamatu po stopi utvrđenoj zakonom.\n\n(2) Ako je stopa ugovorene kamate viša od stope zatezne kamate, ona teče i posle dužnikovog zakašnjenja.",
  },

  // --- BIH Brčko (distinct law_name / law_name_local / source per user) ---
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations Brčko",
    law_name_local: "Zakon o obligacionim odnosima Brčko Distrikta",
    law_category: "civil",
    article_num: "103",
    source_url: SRC_OG_BRCKO_DISTRICT,
    text: "(1) A contract contrary to mandatory rules, public policy or good morals is void if the purpose of the infringed rule does not point to another sanction or if the law does not provide otherwise in the particular case.\n\n(2) If conclusion of a particular contract is prohibited to only one party, the contract remains in force unless the law provides otherwise for that case, and the party that breached the prohibition bears the appropriate consequences.",
    text_local:
      "(1) Ugovor koji je protivan prisilnim propisima, javnom poretku ili moralnim načelima je ništav ako cilj povrijeđenog pravila ne upućuje na neku drugu sankciju ili ako zakon u određenom slučaju ne propisuje što drugo.\n\n(2) Ako je sklapanje određenog ugovora zabranjeno samo jednoj strani, ugovor ostaje na snazi ako u zakonu nije što drugo predviđeno za određeni slučaj, a strana koja je povrijedila zakonsku zabranu snosiće odgovarajuće posljedice.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations Brčko",
    law_name_local: "Zakon o obligacionim odnosima Brčko Distrikta",
    law_category: "civil",
    article_num: "111",
    source_url: SRC_OG_BRCKO_DISTRICT,
    text: "A contract is voidable when concluded by a party of limited capacity, when there was a defect of will in its conclusion, or when so provided by this Law or a special regulation.",
    text_local:
      "Ugovor je poništiv kad ga je sklopila strana ograničene poslovne sposobnosti, kad je pri njegovom sklapanju bila mana volje, kao i kad je to ovim zakonom ili posebnim propisom određeno.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations Brčko",
    law_name_local: "Zakon o obligacionim odnosima Brčko Distrikta",
    law_category: "civil",
    article_num: "262",
    source_url: SRC_OG_BRCKO_DISTRICT,
    text: "A contract is concluded when the contracting parties have agreed upon its essential elements. If according to the agreement of the parties a contract is to be concluded in a particular form, a contract shall be considered concluded only when it is done in that form.",
    text_local:
      "Ugovor je zaključen kada ugovorne strane postignu sporazum o njegovim bitnim elementima. Ako je po sporazumu strana ugovor treba zaključiti u određenom obliku, smatra se da je ugovor zaključen tek kada je taj oblik ispunjen.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations Brčko",
    law_name_local: "Zakon o obligacionim odnosima Brčko Distrikta",
    law_category: "civil",
    article_num: "395",
    source_url: SRC_OG_BRCKO_DISTRICT,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of a right other than ownership undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodajnoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cijenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahtijeva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations Brčko",
    law_name_local: "Zakon o obligacionim odnosima Brčko Distrikta",
    law_category: "civil",
    article_num: "458",
    source_url: SRC_OG_BRCKO_DISTRICT,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mjesto predaje nije određeno ugovorom, predaja stvari vrši se u mjestu u kojem je prodavac u času sklapanja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac sklopio ugovor u vršenju svoje redovne privredne djelatnosti, onda u mjestu njegovog sjedišta.\n\n(2) Ali, ako je u času sklapanja ugovora ugovaračima bilo poznato gdje se stvar nalazi, odnosno gdje treba da bude izrađena, predaja se vrši u tom mjestu.",
  },
  {
    jurisdiction: "bih_brcko",
    law_name: "Law on Obligations Brčko",
    law_name_local: "Zakon o obligacionim odnosima Brčko Distrikta",
    law_category: "civil",
    article_num: "488",
    source_url: SRC_OG_BRCKO_DISTRICT,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cijenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cijenu prije nego što je imao mogućnost da pregleda stvar.",
  },

  // --- MONTENEGRO (distinct law_name / law_name_local / source per user) ---
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "104",
    source_url: SRC_SL_CG_47_08,
    text: "(1) Nullity of a provision of a contract does not entail nullity of the contract itself if the contract can subsist without the null provision and that provision was neither a condition of the contract nor the decisive motive for which the contract was concluded.\n\n(2) The contract shall nevertheless remain in force even if the null provision was a condition or decisive motive of the contract where nullity is established precisely so that the contract is freed from that provision and remains valid without it.",
    text_local:
      "(1) Ništavost neke odredbe ugovora ne povlači ništavost i samog ugovora, ako on može opstati bez ništave odredbe, i ako ona nije bila ni uslov ugovora ni odlučujuća pobuda zbog koje je ugovor zaključen.\n\n(2) Ali će ugovor ostati na snazi čak i ako je ništava odredba bila uslov ili odlučujuća pobuda ugovora u slučaju kad je ništavost ustanovljena upravo da bi ugovor bio oslobođen te odredbe i važio bez nje.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "112",
    source_url: SRC_SL_CG_47_08,
    text: "(1) If a voidable contract is avoided, the parties must return to each other everything received under the contract; if return is impossible or precluded by the nature of the performance, adequate monetary compensation must be paid at prices at the time of return or at the time the court decision is issued.\n\n(2) The party at whose instance the ground for voidability existed is liable to the other party for damage arising from avoidance if that party did not know nor ought to have known of that ground.",
    text_local:
      "(1) Ako je poništen pobojni ugovor, strane su dužne jedna drugoj vratiti sve što su primile na osnovu tog ugovora; ako to nije moguće ili priroda ispunjenja tome protivriječi, mora se dati primjerena novčana naknada po cijenama u vrijeme vraćanja odnosno u vrijeme donošenja sudske odluke.\n\n(2) Strana kod koje je postojao razlog pobojnosti odgovara drugoj strani za štetu nastalu poništajem ako ova nije znala niti je morala znati za taj razlog.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "211",
    source_url: SRC_SL_CG_47_08,
    text: "(1) A debtor is in default when it fails to perform within the time fixed for performance.\n\n(2) If no time for performance is fixed, the debtor is in default when the creditor calls on it to perform, orally or in writing, by extrajudicial warning or by commencing proceedings aimed at obtaining performance.",
    text_local:
      "(1) Dužnik dolazi u zakašnjenje kad ne ispuni obvezu u roku određenom za ispunjenje.\n\n(2) Ako rok za ispunjenje nije određen, dužnik dolazi u zakašnjenje kad ga poverilac pozove da ispuni obvezu, usmeno ili pismeno, izvansudskom opomenom ili započinjanjem nekog postupka čiji je cilj da se postigne ispunjenje obveze.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "278",
    source_url: SRC_SL_CG_47_08,
    text: "(1) Where a contract is concluded on the basis of a pre-printed form, or where one party has otherwise prepared and proposed the contract, unclear provisions shall be interpreted in favour of the other party.\n\n(2) Unclear provisions in a gratuitous contract shall be interpreted in the sense less onerous for the debtor, and in an onerous contract in the sense that achieves a fair balance of mutual performances.",
    text_local:
      "(1) U slučaju kad je ugovor zaključen prema unaprijed otisnutom sadržaju, ili kad je ugovor na drugi način pripremila i predložila jedna ugovorna strana, nejasne odredbe tumačiće se u korist druge strane.\n\n(2) Nejasne odredbe u besplatnom ugovoru treba tumačiti u smislu koji je manje tegotan za dužnika, a u naplatnom u smislu kojim se ostvaruje pravičan odnos uzajamnih činidbi.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "396",
    source_url: SRC_SL_CG_47_08,
    text: "(1) By a contract of sale the seller undertakes to transfer ownership of the thing sold to the buyer and to deliver it for that purpose, and the buyer undertakes to pay the price in money and take delivery of the thing.\n\n(2) The seller of a right other than ownership undertakes to procure that right for the buyer and, where exercise of the right requires possession of a thing, to deliver the thing as well.",
    text_local:
      "(1) Ugovorom o prodaji prodavac se obavezuje da na kupca prenese pravo svojine na prodajnoj stvari i da mu je u tu svrhu preda, a kupac se obavezuje da plati cijenu u novcu i preuzme stvar.\n\n(2) Prodavac nekog drugog prava obavezuje se da kupcu pribavi prodato pravo, a kad vršenje tog prava zahtijeva državinu stvari, da mu i preda stvar.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "459",
    source_url: SRC_SL_CG_47_08,
    text: "(1) If the place of delivery is not fixed by contract, delivery is made at the place where the seller had its residence at the time of conclusion, or, in the absence of residence, its habitual residence, and if the seller concluded the contract in the course of its regular business, at the place of its seat.\n\n(2) If at the time of conclusion the parties knew or should have known where the thing is located or where it is to be manufactured, delivery is made at that place.",
    text_local:
      "(1) Kad mjesto predaje nije određeno ugovorom, predaja stvari vrši se u mjestu u kojem je prodavac u času zaključenja ugovora imao svoje prebivalište ili, u nedostatku ovoga, svoje boravište, a ako je prodavac zaključio ugovor u vršenju svoje redovne privredne djelatnosti, onda u mjestu njegovog sjedišta.\n\n(2) Ali, ako je u času zaključenja ugovora ugovaračima bilo poznato gdje se stvar nalazi, odnosno gdje treba da bude izrađena, predaja se vrši u tom mjestu.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "489",
    source_url: SRC_SL_CG_47_08,
    text: "Unless otherwise agreed or customary, the seller is not obliged to deliver the thing until the buyer pays the price at the same time, or is ready to do so simultaneously, but the buyer is not obliged to pay the price before having had the opportunity to examine the thing.",
    text_local:
      "Ako nije što drugo ugovoreno ili uobičajeno, prodavac nije dužan predati stvar ako mu kupac ne isplati cijenu istovremeno, ili nije spreman da to istovremeno učini, ali kupac nije dužan isplatiti cijenu prije nego što je imao mogućnost da pregleda stvar.",
  },
  {
    jurisdiction: "montenegro",
    law_name: "Law on Obligations Montenegro",
    law_name_local: "Zakon o obligacionim odnosima CG",
    law_category: "civil",
    article_num: "216",
    source_url: SRC_SL_CG_47_08,
    text: "(1) A debtor who is late in performing a monetary obligation owes, in addition to the principal, default interest at the rate laid down by law.\n\n(2) If the agreed interest rate is higher than the statutory default interest rate, contractual interest continues to accrue after the debtor's default as well.",
    text_local:
      "(1) Dužnik koji zadocni sa ispunjenjem novčane obaveze duguje, pored glavnice, i zateznu kamatu po stopi utvrđenoj zakonom.\n\n(2) Ako je stopa ugovorene kamate viša od stope zatezne kamate, ona teče i posle dužnikove docnje.",
  },
]
