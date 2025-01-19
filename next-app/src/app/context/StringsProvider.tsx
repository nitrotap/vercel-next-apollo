// src/context/StringsProvider.tsx
import { ReactNode } from 'react';
import StringsContext, { StringsContextType } from './StringsContext';

const strings: StringsContextType = {
  welcomeMessage: 'Welcome to Teaching Poets Collective!',
  loginButton: 'Log In',
  logoutButton: 'Log Out',
  siteTitle: 'Teaching Poets Collective',
  metadata: {
    description: 'Teaching Poets Collective - helping connect poets to teach poetry',
    title: 'Teaching Poets Collective',
  },


  // Add more strings as needed
};

interface StringsProviderProps {
  children: ReactNode;
}

const StringsProvider = ({ children }: StringsProviderProps) => (
  <StringsContext.Provider value={strings}>
    {children}
  </StringsContext.Provider>
);

export default StringsProvider;

