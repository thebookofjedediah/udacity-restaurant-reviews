if(navigator.serviceWorker)
  navigator.serviceWorker.register('js/sw.js').then(function() {
    console.log("Service Worker registration succesfull");
  }).catch(function() {
    console.log("Service Worker registration failed");
  });
