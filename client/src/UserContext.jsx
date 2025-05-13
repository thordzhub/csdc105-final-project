// This component provides a way to store and share information about the user
// (like login status or user details) across different parts of the application.
// It makes it easy for any part of the app to access and update user data.

import {createContext, useState} from "react"; // Importing React Context and useState hook

// Creating a UserContext to hold user-related data
export const UserContext = createContext({});

// The UserContextProvider component that wraps the app to provide user context to all its children
export function UserContextProvider({children}) {
  // Defining a state to store user information
  const [userInfo, setUserInfo] = useState({});

  return (
    // Providing the userInfo and setUserInfo to all child components via context
    <UserContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </UserContext.Provider>
  );
}
