/*! @preserve
 * Plugin Name:       Woo Align Buttons
 * Plugin URI:        https://wordpress.org/plugins/woo-align-buttons
 * Description:       A lightweight plugin to align WooCommerce "Add to cart" buttons.
 * Version:           3.6.0
 * Author:            320up
 * Author URI:        https://320up.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */
var wooAlignButtons = function() {
  (function($) {
    "use strict";
    if ($("ul.products").length) {
      $("ul.products").each(function() {
        var gridRows = [];
        var tempRow = [];
        var wooGridElements = $(this).children("li");
        wooGridElements.each(function(index) {
          if ($(this).css("clear") !== "none" && index !== 0) {
            gridRows.push(tempRow);
            tempRow = [];
          }
          tempRow.push(this);
          if (wooGridElements.length === index + 1) {
            gridRows.push(tempRow);
          }
        });
        $(gridRows).each(function() {
          var title = "h2.woocommerce-loop-product__title";
          if ($(title).length) {
            var tallestTitle = 0;
            $(this).each(function() {
              $(this).find(title).css({
                "height": "",
              });
              var titleHeightInfo = $(this).find(title).height();
              var titleSpacing = 1;
              var titleHeight = titleHeightInfo + titleSpacing;
              if (titleHeight > tallestTitle) {
                tallestTitle = titleHeight;
              }
            });
            $(this).each(function() {
              $(this).find(title).css("height", tallestTitle);
            });
            if (window.matchMedia("(max-width: 420px)").matches) {
              $(this).each(function() {
                $(this).find(title).css("height", "auto");
              });
            }
          }
          var wooheight = "#woo-height";
          var tallestWoo = 0;
          $(this).each(function() {
            $(this).find(wooheight).css({
              "min-height": "",
              "padding-bottom": ""
            });
            var wooHeightInfo = $(this).find(wooheight).height();
            var wooSpacing = 10;
            var totalHeight = wooHeightInfo + wooSpacing;
            if (totalHeight > tallestWoo) {
              tallestWoo = totalHeight;
            }
          });
          $(this).each(function() {
            $(this).find(wooheight).css("min-height", tallestWoo);
          });
          if (window.matchMedia("(max-width: 420px)").matches) {
            $(this).each(function() {
              $(this).find(wooheight).css("min-height", "0");
            });
          }
        });
      });
    }
  })(jQuery);
};
window.onload = function() {
  wooAlignButtons();
};
window.onresize = function() {
  wooAlignButtons();
};
