# Szabó Boglárka – PuffManager Tesztjegyzőkönyv

## Bevezetés
Ez a tesztjegyzőkönyv a PuffManager alkalmazás további, mélyebb funkcionális elemeinek vizsgálatát tartalmazza.  
A dokumentum célja a rendszer olyan kiegészítő területeinek tesztelése,  
amelyek nem szerepeltek a korábbi tesztelési fázisban, és amelyek a platform stabilitása,  
felhasználói élménye és adatkezelési megbízhatósága szempontjából kiemelt jelentőségűek.

A tesztelés fókuszában állnak a valós idejű működési folyamatok, a komplex UI-interakciók,  
a projektkommunikáció kiterjesztett lehetőségei, valamint az adminisztrációs modul részletes ellenőrzése.  
A tesztjegyzőkönyv a lépések, az elvárt és a tényleges eredmények, illetve a megjegyzések segítségével  
átfogó képet ad a rendszer működéséről és stabilitásáról.

A tesztelt területek:
- Felhasználói értesítések (toast, realtime jelzések)
- Projektfájlok kezelése (Drive-link validálás, feltöltés logika)
- Kanban UI részletes interakciók (animációk, státuszváltások edge-case)
- Chat modul kiterjesztett funkciók (olvasottsági státusz, üzenethúzás, multi-upload)
- Admin modul mélyebb funkciói (audit log szűrés, team tagmozgatás, jogosultsági edge-case-ek)
- Teljesítménytesztek (nagy elemszám, gyors műveletek)

A dokumentum tartalmazza a lépéseket, az elvárt következményeket,  
a kapott eredményeket és a részletes megjegyzéseket.

---

# Tesztelés 3

| Teszt ID | Modul | Lépés | Elvárt eredmény | Kapott eredmény | Státusz | Megjegyzés / Ellenőrzés |
|---------|--------|--------|------------------|------------------|---------|---------------------------|
| T3-01 | Értesítések | Projekt státusz módosítása → toast | Toast értesítés megjelenik | Megjelent | Sikeres | Animáció & időzítés megfelelő |
| T3-02 | Értesítések | Új üzenet érkezik chatben | Realtime badge számláló nő | Rendben | Sikeres | Badge azonnal frissül |
| T3-03 | Projektfájl | Helyes Google Drive link mentése | Link valid, mentve | Mentve | Sikeres | Regex validáció rendben |
| T3-04 | Projektfájl | Hibás link megadása | Hibaüzenet | Hiba megjelent | Sikeres | URL validáció blokkolta mentést |
| T3-05 | Projektfájl | Nagy méretű Drive mappa link | Elfogadja, csak linket ment | Elfogadta | Sikeres | Nem próbál fájlt feltölteni |
| T3-06 | Chat | Üzenet olvasottság jelölése | "Read" státusz frissül | Frissült | Sikeres | Több kliensen is működik |
| T3-07 | Chat | Több fájl feltöltése egyszerre | Mind megjelenik a chatben | Rendben | Sikeres | Drag&drop működik |
| T3-08 | Chat | Régi üzenetek visszagörgetése | History betöltődik | Betöltődött | Sikeres | Teljesítmény jó 500+ üzenetnél |
| T3-09 | Kanban | Hosszú című kártya megjelenítése | Tördelés helyes | Jó | Sikeres | Mobilon is tesztelve |
| T3-10 | Kanban | Gyors egymás utáni drag & drop | Nem duplikál, nem hibázik | Stabil működés | Sikeres | 10+ gyors mozgatás |
| T3-11 | Kanban | Animáció ellenőrzése | Sima mozgás | Rendben | Sikeres | FPS csökkenés nélkül |
| T3-12 | Admin | Audit log szűrése dátum szerint | Csak adott nap jelenik meg | Helyes | Sikeres | ISO dátum kezelés rendben |
| T3-13 | Admin | Felhasználó szerepkör módosítása | Új szerepkör érvényes | Érvényes | Sikeres | Jogosultsági cache frissült |
| T3-14 | Admin | Team tag áthelyezése másik csapatba | Új csapat alatt jelenik meg | Rendben | Sikeres | Backend frissítés rendben |
| T3-15 | Admin | Admin töröl egy projektet | Projekt eltűnik globálisan | Törölve | Sikeres | Chat + Kanban is frissül |
| T3-16 | Teljesítmény | 50 projekt megnyitása gyors egymás után | UI nem akad meg | Stabil | Sikeres | Memóriahasználat normális |
| T3-17 | Teljesítmény | 200+ üzenetes chat scroll | Folyamatos görgetés | Rendben | Sikeres | Optimalizált renderelés |
| T3-18 | Teljesítmény | 100+ Kanban kártya renderelése | UI gördülékeny | Rendben | Sikeres | Virtuális lista jól működik |
| T3-19 | Biztonság | Jogosulatlan felhasználó projektet próbál szerkeszteni | Hozzáférés blokkolva | Blokkolva | Sikeres | 403-as válasz megfelelő |
| T3-20 | Biztonság | Session lejár → művelet futtatása | Redirect loginra | Redirect megtörtént | Sikeres | Session expiry jól működik |

---


**Megállapítások:**
- A rendszer a valós idejű értesítéseket és a nagy elemszámú listákat stabilan kezeli.
- A Google Drive linkek validációja hibamentesen működik.
- A chat modul fejlett funkciói (multi-upload, read receipts, scroll history) jól teljesítettek.
- Az admin felület jogosultságai működnek, a szerepkörváltás azonnal érvényesül.
- A biztonsági tesztek (403-as visszautasítás, session expiry) hibamentesen teljesültek.
- A teljesítmény nagy terhelés mellett is megfelelő, UI-akadozás nem volt tapasztalható.

A rendszer összességében **megbízható**, **jól optimalizált**,  
és alkalmas a napi szintű professzionális használatra.


