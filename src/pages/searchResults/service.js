// 关键字搜索
export const getKwData = (_service) => (async (params = {}) => {
    const res = await _service.getKwData(params);
    return res || {};
})