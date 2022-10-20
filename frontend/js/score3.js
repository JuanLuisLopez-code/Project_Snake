function SortArray(x, y) {
    if (x.score_3 < y.score_3) { return 1; }
    if (x.score_3 > y.score_3) { return -1; }
    return 0;
}
let users_sort = "";
let count_sort = 0;
const call = seeAll().then(data => {
    users_sort = data.sort(SortArray)

    for (let i = 0; i < users_sort.length; i++) {
        if (count_sort == 0) {

            const first_div = document.querySelector(".ranking-table-row-leader-1");

            const second_div = document.createElement('div');
            first_div.appendChild(second_div);
            second_div.setAttribute('class', 'ranking-table-data-leader-1');
            const medal_dive = document.createElement('div');
            second_div.appendChild(medal_dive);
            medal_dive.setAttribute('class', 'medal-gold');

            const third_div = document.createElement('div');
            first_div.appendChild(third_div);
            third_div.setAttribute('class', 'ranking-table-data');
            third_div.innerText = users_sort[i].username;

            const last_div = document.createElement('div');
            first_div.appendChild(last_div);
            last_div.setAttribute('class', 'ranking-table-data');
            last_div.innerText = users_sort[i].score_3;

            count_sort++;
        } else if (count_sort == 1) {

            const first_div = document.querySelector(".ranking-table-row-leader-2");

            const second_div = document.createElement('div');
            first_div.appendChild(second_div);
            second_div.setAttribute('class', 'ranking-table-data-leader-2');
            const medal_dive = document.createElement('div');
            second_div.appendChild(medal_dive);
            medal_dive.setAttribute('class', 'medal-silver');

            const third_div = document.createElement('div');
            first_div.appendChild(third_div);
            third_div.setAttribute('class', 'ranking-table-data');
            third_div.innerText = users_sort[i].username;

            const last_div = document.createElement('div');
            first_div.appendChild(last_div);
            last_div.setAttribute('class', 'ranking-table-data');
            last_div.innerText = users_sort[i].score_3;

            count_sort++;
        } else if (count_sort == 2) {

            const first_div = document.querySelector(".ranking-table-row-leader-3");

            const second_div = document.createElement('div');
            first_div.appendChild(second_div);
            second_div.setAttribute('class', 'ranking-table-data-leader-3');
            const medal_dive = document.createElement('div');
            second_div.appendChild(medal_dive);
            medal_dive.setAttribute('class', 'medal-bronze');

            const third_div = document.createElement('div');
            first_div.appendChild(third_div);
            third_div.setAttribute('class', 'ranking-table-data');
            third_div.innerText = users_sort[i].username;

            const last_div = document.createElement('div');
            first_div.appendChild(last_div);
            last_div.setAttribute('class', 'ranking-table-data');
            last_div.innerText = users_sort[i].score_3;

            count_sort++;
        } else {
            count_sort ++;

            const inside = document.querySelector(".ranking-table-body");
            
            const first_div = document.createElement('div');
            inside.appendChild(first_div);
            first_div.setAttribute('class', 'ranking-table-row');

            const second_div = document.createElement('div');
            first_div.appendChild(second_div);
            second_div.setAttribute('class', 'ranking-table-data');
            second_div.innerText = count_sort;

            const third_div = document.createElement('div');
            first_div.appendChild(third_div);
            third_div.setAttribute('class', 'ranking-table-data');
            third_div.innerText = users_sort[i].username;

            const last_div = document.createElement('div');
            first_div.appendChild(last_div);
            last_div.setAttribute('class', 'ranking-table-data');
            last_div.innerText = users_sort[i].score_3;
        }
    }
});


