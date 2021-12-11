export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Outchimp',
        meta: [{
            charset: 'utf-8'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            hid: 'description',
            name: 'description',
            content: ''
        }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/favicon.ico'
        }]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        "@/assets/css/app.css"
    ],
    // Customize the progress-bar color
    loading: {
        color: "#1dbf73"
    },
    // Routes Global Configuration
    router: {
        middleware: ["clearValidationErrors"]
    },
    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        {
            src: "~/plugins/app.js",
            ssr: true
        },
        {
            src: "~/plugins/splide.js",
            ssr: false
        },
        {
            src: '~/plugins/vue-datepicker',
            ssr: false
        },
        "~/plugins/axios.js",
        "~/plugins/filters.js",
        "~/plugins/mixins/validation.js",
        "~/plugins/mixins/loading.js",
        "~/plugins/vee-validate.js",
        "~/plugins/vue-country-select.js",
        "~/plugins/vue-sweetalert.js",
        {
            src: '~/plugins/vue-input-tag.js',
            ssr: false
        },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        ['~/modules/echo/module', {
            broadcaster: 'pusher',
            authEndpoint: `${process.env.API_BASE_URL}/broadcasting/auth`,
            key: process.env.WEBSOCKET_KEY,
            authModule: true,
            forceTLS: false,
            enabledTransports: ['ws'],
            cluster: 'ap2'
        }],
        '@nuxtjs/dotenv'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        'nuxt-vue-multiselect', ['@nuxtjs/bootstrap-vue', {
            css: false
        }],

        // You can also pass plugin options
        ["vue-toastification/nuxt", {
            timeout: 1000,
            draggable: false
        }]
    ],

    // Axios module global config
    axios: {
        baseURL: process.env.API_URL,
    },

    // Authentication strategies
    auth: {
        strategies: {
            local: {
                token: {
                    property: 'access_token',
                },
                user: {
                    property: 'data',
                },
                endpoints: {
                    login: {
                        url: '/sellers/login',
                        method: 'post'
                    },
                    logout: {
                        url: '/sellers/logout',
                        method: 'post'
                    },
                    user: {
                        url: '/sellers/profile',
                        method: 'get'
                    }
                }
            },
            local2: {
                scheme: 'local',
                token: {
                    property: 'access_token',
                },
                user: {
                    property: 'data',
                },
                endpoints: {
                    login: {
                        url: '/buyers/login',
                        method: 'post'
                    },
                    logout: {
                        url: '/buyers/logout',
                        method: 'post'
                    },
                    user: {
                        url: '/buyers/profile',
                        method: 'get'
                    }
                }
            }
        }
    },

    env: {
        baseUrl: process.env.API_BASE_URL || 'http://localhost:3000'
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        transpile: ["vee-validate/dist/rules"],
        vendor: ['@johmun/vue-tags-input'],
    },
    // Server configuration
    server: {
        port: 8000 // default: 3000
    }
}
