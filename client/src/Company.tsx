import React, { useState } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import Navbar from "./Navbar";

interface Company {
  id: string;
  name: string;
  legalNumber: string;
  country: string;
  website: string;
}

function CompanyTable(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const showModal = (): void => {
    setVisible(true);
  };

  const handleCancel = (): void => {
    setVisible(false);
    setEditingCompany(null);
  };

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      if (editingCompany) {
        const updatedCompanies = companies.map((company) =>
          company.id === editingCompany.id ? { ...company, ...values } : company
        );
        setCompanies(updatedCompanies);
      } else {
        const newCompany: Company = {
          id: String(companies.length + 1),
          ...values,
        };
        setCompanies([...companies, newCompany]);
      }
      form.resetFields();
      setVisible(false);
      setEditingCompany(null);
    });
  };

  const handleEdit = (record: Company): void => {
    form.setFieldsValue(record);
    setEditingCompany(record);
    setVisible(true);
  };

  const handleDelete = (id: string): void => {
    const updatedCompanies = companies.filter((company) => company.id !== id);
    setCompanies(updatedCompanies);
  };

  const columns = [
    { title: "Şirket Adı", dataIndex: "name", key: "name" },
    {
      title: "Şirket Yasal Numarası",
      dataIndex: "legalNumber",
      key: "legalNumber",
    },
    { title: "Kuruluş Ülkesi", dataIndex: "country", key: "country" },
    { title: "Web Sitesi", dataIndex: "website", key: "website" },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: Company) => (
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
      <Navbar></Navbar>
      <div style={{ padding: "20px" }}>
        <Button type="primary" onClick={showModal}>
          Yeni Şirket Ekle
        </Button>
        <Table dataSource={companies} columns={columns} rowKey="id" />

        <Modal
          title={editingCompany ? "Şirket Düzenle" : "Yeni Şirket Ekle"}
          visible={visible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Şirket Adı"
              name="name"
              rules={[{ required: true, message: "Şirket adını girin" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şirket Yasal Numarası"
              name="legalNumber"
              rules={[
                { required: true, message: "Şirket yasal numarasını girin" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Kuruluş Ülkesi"
              name="country"
              rules={[{ required: true, message: "Kuruluş ülkesini girin" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Web Sitesi"
              name="website"
              rules={[{ required: true, message: "Web sitesini girin" }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default CompanyTable;
