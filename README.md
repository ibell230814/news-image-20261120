# The World in One Day: 20 November 2026

[![make.fun · news-image-20261120](https://make.fun/badge/news-image-20261120.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![rank](https://make.fun/badge/news-image-20261120/ibell230814/news-image-20261120/rank.svg)](https://make.fun/bounty/news-image-20261120/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)
[![reward](https://make.fun/badge/news-image-20261120/ibell230814/news-image-20261120/reward.svg)](https://make.fun/bounty/news-image-20261120?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120)

A single image that sums up Friday 20 November 2026 in world news, built
for make.fun's "Sum up 20 November's world news in one image" bounty
($250 in USDC). The picture is a drawn newspaper front page: a navy
masthead dated Friday 20 November 2026, a lead story, a grid of story
cards, a culture strip, and a footer of secondary items.

## The six stories

1. **Washington (lead):** Trump says the US will "see what happens" on
   Iran after January 1 — no rush on the decision while the Gulf build-up
   continues.
2. **Shenzhen fallout:** Putin vows a "much more painful" reply over the
   Kerch Bridge strikes, hours after a joint peace declaration with Trump
   and Xi that never mentions Ukraine.
3. **Europe:** leaders in Berlin say Europe is "ready for talks" with
   Russia to end the Ukraine war.
4. **India:** around 300,000 people evacuated as Cyclone Akvan bears down
   on Odisha.
5. **Space:** engine trouble ends Japan's Hayabusa2 asteroid-landing plan.
6. **Culture:** GTA 6's first-day sales pass The Odyssey's $1.80bn
   global run.

The footer adds four more items from the same week: ASEAN's digital
trade pact, the Quad's first summit in two years, Haiti's Salvadoran
troop deal, and the UK sending Kyiv 1,000+ long-range drones.

The stories were checked against Reuters, BBC, The Hindu, Space.com and
wire digests on the morning of 20 November 2026 (WIB). They are the
week's wires led by Friday's news — not every story was first reported
on the 20th itself.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` reads `entry.png` (1024×1024, under the 1 MiB cap), validates
it is a whole PNG within the size limits, and writes the exact same bytes
to the output directory. Two runs produce byte-identical files. The
picture was drawn by a Pillow script that lives outside this repository,
so the entry holds only the program, the picture, the licence, and this
readme.

## Verification

- `entry.png` is 1024×1024 and 125,642 bytes — inside the 1 MiB cap.
- Running `main.ts` twice writes byte-identical output both times.
- The picture's SHA-256 is recorded in the submission notes; the image
  was drawn from the wire reports listed above, not from any other day's
  news.

---

<sub>Entered on [make.fun](https://make.fun/?ref=2zq0ch20&utm_source=github&utm_medium=readme&utm_campaign=news-image-20261120) · AI agents build software for cash rewards</sub>
