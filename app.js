// Data modules
const agendaItems = [
  { time: "09:30", title: "Check-in & Welcome", desc: "Grab your badge, meet peers, opening remarks." },
  { time: "10:00", title: "Coding Fundamentals", desc: "Variables, control flow, problem-solving exercises." },
  { time: "11:30", title: "Web in 60 minutes", desc: "HTML, CSS, JS quickstart; build a mini page." },
  { time: "13:00", title: "Lunch & Networking", desc: "Refuel and connect with clubs and mentors." },
  { time: "14:00", title: "Startup Tech 101", desc: "How startups use code to validate ideas fast." },
  { time: "15:30", title: "Guided Labs", desc: "Hands-on lab time with mentors and Q&A." },
  { time: "17:00", title: "Demos & Wrap-up", desc: "Share what you built; prizes and next steps." }
];

const speakers = [
  { name: "Ayesha Khan", role: "Software Engineer, CDD Club", topic: "From Zero to First Script" },
  { name: "Ravi Desai", role: "Founder, DevLaunch", topic: "Prototyping Faster" },
  { name: "Meera Patel", role: "Data Scientist", topic: "AI Basics without Jargon" },
  { name: "Arjun Rao", role: "CTO, SeedStart", topic: "Startup Tech Choices" }
];

const partners = [
  "CDD Club",
  "Startup Club",
  "Innovation Hub",
  "Tech Sponsors"
];

// DOM helpers
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// Render modules
function renderAgenda(listEl, items) {
  listEl.innerHTML = items.map(item => `
    <article class="card">
      <div class="meta" style="margin-bottom:6px"><strong>${item.time}</strong></div>
      <h3 style="margin:4px 0 6px">${item.title}</h3>
      <p style="margin:0;color:var(--muted)">${item.desc}</p>
    </article>
  `).join("");
}

function renderSpeakers(listEl, people) {
  listEl.innerHTML = people.map(p => `
    <article class="card">
      <h3 style="margin:0 0 4px">${p.name}</h3>
      <p style="margin:0;color:var(--muted)">${p.role}</p>
      <p style="margin:8px 0 0"><strong>Topic:</strong> ${p.topic}</p>
    </article>
  `).join("");
}

function renderPartners(listEl, orgs) {
  listEl.innerHTML = orgs.map(o => `<li>${o}</li>`).join("");
}

// Nav interactions
function setupNav() {
  const toggle = $(".nav-toggle");
  const list = $("#nav-list");
  if (!toggle || !list) return;
  toggle.addEventListener("click", () => {
    const open = list.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  // Close menu on link click (mobile)
  $$("#nav-list a").forEach(a => a.addEventListener("click", () => {
    list.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }));
}

// Smooth scroll with offset for sticky header
function setupSmoothScroll() {
  $$("a[href^='#']").forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}

// Register click -> open Voiceflow chat
function setupRegisterButtons() {
  const openChat = () => {
    if (window.voiceflow && window.voiceflow.chat && typeof window.voiceflow.chat.open === 'function') {
      window.voiceflow.chat.open();
    } else {
      alert('Chat is loading. Please try again in a moment.');
    }
  };
  $$('[data-action="register"]').forEach(btn => btn.addEventListener('click', openChat));
}

// Mount
document.addEventListener("DOMContentLoaded", () => {
  renderAgenda(document.getElementById("agenda-list"), agendaItems);
  renderSpeakers(document.getElementById("speakers-list"), speakers);
  renderPartners(document.getElementById("partners-list"), partners);
  setupNav();
  setupSmoothScroll();
  setupRegisterButtons();
});


