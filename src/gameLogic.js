
export const GESTES = ['pierre', 'feuille', 'ciseaux'];
export const NOMS = { pierre: 'Pierre', feuille: 'Feuille', ciseaux: 'Ciseaux' };

const BAT = { pierre: 'ciseaux', feuille: 'pierre', ciseaux: 'feuille' };

export function tirerGesteIA() {
  return GESTES[Math.floor(Math.random() * GESTES.length)];
}


export function determinerGagnant(joueur, ia) {
  if (joueur === ia) return 'tie';
  if (BAT[joueur] === ia) return 'win';
  return 'lose';
}

export function creerScore() {
  return { you: 0, ia: 0, tie: 0 };
}

export function mettreAJourScore(scores, issue) {
  if (issue === 'win') scores.you++;
  else if (issue === 'lose') scores.ia++;
  else scores.tie++;
  return scores;
}