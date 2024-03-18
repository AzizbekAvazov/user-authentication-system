import { grid } from 'ldrs'
grid.register()

const LoadingAnimation = () => {

    return (
        <div className="absolute inset-0 flex flex-row gap-4 justify-center items-center bg-gray-200 bg-opacity-20">
            <l-grid
                size="150"
                speed="1.5"
                color="#469eef"
            ></l-grid>
        </div>
    )
};

export default LoadingAnimation;
