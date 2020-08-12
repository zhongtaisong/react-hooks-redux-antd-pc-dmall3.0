import { message } from 'antd';
// 注册
export const postRegData = (_service, history) => (async (params = {}) => {
    const res = await _service.postRegData(params);
    try{
        if( res.data.code === 200 ){
            const { data } = res.data || {};
            data && localStorage.setItem('uname', data); 
            history.push('/login');
        }else if( res.data.code === 201 ){
            message.warning(res.data.msg);
        }
    }catch(err) {
        console.log(err);
    }
})