import React, { Fragment } from 'react';
import { Row, Col, message } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import { observer } from 'mobx-react';
// 数据
// import state from './state';
// 全局数据
// import $state from '@store';
// less样式
import './index.less';

// ---------------------------------------------- 顶部导航菜单 ---------------------------- //
export default () => {
    return (
        <div className='dm_headerBar_top'>
            <Row className='common_width'>
                <Col span={ 6 }>
                    <EnvironmentOutlined style={{ paddingRight: '4px' }} />
                    上海
                </Col>
                <Col span={ 18 }>
                    {/* {
                        uname ? (
                            <Fragment>
                                <span>欢迎你，{ uname }</span>
                                <span onClick={ this.intoTargetPage.bind(this, 'logout') }>退出登录</span>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <span onClick={ this.intoTargetPage.bind(this, 'login') }>登录</span>
                                <span onClick={ this.intoTargetPage.bind(this, 'register') }>注册</span>
                            </Fragment>
                        )
                    } */}
                    <Link to='/login'>登录</Link>
                    <Link to='/'>注册</Link>
                    <Link to='/'>我的订单</Link>
                    <Link to='/'>我的收藏</Link>
                    <Link to='/'>用户中心</Link>
                </Col>
            </Row>
        </div>
    );
};