import { useState, useRef, useCallback } from "react";

const initialData = {
  "name": "Maximiliano Céspedes",
  "title": "Senior Product Engineer (Frontend)",
  "location": "Rijswijk, The Netherlands",
  "summary": "I am a Frontend Software Engineer with 12+ years of experience building and scaling high-impact web platforms across cloud storage, fintech, and e-commerce. I specialize in architecting large-scale frontend systems using technologies like Next.js, React, Cloudflare Workers, and Kubernetes. My work spans performance engineering, observability, design systems, and major application migrations. I'm looking for Senior/Staff Product Engineer role with focus on Frontend. ",
  "experience": [
    {
      "id": 0,
      "company": "Stepcraft",
      "role": "Co-Founder",
      "startDate": "08/2025",
      "endDate": "Present",
      "location": "The Netherlands",
      "bullets": [
        "Co-founded Stepcraft, an step-based RPG mobile game. Built in React Native, Supabase, and Vercel. Working on the frontend, helping with game design and supporting the community."
      ]
    },
    {
      "id": 1,
      "company": "Creative Fabrica",
      "role": "Senior Frontend Engineer",
      "startDate": "02/2025",
      "endDate": "02/2026",
      "location": "The Netherlands",
      "bullets": [
        "Led the migration of the My Accounts application from WordPress to Next.js, using Cloudflare Workers, A/B testing, and performance monitoring to ensure stable business and engagement metrics.",
        "Led the Design System team for the Marketplace; established live documentation, versioned component packages, governance processes, and adoption metrics. Migrated the top 10 core components and the full design token system, improving consistency and development speed across teams.",
        "Implemented Prometheus metrics and Grafana dashboards for our self-hosted Next.js cluster. Introduced frontend success and latency metrics, SLOs, and automated alerting to enhance reliability and observability.",
        "Optimized Kubernetes cluster costs, reducing annual compute expenses by more than 4x. Built multi-platform Docker images, migrated workloads from AMD64 to ARM64, improved autoscaling rules, and reduced pod resource consumption through optimized caching strategies."
      ]
    },
    {
      "id": 2,
      "company": "WeTransfer",
      "role": "Senior Frontend Engineer II",
      "startDate": "10/2021",
      "endDate": "02/2025",
      "location": "The Netherlands",
      "bullets": [
        "Contributed to scaling and optimizing the upload user journey, helping maintain a seamless and reliable experience for over 90 million monthly users.",
        "Designed and executed the migration of the wetransfer.com single-page application, previously served by the Ruby monolith, into the Next.js stack with whole-site delivery.",
        "Introduced observability tooling and monitoring to the frontend stack and defined SLIs and SLOs for wetransfer.com in coordination with the SRE team. Improved MTTD from 2 hours to 11 mins in core-user journeys.",
        "Planned, implemented, and rolled out a new uploader library to the Transfer app, improving upload performance by 3.5% and increasing the success rate for large files from 93.43% to 95.07%.",
        "Led the frontend effort to implement company-wide pricing and packaging changes in the Transfer application, introducing five new tiers across multiple countries.",
        "Implemented and rolled out WeTransfer's new Workspaces feature, driving a 94.3% quarter-over-quarter increase in net seats added."
      ]
    },
    {
      "id": 3,
      "company": "Coolblue",
      "role": "Senior Frontend Engineer",
      "startDate": "2018",
      "endDate": "2021",
      "location": "The Netherlands",
      "bullets": [
        "Developed and optimized user interfaces for the search and product pages, serving over 10 million monthly users",
        "Collaborated with cross-functional teams to enhance developer workflows, performance, and user experience",
        "Created React applications that serve hundreds of internal specialists to support multiple back-office processes and provided mentoring about our custom JS framework to 5 new frontend developers",
        "Led the web performance taskforce, introducing Datadog RUM and training teams on performance metrics, monitoring, and best practices to enhance user experience",
        "Led E2E testing platform migration to Cypress and hosted acceptance tests training for the Internal learning platform"
      ]
    },
    {
      "id": 4,
      "company": "Intive-FDV",
      "role": "Technical Lead Frontend",
      "startDate": "2017",
      "endDate": "2018",
      "location": "Argentina",
      "bullets": [
        "Led the complete rebuild of a suite of 12 single-page applications from the ground up",
        "Led a team of 13 frontend developers in building 12 unique products and maintained a shared UI component library",
        "Designed and documented comprehensive architectural guidelines to promote scalability, consistency, and best practices throughout the project"
      ]
    },
    {
      "id": 5,
      "company": "Intive-FDV",
      "role": "Frontend Engineer",
      "startDate": "2016",
      "endDate": "2017",
      "location": "Argentina",
      "bullets": [
        "Redesigned the core platform by overhauling the routing system, state management, and bundle process",
        "Refactored project structure to support new scalability requirements"
      ]
    },
    {
      "id": 6,
      "company": "Telectronica",
      "role": "Full Stack Developer",
      "startDate": "2014",
      "endDate": "2016",
      "location": "Argentina",
      "bullets": [
        "Maintained and enhanced Silverlight/ASP.NET web applications",
        "Provided on-site platform setup and training across Argentina, Brazil, Peru, Chile, and Uruguay"
      ]
    }
  ],
  "education": [
    {
      "id": 1,
      "institution": "Universidad Tecnologica Nacional Argentina",
      "degree": "Information Systems Engineer",
      "startDate": "2008",
      "endDate": "2014",
      "location": "Argentina"
    }
  ],
  "skills": [
    "Typescript",
    "Next.JS",
    "React",
    "Design Systems",
    "AWS",
    "Node.JS",
    "Docker",
    "Kubernetes",
    "Web Performance",
    "Figma MCP",
    "Agentic Coding",
    "AI Engineering"
  ]
}

/* ─── themes ─── */
const THEMES = {
  classic: { name: "Classic", accent: "#222222", badgeBg: "#f0f0f0", badgeText: "#444444" },
  blue:    { name: "Blue",    accent: "#1d4ed8", badgeBg: "#eff6ff", badgeText: "#1e40af" },
  teal:    { name: "Teal",    accent: "#0f766e", badgeBg: "#f0fdfa", badgeText: "#0d6e64" },
  green:   { name: "Green",   accent: "#15803d", badgeBg: "#f0fdf4", badgeText: "#166534" },
  purple:  { name: "Purple",  accent: "#7c3aed", badgeBg: "#f5f3ff", badgeText: "#6d28d9" },
  rose:    { name: "Rose",    accent: "#be123c", badgeBg: "#fff1f2", badgeText: "#9f1239" },
};

/* ─── tiny helpers ─── */
const uid = () => Math.random().toString(36).slice(2, 9);

/* ─── icons (inline SVG to avoid deps) ─── */
const ChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
);
const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
);
const Trash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z"/></svg>
);
const Plus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
);
const ArrowUp = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5m-7 7l7-7 7 7"/></svg>
);
const ArrowDn = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m7-7l-7 7-7-7"/></svg>
);

/* ─── Collapsible Section ─── */
function Collapsible({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 w-full text-left font-semibold text-sm text-gray-700 py-1 hover:text-gray-900"
      >
        {open ? <ChevronDown /> : <ChevronRight />}
        {title}
      </button>
      {open && <div className="pl-1 pt-1">{children}</div>}
    </div>
  );
}

/* ─── Input field ─── */
function Field({ label, value, onChange, multiline, rows = 3 }) {
  const cls = "w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400";
  return (
    <label className="block mb-2">
      {label && <span className="text-xs font-medium text-gray-500 mb-0.5 block">{label}</span>}
      {multiline ? (
        <textarea className={cls} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

/* ─── Small icon button ─── */
function IconBtn({ onClick, children, className = "", title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── FORM PANEL ─── */
function FormPanel({ data, setData }) {
  const update = (key, val) => setData((d) => ({ ...d, [key]: val }));

  const updateExp = (idx, key, val) =>
    setData((d) => {
      const exp = [...d.experience];
      exp[idx] = { ...exp[idx], [key]: val };
      return { ...d, experience: exp };
    });

  const updateBullet = (expIdx, bIdx, val) =>
    setData((d) => {
      const exp = [...d.experience];
      const bullets = [...exp[expIdx].bullets];
      bullets[bIdx] = val;
      exp[expIdx] = { ...exp[expIdx], bullets };
      return { ...d, experience: exp };
    });

  const addBullet = (expIdx) =>
    setData((d) => {
      const exp = [...d.experience];
      exp[expIdx] = { ...exp[expIdx], bullets: [...exp[expIdx].bullets, ""] };
      return { ...d, experience: exp };
    });

  const removeBullet = (expIdx, bIdx) =>
    setData((d) => {
      const exp = [...d.experience];
      exp[expIdx] = { ...exp[expIdx], bullets: exp[expIdx].bullets.filter((_, i) => i !== bIdx) };
      return { ...d, experience: exp };
    });

  const addExperience = () =>
    setData((d) => ({
      ...d,
      experience: [
        ...d.experience,
        { id: uid(), company: "", role: "", startDate: "", endDate: "", location: "", bullets: [""] },
      ],
    }));

  const removeExperience = (idx) =>
    setData((d) => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }));

  const moveExp = (idx, dir) =>
    setData((d) => {
      const exp = [...d.experience];
      const target = idx + dir;
      if (target < 0 || target >= exp.length) return d;
      [exp[idx], exp[target]] = [exp[target], exp[idx]];
      return { ...d, experience: exp };
    });

  const updateEdu = (idx, key, val) =>
    setData((d) => {
      const edu = [...d.education];
      edu[idx] = { ...edu[idx], [key]: val };
      return { ...d, education: edu };
    });

  const addEducation = () =>
    setData((d) => ({
      ...d,
      education: [...d.education, { id: uid(), institution: "", degree: "", startDate: "", endDate: "", location: "" }],
    }));

  const removeEducation = (idx) =>
    setData((d) => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));

  const updateSkill = (idx, val) =>
    setData((d) => {
      const s = [...d.skills];
      s[idx] = val;
      return { ...d, skills: s };
    });

  const addSkill = () => setData((d) => ({ ...d, skills: [...d.skills, ""] }));
  const removeSkill = (idx) => setData((d) => ({ ...d, skills: d.skills.filter((_, i) => i !== idx) }));

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-50">
      <Collapsible title="Personal Info">
        <Field label="Full Name" value={data.name} onChange={(v) => update("name", v)} />
        <Field label="Title" value={data.title} onChange={(v) => update("title", v)} />
        <Field label="Location" value={data.location} onChange={(v) => update("location", v)} />
      </Collapsible>

      <Collapsible title="Summary">
        <Field multiline rows={4} value={data.summary} onChange={(v) => update("summary", v)} />
      </Collapsible>

      <Collapsible title="Experience" defaultOpen={false}>
        {data.experience.map((exp, i) => (
          <div key={exp.id} className="mb-4 p-3 bg-white rounded border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600 truncate max-w-[60%]">
                {exp.company || "New Position"}
              </span>
              <div className="flex items-center gap-0.5">
                <IconBtn onClick={() => moveExp(i, -1)} title="Move up"><ArrowUp /></IconBtn>
                <IconBtn onClick={() => moveExp(i, 1)} title="Move down"><ArrowDn /></IconBtn>
                <IconBtn onClick={() => removeExperience(i)} title="Remove" className="hover:text-red-600"><Trash /></IconBtn>
              </div>
            </div>
            <Field label="Role" value={exp.role} onChange={(v) => updateExp(i, "role", v)} />
            <Field label="Company" value={exp.company} onChange={(v) => updateExp(i, "company", v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start" value={exp.startDate} onChange={(v) => updateExp(i, "startDate", v)} />
              <Field label="End" value={exp.endDate} onChange={(v) => updateExp(i, "endDate", v)} />
            </div>
            <Field label="Location" value={exp.location} onChange={(v) => updateExp(i, "location", v)} />
            <div className="mt-2">
              <span className="text-xs font-medium text-gray-500">Bullet Points</span>
              {exp.bullets.map((b, bi) => (
                <div key={bi} className="flex items-start gap-1 mt-1">
                  <textarea
                    className="flex-1 border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-400"
                    rows={2}
                    value={b}
                    onChange={(e) => updateBullet(i, bi, e.target.value)}
                  />
                  <IconBtn onClick={() => removeBullet(i, bi)} className="mt-1 hover:text-red-600"><Trash /></IconBtn>
                </div>
              ))}
              <button
                onClick={() => addBullet(i)}
                className="mt-1 flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
              >
                <Plus /> Add bullet
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={addExperience}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          <Plus /> Add Experience
        </button>
      </Collapsible>

      <Collapsible title="Education" defaultOpen={false}>
        {data.education.map((edu, i) => (
          <div key={edu.id} className="mb-3 p-3 bg-white rounded border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-gray-600">{edu.institution || "New Entry"}</span>
              <IconBtn onClick={() => removeEducation(i)} className="hover:text-red-600"><Trash /></IconBtn>
            </div>
            <Field label="Degree" value={edu.degree} onChange={(v) => updateEdu(i, "degree", v)} />
            <Field label="Institution" value={edu.institution} onChange={(v) => updateEdu(i, "institution", v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Start" value={edu.startDate} onChange={(v) => updateEdu(i, "startDate", v)} />
              <Field label="End" value={edu.endDate} onChange={(v) => updateEdu(i, "endDate", v)} />
            </div>
            <Field label="Location" value={edu.location} onChange={(v) => updateEdu(i, "location", v)} />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          <Plus /> Add Education
        </button>
      </Collapsible>

      <Collapsible title="Skills" defaultOpen={false}>
        <div className="flex flex-wrap gap-2 mb-2">
          {data.skills.map((s, i) => (
            <div key={i} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-2 py-1">
              <input
                className="w-24 text-xs border-none outline-none bg-transparent"
                value={s}
                onChange={(e) => updateSkill(i, e.target.value)}
              />
              <button onClick={() => removeSkill(i)} className="text-gray-400 hover:text-red-500">×</button>
            </div>
          ))}
        </div>
        <button
          onClick={addSkill}
          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800"
        >
          <Plus /> Add Skill
        </button>
      </Collapsible>
    </div>
  );
}

/* ─── CV PREVIEW (matches original layout) ─── */
function CVPreview({ data, previewRef, theme }) {
  const t = THEMES[theme] ?? THEMES.classic;
  const h2Style = (mb = "8px") => ({
    fontSize: "12px", fontWeight: 700, textTransform: "uppercase",
    letterSpacing: "1px", color: t.accent,
    borderBottom: `1.5px solid ${t.accent}`,
    paddingBottom: "3px", marginBottom: mb,
    breakAfter: "avoid", pageBreakAfter: "avoid",
  });
  const badgeStyle = {
    fontSize: "10px", padding: "3px 10px", borderRadius: "12px",
    backgroundColor: t.badgeBg, color: t.badgeText, fontWeight: 500,
  };

  return (
    <div className="h-full overflow-y-auto bg-gray-300 p-4 flex justify-center">
      <div
        ref={previewRef}
        className="bg-white shadow-lg w-full max-w-[210mm]"
        style={{
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          fontSize: "10.5px",
          lineHeight: "1.5",
          color: "#1a1a1a",
          padding: "36px 40px",
          minHeight: "297mm",
          position: "relative",
        }}
      >
        {/* Page break indicator — hidden in print via .no-print */}
        <div className="no-print" style={{ position: "absolute", top: "287.5mm", left: 0, right: 0, borderTop: "1.5px dashed rgba(239,68,68,0.45)", pointerEvents: "none" }} />
        <span className="no-print" style={{ position: "absolute", top: "287.5mm", right: "8px", transform: "translateY(-100%)", fontSize: "9px", color: "#ef4444", opacity: 0.65, fontFamily: "sans-serif", lineHeight: 1.2 }}>— page break —</span>
        {/* Header */}
        <div style={{ marginBottom: "12px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: 700, margin: 0, letterSpacing: "-0.3px" }}>{data.name}</h1>
          <div style={{ fontSize: "13px", color: "#4a4a4a", marginTop: "2px" }}>{data.title}</div>
          <div style={{ fontSize: "11px", color: "#777", marginTop: "2px" }}>{data.location}</div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div style={{ marginBottom: "16px" }}>
            <h2 style={h2Style()}>Summary</h2>
            <p style={{ margin: 0, color: "#333", fontSize: "10.5px" }}>{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <h2 style={h2Style("10px")}>Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={exp.id} style={{ marginBottom: i < data.experience.length - 1 ? "12px" : 0, breakInside: "avoid", pageBreakInside: "avoid" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div>
                    <span style={{ fontWeight: 700, fontSize: "11.5px" }}>{exp.role}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: "#666", whiteSpace: "nowrap" }}>
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1px" }}>
                  <span style={{ fontSize: "10.5px", color: "#555", fontStyle: "italic" }}>{exp.company}</span>
                  <span style={{ fontSize: "10px", color: "#888" }}>{exp.location}</span>
                </div>
                {exp.bullets.length > 0 && (
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "16px" }}>
                    {exp.bullets.filter(Boolean).map((b, bi) => (
                      <li key={bi} style={{ fontSize: "10px", color: "#444", marginBottom: "2px", lineHeight: "1.45" }}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div style={{ marginBottom: "16px" }}>
            <h2 style={h2Style("10px")}>Education</h2>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: "6px", breakInside: "avoid", pageBreakInside: "avoid" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 700, fontSize: "11.5px" }}>{edu.degree}</span>
                  <span style={{ fontSize: "10px", color: "#666" }}>
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "10.5px", color: "#555", fontStyle: "italic" }}>{edu.institution}</span>
                  <span style={{ fontSize: "10px", color: "#888" }}>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 style={h2Style()}>Skills</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {data.skills.filter(Boolean).map((s, i) => (
                <span key={i} style={badgeStyle}>{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── TOOLBAR ─── */
function Toolbar({ onPrint, onExportJSON, onImportJSON, theme, onThemeChange }) {
  const fileRef = useRef(null);
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="font-bold text-sm text-gray-800">CV Editor</span>
      </div>
      <div className="flex items-center gap-3">
        {/* Theme picker */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-400 font-medium">Style</span>
          <div className="flex items-center gap-1">
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                title={t.name}
                onClick={() => onThemeChange(key)}
                className={`w-5 h-5 rounded-full transition-all ${
                  theme === key
                    ? "ring-2 ring-offset-1 ring-gray-500 scale-110"
                    : "hover:scale-110 opacity-70 hover:opacity-100"
                }`}
                style={{ backgroundColor: t.accent }}
              />
            ))}
          </div>
        </div>
        <div className="w-px h-4 bg-gray-200" />
        <button
          onClick={() => fileRef.current?.click()}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          Import JSON
        </button>
        <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={onImportJSON} />
        <button
          onClick={onExportJSON}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded hover:bg-gray-200"
        >
          Export JSON
        </button>
        <button
          onClick={onPrint}
          className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Export PDF ↓
        </button>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function CVEditor() {
  const [data, setData] = useState(initialData);
  const [theme, setTheme] = useState("classic");
  const [editorWidth, setEditorWidth] = useState(420);
  const previewRef = useRef(null);
  const dragging = useRef(false);

  const handlePrint = useCallback(() => {
    const content = previewRef.current;
    if (!content) return;
    const w = window.open("", "_blank");
    w.document.write(`<!DOCTYPE html><html><head><title>${data.name} - CV</title><style>
      @page { size: A4; margin: 9.5mm 10.5mm; }
      html, body { margin: 0; padding: 0; box-sizing: border-box; }
      body { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-size: 10.5px; line-height: 1.5; color: #1a1a1a; }
      .no-print { display: none !important; }
    </style></head><body>${content.innerHTML}</body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); w.close(); }, 300);
  }, [data.name]);

  const handleExportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `cv-${data.name.toLowerCase().replace(/\s+/g, "-")}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, [data]);

  const handleImportJSON = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        setData(parsed);
      } catch {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }, []);

  const onMouseDown = useCallback(() => { dragging.current = true; }, []);
  const onMouseUp = useCallback(() => { dragging.current = false; }, []);
  const onMouseMove = useCallback((e) => {
    if (!dragging.current) return;
    const newW = Math.max(300, Math.min(600, e.clientX));
    setEditorWidth(newW);
  }, []);

  return (
    <div
      className="flex flex-col h-screen bg-gray-100"
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <Toolbar onPrint={handlePrint} onExportJSON={handleExportJSON} onImportJSON={handleImportJSON} theme={theme} onThemeChange={setTheme} />
      <div className="flex flex-1 overflow-hidden">
        <div style={{ width: editorWidth, minWidth: 300, maxWidth: 600 }} className="flex-shrink-0">
          <FormPanel data={data} setData={setData} />
        </div>
        {/* Drag handle */}
        <div
          onMouseDown={onMouseDown}
          className="w-1.5 bg-gray-200 hover:bg-blue-400 cursor-col-resize flex-shrink-0 transition-colors"
        />
        <div className="flex-1 min-w-0">
          <CVPreview data={data} previewRef={previewRef} theme={theme} />
        </div>
      </div>
    </div>
  );
}
