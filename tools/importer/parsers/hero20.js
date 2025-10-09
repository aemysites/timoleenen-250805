/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero20) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image(s) (collage)
  // Row 3: Title, subheading, CTA(s)

  // --- Row 1 ---
  const headerRow = ['Hero (hero20)'];

  // --- Row 2 ---
  // Find the collage of images (background)
  // The images are inside: .grid-layout.desktop-3-column
  const collageGrid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (collageGrid) {
    images = Array.from(collageGrid.querySelectorAll('img'));
  }
  // Put all images in a single cell (as collage)
  const collageCell = [images];

  // --- Row 3 ---
  // Find the content: heading, subheading, CTA buttons
  // Content is inside: .ix-hero-scale-3x-to-1x-content
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  let contentElements = [];
  if (contentContainer) {
    // Heading (h1)
    const heading = contentContainer.querySelector('h1');
    if (heading) contentElements.push(heading);
    // Subheading (p)
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentElements.push(subheading);
    // CTA buttons (all <a> inside .button-group)
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) contentElements.push(...ctas);
    }
  }
  const contentCell = [contentElements];

  // Build table rows
  const rows = [
    headerRow,
    collageCell,
    contentCell
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
