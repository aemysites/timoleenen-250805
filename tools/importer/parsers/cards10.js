/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select all card elements (each is an <a> with class 'card-link')
  const cards = element.querySelectorAll('a.card-link');

  cards.forEach(card => {
    // --- IMAGE CELL ---
    // Find the image inside the card
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let imgEl = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: if no image, use container as fallback
    const imageCell = imgEl || imgContainer || '';

    // --- TEXT CELL ---
    // Find the tag (category label)
    const tagGroup = card.querySelector('.tag-group');
    let tagEl = tagGroup ? tagGroup.querySelector('.tag') : null;
    // Find the heading
    const headingEl = card.querySelector('h3');
    // Find the description
    const descEl = card.querySelector('p');

    // Compose the text cell content
    const textCellContent = [];
    if (tagEl) textCellContent.push(tagEl);
    if (headingEl) textCellContent.push(headingEl);
    if (descEl) textCellContent.push(descEl);

    rows.push([imageCell, textCellContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
