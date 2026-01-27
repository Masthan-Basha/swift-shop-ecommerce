const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-20 h-20">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-blue-100 rounded-full"></div>
          {/* Spinning Ring */}
          <div className="absolute inset-0 border-4 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium animate-pulse">
          Fetching your tech...
        </p>
      </div>
    );
  };
  
  export default Loader;