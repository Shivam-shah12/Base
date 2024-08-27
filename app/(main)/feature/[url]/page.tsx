import FeatureModal from "../../../../components/featureModal";
interface Props{
    params:{
        url : string
    }
}

const Page = ({params} : Props)=>{
    const name = params.url;
    if(!name)
        return null;
    return (
    <div className=" relative w-full flex  justify-center min-h-screen">
       <FeatureModal fileName = {name} />
    </div>
    );
}

export default Page;