import React from 'react';
import { Row, Col } from 'antd';
// less样式
import './index.less';

const list = [
    { id: 1, title: 'dMall导航', 
        content: [
            { cid: 1, url: '/', name: '首页' },
            { cid: 2, url: '/products', name: '杂货铺' },
            { cid: 3, url: '/message', name: '留言' }
        ]
    },
    { id: 2, title: '框架', 
        content: [
            { cid: 1, url: 'https://cn.vuejs.org/', name: 'Vue' },
            { cid: 2, url: 'https://vuex.vuejs.org/zh/', name: 'VueX' },
            { cid: 3, url: 'https://element.eleme.io/#/zh-CN', name: 'Element-ui' }
        ]
    },
    { id: 3, title: '社区', 
        content: [
            { cid: 1, url: 'https://juejin.im/', name: '掘金' },
            { cid: 2, url: 'https://segmentfault.com/', name: 'SegmentFault 思否' },
            { cid: 3, url: 'https://github.com/', name: 'GitHub' },
            { cid: 4, url: 'https://www.csdn.net/', name: 'CSDN' }
        ]
    }
]

// ------------------------------- 底部导航 ----------------------------------------- //
export default () => {
    return (        
        <div className='dm_footerBar'>
            <Row className='common_width'>
                {
                    list.map(item01 => {
                        return (
                            <Col span={ 8 } key={ item01.id }>
                                <i>{ item01.title }</i>
                                {
                                    item01.content.map(item02 => {
                                        return (
                                            <a target='_blank' href={ item02.url } key={ item02.cid }>{ item02.name }</a>
                                        )
                                    })
                                }
                            </Col>
                        );
                    })
                }
            </Row>
            <div className='copyright'>
                <div className='common_width'>demoMall3.0 react-hooks版本 2020/07/12</div>
            </div>
        </div>
    );
};