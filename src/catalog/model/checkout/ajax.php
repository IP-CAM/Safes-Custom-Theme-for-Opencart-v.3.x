<?php
class ModelCheckoutAjax extends Model {
  public function addOrder($data) {
    $this->db->query("INSERT INTO `" . DB_PREFIX . "order` SET
      invoice_prefix = '" . $this->db->escape($data['invoice_prefix']) . "',
      store_id = '" . (int)$data['store_id'] . "',
      store_name = '" . $this->db->escape($data['store_name']) . "',
      store_url = '" . $this->db->escape($data['store_url']) . "',
      customer_id = '0',
      customer_group_id = '" . $data['customer_group_id'] . "',
      firstname = '" . $data['customer'] . "',
      telephone = '" . $data['tel'] . "',
      language_id = '" . (int)$data['language_id'] . "',
      currency_id = '" . (int)$data['currency_id'] . "',
      currency_code = '" . $data['currency_code'] . "',
      comment = '" . $data['comment'] . "',
      order_status_id = '" . (int)$data['order_status_id'] . "',
      date_added = NOW(), date_modified = NOW()");

      $order_id = $this->db->getLastId();

      $this->db->query("INSERT INTO " . DB_PREFIX . "order_product SET
      order_id = '" . (int)$order_id . "',
      product_id = '" . $data['product']['product_id'] . "',
      name = '" . $data['product']['name'] . "',
      model = '" . $data['product']['model'] . "',
      quantity = '" . (int)$data['quantity'] . "',
      price = '" . (float)$data['product']['price'] . "',
      total = '" . (float)$data['product']['price'] . "'
      ");

      $this->db->query("INSERT INTO " . DB_PREFIX . "order_total SET
      order_id = '" . (int)$order_id . "',
      code = 'sub_total',
      title = 'Итого',
      `value` = '" . (float)$data['product']['price'] . "',
      sort_order = '0'
      ");

      $this->db->query("INSERT INTO " . DB_PREFIX . "order_history SET
      order_id = '" . (int)$order_id . "',
      order_status_id = '1',
      notify = '0',
      date_added = NOW()
      ");

    return $order_id;
  }

}
