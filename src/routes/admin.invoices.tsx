import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Invoices } from "@/components/admin/Invoices";

export const Route = createFileRoute("/admin/invoices")({
  component: AdminInvoices,
});

function AdminInvoices() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => { if (!loading && !user) navigate({ to: "/admin/login" }); }, [user, loading]);
  if (!user) return null;
  return <AdminLayout><Invoices /></AdminLayout>;
}
