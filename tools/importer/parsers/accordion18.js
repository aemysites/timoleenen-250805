/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Find all accordion items: each .divider is one item
  const accordionItems = element.querySelectorAll(':scope > .divider');

  accordionItems.forEach((item) => {
    // Each item contains a grid with two children: title and content
    const grid = item.querySelector('.w-layout-grid');
    if (!grid) return;
    // Defensive: get direct children (title and content)
    const children = Array.from(grid.children);
    if (children.length < 2) return;
    const title = children[0]; // heading (reference, not clone)
    const content = children[1]; // rich text (reference, not clone)
    rows.push([title, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
