import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: '../OpenAPI.yml',
    output: {
      mode: 'split',
      target: 'src/api/generated',
      client: 'react-query',
      prettier: false,
      clean: true,
      override: {
        mutator: {
          path: '../../api/http/axios-instance.ts',
          name: 'createAxiosInstance',
        },
      },
    },
  },
});

