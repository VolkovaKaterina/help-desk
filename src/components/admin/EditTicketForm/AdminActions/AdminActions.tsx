import React from "react";
import { Select, SelectItem, Textarea } from "@nextui-org/react";
import EditFormSelect from "@/components/admin/EditTicketForm/EditFormSelect";
import { Ticket } from ".prisma/client";
import { Control, UseFormRegister } from "react-hook-form";
import { IEditFormData } from "@/components/admin/EditTicketForm/EditTicketForm.models";
import AdminActionsSkeleton from "@/components/admin/EditTicketForm/AdminActions/AdminActionsSkeleton";

interface IAdminActionsProps {
  isPending: boolean;
  register: UseFormRegister<IEditFormData>;
  formTicket: Ticket;
  control: Control<IEditFormData>;
}

const AdminActions: React.FC<IAdminActionsProps> = ({
  isPending,
  register,
  formTicket,
  control,
}) => {
  if (isPending) {
    return <AdminActionsSkeleton />;
  }
  return (
    <div className="pt-8">
      <div className="flex justify-between">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Admin Actions
        </h3>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <Select
            label="Need Consultant"
            defaultSelectedKeys={[formTicket.needDirectContact]}
            {...register("needDirectContact")}
          >
            <SelectItem key="YES" value="YES">
              Yes
            </SelectItem>
            <SelectItem key="NO" value="NO">
              No
            </SelectItem>
          </Select>
        </div>
        <div className="sm:col-span-6">
          <EditFormSelect ticket={formTicket} control={control} />
        </div>
        <div className="sm:col-span-6">
          <Textarea
            label="Admin Response"
            defaultValue={formTicket.adminResponse || ""}
            {...register("adminResponse")}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default AdminActions;
