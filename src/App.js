import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// 顶部导航 - 组件
import { HeaderBar, FooterBar } from '@com';
// 路由
import routes from './router';
// 主入口less样式
import './App.less';

function App() {
    return (
        <div className="dm_app">
            <HashRouter>
                <HeaderBar />
                <Switch>
                    {
                        routes.map((item, index) => {
                            return (
                                <Route key={ index } path={ item.path } exact={ item.exact } component={ item.component } />
                            );
                        })
                    }
                    <Redirect from='/' to='/home' />        
                </Switch>
                <FooterBar />    
            </HashRouter>
        </div>
    );
}

export default App;
