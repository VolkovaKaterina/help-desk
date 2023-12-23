export type ChipColor =
  | "default"
  | "primary"
  | "danger"
  | "success"
  | "secondary"
  | "warning"
  | undefined;

export enum TicketStatus {
  IN_PROGRESS = "In Progress",
  NEW = "New",
  RESOLVED = "Resolved",
}
