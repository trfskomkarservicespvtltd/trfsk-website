// Minimal CSV writer — no dependencies, so no supply-chain risk.
// Excel, Google Sheets, and Numbers all open CSV files natively.

function csvEscape(val) {
  const s = String(val ?? '');
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function toCsv(rows) {
  return rows.map(row => row.map(csvEscape).join(',')).join('\r\n');
}

function buildExportCsv(investors, transactions) {
  const { computeStats } = require('./stats');

  const invRows = [
    ['Investor ID','Name','Phone','Alt Phone','Capital','Rate','Rate Type','Due Day','KYC','Start Date',
     'Current Position','Total Profit Earned','Total Capital Returned','Next Due Date'],
  ];
  investors.forEach(inv => {
    const s = computeStats(inv, transactions);
    invRows.push([
      inv.id, inv.name, inv.phone, inv.alt_phone, inv.capital, inv.rate, inv.rate_type, inv.due_day,
      inv.kyc ? 'Yes' : 'No', inv.start_date,
      s.position, s.profit, s.repaid, s.nextDueDate,
    ]);
  });

  const txnRows = [
    ['Transaction ID','Investor ID','Investor Name','Month','Type','Amount','Transaction Number','Due Date','Status','Note'],
  ];
  const investorNameById = Object.fromEntries(investors.map(i => [i.id, i.name]));
  transactions
    .slice()
    .sort((a,b) => (a.month < b.month ? 1 : -1))
    .forEach(t => {
      txnRows.push([
        t.id, t.investor_id, investorNameById[t.investor_id] || '—', t.month, t.type,
        t.amount, t.txn_number, t.due_date, t.status, t.note,
      ]);
    });

  return {
    investorsCsv: toCsv(invRows),
    transactionsCsv: toCsv(txnRows),
  };
}

module.exports = { buildExportCsv };
