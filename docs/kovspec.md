# PuffManager - Követelmény specifikáció

## 1. Bevezetés
* A **PuffManager** egy webalapú projektmenedzsment rendszer, amely az ügyfelek és vágók közötti együttműködést segíti.
* A cél a kommunikáció egyszerűsítése, az átlátható munkaszervezés és a gyors visszajelzések biztosítása.
* A rendszer egyaránt kiszolgálja az ügyfeleket és a szerkesztői csapatot, külön felhasználói szerepkörökkel.
* Az alkalmazás modern, reszponzív felülettel rendelkezik, amely asztali és mobil eszközökön is jól használható.
* A projektmenedzsment alapja egy Kanban-tábla, ahol vizuálisan követhető a munkafolyamat állapota.
* A fejlesztés célja, hogy a jelenlegi manuális folyamatokat digitálisan, automatizáltan támogassa.
## 2. Jelenlegi helyzet
* Jelenleg az ügyfelek és vágók közötti kommunikáció e-mailben vagy üzenetküldő alkalmazásokban zajlik.
* A projektek státuszának követése nehézkes, az információk szétszórtan, több platformon érhetők el.
* Nincs egységes rendszer a feladatok feltöltésére, nyomon követésére és dokumentálására.
* Az adminisztráció manuálisan történik, ami időigényes és hibalehetőségekkel teli folyamat.
* Az ügyfelek gyakran nincsenek naprakész információ birtokában a projektjeik előrehaladásáról.
* A kommunikációs hiányosságok miatt gyakran előfordulnak félreértések és késések a projektek során.
## 3. Vágyálom rendszer
* A **PuffManager** lehetővé teszi a bejelentkezést ügyfél és vágó szerepkörben.
* Az ügyfelek projektfeltöltő űrlapon keresztül adhatják meg a munkához tartozó adatokat és fájlokat.
* Az admin teamekbe szervezi az ügyfeleket és projektjeiket, így átlátható struktúra alakul ki.
* A Kanban board segítségével minden felhasználó valós időben láthatja a feladatok státuszát.
* A rendszer automatikus értesítéseket küld minden módosításról az érintett ügyfeleknek.
* Minden projekt rendelkezik egy külön chat thread-del, ahol az ügyfél és a vágó közvetlenül kommunikálhat.
* A beszélgetések archiválódnak, így később is visszakereshetők.
* A felület intuitív, letisztult, és a gyors együttműködést támogatja.
* A cél egy átlátható, hatékony és központi platform kialakítása az egész munkafolyamat számára.
## 4. Jelenlegi üzleti folyamatok
Az ügyfelek jelenleg e-mailben vagy közösségi üzenetküldő alkalmazásokon keresztül küldik el a nyersanyagokat és a vágási instrukciókat.  
A vágók ezeket manuálisan rendszerezik, gyakran külön mappákban és táblázatokban tartják nyilván a projekteket.  
Az adminisztrátorok e-mailben osztják ki a feladatokat a vágók között, ami nehezen követhető.  
A projektek státuszának frissítése nem egységes módon történik, így gyakran hiányzik a naprakész információ.  
A kommunikáció nem központosított, emiatt az üzenetek, fájlok és megjegyzések több helyen is elveszhetnek.  
A határidők betartása nehézkes, mert nincs automatikus értesítés vagy figyelmeztető rendszer.  
Az adminisztrátor manuálisan készít jelentéseket és kimutatásokat a folyamatokról.  
A hibakezelés (pl. hiányzó fájlok, félreértett instrukciók) jellemzően személyes egyeztetéssel történik.  
Nincs lehetőség valós idejű státuszfrissítésekre, így az ügyfelek gyakran bizonytalanok a projekt állapotát illetően.  
A jelenlegi folyamat időigényes, széttagolt és hibalehetőségekkel teli.
## 5. Igényelt üzleti folyamatok
A rendszernek automatizált és átlátható munkafolyamatot kell biztosítania az ügyfelek, vágók és adminok számára.  
Az ügyfelek közvetlenül a felületen keresztül tölthetik fel a projekteket és fájlokat egy strukturált űrlapon.  
A vágók azonnali értesítést kapnak az új vagy módosított projektekről.  
Az admin feladata a projektek és teamek létrehozása, kiosztása, valamint az erőforrások kezelése.  
A Kanban board valós időben tükrözi a projektek aktuális státuszát.  
Az ügyfelek bármikor ellenőrizhetik saját projektjeik előrehaladását és kommunikálhatnak a vágóval a chat modulban.  
Minden státuszváltozás, üzenet vagy feltöltés automatikus értesítést generál az érintettek számára.  
A rendszer naplózza a felhasználói tevékenységeket, így visszakövethető minden módosítás.  
Az adminok automatikus riportokat exportálhatnak PDF vagy CSV formátumban.  
A cél egy digitalizált, gyors és hibamentes projektmenedzsment-folyamat, amely minimális manuális beavatkozást igényel.
## 6. A rendszerre vonatkozó szabályok
A rendszerhez csak regisztrált felhasználók férhetnek hozzá érvényes hitelesítéssel.  
A felhasználók három szerepkörbe tartozhatnak: ügyfél, vágó, admin.  
Minden szerepkör csak a saját adatait és feladatait érheti el.  
Az adatbevitelek validációval történnek, hibás adat esetén a rendszer visszajelzést ad.  
Minden projekt egyedi azonosítóval kerül tárolásra az adatbázisban.  
A fájlokhoz metaadatok társulnak (feltöltő, formátum, méret, időpont).  
Az üzenetküldések és státuszváltozások valós időben történnek WebSocket technológiával.  
Az admin módosíthatja a rendszerben tárolt adatokat, de minden változás naplózásra kerül.  
A rendszer automatikusan kijelentkezteti az inaktív felhasználókat biztonsági okokból.  
Az adatmentés napi szinten történik, és visszaállítható hiba esetén.  
A jelszavak titkosítva kerülnek tárolásra, megfelelve a GDPR előírásainak.  
A fájlfeltöltések korlátozott méretűek és ellenőrzésen esnek át.  
A Kanban board státuszai előre definiáltak, módosításukat csak a vágók és adminok végezhetik.  
A rendszer minden frissítése aszinkron módon, oldal-újratöltés nélkül történik.  
A hozzáférések naplózottak, és auditálhatók szükség esetén.  
Az adminisztrátorok kizárólag biztonságos bejelentkezés után hajthatnak végre módosításokat.  
A rendszer teljesítménye skálázható, hogy több felhasználót is kiszolgáljon egyidejűleg.  
Az értesítések nem zavarhatják a felhasználói munkafolyamatot, de biztosítják a naprakész tájékoztatást.  
A felhasználók adatainak biztonsága és a rendszer megbízhatósága elsődleges követelmény. 
## 7. Követelménylista
A rendszerrel szemben az alábbi főbb követelmények kerülnek meghatározásra:

- A felhasználók számára biztosított legyen a projektek egyszerű feltöltése, kezelése és nyomon követése.  
- A rendszer támogassa a különböző szerepköröket (ügyfél, vágó, admin), megfelelő jogosultságkezeléssel.  
- Az ügyfelek online űrlapon keresztül adhassanak le új projekteket, és tölthessék fel a szükséges fájlokat.  
- A rendszer automatikusan rendelje a projekteket a megfelelő vágókhoz és teamekhez, az admin beavatkozása nélkül.  
- A projektek előre definiált státuszokon (pl. „Új”, „Folyamatban”, „Jóváhagyás alatt”, „Kész”) haladjanak végig, a változások valós időben jelenjenek meg a Kanban boardon.  
- Az ügyfelek és vágók között biztosított legyen a közvetlen kommunikáció a projekt saját chatfelületén.  
- A rendszer automatikus értesítéseket küldjön minden fontos eseményről (új projekt, státuszváltás, új üzenet, fájlfeltöltés).  
- Minden felhasználó rendelkezzen saját fiókkal, ahol megtekintheti projektjeit, üzeneteit és a hozzá kapcsolódó információkat.  
- Az adatbevitel során a rendszer végezzen validációt, és hibás adatok esetén adjon visszajelzést.  
- A felhasználói tevékenységek (státuszváltás, fájlfeltöltés, üzenetküldés stb.) naplózásra kerüljenek, visszakövethető módon.  
- A rendszer automatikusan generáljon összefoglaló riportokat (pl. projektek száma, státuszok, teamek teljesítménye), melyek letölthetők és áttekinthető formátumban elérhetők.  
- Az alkalmazás legyen reszponzív, biztonságos, gyors és skálázható, hogy egyszerre több felhasználót is kiszolgáljon.  
- A platform megbízhatóan működjön, könnyen kezelhető legyen, és támogassa a későbbi fejlesztéseket, bővítéseket.  

## 8. Üzelti folyamat modell
1. **Ügyfél bejelentkezik** a rendszerbe.  
2. **Új projektet hoz létre**, megadja a szükséges adatokat (cím, leírás, határidő) és **feltölti a fájlokat**.  
3. **A rendszer értesíti az admint**, hogy új projekt érkezett.  
4. **Az app autómatikusan hozzárendeli** a projektet egy **vágóhoz** és **teamhez**.  
5. **Vágó értesítést kap**, majd **megkezdi a munkát**.  
6. **A projekt státusza** automatikusan frissül a Kanban boardon („Folyamatban”).  
7. **Kommunikáció** zajlik az ügyfél és a vágó között a **chatben**.  
8. A **vágó feltölti** a kész verziót és státuszt vált („Jóváhagyás alatt”).  
9. **Ügyfél megtekinti és visszajelez**.  
10. Ha jóváhagyás történik → státusz „Kész”.

<img src="images\flowchart.png" width="700" height="410" alt="Üzleti folyamat modell ábra" /> 

## 9. Fogalomszótár
