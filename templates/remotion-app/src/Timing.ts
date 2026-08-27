export type NarrationSegment = {
  id: string;
  text: string;
  startFrame: number;
  endFrame: number;
  scene: string;
};

export type VisualCue = {
  id: string;
  anchorText: string;
  startFrame: number;
  endFrame: number;
  mode: 'highlight' | 'focus' | 'enter' | 'dim';
};

/** Rendered captions never show Chinese sentence punctuation. */
export const cleanCaption = (text: string) => text.replace(/[，。？！]/g, '').trim();

/**
 * Split at real Chinese pauses first. Only split a long leftover at whole-word
 * whitespace; do not use a fixed character count that can break a word.
 */
export const splitCaptionText = (text: string) => text
  .split(/(?<=[，。？！])/u)
  .map(cleanCaption)
  .filter(Boolean);

export const cueStartsAtAnchor = (cue: VisualCue, narration: NarrationSegment[]) => {
  const owner = narration.find((segment) => segment.text.includes(cue.anchorText));
  return owner ? cue.startFrame >= owner.startFrame && cue.startFrame <= owner.endFrame : false;
};

/** True only while the matching word or short phrase is actually being spoken. */
export const isCueActiveAtFrame = (frame: number, cue: Pick<VisualCue, 'startFrame' | 'endFrame'>) =>
  frame >= cue.startFrame && frame < cue.endFrame;
