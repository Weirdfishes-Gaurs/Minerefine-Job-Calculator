// Minecraft Job Calculator progression data
// Mines are measured in blocks.
// Boss item values are measured in boss fragments.

const WORLD_ORDER = [
    "End",
    "Aether",
    "Garden",
    "Ocean",
    "Arctic",
    "Sculk",
    "Woodland",
    "Trial Chambers"
];

const progression = [
    {
        "id": "mine-end-endstone",
        "type": "mine",
        "world": "End",
        "name": "Endstone",
        "items": {
            "sword": 10220000,
            "pickaxe": 7660000,
            "armor": 15630000,
            "charm": 6820000
        }
    },
    {
        "id": "mine-end-purpur",
        "type": "mine",
        "world": "End",
        "name": "Purpur",
        "items": {
            "sword": 11840000,
            "pickaxe": 9140000,
            "armor": 37360000,
            "charm": 8140000
        }
    },
    {
        "id": "mine-end-amethyst",
        "type": "mine",
        "world": "End",
        "name": "Amethyst",
        "items": {
            "sword": 14380000,
            "pickaxe": 10780000,
            "armor": 44080000,
            "charm": 9580000
        }
    },
    {
        "id": "mine-end-shulker",
        "type": "mine",
        "world": "End",
        "name": "Shulker",
        "items": {
            "sword": 17140000,
            "pickaxe": 12840000,
            "armor": 52500000,
            "charm": 11420000
        }
    },
    {
        "id": "mine-end-voidstone",
        "type": "mine",
        "world": "End",
        "name": "Voidstone",
        "items": {
            "sword": 20520000,
            "pickaxe": 15400000,
            "armor": 62840000,
            "charm": 13680000
        }
    },
    {
        "id": "mine-end-blacknova",
        "type": "mine",
        "world": "End",
        "name": "Blacknova",
        "items": {
            "sword": 24240000,
            "pickaxe": 18180000,
            "armor": 74260000,
            "charm": 16160000
        }
    },
    {
        "id": "mine-end-obsidian",
        "type": "mine",
        "world": "End",
        "name": "Obsidian",
        "items": {
            "sword": 28900000,
            "pickaxe": 21680000,
            "armor": 88560000,
            "charm": 19260000
        }
    },
    {
        "id": "boss-endor",
        "type": "boss",
        "name": "Endor",
        "beforeWorld": "Aether",
        "fragmentsPerCredit": 4,
        "items": {
            "sword": 7,
            "pickaxe": 7,
            "armor": 28,
            "charm": 7
        }
    },
    {
        "id": "mine-aether-granite",
        "type": "mine",
        "world": "Aether",
        "name": "Granite",
        "items": {
            "sword": 28700000,
            "pickaxe": 21530000,
            "armor": 79380000,
            "charm": 19130000
        }
    },
    {
        "id": "mine-aether-diorite",
        "type": "mine",
        "world": "Aether",
        "name": "Diorite",
        "items": {
            "sword": 29880000,
            "pickaxe": 22420000,
            "armor": 85460000,
            "charm": 19950000
        }
    },
    {
        "id": "mine-aether-aethermud",
        "type": "mine",
        "world": "Aether",
        "name": "Aethermud",
        "items": {
            "sword": 31150000,
            "pickaxe": 23350000,
            "armor": 92000000,
            "charm": 20750000
        }
    },
    {
        "id": "mine-aether-aethersoil",
        "type": "mine",
        "world": "Aether",
        "name": "Aethersoil",
        "items": {
            "sword": 32400000,
            "pickaxe": 24320000,
            "armor": 99010000,
            "charm": 21610000
        }
    },
    {
        "id": "mine-aether-cloudite",
        "type": "mine",
        "world": "Aether",
        "name": "Cloudite",
        "items": {
            "sword": 33770000,
            "pickaxe": 25320000,
            "armor": 106650000,
            "charm": 22500000
        }
    },
    {
        "id": "mine-aether-skybrick",
        "type": "mine",
        "world": "Aether",
        "name": "Skybrick",
        "items": {
            "sword": 35160000,
            "pickaxe": 26360000,
            "armor": 114780000,
            "charm": 23440000
        }
    },
    {
        "id": "mine-aether-mistcore",
        "type": "mine",
        "world": "Aether",
        "name": "Mistcore",
        "items": {
            "sword": 52040000,
            "pickaxe": 39950000,
            "armor": 176470000,
            "charm": 36880000
        }
    },
    {
        "id": "mine-aether-skycore",
        "type": "mine",
        "world": "Aether",
        "name": "Skycore",
        "items": {
            "sword": 64720000,
            "pickaxe": 48550000,
            "armor": 164230000,
            "charm": 43140000
        }
    },
    {
        "id": "mine-aether-stormcore",
        "type": "mine",
        "world": "Aether",
        "name": "Stormcore",
        "items": {
            "sword": 63060000,
            "pickaxe": 47500000,
            "armor": 181980000,
            "charm": 42240000
        }
    },
    {
        "id": "boss-aetherist",
        "type": "boss",
        "name": "Aetherist",
        "beforeWorld": "Garden",
        "fragmentsPerCredit": 4,
        "items": {
            "sword": 11,
            "pickaxe": 11,
            "armor": 44,
            "charm": 12
        }
    },
    {
        "id": "boss-zues",
        "type": "boss",
        "name": "Zues",
        "beforeWorld": "Garden",
        "fragmentsPerCredit": 5,
        "items": {
            "sword": 11,
            "pickaxe": 11,
            "armor": 44,
            "charm": 3
        }
    },
    {
        "id": "mine-garden-grass",
        "type": "mine",
        "world": "Garden",
        "name": "Grass",
        "items": {
            "sword": 49560000,
            "pickaxe": 37170000,
            "armor": 139490000,
            "charm": 33040000
        }
    },
    {
        "id": "mine-garden-garden-wall",
        "type": "mine",
        "world": "Garden",
        "name": "Garden Wall",
        "items": {
            "sword": 51610000,
            "pickaxe": 38730000,
            "armor": 150140000,
            "charm": 34410000
        }
    },
    {
        "id": "mine-garden-koi-pond",
        "type": "mine",
        "world": "Garden",
        "name": "Koi Pond",
        "items": {
            "sword": 53760000,
            "pickaxe": 40300000,
            "armor": 161660000,
            "charm": 35840000
        }
    },
    {
        "id": "mine-garden-rose",
        "type": "mine",
        "world": "Garden",
        "name": "Rose",
        "items": {
            "sword": 55990000,
            "pickaxe": 41970000,
            "armor": 174050000,
            "charm": 37310000
        }
    },
    {
        "id": "mine-garden-dandelion",
        "type": "mine",
        "world": "Garden",
        "name": "Dandelion",
        "items": {
            "sword": 74570000,
            "pickaxe": 55920000,
            "armor": 283430000,
            "charm": 49700000
        }
    },
    {
        "id": "mine-garden-torchflower",
        "type": "mine",
        "world": "Garden",
        "name": "Torchflower",
        "items": {
            "sword": 81550000,
            "pickaxe": 61130000,
            "armor": 256290000,
            "charm": 54350000
        }
    },
    {
        "id": "mine-garden-wither-rose",
        "type": "mine",
        "world": "Garden",
        "name": "Wither Rose",
        "items": {
            "sword": 89160000,
            "pickaxe": 66870000,
            "armor": 231790000,
            "charm": 59440000
        }
    },
    {
        "id": "boss-t-gardener",
        "type": "boss",
        "name": "T-Gardener",
        "beforeWorld": "Ocean",
        "fragmentsPerCredit": 3,
        "items": {
            "sword": 16,
            "pickaxe": 16,
            "armor": 64,
            "charm": 16
        }
    },
    {
        "id": "mine-ocean-bricked-prismarine",
        "type": "mine",
        "world": "Ocean",
        "name": "Bricked Prismarine",
        "items": {
            "sword": 116660000,
            "pickaxe": 87480000,
            "armor": 357300000,
            "charm": 77780000
        }
    },
    {
        "id": "mine-ocean-dark-prismarine",
        "type": "mine",
        "world": "Ocean",
        "name": "Dark Prismarine",
        "items": {
            "sword": 138740000,
            "pickaxe": 104040000,
            "armor": 424880000,
            "charm": 92500000
        }
    },
    {
        "id": "mine-ocean-tube-coral",
        "type": "mine",
        "world": "Ocean",
        "name": "Tube Coral",
        "items": {
            "sword": 165160000,
            "pickaxe": 123880000,
            "armor": 505760000,
            "charm": 110100000
        }
    },
    {
        "id": "mine-ocean-bubble-coral",
        "type": "mine",
        "world": "Ocean",
        "name": "Bubble Coral",
        "items": {
            "sword": 196500000,
            "pickaxe": 147360000,
            "armor": 601780000,
            "charm": 131000000
        }
    },
    {
        "id": "mine-ocean-fire-coral",
        "type": "mine",
        "world": "Ocean",
        "name": "Fire Coral",
        "items": {
            "sword": 263880000,
            "pickaxe": 197920000,
            "armor": 955660000,
            "charm": 175920000
        }
    },
    {
        "id": "mine-ocean-horn-coral",
        "type": "mine",
        "world": "Ocean",
        "name": "Horn Coral",
        "items": {
            "sword": 278140000,
            "pickaxe": 208600000,
            "armor": 955660000,
            "charm": 185420000
        }
    },
    {
        "id": "mine-ocean-sponge",
        "type": "mine",
        "world": "Ocean",
        "name": "Sponge",
        "items": {
            "sword": 331060000,
            "pickaxe": 248300000,
            "armor": 1020000000,
            "charm": 200000000
        }
    },
    {
        "id": "boss-guardian-o-toole",
        "type": "boss",
        "name": "Guardian 'o Toole",
        "beforeWorld": "Arctic",
        "fragmentsPerCredit": 3,
        "items": {
            "sword": 16,
            "pickaxe": 16,
            "armor": 64,
            "charm": 16
        }
    },
    {
        "id": "mine-arctic-blue-ice",
        "type": "mine",
        "world": "Arctic",
        "name": "Blue Ice",
        "items": {
            "sword": 182190000,
            "pickaxe": 136640000,
            "armor": 557980000,
            "charm": 121460000
        }
    },
    {
        "id": "mine-arctic-pine-tree",
        "type": "mine",
        "world": "Arctic",
        "name": "Pine Tree",
        "items": {
            "sword": 60300000,
            "axe": 45100000,
            "armor": 298800000,
            "charm": 40000000
        }
    },
    {
        "id": "mine-arctic-glacite",
        "type": "mine",
        "world": "Arctic",
        "name": "Glacite",
        "items": {
            "sword": 216830000,
            "pickaxe": 162620000,
            "armor": 664050000,
            "charm": 144550000
        }
    },
    {
        "id": "mine-arctic-azurite",
        "type": "mine",
        "world": "Arctic",
        "name": "Azurite",
        "items": {
            "sword": 257930000,
            "pickaxe": 193440000,
            "armor": 789920000,
            "charm": 171950000
        }
    },
    {
        "id": "mine-arctic-snow",
        "type": "mine",
        "world": "Arctic",
        "name": "Snow",
        "items": {
            "sword": 84200000,
            "shovel": 62900000,
            "armor": 413000000,
            "charm": 56000000
        }
    },
    {
        "id": "mine-arctic-cryocopper",
        "type": "mine",
        "world": "Arctic",
        "name": "Cryocopper",
        "items": {
            "sword": 306980000,
            "pickaxe": 230240000,
            "armor": 940090000,
            "charm": 204650000
        }
    },
    {
        "id": "mine-arctic-marble",
        "type": "mine",
        "world": "Arctic",
        "name": "Marble",
        "items": {
            "sword": 412250000,
            "pickaxe": 309200000,
            "armor": 1120000000,
            "charm": 274830000
        }
    },
    {
        "id": "mine-arctic-pale-tree",
        "type": "mine",
        "world": "Arctic",
        "name": "Pale Tree",
        "items": {
            "sword": 116000000,
            "axe": 86500000,
            "armor": 356400000,
            "charm": 77000000
        }
    },
    {
        "id": "mine-arctic-permafrost",
        "type": "mine",
        "world": "Arctic",
        "name": "Permafrost",
        "items": {
            "sword": 434710000,
            "pickaxe": 326040000,
            "armor": 1330000000,
            "charm": 289810000
        }
    },
    {
        "id": "mine-arctic-aurora",
        "type": "mine",
        "world": "Arctic",
        "name": "Aurora",
        "items": {
            "sword": 517350000,
            "pickaxe": 388000000,
            "armor": 1580000000,
            "charm": 344900000
        }
    },
    {
        "id": "boss-bjorn-gear",
        "type": "boss",
        "name": "Björn Gear",
        "beforeWorld": "Sculk",
        "fragmentsPerCredit": 3,
        "items": {
            "sword": 16,
            "pickaxe": 16,
            "armor": 64,
            "charm": 16
        }
    },
    {
        "id": "mine-sculk-darkstone",
        "type": "mine",
        "world": "Sculk",
        "name": "Darkstone",
        "items": {
            "sword": 519610000,
            "pickaxe": 389710000,
            "armor": 1600000000,
            "charm": 346410000
        }
    },
    {
        "id": "mine-sculk-warp-wood",
        "type": "mine",
        "world": "Sculk",
        "name": "Warp Wood",
        "items": {
            "sword": 1600000000,
            "axe": 1200000000,
            "armor": 4600000000,
            "charm": 1000000000
        }
    },
    {
        "id": "mine-sculk-sapphire",
        "type": "mine",
        "world": "Sculk",
        "name": "Sapphire",
        "items": {
            "sword": 605290000,
            "pickaxe": 453970000,
            "armor": 1900000000,
            "charm": 403530000
        }
    },
    {
        "id": "mine-sculk-city-wall",
        "type": "mine",
        "world": "Sculk",
        "name": "City Wall",
        "items": {
            "sword": 705180000,
            "pickaxe": 528880000,
            "armor": 2200000000,
            "charm": 470120000
        }
    },
    {
        "id": "mine-sculk-soul-soil",
        "type": "mine",
        "world": "Sculk",
        "name": "Soul Soil",
        "items": {
            "sword": 2100000000,
            "shovel": 1200000000,
            "armor": 2040000000,
            "charm": 750000000
        }
    },
    {
        "id": "mine-sculk-blackstone",
        "type": "mine",
        "world": "Sculk",
        "name": "Blackstone",
        "items": {
            "sword": 821570000,
            "pickaxe": 616170000,
            "armor": 2600000000,
            "charm": 547710000
        }
    },
    {
        "id": "mine-sculk-onyx",
        "type": "mine",
        "world": "Sculk",
        "name": "Onyx",
        "items": {
            "sword": 1110000000,
            "pickaxe": 827520000,
            "armor": 2940000000,
            "charm": 735570000
        }
    },
    {
        "id": "mine-sculk-bloodwood",
        "type": "mine",
        "world": "Sculk",
        "name": "Bloodwood",
        "items": {
            "sword": 2820000000,
            "axe": 2110000000,
            "armor": 8600000000,
            "charm": 1900000000
        }
    },
    {
        "id": "mine-sculk-ruby",
        "type": "mine",
        "world": "Sculk",
        "name": "Ruby",
        "items": {
            "sword": 1120000000,
            "pickaxe": 836290000,
            "armor": 3420000000,
            "charm": 743360000
        }
    },
    {
        "id": "mine-sculk-sculk",
        "type": "mine",
        "world": "Sculk",
        "name": "Sculk",
        "items": {
            "sword": 1300000000,
            "pickaxe": 974240000,
            "armor": 3880000000,
            "charm": 865990000
        }
    },
    {
        "id": "boss-warden",
        "type": "boss",
        "name": "Warden",
        "beforeWorld": "Woodland",
        "fragmentsPerCredit": 2,
        "items": {
            "sword": 28,
            "pickaxe": 28,
            "armor": 112,
            "charm": 32
        }
    },
    {
        "id": "mine-woodland-woodland-copper",
        "type": "mine",
        "world": "Woodland",
        "name": "Woodland Copper",
        "items": {
            "sword": 1060000000,
            "pickaxe": 792000000,
            "armor": 3240000000,
            "charm": 704000000
        }
    },
    {
        "id": "mine-woodland-podzol",
        "type": "mine",
        "world": "Woodland",
        "name": "Podzol",
        "items": {
            "sword": 1600000000,
            "shovel": 1540000000,
            "armor": 4850000000,
            "charm": 1060000000
        }
    },
    {
        "id": "mine-woodland-vase",
        "type": "mine",
        "world": "Woodland",
        "name": "Vase",
        "items": {
            "sword": 1260000000,
            "pickaxe": 942500000,
            "armor": 3850000000,
            "charm": 837700000
        }
    },
    {
        "id": "mine-woodland-honeystone",
        "type": "mine",
        "world": "Woodland",
        "name": "Honeystone",
        "items": {
            "sword": 1450000000,
            "pickaxe": 1130000000,
            "armor": 4560000000,
            "charm": 996800000
        }
    },
    {
        "id": "mine-woodland-pumpkin",
        "type": "mine",
        "world": "Woodland",
        "name": "Pumpkin",
        "items": {
            "sword": 4120000000,
            "axe": 2420000000,
            "armor": 12560000000,
            "charm": 2740000000
        }
    },
    {
        "id": "mine-woodland-overgrown-wall",
        "type": "mine",
        "world": "Woodland",
        "name": "Overgrown Wall",
        "items": {
            "sword": 2010000000,
            "pickaxe": 1510000000,
            "armor": 7280000000,
            "charm": 1340000000
        }
    },
    {
        "id": "mine-woodland-mansion-emerald",
        "type": "mine",
        "world": "Woodland",
        "name": "Mansion Emerald",
        "items": {
            "sword": 2120000000,
            "pickaxe": 1590000000,
            "armor": 7640000000,
            "charm": 1420000000
        }
    },
    {
        "id": "mine-woodland-mud-tangle",
        "type": "mine",
        "world": "Woodland",
        "name": "Mud Tangle",
        "items": {
            "sword": 3500000000,
            "shovel": 2150000000,
            "armor": 10690000000,
            "charm": 2330000000
        }
    },
    {
        "id": "mine-woodland-robe",
        "type": "mine",
        "world": "Woodland",
        "name": "Robe",
        "items": {
            "sword": 2690000000,
            "pickaxe": 2020000000,
            "armor": 10220000000,
            "charm": 1790000000
        }
    },
    {
        "id": "mine-woodland-amberstone",
        "type": "mine",
        "world": "Woodland",
        "name": "Amberstone",
        "items": {
            "sword": 3000000000,
            "pickaxe": 2250000000,
            "armor": 10730000000,
            "charm": 2000000000
        }
    },
    {
        "id": "mine-woodland-timber",
        "type": "mine",
        "world": "Woodland",
        "name": "Timber",
        "items": {
            "sword": 6390000000,
            "axe": 4800000000,
            "armor": 19580000000,
            "charm": 4260000000
        }
    },
    {
        "id": "mine-woodland-totem",
        "type": "mine",
        "world": "Woodland",
        "name": "Totem",
        "items": {
            "sword": 3570000000,
            "pickaxe": 2680000000,
            "armor": 10930000000,
            "charm": 2380000000
        }
    },
    {
        "id": "boss-watcher",
        "type": "boss",
        "name": "Watcher",
        "beforeWorld": "Trial Chambers",
        "fragmentsPerCredit": 2,
        "items": {
            "sword": 28,
            "pickaxe": 28,
            "armor": 120,
            "charm": 32
        }
    },
    {
        "id": "boss-ravager",
        "type": "boss",
        "name": "Ravager",
        "beforeWorld": "Trial Chambers",
        "fragmentsPerCredit": 2,
        "items": {
            "sword": 36,
            "pickaxe": 36,
            "armor": 144,
            "charm": 36
        }
    },
    {
        "id": "mine-trial-chambers-rust",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Rust",
        "items": {
            "sword": 2790000000,
            "pickaxe": 2090000000,
            "armor": 11820000000,
            "charm": 1830000000
        }
    },
    {
        "id": "mine-trial-chambers-trestle",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Trestle",
        "items": {
            "sword": 7660000000,
            "axe": 5750000000,
            "armor": 32490000000,
            "charm": 5040000000
        }
    },
    {
        "id": "mine-trial-chambers-lodestone",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Lodestone",
        "items": {
            "sword": 3370000000,
            "pickaxe": 2520000000,
            "armor": 14980000000,
            "charm": 2220000000
        }
    },
    {
        "id": "mine-trial-chambers-ironclad",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Ironclad",
        "items": {
            "sword": 3720000000,
            "pickaxe": 2790000000,
            "armor": 15760000000,
            "charm": 2450000000
        }
    },
    {
        "id": "mine-trial-chambers-wind",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Wind",
        "items": {
            "sword": 5420000000,
            "shovel": 5190000000,
            "armor": 22910000000,
            "charm": 3560000000
        }
    },
    {
        "id": "mine-trial-chambers-goldenclad",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Goldenclad",
        "items": {
            "sword": 5850000000,
            "pickaxe": 4400000000,
            "armor": 24800000000,
            "charm": 3850000000
        }
    },
    {
        "id": "mine-trial-chambers-rampart",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Rampart",
        "items": {
            "sword": 8250000000,
            "pickaxe": 6210000000,
            "armor": 27380000000,
            "charm": 4250000000
        }
    },
    {
        "id": "mine-trial-chambers-sienna",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Sienna",
        "items": {
            "sword": 14770000000,
            "axe": 13590000000,
            "armor": 49030000000,
            "charm": 7610000000
        }
    },
    {
        "id": "mine-trial-chambers-gear",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Gear",
        "items": {
            "sword": 12760000000,
            "pickaxe": 9580000000,
            "armor": 42350000000,
            "charm": 6570000000
        }
    },
    {
        "id": "mine-trial-chambers-chamber",
        "type": "mine",
        "world": "Trial Chambers",
        "name": "Chamber",
        "items": {
            "sword": 14010000000,
            "pickaxe": 10510000000,
            "armor": 46470000000,
            "charm": 7210000000
        }
    },
    {
        "id": "boss-brass-colossus",
        "type": "boss",
        "name": "Brass Colossus",
        "beforeWorld": null,
        "fragmentsPerCredit": 1.5,
        "items": {
            "sword": 40,
            "pickaxe": 40,
            "armor": 160,
            "charm": 40
        }
    }
];
