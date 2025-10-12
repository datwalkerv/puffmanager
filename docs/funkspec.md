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

## 6. Teljesítmény

## 7. Biztonság

## 8. Kompatibilitás

## 9. UI Képernyőtervek - interakciók

## 10. Fogalomtár