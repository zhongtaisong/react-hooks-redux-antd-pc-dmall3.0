import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Badge, message } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
// import { observer } from 'mobx-react';
// logo图片
import logoImg from '@img/logo.png';
// 数据
// import state from './state';
// // 全局数据
// import $state from '@store';
// less样式
import './index.less';

// logo样式
const logoBg = {
    background: `url(${logoImg}) no-repeat`,
    height: '72px',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
};

// ------------------------------------------------- 导航菜单 ------------------------------------ //
export default () => {
    return (        
        <div className='dm_headerBar_search'>
            <Row className='common_width'>
                <Col span={ 4 } className='dm_headerBar_search__logo' style={ logoBg } title='首页'></Col>
                <Col span={ 11 }>
                    <NavLink exact activeClassName='active' to='/home'>首页</NavLink>
                    <NavLink activeClassName='active' to='/products'>杂货铺</NavLink>
                    <NavLink activeClassName='active' to='/a'>留言</NavLink>
                </Col>
                <Col span={ 9 }>
                    <Input.Search placeholder="搜索商品" style={{ paddingRight: '10px' }} enterButton />
                    <Badge showZero count={ 66 } overflowCount={ 99 }>
                        <Button icon={<ShoppingCartOutlined />} type="primary" className='dm_headerBar_search__cart' >我的购物车</Button>
                    </Badge>
                </Col>
            </Row>
        </div>
    );
};