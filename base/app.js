// 本地注册
import "./regist.js";

import xui from "./xui/index";
Vue.use(xui);

//启动
Promise.all([
    $import("dag/Style"),
    $import.sync("dag/common"), //同步加载
    $import("dag/components/Edittable"),
]).then(([style,,editTable]) => {
    const $config = $import("dag/common/config");
    NetPosaXUI.Component.registFormField(
      "edittable",
      editTable.Component.default
    );

    Promise.all([
        $config.init().then(() => {
            return fetch(`./config/menu.json`).then((res) => {
                return res.json();
            });
        }),
    ]).then(([menus]) => {
        document.title = $config.get("application.title");
        const app = new Vue({
            router: initRouter(menus),
        }).$mount("#app");
    });
});

function initRouter(menus) {
    const $business = $import("dag/common/business");
    //路由可来自接口或配置文件
    var routes = [];
    if (menus) {
        if (menus.login) {
            routes.push(generateRoute(menus.login, [])[0]);
        }
        if (menus.frame) {
            var rFrame = generateRoute(menus.frame, [])[0];
            if (menus.menu) {
                var menuRoutes = [];
                menus.menu.forEach((item) =>
                    generateRoute(item, menuRoutes, routes)
                );
                rFrame.children = menuRoutes;
            }
            routes = routes.concat(rFrame);
        }
    }
    console.log("routes", routes);
    const router = new VueRouter();
    router.addRoutes(routes);
    window.$router = router;

    return router;
}
// 路由生成
function generateRoute(item, routes, baseRoutes) {
    var r = {
        path: item.path ? item.path : "/" + item.name,
        name: item.name,
    };
    if (item.module) {
        r.component = $import(item.module).Component;
    }
    if (item.redirect) {
        r.redirect = item.redirect;
    }
    if (item.children) {
        r.children = item.children;
    }
    r.meta = item.meta || {};
    //子菜单
    if (item.menu) {
        item.menu.forEach((item) => {
            generateRoute(item, routes, baseRoutes);
        });
    }
    //单页
    if (item.page === true) {
        r.path = "/" + item.name;
        r.meta._isPage = true;
        r.children = [
            {
                path: "page",
                name: item.name + "_" + "page",
            },
        ];
        baseRoutes.push(r);
    } else if (item.link) {
        //外链
        r.path = "/" + item.name;
        r.meta._link = item.link;
        r.component = new Vue({});
        baseRoutes.push(r);
    } else {
        // r.path = "/pc" + r.path;
        routes.push(r);
    }
    return routes;
}
