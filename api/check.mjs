// Temporary diagnostics for the Apps Script endpoint — GET only, never writes. Remove after verification.
const URL_ = 'https://script.google.com/macros/s/AKfycbyJASOTVjsADghmzw_oVt1IlaO8w22mIdtY_QeKo-hZPtPEkIoM29Rqa5duh6eXLep7/exec';
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';
export default async function handler(req, res) {
  const out = {};
  for (const [k, opt] of Object.entries({ manual: { redirect: 'manual' }, follow: { redirect: 'follow' }, ua: { redirect: 'follow', headers: { 'User-Agent': UA } } })) {
    try { const r = await fetch(URL_, opt); const t = await r.text();
      out[k] = { status: r.status, location: r.headers.get('location'), body: t.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 300) }; }
    catch (e) { out[k] = { err: String(e) }; }
  }
  res.status(200).json(out);
}
