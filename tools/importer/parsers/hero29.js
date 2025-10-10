/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (always block name)
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row
  // Find the image element (background)
  let bgImg = null;
  const imgEl = element.querySelector('img');
  if (imgEl) {
    bgImg = imgEl;
  }

  // 3. Content row (title, subheading, CTA)
  // Find the main heading (h1)
  let title = null;
  let subheading = null;
  let cta = null;

  // Find h1 for title
  const h1 = element.querySelector('h1');
  if (h1) {
    title = h1;
  }

  // Subheading: look for h2, h3, or paragraph after h1 (not present in this example, but future-proof)
  // Only immediate children of the content container
  const contentContainer = element.querySelector('.container');
  if (contentContainer) {
    // Find h2 or h3 after h1
    const headings = Array.from(contentContainer.querySelectorAll('h2, h3'));
    if (headings.length > 0) {
      subheading = headings[0];
    } else {
      // Try to find a paragraph
      const para = contentContainer.querySelector('p');
      if (para) {
        subheading = para;
      }
    }
    // CTA: look for a link or button
    const btnGroup = contentContainer.querySelector('.button-group');
    if (btnGroup) {
      // Find first anchor or button
      const ctaEl = btnGroup.querySelector('a, button');
      if (ctaEl) {
        cta = ctaEl;
      }
    }
  }

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Compose table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell.length > 0 ? contentCell : ''],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
