import { signup, login } from "../auth/auth-service";
import Toast from "../core/toast";

export function showLoginUI(onSuccess: () => void) {
    let root = document.getElementById('auth-root')!;

    root.innerHTML = `
        <div class="card">
            <div style="text-align:center; margin-bottom: 4px;">
                <div style="font-size: 2.4rem; margin-bottom: 8px; filter: drop-shadow(0 0 12px rgba(120,200,60,0.5));">🌲</div>
                <div class="logo">Steward's Quest</div>
                <div class="tagline">Playw with purpose; your choice shape the world</div>
            </div>
            <div class="tabs">
                <button class="tab-btn active" id="loginBtn">Sign In</button>
                <button class="tab-btn" id="signupBtn">Sign Up</button>
            </div>

            <!-- LOGIN PANEL -->
            <div class="panel active" id="panel-login">
                <div class="field">
                    <label>Email</label>
                    <span class="field-icon">🌿</span>
                    <input type="email" id="email" placeholder="ranger@grove.game" autocomplete="email" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <span class="field-icon">🔒</span>
                    <input type="password" id="password" placeholder="••••••••" autocomplete="current-password" />
                </div>
                <div style="text-align:right; margin-bottom: 18px; margin-top: -6px;">
                    <a href="#" style="font-size:0.75rem; color: #7ab648; text-decoration:none; letter-spacing:0.05em; opacity:0.75; transition: opacity 0.2s;"
                    onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.75'">
                    Forgot password?
                    </a>
                </div>
                <button class="btn-primary" id="handleLogin">
                    Enter the Forest
                </button>
            </div>

            <!-- SIGNUP PANEL -->
            <div class="panel" id="panel-signup">
                <div class="field">
                    <label>Display Name</label>
                    <span class="field-icon">🦌</span>
                    <input type="text" id="username" placeholder="ForestWalker" autocomplete="username" />
                </div>
                <div class="field">
                    <label>Email</label>
                    <span class="field-icon">🌿</span>
                    <input type="email" id="email2" placeholder="ranger@grove.game" autocomplete="email" />
                </div>
                <div class="field">
                    <label>Password</label>
                    <span class="field-icon">🔒</span>
                    <input type="password" id="password2" placeholder="••••••••" autocomplete="new-password" />
                </div>
                <div style="margin-bottom: 18px; margin-top: 2px;">
                    <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
                    <input type="checkbox" style="
                        margin-top: 2px;
                        accent-color: #7ab648;
                        width: 15px; height: 15px;
                        flex-shrink: 0;
                    " />
                    <span style="font-size:0.75rem; color: rgba(200,221,191,0.45); line-height:1.5;">
                        I agree to the <a href="#" style="color:#7ab648; text-decoration:none;">Terms of the Grove</a> and accept the ways of the forest.
                    </span>
                    </label>
                </div>
                <button class="btn-primary" id="handleRegister">
                    Plant Your Trees
                </button>
            </div>
        </div>
    `;

    const loginPanel = document.getElementById('panel-login') as HTMLDivElement;
    const signupPanel = document.getElementById('panel-signup') as HTMLDivElement;

    function switchTab(tab: string) {
      document.querySelectorAll('.tab-btn').forEach((b, i) => {
        b.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'signup' && i === 1));
      });

      loginPanel.classList.toggle('active', tab === 'login');
      signupPanel.classList.toggle('active', tab === 'signup');
    }

    const loginPanelBtn = document.getElementById("loginBtn") as HTMLButtonElement;
    const signupPanelBtn = document.getElementById("signupBtn") as HTMLButtonElement;

    const loginBtn = document.getElementById("handleLogin") as HTMLButtonElement | null;
    const signupBtn = document.getElementById("handleRegister") as HTMLButtonElement | null;

    loginPanelBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab("login");
    });

    signupPanelBtn?.addEventListener("click", (e) => {
        e.preventDefault();
        switchTab("signup");
    });
    
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    loginBtn?.addEventListener('click', async () => {
        try {
            await login(email?.value, password?.value);
            root.innerHTML = "";
            onSuccess();
        } catch (error) {
            Toast.error("Login failed. PLease try again later");
        }
    });

    const username = document.getElementById("username") as HTMLInputElement;
    const email2 = document.getElementById("email2") as HTMLInputElement;
    const password2 = document.getElementById("password2") as HTMLInputElement;

    signupBtn?.addEventListener('click', async () => {
        try {
            await signup(email2?.value, password2?.value, username?.value);
            root.innerHTML = "";
            onSuccess();
        } catch {
            Toast.error("Creating account failed. Please try again later.");
        }
    });
}