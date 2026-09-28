/* =============================================================================
   AURA POMPEI — Fish & Steak · DATI DEL SITO (UNICA FONTE DI VERITÀ)
   -----------------------------------------------------------------------------
   MODIFICA QUI E SOLO QUI: prezzi, piatti, orari, telefono, social.
   Non serve toccare l'HTML o il CSS. Cambia una riga e il sito si aggiorna.

   • Prezzo: scrivi il valore come vuoi che appaia -> "16€", "70€/kg", "6€/hg"
   • tags:  "specialita" | "crudo" | "veg" | "piccante" | "frollato" | "consigliato"
   • all (allergeni):  P=Pesce  C=Crostacei  M=Molluschi  G=Glutine
                       L=Latticini  F=Frutta a guscio  U=Uova
     (Sono indicativi: invita sempre l'ospite a segnalare allergie al personale.)
   ========================================================================== */

const AURA = {

  /* ---------- ATTIVITÀ ---------- */
  business: {
    name: "Aura Pompei",
    tagline: "Fish & Steak",
    city: "Pompei",
    // Frase-gancio (dalle recensioni reali: "elegante ma rilassante", 9.2/10)
    hook: "Crudi di mare, carni frollate e pescato del giorno. Cucina d'autore in una sala elegante, a due passi dagli Scavi.",
    address: {
      street: "Via Roma, 91",
      zip: "80045",
      town: "Pompei",
      province: "NA",
      country: "IT",
      // Coordinate approssimative di Via Roma, Pompei [DA VERIFICARE con Google Maps]
      lat: 40.7466,
      lng: 14.4989
    },
    phone: {
      display: "081 612 6264",
      tel: "+390816126264"        // per il pulsante "Chiama"
    },
    // WhatsApp per le prenotazioni. NB: numero fornito (fisso).
    // Se usi un cellulare aziendale, sostituisci qui in formato internazionale
    // senza "+" e senza spazi (es. 393401234567). [DA VERIFICARE]
    whatsapp: "390816126264",
    rating: { value: "9.2", scale: "10", count: 25, source: "TheFork" },
    // Orari: apre/chiude calcolati in automatico da questi valori (formato 24h).
    // Ogni giorno può avere più fasce: [["11:30","23:30"]]
    hours: {
      lun: [["11:30", "23:30"]],
      mar: [["11:30", "23:30"]],
      mer: [["11:30", "23:30"]],
      gio: [["11:30", "23:30"]],
      ven: [["11:30", "23:30"]],
      sab: [["11:30", "23:30"]],
      dom: [["11:30", "23:30"]]
    },
    social: {
      instagram: "https://www.instagram.com/aurapompei/",
      facebook: "https://www.facebook.com/aurafishandsteakpompei/",
      tiktok: "https://www.tiktok.com/@aura.pompei.fish"
    },
    // Prenotazione online TheFork (link diretto fornito)
    thefork: "https://www.google.com/maps/reserve/v/dine/c/7LtxAR_46gs?source=pa&opi=89978449&hl=it-IT",
    maps: "https://www.google.com/maps/place/Aura+Pompei+-+Fish+%26+Steak/@40.7466,14.4989,17z"
  },

  /* ---------- GALLERIA (scorre da sola) ---------- */
  gallery: [
    { src: "assets/img/carpaccio-gambero.webp", alt: "Carpaccio di gambero rosso con stracciata di bufala" },
    { src: "assets/img/tartare-tonno.webp",    alt: "Tartare di tonno con riso venere e katsuobushi" },
    { src: "assets/img/piatto-salmone.webp",   alt: "Filetto di pesce impiattato con calice di vino bianco" },
    { src: "assets/img/sala-vino.webp",        alt: "La sala di Aura Pompei con vino e primo piatto" }
  ],

  /* ---------- PIATTI IN EVIDENZA (dalle recensioni) ---------- */
  signatures: [
    { name: "Gran Crudo Aura", note: "Il nostro plateau reale: gamberi, scampi, ostriche, tartufi di mare, fasolare e tartare.", img: "assets/img/carpaccio-gambero.webp" },
    { name: "Carni frollate in frigovetrina", note: "Black Angus Creekstone Farms® e selezioni pregiate, frollate in cella dedicata.", img: "assets/img/piatto-salmone.webp" },
    { name: "Tartare & Carpacci", note: "Tonno, ricciola, gambero rosso: il pesce crudo al naturale, per apprezzarne la purezza.", img: "assets/img/tartare-tonno.webp" }
  ],

  /* ---------- MENÙ ---------- */
  // group: usato dai filtri in alto | note: descrizione opzionale sotto il titolo
  menu: [
    {
      id: "crudi", group: "Crudi", title: "Crudi & Plateau Reali",
      note: "Il crudo al naturale, per apprezzarne consistenza e purezza.",
      items: [
        { name: "Gamberi rossi", desc: "4 pezzi", price: "18€", tags: ["crudo"], all: ["C"] },
        { name: "Ostriche", desc: "8 pezzi", price: "20€", tags: ["crudo"], all: ["M"] },
        { name: "Gran Crudo Aura · 2 persone", desc: "Gamberi, scampi, ostriche, tartufi di mare, fasolare, tartare", price: "48€", tags: ["specialita","crudo","consigliato"], all: ["C","M","P"] },
        { name: "Gran Crudo Aura · 4 persone", desc: "Gamberi, scampi, ostriche, tartufi di mare, fasolare, tris di tartare", price: "90€", tags: ["specialita","crudo","consigliato"], all: ["C","M","P"] },
        { name: "Aragosta", desc: "Al pezzo", price: "17€/hg", tags: ["crudo"], all: ["C"] },
        { name: "Cicala", desc: "Al pezzo", price: "19€/hg", tags: ["crudo"], all: ["C"] },
        { name: "Scampi Porcupine", desc: "Al pezzo", price: "11€/hg", tags: ["crudo"], all: ["C"] }
      ]
    },
    {
      id: "plateau", group: "Crudi", title: "Componi il tuo plateau",
      note: "Al pezzo, per costruire il tuo crudo su misura.",
      items: [
        { name: "Ostriche Gillardeau", price: "6€", all: ["M"] },
        { name: "Ostriche Regal Oro", price: "8€", all: ["M"] },
        { name: "Ostriche Francia", price: "5€", all: ["M"] },
        { name: "Ostriche mignon", price: "3€", all: ["M"] },
        { name: "Tartufi di mare", price: "3€", all: ["M"] },
        { name: "Fasolare", price: "3€", all: ["M"] },
        { name: "Gambero rosso di Mazara del Vallo", price: "7€", all: ["C"] },
        { name: "Scampi", price: "8€", all: ["C"] }
      ]
    },
    {
      id: "tartare", group: "Tartare", title: "Tartare & Carpacci",
      items: [
        { name: "Tartare di tonno", desc: "Riso venere, guacamole, paté di capperi, olive taggiasche, katsuobushi", price: "18€", tags: ["specialita","crudo"], all: ["P"] },
        { name: "Tartare di salmone", desc: "Avocado, philadelphia, salsa teriyaki", price: "16€", tags: ["crudo"], all: ["P","L","G"] },
        { name: "Tartare di ricciola", desc: "Pane croccante, pomodoro confit, cipolla croccante, gazpacho di pomodoro", price: "20€", tags: ["crudo"], all: ["P","G"] },
        { name: "Tris di tartare", desc: "La nostra selezione del giorno", price: "24€", tags: ["crudo","consigliato"], all: ["P"] },
        { name: "Carpaccio di scampi", desc: "Sfusato amalfitano, finocchio", price: "18€", tags: ["crudo"], all: ["C"] },
        { name: "Carpaccio di gambero rosso", desc: "Stracciata di bufala, olio al basilico, sale Maldon", price: "16€", tags: ["specialita","crudo"], all: ["C","L"] }
      ]
    },
    {
      id: "antipasti-mare", group: "Antipasti", title: "Antipasti di mare",
      items: [
        { name: "Insalatina di crostacei alla catalana", price: "30€", tags: ["specialita"], all: ["C"] },
        { name: "Acciughe del Cantabrico al burro «Beppino Occelli»", price: "20€", all: ["P","L"] },
        { name: "Parmigiana di melanzane con tonno", desc: "Friarielli e provola liquida", price: "16€", tags: ["specialita"], all: ["P","L"] },
        { name: "Insalata di polpo", desc: "Polpo, patate, fagiolini, la sua acqua", price: "16€", tags: ["specialita"], all: ["M"] },
        { name: "Sauté di frutti di mare", price: "18€", all: ["M","G"] },
        { name: "Impepata di cozze", desc: "Cozze nostrane, pepe, riduzione di limone di Sorrento", price: "14€", all: ["M"] },
        { name: "Zuppetta di cozze", desc: "Cozze sgusciate, peperoncini del fiume, coulis di pomodorini, crostini", price: "16€", all: ["M","G"] },
        { name: "Tagliatella di calamaro", desc: "Calamaro a bassa temperatura, agrumi di Sorrento, pane croccante aromatizzato, caviale di aceto balsamico", price: "16€", all: ["M","G"] },
        { name: "Baccalà mantecato alla puttanesca", price: "16€", all: ["P"] }
      ]
    },
    {
      id: "antipasti-terra", group: "Antipasti", title: "Antipasti di terra",
      items: [
        { name: "Jamón ibérico con pane tomate", price: "22€", tags: ["specialita"], all: ["G"] },
        { name: "Tartare di manzo", desc: "Nocciole tostate, crema di pecorino, misticanza", price: "16€", tags: ["specialita"], all: ["F","L"] },
        { name: "Salume di picanha", desc: "Pane croccante e burro", price: "16€", all: ["G","L"] },
        { name: "Vitello tonnato", desc: "Capperi di Pantelleria, cipolla croccante", price: "14€", all: ["P","U"] },
        { name: "Parmigiana di melanzane", desc: "Riduzione di basilico e provola liquida", price: "12€", tags: ["veg"], all: ["L"] },
        { name: "Bruschetta alle erbe con lardo iberico", price: "12€", all: ["G"] },
        { name: "Selezione salumi Aura Exclusive", price: "30€" }
      ]
    },
    {
      id: "carni", group: "Carni", title: "Le carni frollate · dalla frigovetrina",
      note: "Selezioniamo tagli di alta qualità e li frolliamo in cella dedicata, a temperatura e umidità controllate. La frollatura affina la struttura delle carni, rendendole più morbide, eleganti e dal gusto pulito e persistente.",
      items: [
        { name: "Striploin — Black Angus · Creekstone Farms®", desc: "300 / 500 g · cottura consigliata: al sangue", price: "70€/kg", tags: ["frollato","specialita"] },
        { name: "Ribeye — Black Angus · Creekstone Farms®", desc: "300 / 500 g · cottura consigliata: media", price: "90€/kg", tags: ["frollato","specialita"] },
        { name: "Tomahawk — Black Angus · Creekstone Farms®", desc: "800 / 1200 g · cottura consigliata: media", price: "100€/kg", tags: ["frollato","specialita","consigliato"] },
        { name: "Manzetta Prussiana", price: "70€/kg", tags: ["frollato"] },
        { name: "Angus Italia", price: "70€/kg", tags: ["frollato"] },
        { name: "Gelsi Spagna", price: "80€/kg", tags: ["frollato"] },
        { name: "Simmental Spagna", price: "80€/kg", tags: ["frollato"] }
      ]
    },
    {
      id: "secondi-terra", group: "Carni", title: "Secondi di terra",
      items: [
        { name: "Filetto di maialino a bassa temperatura", desc: "Crema di zucchine arrosto, polvere di olive nere, fiori di zucca all'insalata", price: "20€" },
        { name: "Pluma ibérica scottata", desc: "Crema di peperone giallo allo zafferano, crumble di arachidi e lime", price: "26€", tags: ["specialita"], all: ["F"] }
      ]
    },
    {
      id: "pescato", group: "Pescato", title: "Dalla vetrina del pescato del giorno",
      note: "Pesci disponibili secondo pescato. Crudo — al naturale. Cotto — al kamado o secondo ispirazione della cucina. Prezzo variabile secondo la specie (€/hg). Una delle esperienze più rappresentative di Aura.",
      items: [
        { name: "Spigola · Orata", desc: "Alla brace, in guazzetto, al sale, al kamado, fritta", price: "6€/hg", tags: ["consigliato"], all: ["P"] },
        { name: "Dentice · Ricciola · Pezzogna", desc: "Al guazzetto, al sale, al kamado", price: "8€/hg", all: ["P"] },
        { name: "Pescatrice · Scorfano · Gallinella", desc: "Con pasta, al guazzetto, in zuppa", price: "8€/hg", all: ["P"] }
      ]
    },
    {
      id: "primi-mare", group: "Primi", title: "Primi di mare",
      items: [
        // [DA VERIFICARE] Riga tagliata nel PDF TheFork: correggi nome e prezzo qui sotto.
        { name: "Primo di mare del giorno", desc: "Frutti di mare e cozze — chiedi in sala", price: "—", tags: ["consigliato"], all: ["M","G"] },
        { name: "Linguine burro di Normandia", desc: "Sfusato al limone, scampi", price: "24€", tags: ["specialita"], all: ["G","C","L"] },
        { name: "Linguine all'astice", price: "28€", tags: ["specialita","consigliato"], all: ["G","C"] },
        { name: "Risotto frutti di mare", desc: "Peperoncini di fiume, pecorino", price: "22€", all: ["M","L"] }
      ]
    },
    {
      id: "primi-terra", group: "Primi", title: "Primi di terra",
      items: [
        { name: "Linguine alla Nerano", price: "16€", tags: ["veg"], all: ["G","L"] },
        { name: "Raviolo caprese ai tre pomodori fumé", price: "14€", tags: ["veg"], all: ["G","L","U"] },
        { name: "Tagliolini al tartufo", desc: "Parmigiano e burro di Normandia", price: "22€", tags: ["specialita","veg"], all: ["G","L","U"] },
        { name: "Risotto allo zafferano", desc: "Lardo e foglia d'oro 24kt", price: "20€", tags: ["specialita"], all: ["L"] }
      ]
    },
    {
      id: "secondi-mare", group: "Secondi", title: "Secondi di mare",
      items: [
        { name: "Frittura di calamari e gamberi", desc: "Misticanza e mayo al lime", price: "18€", all: ["M","C","G","U"] },
        { name: "Trancio del pescato del giorno", desc: "Scarola liquida, scarolella ripassata", price: "22€", all: ["P"] },
        { name: "Grigliata mista", price: "25€", tags: ["specialita","consigliato"], all: ["P","C","M"] },
        { name: "Filetto di pesce frollato", desc: "Roux al limone e fagiolini · dal pesce della nostra frigovetrina", price: "25€", tags: ["specialita"], all: ["P","L"] },
        { name: "Filetto di salmone", desc: "Teriyaki e spinaci in doppia consistenza", price: "18€", all: ["P","G"] },
        { name: "Tonno scottato", desc: "Gel di cipolla e pesto al basilico", price: "22€", tags: ["consigliato"], all: ["P","F"] }
      ]
    },
    {
      id: "contorni", group: "Contorni", title: "Contorni",
      items: [
        { name: "Melanzane a funghetto", price: "5€", tags: ["veg"] },
        { name: "Patate al forno", price: "5€", tags: ["veg"] },
        { name: "Scarola alla napoletana", price: "5€", tags: ["veg"] },
        { name: "Friarielli napoletani", price: "5€", tags: ["veg"] },
        { name: "Misticanza", price: "5€", tags: ["veg"] },
        { name: "Verdure grigliate", price: "5€", tags: ["veg"] },
        { name: "Fagiolini all'insalata", price: "5€", tags: ["veg"] }
      ]
    },
    {
      id: "dolci", group: "Dolci", title: "Dolci",
      items: [
        { name: "Millefoglie", desc: "Crema chantilly e frutti rossi", price: "7€", all: ["G","L","U"] },
        { name: "Sfera di tiramisù", price: "7€", all: ["G","L","U"] },
        { name: "Cheesecake", desc: "Cioccolato / frutti rossi", price: "7€", all: ["G","L"] },
        { name: "Caprese con gelato alla vaniglia", price: "7€", all: ["F","L","U"] },
        { name: "Tortelletta cocco e frutti rossi", price: "7€", all: ["G","L"] },
        { name: "Gelato al pistacchio", price: "10€", all: ["F","L"] },
        { name: "Carillon con piccola pasticceria", price: "12€", tags: ["specialita"], all: ["G","L","U","F"] }
      ]
    },
    {
      id: "cocktail", group: "Beverage", title: "Cocktail",
      items: [
        { name: "Aperol Spritz", price: "7€" },
        { name: "Campari Spritz", price: "7€" },
        { name: "Limoncello Spritz", price: "7€" },
        { name: "Hugo Spritz", price: "7€" },
        { name: "Negroni", price: "8€" },
        { name: "Gin Tonic / Lemon", price: "7€" },
        { name: "Gin Tonic / Lemon Premium", price: "10€" }
      ]
    },
    {
      id: "soft", group: "Beverage", title: "Soft Drink",
      items: [
        { name: "Acqua Panna 75cl", price: "3,50€" },
        { name: "Acqua San Pellegrino 75cl", price: "3,50€" },
        { name: "Coca-Cola 33cl", price: "3,00€" },
        { name: "Coca-Cola Zero 33cl", price: "3,00€" },
        { name: "Fanta Aranciata 33cl", price: "3,00€" },
        { name: "Sprite 33cl", price: "3,00€" },
        { name: "Lemon Soda 33cl", price: "3,00€" }
      ]
    },
    {
      id: "birre", group: "Beverage", title: "Birre",
      items: [
        { name: "Re Fravort Fresh Beer", price: "6,00€" },
        { name: "Auro Bionda Del Brenta", price: "7,00€" },
        { name: "Cupro Rossa Del Brenta", price: "7,00€" }
      ]
    },
    {
      id: "amari", group: "Beverage", title: "Amari, Grappa & Distillati",
      items: [
        { name: "Amaro del Capo", price: "5,00€" },
        { name: "Jägermeister", price: "5,00€" },
        { name: "Jefferson", price: "7,00€" },
        { name: "Limoncello", price: "4,00€" },
        { name: "Meloncello", price: "4,00€" },
        { name: "Grappa Bianca 903", price: "5,00€" },
        { name: "Grappa Barricata Berta", price: "6,00€" },
        { name: "Cognac François Peyrot", price: "6,00€" }
      ]
    }
  ],

  /* ---------- LEGENDA ALLERGENI ---------- */
  allergens: {
    P: "Pesce", C: "Crostacei", M: "Molluschi", G: "Glutine",
    L: "Latticini", F: "Frutta a guscio", U: "Uova"
  }
};

// Espone i dati a app.js
window.AURA = AURA;
