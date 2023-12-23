import { createMocks } from "node-mocks-http";
import { POST } from "./route";
import { editTicketWithAI } from "@/prismaActions";

jest.mock("@/prismaActions", () => ({
  editTicketWithAI: jest.fn(),
}));

describe("app: api: tickets: update-with-ai: POST", () => {
  test("should handle valid ticket data", async () => {
    const mockTicket = { name: "John", description: "Issue", status: "open" };
    editTicketWithAI.mockResolvedValue(mockTicket);

    const { req, res } = createMocks({
      method: "POST",
      body: mockTicket,
    });

    req.json = jest.fn().mockResolvedValue(mockTicket);

    const response = await POST(req, res);

    expect(response.status).toBe(200);
    expect(editTicketWithAI).toHaveBeenCalledWith(mockTicket);
  });

  test("should handle request with no body", async () => {
    const request = { json: jest.fn().mockResolvedValue({}) };
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  test("should handle internal server error", async () => {
    const mockTicket = { name: "John", description: "Issue", status: "open" };

    editTicketWithAI.mockRejectedValue(new Error("Internal Server Error"));

    const { req, res } = createMocks({
      method: "POST",
      body: mockTicket,
    });

    req.json = jest.fn().mockResolvedValue(mockTicket);

    const response = await POST(req, res);

    expect(response.status).toBe(500);
  });
});
