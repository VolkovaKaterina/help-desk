"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTicketSchema } from "@/app/schemas/ticketsFormSchema";
import { useRouter } from "next/navigation";
import { createTicket } from "@/app/services/api.service";
import CreteTicketForm from "@/components/user-request/CreteTicketForm";

type FormData = z.infer<typeof createTicketSchema>;

const CreateTicket = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createTicketSchema),
  });

  const route = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const responseData = await createTicket(formData);

      toast.success("Form submitted successfully!");

      reset();

      route.push(`ticket/${responseData.submission.id}`);
    } catch (error) {
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CreteTicketForm
      errors={errors}
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      isLoading={isLoading}
    />
  );
};

export default CreateTicket;
