import Vue from "vue";

// Plugings
import VModal from "vue-js-modal/dist/ssr.nocss";
import "vue-js-modal/dist/styles.css";
import VueCurrencyFilter from "vue-currency-filter";
var VueTruncate = require("vue-truncate-filter");
// Vue chat scroll
import VueChatScroll from "vue-chat-scroll";
Vue.use(VueChatScroll);

Vue.use(VModal);
Vue.use(VueTruncate);
Vue.use(
  VueCurrencyFilter,
  {
    symbol: "৳",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: true,
    avoidEmptyDecimals: undefined
  },
  {
    // default name 'currency_2'
    name: "currency_simple",
    symbol: "",
    thousandsSeparator: ",",
    fractionCount: 0,
    fractionSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: false,
    avoidEmptyDecimals: "--"
  }
);

// Components
import PageHeader from "@/components/Layouts/PageHeader.vue";
import Card from "@/components/Layouts/Card.vue";
import PackageCard from "@/components/Layouts/PackageCard.vue";
import SellerCard from "@/components/Layouts/SellerCard.vue";
import ThumbnailSlider from "@/components/Layouts/ThumbnailSlider.vue";
import ProfileDropdown from "@/components/Layouts/ProfileDropdown.vue";
import JobCard from "@/components/Layouts/JobCard.vue";
import ChatItem from "@/components/Layouts/ChatItem.vue";
import Message from "@/components/Layouts/Message.vue";
import MultiselectFilter from "@/components/Layouts/MultiselectFilter.vue";
import OrderCard from "@/components/Layouts/OrderCard.vue";
// Forms
import Checkbox from "@/components/Forms/Checkbox.vue";
import AuthForm from "@/components/Forms/AuthForm.vue";
import TextInput from "@/components/Forms/TextInput.vue";
import TextareaInput from "@/components/Forms/TextareaInput.vue";
import DateInput from "@/components/Forms/DateInput.vue";
import MultiselectInput from "@/components/Forms/MultiselectInput.vue";

// Others
import SearchBar from "@/components/SearchBar.vue";
import Errors from "@/components/Errors.vue";
import Error from "@/components/Error.vue";
import Loader from "@/components/Layouts/Loader.vue";

// Packages
import { Tabs, Tab } from "vue-tabs-component";

// Filters
Vue.filter("capitalize", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

Vue.component("tabs", Tabs);
Vue.component("tab", Tab);

Vue.component(Loader);
Vue.component(PageHeader);
Vue.component(Card);
Vue.component(PackageCard);
Vue.component(SellerCard);
Vue.component(JobCard);
Vue.component(ThumbnailSlider);
Vue.component(SearchBar);

// Form Components
Vue.component(Checkbox);
Vue.component(AuthForm);
Vue.component(TextInput);
Vue.component(TextareaInput);
Vue.component(DateInput);
Vue.component(MultiselectInput);
Vue.component(MultiselectFilter);

Vue.component(ProfileDropdown);
Vue.component(Errors);
Vue.component(Error);
Vue.component(ChatItem);
Vue.component(Message);
Vue.component(OrderCard);

// 3rd party components
Vue.component("pagination", require("laravel-vue-pagination"));

// Vue moment
Vue.use(require("vue-moment"));
