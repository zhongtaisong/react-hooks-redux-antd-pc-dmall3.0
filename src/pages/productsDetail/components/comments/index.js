import React, { useState, useEffect } from 'react';
import { Comment, Avatar, Empty } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
// 接口服务
import { getCurrentCommentData, postUpdateCommentData } from './service';
// less样式
import './index.less';
// ------------------------------------------------------ 商品评价 ---------------------------------- //
export default ({ pid }) => {

    // 评价列表
    const [commentList, setCommentList] = useState([]);
    // 赞、踩 - 数量
    const [nums, setNums] = useState([]);
    // 赞、踩 - 操作记录
    const [action, setAction] = useState({});

    useEffect(() => {
        getCurrentCommentData({ pid }).then(({ data, nums }) => {
            setCommentList(data);
            setNums(nums);
        });
    }, [pid]);

    // 喜欢 / 不喜欢
    const handleLike = (type, index, item={}) => {

        const { id } = item;

        action[index] = type;
        setAction(action);

        commentList.map(_item => {
            if(_item[type] == item[type]) {
                _item[type]++;
                postUpdateCommentData({
                    id, type, agreeNum: _item.agree, disagreeNum: _item.disagree
                });
            }
        })
        setCommentList(commentList);
    }

    return (
        <div className='CommodityEvaluation'>
            {
                commentList.length ? (
                    <>
                        {
                            commentList.map((item, index) => {
                                return (
                                    <Comment
                                        key={ item.id }
                                        actions={ [
                                            <span key="comment-basic-agree">
                                                <LikeOutlined theme={ action[index] === 'agree' ? 'filled' : 'outlined' } onClick={ handleLike.bind(this, 'agree', index, item) } />
                                                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{ item.agree }</span>
                                            </span>,
                                            <span key="comment-basic-disagree">
                                                <DislikeOutlined theme={ action[index] === 'disagree' ? 'filled' : 'outlined' } onClick={ handleLike.bind(this, 'disagree', index, item) } />
                                                <span style={{ paddingLeft: 8, cursor: 'auto' }}>{ item.disagree }</span>
                                            </span>
                                        ] }
                                        author={ item.uname }
                                        avatar={ <Avatar src={ item.avatar ? React.$url + item.avatar : '' } alt="avatar" /> }
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