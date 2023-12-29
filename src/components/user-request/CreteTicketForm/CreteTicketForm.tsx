"use client";
import React from "react";
import { Input, Button, Textarea } from "@nextui-org/react";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { z } from "zod";
import { createTicketSchema } from "@/app/schemas/ticketsFormSchema";
import { CircularProgress } from "@mui/material";

type FormData = z.infer<typeof createTicketSchema>;

interface ICreteFormProps {
  onSubmit: () => void;
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  isLoading: boolean;
}

const CreteTicketForm: React.FC<ICreteFormProps> = ({
  onSubmit,
  register,
  errors,
  isLoading,
}) => (
  <main className="flex h-screen items-center justify-center bg-gray-100">
    <div className=" relative max-w-screen-xl mx-auto text-gray-600 md:px-8 bg-white rounded p-10">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
          <CircularProgress
            size="lg"
            aria-label="Loading..."
            className="w-1/12"
          />
        </div>
      )}
      <Link
        href="/"
        className="text-blue-500 hover:text-blue-600 text-sm font-medium mt-4 block p-2"
      >
        ← Back to Home
      </Link>
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Need Assistance? Let us know how we can help
        </h2>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4 pt-2">
            <Input
              label="Let's create your support ticket. What's your name?"
              labelPlacement="outside"
              placeholder="Type your name..."
              fullWidth
              isInvalid={!!errors.name?.message}
              errorMessage={errors.name?.message}
              {...register("name")}
            />
          </div>

          <div className="space-y-4 pt-2">
            <Input
              label="Could you provide your email address?"
              labelPlacement="outside"
              placeholder="Type your email..."
              fullWidth
              isInvalid={!!errors.email?.message}
              errorMessage={errors.email?.message}
              {...register("email")}
            />
          </div>

          <div className="space-y-4 pt-2">
            <Textarea
              label="Please describe the issue you're facing?"
              labelPlacement="outside"
              placeholder="Describe your issue"
              fullWidth
              isInvalid={!!errors.description?.message}
              errorMessage={errors.description?.message}
              {...register("description")}
            />
          </div>
          <Button
            disabled={isLoading}
            type="submit"
            color="primary"
            className="w-full px-4 py-2 text-white font-medium bg-blue-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
    <ToastContainer position="bottom-right" autoClose={3000} />
  </main>
);

export default CreteTicketForm;
