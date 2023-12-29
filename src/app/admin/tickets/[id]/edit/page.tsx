import { notFound } from "next/navigation";
import EditTicketForm from "@/components/admin/EditTicketForm";
import prisma from "@/libs/db";
import { Ticket } from ".prisma/client";

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

export async function generateStaticParams() {
  "use server";
  const tickets = await prisma.ticket.findMany();

  return tickets.map((ticket: Ticket) => {
    return {
      id: ticket.id.toString(),
    };
  });
}
