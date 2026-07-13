/**
 * Cloudflare Pages Function — 代理 /api/health 到 Railway 后端
 */

const BACKEND_URL = 'https://web-production-10b15.up.railway.app';

export async function onRequestGet() {
  try {
    const resp = await fetch(`${BACKEND_URL}/health`);
    const text = await resp.text();

    return new Response(text, {
      status: resp.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ status: 'error', detail: String(err) }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
