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
                <div v-show="newNode.link.type === 'router-link'">
                  <input
                    v-model="newNode.link.key"
                    type="text"
                    placeholder="Key: path or name"
                  />
                </div>
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
                <div v-show="link.type === 'router-link'">
                  <input
                    v-model="link.key"
                    type="text"
                    placeholder="Key: path or name"
                  />
                </div>
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
        <div v-if="nodes.length > 0">
          <div v-if="open">
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
          </div>
          <div v-else>
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
          </div>
        </div>
        <div v-if="link && link.value">
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
        </div>
        <div v-else>
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
        </div>
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
      <div v-else>
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
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, reactive } from '@vue/composition-api';
  import draggable from 'vuedraggable';
  interface Node {
    text: string;
    link: {
      type: string;
      key?: string;
      value: string;
    };
  }
  export default defineComponent({
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

    setup({ nodes, expanded, editable }, { emit }) {
      // Editing
      const editing = ref(false);

      function edit() {
        editing.value = false;
        emit('nodes', nodes);
      }

      // Open
      const open = ref(false);

      watch(
        () => expanded,
        (val) => {
          open.value = val;
        },
      );

      // New Node Creating

      let newNode = reactive({
        text: 'Google',
        link: {
          type: 'link',
          key: '',
          value: 'https://www.google.com',
        },
      } as Node);

      function createNewNode() {
        if (editable) {
          clicks.value++;
          if (clicks.value === 1) {
            timer.value = setTimeout(() => {
              toggle();
              clicks.value = 0;
            }, 250);
          } else {
            clearTimeout(timer.value);
            clicks.value = 0;
            creating.value = true;
          }
        } else {
          toggle();
        }
      }

      const creating = ref(false);
      // Misc
      const clicks = ref(0);
      const timer = ref(null) as any;

      const urlRegex = ref(
        new RegExp(
          /^(https?:\/\/)?(www\.|[a-z\d]+\.)?[a-z]+(\.[a-z]{2,3}|:\d{2,5})(\.[a-z]{2,3})?(\/([\w\d]+)?)*((\?|&)[\w\d]+=[\w\d]+)*/,
        ),
      );

      function cancel() {
        creating.value = false;
        editing.value = false;
        newNode = {
          text: 'Google',
          link: {
            type: 'link',
            key: '',
            value: 'https://www.google.com',
          },
        };
      }

      function save() {
        if (newNode.link.type === 'link') delete newNode.link.key;
        nodes.push(newNode);
        creating.value = false;
        newNode = {} as Node;
        emit('nodes', nodes);
      }

      function toggle() {
        open.value = !open.value;
      }

      function checkLast(i: any) {
        return i + 1 === nodes.length;
      }

      return {
        open,
        clicks,
        timer,
        newNode,
        creating,
        editing,
        urlRegex,
        createNewNode,
        cancel,
        edit,
        save,
        toggle,
        checkLast,
      };
    },
  });
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
