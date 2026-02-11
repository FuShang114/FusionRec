const baseUrl = 'http://localhost:8089'
// const baseUrl = 'http://192.168.31.70:8089'  
const http = (options = {}) => {
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + options.url || '',
            method:options.type || 'GET' ,
            data: options.data || {},
            header: options.header || {},
        }).then((response) => {
            console.log(response)
            resolve(response.data);
        }).catch(error => {
            reject(error)
        })
    });
}
const get=(url,data,options={})=>{
    options.type='get';
    options.data = data;
    options.url = url;
    return http(options)
}
const post = (url, data, options = {}) => {
    options.type = 'post';
    options.data = data;
    options.url = url;
    return http(options)
}
const put = (url, data, options = {}) => {
    options.type = 'put';
    options.data = data;
    options.url = url;
    return http(options)
}
const upload = (parm) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseUrl + parm.url,
			filePath: parm.filePath,
			name: 'file',
			formData: {
				openid: uni.getStorageSync('openid')
			},
			header: {
				// Authorization: uni.getStorageSync("token")
			},
			success: (res) => {
				resolve(res.data);
			},
			fail: (error) => {
				reject(error)
			}
		})
	})
}
export default {
    get,
    post,
    put,
	upload,
	baseUrl
}