import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.Dxvl5Tte.js","_app/immutable/chunks/scheduler.B4ym6uSw.js","_app/immutable/chunks/index.firPCsyK.js","_app/immutable/chunks/each.C0VMsXMu.js"];
export const stylesheets = ["_app/immutable/assets/2.GLX7K9hR.css"];
export const fonts = [];
