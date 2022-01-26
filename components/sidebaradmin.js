import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Sidebar = () => (
  <Nav
    className="sidebar_container flex-column position-fixed"
    activeKey="/home"
  >
    <Nav.Item className="text-center"></Nav.Item>
    <h2 className="p-5">
      <Link href="/admin/">Qualyn Admin</Link>
    </h2>

    <Nav.Item>
      <Nav.Link href="/admin/author" className="d-flex align-items-center ">
        {" "}
        <FontAwesomeIcon
          icon={faUsers}
          className="m-2 cursor s-icon"
          size="3x"
        />
        Artistes
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link className="d-flex align-items-center " href="/admin/category">
        {" "}
        <FontAwesomeIcon
          icon={faFolderOpen}
          className="m-2 cursor s-icon"
          size="3x"
        />
        Catégories
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link className="d-flex align-items-center " href="/admin/media">
        {" "}
        <FontAwesomeIcon
          icon={faPhotoVideo}
          className="m-2 cursor s-icon"
          size="3x"
        />
        Gallerie
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link className="d-flex align-items-center " href="/admin/explorer">
        {" "}
        <FontAwesomeIcon
          icon={faPhotoVideo}
          className="m-2 cursor s-icon"
          size="3x"
        />
        Explorer
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link className="d-flex align-items-center " href="/admin/blog">
        {" "}
        <FontAwesomeIcon
          icon={faNewspaper}
          className="m-2 cursor s-icon"
          size="3x"
        />
        Blog
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link className="d-flex align-items-center " href="/admin/comment">
        {" "}
        <FontAwesomeIcon
          icon={faComments}
          className="m-2 cursor s-icon"
          size="3x"
        />
        Commentaires
      </Nav.Link>
    </Nav.Item>

    <h2 className="p-5">
      <Link href="/">Website</Link>
    </h2>
  </Nav>
);

export default Sidebar;
