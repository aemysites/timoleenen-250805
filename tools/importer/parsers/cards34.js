/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block parsing
  // 1. Header row
  const headerRow = ['Cards (cards34)'];

  // 2. Find all card anchor elements (each card is an <a> inside the grid)
  const cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // 3. Build rows for each card
  const rows = cardAnchors.map(card => {
    // Find image (first img inside the card)
    const img = card.querySelector('img');

    // Find the text container (the div after the image)
    const contentDiv = img.nextElementSibling;

    // Defensive: If contentDiv is missing, fallback to card
    const textContainer = contentDiv || card;

    // We'll collect the tag, read time, heading, description, and CTA
    // Tag: first .tag inside textContainer
    const tagDiv = textContainer.querySelector('.tag');
    // Read time: .paragraph-sm inside textContainer
    const readTimeDiv = textContainer.querySelector('.paragraph-sm');
    // Heading: h3.h4-heading
    const heading = textContainer.querySelector('h3.h4-heading');
    // Description: first <p>
    const description = textContainer.querySelector('p');
    // CTA: last div inside textContainer with text 'Read'
    let ctaDiv = null;
    const ctaCandidates = Array.from(textContainer.querySelectorAll('div'));
    ctaDiv = ctaCandidates.find(div => div.textContent.trim().toLowerCase() === 'read');
    // If not found, fallback to null

    // Compose the right cell content
    const rightCellContent = [];
    if (tagDiv || readTimeDiv) {
      const tagRow = document.createElement('div');
      tagRow.style.display = 'flex';
      tagRow.style.gap = '0.5em';
      if (tagDiv) tagRow.appendChild(tagDiv);
      if (readTimeDiv) tagRow.appendChild(readTimeDiv);
      rightCellContent.push(tagRow);
    }
    if (heading) rightCellContent.push(heading);
    if (description) rightCellContent.push(description);
    if (ctaDiv) rightCellContent.push(ctaDiv);

    // Table row: [image, text content]
    return [img, rightCellContent];
  });

  // 4. Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // 5. Replace element
  element.replaceWith(table);
}
