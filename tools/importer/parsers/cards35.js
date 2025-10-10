/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows, each card = image (mandatory), text (optional)
  // Source HTML: grid container, each child div contains an image only, no text
  // Screenshot: grid of image-only cards, no visible text

  // Header row per spec
  const headerRow = ['Cards (cards35)'];

  // Find all card containers (each immediate child of the grid)
  const cardDivs = Array.from(element.children);

  // For each card, extract the image element (mandatory)
  // Since there is no text content in the HTML or screenshot, second cell is left empty
  const rows = cardDivs.map(cardDiv => {
    // Defensive: find the image inside the card div
    const img = cardDiv.querySelector('img');
    // Always reference the actual image element, never clone or create new
    return [img, ''];
  });

  // Build the table: header + card rows
  const tableCells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
