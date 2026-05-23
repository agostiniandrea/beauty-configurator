import { screen } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import SummaryPanel from "../SummaryPanel";
import { mockCategories, mockOptions, mockSelectionFull } from "../model";

describe("SummaryPanel", () => {
  it("renders correctly with no selection", () => {
    const { container } = renderWithIntl(
      <SummaryPanel categories={mockCategories} options={mockOptions} selection={{}} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders correctly with full selection", () => {
    const { container } = renderWithIntl(
      <SummaryPanel
        categories={mockCategories}
        options={mockOptions}
        selection={mockSelectionFull}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("shows all category names", () => {
    renderWithIntl(
      <SummaryPanel categories={mockCategories} options={mockOptions} selection={{}} />,
    );
    mockCategories.forEach((cat) => {
      expect(screen.getByText(cat.name.en)).toBeInTheDocument();
    });
  });

  it("shows selected option names in the summary", () => {
    renderWithIntl(
      <SummaryPanel
        categories={mockCategories}
        options={mockOptions}
        selection={mockSelectionFull}
      />,
    );
    expect(screen.getByText("Light Coverage")).toBeInTheDocument();
    expect(screen.getByText("Smoky Eye")).toBeInTheDocument();
    expect(screen.getByText("Nude Lip")).toBeInTheDocument();
  });

  it("shows completed step count", () => {
    renderWithIntl(
      <SummaryPanel
        categories={mockCategories}
        options={mockOptions}
        selection={mockSelectionFull}
      />,
    );
    expect(screen.getByText(/3\/3/)).toBeInTheDocument();
  });

  it("shows total as included when all prices are 0", () => {
    const zeroOptions = mockOptions.map((o) => ({ ...o, price: 0 }));
    renderWithIntl(
      <SummaryPanel
        categories={mockCategories}
        options={zeroOptions}
        selection={mockSelectionFull}
      />,
    );
    // useTranslations mock returns the key
    expect(screen.getByText("included")).toBeInTheDocument();
  });

  it("shows the numeric total when priced options are selected", () => {
    renderWithIntl(
      <SummaryPanel
        categories={mockCategories}
        options={mockOptions}
        selection={mockSelectionFull}
      />,
    );
    // eyes-smoky costs €15
    expect(screen.getByText("€15")).toBeInTheDocument();
  });
});
