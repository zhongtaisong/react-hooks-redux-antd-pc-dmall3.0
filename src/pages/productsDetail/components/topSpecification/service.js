// 加入购物车 - 数据
export const postAddCartData = (_service) => (
    async (list = []) => {
        const res = await _service.postAddCartData({
            uname: sessionStorage.getItem('uname'), 
            list
        });
        return res || {};
    }
);