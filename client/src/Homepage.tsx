import React, { useState, useEffect } from "react";
import { Card, Typography, Row, Col } from "antd";
import Navbar from "./Navbar";

const { Title } = Typography;

interface Company {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

function generateRandomCompanies(): Company[] {
  const companies: Company[] = [];
  for (let i = 1; i <= 10; i++) {
    companies.push({ id: i, name: `Company ${i}` });
  }
  return companies;
}

function generateRandomProducts(): Product[] {
  const products: Product[] = [];
  for (let i = 1; i <= 10; i++) {
    products.push({
      id: i,
      name: `Product ${i}`,
      price: Math.floor(Math.random() * 1000) + 1,
    });
  }
  return products;
}

function Homepage(): JSX.Element {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const generatedCompanies = generateRandomCompanies();
    const generatedProducts = generateRandomProducts();
    setCompanies(generatedCompanies);
    setProducts(generatedProducts);
  }, []);

  const latestCompanies = companies.slice(-3);
  const expensiveProducts = products
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);
  const latestProducts = products.slice(-3);

  return (
    <div>
      <Navbar></Navbar>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px" }}>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Title level={4}>Son Eklenen 3 Şirket</Title>
            {latestCompanies.map((company) => (
              <Card key={company.id}>{company.name}</Card>
            ))}
          </Col>
          <Col span={12}>
            <Title level={4}>En Pahalı 3 Ürün</Title>
            {expensiveProducts.map((product) => (
              <Card key={product.id}>
                {product.name} - ${product.price}
              </Card>
            ))}
          </Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={4}>En Son Eklenen 3 Ürün</Title>
            {latestProducts.map((product) => (
              <Card key={product.id}>{product.name}</Card>
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
