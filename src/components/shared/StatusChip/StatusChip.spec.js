import React from "react";
import { render } from "@testing-library/react";
import StatusChip from "./StatusChip";
import { TicketStatus } from "@/components/admin/TicketsTable/TicketsTable.models";

describe("components: StatusChip: ", () => {
  it("should renders with the correct status", () => {
    const status = TicketStatus.NEW;
    const { getByText } = render(<StatusChip status={status} />);

    const statusElement = getByText(status);
    expect(statusElement).toBeInTheDocument();
  });
});
