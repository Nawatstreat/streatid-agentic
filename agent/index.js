const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let identities = {};

// ===== UI HEADER =====
function header() {
  console.clear();
  console.log("\x1b[36m═══════════════════════════════════════════════\x1b[0m");
  console.log("\x1b[34m        🔷  STREATID AGENTIC  🔷\x1b[0m");
  console.log("\x1b[36m═══════════════════════════════════════════════\x1b[0m");
  console.log("\x1b[96mA futuristic CLI identity engine\x1b[0m\n");
}

// ===== MENU =====
function menu() {
  console.log("\x1b[34mCommands:\x1b[0m");
  console.log("\x1b[36m register\x1b[0m  → create new identity");
  console.log("\x1b[36m verify\x1b[0m    → verify identity");
  console.log("\x1b[36m list\x1b[0m      → show identities");
  console.log("\x1b[36m remove\x1b[0m    → delete identity");
  console.log("\x1b[36m exit\x1b[0m      → shutdown system\n");

  rl.question("\x1b[94mstreatid> \x1b[0m", handleCommand);
}

// ===== COMMAND HANDLER =====
function handleCommand(cmd) {
  switch (cmd.trim()) {
    case "register":
      rl.question("Identity name: ", (name) => {
        identities[name] = { verified: false };
        console.log("\n\x1b[92m✔ Identity registered successfully\x1b[0m\n");
        menu();
      });
      break;

    case "verify":
      rl.question("Identity name: ", (name) => {
        if (identities[name]) {
          identities[name].verified = true;
          console.log("\n\x1b[92m✔ Identity verified\x1b[0m\n");
        } else {
          console.log("\n\x1b[91m✖ Identity not found\x1b[0m\n");
        }
        menu();
      });
      break;

    case "list":
      console.log("\n\x1b[34m📋 Identity Ledger\x1b[0m");
      if (Object.keys(identities).length === 0) {
        console.log("\x1b[90mNo identities registered\x1b[0m\n");
      } else {
        Object.entries(identities).forEach(([name, data]) => {
          const status = data.verified ? "\x1b[92mVERIFIED\x1b[0m" : "\x1b[93mPENDING\x1b[0m";
          console.log(` - ${name} : ${status}`);
        });
        console.log();
      }
      menu();
      break;

    case "remove":
      rl.question("Identity name: ", (name) => {
        if (identities[name]) {
          delete identities[name];
          console.log("\n\x1b[92m✔ Identity removed\x1b[0m\n");
        } else {
          console.log("\n\x1b[91m✖ Identity not found\x1b[0m\n");
        }
        menu();
      });
      break;

    case "exit":
      console.log("\n\x1b[94mSystem shutting down...\x1b[0m");
      rl.close();
      break;

    default:
      console.log("\n\x1b[91mUnknown command\x1b[0m\n");
      menu();
  }
}

// ===== START =====
header();
menu();
