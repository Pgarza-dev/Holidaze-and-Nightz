import React, { useContext } from 'react'
import { LoginContext } from './loginContext'

function useLoginContext() {

   const context = useContext(LoginContext)
   return context!;
    }
export default useLoginContext
