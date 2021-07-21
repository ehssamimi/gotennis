const CACHE_VERSION = 0.45;

let CURRENT_CACHE = {
    static : 'static-cache-v' + CACHE_VERSION,
    dynamic : 'dynamic-cache-v' + CACHE_VERSION
};



this.addEventListener('install' , (event) => {

    event.waitUntil(
        caches.open(CURRENT_CACHE['static'])
            .then((cache) => {
                cache.addAll([
                    '/',
                    '/profile',
                    '/setting',
                   ' /news',
                    '/reserve',
                    '/salon/:id',

                ]);
            })
    )



})



this.addEventListener('activate' , (event) => {
    console.log('activating service worker' , event);
    let expectedCacheNames = Object.values(CURRENT_CACHE);

    event.waitUntil(
        caches.keys().then(cacheNames => {
             console.log(cacheNames)
            return Promise.all(
                cacheNames.forEach(cacheName => {
                    if(! expectedCacheNames.includes(cacheName)) {
                        console.log('Deleting out of date cache:' , cacheName);

                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )

});





this.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {

        console.log("skip waiting")
        // console.log("update catches skipWaitingskipWaitingskipWaitingskipWaitingskipWaitingskipWaitingskipWaiting ")
        // localStorage.setItem("sw",CACHE_VERSION)
        // console.log(CACHE_VERSION)
        this.skipWaiting();
    }
});





this.addEventListener('fetch' , (event) => {

    return event.respondWith(
        fetch(event.request)
            .then(response => {
                return caches.open(CURRENT_CACHE['dynamic'])
                    .then(cache => {
                        cache.put(event.request, response.clone());
                        return response;
                    })
            })
            .catch(err => {
                return caches.match(event.request);
            })
    )







    //    return  event.respondWith(
    //     caches.match(event.request).then(response => {
    //         if(response) return response;
    //         return fetch(event.request).then(networkResponse => {
    //             caches.open(CURRENT_CACHE['dynamic'])
    //                 .then(cache => {
    //                     cache.put(event.request , networkResponse.clone());
    //                     return networkResponse;
    //                 })
    //         })
    //     })
    // )


});



this.addEventListener('notificationclick', function (event) {
    let notification=event.notification;
        let action=event.action;
        console.log(action)
        console.log(notification)
    // if (!action){
    //     promiseCahin=clients.openwindow('/pwa/home')
    // }
    // notification.close();
    //
    // this.waitUntil(promiseCahin);




    // if (event.data.action === 'skipWaiting') {
    //
    //     console.log("skip waiting")
    //     // console.log("update catches skipWaitingskipWaitingskipWaitingskipWaitingskipWaitingskipWaitingskipWaiting ")
    //     // localStorage.setItem("sw",CACHE_VERSION)
    //     // console.log(CACHE_VERSION)
    //
    // }
});


self.addEventListener('notificationclick', e => {
    // Close the notification popout
    e.notification.close();
    // Get all the Window clients
    e.waitUntil(clients.matchAll({ type: 'window' }).then(clientsArr => {
        // If a Window tab matching the targeted URL already exists, focus that;
        const hadWindowToFocus = clientsArr.some(windowClient => windowClient.url === e.notification.data.url ? (windowClient.focus(), true) : false);
        // Otherwise, open a new tab to the applicable URL and focus it.
        if (!hadWindowToFocus) clients.openWindow(e.notification.data.url).then(windowClient => windowClient ? windowClient.focus() : null);
    }));
});




// self.addEventListener('fetch' , (event) => {
//     // event.respondWith(
//     //     caches.match(event.request).then(response => {
//     //         if(response) return response;
//     //         return fetch(event.request).then(networkResponse => {
//     //             caches.open(CURRENT_CACHE['dynamic'])
//     //                 .then(cache => {
//     //                     cache.put(event.request , networkResponse.clone());
//     //                     return networkResponse;
//     //                 })
//     //         })
//     //     })
//     // )
//
//
//     // event.respondWith(
//     //   caches.match(event.request)
//     // )
//     let urls = [
//         'http://roocket.org/api/products'
//     ]
//
//     if(urls.indexOf(event.request.url) > -1) {
//         console.log('network first')
//         return event.respondWith(
//
//             fetch(event.request)
//                 .then(response => {
//                     return caches.open(CURRENT_CACHE['dynamic'])
//                         .then(cache => {
//                             cache.put(event.request , response.clone());
//                             return response;
//                         })
//                 })
//                 .catch(err => {
//                     return caches.match(event.request);
//                 })
//         )
//     } else {
//         console.log('cache first')
//
//         return event.respondWith(
//             caches.match(event.request).then(response => {
//                 if(response) return response;
//
//                 return fetch(event.request).then(networkResponse => {
//                     caches.open(CURRENT_CACHE['dynamic'])
//                         .then(cache => {
//                             cache.put(event.request , networkResponse.clone());
//                             return networkResponse;
//                         })
//                 })
//             })
//         )
//     }
// });