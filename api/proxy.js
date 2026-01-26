
export default async function handler(req, res) {
  const { url } = req.query;
  // Ключ, полученный на proxyapi.ru, должен лежать в переменной окружения API_KEY на Vercel
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API_KEY not configured' });
  }

  try {
    // ProxyAPI.ru использует тот же формат пути, что и Google, но другой домен
    const proxyUrl = `https://api.proxyapi.ru/google/v1beta/models/${url}?key=${apiKey}`;
    
    const response = await fetch(proxyUrl, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Proxy error' });
  }
}
