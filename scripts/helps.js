const TRANSLATION_NOTES_VERSION = 'v86.1';
const TRANSLATION_NOTES_BASE = `https://cdn.door43.org/u/unfoldingWord/en_tn/${TRANSLATION_NOTES_VERSION}/pdf`;

const BOOK_GROUPS = [
  {
    label: 'Pentateuch',
    books: [
      ['Genesis', 'gen', '01-GEN'],
      ['Exodus', 'exo', '02-EXO'],
      ['Leviticus', 'lev', '03-LEV'],
      ['Numbers', 'num', '04-NUM'],
      ['Deuteronomy', 'deu', '05-DEU']
    ]
  },
  {
    label: 'Historical Books',
    books: [
      ['Joshua', 'jos', '06-JOS'],
      ['Judges', 'jdg', '07-JDG'],
      ['Ruth', 'rut', '08-RUT'],
      ['1 Samuel', '1sa', '09-1SA'],
      ['2 Samuel', '2sa', '10-2SA'],
      ['1 Kings', '1ki', '11-1KI'],
      ['2 Kings', '2ki', '12-2KI'],
      ['1 Chronicles', '1ch', '13-1CH'],
      ['2 Chronicles', '2ch', '14-2CH'],
      ['Ezra', 'ezr', '15-EZR'],
      ['Nehemiah', 'neh', '16-NEH'],
      ['Esther', 'est', '17-EST']
    ]
  },
  {
    label: 'Wisdom Literature',
    books: [
      ['Job', 'job', '18-JOB'],
      ['Psalms', 'psa', '19-PSA'],
      ['Proverbs', 'pro', '20-PRO'],
      ['Ecclesiastes', 'ecc', '21-ECC'],
      ['Song of Songs', 'sng', '22-SNG']
    ]
  },
  {
    label: 'Major Prophets',
    books: [
      ['Isaiah', 'isa', '23-ISA'],
      ['Jeremiah', 'jer', '24-JER'],
      ['Lamentations', 'lam', '25-LAM'],
      ['Ezekiel', 'ezk', '26-EZK'],
      ['Daniel', 'dan', '27-DAN']
    ]
  },
  {
    label: 'Minor Prophets',
    books: [
      ['Hosea', 'hos', '28-HOS'],
      ['Joel', 'jol', '29-JOL'],
      ['Amos', 'amo', '30-AMO'],
      ['Obadiah', 'oba', '31-OBA'],
      ['Jonah', 'jon', '32-JON'],
      ['Micah', 'mic', '33-MIC'],
      ['Nahum', 'nam', '34-NAM'],
      ['Habakkuk', 'hab', '35-HAB'],
      ['Zephaniah', 'zep', '36-ZEP'],
      ['Haggai', 'hag', '37-HAG'],
      ['Zechariah', 'zec', '38-ZEC'],
      ['Malachi', 'mal', '39-MAL']
    ]
  },
  {
    label: 'Gospels & Acts',
    books: [
      ['Matthew', 'mat', '40-MAT'],
      ['Mark', 'mrk', '41-MRK'],
      ['Luke', 'luk', '42-LUK'],
      ['John', 'jhn', '43-JHN'],
      ['Acts', 'act', '44-ACT']
    ]
  },
  {
    label: 'Pauline Epistles',
    books: [
      ['Romans', 'rom', '45-ROM'],
      ['1 Corinthians', '1co', '46-1CO'],
      ['2 Corinthians', '2co', '47-2CO'],
      ['Galatians', 'gal', '48-GAL'],
      ['Ephesians', 'eph', '49-EPH'],
      ['Philippians', 'php', '50-PHP'],
      ['Colossians', 'col', '51-COL'],
      ['1 Thessalonians', '1th', '52-1TH'],
      ['2 Thessalonians', '2th', '53-2TH'],
      ['1 Timothy', '1ti', '54-1TI'],
      ['2 Timothy', '2ti', '55-2TI'],
      ['Titus', 'tit', '56-TIT'],
      ['Philemon', 'phm', '57-PHM']
    ]
  },
  {
    label: 'General Epistles & Revelation',
    books: [
      ['Hebrews', 'heb', '58-HEB'],
      ['James', 'jas', '59-JAS'],
      ['1 Peter', '1pe', '60-1PE'],
      ['2 Peter', '2pe', '61-2PE'],
      ['1 John', '1jn', '62-1JN'],
      ['2 John', '2jn', '63-2JN'],
      ['3 John', '3jn', '64-3JN'],
      ['Jude', 'jud', '65-JUD'],
      ['Revelation', 'rev', '66-REV']
    ]
  }
];

function populateBookSelect(select) {
  BOOK_GROUPS.forEach((group) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;
    group.books.forEach(([label, code, pdfId]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = label;
      option.dataset.label = label;
      option.dataset.pdfId = pdfId;
      optgroup.append(option);
    });
    select.append(optgroup);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('book-select');
  const message = document.getElementById('download-message');

  if (!select) return;

  populateBookSelect(select);

  select.addEventListener('change', (event) => {
    const { selectedOptions } = event.target;
    if (!selectedOptions || !selectedOptions.length) {
      return;
    }

    const selectedOption = selectedOptions && selectedOptions[0];

    const selectedLabel = selectedOption
      ? selectedOption.dataset.label || selectedOption.textContent
      : 'the selected book';

    const pdfId = selectedOption ? selectedOption.dataset.pdfId : null;

    if (!pdfId) {
      if (message) {
        message.textContent = 'Sorry, we could not find that download.';
      }
      return;
    }

    if (message) {
      message.textContent = `Preparing translation notes for ${selectedLabel}…`;
    }

    const filename = `en_tn_${pdfId}_${TRANSLATION_NOTES_VERSION}.pdf`;
    const downloadUrl = `${TRANSLATION_NOTES_BASE}/${filename}`;

    const triggerDownload = () => {
      if (message) {
        const safeLink = `<a href="${downloadUrl}" class="inline-link">click here</a>`;
        message.innerHTML = `If the PDF doesn't open automatically, ${safeLink}.`;
      }
      window.location.href = downloadUrl;
    };

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      triggerDownload();
      return;
    }

    setTimeout(triggerDownload, 600);
  });
});
