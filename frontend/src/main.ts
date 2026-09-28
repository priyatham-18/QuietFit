import "./style.css";
import { showLogin } from "./login";

const token = localStorage.getItem("quietfit_token");

if (!token) {
  showLogin();
} else {
  const user = JSON.parse(
    localStorage.getItem("quietfit_user") || "{}"
  );

  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <div class="app">

      <!-- SIDEBAR -->

      <aside class="sidebar">

        <div class="brand">
          <div class="brand-mark">Q</div>
          <span>QuietFit</span>
        </div>

        <div class="sidebar-section">

          <small>MAIN MENU</small>

          <a href="#dashboard" class="side-link active">
            <span>⌂</span>
            Dashboard
          </a>

          <a href="#workouts" class="side-link">
            <span>◈</span>
            Workouts
          </a>

          <a href="#progress" class="side-link">
            <span>↗</span>
            Progress
          </a>

          <a href="#nutrition" class="side-link">
            <span>◌</span>
            Nutrition
          </a>

          <a href="#ai-coach" class="side-link">
            <span>🤖</span>
            AI Coach
          </a>

        </div>

        <div class="sidebar-section">

          <small>ACCOUNT</small>

          <a href="#membership" class="side-link">
            <span>◇</span>
            Membership
          </a>

          <a href="#profile" class="side-link">
            <span>○</span>
            Profile
          </a>

        </div>

        <div class="sidebar-bottom">

          <div class="sidebar-tip">

            <span class="tip-icon">✦</span>

            <div>
              <strong>Stay consistent</strong>
              <p>Small progress every day.</p>
            </div>

          </div>

          <button
            id="logoutBtn"
            class="sidebar-logout"
          >
            Logout
          </button>

        </div>

      </aside>

      <!-- MAIN AREA -->

      <div class="main-area">

        <!-- TOPBAR -->

        <header class="topbar">

          <div class="mobile-brand">
            <div class="brand-mark">Q</div>
            QuietFit
          </div>

          <div class="topbar-search">
            <span>⌕</span>

            <input
              id="globalSearch"
              type="text"
              placeholder="Search workouts, exercises..."
            />
          </div>

          <div class="topbar-right">

            <button class="notification-btn">
              ♧
              <span></span>
            </button>

            <div class="profile-mini">

              <div class="profile-avatar">
                ${(user.name || "Q")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <strong>
                  ${user.name || "Member"}
                </strong>

                <small>
                  Member
                </small>

              </div>

            </div>

          </div>

        </header>

        <main>

          <!-- DASHBOARD -->

          <section
            class="dashboard-header"
            id="dashboard"
          >

            <div>

              <p class="date-label">
                SUNDAY, AUGUST 30
              </p>

              <h1>
                Good evening,
                <span>
                  ${user.name || "Priyatham"}.
                </span>
              </h1>

              <p class="dashboard-subtitle">
                Here's your fitness overview for today.
              </p>

            </div>

            <button
              class="primary-action"
              id="startWorkoutBtn"
            >
              + Start Workout
            </button>

          </section>

          <!-- STATS -->

          <section class="dashboard-stats">

            <div class="metric-card">

              <div class="metric-top">
                <span>BODY WEIGHT</span>
                <div class="metric-icon">↕</div>
              </div>

              <strong id="weightMetric">
                70.0
              </strong>

              <div class="metric-bottom">
                <span>kg</span>
                <em>Current</em>
              </div>

            </div>

            <div class="metric-card">

              <div class="metric-top">
                <span>BMI</span>
                <div class="metric-icon">◇</div>
              </div>

              <strong id="bmiMetric">
                22.5
              </strong>

              <div class="metric-bottom">
                <span>Healthy range</span>
                <em>Good</em>
              </div>

            </div>

            <div class="metric-card">

              <div class="metric-top">
                <span>BODY FAT</span>
                <div class="metric-icon">◒</div>
              </div>

              <strong id="fatMetric">
                18.5
              </strong>

              <div class="metric-bottom">
                <span>%</span>
                <em>Current</em>
              </div>

            </div>

            <div class="metric-card dark-metric">

              <div class="metric-top">
                <span>WORKOUT SCORE</span>

                <div class="metric-icon dark-icon">
                  ★
                </div>
              </div>

              <strong id="scoreMetric">
                85
              </strong>

              <div class="metric-bottom">
                <span>/ 100</span>
                <em>Excellent</em>
              </div>

            </div>

          </section>

          <!-- DASHBOARD PANELS -->

          <section class="dashboard-grid">

            <!-- PROGRESS -->

            <div class="dashboard-panel progress-panel">

              <div class="panel-header">

                <div>

                  <span class="panel-label">
                    PERFORMANCE
                  </span>

                  <h2>
                    Your progress
                  </h2>

                </div>

                <button
                  class="panel-link"
                  id="progressBtn"
                >
                  View all →
                </button>

              </div>

              <div class="chart-area">

                <div class="chart-y">
                  <span>75</span>
                  <span>72</span>
                  <span>69</span>
                  <span>66</span>
                </div>

                <div class="fake-chart">

                  <div class="chart-line">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                </div>

              </div>

              <div class="chart-footer">
                <span>JUL 01</span>
                <span>JUL 15</span>
                <span>AUG 01</span>
                <span>AUG 15</span>
                <span>AUG 30</span>
              </div>

            </div>

            <!-- GYM -->

            <div class="dashboard-panel gym-panel">

              <div class="panel-header">

                <div>

                  <span class="panel-label">
                    LIVE GYM
                  </span>

                  <h2>
                    Right now
                  </h2>

                </div>

                <div class="live-indicator">
                  <span></span>
                  LIVE
                </div>

              </div>

              <div class="gym-main">

                <div class="gym-ring">

                  <div>

                    <strong id="occupancy">
                      --%
                    </strong>

                    <span>
                      occupied
                    </span>

                  </div>

                </div>

                <div class="gym-info">

                  <div>

                    <strong id="crowdNumber">
                      --
                    </strong>

                    <span>
                      training now
                    </span>

                  </div>

                  <div>

                    <strong id="availableSpots">
                      --
                    </strong>

                    <span>
                      spots available
                    </span>

                  </div>

                </div>

              </div>

              <div
                class="gym-status"
                id="gymStatus"
              >
                Checking status...
              </div>

              <button
                class="gym-refresh"
                id="refreshGym"
              >
                Refresh live status ↻
              </button>

            </div>

          </section>

          <!-- PROGRESS ANALYTICS -->

          <section
            class="progress-analytics-section"
            id="progress"
          >

            <div class="progress-heading">

              <div>

                <span class="panel-label">
                  FITNESS ANALYTICS
                </span>

                <h2>
                  Your progress,
                  <span>measured.</span>
                </h2>

                <p>
                  Track how your body and performance
                  are changing over time.
                </p>

              </div>

              <div class="progress-date">
                LAST UPDATED
                <strong id="progressLastUpdated">
                  --
                </strong>
              </div>

            </div>

            <div
              class="progress-metrics"
              id="progressMetrics"
            >

              <div class="progress-metric-card">

                <div class="progress-metric-icon">↕</div>

                <span>WEIGHT</span>

                <strong id="progressWeight">--</strong>

                <small>kg</small>

                <em id="weightChange">--</em>

              </div>

              <div class="progress-metric-card">

                <div class="progress-metric-icon">◒</div>

                <span>BODY FAT</span>

                <strong id="progressBodyFat">--</strong>

                <small>%</small>

                <em id="bodyFatChange">--</em>

              </div>

              <div class="progress-metric-card">

                <div class="progress-metric-icon">◇</div>

                <span>BMI</span>

                <strong id="progressBMI">--</strong>

                <small>index</small>

                <em id="bmiChange">--</em>

              </div>

              <div class="progress-metric-card dark-progress-card">

                <div class="progress-metric-icon">★</div>

                <span>WORKOUT SCORE</span>

                <strong id="progressScore">--</strong>

                <small>/ 100</small>

                <em>Performance</em>

              </div>

            </div>

            <div class="progress-lower-grid">

              <div class="progress-history-card">

                <div class="progress-card-heading">

                  <div>

                    <span class="panel-label">
                      MEASUREMENTS
                    </span>

                    <h3>
                      Body changes
                    </h3>

                  </div>

                  <span class="measurement-period">
                    LATEST
                  </span>

                </div>

                <div class="measurement-list">

                  <div class="measurement-row">

                    <div class="measurement-name">

                      <span>W</span>

                      <div>
                        <strong>Waist</strong>
                        <small>
                          Abdominal measurement
                        </small>
                      </div>

                    </div>

                    <strong id="progressWaist">
                      --
                    </strong>

                    <span>cm</span>

                  </div>

                  <div class="measurement-row">

                    <div class="measurement-name">

                      <span>C</span>

                      <div>
                        <strong>Chest</strong>
                        <small>
                          Upper body measurement
                        </small>
                      </div>

                    </div>

                    <strong id="progressChest">
                      --
                    </strong>

                    <span>cm</span>

                  </div>

                  <div class="measurement-row">

                    <div class="measurement-name">

                      <span>B</span>

                      <div>
                        <strong>BMI</strong>
                        <small>
                          Body mass index
                        </small>
                      </div>

                    </div>

                    <strong id="progressBMISecondary">
                      --
                    </strong>

                    <span>index</span>

                  </div>

                </div>

              </div>

              <div class="progress-history-card">

                <div class="progress-card-heading">

                  <div>

                    <span class="panel-label">
                      HISTORY
                    </span>

                    <h3>
                      Recent check-ins
                    </h3>

                  </div>

                  <span
                    id="progressRecordCount"
                    class="measurement-period"
                  >
                    0 RECORDS
                  </span>

                </div>

                <div
                  id="progressHistory"
                  class="progress-history-list"
                >

                  <div class="progress-loading">
                    Loading your progress...
                  </div>

                </div>

              </div>

            </div>

          </section>

          <!-- WORKOUTS -->

          <section
            class="workouts-section"
            id="workouts"
          >

            <div class="workouts-hero">

              <div>

                <span class="panel-label">
                  TRAINING LIBRARY
                </span>

                <h2>
                  Find your next workout.
                </h2>

                <p>
                  Train according to your goal,
                  level and available time.
                </p>

              </div>

              <div class="workout-count">

                <strong id="workoutCount">
                  0
                </strong>

                <span>
                  workouts
                </span>

              </div>

            </div>

            <!-- SEARCH + FILTERS -->

            <div class="workout-toolbar">

              <div class="workout-search">

                <span>⌕</span>

                <input
                  id="workoutSearch"
                  type="text"
                  placeholder="Search workouts, muscles, difficulty..."
                />

              </div>

              <div class="workout-filters">

                <button
                  class="filter-btn active"
                  data-filter="all"
                >
                  All
                </button>

                <button
                  class="filter-btn"
                  data-filter="beginner"
                >
                  Beginner
                </button>

                <button
                  class="filter-btn"
                  data-filter="intermediate"
                >
                  Intermediate
                </button>

                <button
                  class="filter-btn"
                  data-filter="advanced"
                >
                  Advanced
                </button>

              </div>

            </div>

            <!-- WORKOUT CARDS -->

            <div
              id="workoutList"
              class="premium-workout-grid"
            >

              <div class="workout-placeholder">

                <div class="placeholder-icon">
                  ◈
                </div>

                <strong>
                  Ready when you are.
                </strong>

                <span>
                  Loading your workout library...
                </span>

              </div>

            </div>

          </section>

          <!-- NUTRITION -->

          <section
            class="nutrition-panel"
            id="nutrition"
          >

            <div class="nutrition-left">

              <span class="panel-label">
                DAILY NUTRITION
              </span>

              <h2>
                Fuel today's
                <em>training.</em>
              </h2>

              <p>
                Stay on top of your nutrition to support
                recovery and performance.
              </p>

              <button
                class="light-action"
                id="dietBtn"
              >
                View nutrition →
              </button>

            </div>

            <div class="nutrition-progress">

              <div class="calorie-ring">

                <div>
                  <strong>1,840</strong>
                  <span>/ 2,400 kcal</span>
                </div>

              </div>

              <div class="macro-list">

                <div class="macro">

                  <div>
                    <span>Protein</span>
                    <strong>142g / 160g</strong>
                  </div>

                  <div class="macro-bar">
                    <i style="width:89%"></i>
                  </div>

                </div>

                <div class="macro">

                  <div>
                    <span>Carbs</span>
                    <strong>218g / 280g</strong>
                  </div>

                  <div class="macro-bar">
                    <i style="width:78%"></i>
                  </div>

                </div>

                <div class="macro">

                  <div>
                    <span>Fats</span>
                    <strong>61g / 75g</strong>
                  </div>

                  <div class="macro-bar">
                    <i style="width:81%"></i>
                  </div>

                </div>

              </div>

            </div>

          </section>

          <!-- MEMBERSHIP -->

          <section
            class="membership-card"
            id="membership"
          >

            <div>

              <span class="panel-label">
                YOUR MEMBERSHIP
              </span>

              <h2>
                QuietFit
                <span>Member</span>
              </h2>

              <p>
                Your fitness journey, all in one place.
              </p>

            </div>

            <div class="membership-right">

              <div>
                <small>STATUS</small>
                <strong>ACTIVE</strong>
              </div>

              <div>
                <small>PLAN</small>
                <strong>FITNESS</strong>
              </div>

              <button class="light-action">
                Manage →
              </button>

            </div>

          </section>

          <!-- PROFILE -->

          <section
            class="profile-section"
            id="profile"
          >

            <div>

              <span class="panel-label">
                PROFILE
              </span>

              <h2>
                Your fitness identity
              </h2>

            </div>

            <div class="profile-card">

              <div class="large-avatar">
                ${(user.name || "Q")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              <div>

                <h3>
                  ${user.name || "Member"}
                </h3>

                <p>
                  ${user.email || ""}
                </p>

              </div>

              <span class="member-badge">
                MEMBER
              </span>

            </div>

          </section>

        </main>

        <!-- FOOTER -->

        <footer>

          <div class="brand">

            <div class="brand-mark">
              Q
            </div>

            <span>
              QuietFit
            </span>

          </div>

          <span>
            Train smarter. Live better.
          </span>

        </footer>

      </div>

      <!-- WORKOUT MODAL -->

      <div
        id="workoutModal"
        class="workout-modal"
      >

        <div class="workout-modal-overlay"></div>

        <div class="workout-modal-card">

          <button
            id="closeWorkoutModal"
            class="modal-close"
          >
            ×
          </button>

          <div
            id="modalWorkoutContent"
          ></div>

        </div>

      </div>

    </div>
  `;

  // =========================================
  // LOGOUT
  // =========================================

  document
    .querySelector("#logoutBtn")
    ?.addEventListener("click", () => {

      localStorage.removeItem("quietfit_token");
      localStorage.removeItem("quietfit_user");

      window.location.reload();

    });

  // =========================================
  // AVAILABILITY
  // =========================================

  const loadAvailability = async () => {

    try {

      const response = await fetch(
        "http://localhost:5000/api/availability"
      );

      const data = await response.json();

      const crowdNumber =
        document.querySelector("#crowdNumber");

      const availableSpots =
        document.querySelector("#availableSpots");

      const occupancy =
        document.querySelector("#occupancy");

      const gymStatus =
        document.querySelector("#gymStatus");

      if (crowdNumber) {
        crowdNumber.textContent =
          String(data.currentOccupancy ?? "--");
      }

      if (availableSpots) {
        availableSpots.textContent =
          String(data.availableSpots ?? "--");
      }

      if (occupancy) {
        occupancy.textContent =
          `${data.occupancyPercentage ?? 0}%`;
      }

      if (gymStatus) {
        gymStatus.textContent =
          String(
            data.status || "Unavailable"
          ).toUpperCase();
      }

    } catch (error) {

      console.error(
        "Availability error:",
        error
      );

      const gymStatus =
        document.querySelector("#gymStatus");

      if (gymStatus) {
        gymStatus.textContent =
          "UNAVAILABLE";
      }

    }

  };

  loadAvailability();

  document
    .querySelector("#refreshGym")
    ?.addEventListener(
      "click",
      loadAvailability
    );

  // =========================================
  // PROGRESS
  // =========================================

  const loadProgress = async () => {

    try {

      const currentToken =
        localStorage.getItem("quietfit_token");

      const response = await fetch(
        "http://localhost:5000/api/progress",
        {
          headers: {
            Authorization:
              `Bearer ${currentToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error(
          `Progress request failed: ${response.status}`
        );
      }

      const data =
        await response.json();

      const records =
        Array.isArray(data.progress)
          ? data.progress
          : [];

      const history =
        document.querySelector("#progressHistory");

      const recordCount =
        document.querySelector(
          "#progressRecordCount"
        );

      if (recordCount) {

        recordCount.textContent =
          `${records.length} RECORD${
            records.length === 1 ? "" : "S"
          }`;

      }

      if (records.length === 0) {

        if (history) {

          history.innerHTML = `
            <div class="progress-empty">

              <div>◌</div>

              <strong>
                No progress records yet
              </strong>

              <span>
                Your measurements will appear here.
              </span>

            </div>
          `;

        }

        return;
      }

      const latest =
        records[0];

      const previous =
        records[1] || null;

      const weight =
        Number(latest.weight);

      const bodyFat =
        Number(latest.body_fat);

      const bmi =
        Number(latest.bmi);

      const waist =
        Number(latest.waist_cm);

      const chest =
        Number(latest.chest_cm);

      const score =
        Number(latest.workout_score);

      const progressWeight =
        document.querySelector("#progressWeight");

      const progressBodyFat =
        document.querySelector("#progressBodyFat");

      const progressBMI =
        document.querySelector("#progressBMI");

      const progressBMISecondary =
        document.querySelector(
          "#progressBMISecondary"
        );

      const progressWaist =
        document.querySelector("#progressWaist");

      const progressChest =
        document.querySelector("#progressChest");

      const progressScore =
        document.querySelector("#progressScore");

      if (progressWeight) {
        progressWeight.textContent =
          weight.toFixed(1);
      }

      if (progressBodyFat) {
        progressBodyFat.textContent =
          bodyFat.toFixed(1);
      }

      if (progressBMI) {
        progressBMI.textContent =
          bmi.toFixed(1);
      }

      if (progressBMISecondary) {
        progressBMISecondary.textContent =
          bmi.toFixed(1);
      }

      if (progressWaist) {
        progressWaist.textContent =
          waist.toFixed(1);
      }

      if (progressChest) {
        progressChest.textContent =
          chest.toFixed(1);
      }

      if (progressScore) {
        progressScore.textContent =
          Math.round(score).toString();
      }

      const updated =
        new Date(latest.recorded_at);

      const progressLastUpdated =
        document.querySelector(
          "#progressLastUpdated"
        );

      if (progressLastUpdated) {

        progressLastUpdated.textContent =
          updated.toLocaleDateString(
            "en-IN",
            {
              day: "2-digit",
              month: "short",
              year: "numeric"
            }
          );

      }

      const change = (
        current: number,
        old: number | null
      ) => {

        if (old === null) {
          return "First record";
        }

        const difference =
          current - old;

        if (difference === 0) {
          return "No change";
        }

        const sign =
          difference > 0 ? "+" : "";

        return `${sign}${difference.toFixed(1)}`;

      };

      if (previous) {

        const weightChange =
          document.querySelector("#weightChange");

        const bodyFatChange =
          document.querySelector("#bodyFatChange");

        const bmiChange =
          document.querySelector("#bmiChange");

        if (weightChange) {
          weightChange.textContent =
            `${change(
              weight,
              Number(previous.weight)
            )} kg`;
        }

        if (bodyFatChange) {
          bodyFatChange.textContent =
            `${change(
              bodyFat,
              Number(previous.body_fat)
            )}%`;
        }

        if (bmiChange) {
          bmiChange.textContent =
            change(
              bmi,
              Number(previous.bmi)
            );
        }

      } else {

        const weightChange =
          document.querySelector("#weightChange");

        const bodyFatChange =
          document.querySelector("#bodyFatChange");

        const bmiChange =
          document.querySelector("#bmiChange");

        if (weightChange) {
          weightChange.textContent =
            "First record";
        }

        if (bodyFatChange) {
          bodyFatChange.textContent =
            "First record";
        }

        if (bmiChange) {
          bmiChange.textContent =
            "First record";
        }

      }

      if (history) {

        history.innerHTML =
          records
            .slice(0, 5)
            .map(
              (record: any) => {

                const date =
                  new Date(
                    record.recorded_at
                  );

                return `
                  <div class="progress-history-row">

                    <div class="history-date">

                      <strong>
                        ${date.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit"
                          }
                        )}
                      </strong>

                      <span>
                        ${date.toLocaleDateString(
                          "en-IN",
                          {
                            month: "short"
                          }
                        )}
                      </span>

                    </div>

                    <div class="history-main">

                      <strong>
                        ${Number(
                          record.weight
                        ).toFixed(1)} kg
                      </strong>

                      <span>
                        BMI ${Number(
                          record.bmi
                        ).toFixed(1)}
                        ·
                        ${Number(
                          record.body_fat
                        ).toFixed(1)}% body fat
                      </span>

                    </div>

                    <div class="history-score">

                      <strong>
                        ${Math.round(
                          Number(
                            record.workout_score
                          )
                        )}
                      </strong>

                      <span>
                        SCORE
                      </span>

                    </div>

                  </div>
                `;

              }
            )
            .join("");

      }

    } catch (error) {

      console.error(
        "Progress error:",
        error
      );

      const history =
        document.querySelector(
          "#progressHistory"
        );

      if (history) {

        history.innerHTML = `
          <div class="progress-empty">

            <div>!</div>

            <strong>
              Couldn't load progress
            </strong>

            <span>
              Make sure your backend is running.
            </span>

          </div>
        `;

      }

    }

  };

  loadProgress();

  document
    .querySelector("#progressBtn")
    ?.addEventListener(
      "click",
      () => {

        document
          .querySelector("#progress")
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  // =========================================
  // WORKOUT DATA
  // =========================================

  let allWorkouts: any[] = [];

  let activeFilter = "all";

  const getDifficulty = (
    workout: any
  ) => {

    return String(
      workout.difficulty ||
      "Intermediate"
    ).toLowerCase();

  };

  const getMuscleGroup = (
    workout: any
  ) => {

    const name =
      String(
        workout.name || ""
      ).toLowerCase();

    const description =
      String(
        workout.description || ""
      ).toLowerCase();

    const combined =
      `${name} ${description}`;

    if (
      combined.includes("chest") ||
      combined.includes("push") ||
      combined.includes("bench")
    ) {
      return "Chest";
    }

    if (
      combined.includes("back") ||
      combined.includes("pull") ||
      combined.includes("row") ||
      combined.includes("lat")
    ) {
      return "Back";
    }

    if (
      combined.includes("leg") ||
      combined.includes("squat") ||
      combined.includes("quad") ||
      combined.includes("hamstring")
    ) {
      return "Legs";
    }

    if (
      combined.includes("shoulder") ||
      combined.includes("deltoid") ||
      combined.includes("delt")
    ) {
      return "Shoulders";
    }

    if (
      combined.includes("bicep") ||
      combined.includes("tricep") ||
      combined.includes("arm")
    ) {
      return "Arms";
    }

    if (
      combined.includes("core") ||
      combined.includes("abs") ||
      combined.includes("abdominal")
    ) {
      return "Core";
    }

    return "Full Body";

  };

  const getWorkoutIcon = (
    workout: any
  ) => {

    const muscle =
      getMuscleGroup(workout);

    const icons: Record<
      string,
      string
    > = {
      Chest: "◈",
      Back: "◇",
      Legs: "△",
      Shoulders: "✦",
      Arms: "○",
      Core: "◌",
      "Full Body": "✧"
    };

    return (
      icons[muscle] ||
      icons["Full Body"]
    );

  };

  // =========================================
  // RENDER WORKOUTS
  // =========================================

  const renderWorkouts = () => {

    const list =
      document.querySelector<HTMLDivElement>(
        "#workoutList"
      );

    const count =
      document.querySelector(
        "#workoutCount"
      );

    if (!list) {
      return;
    }

    const search =
      (
        document.querySelector<HTMLInputElement>(
          "#workoutSearch"
        )?.value || ""
      )
        .toLowerCase()
        .trim();

    const filtered =
      allWorkouts.filter(
        (workout) => {

          const name =
            String(
              workout.name || ""
            ).toLowerCase();

          const description =
            String(
              workout.description || ""
            ).toLowerCase();

          const difficulty =
            getDifficulty(workout);

          const muscle =
            getMuscleGroup(workout)
              .toLowerCase();

          const duration =
            String(
              workout.duration_minutes ||
              workout.duration ||
              ""
            ).toLowerCase();

          const calories =
            String(
              workout.calories_burned ||
              workout.calories ||
              ""
            ).toLowerCase();

          /*
           * Search now checks:
           * - name
           * - description
           * - muscle group
           * - difficulty
           * - duration
           * - calories
           */

          const matchesSearch =
            !search ||
            name.includes(search) ||
            description.includes(search) ||
            muscle.includes(search) ||
            difficulty.includes(search) ||
            duration.includes(search) ||
            calories.includes(search);

          const matchesFilter =
            activeFilter === "all" ||
            difficulty === activeFilter;

          return (
            matchesSearch &&
            matchesFilter
          );

        }
      );

    if (count) {

      count.textContent =
        String(filtered.length);

    }

    if (filtered.length === 0) {

      list.innerHTML = `

        <div class="workout-empty">

          <div>
            ⌕
          </div>

          <h3>
            No workouts found
          </h3>

          <p>
            Try another search or filter.
          </p>

        </div>

      `;

      return;

    }

    list.innerHTML =
      filtered
        .map(
          (
            workout: any
          ) => {

            const difficulty =
              String(
                workout.difficulty ||
                "Intermediate"
              );

            const muscle =
              getMuscleGroup(
                workout
              );

            const duration =
              workout.duration_minutes ||
              workout.duration ||
              45;

            const calories =
              workout.calories_burned ||
              workout.calories ||
              300;

            const workoutIndex =
              allWorkouts.indexOf(
                workout
              );

            return `

              <article
                class="premium-workout-card"
                data-workout-index="${workoutIndex}"
              >

                <div
                  class="workout-visual visual-${workoutIndex % 4}"
                >

                  <span class="workout-big-icon">
                    ${getWorkoutIcon(
                      workout
                    )}
                  </span>

                  <span class="workout-level">
                    ${difficulty}
                  </span>

                </div>

                <div class="premium-workout-content">

                  <div class="workout-card-top">

                    <span>
                      ${muscle}
                    </span>

                    <span>
                      ${duration} MIN
                    </span>

                  </div>

                  <h3>
                    ${workout.name}
                  </h3>

                  <p>
                    ${
                      workout.description ||
                      "A focused training session designed to improve strength, fitness and performance."
                    }
                  </p>

                  <div class="workout-details">

                    <div>

                      <span>
                        TIME
                      </span>

                      <strong>
                        ${duration} min
                      </strong>

                    </div>

                    <div>

                      <span>
                        CALORIES
                      </span>

                      <strong>
                        ${calories} kcal
                      </strong>

                    </div>

                    <div>

                      <span>
                        LEVEL
                      </span>

                      <strong>
                        ${difficulty}
                      </strong>

                    </div>

                  </div>

                  <button
                    class="workout-start-btn"
                    data-workout-index="${workoutIndex}"
                  >
                    View Workout
                    <span>→</span>
                  </button>

                </div>

              </article>

            `;

          }
        )
        .join("");

    document
      .querySelectorAll(
        ".workout-start-btn"
      )
      .forEach(
        (button) => {

          button.addEventListener(
            "click",
            () => {

              const index =
                Number(
                  (
                    button as HTMLElement
                  ).dataset.workoutIndex
                );

              if (
                !Number.isNaN(index) &&
                allWorkouts[index]
              ) {

                openWorkout(
                  allWorkouts[index]
                );

              }

            }
          );

        }
      );

  };

  // =========================================
  // LOAD WORKOUTS
  // =========================================

  const loadWorkouts = async () => {

    const list =
      document.querySelector<HTMLDivElement>(
        "#workoutList"
      );

    if (!list) {
      return;
    }

    list.innerHTML = `

      <div class="workout-loading">

        <div class="loading-spinner"></div>

        <span>
          Loading workout library...
        </span>

      </div>

    `;

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/workouts"
        );

      if (!response.ok) {
        throw new Error(
          `Workout request failed: ${response.status}`
        );
      }

      const data =
        await response.json();

      if (
        Array.isArray(data)
      ) {

        allWorkouts =
          data;

      } else if (
        Array.isArray(
          data.workouts
        )
      ) {

        allWorkouts =
          data.workouts;

      } else {

        allWorkouts = [];

      }

      renderWorkouts();

    } catch (error) {

      console.error(
        "Workout loading error:",
        error
      );

      list.innerHTML = `

        <div class="workout-empty">

          <div>
            !
          </div>

          <h3>
            Couldn't load workouts
          </h3>

          <p>
            Make sure your backend is running.
          </p>

        </div>

      `;

    }

  };

  // =========================================
  // WORKOUT FILTERS
  // =========================================

  document
    .querySelectorAll(
      ".filter-btn"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            document
              .querySelectorAll(
                ".filter-btn"
              )
              .forEach(
                (btn) =>
                  btn.classList.remove(
                    "active"
                  )
              );

            button.classList.add(
              "active"
            );

            activeFilter =
              String(
                (
                  button as HTMLElement
                ).dataset.filter ||
                "all"
              );

            renderWorkouts();

          }
        );

      }
    );

  // =========================================
  // WORKOUT SEARCH
  // =========================================

  document
    .querySelector(
      "#workoutSearch"
    )
    ?.addEventListener(
      "input",
      renderWorkouts
    );

  // =========================================
  // GLOBAL SEARCH
  // =========================================

  document
    .querySelector(
      "#globalSearch"
    )
    ?.addEventListener(
      "input",
      (event) => {

        const value =
          (
            event.target as HTMLInputElement
          ).value;

        const workoutSearch =
          document.querySelector<HTMLInputElement>(
            "#workoutSearch"
          );

        if (workoutSearch) {

          workoutSearch.value =
            value;

          renderWorkouts();

          if (value.trim()) {

            document
              .querySelector(
                "#workouts"
              )
              ?.scrollIntoView({
                behavior: "smooth"
              });

          }

        }

      }
    );

  // =========================================
  // WORKOUT MODAL
  // =========================================

  const openWorkout = (
    workout: any
  ) => {

    const modal =
      document.querySelector(
        "#workoutModal"
      );

    const content =
      document.querySelector<HTMLDivElement>(
        "#modalWorkoutContent"
      );

    if (!modal || !content) {
      return;
    }

    const difficulty =
      workout.difficulty ||
      "Intermediate";

    const duration =
      workout.duration_minutes ||
      workout.duration ||
      45;

    const calories =
      workout.calories_burned ||
      workout.calories ||
      300;

    const muscle =
      getMuscleGroup(
        workout
      );

    content.innerHTML = `

      <div class="modal-workout-hero">

        <div class="modal-workout-icon">
          ${getWorkoutIcon(
            workout
          )}
        </div>

        <div>

          <span class="modal-eyebrow">
            ${muscle.toUpperCase()}
          </span>

          <h2>
            ${workout.name}
          </h2>

          <p>
            ${
              workout.description ||
              "A focused training session built to help you become stronger and more consistent."
            }
          </p>

        </div>

      </div>

      <div class="modal-workout-stats">

        <div>

          <span>
            DIFFICULTY
          </span>

          <strong>
            ${difficulty}
          </strong>

        </div>

        <div>

          <span>
            DURATION
          </span>

          <strong>
            ${duration} min
          </strong>

        </div>

        <div>

          <span>
            CALORIES
          </span>

          <strong>
            ${calories} kcal
          </strong>

        </div>

      </div>

      <div class="exercise-section">

        <div class="exercise-heading">

          <div>

            <span class="panel-label">
              SESSION
            </span>

            <h3>
              Today's workout
            </h3>

          </div>

          <span>
            ${duration} MIN
          </span>

        </div>

        <div class="exercise-list">

          <div class="exercise-row">

            <span>
              01
            </span>

            <div>

              <strong>
                Warm-up
              </strong>

              <small>
                5 minutes
              </small>

            </div>

            <b>
              05:00
            </b>

          </div>

          <div class="exercise-row">

            <span>
              02
            </span>

            <div>

              <strong>
                Main workout
              </strong>

              <small>
                Follow your workout plan
              </small>

            </div>

            <b>
              ${Math.max(
                duration - 10,
                20
              )} MIN
            </b>

          </div>

          <div class="exercise-row">

            <span>
              03
            </span>

            <div>

              <strong>
                Cool down
              </strong>

              <small>
                Recover after training
              </small>

            </div>

            <b>
              05:00
            </b>

          </div>

        </div>

      </div>

      <button
        class="modal-start-btn"
        id="beginWorkout"
      >
        Begin Workout
        <span>→</span>
      </button>

    `;

    modal.classList.add(
      "show"
    );

    document
      .querySelector(
        "#beginWorkout"
      )
      ?.addEventListener(
        "click",
        () => {

          alert(
            `Starting ${workout.name}!`
          );

        }
      );

  };

  // =========================================
  // CLOSE WORKOUT MODAL
  // =========================================

  document
    .querySelector(
      "#closeWorkoutModal"
    )
    ?.addEventListener(
      "click",
      () => {

        document
          .querySelector(
            "#workoutModal"
          )
          ?.classList.remove(
            "show"
          );

      }
    );

  document
    .querySelector(
      ".workout-modal-overlay"
    )
    ?.addEventListener(
      "click",
      () => {

        document
          .querySelector(
            "#workoutModal"
          )
          ?.classList.remove(
            "show"
          );

      }
    );

  // =========================================
  // START WORKOUT
  // =========================================

  document
    .querySelector(
      "#startWorkoutBtn"
    )
    ?.addEventListener(
      "click",
      async () => {

        document
          .querySelector(
            "#workouts"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });

        await loadWorkouts();

      }
    );

  // =========================================
  // NUTRITION
  // =========================================

  document
    .querySelector(
      "#dietBtn"
    )
    ?.addEventListener(
      "click",
      () => {

        document
          .querySelector(
            "#nutrition"
          )
          ?.scrollIntoView({
            behavior: "smooth"
          });

      }
    );

  // =========================================
  // INITIAL WORKOUT LOAD
  // =========================================

  loadWorkouts();
} 