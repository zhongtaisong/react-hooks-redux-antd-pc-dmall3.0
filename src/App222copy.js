import React, { useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
// 根组件
import RootComponent from '@pages';
// 主入口less样式
import './App.less';

export default () => {

    useEffect(() => {
        getDicData();
    })

    const getDicData = async () => {
        const res = await React.$service.getDicData();
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

    return (
        <div className="dm_app">
            <HashRouter basename='/dm'>
                <Switch>
                    <Route path='/home' component={ RootComponent } />
                    <Redirect exact from='/' to='/home' />
                </Switch>
            </HashRouter>
        </div>
    );
};