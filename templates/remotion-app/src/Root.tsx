import React from 'react';
import {Composition} from 'remotion';
import {KnowledgeCardDemo, DEMO_DURATION, DEMO_FPS} from './KnowledgeCardDemo';

export const Root: React.FC = () => (
  <Composition
    id="KnowledgeCardDemo"
    component={KnowledgeCardDemo}
    durationInFrames={DEMO_DURATION}
    fps={DEMO_FPS}
    width={1920}
    height={1080}
  />
);
