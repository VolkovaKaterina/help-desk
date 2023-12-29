import { z } from "zod";

export const createTicketSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const editTicketSchema = z.object({
  id: z.string(),
  status: z.string(),
  adminResponse: z.string(),
  needDirectContact: z.string(),
});
