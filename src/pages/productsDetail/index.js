import React, { useState, useEffect } from 'react';
// 接口服务
import { getDetailsData } from './service';
// 上半部分 - 组件
import TopSpecification from './components/topSpecification';
// 下半部分 - 组件
import BottomDetails from './components/bottomDetails';
// 数据
// import indexState from './state';
// 样式
import './index.less';

// ------------------------------------------- 商品详情 ---------------------------------- //
export default (props) => {

    // 基本信息
    const [basicInfo, setBasicInfo] = useState({});
    // 商品参数
    const [params, setParams] = useState({});
    // 商品图片
    const [imgList, setImgList] = useState([]);
    // 商品规格
    const [specs, setSpecs] = useState([]);
    // 商品详情图片
    const [detailsPic, setDetailsPic] = useState([]);
    // 待预览图片索引
    const [actionIndex, setActionIndex] = useState(0);
    // 商品数量
    const [num, setNum] = useState(1);
    // 商品id
    const [id, setId] = useState();
    // tab索引
    const [activeKey, setActiveKey] = useState();

    useEffect(() => {
        const { id } = props.match.params || {};
        getDetailsData({ id }).then(({ basicInfo, imgList, params, specs, detailsPic }) => {
            setBasicInfo(basicInfo);
            setImgList(imgList);
            setParams(params);
            setSpecs(specs);
            setDetailsPic(detailsPic);
        })
        setId(id);
    }, [props])

    // 上半部分 - 核心方法
    const handleTopSpecification = (_this) => {
        const obj = {
            // 选择预览图片
            handleTogglePic(index) {
                setActionIndex(index);
            },
            // 选择规格
            handleToggleSpecs(id) {
                if( id ){
                    props.history.push(`/products/detail/${id}`);
                    setNum(1);
                    setActionIndex(0)
                }
            },
            // 监听 - 商品数量
            watchNumber(value) {
                setNum(value);
            },
            // 立即购买
            immediatePurchase() {
                const { id } = basicInfo;
                // id && props.history.push({
                //     pathname: '/views/products/cart/settlement',
                //     state: {
                //         id: [id],
                //         num,
                //         type: 'detail'
                //     }
                // });
            },
            // 加入购物车
            handleAddCart() {
                if( basicInfo ){
                    // state.addcartData([{
                    //     pid: basicInfo.id,
                    //     num: this.state.num,
                    //     totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
                    // }]);
                }
            }
        }
        return function() {
            typeof obj[_this] === 'function' && obj[_this].apply(this, arguments);
        }
    }

    // 下半部分 - 核心方法
    const handleBottomDetails = (_this) => {
        let obj = {
            // 监听tab操作
            tabsChange (activeKey) {
                setActiveKey(activeKey);
            }
        };
        return function() {
            typeof obj[_this] === 'function' && obj[_this].apply(this, arguments);
        }
    }
    
    return (
        <div className='dm_productsDetail'>
            <div className='common_width'>
                <TopSpecification 
                    basicInfo={ basicInfo }
                    imgList={ imgList }
                    specs={ specs }
                    actionIndex={ actionIndex }
                    num={ num }
                    handleTogglePic={ handleTopSpecification('handleTogglePic') }
                    handleToggleSpecs={ handleTopSpecification('handleToggleSpecs') }
                    watchNumber={ handleTopSpecification('watchNumber') }
                    immediatePurchase={ handleTopSpecification('immediatePurchase') }
                    handleAddCart={ handleTopSpecification('handleAddCart') }
                />
                <BottomDetails 
                    params={ params }
                    detailsPic={ detailsPic }
                    activeKey={ activeKey }
                    tabsChange={ handleBottomDetails('tabsChange') }
                />
            </div>
        </div>
    );
};