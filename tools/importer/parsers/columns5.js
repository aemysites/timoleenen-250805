/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of the grid layout
  const gridChildren = element.querySelectorAll(':scope > div > div, :scope > div > img');

  // Defensive: Find the left column (content) and right column (image)
  let leftCol = null;
  let rightImg = null;
  gridChildren.forEach((child) => {
    if (child.tagName === 'DIV') {
      leftCol = child;
    } else if (child.tagName === 'IMG') {
      rightImg = child;
    }
  });

  // Left column: Extract heading, paragraph, and button group
  let heading = null;
  let paragraph = null;
  let buttonGroup = null;
  if (leftCol) {
    // The actual content is inside another DIV
    const innerSection = leftCol.querySelector(':scope > div');
    if (innerSection) {
      heading = innerSection.querySelector('h2');
      paragraph = innerSection.querySelector('.rich-text, .w-richtext');
      buttonGroup = innerSection.querySelector('.button-group');
    }
  }

  // Compose left cell content
  const leftCellContent = [];
  if (heading) leftCellContent.push(heading);
  if (paragraph) leftCellContent.push(paragraph);
  if (buttonGroup) leftCellContent.push(buttonGroup);

  // Compose right cell content (image)
  const rightCellContent = rightImg ? [rightImg] : [];

  // Table rows
  const headerRow = ['Columns (columns5)'];
  const columnsRow = [leftCellContent, rightCellContent];

  const cells = [headerRow, columnsRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
