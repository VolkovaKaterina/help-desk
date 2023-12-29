import React from "react";

const AdminActionsSkeleton = () => (
  <div className="pt-8 animate-pulse">
    <div className="flex justify-between mb-4">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
    </div>
    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
      <div className="sm:col-span-3">
        <div className="h-10 bg-gray-300 rounded"></div>{" "}
        {/* Placeholder for Select */}
      </div>
      <div className="sm:col-span-6">
        <div className="h-10 bg-gray-300 rounded"></div>{" "}
        {/* Placeholder for EditFormSelect */}
      </div>
      <div className="sm:col-span-6">
        <div className="h-24 bg-gray-300 rounded"></div>{" "}
        {/* Placeholder for Textarea */}
      </div>
    </div>
  </div>
);

export default AdminActionsSkeleton;
