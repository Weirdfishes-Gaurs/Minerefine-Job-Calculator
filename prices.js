// Price Lookup


const PRICE_DATA = [

    {
        name: "Master Serum",
        category: "turrets",
        categoryName: "Turrets",
        rate: "8–15c"
    },

    {
        name: "Concentrated Serum",
        category: "turrets",
        categoryName: "Turrets",
        rate: "TBD"
    },

    {
        name: "Admin Wrench",
        category: "turrets",
        categoryName: "Turrets",
        rate: "10–15c"
    },

    {
        name: "First Enchant Booster",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "3–4c"
    },

    {
        name: "Second Enchant Booster",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "3–4c"
    },

    {
        name: "Tome of Knowledge 1",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "10–15c"
    },

    {
        name: "Tome of Knowledge 2",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "1.5c"
    },

    {
        name: "Crystal",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "TBD"
    },

    {
        name: "Star",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "TBD"
    },

    {
        name: "Nebula",
        category: "enchant",
        categoryName: "Enchant Items",
        rate: "80c"
    }

];


const searchInput =
    document.getElementById("priceSearch");

const categorySelect =
    document.getElementById("priceCategory");

const resultsEl =
    document.getElementById("priceResults");

const suggestionsEl =
    document.getElementById("priceSuggestions");

const noResultsEl =
    document.getElementById("noPriceResults");


// --------------------------------------
// TEXT HELPERS
// --------------------------------------

function normalize(text) {

    return String(text)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, " ");

}


function escapeHtml(text) {

    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


// --------------------------------------
// TYPO MATCHING
// --------------------------------------

function editDistance(a, b) {

    const rows = b.length + 1;
    const cols = a.length + 1;

    const matrix =
        Array.from(
            { length: rows },
            () => Array(cols).fill(0)
        );


    for (let i = 0; i < rows; i++) {
        matrix[i][0] = i;
    }


    for (let j = 0; j < cols; j++) {
        matrix[0][j] = j;
    }


    for (let i = 1; i < rows; i++) {

        for (let j = 1; j < cols; j++) {

            const same =
                b[i - 1] === a[j - 1];


            matrix[i][j] =
                same
                    ? matrix[i - 1][j - 1]
                    : Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );

        }

    }


    return matrix[b.length][a.length];

}


function fuzzyWordMatch(query, word) {

    if (word.startsWith(query)) {
        return true;
    }


    if (word.includes(query)) {
        return true;
    }


    if (query.length < 3) {
        return false;
    }


    let allowedMistakes = 1;


    if (query.length >= 5) {
        allowedMistakes = 2;
    }


    if (query.length >= 9) {
        allowedMistakes = 3;
    }


    return (
        editDistance(query, word) <=
        allowedMistakes
    );

}


// --------------------------------------
// SEARCH SCORE
// --------------------------------------

function getSearchScore(item, searchText) {

    const query =
        normalize(searchText);

    const name =
        normalize(item.name);


    if (!query) {
        return 1;
    }


    // Exact item
    if (name === query) {
        return 1000;
    }


    // Item starts with typed letters
    if (name.startsWith(query)) {
        return 900;
    }


    const words =
        name.split(" ");


    // Any word starts with typed letters
    if (
        words.some(
            word =>
                word.startsWith(query)
        )
    ) {
        return 850;
    }


    // Typed letters appear anywhere
    if (name.includes(query)) {
        return 800;
    }


    const queryWords =
        query.split(" ");


    // Multi-word searching + typo correction
    const allQueryWordsMatch =
        queryWords.every(
            queryWord =>

                words.some(
                    word =>
                        fuzzyWordMatch(
                            queryWord,
                            word
                        )
                )

        );


    if (allQueryWordsMatch) {
        return 700;
    }


    // Single-word typo correction
    if (
        queryWords.length === 1 &&
        query.length >= 3
    ) {

        const typoMatch =
            words.some(
                word =>
                    fuzzyWordMatch(
                        query,
                        word
                    )
            );


        if (typoMatch) {
            return 600;
        }

    }


    return 0;

}


// --------------------------------------
// GET RESULTS
// --------------------------------------

function getMatches() {

    const search =
        searchInput.value;

    const selectedCategory =
        categorySelect.value;


    return PRICE_DATA
        .map(item => {

            return {
                item,
                score:
                    getSearchScore(
                        item,
                        search
                    )
            };

        })

        .filter(result => {

            const categoryMatches =
                selectedCategory === "all" ||
                result.item.category ===
                    selectedCategory;


            return (
                categoryMatches &&
                result.score > 0
            );

        })

        .sort(
            (a, b) =>
                b.score - a.score
        );

}


// --------------------------------------
// AUTOCOMPLETE
// --------------------------------------

function renderSuggestions(matches) {

    const search =
        searchInput.value.trim();


    if (
        !search ||
        matches.length === 0
    ) {

        suggestionsEl.innerHTML = "";

        suggestionsEl.classList.remove(
            "show"
        );

        return;

    }


    const topMatches =
        matches.slice(0, 6);


    suggestionsEl.innerHTML =
        topMatches
            .map(result => {

                const item =
                    result.item;


                return `
                    <button
                        type="button"
                        class="price-suggestion"
                        data-name="${escapeHtml(item.name)}"
                    >

                        <span>
                            ${escapeHtml(item.name)}
                        </span>

                        <strong>
                            ${escapeHtml(item.rate)}
                        </strong>

                    </button>
                `;

            })
            .join("");


    suggestionsEl.classList.add(
        "show"
    );


    suggestionsEl
        .querySelectorAll(".price-suggestion")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    searchInput.value =
                        button.dataset.name;

                    suggestionsEl.classList.remove(
                        "show"
                    );

                    renderPrices();

                }
            );

        });

}


// --------------------------------------
// DISPLAY ITEMS
// --------------------------------------

function renderPrices() {

    const matches =
        getMatches();


    if (matches.length === 0) {

        resultsEl.innerHTML = "";

        noResultsEl.style.display =
            "block";

        renderSuggestions([]);

        return;

    }


    noResultsEl.style.display =
        "none";


    resultsEl.innerHTML =
        matches
            .map(result => {

                const item =
                    result.item;

                const isTbd =
                    item.rate === "TBD";


                return `
                    <div class="price-card">

                        <div class="price-info">

                            <strong class="price-name">
                                ${escapeHtml(item.name)}
                            </strong>

                            <span class="price-category">
                                ${escapeHtml(item.categoryName)}
                            </span>

                        </div>


                        <div
                            class="price-value ${
                                isTbd
                                    ? "price-tbd"
                                    : ""
                            }"
                        >
                            ${escapeHtml(item.rate)}
                        </div>

                    </div>
                `;

            })
            .join("");


    renderSuggestions(matches);

}


// --------------------------------------
// EVENTS
// --------------------------------------

searchInput.addEventListener(
    "input",
    renderPrices
);


searchInput.addEventListener(
    "focus",
    renderPrices
);


categorySelect.addEventListener(
    "change",
    renderPrices
);


document.addEventListener(
    "click",
    event => {

        if (
            !event.target.closest(
                ".price-search-wrap"
            )
        ) {

            suggestionsEl.classList.remove(
                "show"
            );

        }

    });


// --------------------------------------
// START
// --------------------------------------

renderPrices();
