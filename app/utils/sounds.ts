// Simple sound effects using Web Audio API
let audioContext: AudioContext | null = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Play a success sound (happy beep)
export function playSuccessSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 523.25; // C5
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);

    // Second note
    const oscillator2 = ctx.createOscillator();
    const gainNode2 = ctx.createGain();

    oscillator2.connect(gainNode2);
    gainNode2.connect(ctx.destination);

    oscillator2.frequency.value = 659.25; // E5
    oscillator2.type = 'sine';

    gainNode2.gain.setValueAtTime(0.3, ctx.currentTime + 0.1);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

    oscillator2.start(ctx.currentTime + 0.1);
    oscillator2.stop(ctx.currentTime + 0.6);
  } catch (error) {
    console.log('Audio not available');
  }
}

// Play an encouraging sound (gentle tone)
export function playEncouragementSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 440; // A4
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.4);
  } catch (error) {
    console.log('Audio not available');
  }
}

// Play a click sound (button press)
export function playClickSound() {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  } catch (error) {
    console.log('Audio not available');
  }
}

// Play a star collection sound
export function playStarSound() {
  try {
    const ctx = getAudioContext();

    // Create multiple tones for a magical effect
    const frequencies = [523.25, 659.25, 783.99]; // C5, E5, G5

    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      const startTime = ctx.currentTime + (index * 0.1);
      gainNode.gain.setValueAtTime(0.15, startTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

      oscillator.start(startTime);
      oscillator.stop(startTime + 0.4);
    });
  } catch (error) {
    console.log('Audio not available');
  }
}

export const encouragingMessages = [
  "You're doing great! 🌟",
  "Keep it up! 💪",
  "Awesome job! 🎉",
  "You're so smart! 🧠",
  "Way to go! 🚀",
  "Super work! ⭐",
  "Fantastic! 🎨",
  "You rock! 🎸",
  "Amazing! 🌈",
  "Perfect! 💎",
];

export function getRandomEncouragement(): string {
  return encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
}
