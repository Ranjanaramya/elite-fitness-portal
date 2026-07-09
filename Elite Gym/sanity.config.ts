import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from './sanity/schemas';
import { projectId, dataset } from './sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Elite Gym Studio',

  projectId,
  dataset,
  basePath: '/studio',

  plugins: [structureTool()],

  schema: {
    types: schema.types,
  },
});
