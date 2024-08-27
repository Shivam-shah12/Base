"use client"
import Sidebar from "../../../components/sidebar";
import useStore from "../../../lib/store";


export default  function SetupPage({children}) {
  
  const {close} = useStore();
  return (
    <main className="w-full flex md:flex-row flex-col h-full">
      <div className="relative flex h-[100vh]  dark:bg-black bg-white">
        <Sidebar/>
      </div>
      <div className = {`md:w-full  ${close == true ? "w-full p-4" : "hidden"} bg-[#F2F3F5] text-black dark:bg-[#3C3D37] dark:text-[#F2F3F5]`}>
        {children}
      </div>
    </main>
  );
}
