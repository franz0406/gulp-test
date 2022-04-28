# Gulp 사용해보기

gulp는 흔히 Task Runner로 알려져있다.  
많은 일을 Task로 만들고 그 Task를 실행하여  
결과물을 자동으로 생성한다.  

# Task 란?

- 자동 이미지압축
- 코드 최소화
- SCSS를 CSS로 변환
- 최신자바스크립트를 구형브라우저에서 사용 할 수 있도록 컴파일  

위의 작업들을 Task로 만들어서 사용.

# gulpfile + Babel 컴파일 설정

최신 자바스크립트를 사용하기 위하여 gulp 파일에 babel 컴파일을 적용한다.

1. gulpfile.js 파일의 명칭을 gulpfile.babel.js 로 변경한다.  
2. root디렉토리에 .babelrc 파일을 생성 후 아래와 같이 작성한다.

```javascript
{
    "presets": ["@babel/preset-env"]
}
```
3. @babel 모듈 설치
- npm install @babel/register
- npm install @babel/core
- npm install @babel/preset-env

# pug 파일 html 변환설정

1. gulp pug 플러그인 설치  

`npm install -D gulp-pug`  

2. 호출
```javascript
import gulp, { series } from 'gulp';
import gulpPug from 'gulp-pug';

const routes = {
    pug: {
        src: 'src/*.pug',
        dest: 'build'
    }
}

const pug = () => 
    gulp
    .src(routes.pug.src)
    .pipe(gulpPug())    
    .pipe(gulp.dest(routes.pug.dest)); 


export const dev = gulp.series([pug]); 
```

# Del 설치  

1. del 설치 `npm install del`
2. del 호출 `import del from 'del';`
3. Task로 지정해서 사용.  

```javascript
const delete = () => del(['build']);

exprot const dev = gulp.series([delete]);
```

# gulp-webserver 설치 와 사용


`npm i -D gulp-webserver`
```javascript
import ws from "gulp-webserver";

const webserver = () =>
    gulp.src("build")
        .pipe(ws({
            livereload: true,
            open: true
        }));

export const build = gulp.series(webserver);
```

# watch() 실시간 파일 감시  

작업중인 파일을 수정하면 실시간으로 웹서버에 반영하기

```javascript
const pug = () => 
    gulp
    .src(routes.pug.src)
    .pipe(gulpPug())    
    .pipe(gulp.dest(routes.pug.dest)); 


const watch = () => { // return 값 필요없음.
    gulp.watch("src/**/*.pug", pug);
}

export const build = gulp.series(watch);
```

# gulp-sass 설치 및 실시간 감시 와 autoprefix

패키지 모듈 설치  

- sass
- gulp-sass
- node-sass
- gulp-autoprefixer  

```javascript
import autoPrefix from "gulp-autoprefixer";
const scss = require('gulp-sass')(require('sass'));

const scssCompile = () =>
        gulp.src("./src/scss/style.scss")
            .pipe(scss().on('error', scss.logError))
            .pipe(autoPrefix({
                browsers: "last 2 versions"
            }))
            .pipe(gulp.dest("build/css"))

const watch = () => {
    gulp.watch("src/scss/**/*.scss", scssCompile);
}

export const build = gulp.series(scssCompile, watch);
```

# javascript Compile [하위 브라우저 호환]

필요한 모듈 패키지  

- gulp-bro
- babelify
- uglifyify

```javascript
import bro from "gulp-bro";
import babelify from "babelify";

const jsCompile = () => 
        gulp.src("./src/js/main.js")
            .pipe(bro({
                transform: [
                    babelify.configure({ presets: ["@babel/preset-env"] }), 
                    [ 'uglifyify', { global: true } ]
                ]
            }))
            .pipe(gulp.dest("build/js"));
```
