export default {
  name: 'bookmarked-page-component',
  setup() {
    const authStore = Vue.inject('authStore');
    const itemsStore = Vue.inject('itemsStore');
    const savedItemIds = Vue.inject('savedItemIds');

    const bookmarkedItems = Vue.computed(() => {
      return itemsStore.items.filter((item) => savedItemIds.includes(String(item.id)));
    });

    const removeBookmark = (item) => {
      const itemId = String(item?.id || '');
      const savedIndex = savedItemIds.indexOf(itemId);

      if (savedIndex >= 0) {
        savedItemIds.splice(savedIndex, 1);
      }
    };

    return {
      authStore,
      bookmarkedItems,
      removeBookmark,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <h1 class="mb-4">Bookmarked articles</h1>

      <div v-if="!authStore.isLoggedIn" class="alert alert-warning" role="alert">
        Please log in or create an account to view bookmarked articles.
        <router-link to="/account" class="alert-link">Open account page</router-link>
      </div>

      <div v-else-if="bookmarkedItems.length === 0" class="alert alert-warning" role="alert">
        You have no bookmarked articles yet.
      </div>

      <div v-else class="row g-3">
        <div v-for="item in bookmarkedItems" :key="item.id" class="col-12 col-md-6 col-lg-4">
          <article class="card article-card h-100 shadow-sm">
            <div class="card-body d-flex flex-column">
              <h2 class="h5">{{ item.name }}</h2>
              <p class="card-text flex-grow-1">{{ item.description || 'No description available.' }}</p>
              <div class="d-flex gap-2 mt-3">
                <router-link :to="'/items/' + item.id" class="btn btn-outline-primary btn-sm">
                  <i class="bi bi-arrow-right-circle me-1"></i>View article
                </router-link>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeBookmark(item)">
                  <i class="bi bi-bookmark-x me-1"></i>Remove bookmark
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};