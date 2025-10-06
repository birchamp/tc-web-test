const RELEASE_API = 'https://api.github.com/repos/unfoldingWord/translationCore/releases/latest';
const RELEASE_FALLBACK = 'https://github.com/unfoldingWord/translationCore/releases/latest';

function detectOperatingSystem() {
  const { userAgent, platform } = window.navigator;
  const normalizedUA = userAgent.toLowerCase();
  const normalizedPlatform = (platform || '').toLowerCase();

  if (/(windows|win32|win64)/i.test(normalizedUA + normalizedPlatform)) {
    return 'windows';
  }

  if (/(macintosh|macintel|mac os|mac_powerpc|darwin)/i.test(normalizedUA + normalizedPlatform)) {
    return 'mac';
  }

  if (/(linux|x11|ubuntu|debian|fedora)/i.test(normalizedUA + normalizedPlatform)) {
    return 'linux';
  }

  return 'unknown';
}

function rankAssetForOS(assetName, os) {
  const name = assetName.toLowerCase();

  const preferences = {
    windows: [/\.exe$/, /windows/, /win64/, /win32/, /\.msi$/],
    mac: [/\.dmg$/, /mac/, /osx/, /darwin/],
    linux: [/\.appimage$/, /linux/, /\.deb$/, /\.tar\.gz$/]
  };

  const patterns = preferences[os] || [];

  for (let i = 0; i < patterns.length; i += 1) {
    if (patterns[i].test(name)) {
      return patterns.length - i;
    }
  }

  return 0;
}

function chooseBestAsset(assets, os) {
  if (!Array.isArray(assets) || assets.length === 0) {
    return null;
  }

  if (os === 'unknown') {
    return assets[0];
  }

  let best = null;
  let highestScore = 0;

  assets.forEach((asset) => {
    if (!asset || !asset.name) return;
    const score = rankAssetForOS(asset.name, os);
    if (score > highestScore) {
      highestScore = score;
      best = asset;
    }
  });

  return best || assets[0];
}

async function fetchLatestAsset() {
  const response = await fetch(RELEASE_API, {
    headers: {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status}`);
  }

  const data = await response.json();
  const os = detectOperatingSystem();
  const asset = chooseBestAsset(data.assets || [], os);

  return { asset, os };
}

function resetButton(button, originalText) {
  if (!button) return;
  button.disabled = false;
  button.textContent = originalText;
}

document.addEventListener('DOMContentLoaded', () => {
  const attachDownloadHandler = (buttonId, statusId) => {
    const downloadButton = document.getElementById(buttonId);
    const statusEl = statusId ? document.getElementById(statusId) : null;

    if (!downloadButton) {
      return;
    }

    const originalText = downloadButton.textContent;
    const loadingText = downloadButton.dataset.loadingText || 'Preparing download…';

    downloadButton.addEventListener('click', async () => {
      downloadButton.disabled = true;
      downloadButton.textContent = loadingText;
      if (statusEl) {
        statusEl.textContent = 'Looking for the latest translationCore release for your device…';
      }

      try {
        const { asset, os } = await fetchLatestAsset();

        if (!asset || !asset.browser_download_url) {
          throw new Error('No download available for your platform.');
        }

        if (statusEl) {
          const osLabel = os === 'unknown' ? 'your device' : os.toUpperCase();
          statusEl.textContent = `Starting ${osLabel} download…`;
        }

        window.location.href = asset.browser_download_url;
      } catch (error) {
        console.error(error);
        if (statusEl) {
          statusEl.textContent = 'Unable to find an automatic download. Redirecting you to the releases page…';
        }
        window.open(RELEASE_FALLBACK, '_blank', 'noopener');
      } finally {
        setTimeout(() => {
          if (statusEl) {
            statusEl.textContent = '';
          }
          resetButton(downloadButton, originalText);
        }, 2500);
      }
    });
  };

  attachDownloadHandler('download-translationcore', 'download-status');
  attachDownloadHandler('download-translationcore-page', 'download-status-page');
  attachDownloadHandler('download-translationcore-page-footer', 'download-status-page-footer');

  // Handle platform-specific download buttons
  document.querySelectorAll('.download-btn').forEach(button => {
    const platform = button.dataset.platform;
    if (!platform) return;

    const originalText = button.textContent;
    const loadingText = button.dataset.loadingText || 'Preparing download…';
    const statusEl = document.getElementById('download-status-page-footer');

    button.addEventListener('click', async () => {
      button.disabled = true;
      button.textContent = loadingText;
      if (statusEl) {
        statusEl.textContent = 'Looking for the latest translationCore release…';
      }

      try {
        const response = await fetch(RELEASE_API, {
          headers: {
            'Accept': 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28'
          }
        });

        if (!response.ok) {
          throw new Error(`GitHub API request failed: ${response.status}`);
        }

        const data = await response.json();
        const asset = chooseBestAsset(data.assets || [], platform);

        if (!asset || !asset.browser_download_url) {
          throw new Error('No download available for this platform.');
        }

        if (statusEl) {
          const platformLabel = platform.toUpperCase();
          statusEl.textContent = `Starting ${platformLabel} download…`;
        }

        window.location.href = asset.browser_download_url;
      } catch (error) {
        console.error(error);
        if (statusEl) {
          statusEl.textContent = 'Unable to find an automatic download. Redirecting you to the releases page…';
        }
        window.open(RELEASE_FALLBACK, '_blank', 'noopener');
      } finally {
        setTimeout(() => {
          if (statusEl) {
            statusEl.textContent = '';
          }
          button.disabled = false;
          button.textContent = originalText;
        }, 2500);
      }
    });
  });

  const helpsTrigger = document.getElementById('download-helps');
  const helpsDialog = document.getElementById('helps-dialog');
  const helpsCloseButtons = helpsDialog ? helpsDialog.querySelectorAll('[data-helps-close]') : [];
  const helpsSelect = helpsDialog ? helpsDialog.querySelector('#book-select') : null;
  const helpsMessage = helpsDialog ? helpsDialog.querySelector('#download-message') : null;
  let lastFocusedElement = null;

  const isDialogOpen = () => Boolean(helpsDialog && !helpsDialog.hasAttribute('hidden'));

  const closeHelpsDialog = () => {
    if (!helpsDialog) return;
    helpsDialog.classList.remove('is-open');
    helpsDialog.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('dialog-open');
    setTimeout(() => {
      if (helpsDialog.getAttribute('aria-hidden') === 'true') {
        helpsDialog.setAttribute('hidden', '');
      }
    }, 180);

    if (helpsTrigger) {
      helpsTrigger.setAttribute('aria-expanded', 'false');
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  const openHelpsDialog = () => {
    if (!helpsDialog) return;
    lastFocusedElement = document.activeElement;
    helpsDialog.removeAttribute('hidden');
    helpsDialog.setAttribute('aria-hidden', 'false');
    document.body.classList.add('dialog-open');
    requestAnimationFrame(() => {
      helpsDialog.classList.add('is-open');
    });

    if (helpsTrigger) {
      helpsTrigger.setAttribute('aria-expanded', 'true');
    }

    if (helpsSelect) {
      helpsSelect.selectedIndex = 0;
      helpsSelect.focus();
    }

    if (helpsMessage) {
      helpsMessage.textContent = '';
    }
  };

  if (helpsTrigger && helpsDialog) {
    helpsTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      openHelpsDialog();
    });

    helpsCloseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        closeHelpsDialog();
      });
    });

    helpsDialog.addEventListener('click', (event) => {
      if (event.target && event.target.hasAttribute('data-helps-close')) {
        closeHelpsDialog();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isDialogOpen()) {
        closeHelpsDialog();
      }
    });
  }
});
