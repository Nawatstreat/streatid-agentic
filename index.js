import readline from "readline";
import crypto from "crypto";

/* ========= COLOR SYSTEM ========= */
const cyan = t => `\x1b[36m${t}\x1b[0m`;
const green = t => `\x1b[32m${t}\x1b[0m`;
const yellow = t => `\x1b[33m${t}\x1b[0m`;
const red = t => `\x1b[31m${t}\x1b[0m`;

/* ========= ENGINE ========= */

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let agents = [];

function header() {
  console.clear();
  console.log(cyan("╔════════════════════════════════════════════╗"));
  console.log(cyan("║      STREATID AGENTIC • ID ENGINE v2      ║"));
  console.log(cyan("╚════════════════════════════════════════════╝"));
  console.log("");
}

function generateId() {
  return crypto.randomBytes(4).toString("hex");
}

function classify(score) {
  if (score >= 800) return green("LOW RISK");
  if (score >= 400) return yellow("MEDIUM RISK");
  return red("HIGH RISK");
}

function renderAgents() {
  if (agents.length === 0) {
    console.log(yellow("No registered agents.\n"));
    return;
  }

  agents.forEach(a => {
    console.log("┌───────────────────────────────────────────┐");
    console.log(`│ ID        : ${a.id}`);
    console.log(`│ Behavior  : ${a.behaviorScore}`);
    console.log(`│ Trust     : ${a.trustIndex}`);
    console.log(`│ Risk      : ${classify(a.trustIndex)}`);
    console.log("└───────────────────────────────────────────┘\n");
  });
}

function renderMenu() {
  console.log("┌──────── COMMAND MENU ────────┐");
  console.log("│ create                      │");
  console.log("│ interact                    │");
  console.log("│ penalize                    │");
  console.log("│ list                        │");
  console.log("│ exit                        │");
  console.log("└─────────────────────────────┘\n");
}

function render() {
  header();
  renderAgents();
  renderMenu();
}

function createAgent() {
  agents.push({
    id: generateId(),
    behaviorScore: 500,
    trustIndex: 500,
    interactions: []
  });

  console.log(green("\nAgent created successfully.\n"));
  render();
  prompt();
}

function interactAgent() {
  rl.question("Agent ID: ", id => {
    const a = agents.find(x => x.id === id);
    if (!a) return prompt();

    a.behaviorScore += 50;
    a.trustIndex += 30;
    a.interactions.push({ type: "POSITIVE", time: Date.now() });

    console.log(green("\nPositive interaction recorded.\n"));
    render();
    prompt();
  });
}

function penalizeAgent() {
  rl.question("Agent ID: ", id => {
    const a = agents.find(x => x.id === id);
    if (!a) return prompt();

    a.behaviorScore -= 80;
    a.trustIndex -= 120;
    a.interactions.push({ type: "NEGATIVE", time: Date.now() });

    console.log(red("\nNegative interaction recorded.\n"));
    render();
    prompt();
  });
}

function handle(cmd) {
  switch (cmd.trim()) {
    case "create":
      createAgent();
      break;
    case "interact":
      interactAgent();
      break;
    case "penalize":
      penalizeAgent();
      break;
    case "list":
      render();
      prompt();
      break;
    case "exit":
      console.log(cyan("\nAgent Engine Shutdown.\n"));
      rl.close();
      break;
    default:
      render();
      prompt();
  }
}

function prompt() {
  rl.question(cyan("agentic> "), handle);
}

render();
prompt();
