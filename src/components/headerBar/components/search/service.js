// 获取 - 购物车商品数量
export const getCartNumData = (_service, history) => (async () => {
    const res = await _service.getCartNumData({
        uname: sessionStorage.getItem('uname')
    });
    return res || {};
})