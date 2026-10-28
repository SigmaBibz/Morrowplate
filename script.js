document.getElementById('year').textContent = new Date().getFullYear();

const PRICE_RATE = 150;
const DEFAULT_CURRENCY = (() => {
  const locale = (navigator.language || '').toLowerCase();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  const kenyaMatch = locale.includes('ke') || timezone.includes('nairobi') || timezone.includes('kenya');
  return kenyaMatch ? 'KES' : 'USD';
})();

const priceFormatter = {
  KES: new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }),
  USD: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }),
};

function formatRange(min, max, currency) {
  if (currency === 'USD') {
    const usdMin = Number((min / PRICE_RATE).toFixed(0));
    const usdMax = Number((max / PRICE_RATE).toFixed(0));
    return `${priceFormatter.USD.format(usdMin)}–${priceFormatter.USD.format(usdMax)}`;
  }

  return `${priceFormatter.KES.format(min)}–${priceFormatter.KES.format(max)}`;
}

function formatSingle(value, currency) {
  if (currency === 'USD') {
    return priceFormatter.USD.format(Number((value / PRICE_RATE).toFixed(0)));
  }
  return priceFormatter.KES.format(value);
}

function getSelectedCurrency() {
  const stored = localStorage.getItem('morrowplateCurrency');
  if (stored === 'KES' || stored === 'USD') {
    return stored;
  }
  return DEFAULT_CURRENCY;
}

function applyPrices(currency) {
  const elements = document.querySelectorAll('[data-kes]');

  elements.forEach((item) => {
    const minValue = Number(item.dataset.kes || 0);
    const maxValue = Number(item.dataset.usd || minValue);
    const priceNode = item.querySelector('[data-price]');

    if (!priceNode) {
      return;
    }

    if (currency === 'USD') {
      priceNode.textContent = formatRange(minValue, maxValue, 'USD');
    } else {
      const baseMin = Number(item.dataset.kes || minValue);
      const baseMax = Number(item.dataset.kes || minValue);
      const rangeMax = baseMax + 500;
      const lower = Math.min(baseMin, rangeMax);
      const upper = Math.max(baseMin, rangeMax);
      priceNode.textContent = formatRange(lower, upper, 'KES');
    }
  });

  document.querySelectorAll('[data-price-type="free"]').forEach((item) => {
    const priceNode = item.querySelector('[data-price]');
    if (priceNode) {
      priceNode.textContent = currency === 'USD' ? 'Free' : 'Free';
    }
  });
}

function updateCurrencyButtons(currency) {
  document.querySelectorAll('.currency-btn').forEach((button) => {
    const isActive = button.dataset.currency === currency;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
}

const currentCurrency = getSelectedCurrency();
applyPrices(currentCurrency);
updateCurrencyButtons(currentCurrency);

document.querySelectorAll('.currency-btn').forEach((button) => {
  button.addEventListener('click', () => {
    const nextCurrency = button.dataset.currency;
    localStorage.setItem('morrowplateCurrency', nextCurrency);
    applyPrices(nextCurrency);
    updateCurrencyButtons(nextCurrency);
  });
});
