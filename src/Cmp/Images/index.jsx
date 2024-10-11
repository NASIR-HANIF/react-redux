import { useSelector } from "react-redux"
import { removeImage } from "../../redux/slices/images.slice";
import { useDispatch } from "react-redux";

const Images = () => {
    const dispatch = useDispatch();

    const images = useSelector((state) => state.imagesSlice)
    return (
        <>
            <div className="p-16">
                <div className="grid grid-cols-4 gap-3">
                   
                        {
                           images && images.map((item, index) => (
                                <img
                                    className="w-64 h-64 object-cover"
                                    onClick={() => dispatch(removeImage(index))}
                                    src={item}
                                    alt={item}
                                    key={index}
                                    width={400}
                                />
                            ))
                        }
                   
                </div>
            </div>
        </>
    )
}

export default Images