import { useId, useState } from "react";
import { api } from "./api.js";

// Draws the right input for one field from src/admin/schemas.js.
export default function FieldEditor({ field, value, onChange }) {
  const id = useId();
  const label = field.label && (
    <label className="adm-label" htmlFor={id}>
      {field.label}
    </label>
  );
  const help = field.help && <p className="adm-help">{field.help}</p>;

  switch (field.type) {
    case "text":
    case "number":
      return (
        <div className="adm-field">
          {label}
          <input
            id={id}
            type={field.type}
            value={value ?? ""}
            onChange={(e) =>
              onChange(field.type === "number" && e.target.value !== "" ? Number(e.target.value) : e.target.value)
            }
          />
          {help}
        </div>
      );

    case "textarea":
      return (
        <div className="adm-field">
          {label}
          <textarea id={id} rows={field.rows || 4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
          {help}
        </div>
      );

    case "lines":
    case "photos":
      return (
        <div className="adm-field">
          {label}
          <textarea
            id={id}
            rows={field.rows || 3}
            value={(value || []).join("\n")}
            onChange={(e) => onChange(e.target.value.split("\n"))}
          />
          {help}
        </div>
      );

    case "select":
      return (
        <div className="adm-field">
          {label}
          <select id={id} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
            <option value="">Choose</option>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {help}
        </div>
      );

    case "file":
      return <FileField id={id} label={label} help={help} value={value} onChange={onChange} />;

    case "object":
      return <ObjectFields fields={field.fields} value={value} onChange={onChange} />;

    case "list":
      return <ListField field={field} value={value} onChange={onChange} />;

    case "table":
      return <TableField field={field} value={value} onChange={onChange} />;

    default:
      return null;
  }
}

export function ObjectFields({ fields, value, onChange }) {
  const obj = value && typeof value === "object" ? value : {};
  return (
    <>
      {fields.map((f) => (
        <FieldEditor key={f.name} field={f} value={obj[f.name]} onChange={(v) => onChange({ ...obj, [f.name]: v })} />
      ))}
    </>
  );
}

function FileField({ id, label, help, value, onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function upload(e) {
    const file = e.target.files[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const { url } = await api("/upload", { method: "POST", file });
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const isImage = /\.(jpe?g|png|webp)$/i.test(value || "");
  return (
    <div className="adm-field">
      {label}
      <div className="adm-file">
        <input id={id} type="text" placeholder="No file yet" value={value ?? ""} onChange={(e) => onChange(e.target.value)} />
        <label className="adm-btn adm-btn--light">
          {busy ? "Uploading..." : "Upload"}
          <input type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" onChange={upload} disabled={busy} hidden />
        </label>
      </div>
      {isImage && <img className="adm-thumb" src={value} alt="" />}
      {value && !isImage && (
        <a className="adm-help" href={value} target="_blank" rel="noreferrer">
          Open the file
        </a>
      )}
      {error && <p className="adm-error">{error}</p>}
      {help}
    </div>
  );
}

function ListField({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(null);
  const name = field.itemName || "item";

  const set = (i, v) => onChange(items.map((it, j) => (j === i ? v : it)));
  const remove = (i) => {
    onChange(items.filter((_, j) => j !== i));
    setOpen(null);
  };
  const move = (i, by) => {
    const next = [...items];
    const [it] = next.splice(i, 1);
    next.splice(i + by, 0, it);
    onChange(next);
    setOpen(i + by);
  };
  const add = () => {
    onChange([...items, {}]);
    setOpen(items.length);
  };

  // the first filled text field is used as the row title
  const titleOf = (it) => {
    for (const f of field.fields) {
      const v = it && it[f.name];
      if ((f.type === "text" || f.type === "textarea") && v) return String(v).split("|").join(" ").slice(0, 70);
    }
    return `New ${name}`;
  };

  return (
    <div className="adm-field">
      {field.label && <p className="adm-label">{field.label}</p>}
      {field.help && <p className="adm-help">{field.help}</p>}
      <ul className="adm-list">
        {items.map((it, i) => (
          <li key={i} className={open === i ? "is-open" : ""}>
            <div className="adm-list__head">
              <button type="button" className="adm-list__title" onClick={() => setOpen(open === i ? null : i)}>
                <span>{open === i ? "−" : "+"}</span> {titleOf(it)}
              </button>
              <button type="button" className="adm-icon" disabled={i === 0} onClick={() => move(i, -1)} aria-label="Move up">
                ↑
              </button>
              <button type="button" className="adm-icon" disabled={i === items.length - 1} onClick={() => move(i, 1)} aria-label="Move down">
                ↓
              </button>
              <button type="button" className="adm-icon adm-icon--danger" onClick={() => remove(i)} aria-label={`Remove this ${name}`}>
                ✕
              </button>
            </div>
            {open === i && (
              <div className="adm-list__body">
                <ObjectFields fields={field.fields} value={it} onChange={(v) => set(i, v)} />
              </div>
            )}
          </li>
        ))}
      </ul>
      <button type="button" className="adm-btn adm-btn--light" onClick={add}>
        + Add {name}
      </button>
    </div>
  );
}

function TableField({ field, value, onChange }) {
  const head = value?.head || [];
  const rows = value?.rows || [];
  const cols = head.length;
  const update = (h, r) => onChange({ head: h, rows: r });

  if (cols === 0) {
    return (
      <div className="adm-field">
        <p className="adm-label">{field.label}</p>
        <button type="button" className="adm-btn adm-btn--light" onClick={() => update(["", ""], [["", ""]])}>
          + Add a table
        </button>
      </div>
    );
  }

  const cell = (r, c) => (rows[r] && rows[r][c]) ?? "";
  return (
    <div className="adm-field">
      <p className="adm-label">{field.label}</p>
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              {head.map((h, c) => (
                <th key={c}>
                  <input
                    aria-label={`Column ${c + 1} title`}
                    placeholder="Column title"
                    value={h}
                    onChange={(e) => update(head.map((x, j) => (j === c ? e.target.value : x)), rows)}
                  />
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map((_, r) => (
              <tr key={r}>
                {head.map((__, c) => (
                  <td key={c}>
                    <input
                      aria-label={`Row ${r + 1}, column ${c + 1}`}
                      value={cell(r, c)}
                      onChange={(e) =>
                        update(
                          head,
                          rows.map((row, i) =>
                            i === r ? head.map((___, j) => (j === c ? e.target.value : (row[j] ?? ""))) : row
                          )
                        )
                      }
                    />
                  </td>
                ))}
                <td>
                  <button type="button" className="adm-icon adm-icon--danger" aria-label={`Remove row ${r + 1}`} onClick={() => update(head, rows.filter((__, i) => i !== r))}>
                    ✕
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="adm-row">
        <button type="button" className="adm-btn adm-btn--light" onClick={() => update(head, [...rows, head.map(() => "")])}>
          + Add row
        </button>
        <button type="button" className="adm-btn adm-btn--light" onClick={() => update([...head, ""], rows.map((r) => [...r, ""]))}>
          + Add column
        </button>
        {cols > 1 && (
          <button type="button" className="adm-btn adm-btn--light" onClick={() => update(head.slice(0, -1), rows.map((r) => r.slice(0, cols - 1)))}>
            Remove last column
          </button>
        )}
        <button type="button" className="adm-btn adm-btn--light" onClick={() => onChange(undefined)}>
          Remove table
        </button>
      </div>
    </div>
  );
}
