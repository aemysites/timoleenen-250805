/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get all direct column children (there should be 4)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Defensive: must have at least 2 columns

  // Prepare the header row
  const headerRow = ['Columns (columns21)'];

  // Prepare the columns row: each cell is the content of one column
  // Use the whole column element for resilience and to preserve structure
  const columnsRow = columns.map(col => col);

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
