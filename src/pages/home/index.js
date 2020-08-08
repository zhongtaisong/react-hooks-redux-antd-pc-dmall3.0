import React from 'react';
// 首页 - 轮播图useLocation
import Carousel from './components/carousel';
// 本周热门
import Hot from './components/hot';

export default (props) => {
    return (
        <div className='dm_home'>
            <Carousel {...props} />
            <Hot {...props} />
        </div>
    );
};