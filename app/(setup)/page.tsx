import { InitialProfile } from "../../lib/initial-profile";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const SetupPage=async()=>{
    const profile=await InitialProfile();
    console.log(profile)
    
    if(!profile)
      return auth().redirectToSignIn();

    return redirect(`/feature/dashboard`);

}
export default SetupPage;