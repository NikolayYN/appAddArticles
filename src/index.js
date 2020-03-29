import {
  HeaderComponent
} from './component/header.components';
import './css/style.css';
import {
  NavigationComponent
} from './component/navigation.components';

import {
  Favorite
} from './component/favorite.components';
import {
  Create
} from './component/create.components';
import {
  Posts
} from './component/posts.components';
const favorite = new Favorite('favorite');
const create = new Create('create');
const posts = new Posts('posts');
new HeaderComponent('header');

const nav = new NavigationComponent('navigation');

nav.getTab([{
    name: 'create',
    component: create,
  },
  {
    name: 'favorite',
    component: favorite
  },
  {
    name: 'posts',
    component: posts
  }
]);