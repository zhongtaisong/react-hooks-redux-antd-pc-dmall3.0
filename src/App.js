import React, { useEffect, useState } from 'react';
import { HashRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import md5 from 'js-md5';
import { message } from 'antd';
// 顶部导航 - 组件
import { HeaderBar, FooterBar } from '@com';
// 全局设置
import { $url, $key, $globalCloseTime } from '@config';
// 全局公共方法
import { validatePhone, $ellipsis } from '@utils';
// 路由
import routes from './router';
// 接口服务
import service from '@service';
// 主入口less样式
import './App.less';

// 重置滚动条
const ScrollTop = ({ children }) => {

    const { pathname } = useLocation() || {};
    
    useEffect(() => {
        window.scrollTo(0, 0);
        message.destroy();
    }, [pathname])

    return children;
}

export default () => {

    const [isHeader, setIsHeader] = useState(true);
    const [isFooter, setIsFooter] = useState(true);
    const [productNum, setProductNum] = useState(0);

    useEffect(() => {
        getDicData();
        getCartNumData();
    }, [])

    // 查字典表
    const getDicData = async () => {
        const res = await service.getDicData();
        try {
            if( res.data.code == 200 ) {
                let { data } = res.data || {};
                if( data ){
                    data['GENDER'] = {
                        0: '男',
                        1: '女',
                        2: '保密'
                    };
                    sessionStorage.setItem('tableDic', JSON.stringify(data));
                    
                    let newData = data;
                    for(let k in newData){
                        let arr = [];
                        for(let [key, value] of Object.entries(newData[k])){
                            arr.push({
                                code: key,
                                name: value
                            });
                        }
                        newData[k] = arr;
                    }
                    sessionStorage.setItem('selectDic', JSON.stringify(newData));
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    // 查询购物车商品数量
    const getCartNumData = async () => {
        try {
            const res = await service.getCartNumData({
                uname: sessionStorage.getItem('uname')
            });
            if( res.data.code == 200 ) {
                setProductNum(res.data.data || 0);
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <div className="dm_app">
            <HashRouter basename='/dm'>
                {
                    isHeader ? (<HeaderBar _service={ service } productNum={ productNum } />) : ''
                }                
                <ScrollTop>
                    <Switch>
                        {
                            routes.map((item, index) => {
                                return (
                                    <Route key={ index } path={ item.path } exact={ item.exact } 
                                        render={ 
                                            props => <item.component {...props} 
                                                setIsHeader={ setIsHeader } 
                                                setIsFooter={ setIsFooter } 
                                                _url={ $url } 
                                                _key={ $key } 
                                                _ellipsis={ $ellipsis } 
                                                _service={ service } 
                                                _md5={ md5 } 
                                                _globalCloseTime={ $globalCloseTime } 
                                                _validatePhone={ validatePhone } 
                                                getCartNumData={ getCartNumData }
                                            /> 
                                        } 
                                    />
                                );
                            })
                        }
                        <Redirect from='/' to='/home' />
                    </Switch>
                </ScrollTop>
                {
                    isFooter ? (<FooterBar />) : ''
                }                
            </HashRouter>
        </div>
    );
};