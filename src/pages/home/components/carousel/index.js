import React, { useState, useEffect } from 'react';
import { Carousel, Card, Button } from 'antd';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
// less样式
import './index.less';
// ------------------------------------------------- 首页 - 轮播图 -------------------------------- //
export default ({ history, _url, _service }) => {

    const [carouselList, setCarouselList] = useState([]);
    const [onePushList, setOnePushList] = useState([]);

    useEffect(() => {
        getBannerData();
        getOnepushData();
    }, []);
    
    // 获取轮播图 - 数据
    const getBannerData = async () => {
        const res = await _service.getBannerData();
        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                setCarouselList(data);
            }
        }catch(err) {
            console.log(err);
        }
    };
    
    // 获取单品推广 - 数据
    const getOnepushData = async () => {
        const res = await _service.getOnepushData();
        try{
            if( res.data.code === 200 ){
                const { data=[] } = res.data || {};
                setOnePushList(data);
            }
        }catch(err) {
            console.log(err);
        }
    };

    return (
        <div className='dm_carousel common_width'>
            <div className='dm_carousel__top'>
                <Carousel autoplay effect="fade">
                    {
                        carouselList.map( item => {
                            return (
                                <Link key={ item.id } 
                                    to={'/products/detail/' + item.id}
                                >
                                    <img src={ `${ _url }${ item.bannerPic }` } title={ item.description } />
                                </Link>
                            );
                        } )
                    }
                </Carousel>
            </div>
            <div className='dm_carousel__bottom'>                
                <Slider
                    autoplay={ false }
                    dots={ false }
                    infinite={ false }
                    speed={ 300 }
                    slidesToScroll={ 1 }
                    slidesToShow={ 3 }
                    prevArrow={ <Button className='dm_carousel__bottom--left' shape="circle" icon={<LeftOutlined />} /> }
                    nextArrow={ <Button className='dm_carousel__bottom--right' shape="circle" icon={<RightOutlined />} /> }
                >
                    {
                        onePushList.map( item => {
                            return (
                                <Card
                                    key={ item.id }
                                    hoverable={ false }
                                    bordered={ false }
                                    cover={<img src={ `${ _url }${ item.mainPicture }` } title={ item.description } />}
                                    onClick={ () => history.push('/products/detail/' + item.id) }
                                >
                                    <Card.Meta title={ item.productName } description={ item.description } />
                                </Card>
                            );
                        } )
                    }
                </Slider>                
            </div>
        </div>
    );
};