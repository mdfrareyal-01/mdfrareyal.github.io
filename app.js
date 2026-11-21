const C = window.CFG || {}, TK = "lab_tok";
const ok = () => C.url && !C.url.includes("YOUR-PROJECT");
const RK = "lab_ref";
async function why(r) { let t = ""; try { const j = await r.json(); t = j.message || j.msg || j.error_description || j.error || ""; } catch (e) {} return r.status + (t ? ": " + t : ""); }
function expired() { try { const p = JSON.parse(atob(localStorage.getItem(TK).split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))); return p.exp * 1000 < Date.now() + 30000; } catch (e) { return true; } }
async function renew() {
  const rt = localStorage.getItem(RK); if (!rt) return false;
  try { const r = await fetch(`${C.url}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: { apikey: C.key, "Content-Type": "application/json" }, body: JSON.stringify({ refresh_token: rt }) });
    if (!r.ok) return false; const j = await r.json(); localStorage.setItem(TK, j.access_token); if (j.refresh_token) localStorage.setItem(RK, j.refresh_token); return true; } catch (e) { return false; }
}
async function authed(url, o) { let r = await fetch(url, { ...o, headers: H(true, o.headers) }); if (r.status === 401 && await renew()) r = await fetch(url, { ...o, headers: H(true, o.headers) }); return r; }
const H = (a, x = {}) => ({ apikey: C.key, ...(a ? { Authorization: "Bearer " + localStorage.getItem(TK) } : {}), ...x });
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
async function list(t) {
  const r = await fetch(`${C.url}/rest/v1/${t}?select=*&order=created_at.desc`, { headers: H() });
  if (!r.ok) throw new Error("Cannot read " + t + " (" + await why(r) + ")"); return r.json();
}
async function login(email, password) {
  const r = await fetch(`${C.url}/auth/v1/token?grant_type=password`, { method: "POST", headers: { apikey: C.key, "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
  if (!r.ok) throw new Error("Login failed (" + await why(r) + ")");
  const j = await r.json(); localStorage.setItem(TK, j.access_token); if (j.refresh_token) localStorage.setItem(RK, j.refresh_token);
}
async function compress(file) {
  const b = await createImageBitmap(file), s = Math.min(1, 1600 / Math.max(b.width, b.height));
  const c = document.createElement("canvas"); c.width = Math.round(b.width * s); c.height = Math.round(b.height * s);
  c.getContext("2d").drawImage(b, 0, 0, c.width, c.height);
  return new Promise((r) => c.toBlob(r, "image/jpeg", 0.82));
}
async function upload(file) {
  const p = Date.now() + "-" + Math.random().toString(36).slice(2, 8) + ".jpg";
  const r = await authed(`${C.url}/storage/v1/object/labs/${p}`, { method: "POST", headers: { "Content-Type": "image/jpeg" }, body: await compress(file) });
  if (!r.ok) throw new Error("Image upload failed (" + await why(r) + ")");
  return `${C.url}/storage/v1/object/public/labs/${p}`;
}
async function add(t, o) {
  const r = await authed(`${C.url}/rest/v1/${t}`, { method: "POST", headers: { "Content-Type": "application/json", Prefer: "return=minimal" }, body: JSON.stringify(o) });
  if (!r.ok) throw new Error("Save failed (" + await why(r) + ")");
}
async function del(t, id) {
  const r = await authed(`${C.url}/rest/v1/${t}?id=eq.${id}`, { method: "DELETE" });
  if (!r.ok) throw new Error("Delete failed (" + await why(r) + ")");
}

// language + theme helpers (shared by site and admin)
let LANG = "en"; try { LANG = localStorage.lang || "en"; } catch (e) {}
const pick = (o, f) => (LANG === "bn" && o[f + "_bn"]) ? o[f + "_bn"] : o[f];
function applyTheme(t) { document.documentElement.dataset.theme = t; try { localStorage.theme = t; } catch (e) {} }
