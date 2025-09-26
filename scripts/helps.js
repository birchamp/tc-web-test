const RELEASES_API = 'https://git.door43.org/api/v1/repos/unfoldingWord/en_tn/releases';
const NETLIFY_CACHE_ENDPOINT = 'https://preview.door43.org/.netlify/functions/get-cached-url';

const BOOK_GROUPS = [
  {
    label: 'Pentateuch',
    books: [
      { label: 'Genesis', id: 'gen', legacyId: '01-GEN' },
      { label: 'Exodus', id: 'exo', legacyId: '02-EXO' },
      { label: 'Leviticus', id: 'lev', legacyId: '03-LEV' },
      { label: 'Numbers', id: 'num', legacyId: '04-NUM' },
      { label: 'Deuteronomy', id: 'deu', legacyId: '05-DEU' }
    ]
  },
  {
    label: 'Historical Books',
    books: [
      { label: 'Joshua', id: 'jos', legacyId: '06-JOS' },
      { label: 'Judges', id: 'jdg', legacyId: '07-JDG' },
      { label: 'Ruth', id: 'rut', legacyId: '08-RUT' },
      { label: '1 Samuel', id: '1sa', legacyId: '09-1SA' },
      { label: '2 Samuel', id: '2sa', legacyId: '10-2SA' },
      { label: '1 Kings', id: '1ki', legacyId: '11-1KI' },
      { label: '2 Kings', id: '2ki', legacyId: '12-2KI' },
      { label: '1 Chronicles', id: '1ch', legacyId: '13-1CH' },
      { label: '2 Chronicles', id: '2ch', legacyId: '14-2CH' },
      { label: 'Ezra', id: 'ezr', legacyId: '15-EZR' },
      { label: 'Nehemiah', id: 'neh', legacyId: '16-NEH' },
      { label: 'Esther', id: 'est', legacyId: '17-EST' }
    ]
  },
  {
    label: 'Wisdom Literature',
    books: [
      { label: 'Job', id: 'job', legacyId: '18-JOB' },
      { label: 'Psalms', id: 'psa', legacyId: '19-PSA' },
      { label: 'Proverbs', id: 'pro', legacyId: '20-PRO' },
      { label: 'Ecclesiastes', id: 'ecc', legacyId: '21-ECC' },
      { label: 'Song of Songs', id: 'sng', legacyId: '22-SNG' }
    ]
  },
  {
    label: 'Major Prophets',
    books: [
      { label: 'Isaiah', id: 'isa', legacyId: '23-ISA' },
      { label: 'Jeremiah', id: 'jer', legacyId: '24-JER' },
      { label: 'Lamentations', id: 'lam', legacyId: '25-LAM' },
      { label: 'Ezekiel', id: 'ezk', legacyId: '26-EZK' },
      { label: 'Daniel', id: 'dan', legacyId: '27-DAN' }
    ]
  },
  {
    label: 'Minor Prophets',
    books: [
      { label: 'Hosea', id: 'hos', legacyId: '28-HOS' },
      { label: 'Joel', id: 'jol', legacyId: '29-JOL' },
      { label: 'Amos', id: 'amo', legacyId: '30-AMO' },
      { label: 'Obadiah', id: 'oba', legacyId: '31-OBA' },
      { label: 'Jonah', id: 'jon', legacyId: '32-JON' },
      { label: 'Micah', id: 'mic', legacyId: '33-MIC' },
      { label: 'Nahum', id: 'nam', legacyId: '34-NAM' },
      { label: 'Habakkuk', id: 'hab', legacyId: '35-HAB' },
      { label: 'Zephaniah', id: 'zep', legacyId: '36-ZEP' },
      { label: 'Haggai', id: 'hag', legacyId: '37-HAG' },
      { label: 'Zechariah', id: 'zec', legacyId: '38-ZEC' },
      { label: 'Malachi', id: 'mal', legacyId: '39-MAL' }
    ]
  },
  {
    label: 'Gospels & Acts',
    books: [
      { label: 'Matthew', id: 'mat', legacyId: '40-MAT' },
      { label: 'Mark', id: 'mrk', legacyId: '41-MRK' },
      { label: 'Luke', id: 'luk', legacyId: '42-LUK' },
      { label: 'John', id: 'jhn', legacyId: '43-JHN' },
      { label: 'Acts', id: 'act', legacyId: '44-ACT' }
    ]
  },
  {
    label: 'Pauline Epistles',
    books: [
      { label: 'Romans', id: 'rom', legacyId: '45-ROM' },
      { label: '1 Corinthians', id: '1co', legacyId: '46-1CO' },
      { label: '2 Corinthians', id: '2co', legacyId: '47-2CO' },
      { label: 'Galatians', id: 'gal', legacyId: '48-GAL' },
      { label: 'Ephesians', id: 'eph', legacyId: '49-EPH' },
      { label: 'Philippians', id: 'php', legacyId: '50-PHP' },
      { label: 'Colossians', id: 'col', legacyId: '51-COL' },
      { label: '1 Thessalonians', id: '1th', legacyId: '52-1TH' },
      { label: '2 Thessalonians', id: '2th', legacyId: '53-2TH' },
      { label: '1 Timothy', id: '1ti', legacyId: '54-1TI' },
      { label: '2 Timothy', id: '2ti', legacyId: '55-2TI' },
      { label: 'Titus', id: 'tit', legacyId: '56-TIT' },
      { label: 'Philemon', id: 'phm', legacyId: '57-PHM' }
    ]
  },
  {
    label: 'General Epistles & Revelation',
    books: [
      { label: 'Hebrews', id: 'heb', legacyId: '58-HEB' },
      { label: 'James', id: 'jas', legacyId: '59-JAS' },
      { label: '1 Peter', id: '1pe', legacyId: '60-1PE' },
      { label: '2 Peter', id: '2pe', legacyId: '61-2PE' },
      { label: '1 John', id: '1jn', legacyId: '62-1JN' },
      { label: '2 John', id: '2jn', legacyId: '63-2JN' },
      { label: '3 John', id: '3jn', legacyId: '64-3JN' },
      { label: 'Jude', id: 'jud', legacyId: '65-JUD' },
      { label: 'Revelation', id: 'rev', legacyId: '66-REV' }
    ]
  }
];

const NOTE_COLLECTION_KEYS = ['notes', 'tn', 'items', 'entries', 'content'];
let releaseInfoPromise;
let cachedReleaseInfo;

function populateBookSelect(select) {
  BOOK_GROUPS.forEach((group) => {
    const optgroup = document.createElement('optgroup');
    optgroup.label = group.label;

    group.books.forEach((book) => {
      const option = document.createElement('option');
      option.value = book.id;
      option.textContent = book.label;
      option.dataset.label = book.label;
      option.dataset.bookId = book.id;
      if (book.legacyId) {
        option.dataset.legacyId = book.legacyId;
      }
      optgroup.append(option);
    });

    select.append(optgroup);
  });
}

function updateVersionLabels(versionLabel) {
  const targets = document.querySelectorAll('[data-version-label]');
  targets.forEach((target) => {
    target.textContent = versionLabel;
  });
}

function resolveReleaseTag(release) {
  if (!release || typeof release !== 'object') {
    return 'latest';
  }

  const tagCandidate = typeof release.tag === 'string' ? release.tag.trim() : '';
  if (tagCandidate) {
    return tagCandidate;
  }

  const nameCandidate = typeof release.name === 'string' ? release.name.trim() : '';
  if (nameCandidate) {
    return nameCandidate;
  }

  return 'latest';
}

function setStatus(message, { isError = false, asHtml = false } = {}) {
  const messageEl = document.getElementById('download-message');
  if (!messageEl) {
    return;
  }

  messageEl.classList.toggle('helps-status--error', Boolean(isError));
  if (asHtml) {
    messageEl.innerHTML = message;
  } else {
    messageEl.textContent = message;
  }
}

function sanitizeHtmlToText(value) {
  if (value == null) {
    return '';
  }

  if (typeof value !== 'string') {
    return sanitizeHtmlToText(String(value));
  }

  if (!value.includes('<')) {
    return value;
  }

  const temp = document.createElement('div');
  temp.innerHTML = value;
  return temp.textContent || temp.innerText || '';
}

function extractNoteText(note) {
  if (!note) {
    return '';
  }

  if (typeof note === 'string') {
    return sanitizeHtmlToText(note).trim();
  }

  const parts = [];
  const heading = note.title || note.label || note.heading || note.subject;
  const quote = note.quote || note.phrase || note.phraseQuoted;
  const occurrence = note.occurrence || note.Occurrence;
  const support = note.support_reference || note.supportReference;
  const primary = note.note || note.Note || note.body || note.text || note.comment || note.explanation;

  if (quote) {
    const quoteText = sanitizeHtmlToText(quote);
    const occurrenceLabel = occurrence ? ` (occurrence ${occurrence})` : '';
    parts.push(`Quote: ${quoteText}${occurrenceLabel}`);
  }

  if (heading) {
    parts.push(sanitizeHtmlToText(heading));
  }

  if (primary) {
    parts.push(sanitizeHtmlToText(primary));
  }

  if (support) {
    parts.push(`Support Reference: ${sanitizeHtmlToText(support)}`);
  }

  if (Array.isArray(note.items)) {
    note.items.forEach((item) => {
      const itemText = extractNoteText(item);
      if (itemText) {
        parts.push(itemText);
      }
    });
  }

  if (!parts.length) {
    const fallbackKeys = ['content', 'bodyHTML', 'html', 'markdown'];
    const fallback = fallbackKeys
      .map((key) => (note[key] ? sanitizeHtmlToText(note[key]) : ''))
      .find((value) => value && value.trim().length);

    if (fallback) {
      parts.push(fallback.trim());
    }
  }

  if (!parts.length) {
    try {
      parts.push(sanitizeHtmlToText(JSON.stringify(note)));
    } catch (error) {
      parts.push(String(note));
    }
  }

  return parts
    .filter((part) => Boolean(part) && part.toString().trim().length)
    .join('\n')
    .trim();
}

function gatherNotesFromContainer(container) {
  if (!container || typeof container !== 'object') {
    return [];
  }

  const results = [];

  NOTE_COLLECTION_KEYS.forEach((key) => {
    const collection = container[key];
    if (Array.isArray(collection)) {
      collection.forEach((entry) => {
        const entryText = extractNoteText(entry);
        if (entryText) {
          results.push(entryText);
        }
      });
    }
  });

  if (!results.length) {
    const direct = extractNoteText(container);
    if (direct) {
      results.push(direct);
    }
  }

  return results;
}

function normaliseLabel(value, fallback) {
  if (value === undefined || value === null) {
    return fallback;
  }

  if (typeof value === 'number') {
    return value;
  }

  const numericMatch = String(value).match(/\d+/);
  if (numericMatch) {
    return parseInt(numericMatch[0], 10);
  }

  return value;
}

function flattenNotes(data) {
  const entries = [];

  if (!data) {
    return entries;
  }

  if (Array.isArray(data.chapters)) {
    data.chapters.forEach((chapter, chapterIndex) => {
      const chapterLabel = normaliseLabel(chapter.chapter || chapter.number || chapter.id, chapterIndex + 1);

      if (Array.isArray(chapter.verses)) {
        chapter.verses.forEach((verse, verseIndex) => {
          const verseLabel = normaliseLabel(verse.verse || verse.number || verse.id, verseIndex + 1);
          const notes = gatherNotesFromContainer(verse);
          if (notes.length) {
            entries.push({ chapter: chapterLabel, verse: verseLabel, notes });
          }
        });
      }

      if (Array.isArray(chapter.frames)) {
        chapter.frames.forEach((frame, frameIndex) => {
          const verseLabel = normaliseLabel(
            frame.verse || frame.verseStart || frame.id || frame.reference?.verse,
            frameIndex + 1
          );
          const notes = gatherNotesFromContainer(frame);
          if (notes.length) {
            entries.push({ chapter: chapterLabel, verse: verseLabel, notes });
          }
        });
      }
    });
    return entries;
  }

  if (Array.isArray(data.frames)) {
    data.frames.forEach((frame, frameIndex) => {
      const chapterLabel = normaliseLabel(frame.chapter || frame.reference?.chapter, null);
      const verseLabel = normaliseLabel(frame.verse || frame.reference?.verse || frame.id, frameIndex + 1);
      const notes = gatherNotesFromContainer(frame);
      if (notes.length) {
        entries.push({ chapter: chapterLabel, verse: verseLabel, notes });
      }
    });
    return entries;
  }

  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      const notes = gatherNotesFromContainer(item);
      if (notes.length) {
        entries.push({ chapter: null, verse: index + 1, notes });
      }
    });
    return entries;
  }

  if (data && typeof data === 'object') {
    Object.keys(data).forEach((key) => {
      const bucket = data[key];
      if (!bucket) {
        return;
      }
      const notes = gatherNotesFromContainer(bucket);
      if (notes.length) {
        const [chapterPart, versePart] = key.split(':');
        entries.push({
          chapter: chapterPart ? normaliseLabel(chapterPart, null) : null,
          verse: versePart ? normaliseLabel(versePart, null) : null,
          notes
        });
      }
    });
  }

  return entries;
}

async function fetchLatestProductionRelease() {
  if (cachedReleaseInfo) {
    return cachedReleaseInfo;
  }

  if (!releaseInfoPromise) {
    releaseInfoPromise = (async () => {
      const response = await fetch(`${RELEASES_API}?limit=20`);
      if (!response.ok) {
        throw new Error(`Unable to load release list (${response.status})`);
      }

      const releases = await response.json();
      if (!Array.isArray(releases)) {
        throw new Error('Unexpected release list format.');
      }

      const release = releases.find((item) => {
        if (!item || item.draft || item.prerelease) {
          return false;
        }
        if (item.tag_name && /preprod/i.test(item.tag_name)) {
          return false;
        }
        return Boolean(item.tag_name);
      });

      if (!release) {
        throw new Error('No production release could be identified.');
      }

      const info = {
        tag: release.tag_name,
        name: release.name || release.tag_name,
        publishedAt: release.published_at || release.created_at
      };

      cachedReleaseInfo = info;
      return info;
    })().catch((error) => {
      releaseInfoPromise = null;
      throw error;
    });
  }

  return releaseInfoPromise;
}

async function resolveCachedJsonUrl(versionTag, bookId) {
  const url = `${NETLIFY_CACHE_ENDPOINT}?owner=unfoldingWord&repo=en_tn&ref=${encodeURIComponent(
    versionTag
  )}&bookId=${encodeURIComponent(bookId)}`;
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json, text/plain, */*'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to resolve cached translation notes (${response.status})`);
  }

  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const data = await response.json();
    return (
      data?.cachedUrl ||
      data?.cached_url ||
      data?.url ||
      data?.href ||
      data?.location ||
      data?.signedUrl ||
      data?.downloadUrl ||
      data?.link ||
      null
    );
  }

  const text = (await response.text()).trim();

  if (!text) {
    return null;
  }

  try {
    const parsed = JSON.parse(text);
    if (parsed) {
      return (
        parsed.cachedUrl ||
        parsed.cached_url ||
        parsed.url ||
        parsed.href ||
        parsed.location ||
        parsed.signedUrl ||
        parsed.downloadUrl ||
        parsed.link ||
        null
      );
    }
  } catch (error) {
    if (text.startsWith('http')) {
      return text;
    }
  }

  return null;
}

async function fetchTranslationNotes(versionTag, bookId) {
  const cachedUrl = await resolveCachedJsonUrl(versionTag, bookId);
  if (!cachedUrl) {
    throw new Error('No cached translation notes were found for this book.');
  }

  try {
    const response = await fetch(cachedUrl);
    if (!response.ok) {
      const error = new Error(`Unable to download translation notes data (${response.status})`);
      error.cachedUrl = cachedUrl;
      throw error;
    }

    const buffer = await response.arrayBuffer();
    if (!window.pako || typeof window.pako.ungzip !== 'function') {
      const error = new Error('Missing gzip decompression support.');
      error.cachedUrl = cachedUrl;
      throw error;
    }

    const decoded = window.pako.ungzip(new Uint8Array(buffer), { to: 'string' });

    let notesJson;
    try {
      notesJson = JSON.parse(decoded);
    } catch (parseError) {
      const error = new Error('Downloaded translation notes were not valid JSON.');
      error.cachedUrl = cachedUrl;
      throw error;
    }

    return { notesJson, cachedUrl };
  } catch (error) {
    if (!error.cachedUrl) {
      error.cachedUrl = cachedUrl;
    }
    throw error;
  }
}

function ensurePdfLibAvailable() {
  return window.PDFLib && typeof window.PDFLib.PDFDocument?.create === 'function';
}

async function buildTranslationNotesPdf({
  bookLabel,
  versionLabel,
  releaseInfo,
  noteEntries
}) {
  if (!ensurePdfLibAvailable()) {
    throw new Error('PDF library failed to load.');
  }

  const { PDFDocument, StandardFonts } = window.PDFLib;
  const pdf = await PDFDocument.create();
  const regularFont = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 40;
  const fontSize = 11;
  const lineHeight = fontSize * 1.45;

  const addPage = () => {
    const page = pdf.addPage();
    return {
      page,
      cursorY: page.getHeight() - margin
    };
  };

  let { page, cursorY } = addPage();

  const writeLines = (
    text,
    { font = regularFont, size = fontSize, isHeading = false, indent = 0 } = {}
  ) => {
    if (!text) {
      return;
    }

    const maxWidth = page.getWidth() - margin * 2 - indent;
    const paragraphs = Array.isArray(text) ? text : String(text).split('\n');

    paragraphs.forEach((paragraph, index) => {
      const words = paragraph.split(/\s+/).filter(Boolean);
      let currentLine = '';

      const flushLine = (line) => {
        if (!line) {
          return;
        }

        const heightNeeded = lineHeight;
        if (cursorY - heightNeeded < margin) {
          ({ page, cursorY } = addPage());
        }

        page.drawText(line, {
          x: margin + indent,
          y: cursorY - heightNeeded,
          size,
          font,
          lineHeight
        });

        cursorY -= heightNeeded;
      };

      words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const width = font.widthOfTextAtSize(testLine, size);
        if (width > maxWidth) {
          flushLine(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });

      flushLine(currentLine);

      if (index < paragraphs.length - 1) {
        cursorY -= lineHeight * 0.5;
      }
    });

    if (isHeading) {
      cursorY -= lineHeight * 0.5;
    }
  };

  writeLines(`${bookLabel} Translation Notes`, { font: boldFont, size: 20, isHeading: true });
  writeLines(`Version ${versionLabel}`, { font: regularFont, size: 13, isHeading: true });
  if (releaseInfo?.publishedAt) {
    const published = new Date(releaseInfo.publishedAt);
    if (!Number.isNaN(published.getTime())) {
      writeLines(`Released: ${published.toLocaleDateString()}`, {
        font: regularFont,
        size: 11,
        isHeading: true
      });
    }
  }
  writeLines(`Generated: ${new Date().toLocaleString()}`, { font: regularFont, size: 11, isHeading: true });
  cursorY -= lineHeight;

  noteEntries.forEach((entry) => {
    const chapterLabel = entry.chapter != null ? `Chapter ${entry.chapter}` : null;
    const verseLabel = entry.verse != null ? `Verse ${entry.verse}` : null;
    const headingParts = [chapterLabel, verseLabel].filter(Boolean);
    if (headingParts.length) {
      writeLines(headingParts.join(', '), { font: boldFont, size: 13, isHeading: true });
    }

    entry.notes.forEach((noteText) => {
      writeLines(`• ${noteText}`, { indent: 12 });
      cursorY -= lineHeight * 0.5;
    });

    cursorY -= lineHeight * 0.5;
  });

  const bytes = await pdf.save();
  return new Blob([bytes], { type: 'application/pdf' });
}

function triggerPdfDownload(blob, filename) {
  const objectUrl = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();

  return objectUrl;
}

document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('book-select');
  if (!select) {
    return;
  }

  populateBookSelect(select);

  fetchLatestProductionRelease()
    .then((release) => {
      updateVersionLabels(resolveReleaseTag(release));
    })
    .catch((error) => {
      console.error(error);
      updateVersionLabels('latest');
    });

  select.addEventListener('change', async (event) => {
    const { selectedOptions } = event.target;
    if (!selectedOptions || !selectedOptions.length) {
      return;
    }

    const selectedOption = selectedOptions[0];
    const bookId = selectedOption.dataset.bookId || selectedOption.value;
    const bookLabel = selectedOption.dataset.label || selectedOption.textContent || 'the selected book';

    if (!bookId) {
      setStatus('Sorry, we could not determine which book you selected.', { isError: true });
      return;
    }

    event.target.disabled = true;
    let cachedNotesUrl = null;

    try {
      const release = await fetchLatestProductionRelease();
      const releaseTag = resolveReleaseTag(release);
      updateVersionLabels(releaseTag);
      setStatus(`Looking up the latest translation notes for ${bookLabel} (${releaseTag})…`);

      const { notesJson, cachedUrl } = await fetchTranslationNotes(releaseTag, bookId);
      cachedNotesUrl = cachedUrl;
      const noteEntries = flattenNotes(notesJson);

      if (!noteEntries.length) {
        throw new Error('No notes were present in the downloaded data.');
      }

      setStatus(`Building a PDF for ${bookLabel}. This may take a moment…`);

      const pdfBlob = await buildTranslationNotesPdf({
        bookLabel,
        versionLabel: releaseTag,
        releaseInfo: release,
        noteEntries
      });

      const legacyId = selectedOption.dataset.legacyId;
      const versionSuffix = typeof releaseTag === 'string' ? releaseTag.replace(/^v/i, '') : releaseTag;
      const filename = legacyId
        ? `en_tn_${legacyId}_${versionSuffix}.pdf`
        : `en_tn_${bookId}_${versionSuffix}.pdf`;
      const objectUrl = triggerPdfDownload(pdfBlob, filename);

      const safeLink = `<a href="${objectUrl}" download="${filename}" class="inline-link">click here</a>`;
      setStatus(`Your PDF should open automatically. If not, please ${safeLink}.`, { asHtml: true });

      setTimeout(() => {
        URL.revokeObjectURL(objectUrl);
      }, 300_000);
    } catch (error) {
      console.error(error);
      let fallbackMessage = 'We could not build the PDF right now. Please try again in a moment.';
      if (error && error.message) {
        fallbackMessage = error.message;
      }

      const fallbackUrl = cachedNotesUrl || (typeof error === 'object' && error.cachedUrl ? error.cachedUrl : null);
      const trimmedMessage = fallbackMessage ? fallbackMessage.trim() : '';
      const needsPeriod = trimmedMessage && !/[.!?]$/.test(trimmedMessage);
      let extra = '';
      if (fallbackUrl) {
        extra = ` You can still <a href="${fallbackUrl}" class="inline-link">download the raw notes</a>.`;
      }

      const combined = `${needsPeriod ? `${trimmedMessage}.` : trimmedMessage}${extra}`;
      const finalMessage = combined.trim() || 'We could not build the PDF right now.';
      setStatus(finalMessage, { isError: true, asHtml: true });
    } finally {
      event.target.disabled = false;
    }
  });
});
