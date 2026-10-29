# Morrowplate static site

This project is a lightweight static website for Morrowplate with a public-facing landing page, self-guided nutrition tools, service pages, analysis pages, and a staff workspace. It has no server-side form handling or product checkout.

## Pages
- `index.html` — public homepage
- `services.html` — service overview
- `start.html` — choose a support path and contact Morrowplate
- `bmi-calculator.html` — adult BMI screening calculator
- `dietary-recall.html` — private, browser-only worksheet with print/PDF support
- `meal-planning.html` — meal-planning snapshot
- `analysis.html` — detailed support pages
- `staff.html` — internal overview
- `sessions.html` — sessions settings page
- `availability.html` — availability settings page
- `booking-terms.html` — booking policies page

## Contact and product notes
- The start page links to email and Calendly; it does not collect contact details itself.
- Dietary recall answers are not submitted to the site. The worksheet can be printed or saved as a PDF from the browser.
- Product prices are indicative. Confirm current pricing, inclusions, and delivery before arranging a paid product.

## Deployment options

### Cloudflare Pages
1. Push this folder to a GitHub repository.
2. Log in to Cloudflare.
3. Go to Pages > Create project > Connect to Git.
4. Select the repository and deploy.

### Netlify
1. Push this folder to GitHub.
2. Import the repo in Netlify.
3. Set the publish directory to the project root.

### GitHub Pages
1. Push this folder to GitHub.
2. Enable GitHub Pages in the repository settings.
3. Choose the branch and root folder.

## Booking links
The site currently uses a Calendly booking URL:
https://calendly.com/morrowplate/consultation

Replace this with your real booking link when ready.
