import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './shared/filters/all-exceptions.filter';
import * as dotenv from 'dotenv';
dotenv.config();
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, stopAtFirstError: true }),
  );
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.enableCors({
    origin: ['http://localhost:3500/swagger#/','https://nodejs-production-5562.up.railway.app', ],// Replace with your Swagger UI origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));


  await configureSwagger(app);
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
  
}

if (process.env.NODE_ENV == 'dev') {
  bootstrap();
}

// async function configureSwagger(app: any) {
//   if (process.env.SWAGGERUI === 'enable') {
//     const options = new DocumentBuilder()
//       .setTitle('Nest REST API Dmrat-Backend')
//       .setDescription('Nest REST API Dmrat-Backend Description')
//       .setVersion('1.0')
//       .addBearerAuth(
//         {
//           type: 'http',
//           scheme: 'bearer',
//           bearerFormat: 'JWT',
//         },
//         'Bearer access-token', // This is the name of the security scheme
//       )
//       .build();

//     const document = SwaggerModule.createDocument(app, options);
//     SwaggerModule.setup('swagger', app, document);
//   }
// }

async function configureSwagger(app: any) {
  if (process.env.SWAGGERUI === 'enable') {
    const options = new DocumentBuilder()
      .setTitle('Nest REST API Dmrat-Backend')
      .setDescription('Nest REST API Dmrat-Backend Description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
        'Bearer access-token', // Name of the security scheme
      )
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document, {
      // Custom CSS for dark mode
      customCss: `
        .swagger-ui {
          background-color:rgb(6, 111, 163) !important;
          color: #fff;
        }
        .swagger-ui .topbar {
          background-color:rgb(11, 10, 10) !important;
          color: rgb(240, 232, 232);
        }
          .swagger-ui .info, .swagger-ui .scheme-container {
        color: rgb(208, 44, 186);
       background-color:rgb(239, 76, 76) !important;
       }
      `,
    });
  }
}


