const currentStageSelect =
    document.getElementById(
        "budgetCurrentStage"
    );

const creditBudgetInput =
    document.getElementById(
        "creditBudget"
    );

const gearSelect =
    document.getElementById(
        "budgetGear"
    );

const rateInput =
    document.getElementById(
        "budgetBlockRate"
    );

const reachEl =
    document.getElementById(
        "budgetReach"
    );

const usedEl =
    document.getElementById(
        "budgetUsed"
    );

const leftEl =
    document.getElementById(
        "budgetLeft"
    );

const nextEl =
    document.getElementById(
        "budgetNext"
    );

const breakdownEl =
    document.getElementById(
        "budgetBreakdown"
    );


const ITEM_NAMES = {

    sword: "Sword",

    pickaxe: "Pickaxe",

    axe: "Axe",

    shovel: "Shovel",

    armor: "Armor",

    charm: "Charm"

};


function formatNumber(
    value,
    decimals = 2
) {

    return Number(value).toLocaleString(
        undefined,
        {
            maximumFractionDigits: decimals
        }
    );

}


function formatCredits(value) {

    return (
        formatNumber(value, 2) +
        "c"
    );

}


function stageName(stage) {

    if (stage.type === "boss") {

        return (
            "BOSS • " +
            stage.name
        );

    }

    return (
        stage.world +
        " • " +
        stage.name
    );

}


function makeStageOption(stage) {

    const option =
        document.createElement(
            "option"
        );

    option.value = stage.id;

    option.textContent =
        stageName(stage);

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


function bossItemForGear(gear) {

    if (
        gear === "axe" ||
        gear === "shovel"
    ) {

        return "pickaxe";

    }

    return gear;

}


function getStageCost(
    stage,
    gear,
    blockRate
) {

    if (stage.type === "mine") {

        if (gear === "all") {

            const blocks =
                Object.values(
                    stage.items
                ).reduce(
                    (sum, value) =>
                        sum + value,
                    0
                );

            return {
                credits:
                    blocks /
                    blockRate,

                skipped: false
            };

        }


        if (
            stage.items[gear] ===
            undefined
        ) {

            return {
                credits: 0,
                skipped: true
            };

        }


        return {

            credits:
                stage.items[gear] /
                blockRate,

            skipped: false

        };

    }


    if (gear === "all") {

        const fragments =
            Object.values(
                stage.items
            ).reduce(
                (sum, value) =>
                    sum + value,
                0
            );

        return {

            credits:
                fragments /
                stage.fragmentsPerCredit,

            skipped: false

        };

    }


    const bossGear =
        bossItemForGear(gear);


    const fragments =
        stage.items[bossGear];


    if (fragments === undefined) {

        return {
            credits: 0,
            skipped: true
        };

    }


    return {

        credits:
            fragments /
            stage.fragmentsPerCredit,

        skipped: false

    };

}


function calculateBudget() {

    const availableCredits =
        Number(
            creditBudgetInput.value
        );

    const rateMillions =
        Number(
            rateInput.value
        );

    const selectedGear =
        gearSelect.value;


    if (
        !Number.isFinite(
            availableCredits
        ) ||
        availableCredits < 0 ||
        !Number.isFinite(
            rateMillions
        ) ||
        rateMillions <= 0
    ) {

        return;

    }


    const blockRate =
        rateMillions *
        1_000_000;


    const currentIndex =
        progression.findIndex(
            stage =>
                stage.id ===
                currentStageSelect.value
        );


    let creditsUsed = 0;

    let furthestStage =
        progression[currentIndex];

    let nextStage = null;

    let nextCost = null;

    const rows = [];


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
                selectedGear,
                blockRate
            );


        if (result.skipped) {

            rows.push(`
                <div class="stage">

                    <div class="stage-name">
                        ${stageName(stage)}
                    </div>

                    <div class="warning">
                        No ${
                            ITEM_NAMES[
                                selectedGear
                            ]
                        } upgrade here.
                    </div>

                </div>
            `);

            continue;

        }


        if (
            creditsUsed +
            result.credits >
            availableCredits
        ) {

            nextStage = stage;
            nextCost = result.credits;

            break;

        }


        creditsUsed +=
            result.credits;

        furthestStage = stage;


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

                    <span>Cost</span>

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
            formatCredits(
                needed
            ) +
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


populateStages();

calculateBudget();


currentStageSelect.addEventListener(
    "change",
    calculateBudget
);

creditBudgetInput.addEventListener(
    "input",
    calculateBudget
);

gearSelect.addEventListener(
    "change",
    calculateBudget
);

rateInput.addEventListener(
    "input",
    calculateBudget
);
