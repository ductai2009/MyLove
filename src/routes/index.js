import Home from '~/component/Layout/Home';
import Love from '~/component/Layout/Love';
import BtnLove1 from '~/component/Button/BtnLove1';
import LineHeart from '~/component/Layout/component/LineHeart';

const publicRoutes = [
    // ko cần đăng nhập vẫn vào đc
    { path: '/MyLove', component: Home },
    { path: '/love', component: Love },
    { path: '/btn', component: BtnLove1 },
    { path: '/LineHeart', component: LineHeart },
];

const privateRoutes = [
    // cần đăng nhập, nếu ko đăng nhập thì ko vào đc
];
export { publicRoutes, privateRoutes };
