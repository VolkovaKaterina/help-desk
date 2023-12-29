"use client";
import React, { useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import {
  columns,
  defaultSort,
  renderRowActionMenuItems,
  toastrMessage,
} from "@/components/admin/TicketsTable/constants";
import { Ticket } from ".prisma/client";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteTicket } from "@/prismaActions";

interface ITicketsTableProps {
  tickets: Ticket[];
}

const TicketsTable: React.FC<ITicketsTableProps> = ({ tickets }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const deleteCurrentTicket = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteTicket(id);
      toast.success(toastrMessage.deleteTicket.success);
    } catch (e) {
      toast.error(toastrMessage.deleteTicket.error);
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: tickets,
    enableRowActions: true,
    enableStickyHeader: true,
    state: {
      isLoading: isLoading,
    },
    initialState: {
      sorting: [defaultSort],
    },
    renderRowActionMenuItems: ({ row }) =>
      renderRowActionMenuItems(row, deleteCurrentTicket),
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
};

export default TicketsTable;
