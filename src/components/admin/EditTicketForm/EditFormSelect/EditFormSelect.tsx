import React from "react";
import { Control, Controller } from "react-hook-form";
import { Select, SelectItem } from "@nextui-org/react";
import { statuses } from "@/components/admin/EditTicketForm/constants";
import { Ticket } from ".prisma/client";
import { IEditFormData } from "@/components/admin/EditTicketForm/EditTicketForm.models";

interface IEditFormSelectProps {
  ticket: Ticket;
  control: Control<IEditFormData>;
}

const EditFormSelect: React.FC<IEditFormSelectProps> = ({
  ticket,
  control,
}) => (
  <Controller
    name="status"
    control={control}
    render={({ field }) => (
      <Select {...field} label="Status" defaultSelectedKeys={[ticket.status]}>
        {statuses.map((status) => (
          <SelectItem key={status.label} value={status.value}>
            {status.label}
          </SelectItem>
        ))}
      </Select>
    )}
  />
);

export default EditFormSelect;
