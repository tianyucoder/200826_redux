/* 
	准备一个容器组件，该组件主要负责：和redux进行数据的交互，
	可以随意的使用redux的API，和UI组件是父子关系
*/

//引入Count的UI组件
import CountUI from '../../components/Count'

//引入connect用于连接UI与redux，且connect()()可以生成容器组件
import {connect} from 'react-redux'

function a(){ //借助a传递redux中的状态
	return {he:100}
}

function b(){ //借助b传递操作状态的方法
	return {
		jia:(number)=>console.log('放心，我会通知redux执行加的',number)
	}
}

//创建出来一个容器组件
const CountContainer = connect(a,b)(CountUI)

//暴露容器组件
export default CountContainer