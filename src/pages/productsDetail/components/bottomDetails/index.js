import React, { useState, useEffect } from 'react';
import { Tabs, Row, Col } from 'antd';
// 商品评价 - 组件
import Comments from './../comments';
// less样式
import './index.less';

const { TabPane } = Tabs;
// ------------------------------------------------- 商品详情 - 商品介绍 and 商品评价 -------------------------------------------- //
const _info = [
    { id: 1, label: '品牌', key: 'brandId', value: '' },
    { id: 2, label: '商品名称', key: 'productName', value: '' },
    { id: 3, label: '商品毛重', key: 'weight', value: '' },
    { id: 4, label: '商品产地', key: 'placeOfOrigin', value: '' },
    { id: 5, label: '系统', key: 'systems', value: '' },
    { id: 6, label: '处理器', key: 'cpu', value: '' },
    { id: 7, label: '厚度', key: 'thickness', value: '' },
    { id: 8, label: '硬盘容量', key: 'disk', value: '' },
    { id: 9, label: '待机时长', key: 'standbyTime', value: '' },
    { id: 10, label: '系列', key: 'series', value: '' },
    { id: 11, label: '裸机重量', key: 'bareWeight', value: '' },
    { id: 12, label: '屏幕尺寸', key: 'screenSize', value: '' },
    { id: 13, label: '显卡型号', key: 'gpu', value: '' },
    { id: 14, label: '特性', key: 'characteristic', value: '' },
    { id: 15, label: '内存容量', key: 'memory', value: '' },
    { id: 16, label: '显存容量', key: 'gpuCapacity', value: '' },
    { id: 17, label: '机身材质', key: 'bodyMaterial', value: '' }
];
export default ({ params={}, detailsPic=[] }) => {

    // 字典表
    const tableDic = JSON.parse(sessionStorage.getItem('tableDic') || '{}');
    const [info, setInfo] = useState(_info);

    useEffect(() => {
        for(let p in params){
            info.map(item => {
                if( p == item.key ){
                    item['value'] = params[p];
                }
            });
        }
        setInfo(info);
    }, [params])

    return (
        <div className='CommodityDetails'>
            <Tabs defaultActiveKey='1' style={{ padding: '0 20px', color: '#666' }}>
                <TabPane tab={ <span className='tab_title'>商品介绍</span> } key={ 1 }>
                    <dl className='Parameter'>
                        {
                            info.map(item => {
                                if( item.id == 1 ) {
                                    return <dt key={ item.id } title={ item.value }>{ item.label }：{ tableDic['BRAND_LIST'] ? tableDic['BRAND_LIST'][item.value] : item.value }</dt>;
                                }
                                return <dd key={ item.id } title={ item.value }>{ item.label }：{ item.value }</dd>
                            })
                        }
                    </dl>
                    <Row>
                        {
                            detailsPic.map((item, index) => {
                                return (
                                    <Col span={ 24 } style={{ textAlign: 'center' }} key={ index }>
                                        <img src={ React.$url + item } style={{ width: '750px', height: 'auto' }} /> 
                                    </Col>
                                );
                            })
                        }
                    </Row>
                </TabPane>
                <TabPane tab={ <span className='tab_title'>商品评价</span> } key={ 2 } >
                    <Comments pid={ params.id || '' } />
                </TabPane>
            </Tabs>
        </div>
    );
};