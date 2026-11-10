---
title: "Swagger Parser"
description: "Генерация Dart-моделей и HTTP-клиентов из Swagger и OpenAPI в JSON или YAML. CLI, Dart API и веб-редактор."
projectType: "Генератор кода"
---

Swagger Parser 2.0 поддерживает Swagger 2.0 и OpenAPI 3.0, 3.1 и 3.2.
Генерирует клиентов для Retrofit + Dio, отдельного Dio и package:http.
Для моделей доступны обычные `fromJson`/`toJson`, json_serializable, Freezed
и dart_mappable.

Можно загружать одну или несколько схем из файлов или по URL и настраивать
генерацию через CLI или Dart API.
[Веб-редактор](https://carapacik.github.io/swagger_parser/) принимает JSON/YAML,
конфиг и собственные шаблоны, затем скачивает файлы в ZIP-архиве.

Генератор поддерживает композиции схем, Request/Response-модели, multipart,
SSE и JSON Lines. Отдельный пакет `swagger_parser_templates` добавляет
Mustache-шаблоны и вспомогательные файлы.

[Исходники на GitHub](https://github.com/Carapacik/swagger_parser) ·
[Пакет на pub.dev](https://pub.dev/packages/swagger_parser) ·
[Веб-редактор](https://carapacik.github.io/swagger_parser/)
