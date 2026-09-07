function computeStats(investor, transactions) {
  const txns = transactions.filter(t => t.investor_id === investor.id);
  let profit = 0, repaid = 0, added = 0;
  txns.forEach(t => {
    const amt = Number(t.amount) || 0;
    if (t.type === 'profit') profit += amt;
    else if (t.type === 'repay') repaid += amt;
    else if (t.type === 'addcap') added += amt;
  });
  const position = Number(investor.capital || 0) + added - repaid;
  const monthlyRate = investor.rate_type === 'annual' ? Number(investor.rate) / 12 : Number(investor.rate);
  const upcomingPayout = Math.max(position, 0) * (monthlyRate / 100);

  // Next due date: dueDay of the month after the latest recorded transaction month,
  // or from the investor's start date if no transactions yet.
  const dueDay = Number(investor.due_day) || 10;
  let base;
  if (txns.length) {
    const sortedMonths = txns.map(t => t.month).filter(Boolean).sort();
    const latest = sortedMonths[sortedMonths.length - 1];
    base = latest ? new Date(latest + '-01T00:00:00') : new Date(investor.start_date || Date.now());
  } else {
    base = new Date(investor.start_date || Date.now());
  }
  const nextDue = new Date(base.getFullYear(), base.getMonth() + 1, dueDay);

  return {
    profit, repaid, added, position, upcomingPayout,
    nextDueDate: nextDue.toISOString().slice(0, 10),
    transactionCount: txns.length,
  };
}

module.exports = { computeStats };
