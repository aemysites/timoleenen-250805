/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: Find the grid container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If there are no columns, do nothing
  if (!columns.length) return;

  // For this block, we want one table row with each column's content in a cell
  // Each column may contain rich text or a button
  const contentRow = columns.map((col) => {
    // If the column contains only one child, use that child directly
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    // Otherwise, use the column itself (preserves all content)
    return col;
  });

  // Build the table rows
  const rows = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
