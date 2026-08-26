import React from 'react';
import {Composition} from 'remotion';
import {KnowledgeCardDemo, DEMO_DURATION, DEMO_FPS} from './KnowledgeCardDemo';
import {StyleSystemDemo, STYLE_SYSTEM_DURATION, STYLE_SYSTEM_FPS} from './StyleSystemDemo';

export const Root: React.FC = () => (
  <>
    <Composition id="KnowledgeCardDemo" component={KnowledgeCardDemo} durationInFrames={DEMO_DURATION} fps={DEMO_FPS} width={1920} height={1080} />
    <Composition id="StyleSystemDemo" component={StyleSystemDemo} durationInFrames={STYLE_SYSTEM_DURATION} fps={STYLE_SYSTEM_FPS} width={1920} height={1080} />
  </>
);
