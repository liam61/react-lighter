import str from './main';

import './styles/index.css';
import './styles/index.less';

console.log(str);
console.log('hello');

let t = () => {
  console.log('测试箭头');
}

t();

let num = (...rest) => {
  rest.map(n => console.log(n));
}

num(1, 2, 4);

if (module.hot) {
  module.hot.accept();
}
