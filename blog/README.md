# Compass Overlay Blog System

This directory contains the blog system for the Compass Overlay website. The blog focuses on HDB BTO launches in Singapore, with special emphasis on unit selection to avoid the west sun for better energy efficiency and comfort.

## File Structure

- `/blog/index.html` - Main blog listing page
- `/blog/blog-styles.css` - Primary CSS styles for blog
- `/blog/blog-fixes.css` - Additional CSS fixes for responsive design and cross-browser compatibility
- `/blog/blog-template.html` - Template for creating new blog posts
- `/blog/blog-posts.md` - Content requirements for planned blog posts
- `/blog/tasks.md` - Implementation tasks and progress tracking

## Blog Post Structure

Each blog post is stored in its own directory under `/blog/`:

```
/blog/post-slug/
  ├── index.html
  ├── featured-image.jpg (or .svg)
  └── [other post images]
```

## Creating New Blog Posts

1. Create a new directory with the post slug under `/blog/`
2. Copy `blog-template.html` to the new directory as `index.html`
3. Replace all template variables (marked with `%%VARIABLE%%`)
4. Add all necessary images to the post directory
5. Update the sitemap using the `generate-sitemap.js` script

## CSS Structure

- `blog-styles.css` - Main styling for all blog elements
- `blog-fixes.css` - Fixes for cross-browser compatibility and responsiveness issues

## Known Issues and Fixes

- Desktop header overlap: Fixed in `blog-fixes.css` by adjusting z-index and positioning
- Mobile styling: Improved in `blog-fixes.css` with better typography and spacing
- Image handling: Enhanced with proper aspect ratios and responsive sizing

## Template Variables

- `%%POST_TITLE%%` - Title of the blog post
- `%%META_DESCRIPTION%%` - SEO description (150-160 characters)
- `%%META_KEYWORDS%%` - Comma-separated keywords
- `%%FEATURED_IMAGE_URL%%` - URL to the featured image
- `%%FEATURED_IMAGE_ALT%%` - Alt text for the featured image
- `%%PUBLISHED_DATE%%` - ISO format date (YYYY-MM-DD)
- `%%DISPLAY_DATE%%` - Human-readable date (Month DD, YYYY)
- `%%AUTHOR_NAME%%` - Name of the author
- `%%CANONICAL_URL%%` - Full URL to the post
- `%%CATEGORY_SLUG%%` - Category slug for categorization
- `%%CATEGORY_NAME%%` - Display name of the category
- `%%TABLE_OF_CONTENTS%%` - Generated table of contents (replace with HTML list)
- `%%POST_CONTENT%%` - Main content of the post
- `%%RELATED_POSTS%%` - HTML for related posts section
- `%%PREV_POST%%` and `%%NEXT_POST%%` - Navigation links to adjacent posts

## SEO Considerations

- Each blog post includes schema.org structured data for better search visibility
- Meta descriptions are optimized for search and social sharing
- Proper Open Graph and Twitter card meta tags are included
- Canonical URLs prevent duplicate content issues

## Maintenance

- Update `sitemap.xml` when adding new posts
- Check for broken links periodically
- Update related posts sections as new content is added
