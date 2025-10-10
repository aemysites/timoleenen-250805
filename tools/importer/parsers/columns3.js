/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if the expected grid layout exists
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get direct children of the grid
  const gridChildren = grid.querySelectorAll(':scope > *');
  // Expecting two columns: image (left), content (right)
  let imgEl = null;
  let contentEl = null;
  if (gridChildren.length >= 2) {
    // Find the image element
    imgEl = gridChildren[0].tagName === 'IMG' ? gridChildren[0] : gridChildren[0].querySelector('img');
    // The second child is the content wrapper
    contentEl = gridChildren[1];
  } else {
    // Fallback: try to find image and content
    imgEl = grid.querySelector('img');
    contentEl = grid.querySelector('div');
  }

  // Defensive: If either is missing, do nothing
  if (!imgEl || !contentEl) return;

  // Prepare the right column content
  // We'll include the heading, subheading, and button group
  const heading = contentEl.querySelector('h1');
  const subheading = contentEl.querySelector('p');
  const buttonGroup = contentEl.querySelector('.button-group');

  // Compose right column cell
  const rightColumnContent = [];
  if (heading) rightColumnContent.push(heading);
  if (subheading) rightColumnContent.push(subheading);
  if (buttonGroup) rightColumnContent.push(buttonGroup);

  // Table structure: header row, then one row with two columns
  const headerRow = ['Columns (columns3)'];
  const columnsRow = [imgEl, rightColumnContent];

  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
