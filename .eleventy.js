module.exports = function(eleventyConfig) {
  // Pass through static assets (these are at project root, not in src/)
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "products": "products" });

  // Pass through cross-pollination process docs and registry (briefs are now in src/ for Eleventy rendering)
  eleventyConfig.addPassthroughCopy({ "internal/cross-pollination/process": "internal/cross-pollination/process" });
  eleventyConfig.addPassthroughCopy({ "internal/cross-pollination/projects.json": "internal/cross-pollination/projects.json" });

  // Watch for changes
  eleventyConfig.addWatchTarget("styles/");
  eleventyConfig.addWatchTarget("internal/");

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
