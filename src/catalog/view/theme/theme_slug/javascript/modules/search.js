const search = options => {
  const live_search = {
      selector: ".header-search input[name='search']",
      text_no_matches: options.text_empty,
      height: '50px'
  }

  $(live_search.selector).autocomplete({
      'source': function() {
          var filter_name = $(live_search.selector).val();
          var cat_id = 0;
          var live_search_min_length = options.module_live_search_min_length;
          if (filter_name.length < live_search_min_length) {
              $('.header-search').removeClass('header-search_opened');
          } else {
              var live_search_href = 'index.php?route=extension/module/live_search&filter_name=';
              var all_search_href = 'index.php?route=product/search&search=';

              if (cat_id > 0) {
                  live_search_href = live_search_href + encodeURIComponent(filter_name) + '&cat_id=' + Math.abs(cat_id);
                  all_search_href = all_search_href + encodeURIComponent(filter_name) + '&category_id=' + Math.abs(cat_id);
              } else {
                  live_search_href = live_search_href + encodeURIComponent(filter_name);
                  all_search_href = all_search_href + encodeURIComponent(filter_name);
              }

              const html = '<img class="header-search__loading" src="catalog/view/javascript/live_search/loading.gif" />';

              $('.header-search__suggestions').html(html);
              $('.header-search').addClass('header-search_opened');

              $.ajax({
                  url: live_search_href,
                  dataType: 'json',
                  success: function(result) {
                      var products = result.products;

                      $('.header-search__suggestions').empty();

                      if (!$.isEmptyObject(products)) {
                          var show_image       = options.module_live_search_show_image;
                          var show_price       = options.module_live_search_show_price;
                          var show_description = options.module_live_search_show_description;
                          var show_add_button  = options.module_live_search_show_add_button;

                          const suggestions = products.reduce((acc, product) => {
                            let html = '<li>';

                            if (show_add_button) {
                                html += '<div class="product-add-cart">';
                                html += '<a href="javascript:;" onclick="cart.add('+product.product_id+', '+product.minimum+');" class="btn btn-primary">';
                                html += '<i class="fa fa-shopping-cart"></i>';
                                html += '</a>';
                                html += '</div>';
                            }

                            html += '<div>';
                            html += '<a href="' + product.url + '" title="' + product.name + '">';

                            if (product.image && show_image){
                                html += '<div class="product-image"><img alt="' + product.name + '" src="' + product.image + '"></div>';
                            }

                            html += '<div class="product-name">' + product.name;

                            if (show_description){
                                html += '<p>' + product.extra_info + '</p>';
                            }

                            html += '</div>';

                            if (show_price) {
                                if (product.special) {
                                    html += '<div class="product-price"><span class="special">' + product.price + '</span><span class="price">' + product.special + '</span></div>';
                                } else {
                                    html += '<div class="product-price"><span class="price">' + product.price + '</span></div>';
                                }
                            }

                            html += '</a>';
                            html += '</div>';
                            html += '</li>';

                            return acc + html;
                          }, '')

                          const html = `
                            <ul>
                              ${suggestions}
                            </ul>
                            <a
                              href="${all_search_href}"
                              class="view-all-results"
                            >
                              ${options.text_view_all_results}(${result.total})
                            </a>
                          `

                          $('.header-search__suggestions').html(html);
                      } else {
                          let html = `
                            <span>
                              ${live_search.text_no_matches}
                            </span>
                          `
                          $('.header-search__suggestions').html(html);
                      }

                      $('.header-search').addClass('header-search_opened');

                      return false;
                  }
              });

          }
      },
      'select': function(product) {
          $(live_search.selector).val(product.name);
      }
  });

  $(document).bind('mouseup touchend', function(e){
      var container = $('.header-search__suggestions');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
          container.hide();
          $('.header-search').removeClass('header-search_opened');
      }
  });
}

module.exports = {
  search,
}
