// MAY NOT NEED THIS FILE

type HandleLocalStorageUser = {
  LOCAL_STORAGE_KEY: string
}

interface User {
  avatar: string
  accessToken: string
}

export function handleLocalStorageUser({
  LOCAL_STORAGE_KEY,
}: HandleLocalStorageUser) {
  const getUser = (): User | null => {
    const user = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!user) {
      return null
    }
    return JSON.parse(user)
  }

  const setUser = (user: User) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
  }

  return {
    getUser,
    setUser,
  }
}

export function clearUser({ LOCAL_STORAGE_KEY }: HandleLocalStorageUser) {
  const clearUser = (): User | null => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    return null
  }
  return {
    clearUser,
  }
}
