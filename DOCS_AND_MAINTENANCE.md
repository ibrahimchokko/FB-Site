# FB Family Hub — Website Maintenance Manual

**For the family team. No coding experience needed.**
Last updated: June 2026

---

## What This Document Is

This is your complete guide to keeping the FB Family Hub website running smoothly. It covers:

- How to change prices or add new menu items
- How to update your WhatsApp contact number
- How to check if your contact form is working
- How to run the website locally to preview changes before anyone sees them
- What to do when something goes wrong

You do not need to understand code to follow these instructions. Every step shows exactly what to look for and what to change.

---

## Part 1 — How to Change Prices or Add a New Menu Item

All menu items and prices live in **one single file**:

```
src/data/content.ts
```

Open that file in any text editor (VS Code is recommended — it is already installed).

---

### 1A — How to Change a Price

Find the item you want to update. Each item looks like this:

```ts
{
  id: "cc-waina-001",
  brand: "city-chops",
  category: "waina",
  name: "Waina",
  description: "Soft, steamed rice cakes served with spiced pepper sauce — a Kaduna morning staple.",
  price: 500,          // ← THIS IS THE PRICE IN NAIRA
  image: "/images/cc-waina.jpg",
  featured: true,
},
```

To change the Waina price from ₦500 to ₦600, simply change:

```ts
price: 500,
```

to:

```ts
price: 600,
```

**Rules to follow so nothing breaks:**
- The price must be a plain number — no ₦ symbol, no commas, no quotes.
- ✅ Correct: `price: 1500,`
- ❌ Wrong: `price: "₦1,500",`
- Always keep the comma at the end of the line.

---

### 1B — How to Add a New Menu Item

Go to the section for the brand you want. The file has two clearly labelled sections:

```
// ── City Chops ──────────────────────────────────────────────────────
// ── Fresh Tigernut Mill ──────────────────────────────────────────────
```

Copy an existing item block that is similar to your new item and paste it directly below it. Then change each field.

**Example — adding a new Fura flavour for Fresh Tigernut Mill:**

```ts
{
  id: "ftm-fura-002",
  brand: "fresh-tigernut",
  category: "yogo-fura",
  name: "Coconut Fura",
  description: "Thick fura blended with fresh coconut milk — rich, creamy, and naturally sweet.",
  price: 750,
  image: "/images/ftm-coconut-fura.jpg",
  featured: false,
},
```

**Field-by-field explanation:**

| Field | What it is | Rules |
|---|---|---|
| `id` | Unique code for this item | Must be different from every other id. Pattern: `brand-initials-name-number`. No spaces, use hyphens. |
| `brand` | Which business it belongs to | Must be exactly `"city-chops"` or `"fresh-tigernut"` (with quotes, exact spelling) |
| `category` | Type of product | See the list of valid categories below |
| `name` | Display name shown to customers | Any text in quotes |
| `description` | Short description shown under the name | Any text in quotes. Keep it under 200 characters. |
| `price` | Price in Naira | Number only, no symbols |
| `image` | Photo file path | Must match a file you have placed in the `public/images/` folder |
| `featured` | Show on the homepage highlights | `true` to show, `false` to hide |

**Valid category values:**

For City Chops: `"waina"` · `"puff-puff"` · `"samosa"` · `"peppery-meat"` · `"cakes"` · `"catering"`

For Fresh Tigernut Mill: `"kunun-aya"` · `"kunun-zaki"` · `"yogo-fura"` · `"tigernut-mix"` · `"smoothies"`

> **Important:** If your new item needs a category that is not in this list, you must add it to the `MenuCategory` type in `src/types/business.ts` as well. Add it inside the list between the backtick-quote marks, following the same format as the others.

---

### 1C — How to Hide an Item Without Deleting It

Add `available: false` to the item:

```ts
{
  id: "cc-waina-001",
  ...
  price: 500,
  available: false,   // ← item stays in the file but is marked unavailable
},
```

---

### 1D — How to Preview Your Changes Before the Site Goes Live

After saving your changes in the file, run these two commands in the terminal (open it with `Ctrl + backtick` in VS Code):

```bash
npm run build
npm run start
```

Then open your browser and go to `http://localhost:3000`. You will see the site exactly as it will appear to customers. When you are happy, push the changes to GitHub and the site will update automatically within about 60 seconds.

---

## Part 2 — How to Change the WhatsApp Phone Number

If your customer care phone number changes, you need to update it in **one place**:

**File:** `src/data/content.ts`

Near the top of the file you will find the `BRANDS` section:

```ts
export const BRANDS: BrandConfig[] = [
  {
    id: "city-chops",
    name: "City Chops",
    tagline: "Freshly made, perfectly seasoned — Kaduna's favourite bites.",
    whatsapp: "2348012345678",    // ← CITY CHOPS NUMBER
    href: "/city-chops",
  },
  {
    id: "fresh-tigernut",
    name: "Fresh Tigernut Mill",
    tagline: "Nature's sweetness, pressed daily for you.",
    whatsapp: "2348012345678",    // ← TIGERNUT MILL NUMBER
    href: "/tigernut-mill",
  },
];
```

**How to write the number:**
- Start with the country code: Nigeria is `234`
- Remove the leading `0` from the local number
- No spaces, no `+` symbol, no dashes
- Wrap it in quotes

| Local number | Correct format |
|---|---|
| 0801 234 5678 | `"2348012345678"` |
| 0700 111 2222 | `"2347001112222"` |

**Example — changing City Chops to a new number:**

```ts
whatsapp: "2349012345678",
```

After saving, run `npm run build && npm run start` to verify. Click any "Order via WhatsApp" button on the site and confirm it opens a chat to the correct number.

---

## Part 3 — How to Verify the Contact / Booking Form is Working

The booking form on the City Chops catering page sends emails through a free service called **Web3Forms**.

### Step 1 — Check your Web3Forms account

1. Go to https://web3forms.com and log in with the email address used when the site was set up.
2. In your dashboard, click **Submissions**.
3. You should see a log of every form submission received.

### Step 2 — Send a test submission

1. Open the site locally (`npm run start`) or go to the live URL.
2. Go to **City Chops → Catering**.
3. Fill in the booking form with test details and click **Send Booking Request**.
4. You should see a green success message: "Booking received!"
5. Check your email inbox — a notification should arrive within 1–2 minutes.
6. Also check your **Spam / Junk** folder. If it is there, mark it as "Not spam" once — it will not go to spam again.

### Step 3 — If emails are not arriving

| Symptom | Likely cause | Fix |
|---|---|---|
| Form shows success but no email | Web3Forms key is wrong or inactive | Log into web3forms.com and copy a fresh access key. Update `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel environment variables (see Part 5). |
| Form shows "Something went wrong" | Internet connection issue | Check that the device running the site has internet access |
| Emails arrive but go to spam | Email provider filtering | Log into web3forms.com → Settings → add your email as a verified recipient |
| No submissions showing in Web3Forms dashboard | The form is submitting to the wrong key | Check the key value in Vercel matches what is in web3forms.com |

---

## Part 4 — Operating Hours and Open/Closed Status

The website automatically shows customers whether you are open or closed. The hours are set in **one file**:

**File:** `src/lib/hours.ts`

```ts
const OPEN_HOUR  = 9;   // opens at 9:00 AM (WAT)
const CLOSE_HOUR = 22;  // closes at 10:00 PM (WAT)
```

To change hours — for example, opening at 8 AM instead:

```ts
const OPEN_HOUR = 8;
```

> The site uses West Africa Time (WAT) automatically, so you do not need to worry about time zones.

To update the days shown in the footer (currently Mon–Sat), find `BUSINESS_HOURS` in `src/data/content.ts`:

```ts
export const BUSINESS_HOURS: BusinessHours = {
  openHour: 7,
  closeHour: 20,
  operatingDays: [1, 2, 3, 4, 5, 6], // 0=Sun, 1=Mon … 6=Sat
};
```

---

## Part 5 — Managing Vercel Environment Variables (Secrets)

Sensitive values like your Web3Forms key and WhatsApp number are stored securely in Vercel — not in the code files. To update them:

1. Go to https://vercel.com and log in.
2. Open your project (it will be called `FB-Site` or similar).
3. Click **Settings** → **Environment Variables**.
4. Find the variable you want to change, click the three-dot menu, and select **Edit**.
5. Enter the new value and save.
6. Go back to **Deployments** and click **Redeploy** on the latest deployment to apply the change.

**Your three environment variables:**

| Variable name | What it controls |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your website's main address (e.g. `https://citychopsng.com`) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | The key that allows the booking form to send emails |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Fallback WhatsApp number (primary numbers are in `content.ts`) |

---

## Part 6 — Adding a Photo for a New Menu Item

1. Take or prepare a photo. Recommended size: **800 × 600 pixels** (landscape). Format: JPG or WebP.
2. Name the file clearly, using lowercase and hyphens only. Example: `ftm-coconut-fura.jpg`
3. Place the file inside the `public/images/` folder in the project.
4. In `src/data/content.ts`, set the `image` field of your menu item to `/images/your-filename.jpg`.

> Photos placed in `public/images/` are served directly to customers. Keep file sizes under 300 KB for fast loading on Nigerian mobile networks. Use a free tool like https://squoosh.app to compress them before uploading.

---

## Part 7 — Lighthouse & Network Performance Check (For Technical Team Members)

Run this whenever a major update is made to verify the site still loads fast on Kaduna 3G/4G networks.

### Running Lighthouse in Chrome DevTools

1. Open Chrome and navigate to the live site or `http://localhost:3000`.
2. Press `F12` to open DevTools.
3. Click the **Lighthouse** tab.
4. Select: ✅ Performance · ✅ Accessibility · ✅ Best Practices · ✅ SEO
5. Device: **Mobile**
6. Click **Analyze page load**.

**Target scores for this site:**

| Category | Minimum acceptable | Target |
|---|---|---|
| Performance | 80 | 90+ |
| Accessibility | 95 | 100 |
| Best Practices | 90 | 100 |
| SEO | 90 | 100 |

### Simulating Kaduna 3G/4G in Chrome DevTools

1. Open DevTools (`F12`).
2. Click the **Network** tab.
3. Click the throttling dropdown (shows "No throttling" by default).
4. Select **Slow 4G** (simulates typical Nigerian mobile data speed).
5. Reload the page with `Ctrl + Shift + R` (hard reload, bypasses cache).
6. Watch the waterfall chart — the page text and layout should appear within 1.5 seconds.

**What to check:**
- The page title and navigation bar appear before images finish loading. ✅
- No large layout shifts after the page loads (content does not jump around). ✅
- WhatsApp order buttons are visible without scrolling on a typical phone screen. ✅

### Simulating Fast 3G (worst realistic case)

Repeat the above but select **Fast 3G**. The page should still be readable and functional within 3 seconds, even if images are still loading.

---

## Part 8 — WCAG 2.2 AA Accessibility Status

This site meets WCAG 2.2 Level AA requirements. The following are verified on every deployment:

| Element | Requirement | Status |
|---|---|---|
| Hamburger menu button | `aria-expanded`, `aria-controls`, minimum 48×48px touch target | ✅ |
| Mobile navigation drawer | `role="navigation"`, `aria-label` | ✅ |
| Form inputs (name, phone, email, etc.) | Explicit `<label>` linked via `htmlFor` + `id` | ✅ |
| Form error messages | `aria-invalid`, `aria-describedby`, `role="alert"` | ✅ |
| Cart quantity buttons | `aria-label` describing action and item, minimum 44×44px touch target | ✅ |
| Cart drawer | `role="dialog"`, `aria-modal`, `aria-label`, focus moves to close button on open, Escape key closes | ✅ |
| All interactive buttons and links | Minimum 44×44px touch target | ✅ |
| Clickable cards | `role="button"`, `tabIndex`, keyboard Enter/Space support | ✅ |
| Star ratings | `aria-label` announcing the count | ✅ |
| Social media icons | `aria-label` on all icon-only links | ✅ |
| WhatsApp SVG icon | `aria-hidden="true"` (decorative) | ✅ |
| All images | `alt` text describing the image | ✅ |

---

## Part 9 — Quick Reference: The Most Common Tasks

| Task | File to edit | What to change |
|---|---|---|
| Change a price | `src/data/content.ts` | The `price:` field of the item |
| Add a menu item | `src/data/content.ts` | Paste a new item block in the right section |
| Hide a seasonal item | `src/data/content.ts` | Add `available: false,` to the item |
| Change WhatsApp number | `src/data/content.ts` | The `whatsapp:` field in `BRANDS` |
| Change opening hours | `src/lib/hours.ts` | `OPEN_HOUR` and `CLOSE_HOUR` values |
| Update Web3Forms key | Vercel dashboard | Environment variable `NEXT_PUBLIC_WEB3FORMS_KEY` |
| Update site URL | Vercel dashboard | Environment variable `NEXT_PUBLIC_SITE_URL` |
| Add a product photo | `public/images/` folder | Add the file, reference it in `content.ts` |

---

## Part 10 — Getting Help

If something is broken and this manual does not cover it:

1. **Check the CI status** — Go to your GitHub repository and click the **Actions** tab. If there is a red ✗ next to the latest commit, the build failed. Click it to see what went wrong.

2. **Check Vercel deployment logs** — Log into https://vercel.com → your project → **Deployments** → click the latest one → **Build Logs**.

3. **Revert to the last working version** — In Vercel, open **Deployments**, find the last deployment that was marked "Ready" (green), click its three-dot menu, and select **Promote to Production**. This instantly restores the previous working site while you diagnose the problem.

4. **Contact your developer** — Share the error message from the GitHub Actions log or Vercel build log. That message contains everything a developer needs to diagnose the issue quickly.

---

*FB Family Hub Website · Built with Next.js 16, Tailwind CSS v4 · Hosted on Vercel*
