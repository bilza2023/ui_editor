import { c as create_ssr_component } from "../../chunks/ssr.js";
import "howler";
import "katex";
import { z } from "zod";
const baseSlide = z.object({
  start: z.number(),
  end: z.number()
});
const titleSlide = baseSlide.extend({
  type: z.literal("titleSlide"),
  data: z.array(
    z.object({
      name: z.literal("title"),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const titleAndSubtitle = baseSlide.extend({
  type: z.literal("titleAndSubtitle"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("subtitle"), content: z.string(), showAt: z.number() })
    ])
  )
});
const bulletList = baseSlide.extend({
  type: z.literal("bulletList"),
  data: z.array(
    z.object({
      name: z.literal("bullet"),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const twoColumnText = baseSlide.extend({
  type: z.literal("twoColumnText"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("left"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("right"), content: z.string(), showAt: z.number() })
    ])
  )
});
const imageSlide = baseSlide.extend({
  type: z.literal("imageSlide"),
  data: z.array(
    z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() })
  )
});
const imageWithTitle = baseSlide.extend({
  type: z.literal("imageWithTitle"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("title"), content: z.string(), showAt: z.number() })
    ])
  )
});
const imageWithCaption = baseSlide.extend({
  type: z.literal("imageWithCaption"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("caption"), content: z.string(), showAt: z.number() })
    ])
  )
});
const imageLeftBulletsRight = baseSlide.extend({
  type: z.literal("imageLeftBulletsRight"),
  data: z.array(
    z.object({
      name: z.union([z.literal("image"), z.literal("bullet")]),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const imageRightBulletsLeft = baseSlide.extend({
  type: z.literal("imageRightBulletsLeft"),
  data: z.array(
    z.object({
      name: z.union([z.literal("image"), z.literal("bullet")]),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const table = baseSlide.extend({
  type: z.literal("table"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("headers"), content: z.array(z.string()), showAt: z.number() }),
      z.object({ name: z.literal("rows"), content: z.array(z.array(z.string())), showAt: z.number() })
    ])
  )
});
const statistic = baseSlide.extend({
  type: z.literal("statistic"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("number"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("label"), content: z.string(), showAt: z.number() })
    ])
  )
});
const donutChart = baseSlide.extend({
  type: z.literal("donutChart"),
  data: z.array(
    z.object({
      name: z.union([z.literal("percent"), z.literal("label"), z.literal("color")]),
      content: z.string(),
      showAt: z.number()
    })
  )
});
const bigNumber = baseSlide.extend({
  type: z.literal("bigNumber"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("number"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("label"), content: z.string(), showAt: z.number() })
    ])
  )
});
const barChart = baseSlide.extend({
  type: z.literal("barChart"),
  data: z.array(
    z.object({
      name: z.literal("bar"),
      label: z.string(),
      value: z.number(),
      showAt: z.number()
    })
  )
});
const quoteSlide = baseSlide.extend({
  type: z.literal("quoteSlide"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("quoteLine"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("author"), content: z.string(), showAt: z.number() })
    ])
  )
});
const quoteWithImage = baseSlide.extend({
  type: z.literal("quoteWithImage"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("quoteLine"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("author"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("image"), content: z.string(), showAt: z.number() })
    ])
  )
});
const cornerWordsSlide = baseSlide.extend({
  type: z.literal("cornerWordsSlide"),
  data: z.array(
    z.object({
      name: z.literal("card"),
      icon: z.string(),
      label: z.string(),
      showAt: z.number()
    })
  )
});
const contactSlide = baseSlide.extend({
  type: z.literal("contactSlide"),
  data: z.array(
    z.union([
      z.object({ name: z.literal("headline"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("email"), content: z.string(), showAt: z.number() }),
      z.object({ name: z.literal("phone"), content: z.string(), showAt: z.number() })
    ])
  )
});
const eqSlide = baseSlide.extend({
  type: z.literal("eq"),
  data: z.array(
    z.object({
      name: z.literal("line"),
      type: z.union([
        z.literal("heading"),
        z.literal("text"),
        z.literal("math")
      ]),
      content: z.string(),
      showAt: z.number(),
      spItems: z.array(
        z.object({
          type: z.union([
            z.literal("spHeading"),
            z.literal("spText"),
            z.literal("spMath"),
            z.literal("spImage")
          ]),
          content: z.string()
        })
      ).optional()
    })
  )
});
const fillImage = baseSlide.extend({
  type: z.literal("fillImage"),
  data: z.array(
    z.object({
      name: z.literal("image"),
      content: z.string(),
      showAt: z.number()
    })
  )
});
z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["draft", "ready", "published", "archived"]).optional(),
  createdAt: z.string().datetime().optional(),
  editedAt: z.string().datetime().optional(),
  version: z.literal("deck-v1"),
  background: z.object({
    backgroundColor: z.string().optional(),
    backgroundImage: z.string().optional(),
    backgroundImageOpacity: z.number().optional()
  }).optional(),
  deck: z.array(
    z.discriminatedUnion("type", [
      eqSlide,
      fillImage,
      titleSlide,
      titleAndSubtitle,
      bulletList,
      twoColumnText,
      imageSlide,
      imageWithTitle,
      imageWithCaption,
      imageLeftBulletsRight,
      imageRightBulletsLeft,
      table,
      statistic,
      donutChart,
      bigNumber,
      barChart,
      quoteSlide,
      quoteWithImage,
      cornerWordsSlide,
      contactSlide
    ])
  )
});
const css = {
  code: '.player-container.svelte-co339o.svelte-co339o{padding:0;display:flex;justify-content:center;align-items:center;min-height:80vh}.placeholder.svelte-co339o.svelte-co339o{color:#6c757d;font-size:1.2rem}.upload-container.svelte-co339o.svelte-co339o{text-align:center;margin:1rem 0}.upload-button.svelte-co339o.svelte-co339o{position:relative;display:inline-block;padding:1rem 2rem;color:#fff;font-size:1rem;font-weight:bold;border:none;border-radius:4px;cursor:pointer}.deck-btn.svelte-co339o.svelte-co339o{background-color:#007bff}.image-btn.svelte-co339o.svelte-co339o{background-color:#28a745;margin-left:0.75rem}.upload-button.svelte-co339o input[type="file"].svelte-co339o{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer}',
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<main class="player-container svelte-co339o">${`<p class="placeholder svelte-co339o" data-svelte-h="svelte-oz2adn">Please upload a deck JS file to start.</p>`}</main> <div class="upload-container svelte-co339o"><label class="upload-button deck-btn svelte-co339o">Upload Deck JS
    <input type="file" accept=".js" class="svelte-co339o"></label> <label class="upload-button image-btn svelte-co339o">Upload Images
    <input type="file" accept="image/*" multiple class="svelte-co339o"></label> </div>`;
});
export {
  Page as default
};
