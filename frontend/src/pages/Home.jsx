import Navbar from "../components/Navbar";
import {useContext} from "react";
import {AuthContext} from "../context/authContext";

const Home = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="flex flex-col gap-20 h-screen font-quicksand">
            <Navbar />
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center gap-8">
                    <h1
                        className="font-bold lg:text-8xl text-7xl bg-gradient-to-r from-primary via-purple-400 to-indigo-600 text-transparent bg-clip-text"
                    >
                        Welcome
                    </h1>
                    {
                        user ?
                            <h2 className="font-bold text-6xl">{user.username}</h2>
                            :
                            <h1 className="font-bold text-6xl">...</h1>
                    }
                </div>
            </div>
        </div>
    )
};

export default Home;
