export default {
  name: 'collection-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const savedItemIds = Vue.inject('savedItemIds');
    const authStore = Vue.inject('authStore');
    const route = VueRouter.useRoute();

    const isSearchPage = Vue.computed(() => route.path === '/search');

    const currentQuery = Vue.computed(() => {
      const rawQuery = isSearchPage.value ? (route.query.q || '') : (itemsStore.searchQuery || '');
      return String(rawQuery).trim();
    });

    const filteredItems = Vue.computed(() => {
      const query = currentQuery.value.toLowerCase();

      if (!query) {
        return isSearchPage.value ? [] : itemsStore.items;
      }

      return itemsStore.items.filter((item) => {
        const content = `${item.name || ''} ${item.category || ''} ${item.description || ''}`.toLowerCase();
        return content.includes(query);
      });
    });

    const isItemSaved = (item) => {
      const itemId = String(item?.id || '');
      return savedItemIds.includes(itemId);
    };

    const toggleItemSaved = (item) => {
      if (!authStore.isLoggedIn) {
        window.alert('Please log in to save articles.');
        return;
      }

      const itemId = String(item?.id || '');
      const savedIndex = savedItemIds.indexOf(itemId);

      if (savedIndex >= 0) {
        savedItemIds.splice(savedIndex, 1);
        return;
      }

      savedItemIds.push(itemId);
    };

    return {
      itemsStore,
      filteredItems,
      isSearchPage,
      currentQuery,
      authStore,
      savedItemIds,
      isItemSaved,
      toggleItemSaved,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h1 class="h3 mb-0">{{ isSearchPage ? 'Search Results' : 'Collection' }}</h1>
        <span class="badge text-bg-light border">{{ filteredItems.length }} shown</span>
      </div>

      <p class="text-muted">
        {{ isSearchPage ? 'Matching articles for your search.' : 'Browse a simple dataset loaded from a CSV file.' }}
      </p>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading items...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="filteredItems.length === 0" class="alert alert-warning" role="alert">
        <span v-if="isSearchPage && currentQuery">
          No matching articles found for "{{ currentQuery }}". Try another keyword.
        </span>
        <span v-else-if="isSearchPage">
          Enter a keyword to search for articles.
        </span>
        <span v-else>
          No items found in the dataset.
        </span>
      </div>

      <div v-else class="row g-3">
        <div class="col-12 col-md-6 col-lg-4" v-for="item in filteredItems" :key="item.id">
          <article class="card article-card h-100 shadow-sm border-0">
            <img
              v-if="item.imageUrl"
              :src="item.imageUrl"
              :alt="item.name"
              class="card-img-top collection-card-image object-fit-cover" />
            <div
              v-else
              class="collection-card-image d-flex align-items-center justify-content-center bg-light text-muted">
              No image available
            </div>

            <div class="card-body d-flex flex-column">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <h2 class="h5 card-title mb-0">{{ item.name }}</h2>
                <button
                  type="button"
                  class="btn btn-link bookmark-control p-0 ms-2"
                  :class="{ 'bookmark-saved': isItemSaved(item), 'bookmark-unsaved': !isItemSaved(item) }"
                  :aria-pressed="isItemSaved(item)"
                  :aria-label="isItemSaved(item) ? 'Saved article' : 'Save article'"
                  @click="toggleItemSaved(item)"
                  title="Save article"
                  style="font-size: 1.2rem; line-height: 1;">
                  <i class="bi" :class="isItemSaved(item) ? 'bi-bookmark-fill' : 'bi-bookmark'" aria-hidden="true"></i>
                </button>
              </div>

              <p class="card-text text-muted flex-grow-1 collection-description">
                {{ item.description || 'No description available.' }}
              </p>

              <p class="small mb-3"><strong>Location:</strong> {{ item.location || 'N/A' }}</p>

              <div class="d-grid">
                <router-link :to="'/items/' + item.id" class="btn btn-outline-secondary btn-sm">
                  <i class="bi bi-arrow-right-circle me-1"></i>Read article
                </router-link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
};
