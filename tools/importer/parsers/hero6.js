/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. Extract background image ---
  let bgImg = null;
  const img = element.querySelector('img');
  if (img) bgImg = img.cloneNode(true);

  // --- 2. Extract all text content from the card ---
  // Find the card element that contains the headline, subheading, and CTAs
  const card = element.querySelector('.card');
  let contentCell = [];
  if (card) {
    // Headline (all h1 text, including line breaks)
    const h1 = card.querySelector('h1');
    if (h1) {
      // Preserve line breaks for multi-line headline
      const headline = document.createElement('h1');
      headline.innerHTML = h1.innerHTML; // preserves <br> and formatting
      contentCell.push(headline);
    }
    // Subheading (all paragraphs)
    const paragraphs = card.querySelectorAll('p');
    paragraphs.forEach(p => {
      const para = document.createElement('p');
      para.textContent = p.textContent.trim();
      contentCell.push(para);
    });
    // CTAs (all links in button group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      Array.from(buttonGroup.querySelectorAll('a')).forEach(a => {
        const anchor = document.createElement('a');
        anchor.href = a.getAttribute('href');
        anchor.textContent = a.textContent.trim();
        contentCell.push(anchor);
      });
    }
  }

  // --- 3. Build the block table ---
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(table);
}
