export type TokenKind = "keyword" | "string" | "tag" | "attr" | "component" | "punct" | "plain";
export type Token = { kind: TokenKind; value: string };

// Order matters: the first group that matches wins.
const TOKEN_RE =
  /("[^"\n]*"?)|(\b(?:const|let|return|export|default)\b)|(<\/?[A-Z]\w*|\/?>)|(\b[a-z]\w*(?==))|(\b[A-Z]\w*\b)|([{}()[\],=;]|=>)|(\s+|.)/g;

const KINDS: TokenKind[] = ["string", "keyword", "tag", "attr", "component", "punct", "plain"];

/**
 * A tiny TSX highlighter for the hero snippet.
 * Works on partial input too, so an unfinished string while typing is still coloured.
 */
export function highlight(code: string): Token[] {
  const tokens: Token[] = [];
  for (const match of code.matchAll(TOKEN_RE)) {
    const groupIndex = match.slice(1).findIndex((g) => g !== undefined);
    const kind = KINDS[groupIndex] ?? "plain";
    const last = tokens.at(-1);
    // Merge neighbouring plain tokens to keep the DOM small.
    if (kind === "plain" && last?.kind === "plain") last.value += match[0];
    else tokens.push({ kind, value: match[0] });
  }
  return tokens;
}
