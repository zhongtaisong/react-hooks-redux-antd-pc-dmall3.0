import React, { useState, useEffect } from 'react';
import { Table, Row, Typography } from 'antd';
// 接口服务
import { getKwData } from './service';
// 各种表头
import { columns } from './data';
// less样式
import './index.less';

// ------------------------------------ 搜索结果 ---------------------------------- //
export default ({ _service, _url, match }) => {
    const [list, setList] = useState([]);
    const { kws } = match.params || {};

    useEffect(() => {
        getKwData(_service)({ kws }).then(res => {
            res.data.code == 200 && setList(res.data.data);
        })
    }, [kws])

    return (
        <div className='common_width dm_SearchResults'>
            <Row className='table_title'>
                <Typography.Title level={ 4 }>搜索结果</Typography.Title>
                <div>（共搜索到 <i>{ list.length }</i> 条数据）</div>
            </Row>
            <Table 
                columns={ columns(_url) } 
                dataSource={ list } 
                rowKey={ (record) => record.id }
                pagination={ false }
                size='small'
            />
        </div>
    );
};