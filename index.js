jQuery(document).ready(function( $ ){
    //button landing page phantom
    // Button Variables
    const resilienceDescription = jQuery('.resilience-description');
    const durabilityDescription = jQuery('.durability-description');
    const resilienceBtn = jQuery('#resilience');
    const durabilityBtn = jQuery('#durability');

    // Show the great form and hide the rating container
    resilienceBtn.click((e) => {
        e.preventDefault();
        resilienceDescription.toggle();
        resilienceDescription.prev().toggle();
    });
    // Show the bad form and hide the rating container
    durabilityBtn.click((e) => {
        e.preventDefault();
        durabilityDescription.toggle();
        durabilityDescription.prev().toggle();
    });
    // woocommerce single product gallery nav handle
//     $('.gallery-dot').click(function() {
//         var index = $(this).data('index');
//         $('.gallery-image').hide().eq(index).fadeIn();
//         $('.gallery-dot').removeClass('active').eq(index).addClass('active');
//     });
    //product page
    //verification des stocks des variation et application du style
    function setVariationsStock(variations){
        for (let i = 0; i < variations.length; i++) {
            const variation = variations[i];
            if (variation.attributes) {
                if (variation.attributes.is_in_stock === false) {
                    $(".customVariationOptions .variation-option").addClass("strikethrough");
                    console.log('variation stock all set');
                }
            }
        }
    }
    
    // prix total dans le bouton
    var kimonoPrice ;
    let patchCurrentPrice ; 
    var isSizeSelected = false;
    $(".wc-pao-addon-image-swatch").click(function(){
        if (!isSizeSelected){
            $(".sizeAttributeErrorMessage").show();
        }else{
            patchCurrentPrice = 0;
            console.log("data price",$(this).attr("data-price"));
            let dataString = $(this).attr("data-price");
            let tDataString = dataString.split('">');
            //console.log("result", tDataString.filter(function(dataText){typeof(parseInt(dataText)) == 	'number'}));
            for( var i = 0; i < tDataString.length; i++ ){
                tDataString[i] = parseInt(tDataString[i]);
                tDataString[i] ? patchCurrentPrice = tDataString[i] : console.log("falsy", tDataString[i]);
            }
            isNaN(patchCurrentPrice) ? patchCurrentPrice = 0 : console.log("patchCurrentPrice ", patchCurrentPrice);
            console.log("kimono price", kimonoPrice);
            let newKimonoPrice = patchCurrentPrice + kimonoPrice+",00 €";
            console.log("new price", newKimonoPrice);
            $(".priceFromAddon bdi").text(newKimonoPrice);
        }
    })
    // obtenir l'ID de la varation en fonction de l'attribut size(taille)
    const productVariationsData = JSON.parse($(".variations_form.cart").attr("data-product_variations"));
    setVariationsStock(productVariationsData);
    function getVariationDataByAttribute(variations, attributeValue) {
        for (let i = 0; i < variations.length; i++) {
            const variation = variations[i];
            if (variation.attributes && variation.attributes.attribute_pa_sizes) {
                if (variation.attributes.attribute_pa_sizes === attributeValue) {
                    return {
                            "variationID":variation.variation_id,
                            "variationStock":variation.is_in_stock,
                            "variationPrice":variation.display_price
                    }
                }
            }
        }
        return null; // Retourne null si aucune correspondance n'est trouvée.
    }
    //console.log("productData ",productVariationsData) ;
    //activer le button add to cart
    $('.customVariationOptions .variation-option').click(function(e){
        e.preventDefault();
        isSizeSelected = true;
        isSizeSelected ? $(".sizeAttributeErrorMessage").hide() : console.log("isSelected ",isSizeSelected);
        const clickedVariation = $(this).attr("value");
        console.log("clickedVariation ", clickedVariation);
        const clickedVariationID = getVariationDataByAttribute(productVariationsData,clickedVariation).variationID;
        console.log("clickedVariationID ", clickedVariationID.variationID);
        kimonoPrice = getVariationDataByAttribute(productVariationsData,clickedVariation).variationPrice;
        console.log("kimonoPrice ",kimonoPrice);
        if(clickedVariation != null ){
            $(".woocommerce-variation-add-to-cart [name='variation_id']").attr("value",clickedVariationID);
            $(".single_add_to_cart_button").removeClass("disabled");
        }
    })
});
    
    