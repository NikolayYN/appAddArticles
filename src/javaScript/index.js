import Post from './post';
import '../css/style.css';


const docum = new Post('Hello')
const title = document.querySelector('h1');


docum.setTitle(title);