import { doigtsLeves, classifierGeste } from './gestureClassifier.js';

export async function demarrerDetection({ videoEl, canvasEl, onGesture, onStatus }) {
  const ctx = canvasEl.getContext('2d');

  const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
  });

  hands.setOptions({
    maxNumHands: 1,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  hands.onResults((results) => {
    canvasEl.width = videoEl.videoWidth || 640;
    canvasEl.height = videoEl.videoHeight || 480;
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    let geste = null;

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      const landmarks = results.multiHandLandmarks[0];
      const handedness = results.multiHandedness[0].label; // "Left" ou "Right"

      ctx.fillStyle = 'rgba(0,194,168,0.85)';
      for (const lm of landmarks) {
        ctx.beginPath();
        ctx.arc(lm.x * canvasEl.width, lm.y * canvasEl.height, 3, 0, 2 * Math.PI);
        ctx.fill();
      }

      const etats = doigtsLeves(landmarks, handedness);
      geste = classifierGeste(etats);
    }

    onGesture(geste);
  });

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    videoEl.srcObject = stream;
    await videoEl.play();
    onStatus('Cam pk,Montre ton geste puis lance une manche.', false);
  } catch (err) {
    onStatus(
      "Impossible daccederder a la camera",
      true
    );
    return;
  }

  async function boucle() {
    await hands.send({ image: videoEl });
    requestAnimationFrame(boucle);
  }
  boucle();
}