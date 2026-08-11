<?php
/**
 * Decap CMS GitHub OAuth proxy — step 2 of 2.
 *
 * GitHub redirects here with a `code` after the user approves access. This
 * script exchanges the code for an access token and hands it back to the
 * Decap CMS popup window via postMessage, following Decap/Netlify CMS's
 * standard external OAuth provider protocol.
 */

declare(strict_types=1);

session_start();

function fail(string $message, int $status = 400): void
{
    http_response_code($status);
    echo '<p>' . htmlspecialchars($message) . '</p><p>You can close this window and try again.</p>';
    exit;
}

$configPath = __DIR__ . '/../config.php';
if (!file_exists($configPath)) {
    fail('The content manager is not configured yet. Please contact the site administrator.', 500);
}
$config = require $configPath;

$code = $_GET['code'] ?? '';
$state = $_GET['state'] ?? '';

if (
    $code === '' || $state === ''
    || !isset($_SESSION['decap_oauth_state'])
    || !hash_equals((string)$_SESSION['decap_oauth_state'], (string)$state)
) {
    fail('Invalid or expired login attempt.');
}
unset($_SESSION['decap_oauth_state']);

$ch = curl_init('https://github.com/login/oauth/access_token');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => http_build_query([
        'client_id'     => $config['github_oauth']['client_id'],
        'client_secret' => $config['github_oauth']['client_secret'],
        'code'          => $code,
    ]),
    CURLOPT_HTTPHEADER => ['Accept: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
]);
$response = curl_exec($ch);
$curlError = curl_error($ch);
curl_close($ch);

if ($response === false) {
    fail('Could not reach GitHub: ' . $curlError, 502);
}

$data = json_decode($response, true);
$token = $data['access_token'] ?? null;

if (!$token) {
    fail('GitHub did not return an access token. Please try again.');
}

$payload = json_encode(['token' => $token, 'provider' => 'github']);
?>
<!doctype html>
<html>
  <body>
    <p>Signing you in…</p>
    <script>
      (function () {
        function receiveMessage(message) {
          window.opener.postMessage(
            'authorization:github:success:<?php echo addslashes((string)$payload); ?>',
            message.origin
          );
          window.removeEventListener('message', receiveMessage, false);
        }
        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', '*');
      })();
    </script>
  </body>
</html>
