---
title: "Dart templates for Android Studio"
summary: "Live templates for BLoC, Freezed DTOs, and json_serializable"
date: 2026-11-01T12:00:00+03:00
lastmod: 2026-11-10T12:00:00+03:00
draft: false
author: ["Carapacik"]
tags: ["dart", "flutter"]
---

## How to add templates

1. Open **Settings → Editor → Live Templates → Dart**.
2. Copy an XML template below, select the **Dart** group in the template list, and paste it with **⌘V** on macOS or **Ctrl+V** on Windows/Linux. Click **Apply**.
3. In an empty `.dart` file, type the abbreviation and press **Tab**. Enter `ClassName`; `class_name` is calculated with `snakeCase(ClassName)`.

![Dart live templates in Android Studio settings](/templates.webp)

The examples use Dart 3.13+ and Freezed 4. The BLoC and Freezed DTO templates use [primary constructors](https://dart.dev/language/primary-constructors).
Events and states use [abbreviated factory constructors](https://dart.dev/language/constructors).
The project needs `bloc`, `freezed_annotation`, and `json_annotation`, with `build_runner`, `freezed`, and `json_serializable` as dev dependencies, depending on the templates you use.

For BLoC, create all three files below in the same directory and use the same `ClassName` in each template.

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

Result: `ClassName = Counter`, `counter_bloc.dart`.

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

Result: `ClassName = Counter`, `counter_event.dart`.

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

Result: `ClassName = Counter`, `counter_state.dart`.

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

Result: `ClassName = UserDto`, `user_dto.dart`.

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

Result: `ClassName = UserDto`, `user_dto.dart`.

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

After creating the files, generate the `.freezed.dart` and `.g.dart` parts:

```sh
dart run build_runner build
```
