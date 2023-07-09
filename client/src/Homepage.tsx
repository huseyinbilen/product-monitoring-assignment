import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col } from "antd";
import Navbar from "./Navbar";

const { Title } = Typography;

interface Product {
  _id: string;
  productName: string;
  productCategory: string;
  productAmount: number;
  amountUnit: string;
  company: Company;
  createdAt: Date;
}

interface Company {
  _id: string;
  companyName: string;
  companyLegalNumber: string;
  incorporationCountry: string;
  website: string;
  createdAt: Date;
}

function Homepage(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [latestCompanies, setLatestCompanies] = useState<Company[]>([]);
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [expensiveProducts, setExpensiveProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchCompanies();
    fetchProducts();
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

      const sortedCompanies = data.companies.sort(
        (a: Company, b: Company) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const latestThreeCompanies = sortedCompanies.slice(0, 3);
      setLatestCompanies(latestThreeCompanies);

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
        },
      });
      const data = await response.json();
      setProducts(data.products);
  
      // productAmount alanına göre ürünleri sırala ve en yüksek 3 ürünü ayarla
      const sortedProducts = data.products.sort(
        (a: Product, b: Product) => b.productAmount - a.productAmount
      );
      const expensiveThreeProducts = sortedProducts.slice(0, 3);
      setExpensiveProducts(expensiveThreeProducts);
  
      // createdAt alanına göre ürünleri sırala ve en yeni 3 ürünü ayarla
      const latestThreeProducts = sortedProducts.slice(0, 3);
      setLatestProducts(latestThreeProducts);
  
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  


  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Title level={4}>Recently Added Companies</Title>
            {latestCompanies.map((company) => (
              <Card key={company._id}>{company.companyName}</Card>
            ))}
          </Col>
          <Col span={12}>
            <Title level={4}>Most Expensive Products</Title>
            {expensiveProducts.map((product) => (
              <Card key={product._id}>
                {product.productName} - {product.productAmount} {product.amountUnit}
              </Card>
            ))}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4}>Recently Added Products</Title>
            {latestProducts.map((product) => (
              <Card key={product._id}>{product.productName}</Card>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
