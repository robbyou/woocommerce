<?php
// Enqueue styles and scripts
function hello_elementor_child_enqueue_scripts() {
    // Enqueue parent theme stylesheet
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
    
    // Enqueue child theme stylesheet
    wp_enqueue_style('child-style', get_stylesheet_directory_uri() . '/style.css', array('parent-style'));
    
    // Enqueue your custom scripts and styles here
}
add_action('wp_enqueue_scripts', 'hello_elementor_child_enqueue_scripts');
/*WOOCOMMERCE*/
//remove zoom effect on product image
function remove_image_zoom_support() {
remove_theme_support( 'wc-product-gallery-zoom' );
}
add_action( 'wp', 'remove_image_zoom_support', 100 ); 
// custom product gallery
function galerie_personnalisee_shortcode_content() {
    
    ob_start();
    echo'<div style="color:red;font-size:10rem;">CUSTOM PRODUCT GALLERY</DIV>';
    if (have_posts()) {
        while (have_posts()) {
            the_post();
            wc_get_template_part('content', 'single-product');
            
            // Afficher la galerie personnalisée avec les points de navigation
            $attachment_ids = $product->get_gallery_image_ids();
            
            if ($attachment_ids) {
                echo '<div class="custom-gallery">';
                foreach ($attachment_ids as $attachment_id) {
                    $image_url = wp_get_attachment_image_url($attachment_id, 'full');
                    echo '<div class="gallery-image" style="background-image: url(' . esc_url($image_url) . ')"></div>';
                }
                echo '</div>';
                
                echo '<div class="gallery-navigation">';
                foreach ($attachment_ids as $index => $attachment_id) {
                    echo '<div class="gallery-dot" data-index="' . $index . '"></div>';
                }
                echo '</div>';
            }
        }
    }

    return ob_get_clean();
}
function galerie_personnalisee_shortcode() {
    return galerie_personnalisee_shortcode_content();
}
add_shortcode('custom-products-gallery', 'galerie_personnalisee_shortcode');
