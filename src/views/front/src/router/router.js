import VueRouter from 'vue-router'

//引入组件
import Index from '../pages'
import Home from '../pages/home/home'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Center from '../pages/center/center'
import Storeup from '../pages/storeup/list'
import News from '../pages/news/news-list'
import NewsDetail from '../pages/news/news-detail'
import payList from '../pages/pay'

import yonghuList from '../pages/yonghu/list'
import yonghuDetail from '../pages/yonghu/detail'
import yonghuAdd from '../pages/yonghu/add'
import yishengList from '../pages/yisheng/list'
import yishengDetail from '../pages/yisheng/detail'
import yishengAdd from '../pages/yisheng/add'
import keshiList from '../pages/keshi/list'
import keshiDetail from '../pages/keshi/detail'
import keshiAdd from '../pages/keshi/add'
import chongwuyiyuanList from '../pages/chongwuyiyuan/list'
import chongwuyiyuanDetail from '../pages/chongwuyiyuan/detail'
import chongwuyiyuanAdd from '../pages/chongwuyiyuan/add'
import yaopinfenleiList from '../pages/yaopinfenlei/list'
import yaopinfenleiDetail from '../pages/yaopinfenlei/detail'
import yaopinfenleiAdd from '../pages/yaopinfenlei/add'
import yaopinxinxiList from '../pages/yaopinxinxi/list'
import yaopinxinxiDetail from '../pages/yaopinxinxi/detail'
import yaopinxinxiAdd from '../pages/yaopinxinxi/add'
import yuyueguahaoList from '../pages/yuyueguahao/list'
import yuyueguahaoDetail from '../pages/yuyueguahao/detail'
import yuyueguahaoAdd from '../pages/yuyueguahao/add'
import jiuzhenxinxiList from '../pages/jiuzhenxinxi/list'
import jiuzhenxinxiDetail from '../pages/jiuzhenxinxi/detail'
import jiuzhenxinxiAdd from '../pages/jiuzhenxinxi/add'
import yizhuxinxiList from '../pages/yizhuxinxi/list'
import yizhuxinxiDetail from '../pages/yizhuxinxi/detail'
import yizhuxinxiAdd from '../pages/yizhuxinxi/add'
import kaiyaodingdanList from '../pages/kaiyaodingdan/list'
import kaiyaodingdanDetail from '../pages/kaiyaodingdan/detail'
import kaiyaodingdanAdd from '../pages/kaiyaodingdan/add'
import newstypeList from '../pages/newstype/list'
import newstypeDetail from '../pages/newstype/detail'
import newstypeAdd from '../pages/newstype/add'
import aboutusList from '../pages/aboutus/list'
import aboutusDetail from '../pages/aboutus/detail'
import aboutusAdd from '../pages/aboutus/add'
import systemintroList from '../pages/systemintro/list'
import systemintroDetail from '../pages/systemintro/detail'
import systemintroAdd from '../pages/systemintro/add'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//配置路由
export default new VueRouter({
	routes:[
		{
      path: '/',
      redirect: '/index/home'
    },
		{
			path: '/index',
			component: Index,
			children:[
				{
					path: 'home',
					component: Home
				},
				{
					path: 'center',
					component: Center,
				},
				{
					path: 'pay',
					component: payList,
				},
				{
					path: 'storeup',
					component: Storeup
				},
				{
					path: 'news',
					component: News
				},
				{
					path: 'newsDetail',
					component: NewsDetail
				},
				{
					path: 'yonghu',
					component: yonghuList
				},
				{
					path: 'yonghuDetail',
					component: yonghuDetail
				},
				{
					path: 'yonghuAdd',
					component: yonghuAdd
				},
				{
					path: 'yisheng',
					component: yishengList
				},
				{
					path: 'yishengDetail',
					component: yishengDetail
				},
				{
					path: 'yishengAdd',
					component: yishengAdd
				},
				{
					path: 'keshi',
					component: keshiList
				},
				{
					path: 'keshiDetail',
					component: keshiDetail
				},
				{
					path: 'keshiAdd',
					component: keshiAdd
				},
				{
					path: 'chongwuyiyuan',
					component: chongwuyiyuanList
				},
				{
					path: 'chongwuyiyuanDetail',
					component: chongwuyiyuanDetail
				},
				{
					path: 'chongwuyiyuanAdd',
					component: chongwuyiyuanAdd
				},
				{
					path: 'yaopinfenlei',
					component: yaopinfenleiList
				},
				{
					path: 'yaopinfenleiDetail',
					component: yaopinfenleiDetail
				},
				{
					path: 'yaopinfenleiAdd',
					component: yaopinfenleiAdd
				},
				{
					path: 'yaopinxinxi',
					component: yaopinxinxiList
				},
				{
					path: 'yaopinxinxiDetail',
					component: yaopinxinxiDetail
				},
				{
					path: 'yaopinxinxiAdd',
					component: yaopinxinxiAdd
				},
				{
					path: 'yuyueguahao',
					component: yuyueguahaoList
				},
				{
					path: 'yuyueguahaoDetail',
					component: yuyueguahaoDetail
				},
				{
					path: 'yuyueguahaoAdd',
					component: yuyueguahaoAdd
				},
				{
					path: 'jiuzhenxinxi',
					component: jiuzhenxinxiList
				},
				{
					path: 'jiuzhenxinxiDetail',
					component: jiuzhenxinxiDetail
				},
				{
					path: 'jiuzhenxinxiAdd',
					component: jiuzhenxinxiAdd
				},
				{
					path: 'yizhuxinxi',
					component: yizhuxinxiList
				},
				{
					path: 'yizhuxinxiDetail',
					component: yizhuxinxiDetail
				},
				{
					path: 'yizhuxinxiAdd',
					component: yizhuxinxiAdd
				},
				{
					path: 'kaiyaodingdan',
					component: kaiyaodingdanList
				},
				{
					path: 'kaiyaodingdanDetail',
					component: kaiyaodingdanDetail
				},
				{
					path: 'kaiyaodingdanAdd',
					component: kaiyaodingdanAdd
				},
				{
					path: 'newstype',
					component: newstypeList
				},
				{
					path: 'newstypeDetail',
					component: newstypeDetail
				},
				{
					path: 'newstypeAdd',
					component: newstypeAdd
				},
				{
					path: 'aboutus',
					component: aboutusList
				},
				{
					path: 'aboutusDetail',
					component: aboutusDetail
				},
				{
					path: 'aboutusAdd',
					component: aboutusAdd
				},
				{
					path: 'systemintro',
					component: systemintroList
				},
				{
					path: 'systemintroDetail',
					component: systemintroDetail
				},
				{
					path: 'systemintroAdd',
					component: systemintroAdd
				},
			]
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
	]
})
