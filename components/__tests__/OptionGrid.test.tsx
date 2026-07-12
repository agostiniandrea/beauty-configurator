import { screen, fireEvent } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import OptionGrid from "../configurator/OptionGrid";
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
    expect(screen.getByText("€15")).toBeInTheDocument();
  });

  it("renders empty state message when no options", () => {
    renderWithIntl(
      <OptionGrid options={[]} selectedOptionId={undefined} onSelect={noop} />,
    );
    // useTranslations mock returns the key
    expect(screen.getByText("noOptions")).toBeInTheDocument();
  });

  it("does not render a price tag for zero-price options", () => {
    renderWithIntl(
      <OptionGrid options={baseOptions} selectedOptionId={undefined} onSelect={noop} />,
    );
    expect(screen.queryByText("€0")).not.toBeInTheDocument();
  });

  it("renders an image when the option has an imageUrl", () => {
    const withImage = [
      { ...baseOptions[0], imageUrl: "/images/opt-base-light.jpeg" },
      baseOptions[1],
    ];
    const { container } = renderWithIntl(
      <OptionGrid options={withImage} selectedOptionId={undefined} onSelect={noop} />,
    );
    expect(container.querySelectorAll("img")).toHaveLength(1);
  });

  describe("keyboard navigation", () => {
    // mockOptions has 5 entries — enough to distinguish first/middle/last.
    const options = mockOptions;

    function renderGrid() {
      renderWithIntl(
        <OptionGrid options={options} selectedOptionId={undefined} onSelect={noop} />,
      );
      return screen.getAllByRole("button");
    }

    it.each([
      ["ArrowRight", 1, 2],
      ["ArrowDown", 1, 2],
      ["ArrowLeft", 2, 1],
      ["ArrowUp", 2, 1],
      ["Home", 3, 0],
      ["End", 1, 4],
    ])("%s moves focus from index %i to %i", (key, from, to) => {
      const buttons = renderGrid();
      buttons[from].focus();
      fireEvent.keyDown(buttons[from], { key });
      expect(buttons[to]).toHaveFocus();
    });

    it("wraps from the last option to the first with ArrowRight", () => {
      const buttons = renderGrid();
      buttons[buttons.length - 1].focus();
      fireEvent.keyDown(buttons[buttons.length - 1], { key: "ArrowRight" });
      expect(buttons[0]).toHaveFocus();
    });

    it("wraps from the first option to the last with ArrowLeft", () => {
      const buttons = renderGrid();
      buttons[0].focus();
      fireEvent.keyDown(buttons[0], { key: "ArrowLeft" });
      expect(buttons[buttons.length - 1]).toHaveFocus();
    });

    it("prevents default for handled keys", () => {
      const buttons = renderGrid();
      // fireEvent returns false when preventDefault was called
      expect(fireEvent.keyDown(buttons[0], { key: "ArrowRight" })).toBe(false);
      expect(fireEvent.keyDown(buttons[0], { key: "Home" })).toBe(false);
    });

    it("does not prevent default for unrelated keys", () => {
      const buttons = renderGrid();
      expect(fireEvent.keyDown(buttons[0], { key: "a" })).toBe(true);
      expect(buttons[0]).not.toHaveFocus();
    });
  });
});
