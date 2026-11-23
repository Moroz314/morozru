function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return res.status(503).json({
      ok: false,
      code: 'NOT_CONFIGURED',
      error: 'Telegram bot environment variables are not configured',
    });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name = '', contact = '', topic = '', details = '', website = '', pageUrl = '' } = body;

    // Honeypot anti-spam trap
    if (website) {
      return res.status(200).json({ ok: true });
    }

    const cleanName = String(name).trim().slice(0, 120);
    const cleanContact = String(contact).trim().slice(0, 160);
    const cleanTopic = String(topic).trim().slice(0, 160);
    const cleanDetails = String(details).trim().slice(0, 1000);
    const cleanPage = String(pageUrl).trim().slice(0, 200);

    if (!cleanName || !cleanContact) {
      return res.status(400).json({ ok: false, error: 'Укажите имя и контакт для связи' });
    }

    const lines = [
      '🔥 <b>Новая заявка с сайта Moroz314!</b>',
      '',
      cleanTopic ? `📌 <b>Формат:</b> ${escapeHtml(cleanTopic)}` : null,
      `👤 <b>Имя:</b> ${escapeHtml(cleanName)}`,
      `📞 <b>Контакт:</b> ${escapeHtml(cleanContact)}`,
      cleanDetails ? `📝 <b>Задача:</b> ${escapeHtml(cleanDetails)}` : null,
      cleanPage ? `🌐 <b>Источник:</b> ${escapeHtml(cleanPage)}` : null,
    ].filter((line) => line !== null);

    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: lines.join('\n'),
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    const tgData = await tgResponse.json();
    if (!tgResponse.ok || !tgData.ok) {
      return res.status(502).json({
        ok: false,
        error: tgData.description || 'Telegram API error',
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err?.message || 'Server error' });
  }
}
