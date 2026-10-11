import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const baseImageUrl = 'https://planners-xaybopuh.myshopify.com/cdn/shop/t/5/assets';

const groups = [
  {
    type: 'Lounge Chair',
    image: 'lounge-chair',
    material: 'solid oak and textured upholstery',
    detail: 'A deep, supportive seat and softly rounded arms create a relaxed reading corner.',
    names: ['Cove Boucle Lounge Chair', 'Alder Sculpt Chair', 'Noma Reading Chair', 'Elio Oak Armchair', 'Drift Accent Chair'],
    prices: [649, 729, 695, 779, 625],
  },
  {
    type: 'Sofa',
    image: 'sofa',
    material: 'linen-blend upholstery and a kiln-dried frame',
    detail: 'Generous cushions and a calm, low profile make it an easy anchor for modern living rooms.',
    names: ['Moss Linen Sofa', 'Haven Three Seat Sofa', 'Lune Rounded Sofa', 'Meadow Lounge Sofa', 'Arlo Soft Sofa'],
    prices: [1699, 1899, 2099, 1795, 1599],
  },
  {
    type: 'Coffee Table',
    image: 'coffee-table',
    material: 'smoked oak veneer and a reinforced wood core',
    detail: 'Its organic top and grounded silhouette offer an elegant surface without visually crowding the room.',
    names: ['Orbit Smoked Oak Table', 'Pebble Coffee Table', 'Sable Oval Table', 'Halo Low Table', 'Rowan Center Table'],
    prices: [579, 499, 625, 545, 595],
  },
  {
    type: 'Floor Lamp',
    image: 'floor-lamp',
    material: 'brushed brass and a softly diffusing linen shade',
    detail: 'A slender arc casts warm, focused light over sofas, desks, and quiet reading spaces.',
    names: ['Arc Brass Floor Lamp', 'Sol Linen Shade Lamp', 'Meridian Floor Light', 'Atelier Arc Lamp', 'Glow Brass Lamp'],
    prices: [329, 295, 349, 379, 315],
  },
  {
    type: 'Dining Table',
    image: 'dining-table',
    material: 'pale ash wood with a durable matte finish',
    detail: 'Rounded edges and balanced proportions comfortably host everyday meals and weekend gatherings.',
    names: ['Vale Ash Dining Table', 'Linden Dining Table', 'Forma Six Seater', 'Alba Rounded Table', 'Grove Dining Table'],
    prices: [1199, 1095, 1299, 1249, 1150],
  },
  {
    type: 'Sideboard',
    image: 'sideboard',
    material: 'walnut veneer, solid wood legs, and concealed hardware',
    detail: 'Spacious interior storage keeps tableware and media essentials organized behind clean-lined doors.',
    names: ['Nocturne Walnut Sideboard', 'Vela Media Console', 'Soren Storage Cabinet', 'Linea Sideboard', 'Dusk Credenza'],
    prices: [1099, 995, 1149, 1050, 1195],
  },
  {
    type: 'Bed',
    image: 'bed',
    material: 'oatmeal linen upholstery and a solid timber support frame',
    detail: 'A softly padded headboard and quiet neutral palette turn the bedroom into a restful retreat.',
    names: ['Cloud Linen Bed', 'Oakline Platform Bed', 'Haven Upholstered Bed', 'Morrow Queen Bed', 'Calm Frame Bed'],
    prices: [1399, 1249, 1495, 1350, 1299],
  },
  {
    type: 'Desk',
    image: 'desk',
    material: 'warm oak with smooth full-extension drawer hardware',
    detail: 'The compact footprint, generous work surface, and discreet storage suit focused home offices.',
    names: ['Studio Oak Desk', 'Arc Writing Desk', 'Nook Work Table', 'Rowan Drawer Desk', 'Form Compact Desk'],
    prices: [749, 695, 625, 795, 679],
  },
  {
    type: 'Dining Chair',
    image: 'dining-chair',
    material: 'black-stained ash and hand-woven natural cane',
    detail: 'A sculpted back and breathable woven seat balance everyday comfort with graphic contrast.',
    names: ['Noir Cane Dining Chair', 'Weave Ash Chair', 'Runa Dining Chair', 'Frame Cane Seat', 'Silhouette Chair'],
    prices: [289, 265, 310, 279, 299],
  },
  {
    type: 'Bookshelf',
    image: 'bookshelf',
    material: 'pale oak veneer with a sturdy modular frame',
    detail: 'Open shelves create a light architectural display for books, ceramics, and collected objects.',
    names: ['Axis Modular Bookshelf', 'Grid Open Shelf', 'Atelier Bookcase', 'Rise Display Shelf', 'Frame Tall Shelf'],
    prices: [899, 825, 945, 875, 915],
  },
];

const headers = [
  'Handle', 'Title', 'Body (HTML)', 'Vendor', 'Product Category', 'Type', 'Tags', 'Published',
  'Option1 Name', 'Option1 Value', 'Variant SKU', 'Variant Grams', 'Variant Inventory Tracker',
  'Variant Inventory Qty', 'Variant Inventory Policy', 'Variant Fulfillment Service', 'Variant Price',
  'Variant Compare At Price', 'Variant Requires Shipping', 'Variant Taxable', 'Image Src',
  'Image Position', 'Image Alt Text', 'Gift Card', 'SEO Title', 'SEO Description', 'Status',
];

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const csvCell = (value) => {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const rows = [];
let productNumber = 1;

for (const group of groups) {
  for (let index = 0; index < group.names.length; index += 1) {
    const title = group.names[index];
    const handle = `longcat-demo-${slugify(title)}`;
    const description = `<p>${group.detail}</p><p>Crafted from ${group.material}, this showroom-ready piece is designed for a warm, contemporary home.</p><ul><li>Modern, space-conscious proportions</li><li>Easy-care finish for everyday use</li><li>Part of the Longcat Atelier demo collection</li></ul>`;
    const sku = `LC-FUR-${String(productNumber).padStart(3, '0')}`;
    const price = group.prices[index].toFixed(2);
    const compareAt = (group.prices[index] * 1.18).toFixed(2);
    const imageUrl = `${baseImageUrl}/longcat-demo-furniture-${group.image}.png`;
    const tags = `demo, furniture, ${group.type.toLowerCase()}, longcat-demo, modern-home`;
    const seoDescription = `${title} by Longcat Atelier. Modern ${group.type.toLowerCase()} crafted for calm, considered interiors.`;

    rows.push([
      handle, title, description, 'Longcat Atelier', '', group.type, tags, 'TRUE',
      'Title', 'Default Title', sku, '0', 'shopify', '25', 'deny', 'manual', price,
      compareAt, 'TRUE', 'TRUE', imageUrl, '1', `${title} in a warm modern interior`, 'FALSE',
      `${title} | Longcat Atelier`, seoDescription, 'active',
    ]);
    productNumber += 1;
  }
}

const csv = [headers, ...rows].map((row) => row.map(csvCell).join(',')).join('\r\n') + '\r\n';
const outputPath = join(dirname(fileURLToPath(import.meta.url)), 'longcat-furniture-products-50.csv');
writeFileSync(outputPath, csv, 'utf8');
console.log(`Created ${rows.length} products at ${outputPath}`);
