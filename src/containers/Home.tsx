import React, { useEffect, useRef, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/src/locomotive-scroll.scss";
import { timeline, animate, stagger } from "motion";
import imagesLoaded from "imagesloaded";
import Header from '../components/Header'
import ContactButton from "../components/ContactButton";
import MenuManager from "../components/Menu/MenuManager";
import heroPic from '../assets/IMG_8996.jpeg';
import "../styles/home.scss";
import { TimelineDefinition } from "@motionone/dom/types/timeline/types";
import useLocomotiveScroll from "../hooks/useLocomotiveScroll";

const preloadImages = (selector: string) => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

function getSectionHeight(element: HTMLUListElement) {
  const { height } = element.getBoundingClientRect();
  const { childElementCount } = element;
  return height / childElementCount;
}
export default function Home() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const countRef = useRef<HTMLUListElement | null>(null);
  const countRef2 = useRef<HTMLUListElement | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [locomotiveRef] = useLocomotiveScroll({
    ref: scrollRef,
    smooth: true,
    smoothMobile: true,
  });

  useEffect(() => {
    // Preload images
    Promise.all([preloadImages(".grid-item-media")]).then(() => {
      if (locomotiveRef.current) {
        locomotiveRef.current.update();
      }
    });
  }, []);

  useEffect(() => {
    if (countRef.current && countRef2.current && loaderRef.current) {
      const transformAmount = getSectionHeight(countRef.current);

      const sequence1 = new Array(3).fill("").flatMap((_, index) => [
        [countRef.current, { y: `-${transformAmount * (index + 1)}px` }],
        [
          countRef2.current,
          { y: `-${transformAmount * (index + 1)}px` },
          { at: "-1.8" },
        ],
      ]) as TimelineDefinition;

      timeline(sequence1, {
        defaultOptions: { easing: [0.77, 0, 0.175, 1], duration: 2 },
      });
    }
  }, []);

  useEffect(() => {
    const sequence2: TimelineDefinition = [
      [titleRef.current, { y: 100 }],
      [imageRef.current, { scale: 1.2 }, { at: "<" }],
      [countRef.current, { opacity: 0 }, { at: "<" }],
      [countRef2.current, { opacity: 0 }, { at: "<" }],
      [loaderRef.current, { y: "-100vh" }, { at: "-0.5" }],
      [titleRef.current, { y: 0 }, { at: "-.5" }],
      [imageRef.current, { scale: 1 }, { at: "<" }],
    ] as TimelineDefinition;

    timeline(sequence2, {
      defaultOptions: { easing: [0.77, 0, 0.175, 1], duration: 1, delay: 7 },
    });
  }, []);

  return (
		<>
			<>
      <MenuManager>
      <Header />
				<div className='loader-container' ref={loaderRef}>
					<div className='counter-container'>
						<ul className='counter-list' ref={countRef}>
							<li>
								<h3>2</h3>
							</li>
							<li>
								<h3>4</h3>
							</li>
							<li>
								<h3>6</h3>
							</li>
							<li>
								<h3>9</h3>
							</li>
						</ul>
					</div>

					<div className='counter-container'>
						<ul className='counter-list' ref={countRef2}>
							<li>
								<h3>3</h3>
							</li>
							<li>
								<h3>9</h3>
							</li>
							<li>
								<h3>8</h3>
							</li>
							<li>
								<h3>9</h3>
							</li>
						</ul>
					</div>
				</div>
				<div
					className='main-container'
					id='main-container'
					data-scroll-container
					ref={scrollRef}>
					<div className='hero-container'>
						<div data-scroll data-scroll-speed='-8' className='hero-image'>
							<img
								className='grid-item-media'
								ref={imageRef}
								src={heroPic}
                alt='jake and friends'
							/>
						</div>
						<div data-scroll data-scroll-speed='-5' className='hero-title'>
							<h3 ref={titleRef}>my creativity is<br />a reflection of me</h3>
						</div>
					</div>

					<div className='intro-container' data-scroll data-scroll-speed='0'>
						<p>
							<a
								href='https://github.com/DaCodeWiz'
								target='_blank'
								rel='noopener noreferrer'>
								I just wanted to try out this effect inspired by Nicu Barbaros
								and Awwwards. Feel free to clone it from my github by click on
								this text.
							</a>
							<br /> <br />
							<a
								href='http://linkedin.com/in/jakepearson123'
								target='_blank'
								rel='noopener noreferrer'>
								Connect with me on Linkedin by clicking on this text.
							</a>
						</p>
					</div>
          <ContactButton />
				</div>
          </MenuManager>
			</>
		</>
	);
}
