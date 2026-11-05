import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { LandingPage } from "@/components/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "BR Gyan Deep Sr Sec School | CBSE-Affiliated School in Surjanwas",
      },
      {
        name: "description",
        content:
          "BR Gyan Deep Sr Sec School — a CBSE-affiliated co-ed senior secondary school in Surjanwas, Mahendragarh. Explore results, faculty, courses, and admissions.",
      },
      {
        property: "og:title",
        content: "BR Gyan Deep Sr Sec School | CBSE-Affiliated School in Surjanwas",
      },
      {
        property: "og:description",
        content:
          "BR Gyan Deep Sr Sec School — a CBSE-affiliated co-ed senior secondary school in Surjanwas, Mahendragarh. Explore results, faculty, courses, and admissions.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-transparent">
      <SiteHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
    </div>
  );
}
