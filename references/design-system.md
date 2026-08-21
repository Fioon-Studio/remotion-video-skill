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
- Keep the main visual frame centered and leave a caption lane below it.
- Use one dominant type scale per page: title, supporting label, caption. Do not make every line a headline.
- Use a 2–4 px outer frame on 1080p previews and scale it proportionally for other resolutions.
- Reserve the accent color for the active item, progress marker, or confirmation state.

## Motion recipes

1. **Focus**: dim all completed items to 0.3–0.5 opacity, keep the active item at 1.0, and add a short scale-up.
2. **Node-to-line**: reveal two dots, draw the connecting SVG path, then reveal the result card.
3. **Card rail**: slide a card in from the side, hold it, and move it one lane before adding the next card.
4. **Typewriter**: use a fixed frame-per-character value and a blinking cursor; reserve it for code or search input.
5. **Transition title**: reveal a small chapter label first, then the large title, then the supporting line.

## Text rules

- Use actual React/SVG text for all important Chinese words.
- Break captions at semantic pauses. Never split a two-character word across cards.
- Use `white-space: nowrap` for short callouts and test the longest phrase at the target resolution.
- If a page cannot keep large type and clear contrast, change the page type instead of shrinking the type.
