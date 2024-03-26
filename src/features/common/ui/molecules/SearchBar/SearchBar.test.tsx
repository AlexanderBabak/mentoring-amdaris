import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserEvent } from "@testing-library/user-event/dist/types/setup/setup";
import SearchBar, { SearchBarProps } from "./SearchBar";

describe("SearchBar", () => {
  let onSearch: jest.Mock<any, any, any> = jest.fn();
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  const mockSearchProps: SearchBarProps = {
    placeholder: "Search",
    onSearch: onSearch,
  };

  it("should render as expected when input has no value to search", async () => {
    const { container } = render(<SearchBar {...mockSearchProps} />);
    expect(container).toMatchSnapshot();
  });

  it("should render as expected when input has value to search", async () => {
    const { container } = render(<SearchBar {...mockSearchProps} value="Mock Title" />);
    expect(container).toMatchSnapshot();
  });

  it("should erase text on clear action", async () => {
    render(<SearchBar {...mockSearchProps} />);

    const searchInput = screen.getByLabelText(/Search input/i);

    await user.type(searchInput, "Drug 1");
    expect(screen.getByRole("button", { name: /Clear search text/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Search action/i })).toBeInTheDocument();
    expect(searchInput).toHaveValue("Drug 1");

    await user.click(screen.getByRole("button", { name: /Clear search text/i }));
    expect(searchInput).toHaveValue("");
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it("should call search on Search action", async () => {
    render(<SearchBar {...mockSearchProps} />);

    await user.type(screen.getByLabelText(/Search input/i), "Drug 1");

    await user.click(screen.getByRole("button", { name: /Search action/i }));

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith("Drug 1");
  });

  it("should work as expected on keyboard actions", async () => {
    render(<SearchBar {...mockSearchProps} />);

    const searchInput = screen.getByLabelText(/Search input/i);

    await user.type(searchInput, "Drug 1");
    await user.type(searchInput, "{Enter}");
    expect(searchInput).toHaveValue("Drug 1");

    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenNthCalledWith(1, "Drug 1");

    await user.type(searchInput, "{Escape}");
    expect(searchInput).toHaveValue("");

    await user.type(searchInput, "{Enter}");

    expect(onSearch).toHaveBeenCalledTimes(2);
  });
});
