import React, { Fragment } from 'react';
import { Row, Col } from 'antd';
// ------------------------------------------------- 杂货铺 - 筛选条件 -------------------------------- //
export default ({ filterList=[], currentFilter=()=>{} }) => {
    return (
        <div className='dm_products__filter'>
            {
                filterList.map((f, i) => {
                    return (<Fragment key={ i }>
                        <Row>
                            <Col span={ 2 }>品牌：</Col>
                            <Col span={ 22 }>
                                {
                                    f.brandId.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'brandId', item) }
                                            >{ React.$tableDic.BRAND_LIST ? React.$tableDic.BRAND_LIST[item] : item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>价格：</Col>
                            <Col span={ 22 }>
                                {
                                    ["0-3999", "4000-4499", "4500-4999", "5000-5499", "5500-5999", "6000-6999", "7000以上"].map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'price', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>屏幕尺寸：</Col>
                            <Col span={ 22 }>
                                {
                                    f.screenSize.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'screenSize', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>处理器：</Col>
                            <Col span={ 22 }>
                                {
                                    f.cpu.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'cpu', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>内存容量：</Col>
                            <Col span={ 22 }>
                                {
                                    f.memory.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'memory', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>硬盘容量：</Col>
                            <Col span={ 22 }>
                                {
                                    f.disk.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'disk', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>系统：</Col>
                            <Col span={ 22 }>
                                {
                                    f.systems.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'systems', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 2 }>厚度：</Col>
                            <Col span={ 22 }>
                                {
                                    f.thickness.map((item, index) => {
                                        return (
                                            <span key={ index }
                                                onClick={ currentFilter.bind(this, 'thickness', item) }
                                            >{ item }</span>
                                        );
                                    })
                                }
                            </Col>
                        </Row>
                    </Fragment>);
                })
            }        
        </div>
    );
};