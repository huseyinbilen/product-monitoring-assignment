import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import Navbar from "./Navbar";

interface Company {
  _id: string;
  companyName: string;
  companyLegalNumber: string;
  incorporationCountry: string;
  website: string;
}

function CompanyTable(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

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

  const addCompany = async (company: Company) => {
    try {
      console.log(company);
      const response = await fetch("http://localhost:3001/company/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          companyName: company.companyName,
          companyLegalNumber: company.companyLegalNumber,
          incorporationCountry: company.incorporationCountry,
          website: company.website
        }),
      });
      const data = await response.json();
      console.log(data);
      setCompanies([...companies, data.company]);
      // fetchCompanies();
    } catch (error) {
      console.error("Failed to add company:", error);
    }
  };

  const deleteCompany = async (id: string) => {
    try {
      console.log(id);
      await fetch(`http://localhost:3001/company/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          _id: id
        }),
      });
      const updatedCompanies = companies.filter((company) => company._id !== id);
      setCompanies(updatedCompanies);
    } catch (error) {
      console.error("Failed to delete company:", error);
    }
  };

  const updateCompany = async (company: Company) => {
    try {
      const response = await fetch(`http://localhost:3001/company/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + document.cookie.split("=")[1],
        },
        body: JSON.stringify({
          _id: company._id,
          companyName: company.companyName,
          companyLegalNumber: company.companyLegalNumber,
          incorporationCountry: company.incorporationCountry,
          website: company.website
        }),
      });
      const data = await response.json();
      const updatedCompanies = companies.map((c) => (c._id === data.id ? data : c));
      setCompanies(updatedCompanies);
      fetchCompanies();
    } catch (error) {
      console.error("Failed to update company:", error);
    }
  };

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
        const updatedCompany: Company = { ...editingCompany, ...values };
        updateCompany(updatedCompany);
      } else {
        const newCompany: Company = {
          id: String(companies.length + 1),
          ...values,
        };
        addCompany(newCompany);
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
    deleteCompany(id);
  };

  const columns = [
    { title: "Company Name", dataIndex: "companyName", key: "companyName" },
    {
      title: "Legal Number",
      dataIndex: "companyLegalNumber",
      key: "companyLegalNumber",
    },
    { title: "Country", dataIndex: "incorporationCountry", key: "incorporationCountry" },
    { title: "Website", dataIndex: "website", key: "website" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: Company) => (
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
      <div style={{ padding: "20px" }}>
        <Button type="primary" onClick={showModal}>
          Add New Company
        </Button>
        <Table dataSource={companies} columns={columns} rowKey="id" />

        <Modal
          title={editingCompany ? "Edit Company" : "Add New Company"}
          visible={visible}
          onCancel={handleCancel}
          onOk={handleSubmit}
          destroyOnClose
        >
          <Form form={form} layout="vertical">
            <Form.Item
              label="Company Name"
              name="companyName"
              rules={[{ required: true, message: "Please enter the company name" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Legal Number"
              name="companyLegalNumber"
              rules={[
                { required: true, message: "Please enter the legal number" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name="incorporationCountry"
              rules={[{ required: true, message: "Please enter the country" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Website"
              name="website"
              rules={[{ required: true, message: "Please enter the website" }]}
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
