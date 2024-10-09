const base = {
    get() {
        return {
            url : "http://localhost:8080/nodejs83160z05/",
            name: "nodejs83160z05",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/nodejs83160z05/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "宠物医院管理系统"
        } 
    }
}
export default base
