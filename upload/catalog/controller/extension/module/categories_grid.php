<?php
class ControllerExtensionModuleCategoriesGrid extends Controller {
	public function index() {
		$this->load->language('extension/module/categories_grid');
		$this->load->model('catalog/category');
		$this->load->model('catalog/product');
		$this->load->model('tool/image');
		$data['categories'] = array();
		$categories = $this->model_catalog_category->getCategories(0);
		foreach ($categories as $category) {
			if ($category['top']) {
				if ($category['image']) {
					$image = $this->model_tool_image->resize($category['image'], $this->config->get('theme_' . $this->config->get('config_theme') . '_image_category_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_category_height'));
				} else {
					$image = $this->model_tool_image->resize('placeholder.png', $this->config->get('theme_' . $this->config->get('config_theme') . '_image_category_width'), $this->config->get('theme_' . $this->config->get('config_theme') . '_image_category_height'));
				}
				$data['categories'][] = array(
					'description' => $category['description'],
					'name' => $category['name'],
					'image' => $image,
					'href' => $this->url->link('product/category', 'path=' . $category['category_id'])
				);
			}
    }
		return $this->load->view('extension/module/categories_grid', $data);
	}
}