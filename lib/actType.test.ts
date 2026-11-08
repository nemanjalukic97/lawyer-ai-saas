/**
 * Title → act type, the second dry run.
 * Run: npx tsx --test lib/actType.test.ts
 */
import assert from "node:assert/strict"
import test from "node:test"
import { classifyActType, type ActType, type ActTier } from "./actType"

function expectAct(title: string, actType: ActType | null, tier?: ActTier) {
  const got = classifyActType(title)
  assert.equal(got.actType, actType, title)
  if (tier) assert.equal(got.tier, tier, title)
}

test("the fifty sampled titles keep the dry-run values", () => {
  const sample: Array<[string, ActType]> = [
    ["ZAKON O VANPARNIČNOM POSTUPKU", "zakon"],
    ["ZAKON O ZDRAVSTVENOM OSIGURANJU BRČKO DISTRIKTA BOSNE I HERCEGOVINE", "zakon"],
    ["ZAKON O BANKAMA U BRČKO DISTRIKTU BOSNE I HERCEGOVINE", "zakon"],
    ["ZAKON O JAVNO-PRIVATNOM PARTNERSTVU U BRČKO DISTRIKTU BOSNE I HERCEGOVINE", "zakon"],
    ['ZAKON O UPRAVNOM POSTUPKU("Sl. novine FBiH", br. 2/1998, 48/1999 i 61/2022)', "zakon"],
    ["ZAKON O PRIVREMENOJ ZABRANI RASPOLAGANjA DRŽAVNOM IMOVINOM BOSNE I HERCEGOVINE", "zakon"],
    ["ZAKON O POLjOPRIVREDNOJ ORGANSKOJ PROIZVODNjI", "zakon"],
    ["ZAKON O VJEŠTACIMA", "zakon"],
    ["Zakon o osnovama bezbjednosti saobraćaja na putevima u BiH – neslužbeni prečišćeni tekst (“Službeni glasnik Bosne i Hercegovine”, br. 6/06, 75/06, 44/07, 84/09, 84/10, 18/13, 8/17, 89/17 i 9/18)", "zakon"],
    ["Statut Advokatske komore Federacije Bosne i Hercegovine - prečišćeni tekst", "statut"],
    ["ZAKON O SPOLjNOTRGOVINSKOJ POLITICI BIH", "zakon"],
    ["ZAKON O ELEKTRIČNOJ ENERGIJI", "zakon"],
    ["PRAVILNIKO REGISTRACIJI I PRENOSU HARTIJA OD VRIJEDNOSTI", "pravilnik"],
    ['Zakon o ličnom imenu RS ("Službeni glasnik RS", br. 82/19)', "zakon"],
    ["ZAKON O SOCIJALNOJ ZAŠTITI", "zakon"],
    ["ZAKON O ZAŠTITI I POSTUPANjU SA DJECOM I MALOLjETNICIMA U KRIVIČNOM POSTUPKU", "zakon"],
    ["TARIFAO NAGRADAMA I NAKNADI TROŠKOVA ZA RAD ADVOKATA", "nenormativno"],
    ["Zakon o faktoringu", "zakon"],
    ["Zakon o akademskim i stručnim nazivima i akademskom stupnju", "zakon"],
    ["Zakon o provedbi ovrhe na novčanim sredstvima", "zakon"],
    ["Zakon o izmjenama i dopunama Zakona o državnom odvjetništvu", "zakon"],
    ["Zakon o kaznenim djelima protiv tržišta kapitala", "zakon"],
    ["Zakon o uskrati prava na uvećanje plaće po osnovi ostvarenih godina radnog staža", "zakon"],
    ["Zakon o vlasništvu i drugim stvarnim pravima", "zakon"],
    ["Zakon o zabrani uporabe, stvaranja zaliha, proizvodnje i prijenosa protupješačkih mina i o njihovom uništenju", "zakon"],
    ["ZAKON O KOMUNALNOJ POLICIJI", "zakon"],
    ["ZAKON O CRNOGORSKOM DRŽAVLjANSTVU", "zakon"],
    ["ZAKON O PUTNIM ISPRAVAMA", "zakon"],
    ["ZAKON O ZDRAVSTVENOJ ZAŠTITI", "zakon"],
    ["ZAKON O AMNESTIJI LICA OSUĐENIH ZA KRIVIČNA DJELA PROPISANA ZAKONIMA CRNE GORE I LICA OSUĐENIH STRANOM KRIVIČNOM PRESUDOM KOJA SE IZVRŠAVA U CRNOJ GORI", "zakon"],
    ["ЗАКОН о електронској трговини", "zakon"],
    ["ОДЛУКА о оснивању Савета за праћење система бесплатне правне помоћи и бесплатне правне подршке", "odluka"],
    ["ПРАВИЛНИК о поступку јавног увида, јавне презентације и расправе и израде извештаја о спроведеној јавној распави о студији о процени утицаја пројекта на животну средину", "pravilnik"],
    ["ПРАВИЛНИК о Списку корисника јавних средстава", "pravilnik"],
    ["ОДЛУКА о условима и начину замене страних средстава плаћања за евро", "odluka"],
    ["Закон о одликовањима Републике Србије", "zakon"],
    ["ПРАВИЛНИК о раду Етичког одбора Високог савета судства", "pravilnik"],
    ["ПРАВИЛНИК о подацима лучког пословања", "pravilnik"],
    ["ПРАВИЛНИК о критеријумима и мерилима за оцену стручности, оспособљености и достојности кандидата и поступку за избор главног јавног тужиоца и јавног тужиоца и предлагање кандидата за избор Врховног јавног тужиоца", "pravilnik"],
    ["ОДЛУКА о оснивању Здравственог центра Неготин", "odluka"],
    ["УРЕДБА Комисије (ЕЗ) број 141/2002 од 25. јануара 2002. године у вези са сврставањем одређених роба према Комбинованој номенклатури", "uredba"],
    ["Закон о Српској енциклопедији", "zakon"],
    ["Zakon o spremembah in dopolnitvah Zakona o dolgotrajni oskrbi (ZDOsk-1B)", "zakon"],
    ["Zakon o osebnem imenu (ZOI-1)", "zakon"],
    ["Zakon o ratifikaciji Sporazuma med Vlado Republike Slovenije in Zvezno vlado Republike Avstrije o turističnem prometu na mejnom območju (INTERREG/PHARE - CBC - obmejna panoramska pot) (BATTPM)", "zakon"],
    ["Zakon o ratifikaciji Varnostnega sporazuma med Vlado Republike Slovenije in Zahodnoevropsko unijo (MVSZU)", "zakon"],
    ["Zakon o omejevanju porabe alkohola (ZOPA)", "zakon"],
    ["Zakon o spremembah in dopolnitvah Zakona o zagotavljanju navigacijskih služb zračnega prometa (ZZNSZP-B)", "zakon"],
    ["Zakon o spremembah in dopolnitvah Zakona o državnem tožilstvu (ZDT-1C)", "zakon"],
    ["Zakon o davku na promet nepremičnin (ZDPN-2)", "zakon"],
  ]
  assert.equal(sample.length, 50)
  for (const [title, actType] of sample) expectAct(title, actType)
})

test("every promulgation phrasing from the inventory", () => {
  const rows: Array<[string, ActType | null]> = [
    ["Odluka o proglašenju Zakona o uporabi jezika i pisma nacionalnih manjina u Republici Hrvatskoj", "zakon"],
    ["ОДЛУКА о проглашењу Уставног закона за спровођење Акта о промени Устава Републике Србије", "zakon"],
    ["ОДЛУКА о проглашењу Акта о промени Устава Републике Србије", "ustav"],
    ["УРЕДБА о проглашењу Парка природе „Голијаˮ", "uredba"],
    ["ОДЛУКА о проглашењу старе и ретке библиотечке грађе за културно добро од изузетног значаја", "odluka"],
    ["ОДЛУКА Народне скупштине Републике Србије о потврђивању Одлуке Владе о поништавању аката о проглашењу", "odluka"],
    ["ОДЛУКА о поништавању противправних аката о проглашењу једностраног акта", "odluka"],
    ["ОДЛУКА о проглашењу линија у јавном интересу у ваздушном саобраћају", "odluka"],
    ["ОДЛУКА о проглашењу рибарског подручја „Клисура Ђетиње”", "odluka"],
    ["ОДЛУКА о проглашењу елементарне непогоде", "odluka"],
    ["ОДЛУКА о проглашењу Дана науке у Републици Србији", "odluka"],
    ["ПРАВИЛНИК о проглашењу и заштити строго заштићених и заштићених дивљих врста", "pravilnik"],
    ["НАРЕДБА о проглашењу подручја зараженим карантински штетним организмом", "naredba"],
    ["НАРЕДБА о проглашењу природне непогоде и мерама заштите", "naredba"],
    ["НАРЕДБА о проглашењу престанка епидемије заразне болести COVID-19", "naredba"],
    ["Декларација о проглашењу односа између отаџбине и расејања", "nenormativno"],
    ["Zakon o proglašenju Vukovara mjestom posebnog domovinskog pijeteta", "zakon"],
    ["ЗАКОН о укидању Указа о одузимању држављанства и имовине породици Карађорђевић", "zakon"],
  ]
  for (const [title, actType] of rows) expectAct(title, actType)
})

test("glued titles, a leading number, and a document number", () => {
  expectAct("PRAVILNIKO OBRASCIMA UGOVORA O RADU", "pravilnik")
  expectAct("UREDBAO MEDICINSKOM VJEŠTAČENJU", "uredba")
  expectAct("USTAVREPUBLIKE SRPSKE", "ustav")
  expectAct("USTAVBOSNE I HERCEGOVINE", "ustav")
  expectAct("ZAKLjUČAKVLADE FEDERACIJE", "nenormativno")
  expectAct("STATUTBRČKO DISTRIKTA", "statut")
  expectAct("657 PRAVILNIK o obrascu", "pravilnik")
  expectAct("12-2002-2-pravilnik", "pravilnik")
  expectAct("088-2010-zakonodavni", null)
})

test("stem order and the titles that must stay null or bare", () => {
  expectAct("Krivični zakonik", "zakonik")
  expectAct("ПРАВИЛНИК о правилима", "pravilnik")
  expectAct("zakonodavni odbor", null)
  expectAct("ПРАВИЛНИ о утврђивању водних тела површинских и подземних вода", "pravilnik")
  expectAct("У РЕДБУ", null)
  expectAct("Zakon", "zakon")
  expectAct("ПРАВИЛНИК", "pravilnik")
})

test("collective agreements, and a statute or a prolongation that merely mentions one", () => {
  expectAct("Opći kolektivni ugovor za teritoriju Federacije Bosne i Hercegovine", "kolektivni_ugovor", "neutral")
  expectAct("POSEBNI KOLEKTIVNI UGOVORZA ZAPOSLENE U JAVNIM USTANOVAMA U OBLASTI ZDRAVSTVA", "kolektivni_ugovor")
  expectAct("ПОСЕБАН КОЛЕКТИВНИ УГОВОР за предшколске установе чији је оснивач град Београд", "kolektivni_ugovor")
  expectAct("СПОРАЗУМ о продужењу рока важења Посебног колективног уговора за државне органе", "nenormativno")
  expectAct("Zakon o kolektivnih pogodbah", "zakon")
})

test("the four tiers", () => {
  expectAct("Ustav Republike Hrvatske", "ustav", "statute")
  expectAct("Zakon o radu", "zakon", "statute")
  expectAct("Krivični zakonik", "zakonik", "statute")
  expectAct("Statut Advokatske komore", "statut", "neutral")
  expectAct("Opći kolektivni ugovor", "kolektivni_ugovor", "neutral")
  expectAct("Etički kodeks", "kodeks", "neutral")
  expectAct("нема овде назива", null, "neutral")
  expectAct("PRAVILNIKO OBRASCIMA", "pravilnik", "subordinate")
  expectAct("UREDBA o mreži", "uredba", "subordinate")
  expectAct("ODLUKA o osnivanju", "odluka", "subordinate")
  expectAct("Odlok o proračunu", "odlok", "subordinate")
  expectAct("Sklep o imenovanju", "sklep", "subordinate")
  expectAct("УПУТСТВО о примени", "uputstvo", "subordinate")
  expectAct("НАРЕДБА о мерама", "naredba", "subordinate")
  expectAct("ПОСЛОВНИК Народне скупштине", "pravila", "subordinate")
  expectAct("СТРАТЕГИЈА развоја", "strateski", "non-normative")
  expectAct("ЗАКЉУЧАК Владе", "nenormativno", "non-normative")
})
