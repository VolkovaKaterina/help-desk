import Link from "next/link";

const Home = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Welcome to the Help Desk
        </h1>
        <p className="mb-8 text-gray-600">
          A simple system to submit and manage support tickets.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="user-request/create-ticket"
            className="inline-block bg-white hover:bg-gray-200 text-gray-800 border border-gray-400 font-bold py-2 px-4 rounded transition duration-300"
          >
            Create Ticket
          </Link>
          <Link
            href="/admin"
            className="inline-block bg-white hover:bg-gray-200 text-gray-800 border border-gray-400 font-bold py-2 px-4 rounded transition duration-300"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
