import { Router } from 'express'
import UsersController from './Users'
import FileController from './File'
import ConfigController from './Config'
import CommonController from './Common'
import YonghuController from './Yonghu'
import YishengController from './Yisheng'
import KeshiController from './Keshi'
import ChongwuyiyuanController from './Chongwuyiyuan'
import YaopinfenleiController from './Yaopinfenlei'
import YaopinxinxiController from './Yaopinxinxi'
import YuyueguahaoController from './Yuyueguahao'
import JiuzhenxinxiController from './Jiuzhenxinxi'
import YizhuxinxiController from './Yizhuxinxi'
import KaiyaodingdanController from './Kaiyaodingdan'
import NewstypeController from './Newstype'
import NewsController from './News'
import StoreupController from './Storeup'
import AboutusController from './Aboutus'
import SystemintroController from './Systemintro'

export default ({ config, db }) => {
	let api = Router()

	api.use('/users', UsersController({ config, db }))

	api.use('/file', FileController({ config, db }))

	api.use('/config', ConfigController({ config, db }))

	api.use('/', CommonController({ config, db }))

	api.use('/yonghu', YonghuController({ config, db }))

	api.use('/yisheng', YishengController({ config, db }))

	api.use('/keshi', KeshiController({ config, db }))

	api.use('/chongwuyiyuan', ChongwuyiyuanController({ config, db }))

	api.use('/yaopinfenlei', YaopinfenleiController({ config, db }))

	api.use('/yaopinxinxi', YaopinxinxiController({ config, db }))

	api.use('/yuyueguahao', YuyueguahaoController({ config, db }))

	api.use('/jiuzhenxinxi', JiuzhenxinxiController({ config, db }))

	api.use('/yizhuxinxi', YizhuxinxiController({ config, db }))

	api.use('/kaiyaodingdan', KaiyaodingdanController({ config, db }))

	api.use('/newstype', NewstypeController({ config, db }))

	api.use('/news', NewsController({ config, db }))

	api.use('/storeup', StoreupController({ config, db }))

	api.use('/aboutus', AboutusController({ config, db }))

	api.use('/systemintro', SystemintroController({ config, db }))

	return api
}
