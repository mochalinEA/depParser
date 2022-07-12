# depParser

## Парсер зависимостей

Нужен, чтобы собрать информацию по используемым зависимостям.

## Быстрый старт:
1. создать файл projects.js со списокм проектов, по аналогии с procjects.js.example
2. создать файл .env с токеном доступа в API, по аналогии с .env.example
3. `yarn install` - установить зависимости
4. `yarn start` - запустить скрипт

## Основной принцип работы:
1. Выдернуть из package.json используемые пакеты
2. Сравнить с 'yarn.lock' или 'package-lock.json' чтобы понять конкретные используемые версии
3. Получить массив, который предполагается обрабатывать и визуализировать:

Example:
```
[
    {
        name: 'react',
        version: '17.0.1',
        projectId: 201,
        dependencyType: 'dependencies',
    },
    {
        name: 'redux',
        version: '1.0.1',
        projectId: 123,
        dependencyType: 'devDependencies',
    }
]
```

## Так же можно:
1. top - сортировать список пакетов по суммарному весу использований
2. createAllPackagesFile - создать файл со всем возможными зависимостями
3. specificPackages - найти все использования определённых зависимостей в проектах 
