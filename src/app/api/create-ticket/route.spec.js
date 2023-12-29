import { POST } from "./route";
import prisma from "@/libs/db";
import { createTicketSchema } from "@/app/schemas/ticketsFormSchema";

jest.mock("@/libs/db", () => ({
  __esModule: true,
  default: {
    ticket: {
      create: jest.fn(),
    },
  },
}));

jest.mock("@/app/schemas/ticketsFormSchema", () => ({
  createTicketSchema: {
    safeParse: jest.fn(),
  },
}));

describe("app: api: create-ticket: POST", () => {
  test("should create a ticket with valid data", async () => {
    const mockData = {
      name: "John Doe",
      email: "john@example.com",
      description: "Issue description",
    };

    prisma.ticket.create.mockResolvedValue(mockData);
    createTicketSchema.safeParse.mockReturnValue({
      success: true,
      data: mockData,
    });

    const request = { json: jest.fn().mockResolvedValue(mockData) };
    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(prisma.ticket.create).toHaveBeenCalled();
  });

  test("should return an error for invalid data", async () => {
    const error = { email: "email not valid" };

    createTicketSchema.safeParse.mockReturnValue({
      success: false,
      error: { flatten: () => ({ fieldErrors: error }) },
    });

    const request = { json: jest.fn().mockResolvedValue({}) };
    const response = await POST(request);

    const responseBody = JSON.parse(response._bodyText);

    expect(response.status).toBe(400);
    expect(responseBody).toEqual({ errors: error });
  });
});
