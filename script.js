// Minecraft Job Calculator logic

const blockRateSelect = document.getElementById("blockRate");
const fromStageSelect = document.getElementById("fromStage");
const toStageSelect = document.getElementById("toStage");
const gearSelect = document.getElementById("gear");

const totalBlocksEl = document.getElementById("totalBlocks");
const miningCreditsEl = document.getElementById("miningCredits");
const bossCreditsEl = document.getElementById("bossCredits");
const totalCreditsEl = document.getElementById("totalCredits");

const breakdownEl = document.getElementById("breakdown");
const toggleBreakdownButton = document.getElementById("toggleBreakdown");

const ITEM_NAMES = {
    sword: "Sword",
    pickaxe: "Pickaxe",
    axe: "Axe",
    shovel: "Shovel",
    armor: "Armor",
    charm: "Charm"
};

function formatNumber(value, maxDecimals = 2) {
    return Number(value).toLocaleString(undefined, {
        maximumFractionDigits: maxDecimals
    });
}

function formatBlocks(value) {
    if (value >= 1_000_000_000) {
        return `${formatNumber(value / 1_000_000_000)}b`;
    }

    if (value >= 1_000_000) {
        return `${formatNumber(value / 1_000_000)}m`;
    }

    if (value >= 1_000) {
        return `${formatNumber(value / 1_000)}k`;
    }

    return formatNumber(value);
}

function formatCredits(value) {
    return `${formatNumber(value, 2)}c`;
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function stageLabel(stage) {
    if (stage.type === "boss") {
        return `BOSS • ${stage.name}`;
    }

    return `${stage.world} • ${stage.name}`;
}

function makeOption(stage) {
    const option = document.createElement("option");

    option.value = stage.id;
    option.textContent = stageLabel(stage);

    return option;
}

function populateFromDropdown() {
    fromStageSelect.innerHTML = "";

    progression.forEach(stage => {
        fromStageSelect.appendChild(makeOption(stage));
    });
}

function populateToDropdown(preferredId = null) {
    const startIndex = progression.findIndex(
        stage => stage.id === fromStageSelect.value
    );

    const previousValue = preferredId || toStageSelect.value;

    toStageSelect.innerHTML = "";

    for (let i = startIndex; i < progression.length; i++) {
        toStageSelect.appendChild(makeOption(progression[i]));
    }

    const stillAvailable = [...toStageSelect.options].some(
        option => option.value === previousValue
    );

    if (stillAvailable) {
        toStageSelect.value = previousValue;
    } else {
        toStageSelect.value = progression[startIndex].id;
    }
}

function selectedItemEntries(stage, selectedGear) {
    const entries = Object.entries(stage.items || {});

    if (selectedGear === "all") {
        return entries;
    }

    return entries.filter(([item]) => item === selectedGear);
}

function calculate() {
const blockRate =
    Number(blockRateSelect.value) * 1_000_000;
    const selectedGear = gearSelect.value;

    const startIndex = progression.findIndex(
        stage => stage.id === fromStageSelect.value
    );

    const endIndex = progression.findIndex(
        stage => stage.id === toStageSelect.value
    );

if (
    startIndex < 0 ||
    endIndex < 0 ||
    endIndex < startIndex
) {
    showInvalidPath();
    return;
}

const path = progression.slice(
    startIndex + 1,
    endIndex + 1
);

    let totalBlocks = 0;
    let bossCredits = 0;
    let skippedStages = 0;

    const breakdownParts = [];

    for (const stage of path) {
        const selectedItems = selectedItemEntries(
            stage,
            selectedGear
        );

        if (selectedItems.length === 0) {
            skippedStages++;

            breakdownParts.push(`
                <div class="stage ${stage.type === "boss" ? "boss" : ""}">
                    <div class="stage-name">
                        ${escapeHtml(stage.name)}
                    </div>

                    <div class="stage-type">
                        ${
                            stage.type === "boss"
                                ? "Boss"
                                : escapeHtml(stage.world)
                        }
                    </div>

                    <div class="warning">
                        ${
                            escapeHtml(
                                ITEM_NAMES[selectedGear] ||
                                selectedGear
                            )
                        } is not available here.
                    </div>
                </div>
            `);

            continue;
        }

        if (stage.type === "mine") {
            let stageBlocks = 0;

            const rows = selectedItems.map(
                ([item, blocks]) => {

                    stageBlocks += blocks;

                    return `
                        <div class="item-row">
                            <span>
                                ${escapeHtml(
                                    ITEM_NAMES[item] || item
                                )}
                            </span>

                            <span>
                                ${formatBlocks(blocks)}
                            </span>
                        </div>
                    `;
                }
            ).join("");

            totalBlocks += stageBlocks;

            breakdownParts.push(`
                <div class="stage">

                    <div class="stage-name">
                        ${escapeHtml(stage.name)}
                    </div>

                    <div class="stage-type">
                        ${escapeHtml(stage.world)} • Mine
                    </div>

                    ${rows}

                    <div class="stage-total">
                        <span>Total</span>

                        <span>
                            ${formatBlocks(stageBlocks)}
                        </span>
                    </div>

                </div>
            `);
        }

        else {
            let stageFragments = 0;

            const rows = selectedItems.map(
                ([item, fragments]) => {

                    stageFragments += fragments;

                    return `
                        <div class="item-row">
                            <span>
                                ${escapeHtml(
                                    ITEM_NAMES[item] || item
                                )}
                            </span>

                            <span>
                                ${formatNumber(fragments)}
                                fragments
                            </span>
                        </div>
                    `;
                }
            ).join("");

            const stageCredits =
                stageFragments /
                stage.fragmentsPerCredit;

            bossCredits += stageCredits;

            breakdownParts.push(`
                <div class="stage boss">

                    <div class="stage-name">
                        ${escapeHtml(stage.name)}
                    </div>

                    <div class="stage-type">
                        Boss •
                        ${formatNumber(
                            stage.fragmentsPerCredit
                        )}
                        fragments / credit
                    </div>

                    ${rows}

                    <div class="stage-total">
                        <span>Total</span>

                        <span>
                            ${formatNumber(stageFragments)}
                            fragments
                            (${formatCredits(stageCredits)})
                        </span>
                    </div>

                </div>
            `);
        }
    }

    const miningCredits =
        totalBlocks / blockRate;

    const totalCredits =
        miningCredits + bossCredits;

    totalBlocksEl.textContent =
        formatBlocks(totalBlocks);

    miningCreditsEl.textContent =
        formatCredits(miningCredits);

    bossCreditsEl.textContent =
        formatCredits(bossCredits);

    totalCreditsEl.textContent =
        formatCredits(totalCredits);

    let header = "";

    if (
        selectedGear !== "all" &&
        skippedStages > 0
    ) {
        header = `
            <div
                class="warning"
                style="margin-bottom: 12px;"
            >
                ${skippedStages}
                stage${skippedStages === 1 ? "" : "s"}
                in this path do not have
                ${escapeHtml(
                    ITEM_NAMES[selectedGear]
                )},
                so they were not counted.
            </div>
        `;
    }

    breakdownEl.innerHTML =
        header +
        breakdownParts.join("");
}

function showInvalidPath() {
    totalBlocksEl.textContent = "—";
    miningCreditsEl.textContent = "—";
    bossCreditsEl.textContent = "—";
    totalCreditsEl.textContent = "—";

    breakdownEl.innerHTML = `
        <div class="warning">
            Choose a destination that comes
            after the starting point.
        </div>
    `;
}

function handleFromChange() {
    populateToDropdown();
    calculate();
}

function setUsefulDefaults() {
    fromStageSelect.value =
        progression[0].id;

    populateToDropdown();

    const endor = progression.find(
        stage => stage.name === "Endor"
    );

    if (endor) {
        toStageSelect.value =
            endor.id;
    }

    calculate();
}

blockRateSelect.addEventListener(
    "change",
    calculate
);

fromStageSelect.addEventListener(
    "change",
    handleFromChange
);

toStageSelect.addEventListener(
    "change",
    calculate
);

gearSelect.addEventListener(
    "change",
    calculate
);

toggleBreakdownButton.addEventListener(
    "click",
    () => {

        const hidden =
            breakdownEl.style.display === "none";

        breakdownEl.style.display =
            hidden ? "" : "none";

        toggleBreakdownButton.textContent =
            hidden ? "Hide" : "Show";
    }
);

if (
    !Array.isArray(progression) ||
    progression.length === 0
) {
    breakdownEl.innerHTML = `
        <div class="warning">
            No progression data was loaded.
            Check data.js.
        </div>
    `;
}

else {
    populateFromDropdown();
    setUsefulDefaults();
}
