export default {
  name: 'item-detail-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');
    const savedItemIds = Vue.inject('savedItemIds');
    const route = VueRouter.useRoute();

    const selectedItem = Vue.computed(() => {
      return itemsStore.items.find((item) => item.id === route.params.id);
    });

    const isItemSaved = () => {
      return selectedItem.value ? savedItemIds.includes(String(selectedItem.value.id)) : false;
    };

    return {
      itemsStore,
      selectedItem,
      isItemSaved,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="btn btn-link ps-0 mb-3">← Back to collection</router-link>

      <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
        Loading item details...
      </div>

      <div v-else-if="itemsStore.error" class="alert alert-danger" role="alert">
        {{ itemsStore.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Item not found.
      </div>

      <article v-else class="card shadow-sm border-0 overflow-hidden">
        <img
          v-if="selectedItem.imageUrl"
          :src="selectedItem.imageUrl"
          :alt="selectedItem.name"
          class="item-detail-image w-100 object-fit-cover" />
        <div
          v-else
          class="item-detail-image w-100 d-flex align-items-center justify-content-center bg-light text-muted">
          No image available
        </div>

        <div class="card-body p-4">
          <div class="d-flex align-items-center justify-content-between gap-2 mb-2">
            <div class="d-flex align-items-center gap-2">
              <h1 class="h3 mb-0">{{ selectedItem.name }}</h1>
              <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
            </div>

            <button
              type="button"
              class="btn btn-link p-0"
              :class="{ 'text-warning': isItemSaved(), 'text-muted': !isItemSaved() }"
              :aria-pressed="isItemSaved()"
              :aria-label="isItemSaved() ? 'Saved article' : 'Save article'"
              title="Save article"
              style="font-size: 1.3rem; line-height: 1;">
              <i class="bi" :class="isItemSaved() ? 'bi-bookmark-fill' : 'bi-bookmark'" aria-hidden="true"></i>
            </button>
          </div>

          <p class="lead mb-0">{{ selectedItem.description || 'No description available.' }}</p>
          <p class="mt-3 mb-0 text-muted small">
            Educational reference only. This app is not professional advice, legal advice, or a substitute for a qualified expert.
          </p>
        </div>
      </article>
    </section>
  `,
};
