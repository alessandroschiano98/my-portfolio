# Portfolio Alessandro Schiano

Portfolio React a pagina unica, compilato con Vite. Menu e dettagli dei progetti usano frammenti URL (`#projects`, `#about`, `#project/taptap`): non richiedono configurazione di routing sul server.

## Sviluppo

1. Installa Node.js 22.12 o successivo.
2. Esegui `npm install` nella cartella del progetto.
3. Esegui `npm run dev` e apri l'indirizzo locale mostrato.

Non aprire `index.html` con doppio clic: il sorgente React deve essere servito dal server locale. Il sito compilato funziona su hosting statico.

## Pubblicazione su Cloudflare Pages

Esegui `npm run build`. La cartella `dist/` contiene il sito pronto per la pubblicazione.

Per caricare manualmente: crea un progetto Pages con Direct Upload e carica lo ZIP compilato oppure la cartella `dist/`. Lo ZIP deve contenere `index.html` alla radice, non dentro una cartella aggiuntiva. Include `_headers` per le intestazioni di sicurezza e la cache. HTTPS è gestito da Cloudflare.

Per collegare GitHub: seleziona il repository, usa il comando `npm run build` e la directory di output `dist`. La versione Node è specificata in `.node-version`. Prima di collegare GitHub, assicurati che i nuovi sorgenti React siano stati committati e inviati al repository.

Cloudflare richiede di scegliere inizialmente tra Direct Upload e integrazione Git; per cambiare modalità è necessario un nuovo progetto Pages. Il dominio definitivo non è ancora configurato: non è stato inventato alcun indirizzo e il canonical del vecchio sito Altervista è stato rimosso. Quando avrai l'URL definitivo si potrà aggiungere il nuovo canonical.

La compilazione ottimizza le immagini originali in WebP, copia i PDF, include il font locale e conserva i vecchi indirizzi tramite pagine di compatibilità. Non caricare `src/`, `node_modules/`, `.git/` o l'index del sorgente.

## File da modificare

- `src/main.jsx`: sezioni, navigazione, filtri e finestre dei progetti.
- `src/Globe.jsx`: globo, interazioni e animazione sospesa fuori schermo.
- `src/data/content.json`: testi IT/EN, progetti e contenuti editoriali esistenti.
- `src/styles/app.css`: stili della pagina unica.
- `img/`, `documents/`: originali delle immagini e documenti da pubblicare.
- `scripts/build.mjs`: ottimizzazione immagini e compilazione.

Il CV e i certificati sono pubblici nel sito compilato, come richiesto. La scelta della lingua viene salvata nel browser; il primo accesso parte in italiano.

## Sfondo stellato interattivo

Campo di stelle su canvas leggero, con livelli di profondità e un lieve parallasse al movimento del mouse e allo scorrimento. Non intercetta i clic. Rispetta la preferenza di riduzione animazioni e si ferma quando la scheda non è visibile. Nessuna texture o libreria 3D esterna.

Backup prima delle prove spaziali: `D:/Blender_Cache/my-portfolio-backup-before-space-2026-10-21.zip`. Per ripristinarlo, estrarlo in una nuova cartella ed eseguire `npm ci` e `npm run build`.
