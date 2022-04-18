import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faFolderPlus,
  faHouseUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { faComments } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faPhotoVideo } from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => (
  <Nav className="sidebar_container flex-column" activeKey="/home">
    <OverlayTrigger
      placement="right"
      key={"admin"}
      overlay={<Tooltip id="button-tooltip-2">Administration</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link href="/admin/" className="d-flex align-items-center ">
          {" "}
          <FontAwesomeIcon
            icon={faHouseUser}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>

    <OverlayTrigger
      placement="right"
      key={"artist"}
      overlay={<Tooltip id="button-tooltip-2">Artistes</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link href="/admin/author" className="d-flex align-items-center ">
          {" "}
          <FontAwesomeIcon
            icon={faUsers}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>

    <OverlayTrigger
      placement="right"
      key={"categ"}
      overlay={<Tooltip id="button-tooltip-2">Catégories</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link className="d-flex align-items-center " href="/admin/category">
          {" "}
          <FontAwesomeIcon
            icon={faFolderOpen}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>
    <OverlayTrigger
      placement="right"
      key={"gallery"}
      overlay={<Tooltip id="button-tooltip-2">Gallerie</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link className="d-flex align-items-center " href="/admin/media">
          {" "}
          <FontAwesomeIcon
            icon={faPhotoVideo}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>

    <OverlayTrigger
      placement="right"
      key={"explorer"}
      overlay={<Tooltip id="button-tooltip-2">Explorer</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link className="d-flex align-items-center " href="/admin/explorer">
          {" "}
          <FontAwesomeIcon
            icon={faFolderPlus}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>
    <OverlayTrigger
      placement="right"
      key={"blog"}
      overlay={<Tooltip id="button-tooltip-2">Blog</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link className="d-flex align-items-center " href="/admin/blog">
          {" "}
          <FontAwesomeIcon
            icon={faNewspaper}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>

    <OverlayTrigger
      placement="right"
      key={"com"}
      overlay={<Tooltip id="button-tooltip-2">Commentaires</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link className="d-flex align-items-center " href="/admin/comment">
          {" "}
          <FontAwesomeIcon
            icon={faComments}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>

    <OverlayTrigger
      placement="right"
      key={"website"}
      overlay={<Tooltip id="button-tooltip-2">Website</Tooltip>}
    >
      <Nav.Item>
        <Nav.Link className="d-flex align-items-center " href="/">
          {" "}
          <FontAwesomeIcon
            icon={faDesktop}
            className="m-2 cursor s-icon"
            size="3x"
          />
        </Nav.Link>
      </Nav.Item>
    </OverlayTrigger>
  </Nav>
);

export default Sidebar;
