"use client";

import { useCallback, useEffect, useRef } from "react";
import { prefersReducedMotion } from "./motion";

type GravityElement = HTMLElement | SVGElement;

interface FieldTarget {
  el: GravityElement;
  strength: number;
  rotate: number;
}

/**
 * "Creative gravity" — a subtle pointer-responsive influence field. Nearby
 * registered elements drift toward/away from the pointer; distance and
 * pointer speed control intensity. Values are written straight to CSS
 * custom properties on each element (no React state per frame) so a CSS
 * `transition` on transform supplies the "settle smoothly" easing for free.
 *
 * Fine-pointer devices (desktop/laptop, >=minWidth) get real pointer
 * tracking. Touch/coarse-pointer devices get the same --gx/--gy properties
 * driven by scroll progress instead, per spec ("map this movement to
 * scroll progress and tap states"). Disabled entirely under
 * prefers-reduced-motion.
 */
export function usePointerField(sectionRef: React.RefObject<HTMLElement | null>, minWidth = 900) {
  const targets = useRef<FieldTarget[]>([]);

  const register = useCallback((el: GravityElement | null, strength: number, rotate = 0) => {
    if (!el) return () => {};
    const entry: FieldTarget = { el, strength, rotate };
    targets.current.push(entry);
    return () => {
      targets.current = targets.current.filter((t) => t !== entry);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;

    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isWideEnough = window.matchMedia(`(min-width: ${minWidth}px)`).matches;

    let raf = 0;

    const apply = (nx: number, ny: number, boost: number) => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      if (rect.width === 0) return;
      for (const { el, strength, rotate } of targets.current) {
        const r = el.getBoundingClientRect();
        const cx = (r.left + r.width / 2 - rect.left) / rect.width;
        const cy = (r.top + r.height / 2 - rect.top) / rect.height;
        const dx = nx - cx;
        const dy = ny - cy;
        const dist = Math.min(1, Math.hypot(dx, dy));
        const falloff = 1 - dist;
        el.style.setProperty("--gx", `${(-dx * strength * falloff * boost).toFixed(2)}px`);
        el.style.setProperty("--gy", `${(-dy * strength * falloff * boost).toFixed(2)}px`);
        if (rotate) {
          el.style.setProperty("--grot", `${(dx * rotate * falloff).toFixed(2)}deg`);
        }
      }
    };

    if (isFinePointer && isWideEnough) {
      let last = { x: 0.5, y: 0.5, t: performance.now() };

      const onMove = (e: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const now = performance.now();
        const dt = Math.max(1, now - last.t);
        const speed = Math.hypot(x - last.x, y - last.y) / (dt / 16);
        last = { x, y, t: now };
        const boost = Math.min(1.6, 0.6 + speed * 2);
        if (!raf) raf = requestAnimationFrame(() => apply(x, y, boost));
      };

      const onLeave = () => {
        if (!raf) raf = requestAnimationFrame(() => apply(0.5, 0.5, 0.6));
      };

      section.addEventListener("pointermove", onMove, { passive: true });
      section.addEventListener("pointerleave", onLeave, { passive: true });
      return () => {
        section.removeEventListener("pointermove", onMove);
        section.removeEventListener("pointerleave", onLeave);
        if (raf) cancelAnimationFrame(raf);
      };
    }

    // Touch / coarse-pointer fallback: drive the same properties from
    // how far the section has scrolled through the viewport.
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = Math.min(1, Math.max(0, 1 - rect.top / vh));
        apply(0.5 + (progress - 0.5) * 0.3, 0.5, 0.5);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef, minWidth]);

  return register;
}
