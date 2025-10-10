/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children (should be two columns)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Left column: text/meta
  const leftCol = cols[0];
  // Right column: image
  const rightCol = cols[1];

  // --- LEFT COLUMN CONTENT ---
  // Compose all content in leftCol except images
  // (the image is always in rightCol for this layout)

  // --- RIGHT COLUMN CONTENT ---
  // Should contain only the image
  // Reference the image element directly
  const imageEl = rightCol.querySelector('img');

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns32)'];

  // Table row: leftCol (all text/meta), rightCol (image)
  // Reference existing elements, do not clone
  const row = [leftCol, imageEl];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
