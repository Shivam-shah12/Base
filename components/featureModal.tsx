"use client";

import { useTheme } from "next-themes";
import { Bell } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useEffect , useState} from "react";
import { showToast } from "./toastHelper";

interface Props {
  fileName: string
}



const FeatureModal = ({ fileName }: Props) => {
  const { theme,setTheme } = useTheme();
  const [mode,setMode] = useState("dark");
  useEffect(()=>{
    setMode(theme);
  },[theme])

  const handleBell = ()=>{
    showToast("info","notification off")
  }
    return (
    <main className={`w-full flex flex-col h-screen space-y-20 py-1 px-4 bg-inherit`}>
      <div className="flex items-center justify-between p-4 mb-4">
        <div className="text-2xl font-semibold">
          {fileName.charAt(0).toUpperCase() + fileName.slice(1)}
        </div>        
          <div className="md:flex  hidden items-center space-x-6 cursor-pointer">
          <Bell  onClick={handleBell}/>
          <UserButton />
        </div>
      </div>
      <div
        className={`w-full flex flex-col h-screen items-center pt-10 overflow-y-auto`}
      >
        No {fileName}  feature available !
      </div>
    </main>
  );
}


export default FeatureModal;