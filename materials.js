const materialInput =
    document.getElementById("materialAmount");

const rateInput =
    document.getElementById("quickBlockRate");

const parsedMaterialsEl =
    document.getElementById("parsedMaterials");

const creditsEl =
    document.getElementById("quickCredits");

const errorEl =
    document.getElementById("materialError");


function parseAmount(value) {

    if (!value) {
        return 0;
    }

    let text = String(value)
        .trim()
        .toLowerCase()
        .replaceAll(",", "")
        .replaceAll(" ", "");

    let multiplier = 1;

    if (text.endsWith("b")) {

        multiplier = 1_000_000_000;

        text = text.slice(0, -1);

    }

    else if (text.endsWith("m")) {

        multiplier = 1_000_000;

        text = text.slice(0, -1);

    }

    const number = Number(text);

    if (
        !Number.isFinite(number) ||
        number < 0
    ) {
        return null;
    }

    return number * multiplier;
}


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


function formatAmount(value) {

    if (value >= 1_000_000_000) {

        return (
            formatNumber(
                value / 1_000_000_000
            ) + "b"
        );

    }

    if (value >= 1_000_000) {

        return (
            formatNumber(
                value / 1_000_000
            ) + "m"
        );

    }

    return formatNumber(value);
}


function calculateMaterials() {

    const blocks =
        parseAmount(materialInput.value);

    const rateMillions =
        Number(rateInput.value);

    if (blocks === null) {

        errorEl.textContent =
            "Enter a valid material amount.";

        parsedMaterialsEl.textContent = "—";
        creditsEl.textContent = "—";

        return;
    }

    if (
        !Number.isFinite(rateMillions) ||
        rateMillions <= 0
    ) {

        errorEl.textContent =
            "Block rate must be greater than 0.";

        creditsEl.textContent = "—";

        return;
    }

    errorEl.textContent = "";

    const blockRate =
        rateMillions * 1_000_000;

    const credits =
        blocks / blockRate;

    parsedMaterialsEl.textContent =
        formatAmount(blocks);

    creditsEl.textContent =
        formatNumber(credits) + "c";

}


materialInput.addEventListener(
    "input",
    calculateMaterials
);

rateInput.addEventListener(
    "input",
    calculateMaterials
);

calculateMaterials();
