/** Free Unsplash photos. Use `unsplash("photo-xxxx")` in code, or `image: "unsplash:photo-xxxx"` in an article. */
export const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const resolveImage = (value: string) =>
  value.startsWith("unsplash:") ? unsplash(value.slice("unsplash:".length)) : value;

export const IMG = {
  hero: "photo-1522337360788-8b13dee7a37e",
  heroSmall: "photo-1758600434324-41712d1f530e",
  curly: "photo-1758600434324-41712d1f530e",
  curly2: "photo-1762796159037-7990c49403e7",
  curly3: "photo-1784460470008-49f363e19275",
  straight: "photo-1758315949140-1972ace0644e",
  straight2: "photo-1747398690600-ffe8ecda9df1",
  hairFall: "photo-1773078280516-df823e1c9d78",
  hairFall2: "photo-1773078280398-18fa2291eef1",
  rice: "photo-1784460470008-49f363e19275",
  mask: "photo-1732861612244-5704d12e9397",
  massage: "photo-1767953829433-1e405b6889de",
  stylist: "photo-1634449571010-02389ed0f9b0",
  tools: "photo-1595475884562-073c30d45670",
  newsletter: "photo-1560264641-1b5191cc63e2",
};
