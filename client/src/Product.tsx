import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import Navbar from "./Navbar";

const { Option } = Select;

interface Product {
  _id: string;
  productName: string;
  productCategory: string;
  productAmount: number;
  amountUnit: string;
  company: Company;
}

interface Company {
  _id: string;
  companyName: string;
  companyLegalNumber: string;
  incorporationCountry: string;
  website: string;
}

function ProductTable(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchCompanies();
    fetchProducts();
  }, []);

  const showModal = (): void => {
    setVisible(true);
  };

  const handleCancel = (): void => {
    setVisible(false);
    setEditingProduct(null);
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:3001/company/get-companies", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        }
      });
      const data = await response.json();
      setCompanies(data.companies);
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch companies:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3001/product/get-products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        }
      });
      const data = await response.json();
      setProducts(data.products);
      console.log(data)
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const response = await fetch("http://localhost:3001/product/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          productName: product.productName,
          productCategory: product.productCategory,
          productAmount: product.productAmount,
          amountUnit: product.amountUnit,
          company: product.company
        }),
      });
      const data = await response.json();
      console.log(data);
      setProducts([...products, data.product]);
      // fetchCompanies();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      console.log(id);
      await fetch(`http://localhost:3001/product/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          _id: id
        }),
      });
      const updatedProducts = products.filter((product) => product._id !== id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  }

  const updateProduct = async (product: Product) => {
    try {
      const response = await fetch(`http://localhost:3001/product/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          _id: product._id,
          productName: product.productName,
          productCategory: product.productCategory,
          productAmount: product.productAmount,
          amountUnit: product.amountUnit,
          company: product.company

        }),
      });
      const data = await response.json();
      const updatedProducts = products.map((c) => (c._id === data.id ? data : c));
      setProducts(updatedProducts);
      fetchProducts();
    } catch (error) {
      console.error("Failed to update products:", error);
    }
  }

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      if (editingProduct) {
        const updatedProduct: Product = { ...editingProduct, ...values };
        updateProduct(updatedProduct);
      } else {
        const newProduct: Product = {
          id: String(products.length + 1),
          ...values,
        };
        addProduct(newProduct);
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
    deleteProduct(id);
  };

  const columns = [
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Product Category", dataIndex: "productCategory", key: "productCategory" },
    { title: "Product Amount", dataIndex: "productAmount", key: "productAmount" },
    { title: "Amount Unit", dataIndex: "amountUnit", key: "amountUnit" },
    { title: "Company", dataIndex: "company", key: "company",
    render: (text: string, record: Product) => record.company?.companyName,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Delete
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
          Add New Product
        </Button>
        <Table dataSource={products} columns={columns} rowKey="id" />

        <Modal
          title={editingProduct ? "Edit Product" : "Add New Product"}
          visible={visible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: "Please enter the product name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Category"
              name="productCategory"
              rules={[{ required: true, message: "Please select the product category" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Product Amount"
              name="productAmount"
              rules={[{ required: true, message: "Please enter the product amount" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Amount Unit"
              name="amountUnit"
              rules={[{ required: true, message: "Please select the amount unit" }]}
            >
              <Select>
                <Option value="TRY">TRY</Option>
                <Option value="USD">USD</Option>
                <Option value="EUR">EUR</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Company"
              name="company"
              rules={[{ required: true, message: "Please enter the company" }]}
            >
              <Select>
                {companies.map((company) => (
                  <Option key={company._id} value={company._id.toString()}>
                    {company.companyName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default ProductTable;
