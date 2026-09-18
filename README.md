# Studiehub

Persoonlijke studie- en planningswand. Basisstructuur: startpagina + wiskunde
als voorbeeldvak.

## Live zetten op GitHub Pages

1. Maak een nieuwe (public) repo op GitHub, of gebruik je bestaande.
2. Zet deze bestanden in de root van die repo (of in een `/docs`-map — dan
   moet je dat zo instellen bij stap 3).
3. Ga naar **Settings → Pages**. Kies bij "Source" de branch `main` (en map
   `/root` of `/docs`, afhankelijk van waar je de bestanden zette). Sla op.
4. Na een minuut of twee staat je site live op
   `https://<gebruikersnaam>.github.io/<repo-naam>/`.
5. Maak van die URL een QR-code (bijv. via een gratis QR-generator) en print
   'm op je schrift.

## Hoe de data nu werkt

Alles (thema's, planning, aantekeningen, tags) wordt nu bewaard in
`localStorage` — dus **per apparaat apart**, niet gesynced. Alle opslag loopt
via de `Store`-helper in `js/app.js`, zodat er straks maar op één plek iets
hoeft te veranderen om Firebase erachter te zetten.

## Nog te doen (in volgorde)

1. **Overige vakpagina's** — natuurkunde, scheikunde, NLT,
   maatschappijwetenschappen, met dezelfde opzet als wiskunde.html
   (natuurkunde en scheikunde krijgen ook een rekenhulp, NLT en mij. wet.
   niet).
2. **Firebase** — project aanmaken, Firestore inschakelen, `Store` in
   `app.js` ombouwen naar Firestore-calls zodat data synct tussen je
   telefoon, laptop en schoolpc.
3. **PIN-toegang** — lichte toegangsdrempel vóór de inhoud, gekoppeld aan
   Firebase zodra die er is.
4. **SOMtoday-agenda** — jij genereert in SOMtoday (Agenda → mijn
   instellingen → iCalendar-token) een privélink. Die zet ik in een Firebase
   Cloud Function (niet in de repo zelf, want public), die je rooster ophaalt
   en beschikbaar maakt voor de site.
5. **QR-codes per schrift** — zodra alle vakpagina's staan.

Zeg maar met welk vak we verdergaan.
