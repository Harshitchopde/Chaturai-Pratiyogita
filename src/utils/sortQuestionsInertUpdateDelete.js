export function diffQuestions(savedQuestions, currentQuestions) {
  const updates = [];
  const inserts = [];
  const deletes = [];

  const savedMap = new Map(savedQuestions.map(q => [q._id, q]));

  // check current vs saved
  for (const q of currentQuestions) {
    if (!q._id || q.isNew) {
      inserts.push(q);
    } else if (JSON.stringify(savedMap.get(q._id)) !== JSON.stringify(q)) {
      updates.push(q);
    }
  }

  // check deleted
  const currentIds = new Set(currentQuestions.map(q => q._id));
  for (const q of savedQuestions) {
    if (!currentIds.has(q._id)) {
      deletes.push(q);
    }
  }

  return { inserts, updates, deletes };
}
