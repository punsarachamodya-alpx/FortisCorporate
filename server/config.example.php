<?php
/**
 * Fortis Corporate Services — server configuration template.
 *
 * Copy this file to `config.php` on the live server (e.g. via Hostinger
 * File Manager) and fill in real values. `config.php` is gitignored and
 * must NEVER be committed — it holds live SMTP and OAuth credentials.
 *
 * This example file with placeholder values IS committed, so the shape of
 * the config is documented in the repo without exposing secrets.
 */

return [

    // --- SMTP (used by server/send.php via PHPMailer) ---------------------
    'smtp' => [
        'host'       => 'smtp.hostinger.com',
        'port'       => 465,
        'encryption' => 'ssl', // 'ssl' (port 465) or 'tls' (port 587)
        'username'   => 'noreply@fortiscorporate.com',
        'password'   => 'REPLACE_WITH_REAL_SMTP_PASSWORD',
    ],

    // --- Mail routing -------------------------------------------------------
    'mail' => [
        // Sri Lanka firm inbox that receives enquiries & resource-download leads.
        'to_address'   => 'fortiscorps@gmail.com',
        'to_name'      => 'Fortis Corporate Services',
        'from_address' => 'noreply@fortiscorporate.com',
        'from_name'    => 'Fortis Corporate Services Website',
    ],

    // --- Decap CMS GitHub OAuth proxy (server/oauth/*.php) -----------------
    // Create a GitHub OAuth App at https://github.com/settings/developers
    // Homepage URL:              https://fortiscorporate.com
    // Authorization callback URL: https://fortiscorporate.com/server/oauth/callback.php
    'github_oauth' => [
        'client_id'     => 'REPLACE_WITH_GITHUB_OAUTH_CLIENT_ID',
        'client_secret' => 'REPLACE_WITH_GITHUB_OAUTH_CLIENT_SECRET',
    ],

];
