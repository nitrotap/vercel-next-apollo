'use client';

import { useContext } from 'react';
import StringsContext from '../../app/context/StringsContext';
import Link from 'next/link'
import AuthService from '@/app/auth/authService';

import { useRouter } from 'next/navigation';


const Nav = () => {
  const strings = useContext(StringsContext);
  const router = useRouter()


  if (!strings) {
    throw new Error('StringsContext is undefined. Ensure that the component is wrapped with StringsProvider.');
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl"
          href="/">{strings.siteTitle}</Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <details>
              <summary>Go to</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>{
                  AuthService.loggedIn() ? (
                    <button onClick={() => AuthService.logout()}>Sign out</button>
                  ) : (
                    <button onClick={() => router.push('/auth')}>Sign in</button>
                  )}
                </li>
                <li>
                  <Link href="/auth/profile">Profile</Link>
                </li>

              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
