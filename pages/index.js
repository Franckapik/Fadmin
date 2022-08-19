import {
  Environment,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import axios from "axios";
import React, { lazy, Suspense, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import prisma from "../prisma/prisma";

//chargement différé
const Gauche = lazy(() => import("./gauche"));
const Droite = lazy(() => import("./droite"));
const Camera = lazy(() => import("./camera"));
const Invisible = lazy(() => import("./invisible"));

export default function Home({ author, home, category, media, post, comment }) {
  return (
    <div className="canvas">
      <Canvas>
        <Suspense fallback={null}>
          <spotLight intensity={0.7} position={[15, 15, 15]} />
          <ScrollControls>
            <Scroll>
              <Camera />
            </Scroll>
            <Gauche></Gauche>
            <Droite></Droite>
          </ScrollControls>

          <Suspense>
            <Invisible></Invisible>
          </Suspense>
        </Suspense>
      </Canvas>
    </div>
  );
}

export async function getServerSideProps({ params, query }) {
  const author = await prisma.author.findMany({});
  const home = await prisma.home.findMany({});
  const category = await prisma.category.findMany({});
  const media = await prisma.media.findMany({});
  const comment = await prisma.comment.findMany({});
  const post = await prisma.post.findMany({});

  return {
    props: { author, home, category, media, post, comment },
  };
}
