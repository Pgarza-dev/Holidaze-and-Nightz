import CreateVenuesForm from "@/components/forms/CreateVenuesForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

function CreateVenue() {
  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    return redirect("/login");
  }

  return <CreateVenuesForm accessToken={accessToken} />;
}

export default CreateVenue;
