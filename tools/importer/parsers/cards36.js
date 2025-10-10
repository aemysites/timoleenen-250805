/* global WebImporter */
export default function parse(element, { document }) {
  // Cards36 block: 2 columns, multiple rows, each row = card (image/icon, text)
  const headerRow = ['Cards (cards36)'];
  const rows = [headerRow];

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Defensive: get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // The first child is the large feature card (with image, tag, heading, desc)
  const featureCard = gridChildren[0];
  if (featureCard && featureCard.tagName === 'A') {
    // Image
    const imgWrap = featureCard.querySelector('.utility-aspect-1x1');
    const img = imgWrap ? imgWrap.querySelector('img') : null;
    // Text content: tag, heading, description
    const tag = featureCard.querySelector('.tag-group');
    const heading = featureCard.querySelector('h3');
    const desc = featureCard.querySelector('p');
    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) textCell.appendChild(tag);
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    rows.push([
      img ? img : '',
      textCell
    ]);
  }

  // The second child is a flex container with two smaller cards (each has image, tag, heading, desc)
  const smallCardsFlex = gridChildren[1];
  if (smallCardsFlex) {
    const smallCards = Array.from(smallCardsFlex.querySelectorAll('a.utility-link-content-block'));
    smallCards.forEach(card => {
      // Image
      const imgWrap = card.querySelector('.utility-aspect-3x2');
      const img = imgWrap ? imgWrap.querySelector('img') : null;
      // Text content: tag, heading, description
      const tag = card.querySelector('.tag-group');
      const heading = card.querySelector('h3');
      const desc = card.querySelector('p');
      const textCell = document.createElement('div');
      if (tag) textCell.appendChild(tag);
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      rows.push([
        img ? img : '',
        textCell
      ]);
    });
  }

  // The third child is a flex container with a vertical stack of text-only cards, separated by dividers
  const textCardsFlex = gridChildren[2];
  if (textCardsFlex) {
    // Each card is an 'a.utility-link-content-block', followed by a divider
    const textCards = Array.from(textCardsFlex.querySelectorAll('a.utility-link-content-block'));
    textCards.forEach(card => {
      // No image, so first cell is empty string
      // Text: heading and description
      const heading = card.querySelector('h3');
      const desc = card.querySelector('p');
      const textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      rows.push([
        '',
        textCell
      ]);
    });
  }

  // Create and replace with block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
