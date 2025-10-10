/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get children: text block, contact list, image
  let textBlock = null, contactList = null, mainImage = null;
  for (const child of Array.from(grid.children)) {
    if (child.tagName === 'DIV' && child.querySelector('h2, h3, p')) {
      textBlock = child;
    } else if (child.tagName === 'UL') {
      contactList = child;
    } else if (child.tagName === 'IMG') {
      mainImage = child;
    }
  }

  // Defensive: Only proceed if at least text and contact columns exist
  if (!textBlock || !contactList) return;

  // Build table rows
  // Header row: block name EXACTLY as required
  const headerRow = ['Columns (columns9)'];

  // Second row: left column (text block), right column (contact list)
  // Reference the actual elements from the DOM, do not clone
  const contentRow = [textBlock, contactList];

  // Third row: image spanning both columns visually
  // Place image in first cell, leave second cell empty for correct column count
  const imageRow = [mainImage || '', ''];

  // Compose table
  const tableRows = [
    headerRow,
    contentRow,
    imageRow
  ];

  // Create table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element with block
  element.replaceWith(block);
}
