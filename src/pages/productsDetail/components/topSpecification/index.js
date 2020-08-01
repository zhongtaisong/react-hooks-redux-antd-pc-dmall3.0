import React, { Fragment } from 'react';
import { Row, Col, Typography, InputNumber, Button, Tooltip } from 'antd';
// less样式
import './index.less';

const { Title, Paragraph } = Typography;
// ------------------------------------------- 商品详情 - 规格 ---------------------------------- //
export default ({ 
    basicInfo={}, imgList=[], specs=[], handleTogglePic=()=>{}, actionIndex, handleToggleSpecs=()=>{}, watchNumber=()=>{},
    immediatePurchase=()=>{}, handleAddCart=()=>{}, num=1
}) => {
    return (
        <div className='CommoditySpecification'>
            <Row>
                <Col span={ 8 }>
                    <dl>
                        <dt>
                            {
                                imgList[actionIndex] ? (
                                    <img src={ React.$url + imgList[actionIndex] } alt='loading...' />
                                ) : ''
                            }
                        </dt>
                        <dd>
                            {
                                imgList.map((item, index) => {
                                    return (
                                        <div key={ index } onMouseOver={ handleTogglePic.bind(this, index) } className={ actionIndex === index ? 'active' : '' }>
                                            <img src={ React.$url + item } alt='' />
                                        </div>
                                    );
                                })
                            }
                        </dd>
                    </dl>
                </Col>
                <Col span={ 16 }>
                    <Title level={ 4 } title={ basicInfo.description ? basicInfo.description : '敬请期待~~~' }>{ basicInfo.description ? basicInfo.description : '敬请期待~~~' }</Title>
                    <h3 className='ellipsis' title={ basicInfo.copywriting ? basicInfo.copywriting : '敬请期待~~~' }>{ basicInfo.copywriting ? basicInfo.copywriting : '敬请期待~~~' }</h3>
                    <div className='price'>售价：
                        <Title level={ 3 }><span className='unit'>￥</span>{ basicInfo.price ? Number(basicInfo.price).toFixed(2) : 0 }</Title>
                    </div>
                    <Row className='Specifications'>
                        <Col span={ 2 }>规格：</Col>
                        <Col span={ 22 }>
                            <Row>
                                {
                                    specs.length ? (
                                        specs.map(item => {
                                            return (
                                                <Fragment key={ item.id }>
                                                    <Col span={ 11 } className={ basicInfo.id === item.id ? 'active' : '' }
                                                        onClick={ handleToggleSpecs.bind(this, item.id) }
                                                    >
                                                        <Paragraph ellipsis title={ item.spec }>{ item.spec }</Paragraph>
                                                    </Col>
                                                    <Col span={ 1 }></Col>
                                                </Fragment>
                                            );
                                        })
                                    ) : (
                                        <>
                                            <Col span={ 11 } >
                                                <Paragraph ellipsis title='没错，我就是规格'>没错，我就是规格</Paragraph>
                                            </Col>
                                            <Col span={ 1 }></Col>
                                        </>
                                    )
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row className='Number'>
                        <Col span={ 2 }>数量：</Col>
                        <Col span={ 22 }>
                            <InputNumber min={ 1 } max={ 99 } value={ num } precision={ 0 } onChange={ watchNumber } />
                        </Col>
                    </Row>
                    <Row className='handleButton'>
                        <Col span={ 2 }></Col>
                        <Col span={ 22 }>
                            <Button type="primary" size='large' ghost onClick={ immediatePurchase }>立即购买</Button>
                            <Button type="primary" size='large' onClick={ handleAddCart }>加入购物车</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};