export type LayoutRect = {id: string; x: number; y: number; width: number; height: number};

export const overlaps = (a: LayoutRect, b: LayoutRect) => (
  a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
);

export const inside = (child: LayoutRect, parent: LayoutRect) => (
  child.x >= parent.x && child.y >= parent.y && child.x + child.width <= parent.x + parent.width && child.y + child.height <= parent.y + parent.height
);

/** Use before rendering a scene. Decorations must be omitted from this list unless they have a real visual role. */
export const assertSceneLayout = ({
  scene,
  safeArea,
  elements,
  allowedOverlaps = [],
}: {
  scene: string;
  safeArea: LayoutRect;
  elements: LayoutRect[];
  allowedOverlaps?: Array<[string, string]>;
}) => {
  for (const element of elements) {
    if (!inside(element, safeArea)) throw new Error(`${scene}: ${element.id} leaves the safe area`);
  }
  for (let index = 0; index < elements.length; index += 1) {
    for (let next = index + 1; next < elements.length; next += 1) {
      const a = elements[index];
      const b = elements[next];
      const allowed = allowedOverlaps.some(([left, right]) => (left === a.id && right === b.id) || (left === b.id && right === a.id));
      if (!allowed && overlaps(a, b)) throw new Error(`${scene}: ${a.id} overlaps ${b.id}`);
    }
  }
};
