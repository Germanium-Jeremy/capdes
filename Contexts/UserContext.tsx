import React, { createContext, ReactNode, useState } from "react";

interface UserContentProps {
     userId: string | undefined;
     setUserId: (userId: string | undefined) => void
     resetEmail: string | undefined
     setResetEmail: (resetEmail: string | undefined) => void
}

export const UserContect = createContext<UserContentProps>({
     userId: undefined,
     setUserId: () => { },
     resetEmail: '',
     setResetEmail: () => {}
})

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
     const [userId, setUserId] = useState<string | undefined>('')
     const [resetEmail, setResetEmail] = useState<string | undefined>('')
     return (
          <UserContect.Provider value={{ userId, setUserId, resetEmail, setResetEmail }}>
               { children }
          </UserContect.Provider>
     )
}