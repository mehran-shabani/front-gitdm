// Central query keys management for React Query
// This ensures consistent cache invalidation and query management

export const queryKeys = {
  all: ['gitdm'] as const,
  
  // AI Summaries
  aiSummaries: {
    all: ['gitdm', 'ai-summaries'] as const,
    lists: () => [...queryKeys.aiSummaries.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.aiSummaries.lists(), filters] as const,
    details: () => [...queryKeys.aiSummaries.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.aiSummaries.details(), id] as const,
  },
  
  // Patients
  patients: {
    all: ['gitdm', 'patients'] as const,
    lists: () => [...queryKeys.patients.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.patients.lists(), filters] as const,
    details: () => [...queryKeys.patients.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.patients.details(), id] as const,
  },
  
  // Encounters
  encounters: {
    all: ['gitdm', 'encounters'] as const,
    lists: () => [...queryKeys.encounters.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.encounters.lists(), filters] as const,
    details: () => [...queryKeys.encounters.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.encounters.details(), id] as const,
  },
  
  // Clinical References
  clinicalReferences: {
    all: ['gitdm', 'clinical-references'] as const,
    lists: () => [...queryKeys.clinicalReferences.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.clinicalReferences.lists(), filters] as const,
    details: () => [...queryKeys.clinicalReferences.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.clinicalReferences.details(), id] as const,
  },
  
  // Lab Results
  labResults: {
    all: ['gitdm', 'lab-results'] as const,
    lists: () => [...queryKeys.labResults.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.labResults.lists(), filters] as const,
    details: () => [...queryKeys.labResults.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.labResults.details(), id] as const,
  },
  
  // Medication Orders
  medicationOrders: {
    all: ['gitdm', 'medication-orders'] as const,
    lists: () => [...queryKeys.medicationOrders.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.medicationOrders.lists(), filters] as const,
    details: () => [...queryKeys.medicationOrders.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.medicationOrders.details(), id] as const,
  },
  
  // Authentication
  auth: {
    all: ['gitdm', 'auth'] as const,
    user: () => [...queryKeys.auth.all, 'user'] as const,
    token: () => [...queryKeys.auth.all, 'token'] as const,
  },
  
  // Versions (for resource history)
  versions: {
    all: ['gitdm', 'versions'] as const,
    list: (resourceType: string, resourceId: string) => 
      [...queryKeys.versions.all, resourceType, resourceId] as const,
  }
};

// Helper function to invalidate all queries for a specific resource
export const invalidateResourceQueries = (
  queryClient: import('@tanstack/react-query').QueryClient,
  resource: keyof typeof queryKeys
) => {
  const resourceKeys = queryKeys[resource];
  if ('all' in resourceKeys) {
    return queryClient.invalidateQueries({ queryKey: resourceKeys.all });
  }
};