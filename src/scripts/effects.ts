/**
 * Background atmosphere only.
 *
 * Deliberate constraints:
 *  - The starfield is a background layer. It never sits behind the header or
 *    the footer (both are opaque) and it never reacts to the cursor while the
 *    cursor is over text, a control, or any other content. Stars only respond
 *    in open space.
 *  - Nothing in the interface moves with the cursor: no magnetic controls, no
 *    spotlights on buttons or cards.
 *  - Desktop pointers at 1024px and up only; skipped entirely under
 *    `prefers-reduced-motion: reduce`.
 *  - One requestAnimationFrame loop, which throttles itself when idle and
 *    stops when the tab is hidden.
 *
 * Scroll reveal and nav highlighting run everywhere. They are cheap and are
 * not cursor effects.
 */

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopPointer = window.matchMedia('(min-width: 1024px) and (hover: hover) and (pointer: fine)');

/**
 * Anything the cursor can be "over" that is content rather than open space.
 * Hovering any of these suppresses the star response entirely.
 */
const CONTENT_SELECTOR =
  'header, footer, a, button, input, textarea, select, label, form, ' +
  'h1, h2, h3, h4, h5, h6, p, li, dt, dd, time, span, strong, em, code, pre, ' +
  'blockquote, figure, img, svg, table, .card, .tag, .contact__panel, .education__certs';

interface Pointer {
  x: number;
  y: number;
  sx: number;
  sy: number;
  /** True only while the cursor is in open space. */
  active: boolean;
}

const pointer: Pointer = { x: -9999, y: -9999, sx: -9999, sy: -9999, active: false };

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ------------------------------------------------------------------ */
/* Starfield                                                           */
/* ------------------------------------------------------------------ */

interface Star {
  x: number;
  y: number;
  r: number;
  /** Parallax depth, 0.15 (far) to 1 (near). */
  depth: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  /** 0..1 excitement from cursor proximity, decays every frame. */
  charge: number;
  /** Last drawn position, reused by the constellation pass. */
  dx: number;
  dy: number;
}

class Starfield {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private w = 0;
  private h = 0;
  private dpr = 1;
  private accent: [number, number, number] = [56, 189, 248];
  private base: [number, number, number] = [226, 235, 245];

  /** Cursor influence radius in CSS pixels. */
  private readonly RADIUS = 160;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.resize();
    this.readTheme();
  }

  readTheme(): void {
    const styles = getComputedStyle(document.documentElement);
    const accent = parseColor(styles.getPropertyValue('--accent').trim());
    if (accent) this.accent = accent;
    // In the light theme stars must be dark to be visible at all.
    this.base = document.documentElement.dataset.theme === 'light' ? [90, 105, 125] : [226, 235, 245];
  }

  resize(): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.seed();
  }

  private seed(): void {
    // Density scaled to viewport area, capped so ultrawide monitors stay cheap.
    const count = Math.min(230, Math.round((this.w * this.h) / 11000));
    this.stars = Array.from({ length: count }, () => {
      const depth = 0.15 + Math.random() ** 1.6 * 0.85;
      return {
        x: Math.random() * this.w,
        y: Math.random() * this.h,
        r: 0.45 + depth * 1.0,
        depth,
        baseAlpha: 0.14 + depth * 0.48,
        twinkleSpeed: 0.0003 + Math.random() * 0.0009,
        twinklePhase: Math.random() * Math.PI * 2,
        charge: 0,
        dx: 0,
        dy: 0,
      };
    });
  }

  /** Returns true if anything is still animating and the loop must continue. */
  render(time: number, scrollY: number): boolean {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);

    const [ar, ag, ab] = this.accent;
    const [br, bg, bb] = this.base;
    const px = pointer.x;
    const py = pointer.y;
    const hasPointer = pointer.active;
    const r2 = this.RADIUS * this.RADIUS;

    // Parallax: far stars drift less with the page than near ones.
    const parallaxBase = scrollY * 0.025;

    const lit: Star[] = [];
    let animating = false;

    for (const star of this.stars) {
      let y = star.y - parallaxBase * star.depth;
      // Wrap vertically so scrolling never empties the field.
      y = ((y % this.h) + this.h) % this.h;

      if (hasPointer) {
        const dx = star.x - px;
        const dy = y - py;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < r2) {
          star.charge = Math.max(star.charge, 1 - Math.sqrt(dist2) / this.RADIUS);
        }
      }

      if (star.charge > 0.002) {
        star.charge *= 0.93;
        animating = true;
      } else {
        star.charge = 0;
      }

      const twinkle = 0.74 + Math.sin(time * star.twinkleSpeed + star.twinklePhase) * 0.26;
      const alpha = Math.min(1, star.baseAlpha * twinkle + star.charge * 0.7);
      const radius = star.r * (1 + star.charge * 1.15);

      if (star.charge > 0.08) {
        lit.push(star);
        ctx.fillStyle = `rgba(${lerp(br, ar, star.charge) | 0},${lerp(bg, ag, star.charge) | 0},${lerp(bb, ab, star.charge) | 0},${alpha})`;
      } else {
        ctx.fillStyle = `rgba(${br},${bg},${bb},${alpha})`;
      }

      ctx.beginPath();
      ctx.arc(star.x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      star.dx = star.x;
      star.dy = y;
    }

    // Faint constellation lines between nearby lit stars.
    if (lit.length > 1) {
      ctx.lineWidth = 0.6;
      for (let i = 0; i < lit.length; i++) {
        for (let j = i + 1; j < lit.length; j++) {
          const a = lit[i]!;
          const b = lit[j]!;
          const dx = a.dx - b.dx;
          const dy = a.dy - b.dy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d > 125) continue;
          const strength = (1 - d / 125) * Math.min(a.charge, b.charge);
          if (strength < 0.05) continue;
          ctx.strokeStyle = `rgba(${ar},${ag},${ab},${strength * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.dx, a.dy);
          ctx.lineTo(b.dx, b.dy);
          ctx.stroke();
        }
      }
    }

    return animating;
  }
}

function parseColor(value: string): [number, number, number] | null {
  if (!value) return null;
  if (value.startsWith('#')) {
    const hex = value.slice(1);
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
    if (full.length < 6) return null;
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
    ];
  }
  const match = value.match(/(\d+)[,\s]+(\d+)[,\s]+(\d+)/);
  if (match) return [Number(match[1]), Number(match[2]), Number(match[3])];
  return null;
}

/* ------------------------------------------------------------------ */
/* Boot                                                                */
/* ------------------------------------------------------------------ */

function initAtmosphere(): void {
  if (reduceMotion.matches || !desktopPointer.matches) return;

  const canvas = document.querySelector<HTMLCanvasElement>('.backdrop__canvas');
  const glow = document.querySelector<HTMLElement>('.cursor-glow');
  if (!canvas) return;

  const field = new Starfield(canvas);
  let running = false;
  let idleFrames = 0;
  let scrollY = window.scrollY;

  requestAnimationFrame(() => canvas.classList.add('is-ready'));

  const loop = (time: number) => {
    if (document.visibilityState === 'hidden') {
      running = false;
      return;
    }

    pointer.sx = lerp(pointer.sx, pointer.x, 0.1);
    pointer.sy = lerp(pointer.sy, pointer.y, 0.1);

    if (glow && pointer.active) {
      glow.style.transform = `translate3d(${pointer.sx}px, ${pointer.sy}px, 0)`;
    }

    const busy = field.render(time, scrollY);
    const glowSettled =
      Math.abs(pointer.sx - pointer.x) < 0.5 && Math.abs(pointer.sy - pointer.y) < 0.5;
    idleFrames = busy || !glowSettled ? 0 : idleFrames + 1;

    if (idleFrames > 200) {
      // Long idle: keep the twinkle alive at roughly 20fps instead of 60.
      setTimeout(() => requestAnimationFrame(loop), 50);
      return;
    }

    requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) return;
    running = true;
    requestAnimationFrame(loop);
  };

  const setInactive = () => {
    pointer.active = false;
    pointer.x = -9999;
    pointer.y = -9999;
    glow?.classList.remove('is-active');
  };

  window.addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType !== 'mouse') return;

      // Stars and glow react in open space only, never over content.
      const target = event.target as Element | null;
      if (target?.closest?.(CONTENT_SELECTOR)) {
        setInactive();
        idleFrames = 0;
        start();
        return;
      }

      if (!pointer.active) {
        pointer.sx = event.clientX;
        pointer.sy = event.clientY;
      }
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.active = true;
      glow?.classList.add('is-active');
      idleFrames = 0;
      start();
    },
    { passive: true }
  );

  window.addEventListener('pointerleave', setInactive);
  window.addEventListener('blur', setInactive);

  window.addEventListener(
    'scroll',
    () => {
      scrollY = window.scrollY;
      idleFrames = 0;
      start();
    },
    { passive: true }
  );

  let resizeTimer: number | undefined;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      field.resize();
      idleFrames = 0;
      start();
    }, 180);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      running = false;
      start();
    }
  });

  // Re-read the palette when the theme flips.
  new MutationObserver(() => field.readTheme()).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });

  start();
}

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

function initReveal(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
  if (!items.length) return;

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  items.forEach((el) => observer.observe(el));
}

/* ------------------------------------------------------------------ */
/* Active section highlighting in the nav                              */
/* ------------------------------------------------------------------ */

function initScrollSpy(): void {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-spy]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const sections = links
    .map((link) => document.querySelector<HTMLElement>(link.getAttribute('href')!.replace(/^.*#/, '#')))
    .filter((el): el is HTMLElement => Boolean(el));
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const id = `#${entry.target.id}`;
        links.forEach((link) => {
          link.classList.toggle('is-current', link.getAttribute('href')!.endsWith(id));
        });
      }
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ------------------------------------------------------------------ */

function boot(): void {
  document.documentElement.classList.add('js');
  initReveal();
  initScrollSpy();
  initAtmosphere();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot, { once: true });
} else {
  boot();
}
