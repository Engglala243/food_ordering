import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import {
  Animator,
  ScrollContainer,
  ScrollPage,
  batch,
  Fade,
  FadeIn,
  FadeOut,
  Move,
  MoveIn,
  MoveOut,
  Sticky,
  StickyIn,
  StickyOut,
  Zoom,
  ZoomIn,
  ZoomOut,
} from "react-scroll-motion";
import Footer from "../Components/Footer";

const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());

const Home = () => {
  return (
    <>
      <ScrollContainer>
        <Header />
        <ScrollPage>
          <Animator animation={ZoomInScrollOut}>
            <Outlet />
          </Animator>
        </ScrollPage>
      </ScrollContainer>
      <Footer />
    </>
  );
};

export default Home;
