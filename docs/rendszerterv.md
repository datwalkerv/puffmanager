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


## 4. Funkcionális tervek / folyamatok

## 5. Felhasználói felület tervei

## 6. Nem funkcionális tervek

## 7. Üzemeltetés és karbantartás

