/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the immediate children of the grid (should be 2: image and content)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: image
  const imageEl = gridChildren.find((child) => child.tagName === 'IMG');

  // Second column: content block (text, tags, heading, byline)
  const contentEl = gridChildren.find((child) => child !== imageEl);

  // Defensive: if either is missing, abort
  if (!imageEl || !contentEl) return;

  // Build the table rows
  const headerRow = ['Columns (columns33)'];
  const columnsRow = [imageEl, contentEl];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
