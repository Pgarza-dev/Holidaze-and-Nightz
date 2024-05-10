import React from "react";
import Container from "@/components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

function ProfilePage() {
  return (
    <div className="h-full w-full p-10">
      <Container className="h-full w-full border-2 border-customBlack p-5">
        <div className="p-4 flex flex-col justify-center">
          <Avatar className="h-full w-full md:h-1/4 md:w-1/4 m-auto">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>PG</AvatarFallback>
          </Avatar>
          <Button className="mt-4">Upload new avatar</Button>
        </div>
        <div>
          <h1>Pablo Garza</h1>
          <p>Bio here</p>
          <p>My venues</p>
          <p>My Bookings</p>
        </div>
      </Container>
    </div>
  );
}

export default ProfilePage;
