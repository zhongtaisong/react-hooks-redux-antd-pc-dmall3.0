import React, { useState, useEffect } from 'react';
import { Comment, Avatar, Empty } from 'antd';
import { LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined } from '@ant-design/icons';
// 接口服务
import service from './service';
// less样式
import './index.less';
// ------------------------------------------------------ 商品评价 ---------------------------------- //
export default ({ pid, _url, _service }) => {
    // 评价列表
    const [commentList, setCommentList] = useState([]);
    // 赞、踩 - 数量
    const [nums, setNums] = useState([]);
    // 赞、踩 - 操作记录
    const [action, setAction] = useState({});

    useEffect(() => {
        getCurrentCommentData();
    }, [pid]);

    // 重新获取评论列表 - 数据
    const getCurrentCommentData = () => {
        service('getCurrentCommentData', _service)({ pid }).then(({ data, nums }) => {
            setCommentList(data);
            setNums(nums);
        });
    }

    // 赞 / 踩
    const handleLike = (type, id, item={}) => {
        const _action = {...action};
        if( _action[id] == type ) return;

        if( _action[id] && _action[id] != type ) {
            item[_action[id]]--;
        }

        _action[id] = type;
        setAction(_action);
        item[type]++;

        service('postUpdateCommentData', _service)({ 
            id, type, 
            agreeNum: item['agree'], 
            disagreeNum: item['disagree'] 
        }).then(res => {
            const { code } = res.data || {};
            code == 200 && getCurrentCommentData();
        });
    }

    return (
        <div className='CommodityEvaluation'>
            {
                commentList.length ? (
                    <>
                        {
                            commentList.map(item => {
                                return (
                                    <Comment
                                        key={ item.id }
                                        actions={ [
                                            <span key="comment-basic-agree">
                                                <a onClick={ () => handleLike('agree', item.id, item) }>
                                                    { action[item.id] === 'agree' ? <LikeFilled /> : <LikeOutlined /> }
                                                </a>
                                                <span style={{ paddingLeft: 4, cursor: 'auto' }}>{ item.agree }</span>
                                            </span>,
                                            <span key="comment-basic-disagree">
                                                <a onClick={ () => handleLike('disagree', item.id, item) }>
                                                    { action[item.id] === 'disagree' ? <DislikeFilled /> : <DislikeOutlined /> }
                                                </a>
                                                <span style={{ paddingLeft: 4, cursor: 'auto' }}>{ item.disagree }</span>
                                            </span>
                                        ] }
                                        author={ item.uname }
                                        avatar={ <Avatar src={ item.avatar ? _url + item.avatar : '' } alt="avatar" /> }
                                        content={
                                            <p style={{ fontSize: '14px' }}>{ item.content }</p>
                                        }
                                        datetime={ item.commentTime }
                                    />
                                );
                            })
                        }
                    </>
                ) : (
                    <Empty image={ Empty.PRESENTED_IMAGE_SIMPLE } description='暂无评价' />
                )
            }
        </div>
    );
};