import LandingPageComponent from './components/landing-page-component.js';
import AboutPageComponent from './components/about-page-component.js';
import NavbarComponent from './components/navbar-component.js';
import CollectionPageComponent from './components/collection-page-component.js';
import ItemDetailPageComponent from './components/item-detail-page-component.js';
import AccountPageComponent from './components/account-page-component.js';

const routes = [
  {
    path: '/',
    component: LandingPageComponent,
  },
  {
    path: '/about',
    component: AboutPageComponent,
  },
  {
    path: '/items',
    component: CollectionPageComponent,
  },
  {
    path: '/search',
    component: CollectionPageComponent,
  },
  {
    path: '/items/:id',
    component: ItemDetailPageComponent,
  },
  {
    path: '/account',
    component: AccountPageComponent,
  },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
});

const app = Vue.createApp({
  setup() {
    const itemsStore = Vue.reactive({
      items: [],
      isLoading: true,
      error: '',
      searchInput: '',
      searchQuery: '',
    });

    const authStore = Vue.reactive({
      account: null,
      isLoggedIn: false,
      sessionId: '',
    });

    const savedItemIds = Vue.reactive([]);

    const AUTH_STORAGE_KEY = 'cybertoolkit-prototype-accounts';
    const ACTIVE_SESSION_KEY = 'cybertoolkit-active-session';

    const readStoredAccounts = () => {
      try {
        const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);
        return storedValue ? JSON.parse(storedValue) : {};
      } catch (error) {
        return {};
      }
    };

    const readStoredSession = () => {
      try {
        const storedValue = localStorage.getItem(ACTIVE_SESSION_KEY);
        return storedValue ? JSON.parse(storedValue) : null;
      } catch (error) {
        return null;
      }
    };

    const writeStoredAccounts = (newAccounts) => {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newAccounts));
    };

    const writeStoredSession = (sessionDetails) => {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionDetails));
    };

    const createMockAccount = (accountInput) => {
      const trimmedName = String(accountInput?.name || '').trim();
      const trimmedEmail = String(accountInput?.email || '').trim();

      if (!trimmedName || !trimmedEmail) {
        return {
          ok: false,
          error: 'Name and email are required to create an account.',
        };
      }

      const accountId = `user-${Date.now()}`;
      const newAccount = {
        id: accountId,
        name: trimmedName,
        email: trimmedEmail,
      };

      const storedAccounts = readStoredAccounts();
      storedAccounts[accountId] = newAccount;
      writeStoredAccounts(storedAccounts);

      const sessionDetails = {
        sessionId: `session-${Date.now()}`,
        account: newAccount,
      };

      writeStoredSession(sessionDetails);

      authStore.account = newAccount;
      authStore.isLoggedIn = true;
      authStore.sessionId = sessionDetails.sessionId;

      return {
        ok: true,
        account: newAccount,
      };
    };

    const loginMockAccount = (accountInput) => {
      const trimmedEmail = String(accountInput?.email || '').trim().toLowerCase();

      if (!trimmedEmail) {
        return {
          ok: false,
          error: 'Email is required to log in.',
        };
      }

      const storedAccounts = readStoredAccounts();
      const matchedAccount = Object.values(storedAccounts).find((account) => {
        return String(account?.email || '').trim().toLowerCase() === trimmedEmail;
      });

      if (!matchedAccount) {
        return {
          ok: false,
          error: 'No account was found for that email.',
        };
      }

      const sessionDetails = {
        sessionId: `session-${Date.now()}`,
        account: matchedAccount,
      };

      writeStoredSession(sessionDetails);

      authStore.account = matchedAccount;
      authStore.isLoggedIn = true;
      authStore.sessionId = sessionDetails.sessionId;

      return {
        ok: true,
        account: matchedAccount,
      };
    };

    const logoutMockAccount = () => {
      localStorage.removeItem(ACTIVE_SESSION_KEY);

      authStore.account = null;
      authStore.isLoggedIn = false;
      authStore.sessionId = '';

      return {
        ok: true,
      };
    };

    const restoreMockSession = () => {
      const storedAccounts = readStoredAccounts();
      const storedSession = readStoredSession();

      if (storedSession && storedSession.sessionId && storedSession.account) {
        authStore.sessionId = storedSession.sessionId;
        authStore.isLoggedIn = true;
        authStore.account = storedSession.account;
        return;
      }

      if (storedAccounts && Object.keys(storedAccounts).length > 0) {
        const firstAccountId = Object.keys(storedAccounts)[0];
        const savedAccount = storedAccounts[firstAccountId] || null;
        authStore.account = savedAccount;
        authStore.isLoggedIn = Boolean(savedAccount);
      }
    };

    restoreMockSession();

    Vue.provide('authStore', authStore);
    Vue.provide('savedItemIds', savedItemIds);
    Vue.provide('authStorageKeys', {
      accounts: AUTH_STORAGE_KEY,
      activeSession: ACTIVE_SESSION_KEY,
    });
    Vue.provide('createMockAccount', createMockAccount);
    Vue.provide('loginMockAccount', loginMockAccount);
    Vue.provide('logoutMockAccount', logoutMockAccount);
    Vue.provide('restoreMockSession', restoreMockSession);

    fetch('items-template.csv')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load CSV data file.');
        }
        return response.text();
      })
      .then((csvText) => {
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: ({ data, errors }) => {
            if (errors.length > 0) {
              itemsStore.error = 'There was a problem reading the CSV data.';
              itemsStore.items = [];
            } else {
              itemsStore.items = data.map((row) => ({
                id: String(row.id || '').trim(),
                name: String(row.name || '').trim(),
                description: String(row.description || '').trim(),
                category: String(row.category || '').trim(),
                imageUrl: String(row.image_url || '').trim(),
                location: String(row.location || '').trim(),
              }));
              itemsStore.error = '';
            }
            itemsStore.isLoading = false;
          },
          error: () => {
            itemsStore.error = 'There was a problem parsing CSV data.';
            itemsStore.items = [];
            itemsStore.isLoading = false;
          },
        });
      })
      .catch(() => {
        itemsStore.error = 'There was a problem loading data.';
        itemsStore.items = [];
        itemsStore.isLoading = false;
      });

    Vue.provide('itemsStore', itemsStore);

    return {};
  },
});

app.component('navbar-component', NavbarComponent);

app.use(router);
app.mount('#app');
