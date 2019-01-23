const context = new AudioContext()

export function playSound(frequency: number) {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  oscillator.frequency.value = frequency;
  gain.connect(context.destination);
  oscillator.start(0);
  gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.1);
}
