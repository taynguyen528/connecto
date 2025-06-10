import { default as Post } from "@components/Post";
import { render } from "@testing-library/react";

describe("Post components", () => {
  test("renders the post content correctly", () => {
    const { getByText } = render(
      <Post
        fullName="Tay Nguyen Sound"
        content="abcdef"
        createAt={Date.now()}
      />,
    );

    expect(getByText("Tay Nguyen Sound")).toBeInTheDocument();
  });

  test("display the correct number of likes", () => {
    const likes = [1, 2, 4, 5];

    const { getByText } = render(
      <Post
        fullName="Tay Nguyen Sound"
        content="abcdef"
        likes={likes}
        createAt={Date.now()}
      />,
    );

    expect(getByText("4")).toBeInTheDocument();
  });
});
