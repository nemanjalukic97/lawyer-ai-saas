-- ЗАКОН о заштити потрошача, Службени гласник РС, број 35 од 23. априла 2026.
-- Official register text. 220 articles. No amendments.
-- effective_date is the date of application, not entry into force.
-- 2026-05-01: чл. 4 and чл. 6 (2 rows). 2026-08-01: the other 218.
-- Expect 220 rows inserted. paragraph_num is null, so these rows do not
-- collide with the 138 bulk excerpts on unique_article (NULLs are distinct).
-- Do not run the DELETE in rs-potrosaci-delete-bulk.sql until the
-- verification SELECT below shows 220 curated rows.

-- Члан 1. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '1',
  NULL,
  $en$Purpose and subject matter

Article 1.

For the purpose of protecting the position of consumers, this Law regulates the rights and obligations of consumers, the instruments and methods of protection of consumer rights, the informing of consumers and the improvement of their knowledge of their rights and of the methods of protection of those rights, the rights and obligations of associations and federations whose field of activity is the achievement of the objectives of consumer protection, the out-of-court resolution of consumer disputes, the rights and obligations of state authorities in the field of consumer protection, and other matters of significance for the position and protection of consumers.
$en$,
  $sr$Циљ и предмет

Члан 1.

У циљу заштите положаја потрошача овим законом уређују се права и обавезе потрошача, инструменти и начини заштите права потрошача, информисање и унапређење знања потрошача о њиховим правима и начинима заштите права, права и обавезе удружења и савеза чија је област деловања остваривање циљева заштите потрошача, вансудско решавање потрошачких спорова, права и обавезе државних органа у области заштите потрошача и друга питања од значаја за положај и заштиту потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 2. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '2',
  NULL,
  $en$Basic rights of consumers

Article 2.

The basic rights of consumers are the rights to:

1) satisfaction of basic needs – availability of the most essential goods and services, such as food, clothing, footwear and others;

2) safety – protection against goods and services that are dangerous to life, health, property or the environment, or goods whose possession or use is prohibited;

3) information – having at one's disposal accurate data necessary for a reasonable choice of the goods and services offered;

4) choice – where it is applicable, the possibility of choosing among several goods and services at affordable prices and with appropriate quality;

5) participation – representation of the interests of consumers in the procedure of making and implementing consumer protection policy, and the possibility of being represented, through associations and federations of associations for the protection of consumers, in the procedure of adopting and implementing consumer protection policy;

6) legal protection – protection of the consumer's rights in the procedure provided for by law in the event of a violation of the consumer's right, and compensation for material and non-material damage caused to the consumer by a trader;

7) education – acquisition of the basic knowledge and skills necessary for a proper and reliable choice of products and services, as well as knowledge of the basic rights and duties of consumers and of the manner of exercising them.
$en$,
  $sr$Основна права потрошача

Члан 2.

Основна права потрошача су права на:

1) задовољавање основних потреба – доступност најнужнијих роба и услуга, као што су храна, одећа, обућа и др;

2) безбедност – заштита од робе и услуга које су опасне по живот, здравље, имовину или животну средину или робе чије је поседовање или употреба забрањена;

3) обавештеност – располагање тачним подацима који су неопходни за разуман избор понуђене робе и услуга;

4) избор – тамо где је примењиво, могућност избора између више роба и услуга по приступачним ценама и уз одговарајући квалитет;

5) учешће – заступљеност интереса потрошача у поступку доношења и спровођења политике заштите потрошача и могућност да преко удружења и савеза удружења за заштиту потрошача буде заступљен у поступку усвајања и спровођења политике заштите потрошача;

6) правну заштиту – заштита права потрошача у законом предвиђеном поступку у случају повреде његовог права и накнада материјалне и нематеријалне штете коју му проузрокује трговац;

7) едукацију – стицање основних знања и вештина неопходних за правилан и поуздан избор производа и услуга, као и знања о основним правима и дужностима потрошача и начину њиховог остваривања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 3. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '3',
  NULL,
  $en$Binding nature

Article 3.

A consumer may not waive the rights established by this Law.

A provision of a contract or another declaration of will that directly or indirectly denies or restricts the rights of consumers arising from this Law is null and void.

The nullity of an individual provision of a contract referred to in paragraph 2 of this Article does not imply the nullity of the entire contract if the contract can produce legal effect without that provision.

Unless this Law provides otherwise, contractual provisions by which, to the detriment of the consumer, the application of the provisions of this Law is excluded, a derogation is made from them, or the consequences are altered before the consumer notifies the trader of non-delivery or lack of conformity, or before the trader notifies the consumer of a modification of the digital content or digital service in accordance with Article 86 of this Law (right of redress – chain in the supply), are null and void.

This Law also applies to contracts whose purpose or effect is to circumvent the application of its provisions.

In the interpretation and application of this Law, the position of the consumer as the economically weaker party must be taken into account, and in particular the position of the vulnerable consumer.

Relations between a consumer and a trader that are not regulated by the provisions of this Law are governed by the law regulating obligations.

In defining and applying the measures and activities of state authorities, the objectives of consumer protection must also be taken into account.
$en$,
  $sr$Обавезујућа природа

Члан 3.

Потрошач не може да се одрекне права утврђених овим законом.

Одредба уговора или друга изјава воље која директно или индиректно ускраћује или ограничава права потрошача која произлазе из овог закона ништава је.

Ништавост поједине одредбе уговора из става 2. овог члана не подразумева ништавост целог уговора ако уговор може да производи правно дејство без те одредбе.

Ако овим законом није предвиђено другачије, уговорне одредбе којима се на штету потрошача искључује примена одредби овог закона, одступа од њих или се последице мењају пре него што потрошач обавести трговца о неиспоруци или несаобразности или пре него што трговац обавести потрошача о измени дигиталног садржаја или дигиталне услуге у складу са чланом 86. овог закона (право на регрес – ланац у испоруци) ништаве су.

Овај закон примењује се и на уговоре који за циљ или последицу имају изигравање примене његових одредаба.

Приликом тумачења и примене овог закона, мора се узети у обзир положај потрошача као економски слабије стране, а посебно положај угроженог потрошача.

На односе између потрошача и трговца који нису уређени одредбама овог закона, примењује се закон којим се уређују облигациони односи.

Приликом дефинисања и примене мера и активности државних органа, у обзир се морају узети и циљеви заштите потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 4. expect 1 row. application 2026-05-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '4',
  NULL,
  $en$Application

Article 4.

The provisions of this Law apply to relations between a consumer and a trader, unless the relationship between the consumer and the trader is regulated by a special law which, in the part regulating the relationship between the consumer and the trader, is aligned with the acquis of the European Union, in which case that special law applies.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from distance contracts and contracts concluded outside business premises do not apply to contracts concluded by the use of automatic vending machines for goods or services or in business premises that are automated, and to contracts for the sale of food or beverages in temporary facilities. Articles 12 and 13, Articles 27–38, Article 48 and Articles 51 and 52 of this Law do not apply to contracts concluded in the field of:

1) the provision of services under contracts for the organisation of travel, a linked travel arrangement, timeshare of immovable property, and the rights of consumers under contracts for the stay of pupils or students in a family abroad or other appropriate accommodation;

2) periodic delivery of food, beverages or other products intended for everyday use in the household which the trader delivers to the consumer at regular time intervals;

3) contracts concluded by the use of automatic vending machines for goods or services or in business premises that are automated;

4) for the sale of food and beverages in temporary facilities;

5) for passenger transport services, with the exception of Articles 13 and 14, Article 32, paragraphs 4 and 5, and Article 49 of this Law;

6) which relate to all goods that are sold in enforcement proceedings or otherwise in accordance with the law.

The provisions of this Law regulating liability for defective products do not apply to liability for damage caused by nuclear accidents and to liability for damage regulated by ratified international treaties.

The provisions of Chapters IV and VI of this Law apply to every contract concluded between a trader and a consumer by which the consumer pays or undertakes to pay a price, including contracts for the supply of water, gas, electricity or central heating, even when they are supplied by public service providers, to the extent that those goods are supplied on the basis of a contract.

The provisions of Chapter IX of this Law are without prejudice to the provisions of the law regulating the protection of personal data and the provisions of the law regulating electronic communications which regulate the protection of personal data in electronic communications. In the event of a conflict of regulations, the provisions of the law regulating the protection of personal data shall apply.

The provisions of Chapter IX of this Law also apply to data carriers that serve exclusively as carriers of digital content, and do not apply to digital content or digital services that are incorporated in goods or are interconnected with goods in such a way that the goods could not function without that digital content or that digital service, irrespective of whether it is supplied by the trader or a third party.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from contracts on: the organisation of travel, a linked travel arrangement, and timeshare of immovable property also apply to the rights of consumers under contracts for the stay of pupils or students in a family abroad or other appropriate accommodation.

Matters of the protection of users of financial services, that is, the protection of participants in the capital market, are governed by the provisions of a special law.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from contracts of sale also apply to contracts for the supply of goods that are the subject of manufacture or making, irrespective of whether, under the general rules, it is a contract of sale, a contract for work or another contract for consideration, to contracts for the supply of digital content or a digital service regardless of whether they have been developed in accordance with the consumer's specifications, as well as to contracts for the sale of goods that have digital content or a digital service incorporated in them or are interconnected with them in such a way that the goods could not function without that digital content or that digital service, regardless of whether they are supplied by the trader or a third party.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from contracts of sale apply to contracts under which the trader supplies or undertakes to supply digital content or a digital service to the consumer, as well as to data carriers that serve exclusively as carriers of digital content, and the consumer provides or undertakes to provide personal data to the trader, unless the trader processes the personal data provided by the consumer exclusively for the purpose of supplying the digital content or the digital service, or if the trader has an obligation to obtain personal data prescribed by other regulations and does not process them for other purposes.

In the event of doubt as to whether the supply of incorporated or interconnected digital content or a digital service forms part of the contract of sale of goods with digital elements, it is presumed that the digital content and the digital service form part of the contract of sale.

Where a contract between the same contracting parties includes in a package elements of the supply of digital content or a digital service and elements of the provision of other services or goods, the provisions of this Law regulating the protection of consumers in the exercise of rights arising from a contract for the supply of digital content or a digital service apply to the elements of the contract relating to digital content or digital services.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from a contract for the supply of digital content or a digital service also apply to durable data carriers that serve exclusively as carriers of digital content, except Articles 73 and 79 of this Law.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from a contract for the supply of digital content or a digital service do not apply to:

1) contracts for the provision of services that are not digital, regardless of whether the trader used digital forms or means in order to produce the final product of the service or to supply or transmit it to the consumer;

2) contracts for the provision of electronic communications services, except communications services between persons not based on the use of numbering, within the meaning of the law regulating electronic communications;

3) healthcare, within the meaning of the law regulating healthcare;

4) games of chance, games of chance in casinos, games of chance on gaming machines, games of chance – betting, and games of chance by means of electronic communications, within the meaning of the law regulating games of chance;

5) the supply of software which the trader offers under a free and open licence, where the consumer does not pay a price and the trader processes the personal data provided by the consumer exclusively for the purpose of improving the security, compatibility or interoperability of that specific software;

6) the supply of digital content where the digital content is presented to the public by a technology that is not transmitted by a signal, as part of a performance or event (e.g. a digital film projection);

7) the supply of digital content provided by the public sector and relating to the re-use of data in accordance with the law regulating electronic administration.

The provisions of this Law relating to the conformity of goods also apply to goods with a digital element, and the provisions of this Law relating to a contract for the supply of digital content and digital services apply to every contract by which the trader undertakes to supply to the consumer digital content or a digital service not incorporated in goods with a digital element, and the consumer undertakes to pay a specified price.

The provisions of this Law regulating the protection of consumers in the exercise of rights arising from contracts of sale do not apply to the sale of goods sold within enforcement proceedings or otherwise in accordance with the law.

The decision establishing the list of special laws referred to in paragraph 1 of this Article is adopted by the Government.
$en$,
  $sr$Примена

Члан 4.

Одредбе овог закона примењују се на односе између потрошача и трговца осим ако је однос потрошача и трговца уређен посебним законом који је у делу којим се уређује однос потрошача и трговца усклађен са правном тековином Европске уније, у коме случају се примењује тај посебан закон.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора на даљину и уговора закључених изван пословних просторија не примењују се на уговоре који су закључени употребом аутомата за продају робе или услуга или у пословним просторијама које су аутоматизоване и уговоре о продаји хране или пића у привременим објектима. Чл. 12. и 13, чл. 27–38, члан 48. и чл. 51. и 52. овог закона не примењују се на уговоре који се закључују у области:

1) пружања услуга из уговора о организовању путовања, повезаном путном аранжману, временски подељеном коришћењу непокретности и права потрошача из уговора о боравку ученика или студената у породици у иностранству или другом одговарајућем смештају;

2) периодичне доставе хране, пића или других производа намењених свакодневној употреби у домаћинству које трговац испоручује у правилним временским размацима потрошачу;

3) уговоре који су закључени употребом аутомата за продају робе или услуга или у пословним просторијама које су аутоматизоване;

4) за продају хране и пића у привременим објектима;

5) за услуге превоза путника, са изузетком чл. 13. и 14, члана 32. ст. 4. и 5. и члана 49. овог закона;

6) који се односе на сву робу која се продаје у поступку извршења или на други начин у складу са законом.

Одредбе овог закона којима се уређује одговорност за производе са недостатком не примењују се на одговорност за штету проузроковану нуклеарним удесима и на одговорност за штету која је уређена потврђеним међународним уговорима.

Одредбе главе IV. и VI. овог закона примењују се на сваки уговор закључен између трговца и потрошача, којим потрошач плаћа или се обавезује да плати цену, укључујући и уговоре за испоруку воде, плина, електричне енергије или централног грејања, чак и када их испоручују јавни пружаоци услуга, у мери у којој се та добра испоручују на основу уговора.

Одредбе главе IX. овог закона не доводе у питање одредбе закона којим се регулише заштита података о личности и одредбе закона којим се регулишу електронске комуникације, а које уређују заштиту података о личности у електронским комуникацијама. У случају колизије прописа примењиваће се одредбе закона којим се уређује заштита података о личности.

Одредбе главе IX. овог закона примењују се и на носаче података који служе искључиво као носачи дигиталног садржаја, а не примењују се на дигитални садржај или дигиталне услуге који су уграђени у робу или су повезани с робом тако да без тог дигиталног садржаја или те дигиталне услуге роба не би могла да функционише, независно о томе да ли је испоручује трговац или треће лице.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о: организовању путовања, повезаном путном аранжману, временски подељеном коришћењу непокретности примењују се и на права потрошача из уговора о боравку ученика или студената у породици у иностранству или другом одговарајућем смештају.

На питања заштите корисника финансијских услуга, односно заштите учесника на тржишту капитала, примењују се одредбе посебног закона.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о продаји примењују се и на уговоре о испоруци робе која је предмет производње или израде, независно од тога да ли је по општим правилима реч о уговору о продаји, уговору о делу или другом теретном уговору, на уговоре о испоруци дигиталног садржаја или дигиталне услуге без обзира да ли су развијени у складу са спецификацијама потрошача, као и на уговоре о продаји робе која има уграђен дигитални садржај или дигиталну услугу или је повезана са њима тако да без тог дигиталног садржаја или те дигиталне услуге роба не би могла да функционише, без обзира да ли је испоручују трговац или треће лице.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о продаји примењују се на уговоре у којима трговац испоручује или се обавезује да испоручи дигитални садржај или дигиталну услугу потрошачу, као и на носаче података који служе искључиво као носачи дигиталног садржаја, а потрошач доставља или се обавезује да достави податке о личности трговцу, осим ако податке о личности које достави потрошач трговац обрађује искључиво у сврху испоруке дигиталног садржаја или дигиталне услуге, или ако трговац има обавезу прибављања података о личности прописану другим прописима, а не обрађује их у друге сврхе.

У случају сумње да ли је испорука уграђеног или повезаног дигиталног садржаја или дигиталне услуге део уговора о купопродаји робе са дигиталним елементима, претпоставља се да су дигитални садржаји и дигитална услуга део уговора о купопродаји.

Када уговор између истих уговорних страна у пакету укључује елементе испоруке дигиталног садржаја или дигиталне услуге и елементе пружања других услуга или робе, на елементе уговора који се односе на дигитални садржај или дигиталне услуге, примењују се одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о испоруци дигиталног садржаја или дигиталне услуге.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о испоруци дигиталног садржаја или дигиталне услуге примењују се и на трајне носаче података који служе искључиво као носачи дигиталног садржаја, осим чл. 73. и 79. овог закона.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о испоруци дигиталног садржаја или дигиталне услуге не примењују се на:

1) уговоре о пружању услуга које нису дигиталне, без обзира да ли је трговац употребио дигиталне облике или средства како би произвео крајњи производ услуге или га испоручио или пренео потрошачу;

2) уговоре о пружању електронских комуникационих услуга осим комуникационих услуга између лица која није заснована на коришћењу нумерације, у смислу закона којим се уређују електронске комуникације;

3) здравствену заштиту, у смислу закона којим се уређује здравствена заштита;

4) игре на срећу, игре на срећу у играчницама, игре на срећу на аутоматима, игре на срећу – клађење и игре на срећу преко средстава електронске комуникације, у смислу закона којим се уређују игре на срећу;

5) испоруку софтвера који трговац нуди на основу бесплатне и отворене лиценце, при чему потрошач не плаћа цену а податке о личности које потрошач достави трговац обрађује искључиво у сврху побољшања сигурности, компатибилности или интероперабилности тог конкретног софтвера;

6) испоруку дигиталног садржаја када је дигитални садржај приказан јавности технологијом која се не преноси сигналом као део наступа или догађања (нпр. дигитална филмска пројекција);

7) испоруку дигиталног садржаја коју пружа јавни сектор, а односи се на поновну употребу података у складу са законом којим се регулише електронска управа.

Одредбе овог закона које се односе на саобразност робе примењују се и на робу с дигиталним елементом, а одредбе овог закона које се односе на уговор о испоруци дигиталног садржаја и дигиталних услуга примењују се на сваки уговор којим се трговац обавезује да испоручи дигитални садржај или дигиталну услугу потрошачу који нису инкорпорирани у робу с дигиталним елементом, а потрошач се обавезује да плати одређену цену.

Одредбе овог закона којима се уређује заштита потрошача у остваривању права из уговора о продаји не примењују се на продају робе која се продаје у оквиру поступка извршења или на други начин у складу са законом.

Одлуку којом се утврђује листа посебних закона из става 1. овог члана, доноси Влада.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-05-01'
);

-- Члан 5. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '5',
  NULL,
  $en$Meaning of certain expressions

Article 5.

Certain expressions used in this Law have the following meaning:

1) consumer is a natural person who acquires goods or services on the market for purposes which are not intended for that person's business or other commercial activity;

2) trader is a legal person, entrepreneur or natural person who acts on the market within the scope of that person's business activity or for other commercial purposes, including other persons who operate in that person's name or for that person's account, in connection with contracts governed by this Law;

3) organiser is a trader who organises a tourist trip and sells or offers it for sale, directly or through an intermediary or together with another trader, or a trader who transmits data on the traveller to another trader, in the manner prescribed by this Law. The organiser carries out the activity on the basis of a prescribed licence;

4) intermediary is a trader who sells or offers for sale a tourist trip compiled by the organiser and sells other travel services, for which activities a prescribed licence is not required;

5) sales contract is any contract whereby the trader transfers or undertakes to transfer ownership of goods to the consumer, and the consumer pays or undertakes to pay the price, including a contract which has as its subject both the sale of goods and the provision of a service;

6) goods are considered to be:

(1) a tangible movable thing; water, gas and electricity are considered goods when they are offered for sale in a limited volume or a limited quantity, and

(2) goods with digital elements, being a tangible movable thing which has digital content or a digital service incorporated in it or is connected with them in such a way that the goods could not function without that digital content or that digital service;

7) distance contract is a contract concluded between the trader and the consumer within the framework of organised distance selling or the provision of services at a distance, without the simultaneous physical presence of the trader and the consumer, by the exclusive use of one or more means of distance communication up to the moment of conclusion of the contract, including the moment of conclusion itself;

8) means of distance communication is a means which enables the conclusion of a contract between the trader and the consumer who are not in the same place at the same time;

9) digital content means data which are produced and supplied in digital form;

10) a contract concluded, as well as a contract for which the consumer made an offer, off business premises is any contract between the trader and the consumer concluded off the trader's business premises with the simultaneous physical presence of the trader and the consumer; a contract concluded on the trader's business premises or by means of distance communication, negotiations for the conclusion of which were conducted off the trader's business premises with the simultaneous physical presence of the trader and the consumer; a contract concluded during a trip organised by the trader which had as its aim or consequence the promotion and sale of goods or services to the consumer;

11) business premises are immovable retail premises in which the trader permanently carries out that trader's activity, as well as movable retail premises in which the trader usually carries out that trader's activity;

12) order form is a written or electronic message which contains contractual terms which the consumer signs off the trader's business premises with the intention of concluding a contract;

13) product is, within the meaning of the provisions of this Law governing unfair business practices, any goods or service, including immovable property, rights and obligations, digital services and digital content, and, within the meaning of the provisions of this Law governing liability for defective products, a movable thing which is separate or incorporated into another movable or immovable thing, including energy produced or collected for the purpose of providing light, heat or movement, digital services and digital content;

14) professional diligence is the heightened care and skill which is reasonably expected of a trader, in legal transactions, in dealings with consumers, in accordance with good customs and the principle of good faith and fair dealing;

15) producer, within the meaning of the provisions of this Law on liability for defective products, is a person:

(1) who produces or imports finished products, goods, raw materials and component parts into the territory of the Republic of Serbia for the purpose of sale, hire, leasing or another kind of circulation;

(2) who presents himself as the producer by placing his name, trade mark or other distinctive sign on the goods;

(3) a trader in a product which does not contain data on the producer, if that trader does not without delay inform the injured person of the identity of the producer, that is, of the person from whom the product was obtained;

(4) a trader in an imported product which contains data on the producer but does not contain data on the importer;

16) linked contract is a contract on the basis of which the consumer acquires goods or services which are connected with a distance contract or a contract concluded off the trader's business premises, under which the goods are supplied or the services are provided by the trader or by a third person on the basis of an agreement between the third person and the trader;

17) public auction is a procedure for the sale of goods in a transparent procedure, by the competitive bidding of consumers, on a market basis, conducted by an auctioneer, and in which the consumers attend the sale or are given the opportunity to attend, whereby the participant in the bidding who makes the best offer is obliged to purchase the goods;

18) business practice is any act or omission of the trader, the manner of the trader's conduct of business or presentation, and business communication, including advertising which is directly connected with the promotion, sale or supply of a product to consumers;

19) average consumer is a consumer who is well informed and reasonably circumspect, taking into account social, cultural and linguistic characteristics;

20) contractual term is any term of a contract, including special terms, the content of which the consumer negotiated or could have negotiated with the trader, as well as general terms the content of which was determined in advance by the trader or a third party;

21) personal data is any data relating to a natural person, as defined by the law governing the protection of personal data;

22) service contract is any contract, other than a sales contract, in accordance with which the trader provides or undertakes to provide a service to the consumer, including a digital service;

23) service of general economic interest is a service the quality, conditions of provision or price of which is regulated or controlled by a state authority or another holder of public authority, in particular because of the high value of the initial investments, the limited nature of the resources necessary for its provision, sustainable development, social solidarity and the need for uniform regional development, and for the purpose of satisfying the general social interest (for example, services in the field of energy, the supply of drinking water, the treatment and drainage of atmospheric water and waste water, the carriage of passengers in domestic public line transport, electronic communications services, universal postal services, municipal waste management, the management of cemeteries and burial, the management of public car parks, the performance of chimney-sweeping services and the like);

24) travel services are the carriage of passengers, accommodation which is not provided within a means of transport intended for the carriage of passengers, the rental of cars, other motor vehicles or motorcycles (hereinafter: rental of motor vehicles) and other tourism services;

25) other tourism services are services which do not form an integral part of carriage, accommodation or the rental of motor vehicles and which may be the sale of tickets for concerts, sporting events and amusement parks, as well as tourist guide services and the like.

26) tourist trip is a package arrangement, as a combination of two or more travel services (carriage, accommodation, rental of motor vehicles and other tourism services), which the organiser, independently or at the request of the traveller, offered, prepared or combined, all of a duration longer than 24 hours or of a shorter duration if it includes one overnight stay, as well as one or more overnight stays which include only the accommodation service in a specified period or duration of time and which is sold at a price expressed as a single amount. An excursion, a trip for one's own needs and a linked travel arrangement shall not be considered a tourist trip, except in the case prescribed by this Law;

27) trip for one's own needs is a trip which non-profit organisations provide occasionally, to a limited extent, without the purpose of making a profit, exclusively for a limited number of their members;

28) contract on the organisation of a trip is a contract on a tourist trip which comprises all the services from the travel programme, as well as the special requirements of the traveller, which form an inseparable part necessary for the realisation of the trip, with a clearly indicated beginning and end of the trip, and which is sold at a single selling price and consists of the general travel conditions, the travel programme, the travel confirmation, the voucher and others;

29) linked travel arrangement represents at least two different travel services, other than accommodation, purchased for the purposes of the same trip, if the organiser or the intermediary, during a single visit or contact of the traveller with the direct provider of that service, at one point of sale, enables the selection and separate payment of each travel service, or enables the targeted purchase of at least one additional travel service from another trader, if the contract with that other trader is concluded no later than 24 hours after confirmation of the booking of the first travel service. A linked travel arrangement does not represent a tourist trip, except in the cases prescribed by this Law;

30) traveller is a consumer who purchases, or for whose account is purchased, or a consumer who uses, a tourist trip, a linked travel arrangement or an excursion, as well as another tourism service;

31) lack of conformity of a tourist trip service is non-performance, partial performance or improper performance of the services comprised in a tourist trip, an excursion or another tourist service;

32) point of sale of a travel service is a space or premises where the sale is carried out, or a website or a similar internet system for the sale of a travel service via the internet;

33) repatriation is the return of the traveller to the place of departure or to another place which the contracting parties agree upon;

34) contract on the time-shared use of immovable property (timeshare) is a contract whereby the trader undertakes to give the consumer the use, on two or more occasions, of one or more immovable properties in which it is possible to stay overnight, and the consumer undertakes to pay the trader a fee for that, and which is concluded for a term of at least one year or with the possibility of tacit extension;

35) contract on long-term holiday benefits is a contract whereby the trader undertakes to give the consumer a discount or other privileges and benefits in respect of holiday accommodation, separately or together with a travel service, and the consumer undertakes to pay the trader a fee for that, and which is concluded for a term of at least one year or with the possibility of tacit extension;

36) contract on assistance in resale is a contract whereby the trader undertakes to provide the consumer with assistance in the purchase or sale of the time-shared use of immovable property or of long-term holiday benefits, and the consumer undertakes to pay the trader a fee for that;

37) contract on facilitating the exchange of the time-shared use of immovable property is a contract whereby the trader undertakes to include the consumer in a system for the exchange of the time-shared use of immovable property, whereby consumers may mutually assign, for a specified time, rights under a contract on the time-shared use of immovable property, and the consumer undertakes to pay the trader a fee for that;

38) out-of-court resolution of consumer disputes, within the meaning of this Law, is a manner of resolving disputes between a consumer and a trader before a body for the out-of-court resolution of consumer disputes entered in the List of Bodies for the Out-of-Court Resolution of Consumer Disputes in accordance with this Law;

39) commercial guarantee provider is a trader, whether a producer, an importer, a wholesaler or a retailer, who assumes obligations towards the consumer on the basis of the guarantee given;

40) commercial guarantee is any declaration of will of the commercial guarantee provider whereby that provider undertakes, in addition to the trader's liability for lack of conformity in accordance with this Law, to refund to the consumer the price paid, or to replace, repair or service the goods, if the goods do not correspond to the specifications or to other conditions which are not related to conformity and which are set out in the declaration of the commercial guarantee provider or in the relevant advertising material, as well as in advertising in connection with those goods, which were available to the consumer before or at the time of conclusion of the contract;

41) technical goods are a complex thing, that is, a device of industrial production intended for more lasting use (household appliances, computers, telephones, motor vehicles and the like), the operation of which requires electrical energy, another means of power supply (for example, a battery or an accumulator) or an internal combustion engine;

42) code of good business practice is an agreement or a set of rules which are not provided for by law, by subordinate legislation or by administrative acts, which define the conduct of traders who accept the obligations under the code in relation to one or more specific business practices or economic activities;

43) owner of a code of good business practice means a person, including a trader or a group of traders, who is responsible for the formulation and revision of the code of good business practice and/or for supervision of the application of the code by those who have undertaken to be bound by it;

44) durable medium is any instrument which enables the consumer or the trader to store data intended for them in such a way that the data remain accessible for future use during a period appropriate to the purpose of the data, which enables the unchanged reproduction of the stored data, such as, for example, paper, electronic mail, CD-ROM, DVD, a memory card and a computer hard disk;

45) financial services are all banking and credit services, insurance services, voluntary pension fund management services, financial leasing services, electronic money issuance services, investment and payment services, as well as financial facilities, within the meaning of the special laws governing those services;

46) digital service is:

(1) a service which enables the consumer to create, process and store data in digital form or to access them, or

(2) a service which enables the sharing of, or any other interaction with, data in digital form which the consumer or other users of that service upload or create;

47) compatibility is the characteristic of goods, digital content or a digital service of functioning with hardware or software with which goods, digital content or digital services of the same type are normally used, without the need to adapt (convert) them;

48) functionality is the characteristic of goods, digital content or a digital service of performing their functions having regard to their purpose;

49) interoperability is the characteristic of goods, digital content or a digital service of functioning with hardware or software different from that which goods, digital content or digital services of the same type normally use;

50) durability is the characteristic of goods of retaining their functionality and operating characteristics during normal use;

51) free of charge means without charging the costs necessary for remedying the lack of conformity of the goods, and in particular the costs relating to postage, transport, labour or materials;

52) integration means the linking and incorporation of digital content or a digital service with the components of the consumer's digital environment so that the digital content or the digital service may be used in accordance with the requirements for the conformity of goods prescribed by this Law;

53) digital environment means hardware, software and any network connection which the consumer uses in order to access digital content or a digital service or to make use of them;

54) price for the supply of digital content or a digital service is a monetary amount or a digitally expressed value which the consumer pays or undertakes to pay;

55) ranking is the relative importance given to products, as they are presented, organised or communicated by the trader, irrespective of the technological means used for such presentation, organisation or communication;

56) online marketplace means a service by which, through the use of software, a website, part of a website or an application, operated by the trader or operated in the trader's name, consumers are enabled to conclude distance contracts with other traders or consumers;

57) online marketplace provider is any trader who provides an online marketplace to consumers.

Expressions used in this Law and in regulations adopted on the basis of this Law which have a gender meaning, expressed in the grammatical masculine gender, imply the natural female and male sex of the persons to whom they relate.
$en$,
  $sr$Значење појединих израза

Члан 5.

Поједини изрази употребљени у овом закону имају следеће значење:

1) потрошач је физичко лице које на тржишту прибавља робу или услуге у сврхе које нису намењене његовој пословној или другој комерцијалној делатности;

2) трговац је правно лице, предузетник или физичко лице које наступа на тржишту у оквиру своје пословне делатности или у друге комерцијалне сврхе, укључујући и друга лица која послују у његово име или за његов рачун, у вези са уговорима уређеним овим законом;

3) организатор је трговац који организује туристичко путовање и продаје или нуди на продају, непосредно или посредством посредника или заједно са другим трговцем или трговац који другом трговцу преноси податке о путнику, на начин прописан овим законом. Организатор делатност обавља на основу прописане лиценце;

4) посредник је трговац који продаје или нуди на продају туристичко путовање које је сачинио организатор и продаје друге услуге путовања, за које послове није потребна прописана лиценца;

5) уговор о продаји је сваки уговор којим трговац преноси или се обавезује да пренесе својину на роби потрошачу, а потрошач плаћа или се обавезује да плати цену, укључујући и уговор који за предмет има и продају робе и пружање услуге;

6) робом се сматра:

(1) телесна покретна ствар, вода, гас и електрична енергија сматрају се робом када се нуде за продају у ограниченом обиму или ограниченој количини, као и

(2) роба са дигиталним елементима која је телесна покретна ствар, која има уграђен дигитални садржај или дигиталну услугу или је повезана са њима тако да роба без тог дигиталног садржаја или те дигиталне услуге не би могла да функционише;

7) уговор на даљину је уговор закључен између трговца и потрошача у оквиру организоване продаје или пружања услуга на даљину без истовременог физичког присуства трговца и потрошача, искључивом употребом једног или више средстава комуникације на даљину до тренутка закључења уговора, укључујући и сам тренутак закључења;

8) средство комуникације на даљину је средство које омогућава закључење уговора између трговца и потрошача који се не налазе на истом месту у исто време;

9) дигитални садржај означава податке који су произведени и испоручени у дигиталном облику;

10) уговор закључен, као и уговор за који је потрошач дао понуду изван пословних просторија је сваки уговор између трговца и потрошача закључен изван пословних просторија трговца уз истовремено физичко присуство трговца и потрошача; уговор закључен у пословним просторијама трговца или путем средстава комуникације на даљину, а о чијем закључењу су вођени преговори изван пословних просторија трговца уз истовремено физичко присуство трговца и потрошача; уговор закључен током путовања које је организовао трговац и које је за циљ или последицу имало промовисање и продају робе или услуга потрошачу;

11) пословне просторије су непокретни малопродајни објекти у којима трговац стално обавља своју делатност као и покретни малопродајни објекти у којима трговац обично обавља своју делатност;

12) поруџбеница је писмено или електронска порука, која садржи уговорне одредбе које потрошач потписује изван пословних просторија трговца у намери да закључи уговор;

13) производ је, у смислу одредби овог закона којима се уређује непоштена пословна пракса, свака роба или услуга укључујући непокретности, права и обавезе, дигиталне услуге и дигитални садржај, као и у смислу одредби овог закона које уређују одговорност за производе са недостатком, покретна ствар која је одвојена или уграђена у другу покретну или непокретну ствар укључујући енергију која је произведена или сакупљена за давање светлости, топлоте или кретања, дигиталне услуге и дигитални садржај;

14) професионална пажња је повећана пажња и вештина која се у правном промету основано очекује од трговца у пословању са потрошачима, у складу с добрим обичајима и начелом савесности и поштења;

15) произвођач, у смислу одредби овога закона о одговорности за производе са недостатком, је лице:

(1) које производи или увози готове производе, робу, сировине и саставне делове на територију Републикe Србијe ради продаје, закупа, лизинга или друге врсте промета;

(2) које се представља као произвођач стављањем свог назива, жига или другог обележја на робу;

(3) трговац производом који не садржи податке о произвођачу ако без одлагања не обавести оштећеног о идентитету произвођача, односно лица од кога је набавио производ;

(4) трговац увозног производа који садржи податке о произвођачу, али не садржи податке о увознику;

16) повезани уговор је уговор на основу којег потрошач прибавља робу или услуге које су у вези са уговором закљученим на даљину или уговором закљученим изван пословних просторија трговца, у којем робу испоручује или услуге пружа трговац или треће лице на основу споразума између трећег лица и трговца;

17) јавна аукција је поступак продаје робе у транспарентном поступку, надметањем потрошача, на тржишној основи, којим руководи аукционар и у којем потрошачи присуствују продаји или им је дата прилика да присуствују, при чему учесник у надметању који да најбољу понуду има обавезу да робу купи;

18) пословна пракса је свако чињење или нечињење трговца, начин његовог пословања или представљања и пословна комуникација, укључујући оглашавање које је непосредно повезано са промоцијом, продајом или испоруком производа потрошачима;

19) просечни потрошач је потрошач који је добро обавештен и разумно обазрив, имајући у виду друштвене, културне и језичке особености;

20) уговорна одредба је свака одредба уговора, укључујући посебне погодбе, о чијој садржини је потрошач преговарао или могао да преговара са трговцем, као и опште одредбе чију садржину је унапред одредио трговац или трећа страна;

21) податак о личности је сваки податак који се односи на физичко лице како је дефинисано законом којим се уређује заштита података о личности;

22) уговор о пружању услуга је сваки уговор, који није уговор о продаји, у складу са којим трговац пружа или се обавезује да пружи услугу потрошачу, укључујући дигиталну услугу;

23) услуга од општег економског интереса је услуга чији квалитет, услове пружања или цену, уређује или контролише државни орган или други ималац јавног овлашћења, нарочито због велике вредности почетних улагања, ограничености ресурса неопходних за њено пружање, одрживог развоја, друштвене солидарности и потребе за уједначеним регионалним развојем, а у циљу задовољења општег друштвеног интереса (нпр. услуге из области енергетике, снабдевања водом за пиће, пречишћавања и одвођења атмосферских и отпадних вода, превоза путника у домаћем јавном линијском превозу, електронске комуникационе услуге, универзалне поштанске услуге, управљање комуналним отпадом, управљање гробљима и сахрањивање, управљање јавним паркиралиштима, обављање димничарских услуга и сл.);

24) услуге путовања су превоз путника, смештај који се не пружа у оквиру превозног средства намењеног превозу путника, изнајмљивање аутомобила, других моторних возила или мотоцикала (у даљем тексту: изнајмљивање моторних возила) и друге услуге у туризму;

25) друге услуге у туризму су услуге које не чине саставни део превоза, смештаја или изнајмљивања моторних возила и које могу бити продаја улазница за концерте, спортске догађаје, забавне паркове, као и услуге туристичког водича и сл.

26) туристичко путовање је пакет аранжман, као комбинација две или више услуга путовања (превоз, смештај, изнајмљивање моторних возила и друге услуге у туризму), које је организатор самостално или по захтеву путника понудио, припремио или комбиновао, све у трајању дужем од 24 сата или у краћем трајању ако укључује једно ноћење, као и једно или више ноћења које укључује само услугу смештаја у одређеном термину или временском трајању и које се продаје по цени исказаној у јединственом износу. Туристичким путовањем не сматра се излет, путовање за сопствене потребе и повезани путни аранжман изузев у случају прописаном овим законом;

27) путовање за сопствене потребе је путовање које непрофитне организације пружају повремено, у ограниченом обиму, без сврхе стицања добити, искључиво за ограничен број својих чланова;

28) уговор о организовању путовања је уговор о туристичком путовању који обухвата све услуге из програма путовања, као и посебне захтеве путника, које чине неодвојив део неопходан за реализацију путовања, са јасно назначеним почетком и завршетком путовања и који се продаје по јединственој продајној цени и чине га општи услови путовања, програм путовања, потврда о путовању, ваучер и др.;

29) повезани путни аранжман представља најмање две различите услуге путовања, изузев смештаја, купљенe за потребе истог путовања, ако организатор, односно посредник приликом једне посете, односно контакта путника са директним пружаоцем те услуге, на једном продајном месту омогући избор и посебно плаћање сваке услуге путовања, или омогући циљану куповину најмање једне додатне услуге путовања од другог трговца, ако је уговор с тим другим трговцем склопљен најкасније 24 сата након потврде резервације прве услуге путовања. Повезани путни аранжман не представља туристичко путовање, изузев у случајевима прописаним овим законом;

30) путник је потрошач који купује или за чији рачун се купује, односно потрошач који користи туристичко путовање, повезани путни аранжман или излет, као и другу услугу у туризму;

31) недостатак саобразности услуге туристичког путовања је неиспуњење, делимично испуњење или неуредно испуњење услуга које су обухваћене туристичким путовањем, излетом или другом туристичком услугом;

32) продајно место услуге путовања је простор, односно просторија, где се врши продаја или интернет страница, односно сличан интернет систем за продају услуге путовања путем интернета;

33) репатријација је враћање путника у место поласка или друго место о којем се уговорне стране договоре;

34) уговор о временски подељеном коришћењу непокретности (тајм-шеринг) је уговор којим се трговац обавезује да потрошачу да на коришћење у два или више наврата једну или више непокретности у којима се може преноћити, а потрошач се обавезује да му за то плати накнаду и закључује се на рок од најмање годину дана или са могућношћу прећутног продужења;

35) уговор о трајним олакшицама за одмор је уговор којим се трговац обавезује да потрошачу да попуст или друге привилегије и олакшице у погледу смештаја за одмор, посебно или уз услугу путовања, а потрошач се обавезује да му за то плати накнаду и закључује се на рок од најмање годину дана или са могућношћу прећутног продужења;

36) уговор о помоћи приликом препродаје је уговор којим се трговац обавезује да потрошачу пружи помоћ приликом куповине или продаје временски подељеног коришћења непокретности или трајних олакшица за одмор, а потрошач се обавезује да му за то плати накнаду;

37) уговор о омогућавању размене временски подељеног коришћења непокретности је уговор којим се трговац обавезује да потрошача укључи у систем размене временски подељеног коришћења непокретности, с тим да потрошачи могу да уступе узајамно на одређено време права из уговора о временски подељеном коришћењу непокретности, а потрошач се обавезује да му за то плати накнаду;

38) вансудско решавање потрошачких спорова, у смислу овог закона, је начин решавања спорова између потрошача и трговца, пред телом за вансудско решавање потрошачких спорова уписаним у Листу тела за вансудско решавање потрошачких спорова у складу са овим законом;

39) давалац комерцијалне гаранције je трговац, било да се ради о произвођачу, увознику, трговцу на велико или трговцу на мало, који преузима обавезе према потрошачу по основу дате гаранције;

40) комерцијална гаранција је свака изјава воље даваоца комерцијалне гаранције којом се обавезује да, поред одговорности трговца за несаобразност у складу са овим законом, потрошачу изврши повраћај плаћене цене, замену, оправку или сервисирање робе ако роба не одговора спецификацијама или другим условима који нису повезани са саобразношћу, а који су наведени у изјави даваоца комерцијалне гаранције или одговарајућем рекламном материјалу, као и приликом оглашавања у вези са том робом, који су потрошачу били доступни пре или у време закључења уговора;

41) техничка роба је сложена ствар, односно уређај индустријске производње трајније употребе (апарати за домаћинство, компјутери, телефони, моторна возила и сл.) за чији је рад неопходна електрична енергија, друго средство напајања (нпр. батерија или акумулатор) или мотор на унутрашње сагоревање;

42) кодекс добре пословне праксе је споразум или скуп правила која нису предвиђена законом, подзаконским актима или управним актима, која дефинишу понашање трговаца који прихватају обавезе из кодекса у вези са једном или више посебних пословних пракси или привредних делатности;

43) доносилац кодекса добре пословне праксе означава лице, укључујући трговца или групу трговаца, које је одговорно за формулисање и ревизију кодекса добре пословне праксе и/или надзор над применом кодекса од стране оних који су се њим обавезали;

44) трајни носач података је сваки инструмент који омогућава потрошачу или трговцу да сачува податке који су им намењени, на начин да подаци остану доступни за будућу употребу током раздобља примереног сврси податка који омогућава непромењену репродукцију сачуваних података, као што су нпр. папир, електронска пошта, CD-ROM, DVD, меморијска картица и хард диск рачунара;

45) финансијске услуге су све банкарске и кредитне услуге, услуге осигурања, услуге управљања добровољним пензијским фондом, услуге финансијског лизинга, услуге издавања електронског новца, инвестиционе и платне услуге, као и финансијске погодбе, у смислу посебних закона којима су уређене те услуге;

46) дигитална услуга је:

(1) услуга којом се потрошачу омогућава стварање, обрада и чување података у дигиталном облику или приступ њима или

(2) услуга којом се омогућава дељење или било која друга интеракција с подацима у дигиталном облику које учитава или ствара потрошач или други корисници те услуге;

47) компатибилност је особина робе, дигиталног садржаја или дигиталне услуге да функционишу са хардвером или софтвером са којима се обично користе роба, дигитални садржај или дигиталне услуге, исте врсте, а да их није потребно прилагодити (конвертовати);

48) функционалност је особина робе, дигиталног садржаја или дигиталне услуге да извршавају функције с обзиром на своју сврху;

49) интероперабилност је особина робе, дигиталног садржаја или дигиталне услуге да функционишу са хардвером или софтвером другачијим од оних који обично користе роба, дигитални садржај или дигиталне услуге исте врсте;

50) трајност је особина робе да задржи функционалност и радне карактеристике током уобичајене употребе;

51) бесплатно значи без наплате трошкова потребних за отклањање несаобразности робе, а нарочито трошкова који се односе на поштарину, транспорт, рад или материјал;

52) интеграција значи повезивање и уградња дигиталног садржаја или дигиталне услуге са компонентама дигиталног окружења потрошача како би се дигитални садржај или дигитална услуга могли употребљавати у складу са захтевима за саобразност робе прописаним овим законом;

53) дигитално окружење значи хардвер, софтвер и сваки мрежни прикључак које потрошач користи како би приступио дигиталном садржају или дигиталној услузи или се њима служио;

54) цена за испоруку дигиталног садржаја или дигиталне услуге је новчани износ или дигитално исказана вредност коју потрошач плаћа или се обавезује да плати;

55) рангирање је релативна важност која се даје производима, онако како су представљени, организовани или саопштени од стране трговца, без обзира на технолошка средства која се користе за такву презентацију, организацију или комуникацију;

56) онлајн тржиште означава услугу којом се употребом софтвера, интернет странице, дела интернет странице или апликације, којима управља трговац или којима се управља у његово име, омогућава потрошачима да закључе уговоре на даљину са другим трговцима или потрошачима;

57) пружалац онлајн тржишта је сваки трговац који потрошачима пружа онлајн тржиште.

Изрази који се користе у овом закону и прописима који се доносе на основу овог закона, а који имају родно значење, изражени у граматичком мушком роду, подразумевају природни женски и мушки пол лица на која се односе.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 6. expect 1 row. application 2026-05-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '6',
  NULL,
  $en$Display of the Price

Article 6.

The trader shall, unless otherwise prescribed by this Law, display the selling price and the unit price of goods or a service in an unambiguous, legible and easily noticeable manner, in accordance with the regulations governing trade.

The trader shall publish on its website, separately for each sales outlet, a price list in digital form suitable for automatic processing, for the information of consumers. When publishing the price list, the trader shall act in the manner referred to in paragraph 1 of this Article.

The trader shall update the price list referred to in paragraph 2 of this Article in real time so that it corresponds to the current prices in sales outlets and/or in distance sales.

A trader who publishes the price list referred to in paragraph 2 of this Article shall adhere to the published prices.

A trader who publishes the price list referred to in paragraph 2 of this Article shall enable the use of software tools and automated programs which, via the internet, can collect data on prices by means of various technical solutions that enable comparison of previously published prices and prices published in real time.

A trader who publishes the price list referred to in paragraph 2 of this Article shall open an account on the National Open Data Portal and, within its account, in a machine-readable format, update the price list upon every change of price, in accordance with the standard prescribed by a by-law.

The Minister shall prescribe in more detail the conditions, content and manner of publishing the price list referred to in paragraph 2 of this Article.
$en$,
  $sr$Истицање цене

Члан 6.

Трговац је дужан да, осим ако овим законом није другачије прописано, на недвосмислен, читак и лако уочљив начин истакне продајну и јединичну цену робе или услуге, у складу са прописима којима се уређује трговина.

Трговац је дужан да на својој интернет страници, посебно за сваки продајни објекат, објави ценовник, у дигиталном облику, погодним за аутоматску обраду, ради информисаности потрошача. Приликом објављивања ценовника, трговац је дужан да поступи на начин из става 1. овог члана.

Трговац је дужан да ценовник из става 2. овог члана ажурира у реалном времену како би одговарао тренутним ценама у продајним објектима и/или у продаји на даљину.

Трговац који објави ценовник из става 2. овог члана дужан је да се придржава објављених цена.

Трговац који објави ценовник из става 2. овог члана дужан је да омогући употребу софтверских алата и аутоматизованих програма који путем интернета могу прикупљати податке о ценама путем различитих техничких решења која омогућавају поређење претходно објављених цена и цена објављених у реалном времену.

Трговац који објави ценовник из става 2. овог члана дужан је да отвори налог на Националном порталу отворених података и у оквиру свог налога, у машински читљивом формату, ажурира ценовник при свакој промени цене, у складу са стандардом који је прописан подзаконским актом.

Министар ближе прописује услове, садржај и начин објављивања ценовника из става 2. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-05-01'
);

-- Члан 7. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '7',
  NULL,
  $en$Selling Price of a Service

Article 7.

The trader shall draw up a price list or a tariff of services.

The trader shall display the price list or tariff of services referred to in paragraph 1 of this Article in the shop window, in the business premises or at another place where the trader offers the performance of services.

If the trader offers the performance of services in a separate department of a sales outlet, the trader may display the price list or tariff of services in that department.
$en$,
  $sr$Продајна цена услуге

Члан 7.

Трговац је дужан да сачини ценовник или тарифник услуга.

Ценовник или тарифних услуга из става 1. овог члана, трговац је дужан да истакне у излогу, пословним просторијама или на другом месту на коме нуди вршење услуга.

Ако трговац нуди вршење услуга у посебном одељењу продајног објекта, ценовник или тарифних услуга може да истакне у том одељењу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 8. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '8',
  NULL,
  $en$Electricity, Gas, Central Heating and Water

Article 8.

A trader who offers or advertises the performance of a service of continuous supply of electricity, gas, thermal energy or water through a pipeline shall clearly indicate in the offer or advertisement:

1) the unit price of consumed electricity or thermal energy;

2) the unit price of consumed water or gas.

The trader shall, in addition to the unit price referred to in paragraph 1 of this Article, clearly indicate the prices that are not calculated according to the consumed unit of measurement.
$en$,
  $sr$Електрична енергија, гас, централно грејање и вода

Члан 8.

Трговац који нуди или оглашава вршење услуге трајног снабдевања електричном енергијом, гасом, топлотном енергијом или водом путем цевовода дужан је да у понуди или огласу јасно истакне:

1) јединичну цену потрошене електричне енергије или топлотне енергијe;

2) јединичну цену потрошене воде или гаса.

Трговац је дужан да осим јединичне цене из става 1. овог члана јасно истакне цене које се не рачунају према потрошеној мерној јединици.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 9. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '9',
  NULL,
  $en$Petrol Stations and Car Parks

Article 9.

The trader shall display the unit prices of fuel in a manner that enables a person driving a motor vehicle in the direction of the petrol station to notice the prices easily and in good time.

A trader who offers space for the parking of motor vehicles, or the rental of parking spaces in garages, shall display at the entrance a price list which enables a person driving a motor vehicle in the direction of the car park to notice the prices and the number of free spaces easily and in good time.
$en$,
  $sr$Бензинске станице и паркиралишта

Члан 9.

Трговац је дужан да јединичне цене горива истакне на начин којим се лицу које управља моторним возилом у правцу бензинске станице омогућава да цене лако и благовремено уочи.

Трговац који нуди простор за паркирање моторних возила односно закуп паркинг места у гаражама је дужан да на улазу истакне ценовник, којим се лицу које управља моторним возилом у правцу паркиралишта омогућава да цене и број слободних места лако и благовремено уочи.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 10. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '10',
  NULL,
  $en$Catering Establishments

Article 10.

The trader shall, in a catering establishment for the provision of food, drink and beverage services, display on the tables, or hand over before receiving the order, a price list in written form to each consumer, and at the consumer's request also at the time of payment.

By way of exception to paragraph 1 of this Article, prices may also be available by means of the internet (QR code and the like), but the trader shall, at the consumer's request, enable inspection of the written form of the price list.

The trader shall display a price list of food, drinks and beverages at the entrance, that is, in the entrance section, of the catering establishment referred to in paragraph 1 of this Article.

The trader shall, in a catering establishment for accommodation (hotel, motel, tourist settlement, campsite, boarding house, hostel, overnight lodging, resort, house, apartment, room and the like), display:

1) the selling price of accommodation, full board and half board and the amount of the sojourn tax in a visible place, in each room and at the reception;

2) the selling price of food, drinks and beverages in price lists which must be available to consumers in a sufficient number of copies and at the places where consumers are served.

If the use of means of distance communication is enabled in the catering establishments referred to in paragraphs 1 and 4 of this Article, the trader shall display next to that means the price of use per unit of time or the selling price of one use.

The trader shall state the selling price of each individual service, that is, the price of food, drinks and beverages, in a single amount.

Exceptionally, the selling price of food, a drink and a beverage, relative to the price in the catering establishment, may also be stated in a higher amount if delivery is included in it.

The trader may not charge for that catering service which the consumer did not order, nor for any other additional service which the trader provided on the trader's own initiative.

The trader may not charge the consumer hidden costs which constitute an integral and inseparable part of the basic catering service (e.g. setting the table, cutlery, napkins and the like).

The trader may not charge for other ingredients of an offer from the price list which are not contained in the standard specification of the food, drink or beverage (e.g. slices of fruit, additions to food, decoration and the like).

The consumer shall, in a catering establishment for accommodation, enable the trader to inspect an identification document (identity card, passport and the like), for the purpose of recording personal data in the central information system (e-tourist).
$en$,
  $sr$Угоститељски објекти

Члан 10.

Трговац је дужан да у угоститељском објекту за пружање услуга исхране, пића и напитака на столовима истакне или пре пријема поруџбине преда ценовник у писаној форми сваком потрошачу, а на његов захтев и приликом плаћања.

Изузетно од става 1. овог члана цене могу бити доступне и посредством интернета (QR kod и сл.), али је трговац дужан да на захтев потрошача омогући увид у писану фoрму ценовника.

Трговац је дужан да на улазу, односно улазном делу угоститељског објекта из става 1. овог члана истакне ценовник хране, пића и напитака.

Трговац је дужан да у угоститељском објекту за смештај (хотел, мотел, туристичко насеље, камп, пансион, хостел, преноћиште, одмаралиште, кућа, апартман, соба и сл.) истакне:

1) продајну цену смештаја, пансиона и полупансиона и износ боравишне таксе на видљивом месту, у свакој соби и на рецепцији;

2) продајну цену хране, пића и напитака у ценовницима који морају бити доступни потрошачима у довољном броју примерака и на местима на којима се потрошачи услужују.

Ако је у угоститељским објектима из ст. 1. и 4. овог члана омогућена употреба средстава комуникације на даљину, трговац је дужан да поред тог средства истакне цену употребе по јединици времена или продајну цену једног коришћења.

Трговац је дужан да продајну цену сваке појединачне услуге, односно цену хране, пића и напитaка искаже у јединственом износу.

Изузетно продајна цена хране, пића и напитка, у односу на цену у угоститељском објекту, може се исказати и у вишем износу уколико је у истој садржана достава.

Трговац не може да наплати ону угоститељску услугу коју потрошач није наручио, нити било коју другу додатну услугу коју је трговац самоиницијативно пружио.

Трговац не може да наплати од потрошача скривене трошкове, који чине саставни и неодвојиви део основне угоститељске услуге (нпр. сервирање стола, есцајга, салвете и сл.).

Трговац не може да наплати друге састојке понуде из ценовника који нису садржани у нормативу хране, пића или напитака (нпр. кришке воћа, додаци храни, декорација и сл.).

Потрошач је дужан да у угоститељском објекту за смештај омогући трговцу увид у идентификациони документ (лична карта, пасош и сл.), ради евидентирања податакa о личности у централни информациони систем (е-туристе).
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 11. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '11',
  NULL,
  $en$Issuing an Invoice

Article 11.

The trader shall issue an invoice to the consumer for goods sold or a service provided. The invoice referred to in paragraph 1 of this Article shall in particular contain:

1) the name or business name, the address and the data which are relevant for establishing the identity of the trader;

2) data on the goods sold or the service provided;

3) the selling price;

4) the date of issuing the invoice;

5) the specification referred to in Article 97, paragraph 3, and Article 112, paragraph 3, of this Law;

6) the total amount payable.

For services of general economic interest provided, the invoice referred to in paragraph 1 of this Article must, in addition to the elements set out in paragraph 2 of this Article, also contain the unit price.

The trader must adhere to the displayed price and the conditions of sale. It is prohibited to charge for issuing and sending an invoice to the consumer.

It is prohibited to charge for issuing and sending reminders to the consumer for the collection of due monetary claims.

The invoice referred to in paragraph 1 of this Article shall also contain other data in accordance with special regulations.
$en$,
  $sr$Издавање рачуна

Члан 11.

Трговац је дужан да за продату робу или услугу потрошачу изда рачун. Рачун из става 1. овог члана нарочито садржи:

1) назив или пословно име, адресу и податке који су значајни за утврђивање идентитета трговца;

2) податке о продатој роби или пруженој услузи;

3) продајну цену;

4) датум издавања рачуна;

5) спецификацију из члана 97. став 3. и члана 112. став 3. овог закона;

6) укупан износ за плаћање.

За пружене услуге од општег економског интереса рачун из става 1. овог члана, поред елемената наведених у ставу 2. овог члана, мора да садржи и јединичну цену.

Трговац мора да се придржава истакнуте цене и услова продаје. Забрањено је наплаћивање издавања и слања рачуна потрошачу.

Забрањено је наплаћивање издавања и слања опомена потрошачу ради наплате доспелих новчаних потраживања.

Рачун из става 1. овог члана садржи и остале податке у складу са посебним прописима.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 12. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '12',
  NULL,
  $en$Duty to Inform Prior to the Conclusion of a Contract

Article 12.

The trader shall, prior to the conclusion of a contract for the sale of goods or the provision of services, inform the consumer in a clear and comprehensible manner, in the Serbian language or in the language of a national minority, in accordance with the law, of:

1) the main characteristics of the goods or service;

2) the business name, the registration number, the address of the registered office and the telephone number;

3) the selling price or the manner in which the selling price will be calculated if, owing to the nature of the goods or service, the selling price cannot be determined in advance, as well as all additional postal charges and transport and delivery costs and the possibility that those costs may be charged to the consumer;

4) the manner of payment, the manner and time limit of delivery, and the manner of performance of other contractual obligations;

5) the existence of statutory liability for lack of conformity of the goods, service, digital content and digital service with the contract;

6) the manner of submitting a complaint to the trader, and in particular the place of receipt and the manner in which the trader deals with them, as well as the conditions relating to the exercise of the consumer's rights on the basis of conformity;

7) the availability of spare parts, consumable materials, connecting appliances and similar parts, technical service or maintenance and repair, during and after the end of the period in which the trader is liable for lack of conformity with the contract when offering and selling technical goods, that is, after the cessation of production or import of the goods;

8) the conditions for termination of the contract, if it is concluded for an indefinite period or if it is extended automatically;

9) the possibility of out-of-court resolution of disputes.

Depending on the circumstances of the specific case and the type of goods or service, the trader shall, prior to the conclusion of the contract, also inform the consumer of:

1) the duration of the contract;

2) the minimum duration of the contractual obligations;

3) the functionality of goods with digital elements, digital content and digital services, including technical protection measures;

4) the relevant compatibility and interoperability of goods with digital elements, digital content and digital services, of which the trader has knowledge or of which the trader can reasonably be expected to have knowledge;

5) the existence and conditions of after-sales services and commercial guarantees.

The trader is not obliged to inform the consumer of the data referred to in paragraphs 1 and 2 of this Article if those particulars clearly arise from the circumstances of the conclusion of the contract.

In the case of a public auction, the trader may, instead of the information on the data referred to in paragraph 1, point 2), of this Article, inform the consumer of the address and the data relevant for establishing the identity of the auctioneer.

If the trader and the consumer conclude a contract, the data referred to in paragraphs 1 and 2 of this Article become an integral part of it.

The burden of proving performance of the obligation to inform the consumer of the data referred to in paragraphs 1 and 2 of this Article is borne by the trader.

If, at the time of conclusion of the contract, the trader does not act in accordance with the information obligation referred to in paragraphs 1 and 2 of this Article, the consumer may request annulment of the contract, irrespective of whether the trader intended, by omitting the information, to induce the consumer to conclude the contract. The right to request annulment of the contract ceases upon the expiry of one year from the day of conclusion of the contract.

The provisions of paragraphs 1 and 2 of this Article also apply to contracts for the supply of water, gas or electricity when they are not offered for sale in a limited or predetermined quantity, to contracts for the supply of thermal energy and for the delivery of digital content which is not delivered on a durable data carrier.
$en$,
  $sr$Дужност обавештавања пре закључења уговора

Члан 12.

Трговац је дужан да пре закључења уговора о продаји робе или пружању услуга, потрошача на јасан и разумљив начин на српском језику или језику националне мањине, у складу са законом, обавести о:

1) основним обележјима робе или услуге;

2) пословном имену, матичном броју, адреси седишта и броју телефона;

3) продајној цени или начину на који ће се продајна цена обрачунати ако се због природе робе или услуге продајна цена не може утврдити унапред, као и о свим додатним поштанским трошковима и трошковима транспорта и испоруке и могућности да се ти трошкови могу ставити потрошачу на терет;

4) начину плаћања, начину и року испоруке, начину извршења других уговорних обавеза;

5) постојању законске одговорности због несаобразности робе, услуге, дигиталног садржаја и дигиталне услуге уговору;

6) начину изјављивања рекламације трговцу, а нарочито о месту пријема и начину поступања трговца по њима, као и условима који се односе на остваривање права потрошача по основу саобразности;

7) доступности резервних делова, потрошног материјала, прикључних апарата и сличних делова, техничког сервиса или одржавања и оправке за време и после престанка периода у којем одговара за несаобразност уговору приликом понуде и продаје техничке робе, односно после престанка производње или увоза робе;

8) условима за раскидање уговора, ако је закључен на неодређено време или ако се продужава аутоматски;

9) могућности вансудског решавања спорова.

У зависности од околности конкретног случаја и врсте робе или услуге трговац је дужан да пре закључења уговора потрошача обавести и о:

1) трајању уговора;

2) минималном трајању уговорних обавеза;

3) функционалности робе са дигиталним елементима, дигиталног садржаја и дигиталних услуга, укључујући и мере техничке заштите;

4) релевантној компатибилности и интероперабилности робе са дигиталним елементима, дигиталног садржаја и дигиталних услуга о којима трговац има сазнања или о којима се разумно може очекивати да има сазнања;

5) постојању и условима постпродајних услуга и комерцијалним гаранцијама.

Трговац није дужан да потрошача обавести о подацима из ст. 1. и 2. овог члана, ако те појединости очигледно произлазе из околности закључења уговора.

У случају јавне аукције, трговац може да уместо обавештења о подацима из става 1. тачка 2) овог члана обавести потрошача о адреси и подацима који су од значаја за утврђивање идентитета аукционара.

Ако трговац и потрошач закључе уговор, подаци из ст. 1. и 2. овог члана постају његов саставни део.

Терет доказивања извршења обавезе обавештавања потрошача о подацима из ст. 1. и 2. овог члана сноси трговац.

Ако приликом закључења уговора трговац не поступи у складу са обавезом обавештавања из ст. 1. и 2. овог члана, потрошач може захтевати поништај уговора, независно од тога да ли је трговац имао намеру да га пропуштањем обавештавања наведе на закључење уговора. Право да се захтева поништај уговора престаје истеком годину дана од дана закључења уговора.

Одредбе ст. 1. и 2. овог члана се такође примењују на уговоре о снабдевању водом, гасом или електричном енергијом када они нису понуђени за продају у ограниченој или унапред одређеној количини, на уговоре о снабдевању топлотном енергијом и о испоруци дигиталног садржаја који се не испоручује на трајном носачу података.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 13. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '13',
  NULL,
  $en$Additional Costs

Article 13.

The consumer is not obliged to pay any form of additional costs, including postal charges and the costs of transport and delivery, if the trader has not obtained the consumer's express consent to the specific additional costs in addition to the agreed remuneration for the trader's main contractual obligation.

The trader shall obtain the consumer's consent referred to in paragraph 1 of this Article before the consumer is bound by a contract or an offer.

If the trader has not obtained the consumer's express consent to the additional costs, but has informed the consumer by means of a default option which requires the consumer to reject it in order to avoid paying them, the consumer is not obliged to pay the trader remuneration for the additional costs. If the consumer has already paid the additional costs to the trader, the consumer has the right to a refund of the money.
$en$,
  $sr$Додатни трошкови

Члан 13.

Потрошач није дужан да плати било какав облик додатних трошкова, укључујући и поштанске трошкове и трошкове транспорта и испоруке, ако трговац није добио изричиту сагласност потрошача за конкретне додатне трошкове поред уговорене накнаде за главну уговорну обавезу трговца.

Трговац је дужан да сагласност потрошача из става 1. овог члана прибави пре него што се потрошач обавеже уговором или понудом.

Ако трговац није добио изричиту сагласност потрошача за додатне трошкове, већ га је обавестио помоћу подразумеване опције која захтева да је потрошач одбије како би избегао њихово плаћање, потрошач није дужан да плати накнаду трговцу за додатне трошкове. Уколико је већ платио трговцу додатне трошкове, потрошач има право на повраћај новца.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 14. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '14',
  NULL,
  $en$Payment of a Monetary Obligation

Article 14.

A monetary obligation which the consumer pays through a bank, a public postal operator or another person that, in accordance with the law, provides payment services shall be deemed settled on the day on which the bank, the public postal operator or the other person that, in accordance with the law, provides payment services received the consumer's payment order.
$en$,
  $sr$Плаћање новчане обавезе

Члан 14.

Новчана обавеза коју потрошач плаћа путем банке, јавног поштанског оператора или другог лица, које у складу са законом пружа платне услуге, сматра се измиреном на дан када су банка, јавни поштански оператор или друго лице које у складу са законом пружа платне услуге примили платни налог потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 15. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '15',
  NULL,
  $en$Education and Information of Consumers Carried Out by Associations and Alliances

Article 15.

Associations and alliances of associations for the protection of consumers (hereinafter: associations and alliances) provide and carry out the education and information of consumers in an independent and objective manner, which must not contain any form of advertising.

The teaching and learning programme of primary and secondary education and upbringing also includes the education of pupils of primary and secondary schools on the basic principles of consumer protection, as well as on the rights and obligations of consumers.

The Ministry competent for consumer protection affairs (hereinafter: the Ministry) and the registered associations and alliances referred to in Article 160 of this Law cooperate with primary and secondary schools for the purpose of educating pupils on consumer rights and obligations.
$en$,
  $sr$Едукација и информисање потрошача које спроводе удружења и савези

Члан 15.

Удружења и савези удружења за заштиту потрошача (у даљем тексту: удружења и савези) пружају и спроводе едукацију и информисање потрошача, на независан и објективан начин, који не сме да садржи било какав облик оглашавања.

Програм наставе и учења основног и средњег образовања и васпитања обухвата и образовање ученика основних и средњих школа о основним принципима заштите потрошача, као и о правима и обавезама потрошача.

Министарство надлежно за послове заштите потрошача (у даљем тексту: Министарство) и евидентирана удружења и савези из члана 160. овог закона сарађују са основним и средњим школама у циљу едукације ученика о потрошачким правима и обавезама.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 16. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '16',
  NULL,
  $en$Prohibition of Unfair Business Practice

Article 16.

Unfair business practice of a trader towards a consumer is prohibited, prior to the conclusion, during and after the conclusion of a legal transaction.

The burden of proving the accuracy of the trader's factual statements relating to the trader's business practice is on the trader.

The trader shall, at the request of the competent authority, provide proof of the accuracy of the trader's statements relating to the business practice which the trader applies.
$en$,
  $sr$Забрана непоштене пословне праксе

Члан 16.

Забрањена је непоштена пословна пракса трговца према потрошачу, пре склапања, за време и након склапања правног посла.

Терет доказивања тачности чињеничних навода трговца у вези са његовом пословном праксом је на трговцу.

Трговац је дужан да на захтев надлежног органа пружи доказ о тачности својих навода у вези са пословном праксом коју примењује.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 17. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '17',
  NULL,
  $en$Concept of unfair business practice

Article 17.

Business practice is unfair:

1) if it is contrary to the requirements of professional diligence;

2) if it materially distorts or threatens to materially distort the economic behavior, in relation to the product, of the average consumer to whom that business practice relates or who is exposed to it, or the behavior of the average member of the group, when the business practice relates to a group of consumers.

A trader materially distorts the economic behavior of the consumer if, by his business practice, he materially reduces the consumer's ability to attain the level of information necessary for decision-making, as a result of which the consumer makes an economic decision which he would not otherwise have made.

An economic decision of the consumer within the meaning of paragraph 2 of this Article is a decision as to whether, in what manner and under what conditions to purchase the product, to pay the price in full or in part, whether to keep or to return the product, or to exercise some other right in relation to the product which he has on the basis of a contract, whether to do something or to refrain from any action (hereinafter: economic decision).

A business practice which threatens to materially distort the economic behavior of a clearly defined group of consumers who, because of their mental or physical weakness, age or credulity, are particularly sensitive to that type of business practice or to the given product, provided that the trader could reasonably have been expected to foresee this, shall be assessed according to the average consumer of that group of consumers.

The provisions of paragraph 4 of this Article do not apply to cases of usual and permitted advertising which involves the making of statements that are not to be taken literally.

Misleading business practice and aggressive business practice shall in particular be regarded as unfair.
$en$,
  $sr$Појам непоштене пословне праксе

Члан 17.

Пословна пракса је непоштена:

1) ако је противна захтевима професионалне пажње;

2) ако битно нарушава или прети да битно наруши економско понашање, у вези с производом, просечног потрошача на кога се та пословна пракса односи или којој је изложен или понашање просечног члана групе, када се пословна пракса односи на групу потрошача.

Трговац битно нарушава економско понашање потрошача ако својом пословном праксом битно умањује могућност потрошача да оствари потребан ниво обавештености за одлучивање, услед чега потрошач доноси економску одлуку коју иначе не би донео.

Економска одлука потрошача у смислу става 2. овог члана је одлука о томе да ли, на који начин и под којим условима да купи производ, да цену плати у целости или делимично, да ли да задржи или да врати производ, или да искористи неко друго право у вези с производом које има по основу уговора, да ли да нешто учини или да се уздржи од каквог поступка (у даљем тексту: економска одлука).

Пословна пракса која прети да битно наруши економско понашање јасно одређене групе потрошача, који су због своје психичке или физичке слабости, узраста или лакомислености нарочито осетљиви на ту врсту пословне праксе или на дати производ, под условом да се од трговца могло основано очекивати да то предвиди, процењује се према просечном потрошачу те групе потрошача.

Одредбе става 4. овог члана не односе се на случајеве уобичајеног и допуштеног оглашавања које подразумева давање изјава које не треба схватати дословно.

Непоштеном се нарочито сматра обмањујућа пословна пракса и насртљива пословна пракса.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 18. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '18',
  NULL,
  $en$Misleading business practice

Article 18.

Misleading business practice, within the meaning of this Law, shall be deemed to be a business practice of a trader by which he induces or threatens to induce the consumer to make an economic decision which he would not otherwise have made, by giving him inaccurate information or, by creating a general impression or in another manner, even when the information he gives is accurate, he leads or threatens to lead the average consumer into error with regard to:

1) the existence or nature of the product;

2) the main characteristics of the product, such as characteristics relating to availability, advantages, risks, the manner of manufacture, composition, accessories accompanying the product, assistance provided to consumers after the sale and the handling of their complaints, the manner and date of production or of the provision of the service, delivery, fitness for use, the manner of use, quantity, specification, the country of production and the country of origin of the trademark, the expected results of use or the results of tests or checks of the product that have been carried out;

3) the obligations of the trader and the extent of the obligations, the reasons for a particular market conduct and its nature, the designation of or indication of a person who indirectly or directly supports or recommends the trader or the product;

4) the price or the manner in which it is calculated or the existence of certain advantages with regard to the price;

5) the need for servicing, parts, replacement or repair;

6) the position, attributes or rights of the trader or his representative which relate to his identity or assets, qualifications and status, affiliation or connection, ownership, intellectual property rights and approvals which they hold, and awards or recognitions which they have received;

7) the rights of the consumer, including the rights under Article 56 of this Law, or the risks to which he may be exposed.

Misleading business practice exists if the trader, taking into account all the circumstances of the particular case, induces or threatens to induce the average consumer to make an economic decision which he would not otherwise have made, by:

1) advertising the product, including comparative advertising, in a confusing manner which makes it difficult to distinguish the product from other products, trademarks, names of other products or the mark of another trader;

2) breaching the provisions of a code of good business practice to which he has acceded if those provisions are binding on the trader and verifiable, and if the trader has indicated in his business practice that he is bound by such a code;

3) placing goods on the market of the Republic of Serbia with a claim that they are identical to goods placed on the market in the Member States of the EU although those goods differ significantly in composition or characteristics, unless this is justified by legitimate and objective reasons the existence of which is determined on the basis of whether:

– the trader's right to adapt goods of the same brand to different markets is justified by legitimate and objective reasons, such as adaptation to special requirements for that type of goods in accordance with regulations, the availability of certain raw materials or their seasonal character which affects the content of the product, the application of a voluntary strategy to improve access to healthy and nutritionally valuable food, the trader's right to offer goods on different markets in packages of different weight or volume, and the like;

– consumers are informed of the existence of differences which have arisen because of legitimate and objective factors, and whether the informing of consumers has been carried out in such a way that simple access to the necessary information is enabled;

– consumers can easily notice differences in the goods which have arisen for the previously stated reasons, having regard to the availability and appropriateness of the information which the trader provides to them, and which is not given only on the labels of the products.
$en$,
  $sr$Обмањујућа пословна пракса

Члан 18.

Под обмањујућом пословном праксом, у смислу овог закона, сматра се пословна пракса трговца којом наводи или прети да наведе потрошача да донесе економску одлуку коју иначе не би донео, тако што му даје нетачна обавештења или стварањем општег утиска или на други начин, чак и када су обавештења која даје тачна, доводи или прети да доведе просечног потрошача у заблуду у погледу:

1) постојања или природе производа;

2) основних обележја производа, као што су обележја која се односе на доступност, предности, ризике, начин израде, састав, додатке који прате производ, помоћ која се потрошачима пружа после продаје и поступање по њиховим приговорима, начин и датум производње или пружања услуге, испоруку, подобност за употребу, начин употребе, количину, спецификацију, државу производње и државу порекла жига, очекиване резултате употребе или резултате спроведених тестова или провера производа;

3) обавеза трговца и обима обавеза, разлога за одређено тржишно поступање и његове природе, означавања или указивања на лице које посредно или непосредно подржава или препоручује трговца или производ;

4) цене или начина на који је обрачуната или постојања одређених погодности у погледу цене;

5) потребе за сервисирањем, деловима, заменом или поправком;

6) положаја, особина или права трговца или његовог заступника који се односе на његов идентитет или имовину, квалификације и статус, припадност или повезаност, својинска, права интелектуалне својине и одобрења којима располажу, награде или признања која су примили;

7) права потрошача, укључујући права из члана 56. овог закона или ризика којима може да буде изложен.

Обмањујућа пословна пракса постоји ако трговац, узимајући у обзир све околности конкретног случаја, наводи или прети да наведе просечног потрошача да донесе економску одлуку коју иначе не би донео, тако што:

1) оглашава производ, укључујући упоредно оглашавање, на збуњујући начин којим се отежава разликовање производа од других производа, жигова, назива других производа или ознаке другог трговца;

2) крши одредбе кодекса добре пословне праксе којем је приступио ако су те одредбе за трговца обавезујуће и проверљиве, као и ако је трговац истакао у својој пословној пракси да је обавезан таквим кодексом;

3) ставља робу на тржиште Републике Србије уз тврдњу да је идентична роби стављеној на тржиште у државама чланицама ЕУ иако се та роба значајно разликује по саставу или обележјима, осим ако је то оправдано легитимним и објективним разлозима чије постојање се утврђује на основу тога да ли:

– је право трговца да прилагоди робу исте робне марке различитим тржиштима оправдано легитимним и објективним разлозима као што су прилагођавање посебним захтевима за ту врсту робе у складу са прописима, доступности одређених сировина или њиховом сезонском карактеру што утиче на садржину производа, примени добровољне стратегије за побољшање приступа здравој и нутритивно вредној храни, праву трговца да на различитим тржиштима понуди робу у паковањима различите тежине или запремине и др;

– су потрошачи обавештени о постојању разлика које су настале због легитимних и објективних чинилаца, као и да ли је обавештавање потрошача извршено тако да је омогућен једноставан приступ потребним информацијама;

– потрошачи могу лако да уоче разлике у роби које су настале због претходно наведених разлога имајући у виду доступност и прикладност информација које им пружа трговац, а које нису дате само на етикетама производа.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 19. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '19',
  NULL,
  $en$Omission by which consumers are misled

Article 19.

Misleading business practice exists when the trader, by omitting a certain act, taking into account all the circumstances of the case, the spatial and temporal limitations of the means of communication used and the additional measures which he has taken for the purpose of informing consumers:

1) withholds material information which the average consumer needs for an appropriate level of information when making a decision, thereby inducing or threatening to induce him to make an economic decision which he would not otherwise have made;

2) conceals material information or provides material information in an untimely manner or in an unclear, incomprehensible or ambiguous manner, or when he fails to indicate the business purpose of his addressing of consumers, thereby inducing or threatening to induce the average consumer to make an economic decision which he would not otherwise have made.

An invitation to make an offer and information on the characteristics and the price, unless something else follows from the circumstances of the case, must contain, as material information:

1) the main characteristics of the product, to the extent appropriate to the given product and the means of communication used;

2) the name and address of the trader and, if the trader carries on business in the name of another trader, the name and address of the trader in whose name he carries on business;

3) the price which includes taxes and other charges and additional costs, transport costs, postage and delivery costs;

4) the manner of payment, delivery and the manner of operation of the product, if they depart from the requirements of professional diligence;

5) information on the right to withdraw from the contract;

6) for a product offered on an online marketplace, information as to whether the third person offering the product is a trader or not, on the basis of the statement which that third person gives to the provider.

The following shall also be regarded as material information:

1) general information on the most important parameters by which the ranking of products presented to the consumer is determined and on the relative importance of those parameters in relation to the other parameters, which are available in a separate section of the internet page on which the results of the request are displayed, when the consumer has the possibility of searching for products offered by various traders or when the consumer has the possibility, on the basis of a search by means of a keyword, phrase or other input, to obtain a specific ranking of products, irrespective of where the contract is concluded;

2) if the trader enables access to consumer reviews, information as to whether and in what manner the trader ensures that the published reviews were written by consumers who purchased or used the product.

By way of exception from paragraph 2, point 3) of this Article, if, because of the properties of the product, the price or the additional costs cannot be calculated in advance, the trader is obliged to provide the consumer with the data on the basis of which the price or the additional costs are calculated.

The obligation under paragraph 3, point 1) of this Article does not apply to providers of an internet search service.
$en$,
  $sr$Пропуштање којим се обмањују потрошачи

Члан 19.

Обмањујућа пословна пракса постоји када трговац пропуштањем одређене радње, узимајући у обзир све околности случаја, просторна и временска ограничења употребљеног средства комуникације и допунске мере које је предузео у циљу обавештавања потрошача:

1) ускрати битна обавештења која су просечном потрошачу потребна за одговарајући ниво обавештености код одлучивања, чиме наводи или прети да га наведе да донесе економску одлуку коју иначе не би донео;

2) скрива битне информације или битне информације пружа неблаговремено или на нејасан, неразумљив или двосмислен начин или када пропусти да истакне пословну сврху свог обраћања потрошачима, чиме наводи или прети да наведе просечног потрошача да донесе економску одлуку коју иначе не би донео.

Позив на понуду и обавештење о особинама и цени, осим ако нешто друго не произлази из околности случаја, као битне информације мора да садржи:

1) основна обележја производа у обиму који одговара датом производу и употребљеном средству комуникације;

2) назив и адресу трговца и ако трговац послује у име другог трговца, назив и адресу трговца у чије име послује;

3) цену која обухвата пореске и друге дажбине и додатне трошкове, трошкове транспорта, поштарину и трошкове испоруке;

4) начин плаћања, испоруке и начин рада производа, ако одступају од захтева професионалне пажње;

5) обавештење о праву на одустанак од уговора;

6) за производ који се нуди на онлајн тржишту, информације о томе да ли је треће лице које нуди производ трговац или не, на основу изјаве коју даје то треће лице пружаоцу.

Битним информацијама сматрају се и:

1) опште информације о најважнијим параметрима којима се одређује рангирање производа приказаних потрошачу и о релативној важности тих параметара у односу на остале параметре, који су доступни у посебном делу интернет странице на којој су приказани резултати захтева, када потрошач има могућност претраживања производа које нуде разни трговци или када потрошач има могућност да на основу претраживања уз помоћ кључне речи, израза или другог уноса добије одређено рангирање производа, независно где се уговор закључује;

2) ако трговац омогућава приступ потрошачким рецензијама, информације о томе да ли трговац обезбеђује и на који начин да су објављене рецензије написали потрошачи који су производ купили или користили.

Изузетно од става 2. тачка 3) овог члана, ако се због својстава производа цена или додатни трошкови не могу унапред обрачунати, трговац је дужан да потрошачу достави податке на основу којих се цена или додатни трошкови обрачунавају.

Обавеза из става 3. тачка 1) овог члана не односи се на пружаоце услуге интернет претраживања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 20. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '20',
  NULL,
  $en$Forms of business practice which are regarded as misleading business practice

Article 20.

Forms of business practice which, irrespective of the circumstances of the individual case, are regarded as misleading business practice are:

1) a false claim that the trader is a signatory to a code of good business practice or that he acts in accordance with a particular code of good business practice;

2) unauthorized display of a quality mark, a trust mark or a similar mark by the trader;

3) a false claim by the trader that a particular code of good business practice has been approved by a state authority or by a particular organization;

4) a false claim by the trader that his business practice or the sale of a product is approved, supported or assisted by a particular state authority or a particular organization, or a true claim of the same content in the case where the trader does not comply with the conditions under which the approval, support or assistance was given to him;

5) an invitation by the trader to the consumer to make an offer for the purchase of a product at a specified price, if the trader conceals the existence of a reasonable ground for doubt that he will be able to deliver that product or equipment or to engage another trader for the delivery of the product at the stated price, in the quantity and within the time limit which could be expected having regard to the type of product, the extent of the advertising and the price offered;

6) an invitation by the trader to the consumer to make an offer for the purchase of a product at a specified price, if the trader, with the intention of inducing the consumer to purchase some other product, refuses to show the consumer the product to which the advertisement relates or refuses to accept the order or to deliver the product within a reasonable time, or shows the consumer a damaged sample of the product to which the advertising relates;

7) a false claim by the trader that the product will be available within a short period or that it will be available within a short period under certain conditions, with the aim of inducing the consumer to make the purchase decision without delay, that is, of depriving him of the opportunity or the time necessary for an appropriate level of information when making the decision;

8) a failure by the trader to inform the consumer, before he accepts the offer, in a clear manner that, after the sale of a particular product, he will provide him with accompanying services in a language which is not in official use in the Republic of Serbia;

9) a false claim by the trader, or the creation of a false impression, that a particular product is in circulation in accordance with the legislation in force;

10) presenting rights which are guaranteed to the consumer by law as special advantages which the trader offers to the consumer;

11) use of editorial space in the media for the advertising of a product, that is, a failure by the trader to emphasize, in the content of the advertisement, by sound or by image, that it is paid advertising and not content behind which the editorial staff stands;

12) displaying search results as a response to an online search by the consumer without unambiguously indicating every paid advertisement or payment for the purpose of achieving a higher ranking of products in the search results;

13) a false claim by the trader concerning the nature and the significance of the risk to which the consumer exposes himself or his family if he does not purchase a particular product;

14) advertising by the trader of a product which imitates a product of another trader and by which the consumer is deliberately led to the erroneous conclusion that the products are produced by the same trader;

15) the creation, operation or advertising by the trader of a system for the sale of products within which the consumer pays a fee for the possibility of obtaining income which does not depend on the success of the sale of a particular product, but on the participation of other consumers in that system of sale (pyramid scheme);

16) a false claim by the trader that he is ceasing to carry on business or that he is moving to other business premises;

17) a claim by the trader that a particular product increases the chance of winning in games of chance;

18) a false claim by the trader that a particular product cures a particular disease, a functional disorder or a malformation;

19) the provision of inaccurate information on market conditions or on the possibility of purchasing a particular product on the market, with the intention of inducing the consumer to acquire the product under conditions which are less favorable than the usual market conditions;

20) a claim that a prize competition or a promotional game is being announced, if thereafter the promised prize or an appropriate substitute for it is not distributed;

21) describing a product with the words gratis, free of charge, without payment or other words of similar meaning, if the consumer is obliged to bear any cost other than the unavoidable cost in connection with the business practice and the collection or delivery of the product;

22) placing an invoice or a similar document by which payment is demanded into advertising material, thereby creating in the consumer a false impression that he has already ordered the advertised product;

23) a false claim, or the creation of a false impression, that the trader is not acting within the scope of his business activity, profession or craft, or falsely passing himself off as a consumer (presenting himself as a consumer);

24) creating a false impression in the consumer that, after the sale of a particular product, accompanying services are available also on the territory of another state besides the state in which the product was sold;

25) resale of tickets for events to consumers if the trader acquired them by the use of automated means for circumventing any restriction regarding the number of tickets which one person may purchase, or any other rules which may be applied to the purchase of tickets;

26) stating that product reviews were given by consumers who had actually used or purchased the product, without taking reasonable and proportionate measures in order to verify that those reviews were given by consumers;

27) submitting false consumer reviews or recommendations, or commissioning another legal or natural person to submit them, or misrepresenting consumer reviews or recommendations for the purpose of promoting a product.
$en$,
  $sr$Облици пословне праксе који се сматрају обмањујућом пословном праксом

Члан 20.

Облици пословне праксе који се без обзира на околности појединачног случаја сматрају обмањујућом пословном праксом јесу:

1) неистинита тврдња да је трговац потписник кодекса добре пословне праксе или да поступа у складу са одређеним кодексом добре пословне праксе;

2) неовлашћено истицање ознаке квалитета, знака од поверења или сличног знака од стране трговца;

3) неистинита тврдња трговца да је одређени кодекс добре пословне праксе одобрен од државног органа или одређене организације;

4) неистинита тврдња трговца да његову пословну праксу или продају производа, одобрава, подржава или помаже одређени државни орган или одређена организација или истинита тврдња исте садржине у случају да се трговац не придржава услова под којима му је дато одобрење, подршка или помоћ;

5) позив трговца потрошачу да учини понуду за куповину неког производа по одређеној цени, ако трговац прикрива постојање основаног разлога за сумњу да ће моћи да испоручи тај производ или опрему или да ангажује другог трговца за испоруку производа по наведеној цени, у количини и року који би се могао очекивати с обзиром на врсту производа, обим оглашавања и понуђену цену;

6) позив трговца потрошачу да учини понуду за куповину неког производа по одређеној цени, ако трговац у намери да потрошача наведе на куповину неког другог производа одбија да покаже потрошачу производ на који се оглас односи или одбија да прими наруџбину или да испоручи производ у примереном року или покаже потрошачу оштећени узорак производа на који се односи оглашавање;

7) неистинита тврдња трговца да ће производ бити расположив у кратком року или да ће бити расположив у кратком року под одређеним условима, с циљем да се потрошач наведе да одлуку о куповини донесе без одлагања, односно да му се ускрати прилика или време потребно за одговарајући ниво обавештености код доношења одлуке;

8) пропуштање трговца да потрошача, пре него што прихвати понуду, на јасан начин обавести да ће му након продаје одређеног производа пружити пратеће услуге на језику који није у службеној употреби у Републици Србији;

9) неистинита тврдња трговца или стварање погрешног утиска да је одређени производ у промету у складу са позитивним прописима;

10) представљање права која су потрошачу гарантована законом као посебне предности коју трговац нуди потрошачу;

11) употреба уредничког простора у медијима за оглашавање производа, то јест пропуштање трговца да у садржају огласа звуком или сликом нагласи да је реч о плаћеном оглашавању, а не о садржају иза којег стоји уредништво;

12) приказивање резултата претраге као одговор на онлајн претраживање потрошача без недвосмисленог навођења сваког плаћеног оглашавања или плаћања у сврху постизања вишег рангирања производа у резултатима претраживања;

13) неистинита тврдња трговца о природи и значају ризика коме потрошач излаже себе или своју породицу ако не купи одређени производ;

14) оглашавање од стране трговца производа који подражава производ другог трговца и којим се потрошач намерно наводи на погрешан закључак да производе производи исти трговац;

15) стварање, вођење или оглашавање од стране трговца система продаје производа у оквиру којег потрошач плаћа накнаду за могућност остварења прихода који не зависи од успешности продаје одређеног производа, већ од учествовања других потрошача у том систему продајe (пирамидална шема);

16) неистинита тврдња трговца да престаје са пословањем или да се премешта у друге пословне просторије;

17) тврдња трговца да одређени производ повећава шансу за победу у играма на срећу;

18) неистинита тврдња трговца да одређени производ лечи одређену болест, поремећај функције или малформацију;

19) пружање нетачних информација о условима на тржишту или могућности куповине одређеног производа на тржишту у намери да се потрошач наведе да производ прибави под условима који су неповољнији од уобичајених тржишних услова;

20) тврдња да се расписује наградно такмичење или промотивна игра, ако се након тога не подели обећана награда или одговарајућа замена за њу;

21) описивање производа речима гратис, бесплатно, без накнаде или другим речима сличног значења, ако је потрошач дужан да сноси било какав трошак осим неизбежног трошка у вези са пословном праксом и преузимања или испоруке производа;

22) стављање рачуна или сличног документа којим се захтева плаћање у огласни материјал, чиме се код потрошача ствара погрешан утисак да је већ наручио оглашавани производ;

23) неистинита тврдња или стварање погрешног утиска да трговац не поступа у оквиру своје пословне делатности, професије или заната или неистинито издавање за потрошача (представљање као потрошач);

24) стварање погрешног утиска код потрошача да су након продаје одређеног производа пратеће услуге доступне и на територији друге државе осим државе у којој је производ продат;

25) препродаја улазница за догађања потрошачима ако их је трговац набавио употребом аутоматизованих средстава за заобилажење било ког ограничења у погледу броја улазница које једна особа може купити или било којих других правила која се могу применити на куповину улазница;

26) навођење да су рецензије производа дали потрошачи који су заиста користили или купили производ без предузимања разумних и пропорционалних мера како би се проверило да су те рецензије дали потрошачи;

27) подношење лажних потрошачких рецензија или препорука или наручивање од другог правног или физичког лица да их поднесе или погрешно представљање потрошачких рецензија или препорука ради промоције производа.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 21. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '21',
  NULL,
  $en$Aggressive business practice

Article 21.

Aggressive business practice exists if, taking into account all the circumstances of the particular case, the trader, by harassment, coercion, including physical coercion, or undue influence, impairs or threatens to impair the freedom of choice or the behavior of the average consumer in relation to a particular product and in that manner induces or threatens to induce the consumer to make an economic decision which he would not otherwise have made.

Undue influence, within the meaning of this Law, is an abuse of a position of power for the purpose of exerting pressure on the consumer in a manner which materially limits the ability to attain an appropriate level of information when making a decision, irrespective of whether physical force is used or the use of physical force is held out as a prospect.

The criteria on the basis of which the existence of aggressive business practice is established are:

1) the time, place, nature and duration of the aggressive business practice;

2) the use of threatening or offensive language or behavior;

3) the fact that the trader knowingly, with the intention of influencing the consumer's decision in relation to the product, uses a misfortune which has happened to the consumer or the difficult circumstances in which the consumer finds himself, and which affect his capacity for judgment;

4) an onerous or disproportionate non-contractual obstacle which the trader places before a consumer who wishes to exercise his contractual right, including the right to terminate or to annul the contract or to choose another product or another trader;

5) a threat by the trader that he will take against the consumer a particular action which is not in accordance with the law.
$en$,
  $sr$Насртљива пословна пракса

Члан 21.

Насртљива пословна пракса постоји ако узимајући у обзир све околности конкретног случаја, трговац узнемиравањем, принудом, укључујући физичку принуду, или недозвољеним утицајем, нарушава или прети да наруши слободу избора или понашање просечног потрошача у вези са одређеним производом и на тај начин наводи или прети да наведе потрошача да донесе економску одлуку коју иначе не би донео.

Недозвољени утицај, у смислу овог закона, је злоупотреба позиције моћи у циљу вршења притиска на потрошача на начин који битно ограничава способност да оствари одговарајући ниво обавештености код одлучивања, без обзира да ли се употребљава или ставља у изглед употреба физичке силе.

Критеријуми на основу којих се утврђује постојање насртљиве пословне праксе су:

1) време, место, природа и трајање насртљиве пословне праксе;

2) употреба претећег или увредљивог језика или понашања;

3) чињеница да трговац свесно, у намери да утиче на одлуку потрошача у вези са производом, користи несрећни случај који се догодио потрошачу или тешке околности у којима се потрошач налази, а које утичу на његову способност за расуђивање;

4) тешка или несразмерна вануговорна препрека коју трговац поставља потрошачу који жели да оствари своје уговорно право, укључујући право да раскине или поништи уговор или изабере други производ или другог трговца;

5) претња трговца да ће према потрошачу предузети одређену радњу која није у складу са законом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 22. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '22',
  NULL,
  $en$Forms of business practice which are regarded as aggressive business practice

Article 22.

Forms of business practice which, irrespective of the circumstances of the individual case, are regarded as aggressive business practice are:

1) creating the impression in the consumer that he cannot leave the premises until he concludes a contract;

2) a visit to the consumer, in his residential premises, without his prior consent or contrary to a request that the trader leave him or not return, except for the purpose of enforcing a claim arising from a contract;

3) repeatedly addressing the consumer, contrary to his will, by telephone, fax, electronic mail or another means of electronic communication, except for the purpose of enforcing a claim arising from a contract;

4) a request that a consumer who intends to exercise his rights under an insurance policy submit documents which cannot be regarded as significant for assessing the merits of his claim, or persistent avoidance of responding to the consumer's request for the purpose of deterring him from exercising his contractual rights;

5) directly calling upon children or minors, by means of an advertising message, to purchase or to influence parents or other adult persons to purchase for them the product which is the subject of the advertising;

6) a request to the consumer to pay for, return or keep a product the delivery of which he did not request;

7) explicitly informing the consumer that the trader's business or livelihood is endangered if the consumer does not purchase a particular product;

8) creating a false impression in the consumer that he has won or that, by taking a particular action, he will win a prize or some other benefit, when the prize or the benefit does not exist, or if the taking of another action for the purpose of winning the prize or the benefit is conditional upon the consumer paying a certain sum of money or incurring certain costs;

9) obliging the consumer to purchase a product or to pay anything during a free excursion which the trader has organized for the purpose of promoting or selling a product.
$en$,
  $sr$Облици пословне праксе који се сматрају насртљивом пословном праксом

Члан 22.

Облици пословне праксе који се без обзира на околности појединачног случаја сматрају насртљивом пословном праксом јесу:

1) стварање утиска код потрошача да не може да напусти просторије док не закључи уговор;

2) посета потрошачу, у његовом стамбеном простору, без његове претходне сагласности или супротно захтеву да га трговац напусти или да се не врати, осим ради остваривања потраживања из уговора;

3) вишеструко обраћање потрошачу, противно његовој вољи телефоном, факсом, електронском поштом или другим средством електронске комуникације, осим ради остваривања потраживања из уговора;

4) захтев да потрошач који намерава да оствари своја права из полисе осигурања достави документа која се не могу сматрати значајним за оцену основаности његовог захтева или упорно избегавање да се одговори на захтев потрошача ради одвраћања од остваривања његових уговорних права;

5) директно позивање деце или малолетника путем огласне поруке да купе или утичу на родитеље или друга одрасла лица да за њих купе производ који је предмет оглашавања;

6) захтев потрошачу да плати, врати или чува производ чију испоруку није тражио;

7) изричито обавештавање потрошача да су посао или егзистенција трговца угрожени ако потрошач не купи одређени производ;

8) стварање погрешног утиска код потрошача да је освојио или да ће предузимањем одређене радње освојити награду или какву другу корист када награда или корист не постоји или ако је предузимање друге радње у циљу освајања награде или користи условљено тиме да потрошач плати одређену суму новца или претрпи одређене трошкове;

9) обавезивање потрошача да купи производ или да било шта плати током бесплатног излета који је организовао трговац ради промоције или продаје производа.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 23. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '23',
  NULL,
  $en$Right to compensation for damage caused by unfair business practice

Article 23.

Consumers who have suffered damage because of the unfair business practice of a trader have the right to compensation for damage in accordance with the general rules on liabilities for damage and, if a contract has been concluded by the application of unfair business practice, they also have, where this is applicable, other rights in accordance with the general rules of contract law (the right to terminate the contract, a reduction of the price, and the like).
$en$,
  $sr$Право на накнаду штете због непоштене пословне праксе

Члан 23.

Потрошачи који су претрпели штету због непоштене пословне праксе трговца имају право на накнаду штете према општим правилима о одговорностима за штету, а ако је уговор закључен применом непоштене пословне праксе имају, када је то примењиво, и друга права према општим правилима уговорног права (право на раскид уговора, снижење цене и др.).
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 24. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '24',
  NULL,
  $en$Special protection of minors

Article 24.

The sale, delivery, serving and giving as a gift of alcoholic beverages, including beer, tobacco and related products, electronic devices for heating a tobacco or a herbal product, electronic cigarettes, in accordance with the regulation governing tobacco, or pyrotechnic devices, to persons younger than 18 years of age, is prohibited.

In the event of doubt that the consumer is a person younger than 18 years of age, the trader is not obliged to sell, deliver or serve an alcoholic beverage, beer, a tobacco or related product, an electronic device for heating a tobacco or herbal product, an electronic cigarette or pyrotechnic devices until the consumer enables the trader to inspect a valid identity card, passport or driving licence.
$en$,
  $sr$Посебна заштита малолетника

Члан 24.

Забрањена је продаја, испорука, услуживање и поклањање алкохолних пића, укључујући пиво, дуванских и сродних производа, електронских уређаја за загревање дуванског, односно биљног производа, електронских цигарета, у складу са прописом којим се регулише дуван, или пиротехничких средстава, лицима млађим од 18 година живота.

У случају сумње да је потрошач лице млађе од 18 година, трговац није дужан да прода, испоручи или услужи алкохолно пиће, пиво, дувански и сродни производ, електронски уређај за загревање дуванског односно биљног производа, електронску цигарету или пиротехничка средства док потрошач не омогући трговцу увид у важећу личну карту, пасош или возачку дозволу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 25. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '25',
  NULL,
  $en$Code of good business practice

Article 25.

Traders or a group of traders who have acceded to a particular code of good business practice are obliged to comply with the provisions of the code and to monitor compliance with the rules of that code.

The Ministry encourages traders or a group of traders who have acceded to a particular code of good business practice to monitor the occurrence of unfair business practice of traders or of a group of traders who have acceded to that code.

The Ministry encourages traders or a group of traders who have acceded to a particular code of good business practice to inform consumers of the existence and the content of that code.
$en$,
  $sr$Кодекс добре пословне праксе

Члан 25.

Трговци или група трговаца који су приступили одређеном кодексу добре пословне праксе дужни су да се придржавају одредаба кодекса и контролишу поштовање правила тог кодекса.

Министарство подстиче трговце или групу трговаца који су приступили одређеном кодексу добре пословне праксе да контролишу појаву непоштене пословне праксе трговаца или групе трговаца који су приступили том кодексу.

Министарство подстиче трговце или групу трговаца који су приступили одређеном кодексу добре пословне праксе да обавештавају потрошаче о постојању и садржини тог кодекса.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 26. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '26',
  NULL,
  $en$Display of goods, exact measure and indication of sales incentives

Article 26.

It is prohibited to refuse to sell to the consumer goods which are displayed or otherwise prepared for sale, or to refuse the provision of a service which can be performed, if this is not contrary to another regulation and to business practice.

It is prohibited to make the sale of goods or the provision of a service conditional upon the sale of other goods or the provision of another service.

The trader is obliged to provide the consumer with goods in the exact measure or quantity and, if it is appropriate, to enable him to verify that accuracy.

If the trader offers special sales incentives upon the purchase of goods and services, in accordance with the law governing trade, he is obliged to indicate them clearly and visibly, to state the conditions for obtaining them and to comply with them.
$en$,
  $sr$Излагање робе, тачна мера и истицање продајних подстицаја

Члан 26.

Забрањено је одбијање да се потрошачу прода роба која је изложена или на други начин припремљена за продају или одбијање пружања услуге која се може обавити, уколико то није у супротности са другим прописом и пословном праксом.

Забрањено је условљавање продаје робе или пружања услуге продајом друге робе или пружањем друге услуге.

Трговац је дужан да потрошачу обезбеди робу у тачној мери или количини и уколико је примерено, да му омогући да провери ту тачност.

Уколико трговац нуди посебне продајне подстицаје при куповини роба и услуга, у складу са законом којим се уређује трговина, дужан је да их јасно и видљиво истакне, наведе услове за њихово остваривање и да их се придржава.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 27. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '27',
  NULL,
  $en$Article 27.

The trader is obliged, before the conclusion of a distance contract or a contract off business premises, in addition to the information referred to in Article 12 of this Law, to inform the consumer in a clear and comprehensible manner of:

1) the geographical address at which he carries on business if he does not carry on business at the address of the registered office, the electronic mail address, the name and address of the trader in whose name he acts, as well as other means of communication which enable the consumer to store on a durable medium the correspondence with the trader, which includes the date and time of the communication;

2) the selling price which comprises the total costs for the billing period in the case of a contract of indeterminate duration or a contract which contains a subscription; where such contracts provide for the payment of a fixed sum, the selling price comprises the total monthly costs; where the total costs cannot be reliably calculated in advance, the manner in which the selling price will be calculated shall be communicated;

3) the cost of using the means of distance communication for the conclusion of the contract, where that cost is calculated on a basis other than the basic tariff;

4) the conditions, the time limit and the procedure for exercising the right of withdrawal from the contract in accordance with Article 29 of this Law;

5) the obligation to pay the trader reasonable costs in accordance with Article 36, paragraph 3 of this Law, if the consumer exercises the right of withdrawal from the contract after having submitted a statement in accordance with Article 29, paragraph 2 of this Law, that is, the form in accordance with Article 29 of this Law;

6) the information that the consumer cannot use the right of withdrawal, or of the circumstances under which the consumer loses the right of withdrawal from the contract, if the consumer does not have the right to withdraw from the contract in accordance with Article 38 of this Law;

7) the existence of his contractual relationship with the postal operator through whom the consumer may, in the case of a complaint on account of lack of conformity, send the goods at the trader's expense;

8) the possibility of out-of-court resolution of disputes.

Depending on the circumstances of the particular case and the type of goods, the trader is also obliged to inform the consumer of:

1) the consumer's duty to bear the costs of return of the goods in the event of withdrawal from the contract and, for distance contracts, if the goods, by reason of their characteristics, cannot be returned by post, the costs of returning the goods;

2) the existence of applicable codes of good business practice and the manner in which insight into the content of the code may be gained, where applicable;

3) the minimum duration of the consumer's contractual obligations in accordance with the contract;

4) the existence of and the conditions for depositing a monetary amount or other financial guarantees which the consumer is to pay or provide at the trader's request;

5) the fact that the price is personalised on the basis of a system of automated decision-making.

The provisions of paragraphs 1 and 2 of this Article shall also apply to contracts for the supply of water, gas or electricity where they are not offered for sale in a limited or predetermined quantity, or to contracts for the supply of thermal energy or for the delivery of digital content which is not delivered on a durable medium.

In the case of a public auction, the information on the trader referred to in Article 12, paragraph 1, point 2) of this Law and paragraph 1, point 1) of this Article may be replaced by information of the same kind on the auctioneer.

The information referred to in paragraph 1, points 4) and 5) and paragraph 2, point 1) of this Article may be provided by means of the form referred to in Article 29 of this Law.

If the trader does not fulfil the obligation to inform of the additional costs referred to in Article 12, paragraph 1, point 3) of this Law and paragraph 2, point 1) of this Article, the consumer is not obliged to bear those costs.

The trader is obliged to provide the consumer with the information referred to in paragraphs 1 and 2 of this Article in the Serbian language.

The information referred to in paragraphs 1 and 2 of this Article constitutes an integral part of the distance contract or of the contract which is concluded off business premises.

The burden of proving performance of the obligations in accordance with paragraphs 1 and 2 of this Article and Articles 31 and 32 of this Law is on the trader.
$en$,
  $sr$Члан 27.

Трговац је дужан да пре закључења уговора на даљину или изван пословних просторија, поред података из члана 12. овог закона, на јасан и разумљив начин потрошача обавести о:

1) географској адреси на којој послује ако не послује на адреси седишта, адреси електронске поште, називу и адреси трговца у чије име поступа, као и о другим средствима комуникације која омогућавају потрошачу да на трајном носачу података сачува преписку са трговцем, што укључује датум и време комуникације;

2) продајној цени која обухвата укупне трошкове за обрачунски период у случају уговора са неодређеним трајањем или уговора који садржи претплату; када се оваквим уговорима предвиђа плаћање фиксне суме, продајна цена обухвата укупне месечне трошкове; када се укупни трошкови не могу поуздано унапред обрачунати, саопштава се начин на који ће се продајна цена обрачунавати;

3) трошку коришћења средстава комуникације на даљину за закључивање уговора, када се тај трошак обрачунава на основи различитој од основне тарифе;

4) условима, року и поступку за остваривање права на одустанак од уговора у складу са чланом 29. овог закона;

5) обавези да плати трговцу разумне трошкове у складу са чланом 36. став 3. овог закона, ако потрошач остварује право на одустанак од уговора након што је поднео изјаву у складу са чланом 29. став 2. овог закона, односно образац у складу са чланом 29. овог закона;

6) податку да потрошач не може да користи право на одустанак или о околностима под којима потрошач губи право на одустанак од уговора, ако потрошач нема право да одустане од уговора у складу са чланом 38. овог закона;

7) постојању његовог уговорног односа са поштанским оператором преко кога потрошач може, у случају рекламације због несаобразности, да пошаље робу о трошку трговца;

8) могућности вансудског решавања спорова.

У зависности од околности конкретног случаја и врсте робе, трговац је дужан да потрошача обавести и о:

1) дужности потрошача да сноси трошкове повраћаја робе у случају одустанка од уговора и, за уговоре на даљину, ако се роба због својих карактеристика не може вратити поштом, трошкове враћања робе;

2) постојању примењивих кодекса добре пословне праксе и начину на који се може стећи увид у садржај кодекса, где је примењиво;

3) минималном трајању уговорних обавеза потрошача у складу са уговором;

4) постојању и условима за полагање новчаног износа или других финансијских гаранција које потрошач на захтев трговца треба да плати или достави;

5) томе да је цена персонализована на основу система аутоматизованог доношења одлука.

Одредбе ст. 1. и 2. овог члана примењују се и на уговоре о снабдевању водом, гасом или електричном енергијом када они нису понуђени за продају у ограниченој или унапред одређеној количини, или на уговоре о снабдевању топлотном енергијом или о испоруци дигиталног садржаја који се не испоручује на трајном носачу података.

У случају јавне аукције подаци о трговцу из члана 12. став 1. тачка 2) овог закона и става 1. тачка 1) овог члана могу бити замењени истоврсним подацима о аукционару.

Подаци из става 1. тач. 4) и 5) и става 2. тачка 1) овог члана могу бити достављени путем обрасца из члана 29. овог закона.

Уколико трговац не испуни обавезу обавештавања о додатним трошковима из члана 12. став 1. тачка 3) овог закона и става 2. тачка 1) овог члана, потрошач није дужан да сноси те трошкове.

Трговац је дужан да податке из ст. 1. и 2. овог члана пружи потрошачу на српском језику.

Подаци из ст. 1. и 2. овог члана представљају саставни део уговора на даљину или уговора који се закључује изван пословних просторија.

Терет доказивања извршења обавеза у складу са ст. 1. и 2. овог члана и чл. 31. и 32. овог закона је на трговцу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 28. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '28',
  NULL,
  $en$Article 28.

The online marketplace provider is obliged, before the conclusion of a distance contract, that is, before the consumer is bound by a corresponding offer, to inform the consumer in a clear and comprehensible manner, appropriate to the means of distance communication:

1) of the most important parameters by which the ranking of offers is determined, in a separate section of the internet page which is easily accessible from the page on which are displayed the offers which are presented to the consumer in the form of search results by the use of a keyword, phrase or other input, and of the relative importance of those parameters in relation to other parameters;

2) that, on the basis of the statement given to him by the third person who offers the goods, services or digital content, whether that person is a trader or not;

3) that, where the third person offering the goods, services or digital content is not a trader, the provisions of this Law do not apply;

4) of the division of contractual obligations between the third person offering the goods, services or digital content and the online marketplace provider, whereby such a notice does not affect the liability which, on the basis of this or another law, the online marketplace provider or the third person has towards the consumer in connection with the contract.

The obligation under paragraph 1 of this Article shall not be deemed fulfilled if the notice referred to in paragraph 1 of this Article is displayed only in the general terms of business.
$en$,
  $sr$Члан 28.

Пружалац онлајн тржишта дужан је да пре закључења уговора на даљину, односно пре обавезивања потрошача одговарајућом понудом, потрошача на јасан и разумљив начин, примерено средству комуникације на даљину, обавести:

1) о најважнијим параметрима којима се одређује рангирање понуда у посебном делу интернет странице која је лако доступна са странице на којој су приказане понуде које се потрошачу приказују у облику резултата претраге коришћењем кључне речи, израза или другог уноса и о релативној важности тих параметара у односу на друге параметре;

2) да на основу изјаве коју му је дало треће лице и које нуди робу, услуге или дигитални садржај, да ли је трговац или не;

3) да, када треће лице које нуди робу, услуге или дигитални садржај није трговац, не примењују се одредбе овог закона;

4) о подели уговорних обавеза између трећег лица које нуди робу, услуге или дигитални садржај и пружаоца онлајн тржишта, при чему се таквим обавештењем не утиче на одговорност коју, на основу овог или другог закона, пружалац онлајн тржишта или треће лице има према потрошачу у вези са уговором.

Обавеза из става 1. овог члана неће се сматрати испуњеном ако је обавештење из става 1. овог члана истакнуто само у општим условима пословања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 29. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '29',
  NULL,
  $en$Article 29.

The consumer has the right to withdraw from a contract concluded at a distance or off business premises within a period of 14 days, without stating reasons and without additional costs, except for the costs referred to in Articles 35 and 36 of this Law (hereinafter: withdrawal from the contract).

The consumer exercises the right of withdrawal from the contract by a statement which he may give on the prescribed form for withdrawal from a contract concluded at a distance or off business premises, or in another unequivocal manner (hereinafter: statement of withdrawal).

A statement of withdrawal from the contract, in the case of distance contracts and contracts which are concluded off business premises, shall be deemed timely if it has been sent to the trader within the period referred to in paragraph 1 of this Article.

A statement of withdrawal from the contract produces legal effect from the day on which it was sent to the trader.

If the trader enables the consumer to complete and send the withdrawal form electronically, he is obliged to inform him without delay of the receipt of the form, in written form or on another durable medium.

Upon the expiry of the periods referred to in Article 30 of this Law, the consumer's right of withdrawal from the contract ceases.

The burden of proving that he has acted in accordance with the provisions of paragraphs 1–5 of this Article, for the purpose of exercising the right of withdrawal from the contract, is on the consumer.

The form and content of the withdrawal form shall be prescribed by the minister competent for consumer protection affairs (hereinafter: the Minister).
$en$,
  $sr$Члан 29.

Потрошач има право да одустане од уговора закљученог на даљину или изван пословних просторија у року од 14 дана без навођења разлога и без додатних трошкова, осим трошкова из чл. 35. и 36. овог закона (у даљем тексту: одустанак од уговора).

Потрошач остварује право на одустанак од уговора изјавом коју може дати на прописаном обрасцу за одустанак од уговора закљученог на даљину или изван пословних просторија или на други недвосмислен начин (у даљем тексту: изјава о одустанку).

Изјава о одустанку од уговора код уговора на даљину и уговора који се закључују изван пословних просторија сматра се благовременом уколико је послата трговцу у року из става 1. овог члана.

Изјава о одустанку од уговора производи правно дејство од дана када је послата трговцу.

Ако трговац омогући потрошачу да електронски попуни и пошаље образац за одустанак, дужан је да га о пријему обрасца без одлагања обавести у писаној форми или на другом трајном носачу података.

Протеком рокова из члана 30. овог закона престаје право потрошача на одустанак од уговора.

Терет доказивања да је поступио у складу са одредбама из ст. 1–5. овог члана, ради остваривања права на одустанак од уговора, је на потрошачу.

Облик и садржину обрасца за одустанак прописује министар надлежан за послове заштите потрошача (у даљем тексту: Министар).
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 30. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '30',
  NULL,
  $en$Article 30.

In the case of a contract for the provision of services, the period of 14 days for withdrawal from the contract is calculated from the day of conclusion of the contract between the consumer and the trader.

In the case of a contract for the sale of goods, the period of 14 days for withdrawal from the contract is calculated from the day on which the goods come into the possession of the consumer or of a third person designated by the consumer, who is not the carrier.

Where the consumer, by a single order form, orders several types of goods which are delivered separately, the period of 14 days for withdrawal from the contract begins to run from the day on which the last type of the goods ordered comes into the possession of the consumer or of a third person designated by the consumer, who is not the carrier.

Where the delivery of the goods consists of several consignments and parts, the period of 14 days for withdrawal from the contract begins to run from the day on which the last consignment or part has come into the possession of the consumer or of a third person designated by the consumer, who is not the carrier.

Where a contract for an indefinite period with periodic deliveries of goods has been concluded, the period of 14 days for withdrawal from the contract begins to run from the day on which the first consignment of the goods comes into the possession of the consumer or of a third person designated by the consumer, who is not the carrier.

If the trader does not provide the consumer with the notice referred to in Article 27, paragraph 1, point 4) of this Law, in the manner referred to in Article 31, paragraph 1 of this Law and Article 32, paragraph 2 of this Law, the consumer may withdraw from the contract within a period of 12 months from the day of expiry of the period for withdrawal from the contract.

If the trader has not provided the consumer with the notice referred to in Article 27, paragraph 1, point 4) of this Law, in the manner referred to in Article 31, paragraph 1 of this Law and Article 32, paragraph 2 of this Law, and does so within a period of 12 months from the day of conclusion of the contract, the period of 14 days for withdrawal from the contract begins to run from the day on which the consumer receives that notice.

The period referred to in paragraphs 1–7 of this Article expires upon the expiry of the last hour of the last day of the period.
$en$,
  $sr$Члан 30.

Код уговора о пружању услуга, рок од 14 дана за одустанак од уговора рачуна се од дана закључења уговора између потрошача и трговца.

Код уговора о продаји робе, рок од 14 дана за одустанак од уговора рачуна се од дана када роба доспе у државину потрошача или трећег лица које је одредио потрошач, а које није превозник.

Када потрошач једном поруџбеницом наручи више врста роба које се испоручују засебно, рок од 14 дана за одустанак од уговора почиње да тече од дана када последња врста наручене робе доспе у државину потрошача или трећег лица које је одредио потрошач, а које није превозник.

Када се испорука робе састоји из више пошиљки и делова, рок од 14 дана за одустанак од уговора почиње да тече од дана када је последња пошиљка или део, доспео у државину потрошача или трећег лица које је одредио потрошач, а које није превозник.

Када је закључен уговор на неодређено време са периодичним испорукама робе, рок од 14 дана за одустанак од уговора почиње да тече од дана када прва пошиљка робе доспе у државину потрошача или трећег лица које је одредио потрошач, а које није превозник.

Ако трговац не преда потрошачу обавештење из члана 27. став 1. тачка 4) овог закона, на начин из члана 31. став 1. овог закона и члана 32. став 2. овог закона, потрошач може одустати од уговора у року од 12 месеци од дана истека рока за одустанак од уговора.

Ако трговац није предао потрошачу обавештење из члана 27. став 1. тачка 4) овог закона, на начин из члана 31. став 1. овог закона и члана 32. став 2. овог закона, па то учини у року од 12 месеци од дана закључења уговора, рок од 14 дана за одустанак од уговора почиње да тече од дана када потрошач добије то обавештење.

Рок из ст. 1–7. овог члана истиче протеком последњег часа последњег дана рока.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 31. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '31',
  NULL,
  $en$Article 31.

The trader is obliged, at the moment of conclusion of the contract, and at the latest upon delivery of the goods, to provide the consumer in written form with:

1) the prescribed withdrawal form;

2) a legible and comprehensible notice referred to in Article 27, paragraphs 1 and 2 of this Law, in the Serbian language;

3) a copy of the signed contract or an instrument concerning the contract (if an oral contract has been concluded).

The trader is obliged to obtain the prior consent of the consumer if the delivery of digital content is not made on a durable medium, as well as the consumer's confirmation that he knows that by such delivery he loses the right of withdrawal from the contract.

The trader may fulfil the obligation under paragraph 1 of this Article on a durable medium, if the consumer consents thereto.

Where the consumer requests that the provision of services or the supply of water, gas or electricity, where they are not offered for sale in a limited or predetermined quantity, or the delivery of thermal energy, begin during the period for withdrawal from the contract referred to in Article 30 of this Law, and the consumer has undertaken by the contract to make payment, the trader shall require the consumer to submit such an express request on a durable medium. The request must also contain the consumer's consent that he loses the right of withdrawal from the contract if the trader performs the contract in full.
$en$,
  $sr$Члан 31.

Трговац је дужан да у тренутку закључења уговора, а најкасније приликом испоруке робе преда потрошачу у писаној форми:

1) прописани образац за одустанак;

2) читко и разумљиво обавештење из члана 27. ст. 1. и 2. овог закона на српском језику;

3) примерак потписаног уговора или исправу о уговору (ако је закључен усмени уговор).

Трговац је дужан да прибави претходну сагласност потрошача ако се испорука дигиталног садржаја не врши на трајном носачу података, као и потврду потрошача да зна да таквом испоруком губи право на одустанак од уговора.

Трговац може испунити обавезу из става 1. овог члана на трајном носачу података, уколико је потрошач са тим сагласан.

Када потрошач захтева да пружање услуга или снабдевање водом, гасом или електричном енергијом када они нису понуђени за продају у ограниченој или унапред одређеној количини, или испорука топлотне енергије започне у току рока за одустанак од уговора из члана 30. овог закона а потрошач се уговором обавезао на плаћање, трговац ће захтевати да потрошач поднесе такав изричит захтев на трајном носачу података. Захтев мора садржати и сагласност потрошача да губи право на одустанак од уговора ако трговац испуни уговор у целости.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 32. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '32',
  NULL,
  $en$Article 32.

If the trader calls the consumer by telephone with the intention of concluding a distance contract, he is obliged, immediately after the beginning of the conversation, to state his identity, and that the call has been made for commercial purposes.

The trader is obliged, within a reasonable period after the conclusion of the contract, and at the latest at the time of delivery of the goods or of the commencement of the provision of the service, to provide the consumer, on a durable medium, with:

1) the withdrawal form;

2) in the Serbian language, a legible and comprehensible notice referred to in Article 27, paragraphs 1 and 2 of this Law, unless the means of distance communication has limited space or time for display, in which case the notice must contain a minimum of the information referred to in Article 12, paragraph 1, points 1–3) and 8) and in Article 27, paragraph 1, points 2) and 4) and paragraph 2, points 1), 3) and 4) of this Law;

3) the contract or an instrument concerning the contract (if an oral contract has been concluded).

The trader is obliged to obtain the prior express consent of the consumer if the delivery of digital content is not made on a durable medium, and the consumer's confirmation that he knows that by such delivery he loses the right of withdrawal from the contract.

If a distance contract which is to be concluded by electronic means provides for an obligation of the consumer to pay, the trader shall communicate to the consumer, in a clear and legible manner and immediately before the consumer submits his order form, the notices referred to in Article 12, paragraph 1, point 1) and paragraph 2, point 1) of this Law and Article 27, paragraph 1, point 1) and paragraph 2, point 3) of this Law.

If, by the sending of the order form, the obligation to pay is at the same time accepted, there must be a clear notice to that effect on the order form or on the button or on some other similar function, if the sending of the order form is effected by activating them.

If the trader does not act in accordance with the obligation under paragraph 5 of this Article, the contract or the order form shall not bind the consumer.

On sales internet pages, at the latest at the beginning of the ordering procedure, information on the existence of restrictions with regard to delivery and which means of payment are accepted must be indicated clearly and legibly.

Where the consumer requests that the provision of services or the supply of water, gas or electricity, where they are not offered for sale in a limited or predetermined quantity, or the delivery of thermal energy, begin during the period for withdrawal from the contract referred to in Article 29 of this Law, and the consumer has undertaken by the contract to make payment, the trader shall require the consumer to submit such an express request on a durable medium. The request must also contain the consumer's consent that he loses the right of withdrawal from the contract if the trader performs the contract in full.
$en$,
  $sr$Члан 32.

Ако трговац телефоном позове потрошача у намери да закључи уговор на даљину, дужан је да, одмах након почетка разговора, предочи свој идентитет, као и да је позив учињен у комерцијалне сврхе.

Трговац је дужан да у разумном року по закључењу уговора, а најкасније у време испоруке робе или почетка пружања услуге, на трајном носачу података, преда потрошачу:

1) образац за одустанак;

2) на српском језику, читко и разумљиво обавештење из члана 27. ст. 1. и 2. овог закона, осим ако средство даљинске комуникације има ограничен простор или време приказивања, када обавештење мора да садржи минимум података из члана 12. став 1. тач. 1–3), 8) и из члана 27. став 1. тач. 2) и 4) и став 2. тач. 1), 3) и 4) овог закона;

3) уговор или исправу о уговору (ако је закључен усмени уговор).

Трговац је дужан да прибави претходну изричиту сагласност потрошача ако се испорука дигиталног садржаја не врши на трајном носачу података и потврду потрошача да зна да таквом испоруком губи право на одустанак од уговора.

Ако уговор на даљину, који треба да се закључи електронским путем, предвиђа обавезу потрошача за плаћање, трговац саопштава потрошачу на јасан и читак начин обавештења из члана 12. став 1. тачка 1) и став 2. тачка 1) овог закона и члана 27. став 1. тачка 1) и став 2. тачка 3) овог закона и непосредно пре него што потрошач достави своју поруџбеницу.

Ако се слањем поруџбенице истовремено прихвата и обавеза плаћања, о томе мора да постоји јасно обавештење на поруџбеници или на тастеру или некој другој сличној функцији, ако се слање поруџбенице врши њиховим активирањем.

Уколико трговац не поступи у складу са обавезом из става 5. овог члана, уговор или поруџбеница не обавезују потрошача.

На продајним интернет страницама, најкасније на почетку поступка наручивања, морају да буду јасно и читко наведени подаци о постојању ограничења у погледу испоруке и која средства плаћања се прихватају.

Када потрошач захтева да пружање услуга или снабдевање водом, гасом или електричном енергијом када они нису понуђени за продају у ограниченој или унапред одређеној количини, или испорука топлотне енергије започне у току рока за одустанак од уговора из члана 29. овог закона а потрошач се уговором обавезао на плаћање, трговац ће захтевати да потрошач поднесе такав изричит захтев на трајном носачу података. Захтев мора садржати и сагласност потрошача да губи право на одустанак од уговора ако трговац испуни уговор у целости.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 33. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '33',
  NULL,
  $en$Article 33.

The trader shall, within 30 days from the day of conclusion of a distance contract and of a contract concluded outside business premises, deliver the goods or provide the service, unless otherwise agreed.

The trader shall, without delay, inform the consumer that delivery of the contracted goods or provision of the contracted service is not possible.

The provisions of this Law by which protection of the consumer in the exercise of rights arising from a contract of sale is ensured shall apply accordingly to the obligations of the trader and the rights of the consumer in connection with delivery in accordance with a contract for the sale of goods or the provision of a service which has been concluded at a distance or outside business premises.
$en$,
  $sr$Члан 33.

Трговац је дужан да у року од 30 дана од дана закључења уговора на даљину и уговора који се закључује изван пословних просторија изврши испоруку робе или пружи услугу, осим ако није нешто друго уговорено.

Трговац је дужан да без одлагања обавести потрошача да испорука уговорене робе или пружање уговорене услуге није могуће.

На обавезе трговца и права потрошача у вези са испоруком у складу са уговором о продаји робе или пружању услуге, који је закључен на даљину или изван пословних просторија сходно се примењују одредбе овог закона којима се обезбеђује заштита потрошача у остваривању права из уговора о продаји.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 34. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '34',
  NULL,
  $en$Article 34.

If the consumer exercises the right of withdrawal from the contract in accordance with Article 29 of this Law, it shall be deemed that the contract has not been concluded, and the obligations prescribed by Articles 35 and 36 of this Law arise.
$en$,
  $sr$Члан 34.

Ако потрошач оствари право на одустанак од уговора у складу са чланом 29. овог закона, сматра се да уговор није ни закључен и настају обавезе прописане чл. 35. и 36. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 35. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '35',
  NULL,
  $en$Article 35.

The trader shall, without delay, and at the latest within 14 days from the day on which the trader received the withdrawal form from the consumer, refund to the consumer everything that the consumer paid under the contract (the purchase price, the delivery costs and the like).

By way of exception to paragraph 1 of this Article, the trader is not obliged to refund additional costs which are a consequence of the consumer's express request for a delivery which departs from the least expensive usual delivery offered by the trader.

The trader shall make the refund using the same means of payment which the consumer used in the initial transaction, unless the consumer has expressly agreed to the use of another means of payment and provided that the consumer bears no costs by reason of such refund.

The trader may defer the refund of the funds until the trader receives the goods which are being returned, or until the consumer supplies proof that the consumer has sent the goods to the trader, whichever occurs first, except in the case where the trader has offered to collect the goods itself.

The trader shall, at the trader's own expense, collect the goods which were delivered to the consumer at the consumer's home at the time of conclusion of the contract outside business premises if, by their nature, the goods cannot be returned in the usual manner through a postal operator.

When processing the consumer's personal data, the trader shall act in accordance with the regulations governing the protection of personal data.

The trader may not use any content which does not relate to the consumer's personal data, and which the consumer has provided or created when using the digital content or digital service delivered by the trader, except where:

1) such content is not useful outside the context of the digital content or digital service delivered by the trader,

2) such content relates only to the consumer's activity when using the digital content or digital service delivered by the trader,

3) the trader has combined such content with other data and cannot separate it from them, or such separation would constitute a disproportionate burden, or

4) such content has been jointly produced by the consumer and third parties, and other consumers may use it.

Except in the case referred to in paragraph 7, points 1) to 3), of this Article, the trader shall, at the consumer's request, make available any content which does not comprise personal data and which the consumer has provided or created when using the digital content or digital service delivered by the trader.

The consumer has the right to retrieve that digital content free of charge, without hindrance from the trader, within a reasonable time and in a commonly used machine-readable format.

The trader may prevent the consumer from continuing to use the digital content or digital service, in particular by disabling the consumer's access to the digital content or digital service or by deactivating the consumer's user account, without prejudice to the provision of paragraph 8 of this Article.
$en$,
  $sr$Члан 35.

Трговац је дужан без одлагања, а најкасније у року од 14 дана од дана када је примио од потрошача образац за одустанак, вратити потрошачу све што је платио на основу уговора (купопродајну цену, трошкове испоруке и сл.).

Изузетно од става 1. овог члана, трговац није дужан да изврши повраћај додатних трошкова који су последица изричитог захтева потрошача за доставу која одступа од најјефтиније уобичајене доставе коју је понудио трговац.

Трговац врши повраћај користећи иста средства плаћања која је потрошач користио у првобитној трансакцији, осим ако се потрошач није изричито сагласио са коришћењем другог средства плаћања и под условом да потрошач због таквог повраћаја не сноси никакве трошкове.

Трговац може да одложи повраћај средстава док не добије робу која се враћа, или док потрошач не достави доказ да је послао робу трговцу у зависности од тога шта наступа прво, осим у случају када је трговац понудио да сам преузме робу.

Трговац о сопственом трошку преузима робу која је била испоручена потрошачу у његовом дому у моменту закључења уговора изван пословних просторија ако роба по својој природи не може да се врати на уобичајен начин преко поштанског оператора.

Приликом обраде податка о личности потрошача, трговац поступа у складу са прописима којима се уређује заштита података о личности.

Трговац не сме да користи било какав садржај који се не односи на податке о личности потрошача, а које је потрошач пружио или створио при коришћењу дигиталног садржаја или дигиталне услуге које испоручује трговац, осим ако:

1) такав садржај није користан ван контекста дигиталног садржаја или дигиталне услуге које испоручује трговац,

2) такав садржај се односи само на активност потрошача при коришћењу дигиталног садржаја или дигиталне услуге које испоручује трговац,

3) трговац је објединио такав садржај са другим подацима и не може га од њих раздвојити, или би такво раздвајање представљало несразмерно оптерећење, или

4) такав садржај су заједнички произвели потрошач и трећа лица, те га други потрошачи могу употребљавати.

Осим у случају из става 7. тач. 1–3) овог члана, трговац на захтев потрошача ставља на располагање сваки садржај који не подразумева податке о личности, а који је потрошач пружио или направио при коришћењу дигиталног садржаја или дигиталне услуге које испоручује трговац.

Потрошач има право да преузме тај дигитални садржај бесплатно, без ометања од стране трговца, у разумном року и машински читљивом формату који се уобичајено употребљава.

Трговац може спречити да потрошач настави да употребљава дигитални садржај или дигиталну услугу, нарочито да потрошачу онемогући приступ дигиталном садржају или дигиталној услузи или угаси кориснички налог потрошача, не доводећи у питање одредбу става 8. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 36. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '36',
  NULL,
  $en$Article 36.

The consumer shall return the goods to the trader or to a person authorised by the trader, without delay, and at the latest within 14 days from the day on which the consumer sent the withdrawal form.

The goods shall be deemed to have been returned within the time limit if the consumer sent the goods before the expiry of the time limit of 14 days referred to in paragraph 1 of this Article.

The consumer shall bear solely the direct costs of returning the goods, unless the trader has agreed to bear them or has not previously informed the consumer that the consumer is obliged to pay them.

The consumer is solely liable for any diminished value of the goods which arises as a consequence of handling the goods in a manner which is not adequate, that is, which goes beyond what is necessary in order to establish the nature, characteristics and functionality of the goods.

The consumer shall not be liable for any diminished value of the goods in the case where the trader has not provided the consumer with information on the right of withdrawal from the contract in accordance with Article 27, paragraph 1, point 4), of this Law.

Where the consumer exercises the right of withdrawal from the contract after having submitted a request in accordance with Article 31, paragraph 4, or Article 32, paragraph 8, of this Law, the consumer shall pay the trader an amount proportionate to the services performed up to the moment when the consumer informed the trader of the exercise of the right of withdrawal from the contract.

The proportionate amount which the consumer is to pay to the trader shall be calculated on the basis of the selling price agreed in the contract, which may not be higher than the market value of what has been delivered.

The consumer shall not bear the costs of:

1) a service provided or the supply of water, gas or electricity when they are not offered for sale in a limited or predetermined quantity, or the full or partial supply of thermal energy during the period for withdrawal from the contract, where:

(1) the trader has not provided the information in accordance with Article 27, paragraph 1, points 4) and 5), of this Law; or

(2) the consumer has not expressly requested that performance begin during the period for withdrawal from the contract in accordance with Article 31, paragraph 4, or Article 32, paragraph 8, of this Law;

2) the delivery, in full or in part, of digital content which has not been supplied on a durable data carrier, where:

(1) the consumer has not given prior express consent for performance to begin before the expiry of the period of 14 days for withdrawal from the contract;

(2) the consumer has not confirmed that the consumer knows that, by giving consent, the consumer loses the right of withdrawal from the contract; or

(3) the trader has not provided confirmation in accordance with Article 31, paragraph 2, or Article 32, paragraph 3, of this Law.

Except in the cases provided for in this Article, the consumer shall not bear the consequences of exercising the right of withdrawal from the contract.

In the event of withdrawal from the contract, the consumer may not use the digital content or digital service or make them available to third parties.
$en$,
  $sr$Члан 36.

Потрошач је дужан да врати робу трговцу или лицу овлашћеном од стране трговца, без одлагања, а најкасније у року од 14 дана од дана када је послао образац за одустанак.

Сматраће се да је роба враћена у року ако је потрошач послао робу пре истека рока од 14 дана из става 1. овог члана.

Потрошач сноси искључиво директне трошкове враћања робе, осим ако се трговац сагласио са тим да их он сноси или ако није претходно обавестио потрошача да је потрошач у обавези да их плати.

Потрошач је искључиво одговоран за умањену вредност робе која настане као последица руковања робом на начин који није адекватан, односно превазилази оно што је неопходно да би се установили природа, карактеристике и функционалност робе.

Потрошач неће бити одговоран за умањену вредност робе у случају када му трговац није доставио обавештење о праву на одустанак од уговора у складу са чланом 27. став 1. тачка 4) овог закона.

Када потрошач остварује право на одустанак од уговора након што је доставио захтев у складу са чланом 31. став 4. или чланом 32. став 8. овог закона, дужан је да плати трговцу износ који је сразмеран са извршеним услугама до момента када је потрошач обавестио трговца о остваривању права на одустанак од уговора.

Сразмерни износ који потрошач треба да плати трговцу обрачунава се на основу продајне цене договорене уговором, која не може бити виша од тржишне вредности онога што је било испоручено.

Потрошач не сноси трошкове за:

1) пружену услугу или снабдевање водом, гасом или електричном енергијом када они нису понуђени на продају у ограниченој или унапред одређеној количини, или потпуно или делимично снабдевање топлотном енергијом током рока за одустанак од уговора када:

(1) трговац није доставио обавештење у складу са чланом 27. став 1. тач. 4) и 5) овог закона; или

(2) потрошач није изричито захтевао да се са извршењем почне у току рока за одустанак од уговора у складу са чланом 31. став 4. или чланом 32. став 8. овог закона;

2) испоруку дигиталног садржаја, у потпуности или делимично, који није достављен на трајном носачу података када:

(1) потрошач није дао претходну изричиту сагласност за почетак извршења пре истека рока од 14 дана за одустанак од уговора;

(2) потрошач није потврдио да зна да дајући сагласност губи право на одустанак од уговора; или

(3) трговац није доставио потврду у складу са чланом 31. став 2. или чланом 32. став 3. овог закона.

Осим у случајевима предвиђеним овим чланом, потрошач не сноси последице због остваривања права на одустанак од уговора.

У случају одустанка од уговора потрошач не сме користити дигитални садржај или дигиталну услугу или их ставити на располагање трећим лицима.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 37. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '37',
  NULL,
  $en$Article 37.

In the event that the consumer exercises the right of withdrawal from the contract, the legal effect of linked contracts shall cease without costs for the consumer, including the costs referred to in Articles 35 and 36 of this Law.

The provision of paragraph 1 of this Article also applies to a credit contract which is linked to a consumer contract, irrespective of whether the credit was granted to the consumer by a credit provider or the consumer concluded a financial arrangement with the trader.

If a third party has granted credit to the consumer for the purpose of financing obligations under a particular contract with the trader:

1) the trader shall inform the credit provider of the withdrawal from the contract within eight days;

2) the credit provider shall, without delay, refund to the consumer the amount which the consumer paid up to the withdrawal from the contract, together with interest, and at the latest within 30 days from the day on which the credit provider was informed of the withdrawal from the contract.
$en$,
  $sr$Члан 37.

У случају да потрошач оствари право на одустанак од уговора, престаје правно дејство повезаних уговора без трошкова за потрошача, укључујући трошкове из чл. 35. и 36. овог закона.

Одредба става 1. овог члана односи се и на уговор о кредиту који је повезан с потрошачким уговором, независно од тога да ли је потрошачу кредит одобрио давалац кредита или је потрошач са трговцем закључио финансијску погодбу.

Ако је треће лице одобрило кредит потрошачу за потребе финансирања обавеза из одређеног уговора са трговцем:

1) трговац је дужан да о одустанку од уговора обавести даваоца кредита у року од осам дана;

2) давалац кредита је дужан да потрошачу без одлагања врати износ који је потрошач платио до одустанка од уговора са каматом, а најкасније у року од 30 дана од дана када је обавештен о одустанку од уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 38. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '38',
  NULL,
  $en$Article 38.

The consumer does not have the right to withdraw from the contract in the case of:

1) the provision of services, after the service has been fully performed and the consumer has undertaken by the contract to pay, if the provision of the service began after the consumer's express prior consent and with the consumer's confirmation that the consumer knows that the consumer loses the right of withdrawal from the contract when the trader fully performs the contract;

2) the delivery of goods or the provision of services the price of which depends on changes on the financial market which the trader cannot influence and which may arise during the period for withdrawal;

3) the delivery of goods produced according to the consumer's special requirements or clearly personalised;

4) the delivery of goods which are liable to deterioration of quality or have a short period of durability;

5) the delivery of sealed goods which cannot be returned for reasons of protection of health or for hygienic reasons and which have been unsealed after delivery;

6) the delivery of goods which, after delivery, by their nature become inseparably mixed with other goods;

7) the delivery of alcoholic beverages the price of which was agreed at the time of conclusion of the contract of sale and the delivery of which may be effected only after 30 days from the day of conclusion of the contract, and the actual price of which depends on changes in prices on the market which the trader cannot influence;

8) contracts whereby the consumer expressly requests a visit by the trader for the purpose of carrying out urgent repairs or maintenance; if, during that visit, the trader also provides services other than those which the consumer specifically requested, or supplies goods other than replacement parts which are necessary for maintenance or the carrying out of the repair, the right of withdrawal from the contract applies to those additional services or goods;

9) the delivery of sealed audio or video recordings or computer software which have been unsealed after delivery;

10) the delivery of newspapers, periodical publications or magazines, except subscription contracts for the delivery of these publications;

11) contracts concluded at a public auction;

12) the provision of accommodation which is not for residential purposes, transport of goods, car rental services, services of preparation and delivery of food or services related to leisure activities, if the contract provides for a specific time limit or period of performance;

13) the delivery of digital content which is not delivered on a durable data carrier, and the consumer has undertaken by the contract to pay, if performance began after the giving of the consumer's express consent that performance of the contract begin during the period for withdrawal from the contract referred to in Article 29 of this Law and of confirmation that the consumer knows that the consumer thereby loses the right of withdrawal from the contract, and the trader has acted in accordance with Article 31, paragraph 1, point 3), and Article 32, paragraph 2, point 3), of this Law.
$en$,
  $sr$Члан 38.

Потрошач нема право да одустане од уговора у случају:

1) пружања услуга, након што је услуга у потпуности извршена а потрошач се уговором обавезао на плаћање, ако је пружање услуге почело након изричите претходне сагласности потрошача и уз његову потврду да зна да губи право на одустанак од уговора када трговац у потпуности изврши уговор;

2) испоруке робе или пружања услуга чија цена зависи од промена на финансијском тржишту на које трговац не може да утиче и које могу настати у току рока за одустанак;

3) испоруке робе произведене према посебним захтевима потрошача или јасно персонализоване;

4) испоруке робе која је подложна погоршању квалитета или има кратак рок трајања;

5) испоруке запечаћене робе која се не може вратити због заштите здравља или хигијенских разлога и која је отпечаћена након испоруке;

6) испоруке робе која се, након испоруке, због своје природе неодвојиво меша са другом робом;

7) испоруке алкохолних пића чија је цена договорена у време закључивања уговора о продаји и чија се испорука може извршити тек након 30 дана од дана закључења уговора, а чија стварна цена зависи од промена цена на тржишту на које трговац не може да утиче;

8) уговора којима потрошач изричито захтева посету од стране трговца у циљу спровођења хитних поправки или одржавања; уколико приликом ове посете трговац пружи и друге услуге осим оних које је потрошач конкретно захтевао или достави другу робу осим делова за замену који су неопходни за одржавање или извршење поправке, право на одустанак од уговора се односи на ове допунске услуге или робу;

9) испоруке запечаћених аудио, видео записа или рачунарског софтвера, који су отпечаћени након испоруке;

10) испоруке новина, периодичних издања или часописа осим претплатничких уговора за испоруку ових издања;

11) уговора закључених на јавној аукцији;

12) пружања смештаја који није у стамбене сврхе, транспорта робе, услуга изнајмљивања аутомобила, услуга припреме и достављања хране или услуга повезаних са слободним активностима уколико уговор предвиђа конкретни рок или период извршења;

13) испоруке дигиталног садржаја који није испоручен на трајном носачу података, а потрошач се уговором обавезао на плаћање, ако је извршење започело после давања изричите сагласности потрошача да извршење уговора започне у току рока за одустанак од уговора из члана 29. овог закона и потврде да зна да на тај начин губи право на одустанак од уговора, а трговац је поступио у складу са чланом 31. став 1. тачка 3) и чланом 32. став 2. тачка 3) овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 39. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '39',
  NULL,
  $en$Article 39.

It is prohibited to carry out direct advertising by telephone, fax or electronic mail, without the prior consent of the consumer.

It is prohibited to carry out direct advertising by other means of distance communication, without the prior consent of the consumer.

It is prohibited to make calls and/or send messages by telephone to consumers whose telephone numbers are entered in the register of consumers who do not wish to receive calls and/or messages in the course of promotion and/or sale by telephone.

The register referred to in paragraph 3 of this Article shall be kept at the regulatory body competent for electronic communications and shall contain the consumer's name and surname, the consumer's unique personal identification number, the telephone number and the date of entry in the register.

The register referred to in paragraph 3 of this Article is public in the part which relates to telephone numbers and the date of entry in the register.

Irrespective of entry in the register referred to in paragraph 3 of this Article, the consumer's consent to direct advertising given to the trader before or after entry in the register is valid until its revocation, which is given in accordance with the regulations governing the protection of personal data.

Entry in or removal from the register referred to in paragraph 3 of this Article shall be carried out free of charge by the electronic communications operator which has concluded with the consumer a contract for the use of publicly available electronic communications services, on the basis of a request which the consumer submits to the operator on the prescribed form.

The electronic communications operator shall enter or delete the data referred to in paragraph 4 of this Article in the register referred to in paragraph 3 of this Article within seven days from the day of receipt of the consumer's request.

When being entered in the register referred to in paragraph 3 of this Article, the consumer may leave in force or revoke previously given consent for the receipt of calls and/or messages in the course of promotion and/or sale by telephone.

The Minister shall prescribe in more detail the manner of entry and removal, the conditions and the manner of use and keeping of the register referred to in paragraph 3 of this Article, and the form of the request for entry in and removal from the register.

If the consumer has expressly consented to advertising by telephone, fax, electronic mail or other means of distance communication, the trader shall, before carrying out advertising of particular goods or a service, in a clear and unambiguous manner, in the Serbian language, inform the consumer of the commercial purpose of the activity.

When processing the consumer's personal data, the trader shall act in accordance with the regulations governing the protection of personal data.
$en$,
  $sr$Члан 39.

Забрањено jе директно оглашавање телефоном, факсом или електронском поштом, без претходног пристанка потрошача.

Забрањено је директно оглашавање другим средствима комуникације на даљину, без претходног пристанка потрошача.

Забрањено је упућивати позиве и/или поруке телефоном потрошачима чији су телефонски бројеви уписани у регистар потрошача који не желе примати позиве и/или поруке у оквиру промоције и/или продаје телефоном.

Регистар из става 3. овог члана води се при регулаторном телу надлежном за електронске комуникације и садржи име и презиме потрошача, јединствени матични број потрошача, број телефона и датум уписа у регистар.

Регистар из става 3. овог члана јаван је у делу који се односи на бројеве телефона и датум уписа у регистар.

Независно од уписа у регистар из става 3. овог члана, пристанак потрошача за директно оглашавање дат трговцу пре или након уписа у регистар, важи до његовог опозива који је дат у складу прописима којима се уређује заштита података о личности.

Упис или испис из регистра из става 3. овог члана обавља без накнаде оператор електронских комуникација који са потрошачем има закључен уговор о коришћењу јавно доступних електронских комуникационих услуга, на основу захтева који потрошач доставља оператору на прописаном обрасцу.

Оператор електронских комуникација је дужан да упише или испише податке из става 4. овог члана у регистар из става 3. овог члана у року од седам дана од дана пријема захтева потрошача.

Потрошач приликом уписа у регистар из става 3. овог члана може оставити на снази или опозвати претходно дату сагласност за пријем позива и/или порука у оквиру промоције и/или продаје телефоном.

Министар ближе прописује начин уписа и исписа, услове и начин коришћења и вођења регистра из става 3. овог члана и образац захтева за упис и испис из регистра.

Ако је потрошач изричито пристао на оглашавање телефоном, факсом, електронском поштом или другим средствима комуникације на даљину, трговац је дужан да пре него што учини оглашавање одређене робе или услуге, на јасан и недвосмислен начин, на српском језику, обавести потрошача о комерцијалној сврси активности.

Приликом обраде података о личности потрошача, трговац поступа у складу са прописима којима се уређује заштита података о личности.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 40. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '40',
  NULL,
  $en$Article 40.

It is prohibited to send goods or to provide services to a consumer with a request for payment for goods or services which the consumer did not order.

If, in the case referred to in paragraph 1 of this Article, the consumer does not make a statement concerning the goods which have been delivered or the service which has been provided, he shall not be deemed to have accepted the offer.

By the sending of goods or the provision of services which the consumer did not order, no obligation may arise for the consumer, and the consumer has the right to retain the goods sent without an obligation to pay, that is, he is not under an obligation to pay for the service performed.

It shall not be deemed to be a case referred to in paragraph 1 of this Article if the trader:

1) delivers to the consumer, instead of the goods or service which he ordered, other goods or provides another service of the same price and quality;

2) informs the consumer that he is not obliged to accept the goods or service which he did not request, nor to bear the costs of returning the goods to the trader.
$en$,
  $sr$Члан 40.

Забрањено је слање робе или пружање услуга потрошачу са захтевом за плаћање робе или услуга које потрошач није наручио.

Ако се у случају из става 1. овог члана, потрошач не изјасни о роби која је достављена или услузи која је пружена, не сматра се да је понуду прихватио.

Слањем робе или пружањем услуга које потрошач није наручио не може настати обавеза за потрошача и потрошач има право да задржи послату робу без обавезе плаћања, то јест није у обавези да плати за извршену услугу.

Неће се сматрати случајем из става 1. овог члана ако трговац:

1) потрошачу уместо робе или услуге, коју је наручио достави другу робу или пружи другу услугу исте цене и квалитета;

2) обавести потрошача да није дужан да прихвати робу или услугу коју није тражио ни да сноси трошкове враћања робе трговцу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 41. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '41',
  NULL,
  $en$Article 41.

When advertising by means of distance communication, the trader is obliged to indicate, in a clear and intelligible manner, the advertising nature of the message and the identity of the legal or natural person in whose name the advertising is carried out.

The trader is obliged to mark promotional games, competitions and special offers in a clear and intelligible manner, and to publish the conditions of participation in a promotional game or competition, or the conditions under which a special offer is valid, in a manner which enables them to be easily accessible, clear and intelligible to the consumer.
$en$,
  $sr$Члан 41.

Трговац је дужан да приликом оглашавања средствима комуникације на даљину истакне на јасан и разумљив начин огласну природу поруке и идентитет правног или физичког лица у чије име се врши оглашавање.

Трговац је дужан да промотивне игре, надметања и специјалне понуде означи на јасан и разумљив начин и да услове учешћа у промотивној игри или надметању или услове под којима важи специјална понуда објави на начин који омогућава да буду лако доступни, јасни и разумљиви потрошачу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 42. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '42',
  NULL,
  $en$3. Obligations of the trader in sales outside business premises

Article 42.

The trader is obliged, in a clear and intelligible manner, in an invitation to the consumer to participate in an event which he organises for the purpose of promotion or sale of products (e.g. an outing, a formal dinner and the like), to inform the consumer of the purpose and the conditions of participation in the event.

The invitation to the consumer referred to in paragraph 1 of this Article must be delivered on paper or, with the consent of the consumer, on another durable data carrier.
$en$,
  $sr$3. Обавезе трговца код продаје изван пословних просторија

Члан 42.

Трговац је дужан да на јасан и разумљив начин у позиву потрошачу ради учествовања на догађају који организује у сврху промоције или продаје производа (нпр. излет, свечана вечера и сл.) обавести потрошача о сврси и условима учествовања на догађају.

Позив потрошачу из става 1. овог члана мора бити достављен на папиру или, уз сагласност потрошача, на другом трајном носачу података.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 43. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '43',
  NULL,
  $en$Publicity requirement

Article 43.

A contractual term binds the consumer if it is expressed in simple, clear and intelligible language and if a reasonable person of the consumer's knowledge and experience would understand it.

The trader is obliged to acquaint the consumer with the content of the contractual term before the conclusion of the contract, in a manner which, having regard to the means of communication used, affords the consumer a real possibility of becoming acquainted with the content of the term.

A contractual term binds the consumer if the consumer has agreed to it.

A contractual term the content of which the trader has determined in such a way that the consumer is deemed to have agreed to it if he does not expressly state that he does not agree to that term does not bind the consumer.
$en$,
  $sr$Захтев јавности

Члан 43.

Уговорна одредба обавезује потрошача ако је изражена једноставним, јасним и разумљивим језиком и ако би је схватио разуман човек потрошачевог знања и искуства.

Трговац је дужан да са садржајем уговорне одредбе упозна потрошача пре закључења уговора, на начин који с обзиром на употребљено средство комуникације потрошачу пружа стварну могућност да се упозна са садржином одредбе.

Уговорна одредба обавезује потрошача ако је потрошач на њу пристао.

Уговорна одредба чију је садржину одредио трговац тако да се сматра да је потрошач пристао на њу, ако изричито не нагласи да на ту одредбу не пристаје, не обавезује потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 44. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '44',
  NULL,
  $en$Interpretation of contractual terms

Article 44.

Unclear terms of a contract between a consumer and a trader shall be interpreted in favour of the consumer.
$en$,
  $sr$Тумачење уговорних одредаба

Члан 44.

Нејасне одредбе уговора између потрошача и трговца тумаче се у корист потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 45. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '45',
  NULL,
  $en$Unfair contractual term

Article 45.

Unfair contractual terms are null and void.

An unfair contractual term is any term which, contrary to the principle of conscientiousness and honesty, has as its consequence a significant imbalance in the rights and obligations of the contracting parties to the detriment of the consumer.

The criteria on the basis of which it is determined whether a particular term of a contract is unfair are:

1) the nature of the goods or services to which the contract relates;

2) the circumstances under which the contract was concluded;

3) the other terms of the same contract or of another contract with which the contract is connected;

4) the manner in which agreement on the content of the contract was reached and the manner in which the consumer was informed of the content of the contract.
$en$,
  $sr$Неправична уговорна одредба

Члан 45.

Неправичне уговорне одредбе су ништавне.

Неправична уговорна одредба је свака одредба која, противно начелу савесности и поштења, има за последицу значајну несразмеру у правима и обавезама уговорних страна на штету потрошача.

Критеријуми на основу којих се утврђује да ли је одређена одредба уговора неправична су:

1) природа робе или услуга на које се уговор односи;

2) околности под којима је уговор закључен;

3) остале одредбе истог уговора или другог уговора са којим је уговор у вези;

4) начин на који је постигнута сагласност о садржини уговора и начин на који је потрошач обавештен о садржини уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 46. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '46',
  NULL,
  $en$Contractual terms which are deemed to be unfair contractual terms

Article 46.

Contractual terms shall be deemed unfair irrespective of the circumstances of the individual case if they have as their object or consequence:

1) limitation or exclusion of the rights of the consumer against the trader or a third party in the event of total or partial non-performance of a contractual obligation of the trader, including limitation or exclusion of the right of the consumer to set off a claim which he has against the trader against a claim which the trader has against the consumer;

2) exclusion or limitation of the liability of the trader in the event of the death of, or bodily injury to, the consumer resulting from an act or omission of the trader;

3) limitation of the obligation of the trader to perform, that is, to assume, obligations which an agent, that is, a mandatary, undertook in his name or for his account, or linking the obligation of the trader to perform, that is, to assume, obligations which an agent, that is, a mandatary, undertook in his name or for his account with a condition the fulfilment of which depends exclusively on the trader;

4) exclusion or limitation of the right of the consumer to initiate a particular procedure or to use a particular legal remedy for the protection of his rights, and in particular imposing on the consumer an obligation to resolve disputes before arbitration in a manner which is contrary to the provisions of this Law;

5) preventing or restricting the possibility for the consumer to become acquainted with the evidence, or shifting the burden of proof onto the consumer in a case in which the burden of proof lies with the trader, in accordance with the law;

6) determining the territorial jurisdiction of a court outside the domicile, that is, the residence, of the consumer;

7) tacit extension of a contract concluded for a definite period, where the consumer does not make a statement, if the period within which the consumer must state that he does not agree to the extension of the contract is unreasonably short in relation to the period for which the contract was concluded.

A contractual term on the basis of which the trader has the following shall also be deemed an unfair contractual term referred to in paragraph 1 of this Article:

1) the exclusive right to determine whether the goods delivered or the services provided are in accordance with the contract;

2) the exclusive right to interpret contractual terms.
$en$,
  $sr$Уговорне одредбе које се сматрају неправичним уговорним одредбама

Члан 46.

Уговорне одредбе сматрају се неправичним без обзира на околности појединачног случаја ако имају за предмет или последицу:

1) ограничење или искључење права потрошача према трговцу или трећој страни у случају потпуног или делимичног неиспуњења уговорне обавезе трговца, укључујући ограничење или искључење права потрошача да пребије потраживање које има према трговцу са потраживањем које трговац има према потрошачу;

2) искључење или ограничење одговорности трговца за случај смрти или телесних повреда потрошача услед чињења или нечињења трговца;

3) ограничење обавезе трговца да изврши, односно преузме обавезе које је у његово име или за његов рачун преузео пуномоћник, односно налогопримац или повезивање обавезе трговца да изврши, односно преузме обавезе које је у његово име или за његов рачун преузео пуномоћник, односно налогопримац са условом чије испуњење зависи искључиво од трговца;

4) искључење или ограничење права потрошача да покрене одређени поступак или да употреби одређено правно средство за заштиту својих права, а нарочито наметање обавезе потрошачу да спорове решава пред арбитражом на начин који је у супротности са одредбама овог закона;

5) спречавање или ограничавање могућности да се потрошач упозна са доказима или пребацивање терета доказивања на потрошача у случају када је терет доказивања на трговцу, у складу са законом;

6) одређивање месне надлежности суда ван пребивалишта, односно боравишта потрошача;

7) прећутно продужење уговора закљученог на одређено време, када се потрошач не изјасни, ако је рок у ком је потребно да се потрошач изјасни да не пристаје на продужење уговора непримерено кратак у односу на рок на који је уговор закључен.

Неправичном уговорном одредбом из става 1. овог члана сматра се и уговорна одредба на основу које трговац има:

1) искључиво право да утврди да ли су испоручена роба или пружене услуге у складу са уговором;

2) искључиво право тумачења уговорних одредаба.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 47. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '47',
  NULL,
  $en$Contractual terms which are presumed to be unfair contractual terms unless proved otherwise

Article 47.

Contractual terms which are presumed to be unfair contractual terms unless proved otherwise are terms whose object or consequence is:

1) conferring on the trader the authority to retain what he has received from the consumer in the event that the consumer breaches a contractual obligation or refuses to conclude the contract, if the same right is not guaranteed to the consumer;

2) obliging a consumer who has breached a contractual obligation to pay the trader compensation in an amount which significantly exceeds the amount of the damage suffered;

3) the right of the trader to unilaterally terminate the contract at any moment, if the same right is not guaranteed to the consumer;

4) the right of the trader to unilaterally terminate a contract concluded for an indefinite period without allowing a reasonable notice period, except in the case where the consumer does not perform his contractual obligations;

5) the right of the trader to increase the agreed price, if the right of the consumer to terminate the contract in that case has not been agreed;

6) obliging the consumer to perform all his contractual obligations in the event that the trader does not perform his contractual obligations in full;

7) conferring on the trader the authority to transfer his contractual obligations to a third person without the consent of the consumer;

8) restricting the right of the consumer to resell the goods by restricting the transferability of the commercial guarantee given by the trader;

9) conferring on the trader the authority to unilaterally change the content of contractual terms, including the characteristics of the goods or services;

10) a unilateral change of contractual terms which were communicated to the consumer on a durable data carrier, by communicating new terms with which the consumer has not agreed by means of distance communication.
$en$,
  $sr$Уговорне одредбе за које се претпоставља да су неправичне уговорне одредбе ако се не докаже другачије

Члан 47.

Уговорне одредбе за које се претпоставља да су неправичне уговорне одредбе ако се не докаже другачије су одредбе чији је предмет или последица:

1) давање овлашћења трговцу да задржи оно што је примио од потрошача у случају да потрошач повреди уговорну обавезу или одбије да закључи уговор, ако исто право није гарантовано потрошачу;

2) обавезивање потрошача који је повредио уговорну обавезу да трговцу плати накнаду у износу који значајно премашује износ претрпљене штете;

3) право трговца да једнострано раскине уговор у било ком тренутку, ако исто право није гарантовано потрошачу;

4) право трговца да једнострано раскине уговор закључен на неодређено време без остављања примереног отказног рока, осим у случају ако потрошач не извршава своје уговорне обавезе;

5) право трговца да повећа уговорену цену, ако није уговорено право потрошача да у том случају раскине уговор;

6) обавезивање потрошача да изврши све своје уговорне обавезе у случају да трговац не изврши своје уговорне обавезе у целости;

7) давање овлашћења трговцу да пренесе своје уговорне обавезе на треће лице без сагласности потрошача;

8) ограничавање права потрошача да препрода робу ограничавањем преносивости комерцијалне гаранције коју је дао трговац;

9) давање овлашћења трговцу да једнострано мења садржину уговорних одредаба, укључујући обележја робе или услуга;

10) једнострана измена уговорних одредаба које су потрошачу саопштене на трајном носачу података, саопштавањем нових одредаба са којима се потрошач није сагласио путем средстава комуникације на даљину.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 48. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '48',
  NULL,
  $en$Article 48.

The trader is obliged to hand over to the consumer the goods or a document on the basis of which the goods may be collected, without delay, and at the latest within a period of 30 days from the day of conclusion of the contract, unless something else has been agreed.

The trader is obliged to hand over to the consumer the goods in the quantity and quality which have been agreed.

Where the trader, together with the sale of the goods, offers delivery to an address which the consumer specifies, he is obliged to deliver the goods within the agreed period and in the agreed condition, with a mandatory written confirmation of the release of the goods.

The trader is obliged to write, legibly and clearly, the period for delivery of the goods on the invoice or another document concerning the contract.

Proper delivery of the goods to an address which the consumer specifies shall not be deemed to have been effected by leaving the goods in front of the door of the consumer's house or apartment or at some other place.
$en$,
  $sr$Члан 48.

Tрговац је дужан да потрошачу преда робу или исправу на основу које се роба може преузети, без одлагања, а најкасније у року од 30 дана од дана закључења уговора, ако није нешто друго уговорено.

Tрговац је дужан да потрошачу преда робу у количини и квалитету који су уговорени.

Када трговац уз продају робе нуди испоруку на адресу коју одреди потрошач, дужан је да робу испоручи у уговореном року и уговореном стању уз обавезну писану потврду о издавању робе.

Трговац је дужан да на рачуну или другој исправи о уговору читљиво и јасно напише рок испоруке робе.

Неће се сматрати да је извршена уредна испорука робе на адресу коју одреди потрошач остављањем робе испред врата куће или стана потрошача или неког другог места.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 49. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '49',
  NULL,
  $en$Article 49.

If the trader makes available to consumers a telephone line for contacts in connection with the conclusion and performance of the contract, he is obliged to ensure that calls are charged at no more than the price of an ordinary call.
$en$,
  $sr$Члан 49.

Уколико трговац омогућава потрошачима телефонску линију за контакте у вези са закључењем и реализацијом уговора, у обавези је да обезбеди да се разговори тарифирају највише по цени редовног позива.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 50. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '50',
  NULL,
  $en$Article 50.

The trader is obliged to hand over to the consumer instructions for use, assembly and other information by which the consumer is acquainted with the properties of the goods, having regard to their nature, properties and purpose, or in accordance with special regulations, in the Serbian language, in a clear and intelligible manner.

The instructions referred to in paragraph 1 of this Article may be drawn up on a separate document, affixed or printed on the goods or their packaging, in the form of a text, a picture or a sketch, as well as in a combination of these forms.
$en$,
  $sr$Члан 50.

Трговац је дужан да потрошачу преда упутство за употребу, монтажу и друге информације којима се потрошач упознаје са својствима робе с обзиром на њену природу, својства, намену или у складу са посебним прописима, на српском језику на јасан и разумљив начин.

Упутство из става 1. овог члана може бити сачињено на посебном писмену, прилепљено или одштампано на роби или њеној амбалажи, у виду текста, слике или скице, као и у комбинацији ових облика.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 51. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '51',
  NULL,
  $en$Article 51.

If the trader does not deliver the goods within the agreed period, and performance of the obligation within that period is an essential element of the contract, or the consumer informed the trader before the conclusion of the contract that delivery on a specified day, that is, within the agreed period, is of essential importance to him, the contract is terminated by operation of law.

In the case referred to in paragraph 1 of this Article, the consumer may maintain the contract if, without delay, he allows an additional period for performance of the contract.

If the trader does not deliver the goods even within the additional period, the contract is terminated by operation of law.

In the event of termination of the contract, the trader is obliged, immediately and at the latest within a period of five days from the day of termination of the contract, to return to the consumer the entire amount paid on the basis of the contract.
$en$,
  $sr$Члан 51.

Ако трговац не испоручи робу у уговореном року, а испуњење обавезе у том року је битан елемент уговора или је потрошач обавестио трговца пре закључења уговора да је испорука на одређени дан, то јест у уговореном року од суштинског значаја за њега, уговор се раскида по самом закону.

У случају из става 1. овог члана потрошач може одржати уговор ако без одлагања остави накнадни рок за испуњење уговора.

Ако трговац ни у накнадном року не испоручи робу, уговор се раскида по самом закону.

У случају раскида уговора, трговац је дужан да одмах, а најкасније у року од пет дана од дана раскида уговора врати потрошачу целокупан износ плаћен по основу уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 52. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '52',
  NULL,
  $en$Article 52.

The risk of accidental loss of or damage to the goods until the moment of handing over of the goods to the consumer or to a third person designated by the consumer who is not a carrier or a consignor shall be borne by the trader.

The risk of accidental loss of or damage to the goods after the moment of handing over of the goods to the consumer or to a third person designated by the consumer who is not a carrier or a consignor shall be borne by the consumer.

If the consumer has terminated the contract or has requested replacement of the goods because the goods handed over to him are not in conformity with the contract, the risk referred to in paragraphs 1 and 2 of this Article does not pass to the consumer.

If the handing over of the goods has not been effected because the consumer, or a third person designated by the consumer who is not a carrier or a consignor, refuses without a justified reason to accept the goods or by his behaviour prevents delivery, the risk referred to in paragraphs 1 and 2 of this Article passes to the consumer upon the expiry of the period for delivery or within a period of 30 days from the day of conclusion of the contract, if a period for delivery has not been agreed.
$en$,
  $sr$Члан 52.

Ризик случајне пропасти или оштећења робе до тренутка предаје робе потрошачу или трећем лицу које је одредио потрошач, а које није превозник или отпремник, сноси трговац.

Ризик случајне пропасти или оштећења робе после тренутка предаје робе потрошачу или трећем лицу које је одредио потрошач, а које није превозник или отпремник, сноси потрошач.

Ако је потрошач раскинуо уговор или тражио замену робе због тога што роба која му је предата није саобразна уговору, ризик из ст. 1. и 2. овог члана не прелази на потрошача.

Ако предаја робе није извршена због тога што потрошач или треће лице које је одредио потрошач, а које није превозник или отпремник, без основаног разлога одбија да прими робу или својим понашањем спречава испоруку, ризик из ст. 1. и 2. овог члана прелази на потрошача истеком рока за испоруку или у року од 30 дана од дана закључења уговора, ако рок испоруке није уговорен.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 53. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '53',
  NULL,
  $en$Article 53.

The trader is obliged to deliver goods which are in conformity with the contract. Goods shall be deemed to be in conformity with the contract if they meet the subjective and objective requirements laid down by this Article, where applicable, if they have been correctly installed, and if there are no rights of a third party which exclude, reduce or restrict the consumer's right, of the existence of which the consumer has not been informed, nor has he consented thereto.

The subjective requirements for conformity are those agreed in the contract, so that, where applicable, the goods must:

1) correspond to the description, type, quantity and quality, and possess the functionality, compatibility, interoperability and other characteristics in accordance with the sales contract;

2) be fit for any particular purpose for which the consumer requires them and of which the consumer informed the trader at the latest at the time of the conclusion of the sales contract, and in respect of which the trader has given his acceptance;

3) be delivered with all accessories and instructions, including installation instructions and user support, as stipulated by the sales contract; and

4) be delivered with updates as stipulated by the sales contract.

The objective requirements for conformity are that the goods:

1) have the properties necessary for the ordinary use of goods of the same type in accordance with regulations or technical standards or, if there are no such technical standards, the applicable code of conduct in the sector concerned;

2) where applicable, correspond to the quality and the description of a sample or a model which the trader showed to the consumer before the conclusion of the contract;

3) where applicable, be delivered together with accessories, including packaging, installation instructions or other instructions, the receipt of which the consumer may reasonably expect;

4) correspond to the quantity and possess the quality and other characteristics, including those relating to durability, functionality, compatibility and security, which are usual for goods of the same type and which the consumer may reasonably expect given the nature of the goods and taking into account a public statement made by the trader or another person in the supply chain, including the producer, or made on their behalf, in particular if the promise was made by means of an advertisement or by labeling of the goods.

A public statement referred to in paragraph 3, point 4) of this Article does not bind the trader if:

1) he did not know or could not have known of the public statement made, or

2) by the time of the conclusion of the contract the public statement has been modified in the same or a comparable manner as when it was made, or

3) the public statement made could not have influenced the consumer's decision to conclude the contract.
$en$,
  $sr$Члан 53.

Tрговац је дужан да испоручи робу која је саобразна уговору. Сматраће се да је роба саобразна уговору ако испуњава субјективне и објективне захтеве утврђене овим чланом, тамо где је примењиво, ако је правилно уграђена и ако не постоје права трећег које искључује, умањује или ограничава право потрошача, а о чијем постојању потрошач није обавештен, нити је на то пристао.

Субјективни захтеви за саобразност су уговорени, тако да тамо где је примењиво, роба мора да:

1) одговара опису, врсти, количини и квалитету као и да поседује функционалност, компатибилност, интероперабилност и друге карактеристике у складу са уговором о продаји;

2) буде подесна за сваку посебну намену за коју је потрошачу потребна и o којој је потрошач обавестио трговца најкасније у време закључења уговора о продаји и у односу на коју је трговац дао пристанак;

3) буде испоручена са свом додатном опремом и упутствима, укључујући упутства за инсталацију и корисничку подршку, како је утврђено уговором о продаји; и

4) буде испоручена са ажурирањима како је утврђено уговором о продаји.

Објективни захтеви за саобразност су да роба:

1) има својства потребна за редовну употребу робе исте врсте у складу са прописима или техничким стандардима или, ако таквих техничких стандарда нема, примењивим кодексом понашања у односном сектору;

2) ако је примењиво, одговара квалитету и опису узорка односно модела који је трговац показао потрошачу пре закључења уговора;

3) ако је примењиво, буде испоручена заједно са додатном опремом, укључујући амбалажу, упутством за инсталацију или другим упутством, чији пријем потрошач може разумно да очекује;

4) одговара количини и поседује квалитет и друге карактеристике, укључујући оне које се односе на трајност, функционалност, компатибилност и безбедност, које су уобичајене за робу исте врсте и које потрошач може разумно да очекује с обзиром на природу робе и узимајући у обзир јавно дату изјаву које је дао трговац или друго лице у ланцу испоруке укључујући произвођача, или које су дате у њихово име, нарочито ако је обећање учињено путем огласа или означавањем робе.

Трговца не обавезује јавно дата изјава из става 3. тачка 4) овог члана ако:

1) није знао или није могао знати за дату јавну изјаву или

2) је до тренутка закључења уговора јавна изјава измењена на исти или упоредив начин као и кад је дата или

3) дата јавна изјава није моглa утицати на одлуку потрошача да закључи уговор.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 54. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '54',
  NULL,
  $en$Article 54.

In contracts for the sale of goods with digital elements in which a single supply of digital content or a digital service is provided for, the trader is obliged to inform the consumer of updates, including security updates, which are necessary for the goods to be in conformity, and to provide him with updates during the period in which the consumer may reasonably expect them, having regard to the type and purpose of the goods and of the digital elements, and taking into account the circumstances and nature of the sales contract.

The trader's obligation to provide updates under paragraph 1 of this Article, in a sales contract which provides for a continuous supply of digital content or a digital service for a period longer than two years, lasts until the expiry of the period for which the supply was agreed, and in contracts in which continuous supply was agreed for two years or less, the trader's obligation to provide updates lasts for two years from the moment of the passing of the risk.

If the consumer does not, within a reasonable period of time, install the updates supplied in accordance with paragraphs 1 and 2 of this Article, the trader is not liable for a lack of conformity which results solely from the failure to install the updates if:

1) he has informed the consumer of the availability of the update and of the consequences of the omission of the update, and

2) the consumer's failure to install the update, or the incorrect installation of the update by the consumer, is not a consequence of defects in the instructions which were supplied to the consumer.
$en$,
  $sr$Члан 54.

У уговорима о продаји робе са дигиталним елементима у којима је предвиђена једнократна испорука дигиталног садржаја или дигиталне услуге, трговац је дужан да обавести потрошача о ажурирањима, укључујући сигурносна ажурирања, која су потребна да роба буде саобразна, као и да му обезбеди ажурирања током периода у ком их потрошач може разумно очекивати с обзиром на врсту и сврху робе и дигиталних елемената а узимајући у обзир околности и природу уговора о продаји.

Обавеза трговца о обезбеђивању ажурирања из става 1. овог члана код уговора о продаји којим је предвиђенa континуирана испорука дигиталног садржаја или дигиталне услуге на рок дужи од две године траје до истека рока за који је договорена испорука, а код којих је континуирана испорука договорена на две године и краће, обавеза трговца о обезбеђивању ажурирања траје две године од тренутка преласка ризика.

Ако потрошач у разумном временском року не инсталира ажурирања достављена у складу са ст. 1. и 2. овог члана, трговац није одговоран за несаобразност која произилази искључиво из пропуштања инсталације ажурирања ако:

1) је обавестио потрошача о доступности ажурирања и последицама пропуштања ажурирања и

2) пропуст потрошача да инсталира ажурирање или погрешна инсталација ажурирања од стране потрошача нису последица недостатака у упутству које је достављено потрошачу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 55. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '55',
  NULL,
  $en$Article 55.

The trader is liable for a lack of conformity of the delivered goods with the contract if:

1) it existed at the moment of delivery to the consumer, regardless of whether the trader knew of that lack of conformity;

2) it appeared after delivery to the consumer and originates from a cause which existed before the delivery;

3) the consumer could easily have noticed it, if the trader has declared that the goods are in conformity with the contract.

The trader is also liable for a lack of conformity arising as a result of incorrect installation if:

1) the installation forms part of the sales contract and was carried out by the trader or was carried out under the trader's responsibility, or

2) goods which were intended to be installed by the consumer have been incorrectly installed by the consumer, and the incorrect installation is a consequence of a defect in the instructions supplied by the trader or, in the case of goods with digital elements, which were supplied by the trader or by the trader of the digital content or of the digital service.

The trader is not liable for a lack of conformity if, at the time of the conclusion of the sales contract, the consumer was specifically informed that the goods do not meet the objective requirements regarding conformity within the meaning of Article 53, paragraph 3, and Article 54 of this Law, and if the consumer expressly agreed to that specific statement.

The trader's liability for a lack of conformity of the goods with the contract may not be limited or excluded contrary to the provisions of this Law.

A contractual provision by which the trader's liability for a lack of conformity is limited or excluded is null and void.
$en$,
  $sr$Члан 55.

Трговац одговара за несаобразност испоручене робе уговору ако:

1) је постојала у часу испоруке потрошачу, без обзира на то да ли је за ту несаобразност трговац знао;

2) се појавила после испоруке потрошачу и потиче од узрока који је постојао пре испоруке;

3) је потрошач могао лако уочити, уколико је трговац изјавио да је роба саобразна уговору.

Трговац је одговоран и за несаобразност насталу услед неправилне инсталације ако:

1) инсталација чини део уговора о продаји, извршио ју је трговац или је извршена на одговорност трговца или

2) је роба за коју је било предвиђено да је инсталира потрошач неправилно инсталирана од стране потрошача, а неправилна инсталација је последица недостатка у упутству које је доставио трговац или, у случају робе са дигиталним елементима, које је доставио трговац или трговац дигиталног садржаја или дигиталне услуге.

Трговац не одговара за несаобразност ако је у тренутку закључења уговора о продаји потрошач био посебно обавештен да роба не испуњава објективне захтеве у погледу саобразности у смислу члана 53. став 3. и члана 54. овог закона и ако се потрошач са тим посебном изјавом изричито сагласио.

Одговорност трговца за несаобразност робе уговору не сме бити ограничена или искључена супротно одредбама овог закона.

Уговорна одредба којом се ограничава или искључује одговорност трговца за несаобразност је ништава.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 56. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '56',
  NULL,
  $en$Article 56.

If the goods delivered are not in conformity with the contract, the consumer who has informed the trader of the lack of conformity has the right to require the trader to remedy the lack of conformity, free of charge, by repair or replacement, or to require an appropriate reduction of the price, or to terminate the contract in respect of those goods.

The consumer has the right to choose between repair or replacement as the manner of remedying the lack of conformity of the goods.

The trader may refuse to remedy the lack of conformity of the goods by repair or replacement if repair or replacement is not possible or constitutes a disproportionate burden on the trader, having regard to all the circumstances of the particular case, including those set out in paragraph 4, points 1) and 2) of this Article.

A disproportionate burden on the trader, within the meaning of paragraph 3 of this Article, arises if, in comparison with a reduction of the price and termination of the contract, it creates excessive costs, taking into account:

1) the value which the goods would have had if they had been in conformity with the contract;

2) the significance of conformity in the particular case;

3) whether the lack of conformity can be remedied by a particular remedy without significant inconvenience to the consumer.

The consumer has the right to require replacement, an appropriate reduction of the price, or to terminate the contract on account of the same or another defect of conformity which appears after the first repair, and a repeated repair is possible only with the express consent of the consumer.

Taking into account the nature of the goods and the purpose for which the consumer acquired them, the repair or replacement must be carried out within an appropriate period from the moment the trader was informed of the lack of conformity, and without significant inconvenience to the consumer.

If the lack of conformity appears within 30 days from the day of delivery of the goods to the consumer, the consumer has the right to choose between a request that the lack of conformity be remedied by replacement, an appropriate reduction of the price, or a declaration that he terminates the contract.

The consumer is obliged, for the purpose of repair or replacement, to make the goods available to the trader. The trader is obliged to take back the replaced goods. Remedying the lack of conformity is free of charge for the consumer. All costs which are necessary in order for the goods to become in conformity with the contract, and in particular the costs of labor, materials, delivery of the replacement goods and taking back of the replaced goods, are borne by the trader.

The consumer may not terminate the contract if the lack of conformity of the goods is minor. The burden of proving that the lack of conformity of the goods is minor lies with the trader.

The consumer is not obliged to pay the remaining amount of the price until the trader remedies the lack of conformity within the meaning of this Article. The consumer is not obliged to pay for the normal use of the replaced goods for the period prior to their replacement.

If non-conforming goods which had been installed in a manner consistent with their nature and purpose before the lack of conformity appeared need to be repaired or replaced, the obligation to remedy the lack of conformity includes the obligation to remove the non-conforming goods and the installation of the repaired goods or the installation of the replacement goods, or the obligation to bear the costs of that removal and of the installation.

The rights under paragraph 1 of this Article do not affect the consumer's right to require from the trader compensation for damage arising from the lack of conformity of the goods, in accordance with the general rules on liability for damage.
$en$,
  $sr$Члан 56.

Ако испоручена роба није саобразна уговору, потрошач који је обавестио трговца о несаобразности има право да захтева од трговца да отклони несаобразност, без накнаде, оправком или заменом или да захтева одговарајуће умањење цене или да раскине уговор у погледу те робе.

Потрошач има право да бира између оправке или замене као начина отклањања несаобразности робе.

Трговац може одбити отклањање несаобразности робе оправком или заменом, ако оправка или замена нису могуће или представљају несразмерно оптерећење за трговца, имајући у виду све околности конкретног случаја укључујући и оне које су наведене у ставу 4. тач. 1) и 2) овог члана.

Несразмерно оптерећење за трговца у смислу става 3. овог члана, јавља се ако у поређењу са умањењем цене и раскидом уговора, ствара претеране трошкове, узимајући у обзир:

1) вредност робе коју би имала да је саобразна уговору;

2) значај саобразности у конкретном случају;

3) да ли се несаобразност може отклонити одређеним правним средством без значајнијих непогодности за потрошача.

Потрошач има право да захтева замену, одговарајуће умањење цене или да раскине уговор због истог или другог недостатка саобразности који се после прве оправке појави, а поновна оправка је могућа само уз изричиту сагласност потрошача.

Узимајући у обзир природу робе и сврху због које је потрошач набавио, оправка или замена мора се извршити у примереном року од тренутка од када је трговац обавештен о несаобразности и без значајних неугодности за потрошача.

Ако се несаобразност појави у року од 30 дана од дана испоруке робе потрошачу, потрошач има право да бира између захтева да се несаобразност отклони заменом, одговарајућим умањењем цене или да изјави да раскида уговор.

Потрошач је дужан да ради оправке или замене стави на располагање робу трговцу. Трговац је дужан да преузме замењену робу. Отклањање несаобразности је бесплатно за потрошача. Све трошкове који су неопходни да би роба постала саобразна уговору, а нарочито трошкове рада, материјала, испоруке замењене робе и преузимања замењене робе, сноси трговац.

Потрошач не може да раскине уговор ако је несаобразност робе незнатна. Терет доказивања да је несаобразност робе незнатна је на трговцу.

Потрошач није дужан да плати преостали износ цене све док трговац не отклони несаобразност у смислу овог члана. Потрошач није дужан да плати за уобичајену употребу замењене робе за период пре њене замене.

Ако је несаобразна роба која је била инсталирана на начин који је у складу са њеном природом и наменом пре него што се несаобразност појавила, потребно поправити или заменити, обавеза отклањања несаобразности укључује обавезу уклањања несаобразне робе и инсталацију поправљене робе или инсталацију заменске робе или обавезу сношења трошкова тог отклањања и инсталације.

Права из става 1. овог члана не утичу на право потрошача да захтева од трговца накнаду штете која потиче од несаобразности робе, у складу са општим правилима о одговорности за штету.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 57. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '57',
  NULL,
  $en$Article 57.

The consumer has the right to require an appropriate reduction of the price or to declare to the trader that he terminates the contract if:

1) the trader has not completed the repair or the replacement, has not remedied the lack of conformity in the manner prescribed by law, or has refused to remedy it;

2) the trader, despite an attempt, has not remedied the lack of conformity;

3) the trader has declared that he will not, or it follows from the circumstances that he will not, remedy the lack of conformity of the goods within a reasonable time or without significant inconvenience to the consumer;

4) the lack of conformity is of such significance as to justify a reduction of the price or termination of the contract.

The consumer has the right to a reduction of the price proportionate to the decrease in the value of the goods which he received, compared with the value which the goods would have had if they had been in conformity at the time of the conclusion of the contract.

The consumer exercises the right to terminate the sales contract by a declaration of will to the trader that he terminates the contract.

Where one contract has several goods as its subject, and only some of them are not in conformity and there is a ground for termination of the contract, the consumer may terminate the contract only in respect of those goods and not the others, or may terminate the contract in its entirety if he cannot reasonably be expected to keep only the goods which are in conformity.

If the consumer terminates the contract in its entirety or only in relation to the non-conforming goods:

1) the consumer returns the goods at the trader's expense, and

2) the trader returns the sale price within three days from the day on which he received the goods, or when he received from the consumer proof that the consumer sent the goods to the trader.
$en$,
  $sr$Члан 57.

Потрошач има право да захтева одговарајуће умањење цене или да изјави трговцу да раскида уговор ако:

1) трговац није довршио оправку или замену, није отклонио несаобразност на законом прописан начин или је одбио да је отклони;

2) трговац и поред покушаја није отклонио несаобразност;

3) трговац изјавио да неће или из околности произилази да неће отклонити несаобразност робе у разумном року или без значајних непогодности за потрошача;

4) је несаобразност знатна да оправдава умањење цене или раскид уговора.

Потрошач има право на умањење цене сразмерно смањењу вредности робе коју је примио која се пореди са вредношћу робе коју би имала да је саобразна у време закључења уговора.

Потрошач остварује право на раскид уговора о продаји изјавом воље трговцу да раскида уговор.

Кад један уговор има за предмет више робе, па је само нека од њих несаобразна и постоји разлог за раскид уговора, потрошач може раскинути уговор само у погледу те робе, а не и остале или може раскинути уговор у целини ако се од њега разумно не може очекивати да задржи само робу која је саобразна.

Ако потрошач раскине уговор у целини или само у односу на несаобразну робу:

1) потрошач враћа робу о трошку трговца, а

2) трговац враћа продајну цену у року од три дана од дана када је примио робу или кад је од потрошача примио доказ да је робу послао трговцу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 58. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '58',
  NULL,
  $en$Article 58.

If, in respect of the thing sold or the service contracted for, there exists a right of a third party which excludes, reduces or restricts the consumer's right, of the existence of which the consumer has not been informed, nor has he consented thereto, the consumer has the rights under Articles 56 and 57 of this Law.

The trader's liability to the consumer for legal defects may not be entirely excluded or limited by contract.
$en$,
  $sr$Члан 58.

Ако на продатој ствари или уговореној услузи постоји неко право трећег које искључује, умањује или ограничава право потрошача, а о чијем постојању потрошач није обавештен, нити је на то пристао, потрошач има права из чл. 56. и 57. овог закона.

Одговорност трговца за правне недостатке према потрошачу се не може уговором сасвим искључити нити ограничити.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 59. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '59',
  NULL,
  $en$Article 59.

The trader is liable for a lack of conformity of the goods with the contract which appears within two years from the day of delivery to the consumer.

Where a contract for the sale of goods with digital elements provides for a continuous supply of digital content or a digital service for a period of two years or less, the trader is liable for a lack of conformity of the digital content or of the digital service which appears or becomes apparent within two years from the day of delivery thereof to the consumer. If the contract provides for continuous supply for a period longer than two years, the trader is liable for a lack of conformity of the digital content or of the digital service which appears or becomes apparent during the period in which the digital content or the digital service was to be supplied under the sales contract.

If a lack of conformity arises within one year from the day of delivery of the goods to the consumer, it shall be presumed that the lack of conformity existed at the time of delivery, unless this is contrary to the nature of the goods and the nature of the particular lack of conformity. The burden of proving that the lack of conformity did not exist is borne by the trader.

In the sale of second-hand goods, a shorter period may be agreed within which the trader is liable for a lack of conformity, which period may not be shorter than one year.

The time limits prescribed in paragraphs 1–3 of this Article do not run during the period which the trader uses to remedy the lack of conformity.

The consumer is obliged to inform the trader of the lack of conformity of the goods within two months from the moment he became aware of the lack of conformity, and at the latest within two years from the day of delivery of the goods to the consumer.
$en$,
  $sr$Члан 59.

Трговац је одговоран за несаобразност робе уговору која се појави у року од две године од дана испоруке потрошачу.

Кад је уговором о продаји робе с дигиталним елементима предвиђена континуирана испорука дигиталног садржаја или дигиталне услуге на период од две године или краће, трговац је одговоран за несаобразност дигиталног садржаја или дигиталне услуге која се појави или постане очигледна у року од две године од дана испоруке истих потрошачу. Ако је уговором предвиђена континуирана испорука на период дужи од две године, трговац је одговоран за несаобразност дигиталног садржаја или дигиталне услуге која се појави или постане очигледна у периоду у којем је дигитални садржај или дигиталну услугу требало испоручивати по уговору о продаји.

Ако несаобразност настане у року од годину дана од дана испоруке робе потрошачу, претпоставља се да је несаобразност постојала у тренутку испоруке, осим ако је то у супротности са природом робе и природом одређене несаобразности. Терет доказивања да није постојала несаобразност сноси трговац.

Код продаје половне робе, може се уговорити краћи рок у коме трговац одговара за несаобразност, који не може бити краћи од једне године.

Рокови прописани у ст. 1–3. овог члана не теку у периоду који трговац користи за отклањање несаобразности.

Потрошач је дужан обавестити трговца о несаобразности робе у року од два месеца од тренутка сазнања за несаобразност а најкасније у року од две године од дана испоруке робе потрошачу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 60. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '60',
  NULL,
  $en$Article 60.

For the obligations of the trader towards the consumer which arise as a result of a lack of conformity of the goods which has occurred by an act or an omission, including by the omission of updates of goods with digital elements, the trader has the right to require the trader in the procurement chain of those goods to reimburse him for what he has performed on the basis of that obligation.
$en$,
  $sr$Члан 60.

За обавезе трговца према потрошачу, које настану услед несаобразности робе до које је дошло чињењем односно пропуштањем, укључујући пропуштањем ажурирања робе са дигиталним елементима, трговац има право да захтева од трговца у ланцу набавке те робе, да му накнади оно што је испунио по основу те обавезе.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 61. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '61',
  NULL,
  $en$Article 61.

If the conditions in the commercial guarantee given are less favourable to the consumer than the conditions given in the advertising, the giver of the commercial guarantee is bound by the conditions given in the advertising, unless, before the conclusion of the contract, the advertising message has been modified in the same or a comparable manner as when it was given.

If the giver of the commercial guarantee of durability of the goods is the producer, he is directly liable to the consumer for remedying the lack of conformity by repair or replacement for the duration of this commercial guarantee, in accordance with the provision of Article 56 of this Law. The producer may offer the consumer more favourable conditions in a statement.

The trader is obliged to provide the consumer with the guarantee certificate in written or electronic form or on another durable data carrier at the latest at the moment of delivery of the goods to the consumer. The guarantee certificate must be written in a simple and intelligible manner and must contain:

1) a clear statement that the consumer has rights under this Law, that he exercises them free of charge, and that the commercial guarantee does not exclude and does not affect the rights of the consumer which arise from the trader's statutory liability for lack of conformity of the goods with the contract;

2) the name and address of the giver of the commercial guarantee;

3) information on the procedure for exercising rights under the commercial guarantee;

4) data by which the goods are identified (model, type, serial number and the like);

5) information on the conditions of validity of the commercial guarantee.

The consumer's consent is required for the issuance of the guarantee certificate in electronic form.

The burden of proving that the guarantee certificate has been handed over to the consumer lies with the trader.

A breach of the obligation of the giver of the commercial guarantee under paragraph 3 of this Article does not affect the validity of the commercial guarantee, and the consumer may require that the commercial guarantee be performed in accordance with the statement given.

The commercial guarantee does not exclude and does not affect the rights of the consumer relating to the conformity of the goods with the contract.
$en$,
  $sr$Члан 61.

Aко су услови у датој комерцијалној гаранцији мање повољни за потрошача од услова датим у оглашавању, давалац комерцијалне гаранције је обавезан условима датим у оглашавању, осим ако је пре склапања уговора огласна порука измењена на исти или упоредив начин као и кад је дата.

Ако је давалац комерцијалне гаранције за трајност робе произвођач, одговоран је директно потрошачу за отклањање несаобразности оправком или заменом за време трајања ове комерцијалне гаранције у складу са одредбом члана 56. овог закона. Произвођач може потрошачу у изјави понудити повољније услове.

Трговац је дужан да достави гарантни лист потрошачу у писаном или електронском облику или на другом трајном носачу података најкасније у тренутку испоруке робе потрошачу. Гарантни лист мора бити написан на једноставан и разумљив начин и мора садржати:

1) јасну изјаву да потрошач има права на основу овог закона, да их остварује бесплатно, и да комерцијална гаранција не искључује и не утиче на права потрошача која произлазе из законске одговорности трговца за несаобразност робе уговору;

2) назив и адресу даваоца комерцијалне гаранције;

3) информацију о поступку остваривања права из комерцијалне гаранције;

4) податке којима се идентификује роба (модел, тип, серијски број и сл.);

5) информацију о условима важења комерцијалне гаранције.

За издавање гарантног листа у електронском облику потребна је сагласност потрошача.

Терет доказивања да је гарантни лист предат потрошачу је на трговцу.

На пуноважност комерцијалне гаранције не утиче повреда обавезе даваоца комерцијалне гаранције из става 3. овог члана и потрошач може да захтева да се комерцијална гаранција испуни у складу са датом изјавом.

Комерцијална гаранција не искључује и не утиче на права потрошача у вези са саобразношћу робе уговору.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 62. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '62',
  NULL,
  $en$Article 62.

When concluding a contract for the sale of goods and in advertising in connection with the sale, the trader is obliged to refrain from using the expression "commercial guarantee" and expressions with that meaning if, on the basis of the sales contract, the consumer does not acquire more rights than those arising from the trader's statutory liability for lack of conformity of the goods with the contract or other rights in accordance with this Law.
$en$,
  $sr$Члан 62.

При закључењу уговора о продаји робе и оглашавању поводом продаје, трговац је дужан да се уздржи од употребе израза „комерцијална гаранција” и израза с тим значењем, ако по основу уговора о продаји потрошач не стиче више права него из законске одговорности трговца за несаобразност робе уговору или других права у складу са овим законом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 63. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '63',
  NULL,
  $en$4. Complaint

Article 63.

The consumer may lodge a complaint with the trader in order to exercise his rights under Articles 56 and 102 of this Law, as well as on account of an incorrectly calculated price and other defects.

The consumer may lodge a complaint with the trader in order to exercise his rights under Article 61 of this Law within the period for which the trader's liability on the basis of lack of conformity is provided, and after the expiry of that period the complaint is lodged with the issuer of the commercial guarantee. If the giver of the commercial guarantee is the producer, the consumer may lodge a complaint with the producer on the basis of the commercial guarantee given, during the period of its validity.

The trader is obliged to receive a complaint which has been lodged. It is prohibited for the trader to charge for determining the lack of conformity.

The trader is obliged, at the point of sale and on the website (in the case of distance selling), to visibly display a notice on the manner and place of receipt of complaints, and to ensure the presence of a person authorised to receive complaints during working hours.

The consumer may lodge a complaint orally at the point of sale where the goods were purchased or at another place designated for the receipt of complaints, by telephone, in writing, by electronic means or on a durable data carrier, accompanied by the production of the invoice for inspection or of other proof of purchase (a copy of the invoice, a slip and the like).

The trader is obliged to keep a record of complaints received and to retain it for at least two years from the day of submission of the consumer's complaints. When processing the consumer's personal data, the trader acts in accordance with the regulations governing the protection of personal data.

The trader is obliged, without delay, to issue to the consumer a written confirmation, or to confirm by electronic means the receipt of the complaint, that is, to communicate the number under which his complaint has been entered in the record of complaints received.

The record of complaints received is kept in the form of a bound book or in electronic form and contains in particular the name and surname of the person lodging the complaint and the date of receipt of the complaint, data on the goods, a brief description of the lack of conformity and the request contained in the complaint, the date of issuance of the confirmation of receipt of the complaint, the decision on the response to the consumer, the date of service of that decision, the agreed appropriate period for resolution to which the consumer has consented, the manner and the date of resolution of the complaint, as well as information on the extension of the period for resolving the complaint.

The trader is obliged, without delay, and at the latest within a period of eight days from the day of receipt of the complaint, to respond to the consumer in writing or by electronic means to the complaint lodged. The trader's response to the consumer's complaint must contain a decision on whether he accepts the complaint, a statement of reasons if he does not accept the complaint, a statement of position on the consumer's request concerning the manner of resolution, and a specific proposal as to the period within which and the manner in which he will resolve the complaint if he accepts it. The period for resolving the complaint may not be longer than 15 days, or 30 days for technical goods and furniture, from the day of submission of the complaint.

The trader is obliged to act in accordance with the decision and the proposal for resolving the complaint if he has obtained the consumer's prior consent. The period for resolving the complaint is suspended when the consumer receives the trader's response under paragraph 9 of this Article and resumes running when the trader receives the consumer's statement of position. The consumer is obliged to state his position on the trader's response at the latest within a period of three days from the day of receipt of the trader's response. The trader is obliged, in the response to the complaint, expressly to inform the consumer of the obligation to state his position, of the consequences of failure to observe that time limit, and of the suspension of the time limits. If the consumer does not state his position within the prescribed period, he shall be deemed not to have agreed to the trader's proposal under paragraph 9 of this Article.

If, for objective reasons, the trader is unable to comply with the consumer's request within the prescribed period, he is obliged to inform the consumer of the extension of the period for resolving the complaint and to state the period within which he will resolve it, as well as to obtain the consumer's consent, which he is obliged to enter in the record of complaints received. An extension of the period for resolving complaints is possible only once.

If the trader rejects the complaint, he is obliged to inform the consumer of the possibility of resolving the dispute out of court and of the bodies competent for the out-of-court resolution of consumer disputes.

The consumer's inability to deliver the packaging of the goods to the trader may not be a condition for resolving the complaint, nor a reason for refusing to remedy the lack of conformity.

If the trader resolves an orally lodged complaint in accordance with the consumer's request at the time of its lodging, he is not obliged to act in the manner provided for in paragraphs 7 and 9 of this Article.
$en$,
  $sr$4. Рекламација

Члан 63.

Потрошач може да изјави рекламацију трговцу ради остваривања својих права из чл. 56. и 102. овог закона, као и због погрешно обрачунате цене и других недостатака.

Потрошач може да изјави рекламацију трговцу ради остваривања својих права из члана 61. овог закона у року у коме је предвиђена одговорност трговца по основу несаобразности, а после истека тог рока рекламација се изјављује издаваоцу комерцијалне гаранције. Ако је давалац комерцијалне гаранције произвођач, потрошач може да изјави рекламацију произвођачу по основу дате комерцијалне гаранције током временског периода важности исте.

Трговац је дужан да прими изјављену рекламацију. Забрањено је да трговац наплаћује утврђивање несаобразности.

Tрговац је дужан да на продајном месту и интернет страници (у случају даљинске трговине) видно истакне обавештење о начину и месту пријема рекламација, као и да обезбеди присуство лица овлашћеног за пријем рекламација у току радног времена.

Потрошач може да изјави рекламацију усмено на продајном месту где је роба купљена или на другом месту које је одређено за пријем рекламација, телефоном, писаним путем, електронским путем или на трајном носачу података, уз достављање рачуна на увид или другог доказа о куповини (копија рачуна, слип и сл.).

Tрговац је дужан да води евиденцију примљених рекламација и да је чува најмање две године од дана подношења рекламација потрошача. Приликом обраде података о личности потрошача, трговац поступа у складу са прописима којима се уређује заштита података о личности.

Трговац је дужан да потрошачу без одлагања изда писану потврду или електронским путем потврди пријем рекламације, односно саопшти број под којим је заведена његова рекламација у евиденцији примљених рекламација.

Евиденција о примљеним рекламацијама води се у облику укоричене књиге или у електронском облику и садржи нарочито име и презиме подносиоца и датум пријема рекламације, податке о роби, кратком опису несаобразности и захтеву из рекламације, датуму издавања потврде о пријему рекламације, одлуци о одговору потрошачу, датуму достављања те одлуке, уговореном примереном року за решавање на који се сагласио потрошач, начину и датуму решавања рекламације, као и информације о продужавању рока за решавање рекламације.

Трговац је дужан да без одлагања, а најкасније у року од осам дана од дана пријема рекламације, писаним или електронским путем одговори потрошачу на изјављену рекламацију. Oдговор трговца на рекламацију потрошача мора да садржи одлуку да ли прихвата рекламацију, образложење ако не прихвата рекламацију, изјашњење о захтеву потрошача о начину решавања и конкретан предлог у ком року ће и како решити рекламацију уколико је прихвата. Рок за решавање рекламације не може да буде дужи од 15 дана, односно 30 дана за техничку робу и намештај, од дана подношења рекламације.

Трговац је дужан да поступи у складу са одлуком и предлогом за решавање рекламације, уколико је добио претходну сагласност потрошача. Рок за решавање рекламације застаје када потрошач прими одговор трговца из става 9. овог члана и наставља да тече када трговац прими изјашњење потрошача. Потрошач је дужан да се изјасни на одговор трговца најкасније у року од три дана од дана пријема одговора трговца. Трговац је дужан да у одговору на рекламацију изричито обавести потрошача о обавези изјашњења, последицама пропуштања тог рока и о застоју рокова. Уколико се потрошач у прописаном року не изјасни, сматраће се да није сагласан са предлогом трговца из става 9. овог члана.

Уколико трговац из објективних разлога није у могућности да удовољи захтеву потрошача у прописаном року, дужан је да о продужавању рока за решавање рекламације обавести потрошача и наведе рок у коме ће је решити, као и да добије његову сагласност, што је у обавези да евидентира у евиденцији примљених рекламација. Продужавање рока за решавање рекламација могуће је само једном.

Уколико трговац одбије рекламацију, дужан је да потрошача обавести о могућности решавања спора вансудским путем и о надлежним телима за вансудско решавање потрошачких спорова.

Немогућност потрошача да достави трговцу амбалажу робе не може бити услов за решавање рекламације, ни разлог за одбијање отклањања несаобразности.

Уколико трговац усмено изјављену рекламацију реши у складу са захтевом потрошача приликом њеног изјављивања, није дужан да поступи на начин предвиђен ст. 7. и 9. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 64. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '64',
  NULL,
  $en$Liability for safety

Article 64.

Goods and services on the market which consumers use, or in respect of which there is a possibility that consumers use them, must be safe, in accordance with the regulations governing product safety.

Traders who place goods and services into circulation on the market which consumers use or will probably use are obliged to fulfil the product safety requirements laid down by special regulations.
$en$,
  $sr$Одговорност за безбедност

Члан 64.

Роба и услуге на тржишту које користе или постоји могућност да их користе потрошачи, морају да буду безбедни, у складу са прописима којима се уређује безбедност производа.

Трговци који стављају робу и услуге у промет на тржиште, а које потрошачи користе или ће их вероватно користити, дужни су да испуњавају захтеве за безбедност производа одређене посебним прописима.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 65. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '65',
  NULL,
  $en$Procedures in the event of endangerment of consumer rights

Article 65.

In the case of the existence of a well-founded suspicion that the consumer's right to safety has been endangered, that is, that the protection of consumers from goods and services which are dangerous to life, health, property or the environment, or from goods the possession or use of which is prohibited, has been endangered, the provisions of the law governing inspection supervision which relate to joint or extraordinary inspection supervisions shall apply.
$en$,
  $sr$Поступци у случају угрожавања права потрошача

Члан 65.

У случају постојања основане сумње да је угрожено право потрошача на безбедност, односно да је угрожена заштита потрошача од роба и услуга које су опасне по живот, здравље, имовину или животну средину, или робе чије је поседовање или употреба забрањена, примењиваће се одредбе закона којим се уређује инспекцијски надзор које се односе на заједничке или ванредне инспекцијске надзоре.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 66. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '66',
  NULL,
  $en$Defect

Article 66.

A defect exists if the product does not provide the safety which a person is entitled to expect, taking into account all the circumstances, including advertising, the use of the product which could reasonably have been expected, and the time when the product was put into circulation.

A product shall not be considered to have a defect solely on the ground that a product of better quality has subsequently been put into circulation.
$en$,
  $sr$Недостатак

Члан 66.

Недостатак постоји ако производ не обезбеђује сигурност која се с правом очекује с обзиром на све околности, укључујући оглашавање, употребу производа која се разумно могла очекивати и време када је производ стављен у промет.

Не сматра се да производ има недостатак искључиво на основу тога што је касније стављен у промет квалитетнији производ.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 67. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '67',
  NULL,
  $en$Right to compensation for damage

Article 67.

The injured person has the right to compensation for damage if he proves that he has suffered damage, that the product had a defect, and that there is a causal link between that defect and the damage caused.

The injured person has the right to compensation for non-pecuniary damage in accordance with the general rules on liability for damage.
$en$,
  $sr$Право на накнаду штете

Члан 67.

Оштећени има право на накнаду штете ако докаже да је претрпео штету, да је производ имао недостатак и да постоји узрочна веза између тог недостатка и проузроковане штете.

Оштећени има право на накнаду неимовинске штете према општим правилима о одговорности за штету.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 68. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '68',
  NULL,
  $en$Liability of the producer

Article 68.

The producer is liable for damage arising from a product with a defect regardless of whether he knew of the defect.
$en$,
  $sr$Одговорност произвођача

Члан 68.

Произвођач одговара за штету насталу од производа са недостатком без обзира на то да ли је знао за недостатак.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 69. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '69',
  NULL,
  $en$Exemption from liability

Article 69.

The producer is not liable for damage from a product with a defect if he proves that:

1) he did not put the product into circulation;

2) the defect did not exist at the time when he put the product into circulation, or that it appeared later;

3) he did not produce the product intended for sale or for another form of putting into circulation, and that the product was not produced within the scope of his activity;

4) the defect arose as a result of bringing the properties of the product into conformity with regulations adopted by the competent authority.

The producer of a component part of the product shall not be liable for damage from a product with a defect if he proves that the defect can be attributed to the design of the product or that it is a consequence of instructions given by the producer.

The producer may be partially or completely exempted from liability for damage from a product with a defect if the injured person, or a person for whom he is responsible, has by his fault contributed to the occurrence of the damage.

If a third person has partially contributed to the occurrence of damage from a product with a defect, the producer alone is liable.
$en$,
  $sr$Ослобађање од одговорности

Члан 69.

Произвођач није одговоран за штету од производа са недостатком ако докаже да:

1) није ставио производ у промет;

2) недостатак није постојао у време када је ставио производ у промет или да се појавио касније;

3) није произвео производ намењен продаји или другој врсти стављања у промет и да производ није произведен у оквиру његове делатности;

4) је недостатак настао услед усаглашавања својстава производа са прописима које је донео надлежни орган.

Произвођач саставног дела производа неће бити одговоран за штету од производа са недостатком ако докаже да се недостатак може приписати дизајну производа или да је последица упутства датог од стране произвођача.

Произвођач се може делимично или потпуно ослободити одговорности за штету од производа са недостатком ако је оштећени или лице за које је он одговоран својом кривицом допринео настанку штете.

Ако је настанку штете од производа са недостатком делимично допринело треће лице, искључиво је одговоран произвођач.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 70. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '70',
  NULL,
  $en$Liability of several persons for the same damage

Article 70.

If several persons are liable for damage from a product with a defect, their liability is joint and several.
$en$,
  $sr$Одговорност више лица за исту штету

Члан 70.

Ако је више лица одговорно за штету од производа са недостатком, њихова одговорност је солидарна.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 71. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '71',
  NULL,
  $en$Limitation of the claim

Article 71.

The claim for compensation for damage from a product with a defect becomes time-barred upon the expiry of a period of three years from the day on which the injured person learned of the damage, the defect and the identity of the producer.

The claim under paragraph 1 of this Article in any case becomes time-barred upon the expiry of a period of ten years from the day on which the producer put the product with a defect into circulation.
$en$,
  $sr$Застарелост потраживања

Члан 71.

Потраживање накнаде штете од производа са недостатком застарева истеком рока од три године од дана када је оштећени дознао за штету, недостатак и идентитет произвођача.

Потраживање из става 1. овог члана у сваком случају застарева истеком рока од десет година од дана кад је произвођач ставио у промет производ са недостатком.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 72. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '72',
  NULL,
  $en$Limitation and exclusion of liability

Article 72.

The producer's liability for damage from a product with a defect may neither be limited nor excluded by contract.
$en$,
  $sr$Ограничење и искључење одговорности

Члан 72.

Одговорност произвођача за штету од производа са недостатком не може се уговором ограничити ни искључити.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 73. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '73',
  NULL,
  $en$Delivery

Article 73.

The trader is obliged to deliver digital content or a digital service to the consumer without delay, immediately after the conclusion of the contract, unless something else has been agreed.

The trader shall be deemed to have effected proper delivery when:

1) the digital content, or any means which enables access to the digital content or the downloading thereof, has been placed at the disposal of or made accessible to the consumer, or to a physical or virtual device which the consumer has chosen for that purpose;

2) the digital service has been made accessible to the consumer or to a physical or virtual device which the consumer has chosen for that purpose.
$en$,
  $sr$Испорука

Члан 73.

Трговац је дужан да потрошачу испоручи дигитални садржај или дигиталну услугу без одлагања, одмах након закључења уговора, ако није нешто друго уговорено.

Сматраће се да је трговац извршио уредну испоруку када:

1) су дигитални садржај или било које средство које омогућава приступ дигиталном садржају или његово преузимање стављени на располагање или учињени доступним потрошачу или физичком или виртуелном уређају који је потрошач одабрао у ту сврху;

2) је дигитална услуга учињена доступном потрошачу или физичком или виртуелном уређају који је потрошач одабрао у ту сврху.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 74. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '74',
  NULL,
  $en$Conformity of digital content or a digital service

Article 74.

The trader is obliged to supply digital content or a digital service which is in conformity with the contract.

It shall be deemed that they are in conformity with the contract if they meet the subjective and objective requirements laid down by this Article.

The subjective requirements are, where applicable, that the digital content or the digital service:

1) corresponds to the description, quantity and quality, and possesses the functionality, compatibility, interoperability and other characteristics in accordance with the contract;

2) is fit for a particular purpose for which the consumer requires it and of which the consumer informed the trader at the latest at the time of the conclusion of the contract, and in respect of which the trader has given acceptance;

3) is supplied with all accessories and instructions, including installation instructions and user support, as stipulated by the contract;

4) is supplied with updates as stipulated by the contract.

The objective requirements are that the digital content or the digital service:

1) has the properties necessary for the ordinary use of the same type, in accordance with regulations or technical standards or, if there are no such technical standards, the applicable code of conduct in the sector concerned;

2) corresponds to a trial version or a preview of the digital content or the digital service which the trader made available to the consumer before the conclusion of the contract;

3) where applicable, is supplied together with accessories and instructions the receipt of which the consumer may reasonably expect;

4) corresponds to the quantity and possesses the quality and other characteristics, including those relating to functionality, accessibility, compatibility, continuity and security, which are usual for digital content or a digital service of the same type and which the consumer may reasonably expect given the nature of the digital content or the digital service and taking into account a public statement made by the trader or another person in the supply chain, or which were made on their behalf, in particular if the statement was made by means of an advertisement or by labelling.

A publicly made statement referred to in paragraph 4, point 4) of this Article does not bind the trader if he proves that:

1) he did not know, or could not have known, of the statement made, or

2) if, by the time of the conclusion of the contract, the public statement has been modified in the same or a comparable manner, or

3) the public statement made could not have influenced the consumer's decision to conclude the contract.

The trader undertakes to inform the consumer of updates, including security updates, which are necessary in order for the digital content or the digital service to be in conformity, and to supply them during the period:

1) during which the digital content or the digital service must be supplied in accordance with the contract, if the contract provides for continuous supply during a specified period, or

2) during which the consumer may reasonably expect them, having regard to the type and purpose of the digital content and the digital service and taking into account the circumstances and nature of the contract, if the contract provides for a single supply or a series of individual supplies.

If the consumer does not, within a reasonable period, install the updates supplied in accordance with paragraph 5 of this Article, the trader is not liable for a lack of conformity which results solely from the failure to install the updates if:

1) he has informed the consumer of the availability of the update and of the consequences of the failure to install the update, and

2) the consumer's failure to install the update, or the incorrect installation of the update by the consumer, is not a consequence of defects in the instructions which were supplied to the consumer.

If the contract provides for continuous supply of digital content or a digital service during a specified period of time, that digital content or digital service must be in conformity during the agreed period of time.

There is no lack of conformity within the meaning of paragraphs 4 and 6 of this Article if, at the time of the conclusion of the contract, the consumer was informed that a particular characteristic of the digital content and the digital service deviates from the objective requirements for conformity under paragraphs 4 and 6 of this Article, and if the consumer expressly accepted that deviation by a separate instrument when concluding the contract.

If the contracting parties do not agree otherwise, the digital service and the digital content shall be supplied in the latest version which was available at the time of the conclusion of the contract.
$en$,
  $sr$Саобразност дигиталног садржаја или дигиталне услуге

Члан 74.

Трговац је дужан да испоручи дигитални садржај или дигиталну услугу који су саобразни уговору.

Сматраће се да су саобразни уговору ако испуњавају субјективне и објективне захтеве утврђене овим чланом.

Субјективни захтеви су, тамо где је примењиво, да дигитални садржај или дигитална услуга:

1) одговара опису, количини, квалитету и да поседује функционалност, компатибилност, интероперабилност и друге карактеристике у складу са уговором;

2) буде подесан за посебну намену за коју је потрошачу потребан и o којој је потрошач обавестио трговца најкасније у време закључења уговора, и у односу на коју је трговац дао пристанак;

3) испоручи се са свом додатном опремом и упутствима, укључујући упутства за инсталацију и корисничком подршком, како је утврђено уговором;

4) испоручи се са ажурирањима како је утврђено уговором.

Објективни захтеви су да дигитални садржај или дигитална услуга:

1) има својства потребна за редовну употребу исте врсте у складу са прописима или техничким стандардима или, ако таквих техничких стандарда нема, примењивим кодексом понашања у односном сектору;

2) одговара тестној верзији или претпрегледу дигиталног садржаја или дигиталне услуге који је трговац ставио на располагање потрошачу пре закључења уговора;

3) ако је примењиво, буду испоручени заједно са додатном опремом и упутством чији пријем потрошач може разумно да очекује;

4) одговара количини и поседује квалитет и друге карактеристике, укључујући оне које се односе на функционалност, доступност, компатибилност, континуитет и безбедност, које су уобичајени за дигитални садржај или дигиталну услугу исте врсте и које потрошач може разумно да очекује с обзиром на природу дигиталног садржаја или дигиталне услуге и узимајући у обзир јавно дату изјаву коју је дао трговац или друго лице у ланцу испоруке или које су дате у њихово име, нарочито ако је изјава дата путем огласа или означавањем.

Трговца не обавезује јавно дата изјава из става 4. тачка 4) овог члана ако докаже да:

1) није знао или није могао знати за дату изјаву или

2) ако је до тренутка закључења уговора јавна изјава измењена на исти или упоредив начин или

3) дата јавна изјава није могла утицати на одлуку потрошача да закључи уговор.

Трговац се обавезује да потрошача обавести о ажурирањима, укључујући безбедносна ажурирања, која су потребна како би дигитални садржај или дигитална услуга били саобразни и да их испоручи у периоду:

1) током ког се дигитални садржај или дигитална услуга морају испоручивати у складу са уговором, ако је уговором предвиђена континуирана испорука током одређеног периода, или

2) током ког потрошач то може разумно очекивати с обзиром на врсту и сврху дигиталног садржаја и дигиталне услуге и узимајући у обзир околности и природу уговора, ако је уговором предвиђена једнократна испорука или низ појединачних испорука.

Ако потрошач у разумном року не инсталира ажурирања достављена у складу са ставом 5. овог члана, трговац није одговоран за несаобразност која произилази искључиво из пропуштања инсталације ажурирања ако:

1) је обавестио потрошача о доступности ажурирања и последицама пропуштања ажурирања и

2) пропуст потрошача да инсталира ажурирање или погрешна инсталација ажурирања од стране потрошача нису последица недостатака у упутству које је достављено потрошачу.

Ако је уговором предвиђена континуирана испорука дигиталног садржаја или дигиталне услуге током одређеног временског периода, тај дигитални садржај или дигитална услуга морају бити саобразни током уговореног временског периода.

Несаобразност у смислу ст. 4. и 6. овог члана не постоји ако је у тренутку закључења уговора потрошач био обавештен да одређена карактеристика дигиталног садржаја и дигиталне услуге одступа од објективних захтева за саобразност из ст. 4. и 6. овог члана и ако је потрошач изричито, посебном исправом прихватио то одступање приликом закључења уговора.

Ако се уговорне стране не договоре другачије, дигитална услуга и дигитални садржај испоручују се у најновијој верзији која је била доступна у тренутку закључења уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 75. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '75',
  NULL,
  $en$Incorrect integration of digital content or a digital service

Article 75.

The trader is liable for a lack of conformity of the digital content and the digital service arising as a result of incorrect integration into the digital environment if:

1) the integration was carried out by the trader, or

2) the integration was carried out by the consumer and the incorrect integration is a consequence of a defect in the instructions for integration supplied by the trader.
$en$,
  $sr$Неправилна интеграција дигиталног садржаја или дигиталне услуге

Члан 75.

Трговац је одговоран за несаобразност дигиталног садржаја и дигиталне услуге насталу услед неправилне интеграције у дигитално окружење ако је:

1) интеграцију извршио трговац или

2) интеграцију извршио потрошач а неправилна интеграција је последица недостатка у упутству за интеграцију коју је доставио трговац.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 76. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '76',
  NULL,
  $en$Rights of a third party

Article 76.

If the consumer is restricted or prevented from using the digital content or the digital service because of a right of a third party, in particular an intellectual property right, the consumer has the right to require the lack of conformity to be remedied in accordance with Article 80 of this Law, unless the contract is null and void or voidable.
$en$,
  $sr$Права трећег

Члан 76.

Ако је потрошач ограничен или онемогућен да користи дигитални садржај или дигиталну услугу због права трећег, нарочито права интелектуалне својине, потрошач има право да захтева отклањање несаобразности у складу са чланом 80. овог закона, осим ако је уговор ништав или рушљив.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 77. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '77',
  NULL,
  $en$Liability of the trader

Article 77.

The trader is obliged to carry out the supply in accordance with Article 73 of this Law.

If the contract provides for a single supply or a series of individual supplies, the trader is liable for the supply of the digital content or the digital service in accordance with Articles 74 and 75 of this Law, without prejudice to Article 74, paragraph 4, point 2) of this Law.

If the contract provides for a single supply or a series of individual supplies, the trader is liable for a lack of conformity of the digital content or the digital service which appears within a period of two years from the moment of supply, without prejudice to Article 74, paragraph 4, point 2) of this Law.

If the contract provides for continuous supply during a specified period, the trader is liable for a lack of conformity of the digital content or the digital service which appears or becomes apparent during the period of time within which it is supplied in accordance with the contract.
$en$,
  $sr$Одговорност трговца

Члан 77.

Трговац је дужан да изврши испоруку у складу са чланом 73. овог закона.

Ако је уговором предвиђена једнократна испорука или низ појединачних испорука, трговац је одговоран за испоруку дигиталног садржаја или дигиталне услуге у складу са чл. 74. и 75. овог закона, не доводећи у питање члан 74. став 4. тачку 2) овог закона.

Ако је уговором предвиђена једнократна испорука или низ појединачних испорука, трговац је одговоран за несаобразност дигиталног садржаја или дигиталне услуге која се појави у року од две године од тренутка испоруке, не доводећи у питање члан 74. став 4. тачку 2) овог закона.

Ако је уговором предвиђена континуирана испорука током одређеног периода, трговац је одговоран за несаобразност дигиталног садржаја или дигиталне услуге која се појави или постане очигледна током временског периода у оквиру ког се испоручује у складу са уговором.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 78. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '78',
  NULL,
  $en$Burden of proof

Article 78.

The burden of proving that the digital content or the digital service was supplied in accordance with Article 73 of this Law is borne by the trader.

If the contract provides for a single supply or a series of individual supplies, the trader bears the burden of proving that the digital content or the digital service was in conformity at the time of supply, within a period of one year from the supply.

If the contract provides for continuous supply, the trader bears the burden of proving that the digital content or the digital service is in conformity during the period of time within which it is supplied in accordance with the contract.

The trader does not bear the burden of proof under paragraphs 2 and 3 of this Article if he proves that the consumer's digital environment is not compatible with the technical requirements for the digital content or the digital service, and if he informed the consumer, in a clear and intelligible manner, of those technical requirements before the conclusion of the contract.

The consumer is obliged to cooperate with the trader to the extent to which this is necessary and possible in order to establish whether the cause of the lack of conformity of the digital content or the digital service is the consumer's digital environment. Cooperation is limited to the technically available means which least burden the consumer.

If the consumer acts contrary to paragraph 5 of this Article, and the trader, in a clear and intelligible manner, before the conclusion of the contract, informed him of the technical requirements for the digital content or the digital service, the burden of proving that the digital content or the digital service was in conformity at the time of supply is borne by the consumer.
$en$,
  $sr$Терет доказивања

Члан 78.

Терет доказивања да су дигитални садржај или дигитална услуга испоручени у складу са чланом 73. овог закона сноси трговац.

Ако је уговором предвиђена једнократна испорука или низ појединачних испорука, трговац сноси терет доказивања да су дигитални садржај или дигитална услуга саобразни у тренутку испоруке у року од годину дана од испоруке.

Ако је уговором предвиђена континуирана испорука, трговац сноси терет доказивања да су дигитални садржај или дигитална услуга саобразни током временског периода у оквиру ког се испоручују у складу са уговором.

Трговац не сноси терет доказивања из ст. 2. и 3. овог члана, ако докаже да дигитално окружење потрошача није компатибилно са техничким захтевима за дигитални садржај или дигиталну услугу и ако је на јасан и разумљив начин обавестио потрошача о наведеним техничким захтевима пре закључења уговора.

Потрошач је дужан да сарађује са трговцем у мери у којој је то потребно и могуће да би се утврдило да ли је узрок несаобразности дигиталног садржаја или дигиталне услуге, дигитално окружење потрошача. Сарадња је ограничена на технички доступна средства која најмање оптерећују потрошача.

Ако потрошач поступи супротно ставу 5. овог члана, а трговац га је на јасан и разумљив начин пре закључења уговора, обавестио о техничким захтевима за дигитални садржај или дигиталну услугу, терет доказивања да су дигитални садржај или дигитална услуга саобразни у тренутку испоруке сноси потрошач.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 79. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '79',
  NULL,
  $en$Rights of the consumer in the event of failure to supply

Article 79.

If the trader has not supplied the digital content or the digital service in accordance with Article 73 of this Law, the consumer shall allow the trader an additional period for supply.

If the trader does not, even within the additional period, supply the digital content or the digital service without delay, or within the period of time which the contracting parties have expressly agreed, the consumer has the right to terminate the contract.

Except in the case referred to in paragraph 1 of this Article, the consumer may terminate the contract without allowing an additional period for supply if:

1) the trader has declared that he will not supply the digital content or the digital service, or this follows from the circumstances of the case;

2) it follows from the agreement of the consumer and the trader, or from the circumstances of the contract, that the time for performance is an essential element of the contract, and the trader does not supply the digital content or the digital service by that moment or at that moment.

In the event of termination of the contract under paragraphs 2 and 3 of this Article, the provisions of this Law which regulate the consequences of termination of a contract the subject of which is the supply of digital content and a digital service shall apply.
$en$,
  $sr$Права потрошача у случају неиспоруке

Члан 79.

Ако трговац није испоручио дигитални садржај или дигиталну услугу у складу са чланом 73. овог закона, потрошач ће оставити трговцу накнадни рок за испоруку.

Ако трговац ни у накнадном року не испоручи дигитални садржај или дигиталну услугу без одлагања или у временском периоду које су уговорне стране изричито договориле, потрошач има право да раскине уговор.

Осим у случају из става 1. овог члана, потрошач може раскинути уговор без остављања накнадног рока за испоруку ако:

1) је трговац изјавио да неће испоручити дигитални садржај или дигиталну услугу или то произилази из околности случаја;

2) из договора потрошача и трговца или из околности уговора произилази да је рок испуњења битан елемент уговора, а трговац не испоручи дигитални садржај или дигиталну услугу до тог тренутка или у том тренутку.

У случају раскида уговора из ст. 2. и 3. овог члана, примењују се одредбе овог закона којим су регулисане последице раскида уговора који за предмет имају испоруку дигиталног садржаја и дигиталне услуге.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 80. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '80',
  NULL,
  $en$Rights of the consumer in the event of a lack of conformity

Article 80.

If the digital content or the digital service supplied is not in conformity with the contract, the consumer has the right to have it brought into conformity, to an appropriate reduction of the price, or to termination of the contract.

The consumer has the right to have the digital content or the digital service brought into conformity, unless that would be impossible or would constitute a disproportionate burden for the trader, taking into account all the circumstances of the individual case, including:

1) the value which the digital content or the digital service would have had if the lack of conformity did not exist, and

2) the significance of the lack of conformity.

The trader is obliged to bring the digital content or the digital service into conformity within the meaning of paragraph 2 of this Article within an appropriate period from the moment when the consumer informed him of the lack of conformity, free of charge and without significant inconvenience to the consumer, taking into account the nature of that digital content or that digital service and the purpose for which the consumer acquired it.

The consumer has the right either to a proportionate reduction of the price or to termination of the contract in the following cases, if:

1) remedying the lack of conformity of the digital content or the digital service is not possible or is disproportionate in accordance with paragraph 2 of this Article;

2) the trader has not brought the digital content or the digital service into conformity in accordance with paragraph 3 of this Article;

3) a lack of conformity exists despite the trader's attempt to bring the digital content or the digital service into conformity;

4) it is obvious from the circumstances of the particular case that the lack of conformity is so serious that a reduction of the price or termination of the contract is justified;

5) the trader has declared, or it is obvious from the circumstances of the particular case, that he will not remedy the lack of conformity of the digital content or the digital service within a reasonable time or without significant inconvenience to the consumer.

The reduction of the price is proportionate to the decrease in the value of the digital content or the digital service which was supplied to the consumer, in comparison with the value which the digital content or the digital service would have had if it had been in conformity.

If it has been agreed that the digital content or the digital service is to be supplied over a specified period of time, the reduction of the price applies to the period during which the digital content or the digital service was not in conformity.

If a specified price is paid for the supply of the digital content or the digital service, the consumer may not terminate the contract if the lack of conformity is minor. The burden of proving that the lack of conformity is minor is borne by the trader.

If the supply of the digital content or the digital service is effected in exchange for the consumer's personal data, the consumer may terminate the contract even when the non-conformity is slight.
$en$,
  $sr$Права потрошача у случају несаобразности

Члан 80.

Ако испоручени дигитални садржај или дигитална услуга нису саобразни уговору, потрошач има право на усклађивање, одговарајуће умањење цене или на раскид уговора.

Потрошач има право на усклађивање дигиталног садржаја или дигиталне услуге, осим ако би то било немогуће или представљало несразмено оптерећење за трговца, узимајући у обзир све околности појединачног случаја, укључујући:

1) вредност коју би дигитални садржај или дигитална услуга имали да не постоји несаобразност и

2) значај несаобразности.

Трговац има обавезу да усклади дигитални садржај или дигиталну услугу у смислу става 2. овог члана у примереном року од тренутка када га је потрошач обавестио о несаобразности, бесплатно и без значајних неугодности за потрошача, узимајући у обзир природу тог дигиталног садржаја или те дигиталне услуге и сврхе због које је потрошач набавио.

Потрошач има право или на сразмерно умањење цене или на раскид уговора у следећим случајевима, ако:

1) отклањање несаобразности дигиталног садржаја или дигиталне услуге није могуће или је несразмерно у складу са ставом 2. овог члана;

2) трговац није ускладио дигитални садржај или дигиталну услугу у складу са ставом 3. овог члана;

3) несаобразност постоји упркос покушају трговца да усклади дигитални садржај или дигиталну услугу;

4) из околности конкретног случаја је очигледно да је несаобразност тако озбиљна да су умањење цене или раскид уговора оправдани;

5) трговац је изјавио или је из околности конкретног случаја очигледно да неће отклонити несаобразност дигиталног садржаја или дигиталне услуге у разумном року или без значајних неугодности за потрошача.

Умањење цене сразмерно је смањењу вредности дигиталног садржаја или дигиталне услуге који су испоручени потрошачу у поређењу са вредношћу коју би дигитални садржај или дигитална услуга имали да су саобразни.

Ако је уговорено да се дигитални садржај или дигитална услуга испоручују у одређеном временском периоду, умањење цене примењује се на период током којег дигитални садржај или дигитална услуга нису били саобразни.

Ако се за испоруку дигиталног садржаја или дигиталне услуге плаћа одређена цена, потрошач не може раскинути уговор ако је несаобразност незнатна. Терет доказивања да је несаобразност незнатна сноси трговац.

Ако се испорука дигиталног садржаја или дигиталне услуге врши у замену за податке о личности потрошача, потрошач може раскинути уговор чак и када је неусаглашеност мала.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 81. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '81',
  NULL,
  $en$Termination of the contract

Article 81.

The consumer terminates the contract by a simple declaration that he terminates the contract.

Termination of the part of the contract which relates to one element of a package of contracts does not affect the validity of the contract which relates to the other elements, unless the performance of all elements of the package of contracts was the reason for concluding the contract, as to which the consumer makes a declaration.
$en$,
  $sr$Раскид уговора

Члан 81.

Потрошач раскида уговор простом изјавом да раскида уговор.

Раскид дела уговора који се односи на један елемент из пакета уговора не утиче на пуноважност уговора који се односи на друге елементе, осим ако испуњење свих елемената пакета уговора није био разлог закључења уговора о чему се изјашњава потрошач.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 82. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '82',
  NULL,
  $en$Obligations of the trader in the event of termination of the contract

Article 82.

In the event of termination of the contract, the trader is obliged to reimburse the payments which he has received from the consumer.

Where the contract provides for the supply of digital content or a digital service over a certain period of time and an agreed price, and the digital content and the digital service were in conformity during a certain period of time prior to the termination of the contract, the trader is obliged to reimburse to the consumer the proportionate part of the price which corresponds to the period of time during which the digital content or the digital service were not in conformity, and the part of the price which the consumer paid in advance for the period of time which would have remained had the contract not been terminated.

When processing the consumer's personal data, the trader shall act in accordance with the regulations governing the protection of personal data.

The trader may not use any content which does not relate to the consumer's personal data, and which the consumer provided or created when using the digital content or the digital service supplied by the trader, except if:

1) such content is not useful outside the context of the digital content or the digital service supplied by the trader,

2) such content relates only to the consumer's activity when using the digital content or the digital service supplied by the trader,

3) the trader has aggregated such content with other data and cannot separate it from them, or such separation would constitute a disproportionate burden, or

4) such content was jointly produced by the consumer and third persons, and other consumers may continue to use it.

Except in the case referred to in paragraph 4, points 1–3) of this Article, the trader shall, at the consumer's request, make available any content which does not include personal data, and which the consumer provided or created when using the digital content or the digital service supplied by the trader.

The consumer has the right to retrieve that digital content free of charge, without hindrance by the trader, within a reasonable time and in a commonly used machine-readable format.

The trader may prevent the consumer from continuing to use the digital content or the digital service, in particular by making the digital content or the digital service inaccessible to the consumer or by deactivating the consumer's user account, without prejudice to paragraph 5 of this Article.
$en$,
  $sr$Обавезе трговца у случају раскида уговора

Члан 82.

У случају раскида уговора трговац је дужан да изврши повраћај уплата које је примио од потрошача.

У случају када је уговором предвиђена испорука дигиталног садржаја или дигиталне услуге у одређеном временском периоду и уговорена цена, а дигитални садржај и дигитална услуга су били саобразни током одређеног временског периода пре раскида уговора, трговац је дужан да потрошачу изврши повраћај сразмерног дела цене који одговара временском раздобљу током ког су дигитални садржај или дигитална услуга били несаобразни и дела цене који је потрошач платио унапред за временски период који би преостао да уговор није раскинут.

Приликом обраде податaка о личности потрошача, трговац поступа у складу са прописима којима се уређује заштита података о личности.

Трговац не сме да користи било какав садржај који се не односи на податке о личности потрошача, а које је потрошач пружио или створио при коришћењу дигиталног садржаја или дигиталне услуге које испоручује трговац, осим ако:

1) такав садржај није користан ван контекста дигиталног садржаја или дигиталне услуге које испоручује трговац,

2) такав садржај се односи само на активност потрошача при коришћењу дигиталног садржаја или дигиталне услуге које испоручује трговац,

3) је трговац објединио такав садржај са другим подацима и не може га од њих раздвојити, или би такво раздвајање представљало несразмерно оптерећење, или

4) такав садржај су заједнички произвели потрошач и трећа лица, те га други потрошачи могу наставити употребљавати.

Осим у случају из става 4. тач. 1–3) овог члана, трговац на захтев потрошача ставља на располагање сваки садржај који не подразумева податке о личности, а који је потрошач пружио или створио при коришћењу дигиталног садржаја или дигиталне услуге које испоручује трговац.

Потрошач има право да преузме тај дигитални садржај бесплатно, без ометања од стране трговца, у разумном року и машински читљивом формату који се уобичајено употребљава.

Трговац може спречити потрошача да настави да употребљава дигитални садржај или дигиталну услугу, нарочито да потрошачу онемогући приступ дигиталном садржају или дигиталној услузи или угаси кориснички налог потрошача, не доводећи у питање став 5. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 83. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '83',
  NULL,
  $en$Obligations of the consumer in the event of termination of the contract

Article 83.

After termination of the contract, the consumer may not use the digital content or the digital service and may not make them available to third persons.

If the digital content has been supplied on a durable data carrier, the consumer shall, at the request and at the expense of the trader, return it to the trader without delay.

The trader shall submit the request referred to in paragraph 2 of this Article within a period of 14 days from the day on which he was informed of the consumer's decision to terminate the contract.

The consumer is not obliged to pay for the use of the digital content or the digital service for the time which preceded the termination of the contract, during which time the digital content or the digital service were not in conformity.
$en$,
  $sr$Обавезе потрошача у случају раскида уговора

Члан 83.

Потрошач након раскида уговора не сме користити дигитални садржај или дигиталну услугу и не сме их ставити на располагање трећим лицима.

Ако је дигитални садржај испоручен на трајном носачу података, потрошач га на захтев и о трошку трговца, без одлагања враћа трговцу.

Трговац подноси захтев из става 2. овог члана у року од 14 дана од дана када је обавештен о одлуци потрошача да раскине уговор.

Потрошач није дужан да плати употребу дигиталног садржаја или дигиталне услуге за време које је претходило раскиду уговора за које време су дигитални садржај или дигитална услуга били несаобразни.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 84. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '84',
  NULL,
  $en$Time limits and the manner in which the trader returns what has been paid

Article 84.

The trader is obliged, without delay, and at the latest within a period of 14 days from the day on which the consumer informed him of the request for a reduction of the price or of the termination of the contract, to return to the consumer every amount within the meaning of Article 80, paragraphs 4–6 of this Law or of Article 82, paragraphs 1 and 2 of this Law, on account of the reduction of the price or the termination of the contract.

The trader is obliged to reimburse the amount paid by using the same means of payment which the consumer used in the original transaction, unless the consumer has expressly agreed to the use of another means of payment and provided that the consumer does not bear any costs as a result of such reimbursement.

It is prohibited for the trader to charge a fee for carrying out the reimbursement of the amount paid.
$en$,
  $sr$Рокови и начин на који трговац враћа плаћено

Члан 84.

Трговац је дужан да без одлагања, а најкасније у року од 14 дана од дана када га је потрошач обавестио о захтеву за умањење цене или раскиду уговора, врати потрошачу сваки износ у смислу члана 80. ст. 4–6. овог закона или члана 82. ст. 1. и 2. овог закона због умањења цене или раскида уговора.

Трговац је дужан да изврши повраћај плаћеног износа користећи иста средства плаћања која је потрошач користио у првобитној трансакцији, осим ако се потрошач није изричито сагласио са коришћењем другог средства плаћања и под условом да потрошач због таквог повраћаја не сноси никакве трошкове.

Забрањено је да трговац обрачунава накнаду за извршени повраћај плаћеног износа.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 85. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '85',
  NULL,
  $en$Modification of digital content or a digital service

Article 85.

Where the contract provides that digital content or a digital service is to be supplied or made available to the consumer over a certain period of time, the trader may modify the digital content or the digital service beyond what is necessary in order for the digital content or the digital service to meet the requirements of Article 74 of this Law, subject to the following conditions:

1) that the contract provides for such a modification and that a justified reason for the modification is stated,

2) that the modification is carried out without additional costs for the consumer,

3) that the consumer is informed of the modification in a clear and intelligible manner, and

4) in the case referred to in paragraph 2 of this Article, that the consumer is informed, within a reasonable period before the modification, on a durable data carrier, of the characteristics, the time of the modification and of the right to terminate the contract in accordance with paragraph 2 of this Article or of the possibility of retaining the digital content or the digital service without the modification in accordance with paragraph 5 of this Article.

The consumer may terminate the contract if the modification adversely affects the consumer's access to or use of the digital content or the digital service, unless the adverse effect is insignificant. In that case, the consumer may terminate the contract free of charge within a period of 30 days from the day of receipt of the notice of the intended modification or from the day on which the trader modified the digital content or the digital service, depending on which occurred later.

If the consumer terminates the contract in accordance with paragraph 2 of this Article, the provisions of this Law governing the right to terminate a contract for the supply of digital content or a digital service shall apply accordingly.

If the trader has enabled the consumer to retain, without additional costs, the digital content or the digital service without the modification, and they remain in conformity, paragraphs 2 and 3 of this Article shall not apply.

The provisions of paragraphs 1–4 of this Article shall not apply if the subject matter of the contract is a package which includes the supply of digital content or a digital service and an internet access service or an interpersonal communications service based on the use of numbering, within the meaning of the law governing electronic communications.
$en$,
  $sr$Измена дигиталног садржаја или дигиталне услуге

Члан 85.

Ако је уговором предвиђено да се дигитални садржај или дигитална услуга испоручују или чине доступним потрошачу током одређеног временског периода, трговац може изменити дигитални садржај или дигиталну услугу ван оквира онога што је потребно да би дигитални садржај или дигитална услуга одговарали захтевима из члана 74. овог закона, под следећим условима:

1) да је уговором предвиђена таква измена и да је наведен оправдани разлог за измену,

2) да је измена извршена без додатних трошкова за потрошача,

3) да је потрошач о измени обавештен на јасан и разумљив начин и

4) у случају из става 2. овог члана да је потрошач у примереном року пре измене на трајном носачу података обавештен о карактеристикама, тренутку измене и о праву на раскид уговора у складу са ставом 2. овог члана или о могућности задржавања дигиталног садржаја или дигиталне услуге без измене у складу са ставом 5. овог члана.

Потрошач може да раскине уговор ако се изменом негативно утиче на приступ или коришћење потрошача дигиталном садржају или дигиталној услузи, осим ако је негативан утицај незнатан. У том случају, потрошач може бесплатно раскинути уговор у року од 30 дана од дана пријема обавештења о намераваној измени или од дана када је трговац изменио дигитални садржај или дигиталну услугу, у зависности од тога шта је наступило касније.

Ако потрошач раскине уговор у складу са ставом 2. овог члана, на одговарајући начин примениће се одредбе овог закона којима се регулише право на раскид уговора о испоруци дигиталног садржаја или дигиталне услуге.

Ако је трговац омогућио потрошачу да без додатних трошкова задржи дигитални садржај или дигиталну услугу без измене, а исти су и даље саобразни, неће се применити ст. 2. и 3. овог члана.

Одредбе ст. 1–4. овог члана неће се применити ако је предмет уговора пакет који укључује испоруку дигиталног садржаја или дигиталне услуге и услугу приступа интернету или комуникациону услугу између лица засновану на коришћењу нумерације у смислу закона којим се уређују електронске комуникације.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 86. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '86',
  NULL,
  $en$Right of redress

Article 86.

For the obligations of the trader towards the consumer which arise as a result of non-supply or lack of conformity of the digital content or the digital service, the trader has the right to require a person in the procurement chain to reimburse him for what he has performed on the basis of that obligation.
$en$,
  $sr$Право на регрес

Члан 86.

За обавезе трговца према потрошачу, које настану услед неиспоруке или несаобразности дигиталног садржаја или дигиталне услуге, трговац има право да захтева од лица у ланцу набавке, да му накнади оно што је испунио по основу те обавезе.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 87. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '87',
  NULL,
  $en$Quality of the material

Article 87.

If it has been agreed that the trader is to make a thing from his own material the quality of which has not been agreed, he is obliged to use material of medium quality for the making.

The provisions of Articles 53–62 of this Law shall apply accordingly to the trader's liability for the quality of the material used.
$en$,
  $sr$Квалитет материјала

Члан 87.

Ако је уговорено да трговац изради ствар од сопственог материјала чији квалитет није уговорен, дужан је да за израду употреби материјал средњег квалитета.

На одговорност трговца за квалитет употребљеног материјала сходно се примењују одредбе чл. 53–62. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 88. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '88',
  NULL,
  $en$Material handed over by the consumer

Article 88.

The trader is liable for damage resulting from defects in the material which he noticed or ought to have noticed, if he fails to warn the consumer of the defects in the material which he received from him.

If the consumer requires a thing to be made from material of the defects of which the trader has warned him, the trader is obliged to act upon the consumer's request, except if it is obvious that the material is not suitable for the work ordered or that making a thing from such material may harm the trader's reputation, in which case the trader may terminate the contract.

The trader is obliged to warn the consumer of defects in his order, as well as of other circumstances which he knew or ought to have known, which may be of significance for the work ordered or for its timely performance, and if he fails to do so, he is liable for damage.
$en$,
  $sr$Материјал који је предао потрошач

Члан 88.

Трговац је одговоран за штету од недостатака материјала које је приметио или је требало да примети, ако пропусти да упозори потрошача на недостатке у материјалу који је добио од њега.

Ако потрошач захтева израду ствари од материјала на чије недостатке га је трговац упозорио, трговац је дужан да поступи по захтеву потрошача, изузев ако је очигледно да материјал није подобан за наручени посао или да израда ствари од таквог материјала може да нашкоди угледу трговца, у ком случају трговац може раскинути уговор.

Трговац је дужан да упозори потрошача на недостатке у његовом налогу, као и на друге околности које је знао или је требало да зна, које могу бити од значаја за наручени посао или за његово благовремено извршење, а ако то не учини, одговара за штету.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 89. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '89',
  NULL,
  $en$Service performed

Article 89.

A service shall be deemed to have been performed when the agreed work has been completed.

If the thing which is the subject of the contractual obligation is with the trader, the service shall be deemed to have been performed when the agreed work has been completed and the thing has been returned to the consumer.

If a period for performance of the service has not been agreed, the trader is obliged to perform the service within a reasonable period which is necessary for the performance of a similar service.

The trader is not liable for delay which arises through the consumer's fault.
$en$,
  $sr$Извршена услуга

Члан 89.

Услуга се сматра извршеном када је уговорени посао окончан.

Ако се ствар која је предмет уговорне обавезе налази код трговца, услуга се сматра извршеном када је уговорени посао окончан и ствар враћена потрошачу.

Ако рок извршења услуге није уговорен, трговац је дужан да услугу изврши у примереном року који је потребан за извршење сличне услуге.

Трговац није одговоран за доцњу која настане потрошачевом кривицом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 90. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '90',
  NULL,
  $en$Provision of the service

Article 90.

The trader is obliged to procure the material and spare parts which are necessary for the performance of the service, if it has not been otherwise agreed.

The trader is obliged to perform the service in the agreed manner, in accordance with the rules of the profession and with professional diligence.
$en$,
  $sr$Пружање услуге

Члан 90.

Трговац је дужан да прибави материјал и резервне делове који су потребни за извршење услуге, ако није другачије уговорено.

Трговац је дужан да услугу изврши на уговорени начин, по правилима струке и са професионалном пажњом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 91. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '91',
  NULL,
  $en$Entrusting the performance of the service to a third person

Article 91.

The trader may entrust the performance of the service to a third person if nothing else follows from the contract or from the nature of the work.

In the case referred to in paragraph 1 of this Article, the trader is liable for the performance and the conformity of the service.
$en$,
  $sr$Поверавање извршења услуге трећем лицу

Члан 91.

Трговац може да повери извршење услуге трећем лицу ако из уговора или природе посла не произлази нешто друго.

У случају из става 1. овог члана, трговац је одговоран за извршење и саобразност услуге.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 92. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '92',
  NULL,
  $en$Performance of additional works

Article 92.

The trader is obliged to obtain the consumer's consent for the performance of additional work if, in the course of providing the service, a need for additional work arises.

The trader may perform the additional work, if he cannot obtain the consumer's consent to the additional work within a reasonable period, only if its price is insignificant in relation to the agreed price of the service, that is, the estimate.

If the contract determines a maximum price for the performance of the service, and it is not possible to obtain the consumer's consent for the performance of the additional work within a reasonable period, the price may not be increased on account of the costs of performing the additional work.

The trader is obliged to inform the consumer of the danger which delaying the performance of the additional work poses to health and property.
$en$,
  $sr$Обављање додатних радова

Члан 92.

Трговац је дужан да прибави сагласност потрошача за обављање додатног рада, ако се приликом пружања услуге укаже потреба за додатним радом.

Трговац може да обави додатни рад, ако не може да прибави сагласност потрошача о додатном раду у примереном року, само ако је његова цена незнатна у односу на уговорену цену услуге, односно прорачун.

Ако је уговором одређена највиша цена извршења услуге, а није могуће прибавити сагласност потрошача за обављање додатног рада у примереном року, цена се не може повећати због трошкова извршења додатног рада.

Трговац је дужан да обавести потрошача о опасности одлагања извршења додатног рада по здравље и имовину.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 93. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '93',
  NULL,
  $en$Control

Article 93.

The trader is obliged to enable the consumer to:

1) control the performance of the work;

2) give instructions when that corresponds to the nature of the work.

In the event that the trader does not comply with the obligations under paragraph 1 of this Article, the service provided shall be deemed not to be in conformity with the contract.
$en$,
  $sr$Контрола

Члан 93.

Трговац је дужан да омогући потрошачу да:

1) контролише обављање посла;

2) даје упутства кад то одговара природи посла.

У случају да се трговац не придржава обавеза из става 1. овог члана, сматра се да пружена услуга није саобразна уговору.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 94. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '94',
  NULL,
  $en$Obligation to inform

Article 94.

If, at the time of or after the conclusion of the contract, it is established that, having regard to the price, the value and other characteristics of the service or other circumstances, the service obviously does not correspond to the consumer's needs or that its price is significantly higher than the amount which the consumer could reasonably have expected, the trader is obliged to inform the consumer of that without delay.

If the trader cannot inform the consumer of the facts referred to in paragraph 1 of this Article within a reasonable period, or if the consumer does not give the trader the necessary instructions, the trader must suspend performance of the service, unless it may justifiably be presumed that the consumer intends performance of the service to continue.

In the event that the trader does not comply with the obligations under paragraphs 1 and 2 of this Article, the service provided shall be deemed not to be in conformity with the agreed service.
$en$,
  $sr$Обавеза обавештавања

Члан 94.

Ако се приликом или након закључења уговора утврди да с обзиром на цену, вредност и друга обележја услуге или друге околности, услуга очигледно не одговара потребама потрошача или да је њена цена значајно виша од износа који је потрошач могао разумно да очекује, трговац је дужан да без одлагања обавести потрошача о томе.

Ако трговац не може о чињеницама из става 1. овог члана да обавести потрошача у примереном року или ако трговцу потрошач не упути неoпходна упутства, трговац мора обуставити вршење услуге, осим ако се основано може претпоставити да потрошач има намеру да се вршење услуге настави.

У случају да се трговац не придржава обавеза из ст. 1. и 2. овог члана, сматра се да пружена услуга није саобразна уговореној услузи.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 95. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '95',
  NULL,
  $en$Price of the service

Article 95.

The trader may require from the consumer a fee for a prior examination of the content or the price of the service which was carried out at the consumer's request, unless the consumer could, having regard to usual practice or similar circumstances, have expected that the prior examination would not be charged.

The trader may not require from the consumer a fee for labor, consumable materials and other costs if the subject of the contractual obligation which was in the trader's possession has been destroyed, damaged or lost without liability of the consumer.
$en$,
  $sr$Цена услуге

Члан 95.

Tрговац може да захтева од потрошача накнаду за претходно испитивање садржине или цене услуге које је спроведено по захтеву потрошача, осим ако је потрошач могао с обзиром на уобичајену праксу или сличне околности да очекује да се претходно испитивање не наплаћује.

Tрговац не може да захтева од потрошача накнаду за рад, потрошни материјал и друге трошкове, ако је предмет уговорне обавезе који је био у поседу трговца уништен, оштећен или изгубљен без одговорности потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 96. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '96',
  NULL,
  $en$Estimate

Article 96.

For the provision of services the value of which is greater than 5,000 dinars, the trader is obliged to draw up an estimate on a durable data carrier with a specification of the service. Before commencing the provision of the service, the trader is obliged to obtain the consumer's written consent to the estimate. The trader is obliged to keep the estimate and the consumer's written consent for one year from the day of performance of the service.

If the price has been agreed on the basis of an express assertion by the trader of the accuracy of the estimate, the trader may not require an increase of the price.

If the price has been agreed without an express assertion by the trader of the accuracy of the estimate, the trader may not require an increase of the price by more than 15% of the estimate, unless otherwise agreed.

The estimate relates to the selling price of the service, unless otherwise agreed.

In the event of a dispute as to whether the agreed amount represents the price or the estimate, the burden of proof is borne by the trader.
$en$,
  $sr$Прорачун

Члан 96.

За пружање услуга чија је вредност већа од 5.000 динара, трговац је дужан да сачини прорачун на трајном носачу података са спецификацијом услуге. Пре отпочињања пружања услуге, трговац је дужан да прибави писану сагласност потрошача на прорачун. Трговац је дужан да прорачун и писану сагласност потрошача чува годину дана од дана извршења услуге.

Ако је цена уговорена на основу изричите тврдње трговца за тачност прорачуна, трговац не може да захтева повећање цене.

Ако је цена уговорена без изричите тврдње трговца за тачност прорачуна, трговац не може да захтева повећање цене за више од 15% прорачуна, осим ако је другачије уговорено.

Прорачун се односи на продајну цену услуге, осим ако није другачије уговорено.

У случају спора о томе да ли уговорени износ представља цену или прорачун, терет доказа сноси трговац.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 97. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '97',
  NULL,
  $en$Payment of the price and specification

Article 97.

If a period for payment for the service has not been agreed, the consumer is obliged to pay the price after performance of the service in the manner referred to in Article 89 of this Law.

The consumer is not obliged to pay the price before inspection and approval of the service performed.

In the event that the trader's contractual obligation consists of several services which are charged separately, the trader is obliged to provide a specification of the selling price in written form for the purpose of determining the price for each of the services performed.

The consumer may refuse payment of the price until the specification referred to in paragraph 3 of this Article is provided.
$en$,
  $sr$Исплата цене и спецификација

Члан 97.

Ако није уговорен рок плаћања услуге, потрошач је дужан да плати цену после извршења услуге на начин из члана 89. овог закона.

Потрошач није дужан да плати цену пре прегледа и одобрења извршене услуге.

У случају да се уговорна обавеза трговца састоји из више услуга које се посебно наплаћују, трговац је дужан да достави спецификацију продајне цене у писаној форми ради утврђивања цене за сваку од извршених услуга.

Потрошач може да одбије плаћање цене до достављања спецификације из става 3. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 98. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '98',
  NULL,
  $en$Failure of the consumer to pay the price

Article 98.

If the consumer is in default in the payment of the price or of a part of the price in advance, the trader may suspend the provision of the service until the price is paid.

The trader is obliged, without delay, to inform the consumer of the suspension of the provision of the service.

If the suspension of the provision of the service may give rise to a risk of damage to health or of significant damage to property, the trader is obliged to eliminate the risk of damage occurring.

The consumer is obliged to reimburse the trader for the costs which arise as a result of the suspension of the provision of the service referred to in paragraphs 1–3 of this Article.
$en$,
  $sr$Пропуштање потрошача да плати цену

Члан 98.

Ако је потрошач у доцњи са плаћањем цене или дела цене унапред, трговац може да обустави пружање услуге до уплате цене.

Tрговац је дужан да без одлагања обавести потрошача о обустави пружања услуге.

Ако обустављање пружања услуге може изазвати опасност од настанка штете по здравље или значајне штете по имовину, трговац је дужан да отклони опасност од настанка штете.

Потрошач је дужан да трговцу накнади трошкове који настану услед обустављања пружања услуге из ст. 1–3. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 99. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '99',
  NULL,
  $en$Termination of the contract on account of departure from the agreed terms

Article 99.

If, in the course of the provision of the service, it is established that the trader is not adhering to the terms of the contract, that is, that he is not providing the service in accordance with the contract, as a result of which a risk arises that the service performed will not be in conformity with the agreed service, the consumer may warn the trader of those circumstances and set a reasonable period for remedying the established irregularities.

If, by the expiry of the period referred to in paragraph 1 of this Article, the trader does not act upon the consumer's request, the consumer may terminate the contract and claim compensation for damage.
$en$,
  $sr$Раскидање уговора због одступања од уговорених услова

Члан 99.

Ако се у току пружања услуге утврди да се трговац не придржава услова из уговора, односно да пружање услуге не врши у складу са уговором, услед чега настане опасност да извршена услуга буде несаобразна уговореној, потрошач може упозорити трговца на те околности и одредити примерен рок за отклањање утврђених неправилности.

Ако до истека рока из става 1. овог члана трговац не поступи по захтеву потрошача, потрошач може раскинути уговор и захтевати накнаду штете.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 100. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '100',
  NULL,
  $en$Termination of the contract before expiry of the period

Article 100.

If it is obvious that the trader cannot perform a conforming service within the period which is an essential element of the contract, the consumer may:

1) terminate the contract, without allowing a reasonable period for performance of the service;

2) claim compensation for damage.

If the trader is late in the performance of the service in relation to the agreed period which is not an essential element of the contract, the consumer who has no interest in the performance of the service after the expiry of the agreed period may:

1) terminate the contract, without allowing a reasonable period for performance of the service;

2) claim compensation for damage.
$en$,
  $sr$Раскидање уговора пре истека рока

Члан 100.

Ако је очигледно да трговац не може извршити саобразну услугу у року који је битан елемент уговора, потрошач може:

1) раскинути уговор, без остављања примереног рока за извршење услуге;

2) захтевати накнаду штете.

Ако трговац касни са извршењем услуге у односу на уговорени рок који није битан елемент уговора, потрошач који нема интерес за извршење услуге после протека уговореног рока може:

1) раскинути уговор, без остављања примереног рока за извршење услуге;

2) захтевати накнаду штете.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 101. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '101',
  NULL,
  $en$Conformity of the service

Article 101.

The trader is obliged to provide the consumer with a service which is in conformity with the agreed service. A service is not in conformity with the agreed service if:

1) in content, quality and purpose it does not correspond to the description which the trader gave, before the conclusion of the contract, by advertisement or in another similar manner;

2) it does not correspond to the description which the trader gave in the course of the provision of the service, provided that this could have influenced the consumer's decisions;

3) it does not have the special characteristics which the consumer required, and which were known to the trader or must have been known to him at the time of the conclusion of the contract;

4) it does not have the ordinary characteristics of services of the same kind;

5) it does not correspond to expectations which are justified having regard to the nature of the service and to the public promises of the trader concerning the special characteristics of the service, in particular if they were made by advertisement;

6) in content, quality and purpose it does not correspond to the description which, before the conclusion of the contract, a third person gave by advertisement or in another similar manner in the name of the trader.

The trader is not liable for a lack of conformity of the service if:

1) he did not know, or was not obliged to know, that a third person had given, in his name, the description referred to in paragraph 2, point 6) of this Article;

2) the description referred to in paragraph 2, point 6) of this Article has been corrected in an appropriate manner in good time.
$en$,
  $sr$Саобразност услуге

Члан 101.

Tрговац је дужан да потрошачу пружи услугу која је саобразна уговореној. Услуга није саобразна уговореној ако:

1) по садржини, квалитету и сврси не одговара опису који је трговац пре закључења уговора дао огласом или на други сличан начин;

2) не одговара опису који је трговац дао у току пружања услуге под условом да је то могло да утиче на одлуке потрошача;

3) нема посебна својства која је захтевао потрошач, а која су трговцу била или су морала бити позната у тренутку закључења уговора;

4) нема редовна својства услуга исте врсте;

5) не одговара очекивањима која су основана с обзиром на природу услуге и јавна обећања трговца у погледу посебних својстава услуге, а нарочито ако су учињена огласом;

6) по садржини, квалитету и сврси не одговара опису који је пре закључења уговора, огласом или на други сличан начин дало треће лице у име трговца.

Трговац није одговоран за несаобразност услуге ако:

1) није знао или није морао да зна да је треће лице у његово име дало опис из става 2. тачка 6) овог члана;

2) је опис из става 2. тачка 6) овог члана на одговарајући начин благовремено исправљен.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 102. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '102',
  NULL,
  $en$Liability for a lack of conformity

Article 102.

If the service is not in conformity with the agreed service, the consumer may require the trader to perform a conforming service.

If performance of a conforming service is impossible or unlawful, the consumer may require termination of the contract. If performance of a conforming service constitutes a disproportionate burden on the trader, the consumer may require a reduction of the price or termination of the contract.

If the service is not in conformity with the agreed service, the provisions of Articles 53–62 of this Law shall apply accordingly to the rights of the consumer and the liability of the trader.
$en$,
  $sr$Одговорност за несаобразност

Члан 102.

Ако услуга није саобразна уговореној, потрошач може да захтева од трговца да изврши саобразну услугу.

Ако је извршење саобразне услуге немогуће или противправно, потрошач може захтевати раскид уговора. Ако извршење саобразне услуге представља несразмерно оптерећење за трговца, потрошач може захтевати умањење цене или раскид уговора.

Ако услуга није саобразна уговореној, на права потрошача и одговорност трговца сходно се примењују одредбе чл. 53–62. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 103. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '103',
  NULL,
  $en$Liability of persons acting upon an order

Article 103.

The trader is liable for services which have been performed by persons who acted upon his order, as if he had performed those services independently.
$en$,
  $sr$Одговорност лица која поступају по налогу

Члан 103.

Tрговац је одговоран за услуге које су извршила лица која су поступала по његовом налогу, као да је те услуге самостално извршио.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 104. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '104',
  NULL,
  $en$Access to services of general economic interest

Article 104.

The consumer has the right to regular and uninterrupted supply of services of general economic interest of appropriate quality at a fair price, in accordance with special regulations.

The trader is obliged to:

1) enable the consumer to become acquainted in advance with all the conditions for the use of services of general economic interest, and to publish those conditions publicly;

2) not discriminate against the consumer;

3) charge for the service by applying the prices laid down by special regulations.

A trader who provides a service of general economic interest is obliged to maintain the quality of the service in accordance with the law, special regulations and the rules of the profession.

A trader who provides a service of general economic interest, as well as other bodies which decide on the rights and obligations of consumers of services of general economic interest, are obliged to establish advisory bodies in which representatives of registered associations, that is, alliances, referred to in Article 162 of this Law will be included. A trader who provides a service of general economic interest and other bodies which decide on the rights and obligations of consumers of services of general economic interest adopt decisions after obtaining the opinion of the advisory body, and do so in a transparent, objective and non-discriminatory manner.

Traders who provide services of general economic interest are obliged to form commissions for the resolution of consumer complaints, the composition of which must also include representatives of registered associations and alliances referred to in Article 162 of this Law.

The procedure of establishment, the manner of operation, and the rights and obligations of the members of an advisory body or of a commission for the resolution of consumer complaints, are regulated by acts of the trader and of the other bodies referred to in paragraph 4 of this Article.

Representatives of associations for the protection of consumers in advisory bodies or in commissions for the resolution of consumer complaints are appointed by associations for the protection of consumers for a term and in the manner prescribed by the acts referred to in paragraph 6 of this Article.

Decisions on the formation of an advisory body and of a commission for the resolution of a complaint must be published publicly.

An association for the protection of consumers publishes on its internet page a list of the traders and bodies referred to in paragraph 4 of this Article in which their representatives are members of an advisory body or of a commission for the resolution of complaints, within a period of 30 days from the day of appointment.
$en$,
  $sr$Приступ услугама од општег економског интереса

Члан 104.

Потрошач има право на уредно и непрекидно снабдевање услугама од општег економског интереса одговарајућег квалитета по правичној цени, у складу са посебним прописима.

Трговац је дужан да:

1) омогући потрошачу упознавање унапред са свим условима коришћења услуга од општег економског интереса и те услове јавно објави;

2) не врши дискриминацију потрошача;

3) услугу обрачунава применом цена утврђених посебним прописима.

Трговац који пружа услугу од општег економског интереса је дужан да одржава квалитет услуге у складу са законом, посебним прописима и правилима струке.

Трговац који пружа услугу од општег економског интереса, као и друга тела која одлучују о правима и обавезама потрошача услуга од општег економског интереса дужни су да оснују саветодавна тела у која ће бити укључени представници евидентираних удружења односно савеза из члана 162. овог закона. Трговац који пружа услугу од општег економског интереса и друга тела која одлучују о правима и обавезама потрошача услуга од општег економског интереса доносе одлуке по добијању мишљења саветодавног тела, и то на транспарентан, објективан и недискриминаторан начин.

Трговци који пружају услуге од општег економског интереса дужни су да образују комисије за решавање рекламација потрошача у чијем саставу морају да буду и представници евидентираних удружења и савеза из члана 162. овог закона.

Поступак оснивања, начин рада и права и обавезе чланова саветодавног тела или комисије за решавање рекламација потрошача, уређују се актима трговца и других тела из става 4. овог члана.

Представнике удружења за заштиту потрошача у саветодавним телима или комисијама за решавање рекламација потрошача именују удружења за заштиту потрошача на рок и начин прописан актима из става 6. овог члана.

Одлуке о формирању саветодавног тела и комисије за решавање рекламације морају бити јавно објављене.

Удружење за заштиту потрошача објављује на својој интернет страници списак трговаца и тела из става 4. овог члана у којима су њихови представници чланови саветодавног тела или комисије за решавање рекламација, у року од 30 дана од дана именовања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 105. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '105',
  NULL,
  $en$Vulnerable consumer

Article 105.

A vulnerable consumer is a consumer who, because of his economic or social position, living conditions, special needs or other difficult personal circumstances, acquires goods or uses a service under particularly difficult conditions, or is prevented from doing so.

The Government regulates in greater detail the criteria for defining vulnerable consumers and the specific conditions for ensuring services of general economic interest for vulnerable consumers in particular areas of services of general economic interest, on the proposal of the minister competent for the relevant area.
$en$,
  $sr$Угрожени потрошач

Члан 105.

Угрожени потрошач је потрошач који због свог економског или друштвеног положаја, услова живота, посебних потреба или других тешких личних прилика прибавља робу или користи услугу под нарочито отежаним условима, или је у томе онемогућен.

Влада ближе уређује критеријуме за дефинисање угрожених потрошача и специфичне услове за обезбеђивање услуга од општег економског интереса угроженим потрошачима у појединим областима услуга од општег економског интереса, на предлог министра надлежног за одговарајућу област.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 106. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '106',
  NULL,
  $en$Programmes for the protection of vulnerable consumers in particular areas of services of general economic interest

Article 106.

Programmes in particular areas of the provision of services of general economic interest lay down measures and instruments intended to ensure effective protection of vulnerable consumers, in particular with regard to access, availability, disconnection from the distribution network or refusal of the provision of services, the manner of determining the price, information, counselling and assistance to consumers in resolving consumer problems.

The Government, on the proposal of the minister competent for the relevant area, adopts a programme for the protection of vulnerable consumers in particular areas of services of general economic interest.
$en$,
  $sr$Програми заштите угрожених потрошача у појединим областима услуга од општег економског интереса

Члан 106.

Програмима у појединим областима пружања услуга од општег економског интереса утврђују се мере и инструменти намењени обезбеђивању ефективне заштите угрожених потрошача, нарочито у погледу приступа, доступности, искључења са дистрибутивне мреже или ускраћивања пружања услуга, начину одређивања цене, информисања, саветовања и помоћи потрошачима у решавању потрошачких проблема.

Влада на предлог министра надлежног за одговарајућу област, доноси програм заштите угрожених потрошача у појединим областима услуга од општег економског интереса.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 107. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '107',
  NULL,
  $en$Protection against suspension of the provision of services

Article 107.

The trader may suspend the provision of services of general economic interest if the consumer does not settle his current obligations for the services provided within a period of two months from the day the obligation falls due.

The trader is obliged, before the suspension referred to in paragraph 1 of this Article, in written or electronic form:

1) to warn the consumer of the consumer's obligation under the contract;

2) to call upon the consumer to settle the outstanding obligations within a period which may not be shorter than 30 days from the day of service of the warning.

If a bill is contested in judicial or out-of-court proceedings, and the consumer continues to pay the bills for current obligations, the trader may not suspend the provision of the service of general economic interest until the conclusion of the judicial or out-of-court proceedings, unless the consumer has terminated the contract with the trader.

If a trader who provides a service of general economic interest has suspended the provision of the service before he has been informed of the initiation of the proceedings referred to in paragraph 3 of this Article, he is obliged, free of charge, to resume and to continue the provision of the service to the consumer until the conclusion of the judicial or out-of-court proceedings, unless the consumer has terminated the contract with the trader.

The obligation referred to in paragraphs 3 and 4 of this Article also applies to the case where the trader initiates enforcement proceedings against the consumer.

In the event of suspension of the provision of services, the trader is obliged to continue the provision of services to the consumer at the latest within a period of two days from the day of receipt of payment of the outstanding debt.

It is prohibited for the trader to suspend the provision of the service of supply of thermal energy, that is, of supply of electricity or gas with which the consumer is supplied for the purpose of heating, during the heating season, if a vulnerable consumer lives in the household.

It is prohibited for the trader to authorise another legal or natural person to contact the consumer in person, by telephone, by electronic mail or by another means of distance communication, for the purpose of collecting a claim arising from the contract, unless the consumer has given express consent which is not an integral part of the contract.

The prohibition referred to in paragraph 8 of this Article applies to contracts of sale and to contracts for the provision of services.

It is prohibited for the trader, in the event of disconnection of the consumer from the distribution network, that is, suspension of the provision of services of general economic interest, to make reconnection, that is, continuation of the provision of the service, conditional upon payment of the consumer's debts which are time-barred within the meaning of the law governing obligations.
$en$,
  $sr$Заштита од обуставе пружања услуга

Члан 107.

Трговац може да обустави пружање услуга од општег економског интереса ако потрошач не измири своје текуће обавезе за пружене услуге у року од два месеца од дана доспелости обавезе.

Трговац је дужан да пре обуставе из става 1. овог члана потрошача у писаном или електронском облику:

1) упозори на потрошачеву обавезу по основу уговора;

2) позове да измири заостале обавезе у року који не може бити краћи од 30 дана од дана достављања упозорења.

Ако се у судском или вансудском поступку оспорава рачун, а потрошач настави да уплаћује рачуне за текуће обавезе, трговац не може да обустави пружање услуге од општег економског интереса до окончања судског или вансудског поступка, осим ако је потрошач раскинуо уговор са трговцем.

Ако је трговац који пружа услугу од општег економског интереса обуставио пружање услуге пре него што је обавештен о покренутом поступку из става 3. овог члана, дужан је да, без накнаде, поново започне и настави са пружањем услуге потрошачу до окончања судског или вансудског поступка, осим ако је потрошач раскинуо уговор са трговцем.

Обавеза из ст. 3. и 4. овог члана односи се и на случај када трговац покрене поступак извршења против потрошача.

У случају обуставе пружања услуга, трговац је дужан да настави са пружањем услуга потрошачу најкасније у року од два дана од дана пријема уплате за заостали дуг.

Забрањено је да трговац обустави пружање услуге снабдевања топлотном енергијом, односно снабдевања електричном енергијом или гасом којима се потрошач снабдева ради грејања током трајања грејне сезоне, ако у домаћинству живи угрожени потрошач.

Забрањено је да трговац овласти друго правно или физичко лице да се обраћа потрошачу лично, путем телефона, електронске поште или другог средства комуникације на даљину, ради остваривања потраживања из уговора, осим ако је потрошач дао изричиту сагласност, а која није саставни део уговора.

Забрана из става 8. овог члана примењује се на уговоре о продаји и уговоре о пружању услуга.

Забрањено је трговцу да, у случају искључења потрошача са дистрибутивне мреже, односно обуставе пружања услуга од општег економског интереса, условљава поновно укључење, односно наставак пружања услуге плаћањем дугова потрошача који су застарели у смислу закона којим се уређују облигациони односи.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 108. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '108',
  NULL,
  $en$Duty to inform before the conclusion of the contract

Article 108.

Before the conclusion of a contract for the provision of services of general economic interest, in addition to the trader's obligations regarding information prescribed by Article 12 of this Law, as well as by other regulations, the trader informs the consumer of:

1) the right that services of general economic interest of a specified quality must be provided to the consumer at an affordable price;

2) special offers and discounts, with a clear indication of the conditions for their realisation;

3) the criteria for acquiring the status of a vulnerable consumer, the special benefits intended for vulnerable consumers, and the manners of exercising them;

4) the amount of the tariff which includes the fee for connection to the network, the types of fees for use, including details of the standard discounts which apply and of special and targeted tariff plans, as well as the time limits for connection to the distribution network;

5) the manner in which data on the applicable tariffs and maintenance prices may be obtained;

6) the consumer's right and possibility to change the provider of a service of general economic interest free of charge;

7) the manner of exercising the right to compensation, that is, to a refund of the amount paid, if the service provided does not correspond to the agreed quality;

8) the existence of the possibility of out-of-court resolution of consumer disputes;

9) the conditions and procedures for changing the terms of the contract and the right to terminate the contract before the expiry of the contractual period;

10) the availability, conditions and types of fees for maintenance, if the trader also offers a maintenance service.

Before the conclusion of the contract, all relevant documents, including the text of the contract, must be made available to the consumer, in written form or on a durable data carrier.
$en$,
  $sr$Дужност обавештавања пре закључења уговора

Члан 108.

Пре закључења уговора о пружању услуга од општег економског интереса, поред обавеза трговца у погледу обавештавања прописаних чланом 12. овог закона, као и другим прописима, трговац обавештава потрошача о:

1) праву да потрошачу услуге од општег економског интереса одређеног квалитета морају да буду пружене по приступачној цени;

2) посебним понудама и попустима, са јасном назнаком услова за њихову реализацију;

3) критеријумима за стицање статуса угроженог потрошача, посебним погодностима намењеним угроженим потрошачима и начинима њихових остваривања;

4) износу тарифе која обухвата накнаду за прикључење на мрежу, врстама накнада за коришћење, укључујући детаље о стандардним попустима који се примењују и посебним и циљним тарифним плановима, као и роковима за прикључење на дистрибутивну мрежу;

5) начину на који се могу добити подаци о важећим тарифама и ценама одржавања;

6) праву и могућности потрошача да промени пружаоца услуге од општег економског интереса без накнаде;

7) начину остваривања права на накнаду, односно повраћај уплаћеног износа ако пружена услуга не одговара уговореном квалитету;

8) постојању могућности вансудског решавања потрошачких спорова;

9) условима и поступцима за промену услова из уговора и праву на раскид уговора пре истека уговорног рока;

10) доступности, условима и врстама накнада за одржавање, ако трговац нуди и услугу одржавања.

Пре закључивања уговора, потрошачу морају да буду стављени на располагање сви релевантни документи, укључујући текст уговора, у писаном облику или на трајном носачу података.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 109. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '109',
  NULL,
  $en$Other duties to inform

Article 109.

The trader is obliged to inform the consumer of a change in prices at the latest 30 days before the start of application of the changed prices.

The trader is obliged, at the latest 30 days before the start of application of the changed prices, that is, of the general terms of the contract, to inform the consumer of an amendment of the methodology for the formation of prices, that is, of the general terms of the contract, and, if it is not possible to inform the consumer personally, to inform consumers publicly.

The trader is obliged, where amendments of the methodology for the formation of prices and changes in the prices of services of general economic interest are subject to obtaining prior approval or consent of a holder of public powers, at the latest 30 days before the start of application of the changed prices and of the amended methodology for the formation of prices, to inform the consumer of the amendments and, if it is not possible to inform the consumer personally, to inform consumers publicly.

The trader is obliged, before submitting a proposal for enforcement for the satisfaction of a monetary claim, to inform the consumer personally of the existence of the debt and to allow a period of 15 days for settlement of the claim in question, under threat of initiation of enforcement proceedings in accordance with the regulation governing enforcement proceedings.
$en$,
  $sr$Остале дужности обавештавања

Члан 109.

Трговац је дужан да потрошача обавести о промени цена најкасније 30 дана пре почетка примене промењених цена.

Трговац је дужан да најкасније 30 дана пре почетка примене промењених цена, односно општих услова уговора обавести потрошача о измени методологије формирања цена, односно општих услова уговора, а ако лично обавештавање потрошача није могуће, да обавести потрошаче јавно.

Трговац је дужан да, када измене методологије формирања цена и промене цена услуга од општег економског интереса подлежу добијању претходног одобрења или сагласности носиоца јавних овлашћења, најкасније 30 дана пре почетка примене промењених цена и измењене методологије формирања цена обавести потрошача о изменама, а ако лично обавештавање потрошача није могуће, да обавести потрошаче јавно.

Трговац је дужан да пре подношења предлога за извршење ради намирења новчаног потраживања, потрошача лично обавести о постојању дуга и остави рок од 15 дана за измирење предметног потраживања под претњом покретања извршног поступка у складу са прописом којим се регулише извршни поступак.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 110. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '110',
  NULL,
  $en$Right of termination

Article 110.

The consumer has the right to terminate a contract for the provision of services of general economic interest if he does not agree with a change in the price, that is, the tariff, with an amendment of the general terms of the contract set out in the trader's notice, with the quality of the services provided, and if the service has not been provided.

The consumer is obliged to pay the amount for the services which have been provided to him up to the termination of the contract.
$en$,
  $sr$Право на раскид

Члан 110.

Потрошач има право да раскине уговор о пружању услуга од општег економског интереса ако није сагласан са променом цене, односно тарифе, изменом општих услова уговора наведеним у обавештењу трговца, са квалитетом пружених услуга и ако услуга није пружена.

Потрошач је дужан да уплати износ за услуге које су му пружене до раскида уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 111. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '111',
  NULL,
  $en$Right to change the service provider

Article 111.

The trader is obliged to enable the consumer to conclude, without payment of a fee, a contract with another trader who provides services of general economic interest of the same kind.

The period within which the trader is obliged to enable the consumer to conclude the contract referred to in paragraph 1 of this Article may not be longer than one month from the day on which the consumer informed the trader of that intention, unless otherwise regulated by a special law.
$en$,
  $sr$Право на промену пружаоца услуге

Члан 111.

Трговац је дужан да омогући потрошачу закључивање уговора са другим трговцем који пружа услуге од општег економског интереса исте врсте без плаћања накнаде.

Рок у коме је трговац дужан да омогући потрошачу закључивање уговора из става 1. овог члана не може бити дужи од месец дана од дана када је потрошач обавестио трговца о тој намери, осим ако посебним законом није другачије уређено.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 112. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '112',
  NULL,
  $en$Specification of the bill

Article 112.

The trader is obliged to deliver bills for services of general economic interest which have been provided, without delay and within time limits which enable the consumer to monitor the consumption realised and the amount charged for a billing period of not more than one month.

The trader is obliged to state in the bill for services of general economic interest which have been provided the elements which enable the consumer to:

1) verify and monitor the amount charged to him;

2) obtain an insight into current consumption in order to check total consumption against the quality of the service provided.

The trader is obliged to deliver to the consumer, free of charge, at his request, a detailed specification of the bill.

If a contract for the provision of services of general economic interest has been concluded for a fixed term, the date of expiry of the term must be indicated on every bill.

Where the consumer is in default in payment, the fees calculated for late payments must be in accordance with the costs, and the trader may not apply an interest rate to the outstanding debt contrary to mandatory regulations, and in particular the law governing the level of the default interest rate.

The service of reading metering devices for the purpose of issuing a bill is free of charge.

Services which are free of charge for the consumer are to be indicated on the bill, with a statement that they are free of charge.
$en$,
  $sr$Спецификација рачуна

Члан 112.

Трговац је дужан да рачуне за пружене услуге од општег економског интереса доставља без кашњења и у роковима који омогућавају да потрошач прати остварену потрошњу и задужење за обрачунски период од највише месец дана.

Трговац је дужан да у рачуну за пружене услуге од општег економског интереса наведе елементе који потрошачу омогућавају да:

1) проверава и прати износ свог задужења;

2) остварује увид у текућу потрошњу ради провере укупне потрошње према пруженом квалитету услуге.

Трговац је дужан да потрошачу без накнаде на његов захтев достави детаљну спецификацију рачуна.

Ако је уговор о пружању услуга од општег економског интереса закључен на одређени рок, датум истека рока мора бити назначен на сваком рачуну.

Када потрошач касни са плаћањем, обрачунате накнаде за закаснела плаћања морају бити у складу са трошковима и трговац не сме обрачунавати каматну стопу на заостали дуг супротно принудним прописима, а нарочито закону којим се уређује висина стопе затезне камате.

Услуга читања мерних уређаја у циљу издавања рачуна је бесплатна.

Услуге које су бесплатне за потрошача треба да буду означене на рачуну, уз навођење да су бесплатне.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 113. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '113',
  NULL,
  $en$Free telephone line

Article 113.

A trader who provides services of general economic interest is obliged to provide and publish publicly a telephone line free of charge which enables consumers to contact the trader easily in connection with questions and problems of connection to the distribution network, as well as with the quality and use of services of general economic interest.
$en$,
  $sr$Бесплатна телефонска линија

Члан 113.

Tрговац који пружа услуге од општег економског интереса дужан је да обезбеди и јавно објави бесплатну телефонску линију која омогућава потрошачима да лако контактирају трговца у вези са питањима и проблемима прикључивања на дистрибутивну мрежу, као и квалитетом и коришћењем услуга од општег економског интереса.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 114. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '114',
  NULL,
  $en$Right to judicial or out-of-court protection

Article 114.

The consumer may initiate judicial or out-of-court proceedings for the resolution of a consumer dispute only after the expiry of the time limit for obtaining a reply to a complaint lodged in accordance with this Law, or after the expiry of the time limit for obtaining a decision of the trader who provides services of general economic interest upon an objection lodged in accordance with the law governing the general administrative procedure.
$en$,
  $sr$Право на судску или вансудску заштиту

Члан 114.

Потрошач може покренути судски или вансудски поступак решавања потрошачког спора тек након протека рока за добијање одговора на изјављену рекламацију у складу са овим законом или након протека рока за добијање одлуке трговца који пружа услуге од општег економског интереса по изјављеном приговору у складу са законом којим се уређује општи управни поступак.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 115. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '115',
  NULL,
  $en$Article 115.

Before the conclusion of a contract on the organisation of a trip, a linked travel arrangement or an excursion, the travel organiser or the intermediary is obliged to provide the traveller with all information in the Serbian language, namely on:

1) the main characteristics of the travel services:

(1) the destination, the travel plan and the period of stay, with dates and, if accommodation is included, the number of nights included;

(2) the means of transport, its characteristics and category, the place, date and time of departure and return, the duration and the place of intermediate stops and transport connections;

(3) the place, data on the accommodation facility (location, name, type, content, as well as the category in accordance with the regulations of the country in which the facility is located) and data on the equipment and the level of comfort of the accommodation unit (room, studio, apartment);

(4) the number, type and manner of serving meals;

(5) the approximate size of the group;

(6) the language in which the services will be provided if the use of other services on the part of the traveller depends on effective oral communication;

(7) the possibility of travel for persons with reduced mobility, and at the request of the traveller;

2) the business name, registered office and registration number of the travel organiser, the telephone number, as well as the e-mail address;

3) the selling price expressed as a single amount in the same currency, which, in addition to the services from the travel programme, or the special requirements of the traveller, also includes all additional fees, taxes, as well as other costs which, as an inseparable part, are necessary for the realisation of the trip;

4) the manner of payment, as well as the amount or percentage of the price which is to be paid in advance and the manner and schedule of payment of the remaining amount;

5) the minimum number of travellers, if that is a condition for the realisation of the trip, and the final time limit for informing the traveller in the event of cancellation, stated in Article 130, paragraph 1, point 1) of this Law;

6) passport and visa requirements, including approximate periods required for obtaining a visa and information on health formalities in the country of destination;

7) the possibility for the traveller to terminate the contract at any moment before the start of the tourist trip, subject to payment of an appropriate fee in accordance with Article 129 of this Law;

8) voluntary or compulsory insurance which covers the costs of termination of the contract by the traveller or the costs of assistance, including repatriation, in the event of an accident, illness or death.

If the exact time referred to in paragraph 1, point 1), subpoint (2) of this Article has not been determined at the time of the conclusion of the contract, the travel organiser or the intermediary shall inform the traveller of the approximate time of departure and return.

In the case referred to in paragraph 2 of this Article, the travel organiser or the intermediary shall, at the latest within a period of 48 hours before the start of the trip, inform the traveller of the exact time of departure and return.

The travel organiser is obliged to transmit the data referred to in paragraph 1, points 1–8) of this Article to the intermediary with whom he has concluded a contract on the sale of a tourist trip.
$en$,
  $sr$Члан 115.

Пре закључења уговора о организовању путовања, повезаног путног аранжмана или излета организатор, односно посредник је у обавези да путнику пружи све информације на српском језику, и то о:

1) основним карактеристикама услуга путовања:

(1) одредишту, плану путовања и периоду боравка, са датумима и, ако је укључен смештај, броју обухваћених ноћења;

(2) превозном средству, његовим карактеристикама и категорији, месту, датуму и времену поласка и повратка, трајању и месту заустављања и преседања за превоз;

(3) месту, подацима о смештајном објекту (локација, назив, врста, садржина, као и категорија у складу са прописима земље у којој се објекат налази) и подацима о опремљености и нивоу комфора смештајне јединице (соба, студио, апартман);

(4) броју, врсти и начину услуживања оброка;

(5) приближној величини групе;

(6) језику на којем ће се услуге пружати уколико коришћење других услуга на страни путника зависи од ефикасне усмене комуникације;

(7) могућности путовања лица са смањеном покретљивошћу, а на захтев путника;

2) пословном имену, седишту, матичном броју организатора, броју телефона, као и адреси е-поште;

3) продајној цени исказаној у јединственом износу у истој валути, која поред услуга из програма путовања, односно посебних захтева путника, садржи и све додатне накнаде, таксе, као и друге трошкове, који су, као неодвојив део, неопходни за реализацију путовања;

4) начину плаћања, као и износу или проценту цене који треба да буду плаћени унапред и начину и динамици плаћања преосталог износа;

5) минималном броју путника, ако је то услов за реализацију путовања и крајњем року за обавештавање путника за случај отказивања, наведеном у члану 130. став 1. тачка 1) овог закона;

6) захтевима за пасош и визу, укључујући и оквирне периоде потребне за прибављање визе и информације о здравственим формалностима у земљи одредишта;

7) могућности да путник раскине уговор у било ком тренутку пре отпочињања туристичког путовања, уз плаћање одговарајуће накнаде у складу са чланом 129. овог закона;

8) добровољном или обавезном осигурању које покрива трошкове раскида уговора од стране путника или трошкове помоћи, укључујући репатријацију, у случају незгоде, болести или смрти.

Уколико тачно време из става 1. тачка 1) подтачка (2) овог члана у време закључења уговора није утврђено, организатор, односно посредник ће обавестити путника о приближном времену поласка и повратка.

У случају из става 2. овог члана, организатор, односно посредник ће, најкасније у периоду од 48 сати пре отпочињања путовања, обавестити путника о тачном времену поласка и повратка.

Организатор је дужан да податке из става 1. тач. 1–8) овог члана пренесе посреднику, са којим има закључен уговор о продаји туристичког путовања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 116. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '116',
  NULL,
  $en$Article 116.

If the travel organiser or the intermediary does not provide the traveller with full pre-contractual information in respect of additional fees, taxes, as well as other costs which are not included in the contract, that is, in the single selling price, the traveller is not obliged to bear those costs.
$en$,
  $sr$Члан 116.

Ако организатор, односно посредник не пружи путнику пуну предуговорну информацију у погледу додатних накнада, такси, као и других трошкова, који нису обухваћени уговором, односно јединственом продајном ценом путник није обавезан да те трошкове сноси.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 117. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '117',
  NULL,
  $en$Article 117.

The pre-contractual information referred to in Article 115 of this Law forms an integral part of the contract and may be changed only if the contracting parties expressly agree to that.

The travel organiser or the intermediary is obliged to provide the traveller, before the conclusion of the contract on an organised trip, with the pre-contractual information referred to in Article 115 of this Law in an intelligible and not misleading manner. The information must be noticeable.

If, before the conclusion of the contract, changes occur in the information referred to in Article 115, paragraph 1 of this Law, the travel organiser or the intermediary is obliged to make all amendments to the pre-contractual information available to the traveller in a clear, intelligible and easily noticeable manner.

The burden of proving all data from the pre-contractual information provided under Articles 115 and 116 of this Law lies with the travel organiser or with the intermediary.

The burden of proving all data given in the contract on the organisation of a trip, a linked travel arrangement or an excursion lies with the travel organiser or the intermediary.
$en$,
  $sr$Члан 117.

Предуговорне информације из члана 115. овог закона чине саставни део уговора и могу се променити само ако се уговорне странке о томе изричито сагласе.

Предуговорне информације из члана 115. овог закона организатор односно посредник је дужан да путнику, пре закључења уговора о организованом путовању, пружи на разумљив и необмањујући начин. Информације морају бити уочљиве.

Уколико пре закључења уговора дође до промена информација из члана 115. став 1. овог закона организатор, односно посредник су дужни да на јасан, разумљив и лако уочљив начин путнику учини доступним све измене предуговорних информација.

Терет доказивања свих података из пружених предуговорних информација из чл. 115. и 116. овог закона је на организатору, односно на посреднику.

Терет доказивања свих података датих у уговору о организовању путовања, повезаном путном аранжману или излету је на организатору, односно посреднику.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 118. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '118',
  NULL,
  $en$Article 118.

In the event of advertising a tourist trip, a linked travel arrangement or an excursion, the travel organiser or the intermediary is obliged to inform the traveller of the right to receive notice of the data referred to in Articles 115 and 116 of this Law and of the manner in which he may obtain those data.

If the travel organiser or the intermediary, via the internet, offers the traveller to conclude a contract on a tourist trip, a linked travel arrangement or an excursion, he is obliged to make the data referred to in Articles 115 and 116 of this Law available to the traveller.

If the travel organiser or the intermediary offers the traveller to conclude a contract on a tourist trip, a linked travel arrangement or an excursion at a particular promotional or sales event, he is obliged clearly to indicate the commercial nature of that event and to enable the consumer to become acquainted with the data referred to in Articles 115 and 116 of this Law during the promotional or sales event.
$en$,
  $sr$Члан 118.

У случају оглашавања туристичког путовања, повезаног путног аранжмана или излета организатор односно посредник је дужан да обавести путника о праву да добије обавештење о подацима из чл. 115. и 116. овог закона и начину на који може да добије те податке.

Ако организатор, односно посредник посредством интернета нуди путнику да закључе уговор о туристичком путовању, повезаном путном аранжману или излету дужан је да податке из чл. 115. и 116. овог закона учини путнику доступним.

Ако организатор односно посредник нуди путнику да закључе уговор о туристичком путовању, повезаном путном аранжману или излету приликом одређеног промотивног или продајног догађаја, дужан је да јасно истакне комерцијалну природу тог догађаја и да омогући потрошачу да се обавести о подацима из чл. 115. и 116. овог закона за време трајања промотивног или продајног догађаја.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 119. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '119',
  NULL,
  $en$Article 119.

A contract on the organisation of a trip shall be concluded in written form in an intelligible and not misleading manner.

Upon the conclusion of a contract on an organised trip, the travel organiser or the intermediary is obliged to deliver it to the traveller on paper, on another durable data carrier or by electronic means, with confirmation of receipt.

Information which is provided to the traveller in accordance with Articles 115 and 116 of this Law forms an integral part of the contract on the organisation of a trip and may not be changed, except with the express consent of the contracting parties.
$en$,
  $sr$Члан 119.

Уговор о организовању путовања закључује се у писменој форми на разумљив и необмањујући начин.

Приликом закључења уговора о организованом путовању, организатор, односно посредник је дужан да га уручи путнику на папиру, на другом трајном носачу података или електронским путем, са потврдом пријема.

Информације које се пружају путнику у складу са чл. 115. и 116. овог закона чине саставни део уговора о организовању путовања и не могу се мењати, осим уз изричиту сагласност уговорних страна.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 120. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '120',
  NULL,
  $en$Article 120.

In addition to the information referred to in Article 115 of this Law, the contract on the organisation of a trip must contain:

1) the special requirements of the traveller with which the travel organiser has agreed;

2) information on the handling of a complaint (address, procedure and time limit for lodging complaints, time limit for resolving a complaint, and others) and on out-of-court procedures for the resolution of consumer disputes;

3) the business name and address of the travel organiser or the intermediary and data on the traveller (name, surname, address and contact detail);

4) the date and place of conclusion of the contract and the signatures of the contracting parties;

5) the conditions under which the traveller has the right to withdraw from the contract;

6) information that the travel organiser:

(1) is responsible for the performance of all travel services covered by the contract in accordance with Articles 132–135 of this Law;

(2) is obliged, in accordance with Article 139 of this Law, to provide assistance if the traveller is faced with difficulties;

7) the name of the giver of the travel guarantee, his address and contact data;

8) data on the travel guarantee, that is, information on the insured events and the security instruments and the manner of their activation;

9) information (name, address, telephone number and e-mail address) on the local representative of the travel organiser or on the local agency or another service which enables the traveller to enter quickly into contact with the travel organiser and to communicate with him effectively, to request assistance when the traveller is faced with problems, or to lodge an objection to a lack of conformity noticed during the realisation of the tourist trip.

10) information that the traveller is obliged to report every lack of conformity which he notices during the realisation of the tourist trip in accordance with Article 133, paragraph 1 of this Law;

11) in the event that a minor, unaccompanied by a parent or another authorised person, travels on the basis of a contract on the organisation of a trip, information (name, address, telephone number) which enables direct contact with the minor or with the person who is responsible for the minor at the minor's place of stay;

12) information on the traveller's right to transfer the contract to another traveller in accordance with Article 122 of this Law.

In good time before the start of the tourist trip, the travel organiser or the intermediary shall deliver to the traveller all necessary confirmations, vouchers and tickets, information on the timetable of departures and, where necessary, the time limits for check-in, as well as on the timetable of stops, connections and arrivals.
$en$,
  $sr$Члан 120.

Осим информација из члана 115. овог закона, уговор о организовању путовања мора да садржи:

1) посебне захтеве путника са којима се организатор сагласио;

2) информације о поступању по рекламацији (адреса, поступак и рок за улагање рекламација, рок за решавање рекламације и др.) и о вансудским поступцима за решавање потрошачких спорова;

3) пословно име и адресу организатора односно посредника и податке о путнику (име, презиме, адреса и контакт податак);

4) датум и место закључења уговора и потписе уговорних страна;

5) услове под којима путник има право на одустанак од уговора;

6) информацију да је организатор:

(1) одговоран за извршавање свих услуга путовања обухваћених уговором у складу са чл. 132–135. овог закона;

(2) дужан да у складу са чланом 139. овог закона пружи помоћ ако је путник суочен са потешкоћама;

7) назив даваоца гаранције путовања, његову адресу и контакт податке;

8) податке о гаранцији путовања, односно информације о осигураним случајевима и инструментима обезбеђења и начину њиховог активирања;

9) информацију (назив, адреса, број телефона и адреса е-поште) о локалном представнику организатора или о локалној агенцији или другом сервису који омогућава путнику да брзо ступи у контакт са организатором и да ефикасно комуницира с њим, да захтева помоћ када је путник суочен са проблемима или да уложи приговор на недостатак саобразности примећен током реализације туристичког путовања.

10) информацију да је путник дужан да пријави сваки недостатак саобразности који примети током реализације туристичког путовања у складу са чланом 133. став 1. овог закона;

11) у случају да малолетно лице, без пратње родитеља или другог овлашћеног лица, путује по основу уговора о организовању путовања, информације (назив, адреса, број телефона) које омогућавају директан контакт са малолетним лицем или лицем које је одговорно за малолетно лице у месту боравка малолетног лица;

12) информације о праву путника да пренесе уговор на другог путника у складу са чланом 122. овог закона.

Благовремено пре отпочињања туристичког путовања, организатор, односно посредник ће путнику доставити све неопходне потврде, ваучере и карте, информације о распореду полазака и, по потреби, роковима за пријаву, као и о распореду заустављања, преседања и доласка.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 121. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '121',
  NULL,
  $en$Article 121.

The travel organiser or the intermediary is liable for all errors which arise as a result of technical defects in the process of booking a tourist trip, a linked travel arrangement or an excursion, or travel services.

The travel organiser or the intermediary shall not be liable for booking errors which may be attributed to the traveller or which are caused by unavoidable and extraordinary circumstances.
$en$,
  $sr$Члан 121.

Организатор односно посредник је одговоран за све грешке које настану услед техничких недостатака у процесу резервисања туристичког путовања, повезаног путног аранжмана или излета или услуга путовања.

Организатор односно посредник неће бити одговоран за грешке приликом резервисања које се могу приписати путнику или које су изазване неизбежним и ванредним околностима.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 122. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '122',
  NULL,
  $en$Article 122.

The traveller may, before the start of the tourist trip, transfer the contract to a person who fulfils all the conditions which apply to the contract in question.

The traveller may transfer the right under the contract on an organised trip referred to in paragraph 1 of this Article to another person only if he informs the travel organiser thereof on paper, on another durable data carrier or by electronic means, with confirmation of receipt, within a reasonable time before the start of the tourist trip.

Notice referred to in paragraph 2 of this Article, which has been given at least seven days before the start of the tourist trip, shall be deemed to have been served within a reasonable time.

In the event of transfer of the contract to another traveller, the travel organiser concludes a new contract on the organisation of a trip.

In the case referred to in paragraph 1 of this Article, the travel organiser has the right to reimbursement of costs in the manner prescribed by the law governing tourism.

The traveller and the person referred to in paragraph 1 of this Article are jointly and severally liable to the travel organiser for the reimbursement of the costs.
$en$,
  $sr$Члан 122.

Путник може пре отпочињања туристичког путовања да пренесе уговор на лице које испуњава све услове који важе за предметни уговор.

Путник може да пренесе право из уговора о организованом путовању из става 1. овог члана на друго лице само ако о томе обавести организатора на папиру, на другом трајном носачу података или електронским путем, са потврдом пријема, у разумном року пре отпочињања туристичког путовања.

Обавештење из става 2. овог члана, које је пружено најмање седам дана пре отпочињања туристичког путовања сматраће се достављеним у разумном року.

У случају преноса уговора на другог путника организатор закључује нови уговор о организовању путовања.

У случају из става 1. овог члана, организатор има право на накнаду трошкова на начин прописан законом којим се уређује туризам.

Путник и лице из става 1. овог члана су солидарно одговорни организатору за накнаду трошкова.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 123. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '123',
  NULL,
  $en$Change of the price

Article 123.

The travel organiser may increase the agreed price under the contract on the organisation of a trip if that right has been agreed and if it has been agreed that the traveller has the right to a reduction of the price.

The travel organiser may increase the price, that is, the traveller may reduce the price, referred to in paragraph 1 of this Article in the event of a change in:

1) the price of the carriage of travellers which has occurred as a result of a change in the price of fuel or other sources of energy;

2) existing fees or the introduction of new fees, including sojourn fees, air fees or fees for embarkation or disembarkation in ports and at airports;

3) the foreign-exchange rate which relates to the tourist trip.

If the increase of the price in the case referred to in paragraph 2 of this Article is greater than 8% of the total price of the tourist trip, the travel organiser may not unilaterally change the price.

In the case referred to in paragraph 3 of this Article, the travel organiser shall act in the manner prescribed by Article 124 of this Law.

Irrespective of the extent of the increase of the price, such an increase shall be possible only if the travel organiser informs the traveller of the increase in an intelligible and not misleading manner and provides a documented statement of reasons for such an increase and a calculation, which notice is delivered to the traveller on paper, on another durable data carrier or by electronic means, with confirmation of receipt, at least 20 days before the start of the tourist trip.

If the contract on the tourist trip provides for the possibility of an increase of the price, the travel organiser shall enable the traveller to exercise the right to a reduction of the price in proportion to the reduction of the costs referred to in paragraph 2 of this Article which occurs after the conclusion of the contract, and before the start of the trip.

In the event of a reduction of the price, the travel organiser has the right to deduct the costs from the reimbursement which he owes to the traveller, with the provision of a justified reason if the traveller so requests.
$en$,
  $sr$Промена цене

Члан 123.

Организатор може да повећа уговорену цену из уговора о организовању путовања ако је то право уговорено и ако је уговорено да путник има право на умањење цене.

Организатор може да повећа цену, односно путник може да умањи цену, из става 1. овог члана у случају промене:

1) цене превоза путника до које је дошло услед промене цене горива или других извора енергије;

2) постојећих такси или увођења нових такси, укључујући боравишне таксе, авио-таксе или таксе за укрцавање или искрцавање у лукама и на аеродромима;

3) девизног курса који се односи на туристичко путовање.

Ако је повећање цене у случају из става 2. овог члана веће од 8% укупне цене туристичког путовања, организатор не може једнострано да промени цену.

У случају из става 3. овог члана организатор поступа на начин прописан чланом 124. овог закона.

Независно од обима повећања цене, такво повећање ће бити могуће само ако организатор обавести путника о повећању на разумљив и необмањујући начин и пружи документовано образложење за такво повећање и обрачун, које обавештење се путнику уручује на папиру, на другом трајном носачу података или електронским путем, са потврдом пријема, најмање 20 дана пре отпочињања туристичког путовања.

Ако уговор о туристичком путовању предвиђа могућност повећања цене, организатор ће омогућити путнику право на смањење цене сразмерно смањењу трошкова из става 2. овог члана до ког долази након закључења уговора, а пре отпочињања путовања.

У случају смањења цене, организатор има право да одбије трошкове из накнаде коју дугује путнику, уз достављање оправданог разлога, уколико путник то захтева.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 124. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '124',
  NULL,
  $en$Amendment of other terms of the contract

Article 124.

Before the start of the trip, the travel organiser may unilaterally amend the contract on the organisation of a trip if:

1) the travel organiser's right to a unilateral amendment of the contract is provided for in the contract;

2) the amendment is insignificant.

If, before the agreed day of the start of the trip, the travel organiser establishes that he is compelled to amend certain essential elements of the contract on the organisation of a trip, such as the price, the destination, the means of transport, the characteristics or the category of transport, the date, the type, the location of the accommodation facility, its category or the level of comfort of the accommodation, or if the travel organiser cannot fulfil the special requirements of the traveller with which he has agreed, the travel organiser, that is, the intermediary, is obliged to inform the traveller without delay.

In the case referred to in paragraphs 1 and 2 of this Article, the travel organiser, that is, the intermediary, is obliged to inform the traveller of the change in a noticeable, intelligible and not misleading manner on paper, on another durable data carrier or by electronic means, with confirmation of receipt.

The notice of the amendment of the terms of the contract referred to in paragraph 2 of this Article shall contain:

1) a reasonable time limit within which the traveller is obliged to inform the travel organiser, that is, the intermediary, whether he accepts the proposed amendments or terminates the contract without payment of a fee for termination;

2) data on the consequences of failure to observe the time limit;

3) where necessary, data on the substitute trip offered, of equal or higher quality, and on its price.

The traveller may accept the changes to the contract referred to in paragraph 2 of this Article or unilaterally terminate the contract on the organisation of a trip without payment of a fee for termination.

In the event that the traveller accepts the proposed amendments to the contract referred to in paragraph 2 of this Article or accepts the substitute trip, the travel organiser is obliged to conclude a new contract on the organisation of a trip and to provide a new travel guarantee.

In the case referred to in paragraph 6 of this Article, if the amendment of the contract or the substitute trip leads to lower quality or causes additional costs for the traveller, the travel organiser is obliged to enable the traveller to obtain an appropriate reduction of the price.

In the event of termination of the contract referred to in paragraph 5 of this Article, the travel organiser shall refund all payments received from the traveller immediately, and at the latest within a period of 14 days from the day of termination of the contract.
$en$,
  $sr$Измена других услова уговора

Члан 124.

Пре отпочињања путовања, организатор може једнострано да измени уговор о организовању путовања ако:

1) је право организатора на једнострану измену уговора предвиђено уговором;

2) је измена занемарљива.

Ако пре уговореног дана отпочињања путовања организатор утврди да је принуђен да измени поједине битне елементе уговора о организовању путовања, као што су цена, дестинација, превозно средство, карактеристике или категорија превоза, датум, врста, локација смештајног објекта, његова категорија или ниво комфора смештаја или ако организатор не може да испуни посебне захтеве путника са којима се сагласио, организатор, односно посредник је дужан да без одлагања обавести путника.

У случају из ст. 1. и 2. овог члана, организатор, односно посредник је дужан да обавести путника о промени на уочљив, разумљив и необмањујући начин на папиру, другом трајном носачу података или електронским путем, са потврдом пријема.

Обавештење о измени услова уговора из става 2. овог члана садржи:

1) разуман рок у којем је путник дужан да обавести организатора, односно посредника да ли прихвата предложене измене или раскида уговор без плаћања накнаде за раскид;

2) податке о последицама пропуштања рока;

3) по потреби, податке о понуђеном заменском путовању, једнаког или већег квалитета и његовој цени.

Путник може да прихвати промене уговора из става 2. овог члана или да једнострано раскине уговор о организовању путовања без плаћања накнаде за раскид.

У случају да путник прихвати предложене измене уговора из става 2. овог члана или прихвати заменско путовање, организатор је дужан да закључи нови уговор о организовању путовања и обезбеди нову гаранцију путовања.

У случају из става 6. овог члана, ако измена уговора или заменско путовање доводе до мањег квалитета или проузрокују додатне трошкове за путника, организатор је дужан да путнику омогући одговарајуће умањење цене.

У случају раскида уговора из става 5. овог члана, организатор ће рефундирати све уплате примљене од путника одмах, а најкасније у року од 14 дана од дана раскида уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 125. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '125',
  NULL,
  $en$Other travel service

Article 125.

In the event that the travel organiser, for the purposes of a previously sold trip, also sells to the traveller another additional travel service, that service forms an integral part of the tourist trip, for which the travel organiser provides a travel guarantee.

In the event that the travel organiser enables the traveller to make a targeted purchase of another travel service from another trader and if the contract with that other trader is concluded within a period shorter than 24 hours after confirmation of the booking, the service so purchased forms an integral part of the tourist trip, for which the travel organiser provides a travel guarantee.

In the event that the travel organiser, by means of linked booking processes via the internet, transfers to another trader data on the traveller with whom he has concluded a contract (name and surname, payment details, e-mail address and others), from whom the traveller purchases another travel service within a period shorter than 24 hours after confirmation of the booking, the service so purchased forms an integral part of the tourist trip, for which the travel organiser provides a travel guarantee.

The travel organiser is, in the case referred to in paragraphs 2 and 3 of this Article, obliged, before the conclusion of the contract on the organisation of a trip, to deliver to the traveller notice of his right to a travel guarantee, that is, of the loss of that right if the service has been purchased from another trader after the prescribed time limit.

The travel organiser is obliged to deliver the notice referred to in paragraph 4 of this Article to the traveller directly, by electronic means or on a durable data carrier, with confirmation of receipt.

The travel organiser may not, without the signed or electronically confirmed consent of the traveller, send data on the traveller by means of linked booking processes via the internet, in the manner referred to in paragraph 3 of this Article.
$en$,
  $sr$Друга услуга путовања

Члан 125.

У случају да организатор, за потребе претходно продатог путовања, путнику прода и другу додатну услугу путовања, та услуга чини саставни део туристичког путовања, за коју организатор обезбеђује гаранцију путовања.

У случају да организатор путнику омогући циљану куповину неке друге услуге путовања од другог трговца и ако је уговор с тим другим трговцем склопљен у року краћем од 24 сата након потврде резервације, тако купљена услуга чини саставни део туристичког путовања, за коју организатор обезбеђује гаранцију путовања.

У случају да организатор посредством повезаних процеса резервисања путем интернета, податке о путнику са којим је закључио уговор (име и презиме, детаљи плаћања, адреса е-поште и др.), пренесе другом трговцу, од кога путник купи другу услугу путовања у року краћем од 24 сата након потврде резервације, тако купљена услуга чини саставни део туристичког путовања, за коју организатор обезбеђује гаранцију путовања.

Организатор је, у случају из ст. 2. и 3. овог члана, дужан да, пре закључења уговора о организовању путовања, уручи путнику обавештење о његовом праву на гаранцију путовања, односно губитку тог права, ако је услуга код другог трговца купљена након прописаног рока.

Организатор је дужан да обавештење из става 4. овог члана уручи путнику непосредно, електронским путем или на трајном носачу података, уз потврду пријема.

Организатор не може без потписане или електронски потврђене сагласности путника слати податке о путнику посредством повезаних процеса резервисања путем интернета, на начин из става 3. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 126. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '126',
  NULL,
  $en$Subsequently purchased service

Article 126.

In the event that the traveller purchases a travel service which is not provided for in the travel programme, or offered as an optional service by the travel organiser, and concludes separate contracts for that service with other individual traders, the subsequently purchased service does not form an integral part of the tourist trip, except in the cases prescribed by this Law.
$en$,
  $sr$Накнадно купљена услуга

Члан 126.

У случају да путник купи услугу путовања, која није предвиђена програмом путовања, или понуђена као факултативна услуга од стране организатора, и да за ту услугу закључи засебне уговоре са другим појединачним трговцима, накнадно купљена услуга не чини саставни део туристичког путовања, изузев у случајевима прописаним овим законом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 127. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '127',
  NULL,
  $en$Linked travel arrangement

Article 127.

In the event that the travel organiser, that is, the intermediary, enables the traveller, for the purposes of his own trip, to purchase and pay for at least two different travel services from other traders, direct providers of services, in respect of which separate contracts are concluded, the trip so combined constitutes a linked travel arrangement.

In the event that the traveller purchases one travel service from the travel organiser, that is, the intermediary, and the travel organiser, that is, the intermediary, gives him the possibility, for the purposes of the same trip, of purchasing one further additional travel service from another trader, if the contract with that other trader is concluded within a period shorter than 24 hours after confirmation of the booking of the first travel service, the trip so combined constitutes a linked travel arrangement.

The travel service referred to in paragraphs 1 and 2 of this Article may not be accommodation.

If the traveller, from the travel organiser, that is, the intermediary, in addition to a service of transport or of rental of motor vehicles, for the purposes of the same trip, purchases one or more other services in tourism, the value of which does not exceed 25% of the total value of the service so combined, which is not an essential element of the service, the trip so combined constitutes a linked travel arrangement.

In the case referred to in paragraphs 1, 2 and 4 of this Article, a linked travel arrangement does not constitute a tourist trip.

In the case of a linked travel arrangement, the traveller may not exercise the right to the travel guarantee provided for a tourist trip, but each provider of services is exclusively liable for the proper performance of his services, in accordance with the contract.

The travel organiser is obliged to deliver to the traveller notice of his rights in accordance with paragraph 6 of this Article.

The travel organiser is obliged to deliver the notice referred to in paragraph 7 of this Article to the traveller directly, by electronic means or on a durable data carrier, with confirmation of receipt.
$en$,
  $sr$Повезани путни аранжман

Члан 127.

У случају да путнику за потребе сопственог путовања организатор, односно посредник омогући да од других трговаца, директних пружалаца услуга, купи и плати најмање две различите услуге путовања, о чему се закључују засебни уговори, тако комбиновано путовање представља повезани путни аранжман.

У случају да путник код организатора, односно посредника купи једну услугу путовања, а организатор, односно посредник му даје могућност да, за потребе истог путовања, купи још једну додатну услугу путовања од другог трговца, ако је уговор с тим другим трговцем склопљен у року краћем од 24 сата након потврде резервације прве услуге путовања, тако комбиновано путовање представља повезани путни аранжман.

Услуга путовања из ст. 1. и 2. овог члана не може бити смештај.

Уколико путник код организатора, односно посредника, поред услуге превоза или изнајмљивања моторних возила, за потребе истог путовања, купи једну или више других услуга у туризму, чија вредност не прелази 25% укупне вредности тако комбиноване услуге, која није битан елемент услуге, тако комбиновано путовање представља повезани путни аранжман.

У случају из ст. 1, 2. и 4. овог члана, повезани путни аранжман не представља туристичко путовање.

Код повезаног путног аранжмана путник не може да оствари право на гаранцију путовања предвиђену за туристичко путовање, већ је сваки пружалац услуга искључиво одговоран за правилно извршење својих услуга, у складу са уговором.

Организатор је дужан да путнику уручи обавештење о његовим правима у складу са ставом 6. овог члана.

Организатор је дужан да обавештење из става 7. овог члана уручи путнику непосредно, електронским путем или на трајном носачу података, уз потврду пријема.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 128. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '128',
  NULL,
  $en$Tourist trip

Article 128.

The travel organiser, that is, the intermediary, concludes with the traveller a contract on the organisation of a trip which the travel organiser has offered, prepared, that is, combined, independently or at the request of the traveller, on the basis of a contract concluded with providers of services, as third persons, to whom the performance of that trip has been entrusted.

An accommodation service alone which comprises one or more overnight stays shall also be deemed to be a tourist trip.

If the traveller, in addition to a service of transport or of rental of motor vehicles, for the purposes of the same trip, purchases from the travel organiser one or more other services in tourism, the value of which exceeds 25% of the total value of the service so combined and constitutes an essential element of the service, the trip so combined constitutes a tourist trip, for which the travel organiser provides a travel guarantee.

If the traveller purchases from the travel organiser a service of transport or of rental of motor vehicles, and the travel organiser gives him the possibility, for the purposes of the same trip, of purchasing from another trader one or more other services in tourism, the value of which exceeds 25% of the total value of the service so combined, if the contract with that other trader is concluded within a period shorter than 24 hours after confirmation of the booking of the first travel service, the trip so combined constitutes a tourist trip, for which the travel organiser provides a travel guarantee.

A trader who has sold one or more other services in tourism which constitute the tourist trip referred to in paragraph 4 of this Article is obliged to inform the travel organiser thereof within a period of 24 hours from the moment of conclusion of the contract.

After receipt of the notice referred to in paragraph 5 of this Article, the travel organiser, without delay, and at the latest within a period of 48 hours from the moment of receipt of the notice, concludes with the traveller a contract on the organisation of a trip, in the manner prescribed by this Law.

Failure of the travel organiser to act in the manner prescribed by paragraph 6 of this Article does not release the travel organiser from liability for the realisation of the tourist trip.

In the case referred to in paragraph 4 of this Article, the travel organiser is obliged to deliver to the traveller notice of the possibility of a tourist trip arising, of the traveller's right to a travel guarantee, that is, of the loss of that right if the service has been purchased from another trader after the expiry of the time limit of 24 hours after confirmation of the booking of the first travel service.

The travel organiser is obliged to deliver the notice referred to in paragraph 8 of this Article to the traveller directly, by electronic means or on a durable data carrier, with confirmation of receipt.
$en$,
  $sr$Туристичко путовање

Члан 128.

Организатор, односно посредник са путником закључује уговор о организовању путовања, које је организатор самостално или на захтев путника понудио, припремио, односно комбиновао, на основу уговора закљученог са пружаоцима услуга, као трећим лицима, којима је поверено извршење тог путовања.

Под туристичким путовањем сматра се и само услуга смештаја која обухвата једно или више ноћења.

Уколико путник поред услуге превоза или изнајмљивања моторних возила, за потребе истог путовања, код организатора купи једну или више других услуга у туризму, чија вредност прелази 25% укупне вредности тако комбиноване услуге и представља битан елеменат услуге, тако комбиновано путовање представља туристичко путовање, за које организатор обезбеђује гаранцију путовања.

Уколико путник код организатора купи услугу превоза или изнајмљивања моторних возила, а организатор му даје могућност да, за потребе истог путовања, од другог трговца купи једну или више других услуга у туризму, чија вредност прелази 25% укупне вредности тако комбиноване услуге, ако је уговор с тим другим трговцем склопљен у року краћем од 24 сата након потврде резервације прве услуге путовања, тако комбиновано путовање представља туристичко путовање, за које организатор обезбеђује гаранцију путовања.

Трговац који је продао једну или више других услуга у туризму које чине туристичко путовање из става 4. овог члана, дужан је да о томе обавести организатора у року од 24 сата од тренутка закључења уговора.

Након пријема обавештења из става 5. овог члана, организатор без одлагања, а најкасније у року од 48 сати од тренутка пријема обавештења, са путником закључује уговор о организовању путовања, на начин прописан овим законом.

Непоступање организатора на начин прописан ставом 6. овог члана не ослобађа организатора од одговорности за реализацију туристичког путовања.

У случају из става 4. овог члана, организатор је дужан да уручи путнику обавештење о могућности настанка туристичког путовања, праву путника на гаранцију путовања, односно губитку тог права, ако је услуга код другог трговца купљена након истека рока од 24 сата након потврде резервације прве услуге путовања.

Организатор је дужан да обавештење из става 8. овог члана уручи путнику непосредно, електронским путем или на трајном носачу података, уз потврду пријема.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 129. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '129',
  NULL,
  $en$Withdrawal of the traveller from the trip

Article 129.

The traveller may, before the start of the tourist trip, withdraw completely or partially from the contract on the organisation of a trip.

If the traveller, before the start of the tourist trip, withdraws from the contract within an appropriate time limit which is determined taking into account the type of tourist trip (timely withdrawal), the travel organiser has the right to reimbursement of administrative costs.

In the event of an untimely withdrawal by the traveller from the contract, the travel organiser may require from the traveller the fee provided for in the contract, that is, in the general terms of travel, which is calculated taking into account the period remaining until the start of the tourist trip.

In the event that the traveller has withdrawn completely or partially from the contract on the organisation of a trip, before the beginning as well as during the duration of the tourist trip, because of circumstances which he could not avoid or eliminate and which, had they existed at the time of conclusion of the contract, would have constituted a justified reason not to conclude the contract, the travel organiser has the right to reimbursement of actual costs.

The traveller's justified reasons for withdrawal from the contract referred to in paragraph 4 of this Article are:

1) sudden illness of the traveller, as well as serious illness of his blood relative in the direct line, and in the collateral line up to and including the second degree, of his spouse or of a relative by affinity up to and including the second degree, of an adoptee and of an adopter;

2) death of the traveller's blood relative in the direct line, and in the collateral line up to and including the second degree, of his spouse or of a relative by affinity up to and including the second degree, of an adoptee or of an adopter;

3) natural disasters in the country of departure or of destination;

4) an officially declared state of emergency in the country of departure or of destination;

5) an emergency situation in the country of departure or of destination.

In the case referred to in paragraphs 2–4 of this Article, the travel organiser is obliged, at the request of the traveller, to provide a statement of reasons for the amount of the compensation.

The travel organiser exercises the right to reimbursement of administrative costs per contract concluded, and in the event that several travellers are covered by one contract the travel organiser exercises the right to a single compensation.

By way of exception to paragraph 7 of this Article, the travel organiser also exercises the right to reimbursement of administrative costs in respect of each traveller under the contract, subject to the obligation to prove delivery of the contract, the general terms of travel, the travel programme and others to each traveller individually.
$en$,
  $sr$Одустанак путника од путовања

Члан 129.

Путник може пре отпочињања туристичког путовања потпуно или делимично одустати од уговора о организовању путовања.

Ако путник пре отпочињања туристичког путовања одустане од уговора у примереном року који се одређује узимајући у обзир врсту туристичког путовања (благовремени одустанак), организатор има право на накнаду административних трошкова.

У случају неблаговременог одустанка путника од уговора, организатор може од путника захтевати накнаду предвиђену уговором, односно општим условима путовања, која се израчунава узимајући у обзир период преостао до отпочињања туристичког путовања.

У случају да је путник потпуно или делимично одустао од уговора о организовању путовања, пре почетка као и за време трајања туристичког путовања, због околности које није могао избећи или отклонити и које би да су постојале у време закључења уговора представљале оправдан разлог да не закључи уговор, организатор има право на накнаду стварних трошкова.

Оправдани разлози путника за одустанак од уговора из става 4. овог члана су:

1) изненадна болест путника, као и тешка болест његовог крвног сродника у правој линији, а у побочној линији закључно са другим степеном, брачног друга или тазбинског сродника закључно са другим степеном, усвојеника и усвојиоца;

2) смрт путниковог крвног сродника у правој линији, а у побочној линији закључно са другим степеном, брачног друга или тазбинског сродника закључно са другим степеном, усвојеника или усвојиоца;

3) елементарне непогоде у држави полазишта или одредишта;

4) званично проглашено ванредно стање у држави полазишта или одредишта;

5) ванредна ситуација у држави полазишта или одредишта.

У случају из ст. 2–4. овог члана, организатор је дужан да на захтев путника пружи образложење износа накнаде.

Право на накнаду административних трошкова организатор остварује по закљученом уговору, а у случају да је једним уговором обухваћено више путника организатор остварује право на једну накнаду.

Изузетно од става 7. овог члана право на накнаду административних трошкова организатор остварује и по сваком путнику из уговора, уз обавезу да докаже уручење уговора, општих услова путовања, програма путовања и др. сваком путнику појединачно.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 130. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '130',
  NULL,
  $en$Termination of the contract on the organisation of a trip and the right of withdrawal on the part of the organiser before the start of the trip

Article 130.

The travel organiser may terminate the contract on the organisation of a trip and, before the start of the trip, pay the traveller the total amounts paid for the tourist trip when:

1) the number of persons registered for the tourist trip is smaller than the minimum number provided for in the contract and the travel organiser informs the traveller of the termination within the time limit which is determined in the contract, which may not be shorter than:

(1) 20 days before the start of the tourist trip in the case of trips which last longer than six days;

(2) seven days before the start of the tourist trip in the case of trips which last between two and six days;

(3) 48 hours before the start of the tourist trip in the case of trips which last less than two days;

2) the travel organiser is prevented from performing the contract as a result of unavoidable and extraordinary circumstances.

In the case referred to in paragraph 1, point 2) of this Article, the travel organiser is obliged to inform the traveller of the termination of the contract without undue delay, and before the start of the tourist trip.

In the case referred to in paragraph 1 of this Article, the travel organiser is obliged to pay the traveller the total amounts paid, without undue delay, and at the latest within a period of 14 days from the termination.

In the case referred to in paragraph 1 of this Article, the travel organiser is not liable for compensation of any costs of the traveller which have arisen as a result of the termination of the contract.
$en$,
  $sr$Раскид уговора о организовању путовања и право на одустанак од стране организатора пре отпочињања путовања

Члан 130.

Организатор може да раскине уговор о организовању путовања и да пре отпочињања путовања исплати путнику укупно уплаћена средства за туристичко путовање када је:

1) број лица пријављених за туристичко путовање мањи од минималног броја предвиђеног уговором и организатор обавести путника о раскиду у року који је одређен уговором, који не може бити краћи од:

(1) 20 дана пре отпочињања туристичког путовања у случају путовања која трају дуже од шест дана;

(2) седам дана пре отпочињања туристичког путовања у случају путовања која трају између два и шест дана;

(3) 48 сати пре отпочињања туристичког путовања у случају путовања која трају краће од два дана;

2) организатор спречен да изврши уговор услед неизбежних и ванредних околности.

У случају из става 1. тачка 2) овог члана организатор је дужан да обавести путника о раскиду уговора без непотребног одлагања, а пре отпочињања туристичког путовања.

У случају из става 1. овог члана организатор је дужан да путнику исплати укупно уплаћена средства, без непотребног одлагања, а најкасније у року од 14 дана од раскида.

У случају из става 1. овог члана организатор није одговоран за накнаду евентуалних трошкова путника насталих услед раскида уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 131. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '131',
  NULL,
  $en$Special rights of a pupil, that is, a student

Article 131.

If the travel organiser organises a stay of a pupil or a student for schooling, that is, studies, abroad, he is obliged to provide accommodation and care for the pupil, that is, the student, in an appropriate family or other appropriate accommodation, in cooperation with the pupil, his parent or guardian, or with the student.

The travel organiser is obliged to ensure for the pupil, that is, the student, the possibility of regular attendance of classes or training during the stay abroad.

The travel organiser or the intermediary is obliged, at the latest within a period of 14 days before the start of the trip, to inform the pupil, that is, the student, of the name, address and telephone number of the host family and of the name, address and telephone number of the responsible person whom the pupil, that is, the student, may contact for assistance at the place of stay abroad.

The travel organiser or the intermediary is obliged to provide the pupil, that is, the student, with the necessary information on the culture, customs and way of life, as well as appropriate information on health services in the country of destination.

If the travel organiser or the intermediary does not fulfil the obligations under paragraphs 3 and 4 of this Article, the pupil, that is, the student, has the right, before the start of the trip, to terminate the contract without a fee.

The burden of proving fulfilment of the obligations under paragraphs 3 and 4 of this Article lies with the travel organiser or the intermediary.

The pupil, that is, the student, has the right to terminate the contract at any time before departure.

In the event that the pupil, that is, the student, terminates the contract after the start of the trip for reasons for which the travel organiser or the intermediary does not bear liability, the travel organiser has the right to reimbursement of the costs of the return of the pupil, that is, the student.
$en$,
  $sr$Посебна права ученика односно студента

Члан 131.

Ако организатор организује боравак ученика или студента на школовању, односно студијама у иностранству, дужан је да обезбеди смештај и старање за ученика односно студента у одговарајућој породици или другом одговарајућем смештају, у сарадњи са учеником, његовим родитељем или старатељем, односно студентом.

Организатор је дужан да обезбеди ученику, односно студенту могућност редовног похађања наставе или обуке у току боравка у иностранству.

Организатор, односно посредник је дужан да најкасније у року од 14 дана пре отпочињања путовања обавести ученика, односно студента о имену, адреси и телефонском броју породице домаћина и имену, адреси и телефонском броју одговорног лица коме ученик, односно студент може да се обрати за помоћ у месту боравка у иностранству.

Организатор, односно посредник је дужан да ученику, односно студенту, пружи неопходне информације о култури, обичајима и начину живота, као и одговарајуће информације о здравственим услугама у земљи одредишта.

Ако организатор односно посредник не испуни обавезе из ст. 3. и 4. овог члана, ученик, односно студент има право да пре отпочињања путовања без накнаде раскине уговор.

Терет доказивања испуњења обавеза из ст. 3. и 4. овог члана је на организатору односно посреднику.

Ученик, односно студент има право да раскине уговор у било које време пре поласка.

У случају да ученик, односно студент раскине уговор после отпочињања путовања из разлога за које организатор, односно посредник не сноси одговорност, организатор има право на накнаду трошкова повратка ученика односно студента.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 132. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '132',
  NULL,
  $en$Liability

Article 132.

The travel organiser is obliged to realise the tourist trip in the manner provided for in the contract on an organised trip, and in accordance with the regulations governing tourism.

A tourist trip is in accordance with the contract if it has the characteristics which the travel organiser has guaranteed or if it corresponds to the usual or the agreed purpose.

The travel organiser is liable for the conformity of the service, including services which a third person has provided to the traveller (a provider of services of transport, accommodation and catering, of other services in tourism, as well as of entertainment, cultural, sports-recreational or other programmes by which leisure time is filled).

The provisions of Articles 101–103 of this Law shall apply accordingly to the liability of the travel organiser for the conformity of a tourist trip or an excursion.

The burden of proving the conformity of the service referred to in paragraph 3 of this Article lies with the travel organiser.
$en$,
  $sr$Одговорност

Члан 132.

Организатор је дужан да реализује туристичко путовање на начин предвиђен уговором о оргaнизованом путовању, а у складу са прописима којима се уређује туризам.

Туристичко путовање је у складу са уговором ако има својства која је организатор гарантовао или ако одговара уобичајеној или уговореној намени.

Организатор одговара за саобразност услуге, укључујући услуге које је путнику пружило треће лице (пружалац услуга превоза, смештаја, исхране, других услуга у туризму, као и забавних, културних, спортско-рекреативних или других програма којима се испуњава слободно време).

На одговорност организатора за саобразност туристичког путовања или излета, сходно се примењују одредбе чл. 101–103. овог закона.

Терет доказивања саобразности услуге из става 3. овог члана је на организатору.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 133. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '133',
  NULL,
  $en$Lack of conformity of travel services

Article 133.

The traveller shall, during the performance of the travel services, without undue delay, taking into account the circumstances of the case, report to the travel organiser every lack of conformity which is covered by the contract on the organisation of a trip.

If the travel services have not been provided, or cannot be provided, to the traveller in accordance with the contract on the organisation of a trip, the travel organiser shall, without delay, bring the agreed services into conformity with the contract, except in the case where he is not in a position to perform them or where that would lead to disproportionate costs for the travel organiser, taking into account the extent of the lack of conformity and the value of the relevant travel services.

If the travel organiser is not in a position to provide the travel services under the contract on the organisation of a trip, the traveller may himself bring the travel services into conformity with the contract.

If the travel organiser partially brings the travel services under the contract on the organisation of a trip into conformity, or the lack of conformity of the travel services does not constitute a significant departure from the terms laid down in the contract on the organisation of a trip, the traveller continues to use the travel services which are not in conformity with the contract.

A significant departure referred to in paragraph 4 of this Article exists when the total value exceeds 25% of the selling price under the contract on the organisation of a trip.

In the case referred to in paragraphs 3 and 4 of this Article, the traveller has the right to the difference between the agreed price of the trip and the price of the trip reduced in proportion to the non-performance or the incomplete performance, or the right to compensation for damage which is caused to the traveller by non-fulfilment, partial fulfilment or improper fulfilment of the obligations of the travel organiser, in accordance with the law.

A report of a lack of conformity referred to in paragraph 1 of this Article shall not be deemed a complaint.
$en$,
  $sr$Несаобразност услуга путовања

Члан 133.

Путник ће, током извршења услуга путовања, без непотребног одлагања, узимајући у обзир околности случаја, организатору пријавити сваку несаобразност, која је обухваћена уговором о организовању путовања.

Ако услуге путовања нису пружене или не могу бити пружене путнику у складу са уговором о организовању путовања, организатор ће, без одлагања, ускладити уговорене услуге са уговором, осим у случају када није у могућности да их изврши или би то довело до несразмерних трошкова за организатора узимајући у обзир обим несаобразности и вредности релевантних услуга путовања.

Уколико организатор није у могућности да обезбеди услуге путовања из уговора о организовању путовања, путник може сам да усклади услуге путовања са уговором.

Уколико организатор делимично усклади услуге путовања из уговора о организовању путовања или несаобразност услуга путовања не представља значајно одступање од услова утврђених уговором о организовању путовања, путник наставља да користи услуге путовања које нису саобразне са уговором.

Значајно одступање из става 4. овог члана постоји када укупна вредност прелази 25% продајне цене из уговора о организовању путовања.

У случају из ст. 3. и 4. овог члана, путник има право на разлику између уговорене цене путовања и цене путовања снижене сразмерно неизвршењу или непотпуном извршењу, односно право на накнаду штете која се проузрокује путнику неиспуњењем, делимичним испуњењем или неуредним испуњењем обавеза организатора, у складу са законом.

Пријава недостатка саобразности из става 1. овог члана не сматра се рекламацијом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 134. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '134',
  NULL,
  $en$Significant lack of conformity

Article 134.

If a significant part of the travel services cannot be provided as agreed in the contract on the organisation of a trip, the travel organiser shall, without undue delay and without any additional costs for the traveller, offer appropriate alternative travel services of a quality equal to or higher than that stated in the contract, so that the realisation of the trip may continue, including the case where the return of the traveller to the place of departure is not in accordance with the contract on the organisation of a trip.

If the travel organiser does not offer alternative travel services, or the alternative travel services are of a lower quality and constitute a significant lack of conformity in relation to the contract on the organisation of a trip, the traveller may refuse such alternative services, or he may terminate the contract without payment of a fee for termination.

In the case referred to in paragraph 2 of this Article, the traveller has the right to a reduction of the price, or the right to compensation for damage under Article 133, paragraph 6 of this Law.

If the contract on the organisation of a trip includes the transport of the traveller, the travel organiser shall, in the cases stated in paragraph 2 of this Article, provide the traveller with repatriation by an equivalent means of transport, without undue delay and without additional costs for the traveller.

If it is impossible to provide the return of the traveller as agreed in the contract on the organisation of a trip as a result of unavoidable and extraordinary circumstances, the travel organiser shall bear the costs of the necessary accommodation, if possible of a quality equal to that which is determined in the contract on the trip, during a period which is not longer than three nights per traveller.

The limitation of costs referred to in paragraph 5 of this Article does not apply to persons with reduced mobility, to a person who accompanies them, to pregnant women or unaccompanied minors, nor to persons who require special medical assistance, provided that the travel organiser has been informed of their special needs at least 48 hours before the start of the tourist trip.
$en$,
  $sr$Значајан недостатак саобразности

Члан 134.

Ако значајан део услуга путовања не може да се пружи како је договорено уговором о организовању путовања, организатор ће, без непотребног одлагања и без икаквих додатних трошкова за путника понудити одговарајуће заменске услуге путовања једнаког или већег квалитета од оног наведеног у уговору, како би се наставила реализација путовања, укључујући случај да повратак путника у место поласка није у складу са уговором о организовању путовања.

Ако организатор не понуди заменске услуге путовања или су заменске услуге путовања мањег квалитета и чине значајан недостатак саобразности у односу на уговор о организовању путовања, путник може да одбије такве заменске услуге, односно може да раскине уговор без плаћања накнаде за раскид.

У случају из става 2. овог члана, путник има право на смањење цене, односно право на накнаду штете из члана 133. став 6. овог закона.

Ако уговор о организовању путовања укључује превоз путника, организатор ће у случајевима наведеним у ставу 2. овог члана обезбедити путнику репатријацију једнаким превозним средством без непотребног одлагања и без додатних трошкова за путника.

Ако је немогуће обезбедити повратак путника како је договорено уговором о организовању путовања услед неизбежних и ванредних околности, организатор ће сносити трошкове неопходног смештаја, по могућности једнаког квалитета који је одређен уговором о путовању, током периода који није дужи од три ноћи по путнику.

Ограничење трошкова из става 5. овог члана не примењује се на особе смањене покретљивости, на особу која их прати, на труднице или малолетнике без пратње, као ни на особе којима је потребна посебна медицинска помоћ, под условом да је организатор о њиховим посебним потребама обавештен најмање 48 сати пре почетка туристичког путовања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 135. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '135',
  NULL,
  $en$Right to a reduction of the price

Article 135.

The travel organiser, the local representative of the travel organiser and the local agency to which the travel organiser or the intermediary has referred the traveller in the event of a need for the provision of certain assistance are obliged, without delay:

1) to reply to a complaint or a report of a lack of conformity of the traveller during the tourist trip;

2) to remedy every departure from the contract which the consumer points out.

The traveller may not claim a reduction of the price if, in bad faith, he fails to point out departures between the services provided and the services agreed.

The traveller may not claim a reduction of the price also in the case where the travel organiser proves that the lack of conformity may be attributed to the traveller.
$en$,
  $sr$Право на умањење цене

Члан 135.

Организатор, локални представник организатора и локална агенција на коју је организатор или посредник упутио путника за случај потребе пружања одређене помоћи, дужни су да без одлагања:

1) одговоре на рекламацију односно пријаву недостатка саобразности путника за време трајања туристичког путовања;

2) отклоне свако одступање од уговора на које потрошач укаже.

Путник не може да захтева умањење цене ако несавесно пропусти да укаже на одступања између пружених и уговорених услуга.

Путник не може да захтева умањење цене и у случају када организатор докаже да се несаобразност може приписати путнику.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 136. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '136',
  NULL,
  $en$Liability for damage

Article 136.

If the traveller suffers damage as a result of a lack of conformity of the contract on the organisation of a trip, he has the right to claim compensation for damage from the travel organiser, including non-pecuniary damage.

In the case referred to in paragraph 1 of this Article, the travel organiser may not limit his liability for compensation for damage to an amount which is less than three times the total price of the tourist trip.

The limitation referred to in paragraph 2 of this Article may not be applied to damage which relates to bodily injuries, or to other damage caused intentionally or as a result of the negligence of the travel organiser.

The travel organiser is released from liability under paragraph 1 if he proves that the lack of conformity was caused by:

1) omissions of the traveller;

2) omissions of a third person who is not responsible for the provision of the travel services;

3) the operation of force majeure.
$en$,
  $sr$Одговорност за штету

Члан 136.

Ако путник претрпи штету услед несаобразности уговора о организовању путовања, има право да захтева накнаду штете од организатора, укључујући и нематеријалну штету.

У случају из става 1. овог члана, организатор не може да ограничи своју одговорност за накнаду штете на износ који је мањи од троструке укупне цене туристичког путовања.

Ограничење из става 2. овог члана се не може применити на штету која се односи на телесне повреде, односно на другу штету изазвану намерно или услед немара организатора.

Организатор је ослобођен одговорности из става 1. ако докаже да је несаобразност изазвана:

1) пропустима путника;

2) пропустима трећег лица, које није одговорно за пружање услуга путовања;

3) дејством више силе.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 137. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '137',
  NULL,
  $en$Complaint of the traveller and loss of rights

Article 137.

The travel organiser is obliged to enable the traveller to contact, in a simple and accessible manner, the person responsible for the receipt of complaints or reports of a lack of conformity of the traveller during the tourist trip.

The traveller's right to a reduction of the price or to compensation for damage becomes time-barred upon the expiry of a period of three years from the day of learning of the lack of conformity of the service covered by the contract on the organisation of a trip.
$en$,
  $sr$Рекламација путника и губитак права

Члан 137.

Организатор је дужан да путнику омогући да се на једноставан и приступачан начин обрати лицу одговорном за пријем рекламација односно пријава недостатка саобразности путника за време трајања туристичког путовања.

Право путника на смањење цене или накнаду штете застарева истеком рока од три године, од дана сазнања за несаобразност услуге обухваћене уговором о организовању путовања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 138. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '138',
  NULL,
  $en$Contact with the organiser

Article 138.

The traveller may send messages, requests, reports of a lack of conformity or complaints in connection with the realisation of the tourist trip directly to the travel organiser or to the intermediary through whom the tourist trip was purchased.

The traveller may send messages, requests, reports of a lack of conformity or complaints to the local representative of the travel organiser or to the local agency to which the travel organiser or the intermediary referred the traveller in case of need.

The intermediary referred to in paragraph 1 of this Article, as well as the persons referred to in paragraph 2 of this Article, are obliged to forward the messages, requests, reports of a lack of conformity or complaints to the travel organiser without undue delay.

For the purposes of the calculation of time limits in accordance with this Law, it shall be deemed that the travel organiser received the message, the request for a report of a lack of conformity or the complaint at the same time as the persons referred to in paragraph 3 of this Article.
$en$,
  $sr$Контакт са организатором

Члан 138.

Путник може да упути поруке, захтеве, пријаве недостатка саобразности или рекламације у вези са реализацијом туристичког путовања директно организатору, односно посреднику преко којег је туристичко путовање купљено.

Путник може да упути поруке, захтеве, пријаве недостатка саобразности или рекламације локалном представнику организатора или локалној агенцији на коју је организатор или посредник путника упутио за случај потребе.

Посредник из става 1. овог члана, као и лица из става 2. овог члана дужни су да проследе поруке, захтеве, пријаве недостатка саобразности или рекламације организатору без непотребног одлагања.

За потребе рачунања рокова у складу са овим законом, сматра се да је организатор примио поруку, захтев пријаве недостатка саобразности или рекламацију истовремено када и лица из става 3. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 139. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '139',
  NULL,
  $en$Provision of assistance

Article 139.

The travel organiser shall, without undue delay, provide appropriate assistance to the traveller who is faced with difficulties, in particular in a situation where the return of the traveller in accordance with the contract on the organisation of a trip is impossible as a result of unavoidable and extraordinary circumstances, especially by:

1) the provision of appropriate information on health services, local competent authorities and assistance of the consulate;

2) the provision of assistance so that he may establish distance communication and find alternative travel arrangements.

The travel organiser may charge a fee in the amount of the actual costs for the provision of assistance if the difficulties have arisen by intentional conduct or as a result of the negligence of the traveller.
$en$,
  $sr$Пружање помоћи

Члан 139.

Организатор ће без непотребног одлагања пружити одговарајућу помоћ путнику, који је суочен са потешкоћама, посебно у ситуацији када је повратак путника у складу са уговором о организовању путовања немогућ услед неизбежних и ванредних околности, нарочито кроз:

1) пружање одговарајућих информација о здравственим услугама, локалним надлежним органима и помоћи конзулата;

2) пружање помоћи да оствари комуникацију на даљину и пронађе заменске путне аранжмане.

Организатор може да наплати накнаду у висини стварних трошкова за пружање помоћи, ако је до потешкоћа дошло намерним поступањем или услед немара путника.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 140. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '140',
  NULL,
  $en$Travel guarantees

Article 140.

The travel organiser is obliged to have a travel guarantee in the event of insolvency, by which, in particular, the costs of necessary accommodation, meals and the return of the traveller from the trip to the place of departure in the Republic of Serbia and abroad are secured, as well as all claims of the traveller, as well as a travel guarantee for compensation for damage, by which compensation for damage to the traveller is secured in the event of non-fulfilment, partial fulfilment or improper fulfilment of the obligations of the travel organiser, in accordance with the law governing tourism.

In the event that the travel organiser or the intermediary does not provide the traveller with information on the travel guarantee, or does not deliver to him a confirmation of the travel guarantee, the traveller has the right to withdraw from the contract.

In the case referred to in paragraph 2 of this Article, the travel organiser is obliged to reimburse the traveller the amounts paid in full, and at the latest within a period of 14 days from the withdrawal from the contract.

In the case referred to in paragraph 3 of this Article, the travel organiser does not have the right to reimbursement of administrative costs.
$en$,
  $sr$Гаранције путовања

Члан 140.

Организатор је дужан да има гаранцију путовања услед инсолвентности, којом се посебно обезбеђују трошкови нужног смештаја, исхране и повратка путника са путовања у место поласка у Републици Србији и иностранству, као и сва потраживања путника, као и гаранцију путовања ради накнаде штете, којом се обезбеђује накнада штете путнику у случају неиспуњења, делимичног испуњења или неуредног испуњења обавеза организатора путовања, у складу са законом којим се уређује туризам.

У случају да организатор, односно посредник путнику не пружи информацију о гаранцији путовања, односно не уручи му потврду о гаранцији путовања, путник има право да одустане од уговора.

У случају из става 2. овог члана организатор је дужан да путнику изврши повраћај уплаћених средстава у пуном износу, а најкасније у року од 14 дана од одустанка од уговора.

У случају из става 3. овог члана организатор нема право на накнаду административних трошкова.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 141. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '141',
  NULL,
  $en$Article 141.

The trader is obliged to inform the consumer, within a reasonable time, before the conclusion of a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating exchange, accurately and completely of the data set out in the information forms for a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating exchange.

The trader is obliged to deliver the notices referred to in paragraph 1 of this Article to the consumer free of charge, in written form, on paper, on another durable data carrier or by electronic means, with confirmation of receipt, which is easily accessible to the consumer, in a noticeable, intelligible and not misleading manner.

The minister responsible for tourism affairs shall prescribe in greater detail the content of the information forms for a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating exchange.

The data from the information forms must be in the Serbian language.

The trader is obliged to deliver to the consumer also a certified translation of the data from the information forms in the language of the destination in which the immovable property is located.
$en$,
  $sr$Члан 141.

Трговац је дужан да потрошача у примереном року, пре закључења уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене, тачно и потпуно обавести о подацима наведеним у информативним обрасцима за уговор о временски подељеном коришћењу непокретности, уговор о трајним олакшицама за одмор, уговор о помоћи приликом препродаје и уговор о омогућавању размене.

Обавештења из става 1. овог члана трговац је дужан да достави потрошачу без накнаде, у писаној форми, на папиру, другом трајном носачу података или електронским путем, са потврдом пријема, који је лако доступан потрошачу, на уочљив, разумљив и необмањујући начин.

Министар надлежан за послове туризма ближе прописује садржину информативних образаца за уговор о временски подељеном коришћењу непокретности, уговор о трајним олакшицама за одмор, уговор о помоћи приликом препродаје и уговор о омогућавању размене.

Подаци из информативних образаца морају бити на српском језику.

Трговац је у обавези да потрошачу достави и оверен превод података из информативних образаца на језику дестинације на којој се непокретност налази.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 142. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '142',
  NULL,
  $en$Article 142.

When advertising and offering timeshare of immovable property, long-term holiday benefits, assistance in the resale of timeshare of immovable property and of long-term holiday benefits, or facilitating the exchange of timeshare of immovable property, the trader is obliged to inform the consumer of the conditions and the manner of obtaining the notice referred to in Article 141 of this Law.

In the event that, at a promotional or sales event, the trader offers the consumer in person to conclude a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale or a contract on facilitating exchange, he is obliged clearly to indicate the promotional or sales purpose of that event.

The trader must enable the notice referred to in Article 141 of this Law to be available to the consumer for the duration of the promotional or sales event.

Timeshare of immovable property and long-term holiday benefits may not be advertised or sold as an investment.
$en$,
  $sr$Члан 142.

Приликом оглашавања и нуђења временски подељеног коришћења непокретности, трајних олакшица за одмор, помоћи приликом препродаје временски подељеног коришћења непокретности и трајних олакшица за одмор или омогућавања размене временски подељеног коришћења непокретности, трговац је дужан да обавести потрошача о условима и начину за добијање обавештења из члана 141. овог закона.

У случају да приликом промотивног или продајног догађаја, трговац нуди лично потрошачу да закључе уговор о временски подељеном коришћењу непокретности, уговор о трајним олакшицама за одмор, уговор о помоћи приликом препродаје или уговор о омогућавању размене, дужан је да јасно истакне промотивну или продајну сврху тог догађаја.

Трговац мора омогућити да обавештење из члана 141. овог закона буде доступно потрошачу за време трајања промотивног или продајног догађаја.

Временски подељено коришћење непокретности и трајне олакшице за одмор не могу се оглашавати или продавати у смислу улагања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 143. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '143',
  NULL,
  $en$Article 143.

A contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating exchange shall be concluded in written form and must be in the Serbian language.

In the event of conclusion of a contract referred to in paragraph 1 of this Article, the trader is obliged to deliver to the consumer, on paper or on another durable data carrier, also a certified translation of the contract in the language of the destination in which the immovable property is located.

The trader is obliged, after the signing of the contract on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property, to hand over to the consumer at least one copy of the signed contract.

In the event of conclusion of a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating the exchange of timeshare of immovable property, the data referred to in Article 141 of this Law become an integral part thereof, bind the trader and may not be changed, except if the contracting parties expressly agree otherwise or if changes arise as a result of force majeure.

The trader is obliged, within a reasonable time before the conclusion of a contract referred to in paragraph 1 of this Article, to inform the consumer of every change in the data referred to in Article 141 of this Law, in written form, on paper, on another durable data carrier or by electronic means, with confirmation of receipt, which is accessible to the consumer.

The trader is obliged expressly to state in the contract referred to in paragraph 1 of this Article every change in the data referred to in Article 141 of this Law which arises in the period from informing the consumer of the data until the conclusion of the contract.

A contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating the exchange of timeshare of immovable property, in addition to the data referred to in Article 141 of this Law, must contain:

1) data on the date and place of conclusion of the contract;

2) the name, residence and signature of the consumer;

3) the name, that is, the business name, the residence, that is, the registered office, and the signature of the trader, that is, the name, residence and signature of the authorised person of the trader.

The trader is obliged, within a reasonable time before the conclusion of the contract, expressly to inform the consumer of:

1) the consumer's right to withdraw from the contract;

2) the time limit within which the consumer may withdraw from the contract;

3) the prohibition of payment of the price in advance before the expiry of the time limit within which the consumer may withdraw from the contract.

In the event of conclusion of the contract, the consumer must, separately from the signing of the contract, sign the contractual provisions which relate to the consumer's rights referred to in paragraph 8 of this Article.

The form for withdrawal from a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating the exchange of timeshare of immovable property is an integral part of those contracts.

The minister responsible for tourism affairs shall prescribe in greater detail the content of the form for withdrawal from a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating the exchange of timeshare of immovable property.
$en$,
  $sr$Члан 143.

Уговор о временски подељеном коришћењу непокретности, уговор о трајним олакшицама за одмор, уговор о помоћи приликом препродаје и уговор о омогућавању размене закључују се у писаној форми и обавезно морају бити на српском језику.

У случају закључења уговора из става 1. овог члана, трговац је у обавези да на папиру или на другом трајном носачу података потрошачу достави и оверен превод уговора на језику дестинације на којој се непокретност налази.

Трговац је дужан да после потписивања уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности потрошачу преда најмање један примерак потписаног уговора.

У случају закључења уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности, подаци из члана 141. овог закона постају његов саставни део, обавезују трговца и не могу се мењати, осим ако уговорне стране изричито уговоре другачије или ако промене настану услед више силе.

Трговац је дужан да у примереном року пре закључења уговора из става 1. овог члана, обавести потрошача о свакој промени података из члана 141. овог закона, у писaној форми, на папиру, другом трајном носачу података или електронским путем, са потврдом пријема, који је доступан потрошачу.

Трговац је дужан да у уговору из става 1. овог члана изричито наведе сваку промену података из члана 141. овог закона која настане у периоду од обавештавања потрошача o подацима до закључења уговора.

Уговор о временски подељеном коришћењу непокретности, уговор о трајним олакшицама за одмор, уговор о помоћи приликом препродаје и уговор о омогућавању размене временски подељеног коришћења непокретности поред података из члана 141. овог закона, мора да садржи:

1) податке о датуму и месту закључења уговора;

2) име, пребивалиште и потпис потрошача;

3) име, односно назив, пребивалиште односно седиште и потпис трговца, односно име, пребивалиште и потпис овлашћеног лица трговца.

Трговац је дужан да у примереном року пре закључења уговора потрошача изричито обавести о:

1) праву потрошача на одустанак од уговора;

2) року у коме потрошач може да одустане од уговора;

3) забрани плаћања цене унапред пре истека рока у коме потрошач може да одустане од уговора.

У случају закључења уговора, потрошач мора, одвојено од потписивања уговора, да потпише уговорне одредбе које се односе на права потрошача из става 8. овог члана.

Образац за одустанак од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности саставни је део тих уговора.

Министар надлежан за послове туризма ближе прописује садржину обрасца за одустанак од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 144. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '144',
  NULL,
  $en$Article 144.

The consumer may withdraw from the contract, that is, the preliminary contract, on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property, without an obligation to state the reasons for withdrawal, within a period of 14 days from the day of receipt of the concluded contract.

In the case of simultaneous conclusion of a contract on the timeshare of immovable property and a contract on facilitating the exchange of timeshare of immovable property, the time limit for withdrawal from the contract shall be calculated from the day of receipt of the concluded contract on facilitating the exchange of timeshare of immovable property.
$en$,
  $sr$Члан 144.

Потрошач може да одустане од уговора односно предуговора о временски подељеном коришћењу непокретности, уговорa о трајним олакшицама за одмор, уговорa о помоћи приликом препродаје и уговорa о омогућавању размене временски подељеног коришћења непокретности, без обавезе да наведе разлоге за одустанак, у року од 14 дана од дана пријема закљученог уговора.

У случају истовременог закључења уговора о временски подељеном коришћењу непокретности и уговора о омогућавању размене временски подељеног коришћења непокретности, рок за одустанак од уговора рачуна се од дана пријема закљученог уговора о омогућавању размене временски подељеног коришћења непокретности.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 145. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '145',
  NULL,
  $en$Article 145.

If the trader has not delivered to the consumer the form for withdrawal from the contract in written form, on paper or on another durable data carrier, the consumer may withdraw from the contract, that is, the preliminary contract, on the timeshare of immovable property, the contract, that is, the preliminary contract, on long-term holiday benefits, the contract, that is, the preliminary contract, on assistance in resale and the contract, that is, the preliminary contract, on facilitating the exchange of timeshare of immovable property within a period of one year and 14 days from the day of receipt of the concluded contract, that is, preliminary contract.

If the trader delivers to the consumer the form for withdrawal from the contract on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property before the expiry of one year from the day on which the consumer received a copy of the concluded contract, that is, preliminary contract, the time limit for withdrawal from the contract shall be calculated from the day on which the consumer received the form for withdrawal from the contract.

If the trader does not inform the consumer of the data referred to in Article 141 of this Law in written form, on paper, on another durable data carrier or by electronic means, with confirmation of receipt, the consumer has the right to withdraw from the contract, that is, the preliminary contract, on the timeshare of immovable property, long-term holiday benefits, assistance in resale and facilitating the exchange of timeshare of immovable property within a period of three months and 14 days from the day on which he received a copy of the concluded contract, that is, preliminary contract.

If the trader delivers to the consumer notice of the data referred to in Article 141 of this Law before the expiry of three months from the day on which the consumer received a copy of the concluded contract, that is, preliminary contract, the time limit for withdrawal from the contract on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property shall be calculated from the day on which the consumer received the notice.
$en$,
  $sr$Члан 145.

Ако трговац није доставио потрошачу образац за одустанак од уговора у писаној форми, на папиру или на другом трајном носачу података, потрошач може да одустане од уговора, односно предуговора о временски подељеном коришћењу непокретности, уговорa, односно предуговора о трајним олакшицама за одмор, уговора односно предуговора о помоћи приликом препродаје и уговора, односно предуговора о омогућавању размене временски подељеног коришћења непокретности у року од годину и 14 дана од дана пријема закљученог уговора, односно предуговора.

Ако трговац достави потрошачу образац за одустанак од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности пре истека годину дана од дана када је потрошач примио примерак закљученог уговора, односно предуговора, рок за одустанак од уговора рачуна се од дана када је потрошач примио образац за одустанак од уговора.

Ако трговац не обавести потрошача о подацима из члана 141. овог закона у писаној форми, на папиру, другом трајном носачу података или електронским путем, са потврдом пријема, потрошач има право да одустане од уговора односно предуговора о временски подељеном коришћењу непокретности, трајним олакшицама за одмор, помоћи приликом препродаје и омогућавању размене временски подељеног коришћења непокретности у року од три месеца и 14 дана, од дана када је примио примерак закљученог уговора односно предуговора.

Ако трговац достави потрошачу обавештење о подацима из члана 141. овог закона пре истека три месеца од дана када је потрошач примио примерак закљученог уговора односно предуговора, рок за одустанак од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности рачуна се од дана када је потрошач примио обавештење.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 146. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '146',
  NULL,
  $en$Article 146.

A statement whereby the consumer withdraws from the contract on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property produces legal effect if it is given in written form, on paper or on another durable data carrier.

The consumer may deliver the statement referred to in paragraph 1 of this Article to the trader on the form for withdrawal from the contract.

The statement referred to in paragraph 2 of this Article shall be deemed timely if it was sent before the expiry of the time limit for withdrawal from the contract.
$en$,
  $sr$Члан 146.

Изјава којом потрошач одустаје од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности производи правно дејство ако је дата у писаној форми, на папиру или на другом трајном носачу података.

Изјаву из става 1. овог члана потрошач може доставити трговцу на обрасцу за одустанак од уговора.

Изјава из става 2. овог члана сматра се благовременом ако је послата пре истека рока за одустанак од уговора.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 147. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '147',
  NULL,
  $en$Article 147.

By withdrawal from the contract, that is, the preliminary contract, on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property, the obligations of the contracting parties to perform, that is, to conclude, the contract cease.

The consumer has the right to withdraw from the contract without reimbursement of costs and is not obliged to pay for the services which were provided to him before the withdrawal from the contract, that is, the preliminary contract, on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property.
$en$,
  $sr$Члан 147.

Одустанком од уговора односно предуговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности, престају обавезе уговорних страна да изврше односно закључе уговор.

Потрошач има право да одустане од уговора без накнаде трошкова и није дужан да плати услуге које су му пружене пре одустанка од уговора односно предуговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 148. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '148',
  NULL,
  $en$Article 148.

In the case of a contract on the timeshare of immovable property, a contract on long-term holiday benefits, a contract on assistance in resale and a contract on facilitating the exchange of timeshare of immovable property, it is prohibited to agree advance payment, the provision of security, the reservation of money in accounts, an express acknowledgement of debt or other performance of an obligation towards the trader or a third person before the expiry of the time limit for withdrawal from the contract.

In the case of a contract on assistance in resale, it is prohibited to agree payment, the provision of security, an express acknowledgement of debt or other performance of an obligation towards the trader or a third person before the conclusion of the contract on the timeshare of immovable property and the contract on long-term holiday benefits, that is, before the trader otherwise fulfils the obligations under the contract on assistance in resale.
$en$,
  $sr$Члан 148.

Код уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности, забрањено је уговарање плаћања унапред, пружања средстава обезбеђења, резервисање новца на рачунима, изричитог признања дуга или другог извршења обавезе према трговцу или трећем лицу пре истека рока за одустанак од уговора.

Код уговора о помоћи приликом препродаје, забрањено је уговарање плаћања, пружања средстава обезбеђења, изричитог признања дуга или другог извршења обавезе према трговцу или трећем лицу пре закључења уговора о временски подељеном коришћењу непокретности и уговора о трајним олакшицама за одмор, односно пре него што трговац на други начин испуни обавезе из уговора о помоћи приликом препродаје.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 149. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '149',
  NULL,
  $en$Article 149.

In the case of a contract on long-term holiday benefits, the trader is obliged to enable the consumer to pay the price in instalments, in equal annual amounts, for the duration of the contract.

Payment contrary to paragraph 1 of this Article is prohibited.

The total amount of the consumer's obligations, including the membership fee, shall be calculated in equal annual instalments.

The trader is obliged to send the consumer a request for payment of each instalment in written form, on paper, on another durable data carrier or by electronic means, with confirmation of receipt, at the latest 14 days before the day on which it falls due.

After payment of the first instalment, the consumer may, without interest, withdraw from the contract on long-term holiday benefits by delivering to the trader notice of withdrawal from the contract, within a period of 14 days from the day of receipt of the request for payment of the instalment.
$en$,
  $sr$Члан 149.

Код уговора о трајним олакшицама за одмор трговац је дужан да потрошачу омогући плаћање цене у оброчним отплатама, у једнаким годишњим износима за време трајања уговора.

Забрањено је плаћање супротно ставу 1. овог члана.

Укупан износ потрошачевих обавеза, укључујући чланарину, обрачунава се у једнаким годишњим ратама.

Трговац је дужан да потрошачу пошаље захтев за плаћање сваке оброчне отплате у писаној форми, на папиру, другом трајном носачу података или електронским путем, са потврдом пријема, најкасније 14 дана пре дана њеног доспећа.

После исплате прве оброчне отплате, потрошач може без камате да одустане од уговора о трајним олакшицама за одмор достављањем обавештења о одустанку од уговора трговцу, у року од 14 дана од дана пријема захтева за плаћање рате.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 150. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '150',
  NULL,
  $en$Article 150.

If the consumer withdraws from the contract on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property, all linked contracts shall be deemed to cease to be valid without additional costs for the consumer, including a credit contract, regardless of whether the credit was granted to the consumer by the trader or by a third person.

If the credit was granted to the consumer by a third person, the trader is obliged to inform the grantor of the credit of the withdrawal from the contract on the timeshare of immovable property, the contract on long-term holiday benefits, the contract on assistance in resale and the contract on facilitating the exchange of timeshare of immovable property.
$en$,
  $sr$Члан 150.

Ако потрошач одустане од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности, сматра се да престају да важе сви повезани уговори без додатних трошкова за потрошача, укључујући уговор о кредиту, без обзира на то да ли је потрошачу кредит одобрио трговац или треће лице.

Ако је потрошачу кредит одобрило треће лице, трговац је дужан да обавести даваоца кредита о одустанку од уговора о временски подељеном коришћењу непокретности, уговора о трајним олакшицама за одмор, уговора о помоћи приликом препродаје и уговора о омогућавању размене временски подељеног коришћења непокретности.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 151. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '151',
  NULL,
  $en$Article 151.

The trader is obliged to provide the consumer with assistance in the resale of timeshare of immovable property, that is, of long-term holiday benefits.

If the trader does not provide the consumer with the assistance referred to in paragraph 1 of this Article, the consumer may request that the trader buy back the timeshare of immovable property or the long-term holiday benefits.
$en$,
  $sr$Члан 151.

Трговац је дужан да потрошачу пружи помоћ приликом препродаје временски подељеног коришћења непокретности односно трајних олакшица за одмор.

Ако трговац не пружи потрошачу помоћ из става 1. овог члана, потрошач може да захтева да трговац откупи временски подељено коришћење непокретности или трајне олакшице за одмор.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 152. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '152',
  NULL,
  $en$Article 152.

The trader, persons who on the instruction of the trader participate in the sale of time-shared use of immovable property, persons to whom the trader has entrusted the performance of certain tasks under the contract on the sale of time-shared use of immovable property, other traders who participate in the sale of services of time-shared use of immovable property, as well as intermediaries in the sale of services of time-shared use of immovable property, are jointly and severally liable to the consumer for performance and for the legal consequences of non-performance of contractual obligations.
$en$,
  $sr$Члан 152.

Трговац, лица која по налогу трговца учествују у продаји временски подељеног коришћења непокретности, лица којима је трговац поверио обављање одређених послова из уговора о продаји временски подељеног коришћења непокретности, остали трговци који учествују у продаји услуга временски подељеног коришћења непокретности, као и посредници у продаји услуга временски подељеног коришћења непокретности, солидарно су одговорни потрошачу за извршење и за правне последице неизвршења уговорних обавеза.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 153. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '153',
  NULL,
  $en$Public policy document

Article 153.

The public policy document determines the objectives and activities necessary for the comprehensive realisation of consumer protection policy.

The Government, on a proposal of the Ministry, adopts the public policy document.
$en$,
  $sr$Документ јавне политике

Члан 153.

Документом јавне политике утврђују се циљеви и активности неопходни ради целовитог остварења политике заштите потрошача.

Влада на предлог Министарства доноси документ јавне политике.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 154. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '154',
  NULL,
  $en$Holders of consumer protection

Article 154.

The holders of consumer protection are the National Assembly, the Government, the Ministry, the National Council for Consumer Protection, other ministries and regulatory bodies which have competences in the field of consumer protection laid down by law, the authorities of the autonomous province and of local self-government, as well as associations and alliances.

The holders of consumer protection referred to in paragraph 1 of this Article cooperate for the purpose of improving consumer protection, as well as in the implementation of public policy documents.
$en$,
  $sr$Носиоци заштите потрошача

Члан 154.

Носиоци заштите потрошача су Народна скупштина, Влада, Министарство, Национални савет за заштиту потрошача, друга министарства и регулаторна тела која имају законом утврђене надлежности у области заштите потрошача, органи аутономне покрајине и локалне самоуправе, као и удружења и савези.

Носиоци заштите потрошача из става 1. овог члана сарађују у циљу унапређења заштите потрошача, као и на спровођењу докумената јавне политике.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 155. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '155',
  NULL,
  $en$Cooperation in the field of consumer protection

Article 155.

Chambers of commerce and professional chambers, and associations which have been established for the purpose of protecting the rights of traders in the field of trade, encourage and promote consumer protection, in particular among their members.

For the purpose of improving consumer protection, the chambers of commerce and professional chambers and the associations referred to in paragraph 1 of this Article cooperate with the holders of consumer protection referred to in Article 154, paragraph 1 of this Law.
$en$,
  $sr$Сарадња у области заштите потрошача

Члан 155.

Привредне и професионалне коморе и удружења која су основана у циљу заштите права трговаца у области трговине подстичу и промовишу заштиту потрошача, нарочито међу својим члановима.

Ради унапређења заштите потрошача привредне и професионалне коморе и удружења из става 1. овог члана сарађују са носиоцима заштите потрошача из члана 154. став 1. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 156. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '156',
  NULL,
  $en$Tasks of the Ministry

Article 156.

The Ministry:

1) creates consumer protection policy;

2) conducts the procedure and determines measures for the protection of the collective interest of consumers;

3) submits a request for the initiation of misdemeanour proceedings for infringement of the collective interest of consumers;

4) monitors the implementation of consumer protection policy through other state policies;

5) cooperates and coordinates with the holders of consumer protection referred to in Article 154, paragraph 1 of this Law, as well as with all other entities engaged in consumer protection;

6) improves the legal framework of consumer protection and carries out harmonisation with the regulations of the European Union in the field of consumer protection;

7) ensures the application of regulations and carries out coordination of market surveillance in the field of consumer protection;

8) prepares and submits to the Government for adoption public policy documents;

9) monitors and evaluates the success of the implementation of public policy documents;

10) performs expert and administrative tasks for the needs of the National Council for Consumer Protection;

11) supports the work and development of bodies for the out-of-court resolution of consumer disputes;

12) supports the work and development of associations and alliances;

13) cooperates with the authorities of provincial and local self-government on the development of consumer protection at the provincial and local level;

14) cooperates with institutions engaged in consumer protection at the regional and international level;

15) encourages and carries out educational and informational activities aimed at increasing the awareness of consumers and of the public of consumer rights and of consumer protection policy;

16) promotes research and scientific projects in the field of consumer protection;

17) manages and exercises supervision over the National Register of Consumer Complaints established in accordance with Article 169 of this Law;

18) monitors the market for the purpose of identifying unfair business practices and unfair terms in consumer contracts;

19) gives opinions and recommendations with regard to unfair business practices and unfair terms in consumer contracts;

20) encourages the adoption of codes of good business practice by chambers of commerce and professional chambers and associations of traders.
$en$,
  $sr$Послови Министарства

Члан 156.

Министарство:

1) креира политику заштите потрошача;

2) спроводи поступак и одређује мере заштите колективног интереса потрошача;

3) подноси захтев за покретање прекршајног поступка због повреде колективног интереса потрошача;

4) прати спровођење политике заштите потрошача кроз друге државне политике;

5) сарађује и координира са носиоцима заштите потрошача из члана 154. став 1. овог закона, као и свим осталим субјектима који се баве заштитом потрошача;

6) унапређује правни оквир заштите потрошача и врши усклађивање са прописима Европске уније у области заштите потрошача;

7) обезбеђује примену прописа и врши координацију надзора над тржиштем у области заштите потрошача;

8) припрема и подноси Влади на усвајање документе јавне политике;

9) прати и оцењује успешност спровођења докумената јавне политике;

10) обавља стручне и административне послове за потребе Националног савета за заштиту потрошача;

11) подржава рад и развој тела за вансудско решавање потрошачких спорова;

12) подржава рад и развој удружења и савеза;

13) сарађује са органима покрајинске и локалне самоуправе на развоју заштите потрошача на покрајинском и локалном нивоу;

14) сарађује са институцијама које се баве заштитом потрошача на регионалном и међународном нивоу;

15) подстиче и спроводи едукативне и информативне активности усмерене на повећање свести потрошача и јавности о правима потрошача и политици заштите потрошача;

16) промовише истраживања и научне пројекте у области заштите потрошача;

17) управља и врши надзор над Националним регистром потрошачких приговора успостављеним у складу са чланом 169. овог закона;

18) прати тржиште ради препознавања непоштене пословне праксе и неправичних одредаба у потрошачким уговорима;

19) даје мишљења и препоруке у погледу непоштене пословне праксе и неправичних одредаба у потрошачким уговорима;

20) подстиче доношење кодекса добре пословне праксе од стране привредних и професионалних комора и удружења трговаца.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 157. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '157',
  NULL,
  $en$National Council for Consumer Protection

Article 157.

For the purpose of improving the system of consumer protection and cooperation between the holders of consumer protection and other entities engaged in consumer protection, the Government establishes the National Council for Consumer Protection (hereinafter: the National Council).

The National Council in particular performs the following tasks:

1) participates in the drafting of public policy documents;

2) reports to the Government on the state of affairs in the field of consumer protection and on the implementation of public policy documents;

3) proposes measures and activities for the improvement of consumer protection;

4) gives opinions and recommendations on matters in the field of consumer protection to the holders of consumer protection;

5) informs the public of its work and of matters of significance for consumer protection.
$en$,
  $sr$Национални савет за заштиту потрошача

Члан 157.

Ради унапређења система заштите потрошача и сарадње носилаца заштите потрошача и других субјеката који се баве заштитом потрошача, Влада образује Национални савет за заштиту потрошача (у даљем тексту: Национални савет).

Национални савет нарочито обавља следеће послове:

1) учествује у изради докумената јавне политике;

2) извештава Владу о стању у области заштите потрошача и спровођењу докумената јавне политике;

3) предлаже мере и активности за унапређење заштите потрошача;

4) даје мишљења и препоруке о питањима из области заштите потрошача носиоцима заштите потрошача;

5) обавештава јавност о свом раду и питањима од значаја за заштиту потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 158. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '158',
  NULL,
  $en$Composition of the National Council

Article 158.

The National Council is composed of representatives of the Ministry and of other state authorities and holders of public powers, of recorded associations and alliances, of chambers of commerce and professional chambers and of other market participants, as well as independent experts in the field of consumer protection.

The standing members of the National Council are representatives of the Ministry, the ministry responsible for food safety, the ministry responsible for product safety, the ministry responsible for health, the ministry responsible for energy, the ministry responsible for telecommunications, the ministry responsible for justice, the ministry responsible for finance, the ministry responsible for tourism and the ministry responsible for environmental protection.

One third of the total number of members of the National Council consists of representatives of recorded associations and alliances.

The Consumer Council referred to in Article 168 of this Law, within a period of 30 days from the day of receipt of the request of the Ministry, proposes members of the National Council from among recorded associations and alliances.

The Minister presides over the National Council.
$en$,
  $sr$Састав Националног савета

Члан 158.

Национални савет чине представници Министарства и других државних органа и носилаца јавних овлашћења, евидентираних удружења и савеза, привредних и професионалних комора и других учесника на тржишту, као и независни стручњаци из области заштите потрошача.

Сталне чланове Националног савета чине представници Министарства, министарства надлежног за безбедност хране, министарства надлежног за безбедност производа, министарства надлежног за здравље, министарства надлежног за енергетику, министарства надлежног за телекомуникације, министарства надлежног за правосуђе, министарства надлежног за финансије, министарства надлежног за туризам и министарства надлежног за заштиту животне средине.

Једну трећину од укупног броја чланова Националног савета чине представници евидентираних удружења и савеза.

Савет потрошача из члана 168. овог закона, у року од 30 дана од дана пријема захтева Министарства, предлаже чланове Националног савета из реда евидентираних удружења и савеза.

Министар председава Националним саветом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 159. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '159',
  NULL,
  $en$Activities of the authorities of the autonomous province and of the local self-government unit

Article 159.

The authorities of the autonomous province and of the local self-government unit undertake activities within their competence for the purpose of improving consumer protection, and in particular:

1) support the activities of associations and alliances with regard to securing financial resources, appropriate premises and other conditions necessary for work, in accordance with the regulations on the financing of programmes of public interest which associations implement;

2) encourage and support activities directed at consumer protection, and especially the informing, counselling and education of consumers;

3) encourage and support the participation of representatives of consumers in all bodies which, at the provincial and local level, adopt decisions in areas of significance for consumers, such as services of general economic interest;

4) plan and implement activities in the field of consumer protection on their territory, in accordance with the public policy document;

5) support the establishment and work of bodies for the out-of-court resolution of consumer disputes on their territory.
$en$,
  $sr$Активности органа аутономне покрајине и јединице локалне самоуправе

Члан 159.

Органи аутономне покрајине и јединице локалне самоуправе предузимају активности из своје надлежности у циљу унапређења заштите потрошача, а нарочито:

1) подржавају активности удружења и савеза у погледу обезбеђивања финансијских средстава, одговарајућих просторија и осталих неопходних услова за рад, у складу са прописима о финансирању програма од јавног интереса које реализују удружења;

2) подстичу и подржавају активности усмерене на заштиту потрошача, а посебно информисање, саветовање и едукацију потрошача;

3) подстичу и подржавају учешће представника потрошача у свим телима која на покрајинском и локалном нивоу доносе одлуке у областима од значаја за потрошаче, као што су услуге од општег економског интереса;

4) планирају и спроводе активности у области заштите потрошача на својој територији, у складу са документом јавне политике;

5) подржавају оснивање и рад тела за вансудско решавање потрошачких спорова на својој територији.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 160. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '160',
  NULL,
  $en$Associations and alliances

Article 160.

Associations and alliances within the meaning of this Law are associations, that is, alliances, which have been established and entered in the register in accordance with the law governing the establishment and legal status of associations and which fulfil the following conditions:

1) that they are established for the purpose of realising the objectives of consumer protection;

2) that they are non-profit and independent, in particular in relation to traders and political parties;

3) that a person in a managerial position in the association, that is, the alliance, is not:

(1) a person employed in a state authority or a regulatory body, that is, in an authority of the autonomous province or an authority of a local self-government unit, which deal with consumer protection tasks;

(2) a person in a managerial position or a member of a supervisory body at a trader or in an association of traders;

(3) a person in a managerial position in a political party.

If an association, that is, an alliance of associations, states in its name that it is an association, that is, an alliance of associations for consumer protection, and does not fulfil the conditions referred to in paragraph 1 of this Article, such associations, that is, alliances, may not exercise the rights under Article 165 of this Law.
$en$,
  $sr$Удружења и савези

Члан 160.

Удружења и савези у смислу овог закона су удружења односно савези који су основани и уписани у регистар у складу са законом којим се уређује оснивање и правни положај удружења и који испуњавају следеће услове:

1) да се оснивају ради остваривања циљева заштите потрошача;

2) да су недобитна и независна, нарочито у односу на трговце и политичке странке;

3) да лице на руководећем положају у удружењу, односно савезу није:

(1) лице запослено у државном органу или регулаторном телу, односно у органу аутономне покрајине или органу јединице локалне самоуправе који се баве пословима заштите потрошача;

(2) лице на руководећем положају или члан надзорног органа код трговца или у удружењу трговаца;

(3) лице на руководећем положају у политичкој странци.

Ако удружење, односно савез удружења у свом називу наведе да је удружење, односно савез удружења за заштиту потрошача, а не испуњава услове из става 1. овог члана, таква удружења, односно савези не могу остваривати права из члана 165. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 161. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '161',
  NULL,
  $en$Activities of associations and alliances

Article 161.

Associations and alliances carry out their activities in accordance with the law and the statute. The activities of associations and alliances in particular include:

1) informing, education, counselling and the provision of legal assistance to consumers in the exercise of consumer rights;

2) receiving, recording and acting upon consumer complaints;

3) conducting independent tests and comparative analyses of the quality of goods and services and publicly publishing the results obtained;

4) conducting research and studies in the field of consumer protection and publicly publishing the results obtained.
$en$,
  $sr$Активности удружења и савеза

Члан 161.

Удружења и савези обављају своје активности у складу са законом и статутом. Активности удружења и савеза нарочито обухватају:

1) информисање, едукацију, саветовање и пружање правне помоћи потрошачима у остваривању потрошачких права;

2) примање, евидентирање и поступање по приговорима потрошача;

3) спровођење независних испитивања и упоредних анализа квалитета роба и услуга и јавно објављивање добијених резултата;

4) спровођење истраживања и студија у области заштите потрошача и јавно објављивање добијених резултата.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 162. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '162',
  NULL,
  $en$Records of associations and alliances

Article 162.

The Ministry establishes and keeps the Records of Associations and Alliances (hereinafter: the Records).

The Records are published publicly on the official internet page of the Ministry.

The Records contain the name of the association or alliance, the registered office, the electronic address, the internet page address, the date of entry in the Records, the date of deletion from the Records, contact telephone numbers, annual reports on activities carried out and the annual financial reports of associations and alliances.
$en$,
  $sr$Евиденција удружења и савеза

Члан 162.

Министарство установљава и води Евиденцију удружења и савеза (у даљем тексту: Евиденција).

Евиденција се јавно објављује на званичној интернет страници Министарства.

Евиденција садржи назив удружења или савеза, седиште, електронску адресу, адресу интернет странице, датум уписа у Евиденцију, датум брисања из Евиденције, контакт телефоне, годишње извештаје о спроведеним активностима и годишње финансијске извештаје удружења и савеза.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 163. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '163',
  NULL,
  $en$Procedure for entry in the Records

Article 163.

Entry of associations and alliances in the Records is carried out by the Ministry.

Associations, that is, alliances, submit an application to the Ministry for entry in the Records.

The application referred to in paragraph 2 of this Article in particular contains: the name of the association or alliance, the registration number of the association, that is, of the alliance, as well as appropriate evidence that the association, that is, the alliance, fulfils the conditions prescribed by Articles 160 and 161 and by Article 164 of this Law.

The Minister prescribes in greater detail the content of the application referred to in paragraph 2 of this Article, the manner of keeping the Records, as well as the conditions for entry referred to in Article 164, paragraph 1, points 3) and 4) of this Law.
$en$,
  $sr$Поступак уписа у Евиденцију

Члан 163.

Упис удружења и савеза у Евиденцију врши Министарство.

Удружења, односно савези подносе пријаву Министарству, ради уписа у Евиденцију.

Пријава из става 2. овог члана нарочито садржи: назив удружења или савеза, матични број удружења, односно савеза, као и одговарајуће доказе да удружење, односно савез испуњава услове прописане чл. 160. и 161. и чланом 164. овог закона.

Министар ближе прописује садржину пријаве из става 2. овог члана, начин вођења Евиденције, као и услове за упис из члана 164. став 1. тач. 3) и 4) овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 164. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '164',
  NULL,
  $en$Conditions for entry in the Records

Article 164.

For the entry of an association, that is, an alliance, in the Records, in addition to the conditions referred to in Article 160 of this Law, it is necessary that the association, that is, the alliance, also fulfil the following conditions:

1) that the field of realisation of objectives is consumer protection;

2) that it has been active in the field of consumer protection for at least three years from entry in the register in accordance with the law governing the establishment and legal status of associations;

3) that it has at its disposal appropriate personnel, material and technical capacities necessary for the performance of the activity of consumer protection;

4) that persons in managerial positions and employees in the association, that is, the alliance, possess appropriate experience, expertise and skill for the performance of the activity in the field of consumer protection;

5) that it submits to the Ministry a report on activities carried out and results achieved in the field of consumer protection, including the accompanying financial report, whereby experience in this field over a period of at least three years is confirmed.

For the entry of an alliance in the Records it is necessary that the alliance consist of at least three associations.

When determining the fulfilment of the conditions for entry in the Records, the Ministry is obliged to request the opinion of the Consumer Council referred to in Article 168 of this Law.

At the request of the Ministry, the Consumer Council submits the opinion referred to in paragraph 3 of this Article to the Ministry within a period of 15 days from the day of receipt of the request.

The Ministry continues the procedure for entry in the Records if the Consumer Council does not submit the opinion within the time limit referred to in paragraph 4 of this Article.
$en$,
  $sr$Услови за упис у Евиденцију

Члан 164.

За упис удружења, односно савеза у Евиденцију, поред услова из члана 160. овог закона, потребно је да удружење, односно савез испуњава и следеће услове:

1) да је област остваривања циљева заштита потрошача;

2) дa je у области заштите потрошача активнo најмање три године од уписа у регистар у складу са законом којим се уређује оснивање и правни положај удружења;

3) да располаже одговарајућим кадровским, материјалним и техничким капацитетима неопходним за обављање делатности заштите потрошача;

4) дa лица на руководећем положају и запослени у удружењу, односно савезу поседују одговарајуће искуство, стручност и вештину за обављање делатности у области заштите потрошача;

5) да достави извештај Министарству о спроведеним активностима и постигнутим резултатима у области заштите потрошача, укључујући и пратећи финансијски извештај, чиме се потврђује искуство у овој области у периоду од најмање три године.

За упис савеза у Евиденцију неопходно је да савез чине најмање три удружења.

Приликом утврђивања испуњености услова за упис у Евиденцију, Министарство је дужно да затражи мишљење Савета потрошача из члана 168. овог закона.

На захтев Министарства, Савет потрошача мишљење из става 3. овог члана доставља Министарству у року од 15 дана од дана пријема захтева.

Министарство наставља поступак уписа у Евиденцију ако Савет потрошача не достави мишљење у року из става 4. овог члана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 165. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '165',
  NULL,
  $en$Rights of recorded associations and alliances

Article 165.

Associations, that is, alliances, which have been entered in the Records in accordance with this Law, have the right:

1) to compete with a programme of public interest for incentive funds of the Ministry;

2) to initiate a procedure for the protection of the collective interest of consumers in accordance with this Law;

3) to represent the interests of consumers in judicial and out-of-court proceedings;

4) to represent the interests of consumers in consultative bodies in the field of consumer protection at the national, regional and local level;

5) to participate in the work of working groups for the preparation of regulations and strategic documents which regulate consumer rights;

6) to have access to the use of the National Register of Consumer Complaints referred to in Article 169 of this Law, for the purpose of receiving, recording and acting upon consumer complaints;

7) to participate in the work of the Consumer Council referred to in Article 168 of this Law.
$en$,
  $sr$Права евидентираних удружења и савеза

Члан 165.

Удружења, односно савези који су уписани у Евиденцију у складу са овим законом, имају право:

1) да конкуришу са програмом од јавног интереса за подстицајна средства Министарства;

2) на покретање поступка за заштиту колективног интереса потрошача у складу са овим законом;

3) да заступају интересе потрошача у судским и вансудским поступцима;

4) да заступају интересе потрошача у консултативним телима у области заштите потрошача на националном, регионалном и локалном нивоу;

5) на учествовање у раду радних група за припрему прописа и стратешких докумената којима се уређују права потрошача;

6) на приступ коришћењу Националног регистра потрошачких приговора из члана 169. овог закона, у циљу примања, евидентирања и поступања по приговорима потрошача;

7) да учествују у раду Савета потрошача из члана 168. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 166. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '166',
  NULL,
  $en$Financing of associations and alliances

Article 166.

The activities of recorded associations, that is, alliances, may be financed or co-financed from the budget of the Republic of Serbia, in accordance with the law, the public policy document and the Work Plan of the Government.

European and international projects in the field of consumer protection which are led by recorded associations, that is, alliances, may be co-financed from the budget of the Republic of Serbia.

Recorded associations, that is, alliances, are obliged to submit to the Ministry a financial report on the activities financed in accordance with paragraphs 1 and 2 of this Article by 31 March of the current year for the previous year, and the Ministry publishes those reports on its internet page.

It is prohibited for associations, that is, alliances, to receive monetary and other resources, things, rights and services, except gifts of small value, including any form of donations and non-repayable assistance, from natural and legal persons with whom a conflict of interest exists, and in particular from traders or associations of traders, except in cases of the provision of services for a fee (training and the like) in accordance with the law and the statute of the association, that is, the alliance.

A conflict of interest within the meaning of paragraph 5 of this Article exists when a person, in the capacity of a representative, a body or a member of a body of an association, that is, an alliance, has a private, business or other interest which affects or may affect the conduct of the person in the stated capacity in a manner which may jeopardise the independence of the association, that is, the alliance, in the realisation of the objectives for which it was established.
$en$,
  $sr$Финансирање удружења и савеза

Члан 166.

Aктивности евидентираних удружења, односно савеза могу да се финансирају или суфинансирају из буџета Републике Србије, у складу са законом, документом јавне политике и Планом рада Владе.

Европски и међународни пројекти у области заштите потрошача које воде евидентирана удружења, односно савези могу да се суфинансирају из буџета Републике Србије.

Евидентирана удружења, односно савези дужни су да доставе Министарству финансијски извештај о активностима финансираним у складу са ст. 1. и 2. овог члана до 31. марта текуће године за претходну годину, а Министарство те извештаје објављује на својој интернет страници.

Забрањено је да удружења, односно савези примају новчана и друга средства, ствари, права и услуге, осим поклона мање вредности, укључујући сваки облик донација и бесповратне помоћи, од физичких и правних лица с којима постоји сукоб интереса, а нарочито од трговаца или удружења трговаца, осим у случајевима пружања услуга уз накнаду (обука и сл.) у складу са законом и статутом удружења, односно савеза.

Сукоб интереса у смислу става 5. овог члана постоји када лице у својству представника, органа или члана органа удружења, односно савеза, има приватни, пословни или други интерес који утиче или може да утиче на поступање лица у наведеном својству на начин који може да угрози независност удружења, односно савеза у остваривању циљева за које је основан.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 167. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '167',
  NULL,
  $en$Deletion from the Records

Article 167.

An association, that is, an alliance, is deleted from the Records if:

1) it ceases to fulfil the conditions referred to in Articles 160 and 164 or acts contrary to Article 166, paragraphs 3 and 4 of this Law;

2) it does not designate its representative as a member of an advisory body and of a commission for the resolution of consumer complaints at the invitation of a holder of public powers, a local self-government unit or a trader, except in justified cases;

3) it does not publish the list in the manner and within the time limit referred to in Article 104, paragraph 9 of this Law;

4) it does not submit to the Ministry an annual report on the activities carried out and the results achieved in the field of consumer protection, including the accompanying financial report, in accordance with Article 166, paragraph 3 of this Law, by 31 March of the current year for the previous year;

5) it violates the code of ethics referred to in Article 168, paragraph 2, point 3) of this Law. The Ministry decides on deletion from the Records.

When determining the fulfilment of the conditions for deletion from the Records, the Ministry is obliged to request the opinion of the Consumer Council referred to in Article 168 of this Law.

The Consumer Council submits its opinion referred to in paragraph 3 of this Article to the Ministry within a period of 15 days from the day on which the Ministry requested that opinion.

In the event that the Consumer Council does not submit the opinion referred to in paragraph 3 of this Article, the Ministry continues the procedure of deletion from the Records.

A deleted association may not be entered again in the Records within a period of one year from the day of deletion.
$en$,
  $sr$Брисање из Евиденције

Члан 167.

Удружење, односно савез брише се из Евиденције ако:

1) престане да испуњава услове из чл. 160. и 164. или поступи супротно члану 166. ст. 3. и 4. овог закона;

2) не одреди свог представника за члана саветодавног тела и комисије за решавање рекламација потрошача на позив имаоца јавних овлашћења, јединице локалне самоуправе или трговца, осим у оправданим случајевима;

3) не објави списак на начин и у року из члана 104. став 9. овог закона;

4) не достави годишњи извештај Министарству о спроведеним активностима и постигнутим резултатима у области заштите потрошача, укључујући и пратећи финансијски извештај, у складу с чланом 166. став 3. овог закона, до 31. марта текуће године за претходну годину;

5) нарушава етички кодекс из члана 168. став 2. тачка 3) овог закона. О брисању из Евиденције одлучује Министарство.

Приликом утврђивања испуњености услова за брисање из Евиденције, Министарство је дужно да затражи мишљење Савета потрошача из члана 168. овог закона.

Савет потрошача своје мишљење из става 3. овог члана доставља Министарству у року од 15 дана од дана када је Министарство затражило то мишљење.

У случају да Савет потрошача не достави мишљење из става 3. овог члана, Министарство наставља поступак брисања из Евиденције.

Брисано удружење не може бити поново уписано у Евиденцију у року од годину дана од дана брисања.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 168. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '168',
  NULL,
  $en$Consumer Council

Article 168.

Representatives of all associations, that is, alliances, which have been entered in the Records referred to in Article 162 of this Law constitute the Consumer Council.

The Consumer Council performs the following tasks:

1) harmonises the positions of associations, that is, alliances, on essential matters for consumers;

2) proposes representatives of associations, that is, alliances, to the National Council and to other bodies;

3) adopts a code of ethics of associations, that is, alliances, and monitors its implementation;

4) gives an opinion to the Ministry in the procedure of entry in and deletion from the Records referred to in Articles 162 and 167 of this Law;

5) adopts a recommendation on the deletion of associations and alliances from the Records of the Ministry;

6) considers other matters as well, in accordance with the law and the rules of procedure.

The Consumer Council adopts rules of procedure.

Decisions of the Consumer Council are published by the Ministry on its internet page and by recorded associations, that is, alliances, on their internet pages.
$en$,
  $sr$Савет потрошача

Члан 168.

Представници свих удружења, односно савеза који су уписани у Евиденцију из члана 162. овог закона чине Савет потрошача.

Савет потрошача обавља следеће послове:

1) усаглашава ставове удружења, односно савеза о битним питањима за потрошаче;

2) предлаже представнике удружења, односно савеза у Национални савет и друге органе;

3) доноси етички кодекс удружења, односно савеза и прати његово спровођење;

4) даје мишљење Министарству у поступку уписа и брисања из Евиденције из чл. 162. и 167. овог закона;

5) доноси препоруку о брисању удружења и савеза из Евиденције Mинистарства;

6) разматра и друга питања у складу са законом и пословником о раду.

Савет потрошача доноси пословник о раду.

Одлуке Савета потрошача објављује Министарство на својој интернет страници и евидентирана удружења, односно савези на својим интернет страницама.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 169. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '169',
  NULL,
  $en$Article 169.

A consumer complaint is any petition or grievance by which the consumer reports an infringement of a right regulated by this or another law.

The Ministry establishes and keeps the National Register of Consumer Complaints, which constitutes a single central electronic database of consumer complaints.

When processing the personal data of consumers, the Ministry shall act in accordance with the regulations governing the protection of personal data.

Once a year, at the latest by 1 March of the current year for the previous year, the Ministry publicly publishes and submits to the National Council a report on the work of the National Register of Consumer Complaints.

The report on the work of the National Register of Consumer Complaints in particular contains:

1) data on consumer complaints and on the legal assistance provided;

2) shortcomings identified in the collection, recording and resolution of consumer complaints;

3) the areas in which the greatest number of consumer complaints has been recorded;

4) proposals for the improvement of the procedure for the collection of data, the recording and the resolution of consumer disputes.
$en$,
  $sr$Члан 169.

Потрошачки приговор је свака представка или притужба којом потрошач пријављује повреду права уређену овим или другим законом.

Министарство установљава и води Национални регистар потрошачких приговора, који представља јединствену централну електронску базу података о потрошачким приговорима.

Приликом обраде података о личности потрошача, Министарство поступа у складу са прописима којима се уређује заштита података о личности.

Једном годишње, најкасније до 1. марта текуће године за претходну годину, Министарство јавно објављује и доставља Националном савету извештај о раду Националног регистра потрошачких приговора.

Извештај о раду Националног регистра потрошачких приговора нарочито садржи:

1) податке о приговорима потрошача и пруженој правној помоћи;

2) уочене недостатке у прикупљању, евиденцији и решавању потрошачких приговора;

3) области у којима је забележен највећи број приговора потрошача;

4) предлоге за унапређење поступка за прикупљање података, евиденцију и решавање потрошачких спорова.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 170. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '170',
  NULL,
  $en$Article 170.

A consumer dispute is a domestic or cross-border dispute which arises from a contractual or non-contractual relationship between a consumer and a trader.

A domestic dispute is any consumer dispute referred to in paragraph 1 of this Article in which, at the time of conclusion of the contract, the consumer has a place of residence or a place of temporary residence, and the trader has a registered office or a separate organisational unit, in the Republic of Serbia.

A cross-border dispute is any consumer dispute referred to in paragraph 1 of this Article in which, at the time of conclusion of the contract, the trader has a registered office or a separate organisational unit in the Republic of Serbia, and the consumer has neither a place of residence nor a place of temporary residence in the Republic of Serbia.

The courts competent for the resolution of consumer disputes are obliged to keep records of consumer disputes. On the basis of the records, the courts once a year submit data on the number of consumer disputes, of judgments rendered and on the average duration of consumer disputes to the ministry responsible for justice affairs, on the prescribed form, at the latest by 31 March of the current year for the previous year. The ministry responsible for justice affairs submits the consolidated data on the prescribed form to the Ministry at the latest by 30 April of the current year for the previous year.

The Minister responsible for justice affairs prescribes in greater detail the content and the manner of keeping the records and the appearance of the forms referred to in paragraph 4 of this Article.

In a consumer dispute, the consumer does not pay a court fee for the statement of claim and the judgment, within the meaning of the law governing civil proceedings, if the value of the subject matter of the dispute does not exceed the amount of 500,000 dinars.
$en$,
  $sr$Члан 170.

Потрошачки спор је домаћи или прекогранични спор који произлази из уговорнoг или вануговорног односа потрошача и трговца.

Домаћи спор је сваки потрошачки спор из става 1. овог члана, у ком у време закључења уговора потрошач има пребивалиште или боравиште, а трговац седиште или издвојен организациони део у Републици Србији.

Прекогранични спор је сваки потрошачки спор из става 1. овог члана, у ком у време закључења уговора трговац има седиште или издвојен организациони део у Републици Србији, а потрошач нема ни пребивалиште ни боравиште у Републици Србији.

Судови надлежни за решавање потрошачких спорова дужни су да воде евиденцију потрошачких спорова. Судови на основу евиденције једном годишње достављају податке о броју потрошачких спорова, донетих пресуда и просечној дужини трајања потрошачких спорова министарству надлежном за послове правосуђа, на прописаном обрасцу, најкасније до 31. марта текуће године за претходну годину. Министарство надлежно за послове правосуђа обједињене податке на прописаном обрасцу доставља Министарству најкасније до 30. априла текуће године за претходну годину.

Министар надлежан за послове правосуђа ближе прописује садржину и начин вођења евиденције и изглед образаца из става 4. овог члана.

У потрошачком спору, потрошач не плаћа судску таксу за тужбу и пресуду, у смислу закона којим се уређује парнични поступак, ако вредност предмета спора не прелази износ од 500.000 динара.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 171. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '171',
  NULL,
  $en$Article 171.

A consumer dispute may be resolved by the out-of-court resolution of consumer disputes.

The out-of-court resolution of consumer disputes within the meaning of this Law is carried out in a transparent, efficient, fast and fair manner before a body for the out-of-court resolution of consumer disputes (hereinafter: the body).

The Minister regulates in greater detail the conditions for entry on the list of bodies, the duties of a body, reporting on work, the fee for the work of a body, the manner of payment, as well as the form of the application for entry on the list referred to in Article 172, paragraph 2 of this Law and the form of the proposal for the initiation of a procedure for the out-of-court resolution of a dispute (hereinafter: the proposal).

The out-of-court resolution of consumer disputes, within the meaning of this Law, does not apply:

1) in the field of medical services which are provided to patients for the purpose of treatment, including the issuing of prescriptions;

2) in the field of the provision of services of general interest which are not of an economic nature;

3) in connection with contracts concluded with public providers of services in the field of higher education;

4) in consumer disputes which are the subject of this Law, if the out-of-court resolution of disputes is regulated by a special law, and in particular in the field of the provision of electronic communications services, postal services and financial services, except financial arrangements;

5) for the resolution of disputes under procedures which the trader himself has established;

6) to direct negotiations between the consumer and the trader;

7) to an attempt at conciliation of the parties in connection with a dispute in civil proceedings;

8) in procedures which the trader has initiated against the consumer.
$en$,
  $sr$Члан 171.

Потрошачки спор може се решити вансудским решавањем потрошачких спорова.

Вансудско решавање потрошачких спорова у смислу овог закона обавља се на транспарентан, ефикасан, брз и правичан начин пред телом за вансудско решавање потрошачких спорова (у даљем тексту: тело).

Министар ближе уређује услове за упис на листу тела, дужности тела, извештавање о раду, накнаду за рад тела, начин исплате као и образац захтева за упис на листу из члана 172. став 2. овог закона и образац предлога за покретање поступка вансудског решавања спора (у даљем тексту: предлог).

Вансудско решавање потрошачких спорова, у смислу овог закона, не примењује се:

1) у области медицинских услуга које се пружају пацијентима у сврху лечења, укључујући издавање рецепата;

2) у области пружања услуга од општег интереса које нису економске природе;

3) у вези са закљученим уговорима са јавним пружаоцима услуга у области високошколског образовања;

4) у потрошачким споровима који су предмет овог закона, ако је вансудско решавање спорова уређено посебним законом, а нарочито у области пружања електронских комуникационих услуга, поштанских услуга, финансијских услуга, осим финансијских погодби;

5) за решавање спорова по процедурама које је установио сам трговац;

6) на непосредне преговоре између потрошача и трговца;

7) на покушај мирења страна поводом спора у парничном поступку;

8) у поступцима које је трговац покренуо против потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 172. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '172',
  NULL,
  $en$Article 172.

Bodies cooperate for the purpose of harmonised conduct, uniformity and the exchange of good practice.

The Ministry draws up and keeps a list of bodies and publishes it publicly.

Bodies are persons who have the capacity of a mediator, in accordance with the law governing mediation in the resolution of disputes, who have graduated from a faculty of law, who have acquired, after graduation, two years of experience in civil-law matters, and who have been entered on the list of bodies referred to in paragraph 2 of this Article.

The list of bodies for the out-of-court resolution of consumer disputes contains:

1) the name, address and internet address of all bodies for the out-of-court resolution of consumer disputes;

2) data on the natural persons who are responsible for the resolution of disputes and on their professional experience;

3) the average duration of a dispute;

4) the language, that is, the languages, in which a complaint may be lodged and the procedure conducted;

5) the rules of procedure, if they have them;

6) the reasons for which a body may refuse the out-of-court resolution of a consumer dispute;

7) the rate of concluded agreements on the resolution of a dispute in relation to the total number of procedures initiated in the previous year.

Once a year, at the latest by 31 January of the current year for the previous year, bodies are obliged to publish publicly on their internet page, if they have one, and to submit to the Ministry a report which contains data on the number of proposals received for the initiation of a dispute, of disputes initiated and concluded, and on the outcome of concluded disputes (the number of procedures discontinued, of recommendations issued and of agreements concluded on the resolution of a dispute), the type of dispute, the average duration of a dispute, the rate of enforced decisions of the body and significant problems identified which frequently recur and lead to disputes between consumers and traders, together with possible recommendations on how to avoid or resolve them.

A body is deleted from the list referred to in paragraph 2 of this Article if:

1) it ceases to fulfil the conditions for entry on the list of bodies;

2) it does not submit the report within the time limit or with the prescribed data referred to in paragraph 5 of this Article;

3) it does not submit the petition referred to in Article 174, paragraph 2, point 4) of this Law;

4) it does not conclude a dispute within a period of 90, that is, 180 days;

5) it does not take up the submitted proposal for the initiation of a procedure for the out-of-court resolution of a consumer dispute within a period of seven days from the day of its receipt;

6) it does not enter all submitted proposals for the initiation of a procedure for the out-of-court resolution of a consumer dispute in the information system which is accessed through the internet page of the Ministry, within the time limit and in the manner prescribed by this Law.

A body which has been deleted from the List of bodies may not be entered again on the List within a period of one year from the day of deletion from the List.

A body which has been deleted from the List of bodies is obliged to inform the consumer on whose proposal a procedure for the out-of-court resolution of a dispute has been initiated which has not been concluded by the moment of receipt of the decision on deletion, that, within a period of five days from the day of receipt of that notification, he may submit a new proposal to another body which is on the List of bodies.
$en$,
  $sr$Члан 172.

Тела сарађују у циљу усклађеног поступања, уједначавања и размене добре праксе.

Министарство сачињава и води листу тела и јавно је објављује.

Тела су лица која имају својство посредника, у складу са законом којим се уређује посредовање у решавању спорова, која су дипломирала на правном факултету, стекла након дипломирања две године искуства у грађанскоправној материји и која су уписана у листу тела из става 2. овог члана.

Листа тела за вансудско решавање потрошачких спорова садржи:

1) назив, адресу и интернет адресу свих тела за вансудско решавање потрошачких спорова;

2) податке о физичким лицима која су задужена за решавање спорова и њиховом професионалном искуству;

3) просечну дужину трајања спора;

4) језик, односно језике на којима се може поднети приговор и водити поступак;

5) пословник о раду, уколико га поседују;

6) разлоге због којих тело може да одбије вансудско решавање потрошачког спора;

7) стопу закључених споразума о решавању спора у односу на укупан број покренутих поступака у претходној години.

Једном годишње, најкасније до 31. јануара текуће године за претходну годину, тела су дужна да јавно објаве на својој интернет страници уколико је имају и доставе Министарству извештај који садржи податке о броју примљених предлога за покретање спора, покренутих, окончаних спорова и исходу окончаних спорова (број обустављених поступака, донетих препорука и закључених споразума о решавању спора), врсти спора, просечној дужини трајања спора, стопи извршених одлука тела и уоченим значајним проблемима који се често понављају и доводе до спорова између потрошача и трговаца, уз евентуалне препоруке како их избећи или решити.

Тело се брише са листе из става 2. овог члана ако:

1) престане да испуњава услове за упис у листу тела;

2) не достави извештај у року или са прописаним подацима из става 5. овог члана;

3) не поднесе представку из члана 174. став 2. тачка 4) овог закона;

4) не оконча спор у року од 90, односно 180 дана;

5) не узме у рад достављени предлог за покретање поступка вансудског решавања потрошачког спора у року од седам дана од дана пријема истог;

6) не унесе све достављене предлоге за покретање поступка вансудског решавања потрошачког спора у информациони систем којем се приступа преко интернет странице Министарства у року и на начин прописан овим законом.

Тело које је избрисано са Листе тела не може бити поново уписано у Листу у року од годину дана од дана брисања са Листе.

Тело које је избрисано са Листе тела дужно је да обавести потрошача по чијем предлогу је покренут поступак за вансудско решавање спора који није окончан до тренутка пријема решења о брисању, да у року од пет дана од дана пријема тог обавештења, може поднети нов предлог другом телу које се налази на Листи тела.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 173. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '173',
  NULL,
  $en$Article 173.

A procedure before the body may be initiated by the consumer only if he has previously lodged a complaint or an objection with the trader.

The trader is obliged to participate in the procedure for the out-of-court resolution of consumer disputes before the body.

The trader is obliged, at the point of sale and on the internet page, in a manner which is clear, intelligible and easily accessible to the consumer, to display a notice that he is obliged by law to participate in the procedure for the out-of-court resolution of consumer disputes.

The out-of-court resolution of a consumer dispute in accordance with this Law may last for no longer than 90 days from the day of submission of the proposal.

By way of exception from paragraph 4 of this Article, in justified cases where the subject matter of the dispute is complex, the time limit of 90 days may be extended by at most a further 90 days, of which the body informs the consumer and the trader without delay.

The consumer may withdraw from further participation in the out-of-court resolution of a consumer dispute until the conclusion of the procedure.
$en$,
  $sr$Члан 173.

Поступак пред телом може да покрене потрошач само уколико је претходно изјавио рекламацију или приговор трговцу.

Трговац је обавезан да учествује у поступку вансудског решавања потрошачких спорова пред телом.

Трговац је дужан да на продајном месту и интернет страници на начин који је за потрошача јасан, разумљив и лако доступан, истакне обавештење да је по закону обавезан да учествује у поступку вансудског решавања потрошачких спорова.

Вансудско решавање потрошачког спора у складу са овим законом може да траје најдуже 90 дана од дана подношења предлога.

Изузетно од става 4. овог члана, у оправданим случајевима када је предмет спора сложен, рок од 90 дана се може продужити за највише још 90 дана, о чему тело без одлагања обавештава потрошача и трговца.

Потрошач може одустати од даљег учешћа у вансудском решавању потрошачког спора до окончања поступка.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 174. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '174',
  NULL,
  $en$Article 174.

The Ministry is obliged to:

1) maintain and update an internet page which contains information on the out-of-court resolution of disputes, on the procedure and on the possibility of submitting a proposal, as well as an information system which is accessed through the internet page of the Ministry;

2) make payment of the remuneration for the work of the body within the meaning of Article 189, paragraph 3 of this Law;

3) exercise supervision over the work of the bodies, prepare and publish a consolidated annual report on the activities of the bodies on its internet page, no later than 31 March of the current year for the previous year;

4) on the basis of a notification by the body of a temporary inability to act lasting longer than 30 days, temporarily disable the submission of a proposal for the initiation of the procedure to that body in the information system referred to in point 1) of this paragraph, for the duration of the inability;

5) in the information system referred to in point 1) of this paragraph, enable the consumer, in respect of a submitted proposal on which the body has not concluded the procedure within the time limit referred to in Article 173, paragraphs 4 and 5 of this Law, to submit to another body a proposal for the initiation of a procedure for the out-of-court resolution of a consumer dispute;

6) once a year carry out a check that the body is not in any way engaged with an association, that is, an alliance of associations for consumer protection, or with a trader;

7) inform the consumer that the body competent to act upon the submitted proposal has been deleted from the List, and that he has the right to submit a proposal for the initiation of the procedure to another body.

The body is obliged to:

1) enter the delivered proposal for the initiation of a procedure for the out-of-court resolution of a consumer dispute into the information system referred to in paragraph 1, point 1) of this Article within a period of seven days from the day of receipt thereof;

2) in the case of a justified impossibility of acting in accordance with point 1) of this paragraph and of a temporary inability to act upon the proposal lasting longer than 30 days, inform the Ministry thereof, and that within a period of three days from the day on which the impossibility arose;

3) within a period of seven days submit to the Ministry evidence that it has acted in accordance with Article 173, paragraph 5 of this Law;

4) on account of the failure of the trader to act in accordance with Article 173, paragraph 2, Article 183, paragraph 2 and Article 184, paragraph 2 of this Law, submit a petition to the competent inspection authority within a period of seven days from the day on which the trader was obliged to participate in the procedure, from the day on which he was required to state whether he accepts or contests the consumer's proposal, or from the day on which he was obliged to participate in the oral hearing;

5) enter into the information system referred to in paragraph 1, point 1) of this Article evidence that a recommendation, or a decision that the procedure be discontinued, has been served on the parties to the procedure.
$en$,
  $sr$Члан 174.

Министарство је дужно да:

1) одржава и ажурира интернет страницу која садржи информације о вансудском решавању спорова, о поступку и о могућности подношења предлога, као и информациони систем којем се приступа преко интернет странице Министарства;

2) врши исплату накнаде за рад тела у смислу члана 189. став 3. овог закона;

3) врши надзор над радом тела, припрема и објављује обједињени годишњи извештај о активностима тела на својој интернет страници, најкасније до 31. марта текуће године за претходну годину;

4) на основу обавештења тела о привременој спречености поступања дужем од 30 дана, онемогући подношење предлога за покретање поступка том телу у информационом систему из тачке 1) овог става привремено у току трајања спречености;

5) у информационом систему из тачке 1) овог става, омогући потрошачу да по поднетом предлогу по ком тело није окончало поступак у року из члана 173. ст. 4. и 5. овог закона, поднесе другом телу предлог за покретање поступка вансудског решавања потрошачког спора;

6) једном годишње изврши проверу да тело није на било који начин ангажовано код удружења односно савеза удружења за заштиту потрошача или трговца;

7) обавести потрошача да је тело надлежно за поступање по поднетом предлогу, брисано са Листе, као и да има право да поднесе предлог за покретање поступка другом телу.

Телo је дужно да:

1) унесе достављени предлог за покретање поступка вансудског решавања потрошачког спора у у информациони систем из става 1. тачке 1) овог члана у року од седам дана од дана пријема истог;

2) у случају оправдане немогућности поступања у складу са тачком 1) овог става и привремене спречености поступања по предлогу дужем од 30 дана, обавести о томе Министарство и то у року од три дана од дана наступања немогућности;

3) у року од седам дана достави доказ Министарству да је поступило у складу са чланом 173. став 5. овог закона;

4) због непоступања трговца у складу са чланом 173. став 2, чланом 183. став 2. и чланом 184. став 2. овог закона поднесе представку надлежном инспекцијском органу у року од седам дана од дана када је трговац био у обавези да учествује у поступку, од дана када је требао да се изјасни да ли признаје или оспорава предлог потрошача или од дана када је био у обавези да учествује на усменој расправи;

5) у информациони систем из става 1. тачке 1) овог члана унесе доказ да је странама у поступку уручена препорука или одлука да се поступак обуставља.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 175. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '175',
  NULL,
  $en$Article 175.

In the procedure for the out-of-court resolution of a consumer dispute the parties are equal.
$en$,
  $sr$Члан 175.

У поступку вансудског решавања потрошачког спора стране су равноправне.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 176. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '176',
  NULL,
  $en$Article 176.

In the procedure for the out-of-court resolution of a consumer dispute the public is excluded.
$en$,
  $sr$Члан 176.

У поступку вансудског решавања потрошачког спора јавност је искључена.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 177. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '177',
  NULL,
  $en$Article 177.

The body is independent in its work and acts impartially.
$en$,
  $sr$Члан 177.

Teло је назависно у раду и поступа непристрасно.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 178. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '178',
  NULL,
  $en$Article 178.

All data, proposals and statements from the procedure for the out-of-court resolution of a consumer dispute, or in connection with the procedure, are confidential, unless the parties have agreed otherwise, except those which must be disclosed in accordance with the law or for the purpose of the application or implementation of the agreement on the out-of-court resolution of a consumer dispute, as well as when the public interest so requires.
$en$,
  $sr$Члан 178.

Сви подаци, предлози и изјаве из поступка вансудског решавања потрошачког спора или у вези са поступком су поверљиви, ако се стране нису другачије споразумеле, осим оних којих се морају открити у складу са законом или у циљу примене или спровођења споразума о вансудском решавању потрошачког спора, као и када то јавни интерес налаже.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 179. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '179',
  NULL,
  $en$Article 179.

The procedure for the out-of-court resolution of a dispute shall be conducted without delay, within the shortest possible time.
$en$,
  $sr$Члан 179.

Поступак вансудског решавања спора спровешће се без одлагања у најкраћем могућем року.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 180. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '180',
  NULL,
  $en$Article 180.

In the procedure for the out-of-court resolution of a dispute, the Serbian language and the Cyrillic script are in official use. Other languages and scripts are officially used in accordance with the law.

In areas in which members of national minorities live, their languages and scripts are also in official use, in accordance with the Constitution and the law.
$en$,
  $sr$Члан 180.

У поступку вансудског решавања спора у службеној употреби је српски језик и ћириличко писмо. Други језици и писма службено се употребљавају у складу са законом.

На подручјима у којима живе припадници националних мањина у службеној употреби су и њихови језици и писма, у складу са Уставом и законом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 181. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '181',
  NULL,
  $en$Article 181.

The proposal contains:

1) the name, surname, residence or temporary residence of the consumer;

2) the business name, registered office and tax identification number of the trader;

3) data on the subject-matter of the consumer dispute, together with a description of the factual situation and evidence by which the facts are established;

4) the consumer's proposal on the outcome of the consumer dispute;

5) a statement that the consumer has previously lodged a complaint or an objection with the trader;

6) the date of submission of the complaint or objection and the number under which they have been registered;

7) a statement that the dispute is not pending or has already been resolved in a judicial or out-of-court procedure;

8) a statement on the manner of conducting the procedure (in person or by electronic means);

9) the date and the signature of the consumer, except where the proposal is submitted by electronic means.

The consumer delivers the proposal to a body for the out-of-court resolution of consumer objections which is on the list referred to in Article 172, paragraph 2 of this Law, by post or electronically, through the information system referred to in Article 174, paragraph 1, point 1) of this Law.

The proposal referred to in paragraph 1 of this Article is irregular if it has deficiencies which prevent the body from acting upon it, if it is not intelligible or if it is not complete. In that case the body, within a period of five days from receipt of the proposal, informs the consumer of the manner in which to put the proposal in order, within a time limit which may not be shorter than five days, with a warning of the legal consequences if he does not put the proposal in order within the time limit granted.

If the consumer does not put the proposal in order in accordance with paragraph 3 of this Article, he shall be deemed to have withdrawn.

If the consumer puts the proposal in order in accordance with paragraph 3 of this Article, the proposal for the out-of-court resolution of a consumer dispute shall be deemed to have been submitted when the body receives the proposal which has been put in order.
$en$,
  $sr$Члан 181.

Предлог садржи:

1) име, презиме, пребивалиште или боравиште потрошача;

2) пословно име, седиште, порески идентификациони број трговца;

3) податке о предмету потрошачког спора, уз опис чињеничног стања и доказе којима се утврђују чињенице;

4) предлог потрошача о исходу потрошачког спора;

5) изјаву да је потрошач претходно изјавио рекламацију или приговор трговцу;

6) датум подношења рекламације или приговора и број под којим су заведени;

7) изјаву да спор није у току или је већ решен у судском или вансудском поступку;

8) изјаву о начину вођења поступка (непосредно или електронским путем);

9) датум и потпис потрошача, осим када се предлог подноси електронским путем.

Предлог потрошач доставља телу за вансудско решавање потрошачких приговора које се налази на листи из члана 172. став 2. овог закона, преко поште или електронски, путем информационог система из члана 174. став 1. тачка 1) овог закона.

Предлог из става 1. овог члана је неуредан ако има недостатке који тело спречавају да поступа по њему, ако није разумљив или ако није потпун. У том случају тело у року од пет дана од пријема предлога обавештава потрошача на који начин да уреди предлог, и то у року који не може бити краћи од пет дана, уз упозорење на правне последице ако не уреди предлог у остављеном року.

Ако потрошач не уреди предлог у складу са ставом 3. овог члана, сматраће се да је одустао.

Ако потрошач уреди предлог у складу са ставом 3. овог члана, сматраће се да је предлог за вансудско решавање потрошачког спора поднет када тело прими уређен предлог.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 182. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '182',
  NULL,
  $en$Article 182.

The body is obliged to reject the proposal for the following reasons:

1) if it is not competent to resolve the dispute;

2) if the dispute has already been resolved in a judicial or out-of-court procedure;

3) if the consumer does not put the proposal in order in accordance with Article 181, paragraph 4 of this Law;

4) if the proposal has been submitted after the expiry of a period of one year from the day of submission of a complaint to the trader;

5) if the consumer, before the submission of the proposal, has not lodged a complaint in accordance with this Law.

The body is obliged to decide on the admissibility of the proposal within a period of 15 days from the day of receipt of the proposal.
$en$,
  $sr$Члан 182.

Тело је дужно да одбаци предлог из следећих разлога:

1) ако није надлежно за решавање у спору;

2) ако је спор већ решен у судском или вансудском поступку;

3) ако потрошач не уреди предлог у складу са чланом 181. став 4. овог закона;

4) ако је предлог поднет након истека рока од годину дана од дана подношења рекламације трговцу;

5) ако потрошач, пре подношења предлога, није изјавио рекламацију у складу са овим законом.

Тело је дужно да одлучи о допуштености предлога у року од 15 дана од дана пријема предлога.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 183. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '183',
  NULL,
  $en$Article 183.

The procedure shall be deemed initiated when the body receives a proposal of the consumer which is in order, and the conditions for rejection of the proposal referred to in Article 182 of this Law do not exist.

The body delivers the proposal which is in order to the trader, together with a notification to the trader that he is to state, within a period of 15 days from the day of delivery of the proposal with enclosures, whether he accepts or contests the consumer's proposal. Where the procedure is conducted by electronic means, proper delivery of the proposal shall be deemed to have been effected when the body sends it to the trader at the electronic address which has been publicly published.

If the trader contests the proposal, in his statement he must set out the facts on which he bases his allegations and the evidence by which those facts are established.
$en$,
  $sr$Члан 183.

Поступак се сматра покренутим када тело прими уредан предлог потрошача, а не постоје услови за одбацивање предлога из члана 182. овог закона.

Уредан предлог тело доставља трговцу уз обавештење трговцу да се у року од 15 дана од дана достављања предлога са прилозима изјасни да ли признаје или оспорава предлог потрошача. Када се поступак води електронским путем, уредна достава предлога сматра се када га тело упути трговцу на електронску адресу која је јавно објављена.

Ако трговац оспорава предлог, у изјашњењу мора да наведе чињенице на којима заснива своје наводе и доказе којима се утврђују те чињенице.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 184. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '184',
  NULL,
  $en$Article 184.

The body acquaints the parties with the purpose of the out-of-court resolution of the dispute, the rules and the costs of the procedure.

The body may schedule an oral hearing whenever that is useful for the clarification of the dispute in question, and the consumer and the trader are obliged to participate in the oral hearing.

If the body assesses that it is useful to hold an oral hearing, it is obliged to deliver a summons to the parties to the procedure at least eight days before the scheduled oral hearing. The summons contains the place, day and time of the holding of the oral hearing.

The body may also schedule an oral hearing by videoconference, where technical possibilities exist.

Each party may request a postponement of the oral hearing, stating the reasons. If the body grants this request, it shall schedule a new date for the oral hearing and inform the parties thereof.

A party to the procedure may submit a request for postponement of the oral hearing only once.

The body may discontinue the procedure if it considers that further conduct of the procedure is not expedient, or if the consumer does not appear at the oral hearing.
$en$,
  $sr$Члан 184.

Tелo упознаје стране са циљем вансудског решавања спора, правилима и трошковима поступка.

Тело може заказати усмену расправу увек када је то корисно за разјашњење предметног спора, а потрошач и трговац су обавезни да учествују на усменој расправи.

Уколико тело процени да је корисно одржати усмену расправу, дужно је да најмање осам дана пре заказане усмене расправе достави позив странама у поступку. Позив садржи место, дан и час одржавања усмене расправе.

Тело може заказати и видеоконференцијску усмену расправу, када постоје техничке могућности.

Свака страна може затражити одлагање усмене расправе уз навођење разлога. Ако тело одобри овај захтев, заказаће нови датум усмене расправе и о томе обавестити стране.

Захтев за одлагање усмене расправе страна у поступку може поднети само једном.

Тело може обуставити поступак ако оцени да даље спровођење поступка није целисходно или ако потрошач не дође на усмену расправу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 185. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '185',
  NULL,
  $en$Article 185.

The procedure for the out-of-court resolution of disputes is concluded:

1) by a recommendation on the manner of resolving the consumer dispute;

2) by the conclusion of an agreement on the resolution of the dispute;

3) by a decision of the body that the procedure be discontinued, because further conduct of the procedure is not expedient (for example, the complexity of the procedure, the body having learned after the initiation of the procedure that a procedure with the same subject-matter of the dispute is already being conducted between the same parties before another body, and the like).
$en$,
  $sr$Члан 185.

Поступак вансудског решавања спорова окончава се:

1) препоруком о начину решавања потрошачког спора;

2) закључењем споразума о решавању спора;

3) одлуком тела да се поступак обуставља, јер даље вођење поступка није целисходно (нпр. сложеност поступка, тело након покретања поступка сазнало да се између истих страна већ води поступак са истим предметом спора пред другим телом и сл.).
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 186. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '186',
  NULL,
  $en$Article 186.

If the parties to the procedure do not reach an agreement, the body may issue a recommendation on the manner of resolving the dispute, if it considers that this is expedient.

The recommendation is drawn up in writing, with a statement of reasons, and is delivered to the parties to the procedure.

The recommendation does not bind the parties to the dispute.
$en$,
  $sr$Члан 186.

Уколико стране у поступку не постигну споразум, тело може издати препоруку о начину решавања спора, уколико оцени да је то целисходно.

Препорука се сачињава у писаном облику са образложењем и доставља странама у поступку.

Препорука не обавезује стране у спору.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 187. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '187',
  NULL,
  $en$Article 187.

If the parties in the out-of-court procedure for the resolution of a consumer dispute reach an agreement, the body draws it up in written form and delivers it to the parties for signature.

The content of the agreement on the resolution of the dispute by means of the out-of-court resolution of a consumer dispute is determined by the parties to the procedure.

The body delivers the signed agreement to the parties to the procedure and to the Ministry.
$en$,
  $sr$Члан 187.

Уколико стране у вансудском поступку решавања потрошачког спора постигну споразум, тело га сачињава у писаној форми и доставља странама на потпис.

Садржину споразума о решавању спора путем вансудског решавања потрошачког спора одређују стране у поступку.

Тело потписан споразум доставља странама у поступку и Министарству.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 188. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '188',
  NULL,
  $en$Article 188.

An agreement on the out-of-court resolution of a consumer dispute may have the force of an enforceable instrument if the following conditions are fulfilled:

1) that it contains a statement of the debtor by which he agrees that the creditor, on the basis of the agreement on the resolution of the dispute in the procedure for the out-of-court resolution of a consumer dispute, may, after the claim has fallen due, initiate proceedings (enforceability clause);

2) that the agreement must be signed by the parties to the dispute in the procedure for the out-of-court resolution of a consumer dispute and by the body.
$en$,
  $sr$Члан 188.

Споразум о вансудском решавању потрошачког спора може имати снагу извршне исправе ако су испуњени следећи услови:

1) да садржи изјаву дужника којом пристаје да поверилац на основу споразума о решавању спора у поступку вансудског решавања потрошачког спора након доспелости потраживања може покренути поступак (клаузула извршности);

2) да споразум мора бити потписан од страна у спору у поступку вансудског решавања потрошачког спора и тела.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 189. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '189',
  NULL,
  $en$Article 189.

Each party in the procedure for the out-of-court resolution of a consumer dispute pays its own costs (costs of representation, travel costs and the like).

The work of the body for the out-of-court resolution of a consumer dispute is free of charge for the parties in the procedure for the out-of-court resolution of a consumer dispute.

Bodies may be financed from the budget of the Republic of Serbia in accordance with the law, the public policy document and the Work Plan of the Government.

A local self-government unit may, on the basis of an agreement with the body, assist the work of the body by providing premises and technical means.
$en$,
  $sr$Члан 189.

Свака странка у поступку вансудског решавања потрошачког спора плаћа своје трошкове (трошкови заступања, путни трошкови и сл.).

Рад тела за вансудско решавање потрошачког спора је бесплатан за странке у поступку вансудског решавања потрошачког спора.

Тела могу да се финансирају из буџета Републике Србије у складу са законом, документом јавне политике и Планом рада Владе.

Јединица локалне самоуправе може, на основу споразума са телом, да помаже рад тела обезбеђивањем просторних и техничких средстава.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 190. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '190',
  NULL,
  $en$Article 190.

The initiation and conduct of a procedure for the out-of-court resolution of a consumer dispute does not exclude and does not affect the exercise of the right to judicial protection, in accordance with the law.

The participation of the consumer in the out-of-court resolution of a dispute does not affect the right of the consumer to claim compensation for damage in judicial proceedings.

Limitation periods and preclusive time limits do not run during the procedure for the out-of-court resolution of a consumer dispute, and begin to run anew upon the expiry of the fifteenth day from the day of conclusion of this procedure.

A consumer dispute may also be resolved before arbitration, where the consumer and the trader conclude an arbitration agreement after the dispute has arisen.

An arbitration agreement is an instrument which both contracting parties have signed and which does not contain other agreements except those which relate to the arbitration procedure.

The trader is obliged, before the signing of the arbitration agreement, to acquaint the consumer with the legal consequences of accepting the arbitration agreement, in particular with the binding nature of the decision of the arbitration and the costs of this procedure.
$en$,
  $sr$Члан 190.

Покретање и вођење поступка вансудског решавања потрошачког спора, не искључује и не утиче на остваривање права на судску заштиту, у складу са законом.

Учешће потрошача у вансудском решавању спора не утиче на право потрошача да захтева накнаду штете у судском поступку.

Застаревање и преклузивни рокови не теку у току поступка вансудског решавања потрошачког спора, а почињу поново да теку истеком петнаестог дана од дана окончања овог поступка.

Потрошачки спор може се решавати и пред арбитражом, када потрошач и трговац закључе споразум о арбитражи након настанка спора.

Споразум о арбитражи је исправа коју су потписале обе уговорне стране и који не садржи друге споразуме осим оних које се односе на арбитражни поступак.

Трговац је дужан да потрошача пре потписивања споразума о арбитражи упозна са правним последицама прихватања арбитражног споразума, посебно о обавезности одлуке арбитраже и трошковима овог поступка.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 191. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '191',
  NULL,
  $en$Article 191.

To questions relating to the out-of-court resolution of a consumer dispute which are not regulated by this Law, the law governing mediation in the resolution of disputes shall apply accordingly.
$en$,
  $sr$Члан 191.

На питања у вези са вансудским решавањем потрошачког спора која нису уређена овим законом, сходно се примењује закон којим се уређује посредовање у решавању спорова.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 192. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '192',
  NULL,
  $en$Collective interest of consumers

Article 192.

An infringement of the collective interest of consumers exists:

1) when, in respect of a total number of at least ten consumers, by an identical act, that is, in an identical manner, by the same person, a right which is guaranteed to them by this Law is infringed, or

2) in the case of the stipulation of unfair terms in consumer contracts within the meaning of Articles 44–47 of this Law.

An infringement of the collective interest of consumers referred to in paragraph 1, point 1) of this Article also exists in cases where rights are infringed in respect of a total number of consumers which is less than ten, if the competent authority establishes that an infringement of the collective interest of consumers has occurred, taking into account in particular the duration and frequency of the conduct of the trader, as well as whether such conduct produces negative effects in relation to each consumer in the given factual situation.
$en$,
  $sr$Колективни интерес потрошача

Члан 192.

Повреда колективног интереса потрошача постоји:

1) када се укупном броју од најмање десет потрошача, истоветном радњом, односно на истоветан начин, од стране истог лица, повређује право које им је загарантовано овим законом, или

2) у случају уговарања неправичних одредби у потрошачким уговорима у смислу чл. 44–47. овог закона.

Повреда колективног интереса потрошача из става 1. тачка 1) овог члана постоји и у случајевима када се повређују права укупном броју потрошача који је мањи од десет, ако надлежни орган утврди да је дошло до повреде колективног интереса потрошача узимајући у обзир нарочито трајање и учесталост поступања трговца, као и чињеницу да ли такво поступање испољава негативне ефекте према сваком потрошачу у датој чињеничној ситуацији.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 193. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '193',
  NULL,
  $en$Initiation of the procedure ex officio

Article 193.

The Ministry initiates and conducts the procedure for establishing an infringement of the collective interest of consumers ex officio if, in the procedure of supervision, on the basis of submitted initiatives, information and other available data, it reasonably presumes that some act or omission of a market participant, and in particular the existence of an unfair contractual term, endangers or threatens to endanger the collective interest of consumers.

The procedure for the protection of the collective interest of consumers may be conducted against a trader, that is, an association of traders, whose actions are contrary to the provisions of this Law, or if it stipulates unfair contractual terms within the meaning of this Law.
$en$,
  $sr$Покретање поступка по службеној дужности

Члан 193.

Министарство покреће и води поступак утврђивања повреде колективног интереса потрошача по службеној дужности ако у поступку надзора, на основу достављених иницијатива, информација и других расположивих података основано претпостави да неко чињење или нечињење учесника на тржишту, а посебно постојање неправичне уговорне одредбе, угрожава или прети да угрози колективни интерес потрошача.

Поступак за заштиту колективног интереса потрошача може да се води против трговца, односно удружења трговаца чија су поступања у супротности са одредбама овог закона, или ако уговара неправичне уговорне одредбе у смислу овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 194. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '194',
  NULL,
  $en$Initiation of the procedure at the request of a party

Article 194.

The procedure for the protection of the collective interest may, in addition to ex officio, be initiated and conducted on the basis of a request of an authorised person.
$en$,
  $sr$Покретање поступка по захтеву странке

Члан 194.

Поступак заштите колективног интереса може се, осим по службеној дужности, покренути и водити на основу захтева овлашћеног лица.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 195. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '195',
  NULL,
  $en$Persons authorised to submit a request for the protection of the collective interest of consumers

Article 195.

A request for the protection of the collective interest of consumers may be submitted by recorded associations, that is, alliances, referred to in Article 162 of this Law.
$en$,
  $sr$Лица овлашћена за подношење захтева за заштиту колективног интереса потрошача

Члан 195.

Захтев за заштиту колективног интереса потрошача могу да поднесу евидентирана удружења односно савези из члана 162. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 196. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '196',
  NULL,
  $en$Parties to the procedure and initiation of the procedure

Article 196.

The parties to the procedure for the protection of the collective interest of consumers are the person against whom the procedure has been initiated and the submitter of the request.

The status of a party is not held by the submitters of an initiative for the examination of an infringement of the collective interest of consumers, the providers of information and data, experts and organisations whose analyses are used in the procedure, nor by state authorities and organisations which cooperate with the Ministry in the course of the procedure.

A conclusion on the initiation of the procedure for the protection of the collective interest of consumers is adopted, which in particular contains a description of the actions or acts which may constitute an infringement of the collective interest of consumers, the legal basis and the reasons for the initiation of the procedure.

A separate appeal against the conclusion on the initiation of the procedure is not permitted, and an administrative dispute may not be initiated.

The Ministry shall notify the person against whom the procedure for the protection of the collective interest of consumers has been initiated of the reasons for which the procedure is being conducted, as well as of the material facts and evidence in the procedure, and shall invite that person to make a statement within a period of eight days from the day of receipt of the notification.
$en$,
  $sr$Странке у поступку и покретање поступка

Члан 196.

Странке у поступку заштите колективног интереса потрошача су лице против кога је покренут поступак и подносилац захтева.

Својство странке немају подносиоци иницијативе за испитивање повреде колективног интереса потрошача, даваоци информација и података, стручна лица и организације чије се анализе користе у поступку, као ни државни органи и организације који сарађују са Министарством у току поступка.

О покретању поступка заштите колективног интереса потрошача доноси се закључак, који нарочито садржи опис радњи или аката који могу да представљају повреду колективног интереса потрошача, правни основ и разлоге за покретање поступка.

Против закључка о покретању поступка није дозвољена посебна жалба и не може се покренути управни спор.

Министарство ће обавестити лице против којег је покренут поступак заштите колективног интереса потрошача о разлозима због којих се поступак води као и о битним чињеницама и доказима у поступку и позвати га да се изјасни у року од осам дана од дана пријема обавештења.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 197. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '197',
  NULL,
  $en$Decisions in the procedure for the protection of the collective interest of consumers

Article 197.

The Ministry decides by a decision on the existence of an infringement and on the determination of a measure.

The person against whom the procedure is being conducted may, in the course of the procedure until its completion, put forward a proposal of the obligations which that person is prepared to undertake for the purpose of remedying the infringement of the law, with the conditions and time limits for implementation (corrective statement).

The decision referred to in paragraph 1 of this Article also contains the time limit for the implementation of the measure imposed.

An administrative dispute may be initiated against a decision adopted in the procedure for the protection of the collective interest.
$en$,
  $sr$Одлуке у поступку заштите колективног интереса потрошача

Члан 197.

Министарство решењем одлучује о постојању повреде и одређивању мере.

Лице против којег се води поступак може у току поступка до његовог окончања дати предлог обавеза које је спремно да предузме ради отклањања повреде закона, са условима и роковима за спровођење (корективна изјава).

Решење из става 1. овог члана садржи и рок за спровођење изречене мере.

Против решења донетог у поступку заштите колективног интереса може се покренути управни спор.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 198. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '198',
  NULL,
  $en$Measure for the protection of the collective interest of consumers

Article 198.

If the existence of an infringement of the collective interest has been established, a measure for the protection of the collective interest of consumers is determined, by which the person against whom the procedure was conducted may be ordered to undertake specified conduct, or specified conduct may be prohibited to that person, and in particular to:

1) cease the breach of the provisions of this Law by which the collective interest of consumers is endangered, and refrain from a future breach;

2) remedy the irregularity established;

3) without delay discontinue the contracting of unfair contractual terms.

In the decision referred to in Article 197, paragraph 1 of this Law, the Ministry may impose on the trader an obligation to inform the Ministry, within the time limit established, of the implementation of the measures imposed.

The decision by which the measure referred to in paragraph 1 of this Article is determined shall be published on the internet page of the Ministry.
$en$,
  $sr$Мера заштите колективног интереса потрошача

Члан 198.

Ако је утврђено постојање повреде колективног интереса, одређује се мера заштите колективног интереса потрошача, којом може да се наложи лицу против кога је вођен поступак да предузме одређено понашање или може да му се забрани одређено понашање, а нарочито да:

1) прекине са кршењем одредби овог закона којим се угрожава колективни интерес потрошача и уздржи се од будућег кршења;

2) отклони утврђену неправилност;

3) без одлагања обустави уговарање неправичних уговорних одредаба.

У решењу из члана 197. став 1. овог закона Министарство може трговцу да наложи обавезу да у утврђеном року извести Министарство о спровођењу изречених мера.

Решење којим се одређује мера из става 1. овог члана објављује се на интернет страници Министарства.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 199. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '199',
  NULL,
  $en$Interim measure

Article 199.

If there is a danger of harmful consequences occurring for the rights and interests of consumers, the Ministry, on a proposal of the submitter of the request, may order the cessation of the performance of specified actions, that is, an obligation to undertake actions by which harmful consequences are prevented or remedied.

The interim measure may last until the adoption of a decision in the procedure for the protection of the collective interest of consumers.
$en$,
  $sr$Привремена мера

Члан 199.

Ако постоји опасност од наступања штетних последица по права и интересе потрошача, Министарство, на предлог подносиоца захтева, може да наложи престанак вршења одређених радњи, односно обавезу предузимања радњи којима се спречавају или отклањају штетне последице.

Привремена мера може да траје до доношења решења у поступку заштите колективног интереса потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 200. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '200',
  NULL,
  $en$Interruption of the procedure

Article 200.

The Ministry interrupts the procedure for the protection of the collective interest of consumers if the trader, by a corrective statement, undertakes that he will not continue or repeat an action or an act by which harm is caused to the collective interest of consumers.

The interruption of the procedure referred to in paragraph 1 of this Article may last for no longer than three months.

The Ministry, ex officio, monitors compliance with the obligation referred to in paragraph 1 of this Article.

If the party against whom the procedure is being conducted does not fulfil or breaches the obligations undertaken before the expiry of the time limit of three months, the Ministry continues the procedure.

If the party against whom the procedure is being conducted fulfils the obligations undertaken within the prescribed time limit, the Ministry shall discontinue the procedure.
$en$,
  $sr$Прекид поступка

Члан 200.

Министарство прекида поступак заштите колективног интереса потрошача ако се трговац корективном изјавом обавеже да неће наставити или поновити радњу или акт којим се штети колективном интересу потрошача.

Прекид поступка из става 1. овог члана може да траје најдуже три месеца.

О поступању по обавези из става 1. овог члана Министарство води рачуна по службеној дужности.

Ако странка против које се води поступак не испуни или прекрши преузете обавезе пре истека рока од три месеца Министарство наставља поступак.

Ако странка против које се води поступак испуни преузете обавезе у прописаном року Министарство ће обуставити поступак.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 201. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '201',
  NULL,
  $en$Procedure for compensation of damage

Article 201.

The initiation or the conduct of a procedure for the protection of the collective interest of consumers does not prevent a consumer to whom damage has been caused from initiating before the competent court a procedure for compensation of that damage, or from initiating before the court a procedure for annulment or for a determination of the nullity of the contract, that is, from initiating before the court another procedure seeking the exercise of his rights.
$en$,
  $sr$Поступак за накнаду штете

Члан 201.

Покретање или вођење поступка за заштиту колективног интереса потрошача не спречава потрошача коме је проузрокована штета да покрене пред надлежним судом поступак за накнаду те штете или да пред судом покрене поступак за поништај или утврђивање ништавости уговора, односно да пред судом покрене други поступак захтевајући остварење својих права.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 202. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '202',
  NULL,
  $en$Application of the rules of the general administrative procedure

Article 202.

To matters relating to the procedure for the protection of the collective interest of consumers which are not regulated by this Law, the law governing the general administrative procedure shall apply.
$en$,
  $sr$Примена правила општег управног поступка

Члан 202.

На питања у вези са поступком заштите колективног интереса потрошача која нису уређена овим законом, примењује се закон којим се уређује општи управни поступак.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 203. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '203',
  NULL,
  $en$Competence for supervision

Article 203.

Supervision over the implementation of this Law and of the regulations adopted on the basis of this Law is exercised by the ministry responsible for trade affairs and the ministry responsible for tourism affairs.

The authorities of state administration and the authorities of the autonomous province and of the local self-government unit, within their scope of competence, exercise supervision over the implementation of regulations in the field of consumer protection and undertake the actions prescribed by this Law and by other regulations.

Inspection supervision over the implementation of this Law and of the regulations adopted on the basis of this Law is exercised by the ministry responsible for trade affairs, through market inspectors, as well as by the ministry responsible for tourism affairs, through tourism inspectors, in accordance with the powers prescribed by this Law and by the regulations governing inspection supervision in the fields of trade and tourism.

To everything that is not regulated by this Law with regard to inspection supervision, the provisions of the law governing inspection supervision shall apply.
$en$,
  $sr$Надлежност за надзор

Члан 203.

Надзор над спровођењем овог закона и прописа донетих на основу овог закона врши министарство надлежно за послове трговине и министарство надлежно за послове туризма.

Органи државне управе и органи аутономне покрајине и јединице локалне самоуправе, у оквиру свог делокруга, врше надзор над спровођењем прописа у области заштите потрошача и предузимају радње прописане овим законом и другим прописима.

Инспекцијски надзор над спровођењем овог закона и прописа донетих на основу овог закона врши министарство надлежно за послове трговине, преко тржишних инспектора, као и министарство надлежно за послове туризма, преко туристичких инспектора, у складу са овлашћењима прописаним овим законом и прописима којима се уређује инспекцијски надзор у областима трговине и туризма.

На све што овим законом није уређено у погледу инспекцијског надзора, примењиваће се одредбе закона којим се уређује инспекцијски надзор.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 204. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '204',
  NULL,
  $en$Cooperation in supervision

Article 204.

The authorities referred to in Article 203, paragraph 2 of this Law, in the exercise of supervision, cooperate with one another and deliver to one another the data and notifications necessary for work on matters of consumer protection.

The Ministry manages consumer protection affairs. The authorities referred to in Article 203, paragraph 2 of this Law are obliged to deliver to the Ministry an analysis of the state of affairs in the fields within their scope of competence which relate to consumer protection, and to give an opinion on matters of significance for consumer protection.
$en$,
  $sr$Сарадња у надзору

Члан 204.

Органи из члана 203. став 2. овог закона у вршењу надзора међусобно сарађују и достављају једни другима податке и обавештења потребна за рад по питањима заштите потрошача.

Министарство управља пословима заштите потрошача. Органи из члана 203. става 2. овог закона дужни су да достављају Министарству анализу стања у областима из свог делокруга које се односе на заштиту потрошача и дају мишљење о питањима од значаја за заштиту потрошача.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 205. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '205',
  NULL,
  $en$Procedure of inspection supervision

Article 205.

In the exercise of inspection supervision, the competent inspector has the rights, duties and powers prescribed by this Law and by the laws governing inspection supervision in the fields of trade and tourism.

The provisions of the law governing inspection supervision apply to the procedure of inspection supervision.

Reports of an infringement of the law, that is, other information, tip-offs, submissions and requests submitted for the purpose of undertaking inspection supervision, have the effect of an initiative for the initiation of the procedure, and the submitters of those initiatives do not have the status of a party in the procedure.

In the case of a well-founded suspicion that the trader is carrying out a business practice which is considered unfair within the meaning of Articles 16–22 of this Law, for the purpose of proving, the competent inspector may use a covert purchase if the necessary evidence cannot be secured in another manner or if that would be significantly more difficult. Within the framework of a covert purchase, the competent inspector is authorised to collect, by means of direct observation, the evidence necessary for establishing the factual situation.

The inspector draws up a record of all actions in the procedure of inspection supervision which are of significance for establishing the factual situation.
$en$,
  $sr$Поступак инспекцијског надзора

Члан 205.

У вршењу инспекцијског надзора надлежни инспектор има права, дужности и овлашћења прописана овим законом и законима којима се уређује инспекцијски надзор у областима трговине и туризма.

На поступак инспекцијског надзора примењују се одредбе закона којим се уређује инспекцијски надзор.

Пријаве повреде закона, односно друге информације, дојаве, поднесци и захтеви поднети ради предузимања инспекцијског надзора имају дејство иницијативе за покретање поступка, а подносиоци тих иницијатива немају својство странке у поступку.

У случају основане сумње да трговац обавља пословну праксу која се сматра непоштеном у смислу чл. 16–22. овог закона, ради доказивања надлежни инспектор може да користи прикривену куповину, ако се на други начин не могу обезбедити потребни докази или би то било значајно отежано. У оквиру прикривене куповине, надлежни инспектор овлашћен је да путем непосредног опажања прикупља доказе потребне за утврђивање чињеничног стања.

О свим радњама у поступку инспекцијског надзора од значаја за утврђивање чињеничног стања инспектор саставља записник.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 206. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '206',
  NULL,
  $en$Measure for remedying unlawfulness

Article 206.

If he establishes unlawfulness, the inspector, by a record of inspection supervision, orders the trader to remedy the unlawfulness established, with an appropriate time limit for remedying it.

The time limit referred to in paragraph 1 of this Article may not be shorter than 24 hours nor longer than two months, unless otherwise prescribed.

If the inspector establishes that the trader has undertaken the measure which was ordered to him and has remedied the unlawfulness, he completes the procedure of inspection supervision by delivering to the trader a record in which it is stated that the established unlawfulness or deficiencies in his business operations or conduct have been remedied.

If the trader does not remedy the established unlawfulness within the time limit allowed, the inspector without delay adopts a decision by which he imposes a measure for remedying the unlawfulness, with the appropriate time limit referred to in paragraph 2 of this Article.

If the trader does not act in accordance with the decision referred to in paragraph 4 of this Article, the inspector shall, by a decision, impose a measure of temporary prohibition of the circulation of the goods or of the performance of the service to which the measure relates.

If the inspector establishes that the trader is carrying out a business practice which is considered unfair within the meaning of Articles 16–22 of this Law, he adopts a decision by which the trader is prohibited from carrying out the unfair business practice.
$en$,
  $sr$Мерa за отклањање незаконитости

Члан 206.

Ако утврди незаконитост, инспектор записником о инспекцијском надзору налаже трговцу да отклони утврђену незаконитост, са примереним роком за отклањање.

Рок из става 1. овог члана не може бити краћи од 24 сата ни дужи од два месеца, ако другачије није прописано.

Ако инспектор утврди да је трговац предузео меру која му је наложена и отклонио незаконитост, окончава поступак инспекцијског надзора достављањем трговцу записника у ком се наводи да су отклоњене утврђене незаконитости или недостаци у његовом пословању или поступању.

Ако трговац у остављеном року не отклони утврђену незаконитост, инспектор без одлагања доноси решење којим изриче меру за отклањање незаконитости са примереним роком из става 2. овог члана.

Ако трговац не поступи по решењу из става 4. овог члана, инспектор ће решењем изрећи меру привремене забране промета робе или вршења услуге на коју се мера односи.

Ако инспектор утврди да трговац обавља пословну праксу која се сматра непоштеном у смислу чл. 16-22. овог закона, доноси решење којим се трговцу забрањује да обавља непоштену пословну праксу.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 207. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '207',
  NULL,
  $en$Imposition of measures

Article 207.

By the measure referred to in Article 206 of this Law, the competent inspector orders the remedying of the established unlawfulness to the trader if the trader:

1) does not display prices, in accordance with Articles 6–10 of this Law;

2) does not adhere to the displayed price and the conditions of sale under Article 11 of this Law;

3) does not inform consumers, in accordance with Articles 12, 27, 42, 108 and 115 and Articles 141–143 of this Law;

4) charges additional costs without the prior express consent of the consumer, in accordance with Article 13 of this Law;

5) acts contrary to Article 26 of this Law;

6) does not inform consumers in accordance with Article 28 of this Law;

7) does not hand over to the consumer the form for withdrawal from a distance contract and from contracts concluded off business premises, the notice and the contract, that is, the instrument concerning the contract, in accordance with Articles 31 and 32 of this Law;

8) has not refunded the amount paid which he received from the consumer, as well as the delivery costs, in the case of withdrawal from the contract within the statutory time limit of 14 days, in accordance with Article 35, paragraph 1 of this Law;

9) carries out direct advertising, contrary to Article 39 of this Law;

10) sends consignments which the consumer did not order, in accordance with Article 40, paragraph 1 of this Law;

11) carries out advertising by means of distance communication, contrary to Article 41 of this Law;

12) does not deliver to the consumer the accompanying documentation with the goods, in accordance with Article 50 of this Law;

13) does not act in accordance with Article 51, paragraph 4 of this Law;

14) has not performed the contract in accordance with Article 53, paragraph 1 of this Law;

15) does not act in accordance with Article 54, paragraphs 1 and 2 of this Law;

16) in the case of non-conforming goods, has not acted in accordance with Articles 56 and 57 of this Law;

17) does not issue a guarantee certificate to the consumer, in accordance with Article 61 or Article 102, paragraph 3 of this Law;

18) abuses the expression "commercial guarantee" and an expression with that meaning, in accordance with Article 62 of this Law;

19) does not inform consumers of the manner and place of receipt of a complaint, or does not ensure the presence of a person authorised to receive complaints during working hours, in accordance with the provision of Article 63 of this Law;

20) does not keep a record of complaints in accordance with the provision of Article 63 of this Law;

21) has not, without delay, immediately after the conclusion of the contract, delivered digital content or a digital service in accordance with Article 73 of this Law;

22) has not delivered digital content or a digital service in accordance with Articles 74 and 75 of this Law;

23) does not return what has been paid, and if he charges a fee, all in accordance with Article 84 of this Law;

24) suspends the provision of a service of general economic interest to the consumer, contrary to Article 107 of this Law;

25) does not issue a bill in accordance with Article 112 of this Law;

26) does not establish a contact line in connection with connection to the distribution network, the quality and the use of services of general economic interest, in accordance with Article 113 of this Law;

27) advertises or offers for sale tourist trips, contrary to Article 118 of this Law;

28) does not inform the consumer of the data relating to the host family and the responsible person whom the pupil, that is, the student, may contact for assistance at the place of stay, in accordance with Article 131, paragraph 3 of this Law;

29) does not issue a confirmation of the guarantee in the event of insolvency, in accordance with Article 140 of this Law;

30) does not advertise and does not offer timeshare of immovable property, long-term holiday benefits, assistance in the resale of timeshare of immovable property and of long-term holiday benefits, that is, the exchange of timeshare of immovable property, in accordance with Article 142 of this Law;

31) does not enable the separate signing of the contractual provisions on the consumer's right to withdraw from the contract, on the duration of that right and on the prohibition of payment in advance during the duration of the right of withdrawal, in accordance with Article 143, paragraphs 8 and 9 of this Law.

By the measure referred to in Article 206 of this Law, the competent inspector orders the remedying of the established unlawfulness to a trader who is a commercial guarantee provider if that trader:

1) sells goods with a guarantee certificate which has been drawn up contrary to Article 61, paragraph 3 of this Law;

2) abuses the expression "commercial guarantee" and an expression with that meaning, in accordance with Article 62 of this Law.
$en$,
  $sr$Изрицање мера

Члан 207.

Мером из члана 206. овог закона, надлежни инспектор налаже отклањање утврђене незаконитости трговцу ако:

1) не истиче цене, у складу са чл. 6–10. овог закона;

2) се не придржава истакнуте цене и услова продаје из члана 11. овог закона;

3) не обавештава потрошаче, у складу са чл. 12, 27, 42, 108, 115. и чл. 141–143. овог закона;

4) наплаћује додатне трошкове без претходне изричите сагласности потрошача, у складу са чланом 13. овог закона;

5) поступа супротно члану 26. овог закона;

6) не обавештава потрошаче у складу са чланом 28. овог закона;

7) не предаје потрошачу образац за одустанак од уговора на даљину и уговора који се закључују изван пословних просторија, обавештење и уговор, односно исправу о уговору, у складу са чл. 31. и 32. овог закона;

8) није извршио повраћај плаћеног износа који је примио од потрошача, као и трошкове испоруке, у случају одустанка од уговора у законском року од 14 дана, у складу са чланом 35. став 1. овог закона;

9) врши директно оглашавање, супротно члану 39. овог закона;

10) шаље пошиљке које потрошач није наручио, у складу са чланом 40. став 1. овог закона;

11) врши оглашавање путем средстава комуникације на даљину, супротно члану 41. овог закона;

12) не доставља потрошачу пратећу документацију уз робу, у складу са чланом 50. овог закона;

13) не поступа у складу са чланом 51. став 4. овог закона;

14) није испунио уговор у складу са чланом 53. став 1. овог закона;

15) не поступа у складу са чланом 54. ст. 1. и 2. овог закона;

16) у случају несаобразне робе, није поступио у складу са чл. 56. и 57. овог закона;

17) не издаје потрошачу гарантни лист, у складу са чланом 61. или чланом 102. став 3. овог закона;

18) злоупотребљава израз „комерцијална гаранција” и израз с тим значењем, у складу са чланом 62. овог закона;

19) не обавештава потрошаче о начину и месту пријема рекламације или не обезбеђује присуство лица овлашћеног за пријем рекламација у току радног времена, у складу са одредбом члана 63. овог закона;

20) не води евиденцију рекламација у складу са одредбом члана 63. овог закона;

21) није без одлагања, одмах након закључења уговора, испоручио дигитални садржај или дигиталну услугу у складу са чланом 73. овог закона;

22) није испоручио дигитални садржај или дигиталну услугу у складу са чл. 74. и 75. овог закона;

23) не врати плаћено и ако зарачуна накнаду, све у складу са чланом 84. овог закона;

24) обуставља потрошачу пружање услуге од општег економског интереса, супротно члану 107. овог закона;

25) не издаје рачун у складу са чланом 112. овог закона;

26) не успоставља контакт линију у вези са прикључењем на дистрибутивну мрежу, квалитетом и коришћењем услуга од општег економског интереса, у складу са чланом 113. овог закона;

27) оглашава или нуди на продају туристичка путовања, супротно члану 118. овог закона;

28) не обавештава потрошача о подацима који се односе на породицу домаћина и одговорно лице коме ученик, односно студент може да се обрати за помоћ у месту боравка, у складу са чланом 131. став 3. овог закона;

29) не изда потврду о гаранцији услед инсолвентности, у складу са чланом 140. овог закона;

30) не оглашава и не нуди временски подељено коришћење непокретности, трајне олакшице за одмор, помоћ приликом препродаје временски подељеног коришћења непокретности и трајних олакшица за одмор, односно размену временски подељеног коришћења непокретности, у складу са чланом 142. овог закона;

31) не омогућава посебно потписивање уговорних одредаба о праву потрошача на одустанак од уговора, о трајању тог права и о забрани плаћања унапред за време трајања права на одустанак, у складу са чланом 143. ст. 8. и 9. овог закона.

Мером из члана 206. овог закона надлежни инспектор налаже отклањање утврђене незаконитости трговцу који је давалац комерцијалне гаранције, ако:

1) продаје робу уз гарантни лист који је сачињен супротно члану 61. став 3. овог закона;

2) злоупотребљава израз „комерцијална гаранција” и израз с тим значењем, у складу са чланом 62. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 208. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '208',
  NULL,
  $en$Appeal

Article 208.

Against the decision referred to in Article 206, paragraph 4 of this Law, an appeal may be lodged with the Minister within a period of eight days from the day of receipt of the decision.

The appeal referred to in paragraph 1 of this Article does not stay the enforcement of the decision.

Against the second-instance decision of the Minister, the party on whom a measure has been imposed in the inspection supervision procedure may institute an administrative dispute within a period of 14 days from the day of receipt of the second-instance decision.
$en$,
  $sr$Жалба

Члан 208.

Против решења из члана 206. став 4. овог закона може се изјавити жалба Министру у року од осам дана од дана пријема решења.

Жалба из става 1. овог члана не одлаже извршење решења.

Против другостепене одлуке Министра странка којој је изречена мера у поступку инспекцијског надзора може да покрене управни спор у року од 14 дана од дана пријема другостепене одлуке.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 209. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '209',
  NULL,
  $en$Article 209.

A legal person shall be fined for a misdemeanour in an amount from 300,000 to 2,000,000 dinars if:

1) it does not act in accordance with Article 10, paragraph 1 or paragraph 2 or paragraph 3 or paragraph 4, point 1) or paragraph 4, point 2) or paragraph 5 or paragraph 6 or paragraph 8 or paragraph 9 or paragraph 10 of this Law;

2) it engages in unfair business practice referred to in Article 17 of this Law;

3) it misleads the consumer in the manner prescribed by Articles 18–20 of this Law;

4) it engages in aggressive business practice, in the manner prescribed by Articles 21 and 22 of this Law;

5) if it does not obtain the consent of the consumer for the performance of additional work, in accordance with Article 92 of this Law;

6) it does not act in accordance with Article 104, paragraph 2 or paragraph 4 or paragraph 5 of this Law;

7) it acts contrary to Article 107 of this Law;

8) it does not permit the consumer to terminate a contract for the provision of services of general economic interest, in accordance with Article 110 of this Law;

9) it does not inform the consumer of the data referred to in Article 115 of this Law;

10) it acts contrary to Article 117, paragraph 1 or paragraph 2 or paragraph 3 of this Law;

11) it advertises or offers a tourist trip, a linked travel arrangement or an excursion contrary to Article 118 of this Law;

12) it acts contrary to Article 119 of this Law;

13) it does not inform the consumer of the data referred to in Article 120 of this Law;

14) it acts contrary to Article 121, paragraph 1 of this Law;

15) it acts contrary to Article 122, paragraph 4 of this Law;

16) it acts contrary to Article 123, paragraph 1 or paragraph 3 or paragraph 5 or paragraph 6 of this Law;

17) it unilaterally amends the contract contrary to Article 124, paragraph 1 of this Law;

18) it does not, without delay, inform the traveller of an amendment of essential provisions of the contract, contrary to Article 124, paragraph 2 or paragraph 3 of this Law;

19) the notice of an amendment of the terms of the contract does not contain the data referred to in Article 124, paragraph 4 of this Law;

20) it does not conclude a new contract and does not provide a new travel guarantee, contrary to Article 124, paragraph 6 of this Law;

21) it does not enable the traveller a reduction of the price in accordance with Article 124, paragraph 7 of this Law;

22) it acts contrary to Article 125, paragraph 4 or paragraph 5 or paragraph 6, or Article 127, paragraph 7 or paragraph 8 of this Law;

23) it does not, at the latest within a period of 48 hours, conclude a contract with the traveller, contrary to Article 128, paragraph 6 of this Law;

24) it acts contrary to Article 128, paragraph 8 or paragraph 9 of this Law;

25) it acts contrary to Article 129, paragraph 7 or paragraph 8 of this Law;

26) it acts contrary to Article 131, paragraph 1 or paragraph 3 of this Law;

27) it acts contrary to Article 132 of this Law;

28) it acts contrary to Article 134, paragraph 1 or paragraph 4 or paragraph 5 of this Law;

29) it limits its liability for compensation for damage to an amount which is less than three times the total price of the tourist trip, contrary to Article 136, paragraph 2 of this Law;

30) it does not enable the traveller to address, in a simple and accessible manner, the person responsible for the receipt of travellers' complaints during the tourist trip, contrary to Article 137, paragraph 1 of this Law;

31) it acts contrary to Article 138, paragraph 3 of this Law;

32) it does not reimburse the traveller the amounts paid in accordance with Article 140, paragraph 3 of this Law;

33) it does not act in accordance with Article 141, paragraph 1 or paragraph 2 or paragraph 5 of this Law;

34) it acts contrary to Article 142, paragraph 1 or Article 142, paragraph 3 of this Law;

35) it does not act in accordance with Article 143, paragraph 2 or paragraph 3 or paragraph 6 or paragraph 7 of this Law;

36) it acts contrary to Article 148 of this Law;

37) it acts contrary to Article 149, paragraph 1 or paragraph 4 of this Law;

38) it infringes the collective interest of consumers referred to in Article 192 of this Law;

39) it acts contrary to the measure for the protection of the collective interest of consumers referred to in Article 198 of this Law, which has been established by a final decision;

40) it acts contrary to the order contained in the decision of the inspector referred to in Article 206, paragraph 4 of this Law.

For the acts referred to in paragraph 1 of this Article, a natural person or the responsible person in a legal person shall be fined from 50,000 to 150,000 dinars.

For the acts referred to in paragraph 1 of this Article, an entrepreneur shall be fined from 50,000 to 500,000 dinars.
$en$,
  $sr$Члан 209.

Новчаном казном у износу од 300.000 до 2.000.000 динара, казниће се за прекршај правно лице ако:

1) не поступи у складу са чланом 10. став 1. или став 2. или став 3. или став 4. тачка 1) или став 4. тачка 2) или став 5. или став 6. или став 8. или став 9. или став 10. овог закона;

2) обавља непоштену пословну праксу из члана 17. овог закона;

3) обмањује потрошача на начин прописан чл. 18–20. овог закона;

4) обавља насртљиву пословну праксу, на начин прописан чл. 21. и 22. овог закона;

5) уколико не прибави сагласност потрошача за обављање додатног рада, у складу са чланом 92. овог закона;

6) не поступи у складу са чланом 104. став 2. или став 4. или став 5. овог закона;

7) поступи супротно члану 107. овог закона;

8) не дозвољава потрошачу да раскине уговор о пружању услуга од општег економског интереса, у складу са чланом 110. овог закона;

9) не обавести потрошача о подацима из члана 115. овог закона;

10) поступи супротно члану 117. став 1. или став 2. или став 3. овог законa;

11) оглашава или нуди туристичко путовање, повезан путни аранжман или излет супротно члану 118. овог закона;

12) поступи супротно члану 119. овог закона;

13) не обавести потрошача о подацима из члана 120. овог закона;

14) поступи супротно члану 121. став 1. овог закона;

15) поступи супротно члану 122. став 4. овог закона;

16) поступи супротно члану 123. став 1. или став 3. или став 5. или став 6. овог закона;

17) једнострано измени уговор супротно члану 124. став 1. овог закона;

18) без одлагања не обавести путника о измени битних одредаба уговора, супротно члану 124. став 2. или став 3. овог закона;

19) обавештење о измени услова уговора не садржи податке из члана 124. став 4. овог закона;

20) не закључи нови уговор и не обезбеди нову гаранцију путовања, супротно члану 124. став 6. овог закона;

21) не омогући путнику умањење цене у складу са чланом 124. став 7. овог закона;

22) поступи супротно члану 125. став 4. или став 5. или став 6. или члану 127. став 7. или став 8. овог закона;

23) најкасније у року од 48 сати не закључи уговор са путником, супротно члану 128. став 6. овог закона;

24) поступи супротно члану 128. став 8. или став 9. овог закона;

25) поступи супротно члану 129. став 7. или став 8. овог закона;

26) поступи супротно члану 131. став 1. или став 3. овог закона;

27) поступи супротно члану 132. овог закона;

28) поступи супротно члану 134. став 1. или став 4. или став 5. овог закона;

29) ограничи своју одговорност за накнаду штете на износ који је мањи од троструке укупне цене туристичког путовања, супротно члану 136. став 2. овог закона;

30) не омогући путнику да се на једноставан и приступачан начин обраћа лицу одговорном за пријем рекламација путника за време трајања туристичког путовања, супротно члану 137. став 1. овог закона;

31) поступи супротно члану 138. став 3. овог закона;

32) не изврши путнику повраћај уплаћених средстава у складу са чланом 140. став 3. овог закона;

33) не поступи у складу са чланом 141. став 1. или став 2. или став 5. овог закона;

34) поступи супротно члану 142. став 1. или члану 142. став 3. овог закона;

35) не поступи у складу са чланом 143. став 2. или став 3. или став 6. или став 7. овог закона;

36) поступи супротно члану 148. овог закона;

37) поступи супротно члану 149. став 1. или став 4. овог закона;

38) повреди колективни интерес потрошача из члана 192. овог закона;

39) поступи супротно мери заштите колективног интереса потрошача из члана 198. овог закона, што је утврђено коначним решењем;

40) поступи супротно налогу из решења инспектора из члана 206. став 4. овог закона.

За радње из става 1. овог члана казниће се физичко лице или одговорно лице у правном лицу новчаном казном од 50.000 до 150.000 динара.

За радње из става 1. овог члана казниће се предузетник новчаном казном од 50.000 до 500.000 динара.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 210. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '210',
  NULL,
  $en$Article 210.

A legal person shall be fined for a misdemeanour in the amount of 200,000 dinars if:

1) it does not act in accordance with Articles 6–9 of this Law;

2) it acts contrary to Article 11 of this Law;

3) it does not inform the consumer, in accordance with Article 12 of this Law;

4) it charges additional costs without the prior express consent of the consumer, in accordance with Article 13 of this Law;

5) it sells, delivers, serves and gives as a gift alcoholic beverages, including beer, tobacco and related products, electronic devices for heating a tobacco, that is, a herbal product, electronic cigarettes, in accordance with the regulation governing tobacco, or pyrotechnic devices, to persons younger than 18 years of age, contrary to Article 24, paragraph 1 of this Law;

6) it refuses to sell to the consumer goods which are displayed or otherwise prepared for sale, or refuses the provision of a service which can be performed, if this is not contrary to another regulation and to generally accepted business customs, contrary to Article 26, paragraph 1 of this Law;

7) it acts contrary to Article 26, paragraph 3 or paragraph 4 of this Law;

8) it does not inform the consumer, before the conclusion of a distance contract and of contracts which are concluded off business premises, of the data referred to in Articles 27 and 28 of this Law;

9) it acts contrary to Article 31 of this Law;

10) it acts contrary to Article 32 of this Law;

11) it does not deliver the goods or the service to the consumer within the time limit prescribed by Article 33, paragraph 1 of this Law;

12) it acts contrary to Article 35 of this Law;

13) it acts contrary to Article 39 of this Law;

14) it sends consignments which the consumer has not ordered, contrary to Article 40 of this Law;

15) it carries out advertising by means of distance communication, contrary to Article 41 of this Law;

16) it does not obtain consent in accordance with Article 42 of this Law;

17) it does not act in accordance with Article 48, paragraph 1 or paragraph 2 or paragraph 4 of this Law;

18) it does not act in accordance with Article 49 of this Law;

19) upon delivery of the goods, it does not hand over to the consumer the accompanying documentation relating to the goods, in accordance with Article 50 of this Law;

20) it does not return to the consumer the entire amount paid on the basis of the contract in the event of termination of the contract, in accordance with Article 51, paragraph 4 of this Law;

21) it does not act in accordance with Article 54, paragraphs 1 and 2 of this Law;

22) it does not act in accordance with Article 61, paragraph 3 or paragraph 4 of this Law;

23) it uses the expression "commercial guarantee" and an expression with that meaning, contrary to Article 62 of this Law;

24) it acts contrary to Article 63, paragraph 3 or paragraph 4 or paragraph 6 or paragraph 7 or paragraph 8 or paragraph 9 or paragraph 10 or paragraph 11 or paragraph 12 of this Law;

25) it does not deliver digital content or a digital service without delay, immediately after the conclusion of the contract, in accordance with Article 73, paragraph 1 of this Law;

26) the digital content or the digital service which it has delivered does not meet the requirements of Article 74 of this Law;

27) it does not act in accordance with Article 80, paragraph 3 of this Law;

28) it does not reimburse the payments which it has received from the consumer within the meaning of Article 82, paragraphs 1 and 2 of this Law;

29) it does not reimburse the consumer every amount within the meaning of Article 80, paragraphs 4, 5 and 6 or of Article 82, paragraphs 1 and 2 of this Law, within the time limit referred to in Article 84, paragraph 1 of this Law;

30) it does not act in accordance with Article 85, paragraph 1 of this Law;

31) it does not act in accordance with Article 96, paragraph 1 of this Law;

32) it does not inform the consumer of the data referred to in Articles 108 or 109 of this Law;

33) it does not issue a bill for services of general economic interest in accordance with the requirements of the specification of the bill referred to in Article 112 of this Law;

34) it does not provide or does not publicly publish a telephone line free of charge, in accordance with Article 113 of this Law;

35) it does not act in accordance with Article 173, paragraph 2 or paragraph 3 of this Law;

36) it does not state its position in accordance with Article 183, paragraphs 2 and 3 of this Law;

37) it does not participate in the oral hearing in accordance with Article 184, paragraph 2 of this Law.

For the misdemeanour referred to in paragraph 1 of this Article, the responsible person in the legal person shall also be fined in the amount of 50,000 dinars.

For the misdemeanour referred to in paragraph 1 of this Article, the entrepreneur shall also be fined in the amount of 100,000 dinars.
$en$,
  $sr$Члан 210.

Новчаном казном у износу од 200.000 динара казниће се за прекршај правно лице ако:

1) не поступи у складу са чл. 6–9. овог закона;

2) поступи супротно члану 11. овог закона;

3) не обавештава потрошача, у складу са чланом 12. овог закона;

4) наплати додатне трошкове без претходне изричите сагласности потрошача, у складу са чланом 13. овог закона;

5) продаје, испоручује, услужује и поклања алкохолна пића, укључујући пиво, дуванске и сродне производе, електронске уређаје за загревање дуванског односно биљног производа, електронске цигарете, у складу са прописом којим се регулише дуван, или пиротехничка средства, лицима млађим од 18 година живота, супротно члану 24. став 1. овог закона;

6) одбије да потрошачу прода робу која је изложена или на други начин припремљена за продају или одбије пружање услуге која се може обавити, уколико то није у супротности са другим прописом и општеприхваћеним пословним обичајима, супротно члану 26. став 1. овог закона;

7) поступи супротно члану 26. став 3. или став 4. овог закона;

8) не обавештава потрошача пре закључења уговора на даљину и уговора који се закључују изван пословних просторија о подацима из чл. 27. и 28. овог закона;

9) поступи супротно члану 31. овог закона;

10) поступи супротно члану 32. овог закона;

11) не изврши испоруку робе или услуге потрошачу у року прописаном чланом 33. став 1. овог закона;

12) поступи супротно члану 35. овог закона;

13) поступи супротно члану 39. овог закона;

14) шаље пошиљке које потрошач није наручио, супротно члану 40. овог закона;

15) врши оглашавање путем средстава комуникације на даљину, супротно члану 41. овог закона;

16) не прибави сагласност у складу са чланом 42. овог закона;

17) не поступи у складу са чланом 48. став 1. или став 2. или став 4. овог закона;

18) не поступи у складу са чланом 49. овог закона;

19) потрошачу приликом испоруке робе, не преда пратећу документацију која се односи на робу, у складу са чланом 50. овог закона;

20) не врати потрошачу целокупан износ плаћен по основу уговора у случају раскида уговора, у складу са чланом 51. став 4. овог закона;

21) не поступи у складу са чланом 54. ст. 1. и 2. овог закона;

22) не поступи у складу са чланом 61. став 3. или став 4. овог закона;

23) употребљава израз „комерцијална гаранција” и израз с тим значењем, супротно члану 62. овог закона;

24) поступи супротно члану 63. став 3. или став 4. или став 6. или став 7. или став 8. или став 9. или став 10. или став 11. или став 12. овог закона;

25) не испоручи дигитални садржај или дигиталну услугу без одлагања, одмах након закључења уговора, у складу са чланом 73. став 1. овог закона;

26) дигитални садржај или дигитална услуга коју је испоручио не испуњава захтеве из члана 74. овог закона;

27) не поступи у складу са чланом 80. став 3. овог закона;

28) не изврши повраћај уплата које је примио од потрошача у смислу члана 82. ст. 1. и 2. овог закона;

29) потрошачу не изврши повраћај сваког износа у смислу члана 80. ст. 4, 5. и 6. или члана 82. ст. 1. и 2. овог закона, у року из члана 84. став 1. овог закона;

30) не поступи у складу са чланом 85. став 1. овог закона;

31) не поступи у складу са чланом 96. став 1. овог закона;

32) не обавештава потрошача о подацима из чл. 108. или 109. овог закона;

33) не изда рачун за услуге од општег економског интереса у складу са захтевима спецификације рачуна из члана 112. овог закона;

34) не обезбеди или јавно не објави бесплатну телефонску линију, у складу са чланом 113. овог закона;

35) не поступи у складу са чланом 173. став 2. или став 3. овог закона;

36) не изјасни се у складу са чланом 183. ст. 2. и 3. овог закона;

37) не учествује у усменој расправи у складу са чланом 184. став 2. овог закона.

За прекршај из става 1. овог члана казниће се и одговорно лице у правном лицу новчаном казном у износу од 50.000 динара.

За прекршај из става 1. овог члана казниће се и предузетник новчаном казном у износу од 100.000 динара.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 211. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '211',
  NULL,
  $en$Determination of the penalty

Article 211.

The penalty for misdemeanours is determined in accordance with the law governing misdemeanours, taking into account mitigating and aggravating circumstances such as:

1) the nature of the infringement;

2) the gravity of the infringement;

3) the scope and duration of the infringement;

4) any action which the trader has taken in order to mitigate or remedy the damage which the consumer, that is, the consumers, have suffered;

5) previous infringements of the trader established by this Law;

6) the financial benefit which the trader has obtained or the losses which the trader has avoided as a result of the infringement of the rights of consumers, if those data are available,

7) sanctions imposed on the trader for the same infringement in other states in proceedings which relate to cross-border cases, if information on such sanctions is available;

8) as well as other mitigating and aggravating circumstances.
$en$,
  $sr$Одмеравање казне

Члан 211.

Казна за прекршаје одмерава се у складу са законом којим се уређују прекршаји, узимајући у обзир олакшавајуће и отежавајуће околности као што су:

1) природа повреде;

2) тежина повреде;

3) обим и трајање повреде;

4) свака радња коју је трговац предузео како би ублажио или поправио штету коју је потрошач односно потрошачи претрпели;

5) раније овим законом утврђене повреде трговца;

6) финансијска добит коју је остварио или губици које је трговац избегао због повреде права потрошача, ако су ти подаци доступни,

7) санкције изречене трговцу за исту повреду у другим државама у поступцима који се односе на прекограничне случајеве, ако су информације о таквим санкцијама доступне;

8) као и друге олакшавајуће и отежавајуће околности.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 212. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '212',
  NULL,
  $en$Protective measure

Article 212.

In addition to the misdemeanour penalty referred to in Article 209, paragraph 1, point 1) for infringement of Article 10, paragraphs 2–5, and in addition to the misdemeanour penalty referred to in Article 209, paragraph 1, point 40) of this Law, a protective measure prohibiting the carrying out of certain activities, for a duration of six months to one year, as well as a protective measure of public publication of the judgment, may also be imposed on a legal person.

In addition to the misdemeanour penalty referred to in Article 209, paragraph 2 of this Law, for the acts referred to in Article 209, paragraph 1, point 1) for infringement of Article 10, paragraphs 2–5, and in addition to the misdemeanour penalty referred to in Article 209, paragraph 1, point 40) of this Law, a measure prohibiting the performance of certain duties, for a duration of three months to one year, may be imposed on the responsible person in the legal person.

In addition to the misdemeanour penalty referred to in Article 209, paragraph 3 of this Law, for the acts referred to in Article 209, paragraph 1, point 1) for infringement of Article 10, paragraphs 2–5, and in addition to the misdemeanour penalty referred to in Article 209, paragraph 1, point 40) of this Law, a protective measure prohibiting the performance of certain activities, for a duration of six months to one year, may also be imposed on the entrepreneur.
$en$,
  $sr$Заштитна мера

Члан 212.

Уз прекршајну казну из члана 209. став 1. тачка 1) за повреду члана 10. ст. 2-5. и уз прекршајну казну из члана 209. став 1. тачка 40) овог закона, правном лицу се може изрећи и заштитна мера забране да врши одређене делатности у трајању од шест месеци до годину дана, као и заштитна мера јавног објављивања пресуде.

Уз прекршајну казну из члана 209. став 2. овог закона, за радње из члана 209. став 1. тачка 1) за повреду члана 10. ст. 2–5. и уз прекршајну казну из члана 209. став 1. тачка 40) овог закона, одговорном лицу у правном лицу може се изрећи мера забране да врши одређене послове у трајању од три месеца до једне године.

Уз прекршајну казну из члана 209. став 3. овог закона, за радње из члана 209. став 1. тачка 1) за повреду члана 10. ст. 2–5. и уз прекршајну казну из члана 209. став 1. тачка 40) овог закона, предузетнику се може изрећи и заштитна мера забране вршења одређених делатности у трајању од шест месеци до годину дана.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 213. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '213',
  NULL,
  $en$Limitation of misdemeanours

Article 213.

Misdemeanour proceedings for the misdemeanours referred to in Articles 209 and 210 of this Law may not be initiated or conducted if two years have elapsed from the day on which the misdemeanour was committed, except for the misdemeanours referred to in Article 209, paragraph 1, points 38) and 39) of this Law, in respect of which misdemeanour proceedings may not be initiated or conducted if three years have elapsed from the day on which the misdemeanour was committed.

To questions of limitation of the initiation and conduct of misdemeanour proceedings which are not regulated by this Law, the provisions of the law governing misdemeanours shall apply.
$en$,
  $sr$Застарелост прекршаја

Члан 213.

Прекршајни поступак за прекршаје из чл. 209. и 210. овог закона не може се покренути ни водити ако протекну две године од дана када је прекршај учињен, осим прекршаја из члана 209. став 1. тач. 38) и 39) овог закона, за које се прекршајни поступак не може покренути ни водити ако протекну три године од дана када је прекршај учињен.

На питања застарелости покретања и вођења прекршајног поступка која нису уређена овим законом примењују се одредбе закона којим се уређују прекршаји.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 214. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '214',
  NULL,
  $en$Article 214.

Bodies for the out-of-court resolution of consumer disputes shall be entered in the list of bodies for the out-of-court resolution of consumer disputes under the conditions and in the manner prescribed by the bylaw referred to in Article 171, paragraph 3 of this Law.
$en$,
  $sr$Члан 214.

Тела за вансудско решавање потрошачких спорова уписују се у листу тела за вансудско решавање потрошачких спорова под условима и на начин прописан подзаконским актом из члана 171. став 3. овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 215. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '215',
  NULL,
  $en$Article 215.

Proceedings which have not been completed by the day of the beginning of application of this Law shall be completed in accordance with the provisions of the regulations under which they were commenced.
$en$,
  $sr$Члан 215.

Поступци који нису окончани до дана почетка примене овог закона, окончаће се по одредбама прописа по којима су започети.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 216. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '216',
  NULL,
  $en$Article 216.

Bylaws which are adopted on the basis of authorisations under this Law shall be adopted within a period of one year from the day of entry into force of this Law.
$en$,
  $sr$Члан 216.

Подзаконски акти који се доносе на основу овлашћења из овог закона биће донети у року од годину дана од дана ступања на снагу овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 217. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '217',
  NULL,
  $en$Article 217.

Until the adoption of bylaws on the basis of authorisations under this Law, bylaws adopted until the day of entry into force of this Law shall apply, if they are not contrary to this Law.
$en$,
  $sr$Члан 217.

До доношења подзаконских аката на основу овлашћења из овог закона примењиваће се подзаконски акти донети до дана ступања на снагу овог закона, ако нису у супротности са овим законом.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 218. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '218',
  NULL,
  $en$Article 218.

The provisions of this Law shall apply to digital content or digital services which are delivered after the beginning of application of this Law, except Articles 85 and 86 of this Law, which apply only to contracts concluded from the beginning of application of this Law.
$en$,
  $sr$Члан 218.

Одредбе овог закона примењују се на дигитални садржај или дигиталне услуге који се испоручују након почетка примене овог закона осим чл. 85. и 86. овог закона који се примењују само на уговоре закључене од почетка примене овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 219. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '219',
  NULL,
  $en$Article 219.

On the day of the beginning of application of this Law, the Law on Consumer Protection ("Official Gazette of the RS", No. 88/21) shall cease to have effect.
$en$,
  $sr$Члан 219.

Даном почетка примене овог закона престаје да важи Закон о заштити потрошача („Службени гласник РС”, број 88/21).
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- Члан 220. expect 1 row. application 2026-08-01
INSERT INTO legal_articles (
  jurisdiction, law_name, law_name_local, law_category,
  article_num, paragraph_num, text, text_local, source_url, effective_date
) VALUES (
  'serbia',
  'Law on Consumer Protection',
  $law$ЗАКОН о заштити потрошача$law$,
  'civil',
  '220',
  NULL,
  $en$Article 220.

This Law shall enter into force on the eighth day from the day of publication in the "Official Gazette of the Republic of Serbia", and shall apply upon the expiry of three months from the day of entry into force of this Law, except Article 4, paragraph 1 and Article 6, which begin to apply upon the entry into force of this Law.
$en$,
  $sr$Члан 220.

Овај закон ступа на снагу осмог дана од дана објављивања у „Службеном гласнику Републике Србије”, а примењује се по истеку три месеца од дана ступања на снагу овог закона, осим члана 4. став 1. и члана 6, који почињу да се примењују ступањем на снагу овог закона.
$sr$,
  'https://pravno-informacioni-sistem.rs/viewAct/be0650dc-af85-4a3d-8539-4a4796616ee6',
  DATE '2026-08-01'
);

-- After the inserts, before the DELETE. Expected: rows 358, curated 220.
-- Of the curated rows: 2026-05-01 = 2, 2026-08-01 = 218.
-- After rs-potrosaci-delete-bulk.sql: rows 220, curated 220, same dates.
SELECT
  count(*) AS rows,
  count(*) FILTER (WHERE text IS DISTINCT FROM text_local) AS curated,
  count(*) FILTER (WHERE effective_date = DATE '2026-05-01') AS from_1_may,
  count(*) FILTER (WHERE effective_date = DATE '2026-08-01') AS from_1_august
FROM legal_articles
WHERE jurisdiction = 'serbia'
  AND law_name_local = $law$ЗАКОН о заштити потрошача$law$;
