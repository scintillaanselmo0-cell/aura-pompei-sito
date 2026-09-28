/* =============================================================================
   AURA POMPEI — Fish & Steak · app.js
   Legge tutto da window.AURA (data.js). Nessuna dipendenza esterna.
   ========================================================================== */
(function () {
  "use strict";
  const A = window.AURA;
  const B = A.business;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  const GIORNI = ["dom","lun","mar","mer","gio","ven","sab"];        // getDay(): 0=dom
  const GIORNI_LABEL = { lun:"Lunedì", mar:"Martedì", mer:"Mercoledì", gio:"Giovedì", ven:"Venerdì", sab:"Sabato", dom:"Domenica" };
  const ORDINE_SETT = ["lun","mar","mer","gio","ven","sab","dom"];

  /* ---------------------------------------------------------------- HERO */
  $("#heroHook").textContent = B.hook;
  const telHref = "tel:" + B.phone.tel;
  $("#heroCall").href = telHref;
  $("#sbCall").href = telHref;

  // rating
  if (B.rating) {
    $("#heroRating").innerHTML =
      `<span class="stars">★</span> ${esc(B.rating.value)}/${esc(B.rating.scale)} · ${esc(B.rating.count)} recensioni`;
  }

  /* ------------------------------------------------------- ORARI / APERTO */
  function toMin(hhmm){ const [h,m] = hhmm.split(":").map(Number); return h*60+m; }
  function statoApertura(now = new Date()){
    const dayKey = GIORNI[now.getDay()];
    const nowMin = now.getHours()*60 + now.getMinutes();
    const oggi = B.hours[dayKey] || [];
    for (const [o,c] of oggi){
      if (nowMin >= toMin(o) && nowMin < toMin(c)) {
        return { open:true, close:c };
      }
    }
    // trova prossima apertura (oggi più tardi o giorni successivi)
    for (let i=0;i<7;i++){
      const d = new Date(now); d.setDate(now.getDate()+i);
      const k = GIORNI[d.getDay()];
      for (const [o] of (B.hours[k]||[])){
        if (i===0 && toMin(o) <= nowMin) continue;
        const lbl = i===0 ? "oggi" : i===1 ? "domani" : GIORNI_LABEL[k].toLowerCase();
        return { open:false, next:`${lbl} alle ${o}` };
      }
    }
    return { open:false };
  }
  function renderStato(node){
    const s = statoApertura();
    node.classList.remove("open","closed");
    if (s.open){
      node.classList.add("open");
      node.innerHTML = `<span class="dot"></span> Aperto ora · fino alle ${esc(s.close)}`;
    } else {
      node.classList.add("closed");
      node.innerHTML = `<span class="dot"></span> Chiuso${ s.next ? " · riapre "+esc(s.next) : "" }`;
    }
  }
  renderStato($("#heroStatus"));
  renderStato($("#cStatus"));
  setInterval(()=>{ renderStato($("#heroStatus")); renderStato($("#cStatus")); }, 60000);

  // tabella orari
  (function(){
    const t = $("#hoursTable");
    const todayKey = GIORNI[new Date().getDay()];
    ORDINE_SETT.forEach(k=>{
      const fasce = (B.hours[k]||[]).map(([o,c])=>`${o}–${c}`).join(" · ") || "Chiuso";
      const tr = el("tr", k===todayKey ? "today" : "");
      tr.innerHTML = `<td>${GIORNI_LABEL[k]}</td><td>${esc(fasce)}</td>`;
      t.appendChild(tr);
    });
  })();

  /* ------------------------------------------------------------ SIGNATURES */
  (function(){
    const g = $("#sigGrid");
    A.signatures.forEach(s=>{
      const c = el("article","sig-card reveal");
      c.innerHTML = `<img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy" width="600" height="800">
        <div class="sig-body"><h3>${esc(s.name)}</h3><p>${esc(s.note)}</p></div>`;
      g.appendChild(c);
    });
  })();

  /* ----------------------------------------------- GALLERIA (marquee loop) */
  (function(){
    const track = $("#marqueeTrack");
    const build = () => A.gallery.forEach(im=>{
      const d = el("div","marquee-item");
      d.innerHTML = `<img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy" width="300" height="400">`;
      track.appendChild(d);
    });
    build(); build();  // due set identici -> translateX(-50%) = loop perfetto e continuo
    // velocità proporzionale al numero di foto (ritmo costante anche cambiando le immagini)
    track.style.animationDuration = (A.gallery.length * 6) + "s";
  })();

  /* ------------------------------------------------------------------ MENU */
  (function(){
    const wrap = $("#menuCats");
    const filters = $("#menuFilters");

    // categorie
    A.menu.forEach(cat=>{
      const sec = el("section","menu-cat");
      sec.id = "cat-" + cat.id;
      sec.dataset.group = cat.group;
      if (["carni","pescato"].includes(cat.id)) sec.classList.add("full");

      let html = `<header class="cat-head"><h3 class="cat-title">${esc(cat.title)}</h3>` +
                 (cat.note ? `<p class="cat-note">${esc(cat.note)}</p>` : "") + `</header>`;
      cat.items.forEach(it=>{
        const tags = (it.tags||[]).map(t=>`<span class="tag ${t}">${labelTag(t)}</span>`).join("");
        const all  = (it.all&&it.all.length) ? `<div class="dish-all">${it.all.map(a=>esc(A.allergens[a]||a)).join(" · ")}</div>` : "";
        html += `<div class="dish">
            <div class="dish-main">
              <div class="dish-name">${esc(it.name)}</div>
              ${ it.desc ? `<div class="dish-desc">${esc(it.desc)}</div>` : "" }
              ${ tags ? `<div class="dish-tags">${tags}</div>` : "" }
              ${ all }
            </div>
            <div class="dish-price">${esc(it.price)}</div>
          </div>`;
      });
      sec.innerHTML = html;
      wrap.appendChild(sec);
    });

    // filtri per gruppo
    const groups = ["Tutto", ...[...new Set(A.menu.map(c=>c.group))]];
    groups.forEach((g,i)=>{
      const b = el("button","filter-pill"+(i===0?" active":""), esc(g));
      b.dataset.group = g;
      b.setAttribute("role","tab");
      b.addEventListener("click",()=>{
        $$(".filter-pill").forEach(p=>p.classList.remove("active"));
        b.classList.add("active");
        $$(".menu-cat").forEach(sec=>{
          sec.classList.toggle("hidden", !(g==="Tutto" || sec.dataset.group===g));
        });
        // porta l'inizio del menù in vista sul mobile
        if (g!=="Tutto") document.getElementById("menu").scrollIntoView({behavior:"smooth", block:"start"});
      });
      filters.appendChild(b);
    });

    function labelTag(t){
      return ({ specialita:"Specialità", consigliato:"Consigliato", crudo:"Crudo",
                veg:"Veg", frollato:"Frollato", piccante:"Piccante" })[t] || t;
    }

    // legenda allergeni
    const leg = Object.entries(A.allergens).map(([k,v])=>`<strong>${esc(k)}</strong> ${esc(v)}`).join(" · ");
    $("#allergenNote").innerHTML =
      `Allergeni: ${leg}.<br>Per qualsiasi allergia o intolleranza informa il personale di sala: sapremo consigliarti al meglio.`;
  })();

  /* -------------------------------------------------------------- CONTATTI */
  (function(){
    const a = B.address;
    $("#cAddress").innerHTML = `${esc(a.street)}<br>${esc(a.zip)} ${esc(a.town)} (${esc(a.province)})`;
    $("#cMaps").href = B.maps;
    $("#cPhone").href = telHref;
    $("#cPhone").textContent = B.phone.display;

    const waBase = "https://wa.me/" + B.whatsapp;
    $("#cWhatsapp").href = waBase + "?text=" + encodeURIComponent("Ciao Aura, vorrei un'informazione.");
    $("#prenotaCall").href = telHref;
    $("#prenotaCall").querySelector("span").textContent = B.phone.display;
    $("#prenotaThefork").href = B.thefork;

    // mappa embed (senza API key)
    const q = encodeURIComponent(`Aura Pompei ${a.street} ${a.zip} ${a.town} ${a.province}`);
    $("#mapFrame").src = `https://www.google.com/maps?q=${q}&hl=it&z=16&output=embed`;

    // social
    const soc = $("#socials");
    const ICON = {
      instagram: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.42.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.17.4.36 1 .42 2.2.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.42 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.17-1 .36-2.2.42-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.42-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.17-.4-.36-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.42-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.17 1-.36 2.2-.42C8.4 2.2 8.8 2.2 12 2.2m0 1.8c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.84-.4.4-.64.8-.84 1.3-.16.4-.35 1-.4 2.1C2.6 8.5 2.6 8.9 2.6 12s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.5.44.9.84 1.3.4.4.8.64 1.3.84.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.84.4-.4.64-.8.84-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.84-1.3-.4-.4-.8-.64-1.3-.84-.4-.16-1-.35-2.1-.4C15.5 4 15.1 4 12 4m0 3.06A4.94 4.94 0 1 0 12 17a4.94 4.94 0 0 0 0-9.88m0 8.14A3.2 3.2 0 1 1 12 8.8a3.2 3.2 0 0 1 0 6.4m6.3-8.34a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0"/></svg>',
      facebook:  '<svg viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.56 9.88v-7H7.9V12h2.54V9.8c0-2.5 1.5-3.9 3.77-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.9h-2.34v7A10 10 0 0 0 22 12"/></svg>',
      tiktok:    '<svg viewBox="0 0 24 24"><path d="M16.6 5.82a4.28 4.28 0 0 1-1.06-2.82h-3.2v12.9a2.53 2.53 0 0 1-2.53 2.43 2.53 2.53 0 0 1 0-5.06c.26 0 .5.04.74.11V9.9a5.7 5.7 0 0 0-.74-.05 5.73 5.73 0 1 0 5.73 5.73V9.01a7.3 7.3 0 0 0 4.26 1.36V7.16a4.28 4.28 0 0 1-3.2-1.34"/></svg>'
    };
    Object.entries(B.social).forEach(([k,url])=>{
      if(!url) return;
      const link = el("a");
      link.href = url; link.target = "_blank"; link.rel = "noopener";
      link.setAttribute("aria-label", k);
      link.innerHTML = ICON[k] || esc(k);
      soc.appendChild(link);
    });
  })();

  /* ----------------------------------------------------- FORM PRENOTAZIONE */
  (function(){
    const form = $("#bookingForm");
    if(!form) return;
    const data = $("#bkData"), orario = $("#bkOrario"), confirm = $("#bookingConfirm");

    // data minima = oggi
    const today = new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    const iso = today.toISOString().slice(0,10);
    data.min = iso; data.value = "";

    // popola orari SOLO entro gli orari di apertura, a intervalli di 15'
    function buildTimes(dateStr){
      orario.innerHTML = '<option value="" disabled selected>Scegli un orario</option>';
      const d = dateStr ? new Date(dateStr+"T00:00") : new Date();
      const key = GIORNI[d.getDay()];
      const fasce = B.hours[key]||[];
      const isToday = dateStr === iso;
      const nowMin = new Date().getHours()*60 + new Date().getMinutes();
      let count = 0;
      fasce.forEach(([o,c])=>{
        // ultima prenotazione consigliata 45' prima della chiusura
        for(let m=toMin(o); m<=toMin(c)-45; m+=15){
          if (isToday && m <= nowMin+30) continue;   // margine di 30' se è oggi
          const hh = String(Math.floor(m/60)).padStart(2,"0");
          const mm = String(m%60).padStart(2,"0");
          orario.appendChild(el("option", null, `${hh}:${mm}`)).value = `${hh}:${mm}`;
          count++;
        }
      });
      if(!count){
        const op = el("option", null, "Nessun orario disponibile per questa data");
        op.value=""; op.disabled=true; op.selected=true; orario.appendChild(op);
      }
    }
    buildTimes("");
    data.addEventListener("change",()=>buildTimes(data.value));

    function setError(id,msg){
      const field = $("#"+id).closest(".field");
      field.classList.toggle("invalid", !!msg);
      const box = $(`.error[data-for="${id}"]`);
      if(box) box.textContent = msg||"";
    }
    function validate(){
      let ok = true;
      const nome = $("#bkNome").value.trim();
      const pers = parseInt($("#bkPersone").value,10);
      if(nome.length<2){ setError("bkNome","Inserisci il tuo nome."); ok=false; } else setError("bkNome","");
      if(!pers || pers<1 || pers>20){ setError("bkPersone","Da 1 a 20 persone."); ok=false; } else setError("bkPersone","");
      if(!data.value){ setError("bkData","Scegli una data."); ok=false; }
      else if(data.value < iso){ setError("bkData","La data non può essere passata."); ok=false; }
      else setError("bkData","");
      if(!orario.value){ setError("bkOrario","Scegli un orario."); ok=false; } else setError("bkOrario","");
      return ok;
    }
    ["bkNome","bkPersone","bkData","bkOrario"].forEach(id=>{
      $("#"+id).addEventListener("input",()=>{ if($("#"+id).closest(".field").classList.contains("invalid")) validate(); });
    });

    form.addEventListener("submit",(e)=>{
      e.preventDefault();
      confirm.hidden = true;
      if(!validate()) return;
      const nome = $("#bkNome").value.trim();
      const pers = $("#bkPersone").value;
      const dLoc = new Date(data.value+"T00:00").toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
      const msg = `Ciao Aura, vorrei prenotare un tavolo.%0A`+
                  `Nome: ${encodeURIComponent(nome)}%0A`+
                  `Persone: ${encodeURIComponent(pers)}%0A`+
                  `Data: ${encodeURIComponent(dLoc)}%0A`+
                  `Orario: ${encodeURIComponent(orario.value)}`;
      const url = `https://wa.me/${B.whatsapp}?text=${msg}`;
      window.open(url,"_blank");
      confirm.hidden = false;
      confirm.textContent = "Ti stiamo aprendo WhatsApp — premi invio per inviare la richiesta. "+
                            "Ti confermeremo il tavolo in chat: la prenotazione è valida solo dopo la nostra conferma.";
      confirm.scrollIntoView({behavior:"smooth",block:"center"});
    });
  })();

  /* --------------------------------------------------- HEADER / REVEAL / UI */
  const header = $(".site-header");
  const onScroll = ()=> header.classList.toggle("solid", window.scrollY > 40);
  onScroll(); window.addEventListener("scroll", onScroll, {passive:true});

  if ("IntersectionObserver" in window){
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:.12});
    // osserva gli elementi reveal (anche quelli creati dopo)
    requestAnimationFrame(()=> $$(".reveal").forEach(n=>io.observe(n)));
  } else {
    $$(".reveal").forEach(n=>n.classList.add("in"));
  }

  $("#year").textContent = new Date().getFullYear();
})();
