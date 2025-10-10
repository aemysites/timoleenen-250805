/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid containing the carousel images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (each is a slide)
  const slideDivs = Array.from(grid.children);

  // Header row as specified
  const headerRow = ['Carousel (carousel16)'];

  // Build rows: each slide is a row with image in first cell, empty second cell (no text in source)
  const rows = slideDivs.map((slideDiv) => {
    // Find the image inside this slide
    const img = slideDiv.querySelector('img');
    // Defensive: only add row if image exists
    if (img) {
      return [img, ''];
    }
    return null;
  }).filter(Boolean);

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
