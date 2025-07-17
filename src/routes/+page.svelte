<script>
  import SveltePlayer from "../lib/Player/SveltePlayer.svelte";
  import DeckBuilder from "../lib/deckbuilder/Deckbuilder";
  import { zodDeckV1 } from "../lib/deckbuilder/schema/ZodDeckV1";

  let deck = null;
  let background = {};

  // ──────────── image support ────────────
  let imageMap = new Map();
  const defaultImage = "/static/images/box.webp"; // fallback for missing images

  function resolveImage(path) {
    const filename = path.split("/").pop();
    return imageMap.get(filename) || defaultImage;
  }

  function updateDeckImages() {
    if (!deck || !Array.isArray(deck.slides)) return;
    deck.slides = deck.slides.map((s) => {
      if (s.image) s.image = resolveImage(s.image);
      return s;
    });
  }

  function handleImagesUpload(event) {
    const files = event.target.files;
    for (const file of files) {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        imageMap.set(file.name, url);
      }
    }
    // if deck is already loaded, refresh its image paths
    updateDeckImages();
  }

  // ──────────── deck upload ────────────
  function cleanDeckSource(src) {
    return (
      src
        // remove any import line (with possible indent)
        .replace(/^\s*import\s.*$/gm, "")
        // remove “export …” or “export default …” (keep the rest of the line)
        .replace(/^\s*export\s+(default\s+)?/gm, "")
        .trim()
    );
  }

  async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const rawText = await file.text();
    const cleaned = cleanDeckSource(rawText);

    try {
      const getDefineDeck = new Function(
        "deckbuilder",
        cleaned + "\nreturn defineDeck;"
      );

      const defineDeck = getDefineDeck(undefined);

      if (typeof defineDeck !== "function") {
        throw new Error("defineDeck is not a function after parsing.");
      }

      const builder = new DeckBuilder();
      defineDeck(builder);
      const candidate = builder.build();

      const check = zodDeckV1.safeParse(candidate);
      if (!check.success) {
        const err = check.error.errors[0];
        throw new Error(`Zod failed at ${err.path.join(".")}: ${err.message}`);
      }

      deck = check.data.deck;
      background = check.data.background;

      // After loading deck, remap images in case images already uploaded
      updateDeckImages();

    } catch (e) {
      console.error("─── Cleaned deck source that failed ───\n", cleaned);
      console.error(e);
      alert("Deck load error:\n" + e.message);
    }
  }
</script>

<main class="player-container">
  {#if deck}
    {#key deck}
      <SveltePlayer {deck} {background} />
    {/key}
  {:else}
    <p class="placeholder">Please upload a deck JS file to start.</p>
  {/if}
</main>

<div class="upload-container">
  <label class="upload-button deck-btn">
    Upload Deck JS
    <input type="file" accept=".js" on:change={handleFileUpload} />
  </label>

  <!-- <label class="upload-button image-btn">
    Upload Images
    <input type="file" accept="image/*" multiple on:change={handleImagesUpload} />
  </label> -->
</div>

<style>
  .player-container {
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
  }
  .placeholder {
    color: #6c757d;
    font-size: 1.2rem;
  }
  .upload-container {
    text-align: center;
    margin: 1rem 0;
  }
  .upload-button {
    position: relative;
    display: inline-block;
    padding: 1rem 2rem;
    color: #fff;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .deck-btn {
    background-color: #007bff;
  }
  .image-btn {
    background-color: #28a745;
    margin-left: 0.75rem;
  }
  .upload-button input[type="file"] {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
</style>
