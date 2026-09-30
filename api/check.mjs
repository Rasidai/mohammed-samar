// One-time end-to-end test: posts a single clearly-labelled test row, the same way a guest's phone does. Removed right after.
const URL_ = 'https://script.google.com/macros/s/AKfycbyJASOTVjsADghmzw_oVt1IlaO8w22mIdtY_QeKo-hZPtPEkIoM29Rqa5duh6eXLep7/exec';
let done = false;
export default async function handler(req, res) {
  if (done) return res.status(200).json({ skipped: true });
  done = true;
  try {
    const r = await fetch(URL_, { method: 'POST', body: JSON.stringify({ name: 'اختبار — احذف هذا الصف', attend: 'no', guests: 0 }) });
    const t = await r.text();
    res.status(200).json({ status: r.status, body: t.slice(0, 200) });
  } catch (e) { res.status(200).json({ err: String(e) }); }
}
