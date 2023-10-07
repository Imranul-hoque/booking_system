'use client'

import { FC } from "react";
import { SessionProvider } from 'next-auth/react';
interface SessionProviderProps {
    children : React.ReactNode
}

const SessionWrapper:FC<SessionProviderProps> = ({ children }) => {
    return ( 
        <SessionProvider>
            {children}
        </SessionProvider>
     );
}
 
export default SessionWrapper;