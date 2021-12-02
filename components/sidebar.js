import { Nav } from "react-bootstrap";

const Sidebar = () => (
  <Nav className="sidebar flex-column position-fixed" activeKey="/home">
    <Nav.Item className="text-center">
      {/*       <Nav.Link>
        <img src="/logo/logo.png" className="logo" alt=""></img>
      </Nav.Link> */}
    </Nav.Item>
    <h2 className="p-5" style={{ color: "white" }}>
      <a href="/admin/">Qualyn Admin</a>
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
);

export default Sidebar;
