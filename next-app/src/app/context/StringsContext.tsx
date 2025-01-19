// src/context/StringsContext.tsx
'use client';
import { createContext } from 'react';
import type { Metadata } from "next";


export interface StringsContextType {
    welcomeMessage: string;
    loginButton: string;
    logoutButton: string;
    siteTitle: string;
    metadata: Metadata;
    // Add more strings as needed
}

const StringsContext = createContext<StringsContextType | undefined>(undefined);

export default StringsContext;
