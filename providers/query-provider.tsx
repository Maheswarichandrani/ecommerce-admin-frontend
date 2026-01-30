'use client';

import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // Stale time: Data remains fresh for 60 seconds
                staleTime: 60 * 1000,

                // Cache time: Data persists in cache for 5 minutes after becoming unused
                gcTime: 5 * 60 * 1000,

                // Retry failed requests 1 time (admin operations should fail fast)
                retry: 1,

                // Refetch on window focus for real-time data
                refetchOnWindowFocus: true,

                // Don't refetch on mount if data is fresh
                refetchOnMount: false,

                // Disable refetch on reconnect (manual refresh preferred)
                refetchOnReconnect: false,
            },
            mutations: {
                // Retry failed mutations 0 times (user should manually retry)
                retry: 0,

                // Network mode - fail if offline
                networkMode: 'online',
            },
        },
    });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
    if (typeof window === 'undefined') {
        return makeQueryClient();
    }
    return (browserQueryClient ??= makeQueryClient());
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
    // Using React.useState ensures client is stable across re-renders
    const [queryClient] = React.useState(() => getQueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}