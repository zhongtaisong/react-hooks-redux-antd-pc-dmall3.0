import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, InputNumber, Typography, Pagination, Tag, Empty } from 'antd';
import { Link } from 'react-router-dom';
// 接口服务
import service from './service';
// 筛选条件 - 组件
import FilterComponent from './components/filter';
// 样式
import './index.less';

const { Meta } = Card;
const { Title } = Typography;
// 一页展示多少条数据
const SIZE = 10;
// ------------------------------------------------- 杂货铺 -------------------------------- //
export default ({ history, _url, _ellipsis, _service }) => {
    // 字典表
    const tableDic = JSON.parse(sessionStorage.getItem('tableDic') || '{}');
    // 筛选条件 - 列表
    const [filterList, setFilterList] = useState([]);
    // 商品 - 列表
    const [productList, setProductList] = useState([]);
    // 已选中的筛选条件
    let [filter, setFilter] = useState({});
    // 控制tag显示与隐藏
    const [visible, setVisible] = useState({});
    // 当前页
    const [current, setCurrent] = useState(1);
    // 一页多少条数据
    const [pageSize, setPageSize] = useState(SIZE);
    // 数据总数
    const [total, setTotal] = useState(SIZE);

    useEffect(() => {
        service('getFilterData', _service)().then(data => {
            setFilterList(data);
        });
        service('getProductsData', _service)({
            current,
            pageSize,
            onLine: 100,
            filterList: filter
        }).then(({ products, pageSize, total }) => {
            setProductList(products);
            setPageSize(pageSize);
            setTotal(total);
        });
    }, []);

    // 筛选条件 - 操作
    const handleFilter = (_this) => {
        const obj = {
            common(visible={}, filter={}) {
        
                setVisible(visible);
                setFilter(filter);
                setCurrent(1);

                service('getProductsData', _service)({
                    current: 1,
                    pageSize,
                    onLine: 100,
                    filterList: filter
                }).then(({ products, pageSize, total }) => {
                    setProductList(products);
                    setPageSize(pageSize);
                    setTotal(total);
                });

            },
            // 获取选中的筛选条件
            getFilter(key, value) {
                let visible = {};
        
                filter[key] = value;
                Object.keys(filter).map((item, index) => {
                    visible[item] = true;
                });
                
                obj.common(visible, filter);
            },
            // 删除指定筛选条件
            deleteFilter(item) {
                delete filter[item];
                visible[item] = false;
                
                obj.common(visible, filter);
            },
            // 清空筛选
            clearFilter() {
                obj.common();
            }
        };
        return function() {
            typeof obj[_this] === 'function' && obj[_this].apply(this, ...arguments);
        };
    }

    // 监听 - 页码变化
    const handlePageChange = (page) => {

        setCurrent(page);

        service('getProductsData', _service)({
            current: page,
            pageSize,
            onLine: 100,
            filterList: filter
        }).then(({ products, pageSize, total }) => {
            setProductList(products);
            setPageSize(pageSize);
            setTotal(total);
        });
        
        // this.setState({
        //     numObj: {}
        // });
    }

    return (
        <div className='dm_products'>
            <div className='common_width'>
                <div className='dm_products__title'>
                    <h1>商品筛选</h1>
                    <span>共 { total }件商品</span>
                </div>
                <div className='dm_products__current'>
                    {
                        Object.keys(filter).length ? (
                            <>
                                {
                                    Object.keys(filter).map((item, index) => {
                                        return (
                                            <Tag color='blue' key={ index } visible={ visible[item] } closable 
                                                onClose={ handleFilter('deleteFilter').bind(this, item) }
                                            >{ item == 'brandId' && tableDic ? tableDic.BRAND_LIST[filter[item]] : filter[item] }</Tag>
                                        );
                                    })
                                }
                                <p onClick={ handleFilter('clearFilter') }>清空筛选</p>
                            </>
                        ) : (                                
                            <Tag color='blue'>暂无筛选条件</Tag>
                        )
                    }
                </div>
                {/* 筛选条件 */}
                <FilterComponent filterList={ filterList } currentFilter={ handleFilter('getFilter') } tableDic={ tableDic } />
                {
                    productList.length ? (
                        <Row className='dm_products__all'>
                            {
                                productList.map(item => {
                                    return (
                                        <Col span={ 4 } key={ item.key }>
                                            <Card
                                                key={ item.key }
                                                bordered={ false }
                                                cover={
                                                    <img
                                                        alt=''
                                                        src={ `${ _url }${ item.mainPicture }` }
                                                        onClick={() => history.push(`/products/detail/${item.id}`)}
                                                        title={ item.copywriting }
                                                    />
                                                }
                                                actions={[
                                                    <InputNumber min={ 1 } max={ 99 } value={ 1 } 
                                                        // onChange={ this.watchNumber.bind(this, `num${item.key}`) } 
                                                    />,
                                                    <Button type="primary" ghost 
                                                        // onClick={ this.handleAddCart.bind(this, item, `num${item.key}`) }
                                                    >加入购物车</Button>
                                                ]}
                                            >
                                                <Meta
                                                    title={ <Title level={ 4 }><span className='unit'>￥</span>{ item.price ? Number(item.price).toFixed(2) : 0 }</Title> }
                                                    description={ 
                                                        <Link 
                                                            to={`/products/detail/${item.id}`}
                                                            title={ item.description }
                                                        >{ _ellipsis(item.description, 45) }</Link> 
                                                    }
                                                />
                                            </Card>
                                        </Col>
                                    );
                                })
                            }
                        </Row>
                    ) : (                            
                        <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='抱歉！没有找到符合筛选条件的商品' />
                    )
                }
                {
                    total ? (
                        <Pagination 
                            current={ current } 
                            pageSize={ pageSize }
                            total={ total } 
                            onChange={ handlePageChange } 
                            showTotal={ total => `共 ${total} 条` }
                        />
                    ) : ''
                }
            </div>
        </div>
    );
};