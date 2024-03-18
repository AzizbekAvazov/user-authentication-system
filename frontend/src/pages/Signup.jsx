import {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {gql, useMutation} from "@apollo/react-hooks";
import Input from "../components/Input";
import {useForm} from "../utility/hooks";
import {AuthContext} from "../context/authContext";
import {IoLockClosedOutline, IoMailOutline, IoPersonOutline} from "react-icons/io5";
import ReactLogoIc from "../components/images/react-logo.png";
import {MdOutlineErrorOutline} from "react-icons/md";
import LoadingAnimation from "../components/LoadingAnimation";

const REGISTER_USER = gql`
    mutation Mutation($registerInput: RegisterInput) {
        registerUser(registerInput: $registerInput) {
            email
            username
            token
        }
    }
`

const Signup = () => {
    const navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState([]);
    const [errorField, setErrorField] = useState(null);

    const resetErrors = () => setErrors([]);

    const { onChange, onSubmit, values } = useForm(registerUserCallback, resetErrors, {
        username: '',
        email: '',
        password: ''
    });

    const [registerUser, { loading }] = useMutation(REGISTER_USER, {
        update(proxy, { data: { registerUser: userData }}) {
            context.login(userData);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors);
            // Determine which input field to highlight based on the error received
            const errorCode = graphQLErrors[0]?.extensions?.code;
            if (errorCode === "MISSING_USERNAME") {
                setErrorField("username");
            } else if (errorCode === "MISSING_EMAIL" || errorCode === "INVALID_EMAIL" || errorCode === "USER_ALREADY_EXISTS") {
                setErrorField("email");
            } else if (errorCode === "MISSING_PASSWORD" || errorCode === "INVALID_PASSWORD") {
                setErrorField("password");
            }
        },
        variables: { registerInput: values }
    });

    function registerUserCallback() {
        registerUser();
    }

    const getHeader = () => {
        return (
            <div className="flex flex-row justify-between items-center">
                <Link to="/">
                    <img src={ReactLogoIc} alt="React Logo" className="w-14 h-14 rounded-sm"/>
                </Link>

                <div className="flex flex-row gap-4 items-center">
                    <span className="font-bold lg:text-base text-sm">Already registered?</span>
                    <div className="hover:translate-y-0.5 transition duration-300 ease-in-out">
                        <Link
                            to="/login"
                            className="bg-primary text-white px-5 py-3 rounded-xl font-bold shadow-lg
                                       hover:shadow-none transition duration-500 ease-in-out"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        )
    };

    const onEnter = (event) => {
        if (event.key === "Enter") {
            onSubmit(event);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-quicksand text-black pb-10">
            <div className="px-[5%] py-6">
                {getHeader()}
            </div>

            <div className="flex-1 flex flex-col gap-6 justify-center items-center">
                <form
                    onSubmit={onSubmit}
                    onKeyDown={onEnter}
                    className="flex flex-col gap-6 border shadow-xl rounded-xl py-12 px-12 lg:w-fit w-80"
                >
                    <h2 className="font-bold text-center text-3xl">
                        Sign Up!
                    </h2>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <Input
                            className="w-full"
                            icon={<IoPersonOutline className="text-gray-500" size={24} />}
                            placeholder="John Doe"
                            type="text"
                            id="username"
                            name="username"
                            autoComplete="off"
                            onChange={onChange}
                            error={errorField === "username"}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <Input
                            className="w-full"
                            icon={<IoMailOutline className="text-gray-500" size={24} />}
                            placeholder="example@site.com"
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            onChange={onChange}
                            error={errorField === "email"}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <Input
                            className="w-full"
                            icon={<IoLockClosedOutline className="text-gray-500" size={24} />}
                            placeholder="Minimum 8 characters"
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            onChange={onChange}
                            error={errorField === "password"}
                        />
                    </div>

                    {/* Display error message below the input field with error */}
                    {errors.map((error) => (
                        <div
                            key={error.extensions.code}
                            className="flex flex-row gap-4 items-center
                                           max-w-96 px-4 py-2 bg-red-100 rounded-sm"
                        >
                            <div>
                                <MdOutlineErrorOutline size={24} className="text-red-500"/>
                            </div>
                            <span>{error.message}</span>
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="p-2 w-full bg-primary text-white hover:bg-opacity-90 border rounded-xl font-bold text-lg"
                    >
                        Sign up
                    </button>
                </form>

                <div className="flex flex-row gap-2">
                    <span>Already registered?</span>
                    <Link
                        to="/login"
                        className="border-b-2 border-opacity-30 hover:border-opacity-100 border-b-primary
                                   transition duration-300 ease-in-out font-semibold"
                    >
                        Login
                    </Link>
                </div>
            </div>

            {loading && (<LoadingAnimation />)}
        </div>
    )
};

export default Signup;
