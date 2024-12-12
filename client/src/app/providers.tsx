'use client';

import { AlchemyClientState } from '@account-kit/core';
import { AlchemyAccountProvider } from '@account-kit/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';
import { config, queryClient } from './config';
import { ReduxProvider } from '@/redux/provider';

export const Providers = (
    props: PropsWithChildren
) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ReduxProvider>{props.children}</ReduxProvider>
        </QueryClientProvider>
    );
};