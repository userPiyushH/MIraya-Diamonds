import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Eye } from 'lucide-react';

interface FooterRingAnimationProps {
  onOpenConsultation?: () => void;
}

export const FooterRingAnimation: React.FC<FooterRingAnimationProps> = ({
  onOpenConsultation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the top of the container enters the bottom of the viewport: rect.top <= windowHeight
      // When the bottom reaches near bottom of viewport: progress approaches 1.0
      const startTrigger = windowHeight * 0.95;
      const endTrigger = windowHeight * 0.15;

      const totalDistance = startTrigger - endTrigger;
      const currentPos = startTrigger - rect.top;

      let progress = currentPos / totalDistance;
      progress = Math.max(0, Math.min(1, progress));

      // Ease out cubic for ultra-luxurious buttery feel
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      setScrollProgress(eased);
      setIsInView(rect.top < windowHeight && rect.bottom > 0);
    };

    const onScroll = () => {
      if (autoPlay) return;
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [autoPlay]);

  // Optional preview mode if user toggles autoplay or clicks to view
  useEffect(() => {
    if (!autoPlay) return;
    let startTime: number | null = null;
    const duration = 2400; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = (elapsed % duration) / duration;
      // Ping pong progress
      const p = rawProgress < 0.5 ? rawProgress * 2 : 2 - rawProgress * 2;
      setScrollProgress(p);
      animationFrameId = requestAnimationFrame(step);
    };

    let animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [autoPlay]);

  // Compute transform values:
  // First image: starts scaled up (1.36) and scales down to 1.0
  const firstScale = 1.36 - scrollProgress * 0.36;
  const firstBrightness = 0.88 + scrollProgress * 0.12;

  // Second image: translates up from down side (120px -> 0px) and opacity (0 -> 1)
  const secondTranslateY = (1 - scrollProgress) * 90; // px
  const secondOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.08) / 0.88));
  const secondScale = 0.94 + scrollProgress * 0.06;

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden select-none"
      style={{ minHeight: '440px' }}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#160B0D] via-[#211416] to-[#1E1013] -z-10" />

      {/* Main Animation Stage */}
      <div className="relative w-full h-[380px] sm:h-[480px] md:h-[560px] lg:h-[640px] flex items-center justify-center overflow-hidden">
        {/* FIRST IMAGE: Scales down smoothly as you scroll */}
        <div
          className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
          style={{
            transform: `scale3d(${firstScale}, ${firstScale}, 1)`,
            filter: `brightness(${firstBrightness})`,
            transition: autoPlay ? 'none' : 'transform 0.08s ease-out, filter 0.08s ease-out',
          }}
        >
          <img
            src="/src/assets/images/footer_anim_first.png"
            alt="Miraya Diamonds Solitaire Ring Setting Background"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* SECOND IMAGE: Comes up from down side in ultra smooth animation with scroll */}
        <div
          className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none"
          style={{
            transform: `translate3d(0, ${secondTranslateY}px, 0) scale3d(${secondScale}, ${secondScale}, 1)`,
            opacity: secondOpacity,
            transition: autoPlay ? 'none' : 'transform 0.08s ease-out, opacity 0.08s ease-out',
          }}
        >
          <img
            src="/src/assets/images/footer_anim_second.png"
            alt="Miraya Diamonds Solitaire Crown Elevation"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Ambient warm light glow and bokeh overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#211416] via-transparent to-[#211416]/50 pointer-events-none" />

        {/* Interactive floating scroll indicator / preview pill */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="px-3 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-[#D14963]/40 text-[#F9E7EA] text-[11px] font-medium flex items-center gap-1.5 transition-all shadow-lg hover:border-[#D14963]"
            title="Toggle preview loop"
          >
            <Eye className="w-3.5 h-3.5 text-[#D14963]" />
            <span>{autoPlay ? 'Pause Demo' : 'Play Animation Demo'}</span>
          </button>
        </div>

        {/* Scroll Progress Bar at the bottom edge */}
        <div className="absolute bottom-4 left-6 right-6 sm:left-12 sm:right-12 z-20 flex flex-col items-center pointer-events-none">
          <div className="w-full max-w-md bg-white/10 rounded-full h-1 overflow-hidden backdrop-blur-xs border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-[#D14963] via-[#F9E7EA] to-[#D14963] transition-all duration-75 rounded-full"
              style={{ width: `${Math.round(scrollProgress * 100)}%` }}
            />
          </div>
          <div className="flex items-center gap-2 mt-2 text-[10px] uppercase tracking-[0.2em] text-[#F9E7EA]/70">
            <Sparkles className="w-3 h-3 text-[#D14963]" />
            <span>
              {scrollProgress >= 0.95
                ? 'Master Solitaire Assembled · 100%'
                : `Scroll to Unveil · ${Math.round(scrollProgress * 100)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
