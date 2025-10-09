/* global WebImporter */
export default function parse(element, { document }) {
  // Columns (columns7) block: create header row with block name
  const headerRow = ['Columns (columns7)'];

  // Select all direct child divs (each is a column)
  const columns = Array.from(element.children);

  // For each column, extract the image element (reference, not clone)
  // If no image found, insert an empty string
  const cells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table: header row, then one row with images
  const rows = [headerRow, cells];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
