import React from 'react';
import { InputNumber } from 'antd';
import { Link } from 'react-router-dom';
// 全局公共组件
import { Popconfirm } from '@com';

export const columns = (_url, handleCollection) => {
    return (
        [
            {
                title: '图片',
                dataIndex: 'mainPicture',
                key: 'mainPicture',
                align: 'center',
                width: '10%',
                render: (text, record, index) => <img className='imgs_style' src={ `${ _url }${ text }` } alt={ text } />
            },
            {
                title: '商品',
                dataIndex: 'description',
                key: 'description',
                align: 'center',
                width: '44%',
                render: (text, record, index) => {
                    return (
                        <Link className='title_style' to={'/views/products/detail/' + record.pid}>
                            <span title={ text }>{ text }</span>
                            <span className='ellipsis'>规格：{ record.spec }</span>
                        </Link>
                    );
                }
            },
            {
                title: '单价',
                dataIndex: 'price',
                key: 'price',
                align: 'center',
                width: '16%',
                render: (text, record, index) => Number(text) ? `￥${Number(text).toFixed(2)}` : 0
            },
            {
                title: '数量',
                dataIndex: 'num',
                key: 'num',
                align: 'center',
                width: '14%',
                render: (text, record, index) => {
                    return (
                        <InputNumber min={ 1 } max={ 99 } defaultValue={ text } precision={ 0 } onChange={ (value) => {
                            let totalPrice = parseFloat( record.price ) * value;
                            // state.updatecartData(record.id, value, totalPrice);
                            // state.setPriceList02(index, 'totalP', [value, totalPrice]);
                        } } />
                    );
                }
            },
            {
                title: '小计',
                dataIndex: 'totalprice',
                key: 'totalprice',
                align: 'center',
                width: '16%',
                render: (text, record, index) => text ? `￥${parseFloat( text ).toFixed(2)}` : 0
            },
            {
                title: '操作',
                dataIndex: 'operation',
                key: 'operation',
                align: 'center',
                width: '148px',
                render: (text, record, index) => {
                    return (              
                        <div className='operation'>
                            <Popconfirm title="你确定要删除这条数据？">
                                <span>删除</span>
                            </Popconfirm>
                            <span onClick={ () => typeof handleCollection === 'function' && handleCollection([record.id]) }>加入收藏</span>
                        </div>
                    );
                }
            }
        ]
    );
};