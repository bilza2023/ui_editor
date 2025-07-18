<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let deck: any = null;
  let deckLoaded = false;
  let error = '';

  let audio: HTMLAudioElement | null = null;
  let currentTime = 0;
  let soundUrl = '/sounds/default.opus';

  // continuously update currentTime
  const tick = () => {
    if (audio) currentTime = audio.currentTime;
    requestAnimationFrame(tick);
  };

  // Set end time of slide i
  function setSlideEnd(i: number) {
    if (!deck?.deck) return;
    const t = parseFloat(currentTime.toFixed(2));
    deck.deck[i].end = t;
    if (deck.deck[i + 1]) deck.deck[i + 1].start = t;
    deck = { ...deck };
  }

  // Set start time of slide i (and previous slide’s end)
  function setSlideStart(i: number) {
    if (!deck?.deck || i === 0) return;
    const t = parseFloat(currentTime.toFixed(2));
    deck.deck[i - 1].end = t;
    deck.deck[i].start = t;
    deck = { ...deck };
  }

  // Set showAt for a slide item
  function setShowAt(item: any) {
    item.showAt = parseFloat(currentTime.toFixed(2));
    deck = { ...deck };
  }

  onMount(async () => {
    tick();

    const filename = $page.url.searchParams.get('filename');
    if (!filename) {
      error = 'No filename provided';
      return;
    }

    // attempt to load audio from /sounds/<filename>.opus
    try {
      const head = await fetch(`/sounds/${filename}.opus`, { method: 'HEAD' });
      if (head.ok) {
        soundUrl = `/sounds/${filename}.opus`;
      }
    } catch {
      // ignore, fallback stays
    }

    // fetch deck JSON from your server endpoint
    try {
      const res = await fetch(`/timings?filename=${encodeURIComponent(filename)}`);
      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || res.statusText);
      }
      deck = await res.json();
      deckLoaded = true;
    } catch (e) {
      error = (e as Error).message;
    }
  });
</script>

<style>
  :global(body) {
    background-color: #1f2937; /* gray-800 */
    color: #f3f4f6; /* gray-100 */
  }
  .audio-panel {
    padding: 1rem;
  }
  .time-display {
    padding: 0 1rem 1rem;
    font-size: 0.875rem;
    color: #a0aec0; /* gray-400 */
  }
  .slide {
    padding: 1rem;
    border-bottom: 1px solid #374151; /* gray-700 */
  }
  .slide-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .item {
    padding-left: 1.5rem;
    font-size: 0.875rem;
    color: #e5e7eb; /* gray-200 */
    margin-top: 0.5rem;
  }
  input[type="number"] {
    width: 4.5rem;
    background-color: #374151;
    color: #f3f4f6;
    border: none;
    padding: 0.25rem;
    border-radius: 0.25rem;
    text-align: right;
  }
  button {
    margin-left: 0.5rem;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    background-color: #4a5568; /* gray-600 */
    color: #edf2f7;
    border: none;
    cursor: pointer;
    font-size: 0.75rem;
  }
  button:hover {
    background-color: #2d3748; /* gray-700 */
  }
  button.set-start {
    background-color: #6b7280; /* gray-500 */
  }
  button.set-start:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  button.set-end {
    background-color: #16a34a; /* green-600 */
  }
  button.set-show {
    background-color: #3b82f6; /* blue-500 */
  }
  .centered {
    text-align: center;
    margin-top: 2rem;
  }
  .error {
    color: #e53e3e; /* red-600 */
    text-align: center;
    margin-top: 1rem;
  }
</style>

{#if error}
  <p class="error">Error: {error}</p>
{:else if !deckLoaded}
  <p class="centered">Loading deck…</p>
{:else}
  <div class="audio-panel">
    <audio bind:this={audio} src={soundUrl} controls class="w-full"></audio>
  </div>

  <div class="time-display">
    Current Time: {currentTime.toFixed(2)}s
  </div>

  {#each deck.deck as slide, i}
    <div class="slide">
      <div class="slide-header">
        <strong>Slide {i + 1} — {slide.type}</strong>
        <button
          class="set-start"
          on:click={() => setSlideStart(i)}
          disabled={i === 0}
        >
          Set Start = Now
        </button>
      </div>

      <div style="display: flex; align-items: center; margin-top: 0.5rem;">
        <label>
          Start:
          <input type="number" bind:value={slide.start} step="0.01" />
        </label>
        <label style="margin-left: 1rem;">
          End:
          <input type="number" bind:value={slide.end} step="0.01" />
        </label>
        <button class="set-end" on:click={() => setSlideEnd(i)}>
          Set End = Now
        </button>
      </div>

      {#each slide.data as item}
        <div class="item">
          • {item.name || item.type}: "{item.content}"<br />
          showAt:
          <input type="number" bind:value={item.showAt} step="0.01" />
          <button class="set-show" on:click={() => setShowAt(item)}>
            Set = Now
          </button>
        </div>
      {/each}
    </div>
  {/each}
{/if}
