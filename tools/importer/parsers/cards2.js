/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content
  function extractCard(cardEl) {
    // Find image (mandatory)
    const img = cardEl.querySelector('img');
    // Find heading (h2, h3, h4)
    const heading = cardEl.querySelector('h2, h3, h4');
    // Find description (first <p> after heading)
    const desc = cardEl.querySelector('p');
    // Find CTA (button or link)
    let cta = cardEl.querySelector('.button, button, a:not([href="#"])');
    // If not found, try any <a> with href
    if (!cta) {
      cta = cardEl.querySelector('a.button, a');
    }
    // Compose text cell
    const textCell = [];
    if (heading) textCell.push(heading);
    if (desc) textCell.push(desc);
    if (cta) textCell.push(cta);
    return [img, textCell];
  }

  // Locate main cards container
  const gridContainers = element.querySelectorAll('.w-layout-grid.grid-layout');
  // The first grid contains the large card, the second contains the smaller cards
  let cards = [];
  if (gridContainers.length > 0) {
    // First card (large card)
    const firstCardLink = gridContainers[0].querySelector('.utility-link-content-block');
    if (firstCardLink) {
      cards.push(extractCard(firstCardLink));
    }
    // Nested grid for smaller cards
    const nestedGrid = gridContainers[0].querySelector('.w-layout-grid.grid-layout');
    if (nestedGrid) {
      const smallCardLinks = nestedGrid.querySelectorAll('.utility-link-content-block');
      smallCardLinks.forEach(cardEl => {
        cards.push(extractCard(cardEl));
      });
    }
  }

  // Table header
  const headerRow = ['Cards (cards2)'];
  const tableRows = [headerRow, ...cards];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
