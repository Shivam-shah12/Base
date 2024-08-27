import { InitialProfile } from "../../lib/initial-profile";
import { redirect } from "next/navigation";


const SetupPage=async()=>{
    const profile=await InitialProfile();
    
    if(!profile)
      return redirect("/sign-in");

    return redirect(`/feature/dashboard`);

}
export default SetupPage;