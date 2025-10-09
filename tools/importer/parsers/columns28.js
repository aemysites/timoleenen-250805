/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);

  // Defensive: If there are not exactly 2 columns, fallback to all children
  if (columns.length < 2) {
    return;
  }

  // Left column: text content (all elements inside the first grid child)
  const leftCol = columns[0];
  // We'll collect all direct children as a single cell
  const leftColContent = Array.from(leftCol.children);

  // Right column: image (the second grid child)
  const rightCol = columns[1];
  // If it's an image, use it directly
  let rightColContent = rightCol;
  // Defensive: If not an image, but contains one, use that
  if (rightCol.tagName !== 'IMG') {
    const img = rightCol.querySelector('img');
    if (img) {
      rightColContent = img;
    }
  }

  // Build the table rows
  const rows = [
    headerRow,
    [leftColContent, rightColContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
