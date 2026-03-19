# Graphics Design Co

## Current State
New project with empty backend and no frontend implementation.

## Requested Changes (Diff)

### Add
- Full single-page marketing website for a graphics design company
- Bold hero section with tagline and two CTAs
- Services section with 6 service cards (logo design, branding, print design, digital graphics, UI/UX, motion graphics)
- Portfolio/gallery section with category filters and built-in admin management panel (add/edit/remove portfolio items with images)
- Team/About section with team member cards
- Client testimonials section with carousel
- Contact section with a form
- Footer with navigation and newsletter
- Admin login via authorization component to protect management panel
- Blob storage for portfolio item images

### Modify
- None

### Remove
- None

## Implementation Plan
1. Select `authorization` and `blob-storage` Caffeine components
2. Generate Motoko backend with:
   - Portfolio item CRUD (title, category, description, image blob reference)
   - Testimonials storage
   - Contact form submission storage
   - Team member data
   - Admin-only write operations via authorization
3. Build React frontend:
   - Sticky navbar with scroll-based active state
   - Hero section with headline, paragraph, and two CTAs
   - Services grid (6 cards)
   - Portfolio gallery with category filter chips and masonry-like grid
   - Admin panel (behind auth) for adding/editing/removing portfolio items and uploading images via blob-storage
   - Team section with member cards
   - Testimonials carousel
   - Contact form with submission to backend
   - Footer
