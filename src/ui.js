
import { NOMS } from './gameLogic.js';

export function getElements() {
  return {
    viewfinder: document.getElementById('viewfinder'),
    gestureTag: document.querySelector('#gesture-tag b'),
    countdownEl: document.getElementById('countdown'),
    countdownNum: document.getElementById('countdown-num'),
    resultBanner: document.getElementById('result-banner'),
    resYou: document.getElementById('res-you'),
    resIa: document.getElementById('res-ia'),
    resVerdict: document.getElementById('res-verdict'),
    btnPlay: document.getElementById('btn-play'),
    btnReset: document.getElementById('btn-reset'),
    statusEl: document.getElementById('status'),
    valYou: document.getElementById('val-you'),
    valIa: document.getElementById('val-ia'),
    valTie: document.getElementById('val-tie'),
  };
}

export function afficherStatus(els, message, isError) {
  els.statusEl.textContent = message;
  els.statusEl.classList.toggle('error', !!isError);
}

export function afficherGesteCourant(els, geste) {
  els.gestureTag.textContent = geste ? NOMS[geste] : '—';
}

export function afficherScores(els, scores) {
  els.valYou.textContent = scores.you;
  els.valIa.textContent = scores.ia;
  els.valTie.textContent = scores.tie;
}

export function masquerResultat(els) {
  els.resultBanner.classList.remove('show');
  els.viewfinder.classList.remove('locked');
}

export function afficherResultat(els, { joueur, ia, issue }) {
  els.resYou.textContent = NOMS[joueur];
  els.resIa.textContent = NOMS[ia];

  const textes = { win: 'Tu as gagne ', lose: "L'IA gagne", tie: 'Egalite' };
  els.resVerdict.textContent = textes[issue];
  els.resVerdict.className = `verdict ${issue}`;

  if (issue === 'win') els.viewfinder.classList.add('locked');
  els.resultBanner.classList.add('show');
}


export function lancerCountdown(els, onFin) {
  let restant = 3;
  els.countdownEl.style.display = 'flex';
  els.countdownNum.textContent = restant;

  const interval = setInterval(() => {
    restant -= 1;
    if (restant > 0) {
      els.countdownNum.textContent = restant;
    } else {
      clearInterval(interval);
      els.countdownNum.textContent = '🖐';
      setTimeout(() => {
        els.countdownEl.style.display = 'none';
        onFin();
      }, 400);
    }
  }, 700);
}

