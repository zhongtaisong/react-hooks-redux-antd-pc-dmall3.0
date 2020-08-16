import React, { useState, useEffect } from 'react';
import { Table, Typography, Row, Col, message, Button } from 'antd';
// 各种表头
import { columns } from './data';
// 数据
// import state from './state';
// 接口服务
import service from './service';
// less样式
import './index.less';

// ------------------------------------------ 我的收藏 ---------------------------------- //
// @observer
// class MyCollection extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedRowKeys: [],
//             selectedRows: [],
//             cartId: []
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
//             let data = selectedRows.map(item => {
//                 if( selectedRowKeys.includes(item.id) ){
//                     return item.id;
//                 }
//             });
//             this.setState({
//                 cartId: data
//             });
//         }
//     };

//     // 表格底部
//     footer = () => {
//         return (
//             <Row>
//                 <Col span={ 12 } className='left'>
//                     <Button onClick={ this.handleDeleteProduct }>批量删除</Button>
//                     <Button onClick={ this.handleCollectionProduct }>批量加入购物车</Button>
//                 </Col>
//                 <Col span={ 12 } className='right'>
//                     <span className='num'>已选择<i>{ this.state.selectedRowKeys.length }</i>件商品</span>
//                 </Col>
//             </Row>
//         );
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

//     // 加入购物车
//     handleCollectionProduct = () => {
//         const { cartId } = this.state;
//         if( cartId.length ){
//             state.addcolsData(cartId);
//         }else{
//             message.warning('请选择需要加入购物车的商品！');
//         }
//     }

//     render() {
//         const { dataSource } = state;
//     }
// }

export default ({ _url, _service, getCartNumData }) => {
    const [dataSource, setDataSource] = useState([]);
    const [checkedSize, setCheckedSize] = useState(0);
    const [sRowKeys, setSRowKeys] = useState([]);

    useEffect(() => {
        getAllCollectionData();
    }, []);

    // 获取收藏商品
    const getAllCollectionData = () => {
        service('getAllCollectionData', _service)().then(res => {
            const { code, data=[] } = res.data ||{};
            code == 200 && setDataSource(data);
        });
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
            setSRowKeys(selectedRowKeys);
            // 计算被选中商品数量
            setCheckedSize( computedSum(selectedRows, 'num') );
        }
    };

    // 表格底部
    const footer = () => {
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button>批量删除</Button>
                    <Button onClick={ () => handleCart(sRowKeys) }>批量加入购物车</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ checkedSize }</i>件商品</span>
                </Col>
            </Row>
        );
    }

    // 加入购物车
    const handleCart = (data = []) => {
        if( !data.length ) return message.warning('请选择需要加入购物车的商品！');
        service('postAddCollectionData', _service)(data).then(res => {
            const { code } = res.data ||{};
            if( code == 200 ) {
                getAllCollectionData();
                getCartNumData();
            }
        });;
    }

    return (
        <div className='common_width dm_MyCollection'>
            <Row className='table_title'>
                <Typography.Title level={ 4 }>我的收藏</Typography.Title>
                <div>（当前共有 <i>{ dataSource.length }</i> 件藏品）</div>
            </Row>
            <Table 
                columns={ columns(_url, handleCart) } 
                dataSource={ dataSource || [] } 
                pagination={ false }
                scroll={{ x: false, y: 330 }}
                footer={ footer }
                bordered
                rowSelection={ rowSelection } 
                rowKey={ (record) => record.id }
            />
        </div>
    );
};