# Blog Implementation Tasks

## 1. Website Structure Updates

### Navigation and Homepage Updates
- [x] Create `/blog` directory for blog content
- [x] Add "Blog" link to main navigation in `index.html`
- [x] Create a blog section teaser on the homepage showcasing latest articles
- [x] Update footer links to include blog section

### Blog Structure Setup
- [x] Create `blog/index.html` as the main blog listing page
- [x] Create directory for each blog post (e.g., `/blog/why-avoid-afternoon-sun-in-singapore-hdb-units/`)
- [x] Develop standard blog post template (blog-template.html) with:
  - [x] Consistent header and footer
  - [x] Article structure with proper heading hierarchy
  - [x] Author byline and publication date
  - [x] Social sharing buttons
  - [x] Related posts section
  - [x] Call-to-action for app download
- [x] Create CSS styles for blog content in `blog-styles.css`
  - [x] Typography styles optimized for readability
  - [x] Image styling with responsive design
  - [x] Code for featured images and captions
  - [x] Table of contents styling
- [x] Implement breadcrumb navigation

## 2. Content Creation

### Priority Content
- [x] Write comprehensive guide: "Why Avoiding West Sun in Singapore HDB Units Matters"
  - **Structure & Key Points:**
    - **Introduction**: Establish the unique challenge of west-facing units in Singapore's equatorial climate
    - **The Problem (with Real Examples):**
      - Concrete walls as heat banks: How they store and emit heat until midnight
      - Case study: $200 vs $100 monthly utility bills (west-facing vs optimal orientation)
      - Impact on comfort, sleep quality, and long-term livability
      - The "renovation regret" when homeowners sell prematurely due to heat issues
    - **The Science Behind It:**
      - Singapore's sun path variation (up to 48° throughout the year)
      - Thermal mass principles and how concrete stores heat
      - Comparison of morning vs afternoon sun intensity
    - **Solutions for BTO Buyers:**
      - Using Compass Overlay to analyze site plans before selection
      - Identifying optimal stack numbers in popular projects
      - Success story: How precise sun direction analysis helped select the perfect unit
    - **Call to Action:**
      - App download with step-by-step instructions
      - Professional analysis service offer ($29.90 consultation)
      - Free resources for current BTO launches

- [x] Create compelling visual assets:
  - [x] Animated sun path diagram showing seasonal variations
  - [x] Infographic: "The True Cost of West Sun" (energy bills comparison)
  - [x] Before/after thermal imaging of west-facing walls
  - [x] Step-by-step app usage guide with project site plan examples
  - [x] Downloadable decision-making checklist for BTO buyers
  
### BTO Project Content
- [ ] Research detailed information for each BTO project:
  - [ ] Chencharu Green
  - [ ] Chencharu Vines
  - [ ] Woodlands North Verge
  - [ ] Stirling Horizon
  - [ ] Tanjong Rhu Parc Front
- [ ] Obtain site plans for each project
- [ ] Create compass overlays for each site plan
- [ ] Analyze sun direction impact on different blocks and stacks
- [ ] Write detailed blog posts following the outlined structure in blog-posts.md

## 3. Technical Implementation

### Sitemap Generation
- [ ] Create a script to automatically generate sitemap.xml from blog posts
- [ ] Script should:
  - [ ] Scan the blog directory for all posts
  - [ ] Extract metadata (title, URL, date)
  - [ ] Generate properly formatted sitemap entries
  - [ ] Merge with existing sitemap entries
  - [ ] Output updated sitemap.xml

```javascript
// Example structure for sitemap generation script
const fs = require('fs');
const path = require('path');

function generateSitemap() {
  // 1. Get all blog posts
  const blogPosts = scanBlogDirectory();
  
  // 2. Create sitemap entries for each post
  const blogSitemapEntries = blogPosts.map(post => createSitemapEntry(post));
  
  // 3. Read existing sitemap
  const existingSitemap = fs.readFileSync('sitemap.xml', 'utf8');
  
  // 4. Merge entries
  const updatedSitemap = mergeSitemapEntries(existingSitemap, blogSitemapEntries);
  
  // 5. Write updated sitemap
  fs.writeFileSync('sitemap.xml', updatedSitemap);
}

// Implement helper functions
```

### SEO Optimization
- [ ] Create meta title and description templates for blog posts
- [ ] Implement proper Open Graph tags for social sharing
- [ ] Add structured data for blog articles using Schema.org markup
- [ ] Implement canonical URLs for all blog content

## 4. Testing and Launch

### Pre-Launch Checklist
- [ ] Test responsive design across devices
- [ ] Check for broken links
- [ ] Validate HTML and CSS
- [ ] Test sitemap functionality
- [ ] Verify analytics tracking for blog section

### Launch Steps
- [ ] Deploy updated site with blog content
- [ ] Submit updated sitemap to Google Search Console
- [ ] Monitor traffic and user engagement
- [ ] Schedule regular content updates
