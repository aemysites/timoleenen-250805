/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the two main columns (text, images)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // --- Left column: Text content ---
  const leftCol = columns[0];
  // Gather heading, subheading, buttons
  const heading = leftCol.querySelector('h1');
  const subheading = leftCol.querySelector('p');
  const buttonGroup = leftCol.querySelector('.button-group');
  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (subheading) leftCellContent.push(subheading);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // --- Right column: Images ---
  const rightCol = columns[1];
  // Find the nested grid with images
  const imagesGrid = rightCol.querySelector('.w-layout-grid.grid-layout');
  let imageElements = [];
  if (imagesGrid) {
    imageElements = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Defensive: If no nested grid, look for images directly
  if (imageElements.length === 0) {
    imageElements = Array.from(rightCol.querySelectorAll('img'));
  }

  // Compose right cell content: all images side by side
  const rightCellContent = imageElements;

  // --- Build table ---
  const headerRow = ['Columns (columns38)'];
  const contentRow = [leftCellContent, rightCellContent];
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
