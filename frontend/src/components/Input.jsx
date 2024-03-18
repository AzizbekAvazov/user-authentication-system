import {useState} from "react";
import {TbEye, TbEyeClosed} from "react-icons/tb";

const Input = ({className, icon, placeholder, type, id, name, autoComplete, onChange, error}) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    function toggleVisibility() {
        setIsVisible(prevState => !prevState);
    }

    return (
        type === 'password' ?
            <div className={`flex flex-row items-center rounded-xl px-4 py-2 border-2
                        ${isFocused ? "shadow-[0px_0px_0px_2px_#469eef]" : ""}
                        lg:min-w-96 hover:border-primary hover:border-opacity-50
                        ${error ? "border-red-500 hover:border-red-500" : ""}`}>
               <div className="flex flex-row items-center w-full">
                   {icon}
                   <input
                       className={`${className} px-3 outline-none`}
                       placeholder={placeholder}
                       type={isVisible ? 'text' : type}
                       id={id}
                       name={name}
                       autoComplete={autoComplete}
                       onFocus={() => setIsFocused(true)}
                       onBlur={() => setIsFocused(false)}
                       onChange={onChange}
                   />
               </div>
                <button type="button" onClick={toggleVisibility}>
                    {
                        isVisible ?
                            <TbEyeClosed />
                            :
                            <TbEye />
                    }
                </button>
            </div>
            :
            <div className={`flex flex-row items-center rounded-xl px-4 py-2 border-2
                        ${isFocused ? "shadow-[0px_0px_0px_2px_#469eef]" : ""}
                        lg:min-w-96 hover:border-primary hover:border-opacity-50
                        ${error ? "border-red-500 hover:border-red-500" : ""}`}>
                {icon}
                <input
                    className={`${className} px-3 outline-none`}
                    placeholder={placeholder}
                    type={type}
                    id={id}
                    name={name}
                    autoComplete={autoComplete}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={onChange}
                />
            </div>
    )
};

export default Input;
