# PuffManager – Rendszerterv

## 1. Bevezetés

A **PuffManager** egy webalapú projektmenedzsment rendszer, amely a **PuffContent** videóvágó ügynökség és ügyfelei közötti együttműködést támogatja.  
A cél a videóvágási projektek teljes életciklusának digitalizálása, az igénybejelentéstől a kész anyag jóváhagyásáig.

A rendszer fő funkciói:
- Projektek létrehozása, státuszkezelése és megjelenítése Kanban táblán.  
- Valós idejű kommunikáció ügyfelek és vágók között projektalapú chatfelületen.  
- Automatikus értesítések státuszváltozásról és üzenetekről.  
- Admin funkciók a felhasználók, teamek és projektek kezelésére.  

A PuffManager célja, hogy a korábbi manuális, e-mail alapú folyamatokat digitálisan, automatizált módon váltsa ki, minimalizálva a hibalehetőségeket és növelve az átláthatóságot.  

A fejlesztés fő szempontjai: **biztonság**, **megbízhatóság**, **reszponzív működés**, **skálázhatóság** és **jövőbeli bővíthetőség**.

<img src="images\brandbook.png" width="1280" height="720" alt="Üzleti folyamat modell ábra" /> 


## 2. Architektúra és rendszerkomponensek

### 2.1 Áttekintés
A **PuffManager** háromrétegű architektúrára épül:
- **Prezentációs réteg (frontend)** – a felhasználói böngészőben futó, reszponzív webes felület, amely megjeleníti a projekteket, státuszokat és a kommunikációt.  
- **Alkalmazási réteg (backend)** – a szerveroldali logika, amely feldolgozza a felhasználói műveleteket, kezeli a hitelesítést és kapcsolatot tart az adatbázissal.  
- **Adatréteg (adatbázis)** – a projektek, felhasználók, teamek és üzenetek tárolásáért felelős dokumentum-alapú adatbázis (MongoDB).  

<img src="images/2_1_chart.png" width="525" height="420" alt="Architektúra rétegek ábra" /> 

---

### 2.2 Frontend
A **kliensoldali komponens** a felhasználói élményért és az interaktív funkciókért felelős.  
A PuffManager frontendje **Next.js** alapokra épül, **React Server Components** és **Server Actions** használatával, így az adatok valós időben frissülnek.  

A főbb technológiák:
- **Next.js 14** – modern React keretrendszer, SSR és SSG támogatással  
- **TypeScript** – típusbiztos fejlesztés a hibák minimalizálására  
- **TailwindCSS** – reszponzív, gyors és egységes dizájn  
- **shadcn/ui** – komponens könyvtár React keretrendszerhez

A felület **minden modern böngészőben** (Chrome, Firefox, Edge, Safari) működik, és optimalizált **mobil, tablet és asztali** megjelenítésre.  
A dizájn letisztult, fókuszált a hatékony munkavégzésre, külön felhasználói nézetekkel (ügyfél, vágó, admin).  
([Funkcionális specifikáció](/docs/funkspec.md), 8. Kompatibilitás)

### 2.3 Backend
A **szerveroldali logika** a Next.js Server Actions segítségével működik, amely közvetlenül integrálódik a frontenddel, ezáltal nincs szükség külön REST API rétegre az alapműveletekhez.  
A backend felel a **hitelesítésért, adatkezelésért, státuszfrissítésekért és értesítésekért**.

A főbb technológiák:
- **Next.js Server Actions** – biztonságos szerveroldali adatkezelés közvetlen komponensekből  
- **BetterAuth** – modern, session alapú hitelesítés, szerepkörkezeléssel (ügyfél / vágó / admin)  
- **Zod** – adatvalidáció kliens és szerveroldalon  
- **Mongoose** – MongoDB modellek és séma alapú adattárolás  

<img src="images/2_3_chart.png" width="2500" height="500" alt="Backend architektúra ábra" /> 

A backend **moduláris felépítésű**, így külön kezelhetők a következő funkciók:
- **Felhasználókezelés** (regisztráció, bejelentkezés, szerepkörök)  
- **Projektmenedzsment** (létrehozás, státuszfrissítés, hozzárendelés)  
- **Chat és értesítés modul** (valós idejű kommunikáció)  
- **Admin modul** (teamek, riportok, audit naplózás)  

Ez a felépítés megkönnyíti a **karbantartást, hibakeresést és bővíthetőséget**, mivel az egyes modulok önállóan fejleszthetők és tesztelhetők.  
([Követelmény specifikáció](/docs/kovspec.md), 6. A rendszerre vonatkozó szabályok)


### 2.4 Adatréteg
Az **adatréteg** a MongoDB dokumentum-alapú adatbázisra épül, amely rugalmasan kezel különböző típusú projekteket, üzeneteket és metaadatokat.

Főbb kollekciók:
- `users` – felhasználói adatok (név, e-mail, szerepkör, jelszó hash)  
- `projects` – projektek, státusz, határidő, hozzárendelt vágó, ügyfél és Google Drive link  
- `teams` – admin által kezelt csoportstruktúra  
- `messages` – chatüzenetek és kommunikációs naplók 
  

### 2.5 Kommunikáció és biztonság
A kliens és a szerver közötti adatforgalom **HTTPS + TLS 1.3** protokollon keresztül zajlik.  
A felhasználói jelszavak **bcrypt** algoritmussal hash-elve kerülnek tárolásra, és a session-kezelést a **BetterAuth** biztonságos tokenrendszere biztosítja.  

- Az adatok JSON formátumban továbbítódnak, így könnyen integrálhatók más rendszerekkel.  
- Minden kritikus művelet naplózásra kerül az audit logban.  
- A fájlfeltöltések korlátozottak (<10MB), nagyobb fájlok **Google Drive link** formájában csatolhatók.  
- A rendszer inaktivitás esetén automatikusan kijelentkezteti a felhasználót.  

Ezzel a megoldással a **PuffManager** garantálja az **adatbiztonságot, megbízhatóságot és a GDPR-megfelelést**.  
([Funkcionális specifikáció](/docs/funkspec.md), 7. Biztonság)

## 3. Adatbázis terv

A PuffManager adatkezelése **MongoDB** dokumentum-alapú adatbázison keresztül történik.  
A cél egy **rugalmas, skálázható és könnyen bővíthető** adattárolási modell, amely támogatja a különböző projekt-, felhasználó- és üzenettípusokat.

Az adatkezelés a **Mongoose** ORM segítségével történik, amely biztosítja a típusos sémákat és az adatvalidációt.  
A relációkat referenciák (`ObjectId`) kezelik a kollekciók között.

### 3.1 Kollekciók és sémák

#### `users`
| Mező | Típus | Leírás |
|------|-------|--------|
| `_id` | ObjectId | Egyedi azonosító |
| `name` | String | Teljes név |
| `email` | String | E-mail cím (egyedi) |
| `password` | String | Bcrypt-tel hash-elt jelszó |
| `role` | String | Felhasználói szerepkör (`client`, `editor`, `admin`) |
| `createdAt` | Date | Regisztráció dátuma |
| `lastLogin` | Date | Utolsó bejelentkezés ideje |

#### `projects`
| Mező | Típus | Leírás |
|------|-------|--------|
| `_id` | ObjectId | Egyedi azonosító |
| `title` | String | Projekt neve |
| `description` | String | Részletes leírás |
| `status` | String | Státusz (`new`, `in_progress`, `review`, `completed`) |
| `deadline` | Date | Határidő |
| `clientId` | ObjectId | Ügyfél hivatkozás |
| `editorId` | ObjectId | Vágó hivatkozás |
| `driveLink` | String | Google Drive link |
| `createdAt` | Date | Létrehozás dátuma |
| `updatedAt` | Date | Utolsó módosítás ideje |

#### `messages`
| Mező | Típus | Leírás |
|------|-------|--------|
| `_id` | ObjectId | Egyedi azonosító |
| `projectId` | ObjectId | Kapcsolódó projekt |
| `senderId` | ObjectId | Küldő azonosító |
| `content` | String | Üzenet szövege |
| `timestamp` | Date | Küldés ideje |
| `isRead` | Boolean | Olvasottság |

#### `teams`
| Mező | Típus | Leírás |
|------|-------|--------|
| `_id` | ObjectId | Egyedi azonosító |
| `name` | String | Csapat neve |
| `members` | [ObjectId] | Csapattagok azonosítói |
| `createdBy` | ObjectId | Admin hivatkozás |
| `createdAt` | Date | Létrehozás dátuma |

A kollekciók indexelése biztosítja a gyors lekérdezéseket (`email`, `projectId`, `senderId`).  
Az adatok JSON formátumban kommunikálnak a frontenddel.

## 4. Funkcionális tervek / folyamatok

A rendszer fő folyamatai a projektmenedzsment életciklusát követik, a létrehozástól a lezárásig.

<img src="images\projektletrehozasa.png" width="500" height="400" alt="Projektfolyamat ábra" />

### 4.1 Projekt létrehozása és kezelése
1. Az **ügyfél** új projektet hoz létre (cím, leírás, határidő, Drive-link megadása).  
2. Az adatokat a **Zod** validálja, majd a projekt bekerül a `projects` kollekcióba.  
3. Az **admin** hozzárendeli a megfelelő vágót.  
4. A státusz a folyamat előrehaladtával változik (`new` → `in_progress` → `review` → `completed`).  
5. A változások a **Kanban táblán** valós időben frissülnek.

### 4.2 Kommunikáció és értesítések
- A projektalapú **chat** biztosítja a közvetlen ügyfél–vágó kommunikációt.  
- Az üzenetek a `messages` kollekcióban tárolódnak, és **Server Actions** segítségével azonnal megjelennek.  
- A rendszer értesítéseket küld:
  - új üzenet érkezésekor,  
  - státuszváltozás esetén,  
  - új projekt létrejöttekor.  

Későbbi fejlesztési fázisban az értesítések e-mail és mobil push formában is elérhetők lesznek.

### 4.3 Felhasználó- és szerepkörkezelés
- Hitelesítés: **BetterAuth** segítségével, session tokennel.  
- Jogosultságkezelés:  
  - **Ügyfél:** saját projektjeinek kezelése és chatelés.  
  - **Vágó:** hozzárendelt projektek szerkesztése.  
  - **Admin:** felhasználók, projektek és teamek teljes körű kezelése.  
- A jogosultságokat middleware szinten ellenőrzi a rendszer minden kérésnél.

### 4.4 Audit és naplózás
- Minden művelet (bejelentkezés, státuszváltás, üzenetküldés) naplózásra kerül.  
- Az admin számára külön **audit nézet** biztosítja a naplók idő- és felhasználó szerinti szűrését.  
- A naplózás célja a **biztonság, hibakeresés és megfelelőség** biztosítása.

## 5. Felhasználói felület tervei

A PuffManager UI terve a **letisztultság**, **átláthatóság** és **hatékonyság** elvei mentén készült.  
A dizájn **TailwindCSS** és **shadcn/ui** komponensekre épül, a reszponzivitást és egységes vizuális élményt szem előtt tartva.

### 5.1 Főbb nézetek
<img src="images\fobb_nezetek.png" width="900" height="600" alt="Főbb nézetek ábra" />

#### a) Bejelentkezés / Regisztráció
- Középre igazított, kártya formátumú űrlap.  
- Valós idejű validáció (`Zod`) és jelszó megjelenítés funkció.  
- “Elfelejtett jelszó” opció a jövőbeni bővítéshez előkészítve.

#### b) Kezdőlap (Dashboard)
- Szerepkör-alapú nézet:  
  - **Ügyfél:** saját projektek listája.  
  - **Vágó:** aktív projektek és értesítések.  
  - **Admin:** statisztikák, auditnapló, csapatkezelés.
 
#### c) Kanban tábla
- Oszlopok: *Új*, *Folyamatban*, *Ellenőrzés alatt*, *Kész*.  
- Drag & drop funkcióval mozgatható kártyák.  
- Az állapotváltás azonnal frissül a szerveren és a klienseknél.

#### d) Projekt részletek
- Teljes információs panel (leírás, határidő, státusz, Drive-link).  
- Valós idejű **chatpanel** a kommunikációhoz.  
- Fájlcsatolási lehetőség (Drive-link formában).

#### e) Admin felület
- CRUD műveletek felhasználókon, teameken és projekteken.  
- Riportnézet a státuszok és aktivitások statisztikájával.  
- Audit log megjelenítés szűrhető táblázatban.

### 5.2 Reszponzív megjelenítés és UX
- Mobilon egyoszlopos nézet, ikon alapú navigációval.  
- Tableten és asztali nézetben oldalsávos menü.  
- Támogatja a **dark mode** megjelenítést és megfelel a **WCAG 2.1** szabványnak.  
- Az UI interakciók **framer-motion** animációkkal támogatottak.

### 5.3 Felhasználói élmény
- Egységes tipográfia és színpaletta a márkaarculathoz igazítva.  
- Minden művelet visszajelzéssel jár (toast, modal, loading state).  
- Az egyszerű kezelhetőség biztosítja, hogy a PuffManager a videóvágó ügynökség munkáját gyorsabbá, átláthatóbbá és hatékonyabbá tegye.

## 6. Nem funkcionális tervek
- A PuffManager fejlesztése során kiemelt szempont a stabilitás, a biztonság és a skálázhatóság.
- A nem funkcionális követelmények biztosítják, hogy a rendszer hosszú távon is megbízhatóan, hatékonyan és fenntarthatóan működjön.

<img src="images\abra6pont.png" width="500" height="400" alt="Nem Funk Tervek ábra" />

### 6.1 Teljesítmény
- A rendszer célja, hogy a felhasználói műveletek válaszideje átlagosan ne haladja meg az 500 ms-ot.
- A MongoDB indexelések optimalizálják a lekérdezéseket, a Next.js SSR és cache rétege pedig csökkenti a szerverterhelést.
- A websockets alapú kommunikáció minimális adatforgalommal frissíti a valós idejű chatet és Kanban táblát.

### 6.2 Biztonság
- A PuffManager HTTPS és TLS 1.3 protokollt alkalmaz az adatvédelem érdekében.
- Minden jelszó bcrypt algoritmussal kerül tárolásra, és a session-kezelés titkosított JWT tokenen alapul.
- A hozzáférések szerepköralapúak (RBAC), a kritikus műveletek pedig audit logba kerülnek.
- Az adatbázis biztonsági mentése naponta automatikusan megtörténik.

### 6.3 Megbízhatóság és rendelkezésre állás
- A rendszer célzott rendelkezésre állása 99,5%.
- A backend futtatása több konténeres Docker környezetben történik, így egy komponens hibája nem okoz teljes kiesést.
- Az alkalmazás automatikusan újraindul hibás folyamat esetén (PM2 / Docker restart policy).

### 6.4 Skálázhatóság
- A horizontális skálázás Kubernetes segítségével történik, lehetővé téve a dinamikus terheléselosztást.
- A MongoDB Atlas rugalmas skálázási lehetőséget biztosít a növekvő adat- és felhasználószámhoz.
- A rendszer architektúrája moduláris, így új funkciók később külön mikroszolgáltatásként is integrálhatók.

### 6.5 Karbantarthatóság
- A kód TypeScript alapon, szigorú lintelési szabályokkal készül (ESLint, Prettier).
- A moduláris mappastruktúra és egységtesztek (Jest) segítik a hibák gyors azonosítását.
- Az architektúra dokumentálva van, és minden fő komponenshez külön README tartozik.
- A CI/CD pipeline automatikus tesztfuttatást végez minden commit előtt.

### 6.6 Használhatóság
- A felület reszponzív, egyszerűen kezelhető, és megfelel a WCAG 2.1 AA szabványnak.
- Az interakciók vizuális visszajelzésekkel (loading state, toast, modal) támogatottak.
- A dizájn a hatékonyságot szolgálja: minden művelet maximum három kattintással elérhető.
- A dark mode és többnyelvűség támogatása jövőbeli fejlesztésre előkészítve.
### 6.7 Hordozhatóság és kompatibilitás
- A rendszer platformfüggetlen: Windows, macOS és Linux környezetben is futtatható.
- A böngészőtámogatás kiterjed a Chrome, Firefox, Edge és Safari legfrissebb verzióira.
- Az alkalmazás Docker image formában szállítható, könnyen telepíthető bármely felhőszolgáltatóra.
- Az adatkommunikáció JSON alapú, így külső integrációkhoz is illeszthető.

## 7. Üzemeltetés és karbantartás
- A PuffManager folyamatos, 24/7 elérhetőséget igénylő üzleti környezetben működik.
- Az üzemeltetési és karbantartási eljárások célja a megbízható szolgáltatás biztosítása és a kiesési idők minimalizálása.

<img src="images\abra7pont.png" width="500" height="170" alt="Üzemeltetés és karbantartás ábra" />

### 7.1 Rendszerkörnyezet
- Az alkalmazás Docker konténerekben fut, Node.js 20 és MongoDB 7 környezetben.
- A hosztolás kezdetben Vercel (frontend) és MongoDB Atlas (adatbázis) platformokon történik.
- A backend futtatható saját VPS-en vagy Kubernetes clusterben is, automatikus skálázással.

### 7.2 Telepítés és frissítés
- A rendszer telepítése CI/CD folyamaton keresztül történik (GitHub Actions).
- Minden commit után automatikus build, teszt és staging deploy fut le.
- A production környezetbe csak manuális jóváhagyással kerülhet kiadás.
- A frissítések verziózottak (semantic versioning), és changelogban dokumentáltak.

### 7.3 Mentés és helyreállítás
- Az adatbázis napi mentése automatikusan történik, 30 napos megőrzéssel.
- A mentések titkosítva tárolódnak (AES-256), és külső tárhelyre replikálódnak.
- Helyreállítás teszt havonta egyszer végrehajtásra kerül a mentések ellenőrzésére.

### 7.4 Monitorozás és naplózás
- A rendszer teljesítményét Prometheus és Grafana segítségével figyelik.
- A logok a Loki rendszerbe kerülnek, ahol idő- és típus szerint kereshetők.
- A hibák automatikusan riasztást generálnak (Slack / e-mail integráció).
- Az audit logok 1 évig megőrzésre kerülnek, megfelelve a GDPR előírásoknak.

### 7.5 Hibakezelés és támogatás
- A rendszer hibái kategorizáltak (kritikus / magas / alacsony prioritás).
- A hibajelentések Jira alapú hibakövető rendszerben kerülnek rögzítésre.
- A javításokat staging környezetben validálják, majd élesítés előtt tesztelik.
- A felhasználók dedikált támogatási e-mail címen keresztül jelezhetnek problémát.

### 7.6 Teljesítményoptimalizálás
- A cache réteg (Redis) gyorsítja a gyakran használt adatok elérését.
- A képek és statikus erőforrások CDN-en keresztül kerülnek kiszolgálásra.
- A lekérdezések és indexelések negyedévente teljesítmény-auditon esnek át.
- A nem használt projektek archív státuszba kerülnek a terhelés csökkentése érdekében.

### 7.7 Biztonsági frissítések
- A függőségek automatikus auditja hetente lefut (npm audit / Dependabot).
- A sérülékenységek javítása 48 órán belül megtörténik.
- Az admin hozzáférések kétfaktoros hitelesítéssel védettek.
- Az SSL tanúsítványok automatikusan megújulnak (Let’s Encrypt).

### 7.8 Dokumentáció és továbbfejlesztés
- Az üzemeltetési folyamatok, API endpointok és konfigurációk dokumentálva vannak.
- A fejlesztői kézikönyv tartalmazza a telepítés, tesztelés és release lépéseit.
- A rendszer későbbi modulbővítései (pl. mobilapp, AI-vágás asszisztens) a jelenlegi architektúrára építhetők.
- A PuffManager üzemeltetése így hosszú távon is biztonságos, fenntartható és rugalmas marad.