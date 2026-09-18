/* ============================================
   Studiehub — gedeelde helpers
   ============================================
   Store: bewaart data nu in localStorage (per
   apparaat). Als de Firebase-sync erbij komt,
   verander je alleen de binnenkant van deze
   drie functies — de rest van de code blijft
   hetzelfde, want die roept alleen Store.get/
   Store.set/Store.remove aan.
*/

const Store = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem("studiehub:" + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) {
      console.warn("Store.get faalde voor", key, e);
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem("studiehub:" + key, JSON.stringify(value));
    } catch (e) {
      console.warn("Store.set faalde voor", key, e);
    }
  },
  remove(key) {
    localStorage.removeItem("studiehub:" + key);
  },
};

function markeerActieveTab() {
  const hier = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav.tabs .tab").forEach((tab) => {
    const href = tab.getAttribute("href");
    if (href === hier) tab.classList.add("is-active");
  });
}

document.addEventListener("DOMContentLoaded", markeerActieveTab);
