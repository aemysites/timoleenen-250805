/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct child divs (each containing an image)
  const columns = Array.from(element.children);
  
  // For each column, extract the image and its alt text
  const contentRow = columns.map(col => {
    const img = col.querySelector('img');
    if (!img) return '';
    const cell = document.createElement('div');
    // Clone the image
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt || '';
    image.loading = 'lazy';
    cell.appendChild(image);
    // Add alt text as visible text if present
    if (img.alt && img.alt.trim()) {
      const altText = document.createElement('p');
      altText.textContent = img.alt;
      cell.appendChild(altText);
    }
    return cell;
  });

  const headerRow = ['Columns (columns1)'];
  const cells = [headerRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
