import type { Models } from "appwrite";
import { Query } from "appwrite";
import { account, databases, DATABASEID, TBL_LEVELS, TBL_GAME_SESSIONS, teams, CAPSTONE_TEAMS, tablesDB } from "../auth/appwrite";
import Toast from "../core/toast";
import { logout } from "../auth/auth-service";

const loginBtn = document.getElementById("loginBtn") as HTMLButtonElement;
const errorMsg = document.getElementById("errorMsg") as HTMLParagraphElement;

window.addEventListener('DOMContentLoaded', async () => {
    try {
        const user = await account.get();
        showDashboard();
    } catch {
        // Not logged in
        document.getElementById("loginSection").classList.remove("hidden");
    }
});

loginBtn.addEventListener('click', async () => {
    const emailField = document.getElementById("email") as HTMLInputElement;
    const passwordField = document.getElementById("password") as HTMLInputElement;

    try {
        await account.createEmailPasswordSession({ email: emailField?.value, password: passwordField?.value });

        const user = await account.get();

        const memberships = await teams.listMemberships({ teamId: CAPSTONE_TEAMS });

        const isMember = memberships.memberships.some((member: Models.Membership) => member.userId === user.$id && member.confirm);

        if (!isMember) {
            await account.deleteSession({ sessionId: 'current' });
            Toast.error("Access denied. The system detected that the currrent user is not part of the team.");
        }

        showDashboard();
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
    }
});

const refreshBtn = document.getElementById("refreshBtn");

refreshBtn?.addEventListener("click", async () => {
  try {
    await fetchGameInfo();
  } catch (error) {
    console.error("Error refreshing data:", error);
  }
});

// function for fetching data
async function fetchGameInfo() {
    try {
        const result = await tablesDB.listRows({ databaseId: DATABASEID, tableId: TBL_GAME_SESSIONS, queries: [ Query.limit(100) ] });

        const records = result.rows;

        const totalPlayers = records.length;

        let totalScoreSum = 0;
        let totalTimeSum = 0;
        let completedCount = 0;

        records.forEach((record: any) => {
        totalScoreSum += record.totalScore ?? 0;
        totalTimeSum += record.timeSpent ?? 0;

        if (record.completedAt) {
            completedCount++;
        }
        });

        const avgScore = totalPlayers ? (totalScoreSum / totalPlayers) / 12 : 0;

        const avgTime = totalPlayers ? (totalTimeSum / totalPlayers) / 60 : 0;

        document.getElementById("totalPlayers")!.textContent = totalPlayers.toString();

        document.getElementById("avgScore")!.textContent = `${Math.round(avgScore)} pts`;

        document.getElementById("avgTime")!.textContent = formatTime(avgTime) <= 1 ? `${formatTime(avgTime)} minute` : `${formatTime(avgTime)} minutes`;

        document.getElementById("completedCount")!.textContent = completedCount.toString();

        renderTable(records);
    } catch (error) {
        console.error(`Error fetching game info: ${error}`);
    }
}

const fetchBtn = document.getElementById("refreshBtn2") as HTMLButtonElement;

fetchBtn?.addEventListener('click', async () => {
    try {
        await fetchLevelInfo();
    } catch (error) {
        console.error(`Error fetching data ${error}:`)
    }
});

async function fetchLevelInfo() {
    const tableBody = document.getElementById("playerTable2");
    tableBody.innerHTML = "";

    try {
        const results = await tablesDB.listRows({ databaseId: DATABASEID, tableId: TBL_LEVELS, queries: [Query.limit(100)] });

        const records = results.rows;

        records.forEach((record) => {
            tableBody.innerHTML += `
                <tr class="border-b">
                    <td class="py-2">${record.playerId || '-'}</td>
                    <td>${record.category || '-'}</td>
                    <td>${record.level ?? '-'}</td>
                    <td>${record.score ?? '-'}</td>
                    <td>${formatDateTime(record.completedAt) ?? "Not Completed"}</td>
                </tr>
            `;
        });
    } catch (error) {
        console.error(error);
        tableBody.innerHTML = "<tr><td colspan='5'>Error fetching data</td></tr>";
    }
}

function renderTable(records: any[]) {
    const tableBody = document.getElementById("playerTable");
    tableBody.innerHTML = "";

    records.forEach((record) => {
        const username = record.username;
        const score = record.totalScore;
        const timeSpent = formatTime(record.timeSpent);
        const completedAt = record.completedAt;

        tableBody.innerHTML += `
            <tr class="border-b">
                <td class="py-2">${username ?? "-"}</td>
                <td>${score ?? 0}</td>
                <td>${timeSpent <= 1 ? timeSpent + ' minute' : timeSpent + ' minutes'}</td>
                <td>${formatDateTime(completedAt) ?? "Not Completed"}</td>
            </tr>
        `;
    });
}

function showDashboard() {
    document.getElementById("loginSection")!.classList.add("hidden");
    document.getElementById("dashboard")!.classList.remove("hidden");
}

function formatDateTime(isoString: string) {
  const date = new Date(isoString);

  return date.toLocaleString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function formatTime(secs: number) {
    const average = secs / 60;
    const rounded = Math.round(Math.ceil(average));

    return rounded;
}

const logoutBtn = document.getElementById("logoutBtn") as HTMLButtonElement;

logoutBtn.addEventListener('click', async () => {
    logout();
    document.getElementById("loginSection").classList.remove("hidden");
});