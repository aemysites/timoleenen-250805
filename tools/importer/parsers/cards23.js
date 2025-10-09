/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block: 2 columns, multiple rows, each row = [image/icon, text content]
  const headerRow = ['Cards (cards23)'];
  const rows = [headerRow];

  // Find all tab panes (each tab contains a grid of cards)
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));

  tabPanes.forEach((tabPane) => {
    // Find the grid container in each tab pane
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = Array.from(grid.querySelectorAll('a.utility-link-content-block'));
    cards.forEach((card) => {
      // Try to find image (first cell)
      let imgDiv = card.querySelector('.utility-aspect-3x2');
      let img = imgDiv ? imgDiv.querySelector('img') : null;
      // Text cell: heading and description
      let heading = card.querySelector('h3');
      let desc = card.querySelector('.paragraph-sm');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Defensive: if both missing, skip card
      if (!img && textCell.length === 0) return;
      // If image is present, use [img, text]. If not, merge all text into a single cell (2nd col), and put an empty string in first col.
      if (img) {
        rows.push([img, textCell]);
      } else {
        rows.push(['', textCell]);
      }
    });
  });

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
