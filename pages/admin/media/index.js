import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardAdmin } from "../../../components/cardadmin";
import prisma from "../../../prisma/prisma";
import { Button, Modal, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import Layout_Admin from "../../../layouts/layout_admin";

const SortableCard = (props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.name });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const a = props.media.filter((a) => a.media_id == props.name)[0];

  return (
    <div
      ref={setNodeRef}
      style={style}
      faded={isDragging}
      {...attributes}
      {...listeners}
    >
      {props.artist === a.author.author_name || props.artist === "all" ? (
        <CardAdmin
          key={a.media_id}
          all={a}
          title={a.media_title}
          text={a.media_subtitle}
          category={a.category.category_name}
          edit_link={`/admin/media/${a.media_id}`}
          position={a.media_position}
          preview={a.media_path.replace("./public", "")}
          setShow={props.setShow}
          show={props.show}
          setSelected={props.setSelected}
        ></CardAdmin>
      ) : null}
    </div>
  );
};

const Grid = ({ db_media, db_home }) => {
  const medias = db_media.map((a, i) => a.media_id.toString()); //if no items saved
  const [items, setItems] = useState(
    db_home.home_media_position.split(",") || medias
  );
  const [artist, setArtist] = useState("all");
  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor)
  );

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  const onDelete = async (data) => {
    await axios
      .post("/api/media/deleteMedia", { id: data })
      .then((response) => {
        console.log(response);
        setShow(!show);
        router.push(
          "/admin/media?operation=supprimé&type=media&value=" +
            response.data.media_title
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post("/api/media/position", {
        items: items,
      })
      .then((response) => {
        console.log(response);
      });
  }, [items]);

  const authors = [
    ...new Set(db_media.map((a, i) => a.author.author_name)),
  ].sort((a, b) => a - b);

  return (
    <Layout_Admin title={"Medias"}>
      <CardAdmin
        title={"Ajouter un média"}
        text={"____"}
        edit_link={"/admin/media/create"}
        add
        hor
      ></CardAdmin>
      <Navbar className="mb-2" bg="light" expand="lg">
        <Container>
          <Navbar.Brand className={"cursor"} onClick={() => setArtist("all")}>
            Artistes
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            {authors.map((a, i) => {
              return (
                <Nav.Link key={i} onClick={() => setArtist(a)}>
                  {a}
                </Nav.Link>
              );
            })}
          </Nav>
        </Container>
      </Navbar>

      <DndContext
        autoScroll={false}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={horizontalListSortingStrategy}>
          <div className="card-wrapper">
            {items.map((name, index) => (
              <SortableCard
                key={name}
                name={name}
                index={index}
                media={db_media}
                artist={artist}
                setShow={setShow}
                show={show}
                setSelected={setSelected}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton className="cursor"></Modal.Header>
        <Modal.Body className="text-center">
          {" "}
          <p>
            Etes vous certain de vouloir supprimer le media{" "}
            {selected.media_title || selected.category?.category_name} ?
          </p>
          <Button
            variant="danger"
            className="m-3 mb-3"
            onClick={() => onDelete(selected.media_id)}
          >
            {" "}
            CONFIRMER
          </Button>
          <Button
            variant="primary"
            className="m-3 mb-3"
            onClick={() => setShow(!show)}
          >
            {" "}
            ANNULER
          </Button>
        </Modal.Body>
      </Modal>
    </Layout_Admin>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
      console.log(items);
    }
  }
};

export default Grid;

export async function getServerSideProps(ctx) {
  const db_media = await prisma.media.findMany({
    include: {
      category: true,
      author: true,
    },
  });

  const db_home = await prisma.home.findUnique({
    where: {
      home_id: 1,
    },
  });

  return {
    props: { db_media, db_home },
  };
}
