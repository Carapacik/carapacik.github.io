---
title: "Swagger Parser"
description: "Generate Dart models and HTTP clients from Swagger and OpenAPI JSON or YAML. Use the CLI, Dart API, or web editor."
projectType: "Developer tool"
---

Swagger Parser 2.0 supports Swagger 2.0 and OpenAPI 3.0, 3.1, and 3.2.
Generate clients for Retrofit + Dio, standalone Dio, or package:http.
Choose plain `fromJson`/`toJson`, json_serializable, Freezed, or dart_mappable
for models.

Load one or more schemas from files or URLs. Use the CLI or Dart API to
configure generation. The [web editor](https://carapacik.github.io/swagger_parser/)
accepts JSON/YAML, config, and custom templates, then downloads the files as a ZIP.

The generator supports schema composition, request/response models, multipart
uploads, SSE, and JSON Lines. The optional `swagger_parser_templates` package
adds Mustache templates and helper files.

[Source on GitHub](https://github.com/Carapacik/swagger_parser) ·
[Package on pub.dev](https://pub.dev/packages/swagger_parser) ·
[Web editor](https://carapacik.github.io/swagger_parser/)
