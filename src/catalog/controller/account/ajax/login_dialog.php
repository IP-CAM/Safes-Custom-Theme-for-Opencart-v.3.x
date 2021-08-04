<?php
class ControllerAccountAjaxLoginDialog extends Controller {
  private $error = array();

  public function index() {
    $this->load->language('account/login');

    $data = array();

    return $this->load->view('account/login_dialog', $data);
  }

  public function login() {
    $this->load->model('account/customer');
    $this->load->language('account/login');

    $response = array();

    if ($this->customer->isLogged()) {
      $response['status'] = 'ok';
    } else if (isset($this->request->post) && !$this->validate()) {
      $response['status'] = 'error';
      $response['result'] = $this->error['warning'];
    }

    if (!$response) {
      $response['status'] = 'ok';

      unset($this->session->data['guest']);

      // Default Shipping Address
      $this->load->model('account/address');

      if ($this->config->get('config_tax_customer') == 'payment') {
        $this->session->data['payment_address'] = $this->model_account_address->getAddress($this->customer->getAddressId());
      }

      if ($this->config->get('config_tax_customer') == 'shipping') {
        $this->session->data['shipping_address'] = $this->model_account_address->getAddress($this->customer->getAddressId());
      }

      // Wishlist
      if (isset($this->session->data['wishlist']) && is_array($this->session->data['wishlist'])) {
        $this->load->model('account/wishlist');

        foreach ($this->session->data['wishlist'] as $key => $product_id) {
          $this->model_account_wishlist->addWishlist($product_id);

          unset($this->session->data['wishlist'][$key]);
        }
      }
    }

    $this->response->addHeader('Content-Type: application/json');
    $this->response->setOutput(json_encode($response));
  }

  protected function validate() {
    // Check how many login attempts have been made.
    $login_info = $this->model_account_customer->getLoginAttempts($this->request->post['email']);

    if ($login_info && ($login_info['total'] >= $this->config->get('config_login_attempts')) && strtotime('-1 hour') < strtotime($login_info['date_modified'])) {
      $this->error['warning'] = $this->language->get('error_attempts');
    }

    // Check if customer has been approved.
    $customer_info = $this->model_account_customer->getCustomerByEmail($this->request->post['email']);

    if ($customer_info && !$customer_info['status']) {
      $this->error['warning'] = $this->language->get('error_approved');
    }

    if ($customer_info && !$customer_info['status']) {
      $this->error['warning'] = $this->language->get('error_approved');
    }

    if (!$this->error) {
      if (!$this->customer->login($this->request->post['email'], $this->request->post['password'])) {
        $this->error['warning'] = $this->language->get('error_login');

        $this->model_account_customer->addLoginAttempt($this->request->post['email']);
      } else {
        $this->model_account_customer->deleteLoginAttempts($this->request->post['email']);
      }
    }

    return !$this->error;
  }
}
