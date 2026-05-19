import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Automation } from "@/components/admin/Automation";

export const Route = createFileRoute("/admin/automation")({
  component: AdminAutomation,
});

function AdminAutomation() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/admin/login" }); }, [user, loading]);
  if (!user) return null;
  return <AdminLayout><Automation /></AdminLayout>;
}
