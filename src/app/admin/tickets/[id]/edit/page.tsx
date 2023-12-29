import { notFound } from "next/navigation";
import EditTicketForm from "@/components/admin/EditTicketForm";
import prisma from "@/libs/db";

interface IEditTicketProps {
  params: {
    id: string;
  };
}

const EditTicket = async ({ params }: IEditTicketProps) => {
  const ticket = await prisma.ticket.findFirst({
    where: { id: params.id },
  });

  if (!ticket) {
    return notFound();
  }
  return <EditTicketForm ticket={ticket} />;
};

export default EditTicket;
