import React from 'react';
import {useCurrentFrame} from 'remotion';
import {GradientCaption, ProgressRail, Surface, VideoZones, WhiteSceneFrame} from './VideoSystem';

export const STYLE_SYSTEM_FPS = 60;
export const STYLE_SYSTEM_DURATION = STYLE_SYSTEM_FPS * 9;

export const StyleSystemDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const isDark = frame >= STYLE_SYSTEM_FPS * 4.5;
  const active = frame < STYLE_SYSTEM_FPS * 2.5 ? 0 : frame < STYLE_SYSTEM_FPS * 4.5 ? 1 : 2;
  const steps = ['文案', '配音', '成片'];
  return <VideoZones>
    <Surface mode={isDark ? 'grid' : 'paper'}>
      <ProgressRail chapters={[{id: 'start', label: '开始', startFrame: 0, endFrame: 120}, {id: 'scene', label: '画面', startFrame: 120, endFrame: 240}, {id: 'card', label: '知识卡', startFrame: 240, endFrame: 420}, {id: 'done', label: '完成', startFrame: 420, endFrame: STYLE_SYSTEM_DURATION}]} ink={isDark ? '#FFFFFF' : '#111714'} />
      {isDark ? <div style={{position: 'absolute', top: '48%', left: '50%', transform: 'translate(-50%, -35%)', display: 'flex', gap: 32}}>{steps.map((item, index) => <div key={item} style={{width: 310, padding: '42px 20px', borderRadius: 24, border: `4px solid ${index === active ? '#2AD47A' : 'rgba(255,255,255,.28)'}`, background: index === active ? 'rgba(42,212,122,.13)' : 'rgba(255,255,255,.04)', color: index === active ? '#FFF' : 'rgba(255,255,255,.42)', fontSize: 46, fontWeight: 900, textAlign: 'center', fontFamily: 'Microsoft YaHei, sans-serif'}}>{item}</div>)}</div> : <WhiteSceneFrame>
        <div style={{position: 'absolute', left: '10%', top: '31%', color: '#111714', fontSize: 66, fontWeight: 900, fontFamily: 'Microsoft YaHei, sans-serif'}}>白底画面保持居中</div>
        <div style={{position: 'absolute', left: '10%', top: '54%', color: '#347957', fontSize: 32, fontWeight: 800, fontFamily: 'Microsoft YaHei, sans-serif'}}>最多三个短重点，放在安静区域</div>
        <div style={{position: 'absolute', right: '10%', bottom: '14%', width: 180, height: 180, borderRadius: 90, background: '#2AD47A', display: 'grid', placeItems: 'center', color: '#07100B', fontSize: 42, fontWeight: 900}}>画面</div>
      </WhiteSceneFrame>}
      <GradientCaption text={isDark ? '说到哪一项，就点亮哪一项' : '进度条、主体区和字幕区保持稳定'} dark={isDark} />
    </Surface>
  </VideoZones>;
};
