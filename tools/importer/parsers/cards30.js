/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards30) block: 2 columns per row (image, text)
  const headerRow = ['Cards (cards30)'];

  // Find all card containers (utility-aspect-1x1)
  const cardDivs = element.querySelectorAll('.utility-aspect-1x1');

  // Each row: [image, empty text cell] (no visible text content in source)
  const rows = Array.from(cardDivs).map(cardDiv => {
    const img = cardDiv.querySelector('img');
    return [img, ''];
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
