
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

 # why we should not add the logic of controller functions inside controller?
 ```
 we should not add the logic of controller functions inside controllers but move the logic to a separate class/ service. this is because:
 - separation of concerns: controllers in nest js are designed to handle incoming request so business logic, validation, data access should reside in  separate services. this actually keeps your controllers clean & focused on routing.
 - maintainability - when your business logic is spread across your controllers, it becomes harder to find, reuse & test. so by centralizing the business logic in services, changes can be made in one place & applied throughout your application.
 ```

 # What is Inversion of control (IoC)?
 ```
 Normally, a class would create its own dependency but with the IoC, an external entity like the framework takes the control & creates the dependencies for the classes. 

 @Controller('property')
 export class PropertyController {
  propertyService: PropertyService;
  constructor() {
    // don't create your dependency, instead use DI in nestjs
    this.propertyService = new PropertyService();
  }
 }

 so instead of creating the dependencies in the constructor, we need to take the dependencies in our constructor.

 @Controller('property')
 export class PropertyController {
  propertyService: PropertyService;
  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }
 }

 In this way, the dependencies of each class must be created outside of the class & then passed to the class by its constructor. so now the property controller doesn't create its own dependency. It actually takes the dependencies from the outside. What makes this code better is that is we have an interface like 

 interface Service {
    findAll();
    findOne();
    create();
    update();
 }

 @Controller('property')
 export class PropertyController {
  propertyService: PropertyService;
  constructor(propertyService: Service) {
    this.propertyService = propertyService;
  }
 }

 so now in the constructor instead of getting a property service instance exactly of type PropertyService, we're gonna get an instance with type of the Service interface. This doesn't give any error bcz this Service interface satisfies the property service. it has all the function it requires. this actually implements the true IoC.
 So what's the benefit of using this. It leads actually to loser coupling & easier testing.
 ```

 # What is Dependency Injection in nest js?
 ```
 Lets say when we're going to create a property controller, first we need to create an instance of the property service & then pass it to the constructor of property controller. for example, if property service is dependent on another service lets say property repository, first we need to create an instance of the repository service & then create an instance of the property service with that repository service instance & then we can create the property controller with the property service instance.

 const propertyRepo = new PropertyRepository();
 const propertyService = new PropertyService(propertyRepo);
 const propertyController = new PropertyController(propertyService);

 It makes the code really hard to manage. in order to handle this problem, dependency injection of the nest js comes through.
 so what is DI in nest js. for example lets say we want to create an instance of the property controller. with the DI, we don't need to create an instance of the property service outside of the class manually & then pass it to the constructor of the property controller. DI system of the nest js will do that for us. we just need to declare the dependencies of the property controller. so In the above example code we don't need to create a Service interface & we don't want to manually initialize the dependencies in the constructor. here we just need to tell the nest js that this class is dependent on the property service. nestjs automatically creates the property service instance & inject it to the property controller. All we need to do here is to put a private property service & this will create a property service member for the property controller class.

 @Controller('property')
 export class PropertyController {
  constructor(private propertyService: PropertyService) {}
 }
 ```

 # How DI works in nest.js?
 ```
 so in nestjs, we have something called dependency injection container. so when the application runs, it looks through all classes in our application except for the controllers and list all dependencies of each class inside a table and then when the application wants to create an instance of the property controller it looks through the Constructor of the property controller and it sees that the property controller has a dependency - Property Service. so it creates an instance of the property service in the dependency injection container and if the property service is also dependent on another class it also create that dependency in the dependency injection container. for example let's say that the property service is dependent on the property repository class it also creates an instance of the property repository class and then pass it to the Constructor of the property service and create the property service instance and then it pass the property service instance to the Constructor of the property controller and create a new instance of the property controller class. so these dependencies of the property controller class will be kept inside the dependency injection container and then if another class needs the property service it doesn't create another instance of the property service it just pass the existing Property Service instance to that class so it avoids creating duplicate instances in our application and that will actually improve consuming the resources of our server so actually this is how the dependency injection works in the nestjs.
![image](https://github.com/user-attachments/assets/f4caa801-9ffe-46b7-b5b3-28e50b970db2)

 ```
