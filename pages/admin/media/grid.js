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
import { CardAdmin } from "../../../components/cardadmin";

const Carte = (props) => {
  const a = props.media.filter((a) => a.media_id == props.name)[0];
  console.log(a);
  return (
    <CardAdmin
      key={a.media_id}
      all={a}
      title={a.media_title}
      text={a.media_subtitle}
      category={a.category.category_name}
      edit_link={`/admin/media/${a.media_id}`}
      position={a.media_position}
      preview={a.media_path.replace("./public", "")}
    ></CardAdmin>
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
  } = useSortable({ id: props.name });

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
  console.log(db_media);
  const medias = db_media.map((a, i) => a.media_id.toString());
  console.log(medias);
  console.log(people);

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
          {items.map((name, index) => (
            <SortableCard
              key={name}
              name={name}
              index={index}
              media={db_media}
            />
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
