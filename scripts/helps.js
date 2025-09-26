const TRANSLATION_NOTES_BASE = 'https://preview.door43.org/u/unfoldingWord/en_tn/v86.1';

const BOOK_GROUPS = [
  {
    label: 'Pentateuch',
    books: [
      ['Genesis', 'gen'],
      ['Exodus', 'exo'],
      ['Leviticus', 'lev'],
      ['Numbers', 'num'],
      ['Deuteronomy', 'deu']
    ]
  },
  {
    label: 'Historical Books',
    books: [
      ['Joshua', 'jos'],
      ['Judges', 'jdg'],
      ['Ruth', 'rut'],
      ['1 Samuel', '1sa'],
      ['2 Samuel', '2sa'],
      ['1 Kings', '1ki'],
      ['2 Kings', '2ki'],
      ['1 Chronicles', '1ch'],
      ['2 Chronicles', '2ch'],
      ['Ezra', 'ezr'],
      ['Nehemiah', 'neh'],
      ['Esther', 'est']
    ]
  },
  {
    label: 'Wisdom Literature',
    books: [
      ['Job', 'job'],
      ['Psalms', 'psa'],
      ['Proverbs', 'pro'],
      ['Ecclesiastes', 'ecc'],
      ['Song of Songs', 'sng']
    ]
  },
  {
    label: 'Major Prophets',
    books: [
      ['Isaiah', 'isa'],
      ['Jeremiah', 'jer'],
      ['Lamentations', 'lam'],
      ['Ezekiel', 'ezk'],
      ['Daniel', 'dan']
    ]
  },
  {
    label: 'Minor Prophets',
    books: [
      ['Hosea', 'hos'],
      ['Joel', 'jol'],
      ['Amos', 'amo'],
      ['Obadiah', 'oba'],
      ['Jonah', 'jon'],
      ['Micah', 'mic'],
      ['Nahum', 'nam'],
      ['Habakkuk', 'hab'],
      ['Zephaniah', 'zep'],
      ['Haggai', 'hag'],
      ['Zechariah', 'zec'],
      ['Malachi', 'mal']
    ]
  },
  {
    label: 'Gospels & Acts',
    books: [
      ['Matthew', 'mat'],
      ['Mark', 'mrk'],
      ['Luke', 'luk'],
      ['John', 'jhn'],
      ['Acts', 'act']
    ]
  },
  {
    label: 'Pauline Epistles',
    books: [
      ['Romans', 'rom'],
      ['1 Corinthians', '1co'],
      ['2 Corinthians', '2co'],
      ['Galatians', 'gal'],
      ['Ephesians', 'eph'],
      ['Philippians', 'php'],
      ['Colossians', 'col'],
      ['1 Thessalonians', '1th'],
      ['2 Thessalonians', '2th'],
      ['1 Timothy', '1ti'],
      ['2 Timothy', '2ti'],
      ['Titus', 'tit'],
      ['Philemon', 'phm']
    ]
  },
  {
    label: 'General Epistles & Revelation',
    books: [
      ['Hebrews', 'heb'],
      ['James', 'jas'],
      ['1 Peter', '1pe'],
      ['2 Peter', '2pe'],
      ['1 John', '1jn'],
      ['2 John', '2jn'],
      ['3 John', '3jn'],
      ['Jude', 'jud'],
      ['Revelation', 'rev']
    ]
  }
];

function populateBookSelect(select) {
  BOOK_GROUPS.forEach((group) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;
    group.books.forEach(([label, code]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = label;
      option.dataset.label = label;
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
    const { value, selectedOptions } = event.target;
    if (!value) {
      return;
    }

    const selectedLabel = selectedOptions && selectedOptions[0]
      ? selectedOptions[0].dataset.label || selectedOptions[0].textContent
      : 'the selected book';

    if (message) {
      message.textContent = `Preparing translation notes for ${selectedLabel}…`;
    }

    const downloadUrl = `${TRANSLATION_NOTES_BASE}?book=${encodeURIComponent(value)}`;

    setTimeout(() => {
      window.location.href = downloadUrl;
    }, 600);
  });
});
