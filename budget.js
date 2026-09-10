// Credit Budget Calculator


const currentStageSelect =
    document.getElementById("budgetCurrentStage");

const creditBudgetInput =
    document.getElementById("creditBudget");

const rateInput =
    document.getElementById("budgetBlockRate");


const gearAll =
    document.getElementById("budgetGearAll");

const gearCheckboxes =
    Array.from(
        document.querySelectorAll(".budget-gear-checkbox")
    );


const reachEl =
    document.getElementById("budgetReach");

const usedEl =
    document.getElementById("budgetUsed");

const leftEl =
    document.getElementById("budgetLeft");

const nextEl =
    document.getElementById("budgetNext");

const breakdownEl =
    document.getElementById("budgetBreakdown");


const ITEM_NAMES = {
    sword: "Sword",
    pickaxe: "Pickaxe",
    axe: "Axe",
    shovel: "Shovel",
    armor: "Armor",
    charm: "Charm"
};


// --------------------------------------
// FORMATTING
// --------------------------------------

function formatNumber(value, decimals = 2) {

    return Number(value).toLocaleString(
        undefined,
        {
            maximumFractionDigits: decimals
        }
    );

}


function formatCredits(value) {

    return `${formatNumber(value, 2)}c`;

}


function stageName(stage) {

    if (stage.type === "boss") {
        return `BOSS • ${stage.name}`;
    }

    return `${stage.world} • ${stage.name}`;

}


// --------------------------------------
// STAGE DROPDOWN
// --------------------------------------

function makeStageOption(stage) {

    const option =
        document.createElement("option");

    option.value = stage.id;
    option.textContent = stageName(stage);

    return option;

}


function populateStages() {

    currentStageSelect.innerHTML = "";

    progression.forEach(stage => {

        currentStageSelect.appendChild(
            makeStageOption(stage)
        );

    });

}


// --------------------------------------
// GEAR MULTI-SELECT
// --------------------------------------

function getSelectedGears() {

    if (gearAll.checked) {
        return ["all"];
    }

    return gearCheckboxes
        .filter(box => box.checked)
        .map(box => box.value);

}


function updateGearControls() {

    const allSelected =
        gearAll.checked;

    gearCheckboxes.forEach(box => {

        box.disabled =
            allSelected;

        if (allSelected) {
            box.checked = false;
        }

    });

    calculateBudget();

}


// --------------------------------------
// STAGE COST
// --------------------------------------

function getStageCost(
    stage,
    selectedGears,
    blockRate
) {

    // ------------------------------
    // MINES
    // ------------------------------

    if (stage.type === "mine") {

        let blocks = 0;
        let foundAny = false;


        if (
            selectedGears.includes("all")
        ) {

            blocks =
                Object.values(
                    stage.items || {}
                ).reduce(
                    (total, value) =>
                        total + value,
                    0
                );

            foundAny = blocks > 0;

        }

        else {

            selectedGears.forEach(gear => {

                if (
                    stage.items[gear] !==
                    undefined
                ) {

                    blocks +=
                        stage.items[gear];

                    foundAny = true;

                }

            });

        }


        return {
            credits:
                blocks / blockRate,

            skipped:
                !foundAny
        };

    }


    // ------------------------------
    // BOSSES
    // ------------------------------

    let fragments = 0;
    let foundAny = false;


    if (
        selectedGears.includes("all")
    ) {

        fragments =
            Object.values(
                stage.items || {}
            ).reduce(
                (total, value) =>
                    total + value,
                0
            );

        foundAny =
            fragments > 0;

    }

    else {

        selectedGears.forEach(gear => {

            let bossGear = gear;


            // Boss tool cost
            if (
                gear === "axe" ||
                gear === "shovel"
            ) {

                bossGear =
                    "pickaxe";

            }


            if (
                stage.items[bossGear] !==
                undefined
            ) {

                fragments +=
                    stage.items[bossGear];

                foundAny = true;

            }

        });

    }


    return {
        credits:
            fragments /
            stage.fragmentsPerCredit,

        skipped:
            !foundAny
    };

}


// --------------------------------------
// CALCULATOR
// --------------------------------------

function calculateBudget() {

    const availableCredits =
        Number(
            creditBudgetInput.value
        );

    const rateMillions =
        Number(
            rateInput.value
        );

    const selectedGears =
        getSelectedGears();


    if (
        !Number.isFinite(availableCredits) ||
        availableCredits < 0 ||
        !Number.isFinite(rateMillions) ||
        rateMillions <= 0
    ) {

        reachEl.textContent = "—";
        usedEl.textContent = "—";
        leftEl.textContent = "—";
        nextEl.textContent = "—";

        return;

    }


    const currentIndex =
        progression.findIndex(
            stage =>
                stage.id ===
                currentStageSelect.value
        );


    if (currentIndex < 0) {
        return;
    }


    // No gear selected
    if (
        !selectedGears.includes("all") &&
        selectedGears.length === 0
    ) {

        reachEl.textContent =
            stageName(
                progression[currentIndex]
            );

        usedEl.textContent =
            "0c";

        leftEl.textContent =
            formatCredits(
                availableCredits
            );

        nextEl.textContent =
            "Select gear";

        breakdownEl.innerHTML = `
            <div class="warning">
                Select at least one gear item.
            </div>
        `;

        return;

    }


    const blockRate =
        rateMillions *
        1_000_000;


    let creditsUsed = 0;

    let furthestStage =
        progression[currentIndex];

    let nextStage = null;

    let nextCost = 0;

    const rows = [];


    // Start AFTER current stage
    for (
        let i = currentIndex + 1;
        i < progression.length;
        i++
    ) {

        const stage =
            progression[i];


        const result =
            getStageCost(
                stage,
                selectedGears,
                blockRate
            );


        // No selected gear in this mine
        if (result.skipped) {

            rows.push(`
                <div class="stage">

                    <div class="stage-name">
                        ${stageName(stage)}
                    </div>

                    <div class="warning">
                        None of your selected gear
                        is available here.
                    </div>

                </div>
            `);

            continue;

        }


        // Not enough credits for next upgrade
        if (
            creditsUsed +
            result.credits >
            availableCredits
        ) {

            nextStage = stage;
            nextCost = result.credits;

            break;

        }


        // Can afford it
        creditsUsed +=
            result.credits;

        furthestStage =
            stage;


        rows.push(`
            <div class="stage ${
                stage.type === "boss"
                    ? "boss"
                    : ""
            }">

                <div class="stage-name">
                    ✓ ${stageName(stage)}
                </div>

                <div class="stage-total">

                    <span>
                        Cost
                    </span>

                    <span>
                        ${
                            formatCredits(
                                result.credits
                            )
                        }
                    </span>

                </div>

            </div>
        `);

    }


    const creditsLeft =
        availableCredits -
        creditsUsed;


    reachEl.textContent =
        stageName(
            furthestStage
        );


    usedEl.textContent =
        formatCredits(
            creditsUsed
        );


    leftEl.textContent =
        formatCredits(
            creditsLeft
        );


    if (nextStage) {

        const needed =
            Math.max(
                0,
                nextCost -
                creditsLeft
            );


        nextEl.textContent =
            stageName(nextStage) +
            " (" +
            formatCredits(needed) +
            " more)";

    }

    else {

        nextEl.textContent =
            "Max progression reached";

    }


    breakdownEl.innerHTML =
        rows.length
            ? rows.join("")
            : `
                <div class="warning">
                    Your credits are not enough
                    for the next applicable upgrade.
                </div>
            `;

}


// --------------------------------------
// EVENTS
// --------------------------------------

currentStageSelect.addEventListener(
    "change",
    calculateBudget
);


creditBudgetInput.addEventListener(
    "input",
    calculateBudget
);


rateInput.addEventListener(
    "input",
    calculateBudget
);


gearAll.addEventListener(
    "change",
    updateGearControls
);


gearCheckboxes.forEach(box => {

    box.addEventListener(
        "change",
        calculateBudget
    );

});


// --------------------------------------
// INITIALIZE
// --------------------------------------

if (
    Array.isArray(progression) &&
    progression.length > 0
) {

    populateStages();

    updateGearControls();

}
