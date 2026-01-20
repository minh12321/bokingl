export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

export interface User {
  id: number;              // BIGINT
  uuid: string;            // CHAR(36)
  full_name: string;
  email: string;
  phone?: string;
  role_id: number;
  status: UserStatus;
  created_at: string;      // ISO string
  deleted_at?: string | null;
}
