import {Link, useNavigate} from "react-router-dom";
import ReactLogoIc from "./images/react-logo.png";
import {useContext} from "react";
import {AuthContext} from "../context/authContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    function onLogout() {
        logout();
        navigate('/');
    }

    return (
        <nav className="px-[15%] py-6 font-quicksand">
            <div className="flex flex-row justify-between items-center">
                <Link to="/">
                    <img src={ReactLogoIc} alt="React Logo" className="w-14 h-14 rounded-sm"/>
                </Link>

                {
                    user ?
                        <button
                            type="button"
                            className="bg-secondary text-black px-5 py-3 rounded-xl font-bold shadow-lg
                                        hover:shadow-none transition duration-500 ease-in-out"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                        :
                        <ul className="flex flex-row gap-4 items-center">
                            <li>
                                <div className="hover:translate-y-0.5 transition duration-300 ease-in-out">
                                    <Link
                                        to="/signup"
                                        className="bg-primary text-white px-5 py-3 rounded-xl font-bold shadow-lg
                                       hover:shadow-none transition duration-500 ease-in-out"
                                    >
                                        Sign up
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <div className="hover:translate-y-0.5 transition duration-300 ease-in-out">
                                    <Link
                                        to="/login"
                                        className="bg-secondary text-black px-5 py-3 rounded-xl font-bold shadow-lg
                                        hover:shadow-none transition duration-500 ease-in-out"
                                    >
                                        Login
                                    </Link>
                                </div>
                            </li>
                        </ul>
                }
            </div>
        </nav>
    )
};

export default Navbar;
