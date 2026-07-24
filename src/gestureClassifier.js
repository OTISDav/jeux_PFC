
const FINGER_TIPS = [4, 8, 12, 16, 20];
const FINGER_PIPS = [3, 6, 10, 14, 18];


export function doigtsLeves(landmarks, handedness) {
  const etats = [];


  const pouceLeve = handedness === 'Right'
    ? landmarks[FINGER_TIPS[0]].x < landmarks[FINGER_PIPS[0]].x
    : landmarks[FINGER_TIPS[0]].x > landmarks[FINGER_PIPS[0]].x;
  etats.push(pouceLeve);


  for (let i = 1; i < 5; i++) {
    etats.push(landmarks[FINGER_TIPS[i]].y < landmarks[FINGER_PIPS[i]].y);
  }

  return etats;
}


export function classifierGeste(etats) {
  const nbLeves = etats.filter(Boolean).length;
  const [, index, majeur, annulaire, auriculaire] = etats;

  if (nbLeves === 0) return 'pierre';
  if (nbLeves >= 4) return 'feuille';
  if (index && majeur && !annulaire && !auriculaire) return 'ciseaux';
  return null;
}