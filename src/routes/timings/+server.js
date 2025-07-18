
// src/routes/timings/+server.js
import { json } from '@sveltejs/kit';
import * as deckService from '../../lib/services/deckService';

export async function GET({ url }) {
  const filename = url.searchParams.get('filename');
  if (!filename) {
    return json({ error: 'filename required' }, { status: 400 });
  }

  const record = await deckService.getDeckByFilename(filename);
  if (!record) {
    return json({ error: 'Deck not found' }, { status: 404 });
  }

  // return the JSON content of the deck
  return json(record.content);
}
