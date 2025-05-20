# Blog Implementation Tasks

## 1. Website Structure Updates

### Navigation and Homepage Updates
- [x] Create `/blog` directory for blog content
- [ ] Add "Blog" link to main navigation in `index.html`
- [ ] Create a blog section teaser on the homepage showcasing latest articles
- [ ] Update footer links to include blog section

### Blog Structure Setup
- [ ] Create `blog/index.html` as the main blog listing page
- [ ] Create directory for each blog post (e.g., `/blog/why-avoiding-west-sun-hdb-singapore-matters/`)
- [ ] Develop blog post template with consistent styling
- [ ] Implement blog post navigation (previous/next post)

## 2. Content Creation

### Priority Content
- [ ] Write comprehensive guide: "Why Avoiding West Sun in Singapore HDB Units Matters"
- [ ] Create assets for this post:
  - [ ] Sun path diagrams for Singapore
  - [ ] Temperature comparison charts
  - [ ] Energy consumption infographics
  - [ ] Screenshots of Compass Overlay app usage
  
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
