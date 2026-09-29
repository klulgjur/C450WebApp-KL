export default {
  name: 'navbar-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const authStore = Vue.inject('authStore');
    const logoutMockAccount = Vue.inject('logoutMockAccount');
    const router = VueRouter.useRouter();

    const submitSearch = () => {
      const query = (itemsStore.searchInput || '').trim();
      itemsStore.searchQuery = query;
      itemsStore.searchInput = query;

      if (!query) {
        router.push({ path: '/items' });
        return;
      }

      router.push({ path: '/search', query: { q: query } });
    };

    const logoutAccount = () => {
      logoutMockAccount();
      router.push('/');
    };

    return {
      authStore,
      itemsStore,
      submitSearch,
      logoutAccount,
    };
  },
  template: /* html */ `
    <div>
      <nav class="navbar sticky-top bg-white border-bottom px-3">
        <span class="navbar-brand mb-0 h1"><i class="bi bi-mouse me-2"></i>Cyber-Toolkit</span>

        <div class="ms-auto d-flex gap-2">
          <router-link class="btn btn-outline-primary btn-sm" to="/">
            <i class="bi bi-house me-1"></i>Home
          </router-link>
          <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
            <i class="bi bi-card-list me-1"></i>Articles
          </router-link>
          <router-link class="btn btn-outline-primary btn-sm" to="/about">
            <i class="bi bi-info-circle me-1"></i>About
          </router-link>
          <router-link class="btn btn-outline-primary btn-sm" to="/bookmarks">
            <i class="bi bi-bookmark me-1"></i>Bookmarked articles
          </router-link>

          <router-link v-if="!authStore.isLoggedIn" class="btn btn-primary btn-sm" to="/account" aria-label="Open sign in and sign up form">
            <i class="bi bi-person-circle me-1"></i>Sign in / Sign up
          </router-link>

          <div v-else class="d-flex gap-2">
            <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/account" aria-label="Open account profile">
              <i class="bi bi-person-fill"></i>
            </router-link>
            <button class="btn btn-outline-danger btn-sm" type="button" @click="logoutAccount">
              <i class="bi bi-box-arrow-right me-1"></i>Log out
            </button>
          </div>
        </div>
      </nav>

      <div class="bg-light border-bottom px-3 py-2">
        <div class="container">
          <form class="input-group input-group-sm" @submit.prevent="submitSearch">
            <input
              v-model="itemsStore.searchInput"
              type="text"
              class="form-control search-input"
              placeholder="Search articles"
              aria-label="Search articles" />
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  `,
};
