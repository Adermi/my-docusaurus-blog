import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Link from '@docusaurus/Link';  

const cardContent = [
  {
    img: "/img/demo.jpg",
    title: "你不知道的JS总结",
    content:
      `很多人对 JavaScript 这门语言的印象都是简单易学，很容易上手。JavaScript 语言本身有很多
      复杂的概念，语言的使用者不必深入理解这些概念也可以编写出功能全面的应用。殊不知，这些
      复杂精妙的概念才是语言的精髓，即使是经验丰富的 JavaScript 开发人员，如果没有认真学习的话
      也无法真正理解它们。在本书中，我们要直面当前 JavaScript 开发者不求甚解的大趋势，深入理解
      语言内部的机制。`,
    router: "/docs/crazyJs",
  },
  {
    img: "/img/demo2.jpg",
    title: "React学习",
    content:
      `React 是一个用于呈现用户界面 (UI) 的 JavaScript 库。UI 是由按钮、文本和图像等小单元构建的。React 允许您将它们组合成可重用、可嵌套的组件。从网站到手机应用程序，屏幕上的所有内容都可以分解为组件。`,
    router: "/docs/react",
  },
  {
    img: "/img/demo3.jpg",
    title: "Grid布局",
    content:
      `CSS 网格布局擅长于将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系（前提是 HTML 生成了这些区域）。像表格一样，网格布局让我们能够按行或列来对齐元素。然而在布局上，网格比表格更可能做到或更简单。例如，网格容器的子元素可以自己定位，以便它们像 CSS 定位的元素一样，真正的有重叠和层次。`,
    router: "/docs/HTML+CSS/grid",
  },
];

const Card = ({ img, title, content, router }) => (
  <div class="card shadow--md">
    <div class="card__image">
      <img
        className={styles.cardImg}
        src={img}
        alt="Image alt text"
      />
    </div>
    <div class="card__body">
      <h4>{title}</h4>
      <small className={styles.cardText}>{content}</small>
    </div>
    <div class="card__footer">
      <Link class={clsx("button button--block", styles.myButton)} href={router}>Visited</Link>
    </div>
  </div>
);

function HomepageHeader() {
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">Welcome to</h1>
        <p className="hero__subtitle">my site</p>
        <div className={styles.cards}>
          {cardContent.map((item) => (
            <Card {...item}></Card>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
    </Layout>
  );
}
