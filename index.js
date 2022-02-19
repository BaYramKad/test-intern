document.addEventListener('DOMContentLoaded', () => {
    let table = document.querySelector('table');
    let tbody = document.querySelector('tbody');
    let trTags = document.querySelectorAll('th');
    let tr = document.querySelectorAll('tr > td')
   
    let span = document.createElement('span')

  const sortTable = (index) => {
    let tbody = table.querySelector('tbody');
    let compare = (rowA, rowB) => {
      const rowDataA = rowA.cells[index].textContent;
      const rowDataB = rowB.cells[index].textContent;
        isSort = false
        if (rowDataA > rowDataB) return 1
        else if (rowDataA < rowDataB) return -1
        return 0
    };

    const rows = [].slice.call(tbody.rows);
    rows.sort(compare);

    table.removeChild(tbody);
      for (let i = 0; i < rows.length - 1; i++) {
        tbody.appendChild(rows[i])
      }
    table.appendChild(tbody);
  };

      table.addEventListener('click', (e) => {
        let el = e.target
        // console.log(el.textContent, el.textContent.length - 50);
        if(el.nodeName !== 'TH') return
        let index = el.cellIndex
        let type = el.getAttribute('data-type')
        sortTable(index, type)
      });

    table.addEventListener('mouseover', (event) => {
        let element = event.target.closest('tr')
        if(event.target.closest('tr')) {
            element.classList.add('change')
            span.textContent = '231'
            element.appendChild(span)
        } 
    })
    const provideTable = (td, element, data) => {
        if(!td.classList.contains(element.className)) {
            td.classList.add(element.className)
            switch(td.className) {
                case 'first-name' : 
                    td.textContent = data.name.firstName
                    break
                case 'last-name' : 
                    td.textContent = data.name.lastName
                    break
                case 'description' :
                    let str = String(data.about)
                    td.innerHTML = str.slice(0, 75) +'...';
                    break
                case 'eyes' : 
                    td.textContent = data.eyeColor
                    td.style.backgroundColor = data.eyeColor
                    td.style.color = 'white'
                    break
            };
        };
    };

    const foo = (data) => {  
        data.map(data => {
            let tr = document.createElement('tr')
            trTags.forEach((element, i) => {
                let td = document.createElement('td')
                provideTable(td, element, data)
                tr.appendChild(td)
            })
            tbody.appendChild(tr)

        });
    }
    fetch("./data,json").then( response => {
        response.json().then(result => {
            foo(result)
        });
    });

});





// fetch("https://catfact.ninja/fact"; ).then( response => {
// response.json().then(result => {
// console.log(result);
// });
// });
//

/* 
Тестовое задание для стажера на позицию «Программист на языке JS»

Дано: 
JS, CSS (SCSS, SASS), JSON с данными

Основные цели: 
●	На основе имеющегося массива данных, создать таблицу шириной 50% от экрана;
●	Колонки в таблице: 
○	Имя (firstName), 
○	Фамилия (lastName), 
○	Описание (about),
○	Цвет глаз (eyeColor).
●	Данные колонки “about” должны отображаться в две строки, остальное обрезаем многоточием (...);
●	Каждая колонка должна иметь свойство сортировки;
●	При клике на строку в соседнем с таблицей DIV’е отобразить форму редактирования данных выбранной строки.

Дополнительные цели:
●	Добавить постраничный вывод данных из предоставленного JSON (10 строк на страницу);
●	Добавить возможность показа/скрытия колонок;
●	В колонке “eyeColor” предоставлять данные в виде цвета, сохраняя возможность сортировки по значению.

Использование jQuery, Bootstrap и других фреймворков и библиотек не разрешено. Комментирование кода с пояснениями — обязательно.
Решение задачи разместить на https://github.com/

JSON:

*/