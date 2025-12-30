

// Configuración de Supabase

/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 */

const SUPABASE_URL = process.env['SUPABASE_URL'] || '';
const SUPABASE_ANON_KEY = process.env['SUPABASE_ANON_KEY'] || '';
const UAParser = require('ua-parser-js');

// Mapa de códigos a URLs destino
const REDIRECT_URLS: Record<string, string> = {
  root: 'https://dev-alonso.vercel.app',
  portfolio: 'https://dev-alonso.vercel.app',
  github: 'https://github.com/tuusuario',
  linkedin: 'https://linkedin.com/in/tuusuario',
  // Puedes agregar más...
};


interface TrackingData {
  link_id: string;
  ip: string | null;
  user_agent: string | null;
  browser: string | null;
  os: string | null;
  device: string | null;
  referer: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  timestamp: string;
  destination_url: string;
}

async function saveToSupabase(data: TrackingData): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.log('Supabase not configured, skipping save');
    return;
  }

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/link_tracking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      console.error('Error saving to Supabase:', await response.text());
    }
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
}

module.exports = async (req, res) => {
  const { id } = req.query;
  const linkId = Array.isArray(id) ? id[0] : id;

  if (!linkId) {
    return res.status(400).json({ error: 'Link ID required' });
  }

  // Buscar URL destino
  const destinationUrl = REDIRECT_URLS[linkId.toLowerCase()];

  if (!destinationUrl) {
    return res.status(404).json({ error: 'Link not found' });
  }

  // Extraer información del visitante

  const userAgent = req.headers['user-agent'] || '';
  const ua = UAParser(userAgent);

  const trackingData: TrackingData = {
    link_id: linkId,
    ip: (req.headers['x-forwarded-for']?.split(',')[0]) ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      null,
    user_agent: userAgent,
    browser: ua.browser?.name ? `${ua.browser.name} ${ua.browser.version || ''}` : null,
    os: ua.os?.name ? `${ua.os.name} ${ua.os.version || ''}` : null,
    device: ua.device?.type ? `${ua.device.type} ${ua.device.vendor || ''} ${ua.device.model || ''}` : 'Desktop',
    referer: req.headers['referer'] || null,
    country: req.headers['x-vercel-ip-country'] || null,
    city: req.headers['x-vercel-ip-city'] || null,
    region: req.headers['x-vercel-ip-country-region'] || null,
    timestamp: new Date().toISOString(),
    destination_url: destinationUrl
  };

  // Guardar en Supabase (async, no bloquea el redirect)
  await saveToSupabase(trackingData);

  // Log para debug (visible en Vercel logs)
  console.log('Track:', JSON.stringify(trackingData, null, 2));

  // Redirigir al destino
  res.redirect(302, destinationUrl);
}
