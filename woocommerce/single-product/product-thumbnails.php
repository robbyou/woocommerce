<?php
/**
 * Single Product Thumbnails
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-thumbnails.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see         https://docs.woocommerce.com/document/template-structure/
 * @package     WooCommerce\Templates
 * @version     3.5.1
 */

defined( 'ABSPATH' ) || exit;

// Note: `wc_get_gallery_image_html` was added in WC 3.3.2 and did not exist prior. This check protects against theme overrides being used on older versions of WC.
if ( ! function_exists( 'wc_get_gallery_image_html' ) ) {
	return;
}

global $product;

// Récupérez les identifiants des images de galerie du produit
$attachment_ids = $product->get_gallery_image_ids();

if ($attachment_ids) {
    ?>
    <div class="product-image-slider">
        <div class="slider-for">
            <?php
            // Image principale du produit
            echo '<div class="product-main-image">';
            the_post_thumbnail('woocommerce_single');
            echo '</div>';

            // Images de la galerie
            foreach ($attachment_ids as $attachment_id) {
                echo '<div>';
                echo wp_get_attachment_image($attachment_id, 'woocommerce_single');
                echo '</div>';
            }
            ?>
        </div>

        <div class="slider-nav">
            <?php
            // Affichez les miniatures des images de la galerie en tant que navigation
            echo '<div>';
            the_post_thumbnail('woocommerce_thumbnail');
            echo '</div>';

            foreach ($attachment_ids as $attachment_id) {
                echo '<div>';
                echo wp_get_attachment_image($attachment_id, 'woocommerce_thumbnail');
                echo '</div>';
            }
            ?>
        </div>
    </div>


    <?php
}
?>