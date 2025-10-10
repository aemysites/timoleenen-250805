/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows
  // Each card: [image, text content]

  // Helper to extract image and text from a card div
  function extractCardContent(cardDiv) {
    // Find the first image inside the card
    const img = cardDiv.querySelector('img');
    // Find the text content (h3 and p) inside the card
    const h3 = cardDiv.querySelector('h3');
    const p = cardDiv.querySelector('p');
    let textContent = null;
    if (h3 || p) {
      const frag = document.createDocumentFragment();
      if (h3) frag.appendChild(h3.cloneNode(true));
      if (p) frag.appendChild(p.cloneNode(true));
      textContent = frag;
    } else {
      textContent = '';
    }
    return [img, textContent];
  }

  // Get all immediate children that are cards
  // Cards have either: an image and a text wrapper, or just an image
  const cardDivs = Array.from(element.children).filter(child => {
    // Must contain an img
    return child.querySelector('img');
  });

  // Build the table rows
  const rows = [];
  // Header row
  rows.push(['Cards (cards26)']);

  // For each card, extract image and text
  cardDivs.forEach(cardDiv => {
    const [img, textContent] = extractCardContent(cardDiv);
    rows.push([img, textContent]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
