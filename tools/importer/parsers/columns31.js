/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  const columns = Array.from(grid.children);

  // Column 1: Name (Taylor Brooks)
  const nameCol = columns[0].cloneNode(true);

  // Column 2: Tags (vertical stack)
  const tagsCol = columns[1];
  const tagDivs = Array.from(tagsCol.querySelectorAll('.tag'));
  const tagsWrapper = document.createElement('div');
  tagDivs.forEach(tag => {
    tagsWrapper.appendChild(tag.cloneNode(true));
  });

  // Column 3: Heading and rich text
  // The heading is in columns[2], rich text in columns[3]
  const headingCol = columns[2];
  const richTextCol = columns[3];
  // FIX: Always include the headline (h2) and rich text in the third column
  const col3Wrapper = document.createElement('div');
  // Ensure headline is included (even if not inside h2)
  let headline = headingCol.querySelector('h2');
  if (!headline && headingCol.childNodes.length) {
    // Fallback: use all text content from headingCol
    headline = document.createElement('div');
    headline.textContent = headingCol.textContent;
  }
  if (headline) col3Wrapper.appendChild(headline.cloneNode(true));
  const richTextEl = richTextCol.querySelector('.rich-text');
  if (richTextEl) col3Wrapper.appendChild(richTextEl.cloneNode(true));

  // Compose columns for the block
  const blockColumns = [
    nameCol,
    tagsWrapper,
    col3Wrapper
  ];

  // Build the table
  const headerRow = ['Columns (columns31)'];
  const tableRows = [
    headerRow,
    blockColumns
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
