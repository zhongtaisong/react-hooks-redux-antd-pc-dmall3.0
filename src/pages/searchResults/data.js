import React from 'react';
import { Link } from 'react-router-dom';

export const columns = (_url) => ([
    {
        title: '',
        dataIndex: 'mainPicture',
        key: 'mainPicture',
        width: '10%',
        render: (text, record, index) => <img className='imgs-style' src={ `${ _url }${ text }` } alt={ text } />
    },
    {
        title: '商品描述',
        dataIndex: 'description',
        key: 'description',
        width: '60%',
        render: (text, record, index) => {
            return (
                <Link className='title_style' title={ text } style={{ 'white-space': 'normal', 'word-break': 'break-all' }}
                    to={`/products/detail/${record.id}`}
                >{ text }</Link>
            );
        },
        ellipsis: true
    },
    {
        title: '商品规格',
        dataIndex: 'spec',
        key: 'spec',
        width: '20%',
        ellipsis: true
    },
    {
        title: '商品单价',
        dataIndex: 'price',
        key: 'price',
        width: '10%',
        render: (text, record, index) => text ? `￥${parseFloat( text ).toFixed(2)}` : 0
    }
]);