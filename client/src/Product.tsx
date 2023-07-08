import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import Navbar from "./Navbar";

const { Option } = Select;

interface Product {
  id: string;
  name: string;
  category: string;
  amount: number;
  currency: string;
  company: string;
}

function ProductTable(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const showModal = (): void => {
    setVisible(true);
  };

  const handleCancel = (): void => {
    setVisible(false);
    setEditingProduct(null);
  };

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        const updatedProducts = products.map((product) =>
          product.id === editingProduct.id ? { ...product, ...values } : product
        );
        setProducts(updatedProducts);
      } else {
        const newProduct: Product = {
          id: String(products.length + 1),
          ...values,
        };
        setProducts([...products, newProduct]);
      }
      form.resetFields();
      setVisible(false);
      setEditingProduct(null);
    });
  };

  const handleEdit = (record: Product): void => {
    form.setFieldsValue(record);
    setEditingProduct(record);
    setVisible(true);
  };

  const handleDelete = (id: string): void => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
  };

  const columns = [
    { title: "Ürün Adı", dataIndex: "name", key: "name" },
    { title: "Ürün Kategorisi", dataIndex: "category", key: "category" },
    { title: "Ürün Tutarı", dataIndex: "amount", key: "amount" },
    { title: "Tutar Birimi", dataIndex: "currency", key: "currency" },
    { title: "Şirket", dataIndex: "company", key: "company" },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Düzenle
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Sil
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      {/* <Navbar></Navbar> */}
      <div style={{ padding: "20px" }}>
        <Button type="primary" onClick={showModal}>
          Yeni Ürün Ekle
        </Button>
        <Table dataSource={products} columns={columns} rowKey="id" />

        <Modal
          title={editingProduct ? "Ürün Düzenle" : "Yeni Ürün Ekle"}
          visible={visible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Ürün Adı"
              name="name"
              rules={[{ required: true, message: "Ürün adını girin" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ürün Kategorisi"
              name="category"
              rules={[{ required: true, message: "Ürün kategorisini seçin" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Ürün Tutarı"
              name="amount"
              rules={[{ required: true, message: "Ürün tutarını girin" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Tutar Birimi"
              name="currency"
              rules={[{ required: true, message: "Tutar birimini seçin" }]}
            >
              <Select>
                <Option value="TRY">TRY</Option>
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Şirket"
              name="company"
              rules={[{ required: true, message: "Şirketi girin" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default ProductTable;
