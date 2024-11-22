export type states = "pending" | "progress" | "success" | "failed";

export type STEPPERS = {
  Approve: states;
  Mint: states;
  Success: states;
};

export type MintError = {
  value?: "Approve" | "Mint";
  is: boolean;
};
