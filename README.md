## 1.求和案例_redux迷你版
		(1).去除Count组件自身的状态
		(2).src下建立:
					-src
						-redux
							-store.js
							-count_reducer.js
		(3).store.js：
					1).引入redux中的createStore函数，创建一个store
					2).createStore调用时要传入一个为其服务的reducer
					3).记得暴露store对象
		(4).count_reducer.js：
					1).reducer的本质是一个函数，接收：preState,action，返回加工后的状态
					2).reducer有两个作用：初始化状态，加工状态
					3).reducer被第一次调用时，是store自动触发的，传递的preState是undefined
		(5).在index.js中检测store中状态的改变，一旦发生改变重新渲染<App/>
				备注：redux只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。

## 2.求和案例_redux完整版
		新增文件：
			1.count_action.js 专门用于创建action对象
			2.constant.js 放置编码容易疏忽写错action中的type

## 3.求和案例_redux异步action版
		 (1).明确：延迟的动作不想交给组件自身，想交给action
		 (2).何时需要异步action：想要对状态进行操作，但是具体的数据靠异步任务返回。
		 (3).具体编码：
		 			1).yarn add redux-thunk，并配置在store中
					 	//引入createStore，用于创建store对象：
						 
								import {createStore,applyMiddleware} from 'redux'
								import countReducer from './count_reducer'
								import thunk from 'redux-thunk'
								export default createStore(countReducer,applyMiddleware(thunk))

		 			2).创建action的函数不再返回一般对象，而是一个函数，该函数中写异步任务。
		 			3).异步任务有结果后，分发一个同步的action去真正操作数据。
		 (4).备注：异步action不是必须要写的，完全可以自己等待异步任务的结果了再去分发同步action。

## 4.求和案例_react-redux基本使用
			(1).明确两个概念：
						1).UI组件:不能使用任何redux的api，只负责页面的呈现、交互等。
						2).容器组件：负责和redux通信，将结果交给UI组件。
			(2).如何创建一个容器组件————靠react-redux 的 connect函数
							connect(mapStateToProps,mapDispatchToProps)(UI组件)
								-mapStateToProps:映射状态，返回值是一个对象
								-mapDispatchToProps:映射操作状态的方法，返回值是一个对象
			(3).备注：容器组件中的store是靠props传进去的，而不是在容器组件中直接引入


## 5.求和案例_react-redux优化
			1.整合UI组件与容器组件
			2.使用Provider批量给所有的容器组件传递store
			3.mapDispatchToProps也可以写成一个对象，形如：
					jia:加的actionCreator
					jian:减的actionCreator
					xxxx:yyyyy
					备注：xxx是传递给UI组件props的key，yyyy是对应业务逻辑的action
			4.一个组件要和redux通信，分为几步：
						（1）在组件中引入connect,使用connect(映射状态，映射操作状态的方法)(UI组件)
						（2）检查index.js中使用使用Provider提供store
						（3）根据是否操作状态，决定是否引入action