<?php
/**
 * Handles both website forms:
 *   - form_type=enquiry            (Contact page enquiry form)
 *   - form_type=resource-download  (Resources page email-gated download)
 *
 * Sends mail via SMTP (PHPMailer) to the address configured in config.php.
 * Returns a JSON body: {"success": true} or {"success": false, "message": "..."}
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

function respond(bool $success, string $message = ''): void
{
    http_response_code($success ? 200 : 400);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    respond(false, 'Method not allowed.');
}

$configPath = __DIR__ . '/config.php';
if (!file_exists($configPath)) {
    error_log('Fortis contact form: server/config.php is missing. Copy config.example.php and fill in real values.');
    respond(false, 'The mail service is not configured yet. Please email us directly.');
}

$autoload = __DIR__ . '/vendor/autoload.php';
if (!file_exists($autoload)) {
    error_log('Fortis contact form: server/vendor/autoload.php is missing. Run `composer install` in server/.');
    respond(false, 'The mail service is not configured yet. Please email us directly.');
}

require $autoload;
$config = require $configPath;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as PHPMailerException;

// Honeypot — bots tend to fill every field, humans never see this one.
if (!empty($_POST['website'])) {
    // Pretend success so bots don't learn anything, but do nothing.
    respond(true);
}

$formType = trim((string)($_POST['form_type'] ?? ''));

function cleanField(string $key, int $maxLength = 2000): string
{
    $value = trim((string)($_POST[$key] ?? ''));
    return mb_substr($value, 0, $maxLength);
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $config['smtp']['host'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $config['smtp']['username'];
    $mail->Password   = $config['smtp']['password'];
    $mail->SMTPSecure = $config['smtp']['encryption'] === 'tls' ? PHPMailer::ENCRYPTION_STARTTLS : PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = (int)$config['smtp']['port'];
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($config['mail']['from_address'], $config['mail']['from_name']);
    $mail->addAddress($config['mail']['to_address'], $config['mail']['to_name']);

    if ($formType === 'enquiry') {
        $name    = cleanField('name', 200);
        $email   = cleanField('email', 200);
        $phone   = cleanField('phone', 50);
        $company = cleanField('company', 200);
        $service = cleanField('service', 200);
        $message = cleanField('message', 5000);

        if ($name === '' || $email === '' || $phone === '' || $message === '') {
            respond(false, 'Please fill in all required fields.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(false, 'Please enter a valid email address.');
        }

        $mail->addReplyTo($email, $name);
        $mail->Subject = 'New Enquiry from Website — ' . $name;

        $bodyLines = [
            'New enquiry submitted via fortiscorporate.com',
            '',
            'Name: ' . $name,
            'Email: ' . $email,
            'Phone: ' . $phone,
            'Company: ' . ($company !== '' ? $company : 'Not provided'),
            'Service of interest: ' . ($service !== '' ? $service : 'Not specified'),
            '',
            'Message:',
            $message,
        ];
        $mail->Body = implode("\n", $bodyLines);
    } elseif ($formType === 'resource-download') {
        $email    = cleanField('email', 200);
        $resource = cleanField('resource', 200);

        if ($email === '') {
            respond(false, 'Please enter your email address.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(false, 'Please enter a valid email address.');
        }

        $mail->addReplyTo($email);
        $mail->Subject = 'Resource Download Lead — ' . ($resource !== '' ? $resource : 'Unknown resource');

        $bodyLines = [
            'A visitor unlocked a downloadable resource on fortiscorporate.com',
            '',
            'Email: ' . $email,
            'Resource: ' . ($resource !== '' ? $resource : 'Not specified'),
            '',
            'Lead tag: resource-download',
        ];
        $mail->Body = implode("\n", $bodyLines);
    } else {
        respond(false, 'Unrecognised form submission.');
    }

    $mail->send();
    respond(true);
} catch (PHPMailerException $e) {
    error_log('Fortis contact form mail error: ' . $e->getMessage());
    respond(false, 'Sorry, something went wrong sending your message. Please try again or email us directly.');
}
