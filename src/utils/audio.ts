// Web Audio API generator for zero-latency, offline festive sound effects

class AudioManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  constructor() {
    // Read saved preference
    const saved = localStorage.getItem('judam_muted') || localStorage.getItem('modak_memory_muted');
    if (saved !== null) {
      this.isMuted = saved === 'true';
    }
  }

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    localStorage.setItem('judam_muted', String(this.isMuted));
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  // Bell chime when tiles are revealed
  public playReveal() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const notes = [587.33, 739.99, 880.0]; // D5, F#5, A5 festive harmony
      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.08);
        gain.gain.setValueAtTime(0, t + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, t + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.08);
        osc.stop(t + idx * 0.08 + 0.65);
      });
    } catch {
      // ignore
    }
  }

  // Playful scurry sound when Mushak secretly moves tiles
  public playMushakScurry() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      
      // Little sneaky scurry chirp
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(1400, t + 0.12);
      osc.frequency.exponentialRampToValueAtTime(950, t + 0.25);
      osc.frequency.exponentialRampToValueAtTime(1600, t + 0.4);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.52);
    } catch {
      // ignore
    }
  }

  // Tile flip tap
  public playTileClick() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.06);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch {
      // ignore
    }
  }

  // Correct selection chime
  public playCorrect() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      chord.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);

        gain.gain.setValueAtTime(0, t + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.14, t + idx * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.05);
        osc.stop(t + idx * 0.05 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  // Wrong selection buzz/thud
  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, t);
      osc.frequency.linearRampToValueAtTime(90, t + 0.25);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.28);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.3);
    } catch {
      // ignore
    }
  }

  // Round clear celebration
  public playRoundWin() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const fanfare = [
        { f: 523.25, d: 0.1 },
        { f: 659.25, d: 0.1 },
        { f: 783.99, d: 0.1 },
        { f: 1046.5, d: 0.35 },
      ];
      let offset = 0;
      fanfare.forEach((note) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note.f, t + offset);

        gain.gain.setValueAtTime(0, t + offset);
        gain.gain.linearRampToValueAtTime(0.18, t + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + note.d);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + offset);
        osc.stop(t + offset + note.d + 0.05);
        offset += 0.11;
      });
    } catch {
      // ignore
    }
  }

  // Convenient aliases
  public playChime() {
    this.playReveal();
  }

  public playFlip() {
    this.playTileClick();
  }

  public playMatchSuccess() {
    this.playCorrect();
  }

  public playRoundClear() {
    this.playRoundWin();
  }

  public playWrongError() {
    this.playWrong();
  }

  // Game over
  public playGameOver() {
    if (this.isMuted) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const t = this.ctx.currentTime;
      const tones = [440, 392, 349.23, 293.66];
      tones.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.15);

        gain.gain.setValueAtTime(0, t + idx * 0.15);
        gain.gain.linearRampToValueAtTime(0.15, t + idx * 0.15 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.15 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(t + idx * 0.15);
        osc.stop(t + idx * 0.15 + 0.45);
      });
    } catch {
      // ignore
    }
  }
}

export const soundFx = new AudioManager();
