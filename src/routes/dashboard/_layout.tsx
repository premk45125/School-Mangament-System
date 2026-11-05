/**
 * Dashboard layout route — wraps all /dashboard/* child routes.
 * Renders DashboardLayout which provides the collapsible sidebar + top header.
 */
import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export const Route = createFileRoute("/dashboard/_layout")({
  component: DashboardLayout,
});
