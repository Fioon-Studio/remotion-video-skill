import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

const amount = (frame: number, from: number, duration = 12) => interpolate(frame, [from, from + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

/** Keeps all items in place. Only the currently spoken item changes state. */
export const InPlaceHighlight: React.FC<{items: string[]; activeIndex: number; accent?: string}> = ({items, activeIndex, accent = '#2AD47A'}) => (
  <div style={{display: 'grid', gridTemplateColumns: items.length > 3 ? 'repeat(2, 1fr)' : `repeat(${items.length}, 1fr)`, gap: 24}}>
    {items.map((item, index) => <div key={item} style={{padding: '34px 30px', borderRadius: 22, border: `3px solid ${index === activeIndex ? accent : 'rgba(255,255,255,.24)'}`, background: index === activeIndex ? 'rgba(42,212,122,.14)' : 'rgba(255,255,255,.035)', color: index === activeIndex ? '#FFFFFF' : 'rgba(255,255,255,.42)', fontSize: 38, fontWeight: 900, textAlign: 'center', transition: 'none'}}>{item}</div>)}
  </div>
);

/** Two dots first, then a line, then a result: use for relationships and processes. */
export const NodeToLine: React.FC<{from: string; to: string; result: string}> = ({from, to, result}) => {
  const frame = useCurrentFrame();
  const line = amount(frame, 18, 24);
  const resultIn = amount(frame, 48, 14);
  return <div style={{position: 'relative', width: 1240, height: 260, color: '#fff', fontFamily: 'Microsoft YaHei, sans-serif'}}>
    {[{text: from, left: 40}, {text: to, left: 930}].map((node) => <div key={node.text} style={{position: 'absolute', left: node.left, top: 82, width: 190, textAlign: 'center', fontSize: 42, fontWeight: 900}}>{node.text}<div style={{width: 18, height: 18, margin: '22px auto 0', borderRadius: 9, background: '#2AD47A'}} /></div>)}
    <div style={{position: 'absolute', left: 250, top: 158, height: 4, width: 650 * line, background: '#2AD47A'}} />
    <div style={{position: 'absolute', left: '50%', top: 32, transform: `translateX(-50%) scale(${.92 + resultIn * .08})`, opacity: resultIn, padding: '18px 34px', borderRadius: 18, background: 'rgba(255,255,255,.1)', border: '2px solid rgba(255,255,255,.32)', fontSize: 34, fontWeight: 900}}>{result}</div>
  </div>;
};

/** Reserve typewriter motion for search input or code only. */
export const Typewriter: React.FC<{text: string; from?: number; framesPerCharacter?: number}> = ({text, from = 0, framesPerCharacter = 2}) => {
  const frame = useCurrentFrame();
  const count = Math.max(0, Math.floor((frame - from) / framesPerCharacter));
  const typed = text.slice(0, count);
  return <div style={{fontFamily: 'Consolas, monospace', padding: '22px 28px', borderRadius: 16, background: '#16211B', color: '#E9F7EE', fontSize: 30}}>{typed}<span style={{opacity: frame % 30 < 15 ? 1 : 0, color: '#2AD47A'}}>|</span></div>;
};

/** A chapter page, used only for actual section changes. */
export const ChapterTitle: React.FC<{index: string; title: string; subtitle: string}> = ({index, title, subtitle}) => {
  const frame = useCurrentFrame();
  const first = amount(frame, 0, 12);
  const second = amount(frame, 12, 16);
  return <div style={{fontFamily: 'Microsoft YaHei, sans-serif', color: '#fff', marginLeft: '14%', marginTop: '26%'}}>
    <div style={{opacity: first, color: '#2AD47A', fontSize: 28, letterSpacing: 5}}>第 {index} 部分</div>
    <div style={{opacity: second, fontSize: 96, fontWeight: 900, marginTop: 26}}>{title}</div>
    <div style={{opacity: second, fontSize: 30, color: 'rgba(255,255,255,.64)', marginTop: 24}}>{subtitle}</div>
  </div>;
};
