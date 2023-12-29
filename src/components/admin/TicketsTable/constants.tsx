import { getGoToEditPath } from "@/components/admin/TicketsTable/utilites";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { Ticket } from ".prisma/client";
import { MenuItem } from "@mui/material";
import Link from "next/link";
import { Button, Chip } from "@nextui-org/react";
import React from "react";
import {
  DirectContact,
  TicketStatus,
} from "@/components/admin/TicketsTable/TicketsTable.models";
import StatusChip from "@/components/shared/StatusChip";

const ResponseChip = ({
  value,
  yesLabel = "Yes",
  noLabel = "No",
}: {
  value: boolean;
  yesLabel?: string;
  noLabel?: string;
}) => {
  return value ? (
    <Chip color="success" variant="flat">
      {yesLabel}
    </Chip>
  ) : (
    <Chip color="warning" variant="flat">
      {noLabel}
    </Chip>
  );
};

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    Cell: ({ renderedCellValue }: { renderedCellValue: TicketStatus }) => (
      <StatusChip status={renderedCellValue} />
    ),
  },
  {
    accessorKey: "adminResponse",
    header: "Admin Response",
    Cell: ({ renderedCellValue }: { renderedCellValue: TicketStatus }) => (
      <ResponseChip value={!!renderedCellValue} />
    ),
  },
  {
    accessorKey: "needDirectContact",
    header: "Want to speak with consultant",
    Cell: ({ renderedCellValue }: { renderedCellValue: string }) => (
      <ResponseChip value={renderedCellValue === DirectContact.YES} />
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    Cell: ({ renderedCellValue }: { renderedCellValue: string }) =>
      new Date(renderedCellValue).toLocaleDateString("en-US"),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    Cell: ({ renderedCellValue }: { renderedCellValue: string }) =>
      new Date(renderedCellValue).toLocaleDateString("en-US"),
  },
] as MRT_ColumnDef<Ticket>[];

export const renderRowActionMenuItems = (
  row: MRT_Row<Ticket>,
  deleteTicket: (id: string) => void,
) => [
  <MenuItem key="edit">
    <Link href={getGoToEditPath(row.original.id)}>
      <Button color="primary" variant="flat" size="sm">
        Edit
      </Button>
    </Link>
  </MenuItem>,
  <MenuItem
    key="delete"
    // disabled={row.original.status !== TicketStatus.RESOLVED}
  >
    <Button
      color="primary"
      size="sm"
      variant="flat"
      onClick={() => deleteTicket(row.original.id)}
    >
      Delete
    </Button>
  </MenuItem>,
];

export const toastrMessage = {
  updateTicket: {
    success: "Ticket was updated successful.",
    error: "Failed to updated the ticket.",
  },
  deleteTicket: {
    success: "Ticket was deleted successful.",
    error: "Failed to delete the ticket.",
  },
};

export const defaultSort = { id: "createdAt", desc: true };
