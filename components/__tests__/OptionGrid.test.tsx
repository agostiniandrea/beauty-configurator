import { screen, fireEvent } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import OptionGrid from "../OptionGrid";
import { mockOptions } from "../model";

const baseOptions = mockOptions.filter((o) => o.categoryId === "base");
const eyeOptions = mockOptions.filter((o) => o.categoryId === "eyes");
const noop = jest.fn();

describe("OptionGrid", () => {
  it("renders correctly with no selection", () => {
    const { container } = renderWithIntl(
      <OptionGrid options={baseOptions} selectedOptionId={undefined} onSelect={noop} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders all option names", () => {
    renderWithIntl(
      <OptionGrid options={baseOptions} selectedOptionId={undefined} onSelect={noop} />,
    );
    baseOptions.forEach((opt) => {
      expect(screen.getByText(opt.name.en)).toBeInTheDocument();
    });
  });

  it("marks the selected option with aria-pressed=true", () => {
    renderWithIntl(
      <OptionGrid options={baseOptions} selectedOptionId="base-light" onSelect={noop} />,
    );
    const selected = screen.getByRole("button", { name: /Light Coverage/i });
    expect(selected).toHaveAttribute("aria-pressed", "true");
  });

  it("marks unselected options with aria-pressed=false", () => {
    renderWithIntl(
      <OptionGrid options={baseOptions} selectedOptionId="base-light" onSelect={noop} />,
    );
    const unselected = screen.getByRole("button", { name: /Medium Coverage/i });
    expect(unselected).toHaveAttribute("aria-pressed", "false");
  });

  it("calls onSelect with the option id when clicked", () => {
    const handleSelect = jest.fn();
    renderWithIntl(
      <OptionGrid options={baseOptions} selectedOptionId={undefined} onSelect={handleSelect} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /Light Coverage/i }));
    expect(handleSelect).toHaveBeenCalledWith("base-light");
  });

  it("shows a priced option correctly", () => {
    renderWithIntl(
      <OptionGrid options={eyeOptions} selectedOptionId={undefined} onSelect={noop} />,
    );
    expect(screen.getByText("+€15")).toBeInTheDocument();
  });

  it("renders empty state message when no options", () => {
    renderWithIntl(
      <OptionGrid options={[]} selectedOptionId={undefined} onSelect={noop} />,
    );
    // useTranslations mock returns the key
    expect(screen.getByText("noOptions")).toBeInTheDocument();
  });
});
