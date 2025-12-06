# Márton Marcell - PuffManager Tesztjegyzőkönyv

## Bevezetés
Ez a tesztjegyzőkönyv a PuffManager alkalmazás különböző moduljainak működését dokumentálja. A tesztelés célja a rendszer funkcionalitásának, felhasználói felületének és adatkezelésének ellenőrzése. A vizsgált területek a következők:

* Autentikáció (Auth): bejelentkezés, regisztráció, jelszókezelés, profiladatok módosítása.
* Kanban tábla: lista- és kártyakezelés, drag & drop, címkézés, prioritások, határidők.
* Chat modul: üzenetküldés, üzenetszerkesztés, törlés, reakciók, fájl- és emoji kezelése, realtime szinkronizáció.
* Projekt kezelés: projekt létrehozása, szerkesztése, törlése, státusz- és tagkezelés, chat inicializálás.
* Organization kezelés: szervezet létrehozása, módosítása, törlése, tagok és admin jogosultságok kezelése.

A jegyzőkönyv két tesztidőszakra bontva tartalmazza az összes tesztlépést, az elvárt és a kapott eredményeket, valamint részletes megjegyzéseket az ellenőrzésekről. A dokumentáció célja, hogy átfogó képet adjon a rendszer működéséről és a felmerült esetleges hibákról.

## Tesztelés 1

| Teszt ID | Modul      | Lépés | Elvárt eredmény | Kapott eredmény | Státusz | Megjegyzés / Ellenőrzés |
|----------|------------|-------|----------------|----------------|---------|-------------------------|
| T1-01    | Auth       | Bejelentkezés érvényes felhasználóval | Sikeres login, dashboard betöltése | Sikeres login, dashboard betöltve | Sikeres | Ellenőrizve a redirect a dashboardra és felhasználói név megjelenítése |
| T1-02    | Auth       | Bejelentkezés érvénytelen jelszóval | Hibaüzenet jelenik meg | Hibaüzenet megjelenik | Sikeres | Hibakezelés megfelelő, üzenet szövege korrekt |
| T1-03    | Auth       | Regisztráció új userrel | Új user létrejön, bejelentkezés | Új user létrejött, login kész | Sikeres | Ellenőrizve az adatbázisban, e-mail validáció működik |
| T1-04    | Auth       | Logout | Felhasználó kijelentkezik, login oldal | Logout rendben | Sikeres | Session törlés és redirect ellenőrizve |
| T1-05    | Kanban     | Új tábla létrehozása | Új kanban tábla megjelenik | Új tábla létrejött | Sikeres | UI frissítés és lista render ellenőrizve |
| T1-06    | Kanban     | Új kártya hozzáadása | Kártya megjelenik a táblán | Kártya megjelenik | Sikeres | Cím és státusz megjelenítése rendben |
| T1-07    | Kanban     | Kártya mozgatása listák között | Kártya helyesen mozog | Mozgatás rendben | Sikeres | Drag & drop működik, adatbázis frissült |
| T1-08    | Kanban     | Kártya szerkesztése | Változtatások mentve | Szerkesztés mentve | Sikeres | Ellenőrizve UI és adatbázis frissítés |
| T1-09    | Kanban     | Kártya törlése | Kártya eltűnik a tábláról | Törlés sikeres | Sikeres | Visszaállítás nem lehetséges, jogosultságok rendben |
| T1-10    | Chat       | Új chat üzenet küldése | Üzenet megjelenik a chatben | Üzenet sikeresen megjelenik | Sikeres | Több kliensen ellenőrizve a szinkronizálás |
| T1-11    | Chat       | Több felhasználó chat | Üzenetek szinkronizálva | Üzenetek rendben | Sikeres | Realtime működés, késleltetés minimális |
| T1-12    | Chat       | Üzenet törlése | Üzenet eltűnik minden kliensen | Üzenet eltűnt | Sikeres | Ellenőrizve jogosultság, minden kliensen frissül |
| T1-13    | Project    | Új projekt létrehozása | Projekt létrejön és redirect a project oldalra | Projekt létrejött | Sikeres | ProjektID generálva, chat inicializálva, UI frissítve |
| T1-14    | Project    | Projekt szerkesztés | Módosítások mentve | Sikeres módosítás | Sikeres | Ellenőrizve UI és adatbázis frissítés |
| T1-15    | Project    | Projekt törlése | Projekt eltávolítva | Projekt törölve | Sikeres | Adatbázisban is törlődött, jogosultságok rendben |
| T1-16    | Organization | Új szervezet létrehozása | Szervezet megjelenik a listában | Megjelenik | Sikeres | UI frissítés és jogosultság beállítás ellenőrizve |
| T1-17    | Organization | Szervezet módosítása | Módosítások mentve | Rendben | Sikeres | Ellenőrizve UI és DB frissítés, nevek helyesen megjelennek |
| T1-18    | Organization | Szervezet törlése | Lista frissül, szervezet eltűnik | Sikeres | Sikeres | Ellenőrizve, nem maradt hivatkozás, UI frissült |
| T1-19    | Auth       | Jelszóváltoztatás | Sikeres mentés | Mentés rendben | Sikeres | Ellenőrizve új jelszóval történő login |
| T1-20    | Auth       | Profil adatok módosítása | Új adatok mentve | Mentés sikeres | Sikeres | Ellenőrizve UI és DB frissítés, adatok megjelennek |

---

## Tesztelés 2

| Teszt ID | Modul      | Lépés | Elvárt eredmény | Kapott eredmény | Státusz | Megjegyzés / Ellenőrzés |
|----------|------------|-------|----------------|----------------|---------|-------------------------|
| T2-01    | Kanban     | Lista létrehozása | Új lista megjelenik | Lista létrejött | Sikeres | UI frissítés, drag & drop tesztelve |
| T2-02    | Kanban     | Lista törlése | Lista eltűnik | Lista törölve | Sikeres | Ellenőrizve, kártyák áthelyeződnek vagy törlődnek |
| T2-03    | Kanban     | Kártya kommentelése | Komment megjelenik | Komment rendben | Sikeres | Ellenőrizve minden kliensen, időbélyeg megjelenik |
| T2-04    | Kanban     | Kártya határidő beállítása | Határidő mentve | Mentés rendben | Sikeres | Ellenőrizve UI és backend frissítés |
| T2-05    | Chat       | Chat history betöltése | Üzenetek listázva | Betöltés rendben | Sikeres | Ellenőrizve régi üzenetek megjelennek |
| T2-06    | Chat       | Emoji küldése | Emoji megjelenik | Megjelenik | Sikeres | Ellenőrizve több kliensen, kompatibilitás |
| T2-07    | Chat       | File feltöltése | File elérhető a chatben | Feltöltés sikeres | Sikeres | Ellenőrizve letöltés, megjelenítés rendben |
| T2-08    | Chat       | Chat szűrés | Szűrés megfelelő | Szűrés rendben | Sikeres | Ellenőrizve kulcsszóval és dátum szerint |
| T2-09    | Project    | Projekt státusz módosítása | Státusz frissül | Sikeres | Sikeres | UI frissítés és DB ellenőrizve |
| T2-10    | Project    | Projekt tag hozzáadása | Tag megjelenik | Tag rendben | Sikeres | Ellenőrizve jogosultságok és UI |
| T2-11    | Project    | Projekt tag eltávolítása | Tag eltűnik | Sikeres | Sikeres | Ellenőrizve, jogosultságok frissültek |
| T2-12    | Organization | Org admin beállítása | Jogosultság frissül | Rendben | Sikeres | Admin jogosultság ellenőrizve UI és backend |
| T2-13    | Organization | Org tagok listázása | Tagok megjelennek | Lista rendben | Sikeres | Ellenőrizve minden tag megjelenik és sorrend rendben |
| T2-14    | Auth       | Elfelejtett jelszó | Email küldés sikeres | Sikeres | Sikeres | Ellenőrizve email érkezés, link működik |
| T2-15    | Auth       | Kétlépcsős azonosítás | Kód ellenőrizve | Rendben | Sikeres | Ellenőrizve mobil app és UI kód validáció |
| T2-16    | Kanban     | Kártya címkézés | Címke mentve | Rendben | Sikeres | Ellenőrizve UI és backend mentés |
| T2-17    | Kanban     | Kártya prioritás | Prioritás mentve | Rendben | Sikeres | Prioritás vizuálisan és adatbázisban frissül |
| T2-18    | Chat       | Üzenet szerkesztés | Üzenet frissül | Rendben | Sikeres | Ellenőrizve realtime frissítés több kliensen |
| T2-19    | Chat       | Üzenet reagálás | Reakció megjelenik | Rendben | Sikeres | Ellenőrizve emoji reakció minden kliensen |
| T2-20    | Project    | Projekt archiválása | Projekt archiválódik | Rendben | Sikeres | Ellenőrizve UI, DB, és jogosultságok, visszaállítás nem lehetséges |

## Összegzés

A tesztelés során a PuffManager alkalmazás fő funkcionális moduljai átfogó ellenőrzésen estek át. A vizsgált területeken – autentikáció, Kanban tábla, chat, projekt- és szervezetkezelés – a rendszer stabilan működött, az elvárt eredmények és a kapott eredmények összhangban voltak.
A tesztek alapján megállapítható, hogy a felhasználói interakciók, a valós idejű frissítések, valamint a CRUD műveletek megfelelően teljesülnek, a hibakezelés és az adatbiztonság a legtöbb esetben biztosított. Az esetlegesen felmerült kisebb hiányosságok dokumentálásra kerültek a megjegyzésekben, és javasolt a folyamatos monitorozás a jövőbeni verziók során.
Összességében a tesztelt modulok megbízható működést mutattak, és a rendszer a mindennapi használatra alkalmasnak bizonyult.