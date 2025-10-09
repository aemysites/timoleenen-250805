/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows. First row is block name.
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct card containers (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Defensive: Each cardDiv should have icon and text
    // Icon: find first .icon img inside cardDiv
    let iconImg = null;
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Text: find first <p> inside cardDiv
    let textContent = null;
    textContent = cardDiv.querySelector('p');
    // If no <p>, fallback to any text node
    if (!textContent) {
      // fallback: get all text nodes
      const textNodes = Array.from(cardDiv.childNodes).filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim());
      if (textNodes.length) {
        const p = document.createElement('p');
        p.textContent = textNodes.map(n => n.textContent.trim()).join(' ');
        textContent = p;
      }
    }
    // Defensive: skip if no icon or text
    if (!iconImg && !textContent) return;
    // Compose row: icon in first cell, text in second cell
    const row = [iconImg || '', textContent || ''];
    rows.push(row);
  });

  // Create table block and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
