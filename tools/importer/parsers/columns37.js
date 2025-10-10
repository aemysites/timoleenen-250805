/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (columns)
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns (left: heading+subheading, right: button)
  // Left column: heading + subheading
  const leftCol = columns[0];
  // Right column: button
  const rightCol = columns[1];

  // Build the table rows
  const headerRow = ['Columns (columns37)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
