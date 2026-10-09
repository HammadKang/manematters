import GithubSlugger from "github-slugger";

export type TocItem = { id: string; text: string; level: 2 | 3 };

/** Builds the "In this article" list from ## and ### headings (same ids rehype-slug generates). */
export function getToc(source: string): TocItem[] {
  const slugger = new GithubSlugger();
  let inCode = false;
  const items: TocItem[] = [];
  for (const line of source.split("\n")) {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) continue;
    const m = /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (!m) continue;
    const text = m[2].replace(/[*_`]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    items.push({ id: slugger.slug(text), text, level: m[1].length as 2 | 3 });
  }
  return items;
}
