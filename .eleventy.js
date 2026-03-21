module.exports = function(eleventyConfig) {
  // Pass through static assets (these are at project root, not in src/)
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "products": "products" });

  // Pass through internal hub (cross-pollination briefs, unlisted)
  eleventyConfig.addPassthroughCopy({ "internal": "internal" });

  // Watch for changes
  eleventyConfig.addWatchTarget("styles/");
  eleventyConfig.addWatchTarget("internal/");

  // Current year filter for copyright
  eleventyConfig.addFilter("currentYear", function() {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
