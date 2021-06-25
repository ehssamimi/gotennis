 let newWorker;

function showUpdateBar() {
    // let snackbar = document.getElementById('snackbar');
    // newWorker.postMessage({ action: 'skipWaiting' });
    // snackbar.className = 'show';
    // The click event on the pop up notification
    // document.getElementById('reload').addEventListener('click', function(){
    //     console.log("clicked on reload ")
    //
    //     newWorker.postMessage({ action: 'skipWaiting' });
    // });
    newWorker.postMessage({ action: 'skipWaiting' });
    console.log("show Update bar ")

}

// The click event on the pop up notification
// document.getElementById('reload').addEventListener('click', function(){
//     newWorker.postMessage({ action: 'skipWaiting' });
// });



export default function swDev() {
    if('serviceWorker' in navigator) {
            let swUrl=`${process.env.PUBLIC_URL}/sw.js`
        navigator
            .serviceWorker
            .register(swUrl).then(registration => {

            registration.addEventListener('updatefound', () => {
                // A wild service worker has appeared in reg.installing!
                newWorker = registration.installing;

                newWorker.addEventListener('statechange', () => {
                    // Has network.state changed?
                    switch (newWorker.state) {


                        case 'installed':

                            if (navigator.serviceWorker.controller) {
                                // new update available
                                newWorker.postMessage({ action: 'skipWaiting' });
                                // showUpdateBar();
                            }
                            // No update available
                            break;
                    }
                });
            });



            console.log('Service worker registration succeeded:' , registration);
        }).catch(err => {
            console.log('Service worker registration failed:' , err);
        })


        let refreshing;
        navigator.serviceWorker.addEventListener('controllerchange', function () {
            if (refreshing) return;
            window.location.reload();
            refreshing = true;
        });

    }
}

let installPromptEvent;

window.addEventListener('beforeinstallprompt' , (e) => {
    e.preventDefault();
    console.log('before install prompt event')

    installPromptEvent = e;
});


window.addEventListener('load', () => {
    let id=document.querySelector('.fixed-action-btn  ');
    if (id!==null){
        document.querySelector('.fixed-action-btn  ').addEventListener('click' , (e) => {
            console.log("click on load app");
            e.preventDefault();
            console.log(installPromptEvent);
            if(installPromptEvent) {
                installPromptEvent.prompt();

                installPromptEvent.userChoice
                    .then((choiceResult) => {
                        if(choiceResult.outcome === 'accepted') {
                            console.log('User Accepted');
                        } else {
                            console.log('User dismissed');
                        }

                        installPromptEvent = null;
                    })
            }
        })
    }

});


