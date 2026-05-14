# Avatar Likeness Brief

Purpose: keep a separate, explicit likeness check for generated portfolio portraits so visual polish does not drift away from Sergey.

## Reference Priority

1. `photo_2026-03-12_18-22-02.jpg` - primary identity anchor for head shape, face proportions, eye spacing, glasses-era front view, and calm expression.
2. `tmp/profile-refs/IMG_0038.png` - strongest current-look anchor: wet/darker hair, fuller short beard, sharper tan skin tone, three-quarter jaw/nose structure.
3. `tmp/profile-refs/IMG_0026.png`, `IMG_0027.png`, `IMG_0028.png` - supporting anchors for side profile, body build, cheek/jaw contour, and current hairline.

## Stable Facial Traits To Preserve

- Head shape: compact oval-to-rectangular, not elongated; forehead medium height, not tall.
- Jaw: defined but not overly broad or square; chin compact with a slight central beard point.
- Nose: straight bridge with moderate width; avoid making it too narrow or fashion-model sharp.
- Eyes: slightly deep-set, calm, focused; avoid enlarged glossy eyes.
- Brows: dark, straight-to-slightly angled, medium density.
- Mouth: neutral, modest width, subtle closed expression; avoid fuller lips or a strong smile.
- Hair: dark brown, short, natural texture; recent references have wet/swept-back hair, older front reference has a short side-swept cut.
- Beard: short dark beard and mustache, denser along jaw/chin, not a heavy full beard.

## Generated Variant Scores

| Variant | File | Likeness | Useful Traits | Main Drift |
| --- | --- | ---: | --- | --- |
| v2 with glasses | `static/images/profile-2026-likeness.png` | 7/10 | Better head width, frontal proportions, calmer expression, closer to old indoor reference | Too polished, glasses force an older look, hair/beard less current |
| v3 no glasses | `$CODEX_HOME/generated_images/...062318314c...png` | 5/10 | Better current no-glasses direction, good professional styling | Head too elongated, jaw too wide/model-like, eyes/expression drift, less recognizably Sergey |
| v4 no glasses | `static/images/profile-2026-likeness-v4.png` | 6/10 | More compact than v3, good portfolio lighting | Still too generic/symmetric, eyes and lips drift, not enough identity lock |

## Active Choice

Use `static/images/profile-2026-likeness.png` as the live website portrait. The glasses version is the best current balance of likeness and portfolio polish.

## Next Generation Strategy

Only generate another replacement if it can preserve the glasses-version identity while improving naturalness. Avoid “cinematic hero” transformations that beautify the face into a generic founder portrait.

Prompt constraints:

- Preserve compact head shape from the indoor front portrait.
- Preserve current beard, wet/dark hair texture, jaw and nose from `IMG_0038`.
- Keep glasses by default because they stabilize the likeness.
- Professional black or charcoal crew-neck / overshirt is fine.
- Dark product-interface background is secondary; identity is primary.
- No pool, no bare chest, no tropical flower, no fashion-model cheekbones.
