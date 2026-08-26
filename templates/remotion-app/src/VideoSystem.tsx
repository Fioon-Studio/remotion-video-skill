import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type Chapter = {id: string; label: string; startFrame: number; endFrame: number};

const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Three stable zones: chapter rail, main composition, and caption lane. */
export const VideoZones: React.FC<React.PropsWithChildren> = ({children}) => (
  <AbsoluteFill style={{overflow: 'hidden'}}>{children}</AbsoluteFill>
);

export const Surface: React.FC<React.PropsWithChildren<{mode: 'paper' | 'grid'}>> = ({mode, children}) => (
  <AbsoluteFill
    style={mode === 'grid' ? {
      backgroundColor: '#07100B',
      backgroundImage: 'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
      backgroundSize: '88px 88px',
    } : {background: '#F4F1E8'}}
  >{children}</AbsoluteFill>
);

/**
 * Generic walking mascot. Replace this SVG with a transparent 4-8 frame sprite sheet
 * by keeping the same `left`/`top` positioning from ProgressRail.
 */
export const WalkingMascot: React.FC<{left: number; top: number; scale?: number; color?: string; gaitFramesPerCycle?: number}> = ({left, top, scale = 1, color = '#111714', gaitFramesPerCycle = 32}) => {
  const frame = useCurrentFrame();
  const phase = frame * (Math.PI * 2 / gaitFramesPerCycle);
  const gait = Math.sin(phase);
  const bob = Math.abs(Math.sin(phase)) * 3;
  return <svg aria-label="walking mascot placeholder" width={52 * scale} height={52 * scale} viewBox="0 0 52 52" style={{position: 'absolute', left, top: top - bob, overflow: 'visible'}}>
    <circle cx="27" cy="12" r="8" fill={color} />
    <path d="M27 20 L27 34" stroke={color} strokeWidth="5" strokeLinecap="round" />
    <path d={`M27 24 L${16 + gait * 4} 29`} stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d={`M27 24 L${38 - gait * 4} 28`} stroke={color} strokeWidth="4" strokeLinecap="round" />
    <path d={`M27 34 L${19 - gait * 5} 45`} stroke={color} strokeWidth="5" strokeLinecap="round" />
    <path d={`M27 34 L${35 + gait * 5} 45`} stroke={color} strokeWidth="5" strokeLinecap="round" />
  </svg>;
};

/** Progress is derived from the real video duration. Chapters become active only when reached. */
export const ProgressRail: React.FC<{chapters: Chapter[]; accent?: string; ink?: string; mascot?: React.ReactNode}> = ({chapters, accent = '#2AD47A', ink = '#111714', mascot}) => {
  const frame = useCurrentFrame();
  const {width} = useVideoConfig();
  const firstFrame = chapters[0]?.startFrame ?? 0;
  const lastFrame = chapters[chapters.length - 1]?.endFrame ?? 1;
  const progress = clamp((frame - firstFrame) / Math.max(1, lastFrame - firstFrame));
  const railLeft = width * .18;
  const railWidth = width * .64;
  const mascotLeft = railLeft + railWidth * progress - 24;
  return <div style={{position: 'absolute', left: 0, right: 0, top: 44, height: 82, fontFamily: 'Microsoft YaHei, sans-serif', color: ink}}>
    <div style={{position: 'absolute', left: railLeft, top: 13, width: railWidth, height: 2, borderRadius: 2, background: 'rgba(17,23,20,.22)'}} />
    <div style={{position: 'absolute', left: railLeft, top: 13, width: railWidth * progress, height: 2, borderRadius: 2, background: accent}} />
    {chapters.map((chapter) => {
      const chapterProgress = clamp((chapter.startFrame - firstFrame) / Math.max(1, lastFrame - firstFrame));
      const isActive = frame >= chapter.startFrame;
      const x = railLeft + railWidth * chapterProgress;
      return <React.Fragment key={chapter.label}>
        <div style={{position: 'absolute', left: x - 6, top: 8, width: 12, height: 12, borderRadius: 6, background: isActive ? accent : '#B6B9B2'}} />
        <div style={{position: 'absolute', left: x, top: 29, transform: 'translateX(-50%)', fontWeight: isActive ? 900 : 700, fontSize: 18, opacity: isActive ? 1 : .48, whiteSpace: 'nowrap'}}>{chapter.label}</div>
      </React.Fragment>;
    })}
    {mascot ?? <WalkingMascot left={mascotLeft} top={-36} color={accent} />}
  </div>;
};

/** Content is centered between the rail and caption lane, not against the canvas top. */
export const WhiteSceneFrame: React.FC<React.PropsWithChildren<{image?: string; children?: React.ReactNode}>> = ({image, children}) => (
  <div style={{position: 'absolute', left: '50%', top: '50%', width: '82%', height: '61%', transform: 'translate(-50%, -43%)', border: '5px solid #172018', borderRadius: 34, overflow: 'hidden', background: '#FFFDF8', boxShadow: '0 14px 34px rgba(17,23,20,.10)'}}>
    {image ? <img src={image} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} /> : null}
    {children}
  </div>
);

/** Keep captions on a fixed baseline. Text fades up rather than jumping between words. */
export const GradientCaption: React.FC<{text: string; dark?: boolean}> = ({text, dark = true}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 7], [0, 1], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
  return <div style={{position: 'absolute', left: '50%', bottom: 42, transform: `translate(-50%, ${(1 - opacity) * 10}px)`, opacity, maxWidth: '84%', padding: '15px 28px', borderRadius: 16, background: dark ? 'rgba(7,16,11,.92)' : 'rgba(255,255,255,.92)', color: dark ? '#FFFFFF' : '#111714', fontFamily: 'Microsoft YaHei, sans-serif', fontWeight: 800, fontSize: 32, lineHeight: 1.25, textAlign: 'center', whiteSpace: 'nowrap', boxShadow: '0 8px 22px rgba(0,0,0,.16)'}}>{text}</div>;
};

/** Use for a single screenshot target only. Normal lists should use in-place highlighting. */
export const ScreenshotFocus: React.FC<{src: string; target: {left: number; top: number; width: number; height: number}; label: string}> = ({src, target, label}) => (
  <div style={{position: 'absolute', left: '50%', top: '50%', width: '78%', height: '58%', transform: 'translate(-50%, -42%)', overflow: 'hidden', border: '5px solid #172018', borderRadius: 28, background: '#111'}}>
    <img src={src} style={{width: '100%', height: '100%', objectFit: 'cover', opacity: .48}} />
    <div style={{position: 'absolute', ...target, border: '5px solid #2AD47A', borderRadius: 14, boxShadow: '0 0 0 1000px rgba(0,0,0,.22)'}} />
    <div style={{position: 'absolute', left: target.left + target.width / 2, top: target.top + target.height + 20, transform: 'translateX(-50%)', padding: '10px 18px', borderRadius: 12, background: '#2AD47A', color: '#07100B', fontFamily: 'Microsoft YaHei, sans-serif', fontWeight: 900, fontSize: 24, whiteSpace: 'nowrap'}}>{label}</div>
  </div>
);
