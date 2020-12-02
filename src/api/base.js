const base = {
    baseUrl:"/api",
    login:"/api/login",  // 登陆
    register:"/api/register", // 注册
    selectTbItemAllByPage:"/api/backend/item/selectTbItemAllByPage", // 商品查询接口
    total:"/api/total", // 商品总条数
    search:"/api/search", //模糊查询
    //upload:"/api/upload",//图片上传接口不需要接口 因为图片是个地址
    selectItemCategoryByParentId:"/api/backend/itemCategory/selectItemCategoryByParentId",//类目选择分类
    insertTbItem:"/api/backend/item/insertTbItem",
    deleteItemById:"/api/backend/item/deleteItemById",
    preUpdateItem:"/api/backend/item/preUpdateItem",//添加产品

    //内容分类管理页面
    selectContentCategoryByParentId:"/api/content/selectContentCategoryByParentId",//查询导航
    insertContentCategory:"/api/content/insertContentCategory",//增加子导航
    updateContentCategory:"/api/content/updateContentCategory",//修改子导航
    deleteContentCategoryById:"/api/content/deleteContentCategoryById",//删除子导航
    insertTbContent:"/api/content/insertTbContent",//右边内容 添加内容
    deleteContentByIds:"/api/content/deleteContentByIds",//删除内容
    selectTbContentAllByCategoryId:"/api/content/selectTbContentAllByCategoryId",//内容查询
}   

export default base;