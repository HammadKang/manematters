# ManeMatters

**Curly, Straight & Hair Fall Care.** A fast, SEO-friendly hair care blog built with Next.js, Tailwind CSS and MDX.

**Live site: [manematters.vercel.app](https://manematters.vercel.app/)**

Articles are plain `.mdx` files, so publishing a new post means adding one file and pushing to Git. No database and no CMS.

## Features

- **Blog powered by MDX.** Write in Markdown (H2/H3, lists, images) with a small `<Callout>` component for tip boxes.
- **8 fixed pages:** Home, 3 category pages, article page, About, Contact, Privacy Policy.
- **Article page:** breadcrumb, author and date, reading time, auto-generated "In this article" list, share buttons, reading progress bar, sidebar (search, categories, recent posts) and related articles.
- **Live search** over all article titles, with no API needed.
- **Ad-ready layout** with 4 AdSense positions (home top, below article title, middle of article, sidebar 300x250).
- **SEO built in:** per-page title, description, Open Graph and Twitter tags, canonical URLs, article JSON-LD, `sitemap.xml` and `robots.txt`.
- **Fast:** static generation, `next/image` optimization (AVIF/WebP), Google Fonts via `next/font`.
- **Polished UI:** scroll animations, hover effects, mobile menu, success popups, back-to-top button. Respects "reduce motion".
- **Fully responsive:** mobile, tablet and desktop.

## Tech stack

| | |
|---|---|
| Framework | Next.js (App Router) + React + TypeScript |
| Styling | Tailwind CSS v4 + Typography plugin |
| Content | MDX files via `next-mdx-remote`, `gray-matter`, `rehype-slug` |
| Font | Poppins |
| Hosting | Vercel |

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Check a production build before deploying:

```bash
npm run build
npm start
```

## Project structure

```
app/                 Pages and routes
  page.tsx             Home
  category/[slug]/     Category pages
  blog/[slug]/         Article page
  about, contact, privacy-policy/
  api/contact/         Contact form endpoint
components/          Header, Footer, ArticleCard, AdSlot, SearchBar, ...
content/posts/       Your articles (.mdx)
content/_TEMPLATE.mdx.txt   Copy this to start a new article
lib/                 Content loader, categories, site settings, images
public/              Static files (your own images go in public/images)
```

## Adding an article

1. Copy `content/_TEMPLATE.mdx.txt` to `content/posts/your-article-slug.mdx`.
   The file name becomes the URL: `/blog/your-article-slug`.
2. Fill in the front matter at the top:

   ```mdx
   ---
   title: "Rice Water for Curly Hair"
   description: "One or two lines. Shown on cards and in Google results."
   date: "2026-10-12"
   author: "ManeMatters Team"
   category: "curly-hair"     # curly-hair | straight-hair | hair-fall
   image: "unsplash:photo-1536304993881-ff6e9eefa2a6"
   # draft: true              # hides the article without deleting it
   ---
   ```

3. Write the article below the front matter:

   | You write | You get |
   |---|---|
   | `## Heading` | H2 |
   | `### Heading` | H3 |
   | `- item` / `1. item` | bullet / numbered list |
   | `![alt text](/images/photo.jpg)` | optimized image |
   | `<Callout>Tip text</Callout>` | highlighted tip box |

4. Featured image, either way:
   - **Unsplash:** copy the id from the photo URL (`photo-1234-abcd`) and write `image: "unsplash:photo-1234-abcd"`.
   - **Your own file:** put it in `public/images/` and write `image: "/images/my-photo.jpg"` (about 1200x675).

5. Save and check it locally, then publish (see below).

Everything else updates by itself: home page "Latest Articles" (newest first), the category page, sidebar "Recent Articles", related articles, search, sitemap and SEO tags. The in-content ad is placed automatically before the middle H2 of each article.

## Deploying to Vercel

1. Push the repo to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New → Project**, import the repo and click **Deploy**. The defaults are fine.
3. In **Settings → Environment Variables** add `NEXT_PUBLIC_SITE_URL` with your live domain (for example `https://manematters.com`, no trailing slash). It is used for the sitemap, canonical links and Open Graph URLs. Redeploy once.
4. Add your domain under **Settings → Domains**.

After that, publishing a new article is just `git push`. Vercel rebuilds automatically.

## Configuration

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live domain, used for SEO URLs |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id (`ca-pub-...`) |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP` | Ad unit id, home page |
| `NEXT_PUBLIC_ADSENSE_SLOT_BELOW_TITLE` | Ad unit id, below article title |
| `NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT` | Ad unit id, middle of article |
| `NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR` | Ad unit id, sidebar |

Copy `.env.example` to `.env.local` for local use. Site name, tagline and contact email live in `lib/site.ts`.

## Enabling AdSense

Until AdSense is set up, the ad positions show a placeholder "Your brand here" banner that links to the contact page. Once your site is approved:

1. Create 4 display ad units in AdSense and copy each unit's slot id.
2. Add the variables above in Vercel and redeploy. The banners are replaced by real ads automatically.
3. Put the `ads.txt` line AdSense gives you into `public/ads.txt`.

## Known limitations

These parts are not connected to a service yet:

- **Contact form.** It validates input and shows the "Message sent" popup, but `app/api/contact/route.ts` only logs the message. Connect an email service (Resend, Formspree, etc.) there to receive messages at `contact@manematters.com`.
- **Newsletter form.** It shows the success popup only. Connect Mailchimp, ConvertKit or similar in `components/Newsletter.tsx`.
- **Social icons** in the footer point to `#`. Add your profile links in `components/Footer.tsx`.
- **Sample articles and stock photos** (Unsplash) are placeholders. Replace them with your own content.
- **About and Privacy Policy** are starter text. Review them before launch, especially the privacy policy if you run ads.

## Disclaimer

Articles are general hair care information and not medical advice.
