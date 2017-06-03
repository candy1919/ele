// 保存到local storage
export const setStore = (name,content) =>{
	if(!name) return;
	if(typeof content !== 'string'){
		content=JSON.stringify(content);
	}
	localStorage.setItem(name,content);
}
// 读取到local storage
export const getStore = name => {
	if(!name) return;
	var content=localStorage.getItem(name);
	return content;
}
export const delStore = name =>{
	if(!name) return;
	localStorage.removeItem(name);
}