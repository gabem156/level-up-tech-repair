# Level Up Tech Repair

A mobile-first, accessible static website for Level Up Tech Repair. The homepage provides a guided repair finder, service overview, local mobile service information, starting-price guidance, and direct Square booking. It uses plain HTML, CSS, and JavaScript, so it can be hosted on GitHub Pages or any static host without a build step.

## Project structure

- `index.html` — semantic page content and navigation
- `styles.css` — responsive dark navy, electric blue, and cyan visual system
- `script.js` — mobile navigation and the category → manufacturer/model → repair selector
- `config.js` — Square, contact, social links, optional phone number, and verified model prices
- `logo.png` — Level Up Tech Repair logo

Service-card photos load from Unsplash and are lazy-loaded where appropriate. The homepage uses visible labels, keyboard focus styles, native select controls, a skip link, responsive navigation, and reduced-motion support.

## Before publishing

The primary website domain is `https://www.leveluptechrepairfl.com/`; the `.tech` domain is reserved for Square booking. The Square booking URL and public contact email are configured in `config.js`. Contact is email-only; keep `phone` blank unless the business later chooses to publish a call/text number. The Facebook page and Instagram profile are also configured there. Add an entry to `verifiedModelPrices` only after confirming the price for an exact model and repair; use `category|manufacturer|model|repair name` as the key and a display-ready price such as `From $99` as the value. Without a matching entry, the repair finder displays “Request a Quote.” The pricing section lists general starting prices and states that final pricing depends on the device, diagnosis, and parts.

The $25 booking deposit is disclosed as due once per appointment, applied toward the final repair cost, and non-refundable if the customer cancels. The site does not process payment. Booking links lead to the general Square site, so verify Square is configured to collect one deposit and apply it to the final repair before publishing. Diagnostics are free when the customer approves the recommended repair; if the customer declines it, a $35 diagnostic fee applies.

## GitHub Pages

Copy the contents of this folder to the root of a new GitHub repository. In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose the `main` branch and `/ (root)`, and save. Set `www.leveluptechrepairfl.com` as the GitHub Pages custom domain. At the registrar, follow the DNS values GitHub Pages displays for that custom domain; these commonly include a CNAME for `www` pointing to the GitHub Pages host and apex A/AAAA records, but obtain the exact values from GitHub Pages before changing DNS. Keep `leveluptechrepairfl.tech` connected to Square and keep `config.js` booking URL on that `.tech` address. Enable HTTPS for the `.com` website in GitHub Pages after domain verification. No DNS records have been changed as part of this project update.

## Integration path

- **Square:** booking buttons use the configured Square booking URL after a deposit-policy confirmation. Payment remains handled by Square; the static site cannot enforce deposit collection, prevent duplicate charges within Square, or apply the deposit as a repair credit.
- **Zoho Mail:** add automation after confirming the booking/payment event source and desired email content. Do not put account credentials or API secrets in this public site.
- **Google Business Profile:** add the verified review link in `config.js` when available.
- **AI chatbot:** the service catalog, starting prices, FAQs, and booking handoff provide a clean information structure for a later chatbot backed by approved business facts.
