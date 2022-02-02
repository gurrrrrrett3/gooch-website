const itemSearch = document.getElementById('itemName');
const itemSearchButton = document.getElementById('search-submit');
const itemNameResult = document.getElementById('item-name-result');

(
    async() => {

        const items = await fetch('/assets/local/sfb/json/items').then(res => res.json().then(data => data));

        const fuzzy = new FuzzySet();
        items.forEach(item => {
            fuzzy.add(item);
        });

        itemSearch.addEventListener('input', (ev) => {

            const results = fuzzy.get(itemSearch.value);
            const resultsList = document.getElementById('resultsList');
            resultsList.innerHTML = '';

            if (results) {
                itemNameResult.value = `Item: ${results[0][1]}`;
                results.forEach((result, index) => {
                    if (result[0] < 0.1 | index > 15) return
                    const li = document.createElement('li');
                    li.innerHTML = `${Math.round(result[0] * 100)}% ${result[1]}`;
                    resultsList.appendChild(li);
                });

            } else {
                itemNameResult.value = 'No item Selected';
            }

        });

        itemSearchButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            const results = fuzzy.get(itemSearch.value);
            if (results) {
                const item = results[0][1];
                window.location.href = `/sfb/item/${item}`;
            }
        })

    }
)();