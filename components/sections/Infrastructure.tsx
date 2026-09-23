"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const slides = [
  {
    title: "Знания и экспертиза",
    subtitle: "HRD и развитие команд",
    cards: [
      ["Deep Tech Academy", "Обучение для технических команд и руководителей"],
      ["Deep Tech Advisors", "Эксперты и менторы под конкретные технические задачи"],
      ["Deep Tech Accelerator", "Ускорение от MVP до промышленного масштабирования"],
      ["Deep Tech Events", "Закрытые мастермайнды и отраслевые конференции"],
    ],
  },
  {
    title: "Рынки и масштаб",
    subtitle: "Партнёрства для выхода на рынок",
    cards: [
      ["Глобальная сеть", "Партнёры и эксперты для международного развития"],
      ["Создатель партнёрства", "Связи между командами, заказчиками и институтами"],
      ["Go-To-Market", "Маршрут от подтверждённого PoC до коммерческого контракта"],
      ["Витрина запросов", "Задачи корпораций и технологические решения в одном поле"],
    ],
  },
  {
    title: "Операционная поддержка",
    subtitle: "Сервисы для движения проекта",
    cards: [
      ["Платёжные шлюзы", "Подготовка финансового контура под согласованные процессы"],
      ["Юридический блок", "Документы и договорная рамка для пилотов"],
      ["Бухгалтерия и учёт", "Прозрачный учёт этапов и обязательств проекта"],
      ["GR и институты", "Взаимодействие с профильными организациями"],
    ],
  },
  {
    title: "Продвижение и продажи",
    subtitle: "Коммерческий контур развития",
    cards: [
      ["Deep Tech Media", "Кейсы, аналитика и экспертное присутствие"],
      ["Бизнес-стек и лиды", "Инструменты для системной работы с запросами"],
      ["Финансовые ресурсы", "Подготовка к инвестициям и грантовым программам"],
      ["Веб-инфраструктура", "Цифровые точки контакта и материалы проекта"],
    ],
  },
];

export default function Infrastructure() {
  const [active, setActive] = useState(0);
  const slide = slides[active];

  const move = (direction: 1 | -1) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className="section infrastructure-section" id="infrastructure">
      <div className="container">
        <div className="section-heading centered infrastructure-heading">
          <p className="eyebrow">Операционная инфраструктура</p>
          <h2>Создаём инфраструктуру <span className="text-gradient">для DEEP TECH проектов</span></h2>
          <p className="section-lead">Единое операционное поле: юридическая, финансовая и технологическая поддержка. Фокусируйтесь на продукте — остальное берём на себя.</p>
        </div>

        <div className="infrastructure-body">
          <div className="infrastructure-toolbar">
            <div>
              <h3>{slide.title}</h3>
              <p>{slide.subtitle}</p>
            </div>
            <div className="carousel-controls">
              <button type="button" aria-label="Предыдущий блок" onClick={() => move(-1)}>
                <Icon name="chevron-left" size={17} />
              </button>
              <div className="carousel-dots" aria-label="Состояние карусели">
                {slides.map((item, index) => (
                  <button
                    type="button"
                    key={item.title}
                    aria-label={`Открыть блок: ${item.title}`}
                    aria-current={index === active ? "true" : undefined}
                    className={index === active ? "active" : ""}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
              <button type="button" aria-label="Следующий блок" onClick={() => move(1)}>
                <Icon name="chevron-right" size={17} />
              </button>
            </div>
          </div>

          <div className="infrastructure-grid" key={slide.title}>
            {slide.cards.map(([title, description]) => (
              <article className="glass-panel infrastructure-card" key={title}>
                <h4>{title}</h4>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <a className="button primary infrastructure-cta" href="#entry">
            Получить доступ
            <Icon name="arrow-right" size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}
