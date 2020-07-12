import React from 'react';
import { Anchor } from 'antd';
// 顶部导航菜单
import Top from './components/top';
// 导航菜单
import Search from './components/search';
// less样式
import './index.less';

// --------------------------- 顶部导航 ------------------------------ //
export default () => {
    return (
        <div className='dm_headerBar'>
            <Anchor>
                <Top />
                <Search />
            </Anchor>
        </div>
    )
};