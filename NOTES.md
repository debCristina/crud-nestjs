# 🛠️ CRUD NestJS

## 👩‍💻 Integrantes
- 👤 Ana Eduarda Raposo Medeiros - UC23200232
- 👤 Anette Stefany Villalba Palomino - UC23200441
- 👤 Agatha Karenne De Andrade Machado - UC23200247
- 👤 Brunno Calado Cavalcante - UC23101210
- 👤 Clarice Christine Soares Viana - UC23200796
- 👤 Débora Cristina Silva Ferreira - UC23200792

## 💡 Introdução
Este projeto tem como objetivo a criação de um sistema CRUD completo utilizando o framework NestJS. O NestJS é um framework de backend moderno baseado em Node.js e TypeScript, que vem com o JavaScript já instalado e configurado, além de oferecer suporte nativo para testes unitários com Jest. Facilitando muito a criação de projetos, resolvendo diversos impedimentos iniciais comuns no desenvolvimento, como configurações manuais e estruturação do código. Com uma arquitetura modular e escalável, o NestJS permite organizar o código de forma limpa e reutilizável, tornando o desenvolvimento de APIs mais prático, produtivo e profissional 👩‍💻🚀🌟.

## 🛠️ Criando o projeto
O primeiro passo foi criar o diretório do projeto e, em seguida, iniciar um novo projeto NestJS dentro dele utilizando os seguintes comandos:

- 📦 Instalando o CLI do NestJS

```bash
npm i @nestjs/cli
```

- 🚀 Criando um novo projeto
```bash
npx -p @nestjs/cli nest new project
```
Durante a criação, selecionamos npm como gerenciador de pacotes.

- 📁 Acessando a pasta do projeto criado
```bash
cd project
```

- 📦 Instalação de dependências

Após criar o projeto foi necessário instalar os seguintes pacotes essenciais:
```bash
npm i nano id@3 sqlite3 typeorm @nestjs/typeorm class-validator class-transformer
```
`nanoid` -Biblioteca que gera IDs únicos, curtos e seguros.

`sqlite3 🗃️`  — Banco de dados leve e prático para testes e pequenos projetos.

`typeorm 🔧` — ORM que facilita a comunicação com o banco de dados.

`@nestjs/typeorm 🧩` — Integra o TypeORM ao NestJS.

`class-validator ✅` — Permite validar os dados recebidos no backend.

`class-transformer 🔄` — Transforma objetos automaticamente, muito útil em DTOs.

## ⚙️ Gerando API com gerador de código
Para agilizar a criação das rotas e estruturas básicas do projeto, utilizou-se o gerador de código do NestJS. Com ele, é possível criar rapidamente os arquivos de controller, service, módulo e DTOs para as entidades do projeto:
```bash
nest g resource developers
```
Durante a execução dos comandos, foi selecionado a criação de REST API e a criação de entry points de CRUD. Isso já gera boa parte da estrutura que se utiliza no projeto.

Em seguida iniciou o servidor do projeto para garantir que as configurações do projeto funcionaram corretamente.
```bash
npm run start:dev
```
Para garantir que os endpontis da API estavam em conformidade, utilizou-se a extensão rest client que permite simular requisições http na propria IDE.

- **GET ALL**
```
GET http://localhost:3000/developers
Retorno: "This action returns all developers"
```
- **GET ONE**
```
GET http://localhost:3000/developers/1
Retorno: "This action returns a #1 developers"
```
- **POST**
```
POST http://localhost:3000/developers
Retorno: "This action adds a new developers"
```
- **UPDATE**
```
PATCH http://localhost:3000/estudantdevelopers/1
Retorno: "This action update a #1 developers"
```
- **DELETE**
```
DELETE http://localhost:3000/developers/1
Retorno: "This action removes a #1 developers"
```

## ✅ Validação de dados
Para garantir que os dados enviados na criação e atualização dos registros estejam corretos, foi utilizado os pacotes class-validator e class-transformer. Eles funcionam junto com os DTOs (Data Transfer Objects), que são responsáveis por descrever e validar os formatos esperados nas requisições.

**Name** : deve ser uma String.
**Email** : Deve ser um email.
**DateOfBirth** : Deve ser uma data.

```
import { IsDateString, IsEmail, IsInt, IsNumber, IsString, Matches } from "class-validator";

export class CreateDeveloperDto {
     
    @IsString()
    nome: string;
    
    @IsEmail()
    email: string;
    
    @IsDateString()
    dateOfBirth: string;
}
```
Para que tudo as validações altomáticas fossem realizadas corretamente precisou-se aletrar configurações na Main do projeto.
```
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist:true,
  })
  ) ;
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```
Em seguida realizou-se testes para verrificar se as validações estavam funcionannndo de modo esperado.
**- Teste Post**
```
POST http://localhost:3000/developers
Retorno: 
{
    "message": [
        "name must can be a string",
        "email must be an email,
        "dateOfBirth must can a valid ISO 8601 date string"
    ],
    "error": "Bad Request,
    "statusCode": 400
}
```
```
POST http://localhost:3000/developers
Content-Type: aplication/json

{
    "name": "Jhon Doe",
    "email": "jhon.doe@acme.com",
    "dateOfBirth": "1990-01-01"
}
Retorno: "This action adds a new developer"
```

**- Teste Update**
```
PATCH http://localhost:3000/developers/1
Content-Type: aplication/json

{
    "email": "12343",
}

Retorno:
{
    "message": [
        "email must be an email,
    ],
    "error": "Bad Request,
    "statusCode": 400
}
```

```
PATCH http://localhost:3000/developers/1
Content-Type: aplication/json

{
    "email": "jhon.doe@acme.com",
}
Retorno: "This action update a #1 developer"
```
## ⚙️TypeORM e SQLite
O próximo passo é criar a entidade da API. Para isso, é necessário configurar o uso do SQLite como banco de dados e também ajustar o módulo das entidade, garantindo que o NestJS conseguisse lidar corretamente com o banco.

### 🧩 AppModule com configuração do TypeORM
```
@Module({
  imports: [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'de.sqlite',
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: true,
  }),
  EstudantesModule, CidadesModule, UfsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [TypeOrmModule]
})
export class AppModule {}
```
Utiliza-se o método `forRoot()` para informar os detalhes da conexão:

`type: 'sqlite',` Define o tipo de banco de dados usado.
`database: 'de.sqlite':` Nome do banco de dados.
`entities:`  Informa onde estão os arquivos das entidades que representam as tabelas do banco.
`synchronize: true:` Gera automaticamente as tabelas no banco com base nas entidades.

### 📦 DeveloperModule
```
@Module({
  imports: [TypeOrmModule.forFeature([Estudante])],
  controllers: [EstudantesController],
  providers: [EstudantesService],
  
})
export class EstudantesModule {}
```

#### 👨‍💻 Entidade Developer
```
const { nanoid} = require("nanoid")
@Entity('developers')
export class Developer {
    @PrimaryColumn()
    id: string; //dev_082d323gt6

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    dateOfBirth: string;

    @BeforeInsert
    generateId() {
        this.id = `dev_${nanoid()}`
    }
}
``` 

## 💉 Injeção de dependências
O próximo passo foi criar a `Service` da API, que é uma classe que cuida da lógica de negócio. Ela podem ser usadas em outras partes da aplicação, como nos `Controllers`.
Para isso funcionar, é preciso injetar as dependências dos repositórios dentro das Services, pois são eles que fazem as operações no banco de dados.

```
@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private readonly repository: Repository<Developer>){}
     
```


### 🧠  Lógica no Service
**- Método Create**
```
async create(dto: CreateDeveloperDto) {
    const developer = this.repository.create(dto);
    return this.reposiroy.save(developer);
}
 
```

**- Método FindAll**
```
findAll() {
    return this.repository.find();
}
  ``` 

**- Método FindOne**
```
findOne(id: string) {
    return this.repository.findOneBy({id});
}
```
**- Método Update**
``` 
async update(id: string, dto: UpdateDeveloperDto) {
    const developer = await this.repository.findOneBy({id});

    if(!developer) return null;

    this.repository.merge(developer, dto);
    return this.repository.save(developer);
}
```
**- Método Remove**
```
  async remove(id: string) {
    const developer = await this.repository.findOneBy({id});

    if(!developer) return null;

    return this.repository.remove(developer);  
  }
```

### 🔁Alterações no controller
O Controller é a camada responsável por receber as requisições feitas à API e encaminhá-las para o serviço correspondente. É necessário ajustar o tipo de ID nas rotas, que por padrão é number, mas no nosso caso usamos string (ex: com nanoid), garantindo compatibilidade com os identificadores personalizados.
```
@Controller('developers')
export class UfsController {
  constructor(private readonly developerService: UfsService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developerService.create(createDeveloperDto);
  }

  @Get()
  findAll() {
    return this.developerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.developerService.findOne(id);  
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
    return this.developerService.update(id, updateDeveloperDTO);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.developerService.remove(id); 
  }
}

```

## Boas práticas 
Seguir boas práticas na API envolve retornar os códigos HTTP adequados para cada situação.
Por exemplo:
- Retornar 404 (Not Found) quando um developer não for encontrado.

- Ao excluir um developer, não retornar os dados excluídos, apenas confirmar a remoção com o status apropriado (ex: 204 No Content).

```
@Controller('developers')
export class UfsController {
  constructor(private readonly developerService: UfsService) {}

  @Post()
  create(@Body() createDeveloperDto: CreateDeveloperDto) {
    return this.developerService.create(createDeveloperDto);
  }

  @Get()
  findAll() {
    return this.developerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const developer = await this.developerService.findOne(id);  

    if(!developer) throw new NotFoundException;

    return developer;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDeveloperDto: UpdateDeveloperDto) {
    const developer = await this.developerService.update(id, updateDeveloperDTO);

    if(!developer) throw new NotFoundException;

    return developer;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const developer = await this.developerService.remove(id);

    if(!developer) throw new NotFoundException;
  }
}

```