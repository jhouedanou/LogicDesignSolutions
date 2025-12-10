<?php


// Add custom Theme Functions here
// widget de gestion de logo
// 
// 
// 
// gestion des widgets depuis l'API
add_action('rest_api_init', function() {
    register_rest_route('custom/v1', '/widgets', array(
        'methods' => 'GET',
        'callback' => function() {
            $sidebars = wp_get_sidebars_widgets();
            $widgets_data = array();

            foreach ($sidebars as $sidebar_id => $widget_ids) {
                if (empty($widget_ids) || $sidebar_id === 'wp_inactive_widgets') {
                    continue;
                }

                $widgets_data[$sidebar_id] = array();

                foreach ($widget_ids as $widget_id) {
                    $widget_info = wp_parse_widget_id($widget_id);
                    $widget_class = $GLOBALS['wp_widget_factory']->get_widget_object($widget_info['id_base']);
                    
                    if ($widget_class) {
                        // Récupère les options/contenu du widget
                        $widget_options = get_option('widget_' . $widget_info['id_base']);
                        $widget_instance = $widget_options[$widget_info['number']] ?? array();

                        $widgets_data[$sidebar_id][] = array(
                            'id' => $widget_id,
                            'name' => $widget_class->name,
                            'description' => $widget_class->widget_options['description'] ?? '',
                            'content' => $widget_instance // ← Le contenu du widget
                        );
                    }
                }
            }

            return rest_ensure_response($widgets_data);
        },
        'permission_callback' => '__return_true'
    ));
});
//widgets gestion
add_action('admin_menu', function() {
    add_menu_page(
        'CMS de l\'app vuejs',
        'CMS de l\'app vuejs',
        'edit_theme_options',
        'cms-app-vuejs',
        'cms_app_vuejs_callback',
        'dashicons-layout',
        60
    );

    // Sous-menus
    add_submenu_page(
        'cms-app-vuejs',
        'Widgets',
        'Widgets',
        'edit_theme_options',
        'cms-app-vuejs-widgets',
        'cms_app_vuejs_widgets_callback'
    );

    add_submenu_page(
        'cms-app-vuejs',
        'Contenu',
        'Contenu',
        'edit_theme_options',
        'cms-app-vuejs-content',
        'cms_app_vuejs_content_callback'
    );

    add_submenu_page(
        'cms-app-vuejs',
        'Paramètres API',
        'Paramètres API',
        'edit_theme_options',
        'cms-app-vuejs-api',
        'cms_app_vuejs_api_callback'
    );
});

// Fonction principale (dashboard)
function cms_app_vuejs_callback() {
    ?>
    <div class="wrap">
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h1 style="margin-top: 0;">CMS de l'app vuejs</h1>
            <p style="font-size: 16px; color: #555;">
                Gérez le contenu et les widgets destinés à votre application Vue.js
            </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin: 20px 0;">
            
            <!-- Card Widgets -->
            <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 40px;">📦</div>
                    <div>
                        <h3 style="margin: 0; font-size: 16px;">Widgets</h3>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">
                            Gérez les zones de widgets
                        </p>
                        <a href="<?php echo admin_url('admin.php?page=cms-app-vuejs-widgets'); ?>" class="button button-small" style="margin-top: 10px;">
                            Accéder →
                        </a>
                    </div>
                </div>
            </div>

            <!-- Card Contenu -->
            <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 40px;">📝</div>
                    <div>
                        <h3 style="margin: 0; font-size: 16px;">Contenu</h3>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">
                            Gérez les pages et articles
                        </p>
                        <a href="<?php echo admin_url('admin.php?page=cms-app-vuejs-content'); ?>" class="button button-small" style="margin-top: 10px;">
                            Accéder →
                        </a>
                    </div>
                </div>
            </div>

            <!-- Card API -->
            <div style="background: white; padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="font-size: 40px;">⚙️</div>
                    <div>
                        <h3 style="margin: 0; font-size: 16px;">Paramètres API</h3>
                        <p style="margin: 5px 0 0 0; color: #666; font-size: 13px;">
                            Configuration de l'API REST
                        </p>
                        <a href="<?php echo admin_url('admin.php?page=cms-app-vuejs-api'); ?>" class="button button-small" style="margin-top: 10px;">
                            Accéder →
                        </a>
                    </div>
                </div>
            </div>

        </div>

        <!-- Infos utiles -->
        <div style="background: #e7f3ff; border-left: 4px solid #0073aa; padding: 15px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0;"><strong>💡 Endpoint API:</strong> <code>/wp-json/custom/v1/widgets</code></p>
        </div>
    </div>
    <?php
}

// Widgets management
function cms_app_vuejs_widgets_callback() {
    ?>
    <div class="wrap">
        <h1>Gestion des Widgets</h1>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2 style="margin-top: 0;">Zones de widgets disponibles</h2>
            
            <table class="widefat striped">
                <thead>
                    <tr>
                        <th>Zone</th>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>01 - Nouveau Template</strong></td>
                        <td><code>nouveau-template-01</code></td>
                        <td>Zone pour le nouveau template</td>
                        <td><a href="<?php echo admin_url('widgets.php'); ?>" class="button button-small">Gérer</a></td>
                    </tr>
                    <tr>
                        <td><strong>Footer</strong></td>
                        <td><code>footer</code></td>
                        <td>Zone du pied de page</td>
                        <td><a href="<?php echo admin_url('widgets.php'); ?>" class="button button-small">Gérer</a></td>
                    </tr>
                    <tr>
                        <td><strong>Page Référence</strong></td>
                        <td><code>page-reference</code></td>
                        <td>Zone de la page référence</td>
                        <td><a href="<?php echo admin_url('widgets.php'); ?>" class="button button-small">Gérer</a></td>
                    </tr>
                    <tr>
                        <td><strong>Profiles</strong></td>
                        <td><code>profiles</code></td>
                        <td>Zone des profils</td>
                        <td><a href="<?php echo admin_url('widgets.php'); ?>" class="button button-small">Gérer</a></td>
                    </tr>
                </tbody>
            </table>

            <p style="margin-top: 20px;">
                <a href="<?php echo admin_url('widgets.php'); ?>" class="button button-primary">
                    Accéder à l'interface WordPress →
                </a>
            </p>
        </div>

        <!-- Infos JSON -->
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <h3>Format API retourné:</h3>
            <pre style="background: #fff; padding: 10px; border: 1px solid #ddd; overflow-x: auto;"><code>{
  "nouveau-template-01": [...],
  "footer": [...],
  "page-reference": [...],
  "profiles": [...]
}</code></pre>
        </div>
    </div>
    <?php
}

// Content management
function cms_app_vuejs_content_callback() {
    ?>
    <div class="wrap">
        <h1>Gestion du Contenu</h1>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Liens rapides vers vos contenus:</p>
            <ul style="list-style: none; padding: 0;">
                <li style="margin: 10px 0;">
                    <a href="<?php echo admin_url('edit.php'); ?>" class="button button-large">📝 Articles</a>
                </li>
                <li style="margin: 10px 0;">
                    <a href="<?php echo admin_url('edit.php?post_type=page'); ?>" class="button button-large">📄 Pages</a>
                </li>
                <li style="margin: 10px 0;">
                    <a href="<?php echo admin_url('upload.php'); ?>" class="button button-large">🖼️ Médias</a>
                </li>
            </ul>
        </div>
    </div>
    <?php
}

// API Settings
function cms_app_vuejs_api_callback() {
    ?>
    <div class="wrap">
        <h1>Paramètres API</h1>

        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h2>Configuration de l'API REST</h2>
            
            <table class="widefat striped" style="margin-top: 15px;">
                <thead>
                    <tr>
                        <th>Paramètre</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>URL de base</strong></td>
                        <td><code><?php echo home_url('/wp-json'); ?></code></td>
                    </tr>
                    <tr>
                        <td><strong>Endpoint Widgets</strong></td>
                        <td><code>/custom/v1/widgets</code></td>
                    </tr>
                    <tr>
                        <td><strong>URL complète</strong></td>
                        <td><code><?php echo home_url('/wp-json/custom/v1/widgets'); ?></code></td>
                    </tr>
                    <tr>
                        <td><strong>Accès</strong></td>
                        <td><span style="color: green;"><strong>✓ Public</strong></span></td>
                    </tr>
                </tbody>
            </table>

            <div style="background: #fff8e5; border-left: 4px solid #ffb81c; padding: 15px; margin-top: 20px; border-radius: 4px;">
                <p style="margin: 0;"><strong>📌 Note:</strong> L'API est accessible publiquement. Elle retourne le contenu de tous les widgets avec leurs données.</p>
            </div>
        </div>
    </div>
    <?php
}
//widgets qui sont affichés dans le template vue
add_action('widgets_init', function() {
	//homepage
    register_sidebar(array(
        'name'          => 'Homepage Widgets',
        'id'            => 'nouveau-template-01',
        'description'   => 'Zone de widgets pour le nouveau template',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
	//footer
	//// Nouvelle zone footer
    register_sidebar(array(
        'name'          => 'Footer',
        'id'            => 'footer',
        'description'   => 'Zone de widgets pour le footer',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
	//profiles et reference
	register_sidebar(array(
        'name'          => 'Page Référence',
        'id'            => 'page-reference',
        'description'   => 'Zone de widgets pour la page référence',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

    register_sidebar(array(
        'name'          => 'Profiles',
        'id'            => 'profiles',
        'description'   => 'Zone de widgets pour les profils',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
	register_sidebar(array(
        'name'          => 'Barre latérale droite',
        'id'            => 'sidebar-right',
        'description'   => 'Zone de widgets pour la barre latérale',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
	register_sidebar(array(
        'name'          => 'page services',
        'id'            => 'services',
        'description'   => 'Zone de widgets pour la barre latérale',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
	register_sidebar(array(
        'name'          => 'Page profile',
        'id'            => 'profile',
        'description'   => 'Zone de widgets pour la barre latérale',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));

	register_sidebar(array(
        'name'          => 'Page header',
        'id'            => 'header',
        'description'   => 'Zone de widgets pour la barre latérale',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
});
?>
<?php

/**
 * Logic Design Solutions - Company Profile Widget v3
 * Widget simple avec divs et données préremplies de la page
 */

class Logic_Company_Profile_Super_Widget extends WP_Widget {
    
    public function __construct() {
        parent::__construct(
            'logic_company_profile_super',
            'Logic - Company Profile (Super Widget)',
            array('description' => 'Widget complet de profil entreprise avec API REST')
        );
        
        add_action('admin_enqueue_scripts', array($this, 'enqueue_media_scripts'));
        add_action('rest_api_init', array($this, 'register_api_routes'));
    }

    /**
     * Charger les scripts media
     */
    public function enqueue_media_scripts($hook) {
        wp_enqueue_media();
    }

    /**
     * Affichage du widget (frontend)
     */
    public function widget($args, $instance) {
        echo $args['before_widget'];
        echo '<div id="company-profile-app"></div>';
        echo $args['after_widget'];
    }

    /**
     * Formulaire d'édition du widget (backend)
     */
    public function form($instance) {
        $this->render_form_styles();
        ?>
        <div class="logic-widget-container">
            
            <!-- SECTION: GÉNÉRALITÉS -->
            <div class="logic-section">
                <h3>Généralités</h3>
                <?php
                $this->render_field_text($instance, 'page_title', 'Titre de la page', 'Company Profile');
                $this->render_field_textarea($instance, 'meta_description', 'Description meta', 'Logic Design Solutions - FPGA Design Services, NVMe IP, SATA IP, ARINC 429 IP');
                ?>
            </div>

            <!-- SECTION: PAGE HEADER -->
            <div class="logic-section">
                <h3>Page Header</h3>
                <?php
                $this->render_field_media($instance, 'hero_bg_image', 'Image de fond', 'https://logic-design-solutions.com/wp-content/uploads/2025/11/im1-1.jpeg');
                $this->render_field_text($instance, 'hero_title', 'Titre principal', 'Company Profile');
                ?>
            </div>

            <!-- SECTION: INTRO ENTREPRISE -->
            <div class="logic-section">
                <h3>Intro Entreprise</h3>
                <?php
                $this->render_field_media($instance, 'intro_image', 'Image principale', 'https://logic-design-solutions.com/wp-content/uploads/2025/11/im1-1.jpeg');
                $this->render_field_text($instance, 'intro_tags', 'Tags (séparés par virgule)', 'FPGA Design, IP Solutions');
                $this->render_field_text($instance, 'intro_title', 'Titre section intro', 'FPGA Design Excellence Since 1994');
                $this->render_field_editor($instance, 'intro_description_1', 'Description 1', 'Logic Design Solutions is a leading provider of FPGA design services and IP solutions. With over 30 years of experience, we deliver cutting-edge technology solutions for embedded systems, data storage, and aerospace applications. Our expertise spans across multiple FPGA platforms including Xilinx, Intel, and AMD technologies.');
                $this->render_field_editor($instance, 'intro_description_2', 'Description 2', 'We specialize in developing high-performance IP cores and custom FPGA designs that meet the most demanding requirements of modern electronic systems. Our solutions are deployed in mission-critical applications worldwide, from aerospace and defense to data centers and industrial automation.');
                ?>
            </div>

            <!-- SECTION: COMPÉTENCES -->
            <div class="logic-section">
                <h3>Our Core Competencies</h3>
                <?php
                $this->render_field_editor($instance, 'competencies_description', 'Description', 'At Logic Design Solutions, we combine deep technical expertise with a customer-focused approach. Our team of experienced engineers works closely with clients to understand their unique requirements and deliver tailored solutions that exceed expectations. We pride ourselves on our ability to tackle complex design challenges and deliver innovative solutions on time and within budget.');
                ?>
            </div>

            <!-- SECTION: INNOVATION -->
            <div class="logic-section">
                <h3>Innovation & Technology</h3>
                <?php
                $this->render_field_text($instance, 'innovation_title', 'Titre section', 'Innovation & Technology Leadership');
                $this->render_field_media($instance, 'innovation_image', 'Image', 'https://logic-design-solutions.com/wp-content/uploads/2025/11/im1-1.jpeg');
                $this->render_field_text($instance, 'innovation_subtitle', 'Sous-titre image', 'Innovation & Technology Leadership');
                $this->render_field_editor($instance, 'innovation_intro', 'Introduction section', 'Our commitment to innovation drives us to continuously explore new technologies and methodologies.');
                $this->render_field_editor($instance, 'innovation_text_1', 'Texte 1', 'Our commitment to innovation drives us to continuously explore new technologies and methodologies. We invest heavily in research and development to stay at the forefront of FPGA design and IP development. This dedication ensures that our clients benefit from the latest advancements in digital design technology.');
                $this->render_field_editor($instance, 'innovation_text_2', 'Texte 2', 'We maintain strategic partnerships with leading FPGA vendors and technology providers, giving us early access to new platforms and tools. This enables us to deliver next-generation solutions that leverage the full capabilities of modern FPGA architectures.');
                ?>
            </div>

            <!-- SECTION: PORTFOLIO -->
            <div class="logic-section">
                <h3>Our Product Portfolio</h3>
                <?php
                $this->render_field_editor($instance, 'portfolio_description', 'Description intro', 'Logic Design Solutions offers a comprehensive portfolio of proven IP cores and design services. Our IP solutions include high-speed storage interfaces (NVMe, SATA), aerospace communication protocols (ARINC 429), and custom IP cores tailored to specific application requirements.');
                echo '<p><strong>Points du portfolio (un par ligne):</strong></p>';
                $this->render_field_textarea($instance, 'portfolio_points', '', 'NVMe and SATA IP Cores for High-Speed Storage
ARINC 429 Solutions for Aerospace Applications
Custom FPGA Design Services
Verification and Validation Services');
                ?>
            </div>

            <!-- SECTION: QUALITÉ & FIABILITÉ -->
            <div class="logic-section">
                <h3>Quality & Reliability</h3>
                <?php
                $this->render_field_editor($instance, 'quality_description', 'Description', 'Quality is at the heart of everything we do. Our rigorous design and verification processes ensure that every product we deliver meets the highest standards of reliability and performance. We employ industry-standard methodologies and tools to validate our designs, ensuring they perform flawlessly in real-world applications.');
                ?>
            </div>

            <!-- SECTION: CITATION -->
            <div class="logic-section">
                <h3>Citation</h3>
                <?php
                $this->render_field_editor($instance, 'quote_text', 'Texte de la citation', 'Innovation, Quality, and Customer Success - These are the pillars that have guided Logic Design Solutions for over 30 years.');
                $this->render_field_text($instance, 'quote_author', 'Auteur', 'Logic Design Solutions Team');
                ?>
            </div>

            <!-- SECTION: CONCLUSION -->
            <div class="logic-section">
                <h3>Global Reach, Local Support</h3>
                <?php
                $this->render_field_editor($instance, 'closing_description_1', 'Description 1', 'While we serve clients worldwide, we maintain a strong commitment to personalized service and support. Our team is available to assist with technical questions, design consultations, and ongoing support throughout the product lifecycle. We believe in building long-term partnerships with our clients, supporting their success from initial concept through production and beyond.');
                $this->render_field_editor($instance, 'closing_description_2', 'Description 2', 'Our location in the Paris region provides easy access to major European markets while maintaining strong connections with technology centers worldwide. This strategic positioning allows us to serve clients across multiple time zones and geographic regions effectively.');
                echo '<p><strong>Tags finaux (séparés par virgule):</strong></p>';
                $this->render_field_text($instance, 'closing_tags', '', 'FPGA Design, IP Cores, NVMe, SATA, ARINC 429');
                ?>
            </div>

        </div>
        <?php
    }

    /**
     * Mise à jour du widget
     */
    public function update($new_instance, $old_instance) {
        $instance = array();
        
        $fields = $this->get_all_field_names();
        
        foreach($fields as $field) {
            if(strpos($field, 'image') !== false || strpos($field, 'media') !== false) {
                $instance[$field] = !empty($new_instance[$field]) ? absint($new_instance[$field]) : '';
            } elseif(strpos($field, 'tags') !== false || strpos($field, 'points') !== false) {
                $instance[$field] = !empty($new_instance[$field]) ? sanitize_textarea_field($new_instance[$field]) : '';
            } else {
                $instance[$field] = !empty($new_instance[$field]) ? wp_kses_post($new_instance[$field]) : '';
            }
        }
        
        return $instance;
    }

    /**
     * Enregistrer les routes API REST
     */
    public function register_api_routes() {
        register_rest_route('logic/v1', '/company-profile', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_company_profile_data'),
            'permission_callback' => '__return_true'
        ));
    }

    /**
     * Callback API pour retourner les données du widget
     */
    public function get_company_profile_data($request) {
        $widget_options = get_option('widget_logic_company_profile_super');
        
        if(empty($widget_options)) {
            return rest_ensure_response(array('error' => 'No widget data found'));
        }

        $widget_id = array_key_first($widget_options);
        $instance = $widget_options[$widget_id] ?? array();

        $data = array(
            'general' => array(
                'page_title' => $instance['page_title'] ?? 'Company Profile',
                'meta_description' => $instance['meta_description'] ?? '',
            ),
            'hero' => array(
                'bg_image' => $this->get_image_url($instance['hero_bg_image'] ?? ''),
                'title' => $instance['hero_title'] ?? 'Company Profile',
            ),
            'intro' => array(
                'image' => $this->get_image_url($instance['intro_image'] ?? ''),
                'tags' => array_filter(array_map('trim', explode(',', $instance['intro_tags'] ?? ''))),
                'title' => $instance['intro_title'] ?? '',
                'description_1' => $instance['intro_description_1'] ?? '',
                'description_2' => $instance['intro_description_2'] ?? '',
            ),
            'competencies' => array(
                'description' => $instance['competencies_description'] ?? '',
            ),
            'innovation' => array(
                'title' => $instance['innovation_title'] ?? 'Innovation & Technology Leadership',
                'image' => $this->get_image_url($instance['innovation_image'] ?? ''),
                'subtitle' => $instance['innovation_subtitle'] ?? '',
                'intro' => $instance['innovation_intro'] ?? '',
                'text_1' => $instance['innovation_text_1'] ?? '',
                'text_2' => $instance['innovation_text_2'] ?? '',
            ),
            'portfolio' => array(
                'description' => $instance['portfolio_description'] ?? '',
                'points' => array_filter(array_map('trim', explode("\n", $instance['portfolio_points'] ?? ''))),
            ),
            'quality' => array(
                'description' => $instance['quality_description'] ?? '',
            ),
            'quote' => array(
                'text' => $instance['quote_text'] ?? '',
                'author' => $instance['quote_author'] ?? '',
            ),
            'closing' => array(
                'description_1' => $instance['closing_description_1'] ?? '',
                'description_2' => $instance['closing_description_2'] ?? '',
                'tags' => array_filter(array_map('trim', explode(',', $instance['closing_tags'] ?? ''))),
            ),
        );

        return rest_ensure_response($data);
    }

    /**
     * Récupérer l'URL d'une image par ID
     */
    private function get_image_url($image_id) {
        if(empty($image_id)) return '';
        $image = wp_get_attachment_image_src($image_id, 'full');
        return $image ? $image[0] : '';
    }

    /**
     * Récupérer tous les noms de champs
     */
    private function get_all_field_names() {
        return array(
            'page_title', 'meta_description',
            'hero_bg_image', 'hero_title',
            'intro_image', 'intro_tags', 'intro_title', 'intro_description_1', 'intro_description_2',
            'competencies_description',
            'innovation_title', 'innovation_image', 'innovation_subtitle', 'innovation_intro',
            'innovation_text_1', 'innovation_text_2',
            'portfolio_description', 'portfolio_points',
            'quality_description',
            'quote_text', 'quote_author',
            'closing_description_1', 'closing_description_2', 'closing_tags'
        );
    }

    /**
     * Rendre un champ texte
     */
    private function render_field_text($instance, $field_name, $label, $placeholder = '') {
        $value = $instance[$field_name] ?? '';
        $field_id = $this->get_field_id($field_name);
        $field_name_attr = $this->get_field_name($field_name);
        ?>
        <p>
            <label for="<?php echo esc_attr($field_id); ?>"><strong><?php echo esc_html($label); ?></strong></label>
            <input 
                class="widefat" 
                id="<?php echo esc_attr($field_id); ?>" 
                name="<?php echo esc_attr($field_name_attr); ?>" 
                type="text" 
                value="<?php echo esc_attr($value); ?>"
                placeholder="<?php echo esc_attr($placeholder); ?>">
        </p>
        <?php
    }

    /**
     * Rendre un champ textarea
     */
    private function render_field_textarea($instance, $field_name, $label, $placeholder = '') {
        $value = $instance[$field_name] ?? '';
        $field_id = $this->get_field_id($field_name);
        $field_name_attr = $this->get_field_name($field_name);
        ?>
        <p>
            <label for="<?php echo esc_attr($field_id); ?>"><strong><?php echo esc_html($label); ?></strong></label>
            <textarea
                class="widefat"
                id="<?php echo esc_attr($field_id); ?>"
                name="<?php echo esc_attr($field_name_attr); ?>"
                rows="4"
                placeholder="<?php echo esc_attr($placeholder); ?>"><?php echo esc_textarea($value); ?></textarea>
        </p>
        <?php
    }

    /**
     * Rendre un champ avec éditeur WYSIWYG
     */
    private function render_field_editor($instance, $field_name, $label, $placeholder = '') {
        $value = $instance[$field_name] ?? $placeholder;
        $field_id = $this->get_field_id($field_name);
        $field_name_attr = $this->get_field_name($field_name);
        ?>
        <p>
            <label for="<?php echo esc_attr($field_id); ?>"><strong><?php echo esc_html($label); ?></strong></label>
        </p>
        <?php
        wp_editor(
            $value,
            $field_id,
            array(
                'textarea_name' => $field_name_attr,
                'media_buttons' => false,
                'teeny' => true,
                'tinymce' => array(
                    'toolbar1' => 'bold,italic,underline,strikethrough,link,unlink,separator,undo,redo',
                    'toolbar2' => '',
                    'plugins' => 'lists,paste,wordpress'
                ),
                'quicktags' => true,
                'height' => 120
            )
        );
    }

    /**
     * Rendre un champ media/image upload
     */
    private function render_field_media($instance, $field_name, $label, $default_url = '') {
        $image_id = $instance[$field_name] ?? '';
        $field_id = $this->get_field_id($field_name);
        $field_name_attr = $this->get_field_name($field_name);
        
        $image_html = '';
        if($image_id) {
            $image_html = wp_get_attachment_image($image_id, 'thumbnail');
        } elseif($default_url) {
            $image_html = '<img src="' . esc_url($default_url) . '" alt="" style="max-width: 100%; height: auto;">';
        }
        ?>
        <p>
            <label for="<?php echo esc_attr($field_id); ?>"><strong><?php echo esc_html($label); ?></strong></label>
            <div class="logic-widget-media-preview" id="<?php echo esc_attr($field_id); ?>_preview">
                <?php echo $image_html; ?>
            </div>
            <input
                type="hidden"
                id="<?php echo esc_attr($field_id); ?>"
                name="<?php echo esc_attr($field_name_attr); ?>"
                value="<?php echo esc_attr($image_id); ?>"
                data-default-url="<?php echo esc_url($default_url); ?>">
            <div class="logic-widget-button-group">
                <button 
                    type="button" 
                    class="button button-primary logic-widget-upload-btn"
                    data-widget-id="<?php echo esc_attr($field_id); ?>">
                    📸 Importer
                </button>
                <button
                    type="button"
                    class="button logic-widget-remove-btn"
                    data-widget-id="<?php echo esc_attr($field_id); ?>"
                    <?php echo empty($image_id) ? 'style="display:none;"' : ''; ?>>
                    ✕ Supprimer
                </button>
            </div>
        </p>
        <?php
    }

    /**
     * Styles CSS du formulaire
     */
    private function render_form_styles() {
        static $styles_rendered = false;
        if($styles_rendered) return;
        $styles_rendered = true;
        ?>
        <style>
            .logic-widget-container {
                margin-top: 15px;
            }

            .logic-section {
                border: 1px solid #ddd;
                border-radius: 4px;
                margin-bottom: 15px;
                padding: 15px;
                background: #f9f9f9;
            }

            .logic-section h3 {
                margin-top: 0;
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 2px solid #0073aa;
                color: #0073aa;
                font-size: 14px;
            }

            .logic-section p {
                margin: 10px 0;
            }

            .logic-section label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #333;
            }

            .widefat {
                width: 100%;
                padding: 8px;
                border: 1px solid #ddd;
                border-radius: 4px;
                box-sizing: border-box;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                font-size: 13px;
            }

            .logic-widget-media-preview {
                margin: 10px 0;
                max-width: 150px;
                border: 2px solid #ddd;
                border-radius: 4px;
                overflow: hidden;
                background: white;
            }

            .logic-widget-media-preview img {
                max-width: 100%;
                height: auto;
                display: block;
            }

            .logic-widget-button-group {
                display: flex;
                gap: 5px;
                margin-top: 10px;
                flex-wrap: wrap;
            }

            .logic-widget-button-group button {
                flex: 1;
                min-width: 100px;
                padding: 8px 12px;
                font-size: 12px;
            }

            .wp-editor-container {
                margin-top: 5px;
            }
        </style>
        <?php
    }
}

// Enregistrer le widget
add_action('widgets_init', function() {
    register_widget('Logic_Company_Profile_Super_Widget');
});

/**
 * Enregistrer une zone de widgets "Zone de Logo"
 */
function enregistrer_zone_logo_sidebar() {
    register_sidebar(array(
        'name'          => 'Zone de Logo',
        'id'            => 'zone-logo-sidebar',
        'description'   => 'Zone pour afficher un logo. Affiche "Logic Design Solutions" si vide.',
        'before_widget' => '<div id="%1$s" class="widget zone-logo-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'enregistrer_zone_logo_sidebar');

/**
 * Afficher la zone de logo avec fallback
 */
function afficher_zone_logo() {
    echo '<div class="zone-logo-container">';
    
    if (is_active_sidebar('zone-logo-sidebar')) {
        dynamic_sidebar('zone-logo-sidebar');
    } else {
        // Fallback si aucun widget n'est placé
        echo '<span class="zone-logo-fallback">Logic Design Solutions</span>';
    }
    
    echo '</div>';
}

/**
 * Styles CSS pour la zone de logo
 */
function zone_logo_styles() {
    ?>
    <style>
        .zone-logo-container {
            display: flex;
            align-items: center;
        }
        .zone-logo-container img {
            max-width: 100%;
            height: auto;
        }
        .zone-logo-fallback {
            display: inline-block;
            font-size: 1.5em;
            font-weight: bold;
            color: #333;
            font-family: 'Arial', sans-serif;
            letter-spacing: 0.5px;
        }
    </style>
    <?php
}
add_action('wp_head', 'zone_logo_styles');