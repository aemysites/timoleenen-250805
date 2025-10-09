/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Prepare the header row
  const headerRow = ['Columns (columns4)'];

  // Prepare the columns row: reference each column element
  const columnsRow = columns.map((col) => col);

  // Build the table rows
  const rows = [headerRow, columnsRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
