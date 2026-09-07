function esc(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function fmt(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

function buildAgreementHtml(investor) {
  const companyName = process.env.COMPANY_NAME || 'YOUR COMPANY NAME PVT LTD';
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const rateStr = `${investor.rate}% ${investor.rate_type === 'annual' ? 'per annum' : 'per month'}`;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Investment Partnership Agreement - ${esc(investor.name)}</title>
  <style>
    body{font-family:Georgia,serif;max-width:760px;margin:40px auto;color:#1B2430;line-height:1.7;padding:0 24px;}
    h1{font-size:22px;text-align:center;margin-bottom:4px;}
    .sub{text-align:center;color:#6B6459;font-size:13px;margin-bottom:30px;}
    h2{font-size:15px;border-bottom:1px solid #D9D2C1;padding-bottom:6px;margin-top:28px;}
    table{width:100%;border-collapse:collapse;margin:14px 0;}
    td{padding:6px 8px;border:1px solid #D9D2C1;font-size:13px;}
    .sign{margin-top:60px;display:flex;justify-content:space-between;}
    .sign div{width:45%;border-top:1px solid #1B2430;padding-top:6px;font-size:12px;text-align:center;}
    .note{font-size:11px;color:#6B6459;margin-top:40px;border-top:1px solid #D9D2C1;padding-top:10px;}
  </style></head><body>
    <h1>Investment Partnership Agreement</h1>
    <div class="sub">Between ${esc(companyName)} and ${esc(investor.name)} — Draft dated ${today}</div>

    <h2>1. Parties</h2>
    <p>This agreement is made between <b>${esc(companyName)}</b> ("the Company") and <b>${esc(investor.name)}</b> ("the Investor"), for the deployment of capital under a profit-sharing partnership arrangement.</p>

    <h2>2. Investment Details</h2>
    <table>
      <tr><td>Investor Name</td><td>${esc(investor.name)}</td></tr>
      <tr><td>Contact Number</td><td>${esc(investor.phone || '—')}</td></tr>
      <tr><td>Alternative Number</td><td>${esc(investor.alt_phone || '—')}</td></tr>
      <tr><td>Capital Deployed</td><td>${fmt(investor.capital)}</td></tr>
      <tr><td>Effective Date</td><td>${esc(investor.start_date || '—')}</td></tr>
      <tr><td>Rate of Return</td><td>${rateStr}</td></tr>
      <tr><td>KYC Status</td><td>${investor.kyc ? 'Completed' : 'Pending'}</td></tr>
    </table>

    <h2>3. Returns</h2>
    <p>The Company shall pay the Investor a return of ${rateStr} on the capital deployed, payable monthly, subject to the terms recorded in the Company's transaction ledger. Repayment of capital, whether in part or full, shall be recorded and communicated as it occurs.</p>

    <h2>4. Additional Terms</h2>
    <p>${esc(investor.notes) || 'No additional terms specified.'}</p>

    <h2>5. Signatures</h2>
    <div class="sign">
      <div>For ${esc(companyName)}</div>
      <div>${esc(investor.name)} (Investor)</div>
    </div>

    <div class="note">This is a draft document generated for internal record-keeping and is not a substitute for legal advice. Please have this reviewed and formalised by a qualified legal professional before execution.</div>
  </body></html>`;
}

module.exports = { buildAgreementHtml };
