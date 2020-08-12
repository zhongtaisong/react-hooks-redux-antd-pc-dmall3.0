import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Badge, message } from 'antd';
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { NavLink, useHistory } from 'react-router-dom';
// logo图片
import logoImg from '@img/logo.png';
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
    const history = useHistory();

    // 监听输入关键字
    const handleSearchKw = (value, e) => {
        if( !value.trim() ) return message.warning('请输入您要搜索的商品！');
        history.push(`/products/searchResults/${value}`);
    }
    
    return (        
        <div className='dm_headerBar_search'>
            <Row className='common_width'>
                <Col span={ 4 } className='dm_headerBar_search__logo' style={ logoBg } title='首页' onClick={ () => history.push('/') }></Col>
                <Col span={ 11 }>
                    <NavLink exact activeClassName='active' to='/home'>首页</NavLink>
                    <NavLink activeClassName='active' to='/products'>杂货铺</NavLink>
                    <NavLink activeClassName='active' to='/a'>留言</NavLink>
                </Col>
                <Col span={ 9 }>
                    <Input.Search placeholder="搜索商品" style={{ paddingRight: '10px' }} enterButton onSearch={ handleSearchKw } />
                    <Badge showZero count={ 66 } overflowCount={ 99 }>
                        <Button icon={<ShoppingCartOutlined />} type="primary" className='dm_headerBar_search__cart' 
                            onClick={ () => history.push('/products/cart') }
                        >我的购物车</Button>
                    </Badge>
                </Col>
            </Row>
        </div>
    );
};