import { screen } from "@testing-library/react";
import { renderWithIntl } from "../../test-utils/renderWithIntl";
import LookCard from "../home/LookCard";
import { mockLooks } from "../model";

const look = mockLooks[0];

describe("LookCard", () => {
  it("renders correctly", () => {
    const { container } = renderWithIntl(<LookCard look={look} />);
    expect(container).toMatchSnapshot();
  });

  it("renders the look name", () => {
    renderWithIntl(<LookCard look={look} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(look.name.en);
  });

  it("renders the look description", () => {
    renderWithIntl(<LookCard look={look} />);
    expect(screen.getByText(look.description.en)).toBeInTheDocument();
  });

  it("renders all tags", () => {
    renderWithIntl(<LookCard look={look} />);
    look.tags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  it("renders a configure link", () => {
    renderWithIntl(<LookCard look={look} />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", expect.stringContaining(look.id));
  });
});
