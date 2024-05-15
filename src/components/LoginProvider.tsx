// "use client";
// import { LoginContext } from "@/utils/loginContext";
// import React, { use, useEffect, useState } from "react";

// interface Props {
//   children: React.ReactNode;
// }

// function LoginProvider({ children }: Props) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     console.log(localStorage.getItem("token"));
//   }, [isLoggedIn]);
  
//   useEffect(() => {
//     setIsLoggedIn(localStorage.getItem("token") ? true : false);
//   }, []);

//   return (
//     <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </LoginContext.Provider>
//   );
// }

// export default LoginProvider;
