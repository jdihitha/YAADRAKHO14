// Web Audio API generator for zero-latency, rich interactive festive sound effects

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isUnlocked: boolean = false;

  constructor() {
    // Read saved preference
    const saved = localStorage.getItem('yaadrakho_muted') || localStorage.getItem('judam_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }

    // Bind auto-unlock to the first user gesture anywhere on window/document
    if (typeof window !== 'undefined') {
      const unlockHandler = () => {
        this.unlockAudio();
        ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach((ev) => {
          window.removeEventListener(ev, unlockHandler);
        });
      };
      ['click', 'touchstart', 'touchend', 'pointerdown', 'keydown'].forEach((ev) => {
        window.addEventListener(ev, unlockHandler, { passive: true, once: true });
      });
    }
  }

  // Public method to explicitly unlock and prime audio context on user interaction
  public unlockAudio() {
    this.initCtx();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    this.isUnlocked = true;
  }

  public initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('yaadrakho_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.unlockAudio();
      this.playButtonClick();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Helper: Create a quick filtered noise burst (crunch, rustle, snap)
  private playNoiseBurst(
    startTime: number,
    durationSec: number,
    filterFreq: number,
    volume: number = 0.1,
    filterType: BiquadFilterType = 'bandpass'
  ) {
    if (!this.ctx) return;
    try {
      const sampleRate = this.ctx.sampleRate;
      const bufferSize = Math.max(128, Math.floor(sampleRate * durationSec));
      const buffer = this.ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      // Generate soft pink/white noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Simple 1-pole filter for pink-like texture
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
      }

      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = filterType;
      filter.frequency.setValueAtTime(filterFreq, startTime);
      filter.Q.value = 2.0;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + durationSec);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noiseSource.start(startTime);
      noiseSource.stop(startTime + durationSec);
    } catch {
      // ignore
    }
  }

  /**
   * Helper: Generate textured, crispy crunch crackles (bold "cook/crunch" texture)
   */
  private playCrunchCrackles(startTime: number, count: number = 3, baseFreq: number = 2400, volume: number = 0.55) {
    if (!this.ctx) return;
    const ctx = this.ctx;
    try {
      for (let c = 0; c < count; c++) {
        const offset = startTime + c * 0.022 + Math.random() * 0.006;
        const dur = 0.045 + Math.random() * 0.025;
        const bufferSize = Math.max(128, Math.floor(ctx.sampleRate * dur));
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);

        // High-energy textured grain with natural decay
        for (let i = 0; i < bufferSize; i++) {
          const env = 1 - (i / bufferSize);
          data[i] = (Math.random() * 2 - 1) * Math.pow(env, 1.4);
        }

        const src = ctx.createBufferSource();
        src.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(baseFreq + (c * 300) + (Math.random() * 200 - 100), offset);
        filter.Q.value = 2.4;

        const gain = ctx.createGain();
        const v = volume * (1 - c * 0.12);
        gain.gain.setValueAtTime(v, offset);
        gain.gain.exponentialRampToValueAtTime(0.001, offset + dur);

        src.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        src.start(offset);
        src.stop(offset + dur);
      }
    } catch {
      // ignore
    }
  }

  // ================= 1. GANESHA EATING SOUNDS (ORGANIC, DELICIOUS, BOLD "COOK" CRUNCH) =================

  /**
   * Play specific bite munch sound:
   * - biteNum 1: Bold, crunchy first bite ("COOK / CRUNCH-CHOMP!")
   * - biteNum 2: Hearty, textured double mastication ("KRUK-KRUK / MUNCH-MUNCH!")
   * - biteNum 3: Deep, satisfying sweet gulp into tummy ("GULP / KHUK!")
   */
  public playBiteChomp(biteNum: 1 | 2 | 3 = 1) {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      if (biteNum === 1) {
        // --- BITE 1: Bold "COOK" Crunchy Chomp into Golden Modak ---
        // 1. Triple-burst crisp shell crackles (bold "krr-ch / cook" texture)
        this.playCrunchCrackles(t, 3, 2600, 0.52);

        // 2. Heavy jaw thump (firm, bold bite impact)
        const jawOsc = ctx.createOscillator();
        const jawGain = ctx.createGain();
        jawOsc.type = 'triangle';
        jawOsc.frequency.setValueAtTime(260, t);
        jawOsc.frequency.exponentialRampToValueAtTime(65, t + 0.08);

        jawGain.gain.setValueAtTime(0.48, t);
        jawGain.gain.exponentialRampToValueAtTime(0.001, t + 0.095);

        jawOsc.connect(jawGain);
        jawGain.connect(ctx.destination);
        jawOsc.start(t);
        jawOsc.stop(t + 0.1);

        // 3. Resonant mouth cavity closing formant ("khuk / chomp")
        const mouthOsc = ctx.createOscillator();
        const mouthGain = ctx.createGain();
        mouthOsc.type = 'sine';
        mouthOsc.frequency.setValueAtTime(380, t);
        mouthOsc.frequency.exponentialRampToValueAtTime(140, t + 0.07);

        mouthGain.gain.setValueAtTime(0.35, t);
        mouthGain.gain.exponentialRampToValueAtTime(0.001, t + 0.075);

        mouthOsc.connect(mouthGain);
        mouthGain.connect(ctx.destination);
        mouthOsc.start(t);
        mouthOsc.stop(t + 0.08);
      } else if (biteNum === 2) {
        // --- BITE 2: Bold Double-Munch / Chew ("KRUK-KRUK / NOM-NOM!") ---
        const munches = [0, 0.1];
        munches.forEach((dt, idx) => {
          // Crunchy crackle on each munch
          this.playCrunchCrackles(t + dt, 2, 2200 + idx * 300, 0.45);

          // Bold jaw chew body
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(230 + idx * 30, t + dt);
          osc.frequency.exponentialRampToValueAtTime(75, t + dt + 0.07);

          gain.gain.setValueAtTime(0.42, t + dt);
          gain.gain.exponentialRampToValueAtTime(0.001, t + dt + 0.075);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t + dt);
          osc.stop(t + dt + 0.08);
        });
      } else {
        // --- BITE 3: Deep Satisfying Gulp & Mouth Smack ("GULP / KHUK!") ---
        // Crisp lip smack
        this.playCrunchCrackles(t, 2, 1900, 0.38);

        // Deep resonant throat gulp
        const gulpOsc = ctx.createOscillator();
        const gulpGain = ctx.createGain();
        gulpOsc.type = 'sine';
        gulpOsc.frequency.setValueAtTime(240, t);
        gulpOsc.frequency.exponentialRampToValueAtTime(95, t + 0.06);
        gulpOsc.frequency.linearRampToValueAtTime(130, t + 0.11);

        gulpGain.gain.setValueAtTime(0.50, t);
        gulpGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        gulpOsc.connect(gulpGain);
        gulpGain.connect(ctx.destination);
        gulpOsc.start(t);
        gulpOsc.stop(t + 0.13);
      }
    } catch {
      // ignore
    }
  }

  // Alias for backward compatibility
  public playEatingSound() {
    this.playBiteChomp(1);
  }

  /**
   * Divine satisfaction tone when Ganesha finishes eating:
   * Adorable warm "Mmm!" harmonic resonance + twin sparkling celestial temple chimes
   */
  public playYumBlessing() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      // 1. Warm satisfied "Mmm!" vocal hum
      const humFreqs = [440, 554.37]; // A4, C#5 warm sweet chord
      humFreqs.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.linearRampToValueAtTime(freq * 1.03, t + 0.15);
        osc.frequency.linearRampToValueAtTime(freq, t + 0.35);

        gain.gain.setValueAtTime(0.01, t);
        gain.gain.linearRampToValueAtTime(0.12, t + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.45);
      });

      // 2. Divine golden bell chimes (C6 & G6)
      const bells = [
        { f: 1046.5, delay: 0.12 },
        { f: 1567.98, delay: 0.22 },
      ];
      bells.forEach((bell) => {
        const bOsc = ctx.createOscillator();
        const bGain = ctx.createGain();
        bOsc.type = 'sine';
        bOsc.frequency.setValueAtTime(bell.f, t + bell.delay);

        bGain.gain.setValueAtTime(0.001, t + bell.delay);
        bGain.gain.linearRampToValueAtTime(0.15, t + bell.delay + 0.02);
        bGain.gain.exponentialRampToValueAtTime(0.001, t + bell.delay + 0.6);

        bOsc.connect(bGain);
        bGain.connect(ctx.destination);
        bOsc.start(t + bell.delay);
        bOsc.stop(t + bell.delay + 0.65);
      });
    } catch {
      // ignore
    }
  }

  // Quick sound when player taps to manually feed Ganesha
  public playFeedGanesha() {
    this.playBiteChomp(1);
    setTimeout(() => {
      this.playYumBlessing();
    }, 280);
  }

  // ================= 2. INTERACTIVE GAMEPLAY SOUNDS =================

  // Crisp, snappy UI button tap / toggle pop
  public playButtonClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, t);
      osc.frequency.exponentialRampToValueAtTime(260, t + 0.04);

      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch {
      // ignore
    }
  }

  // Resonant auspicious temple bell / gong chime when starting a game
  public playStartGame() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      const notes = [
        { f: 392.0, d: 0.8 }, // G4
        { f: 587.33, d: 0.7 }, // D5
        { f: 783.99, d: 0.9 }, // G5
        { f: 1174.66, d: 1.1 }, // D6
      ];

      notes.forEach((note, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, t + idx * 0.06);

        gain.gain.setValueAtTime(0.001, t + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.18, t + idx * 0.06 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.06 + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.06);
        osc.stop(t + idx * 0.06 + note.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Tactile card flip sound
  public playFlip() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      // Soft paper/wood friction noise
      this.playNoiseBurst(t, 0.035, 1400, 0.12, 'bandpass');

      // Low wooden snap click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.05);

      gain.gain.setValueAtTime(0.16, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // ignore
    }
  }

  public playTileClick() {
    this.playFlip();
  }

  // Bell chime when cards are revealed at start of round
  public playReveal() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;
      const notes = [587.33, 739.99, 880.0]; // D5, F#5, A5 festive harmony
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);
        gain.gain.setValueAtTime(0, t + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.14, t + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.6);
      });
    } catch {
      // ignore
    }
  }

  public playChime() {
    this.playReveal();
  }

  // Playful, cute mouse scurry footsteps + little squeak when Mushak moves
  public playMushakScurry() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      // 1. Cute cartoon mouse squeak
      const squeak = ctx.createOscillator();
      const squeakGain = ctx.createGain();
      squeak.type = 'sine';
      squeak.frequency.setValueAtTime(1400, t);
      squeak.frequency.exponentialRampToValueAtTime(2200, t + 0.09);
      squeak.frequency.exponentialRampToValueAtTime(1600, t + 0.18);

      squeakGain.gain.setValueAtTime(0.01, t);
      squeakGain.gain.linearRampToValueAtTime(0.12, t + 0.04);
      squeakGain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      squeak.connect(squeakGain);
      squeakGain.connect(ctx.destination);
      squeak.start(t);
      squeak.stop(t + 0.24);

      // 2. Rapid little footsteps patter
      const footstepDelays = [0.04, 0.1, 0.16, 0.22, 0.28];
      footstepDelays.forEach((dt, idx) => {
        this.playNoiseBurst(t + dt, 0.025, 2400 + (idx % 2) * 400, 0.08, 'bandpass');
      });
    } catch {
      // ignore
    }
  }

  // Card swap whoosh sound
  public playSwapSwoosh() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(750, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(400, t + 0.22);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.25);
    } catch {
      // ignore
    }
  }

  // Correct selection chime (ascending temple chime chord)
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      // Joyful 4-note ascending temple harmony
      const chord = [659.25, 830.61, 987.77, 1318.51]; // E5, G#5, B5, E6
      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.045);

        gain.gain.setValueAtTime(0, t + idx * 0.045);
        gain.gain.linearRampToValueAtTime(0.16, t + idx * 0.045 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.045 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.045);
        osc.stop(t + idx * 0.045 + 0.48);
      });
    } catch {
      // ignore
    }
  }

  public playMatchSuccess() {
    this.playCorrect();
  }

  // Wrong selection: gentle, friendly wooden thud with mild wobble (never annoying)
  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      // Wooden thud
      this.playNoiseBurst(t, 0.06, 350, 0.15, 'lowpass');

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, t);
      osc.frequency.linearRampToValueAtTime(95, t + 0.16);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    } catch {
      // ignore
    }
  }

  public playWrongError() {
    this.playWrong();
  }

  // Round clear celebration fanfare
  public playRoundWin() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;
      const fanfare = [
        { f: 523.25, d: 0.11 }, // C5
        { f: 659.25, d: 0.11 }, // E5
        { f: 783.99, d: 0.11 }, // G5
        { f: 1046.5, d: 0.42 }, // C6
      ];
      let offset = 0;
      fanfare.forEach((note) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, t + offset);

        gain.gain.setValueAtTime(0, t + offset);
        gain.gain.linearRampToValueAtTime(0.18, t + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + note.d + 0.05);
        offset += 0.11;
      });
    } catch {
      // ignore
    }
  }

  public playRoundClear() {
    this.playRoundWin();
  }

  // Grand victory fanfare when completing all 3 levels!
  public playGrandVictory() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;

      // Royal victory temple fanfare notes
      const notes = [
        { f: 523.25, delay: 0.0, d: 0.18 }, // C5
        { f: 659.25, delay: 0.14, d: 0.18 }, // E5
        { f: 783.99, delay: 0.28, d: 0.2 }, // G5
        { f: 1046.5, delay: 0.42, d: 0.45 }, // C6
        { f: 880.0, delay: 0.62, d: 0.2 }, // A5
        { f: 1046.5, delay: 0.78, d: 0.2 }, // C6
        { f: 1318.51, delay: 0.96, d: 0.8 }, // E6
      ];

      notes.forEach((item) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.f, t + item.delay);

        gain.gain.setValueAtTime(0.001, t + item.delay);
        gain.gain.linearRampToValueAtTime(0.2, t + item.delay + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.001, t + item.delay + item.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + item.delay);
        osc.stop(t + item.delay + item.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // Game over gentle descending cadence
  public playGameOver() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const t = ctx.currentTime;
      const tones = [440, 392, 349.23, 293.66];
      tones.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.15);

        gain.gain.setValueAtTime(0, t + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.14, t + idx * 0.15 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.15 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + idx * 0.15);
        osc.stop(t + idx * 0.15 + 0.5);
      });
    } catch {
      // ignore
    }
  }
}

export const soundFx = new AudioManager();
