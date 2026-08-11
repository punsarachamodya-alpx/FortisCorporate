<?php
/**
 * Decap CMS GitHub OAuth proxy — step 1 of 2.
 *
 * Decap's admin panel (public/admin/) opens this script in a popup. It
 * redirects the browser to GitHub's OAuth authorize screen, and GitHub
 * redirects back to callback.php once the user approves access.
 *
 * Requires server/config.php to exist with a `github_oauth` client_id/secret
 * (create a GitHub OAuth App at https://github.com/settings/developers —
 * see server/config.example.php for the exact callback URL to register).
 */

declare(strict_types=1);

session_start();

$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) {
    http_response_code(500);
    echo 'The content manager is not configured yet. Please contact the site administrator.';
    exit;
}

$config = require $configPath;
$clientId = $config['github_oauth']['client_id'] ?? '';

if ($clientId === '' || $clientId === 'REPLACE_WITH_GITHUB_OAUTH_CLIENT_ID') {
    http_response_code(500);
    echo 'The content manager is not configured yet. Please contact the site administrator.';
    exit;
}

// CSRF protection: random state stored in session, verified in callback.php.
$state = bin2hex(random_bytes(16));
$_SESSION['decap_oauth_state'] = $state;

$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https://' : 'http://';
$callbackUrl = $scheme . $_SERVER['HTTP_HOST'] . '/server/oauth/callback.php';

$params = http_build_query([
    'client_id'    => $clientId,
    'redirect_uri' => $callbackUrl,
    'scope'        => 'repo,user',
    'state'        => $state,
]);

header('Location: https://github.com/login/oauth/authorize?' . $params);
exit;
