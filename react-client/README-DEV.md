## React API Client: Generated from OpenAPI

This app was scaffolded with Vite (React + TypeScript) and configured to generate a fully typed API client from the root `OpenAPI.yml` using Orval. It exposes axios-based services and is ready to layer React Query hooks and UI screens.

### Structure

- `orval.config.ts`: Orval configuration reading `../OpenAPI.yml` and generating to `src/api/generated` using an axios mutator.
- `src/api/http/axios-instance.ts`: Central axios client and Orval-compatible mutator (`createAxiosInstance<T>`).
- `src/api/generated/`: Auto-generated services and schemas (do not edit).
- `src/main.tsx`: App entry with `QueryClientProvider` and React Query Devtools.
- `.env.example`: Declare `VITE_API_BASE_URL` for axios base URL.

### Scripts

- `npm run api:generate`: Generate the client from `OpenAPI.yml`.
- `npm run api:watch`: Watch and regenerate on changes.
- `npm run dev`: Start Vite dev server.
- `npm run build`: Type-check and build for production.

### Environment

Copy `.env.example` to `.env` and set your API base URL:

```
VITE_API_BASE_URL=http://localhost:3000
```

### Using the generated client

The generator created axios-powered functions in `src/api/generated/gitdmApi.ts`. Each function returns the response data directly (mutator unwraps `AxiosResponse`). Example usage in a component:

```tsx
import { useQuery } from '@tanstack/react-query';
import { getGitdmApi } from './api/generated/gitdmApi';

export function Example() {
  const api = getGitdmApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ['ai-summaries'],
    queryFn: () => api.apiAiSummariesList(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

Note: Current config generates services only. If you want Orval to also emit ready-to-use React Query hooks (e.g., `useApiAiSummariesList`), update `orval.config.ts` to use `output.client: 'react-query'` and set `useQuery`/`useMutation` overrides accordingly. The axios mutator will still work.

### Conventions & next steps

- Co-locate feature-level API calls under `src/features/<feature>/api.ts` that wrap the generated endpoints for domain clarity.
- Use React Query for caching, pagination, and mutations. Define query keys in a central `src/api/queryKeys.ts`.
- Add error boundaries and toasts for mutation errors.
- Introduce a lightweight UI library (e.g., Mantine, MUI, or Tailwind) and build minimal resource screens:
  - List + detail for each top-level resource found in `OpenAPI.yml` (e.g., AI summaries, patients, encounters, etc.).
  - CRUD forms driven by generated types.
- Add auth token retrieval in `axios-instance.ts` by wiring `getAuthToken` or by injecting an interceptor based on your auth flow.

### Troubleshooting

- If types fail with `verbatimModuleSyntax`, ensure type-only imports are used where needed.
- If Orval warns about `import.meta`, ignore: build-time bundlers provide it; Orval just parses files.
- If peer dependency warnings appear for React Query on React 19, installs use `--legacy-peer-deps` for now.

### Regeneration notes

Do not edit files under `src/api/generated`. Regenerate after any change to `OpenAPI.yml`:

```
npm run api:generate
```

