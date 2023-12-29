const TicketSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 p-6 min-h-screen">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <p className="text-lg font-semibold text-gray-600">
          We are processing your ticket...
        </p>
        <div className="mb-4 animate-pulse">
          <div className="h-8 bg-gray-300 rounded-md"></div>
          <div className="h-8 bg-gray-300 rounded-md mt-3"></div>
          <div className="h-8 bg-gray-300 rounded-md mt-3 w-3/4"></div>
        </div>
        <div className="flex gap-2">
          <div className="bg-gray-200 h-12 w-40 rounded-md"></div>
          <div className="bg-gray-200 h-12 w-40 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TicketSkeleton;
