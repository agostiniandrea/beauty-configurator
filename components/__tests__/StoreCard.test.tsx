import { screen, fireEvent } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import StoreCard from "../complete/StoreCard";
import { mockLooks, mockCategories, mockOptions, mockSelectionFull, mockSelectionPartial } from "../model";

const orderUrl = "https://example.com/en/configure/natural-glow/complete?base=base-light";

describe("StoreCard", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-06-15"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it("renders correctly with full selection", () => {
    const { container } = renderWithIntl(
      <StoreCard
        look={mockLooks[0]}
        categories={mockCategories}
        allOptions={mockOptions}
        selection={mockSelectionFull}
        locale="en"
        orderUrl={orderUrl}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders the look name", () => {
    renderWithIntl(
      <StoreCard
        look={mockLooks[0]}
        categories={mockCategories}
        allOptions={mockOptions}
        selection={mockSelectionFull}
        locale="en"
        orderUrl={orderUrl}
      />,
    );
    expect(screen.getByText(mockLooks[0].name.en)).toBeInTheDocument();
  });

  it("renders all selected option names", () => {
    renderWithIntl(
      <StoreCard
        look={mockLooks[0]}
        categories={mockCategories}
        allOptions={mockOptions}
        selection={mockSelectionFull}
        locale="en"
        orderUrl={orderUrl}
      />,
    );
    expect(screen.getByText("Light Coverage")).toBeInTheDocument();
    expect(screen.getByText("Smoky Eye")).toBeInTheDocument();
    expect(screen.getByText("Nude Lip")).toBeInTheDocument();
  });

  it("renders a dash for categories with no selection", () => {
    renderWithIntl(
      <StoreCard
        look={mockLooks[0]}
        categories={mockCategories}
        allOptions={mockOptions}
        selection={mockSelectionPartial}
        locale="en"
        orderUrl={orderUrl}
      />,
    );
    // eyes and lips have no selection → should show "—"
    expect(screen.getAllByText("—").length).toBeGreaterThanOrEqual(2);
  });

  it("renders a QR code", () => {
    renderWithIntl(
      <StoreCard
        look={mockLooks[0]}
        categories={mockCategories}
        allOptions={mockOptions}
        selection={mockSelectionFull}
        locale="en"
        orderUrl={orderUrl}
      />,
    );
    expect(screen.getByLabelText("qrLabel")).toBeInTheDocument();
  });

  it("calls window.print when print button is clicked", () => {
    renderWithIntl(
      <StoreCard
        look={mockLooks[0]}
        categories={mockCategories}
        allOptions={mockOptions}
        selection={mockSelectionFull}
        locale="en"
        orderUrl={orderUrl}
      />,
    );
    fireEvent.click(screen.getByText(/Print/i));
    expect(window.print).toHaveBeenCalled();
  });
});
