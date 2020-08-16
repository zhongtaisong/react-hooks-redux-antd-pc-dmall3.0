import React from 'react';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default ({ title='title', okText='是', cancelText='否', onConfirm, children='' }) => {
    return (        
        <Popconfirm
            title={ title }
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            onConfirm={ () => typeof onConfirm === 'function' && onConfirm() }
            okText={ okText }
            cancelText={ cancelText }
    >   { children }</Popconfirm>
    );
}