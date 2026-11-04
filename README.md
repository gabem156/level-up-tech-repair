# Level Up Tech Repair

A mobile-first, accessible static website for Level Up Tech Repair. The homepage provides a repair-services overview, local mobile service information, starting-price guidance, and direct appointment booking through Acuity Scheduling. It uses plain HTML, CSS, and JavaScript, so it can be hosted on GitHub Pages or any static host without a build step.

## Project structure

- `index.html` — semantic page content and navigation
- `styles.css` — responsive dark navy, electric blue, and cyan visual system
- `script.js` — mobile navigation and contact, social, and booking links
- `config.js` — Acuity booking, contact, social links, and optional phone number
- `logo.png` — Level Up Tech Repair logo

Service-card photos load from Unsplash and are lazy-loaded where appropriate. The homepage uses visible labels, keyboard focus styles, a skip link, responsive navigation, and reduced-motion support.

## Before publishing

The primary website domain is `https://www.leveluptechrepairfl.com/`. The Acuity booking URL and public contact email are configured in `config.js`. Contact is email-only; keep `phone` blank unless the business later chooses to publish a call/text number. The Facebook page and Instagram profile are also configured there. The pricing section lists general starting prices and states that final pricing depends on the device, diagnosis, and parts.

Each Acuity appointment includes a $45 Repair Diagnostic & Consultation fee, paid through Acuity. If the customer approves the repair, the fee is credited toward the repair total. If the customer decides not to proceed, the fee covers the diagnostic and consultation. Additional repair costs, including parts, are discussed and approved before work begins. Square payment processing for repair transactions is separate and is not configured by this static website.

## GitHub Pages

Copy the contents of this folder to the root of a new GitHub repository. In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose the `main` branch and `/ (root)`, and save. Set `www.leveluptechrepairfl.com` as the GitHub Pages custom domain. At the registrar, follow the DNS values GitHub Pages displays for that custom domain; these commonly include a CNAME for `www` pointing to the GitHub Pages host and apex A/AAAA records, but obtain the exact values from GitHub Pages before changing DNS. The `.tech` domain is not used for website booking links. Enable HTTPS for the `.com` website in GitHub Pages after domain verification. No DNS records have been changed as part of this project update.

## Integration path

- **Acuity Scheduling:** booking buttons use the configured Acuity URL directly, without a browser confirmation. Acuity handles appointment scheduling and the $45 appointment fee.
- **Square:** payment processing for repair transactions remains separate from appointment booking and is not modified here.
- **Zoho Mail:** add automation after confirming the booking/payment event source and desired email content. Do not put account credentials or API secrets in this public site.
- **Google Business Profile:** add the verified review link in `config.js` when available.
- **AI chatbot:** the service catalog, starting prices, FAQs, and booking handoff provide a clean information structure for a later chatbot backed by approved business facts.
