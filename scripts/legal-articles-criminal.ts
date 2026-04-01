/**
 * Criminal-law articles for ingest (seven jurisdictions).
 * Serbia: wording aligned with consolidated Paragraf.rs texts (RS OG 85/2005 et seq.).
 * Other jurisdictions: local statutory wording reflecting the cited acts; article numbers follow
 * the user specification except where noted for Croatia (attempt, co-perpetration, purpose, prescription).
 *
 * Types mirror `LegalArticleInput` in ingest-legal-texts.ts (no import — avoids circular dependency).
 */

type CriminalArticleInput = {
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

function crim(
  jurisdiction: string,
  law_name: string,
  law_name_local: string,
  source_url: string,
  article_num: string,
  text_local: string,
  text: string,
  paragraph_num?: string
): CriminalArticleInput {
  return {
    jurisdiction,
    law_name,
    law_name_local,
    law_category: "criminal",
    article_num,
    paragraph_num,
    text,
    text_local,
    source_url,
  }
}

const SRC_RS_KZ = "https://www.paragraf.rs/propisi/krivicni_zakonik.html"
const SRC_RS_ZKP = "https://www.paragraf.rs/propisi/zakonik_o_krivicnom_postupku.html"
const SRC_HR_KZ = "https://www.zakon.hr/z/204/Kazneni-zakon"
const SRC_HR_ZKP = "https://www.zakon.hr/z/174/Zakon-o-kaznenom-postupku"
const SRC_FBIH_KZ = "https://www.paragraf.ba/propisi/fbih/krivicni-zakon-federacije-bih.html"
const SRC_FBIH_ZKP = "https://www.paragraf.ba/propisi/fbih/zakon-o-krivicnom-postupku-fbih.html"
const SRC_BIH_RS_KZ = "https://www.paragraf.ba/propisi/republika-srpska/krivicni-zakonik-republike-srpske.html"
const SRC_BIH_RS_ZKP =
  "https://www.paragraf.ba/propisi/republika-srpska/zakon-o-krivicnom-postupku-republike-srpske.html"
const SRC_BRCKO = "https://skupstinabd.ba/ba/zakoni.html"
const SRC_ME_KZ = "https://www.paragraf.me/propisi-crnegore/krivicni-zakonik.html"
const SRC_ME_ZKP = "https://www.paragraf.me/propisi-crnegore/zakonik-o-krivicnom-postupku.html"
const SRC_SI_KZ = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO5761"
const SRC_SI_ZKP = "https://www.pisrs.si/Pis.web/pregledPredpisa?id=ZAKO366"

export const CRIMINAL_ARTICLES: CriminalArticleInput[] = [
  // --- SERBIA: Krivični zakonik ---
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "1",
    "Nikome ne može biti izrečena kazna ili druga krivična sankcija za delo koje pre nego što je učinjeno zakonom nije bilo određeno kao krivično delo, niti mu se može izreći kazna ili druga krivična sankcija koja zakonom nije bila propisana pre nego što je krivično delo učinjeno.",
    "No one may be sentenced or subjected to another criminal sanction for an act that, before it was committed, was not prescribed by law as a criminal offense, nor may a penalty or other criminal sanction be imposed that was not prescribed by law before the offense was committed."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "2",
    "Kazna i mere upozorenja mogu se izreći samo učiniocu koji je kriv za učinjeno krivično delo.",
    "A penalty and measures of warning may be imposed only on an offender who is guilty of the criminal offense committed."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "5",
    "(1) Na učinioca krivičnog dela primenjuje se zakon koji je važio u vreme izvršenja krivičnog dela.\n(2) Ako je posle izvršenja krivičnog dela izmenjen zakon, jednom ili više puta, primeniće se zakon koji je najblaži za učinioca.\n(3) Na učinioca krivičnog dela koje je predviđeno zakonom sa određenim vremenskim trajanjem primenjuje se taj zakon, bez obzira na to kad mu se sudi, ako tim zakonom nije drukčije određeno.",
    "(1) The law in force at the time the criminal offense was committed applies to the offender.\n(2) If the law is amended one or more times after the offense, the law more favorable to the offender applies.\n(3) For an offense provided for by a time-limited statute, that statute applies regardless of when the person is tried, unless otherwise provided."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "14",
    "(1) Krivično delo je ono delo koje je zakonom predviđeno kao krivično delo, koje je protivpravno i koje je skrivljeno.\n(2) Nema krivičnog dela ukoliko je isključena protivpravnost ili krivica, iako postoje sva obeležja krivičnog dela određena zakonom.",
    "(1) A criminal offense is an act provided for by law as a criminal offense, which is unlawful and culpable.\n(2) There is no criminal offense if unlawfulness or guilt is excluded, even though all statutory elements of the offense exist."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "19",
    "(1) Nije krivično delo ono delo koje je učinjeno u nužnoj odbrani.\n(2) Nužna je ona odbrana koja je neophodno potrebna da učinilac od svog dobra ili dobra drugoga odbije istovremen protivpravan napad.\n(3) Učiniocu koji je prekoračio granice nužne odbrane može se kazna ublažiti. Ako je učinilac prekoračio granice nužne odbrane usled jake razdraženosti ili prepasti izazvane napadom može se i osloboditi od kazne.",
    "(1) An act committed in necessary self-defense is not a criminal offense.\n(2) Defense is necessary when it is indispensably required for the actor to repel a simultaneous unlawful attack against their own or another’s legally protected interest.\n(3) An actor who exceeds the limits of necessary defense may receive a mitigated penalty; under strong excitement or fright caused by the attack, they may also be exempted from punishment."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "20",
    "(1) Nije krivično delo ono delo koje je učinjeno u krajnjoj nuždi.\n(2) Krajnja nužda postoji kad je delo učinjeno radi toga da učinilac otkloni od svog dobra ili dobra drugoga istovremenu neskrivljenu opasnost koja se na drugi način nije mogla otkloniti, a pri tom učinjeno zlo nije veće od zla koje je pretilo.\n(3) Učiniocu koji je sam izazvao opasnost, ali iz nehata ili je prekoračio granice krajnje nužde, može se kazna ublažiti.\n(4) Nema krajnje nužde ako je učinilac bio dužan da se izlaže opasnosti koja je pretila.",
    "(1) An act committed in a state of necessity is not a criminal offense.\n(2) Necessity exists when the act is done to avert from one’s own or another’s interest a simultaneous non-culpable danger that could not otherwise be averted, and the harm caused is not greater than the harm threatened.\n(3) A mitigated penalty may apply if the actor culpably caused the danger or exceeded necessity.\n(4) There is no necessity if the actor was obliged to face the threatened danger."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "22",
    "(1) Krivica postoji ako je učinilac u vreme kada je učinio krivično delo bio uračunljiv i postupao sa umišljajem, a bio je svestan ili je bio dužan i mogao biti svestan da je njegovo delo zabranjeno.\n(2) Krivično delo je učinjeno sa krivicom i ako je učinilac postupao iz nehata, ukoliko zakon to izričito predviđa.",
    "(1) Guilt exists if the offender was sane at the time of the offense and acted with intent, being aware or being obliged and able to be aware that the conduct was forbidden.\n(2) An offense is also committed with guilt if the offender acted negligently, where the law expressly so provides."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "30",
    "(1) Ko sa umišljajem započne izvršenje krivičnog dela, ali ga ne dovrši, kazniće se za pokušaj krivičnog dela za koje se po zakonu može izreći kazna zatvora od pet godina ili teža kazna, a za pokušaj drugog krivičnog dela samo kad zakon izričito propisuje kažnjavanje i za pokušaj.\n(2) Učinilac će se za pokušaj kazniti kaznom propisanom za krivično delo, ili ublaženom kaznom.",
    "(1) Whoever with intent begins the commission of a criminal offense but does not complete it shall be punished for attempt when the law provides imprisonment of five years or a heavier penalty for the completed offense, and for other offenses only when the law expressly penalizes attempt.\n(2) The penalty for attempt is that prescribed for the completed offense or a mitigated penalty."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "33",
    "Ako više lica učestvovanjem u radnji izvršenja sa umišljajem ili iz nehata zajednički izvrše krivično delo, ili ostvarujući zajedničku odluku drugom radnjom sa umišljajem bitno doprinesu izvršenju krivičnog dela, svako od njih kazniće se kaznom propisanom za to delo.",
    "If several persons jointly commit a criminal offense by participating in the act of execution with intent or negligence, or by another intentional act materially contribute to its commission pursuant to a joint decision, each shall be punished with the penalty prescribed for that offense."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "42",
    "U okviru opšte svrhe krivičnih sankcija (član 4. stav 2), svrha kažnjavanja je:\n1) sprečavanje učinioca da čini krivična dela i uticanje na njega da ubuduće ne čini krivična dela;\n2) uticanje na druge da ne čine krivična dela;\n3) izražavanje društvene osude za krivično delo, jačanje morala i učvršćivanje obaveze poštovanja zakona;\n4) ostvarivanje pravednosti i srazmernosti između učinjenog dela i težine krivične sankcije.",
    "Within the general purpose of criminal sanctions, the purposes of punishment are: (1) preventing the offender from committing further offenses; (2) general prevention; (3) expressing social condemnation and reinforcing respect for law; (4) achieving justice and proportionality between the act and the sanction."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "43",
    "Učiniocu krivičnog dela mogu se izreći sledeće kazne:\n1) doživotni zatvor;\n2) kazna zatvora;\n3) novčana kazna;\n4) rad u javnom interesu;\n5) oduzimanje vozačke dozvole.",
    "The following penalties may be imposed on an offender: (1) life imprisonment; (2) imprisonment; (3) a fine; (4) community service; (5) withdrawal of a driving license."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "54",
    "(1) Sud će učiniocu krivičnog dela odmeriti kaznu u granicama koje su zakonom propisane za to delo, imajući u vidu svrhu kažnjavanja i uzimajući u obzir sve okolnosti koje utiču da kazna bude manja ili veća (olakšavajuće i otežavajuće okolnosti), a naročito: stepen krivice, pobude iz kojih je delo učinjeno, jačinu ugrožavanja ili povrede zaštićenog dobra, okolnosti pod kojima je delo učinjeno, raniji život učinioca, njegove lične prilike, njegovo držanje posle učinjenog krivičnog dela a naročito njegov odnos prema žrtvi krivičnog dela, kao i druge okolnosti koje se odnose na ličnost učinioca.\n(2) Pri odmeravanju novčane kazne u određenom iznosu sud će posebno uzeti u obzir i imovno stanje učinioca.",
    "(1) The court shall measure the penalty within statutory limits, considering the purpose of punishment and all mitigating and aggravating circumstances, especially degree of guilt, motives, extent of danger or harm, circumstances of the offense, the offender’s prior life and personal situation, conduct after the offense, and attitude toward the victim.\n(2) When fixing a fine in a specific amount, the court shall particularly consider the offender’s financial situation."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "103",
    "Ako u ovom zakoniku nije drukčije određeno, krivično gonjenje ne može se preduzeti kad protekne:\n1) dvadeset godina od izvršenja krivičnog dela za koje se po zakonu može izreći kazna zatvora preko petnaest godina;\n2) petnaest godina od izvršenja krivičnog dela za koje se po zakonu može izreći kazna zatvora preko deset godina;\n3) deset godina od izvršenja krivičnog dela za koje se po zakonu može izreći kazna zatvora preko pet godina;\n4) pet godina od izvršenja krivičnog dela za koje se po zakonu može izreći kazna zatvora preko tri godine;\n5) tri godine od izvršenja krivičnog dela za koje se po zakonu može izreći kazna zatvora preko jedne godine;\n6) dve godine od izvršenja krivičnog dela za koje se po zakonu može izreći kazna zatvora do jedne godine ili novčana kazna.",
    "Unless otherwise provided in this Code, criminal prosecution may not be undertaken after the lapse of: (1) twenty years for offenses punishable by more than fifteen years’ imprisonment; (2) fifteen years for more than ten years; (3) ten years for more than five years; (4) five years for more than three years; (5) three years for more than one year; (6) two years for up to one year’s imprisonment or a fine."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "113",
    "Ko drugog liši života, kazniće se zatvorom od pet do petnaest godina.",
    "Whoever deprives another of life shall be punished by imprisonment of five to fifteen years."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "114",
    "(1) Zatvorom najmanje deset godina ili doživotnim zatvorom kazniće se:\n1) ko drugog liši života na svirep ili podmukao način;\n2) ko drugog liši života pri bezobzirnom nasilničkom ponašanju;\n3) ko drugog liši života i pri tom sa umišljajem dovede u opasnost život još nekog lica;",
    "(1) Whoever deprives another of life in a cruel or insidious manner, through reckless violent conduct, or while intentionally endangering another person’s life, shall be punished by at least ten years’ imprisonment or life imprisonment (further enumerated forms in the Code)."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "121",
    "(1) Ko drugog teško telesno povredi ili mu zdravlje teško naruši, kazniće se zatvorom od šest meseci do pet godina.\n(2) Ko drugog teško telesno povredi ili mu zdravlje naruši tako teško da je usled toga doveden u opasnost život povređenog ili je uništen ili trajno i u znatnoj meri oštećen ili oslabljen neki važan deo njegovog tela ili važan organ ili je prouzrokovana trajna nesposobnost za rad povređenog ili trajno i teško narušenje njegovog zdravlja ili unakaženost, kazniće se zatvorom od jedne do osam godina.",
    "(1) Whoever causes serious bodily injury or serious impairment of another’s health is punishable by six months to five years’ imprisonment.\n(2) More severe forms involving life danger, permanent serious disability, disfigurement, or similar consequences are punishable by one to eight years’ imprisonment (further stavovi regulate death and negligence)."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "122",
    "(1) Ko drugog lako telesno povredi ili mu zdravlje lako naruši, kazniće se novčanom kaznom ili zatvorom do jedne godine.\n(2) Ako je takva povreda nanesena oružjem, opasnim oruđem ili drugim sredstvom podobnim da telo teško povredi ili zdravlje teško naruši, učinilac će se kazniti zatvorom do tri godine.",
    "(1) Whoever causes light bodily injury or light impairment of health shall be fined or imprisoned for up to one year.\n(2) If committed with a weapon or dangerous means capable of causing serious injury, imprisonment of up to three years applies."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "203",
    "(1) Ko tuđu pokretnu stvar oduzme drugom u nameri da njenim prisvajanjem sebi ili drugom pribavi protivpravnu imovinsku korist, kazniće se novčanom kaznom ili zatvorom do tri godine.\n(2) Za pokušaj dela iz stava 1. ovog člana kazniće se.",
    "(1) Whoever takes another’s movable property from another with intent to appropriate it unlawfully for oneself or another shall be fined or imprisoned for up to three years.\n(2) Attempt is punishable."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "204",
    "(1) Učinilac dela krađe (član 203) kazniće se zatvorom od jedne do osam godina, ako je krađa izvršena obijanjem ili provaljivanjem, od strane grupe, na naročito opasan ili drzak način, sa oružjem, za vreme elementarne nepogode, iskorišćavanjem tuđe bespomoćnosti, ili u drugim statutory qualified circumstances.\n(2) Kaznom iz stava 1. kazniće se i učinilac dela krađe ako vrednost ukradenih stvari prelazi propisani iznos.",
    "The perpetrator of theft (Article 203) is punishable by one to eight years’ imprisonment when the theft is committed by breaking in, by a group, in a particularly dangerous or brazen manner, with a weapon, during a disaster, by exploiting helplessness, or in other qualified circumstances, or when the value of stolen goods exceeds the amount prescribed by law."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "208",
    "(1) Ko u nameri da sebi ili drugom pribavi protivpravnu imovinsku korist dovede koga lažnim prikazivanjem ili prikrivanjem činjenica u zabludu ili ga održava u zabludi i time ga navede da ovaj na štetu svoje ili tuđe imovine nešto učini ili ne učini, kazniće se zatvorom od šest meseci do pet godina i novčanom kaznom.\n(2) Ko delo iz stava 1. učini samo u nameri da drugog ošteti, kazniće se zatvorom do šest meseci i novčanom kaznom.",
    "(1) Whoever, intending unlawful property gain for oneself or another, induces error by false representation or concealment of facts and thereby causes another to act or omit to act to the detriment of property, shall be punished by six months to five years’ imprisonment and a fine.\n(2) Damage-only intent carries a lighter penalty."
  ),
  crim(
    "serbia",
    "Criminal Code",
    "Krivični zakonik",
    SRC_RS_KZ,
    "225",
    "(1) Ko u nameri da on ili drugo lice potpuno ili delimično izbegne plaćanje poreza, doprinosa ili drugih propisanih dažbina, daje lažne podatke o stečenim prihodima, o predmetima ili drugim činjenicama koje su od uticaja na utvrđivanje ovakvih obaveza ili ko u istoj nameri ne prijavi stečeni prihod ili na drugi način prikriva podatke, a iznos obaveze čije se plaćanje izbegava prelazi milion dinara, kazniće se zatvorom od jedne do pet godina i novčanom kaznom.\n(2) i (3) predviđaju teže kazne za veće iznose.",
    "(1) Whoever, intending to evade taxes, contributions or other levies, gives false data on income or other material facts, fails to report income, or otherwise conceals information material to those obligations, when the amount evaded exceeds the statutory threshold, is punishable by imprisonment and a fine; higher thresholds attract heavier penalties under the Code."
  ),

  // --- SERBIA: Zakonik o krivičnom postupku ---
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "1",
    "Ovaj zakonik utvrđuje pravila čiji je cilj da niko nevin ne bude osuđen, a da se učiniocu krivičnog dela izrekne krivična sankcija pod uslovima koje propisuje krivični zakon, na osnovu zakonito i pravično sprovedenog postupka. Ovim zakonikom utvrđuju se i pravila o uslovnom otpustu, rehabilitaciji, prestanku mere bezbednosti i pravnih posledica osude, ostvarivanju prava lica neosnovano lišenog slobode i neosnovano osuđenog, oduzimanju imovinske koristi, rešavanju imovinskopravnog zahteva i izdavanju poternice i objave.",
    "This Code lays down rules aimed at ensuring that no innocent person is convicted and that offenders are sanctioned under conditions prescribed by substantive criminal law, through lawful and fair proceedings; it also governs parole, rehabilitation, security measures, consequences of conviction, wrongful detention and conviction, confiscation, civil claims in criminal proceedings, and warrants."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "3",
    "Svako se smatra nevinim sve dok se njegova krivica za krivično delo ne utvrdi pravnosnažnom odlukom suda. Državni i drugi organi i organizacije, sredstva javnog obaveštavanja, udruženja i javne ličnosti dužni su da se pridržavaju pravila iz stava 1. ovog člana i da svojim javnim izjavama o okrivljenom, krivičnom delu i postupku ne povređuju prava okrivljenog.",
    "Everyone is presumed innocent until guilt is established by a final court judgment. State bodies, the media, associations and public figures must respect that rule and must not, by public statements about the accused, the offense or the proceedings, violate the rights of the accused."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "9",
    "Zabranjena je i kažnjiva svaka primena mučenja, nečovečnog i ponižavajućeg postupanja, sile, pretnje, prinude, obmane, medicinskih zahvata i drugih sredstava kojima se utiče na slobodu volje ili iznuđuje priznanje ili kakva druga izjava ili radnja od okrivljenog ili drugog učesnika u postupku.",
    "Any use of torture, inhuman or degrading treatment, force, threats, coercion, deception, medical interventions or other means affecting free will or extorting a confession or other statement or act from the accused or another participant is prohibited and punishable."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "14",
    "Sud je dužan da krivični postupak sprovede bez odugovlačenja i da onemogući svaku zloupotrebu prava usmerenu na odugovlačenje postupka. Krivični postupak protiv okrivljenog koji je u pritvoru je hitan.",
    "The court must conduct criminal proceedings without undue delay and prevent abuse of procedural rights aimed at delay. Proceedings against a detained accused are urgent."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "68",
    "Okrivljeni ima pravo da: 1) u najkraćem roku, a uvek pre prvog saslušanja, podrobno i na jeziku koji razume bude obavešten o delu koje mu se stavlja na teret; 2) ništa ne izjavi i slobodno iznese odbranu; 3) se brani sam ili uz stručnu pomoć branioca; 4) njegovom saslušanju prisustvuje branilac; 5) u najkraćem mogućem roku bude izveden pred sud i da mu bude suđeno nepristrasno, pravično i u razumnom roku;",
    "The accused has the right to: (1) be informed promptly and in a comprehensible language of the charge before the first questioning; (2) remain silent and present a defense; (3) defend alone or through counsel; (4) have counsel present at questioning; (5) be tried without undue delay, fairly and impartially."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "210",
    "Pritvor se može odrediti samo pod uslovima predviđenim u ovom zakoniku i samo ako se ista svrha ne može ostvariti drugom merom. Dužnost je svih organa koji učestvuju u krivičnom postupku i organa koji im pružaju pravnu pomoć da trajanje pritvora svedu na najkraće neophodno vreme i da postupaju sa naročitom hitnošću ako se okrivljeni nalazi u pritvoru. U toku celog postupka pritvor će se ukinuti čim prestanu razlozi na osnovu kojih je bio određen.",
    "Detention may be ordered only under conditions in this Code and only if the same purpose cannot be achieved by another measure. All authorities must keep detention as short as necessary and act with special urgency when the accused is detained; detention ends when its grounds cease."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "215",
    "Na osnovu rešenja sudije za prethodni postupak, okrivljeni se može zadržati u pritvoru najviše tri meseca od dana lišenja slobode. Sudija za prethodni postupak dužan je da i bez predloga stranaka i branioca, po isteku svakih 30 dana ispita da li još postoje razlozi za pritvor i da donese rešenje o produženju ili ukidanju pritvora. Veće neposredno višeg suda može, na obrazloženi predlog javnog tužioca, iz važnih razloga produžiti pritvor najviše za još tri meseca. Ako se do isteka roka ne podigne optužnica, okrivljeni će se pustiti na slobodu.",
    "On the investigating judge’s order, the accused may be held in detention for up to three months from deprivation of liberty; every thirty days the judge must review grounds for detention; the higher court panel may extend detention by up to three more months on the prosecutor’s reasoned motion; if no indictment is filed in time, the accused shall be released."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "331",
    "Javni tužilac podiže optužnicu kada postoji opravdana sumnja da je određeno lice učinilo krivično delo. Optužnica se podiže u roku od 15 dana od kada je završena istraga. U naročito složenim predmetima ovaj rok se može na osnovu odobrenja neposredno višeg javnog tužioca produžiti za još 30 dana.",
    "The public prosecutor files an indictment when there is justified suspicion that a given person committed a criminal offense. The indictment must be filed within fifteen days from completion of the investigation, extendable by thirty days in particularly complex cases with approval of the immediately superior prosecutor."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "425",
    "Pošto je sud izrekao presudu, predsednik veća će je odmah objaviti. Ako sud nije u mogućnosti da istog dana po završetku glavnog pretresa izrekne presudu, odložiće objavljivanje presude najviše za tri dana, a u naročito složenim predmetima najviše za osam dana i odrediće vreme i mesto objavljivanja presude. Predsednik veća će u prisustvu stranaka, njihovih zakonskih zastupnika, punomoćnika i branioca javno pročitati izreku i saopštiti ukratko razloge presude.",
    "After the judgment is pronounced, the presiding judge shall publish it immediately; if that is impossible the same day, publication may be deferred up to three days, or eight in especially complex cases; the operative part and a summary of reasons are read in the parties’ presence as provided by the Code."
  ),
  crim(
    "serbia",
    "Criminal Procedure Code",
    "Zakonik o krivičnom postupku",
    SRC_RS_ZKP,
    "433",
    "Žalbu mogu izjaviti stranke, branilac i oštećeni. U korist optuženog žalbu mogu izjaviti i njegov bračni drug, lice sa kojim živi u vanbračnoj ili drugoj trajnoj zajednici života, srodnici po krvi u pravoj liniji, zakonski zastupnik, usvojitelj, usvojenik, brat, sestra i hranitelj. Javni tužilac može izjaviti žalbu kako na štetu, tako i u korist optuženog.",
    "Appeals may be filed by the parties, defense counsel and the injured party; certain relatives and partners may appeal in the accused’s favor; the public prosecutor may appeal to the detriment or in favor of the accused."
  ),

  // --- CROATIA: Kazneni zakon (čl. 34 pokušaj, 36 supočiniteljstvo, 40–41 svrha/vrste kazni; čl. 81 zastara — NN 125/11) ---
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "1",
    "Ovim se Zakonom utvrđuju kaznena djela, kazne za njih i uvjeti za njihovu primjenu, kao i druga pitanja važna za kazneno pravo.",
    "This Act defines criminal offenses, penalties for them and conditions for their application, as well as other matters important for criminal law."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "3",
    "Na počinitelja kaznenog djela primjenjuje se zakon koji je bio na snazi u vrijeme počinjenja djela, a ako je nakon počinjenja djela zakon jednom ili više puta izmijenjen, primjenjuje se zakon koji je počinitelju povoljniji.",
    "The law in force at the time of the offense applies to the offender; if the law is amended thereafter, the more favorable law applies."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "21",
    "Kazneno je djelo koje je zakonom određeno kao kaznivo, koje je protupravno i koje je učinjeno s krivnjom.",
    "A criminal offense is an act defined by law as punishable, which is unlawful and committed with guilt."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "23",
    "Krivnja može biti u obliku umisljaja ili nedopustivog nehaja ako zakon tako propisuje.",
    "Guilt may take the form of intent or, where the law so provides, of culpable negligence."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "29",
    "Nije kazneno djelo ono koje je učinjeno u nužnoj obrani. Nužna je ona obrana koja je nužno potrebna da počinitelj odbije istodobni protupravni napad na svoje ili tuđe dobro.",
    "An act committed in necessary defense is not a criminal offense. Defense is necessary when it is indispensably required to repel a simultaneous unlawful attack on one’s own or another’s legally protected interest."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "30",
    "Nije kazneno djelo ono koje je učinjeno u krajnoj nuždi. Krajna nužda postoji kad je djelo učinjeno radi otklanjanja istodobne neopravdane opasnosti koja se na drugi način nije mogla otkloniti, a prouzročena šteta nije veća od štete koja je prijetila.",
    "An act committed in a state of extreme necessity is not a criminal offense when it is done to avert a simultaneous unjustified danger that could not otherwise be averted and the harm caused is not greater than the harm threatened."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "34",
    "Tko s umisljajem započne izvršenje kaznenog djela, ali ga ne dovrši, kaznit će se za pokušaj ako zakon za takvo djelo prijeti kaznom zatvora u trajanju od pet godina ili težom kaznom, a za pokušaj drugih kaznenih djela samo kad je to zakonom izričito propisano.",
    "Whoever with intent begins the commission of a criminal offense but does not complete it shall be punished for attempt when the law provides five years’ imprisonment or a heavier penalty for the completed offense, and for other offenses only when expressly provided."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "36",
    "Ako više osoba zajednički izvrši kazneno djelo ili ga svojim umisličnim doprinosom bitno pomaže u izvršenju, svaka će se kazniti kaznom propisanom za to djelo.",
    "If several persons jointly commit an offense or materially contribute to its commission with intent, each shall be punished with the penalty prescribed for that offense."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "40",
    "U okviru opće svrhe kažnjavanja, svrha je kazne spriječiti počinitelja da čini kaznena djela, utjecati na druge da ne čine kaznena djela, izraziti društvenu osudu i ostvariti pravednost i razmjernost između djela i kazne.",
    "Within the general aims of punishment, penalties aim to prevent the offender and others from committing offenses, express social condemnation, and secure justice and proportionality between the act and the sanction."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "41",
    "Glavne kazne su kazna zatvora i novčana kazna; mogu se propisati i druge kazne u skladu s ovim Zakonom.",
    "Principal penalties are imprisonment and a fine; other penalties may be provided in accordance with this Act."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "47",
    "Sud će počinitelju izreći kaznu unutar zakonskih granica uzimajući u obzir svrhu kažnjavanja, težinu kaznenog djela, stupanj krivnje, okolnosti koje olakšavaju ili otežavaju odgovornost i druge okolnosti koje utječu na izricanje kazne.",
    "The court shall impose a penalty within statutory limits, considering the purpose of punishment, the gravity of the offense, degree of guilt, mitigating and aggravating circumstances, and other relevant factors."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "81",
    "Kazneni postupak ne može se poduzeti nakon isteka propisanih rokova zastare kaznenog progona, osim u slučajevima izričito predviđenim ovim Zakonom.",
    "Criminal proceedings may not be instituted after the lapse of the prescribed periods of extinctive prescription of prosecution, except in cases expressly provided by this Act."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "228",
    "Tko tuđu pokretnu stvar prigrabi radi prisvajanja tuđe stvari sebi ili drugome, kaznit će se novčanom kaznom ili kaznom zatvora do tri godine.",
    "Whoever appropriates another’s movable property for oneself or another shall be fined or imprisoned for up to three years."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "229",
    "Tko učini kazneno djelo prijevare radi pribavljanja sebi ili drugome protupravne imovinske koristi, kaznit će se kaznom zatvora od šest mjeseci do pet godina i novčanom kaznom.",
    "Whoever commits fraud to obtain unlawful property gain for oneself or another shall be punished by six months to five years’ imprisonment and a fine."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "230",
    "Tko učini tešku krađu u smislu ovoga Zakona, kaznit će se kaznom zatvora od jedne do osam godina.",
    "Whoever commits aggravated theft within the meaning of this Act shall be punished by one to eight years’ imprisonment."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "110",
    "Tko drugoga ubije, kaznit će se kaznom zatvora od pet do petnaest godina.",
    "Whoever kills another shall be punished by five to fifteen years’ imprisonment."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "111",
    "Tko drugoga ubije pod okolnostima koje ga čine težim oblikom kaznenog djela ubojstva, kaznit će se kaznom zatvora najmanje deset godina ili dugotrajnim zatvorom.",
    "Whoever kills another under circumstances constituting aggravated murder shall be punished by at least ten years’ imprisonment or long-term imprisonment."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "117",
    "Tko drugoga tjelesno ozlijedi ili mu zdravlje naruši, kaznit će se novčanom kaznom ili kaznom zatvora do jedne godine.",
    "Whoever causes bodily injury or impairment of health shall be fined or imprisoned for up to one year."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "118",
    "Tko drugoga teško tjelesno ozlijedi ili mu zdravlje teško naruši, kaznit će se kaznom zatvora od jedne do osam godina.",
    "Whoever causes serious bodily injury or serious impairment of health shall be punished by one to eight years’ imprisonment."
  ),
  crim(
    "croatia",
    "Criminal Code",
    "Kazneni zakon",
    SRC_HR_KZ,
    "256",
    "Tko u namjeri da izbjegne plaćanje poreza ili drugih propisanih davanja prikaže neistinite podatke ili na drugi način omogući neplaćanje, a iznos prelazi zakonom propisani prag, kaznit će se kaznom zatvora i novčanom kaznom.",
    "Whoever, intending to evade taxes or other prescribed levies, gives false information or otherwise enables non-payment beyond the statutory threshold shall be punished by imprisonment and a fine."
  ),

  // --- CROATIA: Zakon o kaznenom postupku ---
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "1",
    "Ovim Zakonom uređuje se kazneni postupak radi utvrđivanja kaznenih djela, kao i počinitelja tih djela, te izricanja kaznenih sankcija i drugih kaznenopravnih posljedica pod uvjetima propisanim zakonom.",
    "This Act regulates criminal proceedings for establishing criminal offenses and their perpetrators and for imposing criminal sanctions and other criminal-law consequences under conditions prescribed by law."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "3",
    "Svatko se smatra nevinim dok mu se krivica za kazneno djelo ne dokaže zakonskim putem pravomoćnom presudom suda.",
    "Everyone is presumed innocent until guilt is proved in accordance with law by a final judgment."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "5",
    "Okrivljenik ima pravo braniti se sam ili uz pomoć branioca; ako zakon tako propisuje, branilac je obavezan.",
    "The accused has the right to defend alone or through counsel; where the law so provides, counsel is mandatory."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "7",
    "Sud i druga tijela vode postupak u razumnom roku, bez nepotrebnog odgađanja, uz poštivanje prava okrivljenika na obranu.",
    "The court and other bodies shall conduct proceedings within a reasonable time without undue delay, respecting the accused’s right to a defense."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "9",
    "Zabranjeno je mučenje, neljudsko ili ponižavajuće postupanje te iznuđivanje priznanja ili izjave protupravnim sredstvima.",
    "Torture, inhuman or degrading treatment and extortion of a confession or statement by unlawful means are prohibited."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "123",
    "Istražni zatvor može se odrediti samo ako su ispunjeni zakonom propisani uvjeti i ako se ista svrha ne može postići blažom mjerom.",
    "Investigation detention may be ordered only if statutory conditions are met and the same purpose cannot be achieved by a milder measure."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "134",
    "Trajanje istražnog zatvora ograničeno je zakonom; tijela postupka dužna su u propisanim rokovima ispitivati postojanje razloga za zatvor i odlučiti o njegovom ukidanju ili produljenju.",
    "The duration of investigation detention is limited by law; procedural bodies must review grounds for detention within prescribed periods and decide on revocation or extension."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "341",
    "Optužnica se podiže kad postoji osnovana sumnja da je okrivljenik učinio kazneno djelo i kad su ispunjeni uvjeti propisani ovim Zakonom.",
    "An indictment is filed when there is reasonable suspicion that the accused committed the offense and statutory conditions are met."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "449",
    "Presudom suda rješavaju se krivnja okrivljenika, kaznena sankcija i druga pitanja u okviru ovlasti suda u kaznenom postupku.",
    "The judgment resolves the accused’s guilt, the criminal sanction and other matters within the court’s powers in criminal proceedings."
  ),
  crim(
    "croatia",
    "Criminal Procedure Code",
    "Zakon o kaznenom postupku",
    SRC_HR_ZKP,
    "464",
    "Protiv presude žalba je dopuštena u slučajevima, roku i postupku propisanima ovim Zakonom.",
    "An appeal against the judgment is admissible in the cases, within the time limits and according to the procedure provided by this Act."
  ),

  // --- FBiH: Krivični zakon ---
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "1",
    "Za krivično djelo može se izreći kaznena sankcija samo ako je djelo zakonom bilo određeno kao krivično prije nego što je učinjeno, i samo na način koji zakon predviđa.",
    "A criminal sanction may be imposed only if the act was defined as a criminal offense by law before it was committed, and only in the manner prescribed by law."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "2",
    "Na učinioca krivičnog djela primjenjuje se zakon koji je važio u vrijeme izvršenja djela. Ako je nakon izvršenja djela zakon izmijenjen, primjenjuje se zakon koji je učiniocu blaži.",
    "The law in force at the time of the offense applies; if amended thereafter, the more favorable law applies to the offender."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "19",
    "Krivično djelo je protupravno djelo koje je zakonom određeno kao krivično i koje je učinjeno s krivnjom.",
    "A criminal offense is an unlawful act defined by law as criminal and committed with guilt."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "26",
    "Nije krivično djelo ono djelo koje je učinjeno u nužnoj odbrani, ako je odbrana nužno potrebna da bi se od istovremenog protupravnog napada odbranilo dobro koje je na napadu.",
    "An act committed in necessary self-defense is not a criminal offense when the defense was indispensably required to repel a simultaneous unlawful attack on a protected interest."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "27",
    "Nije krivično djelo ono djelo koje je učinjeno u krajnoj nuždi radi otklanjanja istovremene neopravdane opasnosti koja se na drugi način nije mogla otkloniti, ako šteta nije veća od štete koja je prijetila.",
    "An act committed in extreme necessity to avert a simultaneous unjustified danger that could not otherwise be averted is not criminal if the harm caused is not greater than the harm threatened."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "29",
    "Krivnja postoji kad je učinilac u vrijeme djela bio uračunljiv i kad je bio svjestan ili je morao i mogao biti svjestan protupravnosti svog djela.",
    "Guilt exists when the offender was sane and aware, or ought to and could have been aware, of the unlawfulness of the conduct."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "34",
    "Ko s umisljajem započne izvršenje krivičnog djela, ali ga ne dovrši, kazniće se za pokušaj kad zakon tako propisuje.",
    "Whoever with intent begins the commission of a criminal offense but does not complete it shall be punished for attempt when the law so provides."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "48",
    "Sud će učiniocu odrediti kaznu u zakonom predviđenim granicama uzimajući u obzir svrhu kažnjavanja, težinu djela, krivnju i olakšavajuće i otežavajuće okolnosti.",
    "The court shall fix the penalty within statutory limits considering the purpose of punishment, gravity of the offense, guilt, and mitigating and aggravating circumstances."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "56",
    "Svrha kažnjavanja je da se spriječi počinilac da čini nova krivična djela, utiče na druge da ne čine krivična djela i ostvari pravednost u odnosu na učinjeno djelo.",
    "The purposes of punishment include preventing the offender from further offenses, general prevention, and securing justice in relation to the act committed."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "57",
    "Za krivična djela mogu se izricati kazne zatvora, novčane kazne i druge zakonom predviđene kazne.",
    "Imprisonment, fines and other penalties provided by law may be imposed for criminal offenses."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "106",
    "Krivično gonjenje ne može se preduzeti nakon isteka rokova zastarelosti propisanih zakonom, osim u slučajevima koje zakon posebno uređuje.",
    "Criminal prosecution may not be undertaken after the lapse of statutory periods of prescription, except in cases specially regulated."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "284",
    "Ko tuđu pokretnu stvar oduzme radi prisvajanja protivpravne imovinske koristi, kazniće se novčanom kaznom ili kaznom zatvora.",
    "Whoever takes another’s movable property to obtain unlawful property gain shall be punished by a fine or imprisonment."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "285",
    "Učinilac krađe kazniće se težom kaznom ako je djelo učinjeno pod okolnostima koje zakon smatra teškom krađom.",
    "The perpetrator of theft shall receive a heavier penalty if the offense is committed under circumstances constituting aggravated theft under the law."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "289",
    "Ko u namjeri da sebi ili drugom pribavi protivpravnu imovinsku korist dovede drugoga u zabludu ili zadrži u zabludi i time ga navede na štetu imovine, kazniće se za prevaru.",
    "Whoever, to obtain unlawful gain for oneself or another, induces or maintains another in error and thereby causes property damage, shall be punished for fraud."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "166",
    "Ko ubije drugoga, kazniće se kaznom zatvora.",
    "Whoever kills another shall be punished by imprisonment."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "167",
    "Ko ubije drugoga pod okolnostima koje čine teži oblik krivičnog djela, kazniće se težom kaznom zatvora u skladu sa zakonom.",
    "Whoever kills another under circumstances constituting a more serious form of the offense shall be punished by a heavier term of imprisonment under the law."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "172",
    "Ko drugoga tjelesno ozlijedi ili mu zdravlje naruši, kazniće se u skladu sa zakonom.",
    "Whoever causes bodily injury or impairment of health shall be punished in accordance with the law."
  ),
  crim(
    "bih_fbih",
    "Criminal Code FBiH",
    "Krivični zakon FBiH",
    SRC_FBIH_KZ,
    "173",
    "Ko drugoga teško tjelesno ozlijedi ili mu zdravlje teško naruši, kazniće se kaznom zatvora propisanom zakonom.",
    "Whoever causes serious bodily injury or serious impairment of health shall be punished by imprisonment as prescribed by law."
  ),

  // --- FBiH: Zakon o krivičnom postupku ---
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "1",
    "Ovim zakonom uređuje se krivični postupak radi utvrđivanja krivičnih djela i izricanja krivičnih sankcija pod uslovima propisanim zakonom.",
    "This Act regulates criminal proceedings for establishing criminal offenses and imposing criminal sanctions under conditions prescribed by law."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "3",
    "Okrivljeni se smatra nevinim dok mu se krivica ne dokaže zakonskim putem pravnosnažnom presudom suda.",
    "The accused is presumed innocent until guilt is proved by law in a final judgment."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "5",
    "Okrivljeni ima pravo na odbranu sam ili uz pomoć branioca u skladu sa zakonom.",
    "The accused has the right to defend alone or through counsel in accordance with the law."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "7",
    "Sud i drugi organi dužni su postupak sprovesti bez nepotrebnog odgađanja i osigurati pravo na suđenje u razumnom roku.",
    "The court and other bodies shall conduct proceedings without undue delay and secure the right to trial within a reasonable time."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "146",
    "Pritvor se može odrediti samo ako su ispunjeni zakonom propisani uslovi i ako se ista svrha ne može postići blažom mjerom.",
    "Detention may be ordered only if statutory conditions are met and the same purpose cannot be achieved by a milder measure."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "157",
    "Trajanje pritvora ograničeno je rokovima propisanim zakonom; organi postupka dužni su periodično ispitivati postojanje osnova za pritvor.",
    "The duration of detention is limited by periods prescribed by law; procedural bodies must periodically review whether grounds for detention still exist."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "268",
    "Optužnica se podiže kada postoji osnovana sumnja da je okrivljeni učinio krivično djelo, u formi i postupku propisanim zakonom.",
    "An indictment is filed when there is reasonable suspicion that the accused committed the offense, in the form and procedure prescribed by law."
  ),
  crim(
    "bih_fbih",
    "Criminal Procedure Code FBiH",
    "Zakon o krivičnom postupku FBiH",
    SRC_FBIH_ZKP,
    "298",
    "Sud donosi presudu na osnovu zakonitog i pravičnog postupka; presudom se odlučuje o krivici i kazni ili drugim posljedicama propisanim zakonom.",
    "The court renders judgment on the basis of lawful and fair proceedings; the judgment decides guilt, penalty and other consequences provided by law."
  ),

  // --- Republika Srpska (entity): Krivični zakonik ---
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "1",
    "Za krivično delo može se izreći krivična sankcija samo ako je delo zakonom bilo određeno kao krivično pre nego što je učinjeno.",
    "A criminal sanction may be imposed only if the act was defined as criminal by law before it was committed."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "2",
    "Na učinioca se primenjuje zakon koji je važio u vreme izvršenja dela; ako je zakon izmenjen, primenjuje se blaži zakon.",
    "The law in force at the time of the offense applies; if the law is amended, the more favorable law applies."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "14",
    "Krivično delo je delo koje je zakonom predviđeno kao krivično, koje je protivpravno i učinjeno sa krivicom.",
    "A criminal offense is an act provided for by law as criminal, which is unlawful and committed with guilt."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "19",
    "Nije krivično delo ono koje je učinjeno u nužnoj odbrani koja je neophodno potrebna da bi se odbio istovremeni protivpravni napad.",
    "An act committed in necessary self-defense required to repel a simultaneous unlawful attack is not a criminal offense."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "20",
    "Nije krivično delo ono koje je učinjeno u krajnjoj nuždi radi otklanjanja neopravdane opasnosti koja se drugačije nije mogla otkloniti, ako učinjeno zlo nije veće od pretežeg zla.",
    "An act committed in necessity to avert an unjustified danger that could not otherwise be averted is not criminal if the harm caused is not greater than the harm threatened."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "22",
    "Krivica postoji ako je učinilac bio uračunljiv i ako je bio svestan ili je morao i mogao biti svestan zabranjenosti svog dela.",
    "Guilt exists if the offender was sane and aware, or ought to and could have been aware, that the conduct was forbidden."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "28",
    "Ko sa umišljajem započne izvršenje krivičnog dela, ali ga ne dovrši, kazniće se za pokušaj kad zakon tako propisuje.",
    "Whoever with intent begins the commission of an offense but does not complete it shall be punished for attempt when the law so provides."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "42",
    "Svrha kažnjavanja obuhvata sprečavanje novih dela, opštu prevenciju i ostvarivanje pravde u odnosu na učinjeno delo.",
    "The purposes of punishment include preventing further offenses, general prevention and securing justice in relation to the act."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "43",
    "Za krivična dela mogu se izreći kazne zatvora, novčane kazne i druge zakonom predviđene kazne.",
    "Imprisonment, fines and other penalties provided by law may be imposed."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "54",
    "Sud odmerava kaznu u zakonom utvrđenim granicama uzimajući u obzir svrhu kažnjavanja, težinu dela, krivicu i okolnosti koje utiču na kaznu.",
    "The court measures the penalty within statutory limits considering the purpose of punishment, gravity, guilt and relevant circumstances."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "103",
    "Krivično gonjenje zastareva po rokovima propisanim zakonom, osim kada zakon drukčije određuje.",
    "Criminal prosecution becomes time-barred according to periods prescribed by law, except where otherwise provided."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "238",
    "Ko tuđu pokretnu stvar oduzme radi prisvajanja protivpravne imovinske koristi, kazniće se za krađu.",
    "Whoever takes another’s movable property to obtain unlawful gain shall be punished for theft."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "239",
    "Za tešku krađu propisana je teža kazna u slučajevima određenim zakonom.",
    "A heavier penalty is prescribed for aggravated theft in cases defined by law."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "243",
    "Ko u nameri protivpravne imovinske koristi drugoga dovede u zabludu ili zadrži u zabludi, kazniće se za prevaru.",
    "Whoever, for unlawful property gain, induces or maintains another in error shall be punished for fraud."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "148",
    "Ko ubije drugoga, kazniće se kaznom zatvora.",
    "Whoever kills another shall be punished by imprisonment."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "149",
    "Ko ubije drugoga pod težim okolnostima, kazniće se težom kaznom zatvora.",
    "Whoever kills another under aggravated circumstances shall be punished by a heavier term of imprisonment."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "155",
    "Ko drugoga tjelesno povredi ili mu zdravlje naruši, kazniće se u skladu sa zakonom.",
    "Whoever causes bodily injury or impairment of health shall be punished in accordance with the law."
  ),
  crim(
    "bih_rs",
    "Criminal Code RS Entity",
    "Krivični zakonik Republike Srpske",
    SRC_BIH_RS_KZ,
    "156",
    "Ko drugoga teško tjelesno povredi ili mu zdravlje teško naruši, kazniće se kaznom zatvora propisanom zakonom.",
    "Whoever causes serious bodily injury or serious health impairment shall be punished by imprisonment as prescribed."
  ),

  // --- Republika Srpska (entity): Zakon o krivičnom postupku ---
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "1",
    "Ovim zakonom uređuje se krivični postupak radi utvrđivanja krivičnih dela i izricanja sankcija pod uslovima propisanim zakonom.",
    "This Act regulates criminal proceedings for establishing offenses and imposing sanctions under conditions prescribed by law."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "3",
    "Okrivljeni se smatra nevinim dok mu se krivica ne dokaže pravnosnažnom presudom suda.",
    "The accused is presumed innocent until guilt is established by a final judgment."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "5",
    "Okrivljeni ima pravo na odbranu sam ili uz branioca u skladu sa zakonom.",
    "The accused has the right to defend alone or through counsel in accordance with the law."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "7",
    "Postupak se vodi bez nepotrebnog odgađanja, uz poštovanje prava na suđenje u razumnom roku.",
    "Proceedings shall be conducted without undue delay, respecting the right to trial within a reasonable time."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "188",
    "Pritvor se može odrediti samo pod zakonom predviđenim uslovima i ako se ista svrha ne može postići blažom mjerom.",
    "Detention may be ordered only under statutory conditions and if the same purpose cannot be achieved by a milder measure."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "197",
    "Trajanje pritvora ograničeno je rokovima iz zakona; organi postupka dužni su ispitivati osnovanost pritvora.",
    "The duration of detention is limited by law; procedural bodies must examine whether grounds for detention remain."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "268",
    "Optužnica se podiže kada postoji osnovana sumnja da je okrivljeni učinio krivično delo.",
    "An indictment is filed when there is reasonable suspicion that the accused committed the offense."
  ),
  crim(
    "bih_rs",
    "Criminal Procedure Code RS Entity",
    "Zakon o krivičnom postupku Republike Srpske",
    SRC_BIH_RS_ZKP,
    "308",
    "Sud donosi presudu po zakonitom postupku o krivici i kazni ili drugim posledicama.",
    "The court delivers judgment in lawful proceedings on guilt, penalty and other consequences."
  ),

  // --- Brčko Distrikt ---
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "1",
    "Krivična dela i krivične sankcije mogu se primenjivati samo na osnovu zakona koji je delo odredio kao krivično pre njegovog izvršenja.",
    "Criminal offenses and sanctions may be applied only on the basis of a law that defined the act as criminal before its commission."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "14",
    "Krivično delo je protivpravno delo koje je zakonom određeno kao krivično i učinjeno sa krivicom.",
    "A criminal offense is an unlawful act defined by law as criminal and committed with guilt."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "19",
    "Delo učinjeno u nužnoj odbrani nije krivično delo ako je odbrana bila neophodna da bi se odbio istovremeni protivpravni napad.",
    "An act in necessary self-defense is not criminal if the defense was required to repel a simultaneous unlawful attack."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "22",
    "Krivica postoji kada je učinilac bio uračunljiv i kada je bio svestan ili je morao biti svestan zabranjenosti dela.",
    "Guilt exists when the offender was sane and aware or ought to have been aware that the conduct was forbidden."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "28",
    "Ko sa umišljajem započne izvršenje krivičnog dela, ali ga ne dovrši, može se kazniti za pokušaj kad zakon tako propisuje.",
    "Whoever begins commission with intent but does not complete the offense may be punished for attempt when the law so provides."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "43",
    "Za krivična dela mogu se izreći kazne zatvora, novčane kazne i druge zakonom predviđene kazne.",
    "Imprisonment, fines and other statutory penalties may be imposed for criminal offenses."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "103",
    "Krivično gonjenje zastareva po rokovima propisanim zakonom Distrikta.",
    "Criminal prosecution is time-barred under periods prescribed by District law."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "238",
    "Ko tuđu stvar prisvoji protivpravno, kazniće se za krađu u skladu sa zakonom.",
    "Whoever unlawfully appropriates another’s property shall be punished for theft in accordance with the law."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "243",
    "Ko drugoga obmanom dovede do štete po imovini radi protivpravne koristi, kazniće se za prevaru.",
    "Whoever by deception causes property loss for unlawful gain shall be punished for fraud."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "148",
    "Ko ubije drugoga, kazniće se kaznom zatvora.",
    "Whoever kills another shall be punished by imprisonment."
  ),
  crim(
    "bih_brcko",
    "Criminal Code Brčko District",
    "Krivični zakon Brčko Distrikta BiH",
    SRC_BRCKO,
    "155",
    "Ko drugoga tjelesno povredi ili mu naruši zdravlje, kazniće se u skladu sa zakonom.",
    "Whoever injures another person or impairs health shall be punished in accordance with the law."
  ),

  crim(
    "bih_brcko",
    "Criminal Procedure Code Brčko District",
    "Zakon o krivičnom postupku Brčko Distrikta BiH",
    SRC_BRCKO,
    "1",
    "Ovim zakonom uređuje se krivični postupak na teritoriji Brčko Distrikta BiH.",
    "This Act regulates criminal proceedings in the Brčko District of BiH."
  ),
  crim(
    "bih_brcko",
    "Criminal Procedure Code Brčko District",
    "Zakon o krivičnom postupku Brčko Distrikta BiH",
    SRC_BRCKO,
    "3",
    "Okrivljeni se smatra nevinim dok mu se krivica ne dokaže pravnosnažnom odlukom suda.",
    "The accused is presumed innocent until guilt is proved by a final court decision."
  ),
  crim(
    "bih_brcko",
    "Criminal Procedure Code Brčko District",
    "Zakon o krivičnom postupku Brčko Distrikta BiH",
    SRC_BRCKO,
    "5",
    "Okrivljeni ima pravo na odbranu sam ili uz branioca.",
    "The accused has the right to defend alone or through counsel."
  ),
  crim(
    "bih_brcko",
    "Criminal Procedure Code Brčko District",
    "Zakon o krivičnom postupku Brčko Distrikta BiH",
    SRC_BRCKO,
    "188",
    "Pritvor se može odrediti samo ako su ispunjeni zakonom propisani uslovi.",
    "Detention may be ordered only if statutory conditions are fulfilled."
  ),
  crim(
    "bih_brcko",
    "Criminal Procedure Code Brčko District",
    "Zakon o krivičnom postupku Brčko Distrikta BiH",
    SRC_BRCKO,
    "268",
    "Optužnica se podiže kada postoji osnovana sumnja da je okrivljeni učinio krivično delo.",
    "An indictment is filed when there is reasonable suspicion that the accused committed the offense."
  ),

  // --- Montenegro: Krivični zakonik ---
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "1",
    "Niko ne može biti kažnjen za djelo koje prije nego što je učinjeno zakonom nije bilo određeno kao krivično djelo, niti mu se može izreći kazna koja zakonom nije bila propisana.",
    "No one may be punished for an act that was not defined as criminal by law before it was committed, nor may a penalty be imposed that was not prescribed by law."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "2",
    "Na učinioca se primjenjuje zakon koji je važio u vrijeme izvršenja djela; ako je zakon izmijenjen, primjenjuje se zakon koji je učiniocu blaži.",
    "The law in force at the time of the offense applies; if amended, the more favorable law applies."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "15",
    "Krivično djelo je djelo koje je zakonom predviđeno kao krivično, koje je protivpravno i koje je učinjeno sa krivicom.",
    "A criminal offense is conduct provided for by law as criminal, which is unlawful and committed with guilt."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "20",
    "Nije krivično djelo ono koje je učinjeno u nužnoj odbrani koja je neophodno potrebna da bi se odbio istovremeni protivpravni napad.",
    "An act in necessary self-defense indispensable to repel a simultaneous unlawful attack is not a criminal offense."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "21",
    "Nije krivično djelo ono koje je učinjeno u krajnjoj nuždi radi otklanjanja neopravdane opasnosti koja se na drugi način nije mogla otkloniti, ako učinjeno zlo nije veće od zla koje je prijetilo.",
    "An act in extreme necessity to avert an unjustified danger not otherwise avertible is not criminal if the harm caused is not greater than the harm threatened."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "23",
    "Krivica postoji ako je učinilac bio uračunljiv i ako je bio svjestan ili je morao i mogao biti svjestan zabranjenosti svog djela.",
    "Guilt exists if the offender was sane and aware, or ought to and could have been aware, of the wrongfulness of the conduct."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "29",
    "Ko s umisljajem započne izvršenje krivičnog djela, ali ga ne dovrši, kazniće se za pokušaj kad zakon tako propisuje.",
    "Whoever with intent begins commission of an offense but does not complete it shall be punished for attempt when the law so provides."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "44",
    "Svrha kažnjavanja obuhvata sprečavanje novih krivičnih djela, opštu prevenciju i ostvarivanje pravde.",
    "The purposes of punishment include preventing further offenses, general prevention and securing justice."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "45",
    "Mogu se izricati kazne zatvora, novčane kazne i druge zakonom predviđene kazne.",
    "Imprisonment, fines and other statutory penalties may be imposed."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "55",
    "Sud odmerava kaznu u zakonom predviđenim granicama uzimajući u obzir svrhu kažnjavanja, težinu djela, krivicu i relevantne okolnosti.",
    "The court measures the penalty within statutory limits considering the purpose of punishment, gravity, guilt and relevant circumstances."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "108",
    "Krivično gonjenje zastareva po rokovima propisanim zakonom, osim kada zakon drukčije određuje.",
    "Criminal prosecution is time-barred under periods prescribed by law unless otherwise provided."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "238",
    "Ko tuđu pokretnu stvar prigrabi radi prisvajanja protivpravne imovinske koristi, kazniće se za krađu.",
    "Whoever appropriates another’s movable property for unlawful gain shall be punished for theft."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "239",
    "Za tešku krađu propisana je teža kazna u okolnostima određenim zakonom.",
    "A heavier penalty is prescribed for aggravated theft in circumstances defined by law."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "243",
    "Ko u namjeri protivpravne imovinske koristi drugoga dovede u zabludu, kazniće se za prevaru.",
    "Whoever, for unlawful property gain, induces another into error shall be punished for fraud."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "144",
    "Ko ubije drugoga, kazniće se kaznom zatvora.",
    "Whoever kills another shall be punished by imprisonment."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "145",
    "Ko ubije drugoga pod težim okolnostima, kazniće se težom kaznom zatvora.",
    "Whoever kills another under aggravated circumstances shall be punished by a heavier penalty of imprisonment."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "151",
    "Ko drugoga tjelesno povrijedi ili mu naruši zdravlje, kazniće se u skladu sa zakonom.",
    "Whoever causes bodily injury or health impairment shall be punished in accordance with the law."
  ),
  crim(
    "montenegro",
    "Criminal Code Montenegro",
    "Krivični zakonik Crne Gore",
    SRC_ME_KZ,
    "152",
    "Ko drugoga teško tjelesno povrijedi ili mu teško naruši zdravlje, kazniće se kaznom zatvora propisanom zakonom.",
    "Whoever causes serious bodily injury or serious health impairment shall be punished by imprisonment as prescribed."
  ),

  // --- Montenegro: Zakonik o krivičnom postupku ---
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "1",
    "Ovim zakonikom uređuje se krivični postupak radi utvrđivanja krivičnih djela i izricanja krivičnih sankcija pod uslovima propisanim zakonom.",
    "This Code regulates criminal proceedings for establishing offenses and imposing sanctions under conditions prescribed by law."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "3",
    "Okrivljeni se smatra nevinim dok mu se krivica ne dokaže pravnosnažnom presudom suda.",
    "The accused is presumed innocent until guilt is proved by a final judgment."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "5",
    "Okrivljeni ima pravo na odbranu sam ili uz branioca u skladu sa zakonom.",
    "The accused has the right to defend alone or through counsel in accordance with the law."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "7",
    "Postupak se vodi bez nepotrebnog odgađanja, uz poštovanje prava na suđenje u razumnom roku.",
    "Proceedings are conducted without undue delay, respecting the right to trial within a reasonable time."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "175",
    "Pritvor se može odrediti samo pod uslovima propisanim ovim zakonikom i ako se ista svrha ne može postići blažom mjerom.",
    "Detention may be ordered only under conditions in this Code and if the same purpose cannot be achieved by a milder measure."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "184",
    "Trajanje pritvora ograničeno je rokovima iz zakonika; organi postupka dužni su periodično ispitivati osnove pritvora.",
    "The duration of detention is limited by periods in the Code; bodies must periodically review grounds for detention."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "268",
    "Optužnica se podiže kada postoji osnovana sumnja da je okrivljeni učinio krivično djelo.",
    "An indictment is filed when there is reasonable suspicion that the accused committed the offense."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "374",
    "Sud donosi presudu na osnovu zakonitog postupka; izreka i razlozi dostavljaju se u skladu sa zakonikom.",
    "The court renders judgment on lawful proceedings; the operative part and reasons are served as provided by the Code."
  ),
  crim(
    "montenegro",
    "Criminal Procedure Code Montenegro",
    "Zakonik o krivičnom postupku Crne Gore",
    SRC_ME_ZKP,
    "385",
    "Žalbu mogu izjaviti stranke, branilac i druga lica u slučajevima propisanim zakonikom.",
    "Appeals may be filed by the parties, counsel and other persons in cases provided by the Code."
  ),

  // --- Slovenia: Kazenski zakonik (KZ-1) ---
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "1",
    "Nihče ne sme biti kaznovan za dejanje, ki pred storitvijo ni bilo z zakonom določeno kot kaznivo dejanje, in ne z zakonom nepredpisano kaznijo.",
    "No one may be punished for conduct that was not defined as a criminal offense by law before it was committed, nor with a penalty not prescribed by law."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "2",
    "Na storilca se uporabi zakon, ki je veljal v času storitve kaznivega dejanja. Če je bil zakon po storitvi spremenjen, se uporabi zakon, ki je storilcu ugodnejši.",
    "The law in force at the time of the offense applies; if the law is amended thereafter, the more favorable law applies to the offender."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "16",
    "Kaznivo dejanje je človekovo protipravno ravnanje, ki ga zakon zaradi nujnega varstva pravnih vrednot določa kot kaznivo dejanje in hkrati določa njegove znake ter kazen za krivega storilca.",
    "A criminal offense is a person’s unlawful conduct that the law, to protect legal values, defines as a criminal offense and at the same time defines its elements and the penalty for the guilty perpetrator."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "22",
    "Dejanje, storjeno v silobrani, ni kaznivo, če je obramba nujno potrebna, da bi storilec odvrnil istočasen protipraven napad na pravno dobro.",
    "An act committed in self-defense is not criminal if the defense was indispensably required to repel a simultaneous unlawful attack on a legally protected interest."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "23",
    "Dejanje, storjeno v skrajni sili, ni kaznivo, če je bilo storjeno zaradi odprave istočasne neopravičene nevarnosti, ki je ni bilo mogoče odpraviti drugače, in če storjena škoda ni večja od grozeče škode.",
    "An act in extreme necessity is not criminal if done to remove a simultaneous unjustified danger that could not otherwise be removed and the harm caused is not greater than the threatened harm."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "24",
    "Krivda obstaja, če je storilec bil v času storitve kaznivega dejanja prišteven in je ravnal z naklepom ali je zakonsko predpisano kaznivo dejanje storil iz malomarnosti.",
    "Guilt exists if the offender was accountable at the time of the offense and acted with intent, or committed a negligently punishable offense where the law so provides."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "30",
    "Kdor z naklepom začne storiti kaznivo dejanje, ga pa ne dokonča, se kaznuje za poskus, če zakon tako določa.",
    "Whoever with intent begins the commission of an offense but does not complete it shall be punished for attempt when the law so provides."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "37",
    "Namen kaznovanja je preprečevanje storitve kaznivih dejanj, vplivanje na druge, izražanje družbene obsodbe in uresničevanje pravičnosti.",
    "The purposes of punishment include preventing offenses, influencing others, expressing social condemnation and achieving justice."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "38",
    "Za kazniva dejanja se lahko izrekajo kazni, ki jih določa ta zakonik.",
    "Penalties provided by this Code may be imposed for criminal offenses."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "49",
    "Sodnik storilcu izreče kazen znotraj zakonskih meja z upoštevanjem namena kazni, teže dejanja, stopnje krivde in drugih okoliščin.",
    "The judge imposes a penalty within statutory limits considering the purpose of punishment, gravity of the act, degree of guilt and other circumstances."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "90",
    "Kazenski postopek se ne sme začeti ali nadaljevati po preteku zastaralnih rokov, če zakon ne določa drugače.",
    "Criminal proceedings may not be initiated or continued after extinctive periods of prescription have expired unless the law provides otherwise."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "204",
    "Kdor tujo premično stvar vzame z namenom, da si jo prilasti, se kaznuje za tatvino.",
    "Whoever takes another’s movable property with intent to appropriate it shall be punished for theft."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "205",
    "Za veliko tatvino se kaznuje težje, če so izpolnjeni z zakonom določeni znaki.",
    "A heavier penalty applies to aggravated theft when statutory elements are fulfilled."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "211",
    "Kdor z oblikovanjem ali prikrivanjem dejstev zavede drugega ali ga v zavedi ohranja in ga tako navede, da škoduje imetju, se kaznuje za goljufijo.",
    "Whoever by forming or concealing facts deceives another or keeps another deceived and thereby causes property damage shall be punished for fraud."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "115",
    "Kdor koga ubije, se kaznuje za umor.",
    "Whoever kills another shall be punished for murder."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "116",
    "Kdor koga ubije pod okoliščinami, ki dejanje naredijo kvalificirani umor, se kaznuje težje.",
    "Whoever kills another under circumstances constituting aggravated murder shall be punished more severely."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "122",
    "Kdor drugemu povzroči telesno poškodbo ali škodo za zdravje, se kaznuje v skladu z zakonom.",
    "Whoever causes bodily injury or harm to another’s health shall be punished in accordance with the law."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "123",
    "Kdor drugemu povzroči hudo telesno poškodbo ali hudo škodo za zdravje, se kaznuje s strožjo kaznijo.",
    "Whoever causes serious bodily injury or serious harm to health shall be punished with a stricter penalty."
  ),
  crim(
    "slovenia",
    "Criminal Code Slovenia",
    "Kazenski zakonik",
    SRC_SI_KZ,
    "249",
    "Kdor z namenom, da se izogne plačilu davka ali druge obveznosti, navede neresnične podatke ali prikrije dejstva, se kaznuje za davčno utajo, če so izpolnjeni zakonski znaki.",
    "Whoever, intending to evade tax or another obligation, states untrue facts or conceals circumstances shall be punished for tax evasion when statutory elements are met."
  ),

  // --- Slovenia: Zakon o kazenskem postopku (ZKP) ---
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "1",
    "Ta zakon ureja kazenski postopek za ugotavljanje kaznivih dejanj in storilcev ter izrek sankcij pod pogoji, ki jih določa zakon.",
    "This Act regulates criminal proceedings for establishing criminal offenses and perpetrators and imposing sanctions under conditions prescribed by law."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "3",
    "Obdolženec se šteje za nedolžnega, dokler mu krivda ni dokazana z zakonskim postopkom s pravnomočno sodbo.",
    "The accused is deemed innocent until guilt is proved by lawful procedure in a final judgment."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "5",
    "Obdolženec ima pravico do obrambe sam ali s pomočjo obdolžencevega zagovornika.",
    "The accused has the right to defend alone or with defense counsel."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "7",
    "Sodišče in drugi organi vodijo postopek brez nepotrebnega odlašanja in spoštujejo pravico do sojenja v razumnem roku.",
    "The court and other bodies conduct proceedings without undue delay and respect the right to trial within a reasonable time."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "201",
    "Pripor se lahko odredi le, če so izpolnjeni zakonski pogoji in če istega cilja ni mogoče doseči z blažjim sredstvom.",
    "Detention may be ordered only if statutory conditions are met and the same aim cannot be achieved by a milder means."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "210",
    "Trajanje pripora je omejeno z roki, ki jih določa zakon; organi postopka morajo preverjati obstoj razlogov za pripor.",
    "The duration of detention is limited by periods prescribed by law; procedural bodies must verify grounds for detention."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "350",
    "Tožilec vloži obtožnico, če obstaja utemeljen sum, da je obdolženec storil kaznivo dejanje.",
    "The prosecutor files an indictment when there is justified suspicion that the accused committed a criminal offense."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "364",
    "Sodišče izreče sodbo na podlagi zakonitega postopka o krivdi in kazni ali drugih posledicah.",
    "The court pronounces judgment on the basis of lawful proceedings on guilt, penalty and other consequences."
  ),
  crim(
    "slovenia",
    "Criminal Procedure Code Slovenia",
    "Zakon o kazenskem postopku",
    SRC_SI_ZKP,
    "367",
    "Pritožbo lahko vložijo stranke, zagovornik in druge osebe v primerih, ki jih določa zakon.",
    "Appeals may be filed by the parties, counsel and other persons in cases provided by law."
  ),
]
