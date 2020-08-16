import React from 'react';
import { Link } from 'react-router-dom';
// 全局公共组件
import { Popconfirm } from '@com';
// 数据
// import state from './state';

export const columns = (_url, handleCart) => ([
    {
        title: '图片',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        align: 'center',
        width: '10%',
        render: (text, record, index) => <img className='imgs_style' src={ `${ _url }${ text }` } alt={ text } />
    },
    {
        title: '商品名称',
        dataIndex: 'productName',
        key: 'productName',
        align: 'center',
        width: '14%',
        ellipsis: true
    },
    {
        title: '商品',
        dataIndex: 'description',
        key: 'description',
        align: 'center',
        width: '44%',
        render: (text, record, index) => {
            return (
                <Link className='title_style' to={'/views/products/detail/' + record.pid} title={ text }>{ text }</Link>
            );
        }
    },
    {
        title: '规格',
        dataIndex: 'spec',
        key: 'spec',
        align: 'center',
        width: '16%',
        ellipsis: true
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
                    <span onClick={() => typeof handleCart === 'function' && handleCart([record.id]) }>加入购物车</span>
                </div>
            );
        }
    }
]);
