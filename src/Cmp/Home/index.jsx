import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addImage, removeImage, resetImage } from "../../redux/slices/images.slice";
import { useSelector } from 'react-redux';

// home pagel
const Home = () => {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.imagesSlice);

    const onSubmit = (e) => {
        e.preventDefault();
        const url = e.target[0].value;
        dispatch(addImage(url));
    }

    return (
        <div className="flex items-center justify-center bg-amber-50 min-h-screen p-4">
            <div className="flex flex-col gap-y-6 w-full max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold text-violet-600">Past Image Url</h1>
                <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
                    <input
                        required
                        className="border border-violet-600 rounded-lg w-full p-3"
                        placeholder="http://localhost:3000/"
                        type="url" 
                    />
                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <button
                            type="submit"
                            className="bg-violet-600 text-white rounded px-6 py-2.5 w-full md:w-auto"
                        >
                            SUBMIT
                        </button>
                        <button
                            type="button"
                            onClick={() => dispatch(resetImage())}
                            className="bg-violet-600 text-white rounded px-6 py-2.5 w-full md:w-auto"
                        >
                            RESET
                        </button>
                        <Link to="/images" className="font-semibold text-gray-500 w-full md:w-auto text-center">
                            VIEW
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {
                            images && images.map((item, index) => (
                                <img
                                    className="w-full h-40 md:h-48 lg:h-64 object-cover rounded cursor-pointer"
                                    onClick={() => dispatch(removeImage(index))}
                                    src={item}
                                    alt={`Uploaded item ${index + 1}`}
                                    key={index}
                                />
                            ))
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Home;
