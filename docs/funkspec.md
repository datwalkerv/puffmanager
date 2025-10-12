# PuffManager -  Funkcionális specifikáció

## 1. Bevezetés

## 2. Rendszer áttekintés

## 3. Felhasználói műveletek

## 4. Rendszer reakciók
* A rendszer a bejelentkezéskor azonosítja a felhasználói szerepkört (ügyfél, vágó, admin).
* Sikeres bejelentkezés után a felhasználó automatikusan a saját dashboardjára kerül.
* Ha helytelen bejelentkezési adatot ad meg a felhasználó, a rendszer hibát jelez és nem enged tovább.
* Projektfeltöltés után a rendszer automatikusan létrehozza a projektkártyát a Kanban táblán.
* Az ügyfél űrlap beküldése után visszaigazolást kap az adatok sikeres mentéséről.
* A vágók módosíthatják a projekt státuszát, amely azonnal frissül a Kanban táblán.
* A módosításról automatikus értesítés generálódik az érintett ügyfél számára.
* Hiba esetén (pl. sikertelen fájlfeltöltés) a rendszer részletes hibaüzenetet jelenít meg.
* Az admin tevékenysége (új team, új projekt, státuszmódosítás) szintén valós idejű frissítést eredményez.
* A rendszer reagál az inaktív munkamenetekre és biztonsági okokból automatikusan kijelentkeztet.
* Az adatok mentése mindig biztonságos tranzakción keresztül történik, hogy elkerülje az adatvesztést.
* A felhasználók műveleteit a rendszer naplózza audit célokra.
* A rendszer minden frissítésnél és kommunikációnál törekszik a minimális késleltetésre.
## 5. Adatbevitel és -kimenet
* Az ügyfelek egy űrlapon keresztül vihetnek be projektadatokat (leírás, fájlok, határidők stb...).
* A fájlok feltöltése támogatja a leggyakoribb formátumokat (pl. mp4, mov, zip, pdf).
* Az admin jogosult új ügyfeleket és teameket rögzíteni a rendszerben.
* A vágók frissíthetik a projektek státuszát (pl. “Folyamatban”, “Jóváhagyásra vár”, “Kész”).
* A rendszer automatikusan rögzíti az összes adatbevitel időpontját és felhasználóját.
* Az adatbázisban minden projekt egyedi azonosítóval szerepel.
* A kimeneti oldalon a Kanban board vizuálisan jeleníti meg a projektek állapotát.
* Az ügyfelek lekérdezhetik saját projektjeik előrehaladását és státuszát.
* Az üzenetek valós idejű chat formájában kerülnek megjelenítésre a projektszálakon belül.
* Az adatbázis kapcsolatot biztosít az ügyfelek, projektek, csapatok és üzenetek táblái között.
* Az admin exportálhat riportokat CSV vagy PDF formátumban.
* Az adatok megjelenítése dinamikusan történik, újratöltés nélkül.
* Az adatbevitel validációval történik, hogy elkerülhető legyen a hibás adatrögzítés.
* A rendszer képes a fájlokhoz kapcsolódó metaadatokat is tárolni (méret, formátum, feltöltő).
* Minden kommunikáció biztonságosan kerül továbbításra a bizalmas információk védelmének érdekében.
## 6. Teljesítmény
* A rendszer célja, hogy több projekt egyidejű kezelését is stabilan támogassa.
* Az oldalak betöltési ideje nem haladhatja meg a 2 másodpercet normál hálózati környezetben.
* A chat funkció valós idejű kommunikációt biztosít 1 másodpercen belüli késéssel.
* A Kanban board frissítése aszinkron módon történik, minimális erőforrás-használattal.
* A fájlfeltöltések hátterében futnak, hogy ne blokkolják a felhasználói élményt.
* A rendszer adatbázisa indexeléssel optimalizált a gyors lekérdezésekhez.
* A szerver oldali folyamatok képesek többfelhasználós, párhuzamos műveletek kiszolgálására.
* Az értesítések és státuszfrissítések valós időben történnek WebSocket technológiával.
* A rendszer automatikusan skálázható nagyobb felhasználói terhelés esetén.
* A biztonsági mentések napi szinten készülnek, hogy adatvesztés ne történhessen.
* A rendszer 99,5%-os rendelkezésre állást biztosít éves szinten.
* Az erőforrás-használat optimalizált, így mobil eszközökön is gyorsan működik.
* A memóriakezelés és gyorsítótárazás révén a navigáció gördülékeny.
* A teljesítmény monitorozása folyamatos, így az admin értesülhet esetleges hibákról.
* A **cél**, hogy a PuffManager nagy terhelés mellett is megbízhatóan és gyorsan működjön.
## 7. Biztonság
- A rendszer minden adatát titkosított (HTTPS + TLS 1.3) kapcsolaton keresztül továbbítja.  
- A felhasználói jelszavak biztonságos, sózott és hash-elt formában kerülnek tárolásra (pl. bcrypt).  
- Többszintű jogosultságkezelés biztosítja, hogy az ügyfelek, vágók és adminok csak a saját adataikhoz férjenek hozzá.  
- Az inaktív felhasználók automatikusan kijelentkeztetésre kerülnek biztonsági időkorlát lejártakor.  
- Az adminisztrátori műveletek naplózásra kerülnek audit célokra, visszakövethető módon.  
- A rendszer védelmet nyújt brute force támadások ellen (pl. 5 sikertelen bejelentkezés után ideiglenes tiltás).  
- A fájlfeltöltéseket vírusellenőrzés és méretkorlátozás védi.  
- Az adatbázis hozzáférése korlátozott, kizárólag az alkalmazás szerver használhatja.  
- Napi biztonsági mentések készülnek a teljes adatbázisról, és ezek titkosított formában tárolódnak.  
- Az alkalmazás megfelel az adatvédelmi előírásoknak (GDPR).
## 8. Kompatibilitás
 - A PuffManager rendszer reszponzív kialakítású, asztali és mobil eszközön is teljes funkcionalitást biztosít.  
- Támogatott böngészők: Google Chrome, Mozilla Firefox, Microsoft Edge, Safari (legutóbbi 2 verzió).  
- A rendszer platformfüggetlen, Windows, macOS és Linux környezetben is működik.  
- A backend REST API-kompatibilis, így más rendszerek is integrálhatók vele.  
- Az alkalmazás támogatja a különböző képernyőfelbontásokat (min. 1280×720 px).  
- A fájlfeltöltések és letöltések kompatibilisek minden modern operációs rendszerrel.  
- A rendszer mobil nézetben is optimalizált elrendezést biztosít a Kanban boardhoz és chathez.  
## 9. UI Képernyőtervek - interakciók
 
## 10. Fogalomtár

