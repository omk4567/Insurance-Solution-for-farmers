import toast from "react-hot-toast";


export const resAndNavigate=(res,navigate,url)=>{
    if(res.data){
        toast.success(res.data.message)
        if(navigate){
            return navigate(url)
        }
    }else{
        console.log(res)
        toast.error(res.error.data.message || "Something went Wrong")
    }
}