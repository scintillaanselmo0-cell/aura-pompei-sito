/* =============================================================================
   AURA POMPEI — Fish & Steak · app.js
   Legge tutto da window.AURA (data.js). Funziona su index.html e menu.html.
   ========================================================================== */
(function () {
  "use strict";
  const A = window.AURA;
  const B = A.business;
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));

  const GIORNI = ["dom","lun","mar","mer","gio","ven","sab"];
  const GIORNI_LABEL = { lun:"Lunedì", mar:"Martedì", mer:"Mercoledì", gio:"Giovedì", ven:"Venerdì", sab:"Sabato", dom:"Domenica" };
  const ORDINE_SETT = ["lun","mar","mer","gio","ven","sab","dom"];
  const telHref = "tel:" + B.phone.tel;

  /* --------------------------------------------------- ORARI (condiviso) */
  function toMin(hhmm){ const [h,m] = hhmm.split(":").map(Number); return h*60+m; }
  function statoApertura(now = new Date()){
    const dayKey = GIORNI[now.getDay()];
    const nowMin = now.getHours()*60 + now.getMinutes();
    for (const [o,c] of (B.hours[dayKey]||[])){
      if (nowMin >= toMin(o) && nowMin < toMin(c)) return { open:true, close:c };
    }
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
    if(!node) return;
    const s = statoApertura();
    node.classList.remove("open","closed");
    if (s.open){ node.classList.add("open"); node.innerHTML = `<span class="dot"></span> Aperto ora · fino alle ${esc(s.close)}`; }
    else { node.classList.add("closed"); node.innerHTML = `<span class="dot"></span> Chiuso${ s.next ? " · riapre "+esc(s.next) : "" }`; }
  }

  /* -------------------------------------------------------------- HERO */
  if ($("#heroHook")){
    $("#heroHook").textContent = B.hook;
    if (B.rating && $("#heroRating"))
      $("#heroRating").innerHTML = `<span class="stars">★</span> ${esc(B.rating.value)}/${esc(B.rating.scale)} · ${esc(B.rating.count)} recensioni`;
    if ($("#heroThefork")) $("#heroThefork").href = B.thefork;
    renderStato($("#heroStatus"));
  }

  /* ------------------------------------------------------- SIGNATURES */
  if ($("#sigGrid")){
    const g = $("#sigGrid");
    A.signatures.forEach((s,i)=>{
      const c = el("article","sig-card reveal");
      c.style.transitionDelay = (i*0.08)+"s";
      c.innerHTML = `<span class="sig-num">0${i+1}</span>
        <img src="${esc(s.img)}" alt="${esc(s.name)}" loading="lazy" width="600" height="800">
        <div class="sig-body"><h3>${esc(s.name)}</h3><p>${esc(s.note)}</p></div>`;
      g.appendChild(c);
    });
  }

  /* ----------------------------------------------- GALLERIA (marquee) */
  if ($("#marqueeTrack")){
    const track = $("#marqueeTrack");
    const build = () => A.gallery.forEach(im=>{
      const d = el("div","marquee-item");
      d.innerHTML = `<img src="${esc(im.src)}" alt="${esc(im.alt)}" loading="lazy" width="300" height="400">`;
      track.appendChild(d);
    });
    build(); build();
    track.style.animationDuration = (A.gallery.length * 6) + "s";
  }

  /* --------------------------------------------- ANTEPRIMA MENÙ (home) */
  if ($("#teaserList")){
    // mostra alcune categorie-chiave come "assaggio"
    const pick = ["crudi","carni","tartare","pescato"];
    const list = $("#teaserList");
    pick.forEach(id=>{
      const cat = A.menu.find(c=>c.id===id);
      if(!cat) return;
      const names = cat.items.slice(0,3).map(i=>i.name).join(" · ");
      const row = el("li","teaser-row");
      row.innerHTML = `<span class="teaser-cat">${esc(cat.title.split("·")[0].trim())}</span>
                       <span class="teaser-items">${esc(names)}</span>`;
      list.appendChild(row);
    });
  }

  /* ------------------------------------------------- MENÙ (menu.html) */
  if ($("#menuCats")){
    const wrap = $("#menuCats");
    const filters = $("#menuFilters");
    const labelTag = t => ({ specialita:"Specialità", consigliato:"Consigliato", crudo:"Crudo", veg:"Veg", frollato:"Frollato", piccante:"Piccante" })[t] || t;

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

    const groups = ["Tutto", ...[...new Set(A.menu.map(c=>c.group))]];
    groups.forEach((g,i)=>{
      const b = el("button","filter-pill"+(i===0?" active":""), esc(g));
      b.dataset.group = g; b.setAttribute("role","tab");
      b.addEventListener("click",()=>{
        $$(".filter-pill").forEach(p=>p.classList.remove("active"));
        b.classList.add("active");
        $$(".menu-cat").forEach(sec=> sec.classList.toggle("hidden", !(g==="Tutto" || sec.dataset.group===g)) );
        const top = $("#menuFilters");
        if (g!=="Tutto" && top) top.scrollIntoView({behavior:"smooth", block:"start"});
      });
      filters.appendChild(b);
    });

    if ($("#allergenNote")){
      const leg = Object.entries(A.allergens).map(([k,v])=>`<strong>${esc(k)}</strong> ${esc(v)}`).join(" · ");
      $("#allergenNote").innerHTML = `Allergeni: ${leg}.<br>Per qualsiasi allergia o intolleranza informa il personale di sala: sapremo consigliarti al meglio.`;
    }
  }

  /* ---------------------------------------------- CONTATTI (home) */
  if ($("#cAddress")){
    const a = B.address;
    $("#cAddress").innerHTML = `${esc(a.street)}<br>${esc(a.zip)} ${esc(a.town)} (${esc(a.province)})`;
    $("#cMaps").href = B.maps;
    $("#cPhone").href = telHref; $("#cPhone").textContent = B.phone.display;
    $("#cWhatsapp").href = "https://wa.me/" + B.whatsapp + "?text=" + encodeURIComponent("Ciao Aura, vorrei un'informazione.");
    if ($("#prenotaCall")){ $("#prenotaCall").href = telHref; $("#prenotaCall").querySelector("span").textContent = B.phone.display; }
    if ($("#prenotaThefork")) $("#prenotaThefork").href = B.thefork;
    if ($("#cStatus")) renderStato($("#cStatus"));

    const q = encodeURIComponent(`Aura Pompei ${a.street} ${a.zip} ${a.town} ${a.province}`);
    if ($("#mapFrame")) $("#mapFrame").src = `https://www.google.com/maps?q=${q}&hl=it&z=16&output=embed`;

    if ($("#hoursTable")){
      const t = $("#hoursTable");
      const todayKey = GIORNI[new Date().getDay()];
      ORDINE_SETT.forEach(k=>{
        const fasce = (B.hours[k]||[]).map(([o,c])=>`${o}–${c}`).join(" · ") || "Chiuso";
        const tr = el("tr", k===todayKey ? "today" : "");
        tr.innerHTML = `<td>${GIORNI_LABEL[k]}</td><td>${esc(fasce)}</td>`;
        t.appendChild(tr);
      });
    }
  }

  /* -------------------------------------------- FORM PRENOTAZIONE (home) */
  (function(){
    const form = $("#bookingForm");
    if(!form) return;
    const data = $("#bkData"), orario = $("#bkOrario"), confirm = $("#bookingConfirm");
    const today = new Date(); today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    const iso = today.toISOString().slice(0,10);
    data.min = iso; data.value = "";

    function buildTimes(dateStr){
      orario.innerHTML = '<option value="" disabled selected>Scegli un orario</option>';
      const d = dateStr ? new Date(dateStr+"T00:00") : new Date();
      const key = GIORNI[d.getDay()];
      const isToday = dateStr === iso;
      const nowMin = new Date().getHours()*60 + new Date().getMinutes();
      let count = 0;
      (B.hours[key]||[]).forEach(([o,c])=>{
        for(let m=toMin(o); m<=toMin(c)-45; m+=15){
          if (isToday && m <= nowMin+30) continue;
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
      const box = $(`.error[data-for="${id}"]`); if(box) box.textContent = msg||"";
    }
    function validate(){
      let ok = true;
      const nome = $("#bkNome").value.trim();
      const pers = parseInt($("#bkPersone").value,10);
      if(nome.length<2){ setError("bkNome","Inserisci il tuo nome."); ok=false; } else setError("bkNome","");
      if(!pers || pers<1 || pers>20){ setError("bkPersone","Da 1 a 20 persone."); ok=false; } else setError("bkPersone","");
      if(!data.value){ setError("bkData","Scegli una data."); ok=false; }
      else if(data.value < iso){ setError("bkData","La data non può essere passata."); ok=false; } else setError("bkData","");
      if(!orario.value){ setError("bkOrario","Scegli un orario."); ok=false; } else setError("bkOrario","");
      return ok;
    }
    ["bkNome","bkPersone","bkData","bkOrario"].forEach(id=>{
      $("#"+id).addEventListener("input",()=>{ if($("#"+id).closest(".field").classList.contains("invalid")) validate(); });
    });

    form.addEventListener("submit",(e)=>{
      e.preventDefault(); confirm.hidden = true;
      if(!validate()) return;
      const nome = $("#bkNome").value.trim();
      const pers = $("#bkPersone").value;
      const dLoc = new Date(data.value+"T00:00").toLocaleDateString("it-IT",{weekday:"long",day:"numeric",month:"long"});
      const msg = `Ciao Aura, vorrei prenotare un tavolo.%0ANome: ${encodeURIComponent(nome)}%0APersone: ${encodeURIComponent(pers)}%0AData: ${encodeURIComponent(dLoc)}%0AOrario: ${encodeURIComponent(orario.value)}`;
      window.open(`https://wa.me/${B.whatsapp}?text=${msg}`,"_blank");
      confirm.hidden = false;
      confirm.textContent = "Ti stiamo aprendo WhatsApp — premi invio per inviare la richiesta. Ti confermeremo il tavolo in chat: la prenotazione è valida solo dopo la nostra conferma.";
      confirm.scrollIntoView({behavior:"smooth",block:"center"});
    });
  })();

  /* -------------------------------------------------- UI condivisa */
  if ($("#sbCall")) $("#sbCall").href = telHref;

  const header = $(".site-header");
  if (header){
    const onScroll = ()=> header.classList.toggle("solid", window.scrollY > 40);
    onScroll(); window.addEventListener("scroll", onScroll, {passive:true});
  }

  if ("IntersectionObserver" in window){
    const io = new IntersectionObserver((ents)=>{
      ents.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
    }, {threshold:.12});
    requestAnimationFrame(()=> $$(".reveal").forEach(n=>io.observe(n)));
  } else $$(".reveal").forEach(n=>n.classList.add("in"));

  setInterval(()=>{ renderStato($("#heroStatus")); renderStato($("#cStatus")); }, 60000);
  if ($("#year")) $("#year").textContent = new Date().getFullYear();
  $$("[data-year]").forEach(n=> n.textContent = new Date().getFullYear());
})();
