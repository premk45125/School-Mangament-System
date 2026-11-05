import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ResultsSection } from "@/components/ResultsSection";
import { Route } from "@/routes/results";
import { createRouter, RouterProvider, createRootRoute } from "@tanstack/react-router";

describe("ResultsSection", () => {
  it("renders without crashing", () => {
    const { container } = render(<ResultsSection />);
    expect(container).toBeDefined();
    expect(screen.getByText(/Class 10th Results/i)).toBeDefined();
  });

  it("can switch tabs and open modal", () => {
    render(<ResultsSection />);
    
    // Switch to Class 12th
    const class12Tab = screen.getByText(/Class 12th Results/i);
    fireEvent.click(class12Tab);

    // Switch to Competitive
    const compTab = screen.getByText(/Competitive Exams/i);
    fireEvent.click(compTab);

    // Click on a student card
    const studentName = screen.getByText(/Shivam Sharma/i);
    fireEvent.click(studentName);
  });
});

