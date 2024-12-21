// Sample questions for CompTIA A+ Exam
const questions = [
    {
        id: 1,
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Central Process Unit",
            "Computer Personal Unit",
            "Central Processor Unit"
        ],
        correctAnswer: ["Central Processing Unit"],
        requiredAnswers: 1
    },
    {
        id: 2,
        question: "Which of the following are types of RAM? (Select all that apply)",
        options: [
            "ROM",
            "SRAM",
            "DRAM",
            "SSD"
        ],
        correctAnswer: ["SRAM", "DRAM"],
        requiredAnswers: 2
    },
    {
        id: 3,
        question: "What is the primary function of an operating system?",
        options: [
            "Manage hardware resources",
            "Run applications",
            "Provide security",
            "All of the above"
        ],
        correctAnswer: ["All of the above"],
        requiredAnswers: 1
    },
    {
        id: 4,
        question: "Which component is responsible for the wireless communication in a laptop?",
        options: [
            "CPU",
            "Wi-Fi adapter",
            "RAM",
            "Hard Drive"
        ],
        correctAnswer: ["Wi-Fi adapter"],
        requiredAnswers: 1
    },
    {
        id: 5,
        question: "What does BIOS stand for?",
        options: [
            "Basic Input Output System",
            "Binary Input Output System",
            "Basic Integrated Operating System",
            "Binary Integrated Operating System"
        ],
        correctAnswer: ["Basic Input Output System"],
        requiredAnswers: 1
    },
    {
        id: 6,
        question: "Which of the following is a common file system used by Windows?",
        options: [
            "FAT32",
            "NTFS",
            "exFAT",
            "All of the above"
        ],
        correctAnswer: ["All of the above"],
        requiredAnswers: 1
    },
    {
        id: 7,
        question: "What is the purpose of a power supply unit (PSU) in a computer?",
        options: [
            "To provide power to the motherboard",
            "To cool the CPU",
            "To store data",
            "To manage network connections"
        ],
        correctAnswer: ["To provide power to the motherboard"],
        requiredAnswers: 1
    },
    {
        id: 8,
        question: "Which of the following is a characteristic of SSDs compared to HDDs?",
        options: [
            "Higher speed",
            "More durability",
            "Lower power consumption",
            "All of the above"
        ],
        correctAnswer: ["All of the above"],
        requiredAnswers: 1
    },
    {
        id: 9,
        question: "What is the maximum length of a USB 2.0 cable?",
        options: [
            "1 meter",
            "3 meters",
            "5 meters",
            "10 meters"
        ],
        correctAnswer: ["5 meters"],
        requiredAnswers: 1
    },
    {
        id: 10,
        question: "Which of the following is NOT a type of malware?",
        options: [
            "Virus",
            "Trojan",
            "Firewall",
            "Worm"
        ],
        correctAnswer: ["Firewall"],
        requiredAnswers: 1
    },
    {
        id: 11,
        question: "What does DHCP stand for?",
        options: [
            "Dynamic Host Configuration Protocol",
            "Dynamic Host Control Protocol",
            "Dynamic Hypertext Configuration Protocol",
            "Dynamic Hypertext Control Protocol"
        ],
        correctAnswer: ["Dynamic Host Configuration Protocol"],
        requiredAnswers: 1
    },
    {
        id: 12,
        question: "Which of the following is a benefit of using a VPN?",
        options: [
            "Increased security",
            "Access to region-restricted content",
            "Privacy from ISP tracking",
            "All of the above"
        ],
        correctAnswer: ["All of the above"],
        requiredAnswers: 1
    },
    {
        id: 13,
        question: "What is the function of a router?",
        options: [
            "To connect multiple networks",
            "To connect devices within a single network",
            "To provide power to devices",
            "To store data"
        ],
        correctAnswer: ["To connect multiple networks"],
        requiredAnswers: 1
    },
    {
        id: 14,
        question: "Which of the following is a common port for HTTP traffic?",
        options: [
            "80",
            "443",
            "21",
            "25"
        ],
        correctAnswer: ["80"],
        requiredAnswers: 1
    },
    {
        id: 15,
        question: "What is the purpose of a surge protector?",
        options: [
            "To provide backup power",
            "To protect devices from voltage spikes",
            "To filter network traffic",
            "To cool electronic devices"
        ],
        correctAnswer: ["To protect devices from voltage spikes"],
        requiredAnswers: 1
    },
    {
        id: 16,
        question: "Which of the following is a type of network topology?",
        options: [
            "Star",
            "Ring",
            "Bus",
            "All of the above"
        ],
        correctAnswer: ["All of the above"],
        requiredAnswers: 1
    },
    {
        id: 17,
        question: "What is the primary purpose of a firewall?",
        options: [
            "To block unauthorized access",
            "To speed up network traffic",
            "To store data",
            "To manage user accounts"
        ],
        correctAnswer: ["To block unauthorized access"],
        requiredAnswers: 1
    },
    {
        id: 18,
        question: "Which of the following is a common video output port?",
        options: [
            "HDMI",
            "USB",
            "Ethernet",
            "VGA"
        ],
        correctAnswer: ["HDMI", "VGA"], // Multiple correct answers
        requiredAnswers: 2
    },
    {
        id: 19,
        question: "What does the term 'phishing' refer to?",
        options: [
            "A method of stealing personal information",
            "A type of malware",
            "A network attack",
            "A data backup method"
        ],
        correctAnswer: ["A method of stealing personal information"],
        requiredAnswers: 1
    },
    {
        id: 20,
        question: "Which of the following is a benefit of using cloud storage?",
        options: [
            "Accessibility from anywhere",
            "Automatic backups",
            "Scalability",
            "All of the above"
        ],
        correctAnswer: ["All of the above"],
        requiredAnswers: 1
    }
];

// Function to fetch questions
function getQuestions() {
    return questions;
}

// Export the function to be used in other files
export { getQuestions }; 