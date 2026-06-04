import { screen, fireEvent } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import CategoryNav from "../configurator/CategoryNav";
import { mockCategories } from "../model";

const noop = jest.fn();

describe("CategoryNav", () => {
  it("renders correctly on first step", () => {
    const { container } = renderWithIntl(
      <CategoryNav
        categories={mockCategories}
        currentStep={0}
        completedSteps={new Set()}
        onSelect={noop}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders all category names", () => {
    renderWithIntl(
      <CategoryNav
        categories={mockCategories}
        currentStep={0}
        completedSteps={new Set()}
        onSelect={noop}
      />,
    );
    mockCategories.forEach((cat) => {
      expect(screen.getByText(cat.name.en)).toBeInTheDocument();
    });
  });

  it("marks the active step with aria-current=step", () => {
    renderWithIntl(
      <CategoryNav
        categories={mockCategories}
        currentStep={1}
        completedSteps={new Set([0])}
        onSelect={noop}
      />,
    );
    const activeButton = screen.getByRole("button", { name: /Eyes/i });
    expect(activeButton).toHaveAttribute("aria-current", "step");
  });

  it("shows a checkmark for completed steps", () => {
    renderWithIntl(
      <CategoryNav
        categories={mockCategories}
        currentStep={1}
        completedSteps={new Set([0])}
        onSelect={noop}
      />,
    );
    // The first step badge should show "✓"
    expect(screen.getByText("✓")).toBeInTheDocument();
  });

  it("disables steps beyond current", () => {
    renderWithIntl(
      <CategoryNav
        categories={mockCategories}
        currentStep={0}
        completedSteps={new Set()}
        onSelect={noop}
      />,
    );
    const lipsButton = screen.getByRole("button", { name: /Lips/i });
    expect(lipsButton).toBeDisabled();
  });

  it("calls onSelect when an accessible step is clicked", () => {
    const handleSelect = jest.fn();
    renderWithIntl(
      <CategoryNav
        categories={mockCategories}
        currentStep={1}
        completedSteps={new Set([0])}
        onSelect={handleSelect}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Base/i }));
    expect(handleSelect).toHaveBeenCalledWith(0);
  });
});
