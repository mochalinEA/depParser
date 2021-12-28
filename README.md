depParser - Парсер зависимостей
Нужен, чтобы собрать информацию по используемым пакетам (конкретные используемые версии, количество, проект)

Принцип работы
1. Выдернуть из package.json используемые пакеты
2. Сравнить с 'yarn.lock' или 'package-lock.json' чтобы понять конкретные используемые версии
3. Выдаёт массив вида, который предполагается обрабатывать и визуализировать

Example
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
