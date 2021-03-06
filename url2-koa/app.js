// // 先导入fs模块，然后用readdirSync列出文件
// // 这里可以用sync是因为启动时只运行一次，不存在性能问题:
// var files = fs.readdirSync(__dirname + '/controllers');

// // 过滤出.js文件:
// var js_files = files.filter((f)=>{
//     return f.endsWith('.js');
// }, files);

// // 处理每个js文件:
// for (var f of js_files) {
//     console.log(`process controller: ${f}...`);
//     // 导入js文件:
//     let mapping = require(__dirname + '/controllers/' + f);
//     for (var url in mapping) {
//         if (url.startsWith('GET ')) {
//             // 如果url类似"GET xxx":
//             var path = url.substring(4);
//             router.get(path, mapping[url]);
//             console.log(`register URL mapping: GET ${path}`);
//         } else if (url.startsWith('POST ')) {
//             // 如果url类似"GET xxx":
//             var path = url.substring(5);
//             router.post(path, mapping[url]);
//             console.log(`register URL mapping: POST ${path}`);
//         } else {
//             // 无效的URL:
//             console.log(`invalid URL: ${url}`);
//         }
//     }
// }

function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    }, files);

    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addControllers(router);