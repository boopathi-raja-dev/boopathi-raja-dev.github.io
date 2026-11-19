import { describe, expect, it } from "vitest";
import { highlight } from "~/components/hero/highlight";

describe("highlight", () => {
  it("never loses or reorders characters", () => {
    const code = 'const A = () => (<Profile name="Boo" />);';
    expect(
      highlight(code)
        .map((t) => t.value)
        .join(""),
    ).toBe(code);
  });

  it("classifies the main token kinds", () => {
    const kinds = Object.fromEntries(
      highlight('const x = <Profile name="Boo" />').map((t) => [t.value, t.kind]),
    );
    expect(kinds).toMatchObject({
      const: "keyword",
      "<Profile": "tag",
      name: "attr",
      '"Boo"': "string",
      "/>": "tag",
    });
  });

  it("colours an unfinished string while it is being typed", () => {
    expect(highlight('name="Boo').at(-1)).toEqual({ kind: "string", value: '"Boo' });
  });
});
