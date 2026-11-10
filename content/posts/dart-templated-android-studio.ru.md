---
title: "Dart-шаблоны для Android Studio"
summary: "Live Templates для BLoC, Freezed DTO и json_serializable"
date: 2026-11-01T12:00:00+03:00
lastmod: 2026-11-10T12:00:00+03:00
draft: false
author: ["Carapacik"]
tags: ["dart", "flutter"]
---

## Как добавить шаблоны

1. Откройте **Settings → Editor → Live Templates → Dart**.
2. Скопируйте XML нужного шаблона ниже, выберите группу **Dart** в списке шаблонов и вставьте его через **⌘V** на macOS или **Ctrl+V** на Windows/Linux. Нажмите **Apply**.
3. В пустом `.dart`-файле введите сокращение и нажмите **Tab**. Укажите `ClassName`; `class_name` вычисляется через `snakeCase(ClassName)`.

![Dart Live Templates в настройках Android Studio](/templates.webp)

Примеры используют Dart 3.13+ и Freezed 4. В шаблонах BLoC и Freezed DTO используются [primary constructors](https://dart.dev/language/primary-constructors).
События и состояния используют [сокращённую запись фабричных конструкторов](https://dart.dev/language/constructors).
В зависимости от выбранных шаблонов проекту нужны `bloc`, `freezed_annotation` и `json_annotation`, а в dev dependencies — `build_runner`, `freezed` и `json_serializable`.

Для BLoC создайте все три файла ниже в одной папке и укажите одинаковый `ClassName` в каждом шаблоне.

## Freezed BLoC — `frzbloc`

```xml
<template name="frzbloc" value="import 'package:bloc/bloc.dart';&#10;import 'package:freezed_annotation/freezed_annotation.dart';&#10;&#10;part '$class_name$_bloc.freezed.dart';&#10;part '$class_name$_event.dart';&#10;part '$class_name$_state.dart';&#10;&#10;final class $ClassName$Bloc() extends Bloc&lt;$ClassName$Event, $ClassName$State&gt; {&#10;  this : super(const $ClassName$State.idle()) {&#10;    on&lt;_$ClassName$Started&gt;(_start);&#10;  }&#10;&#10;  void _start(_$ClassName$Started event, Emitter&lt;$ClassName$State&gt; emitter) {}&#10;}" description="Freezed BLoC" toReformat="true" toShortenFQNames="true">
  <variable name="ClassName" expression="" defaultValue="" alwaysStopAt="true" />
  <variable name="class_name" expression="snakeCase(ClassName)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="DART_TOPLEVEL" value="true" />
  </context>
</template>
```

Результат: `ClassName = Counter`, `counter_bloc.dart`.

```dart
import 'package:bloc/bloc.dart';
import 'package:freezed_annotation/freezed_annotation.dart';

part 'counter_bloc.freezed.dart';
part 'counter_event.dart';
part 'counter_state.dart';

final class CounterBloc() extends Bloc<CounterEvent, CounterState> {
  this : super(const CounterState.idle()) {
    on<_CounterStarted>(_start);
  }

  void _start(_CounterStarted event, Emitter<CounterState> emitter) {}
}
```

## Freezed BLoC event — `frzevent`

```xml
<template name="frzevent" value="part of '$class_name$_bloc.dart';&#10;&#10;@Freezed(copyWith: false)&#10;sealed class $ClassName$Event with _$$$ClassName$Event {&#10;  const factory start() = _$ClassName$Started;&#10;}" description="Freezed BLoC event" toReformat="true" toShortenFQNames="true">
  <variable name="ClassName" expression="" defaultValue="" alwaysStopAt="true" />
  <variable name="class_name" expression="snakeCase(ClassName)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="DART_TOPLEVEL" value="true" />
  </context>
</template>
```

Результат: `ClassName = Counter`, `counter_event.dart`.

```dart
part of 'counter_bloc.dart';

@Freezed(copyWith: false)
sealed class CounterEvent with _$CounterEvent {
  const factory start() = _CounterStarted;
}
```

## Freezed BLoC state — `frzstate`

```xml
<template name="frzstate" value="part of '$class_name$_bloc.dart';&#10;&#10;@Freezed()&#10;sealed class $ClassName$State with _$$$ClassName$State {&#10;  const factory idle() = $ClassName$Idle;&#10;&#10;  const factory processing() = $ClassName$Processing;&#10;&#10;  const factory success() = $ClassName$Success;&#10;&#10;  const factory failure() = $ClassName$Failure;&#10;}" description="Freezed BLoC state" toReformat="true" toShortenFQNames="true">
  <variable name="ClassName" expression="" defaultValue="" alwaysStopAt="true" />
  <variable name="class_name" expression="snakeCase(ClassName)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="DART_TOPLEVEL" value="true" />
  </context>
</template>
```

Результат: `ClassName = Counter`, `counter_state.dart`.

```dart
part of 'counter_bloc.dart';

@Freezed()
sealed class CounterState with _$CounterState {
  const factory idle() = CounterIdle;

  const factory processing() = CounterProcessing;

  const factory success() = CounterSuccess;

  const factory failure() = CounterFailure;
}
```

## Freezed DTO — `frzdto`

```xml
<template name="frzdto" value="import 'package:freezed_annotation/freezed_annotation.dart';&#10;&#10;part '$class_name$.freezed.dart';&#10;part '$class_name$.g.dart';&#10;&#10;@Freezed(fromJson: false, toJson: false)&#10;@JsonSerializable(explicitToJson: true)&#10;class const $ClassName$({&#10;  required final String id,&#10;  final String? name,&#10;}) with _$$$ClassName$ {&#10;  factory $ClassName$.fromJson(Map&lt;String, Object?&gt; json) =&gt;&#10;      _$$$ClassName$FromJson(json);&#10;&#10;  Map&lt;String, Object?&gt; toJson() =&gt; _$$$ClassName$ToJson(this);&#10;}" description="Freezed DTO" toReformat="true" toShortenFQNames="true">
  <variable name="ClassName" expression="" defaultValue="" alwaysStopAt="true" />
  <variable name="class_name" expression="snakeCase(ClassName)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="DART_TOPLEVEL" value="true" />
  </context>
</template>
```

Результат: `ClassName = UserDto`, `user_dto.dart`.

```dart
import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_dto.freezed.dart';
part 'user_dto.g.dart';

@Freezed(fromJson: false, toJson: false)
@JsonSerializable(explicitToJson: true)
class const UserDto({
  required final String id,
  final String? name,
}) with _$UserDto {
  factory UserDto.fromJson(Map<String, Object?> json) =>
      _$UserDtoFromJson(json);

  Map<String, Object?> toJson() => _$UserDtoToJson(this);
}
```

## json_serializable DTO — `jsondto`

```xml
<template name="jsondto" value="import 'package:json_annotation/json_annotation.dart';&#10;&#10;part '$class_name$.g.dart';&#10;&#10;@JsonSerializable(explicitToJson: true)&#10;class $ClassName$ {&#10;  const $ClassName$({&#10;    required this.id,&#10;    this.name,&#10;  });&#10;&#10;  factory $ClassName$.fromJson(Map&lt;String, Object?&gt; json) =&gt;&#10;      _$$$ClassName$FromJson(json);&#10;&#10;  final String id;&#10;  final String? name;&#10;&#10;  Map&lt;String, Object?&gt; toJson() =&gt; _$$$ClassName$ToJson(this);&#10;}" description="json_serializable DTO" toReformat="true" toShortenFQNames="true">
  <variable name="ClassName" expression="" defaultValue="" alwaysStopAt="true" />
  <variable name="class_name" expression="snakeCase(ClassName)" defaultValue="" alwaysStopAt="false" />
  <context>
    <option name="DART_TOPLEVEL" value="true" />
  </context>
</template>
```

Результат: `ClassName = UserDto`, `user_dto.dart`.

```dart
import 'package:json_annotation/json_annotation.dart';

part 'user_dto.g.dart';

@JsonSerializable(explicitToJson: true)
class UserDto {
  const UserDto({
    required this.id,
    this.name,
  });

  factory UserDto.fromJson(Map<String, Object?> json) =>
      _$UserDtoFromJson(json);

  final String id;
  final String? name;

  Map<String, Object?> toJson() => _$UserDtoToJson(this);
}
```

После создания файлов сгенерируйте части `.freezed.dart` и `.g.dart`:

```sh
dart run build_runner build
```
