/**
 * Cloudflare Pages Function — 代理 /api/research 到 Railway 后端
 */

const BACKEND_URL = 'https://web-production-10b15.up.railway.app';

export async function onRequestPost(context) {
  try {
    const body = await context.request.text();

    const resp = await fetch(`${BACKEND_URL}/api/research`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

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
      JSON.stringify({ error: '后端代理请求失败', detail: String(err) }),
      {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}
