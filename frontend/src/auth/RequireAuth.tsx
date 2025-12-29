import { type ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  // TODO: Implement authentication logic
  // For now, just render the children
  return <>{children}</>;
}