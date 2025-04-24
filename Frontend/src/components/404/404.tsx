const NotFound = () => {
    return (
        <div className="flex h-dvh items-center justify-center text-center">
            <div className="">
                <div className="mb-2.5 text-6xl text-violet-700">&#9888;</div>
                <h1 className="m-0 text-7xl font-bold text-gray-600">404</h1>
                <h2 className="my-2.5 text-2xl text-gray-700">
                    Page Not Found
                </h2>
                <p className="mb-5 text-[16px] text-gray-500">
                    We’re sorry, the page you have looked for does not exist in
                    our website! Maybe go to our home page or try to use a
                    search?
                </p>
            </div>
        </div>
    );
};

export default NotFound;
