/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns (heading, and content)
  // Column 1: Heading
  let heading = null;
  for (const col of columns) {
    if (col.tagName === 'H2' || col.querySelector('h2')) {
      heading = col.tagName === 'H2' ? col : col.querySelector('h2');
      break;
    }
  }
  // If not found, fallback to first child
  if (!heading && columns.length > 0) heading = columns[0];

  // Column 2: Paragraph and button
  let contentCol = null;
  for (const col of columns) {
    if (col !== heading) {
      contentCol = col;
      break;
    }
  }
  // Defensive fallback
  if (!contentCol && columns.length > 1) contentCol = columns[1];

  // Extract paragraph and button from contentCol
  let paragraph = null;
  let button = null;
  if (contentCol) {
    paragraph = contentCol.querySelector('p');
    button = contentCol.querySelector('a, button');
  }

  // Compose right column
  const rightColContent = [];
  if (paragraph) rightColContent.push(paragraph);
  if (button) rightColContent.push(button);

  // Table rows
  const headerRow = ['Columns (columns8)'];
  const contentRow = [heading, rightColContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
