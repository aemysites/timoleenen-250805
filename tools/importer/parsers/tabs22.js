/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find tab navigation container and content container
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');

  // Defensive: If either missing, do nothing
  if (!tabMenu || !tabContent) return;

  // Get tab labels (anchors)
  const tabLinks = getDirectChildren(tabMenu, 'a');
  // Get tab panes (content panels)
  const tabPanes = getDirectChildren(tabContent, '.w-tab-pane');

  // Defensive: If mismatch, bail
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Build table rows
  const rows = [];
  // Header row as required
  rows.push(['Tabs (tabs22)']);

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: Use the inner text of the tab link's child div (if present)
    let labelDiv = tabLinks[i].querySelector('div');
    let label = labelDiv ? labelDiv.textContent.trim() : tabLinks[i].textContent.trim();
    // Tab content: Use the entire tab pane's content
    // Defensive: If tabPane has only one child (the grid), use that child
    let pane = tabPanes[i];
    let contentEl = pane.children.length === 1 ? pane.firstElementChild : pane;
    rows.push([label, contentEl]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
