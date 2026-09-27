export default {
  name: 'account-page-component',
  setup() {
    const router = VueRouter.useRouter();
    const authStore = Vue.inject('authStore');
    const createMockAccount = Vue.inject('createMockAccount');
    const loginMockAccount = Vue.inject('loginMockAccount');
    const logoutMockAccount = Vue.inject('logoutMockAccount');

    const selectedTab = Vue.ref('details');

    const signupForm = Vue.ref({
      name: '',
      email: '',
    });

    const loginForm = Vue.ref({
      email: '',
    });

    const statusMessage = Vue.ref('');
    const errorMessage = Vue.ref('');

    const validateSignupForm = () => {
      const name = String(signupForm.value.name || '').trim();
      const email = String(signupForm.value.email || '').trim();

      if (!name || !email) {
        return 'Please enter both your name and email to create an account.';
      }

      if (!email.includes('@')) {
        return 'Please enter a valid email address.';
      }

      return '';
    };

    const validateLoginForm = () => {
      const email = String(loginForm.value.email || '').trim();

      if (!email) {
        return 'Please enter your email to log in.';
      }

      if (!email.includes('@')) {
        return 'Please enter a valid email address.';
      }

      return '';
    };

    const handleSignup = () => {
      const validationError = validateSignupForm();

      if (validationError) {
        errorMessage.value = validationError;
        statusMessage.value = '';
        return;
      }

      const result = createMockAccount(signupForm.value);

      if (!result.ok) {
        errorMessage.value = result.error;
        statusMessage.value = '';
        return;
      }

      errorMessage.value = '';
      statusMessage.value = `Welcome, ${result.account.name}!`;
      signupForm.value = { name: '', email: '' };
      router.push('/');
    };

    const handleLogin = () => {
      const validationError = validateLoginForm();

      if (validationError) {
        errorMessage.value = validationError;
        statusMessage.value = '';
        return;
      }

      const result = loginMockAccount(loginForm.value);

      if (!result.ok) {
        errorMessage.value = result.error;
        statusMessage.value = '';
        return;
      }

      errorMessage.value = '';
      statusMessage.value = `Welcome back, ${result.account.name}!`;
      loginForm.value = { email: '' };
      selectedTab.value = 'details';
      router.push('/account');
    };

    const logoutAccount = () => {
      logoutMockAccount();
      selectedTab.value = 'details';
      router.push('/account');
    };

    return {
      authStore,
      selectedTab,
      signupForm,
      loginForm,
      statusMessage,
      errorMessage,
      handleSignup,
      handleLogin,
      logoutAccount,
    };
  },
  template: /* html */ `
    <div class="container py-4">
      <div v-if="authStore.isLoggedIn" class="row g-4 align-items-start">
        <aside class="col-12 col-lg-3">
          <div class="card border-0 shadow-sm p-3" style="background-color: #F4F3E6; border: 1px solid #142F40 !important;">
            <div class="list-group list-group-flush">
              <button
                type="button"
                class="list-group-item list-group-item-action border-0"
                :class="{ 'active': selectedTab === 'details' }"
                @click="selectedTab = 'details'"
                style="background-color: transparent; color: #142F40;">
                Account details
              </button>
              <button
                type="button"
                class="list-group-item list-group-item-action border-0"
                :class="{ 'active': selectedTab === 'bookmarks' }"
                @click="selectedTab = 'bookmarks'"
                style="background-color: transparent; color: #142F40;">
                Bookmarked articles
              </button>
              <button
                type="button"
                class="list-group-item list-group-item-action border-0 text-danger"
                @click="logoutAccount"
                style="background-color: transparent;">
                Log out
              </button>
            </div>
          </div>
        </aside>

        <main class="col-12 col-lg-9">
          <div v-if="selectedTab === 'details'">
            <h1 class="mb-4">Your account</h1>
            <div class="card border-0 shadow-sm p-4" style="background-color: #F4F3E6; border: 1px solid #142F40 !important;">
              <p class="mb-2"><strong>Name:</strong> {{ authStore.account?.name || 'Unknown' }}</p>
              <p class="mb-0"><strong>Email:</strong> {{ authStore.account?.email || 'No email available' }}</p>
            </div>
          </div>

          <div v-else-if="selectedTab === 'bookmarks'">
            <h1 class="mb-4">Bookmarked articles</h1>
            <div class="card border-0 shadow-sm p-4" style="background-color: #F4F3E6; border: 1px solid #142F40 !important;">
              <p class="mb-0">Saved articles will appear here after you bookmark them.</p>
            </div>
          </div>

          <div v-if="statusMessage" class="alert alert-success mt-3" role="status">
            {{ statusMessage }}
          </div>
        </main>
      </div>

      <div v-else>
        <h1 class="mb-4">Sign in / Sign up</h1>

        <div class="row g-4">
          <div class="col-12 col-md-6">
            <form class="card h-100 border-0 shadow-sm p-3" style="background-color: #F4F3E6; border: 1px solid #142F40 !important;" @submit.prevent="handleLogin">
              <h2 class="h4 mb-3" style="color: #142F40;">Log in</h2>

              <div class="mb-3">
                <label for="login-email" class="form-label fw-bold">Email</label>
                <input id="login-email" v-model="loginForm.email" type="email" class="form-control border-dark" placeholder="Enter your email" />
              </div>

              <button type="submit" class="btn btn-primary">Log in</button>
            </form>
          </div>

          <div class="col-12 col-md-6">
            <form class="card h-100 border-0 shadow-sm p-3" style="background-color: #95A58D; border: 1px solid #142F40 !important;" @submit.prevent="handleSignup">
              <h2 class="h4 mb-3" style="color: #142F40;">Create an account</h2>

              <div class="mb-3">
                <label for="signup-name" class="form-label fw-bold">Name</label>
                <input id="signup-name" v-model="signupForm.name" type="text" class="form-control border-dark" placeholder="Your name" />
              </div>

              <div class="mb-3">
                <label for="signup-email" class="form-label fw-bold">Email</label>
                <input id="signup-email" v-model="signupForm.email" type="email" class="form-control border-dark" placeholder="Your email" />
              </div>

              <button type="submit" class="btn btn-primary">Create account</button>
            </form>
          </div>
        </div>
      </div>

      <div v-if="errorMessage" class="alert alert-danger mt-3" role="alert">
        {{ errorMessage }}
      </div>
    </div>
  `,
};
