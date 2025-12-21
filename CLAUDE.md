# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static website for apartment rentals in Gara Peris, Romania. Built with Bootstrap 5 template (EstateAgency) and hosted on Firebase Hosting.

## Commands

```bash
# Deploy to Firebase Hosting
firebase deploy

# Deploy only hosting (skip other Firebase services)
firebase deploy --only hosting

# Preview locally before deploying
firebase serve
```

## Architecture

- **Hosting**: Firebase Hosting (project: `apartamentegaraperis`)
- **Public directory**: `public/` - all static files served from here
- **Template**: EstateAgency Bootstrap template

### Directory Structure

```
public/
├── assets/
│   ├── css/         # Custom styles (style.css)
│   ├── scss/        # SCSS source files
│   ├── js/          # Custom JavaScript
│   ├── img/         # Images
│   └── vendor/      # Third-party libraries (Bootstrap, Swiper, etc.)
├── forms/           # PHP contact form handler
├── others/          # Additional pages (property listings, blog, agents)
├── index.html       # Homepage
├── apartamente.html # Apartments listing
├── contact.html     # Contact page
└── despre.html      # About page
```

### Vendor Libraries

- Bootstrap 5.3.3
- Bootstrap Icons
- Swiper (carousel)
- Animate.css
- PHP Email Form

## Notes

- Website is in Romanian language (`lang="ro"`)
- Contact form requires PHP backend (forms/contact.php)
- No build step required - static HTML/CSS/JS files
