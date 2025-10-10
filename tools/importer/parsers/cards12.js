/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all card links (each card is an <a> inside the grid container)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach(card => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const imgWrapper = card.querySelector('.utility-aspect-2x3');
    let imageEl = imgWrapper ? imgWrapper.querySelector('img') : null;
    // Defensive: If image not found, use the entire wrapper (could contain SVG/icon in other variants)
    const imageCell = imageEl || imgWrapper;

    // --- TEXT CELL ---
    // Tag and Date
    const infoRow = card.querySelector('.flex-horizontal');
    let tag = '', date = '';
    if (infoRow) {
      const tagEl = infoRow.querySelector('.tag');
      const dateEl = infoRow.querySelector('.paragraph-sm');
      tag = tagEl ? tagEl.textContent.trim() : '';
      date = dateEl ? dateEl.textContent.trim() : '';
    }
    // Heading
    const headingEl = card.querySelector('h3, .h4-heading');
    // Compose text cell: tag/date row, then heading
    // Tag and date as a horizontal flex container
    const tagDateDiv = document.createElement('div');
    tagDateDiv.style.display = 'flex';
    tagDateDiv.style.gap = '0.5em';
    if (tag) {
      const tagSpan = document.createElement('span');
      tagSpan.textContent = tag;
      tagSpan.className = 'tag';
      tagDateDiv.appendChild(tagSpan);
    }
    if (date) {
      const dateSpan = document.createElement('span');
      dateSpan.textContent = date;
      dateSpan.className = 'date';
      tagDateDiv.appendChild(dateSpan);
    }
    // Compose cell content
    const textCellContent = [];
    if (tag || date) textCellContent.push(tagDateDiv);
    if (headingEl) textCellContent.push(headingEl);
    // If the card link is meaningful (not just a wrapper), add as CTA at the bottom
    // But in this design, the whole card is a link, so skip explicit CTA

    // Add row: [image, text]
    rows.push([imageCell, textCellContent]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
