import { Button, Col, Container, Nav, Row } from "react-bootstrap";

const Sidebar = () => (
  <Col xs={2}>
    <Nav className="d-none d-md-block sidebar" activeKey="/home">
      <div className="sidebar-sticky"></div>
      <Nav.Item>
        <Nav.Link>
          <img src="/logo/logo.png" className="logo" alt=""></img>
        </Nav.Link>
      </Nav.Item>
      <h2 className="p-5" style={{ color: "white" }}>
        Qualin Admin
      </h2>

      <Nav.Item>
        <Nav.Link href="/admin/author">Artistes</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/category">Catégories</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/admin/media">Gallerie</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Blog</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
    </Nav>
  </Col>
);

export default Sidebar;
