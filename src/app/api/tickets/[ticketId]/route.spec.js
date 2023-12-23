import { createMocks } from "node-mocks-http";
import { GET } from "./route"; // Adjust the path to your API route
import prisma from "@/libs/db"; // Adjust the path to your Prisma client

jest.mock("@/libs/db", () => ({
  __esModule: true,
  default: {
    ticket: {
      findUnique: jest.fn(),
    },
  },
}));

describe("app: api: tickets: [ticketId]: GET", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should return a ticket for a valid ID", async () => {
    const mockTicket = {
      id: "1",
      name: "Test Ticket",
      description: "A test ticket",
    };
    prisma.ticket.findUnique.mockResolvedValue(mockTicket);

    const { req, res } = createMocks({
      method: "GET",
      url: "/api/tickets/1",
    });

    req.nextUrl = new URL(req.url, `http://${req.headers.host}`);

    const response = await GET(req, res);

    expect(response.status).toBe(200);
    expect(prisma.ticket.findUnique).toHaveBeenCalledWith({
      where: { id: "1" },
    });
  });

  test("should return 404 for a non-existent ticket ID", async () => {
    const errorMessage = { message: "Ticket not found" };

    prisma.ticket.findUnique.mockResolvedValue(null);

    const { req } = createMocks({
      method: "GET",
      url: "/api/tickets/999",
    });

    req.nextUrl = new URL(req.url, `http://${req.headers.host}`);
    console.log("Test Request URL:", req.nextUrl.pathname); // Debug log

    const response = await GET(req);
    const responseBody = JSON.parse(response._bodyText);

    expect(response.status).toBe(404);
    expect(responseBody).toStrictEqual(errorMessage);
  });
});
