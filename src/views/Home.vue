<template>
  <div class="container pt-2">
    <form class="mb-5" @submit.prevent="createContact">
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="inputPhone">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputPhone"
            placeholder="Name"
            v-model="form.name"
          />
        </div>
        <div class="form-group col-md-6">
          <label for="inputPhone">Phone</label>
          <input
            type="text"
            class="form-control"
            id="inputPhone"
            placeholder="Value"
            v-model="form.value"
          />
        </div>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        v-bind:disabled="!canCreate"
      >
        Create
      </button>
    </form>
    <Loader v-if="loading" />
    <div v-else-if="contacts.length">
      <div
        class="card mb-3"
        v-for="contact in contacts"
        v-bind:key="contact.id"
        v-bind:class="contact.marked ? 'bg-success text-white' : ''"
      >
        <div class="card-body">
          <h5 class="card-title">{{ contact.name }}</h5>
          <p class="card-text">{{ contact.value }}</p>
          <button
            class="btn btn-primary mr-4"
            @click="markContact(contact.id)"
          >
            Mark
          </button>
          <button
            href="#"
            class="btn btn-danger"
            @click="removeContact(contact.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <p v-else>Empty...</p>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";

export default {
  name: "Home",
  components: {
    Loader
  },
  data() {
    return {
      loading: false,
      form: {
        name: "",
        value: ""
      },
      contacts: []
    };
  },
  computed: {
    canCreate() {
      return this.form.value.trim() && this.form.name.trim();
    }
  },
  methods: {
    async createContact() {
      const { ...contact } = this.form;
      const newContact = await request(
        "http://localhost:3000/api/contacts",
        "POST",
        contact
      );
      this.contacts.push(newContact);
      this.form.name = this.form.value = "";
    },
    async markContact(id) {
      const contact = this.contacts.find(c => c.id === id);
      const updatedContact = await request(
        `http://localhost:3000/api/contacts/${id}`,
        "PUT",
        {
          ...contact,
          marked: true
        }
      );
      contact.marked = updatedContact.marked;
    },
    async removeContact(id) {
      try {
        await request(`http://localhost:3000/api/contacts/${id}`, "DELETE");
        this.contacts = this.contacts.filter(c => c.id !== id);
      } catch (error) {
        console.log(error);
      }
    }
  },
  async mounted() {
    this.loading = true;
    this.contacts = await request("http://localhost:3000/api/contacts");
    this.loading = false;
  }
};

async function request(url, method = "GET", data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers["Content-Type"] = "application/json",
			body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
</style>
