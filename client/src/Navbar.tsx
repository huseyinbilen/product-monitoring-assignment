import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, ShoppingCartOutlined, LogoutOutlined, TeamOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;

interface NavbarProps {
  onLogout: () => void;
}

function Navbar({ onLogout }: NavbarProps): JSX.Element {
  const navigate = useNavigate();

  const handleMenuClick = (path: string): void => {
    navigate(path);
  };

  const handleLogout = (): void => {
    // Logout işlemleri burada gerçekleştirilebilir
    console.log('Logout');
    navigate('/');
    onLogout();
  };

  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />} onClick={() => handleMenuClick('/home')}>
        Home Page
      </Menu.Item>
      <Menu.Item key="companies" icon={<TeamOutlined />} onClick={() => handleMenuClick('/companies')}>
        Companies
      </Menu.Item>
      <Menu.Item key="products" icon={<ShoppingCartOutlined />} onClick={() => handleMenuClick('/products')}>
        Products
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginLeft: 'auto' }}>
        Logout
      </Menu.Item>
    </Menu>
  );
}

export default Navbar;
