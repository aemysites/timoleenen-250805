/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for Columns (columns39)
  const headerRow = ['Columns (columns39)'];

  // 2. Get all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // 3. For each column, extract the main content (in this case, the image inside each div)
  // Defensive: if a column doesn't have an image, just use the column div itself
  const columnCells = columns.map(col => {
    const img = col.querySelector('img');
    return img ? img : col;
  });

  // 4. Build the table rows
  const tableRows = [
    headerRow,
    columnCells
  ];

  // 5. Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // 6. Replace the original element with the new block
  element.replaceWith(block);
}
