<?php
/**
 * Plugin Name: Logic Design - Auto Rebuild Webhook
 * Description: Déclenche automatiquement le rebuild du site Nuxt quand le contenu WordPress change
 * Version: 1.0
 * Author: Logic Design Solutions
 *
 * Installation: Placer ce fichier dans wp-content/plugins/ et l'activer
 */

// Configuration du webhook
define('NUXT_WEBHOOK_URL', 'https://logic-design-solutions.com/webhook-rebuild.php');
define('NUXT_WEBHOOK_SECRET', 'votre-cle-secrete-ici-123456'); // Doit correspondre à webhook-endpoint.php

/**
 * Déclencher le rebuild du site Nuxt
 */
function trigger_nuxt_rebuild($post_id = null) {
    // Ne pas déclencher lors des auto-saves ou révisions
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (wp_is_post_revision($post_id)) return;

    // Vérifier si le post est publié
    $post_status = get_post_status($post_id);
    if ($post_status !== 'publish') return;

    // Log pour debug
    error_log("Déclenchement du rebuild Nuxt pour le post #$post_id");

    // Appeler le webhook en arrière-plan
    wp_remote_post(NUXT_WEBHOOK_URL . '?secret=' . NUXT_WEBHOOK_SECRET, [
        'timeout' => 1, // Timeout court car on n'attend pas la réponse
        'blocking' => false, // Non-bloquant
        'body' => [
            'post_id' => $post_id,
            'timestamp' => time()
        ]
    ]);
}

/**
 * Déclencher le rebuild quand un produit est publié/mis à jour
 */
add_action('save_post_product', function($post_id, $post, $update) {
    if ($post->post_status === 'publish') {
        trigger_nuxt_rebuild($post_id);
    }
}, 10, 3);

/**
 * Déclencher le rebuild quand un article est publié/mis à jour
 */
add_action('save_post_post', function($post_id, $post, $update) {
    if ($post->post_status === 'publish') {
        trigger_nuxt_rebuild($post_id);
    }
}, 10, 3);

/**
 * Déclencher le rebuild quand un slide est modifié
 */
add_action('save_post_slides', function($post_id, $post, $update) {
    if ($post->post_status === 'publish') {
        trigger_nuxt_rebuild($post_id);
    }
}, 10, 3);

/**
 * Déclencher le rebuild quand un partenaire est modifié
 */
add_action('save_post_partners', function($post_id, $post, $update) {
    if ($post->post_status === 'publish') {
        trigger_nuxt_rebuild($post_id);
    }
}, 10, 3);

/**
 * Déclencher le rebuild quand une FAQ est modifiée
 */
add_action('save_post_faq-entry', function($post_id, $post, $update) {
    if ($post->post_status === 'publish') {
        trigger_nuxt_rebuild($post_id);
    }
}, 10, 3);

/**
 * Ajouter un bouton manuel dans l'admin pour forcer un rebuild
 */
add_action('admin_bar_menu', function($wp_admin_bar) {
    $wp_admin_bar->add_node([
        'id' => 'nuxt_rebuild',
        'title' => '🔄 Rebuild Site Nuxt',
        'href' => admin_url('admin-post.php?action=nuxt_rebuild'),
        'meta' => [
            'title' => 'Forcer le rebuild du site Nuxt'
        ]
    ]);
}, 100);

/**
 * Gérer l'action manuelle de rebuild
 */
add_action('admin_post_nuxt_rebuild', function() {
    // Vérifier les permissions
    if (!current_user_can('manage_options')) {
        wp_die('Non autorisé');
    }

    trigger_nuxt_rebuild(0);

    // Rediriger avec un message
    wp_redirect(add_query_arg([
        'nuxt_rebuild' => 'success'
    ], wp_get_referer()));
    exit;
});

/**
 * Afficher une notification de succès
 */
add_action('admin_notices', function() {
    if (isset($_GET['nuxt_rebuild']) && $_GET['nuxt_rebuild'] === 'success') {
        echo '<div class="notice notice-success is-dismissible">
            <p><strong>Rebuild du site Nuxt déclenché avec succès!</strong></p>
        </div>';
    }
});
