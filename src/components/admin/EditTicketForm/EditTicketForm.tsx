"use client";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { DirectContact, Ticket } from ".prisma/client";
import {
  backToAdminPath,
  toastrMessage,
} from "@/components/admin/EditTicketForm/constants";
import { IEditFormData } from "./EditTicketForm.models";
import { getNextTicketStatus } from "@/components/admin/TicketsTable/utilites";
import AdminActions from "@/components/admin/EditTicketForm/AdminActions";
import { updateTicket, updateTicketWithAI } from "@/app/services/api.service";

interface ITicketEditPageProps {
  ticket: Ticket;
}

const EditTicketForm: React.FC<ITicketEditPageProps> = ({ ticket }) => {
  const router = useRouter();

  const [formTicket, setTicket] = useState(ticket);
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, control } = useForm<IEditFormData>({
    defaultValues: {
      adminResponse: formTicket.adminResponse || "",
      status: formTicket.status,
      needDirectContact: formTicket.needDirectContact,
    },
  });

  const onSubmit = async (data: IEditFormData) => {
    try {
      await updateTicket({
        ...formTicket,
        id: formTicket.id,
        status: data.status,
        adminResponse: data.adminResponse,
        needDirectContact: data.needDirectContact as DirectContact,
      });

      router.push(backToAdminPath);
    } catch (error) {
      toast.error(toastrMessage.error);
    }
  };

  const generateAiUpdate = async () => {
    const updatedStatus = getNextTicketStatus(formTicket.status);
    const updatedTicket = {
      ...formTicket,
      status: updatedStatus,
    };
    startTransition(async () => {
      try {
        const { data } = await updateTicketWithAI(updatedTicket);

        setTicket(data);
        toast.success(toastrMessage.updateTicket.success);
      } catch (err) {
        toast.error(toastrMessage.updateTicket.error);
      }
    });
  };

  return (
    <main className="flex items-center justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-4xl  mx-auto bg-white rounded-lg shadow px-10 py-8 relative z-10">
        <Link
          href={backToAdminPath}
          className="text-blue-500 hover:text-blue-600 text-sm"
        >
          ← Back to Admin
        </Link>
        <h3 className="text-4xl font-semibold text-gray-800 mt-4 mb-8">
          Ticket Info
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
            <div>
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <Input
                    readOnly
                    label="Email"
                    defaultValue={formTicket.email}
                  />
                </div>
                <div className="sm:col-span-3">
                  <Input readOnly label="Name" defaultValue={formTicket.name} />
                </div>
                <div className="sm:col-span-6">
                  <Textarea
                    readOnly
                    label="Problem Description"
                    defaultValue={formTicket.description}
                  />
                </div>
              </div>
            </div>
            <AdminActions
              isPending={isPending}
              register={register}
              formTicket={formTicket}
              control={control}
            />
          </div>

          <div className="pt-5">
            <div className="flex justify-end gap-1.5">
              <Button
                color="primary"
                variant="flat"
                className="w-full sm:w-auto"
                onClick={generateAiUpdate}
                type="button"
              >
                Update Ticket With AI
              </Button>
              <Button
                type="submit"
                color="primary"
                className="w-full sm:w-auto"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} limit={3} />
    </main>
  );
};

export default EditTicketForm;
