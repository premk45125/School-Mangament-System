import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { ResultsSection } from "@/components/ResultsSection";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Academic Results | BR Gyan Deep Sr Sec School" },
      {
        name: "description",
        content:
          "Check board results, competitive exam selections (JEE, NEET, NDA), and merit lists for BR Gyan Deep Sr Sec School.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <SiteHeader />
      <main className="flex-1">
        <ResultsSection />
      </main>
    </div>
  );
}
