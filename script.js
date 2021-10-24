const form = document.querySelector('.tests'),
      resetBtn = document.querySelector('.reset'),
      answer = [...document.querySelectorAll('.answer')],
      info = document.querySelector('.info'),
      toggler = document.querySelector('.toggler'),  
      bg = document.querySelector('.bg'),
      root = document.querySelector(':root');
toggler.addEventListener('click', function(e){
    theme();
})
console.log(localStorage.darkMode);
if(localStorage.darkMode == 'on') {
    theme()
};
function theme(){
    if(!toggler.classList.contains('active')){
        toggler.classList.add('active');
            localStorage.setItem('darkMode', 'on');
            document.documentElement.style.setProperty('--black', '#fff');
            document.documentElement.style.setProperty('--white', '#000');
    }
    else{
        toggler.classList.remove('active');
        localStorage.setItem('darkMode', 'off');
        document.documentElement.style.setProperty('--black', '#000');
        document.documentElement.style.setProperty('--white', '#fff');
    }
}  
resetBtn.addEventListener('click', function(e){
    e.preventDefault();
    let assept = confirm('Вы уверены в этом, текущий прогресс сброситься?');
    if(assept){
        form.reset();
        document.body.scrollIntoView({block: 'start', behavior: 'smooth'});
        info.innerHTML = '';
        answer.forEach(item => {
            item.classList.remove('error');
            item.classList.remove('good');
        })
    }
}); 

form.addEventListener('submit', function(e){
    e.preventDefault();
    // this.reset();
    document.body.scrollIntoView({block: 'start', behavior: 'smooth'});
    fetch('./tests.json')
    .then(data => data.json())
    .then(data => {
        let right = 0,
            wrong = 0;
       let ans = [...document.querySelectorAll('.answer:checked')];
       data.forEach((item, i) => {
           let chosen = ans[i].nextElementSibling.textContent.toLowerCase();
           let given = item.answer.toLowerCase();
           if(chosen == given) {
               right++;
               ans[i].classList.add('good');
           }
           else {
               wrong++;
               ans[i].classList.add('error');
           }
        });
        info.innerHTML = `
            <p>Кол-во верных ответов: ${right};</p> 
            <p>Кол-во неверных ответов: ${wrong};</p> 
            <p>Общий балл ${right}/50;</p> 
            <p>Вы можете ознакомиться с результатами ниже</p>
        `;
    })
});
// console.log('ba'+(+'n')+'a');
