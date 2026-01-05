<?php
/**
 * Endpoint webhook pour déclencher le rebuild
 * À placer dans le dossier public_html de PlanetHoster
 * URL: https://logic-design-solutions.com/webhook-rebuild.php
 */

// Clé secrète pour sécuriser le webhook (à changer!)
define('WEBHOOK_SECRET', 'votre-cle-secrete-ici-123456');

// Vérifier la clé secrète
$secret = $_GET['secret'] ?? $_POST['secret'] ?? '';

if ($secret !== WEBHOOK_SECRET) {
    http_response_code(403);
    die('Accès refusé');
}

// Log
$logFile = __DIR__ . '/webhook-rebuild.log';
$timestamp = date('Y-m-d H:i:s');
file_put_contents($logFile, "[$timestamp] Webhook déclenché\n", FILE_APPEND);

// Exécuter le script de rebuild en arrière-plan
$scriptPath = __DIR__ . '/../nuxt-app/webhook-rebuild.sh';
$command = "bash $scriptPath > /dev/null 2>&1 &";

exec($command);

// Réponse
http_response_code(200);
echo json_encode([
    'status' => 'success',
    'message' => 'Rebuild déclenché',
    'timestamp' => $timestamp
]);
