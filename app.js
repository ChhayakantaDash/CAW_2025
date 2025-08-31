// Data modules
const agendaItems = [
  {
    time: "6th Sep, 2:00PM - 5:00PM (OFFLINE)",
    title: "Inaugural Ceremony & Foundational Tech",
    desc: "Inaugural address, Operating Systems, Essential Developer Tools, LinkedIn Optimisation, and Engineering Roadmap."
  },

  {
    time: "7th Sep, 7:00PM - 8:30PM (ONLINE)",
    title: "Introduction to Coding & OOP",
    
    desc: "History of programming languages (C/C++, Java, Python) and Object-Oriented Programming concepts. "
  },
  {
    time: "8th Sep, 7:00PM - 8:30PM (ONLINE)",
    title: "Web Development & UI/UX",
    desc: "Exploring Frontend, Backend, Full-Stack development, and UI/UX design principles and tools. "
  },
  {
    time: "9th Sep, 7:00PM - 8:30PM (ONLINE)",
    title: "Data & AI Horizons",
    desc: "Diving into Data Science, Data Analytics, Machine Learning, and Deep Learning. "
  },
  {
    time: "10th Sep, 7:00PM - 8:30PM (ONLINE)",
    title: "Mobile App Development",
    desc: "Overview of mobile app development, Kotlin, cross-platform with React Native, and career scope. "
  },
  {
    time: "10th Sep, 7:00PM - 8:30PM (ONLINE)",
    title: "Cybersecurity & Future of AI",
    desc: "Covering Cybersecurity, Online Safety, Generative AI, and Agentic AI. "
  },
  {
    time: "12th Sep, 7:00PM - 8:30PM (ONLINE)",
    title: "DevOps & Cloud Computing",
    desc: "Understanding DevOps, CI/CD pipelines, and an introduction to major cloud platforms. "
  },
  {
    time: "13th Sep, 2:00PM - 5:00PM (OFFLINE)",
    title: "Hardware, IoT & Closing Ceremony",
    desc: "Sessions on Computer Hardware, IoT, Soft Skills workshop, a final quiz, Q&A, and the Valedictory Ceremony with prize distribution."
  }
];

const speakers = [
  { name: "OMKAR PADHY", role: "Workshop Tutor", topic: "Programming Languages,IOT Generative AI" },
  { name: "SUBHAM CHOUDHURY", role: "Workshop Tutor", topic: "Operating Systems, DevOps & IoT" },
  { name: "SUBHASHREE PANDA", role: "Workshop Tutor", topic: "Data Science AND Data Analytics" },
  { name: "DEBASISH SAHU", role: "Workshop Tutor", topic: "Machine Learning, Online Safety & Soft Skills" },
  { name: "BIKASH RANJAN HOTA", role: "Workshop Tutor", topic: "Developer Tools, Mobile APP Dev & Cloud Computing" },
  { name: "SARTHAK MISHRA", role: "Workshop Tutor", topic: "Mobile & Cloud Development" },
  { name: "ANISHA PARIDA", role: "Workshop Tutor", topic: "Programming in C/C++, Java, Python & OOPs" },
  { name: "BAIBHAB SAHU", role: "Workshop Tutor", topic: "LinkedIn Optimization Tips" },
  { name: "CHHAYAKANTA DASH", role: "Workshop Tutor", topic: "Agentic AI" },
  { name: "PRANJAL PANDA", role: "Workshop Tutor", topic: "Deep Learning" },
  { name: "SWAGAT PRASAD NANDA", role: "Workshop Tutor", topic: "Engineering Roadmap, Frontend Development ,Backend Development,Full Stack Development: Scope & Opertunity,UI/UX Design & Tools,Computer Hardware" },
  { name: "SHUBHAM RANJAN SAHOO", role: "Workshop Tutor", topic: "Cybersecurity" }
];

const partners = [
  "Coding Design And Development Club (CDD)",
  "Startup innovation Cell(SIC)",
  "Idea & Innovation Cell(IIC)",
  
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


