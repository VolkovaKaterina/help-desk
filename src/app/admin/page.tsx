import TicketsTable from "@/components/admin/TicketsTable/TicketsTable";
import Link from "next/link";
import React from "react";
import prisma from "@/libs/db";

export const dynamic = "force-dynamic";

const AdminPanel = async () => {
  const tickets = await prisma.ticket.findMany();

  return (
    <div className="mx-auto p-5">
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-4 block"
      >
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold p-2">Admin Panel</h1>
      <TicketsTable tickets={tickets} />
    </div>
  );
};

export default AdminPanel;
