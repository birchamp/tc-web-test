const RELEASES_API = 'https://git.door43.org/api/v1/repos/unfoldingWord/en_tn/releases';


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


async function fetchLatestProductionRelease() {
  if (cachedReleaseInfo) {
    return cachedReleaseInfo;
  }

  if (!releaseInfoPromise) {
    releaseInfoPromise = (async () => {
      const response = await fetch(RELEASES_API, {
        headers: {
          Accept: 'application/json, text/plain, */*'
        }
      });

      if (!response.ok) {
        throw new Error(`Door43 release lookup failed (${response.status}).`);
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
        if (item.tag && /preprod/i.test(item.tag)) {
          return false;
        }
        return Boolean(item.tag_name || item.tag);
      });

      if (!release) {
        throw new Error('No production release could be identified.');
      }

      const info = {
        tag: release.tag_name || release.tag || release.name,
        name: release.name || release.tag_name || release.tag,
        publishedAt: release.published_at || release.created_at,
        htmlUrl: release.html_url || release.url || null,
        assets: Array.isArray(release.assets)
          ? release.assets.map((asset) => ({ ...asset }))
          : []
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

function normaliseCandidates(values) {
  return values
    .map((value) => (typeof value === 'string' ? value.trim() : value))
    .filter((value) => Boolean(value))
    .map((value) => value.toString().toLowerCase());
}

function buildVersionCandidates(releaseTag) {
  if (!releaseTag) {
    return [];
  }
  const trimmed = releaseTag.toString().trim();
  if (!trimmed) {
    return [];
  }

  const lower = trimmed.toLowerCase();
  const withoutV = lower.replace(/^v+/i, '');
  const candidates = new Set();
  candidates.add(lower);
  if (withoutV && withoutV !== lower) {
    candidates.add(withoutV);
    candidates.add(`v${withoutV}`);
  }
  return Array.from(candidates).filter(Boolean);
}

function assetNameMatchesId(name, idCandidates) {
  if (!idCandidates.length) {
    return false;
  }
  return idCandidates.some((candidate) => name.includes(candidate));
}

function assetNameMatchesVersion(name, versionCandidates) {
  if (!versionCandidates.length) {
    return true;
  }

  return versionCandidates.some((candidate) => {
    if (!candidate) {
      return false;
    }
    return (
      name.includes(`_${candidate}`) ||
      name.includes(`-${candidate}`) ||
      name.endsWith(`${candidate}.pdf`)
    );
  });
}

function findAssetForBook(release, { bookId, legacyId }) {
  if (!release || !Array.isArray(release.assets)) {
    return null;
  }

  const pdfAssets = release.assets.filter(
    (asset) => asset && asset.name && typeof asset.name === 'string' && /\.pdf$/i.test(asset.name)
  );

  if (!pdfAssets.length) {
    return null;
  }

  const idCandidates = normaliseCandidates([legacyId, bookId]);
  const versionCandidates = buildVersionCandidates(resolveReleaseTag(release));

  const normalizedAssets = pdfAssets.map((asset) => ({ asset, name: asset.name.toLowerCase() }));

  const priorityChecks = [
    (entry) => assetNameMatchesId(entry.name, idCandidates) && assetNameMatchesVersion(entry.name, versionCandidates),
    (entry) => assetNameMatchesId(entry.name, idCandidates),
    (entry) => assetNameMatchesVersion(entry.name, versionCandidates)
  ];

  for (let i = 0; i < priorityChecks.length; i += 1) {
    const match = normalizedAssets.find(priorityChecks[i]);
    if (match) {
      return match.asset;
    }
  }

  return pdfAssets[0];
}

function resolveAssetDownloadUrl(asset) {
  if (!asset || typeof asset !== 'object') {
    return null;
  }

  return (
    asset.browser_download_url ||
    asset.download_url ||
    asset.browser_url ||
    (asset.links && asset.links.self) ||
    asset.url ||
    null
  );
}

function triggerAssetDownload(url, filename) {
  if (!url) {
    return;
  }

  const link = document.createElement('a');
  link.href = url;
  if (filename) {
    link.download = filename;
  }
  link.target = '_blank';
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();

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

    try {
      const release = await fetchLatestProductionRelease();
      const releaseTag = resolveReleaseTag(release);
      updateVersionLabels(releaseTag);
      setStatus(`Looking up the latest translation notes for ${bookLabel} (${releaseTag})…`);


      const asset = findAssetForBook(release, {
        bookId,
        legacyId: selectedOption.dataset.legacyId
      });

      if (!asset) {
        throw new Error('No PDF asset was found for this book.');
      }

      const downloadUrl = resolveAssetDownloadUrl(asset);
      if (!downloadUrl) {
        throw new Error('The PDF asset is missing a download link.');
      }

      const filename = asset.name || `${bookId}.pdf`;
      setStatus(`Starting your download of ${bookLabel} (${releaseTag})…`);

      triggerAssetDownload(downloadUrl, filename);

      const safeLink = `<a href="${downloadUrl}" class="inline-link">click here</a>`;
      setStatus(`Your download should start automatically. If not, please ${safeLink}.`, { asHtml: true });
    } catch (error) {
      console.error(error);
      let fallbackMessage = 'We could not download the PDF right now. Please try again in a moment.';
      if (error && error.message) {
        fallbackMessage = error.message;
      }

      let extra = '';
      if (cachedReleaseInfo?.htmlUrl) {
        extra = ` You can browse all available files on the <a href="${cachedReleaseInfo.htmlUrl}" class="inline-link" target="_blank" rel="noopener">release page</a>.`;
      }

      const combined = `${fallbackMessage.trim()}${extra}`.trim();
      setStatus(combined || 'We could not download the PDF right now.', { isError: true, asHtml: true });

    } finally {
      event.target.disabled = false;
    }
  });
});
