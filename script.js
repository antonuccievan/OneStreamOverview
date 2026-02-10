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
  if (themeToggle) {
    themeToggle.checked = true;
  }
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
    title: 'Workflow & Process Control',
    subtitle: 'Structured close and planning cycles with clear accountability.',
    bullets: [
      'Workflow profiles organize steps by process, owner, and frequency.',
      'Status states (Not Started, In Process, Completed) drive visibility.',
      'Certification and sign-off create strong governance for period close.'
    ],
    pill: 'Operations'
  },
  {
    title: 'Data Integration & Quality',
    subtitle: 'Reliable data movement from source systems into governed finance models.',
    bullets: [
      'Data Management orchestrates imports, transforms, and validations.',
      'Mapping and transformation rules standardize source-system variance.',
      'Drill-back and audit trails support reconciliation and trust.'
    ],
    pill: 'Data'
  },
  {
    title: 'Reporting, Dashboards, and Analysis',
    subtitle: 'Actionable insights for executives, finance teams, and operations.',
    bullets: [
      'Reports, Cube Views, and dashboards deliver role-specific insights.',
      'Narrative-ready outputs help move from numbers to decisions quickly.',
      'Variance, trend, and driver analysis can be standardized across entities.'
    ],
    pill: 'Insights'
  },
  {
    title: 'Extensibility & Marketplace',
    subtitle: 'Expand capabilities without redesigning the core finance model.',
    bullets: [
      'Business Rules provide custom logic for calculations and process automation.',
      'Solution Exchange and Marketplace accelerators reduce implementation time.',
      'Platform extensibility supports evolving requirements over time.'
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

    const activePanel = document.getElementById(tab.dataset.tab);
    if (activePanel) {
      activePanel.classList.add('active');
    }
  });
});

document.getElementById('apply-prompt').addEventListener('click', applyPrompt);
document.getElementById('generate-presentation').addEventListener('click', generatePresentation);
document.getElementById('shuffle-visuals').addEventListener('click', shuffleVisuals);

if (themeToggle) {
  themeToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  });
}

renderSlides();
logActivity('Presentation template loaded. Start with a prompt to customize.');
