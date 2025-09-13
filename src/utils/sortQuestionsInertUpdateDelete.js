// Use a dedicated deep comparison function for only relevant fields
function areQuestionsEqual(q1, q2) {
  if (
    q1.questionDesc !== q2.questionDesc ||
    q1.questionType !== q2.questionType ||
    q1.points !== q2.points ||
    String(q1.correctAnswer) !== String(q2.correctAnswer) ||  
    String(q1.correctAnswerId) !== String(q2.correctAnswerId) ||
    q1.explanation !== q2.explanation
  ) {
    return false;
  }
  if (q1.options.length !== q2.options.length) return false;
  for (let i = 0; i < q1.options.length; ++i) {
    const o1 = q1.options[i], o2 = q2.options[i];
    if (
      o1.text !== o2.text ||
      Boolean(o1.isCorrect) !== Boolean(o2.isCorrect) ||
      String(o1._id || '') !== String(o2._id || '')
    ) {
      return false;
    }
  }
  return true;
}

function diffObjects(base, current) {
  const diff = { _id: current._id }; // always include id
  for (const key of Object.keys(current)) {
    if (key === "_id") continue;
    if (JSON.stringify(base[key]) !== JSON.stringify(current[key])) {
      diff[key] = current[key];
    }
  }
  return diff;
}

export function diffQuestions(savedQuestions, currentQuestions) {
  const updates = [];
  const inserts = [];
  const deletes = [];

  const savedMap = new Map(savedQuestions.map(q => [String(q._id), q]));

  for (const q of currentQuestions) {
    if (!q._id || q.isNew) {
      inserts.push(q);
    } else {
      const saved = savedMap.get(String(q._id));
      if (!saved) {
        updates.push({ _id: q._id, ...q }); // fallback
      } else if (!areQuestionsEqual(saved, q)) {
        updates.push(diffObjects(saved, q)); // only changed fields
      }
    }
  }

  const currentIds = new Set(currentQuestions.map(q => String(q._id || "")));
  for (const q of savedQuestions) {
    if (!currentIds.has(String(q._id))) {
      deletes.push({ _id: q._id }); // only send id
    }
  }

  return { inserts, updates, deletes };
}
