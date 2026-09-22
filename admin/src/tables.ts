export type FieldKind = 'text' | 'longtext' | 'number' | 'json' | 'readonly';

export interface FieldSpec {
  column: string;
  label: string;
  kind: FieldKind;
  hint?: string;
}

export interface TableSpec {
  /** Postgres table name; must be on `admin_write`'s allowlist. */
  name: string;
  label: string;
  icon: string;
  /** Column the list is sorted by. */
  orderBy: string;
  /** Column shown as each row's headline in the list. */
  titleColumn: string;
  /** Column shown under the headline. */
  subtitleColumn?: string;
  /** Known fields, in edit-form order. Columns present in the data but missing
   * here are still rendered (as JSON) so a schema change can't hide data. */
  fields: FieldSpec[];
}

const ID: FieldSpec = { column: 'id', label: 'ID', kind: 'text', hint: 'kebab-case, unique, cannot be changed after creation' };

export const TABLES: TableSpec[] = [
  {
    name: 'alpha_spotlights',
    label: 'Alpha Spotlight',
    icon: '✨',
    orderBy: 'created_at',
    titleColumn: 'title',
    subtitleColumn: 'category',
    fields: [
      { column: 'title', label: 'Title', kind: 'text' },
      { column: 'description', label: 'Description', kind: 'longtext', hint: 'One or two short lines — the card shows two lines' },
      { column: 'image_url', label: 'Image URL', kind: 'text', hint: 'Direct link to the ad image (wide, roughly 2:1)' },
      { column: 'link', label: 'Destination link', kind: 'text', hint: 'Opens in the phone’s browser when the image is tapped' },
      { column: 'category', label: 'Category', kind: 'text', hint: 'e.g. Coin, dApp, Event, Airdrop' },
      { column: 'duration_hours', label: 'Duration (hours)', kind: 'number', hint: 'Counted from the moment you save; the card disappears on its own when it runs out' },
      { column: 'expires_at', label: 'Expires at', kind: 'readonly', hint: 'Computed by the database from the duration' },
      { column: 'created_at', label: 'Created at', kind: 'readonly' },
    ],
  },
  {
    name: 'modules',
    label: 'Modules',
    icon: '📚',
    orderBy: 'sort_order',
    titleColumn: 'title',
    subtitleColumn: 'description',
    fields: [
      ID,
      { column: 'sort_order', label: 'Order', kind: 'number' },
      { column: 'title', label: 'Title', kind: 'text' },
      { column: 'description', label: 'Description', kind: 'longtext' },
      { column: 'icon', label: 'Icon', kind: 'text', hint: 'A single emoji' },
      { column: 'color', label: 'Accent colour', kind: 'text', hint: 'Hex, e.g. #6C3BD9' },
      { column: 'estimated_minutes', label: 'Estimated minutes', kind: 'number' },
    ],
  },
  {
    name: 'lessons',
    label: 'Lessons',
    icon: '📖',
    orderBy: 'sort_order',
    titleColumn: 'title',
    subtitleColumn: 'summary',
    fields: [
      ID,
      { column: 'module_id', label: 'Module ID', kind: 'text', hint: 'Must match an existing module’s ID' },
      { column: 'sort_order', label: 'Order in module', kind: 'number' },
      { column: 'title', label: 'Title', kind: 'text' },
      { column: 'icon', label: 'Icon', kind: 'text', hint: 'A single emoji' },
      { column: 'summary', label: 'Summary', kind: 'longtext' },
      { column: 'content', label: 'Body paragraphs', kind: 'json', hint: 'Array of strings — one entry per paragraph' },
      { column: 'key_takeaway', label: 'Key takeaway', kind: 'longtext' },
      {
        column: 'check_question',
        label: 'Quick check',
        kind: 'json',
        hint: '{ "prompt": "...", "options": ["a","b"], "correctIndex": 0 }',
      },
    ],
  },
  {
    name: 'glossary_terms',
    label: 'Glossary',
    icon: '🗂️',
    orderBy: 'term',
    titleColumn: 'term',
    subtitleColumn: 'category',
    fields: [
      ID,
      { column: 'term', label: 'Term', kind: 'text' },
      { column: 'letter', label: 'Letter', kind: 'text', hint: 'Single uppercase letter it files under' },
      { column: 'pronunciation', label: 'Pronunciation', kind: 'text', hint: 'Optional' },
      { column: 'definition', label: 'Definition', kind: 'longtext' },
      { column: 'example', label: 'Example', kind: 'longtext' },
      { column: 'category', label: 'Category', kind: 'text', hint: 'Must match one of the app’s categories exactly' },
      { column: 'difficulty', label: 'Difficulty', kind: 'text', hint: 'beginner | intermediate | advanced' },
      { column: 'related_ids', label: 'Related term IDs', kind: 'json', hint: 'Array of glossary term IDs' },
    ],
  },
  {
    name: 'blockchains',
    label: 'Chains',
    icon: '⛓️',
    orderBy: 'sort_order',
    titleColumn: 'name',
    subtitleColumn: 'tagline',
    fields: [
      ID,
      { column: 'sort_order', label: 'Order', kind: 'number' },
      { column: 'name', label: 'Name', kind: 'text' },
      { column: 'logo', label: 'Logo', kind: 'text', hint: 'A single emoji' },
      { column: 'tagline', label: 'Tagline', kind: 'longtext' },
      { column: 'overview', label: 'Overview', kind: 'longtext' },
      { column: 'chain_type', label: 'Chain type', kind: 'text', hint: 'Layer 1 | Layer 2 | Sidechain' },
      { column: 'consensus', label: 'Consensus', kind: 'text' },
      { column: 'native_token', label: 'Native token', kind: 'text' },
      { column: 'launched', label: 'Launched', kind: 'number' },
      { column: 'strengths', label: 'Strengths', kind: 'json', hint: 'Array of short strings' },
      { column: 'use_cases', label: 'Use cases', kind: 'json', hint: 'Array of short strings' },
      {
        column: 'dapps',
        label: 'dApps',
        kind: 'json',
        hint: '[{ "name", "category", "use", "explanation", "link" }]',
      },
    ],
  },
  {
    name: 'achievements',
    label: 'Badges',
    icon: '🏅',
    orderBy: 'sort_order',
    titleColumn: 'title',
    subtitleColumn: 'description',
    fields: [
      ID,
      { column: 'sort_order', label: 'Order', kind: 'number' },
      { column: 'title', label: 'Title', kind: 'text' },
      { column: 'description', label: 'Description', kind: 'longtext' },
      { column: 'icon', label: 'Icon', kind: 'text', hint: 'A single emoji' },
      {
        column: 'criteria',
        label: 'Criteria',
        kind: 'json',
        hint: '{ "type": "lessonsCompleted", "count": 5 }',
      },
    ],
  },
  {
    name: 'module_quizzes',
    label: 'Quizzes',
    icon: '⚡',
    orderBy: 'module_id',
    titleColumn: 'title',
    subtitleColumn: 'module_id',
    fields: [
      ID,
      { column: 'module_id', label: 'Module ID', kind: 'text' },
      { column: 'title', label: 'Title', kind: 'text' },
      {
        column: 'questions',
        label: 'Questions',
        kind: 'json',
        hint: '[{ "id", "prompt", "options": [], "correctIndex": 0, "explanation" }]',
      },
    ],
  },
];
