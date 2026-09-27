export default {
  name: 'landing-page-component',
  setup() {
    const itemsStore = Vue.inject('itemsStore');

    const featuredArticles = Vue.computed(() => itemsStore.items.slice(0, 3));

    return {
      itemsStore,
      featuredArticles,
    };
  },
  template: /* html */ `
    <div class="container py-4">
      <h1 class="mb-3">Cyber-Toolkit</h1>
      <p class="lead">Simple guidance for everyday digital safety. Learn how to spot scams, protect your accounts, and stay safer online without the jargon.</p>
      <router-link to="/items" class="btn btn-primary mb-4"><i class="bi bi-shield-check me-1"></i>Browse Safety Guides</router-link>

      <h2 class="h4 mt-3">What this app helps with</h2>
      <p>
        Cyber-Toolkit gives you quick, plain-language lessons on common online risks. The articles are written for everyday users who want simple answers about scams, fake links, passwords, and safer phone habits.
      </p>
      <p>
        You can browse short guides, emergency reference topics, and familiar everyday examples that are designed to be easy to read on a phone. The goal is to make digital safety feel less overwhelming and easier to understand.
      </p>

      <section class="mt-4" aria-labelledby="featured-articles-heading">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 id="featured-articles-heading" class="h4 mb-0">Featured articles</h2>
          <span class="badge text-bg-light border">{{ itemsStore.items.length }} articles</span>
        </div>

        <div v-if="itemsStore.isLoading" class="alert alert-secondary" role="status">
          Loading featured articles...
        </div>

        <div v-else-if="featuredArticles.length === 0" class="alert alert-warning" role="alert">
          No featured articles available right now.
        </div>

        <div v-else class="row g-3">
          <div v-for="item in featuredArticles" :key="item.id" class="col-12 col-md-4">
            <article class="card h-100 border-0 shadow-sm" style="background-color: #95A58D; border: 1px solid #142F40;">
              <img
                v-if="item.imageUrl"
                :src="item.imageUrl"
                :alt="item.name"
                class="card-img-top object-fit-cover"
                style="height: 180px;"
              />
              <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                  <h3 class="h5 mb-0 text-dark">{{ item.name }}</h3>
                  <span class="badge text-bg-light border ms-2">{{ item.category || 'General' }}</span>
                </div>
                <p class="card-text text-dark flex-grow-1">{{ item.description || 'No description available.' }}</p>
                <router-link :to="'/items/' + item.id" class="btn btn-primary btn-sm mt-2">
                  Read article
                </router-link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  `,
};
