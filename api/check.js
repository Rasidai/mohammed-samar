// Temporary: verifies the Apps Script deployment ID read from a photo (I/l and O/0 look alike).
// GET only — never writes to the sheet. Remove after verification.
const BASE = 'AKfycbyJASOTVjsADghmzw_oVt1IlaO8w22mIdtY_QeKo-hZPtPEkIoM29Rqa5duh6eXLep7';
const SWAP = { I: 'l', l: 'I', O: '0', '0': 'O' };
export default async function handler(req, res) {
  const pos = [...BASE].map((c, i) => (SWAP[c] ? i : -1)).filter(i => i >= 0);
  const variants = [];
  for (let m = 0; m < (1 << pos.length); m++) {
    const a = [...BASE]; pos.forEach((p, k) => { if (m & (1 << k)) a[p] = SWAP[a[p]]; }); variants.push(a.join(''));
  }
  const out = [];
  for (let i = 0; i < variants.length; i += 16) {
    const batch = variants.slice(i, i + 16);
    const r = await Promise.all(batch.map(async id => {
      try { const x = await fetch(`https://script.google.com/macros/s/${id}/exec`, { redirect: 'manual' });
        const t = x.status === 200 ? (await x.text()).slice(0, 400) : ''; return { id, s: x.status, doGet: /doGet/.test(t) }; }
      catch (e) { return { id, s: 'err' }; }
    }));
    out.push(...r.filter(v => v.s !== 404));
  }
  res.status(200).json({ tried: variants.length, hits: out });
}
