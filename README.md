
# What is nestjs?
``` 
 NestJS is a powerful and scalable framework for building server-side applications using TypeScript. It provides out-of-the-box support for dependency injection, modular architecture
 ```

 # what are modules in nestjs?
 ```
 - A module in NestJS is a class annotated with the @Module() decorator. It serves as a container for a specific part of the application, grouping related components, services, and other providers.
 - As the application grows, modules help keep the codebase modular and manageable.
 - Modules can be exported and reused across different parts of the application.
 ```

 # what are decorators in nestjs?
 ```
 In NestJS, decorators are a core concept used to attach metadata to classes, methods, properties, or parameters. These metadata guide NestJS on how to process and use these elements, enabling the framework's dependency injection, routing, and other features.
NestJS leverages TypeScript decorators, which are part of the ECMAScript proposal for JavaScript.
eg: 
@Module() - Marks a class as a NestJS module, which encapsulates a specific feature of the application.
@Injectable() - Marks a class as a provider that can be injected into other classes.
@Controller() - Marks a class as a controller, responsible for handling incoming HTTP requests.
@UseGuards() - Attaches guards to the method for implementing authorization logic.
@HttpCode(202) - Change HTTP code of any endpoint
```

# what are pipes in nestjs?
```
Pipes in NestJS are a powerful feature used to transform or validate incoming data. They operate on arguments passed into controllers, ensuring the data is in the expected format or conforms to certain rules before the request is processed.
Key Features of Pipes
- Validation: Check if the incoming data is valid (e.g., required fields, data types, constraints).
- Transformation: Convert the incoming data to the desired format (e.g., string to integer).
- Encapsulation: Centralize data processing logic to keep controllers clean and reusable.
Examples:
ValidationPipe - Automatically validates incoming data using class-validator and class-transformer.
import { ValidationPipe } from '@nestjs/common';

@Post()
create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  return 'Cat created!';
}

ParseIntPipe - Converts a string to an integer.
@Get(':id')
findOne(@Param('id', ParseIntPipe) id: number) {
  return `This action returns a cat with ID: ${id}`;
}

DefaultValuePipe - Provides a default value if none is provided.
@Get()
find(@Query('limit', new DefaultValuePipe(10)) limit: number) {
  return `Limit: ${limit}`;
}

 ```