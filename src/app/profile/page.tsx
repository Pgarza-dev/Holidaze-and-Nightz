import React from 'react'
import Container from '@/components/Container'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function ProfilePage() {
  return (
    <div className="h-full w-full p-10">
      <Container className="border-2 border-customBlack h-full w-full p-5">
        <div className="p-4">
          <Avatar className="h-20 w-20 md:h-1/4 md:w-1/4">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>
          <h1>Profile name</h1>
        </div>
        <div></div>
      </Container>
    </div>
  )
}

export default ProfilePage
