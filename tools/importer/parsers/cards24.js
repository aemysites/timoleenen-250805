/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block parser
  // Header row
  const headerRow = ['Cards (cards24)'];

  // Find the card container (the rotated/blurred card)
  // Defensive: look for .ix-card-rotate-2 or .card
  const cardRoot = element.querySelector('.ix-card-rotate-2, .card');
  let cardBody = cardRoot;
  if (cardRoot && cardRoot.classList.contains('ix-card-rotate-2')) {
    // .ix-card-rotate-2 contains .card
    cardBody = cardRoot.querySelector('.card-body') || cardRoot;
  } else if (cardRoot) {
    // fallback: .card itself
    cardBody = cardRoot.querySelector('.card-body') || cardRoot;
  }

  // Extract image (mandatory)
  const img = cardBody.querySelector('img');

  // Extract heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose text cell
  const textCell = [];
  if (heading) textCell.push(heading);
  // No description or CTA in source HTML

  // Compose card row: [image, text]
  const cardRow = [img, textCell];

  // Build table
  const cells = [headerRow, cardRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
