import { useState, useRef, useCallback } from "react";

/* ─── FULL CV DATA ─── */
const initialData = {
  name: "Maximiliano Céspedes",
  headline: "Senior Frontend Engineer / Senior Product Engineer (Frontend)",
  location: "Rijswijk, The Netherlands",
  links: {
    linkedin: "https://linkedin.com/in/neomaxzero",
    github: "https://github.com/neomaxzero",
    portfolio: "https://m4x.io",
  },
  summary:
    "Senior Frontend Engineer with 12+ years of experience building and scaling high-impact web platforms in cloud storage, fintech, and e-commerce. Strong in Next.js/React architecture, performance engineering, experimentation, accessibility, and design systems. Led major migrations and reliability initiatives with measurable impact on user journeys and business outcomes. Seeking Senior Frontend Engineer / Senior Product Engineer roles focused on frontend and product delivery.",
  coreCompetencies: [
    "Frontend Architecture (React, Next.js, TypeScript)",
    "Product Delivery & Iteration (cross-functional collaboration, stakeholder alignment)",
    "Performance Optimization (Core Web Vitals, Lighthouse, profiling)",
    "Experimentation & Analytics (GrowthBook, GA4, Amplitude, A/B testing)",
    "Design Systems (tokens, component libraries, governance, adoption)",
    "Reliability & Observability (SLIs/SLOs, alerting, monitoring)",
    "Testing (Playwright, Jest, Cypress)",
    "Accessibility (a11y, semantic HTML, Lighthouse/WCAG-oriented improvements)",
    "State & Data (Redux, Zustand, React Query)",
    "Platform & Deployment (Cloudflare Workers, Docker, Kubernetes, CI/CD)",
  ],
  skills: [
    "TypeScript","JavaScript","React","Next.js","React Native","Node.js",
    "React Query","Redux","Zustand","Design Systems","Web Performance",
    "Core Web Vitals","Accessibility (a11y)","Lighthouse","A/B Testing",
    "GrowthBook","Google Analytics 4 (GA4)","Amplitude","Observability",
    "Prometheus","Grafana","Datadog RUM","Cloudflare Workers","Docker",
    "Kubernetes","AWS","Supabase","CI/CD","Playwright","Jest","Cypress",
  ],
  projects: [
    {
      id: "stepcraft",
      name: "Stepcraft",
      url: "https://stepcraft.app",
      type: "Startup / Side Project",
      highlights: [
        "Step-based RPG mobile game with community-driven iteration.",
        "600 active users and 1,100 Discord members.",
      ],
      tech: ["React Native", "Supabase", "Vercel"],
    },
    {
      id: "tike",
      name: "Tike",
      url: "https://tike.com.ar",
      type: "Startup / Side Project",
      highlights: [
        "Ticketing platform concept: event listings, checkout, admin tooling, and scanning workflows.",
      ],
      tech: ["Next.js", "React", "TypeScript"],
    },
  ],
  experience: [
    {
      id: "stepcraft-exp",
      company: "Stepcraft",
      role: "Co-Founder / Product Engineer (Frontend)",
      startDate: "2025-08",
      endDate: "Present",
      location: "The Netherlands",
      bullets: [
        "Co-founded Stepcraft, a step-based RPG mobile game built with React Native, Supabase, and Vercel.",
        "Owned frontend delivery and contributed to game design and iteration loops based on user feedback.",
        "Grew early traction to 600 active users and a Discord community of 1,100 members.",
      ],
    },
    {
      id: "creative-fabrica",
      company: "Creative Fabrica",
      role: "Senior Frontend Engineer",
      startDate: "2025-02",
      endDate: "2026-02",
      location: "The Netherlands",
      bullets: [
        "Led migration of the My Accounts application from WordPress to Next.js, using Cloudflare Workers, A/B testing, and performance monitoring to maintain stable business and engagement metrics.",
        "Led Marketplace Design System initiative: launched live documentation, versioned component packages, governance, and adoption metrics; migrated top 10 core components and the design token system to improve consistency and development speed.",
        "Implemented Prometheus metrics and Grafana dashboards for a self-hosted Next.js cluster; introduced frontend success/latency metrics, SLOs, and automated alerting to improve reliability and incident response.",
        "Reduced Kubernetes cluster costs by 4x+ annually by building multi-platform Docker images, migrating workloads AMD64 → ARM64, improving autoscaling rules, and reducing pod resource consumption via caching and right-sizing.",
      ],
    },
    {
      id: "wetransfer",
      company: "WeTransfer",
      role: "Senior Frontend Engineer II",
      startDate: "2021-10",
      endDate: "2025-02",
      location: "The Netherlands",
      bullets: [
        "Improved and scaled the upload user journey, supporting a reliable experience for 90M+ monthly users.",
        "Planned and executed migration of wetransfer.com from a Ruby monolith-served SPA to a Next.js whole-site delivery stack.",
        "Introduced frontend observability and defined SLIs/SLOs with SRE; improved MTTD from ~2 hours to ~11 minutes for core user journeys.",
        "Rolled out a new uploader library to the Transfer app, improving upload performance by 3.5% and raising large-file success rate from 93.43% to 95.07%.",
        "Led frontend implementation of company-wide pricing/packaging changes, introducing five new tiers across multiple countries.",
        "Implemented Workspaces feature, driving a 94.3% quarter-over-quarter increase in net seats added.",
      ],
    },
    {
      id: "coolblue",
      company: "Coolblue",
      role: "Senior Frontend Engineer",
      startDate: "2018-01",
      endDate: "2021-01",
      location: "The Netherlands",
      bullets: [
        "Built and optimized UI for search and product pages serving 10M+ monthly users.",
        "Improved performance and UX quality in collaboration with product/design/data teams.",
        "Created React apps used by hundreds of internal specialists; mentored 5 new frontend developers on internal tooling/framework.",
        "Led web performance taskforce: introduced Datadog RUM and trained teams on performance metrics and monitoring best practices.",
        "Led E2E testing platform migration to Cypress and delivered enablement/training.",
      ],
    },
    {
      id: "intive-lead",
      company: "Intive-FDV",
      role: "Technical Lead Frontend",
      startDate: "2017-01",
      endDate: "2018-01",
      location: "Argentina",
      bullets: [
        "Led rebuild of a suite of 12 single-page applications from the ground up.",
        "Managed a team of 13 frontend developers and maintained a shared UI component library across products.",
        "Defined and documented architecture guidelines to ensure scalability, consistency, and best practices.",
      ],
    },
    {
      id: "intive-fe",
      company: "Intive-FDV",
      role: "Frontend Engineer",
      startDate: "2016-01",
      endDate: "2017-01",
      location: "Argentina",
      bullets: [
        "Redesigned core platform routing, state management, and bundling to improve maintainability and scalability.",
        "Refactored project structure to support new scalability requirements.",
      ],
    },
    {
      id: "telectronica",
      company: "Telectronica",
      role: "Full Stack Developer",
      startDate: "2014-01",
      endDate: "2016-01",
      location: "Argentina",
      bullets: [
        "Maintained and enhanced Silverlight/ASP.NET web applications.",
        "Delivered on-site platform setup and training across Argentina, Brazil, Peru, Chile, and Uruguay.",
      ],
    },
  ],
  education: [
    {
      id: "utn",
      institution: "Universidad Tecnológica Nacional (Argentina)",
      degree: "Information Systems Engineer",
      startDate: "2008",
      endDate: "2014",
      location: "Argentina",
    },
  ],
  languages: [
    { name: "Spanish", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "Dutch", level: "Basic" },
  ],
};

const uid = () => Math.random().toString(36).slice(2, 9);

/* ─── ICONS ─── */
const Icon = ({ d, size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);
const ChevDown = () => <Icon d="M6 9l6 6 6-6" />;
const ChevRight = () => <Icon d="M9 18l6-6-6-6" />;
const Trash2 = () => <Icon d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" size={14} />;
const PlusIcon = () => <Icon d="M12 5v14M5 12h14" size={14} />;
const ArrowUp = () => <Icon d="M12 19V5m-7 7l7-7 7 7" size={13} />;
const ArrowDn = () => <Icon d="M12 5v14m7-7l-7 7-7-7" size={13} />;

/* ─── Collapsible ─── */
function Section({ title, children, defaultOpen = true, count }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: 4 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex", alignItems: "center", gap: 6, width: "100%", textAlign: "left",
          background: "none", border: "none", cursor: "pointer",
          padding: "10px 0", color: "#c8ccd0", fontSize: 11, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "1.5px", fontFamily: "inherit",
        }}
      >
        <span style={{ opacity: 0.5 }}>{open ? <ChevDown /> : <ChevRight />}</span>
        {title}
        {count !== undefined && (
          <span style={{
            marginLeft: "auto", background: "#2a3040", color: "#8892a4",
            fontSize: 10, padding: "2px 8px", borderRadius: 10,
          }}>{count}</span>
        )}
      </button>
      {open && <div style={{ paddingLeft: 2 }}>{children}</div>}
    </div>
  );
}

/* ─── Input ─── */
function Field({ label, value, onChange, multiline, rows = 2, mono }) {
  const shared = {
    width: "100%", background: "#1e2330", border: "1px solid #2d3548",
    borderRadius: 6, padding: "8px 10px", fontSize: 13, color: "#e0e4ea",
    outline: "none", fontFamily: mono ? "'DM Mono', monospace" : "inherit",
    lineHeight: 1.5, resize: "vertical", boxSizing: "border-box",
  };
  return (
    <label style={{ display: "block", marginBottom: 10 }}>
      {label && <span style={{ display: "block", fontSize: 10, color: "#6b7a8d", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>}
      {multiline
        ? <textarea style={shared} rows={rows} value={value} onChange={e => onChange(e.target.value)} />
        : <input style={shared} value={value} onChange={e => onChange(e.target.value)} />
      }
    </label>
  );
}

/* ─── Small button ─── */
function SmBtn({ onClick, children, danger, style: extraStyle }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? "#2a3040" : "none", border: "none", cursor: "pointer", padding: 4, borderRadius: 4,
        color: danger ? "#e5534b" : "#6b7a8d", display: "flex", alignItems: "center",
        ...extraStyle,
      }}
    >
      {children}
    </button>
  );
}

function AddBtn({ onClick, children }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", alignItems: "center", gap: 4,
        background: hover ? "rgba(90, 156, 245, 0.08)" : "none",
        border: "1px dashed #2d3548", borderRadius: 6, padding: "6px 12px",
        color: "#5a9cf5", fontSize: 12, cursor: "pointer", fontFamily: "inherit",
        fontWeight: 500, width: "100%", justifyContent: "center",
      }}
    >
      <PlusIcon /> {children}
    </button>
  );
}

/* ─── Card wrapper ─── */
function Card({ children, header, onRemove, onMoveUp, onMoveDown }) {
  return (
    <div style={{
      background: "#1e2330", border: "1px solid #2d3548", borderRadius: 8,
      padding: 14, marginBottom: 10,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 12, fontWeight: 600, color: "#a0aab8", maxWidth: "60%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{header}</span>
        <div style={{ display: "flex", gap: 2 }}>
          {onMoveUp && <SmBtn onClick={onMoveUp}><ArrowUp /></SmBtn>}
          {onMoveDown && <SmBtn onClick={onMoveDown}><ArrowDn /></SmBtn>}
          {onRemove && <SmBtn onClick={onRemove} danger><Trash2 /></SmBtn>}
        </div>
      </div>
      {children}
    </div>
  );
}

/* ─── FORM PANEL ─── */
function FormPanel({ data, setData }) {
  const u = (k, v) => setData(d => ({ ...d, [k]: v }));
  const uLink = (k, v) => setData(d => ({ ...d, links: { ...d.links, [k]: v } }));

  const uExp = (i, k, v) => setData(d => {
    const e = [...d.experience]; e[i] = { ...e[i], [k]: v }; return { ...d, experience: e };
  });
  const uBullet = (ei, bi, v) => setData(d => {
    const e = [...d.experience]; const b = [...e[ei].bullets]; b[bi] = v;
    e[ei] = { ...e[ei], bullets: b }; return { ...d, experience: e };
  });
  const addBullet = (ei) => setData(d => {
    const e = [...d.experience]; e[ei] = { ...e[ei], bullets: [...e[ei].bullets, ""] };
    return { ...d, experience: e };
  });
  const rmBullet = (ei, bi) => setData(d => {
    const e = [...d.experience]; e[ei] = { ...e[ei], bullets: e[ei].bullets.filter((_, i) => i !== bi) };
    return { ...d, experience: e };
  });
  const addExp = () => setData(d => ({
    ...d, experience: [...d.experience, { id: uid(), company: "", role: "", startDate: "", endDate: "", location: "", bullets: [""] }]
  }));
  const rmExp = i => setData(d => ({ ...d, experience: d.experience.filter((_, j) => j !== i) }));
  const moveExp = (i, dir) => setData(d => {
    const e = [...d.experience]; const t = i + dir;
    if (t < 0 || t >= e.length) return d;
    [e[i], e[t]] = [e[t], e[i]]; return { ...d, experience: e };
  });

  const uEdu = (i, k, v) => setData(d => {
    const e = [...d.education]; e[i] = { ...e[i], [k]: v }; return { ...d, education: e };
  });
  const addEdu = () => setData(d => ({ ...d, education: [...d.education, { id: uid(), institution: "", degree: "", startDate: "", endDate: "", location: "" }] }));
  const rmEdu = i => setData(d => ({ ...d, education: d.education.filter((_, j) => j !== i) }));

  const uProj = (i, k, v) => setData(d => {
    const p = [...d.projects]; p[i] = { ...p[i], [k]: v }; return { ...d, projects: p };
  });
  const uProjHL = (pi, hi, v) => setData(d => {
    const p = [...d.projects]; const h = [...p[pi].highlights]; h[hi] = v;
    p[pi] = { ...p[pi], highlights: h }; return { ...d, projects: p };
  });
  const addProj = () => setData(d => ({ ...d, projects: [...d.projects, { id: uid(), name: "", url: "", type: "", highlights: [""], tech: [] }] }));
  const rmProj = i => setData(d => ({ ...d, projects: d.projects.filter((_, j) => j !== i) }));

  const uLang = (i, k, v) => setData(d => {
    const l = [...d.languages]; l[i] = { ...l[i], [k]: v }; return { ...d, languages: l };
  });
  const addLang = () => setData(d => ({ ...d, languages: [...d.languages, { name: "", level: "" }] }));
  const rmLang = i => setData(d => ({ ...d, languages: d.languages.filter((_, j) => j !== i) }));

  const uComp = (i, v) => setData(d => { const c = [...d.coreCompetencies]; c[i] = v; return { ...d, coreCompetencies: c }; });
  const addComp = () => setData(d => ({ ...d, coreCompetencies: [...d.coreCompetencies, ""] }));
  const rmComp = i => setData(d => ({ ...d, coreCompetencies: d.coreCompetencies.filter((_, j) => j !== i) }));

  const uSkill = (i, v) => setData(d => { const s = [...d.skills]; s[i] = v; return { ...d, skills: s }; });
  const addSkill = () => setData(d => ({ ...d, skills: [...d.skills, ""] }));
  const rmSkill = i => setData(d => ({ ...d, skills: d.skills.filter((_, j) => j !== i) }));

  return (
    <div style={{
      height: "100%", overflowY: "auto", padding: "16px 18px",
      background: "#161b26", color: "#c8ccd0", fontFamily: "'DM Sans', sans-serif",
    }}>
      <Section title="Personal">
        <Field label="Full Name" value={data.name} onChange={v => u("name", v)} />
        <Field label="Headline" value={data.headline} onChange={v => u("headline", v)} />
        <Field label="Location" value={data.location} onChange={v => u("location", v)} />
      </Section>

      <Section title="Links">
        <Field label="LinkedIn" value={data.links.linkedin} onChange={v => uLink("linkedin", v)} mono />
        <Field label="GitHub" value={data.links.github} onChange={v => uLink("github", v)} mono />
        <Field label="Portfolio" value={data.links.portfolio} onChange={v => uLink("portfolio", v)} mono />
      </Section>

      <Section title="Summary">
        <Field multiline rows={5} value={data.summary} onChange={v => u("summary", v)} />
      </Section>

      <Section title="Core Competencies" defaultOpen={false} count={data.coreCompetencies.length}>
        {data.coreCompetencies.map((c, i) => (
          <div key={i} style={{ display: "flex", gap: 4, marginBottom: 6 }}>
            <input
              style={{ flex: 1, background: "#1e2330", border: "1px solid #2d3548", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#e0e4ea", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
              value={c} onChange={e => uComp(i, e.target.value)}
            />
            <SmBtn onClick={() => rmComp(i)} danger><Trash2 /></SmBtn>
          </div>
        ))}
        <AddBtn onClick={addComp}>Add Competency</AddBtn>
      </Section>

      <Section title="Experience" defaultOpen={false} count={data.experience.length}>
        {data.experience.map((exp, i) => (
          <Card key={exp.id} header={exp.company || "New Position"}
            onRemove={() => rmExp(i)}
            onMoveUp={i > 0 ? () => moveExp(i, -1) : undefined}
            onMoveDown={i < data.experience.length - 1 ? () => moveExp(i, 1) : undefined}
          >
            <Field label="Role" value={exp.role} onChange={v => uExp(i, "role", v)} />
            <Field label="Company" value={exp.company} onChange={v => uExp(i, "company", v)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Field label="Start" value={exp.startDate} onChange={v => uExp(i, "startDate", v)} />
              <Field label="End" value={exp.endDate} onChange={v => uExp(i, "endDate", v)} />
            </div>
            <Field label="Location" value={exp.location} onChange={v => uExp(i, "location", v)} />
            <div style={{ marginTop: 8 }}>
              <span style={{ fontSize: 10, color: "#6b7a8d", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>Bullets</span>
              {exp.bullets.map((b, bi) => (
                <div key={bi} style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  <textarea
                    style={{ flex: 1, background: "#161b26", border: "1px solid #2d3548", borderRadius: 6, padding: "8px 10px", fontSize: 12, color: "#e0e4ea", outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.5, boxSizing: "border-box" }}
                    rows={2} value={b} onChange={e => uBullet(i, bi, e.target.value)}
                  />
                  <SmBtn onClick={() => rmBullet(i, bi)} danger style={{ marginTop: 4 }}><Trash2 /></SmBtn>
                </div>
              ))}
              <div style={{ marginTop: 8 }}><AddBtn onClick={() => addBullet(i)}>Add Bullet</AddBtn></div>
            </div>
          </Card>
        ))}
        <AddBtn onClick={addExp}>Add Experience</AddBtn>
      </Section>

      <Section title="Projects" defaultOpen={false} count={data.projects.length}>
        {data.projects.map((p, i) => (
          <Card key={p.id} header={p.name || "New Project"} onRemove={() => rmProj(i)}>
            <Field label="Name" value={p.name} onChange={v => uProj(i, "name", v)} />
            <Field label="URL" value={p.url} onChange={v => uProj(i, "url", v)} mono />
            <Field label="Type" value={p.type} onChange={v => uProj(i, "type", v)} />
            <Field label="Tech (comma-separated)" value={(p.tech || []).join(", ")} onChange={v => uProj(i, "tech", v.split(",").map(s => s.trim()))} />
            <div style={{ marginTop: 4 }}>
              <span style={{ fontSize: 10, color: "#6b7a8d", fontWeight: 600, textTransform: "uppercase" }}>Highlights</span>
              {(p.highlights || []).map((h, hi) => (
                <div key={hi} style={{ display: "flex", gap: 4, marginTop: 6 }}>
                  <input style={{ flex: 1, background: "#161b26", border: "1px solid #2d3548", borderRadius: 6, padding: "6px 10px", fontSize: 12, color: "#e0e4ea", outline: "none", fontFamily: "inherit", boxSizing: "border-box" }}
                    value={h} onChange={e => uProjHL(i, hi, e.target.value)} />
                </div>
              ))}
            </div>
          </Card>
        ))}
        <AddBtn onClick={addProj}>Add Project</AddBtn>
      </Section>

      <Section title="Education" defaultOpen={false} count={data.education.length}>
        {data.education.map((edu, i) => (
          <Card key={edu.id} header={edu.institution || "New Entry"} onRemove={() => rmEdu(i)}>
            <Field label="Degree" value={edu.degree} onChange={v => uEdu(i, "degree", v)} />
            <Field label="Institution" value={edu.institution} onChange={v => uEdu(i, "institution", v)} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Field label="Start" value={edu.startDate} onChange={v => uEdu(i, "startDate", v)} />
              <Field label="End" value={edu.endDate} onChange={v => uEdu(i, "endDate", v)} />
            </div>
            <Field label="Location" value={edu.location} onChange={v => uEdu(i, "location", v)} />
          </Card>
        ))}
        <AddBtn onClick={addEdu}>Add Education</AddBtn>
      </Section>

      <Section title="Languages" defaultOpen={false} count={data.languages.length}>
        {data.languages.map((l, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-end" }}>
            <div style={{ flex: 1 }}><Field label="Language" value={l.name} onChange={v => uLang(i, "name", v)} /></div>
            <div style={{ flex: 1 }}><Field label="Level" value={l.level} onChange={v => uLang(i, "level", v)} /></div>
            <SmBtn onClick={() => rmLang(i)} danger style={{ marginBottom: 10 }}><Trash2 /></SmBtn>
          </div>
        ))}
        <AddBtn onClick={addLang}>Add Language</AddBtn>
      </Section>

      <Section title="Skills" defaultOpen={false} count={data.skills.length}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {data.skills.map((s, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 4,
              background: "#1e2330", border: "1px solid #2d3548", borderRadius: 20,
              padding: "4px 6px 4px 10px",
            }}>
              <input
                style={{ width: Math.max(60, s.length * 7.5), background: "none", border: "none", outline: "none", color: "#c8ccd0", fontSize: 12, fontFamily: "inherit" }}
                value={s} onChange={e => uSkill(i, e.target.value)}
              />
              <button onClick={() => rmSkill(i)} style={{ background: "none", border: "none", color: "#4a5568", cursor: "pointer", fontSize: 14, lineHeight: 1, padding: 2 }}>×</button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 8 }}><AddBtn onClick={addSkill}>Add Skill</AddBtn></div>
      </Section>
    </div>
  );
}

/* ─── DATE FORMATTING ─── */
function fmtDate(d) {
  if (!d || d === "Present") return "Present";
  const parts = d.split("-");
  if (parts.length === 1) return parts[0];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
}

/* ─── LINK DISPLAY HELPER ─── */
function linkLabel(url) {
  try { return new URL(url).hostname.replace("www.", ""); } catch { return url; }
}

/* ─── CV PREVIEW ─── */
function CVPreview({ data, previewRef }) {
  const accent = "#1a5cff";
  const textMain = "#1c1c1e";
  const textSub = "#515158";
  const textMuted = "#8e8e93";
  const borderColor = "#e5e5ea";

  const sectionTitle = {
    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2.5px",
    color: accent, marginBottom: 10, paddingBottom: 5,
    borderBottom: `1.5px solid ${borderColor}`,
  };

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "#e8eaed", padding: 24, display: "flex", justifyContent: "center" }}>
      <div ref={previewRef} style={{
        background: "#fff", width: "100%", maxWidth: 780,
        padding: "44px 48px", minHeight: "297mm",
        fontFamily: "'Source Serif 4', 'Georgia', serif",
        fontSize: 10.5, lineHeight: 1.55, color: textMain,
        boxShadow: "0 1px 20px rgba(0,0,0,0.08)",
      }}>
        {/* ── HEADER ── */}
        <div style={{ marginBottom: 20 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.5px", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: textMain }}>{data.name}</h1>
          <div style={{ fontSize: 13, color: textSub, marginTop: 3, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{data.headline}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 8, fontSize: 10, color: textMuted, fontFamily: "'DM Sans', sans-serif" }}>
            <span>{data.location}</span>
            {data.links.linkedin && <a href={data.links.linkedin} style={{ color: accent, textDecoration: "none" }}>{linkLabel(data.links.linkedin)}</a>}
            {data.links.github && <a href={data.links.github} style={{ color: accent, textDecoration: "none" }}>{linkLabel(data.links.github)}</a>}
            {data.links.portfolio && <a href={data.links.portfolio} style={{ color: accent, textDecoration: "none" }}>{linkLabel(data.links.portfolio)}</a>}
          </div>
        </div>

        {/* ── SUMMARY ── */}
        {data.summary && (
          <div style={{ marginBottom: 20 }}>
            <div style={sectionTitle}>Summary</div>
            <p style={{ margin: 0, color: textSub, fontSize: 10.5, lineHeight: 1.6 }}>{data.summary}</p>
          </div>
        )}

        {/* ── CORE COMPETENCIES ── */}
        {data.coreCompetencies?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={sectionTitle}>Core Competencies</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3px 24px" }}>
              {data.coreCompetencies.map((c, i) => (
                <div key={i} style={{ fontSize: 10, color: textSub, paddingLeft: 10, position: "relative", lineHeight: 1.7 }}>
                  <span style={{ position: "absolute", left: 0, color: accent, fontWeight: 700 }}>›</span>
                  {c}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── EXPERIENCE ── */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={sectionTitle}>Experience</div>
            {data.experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < data.experience.length - 1 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 12, fontFamily: "'DM Sans', sans-serif", color: textMain }}>{exp.role}</span>
                  <span style={{ fontSize: 10, color: textMuted, whiteSpace: "nowrap", fontFamily: "'DM Sans', sans-serif" }}>{fmtDate(exp.startDate)} – {fmtDate(exp.endDate)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 1 }}>
                  <span style={{ fontSize: 11, color: accent, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{exp.company}</span>
                  <span style={{ fontSize: 10, color: textMuted, fontFamily: "'DM Sans', sans-serif" }}>{exp.location}</span>
                </div>
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul style={{ margin: "5px 0 0 0", paddingLeft: 14, listStyleType: "disc" }}>
                    {exp.bullets.filter(Boolean).map((b, bi) => (
                      <li key={bi} style={{ fontSize: 10, color: textSub, marginBottom: 2.5, lineHeight: 1.5, paddingLeft: 2 }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── PROJECTS ── */}
        {data.projects?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={sectionTitle}>Projects</div>
            {data.projects.map((p, i) => (
              <div key={p.id} style={{ marginBottom: i < data.projects.length - 1 ? 10 : 0 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{p.name}</span>
                  {p.url && <a href={p.url} style={{ fontSize: 10, color: accent, textDecoration: "none", fontFamily: "'DM Sans', sans-serif" }}>{linkLabel(p.url)}</a>}
                  {p.type && <span style={{ fontSize: 9, color: textMuted, fontFamily: "'DM Sans', sans-serif" }}>— {p.type}</span>}
                </div>
                {(p.highlights || []).filter(Boolean).length > 0 && (
                  <ul style={{ margin: "3px 0 0 0", paddingLeft: 14, listStyleType: "disc" }}>
                    {p.highlights.filter(Boolean).map((h, hi) => (
                      <li key={hi} style={{ fontSize: 10, color: textSub, lineHeight: 1.5 }}>{h}</li>
                    ))}
                  </ul>
                )}
                {(p.tech || []).length > 0 && (
                  <div style={{ display: "flex", gap: 5, marginTop: 4, flexWrap: "wrap" }}>
                    {p.tech.map((t, ti) => (
                      <span key={ti} style={{ fontSize: 9, background: "#f0f2f5", color: textSub, padding: "2px 8px", borderRadius: 10, fontFamily: "'DM Sans', sans-serif" }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── EDUCATION ── */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={sectionTitle}>Education</div>
            {data.education.map(edu => (
              <div key={edu.id}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>{edu.degree}</span>
                  <span style={{ fontSize: 10, color: textMuted, fontFamily: "'DM Sans', sans-serif" }}>{edu.startDate} – {edu.endDate}</span>
                </div>
                <div style={{ fontSize: 11, color: accent, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{edu.institution}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── LANGUAGES ── */}
        {data.languages?.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <div style={sectionTitle}>Languages</div>
            <div style={{ display: "flex", gap: 20 }}>
              {data.languages.map((l, i) => (
                <div key={i} style={{ fontFamily: "'DM Sans', sans-serif" }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: textMain }}>{l.name}</span>
                  <span style={{ fontSize: 10, color: textMuted, marginLeft: 6 }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {data.skills.length > 0 && (
          <div>
            <div style={sectionTitle}>Skills</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {data.skills.filter(Boolean).map((s, i) => (
                <span key={i} style={{
                  fontSize: 9.5, padding: "3px 10px", borderRadius: 12,
                  background: "#f0f2f5", color: textSub, fontWeight: 500,
                  fontFamily: "'DM Sans', sans-serif",
                }}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── TOOLBAR ─── */
const toolbarBtnStyle = {
  padding: "6px 14px", fontSize: 12, fontWeight: 600, borderRadius: 6,
  border: "1px solid #2d3548", background: "#1e2330", color: "#c8ccd0",
  cursor: "pointer", fontFamily: "inherit",
};

function Toolbar({ onPrint, onExportJSON, onImportJSON }) {
  const fileRef = useRef(null);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 20px", height: 48, background: "#0f1219",
      borderBottom: "1px solid #1e2330", fontFamily: "'DM Sans', sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#1a5cff" }} />
        <span style={{ fontWeight: 700, fontSize: 14, color: "#e0e4ea", letterSpacing: "-0.3px" }}>CV Editor</span>
        <span style={{ fontSize: 10, color: "#4a5568", marginLeft: 4 }}>v1.0</span>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => fileRef.current?.click()} style={toolbarBtnStyle}>Import JSON</button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={onImportJSON} />
        <button onClick={onExportJSON} style={toolbarBtnStyle}>Export JSON</button>
        <button onClick={onPrint} style={{ ...toolbarBtnStyle, background: "#1a5cff", color: "#fff", borderColor: "#1a5cff" }}>
          Export PDF
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN ─── */
export default function CVEditor() {
  const [data, setData] = useState(initialData);
  const [editorWidth, setEditorWidth] = useState(420);
  const previewRef = useRef(null);
  const dragging = useRef(false);

  const handlePrint = useCallback(() => {
    const el = previewRef.current;
    if (!el) return;
    const w = window.open("", "_blank");
    w.document.write(`<!DOCTYPE html><html><head><title>${data.name} – CV</title>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Source+Serif+4:wght@400;600;700&display=swap" rel="stylesheet">
      <style>@page{size:A4;margin:0}*{margin:0;padding:0;box-sizing:border-box}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}</style>
    </head><body>${el.innerHTML}</body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 400);
  }, [data.name]);

  const handleExportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob);
    a.download = `cv-${data.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click(); URL.revokeObjectURL(a.href);
  }, [data]);

  const handleImportJSON = useCallback((e) => {
    const file = e.target.files?.[0]; if (!file) return;
    const r = new FileReader();
    r.onload = (ev) => { try { setData(JSON.parse(ev.target.result)); } catch { alert("Invalid JSON"); } };
    r.readAsText(file); e.target.value = "";
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'DM Sans', sans-serif" }}
      onMouseMove={e => { if (dragging.current) setEditorWidth(Math.max(320, Math.min(600, e.clientX))); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
    >
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Mono:wght@400&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&display=swap" rel="stylesheet" />
      <Toolbar onPrint={handlePrint} onExportJSON={handleExportJSON} onImportJSON={handleImportJSON} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: editorWidth, minWidth: 320, maxWidth: 600, flexShrink: 0 }}>
          <FormPanel data={data} setData={setData} />
        </div>
        <div
          onMouseDown={() => { dragging.current = true; }}
          style={{ width: 5, background: "#1e2330", cursor: "col-resize", flexShrink: 0, transition: "background 0.15s" }}
          onMouseEnter={e => e.currentTarget.style.background = "#1a5cff"}
          onMouseLeave={e => e.currentTarget.style.background = "#1e2330"}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <CVPreview data={data} previewRef={previewRef} />
        </div>
      </div>
    </div>
  );
}