const tabs = document.querySelectorAll('.tab-button');
const panels = document.querySelectorAll('.tab-panel');
const slidesContainer = document.getElementById('slides');
const promptInput = document.getElementById('prompt-input');
const activityLog = document.getElementById('activity-log');
const slideCount = document.getElementById('slide-count');
const lastUpdate = document.getElementById('last-update');
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle.checked = true;
}

const slideData = [
  {
    title: 'OneStream Overview',
    subtitle: 'Unified financial performance management in one metadata-driven platform.',
    bullets: [
      'Combines data loading, consolidation, planning, reporting, and analytics.',
      'Guided workflows with auditability and extensibility.',
      'Strong governance with performance at scale.'
    ],
    pill: 'Intro slide'
  },
  {
    title: 'Core Architectural Concepts',
    subtitle: 'A multi-dimensional model with automated aggregation.',
    bullets: [
      '19-part address: 18 core dimensions plus Cube.',
      'Dimensions define how data is sliced (Entity, Account, Time, Scenario).',
      'Only base-level members accept input; rollups occur via rules.'
    ],
    pill: 'Modeling'
  },
  {
    title: 'Point of View (POV)',
    subtitle: 'Controls what data is viewed or processed.',
    bullets: [
      'Cube POV is the most used for data access.',
      'Workflow, Global, and Cube View POVs also exist.',
      'Incorrect POV settings often explain missing data.'
    ],
    pill: 'Navigation'
  },
  {
    title: 'Cubes',
    subtitle: 'Logical containers for dimensions, data, and rules.',
    bullets: [
      'Applications can contain multiple cubes.',
      'Cubes can be linked to automate data flow.',
      'Example: Actuals feeding Planning.'
    ],
    pill: 'Architecture'
  },
  {
    title: 'Key Dimensions: Entity & Consolidation',
    subtitle: 'Drives currency translation and ownership rollups.',
    bullets: [
      'Entities consolidate through hierarchies with varying parents/currencies.',
      'Consolidation stages: Local, Translated, Ownership, Eliminations, Post-Adjustments.',
      'Alternative Analysis hierarchy enables faster planning without eliminations.'
    ],
    pill: 'Governance'
  },
  {
    title: 'Scenario, Time, View',
    subtitle: 'Controls data types and time intelligence.',
    bullets: [
      'Scenario separates Actuals, Budget, Forecast with no aggregation.',
      'Time supports fiscal, calendar, and weekly models.',
      'View adds YTD/QTD/MTD logic and annotations.'
    ],
    pill: 'Planning'
  },
  {
    title: 'Account, Flow, Origin, ICP',
    subtitle: 'Defines the chart of accounts and movement tracking.',
    bullets: [
      'Account types drive aggregation behavior.',
      'Flow captures rollforwards, FX, and cash flow logic.',
      'Origin and ICP ensure auditability and intercompany eliminations.'
    ],
    pill: 'Data lineage'
  },
  {
    title: 'User-Defined Dimensions & Extensibility',
    subtitle: 'Customize the platform without redesigning the model.',
    bullets: [
      'UD1-UD8 support client-specific views, reporting, and tracking.',
      'Constraints limit valid combinations to protect performance.',
      'Extensible Dimensionality allows detail where needed.'
    ],
    pill: 'Extensibility'
  }
];

const visualPalettes = [
  'linear-gradient(120deg, #3451ff, #8ac6ff)',
  'linear-gradient(120deg, #7f56d9, #c7a4ff)',
  'linear-gradient(120deg, #12b76a, #6fe2b0)',
  'linear-gradient(120deg, #f79009, #ffcf8f)'
];

function renderSlides() {
  slidesContainer.innerHTML = '';
  slideData.forEach((slide, index) => {
    const slideEl = document.createElement('article');
    slideEl.className = 'slide';

    const visual = document.createElement('div');
    visual.className = 'visual';
    visual.style.background = visualPalettes[index % visualPalettes.length];

    const header = document.createElement('div');
    header.className = 'slide-header';
    header.innerHTML = `
      <span class="data-pill">${slide.pill}</span>
      <h3>${slide.title}</h3>
      <p>${slide.subtitle}</p>
    `;

    const body = document.createElement('div');
    body.className = 'slide-body';

    const list = document.createElement('ul');
    slide.bullets.forEach((bullet) => {
      const item = document.createElement('li');
      item.textContent = bullet;
      list.appendChild(item);
    });

    body.appendChild(list);
    slideEl.appendChild(visual);
    slideEl.appendChild(header);
    slideEl.appendChild(body);
    slidesContainer.appendChild(slideEl);
  });

  slideCount.textContent = slideData.length;
  lastUpdate.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function logActivity(text) {
  const entry = document.createElement('li');
  entry.textContent = text;
  activityLog.prepend(entry);
}

function applyPrompt() {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    logActivity('No prompt entered. Add details to update the presentation.');
    return;
  }

  if (prompt.toLowerCase().startsWith('add slide')) {
    const summary = prompt.replace(/add slide:?/i, '').trim() || 'New slide from prompt.';
    slideData.push({
      title: 'Prompt-driven update',
      subtitle: summary,
      bullets: [
        'This slide was generated from your prompt.',
        'Refine it further with another prompt for more detail.',
        'Use “Add slide:” to keep building the story.'
      ],
      pill: 'Prompt'
    });
  } else {
    slideData[0].subtitle = prompt;
    slideData[0].bullets = [
      'Updated based on your latest prompt.',
      'Use another prompt to extend or refine the narrative.',
      'Switch to the Presentation tab to review.'
    ];
  }

  logActivity(`Applied prompt: ${prompt}`);
  promptInput.value = '';
  renderSlides();
}

function generatePresentation() {
  logActivity('Slides regenerated with the latest prompt guidance.');
  renderSlides();
}

function shuffleVisuals() {
  slideData.sort(() => Math.random() - 0.5);
  renderSlides();
  logActivity('Refreshed visuals and slide order.');
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((btn) => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

document.getElementById('apply-prompt').addEventListener('click', applyPrompt);
document.getElementById('generate-presentation').addEventListener('click', generatePresentation);
document.getElementById('shuffle-visuals').addEventListener('click', shuffleVisuals);

themeToggle.addEventListener('change', (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  }
});

renderSlides();
logActivity('Presentation template loaded. Start with a prompt to customize.');

function initTestViewer() {
  const pageListEl = document.getElementById('pageList');
  const pdfEmbed = document.getElementById('pdfEmbed');
  const pageInput = document.getElementById('pageInput');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const searchBox = document.getElementById('searchBox');
  const clearSearch = document.getElementById('clearSearch');
  const downloadBtn = document.getElementById('downloadPdf');
  const pageCount = document.getElementById('pageCount');

  if (!pageListEl || !pdfEmbed || !pageInput) {
    return;
  }

  const pdfPath = 'OneStream Overview - Introduction to Key Concepts.pdf';
  const pdfUrl = encodeURI(pdfPath);
  pdfEmbed.src = `${pdfUrl}#page=1`;

  const pages = [
    `Page 1 — OneStream Overview
Introduction to Key OneStream Concepts
(Riveron title slide)
`,
    `Page 2 — Benefits of OneStream
• Guided Workflows
• Loading, consolidating and reviewing data
• Structured and secured as appropriate
• A flow of work (do this, then do this, etc.)
• Financial data management and quality
• Customers can load their own data and see results immediately
• Data File Loads, Direct input through Forms
• All traced for audit purposes
• Centralized management of data loads and related processes
• Ease of reporting and analytics
`,
    `Page 3 — OneStream: Engineered to Work Together
One Product | One Platform | Multiple Solutions
(Graphic shows Guided Workflow, Analytic Platform, Financial Consolidation, Data Quality, GL/ERP)
`,
    `Page 4 — Dimensions and the POV (title slide)`,
    `Page 5 — Dimensions and the POV
• Multi-Dimensional
• Metadata defines reporting structure; composed of dimensions
• Dimensions are ways to define and slice data: Entity, Account, Cost Center
• There are 18 dimensions in OneStream (plus cube)
• Each amount defined by its 19-member "address"
`,
    `Page 6 — Dimensions and the POV
• Members arranged in hierarchies
• Members can appear multiple times in different hierarchies through Relationships
• Parent, child, descendant, base-level members (where data is loaded)
• OneStream aggregates and consolidates using these relationships
`,
    `Page 7 — POV is everything
• Can't find data? Check POV
• Numbers off? Check POV
• Report not showing expected data? Check POV
• Cube POV, Workflow POV, Global, Cube View
`,
    `Page 8 — Cube
• A cube organizes dimensions, rules, and data
• Multiple cubes can be built; cubes can be linked
`,
    `Page 9 — Entity
• Represents legal entity or business unit
• Currency translation and consolidation governed by Entity
• Data consolidates up Entity hierarchy
• Each Entity assigned a default currency
`,
    `Page 10 — Parent
• Parent entity of selected Entity
• In multiple hierarchies, Entity can exist multiple times with different parents (different currency, ownership)
`,
    `Page 11 — Consolidation
• Consolidation dimension tracks aggregation during consolidation
`,
    `Page 12 — Consolidation — Top Hierarchy
• Local: pulls functional currency assigned to Entity
• Translated: Local translated to parent currency
• OwnerPreAdj, Share (apply ownership), Elimination, OwnerPostAdj, Top = Share + Eliminations + OwnerPostAdj
`,
    `Page 13 — Consolidation sequence (reference to OneStream Design and Reference Guide; Help button)`,
    `Page 14 — Consolidation — Currency Hierarchy
• Currencies enabled per reporting requirements
• Each Entity assigned default currency; translated to parent automatically
• System members Local and Translated are dynamic
`,
    `Page 15 — Consolidation — Analysis Hierarchy
• Aggregated member for planning/forecasting (no eliminations; simplified aggregation)
• Accelerates performance
`,
    `Page 16 — Scenario (Actuals, Budget, Forecast, etc.)`,
    `Page 17 — Scenario details
• Scenarios do not aggregate; designed per requirements
• Scenario Types used to group scenarios to vary rules
`,
    `Page 18 — Time (calendar for the cube)
• Standard calendar: 12 months, 4 quarters, 2 half years, 1 total year
• Examples: 2021M1, 2021Q1; options for fiscal/calendar; weekly apps
`,
    `Page 19 — View
• Built-in calendar intelligence for Flow-type accounts (MTD, QTD, YTD)
• Members for annotations, calc status and predefined math (TrailingXMonths Sum/Average)
`,
    `Page 20 — Account
• Accounts dimension is the Chart of Accounts
• Accounts assigned types (revenue, expense, asset, liability) impacting aggregation
• Data loaded at base Accounts and aggregated to parents
`,
    `Page 21 — Flow
• Visibility into account movements (roll forwards)
• FX by Account, Cash Flow reporting, Historical Rate overrides
`,
    `Page 22 — Flow details
• Many calculated members; some dynamic; simple for P&L, extensive for Balance Sheet
`,
    `Page 23 — Origin
• Tracks input source/origination of data — critical to Workflow
`,
    `Page 24 — Origin members
• Import: Data loaded via file through Workflow
• Forms: Data loaded via Forms or Excel templates
• AdjInput, AdjConsolidated, Elimination
• BeforeAdj: unique parent member where users input desired end amount (Import + Forms = BeforeAdj)
`,
    `Page 25 — ICP (Intercompany Partner)
• Indicates partner Entity for a transaction; composed of Entity members flagged IsIC
• Integral to intercompany automation/eliminations
`,
    `Page 26 — UD1-UD8 (User Defined Dimensions)
• Eight UDs (UD1–UD8)
• Riveron typical usage notes: UD6 reporting, UD7 tracking, UD8 dynamic calcs, others open for client needs
• UDs can be constrained to account groups
`,
    `Page 27 — Extensibility (title slide)`,
    `Page 28 — Extensibility notes
• Metadata can have different levels of detail in different circumstances (Extensible Dimensionality)
• Description from OneStream Design & Reference Guide
`,
    `Page 29 — Extensibility example diagram (corporate vs actual vs budget level differences)`,
    `Page 30 — Closing / Contact
© 2025 Riveron Consulting, LLC. All rights reserved. Riveron is not a CPA firm.
Contact / Visit our website / For more info
`
  ];

  pageInput.max = String(pages.length);
  if (pageCount) {
    pageCount.textContent = `${pages.length} pages`;
  }

  function setActive(pageNum) {
    document.querySelectorAll('.page-item').forEach((el) => {
      const isActive = Number(el.dataset.page) === pageNum;
      el.classList.toggle('active', isActive);
      const textEl = el.querySelector('.text');
      if (textEl) {
        textEl.style.display = isActive ? 'block' : 'none';
      }
    });
    pageInput.value = String(pageNum);
  }

  function goToPage(pageNum) {
    pdfEmbed.src = `${pdfUrl}#page=${pageNum}`;
    pageInput.value = String(pageNum);
    const selected = document.querySelector(`.page-item[data-page="${pageNum}"]`);
    if (selected) {
      selected.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function buildPageItem(index, text) {
    const pageNum = index + 1;
    const item = document.createElement('div');
    item.className = 'page-item';
    item.dataset.page = String(pageNum);

    const title = document.createElement('strong');
    title.textContent = `Slide ${pageNum}`;

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.textContent = text.split('\n')[0].trim();

    const openLink = document.createElement('a');
    openLink.href = `${pdfUrl}#page=${pageNum}`;
    openLink.target = '_blank';
    openLink.rel = 'noreferrer';
    openLink.textContent = 'Open';
    openLink.className = 'link';
    meta.appendChild(openLink);

    const body = document.createElement('div');
    body.className = 'text';
    body.textContent = text.trim();

    item.append(title, meta, body);
    item.addEventListener('click', () => {
      setActive(pageNum);
      goToPage(pageNum);
    });

    return item;
  }

  pages.forEach((pageText, index) => {
    pageListEl.appendChild(buildPageItem(index, pageText));
  });

  prevBtn?.addEventListener('click', () => {
    const current = Number(pageInput.value) || 1;
    if (current > 1) {
      setActive(current - 1);
      goToPage(current - 1);
    }
  });

  nextBtn?.addEventListener('click', () => {
    const current = Number(pageInput.value) || 1;
    if (current < pages.length) {
      setActive(current + 1);
      goToPage(current + 1);
    }
  });

  pageInput.addEventListener('change', (event) => {
    let value = Number(event.target.value) || 1;
    value = Math.max(1, Math.min(pages.length, value));
    setActive(value);
    goToPage(value);
  });

  function performSearch(term) {
    const normalized = (term || '').trim().toLowerCase();
    const items = Array.from(document.querySelectorAll('.page-item'));
    items.forEach((item) => {
      const index = Number(item.dataset.page) - 1;
      const pageText = pages[index];
      const matches = !normalized || pageText.toLowerCase().includes(normalized);
      item.style.display = matches ? '' : 'none';
      if (matches) {
        const meta = item.querySelector('.meta');
        if (!meta) {
          return;
        }
        meta.innerHTML = '';
        let snippet = pageText.split('\n')[0].trim();
        if (normalized) {
          const matchIndex = pageText.toLowerCase().indexOf(normalized);
          if (matchIndex >= 0) {
            snippet = pageText
              .substring(Math.max(0, matchIndex - 40), Math.min(pageText.length, matchIndex + 120))
              .replace(/\n/g, ' ');
          }
        }
        meta.appendChild(document.createTextNode(snippet));

        const openLink = document.createElement('a');
        openLink.href = `${pdfUrl}#page=${index + 1}`;
        openLink.target = '_blank';
        openLink.rel = 'noreferrer';
        openLink.textContent = 'Open';
        openLink.className = 'link';
        meta.appendChild(openLink);
      }
    });
  }

  searchBox?.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      performSearch(searchBox.value);
    }
  });

  clearSearch?.addEventListener('click', () => {
    if (!searchBox) {
      return;
    }
    searchBox.value = '';
    performSearch('');
  });

  downloadBtn?.addEventListener('click', () => {
    window.open(pdfUrl, '_blank', 'noopener');
  });

  setActive(1);
}

initTestViewer();
