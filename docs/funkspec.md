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

## 7. Biztonság

## 8. Kompatibilitás

## 9. UI Képernyőtervek - interakciók

## 10. Fogalomtár