import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

export const DEMO_FPS = 60;
export const DEMO_DURATION = DEMO_FPS * 8;

const grid = {
  backgroundColor: '#07100B',
  backgroundImage:
    'linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.055) 1px, transparent 1px)',
  backgroundSize: '88px 88px',
};

const ease = (frame: number, from: number, duration: number) =>
  interpolate(frame, [from, from + duration], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

export const KnowledgeCardDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const titleIn = ease(frame, 8, 16);
  const firstIn = ease(frame, 55, 14);
  const secondIn = ease(frame, 92, 14);
  const thirdIn = ease(frame, 129, 14);
  const lineIn = ease(frame, 74, 38);
  const active = frame < 129 ? 0 : frame < 166 ? 1 : 2;
  const items = ['先把问题说清楚', '再让模型拆步骤', '最后检查结果'];
  const enters = [firstIn, secondIn, thirdIn];

  return (
    <AbsoluteFill style={{...grid, color: '#F7FBF7', fontFamily: 'Microsoft YaHei, sans-serif'}}>
      <div style={{position: 'absolute', top: 54, left: 78, color: '#2AD47A', letterSpacing: 4, fontSize: 24}}>
        KNOWLEDGE CARD · 01
      </div>
      <div style={{position: 'absolute', top: 170, left: 0, right: 0, textAlign: 'center', opacity: titleIn, transform: `translateY(${(1 - titleIn) * 24}px)`}}>
        <div style={{fontSize: 74, fontWeight: 900}}>把复杂概念讲成三步</div>
        <div style={{fontSize: 30, color: '#A7B0AA', marginTop: 22}}>黑底知识卡的可复用结构</div>
      </div>
      <svg width="1200" height="4" viewBox="0 0 1200 4" style={{position: 'absolute', top: 490, left: 360}}>
        <line x1="0" y1="2" x2={1200 * lineIn} y2="2" stroke="#2AD47A" strokeWidth="4" strokeLinecap="round" />
      </svg>
      {items.map((item, index) => {
        const opacity = enters[index] * (index === active ? 1 : index < active ? .38 : .7);
        return (
          <div key={item} style={{position: 'absolute', top: 560 + index * 116, left: 520, width: 880, display: 'flex', alignItems: 'center', gap: 24, opacity, transform: `translateX(${(1 - enters[index]) * 36}px)`}}>
            <div style={{width: 54, height: 54, borderRadius: 27, background: index === active ? '#2AD47A' : 'rgba(42,212,122,.22)', color: index === active ? '#07100B' : '#9DE9B9', display: 'grid', placeItems: 'center', fontWeight: 900, fontSize: 26}}>{index + 1}</div>
            <div style={{fontSize: 48, fontWeight: index === active ? 900 : 700, color: index === active ? '#FFFFFF' : '#8D9890'}}>{item}</div>
          </div>
        );
      })}
      <div style={{position: 'absolute', bottom: 58, left: 0, right: 0, textAlign: 'center', color: '#A7B0AA', fontSize: 28}}>
        讲到哪一项，就让哪一项保持清晰
      </div>
    </AbsoluteFill>
  );
};
