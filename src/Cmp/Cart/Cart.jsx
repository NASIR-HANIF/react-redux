import { useDispatch, useSelector } from "react-redux";
import { removeCart, removeAllCart } from "../../redux/slices/cart.slice"



const Cart = () => {
    const cart = useSelector((state) => state.cartSlice);
    const dispatch = useDispatch()

    return (

        <div className="flex flex-col mt-8 p-3 sm:p-8 bg-red-50">
            <div className="w-3/4 mt-12 mx-auto flex flex-col gap-4">
                <div>
                   {
                    cart.length > 0 ?

                    <button className="px-2 py-1 bg-rose-500 text-white text-sm font-bold rounded hover:bg-rose-600 transition duration-200 ease-in-out"
                    onClick={() => dispatch(removeAllCart())}
                >
                    Remove All
                </button>    :   <h1 className="text-2xl">Your Cart Is Empty</h1>
                   }
                </div>
                {cart.map((item, index) => (
                    <div
                        className="bg-white rounded-lg p-4 shadow-lg flex flex-col sm:flex-row animate__animated animate__zoomIn "
                        key={index}
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full sm:w-56 sm:h-56 object-contain rounded-md mb-4 sm:mb-0"
                        />
                        <div className="flex flex-col gap-4 flex-1 sm:ml-4">
                            <h1 className="text-left overflow-hidden truncate font-semibold text-lg">
                                {item.title}
                            </h1>
                            <p className="text-left text-gray-600 text-sm line-clamp-3">
                                {item.description}
                            </p>
                            <p className="text-left font-semibold text-lg mt-auto">
                                Rs. {item.price}
                            </p>
                            <div className="flex gap-x-4 justify-end mt-4">
                                <button className=" px-2 py-1 bg-green-500 text-white text-sm font-bold rounded hover:bg-green-600 transition duration-200 ease-in-out">
                                    Buy Now
                                </button>
                                <button className="px-2 py-1 bg-rose-500 text-white text-sm font-bold rounded hover:bg-rose-600 transition duration-200 ease-in-out"
                                    onClick={() => dispatch(removeCart(index))}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>



    )
};
export default Cart;