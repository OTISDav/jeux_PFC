

import { demarrerDetection } from './handDetection.js';
import { creerScore, mettreAJourScore, tirerGesteIA, determinerGagnant } from './gameLogic.js';
import {
  getElements, afficherStatus, afficherGesteCourant, afficherScores,
  masquerResultat, afficherResultat, lancerCountdown
} from './ui.js';

const els = getElements();

let gesteActuel = null;
let etatJeu = 'attente';
let scores = creerScore();

function onGesture(geste) {
  gesteActuel = geste;
  if (etatJeu === 'attente') {
    afficherGesteCourant(els, geste);
  }
}

function onStatus(message, isError) {
  afficherStatus(els, message, isError);
}

function lancerManche() {
  if (etatJeu !== 'attente') return;
  etatJeu = 'compte';
  masquerResultat(els);
  els.btnPlay.disabled = true;

  lancerCountdown(els, () => {
    const joueur = gesteActuel || 'pierre'; // valeur par defaut si rien détect
    const ia = tirerGesteIA();
    const issue = determinerGagnant(joueur, ia);

    scores = mettreAJourScore(scores, issue);
    afficherScores(els, scores);
    afficherResultat(els, { joueur, ia, issue });

    etatJeu = 'attente';
    els.btnPlay.disabled = false;
  });
}

function reinitialiserScore() {
  scores = creerScore();
  afficherScores(els, scores);
  masquerResultat(els);
}

els.btnPlay.addEventListener('click', lancerManche);
els.btnReset.addEventListener('click', reinitialiserScore);

demarrerDetection({
  videoEl: document.getElementById('input-video'),
  canvasEl: document.getElementById('overlay'),
  onGesture,
  onStatus,
});