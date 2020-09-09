<template>
  <ul>
    <li>
      <transition name="modal">
        <div v-show="creating" class="modal-mask" @click.self="cancel">
          <div class="modal-container">
            <div class="modal-content">
              <h1>Create New Node</h1>
              <form @keyup.enter="save">
                <input
                  v-model="newNode.text"
                  type="text"
                  placeholder="Text: Google"
                />
                <input
                  v-model="newNode.link.type"
                  type="text"
                  placeholder="Type: link"
                />
                <template v-show="newNode.link.type === 'router-link'">
                  <input
                    v-model="newNode.link.key"
                    type="text"
                    placeholder="Key: path or name"
                  />
                </template>
                <input
                  v-model="newNode.link.value"
                  type="text"
                  placeholder="Value: https://www.google.com"
                />
                <div class="btn-group">
                  <button class="cancel" type="button" @click="cancel">
                    Cancel
                  </button>
                  <button class="save" type="button" @click="save">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
      <transition name="modal">
        <div v-show="editing" class="modal-mask" @click.self="cancel">
          <div class="modal-container">
            <div class="modal-content">
              <h1>Edit Node</h1>
              <form @keyup.enter="save">
                <input v-model="text" type="text" placeholder="Text: Google" />
                <input
                  v-model="link.type"
                  type="text"
                  placeholder="Type: link"
                />
                <template v-show="link.type === 'router-link'">
                  <input
                    v-model="link.key"
                    type="text"
                    placeholder="Key: path or name"
                  />
                </template>
                <input
                  v-model="link.value"
                  type="text"
                  placeholder="Value: https://www.google.com"
                />
                <div class="btn-group">
                  <button class="cancel" type="button" @click="cancel">
                    Cancel
                  </button>
                  <button class="save" type="button" @click="edit">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </transition>
      <div class="branch" :class="{ link: nodes.length > 0 }">
        <template v-if="nodes.length > 0">
          <template v-if="open">
            <svg
              class="w-4 h-4 cursor-pointer minus-square"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click="createNewNode"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20 12H4"
              />
            </svg>
          </template>
          <template v-else>
            <svg
              class="w-4 h-4 cursor-pointer plus-square"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click="createNewNode"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </template>
        </template>
        <template v-if="link && link.value">
          <router-link
            v-if="link.type === 'router-link'"
            class="value"
            :to="{ [link.key]: link.value }"
          >
            <!-- <fa :icon="defaultIcon"></fa>  -->
            {{ text }}
          </router-link>
          <a v-else class="value" :href="link.value" target="_blank">
            <!-- <fa :icon="defaultIcon"></fa> -->
            {{ text }}
          </a>
          <span v-show="editable" class="edit" @click="editing = true">
            Edit
          </span>
        </template>
        <template v-else>
          <span v-if="nodes.length > 0">
            <!-- <fa v-show="showParentIcon.parentShow" :icon="defaultIcon"></fa> -->
            {{ text }}
          </span>
          <span v-else @click="createNewNode">
            <!-- <fa
              v-show="showParentIcon.emptyParentShow"
              :icon="defaultIcon"
            ></fa> -->
            {{ text }}
          </span>
        </template>
      </div>
      <draggable v-if="draggable" :list="nodes" :group="{ name: 'g1' }">
        <branch
          v-for="(t, i) in nodes"
          v-show="nodes"
          :key="i"
          class="node"
          :nodes.sync="t.nodes"
          :text="t.text"
          :type="t.type"
          :link="t.link"
          :class="{
            open: open,
            first: i === 0 && !checkLast(i),
            last: checkLast(i),
          }"
          :closed="closed"
          :opened="opened"
          :default-icon="t.icon || defaultIcon"
          :editable="editable"
          :expanded.sync="expanded"
          :show-parent-icon="showParentIcon"
        />
      </draggable>
      <template v-else>
        <branch
          v-for="(t, i) in nodes"
          v-show="nodes"
          :key="i"
          class="node"
          :nodes.sync="t.nodes"
          :text="t.text"
          :type="t.type"
          :link="t.link"
          :class="{
            open: open,
            first: i === 0 && !checkLast(i),
            last: checkLast(i),
          }"
          :closed="closed"
          :opened="opened"
          :default-icon="t.icon || defaultIcon"
          :editable="editable"
          :expanded.sync="expanded"
          :show-parent-icon="showParentIcon"
        />
      </template>
    </li>
  </ul>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    name: 'Branch',
    components: {
      draggable,
    },
    props: {
      text: {
        type: String,
        required: true,
        default: () => '',
      },
      nodes: {
        type: Array,
        default: () => [],
        required: false,
      },
      type: {
        type: String,
        default: () => '',
        required: false,
      },
      link: {
        type: Object,
        default: () => ({}),
        required: false,
      },
      closed: {
        type: [String, Object, Array],
        default: '',
        required: false,
      },
      opened: {
        type: [String, Object, Array],
        default: '',
        required: false,
      },
      defaultIcon: {
        type: [String, Object, Array],
        default: '',
        required: false,
      },
      editable: {
        type: Boolean,
        default: () => true,
        required: false,
      },
      expanded: {
        type: Boolean,
        default: () => false,
        required: false,
      },
      draggable: {
        type: Boolean,
        default: () => true,
        required: false,
      },
      showParentIcon: {
        type: Object,
        default: () => ({
          parentShow: false,
          emptyParentShow: false,
        }),
        required: false,
      },
    },
    data: () => ({
      open: false,
      clicks: 0,
      timer: null,
      newNode: {
        text: 'Google',
        link: {
          type: 'link',
          key: '',
          value: 'https://www.google.com',
        },
      },
      creating: false,
      editing: false,
      urlRegex: new RegExp(
        /^(https?:\/\/)?(www\.|[a-z\d]+\.)?[a-z]+(\.[a-z]{2,3}|:\d{2,5})(\.[a-z]{2,3})?(\/([\w\d]+)?)*((\?|&)[\w\d]+=[\w\d]+)*/,
      ),
    }),
    watch: {
      expanded: {
        handler: function (val) {
          this.open = val;
        },
        immediate: true,
      },
    },
    methods: {
      createNewNode() {
        if (this.editable) {
          this.clicks++;
          if (this.clicks === 1) {
            const app = this;
            this.timer = setTimeout(() => {
              app.toggle();
              app.clicks = 0;
            }, 250);
          } else {
            clearTimeout(this.timer);
            this.clicks = 0;
            this.creating = true;
          }
        } else {
          this.toggle();
        }
      },
      cancel() {
        this.creating = false;
        this.editing = false;
        this.newNode = {
          text: 'Google',
          link: {
            type: 'link',
            key: '',
            value: 'https://www.google.com',
          },
        };
      },
      edit() {
        this.editing = false;
        this.$emit('nodes', this.nodes);
      },
      save() {
        if (this.newNode.link.type === 'link') delete this.newNode.link.key;
        this.nodes.push(this.newNode);
        this.creating = false;
        this.newNode = {
          text: 'Google',
          type: 'link',
          value: 'https://www.google.com',
        };
        this.$emit('nodes', this.nodes);
      },
      toggle() {
        this.open = !this.open;
      },
      checkLast(i) {
        return i + 1 === this.nodes.length;
      },
    },
  };
</script>
<style>
  .w-4 {
    width: 1rem;
  }
  .h-4 {
    width: 1rem;
  }
  .cursor-pointer {
    cursor: pointer;
  }
</style>
