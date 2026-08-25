# Reusable design system

## Scene decision

| Content job | Surface | Recommended motion |
| --- | --- | --- |
| Daily-life example | White scene | Character pose change, object callout, gentle push-in |
| One to three short highlights | White scene | Large text reveal in a quiet area |
| Four or more items | Black card | Sequential cards or numbered nodes |
| Relationship or process | Black card | Dots draw into lines, then reveal the result |
| Tool or UI action | Black card or screen capture | Search box, cursor, click confirmation |
| Topic change | Transition page | Center title, chapter marker, short subtitle |

## Layout tokens

- Keep a 6% outer safe margin on landscape canvases and 8% on vertical canvases.
- Divide the canvas into a top navigation lane, a main content zone and a bottom caption lane. Center the visual mass inside the main content zone, not merely the title at the top of the canvas.
- For a split layout, balance the total visual weight of the left and right groups. A screenshot, illustration and callouts should read as one centered composition rather than isolated blocks pushed to one side.
- Use one dominant type scale per page: title, supporting label, caption. Do not make every line a headline.
- Use a 2–4 px outer frame on 1080p previews and scale it proportionally for other resolutions.
- Reserve the accent color for the active item, progress marker, or confirmation state.

## Motion recipes

1. **Focus**: use only for one inspection target such as a README section, a file, a button or one concept. Dim the surrounding context to 0.3–0.5 opacity, keep the target at 1.0, and frame or enlarge it at the visual center. Do not use Focus for a normal list item.
2. **In-place highlight**: for steps, options and folders, keep every item in its original position. At the exact spoken cue, brighten the matching item and lightly dim the rest.
3. **Node-to-line**: reveal two dots, draw the connecting SVG path, then reveal the result card.
4. **Card rail**: slide a card in from the side, hold it, and move it one lane before adding the next card.
5. **Typewriter**: use a fixed frame-per-character value and a blinking cursor; reserve it for code or search input.
6. **Transition title**: reveal a small chapter label first, then the large title, then the supporting line.

## Text rules

- Use actual React/SVG text for all important Chinese words.
- Break captions first at punctuation and semantic pauses. Hide punctuation in the rendered caption. Never split a two-character word across cards.
- Use `white-space: nowrap` for short callouts and test the longest phrase at the target resolution.
- If a page cannot keep large type and clear contrast, change the page type instead of shrinking the type.
