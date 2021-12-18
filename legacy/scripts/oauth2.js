const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function get_user(token, cb){const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    body: new URLSearchParams({
        client_id: process.env['client_id'],
        client_secret: process.env['client_secret'],
        code: token,
        grant_type: 'authorization_code',
        redirect_uri: process.env['callback_url'],
        scope: 'identify',
    }),
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

	const oauthData = await oauthResult.json();
    const userResult = await fetch('https://discord.com/api/users/@me', {
        headers: {
            authorization: `${oauthData.token_type} ${oauthData.access_token}`,
        },
    });
    var result = await userResult.json()
    cb(result)
}

module.exports = {get_user}