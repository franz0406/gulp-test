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

const routes = { // 경로설정
    pug: {
        src: 'src/*.pug',
        dest: 'build'
    }
}

const pug = () => {
    gulp
    .src(routes.pug.src) // 해당 경로에 있는 .pug파일 탐색.
    .pipe(gulpPug())     // pug 파일 html 변환
    .pipe(gulp.dest(routes.pug.dest)); // 해당경로에 폴더생성 ( build폴더 )
}

export const dev = gulp.series([pug]); // Pug Task 실행
```