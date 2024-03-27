import { render } from "@testing-library/react";
import placeholder from "features/common/assets/images/image-placeholder.svg";
import MessageCard from "./MessageCard";

describe("MessageCard", () => {
  it("should be rendered with the image", async () => {
    const { baseElement } = render(
      <MessageCard image={placeholder} heading="Start searching for user." message="Search for user by email." />,
    );

    expect(baseElement).toMatchSnapshot();
  });
});
