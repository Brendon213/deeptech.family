"use client";

import { useState } from "react";

export default function CookieNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <aside className="cookie-notice" aria-label="Уведомление о конфиденциальности">
      <h2>Конфиденциальность данных</h2>
      <p>
        Для работы сайта могут использоваться файлы cookie и аналогичные технологии.
        Подробнее — в
        <a href="/privacy">Политике конфиденциальности</a>.
      </p>
      <div className="cookie-actions">
        <button className="button primary small" type="button" onClick={() => setVisible(false)}>
          Принять
        </button>
        <button className="button secondary small" type="button" onClick={() => setVisible(false)}>
          Отклонить
        </button>
      </div>
    </aside>
  );
}
