import { render, screen } from "@testing-library/react";
import { Section } from "~/components/ui/Section";

describe("<Section />", () => {
  it("labels the region with its heading", () => {
    render(
      <Section id="work" eyebrow="01" title="Selected work">
        <p>content</p>
      </Section>,
    );
    expect(screen.getByRole("region", { name: "Selected work" })).toBeInTheDocument();
  });
});
