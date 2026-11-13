
const icons = {
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.5V21h13V9.5M9.5 21v-6h5v6"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  suitcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M8 11v3M16 11v3"/></svg>',
  search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.2 3.4L16.5 8l-3.3 1.4L12 13l-1.3-3.6L7.5 8l3.2-1.6L12 3ZM19 14l.8 2.2L22 17l-2.2.9L19 20l-.8-2.1L16 17l2.2-.8L19 14ZM5 13l.7 2L8 16l-2.3.9L5 19l-.7-2.1L2 16l2.3-1L5 13Z"/></svg>',
  help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.4 2.4 0 1 1 3.4 2.2c-.8.4-1.2 1-1.2 1.8M12 17h.01"/></svg>',
  plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
  plane: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7Z"/><path d="M22 2 11 13"/></svg>',
  check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  alert: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.3 4.2 2.6 18a2 2 0 0 0 1.8 3h15.2a2 2 0 0 0 1.8-3L13.7 4.2a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  cake: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13h16v8H4zM4 17c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1M8 13V9h8v4M12 3v3"/></svg>',
  passport: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M9 10h6M12 7c1 1 1 5 0 6M8 17h8"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
  close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"/></svg>',
  chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></svg>',
  map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
};

const AGENCY = {
  name: "Magno Tours",
  address: "Calle Efrén Rebolledo No. 2, Plaza Yamile, Col. Centro, Actopan, Hidalgo",
  city: "Actopan, Hgo.",
};

// Catálogos que llegan de la base de datos (tablas servicio y pais).
let SERVICES = [];
let COUNTRIES = [];
let PAYMENT_METHODS = [];
const money = (value) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(value || 0);

// Si el sistema pide reducir el movimiento, se omiten las esperas de las animaciones.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const SPLASH_MS = reduceMotion ? 0 : 1600;
const PAGE_LOADER_MS = reduceMotion ? 0 : 350;
// Elementos que aparecen uno tras otro al entrar a una sección.
const ANIMATED_ITEMS = ".welcome-banner, .stat-card, .card, .client-card, tbody tr, .departure-item, .promo-item, .result-item, .search-hero";

// Todo lo que muestra la app llega de MySQL por medio de la API de server.js.
let state = { clients: [], requests: [], promotions: [] };
let session = loadSession(); // { token, usuario: { nombre, rol, ... } }
let requestFilter = "Todas";
let activePage = "dashboard";
let carouselIndex = 0;
let carouselTimer = null;

// Nivel de cada rol: el de número mayor puede todo lo de los anteriores.
const ROLE_LEVEL = { Empleado: 1, Gerente: 2, Administrador: 3 };
const can = (minRole) => Boolean(session) && ROLE_LEVEL[session.usuario.rol] >= ROLE_LEVEL[minRole];

function loadSession() {
  try { return JSON.parse(sessionStorage.getItem("magno-tours-session")); } catch (_) { return null; }
}

// Llama a la API. Si el servidor responde con error, muestra el mensaje y avisa con una excepción.
async function api(url, body) {
  const options = { headers: { "Content-Type": "application/json", "x-token": session?.token || "" } };
  if (body !== undefined) Object.assign(options, { method: "POST", body: JSON.stringify(body) });
  let response;
  try { response = await fetch(url, options); } catch (_) { throw new Error("No se pudo contactar al servidor de la aplicación."); }
  const data = await response.json().catch(() => ({}));
  if (response.status === 401 && session) { setLoggedOut(true); }
  if (!response.ok) throw new Error(data.error || "No se pudo completar la operación.");
  return data;
}

// Vuelve a leer todo de la base y redibuja la pantalla.
async function loadData() {
  const data = await api("/api/datos");
  SERVICES = data.services;
  COUNTRIES = data.countries;
  PAYMENT_METHODS = data.paymentMethods;
  state = { clients: data.clients, requests: data.requests, promotions: data.promotions };
  renderAll();
}

// Guarda en la base; si sale bien recarga los datos, si no, muestra el error.
async function saveAndReload(url, body, form) {
  const button = form?.querySelector("[type=submit]");
  if (button) button.disabled = true;
  try {
    const result = await api(url, body);
    await loadData();
    return result;
  } catch (error) {
    toast("No se guardó", error.message, "alert");
    return null;
  } finally {
    if (button) button.disabled = false;
  }
}

function renderProfile() {
  const user = session?.usuario || { nombre: "Sin sesión", rol: "" };
  ["#profile-avatar", "#profile-menu-avatar"].forEach((selector) => { document.querySelector(selector).textContent = initials(user.nombre); });
  ["#profile-name", "#profile-menu-name"].forEach((selector) => { document.querySelector(selector).textContent = user.nombre; });
  document.querySelector("#profile-role").textContent = user.rol ? `${user.rol} · Actopan, Hgo.` : "";
  // Muestra solo las secciones que el rol puede usar
  document.querySelectorAll("[data-min-role]").forEach((element) => element.classList.toggle("hidden", !can(element.dataset.minRole)));
}

function toggleProfileMenu(open) {
  const menu = document.querySelector("#profile-menu");
  const show = open ?? !menu.classList.contains("open");
  menu.classList.toggle("open", show);
  menu.setAttribute("aria-hidden", String(!show));
  document.querySelector("#profile-toggle").setAttribute("aria-expanded", String(show));
}

// Pantalla de inicio de sesión. Al entrar se guardan el token y el usuario mientras la ventana esté abierta.
function setLoggedOut(loggedOut) {
  const screen = document.querySelector("#login-screen");
  screen.classList.toggle("hide", !loggedOut);
  screen.setAttribute("aria-hidden", String(!loggedOut));
  if (loggedOut) {
    if (session) api("/api/logout", {}).catch(() => {});
    session = null;
    sessionStorage.removeItem("magno-tours-session");
    closeModal(); closeDrawer(); toggleChat(false);
    setTimeout(() => document.querySelector("#login-form [name=usuario]").focus(), 50);
  }
}

async function login(form) {
  const error = form.querySelector(".login-error");
  error.textContent = "";
  try {
    const values = Object.fromEntries(new FormData(form));
    if (!values.usuario.trim() || !values.contrasena) throw new Error("Escribe tu usuario y tu contraseña.");
    session = await api("/api/login", values);
    sessionStorage.setItem("magno-tours-session", JSON.stringify(session));
    await loadData();
    renderProfile();
    form.reset();
    setLoggedOut(false);
    navigate(can(document.querySelector(`[data-page="${activePage}"]`)?.dataset.minRole || "Empleado") ? activePage : "dashboard");
    toast(`Bienvenido, ${session.usuario.nombre}`, `Entraste como ${session.usuario.rol.toLowerCase()}.`);
  } catch (problem) {
    session = null;
    error.textContent = problem.message;
  }
}

function esc(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

function normalize(value = "") {
  return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function injectIcons(root = document) {
  root.querySelectorAll("[data-icon]").forEach((element) => {
    const name = element.dataset.icon;
    if (icons[name]) element.innerHTML = icons[name];
  });
}

function clientFor(request) {
  return state.clients.find((client) => client.id === request.clientId);
}

function initials(name) {
  return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

function formatDate(dateValue, options = {}) {
  if (!dateValue) return "No aplica";
  const date = new Date(`${dateValue}T12:00:00`);
  return new Intl.DateTimeFormat("es-MX", { day: "2-digit", month: "short", year: options.short ? undefined : "numeric" }).format(date).replace(".", "");
}

// Destino como se muestra en pantalla: lugar (si se capturó) y país.
function destinationLabel(request) {
  return request.place || request.destination;
}

function scopeFor(destination) {
  return normalize(destination) === "mexico" ? "Nacional" : "Internacional";
}

function statusClass(status) {
  return `status-${normalize(status).replace(/\s/g, "-")}`;
}

function setToday() {
  const now = new Date();
  const formatted = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "long" }).format(now);
  document.querySelector("#today-label").textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  const hour = now.getHours();
  document.querySelector("#page-title").textContent = hour < 12 ? "Buenos días" : hour < 19 ? "Buenas tardes" : "Buenas noches";
}

function renderAll() {
  renderDashboard();
  renderClients();
  renderRequests();
  renderSearch();
  renderPromotions();
  if (activePage === "users") renderUsers();
  injectIcons();
}

function renderDashboard() {
  const pending = state.requests.filter((request) => request.status === "Pendiente").length;
  const active = state.requests.filter((request) => request.status !== "Cancelada").length;
  const confirmed = state.requests.filter((request) => request.status === "Confirmada").length;
  document.querySelector("#pending-nav-count").textContent = pending;
  document.querySelector("#welcome-pending").textContent = `${pending} ${pending === 1 ? "solicitud pendiente" : "solicitudes pendientes"}`;

  const stats = [
    [active, "Solicitudes activas", "suitcase"],
    [pending, "Pendientes por atender", "clock"],
    [confirmed, "Viajes confirmados", "check"],
    [state.clients.length, "Clientes registrados", "users"],
  ];
  document.querySelector("#stats-grid").innerHTML = stats.map(([value, label, icon]) => `
    <article class="stat-card"><span class="stat-icon" data-icon="${icon}"></span><div><p class="stat-value">${value}</p><span class="stat-label">${label}</span></div></article>
  `).join("");

  const recent = [...state.requests].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);
  document.querySelector("#recent-requests-body").innerHTML = recent.map((request) => requestRow(request)).join("");

  const departures = state.requests
    .filter((request) => request.status === "Confirmada" || request.status === "En proceso")
    .sort((a, b) => a.departure.localeCompare(b.departure)).slice(0, 3);
  document.querySelector("#departures-list").innerHTML = departures.length ? departures.map((request) => {
    const date = new Date(`${request.departure}T12:00:00`);
    const day = String(date.getDate()).padStart(2, "0");
    const month = new Intl.DateTimeFormat("es-MX", { month: "short" }).format(date).replace(".", "").toUpperCase();
    return `<div class="departure-item"><div class="date-box"><strong>${day}</strong><span>${month}</span></div><div><h4>${esc(destinationLabel(request))}</h4><p>${esc(clientFor(request)?.name || "Cliente")} · ${request.travelers} ${request.travelers === 1 ? "viajero" : "viajeros"}</p></div></div>`;
  }).join("") : '<div class="empty-state"><p>No hay salidas próximas.</p></div>';

  renderCarousel();
  document.querySelector("#service-list").innerHTML = SERVICES.map((service) => `<span class="service-chip">${esc(service)}</span>`).join("");
}

// Carrusel de promociones activas: avanza solo cada 5 segundos y con las flechas.
function renderCarousel() {
  const promos = state.promotions.filter((promo) => promo.active);
  const track = document.querySelector("#promo-track");
  carouselIndex = Math.min(carouselIndex, Math.max(promos.length - 1, 0));
  track.innerHTML = promos.length ? promos.map((promo) => `
    <article class="promo-slide">
      <p class="section-kicker">${esc(promo.service)}</p>
      <h4>${esc(promo.title)}</h4>
      <p>${esc(promo.detail)}</p>
      <button class="btn btn-danger" type="button" data-promo="${promo.id}">Crear solicitud <span data-icon="arrow"></span></button>
    </article>`).join("") : '<div class="empty-state"><p>No hay promociones activas.</p></div>';
  document.querySelector("#promo-dots").innerHTML = promos.map((_, index) => `<button type="button" class="${index === carouselIndex ? "active" : ""}" data-slide="${index}" aria-label="Promoción ${index + 1}"></button>`).join("");
  moveCarousel(carouselIndex);
  clearInterval(carouselTimer);
  if (promos.length > 1 && !reduceMotion) carouselTimer = setInterval(() => moveCarousel(carouselIndex + 1), 5000);
}

function moveCarousel(index) {
  const total = state.promotions.filter((promo) => promo.active).length;
  if (!total) return;
  carouselIndex = (index + total) % total;
  document.querySelector("#promo-track").style.transform = `translateX(-${carouselIndex * 100}%)`;
  document.querySelectorAll("#promo-dots button").forEach((dot, i) => dot.classList.toggle("active", i === carouselIndex));
}

// Sección Promociones (gerente y administrador): alta y activar/desactivar.
function renderPromotions() {
  const body = document.querySelector("#promotions-body");
  if (!body) return;
  body.innerHTML = state.promotions.map((promo) => `<tr>
    <td><strong>${esc(promo.title)}</strong><span class="muted">${esc(promo.detail)}</span></td>
    <td>${esc(promo.service)}</td><td>${esc(promo.place || "—")}</td>
    <td><span class="status-pill ${promo.active ? "status-confirmada" : "status-cancelada"}">${promo.active ? "Activa" : "Inactiva"}</span></td>
    <td><div class="row-actions"><button class="text-button" type="button" data-edit-promo="${promo.id}">Editar</button><button class="text-button" type="button" data-toggle-promo="${promo.id}">${promo.active ? "Desactivar" : "Activar"}</button><button class="text-button danger" type="button" data-delete-promo="${promo.id}">Eliminar</button></div></td>
  </tr>`).join("") || '<tr><td colspan="5" class="muted">Aún no hay promociones.</td></tr>';
}

function openPromotionForm(promo = null) {
  const serviceOptions = SERVICES.map((service) => `<option value="${esc(service)}" ${promo?.service === service ? "selected" : ""}>${esc(service)}</option>`).join("");
  const content = `<form id="promo-form" novalidate><div class="form-grid">
    ${field("title", "Título", "text", promo?.title || "", "", "full")}
    ${field("detail", "Descripción", "text", promo?.detail || "", "", "full")}
    ${field("service", "Servicio", "select", "", serviceOptions)}
    ${field("place", "Ciudad o lugar", "text", promo?.place || "", "", "", false)}
    <div class="form-actions"><button class="btn btn-secondary" type="button" data-close-modal>Cancelar</button><button class="btn btn-primary" type="submit">Guardar promoción</button></div>
  </div></form>`;
  openModal({ title: promo ? "Editar promoción" : "Nueva promoción", kicker: "PROMOCIONES", content, onReady: () => {
    const form = document.querySelector("#promo-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form));
      const errors = {};
      if (!values.title.trim()) errors.title = "Escribe el título.";
      else if (values.title.trim().length > 60) errors.title = "Máximo 60 caracteres.";
      if (!values.detail.trim()) errors.detail = "Escribe la descripción.";
      else if (values.detail.trim().length > 160) errors.detail = "Máximo 160 caracteres.";
      if (Object.keys(errors).length) return showErrors(form, errors);
      const url = promo ? `/api/promociones/${promo.id}` : "/api/promociones";
      if (await saveAndReload(url, values, form)) { closeModal(); toast("Promoción guardada", values.title); }
    });
  }});
}

// Sección Usuarios (solo administrador): crear, editar, activar/desactivar y eliminar.
let usersCache = [];
async function renderUsers() {
  const body = document.querySelector("#users-body");
  try {
    const users = await api("/api/usuarios");
    body.innerHTML = users.map((user) => `<tr>
      <td><div class="client-cell"><span class="mini-avatar">${esc(initials(user.nombre))}</span><strong>${esc(user.nombre)}</strong></div></td>
      <td>${esc(user.usuario)}</td><td>${esc(user.rol)}</td>
      <td><span class="status-pill ${user.activo ? "status-confirmada" : "status-cancelada"}">${user.activo ? "Activo" : "Inactivo"}</span></td>
      <td><div class="row-actions"><button class="text-button" type="button" data-edit-user="${user.id}">Editar</button><button class="text-button" type="button" data-toggle-user="${user.id}">${user.activo ? "Desactivar" : "Activar"}</button><button class="text-button danger" type="button" data-delete-user="${user.id}">Eliminar</button></div></td>
    </tr>`).join("");
    usersCache = users;
  } catch (error) {
    body.innerHTML = `<tr><td colspan="5" class="muted">${esc(error.message)}</td></tr>`;
  }
}

function openUserForm(user = null) {
  const roleOptions = Object.keys(ROLE_LEVEL).map((role) => `<option value="${role}" ${user?.rol === role ? "selected" : ""}>${role}</option>`).join("");
  const content = `<form id="user-form" novalidate><div class="form-grid">
    ${field("nombre", "Nombre completo", "text", user?.nombre || "", "", "full")}
    ${field("usuario", "Usuario", "text", user?.usuario || "")}
    ${field("rol", "Rol", "select", "", roleOptions)}
    ${field("contrasena", user ? "Nueva contraseña (vacía = no cambia)" : "Contraseña", "password", "", "", "full", !user)}
    <div class="form-actions"><button class="btn btn-secondary" type="button" data-close-modal>Cancelar</button><button class="btn btn-primary" type="submit">${user ? "Guardar cambios" : "Crear usuario"}</button></div>
  </div></form>`;
  openModal({ title: user ? "Editar usuario" : "Nuevo usuario", kicker: "USUARIOS", content, onReady: () => {
    const form = document.querySelector("#user-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form));
      const errors = {};
      if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(values.nombre.trim())) errors.nombre = "El nombre solo admite letras y espacios.";
      if (!/^[a-z0-9._]{3,30}$/.test(values.usuario.trim())) errors.usuario = "De 3 a 30 letras minúsculas, números, punto o guion bajo.";
      if ((!user || values.contrasena) && values.contrasena.length < 6) errors.contrasena = "Mínimo 6 caracteres.";
      if (Object.keys(errors).length) return showErrors(form, errors);
      const url = user ? `/api/usuarios/${user.id}` : "/api/usuarios";
      if (await saveAndReload(url, values, form)) { closeModal(); renderUsers(); toast(user ? "Usuario actualizado" : "Usuario creado", `${values.usuario} ya puede entrar.`); }
    });
  }});
}

function requestRow(request, full = false) {
  const client = clientFor(request) || { name: "Cliente no disponible" };
  const base = full ? `<td>${esc(request.id)}</td>` : "";
  const extra = full ? `<td><span class="scope-pill ${scopeFor(request.destination) === "Internacional" ? "internacional" : ""}">${scopeFor(request.destination)}</span></td><td>${request.travelers}</td>` : `<td>${esc(request.tripType)}</td>`;
  return `<tr>
    ${base}
    <td><div class="client-cell"><span class="mini-avatar">${esc(initials(client.name))}</span><strong>${esc(client.name)}</strong></div></td>
    <td><span class="destination">${esc(destinationLabel(request))}</span><span class="muted">${esc(request.service || "Sin servicio")} · ${scopeFor(request.destination)}</span></td>
    <td>${formatDate(request.departure, { short: true })}</td>
    ${extra}
    <td><span class="status-pill ${statusClass(request.status)}">${esc(request.status)}</span></td>
    <td><button class="row-action" type="button" aria-label="Ver solicitud ${esc(request.id)}" data-view-request="${esc(request.id)}" data-icon="chevron"></button></td>
  </tr>`;
}

function renderClients() {
  const query = normalize(document.querySelector("#client-search")?.value || "");
  const results = state.clients.filter((client) => normalize(client.name).includes(query) || client.phone.includes(query));
  document.querySelector("#client-result-count").textContent = `${results.length} ${results.length === 1 ? "cliente" : "clientes"}`;
  document.querySelector("#client-grid").innerHTML = results.map((client) => `
    <article class="client-card">
      <button class="row-action" type="button" aria-label="Ver ${esc(client.name)}" data-view-client="${esc(client.id)}" data-icon="chevron"></button>
      <div class="client-card-top"><div class="client-avatar">${esc(initials(client.name))}</div><div><h3>${esc(client.name)}</h3><span class="client-id">${esc(client.id)}</span></div></div>
      <div class="client-meta"><span>${icons.phone}${esc(client.phone)}</span><span>${icons.cake}${formatDate(client.birth)}</span></div>
      <div class="client-footer"><span class="passport-state ${client.passport ? "yes" : ""}">${icons.passport}${client.passport ? "Pasaporte registrado" : "Sin pasaporte"}</span><button class="text-button" type="button" data-edit-client="${esc(client.id)}">Editar</button></div>
    </article>
  `).join("");
  document.querySelector("#clients-empty").classList.toggle("hidden", results.length > 0);
}

function renderRequests() {
  const query = normalize(document.querySelector("#request-search")?.value || "");
  const results = state.requests.filter((request) => {
    const client = clientFor(request);
    const matchesFilter = requestFilter === "Todas" || request.status === requestFilter;
    const matchesSearch = [request.destination, request.place, request.service, client?.name].some((value) => normalize(value).includes(query));
    return matchesFilter && matchesSearch;
  }).sort((a, b) => a.departure.localeCompare(b.departure));
  document.querySelector("#request-list-title").textContent = requestFilter === "Todas" ? "Todas las solicitudes" : `Solicitudes: ${requestFilter}`;
  document.querySelector("#all-requests-body").innerHTML = results.map((request) => requestRow(request, true)).join("");
  document.querySelector("#requests-empty").classList.toggle("hidden", results.length > 0);
}

function renderSearch() {
  const container = document.querySelector("#search-results");
  const input = document.querySelector("#global-search");
  const query = normalize(input?.value || "");
  if (!query) {
    container.innerHTML = '<div class="empty-state"><span data-icon="sparkles"></span><h3>Todo listo para buscar</h3><p>Los resultados de clientes y solicitudes aparecerán aquí.</p></div>';
    return;
  }
  const clients = state.clients.filter((client) => normalize(client.name).includes(query) || client.phone.includes(query));
  const requests = state.requests.filter((request) => [request.destination, request.place, request.service, request.status, clientFor(request)?.name].some((value) => normalize(value).includes(query)));
  if (!clients.length && !requests.length) {
    container.innerHTML = '<div class="empty-state"><span data-icon="search"></span><h3>Sin coincidencias</h3><p>Revisa la búsqueda o intenta con un dato distinto.</p></div>';
    return;
  }
  container.innerHTML = `${resultSection("Clientes", clients.map((client) => ({ id: client.id, icon: "user", title: client.name, detail: `${client.phone} · ${client.passport ? "Con pasaporte" : "Sin pasaporte"}`, type: "client" })))}${resultSection("Solicitudes", requests.map((request) => ({ id: request.id, icon: "suitcase", title: `${destinationLabel(request)} · ${clientFor(request)?.name || "Cliente"}`, detail: `${request.id} · ${request.service || "Sin servicio"} · ${formatDate(request.departure)} · ${request.status}`, type: "request" })))}`;
}

function resultSection(title, items) {
  if (!items.length) return "";
  return `<section class="result-section"><h3>${title} <span class="muted">${items.length} coincidencias</span></h3><div class="result-list">${items.map((item) => `
    <div class="result-item"><span class="result-icon" data-icon="${item.icon}"></span><div><h4>${esc(item.title)}</h4><p>${esc(item.detail)}</p></div><button class="row-action" type="button" data-view-${item.type}="${esc(item.id)}" data-icon="chevron"></button></div>
  `).join("")}</div></section>`;
}

// Agrega la clase "entering" a la sección para que sus elementos aparezcan en cascada.
function animatePage(section) {
  section.querySelectorAll(ANIMATED_ITEMS).forEach((element, index) => element.style.setProperty("--i", Math.min(index, 12)));
  section.classList.remove("entering");
  void section.offsetWidth; // reinicia la animación si la sección ya la tenía
  section.classList.add("entering");
  setTimeout(() => section.classList.remove("entering"), 1200);
}

function showPage(page) {
  const main = document.querySelector(".main-content");
  document.querySelectorAll(".page").forEach((section) => section.classList.toggle("active", section.id === `page-${page}`));
  main.classList.remove("is-loading");
  animatePage(document.querySelector(`#page-${page}`));
  if (page === "search") document.querySelector("#global-search").focus();
}

function navigate(page) {
  const samePage = page === activePage;
  activePage = page;
  document.querySelectorAll(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.page === page));
  if (samePage) showPage(page);
  else {
    // Pantalla de carga breve entre secciones
    document.querySelector(".main-content").classList.add("is-loading");
    document.querySelectorAll(".page").forEach((section) => section.classList.remove("active"));
    setTimeout(() => showPage(page), PAGE_LOADER_MS);
  }
  const details = {
    dashboard: ["PANEL DE OPERACIÓN", new Date().getHours() < 12 ? "Buenos días" : "Buenas tardes"],
    clients: ["DIRECTORIO", "Clientes"],
    requests: ["SEGUIMIENTO", "Solicitudes de viaje"],
    search: ["CONSULTA", "Búsqueda"],
    promotions: ["GERENCIA", "Promociones"],
    users: ["ADMINISTRACIÓN", "Usuarios"],
  };
  if (page === "users") renderUsers();
  document.querySelector("#page-eyebrow").textContent = details[page][0];
  document.querySelector("#page-title").textContent = details[page][1];
}

function hideSplash() {
  const splash = document.querySelector("#splash");
  if (!splash) return;
  splash.classList.add("hide");
  setTimeout(() => splash.remove(), reduceMotion ? 0 : 600);
  animatePage(document.querySelector(`#page-${activePage}`));
}

function openModal({ title, kicker, content, onReady }) {
  const layer = document.querySelector("#modal-layer");
  document.querySelector("#modal-title").textContent = title;
  document.querySelector("#modal-kicker").textContent = kicker;
  document.querySelector("#modal-body").innerHTML = content;
  layer.classList.add("open");
  layer.setAttribute("aria-hidden", "false");
  injectIcons(layer);
  onReady?.();
}

function closeModal() {
  const layer = document.querySelector("#modal-layer");
  layer.classList.remove("open");
  layer.setAttribute("aria-hidden", "true");
}

// Abre y cierra el panel del asistente virtual.
function toggleChat(open) {
  const panel = document.querySelector("#chat-panel");
  const button = document.querySelector("#chat-toggle");
  const show = open ?? !panel.classList.contains("open");
  panel.classList.toggle("open", show);
  panel.setAttribute("aria-hidden", String(!show));
  button.setAttribute("aria-expanded", String(show));
}

function closeDrawer() {
  const layer = document.querySelector("#drawer-layer");
  layer.classList.remove("open");
  layer.setAttribute("aria-hidden", "true");
}

function field(name, label, type = "text", value = "", options = "", extra = "", required = true) {
  return `<div class="field ${extra}"><label for="${name}">${label} ${required ? '<span class="required">*</span>' : ""}</label>${type === "select" ? `<select id="${name}" name="${name}">${options}</select>` : `<input id="${name}" name="${name}" type="${type}" value="${esc(value)}" ${type === "tel" ? 'inputmode="numeric" maxlength="10"' : ""} />`}<span class="field-error" data-error="${name}"></span></div>`;
}

function clearErrors(form) {
  form.querySelectorAll(".invalid").forEach((element) => element.classList.remove("invalid"));
  form.querySelectorAll("[data-error]").forEach((element) => { element.textContent = ""; });
}

function showErrors(form, errors) {
  clearErrors(form);
  Object.entries(errors).forEach(([name, message]) => {
    form.elements[name]?.classList.add("invalid");
    const error = form.querySelector(`[data-error="${name}"]`);
    if (error) error.textContent = message;
  });
  form.querySelector(".invalid")?.focus();
}

function openClientForm(clientId = null) {
  const editing = state.clients.find((client) => client.id === clientId);
  const client = editing || { name: "", birth: "", sex: "", phone: "", passport: null };
  const sexOptions = ["", "Mujer", "Hombre", "No especificado"].map((value) => `<option value="${value}" ${client.sex === value ? "selected" : ""}>${value || "Selecciona una opción"}</option>`).join("");
  const content = `<form id="client-form" novalidate><div class="form-grid">
    <div class="form-section-title">Datos personales</div>
    ${field("name", "Nombre completo", "text", client.name, "", "full")}
    ${field("birth", "Fecha de nacimiento", "date", client.birth)}
    ${field("sex", "Sexo", "select", "", sexOptions)}
    ${field("phone", "Teléfono", "tel", client.phone)}
    <div class="field"><label>Identificador</label><input type="text" value="${editing ? esc(editing.id) : "Se asigna al guardar"}" disabled /><span class="field-error"></span></div>
    <div class="form-section-title">Pasaporte</div>
    ${field("passportNumber", "Número de pasaporte", "text", client.passport?.number || "", "", "", false)}
    ${field("passportIssue", "Fecha de expedición", "date", client.passport?.issue || "", "", "", false)}
    ${field("passportExpiry", "Fecha de expiración", "date", client.passport?.expiry || "", "", "", false)}
    <div class="form-actions"><button class="btn btn-secondary" type="button" data-close-modal>Cancelar</button><button class="btn btn-primary" type="submit">${editing ? "Guardar cambios" : "Registrar cliente"}</button></div>
  </div></form>`;
  openModal({ title: editing ? "Editar cliente" : "Registrar cliente", kicker: editing ? editing.id : "NUEVO CLIENTE", content, onReady: () => {
    const form = document.querySelector("#client-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form));
      const errors = validateClient(values);
      if (Object.keys(errors).length) return showErrors(form, errors);
      const passportUsed = values.passportNumber || values.passportIssue || values.passportExpiry;
      const record = {
        id: editing?.id || null,
        name: values.name.trim().replace(/\s+/g, " "),
        birth: values.birth,
        sex: values.sex,
        phone: values.phone,
        passport: passportUsed ? { number: values.passportNumber.trim().toUpperCase(), issue: values.passportIssue, expiry: values.passportExpiry } : null,
      };
      if (!(await saveAndReload("/api/clientes", record, form))) return;
      closeModal();
      toast(editing ? "Cliente actualizado" : "Cliente registrado", `${record.name} se guardó correctamente.`);
    });
  }});
}

function validateClient(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Escribe el nombre completo.";
  else if (!/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/.test(values.name.trim())) errors.name = "El nombre solo admite letras y espacios.";
  if (!values.birth) errors.birth = "Selecciona la fecha de nacimiento.";
  else if (values.birth > todayISO()) errors.birth = "La fecha no puede ser posterior a hoy.";
  if (!values.sex) errors.sex = "Selecciona una opción.";
  if (!/^\d{10}$/.test(values.phone)) errors.phone = "El teléfono debe tener exactamente 10 dígitos.";
  const hasAnyPassport = values.passportNumber || values.passportIssue || values.passportExpiry;
  if (hasAnyPassport) Object.assign(errors, validatePassport(values.passportNumber, values.passportIssue, values.passportExpiry));
  return errors;
}

function validatePassport(number, issue, expiry) {
  const errors = {};
  if (!number?.trim()) errors.passportNumber = "Captura el número de pasaporte.";
  if (!issue) errors.passportIssue = "Selecciona la fecha de expedición.";
  if (!expiry) errors.passportExpiry = "Selecciona la fecha de expiración.";
  if (issue && issue > todayISO()) errors.passportIssue = "La fecha de expedición no puede ser futura.";
  if (issue && expiry && issue >= expiry) errors.passportExpiry = "La expiración debe ser posterior a la expedición.";
  return errors;
}

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function openRequestForm(requestId = null, prefill = {}) {
  if (!state.clients.length) {
    toast("Primero registra un cliente", "Las solicitudes deben asociarse a un cliente existente.", "alert");
    return openClientForm();
  }
  const editing = state.requests.find((request) => request.id === requestId);
  const request = editing || { clientId: "", service: SERVICES[0], destination: "México", place: "", departure: "", returnDate: "", tripType: "Redondo", travelers: 1, ...prefill };
  const clientOptions = `<option value="">Selecciona un cliente</option>${state.clients.map((client) => `<option value="${esc(client.id)}" ${request.clientId === client.id ? "selected" : ""}>${esc(client.name)} · ${esc(client.phone)}</option>`).join("")}`;
  const countryOptions = COUNTRIES.map((country) => `<option value="${country}" ${request.destination === country ? "selected" : ""}>${country}</option>`).join("");
  const serviceOptions = SERVICES.map((service) => `<option value="${service}" ${request.service === service ? "selected" : ""}>${service}</option>`).join("");
  const tripOptions = ["Redondo", "Sencillo"].map((type) => `<option value="${type}" ${request.tripType === type ? "selected" : ""}>${type}</option>`).join("");
  const content = `<form id="request-form" novalidate><div class="form-grid">
    <div class="form-section-title">Cliente y destino</div>
    ${field("clientId", "Cliente", "select", "", clientOptions, "full")}
    ${field("service", "Servicio", "select", "", serviceOptions)}
    ${field("destination", "País de destino", "select", "", countryOptions)}
    ${field("place", "Ciudad o lugar", "text", request.place || "", "", "", false)}
    <div class="field"><label>Ámbito</label><input id="request-scope" type="text" value="${scopeFor(request.destination)}" disabled /><span class="field-error"></span></div>
    <div class="form-section-title">Detalles del viaje</div>
    ${field("departure", "Fecha de salida", "date", request.departure)}
    ${field("returnDate", "Fecha de regreso", "date", request.returnDate)}
    ${field("tripType", "Tipo de viaje", "select", "", tripOptions)}
    ${field("travelers", "Número de viajeros", "number", request.travelers)}
    ${field("price", "Precio total (MXN)", "number", request.price ?? "", "", "", false)}
    <div id="passport-requirement" class="field full"></div>
    <div class="form-actions"><button class="btn btn-secondary" type="button" data-close-modal>Cancelar</button><button class="btn btn-primary" type="submit">${editing ? "Guardar cambios" : "Registrar solicitud"}</button></div>
  </div></form>`;
  openModal({ title: editing ? "Editar solicitud" : "Nueva solicitud", kicker: editing ? editing.id : "SOLICITUD DE VIAJE", content, onReady: () => {
    const form = document.querySelector("#request-form");
    const update = () => updateRequestForm(form);
    ["destination", "clientId", "departure", "tripType"].forEach((name) => form.elements[name].addEventListener("change", update));
    update();
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const values = Object.fromEntries(new FormData(form));
      const errors = validateRequest(values);
      if (Object.keys(errors).length) return showErrors(form, errors);
      const selectedClient = state.clients.find((client) => client.id === values.clientId);
      // Si el viaje es internacional y faltaba pasaporte vigente, se envía el que se capturó en el formulario
      const needsPassport = scopeFor(values.destination) === "Internacional" && (!selectedClient.passport || selectedClient.passport.expiry < values.departure);
      const passport = needsPassport ? { number: values.passportNumber.trim().toUpperCase(), issue: values.passportIssue, expiry: values.passportExpiry } : null;
      const record = {
        id: editing?.id || null, clientId: values.clientId, service: values.service,
        destination: values.destination, place: values.place.trim().replace(/\s+/g, " "),
        departure: values.departure, returnDate: values.tripType === "Redondo" ? values.returnDate : "",
        tripType: values.tripType, travelers: Number(values.travelers), price: values.price ? Number(values.price) : null, status: editing?.status || "Pendiente",
      };
      const saved = await saveAndReload("/api/solicitudes", { ...record, passport }, form);
      if (!saved) return;
      closeModal();
      toast(editing ? "Solicitud actualizada" : "Solicitud registrada", `${saved.id} quedó ${record.status.toLowerCase()}.`);
    });
  }});
}

function updateRequestForm(form) {
  const destination = form.elements.destination.value;
  const client = state.clients.find((item) => item.id === form.elements.clientId.value);
  const departure = form.elements.departure.value;
  const international = scopeFor(destination) === "Internacional";
  form.querySelector("#request-scope").value = international ? "Internacional" : "Nacional";
  const returnField = form.elements.returnDate;
  const roundTrip = form.elements.tripType.value === "Redondo";
  returnField.disabled = !roundTrip;
  if (!roundTrip) returnField.value = "";
  const container = form.querySelector("#passport-requirement");
  if (!international) {
    container.innerHTML = '<p class="form-hint">Viaje nacional: no se requiere pasaporte.</p>';
  } else if (client?.passport && (!departure || client.passport.expiry >= departure)) {
    container.innerHTML = `<p class="form-hint"><strong>Pasaporte disponible:</strong> ${esc(client.passport.number)} · vigente hasta ${formatDate(client.passport.expiry)}. Se usará automáticamente.</p>`;
  } else {
    container.innerHTML = `<div class="form-grid"><div class="form-section-title">Pasaporte requerido</div><p class="form-hint warning">Este viaje es internacional. ${client?.passport ? "El pasaporte registrado no estará vigente para la fecha de salida." : "El cliente no tiene pasaporte registrado."}</p>${field("passportNumber", "Número de pasaporte", "text", client?.passport?.number || "")}${field("passportIssue", "Fecha de expedición", "date", client?.passport?.issue || "")}${field("passportExpiry", "Fecha de expiración", "date", client?.passport?.expiry || "")}</div>`;
  }
}

function validateRequest(values) {
  const errors = {};
  if (!values.clientId) errors.clientId = "Selecciona un cliente.";
  if (!values.service) errors.service = "Selecciona el servicio.";
  if (!values.destination) errors.destination = "Selecciona el país de destino.";
  if (values.place && values.place.trim().length > 60) errors.place = "El lugar admite máximo 60 caracteres.";
  if (!values.departure) errors.departure = "Selecciona la fecha de salida.";
  else if (values.departure < todayISO()) errors.departure = "La salida no puede ser anterior a hoy.";
  if (!values.tripType) errors.tripType = "Selecciona el tipo de viaje.";
  if (values.tripType === "Redondo" && !values.returnDate) errors.returnDate = "La fecha de regreso es obligatoria en viaje redondo.";
  else if (values.returnDate && values.departure && values.returnDate < values.departure) errors.returnDate = "El regreso no puede ser anterior a la salida.";
  if (!Number.isInteger(Number(values.travelers)) || Number(values.travelers) < 1) errors.travelers = "Escribe un entero mayor o igual a 1.";
  if (values.price && !(Number(values.price) > 0 && /^\d+(\.\d{1,2})?$/.test(values.price))) errors.price = "Escribe un precio mayor a 0, con máximo dos decimales.";
  const client = state.clients.find((item) => item.id === values.clientId);
  if (scopeFor(values.destination) === "Internacional" && (!client?.passport || client.passport.expiry < values.departure)) {
    Object.assign(errors, validatePassport(values.passportNumber, values.passportIssue, values.passportExpiry));
    if (values.passportExpiry && values.departure && values.passportExpiry < values.departure) errors.passportExpiry = "El pasaporte vencerá antes de la salida.";
  }
  return errors;
}

function openRequestDetail(requestId) {
  const request = state.requests.find((item) => item.id === requestId);
  if (!request) return;
  const client = clientFor(request);
  const international = scopeFor(request.destination) === "Internacional";
  // El empleado solo puede dejarla Pendiente o En proceso; confirmar y cancelar es del gerente.
  const allowed = can("Gerente") ? ["Pendiente", "En proceso", "Confirmada", "Cancelada"] : ["Pendiente", "En proceso"];
  const statusOptions = [...new Set([...allowed, request.status])].map((status) => `<option value="${status}" ${request.status === status ? "selected" : ""}>${status}</option>`).join("");
  document.querySelector("#drawer-content").innerHTML = `
    <header class="drawer-head"><div class="drawer-head-top"><div><p class="section-kicker">${esc(request.id)} · ${scopeFor(request.destination).toUpperCase()}</p><h2 id="drawer-title">${esc(destinationLabel(request))}</h2><p>${esc(client?.name || "Cliente")}</p></div><button class="icon-button" type="button" aria-label="Cerrar" data-close-drawer data-icon="close"></button></div></header>
    <div class="drawer-body">
      <section class="drawer-section"><div class="drawer-section-title"><h3>Datos del viaje</h3><span class="status-pill ${statusClass(request.status)}">${esc(request.status)}</span></div><div class="detail-grid">
        ${detail("Salida", formatDate(request.departure))}${detail("Regreso", formatDate(request.returnDate))}${detail("Tipo", request.tripType)}${detail("Viajeros", request.travelers)}${detail("Ámbito", scopeFor(request.destination))}${detail("País", request.destination)}${detail("Servicio", request.service || "Sin servicio")}
      </div></section>
      <section class="drawer-section"><div class="drawer-section-title"><h3>Cliente</h3><button class="text-button" type="button" data-view-client="${esc(client?.id || "")}">Ver cliente</button></div><div class="detail-grid">${detail("Nombre", client?.name)}${detail("Teléfono", client?.phone)}${detail("Nacimiento", formatDate(client?.birth))}${detail("Sexo", client?.sex)}</div></section>
      ${international ? `<section class="drawer-section"><div class="drawer-section-title"><h3>Pasaporte</h3></div><div class="detail-grid">${detail("Número", client?.passport?.number || "No registrado")}${detail("Expiración", formatDate(client?.passport?.expiry))}</div></section>` : ""}
      ${paymentSection(request)}
      <section class="drawer-section"><div class="drawer-section-title"><h3>Actualizar estado</h3></div><div class="status-control"><select id="detail-status">${statusOptions}</select><button class="btn btn-primary" type="button" data-save-status="${esc(request.id)}">Aplicar</button></div></section>
      <div class="drawer-actions"><button class="btn btn-secondary" type="button" data-edit-request="${esc(request.id)}"><span data-icon="edit"></span>Editar solicitud</button></div>
    </div>`;
  const layer = document.querySelector("#drawer-layer");
  layer.classList.add("open"); layer.setAttribute("aria-hidden", "false"); injectIcons(layer);
  loadPayments(request.id);
}

// Precio, pagos y factura de una solicitud (panel de detalle).
function paymentSection(request) {
  if (request.price === null) {
    return `<section class="drawer-section"><div class="drawer-section-title"><h3>Pago</h3></div><p class="form-hint">Registra el precio con "Editar solicitud" para poder recibir pagos.</p></section>`;
  }
  const balance = request.price - request.paid;
  const methodOptions = PAYMENT_METHODS.map((method) => `<option value="${esc(method)}">${esc(method)}</option>`).join("");
  return `<section class="drawer-section"><div class="drawer-section-title"><h3>Pago</h3>${request.invoice ? `<span class="status-pill status-confirmada">${esc(request.invoice)}</span>` : ""}</div>
    <div class="detail-grid">${detail("Precio", money(request.price))}${detail("Pagado", money(request.paid))}${detail("Saldo", money(balance))}</div>
    <div class="result-list payment-list" id="payment-list"></div>
    ${balance > 0 && request.status !== "Cancelada" ? `<form class="status-control payment-form" id="payment-form" novalidate>
      <select name="method">${methodOptions}</select>
      <input name="amount" type="number" min="0.01" step="0.01" placeholder="Monto" value="${balance.toFixed(2)}" />
      <button class="btn btn-primary" type="submit">Registrar pago</button>
    </form>` : ""}
    ${balance <= 0 ? `<button class="btn btn-danger invoice-button" type="button" data-invoice="${esc(request.id)}">Imprimir factura (PDF)</button>` : ""}
  </section>`;
}

async function loadPayments(requestId) {
  const list = document.querySelector("#payment-list");
  if (!list) return;
  try {
    const payments = await api(`/api/solicitudes/${requestId}/pagos`);
    list.innerHTML = payments.map((payment) => `<div class="result-item"><span class="result-icon" data-icon="check"></span><div><h4>${money(payment.amount)} · ${esc(payment.method)}</h4><p>${esc(payment.date.slice(0, 16))} · ${esc(payment.user)}</p></div></div>`).join("");
    injectIcons(list);
  } catch (error) {
    list.innerHTML = `<p class="form-hint warning">${esc(error.message)}</p>`;
  }
  const form = document.querySelector("#payment-form");
  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = Number(form.elements.amount.value);
    if (!(amount > 0)) return toast("Monto no válido", "Escribe un monto mayor a 0.", "alert");
    if (await saveAndReload("/api/pagos", { requestId, method: form.elements.method.value, amount }, form)) {
      openRequestDetail(requestId);
      toast("Pago registrado", `${money(amount)} en ${requestId}.`);
    }
  });
}

function openClientDetail(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  if (!client) return;
  const requests = state.requests.filter((request) => request.clientId === client.id);
  document.querySelector("#drawer-content").innerHTML = `
    <header class="drawer-head"><div class="drawer-head-top"><div><p class="section-kicker">${esc(client.id)} · CLIENTE</p><h2 id="drawer-title">${esc(client.name)}</h2><p>${requests.length} ${requests.length === 1 ? "solicitud registrada" : "solicitudes registradas"}</p></div><button class="icon-button" type="button" aria-label="Cerrar" data-close-drawer data-icon="close"></button></div></header>
    <div class="drawer-body">
      <section class="drawer-section"><div class="drawer-section-title"><h3>Datos personales</h3></div><div class="detail-grid">${detail("Teléfono", client.phone)}${detail("Nacimiento", formatDate(client.birth))}${detail("Sexo", client.sex)}${detail("Identificador", client.id)}</div></section>
      <section class="drawer-section"><div class="drawer-section-title"><h3>Pasaporte</h3></div><div class="detail-grid">${detail("Número", client.passport?.number || "Sin registrar")}${detail("Expiración", formatDate(client.passport?.expiry))}</div></section>
      <section class="drawer-section"><div class="drawer-section-title"><h3>Viajes solicitados</h3></div>${requests.length ? `<div class="result-list">${requests.map((request) => `<div class="result-item"><span class="result-icon" data-icon="map"></span><div><h4>${esc(destinationLabel(request))}</h4><p>${esc(request.service || "Sin servicio")} · ${formatDate(request.departure)} · ${esc(request.status)}</p></div><button class="row-action" type="button" data-view-request="${esc(request.id)}" data-icon="chevron"></button></div>`).join("")}</div>` : '<div class="empty-state"><p>Aún no tiene solicitudes.</p></div>'}</section>
      <div class="drawer-actions"><button class="btn btn-primary" type="button" data-edit-client="${esc(client.id)}"><span data-icon="edit"></span>Editar cliente</button><button class="btn btn-secondary" type="button" data-new-request-client="${esc(client.id)}">Nueva solicitud</button></div>
    </div>`;
  const layer = document.querySelector("#drawer-layer");
  layer.classList.add("open"); layer.setAttribute("aria-hidden", "false"); injectIcons(layer);
}

function detail(label, value) {
  return `<div class="detail-item"><span>${label}</span><strong>${esc(value ?? "—")}</strong></div>`;
}

function toast(title, message, icon = "check") {
  const element = document.createElement("div");
  element.className = "toast";
  element.innerHTML = `<span class="toast-icon">${icons[icon] || icons.check}</span><div><strong>${esc(title)}</strong><span>${esc(message)}</span></div>`;
  document.querySelector("#toast-stack").appendChild(element);
  setTimeout(() => element.remove(), 3600);
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-page]");
  if (nav) navigate(nav.dataset.page);
  const link = event.target.closest("[data-page-link]");
  if (link) navigate(link.dataset.pageLink);
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "new-client") openClientForm();
  if (action === "new-request") openRequestForm();
  if (event.target.closest("[data-close-modal]")) closeModal();
  if (event.target.closest("[data-close-drawer]")) closeDrawer();
  const requestView = event.target.closest("[data-view-request]")?.dataset.viewRequest;
  if (requestView) openRequestDetail(requestView);
  const clientView = event.target.closest("[data-view-client]")?.dataset.viewClient;
  if (clientView) openClientDetail(clientView);
  const clientEdit = event.target.closest("[data-edit-client]")?.dataset.editClient;
  if (clientEdit) { closeDrawer(); openClientForm(clientEdit); }
  const requestEdit = event.target.closest("[data-edit-request]")?.dataset.editRequest;
  if (requestEdit) { closeDrawer(); openRequestForm(requestEdit); }
  const newForClient = event.target.closest("[data-new-request-client]")?.dataset.newRequestClient;
  if (newForClient) { closeDrawer(); openRequestForm(); setTimeout(() => { const select = document.querySelector("#request-form [name=clientId]"); if (select) { select.value = newForClient; select.dispatchEvent(new Event("change")); } }, 20); }
  const statusId = event.target.closest("[data-save-status]")?.dataset.saveStatus;
  if (statusId) {
    const status = document.querySelector("#detail-status").value;
    saveAndReload(`/api/solicitudes/${statusId}/estado`, { estado: status }).then((ok) => {
      if (ok) { openRequestDetail(statusId); toast("Estado actualizado", `${statusId} ahora está ${status.toLowerCase()}.`); }
    });
  }
  const promo = event.target.closest("[data-promo]")?.dataset.promo;
  if (promo !== undefined) {
    const { service, place } = state.promotions.find((item) => String(item.id) === promo);
    openRequestForm(null, { service, place, destination: "México" });
  }
  const invoiceId = event.target.closest("[data-invoice]")?.dataset.invoice;
  if (invoiceId) {
    saveAndReload(`/api/solicitudes/${invoiceId}/factura`, {}).then((result) => {
      if (!result) return;
      window.open(result.url, "_blank");
      openRequestDetail(invoiceId);
      toast("Factura lista", "Se abrió el PDF en el navegador para imprimirlo o guardarlo.");
    });
  }
  const slide = event.target.closest("[data-slide]")?.dataset.slide;
  if (slide !== undefined) moveCarousel(Number(slide));
  if (event.target.closest("[data-carousel=prev]")) moveCarousel(carouselIndex - 1);
  if (event.target.closest("[data-carousel=next]")) moveCarousel(carouselIndex + 1);
  if (action === "new-promotion") openPromotionForm();
  if (action === "new-user") openUserForm();
  const togglePromo = event.target.closest("[data-toggle-promo]")?.dataset.togglePromo;
  if (togglePromo) saveAndReload(`/api/promociones/${togglePromo}/activa`, {});
  const editPromo = event.target.closest("[data-edit-promo]")?.dataset.editPromo;
  if (editPromo) openPromotionForm(state.promotions.find((item) => String(item.id) === editPromo));
  const deletePromo = event.target.closest("[data-delete-promo]")?.dataset.deletePromo;
  if (deletePromo && confirm("¿Eliminar esta promoción? Esta acción no se puede deshacer.")) {
    saveAndReload(`/api/promociones/${deletePromo}/eliminar`, {}).then((ok) => ok && toast("Promoción eliminada", "Ya no aparece en el carrusel."));
  }
  const editUser = event.target.closest("[data-edit-user]")?.dataset.editUser;
  if (editUser) openUserForm(usersCache.find((item) => String(item.id) === editUser));
  const deleteUser = event.target.closest("[data-delete-user]")?.dataset.deleteUser;
  if (deleteUser && confirm("¿Eliminar este usuario? Esta acción no se puede deshacer.")) {
    saveAndReload(`/api/usuarios/${deleteUser}/eliminar`, {}).then((ok) => { if (ok) { renderUsers(); toast("Usuario eliminado", "Ya no puede entrar al sistema."); } });
  }
  const toggleUser = event.target.closest("[data-toggle-user]")?.dataset.toggleUser;
  if (toggleUser) saveAndReload(`/api/usuarios/${toggleUser}/activo`, {}).then((ok) => ok && renderUsers());
  // Panel del perfil: se abre con el botón y se cierra al hacer clic fuera
  if (event.target.closest("#profile-toggle")) toggleProfileMenu();
  else if (!event.target.closest("#profile-menu")) toggleProfileMenu(false);
  const profileAction = event.target.closest("[data-profile]")?.dataset.profile;
  if (profileAction) {
    toggleProfileMenu(false);
    if (profileAction === "edit") toast(session.usuario.nombre, `Usuario: ${session.usuario.usuario} · Rol: ${session.usuario.rol}`, "user");
    if (profileAction === "help") toast("Magno Tours · Actopan", `${AGENCY.address}. Usa el menú lateral para explorar clientes y solicitudes.`, "sparkles");
    if (profileAction === "logout") setLoggedOut(true);
  }
  if (event.target.closest("#chat-toggle")) toggleChat();
  if (event.target.closest("[data-close-chat]")) toggleChat(false);
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    requestFilter = filter.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.toggle("active", button === filter));
    renderRequests(); injectIcons(document.querySelector("#page-requests"));
  }
});

document.querySelector("#login-form").addEventListener("submit", (event) => { event.preventDefault(); login(event.target); });
// Chat con el asistente virtual: guarda la conversación mientras la ventana esté abierta.
const chatHistory = [];
// Muestra **negritas** y saltos de línea de la respuesta sin permitir HTML.
function chatFormat(text) {
  return esc(text).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
}
function addChatBubble(role, text) {
  const bubble = document.createElement("div");
  bubble.className = `chat-bubble ${role === "user" ? "from-user" : ""}`;
  bubble.innerHTML = `<p>${chatFormat(text)}</p>`;
  const body = document.querySelector(".chat-body");
  body.appendChild(bubble);
  body.scrollTop = body.scrollHeight;
  return bubble;
}
document.querySelector("#chat-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const input = form.querySelector("input");
  const question = input.value.trim();
  if (!question) return;
  input.value = "";
  addChatBubble("user", question);
  chatHistory.push({ role: "user", content: question });
  const waiting = addChatBubble("assistant", "Escribiendo…");
  form.querySelector("button").disabled = true;
  try {
    const { texto, solicitud, cliente } = await api("/api/chat", { mensajes: chatHistory });
    waiting.querySelector("p").innerHTML = chatFormat(texto);
    chatHistory.push({ role: "assistant", content: texto });
    if (solicitud || cliente) await loadData();
    if (cliente) toast("Cliente registrado", `El asistente registró a ${cliente}.`);
    if (solicitud) toast("Solicitud registrada", `El asistente creó ${solicitud}.`);
  } catch (error) {
    waiting.querySelector("p").textContent = error.message;
    chatHistory.pop(); // la pregunta sin respuesta no se guarda
  } finally {
    form.querySelector("button").disabled = false;
    input.focus();
  }
});
document.querySelector("#client-search").addEventListener("input", () => { renderClients(); injectIcons(document.querySelector("#page-clients")); });
document.querySelector("#request-search").addEventListener("input", () => { renderRequests(); injectIcons(document.querySelector("#page-requests")); });
document.querySelector("#global-search").addEventListener("input", () => { renderSearch(); injectIcons(document.querySelector("#page-search")); });
document.querySelector("#help-button").addEventListener("click", () => toast("Magno Tours · Actopan", `${AGENCY.address}. Usa el menú lateral para explorar clientes y solicitudes.`, "sparkles"));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") { closeModal(); closeDrawer(); toggleChat(false); toggleProfileMenu(false); }
});

// Menú lateral: se arrastra su borde derecho para cambiar el ancho (se recuerda en este equipo).
const SIDEBAR_MIN = 180, SIDEBAR_MAX = 360;
function setSidebarWidth(width) {
  const value = Math.min(SIDEBAR_MAX, Math.max(SIDEBAR_MIN, Math.round(width)));
  document.documentElement.style.setProperty("--sidebar-w", `${value}px`);
  return value;
}
try { const saved = Number(localStorage.getItem("magno-sidebar-width")); if (saved) setSidebarWidth(saved); } catch (_) {}
document.querySelector("#sidebar-resizer").addEventListener("pointerdown", (event) => {
  event.preventDefault();
  document.body.classList.add("resizing");
  let width = 0;
  const move = (e) => { width = setSidebarWidth(e.clientX); };
  const stop = () => {
    document.body.classList.remove("resizing");
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
    try { if (width) localStorage.setItem("magno-sidebar-width", width); } catch (_) {}
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop);
});
document.querySelector("#sidebar-resizer").addEventListener("dblclick", () => {
  setSidebarWidth(232);
  try { localStorage.removeItem("magno-sidebar-width"); } catch (_) {}
});

// Botón de tres rayas: contrae el menú a solo íconos (se recuerda en este equipo).
function setSidebarCollapsed(collapsed) {
  document.body.classList.toggle("sidebar-collapsed", collapsed);
  document.querySelector("#sidebar-toggle").setAttribute("aria-expanded", String(!collapsed));
  document.querySelectorAll(".sidebar .nav-item").forEach((item) => { item.title = collapsed ? item.textContent.replace(/\d+/g, "").trim() : ""; });
  try { localStorage.setItem("magno-sidebar-collapsed", collapsed ? "1" : ""); } catch (_) {}
}
try { if (localStorage.getItem("magno-sidebar-collapsed")) setSidebarCollapsed(true); } catch (_) {}
document.querySelector("#sidebar-toggle").addEventListener("click", () => setSidebarCollapsed(!document.body.classList.contains("sidebar-collapsed")));

setToday();
renderProfile();
renderAll();
injectIcons();
if (session) loadData().catch(() => setLoggedOut(true));
else setLoggedOut(true);
setTimeout(hideSplash, SPLASH_MS);
