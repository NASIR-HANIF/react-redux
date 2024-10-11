import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/slices/products.slice";
import { addToCart } from "../../redux/slices/cart.slice";

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsSlice);
   

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <>
            {products.loading && (
                <div className="min-h-screen bg-red-100 flex items-center justify-center">
                    <h1 className="text-2xl shadow-sm p-3 px-5 rounded-lg bg-white font-semibold">
                        Loading...
                    </h1>
                </div>
            )}
            {products.loading === false && products.data && (
                <div className="p-8 bg-red-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 ">
                        {products.data.map((item, index) => (
                            <div
                                className="bg-white border rounded-lg p-4 shadow-lg flex flex-col animate__animated animate__zoomIn"
                                key={index}
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-full object-contain rounded-md mb-4"
                                />
                                <div className="flex flex-col gap-2 flex-1">
                                    <h1 className="text-left overflow-hidden truncate font-semibold text-lg">
                                        {item.title}
                                    </h1>
                                    <p className="text-left text-gray-600 text-sm line-clamp-3">
                                        {item.description}
                                    </p>
                                    <p className="text-left font-semibold text-lg mt-auto">
                                        Rs. {item.price}
                                    </p>
                                </div>
                                <div className="flex justify-between items-center mt-5 space-x-2">
                                    <button
                                    onClick={()=>dispatch(addToCart(item))}
                                    className="flex-1 px-4 py-2 bg-orange-500 text-white font-bold rounded hover:bg-orange-600 transition duration-200 ease-in-out">
                                        Add To Cart
                                    </button>
                                    <button className="flex-1 px-4 py-2 bg-green-500 text-white font-bold rounded hover:bg-green-600 transition duration-200 ease-in-out">
                                        Buy Now
                                    </button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            )}
            {products.loading === false && products.error && (
                <div className="min-h-screen bg-red-100 flex items-center justify-center">
                    <h1 className="text-2xl shadow-sm p-3 px-5 rounded-lg bg-red-500 text-white font-semibold">
                        Something went wrong!
                    </h1>
                </div>
            )}
        </>
    );
};

export default Products;
