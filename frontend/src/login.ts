import "./style.css";

export const showLogin = () => {

  const app = document.querySelector<HTMLDivElement>("#app");

  if (!app) return;


  // =====================================
  // LOGIN SCREEN
  // =====================================

  app.innerHTML = `
    <div class="login-page">

      <div class="login-card">

        <div class="login-logo">
          <span class="logo-icon">Q</span>
          <span>QuietFit</span>
        </div>

        <h1 id="authTitle">
          Welcome back
        </h1>

        <p class="login-subtitle" id="authSubtitle">
          Sign in to continue your fitness journey.
        </p>


        <form id="authForm">

          <div id="nameField" style="display: none;">

            <label for="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your name"
            />

          </div>


          <label for="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
          />


          <label for="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
          />


          <button
            type="submit"
            class="primary-btn login-btn"
            id="authButton"
          >
            Login
          </button>


          <p
            id="authMessage"
            class="login-message"
          ></p>

        </form>


        <p class="auth-switch">

          <span id="switchText">
            Don't have an account?
          </span>

          <button
            type="button"
            id="switchAuth"
            class="text-btn"
          >
            Create Account
          </button>

        </p>

      </div>

    </div>
  `;


  // =====================================
  // ELEMENTS
  // =====================================

  const authForm =
    document.querySelector<HTMLFormElement>(
      "#authForm"
    );

  const nameField =
    document.querySelector<HTMLDivElement>(
      "#nameField"
    );

  const nameInput =
    document.querySelector<HTMLInputElement>(
      "#name"
    );

  const emailInput =
    document.querySelector<HTMLInputElement>(
      "#email"
    );

  const passwordInput =
    document.querySelector<HTMLInputElement>(
      "#password"
    );

  const authButton =
    document.querySelector<HTMLButtonElement>(
      "#authButton"
    );

  const authTitle =
    document.querySelector<HTMLHeadingElement>(
      "#authTitle"
    );

  const authSubtitle =
    document.querySelector<HTMLParagraphElement>(
      "#authSubtitle"
    );

  const authMessage =
    document.querySelector<HTMLParagraphElement>(
      "#authMessage"
    );

  const switchText =
    document.querySelector<HTMLSpanElement>(
      "#switchText"
    );

  const switchAuth =
    document.querySelector<HTMLButtonElement>(
      "#switchAuth"
    );


  // =====================================
  // LOGIN / REGISTER MODE
  // =====================================

  let isRegisterMode = false;


  switchAuth?.addEventListener(
    "click",
    () => {

      isRegisterMode = !isRegisterMode;


      if (isRegisterMode) {

        // REGISTER MODE

        nameField!.style.display = "block";

        nameInput!.required = true;

        authTitle!.textContent =
          "Create your account";

        authSubtitle!.textContent =
          "Start your QuietFit fitness journey.";

        authButton!.textContent =
          "Create Account";

        switchText!.textContent =
          "Already have an account?";

        switchAuth!.textContent =
          "Login";

        authMessage!.textContent = "";


      } else {

        // LOGIN MODE

        nameField!.style.display = "none";

        nameInput!.required = false;

        authTitle!.textContent =
          "Welcome back";

        authSubtitle!.textContent =
          "Sign in to continue your fitness journey.";

        authButton!.textContent =
          "Login";

        switchText!.textContent =
          "Don't have an account?";

        switchAuth!.textContent =
          "Create Account";

        authMessage!.textContent = "";

      }

    }
  );


  // =====================================
  // FORM SUBMIT
  // =====================================

  authForm?.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      const name =
        nameInput?.value.trim();

      const email =
        emailInput?.value.trim();

      const password =
        passwordInput?.value;


      if (!email || !password) {

        authMessage!.textContent =
          "Please enter email and password.";

        return;

      }


      if (
        isRegisterMode &&
        !name
      ) {

        authMessage!.textContent =
          "Please enter your name.";

        return;

      }


      try {

        authButton!.disabled = true;

        authButton!.textContent =
          isRegisterMode
            ? "Creating Account..."
            : "Logging in...";


        // =====================================
        // REGISTER
        // =====================================

        if (isRegisterMode) {

          const registerResponse =
            await fetch(
              "http://localhost:5000/api/users/register",
              {
                method: "POST",

                headers: {
                  "Content-Type": "application/json"
                },

                body: JSON.stringify({
                  name,
                  email,
                  password,
                  role: "member"
                })
              }
            );


          const registerData =
            await registerResponse.json();


          if (!registerResponse.ok) {

            authMessage!.textContent =
              registerData.message ||
              "Registration failed.";

            authButton!.disabled = false;

            authButton!.textContent =
              "Create Account";

            return;

          }


          // If registration returns a token,
          // save it immediately.

          if (registerData.token) {

            localStorage.setItem(
              "quietfit_token",
              registerData.token
            );

          }


          if (registerData.user) {

            localStorage.setItem(
              "quietfit_user",
              JSON.stringify(
                registerData.user
              )
            );

          }


          // If registration doesn't return
          // a token, automatically login.

          if (!registerData.token) {

            const loginResponse =
              await fetch(
                "http://localhost:5000/api/users/login",
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json"
                  },

                  body: JSON.stringify({
                    email,
                    password
                  })
                }
              );


            const loginData =
              await loginResponse.json();


            if (!loginResponse.ok) {

              authMessage!.textContent =
                "Account created. Please login.";

              isRegisterMode = false;

              switchAuth!.click();

              authButton!.disabled = false;

              return;

            }


            localStorage.setItem(
              "quietfit_token",
              loginData.token
            );


            localStorage.setItem(
              "quietfit_user",
              JSON.stringify(
                loginData.user
              )
            );

          }


          authMessage!.textContent =
            "Account created successfully!";


          setTimeout(() => {

            window.location.reload();

          }, 500);


          return;

        }


        // =====================================
        // LOGIN
        // =====================================

        const response =
          await fetch(
            "http://localhost:5000/api/users/login",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body: JSON.stringify({
                email,
                password
              })
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          authMessage!.textContent =
            data.message ||
            "Invalid email or password.";

          authButton!.disabled = false;

          authButton!.textContent =
            "Login";

          return;

        }


        // Save JWT

        localStorage.setItem(
          "quietfit_token",
          data.token
        );


        // Save user

        localStorage.setItem(
          "quietfit_user",
          JSON.stringify(
            data.user
          )
        );


        console.log(
          "QuietFit Login:",
          data
        );


        authMessage!.textContent =
          "Login successful!";


        setTimeout(() => {

          window.location.reload();

        }, 500);


      } catch (error) {

        console.error(
          "Authentication error:",
          error
        );


        authMessage!.textContent =
          "Unable to connect to server.";


        authButton!.disabled = false;

        authButton!.textContent =
          isRegisterMode
            ? "Create Account"
            : "Login";

      }

    }
  );

};