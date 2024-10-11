import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from '../../redux/slices/auth.slice';
import { useState } from "react";

const menue = [
    { label: "Home", to: "/" },
    { label: "Images", to: "/images" },
    { label: "Products", to: "/products" },
    { label: "Posts", to: "/post" },
    { label: "Cart", to: "/cart", badge: true},
    { label: "Login", to: "/login" },
];

const Layout = (data) => {
    const dispatch = useDispatch();
    const authSlice = useSelector((state) => state.authSlice);
    const cart = useSelector((state) => state.cartSlice);
    const navigate = useNavigate();
    const [popup, setPopup] = useState(false);
    const [animate, setAnimate] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    const logoutFun = () => {
        dispatch(logout());
        navigate("/");
    };

    // handle popup
    const handlePopup = () => {
        if (popup) {
            setAnimate('animate__animated animate__flipOutX');
            setTimeout(() => { setPopup(false) }, 500);
        } else {
            setAnimate('animate__animated animate__flipInY');
            setPopup(true);
        }
    };

    return (
        <>
            <div>
                <nav>
                    <div className="bg-slate-900 w-full z-10 flex fixed top-0 left-0 justify-between items-center px-6 ">
                        <h1 className="text-white text-2xl font-bold">Redux</h1>
                        <button 
                            onClick={() => setMenuOpen(!menuOpen)} 
                            className="lg:hidden text-white"
                            aria-label="Toggle Menu"
                        >
                            ☰
                        </button>
                        <ul className={`lg:flex ${menuOpen ? 'block' : 'hidden'} flex-col lg:flex-row lg:items-center`}>
                            {
                                menue.map((item, index) => (
                                    (authSlice.user && item.to) !== "/login" &&
                                    <li className="p-4 lg:p-5 hover:bg-indigo-600 relative" key={index}>

                                        {
                                           ( item.badge && cart.length > 0) &&
                                            <div className="absolute top-0 right-0 bg-red-500 w-8 h-8 
                                             rounded-full flex items-center justify-center text-white font-semibold">
                                                {cart.length}
                                            </div>
                                        }
                                        <Link className="text-white capitalize font-semibold" to={item.to}>
                                            {item.label}
                                        </Link>
                                    </li>
                                ))
                            }
                            {
                                authSlice.user &&
                                <li className="relative flex items-center">
                                    <button
                                        onClick={handlePopup}
                                        className="overflow-hidden h-8 w-8 bg-orange-600 rounded-full"
                                    >
                                        <img 
                                            className="w-full h-full"
                                            src={authSlice.user.image}
                                            alt={authSlice.user.username} 
                                        />
                                    </button>
                                    {
                                       
                                        popup && (
                                            <div className={`${animate} absolute top-12 right-0 border rounded bg-white shadow-lg w-48 mt-2`}>
                                                <Link to='/profile' className="block px-4 py-2 hover:bg-indigo-600 hover:text-white text-left">My Profile</Link>
                                                <button 
                                                    className="block px-4 py-2 hover:bg-indigo-600 hover:text-white text-left overflow-hidden whitespace-nowrap text-ellipsis"
                                                    style={{ maxWidth: '180px' }} // Optional inline style for further control
                                                >
                                                    {authSlice.user.email}
                                                </button>
                                                <button 
                                                    className="block px-4 py-2 hover:bg-indigo-600 hover:text-white text-left"
                                                    onClick={logoutFun}
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )
                                    
                                    
                                    }
                                </li>
                            }
                        </ul>
                    </div>
                </nav>
                <div>
                    {data.children}
                </div>
                <footer className="bg-slate-900 p-16">
                    <h1 className="text-6xl font-bold text-white">Footer</h1>
                </footer>
            </div>
        </>
    );
};
export default Layout;
