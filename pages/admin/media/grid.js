import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
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
  verticalListSortingStrategy, // <== doesn't break if this is rectSortingStrategy
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

import people from "./people";
import prisma from "../../../prisma/prisma";
import { Card } from "react-bootstrap";

const Carte = (props) => {
  return (
    <div>
      <Card className="card-admin">
        <Card.Body className="text-center">
          <Card.Title>{props.media.media_title}</Card.Title>

          <Card.Text>{props.index}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

const SortableCard = (props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.media });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      faded={isDragging}
      {...props}
      {...attributes}
      {...listeners}
    >
      <Carte {...props} />
    </div>
  );
};

const CardsWrapper = ({ children }) => {
  return <div className="card-wrapper">{children}</div>;
};

const Grid = ({ db_media }) => {
  const medias = db_media.map((a, i) => a);

  const [items, setItems] = useState(medias);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <CardsWrapper>
          {items.map((a, i) => (
            <SortableCard key={a.media_id} media={a} index={i} />
          ))}
        </CardsWrapper>
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
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

  return {
    props: { db_media },
  };
}
