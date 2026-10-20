import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { defaults, mergeContent, useContent } from "../content.jsx";
import { api, getToken, setToken } from "./api.js";
import FieldEditor from "./FieldEditor.jsx";
import { editors } from "./schemas.js";
import "./admin.css";

// Removes empty leftovers before saving: blank lines, empty rows, unused parts
// of a section. This keeps the pages from showing empty headings or tables.
function clean(v) {
  if (Array.isArray(v)) {
    const arr = v.map(clean).filter((x) => x !== undefined);
    return arr.length ? arr : undefined;
  }
  if (v && typeof v === "object") {
    if ("head" in v && "rows" in v) {
      const head = (v.head || []).map((h) => String(h ?? "").trim());
      const rows = (v.rows || [])
        .map((r) => head.map((_, i) => String((r && r[i]) ?? "").trim()))
        .filter((r) => r.some(Boolean));
      return head.some(Boolean) || rows.length ? { head, rows } : undefined;
    }
    const out = {};
    for (const [k, val] of Object.entries(v)) {
      const c = clean(val);
      if (c !== undefined) out[k] = c;
    }
    return Object.keys(out).length ? out : undefined;
  }
  if (typeof v === "string") return v.trim() === "" ? undefined : v.trim();
  return v === null ? undefined : v;
}

// The current value of one editor: the saved change if there is one, else the built-in content.
function valueFor(id, content) {
  if (id.startsWith("page:")) return content.pages[id.slice(5)];
  return content[id];
}

function Login({ onDone }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const { token } = await api("/auth/login", { method: "POST", body: { email, password } });
      setToken(token);
      onDone();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="adm-login">
      <form onSubmit={submit}>
        <h1>School admin</h1>
        <p>Log in to change the website content.</p>
        <label className="adm-label" htmlFor="adm-email">
          Username
        </label>
        <input id="adm-email" type="text" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className="adm-label" htmlFor="adm-password">
          Password
        </label>
        <input id="adm-password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="adm-error">{error}</p>}
        <button className="adm-btn" disabled={busy}>
          {busy ? "Logging in..." : "Log in"}
        </button>
        <Link to="/">Back to the website</Link>
      </form>
    </div>
  );
}

function Account() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [msg, setMsg] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setMsg(null);
    try {
      await api("/auth/password", { method: "POST", body: { current, next } });
      setMsg({ ok: true, text: "Password changed." });
      setCurrent("");
      setNext("");
    } catch (err) {
      setMsg({ ok: false, text: err.message });
    }
  }

  return (
    <form onSubmit={submit} className="adm-narrow">
      <div className="adm-field">
        <label className="adm-label" htmlFor="adm-cur">
          Current password
        </label>
        <input id="adm-cur" type="password" autoComplete="current-password" required value={current} onChange={(e) => setCurrent(e.target.value)} />
      </div>
      <div className="adm-field">
        <label className="adm-label" htmlFor="adm-new">
          New password (8 or more characters)
        </label>
        <input id="adm-new" type="password" autoComplete="new-password" minLength={8} required value={next} onChange={(e) => setNext(e.target.value)} />
      </div>
      {msg && <p className={msg.ok ? "adm-ok" : "adm-error"}>{msg.text}</p>}
      <button className="adm-btn">Change password</button>
    </form>
  );
}

function Editor({ editor, onLoggedOut }) {
  const content = useContent();
  const { saved, reload } = content;
  const original = valueFor(editor.id, content);
  const [draft, setDraft] = useState(original);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const isChanged = editor.id in saved;

  // warn before closing the tab with unsaved changes
  useEffect(() => {
    if (!dirty) return;
    const warn = (e) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function run(action, doneText) {
    setBusy(true);
    setStatus(null);
    try {
      await action();
      await reload();
      setDirty(false);
      setStatus({ ok: true, text: doneText });
    } catch (err) {
      if (err.status === 401) return onLoggedOut();
      setStatus({ ok: false, text: err.message });
    } finally {
      setBusy(false);
    }
  }

  const save = () => {
    const data = clean(draft) ?? (editor.type === "object" ? {} : editor.type === "textarea" ? "" : []);
    return run(() => api(`/content/${editor.id}`, { method: "PUT", body: { data } }), "Saved. The website is updated.");
  };

  const reset = async () => {
    await run(() => api(`/content/${editor.id}`, { method: "DELETE" }), "Back to the original content.");
    const id = editor.id;
    setDraft(id.startsWith("page:") ? defaults.pages[id.slice(5)] : mergeContent({})[id]);
  };

  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <>
      <div className="adm-editor">
        <FieldEditor
          field={{ ...editor, label: undefined }}
          value={draft}
          onChange={(v) => {
            setDraft(v);
            setDirty(true);
            setStatus(null);
          }}
        />
      </div>

      <div className="adm-savebar">
        <button className="adm-btn" onClick={save} disabled={busy || !dirty}>
          {busy ? "Saving..." : "Save changes"}
        </button>
        {dirty && <span className="adm-note">You have unsaved changes.</span>}
        {status && <span className={status.ok ? "adm-ok" : "adm-error"}>{status.text}</span>}
        <span className="adm-spacer" />
        {isChanged &&
          (confirmReset ? (
            <>
              <span className="adm-note">Remove your changes to this section?</span>
              <button
                className="adm-btn adm-btn--danger"
                disabled={busy}
                onClick={() => {
                  setConfirmReset(false);
                  reset();
                }}
              >
                Yes, reset
              </button>
              <button className="adm-btn adm-btn--light" onClick={() => setConfirmReset(false)}>
                Keep them
              </button>
            </>
          ) : (
            <button className="adm-btn adm-btn--light" disabled={busy} onClick={() => setConfirmReset(true)}>
              Reset to original
            </button>
          ))}
      </div>
    </>
  );
}

export default function AdminApp() {
  const [state, setState] = useState(getToken() ? "checking" : "out");
  const [email, setEmail] = useState("");
  const [current, setCurrent] = useState(editors[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const { saved, reload } = useContent();

  const logout = () => {
    setToken("");
    setState("out");
  };

  // check that the saved login is still valid
  useEffect(() => {
    if (state !== "checking") return;
    // also load the newest saved content before showing any form
    Promise.all([api("/auth/me"), reload()])
      .then(([d]) => {
        setEmail(d.email);
        setState("in");
      })
      .catch(logout);
  }, [state]);

  const groups = useMemo(() => {
    const out = [];
    for (const e of editors) {
      let g = out.find((x) => x.name === e.group);
      if (!g) out.push((g = { name: e.group, items: [] }));
      g.items.push(e);
    }
    return out;
  }, []);

  if (state === "out") return <Login onDone={() => setState("checking")} />;
  if (state === "checking") return <p className="adm-loading">Loading...</p>;

  const editor = editors.find((e) => e.id === current);

  return (
    <div className="adm">
      <header className="adm-top">
        <button className="adm-menu-btn" onClick={() => setMenuOpen((v) => !v)} aria-expanded={menuOpen}>
          Menu
        </button>
        <strong>School admin</strong>
        <span className="adm-spacer" />
        <Link to="/" target="_blank">
          View website
        </Link>
        <button className="adm-link" onClick={logout}>
          Log out
        </button>
      </header>

      <div className="adm-body">
        <nav className={`adm-side ${menuOpen ? "is-open" : ""}`}>
          {groups.map((g) => (
            <div key={g.name}>
              <h2>{g.name}</h2>
              {g.items.map((e) => (
                <button
                  key={e.id}
                  className={current === e.id ? "is-active" : ""}
                  onClick={() => {
                    setCurrent(e.id);
                    setMenuOpen(false);
                  }}
                >
                  {e.title}
                  {e.id in saved && <i title="You have changed this section" />}
                </button>
              ))}
            </div>
          ))}
          <div>
            <h2>Account</h2>
            <button
              className={current === "account" ? "is-active" : ""}
              onClick={() => {
                setCurrent("account");
                setMenuOpen(false);
              }}
            >
              Change password
            </button>
          </div>
        </nav>

        <main className="adm-main">
          {current === "account" ? (
            <>
              <h1>Change password</h1>
              <p className="adm-help">Logged in as {email}</p>
              <Account />
            </>
          ) : (
            <>
              <h1>{editor.title}</h1>
              {editor.help && <p className="adm-help">{editor.help}</p>}
              {/* "key" gives each section its own fresh form */}
              <Editor key={editor.id} editor={editor} onLoggedOut={logout} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}
