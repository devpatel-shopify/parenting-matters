// // add active class
// ( function (){
//     var navLinks = document.querySelectorAll('.js-dashbord-link');

//     navLinks.forEach(function(navLink){
//         navLink.classList.remove('active');
//         navLink.addEventListener('click', function(event){
//             let name = event.target.getAttribute('data-name');
//             localStorage.setItem('dashbord', name);
          
//         });
//         let getLink = localStorage.getItem('dashbord');
//         if(navLink.getAttribute('data-name') == getLink){
//             // navLinks.forEach(function(navLink){
               
//             // })
//             navLink.classList.add('active');
//         }
//     })
// });