<?php
class ControllerCommonAjaxSearch extends Controller {
  public function index() {
    $this->load->model('catalog/product');
    $this->load->model('tool/image');

    $response = array();
    $filter_name = isset($this->request->get['filter_name']) ? $this->request->get['filter_name'] : '';
    $currency_code = $this->session->data['currency'];

    $filter_data = array(
      'filter_name' => $filter_name,
      'filter_tag' => $filter_name,
      'filter_description' => '',
      'filter_category_id' => 0,
      'filter_sub_category' => '',
      'sort' => 'p.sort_order',
      'order' => 'ASC',
      'start' => 0,
      'limit' => 5,
    );

    $results = $this->model_catalog_product->getProducts($filter_data);
    $search_result = $this->model_catalog_product->getTotalProducts($filter_data);

    $response = array(
      'status' => 'ok',
      'result' => array(
        'total' => (int)$search_result,
        'products' => array(),
      )
    );

    foreach ($results as $result) {
      if ($result['image']) {
        $image = $this->model_tool_image->resize($result['image'], 64, 64);
      } else {
        $image = $this->model_tool_image->resize('placeholder.png', 64, 64);
      }

      if ($this->customer->isLogged() || !$this->config->get('config_customer_price')) {
        $price = $this->currency->format($this->tax->calculate($result['price'], $result['tax_class_id'], $this->config->get('config_tax')), $currency_code);
      } else {
        $price = false;
      }

      if ((float)$result['special']) {
        $special = $this->currency->format($this->tax->calculate($result['special'], $result['tax_class_id'], $this->config->get('config_tax')), $currency_code);
      } else {
        $special = false;
      }

      $response['result']['products'][] = array(
        'product_id' => $result['product_id'],
        'image'      => $image,
        'name'       => strip_tags(html_entity_decode($result['name'], ENT_QUOTES, 'UTF-8')),
        'description' => strip_tags(html_entity_decode($result['description'], ENT_QUOTES, 'UTF-8')),
        'price'      => $price,
        'special'    => $special,
        'url'        => $this->url->link('product/product', 'product_id=' . $result['product_id']),
      );
    }

    $this->response->addHeader('Content-Type: application/json');
    $this->response->setOutput(json_encode($response));
  }
}

