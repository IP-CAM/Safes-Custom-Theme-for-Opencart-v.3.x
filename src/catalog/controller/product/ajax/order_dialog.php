<?php
class ControllerProductAjaxOrderDialog extends Controller {
  public function index($data) {
    $this->load->language('checkout/checkout');

    return $this->load->view('product/order_dialog', $data);
  }

  public function validate() {
    $this->load->language('checkout/cart');
    $this->load->model('catalog/product');

    $response = array();

    if (isset($this->request->post['product_id'])) {
      $product_id = (int)$this->request->post['product_id'];

      $product = $this->model_catalog_product->getProduct($product_id);

      if (isset($this->request->post['option'])) {
        $options = array_filter($this->request->post['option']);
      } else {
        $options = array();
      }

      $product_options = $this->model_catalog_product->getProductOptions($this->request->post['product_id']);

      foreach ($product_options as $product_option) {
        if ($product_option['required'] && empty($options[$product_option['product_option_id']])) {
          $response['error']['option'][$product_option['product_option_id']] = sprintf($this->language->get('error_required'), $product_option['name']);
        }
      }

      $this->response->addHeader('Content-Type: application/json');
      $this->response->setOutput(json_encode($response));
    } else {
      $response['status'] = 'error'; // TODO

      $this->response->addHeader('Content-Type: application/json');
      $this->response->setOutput(json_encode($response));
    }
  }

  public function checkout() {
    $data = [];

    $product_id = (int)$this->request->post['product_id'];

    $this->load->model('catalog/product');
    $data['product'] = $this->model_catalog_product->getProduct($product_id);

    $data['customer'] = $this->request->post['customer'];
    $data['tel'] = $this->request->post['tel'];
    $data['comment'] = $this->request->post['comment'];

    $data['language_id'] = $this->config->get('config_language_id');


    $data['currency_id'] = $this->load->model('localisation/currency');
    $currency = $this->model_localisation_currency->getCurrencyByCode($this->session->data['currency']);
    $data['currency_code'] = $currency['code'];
    $data['currency_id'] = $currency['currency_id'];


    $data['quantity'] = 1;
    $data['store_id'] = $this->config->get('config_store_id');
    $data['invoice_prefix'] = $this->config->get('config_invoice_prefix');
    $data['store_name'] = $this->config->get('config_name');
    $data['store_url'] = $this->config->get('config_url');
    $data['customer_group_id'] = $this->config->get('config_customer_group_id');

    $data['order_status_id'] = 1;

    $this->load->model('checkout/ajax');
    $status = $this->model_checkout_ajax->addOrder($data);

    $this->response->setOutput(json_encode($status));
  }
}
