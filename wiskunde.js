/* ============================================
   Wiskunde — paginalogica
   ============================================ */

const VAK = "wiskunde";

/* ---------- Thema's ---------- */

const standaardThemas = [
  { naam: "Lijnen en hellingen", klaar: false },
  { naam: "Cirkels", klaar: false },
  { naam: "Raaklijnen aan een cirkel", klaar: false },
  { naam: "Afstand berekenen", klaar: false },
  { naam: "Kwadraat afsplitsen", klaar: false },
];

function laadThemas() {
  return Store.get(`${VAK}:themas`, standaardThemas);
}
function bewaarThemas(themas) {
  Store.set(`${VAK}:themas`, themas);
}

function tekenThemas() {
  const lijst = document.getElementById("themalijst");
  const themas = laadThemas();
  lijst.innerHTML = "";
  themas.forEach((t, i) => {
    const li = document.createElement("li");
    if (t.klaar) li.classList.add("klaar");
    const id = `thema-${i}`;
    li.innerHTML = `
      <input type="checkbox" id="${id}" ${t.klaar ? "checked" : ""}>
      <label for="${id}">${escapeHtml(t.naam)}</label>
      <button class="verwijder" type="button" aria-label="Verwijder ${escapeHtml(t.naam)}">✕</button>
    `;
    li.querySelector("input").addEventListener("change", (e) => {
      const themas2 = laadThemas();
      themas2[i].klaar = e.target.checked;
      bewaarThemas(themas2);
      tekenThemas();
    });
    li.querySelector(".verwijder").addEventListener("click", () => {
      const themas2 = laadThemas();
      themas2.splice(i, 1);
      bewaarThemas(themas2);
      tekenThemas();
    });
    lijst.appendChild(li);
  });
}

document.getElementById("themaForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("themaInput");
  const naam = input.value.trim();
  if (!naam) return;
  const themas = laadThemas();
  themas.push({ naam, klaar: false });
  bewaarThemas(themas);
  input.value = "";
  tekenThemas();
});

/* ---------- Planning ---------- */

function laadPlan() {
  return Store.get(`${VAK}:plan`, []);
}
function bewaarPlan(plan) {
  Store.set(`${VAK}:plan`, plan);
}

function tekenPlan() {
  const lijst = document.getElementById("planlijst");
  const plan = laadPlan();
  lijst.innerHTML = "";
  if (plan.length === 0) {
    lijst.innerHTML = '<li class="leeg" style="border:none;">Nog geen taken deze week.</li>';
    return;
  }
  plan.forEach((taak, i) => {
    const li = document.createElement("li");
    if (taak.klaar) li.classList.add("klaar");
    const id = `plan-${i}`;
    li.innerHTML = `
      <input type="checkbox" id="${id}" ${taak.klaar ? "checked" : ""}>
      <span class="taak">${escapeHtml(taak.tekst)}</span>
      <span class="badge ${taak.type}">${taak.type === "verplicht" ? "Verplicht" : "Optioneel"}</span>
      <button class="verwijder" type="button" aria-label="Verwijder taak">✕</button>
    `;
    li.querySelector("input").addEventListener("change", (e) => {
      const plan2 = laadPlan();
      plan2[i].klaar = e.target.checked;
      bewaarPlan(plan2);
      tekenPlan();
    });
    li.querySelector(".verwijder").addEventListener("click", () => {
      const plan2 = laadPlan();
      plan2.splice(i, 1);
      bewaarPlan(plan2);
      tekenPlan();
    });
    lijst.appendChild(li);
  });
}

document.getElementById("planForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("planInput");
  const type = document.getElementById("planType").value;
  const tekst = input.value.trim();
  if (!tekst) return;
  const plan = laadPlan();
  plan.push({ tekst, type, klaar: false });
  bewaarPlan(plan);
  input.value = "";
  tekenPlan();
});

/* ---------- Rekenhulp: abc-formule ---------- */

document.getElementById("abcForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  const c = parseFloat(document.getElementById("c").value);
  const uit = document.getElementById("abcUitkomst");
  uit.hidden = false;

  if (a === 0) {
    uit.innerHTML = '<span class="fout">a mag niet 0 zijn (dan is het geen kwadratische vergelijking).</span>';
    return;
  }
  const d = b * b - 4 * a * c;
  if (d < 0) {
    uit.innerHTML = `D = ${d.toFixed(2)} — geen reële oplossingen.`;
  } else if (d === 0) {
    const x = -b / (2 * a);
    uit.innerHTML = `D = 0 — één oplossing: x = ${round(x)}`;
  } else {
    const x1 = (-b + Math.sqrt(d)) / (2 * a);
    const x2 = (-b - Math.sqrt(d)) / (2 * a);
    uit.innerHTML = `D = ${round(d)} — x₁ = ${round(x1)}, x₂ = ${round(x2)}`;
  }
});

function round(n) {
  return Math.round(n * 1000) / 1000;
}

/* ---------- Moeilijk vind ik... ---------- */

function laadMoeilijk() {
  return Store.get(`${VAK}:moeilijk`, []);
}
function bewaarMoeilijk(lijst) {
  Store.set(`${VAK}:moeilijk`, lijst);
}

function tekenMoeilijk() {
  const wrap = document.getElementById("moeilijkTags");
  const lijst = laadMoeilijk();
  wrap.innerHTML = "";
  lijst.forEach((naam, i) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.innerHTML = `${escapeHtml(naam)} <button type="button" aria-label="Verwijder ${escapeHtml(naam)}">✕</button>`;
    span.querySelector("button").addEventListener("click", () => {
      const lijst2 = laadMoeilijk();
      lijst2.splice(i, 1);
      bewaarMoeilijk(lijst2);
      tekenMoeilijk();
    });
    wrap.appendChild(span);
  });
}

document.getElementById("moeilijkForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("moeilijkInput");
  const naam = input.value.trim();
  if (!naam) return;
  const lijst = laadMoeilijk();
  lijst.push(naam);
  bewaarMoeilijk(lijst);
  input.value = "";
  tekenMoeilijk();
});

/* ---------- Aantekeningen ---------- */

const notitiesVeld = document.getElementById("notities");
notitiesVeld.value = Store.get(`${VAK}:notities`, "");
let notitiesTimer;
notitiesVeld.addEventListener("input", () => {
  clearTimeout(notitiesTimer);
  notitiesTimer = setTimeout(() => {
    Store.set(`${VAK}:notities`, notitiesVeld.value);
  }, 400);
});

/* ---------- Naslagwerk ---------- */

const naslagStandaard = [
  { titel: "abc-formule", formule: "x = (−b ± √(b² − 4ac)) / 2a", uitleg: "Oplossen van ax² + bx + c = 0." },
  { titel: "Kwadraat afsplitsen", formule: "ax² + bx + c = a(x + b/2a)² + c − b²/4a", uitleg: "Alternatief voor de abc-formule, handig bij top van een parabool." },
  { titel: "Vergelijking van een cirkel", formule: "(x − a)² + (y − b)² = r²", uitleg: "Middelpunt (a, b), straal r." },
  { titel: "Richtingscoëfficiënt", formule: "rc = (y₂ − y₁) / (x₂ − x₁)", uitleg: "Helling van een lijn door twee punten." },
  { titel: "Afstand tussen twee punten", formule: "d = √((x₂ − x₁)² + (y₂ − y₁)²)", uitleg: "Stelling van Pythagoras toegepast op coördinaten." },
  { titel: "Loodrechte lijnen", formule: "rc₁ · rc₂ = −1", uitleg: "Twee lijnen staan loodrecht als het product van hun rc's −1 is." },
];

function laadNaslag() {
  return Store.get(`${VAK}:naslag`, naslagStandaard);
}

function tekenNaslag(filter = "") {
  const wrap = document.getElementById("naslagLijst");
  const q = filter.trim().toLowerCase();
  const items = laadNaslag().filter(
    (i) => !q || i.titel.toLowerCase().includes(q) || i.uitleg.toLowerCase().includes(q)
  );
  wrap.innerHTML = "";
  if (items.length === 0) {
    wrap.innerHTML = '<p class="leeg">Niks gevonden.</p>';
    return;
  }
  items.forEach((i) => {
    const div = document.createElement("div");
    div.className = "naslag-item";
    div.innerHTML = `
      <div class="titel">${escapeHtml(i.titel)}</div>
      <div class="formule">${escapeHtml(i.formule)}</div>
      <div class="uitleg-tekst">${escapeHtml(i.uitleg)}</div>
    `;
    wrap.appendChild(div);
  });
}

document.getElementById("naslagZoek").addEventListener("input", (e) => {
  tekenNaslag(e.target.value);
});

/* ---------- Init ---------- */

function escapeHtml(s) {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

tekenThemas();
tekenPlan();
tekenMoeilijk();
tekenNaslag();
