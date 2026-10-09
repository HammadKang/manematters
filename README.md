# ManeMatters

Next.js (App Router) + Tailwind CSS + MDX blog. Curly, Straight & Hair Fall Care.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production check
```

## Add a new article (2 minutes)

1. Copy `content/_TEMPLATE.mdx.txt` to `content/posts/your-article-slug.mdx`
   (the **file name becomes the URL**: `/blog/your-article-slug`).
2. Fill the top block (front matter): `title`, `description`, `date`, `author`, `category`, `image`.
   - `category` must be exactly `curly-hair`, `straight-hair` or `hair-fall`.
3. Featured image, either way:
   - Free Unsplash photo: open the photo on unsplash.com, copy the id from the image URL (`photo-1234-abcd`) and write `image: "unsplash:photo-1234-abcd"`.
   - Your own file: put it in `public/images/` and write `image: "/images/my-photo.jpg"` (JPG/WebP about 1200x675).
   Next.js resizes and optimizes both automatically.
4. Write the article below the `---` using Markdown:
   - `## Heading` = H2, `### Heading` = H3
   - `- item` = bullets, `1. item` = numbered list
   - `![alt text](/images/photo.jpg)` = image
   - `<Callout>text</Callout>` = pink tip box
5. Save, check it at http://localhost:3000, then publish (see below).

Everything else updates automatically: home page "Latest Articles" (newest 6 by `date`),
category page, sidebar "Recent 5", related articles, search, sitemap, SEO title/description/Open Graph.

Hide an article without deleting it: add `draft: true` to its front matter.

The in-content ad box is placed automatically in the middle of each article (before the middle H2).

## Publish on Vercel

1. Push this folder to a GitHub repo.
2. vercel.com -> Add New -> Project -> import the repo -> Deploy (defaults are fine).
3. Project Settings -> Environment Variables: `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   (used for sitemap, canonical and Open Graph URLs). Redeploy once.
4. Add your domain under Settings -> Domains.

Publishing a new article later = add the `.mdx` file, `git push`. Vercel rebuilds automatically.

## AdSense

4 ad positions: home (below header), article (below title, middle of content, sidebar 300x250).
Right now they show placeholder ads (they link to /contact). To go live after AdSense approves you:

1. Vercel -> Settings -> Environment Variables, add:
   `NEXT_PUBLIC_ADSENSE_CLIENT` (ca-pub-XXXXXXXXXXXXXXXX) and the 4 slot ids
   `NEXT_PUBLIC_ADSENSE_SLOT_HOME_TOP`, `..._BELOW_TITLE`, `..._IN_CONTENT`, `..._SIDEBAR`
   (create 4 display ad units in AdSense and copy each unit's slot id).
2. Redeploy. The sample ads are replaced by real Google ads automatically. No code change needed.
3. Add the AdSense-required `ads.txt` file to `public/ads.txt` (AdSense shows you the line).

## Still dummy / to replace

- Newsletter form (`components/Newsletter.tsx`) shows the popup but is not connected to an email service.
- Contact form shows the "Message sent" popup and posts to `app/api/contact/route.ts`, which only logs the message for now. To receive real emails at contact@manematters.com connect Resend/Formspree there.
- Social icon links in `components/Footer.tsx` (`href="#"`).
- Sample articles and Unsplash photos - replace with your own.
- About and Privacy text are starter templates.
