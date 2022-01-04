import sveltePreprocess from 'svelte-preprocess'
import makeAttractionsImporter from 'attractions/importer.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    sveltePreprocess({
      scss: {
        importer: makeAttractionsImporter({
          // specify the path to your theme file, relative to this file
          themeFile: path.join(__dirname, 'public/css/theme.scss'),
        }),
        // not mandatory but nice to have for concise imports
        includePaths: [path.join(__dirname, './public/css')],
      },
    }),
  ],
}
