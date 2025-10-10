/* global WebImporter */
export default function parse(element, { document }) {
  // --- HERO (hero40) BLOCK PARSER ---
  // 1. Always use block name as header row
  const headerRow = ['Hero (hero40)'];

  // 2. Extract background image (reference existing element)
  let imgEl = null;
  const firstGridDiv = element.querySelector('.utility-position-relative');
  if (firstGridDiv) {
    imgEl = firstGridDiv.querySelector('img.cover-image');
  }

  // 3. Extract heading, subheading, CTA (reference existing elements)
  let headingEl = null;
  let subheadingEl = null;
  let ctaEl = null;
  const textContainer = element.querySelector('.container');
  if (textContainer) {
    // Find heading
    headingEl = textContainer.querySelector('h1');
    // Find subheading (paragraph)
    subheadingEl = textContainer.querySelector('p');
    // Find CTA (button link)
    ctaEl = textContainer.querySelector('a');
  }

  // 4. Compose content cell for row 3 (reference, do not clone)
  const contentCell = [];
  if (headingEl) contentCell.push(headingEl);
  if (subheadingEl) contentCell.push(subheadingEl);
  if (ctaEl) contentCell.push(ctaEl);

  // 5. Table rows (no markdown, no hardcoded text, all content referenced)
  const imageRow = [imgEl ? imgEl : ''];
  const contentRow = [contentCell];
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace original element with block table
  element.replaceWith(table);
}
