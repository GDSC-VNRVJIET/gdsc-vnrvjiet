import { useState, useEffect, useRef, useMemo } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

interface Participant {
  name: string;
  email: string;
  profileUrl: string;
  profileStatus: string;
  milestone: number;
  badges: number;
  badgeNames: string[];
  lastBadgeAt: string | null;
  mentor: string | null;
  cluster: string | null;
}

interface Team {
  key: string;
  name: string;
  members: Participant[];
  score: number;
  started: number;
  finished: number;
  size: number;
}

const INK = "#1E1E1E";
const PAGE_BG = "#F0F0F0";
const PANEL = "#F7F7F9";
const LINE = "#E3E5EA";
const MUTED = "#4B5057";
const DIM = "#3C4043";
const GREEN = "#D3F5CC";
const BLUE = "#5383EC";
const YELLOW = "#F8D74F";
const DISP = "'Google Sans', system-ui, sans-serif";

const MS = [
  { n: 1, need: 3, fill: "#F8D74F", soft: "#FCE8B2" },
  { n: 2, need: 5, fill: "#F086AE", soft: "#F6D8DC" },
  { n: 3, need: 10, fill: "#78C8FB", soft: "#CBEAFB" },
];
const POD: Record<number, { fill: string; h: number }> = {
  1: { fill: "#F086AE", h: 340 },
  2: { fill: "#F8D74F", h: 260 },
  3: { fill: "#78C8FB", h: 200 },
};
const CLIMB_H = [190, 280, 380];
const BADGE_TOTAL = 10;
const PAGE_SIZE = 25;

const initialsOf = (name: string) =>
  String(name || "?")
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const badgeTime = (p: Participant) => {
  const value = p.lastBadgeAt ? new Date(p.lastBadgeAt).getTime() : NaN;
  return Number.isNaN(value) ? Infinity : value;
};

const byRank = (a: Participant, b: Participant) => {
  if (b.badges !== a.badges) return b.badges - a.badges;
  const first = badgeTime(a);
  const second = badgeTime(b);
  if (first !== second) return first - second;
  return String(a.name).localeCompare(String(b.name));
};

const msFor = (badges: number) => {
  let hit = null as (typeof MS)[number] | null;
  MS.forEach((m) => {
    if (badges >= m.need) hit = m;
  });
  return hit;
};

function useProgress(active: boolean) {
  const [t, setT] = useState(0);
  const raf = useRef(0);
  useEffect(() => {
    if (!active) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setT(1);
      return;
    }
    let start: number | null = null;
    const step = (now: number) => {
      if (start === null) start = now;
      const k = Math.min(1, (now - start) / 1400);
      setT(1 - Math.pow(1 - k, 3));
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active]);
  return t;
}

function Globe() {
  return (
    <svg
      width="0.54em"
      height="0.54em"
      viewBox="0 0 60 60"
      fill="none"
      stroke={INK}
      strokeWidth={3.2}
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "baseline", margin: "0 0.03em", overflow: "visible" }}
    >
      <circle cx="30" cy="30" r="27" />
      <ellipse cx="30" cy="30" rx="15.5" ry="27" />
      <path d="M6.5 17h47M6.5 43h47" />
    </svg>
  );
}

function HeaderCard() {
  const pills = ["#ff7daf", "#57caff", "#5cdb6d", "#ffd427"];
  return (
    <header style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "clamp(16px, 2.4vw, 32px)" }}>
      <div className="lb-card ga-hd-card" style={{ position: "relative", flex: "1 1 620px", minWidth: 0, paddingTop: 56 }}>
        <svg
          className="lb-star"
          width="54"
          height="54"
          viewBox="0 0 54 54"
          fill="none"
          stroke={INK}
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
          style={{ position: "absolute", left: 8, top: -6 }}
        >
          <path d="M27 2v50M2 27h50M9 9l36 36M45 9L9 45" />
        </svg>

        <div
          className="ga-hd-tab"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "46%",
            height: 58.5,
            background: GREEN,
            border: `2.5px solid ${INK}`,
            borderBottom: 0,
            borderRadius: "28px 28px 0 0",
            boxSizing: "border-box",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 8,
            padding: "0 24px",
          }}
        >
          {pills.map((c, i) => (
            <span
              key={c}
              className="lb-pill ga-hd-pill"
              style={{
                width: 34,
                height: 14,
                borderRadius: 999,
                background: c,
                border: `1.5px solid ${INK}`,
                animationDelay: `${1 + i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <svg
          width="30"
          height="30.5"
          viewBox="0 0 30 30.5"
          aria-hidden="true"
          style={{ position: "absolute", top: 28, right: "calc(46% - 2.5px)", zIndex: 3, overflow: "visible" }}
        >
          <path d="M0 29.25A28.75 29.25 0 0 0 28.75 0H30V30.5H0z" fill={GREEN} />
          <path d="M0 29.25A28.75 29.25 0 0 0 28.75 0" fill="none" stroke={INK} strokeWidth={2.5} />
        </svg>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            background: GREEN,
            border: `2.5px solid ${INK}`,
            borderRadius: "28px 0 28px 28px",
            padding: "clamp(20px, 3vw, 36px) clamp(20px, 3.4vw, 44px) clamp(24px, 3.4vw, 40px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(10px, 2vw, 28px)",
          }}
        >
          <svg
            className="lb-brace-l ga-hd-brace"
            viewBox="0 0 36 170"
            fill="none"
            stroke={INK}
            strokeWidth={2.5}
            aria-hidden="true"
            style={{ flex: "none", width: "clamp(12px, 2vw, 30px)", height: "auto", alignSelf: "stretch" }}
          >
            <path d="M34 2C20 2 18 10 18 24v40c0 14-4 20-16 21 12 1 16 7 16 21v40c0 14 2 22 16 22" />
          </svg>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
            <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: "clamp(13px, 1.5vw, 20px)", letterSpacing: "0.12em" }}>
              GOOGLE CLOUD
            </span>
            <h1
              aria-label="Learn with Communities"
              className="ga-hd-title"
              style={{
                margin: 0,
                fontFamily: DISP,
                fontWeight: 700,
                fontSize: "clamp(20px, 4vw, 60px)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                whiteSpace: "nowrap",
              }}
            >
              <span className="lb-type ga-hd-type" aria-hidden="true" style={{ display: "inline-flex", alignItems: "center", gap: "0.25em" }}>
                <span>Learn with</span>
                <span style={{ whiteSpace: "nowrap" }}>
                  C
                  <Globe />
                  mmunities
                </span>
              </span>
            </h1>
          </div>

          <svg
            className="lb-brace-r ga-hd-brace"
            viewBox="0 0 36 170"
            fill="none"
            stroke={INK}
            strokeWidth={2.5}
            aria-hidden="true"
            style={{ flex: "none", width: "clamp(12px, 2vw, 30px)", height: "auto", alignSelf: "stretch" }}
          >
            <path d="M2 2c14 0 16 8 16 22v40c0 14 4 20 16 21-12 1-16 7-16 21v40c0 14-2 22-16 22" />
          </svg>

          <span
            className="lb-sidetab"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: -16,
              top: 58,
              width: 30,
              height: "46%",
              background: YELLOW,
              border: `2.5px solid ${INK}`,
              borderRadius: 8,
              boxSizing: "border-box",
              zIndex: 4,
            }}
          />
        </div>
      </div>

      <div className="ga-hd-dots" style={{ display: "flex", flexDirection: "column", gap: 6 }} aria-hidden="true">
        {[0.5, 0.62, 0.74].map((d) => (
          <span
            key={d}
            className="lb-dotin"
            style={{
              width: 46,
              height: 46,
              borderRadius: "50%",
              background: YELLOW,
              border: `1.5px solid ${INK}`,
              boxSizing: "border-box",
              animationDelay: `${d}s`,
            }}
          />
        ))}
      </div>
    </header>
  );
}

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || reduce || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div ref={ref} className={shown ? undefined : "lb-hold"}>
      {children}
    </div>
  );
}

function SectionHead({ title }: { title: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "18px 28px",
        borderBottom: `2.5px solid ${INK}`,
        flexWrap: "wrap",
      }}
    >
      <h2 style={{ margin: 0, fontFamily: DISP, fontWeight: 700, fontSize: 22 }}>{title}</h2>
      <div style={{ display: "flex", gap: 8 }} aria-hidden="true">
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: BLUE, border: `2px solid ${INK}`, boxSizing: "border-box" }} />
        <span style={{ width: 22, height: 22, borderRadius: "50%", background: BLUE, border: `2px solid ${INK}`, boxSizing: "border-box" }} />
      </div>
    </div>
  );
}

function GenAi() {
  const [data, setData] = useState<Participant[] | null>(null);
  const [view, setView] = useState<"players" | "teams">("players");
  const [q, setQ] = useState("");
  const [tq, setTq] = useState("");
  const [topen, setTopen] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState(1);
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState("");
  const [uploadMsg, setUploadMsg] = useState("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [user] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as { role: string } | null
  );

  const [animate, setAnimate] = useState(() => {
    try {
      return (window as unknown as { __introDone?: boolean }).__introDone !== false;
    } catch (e) {
      return true;
    }
  });

  const [bodyReady, setBodyReady] = useState(false);

  useEffect(() => {
    if (animate) return;
    const done = () => setAnimate(true);
    window.addEventListener("intro-done", done);
    return () => window.removeEventListener("intro-done", done);
  }, [animate]);

  useEffect(() => {
    if (!animate) return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setBodyReady(true);
      return;
    }
    const timer = setTimeout(() => setBodyReady(true), 2400);
    return () => clearTimeout(timer);
  }, [animate]);

  const t = useProgress(bodyReady && data !== null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACK_URL}/genAi/get-data`);
        const raw = Array.isArray(res.data.data) ? res.data.data : [];
        setData(
          raw.map((row: Partial<Participant>) => ({
            name: String(row.name || ""),
            email: String(row.email || ""),
            profileUrl: String(row.profileUrl || ""),
            profileStatus: String(row.profileStatus || ""),
            milestone: Number(row.milestone) || 0,
            badges: Number(row.badges) || 0,
            badgeNames: Array.isArray(row.badgeNames) ? row.badgeNames : [],
            lastBadgeAt: row.lastBadgeAt || null,
            mentor: row.mentor || null,
            cluster: row.cluster || null,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };
    fetchData();
  }, [triggerUpdate]);

  const participants = useMemo(() => {
    const list = (data || []).slice();
    list.sort(byRank);
    return list;
  }, [data]);

  const teams = useMemo(() => {
    const map: Record<string, Team> = {};
    participants.forEach((p) => {
      if (!p.cluster) return;
      if (!map[p.cluster]) {
        map[p.cluster] = {
          key: p.cluster,
          name: p.mentor || "Unassigned",
          members: [],
          score: 0,
          started: 0,
          finished: 0,
          size: 0,
        };
      }
      const team = map[p.cluster];
      team.members.push(p);
      team.score += p.badges;
      team.size += 1;
      if (p.badges > 0) team.started += 1;
      if (p.badges >= BADGE_TOTAL) team.finished += 1;
    });
    const list = Object.values(map);
    list.forEach((team) => team.members.sort(byRank));
    list.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
    return list;
  }, [participants]);

  const count = participants.length;
  const reached = MS.map((m) => participants.filter((p) => p.badges >= m.need).length);

  const isTeams = view === "teams";

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return participants;
    return participants.filter((p) => String(p.name).toLowerCase().includes(needle));
  }, [participants, q]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const rows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const pageList = (() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const out: (number | "gap")[] = [1];
    const from = Math.max(2, safePage - 1);
    const to = Math.min(totalPages - 1, safePage + 1);
    if (from > 2) out.push("gap");
    for (let i = from; i <= to; i++) out.push(i);
    if (to < totalPages - 1) out.push("gap");
    out.push(totalPages);
    return out;
  })();

  const filteredTeams = useMemo(() => {
    const needle = tq.trim().toLowerCase();
    if (!needle) return teams;
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(needle) ||
        team.members.some((m) => String(m.name).toLowerCase().includes(needle))
    );
  }, [teams, tq]);

  const podium = [teams[1], teams[0], teams[2]].filter(Boolean) as Team[];

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    if (!fileTypes.includes(selectedFile.type)) {
      setTypeError("Please select a .csv or .xlsx export");
      setExcelFile(null);
      return;
    }
    setTypeError("");
    const reader = new FileReader();
    reader.readAsArrayBuffer(selectedFile);
    reader.onload = (event) => {
      if (event.target && event.target.result) setExcelFile(event.target.result as ArrayBuffer);
    };
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!excelFile) return;
    setUploadMsg("Uploading…");
    try {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const rowsIn = XLSX.utils.sheet_to_json(worksheet);
      const res = await axios.put(`${process.env.REACT_APP_BACK_URL}/genAi/update-data`, { data: rowsIn });
      const body = res.data || {};
      setUploadMsg(`Uploaded ${body.received ?? rowsIn.length} rows · ${body.upserted ?? 0} added · ${body.modified ?? 0} updated`);
      setTriggerUpdate((prev) => !prev);
    } catch (error) {
      console.error("Error updating data:", error);
      setUploadMsg("Upload failed. Check that you are signed in as an admin.");
    }
  };

  const isAdmin = user && user.role === process.env.REACT_APP_ADMIN_ROLE;

  const headerCell: React.CSSProperties = {
    padding: "12px 28px",
    background: PANEL,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    color: DIM,
  };


  const pageBtn: React.CSSProperties = {
    minHeight: 40,
    padding: "0 14px",
    font: "inherit",
    fontWeight: 700,
    fontSize: 14,
    background: "#FFFFFF",
    border: `2px solid ${INK}`,
    borderRadius: 999,
    color: INK,
  };

  const inputStyle: React.CSSProperties = {
    height: 44,
    border: `2px solid ${INK}`,
    borderRadius: 12,
    padding: "0 14px",
    font: "inherit",
    fontSize: 15,
    background: PANEL,
    color: INK,
  };

  return (
    <div
      className={animate ? "lb-anim ga-page" : "lb-anim lb-hold ga-page"}
      style={{
        minHeight: "100vh",
        background: PAGE_BG,
        fontFamily: DISP,
        color: INK,
        padding: "40px 24px 72px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ maxWidth: 1240, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
        <HeaderCard />

        {bodyReady && (
          <>
        {isAdmin && (
          <section className="ga-sec" style={{ background: "#FFFFFF", border: `2.5px solid ${INK}`, borderRadius: 28, padding: "22px 28px" }}>
            <h2 style={{ margin: 0, fontFamily: DISP, fontWeight: 700, fontSize: 20 }}>Upload Skills export</h2>
            <p style={{ margin: "4px 0 14px", fontSize: 14, color: MUTED }}>
              Admin only. Upload the Learn with Communities export (.csv or .xlsx).
            </p>
            <form onSubmit={handleUpdateSubmit} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <input type="file" required onChange={handleFile} className="lb-focus" style={{ ...inputStyle, flex: "1 1 280px", paddingTop: 9 }} />
              <button
                type="submit"
                className="lb-focus"
                style={{
                  minHeight: 44,
                  padding: "0 22px",
                  font: "inherit",
                  fontWeight: 700,
                  fontSize: 15,
                  background: YELLOW,
                  border: `2px solid ${INK}`,
                  borderRadius: 999,
                  color: INK,
                  cursor: "pointer",
                }}
              >
                Upload
              </button>
            </form>
            {typeError && <div style={{ marginTop: 10, fontSize: 14, color: "#B3261E" }}>{typeError}</div>}
            {uploadMsg && <div style={{ marginTop: 10, fontSize: 14, color: MUTED }}>{uploadMsg}</div>}
          </section>
        )}

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            role="group"
            aria-label="Show leaderboard for"
            style={{
              position: "relative",
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              width: "min(100%, 380px)",
              background: "#FFFFFF",
              border: `2.5px solid ${INK}`,
              borderRadius: 999,
              padding: 6,
              boxSizing: "border-box",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 6,
                bottom: 6,
                left: 6,
                width: "calc(50% - 6px)",
                borderRadius: 999,
                background: isTeams ? "#F086AE" : YELLOW,
                border: `2px solid ${INK}`,
                boxSizing: "border-box",
                transition: "transform .35s cubic-bezier(.3,1.4,.5,1), background-color .35s",
                transform: `translateX(${isTeams ? "100%" : "0"})`,
              }}
            />
            <button
              type="button"
              onClick={() => setView("players")}
              aria-pressed={!isTeams}
              className="lb-focus"
              style={{ position: "relative", zIndex: 1, minHeight: 48, background: "none", border: 0, borderRadius: 999, fontFamily: DISP, fontWeight: 700, fontSize: 17, color: INK, cursor: "pointer" }}
            >
              Players <span style={{ fontWeight: 600, opacity: 0.7 }}>{count}</span>
            </button>
            <button
              type="button"
              onClick={() => setView("teams")}
              aria-pressed={isTeams}
              className="lb-focus"
              style={{ position: "relative", zIndex: 1, minHeight: 48, background: "none", border: 0, borderRadius: 999, fontFamily: DISP, fontWeight: 700, fontSize: 17, color: INK, cursor: "pointer" }}
            >
              Teams <span style={{ fontWeight: 600, opacity: 0.7 }}>{teams.length}</span>
            </button>
          </div>
        </div>


        {data === null ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: MUTED }}>Loading leaderboard…</div>
        ) : !isTeams ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <Reveal>
            <section style={{ position: "relative", background: PANEL, border: `2.5px solid ${INK}`, borderRadius: 36, overflow: "hidden" }}>
              <SectionHead title="The Climb to Milestone 3" />
              <div className="lb-climb-body ga-climb" style={{ position: "relative", padding: "48px 28px 0", minHeight: 520, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <ul
                  className="lb-legend"
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: "10px 13px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 7,
                    background: "#FFFFFF",
                    border: `1.5px solid ${INK}`,
                    borderRadius: 12,
                    width: "fit-content",
                  }}
                >
                  {MS.map((m) => (
                    <li key={m.n} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: DIM, whiteSpace: "nowrap" }}>
                      <span style={{ width: 13, height: 13, borderRadius: 4, background: m.fill, border: `1.5px solid ${INK}`, boxSizing: "border-box", flex: "none" }} />
                      {m.need} badges
                    </li>
                  ))}
                </ul>
                <Reveal>
                <div style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(10px, 2vw, 20px)", alignItems: "end", maxWidth: 720, width: "100%", margin: "0 auto" }}>
                  {MS.map((m, i) => (
                    <div key={m.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                      <div className="lb-pop" style={{ textAlign: "center", animationDelay: `${0.5 + i * 0.18}s` }}>
                        <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1 }}>
                          {Math.round(reached[i] * t)}
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: DIM }}>reached</div>
                      </div>
                      <div
                        className="lb-rise"
                        style={{
                          width: "100%",
                          height: CLIMB_H[i],
                          background: m.fill,
                          border: `2.5px solid ${INK}`,
                          borderBottom: 0,
                          borderRadius: "24px 24px 0 0",
                          boxSizing: "border-box",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          gap: 4,
                          padding: "22px 8px",
                          textAlign: "center",
                          animationDelay: `${0.2 + i * 0.18}s`,
                        }}
                      >
                        <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: "clamp(18px, 2.4vw, 26px)" }}>Milestone {m.n}</span>
                      </div>
                    </div>
                  ))}
                </div>
                </Reveal>
              </div>
            </section>
            </Reveal>

            <Reveal>
            <section style={{ background: "#FFFFFF", border: `2.5px solid ${INK}`, borderRadius: 28, overflow: "hidden" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, padding: "24px 28px", borderBottom: `2px solid ${INK}` }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: DISP, fontWeight: 700, fontSize: 30 }}>Players</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: "0 1 320px" }}>
                  <label htmlFor="lb-search" style={{ fontSize: 13, fontWeight: 700 }}>Search participants</label>
                  <input
                    id="lb-search"
                    type="search"
                    className="lb-input lb-focus"
                    placeholder="Type a name"
                    value={q}
                    onChange={(e) => {
                      setQ(e.target.value);
                      setPage(1);
                    }}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <div style={{ minWidth: "var(--ga-pmin)" }}>
                  <div className="ga-cell" style={{ display: "grid", gridTemplateColumns: "var(--ga-pc)", gap: 16, alignItems: "center", ...headerCell }}>
                    <span>Rank</span><span>Participant</span><span className="ga-hide-sm">Badges</span><span>Count</span><span className="ga-hide-sm">Milestone</span><span>Profile</span>
                  </div>

                  {rows.map((p, i) => {
                    const rank = participants.indexOf(p) + 1;
                    const info = msFor(p.badges);
                    const top3 = rank <= 3;
                    return (
                      <div key={p.email || p.name + i} className="lb-row" style={{ borderTop: `1px solid ${LINE}` }}>
                        <div className="ga-cell" style={{ display: "grid", gridTemplateColumns: "var(--ga-pc)", gap: 16, alignItems: "center", padding: "12px 28px" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 40,
                              height: 40,
                              borderRadius: 12,
                              fontFamily: DISP,
                              fontWeight: 700,
                              fontSize: 17,
                              background: top3 ? GREEN : "transparent",
                              border: top3 ? `2px solid ${INK}` : "none",
                              boxSizing: "border-box",
                            }}
                          >
                            {rank}
                          </span>

                          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0, minHeight: 44 }}>
                            <span
                              style={{
                                width: 40,
                                height: 40,
                                flex: "none",
                                borderRadius: "50%",
                                background: p.badges ? (info ? info.fill : GREEN) : "#F2F3F5",
                                border: `2px solid ${INK}`,
                                boxSizing: "border-box",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontFamily: DISP,
                                fontWeight: 700,
                                fontSize: 14,
                              }}
                            >
                              {initialsOf(p.name)}
                            </span>
                            <span style={{ minWidth: 0, fontWeight: 700, fontSize: 15 }}>{p.name}</span>
                          </div>

                          <div className="ga-hide-sm" style={{ display: "flex", gap: 3 }} role="img" aria-label={`${p.badges} of ${BADGE_TOTAL} badges`}>
                            {Array.from({ length: BADGE_TOTAL }).map((_, k) => {
                              const on = k < p.badges;
                              return (
                                <span
                                  key={k}
                                  className={on ? "lb-pip-on" : undefined}
                                  style={{
                                    flex: 1,
                                    height: 12,
                                    borderRadius: 999,
                                    border: `1.5px solid ${on ? INK : "#D5D8DE"}`,
                                    background: on ? (info ? info.fill : GREEN) : "#FFFFFF",
                                    boxSizing: "border-box",
                                    animationDelay: `${0.2 + k * 0.04}s`,
                                  }}
                                />
                              );
                            })}
                          </div>

                          <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 20 }}>
                            {p.badges}
                            <span style={{ fontFamily: DISP, fontWeight: 500, fontSize: 13, color: MUTED }}> / {BADGE_TOTAL}</span>
                          </span>

                          <span
                            className="ga-hide-sm"
                            style={{
                              justifySelf: "start",
                              fontSize: 13,
                              fontWeight: 700,
                              padding: "6px 12px",
                              borderRadius: 999,
                              border: `1.5px solid ${info ? INK : "#D5D8DE"}`,
                              background: info ? info.soft : PANEL,
                            }}
                          >
                            {info ? `Milestone ${info.n}` : p.badges > 0 ? "On the way" : "Getting started"}
                          </span>

                          <span style={{ fontSize: 14, fontWeight: 600 }}>
                            {p.profileUrl ? (
                              <a href={p.profileUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#1F4FBF" }}>
                                View
                              </a>
                            ) : (
                              <span style={{ color: MUTED, fontWeight: 500 }}>—</span>
                            )}
                          </span>
                        </div>

                      </div>
                    );
                  })}

                  {rows.length === 0 && (
                    <div style={{ padding: "40px 28px", textAlign: "center", color: MUTED, fontSize: 15, borderTop: `1px solid ${LINE}` }}>
                      No participants match that search.
                    </div>
                  )}
                </div>
              </div>

              {filtered.length > 0 && (
                <nav
                  aria-label="Participant pages"
                  className="ga-pagernav"
                  style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 28px", borderTop: `1px solid ${LINE}` }}
                >
                  <span style={{ fontSize: 13, color: MUTED }}>
                    {startIndex + 1}–{Math.min(startIndex + PAGE_SIZE, filtered.length)} of {filtered.length}
                  </span>
                  <div className="ga-pager" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 6 }}>
                    <button
                      type="button"
                      onClick={() => setPage(safePage - 1)}
                      disabled={safePage <= 1}
                      className="lb-focus"
                      style={{ ...pageBtn, opacity: safePage <= 1 ? 0.4 : 1, cursor: safePage <= 1 ? "default" : "pointer" }}
                    >
                      Prev
                    </button>
                    {pageList.map((item, k) =>
                      item === "gap" ? (
                        <span key={`gap-${k}`} style={{ padding: "0 4px", color: MUTED }}>…</span>
                      ) : (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setPage(item)}
                          aria-current={item === safePage ? "page" : undefined}
                          className="lb-focus"
                          style={{
                            ...pageBtn,
                            minWidth: 40,
                            padding: 0,
                            background: item === safePage ? YELLOW : "#FFFFFF",
                            cursor: "pointer",
                          }}
                        >
                          {item}
                        </button>
                      )
                    )}
                    <button
                      type="button"
                      onClick={() => setPage(safePage + 1)}
                      disabled={safePage >= totalPages}
                      className="lb-focus"
                      style={{ ...pageBtn, opacity: safePage >= totalPages ? 0.4 : 1, cursor: safePage >= totalPages ? "default" : "pointer" }}
                    >
                      Next
                    </button>
                  </div>
                </nav>
              )}
            </section>
            </Reveal>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
            <Reveal>
            <section style={{ position: "relative", background: PANEL, border: `2.5px solid ${INK}`, borderRadius: 36, overflow: "hidden" }}>
              <SectionHead title="Top teams" />
              <div className="ga-climb" style={{ padding: "48px 28px 0", minHeight: 560, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <Reveal>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "clamp(10px, 2vw, 20px)", alignItems: "end", maxWidth: 760, width: "100%", margin: "0 auto" }}>
                  {podium.map((team, i) => {
                    const place = [2, 1, 3][i];
                    const cfg = POD[place];
                    const delay = [0.18, 0, 0.36][i];
                    return (
                      <div key={team.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, minWidth: 0 }}>
                        <div className="lb-pop" style={{ textAlign: "center", animationDelay: `${0.6 + delay}s` }}>
                          <div style={{ fontFamily: DISP, fontWeight: 700, fontSize: "clamp(20px, 2.6vw, 28px)", lineHeight: 1.1 }}>{team.name}</div>
                        </div>
                        <div
                          className="lb-rise"
                          style={{
                            width: "100%",
                            height: cfg.h,
                            background: cfg.fill,
                            border: `2.5px solid ${INK}`,
                            borderBottom: 0,
                            borderRadius: "24px 24px 0 0",
                            boxSizing: "border-box",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            gap: 8,
                            padding: "24px 8px",
                            textAlign: "center",
                            animationDelay: `${delay}s`,
                          }}
                        >
                          <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: "clamp(44px, 6vw, 72px)", lineHeight: 1 }}>{place}</span>
                          <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: "clamp(18px, 2.2vw, 24px)" }}>{Math.round(team.score * t)} badges</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                </Reveal>
              </div>
            </section>
            </Reveal>

            <Reveal>
            <section style={{ background: "#FFFFFF", border: `2.5px solid ${INK}`, borderRadius: 28, overflow: "hidden" }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, padding: "24px 28px", borderBottom: `2px solid ${INK}` }}>
                <div>
                  <h2 style={{ margin: 0, fontFamily: DISP, fontWeight: 700, fontSize: 30 }}>All Teams</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: "0 1 320px" }}>
                  <label htmlFor="lb-tsearch" style={{ fontSize: 13, fontWeight: 700 }}>Search teams</label>
                  <input
                    id="lb-tsearch"
                    type="search"
                    className="lb-input lb-focus"
                    placeholder="Mentor or member name"
                    value={tq}
                    onChange={(e) => setTq(e.target.value)}
                    style={inputStyle}
                  />
                </div>
              </div>

              <div style={{ overflowX: "auto" }}>
                <div style={{ minWidth: "var(--ga-tmin)" }}>
                  <div className="ga-cell" style={{ display: "grid", gridTemplateColumns: "var(--ga-tc)", gap: 16, alignItems: "center", ...headerCell }}>
                    <span>Rank</span><span>Team</span><span className="ga-hide-sm">Members</span><span>Badges</span><span>Finished</span>
                  </div>

                  {filteredTeams.map((team) => {
                    const rank = teams.indexOf(team) + 1;
                    const isOpen = !!topen[team.key];
                    const top3 = rank <= 3;
                    return (
                      <div key={team.key} className="lb-row" style={{ borderTop: `1px solid ${LINE}` }}>
                        <div
                          className="ga-cell"
                          onClick={() => setTopen((prev) => ({ ...prev, [team.key]: !prev[team.key] }))}
                          style={{ display: "grid", gridTemplateColumns: "var(--ga-tc)", gap: 16, alignItems: "center", padding: "12px 28px", cursor: "pointer" }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 40,
                              height: 40,
                              borderRadius: 12,
                              fontFamily: DISP,
                              fontWeight: 700,
                              fontSize: 17,
                              background: top3 ? GREEN : "transparent",
                              border: top3 ? `2px solid ${INK}` : "none",
                              boxSizing: "border-box",
                            }}
                          >
                            {rank}
                          </span>

                          <button
                            type="button"
                            aria-expanded={isOpen}
                            className="lb-focus"
                            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", minHeight: 44, background: "none", border: 0, padding: 0, font: "inherit", color: "inherit", textAlign: "left", cursor: "pointer" }}
                          >
                            <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 17 }}>{team.name}</span>
                            <span style={{ fontSize: 13, color: MUTED }}>{isOpen ? "Hide members" : "Show members"}</span>
                          </button>

                          <div className="ga-hide-sm" style={{ display: "flex", alignItems: "center" }}>
                            {team.members.slice(0, 7).map((m, k) => {
                              const info = msFor(m.badges);
                              return (
                                <span
                                  key={m.email || m.name + k}
                                  title={m.name}
                                  style={{
                                    width: 34,
                                    height: 34,
                                    flex: "none",
                                    borderRadius: "50%",
                                    background: m.badges ? (info ? info.fill : GREEN) : "#F2F3F5",
                                    border: `2px solid ${INK}`,
                                    boxSizing: "border-box",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontFamily: DISP,
                                    fontWeight: 700,
                                    fontSize: 12,
                                    marginLeft: k === 0 ? 0 : -10,
                                  }}
                                >
                                  {initialsOf(m.name)}
                                </span>
                              );
                            })}
                          </div>

                          <span style={{ fontFamily: DISP, fontWeight: 700, fontSize: 22 }}>{team.score}</span>

                          <span
                            style={{
                              justifySelf: "start",
                              fontSize: 14,
                              fontWeight: 700,
                              padding: "6px 12px",
                              borderRadius: 999,
                              background: team.finished ? "#CBEAFB" : "transparent",
                              border: team.finished ? `1.5px solid ${INK}` : "none",
                              color: team.finished ? INK : MUTED,
                            }}
                          >
                            {team.finished}
                          </span>
                        </div>

                        {isOpen && (
                          <div className="ga-members" style={{ padding: "0 28px 18px 108px", display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {team.members.map((m, k) => {
                              const info = msFor(m.badges);
                              const pillStyle: React.CSSProperties = {
                                fontSize: 13,
                                fontWeight: 600,
                                borderRadius: 999,
                                padding: "6px 12px",
                                border: `1.5px solid ${INK}`,
                                background: info ? info.soft : m.badges ? GREEN : "#FFFFFF",
                                color: INK,
                                textDecoration: "none",
                              };
                              const label = `${m.name} · ${m.badges} badge${m.badges === 1 ? "" : "s"}`;
                              return m.profileUrl ? (
                                <a
                                  key={m.email || m.name + k}
                                  href={m.profileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="lb-focus"
                                  style={pillStyle}
                                >
                                  {label}
                                </a>
                              ) : (
                                <span key={m.email || m.name + k} style={pillStyle}>
                                  {label}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {filteredTeams.length === 0 && (
                    <div style={{ padding: "40px 28px", textAlign: "center", color: MUTED, fontSize: 15, borderTop: `1px solid ${LINE}` }}>
                      No teams match that search.
                    </div>
                  )}
                </div>
              </div>
            </section>
            </Reveal>
          </div>
        )}

        <footer style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "0 8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <svg width="56" height="40" viewBox="0 0 60 40" fill="none" stroke={INK} strokeWidth={2} aria-hidden="true">
              <path d="M2 20h56M58 20c-10 0-20-6-20-18M58 20c-10 0-20 6-20 18" />
            </svg>
            <span style={{ fontSize: 14, color: DIM }}>
              Badge count looks wrong? Make sure your Google Skills profile is public, then ping the GDGC team.
            </span>
          </div>
        </footer>
          </>
        )}
      </div>
    </div>
  );
}

export default GenAi;
