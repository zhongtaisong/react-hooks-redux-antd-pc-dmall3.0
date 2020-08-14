import React, { useState, useEffect } from 'react';
import { Table, Typography, Row, Col, message, Button } from 'antd';
// 各种表头
import { columns } from './data';
// 接口服务
import service from './service';
// 数据
// import state from './state';
// less样式
import './index.less';

// ------------------------------------------ 我的购物车 ---------------------------------- //
// class MyShoppingCart extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedRowKeys: [],
//             selectedRows: [],
//             cartId: [],
//             pidArr: []
//         };
//     }

//     componentDidMount() {
//         state.cartLisData();        
//     }

//     // 选中行
//     rowSelection = {
//         // fixed: true,
//         type: 'checkbox',
//         onChange: (selectedRowKeys, selectedRows) => {
//             this.setState(() => ({
//                 selectedRowKeys,
//                 selectedRows
//             }));
//             let sRows = selectedRows.map((item, index) => {
//                 return { totalP: [ item.num, item.totalprice ] };
//             });
//             state.setPriceList01( sRows );
//             let data = selectedRows.map(item => {
//                 if( selectedRowKeys.includes(item.id) ){
//                     return item.id;
//                 }
//             });
//             this.setState({
//                 cartId: data,
//                 pidArr: selectedRows.map(item => item.pid)
//             });
//         }
//     };

//     // 表格底部
//     footer = () => {
//         let total = 0;
//         let size = 0;
//         toJS( state.priceList ).forEach((item, index) => {
//             total += item.totalP[1];
//             size += item.totalP[0];
//         });
//         return (
//             <Row>
//                 <Col span={ 12 } className='left'>
//                     <Button onClick={ this.handleDeleteProduct }>批量删除</Button>
//                     <Button onClick={ this.handleCollectionProduct }>批量加入收藏</Button>
//                 </Col>
//                 <Col span={ 12 } className='right'>
//                     <span className='num'>已选择<i>{ size }</i>件商品</span>
//                     <div>
//                         总价：<span>¥{ total.toFixed(2) }</span>
//                     </div>
//                     <span className='go-pay' onClick={ this.handleGoPay }>去结算</span>
//                 </Col>
//             </Row>
//         );
//     }

//     // 结算
//     handleGoPay = () => {
//         const { selectedRows, pidArr } = this.state;
//         if( selectedRows.length ){
//             this.props.history.push({
//                 pathname: '/views/products/cart/settlement',
//                 state: {
//                     id: pidArr,
//                     type: 'cart'
//                 }
//             });
//         }else{
//             message.warning('请选择需要结算的商品！');
//         }
//     }

//     // 删除
//     handleDeleteProduct = () => {
//         const { cartId } = this.state;
//         if( cartId.length ){
//             state.delcartData(cartId);
//             this.setState(() => ({
//                 selectedRowKeys: [],
//                 selectedRows: []
//             }));
//         }else{
//             message.warning('请选择需要删除的商品！');
//         }
//     }

//     // 收藏
//     handleCollectionProduct = () => {
//         const { cartId } = this.state;
//         if( cartId.length ){
//             state.addcolsData(cartId);
//         }else{
//             message.warning('请选择需要收藏的商品！');
//         }
//     }

//     render() {
//         const { dataSource, allProductsSize } = state;
//     }
// }

export default ({ _url, _service }) => {
    const [dataSource, setDataSource] = useState([]);
    const [checkedSize, setCheckedSize] = useState(0);
    const [totalSize, setTotalSize] = useState(0);

    useEffect(() => {
        service('getSelectCartData', _service)({
            uname: sessionStorage.getItem('uname'),
            collection: 0
        }).then(res => {
            const { code, data=[] } = res.data ||{};
            code == 200 && setDataSource(data);
        });
    }, [])

    // 当前购物车共有多少件商品
    const handleTotalSize = () => {
        if( !Array.isArray(dataSource) ) return 0;
        let _data = dataSource.reduce((total, current, index, arr) => {
            return total + current.num;
        }, 0)
        return _data || 0;
    }

    // 累加
    const computedSum = (data=[], key) => {
        return data.reduce((total, item, index, arr) => {
            return total + (item[key] || 0);
        }, 0);
    }

    // 选中行
    const rowSelection = {
        type: 'checkbox',
        onChange: (selectedRowKeys=[], selectedRows=[]) => {
            // 计算被选中商品数量
            setCheckedSize( computedSum(selectedRows, 'num') );
            // 计算被选中商品总价
            setTotalSize( computedSum(selectedRows, 'totalprice') );
        }
    };

    // 表格底部按钮
    const footer = () => {
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button>批量删除</Button>
                    <Button>批量加入收藏</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ checkedSize }</i>件商品</span>
                    <div>
                        总价：<span>¥{ totalSize.toFixed(2) }</span>
                    </div>
                    <span className='go-pay'>去结算</span>
                </Col>
            </Row>
        );
    }

    return (
        <div className='common_width dm_shoppingCart'>
            <Row className='table_title'>
                <Typography.Title level={ 4 }>我的购物车</Typography.Title>
                <div>（当前购物车共有 <i>{ handleTotalSize() }</i> 件商品）</div>
            </Row>
            <Table 
                columns={ columns(_url) } 
                dataSource={ dataSource } 
                pagination={ false }
                scroll={{ x: false, y: 330 }}
                size='small'
                footer={ footer }
                bordered
                rowSelection={ rowSelection }
                rowKey={ (record) => record.id }
            />
        </div>
    );
};