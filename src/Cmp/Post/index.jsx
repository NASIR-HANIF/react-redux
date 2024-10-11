import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../redux/slices/post.slice";
import { useEffect } from "react";




const Post = () => {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postSlice);


    useEffect(() => {
        dispatch(getPost())
    }, [])
    return (
        <>
            {
                post.loading &&
                <div className="min-h-screen bg-red-100 flex items-center justify-center">
                    <h1 className="text-2xl shadow-sm p-3 px-5 rounded-lg bg-white font-semibold">Loading...</h1>
                </div>
            }
            {
                (post.loading === false && post.data) &&

                <div className="min-h-screen bg-red-100 flex flex-col items-center gap-y-4 p-8 md:px-0 md:py-16 ">
                    {
                        post.data.map((item,index)=>(
                            
                            
                            <div key={index} className="md:w-3/4 p-5 bg-white rounded-lg shadow-lg animate__animated animate__zoomIn">
                                <h1 className="font-semibold text-2xl">{item.title}</h1>
                                <p className=" text-slate-500">{item.body}</p>
                            </div>
                        ))
                    }
                </div>

            }
            {
                (post.loading === false && post.error) &&

                <div className="min-h-screen bg-red-100 flex items-center justify-center">
                    <h1 className="text-2xl shadow-sm p-3 px-5 rounded-lg bg-red-500 text-white font-semibold">Something went wrong !</h1>
                </div>

            }


        </>
    )
};

export default Post;