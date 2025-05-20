// generate-sitemap.js
const fs = require('fs');
const path = require('path');

// Base URL for the website
const BASE_URL = 'https://www.compassoverlay.com';

// Function to get today's date in YYYY-MM-DD format
function getFormattedDate() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

// Function to scan blog directory and get all posts
function scanBlogDirectory() {
  const blogDir = path.join(__dirname, 'blog');
  const blogPosts = [];

  // If blog directory doesn't exist yet, return empty array
  if (!fs.existsSync(blogDir)) {
    return blogPosts;
  }

  // Read all directories inside blog directory
  const entries = fs.readdirSync(blogDir, { withFileTypes: true });
  
  for (const entry of entries) {
    // Skip the blog-posts.md and tasks.md files
    if (entry.name === 'blog-posts.md' || entry.name === 'tasks.md') {
      continue;
    }
    
    // Check if it's a directory and contains index.html or index.md
    if (entry.isDirectory()) {
      const entryPath = path.join(blogDir, entry.name);
      
      if (fs.existsSync(path.join(entryPath, 'index.html')) || 
          fs.existsSync(path.join(entryPath, 'index.md'))) {
        
        // Create a blog post entry
        blogPosts.push({
          url: `${BASE_URL}/blog/${entry.name}/`,
          lastmod: getFormattedDate(),
          changefreq: 'monthly',
          priority: '0.8'
        });
      }
    } else if (entry.name.endsWith('.html') && entry.name !== 'index.html') {
      // Handle HTML files directly in the blog directory
      const fileName = entry.name.replace('.html', '');
      
      blogPosts.push({
        url: `${BASE_URL}/blog/${fileName}`,
        lastmod: getFormattedDate(),
        changefreq: 'monthly',
        priority: '0.8'
      });
    }
  }
  
  return blogPosts;
}

// Function to create sitemap entry for a blog post
function createSitemapEntry(post) {
  return `  <url>
    <loc>${post.url}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>`;
}

// Function to create sitemap XML
function generateSitemap() {
  // Start with the XML declaration and root element
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${getFormattedDate()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`;

  // Get blog posts and add them to sitemap
  const blogPosts = scanBlogDirectory();
  for (const post of blogPosts) {
    sitemap += '\n' + createSitemapEntry(post);
  }

  // Close the root element
  sitemap += '\n</urlset>';

  return sitemap;
}

// Main execution
try {
  // Generate the sitemap
  const sitemap = generateSitemap();
  
  // Write the sitemap to file
  fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemap);
  
  console.log('Sitemap generated successfully!');
} catch (error) {
  console.error('Error generating sitemap:', error);
}
