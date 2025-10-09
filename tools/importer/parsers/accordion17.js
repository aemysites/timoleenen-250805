/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion17)'];
  const rows = [headerRow];

  // Find all accordion items (each .w-dropdown is an accordion item)
  const accordionItems = element.querySelectorAll('.w-dropdown');

  accordionItems.forEach((item) => {
    // Title: find the clickable header (role="button")
    const toggle = item.querySelector('[role="button"]');
    let title = null;
    if (toggle) {
      // The title is usually inside a .paragraph-lg inside the toggle
      title = toggle.querySelector('.paragraph-lg') || toggle;
    }

    // Content: find the accordion content panel
    const contentNav = item.querySelector('nav.accordion-content');
    let content = null;
    if (contentNav) {
      // The actual content is inside a .w-richtext (may be wrapped in padding div)
      const richText = contentNav.querySelector('.w-richtext');
      content = richText || contentNav;
    }

    // Defensive: If either title or content is missing, skip this item
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
