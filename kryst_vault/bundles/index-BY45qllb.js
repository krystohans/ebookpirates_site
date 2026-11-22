var Gl=Object.defineProperty;var Vl=(i,e,t)=>e in i?Gl(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var nt=(i,e,t)=>Vl(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}})();const zo={success:!0,generatedAt:"2026-11-22T07:30:00.000Z",userEmail:"kapitany.demo@ebookpirates.hu",profile:{email:"kapitany.demo@ebookpirates.hu",kaloznev:"Krystohans Minta Kapitány",rang:"Korvettkapitány",rang_kep_azonosito:"",rang_kep_data:null,kredit:1840,hartya:325,tekercs:14,masolat:5,talentum:42.75,letkristaly:19,konyv:4,kristalykonyv:2,csonak:1,vitorlas:1,merulo:1,leghajo:0,hajonaplo:1,terkep:3,patreonTagnev:"Kryst Aranytag",aktualisAllas:"Kikötőben készenlétben",betazoTekercs:"AKTÍV",szolgalatKezdete:"2026.05.12",jsonAdat:null},monkStats:{isMonk:!0,name:"Krystohans Testvér",editorDb:12,editorAtlag:94.5,szkriptorDb:8,szkriptorAtlag:91,piktorDb:4,piktorAtlag:96.2,inspektorDb:5,inspektorAtlag:93.8,specialisCim:"LET-Krónikás"},treasuresAndMarket:{treasures:[{id:"KINCS-001",name:"Obszidián Tengerészeti Asztrolábium",description:"+15% éjszakai csillagnavigációs pontosság viharban is.",isListedOnMarket:!1},{id:"KINCS-002",name:"Arany Iránytű-Taliszmán",description:"Kereskedelmi útvonalakon +10% zsákmányszorzó.",isListedOnMarket:!0}],activeListings:[{listingId:"HIR-9042",itemType:"kincs",itemIdentifier:"KINCS-002",isFixedPrice:!0,price:450,buyNowPrice:450,status:"aktív",dateListed:"2026.11.18"}],myOffers:[{offerId:"LIC-331",listingId:"HIR-8810",offeredItemsRaw:'{"kredit":220}',offeredItems:{kredit:220},status:"aktív"}],gearItems:[{id:"KEL-SPY-01",name:"Bronz Sárgaréz Látcső",category:"Felderítés",description:"Megduplázza a látótávolságot zátonyos szorosokban.",quantity:1},{id:"KEL-DIV-02",name:"Sűrített Légtartály-Kapszula",category:"Búvárfelszerelés",description:"+20 perc víz alatti tartalék oxigén.",quantity:2}]},library:{books:[{title:"Abris Óceánjainak Titkos Krónikája",author:"Krystohans",downloadLink:"AB0101",language:"Magyar",category:"Kristálykönyv",productType:"Kristálykönyv",isKrystNative:!0,krystWorkId:"AB0101",krystVault:null,formats:["kryst","epub"],debt:0,talentum:12,price:29,isbn:"978-615-0001-01-1",soldCount:38,paidCount:35,unpaidCount:3,dateAdded:"2026.06.01",isListedOnMarket:!1},{title:"Óramű-Kikötők Mérnöki Kézikönyve",author:"Főgépész Barnabás",downloadLink:"OM2044",language:"Magyar",category:"Regény",productType:"Könyv",isKrystNative:!0,krystWorkId:"OM2044",krystVault:null,formats:["kryst","epub"],debt:0,talentum:5,price:18,isbn:"",soldCount:11,paidCount:11,unpaidCount:0,dateAdded:"2026.08.14",isListedOnMarket:!1}],copies:[{title:"Abris Óceánjainak Titkos Krónikája",author:"Krystohans",copyCode:"AB0101-M03",code:"AB0101-M03",value:140,inPlay:!1,inGame:"NEM",consecrated:"IGEN",dateAdded:"2026.09.02",isKrystNative:!0,krystWorkId:"AB0101",krystVault:null,isListedOnMarket:!1}],scrolls:[{title:"Abris Óceánjainak Titkos Krónikája",author:"Krystohans",fejezet:"3. Fejezet — A Sárgaréz Zátony",copyCode:"AB0101-M03",scrollToken:"TEK-TOK-7712",token:"TEK-TOK-7712",scrollCode:"SC-03",gameMode:"Expedíció",questReward:"150 Kr + 1 Letkristály",isKrystNative:!0,krystWorkId:"AB0101",isListedOnMarket:!1}],maps:[{identifier:"koponya_sziget_deli_atjaro",name:"Koponya-sziget Déli Átjáró",fileId:"DEMO_MAP_01",date:"2026.10.21",drawnAt:"2026.10.21",status:"engedélyezve",sentToGame:"IGEN",expeditionName:"Déli Átjáró Expedíció",gameMode:"Kincskeresés",isListedOnMarket:!1}],logs:[{id:"LOG_DEMO_01",logId:"LOG_DEMO_01",name:"Arany Főnix Hajónaplója",fileId:"DEMO_LOG_FILE_01"}],pendingMonasteryWorks:[]},vehicles:[{id:"SHIP-BRIG-01",name:"Arany Főnix",type:"Brigantin",category:"Vitorlás",sheetName:"hajok",length:"38 m",description:"Megerősített rézpalánkos kétárbócos felderítő- és kísérőhajó.",logId:"LOG_DEMO_01",ownerEmail:"kapitany.demo@ebookpirates.hu",ownerName:"Krystohans Minta Kapitány",captainEmail:"kapitany.demo@ebookpirates.hu",captainName:"Krystohans Minta Kapitány",userRole:"Tulajdonos",isOwner:!0,isCaptain:!0,sizeRange:"Közepes-Nagy",artilleryLevel:"4. szint (16 ágyú)",defenseLevel:"3. szint (Rézpalánk)",locatorLevel:"2. szint (Kibernetikus iránytű)",maxSpeed:"18 csomó",maxAltitude:"0 m",maxDepth:"0 m",durability:1080,maxDurability:1200,durabilityPct:90,inHarbor:!0,helyzet:"Kikötőben",equipment:{mentocsonak:"2 db",merulo:"Nincs",navigalogep:"Kryst-II Óramű",hartyahalaszo:"Aktív (1 háló)",halaszfelszereles:"2. szint",szigonyagyu:"Acél Szigonyágyú Mk.II",tekercspres:"Beépített Kézisajtó",konyvtar:"12 kötetes kabinpolc"},equipmentList:[{key:"mentocsonak",label:"Mentőcsónak db",value:"2 db",installed:!0},{key:"merulo",label:"Merülő",value:"Nincs",installed:!1},{key:"navigalogep",label:"Navigálógép",value:"Kryst-II Óramű",installed:!0},{key:"hartyahalaszo",label:"Hártyahalászó",value:"Aktív (1 háló)",installed:!0},{key:"halaszfelszereles",label:"Halászfelszerelés",value:"2. szint",installed:!0},{key:"szigonyagyu",label:"Szigonyágyú",value:"Acél Szigonyágyú Mk.II",installed:!0},{key:"tekercspres",label:"Tekercsprés",value:"Beépített Kézisajtó",installed:!0},{key:"konyvtar",label:"Könyvtár",value:"12 kötetes kabinpolc",installed:!0}],installedEquipmentCount:7,officers:[{role:"Navigátor",email:"szeljarolilla@ebookpirates.hu",name:"Széljáró Lilla"},{role:"Gépész",email:"vaspal@ebookpirates.hu",name:"Vaskezű Pál"}],sailors:[{slot:"Tengerész_1",email:"matroz1@ebookpirates.hu",name:"Sós Jakab"}],passengers:[],crewMembers:[{role:"Tulajdonos",email:"kapitany.demo@ebookpirates.hu",name:"Krystohans Minta Kapitány",group:"command"},{role:"Navigátor",email:"szeljarolilla@ebookpirates.hu",name:"Széljáró Lilla",group:"officer"},{role:"Gépész",email:"vaspal@ebookpirates.hu",name:"Vaskezű Pál",group:"officer"},{role:"Tengerész",slot:"Tengerész_1",email:"matroz1@ebookpirates.hu",name:"Sós Jakab",group:"sailor"}],officerSlotsTotal:14,sailorSlotsTotal:100,passengerSlotsTotal:40,isListedOnMarket:!1},{id:"SUB-DEL-07",name:"Nautilus Smaragd",type:"Delejes búvárhajó",category:"Búvárhajó",sheetName:"buvarhajok",length:"22 m",description:"Mélytengeri kristálykutató búvárhajó csendes turbinával.",logId:"",ownerEmail:"kapitany.demo@ebookpirates.hu",ownerName:"Krystohans Minta Kapitány",captainEmail:"",captainName:"Nincs kinevezve",userRole:"Tulajdonos",isOwner:!0,isCaptain:!1,sizeRange:"Közepes",artilleryLevel:"2. szint (Torpedó)",defenseLevel:"4. szint (Nyomásálló)",locatorLevel:"4. szint (Szonár)",maxSpeed:"14 csomó",maxAltitude:"0 m",maxDepth:"850 m",durability:420,maxDurability:600,durabilityPct:70,inHarbor:!0,helyzet:"Kikötőben",equipment:{mentocsonak:"1 db Mentőkapszula",merulo:"Beépített zsiliptér",navigalogep:"Delejes Mélységmérő",hartyahalaszo:"Nincs",halaszfelszereles:"Mélyvízi háló",szigonyagyu:"Nincs",tekercspres:"Nincs",konyvtar:"Vízhatlan 4 kötetes trezor"},equipmentList:[{key:"mentocsonak",label:"Mentőcsónak db",value:"1 db Mentőkapszula",installed:!0},{key:"merulo",label:"Merülő",value:"Beépített zsiliptér",installed:!0},{key:"navigalogep",label:"Navigálógép",value:"Delejes Mélységmérő",installed:!0},{key:"hartyahalaszo",label:"Hártyahalászó",value:"Nincs",installed:!1},{key:"halaszfelszereles",label:"Halászfelszerelés",value:"Mélyvízi háló",installed:!0},{key:"szigonyagyu",label:"Szigonyágyú",value:"Nincs",installed:!1},{key:"tekercspres",label:"Tekercsprés",value:"Nincs",installed:!1},{key:"konyvtar",label:"Könyvtár",value:"Vízhatlan 4 kötetes trezor",installed:!0}],installedEquipmentCount:5,officers:[],sailors:[],passengers:[],crewMembers:[{role:"Tulajdonos",email:"kapitany.demo@ebookpirates.hu",name:"Krystohans Minta Kapitány",group:"command"}],officerSlotsTotal:12,sailorSlotsTotal:100,passengerSlotsTotal:40,isListedOnMarket:!1}],skills:{found:!0,sheetGid:667526717,name:"Krystohans Minta Kapitány",roleRank:"Korvettkapitány",cost:120,trait:"Vihar-látó & Kódex-tudós",employerEmail:"",employerName:"",serviceEndStr:"",status:"Keresek munkát",desiredPosition:"Navigátor",skillsList:[{name:"Navigátor",category:"Hajózás",value:88,raw:"88%"},{name:"Kormányos",category:"Hajózás",value:76,raw:"76%"},{name:"Vitorlamester",category:"Hajózás",value:64,raw:"64%"},{name:"Fedélzetmester",category:"Hajózás",value:58,raw:"58%"},{name:"Tüzér",category:"Harc & Felderítés",value:62,raw:"62%"},{name:"Hajóorvos",category:"Műszaki & Műhely",value:40,raw:"40%"},{name:"Hajószakács",category:"Műszaki & Műhely",value:35,raw:"35%"},{name:"Térképrajzoló",category:"Tudomány & Kolostor",value:92,raw:"92%"},{name:"Tekercsmester",category:"Tudomány & Kolostor",value:84,raw:"84%"},{name:"Felfedező",category:"Harc & Felderítés",value:79,raw:"79%"},{name:"Gépész",category:"Műszaki & Műhely",value:69,raw:"69%"},{name:"Hajóács",category:"Műszaki & Műhely",value:54,raw:"54%"},{name:"Letmester",category:"Tudomány & Kolostor",value:81,raw:"81%"},{name:"Monk",category:"Tudomány & Kolostor",value:90,raw:"90%"},{name:"Tengerész",category:"Hajózás",value:72,raw:"72%"}],skillsMap:{Navigátor:88,Kormányos:76,Vitorlamester:64,Fedélzetmester:58,Tüzér:62,Hajóorvos:40,Hajószakács:35,Térképrajzoló:92,Tekercsmester:84,Felfedező:79,Gépész:69,Hajóács:54,Letmester:81,Monk:90,Tengerész:72},averageSkill:69.6,maxSkill:92,topSkillName:"Térképrajzoló"},crew:[{id:"szeljarolilla@ebookpirates.hu",name:"Széljáró Lilla",email:"szeljarolilla@ebookpirates.hu",sourceType:"Játékos",sourceSheet:"jatekoskepzettsegek",role:"Fregatthadnagy (Navigátor)",rawRole:"Navigátor",cost:85,trait:"Éjszakai csillagolvasó (+15% vihar-navigáció)",remainingDays:5,endDateStr:"2026.11.27",status:"Aktív szolgálatban",desiredPosition:"Navigátor",canManage:!0,assignedShips:[{shipId:"SHIP-BRIG-01",shipName:"Arany Főnix",shipType:"Brigantin",category:"Vitorlás",role:"Navigátor"}],skillsList:[{name:"Navigátor",category:"Hajózás",value:94,raw:"94%"},{name:"Térképrajzoló",category:"Tudomány & Kolostor",value:86,raw:"86%"},{name:"Kormányos",category:"Hajózás",value:78,raw:"78%"},{name:"Felfedező",category:"Harc & Felderítés",value:74,raw:"74%"}],topSkills:[{name:"Navigátor",category:"Hajózás",value:94,raw:"94%"},{name:"Térképrajzoló",category:"Tudomány & Kolostor",value:86,raw:"86%"},{name:"Kormányos",category:"Hajózás",value:78,raw:"78%"}]},{id:"vaspal@ebookpirates.hu",name:"Vaskezű Pál",email:"vaspal@ebookpirates.hu",sourceType:"NPC",sourceSheet:"npc",role:"Főgépész & Ágyúmester",rawRole:"Gépész",cost:95,trait:"Öreg Óramű-kovács: menet közben 2× gyorsabb hajójavítás",remainingDays:19,endDateStr:"2026.12.11",status:"Aktív zsoldos",desiredPosition:"",canManage:!0,assignedShips:[{shipId:"SHIP-BRIG-01",shipName:"Arany Főnix",shipType:"Brigantin",category:"Vitorlás",role:"Gépész"}],skillsList:[{name:"Gépész",category:"Műszaki & Műhely",value:91,raw:"91%"},{name:"Hajóács",category:"Műszaki & Műhely",value:87,raw:"87%"},{name:"Tüzér",category:"Harc & Felderítés",value:79,raw:"79%"}],topSkills:[{name:"Gépész",category:"Műszaki & Műhely",value:91,raw:"91%"},{name:"Hajóács",category:"Műszaki & Műhely",value:87,raw:"87%"},{name:"Tüzér",category:"Harc & Felderítés",value:79,raw:"79%"}]},{id:"matroz1@ebookpirates.hu",name:"Sós Jakab",email:"matroz1@ebookpirates.hu",sourceType:"Hajó-legénység",sourceSheet:"hajok",role:"Tengerész",rawRole:"Tengerész",cost:30,trait:"Kitartó kötélmászó (alacsony bérigény)",remainingDays:null,endDateStr:"Hajó-beosztás",status:"Szolgálatban",desiredPosition:"",canManage:!1,assignedShips:[{shipId:"SHIP-BRIG-01",shipName:"Arany Főnix",shipType:"Brigantin",category:"Vitorlás",role:"Tengerész"}],skillsList:[],topSkills:[]}],warnings:[]};function at(i){return String(i??"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim()}const zr=[{label:"🔫 Szigonyágyús hajók",query:"Melyik hajómon van szigonyágyú?"},{label:"⏳ Lejáró zsoldosok (≤14 nap)",query:"Kinek jár le a szerződése 14 napon belül?"},{label:"🧭 Képzettségek >= 60% (SQL)",query:"SELECT kepzettseg, kategoria, ertek FROM skills WHERE ertek >= 60 ORDER BY ertek DESC"},{label:"⭐ Legjobb navigátor",query:"Ki a legjobb navigátor a felvett embereim közül?"},{label:"🛡️ Hajó állapot SQL",query:"SELECT nev, tipus, elettartam, max_elettartam, szazalek, helyzet FROM vehicles ORDER BY szazalek ASC"},{label:"⚖️ Piacon & játékban lévők",query:"Milyen tételeim vannak a piacon vagy játékban?"},{label:"💎 Kristálykönyvek (SQL)",query:"SELECT cim, szerzo, nyelv, kryst_nativ FROM books WHERE kryst_nativ = igen"},{label:"🧠 AI Expedíció Csapat-tanács",query:"Állítsd össze a legjobb csapatot és járművet a vagyonom, hajóim és embereim képzettségei alapján!",preferAi:!0}];function Wl(i){const e={},t={},n=(M,L,U)=>{for(const W of M)e[W]=L,t[W]=U},s=[],a=[];for(const M of i.vehicles)s.push({id:M.id,nev:M.name,tipus:M.type,kategoria:M.category,szerep:M.userRole,helyzet:M.helyzet,elettartam:M.durability,max_elettartam:M.maxDurability,szazalek:M.durabilityPct,sebesseg:M.maxSpeed,tuzerseg:M.artilleryLevel,vedelem:M.defenseLevel,lokator:M.locatorLevel,hossz:M.length,merules:M.maxDepth,magassag:M.maxAltitude,mentocsonak:M.equipment.mentocsonak||"Nincs",merulo:M.equipment.merulo||"Nincs",navigalogep:M.equipment.navigalogep||"Nincs",hartyahalaszo:M.equipment.hartyahalaszo||"Nincs",halaszfelszereles:M.equipment.halaszfelszereles||"Nincs",szigonyagyu:M.equipment.szigonyagyu||"Nincs",tekercspres:M.equipment.tekercspres||"Nincs",konyvtar:M.equipment.konyvtar||"Nincs",felszereles_db:M.installedEquipmentCount,legenyseg_db:M.crewMembers.length,piacon:M.isListedOnMarket?"igen":"nem"}),a.push({section:"vehicles",itemId:M.id,title:M.name});n(["vehicles","hajok","jarmuvek","flotta"],s,a);const r=[],l=[];for(const M of i.crew){const L=M.topSkills.map(W=>`${W.name} ${W.value}%`).join(", "),U=M.assignedShips.map(W=>`${W.shipName} (${W.role})`).join(", ");r.push({id:M.id,nev:M.name,forras:M.sourceType,szerep:M.role,tulajdonsag:M.trait,koltseg:M.cost,hatralevo_napok:M.remainingDays!==null?M.remainingDays:9999,lejarat:M.endDateStr,statusz:M.status,hajok:U||"Tartalék",top_kepzettsegek:L||"-"}),l.push({section:"crew",itemId:M.id,title:M.name})}n(["crew","emberek","legenyseg","zsoldosok"],r,l);const o=[],c=[];for(const M of i.skills.skillsList)o.push({kepzettseg:M.name,kategoria:M.category,ertek:M.value,nyers:M.raw}),c.push({section:"skills",itemId:M.name,title:`${M.name} (${M.value}%)`});n(["skills","kepzettsegek"],o,c);const d=[],h=[];for(const M of i.library.books)d.push({kod:M.downloadLink,cim:M.title,szerzo:M.author,nyelv:M.language,tipus:M.productType,kryst_nativ:M.isKrystNative?"igen":"nem",talentum:M.talentum,tartozas:M.debt,piacon:M.isListedOnMarket?"igen":"nem"}),h.push({section:"library",itemId:M.downloadLink,title:M.title});n(["books","konyvek"],d,h);const u=[],g=[];for(const M of i.library.copies)u.push({kod:M.copyCode,cim:M.title,szerzo:M.author,ertek:M.value,felszentelve:M.consecrated,jatekban:M.inPlay?"igen":"nem",kryst_nativ:M.isKrystNative?"igen":"nem",piacon:M.isListedOnMarket?"igen":"nem"}),g.push({section:"library",itemId:M.copyCode,title:M.title});n(["copies","masolatok"],u,g);const _=[],E=[];for(const M of i.library.scrolls)_.push({token:M.scrollToken,cim:M.title,fejezet:M.fejezet,szerzo:M.author,jatekmod:M.gameMode,jutalom:M.questReward,piacon:M.isListedOnMarket?"igen":"nem"}),E.push({section:"library",itemId:M.scrollToken,title:`${M.title} — ${M.fejezet}`});n(["scrolls","tekercsek"],_,E);const f=[],p=[];for(const M of i.library.maps)f.push({azonosito:M.identifier,nev:M.name,statusz:M.status,expedicio:M.expeditionName,jatekmod:M.gameMode,datum:M.drawnAt||M.date,piacon:M.isListedOnMarket?"igen":"nem"}),p.push({section:"library",itemId:M.identifier,title:M.name});n(["maps","terkepek"],f,p);const S=[],T=[];for(const M of i.library.logs)S.push({id:M.id,nev:M.name,file_id:M.fileId}),T.push({section:"library",itemId:M.id,title:M.name});n(["logs","naplok","hajonaplok"],S,T);const b=[],R=[];for(const M of i.treasuresAndMarket.treasures)b.push({id:M.id,nev:M.name,leiras:M.description,piacon:M.isListedOnMarket?"igen":"nem"}),R.push({section:"treasures",itemId:M.id,title:M.name});n(["treasures","kincsek"],b,R);const w=[],m=[];for(const M of i.treasuresAndMarket.activeListings)w.push({hirdetes_id:M.listingId,tipus:M.itemType,azonosito:M.itemIdentifier,ar:M.price??M.buyNowPrice??"-",statusz:M.status,datum:M.dateListed}),m.push({section:"treasures",itemId:M.listingId,title:`${M.itemType}: ${M.itemIdentifier}`});n(["listings","hirdetesek","piac"],w,m);const y=[],N=[];for(const M of i.treasuresAndMarket.gearItems)y.push({id:M.id,nev:M.name,kategoria:M.category,darab:M.quantity,leiras:M.description}),N.push({section:"treasures",itemId:M.id,title:M.name});return n(["gear","kellekek","felszereles"],y,N),{tables:e,meta:t}}function Br(i){const e=i.trim();return e.startsWith("'")&&e.endsWith("'")||e.startsWith('"')&&e.endsWith('"')?e.slice(1,-1):e}function wi(i,e){const t=at(e);for(const n of Object.keys(i))if(at(n)===t)return i[n]}function $l(i,e){const t=e.trim().match(/^(.+?)\s*(!=|<>|>=|<=|=|>|<|\bLIKE\b|\bCONTAINS\b)\s*(.+)$/i);if(!t){const u=at(Br(e));return u?Object.values(i).some(g=>at(g).includes(u)):!0}const n=t[1].trim(),s=t[2].toUpperCase(),a=Br(t[3]),r=wi(i,n),l=at(r),o=at(a),c=Number(String(r??"").replace("%","").replace(",",".")),d=Number(String(a).replace("%","").replace(",",".")),h=r!==""&&r!==null&&r!==void 0&&a!==""&&!Number.isNaN(c)&&!Number.isNaN(d);if(s==="LIKE"){const u=o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/%/g,".*").replace(/_/g,".");return new RegExp(`^${u}$`,"i").test(l)}return s==="CONTAINS"?l.includes(o):s==="="?h?c===d:l===o:s==="!="||s==="<>"?h?c!==d:l!==o:s===">"?h?c>d:l>o:s===">="?h?c>=d:l>=o:s==="<"?h?c<d:l<o:s==="<="?h?c<=d:l<=o:!1}function Xl(i,e){const t=e.split(/\s+OR\s+/i);for(const n of t){const s=n.split(/\s+AND\s+/i);let a=!0;for(const r of s)if(!$l(i,r)){a=!1;break}if(a)return!0}return!1}function ql(i,e){const n=i.trim().replace(/;+$/,"").match(/^SELECT\s+(.+?)\s+FROM\s+([a-zA-Z0-9_áéíóöőúüűÁÉÍÓÖŐÚÜŰ]+)(?:\s+WHERE\s+(.+?))?(?:\s+ORDER\s+BY\s+([a-zA-Z0-9_áéíóöőúüűÁÉÍÓÖŐÚÜŰ]+)(?:\s+(ASC|DESC))?)?(?:\s+LIMIT\s+(\d+))?$/i);if(!n)return{sqlResult:{isSql:!0,tableName:"",columns:[],rows:[],totalMatched:0,error:"Érvénytelen SQL szintaxis. Minta: SELECT nev, elettartam FROM vehicles WHERE elettartam < 500 ORDER BY elettartam ASC LIMIT 10"},rowHits:[]};const s=n[1].trim(),a=at(n[2]),r=n[3]?n[3].trim():"",l=n[4]?n[4].trim():"",o=(n[5]||"ASC").toUpperCase(),c=n[6]?Math.max(1,parseInt(n[6],10)):0,d=Wl(e),h=d.tables[a],u=d.meta[a];if(!h)return{sqlResult:{isSql:!0,tableName:n[2],columns:[],rows:[],totalMatched:0,error:`Ismeretlen tábla: "${n[2]}". Elérhető táblák: vehicles, crew, skills, books, copies, scrolls, maps, logs, treasures, listings, gear.`},rowHits:[]};let g=h.map((T,b)=>({row:T,meta:u[b]}));r&&(g=g.filter(T=>Xl(T.row,r))),l&&g.sort((T,b)=>{const R=wi(T.row,l),w=wi(b.row,l),m=Number(String(R??"").replace("%","").replace(",",".")),y=Number(String(w??"").replace("%","").replace(",","."));let N=0;return R!==""&&w!==""&&!Number.isNaN(m)&&!Number.isNaN(y)?N=m-y:N=at(R).localeCompare(at(w),"hu"),o==="DESC"?-N:N});const _=g.length,E=c>0?g.slice(0,c):g;let f=[];s==="*"?f=h.length>0?Object.keys(h[0]):[]:f=s.split(",").map(T=>T.trim()).filter(T=>T.length>0);const p=E.map(T=>{if(s==="*")return{...T.row};const b={};for(const R of f){const w=wi(T.row,R);b[R]=w!==void 0?w:""}return b}),S=E.slice(0,20).map(T=>{const b=f.slice(0,3).map(R=>{const w=s==="*"?T.row[R]:wi(T.row,R);return`${R}: ${String(w??"")}`});return{section:T.meta.section,itemId:T.meta.itemId,title:T.meta.title,subtitle:b.join(" · "),badges:["SQL Találat"],score:100}});return{sqlResult:{isSql:!0,tableName:n[2],columns:f,rows:p,totalMatched:_},rowHits:S}}const Hr=[{keys:["szigony","szigonyagyu"],equipKey:"szigonyagyu",label:"Szigonyágyú"},{keys:["tekercspres","pres"],equipKey:"tekercspres",label:"Tekercsprés"},{keys:["navigalogep"],equipKey:"navigalogep",label:"Navigálógép"},{keys:["hartyahalasz","hartyahalaszo"],equipKey:"hartyahalaszo",label:"Hártyahalászó"},{keys:["halaszfelszereles"],equipKey:"halaszfelszereles",label:"Halászfelszerelés"},{keys:["mentocsonak"],equipKey:"mentocsonak",label:"Mentőcsónak db"},{keys:["merulo"],equipKey:"merulo",label:"Merülő"},{keys:["konyvtar"],equipKey:"konyvtar",label:"Könyvtár"}];function Kl(i,e){const t=at(i);if(!t)return null;if(t.includes("hajo")||t.includes("jarmu")||t.includes("flotta")||t.includes("felszerel")||t.includes("lokator")||Hr.some(n=>n.keys.some(s=>t.includes(s)))){for(const n of Hr)if(n.keys.some(s=>t.includes(s))){const s=e.vehicles.filter(r=>r.equipmentList.some(l=>l.key===n.equipKey&&l.installed)),a=s.map(r=>{const l=r.equipmentList.find(o=>o.key===n.equipKey);return{section:"vehicles",itemId:r.id,title:`${r.name} (${r.type})`,subtitle:`${n.label}: ${l?l.value:"Beépítve"} · Helyzet: ${r.helyzet}`,badges:[r.category,`HP ${r.durability}/${r.maxDurability}`],score:98}});return{kind:"intent",summary:s.length>0?`${s.length} járműveden található ${n.label}.`:`Egyik járműveden sincs jelenleg telepített ${n.label}.`,highlights:s.map(r=>`${r.name}: ${r.equipment[n.equipKey]||"Aktív"}`),hits:a,suggestedSql:`SELECT nev, tipus, ${n.equipKey}, helyzet FROM vehicles WHERE ${n.equipKey} != Nincs`}}if(t.includes("lokator")){const n=e.vehicles.filter(s=>s.locatorLevel&&at(s.locatorLevel)!=="nincs");return{kind:"intent",summary:`${n.length} járműved rendelkezik lokátor-adatokkal.`,highlights:n.map(s=>`${s.name}: ${s.locatorLevel}`),hits:n.map(s=>({section:"vehicles",itemId:s.id,title:s.name,subtitle:`Lokátor: ${s.locatorLevel} · Sebesség: ${s.maxSpeed||"-"}`,badges:[s.category],score:95})),suggestedSql:"SELECT nev, tipus, lokator, sebesseg FROM vehicles"}}}if(t.includes("lejar")||t.includes("szerzodes")){const n=t.match(/\b(\d+)\b/),s=n?parseInt(n[1],10):14,a=e.crew.filter(r=>r.remainingDays!==null&&r.remainingDays<=s).sort((r,l)=>(r.remainingDays??9999)-(l.remainingDays??9999));return{kind:"intent",summary:a.length>0?`${a.length} felvett embered szerződése jár le ${s} napon belül.`:`Nincs ${s} napon belül lejáró szerződésed.`,highlights:a.map(r=>`${r.name} (${r.role}): ${r.remainingDays} nap hátra (${r.endDateStr})`),hits:a.map(r=>({section:"crew",itemId:r.id,title:r.name,subtitle:`${r.role} · Lejár: ${r.endDateStr} (${r.remainingDays} nap) · Bér: ${r.cost} Kr`,badges:[r.sourceType,`${r.remainingDays} nap`],score:97})),suggestedSql:`SELECT nev, szerep, hatralevo_napok, lejarat FROM crew WHERE hatralevo_napok <= ${s} ORDER BY hatralevo_napok ASC`}}if(t.includes("legjobb")||t.includes("legerosebb")||t.includes("ki a ")){const n=e.skills.skillsList.find(s=>t.includes(at(s.name)));if(n){const s=at(n.name),a=[];a.push({section:"skills",id:n.name,name:`${e.profile.kaloznev} (Saját magad)`,role:e.profile.rang,val:n.value,trait:e.skills.trait||"-",isSelf:!0});for(const r of e.crew){const l=r.skillsList.find(o=>at(o.name)===s);l&&a.push({section:"crew",id:r.id,name:r.name,role:r.role,val:l.value,trait:r.trait,isSelf:!1})}return a.sort((r,l)=>l.val-r.val),{kind:"intent",summary:a.length>0?`A legerősebb "${n.name}" képzettség: ${a[0].name} (${a[0].val}%).`:`Nincs rögzített "${n.name}" képzettségi adat.`,highlights:a.slice(0,5).map((r,l)=>`${l+1}. ${r.name}: ${r.val}% (${r.trait})`),hits:a.map(r=>({section:r.section,itemId:r.id,title:`${r.name} — ${n.name}: ${r.val}%`,subtitle:`${r.role} · Tulajdonság: ${r.trait}`,badges:[r.isSelf?"Saját profil":"Legénység",`${r.val}%`],score:r.val}))}}}if(t.includes("kepzettseg")){const n=t.match(/\b(\d+)\b/),s=n?parseInt(n[1],10):60,a=t.includes("alatt")||t.includes("gyenge")||t.includes("keves"),r=e.skills.skillsList.filter(l=>a?l.value<=s:l.value>=s).sort((l,o)=>a?l.value-o.value:o.value-l.value);return{kind:"intent",summary:`${r.length} képzettséged van ${s}% ${a?"alatt":"felett"}.`,highlights:r.map(l=>`${l.name} (${l.category}): ${l.value}%`),hits:r.map(l=>({section:"skills",itemId:l.name,title:`${l.name}: ${l.value}%`,subtitle:`Kategória: ${l.category}`,badges:[l.category,`${l.value}%`],score:l.value})),suggestedSql:`SELECT kepzettseg, kategoria, ertek FROM skills WHERE ertek ${a?"<=":">="} ${s} ORDER BY ertek ${a?"ASC":"DESC"}`}}if(t.includes("serult")||t.includes("javit")||t.includes("elettartam")){const n=[...e.vehicles].sort((s,a)=>s.durabilityPct-a.durabilityPct);return{kind:"intent",summary:`Flotta állapot-rangsor (${n.length} jármű): a legalacsonyabb élettartamú elöl.`,highlights:n.map(s=>`${s.name}: ${s.durability}/${s.maxDurability} HP (${s.durabilityPct}%)`),hits:n.map(s=>({section:"vehicles",itemId:s.id,title:`${s.name} (${s.type})`,subtitle:`Élettartam: ${s.durability}/${s.maxDurability} (${s.durabilityPct}%) · Helyzet: ${s.helyzet}`,badges:[s.category,`${s.durabilityPct}%`],score:100-s.durabilityPct})),suggestedSql:"SELECT nev, tipus, elettartam, max_elettartam, szazalek FROM vehicles ORDER BY szazalek ASC"}}if(t.includes("piac")||t.includes("hirdet")||t.includes("jatekban")||t.includes("licit")){const n=[];for(const s of e.treasuresAndMarket.activeListings)n.push({section:"treasures",itemId:s.listingId,title:`Aktív hirdetés: ${s.itemIdentifier}`,subtitle:`Típus: ${s.itemType} · Ár: ${s.price??s.buyNowPrice??"-"} Kr · Dátum: ${s.dateListed}`,badges:["Piacon",s.status],score:96});for(const s of e.library.copies)s.inPlay&&n.push({section:"library",itemId:s.copyCode,title:`Játékban lévő másolat: ${s.title}`,subtitle:`Kód: ${s.copyCode} · Szerző: ${s.author}`,badges:["Játékban"],score:94});for(const s of e.library.maps)(at(s.status).includes("jatek")||at(s.sentToGame)==="igen")&&n.push({section:"library",itemId:s.identifier,title:`Játékba küldött térkép: ${s.name}`,subtitle:`Státusz: ${s.status} · Expedíció: ${s.expeditionName||"-"}`,badges:["Térkép","Játékban"],score:92});return{kind:"intent",summary:`${n.length} piacon meghirdetett vagy aktív játékban lévő tétel található.`,highlights:n.slice(0,6).map(s=>`${s.title} (${s.badges.join(", ")})`),hits:n,suggestedSql:"SELECT hirdetes_id, tipus, azonosito, ar, statusz FROM listings"}}if(t.includes("vagyon")||t.includes("osszesen")||t.includes("mennyi")){const n=e.profile;return{kind:"intent",summary:`${n.kaloznev} (${n.rang}) teljes mérlege: ${n.kredit} Kr, ${n.hartya} hártya, ${n.talentum} tálentum, ${n.letkristaly} letkristály.`,highlights:[`Könyvek: ${e.library.books.length} · Másolatok: ${e.library.copies.length} · Tekercsek: ${e.library.scrolls.length} · Térképek: ${e.library.maps.length}`,`Flotta: ${e.vehicles.length} jármű · Felvett emberek: ${e.crew.length} fő · Kincsek: ${e.treasuresAndMarket.treasures.length} db`],hits:[{section:"overview",itemId:"profile",title:`${n.kaloznev} — ${n.rang}`,subtitle:`Kredit: ${n.kredit} · Hártya: ${n.hartya} · Tálentum: ${n.talentum} · Letkristály: ${n.letkristaly}`,badges:["Törzslap"],score:100}]}}return null}function Yl(i,e){const t=i.trim();if(!t)return{kind:"search",summary:"Írj be egy kulcsszót, magyar kérdést vagy SQL SELECT lekérdezést!",highlights:[],hits:[]};if(/^SELECT\s+/i.test(t)){const{sqlResult:o,rowHits:c}=ql(t,e);return o.error?{kind:"sql",summary:o.error,highlights:[],hits:[],sqlResult:o}:{kind:"sql",summary:`SQL lekérdezés (${o.tableName}): ${o.totalMatched} találat.`,highlights:[`Megjelenítve ${o.rows.length} / ${o.totalMatched} sor`],hits:c,sqlResult:o}}const n=Kl(t,e);if(n)return n;const s=at(t).split(/\s+/).filter(o=>o.length>0),a=[],r=o=>{const c=at(o.filter(h=>h!=null).join(" "));if(!c)return 0;let d=0;for(const h of s)c.includes(h)&&d++;return d===0?0:d===s.length?90+Math.min(10,s.length*2):Math.round(d/s.length*70)};for(const o of e.vehicles){const c=o.equipmentList.filter(u=>u.installed).map(u=>`${u.label} ${u.value}`).join(" "),d=o.crewMembers.map(u=>`${u.name} ${u.role}`).join(" "),h=r([o.id,o.name,o.type,o.category,o.description,o.helyzet,o.ownerName,o.captainName,o.artilleryLevel,o.defenseLevel,o.locatorLevel,o.maxSpeed,c,d]);h>0&&a.push({section:"vehicles",itemId:o.id,title:`⛵ ${o.name} (${o.type})`,subtitle:`${o.helyzet} · HP ${o.durability}/${o.maxDurability} · Felszerelés: ${o.installedEquipmentCount}/8`,badges:[o.category,o.userRole],score:h})}for(const o of e.crew){const c=o.skillsList.map(u=>`${u.name} ${u.value}%`).join(" "),d=o.assignedShips.map(u=>`${u.shipName} ${u.role}`).join(" "),h=r([o.name,o.email,o.role,o.trait,o.sourceType,o.status,c,d]);h>0&&a.push({section:"crew",itemId:o.id,title:`👤 ${o.name} (${o.role})`,subtitle:`Tulajdonság: ${o.trait} · Lejárat: ${o.endDateStr}`,badges:[o.sourceType,`${o.cost} Kr`],score:h})}for(const o of e.skills.skillsList){const c=r([o.name,o.category,`${o.value}%`]);c>0&&a.push({section:"skills",itemId:o.name,title:`🧭 ${o.name}: ${o.value}%`,subtitle:`Kategória: ${o.category}`,badges:[o.category],score:c})}for(const o of e.treasuresAndMarket.treasures){const c=r([o.id,o.name,o.description,o.isListedOnMarket?"piacon":""]);c>0&&a.push({section:"treasures",itemId:o.id,title:`💎 ${o.name}`,subtitle:o.description||o.id,badges:["Kincs",o.isListedOnMarket?"Piacon":"Saját"],score:c})}for(const o of e.treasuresAndMarket.gearItems){const c=r([o.id,o.name,o.category,o.description]);c>0&&a.push({section:"treasures",itemId:o.id,title:`🎒 ${o.name} (${o.quantity} db)`,subtitle:`${o.category} · ${o.description}`,badges:["Kellék"],score:c})}for(const o of e.library.books){const c=r([o.title,o.author,o.downloadLink,o.language,o.productType,o.isbn]);c>0&&a.push({section:"library",itemId:o.downloadLink,title:`📖 ${o.title}`,subtitle:`${o.author} · ${o.productType} · Kód: ${o.downloadLink}`,badges:["Könyv",o.isKrystNative?".kryst":"Drive"],score:c})}for(const o of e.library.copies){const c=r([o.title,o.author,o.copyCode,o.inPlay?"jatekban":""]);c>0&&a.push({section:"library",itemId:o.copyCode,title:`📘 Másolat: ${o.title}`,subtitle:`${o.author} · Kód: ${o.copyCode}`,badges:["Másolat",o.inPlay?"Játékban":"Szabad"],score:c})}for(const o of e.library.scrolls){const c=r([o.title,o.fejezet,o.author,o.scrollToken,o.gameMode,o.questReward]);c>0&&a.push({section:"library",itemId:o.scrollToken,title:`📜 ${o.title} — ${o.fejezet}`,subtitle:`Token: ${o.scrollToken} · Jutalom: ${o.questReward||"-"}`,badges:["Tekercs"],score:c})}for(const o of e.library.maps){const c=r([o.name,o.identifier,o.status,o.expeditionName,o.gameMode]);c>0&&a.push({section:"library",itemId:o.identifier,title:`🗺️ ${o.name}`,subtitle:`Státusz: ${o.status} · Expedíció: ${o.expeditionName||"-"}`,badges:["Térkép"],score:c})}for(const o of e.library.logs){const c=r([o.name,o.id]);c>0&&a.push({section:"library",itemId:o.id,title:`📓 ${o.name}`,subtitle:`Napló ID: ${o.id}`,badges:["Hajónapló"],score:c})}a.sort((o,c)=>c.score-o.score);const l=a.slice(0,40);return{kind:"search",summary:l.length>0?`${l.length} találat a "${t}" keresésre az összes táblázatból.`:`Nincs közvetlen scriptes találat a "${t}" keresésre. Próbáld meg az AI Mélyelemzőt vagy egy SQL lekérdezést!`,highlights:[],hits:l}}const ir="ebp_kryst_vault_byok_key",sr="ebp_kryst_vault_ai_provider",Zl="gemini-2.5-flash";function ar(){try{return(localStorage.getItem(ir)||"").trim()}catch{return""}}function Ps(){const i=ar();let e="server";try{localStorage.getItem(sr)==="byok"&&i&&(e="byok")}catch{e="server"}const t=i.length>8?`${i.slice(0,4)}••••${i.slice(-4)}`:i?"••••":"";return{provider:e,hasByokKey:i.length>0,maskedKey:t}}function Jl(i,e){try{if(e!==void 0){const s=e.trim();s&&localStorage.setItem(ir,s)}const t=ar(),n=i==="byok"&&t?"byok":"server";localStorage.setItem(sr,n)}catch{}return Ps()}function jl(){try{localStorage.removeItem(ir),localStorage.setItem(sr,"server")}catch{}return Ps()}function Ql(i){return{profile:{kaloznev:i.profile.kaloznev,rang:i.profile.rang,kredit:i.profile.kredit,hartya:i.profile.hartya,talentum:i.profile.talentum,letkristaly:i.profile.letkristaly,aktualisAllas:i.profile.aktualisAllas},monkStats:i.monkStats,treasures:i.treasuresAndMarket.treasures,activeListings:i.treasuresAndMarket.activeListings,gearItems:i.treasuresAndMarket.gearItems,libraryCounts:{books:i.library.books.length,copies:i.library.copies.length,scrolls:i.library.scrolls.length,maps:i.library.maps.length,logs:i.library.logs.length},books:i.library.books.slice(0,25).map(e=>({title:e.title,author:e.author,code:e.downloadLink,productType:e.productType,isKrystNative:e.isKrystNative})),copies:i.library.copies.slice(0,25).map(e=>({title:e.title,code:e.copyCode,inPlay:e.inPlay})),scrolls:i.library.scrolls.slice(0,25).map(e=>({title:e.title,fejezet:e.fejezet,token:e.scrollToken,questReward:e.questReward})),maps:i.library.maps.slice(0,25).map(e=>({name:e.name,identifier:e.identifier,status:e.status,expeditionName:e.expeditionName})),vehicles:i.vehicles.map(e=>({id:e.id,name:e.name,type:e.type,category:e.category,helyzet:e.helyzet,durability:e.durability,maxDurability:e.maxDurability,durabilityPct:e.durabilityPct,maxSpeed:e.maxSpeed,artilleryLevel:e.artilleryLevel,defenseLevel:e.defenseLevel,locatorLevel:e.locatorLevel,equipment:e.equipment,crewMembers:e.crewMembers.map(t=>`${t.name} (${t.role})`)})),skills:{trait:i.skills.trait,averageSkill:i.skills.averageSkill,topSkillName:i.skills.topSkillName,maxSkill:i.skills.maxSkill,skillsMap:i.skills.skillsMap},crew:i.crew.map(e=>({id:e.id,name:e.name,sourceType:e.sourceType,role:e.role,trait:e.trait,cost:e.cost,remainingDays:e.remainingDays,endDateStr:e.endDateStr,assignedShips:e.assignedShips.map(t=>`${t.shipName} (${t.role})`),topSkills:e.topSkills.map(t=>`${t.name} ${t.value}%`)}))}}function ec(i,e){let t=i.trim();const n="```";if(t.startsWith(n)){const a=t.indexOf(`
`);a!==-1&&(t=t.slice(a+1));const r=t.lastIndexOf(n);r!==-1&&(t=t.slice(0,r)),t=t.trim()}let s=null;try{s=JSON.parse(t)}catch{const a=t.indexOf("{"),r=t.lastIndexOf("}");if(a!==-1&&r>a)try{s=JSON.parse(t.slice(a,r+1))}catch{s=null}}return!s||typeof s!="object"?{success:!0,mode:e,answer:t||"Elemzés elkészült.",highlights:[],matchedItems:[],suggestedSql:""}:{success:!0,mode:e,answer:String(s.answer||"Elemzés elkészült."),highlights:Array.isArray(s.highlights)?s.highlights.map(String):[],matchedItems:Array.isArray(s.matchedItems)?s.matchedItems:[],suggestedSql:String(s.suggestedSql||"")}}async function tc(i,e,t){var c,d,h,u,g;let n=JSON.stringify(e);n.length>26e3&&(n=`${n.slice(0,26e3)}...[TRUNCATED]`);const s=`Te a LET-Kincstár & Lajstrom Konzol (eBookPirates) magyar nyelvű személyes adatelemző keresőasszisztense vagy.
SZIGORÚ SZABÁLY: Kizárólag a megadott személyes JSON adatbázis alapján válaszolj! Ne találj ki nem létező elemeket.

KÉRDÉS:
${i}

ADATBÁZIS (JSON):
${n}

Válaszolj KIZÁRÓLAG érvényes JSON objektummal:
{
  "answer": "Tömör magyar nyelvű válasz pontos számokkal és nevekkel",
  "highlights": ["Kiemelés 1", "Kiemelés 2"],
  "matchedItems": [{"section": "vehicles|crew|skills|library|treasures|profile", "id": "azonosito vagy nev", "label": "Megjelenítendő név", "reason": "Indoklás"}],
  "suggestedSql": "Opcionális SQL pl. SELECT nev, elettartam FROM vehicles ORDER BY elettartam ASC"
}`,a=`https://generativelanguage.googleapis.com/v1beta/models/${Zl}:generateContent?key=${encodeURIComponent(t)}`,r=await fetch(a,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:s}]}],generationConfig:{temperature:.1}})});if(!r.ok){const _=await r.text();return{success:!1,mode:"byok_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:`BYOK Gemini API hiba (${r.status}): ${_.slice(0,220)}`}}const o=((g=(u=(h=(d=(c=(await r.json()).candidates)==null?void 0:c[0])==null?void 0:d.content)==null?void 0:h.parts)==null?void 0:u[0])==null?void 0:g.text)||"";return o?ec(o,"byok_ai"):{success:!1,mode:"byok_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:"A Gemini API üres választ adott vissza."}}function nc(i,e){return new Promise(t=>{const n=`vault_ai_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;let s=!1;const a=window.setTimeout(()=>{s||(s=!0,window.removeEventListener("message",r),t({success:!1,mode:"server_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:"A szerveroldali AI válaszidő túllépése (30 mp). Próbáld meg a Scriptes/SQL keresőt vagy adj meg saját BYOK kulcsot (🔑)."}))},3e4),r=l=>{const o=l.data;!o||o.type!=="KRYST_VAULT_AI_RESPONSE"||o.requestId!==n||s||(s=!0,window.clearTimeout(a),window.removeEventListener("message",r),t(o.response||{success:!1,mode:"server_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:"Üres szerver AI válasz."}))};window.addEventListener("message",r),window.parent.postMessage({type:"KRYST_VAULT_AI_QUERY",requestId:n,query:i,compactSnapshot:e},"*")})}async function ic(i,e){const t=i.trim();if(!t)return{success:!1,mode:"server_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:"Kérlek, adj meg egy kérdést az AI elemzéshez!"};const n=Ps(),s=Ql(e);if(n.provider==="byok"){const a=ar();if(a)return tc(t,s,a)}return window.parent&&window.parent!==window?nc(t,s):{success:!1,mode:"server_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:"Önálló (standalone) módban a szerveroldali GAS AI kapcsolat nem aktív. Nyisd meg a Kincstár oldalról bejelentkezve, vagy állíts be saját Gemini API kulcsot a jobb felső 🔑 ikonnal!"}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const rr="187",sc=0,Gr=1,ac=2,ps=1,rc=2,Ri=3,Kn=0,kt=1,Sn=2,ui=0,Pi=1,Vr=2,Wr=3,$r=4,oc=5,di=100,lc=101,cc=102,dc=103,uc=104,hc=200,fc=201,pc=202,mc=203,Bo=204,Ho=205,gc=206,vc=207,_c=208,xc=209,Sc=210,Mc=211,yc=212,bc=213,Ec=214,fa=0,pa=1,ma=2,Ii=3,ga=4,va=5,_a=6,xa=7,Go=0,Tc=1,Ac=2,bn=0,Vo=1,Wo=2,$o=3,Xo=4,qo=5,Ko=6,Yo=7,Zo=300,pi=301,Di=302,Os=303,zs=304,Sa=1e3,Mn=1001,Ma=1002,Et=1003,wc=1004,Xi=1005,Ut=1006,Bs=1007,Un=1008,Bt=1009,Jo=1010,jo=1011,Ni=1012,or=1013,hn=1014,ln=1015,fn=1016,lr=1017,cr=1018,mi=1020,Qo=35902,el=35899,tl=1021,nl=1022,cn=1023,kn=1026,Fn=1027,il=1028,dr=1029,Yn=1030,ur=1031,hr=1033,ms=33776,gs=33777,vs=33778,_s=33779,ya=35840,ba=35841,Ea=35842,Ta=35843,Aa=36196,wa=37492,Ra=37496,Ca=37488,La=37489,ys=37490,Pa=37491,Ia=37808,Da=37809,Na=37810,Ua=37811,Fa=37812,ka=37813,Oa=37814,za=37815,Ba=37816,Ha=37817,Ga=37818,Va=37819,Wa=37820,$a=37821,Xa=36492,qa=36494,Ka=36495,Ya=36283,Za=36284,bs=36285,Ja=36286,Rc=3200,ja=0,Cc=1,Nn="",Xt="srgb",Es="srgb-linear",Ts="linear",je="srgb",Hs=7680,Lc=519,Pc=512,Ic=513,Dc=514,sl=515,Nc=516,Uc=517,al=518,rl=519,Fc=35044,Xr="300 es",tn=2e3,Ui=2001;function kc(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function As(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Oc(){const i=As("canvas");return i.style.display="block",i}const qr={};function Kr(...i){const e="THREE."+i.shift();console.log(e,...i)}function ol(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Pe(...i){i=ol(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function Ye(...i){i=ol(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function xs(...i){const e=i.join(" ");e in qr||(qr[e]=!0,Pe(...i))}function zc(i,e,t){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}const Bc={[fa]:fa,[ma]:_a,[ga]:ga,[Ii]:va,[pa]:pa,[_a]:ma,[xa]:xa,[va]:Ii};class Jn{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const a=s.indexOf(t);a!==-1&&s.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Gs=Math.PI/180,Qa=180/Math.PI;function Oi(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(wt[i&255]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[e&255]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[t&63|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[n&255]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function $e(i,e,t){return Math.max(e,Math.min(t,i))}function Hc(i,e){return(i%e+e)%e}function Vs(i,e,t){return(1-t)*i+t*e}function Gc(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fr(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function Vc(i,e){if(e.constructor===Float32Array)return i;const t=fr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function Wc(i,e){if(e.constructor===Float32Array)return i;const t=fr(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const Er=class Er{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*n-r*s+e.x,this.y=a*s+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Er.prototype.isVector2=!0;let Be=Er;class _i{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,a,r,l){let o=n[s+0],c=n[s+1],d=n[s+2],h=n[s+3],u=a[r+0],g=a[r+1],_=a[r+2],E=a[r+3];if(h!==E||o!==u||c!==g||d!==_){let f=o*u+c*g+d*_+h*E;f<0&&(u=-u,g=-g,_=-_,E=-E,f=-f);let p=1-l;if(f<.9995){const S=Math.acos(f),T=Math.sin(S);p=Math.sin(p*S)/T,l=Math.sin(l*S)/T,o=o*p+u*l,c=c*p+g*l,d=d*p+_*l,h=h*p+E*l}else{o=o*p+u*l,c=c*p+g*l,d=d*p+_*l,h=h*p+E*l;const S=1/Math.sqrt(o*o+c*c+d*d+h*h);o*=S,c*=S,d*=S,h*=S}}e[t]=o,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,a,r){const l=n[s],o=n[s+1],c=n[s+2],d=n[s+3],h=a[r],u=a[r+1],g=a[r+2],_=a[r+3];return e[t]=l*_+d*h+o*g-c*u,e[t+1]=o*_+d*u+c*h-l*g,e[t+2]=c*_+d*g+l*u-o*h,e[t+3]=d*_-l*h-o*u-c*g,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,a=e._z,r=e._order,l=Math.cos,o=Math.sin,c=l(n/2),d=l(s/2),h=l(a/2),u=o(n/2),g=o(s/2),_=o(a/2);switch(r){case"XYZ":this._x=u*d*h+c*g*_,this._y=c*g*h-u*d*_,this._z=c*d*_+u*g*h,this._w=c*d*h-u*g*_;break;case"YXZ":this._x=u*d*h+c*g*_,this._y=c*g*h-u*d*_,this._z=c*d*_-u*g*h,this._w=c*d*h+u*g*_;break;case"ZXY":this._x=u*d*h-c*g*_,this._y=c*g*h+u*d*_,this._z=c*d*_+u*g*h,this._w=c*d*h-u*g*_;break;case"ZYX":this._x=u*d*h-c*g*_,this._y=c*g*h+u*d*_,this._z=c*d*_-u*g*h,this._w=c*d*h+u*g*_;break;case"YZX":this._x=u*d*h+c*g*_,this._y=c*g*h+u*d*_,this._z=c*d*_-u*g*h,this._w=c*d*h-u*g*_;break;case"XZY":this._x=u*d*h-c*g*_,this._y=c*g*h-u*d*_,this._z=c*d*_+u*g*h,this._w=c*d*h+u*g*_;break;default:Pe("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],a=t[8],r=t[1],l=t[5],o=t[9],c=t[2],d=t[6],h=t[10],u=n+l+h;if(u>0){const g=.5/Math.sqrt(u+1);this._w=.25/g,this._x=(d-o)*g,this._y=(a-c)*g,this._z=(r-s)*g}else if(n>l&&n>h){const g=2*Math.sqrt(1+n-l-h);this._w=(d-o)/g,this._x=.25*g,this._y=(s+r)/g,this._z=(a+c)/g}else if(l>h){const g=2*Math.sqrt(1+l-n-h);this._w=(a-c)/g,this._x=(s+r)/g,this._y=.25*g,this._z=(o+d)/g}else{const g=2*Math.sqrt(1+h-n-l);this._w=(r-s)/g,this._x=(a+c)/g,this._y=(o+d)/g,this._z=.25*g}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs($e(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,a=e._z,r=e._w,l=t._x,o=t._y,c=t._z,d=t._w;return this._x=n*d+r*l+s*c-a*o,this._y=s*d+r*o+a*l-n*c,this._z=a*d+r*c+n*o-s*l,this._w=r*d-n*l-s*o-a*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,a=e._z,r=e._w,l=this.dot(e);l<0&&(n=-n,s=-s,a=-a,r=-r,l=-l);let o=1-t;if(l<.9995){const c=Math.acos(l),d=Math.sin(c);o=Math.sin(o*c)/d,t=Math.sin(t*c)/d,this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+a*t,this._w=this._w*o+r*t,this._onChangeCallback()}else this._x=this._x*o+n*t,this._y=this._y*o+s*t,this._z=this._z*o+a*t,this._w=this._w*o+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Tr=class Tr{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Yr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Yr.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*s,this.y=a[1]*t+a[4]*n+a[7]*s,this.z=a[2]*t+a[5]*n+a[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=e.elements,r=1/(a[3]*t+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*s+a[12])*r,this.y=(a[1]*t+a[5]*n+a[9]*s+a[13])*r,this.z=(a[2]*t+a[6]*n+a[10]*s+a[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,a=e.x,r=e.y,l=e.z,o=e.w,c=2*(r*s-l*n),d=2*(l*t-a*s),h=2*(a*n-r*t);return this.x=t+o*c+r*h-l*d,this.y=n+o*d+l*c-a*h,this.z=s+o*h+a*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s,this.y=a[1]*t+a[5]*n+a[9]*s,this.z=a[2]*t+a[6]*n+a[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,a=e.z,r=t.x,l=t.y,o=t.z;return this.x=s*o-a*l,this.y=a*r-n*o,this.z=n*l-s*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ws.copy(this).projectOnVector(e),this.sub(Ws)}reflect(e){return this.sub(Ws.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos($e(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Tr.prototype.isVector3=!0;let z=Tr;const Ws=new z,Yr=new _i,Ar=class Ar{constructor(e,t,n,s,a,r,l,o,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,l,o,c)}set(e,t,n,s,a,r,l,o,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=l,d[3]=t,d[4]=a,d[5]=o,d[6]=n,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],l=n[3],o=n[6],c=n[1],d=n[4],h=n[7],u=n[2],g=n[5],_=n[8],E=s[0],f=s[3],p=s[6],S=s[1],T=s[4],b=s[7],R=s[2],w=s[5],m=s[8];return a[0]=r*E+l*S+o*R,a[3]=r*f+l*T+o*w,a[6]=r*p+l*b+o*m,a[1]=c*E+d*S+h*R,a[4]=c*f+d*T+h*w,a[7]=c*p+d*b+h*m,a[2]=u*E+g*S+_*R,a[5]=u*f+g*T+_*w,a[8]=u*p+g*b+_*m,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],l=e[5],o=e[6],c=e[7],d=e[8];return t*r*d-t*l*c-n*a*d+n*l*o+s*a*c-s*r*o}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],l=e[5],o=e[6],c=e[7],d=e[8],h=d*r-l*c,u=l*o-d*a,g=c*a-r*o,_=t*h+n*u+s*g;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/_;return e[0]=h*E,e[1]=(s*c-d*n)*E,e[2]=(l*n-s*r)*E,e[3]=u*E,e[4]=(d*t-s*o)*E,e[5]=(s*a-l*t)*E,e[6]=g*E,e[7]=(n*o-c*t)*E,e[8]=(r*t-n*a)*E,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,a,r,l){const o=Math.cos(a),c=Math.sin(a);return this.set(n*o,n*c,-n*(o*r+c*l)+r+e,-s*c,s*o,-s*(-c*r+o*l)+l+t,0,0,1),this}scale(e,t){return xs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply($s.makeScale(e,t)),this}rotate(e){return xs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply($s.makeRotation(-e)),this}translate(e,t){return xs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply($s.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Ar.prototype.isMatrix3=!0;let De=Ar;const $s=new De,Zr=new De().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jr=new De().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function $c(){const i={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(s,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===je&&(s.r=En(s.r),s.g=En(s.g),s.b=En(s.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(s.applyMatrix3(this.spaces[a].toXYZ),s.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===je&&(s.r=hi(s.r),s.g=hi(s.g),s.b=hi(s.b))),s},workingToColorSpace:function(s,a){return this.convert(s,this.workingColorSpace,a)},colorSpaceToWorking:function(s,a){return this.convert(s,a,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Nn?Ts:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,a=this.workingColorSpace){return s.fromArray(this.spaces[a].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,a,r){return s.copy(this.spaces[r].fromXYZ).multiply(this.spaces[a].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Es]:{primaries:e,whitePoint:n,transfer:Ts,toXYZ:Zr,fromXYZ:Jr,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Xt},outputColorSpaceConfig:{drawingBufferColorSpace:Xt}},[Xt]:{primaries:e,whitePoint:n,transfer:je,toXYZ:Zr,fromXYZ:Jr,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Xt}}}),i}const We=$c();function En(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function hi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let jn;class Xc{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{jn===void 0&&(jn=As("canvas")),jn.width=e.width,jn.height=e.height;const s=jn.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=jn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=As("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=En(a[r]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(En(t[n]/255)*255):t[n]=En(t[n]);return{data:t,width:e.width,height:e.height}}else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let qc=0;class pr{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:qc++}),this.uuid=Oi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,l=s.length;r<l;r++)s[r].isDataTexture?a.push(Xs(s[r].image)):a.push(Xs(s[r]))}else a=Xs(s);n.url=a}return t||(e.images[this.uuid]=n),n}}function Xs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Xc.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Pe("Texture: Unable to serialize Texture."),{})}let Kc=0;const qs=new z;class It extends Jn{constructor(e=It.DEFAULT_IMAGE,t=It.DEFAULT_MAPPING,n=Mn,s=Mn,a=Ut,r=Un,l=cn,o=Bt,c=It.DEFAULT_ANISOTROPY,d=Nn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kc++}),this.uuid=Oi(),this.name="",this.source=new pr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=o,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new De,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(qs).x}get height(){return this.source.getSize(qs).y}get depth(){return this.source.getSize(qs).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Sa:e.x=e.x-Math.floor(e.x);break;case Mn:e.x=e.x<0?0:1;break;case Ma:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Sa:e.y=e.y-Math.floor(e.y);break;case Mn:e.y=e.y<0?0:1;break;case Ma:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}It.DEFAULT_IMAGE=null;It.DEFAULT_MAPPING=Zo;It.DEFAULT_ANISOTROPY=1;const wr=class wr{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s+r[12]*a,this.y=r[1]*t+r[5]*n+r[9]*s+r[13]*a,this.z=r[2]*t+r[6]*n+r[10]*s+r[14]*a,this.w=r[3]*t+r[7]*n+r[11]*s+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,a;const o=e.elements,c=o[0],d=o[4],h=o[8],u=o[1],g=o[5],_=o[9],E=o[2],f=o[6],p=o[10];if(Math.abs(d-u)<.01&&Math.abs(h-E)<.01&&Math.abs(_-f)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+E)<.1&&Math.abs(_+f)<.1&&Math.abs(c+g+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const T=(c+1)/2,b=(g+1)/2,R=(p+1)/2,w=(d+u)/4,m=(h+E)/4,y=(_+f)/4;return T>b&&T>R?T<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(T),s=w/n,a=m/n):b>R?b<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(b),n=w/s,a=y/s):R<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(R),n=m/a,s=y/a),this.set(n,s,a,t),this}let S=Math.sqrt((f-_)*(f-_)+(h-E)*(h-E)+(u-d)*(u-d));return Math.abs(S)<.001&&(S=1),this.x=(f-_)/S,this.y=(h-E)/S,this.z=(u-d)/S,this.w=Math.acos((c+g+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=$e(this.x,e.x,t.x),this.y=$e(this.y,e.y,t.y),this.z=$e(this.z,e.z,t.z),this.w=$e(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=$e(this.x,e,t),this.y=$e(this.y,e,t),this.z=$e(this.z,e,t),this.w=$e(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar($e(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};wr.prototype.isVector4=!0;let lt=wr;class Yc extends Jn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ut,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new lt(0,0,e,t),this.scissorTest=!1,this.viewport=new lt(0,0,e,t),this.textures=[];const s=n.count;for(let a=0;a<s;a++)this.textures[a]=new It({width:e,height:t,depth:n.depth}),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Ut,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new pr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class dn extends Yc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class ll extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Zc extends It{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Et,this.minFilter=Et,this.wrapR=Mn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Ls=class Ls{constructor(e,t,n,s,a,r,l,o,c,d,h,u,g,_,E,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,a,r,l,o,c,d,h,u,g,_,E,f)}set(e,t,n,s,a,r,l,o,c,d,h,u,g,_,E,f){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=a,p[5]=r,p[9]=l,p[13]=o,p[2]=c,p[6]=d,p[10]=h,p[14]=u,p[3]=g,p[7]=_,p[11]=E,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ls().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/Qn.setFromMatrixColumn(e,0).length(),a=1/Qn.setFromMatrixColumn(e,1).length(),r=1/Qn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,a=e.z,r=Math.cos(n),l=Math.sin(n),o=Math.cos(s),c=Math.sin(s),d=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const u=r*d,g=r*h,_=l*d,E=l*h;t[0]=o*d,t[4]=-o*h,t[8]=c,t[1]=g+_*c,t[5]=u-E*c,t[9]=-l*o,t[2]=E-u*c,t[6]=_+g*c,t[10]=r*o}else if(e.order==="YXZ"){const u=o*d,g=o*h,_=c*d,E=c*h;t[0]=u+E*l,t[4]=_*l-g,t[8]=r*c,t[1]=r*h,t[5]=r*d,t[9]=-l,t[2]=g*l-_,t[6]=E+u*l,t[10]=r*o}else if(e.order==="ZXY"){const u=o*d,g=o*h,_=c*d,E=c*h;t[0]=u-E*l,t[4]=-r*h,t[8]=_+g*l,t[1]=g+_*l,t[5]=r*d,t[9]=E-u*l,t[2]=-r*c,t[6]=l,t[10]=r*o}else if(e.order==="ZYX"){const u=r*d,g=r*h,_=l*d,E=l*h;t[0]=o*d,t[4]=_*c-g,t[8]=u*c+E,t[1]=o*h,t[5]=E*c+u,t[9]=g*c-_,t[2]=-c,t[6]=l*o,t[10]=r*o}else if(e.order==="YZX"){const u=r*o,g=r*c,_=l*o,E=l*c;t[0]=o*d,t[4]=E-u*h,t[8]=_*h+g,t[1]=h,t[5]=r*d,t[9]=-l*d,t[2]=-c*d,t[6]=g*h+_,t[10]=u-E*h}else if(e.order==="XZY"){const u=r*o,g=r*c,_=l*o,E=l*c;t[0]=o*d,t[4]=-h,t[8]=c*d,t[1]=u*h+E,t[5]=r*d,t[9]=g*h-_,t[2]=_*h-g,t[6]=l*d,t[10]=E*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Jc,e,jc)}lookAt(e,t,n){const s=this.elements;return Ot.subVectors(e,t),Ot.lengthSq()===0&&(Ot.z=1),Ot.normalize(),Rn.crossVectors(n,Ot),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Ot.x+=1e-4:Ot.z+=1e-4,Ot.normalize(),Rn.crossVectors(n,Ot)),Rn.normalize(),qi.crossVectors(Ot,Rn),s[0]=Rn.x,s[4]=qi.x,s[8]=Ot.x,s[1]=Rn.y,s[5]=qi.y,s[9]=Ot.y,s[2]=Rn.z,s[6]=qi.z,s[10]=Ot.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,a=this.elements,r=n[0],l=n[4],o=n[8],c=n[12],d=n[1],h=n[5],u=n[9],g=n[13],_=n[2],E=n[6],f=n[10],p=n[14],S=n[3],T=n[7],b=n[11],R=n[15],w=s[0],m=s[4],y=s[8],N=s[12],M=s[1],L=s[5],U=s[9],W=s[13],I=s[2],V=s[6],Q=s[10],B=s[14],ie=s[3],X=s[7],ee=s[11],te=s[15];return a[0]=r*w+l*M+o*I+c*ie,a[4]=r*m+l*L+o*V+c*X,a[8]=r*y+l*U+o*Q+c*ee,a[12]=r*N+l*W+o*B+c*te,a[1]=d*w+h*M+u*I+g*ie,a[5]=d*m+h*L+u*V+g*X,a[9]=d*y+h*U+u*Q+g*ee,a[13]=d*N+h*W+u*B+g*te,a[2]=_*w+E*M+f*I+p*ie,a[6]=_*m+E*L+f*V+p*X,a[10]=_*y+E*U+f*Q+p*ee,a[14]=_*N+E*W+f*B+p*te,a[3]=S*w+T*M+b*I+R*ie,a[7]=S*m+T*L+b*V+R*X,a[11]=S*y+T*U+b*Q+R*ee,a[15]=S*N+T*W+b*B+R*te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[12],r=e[1],l=e[5],o=e[9],c=e[13],d=e[2],h=e[6],u=e[10],g=e[14],_=e[3],E=e[7],f=e[11],p=e[15],S=o*g-c*u,T=l*g-c*h,b=l*u-o*h,R=r*g-c*d,w=r*u-o*d,m=r*h-l*d;return t*(E*S-f*T+p*b)-n*(_*S-f*R+p*w)+s*(_*T-E*R+p*m)-a*(_*b-E*w+f*m)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],a=e[1],r=e[5],l=e[9],o=e[2],c=e[6],d=e[10];return t*(r*d-l*c)-n*(a*d-l*o)+s*(a*c-r*o)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],a=e[3],r=e[4],l=e[5],o=e[6],c=e[7],d=e[8],h=e[9],u=e[10],g=e[11],_=e[12],E=e[13],f=e[14],p=e[15],S=t*l-n*r,T=t*o-s*r,b=t*c-a*r,R=n*o-s*l,w=n*c-a*l,m=s*c-a*o,y=d*E-h*_,N=d*f-u*_,M=d*p-g*_,L=h*f-u*E,U=h*p-g*E,W=u*p-g*f,I=S*W-T*U+b*L+R*M-w*N+m*y;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const V=1/I;return e[0]=(l*W-o*U+c*L)*V,e[1]=(s*U-n*W-a*L)*V,e[2]=(E*m-f*w+p*R)*V,e[3]=(u*w-h*m-g*R)*V,e[4]=(o*M-r*W-c*N)*V,e[5]=(t*W-s*M+a*N)*V,e[6]=(f*b-_*m-p*T)*V,e[7]=(d*m-u*b+g*T)*V,e[8]=(r*U-l*M+c*y)*V,e[9]=(n*M-t*U-a*y)*V,e[10]=(_*w-E*b+p*S)*V,e[11]=(h*b-d*w-g*S)*V,e[12]=(l*N-r*L-o*y)*V,e[13]=(t*L-n*N+s*y)*V,e[14]=(E*T-_*R-f*S)*V,e[15]=(d*R-h*T+u*S)*V,this}scale(e){const t=this.elements,n=e.x,s=e.y,a=e.z;return t[0]*=n,t[4]*=s,t[8]*=a,t[1]*=n,t[5]*=s,t[9]*=a,t[2]*=n,t[6]*=s,t[10]*=a,t[3]*=n,t[7]*=s,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),a=1-n,r=e.x,l=e.y,o=e.z,c=a*r,d=a*l;return this.set(c*r+n,c*l-s*o,c*o+s*l,0,c*l+s*o,d*l+n,d*o-s*r,0,c*o-s*l,d*o+s*r,a*o*o+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,a,r){return this.set(1,n,a,0,e,1,r,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,a=t._x,r=t._y,l=t._z,o=t._w,c=a+a,d=r+r,h=l+l,u=a*c,g=a*d,_=a*h,E=r*d,f=r*h,p=l*h,S=o*c,T=o*d,b=o*h,R=n.x,w=n.y,m=n.z;return s[0]=(1-(E+p))*R,s[1]=(g+b)*R,s[2]=(_-T)*R,s[3]=0,s[4]=(g-b)*w,s[5]=(1-(u+p))*w,s[6]=(f+S)*w,s[7]=0,s[8]=(_+T)*m,s[9]=(f-S)*m,s[10]=(1-(u+E))*m,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const a=this.determinantAffine();if(a===0)return n.set(1,1,1),t.identity(),this;let r=Qn.set(s[0],s[1],s[2]).length();const l=Qn.set(s[4],s[5],s[6]).length(),o=Qn.set(s[8],s[9],s[10]).length();a<0&&(r=-r),Yt.copy(this);const c=1/r,d=1/l,h=1/o;return Yt.elements[0]*=c,Yt.elements[1]*=c,Yt.elements[2]*=c,Yt.elements[4]*=d,Yt.elements[5]*=d,Yt.elements[6]*=d,Yt.elements[8]*=h,Yt.elements[9]*=h,Yt.elements[10]*=h,t.setFromRotationMatrix(Yt),n.x=r,n.y=l,n.z=o,this}makePerspective(e,t,n,s,a,r,l=tn,o=!1){const c=this.elements,d=2*a/(t-e),h=2*a/(n-s),u=(t+e)/(t-e),g=(n+s)/(n-s);let _,E;if(o)_=a/(r-a),E=r*a/(r-a);else if(l===tn)_=-(r+a)/(r-a),E=-2*r*a/(r-a);else if(l===Ui)_=-r/(r-a),E=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=g,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,a,r,l=tn,o=!1){const c=this.elements,d=2/(t-e),h=2/(n-s),u=-(t+e)/(t-e),g=-(n+s)/(n-s);let _,E;if(o)_=1/(r-a),E=r/(r-a);else if(l===tn)_=-2/(r-a),E=-(r+a)/(r-a);else if(l===Ui)_=-1/(r-a),E=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=g,c[2]=0,c[6]=0,c[10]=_,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ls.prototype.isMatrix4=!0;let ct=Ls;const Qn=new z,Yt=new ct,Jc=new z(0,0,0),jc=new z(1,1,1),Rn=new z,qi=new z,Ot=new z,jr=new ct,Qr=new _i;class On{constructor(e=0,t=0,n=0,s=On.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,a=s[0],r=s[4],l=s[8],o=s[1],c=s[5],d=s[9],h=s[2],u=s[6],g=s[10];switch(t){case"XYZ":this._y=Math.asin($e(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,g),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-$e(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(l,g),this._z=Math.atan2(o,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin($e(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,g),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(o,a));break;case"ZYX":this._y=Math.asin(-$e(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,g),this._z=Math.atan2(o,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin($e(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(l,g));break;case"XZY":this._z=Math.asin(-$e(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-d,g),this._y=0);break;default:Pe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return jr.makeRotationFromQuaternion(e),this.setFromRotationMatrix(jr,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Qr.setFromEuler(this),this.setFromQuaternion(Qr,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}On.DEFAULT_ORDER="XYZ";class cl{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Qc=0;const eo=new z,ei=new _i,mn=new ct,Ki=new z,yi=new z,ed=new z,td=new _i,to=new z(1,0,0),no=new z(0,1,0),io=new z(0,0,1),so={type:"added"},nd={type:"removed"},ti={type:"childadded",child:null},Ks={type:"childremoved",child:null};class Ct extends Jn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Qc++}),this.uuid=Oi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ct.DEFAULT_UP.clone();const e=new z,t=new On,n=new _i,s=new z(1,1,1);function a(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ct},normalMatrix:{value:new De}}),this.matrix=new ct,this.matrixWorld=new ct,this.matrixAutoUpdate=Ct.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cl,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ei.setFromAxisAngle(e,t),this.quaternion.multiply(ei),this}rotateOnWorldAxis(e,t){return ei.setFromAxisAngle(e,t),this.quaternion.premultiply(ei),this}rotateX(e){return this.rotateOnAxis(to,e)}rotateY(e){return this.rotateOnAxis(no,e)}rotateZ(e){return this.rotateOnAxis(io,e)}translateOnAxis(e,t){return eo.copy(e).applyQuaternion(this.quaternion),this.position.add(eo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(to,e)}translateY(e){return this.translateOnAxis(no,e)}translateZ(e){return this.translateOnAxis(io,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(mn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ki.copy(e):Ki.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),yi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?mn.lookAt(yi,Ki,this.up):mn.lookAt(Ki,yi,this.up),this.quaternion.setFromRotationMatrix(mn),s&&(mn.extractRotation(s.matrixWorld),ei.setFromRotationMatrix(mn),this.quaternion.premultiply(ei.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Ye("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(so),ti.child=e,this.dispatchEvent(ti),ti.child=null):Ye("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nd),Ks.child=e,this.dispatchEvent(Ks),Ks.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),mn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),mn.multiply(e.parent.matrixWorld)),e.applyMatrix4(mn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(so),ti.child=e,this.dispatchEvent(ti),ti.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yi,e,ed),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(yi,td,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*n-a[8]*s,a[13]+=n-a[1]*t-a[5]*n-a[9]*s,a[14]+=s-a[2]*t-a[6]*n-a[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const a=this.children;for(let r=0,l=a.length;r<l;r++)a[r].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(l=>({...l,boundingBox:l.boundingBox?l.boundingBox.toJSON():void 0,boundingSphere:l.boundingSphere?l.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(l=>({...l})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function a(l,o){return l[o.uuid]===void 0&&(l[o.uuid]=o.toJSON(e)),o.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const o=l.shapes;if(Array.isArray(o))for(let c=0,d=o.length;c<d;c++){const h=o[c];a(e.shapes,h)}else a(e.shapes,o)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let o=0,c=this.material.length;o<c;o++)l.push(a(e.materials,this.material[o]));s.material=l}else s.material=a(e.materials,this.material);if(this.children.length>0){s.children=[];for(let l=0;l<this.children.length;l++)s.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let l=0;l<this.animations.length;l++){const o=this.animations[l];s.animations.push(a(e.animations,o))}}if(t){const l=r(e.geometries),o=r(e.materials),c=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),g=r(e.animations),_=r(e.nodes);l.length>0&&(n.geometries=l),o.length>0&&(n.materials=o),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),h.length>0&&(n.shapes=h),u.length>0&&(n.skeletons=u),g.length>0&&(n.animations=g),_.length>0&&(n.nodes=_)}return n.object=s,n;function r(l){const o=[];for(const c in l){const d=l[c];delete d.metadata,o.push(d)}return o}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Ct.DEFAULT_UP=new z(0,1,0);Ct.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ct.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ci extends Ct{constructor(){super(),this.isGroup=!0,this.type="Group"}}const id={type:"move"};class Ys{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ci,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ci,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ci,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,a=null,r=null;const l=this._targetRay,o=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const E of e.hand.values()){const f=t.getJointPose(E,n),p=this._getHandJoint(c,E);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),g=.02,_=.005;c.inputState.pinching&&u>g+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=g-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else o!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,o.eventsEnabled&&o.dispatchEvent({type:"gripUpdated",data:e,target:this})));l!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(id)))}return l!==null&&(l.visible=s!==null),o!==null&&(o.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Ci;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const dl={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Cn={h:0,s:0,l:0},Yi={h:0,s:0,l:0};function Zs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class qe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Xt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,We.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=We.workingColorSpace){return this.r=e,this.g=t,this.b=n,We.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=We.workingColorSpace){if(e=Hc(e,1),t=$e(t,0,1),n=$e(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,r=2*n-a;this.r=Zs(r,a,e+1/3),this.g=Zs(r,a,e),this.b=Zs(r,a,e-1/3)}return We.colorSpaceToWorking(this,s),this}setStyle(e,t=Xt){function n(a){a!==void 0&&parseFloat(a)<1&&Pe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=s[1],l=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(100,parseFloat(a[1]))/100,Math.min(100,parseFloat(a[2]))/100,Math.min(100,parseFloat(a[3]))/100,t);break;case"hsl":case"hsla":if(a=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(l))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Pe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);Pe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Xt){const n=dl[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Pe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=En(e.r),this.g=En(e.g),this.b=En(e.b),this}copyLinearToSRGB(e){return this.r=hi(e.r),this.g=hi(e.g),this.b=hi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Xt){return We.workingToColorSpace(Rt.copy(this),e),Math.round($e(Rt.r*255,0,255))*65536+Math.round($e(Rt.g*255,0,255))*256+Math.round($e(Rt.b*255,0,255))}getHexString(e=Xt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=We.workingColorSpace){We.workingToColorSpace(Rt.copy(this),t);const n=Rt.r,s=Rt.g,a=Rt.b,r=Math.max(n,s,a),l=Math.min(n,s,a);let o,c;const d=(l+r)/2;if(l===r)o=0,c=0;else{const h=r-l;switch(c=d<=.5?h/(r+l):h/(2-r-l),r){case n:o=(s-a)/h+(s<a?6:0);break;case s:o=(a-n)/h+2;break;case a:o=(n-s)/h+4;break}o/=6}return e.h=o,e.s=c,e.l=d,e}getRGB(e,t=We.workingColorSpace){return We.workingToColorSpace(Rt.copy(this),t),e.r=Rt.r,e.g=Rt.g,e.b=Rt.b,e}getStyle(e=Xt){We.workingToColorSpace(Rt.copy(this),e);const t=Rt.r,n=Rt.g,s=Rt.b;return e!==Xt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Cn),this.setHSL(Cn.h+e,Cn.s+t,Cn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Cn),e.getHSL(Yi);const n=Vs(Cn.h,Yi.h,t),s=Vs(Cn.s,Yi.s,t),a=Vs(Cn.l,Yi.l,t);return this.setHSL(n,s,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*s,this.g=a[1]*t+a[4]*n+a[7]*s,this.b=a[2]*t+a[5]*n+a[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Rt=new qe;qe.NAMES=dl;class sd extends Ct{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new On,this.environmentIntensity=1,this.environmentRotation=new On,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Zt=new z,gn=new z,Js=new z,vn=new z,ni=new z,ii=new z,ao=new z,js=new z,Qs=new z,ea=new z,ta=new lt,na=new lt,ia=new lt;class en{constructor(e=new z,t=new z,n=new z){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Zt.subVectors(e,t),s.cross(Zt);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(e,t,n,s,a){Zt.subVectors(s,t),gn.subVectors(n,t),Js.subVectors(e,t);const r=Zt.dot(Zt),l=Zt.dot(gn),o=Zt.dot(Js),c=gn.dot(gn),d=gn.dot(Js),h=r*c-l*l;if(h===0)return a.set(0,0,0),null;const u=1/h,g=(c*o-l*d)*u,_=(r*d-l*o)*u;return a.set(1-g-_,_,g)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,vn)===null?!1:vn.x>=0&&vn.y>=0&&vn.x+vn.y<=1}static getInterpolation(e,t,n,s,a,r,l,o){return this.getBarycoord(e,t,n,s,vn)===null?(o.x=0,o.y=0,"z"in o&&(o.z=0),"w"in o&&(o.w=0),null):(o.setScalar(0),o.addScaledVector(a,vn.x),o.addScaledVector(r,vn.y),o.addScaledVector(l,vn.z),o)}static getInterpolatedAttribute(e,t,n,s,a,r){return ta.setScalar(0),na.setScalar(0),ia.setScalar(0),ta.fromBufferAttribute(e,t),na.fromBufferAttribute(e,n),ia.fromBufferAttribute(e,s),r.setScalar(0),r.addScaledVector(ta,a.x),r.addScaledVector(na,a.y),r.addScaledVector(ia,a.z),r}static isFrontFacing(e,t,n,s){return Zt.subVectors(n,t),gn.subVectors(e,t),Zt.cross(gn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zt.subVectors(this.c,this.b),gn.subVectors(this.a,this.b),Zt.cross(gn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return en.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return en.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,a){return en.getInterpolation(e,this.a,this.b,this.c,t,n,s,a)}containsPoint(e){return en.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return en.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,a=this.c;let r,l;ni.subVectors(s,n),ii.subVectors(a,n),js.subVectors(e,n);const o=ni.dot(js),c=ii.dot(js);if(o<=0&&c<=0)return t.copy(n);Qs.subVectors(e,s);const d=ni.dot(Qs),h=ii.dot(Qs);if(d>=0&&h<=d)return t.copy(s);const u=o*h-d*c;if(u<=0&&o>=0&&d<=0&&o-d>0)return r=o/(o-d),t.copy(n).addScaledVector(ni,r);ea.subVectors(e,a);const g=ni.dot(ea),_=ii.dot(ea);if(_>=0&&g<=_)return t.copy(a);const E=g*c-o*_;if(E<=0&&c>=0&&_<=0)return l=c/(c-_),t.copy(n).addScaledVector(ii,l);const f=d*_-g*h;if(f<=0&&h-d>=0&&g-_>=0)return ao.subVectors(a,s),l=(h-d)/(h-d+(g-_)),t.copy(s).addScaledVector(ao,l);const p=1/(f+E+u);return r=E*p,l=u*p,t.copy(n).addScaledVector(ni,r).addScaledVector(ii,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class zi{constructor(e=new z(1/0,1/0,1/0),t=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let r=0,l=a.count;r<l;r++)e.isMesh===!0?e.getVertexPosition(r,Jt):Jt.fromBufferAttribute(a,r),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Zi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Zi.copy(n.boundingBox)),Zi.applyMatrix4(e.matrixWorld),this.union(Zi)}const s=e.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bi),Ji.subVectors(this.max,bi),si.subVectors(e.a,bi),ai.subVectors(e.b,bi),ri.subVectors(e.c,bi),Ln.subVectors(ai,si),Pn.subVectors(ri,ai),Gn.subVectors(si,ri);let t=[0,-Ln.z,Ln.y,0,-Pn.z,Pn.y,0,-Gn.z,Gn.y,Ln.z,0,-Ln.x,Pn.z,0,-Pn.x,Gn.z,0,-Gn.x,-Ln.y,Ln.x,0,-Pn.y,Pn.x,0,-Gn.y,Gn.x,0];return!sa(t,si,ai,ri,Ji)||(t=[1,0,0,0,1,0,0,0,1],!sa(t,si,ai,ri,Ji))?!1:(ji.crossVectors(Ln,Pn),t=[ji.x,ji.y,ji.z],sa(t,si,ai,ri,Ji))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jt).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(_n),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const _n=[new z,new z,new z,new z,new z,new z,new z,new z],Jt=new z,Zi=new zi,si=new z,ai=new z,ri=new z,Ln=new z,Pn=new z,Gn=new z,bi=new z,Ji=new z,ji=new z,Vn=new z;function sa(i,e,t,n,s){for(let a=0,r=i.length-3;a<=r;a+=3){Vn.fromArray(i,a);const l=s.x*Math.abs(Vn.x)+s.y*Math.abs(Vn.y)+s.z*Math.abs(Vn.z),o=e.dot(Vn),c=t.dot(Vn),d=n.dot(Vn);if(Math.max(-Math.max(o,c,d),Math.min(o,c,d))>l)return!1}return!0}const ht=new z,Qi=new Be;let ad=0;class Xn extends Jn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ad++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Fc,this.updateRanges=[],this.gpuType=ln,this.version=0,this._normalizationScale=e!==void 0?fr(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Qi.fromBufferAttribute(this,t),Qi.applyMatrix3(e),this.setXY(t,Qi.x,Qi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix3(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyMatrix4(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.applyNormalMatrix(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ht.fromBufferAttribute(this,t),ht.transformDirection(e),this.setXYZ(t,ht.x,ht.y,ht.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,a){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),a=this._normalize(a)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):Vc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):Wc(e,this.array)}}class ul extends Xn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class hl extends Xn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Dt extends Xn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const rd=new zi,Ei=new z,aa=new z;class mr{constructor(e=new z,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):rd.setFromPoints(e).getCenter(n);let s=0;for(let a=0,r=e.length;a<r;a++)s=Math.max(s,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ei.subVectors(e,this.center);const t=Ei.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ei,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ei.copy(e.center).add(aa)),this.expandByPoint(Ei.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let od=0;const $t=new ct,ra=new Ct,oi=new z,zt=new zi,Ti=new zi,St=new z;class Tn extends Jn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Oi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(kc(e)?hl:ul)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new De().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return $t.makeRotationFromQuaternion(e),this.applyMatrix4($t),this}rotateX(e){return $t.makeRotationX(e),this.applyMatrix4($t),this}rotateY(e){return $t.makeRotationY(e),this.applyMatrix4($t),this}rotateZ(e){return $t.makeRotationZ(e),this.applyMatrix4($t),this}translate(e,t,n){return $t.makeTranslation(e,t,n),this.applyMatrix4($t),this}scale(e,t,n){return $t.makeScale(e,t,n),this.applyMatrix4($t),this}lookAt(e){return ra.lookAt(e),ra.updateMatrix(),this.applyMatrix4(ra.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(oi).negate(),this.translate(oi.x,oi.y,oi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,a=e.length;s<a;s++){const r=e[s];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Dt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const a=e[s];t.setXYZ(s,a.x,a.y,a.z||0)}e.length>t.count&&Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const a=t[n];zt.setFromBufferAttribute(a),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Ye('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Ye("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new z,1/0);return}if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const l=t[a];Ti.setFromBufferAttribute(l),this.morphTargetsRelative?(St.addVectors(zt.min,Ti.min),zt.expandByPoint(St),St.addVectors(zt.max,Ti.max),zt.expandByPoint(St)):(zt.expandByPoint(Ti.min),zt.expandByPoint(Ti.max))}zt.getCenter(n);let s=0;for(let a=0,r=e.count;a<r;a++)St.fromBufferAttribute(e,a),s=Math.max(s,n.distanceToSquared(St));if(t)for(let a=0,r=t.length;a<r;a++){const l=t[a],o=this.morphTargetsRelative;for(let c=0,d=l.count;c<d;c++)St.fromBufferAttribute(l,c),o&&(oi.fromBufferAttribute(e,c),St.add(oi)),s=Math.max(s,n.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Ye('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Ye("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,a=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==n.count)&&(r=new Xn(new Float32Array(4*n.count),4),this.setAttribute("tangent",r));const l=[],o=[],c=new Uint8Array(n.count);for(let N=0;N<n.count;N++)l[N]=new z,o[N]=new z;const d=new z,h=new z,u=new z,g=new Be,_=new Be,E=new Be,f=new z,p=new z;function S(N,M,L){c[N]=c[M]=c[L]=1,d.fromBufferAttribute(n,N),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,L),g.fromBufferAttribute(a,N),_.fromBufferAttribute(a,M),E.fromBufferAttribute(a,L),h.sub(d),u.sub(d),_.sub(g),E.sub(g);const U=1/(_.x*E.y-E.x*_.y);isFinite(U)&&(f.copy(h).multiplyScalar(E.y).addScaledVector(u,-_.y).multiplyScalar(U),p.copy(u).multiplyScalar(_.x).addScaledVector(h,-E.x).multiplyScalar(U),l[N].add(f),l[M].add(f),l[L].add(f),o[N].add(p),o[M].add(p),o[L].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let N=0,M=T.length;N<M;++N){const L=T[N],U=L.start,W=L.count;for(let I=U,V=U+W;I<V;I+=3)S(e.getX(I+0),e.getX(I+1),e.getX(I+2))}const b=new z,R=new z,w=new z,m=new z;function y(N){w.fromBufferAttribute(s,N),m.copy(w);const M=l[N];b.copy(M),b.sub(w.multiplyScalar(w.dot(M))).normalize(),R.crossVectors(m,M);const U=R.dot(o[N])<0?-1:1;r.setXYZW(N,b.x,b.y,b.z,U)}for(let N=0,M=n.count;N<M;++N)c[N]&&y(N);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Xn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,g=n.count;u<g;u++)n.setXYZ(u,0,0,0);const s=new z,a=new z,r=new z,l=new z,o=new z,c=new z,d=new z,h=new z;if(e)for(let u=0,g=e.count;u<g;u+=3){const _=e.getX(u+0),E=e.getX(u+1),f=e.getX(u+2);s.fromBufferAttribute(t,_),a.fromBufferAttribute(t,E),r.fromBufferAttribute(t,f),d.subVectors(r,a),h.subVectors(s,a),d.cross(h),l.fromBufferAttribute(n,_),o.fromBufferAttribute(n,E),c.fromBufferAttribute(n,f),l.add(d),o.add(d),c.add(d),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(E,o.x,o.y,o.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let u=0,g=t.count;u<g;u+=3)s.fromBufferAttribute(t,u+0),a.fromBufferAttribute(t,u+1),r.fromBufferAttribute(t,u+2),d.subVectors(r,a),h.subVectors(s,a),d.cross(h),n.setXYZ(u+0,d.x,d.y,d.z),n.setXYZ(u+1,d.x,d.y,d.z),n.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(l,o){const c=l.array,d=l.itemSize,h=l.normalized,u=new c.constructor(o.length*d);let g=0,_=0;for(let E=0,f=o.length;E<f;E++){l.isInterleavedBufferAttribute?g=o[E]*l.data.stride+l.offset:g=o[E]*d;for(let p=0;p<d;p++)u[_++]=c[g++]}return new Xn(u,d,h)}if(this.index===null)return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tn,n=this.index.array,s=this.attributes;for(const l in s){const o=s[l],c=e(o,n);t.setAttribute(l,c)}const a=this.morphAttributes;for(const l in a){const o=[],c=a[l];for(let d=0,h=c.length;d<h;d++){const u=c[d],g=e(u,n);o.push(g)}t.morphAttributes[l]=o}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let l=0,o=r.length;l<o;l++){const c=r[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const o=this.parameters;for(const c in o)o[c]!==void 0&&(e[c]=o[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const o in n){const c=n[o];e.data.attributes[o]=c.toJSON(e.data)}const s={};let a=!1;for(const o in this.morphAttributes){const c=this.morphAttributes[o],d=[];for(let h=0,u=c.length;h<u;h++){const g=c[h];d.push(g.toJSON(e.data))}d.length>0&&(s[o]=d,a=!0)}a&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere=l.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const a=e.morphAttributes;for(const c in a){const d=[],h=a[c];for(let u=0,g=h.length;u<g;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const o=e.boundingSphere;return o!==null&&(this.boundingSphere=o.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const oa=new z,ld=new z,cd=new De;class Dn{constructor(e=new z(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=oa.subVectors(n,t).cross(ld.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(oa),a=this.normal.dot(s);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(s,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||cd.getNormalMatrix(e),s=this.coplanarPoint(oa).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let dd=0;class Bi extends Jn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:dd++}),this.uuid=Oi(),this.name="",this.type="Material",this.blending=Pi,this.side=Kn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Bo,this.blendDst=Ho,this.blendEquation=di,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ii,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Lc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Hs,this.stencilZFail=Hs,this.stencilZPass=Hs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Pe(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){Pe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const r=[];for(const l in a){const o=a[l];delete o.metadata,r.push(o)}return r}if(t){const a=s(e.textures),r=s(e.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new qe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Dn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Be().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Be().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const xn=new z,la=new z,es=new z,ts=new z;class ud{constructor(e=new z,t=new z(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(xn.copy(this.origin).addScaledVector(this.direction,t),xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){la.copy(e).add(t).multiplyScalar(.5),es.copy(t).sub(e).normalize(),ts.copy(this.origin).sub(la);const a=e.distanceTo(t)*.5,r=-this.direction.dot(es),l=ts.dot(this.direction),o=-ts.dot(es),c=ts.lengthSq(),d=Math.abs(1-r*r);let h,u,g,_;if(d>0)if(h=r*o-l,u=r*l-o,_=a*d,h>=0)if(u>=-_)if(u<=_){const E=1/d;h*=E,u*=E,g=h*(h+r*u+2*l)+u*(r*h+u+2*o)+c}else u=a,h=Math.max(0,-(r*u+l)),g=-h*h+u*(u+2*o)+c;else u=-a,h=Math.max(0,-(r*u+l)),g=-h*h+u*(u+2*o)+c;else u<=-_?(h=Math.max(0,-(-r*a+l)),u=h>0?-a:Math.min(Math.max(-a,-o),a),g=-h*h+u*(u+2*o)+c):u<=_?(h=0,u=Math.min(Math.max(-a,-o),a),g=u*(u+2*o)+c):(h=Math.max(0,-(r*a+l)),u=h>0?a:Math.min(Math.max(-a,-o),a),g=-h*h+u*(u+2*o)+c);else u=r>0?-a:a,h=Math.max(0,-(r*u+l)),g=-h*h+u*(u+2*o)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(la).addScaledVector(es,u),g}intersectSphere(e,t){if(e.radius<0)return null;xn.subVectors(e.center,this.origin);const n=xn.dot(this.direction),s=xn.dot(xn)-n*n,a=e.radius*e.radius;if(s>a)return null;const r=Math.sqrt(a-s),l=n-r,o=n+r;return o<0?null:l<0?this.at(o,t):this.at(l,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,a,r,l,o;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(n=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(n=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(a=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(a=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),n>r||a>s||((a>n||isNaN(n))&&(n=a),(r<s||isNaN(s))&&(s=r),h>=0?(l=(e.min.z-u.z)*h,o=(e.max.z-u.z)*h):(l=(e.max.z-u.z)*h,o=(e.min.z-u.z)*h),n>o||l>s)||((l>n||n!==n)&&(n=l),(o<s||s!==s)&&(s=o),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,xn)!==null}intersectTriangle(e,t,n,s,a){const r=this.origin,l=this.direction,o=l.x,c=l.y,d=l.z,h=e.x-r.x,u=e.y-r.y,g=e.z-r.z,_=t.x-r.x,E=t.y-r.y,f=t.z-r.z,p=n.x-r.x,S=n.y-r.y,T=n.z-r.z,b=Math.abs(o),R=Math.abs(c),w=Math.abs(d);let m,y,N,M,L,U,W,I,V,Q,B,ie;if(b>=R&&b>=w?(N=o,U=h,V=_,ie=p,o>=0?(m=c,y=d,M=u,L=g,W=E,I=f,Q=S,B=T):(m=d,y=c,M=g,L=u,W=f,I=E,Q=T,B=S)):R>=w?(N=c,U=u,V=E,ie=S,c>=0?(m=d,y=o,M=g,L=h,W=f,I=_,Q=T,B=p):(m=o,y=d,M=h,L=g,W=_,I=f,Q=p,B=T)):(N=d,U=g,V=f,ie=T,d>=0?(m=o,y=c,M=h,L=u,W=_,I=E,Q=p,B=S):(m=c,y=o,M=u,L=h,W=E,I=_,Q=S,B=p)),N===0)return null;const X=m/N,ee=y/N,te=1/N,Ee=M-X*U,Ne=L-ee*U,Y=W-X*V,ve=I-ee*V,Me=Q-X*ie,Re=B-ee*ie,_e=Me*ve-Re*Y,Fe=Ee*Re-Ne*Me,dt=Y*Ne-ve*Ee;if(s){if(_e<0||Fe<0||dt<0)return null}else if((_e<0||Fe<0||dt<0)&&(_e>0||Fe>0||dt>0))return null;const Le=_e+Fe+dt;if(Le===0)return null;const Ze=te*(_e*U+Fe*V+dt*ie);return(Le>0?Ze<0:Ze>0)?null:this.at(Ze/Le,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fl extends Bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.combine=Go,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const ro=new ct,Wn=new ud,ns=new mr,oo=new z,is=new z,ss=new z,as=new z,ca=new z,rs=new z,lo=new z,os=new z;class un extends Ct{constructor(e=new Tn,t=new fl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const l=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[l]=a}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const l=this.morphTargetInfluences;if(a&&l){rs.set(0,0,0);for(let o=0,c=a.length;o<c;o++){const d=l[o],h=a[o];d!==0&&(ca.fromBufferAttribute(h,e),r?rs.addScaledVector(ca,d):rs.addScaledVector(ca.sub(t),d))}t.add(rs)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ns.copy(n.boundingSphere),ns.applyMatrix4(a),Wn.copy(e.ray).recast(e.near),!(ns.containsPoint(Wn.origin)===!1&&(Wn.intersectSphere(ns,oo)===null||Wn.origin.distanceToSquared(oo)>(e.far-e.near)**2))&&(ro.copy(a).invert(),Wn.copy(e.ray).applyMatrix4(ro),!(n.boundingBox!==null&&Wn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Wn)))}_computeIntersections(e,t,n){let s;const a=this.geometry,r=this.material,l=a.index,o=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,h=a.attributes.normal,u=a.groups,g=a.drawRange;if(l!==null)if(Array.isArray(r))for(let _=0,E=u.length;_<E;_++){const f=u[_],p=r[f.materialIndex],S=Math.max(f.start,g.start),T=Math.min(l.count,Math.min(f.start+f.count,g.start+g.count));for(let b=S,R=T;b<R;b+=3){const w=l.getX(b),m=l.getX(b+1),y=l.getX(b+2);s=ls(this,p,e,n,c,d,h,w,m,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),E=Math.min(l.count,g.start+g.count);for(let f=_,p=E;f<p;f+=3){const S=l.getX(f),T=l.getX(f+1),b=l.getX(f+2);s=ls(this,r,e,n,c,d,h,S,T,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(o!==void 0)if(Array.isArray(r))for(let _=0,E=u.length;_<E;_++){const f=u[_],p=r[f.materialIndex],S=Math.max(f.start,g.start),T=Math.min(o.count,Math.min(f.start+f.count,g.start+g.count));for(let b=S,R=T;b<R;b+=3){const w=b,m=b+1,y=b+2;s=ls(this,p,e,n,c,d,h,w,m,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,g.start),E=Math.min(o.count,g.start+g.count);for(let f=_,p=E;f<p;f+=3){const S=f,T=f+1,b=f+2;s=ls(this,r,e,n,c,d,h,S,T,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function hd(i,e,t,n,s,a,r,l){let o;if(e.side===kt?o=n.intersectTriangle(r,a,s,!0,l):o=n.intersectTriangle(s,a,r,e.side===Kn,l),o===null)return null;os.copy(l),os.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(os);return c<t.near||c>t.far?null:{distance:c,point:os.clone(),object:i}}function ls(i,e,t,n,s,a,r,l,o,c){i.getVertexPosition(l,is),i.getVertexPosition(o,ss),i.getVertexPosition(c,as);const d=hd(i,e,t,n,is,ss,as,lo);if(d){const h=new z;en.getBarycoord(lo,is,ss,as,h),s&&(d.uv=en.getInterpolatedAttribute(s,l,o,c,h,new Be)),a&&(d.uv1=en.getInterpolatedAttribute(a,l,o,c,h,new Be)),r&&(d.normal=en.getInterpolatedAttribute(r,l,o,c,h,new z),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const u={a:l,b:o,c,normal:new z,materialIndex:0};en.getNormal(is,ss,as,u.normal),d.face=u,d.barycoord=h}return d}class fd extends It{constructor(e=null,t=1,n=1,s,a,r,l,o,c=Et,d=Et,h,u){super(null,r,l,o,c,d,s,a,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $n=new mr,pd=new Be(.5,.5),cs=new z;class Fi{constructor(e=new Dn,t=new Dn,n=new Dn,s=new Dn,a=new Dn,r=new Dn){this.planes=[e,t,n,s,a,r]}set(e,t,n,s,a,r){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(s),l[4].copy(a),l[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=tn,n=!1){const s=this.planes,a=e.elements,r=a[0],l=a[1],o=a[2],c=a[3],d=a[4],h=a[5],u=a[6],g=a[7],_=a[8],E=a[9],f=a[10],p=a[11],S=a[12],T=a[13],b=a[14],R=a[15];if(s[0].setComponents(c-r,g-d,p-_,R-S).normalize(),s[1].setComponents(c+r,g+d,p+_,R+S).normalize(),s[2].setComponents(c+l,g+h,p+E,R+T).normalize(),s[3].setComponents(c-l,g-h,p-E,R-T).normalize(),n)s[4].setComponents(o,u,f,b).normalize(),s[5].setComponents(c-o,g-u,p-f,R-b).normalize();else if(s[4].setComponents(c-o,g-u,p-f,R-b).normalize(),t===tn)s[5].setComponents(c+o,g+u,p+f,R+b).normalize();else if(t===Ui)s[5].setComponents(o,u,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$n.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$n.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($n)}intersectsSprite(e){$n.center.set(0,0,0);const t=pd.distanceTo(e.center);return $n.radius=.7071067811865476+t,$n.applyMatrix4(e.matrixWorld),this.intersectsSphere($n)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(cs.x=s.normal.x>0?e.max.x:e.min.x,cs.y=s.normal.y>0?e.max.y:e.min.y,cs.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(cs)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const co=new ct;class gr{constructor(){this.coordinateSystem=tn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const a=t[s];co.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),n[s]===void 0&&(n[s]=new Fi),n[s].setFromProjectionMatrix(co,a.coordinateSystem,a.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new Fi),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new gr().copy(this)}}class pl extends It{constructor(e=[],t=pi,n,s,a,r,l,o,c,d){super(e,t,n,s,a,r,l,o,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class gi extends It{constructor(e,t,n=hn,s,a,r,l=Et,o=Et,c,d=kn,h=1){if(d!==kn&&d!==Fn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:h};super(u,s,a,r,l,o,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new pr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class ml extends gi{constructor(e,t=hn,n=pi,s,a,r=Et,l=Et,o,c=kn){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,n,s,a,r,l,o,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class gl extends It{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class xi extends Tn{constructor(e=1,t=1,n=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:a,depthSegments:r};const l=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const o=[],c=[],d=[],h=[];let u=0,g=0;_("z","y","x",-1,-1,n,t,e,r,a,0),_("z","y","x",1,-1,n,t,-e,r,a,1),_("x","z","y",1,1,e,n,t,s,r,2),_("x","z","y",1,-1,e,n,-t,s,r,3),_("x","y","z",1,-1,e,t,n,s,a,4),_("x","y","z",-1,-1,e,t,-n,s,a,5),this.setIndex(o),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(d,3)),this.setAttribute("uv",new Dt(h,2));function _(E,f,p,S,T,b,R,w,m,y,N){const M=b/m,L=R/y,U=b/2,W=R/2,I=w/2,V=m+1,Q=y+1;let B=0,ie=0;const X=new z;for(let ee=0;ee<Q;ee++){const te=ee*L-W;for(let Ee=0;Ee<V;Ee++){const Ne=Ee*M-U;X[E]=Ne*S,X[f]=te*T,X[p]=I,c.push(X.x,X.y,X.z),X[E]=0,X[f]=0,X[p]=w>0?1:-1,d.push(X.x,X.y,X.z),h.push(Ee/m),h.push(1-ee/y),B+=1}}for(let ee=0;ee<y;ee++)for(let te=0;te<m;te++){const Ee=u+te+V*ee,Ne=u+te+V*(ee+1),Y=u+(te+1)+V*(ee+1),ve=u+(te+1)+V*ee;o.push(Ee,Ne,ve),o.push(Ne,Y,ve),ie+=6}l.addGroup(g,ie,N),g+=ie,u+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class vr extends Tn{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const a=[],r=[];l(s),c(n),d(),this.setAttribute("position",new Dt(a,3)),this.setAttribute("normal",new Dt(a.slice(),3)),this.setAttribute("uv",new Dt(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function l(S){const T=new z,b=new z,R=new z;for(let w=0;w<t.length;w+=3)g(t[w+0],T),g(t[w+1],b),g(t[w+2],R),o(T,b,R,S)}function o(S,T,b,R){const w=R+1,m=[];for(let y=0;y<=w;y++){m[y]=[];const N=S.clone().lerp(b,y/w),M=T.clone().lerp(b,y/w),L=w-y;for(let U=0;U<=L;U++)U===0&&y===w?m[y][U]=N:m[y][U]=N.clone().lerp(M,U/L)}for(let y=0;y<w;y++)for(let N=0;N<2*(w-y)-1;N++){const M=Math.floor(N/2);N%2===0?(u(m[y][M+1]),u(m[y+1][M]),u(m[y][M])):(u(m[y][M+1]),u(m[y+1][M+1]),u(m[y+1][M]))}}function c(S){const T=new z;for(let b=0;b<a.length;b+=3)T.x=a[b+0],T.y=a[b+1],T.z=a[b+2],T.normalize().multiplyScalar(S),a[b+0]=T.x,a[b+1]=T.y,a[b+2]=T.z}function d(){const S=new z;for(let T=0;T<a.length;T+=3){S.x=a[T+0],S.y=a[T+1],S.z=a[T+2];const b=f(S)/2/Math.PI+.5,R=p(S)/Math.PI+.5;r.push(b,1-R)}_(),h()}function h(){for(let S=0;S<r.length;S+=6){const T=r[S+0],b=r[S+2],R=r[S+4],w=Math.max(T,b,R),m=Math.min(T,b,R);w>.9&&m<.1&&(T<.2&&(r[S+0]+=1),b<.2&&(r[S+2]+=1),R<.2&&(r[S+4]+=1))}}function u(S){a.push(S.x,S.y,S.z)}function g(S,T){const b=S*3;T.x=e[b+0],T.y=e[b+1],T.z=e[b+2]}function _(){const S=new z,T=new z,b=new z,R=new z,w=new Be,m=new Be,y=new Be;for(let N=0,M=0;N<a.length;N+=9,M+=6){S.set(a[N+0],a[N+1],a[N+2]),T.set(a[N+3],a[N+4],a[N+5]),b.set(a[N+6],a[N+7],a[N+8]),w.set(r[M+0],r[M+1]),m.set(r[M+2],r[M+3]),y.set(r[M+4],r[M+5]),R.copy(S).add(T).add(b).divideScalar(3);const L=f(R);E(w,M+0,S,L),E(m,M+2,T,L),E(y,M+4,b,L)}}function E(S,T,b,R){R<0&&S.x===1&&(r[T]=S.x-1),b.x===0&&b.z===0&&(r[T]=R/2/Math.PI+.5)}function f(S){return Math.atan2(S.z,-S.x)}function p(S){return Math.atan2(-S.y,Math.sqrt(S.x*S.x+S.z*S.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new vr(e.vertices,e.indices,e.radius,e.detail)}}class _r extends vr{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new _r(e.radius,e.detail)}}class Is extends Tn{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const a=e/2,r=t/2,l=Math.floor(n),o=Math.floor(s),c=l+1,d=o+1,h=e/l,u=t/o,g=[],_=[],E=[],f=[];for(let p=0;p<d;p++){const S=p*u-r;for(let T=0;T<c;T++){const b=T*h-a;_.push(b,-S,0),E.push(0,0,1),f.push(T/l),f.push(1-p/o)}}for(let p=0;p<o;p++)for(let S=0;S<l;S++){const T=S+c*p,b=S+c*(p+1),R=S+1+c*(p+1),w=S+1+c*p;g.push(T,b,w),g.push(b,R,w)}this.setIndex(g),this.setAttribute("position",new Dt(_,3)),this.setAttribute("normal",new Dt(E,3)),this.setAttribute("uv",new Dt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.width,e.height,e.widthSegments,e.heightSegments)}}class xr extends Tn{constructor(e=1,t=.4,n=12,s=48,a=Math.PI*2,r=0,l=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:a,thetaStart:r,thetaLength:l},n=Math.floor(n),s=Math.floor(s);const o=[],c=[],d=[],h=[],u=new z,g=new z,_=new z;for(let E=0;E<=n;E++){const f=r+E/n*l;for(let p=0;p<=s;p++){const S=p/s*a;g.x=(e+t*Math.cos(f))*Math.cos(S),g.y=(e+t*Math.cos(f))*Math.sin(S),g.z=t*Math.sin(f),c.push(g.x,g.y,g.z),u.x=e*Math.cos(S),u.y=e*Math.sin(S),_.subVectors(g,u).normalize(),d.push(_.x,_.y,_.z),h.push(p/s),h.push(E/n)}}for(let E=1;E<=n;E++)for(let f=1;f<=s;f++){const p=(s+1)*E+f-1,S=(s+1)*(E-1)+f-1,T=(s+1)*(E-1)+f,b=(s+1)*E+f;o.push(p,S,b),o.push(S,T,b)}this.setIndex(o),this.setAttribute("position",new Dt(c,3)),this.setAttribute("normal",new Dt(d,3)),this.setAttribute("uv",new Dt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new xr(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(uo(s))s.isRenderTargetTexture?(Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(uo(s[0])){const a=[];for(let r=0,l=s.length;r<l;r++)a[r]=s[r].clone();e[t][n]=a}else e[t][n]=s.slice();else e[t][n]=s}}return e}function Pt(i){const e={};for(let t=0;t<i.length;t++){const n=vi(i[t]);for(const s in n)e[s]=n[s]}return e}function uo(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function md(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function vl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:We.workingColorSpace}const gd={clone:vi,merge:Pt};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Zn extends Bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vi(e.uniforms),this.uniformsGroups=md(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?t.uniforms[s]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[s]={type:"m4",value:r.toArray()}:t.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new qe().setHex(s.value);break;case"v2":this.uniforms[n].value=new Be().fromArray(s.value);break;case"v3":this.uniforms[n].value=new z().fromArray(s.value);break;case"v4":this.uniforms[n].value=new lt().fromArray(s.value);break;case"m3":this.uniforms[n].value=new De().fromArray(s.value);break;case"m4":this.uniforms[n].value=new ct().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class xd extends Zn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ho extends Bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new qe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ja,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new On,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Sd extends Bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rc,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Md extends Bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class _l extends Ct{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new qe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}const da=new ct,fo=new z,po=new z;class yd{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=Bt,this.map=null,this.mapPass=null,this.matrix=new ct,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fi,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new lt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;fo.setFromMatrixPosition(e.matrixWorld),t.position.copy(fo),po.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(po),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){da.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(da,e.coordinateSystem,e.reversedDepth);const a=this._frameExtents,r=s?s.z/a.x:1,l=s?s.w/a.y:1,o=s?s.x/a.x:0,c=s?s.y/a.y:0;e.coordinateSystem===Ui||e.reversedDepth?t.set(.5*r,0,0,.5*r+o,0,.5*l,0,.5*l+c,0,0,1,0,0,0,0,1):t.set(.5*r,0,0,.5*r+o,0,.5*l,0,.5*l+c,0,0,.5,.5,0,0,0,1),t.multiply(da)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ds=new z,us=new _i,sn=new z;class xl extends Ct{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ct,this.projectionMatrix=new ct,this.projectionMatrixInverse=new ct,this.coordinateSystem=tn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ds,us,sn),sn.x===1&&sn.y===1&&sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ds,us,sn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(ds,us,sn),sn.x===1&&sn.y===1&&sn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ds,us,sn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const In=new z,mo=new Be,go=new Be;class Qt extends xl{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Qa*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Gs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Qa*2*Math.atan(Math.tan(Gs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(In.x,In.y).multiplyScalar(-e/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(In.x,In.y).multiplyScalar(-e/In.z)}getViewSize(e,t){return this.getViewBounds(e,mo,go),t.subVectors(go,mo)}setViewOffset(e,t,n,s,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Gs*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const o=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/o,t-=r.offsetY*n/c,s*=r.width/o,n*=r.height/c}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Sl extends xl{constructor(e=-1,t=1,n=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-e,r=n+e,l=s+t,o=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,l-=d*this.view.offsetY,o=l-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,l,o,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class bd extends yd{constructor(){super(new Sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ed extends _l{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ct.DEFAULT_UP),this.updateMatrix(),this.target=new Ct,this.shadow=new bd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Td extends _l{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const li=-90,ci=1;class er extends Ct{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Qt(li,ci,e,t);s.layers=this.layers,this.add(s);const a=new Qt(li,ci,e,t);a.layers=this.layers,this.add(a);const r=new Qt(li,ci,e,t);r.layers=this.layers,this.add(r);const l=new Qt(li,ci,e,t);l.layers=this.layers,this.add(l);const o=new Qt(li,ci,e,t);o.layers=this.layers,this.add(o);const c=new Qt(li,ci,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,a,r,l,o]=t;for(const c of t)this.remove(c);if(e===tn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),o.up.set(0,1,0),o.lookAt(0,0,-1);else if(e===Ui)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),o.up.set(0,-1,0),o.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,l,o,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),g=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const E=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=E,e.setRenderTarget(n,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,g),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Ad extends Qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function vo(i,e,t,n){const s=wd(n);switch(t){case tl:return i*e;case il:return i*e/s.components*s.byteLength;case dr:return i*e/s.components*s.byteLength;case Yn:return i*e*2/s.components*s.byteLength;case ur:return i*e*2/s.components*s.byteLength;case nl:return i*e*3/s.components*s.byteLength;case cn:return i*e*4/s.components*s.byteLength;case hr:return i*e*4/s.components*s.byteLength;case ms:case gs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case vs:case _s:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ba:case Ta:return Math.max(i,16)*Math.max(e,8)/4;case ya:case Ea:return Math.max(i,8)*Math.max(e,8)/2;case Aa:case wa:case Ca:case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ra:case ys:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Da:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Na:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Ua:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Oa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case za:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Ba:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ha:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Ga:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Va:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case Wa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case $a:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Xa:case qa:case Ka:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ya:case Za:return Math.ceil(i/4)*Math.ceil(e/4)*8;case bs:case Ja:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wd(i){switch(i){case Bt:case Jo:return{byteLength:1,components:1};case Ni:case jo:case fn:return{byteLength:2,components:1};case lr:case cr:return{byteLength:2,components:4};case hn:case or:case ln:return{byteLength:4,components:1};case Qo:case el:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:rr}}));typeof window<"u"&&(window.__THREE__?Pe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=rr);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Ml(){let i=null,e=!1,t=null,n=null;function s(a,r){n=i.requestAnimationFrame(s),t(a,r)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function Rd(i){const e=new WeakMap;function t(l,o){const c=l.array,d=l.usage,h=c.byteLength,u=i.createBuffer();i.bindBuffer(o,u),i.bufferData(o,c,d),l.onUploadCallback();let g;if(c instanceof Float32Array)g=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)g=i.HALF_FLOAT;else if(c instanceof Uint16Array)l.isFloat16BufferAttribute?g=i.HALF_FLOAT:g=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)g=i.SHORT;else if(c instanceof Uint32Array)g=i.UNSIGNED_INT;else if(c instanceof Int32Array)g=i.INT;else if(c instanceof Int8Array)g=i.BYTE;else if(c instanceof Uint8Array)g=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)g=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:g,bytesPerElement:c.BYTES_PER_ELEMENT,version:l.version,size:h}}function n(l,o,c){const d=o.array,h=o.updateRanges;if(i.bindBuffer(c,l),h.length===0)i.bufferSubData(c,0,d);else{h.sort((g,_)=>g.start-_.start);let u=0;for(let g=1;g<h.length;g++){const _=h[u],E=h[g];E.start<=_.start+_.count+1?_.count=Math.max(_.count,E.start+E.count-_.start):(++u,h[u]=E)}h.length=u+1;for(let g=0,_=h.length;g<_;g++){const E=h[g];i.bufferSubData(c,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}o.clearUpdateRanges()}o.onUploadCallback()}function s(l){return l.isInterleavedBufferAttribute&&(l=l.data),e.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const o=e.get(l);o&&(i.deleteBuffer(o.buffer),e.delete(l))}function r(l,o){if(l.isInterleavedBufferAttribute&&(l=l.data),l.isGLBufferAttribute){const d=e.get(l);(!d||d.version<l.version)&&e.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}const c=e.get(l);if(c===void 0)e.set(l,t(l,o));else if(c.version<l.version){if(c.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,l,o),c.version=l.version}}return{get:s,remove:a,update:r}}var Cd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Ld=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Id=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Nd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ud=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kd=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Od=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,zd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Vd=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Wd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$d=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Kd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Yd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Jd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Qd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,eu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,nu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,su="gl_FragColor = linearToOutputTexel( gl_FragColor );",au=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ru=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,lu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,cu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,du=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,uu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,hu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,vu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,_u=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,xu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Su=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Mu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,yu=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Eu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Au=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Ru=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cu=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Lu=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Pu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Iu=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Du=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nu=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Uu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Fu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ku=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ou=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,zu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Bu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Hu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Gu=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vu=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$u=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,qu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ku=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zu=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Ju=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,ju=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,eh=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,th=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,nh=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ih=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,sh=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ah=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,rh=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,oh=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,lh=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ch=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,dh=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,uh=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,hh=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,fh=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ph=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,mh=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,gh=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vh=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,_h=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,xh=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sh=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Mh=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yh=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,bh=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Eh=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Th=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ah=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wh=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Rh=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Ch=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Lh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ph=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ih=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dh=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Uh=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Fh=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kh=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Oh=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zh=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bh=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Hh=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gh=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Vh=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wh=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$h=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xh=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,qh=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kh=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Yh=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Zh=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Jh=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jh=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Qh=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ef=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,af=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,rf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,of=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ze={alphahash_fragment:Cd,alphahash_pars_fragment:Ld,alphamap_fragment:Pd,alphamap_pars_fragment:Id,alphatest_fragment:Dd,alphatest_pars_fragment:Nd,aomap_fragment:Ud,aomap_pars_fragment:Fd,batching_pars_vertex:kd,batching_vertex:Od,begin_vertex:zd,beginnormal_vertex:Bd,bsdfs:Hd,iridescence_fragment:Gd,bumpmap_pars_fragment:Vd,clipping_planes_fragment:Wd,clipping_planes_pars_fragment:$d,clipping_planes_pars_vertex:Xd,clipping_planes_vertex:qd,color_fragment:Kd,color_pars_fragment:Yd,color_pars_vertex:Zd,color_vertex:Jd,common:jd,defaultnormal_vertex:Qd,displacementmap_pars_vertex:eu,displacementmap_vertex:tu,emissivemap_fragment:nu,emissivemap_pars_fragment:iu,colorspace_fragment:su,colorspace_pars_fragment:au,envmap_fragment:ru,envmap_common_pars_fragment:ou,envmap_pars_fragment:lu,envmap_pars_vertex:cu,envmap_physical_pars_fragment:Su,envmap_vertex:du,fog_vertex:uu,fog_pars_vertex:hu,fog_fragment:fu,fog_pars_fragment:pu,gradientmap_pars_fragment:mu,lightmap_pars_fragment:gu,lights_lambert_fragment:vu,lights_lambert_pars_fragment:_u,lights_pars_begin:xu,lights_toon_fragment:Mu,lights_toon_pars_fragment:yu,lights_phong_fragment:bu,lights_phong_pars_fragment:Eu,lights_physical_fragment:Tu,lights_physical_pars_fragment:Au,lights_fragment_begin:wu,lights_fragment_maps:Ru,lights_fragment_end:Cu,lightprobes_pars_fragment:Lu,logdepthbuf_fragment:Pu,logdepthbuf_pars_fragment:Iu,logdepthbuf_pars_vertex:Du,logdepthbuf_vertex:Nu,map_fragment:Uu,map_pars_fragment:Fu,map_particle_fragment:ku,map_particle_pars_fragment:Ou,metalnessmap_fragment:zu,metalnessmap_pars_fragment:Bu,morphinstance_vertex:Hu,morphcolor_vertex:Gu,morphnormal_vertex:Vu,morphtarget_pars_vertex:Wu,morphtarget_vertex:$u,normal_fragment_begin:Xu,normal_fragment_maps:qu,normal_pars_fragment:Ku,normal_pars_vertex:Yu,normal_vertex:Zu,normalmap_pars_fragment:Ju,clearcoat_normal_fragment_begin:ju,clearcoat_normal_fragment_maps:Qu,clearcoat_pars_fragment:eh,iridescence_pars_fragment:th,opaque_fragment:nh,packing:ih,premultiplied_alpha_fragment:sh,project_vertex:ah,dithering_fragment:rh,dithering_pars_fragment:oh,roughnessmap_fragment:lh,roughnessmap_pars_fragment:ch,shadowmap_pars_fragment:dh,shadowmap_pars_vertex:uh,shadowmap_vertex:hh,shadowmask_pars_fragment:fh,skinbase_vertex:ph,skinning_pars_vertex:mh,skinning_vertex:gh,skinnormal_vertex:vh,specularmap_fragment:_h,specularmap_pars_fragment:xh,tonemapping_fragment:Sh,tonemapping_pars_fragment:Mh,transmission_fragment:yh,transmission_pars_fragment:bh,uv_pars_fragment:Eh,uv_pars_vertex:Th,uv_vertex:Ah,worldpos_vertex:wh,background_vert:Rh,background_frag:Ch,backgroundCube_vert:Lh,backgroundCube_frag:Ph,cube_vert:Ih,cube_frag:Dh,depth_vert:Nh,depth_frag:Uh,distance_vert:Fh,distance_frag:kh,equirect_vert:Oh,equirect_frag:zh,linedashed_vert:Bh,linedashed_frag:Hh,meshbasic_vert:Gh,meshbasic_frag:Vh,meshlambert_vert:Wh,meshlambert_frag:$h,meshmatcap_vert:Xh,meshmatcap_frag:qh,meshnormal_vert:Kh,meshnormal_frag:Yh,meshphong_vert:Zh,meshphong_frag:Jh,meshphysical_vert:jh,meshphysical_frag:Qh,meshtoon_vert:ef,meshtoon_frag:tf,points_vert:nf,points_frag:sf,shadow_vert:af,shadow_frag:rf,sprite_vert:of,sprite_frag:lf},ge={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new De}},envmap:{envMap:{value:null},envMapRotation:{value:new De},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new De}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new De}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new De},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new De},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new De},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new De}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new De}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new De}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0},uvTransform:{value:new De}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new De},alphaMap:{value:null},alphaMapTransform:{value:new De},alphaTest:{value:0}}},rn={basic:{uniforms:Pt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:Pt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:Pt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:Pt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:Pt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new qe(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:Pt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:Pt([ge.points,ge.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:Pt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:Pt([ge.common,ge.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:Pt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:Pt([ge.sprite,ge.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new De},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new De}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:Pt([ge.common,ge.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:Pt([ge.lights,ge.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};rn.physical={uniforms:Pt([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new De},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new De},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new De},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new De},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new De},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new De},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new De},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new De},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new De},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new De},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new De},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new De},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new De}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const hs={r:0,b:0,g:0},cf=new ct,yl=new De;yl.set(-1,0,0,0,1,0,0,0,1);function df(i,e,t,n,s,a){const r=new qe(0);let l=s===!0?0:1,o,c,d=null,h=0,u=null;function g(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const b=S.backgroundBlurriness>0;T=e.get(T,b)}return T}function _(S){let T=!1;const b=g(S);b===null?f(r,l):b&&b.isColor&&(f(b,1),T=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?t.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(i.autoClear||T)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function E(S,T){const b=g(T);b&&b.isCubeTexture?(c===void 0&&(c=new un(new xi(1,1,1),new Zn({name:"BackgroundCubeMaterial",uniforms:vi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(R,w,m){this.matrixWorld.copyPosition(m.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cf.makeRotationFromEuler(T.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(yl),c.material.toneMapped=We.getTransfer(b.colorSpace)!==je,(d!==b||h!==b.version||u!==i.toneMapping)&&(c.material.needsUpdate=!0,d=b,h=b.version,u=i.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(o===void 0&&(o=new un(new Is(2,2),new Zn({name:"BackgroundMaterial",uniforms:vi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Kn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),o.geometry.deleteAttribute("normal"),Object.defineProperty(o.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(o)),o.material.uniforms.t2D.value=b,o.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,o.material.toneMapped=We.getTransfer(b.colorSpace)!==je,b.matrixAutoUpdate===!0&&b.updateMatrix(),o.material.uniforms.uvTransform.value.copy(b.matrix),(d!==b||h!==b.version||u!==i.toneMapping)&&(o.material.needsUpdate=!0,d=b,h=b.version,u=i.toneMapping),o.layers.enableAll(),S.unshift(o,o.geometry,o.material,0,0,null))}function f(S,T){S.getRGB(hs,vl(i)),t.buffers.color.setClear(hs.r,hs.g,hs.b,T,a)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),o!==void 0&&(o.geometry.dispose(),o.material.dispose(),o=void 0)}return{getClearColor:function(){return r},setClearColor:function(S,T=1){r.set(S),l=T,f(r,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,f(r,l)},render:_,addToRenderList:E,dispose:p}}function uf(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let a=s,r=!1;function l(L,U,W,I,V){let Q=!1;const B=h(L,I,W,U);a!==B&&(a=B,c(a.object)),Q=g(L,I,W,V),Q&&_(L,I,W,V),V!==null&&e.update(V,i.ELEMENT_ARRAY_BUFFER),(Q||r)&&(r=!1,b(L,U,W,I),V!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(V).buffer))}function o(){return i.createVertexArray()}function c(L){return i.bindVertexArray(L)}function d(L){return i.deleteVertexArray(L)}function h(L,U,W,I){const V=I.wireframe===!0;let Q=n[U.id];Q===void 0&&(Q={},n[U.id]=Q);const B=L.isInstancedMesh===!0?L.id:0;let ie=Q[B];ie===void 0&&(ie={},Q[B]=ie);let X=ie[W.id];X===void 0&&(X={},ie[W.id]=X);let ee=X[V];return ee===void 0&&(ee=u(o()),X[V]=ee),ee}function u(L){const U=[],W=[],I=[];for(let V=0;V<t;V++)U[V]=0,W[V]=0,I[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:W,attributeDivisors:I,object:L,attributes:{},index:null}}function g(L,U,W,I){const V=a.attributes,Q=U.attributes;let B=0;const ie=W.getAttributes();for(const X in ie)if(ie[X].location>=0){const te=V[X];let Ee=Q[X];if(Ee===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(Ee=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(Ee=L.instanceColor)),te===void 0||te.attribute!==Ee||Ee&&te.data!==Ee.data)return!0;B++}return a.attributesNum!==B||a.index!==I}function _(L,U,W,I){const V={},Q=U.attributes;let B=0;const ie=W.getAttributes();for(const X in ie)if(ie[X].location>=0){let te=Q[X];te===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(te=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(te=L.instanceColor));const Ee={};Ee.attribute=te,te&&te.data&&(Ee.data=te.data),V[X]=Ee,B++}a.attributes=V,a.attributesNum=B,a.index=I}function E(){const L=a.newAttributes;for(let U=0,W=L.length;U<W;U++)L[U]=0}function f(L){p(L,0)}function p(L,U){const W=a.newAttributes,I=a.enabledAttributes,V=a.attributeDivisors;W[L]=1,I[L]===0&&(i.enableVertexAttribArray(L),I[L]=1),V[L]!==U&&(i.vertexAttribDivisor(L,U),V[L]=U)}function S(){const L=a.newAttributes,U=a.enabledAttributes;for(let W=0,I=U.length;W<I;W++)U[W]!==L[W]&&(i.disableVertexAttribArray(W),U[W]=0)}function T(L,U,W,I,V,Q,B){B===!0?i.vertexAttribIPointer(L,U,W,V,Q):i.vertexAttribPointer(L,U,W,I,V,Q)}function b(L,U,W,I){E();const V=I.attributes,Q=W.getAttributes(),B=U.defaultAttributeValues;for(const ie in Q){const X=Q[ie];if(X.location>=0){let ee=V[ie];if(ee===void 0&&(ie==="instanceMatrix"&&L.instanceMatrix&&(ee=L.instanceMatrix),ie==="instanceColor"&&L.instanceColor&&(ee=L.instanceColor)),ee!==void 0){const te=ee.normalized,Ee=ee.itemSize,Ne=e.get(ee);if(Ne===void 0)continue;const Y=Ne.buffer,ve=Ne.type,Me=Ne.bytesPerElement,Re=ve===i.INT||ve===i.UNSIGNED_INT||ee.gpuType===or;if(ee.isInterleavedBufferAttribute){const _e=ee.data,Fe=_e.isInterleavedBuffer===!0?_e.stride:_e.itemSize,dt=ee.offset;if(_e.isInstancedInterleavedBuffer||_e.isInstancedBufferAttribute){for(let Le=0;Le<X.locationSize;Le++)p(X.location+Le,_e.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=_e.meshPerAttribute*_e.count)}else for(let Le=0;Le<X.locationSize;Le++)f(X.location+Le);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let Le=0;Le<X.locationSize;Le++)T(X.location+Le,Ee/X.locationSize,ve,te,Fe*Me,(dt+Ee/X.locationSize*Le)*Me,Re)}else{if(ee.isInstancedBufferAttribute){for(let _e=0;_e<X.locationSize;_e++)p(X.location+_e,ee.meshPerAttribute);L.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let _e=0;_e<X.locationSize;_e++)f(X.location+_e);i.bindBuffer(i.ARRAY_BUFFER,Y);for(let _e=0;_e<X.locationSize;_e++)T(X.location+_e,Ee/X.locationSize,ve,te,Ee*Me,Ee/X.locationSize*_e*Me,Re)}}else if(B!==void 0){const te=B[ie];if(te!==void 0)switch(te.length){case 2:i.vertexAttrib2fv(X.location,te);break;case 3:i.vertexAttrib3fv(X.location,te);break;case 4:i.vertexAttrib4fv(X.location,te);break;default:i.vertexAttrib1fv(X.location,te)}}}}S()}function R(){N();for(const L in n){const U=n[L];for(const W in U){const I=U[W];for(const V in I){const Q=I[V];for(const B in Q)d(Q[B].object),delete Q[B];delete I[V]}}delete n[L]}}function w(L){if(n[L.id]===void 0)return;const U=n[L.id];for(const W in U){const I=U[W];for(const V in I){const Q=I[V];for(const B in Q)d(Q[B].object),delete Q[B];delete I[V]}}delete n[L.id]}function m(L){for(const U in n){const W=n[U];for(const I in W){const V=W[I];if(V[L.id]===void 0)continue;const Q=V[L.id];for(const B in Q)d(Q[B].object),delete Q[B];delete V[L.id]}}}function y(L){for(const U in n){const W=n[U],I=L.isInstancedMesh===!0?L.id:0,V=W[I];if(V!==void 0){for(const Q in V){const B=V[Q];for(const ie in B)d(B[ie].object),delete B[ie];delete V[Q]}delete W[I],Object.keys(W).length===0&&delete n[U]}}}function N(){M(),r=!0,a!==s&&(a=s,c(a.object))}function M(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:l,reset:N,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:m,initAttributes:E,enableAttribute:f,disableUnusedAttributes:S}}function hf(i,e,t){let n;function s(o){n=o}function a(o,c){i.drawArrays(n,o,c),t.update(c,n,1)}function r(o,c,d){d!==0&&(i.drawArraysInstanced(n,o,c,d),t.update(c,n,d))}function l(o,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,o,0,c,0,d);let u=0;for(let g=0;g<d;g++)u+=c[g];t.update(u,n,1)}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=l}function ff(i,e,t,n){let s;function a(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const m=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(m.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(m){return!(m!==cn&&n.convert(m)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function l(m){const y=m===fn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(m!==Bt&&m!==ln&&!y&&n.convert(m)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function o(m){if(m==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";m="mediump"}return m==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=o(c);d!==c&&(Pe("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),u=t.logarithmicDepthBuffer===!0&&h===!1;t.reversedDepthBuffer===!0&&h===!1&&Pe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&h===!0&&Pe("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const g=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),S=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),T=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=i.getParameter(i.MAX_SAMPLES),w=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:o,textureFormatReadable:r,textureTypeReadable:l,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:h,maxTextures:g,maxVertexTextures:_,maxTextureSize:E,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:b,maxSamples:R,samples:w}}function pf(i){const e=this;let t=null,n=0,s=!1,a=!1;const r=new Dn,l=new De,o={value:null,needsUpdate:!1};this.uniform=o,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const g=h.length!==0||u||n!==0||s;return s=u,n=h.length,g},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,g){const _=h.clippingPlanes,E=h.clipIntersection,f=h.clipShadows,p=i.get(h);if(!s||_===null||_.length===0||a&&!f)a?d(null):c();else{const S=a?0:n,T=S*4;let b=p.clippingState||null;o.value=b,b=d(_,u,T,g);for(let R=0;R!==T;++R)b[R]=t[R];p.clippingState=b,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=S}};function c(){o.value!==t&&(o.value=t,o.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(h,u,g,_){const E=h!==null?h.length:0;let f=null;if(E!==0){if(f=o.value,_!==!0||f===null){const p=g+E*4,S=u.matrixWorldInverse;l.getNormalMatrix(S),(f===null||f.length<p)&&(f=new Float32Array(p));for(let T=0,b=g;T!==E;++T,b+=4)r.copy(h[T]).applyMatrix4(S,l),r.normal.toArray(f,b),f[b+3]=r.constant}o.value=f,o.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,f}}class Sr extends dn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new pl(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new xi(5,5,5),a=new Zn({name:"CubemapFromEquirect",uniforms:vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:kt,blending:ui});a.uniforms.tEquirect.value=t;const r=new un(s,a),l=t.minFilter;return t.minFilter===Un&&(t.minFilter=Ut),new er(1,10,this).update(e,r),t.minFilter=l,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,s);e.setRenderTarget(a)}}const _o=256,mf=3,gf=20,bl=256,El=16,vf=3,_f=new z,xf=new qe;class ws{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new er(1,10,null),this._boxMesh=new un(new xi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,a={}){const{size:r=256,position:l=_f}=a,o=this._renderer;this._setSize(r);const c=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const h=o.autoClear,u=o.autoClearColor,g=o.autoClearDepth,_=o.autoClearStencil,E=e.background;o.autoClear=!0,o.autoClearColor=!0,o.autoClearDepth=!0,o.autoClearStencil=!0,E===null&&(e.background=o.getClearColor(xf));const f=new er(n,s,d);return f.position.copy(l),f.update(o,e),o.autoClear=h,o.autoClearColor=u,o.autoClearDepth=g,o.autoClearStencil=_,e.background=E,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=So(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(_o,Gc(e))}_fromTexture(e,t){e.mapping===pi||e.mapping===Di?this._setSize(e.image.length===0?_o:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=xo(e,!1,!1),n=Math.log2(e)-mf;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=xo(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,a=this._cubeCamera;s.material=n,a.renderTarget=e,a.activeMipmapLevel=t;const r=e.width>>t;e.viewport.set(0,0,r,r),a.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===pi||e.mapping===Di?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mo()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=So()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=Sf(),this._integrationMaterial=Mf());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(t/El);for(let r=0;r<=n;r++){const l=ws.lodToRoughness(r,n);if(r>n-vf)a.roughness.value=l,this._renderCube(e,r,this._integrationMaterial);else{const o=l>0?Math.log2(t)+.5*Math.log2(6/(bl*Math.pow(l,4)))+.5:0;s.roughness.value=l,s.lodBias.value=o,this._renderCube(e,r,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=yf());const n=this._blurMaterial,s=n.uniforms,a=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=a.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(a,0,n)}}function xo(i,e,t){return new Sr(i,{minFilter:Un,generateMipmaps:e,type:fn,colorSpace:Es,depthBuffer:t})}function Hi(i,e,t){return new Zn({name:i,uniforms:e,vertexShader:ze.cube_vert,fragmentShader:t,side:kt,blending:ui,depthTest:!1,depthWrite:!1})}function Sf(){return Hi("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${bl}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Mf(){return Hi("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:El}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function yf(){return Hi("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${gf}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function So(){return Hi("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Mo(){return Hi("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function bf(i){let e=new WeakMap,t=new WeakMap,n=null;function s(u,g=!1){return u==null?null:g?r(u):a(u)}function a(u){if(u&&u.isTexture){const g=u.mapping;if(g===Os||g===zs)if(e.has(u)){const _=e.get(u).texture;return l(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const E=new Sr(_.height);return E.fromEquirectangularTexture(i,u),e.set(u,E),u.addEventListener("dispose",c),l(E.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const g=u.mapping,_=g===Os||g===zs,E=g===pi||g===Di;if(_||E){let f=t.get(u);const p=f!==void 0?f.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new ws(i)),f=_?n.fromEquirectangular(u,f):n.fromCubemap(u,f),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),f.texture;if(f!==void 0)return f.texture;{const S=u.image;return _&&S&&S.height>0||E&&S&&o(S)?(n===null&&(n=new ws(i)),f=_?n.fromEquirectangular(u):n.fromCubemap(u),f.texture.pmremVersion=u.pmremVersion,t.set(u,f),u.addEventListener("dispose",d),f.texture):null}}}return u}function l(u,g){return g===Os?u.mapping=pi:g===zs&&(u.mapping=Di),u}function o(u){let g=0;const _=6;for(let E=0;E<_;E++)u[E]!==void 0&&g++;return g===_}function c(u){const g=u.target;g.removeEventListener("dispose",c);const _=e.get(g);_!==void 0&&(e.delete(g),_.dispose())}function d(u){const g=u.target;g.removeEventListener("dispose",d);const _=t.get(g);_!==void 0&&(t.delete(g),_.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:h}}function Ef(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&xs("WebGLRenderer: "+n+" extension not supported."),s}}}function Tf(i,e,t,n){const s={},a=new WeakMap,r=new FinalizationRegistry(_=>delete s[_]);function l(_){o(_.target)}function o(_){_.index!==null&&e.remove(_.index);for(const f in _.attributes)e.remove(_.attributes[f]);_.removeEventListener("dispose",l),delete s[_.id],r.unregister(_);const E=a.get(_);E&&(e.remove(E),a.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(_,E){return s[E.id]!==void 0||(E.addEventListener("dispose",l),s[E.id]=new WeakRef(E),r.register(E,E.id,E),t.memory.geometries++),E}function d(_){const E=_.attributes;for(const f in E)e.update(E[f],i.ARRAY_BUFFER)}function h(_){const E=_.index,f=_.attributes.position;let p=0;if(f===void 0)return;const S=E!==null?E.array.length:f.array.length/3-1,T=f.count>=65535?hl:ul,b=new T(Math.ceil(S/3)*6,1),R=b.array;if(E!==null){const m=E.array;p=E.version;for(let y=0,N=0;y<S;y+=3){const M=m[y+0],L=m[y+1],U=m[y+2];R[N++]=M,R[N++]=L,R[N++]=L,R[N++]=U,R[N++]=U,R[N++]=M}}else{p=f.version;for(let m=0,y=0;m<S;m+=3){const N=m+0,M=m+1,L=m+2;R[y++]=N,R[y++]=M,R[y++]=M,R[y++]=L,R[y++]=L,R[y++]=N}}b.version=p;const w=a.get(_);w&&e.remove(w),a.set(_,b)}function u(_){const E=a.get(_);if(E){const f=_.index;f!==null&&E.version<f.version&&h(_)}else h(_);return a.get(_)}function g(){for(const _ in s){const E=s[_].deref();E!==void 0&&o(E)}}return{get:c,update:d,getWireframeAttribute:u,dispose:g}}function Af(i,e,t){let n;function s(h){n=h}let a,r;function l(h){a=h.type,r=h.bytesPerElement}function o(h,u){i.drawElements(n,u,a,h*r),t.update(u,n,1)}function c(h,u,g){g!==0&&(i.drawElementsInstanced(n,u,a,h*r,g),t.update(u,n,g))}function d(h,u,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,a,h,0,g);let E=0;for(let f=0;f<g;f++)E+=u[f];t.update(E,n,1)}this.setMode=s,this.setIndex=l,this.render=o,this.renderInstances=c,this.renderMultiDraw=d}function wf(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,l){switch(t.calls++,r){case i.TRIANGLES:t.triangles+=l*(a/3);break;case i.LINES:t.lines+=l*(a/2);break;case i.LINE_STRIP:t.lines+=l*(a-1);break;case i.LINE_LOOP:t.lines+=l*a;break;case i.POINTS:t.points+=l*a;break;default:Ye("WebGLInfo: Unknown draw mode:",r);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function Rf(i,e,t){const n=new WeakMap,s=new lt;function a(r,l,o){const c=r.morphTargetInfluences,d=l.morphAttributes.position||l.morphAttributes.normal||l.morphAttributes.color,h=d!==void 0?d.length:0;let u=n.get(l);if(u===void 0||u.count!==h){let M=function(){y.dispose(),n.delete(l),l.removeEventListener("dispose",M)};var g=M;u!==void 0&&u.texture.dispose();const _=l.morphAttributes.position!==void 0,E=l.morphAttributes.normal!==void 0,f=l.morphAttributes.color!==void 0,p=l.morphAttributes.position||[],S=l.morphAttributes.normal||[],T=l.morphAttributes.color||[];let b=0;_===!0&&(b=1),E===!0&&(b=2),f===!0&&(b=3);let R=l.attributes.position.count*b,w=1;R>e.maxTextureSize&&(w=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const m=new Float32Array(R*w*4*h),y=new ll(m,R,w,h);y.type=ln,y.needsUpdate=!0;const N=b*4;for(let L=0;L<h;L++){const U=p[L],W=S[L],I=T[L],V=R*w*4*L;for(let Q=0;Q<U.count;Q++){const B=Q*N;_===!0&&(s.fromBufferAttribute(U,Q),m[V+B+0]=s.x,m[V+B+1]=s.y,m[V+B+2]=s.z,m[V+B+3]=0),E===!0&&(s.fromBufferAttribute(W,Q),m[V+B+4]=s.x,m[V+B+5]=s.y,m[V+B+6]=s.z,m[V+B+7]=0),f===!0&&(s.fromBufferAttribute(I,Q),m[V+B+8]=s.x,m[V+B+9]=s.y,m[V+B+10]=s.z,m[V+B+11]=I.itemSize===4?s.w:1)}}u={count:h,texture:y,size:new Be(R,w)},n.set(l,u),l.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)o.getUniforms().setValue(i,"morphTexture",r.morphTexture,t);else{let _=0;for(let f=0;f<c.length;f++)_+=c[f];const E=l.morphTargetsRelative?1:1-_;o.getUniforms().setValue(i,"morphTargetBaseInfluence",E),o.getUniforms().setValue(i,"morphTargetInfluences",c)}o.getUniforms().setValue(i,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:a}}function Cf(i,e,t,n,s){let a=new WeakMap;function r(c){const d=s.render.frame,h=c.geometry,u=e.get(c,h);if(a.get(u)!==d&&(e.update(u),a.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),a.get(c)!==d&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){const g=c.skeleton;a.get(g)!==d&&(g.update(),a.set(g,d))}return u}function l(){a=new WeakMap}function o(c){const d=c.target;d.removeEventListener("dispose",o),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:r,dispose:l}}const Lf={[Vo]:"LINEAR_TONE_MAPPING",[Wo]:"REINHARD_TONE_MAPPING",[$o]:"CINEON_TONE_MAPPING",[Xo]:"ACES_FILMIC_TONE_MAPPING",[Ko]:"AGX_TONE_MAPPING",[Yo]:"NEUTRAL_TONE_MAPPING",[qo]:"CUSTOM_TONE_MAPPING"};function Pf(i,e,t,n,s,a){const r=new dn(e,t,{type:i,depthBuffer:s,stencilBuffer:a,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let l=null,o=null,c=null;const d=new Tn;d.setAttribute("position",new Dt([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new Dt([0,2,0,0,2,0],2));const h=new xd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new un(d,h),g=new Sl(-1,1,1,-1,0,1);let _=null,E=null,f=!1,p,S=null,T=[],b=!1;this.setSize=function(R,w){r.setSize(R,w),l!==null&&l.setSize(R,w),o!==null&&o.setSize(R,w);for(let m=0;m<T.length;m++){const y=T[m];y.setSize&&y.setSize(R,w)}},this.setEffects=function(R){T=R,b=T.length>0&&T[0].isRenderPass===!0;const w=r.width,m=r.height;T.length>0&&l===null&&(l=new dn(w,m,{type:fn,depthBuffer:!1,stencilBuffer:!1}),o=new dn(w,m,{type:fn,depthBuffer:!1,stencilBuffer:!1}));const y=s===!0&&T.some(N=>N.needsDepthTexture===!0);y!==(r.depthTexture!==null)&&(y===!0&&c===null&&(c=new gi(w,m),a===!0&&(c.format=Fn,c.type=mi)),r.dispose(),r.depthTexture=y?c:null,r.resolveDepthBuffer=y,r.storeMultisampledDepthBuffer=y);for(let N=0;N<T.length;N++){const M=T[N];M.setSize&&M.setSize(w,m),y&&M.needsDepthTexture===!0&&M.setDepthTexture&&M.setDepthTexture(c)}},this.begin=function(R,w){if(f||R.toneMapping===bn&&T.length===0)return!1;if(S=w,w!==null){const m=w.width,y=w.height;(r.width!==m||r.height!==y)&&this.setSize(m,y)}return b===!1&&R.setRenderTarget(r),p=R.toneMapping,R.toneMapping=bn,!0},this.hasRenderPass=function(){return b},this.end=function(R,w){R.toneMapping=p,f=!0;let m=r,y=l;for(let N=0;N<T.length;N++){const M=T[N];M.enabled!==!1&&(M.render(R,y,m,w),M.needsSwap!==!1&&(m=y,y=y===l?o:l))}if(_!==R.outputColorSpace||E!==R.toneMapping){_=R.outputColorSpace,E=R.toneMapping,h.defines={},We.getTransfer(_)===je&&(h.defines.SRGB_TRANSFER="");const N=Lf[E];N&&(h.defines[N]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=m.texture,R.setRenderTarget(S),R.render(u,g),S=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),l!==null&&l.dispose(),o!==null&&o.dispose(),d.dispose(),h.dispose()}}const Tl=new It,Al=new gi(1,1),wl=new ml(1),Rl=new ll,Cl=new Zc,Ll=new pl,yo=[],bo=[],Eo=new Float32Array(16),To=new Float32Array(9),Ao=new Float32Array(4);function Si(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let a=yo[s];if(a===void 0&&(a=new Float32Array(s),yo[s]=a),e!==0){n.toArray(a,0);for(let r=1,l=0;r!==e;++r)l+=t,i[r].toArray(a,l)}return a}function mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function gt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ds(i,e){let t=bo[e];t===void 0&&(t=new Int32Array(e),bo[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function If(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Df(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2fv(this.addr,e),gt(t,e)}}function Nf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(mt(t,e))return;i.uniform3fv(this.addr,e),gt(t,e)}}function Uf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4fv(this.addr,e),gt(t,e)}}function Ff(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Ao.set(n),i.uniformMatrix2fv(this.addr,!1,Ao),gt(t,n)}}function kf(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;To.set(n),i.uniformMatrix3fv(this.addr,!1,To),gt(t,n)}}function Of(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),gt(t,e)}else{if(mt(t,n))return;Eo.set(n),i.uniformMatrix4fv(this.addr,!1,Eo),gt(t,n)}}function zf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Bf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2iv(this.addr,e),gt(t,e)}}function Hf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3iv(this.addr,e),gt(t,e)}}function Gf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4iv(this.addr,e),gt(t,e)}}function Vf(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Wf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(mt(t,e))return;i.uniform2uiv(this.addr,e),gt(t,e)}}function $f(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(mt(t,e))return;i.uniform3uiv(this.addr,e),gt(t,e)}}function Xf(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(mt(t,e))return;i.uniform4uiv(this.addr,e),gt(t,e)}}function Ns(i){return i.version===0&&(i.compareFunction=rl,i.needsUpdate=!0),i}function qf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?a=Ns(Al):a=Tl,t.setTexture2D(e||a,s)}function Kf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Cl,s)}function Yf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Ns(wl):a=Ll,t.setTextureCube(e||a,s)}function Zf(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Rl,s)}function Jf(i){switch(i){case 5126:return If;case 35664:return Df;case 35665:return Nf;case 35666:return Uf;case 35674:return Ff;case 35675:return kf;case 35676:return Of;case 5124:case 35670:return zf;case 35667:case 35671:return Bf;case 35668:case 35672:return Hf;case 35669:case 35673:return Gf;case 5125:return Vf;case 36294:return Wf;case 36295:return $f;case 36296:return Xf;case 35678:case 36198:case 36298:case 36306:case 35682:return qf;case 35679:case 36299:case 36307:return Kf;case 35680:case 36300:case 36308:case 36293:return Yf;case 36289:case 36303:case 36311:case 36292:return Zf}}function jf(i,e){i.uniform1fv(this.addr,e)}function Qf(i,e){const t=Si(e,this.size,2);i.uniform2fv(this.addr,t)}function ep(i,e){const t=Si(e,this.size,3);i.uniform3fv(this.addr,t)}function tp(i,e){const t=Si(e,this.size,4);i.uniform4fv(this.addr,t)}function np(i,e){const t=Si(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function ip(i,e){const t=Si(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function sp(i,e){const t=Si(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function ap(i,e){i.uniform1iv(this.addr,e)}function rp(i,e){i.uniform2iv(this.addr,e)}function op(i,e){i.uniform3iv(this.addr,e)}function lp(i,e){i.uniform4iv(this.addr,e)}function cp(i,e){i.uniform1uiv(this.addr,e)}function dp(i,e){i.uniform2uiv(this.addr,e)}function up(i,e){i.uniform3uiv(this.addr,e)}function hp(i,e){i.uniform4uiv(this.addr,e)}function fp(i,e,t){const n=this.cache,s=e.length,a=Ds(t,s);mt(n,a)||(i.uniform1iv(this.addr,a),gt(n,a));let r;this.type===i.SAMPLER_2D_SHADOW?r=Ns(Al):r=Tl;for(let l=0;l!==s;++l)t.setTexture2D(e[l]||r,a[l])}function pp(i,e,t){const n=this.cache,s=e.length,a=Ds(t,s);mt(n,a)||(i.uniform1iv(this.addr,a),gt(n,a));for(let r=0;r!==s;++r)t.setTexture3D(e[r]||Cl,a[r])}function mp(i,e,t){const n=this.cache,s=e.length,a=Ds(t,s);mt(n,a)||(i.uniform1iv(this.addr,a),gt(n,a));let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Ns(wl):r=Ll;for(let l=0;l!==s;++l)t.setTextureCube(e[l]||r,a[l])}function gp(i,e,t){const n=this.cache,s=e.length,a=Ds(t,s);mt(n,a)||(i.uniform1iv(this.addr,a),gt(n,a));for(let r=0;r!==s;++r)t.setTexture2DArray(e[r]||Rl,a[r])}function vp(i){switch(i){case 5126:return jf;case 35664:return Qf;case 35665:return ep;case 35666:return tp;case 35674:return np;case 35675:return ip;case 35676:return sp;case 5124:case 35670:return ap;case 35667:case 35671:return rp;case 35668:case 35672:return op;case 35669:case 35673:return lp;case 5125:return cp;case 36294:return dp;case 36295:return up;case 36296:return hp;case 35678:case 36198:case 36298:case 36306:case 35682:return fp;case 35679:case 36299:case 36307:return pp;case 35680:case 36300:case 36308:case 36293:return mp;case 36289:case 36303:case 36311:case 36292:return gp}}class _p{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Jf(t.type)}}class xp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=vp(t.type)}}class Sp{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const l=s[a];l.setValue(e,t[l.id],n)}}}const ua=/(\w+)(\])?(\[|\.)?/g;function wo(i,e){i.seq.push(e),i.map[e.id]=e}function Mp(i,e,t){const n=i.name,s=n.length;for(ua.lastIndex=0;;){const a=ua.exec(n),r=ua.lastIndex;let l=a[1];const o=a[2]==="]",c=a[3];if(o&&(l=l|0),c===void 0||c==="["&&r+2===s){wo(t,c===void 0?new _p(l,i,e):new xp(l,i,e));break}else{let h=t.map[l];h===void 0&&(h=new Sp(l),wo(t,h)),t=h}}}class Ss{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const l=e.getActiveUniform(t,r),o=e.getUniformLocation(t,l.name);Mp(l,o,this)}const s=[],a=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(r):a.push(r);s.length>0&&(this.seq=s.concat(a))}setValue(e,t,n,s){const a=this.map[t];a!==void 0&&a.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let a=0,r=t.length;a!==r;++a){const l=t[a],o=n[l.id];o.needsUpdate!==!1&&l.setValue(e,o.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,a=e.length;s!==a;++s){const r=e[s];r.id in t&&n.push(r)}return n}}function Ro(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const yp=37297;let bp=0;function Ep(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=s;r<a;r++){const l=r+1;n.push(`${l===e?">":" "} ${l}: ${t[r]}`)}return n.join(`
`)}const Co=new De;function Tp(i){We._getMatrix(Co,We.workingColorSpace,i);const e=`mat3( ${Co.elements.map(t=>t.toFixed(4))} )`;switch(We.getTransfer(i)){case Ts:return[e,"LinearTransferOETF"];case je:return[e,"sRGBTransferOETF"];default:return Pe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Lo(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),a=(i.getShaderInfoLog(e)||"").trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const l=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+Ep(i.getShaderSource(e),l)}else return a}function Ap(i,e){const t=Tp(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const wp={[Vo]:"Linear",[Wo]:"Reinhard",[$o]:"Cineon",[Xo]:"ACESFilmic",[Ko]:"AgX",[Yo]:"Neutral",[qo]:"Custom"};function Rp(i,e){const t=wp[e];return t===void 0?(Pe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const fs=new z;function Cp(){We.getLuminanceCoefficients(fs);const i=fs.x.toFixed(4),e=fs.y.toFixed(4),t=fs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lp(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Li).join(`
`)}function Pp(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Ip(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(e,s),r=a.name;let l=1;a.type===i.FLOAT_MAT2&&(l=2),a.type===i.FLOAT_MAT3&&(l=3),a.type===i.FLOAT_MAT4&&(l=4),t[r]={type:a.type,location:i.getAttribLocation(e,r),locationSize:l}}return t}function Li(i){return i!==""}function Po(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Io(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Dp=/^[ \t]*#include +<([\w\d./]+)>/gm;function tr(i){return i.replace(Dp,Np)}function Np(i,e){const t=ze[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return tr(t)}const Up=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Do(i){return i.replace(Up,Fp)}function Fp(i,e,t,n){let s="";for(let a=parseInt(e);a<parseInt(t);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function No(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const kp={[ps]:"SHADOWMAP_TYPE_PCF",[Ri]:"SHADOWMAP_TYPE_VSM"};function Op(i){return kp[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const zp={[Di]:"ENVMAP_MODE_REFRACTION"};function Bp(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":zp[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Hp={[Go]:"ENVMAP_BLENDING_MULTIPLY",[Tc]:"ENVMAP_BLENDING_MIX",[Ac]:"ENVMAP_BLENDING_ADD"};function Gp(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Hp[i.combine]||"ENVMAP_BLENDING_NONE"}function Vp(i,e,t,n){const s=i.getContext(),a=t.defines;let r=t.vertexShader,l=t.fragmentShader;const o=Op(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=Bp(t),h=Gp(t),u=Lp(t),g=Pp(a),_=s.createProgram();let E,f,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(E=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Li).join(`
`),E.length>0&&(E+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Li).join(`
`),f.length>0&&(f+=`
`)):(E=[No(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Li).join(`
`),f=[No(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+o:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==bn?"#define TONE_MAPPING":"",t.toneMapping!==bn?ze.tonemapping_pars_fragment:"",t.toneMapping!==bn?Rp("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,Ap("linearToOutputTexel",t.outputColorSpace),Cp(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Li).join(`
`)),r=tr(r),r=Po(r,t),r=Io(r,t),l=tr(l),l=Po(l,t),l=Io(l,t),r=Do(r),l=Do(l),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,E=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+E,f=["#define varying in",t.glslVersion===Xr?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=p+E+r,T=p+f+l,b=Ro(s,s.VERTEX_SHADER,S),R=Ro(s,s.FRAGMENT_SHADER,T);s.attachShader(_,b),s.attachShader(_,R),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function w(M){if(i.debug.checkShaderErrors){const L=s.getProgramInfoLog(_)||"",U=s.getShaderInfoLog(b)||"",W=s.getShaderInfoLog(R)||"",I=L.trim(),V=U.trim(),Q=W.trim();let B=!0,ie=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,R);else{const X=Lo(s,b,"vertex"),ee=Lo(s,R,"fragment");Ye("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+I+`
`+X+`
`+ee)}else I!==""?Pe("WebGLProgram: Program Info Log:",I):(V===""||Q==="")&&(ie=!1);ie&&(M.diagnostics={runnable:B,programLog:I,vertexShader:{log:V,prefix:E},fragmentShader:{log:Q,prefix:f}})}s.deleteShader(b),s.deleteShader(R),m=new Ss(s,_),y=Ip(s,_)}let m;this.getUniforms=function(){return m===void 0&&w(this),m};let y;this.getAttributes=function(){return y===void 0&&w(this),y};let N=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=s.getProgramParameter(_,yp)),N},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=bp++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=R,this}let Wp=0;class $p{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Xp(e),t.set(e,n)),n}}class Xp{constructor(e){this.id=Wp++,this.code=e,this.usedTimes=0}}function qp(i){return i===Yn||i===ys||i===bs}function Kp(i,e,t,n,s,a){const r=new cl,l=new $p,o=new Set,c=[],d=new Map,h=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(m){return o.add(m),m===0?"uv":`uv${m}`}function _(m,y,N,M,L,U){const W=M.fog,I=L.geometry,V=m.isMeshStandardMaterial||m.isMeshLambertMaterial||m.isMeshPhongMaterial?M.environment:null,Q=m.isMeshStandardMaterial||m.isMeshLambertMaterial&&!m.envMap||m.isMeshPhongMaterial&&!m.envMap,B=e.get(m.envMap||V,Q),ie=u[m.type];let X=n.precision;m.precision!==null&&(X=n.getMaxPrecision(m.precision),X!==m.precision&&Pe("WebGLProgram.getParameters:",m.precision,"not supported, using",X,"instead."));const ee=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,te=ee!==void 0?ee.length:0;let Ee=0;I.morphAttributes.position!==void 0&&(Ee=1),I.morphAttributes.normal!==void 0&&(Ee=2),I.morphAttributes.color!==void 0&&(Ee=3);let Ne,Y,ve,Me;if(ie){const me=rn[ie];Ne=me.vertexShader,Y=me.fragmentShader}else{Ne=m.vertexShader,Y=m.fragmentShader;const me=l.getVertexShaderStage(m),Je=l.getFragmentShaderStage(m);l.update(m,me,Je),ve=me.id,Me=Je.id}const Re=i.getRenderTarget(),_e=i.state.buffers.depth.getReversed(),Fe=L.isInstancedMesh===!0,dt=L.isBatchedMesh===!0,Le=!!m.map,Ze=!!m.matcap,Qe=!!B,He=Qe&&B.isPMREMTexture===!0,yt=!!m.aoMap,ft=!!m.lightMap,Nt=!!m.bumpMap&&m.wireframe===!1,rt=!!m.normalMap,nn=!!m.displacementMap,vt=!!m.emissiveMap,Ht=!!m.metalnessMap,Gt=!!m.roughnessMap,Vt=m.anisotropy>0,D=m.clearcoat>0,Wt=m.diffuseRoughness>0,it=m.dispersion>0,st=m.retroreflectivity>0,pe=m.iridescence>0,pt=m.sheen>0,Ce=m.transmission>0,Ie=Vt&&!!m.anisotropyMap,A=D&&!!m.clearcoatMap,v=D&&!!m.clearcoatNormalMap,k=D&&!!m.clearcoatRoughnessMap,ne=Wt&&!!m.diffuseRoughnessMap,J=pe&&!!m.iridescenceMap,re=pe&&!!m.iridescenceThicknessMap,ue=pt&&!!m.sheenColorMap,q=pt&&!!m.sheenRoughnessMap,K=!!m.specularMap,le=!!m.specularColorMap,C=!!m.specularIntensityMap,Z=Ce&&!!m.transmissionMap,$=Ce&&!!m.thicknessMap,ce=!!m.gradientMap,ae=!!m.alphaMap,oe=m.alphaTest>0,Ae=!!m.alphaHash,Oe=!!m.extensions;let se=bn;m.toneMapped&&(Re===null||Re.isXRRenderTarget===!0)&&(se=i.toneMapping);const we=He?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,ke={shaderID:ie,shaderType:m.type,shaderName:m.name,vertexShader:Ne,fragmentShader:Y,defines:m.defines,customVertexShaderID:ve,customFragmentShaderID:Me,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:X,batching:dt,batchingColor:dt&&L._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&L.instanceColor!==null,instancingMorph:Fe&&L.morphTexture!==null,outputColorSpace:Re===null?i.outputColorSpace:Re.isXRRenderTarget===!0?Re.texture.colorSpace:We.workingColorSpace,alphaToCoverage:!!m.alphaToCoverage,map:Le,matcap:Ze,envMap:Qe,envMapMode:Qe&&B.mapping,envMapPMREM:He,envMapMaxLod:He?we.length-1:null,envMapSize:He?we[0].width:null,aoMap:yt,lightMap:ft,bumpMap:Nt,normalMap:rt,displacementMap:nn,emissiveMap:vt,normalMapObjectSpace:rt&&m.normalMapType===Cc,normalMapTangentSpace:rt&&m.normalMapType===ja,packedNormalMap:rt&&m.normalMapType===ja&&qp(m.normalMap.format),metalnessMap:Ht,roughnessMap:Gt,anisotropy:Vt,anisotropyMap:Ie,clearcoat:D,clearcoatMap:A,clearcoatNormalMap:v,clearcoatRoughnessMap:k,diffuseRoughness:Wt,diffuseRoughnessMap:ne,dispersion:it,retroreflection:st,iridescence:pe,iridescenceMap:J,iridescenceThicknessMap:re,sheen:pt,sheenColorMap:ue,sheenRoughnessMap:q,specularMap:K,specularColorMap:le,specularIntensityMap:C,transmission:Ce,transmissionMap:Z,thicknessMap:$,gradientMap:ce,opaque:m.transparent===!1&&m.blending===Pi&&m.alphaToCoverage===!1,alphaMap:ae,alphaTest:oe,alphaHash:Ae,combine:m.combine,mapUv:Le&&g(m.map.channel),aoMapUv:yt&&g(m.aoMap.channel),lightMapUv:ft&&g(m.lightMap.channel),bumpMapUv:Nt&&g(m.bumpMap.channel),normalMapUv:rt&&g(m.normalMap.channel),displacementMapUv:nn&&g(m.displacementMap.channel),emissiveMapUv:vt&&g(m.emissiveMap.channel),metalnessMapUv:Ht&&g(m.metalnessMap.channel),roughnessMapUv:Gt&&g(m.roughnessMap.channel),anisotropyMapUv:Ie&&g(m.anisotropyMap.channel),clearcoatMapUv:A&&g(m.clearcoatMap.channel),clearcoatNormalMapUv:v&&g(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:k&&g(m.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ne&&g(m.diffuseRoughnessMap.channel),iridescenceMapUv:J&&g(m.iridescenceMap.channel),iridescenceThicknessMapUv:re&&g(m.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(m.sheenColorMap.channel),sheenRoughnessMapUv:q&&g(m.sheenRoughnessMap.channel),specularMapUv:K&&g(m.specularMap.channel),specularColorMapUv:le&&g(m.specularColorMap.channel),specularIntensityMapUv:C&&g(m.specularIntensityMap.channel),transmissionMapUv:Z&&g(m.transmissionMap.channel),thicknessMapUv:$&&g(m.thicknessMap.channel),alphaMapUv:ae&&g(m.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(rt||Vt),vertexNormals:!!I.attributes.normal,vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!I.attributes.uv&&(Le||ae),fog:!!W,useFog:m.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:m.wireframe===!1&&(m.flatShading===!0||I.attributes.normal===void 0&&rt===!1&&(m.isMeshLambertMaterial||m.isMeshPhongMaterial||m.isMeshStandardMaterial||m.isMeshPhysicalMaterial)),sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:_e,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:te,morphTextureStride:Ee,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:U.filter(me=>me.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:i.shadowMap.enabled&&N.length>0,shadowMapType:i.shadowMap.type,toneMapping:se,decodeVideoTexture:Le&&m.map.isVideoTexture===!0&&We.getTransfer(m.map.colorSpace)===je,decodeVideoTextureEmissive:vt&&m.emissiveMap.isVideoTexture===!0&&We.getTransfer(m.emissiveMap.colorSpace)===je,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===Sn,flipSided:m.side===kt,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:Oe&&m.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Oe&&m.extensions.multiDraw===!0||dt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return ke.vertexUv1s=o.has(1),ke.vertexUv2s=o.has(2),ke.vertexUv3s=o.has(3),o.clear(),ke}function E(m){const y=[];if(m.shaderID?y.push(m.shaderID):(y.push(m.customVertexShaderID),y.push(m.customFragmentShaderID)),m.defines!==void 0)for(const N in m.defines)y.push(N),y.push(m.defines[N]);return m.isRawShaderMaterial===!1&&(f(y,m),p(y,m),y.push(i.outputColorSpace)),y.push(m.customProgramCacheKey),y.join()}function f(m,y){m.push(y.precision),m.push(y.outputColorSpace),m.push(y.envMapMode),m.push(y.envMapPMREM),m.push(y.envMapMaxLod),m.push(y.envMapSize),m.push(y.mapUv),m.push(y.alphaMapUv),m.push(y.lightMapUv),m.push(y.aoMapUv),m.push(y.bumpMapUv),m.push(y.normalMapUv),m.push(y.displacementMapUv),m.push(y.emissiveMapUv),m.push(y.metalnessMapUv),m.push(y.roughnessMapUv),m.push(y.anisotropyMapUv),m.push(y.clearcoatMapUv),m.push(y.clearcoatNormalMapUv),m.push(y.clearcoatRoughnessMapUv),m.push(y.diffuseRoughnessMapUv),m.push(y.iridescenceMapUv),m.push(y.iridescenceThicknessMapUv),m.push(y.sheenColorMapUv),m.push(y.sheenRoughnessMapUv),m.push(y.specularMapUv),m.push(y.specularColorMapUv),m.push(y.specularIntensityMapUv),m.push(y.transmissionMapUv),m.push(y.thicknessMapUv),m.push(y.combine),m.push(y.fogExp2),m.push(y.sizeAttenuation),m.push(y.morphTargetsCount),m.push(y.numSunLights),m.push(y.numDirLights),m.push(y.numPointLights),m.push(y.numSpotLights),m.push(y.numSpotLightMaps),m.push(y.numHemiLights),m.push(y.numRectAreaLights),m.push(y.numSunLightShadows),m.push(y.numDirLightShadows),m.push(y.numPointLightShadows),m.push(y.numSpotLightShadows),m.push(y.numSpotLightShadowsWithMaps),m.push(y.numLightProbes),m.push(y.numLightProbeGrids),m.push(y.shadowMapType),m.push(y.toneMapping),m.push(y.numClippingPlanes),m.push(y.numClipIntersection),m.push(y.depthPacking)}function p(m,y){r.disableAll(),y.instancing&&r.enable(0),y.instancingColor&&r.enable(1),y.instancingMorph&&r.enable(2),y.matcap&&r.enable(3),y.envMap&&r.enable(4),y.normalMapObjectSpace&&r.enable(5),y.normalMapTangentSpace&&r.enable(6),y.clearcoat&&r.enable(7),y.iridescence&&r.enable(8),y.alphaTest&&r.enable(9),y.vertexColors&&r.enable(10),y.vertexAlphas&&r.enable(11),y.vertexUv1s&&r.enable(12),y.vertexUv2s&&r.enable(13),y.vertexUv3s&&r.enable(14),y.vertexTangents&&r.enable(15),y.anisotropy&&r.enable(16),y.alphaHash&&r.enable(17),y.batching&&r.enable(18),y.dispersion&&r.enable(19),y.retroreflection&&r.enable(24),y.diffuseRoughness&&r.enable(25),y.batchingColor&&r.enable(20),y.gradientMap&&r.enable(21),y.packedNormalMap&&r.enable(22),y.vertexNormals&&r.enable(23),m.push(r.mask),r.disableAll(),y.fog&&r.enable(0),y.useFog&&r.enable(1),y.flatShading&&r.enable(2),y.logarithmicDepthBuffer&&r.enable(3),y.reversedDepthBuffer&&r.enable(4),y.skinning&&r.enable(5),y.morphTargets&&r.enable(6),y.morphNormals&&r.enable(7),y.morphColors&&r.enable(8),y.premultipliedAlpha&&r.enable(9),y.shadowMapEnabled&&r.enable(10),y.doubleSided&&r.enable(11),y.flipSided&&r.enable(12),y.useDepthPacking&&r.enable(13),y.dithering&&r.enable(14),y.transmission&&r.enable(15),y.sheen&&r.enable(16),y.opaque&&r.enable(17),y.pointsUvs&&r.enable(18),y.decodeVideoTexture&&r.enable(19),y.decodeVideoTextureEmissive&&r.enable(20),y.alphaToCoverage&&r.enable(21),y.numLightProbeGrids>0&&r.enable(22),y.hasPositionAttribute&&r.enable(23),m.push(r.mask)}function S(m){const y=u[m.type];let N;if(y){const M=rn[y];N=gd.clone(M.uniforms)}else N=m.uniforms;return N}function T(m,y){let N=d.get(y);return N!==void 0?++N.usedTimes:(N=new Vp(i,y,m,s),c.push(N),d.set(y,N)),N}function b(m){if(--m.usedTimes===0){const y=c.indexOf(m);c[y]=c[c.length-1],c.pop(),d.delete(m.cacheKey),m.destroy()}}function R(m){l.remove(m)}function w(){l.dispose()}return{getParameters:_,getProgramCacheKey:E,getUniforms:S,acquireProgram:T,releaseProgram:b,releaseShaderCache:R,programs:c,dispose:w}}function Yp(){let i=new WeakMap;function e(r){return i.has(r)}function t(r){let l=i.get(r);return l===void 0&&(l={},i.set(r,l)),l}function n(r){i.delete(r)}function s(r,l,o){i.get(r)[l]=o}function a(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:a}}function Zp(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Uo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Fo(){const i=[];let e=0;const t=[],n=[],s=[];function a(){e=0,t.length=0,n.length=0,s.length=0}function r(u){let g=0;return u.isInstancedMesh&&(g+=2),u.isSkinnedMesh&&(g+=1),g}function l(u,g,_,E,f,p){let S=i[e];return S===void 0?(S={id:u.id,object:u,geometry:g,material:_,materialVariant:r(u),groupOrder:E,renderOrder:u.renderOrder,z:f,group:p},i[e]=S):(S.id=u.id,S.object=u,S.geometry=g,S.material=_,S.materialVariant=r(u),S.groupOrder=E,S.renderOrder=u.renderOrder,S.z=f,S.group=p),e++,S}function o(u,g,_,E,f,p,S){S.reversedDepth===!0&&(f=-f);const T=l(u,g,_,E,f,p);_.transmission>0?n.push(T):_.transparent===!0?s.push(T):t.push(T)}function c(u,g,_,E,f,p){const S=l(u,g,_,E,f,p);_.transmission>0?n.unshift(S):_.transparent===!0?s.unshift(S):t.unshift(S)}function d(u,g){t.length>1&&t.sort(u||Zp),n.length>1&&n.sort(g||Uo),s.length>1&&s.sort(g||Uo)}function h(){for(let u=e,g=i.length;u<g;u++){const _=i[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:a,push:o,unshift:c,finish:h,sort:d}}function Jp(){let i=new WeakMap;function e(n,s){const a=i.get(n);let r;return a===void 0?(r=new Fo,i.set(n,[r])):s>=a.length?(r=new Fo,a.push(r)):r=a[s],r}function t(){i=new WeakMap}return{get:e,dispose:t}}function jp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new z,color:new qe};break;case"SpotLight":t={position:new z,direction:new z,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new z,color:new qe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new z,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":t={color:new qe,position:new z,halfWidth:new z,halfHeight:new z};break}return i[e.id]=t,t}}}function Qp(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let em=0;function tm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function nm(i){const e=new jp,t=Qp(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new z);const s=new z,a=new ct,r=new ct;function l(c){let d=0,h=0,u=0;for(let U=0;U<9;U++)n.probe[U].set(0,0,0);let g=0,_=0,E=0,f=0,p=0,S=0,T=0,b=0,R=0,w=0,m=0,y=0,N=0,M=0;c.sort(tm);for(let U=0,W=c.length;U<W;U++){const I=c[U],V=I.color,Q=I.intensity,B=I.distance;let ie=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Yn?ie=I.shadow.map.texture:ie=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)d+=V.r*Q,h+=V.g*Q,u+=V.b*Q;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],Q);M++}else if(I.isSunLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,te=t.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[_]=te,n.sunShadowMap[_]=ie;const Ee=ee.getViewportCount();for(let Ne=0;Ne<Ee;Ne++)n.sunShadowMatrix[E+Ne]=ee.getMatrix(Ne),n.sunShadowCascade[E+Ne]=ee._cascadeData[Ne];E+=Ee,_++}n.sun[g]=X,g++}else if(I.isDirectionalLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const ee=I.shadow,te=t.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,n.directionalShadow[f]=te,n.directionalShadowMap[f]=ie,n.directionalShadowMatrix[f]=I.shadow.matrix,R++}n.directional[f]=X,f++}else if(I.isSpotLight){const X=e.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(V).multiplyScalar(Q),X.distance=B,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[S]=X;const ee=I.shadow;if(I.map&&(n.spotLightMap[y]=I.map,y++,ee.updateMatrices(I),I.castShadow&&N++),n.spotLightMatrix[S]=ee.matrix,I.castShadow){const te=t.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,n.spotShadow[S]=te,n.spotShadowMap[S]=ie,m++}S++}else if(I.isRectAreaLight){const X=e.get(I);X.color.copy(V).multiplyScalar(Q),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=X,T++}else if(I.isPointLight){const X=e.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){const ee=I.shadow,te=t.get(I);te.shadowIntensity=ee.intensity,te.shadowBias=ee.bias,te.shadowNormalBias=ee.normalBias,te.shadowRadius=ee.radius,te.shadowMapSize=ee.mapSize,te.shadowCameraNear=ee.camera.near,te.shadowCameraFar=ee.camera.far,n.pointShadow[p]=te,n.pointShadowMap[p]=ie,n.pointShadowMatrix[p]=I.shadow.matrix,w++}n.point[p]=X,p++}else if(I.isHemisphereLight){const X=e.get(I);X.skyColor.copy(I.color).multiplyScalar(Q),X.groundColor.copy(I.groundColor).multiplyScalar(Q),n.hemi[b]=X,b++}}T>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ge.LTC_FLOAT_1,n.rectAreaLTC2=ge.LTC_FLOAT_2):(n.rectAreaLTC1=ge.LTC_HALF_1,n.rectAreaLTC2=ge.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=h,n.ambient[2]=u;const L=n.hash;(L.sunLength!==g||L.directionalLength!==f||L.pointLength!==p||L.spotLength!==S||L.rectAreaLength!==T||L.hemiLength!==b||L.numSunShadows!==_||L.numDirectionalShadows!==R||L.numPointShadows!==w||L.numSpotShadows!==m||L.numSpotMaps!==y||L.numLightProbes!==M)&&(n.sun.length=g,n.directional.length=f,n.spot.length=S,n.rectArea.length=T,n.point.length=p,n.hemi.length=b,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=E,n.sunShadowCascade.length=E,n.directionalShadow.length=R,n.directionalShadowMap.length=R,n.directionalShadowMatrix.length=R,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=m,n.spotShadowMap.length=m,n.spotLightMatrix.length=m+y-N,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=N,n.numLightProbes=M,L.sunLength=g,L.directionalLength=f,L.pointLength=p,L.spotLength=S,L.rectAreaLength=T,L.hemiLength=b,L.numSunShadows=_,L.numDirectionalShadows=R,L.numPointShadows=w,L.numSpotShadows=m,L.numSpotMaps=y,L.numLightProbes=M,n.version=em++)}function o(c,d){let h=0,u=0,g=0,_=0,E=0,f=0;const p=d.matrixWorldInverse;for(let S=0,T=c.length;S<T;S++){const b=c[S];if(b.isSunLight){const R=n.sun[h];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(p),h++}else if(b.isDirectionalLight){const R=n.directional[u];R.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),u++}else if(b.isSpotLight){const R=n.spot[_];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(p),R.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),R.direction.sub(s),R.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const R=n.rectArea[E];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(p),r.identity(),a.copy(b.matrixWorld),a.premultiply(p),r.extractRotation(a),R.halfWidth.set(b.width*.5,0,0),R.halfHeight.set(0,b.height*.5,0),R.halfWidth.applyMatrix4(r),R.halfHeight.applyMatrix4(r),E++}else if(b.isPointLight){const R=n.point[g];R.position.setFromMatrixPosition(b.matrixWorld),R.position.applyMatrix4(p),g++}else if(b.isHemisphereLight){const R=n.hemi[f];R.direction.setFromMatrixPosition(b.matrixWorld),R.direction.transformDirection(p),f++}}}return{setup:l,setupView:o,state:n}}function ko(i){const e=new nm(i),t=[],n=[],s=[];function a(h){d.camera=h,t.length=0,n.length=0,s.length=0}function r(h){h.isLightProbeGrid?s.push(h):t.push(h)}function l(h){n.push(h)}function o(){e.setup(t),s.sort((h,u)=>h.priority-u.priority||h.id-u.id)}function c(h){e.setupView(t,h)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:l}}function im(i){let e=new WeakMap;function t(s,a=0){const r=e.get(s);let l;return r===void 0?(l=new ko(i),e.set(s,[l])):a>=r.length?(l=new ko(i),r.push(l)):l=r[a],l}function n(){e=new WeakMap}return{get:t,dispose:n}}const sm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,am=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,rm=[new z(1,0,0),new z(-1,0,0),new z(0,1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1)],om=[new z(0,-1,0),new z(0,-1,0),new z(0,0,1),new z(0,0,-1),new z(0,-1,0),new z(0,-1,0)],Oo=new ct,Ai=new z,ha=new z;function lm(i,e,t){let n=new Fi;const s=new Be,a=new Be,r=new lt,l=new Sd,o=new Md,c={},d=t.maxTextureSize,h={[Kn]:kt,[kt]:Kn,[Sn]:Sn},u=new Zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:sm,fragmentShader:am}),g=u.clone();g.defines.HORIZONTAL_PASS=1;const _=new Tn;_.setAttribute("position",new Xn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new un(_,u),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ps;let p=this.type;this.render=function(w,m,y){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||w.length===0)return;this.type===rc&&(Pe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ps);const N=i.getRenderTarget(),M=i.getActiveCubeFace(),L=i.getActiveMipmapLevel(),U=i.state;U.setBlending(ui),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const W=p!==this.type;W&&m.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(V=>V.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,V=w.length;I<V;I++){const Q=w[I],B=Q.shadow;if(B===void 0){Pe("WebGLShadowMap:",Q,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const ie=B.getFrameExtents();s.multiply(ie),a.copy(B.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(a.x=Math.floor(d/ie.x),s.x=a.x*ie.x,B.mapSize.x=a.x),s.y>d&&(a.y=Math.floor(d/ie.y),s.y=a.y*ie.y,B.mapSize.y=a.y));const X=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=X,B.map===null||W===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Ri){if(Q.isPointLight){Pe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new dn(s.x,s.y,{format:Yn,type:fn,minFilter:Ut,magFilter:Ut,generateMipmaps:!1}),B.map.texture.name=Q.name+".shadowMap",B.map.depthTexture=new gi(s.x,s.y,ln),B.map.depthTexture.name=Q.name+".shadowMapDepth",B.map.depthTexture.format=kn,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Et,B.map.depthTexture.magFilter=Et}else Q.isPointLight?(B.map=new Sr(s.x),B.map.depthTexture=new ml(s.x,hn)):(B.map=new dn(s.x,s.y),B.map.depthTexture=new gi(s.x,s.y,hn)),B.map.depthTexture.name=Q.name+".shadowMap",B.map.depthTexture.format=kn,this.type===ps?(B.map.depthTexture.compareFunction=X?al:sl,B.map.depthTexture.minFilter=Ut,B.map.depthTexture.magFilter=Ut):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Et,B.map.depthTexture.magFilter=Et);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==s.x||B.map.height!==s.y)&&B.map.setSize(s.x,s.y);const ee=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();Q.isPointLight!==!0&&B.updateMatrices(Q,y);const te=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:y.layers;for(let Ee=0;Ee<ee;Ee++){const Ne=B.getCamera(Ee);if(Q.isPointLight){const Y=B.camera,ve=B.matrix,Me=Q.distance||Y.far;Me!==Y.far&&(Y.far=Me,Y.updateProjectionMatrix()),Ai.setFromMatrixPosition(Q.matrixWorld),Y.position.copy(Ai),ha.copy(Y.position),ha.add(rm[Ee]),Y.up.copy(om[Ee]),Y.lookAt(ha),Y.updateMatrixWorld(),ve.makeTranslation(-Ai.x,-Ai.y,-Ai.z),Oo.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Oo,Y.coordinateSystem,Y.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,Ee),i.clear();else{Ee===0&&(i.setRenderTarget(B.map),i.clear());const Y=B.getViewport(Ee);r.set(a.x*Y.x,a.y*Y.y,a.x*Y.z,a.y*Y.w),U.viewport(r)}n=B.getFrustum(Ee),b(m,y,Ne,Q,te,this.type)}B.isPointLightShadow!==!0&&this.type===Ri&&S(B,y),B.needsUpdate=!1}p=this.type,f.needsUpdate=!1,i.setRenderTarget(N,M,L)};function S(w,m){const y=e.update(E);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,g.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,g.needsUpdate=!0),w.mapPass===null?w.mapPass=new dn(s.x,s.y,{format:Yn,type:fn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,i.setRenderTarget(w.mapPass),i.clear(),i.renderBufferDirect(m,null,y,u,E,null),g.uniforms.shadow_pass.value=w.mapPass.texture,g.uniforms.resolution.value.set(w.map.width,w.map.height),g.uniforms.radius.value=w.radius,i.setRenderTarget(w.map),i.clear(),i.renderBufferDirect(m,null,y,g,E,null)}function T(w,m,y,N){let M=null;const L=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(L!==void 0)M=L;else if(M=y.isPointLight===!0?o:l,i.localClippingEnabled&&m.clipShadows===!0&&Array.isArray(m.clippingPlanes)&&m.clippingPlanes.length!==0||m.displacementMap&&m.displacementScale!==0||m.alphaMap&&m.alphaTest>0||m.map&&m.alphaTest>0||m.alphaToCoverage===!0){const U=M.uuid,W=m.uuid;let I=c[U];I===void 0&&(I={},c[U]=I);let V=I[W];V===void 0&&(V=M.clone(),I[W]=V,m.addEventListener("dispose",R)),M=V}if(M.visible=m.visible,M.wireframe=m.wireframe,N===Ri?M.side=m.shadowSide!==null?m.shadowSide:m.side:M.side=m.shadowSide!==null?m.shadowSide:h[m.side],M.alphaMap=m.alphaMap,M.alphaTest=m.alphaToCoverage===!0?.5:m.alphaTest,M.map=m.map,M.clipShadows=m.clipShadows,M.clippingPlanes=m.clippingPlanes,M.clipIntersection=m.clipIntersection,M.displacementMap=m.displacementMap,M.displacementScale=m.displacementScale,M.displacementBias=m.displacementBias,M.wireframeLinewidth=m.wireframeLinewidth,M.linewidth=m.linewidth,y.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const U=i.properties.get(M);U.light=y}return M}function b(w,m,y,N,M,L){if(w.visible===!1)return;if(w.layers.test(M)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===Ri)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const I=e.update(w),V=w.material;if(Array.isArray(V)){const Q=I.groups;for(let B=0,ie=Q.length;B<ie;B++){const X=Q[B],ee=V[X.materialIndex];if(ee&&ee.visible){const te=T(w,ee,N,L);w.onBeforeShadow(i,w,m,y,I,te,X),i.renderBufferDirect(y,null,I,te,w,X),w.onAfterShadow(i,w,m,y,I,te,X)}}}else if(V.visible){const Q=T(w,V,N,L);w.onBeforeShadow(i,w,m,y,I,Q,null),i.renderBufferDirect(y,null,I,Q,w,null),w.onAfterShadow(i,w,m,y,I,Q,null)}}const W=w.children;for(let I=0,V=W.length;I<V;I++)b(W[I],m,y,N,M,L)}function R(w){w.target.removeEventListener("dispose",R);for(const y in c){const N=c[y],M=w.target.uuid;M in N&&(N[M].dispose(),delete N[M])}}}function cm(i,e){function t(){let C=!1;const Z=new lt;let $=null;const ce=new lt(0,0,0,0);return{setMask:function(ae){$!==ae&&!C&&(i.colorMask(ae,ae,ae,ae),$=ae)},setLocked:function(ae){C=ae},setClear:function(ae,oe,Ae,Oe,se){se===!0&&(ae*=Oe,oe*=Oe,Ae*=Oe),Z.set(ae,oe,Ae,Oe),ce.equals(Z)===!1&&(i.clearColor(ae,oe,Ae,Oe),ce.copy(Z))},reset:function(){C=!1,$=null,ce.set(-1,0,0,0)}}}function n(){let C=!1,Z=!1,$=null,ce=null,ae=null;return{setReversed:function(oe){if(Z!==oe){const Ae=e.get("EXT_clip_control");oe?Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.ZERO_TO_ONE_EXT):Ae.clipControlEXT(Ae.LOWER_LEFT_EXT,Ae.NEGATIVE_ONE_TO_ONE_EXT),Z=oe;const Oe=ae;ae=null,this.setClear(Oe)}},getReversed:function(){return Z},setTest:function(oe){oe?_e(i.DEPTH_TEST):Fe(i.DEPTH_TEST)},setMask:function(oe){$!==oe&&!C&&(i.depthMask(oe),$=oe)},setFunc:function(oe){if(Z&&(oe=Bc[oe]),ce!==oe){switch(oe){case fa:i.depthFunc(i.NEVER);break;case pa:i.depthFunc(i.ALWAYS);break;case ma:i.depthFunc(i.LESS);break;case Ii:i.depthFunc(i.LEQUAL);break;case ga:i.depthFunc(i.EQUAL);break;case va:i.depthFunc(i.GEQUAL);break;case _a:i.depthFunc(i.GREATER);break;case xa:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ce=oe}},setLocked:function(oe){C=oe},setClear:function(oe){ae!==oe&&(ae=oe,Z&&(oe=1-oe),i.clearDepth(oe))},reset:function(){C=!1,$=null,ce=null,ae=null,Z=!1}}}function s(){let C=!1,Z=null,$=null,ce=null,ae=null,oe=null,Ae=null,Oe=null,se=null;return{setTest:function(we){C||(we?_e(i.STENCIL_TEST):Fe(i.STENCIL_TEST))},setMask:function(we){Z!==we&&!C&&(i.stencilMask(we),Z=we)},setFunc:function(we,ke,me){($!==we||ce!==ke||ae!==me)&&(i.stencilFunc(we,ke,me),$=we,ce=ke,ae=me)},setOp:function(we,ke,me){(oe!==we||Ae!==ke||Oe!==me)&&(i.stencilOp(we,ke,me),oe=we,Ae=ke,Oe=me)},setLocked:function(we){C=we},setClear:function(we){se!==we&&(i.clearStencil(we),se=we)},reset:function(){C=!1,Z=null,$=null,ce=null,ae=null,oe=null,Ae=null,Oe=null,se=null}}}const a=new t,r=new n,l=new s;let o={};const c=new WeakMap;let d={},h={},u={},g=new WeakMap,_=[],E=null,f=!1,p=null,S=null,T=null,b=null,R=null,w=null,m=null,y=new qe(0,0,0),N=0,M=!1,L=null,U=null,W=null,I=null,V=null;const Q=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,ie=0;const X=i.getParameter(i.VERSION);X.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(X)[1]),B=ie>=1):X.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),B=ie>=2);let ee=null,te={};const Ee=i.getParameter(i.SCISSOR_BOX),Ne=i.getParameter(i.VIEWPORT),Y=new lt().fromArray(Ee),ve=new lt().fromArray(Ne);function Me(C,Z,$,ce){const ae=new Uint8Array(4),oe=i.createTexture();i.bindTexture(C,oe),i.texParameteri(C,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(C,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ae=0;Ae<$;Ae++)C===i.TEXTURE_3D||C===i.TEXTURE_2D_ARRAY?i.texImage3D(Z,0,i.RGBA,1,1,ce,0,i.RGBA,i.UNSIGNED_BYTE,ae):i.texImage2D(Z+Ae,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ae);return oe}const Re={};Re[i.TEXTURE_2D]=Me(i.TEXTURE_2D,i.TEXTURE_2D,1),Re[i.TEXTURE_CUBE_MAP]=Me(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[i.TEXTURE_2D_ARRAY]=Me(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Re[i.TEXTURE_3D]=Me(i.TEXTURE_3D,i.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),l.setClear(0),_e(i.DEPTH_TEST),r.setFunc(Ii),Nt(!1),rt(Gr),_e(i.CULL_FACE),yt(ui);function _e(C){d[C]!==!0&&(i.enable(C),d[C]=!0)}function Fe(C){d[C]!==!1&&(i.disable(C),d[C]=!1)}function dt(C,Z){return u[C]!==Z?(i.bindFramebuffer(C,Z),u[C]=Z,C===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=Z),C===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=Z),!0):!1}function Le(C,Z){let $=_,ce=!1;if(C){$=g.get(Z),$===void 0&&($=[],g.set(Z,$));const ae=C.textures;if($.length!==ae.length||$[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,Ae=ae.length;oe<Ae;oe++)$[oe]=i.COLOR_ATTACHMENT0+oe;$.length=ae.length,ce=!0}}else $[0]!==i.BACK&&($[0]=i.BACK,ce=!0);ce&&i.drawBuffers($)}function Ze(C){return E!==C?(i.useProgram(C),E=C,!0):!1}const Qe={[di]:i.FUNC_ADD,[lc]:i.FUNC_SUBTRACT,[cc]:i.FUNC_REVERSE_SUBTRACT};Qe[dc]=i.MIN,Qe[uc]=i.MAX;const He={[hc]:i.ZERO,[fc]:i.ONE,[pc]:i.SRC_COLOR,[Bo]:i.SRC_ALPHA,[Sc]:i.SRC_ALPHA_SATURATE,[_c]:i.DST_COLOR,[gc]:i.DST_ALPHA,[mc]:i.ONE_MINUS_SRC_COLOR,[Ho]:i.ONE_MINUS_SRC_ALPHA,[xc]:i.ONE_MINUS_DST_COLOR,[vc]:i.ONE_MINUS_DST_ALPHA,[Mc]:i.CONSTANT_COLOR,[yc]:i.ONE_MINUS_CONSTANT_COLOR,[bc]:i.CONSTANT_ALPHA,[Ec]:i.ONE_MINUS_CONSTANT_ALPHA};function yt(C,Z,$,ce,ae,oe,Ae,Oe,se,we){if(C===ui){f===!0&&(Fe(i.BLEND),f=!1);return}if(f===!1&&(_e(i.BLEND),f=!0),C!==oc){if(C!==p||we!==M){if((S!==di||R!==di)&&(i.blendEquation(i.FUNC_ADD),S=di,R=di),we)switch(C){case Pi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vr:i.blendFunc(i.ONE,i.ONE);break;case Wr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case $r:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:Ye("WebGLState: Invalid blending: ",C);break}else switch(C){case Pi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Vr:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Wr:Ye("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case $r:Ye("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Ye("WebGLState: Invalid blending: ",C);break}T=null,b=null,w=null,m=null,y.set(0,0,0),N=0,p=C,M=we}return}ae=ae||Z,oe=oe||$,Ae=Ae||ce,(Z!==S||ae!==R)&&(i.blendEquationSeparate(Qe[Z],Qe[ae]),S=Z,R=ae),($!==T||ce!==b||oe!==w||Ae!==m)&&(i.blendFuncSeparate(He[$],He[ce],He[oe],He[Ae]),T=$,b=ce,w=oe,m=Ae),(Oe.equals(y)===!1||se!==N)&&(i.blendColor(Oe.r,Oe.g,Oe.b,se),y.copy(Oe),N=se),p=C,M=!1}function ft(C,Z){C.side===Sn?Fe(i.CULL_FACE):_e(i.CULL_FACE);let $=C.side===kt;Z&&($=!$),Nt($),C.blending===Pi&&C.transparent===!1?yt(ui):yt(C.blending,C.blendEquation,C.blendSrc,C.blendDst,C.blendEquationAlpha,C.blendSrcAlpha,C.blendDstAlpha,C.blendColor,C.blendAlpha,C.premultipliedAlpha),r.setFunc(C.depthFunc),r.setTest(C.depthTest),r.setMask(C.depthWrite),a.setMask(C.colorWrite);const ce=C.stencilWrite;l.setTest(ce),ce&&(l.setMask(C.stencilWriteMask),l.setFunc(C.stencilFunc,C.stencilRef,C.stencilFuncMask),l.setOp(C.stencilFail,C.stencilZFail,C.stencilZPass)),vt(C.polygonOffset,C.polygonOffsetFactor,C.polygonOffsetUnits),C.alphaToCoverage===!0?_e(i.SAMPLE_ALPHA_TO_COVERAGE):Fe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Nt(C){L!==C&&(C?i.frontFace(i.CW):i.frontFace(i.CCW),L=C)}function rt(C){C!==sc?(_e(i.CULL_FACE),C!==U&&(C===Gr?i.cullFace(i.BACK):C===ac?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Fe(i.CULL_FACE),U=C}function nn(C){C!==W&&(B&&i.lineWidth(C),W=C)}function vt(C,Z,$){C?(_e(i.POLYGON_OFFSET_FILL),(I!==Z||V!==$)&&(I=Z,V=$,r.getReversed()&&(Z=-Z,$=-$),i.polygonOffset(Z,$))):Fe(i.POLYGON_OFFSET_FILL)}function Ht(C){C?_e(i.SCISSOR_TEST):Fe(i.SCISSOR_TEST)}function Gt(C){C===void 0&&(C=i.TEXTURE0+Q-1),ee!==C&&(i.activeTexture(C),ee=C)}function Vt(C,Z,$){$===void 0&&(ee===null?$=i.TEXTURE0+Q-1:$=ee);let ce=te[$];ce===void 0&&(ce={type:void 0,texture:void 0},te[$]=ce),(ce.type!==C||ce.texture!==Z)&&(ee!==$&&(i.activeTexture($),ee=$),i.bindTexture(C,Z||Re[C]),ce.type=C,ce.texture=Z)}function D(){const C=te[ee];C!==void 0&&C.type!==void 0&&(i.bindTexture(C.type,null),C.type=void 0,C.texture=void 0)}function Wt(){try{i.compressedTexImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function it(){try{i.compressedTexImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function st(){try{i.texSubImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function pe(){try{i.texSubImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function pt(){try{i.compressedTexSubImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function Ce(){try{i.compressedTexSubImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function Ie(){try{i.texStorage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function A(){try{i.texStorage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function v(){try{i.texImage2D(...arguments)}catch(C){Ye("WebGLState:",C)}}function k(){try{i.texImage3D(...arguments)}catch(C){Ye("WebGLState:",C)}}function ne(C){return h[C]!==void 0?h[C]:i.getParameter(C)}function J(C,Z){h[C]!==Z&&(i.pixelStorei(C,Z),h[C]=Z)}function re(C){Y.equals(C)===!1&&(i.scissor(C.x,C.y,C.z,C.w),Y.copy(C))}function ue(C){ve.equals(C)===!1&&(i.viewport(C.x,C.y,C.z,C.w),ve.copy(C))}function q(C,Z){let $=c.get(Z);$===void 0&&($=new WeakMap,c.set(Z,$));let ce=$.get(C);ce===void 0&&(ce=i.getUniformBlockIndex(Z,C.name),i.uniformBlockBinding(Z,ce,ce),$.set(C,ce))}function K(C,Z,$){const ae=c.get(Z).get(C);o[ae]!==$&&(i.bindBufferBase(i.UNIFORM_BUFFER,ae,$),o[ae]=$)}function le(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),r.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),d={},h={},ee=null,te={},u={},o={},g=new WeakMap,_=[],E=null,f=!1,p=null,S=null,T=null,b=null,R=null,w=null,m=null,y=new qe(0,0,0),N=0,M=!1,L=null,U=null,W=null,I=null,V=null,Y.set(0,0,i.canvas.width,i.canvas.height),ve.set(0,0,i.canvas.width,i.canvas.height),a.reset(),r.reset(),l.reset()}return{buffers:{color:a,depth:r,stencil:l},enable:_e,disable:Fe,bindFramebuffer:dt,drawBuffers:Le,useProgram:Ze,setBlending:yt,setMaterial:ft,setFlipSided:Nt,setCullFace:rt,setLineWidth:nn,setPolygonOffset:vt,setScissorTest:Ht,activeTexture:Gt,bindTexture:Vt,unbindTexture:D,compressedTexImage2D:Wt,compressedTexImage3D:it,texImage2D:v,texImage3D:k,pixelStorei:J,getParameter:ne,updateUBOMapping:q,uniformBlockBinding:K,texStorage2D:Ie,texStorage3D:A,texSubImage2D:st,texSubImage3D:pe,compressedTexSubImage2D:pt,compressedTexSubImage3D:Ce,scissor:re,viewport:ue,reset:le}}function dm(i,e,t,n,s,a,r){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,o=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Be,d=new WeakMap,h=new Set;let u;const g=new WeakMap,_=new Set,E=new FinalizationRegistry(A=>_.delete(A));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,v){return f?new OffscreenCanvas(A,v):As("canvas")}function S(A,v,k){let ne=1;const J=Ie(A);if((J.width>k||J.height>k)&&(ne=k/Math.max(J.width,J.height)),ne<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const re=Math.floor(ne*J.width),ue=Math.floor(ne*J.height);u===void 0&&(u=p(re,ue));const q=v?p(re,ue):u;return q.width=re,q.height=ue,q.getContext("2d").drawImage(A,0,0,re,ue),Pe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+re+"x"+ue+")."),q}else return"data"in A&&Pe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),A;return A}function T(A){return A.generateMipmaps}function b(A){i.generateMipmap(A)}function R(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function w(A,v,k,ne,J,re=!1){if(A!==null){if(i[A]!==void 0)return i[A];Pe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let ue;ne&&(ue=e.get("EXT_texture_norm16"),ue||Pe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let q=v;if(v===i.RED&&(k===i.FLOAT&&(q=i.R32F),k===i.HALF_FLOAT&&(q=i.R16F),k===i.UNSIGNED_BYTE&&(q=i.R8),k===i.UNSIGNED_SHORT&&ue&&(q=ue.R16_EXT),k===i.SHORT&&ue&&(q=ue.R16_SNORM_EXT)),v===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(q=i.R8UI),k===i.UNSIGNED_SHORT&&(q=i.R16UI),k===i.UNSIGNED_INT&&(q=i.R32UI),k===i.BYTE&&(q=i.R8I),k===i.SHORT&&(q=i.R16I),k===i.INT&&(q=i.R32I)),v===i.RG&&(k===i.FLOAT&&(q=i.RG32F),k===i.HALF_FLOAT&&(q=i.RG16F),k===i.UNSIGNED_BYTE&&(q=i.RG8),k===i.UNSIGNED_SHORT&&ue&&(q=ue.RG16_EXT),k===i.SHORT&&ue&&(q=ue.RG16_SNORM_EXT)),v===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(q=i.RG8UI),k===i.UNSIGNED_SHORT&&(q=i.RG16UI),k===i.UNSIGNED_INT&&(q=i.RG32UI),k===i.BYTE&&(q=i.RG8I),k===i.SHORT&&(q=i.RG16I),k===i.INT&&(q=i.RG32I)),v===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(q=i.RGB8UI),k===i.UNSIGNED_SHORT&&(q=i.RGB16UI),k===i.UNSIGNED_INT&&(q=i.RGB32UI),k===i.BYTE&&(q=i.RGB8I),k===i.SHORT&&(q=i.RGB16I),k===i.INT&&(q=i.RGB32I)),v===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(q=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(q=i.RGBA16UI),k===i.UNSIGNED_INT&&(q=i.RGBA32UI),k===i.BYTE&&(q=i.RGBA8I),k===i.SHORT&&(q=i.RGBA16I),k===i.INT&&(q=i.RGBA32I)),v===i.RGB&&(k===i.UNSIGNED_SHORT&&ue&&(q=ue.RGB16_EXT),k===i.SHORT&&ue&&(q=ue.RGB16_SNORM_EXT),k===i.UNSIGNED_INT_5_9_9_9_REV&&(q=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(q=i.R11F_G11F_B10F)),v===i.RGBA){const K=re?Ts:We.getTransfer(J);k===i.FLOAT&&(q=i.RGBA32F),k===i.HALF_FLOAT&&(q=i.RGBA16F),k===i.UNSIGNED_BYTE&&(q=K===je?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT&&ue&&(q=ue.RGBA16_EXT),k===i.SHORT&&ue&&(q=ue.RGBA16_SNORM_EXT),k===i.UNSIGNED_SHORT_4_4_4_4&&(q=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(q=i.RGB5_A1)}return(q===i.R16F||q===i.R32F||q===i.RG16F||q===i.RG32F||q===i.RGBA16F||q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),q}function m(A,v){let k;return A?v===null||v===hn||v===mi?k=i.DEPTH24_STENCIL8:v===ln?k=i.DEPTH32F_STENCIL8:v===Ni&&(k=i.DEPTH24_STENCIL8,Pe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===hn||v===mi?k=i.DEPTH_COMPONENT24:v===ln?k=i.DEPTH_COMPONENT32F:v===Ni&&(k=i.DEPTH_COMPONENT16),k}function y(A,v){return T(A)===!0||A.isFramebufferTexture&&A.minFilter!==Et&&A.minFilter!==Ut?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function N(A){const v=new WeakRef(A);n.get(A).__ref=v,_.add(v),E.register(A,v,v)}function M(A){const v=n.get(A).__ref;v!==void 0&&(_.delete(v),E.unregister(v))}function L(A){W(A.target)}function U(A){I(A.target)}function W(A){A.removeEventListener("dispose",L),M(A),Q(A),A.isVideoTexture&&d.delete(A),A.isHTMLTexture&&h.delete(A)}function I(A){A.removeEventListener("dispose",U),M(A),ie(A)}function V(){for(const A of _){const v=A.deref();v!==void 0&&(v.isRenderTarget===!0?I(v):W(v))}_.clear(),h.clear()}function Q(A){const v=n.get(A);if(v.__webglInit===void 0)return;const k=A.source,ne=g.get(k);if(ne){const J=ne[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&B(A),Object.keys(ne).length===0&&g.delete(k)}n.remove(A)}function B(A){const v=n.get(A);i.deleteTexture(v.__webglTexture);const k=A.source,ne=g.get(k);delete ne[v.__cacheKey],r.memory.textures--}function ie(A){const v=n.get(A);v.__depthDisposeCallback&&v.__depthDisposeCallback();const k=A.depthTexture;if(k&&k.renderTarget===A&&W(k),A.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(v.__webglFramebuffer[J]))for(let re=0;re<v.__webglFramebuffer[J].length;re++)i.deleteFramebuffer(v.__webglFramebuffer[J][re]);else i.deleteFramebuffer(v.__webglFramebuffer[J]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[J])}else{if(Array.isArray(v.__webglFramebuffer))for(let J=0;J<v.__webglFramebuffer.length;J++)i.deleteFramebuffer(v.__webglFramebuffer[J]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let J=0;J<v.__webglColorRenderbuffer.length;J++)v.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[J]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const ne=A.textures;for(let J=0,re=ne.length;J<re;J++){const ue=n.get(ne[J]);ue.__webglTexture&&(i.deleteTexture(ue.__webglTexture),r.memory.textures--),n.remove(ne[J])}n.remove(A)}let X=0;function ee(){X=0}function te(){return X}function Ee(A){X=A}function Ne(){const A=X;return A>=s.maxTextures&&Pe("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),X+=1,A}function Y(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.mipmapsAutoUpdate),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function ve(A,v){const k=n.get(A);if(A.isVideoTexture&&pt(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&k.__version!==A.version){const ne=A.image;if(ne===null)Pe("WebGLRenderer: Texture marked for update but no image data found.");else if(ne.complete===!1)Pe("WebGLRenderer: Texture marked for update but image is incomplete");else{ft(k,A,v);return}}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+v)}function Me(A,v){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){ft(k,A,v);return}else A.isExternalTexture&&(k.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+v)}function Re(A,v){const k=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&k.__version!==A.version){ft(k,A,v);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+v)}function _e(A,v){const k=n.get(A);if(A.version>0&&k.__version!==A.version){Nt(k,A,v);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+v)}const Fe={[Sa]:i.REPEAT,[Mn]:i.CLAMP_TO_EDGE,[Ma]:i.MIRRORED_REPEAT},dt={[Et]:i.NEAREST,[wc]:i.NEAREST_MIPMAP_NEAREST,[Xi]:i.NEAREST_MIPMAP_LINEAR,[Ut]:i.LINEAR,[Bs]:i.LINEAR_MIPMAP_NEAREST,[Un]:i.LINEAR_MIPMAP_LINEAR},Le={[Pc]:i.NEVER,[rl]:i.ALWAYS,[Ic]:i.LESS,[sl]:i.LEQUAL,[Dc]:i.EQUAL,[al]:i.GEQUAL,[Nc]:i.GREATER,[Uc]:i.NOTEQUAL};function Ze(A,v){if(v.type===ln&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===Ut||v.magFilter===Bs||v.magFilter===Xi||v.magFilter===Un||v.minFilter===Ut||v.minFilter===Bs||v.minFilter===Xi||v.minFilter===Un)&&Pe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,Fe[v.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,Fe[v.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,Fe[v.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,dt[v.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,dt[v.minFilter]),v.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Le[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Et||v.minFilter!==Xi&&v.minFilter!==Un||v.type===ln&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Qe(A,v){let k=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",L),N(v));const ne=v.source;let J=g.get(ne);J===void 0&&(J={},g.set(ne,J));const re=Y(v);if(re!==A.__cacheKey){J[re]===void 0&&(J[re]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,k=!0),J[re].usedTimes++;const ue=J[A.__cacheKey];ue!==void 0&&(J[A.__cacheKey].usedTimes--,ue.usedTimes===0&&B(v)),A.__cacheKey=re,A.__webglTexture=J[re].texture}return k}function He(A,v,k){return Math.floor(Math.floor(A/k)/v)}function yt(A,v,k,ne){const re=A.updateRanges;if(re.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,v.width,v.height,k,ne,v.data);else{re.sort((C,Z)=>C.start-Z.start);let ue=0;for(let C=1;C<re.length;C++){const Z=re[ue],$=re[C],ce=Z.start+Z.count,ae=He($.start,v.width,4),oe=He(Z.start,v.width,4);$.start<=ce+1&&ae===oe&&He($.start+$.count-1,v.width,4)===ae?Z.count=Math.max(Z.count,$.start+$.count-Z.start):(++ue,re[ue]=$)}re.length=ue+1;const q=t.getParameter(i.UNPACK_ROW_LENGTH),K=t.getParameter(i.UNPACK_SKIP_PIXELS),le=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,v.width);for(let C=0,Z=re.length;C<Z;C++){const $=re[C],ce=Math.floor($.start/4),ae=Math.ceil($.count/4),oe=ce%v.width,Ae=Math.floor(ce/v.width),Oe=ae,se=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,oe),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ae),t.texSubImage2D(i.TEXTURE_2D,0,oe,Ae,Oe,se,k,ne,v.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,K),t.pixelStorei(i.UNPACK_SKIP_ROWS,le)}}function ft(A,v,k){let ne=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(ne=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(ne=i.TEXTURE_3D);const J=Qe(A,v),re=v.source;t.bindTexture(ne,A.__webglTexture,i.TEXTURE0+k);const ue=n.get(re);if(re.version!==ue.__version||J===!0){if(t.activeTexture(i.TEXTURE0+k),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const se=We.getPrimaries(We.workingColorSpace),we=v.colorSpace===Nn?null:We.getPrimaries(v.colorSpace),ke=v.colorSpace===Nn||se===we?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke)}t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment);let K=S(v.image,!1,s.maxTextureSize);K=Ce(v,K);const le=a.convert(v.format,v.colorSpace),C=a.convert(v.type);let Z=w(v.internalFormat,le,C,v.normalized,v.colorSpace,v.isVideoTexture);Ze(ne,v);let $;const ce=v.mipmaps,ae=v.isVideoTexture!==!0,oe=ue.__version===void 0||J===!0,Ae=re.dataReady,Oe=y(v,K);if(v.isDepthTexture)Z=m(v.format===Fn,v.type),oe&&(ae?t.texStorage2D(i.TEXTURE_2D,1,Z,K.width,K.height):t.texImage2D(i.TEXTURE_2D,0,Z,K.width,K.height,0,le,C,null));else if(v.isDataTexture)if(ce.length>0){ae&&oe&&t.texStorage2D(i.TEXTURE_2D,Oe,Z,ce[0].width,ce[0].height);for(let se=0,we=ce.length;se<we;se++)$=ce[se],ae?Ae&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,$.width,$.height,le,C,$.data):t.texImage2D(i.TEXTURE_2D,se,Z,$.width,$.height,0,le,C,$.data);v.generateMipmaps=!1}else ae?(oe&&t.texStorage2D(i.TEXTURE_2D,Oe,Z,K.width,K.height),Ae&&yt(v,K,le,C)):t.texImage2D(i.TEXTURE_2D,0,Z,K.width,K.height,0,le,C,K.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){ae&&oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,Z,ce[0].width,ce[0].height,K.depth);for(let se=0,we=ce.length;se<we;se++)if($=ce[se],v.format!==cn)if(le!==null)if(ae){if(Ae)if(v.layerUpdates.size>0){const ke=vo($.width,$.height,v.format,v.type);for(const me of v.layerUpdates){const Je=$.data.subarray(me*ke/$.data.BYTES_PER_ELEMENT,(me+1)*ke/$.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,me,$.width,$.height,1,le,Je)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,$.width,$.height,K.depth,le,$.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,se,Z,$.width,$.height,K.depth,0,$.data,0,0);else Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?Ae&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,se,0,0,0,$.width,$.height,K.depth,le,C,$.data):t.texImage3D(i.TEXTURE_2D_ARRAY,se,Z,$.width,$.height,K.depth,0,le,C,$.data);v.layerUpdates.size>0&&v.clearLayerUpdates()}else{ae&&oe&&t.texStorage2D(i.TEXTURE_2D,Oe,Z,ce[0].width,ce[0].height);for(let se=0,we=ce.length;se<we;se++)$=ce[se],v.format!==cn?le!==null?ae?Ae&&t.compressedTexSubImage2D(i.TEXTURE_2D,se,0,0,$.width,$.height,le,$.data):t.compressedTexImage2D(i.TEXTURE_2D,se,Z,$.width,$.height,0,$.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?Ae&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,$.width,$.height,le,C,$.data):t.texImage2D(i.TEXTURE_2D,se,Z,$.width,$.height,0,le,C,$.data)}else if(v.isDataArrayTexture)if(ae){if(oe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Oe,Z,K.width,K.height,K.depth),Ae)if(v.layerUpdates.size>0){const se=vo(K.width,K.height,v.format,v.type);for(const we of v.layerUpdates){const ke=K.data.subarray(we*se/K.data.BYTES_PER_ELEMENT,(we+1)*se/K.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,we,K.width,K.height,1,le,C,ke)}v.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,le,C,K.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Z,K.width,K.height,K.depth,0,le,C,K.data);else if(v.isData3DTexture)ae?(oe&&t.texStorage3D(i.TEXTURE_3D,Oe,Z,K.width,K.height,K.depth),Ae&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,le,C,K.data)):t.texImage3D(i.TEXTURE_3D,0,Z,K.width,K.height,K.depth,0,le,C,K.data);else if(v.isFramebufferTexture){if(oe)if(ae)t.texStorage2D(i.TEXTURE_2D,Oe,Z,K.width,K.height);else{let se=K.width,we=K.height;for(let ke=0;ke<Oe;ke++)t.texImage2D(i.TEXTURE_2D,ke,Z,se,we,0,le,C,null),se>>=1,we>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in i){const se=i.canvas;if(se.hasAttribute("layoutsubtree")||se.setAttribute("layoutsubtree","true"),K.parentNode!==se){se.appendChild(K),h.add(v),se.onpaint=we=>{const ke=we.changedElements;for(const me of h)ke.includes(me.image)&&(me.needsUpdate=!0)},se.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,K);else{const ke=i.RGBA,me=i.RGBA,Je=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,ke,me,Je,K)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ce.length>0){if(ae&&oe){const se=Ie(ce[0]);t.texStorage2D(i.TEXTURE_2D,Oe,Z,se.width,se.height)}for(let se=0,we=ce.length;se<we;se++)$=ce[se],ae?Ae&&t.texSubImage2D(i.TEXTURE_2D,se,0,0,le,C,$):t.texImage2D(i.TEXTURE_2D,se,Z,le,C,$);v.generateMipmaps=!1}else if(ae){if(oe){const se=Ie(K);t.texStorage2D(i.TEXTURE_2D,Oe,Z,se.width,se.height)}Ae&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,le,C,K)}else t.texImage2D(i.TEXTURE_2D,0,Z,le,C,K);T(v)&&v.mipmapsAutoUpdate===!0&&b(ne),ue.__version=re.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Nt(A,v,k){if(v.image.length!==6)return;const ne=Qe(A,v),J=v.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+k);const re=n.get(J);if(J.version!==re.__version||ne===!0){t.activeTexture(i.TEXTURE0+k);const ue=We.getPrimaries(We.workingColorSpace),q=v.colorSpace===Nn?null:We.getPrimaries(v.colorSpace),K=v.colorSpace===Nn||ue===q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const le=v.isCompressedTexture||v.image[0].isCompressedTexture,C=v.image[0]&&v.image[0].isDataTexture,Z=[];for(let me=0;me<6;me++)!le&&!C?Z[me]=S(v.image[me],!0,s.maxCubemapSize):Z[me]=C?v.image[me].image:v.image[me],Z[me]=Ce(v,Z[me]);const $=Z[0],ce=a.convert(v.format,v.colorSpace),ae=a.convert(v.type);let oe=w(v.internalFormat,ce,ae,v.normalized,v.colorSpace);const Ae=v.isVideoTexture!==!0,Oe=re.__version===void 0||ne===!0,se=J.dataReady;let we=y(v,$);Ze(i.TEXTURE_CUBE_MAP,v);let ke;if(v.isDepthTexture){if(oe=m(v.format===Fn,v.type),Oe)if(Ae)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,oe,$.width,$.height);else for(let me=0;me<6;me++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,oe,$.width,$.height,0,ce,ae,null)}else if(le){Ae&&Oe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,oe,$.width,$.height);for(let me=0;me<6;me++){ke=Z[me].mipmaps;for(let Je=0;Je<ke.length;Je++){const _t=ke[Je];v.format!==cn?ce!==null?Ae?se&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je,0,0,_t.width,_t.height,ce,_t.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je,oe,_t.width,_t.height,0,_t.data):Pe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ae?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je,0,0,_t.width,_t.height,ce,ae,_t.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je,oe,_t.width,_t.height,0,ce,ae,_t.data)}}}else{if(ke=v.mipmaps,Ae&&Oe){ke.length>0&&we++;const me=Ie(Z[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,oe,me.width,me.height)}for(let me=0;me<6;me++)if(C){Ae?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Z[me].width,Z[me].height,ce,ae,Z[me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,oe,Z[me].width,Z[me].height,0,ce,ae,Z[me].data);for(let Je=0;Je<ke.length;Je++){const An=ke[Je].image[me].image;Ae?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je+1,0,0,An.width,An.height,ce,ae,An.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je+1,oe,An.width,An.height,0,ce,ae,An.data)}}else{Ae?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,ce,ae,Z[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,oe,ce,ae,Z[me]);for(let Je=0;Je<ke.length;Je++){const _t=ke[Je];Ae?se&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je+1,0,0,ce,ae,_t.image[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Je+1,oe,ce,ae,_t.image[me])}}}T(v)&&v.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),re.__version=J.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function rt(A,v,k,ne,J,re){const ue=a.convert(k.format,k.colorSpace),q=a.convert(k.type),K=w(k.internalFormat,ue,q,k.normalized,k.colorSpace),le=n.get(v),C=n.get(k);if(C.__renderTarget=v,!le.__hasExternalTextures){const Z=Math.max(1,v.width>>re),$=Math.max(1,v.height>>re);J===i.TEXTURE_3D||J===i.TEXTURE_2D_ARRAY?t.texImage3D(J,re,K,Z,$,v.depth,0,ue,q,null):t.texImage2D(J,re,K,Z,$,0,ue,q,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),pe(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ne,J,C.__webglTexture,0,st(v)):(J===i.TEXTURE_2D||J>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ne,J,C.__webglTexture,re),t.bindFramebuffer(i.FRAMEBUFFER,null)}function nn(A,v,k){if(i.bindRenderbuffer(i.RENDERBUFFER,A),v.depthBuffer){const ne=v.depthTexture,J=ne&&ne.isDepthTexture?ne.type:null,re=m(v.stencilBuffer,J),ue=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;pe(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st(v),re,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,st(v),re,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,re,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ue,i.RENDERBUFFER,A)}else{const ne=v.textures;for(let J=0;J<ne.length;J++){const re=ne[J],ue=a.convert(re.format,re.colorSpace),q=a.convert(re.type),K=w(re.internalFormat,ue,q,re.normalized,re.colorSpace);pe(v)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,st(v),K,v.width,v.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,st(v),K,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,K,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function vt(A,v,k){const ne=v.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=n.get(v.depthTexture);J.__renderTarget=v;const re=ne?v.depthTexture.image[0]:v.depthTexture.image;(!J.__webglTexture||re.width!==v.width||re.height!==v.height)&&(re.width=v.width,re.height=v.height,v.depthTexture.needsUpdate=!0),ne?_e(v.depthTexture,0):ve(v.depthTexture,0);const ue=J.__webglTexture,q=st(v),K=ne?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,le=v.depthTexture.format===Fn?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(v.depthTexture.format===kn)pe(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,K,ue,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,le,K,ue,0);else if(v.depthTexture.format===Fn)pe(v)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,le,K,ue,0,q):i.framebufferTexture2D(i.FRAMEBUFFER,le,K,ue,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ht(A){const v=n.get(A),k=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const ne=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),ne){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,ne.removeEventListener("dispose",J)};ne.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=ne}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(k)for(let ne=0;ne<6;ne++)vt(v.__webglFramebuffer[ne],A,ne);else A.texture.mipmaps.length>0?vt(v.__webglFramebuffer[0],A,0):vt(v.__webglFramebuffer,A,0);else if(k){v.__webglDepthbuffer=[];for(let ne=0;ne<6;ne++)if(t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[ne]),v.__webglDepthbuffer[ne]===void 0)v.__webglDepthbuffer[ne]=i.createRenderbuffer(),nn(v.__webglDepthbuffer[ne],A,!1);else{const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=v.__webglDepthbuffer[ne];i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,re)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),nn(v.__webglDepthbuffer,A,!1);else{const J=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,re=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,re),i.framebufferRenderbuffer(i.FRAMEBUFFER,J,i.RENDERBUFFER,re)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Gt(A,v,k){const ne=n.get(A);v!==void 0&&rt(ne.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ht(A)}function Vt(A){const v=A.texture,k=n.get(A),ne=n.get(v);A.addEventListener("dispose",U),N(A);const J=A.textures,re=A.isWebGLCubeRenderTarget===!0,ue=J.length>1;if(ue||(ne.__webglTexture===void 0&&(ne.__webglTexture=i.createTexture()),ne.__version=v.version,r.memory.textures++),re){k.__webglFramebuffer=[];for(let q=0;q<6;q++)if(v.mipmaps.length>0){k.__webglFramebuffer[q]=[];for(let K=0;K<v.mipmaps.length;K++)k.__webglFramebuffer[q][K]=i.createFramebuffer()}else k.__webglFramebuffer[q]=i.createFramebuffer()}else{if(v.mipmaps.length>0){k.__webglFramebuffer=[];for(let q=0;q<v.mipmaps.length;q++)k.__webglFramebuffer[q]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(ue)for(let q=0,K=J.length;q<K;q++){const le=n.get(J[q]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),r.memory.textures++)}if(A.samples>0&&pe(A)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let q=0;q<J.length;q++){const K=J[q];k.__webglColorRenderbuffer[q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[q]);const le=a.convert(K.format,K.colorSpace),C=a.convert(K.type),Z=w(K.internalFormat,le,C,K.normalized,K.colorSpace,A.isXRRenderTarget===!0),$=st(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,$,Z,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+q,i.RENDERBUFFER,k.__webglColorRenderbuffer[q])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),nn(k.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(re){t.bindTexture(i.TEXTURE_CUBE_MAP,ne.__webglTexture),Ze(i.TEXTURE_CUBE_MAP,v);for(let q=0;q<6;q++)if(v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)rt(k.__webglFramebuffer[q][K],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,K);else rt(k.__webglFramebuffer[q],A,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+q,0);T(v)?b(i.TEXTURE_CUBE_MAP):v.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}else if(ue){for(let q=0,K=J.length;q<K;q++){const le=J[q],C=n.get(le);let Z=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Z=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Z,C.__webglTexture),Ze(Z,le),rt(k.__webglFramebuffer,A,le,i.COLOR_ATTACHMENT0+q,Z,0),T(le)&&b(Z)}t.unbindTexture()}else{let q=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(q=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(q,ne.__webglTexture),Ze(q,v),v.mipmaps.length>0)for(let K=0;K<v.mipmaps.length;K++)rt(k.__webglFramebuffer[K],A,v,i.COLOR_ATTACHMENT0,q,K);else rt(k.__webglFramebuffer,A,v,i.COLOR_ATTACHMENT0,q,0);T(v)?b(q):v.mipmaps.length>0&&i.texParameteri(q,i.TEXTURE_MAX_LEVEL,v.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&Ht(A)}function D(A){const v=A.textures;for(let k=0,ne=v.length;k<ne;k++){const J=v[k];if(T(J)&&J.mipmapsAutoUpdate===!0){const re=R(A),ue=n.get(J).__webglTexture;t.bindTexture(re,ue),b(re),t.unbindTexture()}}}const Wt=[];function it(A){if(A.samples>0){if(pe(A)===!1){const v=A.textures,k=A.width,ne=A.height;let J=i.COLOR_BUFFER_BIT;const re=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ue=n.get(A),q=v.length>1;if(q)for(let le=0;le<v.length;le++)t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,ue.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglFramebuffer);for(let le=0;le<v.length;le++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(J|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(J|=i.STENCIL_BUFFER_BIT)),q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ue.__webglColorRenderbuffer[le]);const C=n.get(v[le]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,C,0)}i.blitFramebuffer(0,0,k,ne,0,0,k,ne,J,i.NEAREST),o===!0&&(Wt.length=0,Wt.push(i.COLOR_ATTACHMENT0+le),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&Wt.push(re),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Wt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),q)for(let le=0;le<v.length;le++){t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,ue.__webglColorRenderbuffer[le]);const C=n.get(v[le]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,ue.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.TEXTURE_2D,C,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,ue.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&o){const v=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function st(A){return Math.min(s.maxSamples,A.samples)}function pe(A){const v=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function pt(A){const v=r.render.frame;d.get(A)!==v&&(d.set(A,v),A.update())}function Ce(A,v){const k=A.colorSpace,ne=A.format,J=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||k!==Es&&k!==Nn&&(We.getTransfer(k)===je?(ne!==cn||J!==Bt)&&Pe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Ye("WebGLTextures: Unsupported texture color space:",k)),v}function Ie(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Ne,this.resetTextureUnits=ee,this.getTextureUnits=te,this.setTextureUnits=Ee,this.setTexture2D=ve,this.setTexture2DArray=Me,this.setTexture3D=Re,this.setTextureCube=_e,this.rebindTextures=Gt,this.setupRenderTarget=Vt,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=it,this.setupDepthRenderbuffer=Ht,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=pe,this.dispose=V}function um(i,e){function t(n,s=Nn){let a;const r=We.getTransfer(s);if(n===Bt)return i.UNSIGNED_BYTE;if(n===lr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===cr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Qo)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===el)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Jo)return i.BYTE;if(n===jo)return i.SHORT;if(n===Ni)return i.UNSIGNED_SHORT;if(n===or)return i.INT;if(n===hn)return i.UNSIGNED_INT;if(n===ln)return i.FLOAT;if(n===fn)return i.HALF_FLOAT;if(n===tl)return i.ALPHA;if(n===nl)return i.RGB;if(n===cn)return i.RGBA;if(n===kn)return i.DEPTH_COMPONENT;if(n===Fn)return i.DEPTH_STENCIL;if(n===il)return i.RED;if(n===dr)return i.RED_INTEGER;if(n===Yn)return i.RG;if(n===ur)return i.RG_INTEGER;if(n===hr)return i.RGBA_INTEGER;if(n===ms||n===gs||n===vs||n===_s)if(r===je)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===ms)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===gs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===vs)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===_s)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===ms)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===gs)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===vs)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===_s)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ya||n===ba||n===Ea||n===Ta)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===ya)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ba)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ea)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ta)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Aa||n===wa||n===Ra||n===Ca||n===La||n===ys||n===Pa)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Aa||n===wa)return r===je?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===Ra)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(n===Ca)return a.COMPRESSED_R11_EAC;if(n===La)return a.COMPRESSED_SIGNED_R11_EAC;if(n===ys)return a.COMPRESSED_RG11_EAC;if(n===Pa)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ia||n===Da||n===Na||n===Ua||n===Fa||n===ka||n===Oa||n===za||n===Ba||n===Ha||n===Ga||n===Va||n===Wa||n===$a)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Ia)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Da)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Na)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ua)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fa)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===ka)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Oa)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===za)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ba)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ha)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Ga)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Va)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Wa)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===$a)return r===je?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Xa||n===qa||n===Ka)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===Xa)return r===je?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===qa)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ka)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ya||n===Za||n===bs||n===Ja)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===Ya)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Za)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===bs)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ja)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===mi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const hm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fm=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class pm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new gl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Zn({vertexShader:hm,fragmentShader:fm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new un(new Is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mm extends Jn{constructor(e,t){super();const n=this;let s=null,a=1,r=null,l="local-floor",o=1,c=null,d=null,h=null,u=null,g=null,_=null;const E=typeof XRWebGLBinding<"u",f=new pm,p={},S=t.getContextAttributes();let T=null,b=null;const R=[],w=[],m=new Be;let y=null,N=null;const M=new Qt;M.viewport=new lt;const L=new Qt;L.viewport=new lt;const U=[M,L],W=new Ad;let I=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ve=R[Y];return ve===void 0&&(ve=new Ys,R[Y]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(Y){let ve=R[Y];return ve===void 0&&(ve=new Ys,R[Y]=ve),ve.getGripSpace()},this.getHand=function(Y){let ve=R[Y];return ve===void 0&&(ve=new Ys,R[Y]=ve),ve.getHandSpace()};function Q(Y){const ve=w.indexOf(Y.inputSource);if(ve===-1)return;const Me=R[ve];Me!==void 0&&(Me.update(Y.inputSource,Y.frame,c||r),Me.dispatchEvent({type:Y.type,data:Y.inputSource}))}function B(){s.removeEventListener("select",Q),s.removeEventListener("selectstart",Q),s.removeEventListener("selectend",Q),s.removeEventListener("squeeze",Q),s.removeEventListener("squeezestart",Q),s.removeEventListener("squeezeend",Q),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",ie);for(let Y=0;Y<R.length;Y++){const ve=w[Y];ve!==null&&(w[Y]=null,R[Y].disconnect(ve))}I=null,V=null,f.reset();for(const Y in p)delete p[Y];if(e.setRenderTarget(T),g=null,u=null,h=null,s=null,b=null,Ne.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(m.width,m.height,!1),N!==null){const Y=N.camera;Y.fov=N.fov,Y.zoom=N.zoom,Y.updateProjectionMatrix(),N=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){a=Y,n.isPresenting===!0&&Pe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){l=Y,n.isPresenting===!0&&Pe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:g},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",Q),s.addEventListener("selectstart",Q),s.addEventListener("selectend",Q),s.addEventListener("squeeze",Q),s.addEventListener("squeezestart",Q),s.addEventListener("squeezeend",Q),s.addEventListener("end",B),s.addEventListener("inputsourceschange",ie),S.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(m),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let Me=null,Re=null,_e=null;S.depth&&(_e=S.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Me=S.stencil?Fn:kn,Re=S.stencil?mi:hn);const Fe={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:a};h=this.getBinding(),u=h.createProjectionLayer(Fe),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),b=new dn(u.textureWidth,u.textureHeight,{format:cn,type:Bt,depthTexture:new gi(u.textureWidth,u.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,Me),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const Me={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:a};g=new XRWebGLLayer(s,t,Me),s.updateRenderState({baseLayer:g}),e.setPixelRatio(1),e.setSize(g.framebufferWidth,g.framebufferHeight,!1),b=new dn(g.framebufferWidth,g.framebufferHeight,{format:cn,type:Bt,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:g.ignoreDepthValues===!1,resolveStencilBuffer:g.ignoreDepthValues===!1,storeMultisampledDepthBuffer:g.ignoreDepthValues===!1,storeMultisampledStencilBuffer:g.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(o),c=null,r=await s.requestReferenceSpace(l),Ne.setContext(s),Ne.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function ie(Y){for(let ve=0;ve<Y.removed.length;ve++){const Me=Y.removed[ve],Re=w.indexOf(Me);Re>=0&&(w[Re]=null,R[Re].disconnect(Me))}for(let ve=0;ve<Y.added.length;ve++){const Me=Y.added[ve];let Re=w.indexOf(Me);if(Re===-1){for(let Fe=0;Fe<R.length;Fe++)if(Fe>=w.length){w.push(Me),Re=Fe;break}else if(w[Fe]===null){w[Fe]=Me,Re=Fe;break}if(Re===-1)break}const _e=R[Re];_e&&_e.connect(Me)}}function X(Y,ve){ve===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ve.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;let ve=Y.near,Me=Y.far;f.texture!==null&&(f.depthNear>0&&(ve=f.depthNear),f.depthFar>0&&(Me=f.depthFar)),W.near=L.near=M.near=ve,W.far=L.far=M.far=Me,(I!==W.near||V!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),I=W.near,V=W.far),W.layers.mask=Y.layers.mask|6,M.layers.mask=W.layers.mask&-5,L.layers.mask=W.layers.mask&-3;const Re=Y.parent,_e=W.cameras;X(W,Re);for(let Fe=0;Fe<_e.length;Fe++)X(_e[Fe],Re);W.projectionMatrix.copy(M.projectionMatrix),W.projectionMatrixInverse.copy(M.projectionMatrixInverse),N===null&&Y.isPerspectiveCamera&&(N={camera:Y,fov:Y.fov,zoom:Y.zoom}),ee(Y,W,Re)};function ee(Y,ve,Me){Me===null?Y.matrix.copy(ve.matrixWorld):(Y.matrix.copy(Me.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ve.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ve.projectionMatrix),Y.projectionMatrixInverse.copy(ve.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Qa*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(u===null&&g===null))return o},this.setFoveation=function(Y){o=Y,u!==null&&(u.fixedFoveation=Y),g!==null&&g.fixedFoveation!==void 0&&(g.fixedFoveation=Y)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(W)},this.getCameraTexture=function(Y){return p[Y]};let te=null;function Ee(Y,ve){if(d=ve.getViewerPose(c||r),_=ve,d!==null){const Me=d.views;g!==null&&(e.setRenderTargetFramebuffer(b,g.framebuffer),e.setRenderTarget(b));let Re=!1;Me.length!==W.cameras.length&&(W.cameras.length=0,Re=!0);for(let Le=0;Le<Me.length;Le++){const Ze=Me[Le];let Qe=null;if(g!==null)Qe=g.getViewport(Ze);else{const yt=h.getViewSubImage(u,Ze);Qe=yt.viewport,Le===0&&(e.setRenderTargetTextures(b,yt.colorTexture,yt.depthStencilTexture),e.setRenderTarget(b))}let He=U[Le];He===void 0&&(He=new Qt,He.layers.enable(Le),He.viewport=new lt,U[Le]=He),He.matrix.fromArray(Ze.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(Ze.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(Qe.x,Qe.y,Qe.width,Qe.height),Le===0&&(W.matrix.copy(He.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),Re===!0&&W.cameras.push(He)}const _e=s.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&E){h=n.getBinding();const Le=h.getDepthInformation(Me[0]);Le&&Le.isValid&&Le.texture&&f.init(Le,s.renderState)}if(_e&&_e.includes("camera-access")&&E){e.state.unbindTexture(),h=n.getBinding();for(let Le=0;Le<Me.length;Le++){const Ze=Me[Le].camera;if(Ze){let Qe=p[Ze];Qe||(Qe=new gl,p[Ze]=Qe);const He=h.getCameraImage(Ze);Qe.sourceTexture=He}}}}for(let Me=0;Me<R.length;Me++){const Re=w[Me],_e=R[Me];Re!==null&&_e!==void 0&&_e.update(Re,ve,c||r)}te&&te(Y,ve),ve.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ve}),_=null}const Ne=new Ml;Ne.setAnimationLoop(Ee),this.setAnimationLoop=function(Y){te=Y},this.dispose=function(){}}}const gm=new ct,Pl=new De;Pl.set(-1,0,0,0,1,0,0,0,1);function vm(i,e){function t(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,vl(i)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,S,T,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(f,p):p.isMeshLambertMaterial?(a(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(f,p),h(f,p)):p.isMeshPhongMaterial?(a(f,p),d(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(f,p),u(f,p),p.isMeshPhysicalMaterial&&g(f,p,b)):p.isMeshMatcapMaterial?(a(f,p),_(f,p)):p.isMeshDepthMaterial?a(f,p):p.isMeshDistanceMaterial?(a(f,p),E(f,p)):p.isMeshNormalMaterial?a(f,p):p.isLineBasicMaterial?(r(f,p),p.isLineDashedMaterial&&l(f,p)):p.isPointsMaterial?o(f,p,S,T):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,t(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===kt&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,t(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===kt&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,t(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,t(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const S=e.get(p),T=S.envMap,b=S.envMapRotation;T&&(f.envMap.value=T,f.envMapRotation.value.setFromMatrix4(gm.makeRotationFromEuler(b)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply(Pl),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,f.aoMapTransform))}function r(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform))}function l(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function o(f,p,S,T){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*S,f.scale.value=T*.5,p.map&&(f.map.value=p.map,t(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function d(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function h(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function u(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function g(f,p,S){f.ior.value=p.ior,p.diffuseRoughness>0&&(f.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===kt&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.retroreflectivity>0&&(f.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=S.texture,f.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,p){p.matcap&&(f.matcap.value=p.matcap)}function E(f,p){const S=e.get(p).light;f.referencePosition.value.setFromMatrixPosition(S.matrixWorld),f.nearDistance.value=S.shadow.camera.near,f.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function _m(i,e,t,n){let s={},a={};function r(S,T){const b=T.program;n.uniformBlockBinding(S,b,s[S.id])}function l(S,T){let b=s[S.id];b===void 0&&(_(S),b=o(S),s[S.id]=b,S.addEventListener("dispose",f));const R=T.program;n.updateUBOMapping(S,R);const w=e.render.frame;a[S.id]!==w&&(c(S),a[S.id]=w)}function o(S){const T=i.createBuffer(),b=S.__size,R=S.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,b,R),i.bindBuffer(i.UNIFORM_BUFFER,null),T}function c(S){const T=s[S.id],b=S.uniforms,R=S.__cache;i.bindBuffer(i.UNIFORM_BUFFER,T);for(let w=0,m=b.length;w<m;w++){const y=b[w];if(Array.isArray(y))for(let N=0,M=y.length;N<M;N++)d(y[N],w,N,R);else d(y,w,0,R)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function d(S,T,b,R){if(u(S,T,b,R)===!0){const w=S.__offset,m=S.value;if(Array.isArray(m)){let y=0;for(let N=0;N<m.length;N++){const M=m[N],L=E(M,!0);h(M,S.__data,y),y+=L.storage/Float32Array.BYTES_PER_ELEMENT}}else h(m,S.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,w,S.__data)}}function h(S,T,b){typeof S=="number"||typeof S=="boolean"?T[b]=S:S.isMatrix3?(T[b]=S.elements[0],T[b+1]=S.elements[1],T[b+2]=S.elements[2],T[b+3]=0,T[b+4]=S.elements[3],T[b+5]=S.elements[4],T[b+6]=S.elements[5],T[b+7]=0,T[b+8]=S.elements[6],T[b+9]=S.elements[7],T[b+10]=S.elements[8],T[b+11]=0):ArrayBuffer.isView(S)?T.set(S.subarray(0,T.length-b),b):S.toArray(T,b)}function u(S,T,b,R){const w=S.value,m=T+"_"+b;if(Array.isArray(w)){R[m]===void 0&&(R[m]=[]);const y=R[m];let N=!1;for(let M=0;M<w.length;M++)g(w[M],y,M)===!0&&(N=!0);return N}return g(w,R,m)}function g(S,T,b){if(T[b]===void 0)return typeof S=="number"||typeof S=="boolean"?T[b]=S:ArrayBuffer.isView(S)?T[b]=S.slice():T[b]=S.clone(),!0;{const R=T[b];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return T[b]=S,!0}else{if(ArrayBuffer.isView(S))return!0;if(R.equals(S)===!1)return R.copy(S),!0}}return!1}function _(S){const T=S.uniforms;let b=0;const R=16;for(let m=0,y=T.length;m<y;m++){const N=Array.isArray(T[m])?T[m]:[T[m]];for(let M=0,L=N.length;M<L;M++){const U=N[M],W=Array.isArray(U.value)?U.value:[U.value],I=Array.isArray(T[m])||Array.isArray(U.value);let V=b;for(let B=0,ie=W.length;B<ie;B++){const X=W[B],ee=E(X,I),te=b%R,Ee=te%ee.boundary,Ne=te+Ee;b+=Ee,Ne!==0&&R-Ne<ee.storage&&(b+=R-Ne),B===0&&(V=b),b+=ee.storage}const Q=U.type==="int"?Int32Array:U.type==="uint"?Uint32Array:Float32Array;U.__data=new Q((b-V)/Float32Array.BYTES_PER_ELEMENT),U.__offset=V}}const w=b%R;return w>0&&(b+=R-w),S.__size=b,S.__cache={},this}function E(S,T){const b={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(b.boundary=4,b.storage=4):S.isVector2?(b.boundary=8,b.storage=8):S.isVector3||S.isColor?(b.boundary=16,b.storage=12):S.isVector4?(b.boundary=16,b.storage=16):S.isMatrix3?(b.boundary=16,b.storage=48):S.isMatrix4?(b.boundary=16,b.storage=64):S.isTexture?Pe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(b.boundary=16,b.storage=S.byteLength):Pe("WebGLRenderer: Unsupported uniform value type.",S),T===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function f(S){const T=S.target;T.removeEventListener("dispose",f),i.deleteBuffer(s[T.id]),delete s[T.id],delete a[T.id]}function p(){for(const S in s)i.deleteBuffer(s[S]);s={},a={}}return{bind:r,update:l,dispose:p}}const xm=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let an=null;function Sm(){return an===null&&(an=new fd(xm,16,16,Yn,fn),an.name="DFG_LUT",an.minFilter=Ut,an.magFilter=Ut,an.wrapS=Mn,an.wrapT=Mn,an.generateMipmaps=!1,an.needsUpdate=!0),an}class Mm{constructor(e={}){const{canvas:t=Oc(),context:n=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:l=!1,premultipliedAlpha:o=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:g=Bt}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=r;const E=g,f=new Set([hr,ur,dr]),p=new Set([Bt,hn,Ni,mi,lr,cr]),S=new Uint32Array(4),T=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]};let R=null,w=null;const m=[],y=[];let N=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=bn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const M=this;let L=!1,U=null,W=null,I=null,V=null;this._outputColorSpace=Xt;let Q=0,B=0,ie=null,X=-1,ee=null;const te=new lt,Ee=new lt;let Ne=null;const Y=new qe(0);let ve=0,Me=t.width,Re=t.height,_e=1,Fe=null,dt=null;const Le=new lt(0,0,Me,Re),Ze=new lt(0,0,Me,Re);let Qe=!1;const He=new Fi,yt=new gr;let ft=!1,Nt=!1;const rt=new ct,nn=new z,vt=new lt,Ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Gt=!1;function Vt(){return ie===null?_e:1}let D=n;function Wt(x,P){return t.getContext(x,P)}let it,st,pe,pt,Ce,Ie,A,v,k,ne,J,re,ue,q,K,le,C,Z,$,ce,ae,oe,Ae;try{const x={alpha:!0,depth:s,stencil:a,antialias:l,premultipliedAlpha:o,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${rr}`),t.addEventListener("webglcontextlost",we,!1),t.addEventListener("webglcontextrestored",ke,!1),t.addEventListener("webglcontextcreationerror",me,!1),D===null){const P="webgl2";if(D=Wt(P,x),D===null)throw Wt(P)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Oe()}catch(x){throw t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",me,!1),Ye("WebGLRenderer: "+x.message),x}function Oe(){it=new Ef(D),it.init(),ae=new um(D,it),st=new ff(D,it,e,ae),pe=new cm(D,it),st.reversedDepthBuffer&&u&&pe.buffers.depth.setReversed(!0),W=D.createFramebuffer(),I=D.createFramebuffer(),V=D.createFramebuffer(),pt=new wf(D),Ce=new Yp,Ie=new dm(D,it,pe,Ce,st,ae,pt),A=new bf(M),v=new Rd(D),oe=new uf(D,v),k=new Tf(D,v,pt,oe),ne=new Cf(D,k,v,oe,pt),Z=new Rf(D,st,Ie),K=new pf(Ce),J=new Kp(M,A,it,st,oe,K),re=new vm(M,Ce),ue=new Jp,q=new im(it),C=new df(M,A,pe,ne,_,o),le=new lm(M,ne,st),Ae=new _m(D,pt,st,pe),$=new hf(D,it,pt),ce=new Af(D,it,pt),pt.programs=J.programs,M.capabilities=st,M.extensions=it,M.properties=Ce,M.renderLists=ue,M.shadowMap=le,M.state=pe,M.info=pt}E!==Bt&&(N=new Pf(E,t.width,t.height,l,s,a));const se=new mm(M,D);this.xr=se,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const x=it.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=it.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return _e},this.setPixelRatio=function(x){x!==void 0&&(_e=x,this.setSize(Me,Re,!1))},this.getSize=function(x){return x.set(Me,Re)},this.setSize=function(x,P,H=!0){if(se.isPresenting){Pe("WebGLRenderer: Can't change size while VR device is presenting.");return}Me=x,Re=P,t.width=Math.floor(x*_e),t.height=Math.floor(P*_e),H===!0&&(t.style.width=x+"px",t.style.height=P+"px"),N!==null&&N.setSize(t.width,t.height),this.setViewport(0,0,x,P)},this.getDrawingBufferSize=function(x){return x.set(Me*_e,Re*_e).floor()},this.setDrawingBufferSize=function(x,P,H){Me=x,Re=P,_e=H,t.width=Math.floor(x*H),t.height=Math.floor(P*H),this.setViewport(0,0,x,P)},this.setEffects=function(x){if(E===Bt){Ye("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let P=0;P<x.length;P++)if(x[P].isOutputPass===!0){Pe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}N.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(te)},this.getViewport=function(x){return x.copy(Le)},this.setViewport=function(x,P,H,F){x.isVector4?Le.set(x.x,x.y,x.z,x.w):Le.set(x,P,H,F),pe.viewport(te.copy(Le).multiplyScalar(Vt()).round())},this.getScissor=function(x){return x.copy(Ze)},this.setScissor=function(x,P,H,F){x.isVector4?Ze.set(x.x,x.y,x.z,x.w):Ze.set(x,P,H,F),pe.scissor(Ee.copy(Ze).multiplyScalar(Vt()).round())},this.getScissorTest=function(){return Qe},this.setScissorTest=function(x){pe.setScissorTest(Qe=x)},this.setOpaqueSort=function(x){Fe=x},this.setTransparentSort=function(x){dt=x},this.getClearColor=function(x){return x.copy(C.getClearColor())},this.setClearColor=function(){C.setClearColor(...arguments)},this.getClearAlpha=function(){return C.getClearAlpha()},this.setClearAlpha=function(){C.setClearAlpha(...arguments)},this.clear=function(x=!0,P=!0,H=!0){let F=0;if(x){let O=!1;if(ie!==null){const he=ie.texture.format;O=f.has(he)}if(O){const he=ie.texture.type,Se=p.has(he),de=C.getClearColor(),xe=C.getClearAlpha(),Te=de.r,Ue=de.g,Ge=de.b;Se?(S[0]=Te,S[1]=Ue,S[2]=Ge,S[3]=xe,D.clearBufferuiv(D.COLOR,0,S)):(T[0]=Te,T[1]=Ue,T[2]=Ge,T[3]=xe,D.clearBufferiv(D.COLOR,0,T))}else F|=D.COLOR_BUFFER_BIT}P&&(F|=D.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),H&&(F|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&D.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(x){x.setRenderer(this),U=x},this.dispose=function(){t.removeEventListener("webglcontextlost",we,!1),t.removeEventListener("webglcontextrestored",ke,!1),t.removeEventListener("webglcontextcreationerror",me,!1),C.dispose(),ue.dispose(),q.dispose(),Ie.dispose(),Ce.dispose(),A.dispose(),ne.dispose(),k.dispose(),oe.dispose(),Ae.dispose(),J.dispose(),se.dispose(),se.removeEventListener("sessionstart",Cr),se.removeEventListener("sessionend",Lr),zn.stop()};function we(x){x.preventDefault(),Kr("WebGLRenderer: Context Lost."),L=!0}function ke(){Kr("WebGLRenderer: Context Restored."),L=!1;const x=pt.autoReset,P=le.enabled,H=le.autoUpdate,F=le.needsUpdate,O=le.type;Oe(),pt.autoReset=x,le.enabled=P,le.autoUpdate=H,le.needsUpdate=F,le.type=O}function me(x){Ye("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function Je(x){const P=x.target;P.removeEventListener("dispose",Je),_t(P)}function _t(x){An(x),Ce.remove(x)}function An(x){const P=Ce.get(x).programs;P!==void 0&&(P.forEach(function(H){J.releaseProgram(H)}),x.isShaderMaterial&&J.releaseShaderCache(x))}this.renderBufferDirect=function(x,P,H,F,O,he){P===null&&(P=Ht);const Se=O.isMesh&&O.matrixWorld.determinantAffine()<0,de=zl(x,P,H,F,O);pe.setMaterial(F,Se);let xe=H.index,Te=1;if(F.wireframe===!0){if(xe=k.getWireframeAttribute(H),xe===void 0)return;Te=2}const Ue=H.drawRange,Ge=H.attributes.position;let ye=Ue.start*Te,Ve=(Ue.start+Ue.count)*Te;he!==null&&(ye=Math.max(ye,he.start*Te),Ve=Math.min(Ve,(he.start+he.count)*Te)),xe!==null?(ye=Math.max(ye,0),Ve=Math.min(Ve,xe.count)):Ge!=null&&(ye=Math.max(ye,0),Ve=Math.min(Ve,Ge.count));const ut=Ve-ye;if(ut<0||ut===1/0)return;oe.setup(O,F,de,H,xe);let tt,et=$;if(xe!==null&&(tt=v.get(xe),et=ce,et.setIndex(tt)),O.isMesh)F.wireframe===!0?(pe.setLineWidth(F.wireframeLinewidth*Vt()),et.setMode(D.LINES)):et.setMode(D.TRIANGLES);else if(O.isLine){let Tt=F.linewidth;Tt===void 0&&(Tt=1),pe.setLineWidth(Tt*Vt()),O.isLineSegments?et.setMode(D.LINES):O.isLineLoop?et.setMode(D.LINE_LOOP):et.setMode(D.LINE_STRIP)}else O.isPoints?et.setMode(D.POINTS):O.isSprite&&et.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(it.get("WEBGL_multi_draw"))et.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Tt=O._multiDrawStarts,be=O._multiDrawCounts,Lt=O._multiDrawCount,Ke=xe?v.get(xe).bytesPerElement:1,Bn=Ce.get(F).currentProgram.getUniforms();for(let At=0;At<Lt;At++)Bn.setValue(D,"_gl_DrawID",At),et.render(Tt[At]/Ke,be[At])}else if(O.isInstancedMesh)et.renderInstances(ye,ut,O.count);else if(H.isInstancedBufferGeometry){const Tt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,be=Math.min(H.instanceCount,Tt);et.renderInstances(ye,ut,be)}else et.render(ye,ut)};function Rr(x,P,H,F){U!==null&&x.isNodeMaterial&&U.setObject(F,x),ft===!0&&K.setState(x,H,!1),x.transparent===!0&&x.side===Sn&&x.forceSinglePass===!1?(x.side=kt,x.needsUpdate=!0,Mi(x,P,F),x.side=Kn,x.needsUpdate=!0,Mi(x,P,F),x.side=Sn):Mi(x,P,F)}this.compile=function(x,P,H=null){H===null&&(H=x),U!==null&&U.renderStart(x,P,H),w=q.get(H),w.init(P),y.push(w),H.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),x!==H&&x.traverseVisible(function(O){O.isLight&&O.layers.test(P.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),w.setupLights(),U!==null&&U.updateLights(w.state.lightsArray),Nt=this.localClippingEnabled,ft=K.init(this.clippingPlanes,Nt),ft===!0&&K.setGlobalState(this.clippingPlanes,P),U!==null&&le.render(w.state.shadowsArray,H,P);const F=new Set;return x.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const he=O.material;if(he)if(Array.isArray(he))for(let Se=0;Se<he.length;Se++){const de=he[Se];Rr(de,H,P,O),F.add(de)}else Rr(he,H,P,O),F.add(he)}),w=y.pop(),U!==null&&U.renderEnd(),F},this.compileAsync=function(x,P,H=null){const F=this.compile(x,P,H);return new Promise(O=>{function he(){if(F.forEach(function(Se){const xe=Ce.get(Se).currentProgram;(xe===void 0||xe.isReady())&&F.delete(Se)}),F.size===0){O(x);return}setTimeout(he,10)}it.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Fs=null;function kl(x){Fs&&Fs(x)}function Cr(){zn.stop()}function Lr(){zn.start()}const zn=new Ml;zn.setAnimationLoop(kl),typeof self<"u"&&zn.setContext(self),this.setAnimationLoop=function(x){Fs=x,se.setAnimationLoop(x),x===null?zn.stop():zn.start()},se.addEventListener("sessionstart",Cr),se.addEventListener("sessionend",Lr),this.render=function(x,P){if(P!==void 0&&P.isCamera!==!0){Ye("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;U!==null&&U.renderStart(x,P);const H=se.enabled===!0&&se.isPresenting===!0,F=N!==null&&(ie===null||H)&&N.begin(M,ie);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),P.parent===null&&P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),se.enabled===!0&&se.isPresenting===!0&&(N===null||N.isCompositing()===!1)&&(se.cameraAutoUpdate===!0&&se.updateCamera(P),P=se.getCamera()),x.isScene===!0&&x.onBeforeRender(M,x,P,ie),w=q.get(x,y.length),w.init(P),w.state.textureUnits=Ie.getTextureUnits(),y.push(w),rt.multiplyMatrices(P.projectionMatrix,P.matrixWorldInverse),P.isArrayCamera?yt.setFromArrayCamera(P):He.setFromProjectionMatrix(rt,tn,P.reversedDepth),Nt=this.localClippingEnabled,ft=K.init(this.clippingPlanes,Nt),R=ue.get(x,m.length),R.init(),m.push(R),this.info.render.frame++,se.enabled===!0&&se.isPresenting===!0){const Se=M.xr.getDepthSensingMesh();Se!==null&&ks(Se,P,-1/0,M.sortObjects)}ks(x,P,0,M.sortObjects),R.finish(),U!==null&&U.updateLights(w.state.lightsArray),M.sortObjects===!0&&R.sort(Fe,dt),Gt=se.enabled===!1||se.isPresenting===!1||se.hasDepthSensing()===!1,Gt&&C.addToRenderList(R,x),this.info.autoReset===!0&&this.info.reset(),ft===!0&&K.beginShadows();const O=w.state.shadowsArray;if(le.render(O,x,P),ft===!0&&K.endShadows(),(F&&N.hasRenderPass())===!1){const Se=R.opaque,de=R.transmissive;if(w.setupLights(),P.isArrayCamera){const xe=P.cameras;if(de.length>0)for(let Te=0,Ue=xe.length;Te<Ue;Te++){const Ge=xe[Te];Ir(Se,de,x,Ge)}Gt&&C.render(x);for(let Te=0,Ue=xe.length;Te<Ue;Te++){const Ge=xe[Te];Pr(R,x,Ge,Ge.viewport)}}else de.length>0&&Ir(Se,de,x,P),Gt&&C.render(x),Pr(R,x,P)}ie!==null&&B===0&&(Ie.updateMultisampleRenderTarget(ie),Ie.updateRenderTargetMipmap(ie)),F&&N.end(M),x.isScene===!0&&x.onAfterRender(M,x,P),oe.resetDefaultState(),X=-1,ee=null,y.pop(),y.length>0?(w=y[y.length-1],Ie.setTextureUnits(w.state.textureUnits),ft===!0&&K.setGlobalState(M.clippingPlanes,w.state.camera)):w=null,m.pop(),m.length>0?R=m[m.length-1]:R=null,U!==null&&U.renderEnd()};function ks(x,P,H,F){if(x.visible===!1)return;if(x.layers.test(P.layers)){if(x.isGroup)H=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(P);else if(x.isLight)w.pushLight(x),x.castShadow&&w.pushShadow(x);else if(x.isSprite){const Se=P.isArrayCamera?yt:He;if(!x.frustumCulled||x.intersectsFrustum(Se)){F&&vt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(rt);const de=ne.update(x),xe=x.material;xe.visible&&R.push(x,de,xe,H,vt.z,null,P)}}else if(x.isMesh||x.isLine||x.isPoints){const Se=P.isArrayCamera?yt:He;if(!x.frustumCulled||x.intersectsFrustum(Se)){const de=ne.update(x),xe=x.material;if(F&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),vt.copy(x.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),vt.copy(de.boundingSphere.center)),vt.applyMatrix4(x.matrixWorld).applyMatrix4(rt)),Array.isArray(xe)){const Te=de.groups;for(let Ue=0,Ge=Te.length;Ue<Ge;Ue++){const ye=Te[Ue],Ve=xe[ye.materialIndex];Ve&&Ve.visible&&R.push(x,de,Ve,H,vt.z,ye,P)}}else xe.visible&&R.push(x,de,xe,H,vt.z,null,P)}}}const he=x.children;for(let Se=0,de=he.length;Se<de;Se++)ks(he[Se],P,H,F)}function Pr(x,P,H,F){const{opaque:O,transmissive:he,transparent:Se}=x;w.setupLightsView(H),ft===!0&&K.setGlobalState(M.clippingPlanes,H),F&&pe.viewport(te.copy(F)),O.length>0&&Wi(O,P,H),he.length>0&&Wi(he,P,H),Se.length>0&&Wi(Se,P,H),pe.buffers.depth.setTest(!0),pe.buffers.depth.setMask(!0),pe.buffers.color.setMask(!0),pe.setPolygonOffset(!1)}function Ir(x,P,H,F){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[F.id]===void 0){const ye=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[F.id]=new dn(1,1,{generateMipmaps:!0,type:ye?fn:Bt,minFilter:Un,samples:Math.max(4,st.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:We.workingColorSpace})}const he=w.state.transmissionRenderTarget[F.id],Se=F.viewport||te;he.setSize(Se.z*M.transmissionResolutionScale,Se.w*M.transmissionResolutionScale);const de=M.getRenderTarget(),xe=M.getActiveCubeFace(),Te=M.getActiveMipmapLevel();M.setRenderTarget(he),M.getClearColor(Y),ve=M.getClearAlpha(),ve<1&&M.setClearColor(16777215,.5),M.clear(),Gt&&C.render(H);const Ue=M.toneMapping;M.toneMapping=bn;const Ge=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),w.setupLightsView(F),ft===!0&&K.setGlobalState(M.clippingPlanes,F),Wi(x,H,F),Ie.updateMultisampleRenderTarget(he),Ie.updateRenderTargetMipmap(he),it.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let Ve=0,ut=P.length;Ve<ut;Ve++){const tt=P[Ve],{object:et,geometry:Tt,material:be,group:Lt}=tt;if(be.side===Sn&&et.layers.test(F.layers)){const Ke=be.side;be.side=kt,be.needsUpdate=!0,Dr(et,H,F,Tt,be,Lt),be.side=Ke,be.needsUpdate=!0,ye=!0}}ye===!0&&(Ie.updateMultisampleRenderTarget(he),Ie.updateRenderTargetMipmap(he))}M.setRenderTarget(de,xe,Te),M.setClearColor(Y,ve),Ge!==void 0&&(F.viewport=Ge),M.toneMapping=Ue}function Wi(x,P,H){const F=P.isScene===!0?P.overrideMaterial:null;for(let O=0,he=x.length;O<he;O++){const Se=x[O],{object:de,geometry:xe,group:Te}=Se;let Ue=Se.material;Ue.allowOverride===!0&&F!==null&&(Ue=F),de.layers.test(H.layers)&&Dr(de,P,H,xe,Ue,Te)}}function Dr(x,P,H,F,O,he){U!==null&&O.isNodeMaterial&&U.setObject(x,O),x.onBeforeRender(M,P,H,F,O,he),x.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),O.onBeforeRender(M,P,H,F,x,he),O.transparent===!0&&O.side===Sn&&O.forceSinglePass===!1?(O.side=kt,O.needsUpdate=!0,M.renderBufferDirect(H,P,F,O,x,he),O.side=Kn,O.needsUpdate=!0,M.renderBufferDirect(H,P,F,O,x,he),O.side=Sn):M.renderBufferDirect(H,P,F,O,x,he),x.onAfterRender(M,P,H,F,O,he)}function Nr(x){let P=0;for(const H of x)H.texture!==null&&P++;return P}function Mi(x,P,H){P.isScene!==!0&&(P=Ht);const F=Ce.get(x),O=w.state.lights,he=w.state.shadowsArray,Se=O.state.version,de=J.getParameters(x,O.state,he,P,H,w.state.lightProbeGridArray),xe=J.getProgramCacheKey(de);let Te=F.programs;F.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?P.environment:null,F.fog=P.fog;const Ue=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;F.envMap=A.get(x.envMap||F.environment,Ue),F.envMapRotation=F.environment!==null&&x.envMap===null?P.environmentRotation:x.envMapRotation,Te===void 0&&(x.addEventListener("dispose",Je),Te=new Map,F.programs=Te,F.programVariants=new Map);let Ge=Te.get(xe);if(Ge!==void 0){if(F.currentProgram===Ge&&F.lightsStateVersion===Se)return Fr(x,de),Ge}else de.uniforms=J.getUniforms(x),U!==null&&x.isNodeMaterial&&U.build(x,H,de),x.onBeforeCompile(de,M),Ge=J.acquireProgram(de,xe),Te.set(xe,Ge),F.uniforms=de.uniforms;const ye=F.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(ye.clippingPlanes=K.uniform),Fr(x,de),F.needsLights=Hl(x),F.lightsStateVersion=Se,F.needsLights&&(ye.ambientLightColor.value=O.state.ambient,ye.lightProbe.value=O.state.probe,ye.sunLights.value=O.state.sun,ye.sunLightShadows.value=O.state.sunShadow,ye.directionalLights.value=O.state.directional,ye.directionalLightShadows.value=O.state.directionalShadow,ye.spotLights.value=O.state.spot,ye.spotLightShadows.value=O.state.spotShadow,ye.rectAreaLights.value=O.state.rectArea,ye.ltc_1.value=O.state.rectAreaLTC1,ye.ltc_2.value=O.state.rectAreaLTC2,ye.pointLights.value=O.state.point,ye.pointLightShadows.value=O.state.pointShadow,ye.hemisphereLights.value=O.state.hemi,ye.sunShadowMatrix.value=O.state.sunShadowMatrix,ye.sunShadowCascade.value=O.state.sunShadowCascade,ye.directionalShadowMatrix.value=O.state.directionalShadowMatrix,ye.spotLightMatrix.value=O.state.spotLightMatrix,ye.spotLightMap.value=O.state.spotLightMap,ye.pointShadowMatrix.value=O.state.pointShadowMatrix),F.numLightProbeGrids=Nr(w.state.lightProbeGridArray),F.currentProgram=Ge,F.uniformsList=null,Ge}function Ol(x,P,H,F,O){const he=Ce.get(x),Se=he.currentProgram.id+","+F+","+O;let de=he.programVariants.get(Se);return de===void 0?(de=Mi(x,P,H),he.programVariants.set(Se,de)):(he.currentProgram=de,he.uniformsList=null,he.outputColorSpace=F,he.toneMapping=O),de}function Ur(x){if(x.uniformsList===null){const P=x.currentProgram.getUniforms();x.uniformsList=Ss.seqWithValue(P.seq,x.uniforms)}return x.uniformsList}function Fr(x,P){const H=Ce.get(x);H.outputColorSpace=P.outputColorSpace,H.batching=P.batching,H.batchingColor=P.batchingColor,H.instancing=P.instancing,H.instancingColor=P.instancingColor,H.instancingMorph=P.instancingMorph,H.skinning=P.skinning,H.morphTargets=P.morphTargets,H.morphNormals=P.morphNormals,H.morphColors=P.morphColors,H.morphTargetsCount=P.morphTargetsCount,H.numClippingPlanes=P.numClippingPlanes,H.numIntersection=P.numClipIntersection,H.vertexAlphas=P.vertexAlphas,H.vertexTangents=P.vertexTangents,H.toneMapping=P.toneMapping}function zl(x,P,H,F,O){P.isScene!==!0&&(P=Ht),Ie.resetTextureUnits();const he=P.fog,Se=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?P.environment:null,de=ie===null?M.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:We.workingColorSpace,xe=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,Te=A.get(F.envMap||Se,xe),Ue=F.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Ge=!!H.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),ye=!!H.morphAttributes.position,Ve=!!H.morphAttributes.normal,ut=!!H.morphAttributes.color;let tt=bn;F.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(tt=M.toneMapping);const et=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Tt=et!==void 0?et.length:0,be=Ce.get(F),Lt=w.state.lights;if(ft===!0&&(Nt===!0||x!==ee)){const ot=x===ee&&F.id===X;K.setState(F,x,ot)}let Ke=!1,Bn=!1;F.version===be.__version?be.needsLights&&be.lightsStateVersion!==Lt.state.version||O.isBatchedMesh&&be.batching===!1||!O.isBatchedMesh&&be.batching===!0||O.isBatchedMesh&&be.batchingColor===!0&&O._colorsTexture===null||O.isBatchedMesh&&be.batchingColor===!1&&O._colorsTexture!==null||O.isInstancedMesh&&be.instancing===!1||!O.isInstancedMesh&&be.instancing===!0||O.isSkinnedMesh&&be.skinning===!1||!O.isSkinnedMesh&&be.skinning===!0||O.isInstancedMesh&&be.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&be.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&be.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&be.instancingMorph===!1&&O.morphTexture!==null||be.envMap!==Te||F.fog===!0&&be.fog!==he||be.numClippingPlanes!==void 0&&(be.numClippingPlanes!==K.numPlanes||be.numIntersection!==K.numIntersection)||be.vertexAlphas!==Ue||be.vertexTangents!==Ge||be.morphTargets!==ye||be.morphNormals!==Ve||be.morphColors!==ut||be.morphTargetsCount!==Tt||be.numLightProbeGrids!==Nr(w.state.lightProbeGridArray)?Ke=!0:(be.outputColorSpace!==de||be.toneMapping!==tt)&&(Bn=!0):(Ke=!0,be.__version=F.version);let At=be.currentProgram;(Ke===!0||Bn===!0)&&(At=Bn===!0?Ol(F,P,O,de,tt):Mi(F,P,O),U&&F.isNodeMaterial&&U.onUpdateProgram(F,At,be));let $i=!1,wn=!1,Hn=!1;const Xe=At.getUniforms(),bt=be.uniforms;if(pe.useProgram(At.program)&&($i=!0,wn=!0,Hn=!0),F.id!==X&&(X=F.id,wn=!0),$i||ee!==x){pe.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),Xe.setValue(D,"projectionMatrix",x.projectionMatrix),Xe.setValue(D,"viewMatrix",x.matrixWorldInverse);const xt=Xe.map.cameraPosition;xt!==void 0&&xt.setValue(D,nn.setFromMatrixPosition(x.matrixWorld)),st.logarithmicDepthBuffer&&Xe.setValue(D,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Xe.setValue(D,"isOrthographic",x.isOrthographicCamera===!0),ee!==x&&(ee=x,wn=!0,Hn=!0)}if(be.needsLights&&(Lt.state.sunShadowMap.length>0&&Xe.setValue(D,"sunShadowMap",Lt.state.sunShadowMap,Ie),Lt.state.directionalShadowMap.length>0&&Xe.setValue(D,"directionalShadowMap",Lt.state.directionalShadowMap,Ie),Lt.state.spotShadowMap.length>0&&Xe.setValue(D,"spotShadowMap",Lt.state.spotShadowMap,Ie),Lt.state.pointShadowMap.length>0&&Xe.setValue(D,"pointShadowMap",Lt.state.pointShadowMap,Ie)),O.isSkinnedMesh){Xe.setOptional(D,O,"bindMatrix"),Xe.setOptional(D,O,"bindMatrixInverse");const ot=O.skeleton;ot&&(ot.boneTexture===null&&ot.computeBoneTexture(),Xe.setValue(D,"boneTexture",ot.boneTexture,Ie))}O.isBatchedMesh&&(Xe.setOptional(D,O,"batchingTexture"),Xe.setValue(D,"batchingTexture",O._matricesTexture,Ie),Xe.setOptional(D,O,"batchingIdTexture"),Xe.setValue(D,"batchingIdTexture",O._indirectTexture,Ie),Xe.setOptional(D,O,"batchingColorTexture"),O._colorsTexture!==null&&Xe.setValue(D,"batchingColorTexture",O._colorsTexture,Ie));const Kt=H.morphAttributes;if((Kt.position!==void 0||Kt.normal!==void 0||Kt.color!==void 0)&&Z.update(O,H,At),(wn||be.receiveShadow!==O.receiveShadow)&&(be.receiveShadow=O.receiveShadow,Xe.setValue(D,"receiveShadow",O.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&P.environment!==null&&(bt.envMapIntensity.value=P.environmentIntensity),bt.dfgLUT!==void 0&&(bt.dfgLUT.value=Sm()),wn){if(Xe.setValue(D,"toneMappingExposure",M.toneMappingExposure),be.needsLights&&Bl(bt,Hn),he&&F.fog===!0&&re.refreshFogUniforms(bt,he),re.refreshMaterialUniforms(bt,F,_e,Re,w.state.transmissionRenderTarget[x.id]),be.needsLights&&be.numLightProbeGrids>0){const ot=b;let xt=0;for(const pn of w.state.lightProbeGridArray)pn.texture!==null&&(ot.textures[xt]=pn.texture,ot.min[xt]=pn.boundingBox.min,ot.max[xt]=pn.boundingBox.max,ot.resolution[xt]=pn.resolution,xt++);for(const pn in ot)ot[pn].length=xt;bt.probesSH.value=ot.textures,bt.probesMin.value=ot.min,bt.probesMax.value=ot.max,bt.probesResolution.value=ot.resolution}Ss.upload(D,Ur(be),bt,Ie)}if(F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(Ss.upload(D,Ur(be),bt,Ie),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Xe.setValue(D,"center",O.center),Xe.setValue(D,"modelViewMatrix",O.modelViewMatrix),Xe.setValue(D,"normalMatrix",O.normalMatrix),Xe.setValue(D,"modelMatrix",O.matrixWorld),F.uniformsGroups!==void 0){const ot=F.uniformsGroups;for(let xt=0,pn=ot.length;xt<pn;xt++){const Or=ot[xt];Ae.update(Or,At),Ae.bind(Or,At)}}return At}function Bl(x,P){x.ambientLightColor.needsUpdate=P,x.lightProbe.needsUpdate=P,x.sunLights.needsUpdate=P,x.sunLightShadows.needsUpdate=P,x.directionalLights.needsUpdate=P,x.directionalLightShadows.needsUpdate=P,x.pointLights.needsUpdate=P,x.pointLightShadows.needsUpdate=P,x.spotLights.needsUpdate=P,x.spotLightShadows.needsUpdate=P,x.rectAreaLights.needsUpdate=P,x.hemisphereLights.needsUpdate=P}function Hl(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return Q},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(x,P,H){const F=Ce.get(x);F.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),Ce.get(x.texture).__webglTexture=P,Ce.get(x.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:H,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,P){const H=Ce.get(x);H.__webglFramebuffer=P,H.__useDefaultFramebuffer=P===void 0},this.setRenderTarget=function(x,P=0,H=0){ie=x,Q=P,B=H;let F=null,O=!1,he=!1;if(x){const de=Ce.get(x);if(de.__useDefaultFramebuffer!==void 0){pe.bindFramebuffer(D.FRAMEBUFFER,de.__webglFramebuffer),te.copy(x.viewport),Ee.copy(x.scissor),Ne=x.scissorTest,pe.viewport(te),pe.scissor(Ee),pe.setScissorTest(Ne),X=-1;return}else if(de.__webglFramebuffer===void 0)Ie.setupRenderTarget(x);else if(de.__hasExternalTextures)Ie.rebindTextures(x,Ce.get(x.texture).__webglTexture,Ce.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Ue=x.depthTexture;if(de.__boundDepthTexture!==Ue){if(Ue!==null&&Ce.has(Ue)&&(x.width!==Ue.image.width||x.height!==Ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ie.setupDepthRenderbuffer(x)}}const xe=x.texture;(xe.isData3DTexture||xe.isDataArrayTexture||xe.isCompressedArrayTexture)&&(he=!0);const Te=Ce.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Te[P])?F=Te[P][H]:F=Te[P],O=!0):x.samples>0&&Ie.useMultisampledRTT(x)===!1?F=Ce.get(x).__webglMultisampledFramebuffer:Array.isArray(Te)?F=Te[H]:F=Te,te.copy(x.viewport),Ee.copy(x.scissor),Ne=x.scissorTest}else te.copy(Le).multiplyScalar(_e).floor(),Ee.copy(Ze).multiplyScalar(_e).floor(),Ne=Qe;if(H!==0&&(F=W),pe.bindFramebuffer(D.FRAMEBUFFER,F)&&pe.drawBuffers(x,F),pe.viewport(te),pe.scissor(Ee),pe.setScissorTest(Ne),O){const de=Ce.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+P,de.__webglTexture,H)}else if(he){const de=P;for(let xe=0;xe<x.textures.length;xe++){const Te=Ce.get(x.textures[xe]);D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0+xe,Te.__webglTexture,H,de)}}else if(x!==null&&H!==0){const de=Ce.get(x.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,de.__webglTexture,H)}X=-1};function kr(x){const P=Ce.get(x);return(P.__readFormat!==x.format||P.__readType!==x.type)&&(P.__readFormat=x.format,P.__readType=x.type,P.__formatReadable=st.textureFormatReadable(x.format),P.__typeReadable=st.textureTypeReadable(x.type)),P}this.readRenderTargetPixels=function(x,P,H,F,O,he,Se,de=0){if(!(x&&x.isWebGLRenderTarget)){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=Ce.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Se!==void 0&&(xe=xe[Se],Array.isArray(xe)&&(xe=xe[0])),xe){pe.bindFramebuffer(D.FRAMEBUFFER,xe);try{const Te=x.textures[de],Ue=Te.format,Ge=Te.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+de);const ye=kr(Te);if(ye.__formatReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ye.__typeReadable===!1){Ye("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}P>=0&&P<=x.width-F&&H>=0&&H<=x.height-O&&D.readPixels(P,H,F,O,ae.convert(Ue),ae.convert(Ge),he)}finally{const Te=ie!==null?Ce.get(ie).__webglFramebuffer:null;pe.bindFramebuffer(D.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(x,P,H,F,O,he,Se,de=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=Ce.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&Se!==void 0&&(xe=xe[Se],Array.isArray(xe)&&(xe=xe[0])),xe)if(P>=0&&P<=x.width-F&&H>=0&&H<=x.height-O){pe.bindFramebuffer(D.FRAMEBUFFER,xe);const Te=x.textures[de],Ue=Te.format,Ge=Te.type;x.textures.length>1&&D.readBuffer(D.COLOR_ATTACHMENT0+de);const ye=kr(Te);if(ye.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ye.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ve=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.bufferData(D.PIXEL_PACK_BUFFER,he.byteLength,D.STREAM_READ),D.readPixels(P,H,F,O,ae.convert(Ue),ae.convert(Ge),0),D.bindBuffer(D.PIXEL_PACK_BUFFER,null);const ut=ie!==null?Ce.get(ie).__webglFramebuffer:null;pe.bindFramebuffer(D.FRAMEBUFFER,ut);const tt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await zc(D,tt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ve),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,he),D.bindBuffer(D.PIXEL_PACK_BUFFER,null),D.deleteBuffer(Ve),D.deleteSync(tt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,P=null,H=0){const F=Math.pow(2,-H),O=Math.floor(x.image.width*F),he=Math.floor(x.image.height*F),Se=P!==null?P.x:0,de=P!==null?P.y:0;Ie.setTexture2D(x,0),D.copyTexSubImage2D(D.TEXTURE_2D,H,0,0,Se,de,O,he),pe.unbindTexture()},this.copyTextureToTexture=function(x,P,H=null,F=null,O=0,he=0){let Se,de,xe,Te,Ue,Ge,ye,Ve,ut;const tt=x.isCompressedTexture?x.mipmaps[he]:x.image;if(H!==null)Se=H.max.x-H.min.x,de=H.max.y-H.min.y,xe=H.isBox3?H.max.z-H.min.z:1,Te=H.min.x,Ue=H.min.y,Ge=H.isBox3?H.min.z:0;else{const Xe=Math.pow(2,-O);Se=Math.floor(tt.width*Xe),de=Math.floor(tt.height*Xe),x.isDataArrayTexture?xe=tt.depth:x.isData3DTexture?xe=Math.floor(tt.depth*Xe):xe=1,Te=0,Ue=0,Ge=0}F!==null?(ye=F.x,Ve=F.y,ut=F.z):(ye=0,Ve=0,ut=0);const et=ae.convert(P.format),Tt=ae.convert(P.type);let be;P.isData3DTexture?(Ie.setTexture3D(P,0),be=D.TEXTURE_3D):P.isDataArrayTexture||P.isCompressedArrayTexture?(Ie.setTexture2DArray(P,0),be=D.TEXTURE_2D_ARRAY):(Ie.setTexture2D(P,0),be=D.TEXTURE_2D),pe.activeTexture(D.TEXTURE0),pe.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,P.flipY),pe.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,P.premultiplyAlpha),pe.pixelStorei(D.UNPACK_ALIGNMENT,P.unpackAlignment);const Lt=pe.getParameter(D.UNPACK_ROW_LENGTH),Ke=pe.getParameter(D.UNPACK_IMAGE_HEIGHT),Bn=pe.getParameter(D.UNPACK_SKIP_PIXELS),At=pe.getParameter(D.UNPACK_SKIP_ROWS),$i=pe.getParameter(D.UNPACK_SKIP_IMAGES);pe.pixelStorei(D.UNPACK_ROW_LENGTH,tt.width),pe.pixelStorei(D.UNPACK_IMAGE_HEIGHT,tt.height),pe.pixelStorei(D.UNPACK_SKIP_PIXELS,Te),pe.pixelStorei(D.UNPACK_SKIP_ROWS,Ue),pe.pixelStorei(D.UNPACK_SKIP_IMAGES,Ge);const wn=x.isDataArrayTexture||x.isData3DTexture,Hn=P.isDataArrayTexture||P.isData3DTexture;if(x.isDepthTexture){const Xe=Ce.get(x),bt=Ce.get(P),Kt=Ce.get(Xe.__renderTarget),ot=Ce.get(bt.__renderTarget);pe.bindFramebuffer(D.READ_FRAMEBUFFER,Kt.__webglFramebuffer),pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,ot.__webglFramebuffer);for(let xt=0;xt<xe;xt++)wn&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(x).__webglTexture,O,Ge+xt),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Ce.get(P).__webglTexture,he,ut+xt)),D.blitFramebuffer(Te,Ue,Te+Se,Ue+de,ye,Ve,ye+Se,Ve+de,D.DEPTH_BUFFER_BIT,D.NEAREST);pe.bindFramebuffer(D.READ_FRAMEBUFFER,null),pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(O!==0||x.isRenderTargetTexture||Ce.has(x)){const Xe=Ce.get(x),bt=Ce.get(P);pe.bindFramebuffer(D.READ_FRAMEBUFFER,I),pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,V);for(let Kt=0;Kt<xe;Kt++)wn?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Xe.__webglTexture,O,Ge+Kt):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Xe.__webglTexture,O),Hn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,bt.__webglTexture,he,ut+Kt):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,bt.__webglTexture,he),O!==0?D.blitFramebuffer(Te,Ue,Te+Se,Ue+de,ye,Ve,ye+Se,Ve+de,D.COLOR_BUFFER_BIT,D.NEAREST):Hn?D.copyTexSubImage3D(be,he,ye,Ve,ut+Kt,Te,Ue,Se,de):D.copyTexSubImage2D(be,he,ye,Ve,Te,Ue,Se,de);pe.bindFramebuffer(D.READ_FRAMEBUFFER,null),pe.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Hn?x.isDataTexture||x.isData3DTexture?D.texSubImage3D(be,he,ye,Ve,ut,Se,de,xe,et,Tt,tt.data):P.isCompressedArrayTexture?D.compressedTexSubImage3D(be,he,ye,Ve,ut,Se,de,xe,et,tt.data):D.texSubImage3D(be,he,ye,Ve,ut,Se,de,xe,et,Tt,tt):x.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,he,ye,Ve,Se,de,et,Tt,tt.data):x.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,he,ye,Ve,tt.width,tt.height,et,tt.data):D.texSubImage2D(D.TEXTURE_2D,he,ye,Ve,Se,de,et,Tt,tt);pe.pixelStorei(D.UNPACK_ROW_LENGTH,Lt),pe.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ke),pe.pixelStorei(D.UNPACK_SKIP_PIXELS,Bn),pe.pixelStorei(D.UNPACK_SKIP_ROWS,At),pe.pixelStorei(D.UNPACK_SKIP_IMAGES,$i),he===0&&P.generateMipmaps===!0&&P.mipmapsAutoUpdate===!0&&D.generateMipmap(be),pe.unbindTexture()},this.initRenderTarget=function(x){Ce.get(x).__webglFramebuffer===void 0&&Ie.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?Ie.setTextureCube(x,0):x.isData3DTexture?Ie.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?Ie.setTexture2DArray(x,0):Ie.setTexture2D(x,0),pe.unbindTexture()},this.resetState=function(){Q=0,B=0,ie=null,pe.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return tn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=We._getDrawingBufferColorSpace(e),t.unpackColorSpace=We._getUnpackColorSpace()}}function ym(i,e){const t=e.slice(0,15);if(t.length===0){i.innerHTML='<div style="color:#94a3b8; font-size:0.82rem; padding:18px; text-align:center;">Nincs megjeleníthető képzettség.</div>';return}const n=460,s=360,a=n/2,r=s/2,l=112,o=Math.max(100,...t.map(_=>_.value)),c=t.length,d=[.25,.5,.75,1];let h=`<svg viewBox="0 0 ${n} ${s}" style="width:100%; max-width:460px; height:auto;" xmlns="http://www.w3.org/2000/svg">`;for(const _ of d){const E=[];for(let p=0;p<c;p++){const S=-Math.PI/2+p*2*Math.PI/c,T=a+Math.cos(S)*l*_,b=r+Math.sin(S)*l*_;E.push(`${T.toFixed(1)},${b.toFixed(1)}`)}h+=`<polygon points="${E.join(" ")}" fill="none" stroke="rgba(184,151,88,0.25)" stroke-width="1" />`;const f=`${Math.round(o*_)}%`;h+=`<text x="${(a+4).toFixed(1)}" y="${(r-l*_+10).toFixed(1)}" fill="#64748b" font-size="9">${f}</text>`}const u=[];for(let _=0;_<c;_++){const E=t[_],f=-Math.PI/2+_*2*Math.PI/c,p=a+Math.cos(f)*l,S=r+Math.sin(f)*l;h+=`<line x1="${a}" y1="${r}" x2="${p.toFixed(1)}" y2="${S.toFixed(1)}" stroke="rgba(148,163,184,0.22)" stroke-width="1" />`;const T=Math.max(.05,Math.min(1,E.value/o)),b=a+Math.cos(f)*l*T,R=r+Math.sin(f)*l*T;u.push({x:b,y:R,skill:E});const w=a+Math.cos(f)*(l+22),m=r+Math.sin(f)*(l+18),y=Math.cos(f),N=y>.25?"start":y<-.25?"end":"middle",M=E.name.length>13?`${E.name.slice(0,12)}.`:E.name;h+=`<text x="${w.toFixed(1)}" y="${(m+3).toFixed(1)}" text-anchor="${N}" fill="#cbd5e1" font-size="10" font-weight="600">${M} (${E.value}%)</text>`}const g=u.map(_=>`${_.x.toFixed(1)},${_.y.toFixed(1)}`).join(" ");h+=`<polygon points="${g}" fill="rgba(16,185,129,0.28)" stroke="#34d399" stroke-width="2" />`;for(const _ of u)h+=`<circle cx="${_.x.toFixed(1)}" cy="${_.y.toFixed(1)}" r="4.2" fill="#d4af37" stroke="#0f172a" stroke-width="1.2"><title>${_.skill.name}: ${_.skill.value}% (${_.skill.category})</title></circle>`;h+="</svg>",i.innerHTML=h}class bm{constructor(e){nt(this,"container");nt(this,"scene");nt(this,"camera");nt(this,"renderer");nt(this,"rootGroup");nt(this,"crystalMesh");nt(this,"ringMesh");nt(this,"barMeshes",[]);nt(this,"animId",null);nt(this,"isRunning",!1);nt(this,"lastRenderMs",0);nt(this,"FRAME_MIN_MS",1e3/31.5);nt(this,"rotY",.35);nt(this,"rotX",.28);nt(this,"targetRotY",.35);nt(this,"targetRotX",.28);nt(this,"isDragging",!1);nt(this,"lastPointerX",0);nt(this,"lastPointerY",0);nt(this,"disposed",!1);nt(this,"onPointerDown",e=>{this.isDragging=!0,this.lastPointerX=e.clientX,this.lastPointerY=e.clientY});nt(this,"onPointerMove",e=>{if(!this.isDragging)return;const t=e.clientX-this.lastPointerX,n=e.clientY-this.lastPointerY;this.lastPointerX=e.clientX,this.lastPointerY=e.clientY,this.targetRotY+=t*.01,this.targetRotX=Math.max(-.6,Math.min(.9,this.targetRotX+n*.008))});nt(this,"onPointerUp",()=>{this.isDragging=!1});nt(this,"onVisibilityChange",()=>{document.hidden?this.stopLoopOnly():this.isRunning&&!this.disposed&&this.ensureLoop()});nt(this,"tick",e=>{if(this.animId=null,!(!this.isRunning||this.disposed||document.hidden)){if(e-this.lastRenderMs<this.FRAME_MIN_MS){this.animId=requestAnimationFrame(this.tick);return}this.lastRenderMs=e,this.isDragging||(this.targetRotY+=.008),this.rotY+=(this.targetRotY-this.rotY)*.12,this.rotX+=(this.targetRotX-this.rotX)*.12,this.rootGroup.rotation.y=this.rotY,this.rootGroup.rotation.x=this.rotX,this.crystalMesh.rotation.y-=.018,this.renderer.render(this.scene,this.camera),this.animId=requestAnimationFrame(this.tick)}});this.container=e,this.scene=new sd;const t=Math.max(e.clientWidth,280),n=Math.max(e.clientHeight,220);this.camera=new Qt(42,t/n,.1,100),this.camera.position.set(0,2.2,6.2),this.camera.lookAt(0,.35,0);const s=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),a=Math.min(window.devicePixelRatio||1,s?1:1.5);this.renderer=new Mm({alpha:!0,antialias:!0}),this.renderer.setPixelRatio(a),this.renderer.setSize(t,n),e.innerHTML="",e.appendChild(this.renderer.domElement);const r=new Td(16777215,.85);this.scene.add(r);const l=new Ed(16768896,1.4);l.position.set(4,7,5),this.scene.add(l),this.rootGroup=new Ci,this.scene.add(this.rootGroup);const o=new _r(.7,0),c=new ho({color:13938487,emissive:1096065,emissiveIntensity:.35,wireframe:!0});this.crystalMesh=new un(o,c),this.crystalMesh.position.y=.65,this.rootGroup.add(this.crystalMesh);const d=new xr(2.05,.03,12,64),h=new fl({color:12097368,transparent:!0,opacity:.65});this.ringMesh=new un(d,h),this.ringMesh.rotation.x=Math.PI/2,this.rootGroup.add(this.ringMesh),this.bindEvents()}bindEvents(){const e=this.renderer.domElement;e.style.cursor="grab",e.addEventListener("pointerdown",this.onPointerDown),window.addEventListener("pointermove",this.onPointerMove),window.addEventListener("pointerup",this.onPointerUp),document.addEventListener("visibilitychange",this.onVisibilityChange)}setSkills(e){for(const a of this.barMeshes)this.rootGroup.remove(a),a.geometry.dispose(),a.material.dispose();this.barMeshes=[];const t=e.slice(0,15);if(t.length===0)return;const n=Math.max(100,...t.map(a=>a.value)),s=t.length;for(let a=0;a<s;a++){const r=t[a],l=a*2*Math.PI/s,o=Math.max(.08,Math.min(1,r.value/n)),c=.25+o*1.9,d=new xi(.18,c,.18),h=o>=.7,u=new ho({color:h?3462041:3718648,emissive:h?366185:223649,emissiveIntensity:.4,metalness:.35,roughness:.3}),g=new un(d,u);g.position.set(Math.cos(l)*1.85,c/2,Math.sin(l)*1.85),g.lookAt(0,c/2,0),this.rootGroup.add(g),this.barMeshes.push(g)}this.isRunning&&!document.hidden&&this.renderer.render(this.scene,this.camera)}stopLoopOnly(){this.animId!==null&&(cancelAnimationFrame(this.animId),this.animId=null)}ensureLoop(){this.animId!==null||this.disposed||document.hidden||!this.isRunning||(this.lastRenderMs=performance.now(),this.animId=requestAnimationFrame(this.tick))}start(){this.disposed||(this.isRunning=!0,this.resize(),this.ensureLoop())}pause(){this.isRunning=!1,this.stopLoopOnly()}resize(){if(this.disposed)return;const e=Math.max(this.container.clientWidth,260),t=Math.max(this.container.clientHeight,210);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}dispose(){if(this.disposed)return;this.disposed=!0,this.pause(),this.renderer.domElement.removeEventListener("pointerdown",this.onPointerDown),window.removeEventListener("pointermove",this.onPointerMove),window.removeEventListener("pointerup",this.onPointerUp),document.removeEventListener("visibilitychange",this.onVisibilityChange);for(const t of this.barMeshes)t.geometry.dispose(),t.material.dispose();this.barMeshes=[],this.crystalMesh.geometry.dispose(),this.crystalMesh.material.dispose(),this.ringMesh.geometry.dispose(),this.ringMesh.material.dispose(),this.renderer.dispose()}}const Il="ebp_kryst_vault_snapshot_v1",Dl="ebp_kryst_vault_landscape",jt=["overview","treasures","library","vehicles","skills","crew","assistant"],Em={overview:"Áttekintés",treasures:"Kincsek & Piac",library:"Könyvtár",vehicles:"Flotta",skills:"Képzettségek",crew:"Legénység",assistant:"Keresőasszisztens"};function G(i){return String(i??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Tm(i){return i.toLowerCase().replace(/[\s/()]+/g,"_").replace(/á/g,"a").replace(/é/g,"e").replace(/í/g,"i").replace(/[óöő]/g,"o").replace(/[úüű]/g,"u")}function fe(i){return document.getElementById(i)}function Am(){try{const i=localStorage.getItem(Il);if(!i)return null;const e=JSON.parse(i);if(e&&e.success&&e.profile&&Array.isArray(e.vehicles))return e}catch{return null}return null}function wm(i){try{const e={...i,profile:{...i.profile,rang_kep_data:i.profile.rang_kep_data}};localStorage.setItem(Il,JSON.stringify(e))}catch{}}function Rm(){try{const i=localStorage.getItem(Dl);if(i==="1")return!0;if(i==="0")return!1}catch{}return window.innerWidth>=820}const Gi=!!(window.parent&&window.parent!==window),Rs=Am(),j={snapshot:Rs||zo,syncSource:Rs?"opfs":Gi?"loading":"demo",activeTab:"overview",fontScale:1,isLandscape:Rm(),libraryFilter:"all",vehicleCategoryFilter:"Mind",selectedVehicleId:null,skillsMode3D:!1,skillsCategoryFilter:"all",skillsSort:"desc",crewFilter:"all",assistantMode:"script",lastQueryText:"",lastScriptResult:null,lastAiResponse:null,aiLoading:!1};let Ft=null,on=null;function qt(i,e="info"){const t=fe("vault-lens-container");if(!t)return;const n=fe("vault-toast-banner");n&&n.parentNode&&n.parentNode.removeChild(n);const s=document.createElement("div");s.id="vault-toast-banner";const a=e==="ok"?"#34d399":e==="err"?"#f87171":"#d4af37",r=e==="ok"?"#a7f3d0":e==="err"?"#fecaca":"#fde68a";s.style.cssText=`position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:60;background:rgba(12,17,29,0.96);border:1.5px solid ${a};color:${r};padding:8px 14px;border-radius:12px;font-size:0.78rem;max-width:90%;box-shadow:0 8px 24px rgba(0,0,0,0.85);text-align:center;`,s.textContent=i,t.appendChild(s),window.setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},4200)}function Vi(i){if(window.parent&&window.parent!==window)try{window.parent.postMessage(i,"*")}catch{}}function Nl(){const i=fe("vault-chassis"),e=fe("orientation-icon"),t=fe("orientation-text");i&&i.classList.toggle("layout-landscape",j.isLandscape),e&&(e.textContent=j.isLandscape?"📱":"🖥️"),t&&(t.textContent=j.isLandscape?"Álló":"Fekvő"),j.skillsMode3D&&j.activeTab==="skills"&&Ft&&window.setTimeout(()=>Ft==null?void 0:Ft.resize(),60)}function nr(){document.documentElement.style.setProperty("--vault-font-scale",j.fontScale.toFixed(2))}function ki(i,e,t){const n=fe("vault-loading-overlay");if(n){if(n.style.display=i?"flex":"none",e){const s=fe("vault-loading-title");s&&(s.textContent=e)}if(t){const s=fe("vault-loading-desc");s&&(s.textContent=t)}}}function qn(){const i=j.snapshot,e=fe("vault-status-subline");e&&(e.textContent=`${i.profile.kaloznev||"Kapitány"} · ${i.profile.rang||"Kalóz"} · Flotta: ${i.vehicles.length}`);const t=fe("vault-sync-pill");t&&(t.className=`vault-sync-pill source-${j.syncSource}`,j.syncSource==="opfs"?t.textContent="💿 OPFS Gyorsítótár":j.syncSource==="cloud"?t.textContent="☁️ Élő Felhő":j.syncSource==="demo"?t.textContent="🧪 Minta Mód":t.textContent="⏳ Szinkron...");const n={overview:"",treasures:String(i.treasuresAndMarket.treasures.length+i.treasuresAndMarket.activeListings.length+i.treasuresAndMarket.gearItems.length),library:String(i.library.books.length+i.library.copies.length+i.library.scrolls.length+i.library.maps.length+i.library.logs.length),vehicles:String(i.vehicles.length),skills:String(i.skills.skillsList.length),crew:String(i.crew.length),assistant:"AI"};document.querySelectorAll(".tab-count[data-count-for]").forEach(c=>{const d=c.dataset.countFor;c.textContent=n[d]??""});const s=fe("dock-kredit");s&&(s.textContent=`${i.profile.kredit} Kr`);const a=fe("dock-fleet");a&&(a.textContent=`${i.vehicles.length} db`);const r=fe("dock-crew");r&&(r.textContent=`${i.crew.length} fő`);const l=fe("dock-skill-avg");l&&(l.textContent=`${i.skills.averageSkill||0}%`);const o=fe("dock-active-tab-label");o&&(o.textContent=Em[j.activeTab])}function Mr(){Ft&&Ft.pause()}function Mt(i,e){const t=j.activeTab;if(j.activeTab=i,t==="skills"&&i!=="skills"&&Mr(),(e==null?void 0:e.vehicleId)!==void 0&&(j.selectedVehicleId=e.vehicleId),document.querySelectorAll(".vault-tab-chip[data-tab]").forEach(n=>{const s=n.dataset.tab===i;n.classList.toggle("active",s),s&&n.scrollIntoView({behavior:"smooth",inline:"center",block:"nearest"})}),jt.forEach(n=>{const s=fe(`panel-${n}`);s&&s.classList.toggle("active",n===i)}),Us(),qn(),(e==null?void 0:e.resetScroll)!==!1){const n=fe("vault-viewport");n&&(n.scrollTop=0)}}function yr(i,e){if(i==="vehicles"){const t=j.snapshot.vehicles.find(n=>n.id===e||at(n.name)===at(e));Mt("vehicles",{vehicleId:t?t.id:null});return}if(i==="crew"){j.crewFilter="all",Mt("crew"),window.setTimeout(()=>{const t=document.querySelector(`[data-crew-id="${CSS.escape(e)}"]`);t&&(t.scrollIntoView({behavior:"smooth",block:"center"}),t.style.borderColor="#34d399",window.setTimeout(()=>{t.style.borderColor=""},2e3))},60);return}if(i==="skills"){j.skillsCategoryFilter="all",Mt("skills");return}if(i==="library"){j.libraryFilter="all",Mt("library");return}if(i==="treasures"){Mt("treasures");return}Mt("overview")}function Cm(){var f,p;const i=fe("panel-overview");if(!i)return;const{profile:e,monkStats:t,treasuresAndMarket:n,library:s,vehicles:a,skills:r,crew:l,warnings:o}=j.snapshot,c=e.rang_kep_data&&e.rang_kep_data.data?`data:${e.rang_kep_data.mime};base64,${e.rang_kep_data.data}`:"",d=l.filter(S=>S.remainingDays!==null&&S.remainingDays<=7),h=a.filter(S=>S.durabilityPct<75),u=s.books.reduce((S,T)=>S+(Number(T.debt)||0),0),g=[];d.length>0&&g.push(`⏳ ${d.length} felvett embered szerződése 7 napon belül lejár (${d.map(S=>S.name).join(", ")}).`),h.length>0&&g.push(`🛠️ ${h.length} járműved élettartama 75% alatt van (${h.map(S=>`${S.name} ${S.durabilityPct}%`).join(", ")}).`),n.activeListings.length>0&&g.push(`⚖️ ${n.activeListings.length} aktív hirdetésed fut jelenleg a Piacon.`),u>0&&g.push(`📜 Aktív könyv-hiteltartozás: ${u}.`);const _=Math.floor(Number(e.talentum)||0);let E=`
    <div class="profile-hero-card">
      <div class="profile-hero-left">
        ${c?`<img class="profile-rank-img" src="${G(c)}" alt="${G(e.rang)}">`:'<div class="profile-rank-img" style="display:flex;align-items:center;justify-content:center;font-size:1.7rem;">⚓</div>'}
        <div>
          <div class="profile-name">${G(e.kaloznev)}</div>
          <div class="profile-rank-label">${G(e.rang)}</div>
          <div class="vault-pill-row" style="margin-top:5px;">
            ${e.aktualisAllas?`<span class="vault-pill pill-cyan">📍 ${G(e.aktualisAllas)}</span>`:""}
            ${e.patreonTagnev?`<span class="vault-pill pill-gold">👑 ${G(e.patreonTagnev)}</span>`:""}
            ${t.isMonk?`<span class="vault-pill pill-emerald">🕯️ ${G(t.specialisCim||"Kolostori Szerzetes")}</span>`:""}
            ${r.trait?`<span class="vault-pill pill-amber">✨ ${G(r.trait)}</span>`:""}
          </div>
        </div>
      </div>
      <div style="display:flex; gap:6px; flex-wrap:wrap;">
        <button type="button" class="vault-mini-btn" id="btn-ov-ask-ai">🤖 Keresőasszisztens</button>
        <button type="button" class="vault-mini-btn" id="btn-ov-refresh">↻ Szinkron</button>
      </div>
    </div>

    <div class="wealth-strip">
      <div class="wealth-box">
        <span class="wealth-label">🪙 Kredit</span>
        <span class="wealth-value" style="color:#e2e8f0;">${G(e.kredit)} Kr</span>
      </div>
      <div class="wealth-box">
        <span class="wealth-label">📜 Hártya</span>
        <span class="wealth-value" style="color:#fde68a;">${G(e.hartya)}</span>
      </div>
      <div class="wealth-box" title="Pontos Tálentum: ${G(e.talentum)}">
        <span class="wealth-label">⭐ Tálentum</span>
        <span class="wealth-value" style="color:#d2e505; cursor:help;">${_} <small style="font-size:0.65rem;color:#94a3b8;">(${G(e.talentum)})</small></span>
      </div>
      <div class="wealth-box">
        <span class="wealth-label">💎 Letkristály</span>
        <span class="wealth-value" style="color:#34d399;">${G(e.letkristaly)}</span>
      </div>
    </div>
  `;g.length>0&&(E+=`<div class="alert-banner">${g.map(S=>`<div>${G(S)}</div>`).join("")}</div>`),E+=`
    <div class="vault-section-heading"><span>📊 Lajstrom Gyorselérés</span></div>
    <div class="overview-kpi-grid">
      <div class="kpi-tile" data-jump-tab="treasures">
        <div class="kpi-title">🎒 Kincsek, Kellékek &amp; Piac</div>
        <div class="kpi-num">${n.treasures.length} kincs · ${n.gearItems.length} kellék</div>
        <div class="kpi-sub">${n.activeListings.length} aktív piaci hirdetés · ${n.myOffers.length} licit</div>
      </div>
      <div class="kpi-tile" data-jump-tab="library">
        <div class="kpi-title">📚 Teljes Könyvtár-Lajstrom</div>
        <div class="kpi-num">${s.books.length} könyv · ${s.copies.length} másolat</div>
        <div class="kpi-sub">${s.scrolls.length} tekercs · ${s.maps.length} térkép · ${s.logs.length} napló</div>
      </div>
      <div class="kpi-tile" data-jump-tab="vehicles">
        <div class="kpi-title">⛵ Flotta &amp; Felszereltség</div>
        <div class="kpi-num">${a.length} aktív jármű</div>
        <div class="kpi-sub">${a.map(S=>S.name).slice(0,2).join(", ")||"Nincs jármű a neveden"}</div>
      </div>
      <div class="kpi-tile" data-jump-tab="skills">
        <div class="kpi-title">🧭 Képzettségeid (gid=667526717)</div>
        <div class="kpi-num">Átlag: ${r.averageSkill}%</div>
        <div class="kpi-sub">Csúcs: ${G(r.topSkillName||"-")} (${r.maxSkill}%)</div>
      </div>
      <div class="kpi-tile" data-jump-tab="crew">
        <div class="kpi-title">👥 Felvett Emberek &amp; Legénység</div>
        <div class="kpi-num">${l.length} fő</div>
        <div class="kpi-sub">${d.length>0?`${d.length} szerződés hamarosan lejár`:"Minden szerződés stabil"}</div>
      </div>
      <div class="kpi-tile" data-jump-tab="assistant">
        <div class="kpi-title">🤖 Scriptes + SQL + AI Kereső</div>
        <div class="kpi-num">0 ms / Gemini</div>
        <div class="kpi-sub">Kérdezz rá hajóra, emberre vagy képzettségre!</div>
      </div>
    </div>
  `,t.isMonk&&(E+=`
      <div class="vault-card">
        <div class="vault-card-top">
          <div class="vault-card-title">🕯️ Felhőkolostori Szerzetesi Statisztika</div>
          <span class="vault-pill pill-emerald">${G(t.specialisCim||"Szerzetes")}</span>
        </div>
        <div class="spec-grid">
          <div class="spec-cell"><div class="spec-cell-label">Editor</div><div class="spec-cell-val">${t.editorDb||0} db (átl: ${t.editorAtlag||0})</div></div>
          <div class="spec-cell"><div class="spec-cell-label">Szkriptor</div><div class="spec-cell-val">${t.szkriptorDb||0} db (átl: ${t.szkriptorAtlag||0})</div></div>
          <div class="spec-cell"><div class="spec-cell-label">Piktor</div><div class="spec-cell-val">${t.piktorDb||0} db (átl: ${t.piktorAtlag||0})</div></div>
          <div class="spec-cell"><div class="spec-cell-label">Inspektor</div><div class="spec-cell-val">${t.inspektorDb||0} db (átl: ${t.inspektorAtlag||0})</div></div>
        </div>
      </div>
    `),o.length>0&&(E+=`<div class="vault-card"><div class="vault-card-subtitle">⚠️ Szinkron figyelmeztetések: ${o.map(G).join(" | ")}</div></div>`),i.innerHTML=E,i.querySelectorAll("[data-jump-tab]").forEach(S=>{S.addEventListener("click",()=>{const T=S.dataset.jumpTab;T&&Mt(T)})}),(f=fe("btn-ov-ask-ai"))==null||f.addEventListener("click",()=>Mt("assistant")),(p=fe("btn-ov-refresh"))==null||p.addEventListener("click",()=>br())}function Lm(){const i=fe("panel-treasures");if(!i)return;const{treasures:e,activeListings:t,myOffers:n,gearItems:s}=j.snapshot.treasuresAndMarket;let a=`<div class="vault-section-heading"><span>💎 Birtokolt Kincsek (${e.length} db)</span></div>`;if(e.length===0)a+='<div class="vault-card"><div class="vault-card-subtitle">Nincs bejegyzett kincs a piaci kincstárban.</div></div>';else{a+='<div class="vault-cards-grid">';for(const r of e)a+=`
        <div class="vault-card">
          <div class="vault-card-top">
            <div class="vault-card-title">${G(r.name)}</div>
            <span class="vault-pill ${r.isListedOnMarket?"pill-amber":"pill-emerald"}">${r.isListedOnMarket?"⚖️ Piacon":"🔒 Kincstárban"}</span>
          </div>
          <div class="vault-card-subtitle">${G(r.description||"Nincs leírás megadva.")}</div>
          <div class="vault-pill-row"><span class="vault-pill pill-muted">ID: ${G(r.id)}</span></div>
        </div>
      `;a+="</div>"}if(a+=`<div class="vault-section-heading"><span>🎒 Felszerelések &amp; Kellékek (${s.length} db)</span></div>`,s.length===0)a+='<div class="vault-card"><div class="vault-card-subtitle">Nincs külön táska-kellék rögzítve a profil JSON_adat mezőjében.</div></div>';else{a+='<div class="vault-cards-grid">';for(const r of s)a+=`
        <div class="vault-card">
          <div class="vault-card-top">
            <div class="vault-card-title">${G(r.name)}</div>
            <span class="vault-pill pill-cyan">${G(r.quantity)} db</span>
          </div>
          <div class="vault-card-subtitle">${G(r.description||r.category)}</div>
          <div class="vault-pill-row"><span class="vault-pill pill-muted">${G(r.category)}</span></div>
        </div>
      `;a+="</div>"}if(a+=`<div class="vault-section-heading"><span>⚖️ Saját Aktív Piaci Hirdetések (${t.length} db)</span></div>`,t.length===0)a+='<div class="vault-card"><div class="vault-card-subtitle">Nincs jelenleg aktív piaci hirdetésed.</div></div>';else{a+='<div class="vault-cards-grid">';for(const r of t){const l=r.price!==null?`${r.price} Kr (Fix)`:r.buyNowPrice!==null?`Villámár: ${r.buyNowPrice} Kr`:"Licit";a+=`
        <div class="vault-card">
          <div class="vault-card-top">
            <div class="vault-card-title">${G(r.itemType)} — ${G(r.itemIdentifier)}</div>
            <span class="vault-pill pill-gold">${G(l)}</span>
          </div>
          <div class="vault-pill-row">
            <span class="vault-pill pill-emerald">${G(r.status)}</span>
            ${r.dateListed?`<span class="vault-pill pill-muted">📅 ${G(r.dateListed)}</span>`:""}
            <span class="vault-pill pill-muted">ID: ${G(r.listingId)}</span>
          </div>
        </div>
      `}a+="</div>"}if(a+=`<div class="vault-section-heading"><span>🤝 Nyitott Licit Ajánlataim (${n.length} db)</span></div>`,n.length===0)a+='<div class="vault-card"><div class="vault-card-subtitle">Nincs folyamatban lévő licitajánlatod.</div></div>';else{a+='<div class="vault-cards-grid">';for(const r of n)a+=`
        <div class="vault-card">
          <div class="vault-card-top">
            <div class="vault-card-title">Ajánlat: ${G(r.offerId)}</div>
            <span class="vault-pill pill-cyan">${G(r.status||"aktív")}</span>
          </div>
          <div class="vault-card-subtitle">Hirdetés ID: ${G(r.listingId)} · Felajánlott: ${G(r.offeredItemsRaw)}</div>
        </div>
      `;a+="</div>"}i.innerHTML=a}function Pm(i,e){const t=j.snapshot.library;let n=null;if(i==="book"&&t.books[e]){const s=t.books[e];n={itemType:"book",sourceKind:"book",title:s.title,author:s.author,downloadLink:s.downloadLink,workId:s.krystWorkId||s.downloadLink,krystWorkId:s.krystWorkId||s.downloadLink,isKrystNative:s.isKrystNative}}else if(i==="copy"&&t.copies[e]){const s=t.copies[e];n={itemType:"copy",sourceKind:"copy",title:s.title,author:s.author,copyCode:s.copyCode,code:s.copyCode,krystWorkId:s.krystWorkId,isKrystNative:s.isKrystNative}}else if(i==="scroll"&&t.scrolls[e]){const s=t.scrolls[e];n={itemType:"scroll",sourceKind:"scroll",title:`${s.title} — ${s.fejezet}`,author:s.author,fejezet:s.fejezet,scrollToken:s.scrollToken,token:s.scrollToken,copyCode:s.copyCode,krystWorkId:s.krystWorkId,isKrystNative:s.isKrystNative}}else if(i==="map"&&t.maps[e]){const s=t.maps[e];n={itemType:"map",sourceKind:"map",title:s.name||s.identifier,name:s.name||s.identifier,fileId:s.fileId,identifier:s.identifier}}else if(i==="log"&&t.logs[e]){const s=t.logs[e];n={itemType:"log",sourceKind:"log",title:s.name,name:s.name,logId:s.logId||s.id,id:s.id,fileId:s.fileId}}n&&(Gi?(Vi({type:"KRYST_VAULT_OPEN_IN_LETLIT",descriptor:n}),qt("💎 Átadás a LET-LIT Kiolvasó Gépezetnek...","ok")):qt("ℹ️ A LET-LIT olvasó indításához nyisd meg a Kincstárat a főoldalról.","info"))}function Ul(){const i=fe("panel-library");if(!i)return;const e=j.snapshot.library,t=[{id:"all",label:`Mind (${e.books.length+e.copies.length+e.scrolls.length+e.maps.length+e.logs.length})`},{id:"books",label:`💎 Könyvek (${e.books.length})`},{id:"copies",label:`📘 Másolatok (${e.copies.length})`},{id:"scrolls",label:`📜 Tekercsek (${e.scrolls.length})`},{id:"maps",label:`🗺️ Térképek (${e.maps.length})`},{id:"logs",label:`📓 Naplók (${e.logs.length})`},{id:"pending",label:`🕯️ Kéziratok (${e.pendingMonasteryWorks.length})`}];let n='<div class="vault-subfilter-bar clean-scroll-container">';for(const a of t)n+=`<button type="button" class="vault-mini-btn ${j.libraryFilter===a.id?"active":""}" data-lib-filter="${a.id}">${G(a.label)}</button>`;n+="</div>";const s=a=>j.libraryFilter==="all"||j.libraryFilter===a;if(s("books")&&(n+=`<div class="vault-section-heading"><span>📖 Birtokolt Könyvek &amp; Kristálykönyvek (${e.books.length})</span></div>`,e.books.length===0?n+='<div class="vault-card"><div class="vault-card-subtitle">Nincs birtokolt könyved.</div></div>':(n+='<div class="vault-cards-grid">',e.books.forEach((a,r)=>{n+=`
          <div class="vault-card">
            <div class="vault-card-top">
              <div>
                <div class="vault-card-title">${G(a.title)}</div>
                <div class="vault-card-subtitle">✍️ ${G(a.author)} · ${G(a.language)} · ${G(a.productType)}</div>
              </div>
              <button type="button" class="vault-mini-btn" data-open-letlit="book:${r}">💎 LET-LIT</button>
            </div>
            <div class="vault-pill-row">
              <span class="vault-pill ${a.isKrystNative?"pill-emerald":"pill-cyan"}">${a.isKrystNative?"💎 .kryst Natív":"☁️ Drive"}</span>
              <span class="vault-pill pill-muted">Kód: ${G(a.downloadLink)}</span>
              ${a.isbn?`<span class="vault-pill pill-muted">ISBN: ${G(a.isbn)}</span>`:""}
              ${a.talentum?`<span class="vault-pill pill-gold">⭐ ${G(a.talentum)} Tálentum</span>`:""}
              ${a.debt>0?`<span class="vault-pill pill-red">Tartozás: ${G(a.debt)}</span>`:""}
              ${a.soldCount>0?`<span class="vault-pill pill-muted">Eladott: ${G(a.soldCount)} db</span>`:""}
              ${a.isListedOnMarket?'<span class="vault-pill pill-amber">⚖️ Piacon</span>':""}
            </div>
          </div>
        `}),n+="</div>")),s("copies")&&(n+=`<div class="vault-section-heading"><span>📘 Birtokolt Másolatok (${e.copies.length})</span></div>`,e.copies.length===0?n+='<div class="vault-card"><div class="vault-card-subtitle">Nincs másolatod.</div></div>':(n+='<div class="vault-cards-grid">',e.copies.forEach((a,r)=>{n+=`
          <div class="vault-card">
            <div class="vault-card-top">
              <div>
                <div class="vault-card-title">${G(a.title)}</div>
                <div class="vault-card-subtitle">✍️ ${G(a.author)} · Kód: ${G(a.copyCode)}</div>
              </div>
              <button type="button" class="vault-mini-btn" data-open-letlit="copy:${r}">💎 LET-LIT</button>
            </div>
            <div class="vault-pill-row">
              <span class="vault-pill ${a.isKrystNative?"pill-emerald":"pill-cyan"}">${a.isKrystNative?"💎 .kryst":"📘 Másolat"}</span>
              ${a.inPlay?'<span class="vault-pill pill-amber">⚔️ Játékban</span>':'<span class="vault-pill pill-muted">Szabad</span>'}
              ${a.consecrated?`<span class="vault-pill pill-gold">✨ Felszentelve: ${G(a.consecrated)}</span>`:""}
              ${a.value?`<span class="vault-pill pill-muted">Érték: ${G(a.value)}</span>`:""}
              ${a.isListedOnMarket?'<span class="vault-pill pill-amber">⚖️ Piacon</span>':""}
            </div>
          </div>
        `}),n+="</div>")),s("scrolls")&&(n+=`<div class="vault-section-heading"><span>📜 Megszerzett Tekercsek (${e.scrolls.length})</span></div>`,e.scrolls.length===0?n+='<div class="vault-card"><div class="vault-card-subtitle">Nincs tekercsed.</div></div>':(n+='<div class="vault-cards-grid">',e.scrolls.forEach((a,r)=>{n+=`
          <div class="vault-card">
            <div class="vault-card-top">
              <div>
                <div class="vault-card-title">${G(a.title)} — ${G(a.fejezet)}</div>
                <div class="vault-card-subtitle">✍️ ${G(a.author)} · Token: ${G(a.scrollToken)}</div>
              </div>
              <button type="button" class="vault-mini-btn" data-open-letlit="scroll:${r}">💎 LET-LIT</button>
            </div>
            <div class="vault-pill-row">
              ${a.gameMode?`<span class="vault-pill pill-cyan">🎮 ${G(a.gameMode)}</span>`:""}
              ${a.questReward?`<span class="vault-pill pill-gold">🏆 ${G(a.questReward)}</span>`:""}
              ${a.isListedOnMarket?'<span class="vault-pill pill-amber">⚖️ Piacon</span>':""}
            </div>
          </div>
        `}),n+="</div>")),s("maps")&&(n+=`<div class="vault-section-heading"><span>🗺️ Saját Térképek (${e.maps.length})</span></div>`,e.maps.length===0?n+='<div class="vault-card"><div class="vault-card-subtitle">Nincs térképed.</div></div>':(n+='<div class="vault-cards-grid">',e.maps.forEach((a,r)=>{n+=`
          <div class="vault-card">
            <div class="vault-card-top">
              <div>
                <div class="vault-card-title">${G(a.name||a.identifier)}</div>
                <div class="vault-card-subtitle">ID: ${G(a.identifier)} ${a.drawnAt?`· 📅 ${G(a.drawnAt)}`:""}</div>
              </div>
              <button type="button" class="vault-mini-btn" data-open-letlit="map:${r}">💎 LET-LIT</button>
            </div>
            <div class="vault-pill-row">
              <span class="vault-pill pill-emerald">${G(a.status)}</span>
              ${a.expeditionName?`<span class="vault-pill pill-gold">🧭 ${G(a.expeditionName)}</span>`:""}
              ${a.gameMode?`<span class="vault-pill pill-cyan">${G(a.gameMode)}</span>`:""}
              ${a.isListedOnMarket?'<span class="vault-pill pill-amber">⚖️ Piacon</span>':""}
            </div>
          </div>
        `}),n+="</div>")),s("logs")&&(n+=`<div class="vault-section-heading"><span>📓 Olvasható Hajónaplók (${e.logs.length})</span></div>`,e.logs.length===0?n+='<div class="vault-card"><div class="vault-card-subtitle">Nincs olvasható hajónaplód.</div></div>':(n+='<div class="vault-cards-grid">',e.logs.forEach((a,r)=>{n+=`
          <div class="vault-card">
            <div class="vault-card-top">
              <div>
                <div class="vault-card-title">${G(a.name)}</div>
                <div class="vault-card-subtitle">Napló ID: ${G(a.id)}</div>
              </div>
              <button type="button" class="vault-mini-btn" data-open-letlit="log:${r}">💎 LET-LIT</button>
            </div>
          </div>
        `}),n+="</div>")),s("pending")&&e.pendingMonasteryWorks.length>0){n+=`<div class="vault-section-heading"><span>🕯️ Kolostori Kéziratok (${e.pendingMonasteryWorks.length})</span></div><div class="vault-cards-grid">`;for(const a of e.pendingMonasteryWorks)n+=`
        <div class="vault-card">
          <div class="vault-card-top">
            <div class="vault-card-title">${G(a.title)}</div>
            <span class="vault-pill pill-gold">${G(a.status)}</span>
          </div>
          <div class="vault-card-subtitle">Szerző: ${G(a.author)} · Dátum: ${G(a.date)} · ID: ${G(a.workId)}</div>
        </div>
      `;n+="</div>"}i.innerHTML=n,i.querySelectorAll("[data-lib-filter]").forEach(a=>{a.addEventListener("click",()=>{j.libraryFilter=a.dataset.libFilter,Ul()})}),i.querySelectorAll("[data-open-letlit]").forEach(a=>{a.addEventListener("click",()=>{const[r,l]=(a.dataset.openLetlit||"").split(":"),o=parseInt(l||"0",10);(r==="book"||r==="copy"||r==="scroll"||r==="map"||r==="log")&&Pm(r,o)})})}function Im(i,e){var r;const t=i.durabilityPct>=75?"hp-fill-high":i.durabilityPct>=40?"hp-fill-mid":"hp-fill-low",n=Tm(i.type||"Vitorlas"),s=[{label:"Hajó ID",val:i.id},{label:"Típus",val:i.type},{label:"Kategória",val:i.category},{label:"Jellemző hossz",val:i.length||"-"},{label:"Mérettartomány",val:i.sizeRange||"-"},{label:"Sebesség max.",val:i.maxSpeed||"-"},{label:"Tüzérségi szint",val:i.artilleryLevel||"-"},{label:"Védelmi szint",val:i.defenseLevel||"-"},{label:"Lokátor szint",val:i.locatorLevel||"-"},{label:"Utazási magasság max.",val:i.maxAltitude||"-"},{label:"Merülési mélység max.",val:i.maxDepth||"-"},{label:"Hajónapló ID",val:i.logId||"Nincs"}];let a=`
    <div class="vehicle-detail-header">
      <button type="button" class="vault-mini-btn" id="btn-vehicle-back">◀ Vissza a flottához</button>
      <div class="vault-pill-row">
        <span class="vault-pill ${i.inHarbor?"pill-emerald":"pill-amber"}">${i.inHarbor?"⚓ Kikötőben":"🌊 Tengeren"}</span>
        <span class="vault-pill pill-gold">👤 ${G(i.userRole)}</span>
        ${i.isListedOnMarket?'<span class="vault-pill pill-red">⚖️ Piacon</span>':""}
      </div>
    </div>

    <div class="vehicle-hero-box">
      <div class="vehicle-preview-img-box">
        <img src="../assets/ships/${G(n)}.png" alt="${G(i.type)}" onerror="this.onerror=null;this.src='../assets/ship_placeholder.png';this.style.opacity='0.55';">
        <div style="font-size:0.7rem; color:#94a3b8; margin-top:6px;">${G(i.type)} · ${G(i.category)}</div>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px;">
        <div>
          <div class="vault-card-title" style="font-size:1.12rem; color:var(--color-gold-glow);">${G(i.name)}</div>
          <div class="vault-card-subtitle">${G(i.description||"Nincs leírás rögzítve.")}</div>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.74rem; margin-bottom:4px;">
            <span>🛡️ Élettartam (P oszlop)</span>
            <strong style="color:#a7f3d0;">${i.durability} / ${i.maxDurability} HP (${i.durabilityPct}%)</strong>
          </div>
          <div class="hp-gauge-wrap">
            <div class="hp-gauge-fill ${t}" style="width:${i.durabilityPct}%;"></div>
          </div>
        </div>
        <div class="vault-pill-row">
          <span class="vault-pill pill-muted">👑 Tulajdonos: ${G(i.ownerName)}</span>
          <span class="vault-pill pill-cyan">🎖️ Kapitány: ${G(i.captainName)}</span>
        </div>
      </div>
    </div>

    <div class="vault-section-heading"><span>⚙️ Műszaki Jellemzők (0–15. oszlop)</span></div>
    <div class="spec-grid">
      ${s.map(l=>`
        <div class="spec-cell">
          <div class="spec-cell-label">${G(l.label)}</div>
          <div class="spec-cell-val">${G(l.val)}</div>
        </div>
      `).join("")}
    </div>

    <div class="vault-section-heading">
      <span>🔧 Fedélzeti Felszereltség (16–23. oszlop · ${i.installedEquipmentCount}/8 beépítve)</span>
    </div>
    <div class="equip-grid">
      ${i.equipmentList.map(l=>`
        <div class="equip-card ${l.installed?"installed":"missing"}">
          <div style="font-weight:700;">${l.installed?"✅":"⬜"} ${G(l.label)}</div>
          <div style="font-size:0.72rem; opacity:0.9;">${G(l.value)}</div>
        </div>
      `).join("")}
    </div>

    <div class="vault-section-heading">
      <span>👥 Fedélzeti Beosztás (${i.crewMembers.length} fő · Tiszt helyek: ${i.officers.length}/${i.officerSlotsTotal} · Matróz: ${i.sailors.length}/${i.sailorSlotsTotal} · Utas: ${i.passengers.length}/${i.passengerSlotsTotal})</span>
    </div>
    <div class="crew-chip-list">
      ${i.crewMembers.map(l=>`
        <button type="button" class="crew-roster-chip" data-jump-person="${G(l.email||l.name)}" title="Ugrás a személy adatlapjára">
          <strong>${G(l.role)}:</strong> ${G(l.name)}
        </button>
      `).join("")}
    </div>
  `;e.innerHTML=a,(r=fe("btn-vehicle-back"))==null||r.addEventListener("click",()=>{j.selectedVehicleId=null,Cs()}),e.querySelectorAll("[data-jump-person]").forEach(l=>{l.addEventListener("click",()=>{const o=l.dataset.jumpPerson||"",c=j.snapshot.crew.find(d=>at(d.email)===at(o)||at(d.name)===at(o));c?yr("crew",c.id):qt(`ℹ️ ${o} (Tulajdonos / Külső utas — nincs külön zsoldosszerződése)`,"info")})})}function Cs(){const i=fe("vehicles-category-bar"),e=fe("vehicles-list-view"),t=fe("vehicle-detail-view");if(!i||!e||!t)return;const n=j.snapshot.vehicles,s=["Mind","Vitorlás","Csónak","Búvárhajó","Léghajó"];i.innerHTML=s.map(o=>{const c=o==="Mind"?n.length:n.filter(d=>d.category===o).length;return`<button type="button" class="vault-mini-btn ${j.vehicleCategoryFilter===o?"active":""}" data-vcat="${o}">${G(o)} (${c})</button>`}).join(""),i.querySelectorAll("[data-vcat]").forEach(o=>{o.addEventListener("click",()=>{j.vehicleCategoryFilter=o.dataset.vcat,j.selectedVehicleId=null,Cs()})});const a=j.selectedVehicleId&&n.find(o=>o.id===j.selectedVehicleId)||null;if(a){e.style.display="none",t.style.display="flex",t.style.flexDirection="column",t.style.gap="10px",Im(a,t);return}t.style.display="none",e.style.display="block";const r=j.vehicleCategoryFilter==="Mind"?n:n.filter(o=>o.category===j.vehicleCategoryFilter);if(r.length===0){e.innerHTML=`<div class="vault-card"><div class="vault-card-subtitle">Nincs "${G(j.vehicleCategoryFilter)}" kategóriájú járműved.</div></div>`;return}let l='<div class="vault-cards-grid">';for(const o of r){const c=o.durabilityPct>=75?"hp-fill-high":o.durabilityPct>=40?"hp-fill-mid":"hp-fill-low",d=o.equipmentList.filter(h=>h.installed).map(h=>h.label);l+=`
      <div class="vault-card clickable" data-open-vehicle="${G(o.id)}">
        <div class="vault-card-top">
          <div>
            <div class="vault-card-title">⛵ ${G(o.name)}</div>
            <div class="vault-card-subtitle">${G(o.type)} · ${G(o.category)} · Szerep: ${G(o.userRole)}</div>
          </div>
          <span class="vault-pill ${o.inHarbor?"pill-emerald":"pill-amber"}">${o.inHarbor?"⚓ Kikötő":"🌊 Tengeren"}</span>
        </div>
        <div>
          <div style="display:flex; justify-content:space-between; font-size:0.72rem; margin-bottom:3px;">
            <span>Élettartam</span>
            <span>${o.durability}/${o.maxDurability} (${o.durabilityPct}%)</span>
          </div>
          <div class="hp-gauge-wrap"><div class="hp-gauge-fill ${c}" style="width:${o.durabilityPct}%;"></div></div>
        </div>
        <div class="vault-pill-row">
          <span class="vault-pill pill-cyan">🔧 Felszerelés: ${o.installedEquipmentCount}/8</span>
          <span class="vault-pill pill-gold">👥 Legénység: ${o.crewMembers.length} fő</span>
          ${o.maxSpeed?`<span class="vault-pill pill-muted">💨 ${G(o.maxSpeed)}</span>`:""}
        </div>
        <div class="vault-card-subtitle" style="font-size:0.71rem;">
          Beépítve: ${d.length>0?G(d.join(", ")):"Alapfelszerelés"}
        </div>
      </div>
    `}l+="</div>",e.innerHTML=l,e.querySelectorAll("[data-open-vehicle]").forEach(o=>{o.addEventListener("click",()=>{j.selectedVehicleId=o.dataset.openVehicle||null,Cs()})})}function Ms(){const i=fe("skills-header-meta"),e=fe("skills-2d-svg-host"),t=fe("skills-3d-canvas-host"),n=fe("skills-bars-list"),s=fe("btn-toggle-skills-3d");if(!i||!e||!t||!n)return;const a=j.snapshot.skills;i.innerHTML=`
    <div class="vault-card">
      <div class="vault-card-top">
        <div>
          <div class="vault-card-title">🧭 Játékos Képzettségek (HEBOK · gid=${a.sheetGid})</div>
          <div class="vault-card-subtitle">${G(a.name||j.snapshot.profile.kaloznev)} · ${G(a.roleRank||j.snapshot.profile.rang)}</div>
        </div>
        <span class="vault-pill pill-emerald">Átlag: ${a.averageSkill}%</span>
      </div>
      <div class="vault-pill-row">
        ${a.trait?`<span class="vault-pill pill-gold">✨ Tulajdonság: ${G(a.trait)}</span>`:""}
        ${a.status?`<span class="vault-pill pill-cyan">📌 Státusz: ${G(a.status)}</span>`:""}
        ${a.desiredPosition?`<span class="vault-pill pill-amber">🎯 Keresett poszt: ${G(a.desiredPosition)}</span>`:""}
        ${a.cost?`<span class="vault-pill pill-muted">💰 Bérigény: ${a.cost} Kr/hó</span>`:""}
        ${a.employerName?`<span class="vault-pill pill-emerald">⚓ Szolgálatban: ${G(a.employerName)} (${G(a.serviceEndStr)})</span>`:""}
      </div>
    </div>
  `;let r=j.skillsCategoryFilter==="all"?[...a.skillsList]:a.skillsList.filter(l=>l.category===j.skillsCategoryFilter);if(j.skillsSort==="desc"?r.sort((l,o)=>o.value-l.value):j.skillsSort==="asc"?r.sort((l,o)=>l.value-o.value):r.sort((l,o)=>l.name.localeCompare(o.name,"hu")),s&&(s.classList.toggle("active",j.skillsMode3D),s.textContent=j.skillsMode3D?"📐 2D Radar Nézet":"🧊 3D Hologram Nézet"),j.skillsMode3D?(e.style.display="none",t.style.display="block",Ft||(Ft=new bm(t)),Ft.setSkills(a.skillsList),Ft.start()):(Mr(),t.style.display="none",e.style.display="flex",ym(e,a.skillsList)),r.length===0){n.innerHTML='<div class="vault-card"><div class="vault-card-subtitle">Nincs képzettség ebben a kategóriában.</div></div>';return}n.innerHTML=r.map(l=>`
    <div class="skill-bar-row">
      <div class="skill-bar-head">
        <span><strong>${G(l.name)}</strong> <small style="color:#94a3b8;">(${G(l.category)})</small></span>
        <strong style="color:#34d399;">${l.value}%</strong>
      </div>
      <div class="skill-bar-track">
        <div class="skill-bar-fill" style="width:${Math.min(100,Math.max(2,l.value))}%;"></div>
      </div>
    </div>
  `).join("")}function Fl(){const i=fe("crew-filter-bar"),e=fe("crew-cards-list");if(!i||!e)return;const t=j.snapshot.crew,n=[{id:"all",label:`Mind (${t.length})`},{id:"NPC",label:`🤖 NPC (${t.filter(a=>a.sourceType==="NPC").length})`},{id:"Játékos",label:`🏴‍☠️ Játékos (${t.filter(a=>a.sourceType==="Játékos").length})`},{id:"Hajó-legénység",label:`⚓ Hajós (${t.filter(a=>a.sourceType==="Hajó-legénység").length})`},{id:"reserve",label:`📦 Tartalék (${t.filter(a=>a.assignedShips.length===0).length})`},{id:"expiring",label:`⏳ Lejáró (${t.filter(a=>a.remainingDays!==null&&a.remainingDays<=7).length})`}];i.innerHTML=n.map(a=>`<button type="button" class="vault-mini-btn ${j.crewFilter===a.id?"active":""}" data-cfilter="${a.id}">${G(a.label)}</button>`).join(""),i.querySelectorAll("[data-cfilter]").forEach(a=>{a.addEventListener("click",()=>{j.crewFilter=a.dataset.cfilter,Fl()})});const s=t.filter(a=>j.crewFilter==="all"?!0:j.crewFilter==="reserve"?a.assignedShips.length===0:j.crewFilter==="expiring"?a.remainingDays!==null&&a.remainingDays<=7:a.sourceType===j.crewFilter);if(s.length===0){e.innerHTML='<div class="vault-card"><div class="vault-card-subtitle">Nincs a szűrőnek megfelelő felvett embered.</div></div>';return}e.innerHTML=s.map(a=>{const r=a.remainingDays!==null&&a.remainingDays<=7,l=a.sourceType==="NPC"?"pill-gold":a.sourceType==="Játékos"?"pill-emerald":"pill-cyan";return`
        <div class="vault-card" data-crew-id="${G(a.id)}">
          <div class="vault-card-top">
            <div>
              <div class="vault-card-title">${G(a.name)}</div>
              <div class="vault-card-subtitle">${G(a.role)}</div>
            </div>
            <span class="vault-pill ${l}">${G(a.sourceType)}</span>
          </div>

          <div class="trait-callout">✨ <strong>Tulajdonság:</strong> ${G(a.trait||"Nincs megadva")}</div>

          <div class="vault-pill-row">
            <span class="vault-pill pill-muted">💰 ${a.cost} Kr/hó</span>
            <span class="vault-pill ${r?"pill-red":"pill-emerald"}">
              ${a.remainingDays!==null?`⏳ ${a.remainingDays} nap (${G(a.endDateStr)})`:`📅 ${G(a.endDateStr)}`}
            </span>
          </div>

          <div class="vault-pill-row">
            ${a.assignedShips.length>0?a.assignedShips.map(o=>`<button type="button" class="crew-roster-chip" data-jump-ship="${G(o.shipId)}">⛵ ${G(o.shipName)} (${G(o.role)})</button>`).join(""):'<span class="vault-pill pill-amber">📦 Kikötői tartalék</span>'}
          </div>

          ${a.topSkills.length>0?`<div class="vault-pill-row">${a.topSkills.map(o=>`<span class="vault-pill pill-cyan">${G(o.name)}: ${o.value}%</span>`).join("")}</div>`:""}

          ${a.skillsList.length>0?`
            <details class="crew-skills-details">
              <summary>📋 Teljes képzettség-profil (${a.skillsList.length} db)</summary>
              <div class="crew-skills-mini-grid">
                ${a.skillsList.map(o=>`<div>${G(o.name)}: <strong>${o.value}%</strong></div>`).join("")}
              </div>
            </details>`:""}

          ${a.canManage?`
            <div class="crew-actions-row">
              <button type="button" class="vault-mini-btn" data-merc-action="extend" data-merc-name="${G(a.name)}" data-merc-email="${G(a.email)}">⏳ Hosszabbítás (${a.cost} Kr)</button>
              <button type="button" class="vault-mini-btn danger" data-merc-action="dismiss" data-merc-name="${G(a.name)}" data-merc-email="${G(a.email)}">🚪 Elbocsátás</button>
            </div>`:""}
        </div>
      `}).join(""),e.querySelectorAll("[data-jump-ship]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.jumpShip||"";r&&yr("vehicles",r)})}),e.querySelectorAll("[data-merc-action]").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.mercAction,l=a.dataset.mercName||"",o=a.dataset.mercEmail||"";if(!Gi){qt("ℹ️ A szerződésmódosítás a bejelentkezett Kincstár felületen érhető el.","info");return}Vi({type:"KRYST_VAULT_MERC_ACTION",actionType:r,targetName:l,targetEmail:o}),qt("⏳ Művelet továbbítva a kincstári parancsnoki hídnak...","info")})})}function fi(){var l,o;const i=fe("btn-mode-script"),e=fe("btn-mode-ai"),t=fe("assistant-query-input"),n=fe("assistant-presets"),s=fe("assistant-results-container");if(!i||!e||!t||!n||!s)return;i.classList.toggle("active",j.assistantMode==="script"),e.classList.toggle("active",j.assistantMode==="ai");const a=t.value.trim();if(t.classList.toggle("sql-mode",j.assistantMode==="script"&&/^SELECT\s+/i.test(a)),n.innerHTML=zr.map((c,d)=>`<button type="button" class="preset-chip" data-preset-idx="${d}">${G(c.label)}</button>`).join(""),n.querySelectorAll("[data-preset-idx]").forEach(c=>{c.addEventListener("click",()=>{const d=parseInt(c.dataset.presetIdx||"0",10),h=zr[d];h&&(j.assistantMode=h.preferAi?"ai":"script",t.value=h.query,yn(h.query))})}),j.aiLoading){s.innerHTML=`
      <div class="vault-card" style="text-align:center; padding:18px;">
        <div class="vault-loading-spinner">🧠</div>
        <div class="vault-card-title" style="color:var(--color-emerald-glow);">Gemini AI Mélyelemzés folyamatban...</div>
        <div class="vault-card-subtitle">Személyes hajók, képzettségek, legénység és könyvtár átfésülése...</div>
      </div>
    `;return}let r="";if(j.assistantMode==="ai"&&j.lastAiResponse){const c=j.lastAiResponse;c.success?(r+=`
        <div class="vault-card" style="border-color:rgba(52,211,153,0.6);">
          <div class="vault-card-top">
            <div class="vault-card-title" style="color:#6ee7b7;">🧠 AI Mélyelemző Válasza</div>
            <span class="vault-pill pill-emerald">${c.mode==="byok_ai"?"🔑 BYOK Gemini 2.5 Flash":"☁️ GAS AI"}</span>
          </div>
          <div style="font-size:0.84rem; line-height:1.5; color:#f1f5f9;">${G(c.answer)}</div>
          ${c.highlights.length>0?`<ul class="ai-highlights-list">${c.highlights.map(d=>`<li>${G(d)}</li>`).join("")}</ul>`:""}
          ${c.suggestedSql?`<div style="margin-top:6px;"><button type="button" class="vault-mini-btn" data-run-suggested-sql="${G(c.suggestedSql)}">⚡ SQL futtatása: <code>${G(c.suggestedSql)}</code></button></div>`:""}
        </div>
      `,c.matchedItems.length>0&&(r+=`<div class="vault-section-heading"><span>🎯 Kattintható Találati Hivatkozások (${c.matchedItems.length})</span></div>`,r+=c.matchedItems.map(d=>`
          <div class="match-jump-card" data-jump-sec="${G(d.section)}" data-jump-id="${G(d.id)}">
            <div>
              <div style="font-weight:700; color:#f8fafc;">${G(d.label)}</div>
              <div class="vault-card-subtitle">${G(d.reason)}</div>
            </div>
            <span class="vault-pill pill-gold">Ugrás ➔</span>
          </div>
        `).join(""))):r+=`
        <div class="vault-card" style="border-color:rgba(248,113,113,0.6);">
          <div class="vault-card-title" style="color:#fca5a5;">⚠️ AI Asszisztens Válaszhiba</div>
          <div class="vault-card-subtitle">${G(c.error||"Ismeretlen hiba")}</div>
          <div><button type="button" class="vault-mini-btn" id="btn-fallback-script-search">⚡ Futtatás Scriptes Motorral</button></div>
        </div>
      `}else if(j.lastScriptResult){const c=j.lastScriptResult;if(r+=`
      <div class="vault-card">
        <div class="vault-card-top">
          <div class="vault-card-title" style="color:#fde68a;">⚡ Scriptes Motor · ${G(c.kind.toUpperCase())}</div>
          <button type="button" class="vault-mini-btn" id="btn-escalate-to-ai">🧠 Mélyelemzés AI-val</button>
        </div>
        <div style="font-size:0.83rem; color:#f1f5f9;">${G(c.summary)}</div>
        ${c.highlights.length>0?`<ul class="ai-highlights-list">${c.highlights.map(d=>`<li>${G(d)}</li>`).join("")}</ul>`:""}
        ${c.suggestedSql&&c.kind!=="sql"?`<div style="margin-top:4px;"><button type="button" class="vault-mini-btn" data-run-suggested-sql="${G(c.suggestedSql)}">📘 SQL nézet: ${G(c.suggestedSql)}</button></div>`:""}
      </div>
    `,c.sqlResult&&!c.sqlResult.error&&c.sqlResult.rows.length>0){const d=c.sqlResult.columns;r+=`
        <div class="sql-table-wrap">
          <table class="sql-result-table">
            <thead><tr>${d.map(h=>`<th>${G(h)}</th>`).join("")}</tr></thead>
            <tbody>
              ${c.sqlResult.rows.map(h=>`<tr>${d.map(u=>`<td>${G(h[u])}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </div>
      `}c.hits.length>0&&(r+=`<div class="vault-section-heading"><span>🎯 Találatok (${c.hits.length}) — Kattints a megnyitáshoz</span></div>`,r+=c.hits.map(d=>`
        <div class="match-jump-card" data-jump-sec="${G(d.section)}" data-jump-id="${G(d.itemId)}">
          <div>
            <div style="font-weight:700; color:#f8fafc;">${G(d.title)}</div>
            <div class="vault-card-subtitle">${G(d.subtitle)}</div>
            <div class="vault-pill-row" style="margin-top:4px;">${d.badges.map(h=>`<span class="vault-pill pill-cyan">${G(h)}</span>`).join("")}</div>
          </div>
          <span class="vault-pill pill-gold">Ugrás ➔</span>
        </div>
      `).join(""))}else r=`
      <div class="vault-card">
        <div class="vault-card-title">🤖 Hibrid Keresőasszisztens Készenlétben</div>
        <div class="vault-card-subtitle">
          Használd a fenti gyorsgombok egyikét, írj be magyar kérdést (pl. <em>„Melyik hajómon van tekercsprés?”</em>),
          futtass közvetlen SQL lekérdezést (<code>SELECT ... FROM vehicles</code>), vagy válts AI Mélyelemző módra!
        </div>
      </div>
    `;s.innerHTML=r,s.querySelectorAll("[data-jump-sec]").forEach(c=>{c.addEventListener("click",()=>{const d=c.dataset.jumpSec||"overview",h=c.dataset.jumpId||"";yr(d==="vehicles"||d==="crew"||d==="skills"||d==="library"||d==="treasures"?d:"overview",h)})}),s.querySelectorAll("[data-run-suggested-sql]").forEach(c=>{c.addEventListener("click",()=>{const d=c.dataset.runSuggestedSql||"";d&&(j.assistantMode="script",t.value=d,yn(d))})}),(l=fe("btn-escalate-to-ai"))==null||l.addEventListener("click",()=>{j.assistantMode="ai",yn(t.value||j.lastQueryText)}),(o=fe("btn-fallback-script-search"))==null||o.addEventListener("click",()=>{j.assistantMode="script",yn(t.value||j.lastQueryText)})}async function yn(i){const e=fe("assistant-query-input"),t=(i!==void 0?i:(e==null?void 0:e.value)||"").trim();if(j.lastQueryText=t,e&&e.value!==t&&(e.value=t),j.assistantMode==="script"){j.aiLoading=!1,j.lastScriptResult=Yl(t,j.snapshot),fi();return}j.aiLoading=!0,fi();try{const n=await ic(t,j.snapshot);j.lastAiResponse=n}catch(n){j.lastAiResponse={success:!1,mode:"server_ai",answer:"",highlights:[],matchedItems:[],suggestedSql:"",error:n instanceof Error?n.message:String(n)}}finally{j.aiLoading=!1,fi()}}function Us(){switch(j.activeTab){case"overview":Cm();break;case"treasures":Lm();break;case"library":Ul();break;case"vehicles":Cs();break;case"skills":Ms();break;case"crew":Fl();break;case"assistant":fi();break}}function br(){if(!Gi){qt("🧪 Önálló előnézeti mód — élő frissítés a bejelentkezett Kincstárból érhető el.","info");return}j.syncSource="loading",qn(),Vi({type:"KRYST_VAULT_REFRESH_REQUEST"}),qt("↻ Frissítés kérése a Google Sheets adatbázisból...","info")}function Dm(){const i=fe("vault-byok-modal"),e=fe("byok-provider-select"),t=fe("byok-key-input"),n=fe("byok-status-msg");if(!i||!e||!t||!n)return;const s=Ps();e.value=s.provider,t.value="",n.textContent=s.hasByokKey?`Mentett kulcs aktív (${s.maskedKey}) · Útvonal: ${s.provider.toUpperCase()}`:"Nincs saját kulcs mentve — a szerveroldali GAS AI motor aktív.",i.style.display="flex"}function Nm(){const i=fe("vault-viewport");if(!i)return;let e=!1,t=0,n=0;i.addEventListener("pointerdown",s=>{const a=s.target;a&&a.closest("INPUT, BUTTON, SELECT, A, SUMMARY, LABEL, TEXTAREA, CODE")||(e=!0,t=s.clientY,n=i.scrollTop,i.classList.add("is-dragging-scroll"))}),window.addEventListener("pointermove",s=>{e&&(i.scrollTop=n-(s.clientY-t))}),window.addEventListener("pointerup",()=>{e&&(e=!1,i.classList.remove("is-dragging-scroll"))})}function Um(){var s,a,r,l,o,c,d,h,u,g,_,E,f,p,S,T,b,R,w,m,y,N,M;(s=fe("btn-toggle-orientation"))==null||s.addEventListener("click",()=>{j.isLandscape=!j.isLandscape;try{localStorage.setItem(Dl,j.isLandscape?"1":"0")}catch{}Nl()}),(a=fe("btn-vault-home"))==null||a.addEventListener("click",()=>Mt("overview")),(r=fe("btn-vault-refresh"))==null||r.addEventListener("click",()=>br()),(l=fe("btn-open-assistant"))==null||l.addEventListener("click",()=>Mt("assistant")),(o=fe("btn-font-decrease"))==null||o.addEventListener("click",()=>{j.fontScale=Math.max(.82,Math.round((j.fontScale-.06)*100)/100),nr()}),(c=fe("btn-font-increase"))==null||c.addEventListener("click",()=>{j.fontScale=Math.min(1.28,Math.round((j.fontScale+.06)*100)/100),nr()}),(d=fe("vault-coords-display"))==null||d.addEventListener("click",()=>{const L=fe("vault-coords-display"),U=`${j.snapshot.profile.kaloznev} | ${j.snapshot.userEmail} | ${j.snapshot.profile.rang}`;navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText(U).catch(()=>{}),L&&(L.classList.add("coords-copied"),window.setTimeout(()=>L.classList.remove("coords-copied"),1200)),qt("📋 Kapitányi azonosító vágólapra másolva.","ok")}),document.querySelectorAll(".vault-tab-chip[data-tab]").forEach(L=>{L.addEventListener("click",()=>{const U=L.dataset.tab;U&&Mt(U)})});const i=fe("vault-quick-search-input"),e=fe("btn-clear-quick-search"),t=()=>{const L=((i==null?void 0:i.value)||"").trim();L&&(j.assistantMode="script",Mt("assistant"),yn(L))};i==null||i.addEventListener("input",()=>{e&&(e.style.display=i.value?"inline-block":"none")}),i==null||i.addEventListener("keydown",L=>{L.key==="Enter"&&t()}),(h=fe("btn-quick-search-go"))==null||h.addEventListener("click",t),e==null||e.addEventListener("click",()=>{i&&(i.value=""),e&&(e.style.display="none")}),(u=fe("btn-toggle-skills-3d"))==null||u.addEventListener("click",()=>{j.skillsMode3D=!j.skillsMode3D,Ms()}),(g=fe("skills-category-filter"))==null||g.addEventListener("change",L=>{j.skillsCategoryFilter=L.target.value,Ms()}),(_=fe("skills-sort-select"))==null||_.addEventListener("change",L=>{j.skillsSort=L.target.value,Ms()}),(E=fe("btn-mode-script"))==null||E.addEventListener("click",()=>{j.assistantMode="script",fi()}),(f=fe("btn-mode-ai"))==null||f.addEventListener("click",()=>{j.assistantMode="ai",fi()}),(p=fe("btn-toggle-sql-help"))==null||p.addEventListener("click",()=>{const L=fe("assistant-sql-help");L&&(L.style.display=L.style.display==="none"?"flex":"none")});const n=fe("assistant-query-input");n==null||n.addEventListener("input",()=>{n.classList.toggle("sql-mode",j.assistantMode==="script"&&/^SELECT\s+/i.test(n.value.trim()))}),n==null||n.addEventListener("keydown",L=>{L.key==="Enter"&&yn()}),(S=fe("btn-assistant-run"))==null||S.addEventListener("click",()=>yn()),(T=fe("btn-vault-fallback-legacy"))==null||T.addEventListener("click",()=>{Vi({type:"KRYST_VAULT_FALLBACK_LEGACY"})}),(b=fe("btn-vault-load-demo"))==null||b.addEventListener("click",()=>{on!==null&&(clearTimeout(on),on=null),j.snapshot=zo,j.syncSource="demo",ki(!1),Us(),qn()}),(R=fe("btn-open-byok"))==null||R.addEventListener("click",Dm),(w=fe("btn-byok-close"))==null||w.addEventListener("click",()=>{const L=fe("vault-byok-modal");L&&(L.style.display="none")}),(m=fe("btn-byok-save"))==null||m.addEventListener("click",()=>{const L=fe("byok-provider-select"),U=fe("byok-key-input"),W=fe("byok-status-msg"),I=(L==null?void 0:L.value)||"server",V=Jl(I,(U==null?void 0:U.value)||void 0);U&&(U.value=""),W&&(W.textContent=V.provider==="byok"?`✅ Saját Gemini 2.5 Flash mód aktív (${V.maskedKey}).`:"✅ Szerveroldali GAS AI útvonal aktív.")}),(y=fe("btn-byok-clear"))==null||y.addEventListener("click",()=>{jl();const L=fe("byok-provider-select"),U=fe("byok-status-msg");L&&(L.value="server"),U&&(U.textContent="🗑️ Saját kulcs törölve. Visszaállítva a szerveroldali GAS AI motorra.")}),(N=fe("btn-dock-prev"))==null||N.addEventListener("click",()=>{const U=(jt.indexOf(j.activeTab)-1+jt.length)%jt.length;Mt(jt[U])}),(M=fe("btn-dock-next"))==null||M.addEventListener("click",()=>{const U=(jt.indexOf(j.activeTab)+1)%jt.length;Mt(jt[U])}),Nm()}function Fm(){window.addEventListener("message",i=>{const e=i.data;if(!(!e||typeof e!="object"))if(e.type==="KRYST_SYNC_VAULT_DATA"&&e.snapshot){on!==null&&(clearTimeout(on),on=null);const t=e.snapshot;j.snapshot=t,j.syncSource=e.source==="opfs"?"opfs":"cloud",wm(t),ki(!1),Us(),qn(),j.syncSource==="cloud"&&qt("☁️ Kincstár adatok frissítve a Google Sheetsből.","ok")}else if(e.type==="KRYST_VAULT_LOADING")j.syncSource="loading",qn();else if(e.type==="KRYST_VAULT_SWITCH_TAB"){const t=e.tab;t&&jt.includes(t)&&Mt(t,{vehicleId:typeof e.vehicleId=="string"?e.vehicleId:void 0}),typeof e.query=="string"&&e.query.trim()&&(j.assistantMode="script",Mt("assistant"),yn(e.query))}else e.type==="KRYST_VAULT_MERC_ACTION_RESULT"?e.success?(qt(`✅ ${String(e.message||"Szerződés frissítve!")}`,"ok"),br()):qt(`⚠️ ${String(e.error||"Sikertelen művelet.")}`,"err"):e.type==="KRYST_VAULT_ERROR"&&(on!==null&&(clearTimeout(on),on=null),ki(!1),j.syncSource==="loading"&&(j.syncSource=Rs?"opfs":"demo"),qn(),qt(`⚠️ ${String(e.error||"Adatszinkronizálási hiba.")}`,"err"))})}function km(){Nl(),nr(),Um(),Fm();const i=new URLSearchParams(window.location.search),e=i.get("tab"),t=i.get("vehicleId"),n=i.get("q");t&&(j.selectedVehicleId=t),e&&jt.includes(e)&&(j.activeTab=e),Us(),qn(),n&&n.trim()?(j.assistantMode="script",Mt("assistant"),yn(n)):e&&jt.includes(e)&&Mt(e,{vehicleId:t||void 0}),Gi&&(Rs||(ki(!0,"LET-Kincstár szinkronizálása...","Kapitányi adatok, hajók, képzettségek és legénység kiolvasása..."),on=window.setTimeout(()=>{j.syncSource==="loading"&&ki(!0,"A szerver még válaszol...","A háttérszinkron tovább fut, vagy átválthatsz a Klasszikus B-verzióra.")},4e3)),Vi({type:"KRYST_VAULT_READY"})),window.addEventListener("pagehide",()=>{Mr()}),window.addEventListener("beforeunload",()=>{Ft==null||Ft.dispose(),Ft=null})}km();
