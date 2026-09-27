export default {
  name: 'navbar-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const authStore = Vue.inject('authStore');
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

    return {
      authStore,
      itemsStore,
      submitSearch,
    };
  },
  template: /* html */ `
    <div>
      <nav class="navbar sticky-top bg-white border-bottom px-3">
        <span class="navbar-brand mb-0 h1"><i class="bi bi-bootstrap-fill me-2"></i>My (very cool) Web App</span>

        <div class="ms-auto d-flex gap-2">
          <router-link class="btn btn-outline-primary btn-sm" to="/">
            <i class="bi bi-house me-1"></i>Home
          </router-link>
          <router-link class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/items">
            <i class="bi bi-card-list me-1"></i>Items
          </router-link>
          <router-link class="btn btn-outline-primary btn-sm" to="/about">
            <i class="bi bi-info-circle me-1"></i>About
          </router-link>

          <router-link v-if="!authStore.isLoggedIn" class="btn btn-primary btn-sm" to="/account" aria-label="Open sign in and sign up form">
            <i class="bi bi-person-circle me-1"></i>Sign in / Sign up
          </router-link>

          <router-link v-else class="btn btn-outline-primary btn-sm d-flex align-items-center" to="/account" aria-label="Open account profile">
            <i class="bi bi-person-fill"></i>
          </router-link>
        </div>
      </nav>

      <div class="bg-light border-bottom px-3 py-2">
        <div class="container">
          <form class="input-group input-group-sm" @submit.prevent="submitSearch">
            <input
              v-model="itemsStore.searchInput"
              type="text"
              class="form-control"
              placeholder="Search articles"
              aria-label="Search articles" />
            <button class="btn btn-primary" type="submit">Search</button>
          </form>
        </div>
      </div>
    </div>
  `,
};
