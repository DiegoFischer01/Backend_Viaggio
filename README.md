
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
>>>>>>> 34833f8 (inicializando nest y subiendo al repo remoto)




# Backend Viaggio

## 🚀 Introducción
El backend de **Viaggio** está construido con **NestJS**, **TypeScript** y **MySQL**, usando **TypeORM** para el acceso a datos.  
Incluye autenticación con **JWT**, hashing de contraseñas con **bcrypt**, envío de correos con **Nodemailer**, validación de DTOs con **class-validator / class-transformer**, y manejo seguro de variables con **dotenv**.  
También usamos **GitHub** para control de versiones, **ESLint / Prettier** para estilo y calidad de código, y **Jest** para testing.

---

## ⚙️ Instalación y configuración
Clonar el repo y ejecutar:

```bash
npm install


# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=your_password
DB_NAME=viaggio

# Autenticación
JWT_SECRET=your_secret
JWT_EXPIRES=1d

# Mailing
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_user
MAIL_PASS=your_password
MAIL_FROM=viaggio@example.com

## 🛠 Scripts
- Desarrollo: `npm run start:dev`  
- Producción: `npm run start:prod`  
- Compilación: `npm run build`  
- Tests: `npm run test`

## 📚 Endpoints
**Autenticación**  
- POST /auth/register → registro de usuario  
- POST /auth/login → login y generación de token  

**Usuarios**  
- GET /usuarios → listar usuarios  
- POST /usuarios → crear usuario  
- PUT /usuarios/:id → actualizar usuario  
- DELETE /usuarios/:id → eliminar usuario  

**Actividades**  
- GET /actividad → listar actividades  
- POST /actividad → crear actividad  
- PUT /actividad/:id → actualizar actividad  
- DELETE /actividad/:id → eliminar actividad  

**Reservas**  
- GET /reserva → listar reservas  
- POST /reserva → crear reserva  
- PUT /reserva/:id → actualizar reserva  
- DELETE /reserva/:id → cancelar reserva  

**Hoteles**  
- GET /hoteles → listar hoteles  
- POST /hoteles → crear hotel  
- PUT /hoteles/:id → actualizar hotel  
- DELETE /hoteles/:id → eliminar hotel  

## 🧰 Herramientas y librerías usadas
- NestJS  
- TypeScript  
- MySQL (con MySQL Workbench)  
- TypeORM  
- JWT  
- Bcrypt  
- Nodemailer  
- Class-validator / class-transformer  
- Dotenv  
- GitHub  
- ESLint / Prettier  
- Jest  

## 👥 Autores
- Bevacqua Mayra / mayrabevacqua@gmail.com  
- Beltramella Alex / beatsinka@gmail.com  
- Martorano Simon / simonmartorano@gmail.com  
- Fischer Diego / diegof01gm@gmail.com  

## 📄 Documentación
Toda la documentación del proyecto se encuentra en los recursos compartidos del equipo.

## 🔗 Links
- Discord (Sala 17): https://discord.com/channels/1308174344752730222/1308178602151510099  
- Repositorio Backend GitHub: https://github.com/DiegoFischer01/Backend_Viaggio.git  
- Repositorio Proyecto Final GitHub: https://github.com/DiegoFischer01/Proyecto_Final_2025.git  
- Presentación: https://prezi.com/view/Le95pzyfYGTooSJqO1iG/  
- Drive (Documentación): https://drive.google.com/drive/u/2/folders/1NPZYbBj9i7ZQHclWtPINpthVYPVIPYCm?q=sharedwith:public%20parent:1NPZYbBj9i7ZQHclWtPINpthVYPVIPYCm  
- Trello: https://trello.com/b/i8JZ6kJe/basic-board  
- Drive de Vivi: https://docs.google.com/spreadsheets/d/1vk_FE1fCL0Y_JTdr20FgdD9wB8lkP4XP3_N28-Cg61U/edit?gid=0#gid=0  
- Figma: https://www.figma.com/design/SV0oD12vB9AnFIk2I20yNi/Viaggio?node-id=0-1&p=f  
- Lucidchart (Diagrama de flujo): https://lucid.app/lucidchart/adfcf256-a7fb-4311-a069-bfddea551d85/edit?invitationId=inv_378be7f5-b3d2-4408-b0c9-59b4c11978a8&referringApp=slack&page=0_0#  
- Diagrama de entidades: https://app.diagrams.net/#G1cO6aMk4oOVmWL_Xnu2tDk5uAM0xY2xS2#%7B%22pageId%22%3A%22lBe7LtLD_OevNelcKrqA%22%7D  

## 🤝 Contribución
El flujo de trabajo del equipo es directo sobre el repositorio en **GitHub**:  
1. Clonar el repositorio (`git clone <url>`)  
2. Crear una rama (`git checkout -b nombre-rama`)  
3. Realizar cambios y commits (`git commit -m 'feat: nueva funcionalidad'`)  
4. Subir la rama (`git push origin nombre-rama`)  
5. Abrir un Pull Request en GitHub para revisión e integración  

## 📄 Licencia
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)