/**
 * Measured ijekavian / ekavian surface pairs.
 * Each comment is ILIKE documents for the merged key, in the order
 * Serbia, Croatia, FBiH, RS, Brčko, Montenegro, Slovenia, then the
 * highest stem ratio on the six jurisdictions excluding Slovenia.
 * The search path reads only the two spellings.
 *
 * `mjesto` / `mesto` is absent. Its stem ratio in Croatia is 1.435.
 */
export const DIALECT_PAIRS = [
  /** 11044, 1760, 1385, 1506, 267, 742, 8601; stem 1.033 */
  { ije: "vrijednost", eka: "vrednost" },
  /** 7143, 3184, 1626, 1396, 301, 839, 44; stem 0.989 */
  { ije: "djelatnost", eka: "delatnost" },
  /** 10029, 3917, 3703, 2200, 886, 1410, 3; stem 1.076 */
  { ije: "rješenja", eka: "rešenja" },
  /** 5386, 2243, 2121, 1063, 405, 1010, 13790; stem 1.005 */
  { ije: "mjesec", eka: "mesec" },
  /** 8202, 449, 1198, 886, 146, 530, 6; stem 1.117 */
  { ije: "izvještaj", eka: "izveštaj" },
  /** 12695, 2011, 1470, 997, 114, 313, 53; stem 1.200 */
  { ije: "sljedeće", eka: "sledeće" },
  /** 5692, 0, 500, 476, 49, 486, 6; stem 1.000 */
  { ije: "bezbjednost", eka: "bezbednost" },
  /** 2684, 1290, 1074, 362, 181, 433, 16; stem 1.059 */
  { ije: "podnijet", eka: "podnet" },
  /** 7803, 1335, 979, 871, 134, 452, 35; stem 1.062 */
  { ije: "promjene", eka: "promene" },
  /** 5932, 0, 265, 579, 48, 378, 9; stem 1.011 */
  { ije: "obezbjeđuje", eka: "obezbeđuje" },
  /** 2577, 0, 406, 333, 46, 287, 1; stem 1.014 */
  { ije: "usljed", eka: "usled" },
  /** 3240, 1186, 767, 578, 96, 349, 21; stem 1.006 */
  { ije: "sjedište", eka: "sedište" },
  /** 2154, 424, 332, 195, 55, 218, 4; stem 1.118 */
  { ije: "smještaj", eka: "smeštaj" },
  /** 5565, 1690, 845, 460, 183, 327, 3622; stem 1.098 */
  { ije: "izmjenama", eka: "izmenama" },
  /** 2484, 0, 156, 121, 41, 89, 4; stem 1.000 */
  { ije: "obezbijediti", eka: "obezbediti" },
  /** 3151, 889, 1037, 518, 185, 388, 5896; stem 1.002 */
  { ije: "posljedica", eka: "posledica" },
  /** 3717, 0, 297, 478, 115, 367, 0; stem 1.007 */
  { ije: "obezbjeđenje", eka: "obezbeđenje" },
  /** 1720, 260, 232, 113, 21, 55, 0; stem 1.000 */
  { ije: "sljedećih", eka: "sledećih" },
  /** 884, 653, 517, 319, 185, 252, 11; stem 1.018 */
  { ije: "djeteta", eka: "deteta" },
  /** 2475, 11, 633, 430, 88, 400, 19; stem 1.001 */
  { ije: "obavještenja", eka: "obaveštenja" },
  /** 1381, 446, 345, 96, 69, 36, 6; stem 1.015 */
  { ije: "zamjenik", eka: "zamenik" },
  /** 2244, 500, 601, 218, 105, 160, 30; stem 1.013 */
  { ije: "rješavanje", eka: "rešavanje" },
  /** 1501, 1, 455, 257, 85, 190, 7; stem 1.127 */
  { ije: "djelimično", eka: "delimično" },
  /** 1106, 665, 125, 122, 12, 27, 3; stem 1.003 */
  { ije: "djelokrug", eka: "delokrug" },
  /** 1625, 205, 372, 215, 53, 148, 229; stem 1.000 */
  { ije: "posjeduje", eka: "poseduje" },
  /** 1858, 986, 311, 207, 48, 140, 647; stem 1.200 */
  { ije: "sjednici", eka: "sednici" },
  /** 2854, 316, 348, 187, 62, 183, 170; stem 1.019 */
  { ije: "cjelini", eka: "celini" },
  /** 3097, 0, 104, 133, 8, 127, 2; stem 1.002 */
  { ije: "obezbjeđivanje", eka: "obezbeđivanje" },
  /** 620, 123, 665, 256, 39, 73, 0; stem 1.021 */
  { ije: "maloljetnik", eka: "maloletnik" },
  /** 1040, 190, 242, 114, 45, 133, 1469; stem 1.022 */
  { ije: "zahtijevaju", eka: "zahtevaju" },
  /** 843, 286, 315, 147, 55, 98, 0; stem 1.000 */
  { ije: "umjesto", eka: "umesto" },
  /** 937, 214, 242, 114, 45, 77, 9; stem 1.000 */
  { ije: "primjerak", eka: "primerak" },
  /** 439, 167, 504, 162, 155, 165, 6; stem 1.000 */
  { ije: "svjedok", eka: "svedok" },
  /** 924, 125, 215, 205, 6, 101, 539; stem 1.096 */
  { ije: "odsjek", eka: "odsek" },
  /** 2011, 160, 218, 118, 22, 40, 0; stem 1.053 */
  { ije: "izvještavanje", eka: "izveštavanje" },
  /** 522, 471, 210, 107, 34, 4, 199; stem 1.004 */
  { ije: "cijelosti", eka: "celosti" },
  /** 1668, 219, 144, 55, 13, 55, 943; stem 1.005 */
  { ije: "smjernice", eka: "smernice" },
  /** 1477, 0, 287, 103, 352, 26, 0; stem 1.182 */
  { ije: "odjeljenja", eka: "odeljenja" },
  /** 286, 138, 410, 176, 97, 114, 9; stem 1.000 */
  { ije: "vještak", eka: "veštak" },
  /** 1215, 232, 385, 214, 56, 127, 12; stem 1.013 */
  { ije: "uvjerenja", eka: "uverenja" },
  /** 881, 69, 119, 80, 14, 57, 414; stem 1.112 */
  { ije: "uspjeh", eka: "uspeh" },
  /** 1402, 121, 113, 44, 11, 56, 0; stem 1.009 */
  { ije: "vještina", eka: "veština" },
  /** 777, 41, 102, 78, 13, 51, 2; stem 1.025 */
  { ije: "podrazumijevaju", eka: "podrazumevaju" },
  /** 914, 196, 140, 91, 9, 34, 290; stem 1.007 */
  { ije: "dodjeljuje", eka: "dodeljuje" },
  /** 1002, 224, 290, 258, 66, 123, 51; stem 1.016 */
  { ije: "liječenje", eka: "lečenje" },
  /** 721, 101, 86, 57, 11, 34, 106; stem 1.000 */
  { ije: "predvidjeti", eka: "predvideti" },
  /** 614, 0, 73, 101, 5, 199, 0; stem 1.000 */
  { ije: "primjenjivaće", eka: "primenjivaće" },
  /** 683, 524, 158, 113, 26, 39, 18; stem 1.013 */
  { ije: "zamjenjuje", eka: "zamenjuje" },
  /** 607, 0, 549, 476, 33, 290, 0; stem 1.000 */
  { ije: "povjerioca", eka: "poverioca" },
  /** 871, 413, 41, 59, 6, 27, 3934; stem 1.200 */
  { ije: "mjerila", eka: "merila" },
  /** 599, 148, 107, 66, 28, 1, 1; stem 1.002 */
  { ije: "redoslijed", eka: "redosled" },
  /** 970, 95, 80, 38, 7, 15, 0; stem 1.020 */
  { ije: "procjenjuje", eka: "procenjuje" },
  /** 1752, 244, 96, 88, 14, 84, 31; stem 1.115 */
  { ije: "željezničke", eka: "železničke" },
  /** 631, 100, 95, 79, 15, 90, 5; stem 1.159 */
  { ije: "razrješava", eka: "razrešava" },
  /** 1068, 183, 269, 189, 27, 111, 1; stem 1.009 */
  { ije: "obavještavanje", eka: "obaveštavanje" },
  /** 593, 113, 107, 83, 8, 28, 0; stem 1.039 */
  { ije: "savjetnik", eka: "savetnik" },
  /** 619, 0, 76, 59, 5, 149, 1; stem 1.000 */
  { ije: "donijeće", eka: "doneće" },
  /** 636, 151, 37, 35, 12, 13, 0; stem 1.021 */
  { ije: "povjerenik", eka: "poverenik" },
  /** 620, 105, 59, 36, 2, 38, 772; stem 1.029 */
  { ije: "namijenjenih", eka: "namenjenih" },
  /** 163, 75, 173, 122, 104, 111, 436; stem 1.042 */
  { ije: "nasljednik", eka: "naslednik" },
  /** 2, 715, 45, 2, 6, 0, 7; stem 1.184 */
  { ije: "djelomično", eka: "delomično" },
  /** 542, 58, 39, 31, 7, 31, 1; stem 1.002 */
  { ije: "posljednjih", eka: "poslednjih" },
  /** 547, 0, 21, 55, 2, 30, 0; stem 1.013 */
  { ije: "bezbjedan", eka: "bezbedan" },
  /** 19, 146, 332, 8, 32, 4, 1; stem 1.000 */
  { ije: "vrijednosnih", eka: "vrednosnih" },
  /** 4, 738, 50, 5, 15, 1, 6; stem 1.071 */
  { ije: "sudjelovanje", eka: "sudelovanje" },
  /** 18993, 5328, 5174, 2570, 739, 1728, 26524; stem 1.073 */
  { ije: "zahtjev", eka: "zahtev" },
  /** 481, 1247, 1014, 256, 152, 144, 39; stem 1.000 */
  { ije: "obavijestiti", eka: "obavestiti" },
  /** 637, 314, 936, 213, 126, 178, 6; stem 1.106 */
  { ije: "odjeljak", eka: "odeljak" },
  /** 1175, 612, 336, 120, 55, 82, 6; stem 1.056 */
  { ije: "prijelazne", eka: "prelazne" },
  /** 636, 0, 616, 540, 32, 314, 0; stem 1.002 */
  { ije: "povjerilac", eka: "poverilac" },
  /** 510, 413, 424, 86, 82, 82, 13; stem 1.002 */
  { ije: "primjenjivati", eka: "primenjivati" },
  /** 650, 303, 221, 61, 26, 38, 11; stem 1.000 */
  { ije: "primijeniti", eka: "primeniti" },
  /** 6434, 2168, 814, 369, 129, 479, 8589; stem 1.201 */
  { ije: "predsjednik", eka: "predsednik" },
  /** 3658, 1702, 1022, 394, 189, 375, 21; stem 1.202 */
  { ije: "donijet", eka: "donet" },
  /** 1552, 478, 218, 123, 21, 78, 40; stem 1.242 */
  { ije: "razmjenu", eka: "razmenu" },
  /** 1058, 91, 182, 116, 42, 90, 3; stem 1.240 */
  { ije: "upotrijebljeni", eka: "upotrebljeni" },
  /** 1621, 239, 137, 133, 23, 97, 1; stem 1.232 */
  { ije: "prosječne", eka: "prosečne" },
  /** 2355, 353, 414, 219, 67, 150, 50; stem 1.246 */
  { ije: "posljednje", eka: "poslednje" },
] as const
