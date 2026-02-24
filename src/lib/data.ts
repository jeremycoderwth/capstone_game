import type { QuizQuestion, TileTypes, LEVELS, Character } from './definitions';

export const rationaleParagraphs = [
    {
        key: 1,
        text: `
            Purpose: The Steward's Quest was created to support students' academic learning through an engaging and interactive approach. It is a digital board game focused on deforestation, designed to make learning both meaningful and enjoyable.
            
            This application was developed as a capstone project by Grade 12 students from Group 3, Section St. Gerard, alongside their research study entitled "Developing a Digital Board Game on Deforestation as an Educational Tool for Grade 11 STEM Students." The effectiveness of the game is evaluated by comparing participants' pre-test and post-test results indicating positive learning outcomes through the use of engaging learning resources.
        `
    },
    {
        key: 2,
        text: `
            By continuing, you acknowledge that this application is developed as part of a capstone project and is intended to assess its effectiveness through a comparison of pre-test and post-test scores answered by Grade 11 students.
            
            Any information gathered through this application will be used solely for research purposes. All data will be kept confidential and stored securely by the researchers. The collected information will not be shared with third parties or used for any purpose other than this study.

            Content: By clicking "I Agree" you confirm that, as as selected participant, you understand the purpose of the game and voluntarily agree to participate, play the game, and answer all required assessments.
        `
    },
    {
        key: 3,
        text: `
            Deforestation is the process of clearing or converting forested land for other uses such as agriculture, urban development, or logging. This large-scale loss of trees removes natural habitats and disrupts the balance of ecosystems.

            Scientific research shows that converting forests into plantations, grasslands, or croplands dramatically alters soil properties and reduces crucial ecosystem functions liek carbon storage and nutrient cycling (Qu et al., 2024)
        `
    }
];

export const characters: Character[] = [
    {
        id: "boy",
        sprite: "boy"
    },
    {
        id: "girl",
        sprite: "girl"
    },
];

export const mechanics = [
    {
        key: 1,
        text: "In this quiz, we have 4 categories: Fire, Soil Pollution, Nuclear Waste, and Urbanization. These categories also are represented by its own environment the moment you play the game"
    },
    {
        key: 2,
        text: "Each categories contains 3 questions that you must answer and choose on the options provided"
    },
    {
        key: 3,
        text: "If you answered a question correctly, the damaged or polluted area in the environment will restore. Otherwise, a catastrophic event will happen and can damage the environment"
    },
    {
        key: 4,
        text: "Once you completed all the categories, you can plant trees in the environment. Have fun and Good luck!"
    }
];

export const fireTiles: TileTypes = {
    0: {
        sprite: { name: "fire", frame: 3 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    1: {
        sprite: { name: "fire", frame: 1 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    2: {
        sprite: { name: "fire", frame: 2 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    3: {
        sprite: { name: "fire", frame: 0 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    }
};

export const soilTiles: TileTypes = {
    0: {
        sprite: { name: "soil", frame: 2 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    1: {
        sprite: { name: "soil", frame: 1 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    2: {
        sprite: { name: "soil", frame: 3 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    3: {
        sprite: { name: "soil", frame: 0 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
};

export const nuclearWasteTiles: TileTypes = {
    0: {
        sprite: { name: "soil", frame: 2 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    1: {
        sprite: { name: "nuclearWaste", frame: 2 },
        frameWidth: 512,
        frameHeight: 512,
        collides: false
    },
    2: {
        sprite: { name: "nuclearWaste", frame: 1 },
        frameWidth: 512,
        frameHeight: 512,
        collides: false
    },
    3: {
        sprite: { name: "nuclearWaste", frame: 3 },
        frameWidth: 512,
        frameHeight: 512,
        collides: false
    },
};

export const urbanizationTiles: TileTypes = {
    0: {
        sprite: { name: "soil", frame: 2 },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    1: {
        sprite: { name: "urbanization", frame: 3 },
        frameWidth: 316,
        frameHeight: 321,
        collides: false
    },
    2: {
        sprite: { name: "urbanization", frame: 1 },
        frameWidth: 316,
        frameHeight: 321,
        collides: false
    },
    3: {
        sprite: { name: "urbanization", frame: 0 },
        frameWidth: 316,
        frameHeight: 321,
        collides: false
    },
};

export const grassLandTiles: TileTypes = {
    0: {
        sprite: {
            name: "soil",
            frame: 2
        },
        frameWidth: 768,
        frameHeight: 768,
        collides: false
    },
    1: {
        sprite: {
            name: "fire",
            frame: 3
        },
        frameWidth: 768,
        frameHeight: 768,
        collides: false,
    },
};

export const fireQuizQuestion: QuizQuestion[] = [
    {
        id: "FIRE-001",
        category: "fire",
        question: "Which human activity is responsible for causing wildfires in areas affected by deforestation?",
        choices: [
            { index: 1, text: "logging operations that leave behind tree stumps" },
            { index: 2, text: "mining activities that disturbs soil layers" },
            { index: 3, text: "Slash-and-burn agriculture for land clearing" },
            { index: 4, text: "construction of rural roads through forests"}
        ],
        correctIndex: 2,
        targetTile: { x: 9, y: 14, radius: 2 }
    },
    {
        id: "FIRE-002",
        category: "fire",
        question: "How does deforestation increase the risk of wildfires?",
        choices: [
            { index: 1, text: "It messes with the natural structure of the forest and affects the ground-level conditions" },
            { index: 2, text: "it reduces tree cover that causes low moisture and increases dryness" },
            { index: 3, text: "Sit increases rainfall, making lightning strikes more often" },
            { index: 4, text: "It causes animals to migrate and accidentally start fires"}
        ],
        correctIndex: 1,
        targetTile: { x: 8, y: 8, radius: 2 }
    },
    {
        id: "FIRE-003",
        category: "fire",
        question: "Which factor directly increases the intensity of wildfires?",
        choices: [
            { index: 1, text: "long periods of heat and drought that dry vegetation and reduce natural moisture" },
            { index: 2, text: "leaving fallen branches and leaves on the ground so they can decompose naturally rs" },
            { index: 3, text: "building wooden structures in forests that could catch a fire" },
            { index: 4, text: "planting trees that can provide as fuel for fires"}
        ],
        correctIndex: 0,
        targetTile: { x: 15, y: 9, radius: 2 }
    }
];

export const soilPollutionQuizQuestion: QuizQuestion[] = [
    {
        id: "SOIL-001",
        category: "soil pollution",
        question: "What happens to the soil when mining projects empty out the forests?",
        choices: [
            { index: 1, text: "The soil becomes richer" },
            { index: 2, text: "The soil becomes exposed and easily eroded" },
            { index: 3, text: "The soil is protected by vegetation" },
            { index: 4, text: "The soil does not change"}
        ],
        correctIndex: 1,
        targetTile: { x: 5, y: 3, radius: 2 }
    },
    {
        id: "SOIL-002",
        category: "soil pollution",
        question: "Why does deforestation that is caused by mining give out more soil pollution?",
        choices: [
            { index: 1, text: "Trees take in soil nutrients" },
            { index: 2, text: "Exposed soil is more affected by mining waste and erosion" },
            { index: 3, text: "Forests prevent mining activities" },
            { index: 4, text: "Soil pollution happens solely from factories"}
        ],
        correctIndex: 1,
        targetTile: { x: 8, y: 2, radius: 2 }
    },
    {
        id: "SOIL-003",
        category: "soil pollution",
        question: "What type of environment is commonly noticed after mining-related deforestation?",
        choices: [
            { index: 1, text: "Healthy forest soil" },
            { index: 2, text: "EAgricultural land" },
            { index: 3, text: "Bare and degraded soil" },
            { index: 4, text: "Wetland formation"}
        ],
        correctIndex: 2,
        targetTile: { x: 4, y: 7, radius: 2 }
    }
];

export const urbanQuizQuestion: QuizQuestion[] = [
    {
        id: 'URBAN-001',
        category: "urbanization",
        question: "Why can urbanization lead to habitat loss?",
        choices: [
            { index: 1, text: "Cities require construction and infrastructure that replace natural land" },
            { index: 2, text: "Urban areas recycle all their waste efficiently" },
            { index: 3, text: "Forests naturally disappear as cities grow nearby" },
            { index: 4, text: "Urbanization reduces human demand for food" },
        ],
        correctIndex: 0,
        targetTile: { x: 3, y: 7, radius: 2 }
    },
    {
        id: 'URBAN-002',
        category: "urbanization",
        question: "Why can urbanization lead to habitat loss?",
        choices: [
            { index: 1, text: "Transforming land into tourist attractions" },
            { index: 2, text: "Planting a lot of trees on lands that are already cleared" },
            { index: 3, text: "Forests being converted into farmlands or plantations" },
            { index: 4, text: "Advocate for policies that stop illegal logging" },
        ],
        correctIndex: 1,
        targetTile: { x: 1, y: 7, radius: 2 }
    },
    {
        id: 'URBAN-003',
        category: "urbanization",
        question: "Why does urbanization still cause deforestation even when people no longer live near forests?",
        choices: [
            { index: 1, text: "Forests are protected by companies" },
            { index: 2, text: "Forests are cleared to supply materials, food, and energy for urban populations" },
            { index: 3, text: "People consume fewer forest products" },
            { index: 4, text: "Expanding forests near cities preserves and protects them" },
        ],
        correctIndex: 1,
        targetTile: { x: 5, y: 5, radius: 2 }
    }
];

export const nuclearrWasteQuizQuestion: QuizQuestion[] = [
    {
        id: 'NUCLEAR-001',
        category: "nuclear waste",
        question:
            "How can nuclear waste contribute to deforestation through water pollution?\n\n" +
            "Statement 1:\n" +
            "Nuclear waste can contaminate nearby rivers and groundwater.\n\n" +
            "Statement 2:\n" +
            "Polluted water can damage forest soil and weaken tree growth, contributing to deforestation.",
        choices: [
            { index: 1, text: "Bot statements are TRUE" },
            { index: 2, text: "Statement 1 is TRUE, Statement 2 is FALSE" },
            { index: 3, text: "Statement 1 is FALSE , Statement 2 is TRUE" },
            { index: 4, text: "Both statements are FALSE" },
        ],
        correctIndex: 0,
        targetTile: { x: 8, y: 5, radius: 2 }
    },
    {
        id: 'NUCLEAR-002',
        category: "nuclear waste",
        question: `
            What role does deforestation play in nuclear waste water pollution?

            Statement 1:
            Deforestation increases soil erosion, allowing radioactive pollutants to spread more easily into water sources.

            Statement 2:
            Forests have no role in filtering or protecting water from nuclear contamination.
        `,
        choices: [
            { index: 1, text: "Bot statements are TRUE" },
            { index: 2, text: "Statement 1 is TRUE, Statement 2 is FALSE" },
            { index: 3, text: "Statement 1 is FALSE , STatement 2 is TRUE" },
            { index: 4, text: "Both statements are FALSE" },
        ],
        correctIndex: 1,
        targetTile: { x: 3, y: 3, radius: 2 }
    },
    {
        id: 'NUCLEAR-003',
        category: "nuclear waste",
        question: `
            Which statement best explains long-term environmental damage?

            Statement 1:
            Water pollution from nuclear waste can harm both aquatic ecosystems and nearby forests.

            Statement 2:
            Once forests are polluted by nuclear waste, they recover instantly without long-term effects
        `,
        choices: [
            { index: 1, text: "Bot statements are TRUE" },
            { index: 2, text: "Statement 1 is TRUE, Statement 2 is FALSE" },
            { index: 3, text: "Statement 1 is FALSE , STatement 2 is TRUE" },
            { index: 4, text: "Both statements are FALSE" },
        ],
        correctIndex: 1,
        targetTile: { x: 9, y: 4, radius: 2 }
    },
];

export const levelConfigs = [
    {
        theme: "fireLand",
        tileSize: 69,
        questions: fireQuizQuestion
    },
    {
        theme: "soilPollutionLand",
        tileSize: 69,
        questions: soilPollutionQuizQuestion
    },
    {
        theme: "nuclearWasteLand",
        tileSize: 61,
        questions: nuclearrWasteQuizQuestion
    },
    {
        theme: "urbanizationLand",
        tileSize: 57,
        questions: urbanQuizQuestion
    },
];

export const fireLevel = {
    id: 1,
    name: "Fire Level",
    category: "fire"
};

export const soilPollutionLevel = {
    id: 2,
    name: "Soil Pollution Level",
    category: "soil pollution"
};

export const nuclearWasteLevel = {
    id: 3,
    name: "Nuclear Waste Level",
    category: "nuclear waste"
};

export const urbanLevel = {
    id: 4,
    name: "Urbanization Level",
    category: "urbanization"
};

export const levels: LEVELS[] = [
    {
        id: "fire",
        worldTheme: fireTiles,
        questions: fireQuizQuestion,
        tileSize: 69,
        worldWidth: 5000,
        worldHeight: 5000,
    },
    {
        id: "soil",
        worldTheme: soilTiles,
        questions: soilPollutionQuizQuestion,
        tileSize: 69,
        worldWidth: 5000,
        worldHeight: 5000
    }, 
    {
        id: "nuclear waste",
        worldTheme: nuclearWasteTiles,
        questions: nuclearrWasteQuizQuestion,
        tileSize: 61,
        worldWidth: 5000,
        worldHeight: 5000,
    }, 
    {
        id: "urbanization",
        worldTheme: urbanizationTiles,
        questions: urbanQuizQuestion,
        tileSize: 57,
        worldWidth: 5000,
        worldHeight: 5000
    }
];

export type FreestyleWorld = Omit<LEVELS, "questions">;

export const grassland: FreestyleWorld = {
    id: "grass",
    worldTheme: grassLandTiles,
    tileSize: 69,
    worldWidth: 5000,
    worldHeight: 5000
};