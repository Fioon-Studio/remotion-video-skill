import {interpolate} from 'remotion';
import type {NarrationSegment, VisualCue} from './Timing';

export type Caption = {segmentId: string; text: string; startFrame: number; endFrame: number};
export type TimelineManifest = {fps: number; narration: string; segments: NarrationSegment[]; cues: VisualCue[]; captions: Caption[]};

/** All visual layers use the same manifest and the same frame clock. */
export const isActiveAtFrame = (frame: number, startFrame: number, endFrame: number) => frame >= startFrame && frame < endFrame;

export const getActiveCaption = (frame: number, captions: Caption[]) => captions.find((caption) => isActiveAtFrame(frame, caption.startFrame, caption.endFrame));

export const getActiveCue = (frame: number, cues: VisualCue[]) => cues.find((cue) => isActiveAtFrame(frame, cue.startFrame, cue.endFrame));

/** Use for a cue's entry state; the cue's startFrame remains the only trigger. */
export const cueProgress = (frame: number, cue: VisualCue, enterFrames = 10) => interpolate(frame, [cue.startFrame, cue.startFrame + enterFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
