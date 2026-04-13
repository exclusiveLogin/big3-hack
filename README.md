# big3-hack — Person Matcher (Hackathon Project)

Хакатон-проект: веб-приложение на Angular 11 для группового матчинга по фотографиям. Реализует алгоритм перебора и сопоставления анонимных карточек с персонами из галереи.

> Разработано на хакатоне Big Three (Big 3) — 2021.

## Функциональность

- **Галерея** — просмотр карточек персон (`GalleryComponent`)
- **Матчинг** — алгоритм сопоставления (`match()`) с поддержкой пакетного запуска
- **Анонимные карточки** — `AnonumCardComponent` для неидентифицированных участников
- **Таблица результатов** — `PersonTableComponent` с итогами матчинга
- **Статистика** — `StatisticComponent`, `GroupsComponent`, `AttempTableComponent` внутри `BfBlockComponent`
- **Docker** — `Dockerfile` + `docker/default.conf` (Nginx) для деплоя

## Стек

| Технология | Версия |
|-----------|--------|
| Angular | 11 |
| TypeScript | 4.x |
| Docker + Nginx | Контейнеризация |

## Структура

```
big3-hack/src/app/
├── components/
│   ├── gallery/              # Просмотр фотогалереи
│   ├── person-table/         # Таблица результатов
│   ├── anonum-card/          # Анонимные карточки
│   ├── photo/                # Отображение фото
│   └── bf-block/             # Блок bruteforce матчинга
│       ├── attemp-table/     # Таблица попыток
│       ├── groups/           # Группировка
│       └── statistic/        # Статистика матчинга
└── app.component.ts          # Корневой компонент + match() логика
```

## Запуск

```bash
npm install
ng serve                    # Разработка: localhost:4200

# Docker
docker build -t big3-hack .
docker run -p 80:80 big3-hack
```
