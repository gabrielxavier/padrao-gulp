No primeiro momento, antes de iniciar o processo de instalação e configuração do gulp, é necessário seguir os passos abaixo:

  - Instalar o [node.js];
  - Instalar o [npm];
  - Fazer o download deste reposítório.

## Instalando o [Gulp]

O Gulp se trata de um modulo do [node.js] e pode ser instalado por meio do [npm], então, para instalar basta digitar no terminal:

```sh
$ npm install --global gulp
```

Desta maneira, com o parâmetro `--global` o gulp será instalado de forma global em sua máquina, com isso pode ser acessado de qualquer projeto.

No entanto, ele pode ser instalado dentro de um projeto específico a partir do comando:

```sh
$ npm install --save-dev gulp
```

Na raíz deste repositório você vai encontrar o arquivo `gulpfile.js`, é nele que são determinadas todas as configurações do Gulp: `tasks`, `plugins`, `imports` e `configs`;

## Instalando as dependências do [Gulp]

Para que consiga executar as tasks do Gulp, é necessário instalar as depêndencias especificadas no arquivo [package.json], para isso, você deve acessar a pasta root do seu projeto e executar o comando abaixo:

```sh
$ npm install
```

No ambiente de produção o parâmetro `--production` pode ser adicionado para que os pacotes de desenvolvimento não sejam instalados, pois não há necessidade.

## Como funciona
### Configs

No arquivo `gulpfile.js` de configuração do Gulp deste repositório  é possível configurar em qual diretório o Gulp vai buscar os assets e qual diretório vai fazer o deploy dos assets:

```javascript
configs.source = 'web/source/'; // Arquivos (.less, .js, ico-facebook.png)
configs.build  = 'web/assets/'; // Arquivos (.min.css, .min.js, sprite.png)
```

A estrutura dentro destes diretórios deve ser mantida conforme o padrão, caso contrário, o arquivo de configuração do Gulp deve ser atualizado. (Lembrando que a pasta `assets` será criada automaticamente no momento do deploy, sendo assim, deve ser mantida no `.gitignore`)

```javascript
gulp-padrao/
└─ web
  └─ source
    └── css
       └── style.less
    └── icon
       └── logo.svg
    └── img
       └── produto.jpg
    └── js
       └── scripts.js
       └── vendor/
       └── plugins/
    └── sprite
       └── icone-facebook.png
  └─ assets
gulpfile.js
package.json
.gitignore
```
### Imports

A sessão de imports, como o nome sugere, importa os plugins para dentro do gulp, conforme o exemplo abaixo:

```javascript
// Icons
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
```
### Tasks

O arquivo de configuração  deste repositório, organiza as tasks do Gulp em 3 níveis:

##### Project tasks

* `build`: Executa todas as tasks necessárias para o deploy do projeto. (Pode ser somado o parâmetro `--production` para que o build execute todas as tarefas do deploy como otimização de imagens e minify do css).
* `clean`: Limpa a pasta `assets` removendo os arquivos do deploy.
* `listen`: Faz com que o Gulp fique "escutando" as pastas do projeto e caso a algo seja alterado ou adicionado chama as tasks de deploy automaticamente. (Esta task exige a instalação das devDependencies do arquivo `package.json`).

##### Build tasks

* `styles`: Executa o deploy do CSS compilando o LESS.
* `scripts`: Executa o deploy do JavaScript minificando e concatenando o JavaScript.
* `sprites`: Executa o deploy dos sprites juntando todas as imagens da pasta `source/sprite` em um arquivo `sprite.png`.
* `icons`: Executa o deploy da fonte de icones.
* `images`: Executa o deploy das imagens fazendo a otimização.

##### Debug tasks

* `lint:styles`: Executa a validação do CSS. (http://csslint.net/)
* `lint:scripts`: Executa a validação do JavaScript. (http://www.javascriptlint.com/)

Para entender melhor as tasks, basta observar a forma como foi escrito o arquivo `gulpfile.js`.

### Plugins

Todos os [plugins] do Gulp podem ser encontrados no próprio site da ferramenta ou no [npm].

Para instalar um novo plugin basta digitar o seguinte comando no terminal:

```sh
$ npm install nome-do-plugin --save-dev
```

E consequentemente para remover um plugin o comando necessário é:

```sh
$ npm uninstall nome-do-plugin --save-dev
```

Segue a lista do completa dos plugins padrões deste repositório:

```javascript
// Defaults
var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence').use(gulp);
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var del = require('del');
var gulpif = require('gulp-if');

// CSS
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var a2cPrefixer = require('a2c-prefixer');
var csslint = require('gulp-csslint');

// JS
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var jslint = require('gulp-jslint');

// Images
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var imageminJpegtran = require('imagemin-jpegtran');

// Icons
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');

// Sprite
var spritesmith = require('gulp.spritesmith');
```

## Na prática

Então, para testar se está tudo funcionando, basta acessar a pasta do projeto pelo terminal e digitar o comando:
```sh
$ gulp build
```

## Plataformas de desenvolvimento

Abaixo estão as estruturas de pastas que devem ser seguidas para cada plataforma de desenvolvimento.
### Symfony

#### Estrutura de pastas

```javascript
nome-do-projeto/
└── src
    └── AppBundle
        └── Resources
            └── public
                └── site
└── web
    └── assets
gulpfile.js
package.json
.gitignore
```

#### Configurações

```javascript
configs.source = 'src/AppBundle/Resources/public/site/';
configs.build  = 'web/assets/';
configs.icons_dir = '../../../' + configs.source + 'css/';
```

### Wordpress

#### Estrutura de pastas

```javascript
nome-do-projeto/
└── wp-content
    └── themes
        └── padrao
            └── source
            └── assets
gulpfile.js
package.json
.gitignore
```

#### Configurações

```javascript
configs.source = 'wp-content/themes/padrao/source/';
configs.build  = 'wp-content/themes/padrao/assets/';
configs.icons_dir = '../../source/css/';
```

### .NET

Deve-se tomar atenção com os projetos .NET pois os arquivos criados pelo Gulp devem ser adicinados manualmente ao projeto.

```javascript
nome-do-projeto/
└── Content
    └── source
    └── assets
gulpfile.js
package.json
```

#### Configurações

```javascript
configs.source = 'Content/source/';
configs.build  = 'Content/assets/';
configs.icons_dir = '../../source/css/';
```

**É isso ai, mãos a obra!**

Lembre-se que a pasta do [git] deste reposório deve ser removida e um novo repositório deve ser inicilizado com o endereço do novo projeto.

Deve ser adicionado no arquivo .gitignore do projeto as pastas `assets` e `node_modules` para que não sejam versionadas.

[node.js]:http://nodejs.org
[npm]:https://www.npmjs.com/
[Gulp]:http://gulpjs.com
[package.json]:https://docs.npmjs.com/files/package.json
[plugins]:http://gulpjs.com/plugins/
[git]:https://git-scm.com/