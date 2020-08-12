import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// 接口服务
import { postLogoutData } from './service';
// less样式
import './index.less';

// ---------------------------------------------- 顶部导航菜单 ---------------------------- //
export default ({ _service }) => {
    // 是否展示，欢迎你
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setIsShow(sessionStorage.getItem('uname') && localStorage.getItem('uname') && sessionStorage.getItem('uname') == localStorage.getItem('uname'));
    }, [sessionStorage.getItem('uname'), localStorage.getItem('uname')])

    // 退出登录
    const hanleLoginOut = () => {
        typeof postLogoutData === 'function' && postLogoutData(_service)().then(code => code === 200 && setIsShow(false));
    }
    
    return (
        <div className='dm_headerBar_top'>
            <Row className='common_width'>
                <Col span={ 6 }>
                    <EnvironmentOutlined style={{ paddingRight: '4px' }} />
                    上海
                </Col>
                <Col span={ 18 }>
                    {
                        isShow ? (
                            <>
                                <span>欢迎你，{ localStorage.getItem('uname') }</span>
                                <a onClick={ hanleLoginOut }>退出登录</a>
                            </>
                        ) : (
                            <>
                                <Link to='/login'>登录</Link>
                                <Link to='/register'>注册</Link>
                            </>
                        )
                    }
                    <Link to='/'>我的订单</Link>
                    <Link to='/'>我的收藏</Link>
                    <Link to='/'>用户中心</Link>
                </Col>
            </Row>
        </div>
    );
};