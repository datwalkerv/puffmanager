# Puffmanager - Tesztjegyzőkönyv

## Bevezetés
Ez a tesztjegyzőkönyv egy Next.js-alapú video projekt menedzsment alkalmazás funkcionalitását dokumentálja. A rendszer tartalmaz egy dinamikus Kanban táblát, projekt kezelést, chat funkciókat és AI-alapú task breakdown-ot. Az alkalmazás MongoDB adatbázissal működik, TypeScript-ben íródott, és modernebb UI komponenseket használ.

## Implementált Funkciók Áttekintése

### 1. Dinamikus Kanban Tábla
- **Technológia**: @dnd-kit/core, @dnd-kit/sortable
- **Funkciók**: Drag & drop projekt mozgatás, státusz módosítás, real-time frissítés
- **Adatforrás**: MongoDB projects gyűjtemény

### 2. Projekt Kezelés
- **Létrehozás**: Form alapú projekt hozzáadás
- **Szerkesztés**: SheetInfo modal projekt részletekkel
- **Státusz módosítás**: Select komponens és drag & drop
- **Törlés**: (Jövőbeli implementáció)

### 3. Chat Rendszer
- **Üzenetküldés**: Projekt-specifikus chat
- **Üzenet mentés**: MongoDB messages tömbbe
- **Real-time frissítés**: Optimistic updates
- **UI**: Üzenetbuborékok, timestamp, scroll to bottom

### 4. AI Task Breakdown
- **API**: OpenRouter (GPT model)
- **Funkció**: Feladat felbontása részfeladatokra
- **Kimenet**: Automatikus projekt létrehozás
- **Hibakezelés**: Fallback generálás AI hiba esetén

### 5. Organization Kezelés
- **Szűrés**: Organization alapú projekt listázás
- **Jogosultságok**: Authentikáció minden server action-ben

## Tesztelés 1 - Alapfunkcionalitások

| Teszt ID | Modul      | Lépés | Elvárt eredmény | Kapott eredmény | Státusz | Megjegyzés |
|----------|------------|-------|----------------|----------------|---------|------------|
| T1-01    | Kanban     | Projektek betöltése adatbázisból | Projektek megjelennek státusz alapján | Sikeres betöltés, helyes oszlopok | ✅ Sikeres | MongoDB find működik, status alapú csoportosítás |
| T1-02    | Kanban     | Projekt drag & drop státusz módosítás | Projekt mozog oszlopok között | Státusz frissül adatbázisban | ✅ Sikeres | updateProjectStatus server action, optimistic update |
| T1-03    | Kanban     | Drag animációk és overlay | Smooth animációk, drag overlay | Animációk simák, overlay látható | ✅ Sikeres | @dnd-kit CSS transitions, z-index kezelés |
| T1-04    | Kanban     | Responsive grid layout | Helyes elrendezés különböző képernyőméreteken | 1/3/6 oszlop breakpointokon | ✅ Sikeres | Tailwind responsive grid classes |
| T1-05    | Project    | Új projekt létrehozása formból | Projekt hozzáadódik "To Do" oszlophoz | Projekt mentve MongoDB-ba | ✅ Sikeres | createProject server action, form validáció |
| T1-06    | Project    | Project Sheet modal megnyitás | Modal megjelenik projekt adatokkal | Modal helyesen tölti adatokat | ✅ Sikeres | Sheet komponens, projekt props átadás |
| T1-07    | SheetInfo  | Státusz módosítás modalban | Select módosítja projekt státuszát | Státusz frissül, Kanban refresh | ✅ Sikeres | onValueChange → updateProjectStatus → reload |
| T1-08    | SheetInfo  | Üzenet küldés chatben | Üzenet mentése, UI frissítés | Üzenet elmentve, input clear | ✅ Sikeres | saveMessage server action, optimistic update |
| T1-09    | SheetInfo  | Chat üzenetek megjelenítése | Korábbi üzenetek betöltése | Üzenethistória helyesen jelenik meg | ✅ Sikeres | useEffect üzenetekre, scroll to bottom |
| T1-10    | SheetInfo  | Dátum formázás | Dátum helyesen jelenik meg inputban | ISO → YYYY-MM-DD konverzió | ✅ Sikeres | typeof dátum ellenőrzés, split működik |
| T1-11    | AI Tasks   | AI task breakdown létrehozás | AI felbontja feladatot részfeladatokra | Subtaskok generálva és mentve | ✅ Sikeres | OpenRouter API, JSON parsing, hibakezelés |
| T1-12    | AI Tasks   | AI hiba esetén fallback | Hiba esetén basic taskok generálása | Fallback taskok létrejönnek | ✅ Sikeres | Try-catch, hibaüzenet felhasználónak |
| T1-13    | Auth       | Server action hitelesítés | Nem auth felhasználók nem módosíthatnak | isAuthenticated blokkol | ✅ Sikeres | Minden server action ellenőrzi session-t |
| T1-14    | UI/UX      | Loading állapotok | Betöltés közben skeleton megjelenik | Skeleton UI Kanban betöltésnél | ✅ Sikeres | isLoading state, Tailwind animate-pulse |
| T1-15    | UI/UX      | Empty state kezelés | Üres oszlopok placeholderrel | "No projects" vagy "Drop items here" | ✅ Sikeres | Conditional rendering üres tömböknél |

## Tesztelés 2 - Speciális Funkciók és Hibakezelés

| Teszt ID | Modul      | Lépés | Elvárt eredmény | Kapott eredmény | Státusz | Megjegyzés |
|----------|------------|-------|----------------|----------------|---------|------------|
| T2-01    | Kanban     | Drag error kezelés | Hiba esetén visszaállás eredeti állapotra | Optimistic update revert | ✅ Sikeres | try-catch, previous state tárolás |
| T2-02    | Kanban     | TypeScript típusok | Nincs típushiba build során | TypeScript compile sikeres | ✅ Sikeres | Interface definíciók, type guard-ok |
| T2-03    | SheetInfo  | Üzenet timestamp formázás | Időbélyeg HH:mm formátumban | Timestamp helyesen formázva | ✅ Sikeres | date-fns format, invalid date kezelés |
| T2-04    | SheetInfo  | Chat scroll behavior | Új üzenetnél automatikus scroll | Scroll to bottom smooth | ✅ Sikeres | useRef, scrollIntoView behavior smooth |
| T2-05    | AI Tasks   | AI prompt formázás | AI számára érthető prompt | JSON válasz helyesen parse-olva | ✅ Sikeres | Prompt engineering, JSON response format |
| T2-06    | AI Tasks   | Task szám validáció | 2-10 task között választható | Slider komponens működik | ✅ Sikeres | Number input validation, min/max korlátok |
| T2-07    | Organization | Organization váltás | Projektek szűrése org alapján | Új projektek betöltődnek | ✅ Sikeres | useEffect org.name függőséggel |
| T2-08    | Data       | Realtime frissítés | Adatváltozás után automatikus refresh | revalidatePath működik | ✅ Sikeres | Next.js cache invalidation dashboard path |
| T2-09    | Data       | MongoDB ObjectId kezelés | String/ObjectId konverzió | _id helyesen kezelve | ✅ Sikeres | new ObjectId() server actionekben |
| T2-10    | Performance | Optimalizált újratöltés | Projektek csak szükség esetén töltődnek | useEffect nem fut feleslegesen | ✅ Sikeres | Dependency array optimalizálás |
| T2-11    | UI/UX      | Button állapotok | Disabled állapot művelet közben | Loading spinner, disabled UI | ✅ Sikeres | isSending/isLoading state kezelés |
| T2-12    | UI/UX      | Form validáció | Kötelező mezők ellenőrzése | Form nem submitol üresen | ✅ Sikeres | HTML5 required, custom validation |
| T2-13    | Error      | Network error kezelés | API hiba esetén user-friendly hiba | Toast üzenet megjelenik | ✅ Sikeres | try-catch, error toast komponens |
| T2-14    | Error      | Type coercion hibák | String/number konverzió hibák | Type guard-ok, safe konverzió | ✅ Sikeres | String(active.id), typeof ellenőrzések |
| T2-15    | Security   | XSS prevention | User input sanitization | Safe HTML renderelés | ✅ Sikeres | React automatikus escaping, safe string kezelés |

