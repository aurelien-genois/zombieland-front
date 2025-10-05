import { describe, it, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Button from "./Button";

describe("Button", () => {
  it("renders correctly with children", () => {
    render(<Button>Me Button</Button>);

    expect(screen.getByText("Me Button")).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Me Button</Button>);

    fireEvent.click(screen.getByText("Me Button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled={true}>
        Me Button
      </Button>
    );

    fireEvent.click(screen.getByText("Me Button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  // MemoryRouter simulates routing context in tests and doesn’t require a real browser environment.
  it('renders a React-router <Link> (i.e., <a>) when type is "router-link"', () => {
    render(
      <MemoryRouter>
        <Button type="router-link" to="/admin/management/activities">
          Me Button
        </Button>
      </MemoryRouter>
    );

    const element = screen.getByText("Me Button");
    expect(element).toBeInTheDocument();
    expect(element.tagName.toLowerCase()).toBe("a");
  });

  it('does not render an <button> or <a> when type is "router-link" without a "to"', () => {
    render(
      <MemoryRouter>
        <Button type="router-link">Me Button</Button>
      </MemoryRouter>
    );

    expect(screen.queryByText("Me Button")).not.toBeInTheDocument();
  });
});
