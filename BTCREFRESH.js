const BOT_TOKEN = '6110392879:AAGBS0FUhYiKi4GhlW-AXyFX876D_tFQufg';
const CHAT_ID = '1631819640';

function sendTelegramNotification(message) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = new URLSearchParams();
  data.append('chat_id', CHAT_ID);
  data.append('text', message);

  fetch(url, {
    method: 'POST',
    body: data,
  })
    .then((response) => {
      console.log('Telegram notification sent successfully');
    })
    .catch((error) => {
      console.error('Failed to send Telegram notification:', error);
    });
}

function checkPageForNonZeroTransactions() {
  const transactionElements = document.querySelectorAll('.tx');
  let hasNonZeroTransactions = false;

  transactionElements.forEach((element) => {
    const transactionValue = parseInt(element.textContent);
    if (transactionValue > 0) {
      hasNonZeroTransactions = true;
      const pageURL = window.location.href;
      sendTelegramNotification(`Active Wallet Found:\n\nPage URL: ${pageURL}`);
    }
  });

  return hasNonZeroTransactions;
}

window.addEventListener('load', () => {
  const hasNonZeroTransactions = checkPageForNonZeroTransactions();
  if (!hasNonZeroTransactions) {
    console.log('No active wallets with non-zero transactions found on the page.');
  }
});
