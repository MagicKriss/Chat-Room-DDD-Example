# Chat Room DDD app

This is an example application implementing a very simple chat API,
The main focus is showcasing Domain Driven Design principles in an API service.

## Setup

To initialize the repository run the following command:

```bash
pnpm install &&\
pnpm exec prisma generate &&\
pnpm exec prisma migrate dev
```

[PnPm](https://pnpm.io/) is used as a more modern and efficient substitute for npm

A docker-compose is added for easier development.
` docker-compose up -d` will create and bring up the application with DB.
Application is accessible under [localhost:3000](http://localhost:3000)

## Swagger/OpenAPI

API is documented using Swagger

- Swagger is accessible via [localhost:3000/api](http//localhost:3000/api)
- OpenAPI schema - [localhost:3000/api-json](http://localhost:3000/api-json)

## Validation

For validation, ZOD was used - generated DTOs from ZOD schemas are detected by swagger thanks to [nestjs-zod](https://github.com/risenforces/nestjs-zod) package.
ZOD schemas are also validating all API inputs due to `ZodValidationPipe`

Here the principle of 'parsing, not validating' is used to guarantee the required input type.

## The Domain

Chatroom, Message, and User are the primary domain elements handled by `ChatroomService` and `UserService`. Notice that these services never operate on concrete services, only on interfaces being injected, staying true to the DDD approach and gaining the flexibility of changing the implementation of underlying services as needed.

There is a point where the user sends a message to the chatroom, and the Domain level will do 2 checks (2 DB queries) before executing the insert.
While this could be migrated by a different DB design - adding `id` to the `RoomUser` entity and adding a foreign key to this `RoomUser.id` instead of `User.id` and `ChatRoom.id`. This decision was made to keep this validation in the domain level instead, as "User can send messages to a room they are joined" is a business/domain logic. Hence it was decided to implement it this way.

## Error Handling

A `Result` type was created for error handling inspired by Rust's robust `Result` pattern matching.
While we don't get such benefits in TS, this wrapper still helps keep the code cleaner and better organized.

For response errors, NestJS built-in HttpExceptions are used.

## Tests

Unit tests were created for domain levels:

- [user-service.sepc.ts](./src/user/user.service.spec.ts)
- [chatroom.service.spec.ts](./src/chatroom/chatroom.service.spec.ts)

E2E tests were written for `/user` endpoint - [user.e2e-spec.ts](./test/user.e2e-spec.ts)

> NOTE! Running E2E test on local env will erase the database after use.

## Storage

PostgreSQL was the database of choice as a versatile and performant relation database.

[Prisma](https://www.prisma.io) was chosen as an ORM for this project as a modern ORM with great typescript support.

The storage layer is separated the same as the Domain layer and the same as Domain services, provided via Dependency injection tokens.

## API versioning

API is already versioned and started as `v1` e.g. `/api/v1/user/get-by-id`. This gives flexibility and less pain in the future to modify and extend the functionality via `v2`, `v3`, etc.